;;; leisure.el --- server for connections to Leisure

;; Copyright (c) 2015 TEAM CTHULHU and Bill Burdick

;; The Leisure project is licensed with the ZLIB License:
;; 
;; This software is provided 'as-is', without any express or implied
;; warranty. In no event will the authors be held liable for any damages
;; arising from the use of this software.
;; 
;; Permission is granted to anyone to use this software for any purpose,
;; including commercial applications, and to alter it and redistribute it
;; freely, subject to the following restrictions:
;; 
;; 1. The origin of this software must not be misrepresented; you must not
;; claim that you wrote the original software. If you use this software
;; in a product, an acknowledgment in the product documentation would be
;; appreciated but is not required.
;; 
;; 2. Altered source versions must be plainly marked as such, and must not be
;; misrepresented as being the original software.
;; 
;; 3. This notice may not be removed or altered from any source distribution.

;;; Commentary:

;; this runs a server in emacs that can serve files to and accept files from Leisure
;; it mirrors changes with Leisure
;;
;; SIMPLE, LINE-BASED PROTOCOL
;;
;; lines are string-escaped and cannot contain newlines, so embedded newlines are \n.
;;
;; * Upon connection, the client sends a single line with connection information
;;   cookie bufferName
;;
;;   cookie: - means no cookie
;;   bufferName: the name of the buffer to connect to (or create if cookie = -)
;;
;; After the connection information, there is only one type of message representing
;; a textual replacement:
;;
;;  "r" changeCount start end text
;;
;;  changeCount: integer
;;  start: start of the replacement in the text
;;  end: end of the replacement in the text (-1 means the end of the document)
;;  text: the replacement text
;;
;; Change counts are whole numbers:
;; * change counts from emacs are even and from the remote source are odd
;; * The source number starts at 0
;; * When a source makes a change, it increments the source number if
;;   the last known number is not from the source
;;
;; MERGING
;; * When a source receives a change with a source number that is lower than its current
;; change number, the change is out of date and must be merged
;; * Merging means applying the change as if it were made in the past
;;
;; SIMPLE MERGE STRATEGY
;; * A source remembers all of its change boundaries and clears them when
;;   it receives a change with a higher sourceNumber than its own
;; * A remembered change boundary is [start, end, length]
;;   * overlapping remembered changes can be merged
;; * Merges are as follows:
;;   * note the boundaries of the new change
;;   * apply the remembered change boundaries to the change (carrying it forward
;;     in time to the present)
;;   * apply the resulting changes and send it to the other side so that it can get
;;     up-to-date

;;; Code:

