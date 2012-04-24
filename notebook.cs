###
# use an element as a Leisure notebook
###

if window? and (!global? or global == window)
  window.global = window
  Leisure = window.Leisure
  ReplCore = window.ReplCore
  window.Notebook = root = {}
else root = exports ? this

delay = (func)->
  window.setTimeout func, 1

bindNotebook = (el)->
  if !el.bound?
    el.bound = true
    el.addEventListener 'DOMCharacterDataModified', ((evt)->if !el.replacing then delay(->checkMutateFromModification getBox(evt.target))), true, true
    el.addEventListener 'DOMSubtreeModified', ((evt)->if !el.replacing then delay(->checkMutateFromModification getBox(evt.target))), true, true
    el.addEventListener 'keypress', (e)->
      if (e.charCode || e.keyCode || e.which) == 13
        br = textNode('\n')
        s = window.getSelection()
        s.getRangeAt(0).insertNode(br)
        r = document.createRange()
        r.setStart(br, 1)
        s.removeAllRanges()
        s.addRange(r)
        e.preventDefault()
      else if (e.charCode || e.keyCode || e.which) == 61 then checkMutateToDef e, el
      else
        s = window.getSelection()
        r = s.getRangeAt(0)
        if r.startContainer.parentNode == el
          sp = codeSpan '\n', 'codeExpr'
          sp.setAttribute('generatedNL', '')
          bx = box s.getRangeAt(0), 'codeMainExpr', true
          bx.appendChild sp
          makeOutputBox bx
          r = document.createRange()
          r.setStart(sp, 0)
          s.removeAllRanges()
          s.addRange(r)

getBox = (node)->
  while node? and !(node.getAttribute?('LeisureBox'))?
    node = node.parentNode
  node

checkMutateFromModification = (b)->
  if b?
    inDef = selInDef()
    if inDef and b.classList.contains('codeMainExpr') then toDefBox b
    else if !inDef and b.classList.contains('codeMain') then toExprBox b

toExprBox = (b)->
  b.classList.remove 'codeMain'
  b.classList.add 'codeMainExpr'
  makeOutputBox b

toDefBox = (b)->
  if b.output then b.parentNode.removeChild b.output
  b.classList.remove 'codeMainExpr'
  b.classList.add 'codeMain'

selInDef = (expectedClass)->
  s = window.getSelection()
  if s.rangeCount > 0
    r = s.getRangeAt(0)
    if (box = getBox r.startContainer) and (!expectedClass? or box.classList.contains(expectedClass))
      txt = box.textContent
      if (m = txt.match Leisure.linePat)
        [matched, leading, name, defType] = m
        return defType and box
  false

checkMutateToDef = (e, el)->
  if !el.replacing
    s = window.getSelection()
    r = s.getRangeAt(0)
    if p = selInDef('codeMainExpr')
      toDefBox p

initNotebook = (el)->
  el.replacing = true
  removeOldDefs el
  pgm = markupDefs findDefs el
  if !(el?.lastChild?.nodeType == 3 and el.lastChild.data[el.lastChild.data.length - 1] == '\n')
    el.appendChild textNode('\n')
    el.appendChild textNode('\n')
    el.appendChild textNode('\n')
  el.normalize()
  el.replacing = false
  pgm

removeOldDefs = (el)->
  extracted = []
  for node in el.querySelectorAll "[LeisureOutput]"
    node.parentNode.removeChild node
  for node in el.querySelectorAll "[generatednl]"
    txt = node.lastChild
    if txt.nodeType == 3 and txt.data[txt.data.length - 1] == '\n'
      txt.data = txt.data.substring(0, txt.data.length - 1)
  for node in el.querySelectorAll "[Leisure]"
    parent = node.parentNode
    if addsLine(node) and node.firstChild? then extracted.push(node.firstChild)
    while node.firstChild?
      parent.insertBefore node.firstChild, node
    parent.removeChild node
  for node in extracted
    if node.parentNode? and !addsLine(node) and node.previousSibling? and !addsLine(node.previousSibling) then node.parentNode.insertBefore text('\n'), node
  el.normalize()
  txt = el.lastChild
  if txt?.nodeType == 3 and (m = txt.data.match /(^|[^\n])(\n+)$/)
    txt.data = txt.data.substring(0, txt.data.length - m[2].length)

