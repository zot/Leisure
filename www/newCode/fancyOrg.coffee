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
  getType,
  define,
  makeSyncMonad,
} = require './ast'
{
  runMonad,
  isMonad,
  escapePresentationHtml,
  unescapePresentationHtml,
} = require './runtime'
{
  keywordRE,
  KW_BOILERPLATE,
  KW_NAME,
  KW_INFO,
  srcStartRE,
  parseOrgMode,
  Headline,
  Meat,
  Keyword,
  Source,
  Results,
  ListItem,
  SimpleMarkup,
  headlineRE,
  HL_TAGS,
  parseTags,
  matchLine,
} = require './org'
{
  orgNotebook,
  parseOrgMode,
  orgAttrs,
  content,
  contentSpan,
  checkStart,
  optionalBoundary,
  boundarySpan,
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
  getOrgParent,
  getOrgType,
  executeText,
  executeDef,
  getResultsForSource,
  swapMarkup,
  modifiers,
  keyFuncs,
  defaultBindings,
  addKeyPress,
  findKeyBinding,
  invalidateOrgText,
  setCurKeyBinding,
  presentValue,
  propsFor,
  escapeHtml,
  escapeAttr,
  restorePosition,
  splitLines,
  orgSrcAttrs,
  baseEnv,
  getNodeSource,
  isDef,
  getTextPosition,
  findDomPosition,
  nativeRange,
} = require './orgSupport'
{
  redrawAllIssues,
} = require './storage'
_ = require './lodash.min'

oldRestorePosition = restorePosition
fancyOrg = null
slideMode = false
lastOrgOffset = -1
curPos = -1
emptyPresenter =
  hide: ->
  isRelated: -> false
presenter = emptyPresenter
DOCUMENT_POSITION_CONTAINED_BY = 16

root.restorePosition = restorePosition = (parent, block)->
  sel = getSelection()
  if sel?.rangeCount
    r = sel.getRangeAt 0
    slide = slideParent sel.focusNode
    slideIndex = slideOffset slide
    if slideIndex > -1
      start = getTextPosition slide, r.startContainer, r.startOffset
      end = getTextPosition slide, r.endContainer, r.endOffset
      offset = documentTop(r.startContainer) - window.pageYOffset
      block()
      newSlide = $('[data-org-headline="1"]')[slideIndex]
      if slideMode then setCurrentSlide newSlide
      if start > -1 && (r = nativeRange findDomPosition newSlide, start)
        [endContainer, endOffset] = findDomPosition newSlide, end
        r.setEnd endContainer, endOffset
        sel.removeAllRanges()
        sel.addRange r
        window.scrollTo 0, documentTop(r.startContainer) - offset
      return
  block()

replaceUnrelatedPresenter = (target, newPres)->
  if result = !presenter.isRelated target
    replacePresenter newPres
  result

replaceRelatedPresenter = (target, newPres)->
  if result = presenter.isRelated target
    replacePresenter newPres
  result

replacePresenter = (pres)->
  presenter.hide()
  presenter = pres

markupOrg = (text)->
  [node, result] = markupOrgWithNode text
  result

markupOrgWithNode = (text)->
  nodes = {}
  # ensure trailing newline -- contenteditable doesn't like it, otherwise
  if text[text.length - 1] != '\n' then text = text + '\n'
  org = parseOrgMode text
  lastOrgOffset = -1
  [org, markupNode org]

markupNode = (org)->
  if org.offset <= lastOrgOffset
    ''
  else if org instanceof Results
    pos = org.contentPos - org.offset
    text = org.text.substring pos
    "<span #{orgAttrs org}><span data-org-type='text'>#{escapeHtml org.text.substring(0, pos)}</span>#{contentSpan text}"
  else if org instanceof Keyword
    if org.name.match /^name$/i
      intertext = ''
      name = org
      src = org.next
      while src instanceof Meat && !(src instanceof Source)
        intertext += src.text
        src = src.next
      if src instanceof Source then markupSource src, name, intertext
      else defaultMarkup org
    else if org instanceof Source then markupSource org
    else defaultMarkup org
  else if org instanceof Headline then markupHeadline org
  else if org instanceof ListItem then markupListItem org
  else if org instanceof SimpleMarkup then markupSimple org
  else if content(org.text).length then defaultMarkup org
  else "<div #{orgAttrs org}>#{escapeHtml org.text}</div>"

