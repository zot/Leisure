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
  emptyDOMCursor,
  isCollapsed,
  selectRange,
} = DOMCursor = root.DOMCursor = window.DOMCursor
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
idCount = 0
nodes = {}
reparseListeners = []
savingPosition = false
savedPositionOverride = null
clipboardKey = null
root.currentMode = null
parentSpec = null
sourceSpec = null
fs = null
hideSaveButton = true
selectionActive = true
movementGoal = null
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
lastKeys = []
maxLastKeys = 4
keyCombos = []
prevKeybinding = curKeyBinding = null
root.modCancelled = false
root.currentMatch = null

DOMCursor.prototype.filterOrg = -> @addFilter (n)-> !n.hasAttribute('data-nonorg') || 'skip'

# parentForX is needed for slide editing modes and for multple document editing
parentForNode = (el)-> $(el).closest('[maindoc]')[0]

parentForBlockId = (id)-> $('[maindoc]')[0]

parentForDocId = (id)-> $('[maindoc]')[0]

nextOrgId = -> 'org-node-' + idCount++

getOrgType = (node)-> node?.getAttribute? 'data-org-type'

initOrg = (parent, source)->
  parentSpec = parent
  sourceSpec = source
  $("<div LeisureOutput contentEditable='false' id='leisure_bar'><button id='leisure_grip' title='x'><i class='fa fa-angle-left'></i><i class='fa fa-angle-right'></i></button>\n<button id='leisure_button' title='x'><i class='fa fa-glass'></i><div></div></button>\n<div id='leisure_rollup'><button id='checkpoint' title='x'><i class='fa fa-cloud-upload'></i> Checkpoint</button><button id='revert' title='x'><i class='fa fa-reply'></i> Revert</button><button id='edit' title='x'><i class='fa fa-edit'></i> Edit</button><button id='saveButton' title='x' download='leisureFile.lorg'><i class='fa fa-save'></i><div></div><a id='saveLink' class='hidden'></a></button><div id='leisure_theme' title='x'><span>Theme: </span>\n  <select id='themeSelect'>\n    <option value='flat'>Flat</option>\n    <option value=steampunk>Steampunk</option>\n   <option value=googie>Googie</option>\n   <option value=cthulhu>Cthulhu</option>\n  <option value=console>Console</option>\n  </select></div>\n<input id='saveFile' class='hidden' type='file' nwsaveas onchange='Leisure.saveFile(this)'></input><button id='hide-show-button' onclick='Leisure.toggleShowHidden()' title='x'><i class='fa fa-eye-slash'></i><div class='hidden'></div><span></span></button><a id='tc' target='_blank' href='http://www.teamcthulhu.com'><button id='team_cthulhu' title='x'><span><img src='images/eldersign.png'>TEAM CTHULHU</span></button></a></div></div><div id='leisure_dummy'></div>")
    .prependTo(document.body)
    .find('#leisure_button').mousedown (e)->
      e.preventDefault()
      root.currentMode.leisureButton()
  applyLeisureTooltips()
  $("<div class='paginators'><button id='prevSlide'><i class='fa fa-caret-left fa-1x'></i><span></span></button><button id='nextSlide'><i class='fa fa-caret-right fa-1x'></i><span></span></button></div>").appendTo(document.body)
  $("#leisure_grip").click (e) -> toggleLeisureBar()
  $("#themeSelect").change (e) ->
    Leisure.setTheme(e.target.value)
  b = $('#saveButton')
  if nwDispatcher?
    $(document.body).addClass 'nw'
    $('#saveFile')[0].parentSpec = parentSpec
    fs = require 'fs'
  b.click ->
    if nwDispatcher? then $('#saveFile').click()
    else
      #console.log "SAVE"
      #console.log encodeURIComponent $(parent)[0].textContent
      #b.attr 'href', "data:text/plain;base64,#{encodeURIComponent btoa $(parent)[0].textContent}"
      console.log "SAVE: data:text/plain,#{encodeURIComponent getOrgText $('[maindoc]').children().first()[0]}"
      ($('#saveLink')
        #.attr 'download', root.currentDocument.leisure.name
        .attr 'href', "data:text/plain,#{encodeURIComponent getOrgText $('[maindoc]').children().first()[0]}")[0].click()
  $('#checkpoint').css 'display', 'none'
  $('#checkpoint').click -> Leisure.snapshot()
  $('#revert').css 'display', 'none'
  $('#revert').click -> root.restorePosition null, -> Leisure.revert()
  $('#edit').click -> editFile()
  $('#file').change (evt)->
    files = evt.target.files
    for f in files
      reader = new FileReader()
      reader.onload = (e)-> Meteor.call 'edit', f.name, e.target.result, (err, id)->
        location.hash = "#load=/local/#{f.name}/#{id}"
        location.reload()
      reader.readAsText f
  (root.currentMode = Leisure.fancyOrg).useNode $(parent)[0], source
  Leisure.initStorage '#login', '#panel', root.currentMode
  installSelectionMenu()
  monitorSelectionChange()
  document.addEventListener('cut', cutListener)
  document.addEventListener('copy', copyListener)
  document.addEventListener('paste', pasteListener)

