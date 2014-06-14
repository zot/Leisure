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
  findOrIs,
  orgNotebook,
  parseOrgMode,
  orgAttrs,
  content,
  contentSpan,
  checkStart,
  #optionalBoundary,
  #boundarySpan,
  displaySource,
  checkEnterReparse,
  checkCollapsed,
  checkExtraNewline,
  followingSpan,
  currentLine,
  checkSourceMod,
  isCollapsed,
  nextOrgId,
  modifyingKey,
  handleKeyup,
  backspace,
  del,
  getOrgParent,
  getOrgType,
  executeText,
  executeDef,
  swapMarkup,
  modifiers,
  keyFuncs,
  defaultBindings,
  addKeyPress,
  findKeyBinding,
  setCurKeyBinding,
  presentValue,
  propsFor,
  escapeAttr,
  splitLines,
  orgSrcAttrs,
  baseEnv,
  getNodeSource,
  resultsType,
  isDef,
  getTextPosition,
  findDomPosition,
  nativeRange,
  nodeBefore,
  textNodeAfter,
  textNodeBefore,
  visibleTextNodeBefore,
  visibleTextNodeAfter,
  isParentOf,
  blockIdsForSelection,
  PAGEUP,
  PAGEDOWN,
  HOME,
  END,
  watchNodeText,
  markupData,
  orgForNode,
  plainOrg,
  blockElementForNode,
} = require '24-orgSupport'
{
  redrawAllIssues,
  createComment,
} = require '26-storage'
{
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
} = require '23-collaborate'
{
  createTemplateRenderer,
  escapeHtml,
  getDeepestActiveElement,
  setShadowHtml,
  clearShadow,
  viewMarkup,
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

class SelectionDescriptor
  constructor: (parent)->
    sel = getSelection()
    el = getDeepestActiveElement()
    @parent = $(parent)[0] ? (slideParent sel.focusNode)
    @focusNode = sel.focusNode
    @x = window.scrollX
    @y = window.scrollY
    if el.nodeType == Node.ELEMENT_NODE && (sid = el.getAttribute('data-shadow-id')) && el.nodeName.match(/input/i) && el.type.match(/text/i)
      descriptor = rootNode(el).firstChild.getAttribute 'data-view-descriptor'
      index = $("[data-view-descriptor='#{descriptor}']").index document.activeElement
      start = el.selectionStart
      end = el.selectionEnd
      @toString = -> "Selection(input: #{$('[maindoc]').find("[data-view-descriptor='#{descriptor}']").shadow().find("[data-shadow-id='#{sid}']")[0]})"
      @restore = (delta, doc)->
        newEl = $($(doc).find("[data-view-descriptor='#{descriptor}']")[index]).shadow().find("[data-shadow-id='#{sid}']")[0]
        if newEl != el then newEl.setSelectionRange start, end
        window.scrollTo @x, @y
    else if sel.type != 'None'
      startNode = sel.getRangeAt(0).startContainer
      [start, end, offset, note] = getDocRange()
      @toString = -> "Selection(doc: #{start}, #{end})"
      @restore = (delta, doc)->
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

isParentSelectionOf = (parent, child)-> isParentOf parent?.parent, child.parent

restoreStack = []

root.restorePosition = restorePosition = (parent, delta, block)->
  if !block
    block = delta
    delta = 0
  selection = new SelectionDescriptor parent
  slide = slideParent selection.focusNode
  activeSlideIndex = slideOffset slide
  if selection.focusNode && activeSlideIndex > -1 && !isParentSelectionOf(_(restoreStack).last(), selection)
    try
      restoreStack.push selection
      #console.log "SAVED: #{selection}"
      doc = topNode(slide).parentNode
      parent = doc.parentNode
      docPos = childIndex parent, doc
      currentSlide = slideIndex()
      block() # block shouldn't remove doc
      if doc = parent.children[docPos]
        if slideMode && currentSlide > -1 then setCurrentSlide getSlides()[currentSlide], true
        selection.restore delta, doc
    finally
      sel = restoreStack.pop()
      #console.log "RESTORED: #{selection}"
  else block()

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
  s.removeAllRanges()
  s.addRange r

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
  if s.rangeCount == 1 && r.collapsed && r.startContainer.nodeTYpe == 1 && shadow = r.startContainer.children[r.startOffset]?.shadowRoot
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
  [endContainer, endOffset] = findDomPosition parent, Math.min(end, parent.textContent.length - 1), true
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
  s.removeAllRanges()
  s.addRange r

getDocumentOffset = (r)->
  c = (if r.startOffset == 0 then (textNodeBefore r.startContainer) ? r.startContainer else r.startContainer)
  while isCollapsed c
    c = textNodeBefore c
  documentTop c

childIndex = (parent, child)->
  for i in [0...parent.children.length]
    if parent.children[i] == child then return i
  return -1

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
    "<#{tag} #{orgAttrs org}>#{escapeHtml org.text}</#{tag}>"

isLeisure = (org)-> org instanceof Source && org.getLanguage().toLowerCase() == 'leisure'

markupFragment = (org, delay, note)->
  if isCodeBlock org.children[0]
    {first, name, source, last} = getCodeItems org.children[0]
    if first == name then first = first.next
    if first == org.children[0] && !last.next
      prelude = ''
      while first != source
        prelude += first.allText()
        first = first.next
      return "<span #{orgAttrs org}>#{markupSource source, name, prelude, delay, true}</span>"
  "<span #{orgAttrs org}>#{(markupNode child, false, delay, note, false, true for child in org.children).join ''}</span>"

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
  properties = if properties.length then "<span class='headline-properties' title='#{escapeAttr properties.join '<br>'}'><i class='fa fa-wrench'></i></span>" else ''
  editMode = if org.level == 1 then " data-edit-mode='fancy'" else ""
  if org.level == 1 && !note && !org.properties?.note
    if org.text.trim() != ''
      "#{startNewSlide replace}<div #{orgAttrs org}#{editMode} data-org-headline-text='#{escapeAttr start}'#{noteAttrs org}><span class='maincontent'><span class='hidden'>#{stars}</span><span data-org-type='text'><div data-org-type='text-content'><div class='textborder' contenteditable='false'></div><div class='textcontent'>#{escapeHtml start}<span class='tags'>#{properties}#{tags}</span>\n</div></div></span>#{markupGuts org, checkStart start, org.text}</span></div>"
    else "#{startNewSlide()}<div #{orgAttrs org}#{editMode}><span data-org-type='text'><span data-org-type='text-content'><span class='hidden'>#{org.text}</span></span></span>#{markupGuts org, checkStart start, org.text}</div>"
  else
    slide = if org.text.trim() != ''
      "<div #{orgAttrs org}#{editMode} data-org-headline-text='#{escapeAttr start}'#{noteAttrs org}><span class='hidden'>#{stars}</span><span data-org-type='text'><div data-org-type='text-content'><div class='textcontent'>#{escapeHtml start}</div><span class='tags'>#{properties}#{tags}</span>\n</div></span>#{markupGuts org, checkStart start, org.text}</div>"
    else "<div #{orgAttrs org}#{editMode}><span data-org-type='text'><span data-org-type='text-content'><span class='hidden'>#{org.text}</span></span></span>#{markupGuts org, checkStart start, org.text}</div>"
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
  old = span.textContent
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
  watchNodeText node, editedNote node.id, node.id
  $(node).addClass 'herpderp'
  for noteSpec in node.getAttribute('data-org-notes').split /\s*,\s*/
    #console.log "NOTE FOR #{node.id}: #{noteSpec}"
    noteId = "note-#{nextNoteId++}"
    [org, html] = markupOrgWithNode node.textContent, true
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
      watchNodeText newNote, editedNote node.id, noteId
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
    "<span #{orgAttrs org}><span data-org-html='true'>#{$('<div>' + org.content() + '</div>').html()}</span><span class='hidden'>#{escapeHtml org.text}</span></span>"

chooseSourceMarkup = (org)->
  if isYaml org then markupYaml
  else if isLeisure org then markupLeisure
  #else if org.lead()?.trim().toLowerCase() == 'html' then (org)-> defaultMarkup org, 'div', 'class', 'default-lang', 'data-lang', org.lead()?.trim()
  else markupCode

markupSource = (org, name, doctext, delay, inFragment)->
  (chooseSourceMarkup org) org, name, doctext, delay, inFragment

findLinks = (name)->
  if m = name.match /^([^/]*)\/(.*)$/ then $("[data-view-link='#{m[1]}'][data-view-name='#{m[2]}']") else $("[data-view-link='#{name}']")

findViews = (name)-> findLinks(name).shadow()

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
      err = if !viewMarkup[type] then "<div clas='error'>No value view type for data nodeId: #{shared.nodeId}</div>" else ''
      yamlAttr += " data-yaml-type='#{type}'"
  err = ''
  if name
    n = escapeAttr name.info.trim()
    yamlAttr += " data-org-codeblock='#{n}' data-yaml-name='#{n}'"
  "<div #{orgAttrs source}#{yamlAttr}>#{err}<span class='Xhidden codeHeading'>#{escapeHtml pre}</span><span data-org-src>#{Highlighting.highlight 'yaml',  source.content}</span><span class='Xhidden codeHeading'>#{escapeHtml post}</span></div>"

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
  "<div class='default-lang' data-#{orgAttrs source}#{addAttr}><span class='Xhidden codeHeading'>#{escapeHtml pre}</span><span data-org-src>#{Highlighting.highlight lang,  source.content}</span><span class='Xhidden codeHeading'>#{escapeHtml post}</span></div>"

dragging = false

markupError = (org, str)->
  "<div class='error'><span class='hidden'>#{escapeHtml org.text}</span>#{escapeHtml str}</div>"

errorDiv = (str)->
  "<div class='error'>#{escapeHtml str}</div>"

markupLeisure = (org, name, doctext, delay, inFragment)->
  top = name ? org
  srcContent = org.content
  lead = org.text.substring 0, org.contentPos
  trail = org.text.substring org.contentPos + org.content.length
  lastOrgOffset = org.offset
  if name then codeBlock = " data-org-codeblock='#{escapeAttr name.info.trim()}'>"
  else codeBlock = ">"
  codeBlock += "<div class='codeborder'></div>"
  startHtml = "<div "
  contHtml = "class='codeblock' contenteditable='false' data-lang='leisure' #{orgAttrs org}#{codeBlock}"
  if view = org.attributes()?.view
    contHtml = "data-code-view='#{escapeAttr view.trim()}' " + contHtml
  if channels = updateChannels org then contHtml = "data-org-update='#{channels}' #{contHtml}"
  node = org.next
  intertext = ''
  finalIntertext = ''
  resText = ''
  resOrg = null
  while node
    if node instanceof Results
      lastOrgOffset = node.offset
      resText = node.text.substring node.contentPos
      resOrg = node
      finalIntertext = intertext
      break
    else if node instanceof Drawer
      if node.name.toLowerCase() == 'expected'
        expected = node
        lastOrgOffset = node.offset
        finalIntertext = intertext += escapeHtml node.text
      else break
    else if node instanceof Headline || node instanceof Keyword then break
    else intertext += escapeHtml node.text
    node = node.next
  if name
    nameM = name.text.match keywordRE
    codeName = "<div class='codename' contenteditable='true'><span class='hidden'>#{escapeHtml nameM[KW_BOILERPLATE]}</span><div>#{escapeHtml name.info}</div>#{escapeHtml doctext}</div>"
  else codeName = "<div class='codename' contenteditable='true'></div>"
  wrapper = "<table class='codewrapper'><tr>"
  wrapper += "<td class='code-buttons'>"
  if testCaseButton = toTestCaseButton org then wrapper += "<div>#{testCaseButton}</div>"
  if testCaseButton
    #wrapper += "<div><button class='results-indicator' onclick='Leisure.executeCode(event)' data-org-type='boundary'><i class='fa fa-gear'></i><div></div></button></div>"
    wrapper += "<div><button class='results-indicator' onclick='Leisure.executeCode(event)'><i class='fa fa-gear'></i><div></div></button></div>"
    wrapper += "<div><button class='dyntoggle-button' onclick='Leisure.toggleDynamic(event)'><span class='dyntoggle'><i class='fa fa-link'></i><i class='fa fa-unlink'></i></span></button></div>"
  if name then wrapper += "<div>#{commentButton name.info.trim()}</div>"
  wrapper += "</td><td class='code-content'>"
  wrapper += codeName
  wrapper += "<div class='hidden' data-source-lead>#{escapeHtml lead}</div>"
  #wrapper += "<div #{orgSrcAttrs org} contenteditable='true'>#{escapeHtml srcContent}</div><span class='hidden' data-org-type='boundary'>#{escapeHtml trail}</span>"
  wrapper += "<div #{orgSrcAttrs org} contenteditable='true'>#{escapeHtml srcContent}</div><span class='hidden'>#{escapeHtml trail}</span>"
  wrapper += "<span class='hidden'>#{finalIntertext}</span>" + htmlForResults resText, resOrg
  wrapper += "</td></tr></table>"
  result = contHtml + wrapper + (if name then "</div>#{commentBlock name.info.trim()}" else "</div>")
  fluff = if top.prev instanceof Source || top.prev instanceof Results then "<div class='fluff' data-newline></div>" else ''
  inner = fluff + startHtml + result
  if inFragment then inner
  else '<div>' + inner + '</div>'

updateChannels = (org)-> org instanceof Source && (org.info.match /:update *([^:]*)/)?[1]

testResult = (expected, actual)->
  if actual == '' then 'unknown'
  else if expected == actual then 'pass'
  else 'fail'

root.toggleTestCase = (evt)->
  node = codeBlockForNode evt.target
  selectPrevious node
  if node then replaceCodeBlock node, changeResultType node.textContent, (if node.getAttribute('data-org-results') == 'autotest' then 'dynamic' else 'static')

selectPrevious = (node)->
  top = topNode node
  pos = getTextPosition top, node, 0
  r = nativeRange findDomPosition top, Math.max 0, pos - 1
  sel = getSelection()
  sel.removeAllRanges()
  sel.addRange r

replaceCodeBlock = (node, text)->
  newNode = null
  restorePosition null, ->
    org = parseOrgMode text, 0, true
    org.nodeId = $(node)[0].id
    org.shared = 'code'
    newNode = $(markupNewNode org, false, true)[0]
    $(node).replaceWith(newNode)
    edited newNode
    for n in $(newNode).find('.resultscontent')
      reprocessResults n
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
  if (cur = textNodeAfter cur) && isParentOf(node, cur)
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
          e.stopPropagation()
          e.preventDefault()
          showSliderButton node, n, slideFunc
      if !done
        return createNextValueSlider node, slideFunc, cur
    createNextValueSliders node, slideFunc, cur), 1