hlStars = /^\*+ */

markupSimple = (org)->
  guts = ''
  for c in org.children
    guts += markupNode c
  text = switch org.markupType
    when 'bold' then "<b>#{guts}</b>"
    when 'italic' then "<i>#{guts}</i>"
    when 'underline' then "<span style='text-decoration: underline'>#{guts}</span>"
    when 'strikethrough' then "<span style='text-decoration: line-through'>#{guts}</span>"
    when 'code' then "<code>#{guts}</code>"
    when 'verbatim' then "<code>#{guts}</code>"
  "<span class='hidden'>#{org.text[0]}</span>#{text}<span class='hidden'>#{org.text[0]}</span>"

markupHeadline = (org)->
  match = org.text.match headlineRE
  start = "#{org.text.substring 0, org.text.length - (match?[HL_TAGS] ? '').length - 1}".trim()
  if org.text[org.text.length - 1] == '\n'
    tags = escapeHtml org.text.substring start.length, org.text.length - 1
    last = '\n'
  else
    tags = escapeHtml org.text.substring start.length
    last = ''
  if starsM = start.match hlStars
    stars = start.substring 0, starsM[0].length
    start = start.substring stars.length
  else stars = ''
  "<div #{orgAttrs org}><span class='hidden'>#{stars}</span><span data-org-type='text'><span data-org-type='text-content'>#{escapeHtml start}</span><span class='tags'>#{tags}</span>#{last}</span>#{markupGuts org, checkStart start, org.text}</div>"

markupSource = (org, name, intertext)->
  srcContent = org.content
  lead = org.text.substring 0, org.contentPos - org.offset
  trail = org.text.substring org.contentPos - org.offset + org.content.length
  (if isHtml org then markupHtml else markupLeisure) org, name, intertext, srcContent, lead, trail

isHtml = (org)-> org.info.match /^ *html($| )/

markupHtml = (org, name, intertext, content, lead, trail)->
  "<span class='hidden'>#{escapeHtml (name?.text ? '') + (intertext ? '') + org.text}</span><span data-org-html='true'>#{content}</span>"

markupLeisure = (org, name, intertext, content, lead, trail)->
  lastOrgOffset = org.offset
  if name
    nameM = name.text.match keywordRE
    codeBlock = " data-org-codeblock='#{escapeAttr name.info.trim()}'><div class='codename'><span class='hidden'>#{escapeHtml nameM[KW_BOILERPLATE]}</span><div><larger><b>#{escapeHtml name.info}</b></larger></div>#{escapeHtml intertext}</div>"
  else codeBlock = ">"
  html = "<div class='codeblock' #{orgAttrs org}#{codeBlock}<div class='hidden'>#{escapeHtml lead}</div>"
  wrapper = "<table class='codewrapper'><tr><td><div #{orgSrcAttrs org}>#{escapeHtml content}</div><span class='hidden' data-org-type='boundary'>#{escapeHtml trail}</span>"
  res = org.next
  intertext = ''
  while res && !(res instanceof Results) && !(res instanceof Keyword)
    intertext += res.text
    res = res.next
  if res instanceof Results
    lastOrgOffset = res.offset
    pos = res.contentPos - res.offset
    if intertext then html += "<div class='hidden' data-org-type='boundary'>#{escapeHtml(intertext)}</div>"
    wrapper += htmlForResults res.text.substring pos
  else wrapper += htmlForResults ''
  wrapper += "</td></tr></table>"
  html + wrapper + (if name then "#{commentButton name.info.trim()}</div>#{commentBlock name.info.trim()}" else "</div>")

markupListItem = (org)->
#  """#{if !(org.prev instanceof ListItem) || org.prev.level < org.level then '<ul>' else ''
#  }<li #{orgAttrs org} data-org-listlevel=#{
#    org.level
#  }#{
#    if org.checked? then 'data-org-checked="' + org.checked + '"' else ''
#  }><span class='hidden'>#{
#    escapeHtml org.text.substring 0, org.contentOffset
#  }</span><span>#{escapeHtml org.text.substring org.contentOffset}</span></li>#{
#    if !(org.next instanceof ListItem) || org.next.level < org.level then '</ul>' else ''
#  }"""
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
  }</span><span>#{escapeHtml org.text.substring org.contentOffset}</span></li>#{
    eatListItem org
  }#{if end then '</ul>' else ''}"""

