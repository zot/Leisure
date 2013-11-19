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
  matchLine,
} = require './org'

editDiv = null
sourceDiv = null
modifying = false
styleCache = {}
idCount = 0
nodes = {}
needsReparse = false
reparseListeners = []

nextOrgId = -> 'org-node-' + idCount++

getOrgType = (node)-> node?.getAttribute? 'data-org-type'

currentMode = null

initOrg = (parent, source)->
  $("<div LeisureOutput contentEditable='false' id='leisure_bar'></div>")
    .prependTo(document.body)
    .mousedown (e)->
      e.preventDefault()
      currentMode = (if currentMode == Leisure.fancyOrg then Leisure.basicOrg else Leisure.fancyOrg)
      restorePosition parent, -> currentMode.useNode $(parent)[0], source
  (currentMode = Leisure.fancyOrg).useNode $(parent)[0], source
  Leisure.initStorage '#login', '#panel', currentMode

getStyle = (node)->
  if !node.orgId
    node.orgId = node.getAttribute 'data-org-id'
    if !node.orgId
      node.setAttribute 'data-org-id', (node.orgId = nextOrgId())
  style = styleCache[node.orgId]
  if !style then style = styleCache[node.orgId] = getComputedStyle node
  style

# Thanks to rangy for this: http://code.google.com/p/rangy/
isCollapsed = (node)->
  type = node.nodeType
  type == 7 || # PROCESSING_INSTRUCTION
  type == 8 || # COMMENT
  (type == 3 && (node.data == '' || isCollapsed(node.parentNode))) ||
  /^(script|style)$/i.test(node.nodeName) ||
  (type == 1 && (node.classList.contains('collapsed') ||
  (node.getAttribute('data-org-type') in ['text' || 'meat'] && isCollapsed(node.parentNode)) ||
  getStyle(node).display == 'none' ||
  node.shadowRoot?))

markupOrg = (text)->
  [node, result] = markupOrgWithNode text
  result

markupOrgWithNode = (text)->
  nodes = {}
  # ensure trailing newline -- contenteditable doesn't like it, otherwise
  if text[text.length - 1] != '\n' then text = text + '\n'
  org = parseOrgMode text
  [org, markupNode(org, true)]

boundarySpan = "<span data-org-type='boundary'>\n</span>"

sensitive = /^srcStart|^headline-/

orgAttrs = (org)->
  if !org.nodeId then org.nodeId = nextOrgId()
  nodes[org.nodeId] = org
  extra = if isDynamic org then ' data-org-dynamic="true"' else ''
  if org instanceof Headline then extra += " data-org-tags='#{org.tags}'"
  else if org instanceof Keyword && !(org instanceof Source) && org.next instanceof Source  && org.name?.toLowerCase() == 'name' then extra += " data-org-name='#{org.info}'"
  if org.srcId then extra += " data-org-srcid='#{org.srcId}'"
  "id='#{org.nodeId}' data-org-type='#{org.type}'#{extra}"

isDynamic = (org)-> org instanceof Source && org.info.match /:results .*dynamic/i

markupNode = (org, start)->
  if org instanceof Source || org instanceof Results
    pos = org.contentPos - org.offset - 1
    text = org.text.substring pos
    "<span #{orgAttrs org}><span data-org-type='text'>#{org.text.substring(0, pos)}</span>#{contentSpan text}</span>"
  else if org instanceof Headline then "<span #{orgAttrs org}>#{contentSpan org.text, 'text'}#{markupGuts org, checkStart start, org.text}</span>"
  else "<span #{orgAttrs org}>#{content org.text}</span>"

createResults = (srcNode)->

checkStart = (start, text)-> start && (!text || text == '\n')

isSourceNode = (node)-> node?.getAttribute?('data-org-type') == 'source'

isDocNode = (node)-> node?.hasAttribute?('maindoc')

markupGuts = (org, start)->
  if !org.children.length then ''
  else
    prev = if start then null else org
    (for c in org.children
      s = start
      start = false
      p = prev
      prev = c
      optionalBoundary(p, c) + markupNode(c, s)).join ""

#optionalBoundary = (prev, node)-> if prev && (prev.block || node.block) then boundarySpan else ''
optionalBoundary = (prev, node)-> if prev then boundarySpan else ''

contentSpan = (str, type)->
  str = content str
  if str then "<span#{if type then " data-org-type='#{type}'" else ''}>#{str}</span>" else ''

content = (str)-> if str[str.length - 1] == '\n' then str.substring(0, str.length - 1) else str

fixupNodes = (node)->
  for n in $(node).find('[data-org-type="headline"]')
    setTags n

isCollapsibleText = (node)-> node.nodeType == 3 && node.parentNode.getAttribute('data-org-type') in ['text', 'meat']

