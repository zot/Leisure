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

{
  readFile,
  statFile,
  readDir,
  writeFile,
  defaultEnv,
} = root = module.exports = require './base'
{
  define,
  cons,
  Nil,
  head,
  tail,
  getType,
  getDataType,
  ast2Json,
  ensureLeisureClass,
  setType,
  setDataType,
  functionInfo,
  nameSub,
} = require './ast'
_ = require './lodash.min'
amt = require('persistent-hash-trie')

call = (args...)-> basicCall(args, defaultEnv, identity)

callMonad = (args..., env, cont)-> basicCall(args, env, cont)

basicCall = (args, env, cont)->
  res = global["L_#{args[0]}"]()
  for arg in args[1..]
    res = do (arg)-> res(->arg)
  runMonad res, env, cont

consFrom = (array, i)->
  i = i || 0
  if i < array.length then cons array[i], consFrom(array, i + 1) else L_nil()

############
# LOGIC
############

identity = (x)-> x
_identity = (x)-> x()
_true = setType ((a)->(b)->a()), 'true'
_false = setType ((a)->(b)->b()), 'false'
left = (x)-> setType ((lCase)->(rCase)-> lCase()(->x)), 'left'
right = (x)-> setType ((lCase)->(rCase)-> rCase()(->x)), 'right'
some = (x)-> setType ((someCase)->(noneCase)-> someCase()(->x)), 'some'
none = setType ((someCase)->(noneCase)-> noneCase()), 'none'
booleanFor = (bool)-> if bool then L_true() else L_false()
define 'eq', ->(a)->(b)-> booleanFor a() == b()
define '==', ->(a)->(b)-> booleanFor a() == b()
define 'hasType', ->(data)->(func)->
  if typeof func() == 'string' then booleanFor getType(data()) == func()
  else booleanFor getType(data()) == getDataType(func())
define 'getDataType', ->(func)-> if typeof func() == 'string' then func() else getDataType(func())
define 'assert', ->(bool)->(msg)->(expr)-> bool()(->expr())(-> throw new Error(msg()))
define 'assertLog', ->(bool)->(msg)->(expr)-> bool()(->expr())(->
  console.log new Error(msg()).stack
  console.log "LOGGED ERROR -- RESUMING EXECUTION..."
  expr())

############
# MATH
############

define '+', ->(x)->(y)->x() + y()
define '-', ->(x)->(y)->x() - y()
define '*', ->(x)->(y)->x() * y()
define '/', ->(x)->(y)->x() / y()
define '%', ->(x)->(y)->x() % y()
define '<', ->(x)->(y)->booleanFor x() < y()
define '<=', ->(x)->(y)->booleanFor x() <= y()
define '>', ->(x)->(y)->booleanFor x() > y()
define '>=', ->(x)->(y)->booleanFor x() >= y()
define 'floor', ->(x)-> Math.floor(x())
define 'ceil', ->(x)-> Math.ceil(x())
define 'min', ->(x)->(y)-> Math.min x(), y()
define 'max', ->(x)->(y)-> Math.max x(), y()
define 'round', ->(x)-> Math.round(x())
define 'abs', ->(x)-> Math.abs(x())
define 'sqrt', ->(x)-> Math.sqrt(x())

define 'acos', ->(x)-> Math.acos(x())
define 'asin', ->(x)-> Math.asin(x())
define 'atan', ->(x)-> Math.atan(x())
define 'atan2', ->(x)->(y)-> Math.atan2(x(), y())
define 'cos', ->(x)-> Math.cos(x())
define 'log', ->(x)-> Math.log(x())
define 'sin', ->(x)-> Math.sin(x())
define 'tan', ->(x)-> Math.tan(x())

define 'rand', ->makeSyncMonad (env, cont)->
  cont (Math.random())
define 'randInt', ->(low)->(high)->makeSyncMonad (env, cont)->
  cont (Math.floor(low() + Math.random() * high()))
define '^', ->(x)->(y)->Math.pow(x(), y())

############
# STRINGS
############

define '_show', ->(data)->
  if typeof data() in ['string', 'number', 'boolean'] then JSON.stringify data()
  else String(data())
define 'strString', ->(data)-> String(data())
define '_strAsc', ->(str)-> str().charCodeAt(0)
define '_strChr', ->(i)-> String.fromCharCode(i())
define '_strAt', ->(str)->(index)-> str()[strCoord(str(), index())]
define '_strStartsWith', ->(str)->(prefix)-> booleanFor str().substring(0, prefix().length) == prefix()
define '_strLen', ->(str)-> str().length
define '_strToLowerCase', ->(str)-> str().toLowerCase()
define '_strToUpperCase', ->(str)-> str().toUpperCase()
define '_strReplace', ->(str)->(pat)->(repl)-> str().replace pat(), repl()
strCoord = (str, coord)-> if coord < 0 then str.length + coord else coord
define '_strSubstring', ->(str)->(start)->(end)->
  a = strCoord(str(), start())
  b = strCoord(str(), end())
  if b < a && end() == 0 then b = str().length
  str().substring a, b
