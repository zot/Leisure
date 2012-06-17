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
  window.Parse = root = {}
else root = exports ? this

######
###### naming
######

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

nameSub = (name)->
  s = '_'
  for i in [0...name.length]
    code = charCodes[name[i]]
    s += code ? name[i]
  s

######
###### definitions
######

setDataType = (func, dataType)->
  if dataType then func.dataType = dataType
  func

setType = (func, type)->
  if type then func.type = type
  func

# JS class overlaid on cons/Nil funcs for convenience
# merge start and end into functional rep
class Cons
  setPos: (start, end)->
    @startPos = start
    @endPos = end
    @
  start: -> @startPos
  end: -> @endPos
  head: -> @ ->(a)->(b)->a()
  tail: -> @ ->(a)->(b)->b()
  find: (func)-> func(@head()) or @tail().find(func)
  foldl: (func, arg)-> @tail().foldl func, func(arg, @head())
  foldr: (func, arg)-> func @head(), @tail().foldr(func, arg)
  toArray: -> @foldl ((i, el)-> i.push(el); i), []
  toString: -> "Cons[#{@toArray().join(' ')}]"
  reverse: -> @rev Nil
  rev: (result)-> @tail().rev cons(@head(), result)
  equals: (other)-> other?.constructor == Cons and (@head() == other.head or (@head()?.constructor == Cons and @head()?.equals(other.head))) and (@tail() == other.tail or (@tail()?.constructor == Cons and @tail()?.equals(other.tail)))
  each: (block)->
    block(@head())
    @tail().each(block)
  last: ->
    t = @tail()
    if t == Nil then t else t.last()

class CNil extends Cons
  find: -> false
  removeAll: -> @
  foldr: (func, arg)-> arg
  foldl: (func, arg)-> arg
  rev: (result)-> result
  equals: (other)-> other?.constructor == CNil
  each: ->
  toString: -> 'Nil'

# cons and Nil are Leisure-based so that Leisure code can work with it transparently
primCons = setDataType(((a)->(b)->
  c = setType ((f)-> f()(a)(b)), 'cons'
  c.__proto__ = Cons.prototype
  c), 'cons')
Nil = setType(((a)->(b)->b()), 'nil')
Nil.__proto__ = CNil.prototype

cons = (a, b)-> consPos(a, b, a.start?(), b.end?())
consPos = (a, b, start, end)-> primCons(->a)(->b).setPos(start, end)
dlempty = (x)->x
dlnew = (a)->(b)-> cons(a, b)
dlappend = (a, b)->(c)-> a(b(c))

global.leisureFuncs = {}

global.leisureFuncNames = Nil

global.leisureAddFunc = (nm)-> global.leisureFuncNames = cons(nm, global.leisureFuncNames)

evalFunc = eval

define = (name, func, arity, src) ->
  func.src = src
  func.leisureContexts = []
  nm = nameSub(name)
  func.leisureName = name
  func.leisureArity = arity
  if global.noredefs and global[nm]? then throw new Error("[DEF] Attempt to redefine definition: #{name}")
  f = -> func
  global[nm] = global.leisureFuncs[nm] = f
  (evalFunc 'leisureAddFunc')(name)
  f

# expose cons and nil to Leisure code

define 'cons', primCons, 2, '\a b f . f a b'
define 'nil', Nil, 0, '\a b . b'

######
###### Scanning
######

