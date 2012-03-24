# TODO
* REPL
* Parser in Lazp
* file compile
* rewrite parser, generator, REPL in Lazp, compile, and use them
* parser improvements
   * each line is a definition -- main is the program
      * = expr runs expr (expr can also work if there is no '=' token in expr)
   * quotes for names
   * no facility for embedding JS exprs, because of side effects (use a monad driver for interacting with JS)
   * allow args in definitions: func arg1 arg2 = body => func = \arg1 arg2 . body
   * allow implicit recursion?
      * seems like this should just work, for the compiled version
   * a-b recursion?
  it could do a pass to get function names, first
* generator improvements
   * eliminate redundant memo/deref pairs

#DONE
* switched to coffeescript

#DEFERRED
