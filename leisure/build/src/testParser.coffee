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

Error.stackTraceLimit = 20

require('source-map-support').install()
{
  readFile,
  writeFile,
} = require './node'
{
  resolve,
  lazy,
} = root = module.exports = require '15-base'
rz = resolve
lz = lazy
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
} = LZ = require '16-ast'
{run, runTests, assertParse, assertEval, assertEvalPrint, assertEq} = T = require './testing'
{gen} = require '18-gen'
{
  stateValues,
  runMonad,
  identity,
  defaultEnv,
  setValue,
  getValue,
} = require '17-runtime'

runLsr = (str)-> (runMonad rz(L_runLine)(0)(L_nil)(lz str)).tail()(lz (x)-> throw rz(x))(lz (x)-> rz(x))

global.runMonad = runMonad
global.setType = setType
global.setDataType = setDataType
global.defaultEnv = defaultEnv
global.identity = identity
require 'generatedPrelude'
runLsr """
simplify exprString = do
  list <- scanLineM exprString
  visit (\\func x . isToken x (tokenString x) ((isParens x) (visit func (parensContent x)) x)) list
"""

runLsr """
visit func l = \\\\
  result = func func l
  .
  isCons result
    result \\h t . cons (visit func h) (visit func t)
    result
"""

runTests 'Leisure Full Parser',
  fullParse1: ->
    assertEq String(runLsr "scanLineM 'a +'"), 'Cons[[Token("+", EMPTYFILE.lsr:1.2) Token("a", EMPTYFILE.lsr:1.0)]]'
    assertEq String(runLsr "scanLineM 'a + b'"), 'Cons[[Token("+", EMPTYFILE.lsr:1.2) Token("a", EMPTYFILE.lsr:1.0) Token("b", EMPTYFILE.lsr:1.4)]]'
  fullParse2: ->
    assertEq String(runLsr "scanLineM 'a + b + c'"), 'Cons[[Token("+", EMPTYFILE.lsr:1.6) [Token("+", EMPTYFILE.lsr:1.2) Token("a", EMPTYFILE.lsr:1.0) Token("b", EMPTYFILE.lsr:1.4)] Token("c", EMPTYFILE.lsr:1.8)]]'
  fullParse3: ->
    assertEq runLsr("1+2*3 >= 7 == true"), rz L_true
  fullParse4: ->
    assertEq runLsr("\\\\ (a = []) . isNil a"), rz L_true
    assertEq runLsr("\\\\ (a = [1 2 3]) . (head a) == 1"), rz L_true
  fullParse5: ->
    assertEq runLsr("do (a = 3) a"), 3
    setValue 'fred', 5
    assertEq runLsr("do (a <- getValue 'fred') (a + 2)"), 7
  fullParse6: ->
    assertEq runLsr("\\\\\n  a = 3\n  .\n  a"), 3
  fullParse7: ->
    assertEq String(runLsr("simpleScanLine '\\\\\n  a = 3\n  .\n  a'")), 'Cons[Token("\\\\", 0) Parens(1, 9, Cons[Token("a", 4) Token("=", 6) Token("3", 8)]) Token(".", 12) Token("a", 16)]'
    assertEq String(runLsr("simpleScanLine 'head\n  cons\n    1\n    nil'")), 'Cons[Token("head", 0) Parens(4, 25, Cons[Token("cons", 7) Token("1", 16) Token("nil", 22)])]'
    assertEq runLsr("head\n  cons\n    1\n    nil"), 1
  fullParse7: ->
    assertEq String(runLsr("simplify '\\\\\\\\ (a = 1 : nil) . 3'")),
      'Cons[\\\\ [a = [cons 1 nil]] . 3]'

process.exit T.totalFailures
