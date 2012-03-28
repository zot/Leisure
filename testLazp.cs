###
Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
###

###
Tests for Lazp
###

U = require('util')
LZ=require('./lazp.js')
{run, assertParse, assertEval, assertEq} = T = require('./testing.js')

console.log 'Testing'

LZ.evalLine line for line in """
true a b = a
false a b = b
and a b = a b false
or a b = a true b
cons a b = \\f . f a b
nil = \\x y . y
head l = l \\h t . h
tail l = l \\h t . t
null l = l (\\h t D . false) true
last l = l (\\h t D . null t h (last t)) nil
""".split '\n'

run 'test1', -> assertParse("\\x.x x y", "lambda x . apply (apply (ref x) (ref x)) (lit y)", "\\x.x x y")
run 'test2', -> assertEval("(\\x . x) hello", 'hello')
run 'test3', -> assertEval("eval (_apply (_lambda x (_ref x)) (_lit hello))", 'hello')
run 'test4', -> assertEval("(_eq cons cons) yes no", 'yes')
run 'test5', -> assertEval("(_eq cons true) yes no", 'no')
run 'test6', -> LZ.astEval(LZ.gen(LZ.parse("cons 1 2")))
run 'test7', -> LZ.astEval(LZ.gen(LZ.parse("head (cons 1 2)")))
run 'test8', -> assertEval("head (cons 1 2)", '1')
run 'test8', -> assertEval("tail (cons 1 2)", '2')
run 'test8', -> assertEval("last (cons a nil)", 'a')
run 'test8', -> assertEval("last (cons a (cons b nil))", 'b')

console.log '\nDone'
if !T.stats.failures then console.log "Succeeded all #{T.stats.successes} tests."
else console.log """
Succeeded #{T.stats.successes} test#{if T.stats.successes > 1 then 's' else ''}
Failed #{T.stats.failures} test#{if T.stats.failures > 1 then 's' else ''}
"""