eatListItem = (org)->
  item = org
  result = ''
  while ((org = org.next) instanceof Meat) && !(org instanceof ListItem)
    result += markupNode org
    lastOrgOffset = org.offset
  result

unwrap = (node)->
  parent = node.parentNode
  if parent
    while node.firstChild?
      parent.insertBefore node.firstChild, node
    parent.removeChild node

recreateAstButtons = (parent, node)->
  restorePosition parent, ->
    for button in $(node).find('.ast-button')
      button.remove()
    for num in $(node).find('.org-num')
      unwrap num
    t = node.textContent
    if t && t[t.length - 1] != '\n' then node.textContent = t += '\n'
    chunk = /^[^ \n].*$/mg
    num = /(^|[^0-9.]+)([0-9][0-9.]*|\.[0-9.]+)/mg
    node.normalize()
    rest = t
    mchunk = chunk.exec t
    mnum = num.exec t
    cur = node.firstChild
    curStart = 0
    while cur && (mchunk || mnum)
      if mchunk && (!mnum || mchunk.index <= mnum.index + mnum[1].length)
        cur = (if mchunk.index > curStart then cur.splitText mchunk.index - curStart else cur)
        curStart = mchunk.index
        div = document.createElement 'div'
        div.setAttribute 'class', 'ast-button'
        div.setAttribute 'contenteditable', 'false'
        do (d = div, offset = mchunk.index)-> div.onmousedown = (e)-> showAst e, d, offset
        if curStart == 0 then div.setAttribute 'style', 'top: 0'
        node.insertBefore div, cur
        mchunk = chunk.exec t
        continue
      if mnum && (!mchunk || mnum.index + mnum[1].length <= mchunk.index)
        numStart = mnum.index + mnum[1].length
        mid = (if numStart > curStart then cur.splitText numStart - curStart else cur)
        cur = mid.splitText mnum[2].length
        curStart = mnum.index + mnum[0].length
        numberSpan = document.createElement 'span'
        numberSpan.appendChild mid
        numberSpan.classList.add 'org-num'
        node.insertBefore numberSpan, cur
        node.normalize()
        do (n = numberSpan)-> n.onmousedown = (e)->
          e.stopPropagation()
          e.preventDefault()
          showSliderButton node, n
        mnum = num.exec t

newCodeContent = (name, content)->
  parent = $("[data-org-codeblock='#{name}']")
  if node = parent.find('[data-org-src]')[0]
    node.innerHTML = escapeHtml content
    recreateAstButtons parent, node

define 'newCodeContent', lz (name)->$F(arguments, (content)->
  makeSyncMonad (env, cont)->
    newCodeContent rz(name), rz(content)
    cont rz L_true)

isOrContains = (parent, node)->
  (n = parent.compareDocumentPosition(node) & DOCUMENT_POSITION_CONTAINED_BY) || n == 0

showAst = (evt, astButton, offset)->
  evt.preventDefault()
  evt.stopPropagation()
  if !replaceRelatedPresenter presenter.button, emptyPresenter
    if !astButton.firstChild then astButton.innerHTML = "<div></div>"
    text = astButton.parentNode.textContent
    nl = text.indexOf '\n', offset + 1
    text = text.substring offset, (if nl < 0 then text.length else nl)
    result = rz(L_newParseLine)(lz 0)(L_nil)(lz text)
    runMonad result, baseEnv, (ast)->
      if getType(ast) != 'parseErr'
        console.log "SIMPLIFIED: #{show lz(runMonad rz(L_simplify) lz text)}"
        try
          setShadowHtml astButton.firstChild, "<div class='ast'>#{rz(L_wrappedTreeFor)(lz ast)(L_id)}</div>"
          #astButton.firstChild.innerHTML = "<div class='ast'>#{rz(L_wrappedTreeFor)(lz ast)(L_id)}</div>"
          replacePresenter
            hide: -> astButton.firstChild.remove()
            isRelated: (node)-> isOrContains astButton, node
            button: astButton
        catch err
          console.log "Error showing AST: #{err.stack}"

