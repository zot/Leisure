###
Copyright (C) 2012, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

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

if window? and (!global? or global == window)
  window.global = window
  root = window.Leisure = window.Leisure || {}
else
  root = exports = module.exports = require './base'
  inspect = require('util').inspect # for testing
  _ = require('./lodash.min')


######
###### naming
######

charCodes =
  "'": '$a'
  ',': '$b'
  '$': '$$'
  '@': '$d'
  '?': '$e'
  '/': '$f'
  '*': '$g'
  '&': '$h'
  '^': '$i'
  '!': '$k'
  '`': '$l'
  '~': '$m'
  '-': '$_'
  '+': '$o'
  '=': '$p'
  '|': '$q'
  '[': '$r'
  ']': '$s'
  '{': '$t'
  '}': '$u'
  '"': '$v'
  ':': '$w'
  ';': '$x'
  '<': '$y'
  '>': '$z'
  '%': '$A'
  '.': '$B'

nameSub = (name)->
  s = ''
  for i in [0...name.length]
    code = charCodes[name[i]]
    s += code ? name[i]
  s

######
###### definitions
######

setDataType = (func, dataType)->
  if dataType then func.dataType = dataType
  func

setType = (func, type)->
  if type then func.type = type
  func.__proto__ = (ensureLeisureClass type).prototype
  func

class LeisureObject

global.LeisureObject = LeisureObject

ensureLeisureClass = (leisureClass)->
  cl = "Leisure_#{nameSub leisureClass}"
  if !global[cl]?
    global[cl] = eval "(function #{cl}(){})"
    global[cl].prototype.__proto__ = LeisureObject.prototype
  global[cl]

ensureLeisureClass 'lit'
ensureLeisureClass 'ref'
ensureLeisureClass 'lambda'
ensureLeisureClass 'apply'
ensureLeisureClass 'let'
ensureLeisureClass 'anno'
ensureLeisureClass 'cons'
ensureLeisureClass 'nil'
ensureLeisureClass 'doc'
ensureLeisureClass 'srcLocation'
ensureLeisureClass 'pattern'

#########
######### LISTS
#########

class Leisure_BaseCons extends LeisureObject
  head: -> throw new Error("Not Implemented")
  tail: -> throw new Error("Not Implemented")
  find: (func)-> if func(@head()) then @head() else @tail().find(func)
  removeAll: (func)->
    t = @tail().removeAll(func)
    if func(@head()) then t else if t == @tail() then @ else cons(@head(), t)
  map: (func)-> cons func(@head()), @tail().map func
  foldl: (func, arg)-> @tail().foldl func, func(arg, @head())
  foldl1: (func)-> @tail().foldl func, @head()
  foldr: (func, arg)-> func @head(), @tail().foldr(func, arg)
  foldr1: (func)->
    if @tail() == Nil then @head()
    else func @head(), @tail().foldr1(func)
  toArray: -> @foldl ((i, el)-> i.push(el); i), []
  join: (str)->@toArray().join(str)
  reverse: -> @rev Nil
  rev: (result)-> @tail().rev cons(@head(), result)
  elementString: -> "#{@head()}#{if @tail() == Nil then '' else if @tail() instanceof Leisure_BaseCons then " #{@tail().elementString()}" else " | #{@tail()}"}"
  equals: (other)-> @ == other or (other instanceof Leisure_BaseCons and consEq(@head(), other.head()) and consEq(@tail(), other.tail()))
  each: (block)->
    block(@head())
    @tail().each(block)
  last: ->
    t = @tail()
    if t == Nil then t else t.last()
  append: (l)->cons @head(), @tail().append(l)
  toString: -> "#{@stringName()}[#{@elementString()}]"
  stringName: -> "BaseCons"

consEq = (a, b)-> a == b or (a instanceof Leisure_BaseCons and a.equals(b))

# cons and Nil are Leisure-based so that Leisure code can work with it transparently
# they look like ordinary JS classes, but the cons
class Leisure_cons extends Leisure_BaseCons
  head: -> @ ->(a)->(b)->a()
  tail: -> @ ->(a)->(b)->b()
  stringName: -> "Cons"

global.Leisure_cons = Leisure_cons

class Leisure_nil extends LeisureObject
  find: -> false
  removeAll: -> @
  map: (func)-> Nil
  foldl: (func, arg)-> arg
  foldr: (func, arg)-> arg
  reverse: -> @
  rev: (result)-> result
  equals: (other)-> other instanceof Leisure_nil
  each: ->
  toArray: -> []
  join: -> ''
  append: (l)-> l
  toString: -> "Cons[]"