(require 'websocket)
(require 'dl)
(require 'cl-lib)

(defgroup leisure ()
  "Customization for leisure.")

(defcustom leisure/emacsURL "http://textcraft.org/newLeisure/emacs"
  "URL of Emacs files on Leisure site."
  :type 'string
  :group 'leisure)

(defvar leisure/clientCount 0)

(defconst leisure/messageBufferName "*Leisure-messages*")

(defvar leisure/server nil
  "Current server.")

(defvar leisure/info nil
  "Information about the server.")

(defvar leisure/bufferConnection nil
  "Local Leisure info about the current buffer.")

(make-variable-buffer-local 'leisure/bufferConnection)

(defvar leisure/changedText nil)

(defvar leisure/totalDelete nil)

(defvar leisure/blockingChanges nil)

(defvar leisure/revertingBuffers nil)

(defconst leisure/actions
  '(display leisure/display))

(defconst leisure/messages
  '(r leisure/receiveChange))

(defstruct
    (leisure/conInfo
     (:constructor nil)
     (:constructor leisure/conInfo-create
                   (&key
                    (websocket nil)
                    (clientNumber (incf leisure/clientCount))
                    (bufferName nil)
                    (changeCount -1)
                    (lastChange -1)
                    (transient nil))))
  "Information associated with a connection."
  websocket
  clientNumber
  bufferName
  ;; When a buffer is awating the connection information, its changeCount is -1
  changeCount
  lastChange
  transient)

;;; leisure-connection-mode
(defcustom leisure/browseURLFunction 'browse-url-chromium
  "Function to display the leisure document."
  :type '(choice
          (function-item :tag "Chromium" :value browse-url-chromium)
          (function-item :tag "Default browser"
			 :value browse-url-default-browser)
          (function :tag "Your own function")
          ;;(alist :tag "Regexp/function association list"
          ;;       :key-type regexp :value-type function)
          )
  :group 'leisure)

(defcustom leisure/fileURL "http://textcraft.org/newLeisure/"
  "URL for leisure documents."
  :group 'leisure
  :type 'string)
;;(setq leisure/fileURL "file:///C:/Users/bill/work/lc/floo/Leisure/index.html")

(defcustom leisure/port 1315
  "Port for the leisure server."
  :group 'leisure
  :type 'integer)

(defcustom leisure/theme "flat"
  "Port for the leisure server."
  :group 'leisure
  :type '(choice
          (string :tag "Flat" :value "flat")
          (string :tag "Googie" :value "googie")
          (string :tag "Steampunk" :value "steampunk")
          (string :tag "Cthulhu" :value "cthulhu")
          (string :tag "Console" :value "console")
          (string :tag "Your own theme")
          ))

(defcustom leisure/showDiag nil
  "Show diag messages in the *Leisure-messages* buffer."
  :group 'leisure
  :type 'boolean)

(define-minor-mode leisure-connection-mode
  "Used when connected to a browser (☢)."
  nil "☢" nil
  :group 'leisure
  (if leisure-connection-mode
      (if leisure/bufferConnection
          (message "Leisure connected.")
        (progn
          ;; Disable mode temporarily until the browser connects
          ;; Connecting will enable the mode again
          (setq leisure-connection-mode nil)
          (leisure-start)
          (leisure/openBrowser (buffer-name))))
    (if leisure/bufferConnection
        (leisure/closeCurrentConnection))))

;; websocket events
(defun leisure/onOpen (ws)
  "Initialize WS (websocket)."
  (lexical-let ((info (leisure/conInfo-create :websocket ws :changeCount -1))
                (oldClose (websocket-on-close ws)))
    (leisure/print info "opening connection")
    (setq leisure/info (plist-put leisure/info 'connections (+ 1 (plist-get leisure/info 'connections))))
    (setf (websocket-on-message ws)
          (lambda (ws frame) (leisure/onMessage info ws frame)))
    (setf (websocket-on-close ws)
          (lambda (ws)
            (leisure/print info "closing connection")
            (and oldClose (funcall oldClose ws))
            (leisure/onClose info ws)))))

(defun leisure/onMessage (conInfo ws frame)
  "Process an incoming frame from a connection.
CONINFO: current connection info
WS: web socket
FRAME: frame."
  (let ((text (websocket-frame-payload frame)))
    (if (eql -1 (leisure/conInfo-changeCount conInfo))
        (leisure/initBufferConnection conInfo text)
      (leisure/runMessage conInfo text frame))))

(defun leisure/runMessage (conInfo msg frame)
  "CONINFO received a MSG from websocket frame FRAME."
  (if (equal 'text (websocket-frame-opcode frame))
      (progn
        ;;(leisure/diag conInfo "received %s" msg)
        (let* ((m (leisure/match "^\\([^ ]*\\) \\(.*\\)$" msg))
               (sym (and (elt m 1) (intern-soft (elt m 1))))
               (func (and sym (plist-get leisure/messages sym))))
          (if (null func)
              (leisure/warn conInfo "received bad message '%s'" msg)
            (funcall func conInfo (elt m 2) frame))))))

(defmacro leisure/withBuffer (conInfo &rest body)
  "With buffer for CONINFO, perform BODY -- do nothing if there is no buffer."
  (declare (indent 1) (debug t))
  (let ((buf (make-symbol "buf")))
    `(let ((,buf (leisure/getBuffer ,conInfo)))
       (and ,buf (with-current-buffer ,buf ,@body)))))

(defmacro leisure/blockChanges (conInfo &rest body)
  "Block any change to CONINFO's buffer during BODY."
  (declare (indent 1) (debug t))
  `(progn
     (setq leisure/blockingChanges t)
     (leisure/withBuffer ,conInfo ,@body)
     (setq leisure/blockingChanges nil)))

(defun leisure/getBuffer (conInfo)
  "Get the existing buffer for CONINFO."
  (let ((name (leisure/conInfo-bufferName conInfo)))
    (and name (get-buffer name))))

(defun leisure/onClose (conInfo ws)
  "Clean up CONINFO after WS closes."
  (setf (leisure/conInfo-websocket conInfo) nil)
  (leisure/withBuffer conInfo
    (leisure/print conInfo "closed, buffer: %s" (buffer-name))
    (setq leisure/bufferConnection nil)
    (if (leisure/conInfo-transient conInfo)
        (progn
          (set-buffer-modified-p nil)
          (kill-buffer)))
    (if leisure-connection-mode (leisure-connection-mode 'toggle)))
  (setq leisure/info (plist-put leisure/info 'connections (- (plist-get leisure/info 'connections) 1))))

;; messages
(defun leisure/receiveChange (conInfo msg frame)
  "CONINFO received a change MSG (FRAME provided for context)."
  (let* ((m (leisure/match "^\\([^ ]+\\) \\([^ ]+\\) \\(.*\\)$" msg))
         (start (+ 1 (string-to-number (elt m 1))))
         (end (+ 1 (string-to-number (elt m 2))))
         (text (leisure/parseString (elt m 3))))
    (leisure/diag conInfo "received change start: %s, end: %s, text: '%s'" start end text)
    (save-excursion
      (leisure/blockChanges conInfo
        (if (eql end 0) (erase-buffer)
          (progn
            (delete-region start end)
            (goto-char start)))
        (insert text)))))

;; sending changes
(defun leisure/initBufferConnection (conInfo initMsg)
  "Initalize CONINFO with INITMSG (empty means create a tmp buffer)."
  (let* ((bufferName (leisure/conInfo-bufferName conInfo))
         (params (leisure/match "^\\([^ ]*\\) \\([^ ]*\\)$" initMsg))
         (requestedName (elt params 1))
         (requestedAction (elt params 2))
         (action (plist-get leisure/actions (intern requestedAction)))
         (transient (not (leisure/str requestedName))))
    (cond ((and (equal bufferName requestedName)
                (not (equal conInfo (leisure/getBufferConnection bufferName))))
           (leisure/error conInfo "Leisure requested a connection to a buffer that is already connected."))
          ((and (leisure/str bufferName) (leisure/str requestedName)
                (not (equal bufferName requestedName)))
           (leisure/error conInfo "Leisure requested a different name for a connection."))
          (t (if (not (or (leisure/str bufferName) (leisure/str requestedName)))
                 (setq bufferName (setf (leisure/conInfo-bufferName conInfo) (make-temp-name "leisure-connection-"))))
             (if (not (leisure/str bufferName))
                 (progn
                   (setq bufferName requestedName)
                   (setf (leisure/conInfo-bufferName conInfo) requestedName)))
             (setf (leisure/conInfo-changeCount conInfo) 0)
             (get-buffer-create bufferName)
             (with-current-buffer bufferName
               (leisure/addChangeHooks)
               (setq leisure/bufferConnection conInfo)
               (if transient
                   (setf (leisure/conInfo-transient conInfo) t)
                 (leisure/sendChange 0 -1 (leisure/bufString)))
               (add-hook 'kill-buffer-hook 'leisure/closeCurrentConnection nil t)
               (if (not leisure-connection-mode) (leisure-connection-mode 'toggle)))
             (if action (funcall action conInfo)
               (leisure/print conInfo "no action for connection (requested: %s)" requestedAction))
             (leisure/print conInfo "connected to buffer '%s'" bufferName)))))

(defun leisure/sendChange (start end text)
  "Send change (START, END, TEXT) to browser."
  (let* ((con leisure/bufferConnection)
         (lastChange (leisure/conInfo-lastChange con)))
    (if (> lastChange (leisure/conInfo-changeCount con))
        (setf (leisure/conInfo-changeCount con) (+ 1 lastChange)))
    (let ((msg (format "r %s %s %s \"%s\""
                       (leisure/conInfo-changeCount con)
                       start
                       end
                       (leisure/escapeString text)))
          (ws (leisure/conInfo-websocket leisure/bufferConnection)))
      (if ws (websocket-send-text ws msg))
      (leisure/diag con "sent %s" msg))))

;; actions
(defun leisure/display (conInfo)
  "Leisure wants to display the buffer for CONINFO on connect."
  (let ((buffer (get-buffer (leisure/conInfo-bufferName conInfo))))
    (if (not (get-buffer-window buffer t))
        (display-buffer buffer))))

;; commands
(defun leisure-start (&optional port)
  "Run leisure server on PORT."
  (interactive (list
                (if leisure/server
                    nil
                  (string-to-number (read-from-minibuffer "Port: " (number-to-string leisure/port) nil nil nil)))))
  (if leisure/server
      (if (called-interactively-p 'interactive)
          (message (format  "Leisure already running on port %s" (plist-get leisure/info 'port))))
    (progn
      (if (null port) (setq port leisure/port))
      (setq leisure/info (list 'port port 'connections 0))
      (setq leisure/server
            (websocket-server
             port
             :on-open (lambda (websocket) (leisure/onOpen websocket))
             :on-message (lambda (ws frame) "replaced in open")
             :on-close (lambda (websocket) "replaced in open")))
      (leisure/print "Started server on port %s" port)
      (message (format  "Started Leisure server on port %s" port)))))

(defun leisure-stop ()
  "Stop leisure server."
  (interactive)
  (if leisure/server
      (progn
        (websocket-server-close leisure/server)
        (setq leisure/server nil)
        (setq leisure/info (plist-put leisure/info 'port nil))
        (message "Leisure server stopped"))))

(defun leisure-status ()
  "Print leisure status."
  (interactive)
  (message (format "Leisure info: %s" leisure/info)))

;; utilities
(defun leisure/getBufferConnection (buf)
  "Return the connection for BUF."
  (let ((b (get-buffer buf)))
    (if b
        (save-current-buffer
          (set-buffer b)
          leisure/bufferConnection))))

(defun leisure/openBrowser (cookie)
  "Open a browser that connects to Emacs on PORT with COOKIE."
  (funcall leisure/browseURLFunction (format "%s?theme=%s&connect=emacs://localhost:%s%s\n" leisure/fileURL leisure/theme (plist-get leisure/info 'port) (or (and cookie (string-join (list "/" cookie))) ""))))

;;test: (leisure/openBrowser "duh")

(defun leisure/shouldMonitor ()
  "Return whether any change should be monitored right now."
  (and
   (not leisure/blockingChanges)
   leisure/bufferConnection
   (> (leisure/conInfo-changeCount leisure/bufferConnection) -1)
   (not (equal (buffer-name) leisure/messageBufferName))
   (not (leisure/peekRevertInfo))))

(defun leisure/str (s)
  "If S is an empty string, return nil otherwise s."
  (if (equal s "") nil s))

(defun leisure/emptyStr (s)
  "Return whether S is empty or nil."
  (or (null s) (string-empty-p s)))

(defun leisure/matches (exp str)
  "Find every match for EXP in STR."
  (let ((pos 0)
        (l (dl)))
    (while (and (not (null pos)) (< pos (length str)))
      (if (not (null (setq pos (string-match exp str pos))))
          (setq l (dl/append l (dl (substring str pos (match-end 0))))))
      (setq pos (+ 1 (match-end 0))))
    (dl/resolve l)))

(defun leisure/match (exp str)
  "Match EXP in STR and get matched groups nil if there is no match."
  (let ((res (dl))
        (group 0))
    (if (not (null (string-match exp str)))
        (while (not (null (match-beginning group)))
          (setq res (dl/append res (dl (substring str (match-beginning group) (match-end group)))))
          (incf group)))
    (dl/resolve res)))

(defun leisure/tokenize (str)
  "Tokens in STR."
  (leisure/matches "\"\\(\\\"\\|[^\"]\\)*\"\\|[^ ]+" str))

(defconst leisure/specialStrChars "[\b\f\n\r\t\v\"\\\\]")

(defconst leisure/strEscapes
  '(("\b" . "\\\\b")
    ("\f" . "\\\\f")
    ("\n" . "\\\\n")
    ("\r" . "\\\\r")
    ("\t" . "\\\\t")
    ("\v" . "\\\\v")
    ("\\" . "\\\\\\\\")
    ("\"" . "\\\\\"")))

(defconst leisure/strUnescapes
  '(("\\b" . "\b")
    ("\\f" . "\f")
    ("\\n" . "\n")
    ("\\r" . "\r")
    ("\\t" . "\t")
    ("\\v" . "\v")))

(defun leisure/escapeChar (c)
  "Escaped version of C."
  (let ((v (assoc c leisure/strEscapes)))
    (or (and v (cdr v)) c)))

(defun leisure/unescapeSequence (s)
  "Unescaped version of S."
  (let ((v (assoc s leisure/strUnescapes)))
    (or (and v (cdr v)) (substring s 1 2))))

(defun leisure/escapeString (str)
  "Backslashed version of STR."
  ;;(replace-regexp-in-string ".\\|\n" 'leisure/escapeChar str)
  (replace-regexp-in-string leisure/specialStrChars 'leisure/escapeChar str))

(defun leisure/parseString (str)
  "Parse quoted string STR."
  (let ((unescaped (leisure/unescapeString str)))
    (substring unescaped 1 (- (length unescaped) 1))))

(defun leisure/unescapeString (str)
  "Unbackslashed version of STR."
  (replace-regexp-in-string "\\\\." 'leisure/unescapeSequence str))

(defun leisure/format (conInfo str &rest body)
  "Format a message for CONINFO, formatting STR with BODY (sent to format) in leisure message buffer."
  (if (null body)
      (progn
        (setq body (list str))
        (setq str "%s")))
  (let ((fmt (apply 'format str body))
         (client (and conInfo (leisure/conInfo-clientNumber conInfo))))
    (or (and client (string-join (list (number-to-string client) ": " fmt))) fmt)))

(defun leisure/addNl (str)
  "Add a nl to STR."
  (string-join (list str "\n")))

(defun leisure/diag (&rest args)
  "Send ARGS to print if diagnostics is on."
  (if leisure/showDiag (apply 'leisure/print args)))

(defun leisure/print (str &rest body)
  "Print message for CONINFO, formatting STR with BODY (sent to format) in leisure message buffer."
  (let ((conInfo nil))
    (if (vectorp str)
        (progn
          (setq conInfo str)
          (setq str (car body))
          (setq body (cdr body)))
      (setq conInfo leisure/bufferConnection))
    (save-current-buffer
      (set-buffer (get-buffer-create leisure/messageBufferName))
      (setq buffer-read-only nil)
      (goto-char (point-max))
      (insert (leisure/addNl (apply 'leisure/format conInfo str body)))
      (setq buffer-read-only t)
      (set-buffer-modified-p nil))))

(defun leisure/error (conInfo str &rest body)
  "Close the conection and display a warning for CONINFO, formatting STR with BODY (sent to format) in leisure message buffer."
  (leisure/close coninfo)
  (apply 'leisure/warn conInfo str body))

(defun leisure/closeCurrentConnection ()
  "Close connection for current buffer."
  (leisure/close leisure/bufferConnection))

(defun leisure/close (conInfo)
  "Close CONINFO."
  (let ((ws (and conInfo (leisure/conInfo-websocket conInfo))))
    (if ws
        (progn
          (websocket-close ws)
          (setf (leisure/conInfo-websocket conInfo) nil)))))

(defun leisure/warn (conInfo str &rest body)
  "Display a warning for CONINFO, formatting STR with BODY (sent to format) in leisure message buffer."
(display-warning '(leisure) (apply 'leisure/format conInfo str body)))

;; buffer change handling
(defun leisure/beforeChange (start end)
  "Called on change (START, END) to leisure buffers."
  (if (leisure/shouldMonitor)
      (progn
        (setq leisure/totalDelete (eql (buffer-size) (- end start)))
        (setq leisure/changedText (buffer-substring-no-properties start end)))))

(defun leisure/afterChange (start end oldLength)
  "Called on change (START, END, OLDLENGTH) to leisure buffers."
  (if (leisure/shouldMonitor)
      (let ((newText (buffer-substring-no-properties start end)))
        (if (not (equal newText leisure/changedText))
            (progn
              (decf start)
              (leisure/sendChange start (if leisure/totalDelete -1 (+ start (length leisure/changedText))) newText)
              (setq leisure/changedText nil))))))

(defun leisure/bufString ()
  "Get the buffer string without properties."
  (buffer-substring-no-properties 1 (+ 1  (buffer-size))))

(defun leisure/beforeRevert ()
  "Preserve leisure info for after revert."
  (if (leisure/shouldMonitor)
      (leisure/saveRevertInfo)))

(defun leisure/peekRevertInfo ()
  "Get a buffer's revert info."
  (cdr (assq (intern (buffer-name)) leisure/revertingBuffers)))

(defun leisure/saveRevertInfo ()
  "Set a buffer's revert info."
  (let ((name (intern (buffer-name))))
    (setq leisure/revertingBuffers
          (cons (cons name leisure/bufferConnection)
                (assq-delete-all name leisure/revertingBuffers)))))

(defun leisure/takeRevertInfo ()
  "Remove and return a buffer's revert info ."
  (let ((info (leisure/peekRevertInfo)))
    (setq leisure/revertingBuffers (assq-delete-all (intern (buffer-name)) leisure/revertingBuffers))
    info))

(defun leisure/afterRevert ()
  "Restore leisure info after revert."
  (let* ((info (leisure/takeRevertInfo)))
    (if info
        (progn
          (setq leisure/bufferConnection info)
          (if (not leisure-connection-mode) (leisure-connection-mode 'toggle))
          (leisure/sendChange 0 -1 (leisure/bufString))))))

(defun leisure/addChangeHooks ()
  "Add change hooks for buffer."
  (if (not (memq 'leisure/beforeChange before-change-functions))
      (progn
        (add-hook 'before-change-functions 'leisure/beforeChange nil t)
        (add-hook 'after-change-functions 'leisure/afterChange nil t)
        (add-hook 'before-revert-hook 'leisure/beforeRevert nil t)
        (add-hook 'after-revert-hook 'leisure/afterRevert nil t))
    (leisure/diag "Not adding change hooks")))

(provide 'leisure)
;;; leisure.el ends here
