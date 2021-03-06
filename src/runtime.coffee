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
define ['./base', './docOrg', './ast', 'lodash', 'immutable', 'lib/js-yaml', 'bluebird', 'browser-source-map-support'], (Base, DocOrg, Ast, _, Immutable, Yaml, Bluebird)->
  SourceMapSupport?.install()
  {
    readFile
    statFile
    readDir
    writeFile
    defaultEnv
    SimpyCons
    simpyCons
    resolve
    lazy
    nsLog
    funcInfo
    argNames
    getDebugType
    debugTypes
  } = root = Base
  {
    parseYaml
  } = DocOrg
  {
    define
    nakedDefine
    cons
    Nil
    head
    tail
    getType
    getDataType
    ast2Json
    ensureLeisureClass
    LeisureObject
    mkProto
    setType
    setDataType
    functionInfo
    nameSub
    isPartial
    partialCall
    leisureFunctionNamed
    LeisureObject
    classNameForType
    classForType
    types
    declareTypeFunc
  } = Ast
  {
    Map
    Set
    List
  } = Immutable
  {
    dump
  } = Yaml
  {
    Promise
  } = Bluebird

  rz = resolve
  lz = lazy
  lc = Leisure_call
  gensymCounter = 0
  functionInfo = (window ? global).LeisureFunctionInfo
  #(window ? global).L_PROMISE_MONAD = true

#########
# code
#########

  checkPartial = (window ? global).L_checkPartial = (func, args, traceCreate, traceCall)->
    if typeof func == 'string' then func = leisureFunctionNamed func
    if func.L$info.length != args.length then Leisure_primCall func, 0, args, func.length, traceCreate, traceCall

  call = (args...)-> basicCall(args, defaultEnv, identity)

  callMonad = (args..., env, cont)-> basicCall(args, env, cont)

  basicCall = (args, env, cont)->
    res = rz global["L_#{args[0]}"]
    for arg in args[1..]
      res = do (arg)-> res(lz arg)
    runMonad2 res, env, cont

  consFrom = (array, i)->
    i = i || 0
    if i < array.length then cons array[i], consFrom(array, i + 1) else rz L_nil

  noMemo = (f)->
    Object.defineProperty f, 'memo', set: ->
    f

############
# LOGIC
############

  identity = (x)-> x
  _identity = (x)-> rz x
  _unit = setType ((x)->rz x), 'unit'
  _true = setDataType (setType ((a)->(b)->rz a), 'true'), 'true'
  _false = setDataType (setType ((a)->(b)->rz b), 'false'), 'false'
  left = (x)-> setType ((lCase)->(rCase)-> rz(lCase)(lz x)), 'left'
  right = (x)-> setType ((lCase)->(rCase)-> rz(rCase)(lz x)), 'right'
  some = (x)-> setType ((someCase)->(noneCase)-> rz(someCase)(lz x)), 'some'
  none = setType ((someCase)->(noneCase)-> rz(noneCase)), 'none'
  booleanFor = (bool)-> if bool then rz L_true else rz L_false
  do ->
    'use strict'
    define 'eq', (a, b)-> checkPartial(L_eq, arguments) || booleanFor rz(a) == rz(b)
    define '==', (a, b)-> checkPartial(L_$p$p, arguments) || booleanFor rz(a) == rz(b)
    define '!=', (a, b)-> checkPartial(L_$k$p, arguments) || booleanFor rz(a) != rz(b)
    define 'hasType', (data, func)-> checkPartial(L_hasType, arguments) ||(
      typeName = rz func
      if typeof typeName != 'string'
        hadFunc = true
        typeName = getDataType(rz func)
      booleanFor if typeName in ['string','number'] then typeof rz(data) == typeName
      else
        type = if typeName[0] == '*' then (window ? global)[typeName.substring 1] else types[typeName]
        if !type
          if !hadFunc then console.log new Error "Warning, undeclared type #{typeName}, doing simple string compare"
          getType(rz data) == typeName
        else rz(data) instanceof type)
    define 'getDataType', (func)-> if typeof rz(func) == 'string' then rz(func) else getDataType(rz(func))
    # using arity makes compiling parseAst.lsr crash
    define 'assert', (bool, msg, expr)-> checkPartial(L_assert, arguments) || rz(bool)(expr)(->
      err = new Error(rz msg)
      #err.stack = "Leisure stack:\n#{err}\n   at #{L$thunkStack.reverse().join '\n   at '}\n\nJS Stack:\n#{err.stack}"
      console.error err.stack
      throw err
      )
    define 'assertLog', (bool)->(msg)->(expr)-> rz(bool)(expr)(->
      console.log new Error(rz msg).stack
      console.log "LOGGED ERROR -- RESUMING EXECUTION..."
      rz expr)
    define 'trace', (msg)->
      console.log "STACKTRACE: ", new Error(rz msg).stack
      msg
    define 'jsTrue', (x)-> if rz(x) then _true else _false
    define 'error', (msg)-> throw new Error rz msg