bindContent = (div)->
  fixupNodes div
  div.addEventListener 'keydown', (e)->
    c = (e.charCode || e.keyCode || e.which)
    s = getSelection()
    r = s.getRangeAt(0)
    el = r.startContainer
    par = el.parentNode
    cancelled = false
    if c == TAB
      e.preventDefault()
      cancelled = true
      collapseNode()
    else if String.fromCharCode(c) == 'C' && e.altKey
      root.orgApi.executeSource div, getSelection().focusNode
    else if c == ENTER
      e.preventDefault()
      cancelled = true
      n = s.focusNode
      inCollapsedText = r.collapsed && isCollapsibleText el && par.parentElement.classList.contains('collapsed') && el.nextSibling == null
      if inCollapsedText && r.startOffset == el.length then return
      # Make sure that newlines at the end of a 'text' span go after the span
      else if r.collapsed && r.startOffset == n.length && isCollapsibleText n
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
      checkEnterReparse div, r
    else if c in [DEL, BS]
      inCollapsedText = r.collapsed && isCollapsibleText el && par.parentElement.classList.contains('collapsed') && el.nextSibling == null
      if inCollapsedText && ((c == DEL && r.startOffset == el.length - 1) || (c == BS && r.startOffset == el.length))
        e.preventDefault()
        cancelled = true
        el.data = el.data.substring 0, el.data.length - 1
        r.setStart el, el.data.length
        r.setEnd el, el.data.length
        s.removeAllRanges()
        s.addRange r
      else if c == DEL && inCollapsedText && r.startOffset >= el.length - 1
        e.preventDefault()
        cancelled = true
      else if backspace div, e then cancelled = true
      else if c != BS
        checkDeleteReparse div, c == BS
    if !cancelled && modifyingKey c
      if (getOrgType getOrgParent el) == 'boundary' then needsReparse = true
      currentMatch = matchLine currentLine div
      if cancelled then checkSourceMod div, currentMatch else setTimeout (->checkSourceMod div, currentMatch), 1
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true
  displaySource()

modifyingKey = (c)-> (
  (c > 47 && c < 58)          || # number keys
  c == 32 || c == ENTER       || # spacebar and enter
  c == BS || c == DEL         || # backspace and delete
  (c > 64 && c < 91)          || # letter keys
  (c > 95 && c < 112)         || # numpad keys
  (c > 185 && c < 193)        || # ;=,-./` (in order)
  (c > 218 && c < 223)          # [\]' (in order)
  )

currentLine = (parent)->
  r = getSelection().getRangeAt(0)
  if r.collapsed && r.startContainer.nodeType == 3
    nl = r.startContainer.data.substring(0, r.startOffset).lastIndexOf '\n'
    lineText = r.startContainer.data
    lineStart = -1
    lineEnd = -1
    if -1 < nl < r.startOffset then lineStart = nl
    else
      node = r.startContainer
      while node && lineStart == -1
        if node = textNodeBefore node
          lineText = node.data + lineText
          lineStart = node.data.lastIndexOf '\n'
    nl = r.startContainer.data.indexOf '\n', r.startOffset
    if nl >= r.startOffset then lineEnd = nl + lineText.length - r.startContainer.data.length
    else
      node = r.startContainer
      while node && lineEnd == -1
        if node = textNodeAfter node
          lineText += node.data
          if (nl = node.data.indexOf '\n') > -1 then lineEnd = nl + lineText.length - r.startContainer.data.length
    if lineEnd == -1 then lineEnd = lineText.length
    lineText.substring lineStart + 1, lineEnd
  else ''

collapseNode = ->
  node = getCollapsible getSelection().focusNode
  if node
    if !isEmptyCollapsible node
      modifying = true
      $(node).toggleClass 'collapsed'
      styleCache = {}
      modifying = false
    else status "EMPTY ENTRY"

isBoundary = (node)->
  (node.nodeType == 1 && node.getAttribute('data-org-type') == 'boundary' && node) || (node.nodeType == 3 && isBoundary node.parentElement)

backspace = (parent, e)->
  if checkCollapsed -1
    e.preventDefault()
    true
  else false

checkCollapsed = (delta)->
  s = rangy.getSelection()
  r = s.getRangeAt 0
  if delta < 0 then r.moveStart 'character', delta else r.moveEnd 'character', delta
  if r.startContainer == r.endContainer then false
  else if boundary = isBoundary (if delta < 0 then r.startContainer else r.endContainer)
    if delta < 0
      r.setStartBefore boundary
      r.moveStart 'character', -1
    else
      r.setEndAfter boundary
      r.moveEnd 'character', 1
    for n in r.getNodes()
      if r.containsNode(n) && isCollapsed n then return true
    false
  else false

