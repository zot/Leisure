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
LZ=require('./lazp')
R = require('./replCore')
require('./std')
require('./prim')
{setId, setType, setDataType, define} = LZ
{run, assertParse, assertEval, assertEq} = T = require('./testing.js')

console.log 'Testing'

code = (R.generateCode null, """
and a b = a b false
or a b = a true b
head l = l \\h t . h
tail l = l \\h t . t
null l = l (\\h t D . false) true
last l = l (\\h t D . null t h (last t)) nil
val = 2
divider = [ '\\n', '-', '-', '-', '-', '-', '\\n' ]
div = [ '\\n', '-', '-', '-', '-', '-', '\\n' ]
""", false)
eval(code)


run 'test0', -> assertParse("1", "lit 1")
run 'test1', -> assertParse("\\x.x x y", "lambda x . apply (apply (ref x) (ref x)) (lit y)", "\\x.x x y")
run 'test2', -> assertEval("(\\x . x) hello", 'hello')
run 'test3', -> assertEval("eval (apply (lambda x (ref x)) (lit hello))", 'hello')
run 'test4', -> assertEval("(eq cons cons) yes no", 'yes')
run 'test5', -> assertEval("(eq cons true) yes no", 'no')
run 'test6', -> LZ.astEval(LZ.gen(LZ.parse("cons 1 2")))
run 'test7', -> LZ.astEval(LZ.gen(LZ.parse("head (cons 1 2)")))
run 'test8', -> assertEval("head (cons 1 2)", 1)
run 'test9', -> assertEval("tail (cons 1 2)", 2)
run 'test10', -> assertEval("last (cons a nil)", 'a')
run 'test11', -> assertEval("last (cons a (cons b nil))", 'b')
run 'test12', -> assertEval("(is (cons a b) cons) yes no", 'yes')
run 'test13', -> assertEval("(eval (lambda a (lambda b (ref a)))) yes no", 'yes')
run 'test14', -> assertEval("(\\1 . 1) hello", 'hello')
run 'test15', -> assertEval("head ([ 1 ])", 1)
run 'test16', -> assertEval("head (tail (append ([ 1 ]) ([ 2 ])))", 2)
run 'test17', -> assertEval("head [1]", 1)
run 'test18', -> assertEval("head (tail (append [1] [2]))", 2)
run 'test19', -> assertEval("concat divider", '\\n-----\\n')
run 'test20', -> assertEval('"\\n"', "\n")
run 'test21', -> assertEval("concat div", '\\n-----\\n')
run 'test22', -> assertEval("val", 2)

console.log '\nDone'
if !T.stats.failures then console.log "Succeeded all #{T.stats.successes} tests."
else console.log """
Succeeded #{T.stats.successes} test#{if T.stats.successes > 1 then 's' else ''}
Failed #{T.stats.failures} test#{if T.stats.failures > 1 then 's' else ''}
"""