###
Copyright (C) 2013, Bill Burdick

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

root = module.exports = require './base'

stats = {}

initStats = ->
  root.stats = stats =
    successes: 0
    failures: 0
    failed: []
    traces: []

eq = (a, b)-> a == b or (eqArray a, b)

eqArray = (a, b)->
  if a.constructor != Array || b.constructor != Array || a.length != b.length then false
  else
    for i in [0...a.length]
      if !eq a[i], b[i] then return false
    true

assertEq = (actual, expected, desc)-> if !eq expected, actual
  throw new Error "#{if desc then "[#{desc}] " else ""}Expected <#{expected}> but got <#{actual}>"

assertFail = (block, msg, desc)->
  try
    block()
    throw new Error "#{if desc then "[#{desc}] " else ""}Expected <failure #{msg}> but it succeeded"
  catch err
    if err.message != msg
      throw new Error "#{if desc then "[#{desc}] " else ""}Expected <failure #{msg}> but got <failure #{err.message}>"

log = (arg)->process.stdout.write(arg)

logln = (arg)-> log "#{arg}\n"

ifNoBrowser = (cont)-> if typeof window == 'undefined' then cont()

run = (name, func)->
  try
    func()
    ifNoBrowser -> log '.'
    stats.successes++
  catch err
    stats.failures++
    stats.failed.push name
    stats.traces.push "#{name}: #{err.stack}"
    #log "\nFailure, #{name}: #{err.stack}"

runTests = (name, tests)->
  initStats()
  log "Testing #{name}\n  "
  for testName, testFunc of tests
    run testName, testFunc
  log '\n'
  if !stats.successes then logln "Failed all #{stats.failures} #{name} tests"
  else if !stats.failures then logln "Succeeded all #{stats.successes} #{name} tests"
  else logln "Failed #{stats.failures} out of #{stats.successes + stats.failures} #{name} tests"
  if stats.failures then log '\n'
  for failure in stats.traces
    logln failure
  logln ''

root.assertEq = assertEq
root.assertFail = assertFail
root.run = run
root.runTests = runTests
root.stats = stats
root.ifNoBrowser = ifNoBrowser
