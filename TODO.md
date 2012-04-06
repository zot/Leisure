[Main](README.html) [Reference](REFERENCE.html) [Status](TODO.html) [Source](http://github.com/zot/lazp) [REPL](lazp.html) [Standard functinos](std.laz)
# TODO
* -g option
   * check function types before application and print meaningful error msgs
   * generate trace
* log function that prints while running (side effect)
* :l should load file
* scroll to bottom on eval
* example that reads strings and prints them until the user types 'quit'
* :p to show primitives
* infix function call syntax
   * allow 1.plus 2.plus 3 as an alternative to plus (plus 1 2) 3 (if @ is compose, @ (@ a b) c is a.@ b.@ c)
   * allow $ to separate expressions, so a $ b $ c is the same as (a) (b) (c) (use ~ instead?)
* generate currying functions at call sites
   * since cons is a global ref, cons a b -> _cons(a, b), instead of _cons()(a)(b)
   * cons a -> function(_1){return _cons(a, _1)}
* make repl keep track of old definitions so it can wipe the env clean
* integrate physics engine
* indentation tweak
   * indent line creates a nested expression

>zip  
>>a  
  b

> is zip (a) (b)  

> print "What is your name?" \_.  
> read \value .  
> print (concat ["hello ", value, ", would you like a piece of toast?"] \_ .  
> read \value .  
> ((match value /\[yY]\[eE]\[sS]/)  
>>   print "Here, have one!")  
>>   print "Fine, be that way!")) \_ .
> print "OK, we're done." end

* reorganize project -- make 'old' directory for old stuff that's still useful to have around (slides, etc.)
* string functions
* Lazp configuration environment
   * pretty-printers for types
   * named parsers
* AMTs
* Lazp-code for pretty printing
* Use Lazp for parser, generator, REPL; compile them and use the JS for them
   * this will help people extend Lazp
* parser improvements
   * a-b recursion?
      * it could do a pass to get function names, first
* generator improvements
   * eliminate redundant memo/deref pairs
* [optimistic evaluation](http://research.microsoft.com/en-us/um/people/simonpj/Papers/optimistic/index.htm)?

#DONE
* runRepl file should compile the file, eval it, and then stay in the REPL
* get ! working on browser
* file loading in browser
* change to new parser
* make bodiless lambdas eat newlines, to help with monads

> print "What is your name?" \_.  
> read \value .  
> print (concat ["hello ", value, "."]) end

* fix parser groups, etc.
* monads and monad driver
* primitive functions
* simple pretty printing
* change Standard Functions link in browser repl to paste them into the defs pane
* separate out constant functions
   * so that
      * \_cons = function(){return setDataType(function(\_a){return setId(function(\_b){return setType(function(\_f){return \_f()(\_a)(\_b)}, 33, 'cons')}, 32)}, 31, 'cons')}
   * becomes
      * f\_cons = setDataType(function(\_a){return setId(function(\_b){return setType(function(\_f){return \_f()(\_a)(\_b)}, 33, 'cons')}, 32)}, 31, 'cons')
      * \_cons = function(){return f\_cons}
* implicit type names
   * if you define a function X that returns a function Y, the function Y gets "type" X
   * cons a b = \f . f a b
      (cons 1 2) has type cons (the cons function is used as the type)
   * _is value type -> true or false
   * _is (cons 1 2) cons -> true
* use ! in REPL to evaluate JS
* command line help (-h arg)
* command line compile/run (-c file... or file...)
* file compile: 
   * in REPL, use :c file
   * naked exprs are printed
* switched to coffeescript
* REPL -- seems to work
* parser improvements
   * quotes for names
   * each line is a definition -- main is the program
      * = expr runs expr (expr can also work if there is no '=' token in expr)
   * allow args in definitions: func arg1 arg2 = body => func = \arg1 arg2 . body
   * allow implicit recursion?
      * seems like this should just work, for the compiled version

#DEFERRED