############
# MATH
############

  define '+', (x, y)-> checkPartial(L_$o, arguments) || rz(x) + rz(y)
  define '-', (x, y)-> checkPartial(L_$_, arguments) || rz(x) - rz(y)
  define '*', (x, y)-> checkPartial(L_$g, arguments) || rz(x) * rz(y)
  define '/', (x, y)-> checkPartial(L_$f, arguments) || rz(x) / rz(y)
  define '%', (x, y)-> checkPartial(L_$A, arguments) || rz(x) % rz(y)
  define '<', (x, y)-> checkPartial(L_$y, arguments) || booleanFor rz(x) < rz(y)
  define '<=', (x, y)-> checkPartial(L_$y$p, arguments) || booleanFor rz(x) <= rz(y)
  define '>', (x, y)-> checkPartial(L_$z, arguments) || booleanFor rz(x) > rz(y)
  define '>=', (x, y)-> checkPartial(L_$z$p, arguments) || booleanFor rz(x) >= rz(y)
  define 'floor', (x)-> Math.floor(rz x)
  define 'ceil', (x)-> Math.ceil(rz x)
  define 'min', (x, y)-> checkPartial(L_min, arguments) || Math.min rz(x), rz(y)
  define 'max', (x, y)-> checkPartial(L_max, arguments) || Math.max rz(x), rz(y)
  define 'round', (x)-> Math.round(rz x)
  define 'abs', (x)-> Math.abs(rz x)
  define 'sqrt', (x)-> Math.sqrt(rz x)
  define 'acos', (x)-> Math.acos(rz x)
  define 'asin', (x)-> Math.asin(rz x)
  define 'atan', (x)-> Math.atan(rz x)
  define 'atan2', (x, y)-> checkPartial(L_atan2, arguments) || Math.atan2(rz(x), rz(y))
  define 'cos', (x)-> Math.cos(rz x)
  #define 'log', (x)-> Math.log(rz x)
  define 'sin', (x)-> Math.sin(rz x)
  define 'tan', (x)-> Math.tan(rz x)

  define 'rand', -> makeSyncMonad (env, cont)->
    cont (Math.random())
  define 'randInt', (low, high)-> checkPartial(L_randInt, arguments) ||
    makeSyncMonad (env, cont)->
      cont (Math.floor(rz(low) + Math.random() * rz(high)))
  define '^', (x, y)-> checkPartial(L_$i, arguments) || Math.pow(rz(x), rz(y))
  define 'number', setDataType ((n)-> Number rz n), 'number'

############
# STRINGS
############

  define '_show', (data)->
    if typeof rz(data) in ['string', 'number', 'boolean'] then JSON.stringify rz data
    else if getType(rz data) == 'err' then rz(L_errMsg)(data)
    else String rz data
  define 'strString', (data)-> String rz data
  define '_strAsc', (str)-> rz(str).charCodeAt(0)
  define '_strChr', (i)-> String.fromCharCode(rz i)
  define '_strAt', (str, index)-> checkPartial(L__strAt, arguments) ||
    rz(str)[strCoord(rz(str), rz(index))]
  define '_strStartsWith', (str, prefix)-> checkPartial(L__strStartsWith, arguments) ||
    booleanFor rz(str).substring(0, rz(prefix).length) == rz(prefix)
  define '_strLen', (str)-> rz(str).length
  define '_strTrim', (str)-> String(rz str).trim()
  define '_strToLowerCase', (str)-> rz(str).toLowerCase()
  define '_strToUpperCase', (str)-> rz(str).toUpperCase()
  define '_strReverse', (str)->
    s = rz(str)
    result = ''
    for i in [s.length - 1 .. 0] by -1
      result += s[i]
    result
  define '_strReplace', (str, pat, repl)-> checkPartial(L__strReplace, arguments) ||
    rz(str).replace rz(pat), rz(repl)
  strCoord = (str, coord)-> if coord < 0 then str.length + coord else coord
  define '_strSubstring', (str, start, end)-> if p = checkPartial(L__strSubstring, arguments) then p else
    a = strCoord(rz(str), rz(start))
    b = strCoord(rz(str), rz(end))
    if b < a && rz(end) == 0 then b = rz(str).length
    rz(str).substring a, b
  define '_strSplit', (str, pat)-> checkPartial(L__strSplit, arguments) ||
    consFrom rz(str).split if rz(pat) instanceof RegExp then rz(pat) else new RegExp rz(pat)
  define '_strJoin', (list, sep)-> checkPartial(L__strJoin, arguments) ||
    rz(list).toArray().join rz(sep)
  define '_strCat', (list)-> _.map(rz(list).toArray(), (el)-> if typeof el == 'string' then el else rz(L_show)(lz el)).join('')
  define '_strAdd', (s1, s2)-> checkPartial(L__strAdd, arguments) ||
    rz(s1) + rz(s2)
  define '_strMatch', (str, pat)-> if p = checkPartial(L__strMatch, arguments) then p else
    m = rz(str).match (if rz(pat) instanceof RegExp then rz pat else new RegExp rz pat)
    if m
      groups = []
      pos = 1
      while m[pos]
        groups.push m[pos++]
      if typeof m.index != 'undefined' then consFrom [m[0], consFrom(groups), m.index, m.input]
      else consFrom [m[0], consFrom(groups)]
    else if L_nil then rz L_nil
    else Nil
  define '_strToList', (str)-> strToList rz str
  strToList = (str)-> if str == '' then Nil else cons str[0], strToList str.substring 1
  define '_strFromList', (list)-> strFromList rz list
  strFromList = (list)-> if list instanceof Leisure_nil then '' else head(list) + strFromList(tail list)
  define '_regexp', (str)-> new RegExp rz str
  define '_regexpFlags', (str, flags)-> checkPartial(L__regexpFlags, arguments) ||
    new RegExp rz(str), rz(flags)
  define '_jsonParse', (str, failCont, successCont)-> if p = checkPartial(L__jsonParse, arguments) then p else
    #str = rz str
    #try
    #  p = JSON.parse str
    #catch err
    #  if str.match /^0+[0-9]/
    #    try
    #      p = JSON.parse str.replace /^0+/, ''
    #    catch err
    #  if p then return rz(failCont) lz err
    #rz(successCont) lz p
    try
      p = JSON.parse rz str
      rz(successCont) lz p
    catch err
      rz(failCont) lz err
  define 'jsonStringify', (obj, failCont, successCont)-> if p = checkPartial(L_jsonStringify, arguments) then p else
    try
      s = JSON.stringify rz obj
      rz(successCont) lz s
    catch err
      rz(failCont) lz err

############
# arrays
############

  define '_sort', (predicate, list)-> checkPartial(L__sort, arguments) || (
    result = rz(list).toArray()
    pred = rz(predicate)
    result.sort (a, b)-> pred(a)(b)(-1)(1)
    consFrom result)

