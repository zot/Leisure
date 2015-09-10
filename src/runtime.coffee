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

define ['./base', './ast', 'lib/lodash.min', 'immutable', 'lib/js-yaml'], (Base, Ast, _, Immutable, Yaml)->

  {
    readFile,
    statFile,
    readDir,
    writeFile,
    defaultEnv,
    SimpyCons,
    simpyCons,
    resolve,
    lazy,
    nsLog,
    funcInfo,
  } = Base
  {
    define,
    nakedDefine,
    cons,
    Nil,
    head,
    tail,
    getType,
    getDataType,
    ast2Json,
    ensureLeisureClass,
    LeisureObject,
    mkProto,
    setType,
    setDataType,
    functionInfo,
    nameSub,
  } = Ast
  {
    Map,
  } = Immutable
  {
    safeLoad,
    dump,
  } = Yaml

  rz = resolve
  lz = lazy
  lc = Leisure_call
  gensymCounter = 0
  
  call = (args...)-> basicCall(args, defaultEnv, identity)
  
  callMonad = (args..., env, cont)-> basicCall(args, env, cont)
  
  basicCall = (args, env, cont)->
    res = rz global["L_#{args[0]}"]
    for arg in args[1..]
      res = do (arg)-> res(lz arg)
    runMonad res, env, cont
  
  consFrom = (array, i)->
    i = i || 0
    if i < array.length then cons array[i], consFrom(array, i + 1) else rz L_nil

############
# LOGIC
############

  identity = (x)-> x
  _identity = (x)-> rz x
  _unit = setType ((x)->rz x), 'unit'
  _true = setType ((a)->(b)->rz a), 'true'
  _false = setType ((a)->(b)->rz b), 'false'
  left = (x)-> setType ((lCase)->(rCase)-> rz(lCase)(lz x)), 'left'
  right = (x)-> setType ((lCase)->(rCase)-> rz(rCase)(lz x)), 'right'
  some = (x)-> setType ((someCase)->(noneCase)-> rz(someCase)(lz x)), 'some'
  none = setType ((someCase)->(noneCase)-> rz(noneCase)), 'none'
  define 'eq', (a)->(b)-> booleanFor rz(a) == rz(b)
  define '==', (a)->(b)-> booleanFor rz(a) == rz(b)
  booleanFor = (bool)-> if bool then rz L_true else rz L_false
  define 'hasType', (data)->(func)->
    if typeof rz(func) == 'string' then booleanFor getType(rz(data)) == rz(func)
    else booleanFor getType(rz data) == getDataType(rz func)
  define 'getDataType', (func)-> if typeof rz(func) == 'string' then rz(func) else getDataType(rz(func))
  define 'assert', (bool)->(msg)-> (expr)-> rz(bool)(expr)(-> throw new Error(rz msg))
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

  define '+', (x)->(y)->rz(x) + rz(y)
  define '-', (x)->(y)->rz(x) - rz(y)
  define '*', (x)->(y)->rz(x) * rz(y)
  define '/', (x)->(y)->rz(x) / rz(y)
  define '%', (x)->(y)->rz(x) % rz(y)
  define '<', (x)->(y)->booleanFor rz(x) < rz(y)
  define '<=', (x)->(y)->booleanFor rz(x) <= rz(y)
  define '>', (x)->(y)->booleanFor rz(x) > rz(y)
  define '>=', (x)->(y)->booleanFor rz(x) >= rz(y)
  define 'floor', (x)-> Math.floor(rz x)
  define 'ceil', (x)-> Math.ceil(rz x)
  define 'min', (x)->(y)-> Math.min rz(x), rz(y)
  define 'max', (x)->(y)-> Math.max rz(x), rz(y)
  define 'round', (x)-> Math.round(rz x)
  define 'abs', (x)-> Math.abs(rz x)
  define 'sqrt', (x)-> Math.sqrt(rz x)
  
  define 'acos', (x)-> Math.acos(rz x)
  define 'asin', (x)-> Math.asin(rz x)
  define 'atan', (x)-> Math.atan(rz x)
  define 'atan2', (x)->(y)-> Math.atan2(rz(x), rz(y))
  define 'cos', (x)-> Math.cos(rz x)
  #define 'log', (x)-> Math.log(rz x)
  define 'sin', (x)-> Math.sin(rz x)
  define 'tan', (x)-> Math.tan(rz x)
  
  define 'rand', -> makeSyncMonad (env, cont)->
    cont (Math.random())
  define 'randInt', (low)->(high)->makeSyncMonad (env, cont)->
    cont (Math.floor(rz(low) + Math.random() * rz(high)))
  define '^', (x)->(y)->Math.pow(rz(x), rz(y))
  define 'number', (n)-> Number n

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
  define '_strAt', (str)->(index)-> rz(str)[strCoord(rz(str), rz(index))]
  define '_strStartsWith', (str)->(prefix)-> booleanFor rz(str).substring(0, rz(prefix).length) == rz(prefix)
  define '_strLen', (str)-> rz(str).length
  define '_strToLowerCase', (str)-> rz(str).toLowerCase()
  define '_strToUpperCase', (str)-> rz(str).toUpperCase()
  define '_strReplace', (str)->(pat)->(repl)-> rz(str).replace rz(pat), rz(repl)
  strCoord = (str, coord)-> if coord < 0 then str.length + coord else coord
  define '_strSubstring', (str)->(start)->(end)->
    a = strCoord(rz(str), rz(start))
    b = strCoord(rz(str), rz(end))
    if b < a && rz(end) == 0 then b = rz(str).length
    rz(str).substring a, b
  define '_strSplit', (str)->(pat)-> consFrom rz(str).split if rz(pat) instanceof RegExp then rz(pat) else new RegExp rz(pat)
  define '_strCat', (list)-> _.map(rz(list).toArray(), (el)-> if typeof el == 'string' then el else rz(L_show)(lz el)).join('')
  define '_strAdd', (s1)->(s2)-> rz(s1) + rz(s2)
  define '_strMatch', (str)->(pat)->
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
  define '_regexpFlags', (str)->(flags)-> new RegExp rz(str), rz(flags)
  define '_jsonParse', (str)->(failCont)->(successCont)->
    try
      p = JSON.parse rz str
      rz(successCont) lz p
    catch err
      rz(failCont) lz err
  define 'jsonStringify', (obj)->(failCont)->(successCont)->
    try
      s = JSON.stringify rz obj
      rz(successCont) lz s
    catch err
      rz(failCont) lz err

