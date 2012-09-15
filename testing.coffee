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
Wimpy testing framework
###

R = require './repl'
Parse = require './parse'
LZ = require './leisure'

stats =
  successes: 0
  failures: 0
  failed: []

assertEq = (actual, expected, desc)-> if expected != actual
  throw new Error("#{if desc then "[#{desc}] " else ""}Expected <#{expected}> but got <#{actual}>")

assertEval = (actual, expected, desc)->
  [ast, err, rest] = LZ.parseFull(actual)
  if err? then throw new Error("Error: #{err}")
  else if rest?.trim() then throw new Error("Error, input left after parsing: '#{rest.trim()}'")
  else
    code = LZ.gen(ast)
    if code.err then throw new Error(code.err)
    assertEq(LZ.astEval(code), expected, desc ? actual)

assertEvalPrint = (actual, expected, desc)->
  [ast, err, rest] = LZ.parseFull(actual)
  if err? then throw new Error("Error: #{err}")
  else if rest?.trim() then throw new Error("Error, input left after parsing: '#{rest.trim()}'")
  else
    code = LZ.gen(ast)
    if code.err then throw new Error(code.err)
    v = Parse.print(LZ.astEval(code))
    assertEq(v, expected, desc ? actual)

astPrint = (ast, res)->
  isFirst = !res
  res = res ? []
  switch Parse.getAstType ast
    when 'ref'
      res.push 'ref '
      val = Parse.getRefVar ast
      if val.lambda then throw new Error("Attempt to use lambda in ref, instead of string or number: " + val)
      res.push val
    when 'lit'
      res.push 'lit '
      val = Parse.getLitVal ast
      res.push if val?.lambda then "{" + val.lambda.toString() + "}" else val
    when 'lambda'
      res.push 'lambda '
      res.push (Parse.getLambdaVar ast)
      res.push ' . '
      astPrint (Parse.getLambdaBody ast), res
    when 'apply'
      func = Parse.getApplyFunc ast
      arg = Parse.getApplyArg ast
      res.push 'apply ('
      astPrint (Parse.getApplyFunc ast), res
      res.push ') ('
      astPrint (Parse.getApplyArg ast), res
      res.push ')'
    else throw new Error("Unknown type of object in AST: " + ast)
  isFirst and res.join('')

assertParse = (actual, expected, desc)->
  [ast, err, rest] = LZ.parseFull(actual)
  if err? then throw new Error("Error: #{err}")
  else if rest?.trim() then throw new Error("Error, input left after parsing: '#{rest.trim()}'")
  else assertEq(astPrint(ast), expected, desc ? actual)

run = (name, func)->
  try
    func()
    R.print('.')
    stats.successes++
  catch err
    stats.failures++
    stats.failed.push name
    R.print("\nFailure, #{name}: #{err.stack}")

runTests = (arg)->
  args = if typeof arg == 'object' and arg.constructor == Array then arg else arguments
  R.print("Running Tests...\n")
  run(arg[i].name, arg[i]) for i in [0...args.length]
  R.print("\nDone\n")

exports.assertEq = assertEq
exports.assertEval = assertEval
exports.assertEvalPrint = assertEvalPrint
exports.assertParse = assertParse
exports.runTests = runTests
exports.run = run
exports.stats = stats
