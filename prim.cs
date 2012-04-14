if window? and (!global? or global == window)
  # running in a browser
  window.global = window
  Lazp = window.Lazp
  output = null
  write = (msg)->
    if !output? then output = document.getElementById('output')
    output.innerHTML += "#{msg}"
  prompt = (msg, cont)-> cont(window.prompt(msg))
  window.Prim = root = {}
else
  # running in node
  root = exports ? this
  Lazp = require('./lazp')
  Pretty = require('./pretty')
  U = require('util')
  RL = require('readline')
  tty = null
  write = (msg)-> process.stdout.write(msg)
  prompt = (msg, cont)-> tty.question(msg, cont)

setTty = (rl)-> tty = rl

define = Lazp.define
getType = Lazp.getType
laz = Lazp.laz

define 'is', (value)-> (type)-> if value()?.type == type().dataType then `_true()` else `_false()`
define 'eq', (a)-> (b)-> if a() == b() then `_true()` else` _false()`
define 'withType', (value)->(t)->(f)-> if type = getType(value()) then t()(->type) else f()
define 'parse', (value)->
  [prepped, err] = Lazp.prepare String(value())
  if err? then _right()(laz("Error: #{err}"))
  else
    [ast, err, rest] = Lazp.parseFull(prepped)
    if err? then _right()(laz("Error: #{err}"))
    else if rest?.trim() then _right()(laz("Error, input left after parsing: '#{rest.trim()}'"))
    else _left()(laz(Pretty.print(ast)))

define '+', (a)->(b)->a() + b()
define '-', (a)->(b)->a() - b()
define '*', (a)->(b)->a() * b()
define '/', (a)->(b)->a() / b()
define '%', (a)->(b)->a() % b()

define '>', (a)->(b)->if a() > b() then `_true()` else `_false()`
define '>=', (a)->(b)->if a() >= b() then `_true()` else `_false()`
define '<', (a)->(b)->if a() < b() then `_true()` else `_false()`
define '<=', (a)->(b)->if a() <= b() then `_true()` else `_false()`

###
define '++', (a)->a() + 1
define '--', (a)->a() - 1
define 'iszero', (a)-> if 0 == a() then `_true()` else` _false()`

define 'randInt', (from)->(to)-> Math.floor(Math.random() * (to() - from() + 1)) + from();
###

runMonad = (monad, cont)->
  monad.cmd (value) ->
    if monad.binding? then runMonad monad.binding(-> value), cont
    else cont(value)

# Make a new function and hide func and binding in properties on it
# making them inaccessible to pure Lazp code
# so people won't accidentally fire off side effects
makeMonad = (binding, guts)->
  m = ->
  m.cmd = guts
  m.type = 'monad'
  if binding != "end" then m.binding = binding
  m

define 'end', "end"

define 'ret', (v)->
  makeMonad 'end', (cont)->cont(v())

define 'pr', (msg)->
  makeMonad 'end', (cont)->
    write("#{msg()}\n")
    cont(_false)

define 'bind', (m)->(binding)->
  makeMonad binding(), (cont)-> runMonad m(), cont

define 'return', (v)->(binding)->
  makeMonad binding(), (cont) -> cont(v())

define 'print', (msg)->(binding)->
  makeMonad binding(), (cont)->
    write("#{msg()}\n")
    cont(_false)

define 'prompt', (msg)->(binding)->
  makeMonad binding(), (cont)->
    prompt(String(msg()), (input)-> cont(input))

head = (l)->l ->(hh)->(tt)->hh()
tail = (l)->l ->(hh)->(tt)->tt()

concatList = (l)->
  if l == _nil() then ""
  else (head l) + concatList tail l

define 'concat', (l)-> concatList(l())

define 'js', (codeList)->(binding)->
  makeMonad binding(), (cont)->
    cl = codeList()
    if cl != _nil() && cl.type != 'cons' then throw new Error("js expects a list for its code")
    cont(eval(concatList(cl)))

define 'createS', (binding)->
  makeMonad binding(), (cont)->
    cont {value: null}

define 'getS', (state)->(binding)->
  makeMonad binding(), (cont)->
    cont state().value

define 'setS', (state)->(value)->(binding)->
  makeMonad binding(), (cont)->
    state().value = value()
    cont(_false)

root.setTty = setTty
root.runMonad = runMonad
root.makeMonad = makeMonad
root.tokenDefs = []