############
# properties
############

  define 'getProperties', (func)-> if rz(func)?.properties then rz(func).properties else rz L_nil

  define 'setProperty', (func, name, value)-> checkPartial(L_setProperty, arguments) ||
    makeSyncMonad (env, cont)->
      f = rz func
      f.properties = rz(L_aconsf)(name, value, lz f.properties ? rz(L_nil))
      cont f.properties

############
# Diagnostics
############

  define 'log', (str, res)-> checkPartial(L_log, arguments) || (
    console.log rz str
    rz res)

  define 'logStack', (str, res)-> checkPartial(L_logStack, arguments) || (
    console.log new Error(rz str).stack
    rz res)

  # an identity function you can put a breakpoint on
  define 'breakpoint', (x)->
    console.log 'Break point ', rz x
    rz x

############
# IO Monads
############

# Make a new function and hide func and binding in properties on it
# making them inaccessible to pure Leisure code
# so people won't accidentally fire off side effects
  makeMonad = (guts)->
    m = -> throw new Error "ILLEGAL CALL TO MONAD FUNCTION!"
    m.__proto__ = io.prototype
    m.cmd = guts
    m.type = 'io'
    m

  makeSyncMonad = (guts)->
    m = makeMonad guts
    m.sync = true
    m

  nextMonad = (cont)-> cont

  replaceErr = (err, msg)->
    err.message = msg
    err

  defaultEnv.write = (str)-> process.stdout.write(str)
  defaultEnv.err = (err)-> @write "ENV Error: #{err.stack ? err}"
  defaultEnv.prompt = ->throw new Error 'Environment does not support prompting!'

  monadModeSync = false

  getMonadSyncMode = -> monadModeSync

  withSyncModeDo = (newMode, block)->
    oldMode = monadModeSync
    monadModeSync = newMode
    try
      block()
    catch err
      console.log "ERR: #{err.stack ? err}"
    finally
      #if !monadModeSync && oldMode then console.log "REENABLING SYNC"
      #monadModeSync = oldMode

  runMonad = (monad, env, cont)->
    env = env ? root.defaultEnv
    withSyncModeDo true, -> newRunMonad monad, env, cont, []

  isIO = (v)-> typeof v == 'function' && v.cmd?

  continueMonads = (contStack, env)->
    (result)-> withSyncModeDo false, -> newRunMonad result, env, null, contStack

  asyncMonad = {toString: -> "<asyncMonadResult>"}

  warnAsync = false

  setWarnAsync = (state)-> warnAsync = state

  newRunMonad = (monad, env, cont, contStack)->
    #if monad instanceof Monad2
    #  console.log 'MONAD 2'
    #  return runMonad2 monad, env, cont, contStack
    if cont then contStack.push cont
    try
      while true
        #monad = L_asIO?()(lz monad) ? monad
        if monad instanceof Monad2
          return runMonad2 monad, env, continueMonads(contStack, env), []
        else if isIO monad
          if monad.binding
            do (bnd = monad.binding)-> contStack.push (x)-> rz(bnd) lz x
            monad = rz monad.monad
            continue
          else if !monad.sync
            monadModeSync = false
            #console.log "turned off sync"
            if warnAsync then console.log "async monad"
            monad.cmd(env, continueMonads(contStack, env))
            return asyncMonad
          result = monad.cmd(env, identity)
        else
          monadModeSync = true
          result = monad
        if !contStack.length then return result
        monad = contStack.pop() result
    catch err
      err = replaceErr err, "\nERROR RUNNING MONAD, MONAD: #{monad}, ENV: #{env}...\n#{err.message}"
      console.log err.stack ? err
      if env.errorHandlers.length then env.errorHandlers.pop() err

  callBind = (value, contStack)->
    func = contStack.pop()
    val = lz value
    tmp = L_bind()(val)(lz func)
    if isIO(tmp) && (tmp.monad == val || tmp.monad == value)
      console.log "peeling bind"
      func value
    else tmp
    #if isIO(tmp) && tmp?.binding? then func value else tmp

  class io extends LeisureObject
    toString: -> "Monad: #{@cmd.toString()}"

  declareTypeFunc 'io', io

  (global ? window).L_runMonads = (array, env, cont)->
    runMonad2 array.slice().reverse().reduce((result, element)->
      bind element, lz (x)-> rz result), env ? root.defaultEnv, cont ? resolve

  ensureLeisureClass 'unit'

  class Leisure_unit extends LeisureObject
    toString: -> 'unit'

  _unit = mkProto Leisure_unit, setType ((_x)-> rz(_x)), 'unit'

  unit = -> L_unit || _unit

  define 'define', (name, arity, src, def)-> checkPartial(L_define, arguments) ||
    makeSyncMonad (env, cont)->
      nakedDefine rz(name), def, rz(arity), rz(src)
      cont unit()

#  define 'newDefine', (name, arity, src, def)-> checkPartial(L_newDefine, arguments) ||
#    new Monad2 (env, cont)->
#      if global.verbose?.gen then console.log "DEFINE: #{name}"
#      nakedDefine rz(name), def, rz(arity), rz(src), null, null, true
#      cont unit()

  define 'newDefine', (name, arity, src, def, debugDef)-> checkPartial(L_newDefine, arguments) ||
    new Monad2 (env, cont)->
      if global.verbose?.gen then console.log "DEFINE: #{name}"
      nakedDefine rz(name), def, rz(arity), rz(src), null, null, true, false, getDebugType(), debugDef
      #nakedDefine rz(name), def, rz(arity), rz(src), null, null, true
      cont unit()

