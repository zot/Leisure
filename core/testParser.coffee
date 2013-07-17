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

runLsr = (str)-> (runMonad L_runLine()(L_nil)(-> str)).tail()

global.runMonad = runMonad
global.setType = setType
global.setDataType = setDataType
global.defaultEnv = defaultEnv
global.identity = identity
require './generatedPrelude'
runTests 'Leisure Full Parser',
  fullParse1: ->
    runLsr """
    testInfix line = bind (setValue 'infixPrecedence' ['+' '-' '*' '/'])
        \\_ . bind (scanLineM line)
          \\code . infix code
    """
    assertEq String(runLsr "testInfix 'a + b'"), 'Cons[[Token("+", 2) Token("a", 0) Token("b", 4)]]'
    assertEq String(runLsr "testInfix 'a +'"), 'Cons[[Token("+", 2) Token("a", 0)]]'
  #fullParse2: ->
  #  assertEq String(runLsr "testInfix 'a + b + c'"), 'Cons[[Token("+", 2) Token("a", 0)]]'

process.exit T.stats.failures