############
# properties
############

  define 'getProperties', (func)-> if rz(func)?.properties then rz(func).properties else rz L_nil
  
  define 'setProperty', (func)->(name)->(value)->
    makeSyncMonad (env, cont)->
      f = rz func
      f.properties = rz(L_aconsf)(name)(value)(lz f.properties ? rz(L_nil))
      cont f.properties

############
# Diagnostics
############

  define 'log', (str)->(res)->
    console.log String rz str
    rz res
  
  define 'logStack', (str)->(res)->
    console.log new Error(rz str).stack
    rz res
  
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
    m.__proto__ = Monad.prototype
    m.cmd = guts
    m.type = 'monad'
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
  defaultEnv.prompt = ->throw new Error "Environment does not support prompting!"
  
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
  
  isMonad = (m)-> typeof m == 'function' && m.cmd?
  
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
        else if isMonad monad
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
    if isMonad(tmp) && (tmp.monad == val || tmp.monad == value)
      console.log "peeling bind"
      func value
    else tmp
    #if isMonad(tmp) && tmp?.binding? then func value else tmp
  
  class Monad
    toString: -> "Monad: #{@cmd.toString()}"

  (global ? window).L_runMonads = (monadArray, env)->
    #console.log "RUNNING MONADS"
    monadArray.reverse()
    newRunMonad 0, (env ? defaultEnv), null, monadArray
    monadArray

#  global.L_runMonads = (monadArray, env, cont)->
#    nextMonad = (ind)->
#      if ind >= monadArray.length then cont?()
#      else
#        runMonad2 monadArray[ind], env, ->
#          setTimeout (->nextMonad ind + 1), 1
#    nextMonad 0
#    monadArray

  ensureLeisureClass 'unit'
  
  class Leisure_unit extends LeisureObject
    toString: -> 'unit'
  
  _unit = mkProto Leisure_unit, setType ((_x)-> rz(_x)), 'unit'
  
  define 'define', (name)->(arity)->(src)->(def)->
    #console.log "DEFINE: #{name}"
    makeSyncMonad (env, cont)->
      nakedDefine rz(name), def, rz(arity), rz(src)
      cont _unit
  
  define 'newDefine', (name)->(arity)->(src)->(def)->
    #console.log "NEW DEFINE: #{name}"
    makeSyncMonad (env, cont)->
      nakedDefine rz(name), def, rz(arity), rz(src), null, null, true
      cont _unit

