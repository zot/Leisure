{
  resolve,
  lazy,
  defaultEnv,
} = root = module.exports = require '15-base'
rz = resolve
lz = lazy
{
  TAB,
  ENTER,
  BS,
  DEL,
} = require '21-browserSupport'
{
  getType,
  define,
  makeSyncMonad,
} = require '16-ast'
{
  runMonad,
  isMonad,
  escapePresentationHtml,
  unescapePresentationHtml,
} = require '17-runtime'
{
  parseOrgMode,
  Headline,
  headlineRE,
  HL_TAGS,
  Fragment,
  Meat,
  Keyword,
  keywordRE,
  KW_BOILERPLATE,
  KW_NAME,
  KW_INFO,
  Source,
  srcStartRE,
  HTML,
  Results,
  AttrHtml,
  resultsRE,
  ListItem,
  SimpleMarkup,
  Link,
  Drawer,
  drawerRE,
  parseTags,
  matchLine,
} = require '11-org'
yaml = root.yaml
{
  getCodeItems,
  isCodeBlock,
  isYaml,
  lineCodeBlockType,
} = require '12-docOrg'
{
  isCollapsed,
  selectRange,
} = window.DOMCursor
{
  handleDelete,
  handleInsert,
  domCursorForCaret,
  textPositionForDomCursor,
  updateSelection,
  queueKeyCommand,
  SelectionDescriptor,
  checkLast,
  changeSavedSelectionOffset,
  currentSelectionDescriptor,
  parentForNode,
  savePosition,
  findOrIs,
  orgNotebook,
  parseOrgMode,
  orgAttrs,
  content,
  contentSpan,
  checkStart,
  checkEnterReparse,
  checkExtraNewline,
  followingSpan,
  currentLine,
  checkSourceMod,
  nextOrgId,
  modifyingKey,
  handleKeyup,
  backspace,
  getOrgParent,
  getOrgType,
  executeDef,
  swapMarkup,
  modifiers,
  keyFuncs,
  defaultBindings,
  addKeyPress,
  adjustSelection,
  findKeyBinding,
  setCurKeyBinding,
  installEnvLang,
  propsFor,
  escapeAttr,
  splitLines,
  orgSrcAttrs,
  baseEnv,
  getNodeLang,
  getNodeSource,
  resultsType,
  isDef,
  getTextPosition,
  findDomPosition,
  nativeRange,
  nodeBefore,
  textNodeAfter,
  textNodeBefore,
  visibleTextNodeAfter,
  getOrgText,
  nonOrg,
  errorDiv,
  blockIdsForSelection,
  PAGEUP,
  PAGEDOWN,
  HOME,
  END,
  markupData,
  orgForNode,
  plainOrg,
  blockElementForNode,
  executeSource,
} = require '24-orgSupport'
{
  redrawAllIssues,
  createComment,
} = require '26-storage'
{
  dataTypeIds,
  edited,
  pretty,
  setData,
  getBlock,
  getBlockNamed,
  getDataNamed,
  setDataNamed,
  addChangeContextWhile,
  getSourceAttribute,
  setSourceAttribute,
  codeString,
  controllerDescriptorIds,
  codeContexts,
  indexedCursor,
  getRenderCount,
  incRenderCount,
  viewTypeData,
  viewIdTypes,
} = require '23-collaborate'
{
  createTemplateRenderer,
  escapeHtml,
  getDeepestActiveElement,
  setShadowHtml,
  clearView,
  viewMarkup,
  appendAndActivate,
  viewRoots,
} = Templating # require '27-templating'
_ = require 'lodash.min'

fancyOrg = null
slideMode = false
lastOrgOffset = -1
curPos = -1
emptyPresenter =
  hide: ->
  isRelated: -> false
presenter = emptyPresenter
DOCUMENT_POSITION_CONTAINED_BY = 16
keyupSelectionDescriptor = null

class FancySelectionDescriptor
  constructor: (parent)->
    sel = getSelection()
    el = getDeepestActiveElement()
    @parent = $(parent)[0] ? (slideParent sel.focusNode)
    @focusNode = sel.focusNode
    if inputNum = el?.getAttribute "data-input-number"
      @linkParent = $(el).closest("[data-view-link]").attr("data-view-id")
      @inputNum = inputNum
      @inputSel = [el.selectionStart, el.selectionEnd]
    @x = window.scrollX
    @y = window.scrollY
    if sel.type != 'None'
      startNode = sel.getRangeAt(0).startContainer
      [start, end, offset, note] = getDocRange()
      @toString = -> "Selection(doc: #{start}, #{end})"
      @restore = (delta, doc)->
        if @linkParent && (input = $("[data-view-id='#{@linkParent}']").find("[data-input-number='#{@inputNum}']")).length > 0
          input[0].focus()
          [input[0].selectionStart, input[0].selectionEnd] = @inputSel
        else
          sel = getSelection()
          if (sel.type != 'None' && sel.getRangeAt(0))?.startContainer != startNode
            restoreDocRange doc, [start + delta, end + delta, offset, note]
        window.scrollTo @x, @y
      #[id, start, end, left, top] = pos = getSlidePosition sel.focusNode
      #if id
      #  @toString = -> "Selection(doc: #{id}, start: #{start}, end: #{end}, left: #{left}, top: #{top})"
      #  @restore = -> setSlidePosition pos
    #console.log "NEW SELECTION: #{this}"
  restore: ->
  toString: -> "Selection(none)"

isParentSelectionOf = (parent, child)-> parent?.parent?.contains child.parent

restoreStack = []

fancySaveSelection = root.saveSelection

root.restorePosition = restorePosition = (parent, block)->
  savePosition fancySaveSelection, block

getSlidePosition = (node)->
  if block = blockElementForNode node
    {top, left} = block.getBoundingClientRect()
    r = getSelection().getRangeAt 0
    start = getTextPosition block, r.startContainer, r.startOffset
    end = getTextPosition block, r.endContainer, r.endOffset
    [block.id, start, end, left, top]
  else []

setSlidePosition = ([id, start, end, left, top])->
  block = $("##{id}")[0]
  {curTop, curLeft} = block.getBoundingClientRect()
  window.scrollBy curLeft - left, curTop - top
  r1 = findDomPosition block, start, true
  r2 = findDomPosition block, end, true
  s = getSelection()
  r = document.createRange()
  r.startContainer = r1[0]
  r.startOffset = r1[1]
  r.endContainer = r2[0]
  r.endOffset = r2[1]
  selectRange r

# get a logical document range with an optional note
# [startPos, endPos, scrollOffset, noteId]
# if note is null, the positions are in the main doc
# otherwise, note is the id of a note
#
# Assumes the document has only two levels -- the main doc and notes
getDocRange = ->
  s = getSelection()
  r = s.getRangeAt 0
  offset = getDocumentOffset r
  if s.rangeCount == 1 && r.collapsed && r.startContainer.nodeType == 1 && shadow = r.startContainer.children[r.startOffset]?.shadowRoot
    s = shadow.getSelection()
    note = $(s.focusNode).closest('[data-note-origin]')?[0]
    if note then [getTextPosition(note, s.anchorNode, s.anchorOffset), getTextPosition(note, s.extentNode, s.extentOffset), window.pageYOffset - offset, note.id]
    else [null, null, null]
  else
    doc = topNode s.focusNode
    [getTextPosition(doc, r.startContainer, r.startOffset), getTextPosition(doc, r.endContainer, r.endOffset), window.pageYOffset - offset]

restoreDocRange = (parent, [start, end, offset, noteId])->
  if noteId
    noteNode = $("[data-org-note-instances~='#{noteId}']")[0]
    parent = $(noteNode).shadow().find("##{noteId}")[0]
  [startContainer, startOffset] = findDomPosition parent, start, true
  [endContainer, endOffset] = findDomPosition parent, Math.min(end, getOrgText(parent).length - 1), true
  r = document.createRange()
  r.setStart startContainer, startOffset
  r.setEnd endContainer, endOffset
  if noteId
    offR = document.createRange()
    offR.selectNode noteNode
    window.scrollTo window.pageXOffset, offset + getDocumentOffset(offR)
    s = noteNode.shadowRoot.getSelection()
  else
    window.scrollTo window.pageXOffset, offset + getDocumentOffset(r)
    s = getSelection()
  selectRange r

getDocumentOffset = (r)->
  parent = parentForNode r.startContainer
  c = (if r.startOffset == 0 then (textNodeBefore parent, r.startContainer) ? r.startContainer else r.startContainer)
  while isCollapsed c
    c = textNodeBefore parent, c
  documentTop c

rootNode = (node)->
  while node.parentNode
    node = node.parentNode
  node

topNode = (node)->
  top = node
  while node
    if node.hasAttribute? 'data-org-headline' then top = node
    node = node.parentNode
  return top

replaceUnrelatedPresenter = (target, newPres)->
  if result = !presenter || !presenter.isRelated target
    replacePresenter newPres
  result

replaceRelatedPresenter = (target, newPres)->
  if result = (presenter && presenter.isRelated target)
    replacePresenter newPres
  result

replacePresenter = (pres)->
  presenter?.hide()
  presenter = pres || emptyPresenter

markupOrg = (text)->
  [node, result] = markupOrgWithNode text
  result

markupOrgWithNode = (text, note, replace)->
  nodes = {}
  if typeof text == 'string'
    # ensure trailing newline -- contenteditable doesn't like it, otherwise
    if text[text.length - 1] != '\n' then text = text + '\n'
    org = parseOrgMode text
  if text instanceof Org.Node then org = text
  if org
    [org, markupNewNode org, null, null, note, replace]
  else
    console.log "Attempt to display uknown object type: ", text
    throw new Error "Attempt to display unknown type of object: #{text}"

markupNewNode = (org, middleOfLine, delay, note, replace)->
  lastOrgOffset = -1
  markupNode org, middleOfLine, delay, note, replace

getCodeAttribute = (node, attr)->
  if (top = $(node).closest('[data-shared]'))[0]
    getSourceAttribute top.find('[data-source-lead]').text(), attr

setCodeAttributes = (node, attrs...)->
  if (top = $(node).closest('[data-shared]'))[0]
    lead = top.find('[data-source-lead]')
    oldTxt = txt = lead.text()
    for [k, v] in L(attrs).chunk(2).toArray()
      txt = setSourceAttribute txt, k, v
    if txt != oldTxt
      lead.text escapeHtml txt
      edited top[0], true

