defaultEnv = {}

if window?
  # running in a browser
  window.global = window
  output = null
  defaultEnv.write = (msg)->
    if !output? then output = document.getElementById('output')
    if output?
      output.innerHTML += "<span>#{msg}</span>"
      output.lastChild.scrollIntoView()
  defaultEnv.prompt = (msg, cont)-> cont(window.prompt(msg))
  window.Prim = root = {}
  Leisure = window.Leisure
  Parse = window.Parse
else
  # running in node
  root = exports ? this
  Parse = require('./parse')
  Leisure = require('./leisure')
  U = require('util')
  RL = require('readline')
  tty = null
  defaultEnv.write = (msg)-> process.stdout.write(msg)
  defaultEnv.prompt = (msg, cont)-> tty.question(msg, ->
    try
      cont()
    catch err
      console.log "ERROR PRINTING VALUE: #{err.stack}"
  )
  r = (file, cont)->
    if !(file.match /^\.\//) then file = "./#{file}"
    Leisure.req file
    cont(_false())
  defaultEnv.require = r

setTty = (rl)-> tty = rl

define = Parse.define
getType = Parse.getType
throwError = Parse.throwError
laz = Leisure.laz

define 'is', (->(value)-> (type)-> if value()?.type == type().dataType then `_true()` else `_false()`), 2
define 'isFunc', ->(value)->if typeof value() == 'function' then `_true()` else `_false()`
define 'eq', (->(a)-> (b)-> if a() == b() then `_true()` else` _false()`), 2
define 'getType', ->(value)-> if type = getType(value()) then _some()(->type) else _none()
define 'parse', ->(value)->
  [ast, err, rest] = Leisure.parseFull(value())
  if err? then _right()(laz("Error: #{err}"))
  else if rest?.trim() then _right()(laz("Error, input left after parsing: '#{rest.trim()}'"))
  else _left()(laz(ast))
define 'astStart', ->(ast)-> ast().leisureStart
define 'astEnd', ->(ast)-> ast().leisureEnd
define 'pretty', ->(value)->
  #kluge this, for now
  Parse.print(value())
define 'funcName', ->(func)->
  if func.leisureName? then _some()(laz(func.leisureName))
  else _none()
define 'funcSource', ->(func)->
  f = func()
  if f.src? then _some()(laz(f.src))
  else _none()
define 'error', (->(str)-> throw new Error(str())), 1

tmpFalse = (a)->(b)-> b()

define 'defToken', ->(token)->
  makeMonad (env, cont)->
    Parse.defToken token()
    cont tmpFalse
define 'defGroup', ->(open)->(close)->
  makeMonad (env, cont)->
    Parse.defGroup open(), close()
    cont tmpFalse
define 'addParseFilter', (->(filter)->
  makeMonad (env, cont)->
    Parse.defaultScanner.addFilter filter()
    cont tmpFalse), 1
define 'getParseFilterInfo', (->
  makeMonad (env, cont)->
    cont Parse.defaultScanner.filterInfo), 0
define 'setParseFilterInfo', (->(info)->
  makeMonad (env, cont)->
    Parse.defaultScanner.filterInfo = info()
    cont tmpFalse), 1

define '+', ->(a)->(b)->a() + b()
define '-', ->(a)->(b)->a() - b()
define '*', ->(a)->(b)->a() * b()
define '/', ->(a)->(b)->a() / b()
define '%', ->(a)->(b)->a() % b()
define 'floor', ->(a)->Math.floor(a())
define 'ceil', ->(a)->Math.ceil(a())
define 'round', ->(a)->Math.round(a())

define 'randInt', ->(from)->(to)->
  makeMonad (env, cont)->
    cont Math.floor(from() + Math.random() * (to() - from() + 1))

define 'rand', ->
  makeMonad (env, cont)->
    cont (Math.random())

define '>', ->(a)->(b)->if a() > b() then `_true()` else `_false()`
define '<', ->(a)->(b)->if a() < b() then `_true()` else `_false()`
define 'gt', ->(a)->(b)->if a() > b() then `_true()` else `_false()`
define 'gte', ->(a)->(b)->if a() >= b() then `_true()` else `_false()`
define 'lt', ->(a)->(b)->if a() < b() then `_true()` else `_false()`
define 'lte', ->(a)->(b)->if a() <= b() then `_true()` else `_false()`

define 'strlen', ->(a)->a().length

define 'log', ->(msg)->(value)->
  if (msg().type != 'cons') then defaultEnv.write("#{msg()}") else defaultEnv.write(concatList(msg()))
  defaultEnv.write("\n")
  value()
define 'break', ->(value)->
  console.log 'breakpoint'
  value()

leisureEvent = (leisureFuncName, evt, env, channel)->
  currentEvent = evt
  monad = Leisure.eval("#{Parse.nameSub(leisureFuncName)}()")(laz(evt))
  runMonad monad, (env ? defaultEnv), -> (env ? defaultEnv).finishedEvent(evt, channel)

eventCont = []

continueMonad = (cont)->
  eventCont.unshift(cell = [false, null, cont])
  (value)->
    cell[0] = true
    cell[1] = value
    while eventCont.length && eventCont[0][0]
      try
        [ignore, val, cnt] = eventCont.shift()
        cnt(val)
      catch err
        console.log "ERROR RUNNING MONAD: #{err.stack}"

runMonad = (monad, env, cont)->
  try
    if monad.cmd? then monad.cmd(env, continueMonad(cont))
    else cont(monad)
  catch err
    console.log "ERROR RUNNING MONAD: #{err.stack}"

# Make a new function and hide func and binding in properties on it
# making them inaccessible to pure Leisure code
# so people won't accidentally fire off side effects
makeMonad = (guts)->
  m = ->
  m.cmd = guts
  m.type = 'monad'
  m

define 'eventContext', ->(evt)-> evt().leisureContext

define 'eventType', ->(evt)->evt().type

define 'eventX', ->(evt)-> evt().x

define 'eventY', ->(evt)-> evt().y

define 'eventTargetId', ->(evt)-> evt().target.id

define 'eventKeyCode', ->(evt)->
  e = evt()
  e.charCode || e.keyCode || e.which

define 'eventPreventDefault', ->(evt)->
  makeMonad (env, cont)->
    evt().preventDefault()
    cont(`_false()`)

define 'forward', ->(name)->
  makeMonad (env, cont)->
    Leisure.defineForward name
    cont `_false()`

define 'return', ->(v)->
  makeMonad (env, cont)->cont(v())

define 'require', ->(file)->
  makeMonad (env, cont)->
    env.require(file(), cont)

define 'print', ->(msg)->
  makeMonad (env, cont)->
    m = msg()
    env.write("#{if typeof m == 'string' then m else Parse.print(m)}\n")
    cont(`_false()`)

define 'printValue', ->(value)->
  makeMonad (env, cont)->
    if value() != _nil() then env.write("#{env.presentValue value()}\n")
    cont(`_false()`)

define 'prompt', ->(msg)->
  makeMonad (env, cont)->
    env.prompt(String(msg()), (input)-> cont(input))

define 'bind', ->(m)->(binding)->
  makeMonad (env, cont)-> runMonad m(), env, (value)->runMonad binding()(->value), env, cont

head = (l)->l ->(hh)->(tt)->hh()
tail = (l)->l ->(hh)->(tt)->tt()

concatList = (l)->
  if l == _nil() then ""
  else if typeof (head l) == 'string' then (head l) + concatList tail l
  else Parse.print(head l) + concatList tail l

define 'concat', ->(l)-> concatList(l())

define 'js', ->(codeList)->
  makeMonad (env, cont)->
    cl = codeList()
    if cl != _nil() && cl.type != 'cons' then throwError("js expects a list for its code")
    cont(eval(concatList(cl)))

define 'arrayLength', ->(array)-> array().length

define 'arrayElements', ->(array)->(f)->arrayRest array(), 0, f()

arrayRest = (array, index, f)->
  if index < array.length then arrayRest array, index + 1, f(laz(array[index]))
  else f

define 'browser', ->(codeList)->
  makeMonad (env, cont)->
    if window?
      cl = codeList()
      if cl != _nil() && cl.type != 'cons' then throwError("js expects a list for its code")
      cont(eval(concatList(cl)))
    else cont(null)

global.LeisureValues = values = {}

define 'hasValue', ->(name)->
  makeMonad (env, cont)->
    cont (if values[name()]? then _true() else _false())

define 'getValueOr', ->(name)->(defaultValue)->
  makeMonad (env, cont)->
    cont(values[name()] ? defaultValue())

define 'getValue', ->(name)->
  makeMonad (env, cont)->
    cont values[name()]

define 'setValue', ->(name)->(value)->
  makeMonad (env, cont)->
    values[name()] = value()
    cont _false()

define 'createS', ->
  makeMonad (env, cont)->
    cont {value: null}

define 'getS', ->(state)->
  makeMonad (env, cont)->
    cont state().value

define 'setS', ->(state)->(value)->
  makeMonad (env, cont)->
    state().value = value()
    cont(_false())

################
# BROWSER PRIMS
################

define 'svgMeasureText', (->(text)->Notebook?.svgMeasureText(text)), 2
define 'primSvgMeasure', (->(content)->Notebook?.svgMeasure(content)), 1

root.setTty = setTty
root.runMonad = runMonad
root.makeMonad = makeMonad
root.tokenDefs = []
root.leisureEvent = leisureEvent
root.defaultEnv = defaultEnv

if window? then window.leisureEvent = leisureEvent
