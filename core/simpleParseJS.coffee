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
  cons,
  Nil,
  consFrom,
  head,
  tail,
  define,
  setDataType,
  setType,
  ensureLeisureClass,
  ref,
  lit,
  apply,
  lambda,
  llet,
  anno,
  ast2Json,
} = root = module.exports = require './ast'
{
  runMonad,
  defaultEnv,
  identity,
} = require './runtime'
{gen} = require './gen'
_ = require('./lodash.min')

delimiterListPrefix = /"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\n *|#.*/.source

delimiterList = [
  '\\(',
  '\\)',
  ' +',
  '\\.',
  '\\\\\\\\',
  '\\\\@',
  '\\\\',
]

delimiters = _.object(_.map(delimiterList, (x)->[x, true]))

delimiterPat = null

getDelimiterInfo = -> _.clone delimiterList

setDelimiterInfo = (info)->
  delimiterList = info
  delimiters = _.object(_.map(delimiterList, (x)->[x, true]))
  makeDelimterPat()

defPat = /^([^ =]+).*=/

makeDelimterPat = ->
  # reverse sorting by length is important for tokens that prefixe other tokens
  _.sortBy delimiters, (x)->-x.length
  root.delimiterPat = delimiterPat = new RegExp "(#{delimiterListPrefix}|#{delimiterList.join('|')})"

regexpEscapePat = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g

addDelimiter = (del)->
  if !delimiters[del]
    delimiters[del] = true
    delimiterList.push(del.replace regexpEscapePat, "\\$&")
    makeDelimterPat()

makeDelimterPat()

############
# TOKENS
############

L_token = setDataType ((txt)->(pos)-> setType ((f)-> f()(txt)(pos)), 'token'), 'token'
#ensureLeisureClass 'token'
#Leisure_token.prototype.toString = -> "Token(#{JSON.stringify(tokenString(@))}, #{tokenPos(@)})"

tokenString = (t)-> t(->(txt)->(pos)-> txt())
tokenPos = (t)-> t(->(txt)->(pos)-> pos())
token = (str, pos)-> L_token(->str)(->pos)
isToken = (t)-> t instanceof Leisure_token

L_parens = setDataType ((left)->(right)->(content)-> setType ((f)-> f()(left)(right)(content)), 'parens'), 'parens'
#ensureLeisureClass 'parens'
#Leisure_parens.prototype.toString = -> "Parens(#{parensStart @}, #{parensEnd @}, #{parensContent @})"

parens = (start, end, content)->
  if content instanceof Leisure_cons && tail(content) == Nil then parens start, end, head(content)
  else if isToken content then content
  else L_parens(->start)(->end)(->content)

parensFromToks = (left, right, content)->
  start = tokenPos left
  end = tokenPos(right) + tokenString(right).length
  L_parens(->start)(->end)(->content)

parensStart = (p)-> p(->(s)->(e)->(l)-> s())
parensEnd = (p)-> p(->(s)->(e)->(l)-> e())
parensContent = (p)-> p(->(s)->(e)->(l)-> l())
isParens = (p)-> p instanceof Leisure_parens
stripParens = (p)-> if isParens p then parensContent p else p

L_parseErr = setDataType ((msg)-> setType ((f)-> f()(msg)), 'parseErr'), 'parseErr'
ensureLeisureClass 'parseErr'
Leisure_parseErr.prototype.toString = -> "ParseErr(#{JSON.stringify(parseErrMsg(@))})"

parseErr = (msg)->
  #L_parseErr(->msg)
  throw new Error msg
parseErrMsg = (e)-> e(->(msg)-> msg())

makeTokens = (strings, start)->
  if strings == Nil then Nil
  else makeMoreTokens strings, start

makeMoreTokens = (strings, start)->
  first = head strings
  if first[0] in ' #' then makeTokens(tail(strings), start + first.length)
  else if first[0] == '\n' and (head tail strings)[0] == '#' then makeTokens(tail(tail strings), start + first.length + (head(tail strings).length))
  else cons token(first, start), makeTokens(tail(strings), start + first.length)

splitTokens = (str)-> consFrom(_.filter str.split(delimiterPat), (s)-> s.length)

tokens = (str)-> makeTokens splitTokens(str), 0

#############
## Parsing
#############

isTokenString = (t, str)-> isToken(t) && tokenString(t) == str
isTokenStart = (t, str)-> isToken(t) && tokenString(t).substring(0, str.length) == str