define '_strSplit', ->(str)->(pat)-> consFrom str().split if pat() instanceof RegExp then pat() else new RegExp pat()
define '_strCat', ->(list)-> _.map(list().toArray(), (el)-> if typeof el == 'string' then el else L_show()(->el)).join('')
define '_strAdd', ->(s1)->(s2)-> s1() + s2()
define '_strMatch', ->(str)->(pat)->
  m = str().match (if pat() instanceof RegExp then pat() else new RegExp pat())
  if m
    groups = []
    pos = 1
    while m[pos]
      groups.push m[pos++]
    if typeof m.index != 'undefined' then consFrom [m[0], consFrom(groups), m.index, m.input]
    else consFrom [m[0], consFrom(groups)]
  else Nil
define '_strToList', ->(str)-> strToList str()
strToList = (str)-> if str == '' then Nil else cons str[0], strToList str.substring 1
define '_strFromList', ->(list)-> strFromList list()
strFromList = (list)-> if list instanceof Leisure_nil then '' else head(list) + strFromList(tail list)
define '_regexp', ->(str)-> new RegExp str()
define '_regexpFlags', ->(str)->(flags)-> new RegExp str(), flags()
define '_jsonParse', ->(str)->(failCont)->(successCont)->
  try
    p = JSON.parse str()
    successCont() ->p
  catch err
    failCont() ->err
define 'jsonStringify', ->(obj)->(failCont)->(successCont)->
  try
    s = JSON.stringify obj()
    successCont() ->s
  catch err
    failCont() ->err

############
# properties
############

define 'getProperties', ->(func)-> if func()?.properties then L_some()(->func().properties) else L_none()

############
# Diagnostics
############

define 'log', ->(str)->(res)->
  console.log String(str())
  res()

############
# IO Monads
############

# Make a new function and hide func and binding in properties on it
# making them inaccessible to pure Leisure code
# so people won't accidentally fire off side effects
makeMonad = (guts)->
  m = ->
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
    console.log "ERR: #{err.stack}"
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
  if cont then contStack.push cont
  try
    while true
      if isMonad monad
        if monad.binding
          contStack.push ((bnd)->(x)->bnd(->x))(monad.binding())
          monad = monad.monad()
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
      monad = contStack.pop()(result)
  catch err
    err = replaceErr err, "\nERROR RUNNING MONAD, MONAD: #{monad}, ENV: #{env}...\n#{err.message}"
    console.log err.stack
    if env.errorHandlers.length then env.errorHandlers.pop() err

class Monad
  toString: -> "Monad: #{@cmd.toString()}"

global.L_runMonads = (monadArray)->
  #console.log "RUNNING MONADS"
  monadArray.reverse()
  newRunMonad 0, defaultEnv, null, monadArray

define 'define', ->(name)->(arity)->(src)->(def)->
  makeSyncMonad (env, cont)->
    define name(), def, arity(), src()
    cont L_true ? _true

define 'bind', ->(m)->(binding)->
  bindMonad = makeMonad (env, cont)->
  bindMonad.monad = m
  bindMonad.binding = binding
  bindMonad

values = {}

