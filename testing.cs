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
LZ = require './lazp.js'

stats =
  successes: 0
  failures: 0

assertEq = (actual, expected, desc)-> if expected != actual
  throw new Error("#{if desc then "[#{desc}] " else ""}Expected <#{expected}> but got <#{actual}>")

assertEval = (actual, expected, desc)->
  code = LZ.gen(LZ.parse(actual))
  if code.err then throw new Error(code.err)
  assertEq(LZ.astEval(LZ.gen(LZ.parse(actual))), expected, desc ? actual)

assertParse = (actual, expected, desc)-> assertEq(LZ.astPrint(LZ.parse(actual)), expected, desc ? actual)

run = (name, func)->
  try
    func()
    R.print('.')
    stats.successes++
  catch err
    stats.failures++
    R.print("\nFailure, #{name}: #{err.stack}")

runTests = (arg)->
  args = if typeof arg == 'object' and arg.constructor == Array then arg else arguments
  R.print("Running Tests...\n")
  run(arg[i].name, arg[i]) for i in [0...args.length]
  R.print("\nDone\n")

exports.assertEq = assertEq
exports.assertEval = assertEval
exports.assertParse = assertParse
exports.runTests = runTests
exports.run = run
exports.stats = stats