checkSourceMod = (parent, oldMatch)->
  r = getSelection().getRangeAt 0
  if (newMatch = matchLine(currentLine parent)) != oldMatch || (newMatch && newMatch.match sensitive) then reparse parent
  else if (n = getOrgParent r.startContainer) && n.getAttribute('data-org-dynamic')?.toLowerCase() == 'true' then root.orgApi.executeSource parent, r.startContainer

orgEnv = (parent, node)->
  r = getResultsForSource parent, node
  if r
    r.innerHTML = ''
    write: (str)-> r.textContent += "\n: #{str.replace /\n/g, '\n: '}"
    __proto__: defaultEnv
  else
    write: (str)-> console.log ": #{str.replace /\n/g, '\n: '}\n"
    __proto__: defaultEnv

getResultsForSource = (parent, node)->
  checkReparse parent
  res = node
  while getOrgType(res.nextSibling) == 'boundary' || (getOrgType(res.nextSibling) == 'meat' && res.textContent.match /^[ \n]*$/)
    res = res.nextSibling
  res = res.nextSibling
  if res?.getAttribute('data-org-type') == 'results' then res.lastChild
  else
    org = parseOrgMode getNodeText parent
    pos = getTextPosition parent, node, 0
    src = org.findNodeAt pos
    if pos > -1
      results = src.next
      if !(results instanceof Results)
        results = if results instanceof Meat && results.text.match /^[ \n]*$/ then results.next
        if !(results instanceof Results) then results = newResults parent, src
      getCollapsible(findDomPosition(parent, results.offset + 1)[0]).lastChild
    else null

checkReparse = (parent)-> if needsReparse then reparse parent

nativeRange = (r)->
  if r instanceof Range then r
  else
    r2 = document.createRange()
    container = if r instanceof Array then r[0] else r.startContainer
    offset = if r instanceof Array then r[1] else r.startOffset
    r2.setStart container, offset
    r2.setEnd container, offset
    r2

restorePosition = (parent, block)->
  sel = getSelection()
  if sel.rangeCount
    r = sel.getRangeAt 0
    pos = getTextPosition $(parent)[0], r.startContainer, r.startOffset
    block()
    if pos > -1
      r = nativeRange findDomPosition $(parent)[0], pos
      r.collapse true
      sel.removeAllRanges()
      sel.addRange r
  else block()

reparse = (parent, text)->
  styleCache = {}
  text = text ? getNodeText parent
  sel = getSelection()
  [orgNode, orgText] = root.orgApi.markupOrgWithNode text
  restorePosition parent, -> root.orgApi.installOrgDOM parent, orgNode, orgText
  needsReparse = false
  setTimeout (->
    for l in reparseListeners
      l parent, orgNode, orgText
    ), 1

installOrgDOM = (parent, orgNode, orgText)-> parent.innerHTML = orgText

checkDeleteReparse = (parent, backspace)->
  r = rangy.getSelection().getRangeAt 0
  if backspace then r.moveStart 'character', -1 else r.moveEnd 'character', 1
  if r.text() == '\n' then setTimeout (->reparse parent), 1

checkEnterReparse = (parent, r)->
  if (result = getCollapsible r.startContainer) then reparse parent
  result

newResults = (parent, src)->
  text = src.top().allText()
  srcEnd = src.end()
  reparse parent, text.substring(0, srcEnd) + "#+RESULTS:\n: \n" + text.substring(srcEnd)
  findOrgNode parent, srcEnd + 1

id = lz (x)-> rz x
getLeft = (x)-> x(id)(id)
getRight = (x)-> x(id)(id)
show = (obj)-> if L_show? then rz(L_show)(lz obj) else console.log obj

executeText = (text, env)->
  result = rz(L_baseLoadString)('notebook')(text)
  runMonad result, env, (res)->
    res = res.head().tail()
    if getType(res) == 'left' then orgEnv.write "PARSE ERROR: #{getLeft res}"
    else env.write show getRight res

executeSource = (parent, node)->
  if isSourceNode node
    checkReparse parent
    txt = $(node).text().substring($(node).find('[data-org-type="text"]').text().length)
    m = txt.match /(^|\n)#\+end_src/i
    if m then executeText txt.substring(0, m.index), orgEnv parent, node
    else console.log "No end for src block"
  else if getOrgType(node) == 'text' then needsReparse = true
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
    if (node = getCollapsible evt.srcElement) && (node.getAttribute('data-org-type') == 'headline')
      node.setAttribute 'dirty', 'true'
    displaySource()
    modifying = false

displaySource = -> $(sourceDiv).html('').text($(editDiv).text())

isCollapsible = (node)-> node.getAttribute('data-org-type') in ['headline', 'source', 'results']

getCollapsible = (node)->
  if node.nodeType == 1
    if isCollapsible node then node
    else (node.getAttribute('data-org-type') in ['text', 'meat']) && getCollapsible node.parentElement
  else node.nodeType == 3 && getCollapsible node.parentElement

