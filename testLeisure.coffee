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
Parse = require('./parse')
LZ=require('./leisure')
R = require('./replCore')
Prim = require('./prim')
{setType, setDataType, define} = LZ
{run, assertParse, assertEval, assertEvalPrint, assertEq} = T = require('./testing.js')

console.log 'Testing'

Prim.runRequire './prelude'
Prim.runRequire './std'

debug = false

code = (R.generateCode null, """
#head l = l \\h t . h
#tail l = l \\h t . t
#null l = l (\\h t D . false) true
#last l = l (\\h t D . null? t h (last t)) nil
val = 2
divider = ['\\n' '-' '-' '-' '-' '-' '\\n']
div = ['\\n' '-' '-' '-' '-' '-' '\\n']

""", false, null, null, null, debug)

#console.log "CODE: #{code}"

LZ.eval(code)

run 'test1', -> assertParse("1", "lit 1")
run 'test2', -> assertParse("\\x.x x y", "lambda x . apply (apply (ref x) (ref x)) (ref y)", "\\x.x x y")
run 'test3', -> assertEval("(\\x . x) 'hello'", 'hello')
run 'test4', -> assertEval("eval (apply (lambda 'x' (ref 'x')) (lit 'hello'))", 'hello')
run 'test5', -> assertEval("(eq cons cons) 'yes' 'no'", 'yes')
run 'test6', -> assertEval("(eq cons true) 'yes' 'no'", 'no')
run 'test7', -> LZ.astEval(LZ.gen(LZ.parseFull("cons 1 2")))
run 'test8', -> LZ.astEval(LZ.gen(LZ.parseFull("head (cons 1 2)")))
run 'test9', -> assertEval("head (cons 1 2)", 1)
run 'test10', -> assertEval("tail (cons 1 2)", 2)
run 'test11', -> assertEval("last (cons 'a' nil)", 'a')
run 'test12', -> assertEval("last (cons 'a' (cons 'b' nil))", 'b')
run 'test13', -> assertEval("(is (cons 'a' 'b') cons) 'yes' 'no'", 'yes')
run 'test14', -> assertEval("(eval (lambda 'a' (lambda 'b' (ref 'a')))) 'yes' 'no'", 'yes')
run 'test15', -> assertEval("(\\1 .\n 1) 'hello'", 'hello')
run 'test16', -> assertEval("head ([ 1 ])", 1)
run 'test17', -> assertEval("head (tail (append ([ 1 ]) ([ 2 ])))", 2)
run 'test18', -> assertEval("head [1]", 1)
run 'test19', -> assertEval("head (tail (append [1] [2]))", 2)
run 'test20', -> assertEval("concat divider", '\n-----\n')
run 'test21', -> assertEval('"\\n"', "\n")
run 'test22', -> assertEval("concat div", '\n-----\n')
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

in8 = """
duh [
 1
 2
 ]
"""

in9 = """
(eq l nil) false
  or
    f (head l)
    any f (tail l)

# return true if ALL elements of l satisfy f, which takes exactly one arg
# eg. all (eq 0) [0 0 0] gives true: true
# caveat!  return true for nil lists
all f l = or
  eq l nil
  and
    f (head l)
    all f (tail l)
"""

out9_12 = """
([[eq]] <<l>> <<nil>>) <<false>>
  <<or
    f (head l)
    any f (tail l)>>

# return true if ALL elements of l satisfy f, which takes exactly one arg
# eg. all (eq 0) [0 0 0] gives true: true
# caveat!  return true for nil lists
all f l = or
  eq l nil
  and
    f (head l)
    all f (tail l)
"""

out9_30 = """
(eq l nil) false
  or
    f ([[head]] <<l>>)
    any f (tail l)

# return true if ALL elements of l satisfy f, which takes exactly one arg
# eg. all (eq 0) [0 0 0] gives true: true
# caveat!  return true for nil lists
all f l = or
  eq l nil
  and
    f (head l)
    all f (tail l)
"""