withCons = (l, nilCase, cont)-> if l instanceof Leisure_cons then cont head(l), tail(l) else nilCase()

parseToks = (toks, cont)->
  if toks == Nil then cont Nil
  else parseTok toks, (h, t)->
    parseToks t, (res)->
      cont cons h, res

parseTok = (toks, cont)->
  withCons toks, (->Nil), (h, t)->
    if isTokenString h, '(' then parseGroup h, t, Nil, cont
    else if isTokenStart h, '\n' then parseIndent h, t, Nil, cont
    else cont h, t

parseGroup = (left, toks, gr, cont)->
  withCons toks, (->parseErr "Unterminated group starting at #{tokenPos left}"), (h, t)->
    if isTokenString h, ')' then cont parensFromToks(left, h, gr.reverse()), t
    else parseTok toks, (restH, restT)->
      parseGroup left, restT, cons(restH, gr), cont

parseIndent = (indent, toks, gr, cont)->
  withCons toks, (-> cont parens(tokenPos(indent), lexEnd(head gr), gr.reverse()), Nil), (h, t)->
    if isTokenString(h, ')') || (isTokenStart(h, '\n') && tokenString(h).length <= tokenString(indent).length) then cont parens(tokenPos(indent), tokenPos(h), gr.reverse()), toks
    else parseTok toks, (restH, restT)->
      parseIndent indent, restT, cons(restH, gr), cont

identity = (x)-> x

#parse = (str)-> parseToks tokens(str), identity
parse = (str)-> parseIndent token('\n', 0), tokens(str), Nil, (h, t)-> stripParens h

#################
## Creating ASTs
#################

#
# The CPS-like technique, here, seems very close to monads
# if it's really just monads, maybe this could be done with do
# Need to learn monads a little deeper, I think

parseToAst = (str)-> createAst parse(str), Nil, identity

withToken = (tok, nonTokenCase, cont)-> if isToken tok then cont (tokenString tok) else nonTokenCase()

withParens = (p, err, cont)-> if isParens p then cont parensContent p else err()

strip = (list, cont)-> withParens list, (->cont list), (c)-> strip c, cont

position = (thing)->
  if isToken thing then tokenPos thing
  else if isParens thing then parensStart thing
  else if thing instanceof Leisure_cons then position head thing
  else -1

lexEnd = (thing)->
  if isToken thing then tokenPos(thing) + tokenString(thing).length
  else if isParens thing then parensEnd(thing)
  else if thing instanceof Leisure_cons then lexEnd thing.last()
  else -1

loc = (thing)->
  p = position thing
  "at #{if p == -1 then 'an unknown location' else p}"

createAst = (inList, names, cont)-> strip inList, (list)->
  if isToken(list) then createLitOrRef tokenString(list), names, cont
  else withCons list, (-> cont Nil), (h, t)->
    if isTokenString(h, '\\\\') then createLet h, t, names, cont
    else if isTokenString(h, '\\@') then createAnno h, t, names, cont
    else if isTokenString(h, '\\') then createLambda h, t, names, cont
    else createApply list, names, cont

createLitOrRef = (tok, names, cont)->
  if names.find((el)-> el == tok) != Nil then cont ref tok
  else
    try
      if tok[0] in "\"'" then cont lit parseString tok.substring 1, tok.length - 1
      else if (tok[0] >= '0' and tok[0] <= '9') or tok[0] == '-' then cont lit JSON.parse tok
      else cont ref tok
    catch err
      cont ref tok

charCodes =
  "b": '\b'
  "f": '\f'
  "n": '\n'
  "r": '\r'
  "t": '\t'
  "v": '\v'
  "'": '\''
  "\"": '\"'
  "\\": '\\'

parseString = (str)->
  res = ''
  i = 0
  parseCode = (pat, radix)->
    code = str.substring(i).match(pat)[0]
    res += String.fromCharCode parseInt code, radix
    i += code.length
  while i < str.length
    if str[i] == '\\'
      i++
      if str[i] >= '0' && str[i] <= '9' then parseCode /[0-9]+/, 8
      else if str[i] == 'x'
        i++
        parseCode /[0-9a-fA-F][0-9a-fA-F]/, 16
      else if str[i] == 'u'
        i++
        parseCode /[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]/, 16
      else if !charCodes[str[i]] then throw new Error "Unknown character escape: \\#{str[i]}"
      else res += charCodes[str[i++]]
    else res += str[i++]
  res