copyListener = (e)->
  clipboardKey = 'copy'
  sel = getSelection()
  if sel.type == 'Range' then replaceClipboardWithSelection e, sel

cutListener = (e)->
  clipboardKey = 'cut'
  sel = getSelection()
  if sel.type == 'Range'
    replaceClipboardWithSelection e, sel
    sel.getRangeAt(0).deleteContents()
    root.orgApi.checkSourceMod()

replaceClipboardWithSelection = (e, sel)->
    e.preventDefault()
    n = document.createElement('div')
    n.appendChild sel.getRangeAt(0).cloneContents()
    e.clipboardData.setData 'text/html', n.innerHTML
    e.clipboardData.setData 'text/plain', domCursorForSelectedText().getText()

pasteListener = (e)->
  clipboardKey = 'paste'
  e.preventDefault()
  sel = getSelection()
  if sel.type != 'None'
    text = e.clipboardData.getData('text/plain')
    r = sel.getRangeAt 0
    r.deleteContents()
    savedSel = new SelectionDescriptor parentForNode(sel.focusNode), r
    r.insertNode document.createTextNode text
    r2 = document.createRange()
    r2.setStart r.endContainer, r.endOffset
    r2.setEnd r.endContainer, r.endOffset
    root.orgApi.checkSourceMod()
    savedSel.offset = text.length
    savedSel.restore()

editFile = -> $('#file')[0].click()

toggleLeisureBar = ->
  g = $("body")
  if g.hasClass 'bar_collapse' then g.removeClass 'bar_collapse' else g.addClass 'bar_collapse'

updateSelection = Lodash.throttle (-> actualSelectionUpdate()), 30,
  leading: true
  trailing: true

actualSelectionUpdate = ->
  if selectionActive
    s = getSelection()
    if s.type != 'None' && !isCollapsed(s.focusNode)
      range = s.getRangeAt(0)
      rects = range.getClientRects()
      if rects.length > 0
        right = _(rects).last().right
        top = _(rects).last().top
        bubble = $("#selectionBubble")[0]
        bubble.style.left = "#{right}px"
        bubble.style.top = "#{top - bubble.offsetHeight}px"
        $(document.body).addClass 'selection'
        return
  $(document.body).removeClass 'selection'

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

toggleShowHidden = ->
  body = $(document.body)
  body.toggleClass 'show-hidden'
  applyShowHidden()

applyLeisureTooltips = ->
  $('#leisure_grip').tooltip(content: 'Toggle the Leisure bar on/off')
  $('#leisure_button').tooltip(content: 'Cycle through different display modes')
  $('#checkpoint').tooltip(content: 'Checkpoint on server')
  $('#revert').tooltip(content: 'Revert document to last checkpoint on server')
  $('#edit').tooltip(content: 'Collaboratively edit a local file (just send someone the URL)')
  $('#saveButton').tooltip(content: 'Download and save a local copy')
  $('#leisure_theme').tooltip(content: 'Select a visual theme')
  $('#team_cthulhu').tooltip(content: 'Homepage for the Leisure development team')
  $('#hide-show-button').tooltip(content: 'Click to show hidden slides')

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

makeGoalFunc = (domCur, goal)->
  (col)->
    o = headlineOffset(domCur, col)
    if o < goal then -1 else if o == goal then 0 else 1

headlineOffset = (domCur, col)->
  if !domCur.hlOff
    domCur.hlOff = $(domCur.node).closest("[data-org-headline='1']")[0].getClientRects()[0].left
  col - domCur.hlOff

