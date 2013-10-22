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

root = module.exports = require './base'

class DL

dlempty = mkProto DL, (x)-> x
dlnew = (a)-> mkProto DL, (b)-> cons(a, b)
dlappend = (a, b)->
  checkType(a, DL)
  checkType(b, DL)
  mkProto DL, (c)-> a(b(c))

# JS class overlaid on lexCons funcs for convenience
# merge start and end into functional rep
class Leisure_lexCons extends Leisure_BaseCons
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

# Leisure_tokens are also Leisure datatypes overlaid with a JS class for interoperability
class Leisure_token extends LeisureObject
  tok: -> @ ->(t)->(p)->t()
  start: -> @ ->(t)->(p)->p()
  end: -> @start() + @tok().length
  toString: -> "Token('#{@tok()}', #{@start()}-#{@end() - 1})"
  zeroLen: ->
    @end = => @start()
    @

global.Leisure_token = Leisure_token

primToken = setDataType(((tok)->(pos)-> mkProto Leisure_token, setType ((f)-> f()(tok)(pos)), 'token'), 'token')

makeToken = (tok, rest, totalLen)->
  tp = totalLen - rest.length - tok.length
  primToken(->tok)(->tp)

define 'lexCons', (-> primLexCons), 4, '\\a s b e f . f a s b e'
define 'lexStart', (-> (l)-> l().start()), 1, '\\l . l h s t e . s'
define 'lexEnd', (-> (l)-> l().end()), 1, '\\l . l h s t e . e'
define 'token', (-> primToken), 2, '\\tok pos f . f tok pos'
define 'tokenName', (-> (t)-> t().tok()), 1, '\\tok . tok \\n p . n'
define 'tokenStart', (-> (t)-> t().start()), 1, '\\tok . tok \\n p . p'

root.dlempty = dlempty
root.dlnew = dlnew
root.dlappend = dlappend
root.lexCons = lexCons
root.lexDlempty = lexDlempty
root.lexDlnew = lexDlnew
root.lexDlappend = lexDlappend
root.Leisure_token = Leisure_token
root.Leisure_lexCons = Leisure_lexCons
root.ensureLeisureClass = ensureLeisureClass
