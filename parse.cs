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
else
  root = exports ? this
  inspect = require('util').inspect # for testing
  #Pretty = require './pretty' # for testing

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

# JS class overlaid on lexCons/lexNil funcs for convenience
# merge start and end into functional rep
class LexCons
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
  toString: -> "LexCons[#{@toArray().join(' ')}]"
  reverse: -> @rev lexNil
  rev: (result)-> @tail().rev lexCons(@head(), result)
  equals: (other)-> other?.constructor == LexCons and (@head() == other.head or (@head()?.constructor == LexCons and @head()?.equals(other.head))) and (@tail() == other.tail or (@tail()?.constructor == LexCons and @tail()?.equals(other.tail)))
  each: (block)->
    block(@head())
    @tail().each(block)
  last: ->
    t = @tail()
    if t == lexNil then t else t.last()

class LCNil extends LexCons
  find: -> false
  removeAll: -> @
  foldl: (func, arg)-> arg
  foldr: (func, arg)-> arg
  rev: (result)-> result
  equals: (other)-> other?.constructor == LCNil
  each: ->
  toString: -> 'lexNil'

# cons and lexNil are Leisure-based so that Leisure code can work with it transparently
primLexCons = setDataType(((a)->(b)->
  c = setType ((f)-> f()(a)(b)), 'lexCons'
  c.__proto__ = LexCons.prototype
  c), 'lexCons')
lexNil = setType(((a)->(b)->b()), 'lexNil')
lexNil.__proto__ = LCNil.prototype

lexCons = (a, b)-> lexConsPos(a, b, a.start?(), b.end?())
lexConsPos = (a, b, start, end)-> primLexCons(->a)(->b).setPos(start, end)
dlempty = (x)->x
dlnew = (a)->(b)-> lexCons(a, b)
dlappend = (a, b)->(c)-> a(b(c))

global.leisureFuncs = {}

global.leisureFuncNames = lexNil

global.leisureAddFunc = (nm)-> global.leisureFuncNames = lexCons(nm, global.leisureFuncNames)

evalFunc = eval

define = (name, func, arity, src) ->
  func.src = src
  func.leisureContexts = []
  nm = nameSub(name)
  func.leisureName = name
  func.leisureArity = arity
  if global.noredefs and global[nm]? then throw new Error("[DEF] Attempt to redefine definition: #{name}")
  #f = -> func
  global[nm] = global.leisureFuncs[nm] = func
  (evalFunc 'leisureAddFunc')(name)
  ##f
  func

# expose lexCons and lexNil to Leisure code

define 'lexCons', (->primLexCons), 2, '\a b f . f a b'
define 'lexNil', (->lexNil), 0, '\a b . b'

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
###### Parsing phase 1 -- parse into a lexCons-list
######

ifParsed = (res, block)->
  if res[1] then res
  else block res[0], res[2]

parsePhase1 = (str)-> ifParsed (parseGroup str, '\n', str.length), (group, rest)->
  g = group(lexNil)
  if g != lexNil then g.setPos(g.head().start(), g.last().end())
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
positionGroup = (groupDL, startTok, endTok)-> groupDL(lexNil).setPos startTok.start(), endTok.end()


######
###### ASTs
######

define 'lit', ->setDataType ((_x)->setType ((_f)-> _f()(_x)), 'lit'), 'lit'
define 'ref', ->setDataType ((_x)->setType ((_f)-> _f()(_x)), 'ref'), 'ref'
define 'lambda', ->setDataType ((_v)-> (_f)-> setType ((_g)-> _g()(_v)(_f)), 'lambda'), 'lambda'
define 'apply', ->setDataType ((_func)-> (_arg)-> setType ((_f)-> _f()(_func)(_arg)), 'apply'), 'apply'

tag = (ast, start, end)->
  ast.leisureStart = start
  ast.leisureEnd = end
  ast

getType = (f)->
  t = typeof f
  (t == 'function' and f?.type) or "*#{t}"

lit = (l)->
  console.log "LIT: #{l}"
  _lit()(-> l)
ref = (r)->
  console.log "REF: #{r}"
  _ref()(-> r)
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

# returns [ast] or [null, err, token]
listToAst = (list)->
  if list == lexNil then [null, "Expecting expression, but input is empty"]
  else if !(list instanceof LexCons) then tokenToAst list
  else if isLambdaToken list.head() then checkLambda list.tail()
  else ifParsed listToAst(list.head()), (f)-> listToApply f, list.tail()

isLambdaToken = (tok)-> (tok instanceof Token) and (tok.tok() in ['\\', '\u03BB'])