getOrgParent = (node)-> node && ((node.nodeType == 1 && isCollapsible(node) && node) || getOrgParent node.parentElement)

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
# location tools
#

findOrgNode = (parent, pos)->
  org = parseOrgMode getNodeText parent
  orgNode = org.findNodeAt pos

getTextPosition = (node, target, pos)->
  if target.nodeType == 3
    up = false
    eat = false
    count = 0
    while node
      if node.nodeType == 3
        if node == target then return count + pos
        count += node.length
        eat = true
      node = textNodeAfter node
  -1

findDomPosition = (node, pos)->
  while node
    if node.nodeType == 3
      if pos <= node.length then return [node, pos]
      pos -= node.length
    node = textNodeAfter node
  [null, null]

textNodeAfter = (node)->
  eat = true
  up = false
  while node && (eat || node.nodeType != 3)
    eat = false
    if !up && node.firstChild then node = node.firstChild
    else if node.nextSibling
      node = node.nextSibling
      up = false
    else
      node = node.parentNode
      up = true
  node

textNodeBefore = (node)->
  eat = true
  up = false
  while node && (eat || node.nodeType != 3)
    eat = false
    if !up && node.lastChild then node = node.lastChild
    else if node.previousSibling
      node = node.previousSibling
      up = false
    else
      node = node.parentNode
      up = true
  node

#
# Shadow dom support
#

getNodeText = (node)-> node.textContent

if Element.prototype.webkitCreateShadowRoot?
  Element.prototype.createShadowRoot = Element.prototype.webkitCreateShadowRoot
  Element.prototype.__defineGetter__ 'shadowRoot', -> @webkitShadowRoot
  Element.prototype.__defineSetter__ 'shadowRoot', (val)-> @webkitShadowRoot = val
else if !document.body.createShadowRoot?
  hasShadow = false
  Element.prototype.createShadowRoot = ->
    hasShadow = true
    @setAttribute 'data-org-shadow', 'true'
  Element.prototype.__defineGetter__ 'shadowRoot', -> (@hasAttribute('data-org-shadow') && @) || null
  getNodeText = (node)->
    if hasShadow
      copy = $(node).clone()
      copy.find('[data-org-shadow]').remove()
      copy.text()
    else node.textContent
  oldReparse = reparse
  reparse = (parent, text)->
    oldReparse parent, text
    hasShadow = false

emptyOutNode = (node)->
  node.innerHTML = ''
  newNode = $(node)[0].cloneNode false
  $(node).after newNode
  $(node).remove()
  newNode

root.orgApi = null

orgNotebook =
  useNode: (node, source)->
    root.orgApi = @
    sourceDiv = source
    oldContent = $(node).text()
    newNode = emptyOutNode node
    editDiv = newNode
    #restorePosition newNode, => $(newNode).html @markupOrg oldContent
    [orgNode, orgText] = @markupOrgWithNode oldContent
    restorePosition newNode, => @installOrgDOM newNode, orgNode, orgText
    @bindContent newNode
  installOrgDOM: installOrgDOM

basicOrg =
  __proto__: orgNotebook
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  executeSource: executeSource
  createResults: createResults
  installOrgDOM: (parent, orgNode, orgText)->
    orgNotebook.installOrgDOM parent, orgNode, orgText
    for node in $('[data-org-dynamic="true"]')
      setTimeout (=>@executeSource parent, $(node).find('[data-org-type=text]')[0].nextElementSibling), 1

root.basicOrg = basicOrg
root.orgNotebook = orgNotebook
root.markupOrg = markupOrg
root.bindContent = bindContent
root.cleanHeadline = cleanHeadline
root.getTags = getTags
root.reparse = reparse
root.reparseListeners = reparseListeners
root.findDomPosition = findDomPosition
root.getCollapsible = getCollapsible
root.getNodeText = getNodeText
root.parseOrgMode = parseOrgMode
root.orgAttrs = orgAttrs
root.content = content
root.contentSpan = contentSpan
root.checkStart = checkStart
root.optionalBoundary = optionalBoundary
root.boundarySpan = boundarySpan
root.displaySource = displaySource
root.checkEnterReparse = checkEnterReparse
root.checkCollapsed = checkCollapsed
root.checkExtraNewline = checkExtraNewline
root.followingSpan = followingSpan
root.currentLine = currentLine
root.checkSourceMod = checkSourceMod
root.getTextPosition = getTextPosition
root.isCollapsed = isCollapsed
root.nextOrgId = nextOrgId
root.modifyingKey = modifyingKey
root.getOrgParent = getOrgParent
root.getOrgType = getOrgType
root.executeText = executeText
root.orgEnv = orgEnv
root.getResultsForSource = getResultsForSource
root.initOrg = initOrg