#  runMonads = (monads, i, arg)->
#    if i < monads.length
#      console.log "running monad #{i}"
#      setTimeout (-> newRunMonad monads[i](arg), defaultEnv, ((x)-> runMonads monads, i + 1, x), []), 1
#
#  global.L_runMonads = (monadArray)->
#    console.log "RUNNING #{monadArray.length} monads, ..."
#    runMonads monadArray, 0, 0
#    monadArray

  if global.L_DEBUG
    (window ? global).runMonad2 = runMonad2 = (monad, env, cont)->
      if monad instanceof Monad2
        if !env then env = {}
        st = env.monadStack  ? (env.monadStack = [])
        st.push monad
        try
          monad.cmd(env, cont)
          st.pop()
        catch err
          dumpMonadStack err, env
          throw err
      else if isIO monad
        #console.log "OLD MONAD: #{monad}"
        monad.cmd(env, cont)
      else cont monad
  else if (window ? global).L_PROMISE_MONAD
    (window ? global).runMonad2 = runMonad2 = (monad, env, cont)->
      if monad instanceof Monad2 then new window.Promise((resolve, reject)-> monad.cmd(env, resolve)).then cont
      else if isIO monad
        #console.log "OLD MONAD: #{monad}"
        monad.cmd(env, cont)
      else cont monad
  else
    (window ? global).runMonad2 = runMonad2 = (monad, env, cont)->
      if (monad instanceof Monad2) || isIO monad
        sync = false
        promiseSucceed = null
        r = null
        result = monad.cmd env, (res)->
          sync = true
          r = cont res
          if promiseSucceed then promiseSucceed r else r
        if sync then r
        else new Promise (succeed, fail)->
          promiseSucceed = succeed
          null
      else cont monad

  if global.L_DEBUG
    class Monad2 extends io
      constructor: (@mname, @cmd, @cmdToString)->
        super()
        @err = new Error()
        if typeof @mname == 'function'
          @cmdToString = @cmd
          @cmd = @mname
          @mname = null
        if !@cmdToString then @cmdToString = => (if name then "#{mname}: " else '') + @cmd.toString()
      stack: ->
        n = 0
        for i in [0...3]
          n = @err.stack.indexOf('\n', n) + 1
        @err.stack.substring(n, @err.stack.indexOf('\n', n)).trim().substring 3
  else
    class Monad2 extends io
      constructor: (@mname, @cmd, @cmdToString)->
        super()
        if typeof @mname == 'function'
          @cmdToString = @cmd
          @cmd = @mname
          @mname = null
        if !@cmdToString then @cmdToString = => (if @mname then "#{@mname}: " else '') + @cmd.toString()

  Monad2::toString = -> "Monad2: #{@cmdToString()}"

  class Monad3 extends io
    constructor: (@mname, @cmd, @cmdToString)->
      super()
      @err = new Error()
      if typeof @mname == 'function'
        @cmdToString = @cmd
        @cmd = @mname
        @mname = null
        if !@cmdToString then @cmdToString = => (if name then "#{mname}: " else '') + @cmd.toString()

  Monad3::toString = -> "Monad3: #{@cmdToString()}"

  dumpMonadStack = (err, env)->
    if global.L_DEBUG && !err.L_LOGGED && env.monadStack
      err.L_LOGGED = true
      console.log 'ERROR IN MONAD, STACK...'
      (console.log "#{n.mname}: #{n.stack()}") for n in env.monadStack
      console.log()

  define 'isIO', (m)->
    val = rz(m)
    if isIO(val) || val instanceof Monad2 || val instanceof Monad3 then _true else _false

  define 'dumpStack', new Monad2 (env, cont)->
    e = new Error()
    dumpMonadStack e, env
    console.log e.stack
    cont unit()

#  define 'return', (v)-> new Monad2 ((env, cont)-> cont rz v), -> "return #{rz v}"

  define 'defer', (v)-> new Monad2 ((env, cont)-> setTimeout (->cont rz v), 1), ->
    "defer #{rz v}"

  define 'bind', bind = (m, binding)-> if p = checkPartial(L_bind, arguments) then p else
    bnd = new Monad2 'bind', ((env, cont)->
      b = bnd
      while b instanceof Monad2 && b.isBind
        sync = true
        async = true
        runMonad2 rz(b.arg), env, (result)->
          b = rz(b.binding)(lz result)
          if sync then async = false
          else runMonad2 b, env, cont
        sync = false
        if async then return _true
      runMonad2 b, env, cont)
    bnd.isBind = true
    bnd.arg = m
    bnd.binding = binding
    bnd

  define 'pierce', (value)->
    new Monad2 'bind', (env, cont)->
      ret = null
      runMonad2 rz(value), env, (r)->
        ret = cont r
      ret

  envTag = 0

  define 'tagEnv', new Monad2 'tagEnv', (env, cont)->
    if !env.tag then env.tag = ++envTag
    cont lz env.tag

  define 'currentTag', new Monad2 'currentTag', (env, cont)-> cont lz envTag

  values = {}

  define 'primBind', bind

#
# Error handling
#
  define 'protect', (value)->
    makeMonad (env, cont)->
      hnd = (err)->
        console.log "PROTECTED ERROR: #{err.stack ? err}"
        cont left err.stack ? err
      env.errorHandlers.push hnd
      runMonad2 rz(value), env, ((result)->
        #console.log "PROTECT CONTINUING WITH RESULT: #{result}"
        if env.errorHandlers.length
          if env.errorHandlers[env.errorHandlers.length - 1] == hnd then env.errorHandlers.pop()
          else if _.inclues(env.errorHandlers, hnd)
            while env.errorHandlers[env.errorHandlers.length - 1] != hnd
              env.errorHandlers.pop()
        cont right result), []

#
# ACTORS
#
# To create an actor:
#   actor name function
#     -- function takes one arg, to process messages
#     -- if function returns a monad, it executes the monad
#
# To send a message:
#   send name message
#     -- send message to the named actor
#
  actors = {}

  define 'actor', (name, func)-> checkPartial(L_actor, arguments) || (
    actors[name] = func
    func.env = values: {}
    func.env.__proto__ = defaultEnv)

  define 'send', (name, msg)-> checkPartial(L_send, arguments) ||
    setTimeout (-> runMonad2 (rz(actors[name])(msg)), rz(actors[name]).env), 1

