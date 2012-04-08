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
  window.Lazp = root = {}
else root = exports ? this

root.funcs = {}

baseTokenPat = /'(\\'|[^'])*'|"(\\"|[^"])*"|[().\\]| +|#[^\n]*\n|\n/
tokenPat = baseTokenPat
specials = '[]().*+?|'
linePat = /^((?:\s*|#[^\n]*\n)*)([^=\n]*)(=[.)]=|=\([^=]+=|=)?/
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
tokens = {}
groupOpens = {'(': ')'}
groupCloses = {')': 1}

nameSub = (name)->
  s = '_'
  for i in [0...name.length]
    code = charCodes[name[i]]
    s += code ? name[i]
  s

# leave a poopie so we can identify whether functions defined in other files are Lazp funcs
define = (name, func) ->
  nm = nameSub(name)
  global[nm] = -> func
  root.funcs[name] = func
  astsByName[name] = func
  func.lazpName = name
  func

setDataType = (func, dataType, id)->
  if dataType then func.dataType = dataType
  func

setType = (func, type, id)->
  if type then func.type = type
  func

nameAst = (nm, ast)-> if !ast.lazpName
  astsByName[nm] = ast
  ast.lazpName = nm
  ast.toString = ->nm

evalCompiledAst = (ast)-> if ast.lits.length then eval("(function(__lits){\nreturn #{ast.src}})")(ast.lits) else eval(ast.src)

define 'eval', (ast)-> evalCompiledAst(dgen(ast()))

define 'lit', (_x)->setType ((_f)-> _f()(_x)), 'lit'

define 'ref', (_x)->setType ((_f)-> _f()(_x)), 'ref'

define 'lambda', (_v)-> (_f)-> setType ((_g)-> _g()(_v)(_f)), 'lambda'

define 'apply', (_func)-> (_arg)-> setType ((_f)-> _f()(_func)(_arg)), 'apply'

getType = (f)->
  t = typeof f
  (t == 'function' and f?.type) or "*#{t}"

lit = root.funcs.lit
ref = root.funcs.ref
lambda = root.funcs.lambda
apply = root.funcs.apply
getAstType = (f) -> f.type
first = ->(a)-> a
second = ->(a)->(b)-> b()
getRefVar = (r)-> r(first)()
getLitVal = (l)-> l(first)()
getLambdaVar = (l)-> l first
getLambdaBody = (l)-> l second
getApplyFunc = (a)-> a first
getApplyArg = (a)-> a second
astPrint = (ast, res)->
  isFirst = !res
  res = res ? []
  switch getAstType ast
    when 'ref'
      res.push 'ref '
      val = getRefVar ast
      if val.lambda then throw new Error("Attempt to use lambda in ref, instead of string or number: " + val)
      res.push val
    when 'lit'
      res.push 'lit '
      val = getLitVal ast
      res.push if val?.lambda then "{" + val.lambda.toString() + "}" else val
    when 'lambda'
      res.push 'lambda '
      res.push (getLambdaVar ast)
      res.push ' . '
      astPrint (getLambdaBody ast), res
    when 'apply'
      func = getApplyFunc ast
      arg = getApplyArg ast
      res.push 'apply ('
      astPrint (getApplyFunc ast), res
      res.push ') ('
      astPrint (getApplyArg ast), res
      res.push ')'
    else throw new Error("Unknown type of object in AST: " + ast)
  isFirst and res.join('')

class Cons
  constructor: (@head, @tail)->
  find: (func)-> func(@head) or @tail.find(func)
  removeAll: (func)->
    t = @tail.removeAll(func)
    if func(@head) then t else if t == @tail then @ else cons(@head, t)
  foldl: (arg, func)-> func(@tail.foldl(arg, func), @head)
  toArray: -> @foldl [], ((i, el)-> i.push(el); i)
  toString: -> "Cons(#{@toArray().join(', ')})"

class CNil extends Cons
  find: -> false
  removeAll: -> @
  foldl: (arg, func)-> arg

Nil = new CNil()
cons = (a, b)-> new Cons(a, b)

class Code
  constructor: (@main, @subfuncs, @fcount, @mcount, @vars, @err, @global)->
    @main = @main ? ''
    @subfuncs = @subfuncs ? ''
    @fcount = @fcount ? 0
    @mcount = @mcount ? 0
    @vars = @vars ? Nil
    @err = @err ? ''
    @global = @global ? Nil
  copyWith: (main, subfuncs, fcount, mcount, vars, err, global)->new Code(main ? @main, subfuncs ? @subfuncs, fcount ? @fcount, mcount ? @mcount, vars ? @vars, err ? @err, global ? @global)
  addErr: (e)-> @copyWith(null, null, null, null, null, "#{@err}#{e}\n")
  setGlobal: (v)-> @copyWith(null, null, null, null, null, null, v)
  addVar: (v)-> @copyWith(null, null, null, null, cons(v, @vars), null)
  setVars: (v)-> @copyWith(null, null, null, null, v, null)
  resetMemo: -> @copyWith(null, null, null, 0)
  reffedValue: (deref)-> if deref then @copyWith(@main + "()") else @
  unreffedValue: (deref)-> if deref then @ else @copyWith("(function(){return #{@main}})")
  subfuncName: -> "subfunc#{@fcount}"
  useSubfunc: (closed)-> if !closed then @ else @copyWith(@subfuncName(), "#{@subfuncs}var #{@subfuncName()} = #{@main}\n", @fcount + 1)
  memoNames: -> ("memo#{i}" for i in [0...@mcount]).join(', ')
  memo: (deref)->
    if !@mcount then @unreffedValue(deref)
    else @copyWith("(function(){var #{@memoNames()}; return #{@main}})", null, null, 0).reffedValue(deref)

dgen = (ast, lazy, name, globals, tokenDef)->
  ast.lits = []
  res = []
  code = (gen ast, new Code().setGlobal(cons(name, globals ? Nil)), ast.lits, Nil, true).memo(!lazy)
  if code.err != '' then ast.err = code.err
  else if code.subfuncs.length then ast.src = """
(function(){#{if tokenDef? and tokenDef != '=' then "defineToken('#{name}', '#{tokenDef}')\n" else ''}
  #{code.subfuncs}
  return #{if name? then "define('#{name}', #{code.main})" else code.main}
})()
    """
  else ast.src = if name? then "define('#{name}', #{code.main})" else "(#{code.main})"
  ast.globals = code.global
  ast

wrap = (ast, src)->
  if !ast.exprType? and !ast.exprDataType then src
  else "#{if ast.exprType then 'setType' else 'setDataType'}(#{src}, '#{ast.exprType ? ast.exprDataType}')"

gen = (ast, code, lits, vars, deref)->
  switch getAstType ast
    when 'ref'
      val = getRefVar ast
      if val.lambda then code.addErr "attempt to use lambda as a variable"
      else
        code = code.copyWith(nameSub val).reffedValue(deref)
        if vars.find((v)-> v == val) then code.addVar(val)
        else if global[nameSub(val)]? or code.global.find((v)-> v == val) then code
        else code.addErr "Referenced free variable: #{val}, use lit, instead of ref."
    when 'lit'
      val = getLitVal ast
      src = if typeof val == 'function' or typeof val == 'object'
        lits.push(val)
        "(function(){\nreturn __lits[#{lits.length - 1}]\n})"
      else JSON.stringify val
      code.copyWith(src).unreffedValue(deref)
    when 'lambda'
      v = getLambdaVar ast
      bodyCode = (gen (getLambdaBody ast), code.resetMemo(), lits, cons(v, vars), true)
      bodyCode = bodyCode.setVars(bodyCode.vars.removeAll (bv)-> bv == v)
      bodyCode.copyWith(wrap(ast, "function(#{nameSub(v)}){return #{bodyCode.main}}")).useSubfunc(bodyCode.vars == Nil).memo(deref)
    when 'apply'
      func = getApplyFunc ast
      if getAstType func == 'lit' then code.addErr "Attempt to use lit as function: #{getLitVal func}"
      else
        arg = getApplyArg ast
        funcCode = gen func, code, lits, vars, true
        argCode = gen arg, funcCode, lits, vars
        argCode.copyWith("#{funcCode.main}(#{argCode.main})").unreffedValue(deref)
    else code.addErr "Unknown object type in gen: #{ast}"

laz = (val)-> -> val

defineToken = (name, def)->
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
  types.push '[().\\\\]| +'
  tokenPat =  new RegExp(baseTokenPat.source + '|' + types.join('|'))


createDefinition = (name, ast, index)->
  if index >= name.length then ast
  else lambda(laz(name[index]))(laz(createDefinition(name, ast, index + 1)))

prefix = (name, str)-> (if name.length > 1 then '\\' + name.slice(1).join('. \\') + '.' else '') + str

getNthBody = (ast, n)-> if n == 1 then ast else getNthBody(getLambdaBody(ast), n - 1)

# returns [ast, err, rest]
compileNext = (line, globals, parseOnly)->
  if (def = line.match linePat) and def[1].length != line.length
    [matched, leading, name, defType] = def
    rest1 = line.substring (if defType then matched else leading).length
    nm = if defType then name.trim().split(/\s+/) else null
    if nm
      astsByName[nm[0]] = 1
      if defType && defType != '=' then defineToken(nm[0], defType)
      ifParsed (parseApply (prefix nm, rest1), Nil), (ast, rest)->
        bod = ast
        if nm.length > 1 then bod = getNthBody(ast, nm.length)
        if getAstType(bod) == 'lambda'
          bod.exprType = nm[0]
          ast.exprDataType = nm[0]
        nameAst(nm[0], ast)
        if nm.length == 1 then nameAst(nm[0], ast)
        genCode ast, nm[0], globals, defType, rest, parseOnly
    else ifParsed (parseApply rest1, Nil), (ast, rest)->
      genCode ast, null, globals, null, rest, parseOnly
  else [null, null, null]

genCode = (ast, name, globals, defType, rest, parseOnly)->
  if !parseOnly then dgen ast, false, name, globals, defType
  [ast, null, rest]

#returns [ast, err]
evalNext = (code)->
  [ast, err, rest] = compileNext code, null
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
  else [null, err]

nextTok = (str, offset)->
  m = str.match(tokenPat)
  if !m then [str, offset, '']
  else if m.index == 0 && m[0] == '\n' then ['\n', offset, str.substring(1)]
  else
    tok = str.substring(0, if m.index > 0 then m.index else m[0].length)
    rest = str.substring tok.length
    if tok[0] != '#' and tok.trim() then [tok, offset, rest]
    else nextTok rest, offset + tok.length

parse = (str, globals)->
  [ast, err, rest] = parseApply str.replace(/\u03BB/g, '\\'), Nil, globals ? Nil, 0
  if err then throw new Error(err) else ast

ifParsed = (res, block)-> if res[1] then res else block res[0], res[2]

tag = (ast, start, end)->
  ast.lazpStart = start
  ast.lazpEnd = end
  ast

soff = (orig, offset, rest)-> offset + orig.length - rest.length

parseApply = (str, vars, globals, offset)->
  if !str.length then [null, null, str]
  else
    [tok, offset1, rest1] = nextTok str, offset
    if tok == '\n' then [null, 'Newline when expecting expression', rest1]
    else if groupCloses[tok] then [null, "Unexpected group closing token: #{tok}", str]
    else ifParsed (parseTerm tok, rest1, vars, globals, offset1), (func, rest)-> continueApply(func, rest, vars, globals, soff(str, offset, rest))

continueApply = (func, str, vars, globals, offset)->
  [tok, offset1, rest] = nextTok str, offset
  if !tok or tok == '\n' or groupCloses[tok] then [func, null, str]
  else ifParsed (parseTerm tok, rest, vars, globals, offset1), (arg, rest)->
    continueApply tag(apply(laz(func))(laz(arg)), func.lazpStart, arg.lazpEnd), rest, vars, globals, soff(str, offset, rest)

parseTerm = (tok, rest, vars, globals, tokOffset)->
  restOffset = tokOffset + tok.length
  if tok == '\n' then [null, 'Unexpected newline while expecting a term', rest]
  else if tok == '\\' then parseLambda rest, vars, globals, restOffset
  else if groupOpens[tok]
    apl = if tok == '(' then parseApply rest, vars, globals, restOffset else ifParsed (parseName tok, rest, vars, globals, tokOffset), (ast, rest2)-> continueApply ast, rest2, vars, globals, soff(rest, restOffset, rest2)
    ifParsed apl, (ast, rest3)->
      [tok4, offset4, rest4] = nextTok rest3, soff(rest, restOffset, rest3)
      if tok4 != groupOpens[tok] then [ast, "Expected close token: #{groupOpens[tok]}, but got #{tok4}", rest4]
      else if tok == '(' then [ast, null, rest4]
      else ifParsed (parseName tok4, rest4, vars, globals, soff(rest, restOffset, rest4)), (arg, rest5)->
        [tag(apply(laz(ast))(laz(arg)), ast.lazpStart, arg.lazpEnd), null, rest5]
  else parseName tok, rest, vars, globals, tokOffset

parseName = (tok, rest, vars, globals, tokOffset) ->
  restOffset = tokOffset + tok.length
  [tag((if tok[0] == "'" then lit(laz(tok.substring(1, tok.length - 1)))
  else if tok[0] == '"' then lit(laz(scanTok("\"#{tok.substring(1, tok.length - 1)}\"")))
  else if global[nameSub(tok)]?.lazpName == tok or astsByName[tok] or (vars.find (v)-> tok == v) then ref(laz(tok))
  else lit(laz(scanTok(tok)))
  ), tokOffset, restOffset), null, rest]

scanTok = (tok)->
  try
    JSON.parse(tok)
  catch err
    tok

nextTokWithNl = (str, offset)->
  [t, rest] = subnextTokWithNl str
  [t, soff(str, offset, rest), rest]

subnextTokWithNl = (str)->
  [tok, offset, rest] = nextTok str, 0
  if tok == '\n' then subnextTokWithNl rest else [tok, rest]

eatAllWhitespace = (str)->
  m = str.match /^\s+/
  if m then str.substring(m[0].length)
  else str

parseLambda = (str, vars, offset)->
  [nm, offset1, rest1] = nextTokWithNl str, offset
  [tok2, offset2, rest2] = nextTokWithNl rest1, offset1
  ifParsed (if tok2 == '.'
    str2 = eatAllWhitespace rest2
    off2 = soff(str, offset, str2)
    parseApply str2, cons(nm, vars), off2
  else parseLambda rest1, cons(nm, vars), soff(str, offset, rest1)), (body, rest2)-> [tag(lambda(laz(nm))(laz(body)), offset, soff(str, offset, rest2)), null, rest2]

addDef = (toks)->
  t = toks.reverse()
  defs[t[0]] = t.join(' ')

root.parse = parse
root.astPrint = astPrint
root.gen = dgen
root.laz = laz
root.compileNext = compileNext
root.evalNext = evalNext
root.setType = setType
root.setDataType = setDataType
root.astEval = (ast)-> evalCompiledAst(dgen(ast))
root.define = define
root.getAstType = getAstType
root.getType = getType
root.linePat = linePat
root.Nil = Nil
root.cons = cons
root.defineToken = defineToken
