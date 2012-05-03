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
      if (e.charCode || e.keyCode || e.which) in [8, 37, 38, 39, 40, 46] then window.setTimeout(highlightPosition, 1)
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
  focusBox parent
  if !parent? or parent.getAttribute('LeisureOutput')? then return
  tr = document.createRange()
  tr.setStart parent, 0
  tr.setEnd r.endContainer, r.endOffset
  pos = getRangeText(tr).length
  txt = parent.textContent
  ast = (Leisure.compileNext txt, Leisure.Nil, true, null, true)[0]
  if ast?
    offset = ast.leisureDefPrefix ? 0
    brackets = Leisure.bracket ast.leisureBase, pos - offset
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
          r = makeRange parent, b.head.head + offset, b.head.tail.head + offset
          contents = r.cloneContents()
          replaceRange r, span
          span.appendChild contents
          b = b.tail
      s.removeAllRanges()
      parent.normalize()
      s.addRange(makeRange parent, pos)

replaceRange = (range, node)->
  range.deleteContents()
  range.insertNode node

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
  pgm = markupDefs el, findDefs el
  if !(el?.lastChild?.nodeType == 3 and el.lastChild.data[el.lastChild.data.length - 1] == '\n')
    el.appendChild textNode('\n')
    el.appendChild textNode('\n')
    el.appendChild textNode('\n')
  el.normalize()
  el.replacing = false
  insertControls(el)
  el.testResults.innerHTML = pgm[2]
  pgm

makeLabel = (text, c)->
  node = document.createElement 'SPAN'
  node.innerHTML = text
  node.setAttribute 'class', c
  node

makeOption = (name)->
  opt = document.createElement 'OPTION'
  opt.text = name
  opt

createNode = (txt)->
  scratch = document.createElement 'DIV'
  scratch.innerHTML = txt
  scratch.firstChild

createFragment = (txt)->
  scratch = document.createElement 'DIV'
  scratch.innerHTML = txt
  frag = document.createDocumentFragment()
  while scratch.firstChild
    frag.appendChild scratch.firstChild
  frag

insertControls = (el)->
  controlDiv = createNode """
<div LeisureOutput contentEditable='false' class='leisure_bar'>
  <span class='leisure_load'>Load: </span>
  <input type='file' leisureId='loadButton'></input>
  <a download='program.lsr' leisureId='downloadLink'>Download</a>
  <a target='_blank' leisureId='viewLink'>View</a>
  <button leisureId='testButton'>Run Tests</button> <span leisureId='testResults' class="notrun"></span>
  <span class="leisure_theme">Theme: </span>
  <select leisureId='themeSelect'>
    <option value=thin>Thin</option>
    <option value=gaudy>Gaudy</option>
    <option value=cthulhu>Cthulhu</option>
  </select>
  <span>View: </span>
  <select leisureId='viewSelect'>
    <option value=coding>Coding</option>
    <option value=debugging>Debugging</option>
    <option value=testing>Testing</option>
    <option value=running>Running</option>
  </select>
  <button leisureId='processButton' style="float: right">Process</button>
</div>
"""
  el.insertBefore controlDiv, el.firstChild
  [el.leisureDownloadLink, el.leisureViewLink, loadButton, testButton, el.testResults, themeSelect, viewSelect, processButton] = getElements el, ['downloadLink', 'viewLink', 'loadButton', 'testButton', 'testResults', 'themeSelect', 'viewSelect', 'processButton']
  loadButton.addEventListener 'change', (evt)-> loadProgram el, loadButton.files
  testButton.addEventListener 'click', -> runTests el
  themeSelect.value = el.leisureTheme ? 'thin'
  themeSelect.addEventListener 'change', (evt)-> changeTheme el, evt.target
  viewSelect.addEventListener 'change', (evt)-> changeView el, evt.target
  processButton.addEventListener 'click', -> evalDoc el
  configureSaveLink(el)

getElements = (el, ids)->
  els = {}
  for node in el.querySelectorAll '[leisureId]'
    els[node.getAttribute 'leisureId'] = node
  els[id] for id in ids

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