escapeRegexpChars = (str)-> str.replace /([\][().\\*+?{}|])/g, '\\$1'
baseTokenPat = /[().\\\u03BB]| +|[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*(\n|$)/
tokenPat = null
tokens = null
tokenTypes = null
groupOpens = null
groupCloses = null
numberPat = /^[0-9]+\.[0-9]+$/

resetScanner = ->
  tokenPat = new RegExp("\\n *|#{baseTokenPat.source}")
  tokens = {}
  # () is a special group because it doesn't capture ( and ) tokens
  tokenTypes = []
  groupOpens = {'(': ')'}
  groupCloses = {')': 1}

resetScanner()

defToken = (name)->
  if !tokens[name]?
    tokens[name] = 1
    tokenTypes.push name
    # sort them by length, longest first
    tokenTypes.sort (a, b)-> b.length - a.length
    types = (escapeRegexpChars i for i in tokenTypes)
    tokenPat = new RegExp("\\n *|#{types.join '|'}|#{baseTokenPat.source}")

defGroup = (open, close)->
  if !tokens[open]?
    defToken open
    defToken close
    groupOpens[name] = close
    groupCloses[name] = 1

eatAllWhitespace = (str)->
  m = str.match /^(\s+|;)/
  if m then str.substring(m[0].length)
  else str

# returns [tok, rest]
nextTok = (str)->
  m = str.match(tokenPat)
  if !m then [str, '']
  else if m.index > 0 then [str.substring(0, m.index), str.substring(m.index)]
  else
    rest = str.substring(m.index + m[0].length)
    if m[0][0] == '#' or m[0][0] == ' ' or (m[0][0] == '\n' and rest[0] == '\n') then nextTok rest
    else [m[0], rest]

pos = (str, totalLen)-> totalLen - str.length

tokPos = (tok, str, totalLen)-> totalLen - str.length - tok.length

ifParsed = (res, block, errPrefix)->
  if res[1] then [res[0], errPrefix + res[1], res[2]]
  else block res[0], res[2]

snip = (str)->"[#{str.substring 0, 80}]"

# Tokens are also Leisure datatypes overlaid with a JS class for interoperability
class Token
  tok: -> @ ->(t)->(p)->t()
  start: -> @ ->(t)->(p)->p()
  end: -> @start() + @tok().length
  toString: -> "Token(#{@tok()})"

primToken = setDataType(((a)->(b)->
  t = setType ((f)-> f()(a)(b)), 'token'
  t.__proto__ = Token.prototype
  t), 'token')

makeToken = (tok, rest, totalLen)->
  pos = totalLen - rest.length - tok.length
  primToken(->tok)(->pos)

######
###### Parsing phase 1 -- parse into a cons-list
######

parsePhase1 = (str)-> ifParsed (parseGroup str, '\n', str.length), (group, rest)->
  g = group(Nil)
  if g != Nil then g.setPos(g.head().start(), g.last().end())
  [g, null, rest]

# returns [group, err, rest]
# note that group is not a list, it's a difference list
parseGroup = (str, indent, totalLen)->
  if !str then [dlempty, null, str]
  else
    [tok, rest] = nextTok str
    if !tok or tok[0] == '\n' then [dlempty, null, rest]
    if groupCloses[tok] then [dlempty, null, str]
    else ifParsed (parseGroupTerm tok, rest, indent, totalLen), (term, rest2)->
      ifParsed (parseGroup rest2, indent, totalLen), (group, rest3)-> [dlappend(term, group), null, rest3]

parseGroupTerm = (tok, rest, indent, totalLen)->
  token = makeToken(tok, rest, totalLen)
  if close = groupOpens[tok]
    ifParsed (parseGroup rest, indent, totalLen), (group, rest2)->
      [next, rest3] = nextTok rest2
      closeToken = makeToken(next, rest3, totalLen)
      if close != next then [null, "Expecting group close: '#{close}', but got #{snip rest2}\n#{new Error().stack}", rest3]
      else if tok == '(' then [dlnew(positionGroup group, token, closeToken), null, rest3]
      else [dlnew(positionGroup dlappend(dlappend(dlnew(token), group), dlnew(closeToken), token, closeToken)), null, rest3]
  else [dlnew(token), null, rest]

# takes a difference list
positionGroup = (groupDL, startTok, endTok)-> groupDL(Nil).setPos startTok.start(), endTok.end()

####
#tests
console.log "parse: a b: #{parsePhase1('a b')[0]}"
console.log "parse: a (b): #{parsePhase1('a (b)')[0]}"
console.log "parse: a (b c d (e f)): #{parsePhase1('a (b c d (e f))')[0]}"
console.log "parse: \\\\\\\u03BB\\\u03BB: #{parsePhase1('\\\\\\\u03BB\\\u03BB')[0]}"
####

######
###### ASTs
######

define 'lit', setDataType ((_x)->setType ((_f)-> _f()(_x)), 'lit'), 'lit'
define 'ref', setDataType ((_x)->setType ((_f)-> _f()(_x)), 'ref'), 'ref'
define 'lambda', setDataType ((_v)-> (_f)-> setType ((_g)-> _g()(_v)(_f)), 'lambda'), 'lambda'
define 'apply', setDataType ((_func)-> (_arg)-> setType ((_f)-> _f()(_func)(_arg)), 'apply'), 'apply'

getType = (f)->
  t = typeof f
  (t == 'function' and f?.type) or "*#{t}"

lit = (l)->_lit()(-> l)
ref = (r)->_ref()(-> r)
lambda = (v, body)->_lambda()(-> v)(-> body)
apply = (f, a)->_apply()(-> f)(-> a)
getAstType = (f) -> f.type
getRefVar = (rf)-> rf (a)-> a()
getLitVal = (lt)-> lt (a)-> a()
getLambdaVar = (lam)-> lam (a)->(b)-> a()
getLambdaBody = (lam)-> lam (a)->(b)-> b()
getApplyFunc = (apl)-> apl (a)->(b)-> a()
getApplyArg = (apl)-> apl (a)->(b)-> b()

######
###### Parsing phase 2
######

lambdaChar = /^[\\\u03BB]$/

# returns [ast] or [null, err, token]
listToAst = (list, endPos)->
  if list == Nil then [null, "Expecting expression, but input is empty", null]
  else if isLambdaToken list.head() then checkLambda list.tail()
  else if list.tail() == Nil then tokenToAst list.head()
  else listToApply list

checkLambda = (list)->
  if list.head() instanceof Token && list.head().tok() != '.' then listToLambda list
  else [null, "Bad lambda construct, expected names, followed by a dot", list]

isLambdaToken = (tok)-> (tok instanceof Token) and (tok.tok() in ['\\', '\u03BB'])

sourcePos = (errItem)->
  if typeof errItem == 'number' then errItem
  else if errItem instanceof Token then tok.pos
  else Math.min(sourcePos(errItem.head()), sourcePos(errItem.tail()))

ifParsed = (res, block)->
  if res[1] then res
  else block res[0]

# convert a list starting after a lambda character
listToLambda = (list, endPos)->
  if list == Nil then [null, "Bad lambda construct -- no variable or body", endPos]
  else
    head = list.head()
    if isLambdaToken(head) || !(head instanceof Token) then [null, "Bad lambda construct", head]
    else
      bodyRes = if head.tok() == '.' then listToAst list.tail(), endPos
      else listToLambda list.tail(), endPos
      ifParsed bodyRes, (body)-> [(tag head.start(), rest.leisureEnd, (lambda head.tok(), body))]

orPos = (a, b)-> if a != Nil then a else b

listToApply = (list, endPos)->
  if list == Nil then [null, "", (orPos list, endPos)]
  else
    ifParsed (listToAst list.head()), (f)->
      ifParsed (listToAst list.tail().head()), (a)->
        if list.tail().tail() == Nil then [(tag )]

###
TODO

* get working with current ASTs
* change to new ASTs (start, end, data...)
* rewrite listToAst in Leisure?
* write precedence parser in Leisure
###


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

defineMacro = (name, func)-> ctx.macros[name] = func

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

sourceBracket = (item)->
  if item instanceof Token then [tok.start(), tok.start() + tok.tok().length]
  else
    first = sourceBracket item.head()
    rest = sourceBracket item.last()
    [first[0], rest[1]]

tagBracket = (item, ast)->
  br = sourceBracket item
  tag br[0], br[1], ast

tag = (start, end, ast)->
  ast.leisureStart = start
  ast.leisureEnd = end
  ast

ifParsed = (res, block, errPrefix)->
  if res[1] then [res[0], errPrefix + res[1], res[2]]
  else block res[0], res[2]

snip = (str)->"[#{str.substring 0, 80}]"

# returns [ast, err, rest]
parseApply = (str, vars, indent, totalLen)->
  if !str then [null, null, str]
  else
    [tok, rest] = nextTok str, indent
    if !tok or tok[0] == '\n' then [null, "expecting expression #{snip str}\n#{new Error().stack}", rest]
    else if groupCloses[tok] then [null, "Unexpected group close: #{tok} #{snip rest}", rest]
    else ifParsed (parseTerm tok, rest, vars, indent, totalLen), (func, rest)->continueApply(func, rest, vars, indent, totalLen)

continueApply = (func, str, vars, indent, totalLen)->
  [tok, rest] = nextTok str, indent
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
      [tok4, rest4] = nextTok rest3, indent
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

nextTokIgnoreNL = (str, indent)->
  [tok, rest] = r = nextTok str, indent
  if tok and (tok[0] == '\n' or tok[0] == ' ') then nextTok rest, indent
  r

parseLambda = (str, vars, indent, totalLen)->
  [nm, rest1] = nextTokIgnoreNL str, indent
  [tok2, rest2] = nextTokIgnoreNL rest1, indent
  apl = if tok2 == '.' then parseApply (eatAllWhitespace rest2), cons(nm, vars), indent, totalLen
  else parseLambda rest1, cons(nm, vars), indent, totalLen
  ifParsed apl, (body, rest2)->
    ast = lambda(laz(nm))(laz(body))
    ast.leisureNameEnd = pos(rest1, totalLen)
    [tag(tokPos(nm, rest1, totalLen), body.leisureEnd, ast), null, rest2]
