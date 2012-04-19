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
    parent.normalize()

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
  [node, offset] = getRangePosition el, off1
  range.setStart(node, offset)
  [node, offset] = getRangePosition el, off2
  range.setEnd(node, offset)
  range

getRangePosition = (node, charOffset)->
  if node.nodeType == 3
    if node.length >= charOffset then [node, charOffset]
    else [null, charOffset - node.length]
  else if node.firstChild?
      [newNode, newOff] = getRangePosition node.firstChild, charOffset
      if newNode? then [newNode, newOff]
      else continueRangePosition node, newOff
  else continueRangePosition node, charOffset

continueRangePosition = (node, charOffset)->
  if node.nextSibling? then getRangePosition node.nextSibling, charOffset
  else [null, charOffset]

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