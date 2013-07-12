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
  makeMonad,
  _false,
} = require './runtime'
_ = require './lodash.min'

varNameSub = (n)-> "L_#{nameSub n}"

gen = (ast)-> genUniq ast, Nil, [Nil, 0]
genUniq = (ast, names, uniq)->
  switch ast.constructor
    when Leisure_lit then JSON.stringify getLitVal ast
    when Leisure_ref then "#{uniqName (getRefName ast), uniq}()"
    when Leisure_lambda
      name = getLambdaVar ast
      u = addUniq name, names, uniq
      n = cons name, names
      "function(#{uniqName name, u}){return #{genUniq (getLambdaBody ast), n, u}}"
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
  makeMonad (env, cont)->
    #console.log "AST: #{ast()}"
    #console.log "CODE: (#{gen ast()})"
    try
      value = runMonad eval "(#{gen ast()})"
      cont value
    catch err
      console.log "Error running code: (#{gen ast()})"
      cont _false

root.gen = gen
