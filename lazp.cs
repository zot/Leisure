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

###
High level representation of Lambda Calculus AST

Represent ASTs as LC cons-lists
###

if window? and (!global? or global == window)
  window.global = window
  window.Lazp = root = {}
else root = exports ? this

_refId = -1
_litId = -2
_lambdaId = -3
_applyId = -4
_primId = -5
commentPat = /^\s*#/
tokenPat = /'(\\'|[^'])*'|"(\\"|[^"])*"|[()#.\\\\]| +/
specials = '[]().*+?|'
linePat = /^([^=]*)(=[.)]=|=\([^=]+=|=)(?=[^=])(.*)$/
order = []
warnFreeVariable = []
charCodes =
  "'": '$a'
  ',': '$b'
  '$': '$c'
  '@': '$d'
  '?': '$e'
  '/': '$f'
  '*': '$g'
  '&': '$h'
  '^': '$i'
  '!': '$k'
  '`': '$l'
  '~': '$m'
  '-': '$n'
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

codeChars = new -> @[code.substring(1)] = char for char, code of charCodes; this

astsByName = {}
astsById = []
tokens = {}
groupOpens = {'(': ')'}
groupCloses = {')': 1}

# leave a poopie so we can identify whether functions defined in other files are Lazp funcs
define = (name, func) ->
  func.lazpName = name
  func

setDataType = (func, dataType, id)->
  if !id then astsById.push(func) else func.id = id
  if dataType then func.dataType = dataType
  func

setType = (func, type, id)->
  if !id then astsById.push(func) else func.id = id
  if type then func.type = type
  func

setId = (func, id)->
  if !id then astsById.push(func) else func.id = id
  func

nameAst = (nm, ast)-> if !ast.lazpName
  astsByName[nm] = ast
  ast.lazpName = nm
  ast.toString = ->nm

addAst = (ast)->
  if !ast.funcId
    astsById.push(ast)
    ast.funcId = astsById.length
    ast

evalCompiledAst = (ast)-> if ast.lits.length then eval("(function(__lits){\nreturn #{ast.src}})")(ast.lits) else eval(ast.src)

_eval = define 'eval', -> (ast)-> evalCompiledAst(dgen(ast()))

_lit = global._lit = define 'lit', -> (_x)->setId ((_f)-> _f()(_x)), _litId

_ref = global._ref = define 'ref', -> (_x)->setId ((_f)-> _f()(_x)), _refId

_lambda = global._lambda = define 'lambda', -> (_v)-> setId ((_f)-> setId ((_g)-> _g()(_v)(_f)), _lambdaId), -1001

_apply = global._apply = define 'apply', -> (_func)-> setId ((_arg)-> setId ((_f)-> _f()(_func)(_arg)), _applyId), -1002

_prim = global._prim = define 'prim', -> (_arg)-> setId ((_rest)-> setId ((_f)-> _f()(_arg)(_rest)), _primId), -1003

_is = global._is = define 'is', -> (value)-> (type)-> if value()?.type == type().dataType then `_true()` else `_false()`

_eq = global._eq = define 'eq', -> (a)-> (b)->
  if a() == b() then `_true()` else` _false()`

astsByName.eval = setId(_eval())
astsByName.is = setId(_is())
astsByName.eq = setId(_eq())
lit = astsByName.lit = setId(_lit())
ref = astsByName.ref = setId(_ref())
lambda = astsByName.lambda = setId(_lambda())
apply = astsByName.apply = setId(_apply())
prim = astsByName.prim = setId(_prim())
getAstType = (f) -> f.id ? f.lambda?.id
isPrim = (f)-> getAstType(f) == _primId
first = ->(a)-> a
second = ->(a)->(b)-> b()
getRefVar = (r)-> r(first)()
getLitVal = (l)-> l(first)()
getLambdaVar = (l)-> l first
getLambdaBody = (l)-> l second
getApplyFunc = (a)-> a first
getApplyArg = (a)-> a second
getPrimArg = (p)-> p first
getPrimRest = (p)-> p second
getPrimArgs = (p, args)->
  args = args ? []
  p = getPrimRest p
  while isPrim(p)
    args.push(getPrimArg p)
    p = getPrimRest p
  args.push(p)
  args
astPrint = (ast, res)->
  isFirst = !res
  res = res ? []
  switch getAstType ast
    when _refId
      res.push 'ref '
      val = getRefVar ast
      if val.lambda then throw new Error("Attempt to use lambda in ref, instead of string or number: " + val)
      res.push val
    when _litId
      res.push 'lit '
      val = getLitVal ast
      res.push if val?.lambda then "{" + val.lambda.toString() + "}" else val
    when _lambdaId
      res.push 'lambda '
      res.push (getLambdaVar ast)
      res.push ' . '
      astPrint (getLambdaBody ast), res
    when _applyId
      func = getApplyFunc ast
      arg = getApplyArg ast
      res.push 'apply ('
      astPrint (getApplyFunc ast), res
      res.push ') ('
      astPrint (getApplyArg ast), res
      res.push ')'
    when _primId
      res.push 'prim '
      astPrint (getPrimArg ast), res
      astPrint (getPrimRest ast), res
    else throw new Error("Unknown type of object in AST: " + ast)
  isFirst and res.join('')

class Cons
  constructor: (@head, @tail)->
  contains: (val)-> @head == val or @tail.contains(val)
  find: (func)-> func(@head) or @tail.find(func)

class CNil extends Cons
  contains: -> false
  find: ->false

Nil = new CNil()

class Code
  constructor: (@main, @subfuncs, @fcount, @mcount)->
    @main = @main ? ''
    @subfuncs = @subfuncs ? ''
    @fcount = @fcount ? 0
    @mcount = @mcount ? 0
  copyWith: (main, subfuncs, fcount, mcount)->new Code(main ? @main, subfuncs ? @subfuncs, fcount ? @fcount, mcount ? @mcount)
  resetMemo: -> @copyWith(null, null, null, 0)
  reffedValue: (deref)-> if deref then @copyWith(@main + "()") else @
  unreffedValue: (deref)-> if deref then @ else @copyWith("(function(){return #{@main}})")
  subfuncName: -> "subfunc#{@fcount}"
  useSubfunc: (free)-> if !free then @ else @copyWith(@subfuncName(), "#{@subfuncs}var #{@subfuncName()} = #{@main}\n", @fcount + 1)
  memoNames: -> ("memo#{i}" for i in [0...@mcount]).join(', ')
  memo: (deref)->
    if !@mcount then @unreffedValue(deref)
    else @copyWith("(function(){var #{@memoNames()}; return #{@main}})", null, null, 0).reffedValue(deref)

dgen = (ast, lazy, name)->
  ast.lits = []
  res = []
  code = (gen ast, new Code(), ast.lits, Nil, true).memo(!lazy)
  if code.subfuncs.length
    ast.src = """
(function(){
  #{code.subfuncs}
  return #{if name? then "define('#{name}', #{code.main})" else code.main}
})()
    """
  else ast.src = code.main
  ast

gen = (ast, code, lits, vars, deref)->
  addAst ast
  switch getAstType ast
    when _refId
      val = getRefVar ast
      if val.lambda then throw new Error("attempt to use lambda as a variable")
      if !vars.contains(val) and !astsByName[val] then throw new Error("unbound variable, '" + val + "' -- use lit instead")
      code.copyWith(nameSub val).reffedValue(deref)
    when _litId
      val = getLitVal ast
      src = if typeof val == 'function' or typeof val == 'object'
        lits.push(val)
        "(function(){\nreturn __lits[#{lits.length - 1}]\n})"
      else JSON.stringify val
      code.copyWith(src).unreffedValue(deref)
    when _lambdaId
      v = getLambdaVar ast
      bodyCode = gen (getLambdaBody ast), code.resetMemo(), lits, new Cons(v, vars), true
      bodyCode.copyWith("#{if ast.type then 'setType' else if ast.dataType then 'setDataType' else 'setId'}(function(#{nameSub(v)}){return #{bodyCode.main}}#{if ast.type ? ast.dataType ? false then ', "' + (ast.type ? ast.dataType) + '"' else ''})").useSubfunc(!ast.notFree).memo(deref)
    when _applyId
      func = getApplyFunc ast
      arg = getApplyArg ast
      funcCode = gen func, code, lits, vars, true
      argCode = gen arg, funcCode, lits, vars
      argCode.copyWith("#{funcCode.main}(#{argCode.main})").unreffedValue(deref)
    when _primId
      args = for arg in getPrimArgs ast
        code = gen arg, code, lits, vars, true
      code.copyWith("#{getPrimArg ast}(#{args.map(a -> a.main).join(', ')})")
      code.unreffedValue(deref)
    else throw new Error("Unknown object type in gen: " + ast)

laz = (val)-> -> val

nameSub = (name)->
  s = '_'
  for i in [0...name.length]
    code = charCodes[name[i]]
    s += code ? name[i]
  s

defineToken = (name, def)->
  if def != '='
    tokens[name] = 1
    if def[1] == '(' then groupOpens[name] = def.substring(2, def.length - 1)
    else if (def[1] == ')') then groupCloses[name] = 1
    types = []
    types.push(i) for i of tokens
    # sort them by length, longest first
    types.sort (a, b)-> b.length - a.length
    for i in [0...types.length]
      s = types[i]
      o = ''
      for p in [0...s.length]
        if specials.indexOf(s[p]) > -1 then o += '\\'
        o += s[p]
      types[i] = o
    types.push '[()#.\\\\]| +'
    tokenPat = new RegExp(/'(\\'|[^'])*'|"(\\"|[^"])*"/.source + '|' + types.join('|'))


createDefinition = (name, ast, index)->
  if index >= name.length then ast
  else lambda(laz(name[index]))(laz(createDefinition(name, ast, index + 1)))

prefix = (name, index, expr, res)->
  if index >= name.length
    res.push(expr)
    res.join('')
  else
    res.push("\\", name[index], '.')
    prefix(name, index + 1, expr, res)

getNthBody = (ast, n)-> if n == 1 then ast else getNthBody(getLambdaBody(ast), n - 1)

compileLine = (line)->
  if line.match commentPat then line = ''
  if true
    def = line.match linePat
    expr = (if def then def[3] else line).trim()
    if expr
      nm = if def and def[1] then def[1].trim().split(/\s+/) else null
      ast = null
      if nm
        astsByName[nm[0]] = 1
        if def then defineToken(nm[0], def[2])
        ast = parse(prefix(nm, 1, expr, []))
        if nm.length > 1
          bod = getNthBody(ast, nm.length)
          if getAstType(bod) == _lambdaId
            bod.type = nm[0]
            ast.dataType = nm[0]
          addAst(ast)
        nameAst(nm[0], ast)
        dgen(ast, true, nm[0])
        if nm.length == 1
          nameAst(nm[0], ast);
          ast.src = "#{nameSub(nm[0])} = setId(#{ast.src}, null, '#{ast.lazpName}')"
        else ast.src = "#{nameSub(nm[0])} = #{ast.src}"
      else
        ast = parse(expr)
        dgen(ast)
      ast
  else console.log("comment: #{line}")

evalLine = (line)->
  ast = compileLine line
  if ast
    if ast.lazpName
      try
        evalCompiledAst(ast)
        result = "Defined: #{ast.lazpName}"
      catch err
        console.log(err.stack)
        result = err.stack
      [ast, result]
    else
      try
        result = evalCompiledAst(ast)
      catch err
        result = err.stack
      [ast, result]
  else []

tokenize = (str)->
  toks = []
  pos = 0
  str = str.replace(/\u03BB/g, '\\')
  while str.length and (pos = str.search(tokenPat)) > -1
    if pos > 0 then toks.push(str.substring(0, pos))
    tok = tokenPat.exec(str.substring pos)[0]
    if tok.trim() then toks.push(tok)
    str = str.substring pos + tok.length
  if str.length then toks.push(str)
  toks

parse = (str)-> tparse tokenize(str).reverse(), Nil

addDef = (toks)->
  t = toks.reverse()
  defs[t[0]] = t.join(' ')

tparse = (toks, vars, expr)->
  cur
  while toks.length
    tok = toks.pop()
    if tok == ')'
      toks.push(tok)
      return expr
    if tok == '\\' then cur = tparseLambda(toks, vars)
    else
      expectedClose = groupOpens[tok]
      skip = false
      if expectedClose
        cur = tparse toks, vars, if tok != '(' then tparseVariable(tok, vars) else null
        if toks.length && toks[toks.length - 1] == expectedClose then toks.pop()
        skip = true
      if !skip then cur = tparseVariable(tok, vars)
    expr = if expr
        ast = apply(laz(expr))(laz(cur))
        ast.notFree = expr.notFree || cur.notFree
        ast
      else cur
    if groupCloses[tok]
      toks.push(tok)
      return expr
  expr

tparseVariable = (tok, vars)->
  if global[nameSub(tok)]?.lazpName == tok or astsByName[tok] then ref(laz(tok))
  else
    path = []
    if (vars.find (v)-> tok == v.name or !path.push(v))
      v.notFree = true for v in path
      ref(laz(tok))
    else lit(laz(scanTok(tok)))

scanTok = (tok)->
  try
    JSON.parse(tok)
  catch err
    tok

tparseLambda = (toks, vars)->
  nm = null
  v = {notFree: false}
  if toks.length < 3 or toks[toks.length - 1] == '.' then throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '))
  if toks[toks.length - 2] == '.'
    nm = toks.pop()
    toks.pop()
    v.name = nm
    body = tparse toks, new Cons(v, vars)
  else
    nm = toks.pop()
    v.name = nm
    body = tparseLambda toks, new Cons(v, vars)
  ast = lambda(laz(nm))(laz(body))
  ast.notFree = v.notFree
  ast

root.parse = parse
root.astPrint = astPrint
root.gen = dgen
root.laz = laz
root.compileLine = compileLine
root.evalLine = evalLine
root.setId = setId
root.setType = setType
root.setDataType = setDataType
root.astEval = (ast)-> evalCompiledAst(dgen(ast))
root.define = define
root.getAstType = getAstType