clearCodeAttributes = (node, attrs...)->
  if (top = $(node).closest('[data-shared]'))[0]
    lead = top.find('[data-source-lead]')
    oldTxt = txt = lead.text()
    for attr in attrs
      txt = setSourceAttribute txt, attr
    if txt != oldTxt
      lead.text escapeHtml txt
      edited top[0], true

markupNode = (org, middleOfLine, delay, note, replace, inFragment)->
  if org.offset <= lastOrgOffset then ''
  else if org instanceof Results
    pos = org.contentPos
    text = org.text.substring pos
    "<span #{orgAttrs org}><span data-org-type='text'>#{escapeHtml org.text.substring(0, pos)}</span>#{contentSpan text}"
  else if org instanceof Fragment then markupFragment org, delay, note
  else if org instanceof HTML then markupHtml org
  else if org instanceof AttrHtml then markupAttr org
  else if org instanceof Keyword
    if org.name.match /^name$/i
      intertext = ''
      name = org
      src = org.next
      while src instanceof Meat && !(src instanceof Source)
        intertext += src.text
        src = src.next
      if src instanceof Source then markupSource src, name, intertext, delay, inFragment
      else defaultMarkup org
    else if org instanceof Source then markupSource org, null, null, delay, inFragment
    else defaultMarkup org
  else if org instanceof Headline then markupHeadline org, delay, note, replace
  else if org instanceof Drawer && org.name.toLowerCase() == 'properties' then markupProperties org, delay
  else if org instanceof Drawer && org.name.toLowerCase() == 'data' then markupData org
  else if org instanceof ListItem then markupListItem org, delay
  else if org instanceof SimpleMarkup then markupSimple org
  else if org instanceof Link then markupLink org
  else if content(org.text).length then defaultMarkup org
  else
    tag = (if middleOfLine then 'span' else 'div')
    "<#{tag} #{orgAttrs org}>#{meatText org.text}</#{tag}>"

meatText = (meat)->
  paras = escapeHtml(meat).split /\n\n/
  last = paras.pop()
  result = _(paras).map((i)-> "<span class='meat-text#{checkBlankMeat i}'>#{i}\n</span>").join "<span class='meat-break'>\n</span>"
  if result then result += "<span class='meat-break'>\n</span>"
  if last
    if last[last.length - 1] == '\n'
      end = '\n'
      last = last.substring 0, last.length - 1
    if last then result += "<span class='meat-text#{checkBlankMeat last}'>#{last}</span>"
    if end then result += "<span class='hidden'>\n</span><span data-nonorg contenteditable='false'>\n</span>"
  result

checkBlankMeat = (hunk)-> if hunk in ['', '\n'] then " blank" else ""

isLeisure = (org)-> org instanceof Source && org.getLanguage().toLowerCase() == 'leisure'

isExecutable = (org)->
  org instanceof Source && (org.getLanguage() in ['javascript', 'leisure'])

markupFragment = (org, delay, note)->
  {first, name, source, last} = getCodeItems org.children[0]
  if source
    if first == name then first = first.next
    if first in [org.children[0], org.children[1]] && !last.next
      prelude = ''
      while first != source
        prelude += first.allText()
        first = first.next
      return "<span #{orgAttrs org}#{blockForLeisure source}>#{markupSource source, name, prelude, delay, true}</span>"
  "<span #{orgAttrs org}>#{(markupNode child, false, delay, note, false, true for child in org.children).join ''}</span>"

blockForLeisure = (source)->
  if source.getLanguage() == 'leisure' then " class='inline'" else ''

markupProperties = (org, delay)->"<span data-note-location class='hidden'>#{escapeHtml org.text}</span>"

lastAttr = null

markupAttr = (org)->
  lastAttr = org
  "<span class='hidden'>#{org.text}</span>"

markupLink = (org)->
  if leisureMatch = org.isLeisure()
    viewName = if leisureMatch[2] then " data-view-name='#{leisureMatch[2]}'" else ''
    "<span data-view-link='#{leisureMatch[1]}'#{viewName}><span class='hidden'>#{org.allText()}</span></span>"
  else if org.isImage()
    title = (if desc = org.descriptionText() then " title='#{escapeAttr desc}'" else "")
    "<span><img src='#{escapeAttr org.path}'#{title}><span class='hidden'>#{escapeHtml org.allText()}</span></span>"
  else
    guts = ''
    for c in org.children
      guts += markupNode c, true
    if !guts then "<span class='hidden'>[[</span><a onclick='Leisure.followLink(event)' href='#{org.path}'>#{org.path}</a><span class='hidden'>]]</span>"
    else "<span class='hidden'>[[#{org.path}][</span><a onclick='Leisure.followLink(event)' href='#{org.path}'>#{guts}</a><span class='hidden'>]]</span>"

root.followLink = (e)->
  t = e.target
  while t && t.nodeName != 'A'
    t = t.parentNode
  if t then window.open t.href, "links"

markupSimple = (org)->
  guts = ''
  for c in org.children
    guts += markupNode c, true
  text = switch org.markupType
    when 'bold' then "<b>#{guts}</b>"
    when 'italic' then "<i>#{guts}</i>"
    when 'underline' then "<span style='text-decoration: underline'>#{guts}</span>"
    when 'strikethrough' then "<span style='text-decoration: line-through'>#{guts}</span>"
    when 'code' then "<code>#{guts}</code>"
    when 'verbatim' then "<code>#{guts}</code>"
  "<span class='hidden'>#{org.text[0]}</span>#{text}<span class='hidden'>#{org.text[0]}</span>"

hlStars = /^\*+ */

markupHeadline = (org, delay, note, replace)->
  match = org.text.match headlineRE
  start = "#{org.text.substring 0, org.text.length - (match?[HL_TAGS] ? '').length}".trim()
  if org.text[org.text.length - 1] == '\n'
    tags = escapeHtml org.text.substring start.length, org.text.length - 1
  else
    tags = escapeHtml org.text.substring start.length - 1
  if starsM = start.match hlStars
    stars = start.substring 0, starsM[0].length
    start = start.substring stars.length
  else stars = ''
  properties = []
  for k, v of org.properties
    properties.push "#{k} = #{v}"
  properties = if properties.length then "<span class='headline-properties' title='#{escapeAttr properties.join '<br>'}' data-nonorg='true'><i class='fa fa-wrench'></i></span>" else ''
  optImport = if org.properties.import
    imp = new URI("x://h/#{root.currentDocument.leisure.name}", org.properties.import).path.substring 1
    "<div class='import' data-nonorg='true' contenteditable='false'><span><a href='#load=/#{imp}' target='_blank'>#{org.properties.import}</a></span></div>"
  else ''
  editMode = if org.level == 1 then " data-edit-mode='fancy'" else ""
  if org.level == 1 && !note && !org.properties?.note
    if org.text.trim() != ''
      "#{startNewSlide replace}<div #{orgAttrs org}#{editMode} data-org-headline-text='#{escapeAttr start}'#{noteAttrs org}><span class='maincontent'><span class='hidden'>#{stars}</span><span data-org-type='text'><div data-org-type='headline-content'><div class='textborder' contenteditable='false'></div><div class='headline-content'>#{escapeHtml start}<span class='tags'>#{properties}#{tags}</span></div></div><span class='meat-break'>\n</span></span>#{optImport}#{markupGuts org, checkStart start, org.text}</span></div>"
    else "#{startNewSlide()}<div #{orgAttrs org}#{editMode}><span data-org-type='text'><span data-org-type='headline-content'><span class='hidden'>#{org.text}</span></span></span>#{optImport}#{markupGuts org, checkStart start, org.text}</div>"
  else
    slide = if org.text.trim() != ''
      "<div #{orgAttrs org}#{editMode} data-org-headline-text='#{escapeAttr start}'#{noteAttrs org}><span class='hidden'>#{stars}</span><span data-org-type='text'><div data-org-type='headline-content'><div class='headline-content'>#{escapeHtml start}</div><span class='tags'>#{properties}#{tags}</span>\n</div></span>#{markupGuts org, checkStart start, org.text}</div>"
    else "<div #{orgAttrs org}#{editMode}><span data-org-type='text'><span data-org-type='headline-content'><span class='hidden'>#{org.text}</span></span></span>#{markupGuts org, checkStart start, org.text}</div>"
    floatize org, slide
    #slide

#noteAttrs = (org)->
#  if org.properties?.notes then "data-org-notes='#{org.properties.notes}'"
#  else ''

nextNoteId = 0

noteAttrs = (org)->
  if org.level != 1 then ''
  else if org.properties?.note == 'sidebar' then " data-org-note='sidebar' data-org-noteid='#{nextNoteId++}'"
  else if org.properties?.note?.match /^float / then " data-org-note='float' data-org-noteid='#{nextNoteId++}' data-org-floatval='#{org.properties.note}'"
  else " data-org-note='main'"

floatize = (org, slide)->
  if org.properties?.note?.match /^float /
    "<div data-draggable data-float-holder='#{nextNoteId - 1}'><div data-resizable style='width: 600px; height: 600px; background: lightgray;'><h2 class='note_drag_handle' contenteditable='false'>YOUR NOTE</h2><div contenteditable='true'>#{slide}</div></div></div>"
  else slide

updateNoteProperties = (span, index, txt) ->
  old = getOrgText span
  lines = old.split /\n/
  s = lines[1].split /\s*,\s*/
  if index != 0 then s[index] = txt else s[index] = ":notes: " + txt
  lines[1] = s.join ', '
  span.textContent = lines.join '\n'

saveNoteLocation = (target) ->
  drag = target.closest("[data-draggable]")
  resize = $(drag.children()[0])
  orig_id = drag.attr 'data-note-origin'
  orig = $("#" + orig_id)
  span = orig.find("[data-note-location]")[0]
  if span
    index = drag.attr 'data-note-index'
    #console.log "span: " + span + " => " + index
    updateNoteProperties span, index, "float #{drag.css('top')} #{drag.css('left')} #{resize.width()}px #{resize.height()}px"

