###
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

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

{
  simpyCons,
  resolve,
  lazy,
} = require './base'
rz = resolve
lz = lazy
{
  nameSub,
  getLitVal,
  getRefName,
  getLambdaVar,
  getLambdaBody,
  getApplyFunc,
  getApplyArg,
  getAnnoName,
  getAnnoData,
  getAnnoBody,
  getLetName,
  getLetValue,
  getLetBody,
  Leisure_lit,
  Leisure_ref,
  Leisure_lambda,
  Leisure_apply,
  Leisure_let,
  Leisure_anno,
  setType,
  setDataType,
  cons,
  Nil,
  consFrom,
  define,
  getPos,
} = root = module.exports = require './ast'
{
  makeSyncMonad,
  runMonad,
  _true,
  _false,
  left,
  right,
} = require './runtime'
_ = require './lodash.min'

{
  SourceNode,
} = require("source-map")

varNameSub = (n)-> "L_#{nameSub n}"

newGen = false
#newGen = true
#root.lockGen = false
root.lockGen = true
masterLockGen = true
#masterLockGen = false

collectArgs = (args, result)->
  for i in args
    if Array.isArray i then collectArgs i, result else result.push i
  result

sn = (lineStarts, ast, str...)->
  #(collectArgs str, []).join('')
  #[file, line, col] = getPos(ast).toArray()
  new SourceNode(1, 0, "TEST.lsr", str)

genNode = (lineStarts, ast)-> genUniq lineStarts, ast, Nil, [Nil, 0]

gen = (ast)->
  file = getPos(ast).head().replace /\.lsr$/, '.js.map'
  genNode(Nil, ast).toStringWithSourceMap(file: file).code

sourceMapGen = (lineStarts, ast)->
  file = getPos(ast).head().replace /\.lsr$/, '.js.map'
  genNode(lineStarts, ast).toStringWithSourceMap(file: file).code

genUniq = (lineStarts, ast, names, uniq)->
  switch ast.constructor
    when Leisure_lit then sn lineStarts, ast, JSON.stringify getLitVal ast
    when Leisure_ref then sn lineStarts, ast, "resolve(", (uniqName (getRefName ast), uniq), ")"
    when Leisure_lambda then genLambda lineStarts, ast, names, uniq, 0
    when Leisure_apply
      if !newGen then sn lineStarts, ast, (genUniq lineStarts, (getApplyFunc ast), names, uniq), "(", (genApplyArg lineStarts, (getApplyArg ast), names, uniq), ")"
      else genApply lineStarts, ast, names, uniq
    when Leisure_let then sn lineStarts, ast, "(function(){\n", (genLets lineStarts, ast, names, uniq), "})()"
    when Leisure_anno
      name = getAnnoName ast
      data = getAnnoData ast
      genned = genUniq lineStarts, (getAnnoBody ast), names, uniq
      switch name
        when 'type' then sn lineStarts, ast, "setType(", (genned), ", '", data, "')"
        when 'dataType' then sn lineStarts, ast, "setDataType(", genned, ", '", data, "')"
        when 'define'
          [funcName, arity, src] = data.toArray()
          sn lineStarts, ast, "define('", funcName, "', (function(){return ", genned, "}), ", arity, ", ", JSON.stringify(src), ")"
        else genned
    else "DUR? #{ast}, #{ast.constructor} #{Leisure_lambda}"

define 'newGen', lz makeSyncMonad (env, cont)->
  newGen = !masterLockGen && !root.lockGen
  cont _true

genLambda = (lineStarts, ast, names, uniq, count)->
  name = getLambdaVar ast
  u = addUniq name, names, uniq
  n = cons name, names
  addLambdaProperties lineStarts, ast, sn lineStarts, ast, "function(", (uniqName name, u), "){return ", (genUniq lineStarts, (getLambdaBody ast), n, u), "}"

specialAnnotations = ['type', 'dataType', 'define']

arrayify = (cons)->
  if cons instanceof Leisure_cons then cons.map((el)-> arrayify el).toArray()
  else cons

getLambdaProperties = (body, props)->
  if body instanceof Leisure_anno
    if !_.contains specialAnnotations, getAnnoName(body)
      if !props then props = {}
      value = getAnnoData body
      props[getAnnoName body] = arrayify value
    getLambdaProperties getAnnoBody(body), props
  props

addLambdaProperties = (lineStarts, ast, def)->
  props = getLambdaProperties getLambdaBody ast
  if props
    sn lineStarts, ast, "setLambdaProperties(", def, ", ", (JSON.stringify props), ")"
  else def

lcons = (a, b)-> rz(L_cons)(lz a)(lz b)

lconsFrom = (array)->
  if array instanceof Array
    p = rz L_nil
    for el in array.reverse()
      p = lcons lconsFrom(el), p
    p
  else array

assocListProps = null

getAssocListProps = ->
  if !assocListProps
    assocListProps = lcons lcons('assoc', 'true'), rz(L_nil)
    assocListProps.properties = assocListProps
  assocListProps

lacons = (key, value, list)->
  alist = lcons lcons(key, value), list
  alist.properties = getAssocListProps()
  alist