#  runMonads = (monads, i, arg)->
#    if i < monads.length
#      console.log "running monad #{i}"
#      setTimeout (-> newRunMonad monads[i](arg), defaultEnv, ((x)-> runMonads monads, i + 1, x), []), 1
#  
#  global.L_runMonads = (monadArray)->
#    console.log "RUNNING #{monadArray.length} monads, ..."
#    runMonads monadArray, 0, 0
#    monadArray

  runMonad2 = (monad, env, cont)->
    if monad instanceof Monad2 then monad.cmd(env, cont)
    #else if isMonad monad then newRunMonad monad, env, cont, []
    else if isMonad monad
      if monad.binding?
        runMonad2 rz(monad.monad), env, (x)->
          runMonad2 rz(monad.binding)(lz x), env, cont
      else monad.cmd(env, cont)
    else cont monad
  
  class Monad2 extends Monad
    constructor: (@name, @cmd, @cmdToString)->
      if typeof @name == 'function'
        @cmdToString = @cmd
        @cmd = name
        @name = null
      if !@cmdToString then @cmdToString = => (if name then "#{name}: " else '') + @cmd.toString()
    toString: -> "Monad2: #{@cmdToString()}"

#  define 'return', (v)-> new Monad2 ((env, cont)-> cont rz v), -> "return #{rz v}"

  define 'defer', (v)-> new Monad2 ((env, cont)-> setTimeout (->cont rz v), 1), ->
    "defer #{rz v}"
  
  define 'bind2', bind2 = (m)->(binding)->
    newM = rz m
    if (newM instanceof Monad2) || (isMonad newM)
      new Monad2 'bind', ((env, cont)->
        runMonad2 newM, env, (value)->
          #runMonad2 rz(L_bind2)(lz value)(binding), env, cont), ->
          runMonad2 rz(binding)(lz value), env, cont), ->
        "bind (#{rz m})"
    else rz(binding) m
  
  newbind = false
  #newbind = true

  if newbind then define 'bind', bind2
  else
    define 'bind', (m)->(binding)->
      if isMonad rz m
        bindMonad = makeMonad (env, cont)->
        bindMonad.monad = m
        bindMonad.binding = binding
        bindMonad
      else rz(binding) m
  
  values = {}

