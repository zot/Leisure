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

#
# Parse orgmode files
#

root = module.exports

todoKeywords = ['TODO', 'DONE']

buildHeadlineRE = ->
  new RegExp '^(\\*+) *(' + todoKeywords.join('|') + ')?(?: *(?:\\[#(A|B|C)\\]))?[^\\n]*?((?:[\\w@%#]*:[\\w@%#:]*)? *)$', 'm'
HL_LEVEL = 1
HL_TODO = 2
HL_PRIORITY = 3
HL_TAGS = 4
headlineRE = buildHeadlineRE()
todoRE = /^(\*+) *(TODO|DONE)/
tagsRE = /:[^:]*/
KW_BOILERPLATE = 1
KW_NAME = 2
KW_INFO = 3
keywordRE = /^(#\+([^:\n][^\n]*): *)([^\n]*)$/im
SRC_BOILERPLATE = 1
SRC_NAME = 2
SRC_INFO = 3
srcStartRE = /^(#\+(BEGIN_SRC) *)([^\n]*)$/im
END_NAME = 1
srcEndRE = /^#\+(END_SRC)( *)$/im
RES_NAME = 1
resultsRE = /^#\+(RESULTS): *$/im
resultsLineRE = /^([:|] .*)(?:\n|$)/i
DRAWER_BOILERPLATE = 1
DRAWER_NAME = 2
drawerRE = /^:([^\n:]*): *$/im
endRE = /^:END: *$/im
LIST_LEVEL = 1
LIST_BOILERPLATE = 2
LIST_CHECK = 3
LIST_CHECK_VALUE = 4
LIST_INFO = 5
listRE = /^( *)(- *)(\[( |X)\] +)?(.*)$/m
# markup characters: * / + = ~ _
simpleRE = /\B(\*[/+=~\w](.*?[/+=~\w])?\*|\/[*+=~\w](.*?[*+=~\w])?\/|\+[*/=~\w](.*?[*/=~\w])?\+|=[+*/~\w](.*?[+*/~\w])?=|~[=+*/\w](.*?[=+*/\w])?~)(\B|$)|\b_[^_]*\B_(\b|$)/
LINK_HEAD = 1
LINK_INFO = 2
LINK_DESCRIPTION = 3
linkRE = /(\[\[([^\]]*)\])(?:\[([^\]]*)\])?\]/
HTML_START_NAME = 1
htmlStartRE = /^#\+(BEGIN_HTML) *$/im
htmlEndRE = /^#\+END_HTML *$/im

matchLine = (txt)->
  checkMatch(txt, srcStartRE, 'srcStart') ||
  checkMatch(txt, srcEndRE, 'srcEnd') ||
  checkMatch(txt, resultsRE, 'results') ||
  checkMatch(txt, keywordRE, 'keyword') ||
  checkMatch(txt, headlineRE, (m)-> "headline-#{m[HL_LEVEL].length}") ||
  checkMatch(txt, listRE, 'list') ||
  checkMatch(txt, htmlStartRE, 'htmlStart') ||
  checkMatch(txt, htmlEndRE, 'htmlEnd')

checkMatch = (txt, pat, result)->
  m = txt.match pat
  if m?.index == 0
    if typeof result == 'string' then result else result m
  else false

class Node
  constructor: -> @markup = markupText @text
  length: -> @text.length
  end: -> @offset + @text.length
  toJson: -> JSON.stringify @toJsonObject(), null, "  "
  allText: -> @text
  block: false
  findNodeAt: (pos)-> if @offset <= pos && pos < @offset + @text.length then this else null
  scan: (func)-> func @
  scanWithChildren: (func)->
    func @
    for c in @children
      c.scan func
  linkNodes: -> this
  next: null
  prev: null
  top: -> if !@parent then this else @parent.top()
  toString: -> @toJson()
  allTags: -> @parent?.allTags() ? []

