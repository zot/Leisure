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

wordPat = /^[^\s]*$/
baseTokenPat = /[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|[().\\\n;]| +|#[^\n]*\n/
tokenPat = baseTokenPat
specials = '[]().*+?|'
linePat = /^((?:\s*\n|#[^\n]*\n)*)([^=\n]*)(=[.)M]=|=\([^=]+=|=)?/
topBracePat = /^((?:;*)(?:\s*|#[^;]*;)*[^=;{}]*(?:=[.)M]=|=\([^=]+=|=)\s*)?((?:`(?:[^`\n]|\\[\\`])*`|'(?:[^'\n]|\\[\\'])*'|"(?:[^"\n]|\\[\\"])*"|[^;{};'"`])*)([{};])/
bracePat = /^()((?:`(?:[^`\n]|\\[\\`])*`|'(?:[^'\n]|\\[\\'])*'|"(?:[^"\n]|\\[\\"])*"|[^\n{};'`"])*)([{};])/
embeddedBracePat = /^()((?:`(?:[^`\n]|\\[\\`])*`|'(?:[^'\n]|\\[\\'])*'|"(?:[^"\n]|\\[\\"])*"|[^{};'`"])*)([{};])/
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
  toArray: -> @foldl [], ((i, el)-> i.push(el); i)
  toString: -> "Cons(#{@toArray().join(', ')})"
  reverse: -> @rev Nil
  rev: (result)-> @tail.rev cons(@head, result)

class CNil extends Cons
  find: -> false
  removeAll: -> @
  foldl: (arg, func)-> arg
  rev: (result)-> result

Nil = new CNil()
cons = (a, b)-> new Cons(a, b)
append = (a, b)-> if a == Nil then b else cons a.head, append(a.tail, b)

global.leisureFuncNames = ll = Nil

global.leisureAddFunc = (nm)-> global.leisureFuncNames = ll = cons(nm, ll)

global.leisureGetFuncs = -> ll

define = (name, func) ->
  nm = nameSub(name)
  func.leisureName = name
  if ctx[nm]? then throw new Error("[DEF] Attempt to redefine definition: #{name}")
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
  ast.toString = ->nm

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
  resetMemo: (n)-> @copyWith(null, null, null, n ? 0)
  reffedValue: (deref)-> if deref then @copyWith(@main + "()") else @
  unreffedValue: (deref)-> if deref then @ else @copyWith("(function(){return #{@main}})")
  #subfuncName: -> "subfunc#{@fcount}"
  #useSubfunc: (closed)-> if !closed then @ else @copyWith(@subfuncName(), "#{@subfuncs}var #{@subfuncName()} = #{@main}\n", @fcount + 1)
  useSubfunc: -> @
  memoize: (deref)->
    if deref then @unreffedValue(deref)
    else @copyWith "(function(){var $m; return function(){return $m || ($m = (#{@main}))}})()"

dgen = (ast, lazy, name, globals, tokenDef)->
  ast.lits = []
  res = []
  code = (gen ast, new Code().setGlobal(cons(name, globals ? Nil)), ast.lits, Nil, true) #.memo(!lazy)
  if code.err != '' then ast.err = code.err
  else if code.subfuncs.length then ast.src = """
(function(){#{if tokenDef? and tokenDef != '=' then "root.tokenDefs.push('#{name}', '#{tokenDef}')\n" else ''}
  #{code.subfuncs}
  return #{if name? then "#{if tokenDef == '=M=' then 'defineMacro' else 'define'}('#{name}', #{code.main})" else code.main}
})()
    """
  else ast.src = if name? then """
#{if tokenDef == '=M=' then 'defineMacro' else 'define'}('#{name}', #{code.main});#{if tokenDef? and tokenDef != '=' then "\nroot.tokenDefs.push('#{name}', '#{tokenDef}');" else ''}

""" else "(#{code.main})"
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
        else if ctx[nameSub(val)]? or code.global.find((v)-> v == val) then code
        #else code.copyWith(JSON.stringify(scanTok(val))).unreffedValue(deref)
        else if typeof val == 'number' then code.copyWith(JSON.stringify(scanTok(val))).unreffedValue(deref)
        else
          console.log "FREE: #{val}, type: #{typeof val}"
          code.addErr "attempt to use free variable: #{val}"
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
      bodyCode.copyWith(wrap(ast, "function(#{nameSub(v)}){return #{bodyCode.main}}")).useSubfunc(bodyCode.vars == Nil).memoize(deref)
    when 'apply'
      func = getApplyFunc ast
      if getAstType func == 'lit' then code.addErr "Attempt to use lit as function: #{getLitVal func}"
      else if freeVar func, vars, code.global then code.addErr "Attempt to use free variable as function: #{getRefVar func}"
      else
        arg = getApplyArg ast
        funcCode = gen func, code, lits, vars, true
        argCode = gen arg, funcCode, lits, vars
        argCode.copyWith("#{funcCode.main}(#{argCode.main})").memoize(deref) #.unreffedValue(deref)
    else code.addErr "Unknown object type in gen: #{ast}"

freeVar = (ast, vars, globals)->
  if (getAstType ast) == 'ref'
    rv = getRefVar ast
    !ctx[nameSub(rv)] and !vars.find((v)-> v == rv) and !globals.find((v)-> v == rv)
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
compileNext = (line, globals, parseOnly, check, nomacros)->
  if line[0] == '='
    rest = line.substring 1
    ifParsed (if nomacros then parseApply rest, Nil else parseFull rest), ((ast, rest)->
      genCode ast, null, globals, null, rest, parseOnly), "Error compiling expr:  #{line.substring 0, 80}"
  else if (def = line.match linePat) and def[1].length != line.length
    [matched, leading, name, defType] = def
    if name[0] == ' '
      name = null
      defType = null
      nm = null
    else nm = if defType then name.trim().split(/\s+/) else null
    rest1 = line.substring (if defType then matched else leading).length
    if nm
      if check and globals.find((v)-> v == nm[0]) then [null, "Attempt to redefine function: #{nm[0]}", null]
      else
        if defType && defType != '=' then defineToken(nm[0], defType)
        pfx = (prefix nm, rest1)
        errPrefix = "Error while compiling #{nm}: "
        ifParsed (if nomacros then parseApply pfx, Nil else parseFull pfx), ((ast, rest)->
          nameAst(nm[0], ast)
          bod = ast
          if nm.length > 1 then bod = getNthBody(ast, nm.length)
          if getAstType(bod) == 'lambda'
            bod.exprType = nm[0]
            ast.exprDataType = nm[0]
          if nm.length == 1 then nameAst(nm[0], ast)
          ast.leisurePrefixSrcLen = pfx.length
          ast.leisurePrefixCount = nm.length
          genCode ast, nm[0], globals, defType, rest, parseOnly), errPrefix
    else ifParsed (if nomacros then parseApply rest1, Nil else parseFull rest1), ((ast, rest)->
      genCode ast, null, globals, null, rest, parseOnly), "Error compiling expr:  #{line.substring 0, 80}"
  else [null, null, null]

genCode = (ast, name, globals, defType, rest, parseOnly)->
  if !parseOnly then dgen ast, false, name, globals, defType
  if ast.err? and name? then ast.err = "Error while compiling #{name}: #{ast.err}"
  [ast, ast.err, rest]

#returns [ast, result]
evalNext = (code)->
  [ast, err, rest] = compileNext code, null
  if ast
    if ast.leisureName
      try
        nm = nameSub(ast.leisureName)
        if ctx[nm] then evalFunc("#{nm} = null")
        evalCompiledAst(ast)
        result = "Defined: #{ast.leisureName}"
      catch err
        console.log(err.stack)
        result = err.stack
        ast.err = err.stack
      [ast, result]
    else
      try
        result = evalCompiledAst(ast)
      catch err
        ast.err = err.stack
      [ast, result]
  else [{err: err}, err]

prepare = (str)->
  [result, rest] = bracify(stripComments(str.replace(/\u03BB/g, '\\')), 1)
  if rest.trim() then [result, "Indentation problem: #{result}\n\n------->\n\n#{rest}"]
  else
    [result, rest, err] = parenthify result.trim(), true
    if rest.trim() then [result, "Unbalanced braces: #{result}\n\n------->\n\n#{rest}"]
    else [result, err]

commentPat = /([^\n#]*)(#[^\n]*)(\n|$)/g

stripComments = (str)-> str.replace commentPat, (str, p1, p2, p3, offset)-> if p1.trim() then "#{p1}#{p3}" else ""

indentPat = /^([^\n]*)(\n[ ]*|$)/

#convert indented code to braced code
#returns [bracified-str, remainder]
bracify = (str, indent)->
  b = str.match bracePat
  if b and b[3] == '{'
    [result, rest] = parenthify str.substring(b.index + b[2].length + 1), false, true
    if rest[0] != '}' then [null, "No close brace: #{str.substring(b.index + b[2].length + 1)}", indent]
    else
      [nextResult, nextRest, nextIndent] = bracify rest.substring(1), indent
      ["#{parenthesizeTokens str.substring(0, b.index + b[2].length).trim() + result} #{nextResult}", nextRest, nextIndent]
  else
    m = str.match indentPat
    if !m or m[2].length == 0 then [str.trim(), '', 0]
    else
      lineIndent = m[2].length
      pfx = m[1]
      sfx = str.substring(m[0].length)
      if lineIndent < indent then [pfx.trim(), sfx, lineIndent]
      else
        [result, rest, resIndent] = bracify(sfx, lineIndent)
        if lineIndent == indent then ["#{pfx.trim()};#{result}", rest, resIndent]
        else if resIndent < indent then ["#{pfx.trim()}{#{result}}", rest, resIndent]
        else
          [nextResult, nextRest, nextIndent] = bracify(rest, indent)
          ["#{pfx.trim()}{#{result}};#{nextResult}", nextRest, nextIndent]

#convert braced code to parenthesized code
#bracePat/topBracePat: 1: definition, 2: leading string, 3: brace char ({, }, or ;)
parenthify = (str, top, embedded)->
  b = str.match (if embedded then embeddedBracePat else if top then topBracePat else bracePat)
  if !b then [(if str and !top then "(#{str})" else str), '', null]
  else
    def = (stripSemis (b[1] ? '')).trim()
    if def then def = "#{def} "
    pfx = b[2].trim()
    sfx = str.substring(b.index + b[0].length)
    if b[3] == ';'
      [result, rest, err] = parenthify sfx, top, embedded
      ["#{if !pfx and !top then '' else if !pfx then '\n' else if top then "#{def}#{pfx}\n" else " #{parenthesizeTokens pfx} "}#{result.trim()}", rest, err]
    else if b[3] == '{'
      [result, rest, err] = parenthify sfx, false, embedded
      if !err and rest[0] == '}'
        [next, nRest, err] = parenthify rest.substring(1), top, embedded
        ["#{def}#{parenthesizeTokens (if pfx then pfx + result else result)}#{if top then "\n" else " "}#{next}", nRest, err]
      else ["#{if pfx then "#{def} #{pfx}" else "#{def}"}#{result}", rest, "#{err}\nNo close brace"]
    else [(if pfx then "#{def} #{parenthesizeTokens pfx}" else "#{def}"), str.substring b.index + b[1].length + b[2].length]


parenthesizeTokens = (str)->
  trimmed = str.trim()
  tok = trimmed.match(wordPat)
  if (tok and tok[0] == trimmed) or (!tok and trimmed.match(wordPat)) then trimmed
  else "(#{trimmed})"

stripSemis = (str)-> str.replace(/^;*/, '')

nextTok = (str, offset)->
  m = str.match(tokenPat)
  if !m then [str, offset, '']
  else if m.index == 0 && m[0] == '\n' then ['\n', offset, str.substring(1)]
  else
    tok = str.substring(0, if m.index > 0 then m.index else m[0].length)
    rest = str.substring tok.length
    if tok[0] != '#' and tok.trim() then [tok, offset, rest]
    else nextTok rest, offset + tok.length

parseFull = (str)->
  [ast, err, rest] = parseApply str, Nil, 0
  if err then [ast, err, rest]
  else [(substituteMacros ast), err, rest]

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

parse = (str)->
  [ast, err, rest] = parseApply str.replace(/\u03BB/g, '\\'), Nil, 0
  if err then throw new Error(err) else ast

ifParsed = (res, block, errPrefix)->
  if res[1]
    [res[0], errPrefix + res[1], res[2]]
  else block res[0], res[2]

tag = (ast, start, end)->
  ast.leisureStart = start
  ast.leisureEnd = end
  ast

soff = (orig, offset, rest)-> offset + orig.length - rest.length

parseApply = (str, vars, offset)->
  if !str.length then [null, null, str]
  else
    [tok, offset1, rest1] = nextTok str, offset
    if tok == '\n' then [null, 'Newline when expecting expression', rest1]
    else if groupCloses[tok] then [null, "Unexpected group closing token: #{tok}", str]
    else ifParsed (parseTerm tok, rest1, vars, offset1), (func, rest)-> continueApply(func, rest, vars, soff(str, offset, rest))

continueApply = (func, str, vars, offset)->
  [tok, offset1, rest] = nextTok str, offset
  if !tok or tok == '\n' or tok == '}' or groupCloses[tok] then [func, null, str]
  else ifParsed (parseTerm tok, rest, vars, offset1), (arg, rest)->
    continueApply tag(apply(laz(func))(laz(arg)), func.leisureStart, arg.leisureEnd), rest, vars, soff(str, offset, rest)

parseTerm = (tok, rest, vars, tokOffset)->
  restOffset = tokOffset + tok.length
  if tok == '\n' then [null, 'Unexpected newline while expecting a term', rest]
  else if tok == '\\' then parseLambda rest, vars, restOffset
  else if groupOpens[tok]
    apl = if tok == '(' then parseApply rest, vars, restOffset else ifParsed (parseName tok, rest, vars, tokOffset), (ast, rest2)-> continueApply ast, rest2, vars, soff(rest, restOffset, rest2)
    ifParsed apl, (ast, rest3)->
      [tok4, offset4, rest4] = nextTok rest3, soff(rest, restOffset, rest3)
      if tok4 != groupOpens[tok] then [ast, "Expected close token: #{groupOpens[tok]}, but got #{tok4}", rest4]
      else if tok == '(' then [ast, null, rest4]
      else ifParsed (parseName tok4, rest4, vars, soff(rest, restOffset, rest4)), (arg, rest5)->
        [tag(apply(laz(ast))(laz(arg)), ast.leisureStart, arg.leisureEnd), null, rest5]
  else parseName tok, rest, vars, tokOffset

parseName = (tok, rest, vars, tokOffset) ->
  restOffset = tokOffset + tok.length
  [tag((if tok[0] == "'" then lit(laz(tok.substring(1, tok.length - 1)))
  else if tok[0] == '"' then lit(laz(scanTok(tok)))
  else if tok[0] == '`' then ref(laz(tok.substring(1, tok.length - 1)))
  else if (vars.find (v)-> tok == v) then ref(laz(tok))
  else scanName(tok)
  ), tokOffset, restOffset), null, rest]

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

nextTokWithNl = (str, offset)->
  [t, rest] = subnextTokWithNl str
  [t, soff(str, offset, rest), rest]

subnextTokWithNl = (str)->
  [tok, offset, rest] = nextTok str, 0
  if tok == '\n' then subnextTokWithNl rest else [tok, rest]

eatAllWhitespace = (str)->
  m = str.match /^(\s+|;)/
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

setEvalFunc = (ct, func)->
  ctx = root.ctx = ct
  root.eval = evalFunc = func

req = (name, gl)->
  processDefs(require(name), gl)

processDefs = (res, gl)->
  gl = gl ? global
  if res.defs? then for i,v of res.defs
    ((tmp)-> gl[i] = tmp) v
  processTokenDefs res.tokenDefs
  res.leisureFuncNames = ctx.leisureFuncNames
  res.ctx = ctx
  res

processTokenDefs = (defs)->
  if defs? then for i in [0...defs.length] by 2
    defineToken defs[i], defs[i + 1]

root.processTokenDefs = processTokenDefs
root.setEvalFunc = setEvalFunc
root.eval = evalFunc
root.parse = parse
root.parseFull = parseFull
root.astPrint = astPrint
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
root.getType = getType
root.linePat = linePat
root.Nil = Nil
root.cons = cons
root.append = append
root.defineToken = defineToken
root.req = req
root.nameSub = nameSub
root.bracify = bracify
root.parenthify = parenthify
root.prepare = prepare
root.processDefs = processDefs