show = (obj)-> rz(L_show)(lz obj)

commentButton = (name)->
  "<button class='comment-button' onclick='Leisure.toggleComment(\"#{escapeAttr name}\")' contenteditable='false' data-org-commentcount='0'><img src='icons/monotone_talk_chat_speech.png'><span></span></button>"

commentBlock = (name)->
  "<div class='comments' data-org-comments='#{escapeAttr name}'><div></div></div>"

toggleComment = (name)->
  block = $("[data-org-comments=#{name}]")
  if block.hasClass 'showcomments' then block.removeClass 'showcomments'
  else
    block.addClass 'showcomments'
    $("[data-org-codeblock='#{escapeAttr name}'] button.comment-button").removeClass 'new-comments'

addComment = (name)-> alert('Add comment not implemented, yet')

defaultMarkup = (org)-> "<span #{orgAttrs org}>#{escapeHtml org.text}</span>"

htmlForResults = (text)-> """
  </td><td><div class='results-indicator' data-org-type='boundary'><span></span></div></td><td><div class='coderesults' data-org-type='results'><span class='hidden'>#+RESULTS:
  </span><div class='resultscontent'><span></span><span class='hidden'>#{escapeHtml text}</span></div></div>"""

createResults = (srcNode)->
  while srcNode && !srcNode.classList?.contains 'codeblock'
    srcNode = srcNode.parentNode
  if created = srcNode && !$(srcNode).find('.coderesults').length
    $(srcNode).find('.codewrapper').append htmlForResults ''
  created

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

currentTextPosition = (parent, r)->
  if curPos > -1 then curPos
  else curPos = getTextPosition parent, r || getSelection().getRangeAt(0)

crossesHidden = (delta)->
  r = getSelection().getRangeAt 0
  !(0 <= r.startOffset < r.startContainer.length) && isCollapsed (if delta < 0 then textNodeBefore else textNodeAfter) r.startContainer

bindContent = (div)->
  div.addEventListener 'mousedown', (e)->
    if replaceUnrelatedPresenter e.target, emptyPresenter
      setCurKeyBinding null
  div.addEventListener 'keydown', handleKey div
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true
  displaySource()

handleKey = (div)->(e)->
  curPos = -1
  c = (e.charCode || e.keyCode || e.which)
  if !addKeyPress e, c then return
  s = getSelection()
  r = s.getRangeAt(0)
  [bound, checkMod] = findKeyBinding e, div, r
  if bound then cancelled = !checkMod
  else
    checkMod = modifyingKey c
    cancelled = false
  if String.fromCharCode(c) == 'C' && e.altKey
    root.orgApi.executeSource div, getSelection().focusNode
  else if !bound #&& !slideMode
    if modifyingKey c
      n = s.focusNode
      el = r.startContainer
      par = el.parentNode
      currentMatch = matchLine currentLine div
      if c == ENTER
        e.preventDefault()
        if n.nodeType == 3 && r.collapsed && r.startOffset == n.length && n.parentNode.getAttribute('data-org-type') == 'text'
          br = document.createTextNode('\n')
          $(br).prependTo followingSpan n.parentNode
          r.setStart br, br.length
          r.setEnd br, br.length
        else
          r.insertNode br = document.createTextNode(checkExtraNewline r, n, div)
          br.parentNode.normalize()
        r.collapse()
        s.removeAllRanges()
        s.addRange(r)
        setTimeout (->checkEnterReparse div, r), 1
      else if c in [BS, DEL]
        if (c == BS && shouldCancelBS div, r) || (c == DEL && shouldCancelDEL div, r)
          e.preventDefault()
          return
        else if c == BS && bsWillDestroyParent r
          e.preventDefault()
          el.data = el.data.substring 1
      else if el.nodeType == 3
        setTimeout (->
          #if !el.nextSibling && el.data[el.data.length - 1] != '\n' #&& el.data.length == 1
          #  restorePosition el.parentNode, ->
          #    el.data += '\n'
          #    el.parentNode.normalize()
          fancyCheckSourceMod n, div, currentMatch, el
        ), 1
        return
  if !cancelled && checkMod
    if (getOrgType getOrgParent el) == 'boundary' then needsReparse = true
    setTimeout (->fancyCheckSourceMod n, div, currentMatch), 1