getMovementGoal = (domCur)-> headlineOffset domCur, domCur.charRect().left

moveSelectionUp = (parent, r)->
  pos = domCursorForCaret()
  if !(prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine]) then movementGoal = getMovementGoal pos
  goalFunc = makeGoalFunc pos, movementGoal
  pos
    .backwardLine(goalFunc)
    .moveCaret()
    .show $("#leisure_bar")[0].getClientRects()[0]

moveSelectionDown = (parent, r)->
  pos = domCursorForCaret()
  if !(prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine]) then movementGoal = getMovementGoal pos
  goalFunc = makeGoalFunc pos, movementGoal
  pos
    .forwardLine(goalFunc)
    .moveCaret()
    .show $("#leisure_bar")[0].getClientRects()[0]

moveSelectionForward = (parent, r)->
  pos = domCursorForCaret()
    .forwardChar()
    .moveCaret()
    .show $("#leisure_bar")[0].getClientRects()[0]

moveSelectionBackward = (parent, r)->
  domCursorForCaret()
    .backwardChar()
    .moveCaret()
    .show $("#leisure_bar")[0].getClientRects()[0]

# functions return whether to check for mods
keyFuncs =
  backwardChar: (e, parent, r)->
    e.preventDefault()
    moveSelectionBackward parent, r
    false
  forwardChar: (e, parent, r)->
    e.preventDefault()
    moveSelectionForward parent, r
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
        if start == txt.length
          next = null
          txt.data = txt.data.substring 0, txt.length - 2
        else
          next = (if start == 2 then txt else txt.splitText start - 2)
          next.data = next.data.substring 2
        txt.parentNode.insertBefore (document.createTextNode first + second), next
        selectRange nativeRange findDomPosition parent, pos + first.length
        reparse parent
  save: (e, parent, r)->
    e.preventDefault()
    Leisure.snapshot()

followsNewline = (txt)->
  prev = textNodeBefore parentForNode(txt), txt
  !prev || prev.data[prev.length - 1] == '\n'

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

swapMarkup = ->
  root.currentMode = (if root.currentMode == Leisure.fancyOrg then Leisure.basicOrg else Leisure.fancyOrg)
  root.restorePosition parentSpec, ->
    if root.currentDocument then root.currentMode.useNode $(parentSpec)[0], sourceSpec, docOrg()
    else root.currentMode.useNode $(parentSpec)[0], sourceSpec

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
    [org, markup]
  else
    console.log "Attempt to display uknown object type: ", text
    throw new Error "Attempt to display unknown type of object: #{text}"

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
  else "<span #{orgAttrs org}>#{content org.text}</span>"

markupFragment = (org)->
  if org.shared == 'code'
    {source} = getCodeItems org.children[0]
    if lang = source.getLanguage() then fragAttr = " data-lang='#{lang}'"
  else fragAttr = ''
  "<span #{orgAttrs org}#{fragAttr}>#{(markupNode child, null, true for child in org.children).join ''}</span>"

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
      markupNode(c, s)).join ""

contentSpan = (str, type)->
  str = content str
  if str then "<span#{if type then " data-org-type='#{escapeAttr type}'" else ''}>#{str}</span>" else ''

content = (str)-> escapeHtml str

fixupNodes = (node)->
  for n in $(node).find('[data-org-type="headline"]')
    setTags n

isCollapsibleText = (node)-> node.nodeType == Node.TEXT_NODE && node.parentNode.getAttribute('data-org-type') in ['text', 'meat']

shiftKey = (c)-> 15 < c < 19

modifiers = (e, c)->
  res = specialKeys[c] || String.fromCharCode(c)
  if e.altKey then res = "M-" + res
  if e.ctrlKey then res = "C-" + res
  if e.shiftKey then res = "S-" + res
  res

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
  div.addEventListener 'drop', (e)-> root.orgApi.handleDrop e
  div.addEventListener 'mousedown', (e)-> setCurKeyBinding null
  div.addEventListener 'mouseup', (e)-> adjustSelection e
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

domCursor = (node, pos)-> new DOMCursor(node, pos).filterOrg()