createNotes = (node)->
  $(node).addClass 'herpderp'
  for noteSpec in node.getAttribute('data-org-notes').split /\s*,\s*/
    #console.log "NOTE FOR #{node.id}: #{noteSpec}"
    noteId = "note-#{nextNoteId++}"
    [org, html] = markupOrgWithNode getOrgText(node), true
    newNote = $("<div class='sidebar_notes' data-note-origin='#{node.id}' id='#{noteId}' contenteditable='true'>#{html}</div>")[0]
    switch (splitSpec = noteSpec.split(/\s+/))[0]
      when 'sidebar'
        if dest = $("[data-org-headline-text='#{splitSpec[1]}'] div.sidebar")[0]
          if !dest.shadowRoot then setShadowHtml dest, "<div contenteditable='true'></div>"
          $(dest).shadow().append newNote
      when 'float'
        parent = topNode node
        dest = $(document.body).find('[data-org-floats]')[0]
        if !dest then $(document.body).prepend dest = $("<div data-org-floats='true' contenteditable='true'></div>")[0]
        inside = $('<div data-resizable style="width: 600px; height: 600px; background: black;"><h2 class="note_drag_handle" contenteditable="false">YOUR NOTE</h2><div></div></div>')
        holder = $("<div data-draggable data-note-origin='#{node.id}' data-note-index='#{nextNoteId - 1}'></div>")
        #console.log node
        holder.append inside
        dest.appendChild holder[0]
        holder.draggable({handle: 'h2'})
        inside.resizable()
        holder.bind 'dragstop', (event) ->
          saveNoteLocation $(event.target)
        inside.bind 'resizestop', ->
          saveNoteLocation $(event.target)
        child = inside[0].children[1]
        setShadowHtml child, "<div contenteditable='true' class='float_note'></div>"
        $(child).shadow().append newNote
        dest = child
        orig = $("#" + node.id)[0]
        [skip, top, left, width, height] = noteSpec.split /\s+/
        holder.css({top: top, left: left})
        inside.css({width: width, height: height})
        saveNoteLocation holder
      else continue
    if dest
      addWord dest, 'data-org-note-content', node.id
      addWord dest, 'data-org-note-instances', noteId
      fixupHtml newNote

addWord = (node, attr, value)->
  vals = (node.getAttribute(attr) ? '').split ' '
  vals = vals.filter (el) ->
    el.length != 0
  if !(value in vals) then vals.push value
  node.setAttribute attr, vals.join ' '

editing = false

editedNote = (mainId, editedId)-> ->
  if !editing
    setTimeout (->
      restorePosition $("##{editedId}")[0], ->
        targets = $("##{mainId}")
        main = targets[0]
        for node in $("[data-org-note-content~='#{mainId}']")
          targets = targets.add($(node).shadow().find "[data-note-origin='#{mainId}']")
        origin = targets.filter "##{editedId}"
        editing = true
        try
          t = targets.not("##{editedId}")
          t.html origin.html()
          for node in t
            fixupHtml node, node != main
        finally
          setTimeout (-> editing = false), 1), 1

markupHtml = (org)->
  if v = org.attributes()?.view
    pre = org.text.substring 0, org.contentPos
    post = org.text.substring org.contentPos + org.contentLength
    "<span #{orgAttrs org} data-html-view='#{v}'><span data-org-html='true'></span><span class='hidden'>#{escapeHtml pre}</span><span class='hidden' data-content>#{escapeHtml org.content()}</span><span class='hidden'>#{escapeHtml post}</span></span>"
  else
    "<span #{orgAttrs org}><span contenteditable='false' data-nonorg='true' data-org-html='true'>#{$('<div>' + org.content() + '</div>').html()}</span><span class='hidden'>#{escapeHtml org.text}</span></span>"

chooseSourceMarkup = (org)->
  if isYaml org then markupYaml
  else if isExecutable org then markupLeisure
  #else if org.lead()?.trim().toLowerCase() == 'html' then (org)-> defaultMarkup org, 'div', 'class', 'default-lang', 'data-lang', org.lead()?.trim()
  else if org.info.match /^ *css\b/i then markupCSS
  else markupCode

markupSource = (org, name, doctext, delay, inFragment)->
  (chooseSourceMarkup org) org, name, doctext, delay, inFragment

findLinks = (name)->
  if m = name.match /^([^/]*)\/(.*)$/ then $("[data-view-link='#{m[1]}'][data-view-name='#{m[2]}']") else $("[data-view-link='#{name}']")

findViews = (name)-> findLinks(name)

getSourceSegments = (name, org)->
  {first, name, source, results, expected, last} = getCodeItems(name || org)
  pos = source.contentPos
  pre = ''
  while first != source
    pre += first.allText()
    first = first.next
  pre += source.text.substring 0, pos
  post = ''
  cur = source.next
  while cur != last.next
    post += cur.allText()
    cur = cur.next
  post = source.text.substring(pos + source.content.length) + post
  [pre, source.content, post]

markupYaml = (org, name, doctext, delay, inFragment)->
  [pre, src, post] = getSourceSegments name, org
  {name, source, results, expected, last} = getCodeItems(name || org)
  lastOrgOffset = last.offset
  shared = (if org.shared then org else org.fragment)
  yamlAttr = "data-lang='yaml'"
  if shared
    data = getBlock shared.nodeId
    type = data.yaml?.type
    if type
      err = if !viewMarkup[type] then errorDiv "No value view type for data nodeId: #{shared.nodeId}" else ''
      yamlAttr += " data-yaml-type='#{type}'"
  err = ''
  if name
    n = escapeAttr name.info.trim()
    yamlAttr += " data-org-codeblock='#{n}' data-yaml-name='#{n}'"
  "<div #{orgAttrs source}#{yamlAttr}>#{err}<span class='Xhidden codeHeading'>#{escapeHtml pre}</span><span data-org-src data-contain>#{Highlighting.highlight 'yaml',  source.content}</span><span class='Xhidden codeHeading'>#{escapeHtml post}</span></div>"

markupCode = (org, name, doctext, delay, inFragment)->
  [pre, src, post] = getSourceSegments name, org
  {name, source, results, expected, last} = getCodeItems(name || org)
  lastOrgOffset = last.offset
  lang = org.getLanguage() || ''
  if name
    n = escapeAttr name.info.trim()
    addAttr = " data-org-codeblock='#{n}'"
  else addAttr = ''
  if (l = source.getLanguage()) #&& !inFragment
    addAttr += " data-lang='#{l}' id='#{org.nodeId}'"
  "<div class='default-lang' data-#{orgAttrs source}#{addAttr}><span class='Xhidden codeHeading'>#{escapeHtml pre}</span><span data-org-src data-contain>#{Highlighting.highlight lang,  source.content}</span><span class='Xhidden codeHeading'>#{escapeHtml post}</span></div>"

markupCSS = (org, name, doctext, delay, inFragment)->
  [pre, src, post] = getSourceSegments name, org
  {name, source, results, expected, last} = getCodeItems(name || org)
  lastOrgOffset = last.offset
  lang = org.getLanguage() || ''
  if name
    n = escapeAttr name.info.trim()
    addAttr = " data-org-codeblock='#{n}'"
    styleName = " name='#{escapeAttr n}'"
  else
    addAttr = ''
    styleName = ''
  if (l = source.getLanguage()) #&& !inFragment
    addAttr += " data-lang='#{l}' id='#{org.nodeId}'"
  cssBlock = nonOrg("<style name='css'#{styleName}>#{src}</style>")[0].outerHTML
  "<div class='default-lang' data-#{orgAttrs source}#{addAttr}><span class='Xhidden codeHeading'>#{escapeHtml pre}</span><span data-org-src data-contain>#{Highlighting.highlight lang,  source.content}</span><span class='Xhidden codeHeading'>#{escapeHtml post}</span>#{cssBlock}</div>"

dragging = false

butLast = (str)-> str.substring 0, str.length - 1

markupLeisure = (org, name, doctext, delay, inFragment)->
  attr = org.attributes()
  lang = org.getLanguage() || ''
  lastOrgOffset = org.offset
  startHtml = "<div class='codeblock' contenteditable='false' data-lang='#{lang}' #{orgAttrs org}"
  parts = parseSrcBlock org
  if name then startHtml += " data-org-codeblock='#{escapeAttr name.info.trim()}'"
  if view = attr?.view
    return "#{startHtml} data-code-view='#{escapeAttr view.trim()}'>#{simpleLeisure org, doctext, attr, parts}</div>"
  startHtml += "><div class='codeborder'></div>"
  {lead, srcContent, trail, resText, intertext, resOrg} = parts
  if name
    codeName = "<div class='codename' contenteditable='true'><span class='hidden'>#{nameBoilerplate name}</span><div class='name'>#{escapeHtml butLast name.info}</div><span class='meat-break'>\n</span>#{meatText doctext}</div>"
  else codeName = "<div class='codename' contenteditable='true'></div>"
  wrapper = "<table class='codewrapper'><tr><td class='code-buttons'>"
  if testCaseButton = toTestCaseButton org
    wrapper += "<div>#{testCaseButton}</div>"
    wrapper += "<div><button class='results-indicator' onclick='Leisure.executeCode(event)'><i class='fa fa-gear'></i><div></div></button></div>"
    wrapper += "<div><button class='dyntoggle-button' onclick='Leisure.toggleDynamic(event)'><span class='dyntoggle'><i class='fa fa-link'></i><i class='fa fa-unlink'></i></span></button></div>"
  if name then wrapper += "<div>#{commentButton name.info.trim()}</div>"
  wrapper += "</td><td class='code-content'>"
  wrapper += codeName
  wrapper += "<div class='hidden' data-source-lead>#{escapeHtml lead}</div>"
  wrapper += "<div #{orgSrcAttrs org} data-contain contenteditable='true'>#{escapeHtml srcContent}</div><span class='hidden' data-org-type='boundary'>#{escapeHtml trail}</span>"
  wrapper += "<span class='hidden'>#{intertext}</span>" + htmlForResults resText, resOrg
  wrapper += "</td></tr></table>"
  top = name ? org
  fluff = if top.prev instanceof Source || top.prev instanceof Results then "<div class='fluff' data-newline></div>" else ''
  result = startHtml + wrapper + (if name then "</div>#{commentBlock name.info.trim()}" else "</div>")
  inner = fluff + result
  if view then inner += "</span>"
  "<div></div>" + (if inFragment then inner
  else '<div>' + inner + '</div>') + "<div></div>"