leisureNumberSlider = (numberSpan)->
  orgParent = getOrgParent numberSpan
  orgType = orgParent.getAttribute 'data-org-results'
  computing = false
  (event, ui)->
    numberSpan.innerHTML = String(ui.value)
    if !computing && orgType in ['dynamic', 'def']
      computing = true
      doc = topNode orgParent
      selection = new SelectionDescriptor doc
      done = ->
        setTimeout (->selection.restore 0, doc), 1
        computing = false
      setTimeout (->
        if orgType == 'dynamic' then root.orgApi.executeSource parent, numberSpan.parentNode, done
        else if orgType == 'def' then root.orgApi.executeDef orgParent, done), 1

regularNumberSlider = (numberSpan)->
  Lodash.throttle ((event, ui)->
    numberSpan.innerHTML = String(ui.value)
    edited numberSpan), 20,
      leading: true
      trailing: true

recreateAstButtons = (node)->
  if !(top = $(node).closest('.codeblock')[0]) then return
  restorePosition top, ->
    $(node).find('[data-ast-offset]').remove()
    t = node.textContent
    chunk = /^[^ \n].*$/mg
    num = /(^|[^0-9.]+)([0-9][0-9.]*|\.[0-9.]+)/mg
    node.normalize()
    mchunk = chunk.exec t
    cur = node.firstChild
    curStart = 0
    while cur && mchunk
      if mchunk.index - curStart > cur.length
        curStart += cur.length
        cur = textNodeAfter cur
        continue
      cur = (if mchunk.index > curStart then cur.splitText mchunk.index - curStart else cur)
      curStart = mchunk.index
      div = document.createElement 'div'
      div.setAttribute 'class', 'ast-button'
      div.setAttribute 'contenteditable', 'false'
      div.setAttribute 'data-ast-offset', mchunk.index
      do (d = div, offset = mchunk.index)-> div.onmousedown = (e)->
        e.preventDefault()
        e.stopPropagation()
        showAst d
      if curStart == 0 then div.setAttribute 'style', 'top: 0'
      node.insertBefore div, cur
      mchunk = chunk.exec t

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

