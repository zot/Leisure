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

(window ? global).Leisure = root = (module ? {}).exports = (global?.Leisure ? module?.exports ? window?.Leisure)

root.currentNameSpace = 'core'
root.nameSpacePath = ['core']
#root.newCall = true
root.newCall = false

#root.shouldNsLog = true
root.shouldNsLog = false

root.nsLog = (args...)-> if root.shouldNsLog then console.log args...

(window ? global).verbose = {}

verboseMsg = (label, msg...)-> if (window ? global).verbose[label] then console.log msg...

if !btoa? then (window ? global).btoa = require 'btoa'

defaultEnv =
  presentValue: (x)-> String(x) + '\n'
  values: {}
  errorHandlers: []
  prompt: ->

rz = (window ? global).resolve = (value)->
  if typeof value == 'function'
    if typeof value.memo != 'undefined' then value.memo
    else
      if value.creationStack then value.creationStack = null
      if value.args then value.args = null
      value.memo = value()
  else value

#global.lazy = (l)-> ->l
#global.lazy = (l)-> if typeof l == 'function'
#  count=0
#  ->
#    if count++ > 0 then console.log "EXTRA EXECUTION OF #{l}, #{new Error('stack').stack}"
#    l
#else l
(window ? global).lazy = (l)-> if typeof l == 'function' then l.memo = l else l

readFile = (fileName, cont)-> defaultEnv.readFile fileName, cont

writeFile = (fileName, data, cont)-> defaultEnv.writeFile fileName, data, cont

readDir = (fileName, cont)-> defaultEnv.readDir fileName, cont

statFile = (fileName, cont)-> defaultEnv.statFile fileName, cont

root.trackCreation = false
#root.trackVars = false
#root.trackCreation = true
root.trackVars = true

funcInfo = (func)->
  if func.leisureInfoNew then primConsFrom func.leisureInfoNew, 0
  else if func.leisureInfo
    (window ? global).FUNC = func
    info = []
    callInfo = func.leisureInfo
    while callInfo
      info.push resolve callInfo.arg
      if callInfo.name
        info.push callInfo.name
        break
      callInfo = callInfo.parent
    root.consFrom info.reverse()
  else rz L_nil

primConsFrom = (array, index)->
  if index >= array.length then rz L_nil
  else root.primCons array[index], primConsFrom array, index + 1

class SimpyCons
  constructor: (@head, @tail)->
  toArray: ->
    @_array ? (
      h = @
      array = []
      while h != null
        array.push h.head
        h = h.tail
      @_array = array)
simpyCons = (a, b)-> new SimpyCons a, b


debugged = false
debugOnce = ->
  if !debugged
    debugged = true
    debugger

burp = ->

concatArgs = (a, b, c)->
  args = Array.prototype.slice.call a
  Array.prototype.push.apply args, b
  if c then Array.prototype.push.apply args, c
  args

#(window ? global).Leisure_call = leisureCall = (func, args...)->
#  #debugOnce()
#  #f = rz func
#  f = func
#  while args.length
#    if !f then debugger
#    if f.length == args.length then return f.apply null, args
#    if f.length > args.length
#      burp "CALLING PARTIAL BECAUSE #{f.length} > #{args.length}"
#      return -> burp '1'; leisureCall f, concatArgs args, arguments
#    if f.length == 1
#      pos = 0
#      while pos < args.length && f.length == 1
#        f = f.call null, args[pos]
#        pos++
#      if pos == args.length then return f
#      args = slice.call args, pos
#    else
#      newF = f.apply(null, slice.call(args, 0, f.length))
#      args = slice.call args, f.length
#      f = newF
#  if !f then debugger
#  f

slice = Array.prototype.slice
concat = Array.prototype.concat

(window ? global).Leisure_call = leisureCall = (f)-> baseLeisureCall f, 1, arguments

baseLeisureCall = (f, pos, args)->
  while pos < args.length
    if f.length <= args.length - pos
      oldF = f
      switch f.length
        when 1 then f = f args[pos]
        when 2 then f = f args[pos], args[pos + 1]
        when 3 then f = f args[pos], args[pos + 1], args[pos + 2]
        when 4 then f = f args[pos], args[pos + 1], args[pos + 2], args[pos + 3]
        else
          if f.leisurePartial then return f.apply(null, slice.call(args, pos))
          f = f.apply(null, slice.call(args, pos, pos + f.length))
      pos += oldF.length
    else
      prev = if pos == 0 then args else slice.call args, pos
      partial = ->
        if prev.length + arguments.length == f.length
          f.apply null, concat.call prev, slice.call arguments
        else
          baseLeisureCall f, 0, concat.call prev, slice.call arguments
      partial.leisurePartial = true
      return partial
  f

testCount = 0
errors = ''
test = (expected, actual)->
  if JSON.stringify(expected) != JSON.stringify(actual)
    if errors.length then errors += '\n'
    errors += "TEST #{testCount} FAILED, EXPECTED #{JSON.stringify(expected)} BUT GOT #{JSON.stringify(actual)}"
  testCount++

(window ? global).Leisure_test_call = ->
  test [1, 2, 3], Leisure_call ((a, b)->(c)-> [a, b, c]), 1, 2, 3
  test [1, 2, 3], Leisure_call ((a, b, c)-> [a, b, c]), 1, 2, 3
  test [1, 2, 3], Leisure_call ((a)->(b, c)-> [a, b, c]), 1, 2, 3
  test [1, 2, 3, 4], Leisure_call ((a)->(b, c)->(d)-> [a, b, c, d]), 1, 2, 3, 4
  test [1, 2, 3, 4], Leisure_call ((a, b, c)->(d)-> [a, b, c, d]), 1, 2, 3, 4
  test [1, 2, 3, 4], Leisure_call ((a, b)->(c)->(d)-> [a, b, c, d]), 1, 2, 3, 4
  test [1, 2, 3, 4], Leisure_call ((a, b)->(c, d)-> [a, b, c, d]), 1, 2, 3, 4
  test [1, 2, 3, 4], Leisure_call ((a, b, c, d)-> [a, b, c, d]), 1, 2, 3, 4
  test [1, 2, 3, 4], Leisure_call (Leisure_call ((a, b, c, d)-> [a, b, c, d]), 1, 2), 3, 4
  if errors.length then errors else null

root.defaultEnv = defaultEnv
root.readFile = readFile
root.readDir = readDir
root.writeFile = writeFile
root.statFile = statFile
root.SimpyCons = SimpyCons
root.simpyCons = simpyCons
root.resolve = resolve
root.lazy = lazy
root.verboseMsg = verboseMsg
root.maxInt = 9007199254740992
root.minInt = -root.maxInt
root.funcInfo = funcInfo
