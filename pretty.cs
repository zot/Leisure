if window? and (!global? or global == window)
  window.global = window
  window.Pretty = root = {}
  Leisure = window.Leisure
else root = exports ? this

if !Leisure? and require?
  Leisure = require('./leisure')
  U = require('util')

getType = Leisure.getType
inspect = U?.inspect || (v)->v

listDo = (l, f)-> l(->(h)->(t)->f(h(), t()))

print = (f)->
  if !f? then "UNDEFINED"
  else if f == null then 'NULL'
  else switch getType(f)
    when 'lit', 'ref', 'lambda', 'apply' then "AST(#{subprint f})"
    else subprint f

subprint = (f)->
  if !f? then "UNDEFINED"
  else if f == null then 'NULL'
  else switch getType(f)
    when 'cons' then "[#{elements(f, true)}]"
    when 'nil' then "[]"
    when 'ioMonad' then "IO"
    when 'lit' then f ->(v)->v()
    when 'ref' then f ->(v)->v()
    when 'lambda' then f ->(v)->(bod)-> "\\#{printLambda v(), bod()}"
    when 'apply' then f ->(func)->(arg)-> printApply(func(), arg())
    when 'some' then f(->(v)-> "Some(#{print v()})")(null)
    when 'some2' then f(->(a)->(b)-> "Some2(#{print a()}, #{print b()})")(null)
    when 'left' then f(->(l)-> "Left(#{print l()})")(null)
    when 'right' then f(null)(->(r)-> "Right(#{print r()})")
    when 'html' then f ->(txt)-> "HTML(#{txt()})"
    when 'svg-node' then f ->(txt)-> "SVG NODE(#{txt()})"
    else f?.leisureName ? inspect(f)

printLambda = (v, body)->
  if body.type == 'lambda' then body ->(v2)->(b)-> "#{v} #{printLambda v2(), b()}"
  else "#{v} . #{subprint(body)}"

printApply = (func, arg)->
  f = if func.type == 'lambda' then "(#{subprint func})" else subprint(func)
  a = if arg.type == 'apply' then "(#{subprint arg})" else subprint(arg)
  "#{f} #{a}"

elements = (l, first, nosubs)->
  if getType(l) == 'nil' then ''
  else if getType(l) != 'cons' then " | #{print(l)}"
  else "#{if first then '' else ', '}#{listDo l, (h, t)-> print(h) + elements(t, false)}"

root.print = print
