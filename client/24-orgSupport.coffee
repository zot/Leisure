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

#
# editing principle:
# You should only be able to edit text you can see
# i.e. backspace/delete/cut/replace should not delete any hidden text
#

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
  subDoc,
  edited,
  getBlock,
  Overrides,
  getItem,
  addItem,
  updateItem,
  removeId,
  isRemoved,
  commitEdits,
  createRenderingComputer,
} = require '23-collaborate'
{
  orgDoc,
  getCodeItems,
  lineCodeBlockType,
} = require '12-docOrg'
{
  escapeHtml,
  getDeepestActiveElement,
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

# parentForX is needed for slide editing modes and for multple document editing
parentForElement = (el)-> $(el).closest('[maindoc]')[0]

parentForBlockId = (id)-> $('[maindoc]')[0]

parentForDocId = (id)-> $('[maindoc]')[0]

nextOrgId = -> 'org-node-' + idCount++

getOrgType = (node)-> node?.getAttribute? 'data-org-type'

root.currentMode = null

parentSpec = null
sourceSpec = null

fs = null

initOrg = (parent, source)->
  parentSpec = parent
  sourceSpec = source
  $("<div LeisureOutput contentEditable='false' id='leisure_bar'><button id='leisure_grip' title='x'><i class='fa fa-angle-left'></i><i class='fa fa-angle-right'></i></button>\n<button id='leisure_button' title='x'><i class='fa fa-glass'></i><div></div></button>\n<div id='leisure_rollup'><button id='saveButton' title='x' download='leisureFile.lorg'><i class='fa fa-save'></i><div></div></button><div id='leisure_theme' title='x'><span>Theme: </span>\n  <select id='themeSelect'>\n    <option value='flat'>Flat</option>\n    <option value=steampunk>Steampunk</option>\n   <option value=googie>Googie</option>\n   <option value=cthulhu>Cthulhu</option>\n  <option value=console>Console</option>\n  </select></div>\n<input id='nwSaveButton' type='file' nwsaveas onchange='Leisure.saveFile(this)'></input><button id='hide-show-button' onclick='Leisure.toggleShowHidden()' title='x'><i class='fa fa-eye-slash'></i><div class='hidden'></div><span></span></button><a id='tc' target='_blank' href='http://www.teamcthulhu.com'><button id='team_cthulhu' title='x'><span><img src='images/eldersign.png'>TEAM CTHULHU</span></button></a></div></div><div id='leisure_dummy'></div>")
    .prependTo(document.body)
    .find('#leisure_button').mousedown (e)->
      e.preventDefault()
      root.currentMode.leisureButton()
  applyLeisureTooltips()
  $("<div class='paginators'><button id='prevSlide'><i class='fa fa-caret-left fa-1x'></i><span></span></button><button id='nextSlide'><i class='fa fa-caret-right fa-1x'></i><span></span></button></div>").appendTo(document.body)
  $("#leisure_grip").click (e) -> toggleLeisureBar()
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
  installSelectionMenu()
  monitorSelectionChange()

toggleLeisureBar = ->
  g = $("body")
  if g.hasClass 'bar_collapse' then g.removeClass 'bar_collapse' else g.addClass 'bar_collapse'

selectionActive = true
topCaretBox = null

updateSelection = Lodash.throttle (-> actualSelectionUpdate()), 30,
  leading: true
  trailing: true

actualSelectionUpdate = ->
  return
  if selectionActive
    s = getSelection()
    if s.type != 'None' && !isCollapsed(s.focusNode)
      range = s.getRangeAt(0)
      rects = range.getClientRects()
      if rects.length > 0
        right = 0
        top = Number.MAX_SAFE_INTEGER
        for r in rects
          right = Math.max r.right, right
          top = Math.min r.top, top
        if b = detectActualLineHeight range
          top = Math.min b.top, top
        bubble = $("#selectionBubble")[0]
        bubble.style.left = "#{right}px"
        bubble.style.top = "#{top - bubble.offsetHeight}px"
        $(document.body).addClass 'selection'
        return
  $(document.body).removeClass 'selection'

detectActualLineHeight = (range)->
  if range.startContainer != topCaretBox
    el = range.startContainer
    if range.startOffset == 0
      $(el).before topCaretBox
    else
      if range.startOffset < range.startContainer.length
        el.splitText range.startOffset
      $(el).after topCaretBox
      range.setStart textNodeAfter(el.nextSibling), 0
      range.collapse true
      s = getSelection()
      s.removeAllRanges()
      s.addRange range
  r = topCaretBox.getClientRects()[0]
  $(topCaretBox).remove()
  r

installSelectionMenu = ->
  $("#selectionBubble")
    .html selectionMenu
    .on 'mouseenter', -> root.orgApi.configureMenu $("#selectionBubble ul")
  $("#selectionBubble ul").menu select: (event, ui)-> console.log "MENU SELECT"; false

selectionMenu = """
<div>
<ul>
  <li name='insert'><a href='javascript:void(0)'><span>Insert</span></a>
    <ul>
      <li><a href='javascript:void(0)'><span>Leisure</span></a></li>
      <li><a href='javascript:void(0)'><span>YAML</span></a></li>
      <li><a href='javascript:void(0)'><span>HTML</span></a></li>
      <li><a href='javascript:void(0)'><span>CoffeeScript</span></a></li>
      <li><a href='javascript:void(0)'><span>JavaScript</span></a></li>
    </ul>
  </li>
</ul>
</div>
"""

configureMenu = (menu)->
  console.log "configure menu"
  if getSelection().type == 'Caret'
    [el] = blockElementsForSelection()
    bl = getBlock el.id
    if bl?.type == 'chunk'
      return menu.find("[name='insert']").removeClass 'ui-state-disabled'
  menu.find("[name='insert']").addClass 'ui-state-disabled'

monitorSelectionChange = ->
  $(document).on 'selectionchange', updateSelection
  $(window).on 'scroll', updateSelection
  $(window).on 'blur focus', (e)->
    selectionActive = (e.type == 'focus')
    updateSelection()
  root.topCaretBox = topCaretBox = $('#topCaretBox')[0]

toggleShowHidden = ->
  body = $(document.body)
  body.toggleClass 'show-hidden'
  applyShowHidden()

applyLeisureTooltips = ->
  $('#leisure_grip').tooltip().tooltip('option', 'content', 'Toggle the Leisure bar on/off')
  $('#leisure_button').tooltip().tooltip('option', 'content', 'Cycle through different display modes')
  $('#saveButton').tooltip().tooltip('option', 'content', 'Download and save a local copy')
  $('#leisure_theme').tooltip().tooltip('option', 'content', 'Select a visual theme')
  $('#team_cthulhu').tooltip().tooltip('option', 'content', 'Homepage for the Leisure development team')
  $('#hide-show-button').tooltip().tooltip('option', 'content', 'Click to show hidden slides')

applyShowHidden = ->
  if $(document.body).hasClass 'show-hidden'
    $('#hide-show-button').tooltip().tooltip('option', 'content', 'Click to stop showing hidden slides')
    $('#hide-show-button i').addClass('fa-eye').removeClass('fa-eye-slash')
    $('#hide-show-button span').addClass('hidden')
    $('#hide-show-button div').removeClass('hidden')
  else
    $('#hide-show-button').tooltip().tooltip('option', 'content', 'Click to show hidden slides')
    $('#hide-show-button i').addClass('fa-eye-slash').removeClass('fa-eye')
    $('#hide-show-button div').addClass('hidden')
    $('#hide-show-button span').removeClass('hidden')
  root.orgApi.applyShowHidden()
  actualSelectionUpdate()

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
  if node.nodeType == Node.TEXT_NODE && node.data[node.length - 1] == '\n'
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
  actualSelectionUpdate()

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
  r.collapse delta < 0
  node = r.startContainer
  newOffset = r.startOffset + delta
  if newOffset < 0
    while node = textNodeBefore node
      if !isCollapsed node then break
    if node then r.setStart node, node.length - 1
  else if newOffset >= r.startContainer.length
    while node = textNodeAfter node
      if !isCollapsed node then break
    if node then r.setStart node, 0
  else r.setStart node, newOffset
  if r.startOffset > 0
    el = r.startContainer.splitText r.startOffset
    r.setStart el, 0
  r.collapse true
  if parent.compareDocumentPosition(r.startContainer) & Node.DOCUMENT_POSITION_CONTAINED_BY
    selectRange r
    r.startContainer.parentNode.scrollIntoViewIfNeeded()
  actualSelectionUpdate()

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
    if r.collapsed && txt.nodeType == Node.TEXT_NODE && ((r.startOffset > 2 && txt.data[r.startOffset - 3] == '\n') || (r.startOffset == 2 && followsNewline txt))
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
  save: (e, parent, r)->
    e.preventDefault()
    alert('checkpoint not implemented, yet')

followsNewline = (txt)->
  prev = textNodeBefore txt
  !prev || prev.data[prev.data.length - 1] == '\n'

templateExpansions =
  '<s': ['#+BEGIN_SRC leisure\n', '\n#+END_SRC']
  '<=': ['#+BEGIN_SRC leisure :results def\n', '\n#+END_SRC']
  '<d': ['#+BEGIN_SRC leisure :results dynamic\n', '\n#+END_SRC']
  '<h': ['#+BEGIN_HTML\n', '\n#+END_HTML']

defaultBindings =
  'C-S': keyFuncs.save
  'UP': keyFuncs.previousLine
  'DOWN': keyFuncs.nextLine
  'LEFT': keyFuncs.backwardChar
  'RIGHT': keyFuncs.forwardChar
  'TAB': keyFuncs.expandTemplate
  'C-C C-C': keyFuncs.swapMarkup
  #'C-F': keyFuncs.forwardChar
  #'C-B': keyFuncs.backwardChar
  #'C-P': keyFuncs.previousLine
  #'C-N': keyFuncs.nextLine
  #'C-X C-F': keyFuncs.save

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
    (type == Node.TEXT_NODE && (node.data == '' || isCollapsed(node.parentNode))) ||
    /^(script|style)$/i.test(node.nodeName) ||
    #(type == Node.ELEMENT_NODE && (node.offsetWidth == 0 || node.offsetHeight == 0))
    (type == Node.ELEMENT_NODE && node.offsetHeight == 0)
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
    for k, v of org.properties
      extra += " data-property-#{k}='#{escapeAttr v.trim()}'"
  #if org instanceof Source && lang = org.lead()?.trim().toLowerCase()
  #  extra += " data-lang='#{lang}'"
  if org.srcId then extra += " data-org-srcid='#{escapeAttr org.srcId}'"
  "id='#{escapeAttr org.nodeId}' data-org-type='#{escapeAttr org.type}'#{extra}"

resultsType = (org)-> org instanceof Source && (org.info.match /:results *([^ ]*)/)?[1].toLowerCase()

isDynamic = (org)-> resultsType(org) == 'dynamic'

isDef = (org)-> resultsType(org) == 'def'

orgSrcAttrs = (org)->
  "data-org-src='#{if isDef org then 'def' else if isDynamic org then 'dynamic' else 'example'}'"

markupNode = (org, start, inFragment)->
  if org instanceof Source || org instanceof Results
    #pos = org.contentPos - 1
    pos = org.contentPos
    text = org.text.substring pos
    if org instanceof Source && org.getLanguage().toLowerCase() == 'yaml'
      data = getBlock (if org.shared then org else org.fragment).nodeId
      yaml = " data-yaml-type='#{escapeAttr data.yaml.type}'"
      if org.fragment
        {name} = getCodeItems org.fragment.children[0]
        if name then yaml += " data-yaml-name='#{escapeAttr name.info.trim()}'"
    else yaml = ''
    "<span #{orgAttrs org}#{codeBlockAttrs org, inFragment}#{yaml}><span data-org-type='text'>#{escapeHtml org.text.substring(0, pos)}</span><span #{orgSrcAttrs org}>#{contentSpan text}</span></span>"
  else if org instanceof Headline then "<span #{orgAttrs org}>#{contentSpan org.text, 'text'}#{markupGuts org, checkStart start, org.text}</span>"
  else if org instanceof SimpleMarkup then markupSimple org
  else if org instanceof Fragment then markupFragment org
  else if org instanceof Drawer && org.name.toLowerCase() == 'data' then markupData org
  else "<span #{orgAttrs org}>#{content org.text}</span>"

markupFragment = (org)->
  if org.shared == 'code'
    {source} = getCodeItems org.children[0]
    if lang = source.getLanguage() then fragAttr = " data-lang='#{lang}'"
  else fragAttr = ''
  "<span #{orgAttrs org}#{fragAttr}>#{(markupNode child, null, true for child in org.children).join ''}</span>"

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

codeBlockAttrs = (org, inFragment)->
  if !inFragment && lang = org.getLanguage?() then attrs = " data-lang='#{lang}'"
  else attrs = ''
  while (org = org.prev) instanceof Meat
    if org instanceof Keyword && org.name.match /^name$/i
      return attrs + " data-org-codeblock='#{escapeAttr org.info.trim()}'"
  attrs

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

isCollapsibleText = (node)-> node.nodeType == Node.TEXT_NODE && node.parentNode.getAttribute('data-org-type') in ['text', 'meat']

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
    e.leisureShiftkey = true
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

root.modCancelled = false
root.currentMatch = null

bindContent = (div)->
  fixupNodes div
  div.addEventListener 'drop', (e)-> root.orgApi.handleDrop e
  div.addEventListener 'mousedown', (e)-> setCurKeyBinding null
  div.addEventListener 'keyup', handleKeyup div
  div.addEventListener 'keydown', (e)->
    root.modCancelled = false
    root.currentMatch = null
    c = (e.charCode || e.keyCode || e.which)
    if !addKeyPress e, c then return
    s = getSelection()
    r = s.rangeCount > 0 && s.getRangeAt(0)
    root.currentBlockIds = blockIdsForSelection s, r
    el = r.startContainer
    root.modified = el
    par = el.parentNode
    [bound, checkMod] = findKeyBinding e, div, r
    if bound then root.modCancelled = !checkMod
    else
      checkMod = modifyingKey c, e
      root.modCancelled = false
    if !bound
      if c == TAB
        e.preventDefault()
        root.modCancelled = true
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
      else if c == BS then backspace div, e, s, r, true
      else if c == DEL then del div, e, s, r, true
    if !root.modCancelled && checkMod
      #root.currentMatch = matchLine currentLine div
      root.currentMatch = lineCodeBlockType currentLine div
  displaySource()

handleDrop = (e)->
  e.preventDefault()
  t = e.dataTransfer
  s = getSelection()
  s.removeAllRanges()
  r = document.caretRangeFromPoint(e.clientX,e.clientY)
  if 'text/html' in t.types
    item = $(t.getData('text/html'))
    if item.length == 1
      txt = if item.is 'img' then "[[#{item[0].src}]]" else item.text()
      node = document.createTextNode txt
      r.insertNode node
      r.selectNode node
      edited node, true
  s.addRange r
  actualSelectionUpdate()

backspace = (parent, event, sel, r, allowBlockCrossing)->
  event.preventDefault()
  if sel.type == 'Caret'
    r.startContainer.parentNode.normalize()
    # get new range in case normalization changed it
    r = sel.getRangeAt 0
    if r.startOffset == 0
      if t = textNodeBefore r.startContainer
        if isCollapsed(t) || (!allowBlockCrossing && afterBlockBorder r) then return
        if t && parent.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY
          root.currentMatch = lineCodeBlockType lineForRange t, t.length - 1
          if t.length == 1
            root.modified = r.startContainer
            $(t).remove()
          else
            root.modified = t
            t.data = t.data.substring 0, t.length - 1
            r.startOffset = r.startOffset - 1
            setCaret r
    else
      t = r.startContainer
      offset = r.startOffset
      txt = t.data.substring(0, offset - 1)
      if offset < t.length then txt += t.data.substring offset
      t.data = txt
      if t.data == ''
        n = visibleTextNodeAfter t, 0
        r.setStart n, 0
        root.modified = n
        $(t).remove()
      else
        root.modified = r.startContainer
        r.setStart t, offset - 1
      setCaret r

del = (parent, event, sel, r, allowBlockCrossing)->
  event.preventDefault()
  if sel.type == 'Caret'
    if r.startContainer.nodeType != Node.TEXT_NODE
      console.log "NOT A TEXT NODE"
    r.startContainer.parentNode.normalize()
    # get new range in case normalization changed it
    r = sel.getRangeAt 0
    root.modified = t = r.startContainer
    next = textNodeAfter t
    chooseNext = false
    if r.startOffset == t.length - 1
      if t.data[r.startOffset] == '\n'
        console.log 'newline'
      if t.data[r.startOffset] == '\n' && (isCollapsed(next) || (!allowBlockCrossing && beforeBlockBorder r))
        return root.modCancelled = true
    if r.startOffset == 0
      if t.length == 1
        $(t).remove()
        root.modified = next
        r.setStart next, 0
      else t.data = t.data.substring 1
    else # currently, this should never happen
      t.data = t.data.substring(0, r.startOffset) + t.data.substring r.startOffset + 1
    if r.startOffset == t.length
      if isCollapsed next then next = visibleTextNodeAfter next
      r.setStart next, 0
    setCaret r

beforeBlockBorder = (r)->
  t = r.startContainer
  next = textNodeAfter t
  r.collapsed &&
  t.nodeType == Node.TEXT_NODE &&
  r.startOffset == t.length - 1 &&
  next &&
  blockElementForNode(t) != blockElementForNode(next)

afterBlockBorder = (r)->
  t = r.startContainer
  prev = textNodeBefore t
  r.collapsed &&
  t.nodeType == Node.TEXT_NODE &&
  r.startOffset == 0 &&
  prev &&
  blockElementForNode(t) != blockElementForNode(prev)

setCaret = (r)->
  sel = getSelection()
  r.collapse true
  sel.removeAllRanges()
  sel.addRange r
  actualSelectionUpdate()

blockElementsForSelection = (sel, r)->
  $("[id='#{id}']") for id in blockIdsForSelection sel, r

blockIdsForSelection = (sel, r)->
  if !sel then sel = getSelection()
  if !r then r = sel.rangeCount == 1 && sel.getRangeAt 0
  else if sel.rangeCount != 1 then return null
  blocks = if shared = $(r.startContainer).closest('[data-shared]')[0]
    [shared.id]
  else []
  if !r?.collapsed
    cur = blocks[0]
    end = $(r.endContainer).closest('[data-shared]')[0].id
    while cur && cur != end
      if cur = (getBlock cur).next
        blocks.push cur._id
  blocks

blockElementForNode = (node)-> $(node).closest('[data-shared]')[0]

handleKeyup = (div)-> (e)->
  if !e.leisureShiftkey && !root.modCancelled
    if modifyingKey (e.charCode || e.keyCode || e.which), e
      if (t = root.checkNewline) && t.data[t.length - 1] != '\n' && noFollowingText t
        t.data += '\n'
        r = document.createRange()
        r.setStart t, t.length - 1
        setCaret r
      root.orgApi.checkSourceMod div

noFollowingText = (t)->
  next = t.nextSibling
  if next == topCaretBox then next = next.nextSibling
  !(next && next.nodeType == Node.TEXT_NODE)

modifyingKey = (c, e)-> !e.altKey && !e.ctrlKey && (
  (47 < c < 58)          || # number keys
  c == 32 || c == ENTER  || # spacebar and enter
  c == BS || c == DEL    || # backspace and delete
  (64 < c < 91)          || # letter keys
  (95 < c < 112)         || # numpad keys
  (185 < c < 193)        || # ;=,-./` (in order)
  (218 < c < 223)          # [\]' (in order)
  )

lineForRange = (node, offset)->
  lineText = node.data
  lineEnd = -1
  if (lineStart = node.data.substring(0, offset).lastIndexOf '\n') == -1
    while node && lineStart == -1
      if node = textNodeBefore node
        lineText = node.data + lineText
        lineStart = node.data.lastIndexOf '\n'
  if node
    nl = node.data.indexOf '\n', offset
    if nl >= offset then lineEnd = nl + lineText.length - node.data.length
    else
      while node && lineEnd == -1
        if node = textNodeAfter node
          lineText += node.data
          if (nl = node.data.indexOf '\n') > -1 then lineEnd = nl + lineText.length - node.data.length
    if lineEnd == -1 then lineEnd = lineText.length
    lineText.substring lineStart + 1, lineEnd
  else ''

currentLine = (parent)->
  s = getSelection()
  if s.type = "Caret" && (r = s.getRangeAt(0)) && r.startContainer.nodeType == Node.TEXT_NODE
    lineForRange r.startContainer, r.startOffset
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
#  (node.nodeType == Node.ELEMENT_NODE && node.getAttribute('data-org-type') == 'boundary' && node) || (node.nodeType == Node.TEXT_NODE && isBoundary node.parentElement)

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

checkSourceMod = ->
  if (el = getDeepestActiveElement()) && el.nodeName.match /input/i then return
  if (s = getSelection()).type == 'Caret' && mod = s.getRangeAt(0).startContainer
    bl = $()
    for id in root.currentBlockIds
      bl = bl.add $("##{id}")
    if isLeisureBlock(bl) && isParentOf(bl[0], mod) && bl.find '[data-org-src="dynamic"]'
      root.orgApi.executeSource bl[0], mod
    if mod then checkStructure mod

isLeisureBlock = (bl)-> bl.is("[data-lang='leisure']") || bl.find("[data-lang='leisure']").length > 0

isParentOf = (parent, child)-> parent && parent.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY

isSensitive = (type)-> typeof type == 'string' && type.match(sensitive)

# Selection should be type Caret, because this should only be called
# after a textual modification (from typing), which should never preserve a selection
checkStructure = (node)->
  root.restorePosition null, ->
    sel = getSelection()
    if sel.type == 'Caret'
      blockIds = root.currentBlockIds
      currentBlockId = blockElementForNode(sel.focusNode).id
      if !(currentBlockId in [blockIds[0], blockIds[blockIds.length - 1]])
        if getBlock(blockIds[0])?.prev == currentBlockId then blockIds.unshift currentBlockId
        else if getBlock(L(blockIds).last())?.next == currentBlockId then blockIds.push currentBlockId
        else return console.log "Can't locate current block"
      # blockIds now contains the changed nodes
      if prev = getBlock(blockIds[0]).prev then blockIds.unshift prev
      if next = getBlock(L(blockIds).last()).next then blockIds.push next
      oldBlocks = (getBlock(id) for id in blockIds)
      newBlocks = orgDoc parseOrgMode (blockText($("##{id}")[0]) for id in blockIds).join ''
      for bl in newBlocks
        bl._id = new Meteor.Collection.ObjectID().toJSONValue()
      overrides = new Overrides()
      checkMerge(overrides, fo = oldBlocks[0], newBlocks[0], getBlock(fo.prev), (aux)->
          aux + newBlocks.shift().text)
      if !_(newBlocks).isEmpty()
        checkMerge(overrides, lo = _(oldBlocks).last(), _(newBlocks).last(), getBlock(lo.next), (aux)->
          newBlocks.pop().text + aux)
      remapBlocks overrides, oldBlocks, newBlocks
      rc = createRenderingComputer overrides
      rc.add item for id, item of overrides.adds
      rc.remove getBlock id for id of overrides.removes
      rc.change getBlock(id), item for id, item of overrides.updates
      commitEdits overrides
      rc.render()

# check whether to merge the new text with the preceding/following old text
# returns the id of the old block if merge, otherwise the id of the new block
checkMerge = (overrides, oldBlock, newBlock, auxBlock, func)->
  if newBlock.type == 'chunk' && oldBlock.type != 'chunk' && auxBlock?.type == 'chunk'
    #console.log "update item: #{auxBlock._id}"
    auxBlock.text = func auxBlock.text
    updateItem overrides, auxBlock
    auxBlock._id
  else oldBlock._id

#
# try to find the best fit for the new blocks
#
remapBlocks = (overrides, oldBlocks, newBlocks)->
  oldTypes = (block.type for block in oldBlocks)
  newTypes = (block.type for block in newBlocks)
  prevId = oldBlocks[0].prev
  oldBlocks.reverse()
  newBlocks.reverse()
  offset = 0
  for diff in (Adiff.diff oldTypes, newTypes)
    if diff[0] > offset
      #console.log "Update #{diff[0] - offset} items: #{(bl._id for bl in oldBlocks).join ', '}"
      prevId = updateBlocks diff[0] - offset, overrides, oldBlocks, newBlocks, prevId
    offset = diff[0] + diff[1]
    insertCount = diff.length - 2
    deleteCount = diff[1]
    updateCount = Math.min deleteCount, insertCount
    insertCount -= updateCount
    deleteCount -= updateCount
    if updateCount > 0
      #console.log "Update #{updateCount} items: #{(bl._id for bl in oldBlocks).join ', '}"
      prevId = updateBlocks updateCount, overrides, oldBlocks, newBlocks, prevId
    if deleteCount > 0 then console.log "Delete #{deleteCount} items: #{(block._id for block in Lazy(oldBlocks).reverse().take(deleteCount).toArray()).join ', '}"
    for i in [0 ... deleteCount]
      removeId overrides, oldBlocks.pop()._id
    #if insertCount > 0 then console.log "Insert #{insertCount} items: #{(bl._id for bl in Lazy(newBlocks).reverse().take(insertCount).toArray()).join ', '}"
    for i in [0 ... insertCount]
      prevId = insertBlock overrides, newBlocks.pop(), prevId
  if (num = oldBlocks.length - offset) > 0
    #console.log "Update #{num} items: #{(bl._id for bl in Lazy(oldBlocks).reverse().take(num).toArray()).join ', '}"
    prevId = updateBlocks num, overrides, oldBlocks, newBlocks, prevId
  #if newBlocks.length then console.log "Insert #{newBlocks.length} items: #{(bl._id for bl in Lazy(newBlocks).reverse().toArray()).join ', '}"
  while newBlocks.length > 0
    prevId = insertBlock overrides, newBlocks.pop(), prevId

updateBlocks = (num, overrides, oldBlocks, newBlocks, prevId)->
  for i in [0 ... num]
    b = oldBlocks.pop()
    n = newBlocks.pop()
    prevId = n._id = b._id
    updateItem overrides, n, true
  prevId

insertBlock = (overrides, newBlock, prevId)->
  addItem overrides, newBlock, prevId
  newBlock._id

reparseBlockRange = (firstBlockId, lastBlockId)->
  slides = [findSlideForId firstBlockId]
  if firstBlockId != lastBlockId
    cur = getBlock(firstBlockId).next
    while cur && cur != lastBlockId
      if (block = getBlock cur) && isSlideBlock block then slides.push block._id
  if slides.length > 0
    #console.log "Reparse slides: #{(slide._id for slide in slides).join ', '}"
    for slide in slides
      if !(el = $("##{slide._id}")[0])
        el = $(root.orgApi.emptySlide slide._id)[0]
        $("[data-org-headline='0']").prepend el
      [doc] = subDoc null, slide._id, 0, 0, (->)
      reparse el, doc, el
  #else console.log "No reparse necessary; nothing changed"

isSlideBlock = (block)-> block.type = 'headline' && block.level == 1

findSlideForId = (id)->
  while id && block = getBlock id
    if isSlideBlock block then return block
    id = block.prev
  null

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
    changed: false
    presentValue: presentValue
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    writeFile: ->
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
    __proto__: defaultEnv
  if r
    r.innerHTML = ''
    env.write = (str)->
      @changed = true
      r.textContent += ": #{str.replace /\n/g, '\n: '}\n"
  else env.write = (str)-> console.log ": #{str.replace /\n/g, '\n: '}\n"
  env

baseEnv =
  __proto__: defaultEnv
  readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
  write: (str)-> console.log unescapePresentationHtml str
  newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"

getResultsForSource = (parent, node)->
  r = getExistingResultsForSource node
  if !r
    newResults parent, parseOrgMode parent.textContent
    getExistingResultsForSource node
  else r

getExistingResultsForSource = (node)->
  $(blockElementForNode(node)).find("[data-org-type='results'] [data-org-src='example']")[0]

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
  if !sel.focusNode then parentForElement(parent).focus()
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
  if !target
    setTimeout (->
      for node in $(parent).find('[data-org-src="def"]')
        executeDef node), 1

reparse = (parent, text, target)-> root.orgApi.reparse parent, text, target

emptySlide = (id, slidePosition)-> root.orgApi.emptySlide id, slidePosition

installOrgDOM = (parent, orgNode, orgText, target)->
  dumpTextWatchers()
  if target
    result = $(orgText)[0]
    $(target).replaceWith result
  else
    parent.innerHTML = orgText
    result = parent.firstElementChild
  for node in (if target? then findOrIs $(target), '[data-leisure-data]' else $ '[data-leisure-data]')
    addData node
  result

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
    if txt = getSource node
      env = orgEnv(parent, node)
      executeText txt, propsFor(node), env, ->
        if env.changed then edited node
        cont?()
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
  if range.collapsed && n.nodeType == Node.TEXT_NODE && range.startOffset == n.length && n.textContent[n.length - 1] != '\n' then checkLast n, parent
  else '\n'

checkLast = (n, parent)->
  if n == parent then '\n\n'
  else if n.nextSibling then '\n'
  else checkLast n.parentNode, parent

getTags = (headline)-> headline.getAttribute 'data-org-tags'

setTags = (headline)->
  m = headline.firstChild.textContent.match headlineRE
  tags = ((m && parseTags m[HL_TAGS]) || []).join ' '
  if headline.getAttribute('data-org-tags') != tags then headline.setAttribute 'data-org-tags', tags

displaySource = -> $(sourceDiv).html('').text($(editDiv).text())

isCollapsible = (node)-> node.getAttribute('data-org-type') in ['headline', 'source', 'results']

getCollapsible = (node)->
  if node.nodeType == Node.ELEMENT_NODE
    if isCollapsible node then node
    else (node.getAttribute('data-org-type') in ['text', 'meat']) && getCollapsible node.parentElement
  else node.nodeType == Node.TEXT_NODE && getCollapsible node.parentElement

getOrgParent = (node)-> node && ((node.nodeType == Node.ELEMENT_NODE && isCollapsible(node) && node) || getOrgParent node.parentElement)

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
      when Node.ELEMENT_NODE
        if pos + 1 < target.childNodes.length then target.childNodes[pos + 1] else nodeAfterNoChildren target
      when Node.TEXT_NODE then target
      else nodeAfter node
    while node && node != limit
      if node.nodeType == Node.TEXT_NODE then offset += node.data.length
      node = nodeAfter node
    if target.nodeType == Node.TEXT_NODE then offset + pos else offset
  else -1

countCharactersIn = (node)-> countCharactersFrom node, nodeAfterNoChildren node

countCharactersFrom = (start, end)->
  total = 0
  while start && start != end
    if start.nodeType == Node.TEXT_NODE then total += start.data.length
    start = nodeAfter start
  if start == end then total else -1

findDomPosition = (node, pos, contain)->
  parent = node
  while node
    if node.nodeType == Node.TEXT_NODE
      if pos < node.length
        n = node
        while n != parent && n != null
          n = n.parentNode
        return if n == null then noDomPosition parent, contain else [node, pos]
      pos -= node.length
    node = textNodeAfter node
  noDomPosition parent, contain

noDomPosition = (parent, contain)->
  if contain
    n = lastTextChild parent
    [n, n && n.data.length]
  else [null, null]

# get the next node in the preorder traversal, disregarding the node's children
nodeAfterNoChildren = (node)-> nodeAfter node, true

# get the last child of a node
lastChild = (node)->
  if child = node.lastChild
    while child.nodeType == Node.ELEMENT_NODE && child.lastChild
      child = child.lastChild
  child

lastTextChild = (node)->
  if (ch = node.lastChild) && ch.nodeType != Node.TEXT_NODE
    ch = textNodeBefore ch
    if !(node.compareDocumentPosition(ch) & Node.DOCUMENT_POSITION_CONTAINED_BY) then ch = null
  ch

# get the next node in the preorder traversal, starting with the node's children
nodeAfter = (node, up)->
  while node
    if node.nodeType == Node.ELEMENT_NODE && !up && node.childNodes.length then return node.childNodes[0]
    else if node.nextSibling then return node.nextSibling
    else
      up = true
      node = node.parentNode
  null

filteredNodeAfter = (node, director)->
  rejected = false
  while node
    if !rejected && !up && node.nodeType == Node.ELEMENT_NODE && node.childNodes.length
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
  while node && node != end
    if node.nodeType == Node.TEXT_NODE then text += node.data
    node = nodeAfter node
    if node?.nodeType == Node.ELEMENT_NODE && node.hasAttribute 'data-shared' then break
  text

orgForNode = (node)->
  org = suborgForNode node
  org.linkNodes()
  org.fixOffsets 0
  org

suborgForNode = (node)->
  org = parseOrgMode blockText node
  if !$(node).is('[data-org-headline="0"]')
    if org.children.length == 1 then org = org.children[0]
    else org = new Fragment org.offset, org.children
  if $(node).is('[data-shared]')
    org.nodeId = node.id
    org.shared = $(node).attr 'data-shared'
  for child in orgChildrenForNode node
    org.children.push suborgForNode child
  org

orgChildrenForNode = (node)->
  children = []
  end = nodeAfter node, true
  while node = filteredNodeAfter node, ((n)->
    if n == end then 'quit'
    else if n.nodeType == Node.ELEMENT_NODE && n.hasAttribute 'data-shared'
      children.push n
      'reject') then
  children

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
    if node.nodeType == Node.ELEMENT_NODE && !up && node.childNodes.length then return node.childNodes[node.childNodes.length - 1]
    else if node.previousSibling then return node.previousSibling
    else
      up = true
      node = node.parentNode
  null

textNodeBefore = (node)->
  while node = nodeBefore node
    if node.nodeType == Node.TEXT_NODE then return node

textNodeAfter = (node)->
  while node = nodeAfter node
    if node.nodeType == Node.TEXT_NODE then return node

visibleTextNodeBefore = (node)->
  while node = nodeBefore node
    if node.nodeType == Node.TEXT_NODE && !isCollapsed node then return node

visibleTextNodeAfter = (node)->
  while node = nodeAfter node
    if node.nodeType == Node.TEXT_NODE && !isCollapsed node then return node

#
# Shadow dom support
#

fixOffsets = (org)->
  org.fixOffsets()
  org

getNodeText = (node)->
  if $(node).is('[data-shared]') then fixOffsets orgForNode(node)
  else if root.currentDocument && $(node).is('[maindoc]') then fixOffsets orgForNode(node)
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
  executeText: (text, props, env, cont)-> executeText text, Nil, env ? baseEnv, cont
  installOrgDOM: (parent, orgNode, orgText, target)-> installOrgDOM parent, orgNode, orgText, target
  newNode: ->
  redrawIssue: (i)-> console.log "REDRAW ISSUE: #{i}"
  defineWidget: (id)->
  applyLeisureTooltips: ->
  applyShowHidden: ->
  inMode: (el)->
    (mode = $(el).closest("[data-edit-mode]")).length == 0 || $(mode).attr('data-edit-mode') == @name
  reparse: (parent, text, target)->
    styleCache = {}
    text = text || (getNodeText target || parent)
    sel = getSelection()
    [orgNode, orgText] = @markupOrgWithNode text, null, target
    node = null
    root.restorePosition parent, => node = @installOrgDOM parent, orgNode, orgText, target
    #needsReparse = false
    setTimeout (->
      for l in reparseListeners
        l parent, orgNode, orgText
      ), 1
    node
  checkSourceMod: checkSourceMod
  configureMenu: configureMenu
  removeSlide: (id)-> $("##{id}").remove()
  defineView: ->
  deleteView: (type)->
  handleDrop: handleDrop
  updateObserver: (observerId, observerContext, yaml, block, type)->
    if observerContext.block.language.toLowerCase() == 'leisure'
      parent = $("##{observerId}")
      if parent[0]
        if parent.is("[data-org-type='source']") then node = parent[0]
        else node = parent.find("[data-org-type='source']")[0]
        if node then return @executeSource parent[0], node
    observerContext?.update? data.yaml, data, type

basicOrg =
  __proto__: orgNotebook
  name: 'plain'
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  executeDef: executeDef
  executeSource: executeSource
  createResults: createResults
  installOrgDOM: (parent, orgNode, orgText, target)->
    if !target then parent.setAttribute 'class', 'org-plain'
    node = orgNotebook.installOrgDOM parent, orgNode, orgText, target
    if target && this != root.orgApi then root.orgApi.newNode target
    node
  bindings: defaultBindings
  leisureButton: swapMarkup
  #emptySlide: (id)-> "<span id='#{id}'></span>#{boundarySpan}"
  emptySlide: (id)-> "<span id='#{id}'></span>"
  insertEmptySlide: (id, prev)->
    slide = $(@emptySlide id)
    if prev then $("##{prev}").after slide
    else $('[maindoc]').prepend slide
    slide[0]
  inMode: -> true
  updateBlock: ->

findOrIs = (set, selector)-> if set.is selector then set else set.find selector

root.findOrIs = findOrIs
root.parentForElement = parentForElement
root.parentForBlockId = parentForBlockId
root.parentForDocId = parentForDocId
root.basicOrg = basicOrg
root.plainOrg = basicOrg
root.orgNotebook = orgNotebook
root.markupOrg = markupOrg
root.bindContent = bindContent
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
root.handleKeyup = handleKeyup
root.backspace = backspace
root.del = del
root.getOrgParent = getOrgParent
root.getOrgType = getOrgType
root.executeText = executeText
root.executeDef = executeDef
root.propsFor = propsFor
root.orgEnv = orgEnv
root.baseEnv = baseEnv
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
root.visibleTextNodeBefore = visibleTextNodeBefore
root.visibleTextNodeAfter = visibleTextNodeAfter
root.isParentOf = isParentOf
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
root.blockElementsForSelection = blockElementsForSelection
root.blockElementForNode = blockElementForNode
root.blockIdsForSelection = blockIdsForSelection
root.orgForNode = orgForNode
root.orgChildrenForNode = orgChildrenForNode
root.emptySlide = emptySlide
root.toggleShowHidden = toggleShowHidden
root.applyLeisureTooltips = applyLeisureTooltips
root.applyShowHidden = applyShowHidden
root.actualSelectionUpdate = actualSelectionUpdate
root.currentBlockIds = []
root.toggleLeisureBar = toggleLeisureBar