linePat = /\r?\n(?=[^ ]|$)/

redrawAst = (code, pos)->
  [button] = findDomPosition code, pos
  while (button = nodeBefore button) != code && !$(button).is '.ast-button' then
  console.log "redraw ast", button
  showAst button, true

showAst = (astButton, force)->
  offset = Number(astButton.getAttribute 'data-ast-offset')
  #if force || !replaceRelatedPresenter presenter.button, emptyPresenter
  if force || !replaceRelatedPresenter astButton, emptyPresenter
    if !astButton.firstChild then astButton.innerHTML = "<div></div>"
    text = astButton.parentNode.textContent.substring offset
    text = text.substring 0, (if m = text.match linePat then m.index else text.length)
    result = rz(L_newParseLine)(lz 0)(L_nil)(lz text)
    runMonad result, baseEnv, (ast)->
      if getType(ast) != 'parseErr'
        console.log "SIMPLIFIED: #{show lz(runMonad rz(L_simplify) lz text)}"
        try
          setShadowHtml astButton.firstChild, "<div class='#{theme ? ''} ast'>#{rz(L_wrappedTreeFor)(lz ast)(L_id)}</div>"
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
    text = node.textContent
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
  block = $("[data-org-comments=#{name}]")
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
  "<#{tag} #{orgAttrs org}#{attrs}>#{escapeHtml org.text}</#{tag}>"

