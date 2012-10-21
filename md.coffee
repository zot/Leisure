# if window? and (!global? or global == window)
#   window.global = window
#   Leisure = window.Leisure
#   ReplCore = window.ReplCore
#   window.Notebook = root = {}
#   Prim = window.Prim
#   Repl = window.Repl
#   Xus = window.Xus
# else root = exports ? this

{ENTER,
  textNode,
  cleanEmptyNodes,
  isLeisureCode,
  getElementCode,
  previousSibling,
  nextSibling,
  presentLeisureCode,
  mergeLeisureCode} = Notebook

window.markup = ->
  for el in document.querySelectorAll('[doc]')
    #console.log "source: ", el.innerHTML
    md = Notebook.md = el.innerHTML.replace(/^\s<!--*/, '').replace(/-->\s*$/, '');
    #console.log "replaced: ", md
    markupElement el, md

markupElement = (el, md)->
  len = md.length
  [el.innerHTML, lex] = window.marked md, saveLex: true, gfm: true
  #console.log "Lex: ", JSON.stringify lex
  prev = null
  range = document.createRange()
  prevCodePos = -1
  codePos = 0
  for node in el.querySelectorAll 'code'
    codePos++ while lex[codePos].type != 'code'
    if node.parentNode.tagName != 'PRE' then code = node
    else
      code = node.parentNode
      code.innerHTML = node.innerHTML
    code.setAttribute 'noLeisureBar', ''
    code.setAttribute 'leisureCode', ''
    code.md = lex[codePos].text
    if code.parentNode.firstChild != code
      if prev == null then range.setStart el, 0 else range.setStartAfter prev
      range.setEndBefore code
      makeMarkupDiv range, md.substring((if prevCodePos == -1 then 0 else len - lex[prevCodePos].remain), len - lex[codePos].remain - lex[codePos].textLen)
    prevCodePos = codePos
    codePos++
    prev = code
  if prevCodePos > -1
    if lex[prevCodePos].remain > 0
      range.selectNodeContents el
      range.setStartAfter prev
      makeMarkupDiv range, md.substring len - lex[prevCodePos].remain
  else
    el.md = md
    if !el.bound then bindMarkupDiv el
  prevCodePos > -1

makeMarkupDiv = (range, md)->
  div = document.createElement 'div'
  range.surroundContents div
  div.md = md
  bindMarkupDiv div

bindMarkupDiv = (div)->
  div.bound = true
  div.setAttribute 'markdown', ''
  div.setAttribute 'contenteditable', 'false'
  editing = false
  div.addEventListener 'dblclick', (e)->
    if !editing
      div.innerHTML = ''
      div.appendChild document.createTextNode div.md
      div.style.whiteSpace = 'pre-wrap'
      div.setAttribute 'contenteditable', 'true'
      editing = true
      div.focus()
  div.addEventListener 'keypress', (e)->
    if editing
      s = window.getSelection()
      r = s.getRangeAt(0)
      if (e.charCode || e.keyCode || e.which) == ENTER
        br = textNode('\n')
        r.insertNode(br)
        r = document.createRange()
        r.setStart(br, 1)
        s.removeAllRanges()
        s.addRange(r)
        e.preventDefault()
  div.addEventListener 'blur', (e)->
    if editing
      div.style.whiteSpace = ''
      editing = false
      div.setAttribute 'contenteditable', 'false'
      if markupElement div, div.textContent
        for node in div.querySelectorAll "[leisurecode]"
          presentLeisureCode node, true
        r = document.createRange()
        r.selectNodeContents div
        frag = r.extractContents()
        first = frag.childNodes[0]
        last = frag.childNodes[frag.childNodes.length - 1]
        div.parentNode.replaceChild frag, div
        mergeLeisureCode previousSibling(first), first
        mergeLeisureCode last, nextSibling last
      else if div.textContent.trim() == '' then cleanEmptyNodes div