adjustSelection = (e)->
  if e.detail == 1 then return
  s = getSelection()
  if s.type == 'Range'
    r = s.getRangeAt 0
    pos = domCursor r.endContainer, r.endOffset
      .mutable()
      .filterVisibleTextNodes()
      .firstText()
    while pos.node != r.startContainer && pos.node.data.trim() == ''
      pos == pos.prev()
    while pos.pos > 0 && pos.node.data[pos.pos - 1] == ' '
      pos.pos--
    if (pos.node != r.startContainer || pos.pos > r.startOffset) && (pos.node != r.endContainer || pos.pos < r.endOffset)
      r.setEnd pos.node, pos.pos
      s.removeAllRanges()
      s.addRange r

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
  if sel.type == 'Range'
    sel.getRangeAt(0).deleteContents()
  else if sel.type == 'Caret'
    r.startContainer.parentNode.normalize()
    # get new range in case normalization changed it
    r = sel.getRangeAt 0
    if r.startOffset == 0
      if t = textNodeBefore parent, r.startContainer
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
        n = visibleTextNodeAfter parent, t
        if n
          r.setStart n.node, 0
          root.modified = n.node
        $(t).remove()
      else
        root.modified = r.startContainer
        r.setStart t, offset - 1
      setCaret r

del = (parent, event, sel, r, allowBlockCrossing)->
  event.preventDefault()
  if sel.type == 'Range'
    sel.getRangeAt(0).deleteContents()
  else if sel.type == 'Caret'
    if r.startContainer.nodeType != Node.TEXT_NODE
      console.log "NOT A TEXT NODE"
    r.startContainer.parentNode.normalize()
    # get new range in case normalization changed it
    r = sel.getRangeAt 0
    root.modified = t = r.startContainer
    next = textNodeAfter parent, t
    chooseNext = false
    if r.startOffset == t.length - 1
      if t.data[r.startOffset] == '\n'
        console.log 'newline'
      if t.data[r.startOffset] == '\n' && (isCollapsed(next) || (!allowBlockCrossing && beforeBlockBorder parent, r))
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
      if isCollapsed next then next = visibleTextNodeAfter parent, next
      r.setStart next, 0
    setCaret r

beforeBlockBorder = (parent, r)->
  t = r.startContainer
  next = textNodeAfter parent, t
  r.collapsed &&
  t.nodeType == Node.TEXT_NODE &&
  r.startOffset == t.length - 1 &&
  next &&
  blockElementForNode(t) != blockElementForNode(next)

afterBlockBorder = (r)->
  t = r.startContainer
  prev = textNodeBefore parentForNode(t), t
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
  if sel.rangeCount == 1
    if !r then r = sel.getRangeAt 0
    blocks = if shared = $(r.startContainer).closest('[data-shared]')[0]
      [shared.id]
    else []
    if !r?.collapsed
      cur = blocks[0]
      end = $(r.endContainer).closest('[data-shared]')[0].id
      while cur && cur != end
        if cur = (getBlock cur).next
          blocks.push cur
    blocks

blockElementForNode = (node)-> $(node).closest('[data-shared]')[0]

handleKeyup = (div)-> (e)->
  if clipboardKey || (!e.leisureShiftkey && !root.modCancelled && modifyingKey((e.charCode || e.keyCode || e.which), e))
    if (t = root.checkNewline) && t.data[t.length - 1] != '\n' && noFollowingText t
      t.data += '\n'
      r = document.createRange()
      r.setStart t, t.length - 1
      setCaret r
    root.orgApi.checkSourceMod div
    clipboardKey = null

noFollowingText = (t)->
  next = t.nextSibling
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
  pos = domCursor(node).mutable().filterTextNodes()
  if (lineStart = node.data.substring(0, offset).lastIndexOf '\n') == -1
    while !pos.isEmpty() && lineStart == -1
      if pos = pos.prev()
        lineText = pos.node.data + lineText
        lineStart = pos.node.data.lastIndexOf '\n'
  if !pos.isEmpty()
    nl = pos.node.data.indexOf '\n', offset
    if nl >= offset then lineEnd = nl + lineText.length - pos.node.length
    else
      while !pos.isEmpty() && lineEnd == -1
        if pos = pos.next()
          lineText += pos.node.data
          if (nl = pos.node.data.indexOf '\n') > -1 then lineEnd = nl + lineText.length - pos.node.length
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
      modifying = false
    else status "EMPTY ENTRY"

