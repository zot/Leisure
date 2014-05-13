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
in a product, an acknowledgement in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
###

{
  delay,
} = require '10-namespace'
{
  getType,
  cons,
  define,
  unescapePresentationHtml,
} = require '16-ast'
{
  resolve,
  lazy,
  defaultEnv,
} = root = module.exports = require '15-base'
rz = resolve
lz = lazy
{
  newConsFrom,
  setValue,
  getValue,
  makeSyncMonad,
  makeHamt,
  _true,
  jsonConvert,
} = require '17-runtime'
{
  crnl,
  docOrg,
  edited,
} = require '23-collaborate'
{
  orgDoc,
} = require '12-docOrg'
{
  escapeHtml,
} = Templating
amt = require('persistent-hash-trie')

consFrom = newConsFrom
Nil = rz L_nil

{
  TAB,
  ENTER,
  BS,
  DEL,
  LEFT,
  RIGHT,
  UP,
  DOWN,
  HOME,
  END,
} = require '21-browserSupport'
{
  parseOrgMode,
  Headline,
  Fragment,
  Meat,
  Keyword,
  Source,
  Results,
  Drawer,
  SimpleMarkup,
  headlineRE,
  HL_TAGS,
  parseTags,
  matchLine,
} = require '11-org'
_ = require 'lodash.min'
{
  safeLoad,
  dump,
} = root.yaml

PAGEUP = 33
PAGEDOWN = 34

editDiv = null
sourceDiv = null
modifying = false
styleCache = {}
idCount = 0
nodes = {}
#needsReparse = false
reparseListeners = []

nextOrgId = -> 'org-node-' + idCount++

getOrgType = (node)-> node?.getAttribute? 'data-org-type'

root.currentMode = null

parentSpec = null
sourceSpec = null

fs = null

initOrg = (parent, source)->
  parentSpec = parent
  sourceSpec = source
  $("<div LeisureOutput contentEditable='false' id='leisure_bar'><button id='leisure_grip'><i class='fa fa-angle-left'></i><i class='fa fa-angle-right'></i></button>\n<button id='leisure_button'><i class='fa fa-glass'></i><div></div></button>\n<div id='leisure_rollup'><button id='saveButton' download='leisureFile.lorg'><i class=\"fa fa-save\"></i><div></div></button><div id=\"leisure_theme\"><span>Theme: </span>\n  <select id='themeSelect'>\n    <option value='flat'>Flat</option>\n    <option value=steampunk>Steampunk</option>\n   <option value=googie>Googie</option>\n   <option value=cthulhu>Cthulhu</option>\n  <option value=console>Console</option>\n  </select></div>\n<input id='nwSaveButton' type='file' nwsaveas onchange='Leisure.saveFile(this)'></input><a id='tc' target='_blank' href='http://www.teamcthulhu.com'><button id='team_cthulhu'><span><img src='images/eldersign.png'>TEAM CTHULHU</span></button></a></div></div><div id='leisure_dummy'></div>")
    .prependTo(document.body)
    .find('#leisure_button').mousedown (e)->
      e.preventDefault()
      root.currentMode.leisureButton()
  $("<div class='paginators'><button id='prevSlide'><i class='fa fa-caret-left fa-1x'></i><span></span></button><button id='nextSlide'><i class='fa fa-caret-right fa-1x'></i><span></span></button></div>").appendTo(document.body)
  $("#leisure_grip").click (e) ->
    g = $("body")
    if g.hasClass 'bar_collapse' then g.removeClass 'bar_collapse' else g.addClass 'bar_collapse'
  $("#themeSelect").change (e) ->
     return Leisure.setTheme(e.target.value)
  b = $('#saveButton')
  if nwDispatcher?
    $(document.body).addClass 'nw'
    $('#nwSaveButton')[0].parentSpec = parentSpec
    fs = require 'fs'
  b.mousedown ->
    if root.repo then root.storeInGit $(parent).text(), null, null, (err)->
      if err then alert "Conflict while attempting to save file to Git.\nPlease take recovery measures."
    else if nwDispatcher? then $('#nwSaveButton').click()
    else
      #console.log "SAVE"
      #console.log encodeURIComponent $(parent)[0].textContent
      #b.attr 'href', "data:text/plain;base64,#{encodeURIComponent btoa $(parent)[0].textContent}"
      console.log "SAVE: data:text/plain,#{encodeURIComponent $(parent).text()}"
      b.attr 'href', "data:text/plain,#{encodeURIComponent $(parent).text()}"
      #b.attr 'href', "http://google.com"
  (root.currentMode = Leisure.fancyOrg).useNode $(parent)[0], source
  Leisure.initStorage '#login', '#panel', root.currentMode

saveFile = (fileInput)->
  if file = fileInput.files[0]
    fileInput.files.clear()
    fs.writeFile file.path, $(fileInput.parentSpec).text(), (err)->
      if err then alert("Error saving file #{file.path}: #{err}")