runTests = (el)->
  passed = 0
  failed = 0
  for test in el.querySelectorAll '.codeMainTest'
    if runTest test then passed++ else failed++
  resultsClass = el.testResults.classList
  resultsClass.remove 'notrun'
  if !failed
    resultsClass.remove 'failed'
    resultsClass.add 'passed'
    el.testResults.innerHTML = passed
  else
    resultsClass.remove 'passed'
    resultsClass.add 'failed'
    el.testResults.innerHTML = "#{passed}/#{failed}"

changeTheme = (el, t)->
  theme = t.value
  el.leisureTheme = theme
  document.body.className = theme

changeView = (el, v)-> alert 'new view: ' + v.value

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

markupDefs = (el, defs)->
  pgm = ''
  auto = ''
  totalTests = 0
  for i in defs
    [main, name, def, body, tests] = i
    for test in tests
      replaceRange test, makeTestBox test.leisureTest
      totalTests++
    if name?
      bod = codeSpan body, 'codeBody'
      bod.appendChild textNode('\n')
      bod.setAttribute('generatedNL', '')
      bx = box main, 'codeMain', true
      bx.appendChild (codeSpan name, 'codeName')
      bx.appendChild (textNode(def))
      bx.appendChild bod
      bx.addEventListener 'blur', (-> evalDoc el), true, true
      bx.leisureOwner = el
      pgm += "#{name} #{def} #{body}\n"
    else if main?
      if main.leisureAuto then auto += "#{body}\n"
      s = codeSpan body, 'codeExpr'
      s.appendChild textNode('\n')
      s.setAttribute('generatedNL', '')
      bx = box main, 'codeMainExpr', true
      bx.appendChild s
      bx.leisureOwner = el
      makeOutputBox(bx)
  [pgm, auto, totalTests]

textNode = (text)-> document.createTextNode(text)

evalOutput = (exBox)->
  exBox = getBox exBox
  focusBox exBox
  cleanOutput exBox
  exBox.firstChild.appendChild createFragment("<button onclick='Notebook.makeTestCase(this)' leisureId='makeTestCase'>Make test case</button><button onclick='Notebook.cleanOutput(this)'>X</button>")
  ReplCore.processLine(prepExpr(exBox.source.textContent), envFor(exBox))

cleanOutput = (exBox)->
  exBox = getBox exBox
  fc = exBox.firstChild
  while fc.firstChild != fc.lastChild
    fc.removeChild fc.lastChild
  while exBox.firstChild != exBox.lastChild
    exBox.removeChild exBox.lastChild

makeTestCase = (exBox)->
  output = getBox exBox
  source = output.source
  test =
    expr: source.textContent
    result: Repl.escapeHtml(Pretty.print(output.result))
  box = makeTestBox test, exBox.leisureOwner
  source.parentNode.insertBefore box, source
  source.parentNode.removeChild source
  output.parentNode.removeChild output

makeTestBox = (test, owner, src)->
  src = src ? "#@test #{JSON.stringify test}"
  s = codeSpan src, 'codeTest'
  s.appendChild textNode('\n')
  s.setAttribute('generatedNL', '')
  bx = codeBox 'codeMainTest'
  bx.setAttribute 'class', 'codeMainTest notrun'
  bx.appendChild s
  bx.addEventListener 'click', (-> clickTest bx), true, true
  bx.test = test
  bx.leisureOwner = owner
  bx

clickTest = (bx)->
  if bx.classList.contains 'notrun' then runTest bx
  else
    r = document.createRange()
    r.setStartBefore bx
    r.setEndAfter bx
    r.deleteContents()
    sp = codeSpan bx.test.expr, 'codeExpr'
    sp.setAttribute('generatedNL', '')
    exprBox = box r, 'codeMainExpr', true
    exprBox.appendChild sp
    makeOutputBox exprBox

runTest = (bx)->
  test = bx.test
  console.log "RUNNING:\n #{test.expr}\nRESULT:\n #{test.result}"
  passed = true
  ReplCore.processLine(prepExpr(test.expr), (
    require: req
    write: ->
    prompt: (msg, cont)-> cont(null)
    processResult: (result)-> passed = showResult bx, Repl.escapeHtml(Pretty.print(result)), test.result
    processError: passed = false
  ))
  passed

