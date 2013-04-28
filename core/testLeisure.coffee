###
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

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
{
  define,
  scan,
  cons,
  Nil,
  json2Ast,
  ast2Json,
  getLitVal,
  getRefName,
  getLambdaBody,
  consFrom
} = LZ = require './ast'
{run, assertParse, assertEval, assertEvalPrint, assertEq} = T = require './testing'
{gen} = require './gen'
{
  stateValues,
  runMonad,
} = require './runtime'
{
  splitTokens,
  tokens,
  parse,
  parseToAst,
} = require './simpleParse'

console.log 'Testing CoffeeScript'

debug = false

parseJson = (str)-> json2Ast JSON.parse str

define 'log', (-> (msg)->(val)->
  console.log msg()
  val())

ltrueAst = json2Ast
  _type: "lambda"
  varName: "a"
  body:
    _type: "lambda"
    varName: "b"
    body:
      _type: "ref"
      varName: "a"

lfalseAst = json2Ast
  _type: "lambda"
  varName: "a"
  body:
    _type: "lambda"
    varName: "b"
    body:
      _type: "ref"
      varName: "b"

lidAst = json2Ast
  _type: "lambda"
  varName: "x"
  body:
    _type: "ref"
    varName: "x"

lapplyXY = json2Ast
  _type: "lambda"
  varName: "x"
  body:
    _type: "lambda"
    varName: "y"
    body:
      _type: "apply"
      func:
        _type: "ref"
        varName: "x"
      arg:
        _type: "ref"
        varName: "y"

let3Ast = json2Ast
  _type: 'let'
  varName: 'x'
  value:
    _type: 'lit'
    value: 3
  body:
    _type: 'let'
    varName: 'y'
    value:
      _type: 'apply'
      func:
        _type: 'apply'
        func:
          _type: 'ref'
          varName: 'log'
        arg:
          _type: 'lit'
          value: "hello y"
      arg:
        _type: 'lit'
        value: 4
    body:
      _type: 'ref'
      varName: 'x'

run 'test1', -> assertEq "1", "1"
run 'test2', -> assertEq "#{LZ.Nil}", "Cons[]"
run 'test3', -> assertEq "#{cons 1, cons(2, Nil)}", "Cons[1 2]"
run 'test4', -> assertEq "", ""
run 'test5', -> assertEq "#{consFrom ('1 2 3').split(' ')}", "Cons[1 2 3]"
run 'test6', -> assertEq "#{consFrom(('1 2 3').split(' ')).reverse()}", "Cons[3 2 1]"
run 'test7', -> assertEq "#{cons 1, 2}", "Cons[1 | 2]"
run 'test8', ->
  st = json2Ast
    _type: "lit"
    value: 3
  assertEq getLitVal(st), 3
  assertEq getLitVal(json2Ast ast2Json st), 3
run 'test9', ->
  st = json2Ast
    _type: "ref"
    varName: 3
  assertEq getRefName(st), 3
  assertEq getRefName(json2Ast ast2Json st), 3
run 'test10', ->
  assertEq getRefName(getLambdaBody(lidAst)), 'x'
  assertEq getRefName(getLambdaBody(json2Ast ast2Json lidAst)), 'x'
run 'test11', ->
  st = json2Ast
    _type: "cons"
    head: 1
    tail:
      _type: "nil"
  assertEq "#{st}", "Cons[1]"
  assertEq "#{json2Ast ast2Json st}", "Cons[1]"
run 'test12', ->
  st = json2Ast
    _type: "lit"
    value: 3
  assertEq (gen st), '3'
run 'test13', -> assertEq (gen lidAst), 'function(L_x){return L_x()}'
run 'test14', -> assertEq (gen lapplyXY), 'function(L_x){return function(L_y){return L_x()(L_y)}}'
run 'test15', -> assertEq (gen ltrueAst), 'function(L_a){return function(L_b){return L_a()}}'
run 'test16', -> assertEq (eval "(#{gen ltrueAst})")(->5)(->6), 5
run 'test17', -> assertEq (eval "(#{gen lfalseAst})")(->5)(->6), 6
run 'test18', -> assertEq (eval "(#{gen let3Ast})"), 3