######
## global values
######

  define 'hasValue', (name)->
    makeSyncMonad (env, cont)->
      cont booleanFor values[rz name]?

  define 'getValueOr', (name, defaultValue)-> checkPartial(L_getValueOr, arguments) ||
    new Monad2 (env, cont)->
      cont(values[rz name] ? rz(defaultValue))

  define 'getValueOpt', (name)-> checkPartial(L_getValueOpt, arguments) ||
    new Monad2 (env, cont)->
      if v = values[rz name] then cont some v
      else cont none

  define 'getValue', (name)->
    new Monad2 'getValue', (env, cont)->
      if v = values[rz name] then cont v
      else cont unit()

# New getValue for when the option monad is integrated with the parser
#define 'getValue', (name)->
#  makeSyncMonad (env, cont)->
#    cont (if !(rz(name) of values) then none else some values[rz name])

  define 'setValue', (name, value)-> checkPartial(L_setValue, arguments) ||
    new Monad2 'setValue', (env, cont)->
      values[rz name] = rz value
      cont unit()

  define 'deleteValue', (name)->
    new Monad2 (env, cont)->
      delete values[rz name]
      cont unit()

  setValue = (key, value)-> values[key] = value

  getValue = (key)-> values[key]

######
## local values
######

  define 'envHas', (name)->
    makeSyncMonad (env, cont)->
      cont booleanFor env.values?[rz name]?

  define 'envGetOr', (name, defaultValue)-> checkPartial(L_envGetOr, arguments) ||
    makeSyncMonad (env, cont)->
      cont(env.values?[rz name] ? rz(defaultValue))

  define 'envGet', (name)->
    makeSyncMonad (env, cont)->
      cont env.values?[rz name] ? unit()

  define 'envGetOpt', (name)->
    makeSyncMonad (env, cont)->
      cont if (v = env.values?[rz name])? then some v else none

  define 'envSet', (name, value)-> checkPartial(L_envSet, arguments) ||
    makeSyncMonad (env, cont)->
      if !env.values? then env.values = {}
      env.values[rz name] = rz(value)
      cont unit()

  define 'envDelete', (name)->
    makeSyncMonad (env, cont)->
      if env.values? then delete env.values[rz name]
      cont unit()

  setValue 'macros', Nil

  define 'defMacro', (name, def)-> checkPartial(L_defMacro, arguments) ||
    makeSyncMonad (env, cont)->
      values.macros = cons cons(rz(name), rz(def)), values.macros
      cont unit()

  hasMacro = (mac)-> values.macros[mac]

  define 'funcList', makeSyncMonad (env, cont)->
    cont consFrom global.leisureFuncNames.toArray().sort()

  define 'funcs', makeSyncMonad (env, cont)->
    cont lz global.leisureFuncNames

  define 'funcSrc', (func)->
    if typeof rz(func) == 'function'
      info = functionInfo[rz(func).L$info?.name]
      if info?.src then some info.src else none

  define 'ast2Json', (ast)-> JSON.stringify ast2Json rz ast

  define 'override', (name, newFunc)-> checkPartial(L_override, arguments) ||
    makeSyncMonad (env, cont)->
      n = "L_#{nameSub rz name}"
      oldDef = global[n]
      if !oldDef then throw new Error("No definition for #{rz name}")
      global[n] = lz rz(newFunc)(oldDef)
      cont unit()

#######################
# type cases
#######################

  define '_defTypeCase', (funcName, type, func)-> checkPartial(L__defTypeCase, arguments) || (
    funcName = rz funcName
    type = rz type
    func = rz func
    n = "L_#{nameSub funcName}"
    oldDef = functionInfo[funcName]?.mainDef ? global[n]
    #if oldDef && func.length != oldDef.length
    #  throw new Error "Attempt to define a type case with different arity than the base"
    if !cl = classForType type
      throw new Error "Attempt to define a type case for a nonexistent type: #{type}"
    if !functionInfo[funcName]?.typeCase
      args = argNames oldDef ? func
      dispatch = """
        "use strict";
        (function(#{args.join ', '}) {
          return (resolve(#{args[0]}).#{n} || LeisureObject.prototype.#{n} || function(){throw new Error("No typecase for #{funcName}." + L_getType(#{args[0]}))}).apply(null, arguments);
        })
      """
      dispFunc = lz eval dispatch
      if !global[n] then nakedDefine funcName, dispFunc, args.length, dispatch
      else
        global[n] = global.leisureFuncs[n] = functionInfo[funcName].mainDef = dispFunc
        if !dispFunc.L$info then dispFunc.L$info = {}
        dispFunc.L$info.length = args.length
        if functionInfo[funcName].altList.length then buildAdvisedFunc funcName
      functionInfo[funcName].typeCase = true
      LeisureObject.prototype[n] = oldDef
    cl.prototype[n] = func
    unit())

  define '_declareType', (subtype, supertype)-> checkPartial(L__declareType, arguments) || (
    subtype = rz subtype
    supertype = rz supertype
    nilSupertype = supertype == 0
    if !nilSupertype && !supercl = classForType supertype
      throw new Error "Attempt to extend a nonexistant type: #{supertype}"
    if subcl = classForType subtype
      if supercl && subcl.prototype.__proto__ != supercl.prototype
        subcl.prototype.__proto__ = supercl.prototype
    else
      subcl = ensureLeisureClass subtype, !nilSupertype && supertype
      #if supercl
      #  subcl.prototype = Object.create(supercl.prototype)
      #  subcl.prototype.constructor = subcl
    unit())

#######################
# IO
#######################

#  define 'trace', (msg)->
#    makeSyncMonad (env, cont)->
#      cont (root.E = new Error(msg)).stack

  define 'debug', ->
    debugger
    unit()

  noMemo L_debug

  define 'debugX', (x)->
    debugger
    resolve x

  #define 'debug', new Monad2 'debug', (env, cont)->
  #    debugger
  #    cont unit()