splitLines = (str)->
  result = []
  pos = 0
  while pos < str.length
    nl = str.indexOf '\n', pos
    if nl == -1
      result.push (str.substring pos) + '\n'
      break
    else result.push str.substring pos, nl + 1
    pos = nl + 1
  result

moveCaret = (r, node, offset)->
  r.setStart node, offset
  r.collapse true
  selectRange r

selectRange = (r)->
  sel = getSelection()
  sel.removeAllRanges()
  sel.addRange r

contains = (parent, child)-> child != null && (parent == child || (contains parent, child.parentNode))

getRangeXY = (r)->
  rects = r.getClientRects()
  leftMost = rects[0]
  for rect in rects
    if rect.left < leftMost.left then leftMost = rect
  leftMost

findCharForColumn = (node, col, start, end)->
  testRng = document.createRange()
  testRng.setStart node, start
  testRng.collapse true
  for i in [end - 1 .. start] by -1
    testRng.setStart node, i
    testRct = getRangeXY testRng
    if testRct.left <= col
      moveCaret testRng, node, testRng.startOffset
      return true
  false

rectFor = (node)->
  r = document.createRange()
  if node.nodeType == 3 && node.data[node.length - 1] == '\n'
    r.setStart node, 0
    r.setEnd node, node.length - 1
  else r.selectNode node
  rect = r.getBoundingClientRect()
  if rect.width == 0 then getRangeXY r else rect

movementGoal = null

moveSelectionUp = (parent, r, start)->
  container = r.startContainer
  startRect = getRangeXY r
  if !(prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine]) then movementGoal = startRect.left
  elRect = rectFor container
  if startRect.top > elRect.top
    txt = r.startContainer.textContent
    prevEnd = txt.substring(0, r.startOffset).lastIndexOf '\n'
    prevStart = txt.substring(0, prevEnd).lastIndexOf('\n') + 1
    if findCharForColumn r.startContainer, movementGoal, prevStart, prevEnd then return
  first = textNodeAfter parent
  prev = null
  prevRect = null
  while container != first
    if !(isCollapsed container)
      prev = container
      prevRect = elRect
    container = textNodeBefore container
    if !isCollapsed container
      elRect = rectFor container
      if elRect.top < prevRect.top < startRect.top
        if !findCharForColumn prev, movementGoal, 0, prev.length then moveCaret r, prev, 0
        return
      if elRect.left <= movementGoal < elRect.right && findCharForColumn container, movementGoal, 0, container.length then return

moveSelectionDown = (parent, r, start)->
  container = r.startContainer
  startRect = getRangeXY r
  if !(prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine]) then movementGoal = startRect.left
  elRect = rectFor container
  if startRect.bottom < elRect.bottom
    txt = r.startContainer.textContent
    start = txt.indexOf '\n', r.startOffset + 1
    if start > -1
      end = txt.indexOf '\n', start + 1
      if end == -1 then end = r.startContainer.length
      if findCharForColumn r.startContainer, movementGoal, start, end then return
  last = textNodeBefore parent
  prev = null
  prevRect = null
  while container != last
    if !(isCollapsed container)
      prev = container
      prevRect = elRect
    container = textNodeAfter container
    if !isCollapsed container
      elRect = rectFor container
      if startRect.bottom < prevRect.bottom < elRect.bottom
        if !findCharForColumn prev, movementGoal, 0, prev.length then moveCaret r, prev, 0
        return
      if elRect.left <= movementGoal < elRect.right
        end = container.data.indexOf '\n'
        if end == -1 then end = container.length
        if findCharForColumn container, movementGoal, 0, end then return

nextVisibleNewline = (textNode, offset)->
  scanForward textNode, -1, (whenNotCollapsed (node)-> node.data.indexOf '\n', offset + 1), whenNotCollapsed (node)-> node.data.indexOf '\n'

whenNotCollapsed = (block)-> (node)-> if isCollapsed node then -1 else block node

scanForward = (textNode, falseValue, firstBlock, block)->
  if (val = firstBlock textNode) != falseValue then [textNode, val]
  else
    while (textNode = textNodeAfter textNode) && (val = block textNode) == falseValue
      true
    if textNode then [textNode, val] else []

moveSelectionFB = (parent, r, start, delta)->
  r.collapse start
  node = r.startContainer
  if delta > 0 && (r.startOffset < node.length - 1 || (r.startOffset == node.length - 1 && node.data[node.length - 1] == '\n' && !isCollapsed textNodeAfter node)) then r.setStart node, r.startOffset + 1
  else if delta < 0 && r.startOffset > 0 then r.setStart node, r.startOffset - 1
  else if delta < 0 && r.startOffset == 0 && !isCollapsed (b = textNodeBefore node)
    r.setStart b, b.length - 1
  else
    move = (if delta < 0 then textNodeBefore else textNodeAfter)
    eatFirst = delta > 0 && node.length == r.startOffset
    while node
      node = move node
      if eatFirst && !isCollapsed(node) && node.data[0] == '\n' && node.length == 1
        eatFirst = false
      else if !isCollapsed node then break
    if !node then return
    newOffset = (if eatFirst then 1 else if delta > 0 then 0 else node.length - 1)
    r.setStart node, newOffset
  r.collapse true
  if parent.compareDocumentPosition(r.startContainer) & Node.DOCUMENT_POSITION_CONTAINED_BY
    selectRange r
    r.startContainer.parentNode.scrollIntoViewIfNeeded()

