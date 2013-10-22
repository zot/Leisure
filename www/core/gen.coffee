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
  verboseMsg,
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
  SourceMapConsumer,
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

locateAst = (ast)->
  [line, col] = pos = getPos(ast).toArray()
  #console.log "AST: #{ast}, POS: #{pos}"
  #[pos.head(), pos.tail().head(), pos.tail().tail().head()]
  #[file, (if line > 0 then line else 1), col]
  [line,col]

check = (bool, arg)->
  if !bool then console.log new Error("Bad sourcemap arg: #{arg}").stack

checkChild = (child)->
  if Array.isArray child
    for c in child
      checkChild c
  else check (typeof child == 'string') || (child instanceof SourceNode), 'child'

currentFile = 'NEVERGIVENFILE.lsr'
currentFuncName = undefined

withFile = (file, name, block)->
  oldFileName = currentFile
  oldFuncName = currentFuncName
  currentFile = file
  currentFuncName = name
  #console.log "FILE: #{file}"
  try
    block()
  finally
    #console.log "FILE: #{oldFileName}"
    currentFile = oldFileName
    currentFuncName = oldFuncName

sn = (ast, str...)->
  #(collectArgs str, []).join('')
  #[file, line, col] = getPos(ast).toArray()
  [line, offset] = locateAst ast
  #console.log "SN #{line} #{offset}"
  check typeof line == 'number', 'line'
  check typeof offset == 'number', 'offset'
  checkChild str
  if line < 1 then line = 1
  if currentFile == 'NEVERGIVENFILE.lsr' then console.log new Error("SN CALLED WITHOUT FILE").stack
  if currentFuncName?
    #console.log "USING NAME: #{currentFuncName}"
    new SourceNode(line, offset, currentFile, str, currentFuncName)
  else new SourceNode(line, offset, currentFile, str)
  #else new SourceNode(line, offset, currentFile, str)

genNode = (ast)-> genUniq ast, Nil, [Nil, 0]

gen = (ast)-> genMap(ast).toStringWithSourceMap(file: currentFile).code

genSource = (source, ast)->
  #console.log "SOURCE: #{source}\nAST: #{ast}"
  funcname = if ast instanceof Leisure_anno && getAnnoName(ast) == 'leisureName' then getAnnoData ast else null
  #withFile "data:text/plain;base64,#{btoa source}", funcname, ->
  withFile "dynamic code with source", funcname, ->
    sm = genNode(ast).prepend("\n").toStringWithSourceMap
      file: "dynamic code with source"
    map = JSON.parse sm.map.toString()
    map.sourcesContent =  [source]
    code = "(#{sm.code})\n//# sourceMappingURL=data:application/json;utf-8;base64,#{btoa JSON.stringify map}\n"
    #code = "(#{sm.code})\n//# sourceMappingURL=data:application/json;base64,#{btoa JSON.stringify map}\n"
    #console.log "CODE: #{code}"
    #console.log "MAP: #{JSON.stringify map}"
    code

genMap = (ast)->
  #console.log "GEN AST: #{ast}"
  #file = getPos(ast).head().replace /\.lsr$/, '.js.map'
  hasFile = ast instanceof Leisure_anno && getAnnoName(ast) == 'filename'
  filename = if hasFile then getAnnoData ast else 'GENFORUNKNOWNFILE.lsr'
  nameAst = if hasFile then getAnnoBody ast else null
  #funcname = if nameAst instanceof Leisure_anno && getAnnoName(nameAst) == 'leisureName' then getAnnoData nameAst else null
  funcname = if nameAst instanceof Leisure_anno && getAnnoName(nameAst) == 'leisureName' then getAnnoData nameAst else currentFuncName
  #console.log "File: #{filename}, func: #{funcname}, nameast: #{nameAst instanceof Leisure_anno}"
  #if funcname then verboseMsg 'gen', "compiling ast: #{funcname}"
  #sub = withFile filename, funcname, -> genNode(ast)
  sub = withFile filename, null, -> genNode(ast)
  [line, offset] = locateAst ast
  if funcname then new SourceNode line, offset, filename, sub, funcname
  else sub

