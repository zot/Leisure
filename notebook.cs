###
# use an element as a Leisure notebook
###

if window? and (!global? or global == window)
  window.global = window
  Leisure = window.Leisure
  ReplCore = window.ReplCore
  window.Notebook = root = {}
  Prim = window.Prim
else root = exports ? this

delay = (func)->
  window.setTimeout func, 1

bindNotebook = (el)->
  if !el.bound?
    el.bound = true
    el.addEventListener 'DOMCharacterDataModified', ((evt)->if !el.replacing then delay(->checkMutateFromModification getBox(evt.target))), true, true
    el.addEventListener 'DOMSubtreeModified', ((evt)->if !el.replacing then delay(->checkMutateFromModification getBox(evt.target))), true, true
    el.addEventListener 'click', ((e)-> window.setTimeout(highlightPosition, 1)), true, true
    el.addEventListener 'keydown', (e)->
      if (e.charCode || e.keyCode || e.which) in [37, 38, 39, 40] then window.setTimeout(highlightPosition, 1)
    el.addEventListener 'keypress', (e)->
      s = window.getSelection()
      r = s.getRangeAt(0)
      if (e.charCode || e.keyCode || e.which) == 13
        br = textNode('\n')
        r.insertNode(br)
        r = document.createRange()
        r.setStart(br, 1)
        s.removeAllRanges()
        s.addRange(r)
        e.preventDefault()
      else if (e.charCode || e.keyCode || e.which) == 61 then checkMutateToDef e, el # 61 is '='
      else if r.startContainer.parentNode == el
        sp = codeSpan '\n', 'codeExpr'
        sp.setAttribute('generatedNL', '')
        bx = box s.getRangeAt(0), 'codeMainExpr', true
        bx.appendChild sp
        makeOutputBox bx
        r = document.createRange()
        r.setStart(sp, 0)
        s.removeAllRanges()
        s.addRange(r)
      window.setTimeout(highlightPosition, 1)

#[node, positions]
oldBrackets = [null, Leisure.Nil]

highlightPosition = ->
  s = window.getSelection()
  if !s.rangeCount then return
  r = s.getRangeAt(0)
  parent = getBox r.startContainer
  if !parent? or parent.getAttribute('LeisureOutput')? then return
  tr = document.createRange()
  tr.setStart parent, 0
  tr.setEnd r.endContainer, r.endOffset
  pos = getRangeText(tr).length
  txt = parent.textContent
  ast = (Leisure.compileNext txt, Leisure.Nil, true, null, true)[0]
  offset = ast.leisureDefPrefix ? 0
  brackets = Leisure.bracket ast, pos + offset
  if oldBrackets[0] != parent or !oldBrackets[1].equals(brackets)
    oldBrackets = [parent, brackets]
    for node in document.querySelectorAll "[LeisureBrackets]"
      unwrap node
    parent.normalize()
    if ast?
      b = brackets
      while b != Leisure.Nil
        span = document.createElement 'span'
        span.setAttribute 'LeisureBrackets', ''
        span.setAttribute 'class', if b == brackets then 'LeisureFunc' else 'LeisureArg'
        r = makeRange parent, b.head.head - offset, b.head.tail.head - offset
        contents = r.cloneContents()
        r.deleteContents()
        r.insertNode span
        span.appendChild contents
        b = b.tail
    s.removeAllRanges()
    parent.normalize()
    s.addRange(makeRange parent, pos, pos)

getRangeText = (r)-> r.cloneContents().textContent

getBox = (node)->
  while node? and !(node.getAttribute?('LeisureBox'))?
    node = node.parentElement
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
  insertControls(el)
  pgm

makeOption = (name)->
  opt = document.createElement 'OPTION'
  opt.text = name
  opt

