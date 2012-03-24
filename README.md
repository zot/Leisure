# Lazp: An untyped, lazy Lambda Calculus with Metaprogramming and Primitives

The goal, here, isn't to make something that's super fast; it's to provide a useable untyped, lazy, lambda calculus for people to use.

[Status](Lazp/tree/master/TODO.md)

To facilitate metaprogramming, Lazp uses abstract syntax trees, made from LC functions (i.e. like LISP):

a b c -> _apply (_apply (_ref a) (_ref b)) (_ref c)  
𝛌a . b -> _lambda a (_ref b)  
𝜋x y z -> _prim x (_prim (_ref y) (_ref z)) -- call a primitive function x with arguments y and z  

Template Haskell demonstrates a perceived need for metaprogramming, even in a lazy language, like Haskell.  Eval exposes the Lazp code-generator to developers which helps with creating external DSLs, among other things.

## AST Function usage

_lit v -- literal value  
_ref v -- variable reference: v should be a string  
_lambda var body -- lambda binding: var should be a string or number, body is an AST  
_apply func arg -- function application: func can be any AST function except a _prim  
_prim arg rest -- primitive call: rest is either a _lit, a _ref, or another _prim (which allows more args)  
_name name ast -- name a type

The AST functions serve as an embedded DSL.
## AST Function definitions

_lit = \x f . f x  
_ref = \x f . f x  
_lambda = \v f g . g v f  
_apply = \func arg f . f func arg  
_prim = \arg rest f . f arg rest  
_name = \nm ast f . f nm ast  

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