nameBoilerplate = (name)->
  if nameM = name.text.match keywordRE then escapeHtml nameM[KW_BOILERPLATE]

parseSrcBlock = (org, name)->
  result =
    intertext: ''
    lead: org.text.substring 0, org.contentPos
    trail: org.text.substring org.contentPos + org.content.length
    srcContent: org.content
  if name
    result.nameBoilerplate = nameBoilerplate name
    result.name = name.info
  node = org.next
  intertext = ''
  while node
    if node instanceof Results
      lastOrgOffset = node.offset
      result.resBoilerplate = node.text.substring 0, node.contentPos
      result.resText = node.text.substring node.contentPos
      result.resOrg = node
      result.intertext = intertext
      break
    else if node instanceof Drawer
      if node.name.toLowerCase() == 'expected'
        lastOrgOffset = node.offset
        result.intertext = intertext + escapeHtml node.text
      else break
    else if node instanceof Headline || node instanceof Keyword
      break
    else intertext += escapeHtml node.text
    node = node.next
  result

editable = 'contenteditable="true"'

simpleLeisure = (org, doctext, attr, parts)->
  html = sourceSpan 'name-boilerplate', parts.nameBoilerplate
  html += sourceSpan 'name', parts.name
  html += sourceSpan 'doctext', doctext, meatText
  html += sourceSpan 'lead', parts.lead
  html += "<div #{orgSrcAttrs org} data-contain data-source-content>#{escapeHtml parts.srcContent}</div>"
  html += sourceSpan 'trail', parts.trail
  html += sourceSpan 'intertext', parts.intertext
  if parts.resText? then html += htmlForViewResults parts.resText, parts.resBoilerplate
  html

sourceSpan = (type, content, process, attrs)->
  if content
    "<span#{if attrs then ' ' + attrs else ''} data-source-#{type}>#{(process ? escapeHtml) content}</span>"
  else ''

updateChannels = (org)-> org instanceof Source && (org.info.match /:update *([^:]*)/)?[1]

testResult = (expected, actual)->
  if actual == '' then 'unknown'
  else if expected == actual then 'pass'
  else 'fail'

root.toggleTestCase = (evt)->
  node = codeBlockForNode evt.target
  selectPrevious node
  if node then replaceCodeBlock node, changeResultType getOrgText(node), (if node.getAttribute('data-org-results') == 'autotest' then 'dynamic' else 'static')

selectPrevious = (node)->
  top = topNode node
  pos = getTextPosition top, node, 0
  r = nativeRange findDomPosition top, Math.max 0, pos - 1
  selectRange r

replaceCodeBlock = (node, text)->
  newNode = null
  restorePosition null, ->
    org = parseOrgMode text, 0, true
    org.nodeId = $(node)[0].id
    org.shared = 'code'
    newNode = $(markupNewNode org, false, true)[0]
    $(node).replaceWith(newNode)
    edited newNode
    fixupHtml blockElementForNode newNode
    setTimeout (=>
      nn = $(newNode)
      (if nn.is('.codeblock') then nn else nn.find('.codeblock')).addClass 'ready'
      for n in $(newNode).find('[data-org-comments]')
        setShadowHtml n.firstElementChild, "<div class='#{theme ? ''}'>" + newCommentBox n.getAttribute('data-org-comments') + '</div>', codeBlockForNode(n.previousElementSibling).id
      redrawAllIssues()), 1
  newNode

markupListItem = (org, delay)->
  if org.level == 0
    start = !org.getPreviousListItem()
    end = !org.getNextListItem()
  else
    start = (parent = org.getParent()) && parent == org.getPreviousListItem()
    next = org.getNextListItem()
    end = !next || next.level < org.level
  """#{if start then '<ul>' else ''}<li #{orgAttrs org} data-org-listlevel='#{
    org.level
  }'#{
    if org.checked? then ' data-org-checked="' + org.checked + '"' else ''
  }><span class='hidden'>#{
    escapeHtml org.text.substring 0, org.contentOffset
  }</span><span>#{markupListContents org.children}</span></li>#{
    eatListItem org
  }#{if end then '</ul>' else ''}"""

markupListContents = (children)-> (markupNode child, true for child in children).join ''

eatListItem = (org)->
  if org.next instanceof Meat && org.next.text[0] == '\n' then ''
  else
    item = org
    result = ''
    while ((org = org.next) instanceof Meat) && !(org instanceof ListItem)
      result += markupNode org
      lastOrgOffset = Math.max(lastOrgOffset, org.offset)
    result

unwrap = (node)->
  parent = node.parentNode
  if parent
    while node.firstChild?
      parent.insertBefore node.firstChild, node
    parent.removeChild node

createValueSliders = (node, slideFunc)->
  if !(top = $(node).closest('[data-org-src]')[0]) then return
  $(node).find('.org-num').children().unwrap()
  node.normalize()
  createNextValueSliders node, slideFunc, node

chunkSize = 30
chunkDelay = 1000

createNextValueSliders = (node, slideFunc, cur)->
  if (cur = visibleTextNodeAfter parentForNode(cur), cur) && node?.contains cur
    createNextValueSlider node, slideFunc, cur

numPat = /[0-9][0-9.]*|\.[0-9.]+/

createNextValueSlider = (node, slideFunc, cur)->
  setTimeout (->
    done = false
    if mnum = cur.data.match numPat
      restorePosition top, ->
        orig = cur
        mid = cur.splitText mnum.index
        cur = (if mid.length > mnum[0].length then mid.splitText mnum[0].length
        else
          done = true
          mid)
        numberSpan = $(mid).wrap("<span class='org-num'></span>").parent()[0]
        do (n = numberSpan)-> n.onmousedown = (e)->
          showSliderButton node, n, slideFunc
      if !done
        return createNextValueSlider node, slideFunc, cur
    createNextValueSliders node, slideFunc, cur), 1

leisureNumberSlider = (numberSpan)->
  orgParent = getOrgParent numberSpan
  orgType = orgParent.getAttribute 'data-org-results'
  computing = false
  pending = false
  newValue = ->
    computing = true
    pending = false
    doc = topNode orgParent
    selection = new FancySelectionDescriptor doc
    done = ->
      setTimeout (->selection.restore 0, doc), 1
      computing = false
      setTimeout (-> if !computing && pending then newValue()), 100
    setTimeout (->
      if orgType == 'dynamic' then root.orgApi.executeSource parent, numberSpan.parentNode, done
      else if orgType == 'def' then root.orgApi.executeDef orgParent, done), 1
  if orgType in ['dynamic', 'def']
    (event, ui)->
      numberSpan.innerHTML = String(ui.value)
      if !computing then newValue()
      else pending = true
  else ->

regularNumberSlider = (numberSpan)->
  Lodash.throttle ((event, ui)->
    numberSpan.innerHTML = String(ui.value)
    edited numberSpan), 20,
      leading: true
      trailing: true

lineStart = /^[^ ].*$/gm

recreateAstButtons = (node)->
  if !(top = $(node).closest('.codeblock')[0]) then return
  restorePosition top, ->
    $(node).find('[data-ast-offset]').remove()
    t = getOrgText node
    while m = lineStart.exec t
      if (tr = m[0].trim()) && tr[0] != '#'
        [cur, offset] = findDomPosition node, m.index
        if offset > 0 then cur = cur.splitText offset
        div = document.createElement 'div'
        div.setAttribute 'class', 'ast-button'
        div.setAttribute 'contenteditable', 'false'
        div.setAttribute 'data-ast-offset', m.index
        do (d = div)-> d.onmousedown = (e)->
          e.preventDefault()
          e.stopPropagation()
          showAst d
        cur.parentNode.insertBefore div, cur
    node.normalize()

newCodeContent = (name, content)->
  parent = $("[data-org-codeblock='#{name}']")
  if node = parent.find('[data-org-src]')[0]
    node.innerHTML = escapeHtml content
    recreateAstButtons node
    createValueSliders node, leisureNumberSlider

define 'newCodeContent', lz (name)->$F(arguments, (content)->
  makeSyncMonad (env, cont)->
    newCodeContent rz(name), rz(content)
    cont rz L_true)

isOrContains = (parent, node)->
  n = parent.compareDocumentPosition(node)
  (n & DOCUMENT_POSITION_CONTAINED_BY) || n == 0

redrawAst = (code, pos)->
  [button] = findDomPosition code, pos
  while (button = nodeBefore button) != code && !$(button).is '.ast-button' then
  console.log "redraw ast", button
  showAst button, true

linePat = /\r?\n(?=[^ ]|$)/

showAst = (astButton, force)->
  offset = Number(astButton.getAttribute 'data-ast-offset')
  #if force || !replaceRelatedPresenter presenter.button, emptyPresenter
  if force || !replaceRelatedPresenter astButton, emptyPresenter
    $(astButton).children().remove()
    text = getOrgText(astButton.parentNode).substring offset
    text = text.substring 0, (if m = text.match linePat then m.index else text.length)
    result = rz(L_newParseLine)(lz 0)(L_nil)(lz text)
    runMonad result, baseEnv, (ast)->
      if getType(ast) != 'parseErr'
        console.log "SIMPLIFIED: #{show lz(runMonad rz(L_simplify) lz text)}"
        try
          astContent = nonOrg "<div class='#{theme ? ''} ast'>#{rz(L_wrappedTreeFor)(lz ast)(L_id)}</div>"
          if theme then astContent.addClass theme
          $(astButton).append astContent
          replacePresenter
            hide: -> astButton.firstChild?.remove()
            isRelated: (node)-> isOrContains astButton, node
            button: astButton
            astCodeContains: (pos)-> 0 <= pos - offset < text.length
            astCode: getCodeContainer astButton
        catch err
          console.log "Error showing AST: #{err.stack}"

show = (obj)-> rz(L_show)(lz obj)

commentButton = (name)->
  "<button class='comment-button' onclick='Leisure.toggleComment(\"#{escapeAttr name}\", event)' contenteditable='false' data-org-commentcount='0'><i class='fa fa-comment'></i><span></span><div></div></button>"

