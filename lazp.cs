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

id = CTX = lit = ref = lambda = apply = prim = name = null

_refId = -1
_litId = -2
_lambdaId = -3
_applyId = -4
_primId = -5
_nameId = -6
tokenPat = null
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

codeChars = new ->
  @[code.substring(1)] = char for char, code of charCodes
  this

###
     * multiline string
###

getAstType = (f) -> f.id or f.lambda?.id
isPrim = (f)-> getAstType(f) == _primId
first = ()->(a)-> a
second = ()->(a)->(b)-> b()
getNameNm = (n)-> n first
getNameAst = (n)-> n second
getRefVar = (r)-> r(first)()
getLitVal = (l)-> l(first)()
getLambdaVar = (l)-> l first
getLambdaBody = (l)-> l second
getApplyFunc = (a)-> a first
getApplyArg = (a)-> a second
getPrimArg = (p)-> p first
getPrimRest = (p)-> p second
astPrint = (ast, res)->
  isFirst = !res
  res = res or []
  switch getAstType ast
    when _nameId
      res.push 'name ', getNameNm(ast), ' ('
      astPrint getNameAst(ast), res
      res.push ')'
    when _refId
      res.push 'ref '
      val = getRefVar ast
      if val.lambda then throw new Error("Attempt to use lambda in ref, instead of string or number: " + val)
      res.push val
    when _litId
      res.push 'lit '
      val = getLitVal ast
      res.push if val.lambda then "{" + val.lambda.toString() + "}" else val
    when _lambdaId
      res.push 'lambda '
      res.push (getLambdaVar ast)
      res.push ' . '
      astPrint (getLambdaBody ast), res
    when _applyId
      res.push 'apply ('
      astPrint (getApplyFunc ast), res
      res.push ') ('
      astPrint (getApplyArg ast), res
      res.push ')'
    when _primId
      res.push 'prim '
      astPrint (getPrimArg ast), res
      astPrint (getPrimRest ast), res
    else
      throw new Error("Unknown type of object in AST: " + ast)
  isFirst and res.join('')

##

##
# A context is a program scope
##

createContext = ()->
  ctx = (()->
    tokens = {}
    groupOpens = {'(': ')'}
    groupCloses = {')': 1}

    # standard functions
    _eval = ()-> (ast)-> eval(dgen(ast())[0])
    __lit = ()-> (_x)->id ((_f)-> _f()(_x)), _litId
    __ref = ()-> (_x)->id ((_f)-> _f()(_x)), _refId
    __lambda = ()-> (_v)-> id ((_f)-> id ((_g)-> _g()(_v)(_f)), _lambdaId), -1001
    __apply = ()-> (_func)-> id ((_arg)-> id ((_f)-> _f()(_func)(_arg)), _applyId), -1002
    __prim = ()-> (_arg)-> id ((_rest)-> id ((_f)-> _f()(_arg)(_rest)), _primId), -1003
    __name = ()-> (_nm)-> id ((_ast)-> id ((_f)-> _f()(_nm)(_ast)), _nameId), -1004

    id = (func, id)->
      if !id then C.astsById.push(func.name)
      func.context = C
      func.id = id
      func

    nameAst = (nm, ast)-> if !ast.name
      C.astsByName[nm] = ast
      ast.name = nm

    addAst = (ast)-> if !ast.id
      C.astsById.push(ast)
      ast.id = C.astsById.length
      ast

    C =
      tokens: tokens,
      groupOpens: groupOpens,
      groupCloses: groupCloses,
      astsById: [],
      astsByName: {},
      addAst: addAst,
      id: id,
      nameAst: nameAst,
      eval: (str)->eval(str),
      subcontext: ()-> (str)-> eval(str)

    C.astsByName.eval = id(_eval())
    lit = C.astsByName._lit = id(__lit())
    ref = C.astsByName._ref = id(__ref())
    lambda = C.astsByName._lambda = id(__lambda())
    apply = C.astsByName._apply = id(__apply())
    prim = C.astsByName._prim = id(__prim())
    name = C.astsByName._name = id(__name())
    id = C.id

    C
  )()
  ctx.funcId = 0
  CTX = ctx

