# TODO
* Parser in Lazp
* rewrite parser, generator, REPL in Lazp, compile, and use them
* parser improvements
   * quotes for names
   * a-b recursion?
      * it could do a pass to get function names, first
* generator improvements
   * eliminate redundant memo/deref pairs

#DONE
* use ! in REPL to evaluate JS
* command line help (-h arg)
* command line compile/run (-c file... or file...)
* file compile: 
   * in REPL, use :c file
   * naked exprs are printed
* switched to coffeescript
* REPL -- seems to work
* parse improvements
   * each line is a definition -- main is the program
      * = expr runs expr (expr can also work if there is no '=' token in expr)
   * allow args in definitions: func arg1 arg2 = body => func = \arg1 arg2 . body
   * allow implicit recursion?
      * seems like this should just work, for the compiled version

#DEFERRED