class Headline extends Node
  constructor: (@text, @level, @todo, @priority, @tags, @children, @offset)-> super()
  block: true
  lowerThan: (l)-> l < @level
  length: -> @end() - @offset
  end: ->
    if @children.length
      lastChild = @children[@children.length - 1]
      lastChild.offset + lastChild.length()
    else super()
  type: 'headline'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    level: @level
    todo: @todo
    priority: @priority
    tags: @tags
    children: (c.toJsonObject() for c in @children)
  allText: -> @text + (c.allText() for c in @children).join ''
  findNodeAt: (pos)->
    if pos < @offset  || @offset + @length() < pos then null
    else if pos < @offset + @text.length then this
    else
      # could binary search this
      for child in @children
        if res = child.findNodeAt pos then return res
      null
  scan: Node.prototype.scanWithChildren
  linkNodes: ->
    prev = null
    for c in @children
      c.linkNodes()
      c.parent = this
      c.prev = prev
      if prev then prev.next = c
      prev = c
    this
  addTags: (set)->
    for tag in parseTags @tags
      set[tag] = true
    set
  addAllTags: -> @addTags @parent?.addAllTags() || {}
  allTags: -> k for k of @addAllTags()

class Meat extends Node
  constructor: (@text, @offset)-> super()
  lowerThan: (l)-> true
  type: 'meat'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset

markupTypes =
  "*": 'bold'
  "/": 'italic'
  "_": 'underline'
  "=": 'verbatim'
  "~": 'code'
  "+": 'strikethrough'

#* bold, / italic, _ underline, = verbatim, ~ code, + strikethrough
class SimpleMarkup extends Meat
  constructor: (@text, @offset, @children)-> @markupType = markupTypes[@text[0]]
  type: 'simple'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    markupType: @markupType
    children: (c.toJsonObject() for c in @children)
  scan: Node.prototype.scanWithChildren

class Link extends Meat
  constructor: (@text, @offset, @path, @children)->
  type: 'link'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    path: @path
    children: (c.toJsonObject() for c in @children)
  scan: Node.prototype.scanWithChildren

class XListItem extends Meat
  constructor: (@text, @offset, @contentOffset, @level, @checked, @info)-> super @text, @offset
  type: 'list'
  toJsonObject: ->
    obj =
      type: @type
      text: @text
      level: @level
      offset: @offset
      contentOffset: @contentOffset
      info: @info
    if @checked? then obj.checked = @checked
    obj
  getParent: ->
    if @level == 0 then null
    li = @
    while li = li.getPreviousListItem()
      if li.level < @level then return li
  getPreviousListItem: ->
    prev = @prev
    while prev && !(prev instanceof Headline) && !(prev instanceof ListItem)
      prev = prev.prev
    if prev instanceof ListItem then prev else null
  getNextListItem: ->
    next = @next
    while next && !(next instanceof Headline) && !(next instanceof ListItem)
      next = next.next
    if next instanceof ListItem then next else null

class ListItem extends Meat
  constructor: (@text, @offset, @level, @checked, @contentOffset, @children)-> super @text, @offset
  type: 'list'
  toJsonObject: ->
    obj =
      type: @type
      text: @text
      level: @level
      offset: @offset
      contentOffset: @contentOffset
      children: child.toJsonObject() for child in @children
    if @checked? then obj.checked = @checked
    obj
  getParent: ->
    if @level == 0 then null
    li = @
    while li = li.getPreviousListItem()
      if li.level < @level then return li
  getPreviousListItem: ->
    prev = @prev
    while prev && !(prev instanceof Headline) && !(prev instanceof ListItem)
      prev = prev.prev
    if prev instanceof ListItem then prev else null
  getNextListItem: ->
    next = @next
    while next && !(next instanceof Headline) && !(next instanceof ListItem)
      next = next.next
    if next instanceof ListItem then next else null
  scan: Node.prototype.scanWithChildren

class Drawer extends Meat
  constructor: (@text, @offset, @contentPos, @endPos)-> super @text, @offset
  type: 'drawer'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    contentPos: @contentPos
    endPos: @endPos
  leading: -> @text.substring 0, @contentPos
  content: -> @text.substring @contentPos, @endPos
  trailing: -> @text.substring @endPos
  name: ->
    n = @leading().trim()
    n.substring 1, n.length - 1

class Keyword extends Meat
  constructor: (@text, @offset, @name, @info)-> super @text, @offset
  block: true
  type: 'keyword'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    name: @name
    info: @info

class Source extends Keyword
  constructor: (@text, @offset, @name, @info, @infoPos, @content, @contentPos)-> super @text, @offset, @name, @info
  type: 'source'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    name: @name
    info: @info
    infoPos: @infoPos
    content: @content
    contentPos: @contentPos

