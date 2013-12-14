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
} = require './ast'
{
  runMonad,
  isMonad,
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
  orgEnv,
  executeText,
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
} = require './orgSupport'
{
  redrawAllIssues,
} = require './storage'
_ = require './lodash.min'

lastOrgOffset = -1
curPos = -1

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
  else if content(org.text).length then defaultMarkup org
  else "<div #{orgAttrs org}>#{escapeHtml org.text}</div>"

markupHeadline = (org)->
  "<div #{orgAttrs org} data-org-headline='#{escapeAttr org.level}'><span data-org-type='text'>#{escapeHtml org.text}</span>#{markupGuts org, checkStart start, org.text}</div>"

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
  html = "<div class='codeblock' #{orgAttrs org}#{codeBlock}<div class='hidden'>#{escapeHtml lead}</div><div class='codewrapper'><div class='codecontent'>#{escapeHtml content}</div><span class='hidden' data-org-type='boundary'>#{escapeHtml trail}</span>"
  res = org.next
  intertext = ''
  while res && !(res instanceof Results) && !(res instanceof Keyword)
    intertext += res.text
    res = res.next
  if res instanceof Results
    lastOrgOffset = res.offset
    pos = res.contentPos - res.offset
    html += "#{if intertext then "<div class='hidden' data-org-type='boundary'>" + escapeHtml(intertext) + "</div>" else ''}<div class='results-indicator' data-org-type='boundary'><span></span></div><div class='coderesults' #{orgAttrs res}><span class='hidden'>#{escapeHtml res.text.substring(0, pos)}</span><div>#{reprocessResults res.text.substring pos}</div></div>"
  html + (if name then "</div>#{commentButton name.info.trim()}</div>#{commentBlock name.info.trim()}" else "</div></div>")

recreateAstButtons = (node)->
  restorePosition node, ->
    for button in $(node).find('.ast-button')
      button.remove()
    t = node.textContent
    r = /^[^\n ]/gm
    node.normalize()
    cur = node.firstChild
    prev = 0
    while m = r.exec t
      cur = cur.splitText m.index - prev
      prev = m.index
      div = document.createElement 'div'
      div.setAttribute 'class', 'ast-button'
      div.setAttribute 'contenteditable', 'false'
      do (d = div, offset = m.index)-> div.onclick = (e)-> showAst d, offset
      if prev == 0 then div.setAttribute 'style', 'top: 0'
      node.insertBefore div, cur

showAst = (astButton, offset)->
  if !astButton.firstChild
    astButton.innerHTML = "<div></div>"
  console.log "Clicked ast button at offset #{offset}"
  text = astButton.parentNode.textContent
  nl = text.indexOf '\n', offset + 1
  text = text.substring offset, (if nl < 0 then text.length else nl)
  result = rz(L_newParseLine)(lz 0)(L_nil)(lz text)
  runMonad result, baseEnv, (ast)->
    if getType(ast) != 'parseErr'
      console.log "SIMPLIFIED: #{show lz(runMonad rz(L_simplify) lz text)}"
      try
        setShadowHtml astButton.firstChild, rz(L_wrappedTreeFor)(lz ast)(L_id)
        ### --- replace current presenter with astButton
      catch err

show = (obj)-> rz(L_show)(lz obj)

commentButton = (name)->
  "<button class='comment-button' onclick='Leisure.toggleComment(\"#{escapeAttr name}\")' contenteditable='false' data-org-commentcount='0'><img src='icons/monotone_talk_chat_speech.png'><span></span></button>"

commentBlock = (name)->
  "<div class='comments' data-org-comments='#{escapeAttr name}'><div></div></div>"

astButton = (name)->
  "<button class='ast-button' onclick='Leisure.toggleAst(\"#{escapeAttr name.info.trim()}\")' contenteditable='false'><img src='icons/monotone_groups.png'></button>"

toggleComment = (name)->
  block = $("[data-org-comments=#{name}]")
  if block.hasClass 'showcomments' then block.removeClass 'showcomments'
  else
    block.addClass 'showcomments'
    $("[data-org-codeblock='#{escapeAttr name}'] button.comment-button").removeClass 'new-comments'

addComment = (name)-> console.log "ADD A COMMENT FOR #{name}"

defaultMarkup = (org)-> "<span #{orgAttrs org}>#{escapeHtml org.text}</span>"

createResults = (srcNode)->
  while srcNode && !srcNode.classList.contains 'codeblock'
    srcNode = srcNode.parentNode
  if created = srcNode && !$(srcNode).find('.coderesults').length
    $(srcNode).find('.codewrapper').append """
      <div class="results-indicator" data-org-type="boundary"><span></span></div><div class="coderesults" data-org-type="results"><span class="hidden">#+RESULTS:
      </span><div>
      </div></div>"""
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
  div.addEventListener 'mousedown', (e)-> setCurKeyBinding null
  div.addEventListener 'keydown', (e)->
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
    if !bound
      if modifyingKey c
        n = s.focusNode
        el = r.startContainer
        par = el.parentNode
        currentMatch = matchLine currentLine div
        if String.fromCharCode(c) == 'C' && e.altKey
          root.orgApi.executeSource div, getSelection().focusNode
        else if c == ENTER
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
            if el.data[el.data.length - 1] != '\n'
              restorePosition el.parentNode, -> el.data += '\n'
            fancyCheckSourceMod n, div, currentMatch), 1
          return
    if !cancelled && checkMod
      if (getOrgType getOrgParent el) == 'boundary' then needsReparse = true
      setTimeout (->fancyCheckSourceMod n, div, currentMatch), 1
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true
  displaySource()