#
# Error handling
#
  define 'protect', (value)->
    makeMonad (env, cont)->
      hnd = (err)->
        console.log "PROTECTED ERROR: #{err.stack ? err}"
        cont left err.stack ? err
      env.errorHandlers.push hnd
      runMonad rz(value), env, ((result)->
        #console.log "PROTECT CONTINUING WITH RESULT: #{result}"
        if env.errorHandlers.length
          if env.errorHandlers[env.errorHandlers.length - 1] == hnd then env.errorHandlers.pop()
          else if _.contains(env.errorHandlers, hnd)
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
  
  define 'actor', (name)->(func)->
    actors[name] = func
    func.env = values: {}
    func.env.__proto__ = defaultEnv
  
  define 'send', (name)->(msg)-> setTimeout (-> runMonad (rz(actors[name])(msg)), rz(actors[name]).env), 1
  
  define 'hasValue', (name)->
    makeSyncMonad (env, cont)->
      cont booleanFor values[rz name]?
  
  define 'getValueOr', (name)->(defaultValue)->
    makeSyncMonad (env, cont)->
      cont(values[rz name] ? rz(defaultValue))
  
  define 'getValue', (name)->
    makeSyncMonad (env, cont)->
      if !(rz(name) of values) then throw new Error "No value named '#{rz name}'"
      cont values[rz name]

# New getValue for when the option monad is integrated with the parser
#define 'getValue', (name)->
#  makeSyncMonad (env, cont)->
#    cont (if !(rz(name) of values) then none else some values[rz name])

  define 'setValue', (name)->(value)->
    makeSyncMonad (env, cont)->
      values[rz name] = rz value
      cont _unit
  
  define 'deleteValue', (name)->
    makeSyncMonad (env, cont)->
      delete values[rz name]
      cont _unit
  
  setValue = (key, value)-> values[key] = value
  
  getValue = (key)-> values[key]
  
  define 'envHas', (name)->
    makeSyncMonad (env, cont)->
      cont booleanFor env.values[rz name]?
  
  define 'envGetOr', (name)->(defaultValue)->
    makeSyncMonad (env, cont)->
      cont(env.values[rz name] ? rz(defaultValue))
  
  define 'envGet', (name)->
    makeSyncMonad (env, cont)->
      if !(rz(name) of env.values) then throw new Error "No value named '#{rz name}'"
      cont env.values[rz name]
  
  define 'envSet', (name)->(value)->
    makeSyncMonad (env, cont)->
      env.values[rz name] = rz(value)
      cont _unit
  
  define 'envDelete', (name)->
    makeSyncMonad (env, cont)->
      delete env.values[rz name]
      cont _unit
  
  setValue 'macros', Nil
  
  define 'defMacro', (name)->(def)->
    makeSyncMonad (env, cont)->
      values.macros = cons cons(rz(name), rz(def)), values.macros
      cont _unit

  define 'funcList', makeSyncMonad (env, cont)->
    cont consFrom global.leisureFuncNames.toArray().sort()
  
  define 'funcs', makeSyncMonad (env, cont)->
    console.log "Leisure functions:\n#{_(global.leisureFuncNames.toArray()).sort().join '\n'}"
    cont _unit
  
  define 'funcSrc', (func)->
    if typeof rz(func) == 'function'
      info = functionInfo[rz(func).leisureName]
      if info?.src then some info.src else none
  
  define 'ast2Json', (ast)-> JSON.stringify ast2Json rz ast
  
  define 'override', (name)->(newFunc)->
    makeSyncMonad (env, cont)->
      n = "L_#{nameSub rz name}"
      oldDef = global[n]
      if !oldDef then throw new Error("No definition for #{rz name}")
      global[n] = -> rz(newFunc)(oldDef)
      cont _unit

#######################
# IO
#######################

#  define 'trace', (msg)->
#    makeSyncMonad (env, cont)->
#      cont (root.E = new Error(msg)).stack

  define 'gensym', makeSyncMonad (env, cont)-> cont "G#{gensymCounter++}"
  
  define 'print', (msg)->
    makeSyncMonad (env, cont)->
      env.write env.presentValue rz msg
      cont _unit
  
  define 'print2', (msg)->
    new Monad2 'print2', ((env, cont)->
      env.write env.presentValue rz msg
      cont _unit), -> "print2 #{rz msg}"
  
  define 'write', (msg)->
    new Monad2 'write', ((env, cont)->
      env.write String(rz msg)
      cont _unit), -> "write #{rz msg}"
  
  define 'prompt2', (msg)->
    new Monad2 ((env, cont)->
      env.prompt(String(rz msg), (input)-> cont input)), ->
      "prompt2 #{rz msg}"
  
  define 'oldWrite', (msg)->
    makeSyncMonad (env, cont)->
      env.write String(rz msg)
      cont _unit
  
  define 'readFile', (name)->
    makeMonad (env, cont)->
      env.readFile rz(name), (err, contents)->
        cont (if err then left err.stack ? err else right contents)
  
  define 'readDir', (dir)->
    makeMonad (env, cont)->
      env.readDir rz(dir), (err, files)->
        cont (if err then left err.stack ? err else right files)
  
  define 'writeFile', (name)->(data)->
    makeMonad (env, cont)->
      env.writeFile rz(name), rz(data), (err, contents)->
        cont (if err then left err.stack ? err else right contents)
  
  define 'statFile', (file)->
    makeMonad (env, cont)->
      env.statFile rz(file), (err, stats)->
        cont (if err then left err.stack ? err else right stats)
  
  define 'prompt', (msg)->
    makeMonad (env, cont)->
      env.prompt(String(rz msg), (input)-> cont(input))

  define 'rand', makeSyncMonad (env, cont)->
    cont(Math.random())
  
  define 'js', (str)->
    makeSyncMonad (env, cont)->
      try
        result = eval rz str
        cont right result
      catch err
        cont left err
  
  define 'delay', (timeout)->
    new Monad2 (env, cont)->
      setTimeout (-> cont _unit), rz(timeout)
  
  define 'currentTime', new Monad2 (env, cont)-> cont Date.now
  
  define 'once', makeSyncMonad (->
    ran = false
    (env, cont)->
      if !ran
        console.log "RUNNING"
        ran = true
        cont _unit
      else console.log "ALREADY RAN")()

##################
# Function advice
##################

# later advice overrides earlier advice
  define 'advise', (name)->(alt)->(arity)->(def)->
    makeMonad (env, cont)->
      info = functionInfo[rz name]
      if !info then info = functionInfo[rz name] =
        src: ''
        arity: -1
        alts: {}
        altList: []
      if !info.alts[rz alt] then info.altList.push rz alt
      info.alts[rz alt] = rz def
      alts = (info.alts[i] for i in info.altList)
      alts.reverse()
      newDef = curry rz(arity), (args)->
        for alt in alts
          opt = alt
          for arg in args
            opt = opt arg
          if getType(opt) == 'some' then return opt(lz (x)->rz x)(lz _false)
        if info.mainDef
          res = rz info.mainDef
          for arg in args
            res = res arg
          return res
        throw new Error "No default definition for #{rz name}"
      nm = "L_#{nameSub rz name}"
      global[nm] = global.leisureFuncNames[nm] = newDef
      functionInfo[name].newArity = false
      cont def
  
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

  makeHamt = (hamt)->
    hamt.leisureType = 'hamt'
    hamt
  
  hamt = makeHamt Map()
  hamt.leisureDataType = 'hamt'
  
  define 'hamt', hamt
  
  define 'hamtWith', (key)->(value)->(hamt)-> makeHamt rz(hamt).set rz(key), rz(value)
  define 'hamtSet', (key)->(value)->(hamt)-> makeHamt rz(hamt).set rz(key), rz(value)
  
  define 'hamtFetch', (key)->(hamt)-> rz(hamt).get rz(key)
  
  define 'hamtGet', (key)->(hamt)->
    v = rz(hamt).get rz(key)
    if v != undefined then some v else none
  
  define 'hamtWithout', (key)->(hamt)-> makeHamt rz(hamt).remove rz(key)

#  define 'hamtOpts', (eq)->(hash)->
#  
#  define 'hamtAssocOpts', (hamt)->(key)->(value)->(opts)-> amt.assoc(rz(hamt), rz(key), rz(value), rz(opts))
#  
#  define 'hamtFetchOpts', (hamt)->(key)->(opts)-> amt.get(rz(hamt), rz(key), rz(opts))
#  
#  define 'hamtGetOpts', (hamt)->(key)->(opts)->
#    v = amt.get(rz(hamt), rz(key), rz(opts))
#    if v != null then some v else none
#  
#  define 'hamtDissocOpts', (hamt)->(key)->(opts)-> amt.dissoc(rz(hamt), rz(key), rz(opts))

  define 'hamtPairs', (hamt)-> nextHamtPair rz(hamt).entries()
  
  nextHamtPair = (entries)->
    if entries.size == 0 then rz L_nil
    else
      f = entries.first()
      rz(L_acons)(f[0])(f[1])(-> nextHamtPair entries.rest)

#################
# YAML and JSON
#################

  lacons = (k, v, list)-> rz(L_acons)(lz k)(lz v)(lz list)
  
  jsonConvert = (obj)->
    if obj instanceof Array
      consFrom (jsonConvert i for i in obj)
    else if typeof obj == 'object'
      t = rz L_nil
      for k, v of obj
        t = lacons k, jsonConvert(v), t
      t
    else obj
  
  define 'fromJson', (obj)-> jsonConvert rz obj
  
  define 'parseYaml', (obj)-> safeLoad rz obj
  
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
# Trampolines
#######################

  define 'trampolineCall', (func)->
    ret = rz func
    while true
      if typeof ret == 'function' && ret.trampoline then ret = ret() else return ret
  
  define 'trampoline', (func)->
    f = rz func
    arity = functionInfo[f.leisureName].arity
    trampCurry f, arity
  
  trampCurry = (func, arity)-> (arg)->
    a = rz arg
    if arity > 1 then trampCurry (func ->a), arity - 1
    else
      result = -> func ->a
      result.trampoline = true
      result

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
    cont _unit
  
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
      cont _unit

#######################
# Classes for Printing
#######################

  ensureLeisureClass 'token'
  Leisure_token.prototype.toString = -> "Token(#{JSON.stringify(tokenString(@))}, #{posString tokenPos(@)})"
  
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
    if req.length
      if verbose then console.log "REQUIRING FILE: #{req[0]}"
      contStack = require req.shift()
      if Array.isArray(contStack) && contStack.length then contStack.unshift ->
        requireFiles req, cont, verbose
      else requireFiles req, cont, verbose
    else
      cont()

#######################
# Func info
#######################

  define 'funcInfo', (f)-> funcInfo rz f
  
  define 'funcName', (f)-> if rz(f).leisureName then some rz(f).leisureName else none
  
  define 'trackCreation', (flag)->
    makeSyncMonad (env, cont)->
      root.trackCreation = rz(flag)(lz true)(lz false)
      cont _unit
  define 'trackVars', (flag)->
    makeSyncMonad (env, cont)->
      root.trackVars = rz(flag)(lz true)(lz false)
      cont _unit
  
  define 'getFunction', (name)->
    f = rz global['L_' + (nameSub rz name)]
    if f then some f else none

#######################
# Exports
#######################

  if window?
    window.runMonad = runMonad
    window.setType = setType
    window.setDataType = setDataType
    window.defaultEnv = defaultEnv
    window.identity = identity

  {
    requireFiles
    _true
    _false
    _unit
    stateValues: values
    runMonad
    runMonad2
    newRunMonad
    isMonad
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
    makeHamt
    jsonConvert
  }
