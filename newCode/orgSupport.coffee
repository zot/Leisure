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
  headlineRE,
  HL_TAGS,
  parseTags,
} = require './org'

editDiv = null
sourceDiv = null
modifying = false

markupOrg = (text)->
  # ensure trailing newline -- contenteditable doesn't like it, otherwise
  if text[text.length - 1] != '\n' then text = text + '\n'
  org = parseOrgMode text
  markupNode org, ''

markupNode = (org, newline)->
  if org instanceof Source
    pos = org.contentPos - org.offset - 1
    content = org.text.substring pos
    "#{if newline then '<span>\n</span>' else ''}<span data-org-type='#{org.type}'><span data-org-type='text'>#{org.text.substring(0, pos)}</span><span>#{content}</span></span>"
  else if org instanceof Headline then "<span data-org-type='#{org.type}'><span data-org-type='text'>#{removeTrailingNL org.text}</span>#{markupGuts org}</span>"
  else "<span data-org-type='#{org.type}'>#{newline}#{org.text}</span>"

isSourceNode = (node)-> node?.getAttribute?('data-org-type') == 'source'

isHeadlineNode = (node)-> node?.getAttribute?('data-org-type') == 'headline'

isMeatNode = (node)-> node?.getAttribute?('data-org-type') == 'meat'

isDocNode = (node)-> node?.hasAttribute?('maindoc')

markupGuts = (org)->
  if !org.children.length then '<span>\n</span>'
  else
    newline = '\n'
    (for c in org.children
      nl = newline
      newline = ''
      markupNode(c, nl)).join ""

removeTrailingNL = (str)-> if str[str.length - 1] == '\n' then str.substring(0, str.length - 1) else str

trailingNL = (str)-> if str[str.length - 1] == '\n' then '\n' else ''

fixupNodes = (node)->
  for n in $(node).find('[data-org-type="headline"]')
    setTags n

bindContent = (div, givenSourceDiv)->
  editDiv = div
  sourceDiv = givenSourceDiv
  fixupNodes div
  div.addEventListener 'keydown', (e)->
    c = (e.charCode || e.keyCode || e.which)
    if c == TAB
      e.preventDefault()
      node = inCollapsible getSelection().focusNode
      if node && !isEmptyCollapsible node
        modifying = true
        $(node).toggleClass 'collapsed'
        modifying = false
    else if String.fromCharCode(c) == 'C' && e.altKey
      executeSource getSelection().focusNode
    else if c == ENTER
      s = window.getSelection()
      r = s.getRangeAt(0)
      e.preventDefault()
      n = s.focusNode
      # Make sure that newlines at the end of a 'text' span go after the span
      if n.nodeType == 3 && r.collapsed && r.startOffset == n.length && n.parentNode.getAttribute('data-org-type') == 'text'
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
    else if c in [DEL, BS]
      s = window.getSelection()
      r = s.getRangeAt(0)
      el = r.startContainer
      if r.collapsed && el.nodeType == 3 && el.parentElement.getAttribute('data-org-type') == 'text' && r.startOffset == el.length && el.parentElement.parentElement.classList.contains('collapsed')
        e.preventDefault()
        if c == BS && el.length > 0
          el.nodeValue = el.nodeValue.substring 0, el.nodeValue.length - 1
          r.setStart el, el.length
          r.collapse()
          s.removeAllRanges()
          s.addRange r
  div.addEventListener 'DOMCharacterDataModified', handleMutation, true
  div.addEventListener 'DOMSubtreeModified', handleMutation, true
  displaySource()

orgEnv = (node)->
  write: (str)-> console.log str
orgEnv.__proto__ = defaultEnv

id = lz (x)-> rz x
getLeft = (x)-> x(id)(id)
getRight = (x)-> x(id)(id)
show = (obj)-> if L_show? then rz(L_show)(lz obj) else console.log obj

executeSource = (node)->
  if isSourceNode node
    txt = $(node).text().substring($(node).find('[data-org-type="text"]').text().length)
    m = txt.match /(^|\n)#\+end_src/i
    if m
      result = rz(L_baseLoadString)('notebook')(txt.substring(0, m.index))
      env = orgEnv node
      runMonad result, env, (res)->
        res = res.head().tail()
        if getType(res) == 'left' then orgEnv.write "PARSE ERROR: #{getLeft res}"
        else env.write show getRight res
    else console.log "No end for src block"
  else !isDocNode(node) && executeSource node.parentElement

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
    if (node = inCollapsible evt.srcElement) && (node.getAttribute('data-org-type') == 'headline')
      node.setAttribute 'dirty', 'true'
    displaySource()
    modifying = false

displaySource = -> $(sourceDiv).html('').text($(editDiv).text())

isCollapsible = (node)-> node.getAttribute('data-org-type') in ['headline', 'source']

inCollapsible = (node)->
  if node.nodeType == 1
    if isCollapsible node then node
    else (node.getAttribute('data-org-type') == 'text') && inCollapsible node.parentElement
  else node.nodeType == 3 && inCollapsible node.parentElement

isEmptyCollapsible = (node)->
  firstLine = getTextLine node
  isCollapsible(node) && firstLine.textContent + '\n' == node.textContent
  #(node.firstChild == node.lastChild) || (node.firstChild && node.firstChild.nextSibling == node.lastChild && node.lastChild.nodeType == 3 && node.lastChild.textContent == '\n')

getTextLine = (node)->
  c = node.firstElementChild
  while c
    if c.getAttribute('data-org-type') == 'text' then return c
    c = c.nextElementSibling
  null

root.markupOrg = markupOrg
root.bindContent = bindContent
root.cleanHeadline = cleanHeadline
root.getTags = getTags