toTestCaseButton = (org)->
  if isDef org then ''
  else "<button class='testcase-button' onclick='Leisure.createTestCase(event)' contenteditable='false' data-org-commentcount='0'><i class='fa fa-mail-reply'></i><div></div><span></span></button>"

codeBlockForNode = (node)->
  node = $(node).closest '[data-org-type="source"]'
  if node.is '[data-org-test]' then node[0] else node[0].parentNode

createTestCase = (evt)->
  restorePosition null, ->
    node = codeBlockForNode evt.target
    selectPrevious node
    attrs = ['view', 'testcase']
    if !getCodeAttribute evt.target, 'observe' then attrs.push 'observe', '*'
    setCodeAttributes evt.target, attrs...
    node = $("##{node.id}")[0]
    text = getOrgText node
    rest = text
    while match = rest.match drawerRE
      if match[0].trim().toLowerCase() == ':expected:'
        drawer = parseOrgMode(rest.substring(match.index), text.length - rest.length + match.index).children[0]
        break
      rest = rest.substring match.index + match[0].length
    resultsText = (if drawer then text.substring drawer.offset + drawer.text.length else text)
    if match = resultsRE.exec resultsText
      results = parseOrgMode(resultsText.substring(match.index), text.length - resultsText.length + match.index).children[0]
      if results.text.substring results.contentPos
        newExpectation = ":EXPECTED:\n#{results.text.substring results.contentPos}:END:\n"
        start = (if drawer then drawer else results).offset
        end = (if drawer then drawer.offset + drawer.text.length else results.offset)
        src = parseOrgMode(text).children[0]
        pre = text.substring 0, start
        #return replaceCodeBlock node, pre + newExpectation + text.substring end
        return replaceCodeBlock $("##{node.id}"), pre + newExpectation + text.substring end
    alert('You have to have results in order to make a test case')

newChangeResultType = (node, newType)->
  org = src = orgForNode node
  while src && !(src instanceof Source)
    src = src.next
  if src
    if m = src.text.match /(:results *)([\w]*)/i
      start = m.index + m[1].length
      end = start + m[2].length
      src.text = src.text.substring(0, start) + newType + src.text.substring(end)
    else
      pos = src.contentPos - 1
      src.text = src.text.substring(0, pos) + " :results #{newType}" + src.text.substring pos
  org

changeResultType = (text, newType)->
  src = parseOrgMode(text).children[0]
  while src && !(src instanceof Source)
    src = src.next
  if src
    if m = src.text.match /(:results *)([\w]*)/i
      start = src.offset + m.index + m[1].length
      end = start + m[2].length
      text.substring(0, start) + newType + text.substring(end)
    else
      pos = src.offset + src.contentPos - 1
      text.substring(0, pos) + " :results #{newType}" + text.substring pos
  else text

commentBlock = (name)->
  "<div class='comments' data-org-comments='#{escapeAttr name}'><div></div></div>"

toggleComment = (name, evt)->
  button = $(evt.target).closest('button')[0]
  block = $("[data-org-comments='#{name}']")
  console.log "comments clicked!"
  if block.hasClass 'showcomments'
    if !replaceRelatedPresenter button, null then block.removeClass 'showcomments'
  else
    block.addClass 'showcomments'
    $("[data-org-codeblock='#{escapeAttr name}'] button.comment-button").removeClass 'new-comments'
    replacePresenter
      hide: -> block.removeClass 'showcomments'
      isRelated: (target)->
        button == $(target).closest('button')[0] || $(target).closest("[data-org-comments]").is(block)

addComment = (name, event)->
  box = $(event.target.parentNode.querySelector('textarea'))
  createComment name, box.val()
  box.val ''

defaultMarkup = (org, tag, attrs...)->
  tag = tag || 'span'
  attrs = if attrs.length then " " + Lazy(attrs).chunk(2).map(([k, v])-> "#{k}='#{v}'").join(' ')
  else ''
  "<#{tag} #{orgAttrs org}#{attrs}>#{meatText org.text}</#{tag}>"

htmlForResults = (text, org)->
  attr = if org?.shared then " id='#{org.nodeId}' data-shared='#{org.shared}'" else ''
  bareResults = ''
  for line in splitLines text ? ''
    if line.match /^: / then bareResults += "<div class='resultsline'>#{unescapeString line.substring(2)}</div>"
  """
  <div class='coderesults' data-org-type='results'#{attr}><span data-results-boilerplate class='hidden'>#+RESULTS:\n</span><div class='resultscontent'><div data-results-display data-nonorg>#{bareResults}</div><span data-results-content class='hidden'>#{escapeHtml text}</span></div></div>"""

htmlForViewResults = (text, boilerplate)->
  html = sourceSpan 'results-boilerplate', boilerplate ? '#+RESULTS:\n'
  html += "<div data-source-results class='resultscontent'><div data-results-display data-nonorg>"
  for line in splitLines text
    if line.match /^: / then html += "<div class='resultsline'>#{unescapeString line.substring(2)}</div>"
  html += "</div><span data-results-content class='hidden'>#{text}</span></div>"

toggleDynamic = (event)->
  block = codeBlockForNode event.target
  bl = $(block)
  resType = bl.attr('data-org-results') || bl.find('[data-org-results]').attr('data-org-results')
  top = topNode block
  newResType = if resType == 'dynamic' then 'static' else 'dynamic'
  newNode = replaceCodeBlock block, changeResultType getOrgText(block), newResType
  if newResType == 'dynamic' then executeSource top, $(newNode).find('[data-org-type="source"]')[0]

nonl = (txt)-> if txt[txt.length - 1] == '\n' then txt.substring 0, txt.length - 1 else txt

createResults = (srcNode)->
  srcNode = $(srcNode).closest('.codeblock')
  if created = (srcNode && !$(srcNode).find('[data-results-boilerplate]').length)
    if $(srcNode).is('[data-code-view]')
      $(srcNode).find('.codewrapper').append htmlForViewResults ''
    else $(srcNode).find('.codewrapper').append htmlForResults ''
  created

executeCode = (event)->
  selectPrevious codeBlockForNode event.target
  executeSource topNode(event.target), event.target, ->

#
# When to cancel line joins
# - BS at the start of a SRC block
# - DEL at the end of a SRC block
#
shouldCancelBS = (parent, r)-> atTextStart(r) && crossesHidden -1

atTextStart = (r)-> r.collapsed && (r.startContainer.nodeType == 1 || (r.startContainer.nodeType == 3 && r.startOffset == 0))

# returns:
# false if not at the end
# 1 if at the end
# 2 at an ending \n
atTextEnd = (r)-> r.collapsed && (r.startContainer.nodeType == 1 || (r.startContainer.nodeType == 3 &&
((r.startOffset == r.startContainer.length && 1) ||
  (r.startOffset == r.startContainer.length - 1 &&
  getOrgText(r.startContainer)[r.startOffset] == '\n' && 2))))

shouldCancelDEL = (parent, r)-> (atEnd = atTextEnd r) && crossesHidden atEnd + 1

matchLineAt = (parent, pos)->
  text = getOrgText parent
  start = text.substring(0, pos).lastIndexOf('\n')
  end = text.indexOf '\n', start + 1
  if end == -1 then end = text.length
  matchLine text.substring start + 1, end

slideStart = -> "<div class='slideholder'>"

slideEnd = -> "</div>"

firstSlideFlag = false

startNewSlide = (replace)->
  if replace then ''
  else if firstSlideFlag
    firstSlideFlag = false
    ''
  else "#{slideEnd()}#{slideStart()}"

createNoteShadows = ->
  for node in $('.slideholder')
    setShadowHtml node, "<div class='page'><div class='border'></div><table class='pagecontent slideshadow'><tr class='slideshadowrow'><td class='slidemain'><content select='[data-org-note=\"main\"]'></content></td><td class='sidebarholder'><div class='sidebar'><div class='sidebarcontent'><content select='[data-org-note=\"sidebar\"]'></content></div></div></td></tr></table></div><content select='[data-org-note=\"skip\"],[data-float-holder]'></content>"
  for node in $('[data-float-holder]')
    holder = $(node)
    inside = $(node.firstChild)
    noteSpec = $(node).find('[data-org-floatval]').attr 'data-org-floatval'
    holder.draggable handle: 'h2'
    inside.resizable()
    holder.bind 'dragstop', (event) -> saveNoteLocation $(event.target)
    inside.bind 'resizestop', -> saveNoteLocation $(event.target)
    [skip, top, left, width, height] = noteSpec.split /\s+/
    window.setTimeout (->
      holder.css  top: top, left: left
      inside.css width: width, height: height), 1

markupGuts = (org, start)->
  if !org.children.length then ''
  else
    prev = if start then null else org
    hline = 'first'
    if org.level == 0 then firstSlideFlag = true
    guts = ((for c in org.children
      s = start
      start = false
      p = prev
      prev = c
      h = hline
      if c instanceof Headline then hline = 'inner'
      (hlineFor c, h) + markupNode(c, s)).join "") + (if org.level == 0 then "<hr class='last'>" else '')
    if org.level == 0
      "#{slideStart()}#{guts}#{slideEnd()}"
    else guts

hlineFor = (headline, hline)->
  if !(headline instanceof Headline) || headline.level != 1 then ''
  else "<hr class='#{hline}'>"

currentTextPosition = (parent, r)->
  if curPos > -1 then curPos
  else curPos = getTextPosition parent, r || getSelection().getRangeAt(0)

crossesHidden = (delta)->
  r = getSelection().getRangeAt 0
  !(0 <= r.startOffset < r.startContainer.length) && isCollapsed (if delta < 0 then textNodeBefore else textNodeAfter) parentForNode(r.startContainer), r.startContainer

bindContent = (div)->
  div.addEventListener 'drop', (e)-> root.orgApi.handleDrop e
  div.addEventListener 'mousedown', (e)->
    if replaceUnrelatedPresenter e.target, emptyPresenter
      setCurKeyBinding null
  div.addEventListener 'mouseup', (e)-> adjustSelection e
  div.addEventListener 'keydown', handleKey div
  div.addEventListener 'keypress', (e)-> updateSelection()
  oldKeyup = handleKeyup div
  div.addEventListener 'keyup', (e)->
    keyupSelectionDescriptor?.restore()
    keyupSelectionDescriptor = null
    oldKeyup e

