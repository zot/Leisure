;; dl --- difference lists -*- lexical-binding: t; -*-

;;; Commentary:

;; Difference lists
;; (C) 2015, Bill Burdick
;; ZLIB license
;;
;; They're incredibly simple
;; They append in constant time and
;; They convert to lists in O(n) time
;;
;; What could be better?
;;
;; This code needs that lexical-binding: t at the top; remove it at your own peril

;;; Code:

(defun dl (&rest elements)
  "A difference list of ELEMENTS."
  (lambda (y) (append elements y)))
(defun dl/resolve (dl)
  "Resolve difference list DL."
  (funcall dl nil))
(defun dl/append (a b)
  "Append difference lists A and B."
  (lambda (x) (funcall a (funcall b x))))

(provide 'dl)
;;; dl.el ends here
