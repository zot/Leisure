###
Copyright (C) 2012, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

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
  func.__proto__ = (ensureLeisureClass type).prototype
  func

class LeisureObject

global.LeisureObject = LeisureObject

ensureLeisureClass = (leisureClass)->
  cl = "Leisure#{nameSub leisureClass}"
  if !global[cl]?
    global[cl] = eval "(function #{cl}(){})"
    global[cl].prototype.__proto__ = LeisureObject.prototype
  global[cl]

# cons and Nil are Leisure-based so that Leisure code can work with it transparently
# they look like ordinary JS classes, but the cons
class Leisure_cons extends LeisureObject
  head: -> @ ->(a)->(b)->a()
  tail: -> @ ->(a)->(b)->b()
  find: (func)-> func(@head()) or @tail().find(func)
  removeAll: (func)->
    t = @tail().removeAll(func)
    if func(@head) then t else if t == @tail() then @ else cons(@head(), t)
  map: (func)-> cons func(@head()), @tail().map func
  foldl: (func, arg)-> @tail().foldl func, func(arg, @head())
  foldl1: (func)-> @tail().foldl func, @head()
  foldr: (func, arg)-> func @head(), @tail().foldr(func, arg)
  foldr1: (func)->
    if @tail() == Nil then @head()
    else func @head(), @tail().foldr1(func)
  toArray: -> @foldl ((i, el)-> i.push(el); i), []
  join: (str)->@toArray().join(str)
  toString: -> "Cons[#{@elementString()}]"
  elementString: -> "#{@head()}#{if @tail() == Nil then '' else if @tail() instanceof Leisure_cons then " #{@tail().elementString()}" else " | #{@tail()}"}"
  reverse: -> @rev Nil
  rev: (result)-> @tail().rev cons(@head(), result)
  equals: (other)-> @ == other or (other instanceof Leisure_cons and (@head() == other.head() or (@head() instanceof Leisure_cons and @head().equals(other.head()))) and (@tail() == other.tail() or (@tail() instanceof Leisure_cons and @tail().equals(other.tail()))))
  each: (block)->
    block(@head())
    @tail().each(block)
  last: ->
    t = @tail()
    if t == Nil then t else t.last()
  append: (l)->cons @head(), @tail().append(l)

global.Leisure_cons = Leisure_cons

class Leisure_nil extends LeisureObject
  find: -> false
  removeAll: -> @
  map: (func)-> Nil
  foldl: (func, arg)-> arg
  foldr: (func, arg)-> arg
  reverse: -> @
  rev: (result)-> result
  equals: (other)-> other instanceof Leisure_nil
  each: ->
  toArray: -> []
  join: -> ''
  append: (l)-> l
  toString: -> "Cons[]"

global.Leisure_nil = Leisure_nil

class DL

jsType = (v)->
  t = typeof v
  if t == 'object' then v.constructor || t
  else t

mkProto = (protoFunc, value)->
  value.__proto__ = protoFunc.prototype
  value

throwError = (msg)->
  throw (if msg instanceof Error then msg else new Error(String(msg)))

checkType = (value, type)-> if !(value instanceof type) then throwError("Type error: expected type: #{type}, but got: #{jsType value}")

primCons = setDataType(((a)->(b)-> mkProto Leisure_cons, setType ((f)-> f()(a)(b)), 'cons'), 'cons')
Nil = mkProto Leisure_nil, setType(((a)->(b)->b()), 'nil')
cons = (a, b)-> primCons(->a)(->b)
dlempty = mkProto DL, (x)-> x
dlnew = (a)-> mkProto DL, (b)-> cons(a, b)
dlappend = (a, b)->
  checkType(a, DL)
  checkType(b, DL)
  mkProto DL, (c)-> a(b(c))

foldLeft = (func, val, thing)->
  if thing instanceof Leisure_cons then thing.foldl func, val
  else primFoldLeft func, val, thing, 0

primFoldLeft = (func, val, array, index)->
  if index < array.length then primFoldLeft func, func(val, array[index]), array, index + 1
  else val