class Memo
  constructor: ()-> @count = 0
  add: ()-> "memo" + @count++
  toString: ()-> if @count
    ret = 'var '
    for i in [0...@count]
      if i > 0 then ret += ", "
      ret += "memo" + i
    ret += "; "
    ret
  else ''

memoStart = (res, memo, deref)-> if !deref
  mem = memo.add()
  res.push "function(){return ", mem, " || (", mem, " = "

memoEnd = (res, memo, deref)-> if !deref then res.push ")}"

class Cons
  constructor: (@head, @tail)->
  contains: (val)-> @head == val or @tail.contains(val)

class CNil extends Cons
  contains: ()-> false

Nil = new CNil()

dgen = (ast, lazy)->
  mem = new Memo()
  ret = gen ast, [], null, Nil, mem, true
  if mem.count or lazy then [["(function(){", mem, "return " + ret[0] + "})", if !lazy then "()" else ""].join(''), ret[1]] else ret

gen = (ast, res, ctx, vars, memo, deref, prim, cont)->
  isFirst = !ctx
  res = res or []
  ctx = ctx or CTX.subcontext()
  ctx.curLit = 0
  CTX.addAst ast
  switch getAstType ast
    when _nameId
      nm = getNameNm ast
      a = getNameAst ast
      CTX.nameAst nm, a
      gen a, res, ctx, vars, memo
    when _refId
      val = getRefVar ast
      if val.lambda then throw new Error("attempt to use lambda as a variable")
      if !vars.contains(val) and !CTX.astsByName[val] then throw new Error("unbound variable, '" + val + "' -- use lit instead")
      res.push (if !vars.contains(val) then "this." else "") + (nameSub val)
      if deref then res.push "()"
    when _litId
      val = getLitVal ast
      lit
      res.push "(function(){return "
      if typeof val == 'function' or typeof val == 'object'
        lit = "lit" + ctx.curLit++
        ctx "var " + lit
        ctx("(function(v){" + lit + " = v})")(getLitVal ast)
        res.push lit
      else res.push(JSON.stringify val)
      res.push "})"
    when _lambdaId
      v = getLambdaVar ast
      memo = new Memo()
      if !deref then res.push "(function(){return "
      res.push "id(function(" + nameSub(v) + "){", memo, "return "
      gen (getLambdaBody ast), res, ctx, new Cons(v, vars), memo, true
      res.push "}, " + ast.id + ")"
      if !deref then res.push "})"
    when _applyId
      func = getApplyFunc ast
      arg = getApplyArg ast
      memoStart res, memo, deref
      gen func, res, ctx, vars, memo, true
      res.push "("
      gen arg, res, ctx, vars, memo
      res.push ")"
      memoEnd res, memo, deref
    when _primId
      arg = getPrimArg ast
      rest = getPrimRest ast
      if prim
        if cont then res.push ", "
        res.push arg
        if isPrim rest then gen rest, res, ctx, vars, memo, false, true, true
      else
        memoStart res, memo, deref
        res.push arg
        res.push "("
        if isPrim rest then gen rest, res, ctx, vars, memo, true, true, false
        res.push ")"
        memoEnd res, memo, deref
    else throw new Error("Unknown object type in gen: " + ast)
  ast.src = res.join ''
  isFirst and [ast.src, ctx]

laz = (val)-> ()-> val

nameSub = (name)->
  s = '_'
  for i in [0...name.length]
    code = charCodes[name[i]]
    if code
      if !s then s = name.substring 0, i
      s += code
    else if s then s += name[i]
  s or name

defineToken = (name, def)->
  if def != '='
    CTX.tokens[name] = 1
    tokenPat = null
    if def[1] == '(' then CTX.groupOpens[name] = def.substring(2, def.length - 1)
    else if (def[1] == ')') then CTX.groupCloses[name] = 1

prefix = (name, index, expr, pref)->
  if index >= name.length
    pref.push(expr)
    pref.join('')
  else
    pref.push('\\', name[index], '.')
    return prefix(name, index + 1, expr, pref)

createDefinition = (name, ast, index)->
  if index >= name.length then ast
  else lambda(laz(name[index]))(laz(createDefinition(name, ast, index + 1)))