# TODO make this use eval.litcoffee's gensym

  define 'gensym', makeSyncMonad (env, cont)-> cont "G#{gensymCounter++}"

  define 'print', (msg)->
    makeSyncMonad (env, cont)->
      env.write env.presentValue rz msg
      cont unit()

  define 'print2', (msg)->
    new Monad2 'print2', ((env, cont)->
      env.write env.presentValue rz msg
      cont unit()), -> "print2 #{rz msg}"

  define 'write', (msg)->
    new Monad2 'write', ((env, cont)->
      env.write String(rz msg)
      cont unit()), -> "write #{rz msg}"

  define 'prompt', (msg)->
    new Monad2 'promptDefault', ((env, cont)->
      env.prompt(String(rz msg), undefined, (input)->
        cont if input then some input else none)), ->
      "prompt #{rz msg} #{rz defaultValue}"


  define 'promptDefault', (msg, defaultValue)-> if r = doPartial arguments then r else
    new Monad2 'promptDefault', ((env, cont)->
      env.prompt(String(rz msg), String(rz defaultValue), (input)->
        cont if input then some input else none)), ->
      "prompt #{rz msg} #{rz defaultValue}"

  define 'oldWrite', (msg)->
    makeSyncMonad (env, cont)->
      env.write String(rz msg)
      cont unit()

  define 'readFile', (name)->
    new Monad2 'readFile', (env, cont)->
      env.readFile rz(name), (err, contents)->
        cont (if err then left err.stack ? err else right contents)

  define 'readDir', (dir)->
    new Monad2 'readDir', (env, cont)->
      env.readDir rz(dir), (err, files)->
        cont (if err then left err.stack ? err else right files)

  define 'writeFile', (name, data)-> checkPartial(L_writeFile, arguments) ||
    new Monad2 'writeFile', (env, cont)->
      env.writeFile rz(name), rz(data), (err, contents)->
        cont (if err then left err.stack ? err else right contents)

  define 'statFile', (file)->
    makeMonad (env, cont)->
      env.statFile rz(file), (err, stats)->
        cont (if err then left err.stack ? err else right stats)

  define 'rand', makeSyncMonad (env, cont)->
    cont(Math.random())

  define 'js', (str)->
    makeSyncMonad (env, cont)-> (Leisure.setLounge ? (e, cont)-> cont()) env, ->
      try
        cont right leisurify eval rz '"use strict";\n' + str
      catch err
        cont left err

  leisurify = (value)->
    if typeof value == 'function'
      if !value.memo then value.memo = nFunction value.length, ->
        valueArgs = arguments
        new Monad2 (env, cont)-> cont value (_.map valueArgs, (x)-> rz x)...
      value.memo
    else value

  nFunction = (nArgs, def)->
    (eval """
      (function (def) {
        return function (#{("arg#{i}" for i in [0...nArgs]).join ', '}) {
          return checkPartial(f, arguments) || def.apply(null, arguments);
        };
        //var f = function (#{("arg#{i}" for i in [0...nArgs]).join ', '}) {
        //  return checkPartial(f, arguments) || def.apply(null, arguments);
        //};
        //return f;
      })
    """) def

  define 'delay', (timeout)->
    new Monad2 (env, cont)->
      setTimeout (-> cont unit()), rz(timeout)

  define 'currentTime', new Monad2 (env, cont)-> cont Date.now

  define 'once', makeSyncMonad (->
    ran = false
    (env, cont)->
      if !ran
        console.log "RUNNING"
        ran = true
        cont unit()
      else console.log "ALREADY RAN")()

##################
# Function advice
##################

# later advice overrides earlier advice
  buildAdvisedFunc = (name)->
    nm = "L_#{nameSub name}"
    info = functionInfo[name]
    main = buildAdvisedFuncDef name, nm, info, info.alts, info.alts, info.mainDef
    if info.debugType
      debugMain = buildAdvisedFuncDef name, nm, info, info.debugAlts, info.alts, info.mainDebugDef || info.mainDef
    currentDef = if debugTypes[info.debugType] == 'active' then debugMain else main
    global[nm] = global.leisureFuncNames[nm] = lz currentDef

  buildAdvisedFuncDef = (name, nm, info, alts, fallbackAlts, mainDef)->
    alts = (alts[i] || fallbackAlts[i] for i in info.altList)
    alts.reverse()
    newDef = -> if p = checkPartial(mainDef, arguments) then p else
      for alt in alts
        opt = alt
        # TODO -- once lambdas are properly generated, opt.apply(null, arguments)
        for arg in arguments
          opt = opt arg
        if getType(opt) == 'some' then return opt(lz (x)->rz x)(lz _false)
      if mainDef
        res = mainDef
        for arg in arguments
          res = res arg
        return res
      throw new Error "No default definition for #{name}"
    newDef.L$info = length: info.mainDef?.L$info.length, name: name
    functionInfo[name].newArity = true
    newDef

  advise = (name, alt, arity, def)->
    info = functionInfo[name]
    if !info then info = functionInfo[name] =
      src: ''
      arity: -1
      alts: {}
      altList: []
    if !info.alts[alt] then info.altList.push alt
    info.alts[alt] = def
    buildAdvisedFunc name
    def

  define 'advise', (name, alt, arity, def)-> checkPartial(L_advise, arguments) ||
    makeMonad (env, cont)->
      cont advise rz(name), rz(alt), rz(arity), rz(def)

  curry = (arity, func)-> -> lz (arg)-> lz (subcurry arity, func, null) arg

  subcurry = (arity, func, args)->
    lz (arg)->
      #console.log "Got arg # #{arity}: #{rz arg}"
      args = simpyCons arg, args
      if arity == 1 then func(args.toArray().reverse()) else subcurry arity - 1, func, args

#######################
# Presentation
#######################

  presentationReplacements =
    '<': '&lt;'
    '>': '&gt;'
    '&': '&amp;'
    '\n': '\\n'
    '\\': '\\\\'

  escapePresentationHtml = (str)->
    if typeof str == 'string' then str.replace /[<>&\n\\]/g, (c)-> presentationReplacements[c]
    else str

  presentationToHtmlReplacements =
    '&lt;': '<'
    '&gt;': '>'
    '&amp;': '&'
    '\\n': '\n'
    '\\\\': '\\'

  unescapePresentationHtml = (str)-> str.replace /&lt;|&gt;|&amp;|\\n|\\/g, (c)-> presentationToHtmlReplacements[c]

  define 'escapeHtml', (h)-> escapePresentationHtml rz(h)
  define 'unescapeHtml', (h)-> unescapePresentationHtml rz(h)

