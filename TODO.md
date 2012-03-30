[Main](README.html) [Reference](REFERENCE.html) [Status](TODO.html) [Source](http://github.com/zot/lazp) [REPL](lazp.html) [Standard functinos](std.laz)
# TODO
* IO monad driver
* indentation tweak to help with monads
   * indent line creates a nested expression
   * a lambda dot at the end of the line continues on the next line, regardless of indentation

>zip  
>>a  
  b

> is zip (a) (b)  
>
> print "What is your name?" \_.  
> read \value .  
> print ["hello ", value, ", would you like a piece of toast?"] \_ .  
> read \value .  
> ((match value /\[yY]\[eE]\[sS]/)  
>>   print "Here, have one!")  
>>   print "Fine, be that way!")) \_ .
> print "OK, we're done." end

* reorganize project -- make 'old' directory for old stuff that's still useful to have around (slides, etc.)
* string functions
* Lazp-code for pretty printing
* monads and monad driver
* Use Lazp for parser, generator, REPL; compile them and use the JS for them
   * this will help people extend Lazp
* parser improvements
   * quotes for names
   * a-b recursion?
      * it could do a pass to get function names, first
* generator improvements
   * eliminate redundant memo/deref pairs
* [optimistic evaluation](http://research.microsoft.com/en-us/um/people/simonpj/Papers/optimistic/index.htm)?

#DONE
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
* parse improvements
   * each line is a definition -- main is the program
      * = expr runs expr (expr can also work if there is no '=' token in expr)
   * allow args in definitions: func arg1 arg2 = body => func = \arg1 arg2 . body
   * allow implicit recursion?
      * seems like this should just work, for the compiled version

#DEFERRED
