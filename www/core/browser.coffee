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

tests = -> window.Tests

window.global = window

window.module = {}

window.Tests =
  readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
  writeFile: ->

window.require = (name)-> modules[name]()

window.process =
  exit: ->
  stdout:
    write: (s)-> console.log s

modules =
  './lodash.min': -> window._
  './base': tests
  './ast': tests
  './base': tests
  './gen': tests
  './runtime': tests
  './simpleParseJS': tests
  './testing': ->
    console.log "Accessing ./testing"
    oldRunTests = window.Tests.runTests
    window.Tests.runTests = (tests)->
      oldRunTests tests
      displayResults()
    window.Tests
  './testLeisure': tests

startFuncs = []

started = false

window.Tests.loaded = ->
  console.log 'body loaded'
  window.setTimeout (->
  if !started
    started = true
    for func in startFuncs
      func()
    startFuncs = null), 1

document.addEventListener 'load', -> console.log 'document loaded'

deferUntilStart = (func)-> if started then func() else startFuncs.push func

displayResults = ->
  window.setTimeout (->
    results = document.getElementById 'results'
    if results
      stats = window.Tests.stats
      if stats.failures
        results.classList.remove 'succeeded'
        results.classList.add 'failed'
        if stats.successes
          results.innerHTML = "Succeeded: <b>#{stats.successes}</b><br>Failed: <b>#{stats.failures}"
        else
          results.innerHTML = "Succeeded: <b>None</b><br>Failed: <b>#{stats.failures}"
        showTraces()
      else
        results.classList.add 'succeeded'
        results.classList.remove 'failed'
        if stats.failures
          results.innerHTML = "Succeeded: <b>#{stats.successes}</b><br>Failed: <b>#{stats.failures}"
        else
          results.innerHTML = "Succeeded: <b>#{stats.successes}</b><br>Failed: <b>None</b>"), 1

showTraces = ->
  stats = window.Tests.stats
  traceDiv = document.getElementById 'traces'
  traceDiv.innerHTML = ''
  for trace in stats.traces
    traceDiv.innerHTML += "<div>#{trace}</div><br>"
