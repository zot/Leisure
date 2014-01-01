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
  SimpyCons,
  simpyCons,
  resolve,
  lazy,
  nsLog,
  funcInfo,
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
rz = resolve
lz = lazy

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
_true = setType ((a)->(b)->rz a), 'true'
_false = setType ((a)->(b)->rz b), 'false'
left = (x)-> setType ((lCase)->(rCase)-> rz(lCase)(lz x)), 'left'
right = (x)-> setType ((lCase)->(rCase)-> rz(rCase)(lz x)), 'right'
some = (x)-> setType ((someCase)->(noneCase)-> rz(someCase)(lz x)), 'some'
none = setType ((someCase)->(noneCase)-> rz(noneCase)), 'none'
booleanFor = (bool)-> if bool then rz L_true else rz L_false
define 'eq', lz (a)->$F(arguments, (b)-> booleanFor rz(a) == rz(b))
define '==', lz (a)->$F(arguments, (b)-> booleanFor rz(a) == rz(b))
define 'hasType', lz (data)->$F(arguments, (func)->
  if typeof rz(func) == 'string' then booleanFor getType(rz(data)) == rz(func)
  else booleanFor getType(rz data) == getDataType(rz func))
define 'getDataType', lz (func)-> if typeof rz(func) == 'string' then rz(func) else getDataType(rz(func))
define 'assert', lz (bool)->$F(arguments, (msg)-> $F(arguments, (expr)-> rz(bool)(expr)(-> throw new Error(rz msg))))
define 'assertLog', lz (bool)->$F(arguments, (msg)-> $F(arguments, (expr)-> rz(bool)(expr)(->
  console.log new Error(rz msg).stack
  console.log "LOGGED ERROR -- RESUMING EXECUTION..."
  rz expr)))
define 'trace', lz (msg)->
  console.log "STACKTRACE: ", new Error(rz msg).stack
  msg

############
# MATH
############

define '+', lz (x)->$F(arguments, (y)->rz(x) + rz(y))
define '-', lz (x)->$F(arguments, (y)->rz(x) - rz(y))
define '*', lz (x)->$F(arguments, (y)->rz(x) * rz(y))
define '/', lz (x)->$F(arguments, (y)->rz(x) / rz(y))
define '%', lz (x)->$F(arguments, (y)->rz(x) % rz(y))
define '<', lz (x)->$F(arguments, (y)->booleanFor rz(x) < rz(y))
define '<=', lz (x)->$F(arguments, (y)->booleanFor rz(x) <= rz(y))
define '>', lz (x)->$F(arguments, (y)->booleanFor rz(x) > rz(y))
define '>=', lz (x)->$F(arguments, (y)->booleanFor rz(x) >= rz(y))
define 'floor', lz (x)-> Math.floor(rz x)
define 'ceil', lz (x)-> Math.ceil(rz x)
define 'min', lz (x)->$F(arguments, (y)-> Math.min rz(x), rz(y))
define 'max', lz (x)->$F(arguments, (y)-> Math.max rz(x), rz(y))
define 'round', lz (x)-> Math.round(rz x)
define 'abs', lz (x)-> Math.abs(rz x)
define 'sqrt', lz (x)-> Math.sqrt(rz x)

define 'acos', lz (x)-> Math.acos(rz x)
define 'asin', lz (x)-> Math.asin(rz x)
define 'atan', lz (x)-> Math.atan(rz x)
define 'atan2', lz (x)->(y)-> Math.atan2(rz(x), rz(y))
define 'cos', lz (x)-> Math.cos(rz x)
#define 'log', lz (x)-> Math.log(rz x)
define 'sin', lz (x)-> Math.sin(rz x)
define 'tan', lz (x)-> Math.tan(rz x)

define 'rand', -> makeSyncMonad (env, cont)->
  cont (Math.random())
define 'randInt', lz (low)->$F(arguments, (high)->makeSyncMonad (env, cont)->
  cont (Math.floor(rz(low) + Math.random() * rz(high))))
define '^', lz (x)->$F(arguments, (y)->Math.pow(rz(x), rz(y)))

############
# STRINGS
############

define '_show', lz (data)->
  if typeof rz(data) in ['string', 'number', 'boolean'] then JSON.stringify rz data
  else if getType(rz data) == 'err' then rz(L_errMsg)(data)
  else String rz data