#######################
# AMTs
#######################

  makeMap = (map)->
    h = (f)-> f(-> mapFirst map)(-> mapRest map)
    h.map = map
    setType h, 'hamt'
    h.leisureType = 'hamt'
    h

  hamt = makeMap Map()
  setDataType hamt, 'hamt'

  define 'hamt', hamt
  
  define 'mapSize', (map)-> rz(map).map.size

  define 'mapSet', (key, value, map)-> checkPartial(L_mapSet, arguments) ||
    makeMap rz(map).map.set rz(key), rz(value)

  define 'mapGet', (key, map)-> checkPartial(L_mapGet, arguments) || (
    m = rz(map).map
    k = rz(key)
    if m.has rz(key) then m.get(rz(key)) else Nil)

  define 'mapGetOpt', (key, map)-> checkPartial(L_mapGetOpt, arguments) || (
    v = rz(map).map.get rz(key)
    if v != undefined then some v else none)

  define 'mapRemove', (key, map)-> checkPartial(L_mapRemove, arguments) ||
    makeMap rz(map).map.remove rz(key)

  mapFirst = (map)->
    entry = map.entrySeq().last()
    rz(L_cons) lz(entry[0]), lz(entry[1])

  define 'mapFirst', (map)-> mapFirst rz(map).map

  mapRest = (map)-> makeMap map.butLast()

  define 'mapRest', (map)-> mapRest rz(map).map

  define 'mapContains', (item, map)-> checkPartial(L_mapContains, arguments) ||
    booleanFor rz(map).map.has rz(item)

  define 'mapPairs', (map)->
    h = rz(map).map.reverse()
    nextMapPair h, h.keySeq()

  nextMapPair = (map, keys)->
    if !keys.size then rz L_nil
    else
      k = keys.first()
      rz(L_cons)(lz(rz(L_cons)(lz(k), lz(map.get(k)))), -> nextMapPair map, keys.rest())

  define 'mapReverse', (map)-> makeMap rz(map).map.reverse()

  makeSet = (set)->
    s = (f)-> f(-> set.first())(-> setRest set)
    s.set = set
    setType s, 'amtSet'
    s.leisureType = 'amtSet'
    s

  amtSet = makeSet Set()
  setDataType amtSet, 'amtSet'

  define 'amtSet', amtSet

  define 'setSize', (set)-> rz(set).set.size

  define 'setContains', (item, set)-> checkPartial(L_setContains, arguments) ||
    booleanFor rz(set).set.contains rz(item)

  define 'setAdd', (value, set)-> checkPartial(L_setAdd, arguments) ||
    makeSet rz(set).set.add rz value

  define 'setRemove', (value, set)-> checkPartial(L_setRemove, arguments) ||
    makeSet rz(set).set.delete rz value

  define 'setUnion', (setA, setB)-> checkPartial(L_setUnion, arguments) ||
    makeSet rz(setA).set.union rz(setB).set

  define 'setIntersect', (setA, setB)-> checkPartial(L_setIntersect, arguments) ||
    makeSet rz(setA).set.intersect rz(setB).set

  define 'setSubtract', (setA, setB)-> checkPartial(L_setSubtract, arguments) ||
    makeSet rz(setA).set.subtract rz(setB).set

  define 'setItems', (set)-> nextSetItem rz(set).set.reverse()

  nextSetItem = (s)->
    if !s.size then rz L_nil
    else rz(L_cons)(lz(s.first()), -> nextSetItem s.rest())

  define 'setFirst', (set)-> rz(set).set.first()

  setRest = (set)-> makeSet set.butLast()

  define 'setRest', (set)-> setRest rz(set).set

  define 'setReverse', (set)-> makeSet rz(set).set.reverse()

  makeVector = (vec)->
    v = (f)-> f(-> vec.first())(-> vectorRest vec)
    v.vector = vec
    setType v, 'vector'
    v.leisureType = 'vector'
    v

  vector = makeVector List()
  setDataType vector, 'vector'

  define 'vector', vector

  define 'vectorSize', (value, vec)-> rz(vec).vector.size

  define 'vectorContains', (item, vec)-> checkPartial(L_vectorContains, arguments) ||
    booleanFor rz(vec).vector.contains rz(item)

  define 'vectorPush', (value, vec)-> checkPartial(L_vectorPush, arguments) ||
    makeVector rz(vec).vector.push rz value

  define 'vectorPop', (value, vec)-> checkPartial(L_vectorPop, arguments) ||
    makeVector rz(vec).vector.pop()

  define 'vectorShift', (value, vec)-> checkPartial(L_vectorShift, arguments) ||
    makeVector rz(vec).vector.shift()

  define 'vectorUnshift', (value, vec)-> checkPartial(L_vectorUnshift, arguments) ||
    makeVector rz(vec).vector.unshift rz value

  define 'vectorConcat', (vecA, vecB)-> checkPartial(L_vectorConcat, arguments) ||
    makeVector rz(vecA).vector.concat rz(vecB).vector

  define 'vectorItems', (vec)-> nextVectorItem rz(vec).vector

  nextVectorItem = (v)->
    if !v.size then rz L_nil
    else rz(L_cons)(lz(v.first()), -> nextVectorItem v.rest())

  define 'vectorFirst', (vec)-> rz(vec).vector.first()

  vectorRest = (vec)-> makeVector vec.rest()

  define 'vectorRest', (vec)-> vectorRest rz(vec).vector

  define 'vectorReverse', (vec)-> makeVector rz(vec).vector.reverse()

  define 'vectorRemove', (item, vec)-> checkPartial(L_vectorRemove, arguments) || (
    item = rz item
    makeVector rz(vec).vector.filter (el)-> el != item)

