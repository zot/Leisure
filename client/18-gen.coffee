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
  newCall,
  simpyCons,
  resolve,
  lazy,
  verboseMsg,
  nsLog,
} = root = (module ? {}).exports = require '15-base'
rz = resolve
lz = lazy
lc = Leisure_call
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
  define,
  functionInfo,
  getPos,
  isNil,
} = require '16-ast'
{
  makeSyncMonad,
  runMonad,
  _true,
  _false,
  left,
  right,
  booleanFor,
  newConsFrom,
} = require '17-runtime'
_ = require 'lodash.min'

consFrom = newConsFrom

sm = (if module? then require else Leisure.require)("source-map")
{
  SourceNode,
  SourceMapConsumer,
} = sm.sourceMap ? sm

varNameSub = (n)-> "L_#{nameSub n}"

#useArity = true
useArity = false

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
  #else check (typeof child == 'string') || (child instanceof SourceNode), 'child'
  else check (typeof child == 'string') || (child instanceof SourceNode), c

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

findName = (name)->
  for i in [root.nameSpacePath.length - 1 .. 0]
    if LeisureNameSpaces[root.nameSpacePath[i]]?[name] then return root.nameSpacePath[i]
  if root.currentNameSpace && LeisureNameSpaces[root.currentNameSpace][name] then root.currentNameSpace
  else null

location = (ast)->
  [line, col] = locateAst ast
  "#{line}:#{col}"

genRefName = (ref, uniq, names)->
  name = getRefName ref
  #if isNil (val = names.find (el)-> el == name) then console.log("GLOBAL: #{name}, val = #{val}")
  #else console.log("LOCAL: #{name}, val = #{val}")
  #if isNil (val = names.find (el)-> el == name) then "#{currentNameSpace}#{name}"
  if isNil (val = names.find (el)-> el == name)
    ns = findName nameSub name
    if ns == root.currentNameSpace then nsLog "LOCAL NAME: #{name} FOR #{root.currentNameSpace} #{location ref}"
    else if !ns then nsLog "GUESSING LOCAL NAME #{name} FOR #{root.currentNameSpace} #{location ref}"
    varNameSub name
  else uniqName name, uniq

genUniq = (ast, names, uniq, count)->
  switch ast.constructor
    when Leisure_lit then sn ast, JSON.stringify getLitVal ast
    when Leisure_ref then sn ast, "resolve(", (genRefName ast, uniq, names), ")"
    when Leisure_lambda
      if newCall then newGenLambda ast, names, uniq, count ? 0
      else genLambda ast, names, uniq, count ? 0
    when Leisure_apply
      if newCall then newGenApply ast, names, uniq, arity
      else if useArity then genArifiedApply ast, names, uniq, arity
      else sn ast, (genUniq (getApplyFunc ast), names, uniq), "(", (genApplyArg (getApplyArg ast), names, uniq), ")"
    when Leisure_let then sn ast, "(function(){\n", (genLets ast, names, uniq), "})()"
    when Leisure_anno
      name = getAnnoName ast
      data = getAnnoData ast
      if !newCall && name == 'arity' && useArity && data > 1
        #if !(typeof data in ['number', 'string']) then throw new Error "Annotation value is not numeric (#{typeof data}) in AST #{ast}: #{data}"
        genArifiedLambda (getAnnoBody ast), names, uniq, data
      else
        genned = genUniq (getAnnoBody ast), names, uniq
        switch name
          when 'type' then sn ast, "setType(", (genned), ", '", data, "')"
          when 'dataType' then sn ast, "setDataType(", genned, ", '", data, "')"
          when 'define'
            [funcName, arity, src] = data.toArray()
            sn ast, "define('", funcName, "', (function(){return ", genned, "}), ", arity, ", ", JSON.stringify(src), ")"
          when 'leisureName'
            #console.log "DEFINE #{getAnnoData ast} = #{getApplyArg getAnnoBody ast}"
            genned
          else genned
    else "CANNOT GENERATE CODE FOR UNKNOWN AST TYPE: #{ast}, #{ast.constructor} #{Leisure_lambda}"

# this is a no-op, now
define 'newGen', (makeSyncMonad (env, cont)->
  console.log "CALL TO OBSOLETE NEWGEN"
  cont _true), null, null, null, 'parser'