setXTo3Ast = json2Ast
  _type: 'apply'
  func:
    _type: 'apply'
    func:
      _type: 'ref'
      varName: 'setValue'
    arg:
      _type: 'lit'
      value: 'x'
  arg:
    _type: 'lit'
    value: 3

run 'test19', ->
  stateValues.x = 2
  runMonad eval("(#{gen setXTo3Ast})"), root.defaultEnv, ->
  assertEq stateValues.x, 3

setXTo3YTo4Ast = json2Ast
  _type: 'apply'
  func:
    _type: 'apply'
    func:
      _type: 'ref'
      varName: 'bind'
    arg:
      _type: 'apply'
      func:
        _type: 'apply'
        func:
          _type: 'ref'
          varName: 'setValue'
        arg:
          _type: 'lit'
          value: 'x'
      arg:
        _type: 'lit'
        value: 3
  arg:
    _type: 'lambda'
    varName: 'bubba'
    body:
      _type: 'apply'
      func:
        _type: 'apply'
        func:
          _type: 'ref'
          varName: 'setValue'
        arg:
          _type: 'lit'
          value: 'y'
      arg:
        _type: 'lit'
        value: 4

run 'test20', ->
  stateValues.x = 2
  stateValues.y = 2
  runMonad eval("(#{gen setXTo3YTo4Ast})"), root.defaultEnv, ->
  assertEq stateValues.x, 3
  assertEq stateValues.y, 4

run 'test21', -> assertEq splitTokens('a b').toArray(), ['a', ' ', 'b']
run 'test22', -> assertEq splitTokens('a b  c').toArray(), ['a', ' ', 'b', '  ', 'c']
run 'test23', -> assertEq String(tokens('a b  c')), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'
run 'test24', -> assertEq String(parse('a b  c')), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'
run 'test25', -> assertEq splitTokens('a (b)').toArray(), ['a', ' ', '(', 'b', ')']
run 'test26', -> assertEq String(parse('a (b)')), 'Cons[Token("a", 0) Parens(2, 5, Cons[Token("b", 3)])]'
run 'test27', -> assertEq String(tokens('a ( (b  )   c) ')), 'Cons[Token("a", 0) Token("(", 2) Token("(", 4) Token("b", 5) Token(")", 8) Token("c", 12) Token(")", 13)]'
run 'test28', -> assertEq String(parse('a ( (b  )   c) ')), 'Cons[Token("a", 0) Parens(2, 14, Cons[Parens(4, 9, Cons[Token("b", 5)]) Token("c", 12)])]'
run 'test29', -> assertEq String(parse('a.b')), 'Cons[Token("a", 0) Token(".", 1) Token("b", 2)]'
run 'test30', -> assertEq String(parseToAst('a')), 'ref(a)'
run 'test31', -> assertEq String(parseToAst('a b')), 'apply(a b)'
run 'test32', -> assertEq String(parseToAst('\\a . a')), 'lambda(\\a . a)'
run 'test33', -> assertEq String(parseToAst('\\a b . a')), 'lambda(\\a . \\b . a)'
run 'test34', -> assertEq String(parseToAst('\\a b . a b')), 'lambda(\\a . \\b . a b)'
run 'test35', -> assertEq String(parseToAst('\\\\(a = 1) a')), 'let(\\\\(a = 1) a)'

console.log '\nDone'
if !T.stats.failures then console.log "Succeeded all #{T.stats.successes} tests."
else
  console.log """
Succeeded #{T.stats.successes} test#{if T.stats.successes > 1 then 's' else ''}
Failed #{T.stats.failures} test#{if T.stats.failures > 1 then 's' else ''}:
"""
console.log "  #{f}" for f in T.stats.failed
process.exit(0)