createLambda = (start, list, names, cont)->
  withCons list, (-> parseErr "No variable or body for lambda #{loc start}"), (name, rest)->
    withCons rest, (-> parseErr "No body for lambda #{loc start}"), (dot, body)->
      withToken name, (-> parseErr "Expecting name for lambda #{loc start}"), (n)->
        if isTokenString dot, '.' then createAst body, cons(n, names), (bodyAst)->
          cont lambda n, bodyAst
        else createLambda start, rest, cons(n, names), (bodyAst)->
          cont lambda n, bodyAst

createAnno = (start, list, names, cont)->
  withCons list, (-> parseErr "No annotation name or data in annotation #{loc start}"), (name, rest)->
    withCons rest, (-> parseErr "No data for annotation #{loc start}"), (data, rest)->
      finish = (data, body)-> createAst body, names, (bodyAst)->
        cleanTokens start, name, (name)->
          cleanTokens start, data, (data)->
            cont anno(name, data, bodyAst)
      if isTokenString data, '.' then finish Nil, rest
      else
        strip data, (data)->
          withCons rest, (-> parseErr "No body for annotation #{loc start}"), (dot, body)->
            if isTokenString dot, '.' then finish data, body
            else parseErr "Annotation expected dot after name and data"

cleanTokens = (start, toks, cont)->
  if isToken toks then cont tokenString toks
  else withCons toks, (->cont toks), (head, tail)->
    cleanTokens start, head, (head)->
      cleanTokens start, tail, (tail)->
        cont cons head, tail

createApply = (inList, names, cont)-> strip inList, (list)->
  withCons list, (-> parseErr "Expecting a non-empty list #{loc inList}"), (h, t)->
    createAst h, names, (func)-> chainApply func, t, names, cont

chainApply = (func, list, names, cont)->
  withCons list, (-> cont func), (argItem, rest)->
    if isToken(argItem) and tokenString(argItem) in ['\\', '\\\\', '\\@'] then createAst list, names, (arg)->
      cont apply(func, arg)
    else
      createAst argItem, names, (arg)->
        chainApply apply(func, arg), rest, names, cont

# let structures allow mutual recursion
# the syntax is similar to the top level
# they are a series of bindings followed by a single expression
# \\ (a = b) (d e f = g h) . expr
# the first case binds a variable to an expression
# the second case binds a variable to a lambda
createLet = (start, list, names, cont)->
  withCons list, (-> parseErr "No variable or body for let #{loc start}"), (binding, body)->
    if body == Nil then createAst binding, names, cont
    else getLetNames start, list, names, (newNames)->
      createSublets start, binding, body, newNames, cont

getLetNames = (start, list, names, cont)->
  withCons list, (-> cont names), (binding, body)->
    if isTokenString binding, '.' then cont names
    else withParens binding, (-> parseErr "Let expected binding, but no parens or indented line at #{loc start}"), (def)->
      withCons def, (-> parseErr "Let expected binding, but no list #{loc start}"), (name, rest)->
        withToken name, (-> parseErr "Let expected binding but no name #{loc start}"), (str)->
          getLetNames start, body, cons(str, names), cont

createSublets = (start, binding, body, names, cont)->
  if isTokenString binding, '.' then createAst body, names, cont
  else withCons body, (-> parseErr "Let expected a body"), (bodyH, bodyT)->
    getNameAndDef parensStart(binding), parensContent(binding), names, (name, def)->
      createSublets start, bodyH, bodyT, names, (bodyAst)->
        cont llet (tokenString name), def, bodyAst

getNameAndDef = (pos, binding, names, cont)->
  withCons tail(binding), (-> parseErr "Let expected binding at #{pos}"), (snd, sndT)->
    if isTokenString snd, '=' then createAst sndT, names, (def)-> cont head(binding), def
    else getLetLambda pos, tail(binding), Nil, names, (lamb)-> cont head(binding), lamb

getLetLambda = (pos, def, args, names, cont)->
  withCons def, (-> parseErr "Let expected binding at #{pos}"), (arg, rest)->
    if !isToken arg then parseErr "Let expected binding at #{pos}"
    else if isTokenString arg, '=' then createAst cons(token('\\', pos), args.reverse()).append(cons(token('.', position(arg)), rest)), names, cont
    else getLetLambda pos, rest, cons(arg, args), names, cont