define 'strString', lz (data)-> String rz data
define '_strAsc', lz (str)-> rz(str).charCodeAt(0)
define '_strChr', lz (i)-> String.fromCharCode(rz i)
define '_strAt', lz (str)->$F(arguments, (index)-> rz(str)[strCoord(rz(str), rz(index))])
define '_strStartsWith', lz (str)->$F(arguments, (prefix)-> booleanFor rz(str).substring(0, rz(prefix).length) == rz(prefix))
define '_strLen', lz (str)-> rz(str).length
define '_strToLowerCase', lz (str)-> rz(str).toLowerCase()
define '_strToUpperCase', lz (str)-> rz(str).toUpperCase()
define '_strReplace', lz (str)->$F(arguments, (pat)->$F(arguments, (repl)-> rz(str).replace rz(pat), rz(repl)))
strCoord = (str, coord)-> if coord < 0 then str.length + coord else coord
define '_strSubstring', lz (str)->(start)->(end)->
  a = strCoord(rz(str), rz(start))
  b = strCoord(rz(str), rz(end))
  if b < a && rz(end) == 0 then b = rz(str).length
  rz(str).substring a, b
define '_strSplit', lz (str)->$F(arguments, (pat)-> consFrom rz(str).split if rz(pat) instanceof RegExp then rz(pat) else new RegExp rz(pat))
define '_strCat', lz (list)-> _.map(rz(list).toArray(), (el)-> if typeof el == 'string' then el else rz(L_show)(lz el)).join('')
define '_strAdd', lz (s1)->$F(arguments, (s2)-> rz(s1) + rz(s2))
define '_strMatch', lz (str)->$F(arguments, (pat)->
  m = rz(str).match (if rz(pat) instanceof RegExp then rz pat else new RegExp rz pat)
  if m
    groups = []
    pos = 1
    while m[pos]
      groups.push m[pos++]
    if typeof m.index != 'undefined' then consFrom [m[0], consFrom(groups), m.index, m.input]
    else consFrom [m[0], consFrom(groups)]
  else if L_nil then rz L_nil
  else Nil)
define '_strToList', lz (str)-> strToList rz str
strToList = (str)-> if str == '' then Nil else cons str[0], strToList str.substring 1
define '_strFromList', lz (list)-> strFromList rz list
strFromList = (list)-> if list instanceof Leisure_nil then '' else head(list) + strFromList(tail list)
define '_regexp', lz (str)-> new RegExp rz str
define '_regexpFlags', lz (str)->$F(arguments, (flags)-> new RegExp rz(str), rz(flags))
define '_jsonParse', lz (str)->$F(arguments, (failCont)->$F(arguments, (successCont)->
  try
    p = JSON.parse rz str
    rz(successCont) lz p
  catch err
    rz(failCont) lz err))
define 'jsonStringify', lz (obj)->$F(arguments, (failCont)->$F(arguments, (successCont)->
  try
    s = JSON.stringify rz obj
    rz(successCont) lz s
  catch err
    rz(failCont) lz err))

############
# properties
############

define 'getProperties', lz (func)-> if rz(func)?.properties then rz(func).properties else rz L_nil

define 'setProperty', lz (func)-> $F(arguments, lz (name)-> $F(arguments, lz (value)->
  makeSyncMonad (env, cont)->
    f = rz func
    f.properties = rz(L_aconsf)(name)(value)(lz f.properties ? rz(L_nil))
    cont f.properties))

############
# Diagnostics
############

define 'log', lz (str)->(res)->
  console.log String rz str
  rz res

define 'logStack', lz (str)->(res)->
  console.log new Error(rz str).stack
  rz res

# an identity function you can put a breakpoint on
define 'breakpoint', lz (x)->
  rz x

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
  if cont then contStack.push cont
  try
    while true
      if isMonad monad
        if monad.binding
          #contStack.push ((bnd)->(x)->bnd(lz x))(rz monad.binding)
          do (bnd = rz monad.binding)-> contStack.push (x)-> rz(bnd) lz x
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

class Monad
  toString: -> "Monad: #{@cmd.toString()}"

global.L_runMonads = (monadArray)->
  #console.log "RUNNING MONADS"
  monadArray.reverse()
  newRunMonad 0, defaultEnv, null, monadArray
  monadArray

define 'define', lz (name)->(arity)->(src)->(def)->
  makeSyncMonad (env, cont)->
    define rz(name), def, rz(arity), rz(src)
    cont (if L_true? then rz L_true else _true)

define 'bind', lz (m)->(binding)->
  bindMonad = makeMonad (env, cont)->
  bindMonad.monad = m
  bindMonad.binding = binding
  bindMonad

values = {}

#
# Error handling
#
define 'protect', lz (value)->
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

define 'actor', lz (name)->(func)->
  actors[name] = func
  func.env = values: {}
  func.env.__proto__ = defaultEnv

define 'send', lz (name)->(msg)-> setTimeout (-> runMonad (rz(actors[name])(msg)), rz(actors[name]).env), 1

