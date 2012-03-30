if window? and (!global? or global == window)
  window.global = window
  window.Pretty = root = {}
  Lazp = window.Lazp
else root = exports ? this

if !Lazp? and require?
  Lazp = require('./lazp')
  U = require('util')

getType = Lazp.getType

listDo = (l, f)-> l(->(h)->(t)->f(h(), t()))

print = (f)->
  if !f? then "UNDEFINED"
  else if f == null then 'NULL'
  else switch getType(f)
    when 'cons' then "[#{elements(f, true)}]"
    when 'nil' then "[]"
    when 'ioMonad' then "IO"
    else U.inspect(f)

elements = (l, first, nosubs)->
  if getType(l) == 'nil' then ''
  else if getType(l) != 'cons' then " . #{print(l)}"
  else "#{if first then '' else ', '}#{listDo l, (h, t)-> print(h) + elements(t, false)}"

root = exports ? this
root.print = print