# functions return whether to check for mods
keyFuncs =
  backwardChar: (e, parent, r)->
    e.preventDefault()
    moveSelectionFB parent, r, true, -1
    false
  forwardChar: (e, parent, r)->
    e.preventDefault()
    moveSelectionFB parent, r, false, 1
    false
  previousLine: (e, parent, r)->
    e.preventDefault()
    moveSelectionUp parent, r
    false
  nextLine: (e, parent, r)->
    e.preventDefault()
    moveSelectionDown parent, r
    false
  swapMarkup: (e, parent, r)->
    e.preventDefault()
    swapMarkup()
    false
  expandTemplate: (e, parent, r)->
    e.preventDefault()
    txt = r.startContainer
    if r.collapsed && txt.nodeType == 3 && ((r.startOffset > 2 && txt.data[r.startOffset - 3] == '\n') || (r.startOffset == 2 && followsNewline txt))
      str = txt.data.substring r.startOffset - 2, r.startOffset
      if exp = templateExpansions[str]
        start = r.startOffset
        [first, second] = exp
        pos = (getTextPosition parent, txt, start) - 2
        if start == txt.data.length
          next = null
          txt.data = txt.data.substring 0, txt.data.length - 2
        else
          next = (if start == 2 then txt else txt.splitText start - 2)
          next.data = next.data.substring 2
        txt.parentNode.insertBefore (document.createTextNode first + second), next
        selectRange nativeRange findDomPosition parent, pos + first.length
        reparse parent

followsNewline = (txt)->
  prev = textNodeBefore txt
  !prev || prev.data[prev.data.length - 1] == '\n'

templateExpansions =
  '<s': ['#+BEGIN_SRC leisure\n', '\n#+END_SRC']
  '<=': ['#+BEGIN_SRC leisure :results def\n', '\n#+END_SRC']
  '<d': ['#+BEGIN_SRC leisure :results dynamic\n', '\n#+END_SRC']
  '<h': ['#+BEGIN_HTML\n', '\n#+END_HTML']

defaultBindings =
  'C-C C-C': keyFuncs.swapMarkup
  'C-F': keyFuncs.forwardChar
  'C-B': keyFuncs.backwardChar
  'C-P': keyFuncs.previousLine
  'C-N': keyFuncs.nextLine
  'UP': keyFuncs.previousLine
  'DOWN': keyFuncs.nextLine
  'LEFT': keyFuncs.backwardChar
  'RIGHT': keyFuncs.forwardChar
  'TAB': keyFuncs.expandTemplate

useText = (text)->
  root.restorePosition parentSpec, ->
    $(parentSpec)[0].textContent = text
    root.currentMode.useNode $(parentSpec)[0], sourceSpec

swapMarkup = ->
  root.currentMode = (if root.currentMode == Leisure.fancyOrg then Leisure.basicOrg else Leisure.fancyOrg)
  root.restorePosition parentSpec, ->
    if root.currentDocument then root.currentMode.useNode $(parentSpec)[0], sourceSpec, docOrg()
    else root.currentMode.useNode $(parentSpec)[0], sourceSpec

getStyle = (node)->
  if !node.orgId
    node.orgId = node.getAttribute 'data-org-id'
    if !node.orgId
      modifying = true
      node.setAttribute 'data-org-id', (node.orgId = nextOrgId())
      modifying = false
  style = styleCache[node.orgId]
  if !style then style = styleCache[node.orgId] = getComputedStyle node
  style

# Thanks to rangy for this: http://code.google.com/p/rangy/
isCollapsed = (node)->
  if node
    type = node.nodeType
    type == 7 || # PROCESSING_INSTRUCTION
    type == 8 || # COMMENT
    (type == 3 && (node.data == '' || isCollapsed(node.parentNode))) ||
    /^(script|style)$/i.test(node.nodeName) ||
    (type == 1 && (node.offsetWidth == 0 || node.offsetHeight == 0))
  else false

markupOrg = (text)->
  [node, result] = markupOrgWithNode text
  result

markupOrgWithNode = (text, note, replace)->
  nodes = {}
  if typeof text == 'string'
    # ensure trailing newline -- contenteditable doesn't like it, otherwise
    if text[text.length - 1] != '\n' then text = text + '\n'
    org = parseOrgMode text
  else if text instanceof Org.Node then org = text
  if org
    markup = markupNode(org, true)
    #if replace then markup += boundarySpan
    [org, markup]
  else
    console.log "Attempt to display uknown object type: ", text
    throw new Error "Attempt to display unknown type of object: #{text}"

#boundarySpan = "<span data-org-type='boundary'>\n</span>"

sensitive = /^srcStart|^headline-|^keyword/