isCodeContainer = (node)-> node.classList.contains 'codecontent'

fancyCheckSourceMod = (focus, div, currentMatch)->
  if isCodeContainer focus.parentNode then recreateAstButtons focus.parentNode

bsWillDestroyParent = (r)->
  if r.startContainer.nodeType == 3 && r.startOffset == 1 && r.startContainer.data.match /^.\n?$/
    r.startContainer.parentNode.textContent == r.startContainer.data
  else false

handleMutation = (evt)->
  invalidateOrgText()
  displaySource()

executeSource = (parent, node)->
  while node && !node.classList?.contains 'codecontent'
    node = node.parentNode
  if node
    createResults node
    txt = node.textContent
    if txt.trim().length then executeText node.textContent, propsFor(node), orgEnv parent, node

executeDef = (node)->
  while node && !node.hasAttribute 'data-org-results'
    node = node.parentNode
  if node then executeText $(node).find('.codecontent')[0].firstChild.textContent, propsFor(node), baseEnv

reprocessResults = (str)-> escapeHtml(str).replace /(^|\n): /g, '$1<span class="hidden">: </span>'

processResults = (str)->
  if str
    str = String str
    if str[str.length - 1] == '\n' then str = str.substring 0, str.length - 1
    "<span class='hidden'>: </span>#{str.replace /\n/g, '\n<span class="hidden">: </span>'}\n"
  else str

setShadowHtml = (holder, html)->
  if !(el = holder.shadowRoot)
    el = holder.createShadowRoot()
    el.applyAuthorStyles=true
  el.innerHTML = html

redrawIssue = (issue)->
  issueName = issue.leisureName
  if (name = $("[data-org-comments='#{issueName}']")).length
    console.log "Showing comment button for #{issueName}"
    count = issue.comments.length + 1
    button = $("[data-org-codeblock='#{issueName}'] button.comment-button")
    if button.attr('data-org-commentcount') != count
      button.attr 'data-org-commentcount', count
      button.addClass 'new-comments'
    setShadowHtml button.find('span')[0], count
    console.log "first gravatar: #{issue.comments[0].gravatar_id}"
    setShadowHtml name[0].firstChild, "#{commentHtml issue, 'main'}#{(commentHtml c, 'added' for c in issue.comments).join ''}#{newCommentBox issueName}"

commentHtml = (comment, type)->
  "<div class='commentbox'><img src='http://gravatar.com/avatar/#{comment.user.gravatar_id}?s=48'><div class='#{type}'>#{comment.body}</div></div>"

newCommentBox = (name)->
  "<textarea pseudo='x-new-comment'></textarea><br><button onclick='Leisure.addComment(\"#{name}\")'>Add Comment</button>"

# like orgSupport's orgEnv, but wrap the leading ': ' in hidden spans
orgEnv = (parent, node)->
  r = getResultsForSource parent, node
  if r
    r.innerHTML = ''
    __proto__: defaultEnv
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    write: (str)-> r.innerHTML += processResults str
    presentValue: presentValue
  else
    __proto__: defaultEnv
    readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
    write: (str)-> console.log ": #{str.replace /\n/g, '\n: '}\n"

baseEnv =
  __proto__: defaultEnv
  readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
  write: (str)-> console.log processResults str

fancyOrg =
  __proto__: orgNotebook
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  installOrgDOM: (parent, orgNode, orgText)->
    orgNotebook.installOrgDOM parent, orgNode, orgText
    for node in $('[data-org-html]')
      console.log "HTML SRC: ", node, "TEXT: #{node.getAttribute 'data-org-html'}"
      setShadowHtml node, node.innerHTML
      node.innerHTML = ''
    for node in $('.codecontent')
      recreateAstButtons node
    setTimeout (=>
      for node in $('[data-org-results]')
        switch $(node).attr('data-org-results').toLowerCase()
          when 'dynamic' then @executeSource parent, $(node).find('.codecontent')[0].firstChild
          when 'def' then @executeDef node
      for node in $('[data-org-comments]')
        setShadowHtml node.firstElementChild, newCommentBox node.getAttribute 'data-org-comments'
      redrawAllIssues()
      ), 1
  executeSource: executeSource
  executeDef: executeDef
  createResults: createResults
  bindings: defaultBindings
  redrawIssue: (i)-> redrawIssue i

root.fancyOrg = fancyOrg
root.toggleComment = toggleComment
root.addComment = addComment
root.recreateAstButtons = recreateAstButtons