getCodeContainer = (node)->
  node && ((node.getAttribute?('data-org-src') && node) || (!node.getAttribute?('data-org-type') && getCodeContainer node.parentNode))

fancyCheckSourceMod = (focus, div, currentMatch, el)->
  if code = getCodeContainer focus then recreateAstButtons div, code
  else if el && !el.nextSibling && el.data[el.data.length - 1] != '\n' #&& el.data.length == 1
    restorePosition el.parentNode, ->
      el.data += '\n'
      el.parentNode.normalize()
  checkSourceMod div, currentMatch

bsWillDestroyParent = (r)->
  if r.startContainer.nodeType == 3 && r.startOffset == 1 && r.startContainer.data.match /^.\n?$/
    r.startContainer.parentNode.textContent == r.startContainer.data
  else false

allowEvents = true

handleMutation = (evt)->
  if allowEvents
    invalidateOrgText()
    displaySource()

executeSource = (parent, node, cont)->
  [srcNode, text] = getNodeSource node
  if srcNode
    createResults srcNode
    if text.trim().length
      executeText text.trim(), propsFor(srcNode), orgEnv(parent, srcNode), cont

reprocessResults = (node)->
  if node.firstChild.shadowRoot
    node.firstChild.shadowRoot.innerHTML = ''
    node.firstChild.shadowRoot.applyAuthorStyles = true
  processResults node.firstChild.nextElementSibling.textContent, node, true

processResults = (str, node, skipText)->
  if !node.firstChild.shadowRoot
    node.firstChild.createShadowRoot()
    node.firstChild.shadowRoot.applyAuthorStyles = true
  shadow = node.firstChild.shadowRoot
  if !skipText then node.firstChild.nextElementSibling.textContent += escapePresentationHtml(str.substring 0, str.length - 1) + str[str.length - 1]
  for line in splitLines str
    if line.match /^: / then shadow.innerHTML += "<div class='resultsline'>#{line.substring(2)}</div>"

setShadowHtml = (holder, html)->
  if !(el = holder.shadowRoot)
    el = holder.createShadowRoot()
    el.applyAuthorStyles=true
  el.innerHTML = html

redrawIssue = (issue)->
  issueName = issue.leisureName
  if (name = $("[data-org-comments='#{issueName}']")).length
    count = issue.comments.length + 1
    button = $("[data-org-codeblock='#{issueName}'] button.comment-button")
    if button.attr('data-org-commentcount') != count
      button.attr 'data-org-commentcount', count
      button.addClass 'new-comments'
    setShadowHtml button.find('span')[0], count
    setShadowHtml name[0].firstChild, "#{commentHtml issue, 'main'}#{(commentHtml c, 'added' for c in issue.comments).join ''}#{newCommentBox issueName}"

commentHtml = (comment, type)->
  "<div class='commentbox'><img src='http://gravatar.com/avatar/#{comment.user.gravatar_id}?s=48'><div class='#{type}'>#{comment.body}</div></div>"

newCommentBox = (name)->
  "<textarea pseudo='x-new-comment'></textarea><br><button onclick='Leisure.addComment(\"#{name}\")'>Add Comment</button>"

colonify = (str)-> ': ' + (str.replace /[\n\\]/g, (c)-> if c == '\n' then '\\n' else '\\\\') + '\n'

clearResults = (node)->
  if (r = node.firstChild.shadowRoot) then r.innerHTML = ''
  node.firstChild.nextElementSibling.innerHTML = ''

# like orgSupport's orgEnv, but wrap the leading ': ' in hidden spans
orgEnv = (parent, node)->
  #r = getResultsForSource parent, node
  r = node
  if !$(r).is('.resultscontent') then r = $(r).find('.resultscontent')[0]
  if r
    clearResults r
    __proto__: defaultEnv
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    write: (str)-> processResults (colonify (String str)), r
    presentValue: presentValue
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
  else
    __proto__: defaultEnv
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    write: (str)-> console.log colonify str
    newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"

#################
# Value sliders
#################

hideSlider = (numberSpan)-> replaceRelatedPresenter numberSpan, emptyPresenter