orgAttrs = (org)->
  if !org.nodeId then org.nodeId = nextOrgId()
  nodes[org.nodeId] = org
  extra = if rt = resultsType org then " data-org-results='#{rt}'"
  else ''
  if org.shared then extra += " data-shared='#{org.shared}' data-nodecount='#{org.nodeCount}'"
  if org.local then extra += " data-local=true"
  t = org.allTags()
  if t.length then extra += " data-org-tags='#{escapeAttr t.join(' ')}'"; global.ORG=org
  if org instanceof Keyword && !(org instanceof Source) && org.next instanceof Source  && org.name?.toLowerCase() == 'name' then extra += " data-org-name='#{escapeAttr org.info}'"
  if org instanceof Headline
    extra += " data-org-headline='#{escapeAttr org.level}'"
    for k of org.properties
      extra += " data-org-properties='#{escapeAttr JSON.stringify org.properties}'"
      break
  #if org instanceof Source && lang = org.lead()?.trim().toLowerCase()
  #  extra += " data-lang='#{lang}'"
  if org.srcId then extra += " data-org-srcid='#{escapeAttr org.srcId}'"
  "id='#{escapeAttr org.nodeId}' data-org-type='#{escapeAttr org.type}'#{extra}"

resultsType = (org)-> org instanceof Source && (org.info.match /:results *([^ ]*)/)?[1].toLowerCase()

isDynamic = (org)-> resultsType(org) == 'dynamic'

isDef = (org)-> resultsType(org) == 'def'

orgSrcAttrs = (org)->
  "data-org-src='#{if isDef org then 'def' else if isDynamic org then 'dynamic' else 'example'}'"

markupNode = (org, start)->
  if org instanceof Source || org instanceof Results
    pos = org.contentPos - org.offset - 1
    text = org.text.substring pos
    "<span #{orgAttrs org}#{codeBlockAttrs org}><span data-org-type='text'>#{escapeHtml org.text.substring(0, pos)}</span><span #{orgSrcAttrs org}>#{contentSpan text}</span></span>"
  else if org instanceof Headline then "<span #{orgAttrs org}>#{contentSpan org.text, 'text'}#{markupGuts org, checkStart start, org.text}</span>"
  else if org instanceof SimpleMarkup then markupSimple org
  else if org instanceof Fragment then markupFragment org
  else if org instanceof Drawer && org.name.toLowerCase() == 'data' then markupData org
  else "<span #{orgAttrs org}>#{content org.text}</span>"

markupFragment = (org)->
  "<span #{orgAttrs org}>#{(markupNode child for child in org.children).join ''}</span>"

markupData = (org)->
  m = org.text.match /^[^\n]*\n([^\n]*)\n/
  makeDataSpan m?[1].trim() || '', org.text

makeDataSpan = (id, text)-> "<span data-leisure-data='#{id}'>#{escapeHtml text}</span>"

data = amt.Trie()

addData = (el)->
  if m = el.textContent.match /^[^\n]*\n[^\n]*\n((.|\n)*):END:\n/
    data = amt.assoc data, el.getAttribute('data-leisure-data'), jsonConvert(safeLoad m[1])

define 'getOrgData', lz (key)->
  makeSyncMonad (env, cont)->
    cont amt.get data, rz key

define 'setOrgData', lz (key)->$F(arguments, (value)->
  makeSyncMonad (env, cont)->
    data = amt.assoc data, rz(key), rz(value)
    oldEl = $("[data-leisure-data=#{rz key}]")
    oldText = oldEl.text()
    text = ":DATA:\n#{rz key}\n#{rz(L_toJson)(value)(rz L_id)(rz L_id)}:END\n"
    if oldEl.length then oldEl.text text
    else $(parentSpec).append "\n" + (makeDataSpan rz(key), text)
    sendDataDiff $(parentSpec)[0], rz(key), oldText, text
    cont _true)

markupSimple = (org)->
  guts = ''
  for c in org.children
    guts += markupNode c
  t = org.text[0]
  switch org.markupType
    when 'bold' then "<b>#{t}#{guts}#{t}</b>"
    when 'italic' then "<i>#{t}#{guts}#{t}</i>"
    when 'underline' then "<span style='text-decoration: underline'>#{t}#{guts}#{t}</span>"
    when 'strikethrough' then "<span style='text-decoration: line-through'>#{t}#{guts}#{t}</span>"
    when 'code' then "<code>#{t}#{guts}#{t}</code>"
    when 'verbatim' then "<code>#{t}#{guts}#{t}</code>"

codeBlockAttrs = (org)->
  while (org = org.prev) instanceof Meat
    if org instanceof Keyword && org.name.match /^name$/i
      return " data-org-codeblock='#{escapeAttr org.info.trim()}'"
  ''

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
      #optionalBoundary(p, c) + markupNode(c, s)).join ""
      markupNode(c, s)).join ""

#optionalBoundary = (prev, node)-> if prev && prev.text[prev.text.length - 1] == '\n' then boundarySpan else ''