checkSourceMod = ->
  if (el = getDeepestActiveElement()) && el.nodeName.match /input/i then return
  if (s = getSelection()).type == 'Caret' && mod = s.getRangeAt(0).startContainer
    bl = $()
    for id in root.currentBlockIds
      bl = bl.add $("##{id}")
    if isLeisureBlock(bl) && bl[0]?.contains(mod) && bl.find '[data-org-src="dynamic"]'
      root.orgApi.executeSource bl[0], mod
    if mod then checkStructure mod

isLeisureBlock = (bl)-> bl.is("[data-lang='leisure']") || bl.find("[data-lang='leisure']").length > 0

# Selection should be type Caret, because this should only be called
# after a textual modification (from typing), which should never preserve a selection
checkStructure = (node)->
  root.restorePosition null, ->
    sel = getSelection()
    if sel.type == 'Caret'
      blockIds = L(root.currentBlockIds).filter((v)-> v).toArray()
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
# Using Adiff, a diff implementation for arrays
# results are like splice calls [offset, count, item, item, item]
#
remapBlocks = (overrides, oldBlocks, newBlocks)->
  oldTypes = (block.type for block in oldBlocks)
  newTypes = (block.type for block in newBlocks)
  prevId = oldBlocks[0].prev
  oldBlocks.reverse()
  newBlocks.reverse()
  offset = 0
  diffs = Adiff.diff oldTypes, newTypes
  #if diffs.length then console.log "Old Structure: [#{oldTypes.join ', '}], new: [#{newTypes.join ', '}]"
  for diff in diffs
    if diff[0] > offset
      #console.log "Update-1 #{diff[0] - offset} items: #{(bl._id for bl in oldBlocks).join ', '}"
      prevId = updateBlocks diff[0] - offset, overrides, oldBlocks, newBlocks, prevId
    offset = diff[0] + diff[1]
    insertCount = diff.length - 2
    deleteCount = diff[1]
    updateCount = Math.min deleteCount, insertCount
    insertCount -= updateCount
    deleteCount -= updateCount
    if updateCount > 0
      #console.log "Update-2 #{updateCount} items: #{(bl._id for bl in oldBlocks).join ', '}"
      prevId = updateBlocks updateCount, overrides, oldBlocks, newBlocks, prevId
    #if deleteCount > 0 then console.log "Delete #{deleteCount} items: #{("#{block._id}: #{block.text}" for block in Lazy(oldBlocks).reverse().take(deleteCount).toArray()).join ', '}"
    for i in [0 ... deleteCount]
      removeId overrides, oldBlocks.pop()._id
    #if insertCount > 0 then console.log "Insert-1 #{insertCount} items: #{("#{bl._id}: #{bl.text}" for bl in Lazy(newBlocks).reverse().take(insertCount).toArray()).join ', '}"
    for i in [0 ... insertCount]
      prevId = insertBlock overrides, newBlocks.pop(), prevId
  #
  # should just be a list of new/old items to update now
  # new/old lists should be the same size
  #
  if oldBlocks.length != newBlocks.length then console.log "WARNING -- inconsistent block count after diff processing"
  prevId = updateBlocks newBlocks.length, overrides, oldBlocks, newBlocks, prevId

updateBlocks = (num, overrides, oldBlocks, newBlocks, prevId)->
  for i in [0 ... num]
    b = oldBlocks.pop()
    n = newBlocks.pop()
    prevId = n._id = b._id
    if n.text != b.text then updateItem overrides, n, true
  prevId

insertBlock = (overrides, newBlock, prevId)->
  addItem overrides, newBlock, prevId
  newBlock._id

