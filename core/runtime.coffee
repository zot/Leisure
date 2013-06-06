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

root = module.exports = require './base'
{
  define,
  consFrom,
  cons,
  Nil,
  head,
  tail,
  getType,
  getDataType,
} = require './ast'
_ = require('./lodash.min')

############
# LOGIC
############

identity = (x)-> x
_true = (a)->(b)->a()
_false = (a)->(b)->b()
booleanFor = (bool)-> if bool then _true else _false
define 'eq', ->(a)->(b)-> booleanFor a() == b()
define 'hasType', ->(data)->(func)-> booleanFor getType(data()) == getDataType(func())

############
# MATH
############

define '+', ->(x)->(y)->x() + y()
define '-', ->(x)->(y)->x() - y()
define '*', ->(x)->(y)->x() * y()
define '/', ->(x)->(y)->x() / y()
define 'lt', ->(x)->(y)->booleanFor x() < y()
define 'le', ->(x)->(y)->booleanFor x() <= y()
define 'gt', ->(x)->(y)->booleanFor x() > y()
define 'ge', ->(x)->(y)->booleanFor x() >= y()

############
# STRINGS
############

define 'strAt', ->(str)->(index)-> str()[index()]
define 'strStartsWith', ->(str)->(prefix)-> booleanFor str().substring(0, prefix().length) == prefix()
define 'strLen', ->(str)-> str().length
define 'strSubstring', ->(str)->(start)->(end)->
  str().substring start(), (if end() < 1 then str().length + end() else end())
define 'strSplit', ->(str)->(pat)-> consFrom str().split if pat() instanceof RegExp then pat() else new RegExp pat()
define 'strCat', ->(list)-> list().toArray().join('')
define 'strMatch', ->(str)->(pat)->
  m = str().match if pat() instanceof RegExp then pat() else new RegExp pat()
  if m
    groups = []
    pos = 1
    while m[1]
      groups.push m[pos++]
    consFrom [m[0], groups, m.index, m.input]
  else Nil
define 'strToList', ->(str)-> strToList str()
strToList = (str)-> if str == '' then Nil else cons str[0], strToList str.substring 1
define 'strFromList', ->(list)-> strFromList list()
strFromList = (list)-> if list instanceof Leisure_nil then '' else head(list) + strFromList(tail list)
define 'regexp', ->(str)-> new RegExp str()
define 'jsonParse', ->(str)->(failCont)->(successCont)->
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
# Diagnostics
############

define 'log', (str)->(res)->
  console.log str()
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

nextMonad = (cont)-> cont

runMonad = (monad, env, cont)->
  try
    if monad.cmd? then monad.cmd(env, nextMonad(cont))
    else cont(monad)
  catch err
    console.log "ERROR RUNNING MONAD: #{err.stack}"

class Monad
  andThen: (func)-> makeMonad (env, cont)=> runMonad @, env, (value)-> runMonad (codeMonad func), env, cont
  toString: -> "Monad: #{@cmd.toString()}"

codeMonad = (code)->
  makeMonad (env, cont)->
    result = code env
    if result instanceof Monad then runMonad result, env, cont
    else cont _false

define 'define', ->(name)->(arity)->(src)->(def)->
  makeMonad (enf, cont)->
    define name(), def, arity(), src()
    cont _false

define 'print', ->(msg)->
  makeMonad (env, cont)->
    m = msg()
    env.write("#{if typeof m == 'string' then m else Parse.print(m)}\n")
    cont _false

define 'bind', ->(m)->(binding)->
  makeMonad (env, cont)-> runMonad m(), env, (value)->runMonad binding()(->value), env, cont

values = {}

define 'hasValue', ->(name)->
  makeMonad (env, cont)->
    cont (if values[name()]? then _true else _false)

define 'getValueOr', ->(name)->(defaultValue)->
  makeMonad (env, cont)->
    cont(values[name()] ? defaultValue())

define 'getValue', ->(name)->
  makeMonad (env, cont)->
    cont values[name()]

define 'setValue', ->(name)->(value)->
  makeMonad (env, cont)->
    values[name()] = value()
    cont _false

define 'createS', ->
  makeMonad (env, cont)->
    cont {value: null}

define 'getS', ->(state)->
  makeMonad (env, cont)->
    cont state().value

define 'setS', ->(state)->(value)->
  makeMonad (env, cont)->
    state().value = value()
    cont _false

root.stateValues = values
root.runMonad = runMonad
root.identity = identity
root.defaultEnv =
  write: (str)-> process.stdout.write(str)