contentSpan = (str, type)->
  str = content str
  if str then "<span#{if type then " data-org-type='#{escapeAttr type}'" else ''}>#{escapeHtml str}</span>" else ''

#content = (str)-> escapeHtml (if str[str.length - 1] == '\n' then str.substring(0, str.length - 1) else str)
content = (str)-> escapeHtml str

fixupNodes = (node)->
  for n in $(node).find('[data-org-type="headline"]')
    setTags n

isCollapsibleText = (node)-> node.nodeType == 3 && node.parentNode.getAttribute('data-org-type') in ['text', 'meat']

shiftKey = (c)-> 15 < c < 19

specialKeys = {}
specialKeys[TAB] = 'TAB'
specialKeys[ENTER] = 'ENTER'
specialKeys[BS] = 'BS'
specialKeys[DEL] = 'DEL'
specialKeys[LEFT] = 'LEFT'
specialKeys[RIGHT] = 'RIGHT'
specialKeys[UP] = 'UP'
specialKeys[DOWN] = 'DOWN'
specialKeys[PAGEUP] = 'PAGEUP'
specialKeys[PAGEDOWN] = 'PAGEDOWN'
specialKeys[HOME] = 'HOME'
specialKeys[END] = 'END'

modifiers = (e, c)->
  res = specialKeys[c] || String.fromCharCode(c)
  if e.altKey then res = "M-" + res
  if e.ctrlKey then res = "C-" + res
  if e.shiftKey then res = "S-" + res
  res

lastKeys = []
maxLastKeys = 4
keyCombos = []

addKeyPress = (e, c)->
  if notShift = !shiftKey c
    lastKeys.push modifiers(e, c)
    while lastKeys.length > maxLastKeys
      lastKeys.shift()
    keyCombos = new Array(maxLastKeys)
    for i in [0...Math.min(lastKeys.length, maxLastKeys)]
      keyCombos[i] = lastKeys[lastKeys.length - i - 1 ... lastKeys.length].join ' '
    keyCombos.reverse()
  notShift

prevKeybinding = curKeyBinding = null

setCurKeyBinding = (f)->
  prevKeybinding = curKeyBinding
  curKeyBinding = f

findKeyBinding = (e, parent, r)->
  for k in keyCombos
    if f = root.currentMode.bindings[k]
      lastKeys = []
      keyCombos = []
      setCurKeyBinding f
      return [true, f e, parent, r]
  setCurKeyBinding null
  [false]

bindContent = (div)->
  fixupNodes div
  div.addEventListener 'mousedown', (e)-> setCurKeyBinding null
  div.addEventListener 'keydown', (e)->
    c = (e.charCode || e.keyCode || e.which)
    if !addKeyPress e, c then return
    s = getSelection()
    r = s.getRangeAt(0)
    el = r.startContainer
    par = el.parentNode
    [bound, checkMod] = findKeyBinding e, div, r
    if bound then cancelled = !checkMod
    else
      checkMod = modifyingKey c, e
      cancelled = false
    if !bound
      if c == TAB
        e.preventDefault()
        cancelled = true
        collapseNode()
      else if String.fromCharCode(c) == 'C' && e.altKey
        root.orgApi.executeSource div, getSelection().focusNode
      else if c == ENTER
        e.preventDefault()
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
        selectRange r
      else if c in [DEL, BS]
        inCollapsedText = r.collapsed && isCollapsibleText el && par.parentElement.classList.contains('collapsed') && el.nextSibling == null
        if inCollapsedText && ((c == DEL && r.startOffset == el.length - 1) || (c == BS && r.startOffset == el.length))
          e.preventDefault()
          cancelled = true
          el.data = el.data.substring 0, el.data.length - 1
          r.setStart el, el.data.length
          r.setEnd el, el.data.length
          selectRange r
        else if c == DEL && inCollapsedText && r.startOffset >= el.length - 1
          e.preventDefault()
          cancelled = true
        else if backspace div, e then cancelled = true
        else if c != BS
          checkDeleteReparse div, c == BS
    if !cancelled && checkMod
      #if (getOrgType getOrgParent el) == 'boundary' then needsReparse = true
      currentMatch = matchLine currentLine div
      setTimeout (->checkSourceMod div, currentMatch), 1
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true
  displaySource()