global.Leisure_nil = Leisure_nil

jsType = (v)->
  t = typeof v
  if t == 'object' then v.constructor || t
  else t

mkProto = (protoFunc, value)->
  value.__proto__ = protoFunc.prototype
  value

throwError = (msg)->
  throw (if msg instanceof Error then msg else new Error(String(msg)))

checkType = (value, type)-> if !(value instanceof type) then throwError("Type error: expected type: #{type}, but got: #{jsType value}")

primCons = setDataType(((a)->(b)-> mkProto Leisure_cons, setType ((f)-> f()(a)(b)), 'cons'), 'cons')
Nil = mkProto Leisure_nil, setType(((a)->(b)->b()), 'nil')
cons = (a, b)-> primCons(->a)(->b)

foldLeft = (func, val, thing)->
  if thing instanceof Leisure_cons then thing.foldl func, val
  else primFoldLeft func, val, thing, 0

primFoldLeft = (func, val, array, index)->
  if index < array.length then primFoldLeft func, func(val, array[index]), array, index + 1
  else val

global.leisureFuncs = {}
global.leisureFuncNames = Nil
leisureAddFunc = global.leisureAddFunc = (nm)-> global.leisureFuncNames = cons(nm, global.leisureFuncNames)
root.evalFunc = evalFunc = eval

# use AST, instead of arity?
define = (name, func, arity, src, method) ->
  func.src = src
  func.leisureContexts = []
  nm = '_' + nameSub(name)
  func.leisureName = name
  func.leisureArity = arity
  if !method and global.noredefs and global[nm]? then throwError("[DEF] Attempt to redefine definition: #{name}")
  global[nm] = global.leisureFuncs[nm] = func
  leisureAddFunc name
  func

# expose cons and lexCons functions to Leisure

define 'cons', (-> primCons), 2, '\\a b f . f a b'
define 'nil', (-> Nil), 0, '\\a b . b'

######
###### Annotation structures
######
###### doc: code documentation
###### srcLocation: source location information
###### pattern: pattern for a lambda
######   like in "length a::nil = 0" -- anno(pattern('nil'), lambda('a', lit(0)))
######

define 'doc', (->setDataType ((_text)->setType ((_f)-> _f()(_text)), 'doc'), 'doc'), 1, '\\t . \\f . f t'
define 'srcLocation', (->setDataType ((_start)->(_len)->setType ((_f)-> _f()(_start)(_len)), 'srcLocation'), 'srcLocation'), 1, '\\start len . \\f . f start len'
define 'pattern', (->setDataType ((_pat)->setType ((_f)-> _f()(_pat)), 'pattern'), 'pattern'), 1, '\\pat . \\f . f pat'

######
###### ASTs
######

# Make an AST for these
# add node numder and source start and end into leisure structure
# make lit, ref, lambda, apply, let, and anno subclasses of AST
#
#   LET syntax: \ x1 = y1 . x2 = y2 . expr
#
# let binds a name to a value in a body
#   the body can be another let node and values can refer to any names in the let bindings

define 'lit', (->setDataType ((_x)->setType ((_f)-> _f()(_x)), 'lit'), 'lit'), 1, '\\t . \\f . f t'
define 'ref', (->setDataType ((_x)->setType ((_f)-> _f()(_x)), 'ref'), 'ref'), 1, '\\v . \\f . f v'
define 'lambda', (->setDataType ((_v)-> (_f)-> setType ((_g)-> _g()(_v)(_f)), 'lambda'), 'lambda'), 2, '\\v f . \\g . f v f'
define 'apply', (->setDataType ((_func)-> (_arg)-> setType ((_f)-> _f()(_func)(_arg)), 'apply'), 'apply'), 2, '\\f a . \\g . g f a'
define 'let', (->setDataType ((_n)-> (_v)-> (_b)-> setType ((_f)-> _f()(_n)(_v)(_b)), 'let'), 'let'), 3, '\\n v b . \\f . f n v b'
define 'anno', (->setDataType ((_data)->(_body)-> setType ((_f)-> _f()(_data)(_body)), 'anno'), 'anno'), 2, '\\d b . \\f . f d b'

getType = (f)->
  t = typeof f
  (t == 'function' and f?.type) or "*#{t}"

save = {}

