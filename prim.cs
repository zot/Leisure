if window? and (!global? or global == window)
  # running in a browser
  window.global = window
  Lazp = window.Lazp
  output = null
  write = (msg)->
    if !output? then output = document.getElementById('output')
    output.innerHTML += "#{msg}"
  prompt = (msg, cont)-> cont(window.prompt(msg))
  root = {}
else
  # running in node
  root = exports ? this
  Lazp = require('./lazp')
  U = require('util')
  RL = require('readline')
  tty = null
  #write = (msg)-> tty.write(msg)
  write = (msg)-> process.stdout.write(msg)
  prompt = (msg, cont)-> tty.question(msg, cont)

setTty = (rl)-> tty = rl

define = Lazp.define
getType = Lazp.getType

define 'is', (value)-> (type)-> if value()?.type == type().dataType then `_true()` else `_false()`
define 'eq', (a)-> (b)-> if a() == b() then `_true()` else` _false()`
define 'withType', (value)->(t)->(f)-> if type = getType(value()) then t()(->type) else f()

define '+', (a)->(b)->a() + b()
define '-', (a)->(b)->a() - b()
define '*', (a)->(b)->a() * b()
define '/', (a)->(b)->a() / b()
define '%', (a)->(b)->a() % b()

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

define 'return', (v)->(binding)->
  makeMonad binding(), (cont) -> cont(v())

define 'print', (msg)->(binding)->
  makeMonad binding(), (cont)->
    write("#{msg()}\n")
    cont(null)

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

root.setTty = setTty