###############
# Compiling
###############

scanLine = (str, isDef, isExpr)->
  try
    toks = tokens str
    if str.match defPat
      name = head toks
      func = if isTokenString (head tail toks), '='
        if isTokenString (head tail tail toks), '\\' then setTypeAnno (head tail tail toks), (tail tail toks), tokenString name
        else tail tail toks
      else cons token('\\', position(head tail toks) - 1), transformDef name, tail toks
      parseToks checkSetDataType(func, tail(toks), name), (list)->
        isDef createDef(list, name, arity(tail(toks), 0), str)
    else
      parseToks toks, (list)->
        isExpr list
  catch err
    console.log "Error parsing <#{str}>, #{err.message}"
    err.message = "Error parsing <#{str}>, #{err.message}"
    throw err

parseLine = (str, names, isDef, isExpr)->
  astCallback = (cb)-> (list)-> createAst list, names, (ast)-> cb ast
  scanLine str, astCallback(isDef), astCallback(isExpr)

genLine = (str, names, isDef, isExpr)->
  parseLine str,
    names,
    ((ast)-> isDef gen ast),
    ((ast)-> isExpr gen ast)

compileLine = (str, names, isDef, isExpr)->
  genLine str,
    names,
    ((code)-> runMonad (eval "(#{code})"), defaultEnv, isDef),
    ((code)-> runMonad (eval "(#{code})"), defaultEnv, isExpr)

transformDef = (name, toks)->
  if isTokenString head(toks), '='
    if isTokenString head(tail toks), '\\' then cons token('.', position(head toks)), setTypeAnno head(tail toks), tail(toks), tokenString name
    else cons token('.', position(head toks)), tail toks
  else cons head(toks), transformDef name, tail toks

setTypeAnno = (start, toks, name)->
  pos = position start
  tok = (str)-> token(str, pos)
  cons tok('\\@'), cons tok('type'), cons tok(name), cons tok('.'), toks

createDef = (def, name, arity, src)->
  tok = (str)-> token(str, (position def))
  cons tok('define'), cons tok(JSON.stringify tokenString name), cons tok(String(arity)), cons tok(JSON.stringify src), cons (cons def, Nil), Nil

checkSetDataType = (toks, curToks, name)->
  if isTokenString(head(curToks), '=')
    if isTokenString (head tail curToks), '\\' then setDataTypeAnno toks, name else toks
  else checkSetDataType toks, tail(curToks), name

setDataTypeAnno = (toks, name)->
  pos = position toks
  cons token('\\@', pos), cons token('dataType', pos), cons token(tokenString(name), pos), cons token('.', pos), toks

arity = (toks, n)-> if isTokenString head(toks), '=' then n else arity tail(toks), n + 1

tokListStr = (toks)-> JSON.stringify toks.map((t)->tokenString t).join(' ')

linesForFile = (text)-> _.filter text.split(/\n(?=[^ ]|$)/), (line)-> not line.match /^[ \i]*\#.*|^[ \i]*$|^\n[ \i]*$/

namesForLines = (lines)-> _.foldl lines,
  ((result, line)-> if m = line.match defPat then cons m[1], result else result),
  Nil

compileFile = (text, filename)->
  id = (x)-> x
  lines = linesForFile text
  names = namesForLines lines
  "require('source-map-support').install();\n" +
     _.map(lines, (line)-> "runMonad(#{genLine line.trim(), names, id, id});\n").join('') +
    (if filename then "\n//@ sourceURL=#{filename}\n" else "")

jsonForFile = (text)->
  id = (x)-> x
  lines = linesForFile text
  names = namesForLines lines
  _.map(lines, (line)-> JSON.stringify ast2Json parseLine line, names, id, id).join('\n')

root.splitTokens = splitTokens
root.tokens = tokens
root.tokenString = tokenString
root.parse = parse
root.parseToAst = parseToAst
root.compileLine = compileLine
root.parseLine = parseLine
root.scanLine = scanLine
root.genLine = genLine
root.compileFile = compileFile
root.jsonForFile = jsonForFile
root.linesForFile = linesForFile
root.getDelimiterInfo = getDelimiterInfo
root.setDelimiterInfo = setDelimiterInfo
root.addDelimiter = addDelimiter