#################
# YAML and JSON
#################

  lacons = (k, v, list)-> rz(L_acons)((lz k), (lz v), (lz list))

  jsonConvert = (obj)->
    if obj instanceof Array
      consFrom (_.map obj, jsonConvert)
    else if typeof obj == 'object'
      t = rz L_nil
      for k, v of obj
        t = lacons k, jsonConvert(v), t
      t
    else obj

  define 'fromJson', (obj)-> jsonConvert rz obj

  define 'parseYaml', (obj)-> parseYaml rz obj

  define 'toJsonArray', (list)->
    list = rz list
    array = []
    while !list.isNil()
      array.push list.head()
      list = list.tail()
    array

  define 'toJsonObject', (list)->
    list = rz list
    obj = {}
    while !list.isNil()
      head = list.head()
      if !obj[head.head()]? then obj[head.head()] = head.tail()
      list = list.tail()
    obj

  define 'jsonToYaml', (json)->
    try
      right dump rz json
    catch err
      left err.stack


#######################
# Control
#######################

  define 'protect', (value)->
    try
      right rz value
    catch err
      left err

#######################
# Trampolines
#######################

  define '_withRecur', (value)->
    ret = rz value
    while getType(ret) == '_recur'
      ret = ret lz _identity
    ret

#######################
# NAME SPACES
#######################

  define 'setNameSpace', (name)->
    makeSyncMonad (env, cont)->
      root.currentNameSpace = rz name
      newNameSpace = false
      if name
        newNameSpace = !LeisureNameSpaces[name]
        if newNameSpace then LeisureNameSpaces[name] = {}
        nsLog "SETTING NAME SPACE: #{name}"
      cont (if newNameSpace then _true else _false)

  define 'pushNameSpace', (newNameSpace)->
    makeSyncMonad (env, cont)->
      pushed = LeisureNameSpaces[newNameSpace] && ! (newNameSpace in root.nameSpacePath)
      if pushed then root.nameSpacePath.push newNameSpace
      cont (if pushed then _true else _false)

  define 'clearNameSpacePath', makeSyncMonad (env, cont)->
    root.nameSpacePath = []
    cont unit()

  define 'resetNameSpaceInfo', makeSyncMonad (enf, cont)->
    old = [root.nameSpacePath, root.currentNameSpace]
    root.nameSpacePath = ['core']
    root.currentNameSpace = null
    nsLog "SETTING NAME SPACE: null"
    cont old

  define 'setNameSpaceInfo', (info)->
    makeSyncMonad (env, cont)->
      #console.log "RESTORING NAME SPACE INFO: #{require('util').inspect rz info}"
      [root.nameSpacePath, root.currentNameSpace] = rz info
      nsLog "SETTING NAME SPACE: #{root.currentNameSpace}"
      cont unit()

#######################
# Classes for Printing
#######################

  ensureLeisureClass 'token'
  Leisure_token.prototype.toString = -> "Token(#{JSON.stringify(tokenString(this))}, #{posString tokenPos(this)})"

  tokenString = (t)-> t(lz (txt)->(pos)-> rz txt)
  tokenPos = (t)-> t(lz (txt)->(pos)-> rz pos)
  ensureLeisureClass 'filepos'
  posString = (p)->
    if p instanceof Leisure_filepos then p(lz (file)->(line)->(offset)-> "#{rz file}:#{rz line}.#{rz offset}")
    else p

  ensureLeisureClass 'parens'
  Leisure_parens.prototype.toString = -> "Parens(#{posString parensStart @}, #{posString parensEnd @}, #{parensContent @})"

  parensStart = (p)-> p(lz (s)->(e)->(l)-> rz s)
  parensEnd = (p)-> p(lz (s)->(e)->(l)-> rz e)
  parensContent = (p)-> p(lz (s)->(e)->(l)-> rz l)

  ensureLeisureClass 'true'
  Leisure_true.prototype.toString = -> "true"

  ensureLeisureClass 'false'
  Leisure_false.prototype.toString = -> "false"

  ensureLeisureClass 'left'
  Leisure_left.prototype.toString = -> "Left(#{@(lz _identity)(lz _identity)})"

  ensureLeisureClass 'right'
  Leisure_right.prototype.toString = -> "Right(#{@(lz _identity)(lz _identity)})"

#######################
# LOADING
#######################

  requireFiles = (req, cont, verbose)->
    (req[..].reverse().reduce ((acc, el)-> ->
      if verbose then console.log "REQUIRING FILE: #{el}"
      require [el], acc), cont)()

#######################
# Func info
#######################

  define 'funcInfo', (f)-> funcInfo rz f

  define 'funcName', (f)-> if rz(f).L$info?.name then some rz(f).L$info.name else none
  
  define 'getFunction', (name)->
    f = rz global['L_' + (nameSub rz name)]
    if f then some f else none

  define 'isType', (f)->
    f = rz f
    booleanFor (typeof f == 'function' && (f.typeFunction || f.dataType))

  define 'typeName', (f)-> rz(f).L$info?.name

#######################
# Exports
#######################

  if window?
    window.runMonad = runMonad
    window.setType = setType
    window.setDataType = setDataType
    window.defaultEnv = defaultEnv
    window.identity = identity

  Runtime = {
    requireFiles
    _true
    _false
    unit
    _identity
    some
    none
    stateValues: values
    runMonad
    runMonad2
    newRunMonad
    isIO
    Monad2
    identity
    setValue
    getValue
    makeMonad
    makeSyncMonad
    replaceErr
    left
    right
    getMonadSyncMode
    asyncMonad
    setWarnAsync
    call
    callMonad
    basicCall
    booleanFor
    newConsFrom: consFrom
    escapePresentationHtml
    unescapePresentationHtml
    makeMap
    jsonConvert
    lacons
    dumpMonadStack
    define
    isPartial
    partialCall
    bind
    buildAdvisedFuncDef
    hasMacro
  }

  Object.assign Leisure, {
    stateValues: values
    runMonad: runMonad2
    Runtime
    leisureFunctionNamed
    nameSub
    dbg: -> debugger
  }

  Runtime