checkLambda = (list)->
  if list.head() instanceof Token && list.head().tok() != '.' then listToLambda list
  else [null, "Bad lambda construct, expected names, followed by a dot", list]

badLambdaCont = (tok)-> !(tok instanceof Token) || isLambdaToken(tok)

# convert a list starting after a lambda character
listToLambda = (list)->
  if list == lexNil then [null, "Bad lambda construct -- no variable or body"]
  else if list.tail() == lexNil then [null, "Bad lambda construct -- no body"]
  else
    head = list.head()
    if badLambdaCont(head) || badLambdaCont(list.tail().head()) then [null, "Bad lambda construct", head]
    else
      bodyRes = if list.tail().head().tok() == '.' then listToAst list.tail().tail()
      else listToLambda list.tail()
      ifParsed bodyRes, (body)-> [tag(lambda(head.tok(), body), list.start(), list.end())]

tokenToAst = (tok)->
  try
    [tag lit(JSON.parse tok.tok()), tok.start(), tok.end()]
  catch err
    [tag ref(tok.tok()), tok.start(), tok.end()]

listToApply = (f, rest)->
  if rest == lexNil then [f]
  else ifParsed listToAst(rest.head()), (a)->
    listToApply tag(apply(f, a), f.leisureStart, a.leisureEnd), rest.tail()

###
TODO

* get working with current ASTs
* change to lexCons (start, end, a, b) and new AST structures (start, end, data...)
* rewrite listToAst in Leisure?
* write precedence parser in Leisure
###

listDo = (l, f)-> l(->(h)->(t)->f(h(), t()))

print = (f)->
  if !f? then "UNDEFINED"
  else if f == null then 'NULL'
  else switch getType(f)
    when 'lit', 'ref', 'lambda', 'apply' then "AST(#{subprint f})"
    else subprint f

subprint = (f)->
  if !f? then "UNDEFINED"
  else if f == null then 'NULL'
  else switch getType(f)
    when 'lexCons' then "[#{elements(f, true)}]"
    when 'lexNil' then "[]"
    when 'token' then "Token(#{f.tok()})"
    when 'ioMonad' then "IO"
    when 'lit' then f ->(v)->v()
    when 'ref' then f ->(v)->v()
    when 'lambda' then f ->(v)->(bod)-> "\u03BB#{printLambda v(), bod()}"
    when 'apply' then f ->(func)->(arg)-> printApply(func(), arg())
    when 'some' then f(->(v)-> "Some(#{print v()})")(null)
    when 'some2' then f(->(a)->(b)-> "Some2(#{print a()}, #{print b()})")(null)
    when 'left' then f(->(l)-> "Left(#{print l()})")(null)
    when 'right' then f(null)(->(r)-> "Right(#{print r()})")
    when 'html' then f ->(txt)-> "HTML(#{txt()})"
    when 'svg-node' then f ->(txt)-> "SVG NODE(#{txt()})"
    else
      if f instanceof Error then f.stack
      else f.leisureName ? inspect(f)

printLambda = (v, body)->
  if body.type == 'lambda' then body ->(v2)->(b)-> "#{v} #{printLambda v2(), b()}"
  else "#{v} . #{subprint(body)}"

printApply = (func, arg)->
  f = if func.type == 'lambda' then "(#{subprint func})" else subprint(func)
  a = if arg.type == 'apply' then "(#{subprint arg})" else subprint(arg)
  "#{f} #{a}"

elements = (l, first, nosubs)->
  if getType(l) == 'lexNil' then ''
  else if getType(l) != 'lexCons' then " | #{print(l)}"
  else "#{if first then '' else ', '}#{listDo l, (h, t)-> print(h) + elements(t, false)}"


####
# tests
####

console.log "parse: a b: #{parsePhase1('a b')[0]}"
console.log "parse: a (b): #{parsePhase1('a (b)')[0]}"
console.log "parse: a (b c d (e f)): #{parsePhase1('a (b c d (e f))')[0]}"
console.log "parse: \\\\\\\u03BB\\\u03BB: #{parsePhase1('\\\\\\\u03BB\\\u03BB')[0]}"

testParse = (str)->
  p = parsePhase1(str)
  if p[1] then p[1]
  else
    console.log "phase 1: #{print p[0]}"
    a = listToAst(p[0], str.length)
    a[1] ? print(a[0])

console.log "ast for a: #{testParse('a')}"
console.log "ast for a b: #{testParse('a b')}"
console.log "ast for \\a.b: #{testParse('\\a.b')}"
