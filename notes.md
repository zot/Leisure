# NOTEBOOK MODULES

Use Xus to connect modules

Modules

* core
* autosave

Data

* docRequest
* event


# AST

Add 'let' AST node to allow recursive definitions (hey, GHC does this!):

let def body = \f . f def body
simpleDef name def = \f . f name def
typeAssertionDef name type def = \f . f name type def

Def can be another simpleDef or typeAssertionDef to form a name-chain, for data types.

Body can be another let, to form a let-chain.

Generates a function with one var definition for each let, returning the body.  Var names in let-chain are valid within all of the chain's defs and final body

If there is no body in a top-level program, it defaults to (lit 0)


Modify AST to handle patterns with "case" node, like GHC?


# VM

prims: \[30 bits]\[00]
contexts: \[30 bits]\[10] (aligned on 4-byte boundaries, starting at 2)


# MISC

    # compose = (rec \compose rest func if-continue . if-continue (compose (\x . rest (func x))) \x . rest (func x)) identity
   
    # Random number generator taken from "Xorshift RNGs", by George Marsaglia, Florida State University
    # Here's where I found it: http://www.jstatsoft.org/v08/i14/paper
    # This works on a list of booleans, using this formula for the next step:
    #	x ^= x << a
    #	x ^= x >> b
    #	x ^= x << c
    #
    #	Some small numbers that work are: a = 1, b = 7, c = 9
    #
    # so:	if we say xorF = \x f . lxor x (f x), that's kind of like x ^= f(x)
    #	rand = xorF (xorF (xorF x 1rshift) 7lshift) 9rshift

    map = rec \map op l . l (\h t D . cons (op h) (map op t)) false
    map2 = rec \map2 op l1 l2 . l1 (\h1 t1 D . l2 (\h2 t2 D . cons (op h1 h2) (map2 op t1 t2)) t1) l2
    lxor = \l1 l2 . map2 xor l1 l2
    1rshift = \l . cons false l
    7lshift = \l . tail (tail (tail (tail (tail (tail (tail l))))))
    3rshift = \l . cons false (cons false (cons false l))
    9rshift = \l . 3rshift (3rshift (3rshift l))
    xorF = \x f . lxor x (f x)
    rand = \x . xorF (xorF (xorF x 1rshift) 7lshift) 9rshift
