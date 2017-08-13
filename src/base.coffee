###
Copyright (C) 2013, Bill Burdick: https://github.com/zot/Leisure

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
  (window ? global).verbose = {}
  (window ? global).Leisure = (window ? global).Leisure ? {}

  traceValues = []
  traceLen = 100
  traceHandler = ->
  lambdaInfo = {}
  debugType = 'core'
  # possible debug modes are 'none', 'tracking', and 'active'
  defaultDebugMode = 'tracking'
  debugTypes = {}
  traceMessageCount = 0
  sourceFiles = {}
  normalFuncs = {}
  debugFuncs = {}

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
    if defaultDebugMode == 'none' then root.noDebugging traceLen, traceHandler, type
    else if defaultDebugMode == 'active' then root.useDebugging traceLen, traceHandler, type
    else if defaultDebugMode == 'tracking' then root.trackDebugging traceLen, traceHandler, type

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
# Leisure_traceLambda{TYPE}(lambda)
#   Must return lambda
# 
# Leisure_traceCall{TYPE}(lambda)
# 
# Leisure_traceCreatePartial{TYPE}(instanceId, lambda, args)
# 
# Leisure_traceCallPartial{TYPE}(instanceId, lambda, args)
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

  contexts = {}

  debuggingHooks =
    none:
      traceTopLevel: (context)->
        contexts[context.id] = context
        context
      traceLazyValue: (instanceId, context, id, value)-> value
      traceResolve: (instanceId, value)-> value
      traceLambda: (lambda)-> lambda
      traceCall: (lambda, args)->
      traceReturn: (lambda, result)-> result
      traceCreatePartial: (instanceId, lambda, args)->
      traceCallPartial: (instanceId, lambda, args)->
      traceMark: -> traceMarkCount++
    active:
      traceTopLevel: (context)->
        contexts[context.id] = context
        traceValues.push 'context', context.id, context.source, context.inlineMap, context.externalMap, context.debugType, context.decls.length
        traceValues.push.apply traceValues, context.decls
        checkTraceLog()
        context
      traceLazyValue: (instanceId, context, id, value)->
        traceValues.push 'lazyValue', instanceId, context.id, id
        checkTraceLog()
        value
      traceResolve: (instanceId, value)->
        traceValues.push 'resolve', instanceId
        addValue value
        checkTraceLog()
        value
      traceLambda: (lambda)->
        traceValues.push 'lambda', lambda.L$instanceId, lambda.L$info.context.id, lambda.L$info.id, lambda.L$info.parent?.id
        checkTraceLog()
        lambda
      traceCall: (lambda, args)->
        traceValues.push 'call', lambda.L$instanceId, lambda.L$info.context.id, lambda.L$info.id
        addArgs args
        checkTraceLog()
      traceReturn: (lambda, result)->
        traceValues.push 'return', lambda.L$instanceId, lambda.L$info.context.id, lambda.L$info.id
        addValue result
        checkTraceLog()
        result
      traceCreatePartial: (instanceId, lambda, args)->
        traceValues.push 'createPartial', instanceId, lambda.L$instanceId, lambda.L$info.context.id, lambda.L$info.id
        addArgs args
        checkTraceLog()
      traceCallPartial: (instanceId, lambda, args)->
        traceValues.push 'callPartial', instanceId, lambda.L$instanceId, lambda.L$info.context.id, lambda.L$info.id
        addArgs args
        checkTraceLog()
      traceMark: ->
        count = traceMarkCount++
        traceValues.push 'mark', count
        checkTraceLog()
        count

  debuggingHooks.tracking =
    __proto__: debuggingHooks.none
    traceTopLevel: debuggingHooks.active.traceTopLevel

  installDebuggingHooks = (mode, type)->
    for name, hook of debuggingHooks[mode]
      (window ? global)["Leisure_#{name}#{type}"] = hook

  setDebugMode = (mode, types)->
    result = []
    for type in types
      if debugTypes[type] != mode
        debugTypes[type] = mode
        result.add type
    result

  flushTraceLog = ->
    if traceValues.length
      t = traceValues
      traceValues = []
      traceHandler t

  installDebugFuncs = (type)->
    if !Leisure.Ast then return
    for name of debugFuncs[type]
      info = Leisure.Ast.functionInfo[name]
      nm = info.jsName
      Leisure.Ast.installFunc name, nm, info.mainDebugDef || info.mainDef
      if info.altList?.length
        Leisure.Runtime.buildAdvisedFuncDef name, nm, info, info.debugAlts, info.alts, info.mainDebugDef || info.mainDef

  installNormalFuncs = (type)->
    if !Leisure.Ast then return
    for name of normalFuncs[type]
      info = Leisure.Ast.functionInfo[name]
      nm = info.jsName
      Leisure.Ast.installFunc name, nm, info.mainDef
      if info.altList?.length
        Leisure.Runtime.buildAdvisedFuncDef name, nm, info, info.alts, info.alts, info.mainDef

  root.trackDebugging = (len, handler, givenType)->
    root.noDebugging len, handler, givenType
    if !givenType then defaultDebugMode = 'tracking'
    if handler
      traceLen = len
      traceHandler = handler
    if !givenType then (window ? global).Leisure_usingDebugging = true
    for type of (if givenType then ("#{givenType}": true) else debugTypes)
      debugTypes[type] = 'tracking'
      installDebuggingHooks 'tracking', type

  root.useDebugging = (len, handler, givenType)->
    flushTraceLog()
    if !givenType then defaultDebugMode = 'active'
    if handler
      traceLen = len
      traceHandler = handler
    if !givenType then (window ? global).Leisure_usingDebugging = true
    for type of (if givenType then ("#{givenType}": true) else debugTypes)
      if debugTypes[type] != 'active'
        installDebugFuncs type
        debugTypes[type] = 'active'
        installDebuggingHooks 'active', type

  root.noDebugging = (len, handler, givenType)->
    flushTraceLog()
    if !givenType then defaultDebugMode = 'none'
    if !givenType then (window ? global).Leisure_usingDebugging = false
    for type of (if givenType then ("#{givenType}": true) else debugTypes)
      installNormalFuncs type
      debugTypes[type] = 'none'
      installDebuggingHooks 'none', type

  for type in ['User', 'Std', 'Parser']
    addDebugType type

  checkTraceLog = (args)-> if traceValues.length > traceLen then flushTraceLog()

  getTraceValues = -> traceValues

  addArgs = (args)->
    traceValues.push args.length
    for arg in args
      addValue arg
    traceValues

  nameForFunction = (func)->
    if func.name then func.name
    else
      info = func.L$info
      while info && !info.name
        info = info.parent
      name = info?.name || func.name || "unknown"
      if info && info != func.L$info
        name += "[#{info.id}]"
      name

  addValue = (value)->
    if value.L$instanceId? then traceValues.push value.L$instanceId
    else if typeof value == 'function' then traceValues.push "function: #{nameForFunction value}"
    else if typeof value == 'number' then traceValues.push -1, value
    else if typeof value == 'object' then traceValues.push "object: #{JSON.stringify value}"
    else traceValues.push value
    traceValues

  #root.shouldNsLog = true
  root.shouldNsLog = false

  root.nsLog = (args...)-> if root.shouldNsLog then console.log args...

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

  setDebugType = (t)->
    if !debugFuncs[t] then debugFuncs[t] = {}
    debugType = t

  (window ? global).Leisure_addSourceFile = addSourceFile

  Leisure.Base = root
  Leisure.normalFuncs = normalFuncs
  Leisure.debugFuncs = debugFuncs

  root.normalFuncs = normalFuncs
  root.debugFuncs = debugFuncs
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
  root.debugTypes = debugTypes

  root
