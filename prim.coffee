defaultEnv =
  handleError: (err, cont)-> console.log err.stack

if window?
  # running in a browser
  window.global = window
  output = null
  defaultEnv.write = (msg)->
    console.log msg
    if !output? then output = document.getElementById 'output'
    if output?
      output.innerHTML += "<span>#{msg}</span>"
      output.lastChild.scrollIntoView()
    else console.log msg
  defaultEnv.prompt = (msg, cont)-> cont window.prompt(msg)
  window.Prim = root = window.Prim ? {}
  Leisure = window.Leisure
  Parse = window.Parse
  Notebook = window.Notebook
  ReplCore = window.ReplCore = window.ReplCore ? {}
  root.URI = URI = window.URI
else
  # running in node
  root = exports ? this
  root.URI = URI = require './uri'
  Parse = require './parse'
  Leisure = require './leisure'
  ReplCore = require './replCore'
  U = require 'util'
  RL = require 'readline'
  tty = null
  fs = require 'fs'
  path = require 'path'
  defaultEnv.write = (msg)-> process.stdout.write(msg)
  defaultEnv.prompt = (msg, cont)-> tty.question(msg, (x)->
    try
      cont x
    catch err
      console.log "ERROR PRINTING VALUE: #{err.stack}"
  )
  r = (file, cont)->
    if !(file.match /^\.\//) then file = "./#{file}"
    result = require file
    if cont then cont(result)
  defaultEnv.require = r

setTty = (rl)-> tty = rl
define = Parse.define
getType = Parse.getType
throwError = Parse.throwError
laz = Leisure.laz

initFileSettings = (env)->
  env.fileSettings =
    parseFilters: {}
  env

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

define 'strlen', ->(s)->s().length

define 'strtake', ->(s)->(count)-> s().substring 0, count()

define 'strdrop', ->(s)->(count)-> s().substring count()

define 'break', ->(value)->
  console.log 'breakpoint'
  value()

agents = {}

agents.io = (old)->(block)-> runMonad block(), Prim.currentEnv ? defaultEnv, ->

define 'primagent', ->(name)->(startValue)->(block)->
  makeMonad (env, cont)->
    agents[name()] = agent = block()
    agent.value = startValue()
    cont(_false())

define 'send', ->(value)->(agentName)->(input)->
  agent = agents[agentName()]
  env = Prim.currentEnv
  setTimeout (->
    try
      oldEnv = Prim.currentEnv
      Prim.currentEnv = env
      val = agent.value
      agent.value = agent(->val)(input)
    finally
      Prim.currentEnv = oldEnv
  ), 1
  value()

leisureEvent = (leisureFuncName, evt, env, channel)->
  currentEvent = evt
  monad = Leisure.eval("#{Parse.nameSub(leisureFuncName)}()")(laz(evt))
  runMonad monad, (env ? defaultEnv), -> (env ? defaultEnv).finishedEvent(evt, channel)

eventCont = []

nextMonadOld = (cont)->
  eventCont.push(cell = [false, null, cont])
  (value)->
    cell[0] = true
    cell[1] = value
    while eventCont.length && eventCont[eventCont.length - 1][0]
      try
        [ignore, val, cnt] = eventCont.pop()
        cnt(val)
      catch err
        console.log "ERROR RUNNING MONAD: #{err.stack}"
    null

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
    else cont _false()

# Make a new function and hide func and binding in properties on it
# making them inaccessible to pure Leisure code
# so people won't accidentally fire off side effects
makeMonad = (guts)->
  m = ->
  m.__proto__ = Monad.prototype
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

define 'dump', ->(file)->
  makeMonad (env, cont)->
    fs.readFile file(), (err, data)->
      console.log (err ? data).toString()
      cont()

define 'fdump', ->(file)->
  makeMonad (env, cont)->
    Notebook.peer.value "peer/local-storage/public/storage#{file()}", null, false, ([x1, x2, x3, x4, x5, data])->
      console.log data.toString()
      cont()

isStorageUri = (uri)-> uri?.scheme in (Notebook?.xusServer?.varStorage.values['leisure/storage'] ? [])

class URIHandler
  constructor: (@label)->
  read: (uri, cont, errHandler, next)-> errHandler new Error "Read not currently supported for #{@label} uris"
  write: (uri, data, cont, errHandler)-> errHandler new Error "Write not currently supported for #{@label} uris"
  basicLink: (uri)->
    u = new URI(document.location.href)
    u.search = null
    u.fragment = "#load=#{uri}"
    u
  link: (uri)-> @basicLink uri

baseHandler = new URIHandler('base')

uriHandlers = {}

newUriHandler = (label, obj)->
  obj.__proto__ = baseHandler
  obj.label = label
  uriHandlers[label] = obj

newUriHandler 'err',
  read: (uri, cont, errHandler, next)-> errHandler new Error "No uri handler for #{uri?.scheme} uris"
  write: (uri, data, cont, errHandler)-> errHandler new Error "No uri handler for #{uri?.scheme} uris"
  link: (uri) -> ''

newUriHandler 'http',
  read: (uri, cont, errHandler, next)->
    if window?
      jQuery.ajax uri.toString(),
        success: (data)-> cont data
        error: -> next()
        dataType: 'text'
    else (http.get uri.toString(), (data)-> loadSource uri, data, cont, errHandler).on 'error', next

localHandler =
  read: (args...)-> installRealLocalHandler -> localHandler.read args...
  write: (args...)-> installRealLocalHandler -> localHandler.write args...

localHandlerConts = []

installRealLocalHandler = (cont)->
  if cont then localHandlerConts.push cont
  console.log "leisure/storage: #{Notebook.xusServer.get 'leisure/storage'}"
  if 'local-storage' in Notebook.xusServer.get 'leisure/storage'
    console.log "Executing local-storage operations"
    localHandler.read = (uri, cont, err, next)->
      console.log "Reading local file: #{uri.path}, using path: peer/local-storage/public/storage#{uri.path}"
      f = "peer/local-storage/public/storage#{uri.path}"
      Notebook.peer.value f, null, false, ([x1, x2, x3, x4, x5, data])->
        console.log "Got data for local file: #{uri.path}: #{data}"
        if data then cont data else next()
    localHandler.write = (uri, data, cont, err, next)-> Notebook.peer.set "peer/local-storage/public/storage#{uri.path}", data.toString()
    for c in localHandlerConts
      c()
    localHandlerConts = null
  else if installRealLocalHandler.length == 1
    console.log "Deferring local-storage operation"
    console.log "Installing local handler"
    installingLocalHandler = true
    window.setTimeout (-> installRealLocalHandler()), 100

newUriHandler 'local', localHandler

newUriHandler 'file',
  read: (uri, cont, err, next)->
    fs.stat uri.path, (e)->
      if e then next()
      else fs.readFile uri.path, (e2, data)->
        if e2 then err e2 else cont data
  write: (uri, data, cont, err)->
    parent = new URI("#{uri}/..").path
    fs.stat parent, (e)->
      if e then err new Error "Parent directory of #{uri} does not exist"
      else fs.writeFile uri.path, data, (e2)->
        if e2 then err e2 else cont()

uriHandlerFor = (uri)-> if isStorageUri uri then uriHandlers.xus else (uri && uriHandlers[uri?.scheme]) ? uriHandlers.err

if window? then uriHandlers.file = new URIHandler 'file'

loadSource = (uri, data, cont, err)->
  try
    if uri.path.match /\.lmd$|\.lsr$/
      ReplCore.compileString uri.path, (uri.path.match /\.lmd$/), data, false, false, false, -> cont null
    else
      cont eval "var module = {exports: {}};\n#{data};\nmodule.exports;"
  catch e
    console.log "ERROR EVALUATING SOURCE FOR #{uri}: \n#{e.stack}\n#{data}"
    global.ERR = e
    err e, cont

read = (uri, cont, err)-> uriHandlerFor(uri).read uri, cont, err, -> err new Error("File not found: #{uri}")

write = (uri, data, cont, err)-> uriHandlerFor(uri).write uri, data, cont ? (->), err ? throwError

linkFor = (uri)-> uriHandlerFor(uri).link(uri)

tryRead = (label, choices, handler, cont, err)->
  if !choices.length then err new Error "No loadable file found for #{label}"
  else handler.read choices[0], ((data)-> cont choices[0], data), err, ->
    tryRead label, choices[1..], handler, cont, err

baseUriPat = /^(.*\/[^/]*)\.[^/.]*$/

sourceChoices = (uri)->
  if m = uri.toString().match baseUriPat then [uri]
  else
    prefix = uri.toString()
    new URI(prefix + ending) for ending in ['.js', '.lmd', '.lsr']

loadFile = (uri, cont, err)->
  tryRead uri, sourceChoices(uri), (uriHandlerFor uri), ((chosenUri, data)->
    loadSource chosenUri, data, cont, err), err

define 'load', ->(file)->
  makeMonad (env, cont)->
    uri = env.fileSettings.uri.relative file()
    fileSettings = env.fileSettings
    initFileSettings env
    env.fileSettings.uri = uri
    newCont = ->
      env.fileSettings = fileSettings
      cont()
    loadFile uri, ((monad)->
      if monad instanceof Monad
        runMonad monad, env, newCont
      else newCont()), (err)->
        console.log "ERROR: #{err.stack}"
        env.fileSettings = fileSettings

requireFile = (uri, cont, err)->
  uString = uri.toString()
  baseUri = if m = uString.match baseUriPat then m[1] else uString
  if !required[baseUri]
    console.log "LOADING #{uri}..."
    required[baseUri] = true
    loadFile uri, cont, err
  else cont()

define 'require', ->(file)->
  makeMonad (env, cont)->
    uri = env.fileSettings.uri.relative file()
    fileSettings = env.fileSettings
    initFileSettings env
    env.fileSettings.uri = uri
    newCont = ->
      env.fileSettings = fileSettings
      cont()
    requireFile uri, ((monad)->
      if monad instanceof Monad
        runMonad monad, env, newCont
      else newCont()), (err)->
        console.log "ERROR: #{err.stack}"
        env.fileSettings = fileSettings

required = {}

loading = (file)->
  file = file.replace /^(.*?)(\.lsr|\.lmd|)$/, '$1'
  if defaultEnv?.fileSettings?.uri then required[defaultEnv.fileSettings.uri.relative(file).toString()] = true

runRequire = (file, cont)->
  if !required["file://#{file}"]
    required["file://#{file}"] = true
    m = require file
    if !(m instanceof Monad) then console.log "REQUIRE #{file} WARNING: RESULT IS NOT A MONAD"
    runMonad m, defaultEnv, -> (cont ? ->)()
  else (cont ? ->)()

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

define 'regexp', ->(s)-> new RegExp(s())

# given a string and either a regexp or a string,
# returns [[match group1 group2 ...] index input]
define 'match', ->(s)->(r)->
  m = s().match r()
  if m
    Parse.cons getMatches(m, 0), Parse.cons(m.index, Parse.cons(m.input, Parse.Nil))
  else Parse.Nil

getMatches = (m, index)->
  if index < m.length then Parse.cons(m[index] ? Parse.Nil, getMatches(m, index + 1)) else Parse.Nil

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

define 'read', ->(uri)->
  makeMonad (env, cont)->
    read new URI(uri()), ((data)-> cont _left()(laz data.toString())), (err)-> cont _right()(laz err.stack.toString())

define 'write', ->(uri)->(data)->
  makeMonad (env, cont)->
    write new URI(uri()), data(), (-> cont _left()(laz "success")), (err)-> cont _right()(laz err.stack.toString())

################
# BROWSER PRIMS
################

define 'svgMeasureText', (->(text)->Notebook?.svgMeasureText(text)), 2
define 'primSvgMeasure', (->(content)->Notebook?.svgMeasure(content)), 1

initFileSettings defaultEnv

root.setTty = setTty
root.runMonad = runMonad
root.makeMonad = makeMonad
root.tokenDefs = []
root.leisureEvent = leisureEvent
root.defaultEnv = defaultEnv
root.codeMonad = codeMonad
root.runRequire = runRequire
root.loading = loading
root.initFileSettings = initFileSettings
root.URI = URI
root.Monad = Monad
root.newUriHandler = newUriHandler
root.read = read
root.write = write
root.linkFor = linkFor

if window? then window.leisureEvent = leisureEvent
