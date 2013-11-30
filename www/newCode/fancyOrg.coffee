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

borderRE = /[\n]+$/
makeBoundary = (node)->
  nls = node.text.match borderRE
  if nls then "<div class='boundary'>#{nls[0]}</div>" else ""

markupNode = (org)->
  if org.offset <= lastOrgOffset
    ''
  else if org instanceof Results
    pos = org.contentPos - org.offset
    text = org.text.substring pos
    "<span #{orgAttrs org}><span data-org-type='text'>#{org.text.substring(0, pos)}</span>#{contentSpan text}"
  else if org instanceof Keyword
    if org.name.match /name/i
      intertext = ''
      name = org
      src = org.next
      while src instanceof Meat && !(src instanceof Source)
        intertext += src.text
        src = src.next
      if src instanceof Source
        lastOrgOffset = src.offset
        nameM = name.text.match keywordRE
        srcM = src.text.match srcStartRE
        srcContent = src.content
        srcLead = src.text.substring 0, src.contentPos - src.offset
        srcTrail = src.text.substring src.contentPos - src.offset + src.content.length
        html = "<div class='codeblock' #{orgAttrs src} data-org-codeblock='#{name.info.trim()}'><div class='codename'><span class='hidden'>#{nameM[KW_BOILERPLATE]}</span><div><larger><b>#{name.info}</b></larger></div>#{intertext}</div><div class='hidden'>#{srcLead}</div><div class='codewrapper'><div class='codecontent'>#{srcContent}<span class='hidden' data-org-type='boundary'>#{srcTrail}</span></div>"
        res = src.next
        intertext = ''
        while res && !(res instanceof Results) && !(res instanceof Keyword)
          intertext += res.text
          res = res.next
        if res instanceof Results
          lastOrgOffset = res.offset
          pos = res.contentPos - res.offset
          html += "#{if intertext then "<div class='hidden' data-org-type='boundary'>" + intertext + "</div>" else ''}<div class='results-indicator' data-org-type='boundary'><span></span></div><div class='coderesults' #{orgAttrs res}><span class='hidden'>#{res.text.substring(0, pos)}</span><div>#{reprocessResults res.text.substring pos}</div></div>"
        html + "</div>#{commentButton name.info.trim()}</div><div class='comments' data-org-comments='#{name.info.trim()}'><div></div></div>"
      else defaultMarkup org
    else defaultMarkup org
  else if org instanceof Headline then "<span #{orgAttrs org}><span data-org-type='text'>#{org.text}</span>#{markupGuts org, checkStart start, org.text}</span>"
  else if content(org.text).length then defaultMarkup org
  else "<div #{orgAttrs org}>#{org.text}</div>"

commentButton = (name)->
  "<button class='comment-button' onclick='Leisure.toggleComment(\"#{name}\")' contenteditable='false'><img src='icons/monotone_talk_chat_speech.png'></button>"

astButton = (name)->
  "<button class='ast-button' onclick='Leisure.toggleAst(\"#{name.info.trim()}\")' contenteditable='false'><img src='icons/monotone_groups.png'></button>"

toggleComment = (name)->
  block = $("[data-org-comments=#{name}]")
  if block.hasClass 'showcomments' then block.removeClass 'showcomments'
  else block.addClass 'showcomments'

defaultMarkup = (org)-> "<span #{orgAttrs org}>#{org.text}</span>"

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
  s = rangy.getSelection()
  r = s.getRangeAt 0
  if delta < 0 then r.moveStart 'character', delta else r.moveEnd 'character', delta
  if r.startContainer == r.endContainer then false
  else
    for n in r.getNodes()
      if r.containsNode(n) && isCollapsed n then return true
    false

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
        el = r.startContainer
        par = el.parentNode
        n = s.focusNode
        currentMatch = matchLine currentLine div
        if c == ENTER
          e.preventDefault()
          if ! checkCollapsed n, 1
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
          else return
        else if c in [BS, DEL]
          if (c == BS && shouldCancelBS div, r) || (c == DEL && shouldCancelDEL div, r)
            e.preventDefault()
            return
          else if c == BS && bsWillDestroyParent r
            e.preventDefault()
            el.data = el.data.substring 1
        else if el.nodeType == 3 && el.data == '\n'
          setTimeout (->
            if el.data[el.data.length - 1] != '\n'
              el.data += '\n'
              sel = getSelection()
              r = sel.getRangeAt 0
              r.setStart el, 1
              r.setEnd el, 1
              sel.removeAllRanges()
              sel.addRange r
            checkSourceMod div, currentMatch), 1
          return
    if !cancelled && checkMod
      if (getOrgType getOrgParent el) == 'boundary' then needsReparse = true
      setTimeout (->checkSourceMod div, currentMatch), 1
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true
  displaySource()

bsWillDestroyParent = (r)->
  if r.startContainer.nodeType == 3 && r.startOffset == 1 && r.startContainer.data.match /^.\n?$/
    r2 = rangy.createRangyRange()
    r2.selectNodeContents r.startContainer.parentNode
    r2.text() == r.startContainer.data
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
    if txt.trim().length then executeText node.textContent, orgEnv parent, node
    else orgEnv(parent, node)

executeDef = (node)->
  while node && !node.hasAttribute 'data-org-results'
    node = node.parentNode
  if node then executeText $(node).find('.codecontent')[0].firstChild.textContent, baseEnv

reprocessResults = (str)-> str.replace /(^|\n): /g, '$1<span class="hidden">: </span>'

processResults = (str)->
  if str
    if str[str.length - 1] == '\n' then str = str.substring 0, str.length - 1
    "<span class='hidden'>: </span>#{str.replace /\n/g, '\n<span class="hidden">: </span>'}\n"
  else str

redrawIssue = (issue)->
  issueName = issue.title.trim()
  if (name = $("[data-org-comments='#{issueName}']")).length
    holder = name[0].firstChild
    if !(nameEl = holder.shadowRoot)
      nameEl = holder.createShadowRoot()
      root.applyAuthorStyles=true
    console.log "first gravatar: #{issue.comments[0].gravatar_id}"
    nameEl.innerHTML = "#{commentHtml issue, 'main'}#{(commentHtml c, 'added' for c in issue.comments).join ''}"

commentHtml = (comment, type)->
  "<div class='commentbox'><img src='http://gravatar.com/avatar/#{comment.user.gravatar_id}?s=48'><div class='#{type}'>#{comment.body}</div></div>"

# like orgSupport's orgEnv, but wrap the leading ': ' in hidden spans
orgEnv = (parent, node)->
  r = getResultsForSource parent, node
  if r
    r.innerHTML = ''
    write: (str)-> r.innerHTML += processResults str
    __proto__: defaultEnv
  else
    write: (str)-> console.log ": #{str.replace /\n/g, '\n: '}\n"
    __proto__: defaultEnv

baseEnv =
  write: (str)-> console.log processResults str
  __proto__: defaultEnv

fancyOrg =
  __proto__: orgNotebook
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  installOrgDOM: (parent, orgNode, orgText)->
    orgNotebook.installOrgDOM parent, orgNode, orgText
    setTimeout (=>
      for node in $('[data-org-results]')
        switch $(node).attr('data-org-results').toLowerCase()
          when 'dynamic' then @executeSource parent, $(node).find('.codecontent')[0].firstChild
          when 'def' then @executeDef node), 1
    redrawAllIssues()
  executeSource: executeSource
  executeDef: executeDef
  createResults: createResults
  bindings: defaultBindings
  redrawIssue: (i)-> redrawIssue i

root.fancyOrg = fancyOrg
root.toggleComment = toggleComment