showSliderButton = (parent, numberSpan)->
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
  orgParent = getOrgParent numberSpan
  orgType = orgParent.getAttribute 'data-org-results'
  computing = false
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
    slide: (event, ui)->
      numberSpan.innerHTML = String(ui.value)
      if !computing && orgType in ['dynamic', 'def']
        computing = true
        done = -> computing = false
        setTimeout (->
          if orgType == 'dynamic' then root.orgApi.executeSource parent, numberSpan.parentNode, done
          else if orgType == 'def' then root.orgApi.executeDef orgParent, done), 1
    value: value
  parent.insertBefore d, numberSpan
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

setCurrentSlide = (element)->
  $('.currentSlide').removeClass 'currentSlide'
  $(element).addClass 'currentSlide'

nextSlide = ->
  ns = null
  if slide = $('.currentSlide')[0]
    if $(slide.nextElementSibling).has('[data-org-headline="1"]')
      ns = slide.nextElementSibling
  if !ns then ns = $('[data-org-headline="1"]')[0]
  setCurrentSlide ns

prevSlide = ->
  ps = null
  if slide = $('.currentSlide')[0]
    if $(slide.previousElementSibling).has('[data-org-headline="1"]')
      ps = slide.previousElementSibling
  if !$(ps).is('[data-org-headline="1"]')
    s = $('[data-org-headline="1"]')
    ps = s[s.length - 1]
  if ps then setCurrentSlide ps

showSlides = ->
  setCurrentSlide $('[data-org-headline="1"]')[0]
  document.body.classList.add 'slides'

slideParent = (node)->
  while node && !$(node).is '[data-org-headline="1"]'
    node = node.parentNode
  node

documentTop = (node)->
  top = 0
  while node
    if node.tagName
      top = top + node.offsetTop
      node = node.offsetParent
    else node = node.parentNode
  top

hideSlides = ->
  document.body.classList.remove 'slides'

slideBindings =
  'LEFT': (e, parent, r)->
    e.preventDefault()
    prevSlide()
    false
  'RIGHT': (e, parent, r)->
    e.preventDefault()
    nextSlide()
    false

toggleSlides = ->
  slideMode = !slideMode
  fancyOrg.bindings = (if slideMode then slideBindings else defaultBindings)
  if slideMode
    restorePosition null, ->
      $('body').addClass 'slides'
      #setTimeout (->nextSlide()), 500
      #setTimeout (->nextSlide()), 1
      nextSlide()
  else $('body').removeClass 'slides'

define 'toggleSlides', lz makeSyncMonad (env, cont)->
  toggleSlides()
  cont rz L_true

slideOffset = (slide)->
  a = []
  a.push $("[data-org-headline='1']")...
  a.indexOf slide ? $('.currentSlide')[0]

setSlideAt = (index)-> setCurrentSlide $("[data-org-headline='1']")[index]

restoreSlide = (block)->
  if !slideMode then block()
  else
    offset = slideOffset()
    block()
    setSlideAt offset

fancyOrg =
  __proto__: orgNotebook
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  installOrgDOM: (parent, orgNode, orgText)->
    @parent = parent
    restorePosition parent, ->
      parent.setAttribute 'class', 'org-fancy'
      orgNotebook.installOrgDOM parent, orgNode, orgText
      for node in $('[data-org-html]')
        setShadowHtml node, node.innerHTML
        node.innerHTML = ''
      for node in $('[data-org-src]')
        recreateAstButtons parent, node
      for node in $('.resultscontent')
        reprocessResults node
      setTimeout (=>
        #for node in $('[data-org-results]')
        #  switch $(node).attr('data-org-results').toLowerCase()
        #    when 'def' then @executeDef node
        for node in $('[data-org-comments]')
          setShadowHtml node.firstElementChild, newCommentBox node.getAttribute 'data-org-comments'
        redrawAllIssues()
        ), 1
  executeSource: executeSource
  executeDef: executeDef
  createResults: createResults
  bindings: defaultBindings
  redrawIssue: (i)-> redrawIssue i
  leisureButton: ->
    restorePosition @parent, ->
      toggleSlides()
      if slideMode then setTimeout (-> $('[maindoc]').focus()), 1
      else swapMarkup()

root.fancyOrg = fancyOrg
root.toggleComment = toggleComment
root.addComment = addComment
root.recreateAstButtons = recreateAstButtons
