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
  } = root = exports = module.exports = require './ast'
  inspect = require('util').inspect # for testing
  _ = require('./lodash.min')

delimiterList = [
  '\\n *',
  '\\(',
  '\\)',
  ' +',
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

doNotNil = (toks, cont)-> if toks == Nil then toks else cont toks

doParsed = (toks, cont)-> if toks instanceof Leisure_parseErr then toks else cont toks

parseToks = (toks)-> doNotNil parseTok(toks), (t)-> doParsed t, ->
  doParsed parseToks(tail(t)), (rest)->
    cons head(t), rest

parseTok = (toks)-> doNotNil toks, ->
  h = head toks
  t = tail toks
  if isTok(h) && tokenString(h) == '(' then parseGroup(t, Nil)
  else if isTok(h) && tokenString(h)[0] == ' ' then parseTok(t)
  else toks

parseGroup = (toks, gr)->
  if toks == Nil then parseErr "Unterminated group"
  else
    h = head toks
    if isTok(h) && tokenString(h) == ')' then cons gr.reverse(), tail(toks)
    else doParsed parseTok(toks), (rest)->
      parseGroup tail(rest), cons(head(rest), gr)

parse = (str)-> parseToks tokens(str)

root.splitTokens = splitTokens
root.tokens = tokens
root.parse = parse