handleKey = (div)->(e)->
  if e.target instanceof HTMLInputElement || e.target.getAttribute 'data-view-id'
    return
  root.modCancelled = false
  curPos = -1
  c = (e.charCode || e.keyCode || e.which)
  if !addKeyPress e, c then return
  s = getSelection()
  r = (if s.rangeCount > 0 then s.getRangeAt(0) else null)
  root.currentBlockIds = blockIdsForSelection s, r
  [bound, checkMod] = findKeyBinding e, div, r
  if bound then root.modCancelled = !checkMod
  else
    root.modCancelled = false
    n = s.focusNode
    offset = s.anchorOffset
    el = r.startContainer
    if c == ENTER then handleInsert e, s, newLinesForNode el
    else if c == BS then fancyBackspace div, e, s, r
    else if c == DEL then fancyDel div, e, s, r
    else if modifyingKey c, e then handleInsert e, s

childIndex = (el)->
  count = 0
  while el = el.previousSibling
    count++
  count

newLinesForNode = (node)->
  if $(node).closest('[data-shared]').attr('data-shared') in ['chunk','headline']
    '\n\n'
  else '\n'

whitespaceEnd = /(\n | )*(\n*)$/

fancyBackspace = (div, e, s, r)->
  handleDelete e, s, false, (text, pos)->
    if pos == 0 then false
    else if $(s.anchorNode).closest('.code-content').length then true
    else if text[pos - 1] in [' ', '\n']
      fore = text.substring 0, pos
      ws = (m = fore.match(whitespaceEnd))?[0] ? ''
      nls = m?[2] ? ''
      if nls.length > 3 then [pos - 2, pos]
      else [pos - ws.length, pos]
    else [pos - 1, pos]

isEmptyText = (text)-> text in ['\n', '\n\n']

fancyDel = (div, e, s, r)->
  handleDelete e, s, true, (text, pos)->
    if pos in [text.length, text.length - 1] then false
    else if isEmptyText text then [0, '']
    else if $(s.anchorNode).closest('.code-content').length then pos < text.length - 1
    else if text[pos] != '\n' then [pos, pos + 1]
    else if text[pos + 1] == '\n' then [pos, pos + 2]
    else if text[pos - 1] == '\n' then [pos - 1, pos + 1]
    else [pos, pos + 1]

beginsMeat = (s)->
  n = s.anchorNode
  s.anchorOffset == 0 &&
    (isMeatText(n) || (n.nodeType == Node.TEXT_NODE && isMeatText n.parentNode))

endsMeat = (s)->
  n = s.anchorNode
  p = s.anchorOffset
  (isMeatText(n) && n.textContent.match /^\s*\n/) ||
    (n.nodeType == Node.TEXT_NODE && isMeatText(n.parentNode) && p == n.length - 1 && n.data[p] == '\n')

isMeatText = (n)-> n.nodeType == Node.ELEMENT_NODE && n.classList.contains 'meat-text'

isMeatBreak = (n)-> n.nodeType == Node.ELEMENT_NODE && n.classList.contains 'meat-break'

fancyCheckExtraNewline = (range, n, parent)->
  if range.collapsed && n.nodeType == Node.TEXT_NODE && range.startOffset == n.length && getOrgText(n)[n.length - 1] != '\n' then checkLast n, parent
  else if $(n).closest('[data-org-type=meat]').length
    '\n\n'
  else '\n'

cancelAndReselect = (event, selection, oldRange, currentRange)->
  e.preventDefault()
  root.modCancelled = true
  if oldRange != currentRange
    selectRange oldRange
  null

getCodeContainer = (node)->
  $(node).closest("[data-org-src]")[0] || $(node).find("[data-org-src]")[0]

needsNewline = (el)->
  if !el then false
  else if el.nodeType == 3 then needsNewline el.parentNode
  else el.nodeType == 1 && $(el).is('[data-newline]')

bsWillDestroyParent = (r)->
  if r.startContainer.nodeType == 3 && r.startOffset == 1 && r.startContainer.data.match /^.\n?$/
    getOrgText(r.startContainer.parentNode) == r.startContainer.data
  else false

allowEvents = true

executeSource = (parent, node, env, cont, skipTests)->
  doc = topNode node
  [srcNode, text] = getNodeSource node
  if srcNode
    createResults srcNode
    if text.trim().length
      lang = getNodeLang node
      orgEnv(parent, srcNode).executeText text.trim(), propsFor(srcNode), env, (env)->
        cont? env
        if !skipTests then runAutotests doc
    else if r = $(srcNode).find('[data-results-content]').length then clearResults srcNode

fancyExecuteDef = (node, cont)->
  doc = topNode node
  executeDef node, ->
    cont?()
    runAutotests doc

runAutotests = (doc)->
  for n in $(doc).find("[data-org-results='autotest']").add($(doc).find("[data-org-update~='any']"))
    runTest doc, n

runTest = (doc, node)-> executeSource doc, node, (if $(node).is("[data-org-results='autotest']") then (-> checkTestResults node)), true

checkTestResults = (node)->
  node.setAttribute 'data-org-test', (if node.getAttribute('data-org-expected') == $(node).find('[data-results-content]').text() then 'pass' else 'fail')

processResults = (str, node, skipText)->
  if !(node.hasAttribute 'data-no-results')
    if resultsNode = $(node).find('[data-results-display]')[0]
      if !skipText
        $(node).find('[data-results-content]')[0]?.textContent += str
        edited node
      classes = 'resultsline'
      if theme != null then classes = theme + ' ' + classes
      if $("body").hasClass 'bar_collapse' then classes += ' bar_collapse'
      for line in splitLines str
        if line.match /^: / then resultsNode.innerHTML += "<div class='#{classes}'>#{unescapeString line.substring(2)}</div>"
    else console.log str

charCodes =
  "b": '\b'
  "f": '\f'
  "n": '\n'
  "r": '\r'
  "t": '\t'
  "v": '\v'
  "'": '\''
  "\"": '\"'
  "\\": '\\'

unescapeString = (str)-> str.replace /\\./g, (str)-> charCodes[str[1]] || str

redrawIssue = (issue)->
  issueName = issue.leisureName
  if (name = $("[data-org-comments='#{issueName}']")).length
    count = issue.comments.length + 1
    button = $("[data-org-codeblock='#{issueName}'] button.comment-button")
    if button.attr('data-org-commentcount') != count
      button.attr 'data-org-commentcount', count
      button.addClass 'new-comments'
    setShadowHtml button.find('span')[0], count
    setShadowHtml name[0].firstChild, "<div class='#{theme ? ''}'>#{commentHtml issue, 'main'}#{(commentHtml c, 'added' for c in issue.comments).join ''}#{newCommentBox issueName, $(name[0].parentNode).find('.codeblock').attr 'id'}</div>"

commentHtml = (comment, type)->
  "<div class='commentbox'><img src='http://gravatar.com/avatar/#{comment.user.gravatar_id}?s=48'><div class='#{type}'>#{comment.body}</div></div>"

newCommentBox = (name, codeId)->
  "<div><textarea pseudo='x-new-comment'></textarea><br><button class='add_comment' onclick='Leisure.addComment(\"#{name}\", event)'>Add Comment</button></div>"

colonify = (str)-> ': ' + (str.replace /[\n\\]/g, (c)-> if c == '\n' then '\\n' else '\\\\') + '\n'

clearResults = (node)->
  $(node).find('[data-results-display]').html ''
  $(node).find('[data-results-content]').html ''

# like orgSupport's orgEnv, but wrap the leading ': ' in hidden spans
orgEnv = (parent, node)->
  if id = $(node).closest('[data-shared]')[0]?.id
    r = -> $("##{id}")[0]
  env = if r?() && !r().hasAttribute 'data-no-results'
    pendingResults = ''
    __proto__: defaultEnv
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    write: (str)-> pendingResults += colonify String str
    clear: ->
      pendingResults = ''
      clearResults r()
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
    finishedComputation: ->
      clearResults r()
      processResults pendingResults, r()
  else
    __proto__: defaultEnv
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    write: (str)-> console.log colonify String str
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
    finishedComputation: ->
  installEnvLang node, env
  et = env.executeText
  env.executeText = (text, props, cont)->
    et.call this, text, props, ->
      env.finishedComputation()
      cont? env
  env

#################
# Value sliders
#################

hideSlider = (numberSpan)-> replaceRelatedPresenter numberSpan, emptyPresenter

showSliderButton = (parent, numberSpan, slideFunc)->
  if hideSlider numberSpan then return
  inside = false
  sliding = false
  d = $("<div style='z-index: 1; position: absolute; width: 200px; background: white; border: solid green 1px' slider contentEditable='false'></div>")[0]
  d.style.top = "#{numberSpan.offsetTop + numberSpan.offsetHeight + 5}px"
  d.style.minTop = '0px'
  d.style.left = "#{Math.max(0, numberSpan.offsetLeft + numberSpan.offsetWidth/2 - 100)}px"
  d.addEventListener 'mouseover', (e)->
    if !inside then inside = true
  d.addEventListener 'mouseout', (e)->
    if e.toElement != d && !d.contains e.toElement
      inside = false
      if !sliding then hideSlider numberSpan
  value = Number getOrgText numberSpan
  min = if value < 0 then value * 2 else value / 2
  max = if value == 0 then 10 else value * 2
  sl = $(d).slider
    animate: 'fast'
    start: ->
      sliding = true
      allowEvents = false
      true
    stop: (event, ui)->
      setMinMax sl
      allowEvents = true
      sliding = false
      if !inside then hideSlider numberSpan
    slide: slideFunc numberSpan
    value: value
  numberSpan.parentNode.insertBefore d, numberSpan
  setMinMax sl, value
  replacePresenter
    numberSpan: numberSpan
    hide: ->
      d.remove()
    isRelated: (node)-> (isOrContains d, node) || (isOrContains numberSpan, node)
  d.focus()

psgn = (x)-> if x < 0 then -1 else 1

setMinMax = (sl, value)->
  value = value || sl.slider("value")
  min = 0
  max = if 1 <= Math.abs(value) < 50 or value == 0 then 100 * psgn(value) else value * 2
  step = (max - min) / 100
  if Math.round(value) == value
    step = Math.round(step)
    step = Math.max(1, step - step % (max - min))
  sl.slider "option", "min", min
  sl.slider "option", "max", max
  sl.slider "option", "step", step

