###
Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

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
  window.Leisure = root = {}
  Parse = window.Parse
else
  root = exports ? this
  Parse = require('./parse')

{
  LeisureObject,
  nameSub,
  setDataType,
  setType,
  mkProto,
  cons,
  dlempty,
  dlnew,
  dlappend,
  lexCons,
  lexDlempty,
  lexDlnew,
  lexDlappend,
  define,
  listToAst,
  evalFunc,
  Nil,
  cons,
  getAstType,
  getRefVar,
  getLitVal,
  getLambdaBody,
  getLambdaVar,
  getApplyFunc,
  getApplyArg,
  ifParsed,
  snip,
  Scanner,
  Leisure_token,
} = Parse

declScanner = new Scanner()

declScanner.defToken '::'
declScanner.defToken ':?'

escapeRegexpChars = (str)-> str.replace /([\][().\\*+?{}|])/g, '\\$1'

forward = {}
baseTokenPat = /[().\\]| +|[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*(\n|$)/
tokenPat = new RegExp("\\n *|#{baseTokenPat.source}")
linePat = /^((?:\s*\n|#[^\n]*\n)*)([^=\n]*)(=[.)M]=|=\([^=]+=|=)?/
#linePat = /^((?:\s*\n|#[^\n]*\n)*)([a-zA-Z0-9!@#$%\^&*\-_+=[\]{}|:;,<>/? ]*)(=[.)M]=|=\([^=]+=|=)?/

ctx = global

global.leisureGetFuncs = -> global.leisureFuncNames
global.noredefs = true
global.leisureContext = Nil

funcAstAtOffset = (func, nodeOffset)->
  ast = funcAst func
  if ast then astAtOffset ast, nodeOffset else null

funcAst = (func)-> if func.src then func.ast ? (func.ast = parseFull(func.src)[0]) else null

astAtOffset = (ast, offset)->
  if ast.leisureNodeNumber == offset then ast
  else switch getAstType ast
    when 'lambda' then astAtOffset (getLambdaBody ast), offset
    when 'apply'
      if ast.leisureNodeNumber > offset then astAtOffset (getApplyFunc ast), offset
      else astAtOffset (getApplyArg ast), offset

funcContextSource = (funcName, offset)->
  func = global[nameSub(funcName)]()
  ast = Leisure.funcAstAtOffset func, offset
  start = ast.leisureStart
  end = ast.leisureEnd
  [func.src, start, end, func, ast]

contexts = {}

funcContext = (funcName, offset)->
  cur = contexts[funcName]
  if !cur? then cur = contexts[funcName] = []
  if !cur[offset] then cur[offset] = [funcName, offset]
  cur[offset]

nameAst = (nm, ast)-> if !ast.leisureName
  ast.leisureName = nm
  ast.toString = ->"{#{nm}}"

evalCompiledAst = (ast)-> if ast.lits.length then evalFunc("(function(__lits){\nreturn #{ast.src}})")(ast.lits) else Parse.evalFunc(ast.src)

define 'eval', ->(ast)-> evalCompiledAst(dgen(ast()))

between = (start, end, pos)-> start <= pos and pos <= end
within = (ast, pos)-> between ast.leisureStart, ast.leisureEnd, pos
brackets = (start, end)-> cons(start, cons(end, Nil))
astBrackets = (ast)-> brackets(ast.leisureStart, ast.leisureEnd)

# bracket application parts in ast for position
bracket = (ast, pos)->
  if ast? and within ast, pos
    switch getAstType ast
      when 'ref', 'lit'
        if within ast, pos then cons(astBrackets(ast), Nil)
        else Nil
      when 'lambda'
        if between ast.leisureStart, ast.leisureNameEnd, pos then cons(brackets(ast.leisureStart, ast.leisureNameEnd), Nil)
        else bracket getLambdaBody ast, pos
      when 'apply' then bracketsForApply ast, ast, pos
  else Nil

bracketsForApply = (apply, part, pos)->
  arg = getApplyArg part
  if within arg, pos
    if arg.type == 'apply' then bracketsForApply arg, arg, pos
    else if arg.type == 'lambda' then bracket arg, pos
    else (bracketApplyParts apply)(Nil)
  else
    func = getApplyFunc(part)
    if func.type == 'apply' then bracketsForApply apply, getApplyFunc(part), pos
    else if func.type in ['ref', 'lit'] then (bracketApplyParts apply)(Nil)
    else bracket func, pos

# returns a cons-based difference list (not append-based)
bracketApplyParts = (ast)->
  astFunc = getApplyFunc ast
  start = switch getAstType astFunc
    when 'ref', 'lit', 'lambda' then dlnew(astBrackets(astFunc))
    when 'apply' then bracketApplyParts(astFunc)
  dlappend start, dlnew(astBrackets(getApplyArg ast))

findFuncs = (ast)->
  if !ast or (getAstType ast) != 'apply' then dlempty
  else findFuncApply ast, 0

findFuncApply = (apply, count)->
  if (getAstType apply) == 'apply' then dlappend (findFuncApply (getApplyFunc apply), count + 1), (findFuncs (getApplyArg apply))
  else if (getAstType apply) == 'ref' then dlnew(cons apply, (cons count, Nil))
  else dlempty

indent = (str, amt)->
  amt = amt ? 2
  idt = '\n'
  for i in [0..amt]
    idt += ' '
  str.replace /\n/g, idt

###
wrapContextVars = (name, ast, code, top)->"""
(function(){
  var ctx = Leisure.contextStack
  #{indent code}
})()
  """

wrapContext = (name, ast, code, top)->
  if name? then wrapContextVars name, ast, wrapContextBody(name, ast, code, top), top
  else code

wrapLazyContext = (name, ast, code, top)->
  if name? then wrapContextVars name, ast, "return function(){#{indent wrapContextBody(name, ast, code, top)}};", top
  else "(function(){return #{code}})"

wrapContextBody = (name, ast, code, top)->"""
  #{if top then '' else "var oldCtx = ctx;\n  "}
  var ctx = Leisure.contextStack;
  Leisure.contextStack = Parse.cons(Leisure.funcContext('#{name}', #{ast.leisureNodeNumber}), #{if top then 'ctx' else 'oldCtx'})
  try {
    return #{indent code};
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
  """
###

class Code
  constructor: (@main, @vars, @err, @global, @debug, @method, @unmemoized)->
    @main = @main ? ''
    @vars = @vars ? Nil
    @err = @err ? ''
    @global = @global ? Nil
  copyWith: (main, vars, err, global, debug, method, unmemoized)->
    #if !main and !unmemoized and @unmemoized then console.log "PRESERVING UNMEMOIZED: @unmemoized"
    #else if unmemoized then console.log "SETTING UNMEMOIZED: #{unmemoized}"
    new Code(main ? @main, vars ? @vars, err ? @err, global ? @global, debug ? @debug, method ? @method, unmemoized ? (if !main then @unmemoized else null))
  setVars: (v)-> @copyWith(null, v)
  addVar: (v)-> @copyWith(null, cons(v, @vars))
  addErr: (e)-> @copyWith(null, null, "#{@err}#{e}\n")
  setGlobal: (v)-> @copyWith(null, null, null, v)
  setDebug: (d)-> @copyWith(null, null, null, null, d)
  setMethod: (meth)-> @copyWith(null, null, null, null, null, meth)
  setUnmemoized: (u)-> @copyWith(null, null, null, null, null, null, u)
  unmemoize: -> @copyWith(@unmemoized, null, null, null, null, null, '')
  reffedValue: (deref)-> if !deref then @
  else
    #tmp = if @unmemoized then @unmemoize() else @
    tmp = @
    #if @unmemoized then console.log "DEREF: #{@main}()  [#{@unmemoized}()]"
    tmp.copyWith("#{tmp.main}()")
  unreffedValue: (deref, name, ast, top)-> if deref then @ else @lazy(name, ast, top)
  memoize: (deref, name, ast, top)->
    if deref then @
    else
      tmp = @catchErrorsWithDebugContext(name, ast)
      tmp = tmp.copyWith("$m || ($m = #{tmp.main})").lazy(name, ast, top)
      tmp.copyWith("function(#{if tmp.debug then '$ctx' else ''}){var $m; return #{tmp.main}}").captureDebugContext(name).setUnmemoized(tmp.main)
  captureDebugContext: (name)->
    if @debug then @copyWith "(#{@main})(leisureContext)"
    else @copyWith "(#{@main})()"
  catchErrorsWithDebugContext: (name, ast)->
    if @debug then @copyWith "markLeisureErrors('#{name}', $ctx, (function(){#{@main}}))"
    else @copyWith("(#{@main})")
  lazy: (name, ast, top)->
    #if !@debug or !(name? and ast.leisureNodeNumber?) then @copyWith("(function(){return #{@main}})")
    #else @copyWith (wrapLazyContext name, ast, @main, top)
    @copyWith("(function(){return #{@main}})")
  genTopLevelDebug: (name, ast)->
    if @debug && name
      tmp = @catchErrorsWithDebugContext(name, ast)
      tmp.copyWith("function($ctx){#{tmp.main}}").captureDebugContext(name)
    else @

markLeisureErrors = (name, ctx, func)->
  try
    console.log "USING CONTEXT: #{name}"
    global.leisureContext = cons([name, 0], ctx)
    func()
  catch err
    err.leisureContext = global.leisureContext
    throw err
  finally
    global.leisureContext = global.leisureContext.tail()

dgen = (ast, lazy, name, globals, tokenDef, namespace, src, debug)->
  #debug = false
  ast.lits = []
  res = []
  code = (gen ast, ast.leisurePrefixCount, ast, new Code().setDebug(debug).setGlobal(cons(name, globals ? global.leisureFuncNames)), ast.lits, Nil, true, name, namespace, true)
  code = code.genTopLevelDebug(name, ast)
  if code.err != '' then ast.err = code.err
  else
    #jsCode = if !debug or (getAstType ast) == 'apply' or !name then "(#{code.main})" else wrapContext name, ast, code.main, true
    jsCode = "(#{code.main})"
    if name
      n = nameSub name
      # need to memoize lambdas in order to be able to compare unapplied functions with each other
      jsCode = if (getAstType ast) == 'lambda' then "(function() {var f; return function #{n}(){return f || (f = #{jsCode});}})()" else "(function #{n}() {return (#{jsCode});})"
    ast.src = if name? then """
#{if code.method?
  [type, name, argNames, methodCode] = code.method
  "#{checkClass(name, n, ast)};\nLeisure.createMethod('#{type}', '#{name}', #{if src then JSON.stringify(src) else "''"}, function(#{argNames.slice(1).map((n)->nameSub n).join(", ")}) {return #{methodCode};})"
else "#{namespace ? ''}#{if tokenDef == '=M=' then 'defineMacro' else 'define'}('#{name}', #{jsCode}, #{(ast.leisurePrefixCount || 0)}, #{if src then JSON.stringify(src) else '""'});#{if tokenDef? and tokenDef != '=' then "\nroot.tokenDefs.push('#{name}', '#{tokenDef}');" else ''}"}
""" else jsCode
  ast.globals = code.global
  ast

##
## Dispatching
##

checkClass = (funcName, func, ast, src)->
  [receiver, args] = receiverAndArgs(ast)
  "Leisure.makeDispatchFunction('#{funcName}', '#{func}', '#{receiver}', ['#{ast.leisureArgNames.map((n)->nameSub n).join "', '"}'])"

receiverAndArgs = (ast)->
  receiver = nameSub(receiverFor ast, 0)
  args = ast.leisureArgNames
  [receiver, args[1...args.length].map((n)-> nameSub n).filter((n)-> n != receiver)]

receiverFor = (ast, index)->
  if index < ast.leisureArgNames.length
    if ast.leisureTypeAssertions[ast.leisureArgNames[index]] then ast.leisureArgNames[index]
    else receiverFor ast, index + 1
  else null

# This should be moved to compile-time, rather than load-time
makeDispatchFunction = (funcName, methodName, receiverName, argNames)->
  dispSrc = "(function(){return #{genDispatchFunc(methodName, receiverName, 0, argNames[1...argNames.length])};})"
  #console.log "DISPATCH #{funcName}/#{methodName} = #{dispSrc}"
  disp = eval(dispSrc)
  if !LeisureObject.prototype[methodName]?
    LeisureObject.prototype[methodName] = if global[methodName]? then genDispatchDefault(funcName, methodName, global[methodName], argNames) else true
  define funcName, disp, argNames.length, null, true
  disp

genDispatchFunc = (methodName, receiverName, index, args)->
  if index < args.length then "function(#{args[index]}) {return #{genDispatchFunc methodName, receiverName, index + 1, args};}"
  else
    joined = args.join ', '
    "(#{receiverName}() instanceof LeisureObject ? #{receiverName}() : LeisureObject.prototype).#{methodName}(#{joined})"

genDispatchDefault = (lsrName, name, func, args)->
  originalAst = funcAst func
  v = getNargs originalAst, args.length
  ast = getNthBody originalAst, args.length
  #Can't define function with name here, because it can interfere with recursive calls
  code = (gen ast, 0, ast, new Code().setGlobal(cons(lsrName, global.leisureFuncNames)), originalAst.lits, v, true, '', "Parse.", true, true)
  if code.err then throw new Error(code.err)
  code = code.main
  #Can't define function with name here, because it can interfere with recursive calls
  code = "(function (#{(collectArgs originalAst, args.length - 1).join(', ')}){return (#{code})})"
  eval(code)

collectArgs = (ast, n)->
  args = []
  for i in [0...n]
    args.push Parse.nameSub(Parse.getLambdaVar(ast))
    ast = Parse.getLambdaBody(ast)
  args

getNargs = (ast, n)->
  if n == 0 then Nil
  else cons Parse.getLambdaVar(ast), getNargs(Parse.getLambdaBody(ast), n - 1)

noDefaultError = (methodName)-> throw new Error("No default function #{methodName}")

createMethod = (leisureClass, methodName, src, definition)->
  fun = Parse.ensureLeisureClass leisureClass
  meth = nameSub methodName
  if fun.prototype.hasOwnProperty(meth) then throw new Error("Attempt to redefine existing method: #{leisureClass}.#{methodName}, current definition: #{fun.prototype[meth]()}, class: #{fun}")
  fun.prototype[meth] = definition
  definition.src = src

##
## END Dispatching
##

wrap = (name, ast, v, body, namespace, debug)->
  body = "function(#{v}){return #{body};}"
  if !ast.exprType? and !ast.exprDataType then body
  else
    """
#{namespace ? ''}#{if ast.exprType then 'setType' else 'setDataType'}(#{body}, '#{ast.exprType ? ast.exprDataType}')
    """

gen = (originalAst, prefixCount, ast, code, lits, vars, deref, name, namespace, top, ignoreUnknownNames)->
  switch getAstType ast
    when 'ref'
      val = getRefVar ast
      if val.lambda then code.addErr "attempt to use lambda as a variable"
      else
        code = code.copyWith(nameSub val).reffedValue(deref)
        if ignoreUnknownNames or vars.find((v)-> v == val) then code.addVar(val)
        else if ctx[nameSub(val)]? or code.global.find((v)-> v == val) or forward[nameSub(val)]? then code
        else if typeof val == 'number' then code.copyWith(val).unreffedValue(deref, name, ast, top)
        else code.addErr "attempt to use free variable: #{val} in #{Parse.print originalAst}"
    when 'lit'
      val = getLitVal ast
      src = if typeof val == 'function' or typeof val == 'object'
        lits.push(val)
        "(function(){\nreturn __lits[#{lits.length - 1}]\n})"
      else JSON.stringify val
      code.copyWith(src).unreffedValue(deref, name, ast, top)
    when 'lambda'
      v = getLambdaVar ast
      bodyCode = (gen originalAst, prefixCount - 1, (getLambdaBody ast), code, lits, cons(v, vars), true, name, namespace, false, ignoreUnknownNames)
      bodyCode = if (originalAst.leisureTypeAssertions?) and (prefixCount == 1) then generateDispatch name, originalAst, bodyCode else bodyCode
      bodyCode = bodyCode.setVars(bodyCode.vars.removeAll (bv)-> bv == v)
      bodyCode = bodyCode.copyWith(wrap(name, ast, nameSub(v), bodyCode.main, namespace)).memoize(deref, name, ast, top)
      bodyCode
    when 'apply'
      func = getApplyFunc ast
      if getAstType(func) == 'lit' then code.addErr "Attempt to use lit as function: #{getLitVal func}"
      else if !ignoreUnknownNames and freeVar func, vars, code.global then code.addErr "Attempt to use free variable as function: #{getRefVar func}"
      else
        arg = getApplyArg ast
        funcCode = gen originalAst, prefixCount, func, code, lits, vars, true, name, namespace, false, ignoreUnknownNames
        argCode = gen originalAst, prefixCount, arg, funcCode, lits, vars, false, name, namespace, false, ignoreUnknownNames
        #aplCode = if code.debug then wrapContext name, ast, "#{funcCode.main}(#{argCode.main})", top
        #else "#{funcCode.main}(#{argCode.main})"
        aplCode = "#{funcCode.main}(#{argCode.main})"
        argCode.copyWith(aplCode).memoize(deref, name, ast, top)
    else code.addErr "Unknown object type in gen: #{ast}"

generateDispatch = (name, ast, code)->
  type = firstConstrainedArgumentType ast
  code = code.setMethod [type, name, ast.leisureArgNames, code.main]
  code

displayTypeConstraintsFor = (name, ast)->
  "method #{firstConstrainedArgumentType ast}.#{name}(#{ast.leisureArgNames.join(', ')})"

firstConstrainedArgumentType = (ast)->
  for i in [0...ast.leisureArgNames.length]
    arg = ast.leisureArgNames[i]
    type = ast.leisureTypeAssertions[arg]
    if type? then return type[1]
  'null'

freeVar = (ast, vars, globals)->
  if (getAstType ast) == 'ref'
    rv = getRefVar ast
    !ctx[nameSub(rv)] and !vars.find((v)-> v == rv) and !globals.find((v)-> v == rv) and !forward[nameSub(rv)]
  else false

laz = (val)-> -> val

defineToken = (name, def)->
  if def != '=M='
    #tokens[name] = 1
    #if def[1] == '(' then groupOpens[name] = def.substring(2, def.length - 1)
    if def[1] == '(' then Parse.defGroup name, def.substring(2, def.length - 1)
    else if def[1] != ')' then Parse.defToken name
    #else if (def[1] == ')') then groupCloses[name] = 1
    #types = []
    #types.push(i) for i of tokens
    # sort them by length, longest first
    #types.sort (a, b)-> b.length - a.length
    #types = (escapeRegexpChars i for i in types)
    #tokenPat = new RegExp("\\n *|#{types.join '|'}|#{baseTokenPat.source}")

prefix = (name, str)-> (if name.length > 1 then '\\' + name.slice(1).join('. \\') + '.' else '') + str

getNthBody = (ast, n)->
  if n == 1 then ast
  else
    if Parse.getType(ast) != 'lambda' then throw new Error("Error: Expected lambda, but got #{Parse.getType ast}")
    getNthBody(getLambdaBody(ast), n - 1)

defineForward = (name)-> forward[nameSub(name())] = true

# returns [ast, err, rest]
compileNext = (line, globals, parseOnly, check, nomacros, namespace, debug)->
  if line[0] == '='
    rest1 = line.substring 1
    ifParsed (if nomacros then parse rest1 else parseFull rest1), ((ast, rest)->
      ast.leisureCodeOffset = 0
      genCode ast, null, globals, null, rest, parseOnly, namespace, rest1.substring(0, rest1.length - rest.length).trim(), debug), "Error compiling expr #{snip line}"
  else if (def = line.match linePat) and def[1].length != line.length
    [matched, leading, name, defType] = def
    if name[0] == ' '
      name = null
      defType = null
      nm = null
    else [nm, typeAssertions, err] = if defType then parseDecl name else []
    rest1 = line.substring (if defType then matched else leading).length
    if err then [null, err]
    else if nm
      if check and globals.find((v)-> v == nm[0]) then [null, "Attempt to redefine function: #{nm[0]} #{snip rest1}", null]
      else
        if defType && defType != '=' then defineToken(nm[0], defType)
        pfx = (prefix nm, rest1)
        errPrefix = "Error while compiling #{nm}: "
        ifParsed (if nomacros then parse pfx else parseFull pfx), ((ast, rest)->
          ast.leisureCodeOffset = ast.leisureDefPrefix = line.length - pfx.length
          ast.leisureBase = getNthBody(ast, nm.length)
          nameAst(nm[0], ast)
          bod = ast
          if nm.length > 1 then bod = getNthBody(ast, nm.length)
          if getAstType(bod) == 'lambda'
            bod.exprType = nm[0]
            ast.exprDataType = nm[0]
          if nm.length == 1 then nameAst(nm[0], ast)
          ast.leisurePrefixSrcLen = pfx.length
          ast.leisurePrefixCount = nm.length - 1
          ast.leisureSource = pfx.substring(0, pfx.length - rest.length).trim()
          if !isEmpty typeAssertions
            ast.leisureTypeAssertions = typeAssertions
            ast.leisureArgNames = nm
          genCode ast, nm[0], globals, defType, rest, parseOnly, namespace, ast.leisureSource, debug), errPrefix
    else ifParsed (if nomacros then parse rest1 else parseFull rest1), ((ast, rest)->
      ast.leisureCodeOffset = line.length - rest1.length
      ast.leisureBase = ast
      ast.leisureSource = rest1.substring(0, rest1.length - rest.length).trim()
      genCode ast, null, globals, null, rest, parseOnly, namespace, ast.leisureSource, debug), "Error compiling expr:  #{snip line}"
  else [null, null, null]

isEmpty = (obj)->
  for i of obj
    return false
  return true

parseDecl = (name)->
  [scanned, err, rest] = declScanner.scan name
  if err then [null, null, err]
  else
    names = []
    assertions = {}
    while scanned != Nil
      if isAssertion scanned.head() then return [null, null, "Badly type assertion in declaration: assertion must be on an argument name: #{name}"]
      names.push scanned.head().tok()
      if scanned.tail() != Nil and isAssertion scanned.tail().head()
        if scanned.tail().tail() == Nil then return [null, null, "Badly type assertion in declaration -- no type: #{name}"]
        assertions[scanned.head().tok()] = [scanned.tail().head().tok(), scanned.tail().tail().head().tok()]
        scanned = scanned.tail().tail().tail()
      else scanned = scanned.tail()
    [names, assertions]
    #name.trim().split(/\s+/)

isAssertion = (tok)-> tok instanceof Leisure_token and tok.tok() in ['::', ':?']

genCode = (ast, name, globals, defType, rest, parseOnly, namespace, src, debug)->
  if !parseOnly then dgen ast, false, name, globals, defType, namespace, src, debug
  if ast.err? and name? then ast.err = "Error while compiling #{name}: #{ast.err}"
  [ast, ast.err, rest]

#returns [ast, result]
evalNext = (code, namespace, debug)->
  [ast, err, rest] = compileNext code, null, null, null, null, namespace, debug
  if ast
    if ast.leisureName
      try
        nm = nameSub(ast.leisureName)
        if ctx[nm] then evalFunc("#{nm} = null")
        evalCompiledAst(ast)
        result = "Defined: #{ast.leisureName}"
      catch err
        console.log(err.stack)
        result = err
        ast.err = err
      [ast, result]
    else
      try
        result = evalCompiledAst(ast)
      catch err
        ast.err = err
      [ast, result]
  else [{err: err}, err]

parse = (str)->
  ret = Parse.parse str
  if ret[0] then ret[0] = numberAst ret[0], 0
  ret

parseFull = (str)->
  [ast, err, rest] = Parse.parseFull str
  if ast then ast = numberAst(ast, 0)
  [ast, err, rest]

numberAst = (ast, number)->
  switch getAstType ast
    when 'ref', 'lit' then setNumber ast, number
    when 'lambda' then setNumber ast, (numberAst (getLambdaBody ast), number).leisureNodeNumber + 1
    when 'apply' then setNumber ast, (numberAst (getApplyArg ast), (numberAst (getApplyFunc ast), number).leisureNodeNumber + 1).leisureNodeNumber + 1

setNumber = (ast, number)->
  ast.leisureNodeNumber = number
  ast

setEvalFunc = (ct, func)->
  ctx = root.ctx = ct
  root.eval = evalFunc = Parse.evalFunc = func

req = (name, gl)-> processDefs(require(name), gl)

processDefs = (res, gl)->
  if res
    gl = gl ? global
    if res.defs? then for i,v of res.defs
      gl[i] = v
    res.leisureFuncNames = ctx.leisureFuncNames
    res.ctx = ctx
  res

foldLeft = (func, val, array)-> primFoldLeft func, val, array, 0
primFoldLeft = (func, val, array, index)->
  if index < array.length then primFoldLeft func, func(val, array[index]), array, index + 1
  else val

root.setEvalFunc = setEvalFunc
root.eval = evalFunc
root.gen = dgen
root.primGen = gen
root.laz = laz
root.compileNext = compileNext
root.evalNext = evalNext
root.astEval = (ast)-> evalCompiledAst(dgen(ast))
root.linePat = linePat
root.req = req
root.processDefs = processDefs
root.bracket = bracket
root.findFuncs = findFuncs
root.foldLeft = foldLeft
root.defineForward = defineForward
root.funcAstAtOffset = funcAstAtOffset
root.funcAst = funcAst
root.funcContext = funcContext
root.contextStack = Nil
root.funcContextSource = funcContextSource
root.indent = indent
root.parse = parse
root.parseFull = parseFull
root.makeDispatchFunction = makeDispatchFunction
root.createMethod = createMethod
root.noDefaultError = noDefaultError
root.Code = Code
root.getNthBody = getNthBody
root.markLeisureErrors = markLeisureErrors