define 'hasValue', lz (name)->
  makeSyncMonad (env, cont)->
    cont booleanFor values[rz name]?

define 'getValueOr', lz (name)->(defaultValue)->
  makeSyncMonad (env, cont)->
    cont(values[rz name] ? rz(defaultValue))

define 'getValue', lz (name)->
  makeSyncMonad (env, cont)->
    if !(rz(name) of values) then throw new Error "No value named '#{rz name}'"
    cont values[rz name]

define 'setValue', lz (name)->(value)->
  makeSyncMonad (env, cont)->
    values[rz name] = rz value
    cont _true

define 'deleteValue', lz (name)->
  makeSyncMonad (env, cont)->
    delete values[rz name]
    cont _true

setValue = (key, value)-> values[key] = value

getValue = (key)-> values[key]

define 'envHas', lz (name)->
  makeSyncMonad (env, cont)->
    cont booleanFor env.values[rz name]?

define 'envGetOr', lz (name)->(defaultValue)->
  makeSyncMonad (env, cont)->
    cont(env.values[rz name] ? rz(defaultValue))

define 'envGet', lz (name)->
  makeSyncMonad (env, cont)->
    if !(rz(name) of env.values) then throw new Error "No value named '#{rz name}'"
    cont env.values[rz name]

define 'envSet', lz (name)->(value)->
  makeSyncMonad (env, cont)->
    env.values[rz name] = rz(value)
    cont _true

define 'envDelete', lz (name)->
  makeSyncMonad (env, cont)->
    delete env.values[rz name]
    cont _true

setValue 'macros', Nil

define 'defMacro', lz (name)->(def)->
  makeSyncMonad (env, cont)->
    values.macros = cons cons(rz(name), rz(def)), values.macros
    cont _true

define 'funcs', lz makeSyncMonad (env, cont)->
  console.log "Leisure functions:\n#{_(global.leisureFuncNames.toArray()).sort().join '\n'}"
  cont _true

define 'funcSrc', lz (func)->
  if typeof rz(func) == 'function'
    info = functionInfo[rz(func).leisureName]
    if info?.src then some info.src else none

define 'ast2Json', lz (ast)-> JSON.stringify ast2Json rz ast

define 'override', lz (name)->(newFunc)->
  makeSyncMonad (env, cont)->
    n = "L_#{nameSub rz name}"
    oldDef = global[n]
    if !oldDef then throw new Error("No definition for #{rz name}")
    global[n] = -> rz(newFunc)(oldDef)
    cont _true

#######################
# IO
#######################

# define 'trace', lz (msg)->
#   makeSyncMonad (env, cont)->
#     cont (root.E = new Error(msg)).stack

define 'print', lz (msg)->
  makeSyncMonad (env, cont)->
    m = rz msg
    #env.write("#{if typeof m == 'string' then m else Parse.print(m)}\n")
    env.write ("#{env.presentValue m}\n")
    cont _true

define 'write', lz (msg)->
  makeSyncMonad (env, cont)->
    env.write env.presentValue rz msg
    cont _true

define 'readFile', lz (name)->
  makeMonad (env, cont)->
    env.readFile rz(name), (err, contents)->
      cont (if err then left err.stack ? err else right contents)

define 'readDir', lz (dir)->
  makeMonad (env, cont)->
    env.readDir rz(dir), (err, files)->
      cont (if err then left err.stack ? err else right files)

define 'writeFile', lz (name)->(data)->
  makeMonad (env, cont)->
    env.writeFile rz(name), rz(data), (err, contents)->
      cont (if err then left err.stack ? err else right contents)

define 'statFile', lz (file)->
  makeMonad (env, cont)->
    env.statFile rz(file), (err, stats)->
      cont (if err then left err.stack ? err else right stats)

define 'prompt', lz (msg)->
  makeMonad (env, cont)->
    env.prompt(String(rz msg), (input)-> cont(input))

define 'rand', lz makeSyncMonad (env, cont)->
  cont(Math.random())

define 'js', lz (str)->
  makeSyncMonad (env, cont)->
    try
      result = eval rz str
      cont right result
    catch err
      cont left err

define 'delay', lz (timeout)->
  makeMonad (env, cont)->
    setTimeout (-> cont _true), rz(timeout)

##################
# Function advice
##################

# later advice overrides earlier advice
define 'advise', lz (name)->(alt)->(arity)->(def)->
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

define 'escapeHtml', lz (h)-> escapePresentationHtml rz(h)
define 'unescapeHtml', lz (h)-> unescapePresentationHtml rz(h)

#######################
# AMTs
#######################

makeHamt = (hamt)->
  t = setDataType (->), 'hamt'
  t.hamt = hamt
  t.type = 'hamt'
  t

