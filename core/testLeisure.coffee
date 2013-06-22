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

Error.stackTraceLimit = Infinity

require('source-map-support').install()
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
  identity,
  defaultEnv,
  setValue,
  getValue,
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
  getDelimiterInfo,
  setDelimiterInfo,
  addDelimiter,
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

evalAst = (ast)-> eval("(#{gen ast})")

lsr = (str)-> eval("(#{gen parseToAst(str)})")

lsrD = (str)-> lsr "#{str} #{delimiterPatStr}"

strLsrD = (str)-> String(lsrD str)

lsrComp = (str, diag)->
  if diag
    console.log "COMPILE: #{str}: " + "parseLine #{s str} #{s LZ.delimiterPat.source} nil id id"
    console.log "TOKENS: " + (lsrD "tokens #{s str}")
    console.log "LIST: " + (lsrD "parse #{s str}")
    console.log "AST: " + (lsr "parseLine #{s str} #{s LZ.delimiterPat.source} nil id id")
    console.log "JS: (" + gen(lsr "parseLine #{s str} #{s LZ.delimiterPat.source} nil id id") + ")"
    console.log "done"
  monad eval "(#{gen lsr("parseLine #{s str} #{s LZ.delimiterPat.source} nil id id")})"

lsrParseToAst = (str)-> lsrComp("parseToAst #{s str} #{s LZ.delimiterPat.source}")

monad = (m)-> runMonad m, defaultEnv, id

id = (x)->x

ign = ->

delimiterPatStr = JSON.stringify LZ.delimiterPat.source

s = (str)-> JSON.stringify str