htmlForResults = (text, org)->
  attr = if org?.shared then " id='#{org.nodeId}' data-shared='#{org.shared}'" else ''
  """
  <div class='coderesults' data-org-type='results'#{attr}><span class='hidden'>#+RESULTS:\n</span><div class='resultscontent'><span></span><span class='hidden'>#{escapeHtml text}</span></div></div>"""

toggleDynamic = (event)->
  block = codeBlockForNode event.target
  resType = (if !block.hasAttribute 'data-org-type' then block.firstChild else block).getAttribute 'data-org-results'
  top = topNode block
  newNode = replaceCodeBlock block, changeResultType block.textContent, (if resType == 'dynamic' then 'static' else 'dynamic')
  if resType != 'dynamic' then executeSource top, $(newNode).find('[data-org-type="source"]')[0]

nonl = (txt)-> if txt[txt.length - 1] == '\n' then txt.substring 0, txt.length - 1 else txt

createResults = (srcNode)->
  srcNode = $(srcNode).closest('.codeblock')
  if created = (srcNode && !$(srcNode).find('.coderesults').length)
    $(srcNode).find('.codewrapper').append htmlForResults ''
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
  r.startContainer.textContent[r.startOffset] == '\n' && 2))))

shouldCancelDEL = (parent, r)-> (atEnd = atTextEnd r) && crossesHidden atEnd + 1