hamt = makeHamt amt.Trie()

define 'hamt', lz  hamt

define 'hamtWith', lz (key)->(value)->(hamt)-> makeHamt amt.assoc rz(hamt).hamt, rz(key), rz(value)

define 'hamtFetch', lz (key)->(hamt)-> amt.get rz(hamt).hamt, rz(key)

define 'hamtGet', lz (key)->(hamt)->
  v = amt.get rz(hamt).hamt, rz(key)
  if v != undefined then some v else none

define 'hamtWithout', lz (key)->(hamt)-> makeHamt amt.dissoc rz(hamt).hamt, rz(key)

#define 'hamtOpts', lz (eq)->(hash)->
#
#define 'hamtAssocOpts', lz (hamt)->(key)->(value)->(opts)-> amt.assoc(rz(hamt), rz(key), rz(value), rz(opts))
#
#define 'hamtFetchOpts', lz (hamt)->(key)->(opts)-> amt.get(rz(hamt), rz(key), rz(opts))
#
#define 'hamtGetOpts', lz (hamt)->(key)->(opts)->
#  v = amt.get(rz(hamt), rz(key), rz(opts))
#  if v != null then some v else none
#
#define 'hamtDissocOpts', lz (hamt)->(key)->(opts)-> amt.dissoc(rz(hamt), rz(key), rz(opts))

define 'hamtPairs', lz (hamt)-> nextNode simpyCons rz(hamt).hamt, null

nextNode = (stack)->
  if stack == null then return rz L_nil
  node = stack.head
  stack = stack.tail
  switch node.type
    when 'trie'
      for k, child of node.children
        stack = simpyCons child, stack
      return nextNode stack
    when 'value' then return rz(L_acons)(lz node.key)(lz node.value)(->nextNode stack)
    when 'hashmap'
      for key, value of node.values
        stack = simpyCons value, stack
      return nextNode stack
    else console.log "UNKNOWN HAMT NODE TYPE: #{node.type}"

#######################
# Trampolines
#######################

define 'trampolineCall', lz (func)->
  ret = rz func
  while true
    if typeof ret == 'function' && ret.trampoline then ret = ret() else return ret

define 'trampoline', lz (func)->
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

define 'setNameSpace', lz (name)->
  makeSyncMonad (env, cont)->
    root.currentNameSpace = rz name
    newNameSpace = false
    if name
      newNameSpace = !LeisureNameSpaces[name]
      if newNameSpace then LeisureNameSpaces[name] = {}
      nsLog "SETTING NAME SPACE: #{name}"
    cont (if newNameSpace then _true else _false)

define 'pushNameSpace', lz (newNameSpace)->
  makeSyncMonad (env, cont)->
    pushed = LeisureNameSpaces[newNameSpace] && ! (newNameSpace in root.nameSpacePath)
    if pushed then root.nameSpacePath.push newNameSpace
    cont (if pushed then _true else _false)

define 'clearNameSpacePath', lz makeSyncMonad (env, cont)->
  root.nameSpacePath = []
  cont _true

define 'resetNameSpaceInfo', lz makeSyncMonad (enf, cont)->
  old = [root.nameSpacePath, root.currentNameSpace]
  root.nameSpacePath = ['core']
  root.currentNameSpace = null
  nsLog "SETTING NAME SPACE: null"
  cont old

define 'setNameSpaceInfo', lz (info)->
  makeSyncMonad (env, cont)->
    #console.log "RESTORING NAME SPACE INFO: #{require('util').inspect rz info}"
    [root.nameSpacePath, root.currentNameSpace] = rz info
    nsLog "SETTING NAME SPACE: #{root.currentNameSpace}"
    cont _true

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

define 'funcInfo', lz (f)-> funcInfo rz f

define 'funcName', lz (f)-> if rz(f).leisureName then some rz(f).leisureName else none

define 'trackCreation', lz (flag)->
  makeSyncMonad (env, cont)->
    root.trackCreation = rz(flag)(lz true)(lz false)
    cont _true

define 'trackVars', lz (flag)->
  makeSyncMonad (env, cont)->
    root.trackVars = rz(flag)(lz true)(lz false)
    cont _true

define 'getFunction', lz (name)->
  f = rz global['L_' + (nameSub rz name)]
  if f then some f else none

#######################
# Exports
#######################

root.requireFiles = requireFiles
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
root.escapePresentationHtml = escapePresentationHtml
root.unescapePresentationHtml = unescapePresentationHtml

if window?
  window.runMonad = runMonad
  window.setType = setType
  window.setDataType = setDataType
  window.defaultEnv = defaultEnv
  window.identity = identity