# JS class overlaid on lexCons funcs for convenience
# merge start and end into functional rep
class Leisure_lexCons extends Leisure_cons
  head: -> @ ->(a)->(s)->(b)->(e)->a()
  tail: -> @ ->(a)->(s)->(b)->(e)->b()
  start: -> @ ->(a)->(s)->(b)->(e)->s()
  end: -> @ ->(a)->(s)->(b)->(e)->e()
  map: (func)-> lexCons func(@head()), @start(), @tail().map(func), @end()
  withStart: (start)-> lexCons(@head(), start, @tail(), @end())
  toString: -> "LexCons(#{@start()}, #{@end()})[#{@toArray().join(' ')}]"

global.Leisure_lexCons = Leisure_lexCons

primLexCons = setDataType(((a)->(start)->(b)->(end)-> mkProto Leisure_lexCons, setType ((f)-> f()(a)(b.start && Math.min(b.start(), start) || start)(b)(a.end && Math.max(a.end(), end) || end)), 'lexCons'), 'lexCons')

class LexDL

lexCons = (a, start, b, end)->
  s = if b.start? then Math.min(start, b.start()) else start
  e = if a.end? then Math.max(end, a.end()) else end
  primLexCons(->a)(->s)(->b)(->e)
lexDlempty = mkProto LexDL, (x, end)-> x
lexDlnew = (a, start)-> mkProto LexDL, (b, end)-> lexCons(a, start, b, end)
lexDlappend = (a, b)->
  checkType(a, LexDL)
  checkType(b, LexDL)
  mkProto LexDL, (c, end)->a(b(c, end), end)

global.leisureMacros = {}
global.leisureFuncs = {}
global.leisureFuncNames = Nil
leisureAddFunc = global.leisureAddFunc = (nm)-> global.leisureFuncNames = cons(nm, global.leisureFuncNames)
root.evalFunc = evalFunc = eval

# use AST, instead of arity?
define = (name, func, arity, src, method) ->
  func.src = src
  func.leisureContexts = []
  nm = nameSub(name)
  func.leisureName = name
  func.leisureArity = arity
  if !method and global.noredefs and global[nm]? then throwError("[DEF] Attempt to redefine definition: #{name}")
  global[nm] = global.leisureFuncs[nm] = func
  leisureAddFunc name
  func

# expose cons and lexCons functions to Leisure

define 'cons', (-> primCons), 2, '\a b f . f a b'
#define 'head', (-> (l)-> l().head()), 1, '\l . l \h t . h'
#define 'tail', (-> (l)-> l().tail()), 1, '\l . l \h t . t'
define 'lexCons', (-> primLexCons), 4, '\a s b e f . f a s b e'
define 'lexStart', (-> (l)-> l().start()), 1, '\l . l h s t e . s'
define 'lexEnd', (-> (l)-> l().end()), 1, '\l . l h s t e . e'
define 'nil', (-> Nil), 0, '\a b . b'
#define 'foldl', (-> (f)->(v)->(l)-> l().foldl(lfunc(f), v())), 3, ''
#define 'foldl1', (-> (f)->(l)-> l().foldl1(lfunc(f))), 3, ''
#define 'foldr', (-> (f)->(v)->(l)-> l().foldlr(lfunc(f), v())), 3, ''
#define 'foldr1', (-> (f)->(l)-> l().foldr1(lfunc(f))), 3, ''

lfunc = (f)->(v, el)-> f()(-> v)(-> el)

######
###### Scanning
######

