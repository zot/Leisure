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
  U = require('util')
  RL = require('readline')
  tty = null
  write = (msg)-> process.stdout.write(msg)
  prompt = (msg, cont)-> tty.question(msg, cont)

setTty = (rl)-> tty = rl

define = Lazp.define
getType = Lazp.getType

define 'is', global, (value)-> (type)-> if value()?.type == type().dataType then `_true()` else `_false()`
define 'eq', global, (a)-> (b)-> if a() == b() then `_true()` else` _false()`
define 'withType', global, (value)->(t)->(f)-> if type = getType(value()) then t()(->type) else f()

define '+', global, (a)->(b)->a() + b()
define '-', global, (a)->(b)->a() - b()
define '*', global, (a)->(b)->a() * b()
define '/', global, (a)->(b)->a() / b()
define '%', global, (a)->(b)->a() % b()

define '>', (a)->(b)->a() > b()
define '>=', (a)->(b)->a() >= b()
define '<', (a)->(b)->a() < b()
define '<=', (a)->(b)->a() <= b()

define 'randInt', (from)->(to)-> Math.floor(Math.random() * (to() - from() + 1)) + from();

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

define 'end', global, "end"

define 'bind', global, (m)->(binding)->
  makeMonad binding(), (cont)-> runMonad m(), cont

define 'return', global, (v)->(binding)->
  makeMonad binding(), (cont) -> cont(v())

define 'print', global, (msg)->(binding)->
  makeMonad binding(), (cont)->
    write("#{msg()}\n")
    cont(null)

define 'prompt', global, (msg)->(binding)->
  makeMonad binding(), (cont)->
    prompt(String(msg()), (input)-> cont(input))

head = (l)->l ->(hh)->(tt)->hh()
tail = (l)->l ->(hh)->(tt)->tt()

concatList = (l)->
  if l == _nil() then ""
  else (head l) + concatList tail l

define 'concat', global, (l)-> concatList(l())

define 'js', global, (codeList)->(binding)->
  makeMonad binding(), (cont)->
    cl = codeList()
    if cl != _nil() && cl.type != 'cons' then throw new Error("js expects a list for its code")
    cont(eval(concatList(cl)))

root.setTty = setTty
root.runMonad = runMonad
root.tokenDefs = []
