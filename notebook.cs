###
# use an element as a Leisure notebook
###

if window? and (!global? or global == window)
  window.global = window
  Leisure = window.Leisure
  ReplCore = window.ReplCore
  window.Notebook = root = {}
else root = exports ? this

pos = 0
chunks = []

initNotebook = (el)->
  removeOldDefs el
  markupDefs findDefs el

removeOldDefs = (el)->
  for node in el.querySelectorAll "[Leisure]"
    parent = node.parentNode
    while node.firstChild?
      parent.insertBefore node.firstChild, node
    parent.removeChild node
  el.normalize()

markupDefs = (defs)->
  for i in defs
    [main, name, body] = i
    if name?
      boxIn name, 'codeName', 'span'
      bodyNode = boxIn body, 'codeBody', 'span'
      main.setEndAfter bodyNode
      boxIn main, 'codeMain', 'div'
    else
      body = boxIn main, 'codeExpr', 'span'
      main.setStartBefore body
      main.setEndAfter body
      boxIn main, 'codeMain', 'div'

boxIn = (range, boxType, elementType)->
  node = document.createElement elementType
  node.setAttribute boxType, ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'class', boxType
  range.surroundContents(node)
  node

findDefs = (el)->
  txt = el.innerText
  rest = txt
  ranges = []
  while (def = rest.match Leisure.linePat) and def[1].length != rest.length
    rng = getRanges(el, txt, rest, def, txt.length - rest.length)
    if rng
      rest = rng.pop()
      if rng then ranges.push(rng)
      else break
    else break
  ranges

getRanges = (el, txt, rest, def, restOff)->
    [matched, leading, nameRaw, defType] = m = def
    if !rest.trim() then null
    else if !m? then [(makeRange el, restOff, txt.length), null, null, '']
    else
      matchStart = restOff + m.index
      if !defType? then name = null
      else if nameRaw[0] == ' '
        name = null
        defType = null
      else name = nameRaw.trim()
      rest1 = rest.substring (if defType then matched else leading).length
      endPat = rest1.match /\n[^\s]|\n?$/
      next = if endPat then rest1.substring(endPat.index) else rest1
      mainEnd = txt.length - next.length
      if name?
        mainStart = matchStart + (leading?.length ? 0)
        nameEnd = mainStart + name.length
        nameRange = makeRange el, mainStart, nameEnd
        leadingSpaces = (rest1.match /^\s*/)[0].length
        bodyStart = txt.length - (rest1.length - leadingSpaces)
        bodyRange = makeRange el, bodyStart, mainEnd
        outerRange = makeRange el, mainStart, mainEnd
        [outerRange, nameRange, bodyRange, next]
      else
        mainStart = matchStart + (leading?.length ? 0)
        outerRange = makeRange el, mainStart, mainEnd
        [outerRange, null, null, next]

makeRange = (el, off1, off2)->
  range = document.createRange()
  [node, offset] = grp el, off1, false
  if offset? then range.setStart(node, offset)
  else  range.setStartBefore node
  [node, offset] = grp el, off2, true
  if offset? then range.setEnd(node, offset)
  else range.setEndAfter node
  range

grp = (node, charOffset, end)->
  [child, offset] = getRangePosition node.firstChild, charOffset, end
  if !child?
    child = node.lastChild
    nodeEnd child
  else [child, offset]

getRangePosition = (node, charOffset, end)->
  if node.nodeType == 3
    if node.length > (if end then charOffset - 1 else charOffset) then [node, charOffset]
    else continueRangePosition node, charOffset - node.length, end
  else if node.nodeName == 'BR'
    if charOffset == (if end then 1 else 0) then [node]
    else continueRangePosition node, charOffset, end
  else if node.firstChild?
      [newNode, newOff] = getRangePosition node.firstChild, charOffset, end
      if newNode? then [newNode, newOff]
      else continueRangePosition node, newOff, end
  else continueRangePosition node, charOffset, end

continueRangePosition = (node, charOffset, end)->
  newOff = charOffset - (if (addsLine node) or (node.nextSibling? and (addsLine node.nextSibling)) then 1 else 0)
  if end and (newOff == 1 or charOffset == 1) then nodeEnd node
  else if node.nextSibling?
    if newOff == 0 and end then nodeEnd node
    else getRangePosition node.nextSibling, newOff, end
  else [null, (if node.parentNode.lastChild != node and !(addsLine node.parentNode) then newOff else charOffset)]

nodeEnd = (node)-> [node, if node.nodeType == 3 then node.length else node.childNodes.length - 1]

addsLine = (node)-> node.nodeName == 'BR' or (node.nodeType == 1 and getComputedStyle(node, null).display == 'block')


###
  el.addEventListener 'textInput', (evt)->
    rng = window.getSelection().getRangeAt(0)
    txt = el.innerText
    changed = txt.substring(pos, rng.endOffset)
    pos = rng.endOffset
    if txt[pos - 1] == '\n'
      if pos > 2 and txt[pos - 2] = \n
        evalChunk
###

root.initNotebook = initNotebook