escapeAttr = (str)->
  if typeof str == 'string' then str.replace /['"&]/g, (c)->
    switch c
      when '"' then '&quot;'
      when "'" then '&#39;'
      when '&' then '&amp;'
  else str

leisureEnv = (env)->
  env.presentValue = (v)-> rz(L_showHtml) lz v
  env.executeText = (text, props, cont)->
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

jsEnv = (env)->
  env.presentValue = (v)-> if v instanceof Html then v.content else escapeHtml v
  env.executeText = (text, props, cont)->
    try
      @write @presentValue eval text
    catch err
      @write errorDiv err.stack

class Html
  constructor: (@content)->

Leisure.html = (content)-> new Html content

errorDiv = (err, orgText)-> "<div class='error' contenteditable='false'><span class='hidden'>#{orgText || ''}</span><span data-nonorg='true'>#{escapeHtml err}</span></div>"

installEnvLang = (nodeOrLang, env)->
  switch (if typeof nodeOrLang == 'string' then nodeOrLang else getNodeLang nodeOrLang)
    when 'leisure' then leisureEnv env
    when 'javascript' then jsEnv env
    else unknownLanguageEnv env

orgEnv = (parent, node)->
  r = getResultsForSource parent, node
  env =
    changed: false
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    writeFile: ->
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
    __proto__: defaultEnv
  installEnvLang node, env
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

textEnv = (lang)->
  env = __proto__: baseEnv
  installEnvLang lang, env
  env

getResultsForSource = (parent, node)->
  r = getExistingResultsForSource node
  if !r
    newResults parent, parseOrgMode getOrgText parent
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

class SelectionDescriptor
  constructor: (@parent, range)->
    if range
      @offset = 0
      @start = getTextPosition parent, range.startContainer, range.startOffset
      @end = getTextPosition parent, range.endContainer, range.endOffset
    else
      @restore = ->
      @toString = "Selection(none)"
  currentRange: ->
    if document.body.compareDocumentPosition(@parent) & Node.DOCUMENT_POSITION_DISCONNECTED
      @parent = $('[maindoc]')[0]
    [startContainer, startOffset] = findDomPosition @parent, @start + @offset
    if startContainer
      r = document.createRange()
      r.setStart startContainer, startOffset
      if startOffset == endOffset then r.collapse true
      else
        [endContainer, endOffset] = findDomPosition @parent, @end + @offset, true
        if !endContainer then r.collapse true
        else
          if startContainer.compareDocumentPosition(endContainer) & Node.DOCUMENT_POSITION_PRECEDING then r.setEnd startContainer, startOffset
          else r.setEnd endContainer, endOffset
      r
  restore: -> selectRange @currentRange()
  toString: -> "Selection(#{@start}, #{@end})"

saveSelection = ->
  sel = getSelection()
  if sel.type == 'None' then new SelectionDescriptor()
  else new SelectionDescriptor parentForNode(sel.focusNode), sel.getRangeAt 0

savePosition = (saveFunc, block)->
  if savingPosition then block()
  else
    savingPosition = true
    pos = saveFunc()
    try
      block()
    finally
      if savedPositionOverride
        savedPositionOverride.restore()
        savedPositionOverride = null
      else pos()
      savingPosition = false

overrideSavedPosition = (parent, range)->
  if savingPosition then savedPositionOverride = new SelectionDescriptor parent, range

restorePosition = (parent, block)-> savePosition saveSelection, block

loadOrg = (parent, text, downloadPath, target)->
  text = crnl text
  if !target
    if nwDispatcher? then $('#saveFile').attr 'nwsaveas', downloadPath
    else $('#saveLink').attr 'download', downloadPath
  reparse parent, text, target
  if !target
    setTimeout (->
      for node in $(parent).find('[data-org-src="def"]')
        executeDef node), 1

reparse = (parent, text, target)-> root.orgApi.reparse parent, text, target

installOrgDOM = (parent, orgNode, orgText, target)->
  if target
    result = $(orgText)[0]
    $(target).replaceWith result
  else
    parent.innerHTML = orgText
    result = parent.firstElementChild
  result

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
      env.executeText txt, propsFor(node), ->
        if env.changed then edited node
        cont?()
    else console.log "No end for src block"
  else getOrgType(node) != 'text' && !isDocNode(node) && executeSource parent, node.parentElement

getNodeLang = (node) ->
  ($(node).closest("[data-lang]").attr('data-lang') || '')

getNodeSource = (node)->
  if (src = $(node).closest("[data-org-type='source']")).length == 0 then []
  else [src[0], getOrgText src.find('[data-org-src]')[0]]

# given a node, find the enclosing source node and execute it's content as a definition
executeDef = (node, cont)->
  [srcNode, text] = getNodeSource node
  if srcNode then textEnv(getNodeLang node).executeText text, propsFor(srcNode), cont

followingSpan = (node)-> node.nextElementSibling ? $('<span></span>').appendTo(node.parentNode)[0]

# Need to insert an extra newline if all of these apply:
# 1) the range is collapsed
# 2) we are at the end of a text node
# 3) the text node does not end in a newline
# 4) the text node is at the end of the editable container
checkExtraNewline = (range, n, parent)->
  if range.collapsed && n.nodeType == Node.TEXT_NODE && range.startOffset == n.length && getOrgText(n)[n.length - 1] != '\n' then checkLast n, parent
  else '\n'

checkLast = (n, parent)->
  if n == parent then '\n\n'
  else if n.nextSibling then '\n'
  else checkLast n.parentNode, parent

setTags = (headline)->
  m = getOrgText(headline.firstChild).match headlineRE
  tags = ((m && parseTags m[HL_TAGS]) || []).join ' '
  if headline.getAttribute('data-org-tags') != tags then headline.setAttribute 'data-org-tags', tags

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
  org = parseOrgMode getOrgText parent
  orgNode = org.findNodeAt pos

getTextPosition = (parent, target, pos)->
  if parent
    domCursor parent, 0
      .mutable()
      .filterTextNodes()
      .filterParent parent
      .countChars target, pos
  else -1

findDomPosition = (parent, pos, contain)->
  n = domCursor parent, 0
    .mutable()
    .filterTextNodes()
    .filterParent parent
    .forwardChars pos, contain
  if n.isEmpty() then [null, null] else [n.node, n.pos]

nonOrg = (node)->
  $(node)
    .attr 'data-nonorg', 'true'
    .attr 'contenteditable', 'false'

# full text for node
getOrgText = (node)->
  domCursor node.firstChild, 0
    .mutable()
    .filterTextNodes()
    .filterParent node
    .getText()

orgForNode = (node)-> parseOrgMode getOrgText node

# return the block text for a node -- just the text that's in its mongo block
blockText = (node)->
  domCursor node.firstChild, 0
    .mutable()
    .addFilter (n)-> !n.hasAttribute('data-shared') || 'skip'
    .filterParent node
    .filterTextNodes()
    .getText()

nodeBefore = (node)-> domCursor(node, 0).prev().node

textNodeBefore = (parent, node)->
  n = domCursor node, 0
    .mutable()
    .filterTextNodes()
    .filterParent parent
    .prev()
  !n.isEmpty() && n.node

textNodeAfter = (parent, node)->
  n = domCursor node, 0
    .mutable()
    .filterTextNodes()
    .filterParent parent
    .next()
  !n.isEmpty() && n.node

visibleTextNodeAfter = (parent, node)->
  n = domCursor node, 0
    .mutable()
    .filterVisibleTextNodes()
    .filterParent parent
    .next()
  !n.isEmpty() && n.node

# full text for node
getNodeText = (node)->
  if $(node).is('[data-shared]') then orgForNode(node)
  else if root.currentDocument && $(node).is('[maindoc]') then orgForNode(node)
  else getOrgText node

emptyOutNode = (node)->
  node.innerHTML = ''
  newNode = $(node)[0].cloneNode false
  $(node).after newNode
  $(node).remove()
  newNode

root.orgApi = null

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
  installOrgDOM: (parent, orgNode, orgText, target)-> installOrgDOM parent, orgNode, orgText, target
  newNode: ->
  redrawIssue: (i)-> console.log "REDRAW ISSUE: #{i}"
  defineWidget: (id)->
  applyLeisureTooltips: ->
  applyShowHidden: ->
  inMode: (el)->
    (mode = $(el).closest("[data-edit-mode]")).length == 0 || $(mode).attr('data-edit-mode') == @name
  reparse: (parent, text, target)->
    text = text || (getOrgText target || parent)
    sel = getSelection()
    [orgNode, orgText] = @markupOrgWithNode text, null, target
    node = null
    root.restorePosition parent, => node = @installOrgDOM parent, orgNode, orgText, target
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
    observerContext?.update? block.yaml, block, type

basicOrg =
  __proto__: orgNotebook
  name: 'plain'
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  executeDef: executeDef
  executeSource: executeSource
  createResults: (srcNode)->
  installOrgDOM: (parent, orgNode, orgText, target)->
    if !target then parent.setAttribute 'class', 'org-plain'
    node = orgNotebook.installOrgDOM parent, orgNode, orgText, target
    if target && this != root.orgApi then root.orgApi.newNode target
    node
  bindings: defaultBindings
  leisureButton: swapMarkup
  emptySlide: (id)-> "<span id='#{id}'></span>"
  insertEmptySlide: (id, prev)->
    slide = $(@emptySlide id)
    if prev then $("##{prev}").after slide
    else $('[maindoc]').prepend slide
    slide[0]
  inMode: -> true
  updateBlock: ->

findOrIs = (set, selector)-> if set.is selector then set else set.find selector

domCursorForRange = (r)->
  n = domCursor r.startContainer, r.startOffset
    .mutable()
    .filterVisibleTextNodes()
    .filterRange r
    .firstText()
  if n.pos < n.node.length then n else n.next()

domCursorForCaret = ->
  sel = getSelection()
  parent = parentForNode sel.focusNode
  n = domCursor sel.focusNode, sel.focusOffset
    .mutable()
    .filterVisibleTextNodes()
    .filterParent parent
    .firstText()
  if n.pos < n.node.length then n else n.next()

domCursorForSelectedText = ->
  sel = getSelection()
  if sel.type != 'Range' then emptyDOMCursor
  else
    r = sel.getRangeAt 0
    n = domCursor r.startContainer, r.startOffset
      .mutable()
      .filterTextNodes()
      .filterRange r
      .firstText()
    if n.pos < n.node.length then n else n.next()

root.findOrIs = findOrIs
root.parentForNode = parentForNode
root.parentForBlockId = parentForBlockId
root.parentForDocId = parentForDocId
root.basicOrg = basicOrg
root.plainOrg = basicOrg
root.orgNotebook = orgNotebook
root.markupOrg = markupOrg
root.bindContent = bindContent
root.reparse = reparse
root.reparseListeners = reparseListeners
root.findDomPosition = findDomPosition
root.getCollapsible = getCollapsible
root.parseOrgMode = parseOrgMode
root.orgAttrs = orgAttrs
root.content = content
root.contentSpan = contentSpan
root.checkStart = checkStart
root.checkEnterReparse = checkEnterReparse
root.checkExtraNewline = checkExtraNewline
root.followingSpan = followingSpan
root.currentLine = currentLine
root.checkSourceMod = checkSourceMod
root.getTextPosition = getTextPosition
root.nextOrgId = nextOrgId
root.modifyingKey = modifyingKey
root.handleKeyup = handleKeyup
root.backspace = backspace
root.del = del
root.getOrgParent = getOrgParent
root.getOrgType = getOrgType
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
root.adjustSelection = adjustSelection
root.findKeyBinding = findKeyBinding
root.setCurKeyBinding = setCurKeyBinding
root.installEnvLang = installEnvLang
root.textEnv = textEnv
root.escapeAttr = escapeAttr
root.restorePosition = restorePosition
root.savePosition = savePosition
root.overrideSavedPosition = overrideSavedPosition
root.saveSelection = saveSelection
root.splitLines = splitLines
root.orgSrcAttrs = orgSrcAttrs
root.getNodeLang = getNodeLang
root.getNodeSource = getNodeSource
root.loadOrg = loadOrg
root.resultsType = resultsType
root.isDynamic = isDynamic
root.isDef = isDef
root.nativeRange = nativeRange
root.textNodeBefore = textNodeBefore
root.textNodeAfter = textNodeAfter
root.visibleTextNodeAfter = visibleTextNodeAfter
root.PAGEUP = PAGEUP
root.PAGEDOWN = PAGEDOWN
root.saveFile = saveFile
root.nodeBefore = nodeBefore
root.getOrgText = getOrgText
root.nonOrg = nonOrg
root.blockText = blockText
root.blockElementsForSelection = blockElementsForSelection
root.blockElementForNode = blockElementForNode
root.blockIdsForSelection = blockIdsForSelection
root.orgForNode = orgForNode
root.toggleShowHidden = toggleShowHidden
root.applyLeisureTooltips = applyLeisureTooltips
root.applyShowHidden = applyShowHidden
root.actualSelectionUpdate = actualSelectionUpdate
root.currentBlockIds = []
root.toggleLeisureBar = toggleLeisureBar
root.errorDiv = errorDiv
root.domCursorForRange = domCursorForRange
root.domCursorForCaret = domCursorForCaret
root.domCursorForSelectedText = domCursorForSelectedText
root.editFile = editFile
root.domCursor = domCursor

# evil mod of Templating
Templating.nonOrg = nonOrg
