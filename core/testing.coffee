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
Wimpy testing framework
###

U = require('util')
exports = module.exports = require './base'
require './ast'

stats =
  successes: 0
  failures: 0
  failed: []

eq = (a, b)-> a == b or (eqArray a, b)

eqArray = (a, b)->
  if a.constructor != Array || b.constructor != Array || a.length != b.length then false
  else
    for i in [0...a.length]
      if !eq a[i], b[i] then return false
    true

assertEq = (actual, expected, desc)-> if !eq expected, actual
  throw new Error("#{if desc then "[#{desc}] " else ""}Expected <#{expected}> but got <#{actual}>")

log = (args...)->process.stdout.write(U.format.apply(null, args))

run = (name, func)->
  try
    func()
    log '.'
    stats.successes++
  catch err
    stats.failures++
    stats.failed.push name
    log "\nFailure, #{name}: #{err.stack}"

runTests = (arg)->
  args = if typeof arg == 'object' and arg.constructor == Array then arg else arguments
  log "Running Tests...\n"
  run(arg[i].name, arg[i]) for i in [0...args.length]
  log "\nDone\n"

exports.assertEq = assertEq
exports.runTests = runTests
exports.run = run
exports.stats = stats