getSlides = (parent)->
  showHidden = $(document.body).is('.show-hidden')
  $(parent ? '[maindoc]').find('.slideholder').filter (i, el)->
    slides = $(el).find("[data-org-headline='1']")
    if !showHidden then slides = slides.not('[data-property-hidden="true"]')
    slides.length > 0

setCurrentSlide = (element, noscroll)->
  element = $(element).closest '.slideholder'
  for node in $('.currentSlide')
    if node.shadowRoot then $(node).shadow().removeClass 'currentSlide'
  $('.currentSlide').removeClass 'currentSlide'
  element.addClass 'currentSlide'
  if element.is('.firstSlide') then $("body").addClass 'firstSlide' else $("body").removeClass 'firstSlide'
  if element.is('.lastSlide') then $("body").addClass 'lastSlide' else $("body").removeClass 'lastSlide'
  # this is needed until there is support for :host (and/or ^ & ^^)
  $(element).shadow().addClass 'currentSlide'
  Leisure.actualSelectionUpdate()
  if !noscroll then window.scrollTo 0, 0

firstSlide = -> setCurrentSlide getSlides().first()

lastSlide = -> setCurrentSlide getSlides().last()

slideIndex = (slides)->
  slides = slides || getSlides()
  slides.index slides.filter('.currentSlide').first()

nextSlide = ->
  slides = getSlides()
  if (i = slideIndex slides) > -1
    setCurrentSlide slides[Math.min(i + 1, slides.length - 1)]

prevSlide = ->
  slides = getSlides()
  i = slideIndex slides
  setCurrentSlide slides[Math.max(i - 1, 0)]

slideParent = (node)-> $(node).closest("[data-org-headline='1']")[0]

documentTop = (node)->
  top = 0
  while node
    if node.tagName
      top = top + node.offsetTop
      node = node.offsetParent
    else node = node.parentNode
  top

slideBindings =
  'PAGEUP': (e, parent, r)->
    e.preventDefault()
    prevSlide()
    false
  'PAGEDOWN': (e, parent, r)->
    e.preventDefault()
    nextSlide()
    false
  'S-PAGEUP': (e, parent, r)->
    e.preventDefault()
    firstSlide()
    false
  'S-PAGEDOWN': (e, parent, r)->
    e.preventDefault()
    lastSlide()
    false
  'C-PAGEUP': (e, parent, r)->
    e.preventDefault()
    firstSlide()
    false
  'C-PAGEDOWN': (e, parent, r)->
    e.preventDefault()
    lastSlide()
    false

slideBindings.__proto__ = defaultBindings

toggleSlides = ->
  slideMode = !slideMode
  applySlides()

applySlides = ->
  $('#prevSlide:not(.bound)').addClass('bound').bind('click',  prevSlide);
  $('#nextSlide:not(.bound)').addClass('bound').bind('click',  nextSlide);
  $('body').removeClass 'firstSlide'
  $('body').removeClass 'lastSlide'
  $('.firstSlide').removeClass 'firstSlide'
  $('.lastSlide').removeClass 'lastSlide'
  if slideMode
    fancyOrg.bindings = slideBindings
    s = getSlides()
    s.first().addClass 'firstSlide'
    s.last().addClass 'lastSlide'
    #restorePosition null, ->
    $('[data-org-html]').addClass 'slideHtml'
    $('body').addClass 'slides'
    firstSlide()
  else
    fancyOrg.bindings = defaultBindings
    $('body').removeClass 'slides'
    $('[data-org-html]').removeClass 'slideHtml'

theme = null

setTheme = (str)->
  el = $('[data-shadowholder]').shadow().add('body')
  if theme && theme != str then el.removeClass theme
  theme = str
  if str then el.addClass str
  for t in $("style.theme")
    $(t).prop 'disabled', true
  $("style#" + theme).removeProp 'disabled'
  dd = $("#themeSelect")
  if dd then dd.val theme

define 'setTheme', lz (str)->
  makeSyncMonad (env, cont)->
    if str != theme then setTheme rz str
    cont rz L_true

define 'toggleLeisureBar', lz makeSyncMonad (env, cont)->
  console.log new Error "TOGGLE LEISURE BAR"
  root.toggleLeisureBar()
  cont rz L_true

define 'toggleSlides', lz makeSyncMonad (env, cont)->
  toggleSlides()
  cont rz L_true

slideOffset = (slide)->
  if slide
    a = []
    a.push $("[data-org-headline='1']")...
    a.indexOf slide ? $('.currentSlide')[0]
  else -1

codeHolder = (el)-> if el?.getAttribute 'data-shared' then el else el?.parentElement

fixupViews = (target)->
  if Leisure.noViewUpdate then return
  if target
    yn = 'data-yaml-name'
    ynA = "[#{yn}]"
    vl = 'data-view-link'
    vlA =  "[#{vl}]"
    rendered = {}
    for dataEl in $(target).add($(target).find(ynA)).filter(ynA)
      rendered[$(dataEl).attr yn] = true
      renderView dataEl
    for link in $(target).add($(target).find(vlA)).filter(vlA)
      dataName = $(link).attr vl
      if !rendered[dataName] && data = getBlockNamed dataName
        renderLink link, data
  else
    for dataEl in $(cb)
      renderView dataEl
    for html in $('[data-html-view]')
      renderHtmlView html

renderHtmlView = (html, data)->
  if !html.leisureRendered && (txt = $(html).find("[data-content]").text()) && output = $(html).find('[data-org-html]')
    if !data && name = html.getAttribute 'data-html-view' then data = getDataNamed name
    if data && txt
      try
        comp = Handlebars.compile txt
        html.leisureRendered = true
      catch err
        console.log err.stack
        return
      appendAndActivate output, nonOrg comp data.yaml

# el could be a parent fragment, a shared source block, or a source block in a fragment
renderView = (el, name)->
  holder = codeHolder el
  id = holder.id
  data = getBlock id
  if data?.yaml?.type
    yn = 'data-yaml-name'
    renderData data, $(holder).add($(holder).find("[#{yn}]")).filter("[#{yn}]").attr yn
  else if name = name || el.getAttribute "data-yaml-name"
    for html in $("[data-html-view='#{name}']")
      renderHtmlView html, data

renderData = (data, linkName)->
  if type = data?.yaml?.type
    links = if name then $("[data-view-link='#{linkName}'][data-view-name='#{name}']") else $("[data-view-link='#{linkName}']")
    id = data._id
    links.attr 'data-view-id', id
    try
      oldChunk = Leisure.currentViewChunk
      Leisure.currentViewChunk = data
      for node in links
        renderLink node, data
    finally
      Leisure.currentViewChunk = oldChunk

noRenderWhile = (links, func)->
  addChangeContextWhile _.merge({}, root.changeContext.blockViews ? {}, blockViews: links), func

renderLink = (node, data)->
  if node.lastRendered == getRenderCount() then return
  node.lastRendered = getRenderCount()
  if isPlainEditing(node) || root.changeContext.blockViews?.is(node) || root.changeContext.blockViews?.is($(node).children().filter('[data-view]')) then return
  if name = node.getAttribute 'data-view-name'
    viewKey = "#{data.yaml.type}/#{name}"
    descriptor = "#{data._id}/#{name}"
  else
    viewKey  = data.yaml.type
    descriptor = data._id
  if root.viewTypeData[viewKey] && markup = viewMarkup[viewKey]
    markup data.yaml, $(node), false, data
  else clearView node
  $(node)
    .attr 'data-view-descriptor', descriptor
    .attr 'data-view-key', viewKey
    .attr 'data-view-id', data._id

updateIndexViews = (index)->
  for link in $("[data-view-indexes='#{index}']")
    renderLink link, getBlock link.getAttribute "data-view-id"

updateViews = (id)->
  if block = getBlock id
    for link in $("[data-view-ids~='#{id}']")
      if !root.changeContext.blockViews?.is(link)
        for view in $(link).find("[data-view-block='#{id}']")
          if !root.changeContext.blockViews?.is(view)
            type = $(view).attr 'data-view-type'
            viewMarkup[type] block.yaml, $(view), false, block, true, link
    if block.language?.toLowerCase() == 'css'
      $("##{id} [name=css]").html codeString block

viewBlock = (el)->
  if id = $(el).closest('[data-view-block]').attr('data-view-block')
    getBlock id

Leisure.bindWidgets = bindWidgets = (parent)->
  link = Templating.currentViewLink
  for input in $(parent).find 'input[data-value]'
    do (input)->
      input.setAttribute 'data-input-number', ++Templating.currentInputCount
      blockParent = $(input).closest '[data-view-block]'
      field = input.getAttribute 'data-value'
      input.value = viewBlock(input)?.yaml?[field] ? ''
      nextButton = input.getAttribute 'button'
      input.onkeyup = (e)->
        block = viewBlock(input)
        data = block.yaml
        setField data, field, input.value
        noRenderWhile $(link), -> setData block._id, data
        if nextButton && e.keyCode == 13
          e.preventDefault()
          $(rootNode(input).firstChild).find("##{nextButton}").click()

setField = (data, field, value)->
  data[field] = if typeof value == 'number' then value
  else if typeof value == 'string'
    n = Number value
    if String(n) == value.trim() then n
    else value
  else value

Handlebars.registerHelper 'values', (items..., options)-> items

Handlebars.registerHelper 'view', (item, name, options)->
  if !options
    options = name
    name = null
  data = if typeof item == 'string'
    block = getBlockNamed item
    block?.yaml
  else if item?.yaml && item._id
    block = item
    item.yaml
  else
    block = null
    item
  if data?.type
    descriptor = if name then "#{data.type}/#{name}" else "#{data.type}"
    viewMarkup[descriptor]?(data, null, false, block) || ''
  else ''

Handlebars.registerHelper 'deref', (item)->
  if typeof item == 'string'
    block = getBlockNamed item
    block?.yaml
  else if item.yaml && item._id
    block = item
    item.yaml
  else
    block = null
    item

Handlebars.registerHelper 'find', (index, options)->
  ret = "<span data-org-index='#{index}'></span>"
  indexedCursor(root.currentDocument, index)?.forEach (data)-> if data then ret += options.fn data
  ret