modifyingKey = (c, e)-> !e.altKey && !e.ctrlKey && (
  (47 < c < 58)          || # number keys
  c == 32 || c == ENTER  || # spacebar and enter
  c == BS || c == DEL    || # backspace and delete
  (64 < c < 91)          || # letter keys
  (95 < c < 112)         || # numpad keys
  (185 < c < 193)        || # ;=,-./` (in order)
  (218 < c < 223)          # [\]' (in order)
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

#isBoundary = (node)->
#  (node.nodeType == 1 && node.getAttribute('data-org-type') == 'boundary' && node) || (node.nodeType == 3 && isBoundary node.parentElement)

backspace = (parent, e)->
  if checkCollapsed -1
    e.preventDefault()
    true
  else false

#checkCollapsed = (delta)->
#  s = rangy.getSelection()
#  r = s.getRangeAt 0
#  if delta < 0 then r.moveStart 'character', delta else r.moveEnd 'character', delta
#  if r.startContainer == r.endContainer then false
#  else if boundary = isBoundary (if delta < 0 then r.startContainer else r.endContainer)
#    if delta < 0
#      r.setStartBefore boundary
#      r.moveStart 'character', -1
#    else
#      r.setEndAfter boundary
#      r.moveEnd 'character', 1
#    for n in r.getNodes()
#      if r.containsNode(n) && isCollapsed n then return true
#    false
#  else false

checkCollapsed = (delta)->
  node = getSelection().focusNode
  node && (isCollapsed (if delta < 0 then textNodeBefore else textNodeAfter) node)

checkSourceMod = (parent, oldMatch)->
  focus = getSelection().focusNode
  #r = getSelection().getRangeAt 0
  #n = getOrgParent r.startContainer
  #if (newMatch = matchLine(currentLine parent)) != oldMatch || (newMatch && newMatch.match sensitive) then reparse parent
  #else if $(r.startContainer).closest('[data-org-src]').length && n = getOrgParent r.startContainer
  if !((newMatch = matchLine(currentLine parent)) != oldMatch || (newMatch && newMatch.match sensitive)) && $(focus).closest('[data-org-src]').length && n = getOrgParent focus
    switch n.getAttribute('data-org-results')?.toLowerCase()
      when 'dynamic' then root.orgApi.executeSource parent, focus
      when 'def' then root.orgApi.executeDef n
  edited focus

escapeAttr = (str)->
  if typeof str == 'string' then str.replace /['"&]/g, (c)->
    switch c
      when '"' then '&quot;'
      when "'" then '&#39;'
      when '&' then '&amp;'
  else str

presentValue = (v)-> rz(L_showHtml) lz v
#  if (getType v) == 'svgNode'
#    cnt = v(-> id)
#    L_svgPresent()(-> cnt)(-> id)
#  else if (getType v) == 'html' then rz(L_getHtml)(lz v)
#  else if (getType v) == 'parseErr' then "PARSE ERROR: #{getParseErr v}"
#  else escapeHtml show v


orgEnv = (parent, node)->
  r = getResultsForSource parent, node
  env =
    presentValue: presentValue
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    writeFile: ->
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
    __proto__: defaultEnv
  if r
    r.innerHTML = ''
    env.write = (str)-> r.textContent += "\n: #{str.replace /\n/g, '\n: '}"
  else env.write = (str)-> console.log ": #{str.replace /\n/g, '\n: '}\n"
  env

baseEnv =
  __proto__: defaultEnv
  readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
  write: (str)-> console.log unescapePresentationHtml str
  newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"

getResultsForSource = (parent, node)->
  #checkReparse parent
  res = node
  #while getOrgType(res.nextSibling) == 'boundary' || (getOrgType(res.nextSibling) == 'meat' && res.textContent.match /^[ \n]*$/)
  while getOrgType(res.nextSibling) == 'meat' && res.textContent.match /^[ \n]*$/
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

#checkReparse = (parent)-> if needsReparse then reparse parent

nativeRange = (r)->
  if r instanceof Range then r
  else
    r2 = document.createRange()
    container = if r instanceof Array then r[0] else r.startContainer
    if !container then null
    else
      offset = if r instanceof Array then r[1] else r.startOffset
      r2.setStart container, offset
      r2.collapse true
      r2

hasParent = (node, ancestor)-> node == ancestor || (node && hasParent node.parent, ancestor)

# offset defaults to 0
restorePosition = (parent, offset, block)->
  if !block
    block = offset
    offset = 0
  sel = getSelection()
  if !sel.focusNode then $('[maindoc]')[0].focus()
  if sel?.rangeCount
    r = sel.getRangeAt 0
    start = offset + getTextPosition $(parent)[0], r.startContainer, r.startOffset
    end = offset + getTextPosition $(parent)[0], r.endContainer, r.endOffset
    block()
    if start > -1 && (r = nativeRange findDomPosition $(parent)[0], start)
      [endContainer, endOffset] = findDomPosition $(parent)[0], end
      r.setEnd endContainer, endOffset
      selectRange r
  else block()

loadOrg = (parent, text, path, target)->
  text = crnl text
  if nwDispatcher?
    $('#nwSaveButton').attr 'nwsaveas', path
  else
    $('#saveButton').attr 'download', path
  reparse parent, text, target
  setTimeout (->
    for node in $(parent).find('[data-org-src="def"]')
      executeDef node), 1

reparse = (parent, text, target)->
  styleCache = {}
  text = text ? getNodeText parent
  sel = getSelection()
  [orgNode, orgText] = root.orgApi.markupOrgWithNode text, null, target?
  root.restorePosition parent, -> root.orgApi.installOrgDOM parent, orgNode, orgText, target
  #needsReparse = false
  setTimeout (->
    for l in reparseListeners
      l parent, orgNode, orgText
    ), 1

emptySlide = (id, slidePosition)-> root.orgApi.emptySlide id, slidePosition

installOrgDOM = (parent, orgNode, orgText, target)->
  dumpTextWatchers()
  if target then $(target).replaceWith orgText
  else parent.innerHTML = orgText
  for node in (if target? then $(target).find '[data-leisure-data]' else $ '[data-leisure-data]')
    addData node

checkDeleteReparse = (parent, backspace)->
  r = getSelection().getRangeAt 0
  if backspace
    if r.startOffset == 0 then (prev = textNodeBefore r.startContainer) && prev.data[prev.data.length - 1] == '\n'
    else r.startContainer.data[r.startOffset - 1] == '\n'
  else
    if r.startOffset == r.startContainer.data.length then (next = textNodeAfter r.startContainer) && next.data[0] == '\n'
    else r.startContainer.data[r.startOffset + 1] == '\n'

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

propsFor = (node)->
  props = Nil
  tags = (node.getAttribute('data-org-tags') || '').trim()
  if tags then props = cons cons('tags', consFrom (tags).trim().split ' '), props
  name = (node.getAttribute('data-org-codeblock') || '').trim()
  if name then props = cons cons('block', name), props
  props

executeText = (text, props, env, cont)->
  old = getValue 'parser_funcProps'
  setValue 'parser_funcProps', props
  result = rz(L_baseLoadString)('notebook')(text)
  runMonad result, env, (results)->
    while results != L_nil()
      res = results.head().tail()
      if getType(res) == 'left' then env.write "PARSE ERROR: #{getLeft res}"
      else env.write String(env.presentValue getRight res)
      results = results.tail()
    setValue 'parser_funcProps', old
    cont?()

getSource = (node)->
  while node && !isSourceNode node
    node = node.parentNode
  if node
    txt = $(node).text().substring($(node).find('[data-org-type="text"]').text().length)
    m = txt.match /(^|\n)#\+end_src/i
    if m then txt.substring(0, m.index) else null

executeSource = (parent, node, cont)->
  if isSourceNode node
    #checkReparse parent
    if txt = getSource node then executeText txt, propsFor(node), orgEnv(parent, node), cont
    else console.log "No end for src block"
  #else if getOrgType(node) == 'text' then needsReparse = true
  #else !isDocNode(node) && executeSource parent, node.parentElement
  else getOrgType(node) != 'text' && !isDocNode(node) && executeSource parent, node.parentElement

getNodeSource = (node)->
  while !isSourceNode node
    node = node.parentNode
    if !node then return []
  [node, $(node).find('[data-org-src]')[0].textContent]

# given a node, find the enclosing source node and execute it's content as a definition
executeDef = (node, cont)->
  [srcNode, text] = getNodeSource node
  if srcNode then executeText text, propsFor(srcNode), baseEnv, cont

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
    invalidateOrgText()
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
  if node
    offset = 0
    childPos = 0
    limit = switch target.nodeType
      when 1
        if pos + 1 < target.childNodes.length then target.childNodes[pos + 1] else nodeAfterNoChildren target
      when 3 then target
      else nodeAfter node
    while node && node != limit
      if node.nodeType == 3 then offset += node.data.length
      node = nodeAfter node
    if target.nodeType == 3 then offset + pos else offset
  else -1

countCharactersIn = (node)-> countCharactersFrom node, nodeAfterNoChildren node

countCharactersFrom = (start, end)->
  total = 0
  while start && start != end
    if start.nodeType == 3 then total += start.data.length
    start = nodeAfter start
  if start == end then total else -1

findDomPosition = (node, pos)->
  parent = node
  while node
    if node.nodeType == 3
      if pos < node.length
        n = node
        while n != parent && n != null
          n = n.parentNode
        return if n == null then [null, null] else [node, pos]
      pos -= node.length
    node = textNodeAfter node
  [null, null]

# get the next node in the preorder traversal, disregarding the node's children
nodeAfterNoChildren = (node)-> nodeAfter node, true

# get the next node in the preorder traversal, starting with the node's children
nodeAfter = (node, up)->
  while node
    if node.nodeType == 1 && !up && node.childNodes.length then return node.childNodes[0]
    else if node.nextSibling then return node.nextSibling
    else
      up = true
      node = node.parentNode
  null

filteredNodeAfter = (node, director)->
  rejected = false
  while node
    if !rejected && !up && node.nodeType == 1 && node.childNodes.length
      node = node.childNodes[0]
    else if node.nextSibling
      up = false
      node = node.nextSibling
    else
      up = true
      node = node.parentNode
    first = false
    if !up
      switch director node
        when 'quit' then return null
        when 'reject' then rejected = true
        else
          if !up then return node
          rejected = false
  null

# return the block text for a node -- just the text that's in its mongo block
blockText = (node)->
  end = nodeAfter node, true
  text = ''
  while node != end
    if node.nodeType == 3 then text += node.data
    node = nodeAfter node
    if node?.nodeType == 1 && node.hasAttribute 'data-shared' then break
  text

orgForNode = (node)->
  org = parseOrgMode blockText node
  if !$(node).is('[data-org-headline="0"]')
    if org.children.length == 1 then org = org.children[0]
    else org = new Fragment org.offset, org.children
  if $(node).is('[data-shared]')
    org.nodeId = node.id
    org.shared = $(node).attr 'data-shared'
  for child in orgChildrenForNode node
    org.children.push orgForNode child
  org.linkNodes()
  org

orgChildrenForNode = (node)->
  children = []
  end = nodeAfter node, true
  while node = filteredNodeAfter node, ((n)->
    if n == end then 'quit'
    else if n.nodeType == 1 && n.hasAttribute 'data-shared'
      children.push n
      'reject') then
  children

textNodeAfter = (node)->
  while node = nodeAfter node
    if node.nodeType == 3 then return node

textWatchers = []

watchNodeText = (node, callback)->
  textWatchers.push new MutationSummary
    callback: callback
    rootNode: node
    observeOwnChanges: true
    queries: [characterData: true]

dumpTextWatchers = ->
  for watcher in textWatchers
    watcher.disconnect()
  textWatchers = []

# get the next node in the reverse preorder traversal, starting with the node's children
nodeBefore = (node, up)->
  while node
    if node.nodeType == 1 && !up && node.childNodes.length then return node.childNodes[node.childNodes.length - 1]
    else if node.previousSibling then return node.previousSibling
    else
      up = true
      node = node.parentNode
  null

textNodeBefore = (node)->
  while node = nodeBefore node
    if node.nodeType == 3 then return node

#
# Shadow dom support
#

getNodeText = (node)->
  if $(node).is('[data-shared]') then orgForNode node
  else if root.currentDocument && $(node).is('[maindoc]') then orgForNode node
  else node.textContent

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

cachedOrgText = null
cachedOrgParent = null
invalidateOrgText = -> cachedOrgParent = cachedOrgText = null
getOrgText = (parent)-> (cachedOrgParent == parent && cachedOrgText) || (cachedOrgParent = parent; cachedOrgText = parent.textContent)

orgNotebook =
  useNode: (node, source, content)->
    sourceDiv = source
    root.orgApi = @
    if !content then content = $(node).text()
    newNode = emptyOutNode node
    editDiv = newNode
    [orgNode, lastOrgText] = @markupOrgWithNode content
    root.restorePosition newNode, => @installOrgDOM newNode, orgNode, lastOrgText
    @bindContent newNode
  installOrgDOM: installOrgDOM
  redrawIssue: (i)-> console.log "REDRAW ISSUE: #{i}"
  defineWidget: (id)->

basicOrg =
  __proto__: orgNotebook
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  executeDef: executeDef
  executeSource: executeSource
  createResults: createResults
  installOrgDOM: (parent, orgNode, orgText, target)->
    parent.setAttribute 'class', 'org-plain'
    orgNotebook.installOrgDOM parent, orgNode, orgText, target
  bindings: defaultBindings
  leisureButton: swapMarkup
  #emptySlide: (id)-> "<span id='#{id}'></span>#{boundarySpan}"
  emptySlide: (id)-> "<span id='#{id}'></span>"

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
#root.optionalBoundary = optionalBoundary
#root.boundarySpan = boundarySpan
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
root.executeDef = executeDef
root.propsFor = propsFor
root.orgEnv = orgEnv
root.baseEnv = baseEnv
root.getResultsForSource = getResultsForSource
root.initOrg = initOrg
root.swapMarkup = swapMarkup
root.modifiers = modifiers
root.keyFuncs = keyFuncs
root.defaultBindings = defaultBindings
root.addKeyPress = addKeyPress
root.findKeyBinding = findKeyBinding
root.invalidateOrgText = invalidateOrgText
root.setCurKeyBinding = setCurKeyBinding
root.presentValue = presentValue
root.escapeAttr = escapeAttr
root.restorePosition = restorePosition
root.splitLines = splitLines
root.orgSrcAttrs = orgSrcAttrs
root.getNodeSource = getNodeSource
root.loadOrg = loadOrg
root.resultsType = resultsType
root.isDynamic = isDynamic
root.isDef = isDef
root.nativeRange = nativeRange
root.textNodeBefore = textNodeBefore
root.textNodeAfter = textNodeAfter
root.PAGEUP = PAGEUP
root.PAGEDOWN = PAGEDOWN
root.saveFile = saveFile
root.nextVisibleNewline = nextVisibleNewline
root.countCharactersFrom = countCharactersFrom
root.countCharactersIn = countCharactersIn
root.nodeAfter = nodeAfter
root.nodeAfterNoChildren = nodeAfterNoChildren
root.nodeBefore = nodeBefore
root.watchNodeText = watchNodeText
root.dumpTextWatchers = dumpTextWatchers
root.useText = useText
root.markupData = markupData
root.blockText = blockText
root.orgForNode = orgForNode
root.orgChildrenForNode = orgChildrenForNode
root.emptySlide = emptySlide
