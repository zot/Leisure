[Main](README.html) [Reference](REFERENCE.html) [Status](TODO.html) [Source](http://github.com/zot/lazp) [REPL](lazp.html)
# Lazp: An untyped, lazy Lambda Calculus with Metaprogramming and Primitives

The goal, here is to provide a useable untyped, lazy, lambda calculus with metaprogramming for people's use and experimentation.

To facilitate metaprogramming, Lazp uses abstract syntax trees, made from LC functions, like how LISP represents code with cons lists.

Template Haskell demonstrates a perceived need for metaprogramming, even in a lazy language, like Haskell.  Eval exposes the Lazp code-generator to developers which helps with creating external DSLs, among other things.

## Untyped
Lazp is untyped.  This doesn't mean that Lazp is type-free, it just means that variables don't have types -- they can hold anything.  Lazp does have an experimental system that's like "data types" in LISP -- e.g. you can tell if something is a cons-cell (**_is (cons 1 2) cons** returns a **true** function, if you define cons the right way).  This currently works, but it needs more development.

## Lazy
Lazp is lazy.  It doesn't allow side effects, not because side effects are somehow *evil*, but because in a lazy language, side effects can lead to very strange behavior that's really hard to diagnose.  The idea is to have side effects outside the Lazp environment and access them using standard functional techniques, like monads and FRP.

## Metaprogramming
Lazy provides eval as the basic building block for metaprogramming.  Eval takes a Lazp AST as input and returns the result of evaluating the Lazp code it represents (this is similar to LISP's eval).

## AST Function usage
_lit v -- literal value  
_ref v -- variable reference: v should be a string  
_lambda var body -- lambda binding: var should be a string or number, body is an AST  
_apply func arg -- function application: func can be any AST function except a _prim  
_prim arg rest -- primitive call: rest is either a _lit, a _ref, or another _prim (which allows more args)  

The AST functions serve as an embedded DSL.

## AST Function definitions

_lit = \x f . f x  
_ref = \x f . f x  
_lambda = \v f g . g v f  
_apply = \func arg f . f func arg  
_prim = \arg rest f . f arg rest  

In _prim, rest is either a _prim, _lit, or _ref  
lit is the same def as ref  
apply is the same def as prim  
these are for identification purposes  

## Examples
eval x -- evaluates x  
apply func arg = eval (_apply (_lit func) (_lit arg))  
compile code-string -- returns an AST for a string of Lazp code  

## Parser macros  
How these work depends on the parser you use, but they run Lazp code at parse-time.  Parser macros can implement things like splicing primitive values into the AST and importing libraries, but the most important thing is that they allow developers to extend the parser.  Parser macros can be activated using a standard parser macro (of course :) ).

## Running it
### Running the REPL
>node runRepl
Runs the read eval print loop.  You can enter lazp expressions and definitions there.

### Compiling files
>node runRepl -c file1 file2 ...
Compiles files.  

### Running the tests
To run the tests, you can cd into the top level directory and type
> node testLazp
It should give you something like this:
> Running Tests...
> ...
> Done
Each . on the second line represents a successfully completed test.  If there are errors, it will tell you which tests failed.

## Changing it
If you want to change things, you'll probably want to change the Coffeescript files, rather than their corresponding javascript versions.  The [build](build) file that contains a command to rebuild it, which is just
> node_modules/coffee-script/bin/coffee -c lazp.cs repl.cs runRepl.cs


## Implementation
Lazp will start as a virtual machine in JavaScript, with the intent to generate native code.  Native code could be done in C and/or LLVM.  An LLVM version could use the VMKit’s garbage collector or the Boehm-Demers-Weiser garbage collector, which performs well with small objects (like function contexts).

## Function IDs
Functions and unbound variables will have IDs that act like runtime types

## Parser
(the parser should eventually be written in Lazp)  

\x . y is equivalent to 𝛌x . y  

Since \xxx\ has no meaning in Lazy, it seems like a good way to name parser macros, if you don't want to use up "normal" identifiers in the name space.

## LISP-like syntax for Lazp (an alternate parser for curmudgeons)
(lambda (a) b) -> (_lambda (a) (_ref b))  
(a b c) -> (_apply (_ref a) (_ref b) (_ref c))  
