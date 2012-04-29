[Main](README.html) [Reference](REFERENCE.html) [Status](TODO.html) [Source](http://github.com/zot/leisure) [REPL](leisure.html) [Standard functinos](std.lsr)
# TODO
* number nodes so messages can refer to them -- just number them in an inorder traversal
* change getType to return the type instead of an option, because it can never return a none
* make require work in node
* configuration monads
   * default pretty-printers for output
   * run-test-cases -- run test cases after loading this file
* report indentation underflows
* parser macros should return (ast, errors, warnings)
   * error if let/do has no expr
   * error if let finds more than one body expr
* debug mode should put a cons into funcs of a new error and the list from the parent
   * can use this to see the origin of a thunk
* add assertMonad() to testing.cs
   * probably use env for this
* pretty printer function can take an assoc-list of printers for types
* notebook style interface
   * handle multiple require calls
   * highlighting fixes
      * end quote isn't highlighting
      * defs don't work
      * grouping tokens should highlight
   * load/save
   * "save output as testcase" -- snapshot input and output as strings and record them as a testcase comment
   * make programs html pages with code attributes
      * in node, use htmlparser (npm install htmlparser)
   * exprs that hang in the page are commented out: #@EXPR: + 1 2
   * vision statements in default notebook
   * naked exprs are gathered and executed after the file loads, then presented to indicate to the user that they auto-run
      * notebook-hide-source: monad to hide source
   * better formatting
      * comments, exprs, and test cases in column 1
      * defs in column 2
	  * enclose def and corresponding comments/exprs/tests within a div
	  * make tests collapseable
      * ( -- maybe colums are better than this: group adjacent definitions into the same codeMain border)
   * make cmd line runRepl parse HTML code files
   * put hyperlinks in output to function definitions
   * incremental compilation (recompile the file after a blank line and update all errors)
   * use in-doc prompt, instad of popup
   * comments that attach event handlers?
   * optionally hide source code
   * collaboration
* use curlies for do/let?
   * handle groups properly with indentation
   * not sure what this means for indentation
   * remove intermediate step of inserting {}; -- convert directly to parenthesized groups
   * allow newlines in open groups
   * { and } would be a grouping macros
* add prelude.lsr
   * put parser macros in there
* integrate physics engine
* doc comments
* allow eval to take either a string or an AST
* macros
   * cond macro
   * make \[ a macro and remove need for commas
      * allow macros to define tokens
      * add helper function for defining \[ macros, for varargs
      * bubba\[ x x x \] seems like it would work fine as a token, because tokens are sorted by length, for matching purposes.
      * or\[, and\[, js\[, concat\[
* :d command to show how a function is defined
* multiline REPL
* multiline comments and strings, ala CoffeeScript
* better errors for file problems
* if reqs aren't present when runing in browser, show error in output area or use alert if not in repl
* fold, map, etc. for asts
* make options also be monads
* supertypes or something for things like booleans (true or false), options, eithers
* -g option
   * check function types before application and print meaningful error msgs
   * generate trace
* log function that prints while running (side effect)
* :l should load file
* example that reads strings and prints them until the user types 'quit'
* :p to show primitives
* infix function call syntax
   * allow 1.plus 2.plus 3 as an alternative to plus (plus 1 2) 3 (if @ is compose, @ (@ a b) c is a.@ b.@ c)
   * allow $ to separate expressions, so a $ b $ c is the same as (a) (b) (c) (use ~ instead?)
* generate currying functions at call sites
   * since cons is a global ref, cons a b -> _cons(a, b), instead of _cons()(a)(b)
   * cons a -> function(_1){return _cons(a, _1)}
* reorganize project -- make 'old' directory for old stuff that's still useful to have around (slides, etc.)
* string functions
* Data structures
   * AMTs
   * HAMTs
* leisure-code for pretty printing
* Rewriteparser, generator, and REPL in Leisure; compile them and use the JS for them
   * This will help people extend leisure
* Generator improvements
   * eliminate redundant memo/deref pairs
* [optimistic evaluation](http://research.microsoft.com/en-us/um/people/simonpj/Papers/optimistic/index.htm)?
* named parsers (alternate syntaxes)

# DONE
* a 'require' directive that works in browsers and on the cmd line
   * adding a script tag works in browsers, provided you're not violating access restrictions (the launch script can help with that)
* notebook style interface
   * make programs html pages with code attributes
	  * in browser, use document.querySelector('[code]')
      * include &lt;script src='bootLeisure.js> element that boots the Leisure env on that page
         * clones doc
		 * adds iframe with leisure env
         * hands leisure the clone to analyze and the current doc to mutate
   * move to bootLeisure.cs
   * prevent borders from taking up space in doc
      * separate divs by newlines
	  * make divs position: relative; overflow: visible
	  * use internal divs that are bigger than their parents
   * make TTT into a notebook that shows the TTT grid
   * dynamically add expr box on naked input
   * monitor input and test first line to see if it changes between expr and def -- change box
* configuration monads
   * require
* make eval substitute macros
* allow redefinition in REPL exprs
* notebook style interface
   * get leisure.html working in notebook-style
   * make sure it runs in chrome and ff
* scroll to bottom of browser on eval
* when there are parsing or compilation errors, show which function has the problem
* add floating point numbers to tokenDefs
* let
* throw error on undeclared variables -- require quotes for strings
   * parser macros should generate a wrapper at compile-time so that we can define things like let
   * need a way to handle macros
* parse primitive
* replace withType with getType that returns an option
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

* parser improvements
   * a-b recursion?
      * it could do a pass to get function names, first
* :r resets env in REPL
* disallow redefinition
* Run leisure in sandbox
   * Leisure.cs, std.lsr, prim.cs run in a sandbox
      * in browser, use an iframe with ifr.contentWindow.eval() to communicate
         * iframe.contentWindow holds globals
		 * allow user to show or hide iframe (it's where SVG etc can be)
      * in node, use VM.createContext and VM.runInContext to communicate
         * context holds globals
   * repl uses sandbox
      * allows for reloading, etc.
* pretty print code
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
