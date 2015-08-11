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

(defvar leisure/files '("dl" "leisure" "leisure-connection"))

(defgroup leisure ()
  "Customization for leisure.")

(defcustom leisure/emacsURL "http://textcraft.org/newLeisure/emacs"
  "URL of Emacs files on Leisure site."
  :type 'string
  :group 'leisure)

;; loading
(defun leisure/load-file (file)
  "Load FILE, downloading it if it's not there."
  (let* ((dir (file-name-directory (find-library-name "leisure")))
         (load-name (format "%s%s.el" dir file)))
    (if (not (file-exists-p load-name))
        (url-copy-file (format "%s/%s.el" leisure/emacsURL file) load-name t))
    (load load-name)))

(defun leisure/load (skip-main)
  "Loading code Leisure connection, SKIP-MAIN means not to load leisure.el."
  (mapc (lambda (file)
          (if (not (and skip-main (equalp file "leisure"))) (leisure/load-file file)))
        leisure/files))

;; updating
(defun leisure-update ()
  "In-place update for Leisure connection code."
  (interactive)
  (let ((dir (file-name-directory (find-library-name "leisure"))))
    (mapc (lambda (file)
            (url-copy-file
             (format "%s/%s.el" leisure/emacsURL file)
             (format "%s%s.el" dir file)
             t))
          leisure/files)))

(leisure/load t)

(provide 'leisure)
;;; leisure.el ends here
