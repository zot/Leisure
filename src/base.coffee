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

'use strict'
if window? then window.global = window
files = if !(window ? global).btoa then ['btoa'] else [null]
define files, (btoa)->
  if !btoa then btoa = (window ? global).btoa

  root = {}

  root.currentNameSpace = 'core'
  root.nameSpacePath = ['core']

  #root.shouldNsLog = true
  root.shouldNsLog = false

  root.nsLog = (args...)-> if root.shouldNsLog then console.log args...

  (window ? global).verbose = {}
  (window ? global).Leisure = (window ? global).Leisure ? {}

  verboseMsg = (label, msg...)-> if (window ? global).verbose[label] then console.log msg...

  if !btoa? then (window ? global).btoa = require 'btoa'

  class CodeContext
    eval: (text)-> eval text
    runWith: (ctxSettings, func)->
      old = @ctx
      try
        @ctx = ctxSettings
        if typeof func == 'string' then @eval func else func.call this
      finally
        @ctx = old


  defaultEnv =
    __proto__: CodeContext.prototype
    presentValue: (x)-> String(x)
    write: (v)-> console.log v
    values: {}
    errorHandlers: []
    prompt: -> null
    executeText: -> null
    executeBlock: -> null
    compileBlock: -> null

  rz = (window ? global).resolve = (value)->
    if typeof value == 'function' && value.length == 0
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
        h = this
        array = []
        while h != null
          array.push h.head
          h = h.tail
        @_array = array)

  simpyCons = (a, b)-> new SimpyCons a, b

  slice = Array.prototype.slice
  concat = Array.prototype.concat

  (window ? global).L$ = (f)->
    f = rz(f)
    if f.length > 1 then f else (args...)-> baseLeisureCall(f, 0, args)

  (window ? global).Leisure_call = leisureCall = (f)-> baseLeisureCall f, 1, arguments

  (window ? global).Leisure_primCall = baseLeisureCall = (f, pos, args, len)->
    len = len ? f.length
    while pos < args.length
      if typeof f != 'function' then throw new Error "TypeError: #{typeof f} is not a function: #{f}"
      if len <= args.length - pos
        oldLen = len
        switch len
          when 1 then f = f args[pos]
          when 2 then f = f args[pos], args[pos + 1]
          when 3 then f = f args[pos], args[pos + 1], args[pos + 2]
          when 4 then f = f args[pos], args[pos + 1], args[pos + 2], args[pos + 3]
          else
            if f.leisureInfo || (pos == 0 && len == args.length)
              return f.apply null, (if pos == 0 then args else slice.call(args, pos))
            f = f.apply null, slice.call(args, pos, pos + len)
        if len < args.length - pos
          len = f.length
        pos += oldLen
      else
        prev = slice.call args, pos
        partial = ->
          newArgs = concat.call prev, slice.call arguments
          if !f.apply then console.log "No apply! #{f} #{newArgs[0]}"
          if newArgs.length == len then f.apply null, newArgs
          else baseLeisureCall f, 0, newArgs, len
        partial.leisurePartial = true
        partial.leisureInfo = genInfo f, args, f.leisureInfo
        return lazy partial
    if pos != args.length then console.log "BAD FINAL POSITION IN LEISURE CALL, ARG LENGTH IS #{args.length} BUT POSITION IS #{pos}"
    f

  genInfo = (func, args, oldInfo)->
    for arg in args
      if !oldInfo then oldInfo = {name: func.leisureName, arg}
      else oldInfo = {arg: arg, parent: oldInfo}
    oldInfo

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

  serverIncrement = (path, amount, cont)->
    block = root.getBlockNamed path.split(/\./)[0]
    if block.origin != root.currentDocument._name
      return root.storeBlock block, -> serverIncrement path, amount, cont
    if typeof path == 'function' then cont "Error, no path given to serverIncrement"
    else if typeof amount == 'function' then cont "Error, no amount given to serverIncrement"
    else Meteor.call 'incrementField', root.currentDocument.leisure.name, path, amount, cont

  root.serverIncrement = serverIncrement
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
  root.CodeContext = CodeContext

  root