matchLineAt = (parent, pos)->
  text = parent.textContent
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
  !(0 <= r.startOffset < r.startContainer.length) && isCollapsed (if delta < 0 then textNodeBefore else textNodeAfter) r.startContainer

bindContent = (div)->
  div.addEventListener 'drop', (e)-> root.orgApi.handleDrop e
  div.addEventListener 'mousedown', (e)->
    if replaceUnrelatedPresenter e.target, emptyPresenter
      setCurKeyBinding null
  div.addEventListener 'keydown', handleKey div
  div.addEventListener 'keyup', handleKeyup div
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true
  displaySource()

handleKey = (div)->(e)->
  root.modCancelled = false
  root.currentMatch = null
  if e.target.getAttribute 'data-view-id' then return
  curPos = -1
  c = (e.charCode || e.keyCode || e.which)
  if !addKeyPress e, c then return
  s = getSelection()
  r = (if s.rangeCount > 0 then s.getRangeAt(0) else null)
  root.currentBlockIds = blockIdsForSelection s, r
  [bound, checkMod] = findKeyBinding e, div, r
  if bound then root.modCancelled = !checkMod
  else
    checkMod = modifyingKey c, e
    root.modCancelled = false
  if String.fromCharCode(c) == 'C' && e.altKey
    root.orgApi.executeSource div, getSelection().focusNode
  else if !bound
    if modifyingKey c, e
      n = s.focusNode
      el = r.startContainer
      root.checkNewline = null
      root.modified = el
      par = el.parentNode
      #root.currentMatch = matchLine currentLine div
      root.currentMatch = lineCodeBlockType currentLine div
      if c == ENTER
        e.preventDefault()
        if n.nodeType == 3 && r.collapsed && r.startOffset == n.length && n.parentNode.getAttribute('data-org-type') == 'text'
          br = document.createTextNode('\n')
          $(br).prependTo followingSpan n.parentNode
        else r.insertNode br = document.createTextNode(checkExtraNewline r, n, div)
        r.setStart br, br.length
        r.setEnd br, br.length
        s.removeAllRanges()
        s.addRange(r)
        restorePosition br.parentNode, -> br.parentNode.normalize()
        setTimeout (->checkEnterReparse div, r), 1
      else if c == BS then backspace div, e, s, r
      else if c == DEL then del div, e, s, r
      else if el.nodeType == Node.TEXT_NODE && el.data[el.length - 1] == '\n'
        root.checkNewline = el