insertControls = (el)->
  controlDiv = document.createElement 'DIV'
  controlDiv.setAttribute 'LeisureOutput', ''
  controlDiv.setAttribute 'contentEditable', 'false'
  loadButton = document.createElement 'INPUT'
  loadButton.setAttribute 'type', 'file'
  loadButton.addEventListener 'change', (evt)-> loadProgram el, loadButton.files
  downloadLink = document.createElement 'A'
  downloadLink.innerHTML = "Download"
  downloadLink.setAttribute 'download', 'program.lsr'
  viewLink = document.createElement 'A'
  viewLink.innerHTML = "View"
  viewLink.setAttribute 'target', '_blank'
  testButton = document.createElement 'BUTTON'
  testButton.innerHTML = "Run Tests"
  testButton.addEventListener 'click', -> runTests el
  themeLabel = document.createElement 'SPAN'
  themeLabel.innerHTML = "Theme: "
  themeSelect = document.createElement 'SELECT'
  themeSelect.add(makeOption("Thin"), null)
  themeSelect.add(makeOption("Gaudy"), null)
  themeSelect.add(makeOption("Cthulhu"), null)
  themeSelect.addEventListener 'change', (evt)-> changeTheme el

  viewLabel = document.createElement 'SPAN'
  viewLabel.innerHTML = "View: "
  viewSelect = document.createElement 'SELECT'
  viewSelect.add(makeOption("Coding"), null)
  viewSelect.add(makeOption("Debugging"), null)
  viewSelect.add(makeOption("Testing"), null)
  viewSelect.add(makeOption("Running"), null)
  viewSelect.addEventListener 'change', (evt)-> changeView el

  processButton = document.createElement 'BUTTON'
  processButton.innerHTML = "Process"
  processButton.addEventListener 'click', -> evalDoc el
  processButton.setAttribute 'style', 'float:right'

  controlDiv.appendChild textNode 'Load: '
  controlDiv.appendChild loadButton
  controlDiv.appendChild textNode ' '
  controlDiv.appendChild downloadLink
  controlDiv.appendChild textNode ' '
  controlDiv.appendChild viewLink
  controlDiv.appendChild textNode ' '
  controlDiv.appendChild testButton
  controlDiv.appendChild themeLabel
  controlDiv.appendChild themeSelect
  controlDiv.appendChild viewLabel
  controlDiv.appendChild viewSelect
  controlDiv.appendChild processButton
  el.leisureDownloadLink = downloadLink
  el.leisureViewLink = viewLink
  el.insertBefore controlDiv, el.firstChild
  configureSaveLink(el)

loadProgram = (el, files)->
  el = getBox
  fr = new FileReader()
  fr.onloadend = (evt)->
    el.innerHTML = Repl.escapeHtml(fr.result)
    initNotebook el
  fr.readAsBinaryString(files.item(0))

configureSaveLink = (el)->
  window.URL = window.URL || window.webkitURL
  builder = new WebKitBlobBuilder();
  r = document.createRange()
  r.selectNode(el)
  c = r.cloneContents().firstChild
  removeOldDefs c
  builder.append(c.textContent);
  blob = builder.getBlob('text/plain');
  el.leisureDownloadLink.href = window.URL.createObjectURL(blob)
  el.leisureViewLink.href = window.URL.createObjectURL(blob)

runTests = (el)-> alert 'run tests'

changeTheme = (el)-> alert 'new theme: '

changeView = (el)-> alert 'new view: '

unwrap = (node)->
  parent = node.parentNode
  while node.firstChild?
    parent.insertBefore node.firstChild, node
  parent.removeChild node

removeOldDefs = (el)->
  el.leisureDownloadLink = null
  el.leisureViewLink = null
  extracted = []
  for node in el.querySelectorAll "[LeisureOutput]"
    node.parentNode.removeChild node
  for node in el.querySelectorAll "[generatednl]"
    txt = node.lastChild
    if txt.nodeType == 3 and txt.data[txt.data.length - 1] == '\n'
      txt.data = txt.data.substring(0, txt.data.length - 1)
  for node in el.querySelectorAll "[Leisure]"
    if addsLine(node) and node.firstChild? then extracted.push(node.firstChild)
    unwrap node
  for node in extracted
    if node.parentNode? and !addsLine(node) and node.previousSibling? and !addsLine(node.previousSibling) then node.parentNode.insertBefore text('\n'), node
  el.normalize()
  txt = el.lastChild
  if txt?.nodeType == 3 and (m = txt.data.match /(^|[^\n])(\n+)$/)
    txt.data = txt.data.substring(0, txt.data.length - m[2].length)

markupDefs = (defs)->
  pgm = ''
  auto = ''
  for i in defs
    [main, name, def, body, tests] = i
    if name?
      bod = codeSpan body, 'codeBody'
      bod.appendChild textNode('\n')
      bod.setAttribute('generatedNL', '')
      bx = box main, 'codeMain', true
      bx.appendChild (codeSpan name, 'codeName')
      bx.appendChild (textNode(def))
      bx.appendChild bod
      pgm += "#{name} #{def} #{body}\n"
    else if main.leisureTest
      s = codeSpan body, 'codeTest'
      s.appendChild textNode('\n')
      s.setAttribute('generatedNL', '')
      bx = box main, 'codeMainTest', true
      bx.setAttribute 'class', 'codeMainTest green'
      bx.appendChild s
    else
      if main.leisureAuto then auto += "#{body}\n"
      s = codeSpan body, 'codeExpr'
      s.appendChild textNode('\n')
      s.setAttribute('generatedNL', '')
      bx = box main, 'codeMainExpr', true
      bx.appendChild s
      makeOutputBox(bx)
    for test in tests
      console.log "TEST: #{JSON.stringify(test.leisureTest)}"
  [pgm, auto]

textNode = (text)-> document.createTextNode(text)

evalOutput = (exBox)->
  exBox = getBox exBox
  cleanOutput exBox
  d = document.createElement('div')
  d.setAttribute 'style', 'float: right'
  d.innerHTML = "<button onclick='Notebook.makeTestCase(this)'>Make test case</button><button onclick='Notebook.cleanOutput(this)'>X</button>"
  exBox.firstChild.appendChild d
  ReplCore.processLine(prepExpr(exBox.source.textContent), envFor(exBox))