run 'test24', -> assertParse("identMacro 1", "lit 1")
run 'test25', -> assertParse("macroCons 1 nil", "apply (apply (ref cons) (lit 1)) (ref nil)")
run 'test26', -> assertParse("do 1", "lit 1")

in5 = """
do
  1
  2
"""

run 'test27', -> assertParse(in5, "apply (apply (ref bind) (lit 1)) (lambda _ . lit 2)")

in6 = """
do
  a <- ret 3
  b = + a 1
  pr a
"""

run 'test28', -> assertParse(in6, "apply (apply (ref bind) (apply (ref ret) (lit 3))) (lambda a . apply (lambda b . apply (ref pr) (ref a)) (apply (apply (ref +) (ref a)) (lit 1)))")

in7 = """
do
  a = 3
  b = 4
  [a b]
"""

run 'test29', -> assertEvalPrint(in7, '[3 4]')

applyBrackets = (str, pos, func)->
  ast = LZ.parseFull(str)[0]
  brackets = LZ.bracket(ast, pos)
  result = ''
  prev = 0
  while brackets != Parse.Nil
    start = brackets.head().head()
    end = brackets.head().tail().head()
    result += "#{str.substring prev, start}#{func str.substring(start, end), result == ''}"
    brackets = brackets.tail()
    prev = end
  "#{result}#{str.substring prev}"

br = (str, sq)-> "#{if sq then '[[' else '<<'}#{str}#{if sq then ']]' else '>>'}"

run 'test30', -> assertEq(applyBrackets(in9, 12, br), out9_12)
run 'test31', -> assertEq(applyBrackets(in9, 30, br), out9_30)

cons = Parse.cons
arrayToCons = (array)->
  res = Nil
  for i in [array.length - 1 .. 0]
    res = cons array[i], res
  res
run 'test32', ->
  ast = (LZ.parseFull '_append pairF (tail l1) l2')[0]
  assertEq(LZ.primGen(ast, 0, ast, new LZ.Code(), null, arrayToCons(['_append', 'pairF', 'tail', 'l1', 'l2']), true, 'test', "Parse.", true).main, "__append()(_pairF)((function(){var $m; return (function(){return $m || ($m = _tail()(_l1))})})())(_l2)")
run 'test33', ->
  ast = (LZ.parseFull 'pairF (head l1) (_append pairF (tail l1) l2)')[0]
  assertEq(LZ.primGen(ast, 0, ast, new LZ.Code(), null, arrayToCons(['_append', 'pairF', 'tail', 'l1', 'l2']), true, 'test', "Parse.", true).main, "_pairF()((function(){var $m; return (function(){return $m || ($m = _head()(_l1))})})())((function(){var $m; return (function(){return $m || ($m = __append()(_pairF)((function(){var $m; return (function(){return $m || ($m = _tail()(_l1))})})())(_l2))})})())")
run 'test34', ->
  ast = LZ.getNthBody((LZ.parseFull '\\pairF . \\l1 . \\l2 . pairF (head l1) (_append pairF (tail l1) l2)')[0], 4)
  assertEq(LZ.primGen(ast, 0, ast, new LZ.Code(), null, arrayToCons(['_append', 'pairF', 'tail', 'l1', 'l2']), true, 'test', "Parse.", true).main, "_pairF()((function(){var $m; return (function(){return $m || ($m = _head()(_l1))})})())((function(){var $m; return (function(){return $m || ($m = __append()(_pairF)((function(){var $m; return (function(){return $m || ($m = _tail()(_l1))})})())(_l2))})})())")

console.log '\nDone'
if !T.stats.failures then console.log "Succeeded all #{T.stats.successes} tests."
else
  console.log """
Succeeded #{T.stats.successes} test#{if T.stats.successes > 1 then 's' else ''}
Failed #{T.stats.failures} test#{if T.stats.failures > 1 then 's' else ''}:
"""
  console.log "  #{f}" for f in T.stats.failed
process.exit(0)