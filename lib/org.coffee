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
  new RegExp '^(\\*+) *(' + todoKeywords.join('|') + ')?(?: *(?:\\[#(A|B|C)\\]))?[^\\n]*?([\\w@%#]*:[\\w@%#:]*)? *$', 'm'
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
drawerRE = /^( *:)([^\n:]*): *$/im
endRE = /^ *:END: *$/im

matchLine = (txt)->
  checkMatch(txt, srcStartRE, 'srcStart') ||
  checkMatch(txt, srcEndRE, 'srcEnd') ||
  checkMatch(txt, resultsRE, 'results') ||
  checkMatch(txt, keywordRE, 'keyword') ||
  checkMatch(txt, headlineRE, (m)-> "headline-#{m[HL_LEVEL].length}")

checkMatch = (txt, pat, result)->
  m = txt.match pat
  if m?.index == 0
    if typeof result == 'string' then result else result m
  else false

class Node
  length: -> @text.length
  end: -> @offset + @text.length
  toJson: -> JSON.stringify @toJsonObject(), null, "  "
  allText: -> @text
  block: false
  findNodeAt: (pos)-> if @offset <= pos && pos < @offset + @text.length then this else null
  scan: (func)-> func this
  linkNodes: -> this
  next: null
  prev: null
  top: -> if !@parent then this else @parent.top()
  toString: -> @toJson()
  allTags: -> @parent?.allTags() ? []

class Headline extends Node
  constructor: (@text, @level, @todo, @priority, @tags, @children, @offset)->
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
  scan: (func)->
    super func
    for c in @children
      c.scan func
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
  constructor: (@text, @offset)->
  lowerThan: (l)-> true
  type: 'meat'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset

class Keyword extends Meat
  constructor: (@text, @offset, @name, @info)->
  block: true
  type: 'keyword'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    name: @name
    info: @info

class Source extends Keyword
  constructor: (@text, @offset, @name, @info, @content, @contentPos)->
  type: 'source'
  toJsonObject: ->
    type: @type
    text: @text
    offset: @offset
    name: @name
    info: @info
    content: @content
    contentPos: @contentPos

class Results extends Keyword
  constructor: (@text, @offset, @name, @contentPos)->
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
parseOrgMode = (text)->
  [res, rest] = parseHeadline '', 0, 0, undefined, undefined, undefined, text, text.length
  if rest.length then throw new Error("Text left after parsing: #{rest}")
  res.linkNodes()

parseHeadline = (text, offset, level, todo, priority, tags, rest, totalLen)->
  children = []
  while true
    [child, rest] = parseOrgChunk rest, totalLen - rest.length, level
    if !child then break
    if child.lowerThan level
      children.push child
  [new Headline(text, level, todo, priority, tags || '', children, offset), rest]

parseTags = (text)->
  tagArray = []
  for t in (if text then text.split ':' else [])
    if t then tagArray.push t
  tagArray

fullLine = (match, text)-> text.substring 0, match[0].length + (if text[match[0].length] == '\n' then 1 else 0)

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

parseMeat = (meat, offset, rest)->
  srcStart = meat.match srcStartRE
  keyword = meat.match keywordRE
  results = meat.match resultsRE
  if results?.index == 0
    line = fullLine results, meat
    parseResults line, offset, meat.substring(line.length) + rest
  else if srcStart?.index == 0
    line = fullLine srcStart, meat
    parseSrcBlock line, offset, srcStart[SRC_INFO], meat.substring(line.length) + rest
  else if keyword?.index == 0
    line = fullLine keyword, meat
    parseKeyword keyword, line, offset, keyword[KW_NAME], keyword[KW_INFO], meat.substring(line.length) + rest
  else
    first = meat.length + offset
    first = Math.min(first, srcStart?.index ? first, keyword?.index ? first, results?.index ? first)
    [new Meat(meat.substring(0, first), offset), meat.substring(first) + rest]

parseResults = (text, offset, rest)->
  oldRest = rest
  while m = rest.match resultsLineRE
    rest = rest.substring m[0].length
  lines = oldRest.substring 0, oldRest.length - rest.length
  [new Results(text + lines, offset + 1, text.match(resultsRE)[RES_NAME], text.length + offset + 1), rest]

parseKeyword = (match, text, offset, name, info, rest)->
  [new Keyword(text, offset, name, text.substring match[KW_BOILERPLATE].length), rest]

parseSrcBlock = (text, offset, info, rest)->
  end = rest.match srcEndRE
  otherSrcStart = rest.match srcStartRE
  if !end || (otherSrcStart && otherSrcStart.index < end.index)
    line = text.match /^.*\n/
    if !line then line = [text]
    [new Meat(line[0]), text.substring(line[0].length) + rest]
  else
    endLine = fullLine end, rest.substring end.index
    [new Source(text + rest.substring(0, end.index + endLine.length), offset, text.match(srcStartRE)[SRC_NAME], info, rest.substring(0, end.index), offset + text.length), rest.substring end.index + endLine.length]

root.parseOrgMode = parseOrgMode
root.Headline = Headline
root.Meat = Meat
root.Keyword = Keyword
root.Source = Source
root.Results = Results
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