markupDefs = (defs)->
  pgm = ''
  for i in defs
    [main, name, def, body] = i
    if name?
      bod = codeSpan body, 'codeBody'
      bod.appendChild textNode('\n')
      bod.setAttribute('generatedNL', '')
      bx = box main, 'codeMain', true
      bx.appendChild (codeSpan name, 'codeName')
      bx.appendChild (textNode(def))
      bx.appendChild bod
      pgm += "#{name} #{def} #{body}\n"
    else
      s = codeSpan body, 'codeExpr'
      s.appendChild textNode('\n')
      s.setAttribute('generatedNL', '')
      bx = box main, 'codeMainExpr', true
      bx.appendChild s
      makeOutputBox(bx)
  pgm

textNode = (text)-> document.createTextNode(text)

evalOutput = (exBox)->
  cleanOutput exBox
  b = document.createElement('button')
  b.setAttribute('onclick', 'Notebook.cleanOutput(this.parentNode)')
  b.innerHTML = "X"
  exBox.appendChild b
  ReplCore.processLine(prepExpr(exBox.source.textContent), envFor(exBox))
  #alert("Eval: #{exBox.source.textContent}")

cleanOutput = (exBox)->
  while exBox.firstChild != exBox.lastChild
    exBox.removeChild exBox.lastChild

prepExpr = (txt)-> if txt[0] in '=!' then txt else "=#{txt}"

envFor = (box)->
  exBox = getBox box
  write: (msg)->
    div = document.createElement('div')
    div.innerHTML = "#{msg}\n"
    exBox.appendChild(div)
  prompt:(msg, cont)-> cont(window.prompt(msg))

makeOutputBox = (source)->
  node = document.createElement 'div'
  node.setAttribute 'LeisureOutput', ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'LeisureBox', ''
  node.setAttribute 'class', 'output'
  node.setAttribute 'contentEditable', 'false'
  node.source = source
  source.output = node
  node.innerHTML = "<button onclick='Notebook.evalOutput(this.parentNode)'>-&gt;</button>"
  node.appendChild textNode(' \n')
  source.parentNode.insertBefore node, source.nextSibling
  node

codeSpan = (text, boxType)->
  node = document.createElement 'span'
  node.setAttribute boxType, ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'class', boxType
  node.appendChild textNode(text)
  node

codeBox = (boxType)->
  node = document.createElement 'div'
  node.setAttribute boxType, ''
  node.setAttribute 'LeisureBox', ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'class', boxType
  node.addEventListener 'compositionstart', (e)-> checkMutate e
  node

box = (range, boxType, empty)->
  node = codeBox boxType
  if empty then range.deleteContents()
  else node.appendChild(range.extractContents())
  range.insertNode(node)
  node

findDefs = (el)->
  txt = el.textContent
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
      endPat = rest1.match /\n+[^\s]|\n?$/
      next = if endPat then rest1.substring(endPat.index) else rest1
      mainEnd = txt.length - next.length
      if name?
        mainStart = matchStart + (leading?.length ? 0)
        nameEnd = mainStart + name.length
        leadingSpaces = (rest1.match /^\s*/)[0].length
        bodyStart = txt.length - (rest1.length - leadingSpaces)
        outerRange = makeRange el, mainStart, mainEnd
        [outerRange, txt.substring(mainStart, nameEnd), defType, txt.substring(bodyStart, mainEnd), next]
      else
        mainStart = if def == '=' then restOff + m.index + m[0].length else matchStart + (leading?.length ? 0)
        ex = txt.substring(mainStart, mainEnd).match /^(.*[^ \n])[ \n]*$/
        exEnd = if ex then mainStart + ex[1].length else mainEnd
        outerRange = makeRange el, mainStart, exEnd
        [outerRange, null, null, txt.substring(mainStart, exEnd), next]

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

addsLine = (node)-> node.nodeName == 'BR' or (node.nodeType == 1 and getComputedStyle(node, null).display == 'block' and node.childNodes.length > 0)


root.initNotebook = initNotebook
root.bindNotebook = bindNotebook
root.evalOutput = evalOutput
root.cleanOutput = cleanOutput
root.envFor = envFor
#root.selection = -> window.getSelection().getRangeAt(0)
#root.test = -> flatten(root.selection().cloneContents().childNodes[0])