genUniq = (ast, names, uniq)->
  switch ast.constructor
    when Leisure_lit then sn ast, JSON.stringify getLitVal ast
    when Leisure_ref then sn ast, "resolve(", (uniqName (getRefName ast), uniq), ")"
    when Leisure_lambda then genLambda ast, names, uniq, 0
    when Leisure_apply
      if !newGen then sn ast, (genUniq (getApplyFunc ast), names, uniq), "(", (genApplyArg (getApplyArg ast), names, uniq), ")"
      else genApply ast, names, uniq
    when Leisure_let then sn ast, "(function(){\n", (genLets ast, names, uniq), "})()"
    when Leisure_anno
      name = getAnnoName ast
      data = getAnnoData ast
      genned = genUniq (getAnnoBody ast), names, uniq
      switch name
        when 'type' then sn ast, "setType(", (genned), ", '", data, "')"
        when 'dataType' then sn ast, "setDataType(", genned, ", '", data, "')"
        when 'define'
          [funcName, arity, src] = data.toArray()
          sn ast, "define('", funcName, "', (function(){return ", genned, "}), ", arity, ", ", JSON.stringify(src), ")"
        else genned
    else "DUR? #{ast}, #{ast.constructor} #{Leisure_lambda}"

define 'newGen', lz makeSyncMonad (env, cont)->
  newGen = !masterLockGen && !root.lockGen
  cont _true

genLambda = (ast, names, uniq, count)->
  name = getLambdaVar ast
  u = addUniq name, names, uniq
  n = cons name, names
  addLambdaProperties ast, sn ast, "function(", (uniqName name, u), "){return ", (genUniq (getLambdaBody ast), n, u), "}"

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
    sn ast, "setLambdaProperties(", def, ", ", (JSON.stringify props), ")"
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

memoize = (ast, func)-> sn ast, "function(){return ", func, "}"

dumpAnno = (ast)-> if ast instanceof Leisure_anno then dumpAnno getAnnoBody ast else ast

genApply = (ast, names, uniq)->
  args = []
  while dumpAnno(ast) instanceof Leisure_apply
    args.push sn ast, "(", (genApplyArg (getApplyArg dumpAnno ast), names, uniq), ")"
    ast = getApplyFunc dumpAnno ast
  args.reverse()
  sn ast, (genUniq ast, names, uniq), ".leisureCall(", (args.join ', '), ")"

genApplyArg = (arg, names, uniq)->
  if dumpAnno(arg) instanceof Leisure_apply then memoize arg, genUniq arg, names, uniq
  else if arg instanceof Leisure_ref then uniqName (getRefName arg), uniq
  else if arg instanceof Leisure_lit then sn arg, JSON.stringify getLitVal arg
  else if arg instanceof Leisure_let then sn arg, "function(){", (genLets arg, names, uniq), "}"
  else if dumpAnno(arg) instanceof Leisure_lambda then sn arg, "lazy(", (genUniq arg, names, uniq), ")"
  else sn ast, "function(){return ", (genUniq arg, names, uniq), "}"

genLetAssign = (arg, names, uniq)->
  if dumpAnno(arg) instanceof Leisure_let then sn arg, "function(){", (genLets arg, names, uniq), "}"
  else sn arg, "function(){return ", (genUniq arg, names, uniq), "}"

genLets = (ast, names, uniq)->
  [names, uniq, decs, assigns] = _.foldl (letList ast, []), ((result, l)->
    [n, u, letNames, code] = result
    newU = addUniq (getLetName l), n, u
    letName = uniqName (getLetName l), newU
    [cons((getLetName l), n),
      newU,
      (cons letName, letNames),
      (cons (sn ast, '\n' + letName + ' = ', genLetAssign(getLetValue(l), n, u)), code)]), [names, uniq, Nil, Nil]
  sn ast, "\nvar ", decs.join(', '), ";\n", assigns.reverse().intersperse(';\n').toArray(), ";\nreturn ", (genUniq (getLastLetBody ast), names, uniq)

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

define 'runAst', lz (code)->(ast)->
  try
    eval "(#{gen rz ast})"
  catch err
    msg = "\n\nParse error: " + err.toString() + "\nAST: "
    console.log msg + ast() + "\n" + err.stack
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

root.gen = gen
root.genMap = genMap
root.genSource = genSource
root.genNode = genNode
root.sourceNode = sn
root.curry = curry
root.withFile = withFile
