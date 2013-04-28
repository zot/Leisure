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

if window? and (!global? or global == window)
  window.global = window
  root = window.Leisure = window.Leisure || {}
else
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
  } = root = exports = module.exports = require './ast'
  inspect = require('util').inspect # for testing
  _ = require('./lodash.min')

delimiterList = [
  '\\n *',
  '\\(',
  '\\)',
  ' +',
  '\\.',
  '\\\\\\\\',
  '\\\\',
]

delimiters = _.object(_.map(delimiterList, (x)->[x, true]))

delimiterPat = null

makeDelimterPat = ->
  console.log "New delimiterPat: '(#{delimiterList.join('|')})'"
  delimiterPat = new RegExp "(#{delimiterList.join('|')})"

addDelimiter = (del)->
  if !delimiters
    delimiters[del] = true
    delimiterList.push(del)
    # reverse sorting by length is important for tokens that prefixe other tokens
    _.sortBy delimiters, (x)->-x.length
    makeDelimterPat()
  end

makeDelimterPat()

define 'token', (->setDataType ((txt)->(pos)-> setType ((f)-> f()(txt)(pos)), 'token'), 'token'), 2, '\\txt pos . \\f . f txt pos'
ensureLeisureClass 'token'
Leisure_token.prototype.toString = -> "Token(#{JSON.stringify(tokenString(@))}, #{tokenPos(@)})"

tokenString = (t)-> t(->(txt)->(pos)-> txt())

tokenPos = (t)-> t(->(txt)->(pos)-> pos())

token = (str, pos)-> L_token()(->str)(->pos)

isTok = (t)-> t instanceof Leisure_token

define 'parens', (->setDataType ((left)->(right)->(ast)-> setType ((f)-> f()(left)(right)(ast)), 'parens'), 'parens'), 3, '\\left right ast . \\f . f left right ast'
ensureLeisureClass 'parens'
Leisure_parens.prototype.toString = -> "Parens(#{parensStart @}, #{parensEnd @}, #{parensList @})"

parens = (start, end, list)-> L_parens()(->start)(->end)(->list)

parensFromToks = (left, right, list)->
  start = tokenPos left
  end = tokenPos(right) + tokenString(right).length
  L_parens()(->start)(->end)(->list)

parensStart = (p)-> p(->(s)->(e)->(l)-> s())

parensEnd = (p)-> p(->(s)->(e)->(l)-> e())

parensList = (p)-> p(->(s)->(e)->(l)-> l())

isParens = (p)-> p instanceof Leisure_parens

define 'parseErr', (->setDataType ((msg)-> setType ((f)-> f()(msg)), 'parseErr'), 'parseErr'), 1, '\\msg . \\f . f msg'
ensureLeisureClass 'parseErr'
Leisure_parseErr.prototype.toString = -> "ParseErr(#{JSON.stringify(parseErrMsg(@))})"

parseErr = (msg)-> L_parseErr()(->msg)

parseErrMsg = (e)-> e(->(msg)-> msg())

makeTokens = (strings, start)->
  if strings == Nil then Nil
  else if head(strings)[0] == ' ' then makeTokens(tail(strings), start + head(strings).length)
  else cons token(head(strings), start), makeTokens(tail(strings), start + head(strings).length)

splitTokens = (str)-> consFrom(_.filter str.split(delimiterPat), (s)-> s.length)

tokens = (str)-> makeTokens splitTokens(str), 0

#############
## Parsing
#############

isTokString = (t, str)-> isTok(t) && tokenString(t) == str

parseToks = (toks, cont)->
  if toks == Nil then cont Nil
  else
    parseTok toks, (h, t)->
      parseToks t, (res)->
        cont cons h, res

parseTok = (toks, cont)->
  if toks == Nil then Nil
  else
    h = head toks
    t = tail toks
    if isTokString(h, '(') then parseGroup h, t, Nil, cont
    else if isTok(h) && tokenString(h)[0] == ' ' then parseTok t, cont
    else cont h, t

parseGroup = (left, toks, gr, cont)->
  if toks == Nil then parseErr "Unterminated group starting at #{tokenPos left}"
  else
    h = head toks
    if isTokString(h, ')') then cont parensFromToks(left, h, gr.reverse()), tail(toks)
    else parseTok toks, (restH, restT)->
      parseGroup left, restT, cons(restH, gr), cont

identity = (x)-> x

parse = (str)-> parseToks tokens(str), identity

#################
## Creating ASTs
#################

#
# The CPS-like technique, here, seems very close to monads
# if it's really just monads, maybe this could be done with do
# Need to learn monads a little deeper, I think

parseToAst = (str)-> createAst parse(str), Nil, identity

