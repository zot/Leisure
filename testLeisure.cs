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
Tests for Leisure
###

U = require('util')
LZ=require('./leisure')
R = require('./replCore')
#require('./std')
require('./prim')
{setType, setDataType, define} = LZ
{run, assertParse, assertEval, assertEvalPrint, assertEq} = T = require('./testing.js')

console.log 'Testing'

LZ.eval "req('./std')"

code = (R.generateCode null, """
#head l = l \\h t . h
#tail l = l \\h t . t
#null l = l (\\h t D . false) true
last l = l (\\h t D . null t h (last t)) nil
val = 2
divider = [ '\\n', '-', '-', '-', '-', '-', '\\n' ]
div = [ '\\n', '-', '-', '-', '-', '-', '\\n' ]

""", false)

LZ.eval(code)

run 'test1', -> assertParse("1", "ref 1")
run 'test2', -> assertParse("\\x.x x y", "lambda x . apply (apply (ref x) (ref x)) (ref y)", "\\x.x x y")
run 'test3', -> assertEval("(\\x . x) 'hello'", 'hello')
run 'test4', -> assertEval("eval (apply (lambda 'x' (ref 'x')) (lit 'hello'))", 'hello')
run 'test5', -> assertEval("(eq cons cons) 'yes' 'no'", 'yes')
run 'test6', -> assertEval("(eq cons true) 'yes' 'no'", 'no')
run 'test7', -> LZ.astEval(LZ.gen(LZ.parse("cons 1 2")))
run 'test8', -> LZ.astEval(LZ.gen(LZ.parse("head (cons 1 2)")))
run 'test9', -> assertEval("head (cons 1 2)", 1)
run 'test10', -> assertEval("tail (cons 1 2)", 2)
run 'test11', -> assertEval("last (cons 'a' nil)", 'a')
run 'test12', -> assertEval("last (cons 'a' (cons 'b' nil))", 'b')
run 'test13', -> assertEval("(is (cons 'a' 'b') cons) 'yes' 'no'", 'yes')
run 'test14', -> assertEval("(eval (lambda 'a' (lambda 'b' (ref 'a')))) 'yes' 'no'", 'yes')
run 'test15', -> assertEval("(\\1 .; 1) 'hello'", 'hello')
run 'test16', -> assertEval("head ([ 1 ])", 1)
run 'test17', -> assertEval("head (tail (append ([ 1 ]) ([ 2 ])))", 2)
run 'test18', -> assertEval("head [1]", 1)
run 'test19', -> assertEval("head (tail (append [1] [2]))", 2)
run 'test20', -> assertEval("concat divider", '\\n-----\\n')
run 'test21', -> assertEval('"\\n"', "\n")
run 'test22', -> assertEval("concat div", '\\n-----\\n')
run 'test23', -> assertEval("val", 2)

in1 = """
a
b
c
"""
in2 = """
a
  b
  c
   d
  e

f
  g
  h
    i
"""

in3 = """
a    {
 b;
  c {
d};
  e
}

f
  g
  h
    i
"""

in4 = """
frap bubba =M= a b c
  d e
  f g
"""

in5 = """
do
  1
  2
"""

in6 = """
do
  a <- ret 3
  b = + a 1
  pr a
"""

in7 = """
let
  a = 3
  b = 4
  [a, b]
"""

in8 = """
duh [
 1
 ,
 2
 ]
"""

run 'test24', -> assertEq(LZ.bracify(in1, 1)[0], 'a;b;c')
run 'test25', -> assertEq(LZ.bracify(in2, 1)[0], 'a{b;c{d};e};;f{g;h{i}}')
run 'test26', -> assertEq(LZ.prepare(in1)[0], "a\nb\nc")
run 'test27', -> assertEq(LZ.prepare(in2)[0], "(a b (c d) e)\n\n(f g (h i))")
run 'test28', -> assertEq(LZ.prepare(in3)[0], "(a b (c d) e)\n(f g (h i))")
run 'test29', -> assertEq(LZ.bracify(in4, 1)[0], 'frap bubba =M= a b c{d e;f g}')
run 'test30', -> assertEq(LZ.prepare(in4)[0], 'frap bubba =M= (a b c (d e) (f g))\n')
run 'test31', -> assertParse("identMacro 1", "ref 1")
run 'test32', -> assertParse("do 1", "ref 1")
run 'test33', -> assertParse(in5, "apply (apply (ref bind) (ref 1)) (lambda _ . ref 2)")
run 'test34', -> assertParse(in6, "apply (apply (ref bind) (apply (ref ret) (ref 3))) (lambda a . apply (lambda b . apply (ref pr) (ref a)) (apply (apply (ref +) (ref a)) (ref 1)))")
run 'test35', -> assertEq(LZ.prepare('a{b}')[0].trim(), '(a b)')
run 'test36', -> assertEq(LZ.prepare('a{"b"}')[0].trim(), '(a "b")')
run 'test37', -> assertEq(LZ.prepare('a{"{b"}')[0].trim(), '(a "{b")')
run 'test38', -> assertEq(LZ.prepare(in7)[0].trim(), '(let (a = 3) (b = 4) ([a, b]))')
run 'test39', -> assertEvalPrint(in7, '[3, 4]')
run 'test40', -> assertEq(LZ.prepare(in8)[0].trim(), '(duh [ 1 , 2 ])')

console.log '\nDone'
if !T.stats.failures then console.log "Succeeded all #{T.stats.successes} tests."
else
  console.log """
Succeeded #{T.stats.successes} test#{if T.stats.successes > 1 then 's' else ''}
Failed #{T.stats.failures} test#{if T.stats.failures > 1 then 's' else ''}:
"""
  console.log "  #{f}" for f in T.stats.failed