cancelAndReselect = (event, selection, oldRange, currentRange)->
  e.preventDefault()
  root.modCancelled = true
  if oldRange != currentRange
    selection.removeAllRanges()
    selection.addRange oldRange
  null

getCodeContainer = (node)->
  $(node).closest("[data-org-src]")[0] || $(node).find("[data-org-src]")[0]

fancyCheckSourceMod = (focus, div, currentMatch, el)->
  restorePosition null, -> checkSourceMod()

needsNewline = (el)->
  if !el then false
  else if el.nodeType == 3 then needsNewline el.parentNode
  else el.nodeType == 1 && $(el).is('[data-newline]')

bsWillDestroyParent = (r)->
  if r.startContainer.nodeType == 3 && r.startOffset == 1 && r.startContainer.data.match /^.\n?$/
    r.startContainer.parentNode.textContent == r.startContainer.data
  else false

allowEvents = true

handleMutation = (evt)->
  if allowEvents
    displaySource()

executeSource = (parent, node, cont, skipTests)->
  doc = topNode node
  [srcNode, text] = getNodeSource node
  if srcNode
    createResults srcNode
    if text.trim().length
      executeText text.trim(), propsFor(srcNode), orgEnv(parent, srcNode), ->
        cont?()
        if !skipTests then runAutotests doc
    else if r = $(srcNode).find('.resultscontent')[0] then clearResults r

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
  node.setAttribute 'data-org-test', (if node.getAttribute('data-org-expected') == $(node).find('.resultscontent').text() then 'pass' else 'fail')