strip = (list, cont)-> if isParens list then strip parensList(list), cont else cont list

isCons = (c)-> c instanceof Leisure_cons

withCons = (l, err, cont)-> if isCons l then cont head(l), tail(l) else err()

withToken = (tok, err, cont)->
  if isTok tok then cont tokenString tok
  else err()

loc = (thing)->
  if isTok thing then "at #{tokenPos thing}"
  else if isParens thing then "at #{parensStart thing}"
  else ''

createAst = (inList, names, cont)-> strip inList, (list)->
  if list == Nil then cont Nil
  else if isTok(list) then createLitOrRef tokenString(list), names, cont
  else withCons list, (-> parseErr "Null list for AST#{loc inList}: #{inList}"), (h, t)->
    if isTokString(h, '\\\\') then createLet h, t, names, cont
    else if isTokString(h, '\\') then createLambda h, t, names, cont
    else createApply list, names, cont

createLitOrRef = (tok, names, cont)->
  if names.find((el)-> el == tok) != Nil then cont ref tok
  else
    try
      cont lit JSON.parse tok
    catch err
      cont ref tok

createLambda = (start, list, names, cont)->
  withCons list, (-> parseErr "No variable or body for lambda at #{tokenPos start}"), (name, rest)->
    withCons rest, (-> parseErr "No body for lambda at #{tokenPos start}"), (dot, body)->
      withToken name, (-> parseErr "Expecting name for lambda at #{tokenPos start}"), (n)->
        if isTokString dot, '.' then createAst body, cons(name, names), (bodyAst)->
          cont lambda n, bodyAst
        else createLambda start, rest, cons(name, names), (bodyAst)->
          cont lambda n, bodyAst

createApply = (inList, names, cont)-> strip inList, (list)->
  withCons list, (-> parseErr "Expecting a non-empty list#{loc inList}"), (h, t)->
    createAst h, names, (func)->
      chainApply func, t, names, cont

chainApply = (func, list, names, cont)->
  if list == Nil then cont func
  else withCons list, (-> parseErr "Expecting list#{loc inList}"), (argItem, rest)->
    createAst argItem, names, (arg)->
      chainApply apply(func, arg), rest, names, cont

withParens = (p, err, cont)-> if !isParens p then err() else cont parensList p

# let structures allow mutual recursion
# the syntax is similar to the top level
# they are a series of bindings followed by a single expression
# \\ (a = b) (d e f = g h) expr
# the first case binds a variable to a value
# the second case binds a variable to a lambda
# lets can be used in place of lambdas
# identity can be defined as: \\ (id x = x) id
# but that's a little verbose
createLet = (start, list, names, cont)->
  withCons list, (-> parseErr "No variable or body for let at #{tokenPos start}"), (binding, body)->
    if body == Nil then createAst binding, names, cont
    else getLetNames start, list, names, (newNames)->
      createSublets start, binding, body, newNames, cont

getLetNames = (start, list, names, cont)->
  withCons list, (-> cont names), (binding, body)->
    if body == Nil then cont names
    else withParens binding, (-> parseErr "Let expected binding at #{tokenPos start}"), (def)->
      withCons def, (-> parseErr "Let expected binding at #{tokenPos start}"), (name, rest)->
        withToken name, (-> parseErr "Let expected binding at #{tokenPos start}"), (str)->
          getLetNames start, body, cons(str, names), cont

createSublets = (start, binding, body, names, cont)->
  withCons body, (->createAst binding, names, cont), (bodyH, bodyT)->
    getNameAndDef parensStart(binding), parensList(binding), names, (name, def)->
      createSublets start, bodyH, bodyT, names, (bodyAst)->
        cont llet tokenString(name), def, bodyAst

getNameAndDef = (pos, binding, names, cont)->
  withCons tail(binding), (-> parseErr "Let expected binding at #{pos}"), (snd, sndT)->
    if isTokString snd, '=' then createAst sndT, names, (def)-> cont head(binding), def
    else getLetLambda pos, tail(binding), Nil, names, (lamb)-> cont head(binding), lamb

getLetLambda = (pos, def, args, names, cont)->
  withCons def, (-> parseErr "Let expected binding at #{pos}"), (arg, rest)->
    if !isToken arg then parseErr "Let expected binding at #{pos}"
    else if isTokString arg, '=' then createAst cons(token('\\', pos), args.reverse()).append(cons(token('.', tokenPos(arg)), rest)), names, cont
    else getLetLambda pos, rest, cons(arg, args), names, cont

root.splitTokens = splitTokens
root.tokens = tokens
root.parse = parse
root.parseToAst = parseToAst
