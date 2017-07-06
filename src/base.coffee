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

  traceValues = []
  traceLen = 100
  traceHandler = ->
  lambdaInfo = {}
  debugType = 'core'
  debugTypes = new Set()
  traceMessageCount = 0
  sourceFiles = {}

  root.currentNameSpace = 'core'
  root.nameSpacePath = ['core']
  (window ? global).Leisure_generateDebuggingCode = true
  #(window ? global).Leisure_generateDebuggingCode = false
  (window ? global).Leisure_traceContext = 0
  (window ? global).Leisure_traceInstance = 0

  addSourceFile = (fileName, contents)->
    if !sourceFiles[fileName] then sourceFiles[fileName] = contents
    fileName

  sourceFile = (fileName)->
    if sourceFiles[fileName] then Promise.resolve(sourceFiles[fileName])
    else $.ajax(new URL(fileName, location))

  addDebugType = (type)->
    debugTypes.add type
    if !(window ? global)["Leisure_traceCall#{type}"]?
      root.noDebugging type

  argNames = (func)->
    arg.trim() for arg in Function.prototype.toString.call(func).match(/\(([^)]*)\)/)[1].split ','

######
# The trace API
# 
# Leisure_traceLazyValue{TYPE}(instanceId, context, id, parentInstanceId, value)
#   Must return value
# 
# Leisure_traceResolve{TYPE}(instanceId, value)
#   Must return value
# 
# Leisure_traceLambda{TYPE}(instanceId, lambda, name, context, id, parentInstanceId)
# 
# Leisure_traceCall{TYPE}(lambda)
# 
# Leisure_traceReturn{TYPE}(lambda, result)
#   Must return result
# 
# Leisure_traceTopLevel{TYPE}(context)
#   Must return context
# 
# Leisure_traceMessage{TYPE}(message)
#   Must return the message count (traceMessageCount++)
######

  flushTraceLog = ->
    if traceValues.length
      setTimeout (->
        traceHandler traceValues
        traceValues.length = 0), 1

  root.trackDebugging = (len, handler, type)->
    flushTraceLog()
    root.noDebugging type
    if len
      traceLen = len
      traceHandler = handler
    (if type then new Set([type]) else debugTypes).forEach (type)->
      (window ? global)["Leisure_traceTopLevel#{type}"] = (context)->
        traceValues.push 'context', context.id, context.source, context.inlineMap, context.externalMap, context.debugType, context.decls.length
        traceValues.push.apply traceValues, context.decls
        checkTraceLog()
        context
      #(window ? global)["Leisure_traceLambda#{type}"] = (parentId, context, id, lambda)->
      #  # tie lambda to AST in the log here
      #  lambda.L$context = context
      #  traceValues.push 'lambda', lambda.instanceId, context.id, id
      #  checkTraceLog()

  root.useDebugging = (len, handler, type)->
    flushTraceLog()
    if len
      traceLen = len
      traceHandler = handler
    if !type then (window ? global).Leisure_usingDebugging = true
    (if type then new Set([type]) else debugTypes).forEach (type)->
      (window ? global)["Leisure_traceTopLevel#{type}"] = (context)->
        traceValues.push 'context', context.id, context.source, context.inlineMap, context.externalMap, context.debugType, context.decls.length
        traceValues.push.apply traceValues, context.decls
        checkTraceLog()
        context
      (window ? global)["Leisure_traceLazyValue#{type}"] = (instanceId, context, id, value)->
        traceValues.push 'lazyValue', instanceId, context.id, id
        checkTraceLog()
        value
      (window ? global)["Leisure_traceResolve#{type}"] = (instanceId, value)->
        traceValues.push 'resolve', instanceId
        addValue value
        checkTraceLog()
        value
      (window ? global)["Leisure_traceLambda#{type}"] = (lambda)->
        # tie lambda to AST in the log here
        lambda.L$context = context
        # need parentId?
        traceValues.push 'lambda', lambda.L$instanceId, lambda.L$context.id, lambda.L$id
        checkTraceLog()
      (window ? global)["Leisure_traceCall#{type}"] = (instanceId, args...)->
        traceValues.push 'call', instanceId
        addArgs args
        checkTraceLog()
      (window ? global)["Leisure_traceReturn#{type}"] = (instanceId, result)->
        traceValues.push 'return', instanceId
        addValue result
        checkTraceLog()
        result
      (window ? global)["Leisure_traceCreatePartial#{type}"] = (instanceId, lambda, args)->
        traceValues.push 'createPartial', instanceId, lambda.L$instanceId
        addArgs args
        checkTraceLog()
      (window ? global)["Leisure_traceCallPartial#{type}"] = (instanceId, args)->
        traceValues.push 'callPartial', instanceId
        addArgs args
        checkTraceLog()
      (window ? global)["Leisure_traceMark#{type}"] = ->
        count = traceMarkCount++
        traceValues.push 'mark', count
        checkTraceLog()
        count

  root.noDebugging = (type)->
    flushTraceLog()
    if !type then (window ? global).Leisure_usingDebugging = false
    (if type then new Set([type]) else debugTypes).forEach (type)->
      (window ? global)["Leisure_traceTopLevel#{type}"] = (context)-> context
      (window ? global)["Leisure_traceLazyValue#{type}"] = (instanceId, context, id, value)-> value
      (window ? global)["Leisure_traceResolve#{type}"] = (instanceId, value)-> value
      (window ? global)["Leisure_traceLambda#{type}"] = (lambda)->
      (window ? global)["Leisure_traceCall#{type}"] = (instanceId, args...)->
      (window ? global)["Leisure_traceReturn#{type}"] = (instanceId, result)-> result
      (window ? global)["Leisure_traceCreatePartial#{type}"] = (instanceId, lambda, args)->
      (window ? global)["Leisure_traceCallPartial#{type}"] = (instanceId, args)->
      (window ? global)["Leisure_traceMark#{type}"] = -> traceMarkCount++

  for type in ['User', 'Std', 'Parser']
    addDebugType type

  checkTraceLog = (args)-> if traceValues.length > traceLen then flushTraceLog()

  getTraceValues = -> traceValues

  addArgs = (args)->
    traceValues.push args.length
    for arg in args
      addValue arg
    traceValues

  addValue = (value)->
    if value.L$instanceId? then traceValues.push value.L$instanceId
    else if typeof value == 'function' then traceValues.push "function: #{value.L$info?.name ? value.name}"
    else if typeof value == 'number' then traceValues.push -1, value
    else if typeof value == 'object' then traceValues.push "object: #{value}"
    else traceValues.push value
    traceValues

  #root.shouldNsLog = true
  root.shouldNsLog = false

  root.nsLog = (args...)-> if root.shouldNsLog then console.log args...

  (window ? global).verbose = {}
  (window ? global).Leisure = (window ? global).Leisure ? {}
  Leisure.sourceFiles = sourceFiles

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
    writeTraceMessage: (count, msg)-> @write msg
    errorHandlers: []
    prompt: -> null
    executeText: -> null
    executeBlock: -> null
    compileBlock: -> null
    userEvent: ->

  rz = (window ? global).resolve = (value)->
    #if typeof value == 'function' && value.length == 0
    #  if typeof value.memo != 'undefined' then value.memo
    #  else
    #    if value.creationStack then value.creationStack = null
    #    if value.args then value.args = null
    #    value.memo = value()
    #else value
    if typeof value == 'function'
      if typeof value.memo != 'undefined' then value.memo
      else if value.length == 0
        #if value.creationStack then value.creationStack = null
        #if value.args then value.args = null
        value.memo = value()
      else value
    else value

  isResolved = (value)-> typeof value != 'function' || value.memo

  (window ? global).lazy = (l)-> if typeof l == 'function' then l.memo = l else l

  readFile = (fileName, cont)-> defaultEnv.readFile fileName, cont

  writeFile = (fileName, data, cont)-> defaultEnv.writeFile fileName, data, cont

  readDir = (fileName, cont)-> defaultEnv.readDir fileName, cont

  statFile = (fileName, cont)-> defaultEnv.statFile fileName, cont
  
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
    if typeof f != 'function' || f.length > 1 then f
    else (args...)-> baseLeisureCall(f, 0, args, f.length)

  (window ? global).Leisure_call = leisureCall = (f)-> baseLeisureCall f, 1, arguments

  (window ? global).Leisure_primCall = baseLeisureCall = (f, pos, args, len, traceCreate, traceCall)->
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
          #traceCall? f, newArgs
          if Leisure_generateDebuggingCode && traceCall
            traceCall partial.L$instanceId, f, slice.call arguments
          if !f.apply then console.log "No apply! #{f} #{newArgs[0]}"
          if newArgs.length == len then f.apply null, newArgs
          else baseLeisureCall f, 0, newArgs, len
        partial.leisurePartial = true
        partial.leisureInfo = genInfo f, args, f.leisureInfo
        if Leisure_generateDebuggingCode && traceCreate
          partial.L$instanceId = ++Leisure_traceInstance
          traceCreate partial.L$instanceId, f, prev
        return lazy partial
    if pos != args.length then console.log "BAD FINAL POSITION IN LEISURE CALL, ARG LENGTH IS #{args.length} BUT POSITION IS #{pos}"
    f

  genInfo = (func, args, oldInfo)->
    for arg in args
      if !oldInfo then oldInfo = {name: func.L$info?.name, arg}
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

  getDebugType = -> debugType

  setDebugType = (t)-> debugType = t

  (window ? global).Leisure_addSourceFile = addSourceFile

  Leisure.Base = root

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
  root.isResolved = isResolved
  root.getTraceValues = getTraceValues
  root.argNames = argNames
  root.flushTraceLog = flushTraceLog
  root.addDebugType = addDebugType
  root.addSourceFile = addSourceFile
  root.sourceFile = sourceFile
  root.getDebugType = getDebugType
  root.setDebugType = setDebugType

  root
