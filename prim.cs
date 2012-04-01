if window? and (!global? or global == window)
  window.global = window
  Lazp = window.Lazp
else root = exports ? this

if !Lazp? and require?
  Lazp = require('./lazp')

define = Lazp.define

define '+', (a)->(b)->a() + b()
define '-', (a)->(b)->a() - b()
define '*', (a)->(b)->a() * b()
define '/', (a)->(b)->a() / b()
define '%', (a)->(b)->a() % b()