save.lit = lit = (l)-> _lit()(-> l)
save.ref = ref = (r)-> _ref()(-> r)
save.lambda = lambda = (v, body)->_lambda()(-> v)(-> body)
save.apply = apply = (f, a)->_apply()(-> f)(-> a)
save.llet = llet = (n, v, b)->_let()(-> n)(-> v)(-> b)
save.anno = anno = (anno, body)-> _anno()(-> anno)(-> body)
save.cons = cons
getAstType = (f) -> f.type
getLitVal = (lt)-> lt ->(v)-> v()
getRefVar = (rf)-> rf ->(v)-> v()
getLambdaVar = (lam)-> lam ->(v)->(b)-> v()
getLambdaBody = (lam)-> lam ->(v)->(b)-> b()
getApplyFunc = (apl)-> apl ->(a)->(b)-> a()
getApplyArg = (apl)-> apl ->(a)->(b)-> b()
getLetName = (lt)-> lt -> (n)->(v)->(b)-> n()
getLetValue = (lt)-> lt -> (n)->(v)->(b)-> v()
getLetBody = (lt)-> lt -> (n)->(v)->(b)-> b()
getAnnoData = (anno)-> anno -> (data)->(body)-> data()
getAnnoBody = (anno)-> anno -> (data)->(body)-> body()

######
###### JSON-to-AST
######

json2AstEncodings =
  lit: (json)-> _lit()(-> json.value)
  ref: (json)-> _ref()(-> json.value)
  lambda: (json)-> _lambda()(-> json.varName)(-> json2Ast json.body)
  apply: (json)-> _apply()(-> json2Ast(json.func))(-> json2Ast json.arg)
  let: (json)-> _let()(-> json.varName)(-> json2Ast(json.value))(-> json2Ast(json.body))
  anno: (json)-> _anno()(-> json.data)(-> json2Ast json.body)
  cons: (json)-> save.cons json2Ast(json.head), json2Ast(json.tail)
  nil: (json)-> Nil

# need these because my CS mod names the above functions with the field names :-/
lit = save.lit
ref = save.ref
lambda = save.lambda
apply = save.apply
llet = save.llet
anno = save.anno
cons = save.cons

json2Ast = (json)->
  #console.log "json2Ast: #{JSON.stringify json}"
  if typeof json != 'object' then json
  else json2AstEncodings[json._type] json

ast2JsonEncodings =
  Leisure_lit: (ast)->
    _type: 'lit'
    value: getLitVal ast
  Leisure_ref: (ast)->
    _type: 'ref'
    value: getRefVar ast
  Leisure_lambda: (ast)->
    _type: 'lambda'
    varName: getLambdaVar ast
    body: ast2Json getLambdaBody ast
  Leisure_apply: (ast)->
    _type: 'apply'
    func: ast2Json getApplyFunc ast
    arg: ast2Json getApplyArg ast
  Leisure_let: (ast)->
    _type: 'let'
    varName: getLetName ast
    value: ast2Json getLetValue ast
    body: ast2Json getLetBody ast
  Leisure_anno: (ast)->
    _type: 'anno'
    data: ast2Json getAnnoData ast
    body: ast2Json getAnnoBody ast
  Leisure_cons: (ast)->
    _type: 'cons'
    head: ast2Json ast.head()
    tail: ast2Json ast.tail()
  Leisure_nil: (ast)->
    _type: 'nil'

ast2Json = (ast)->
  if ast2JsonEncodings[ast.constructor?.name] then ast2JsonEncodings[ast.constructor.name] ast else ast

# Leisure interface to the JSON AST codec
define 'json2Ast', (-> (json)-> json2Ast JSON.parse json())
define 'ast2Json', (-> (ast)-> JSON.stringify ast2Json ast())

root.nameSub = nameSub
root.setDataType = setDataType
root.setType = setType
root.mkProto = mkProto
root.Nil = Nil
root.cons = cons
root.primCons = primCons
root.define = define
root.getType = getType
root.lit = lit
root.ref = ref
root.lambda = lambda
root.apply = apply
root.anno = anno
root.llet = llet
root.getAstType = getAstType
root.getRefVar = getRefVar
root.getLitVal = getLitVal
root.getLambdaBody = getLambdaBody
root.getLambdaVar = getLambdaVar
root.getApplyFunc = getApplyFunc
root.getApplyArg = getApplyArg
root.getLetName = getLetName
root.getLetValue = getLetValue
root.getLetBody = getLetBody
root.throwError = throwError
root.foldLeft = foldLeft
root.LeisureObject = LeisureObject
root.evalFunc = evalFunc
root.json2Ast = json2Ast
root.ast2Json = ast2Json
root.Leisure_lit = Leisure_lit
root.Leisure_ref = Leisure_ref
root.Leisure_lambda = Leisure_lambda
root.Leisure_apply = Leisure_apply
root.Leisure_let = Leisure_let
root.Leisure_anno = Leisure_anno