showResult = (bx, actual, expected)->
  cl = bx.classList
  cl.remove 'notrun'
  if actual == expected
    cl.remove 'failed'
    cl.add 'passed'
  else
    cl.remove 'passsed'
    cl.add 'failed'
    console.log "expected <#{expected}> but got <#{actual}>"
  actual == expected

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
  processError: (ast)->
    btn = box.querySelector '[leisureId="makeTestCase"]'
    btn.parentNode.removeChild btn
    @write "ERROR: #{ast.err}"

makeOutputBox = (source)->
  node = document.createElement 'div'
  node.setAttribute 'LeisureOutput', ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'LeisureBox', ''
  node.setAttribute 'class', 'output'
  node.setAttribute 'contentEditable', 'false'
  node.source = source
  node.leisureOwner = source.leisureOwner
  source.output = node
  node.innerHTML = "<div><button onclick='Notebook.evalOutput(this)'>-&gt;</button></div>"
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
      tOff = restOff
      while m2 = t.match testPat
        r = makeRange(el, tOff + m2.index, tOff + m2.index + m2[0].length)
        r.leisureTest = JSON.parse(m2[1])
        tests.push r
        tOff += m2.index + m2[0].length
        t = leading.substring tOff
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
        body = txt.substring mainStart, exEnd
        if body.trim()
          outerRange = makeRange el, mainStart, exEnd
          if leading.match /@auto/ then outerRange.leisureAuto = true
          [outerRange, null, null, txt.substring(mainStart, exEnd), tests, next]
        else [null, null, null, null, tests, next]

makeRange = (el, off1, off2)->
  range = document.createRange()
  [node, offset] = grp el, off1, false
  if offset? then range.setStart(node, offset)
  else  range.setStartBefore node
  if off2?
    [node, offset] = grp el, off2, true
    if offset? then range.setEnd(node, offset)
    else range.setEndAfter node
  range

grp = (node, charOffset, end)->
  [child, offset] = ret = getRangePosition node.firstChild, charOffset, end
  if !child? then nodeEnd node.lastChild
  else ret

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

###
# handle focus manually, because focus and blur events don't seem to work in this case
###

oldFocus = null

focusBox = (box)->
  if box and box != oldFocus and oldFocus?.classList.contains 'codeMain' then evalDoc(box.leisureOwner)
  oldFocus = box

evalDoc = (el)->
  [pgm, auto] = initNotebook(el)
  try
    if auto
      auto = "do\n  #{auto.trim().replace /\n/, '\n  '}\n  finishLoading 'fred'"
      global.noredefs = false
      Notebook.queueAfterLoad ->
        Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false, false, false)), global)
      Leisure.eval(ReplCore.generateCode('_auto', auto, false))
    else Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false, false, false)), global)
  catch err
    alert(err.stack)

Leisure.define 'finishLoading', (bubba)->
  Prim.makeMonad (env, cont)->
    for i in postLoadQueue
      i()
    postLoadQueue = []
    cont(_false())

invisibleSvg = null

laz = Leisure.laz

Leisure.define 'svg-measure-text', (text)->(style)->(f)->
  if !invisibleSvg?
    invisibleSvg = createNode "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='bottom: -100000'/>"
    invisibleSvgText = document.createElementNS 'http://www.w3.org/2000/svg', 'text'
    invisibleSvgText.appendChild textNode ''
    invisibleSvgText.setAttribute 'id', 'HIDDEN_TEXT'
    invisibleSvg.appendChild invisibleSvgText
    document.body.appendChild(invisibleSvg)
  txt = document.getElementById 'HIDDEN_TEXT'
  if style() then txt.setAttribute 'style', style()
  txt.lastChild.textContent = text()
  bx = txt.getBBox()
  f()(laz(bx.width))(laz(bx.height))

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
root.makeRange = makeRange
root.grp = grp

#root.selection = -> window.getSelection().getRangeAt(0)
#root.test = -> flatten(root.selection().cloneContents().childNodes[0])