reprocessResults = (node)->
  if node.firstChild.shadowRoot
    clearShadow node.firstChild
  processResults node.firstChild.nextElementSibling.textContent, node, true

processResults = (str, node, skipText)->
  if !node.firstChild.shadowRoot
    setShadowHtml node.firstChild, ''
  shadow = $(node.firstChild).shadow()[0]
  if !skipText
    node.firstChild.nextElementSibling.textContent += escapePresentationHtml(str.substring 0, str.length - 1) + str[str.length - 1]
    edited node
  classes = 'resultsline'
  if theme != null then classes = theme + ' ' + classes
  if $("body").hasClass 'bar_collapse' then classes += ' bar_collapse'
  for line in splitLines str
    if line.match /^: / then shadow.innerHTML += "<div class='#{classes}'>#{line.substring(2)}</div>"

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
  clearShadow node.firstChild
  node.firstChild.nextElementSibling.innerHTML = ''

# like orgSupport's orgEnv, but wrap the leading ': ' in hidden spans
orgEnv = (parent, node)->
  r = node
  if !$(r).is('.resultscontent') then r = $(r).find('.resultscontent')[0]
  if r
    clearResults r
    __proto__: defaultEnv
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    write: (str)-> processResults (colonify (String str)), r
    presentValue: presentValue
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
    prompt: (msg, cont)-> cont prompt rz msg
  else
    __proto__: defaultEnv
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    write: (str)-> console.log colonify str
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
    prompt: (msg, cont)-> cont prompt rz msg

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
  value = Number numberSpan.textContent
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
  if !html.leisureRendered && (txt = $(html).find("[data-content]").text()) && output = $(html).find('[data-org-html]')[0]
    if !data && name = html.getAttribute 'data-html-view' then data = getDataNamed name
    if data && txt
      try
        comp = Handlebars.compile txt
        html.leisureRendered = true
      catch err
        console.log err.stack
        return
      setShadowHtml output, comp data.yaml

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

blockViewUpdatesWhile = (links, func)->
  addChangeContextWhile blockViews: links, func

renderLink = (node, data)->
  if isPlainEditing(node) || root.changeContext.blockViews?.is(node) then return
  if name = node.getAttribute 'data-view-name'
    viewKey = "#{data.yaml.type}/#{name}"
    descriptor = "#{data._id}/#{name}"
  else
    viewKey  = data.yaml.type
    descriptor = data._id
  if root.viewTypeData[viewKey] && markup = viewMarkup[viewKey]
    markup data.yaml, $(node), false, data
  else clearShadow node
  $(node)
    .attr 'data-view-descriptor', descriptor
    .attr 'data-view-key', viewKey
    .shadow()
      .attr 'data-view-id', data._id
      .attr 'data-view-descriptor', descriptor

updateViews = (id)->
  if block = getBlock id
    for link in $("[data-view-ids~=#{id}]")
      for view in $(link).shadow().find("[data-view-block='#{id}']")
        type = $(view).attr 'data-view-type'
        viewMarkup[type] block.yaml, $(view), false, block, true, link

viewBlock = (el)->
  if id = $(el).closest('[data-view-id]').attr('data-view-id')
    getBlock id

Leisure.bindWidgets = bindWidgets = (parent)->
  link = Templating.currentViewLink
  for input in $(parent).find 'input[data-value]'
    field = input.getAttribute 'data-value'
    input.value = Templating.currentViewData[field]
    nextButton = input.getAttribute 'button'
    input.onkeyup = (e)->
      #console.log input.value
      block = viewBlock(input)
      data = block.yaml
      #data = getBlock(id).yaml
      data[field] = input.value
      blockViewUpdatesWhile $(link), -> setData block._id, data
      if nextButton && e.keyCode == 13
        e.preventDefault()
        $(rootNode(input).firstChild).find("##{nextButton}").click()