addViewId = ->
  if Templating.currentViewData._id?
    ids = {}
    for id in Templating.currentViewLink.getAttribute('data-view-id').split ' '
      ids[id] = true
    ids[Templating.currentViewData._id] = true
    result = []
    for k of ids
      result.push k
    Templating.currentViewLink.setAttribute 'data-view-id', result.join ' '

changeInputText = (field, id)->
  console.log "CHANGE DATA"

fancyOrg =
  __proto__: orgNotebook
  name: 'fancy'
  opposite: plainOrg
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  reparse: (parent, text, target)->
    if isPlainEditing target
      t = $(plainOrg.reparse parent, text, target)
      if t.is("[data-org-headline='1']")
        t.attr 'data-edit-mode', 'plain'
        t.attr 'data-org-note', t.attr('data-property-note') || 'main'
        createEditToggleButton t
      @newNode t
      fixupHtml t
    else orgNotebook.reparse.apply this, arguments
  installOrgDOM: (parent, orgNode, orgText, target)->
    @parent = parent
    restorePosition parent, =>
      if !target
        parent.setAttribute 'class', 'org-fancy'
        parent.setAttribute 'maindoc', ''
      hadTarget = target
      target = orgNotebook.installOrgDOM parent, orgNode, orgText, target
      fixupHtml target || parent, null
      @newNode target
      if !hadTarget
        @applyShowHidden()
        setTimeout (=>
          redrawAllIssues()
          ), 1
        $(document).tooltip()
  newNode: (target)->
    setTheme theme
    nextNoteId = 0
    fixupViews target
    createNoteShadows()
  executeSource: (parent, node, cont)->
    node = $(node).closest('[data-org-type="source"]')[0]
    if isPlainEditing node then plainOrg.executeSource arguments...
    else
      restorePosition null, =>
        code = getCodeContainer node
        shouldRedrawAst = false
        if presenter?.astCode == code
          pos = getTextPosition code, node, 0
          if presenter.astCodeContains? pos
            shouldRedrawAst = true
          presenter = emptyPresenter
        executeSource.call this, parent, node, this, (env)->
          env.finishedComputation()
          recreateAstButtons code
          if shouldRedrawAst then redrawAst code, pos
          cont?()
  executeDef: fancyExecuteDef
  createResults: createResults
  bindings: defaultBindings
  redrawIssue: (i)-> redrawIssue i
  leisureButton: ->
    restorePosition @parent, ->
      toggleSlides()
      if slideMode then setTimeout (-> if !getSelection().focusNode then $('[maindoc]').focus()), 1
      else swapMarkup()
  emptySlide: (id, slidePosition)->
    "#{slideStart()}<hr class='#{if slidePosition == 'only' then 'first' else slidePosition}'><div id='#{id}'></div>#{slideEnd()}"
  insertEmptySlide: (id, prevId)->
    slide = $(@emptySlide id)
    if (prev = $("##{prevId}").closest('.slideholder')).length then prev.after slide
    else $("[maindoc] [data-org-headline='0']").append slide
    slide.find("##{id}")[0]
  defineView: (id)-> # define a view from a data block
    if type = viewIdTypes[id]
      createTemplateRenderer type, root.viewTypeData[type], false, (data, target, block, update)->
        el = if update then target else viewRoots(target)
        if target
          el
            .addClass(theme)
            .addClass($('body').hasClass('bar_collapse') && 'bar_collapse')
            .css('white-space', 'normal')
            .css('user-select', 'none')
            .css('-webkit-user-select', 'none')
            .css('-moz-user-select', 'none')
        el
          .find('button')
          .button()
        el
          .find('[title]')
          .tooltip()
        bindAllWidgets el
        for view in el.add el.find '[data-view-type]'
          type = view.getAttribute 'data-view-type'
          for id in controllerDescriptorIds[type] ? []
            codeContexts[id]?.initializeView? view, data, block._id
      dataType = type.match /([^/]*)\/?(.*)?/
      restorePosition null, ->
        vBlock = getBlock id
        for dataId of dataTypeIds[vBlock?.codeAttributes?.defview] ? {}
          if block = getBlock dataId
            nodes = $("[data-view-ids~='#{dataId}']")
            if block.codeName?
              for node in $("[data-view-link='#{block.codeName}']")
                renderLink node, block
  deleteView: (type)->
    delete viewMarkup[type]
    for node in $("[data-view-key='#{type}']")
      clearView node
  applyShowHidden: ->
    for node in $('.slideholder')
      if $(node).find("[data-org-headline='1']").not("[data-property-hidden='true']").length == 0
        $(node).addClass('hidden-slide')
    applySlides()
  checkSourceMod: checkSourceMod
  updateBlock: (block)->
    lang = block.language?.toLowerCase()
    attr = block.codeAttributes
    restorePosition null, ->
      if lang in ['css', 'yaml']
        updateViews block._id
        if index = block.codeAttributes?.index then updateIndexViews index.split(' ')[0]
      else if lang == 'html' && attr?.defview
        incRenderCount()
        root.orgApi.defineView block._id
  updateIndexViews: -> restorePosition null, -> updateIndexViews
  updateAllBlocks: ->
    restorePosition null, ->
      console.log "UPDATE ALL"
      fixupViews '[maindoc]'
  updateObserver: (observerId, observerContext, yaml, block, type)->
    args = arguments
    restorePosition null, =>
      orgNotebook.updateObserver.apply this, args
      if observerContext.block.codeAttributes.view
        displayCodeView findOrIs($("##{observerContext.block._id}"), '[data-code-view]')[0]
  removeSlide: (id)->
    el = $("##{id}")
    holder = el.closest ".slideholder"
    el.remove()
    if holder.children().not('hr').length == 0 then holder.remove()

binding = false

bindAllWidgets = (els)->
  if !binding
    binding = true
    try
      for node in els
        bindWidgets node
    finally
      binding = false

plainOrg.opposite = fancyOrg

# called on installing DOM and also on new notes
fixupHtml = (parent, note)->
  for node in findOrIs findOrIs($(parent), "[data-lang='leisure']"), '[data-org-src]'
    recreateAstButtons node
    createValueSliders node, leisureNumberSlider
  for node in findOrIs findOrIs($(parent), "[data-lang]:not([data-lang='leisure'])"), '[data-org-src]'
    createValueSliders node, regularNumberSlider
  createNoteShadows()
  createEditToggleButton parent
  #if !note
  #  $(parent).find("button.create_note").remove()
  #  $("<button class='create_note' contenteditable='false'><i class='fa fa-file-text-o'></i></button>")
  #    .insertBefore(findOrIs($(parent), '[data-org-headline="1"]').find('.maincontent'))
  #    .children().find(':first-child')
  #    .click (e)->
  #      e.preventDefault()
  #      #root.currentMode.createNotes()
  for node in findOrIs $(parent), "[data-code-view]"
    displayCodeView node
  for node in findOrIs $(parent), '[data-org-comments]'
    setShadowHtml node.firstElementChild, newCommentBox node.getAttribute('data-org-comments'), $(node.parentNode).find('.codeblock').attr 'id'

displayCodeView = (node)->
  if node
    if block = getBlock $(node).closest('[data-shared]')[0]?.id
      clearView node
      viewMarkup[node.getAttribute 'data-code-view']? block, $(node), false, block
      #$(node).shadow().attr 'data-view-id', block._id

viewFor = (node)-> $("##{$(node).closest('[data-view-block]').attr 'data-view-block'}")

getMainContent = (headline)->
  headline = findOrIs headline, '[data-org-headline="1"]'
  c = headline.children '.maincontent'
  if c.length > 0
    headline.not(c.parent()).add(c)
  else headline

createEditToggleButton = (doc)->
  for node in getMainContent $(doc)
    id = if $(node).is '.maincontent' then node.parentElement.id else node.id
    button = $("<button class='toggle_edit' contenteditable='false' onclick='Leisure.toggleEdit(\"#{id}\")'><i class='fa fa-glass'></i></button>")
    if $(node).is '.maincontent' then button.insertBefore(node)
    else $(node).prepend button

isPlainEditing = (node)-> $(slideParent(node)).is "[data-edit-mode='plain']"

toggleEdit = (id)->
  restorePosition null, ->
    console.log "toggle edit", id
    node = $("##{id}").closest("[data-org-headline='1']")
    id = node[0].id
    parent = parentForNode node
    if node.attr('data-edit-mode') == 'plain'
      node.attr 'data-edit-mode', 'fancy'
      mode = fancyOrg
    else
      node.attr 'data-edit-mode', 'plain'
      mode = plainOrg
    mode.reparse parent, orgForNode(node[0]), node[0]
    node = $("##{id}")
    node.attr 'data-edit-mode', mode.name
    if mode == plainOrg
      node.attr 'data-org-note', node.attr('data-property-note') || 'main'
    if mode == root.plainOrg then createEditToggleButton node

addStyles = (name, string)->
  styles = $ "<style id='styles-#{name}'>\n#{string}\n</style>"
  if (old = $("#styles-#{name}")).length then old.replaceWith styles
  else $('body').append styles

root.fancyOrg = fancyOrg
root.toggleComment = toggleComment
root.addComment = addComment
root.recreateAstButtons = recreateAstButtons
root.setTheme = setTheme
root.createTestCase = createTestCase
root.executeCode = executeCode
root.toggleDynamic = toggleDynamic
root.getDocRange = getDocRange
root.restoreDocRange = restoreDocRange
root.getDocumentOffset = getDocumentOffset
root.viewMarkup = viewMarkup
root.noViewUpdate = false
root.topNode = topNode
root.rootNode = rootNode
root.codeHolder = codeHolder
root.getBlockNamed = getBlockNamed
root.viewBlock = viewBlock
root.toggleEdit = toggleEdit
root.toggleSlides = toggleSlides
root.getDeepestActiveElement = getDeepestActiveElement
root.addViewId = addViewId
root.getDataNamed = getDataNamed
root.setDataNamed = setDataNamed
root.findLinks = findLinks
root.findViews = findViews
root.viewFor = viewFor
root.setCodeAttributes = setCodeAttributes
root.clearCodeAttributes = clearCodeAttributes
root.addStyles = addStyles
root.noRenderWhile = noRenderWhile
root.fancyEnv = orgEnv
root.unescapeString = unescapeString
