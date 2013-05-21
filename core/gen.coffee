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
} = root = module.exports = require './ast'
_ = require('./lodash.min')

varNameSub = (n)-> "L_#{nameSub n}"

gen = (ast)->
  switch ast.constructor
    when Leisure_lit then JSON.stringify getLitVal ast
    when Leisure_ref then "#{varNameSub getRefName ast}()"
    when Leisure_lambda then "function(#{varNameSub getLambdaVar ast}){return #{gen getLambdaBody ast}}"
    when Leisure_apply then "#{gen getApplyFunc ast}(#{genApplyArg getApplyArg ast})"
    when Leisure_let then "(function(){\n#{genLets ast}})()"
    when Leisure_anno
      name = getAnnoName ast
      data = getAnnoData ast
      genned = gen getAnnoBody ast
      switch name
        when 'type' then "setType(#{genned}, '#{data}')"
        when 'dataType' then "setDataType(#{genned}, '#{data}')"
        when 'define'
          [funcName, arity, src] = data.toArray()
          "define('#{funcName}', (function(){return #{genned}}), #{arity}, #{JSON.stringify src})"
        else genned
    else "DUR? #{ast}, #{ast.constructor} #{Leisure_lambda}"

genApplyArg = (arg)->
  if arg instanceof Leisure_apply then "(function(){var $m; return function(){return $m || ($m = #{gen arg})}})()"
  else if arg instanceof Leisure_ref then varNameSub getRefName arg
  else if arg instanceof Leisure_let then "function(){#{genLets arg}}"
  else "function(){return #{gen arg}}"

genLets = (ast)->
  lets = letList ast, []
  decs = _.map(lets, (l)->varNameSub getLetName l)
  assigns = _.map(lets, (l)-> '\n' + varNameSub(getLetName l) + ' = ' + genApplyArg(getLetValue l))
  "\nvar #{decs.join(', ')};\n#{assigns.join(';\n')};\nreturn #{gen getLastLetBody ast}"

letList = (ast, buf)->
  if ast instanceof Leisure_let
    buf.push ast
    letList getLetBody(ast), buf
  else buf

getLastLetBody = (ast)-> if ast instanceof Leisure_let then getLastLetBody getLetBody ast else ast

root.gen = gen