global.setLambdaProperties = (def, props)->
  p = rz L_nil
  for k, v of props
    p = lacons k, lconsFrom(v), p
  def.properties = p
  def

memoize = (lineStarts, ast, func)-> sn lineStarts, ast, "function(){return ", func, "}"

dumpAnno = (ast)-> if ast instanceof Leisure_anno then dumpAnno getAnnoBody ast else ast

genApply = (lineStarts, ast, names, uniq)->
  args = []
  while dumpAnno(ast) instanceof Leisure_apply
    args.push sn lineStarts, ast, "(", (genApplyArg lineStarts, (getApplyArg dumpAnno ast), names, uniq), ")"
    ast = getApplyFunc dumpAnno ast
  args.reverse()
  sn lineStarts, ast, (genUniq lineStarts, ast, names, uniq), ".leisureCall(", (args.join ', '), ")"

genApplyArg = (lineStarts, arg, names, uniq)->
  if dumpAnno(arg) instanceof Leisure_apply then memoize lineStarts, arg, genUniq lineStarts, arg, names, uniq
  else if arg instanceof Leisure_ref then uniqName (getRefName arg), uniq
  else if arg instanceof Leisure_lit then sn lineStarts, arg, JSON.stringify getLitVal arg
  else if arg instanceof Leisure_let then sn lineStarts, arg, "function(){", (genLets lineStarts, arg, names, uniq), "}"
  else if dumpAnno(arg) instanceof Leisure_lambda then sn lineStarts, arg, "lazy(", (genUniq lineStarts, arg, names, uniq), ")"
  else sn lineStarts, ast, "function(){return ", (genUniq lineStarts, arg, names, uniq), "}"

genLetAssign = (lineStarts, arg, names, uniq)->
  if dumpAnno(arg) instanceof Leisure_let then sn lineStarts, arg, "function(){", (genLets lineStarts, arg, names, uniq), "}"
  else sn lineStarts, arg, "function(){return ", (genUniq lineStarts, arg, names, uniq), "}"

genLets = (lineStarts, ast, names, uniq)->
  [names, uniq, decs, assigns] = _.foldl (letList ast, []), ((result, l)->
    [n, u, letNames, code] = result
    newU = addUniq (getLetName l), n, u
    letName = uniqName (getLetName l), newU
    [cons((getLetName l), n),
      newU,
      (cons letName, letNames),
      (cons (sn lineStarts, ast, '\n' + letName + ' = ', genLetAssign(lineStarts, getLetValue(l), n, u)), code)]), [names, uniq, Nil, Nil]
  sn lineStarts, ast, "\nvar ", decs.join(', '), ";\n", assigns.reverse().intersperse(';\n').toArray(), ";\nreturn ", (genUniq lineStarts, (getLastLetBody ast), names, uniq)

addUniq = (name, names, uniq)->
  if (names.find (el)-> el == name) != Nil
    [overrides, num] = uniq
    [(cons (cons name, "#{name}_#{num}"), overrides), num + 1]
  else uniq

uniqName = (name, uniq)->
  [uniq] = uniq
  kv = uniq.find ((el)-> el.head() == name), uniq
  varNameSub (if kv != Nil then kv.tail() else name)

letList = (ast, buf)->
  if ast instanceof Leisure_let
    buf.push ast
    letList getLetBody(ast), buf
  else buf

getLastLetBody = (ast)-> if ast instanceof Leisure_let then getLastLetBody getLetBody ast else ast

define 'runAst', lz (ast)->
  try
    eval "(#{gen rz ast})"
  catch err
    rz(L_parseErr)(lz "\n\nParse error: " + err.toString() + "\nAST: ")(ast)

define 'runCountedAst', lz (lineStarts)->(ast)->
  try
    eval "(#{sourceMapGen rz(lineStarts), rz(ast)})"
  catch err
    rz(L_parseErr)(lz "\n\nParse error: " + err.toString() + "\nAST: ")(ast)

curry = (func, args, pos)->
  if pos == func.length then func args.toArray(func.length - 1, [])...
  else (arg)-> curry func, simpyCons(arg, args), pos + 1

# maybe hand-code this in JS to eliminate unnecessary creation of args array for the first case
Function.prototype.leisureCall = (args...)->
  #if args.length == 0 then  throw new Error "Attempt to chain with 0 arguments"
  if args.length == @length then @apply null, args
  else
    pos = 0
    f = @
    while pos < args.length
      #if f.length == 0 then throw new Error "Attempt to pass arguments to zero-argument function"
      next = pos + f.length
      if next <= args.length then f = f.apply null, args[pos...next]
      else
        console.log "CURRY"
        a = args[pos...]
        sub = ->
          #if arguments.length == 0 then  throw new Error "Attempt to chain with 0 arguments"
          a.push.apply a, arguments
          if a.length >= f.length then f.leisureCall.apply f, a else sub
        return sub
      pos = next
    f

defaultLineStarts = Nil

root.gen = gen
root.genNode = genNode
root.sourceNode = (args...)-> sn defaultLineStarts, args...
root.curry = curry