genArifiedApply = (ast, names, uniq)->
  args = []
  func = ast
  while dumpAnno(func) instanceof Leisure_apply
    args.push getApplyArg dumpAnno func
    func = getApplyFunc dumpAnno func
  args.reverse()
  info = functionInfo[getRefName func]
  if dumpAnno(func) instanceof Leisure_ref && info?.newArity && (arity = info?.arity) && arity <= args.length
    argCode = []
    argCode.push ast
    argCode.push genUniq func, names, uniq
    argCode.push '('
    for i in [0...arity]
      if i > 0 then argCode.push ', '
      argCode.push sn args[i], genApplyArg args[i], names, uniq
    argCode.push ')'
    for i in [arity...args.length] by 1
      argCode.push '(', (sn args[i], genApplyArg args[i], names, uniq), ')'
    sn argCode...
  else
    ast = dumpAnno ast
    sn ast, (genUniq (getApplyFunc ast), names, uniq), "(", (genApplyArg (getApplyArg ast), names, uniq), ")"

newGenApply = (ast, names, uniq)->
  args = []
  func = ast
  while dumpAnno(func) instanceof Leisure_apply
    args.push getApplyArg dumpAnno func
    func = getApplyFunc dumpAnno func
  if args.length == 1
    ast = dumpAnno ast
    sn ast, (genUniq (getApplyFunc ast), names, uniq), "(", (genApplyArg (getApplyArg ast), names, uniq), ")"
  else
    args.reverse()
    info = functionInfo[getRefName func]
    argCode = []
    argCode.push ast
    argCode.push '(\n  Leisure_call('
    argCode.push genUniq func, names, uniq
    for i in [0...args.length]
      argCode.push ', '
      argCode.push sn args[i], genApplyArg args[i], names, uniq
    argCode.push '))'
    sn argCode...

genLambda = (ast, names, uniq, count)->
  name = getLambdaVar ast
  u = addUniq name, names, uniq
  n = cons name, names
  addLambdaProperties ast, sn ast, "function(", (uniqName name, u), "){return ", (genUniq (getLambdaBody ast), n, u, 1), "}"

newGenLambda = (ast, names, uniq, count)->
  [args, body] = getLambdaArgs ast
  if args.length == 1 then return genLambda ast, names, uniq, count
  argList = _.map(args, ((x)-> 'L_' + x)).join ', '
  mainFunc = "function(#{argList}) {return #{genUniq body, names, uniq};}"
  result = addLambdaProperties ast, (sn ast, mainFunc)
  annoAst = ast
  while annoAst instanceof Leisure_anno
    name = getAnnoName annoAst
    data = getAnnoData annoAst
    switch name
      when 'type' then result = "setType(#{result}, '#{data}')"
      when 'dataType' then result = "setDataType(#{result}, '#{data}')"
    annoAst = getAnnoBody annoAst
  sn ast, result

getLambdaArgs = (ast)->
  args = []
  while ast instanceof Leisure_lambda
    args.push getLambdaVar ast
    ast = getLambdaBody ast
  [args, ast]

genArifiedLambda = (ast, names, uniq, arity)->
  if arity < 2 then genLambda ast, names, uniq, 0
  else
    args = getNArgs(arity, ast).toArray()
    #console.log "FUNCTION ARITY #{arity} [#{args.join ', '}] #{ast}"
    argList = _.map(args, ((x)-> 'L_' + x)).join ', '
    mainFunc = """
      function(#{argList}, more) {
          if (L_#{_.last args} && (typeof more == "undefined" || more == null)) {
            return full(#{argList});
          } else if (typeof L_#{args[1]} == "undefined" || L_#{args[1]} == null) {
            return partial(L_#{args[0]});
          } else {
            return Leisure.curryCall(arguments, partial);
          }
        }"""
    result = """
      (function () {
        var main;
        var full = function (#{argList}) {
          return #{genUniq getNthLambdaBody(ast, arity), names, uniq};
        };
        var partial = function(L_#{args[0]}) {
          #{genPartialCalls args, argList, 1}
        };
        main = #{addLambdaProperties ast, (sn ast, mainFunc)};
        return main;
      })()
      """
    annoAst = ast
    while annoAst instanceof Leisure_anno
      name = getAnnoName annoAst
      data = getAnnoData annoAst
      switch name
        when 'type' then result = "setType(#{result}, '#{data}')"
        when 'dataType' then result = "setDataType(#{result}, '#{data}')"
      annoAst = getAnnoBody annoAst
    sn ast, result

getNthLambdaBody = (ast, n)->
  if n == 0 then ast
  else if (d = dumpAnno ast) instanceof Leisure_lambda then getNthLambdaBody getLambdaBody(d), n - 1
  else throw new Error "Expected lambda but got #{ast}"

genPartialCalls = (args, argList, n)->
  if n == args.length then "return full(#{argList});"
  else
    pad = strRepeat '  ', 4 + n
    #"""return $F(arguments, function(L_#{args[n]}){
    ##{pad + '  '}#{genPartialCalls args, argList, n + 1}
    ##{pad}});"""
    """
var _#{n} = function(L_#{args[n]}) {
#{pad + '  '}#{genPartialCalls args, argList, n + 1}
#{pad}};
#{pad}_#{n}.leisureInfo = {arg: L_#{args[n - 1]}, #{if n == 1 then "name: main.leisureName" else "parent: _#{n - 1}.leisureInfo"}};
#{pad}return _#{n};"""

