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
else root = exports ? this

escapeRegexpChars = (str)-> str.replace /([\][().\\*+?{}|])/g, '\\$1'

forward = {}
baseTokenPat = /[().\\]| +|[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*(\n|$)/
tokenPat = new RegExp("\\n *|#{baseTokenPat.source}")
linePat = /^((?:\s*\n|#[^\n]*\n)*)([^=\n]*)(=[.)M]=|=\([^=]+=|=)?/
#linePat = /^((?:\s*\n|#[^\n]*\n)*)([a-zA-Z0-9!@#$%\^&*\-_+=[\]{}|:;,<>/? ]*)(=[.)M]=|=\([^=]+=|=)?/
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

codeChars = new -> @[code.substring(1)] = char for char, code of charCodes; this

global.leisureFuncs = {}
global.macros = {}
tokens = {}
groupOpens = {'(': ')'}
groupCloses = {')': 1}

nameSub = (name)->
  s = '_'
  for i in [0...name.length]
    code = charCodes[name[i]]
    s += code ? name[i]
  s

ctx = global

evalFunc = eval

class Cons
  constructor: (@head, @tail)->
  find: (func)-> func(@head) or @tail.find(func)
  removeAll: (func)->
    t = @tail.removeAll(func)
    if func(@head) then t else if t == @tail then @ else cons(@head, t)
  foldl: (arg, func)-> func(@tail.foldl(arg, func), @head)
  toArray: -> @reverse().foldl [], ((i, el)-> i.push(el); i)
  toString: -> "Cons(#{@toArray().join(', ')})"
  reverse: -> @rev Nil
  rev: (result)-> @tail.rev cons(@head, result)
  equals: (other)-> other?.constructor == Cons and (@head == other.head or (@head?.constructor == Cons and @head.equals(other.head))) and (@tail == other.tail or (@tail?.constructor == Cons and @tail.equals(other.tail)))
  each: (block)->
    block(@head)
    @tail.each(block)

class CNil extends Cons
  find: -> false
  removeAll: -> @
  foldl: (arg, func)-> arg
  rev: (result)-> result
  equals: (other)-> other?.constructor == CNil
  each: ->

Nil = new CNil()
cons = (a, b)-> new Cons(a, b)
dlempty = (x)->x
dlnew = (a)->(b)-> cons(a, b)
dlappend = (a, b)->(c)-> a(b(c))
append = (a, b)-> if a == Nil then b else cons a.head, append(a.tail, b)

global.leisureFuncNames = ll = Nil

global.leisureAddFunc = (nm)-> global.leisureFuncNames = ll = cons(nm, ll)

global.leisureGetFuncs = -> ll

global.noredefs = true

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
  func = global[Leisure.nameSub(funcName)]()
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

# use AST, instead of arity?
define = (name, func, arity, src) ->
  func.src = src
  func.leisureContexts = []
  nm = nameSub(name)
  func.leisureName = name
  func.leisureArity = arity
  if global.noredefs and ctx[nm]? then throw new Error("[DEF] Attempt to redefine definition: #{name}")
  f = -> func
  ctx[nm] = ctx.leisureFuncs[nm] = f
  (evalFunc 'leisureAddFunc')(name)
  f

defineMacro = (name, func)-> ctx.macros[name] = func

setDataType = (func, dataType)->
  if dataType then func.dataType = dataType
  func

setType = (func, type)->
  if type then func.type = type
  func

nameAst = (nm, ast)-> if !ast.leisureName
  ast.leisureName = nm
  ast.toString = ->"{#{nm}}"

evalCompiledAst = (ast)-> if ast.lits.length then evalFunc("(function(__lits){\nreturn #{ast.src}})")(ast.lits) else evalFunc(ast.src)

define 'eval', (ast)-> evalCompiledAst(dgen(substituteMacros ast()))

define 'lit', setDataType ((_x)->setType ((_f)-> _f()(_x)), 'lit'), 'lit'

define 'ref', setDataType ((_x)->setType ((_f)-> _f()(_x)), 'ref'), 'ref'

define 'lambda', setDataType ((_v)-> (_f)-> setType ((_g)-> _g()(_v)(_f)), 'lambda'), 'lambda'

define 'apply', setDataType ((_func)-> (_arg)-> setType ((_f)-> _f()(_func)(_arg)), 'apply'), 'apply'

getType = (f)->
  t = typeof f
  (t == 'function' and f?.type) or "*#{t}"

lit = _lit()
ref = _ref()
lambda = _lambda()
apply = _apply()
getAstType = (f) -> f.type
first = ->(a)-> a
second = ->(a)->(b)-> b()
getRefVar = (r)-> r(first)()
getLitVal = (l)-> l(first)()
getLambdaVar = (l)-> l first
getLambdaBody = (l)-> l second
getApplyFunc = (a)-> a first
getApplyArg = (a)-> a second

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

wrapContextVars = (name, ast, code, top)->"""
(function(){
  var ctx = Leisure.contextStack
  #{indent code}
})()
  """

indent = (str, amt)->
  amt = amt ? 2
  idt = '\n'
  for i in [0..amt]
    idt += ' '
  str.replace /\n/g, idt

wrapContext = (name, ast, code, top)->
  if name? then wrapContextVars name, ast, wrapContextBody(name, ast, code, top), top
  else code

wrapLazyContext = (name, ast, code, top)->
  if name? then wrapContextVars name, ast, "return function(){#{indent wrapContextBody(name, ast, code, top)}};", top
  else "(function(){return #{code}})"

wrapContextBody = (name, ast, code, top)->"""
  #{if top then '' else "var oldCtx = ctx;\n  "}
  var ctx = Leisure.contextStack;
  Leisure.contextStack = Leisure.cons(Leisure.funcContext('#{name}', #{ast.leisureNodeNumber}), #{if top then 'ctx' else 'oldCtx'})
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

class Code
  constructor: (@main, @vars, @err, @global, @debug)->
    @main = @main ? ''
    @vars = @vars ? Nil
    @err = @err ? ''
    @global = @global ? Nil
  copyWith: (main, vars, err, global, debug)->new Code(main ? @main, vars ? @vars, err ? @err, global ? @global, debug ? @debug)
  setVars: (v)-> @copyWith(null, v)
  addVar: (v)-> @copyWith(null, cons(v, @vars))
  addErr: (e)-> @copyWith(null, null, "#{@err}#{e}\n")
  setGlobal: (v)-> @copyWith(null, null, null, v)
  setDebug: (d)-> @copyWith(null, null, null, null, d)
  reffedValue: (deref)-> if deref then @copyWith(@main + "()") else @
  unreffedValue: (deref, name, ast, top)-> if deref then @ else @lazy(name, ast, top)
  memoize: (deref, name, ast, top)->
    if deref then @
    else
      tmp = @copyWith("$m || ($m = (#{@main}))").lazy(name, ast, top)
      tmp.copyWith "(function(){var $m; return #{tmp.main}})()"
  lazy: (name, ast, top)->
    if !@debug or !(name? and ast.leisureNodeNumber?) then @copyWith("(function(){return #{@main}})")
    else @copyWith (wrapLazyContext name, ast, @main, top)
  grabContext: (ast)->
    if getAstType ast == 'lambda' then @copyWith """

    """ else @copyWith """
    """

dgen = (ast, lazy, name, globals, tokenDef, namespace, src, debug)->
  ast.lits = []
  res = []
  code = (gen ast, new Code().setDebug(debug).setGlobal(cons(name, globals ? Nil)), ast.lits, Nil, true, name, namespace, true)
  if code.err != '' then ast.err = code.err
  else
    jsCode = if !debug or getAstType == 'apply' or !name then "(#{code.main})" else wrapContext name, ast, code.main, true
    ast.src = if name? then """
#{namespace ? ''}#{if tokenDef == '=M=' then 'defineMacro' else 'define'}('#{name}', #{jsCode}, #{(ast.leisurePrefixCount || 1) - 1}, #{if src then JSON.stringify(src) else '""'});#{if tokenDef? and tokenDef != '=' then "\nroot.tokenDefs.push('#{name}', '#{tokenDef}');" else ''}

""" else jsCode
  ast.globals = code.global
  ast

wrap = (name, ast, v, body, namespace, debug)->
  body = "function(#{v}){return #{body};}"
  if !ast.exprType? and !ast.exprDataType then body
  else
    """
#{namespace ? ''}#{if ast.exprType then 'setType' else 'setDataType'}(#{body}, '#{ast.exprType ? ast.exprDataType}')
    """

gen = (ast, code, lits, vars, deref, name, namespace, top)->
  switch getAstType ast
    when 'ref'
      val = getRefVar ast
      if val.lambda then code.addErr "attempt to use lambda as a variable"
      else
        code = code.copyWith(nameSub val).reffedValue(deref)
        if vars.find((v)-> v == val) then code.addVar(val)
        else if ctx[nameSub(val)]? or code.global.find((v)-> v == val) or forward[nameSub(val)]? then code
        else if typeof val == 'number' then code.copyWith(JSON.stringify(scanTok(val))).unreffedValue(deref, name, ast, top)
        else code.addErr "attempt to use free variable: #{val}"
    when 'lit'
      val = getLitVal ast
      src = if typeof val == 'function' or typeof val == 'object'
        lits.push(val)
        "(function(){\nreturn __lits[#{lits.length - 1}]\n})"
      else JSON.stringify val
      code.copyWith(src).unreffedValue(deref, name, ast, top)
    when 'lambda'
      v = getLambdaVar ast
      bodyCode = (gen (getLambdaBody ast), code, lits, cons(v, vars), true, name, namespace, false)
      bodyCode = bodyCode.setVars(bodyCode.vars.removeAll (bv)-> bv == v)
      bodyCode.copyWith(wrap(name, ast, nameSub(v), bodyCode.main, namespace)).memoize(deref, name, ast, top)
    when 'apply'
      func = getApplyFunc ast
      if getAstType func == 'lit' then code.addErr "Attempt to use lit as function: #{getLitVal func}"
      else if freeVar func, vars, code.global then code.addErr "Attempt to use free variable as function: #{getRefVar func}"
      else
        arg = getApplyArg ast
        funcCode = gen func, code, lits, vars, true, name, namespace, false
        argCode = gen arg, funcCode, lits, vars, false, name, namespace, false
        aplCode = if code.debug then wrapContext name, ast, "#{funcCode.main}(#{argCode.main})", top
        else "#{funcCode.main}(#{argCode.main})"
        argCode.copyWith(aplCode).memoize(deref, name, ast, top)
    else code.addErr "Unknown object type in gen: #{ast}"

freeVar = (ast, vars, globals)->
  if (getAstType ast) == 'ref'
    rv = getRefVar ast
    !ctx[nameSub(rv)] and !vars.find((v)-> v == rv) and !globals.find((v)-> v == rv) and !forward[nameSub(rv)]
  else false

laz = (val)-> -> val

defineToken = (name, def)->
  if def != '=M='
    tokens[name] = 1
    if def[1] == '(' then groupOpens[name] = def.substring(2, def.length - 1)
    else if (def[1] == ')') then groupCloses[name] = 1
    types = []
    types.push(i) for i of tokens
    # sort them by length, longest first
    types.sort (a, b)-> b.length - a.length
    types = (escapeRegexpChars i for i in types)
    tokenPat = new RegExp("\\n *|#{types.join '|'}|#{baseTokenPat.source}")

prefix = (name, str)-> (if name.length > 1 then '\\' + name.slice(1).join('. \\') + '.' else '') + str

getNthBody = (ast, n)-> if n == 1 then ast else getNthBody(getLambdaBody(ast), n - 1)

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
    else nm = if defType then name.trim().split(/\s+/) else null
    rest1 = line.substring (if defType then matched else leading).length
    if nm
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
          ast.leisurePrefixCount = nm.length
          ast.leisureSource = pfx.substring(0, pfx.length - rest.length).trim()
          genCode ast, nm[0], globals, defType, rest, parseOnly, namespace, ast.leisureSource, debug), errPrefix
    else ifParsed (if nomacros then parse rest1 else parseFull rest1), ((ast, rest)->
      ast.leisureCodeOffset = line.length - rest1.length
      ast.leisureBase = ast
      ast.leisureSource = rest1.substring(0, rest1.length - rest.length).trim()
      genCode ast, null, globals, null, rest, parseOnly, namespace, ast.leisureSource, debug), "Error compiling expr:  #{snip line}"
  else [null, null, null]

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
  ret = parseApply str, Nil, '\n', str.length
  #if !ret[2] then ret[0] = numberAst ret[0], 0
  if ret[0] then ret[0] = numberAst ret[0], 0
  ret

parseFull = (str)->
  [ast, err, rest] = parseApply str, Nil, '\n', str.length
  if ast then ast = substituteMacros(ast)
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

substituteMacros = (ast)->
  switch getAstType ast
    when 'ref', 'lit' then ast
    when 'lambda'
      body = getLambdaBody ast
      b = substituteMacros body
      if b == body then ast
      else lambda(laz getLambdaVar ast)(laz b)
    when 'apply'
      macro = getMacro ast
      if macro then substituteMacros (macro laz ast)
      else
        func = getApplyFunc ast
        arg = getApplyArg ast
        f = substituteMacros func
        a = substituteMacros arg
        if a == arg and f == func then ast
        else apply(laz f)(laz a)

getMacro = (ast)->
  if getAstType(ast) == 'ref' then ctx.macros[getRefVar ast] ? null
  else if getAstType(ast) == 'apply' then getMacro getApplyFunc ast
  else null

scanTok = (tok)->
  try
    JSON.parse(tok)
  catch err
    tok

scanName = (name)->
  try
    l = JSON.parse(name)
    if typeof l == 'string' then lit(laz(l))
    else if typeof l == 'number' then ref(laz(l))
    else ref(laz(name))
  catch err
    ref(laz(name))

eatAllWhitespace = (str)->
  m = str.match /^(\s+|;)/
  if m then str.substring(m[0].length)
  else str

setEvalFunc = (ct, func)->
  ctx = root.ctx = ct
  root.eval = evalFunc = func

req = (name, gl)-> processDefs(require(name), gl)

processDefs = (res, gl)->
  if res
    gl = gl ? global
    if res.defs? then for i,v of res.defs
      gl[i] = v
    processTokenDefs res.tokenDefs
    res.leisureFuncNames = ctx.leisureFuncNames
    res.ctx = ctx
  res

processTokenDefs = (defs)->
  if defs? then for i in [0...defs.length] by 2
    defineToken defs[i], defs[i + 1]

# returns [tok, rest]
nextTok = (str)->
  m = str.match(tokenPat)
  if !m then [str, '']
  else if m.index > 0 then [str.substring(0, m.index), str.substring(m.index)]
  else
    rest = str.substring(m.index + m[0].length)
    if m[0][0] == '#' or m[0][0] == ' ' or (m[0][0] == '\n' and rest[0] == '\n') then nextTok rest
    else [m[0], rest]

tag = (start, end, ast)->
  ast.leisureStart = start
  ast.leisureEnd = end
  ast

pos = (str, totalLen)-> totalLen - str.length

tokPos = (tok, str, totalLen)-> totalLen - str.length - tok.length

ifParsed = (res, block, errPrefix)->
  if res[1] then [res[0], errPrefix + res[1], res[2]]
  else block res[0], res[2]

snip = (str)->"[#{str.substring 0, 80}]"

# returns [ast, err, rest]
parseApply = (str, vars, indent, totalLen)->
  if !str then [null, null, str]
  else
    [tok, rest] = nextTok str
    if !tok or tok[0] == '\n' then [null, "expecting expression #{snip str}\n#{new Error().stack}", rest]
    else if groupCloses[tok] then [null, "Unexpected group close: #{tok} #{snip rest}", rest]
    else ifParsed (parseTerm tok, rest, vars, indent, totalLen), (func, rest)->continueApply(func, rest, vars, indent, totalLen)

continueApply = (func, str, vars, indent, totalLen)->
  [tok, rest] = nextTok str
  if !tok or (tok[0] == '\n' and tok.length <= indent.length) or groupCloses[tok]
    [func, null, str]
  else
    parsedArg = if tok[0] == '\n'
      parseApply rest, vars, tok, totalLen
    else parseTerm tok, rest, vars, indent, totalLen
    ifParsed parsedArg, (arg, rest)->
      continueApply tag(func.leisureStart, arg.leisureEnd, apply(laz(func))(laz(arg))), rest, vars, indent, totalLen

parseTerm = (tok, rest, vars, indent, totalLen)->
  if tok == '\\' then parseLambda rest, vars, indent, totalLen
  else if groupOpens[tok]
    apl = if tok == '(' then parseApply rest, vars, indent, totalLen
    else ifParsed (parseName tok, rest, vars, totalLen), (ast, rest2)->
      continueApply ast, rest2, vars, indent, totalLen
    ifParsed apl, (ast, rest3)->
      [tok4, rest4] = nextTok rest3
      if tok4 != groupOpens[tok] then [ast, "Expected close token: #{groupOpens[tok]}, but got #{tok4}", rest4]
      else if tok == '(' then [tag(tokPos(tok, rest, totalLen), pos(rest4, totalLen), ast), null, rest4]
      else ifParsed (parseName tok4, rest4, vars, totalLen), (arg, rest5)->
        [tag(tokPos(tok, rest, totalLen), pos(rest4, totalLen), apply(laz(ast))(laz(arg))), null, rest5]
  else parseName tok, rest, vars, totalLen

parseName = (tok, rest, vars, totalLen)->
  name = if tok[0] == "'" then lit(laz(tok.substring(1, tok.length - 1)))
  else if tok[0] == '"' then lit(laz(scanTok(tok)))
  else if tok[0] == '`' then ref(laz(tok.substring(1, tok.length - 1)))
  else if (vars.find (v)-> tok == v) then ref(laz(tok))
  else scanName(tok)
  [tag(tokPos(tok, rest, totalLen), pos(rest, totalLen), name), null, rest]

nextTokIgnoreNL = (str)->
  [tok, rest] = r = nextTok str
  if tok and (tok[0] == '\n' or tok[0] == ' ') then nextTok rest
  r

parseLambda = (str, vars, indent, totalLen)->
  [nm, rest1] = nextTokIgnoreNL str
  [tok2, rest2] = nextTokIgnoreNL rest1
  apl = if tok2 == '.' then parseApply (eatAllWhitespace rest2), cons(nm, vars), indent, totalLen
  else parseLambda rest1, cons(nm, vars), indent, totalLen
  ifParsed apl, (body, rest2)->
    ast = lambda(laz(nm))(laz(body))
    ast.leisureNameEnd = pos(rest1, totalLen)
    [tag(tokPos(nm, rest1, totalLen), body.leisureEnd, ast), null, rest2]

foldLeft = (func, val, array)-> primFoldLeft func, val, array, 0
primFoldLeft = (func, val, array, index)->
  if index < array.length then primFoldLeft func, func(val, array[index]), array, index + 1
  else val

root.processTokenDefs = processTokenDefs
root.setEvalFunc = setEvalFunc
root.eval = evalFunc
root.parseFull = parseFull
root.gen = dgen
root.laz = laz
root.compileNext = compileNext
root.evalNext = evalNext
root.setType = setType
root.setDataType = setDataType
root.astEval = (ast)-> evalCompiledAst(dgen(ast))
root.define = define
root.defineMacro = defineMacro
root.getAstType = getAstType
root.getRefVar = getRefVar
root.getLitVal = getLitVal
root.getLambdaVar = getLambdaVar
root.getLambdaBody = getLambdaBody
root.getApplyFunc = getApplyFunc
root.getApplyArg = getApplyArg
root.getType = getType
root.linePat = linePat
root.Nil = Nil
root.cons = cons
root.append = append
root.defineToken = defineToken
root.req = req
root.nameSub = nameSub
root.processDefs = processDefs
root.parseApply = parseApply
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
