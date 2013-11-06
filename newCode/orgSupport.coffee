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
  getType,
} = require './ast'
{
  resolve,
  lazy,
  defaultEnv,
} = root = module.exports = require './base'
rz = resolve
lz = lazy
{
  TAB,
  ENTER,
  BS,
  DEL,
} = require './browserSupport'
{
  parseOrgMode,
  Headline,
  Meat,
  Keyword,
  Source,
  Results,
  headlineRE,
  HL_TAGS,
  parseTags,
} = require './org'

editDiv = null
sourceDiv = null
modifying = false
styleCache = {}
idCount = 0
nodes = {}

nextOrgId = -> 'org-node-' + idCount++

getStyle = (node)->
  if !node.id then node.id = nextOrgId()
  style = styleCache[node.orgModeId]
  if !style then style = styleCache[node.orgModeId] = getComputedStyle node
  style

# Thanks to rangy for this: http://code.google.com/p/rangy/
isCollapsed = (node)->
  type = node.nodeType
  type == 7 || # PROCESSING_INSTRUCTION
  type == 8 || # COMMENT
  (type == 3 && (node.data == '' || isCollapsed(node.parentNode))) ||
  /^(script|style)$/i.test(node.nodeName) ||
  (type == 1 && (node.classList.contains('collapsed') ||
  (node.getAttribute('data-org-type') == 'text' && isCollapsed(node.parentNode)) ||
  getStyle(node).display == 'none'))

markupOrg = (text)->
  nodes = {}
  # ensure trailing newline -- contenteditable doesn't like it, otherwise
  if text[text.length - 1] != '\n' then text = text + '\n'
  org = parseOrgMode text
  console.log "ORG:\n#{JSON.stringify org.toJsonObject(), null, '  '}"
  window.ORG = org
  markupNode org, '', true

boundarySpan = "<span data-org-type='boundary'>\n</span>"

orgAttrs = (org)->
  org.nodeId = nextOrgId()
  nodes[org.nodeId] = org
  "id='#{org.nodeId}' data-org-type='#{org.type}'"

markupNode = (org, newline, start)->
  if org instanceof Source || org instanceof Results
    pos = org.contentPos - org.offset - 1
    content = org.text.substring pos
    "<span #{orgAttrs org}><span data-org-type='text'>#{org.text.substring(0, pos)}</span>#{contentSpan content}</span>"
  else if org instanceof Headline then "<span #{orgAttrs org}'>#{contentSpan org.text, 'text'}#{markupGuts org, checkStart start, org.text}</span>"
  else "<span #{orgAttrs org}'>#{org.text}</span>"

checkStart = (start, text)-> start && (!text || text == '\n')

isSourceNode = (node)-> node?.getAttribute?('data-org-type') == 'source'

isDocNode = (node)-> node?.hasAttribute?('maindoc')

markupGuts = (org, start)->
  if !org.children.length then ''
  else
    newline = '\n'
    prev = if start then null else org
    (for c in org.children
      nl = newline
      newline = ''
      s = start
      start = false
      p = prev
      prev = c
      optionalBoundary(p, c) + markupNode(c, nl, s)).join ""

optionalBoundary = (prev, node)-> if prev && (prev.block || node.block) then boundarySpan else ''

contentSpan = (str, type)->
  str = if str[str.length - 1] == '\n' then str.substring(0, str.length - 1) else str
  if str then "<span#{if type then " data-org-type='#{type}'" else ''}>#{str}</span>" else ''

trailingNL = (str)-> if str[str.length - 1] == '\n' then '\n' else ''

fixupNodes = (node)->
  for n in $(node).find('[data-org-type="headline"]')
    setTags n