evalLine = (line)->
  def = line.match linePat
  expr = (if def then def[3] else line).trim()
  if expr
    nm = if def and def[1] then def[1].trim().split(/\s+/) else null
    if nm
      if def then defineToken(nm[0], def[2])
      try
        console.log("EXPR:", prefix(nm, 1, expr, []))
        ast = parse(prefix(nm, 1, expr, []))
        # ast = createDefinition(nm, ast, 1)
        CTX.addAst(ast);
        CTX.nameAst(nm[0], ast);
        code = dgen(ast)[0]
        console.log("DEFINE: ", "this.#{nameSub(nm[0])} = #{code}")
        eval("this.#{nameSub(nm[0])} = #{code}")
        result = "Defined: #{nm[0]}"
      catch err
        console.log(err.stack)
        result = err.stack
      [ast, code, result]
    else
      try
        ast = parse(expr)
        code = dgen(ast)[0]
        console.log("EVAL: " + code)
        result = eval(code)
      catch err
        result = err.stack
      [ast, code, result]
  else
    console.log("line: #{line}")
    []

addToken = (tok, group)->
  pat = ''
  CTX.tokens[tok] = group
  tokenPat = null

createTokenPat = ()->
  if !tokenPat
    types = []
    types.push(i) for i of CTX.tokens
    # sort them by length, longest first
    types.sort (a, b)-> b.length - a.length
    for i in [0...types.length]
      s = types[i]
      o = ''
      for p in [0...s.length]
        if specials.indexOf(s[p]) > -1 then o += '\\'
        o += s[p]
      types[i] = o
    types.push '((#define|#strict|#lazy)(?=[ \t]))|[()#.\\\\]| +'
    tokenPat = new RegExp(/'(\\'|[^'])*'|"(\\"|[^"])*"/.source + '|' + types.join('|'))

tokenize = (str)->
  pos = 0
  toks = []
  str = str.replace(/\u03BB/g, '\\')
  createTokenPat()
  while str.length and (pos = str.search(tokenPat)) > -1
    if pos > 0 then toks.push(str.substring(0, pos))
    tok = tokenPat.exec(str.substring pos)[0]
    if tok.trim()
      if tok[0] == '#' && !tok.match(/^#(define|strict|lazy)/) then break
      toks.push(tok)
    str = str.substring pos + tok.length
  if str.length then toks.push(str)
  toks

parse = (str)-> tparse tokenize(str).reverse(), {}

addDef = (toks)->
  t = toks.reverse()
  defs[t[0]] = t.join(' ')

tparse = (toks, vars, expr)->
  cur
  oldVars = {}
  while toks.length
    tok = toks.pop()
    if tok == ')'
      toks.push(tok)
      return expr
    if tok == '\\' then cur = tparseLambda(toks, vars)
    else if tok == '#define'
      addDef(toks)
      toks = []
    else if tok == '#lazy' || tok == '#strict' then cur = tparseVariable(tok, vars, oldVars)
    else
      expectedClose = CTX.groupOpens[tok]
      skip = false
      if expectedClose
        cur = tparse toks, vars, if tok != '(' then tparseVariable(tok, vars, oldVars) else null
        if toks.length && toks[toks.length - 1] == expectedClose then toks.pop()
        skip = true
      if !skip then cur = tparseVariable(tok, vars, oldVars)
    expr = if expr then apply(laz(expr))(laz(cur)) else cur
    if CTX.groupCloses[tok]
      toks.push(tok)
      return expr
  for i of oldVars
    vars[i] = oldVars[i]
  expr

tparseVariable = (tok, vars, oldVars)->
  if vars[tok] or CTX.astsByName[tok]
    vars[tok] = tok
    cur = ref(laz(tok))
  else cur = lit(laz(scanTok(tok)))
  cur

scanTok = (tok)->
  try
    JSON.parse(tok)
  catch err
    tok

tparseLambda = (toks, vars)->
  nm = null
  if toks.length < 3 or toks[toks.length - 1] == '.' then throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '))
  old = vars[nm]
  if toks[toks.length - 2] == '.'
    nm = toks.pop()
    vars[nm] = nm
    toks.pop()
    body = tparse toks, vars
  else
    nm = toks.pop()
    vars[nm] = nm
    body = tparseLambda toks, vars
  vars[nm] = old
  lambda(laz(nm))(laz(body))

createContext()

root = exports ? this
root.parse = parse
root.astPrint = astPrint
root.gen = dgen
root.laz = laz
root.evalLine = evalLine