class HTML extends Keyword
  constructor: (@text, @offset, @name, @contentStart, @contentLength)-> super @text, @offset, @name
  type: 'html'
  leading: -> @text.substring 0, @contentStart
  trailing: -> @text.substring @contentStart + @contentLength
  content: -> @text.substring @contentStart, @contentStart + @contentLength
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    contentStart: @contentStart
    contentLength: @contentLength

class Results extends Keyword
  constructor: (@text, @offset, @name, @contentPos)->  super @text, @offset, @name
  type: 'results'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    name: @name
    contentPos: @contentPos

#
# Parse the content of an orgmode file
#
parseOrgMode = (text, offset)->
  [res, rest] = parseHeadline '', offset ? 0, 0, undefined, undefined, undefined, text, text.length
  if rest.length then throw new Error("Text left after parsing: #{rest}")
  res.linkNodes()

parseHeadline = (text, offset, level, todo, priority, tags, rest, totalLen)->
  children = []
  while true
    oldRest = rest
    [child, rest] = parseOrgChunk rest, totalLen - rest.length + offset, level
    if !child then break
    if child.lowerThan level
      while child
        children.push child
        child = child.next
    else rest = oldRest
  [new Headline(text, level, todo, priority, tags || '', children, offset), rest]

parseTags = (text)->
  tagArray = []
  for t in (if text then text.split ':' else [])
    if t then tagArray.push t
  tagArray

fullLine = (match, text)-> text.substring match.index, match.index + match[0].length + (if text[match.index + match[0].length] == '\n' then 1 else 0)

parseOrgChunk = (text, offset, level)->
  if !text then [null, text]
  else
    m = text.match headlineRE
    if m?.index == 0
      if m[HL_LEVEL].length <= level then [null, text]
      else
        line = fullLine m, text
        parseHeadline line, offset, m[HL_LEVEL].length, m[HL_TODO], m[HL_PRIORITY], m[HL_TAGS], text.substring(line.length), offset + text.length
    else
      meat = text.substring 0, if m then m.index else text.length
      parseMeat meat, offset, text.substring meat.length

parseMeat = (meat, offset, rest, middleOfLine)->
  srcStart = meat.match srcStartRE
  keyword = meat.match keywordRE
  results = meat.match resultsRE
  list = meat.match listRE
  simple = meat.match simpleRE
  link = meat.match linkRE
  htmlStart = meat.match htmlStartRE
  drawer = meat.match drawerRE
  if !middleOfLine
    if results?.index == 0
      line = fullLine results, meat
      return parseResults line, offset, meat.substring(line.length) + rest
    else if srcStart?.index == 0
      line = fullLine srcStart, meat
      return parseSrcBlock line, offset, srcStart[SRC_INFO], srcStart[SRC_BOILERPLATE].length, meat.substring(line.length) + rest
    else if keyword?.index == 0
      line = fullLine keyword, meat
      return parseKeyword keyword, line, offset, keyword[KW_NAME], keyword[KW_INFO], meat.substring(line.length) + rest
    else if list?.index == 0
      line = fullLine list, meat
      return parseList list, line, offset, list[LIST_LEVEL]?.length ? 0, list[LIST_CHECK_VALUE], list[LIST_INFO], meat.substring(line.length) + rest
    else if htmlStart?.index == 0
      line = fullLine htmlStart, meat
      return parseHtmlBlock line, offset, meat.substring(line.length) + rest
    else if drawer?.index == 0
      line = fullLine drawer, meat
      newRest = meat.substring(line.length) + rest
      if end = newRest.match endRE then return parseDrawer line, offset, end, newRest
  if simple?.index == 0
    inside = simple[0].substring 1, simple[0].length - 1
    insideOffset = offset + 1
    children = []
    while inside
      [child, inside] = parseMeat inside, insideOffset, '', true
      while child
        children.push child
        insideOffset = child.offset + child.text.length
        child = child.next
    node = new SimpleMarkup simple[0], offset, children
  else if link?.index == 0
    inside = link[LINK_DESCRIPTION]
    insideOffset = offset + link[LINK_HEAD].length
    children = []
    while inside
      [child, inside] = parseMeat inside, insideOffset, '', true
      while child
        children.push child
        insideOffset = child.offset + child.text.length
        child = child.next
    node = new Link link[0], offset, link[LINK_INFO], children
  else
    first = meat.length + offset
    first = Math.min(first, srcStart?.index ? first, keyword?.index ? first, results?.index ? first, list?.index ? first, simple?.index ? first, link?.index ? first, htmlStart?.index ? first)
    node = new Meat(meat.substring(0, first), offset)
  meat = meat.substring node.text.length
  parseRestOfMeat node, meat, rest