bindContent = (div, givenSourceDiv)->
  editDiv = div
  sourceDiv = givenSourceDiv
  fixupNodes div
  div.addEventListener 'keydown', (e)->
    c = (e.charCode || e.keyCode || e.which)
    s = window.getSelection()
    r = s.getRangeAt(0)
    if c == TAB
      e.preventDefault()
      collapseNode()
    else if String.fromCharCode(c) == 'C' && e.altKey
      executeSource div, getSelection().focusNode
    else if c == ENTER
      e.preventDefault()
      n = s.focusNode
      el = r.startContainer
      par = el.parentNode
      inCollapsedText = r.collapsed && el.nodeType == 3 && par.getAttribute('data-org-type') == 'text' && par.parentElement.classList.contains('collapsed') && el.nextSibling == null
      if inCollapsedText && r.startOffset == el.length then return
      # Make sure that newlines at the end of a 'text' span go after the span
      else if n.nodeType == 3 && r.collapsed && r.startOffset == n.length && n.parentNode.getAttribute('data-org-type') == 'text'
        br = document.createTextNode('\n')
        $(br).prependTo followingSpan n.parentNode
        r.setStart br, br.length
        r.setEnd br, br.length
      else
        window.N = n
        r.insertNode br = document.createTextNode(checkExtraNewline r, n, div)
        br.parentNode.normalize()
      r.collapse()
      s.removeAllRanges()
      s.addRange(r)
    else if c in [DEL, BS]
      el = r.startContainer
      par = el.parentNode
      inCollapsedText = r.collapsed && el.nodeType == 3 && par.getAttribute('data-org-type') == 'text' && par.parentElement.classList.contains('collapsed') && el.nextSibling == null
      if inCollapsedText && ((c == DEL && r.startOffset == el.length - 1) || (c == BS && r.startOffset == el.length))
        e.preventDefault()
        el.data = el.data.substring 0, el.data.length - 1
        r.setStart el, el.data.length
        r.setEnd el, el.data.length
        s.removeAllRanges()
        s.addRange r
      else if c == DEL && inCollapsedText && r.startOffset >= el.length - 1 then e.preventDefault()
      else if c == BS then backspace e
    checkSourceMod()
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true
  displaySource()

collapseNode = ->
  node = inCollapsible getSelection().focusNode
  if node
    if !isEmptyCollapsible node
      modifying = true
      $(node).toggleClass 'collapsed'
      styleCache = {}
      modifying = false
    else status "EMPTY ENTRY"

isBoundary = (node)->
  (node.nodeType == 1 && node.getAttribute('data-org-type') == 'boundary' && node) || (node.nodeType == 3 && isBoundary node.parentElement)

backspace = (e)->
  s = rangy.getSelection()
  r = s.getRangeAt 0
  if r.collapsed && r.startOffset == 0
    r.moveStart 'character', -1
    if boundary = isBoundary r.startContainer
      r.setStartBefore boundary, 0
      r.move 'character', -1
      if isCollapsed r.startContainer
        console.log "PREVENTING BACKSPACE"
        e.preventDefault()

checkSourceMod = ->


orgEnv = (parent, node)->
  org = parseOrgMode parent.textContent
  pos = getTextPosition parent, node, 0
  src = org.findNodeAt pos
  results = src.next
  if !(results instanceof Results)
    results = if results instanceof Meat && results.text.match /^[ \n]*$/ then results.next else newResults parent, src
  r = inCollapsible(findDomPosition(parent, results.offset).startContainer).lastChild
  r.innerHTML = '\n'
  write: (str)->
    console.log "RESULT: #{str}"
    r.textContent += ": #{str.replace /\n/, '\n: '}\n"

orgEnv.__proto__ = defaultEnv

newResults = (parent, src)->
  text = src.top().allText()
  srcEnd = src.end()
  text = text.substring(0, srcEnd) + "#+RESULTS:\n\n" + text.substring(srcEnd)
  sel = getSelection()
  r = sel.getRangeAt 0
  pos = getTextPosition parent, r.startContainer, r.startOffset
  parent.innerHTML = markupOrg text
  r = findDomPosition parent, pos
  sel.removeAllRanges()
  sel.addRange r
  findOrgNode parent, srcEnd + 1

