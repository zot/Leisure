if window? and (!global? or global == window)
  # running in a browser
  window.global = window
  Lazp = window.Lazp
  output = null
  write = (msg)->
    if !output? then output = document.getElementById('output')
    output.innerHTML += "#{msg}"
  prompt = (msg, func)-> func(window.prompt(msg))
  root = {}
else
  # running in node
  root = exports ? this
  Lazp = require('./lazp')
  RL = require('readline')
  tty = null
  write = (msg)-> tty.write(msg)
  prompt = (msg, func)-> tty.question(msg, func)

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

makeMonad = (binding, func)->
  func.type = 'monad'
  func.binding = binding
  func

define 'end', makeMonad null, (cont)->cont(null)

define 'return', (v, binding)->
  makeMonad binding(), (cont) -> cont(v())

define 'print', (msg)->(binding)->
  makeMonad binding(), (cont)->
    #console.log(msg())
    write("#{msg()}\n")
    cont(null)

define 'prompt', (msg)->(binding)->
  makeMonad binding(), (cont)->
    #console.log("PROMPTING: #{msg()}")
    #cont(null)
    prompt(String(msg()), (input)-> cont(input))

root.setTty = setTty