parseRestOfMeat = (node, meat, rest)->
  if meat && node.text[node.text.length - 1] != '\n'
    [node2, rest] = parseMeat meat, node.offset + node.allText().length, rest, true
    node.next = node2
    [node, rest]
  else [node, meat + rest]

parseResults = (text, offset, rest)->
  oldRest = rest
  while m = rest.match resultsLineRE
    rest = rest.substring m[0].length
  lines = oldRest.substring 0, oldRest.length - rest.length
  [new Results(text + lines, offset, text.match(resultsRE)[RES_NAME], text.length), rest]

parseDrawer = (text, offset, end, rest)->
  pos = end.index + (fullLine end, rest).length
  [new Drawer(text + rest.substring(0, pos), offset, text.length, text.length + end.index), rest.substring pos]

parseKeyword = (match, text, offset, name, info, rest)->
  [new Keyword(text, offset, name, text.substring match[KW_BOILERPLATE].length), rest]

parseSrcBlock = (text, offset, info, infoPos, rest)->
  end = rest.match srcEndRE
  otherSrcStart = rest.match srcStartRE
  if !end || (otherSrcStart && otherSrcStart.index < end.index)
    line = text.match /^.*\n/
    if !line then line = [text]
    [new Meat(line[0]), text.substring(line[0].length) + rest]
  else
    endLine = fullLine end, rest
    [new Source(text + rest.substring(0, end.index + endLine.length), offset, text.match(srcStartRE)[SRC_NAME], info, infoPos, rest.substring(0, end.index), offset + text.length), rest.substring end.index + endLine.length]

parseHtmlBlock = (text, offset, rest)->
  end = rest.match htmlEndRE
  otherHtmlStart = rest.match htmlStartRE
  line = text.match /^.*\n/
  if !line then line = [text]
  if !end || (otherHtmlStart && otherHtmlStart.index < end.index)
    [new Meat(line[0]), text.substring(line[0].length) + rest]
  else
    endLine = fullLine end, rest
    [new HTML(text + rest.substring(0, end.index + endLine.length), offset, text.match(htmlStartRE)[HTML_START_NAME], line[0].length, text.length + end.index - line[0].length), rest.substring end.index + endLine.length]

parseList = (match, text, offset, level, check, info, rest)->
  contentOffset = listContentOffset match
  insideOffset = offset + contentOffset
  inside = text.substring contentOffset
  children = []
  while inside
    console.log "PARSING: #{inside}"
    [node, inside] = parseMeat inside, insideOffset, '', true
    while node
      children.push node
      insideOffset += node.allText().length
      node = node.next
  [new ListItem(text, offset, level, check == 'X' || (if check == ' ' then false else null), contentOffset, children), rest]

listContentOffset = (match)->
  match[LIST_LEVEL].length + match[LIST_BOILERPLATE].length + (match[LIST_CHECK]?.length ? 0)

markupText = (text)->

root.parseOrgMode = parseOrgMode
root.Headline = Headline
root.Meat = Meat
root.Keyword = Keyword
root.Source = Source
root.HTML = HTML
root.Results = Results
root.resultsRE = resultsRE
root.ListItem = ListItem
root.SimpleMarkup = SimpleMarkup
root.Link = Link
root.Drawer = Drawer
root.drawerRE = drawerRE
root.headlineRE = headlineRE
root.HL_TAGS = HL_TAGS
root.parseTags = parseTags
root.matchLine = matchLine
root.keywordRE = keywordRE
root.KW_BOILERPLATE = KW_BOILERPLATE
root.KW_NAME = KW_NAME
root.srcStartRE = srcStartRE
root.SRC_BOILERPLATE = SRC_BOILERPLATE
root.SRC_INFO = SRC_INFO