id = lz (x)-> rz x
getLeft = (x)-> x(id)(id)
getRight = (x)-> x(id)(id)
show = (obj)-> if L_show? then rz(L_show)(lz obj) else console.log obj

executeSource = (parent, node)->
  if isSourceNode node
    txt = $(node).text().substring($(node).find('[data-org-type="text"]').text().length)
    m = txt.match /(^|\n)#\+end_src/i
    if m
      result = rz(L_baseLoadString)('notebook')(txt.substring(0, m.index))
      env = orgEnv parent, node
      runMonad result, env, (res)->
        res = res.head().tail()
        if getType(res) == 'left' then orgEnv.write "PARSE ERROR: #{getLeft res}"
        else env.write show getRight res
    else console.log "No end for src block"
  else !isDocNode(node) && executeSource parent, node.parentElement

followingSpan = (node)-> node.nextElementSibling ? $('<span></span>').appendTo(node.parentNode)[0]

# Need to insert an extra newline if all of these apply:
# 1) the range is collapsed
# 2) we are at the end of a text node
# 3) the text node does not end in a newline
# 4) the text node is at the end of the editable container
checkExtraNewline = (range, n, parent)->
  if range.collapsed && n.nodeType == 3 && range.startOffset == n.length && n.textContent[n.length - 1] != '\n' then checkLast n, parent
  else '\n'

checkLast = (n, parent)->
  if n == parent then '\n\n'
  else if n.nextSibling then '\n'
  else checkLast n.parentNode, parent

getTags = (headline)->
  if headline.getAttribute('dirty')
    cleanHeadline headline
    setTags headline
  headline.getAttribute 'data-org-tags'

setTags = (headline)->
  m = headline.firstChild.textContent.match headlineRE
  tags = ((m && parseTags m[HL_TAGS]) || []).join ' '
  if headline.getAttribute('data-org-tags') != tags then headline.setAttribute 'data-org-tags', tags

cleanHeadline = (node)->
  modifying = true
  node.removeAttribute 'dirty'
  modifying = false

handleMutation = (evt)->
  if !modifying
    modifying = true
    if (node = inCollapsible evt.srcElement) && (node.getAttribute('data-org-type') == 'headline')
      node.setAttribute 'dirty', 'true'
    displaySource()
    modifying = false

displaySource = -> $(sourceDiv).html('').text($(editDiv).text())

isCollapsible = (node)-> node.getAttribute('data-org-type') in ['headline', 'source', 'results']

inCollapsible = (node)->
  if node.nodeType == 1
    if isCollapsible node then node
    else (node.getAttribute('data-org-type') == 'text') && inCollapsible node.parentElement
  else node.nodeType == 3 && inCollapsible node.parentElement

isEmptyCollapsible = (node)->
  firstLine = getTextLine node
  node.firstChild == node.lastChild

getTextLine = (node)->
  c = node.firstElementChild
  while c
    if c.getAttribute('data-org-type') == 'text' then return c
    c = c.nextElementSibling
  null

#
# inefficient location tools
#
getTextPosition = (parent, node, offset)->
  if node == null
    r = getSelection().getRangeAt 0
    node = r.startContainer
    offset = r.startOffset
  r = rangy.createRangyRange()
  r.setStartBefore parent, 0
  r.setEndBefore node, offset
  r.text().length

findOrgNode = (parent, pos)->
  org = parseOrgMode parent.textContent
  orgNode = org.findNodeAt pos

findDomPosition = (parent, pos)->
  r = rangy.createRangyRange()
  r.setStartBefore parent, pos
  r.setEndBefore parent, pos
  r.move 'character', pos + 1
  r

root.markupOrg = markupOrg
root.bindContent = bindContent
root.cleanHeadline = cleanHeadline
root.getTags = getTags