readFile 'core/simpleParse.lsr', (err, code)->
  if err then throw new Error err
  else
    writeFile '/tmp/simpleParse.js', (compileFile code, "simpleParse.js"), (err)->
      runTests 'Basic',
        basic1: -> assertEq "1", "1"
        basic2: -> assertEq "#{LZ.Nil}", "Cons[]"
        basic3: -> assertEq "#{cons 1, cons(2, Nil)}", "Cons[1 2]"
        basic4: -> assertEq "", ""
        basic5: -> assertEq "#{consFrom ('1 2 3').split(' ')}", "Cons[1 2 3]"
        basic6: -> assertEq "#{consFrom(('1 2 3').split(' ')).reverse()}", "Cons[3 2 1]"
        basic7: -> assertEq "#{cons 1, 2}", "Cons[1 | 2]"
        basic8: ->
          st = json2Ast
            _type: "lit"
            value: 3
          assertEq getLitVal(st), 3
          assertEq getLitVal(json2Ast ast2Json st), 3
        basic9: ->
          st = json2Ast
            _type: "ref"
            varName: 3
          assertEq getRefName(st), 3
          assertEq getRefName(json2Ast ast2Json st), 3
        basic10: ->
          assertEq getRefName(getLambdaBody(lidAst)), 'x'
          assertEq getRefName(getLambdaBody(json2Ast ast2Json lidAst)), 'x'
        basic11: ->
          st = json2Ast
            _type: "cons"
            head: 1
            tail:
              _type: "nil"
          assertEq "#{st}", "Cons[1]"
          assertEq "#{json2Ast ast2Json st}", "Cons[1]"
        basic12: ->
          st = json2Ast
            _type: "lit"
            value: 3
          assertEq (gen st), '3'
        basic13: -> assertEq (gen lidAst), 'function(L_x){return L_x()}'
        basic14: -> assertEq (gen lapplyXY), 'function(L_x){return function(L_y){return L_x()(L_y)}}'
        basic15: -> assertEq (gen ltrueAst), 'function(L_a){return function(L_b){return L_a()}}'
        basic16: -> assertEq (eval "(#{gen ltrueAst})")(->5)(->6), 5
        basic17: -> assertEq (eval "(#{gen lfalseAst})")(->5)(->6), 6
        basic18: -> assertEq (eval "(#{gen let3Ast})"), 3
        basic19: ->
          stateValues.x = 2
          runMonad eval("(#{gen setXTo3Ast})"), defaultEnv, ->
          assertEq stateValues.x, 3
        basic20: ->
          stateValues.x = 2
          stateValues.y = 2
          runMonad eval("(#{gen setXTo3YTo4Ast})"), defaultEnv, ->
          assertEq stateValues.x, 3
          assertEq stateValues.y, 4
      runTests 'Parsing',
        parse1: ->
          assertEq splitTokens('a b').toArray(), ['a', ' ', 'b']
          assertEq splitTokens('a b\nc').toArray(), ['a', ' ', 'b', '\n', 'c']
          assertEq splitTokens('a b#\nc').toArray(), ['a', ' ', 'b', '#', '\n', 'c']
          assertEq splitTokens('a b#\nc\n #asdf\nd#l;kj').toArray(), ['a', ' ', 'b', '#', '\n', 'c', '\n ', '#asdf', '\n', 'd', '#l;kj']
        parse2: -> assertEq String(tokens 'a b'), 'Cons[Token("a", 0) Token("b", 2)]'
        parse3: -> assertEq String(parse 'a\n b'), 'Cons[Token("a", 0) Token("b", 3)]'
        parse4: -> assertEq String(parse 'a\n b c'), 'Cons[Token("a", 0) Parens(1, 6, Cons[Token("b", 3) Token("c", 5)])]'
        parse5: -> assertEq splitTokens('a b  c').toArray(), ['a', ' ', 'b', '  ', 'c']
        parse6: -> assertEq String(tokens('a b  c')), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'
        parse7: -> assertEq String(parse('a b  c')), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'

        parse8: -> assertEq splitTokens('a (b)').toArray(), ['a', ' ', '(', 'b', ')']
        parse9: -> assertEq String(parse('a (b)')), 'Cons[Token("a", 0) Parens(2, 5, Cons[Token("b", 3)])]'
        parse10: -> assertEq String(tokens('a ( (b  )   c) ')), 'Cons[Token("a", 0) Token("(", 2) Token("(", 4) Token("b", 5) Token(")", 8) Token("c", 12) Token(")", 13)]'
        parse11: -> assertEq String(parse('a ( (b  )   c) ')), 'Cons[Token("a", 0) Parens(2, 14, Cons[Parens(4, 9, Cons[Token("b", 5)]) Token("c", 12)])]'
        parse12: ->
          assertEq String(parse('a.b')), 'Cons[Token("a", 0) Token(".", 1) Token("b", 2)]'
          assertEq String(parse('a.b#blorfl')), 'Cons[Token("a", 0) Token(".", 1) Token("b", 2)]'
          assertEq String(tokens("""
            a (\\b . c d (e f)) g
            """)), 'Cons[Token("a", 0) Token("(", 2) Token("\\\\", 3) Token("b", 4) Token(".", 6) Token("c", 8) Token("d", 10) Token("(", 12) Token("e", 13) Token("f", 15) Token(")", 16) Token(")", 17) Token("g", 19)]'
          assertEq String(parse("""
            a (\\b . c d (e f)) g
            """)), 'Cons[Token("a", 0) Parens(2, 18, Cons[Token("\\\\", 3) Token("b", 4) Token(".", 6) Token("c", 8) Token("d", 10) Parens(12, 17, Cons[Token("e", 13) Token("f", 15)])]) Token("g", 19)]'
          assertEq String(tokens("""
            a (\\b .
              c
              d (e f)) g
            """)), 'Cons[Token("a", 0) Token("(", 2) Token("\\\\", 3) Token("b", 4) Token(".", 6) Token("\\n  ", 7) Token("c", 10) Token("\\n  ", 11) Token("d", 14) Token("(", 16) Token("e", 17) Token("f", 19) Token(")", 20) Token(")", 21) Token("g", 23)]'
          assertEq String(parse("""
            a (\\b .
              c
              d (e f)) g
            """)), 'Cons[Token("a", 0) Parens(2, 22, Cons[Token("\\\\", 3) Token("b", 4) Token(".", 6) Token("c", 10) Parens(11, 21, Cons[Token("d", 14) Parens(16, 21, Cons[Token("e", 17) Token("f", 19)])])]) Token("g", 23)]'
      runTests 'AST',
        ast1: -> assertEq String(parseToAst('a')), 'ref(a)'
        ast2: -> assertEq String(parseToAst('a b')), 'apply(a b)'
        ast3: -> assertEq String(parseToAst('\\a . a')), 'lambda(\\a . a)'
        ast4: -> assertEq String(parseToAst('\\a b . a')), 'lambda(\\a . \\b . a)'
        ast5: -> assertEq String(parseToAst('\\a b . a b')), 'lambda(\\a . \\b . a b)'
        ast6: -> assertEq String(parseToAst('\\\\(a = 1) . a')), 'let(\\\\(a = 1) . a)'
        ast7: -> assertEq String(parseToAst('\\\\(a b = 1) . a')), 'let(\\\\(a = \\b . 1) . a)'
        ast8: -> assertEq String(parseToAst('\\\\(a b = c) (c = 3) . a 5')), 'let(\\\\(a = \\b . c) (c = 3) . a 5)'
        ast9: -> assertEq lsr('\\x . x')(-> 7), 7
        ast10: -> assertEq lsr('getType "hello"'), "*string"
        ast11: -> assertEq compileLine('3', Nil, (->), id), 3
        ast12: -> assertEq compileLine('\\x . x', Nil, (->), id)(->3), 3
        ast13: ->
          assertEq String(parseLine 'id = \\x . x', Nil, id, ign), 'apply(define id 0 id = \\x . x \\@dataType id . \\@type id . \\x . x)'
          assertEq String(parseLine 'id x = x', Nil, id, ign), 'apply(define id 1 id x = x \\x . x)'
        ast14: ->
          compileLine('id = \\x . x', Nil, id, id)
          assertEq compileLine('id', Nil, (->), id)(->3), 3
        ast15: -> assertEq compileLine('\\x y . + x y', Nil, (->), id)(->3)(->4), 7
        ast16: ->
          compileLine 'plus x y = + x y', Nil, id, id
          assertEq compileLine('plus', Nil, (->), id)(->3)(->4), 7
        ast17: -> assertEq String(parseToAst('\\@ a b . c')), 'anno(\\@a b . c)'
        ast18: -> assertEq lsr('\\@ a b . 3'), 3
        ast19: -> assertEq lsr('(\\@ a b . \\x . x) 4'), 4
        ast20: -> assertEq String(parseToAst('(\\f . f 5) \\x . x')), 'apply((\\f . f 5) \\x . x)'
        ast21: -> assertEq lsr('(\\f . f 5) \\x . x'), 5
        ast22: -> assertEq lsr('(\\f . f 5) \\@ a b . \\x . x'), 5
        ast23: -> assertEq lsr('getType \\@ type fred . \\x . x'), 'fred'
        ast24: ->
          eval compileFile text1
          assertEq lsr('v1'), 3
          assertEq lsr('v2'), 4
          assertEq lsr('v3'), 7
        ast25: ->
          for line in jsonForFile(text2).split('\n')
            runMonad (eval gen json2Ast(JSON.parse line)), defaultEnv, id
          assertEq lsr('v4'), 5
          assertEq lsr('v5'), 6
          assertEq lsr('v6'), 11
        ast26: -> # test some string escapes
          assertEq lsr("strToList '\"'").toArray(), ['"']
          assertEq lsr("eq '1' '\\\\' 1 2"), 2
          assertEq lsr("eq '1' '\"' 1 2"), 2
          assertEq tokenString(tokens("eq '\\\\' (eq 'b' nil) 1 2").tail().head()), "'\\\\'"
        ast27: ->
          eval compileFile code
          assertEq String(lsr('nil')), 'Cons[]'
        ast28: -> assertEq lsr('"true"'), 'true'
        ast29: -> assertEq lsr("'true'"), 'true'
        ast30: -> assertEq lsr("getType 'true'"), '*string'
        ast31: -> assertEq lsr("eq 1 1 3 4"), 3
        ast32: -> assertEq lsr("eq 1 2 3 4"), 4
        ast33: -> assertEq lsr("eq (getType nil) 'nil' 1 2"), 1
        ast34: -> assertEq lsr("eq (getType (cons 1 nil)) 'cons' 1 2"), 1
        ast35: -> assertEq splitTokens("splitTokens 'a b' #{delimiterPatStr}").toArray(), ['splitTokens', ' ', "'a b'", ' ', JSON.stringify(LZ.delimiterPat.source)]
        ast36: ->
          assertEq String(splitTokens("'^[ \\t]*#.*|^[ \\t]*$'")), 'Cons[\'^[ \\t]*#.*|^[ \\t]*$\']'
          assertEq String(parseToAst "'^[ \\t]*#.*|^[ \\t]*$'"), 'lit(^[ \t]*#.*|^[ \t]*$)'
          assertEq gen(parseToAst "'^[ \\t]*#.*|^[ \\t]*$'"), '\"^[ \\t]*#.*|^[ \\t]*$\"'
          assertEq lsr("'^[ \\t]*#.*|^[ \\t]*$'"), '^[ \t]*#.*|^[ \t]*$'
      runTests 'Leisure parser',
        leisureParse1: ->
          assertEq lsr("strSplit 'a b' #{delimiterPatStr}").toArray(), ['a', ' ', 'b']
        leisureParse2: ->
          assertEq lsrD("splitTokens 'a b'").toArray(), ['a', ' ', 'b']
          assertEq lsrD("splitTokens 'a b\nc'").toArray(), ['a', ' ', 'b', '\n', 'c']
          assertEq lsrD("splitTokens 'a b#\nc'").toArray(), ['a', ' ', 'b', '#', '\n', 'c']
          assertEq lsrD("splitTokens 'a b#\nc\n #asdf\nd#l;kj'").toArray(), ['a', ' ', 'b', '#', '\n', 'c', '\n ', '#asdf', '\n', 'd', '#l;kj']
        leisureParse3: -> assertEq strLsrD("tokens 'a b'"), 'Cons[Token("a", 0) Token("b", 2)]'
        leisureParse4: -> assertEq lsr('getType (cons 1 nil)'), 'cons'
        leisureParse5: -> assertEq lsr('getDataType cons'), 'cons'
        leisureParse6: -> assertEq lsr('hasType (cons 1 nil) cons 1 0'), 1
        leisureParse7: -> assertEq strLsrD("parse 'a\n b'"), 'Cons[Token("a", 0) Token("b", 3)]'
        leisureParse8: -> assertEq strLsrD("parse 'a\n b c'"), 'Cons[Token("a", 0) Parens(1, 6, Cons[Token("b", 3) Token("c", 5)])]'
        leisureParse9: -> assertEq strLsrD("parse 'a\n b c'"), 'Cons[Token("a", 0) Parens(1, 6, Cons[Token("b", 3) Token("c", 5)])]'
        leisureParse10: -> assertEq strLsrD("parse 'a\nb'"), 'Token("a", 0)'
        leisureParse11: -> assertEq strLsrD("parse 'a\n b c\n d e'"), 'Cons[Token("a", 0) Parens(1, 6, Cons[Token("b", 3) Token("c", 5)]) Parens(6, 11, Cons[Token("d", 8) Token("e", 10)])]'
        leisureParse12: -> assertEq strLsrD("parse 'a\n b c\n d e\nf'"), 'Cons[Token("a", 0) Parens(1, 6, Cons[Token("b", 3) Token("c", 5)]) Parens(6, 11, Cons[Token("d", 8) Token("e", 10)])]'
        leisureParse13: -> assertEq strLsrD("parse 'a\n b c\n  d e'"), 'Cons[Token("a", 0) Parens(1, 12, Cons[Token("b", 3) Token("c", 5) Parens(6, 12, Cons[Token("d", 9) Token("e", 11)])])]'
        leisureParse14: -> assertEq strLsrD("parse 'a\n b c\n  d e\n f'"),
          'Cons[Token("a", 0) Parens(1, 12, Cons[Token("b", 3) Token("c", 5) Parens(6, 12, Cons[Token("d", 9) Token("e", 11)])]) Token("f", 14)]'
        leisureParse15: -> assertEq lsr('\\\\(a = 1) (b x = x) . (b a)'), 1
        leisureParse16: ->
          assertEq lsr("""
          \\\\
            a = 1
            b x = x
            .
            b a
          """), 1
        leisureParse17: -> assertEq lsrD("splitTokens 'a b  c'").toArray(), ['a', ' ', 'b', '  ', 'c']
        leisureParse18: -> assertEq strLsrD("tokens 'a b  c'"), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'
        leisureParse19: -> assertEq lsr("'\\n'"), '\n'
        leisureParse20: -> assertEq String(lsr("reverse (cons 1 (cons 2 nil))")), 'Cons[2 1]'
        leisureParse21: -> assertEq strLsrD("parse 'a'"), 'Token("a", 0)'
        leisureParse22: -> assertEq strLsrD("parse 'a b  c'"), 'Cons[Token("a", 0) Token("b", 2) Token("c", 5)]'
        leisureParse23: -> assertEq lsrD("splitTokens 'a (b)'").toArray(), ['a', ' ', '(', 'b', ')']
        leisureParse24: -> assertEq strLsrD("parse 'a (b)'"), 'Cons[Token("a", 0) Parens(2, 5, Cons[Token("b", 3)])]'
        leisureParse25: ->
          assertEq strLsrD("tokens 'a ( (b  )   c) '"),
            'Cons[Token("a", 0) Token("(", 2) Token("(", 4) Token("b", 5) Token(")", 8) Token("c", 12) Token(")", 13)]'
        leisureParse26: ->
          assertEq strLsrD("parse 'a ( (b  )   c) '"),
            'Cons[Token("a", 0) Parens(2, 14, Cons[Parens(4, 9, Cons[Token("b", 5)]) Token("c", 12)])]'
        leisureParse27: ->
          assertEq strLsrD("parse 'a.b'"), 'Cons[Token("a", 0) Token(".", 1) Token("b", 2)]'
          assertEq strLsrD("parse 'a.b#blorfl'"), 'Cons[Token("a", 0) Token(".", 1) Token("b", 2)]'
          assertEq strLsrD("tokens 'a (\\\\b . c d (e f)) g'"),
            'Cons[Token("a", 0) Token("(", 2) Token("\\\\", 3) Token("b", 4) Token(".", 6) Token("c", 8) Token("d", 10) Token("(", 12) Token("e", 13) Token("f", 15) Token(")", 16) Token(")", 17) Token("g", 19)]'
          assertEq strLsrD("parse 'a (\\\\b . c d (e f)) g'"),
            'Cons[Token("a", 0) Parens(2, 18, Cons[Token("\\\\", 3) Token("b", 4) Token(".", 6) Token("c", 8) Token("d", 10) Parens(12, 17, Cons[Token("e", 13) Token("f", 15)])]) Token("g", 19)]'
          assertEq strLsrD("tokens #{s """
            a (\\b .
              c
              d (e f)) g
            """}"),
            'Cons[Token("a", 0) Token("(", 2) Token("\\\\", 3) Token("b", 4) Token(".", 6) Token("\\n  ", 7) Token("c", 10) Token("\\n  ", 11) Token("d", 14) Token("(", 16) Token("e", 17) Token("f", 19) Token(")", 20) Token(")", 21) Token("g", 23)]'
          assertEq strLsrD("parse #{s """
            a (\\b .
              c
              d (e f)) g
            """}"),
            'Cons[Token("a", 0) Parens(2, 22, Cons[Token("\\\\", 3) Token("b", 4) Token(".", 6) Token("c", 10) Parens(11, 21, Cons[Token("d", 14) Parens(16, 21, Cons[Token("e", 17) Token("f", 19)])])]) Token("g", 23)]'
        leisureParse28: -> assertEq strLsrD("parse #{s '"a b"'}"), 'Token("\\\"a b\\\"", 0)'
      runTests 'Leisure AST',
        leisureAst1: -> assertEq lsr("scrub '\"'"), "\\\""
        leisureAst2: -> assertEq strLsrD("parseToAst 'a'"), 'ref(a)'
        leisureAst3: ->
          assertEq lsr("strMatches 'a' 'a' 1 2"), 1
          assertEq String(lsr("strMatch 'a' 'b'")), "Cons[]"
          assertEq String(lsr("getType (strMatch 'a' 'b')")), "nil"
          assertEq String(lsr("hasType (strMatch 'a' 'b') nil 1 2")), "1"
          assertEq lsr("strMatches 'a' 'b' 1 2"), 2
        leisureAst4: -> #ast1
          assertEq strLsrD("parse 'a b'"), 'Cons[Token("a", 0) Token("b", 2)]'
          assertEq strLsrD("parseToAst 'a b'"), 'apply(a b)'
        leisureAst5: -> #ast3
          assertEq strLsrD("parse #{s '\\a . a'}"), 'Cons[Token("\\\\", 0) Token("a", 1) Token(".", 3) Token("a", 5)]'
          assertEq strLsrD("parseToAst #{s '\\a . a'}"), 'lambda(\\a . a)'
        leisureAst6: ->
          lsr("\\@define (duh 1 'duh x = x') . \\x . x")
          assertEq lsr("duh 3"), 3
        leisureAst7: ->
          assertEq strLsrD("parseToAst #{s '\\@ a . 1'}"), 'anno(\\@a Cons[] . 1)'
        leisureAst8: ->
          assertEq strLsrD("parseToAst #{s '\\@ a b . 1'}"), 'anno(\\@a b . 1)'
        leisureAst9: ->
          assertEq lsr('\\\\ (x = 1) (x = + x 1) . x'), 2
        leisureAst10: -> #ast4
          assertEq strLsrD("parseToAst #{s '\\a b . a'}"), 'lambda(\\a . \\b . a)'
        leisureAst11: -> #ast5
          assertEq strLsrD("parseToAst #{s '\\a b . a b'}"), 'lambda(\\a . \\b . a b)'
        leisureAst12: -> #ast6
          assertEq strLsrD("parseToAst #{s '\\\\(a = 1) . a'}"), 'let(\\\\(a = 1) . a)'
        leisureAst13: -> #ast7
          assertEq strLsrD("parseToAst #{s '\\\\(a b = 1) . a'}"), 'let(\\\\(a = \\b . 1) . a)'
        leisureAst14: -> #ast8
          assertEq strLsrD("parseToAst #{s '\\\\(a b = c) (c = 3) . a'}"), 'let(\\\\(a = \\b . c) (c = 3) . a)'
        leisureAst15: ->
          assertEq strLsrD("parseToAst #{s '\\\\(a b = c) (c = 3) . a 5'}"), 'let(\\\\(a = \\b . c) (c = 3) . a 5)'
        leisureAst16: ->
          assertEq strLsrD("parseToAst '3'"), 'lit(3)'
        leisureAst17: ->
          assertEq lsr("(\\x . x) 3"), 3
        leisureAst18: ->
          assertEq evalAst(lsrD("parseToAst '3'")), 3
        leisureAst19: ->
          assertEq lsrComp("(\\x . x) 3"), 3
        leisureAst20: -> #ast9
          assertEq lsrComp("\\x . x")(->7), 7
        leisureAst21: ->
          assertEq lsr("\"hello\""), 'hello'
          assertEq strLsrD("parseToAst #{s '"hello"'}"), 'lit(hello)'
          assertEq lsrComp('"hello"'), 'hello'
        leisureAst22: -> #ast10
          assertEq lsrComp('getType "hello"'), "*string"
        leisureAst23: -> #ast11:
          assertEq lsrComp('3'), 3
        leisureAst24: -> #ast12:
          assertEq lsrComp('\\x . x')(->3), 3
        leisureAst25: -> #ast13:
          #console.log "(" + gen(parseToAst "parseLine 'id = \\x . x' #{delimiterPatStr} nil id id") + ")"
          assertEq String(parseLine 'id = \\x . x', Nil, id, id), 'apply(define id 0 id = \\x . x \\@dataType id . \\@type id . \\x . x)'
          assertEq String(lsr("parseToAst #{s '\\x . x'} #{delimiterPatStr}")), 'lambda(\\x . x)'
          assertEq String(lsr("scanLine #{s 'id = \\x . x'} #{delimiterPatStr} id id")), """
            Cons[Token("define", 5) Token("\\"id\\"", 5) Token("0", 5) Token("\\"id = \\\\\\\\x . x\\"", 5) Cons[Token("\\\\@", 5) Token("dataType", 5) Token("id", 5) Token(".", 5) Token("\\\\@", 5) Token("type", 5) Token("id", 5) Token(".", 5) Token("\\\\", 5) Token("x", 6) Token(".", 8) Token("x", 10)]]
          """
          assertEq String(lsr("parseLine #{s 'id = \\x . x'} #{delimiterPatStr} nil id id")), 'apply(define id 0 id = \\x . x \\@dataType id . \\@type id . \\x . x)'
          assertEq String(lsr("parseLine 'id x = x' #{delimiterPatStr} nil id id")), 'apply(define id 1 id x = x \\x . x)'
        leisureAst26: -> #ast14: ->
          lsrComp("id2 = \\x . x")
          assertEq lsrComp('id2')(->3), 3
        leisureAst27: -> #ast15: ->
          assertEq lsrComp('\\x y . + x y')(->3)(->4), 7
        leisureAst28: -> #ast16: ->
          compileLine 'plus x y = + x y', Nil, id, id
          assertEq compileLine('plus', Nil, (->), id)(->3)(->4), 7
        leisureAst29: -> #ast17: -> assertEq String(parseToAst('\\@ a b . c')), 'anno(\\@a b . c)'
          assertEq String(lsrParseToAst '\\@ a b . c'), 'anno(\\@a b . c)'
        leisureAst30: -> #ast18: -> assertEq lsr('\\@ a b . 3'), 3
          assertEq lsrComp('\\@ a b . 3'), 3
        leisureAst31: -> #ast19: -> assertEq lsr('(\\@ a b . \\x . x) 4'), 4
          assertEq lsrComp('(\\@ a b . \\x . x) 4'), 4
        leisureAst32: -> #ast20: -> assertEq String(parseToAst('(\\f . f 5) \\x . x')), 'apply((\\f . f 5) \\x . x)'
          assertEq String(lsrParseToAst '(\\f . f 5) \\x . x'), 'apply((\\f . f 5) \\x . x)'
        leisureAst33: -> #ast21: -> assertEq lsr('(\\f . f 5) \\x . x'), 5
          assertEq lsrComp('(\\f . f 5) \\x . x'), 5
        leisureAst34: -> #ast22: -> assertEq lsr('(\\f . f 5) \\@ a b . \\x . x'), 5
          assertEq lsrComp('(\\f . f 5) \\@ a b . \\x . x'), 5
        leisureAst35: -> #ast23: -> assertEq lsr('getType \\@ type fred . \\x . x'), 'fred'
          assertEq lsrComp('getType \\@ type fred . \\x . x'), 'fred'
        leisureAst36: -> #ast24
          assertEq lsrComp('v1'), 3
          assertEq lsrComp('v2'), 4
          assertEq lsrComp('v3'), 7
        leisureAst37: -> #ast25: ->
          #for line in jsonForFile(text2).split('\n')
          #  runMonad (eval gen json2Ast(JSON.parse line)), defaultEnv, id
          assertEq lsrComp('v4'), 5
          assertEq lsrComp('v5'), 6
          assertEq lsrComp('v6'), 11
        leisureAst38: -> #ast26: -> # test some string escapes
          assertEq lsrComp("strToList #{s '\"'}").toArray(), ['"']
          assertEq lsrComp("eq #{s '1'} #{s '\\\\'} 1 2"), 2
          assertEq lsrComp("eq #{s '1'} #{s '\"'} 1 2"), 2
          assertEq lsrComp("tokenString (head (tail (tokens #{s "eq '\\\\' (eq 'b' nil) 1 2"} #{delimiterPatStr})))"), "'\\\\'"
        leisureAst39: -> #ast27: ->
          assertEq String(lsrComp('nil')), 'Cons[]'

        leisureAst40: -> #ast28: -> assertEq lsr('"true"'), 'true'
          assertEq lsrComp(s "true"), 'true'
        leisureAst41: -> #ast29: -> assertEq lsr("'true'"), 'true'
          assertEq lsrComp(s 'true'), 'true'
        leisureAst42: -> #ast30: -> assertEq lsr("getType 'true'"), '*string'
          assertEq lsr("getType #{s 'true'}"), '*string'
        leisureAst43: -> #ast31: -> assertEq lsr("eq 1 1 3 4"), 3
          assertEq lsrComp("eq 1 1 3 4"), 3
        leisureAst44: -> #ast32: -> assertEq lsr("eq 1 2 3 4"), 4
          assertEq lsrComp("eq 1 2 3 4"), 4
        leisureAst45: -> #ast33: -> assertEq lsr("eq (getType nil) 'nil' 1 2"), 1
          assertEq lsrComp("eq (getType nil) #{s 'nil'} 1 2"), 1
        leisureAst46: -> #ast34: -> assertEq lsr("eq (getType (cons 1 nil)) 'cons' 1 2"), 1
          assertEq lsrComp("eq (getType (cons 1 nil)) #{s 'cons'} 1 2"), 1
        leisureAst47: -> #ast35: -> assertEq splitTokens("splitTokens 'a b' #{delimiterPatStr}").toArray(), ['splitTokens', ' ', "'a b'", ' ', JSON.stringify(LZ.delimiterPat.source)]
          assertEq lsrComp("splitTokens #{s "splitTokens 'a b' #{delimiterPatStr}"} #{delimiterPatStr}").toArray(), ['splitTokens', ' ', "'a b'", ' ', JSON.stringify(LZ.delimiterPat.source)]
        leisureAst48: -> #ast36
          assertEq String(lsrComp("splitTokens #{s "'^[ \\t]*#.*|^[ \\t]*$'"} #{delimiterPatStr}")), 'Cons[\'^[ \\t]*#.*|^[ \\t]*$\']'
          assertEq String(lsrParseToAst s '^[ \t]*#.*|^[ \t]*$'), 'lit(^[ \t]*#.*|^[ \t]*$)'
          assertEq gen(lsrParseToAst s '^[ \t]*#.*|^[ \t]*$'), '\"^[ \\t]*#.*|^[ \\t]*$\"'
          assertEq lsrComp(s '^[ \t]*#.*|^[ \t]*$'), '^[ \t]*#.*|^[ \t]*$'
        leisureAst49: ->
          info = getDelimiterInfo()
          addDelimiter '['
          addDelimiter ']'
          assertEq String(lsrComp("splitTokens #{s '[a]'} #{s LZ.delimiterPat.source}")), 'Cons[[ a ]]'
          assertEq String(lsr("parseG #{s '[a] [b]'} #{s LZ.delimiterPat.source} (acons '[' ']' parenGroups)")),
            'Cons[Parens(0, 3, Cons[Token("[", 0) Token("a", 1) Token("]", 2)]) Parens(4, 7, Cons[Token("[", 4) Token("b", 5) Token("]", 6)])]'
          assertEq String(lsr("parseG #{s '(a]'} #{s LZ.delimiterPat.source} (acons '[' ']' parenGroups)")),
            'ParseErr("Mismatched group: (] at 0")'
          setDelimiterInfo info
          assertEq String(lsrComp("splitTokens #{s '[a]'} #{s LZ.delimiterPat.source}")), 'Cons[[a]]'
        leisureAst50: -> #test monadic parsing
          info = getDelimiterInfo()
          addDelimiter '['
          addDelimiter ']'
          setValue 'tokenPat', LZ.delimiterPat
          setValue 'groups', cons cons('(', ')'), cons cons('[', ']'), Nil
          assertEq String(monad lsr "parseM 'a'"), 'Token("a", 0)'
          assertEq String(monad lsr "parseM '[a]'"), 'Cons[Token("[", 0) Token("a", 1) Token("]", 2)]'
          setDelimiterInfo info
        leisureAst51: ->
          oldMacs = getValue 'macros'
          monad lsr "defMacro 'double' \\ex . withCons ex ex \\h t . cons h ex"
          monad lsr "defMacro 'b' \\ex . token 'b' (position ex)"
          assertEq String(monad lsr "macroParse 'double a'"), 'Cons[Token("a", 7) Token("a", 7)]'
          assertEq String(monad lsr "macroParse 'double a b'"), 'Cons[Token("a", 7) Token("a", 7) Token("b", 9)]'
          assertEq String(monad lsr "macroParse 'b 2'"), 'Token("b", 2)'
          assertEq String(monad lsr "macroParse '(b 2) 3'"), 'Token("b", 6)'
          assertEq String(monad lsr "macroParse 'double (b 2) 3 4'"), 'Token("b", 7)'
          #assertEq String(monad lsr "tokensM 'double (b 2) 3 4'"), 'Token("b", 10)'
          assertEq String(monad lsr "macroParse 'double (double a)'"), 'Cons[Cons[Token("a", 15) Token("a", 15)] Cons[Token("a", 15) Token("a", 15)]]'
          setValue 'macros', oldMacs

      console.log '\nDone'
      process.exit(0)