class Scanner
  constructor: ->
    @tokenPat = new RegExp("\\n *|#{baseTokenPat.source}")
    @tokens = {}
    # () is a special group because it doesn't capture ( and ) tokens
    @tokenTypes = []
    @groupOpens = {'(': ')'}
    @groupCloses = {')': 1}
    @filters = []
    @filterInfo = Nil
  addFilter: (filter)-> @filters.push(filter)
  defToken: (name)->
    if !@tokens[name]?
      @tokens[name] = 1
      @tokenTypes.push name
      # sort them by length, longest first
      @tokenTypes.sort (a, b)-> b.length - a.length
      types = (escapeRegexpChars i for i in @tokenTypes)
      @tokenPat = new RegExp("\\n *|#{types.join '|'}|#{baseTokenPat.source}")
  defGroup: (open, close)->
    if !@tokens[open]?
      @defToken open
      @defToken close
      @groupOpens[open] = close
      @groupCloses[close] = 1
  # returns [tok, rest]
  nextTok: (str)->
    m = str.match(@tokenPat)
    if !m then [str, '']
    else if m.index > 0 then [str.substring(0, m.index), str.substring(m.index)]
    else
      tok = m[0]
      if tok[0][0] == "'" then tok = '"' + tok.substring(1, tok.length - 1).replace(/[\\]?./g, (s)-> if s[0] == '"' then '\\"' else s) + '"'
      rest = str.substring(m.index + m[0].length)
      if tok[0] == '#' or tok[0] == ' ' or (tok[0] == '\n' and rest[0] == '\n') then @nextTok rest
      else [tok, rest]
  scan: (str)-> @filter 0, (@basicScan str)
  basicScan: (str)-> ifParsed (@parseGroup str, '\n', str.length), (group, rest)-> [group(Nil, str.length - rest.length), null, rest]
  filter: (index, result)-> ifParsed result, (group, rest)=>
    if index < @filters.length
      try
        @filter index + 1, [cleanupMacro(0, @filters[index](=> @filterInfo)(-> group)), null, rest]
      catch err
        [null, err.toString(), null]
    else [group, null, rest]
  #scan: (str)-> ifParsed (@parseGroup str, '\n', str.length), (group, rest)-> [group(Nil, str.length - rest.length), null, rest]
  parseGroup: (str, indent, totalLen)->
    # returns [lexdlGroup, err, rest]
    # note that lexdlGroup is not a list, it's a difference list
    if !str then [lexDlempty, null, str]
    else
      [tok, rest] = @nextTok str
      if !tok or (tok[0] == '\n' and tok.length <= indent.length) or @groupCloses[tok] then [lexDlempty, null, str]
      else ifParsed (@parseGroupTerm tok, rest, indent, totalLen), (term, rest2)=>
        ifParsed (@parseGroup rest2, indent, totalLen), (group, rest3)-> [lexDlappend(term, group), null, rest3]
  parseGroupTerm: (tok, rest, indent, totalLen)->
    token = makeToken(tok, rest, totalLen)
    if tok[0] == '\n' then ifParsed (@parseGroup rest, tok, totalLen), (group, rest2)-> [lexDlnew(collapseTrivial(group(Nil, totalLen - rest2.length)), token.start()), null, rest2]
    else
      if close = @groupOpens[tok]
        ifParsed (@parseGroup rest, indent, totalLen), (group, rest2)=>
          [next, rest3] = @nextTok rest2
          closeToken = makeToken(next, rest3, totalLen)
          if close != next then [null, "Expecting group close: '#{close}', but got #{snip rest2}\n#{new Error().stack}", rest3]
          else if tok == '(' then [lexDlnew((positionGroup group, token, closeToken), token.start()), null, rest3]
          else
            innerGroup = lexDlappend(lexDlappend(lexDlnew(token, token.start()), group), lexDlnew(closeToken, closeToken.start()))(Nil, closeToken.end())
            [lexDlnew(innerGroup, token.start()), null, rest3]
      else
        if tok[0] == "`"
          tp = token.start() + 1
          tok = tok.substring(1, tok.length - 1)
          token = primToken(->tok)(->tp)
        [lexDlnew(token, token.start()), null, rest]

