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

{
  readFile,
  writeFile,
} = require './base'
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
  consFrom,
  setType,
  setDataType,
} = LZ = require './ast'
{run, runTests, assertParse, assertEval, assertEvalPrint, assertEq} = T = require './testing'
{gen} = require './gen'
{
  stateValues,
  runMonad,
} = require './runtime'
{
  splitTokens,
  tokens,
  tokenString,
  parse,
  parseToAst,
  parseLine,
  genLine,
  compileLine,
  compileFile,
  jsonForFile,
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

text1 = """
  v1 = 3
  v2 = 4
  v3 = + 3 4
  """

text2 = """
  v4 = 5
  v5 = 6
  v6 = + 5 6
  """

lsr = (str)-> eval("(#{gen parseToAst(str)})")

id = (x)->x

ign = ->

delimiterPatStr = JSON.stringify LZ.delimiterPat.source

s = (str)-> JSON.stringify str

readFile 'core/simpleParse.lsr', (err, code)->
  if err then throw new Error err
  else
    writeFile '/tmp/simpleParse.js', (compileFile code), (err)->
      runTests
        test1: -> assertEq "1", "1"
        test2: -> assertEq "#{LZ.Nil}", "Cons[]"
        test3: -> assertEq "#{cons 1, cons(2, Nil)}", "Cons[1 2]"
        test4: -> assertEq "", ""
        test5: -> assertEq "#{consFrom ('1 2 3').split(' ')}", "Cons[1 2 3]"
        test6: -> assertEq "#{consFrom(('1 2 3').split(' ')).reverse()}", "Cons[3 2 1]"
        test7: -> assertEq "#{cons 1, 2}", "Cons[1 | 2]"
        test8: ->
          st = json2Ast
            _type: "lit"
            value: 3
          assertEq getLitVal(st), 3
          assertEq getLitVal(json2Ast ast2Json st), 3
        test9: ->
          st = json2Ast
            _type: "ref"
            varName: 3
          assertEq getRefName(st), 3
          assertEq getRefName(json2Ast ast2Json st), 3
        test10: ->
          assertEq getRefName(getLambdaBody(lidAst)), 'x'
          assertEq getRefName(getLambdaBody(json2Ast ast2Json lidAst)), 'x'
        test11: ->
          st = json2Ast
            _type: "cons"
            head: 1
            tail:
              _type: "nil"
          assertEq "#{st}", "Cons[1]"
          assertEq "#{json2Ast ast2Json st}", "Cons[1]"
        test12: ->
          st = json2Ast
            _type: "lit"
            value: 3
          assertEq (gen st), '3'
        test13: -> assertEq (gen lidAst), 'function(L_x){return L_x()}'
        test14: -> assertEq (gen lapplyXY), 'function(L_x){return function(L_y){return L_x()(L_y)}}'
        test15: -> assertEq (gen ltrueAst), 'function(L_a){return function(L_b){return L_a()}}'
        test16: -> assertEq (eval "(#{gen ltrueAst})")(->5)(->6), 5
        test17: -> assertEq (eval "(#{gen lfalseAst})")(->5)(->6), 6
        test18: -> assertEq (eval "(#{gen let3Ast})"), 3
        test19: ->
          stateValues.x = 2
          runMonad eval("(#{gen setXTo3Ast})"), LZ.defaultEnv, ->
          assertEq stateValues.x, 3
        test20: ->
          stateValues.x = 2
          stateValues.y = 2
          runMonad eval("(#{gen setXTo3YTo4Ast})"), LZ.defaultEnv, ->
          assertEq stateValues.x, 3
          assertEq stateValues.y, 4
        #######
        # Parsing tests
        #######
        test21: ->
          assertEq splitTokens('a b').toArray(), ['a', ' ', 'b']
          assertEq splitTokens('a b\nc').toArray(), ['a', ' ', 'b', '\n', 'c']
          assertEq splitTokens('a b#\nc').toArray(), ['a', ' ', 'b', '#', '\n', 'c']
          assertEq splitTokens('a b#\nc\n #asdf\nd#l;kj').toArray(), ['a', ' ', 'b', '#', '\n', 'c', '\n ', '#asdf', '\n', 'd', '#l;kj']
        test22: -> assertEq splitTokens('a b  c').toArray(), ['a', ' ', 'b', '  ', 'c']
        test23: -> assertEq String(tokens('a b  c')), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'
        test24: -> assertEq String(parse('a b  c')), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'

        test25: -> assertEq splitTokens('a (b)').toArray(), ['a', ' ', '(', 'b', ')']
        test26: -> assertEq String(parse('a (b)')), 'Cons[Token("a", 0) Parens(2, 5, Cons[Token("b", 3)])]'
        test27: -> assertEq String(tokens('a ( (b  )   c) ')), 'Cons[Token("a", 0) Token("(", 2) Token("(", 4) Token("b", 5) Token(")", 8) Token("c", 12) Token(")", 13)]'
        test28: -> assertEq String(parse('a ( (b  )   c) ')), 'Cons[Token("a", 0) Parens(2, 14, Cons[Parens(4, 9, Cons[Token("b", 5)]) Token("c", 12)])]'
        test29: ->
          assertEq String(parse('a.b')), 'Cons[Token("a", 0) Token(".", 1) Token("b", 2)]'
          assertEq String(parse('a.b#blorfl')), 'Cons[Token("a", 0) Token(".", 1) Token("b", 2)]'
        #######
        # AST creation tests
        #######
        test30: -> assertEq String(parseToAst('a')), 'ref(a)'
        test31: -> assertEq String(parseToAst('a b')), 'apply(a b)'
        test32: -> assertEq String(parseToAst('\\a . a')), 'lambda(\\a . a)'
        test33: -> assertEq String(parseToAst('\\a b . a')), 'lambda(\\a . \\b . a)'
        test34: -> assertEq String(parseToAst('\\a b . a b')), 'lambda(\\a . \\b . a b)'
        test35: -> assertEq String(parseToAst('\\\\(a = 1) . a')), 'let(\\\\(a = 1) . a)'
        test36: -> assertEq String(parseToAst('\\\\(a b = 1) . a')), 'let(\\\\(a = \\b . 1) . a)'
        test37: -> assertEq String(parseToAst('\\\\(a b = c) (c = 3) . a 5')), 'let(\\\\(a = \\b . c) (c = 3) . a 5)'
        test38: -> assertEq lsr('\\x . x')(-> 7), 7
        test39: -> assertEq lsr('getType "hello"'), "*string"
        test40: -> assertEq compileLine('3', Nil, (->), id)(), 3
        test41: -> assertEq compileLine('\\x . x', Nil, (->), id)()(->3), 3
        test42: ->
          assertEq String(parseLine 'id = \\x . x', Nil, id, ign), 'anno(\\@define Cons[id 0 id = \\x . x] . \\@dataType id . \\@type id . \\x . x)'
          assertEq String(parseLine 'id x = x', Nil, id, ign), 'anno(\\@define Cons[id 1 id x = x] . \\x . x)'
        test43: ->
          compileLine('id = \\x . x', Nil, id, id)
          assertEq compileLine('id', Nil, (->), id)()(->3), 3
        test44: -> assertEq compileLine('\\x y . + x y', Nil, (->), id)()(->3)(->4), 7
        test45: ->
          compileLine 'plus x y = + x y', Nil, id, id
          assertEq compileLine('plus', Nil, (->), id)()(->3)(->4), 7
        test46: -> assertEq String(parseToAst('\\@ a b . c')), 'anno(\\@a b . c)'
        test47: -> assertEq lsr('\\@ a b . 3'), 3
        test48: -> assertEq lsr('(\\@ a b . \\x . x) 4'), 4
        test49: -> assertEq String(parseToAst('(\\f . f 5) \\x . x')), 'apply((\\f . f 5) \\x . x)'
        test50: -> assertEq lsr('(\\f . f 5) \\x . x'), 5
        test51: -> assertEq lsr('(\\f . f 5) \\@ a b . \\x . x'), 5
        test52: -> assertEq lsr('getType \\@ type fred . \\x . x'), 'fred'
        test53: ->
          eval compileFile text1
          assertEq lsr('v1'), 3
          assertEq lsr('v2'), 4
          assertEq lsr('v3'), 7
        test54: ->
          for line in jsonForFile(text2).split('\n')
            eval gen json2Ast(JSON.parse line)
          assertEq lsr('v4'), 5
          assertEq lsr('v5'), 6
          assertEq lsr('v6'), 11
        test55: -> # test some string escapes
          assertEq lsr("strToList '\"'").toArray(), ['"']
          assertEq lsr("eq '1' '\\\\' 1 2"), 2
          assertEq lsr("eq '1' '\"' 1 2"), 2
          assertEq tokenString(tokens("eq '\\\\' (eq 'b' nil) 1 2").tail().head()), "'\\\\'"
        test56: ->
          eval compileFile code
          assertEq String(lsr('nil')), 'Cons[]'
        test57: -> assertEq lsr('"true"'), 'true'
        test58: -> assertEq lsr("'true'"), 'true'
        test59: -> assertEq lsr("getType 'true'"), '*string'
        test60: -> assertEq lsr("eq 1 1 3 4"), 3
        test61: -> assertEq lsr("eq 1 2 3 4"), 4
        test62: -> assertEq lsr("eq (getType nil) 'nil' 1 2"), 1
        test63: -> assertEq lsr("eq (getType (cons 1 nil)) 'cons' 1 2"), 1
        test64: -> assertEq splitTokens("splitTokens 'a b' #{delimiterPatStr}").toArray(), ['splitTokens', ' ', "'a b'", ' ', JSON.stringify(LZ.delimiterPat.source)]
        #######
        # Leisure-based parser
        #######
        test65: ->
          assertEq lsr("strSplit 'a b' #{delimiterPatStr}").toArray(), ['a', ' ', 'b']
        test66: ->
          assertEq lsr("splitTokens 'a b' #{delimiterPatStr}").toArray(), ['a', ' ', 'b']
        test67: ->
          assertEq String(lsr("tokens 'a b' #{delimiterPatStr}")), 'Cons[Token("a", 0) Token("b", 2)]'
        test68: -> assertEq lsr('getType (cons 1 nil)'), 'cons'
        test69: -> assertEq lsr('getDataType cons'), 'cons'
        test70: -> assertEq lsr('hasType (cons 1 nil) cons 1 0'), 1
        test71: -> assertEq String(parse 'a\n b'), 'Cons[Token("a", 0) Token("b", 3)]'
        test72: -> assertEq String(parse 'a\n b c'), 'Cons[Token("a", 0) Parens(1, 6, Cons[Token("b", 3) Token("c", 5)])]'
        test73: -> assertEq String(parse 'a\nb'), 'Token("a", 0)'
        test74: -> assertEq String(parse 'a\n b c\n d e'), 'Cons[Token("a", 0) Parens(1, 6, Cons[Token("b", 3) Token("c", 5)]) Parens(6, 11, Cons[Token("d", 8) Token("e", 10)])]'
        test75: -> assertEq String(parse 'a\n b c\n d e\nf'), 'Cons[Token("a", 0) Parens(1, 6, Cons[Token("b", 3) Token("c", 5)]) Parens(6, 11, Cons[Token("d", 8) Token("e", 10)])]'
        test76: -> assertEq String(parse 'a\n b c\n  d e'), 'Cons[Token("a", 0) Parens(1, 12, Cons[Token("b", 3) Token("c", 5) Parens(6, 12, Cons[Token("d", 9) Token("e", 11)])])]'
        test77: -> assertEq String(parse 'a\n b c\n  d e\n f'),
          'Cons[Token("a", 0) Parens(1, 12, Cons[Token("b", 3) Token("c", 5) Parens(6, 12, Cons[Token("d", 9) Token("e", 11)])]) Token("f", 14)]'
        test78: -> assertEq lsr('\\\\(a = 1) (b x = x) . (b a)'), 1
        test79: ->
          assertEq lsr("""
          \\\\
            a = 1
            b x = x
            .
            b a
          """), 1
        test80: -> assertEq lsr("splitTokens 'a b  c' #{delimiterPatStr}").toArray(), ['a', ' ', 'b', '  ', 'c']
        test81: -> assertEq String(lsr("tokens 'a b  c' #{delimiterPatStr}")), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'
        test82: -> assertEq lsr("'\\n'"), '\n'
        test83: -> assertEq String(lsr("reverse (cons 1 (cons 2 nil))")), 'Cons[2 1]'
        test84: -> assertEq String(lsr("parse 'a' #{delimiterPatStr}")), 'Cons[Token("a", 0)]'
        test85: -> assertEq String(lsr("parse 'a b  c' #{delimiterPatStr}")), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'
        test86: -> assertEq lsr("splitTokens 'a (b)' #{delimiterPatStr}").toArray(), ['a', ' ', '(', 'b', ')']
        test87: -> assertEq String(lsr("parse 'a (b)' #{delimiterPatStr}")), 'Cons[Token("a", 0) Parens(2, 5, Cons[Token("b", 3)])]'
        test88: ->
          assertEq String(lsr("tokens 'a ( (b  )   c) ' #{delimiterPatStr}")),
            'Cons[Token("a", 0) Token("(", 2) Token("(", 4) Token("b", 5) Token(")", 8) Token("c", 12) Token(")", 13)]'
        test89: ->
          assertEq String(lsr("parse 'a ( (b  )   c) ' #{delimiterPatStr}")),
            'Cons[Token("a", 0) Parens(2, 14, Cons[Parens(4, 9, Cons[Token("b", 5)]) Token("c", 12)])]'
        test90: -> assertEq String(lsr("parse 'a.b' #{delimiterPatStr}")), 'Cons[Token("a", 0) Token(".", 1) Token("b", 2)]'
        #######
        # Leisure-based AST creation tests
        #######
        test91: -> assertEq lsr("scrub '\"'"), "\\\""
        test92: ->
          assertEq String(lsr("parse 'a' #{delimiterPatStr}")), 'Cons[Token("a", 0)]'
          assertEq String(lsr("parseToAst 'a' #{delimiterPatStr}")), 'ref(a)'
        test93: ->
          assertEq lsr("strMatches 'a' 'a' 1 2"), 1
          assertEq String(lsr("strMatch 'a' 'b'")), "Cons[]"
          assertEq String(lsr("getType (strMatch 'a' 'b')")), "nil"
          assertEq String(lsr("hasType (strMatch 'a' 'b') nil 1 2")), "1"
          assertEq lsr("strMatches 'a' 'b' 1 2"), 2
        test94: ->
          assertEq String(lsr("parse 'a b' #{delimiterPatStr}")), 'Cons[Token("a", 0) Token("b", 2)]'
          assertEq String(lsr("parseToAst 'a b' #{delimiterPatStr}")), 'apply(a b)'
        test95: ->
          assertEq String(lsr("parse #{s '\\a . a'} #{delimiterPatStr}")), 'Cons[Token("\\\\", 0) Token("a", 1) Token(".", 3) Token("a", 5)]'
          assertEq String(lsr("parseToAst #{s '\\a . a'} #{delimiterPatStr}")), 'lambda(\\a . a)'

      console.log '\nDone'
      if !T.stats.failures then console.log "Succeeded all #{T.stats.successes} tests."
      else
        console.log """
      Succeeded #{T.stats.successes} test#{if T.stats.successes > 1 then 's' else ''}
      Failed #{T.stats.failures} test#{if T.stats.failures > 1 then 's' else ''}:
      """
      console.log "  #{f}" for f in T.stats.failed
      process.exit(0)
