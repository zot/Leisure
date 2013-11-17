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
} = require './orgSupport'

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

defaultMarkup = (org)-> "<span #{orgAttrs org}>#{org.text}</span>"

borderRE = /[\n]*$/
makeBoundary = (node)->
  nls = node.text.match borderRE
  if nls then "<div class='boundary'>#{nls[0]}</div>" else ""

markupNode = (org)->
  if org.offset <= lastOrgOffset
    ''
  else if org instanceof Results
    pos = org.contentPos - org.offset - 1
    text = org.text.substring pos
    "<span #{orgAttrs org}><span data-org-type='text'>#{org.text.substring(0, pos)}</span>#{contentSpan text}</span>#{makeBoundary org}"
  else if org instanceof Keyword
    if org.name.match /name/i
      intertext = '\n'
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
        id = nextOrgId()
        html = "<div class='codeblock' #{orgAttrs src}><div class='codename'><span class='hidden'>#{nameM[KW_BOILERPLATE]}</span>#{name.info}#{intertext}</div><div class='hidden'>#{srcLead}</div><div class='codewrapper'><div class='codecontent'>#{srcContent}</div><span class='hidden' data-org-type='boundary'>#{srcTrail}</span>"
        res = src.next
        intertext = ''
        while res && !(res instanceof Results) && !(res instanceof Keyword)
          intertext += res.text
          res = res.next
        if res instanceof Results
          lastOrgOffset = res.offset
          pos = res.contentPos - res.offset
          html += "#{if intertext then "<div class='hidden' data-org-type='boundary'>" + intertext + "</div>" else ''}<div class='results-indicator' data-org-type='boundary'></div><div class='coderesults' #{orgAttrs res}><span class='hidden'>#{res.text.substring(0, pos)}</span><div>#{res.text.substring pos}</div></div>"
        html + "</div></div>"
      else defaultMarkup org
    else defaultMarkup org
  else if org instanceof Headline then "<span #{orgAttrs org}><span data-org-type='text'>#{org.text}</span>#{markupGuts org, checkStart start, org.text}</span>"
  else if content(org.text).length then "<span #{orgAttrs org}>#{org.text}</span>"
  else "#{makeBoundary org}"

#
# When to cancel line joins
# - BS at the start of a SRC block
# - DEL at the end of a SRC block
#
shouldCancelBS = (parent, r)-> atTextStart(r) && crossesHidden -1

atTextStart = (r)-> r.collapsed && r.startContainer.nodeType == 3 && r.startOffset == 0

# returns:
# false if not at the end
# 1 if at the end
# 2 at an ending \n
atTextEnd = (r)-> r.collapsed && r.startContainer.nodeType == 3 &&
((r.startOffset == r.startContainer.length && 1) ||
  (r.startOffset == r.startContainer.length - 1 &&
  r.startContainer.textContent[r.startOffset] == '\n' && 2))

shouldCancelDEL = (parent, r)-> (atEnd = atTextEnd r) && crossesHidden atEnd + 1

shouldDeleteCharacter = (parent, r)-> false
#  if (atEnd = atTextEnd r)
#    pos =
#    matchLineAt parent, checkCollapsed atEnd
#  else false

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
  div.addEventListener 'keydown', (e)->
    curPos = -1
    c = (e.charCode || e.keyCode || e.which)
    s = getSelection()
    r = s.getRangeAt(0)
    el = r.startContainer
    par = el.parentNode
    if c == ENTER
      e.preventDefault()
      n = s.focusNode
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
      else cancelled = true
    else if c in [BS, DEL]
      if (c == BS && shouldCancelBS div, r) || (c == DEL && shouldCancelDEL div, r)
        e.preventDefault()
        cancelled = true
      else if c == DEL && shouldDeleteCharacter div, r
        e.preventDefault()
        t = div.textContent
        p = getTextPosition r.startContainer, r.startOffset
        reparse div, t.substring(0, p) + t.substring p + 1
      else
        currentMatch = matchLine currentLine div
        setTimeout (->checkSourceMod div, currentMatch), 1
    else cancelled = false
    if !cancelled && modifyingKey c
      if (getOrgType getOrgParent el) == 'boundary' then needsReparse = true
      currentMatch = matchLine currentLine div
      if cancelled then checkSourceMod div, currentMatch else setTimeout (->checkSourceMod div, currentMatch), 1
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true

handleMutation = (evt)-> displaySource()

executeSource = (parent, node)->
  while node && !node.classList?.contains 'codecontent'
    node = node.parentNode
  if node
    txt = node.textContent
    if txt.trim().length then executeText node.textContent, orgEnv parent, node
    else orgEnv(parent, node).write 'Nothing'

fancyOrg =
  __proto__: orgNotebook
  markupOrg: markupOrg
  markupOrgWithNode: markupOrgWithNode
  bindContent: bindContent
  installOrgDOM: (parent, orgNode, orgText)->
    orgNotebook.installOrgDOM parent, orgNode, orgText
    for node in $('.results-indicator')
      root = node.createShadowRoot()
      root.innerHTML = "-->"
  executeSource: executeSource

root.fancyOrg = fancyOrg