#
# Error handling
#
define 'protect', ->(value)->
  makeMonad (env, cont)->
    hnd = (err)->
      console.log "PROTECTED ERROR: #{err.stack}"
      cont left err.stack
    env.errorHandlers.push hnd
    runMonad value(), env, ((result)->
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

define 'actor', ->(name)->(func)->
  actors[name] = func
  func.env = values: {}
  func.env.__proto__ = defaultEnv

define 'send', ->(name)->(msg)-> setTimeout (-> runMonad (actors[name]()(msg)), actors[name]().env), 1

define 'hasValue', ->(name)->
  makeSyncMonad (env, cont)->
    cont booleanFor values[name()]?

define 'getValueOr', ->(name)->(defaultValue)->
  makeSyncMonad (env, cont)->
    cont(values[name()] ? defaultValue())

define 'getValue', ->(name)->
  makeSyncMonad (env, cont)->
    if !(name() of values) then throw new Error "No value named '#{name()}'"
    cont values[name()]

define 'setValue', ->(name)->(value)->
  makeSyncMonad (env, cont)->
    values[name()] = value()
    cont _true

define 'deleteValue', ->(name)->
  makeSyncMonad (env, cont)->
    delete values[name()]
    cont _true

setValue = (key, value)-> values[key] = value

getValue = (key)-> values[key]

define 'envHas', ->(name)->
  makeSyncMonad (env, cont)->
    cont booleanFor env.values[name()]?

define 'envGetOr', ->(name)->(defaultValue)->
  makeSyncMonad (env, cont)->
    cont(env.values[name()] ? defaultValue())

define 'envGet', ->(name)->
  makeSyncMonad (env, cont)->
    if !(name() of env.values) then throw new Error "No value named '#{name()}'"
    cont env.values[name()]

define 'envSet', ->(name)->(value)->
  makeSyncMonad (env, cont)->
    env.values[name()] = value()
    cont _true

define 'envDelete', ->(name)->
  makeSyncMonad (env, cont)->
    delete env.values[name()]
    cont _true

define 'createS', ->
  makeSyncMonad (env, cont)->
    cont _true

define 'getS', ->(state)->
  makeSyncMonad (env, cont)->
    cont state().value

define 'setS', ->(state)->(value)->
  makeSyncMonad (env, cont)->
    state().value = value()
    cont _true

setValue 'macros', Nil

define 'defMacro', ->(name)->(def)->
  makeSyncMonad (env, cont)->
    values.macros = cons cons(name(), def()), values.macros
    cont _true

define 'funcs', ->
  makeSyncMonad (env, cont)->
    console.log "Leisure functions:\n#{_(global.leisureFuncNames.toArray()).sort().join '\n'}"
    cont _true

define 'funcSrc', ->(func)->
  if typeof func() == 'function' && func().src then some func().src else none

define 'ast2Json', ->(ast)-> JSON.stringify ast2Json ast()

define 'override', ->(name)->(newFunc)->
  makeSyncMonad (env, cont)->
    n = "L_#{nameSub name()}"
    oldDef = global[n]
    if !oldDef then throw new Error("No definition for #{name()}")
    global[n] = -> newFunc()(oldDef)
    cont _true

#######################
# IO
#######################

define 'print', ->(msg)->
  makeSyncMonad (env, cont)->
    m = msg()
    #env.write("#{if typeof m == 'string' then m else Parse.print(m)}\n")
    env.write ("#{env.presentValue m}\n")
    cont _true

define 'write', ->(msg)->
  makeSyncMonad (env, cont)->
    env.write env.presentValue msg()
    cont _true

define 'readFile', ->(name)->
  makeMonad (env, cont)->
    readFile name(), (err, contents)->
      cont (if err then left err.stack else right contents)

define 'readDir', ->(dir)->
  makeMonad (env, cont)->
    readDir dir(), (err, files)->
      cont (if err then left err.stack else right files)

define 'writeFile', ->(name)->(data)->
  makeMonad (env, cont)->
    writeFile name(), data(), (err, contents)->
      cont (if err then left err.stack else right contents)

define 'statFile', ->(file)->
  makeMonad (env, cont)->
    statFile file(), (err, stats)->
      cont (if err then left err.stack else right stats)

define 'prompt', ->(msg)->
  makeMonad (env, cont)->
    env.prompt(String(msg()), (input)-> cont(input))

define 'rand', ->
  makeSyncMonad (env, cont)->
    cont(Math.random())

define 'js', ->(str)->
  makeSyncMonad (env, cont)->
    try
      result = eval str()
      cont right result
    catch err
      cont left err

define 'delay', ->(timeout)->
  makeMonad (env, cont)->
    setTimeout (-> cont _true), timeout()

################
# Function alts
################

define 'altDef', ->(name)->(alt)->(arity)->(def)->
  makeMonad (env, cont)->
    info = functionInfo[name()]
    if !info then info = functionInfo[name()] =
      src: ''
      arity: -1
      alts: {}
      altList: []
    if !info.alts[alt()] then info.altList.push alt()
    info.alts[alt()] = def
    #console.log "ALT LIST: #{info.altList.join ', '}"
    alts = (info.alts[i] for i in info.altList)
    newDef = curry arity(), (args)->
      #console.log "CALLED #{name()} with #{args.length} args #{_.map(args, (a)->a()).join ', '}, #{alts.length} alts: #{alts.join ', '}"
      for alt in alts
        #console.log "TRYING ALT: #{alt}"
        opt = alt()
        for arg in args
          #console.log "SENDING ARG: #{arg()} TO OPT: #{opt}"
          opt = opt arg
        #console.log "OPT TYPE: #{getType opt}, OPT: #{opt}"
        if getType(opt) == 'some' then return opt(->(x)->x())(->_false)
      if info.mainDef
        res = info.mainDef()
        for arg in args
          res = res arg
        return res
      throw new Error "No default definition for #{name()}"
    nm = "L_#{nameSub name()}"
    global[nm] = global.leisureFuncNames[nm] = newDef
    cont def

curry = (arity, func)-> ->subcurry arity, func, []

subcurry = (arity, func, args)->
  (arg)->
    #console.log "Got arg # #{arity}: #{arg()}"
    args = args ? []
    args.push arg
    if arity == 1 then func(args) else subcurry arity - 1, func, args

#######################
# AMTs
#######################

makeHamt = (hamt)->
  t = setDataType (->), 'hamt'
  t.hamt = hamt
  t.type = 'hamt'
  t

hamt = makeHamt amt.Trie()

define 'hamt', -> hamt

define 'hamtWith', ->(key)->(value)->(hamt)-> makeHamt amt.assoc hamt().hamt, key(), value()

define 'hamtFetch', ->(key)->(hamt)-> amt.get hamt().hamt, key()

define 'hamtGet', ->(key)->(hamt)->
  v = amt.get hamt().hamt, key()
  if v != undefined then some v else none

define 'hamtWithout', ->(key)->(hamt)-> makeHamt amt.dissoc hamt().hamt, key()

#define 'hamtOpts', ->(eq)->(hash)->
#
#define 'hamtAssocOpts', ->(hamt)->(key)->(value)->(opts)-> amt.assoc(hamt(), key(), value(), opts())
#
#define 'hamtFetchOpts', ->(hamt)->(key)->(opts)-> amt.get(hamt(), key(), opts())
#
#define 'hamtGetOpts', ->(hamt)->(key)->(opts)->
#  v = amt.get(hamt(), key(), opts())
#  if v != null then some v else none
#
#define 'hamtDissocOpts', ->(hamt)->(key)->(opts)-> amt.dissoc(hamt(), key(), opts())

define 'hamtPairs', ->(hamt)-> nextNode L_cons()(->hamt().hamt)(->L_nil())

nextNode = (stack)->
  while true
    if stack == L_nil() then return stack
    node = L_head()(->stack)
    stack = L_tail()(->stack)
    switch node.type
      when 'trie'
        for k, child of node.children
          do (c = child, s = stack)-> stack = L_cons()(->c)(->s)
      when 'value' then return L_acons()(->node.key)(->node.value)(->nextNode stack)
      when 'hashmap'
        for key, value of node.values
          do (v = value, s = stack)-> stack = L_cons()(->v)(->s)
      else console.log "UNKNOWN HAMT NODE TYPE: #{node.type}"

#######################
# Classes for Printing
#######################

ensureLeisureClass 'token'
Leisure_token.prototype.toString = -> "Token(#{JSON.stringify(tokenString(@))}, #{tokenPos(@)})"

tokenString = (t)-> t(->(txt)->(pos)-> txt())
tokenPos = (t)-> t(->(txt)->(pos)-> pos())

ensureLeisureClass 'parens'
Leisure_parens.prototype.toString = -> "Parens(#{parensStart @}, #{parensEnd @}, #{parensContent @})"

parensStart = (p)-> p(->(s)->(e)->(l)-> s())
parensEnd = (p)-> p(->(s)->(e)->(l)-> e())
parensContent = (p)-> p(->(s)->(e)->(l)-> l())

ensureLeisureClass 'true'
Leisure_true.prototype.toString = -> "true"

ensureLeisureClass 'false'
Leisure_false.prototype.toString = -> "false"

ensureLeisureClass 'left'
Leisure_left.prototype.toString = -> "Left(#{@(->_identity)(->_identity)})"

ensureLeisureClass 'right'
Leisure_right.prototype.toString = -> "Right(#{@(->_identity)(->_identity)})"

#######################
# Exports
#######################

root._true = _true
root._false = _false
root.stateValues = values
root.runMonad = runMonad
root.newRunMonad = newRunMonad
root.isMonad = isMonad
root.identity = identity
root.setValue = setValue
root.getValue = getValue
root.makeMonad = makeMonad
root.makeSyncMonad = makeSyncMonad
root.replaceErr = replaceErr
root.left = left
root.right = right
root.getMonadSyncMode = getMonadSyncMode
root.asyncMonad = asyncMonad
root.setWarnAsync = setWarnAsync
root.call = call
root.callMonad = callMonad
root.basicCall = basicCall
root.booleanFor = booleanFor
root.newConsFrom = consFrom

if window?
  window.runMonad = runMonad
  window.setType = setType
  window.setDataType = setDataType
  window.defaultEnv = defaultEnv
  window.identity = identity
