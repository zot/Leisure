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
} = require './base'
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
} = root = module.exports = require './ast'
{
  makeSyncMonad,
  runMonad,
  _false,
  left,
  right,
} = require './runtime'
_ = require './lodash.min'

varNameSub = (n)-> "L_#{nameSub n}"

gen = (ast)-> genUniq ast, Nil, [Nil, 0]
genUniq = (ast, names, uniq)->
  switch ast.constructor
    when Leisure_lit then JSON.stringify getLitVal ast
    when Leisure_ref then "#{uniqName (getRefName ast), uniq}()"
    when Leisure_lambda then genLambda ast, names, uniq, 0
    when Leisure_apply then "#{genUniq (getApplyFunc ast), names, uniq}(#{genApplyArg (getApplyArg ast), names, uniq})"
    when Leisure_let then "(function(){\n#{genLets ast, names, uniq}})()"
    when Leisure_anno
      name = getAnnoName ast
      data = getAnnoData ast
      genned = genUniq (getAnnoBody ast), names, uniq
      switch name
        when 'type' then "setType(#{genned}, '#{data}')"
        when 'dataType' then "setDataType(#{genned}, '#{data}')"
        when 'define'
          [funcName, arity, src] = data.toArray()
          "define('#{funcName}', (function(){return #{genned}}), #{arity}, #{JSON.stringify src})"
        else genned
    else "DUR? #{ast}, #{ast.constructor} #{Leisure_lambda}"

genLambda = (ast, names, uniq, count)->
  name = getLambdaVar ast
  u = addUniq name, names, uniq
  n = cons name, names
  addLambdaProperties ast, "function(#{uniqName name, u}){return #{genUniq (getLambdaBody ast), n, u}}"

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

addLambdaProperties = (ast, def)->
  props = getLambdaProperties getLambdaBody ast
  if props
    "setLambdaProperties(#{def}, #{JSON.stringify props})"
  else def

lcons = (a, b)-> L_cons()(->a)(->b)

lconsFrom = (array)->
  if array instanceof Array
    p = L_nil()
    for el in array.reverse()
      p = lcons lconsFrom(el), p
    p
  else array

assocListProps = null

getAssocListProps = ->
  if !assocListProps
    assocListProps = lcons lcons('assoc', 'true'), L_nil()
    assocListProps.properties = assocListProps
  assocListProps

lacons = (key, value, list)->
  alist = lcons lcons(key, value), list
  alist.properties = getAssocListProps()
  alist

global.setLambdaProperties = (def, props)->
  p = L_nil()
  for k, v of props
    #p = lcons lcons(k, lconsFrom(v)), p
    p = lacons k, lconsFrom(v), p
  def.properties = p
  def

memoize = (func)-> "(function(){var $m; return function(){return $m || ($m = #{func})}})()"

dumpAnno = (ast)-> if ast instanceof Leisure_anno then dumpAnno getAnnoBody ast else ast

genApplyArg = (arg, names, uniq)->
  #if arg instanceof Leisure_apply then "(function(){var $m; return function(){return $m || ($m = #{genUniq arg, names, uniq})}})()"
  if dumpAnno(arg) instanceof Leisure_apply then memoize genUniq arg, names, uniq
  else if arg instanceof Leisure_ref then uniqName (getRefName arg), uniq
  else if arg instanceof Leisure_let then "function(){#{genLets arg, names, uniq}}"
  else if dumpAnno(arg) instanceof Leisure_lambda then memoize genUniq arg, names, uniq
  else "function(){return #{genUniq arg, names, uniq}}"

genLets = (ast, names, uniq)->
  [names, uniq, decs, assigns] = _.foldl (letList ast, []), ((result, l)->
    [n, u, letNames, code] = result
    newU = addUniq (getLetName l), n, u
    letName = uniqName (getLetName l), newU
    [cons((getLetName l), n),
      newU,
      (cons letName, letNames),
      (cons '\n' + letName + ' = ' + genApplyArg(getLetValue(l), n, u), code)]), [names, uniq, Nil, Nil]
  "\nvar #{decs.join(', ')};\n#{assigns.join(';\n')};\nreturn #{genUniq (getLastLetBody ast), names, uniq}"

addUniq = (name, names, uniq)->
  #if (_.find names, (el)-> el == name)
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

define 'runAst', ->(ast)->
  try
    eval "(#{gen ast()})"
  catch err
    L_parseErr()(->"\n\nParse error: " + err.toString() + "\nAST: ")(ast)

curry = (func, args, pos)->
  if pos == func.length then func args.toArray(func.length - 1, [])...
  else (arg)-> curry func, simpyCons(arg, args), pos + 1

root.gen = gen
root.curry = curry