escapeRegexpChars = (str)-> str.replace /([\][().\\*+?{}|])/g, '\\$1'
baseTokenPat = /[().\\\u03BB]| +|[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*(\n|$)/
numberPat = /^[0-9]+\.[0-9]+$/
defaultScanner = new Scanner()

defToken = (name)-> defaultScanner.defToken name

defGroup = (open, close)-> defaultScanner.defGroup open, close

pos = (str, totalLen)-> totalLen - str.length

tokPos = (tok, str, totalLen)-> totalLen - str.length - tok.length

snip = (str)->"[#{str.substring 0, 80}]"

# Leisure_tokens are also Leisure datatypes overlaid with a JS class for interoperability
class Leisure_token extends LeisureObject
  tok: -> @ ->(t)->(p)->t()
  start: -> @ ->(t)->(p)->p()
  end: -> @start() + @tok().length
  toString: -> "Token('#{@tok()}', #{@start()}-#{@end()})"
  zeroLen: ->
    @end = => @start()
    @

global.Leisure_token = Leisure_token

primToken = setDataType(((tok)->(pos)-> mkProto Leisure_token, setType ((f)-> f()(tok)(pos)), 'token'), 'token')

makeToken = (tok, rest, totalLen)->
  tp = totalLen - rest.length - tok.length
  primToken(->tok)(->tp)

define 'token', (-> primToken), 2, '\tok pos f . f tok pos'
define 'tokenName', (-> (t)-> t().tok()), 1, '\tok . tok \n p . n'
define 'tokenStart', (-> (t)-> t().start()), 1, '\tok . tok \n p . p'

ifParsed = (res, block)->
  if res[1] then res
  else block res[0], res[2]

collapseTrivial = (group)-> if group instanceof Leisure_cons and group.tail() == Nil then collapseTrivial group.head() else group

# takes a difference list
positionGroup = (groupDL, startTok, endTok)->
  g = collapseTrivial(groupDL(Nil, endTok.end()))
  if g instanceof Leisure_lexCons then g.withStart(startTok.start()) else g

######
###### Macros
######

defineMacro = (name, func)-> global.leisureMacros[name] = func()

substituteMacros = (list)->
  if list == Nil or !(list instanceof Leisure_cons) then list
  else if list.head() instanceof Leisure_token and macro = global.leisureMacros[list.head().tok()]
    cleaned = cleanupMacro (if list instanceof Leisure_cons then list.end() else 0), (macro ->list)
    substituteMacros cleaned
  else substituteLambdaMacros list

substituteLambdaMacros = (list)->
  if list == Nil then Nil
  else if isLambdaToken list.head() then substituteLambdaBody list
  else lexCons (substituteMacros list.head()), list.start(), (substituteLambdaMacros list.tail()), list.end()

substituteLambdaBody = (list)->
  if list == Nil then Nil
  else lexCons list.head(), list.start(), (if (list.head() instanceof Leisure_token) and list.head().tok() == '.' then substituteMacros(list.tail()) else substituteLambdaBody list.tail()), list.end()

cleanupMacro = (nextOffset, list)->
  if typeof list in ['string', 'number'] then primToken(->String(list))(->nextOffset).zeroLen()
  else if !(list instanceof Leisure_cons) or (list == Nil) then list
  else if list instanceof Leisure_lexCons
    #list.map ((x)-> cleanupMacro x.end(), x)
    list.foldr ((el, res)->
      cl = cleanupMacro (res.start && res.start() || nextOffset), el
      lexCons cl, cl.start(), res, (if res.end then res.end() else Math.max(cl.end(), nextOffset))), Nil
  else
    tail = cleanupMacro nextOffset, list.tail()
    head = cleanupMacro (tail.start && tail.start() || nextOffset), list.head()
    #lexCons head, (if head.start? then head.start() else if tail.start? then tail.start() else 0), tail, (if tail.start? then tail.start() else 0)
    lexCons head, head.start(), tail, (tail.end && tail.end() || Math.max(head.end(), nextOffset))

######
###### ASTs
######

# Make an AST for these
# add node numder and source start and end into leisure structure
# make lit, ref, lambda, and apply subclasses of AST

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

lit = (l)-> _lit()(-> l)
ref = (r)-> _ref()(-> r)
lambda = (v, body)->_lambda()(-> v)(-> body)
apply = (f, a)->_apply()(-> f)(-> a)
getAstType = (f) -> f.type
getRefVar = (rf)-> rf ->(a)-> a()
getLitVal = (lt)-> lt ->(a)-> a()
getLambdaVar = (lam)-> lam ->(v)->(b)-> v()
getLambdaBody = (lam)-> lam ->(v)->(b)-> b()
getApplyFunc = (apl)-> apl ->(a)->(b)-> a()
getApplyArg = (apl)-> apl ->(a)->(b)-> b()

######
###### Parsing phase 2
######

# returns [ast] or [null, err, token]
listToAst = (list)-> primListToAst list, Nil
primListToAst = (list, vars)->
  if list == Nil then [null, "Expecting expression, but input is empty"]
  else if !(list instanceof Leisure_lexCons) then tokenToAst list, vars
  else if isLambdaToken list.head() then checkLambda list.tail(), vars
  else ifParsed primListToAst(list.head(), vars), (f)-> listToApply f, list.start(), list.tail(), vars

isLambdaToken = (tok)-> (tok instanceof Leisure_token) and (tok.tok() in ['\\', '\u03BB'])

checkLambda = (list, vars)->
  if list.head() instanceof Leisure_token && list.head().tok() != '.' then listToLambda list, vars
  else [null, "Bad lambda construct, expected names, followed by a dot", list]

badLambdaCont = (tok)-> !(tok instanceof Leisure_token) || isLambdaToken(tok)

# convert a list starting after a lambda character
listToLambda = (list, vars)->
  if list == Nil then [null, "Bad lambda construct -- no variable or body"]
  else if list.tail() == Nil then [null, "Bad lambda construct -- no body"]
  else
    head = list.head()
    if badLambdaCont(head) || badLambdaCont(list.tail().head()) then [null, "Bad lambda construct", head]
    else
      v = cons(head.tok(), vars)
      bodyRes = if list.tail().head().tok() == '.' then primListToAst list.tail().tail(), v else listToLambda list.tail(), v
      ifParsed bodyRes, (body)-> [tag(lambda(head.tok(), body), list.start(), list.end())]

tokenToAst = (tok, vars)->
  try
    l = JSON.parse tok.tok()
    t = typeof l
    [tag (if vars.find((n)-> n == l or n == tok.tok()) then ref(tok.tok()) else if t in ['string', 'number'] then lit(l) else ref(tok.tok())), tok.start(), tok.end()]
  catch err
    [tag ref(tok.tok()), tok.start(), tok.end()]

listToApply = (f, start, rest, vars)->
  if rest == Nil then [f]
  else if isLambdaToken rest.head()
      ifParsed listToAst(rest), (a)-> [tag(apply(f, a), start, Math.max(f.leisureEnd, rest.end()))]
    else ifParsed listToAst(rest.head()), (a)->
      listToApply tag(apply(f, a), Math.min(start, f.leisureStart, rest.head().start()), Math.max(f.leisureEnd, rest.head().end())), start, rest.tail()

#minStart = (lc)-> if lc.tail() == Nil then lc.start() else Math.min(lc.start(), minStart lc.tail())
#
#maxEnd = (lc) if lc.tail() == Nil then lc.end() else Math.max(lc.end(), maxEnd lc.tail())

# returns [ast, err, rest] -- err may be null
# if there is an error, rest is the start of the erroneous input
parseOptional = (string, macros)->
  [res, err, rest] = defaultScanner.scan string
  if err then [null, err, rest]
  else
    #macres = [(if macros then substituteMacros res else res), null, rest]
    #ifParsed (if macros then defaultScanner.filter 0, macres else macres), (macroed, rest)->
    #  [res, err, tok] = listToAst macroed
    #  if res then [res, null, rest]
    #  else [null, err, (if tok then string.substring(tok.start()) else rest)]
    [res, err, tok] = listToAst (if macros then substituteMacros res else res)
    if res then [res, null, rest]
    else [null, err, (if tok then string.substring(tok.start()) else rest)]

right = (value)-> (a)->(b)-> a()(->value)
left = (value)-> (a)->(b)-> b()(->value)

define 'scan', (-> (string)->
  [res, err, rest] = defaultScanner.scan string()
  if err then _left()(->"Error at: #{JSON.stringify snip rest}..., #{err}") else _right()(->res)), 1

define 'macro', (-> (list)-> substituteMacros list()), 1

parse = (string)->parseOptional string, false
parseFull = (string)->parseOptional string, true

###
tests

TODO

* get working with current ASTs
* rewrite listToAst in Leisure?
* write precedence parser in Leisure
###

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
    #when 'lexCons' then "LexCons(#{f.start()}, #{f.end()})[#{elements(f, true)}]"
    #when 'cons' then "[#{elements(f, true)}]"
    #when 'lexCons' then "LexCons(#{f.start()}, #{f.end()})[#{elementsTail(f, true, '')}]"
    #when 'cons' then "[#{elementsTail(f, true, '')}]"
    when 'lexCons' then "LexCons(#{f.start()}, #{f.end()})[#{elementsLoop(f)}]"
    when 'cons' then "[#{elementsLoop(f)}]"
    when 'nil' then "[]"
    when 'token' then "#{f}"
    when 'ioMonad' then "IO"
    when 'lit' then f ->(v)->JSON.stringify(v())
    when 'ref' then f ->(v)->v()
    when 'lambda' then f ->(v)->(bod)-> "\u03BB#{printLambda v(), bod()}"
    when 'apply' then f ->(func)->(arg)-> printApply(func(), arg())
    when 'some' then f(->(v)-> "Some(#{print v()})")(null)
    when 'some2' then f(->(a)->(b)-> "Some2(#{print a()}, #{print b()})")(null)
    when 'left' then f(->(l)-> "Left(#{print l()})")(null)
    when 'right' then f(null)(->(r)-> "Right(#{print r()})")
    when 'html' then f ->(txt)-> "HTML(#{txt()})"
    when 'svgNode' then f ->(txt)-> "SVG NODE(#{txt()})"
    else
      if f instanceof Error then f.stack
      else f.leisureName ? (inspect ? (v)->"#{v}")(f)

printLambda = (v, body)->
  if body.type == 'lambda' then body ->(v2)->(b)-> "#{v} #{printLambda v2(), b()}"
  else "#{v} . #{subprint(body)}"

printApply = (func, arg)->
  f = if func.type == 'lambda' then "(#{subprint func})" else subprint(func)
  a = if arg.type == 'apply' then "(#{subprint arg})" else subprint(arg)
  "#{f} #{a}"

elements = (l, first, nosubs)->
  if l == Nil then ''
  else if !(l instanceof Leisure_cons) then " | #{print(l)}"
  else "#{if first then '' else ' '}#{print(l.head()) + elements(l.tail(), false)}"

# This still gets a stack overflow, even though it's a pure tail call
elementsTail = (l, first, acc)->
  if l == Nil then acc
  else if !(l instanceof Leisure_cons) then "#{acc} | #{print(l)}"
  else elementsTail l.tail(), false, "#{acc}#{if first then '' else ' '}#{print(l.head())}"

# interative version that's not tail recursive'
elementsLoop = (l, nosubs)->
  result = ''
  first = true
  while l != Nil
    if !(l instanceof Leisure_cons)
      result += " | #{print (l)}"
      break
    if first then first = false
    else result += ' '
    result += print l.head()
    l = l.tail()
  result

root.evalFunc = evalFunc
root.nameSub = nameSub
root.setDataType = setDataType
root.setType = setType
root.mkProto = mkProto
root.Nil = Nil
root.cons = cons
root.primCons = primCons
root.dlempty = dlempty
root.dlnew = dlnew
root.dlappend = dlappend
root.lexCons = lexCons
root.lexDlempty = lexDlempty
root.lexDlnew = lexDlnew
root.lexDlappend = lexDlappend
root.define = define
root.defineMacro = defineMacro
root.defGroup = defGroup
root.defToken = defToken
root.parse = parse
root.parseFull = parseFull
root.listToAst = listToAst
root.getType = getType
root.lit = lit
root.ref = ref
root.lambda = lambda
root.apply = apply
root.getAstType = getAstType
root.getRefVar = getRefVar
root.getLitVal = getLitVal
root.getLambdaBody = getLambdaBody
root.getLambdaVar = getLambdaVar
root.getApplyFunc = getApplyFunc
root.getApplyArg = getApplyArg
root.print = print
root.ifParsed = ifParsed
root.snip = snip
root.throwError = throwError
root.foldLeft = foldLeft
root.Scanner = Scanner
root.Leisure_token = Leisure_token
root.Leisure_lexCons = Leisure_lexCons
root.ensureLeisureClass = ensureLeisureClass
root.LeisureObject = LeisureObject
root.defaultScanner = defaultScanner