cleanOutput = (exBox)->
  exBox = getBox exBox
  fc = exBox.firstChild
  while fc.firstChild.nextSibling != fc.lastChild
    fc.removeChild fc.lastChild
  while exBox.firstChild != exBox.lastChild
    exBox.removeChild exBox.lastChild

makeTestCase = (exBox)->
  output = getBox exBox
  source = output.source
  test =
    expr: source.textContent
    result: Repl.escapeHtml(Pretty.print(output.result))
  box = makeTestBox "#@test #{JSON.stringify test}"
  source.parentNode.insertBefore box, source
  source.parentNode.removeChild source
  output.parentNode.removeChild output

makeTestBox = (src)->
  s = codeSpan src, 'codeTest'
  s.appendChild textNode('\n')
  s.setAttribute('generatedNL', '')
  bx = codeBox 'codeMainTest'
  bx.setAttribute 'class', 'codeMainTest white'
  bx.appendChild s
  bx

prepExpr = (txt)-> if txt[0] in '=!' then txt else "=#{txt}"

envFor = (box)->
  exBox = getBox box
  require: req
  write: (msg)->
    div = document.createElement('div')
    div.innerHTML = "#{msg}\n"
    exBox.appendChild(div)
  prompt:(msg, cont)-> cont(window.prompt(msg))
  processResult: (result)-> box.result = result

makeOutputBox = (source)->
  node = document.createElement 'div'
  node.setAttribute 'LeisureOutput', ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'LeisureBox', ''
  node.setAttribute 'class', 'output'
  node.setAttribute 'contentEditable', 'false'
  node.source = source
  source.output = node
  node.innerHTML = "<div><div style='float: left'><button onclick='Notebook.evalOutput(this)'>-&gt;</button></div><button style='visibility: hidden'></button></div>"
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

testPat = /#@test([^\n]*)\n/

getRanges = (el, txt, rest, def, restOff)->
    [matched, leading, nameRaw, defType] = m = def
    if !rest.trim() then null
    else if !m? then [(makeRange el, restOff, txt.length), null, null, [], '']
    else
      tests = []
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
      t = leading
      while m2 = t.match /#@test([^\n]*)\n/
        r = makeRange(el, restOff + m2.index, restOff + m2[0].length)
        r.leisureTest = JSON.parse(m2[1])
        tests.push r
        t = t.substring m.index + m2[0].length
      if name?
        mainStart = matchStart + (leading?.length ? 0)
        nameEnd = mainStart + name.length
        leadingSpaces = (rest1.match /^\s*/)[0].length
        bodyStart = txt.length - (rest1.length - leadingSpaces)
        outerRange = makeRange el, mainStart, mainEnd
        [outerRange, txt.substring(mainStart, nameEnd), defType, txt.substring(bodyStart, mainEnd), tests, next]
      else
        mainStart = if def == '=' then restOff + m.index + m[0].length else matchStart + (leading?.length ? 0)
        ex = txt.substring(mainStart, mainEnd).match /^(.*[^ \n])[ \n]*$/
        exEnd = if ex then mainStart + ex[1].length else mainEnd
        outerRange = makeRange el, mainStart, exEnd
        if leading.match /@auto/ then outerRange.leisureAuto = true
        [outerRange, null, null, txt.substring(mainStart, exEnd), tests, next]

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

req = (file, cont)->
  if !(file.match /\.js$/) then file = "#{file}.js"
  name = file.substring(0, file.length - 3)
  s = document.createElement 'script'
  s.setAttribute 'src', file
  s.addEventListener 'load', ->
    Leisure.processDefs global[name], global
    cont(_false())
  document.head.appendChild s

postLoadQueue = []

queueAfterLoad = (func)-> postLoadQueue.push(func)

evalDoc = (el)->
  [pgm, auto] = initNotebook(el)
  try
    if auto
      auto = "do\n  #{auto.trim().replace /\n/, '\n  '}\n  finishLoading 'fred'"
      Notebook.queueAfterLoad ->
        Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false)), global)
      Leisure.eval(ReplCore.generateCode('_auto', auto, false))
    else Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false)), global)
  catch err
    alert(err.stack)

Leisure.define 'finishLoading', (bubba)->
  Prim.makeMonad 'end', (env, cont)->
    for i in postLoadQueue
      i()
    postLoadQueue = []
    cont(_false())

Prim.defaultEnv.require = req

root.initNotebook = initNotebook
root.bindNotebook = bindNotebook
root.evalOutput = evalOutput
root.makeTestCase = makeTestCase
root.cleanOutput = cleanOutput
root.envFor = envFor
root.queueAfterLoad = queueAfterLoad
root.evalDoc = evalDoc
root.getBox = getBox

#root.selection = -> window.getSelection().getRangeAt(0)
#root.test = -> flatten(root.selection().cloneContents().childNodes[0])