strRepeat = (string, n)->
  result = string
  for i in [1...n]
    result += string
  result

(window ? global ? {}).curryCall = curryCall = (args, func)->
  f = func args[0]
  for i in [1...args.length]
    f = f args[i]
  f

getNArgs = (n, ast)->
  d = dumpAnno ast
  if !n then Nil else cons (getLambdaVar d), getNArgs n - 1, getLambdaBody d

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

addLambdaProperties = (ast, def, extras)->
  props = getLambdaProperties getLambdaBody ast
  if props || extras
    p = {}
    if props then _.merge p, props
    if extras then _.merge p, extras
    sn ast, "setLambdaProperties(", def, ", ", (JSON.stringify p), ")"
  else def

if newCall
  lcons = (a, b)-> lc rz(L_cons), (lz a), (lz b)
  parseErr = (a, b)-> lc rz(L_parseErr), a, b
else
  lcons = (a, b)-> rz(L_cons)(lz a)(lz b)
  parseErr = (a, b)-> rz(L_parseErr)(a)(b)

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

(window ? global).setLambdaProperties = (def, props)->
  p = rz L_nil
  for k, v of props
    p = lacons k, lconsFrom(v), p
  def.properties = p
  def

memoize = (ast, func)-> sn ast, "function(){return ", func, "}"

dumpAnno = (ast)-> if ast instanceof Leisure_anno then dumpAnno getAnnoBody ast else ast

genApplyArg = (arg, names, uniq)->
  d = dumpAnno arg
  if d instanceof Leisure_apply then memoize d, genUniq arg, names, uniq
  else if d instanceof Leisure_ref then genRefName d, uniq, names
  else if d instanceof Leisure_lit then sn arg, JSON.stringify getLitVal d
  else if d instanceof Leisure_let then sn arg, "function(){return", (genUniq arg, names, uniq), ";}"
  else if d instanceof Leisure_lambda then sn arg, "lazy(", (genUniq arg, names, uniq), ")"
  else sn arg, "function(){return ", (genUniq arg, names, uniq), "}"

genLetAssign = (arg, names, uniq)->
  if dumpAnno(arg) instanceof Leisure_let then sn arg, "function(){", (genLets arg, names, uniq), "}"
  else sn arg, "function(){return ", (genUniq arg, names, uniq), "}"

genLets = (ast, names, uniq)->
  bindings = letList ast, []
  letNames = _.foldl bindings, ((n, l)-> cons (getLetName l), n), names
  [letUniq, decs, assigns] = _.foldl bindings, ((result, l)->
    [u, code, assigns] = result
    newU = addUniq (getLetName l), letNames, u
    letName = uniqName (getLetName l), newU
    [newU,
      (cons (sn ast, letName + ' = ', genLetAssign(getLetValue(l), letNames, u)), code),
      (cons letName, assigns)]), [uniq, Nil, Nil]
  sn ast, "  var ", assigns.reverse().join(', '), ";\n  ", decs.reverse().intersperse(';\n  ').toArray(), ";\n\n  return ", (genUniq (getLastLetBody ast), letNames, letUniq)

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

define 'runAst', ((code)->(ast)->
  jsCode = null
  try
    jsCode = gen rz ast
    eval "(#{jsCode})"
  catch err
    codeMsg = (if jsCode then "CODE: \n#{jsCode}\n" else "")
    msg = "\n\nParse error: " + err.toString() + "\n#{codeMsg}AST: "
    console.log msg + ast() + "\n" + err.stack
    parseErr (lz "\n\nParse error: " + err.toString() + "\n#{codeMsg}AST: "), (ast)), null, null, null, 'parser'

define 'genAst', ((ast)->
  jsCode = null
  try
    gen rz ast
  catch err
    codeMsg = (if jsCode then "CODE: \n#{jsCode}\n" else "")
    parseErr (lz "\n\nParse error: " + err.toString() + "\n#{codeMsg}AST: "), (ast)), null, null, null, 'parser'

root.gen = gen
root.genMap = genMap
root.genSource = genSource
root.genNode = genNode
root.sourceNode = sn
root.withFile = withFile
root.curryCall = curryCall
#root.useNameSpace = useNameSpace
#root.pushNameSpace = pushNameSpace
#root.getNameSpacePath = getNameSpacePath
#root.clearNameSpacePath = clearNameSpacePath
#root.saveNameSpace = saveNameSpace
#root.restoreNameSpace = restoreNameSpace
root.SourceNode = SourceNode
root.SourceMapConsumer = SourceMapConsumer