Handlebars.registerHelper 'view', (item, name, options)->
  if !options
    options = name
    name = null
  data = if typeof item == 'string'
    block = getBlockNamed item
    block?.yaml
  else
    block = null
    item
  if data?.type
    descriptor = if name then "#{data.type}/#{name}" else "#{data.type}"
    viewMarkup[descriptor]?(data, null, false, block) || ''
  else ''

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
      fixupHtml target || parent
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
    if isPlainEditing node then plainOrg.executeSource arguments...
    else
      restorePosition null, ->
        code = getCodeContainer node
        shouldRedrawAst = false
        if presenter?.astCode == code
          pos = getTextPosition code, node, 0
          if presenter.astCodeContains? pos
            shouldRedrawAst = true
          presenter = emptyPresenter
        executeSource.call this, parent, node, ->
          recreateAstButtons code
          if shouldRedrawAst then redrawAst code, pos
          if cont then cont()
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
    if prev = $("##{prevId}").closest('.slideholder') then prev.after slide
    else $("[maindoc]").prepend slide
    slide.find("##{id}")[0]
  defineView: (id)-> # define a view from a data block
    if type = root.viewIdTypes[id]
      createTemplateRenderer type, root.viewTypeData[type], true, (data, target, block, update)->
        el = if update then target else target.shadow()
        if target
          el
            .addClass(theme)
            .addClass($('body').hasClass('bar_collapse') && 'bar_collapse')
            .prepend("<style>@import 'shadow.css';</style>")
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
      dataType = type.match /([^/]*)\/?(.*)?/
      restorePosition null, ->
        for node in $("[data-yaml-type='#{dataType[1]}']")
          renderView node, dataType[2]
  deleteView: (type)->
    delete viewMarkup[type]
    for node in $("[data-view-key='#{type}']")
      clearShadow node
  applyShowHidden: ->
    for node in $('.slideholder')
      if $(node).find("[data-org-headline='1']").not("[data-property-hidden='true']").length == 0
        $(node).addClass('hidden-slide')
    applySlides()
  checkSourceMod: (div, currentMatch)->
    focus = getSelection().focusNode
    fancyCheckSourceMod focus, div, currentMatch, (if focus.nodeType == 1 then focus.firstChild else focus)
  updateBlock: (block)->
    restorePosition null, -> updateViews block._id
  updateObserver: (observerId, observerContext, yaml, block, type)->
    args = arguments
    restorePosition null, =>
      orgNotebook.updateObserver.apply this, args
      if observerContext.block.codeAttributes.view
        displayCodeView $("##{observerContext.block._id}").find('[data-code-view]')[0]
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
  for node in findOrIs $(parent), '[data-org-html]'
    setShadowHtml node, node.innerHTML
    node.innerHTML = ''
  for node in findOrIs findOrIs($(parent), "[data-lang='leisure']"), '[data-org-src]'
    recreateAstButtons node
    createValueSliders node, leisureNumberSlider
  for node in findOrIs findOrIs($(parent), "[data-lang]:not([data-lang='leisure'])"), '[data-org-src]'
    createValueSliders node, regularNumberSlider
  for node in findOrIs $(parent), '.resultscontent'
    reprocessResults node
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
  setTimeout (=>
    for node in $(parent).find("[data-code-view]")
      displayCodeView node
    for node in findOrIs $(parent), '[data-org-comments]'
      setShadowHtml node.firstElementChild, newCommentBox node.getAttribute('data-org-comments'), $(node.parentNode).find('.codeblock').attr 'id'
    ), 1

displayCodeView = (node)->
  if node
    if block = getBlock $(node).closest('[data-shared]')[0]?.id
      viewMarkup[node.getAttribute 'data-code-view']? block, $(node), true, block
      $(node).shadow().attr 'data-view-id', block._id

viewFor = (node)-> $("##{$(node).closest('[data-view-id]').attr 'data-view-id'}")

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
    parent = root.parentForElement(node)
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
  else $('head').prepend styles

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
root.blockViewUpdatesWhile = blockViewUpdatesWhile
