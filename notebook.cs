###
# use an element as a Leisure notebook
###

if window? and (!global? or global == window)
  window.global = window
  Leisure = window.Leisure
  ReplCore = window.ReplCore
  window.Notebook = root = {}
  Prim = window.Prim
  Repl = window.Repl
else root = exports ? this

ENTER = 13

snapshot = (el, pgm)->

setSnapper = (snapFunc)-> snapshot = snapFunc

delay = (func)-> window.setTimeout func, 1

arrows = [37..40]

bindNotebook = (el)->
  pres = Repl.presentValue
  Repl.setValuePresenter (v)->
    if (ReplCore.getType v) == 'svg-node' then presentSvgNode v
    else pres(v)
  if !(document.getElementById 'channelList')?
    document.body.appendChild createNode """
<datalist id='channelList'>
   <option value=''></option>
   <option value='app'>app</option>
   <option value='compile'>compile</option>
   <option value='editorFocus'>editorFocus</option>
</datalist>"""
  Prim.defaultEnv.write = (msg)->console.log msg
  Prim.defaultEnv.owner = document.body
  Prim.defaultEnv.finishedEvent = (evt, channel)->update(channel ? 'app', Prim.defaultEnv)
  if !el.bound?
    el.bound = true
    el.addEventListener 'DOMCharacterDataModified', ((evt)->if !el.replacing then delay(->checkMutateFromModification evt)), true
    el.addEventListener 'DOMSubtreeModified', ((evt)->if !el.replacing then delay(->checkMutateFromModification evt)), true
    el.addEventListener 'click', ((e)-> delay highlightPosition), true
    el.addEventListener 'keydown', (e)->
      c = (e.charCode || e.keyCode || e.which)
      if printable c then clearAst getBox window.getSelection().focusNode
      if (c in arrows) or printable c then delay(highlightPosition)
      if e.ctrlKey and c == ENTER then handleKey("C-ENTER")
      if e.altKey and c == ENTER then handleKey("M-ENTER")
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
    el.addEventListener 'focus', (-> findCurrentCodeHolder()), true
    el.addEventListener 'blur', (-> findCurrentCodeHolder()), true
    el.autorunState = false

printableControls = (c.charCodeAt(0) for c in "\r\i\n\b")
printable = (code)-> (code > 0xf and code < 37) or code > 40 or code in printableControls

nonprintable = null
(->
  s=''
  for i in [0..0xf]
    s += String.fromCharCode(i)
  s.replace /[\i\r\f]/g, ''
  nonprintable = new RegExp("[#{s}]"))()

handleKey = (key)->
  switch key
    when "C-ENTER"
      box = getBox window.getSelection().focusNode
      if (box.getAttribute 'codeMainExpr')? then evalOutput box.output
      else if (box.getAttribute 'codeMain')? then acceptCode box
    when "M-ENTER"
      box = getBox window.getSelection().focusNode
      if (box.getAttribute 'codeMainExpr')? then clearOutputBox box.output

clearAst = (box)->
  cbox = getBox box
  cbox?.ast = null

#[node, positions]
oldBrackets = [null, Leisure.Nil]

highlightPosition = ->
  s = window.getSelection()
  if !s.rangeCount or !s.getRangeAt(0).collapsed then return
  focusBox s.focusNode
  parent = getBox s.focusNode
  if !parent or parent.getAttribute('LeisureOutput')? then return
  if parent.parentNode
    ast = getAst parent
    if ast?
      offset = ast.leisureCodeOffset ? 0
      r = s.getRangeAt(0)
      r.setStart parent, 0
      pos = getRangeText(r).length
      brackets = Leisure.bracket ast.leisureBase, pos - offset
      if oldBrackets[0] != parent or !oldBrackets[1].equals(brackets)
        oldBrackets = [parent, brackets]
        for node in document.querySelectorAll "[LeisureBrackets]"
          unwrap node
        for node in parent.querySelectorAll ".partialApply"
          unwrap node
        parent.normalize()
        markPartialApplies parent
        b = brackets
        ranges = []
        while b != Leisure.Nil
          ranges.push (makeRange parent, b.head.head + offset, b.head.tail.head + offset)
          b = b.tail
        for r, i in ranges
          span = document.createElement 'span'
          span.setAttribute 'LeisureBrackets', ''
          span.setAttribute 'class', if i == 0 then 'LeisureFunc' else 'LeisureArg'
          wrapRange r, span
        s.removeAllRanges()
        #parent.normalize()
        s.addRange(makeRange parent, pos)

wrapRange = (range, node)->
  try
    range.surroundContents node
  catch err
    contents = range.cloneContents()
    replaceRange range, node
    node.appendChild contents

replaceRange = (range, node)->
  range.deleteContents()
  range.insertNode node

getRangeText = (r)-> r.cloneContents().textContent

getBox = (node)->
  while node? and !(node.getAttribute?('LeisureBox'))?
    node = node.parentElement
  node

checkMutateFromModification = (evt)->
  b = getBox evt.target
  b2 = getBox window.getSelection().focusNode
  if b and b == b2
    if (isDef b) and b.classList.contains('codeMainExpr') then toDefBox b
    else if !(isDef b) and b.classList.contains('codeMain') then toExprBox b

toExprBox = (b)->
  b.removeAttribute 'codeMain'
  b.classList.remove 'codeMain'
  b.setAttribute 'codeMainExpr', ''
  b.classList.add 'codeMainExpr'
  makeOutputBox b

toDefBox = (b)->
  if b.output then b.parentNode.removeChild b.output
  b.removeAttribute 'codeMainExpr'
  b.classList.remove 'codeMainExpr'
  b.setAttribute 'codeMain', ''
  b.classList.add 'codeMain'

isDef = (box)->
  txt = box.textContent
  if (m = txt.match Leisure.linePat)
    [matched, leading, name, defType] = m
    return defType?.length > 0
  false

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
  snapshot(el, pgm)
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
<div LeisureOutput contentEditable='false' class='leisure_bar'><div class="leisure_bar_contents">
  <span class='leisure_load'>Load: </span>
  <input type='file' leisureId='loadButton'></input>
  <a download='program.lsr' leisureId='downloadLink'>Download</a>
  <a target='_blank' leisureId='viewLink'>View</a>
  <button leisureId='testButton'>Run Tests</button> <span leisureId='testResults' class="notrun"></span>
  <input type='checkbox' leisureId='autorunTests'><b>Auto</b></input>
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
  <button leisureId='processButton' style="float: right">Process</button></div>
</div>
"""
  spacer = createNode "<div LeisureOutput  contentEditable='false' class='leisure_space'></div>"
  el.insertBefore spacer, el.firstChild
  el.insertBefore controlDiv, el.firstChild
  [el.leisureDownloadLink, el.leisureViewLink, loadButton, testButton, el.testResults, el.autorun, themeSelect, viewSelect, processButton] = getElements el, ['downloadLink', 'viewLink', 'loadButton', 'testButton', 'testResults', 'autorunTests', 'themeSelect', 'viewSelect', 'processButton']
  loadButton.addEventListener 'change', (evt)-> loadProgram el, loadButton.files
  testButton.addEventListener 'click', -> runTests el
  themeSelect.value = el.leisureTheme ? 'thin'
  themeSelect.addEventListener 'change', (evt)-> changeTheme el, evt.target.value
  viewSelect.addEventListener 'change', (evt)-> changeView el, evt.target.value
  processButton.addEventListener 'click', -> evalDoc el
  el.autorun.checked = el.autorunState
  el.autorun.addEventListener 'change', (evt)->
    el.autorunState = el.autorun.checked
    if el.autorun.checked then runTests el
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

changeTheme = (el, value)->
  theme = value
  el.leisureTheme = theme
  el.className = theme

changeView = (el, value)-> alert 'new view: ' + value

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
  el.textContent = el.textContent.replace /\uFEFF/g, ''
  txt = el.lastChild
  if txt?.nodeType == 3 and (m = txt.data.match /(^|[^\n])(\n+)$/)
    txt.data = txt.data.substring(0, txt.data.length - m[2].length)

markupDefs = (el, defs)->
  pgm = ''
  auto = ''
  totalTests = 0
  for i in defs
    {main, name, def, body, tests} = i
    if name?
      bx = box main, 'codeMain', true
      bx.appendChild (codeSpan name, 'codeName')
      bx.appendChild (textNode def)
      #bod = codeSpan (markPartialApplies bx, body), 'codeBody'
      bod = codeSpan textNode(body), 'codeBody'
      bod.appendChild textNode('\n')
      bod.setAttribute('generatedNL', '')
      bx.appendChild bod
      bx.addEventListener 'blur', (-> evalDoc el), true
      markPartialApplies bx
      pgm += "#{name} #{def} #{body}\n"
    else if main?
      bx = box main, 'codeMainExpr', true
      #s = codeSpan (markPartialApplies bx, body), 'codeExpr'
      s = codeSpan textNode(body), 'codeExpr'
      s.setAttribute('generatedNL', '')
      s.appendChild textNode('\n')
      bx.appendChild s
      markPartialApplies bx
      if main.leisureAuto then auto += "#{body}\n"
      else makeOutputBox(bx)
    for test in tests
      replaceRange test, makeTestBox test.leisureTest
      totalTests++
  [pgm, auto, totalTests]

getAst = (bx, def)->
  if bx.ast? then bx.ast
  else
    def = def || bx.textContent
    bx.ast = (Leisure.compileNext def, Leisure.Nil, true, null, true)[0]

# mark partial applies within bx
# the last child of bx should be a fresh expr span with the full code in it
markPartialApplies = (bx, def)->
  bx.normalize()
  def = def ? bx.textContent
  ast = getAst bx, def
  partial = []
  ((Leisure.findFuncs(ast)) Leisure.Nil).each (f)->
    name = Leisure.getRefVar(f.head)
    arity = global[Leisure.nameSub(name)]?()?.leisureArity
    if (arity and f.tail.head < arity)
      partial.push [f.head, arity, f.tail.head]
  if partial.length
    ranges = []
    offset = ast.leisureCodeOffset ? 0
    t = bx.lastChild.firstChild
    for info in partial
      p = info[0]
      r = document.createRange()
      r.setStart t, p.leisureStart + offset
      r.setEnd t, p.leisureEnd + offset
      r.expected = info[1]
      r.actual = info[2]
      ranges.push r
    for r in ranges
      c = r.extractContents()
      s = document.createElement 'span'
      s.setAttribute 'Leisure', ''
      s.setAttribute 'expected', String(r.expected)
      s.setAttribute 'actual', String(r.actual)
      s.classList.add 'partialApply'
      s.appendChild c
      r.insertNode s

textNode = (text)-> document.createTextNode(text)

nodeFor = (text)-> if typeof text == 'string' then textNode(text) else text

evalOutput = (exBox)->
  exBox = getBox exBox
  focusBox exBox
  cleanOutput exBox, true
  makeOutputControls exBox
  [updateSelector, stopUpdates] = getElements exBox.firstChild, ['chooseUpdate', 'stopUpdates']
  updateSelector.addEventListener 'change', (evt)-> setUpdate exBox, evt.target.value
  updateSelector.addEventListener 'keydown', (e)->
    c = (e.charCode || e.keyCode || e.which)
    if c == 13
      e.preventDefault()
      updateSelector.blur()
  updateSelector.value = (exBox.getAttribute 'leisureUpdate') or ''
  exBox.updateSelector = updateSelector
  ReplCore.processLine(prepExpr(getExprSource exBox.source), envFor(exBox))

getExprSource = (box)->
  s = window.getSelection()
  b = getBox s.focusNode
  if b != box or !s.rangeCount or s.getRangeAt(0).collapsed then box.textContent
  else getRangeText s.getRangeAt(0)

setUpdate = (el, channel)->
  el.setAttribute 'leisureUpdate', channel
  ast = getAst el.source
  #console.log 'update leading:', (el.textContent).substring(0, ast.leisureCodeOffset)

makeOutputControls = (exBox)->
  if exBox.firstChild.firstChild == exBox.firstChild.lastChild
    exBox.firstChild.appendChild createFragment("""<button onclick='Notebook.clearOutputBox(this)'>X</button><button onclick='Notebook.makeTestCase(this)' leisureId='makeTestCase'>Make test case</button> <b>Update:</b> <input type='text' placeholder='Click for updating' list='channelList' leisureId='chooseUpdate'></input><button onclick='Notebook.clearUpdates(this)' leisureId='stopUpdates'>Clear</button>""")

clearUpdates = (widget)->
  exBox = getBox widget
  exBox.updateSelector.value = ''
  setUpdate exBox, ''

update = (type, env)->
  env = env ? Prim.defaultEnv
  for node in env.owner.querySelectorAll "[leisureUpdate=#{type}]"
    evalOutput node

clearOutputBox = (exBox)->
  clearUpdates exBox
  cleanOutput(exBox)

cleanOutput = (exBox, preserveControls)->
  exBox = getBox exBox
  if !preserveControls
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
  box = makeTestBox test, owner(exBox)
  source.parentNode.insertBefore box, source
  source.parentNode.removeChild source
  output.parentNode.removeChild output
  # semi-fix to allow you to position the caret properly before and after a test case
  box.parentNode.insertBefore textNode('\uFEFF'), box
  box.parentNode.insertBefore textNode('\uFEFF'), box.nextSibling
  if owner(box).autorun.checked then clickTest(box)

makeTestBox = (test, owner, src)->
  src = src ? "#@test #{JSON.stringify test}"
  s = codeSpan src, 'codeTest'
  s.appendChild textNode('\n')
  s.setAttribute('generatedNL', '')
  bx = codeBox 'codeMainTest'
  bx.setAttribute 'class', 'codeMainTest notrun'
  bx.setAttribute 'contenteditable', 'false'
  bx.appendChild s
  bx.addEventListener 'click', (-> clickTest bx), true
  bx.test = test
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
  #console.log "RUNNING:\n #{test.expr}\nRESULT:\n #{test.result}"
  passed = true
  ReplCore.processLine(prepExpr(test.expr), (
    require: req
    write: ->
    prompt: (msg, cont)-> cont(null)
    processResult: (result)-> passed = showResult bx, Repl.escapeHtml(Pretty.print(result)), Repl.escapeHtml(test.result)
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
  finishedEvent: (evt, channel)->update(channel ? 'app', this)
  owner: owner(box)
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
  source.output = node
  node.innerHTML = "<div><button onclick='Notebook.evalOutput(this)'>-&gt;</button></div>"
  source.parentNode.insertBefore node, source.nextSibling
  node

codeSpan = (text, boxType)->
  node = document.createElement 'span'
  node.setAttribute boxType, ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'class', boxType
  node.appendChild nodeFor(text)
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
      rest = rng.next
      if rng then ranges.push(rng)
      else break
    else break
  ranges

testPat = /(#@test([^\n]*))\n/

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
      leadOff = tOff = restOff
      while m2 = t.match testPat
        r = makeRange(el, tOff + m2.index, tOff + m2.index + m2[1].length)
        r.leisureTest = JSON.parse(m2[2])
        tests.push r
        tOff += m2.index + m2[1].length
        t = leading.substring tOff - leadOff
      if name?
        mainStart = matchStart + (leading?.length ? 0)
        nameEnd = mainStart + name.length
        leadingSpaces = (rest1.match /^\s*/)[0].length
        bodyStart = txt.length - (rest1.length - leadingSpaces)
        outerRange = makeRange el, mainStart, mainEnd
        main: outerRange
        name: txt.substring(mainStart, nameEnd)
        def: defType
        body: txt.substring(bodyStart, mainEnd)
        tests: tests
        next: next
      else
        mainStart = if defType == '=' then restOff + m.index + m[0].length else matchStart + (leading?.length ? 0)
        ex = txt.substring(mainStart, mainEnd).match /^(.*[^ \n])[ \n]*$/
        exEnd = if ex then mainStart + ex[1].length else mainEnd
        body = txt.substring mainStart, exEnd
        if body.trim()
          textStart = restOff + m.index + (if t then leading.length - t.length else 0)
          #if leading? and (lm = leading.match /^[ \n]+/) then textStart += lm[0].length
          if t? and (lm = t.match /^[ \n]+/) then textStart += lm[0].length
          #if leading.match /@auto/
          if t.match /@auto/
            outerRange = makeRange el, textStart, exEnd
            outerRange.leisureAuto = true
            main: outerRange
            name: null
            def: null
            body: txt.substring(textStart, exEnd)
            tests: tests
            fullText: txt.substring(textStart, exEnd)
            next: next
          else
            outerRange = makeRange el, textStart, exEnd
            main: outerRange
            name: null
            def: null
            body: txt.substring(textStart, exEnd)
            tests: tests
            next: next
        else
          main: null
          name: null
          def: null
          body: null
          tests: tests
          next: next

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
  if child then ret
  else if node.lastChild then nodeEnd node.lastChild
  else [node, if end then 1 else 0]

getRangePosition = (node, charOffset, end)->
  if !node then [null, charOffset]
  else if node.nodeType == 3
    if node.length > (if end then charOffset - 1 else charOffset) then [node, charOffset]
    else
      ret = continueRangePosition node, charOffset - node.length, end
      ret
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
  else if node.nextSibling? then getRangePosition node.nextSibling, newOff, end
  else continueRangePosition node.parentNode, newOff, end

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
# handle focus manually, because grabbing focus and blur events doesn't seem to work for the parent
###
docFocus = null
codeFocus = null

findCurrentCodeHolder = -> focusBox window.getSelection()?.focusNode

focusBox = (box)->
  newCode = null
  while box and (box.nodeType != 1 or !(box.getAttribute 'leisureCode')?)
    if box.nodeType == 1 and (box.getAttribute 'LeisureBox')? then newCode = box
    box = box.parentNode
  if box != docFocus
    docFocus?.classList.remove 'focused'
    docFocus = box
    box?.classList?.add 'focused'
  if newCode != codeFocus
    old = codeFocus
    codeFocus = newCode
    if old then acceptCode old
    #if newCode then console.log "Code box gained focus: #{newCode}"

owner = (box)->
  while box and (box.nodeType != 1 or !(box.getAttribute 'leisureCode')?)
    box = box.parentNode
  box

acceptCode = (box)->
  if (box.getAttribute 'codemain')?
    ReplCore.processLine box.textContent, envFor(box), 'Leisure.'
    update 'compile'
    if owner(box).autorun.checked then runTests owner(box)

evalDoc = (el)->
  [pgm, auto] = initNotebook(el)
  try
    if auto
      auto = "do\n  #{auto.trim().replace /\n/g, '\n  '}\n  finishLoading 'fred'"
      global.noredefs = false
      Notebook.queueAfterLoad ->
        Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false, false, false)), global)
        if el.autorunState then runTests el
      e = envFor(el)
      e.write = ->
      e.processError = (ast)->alert(ast.err)
      ReplCore.processLine(auto, e)
    else Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false, false, false)), global)
  catch err
    console.log err
    alert(err.stack)

Leisure.define 'finishLoading', (bubba)->
  Prim.makeMonad (env, cont)->
    for i in postLoadQueue
      i()
    postLoadQueue = []
    cont(_false())

Leisure.define 'config', (expr)->
  Prim.makeMonad (env, cont)->
    switch expr()
      when 'autoTest' then autoRun(env.owner, true)
    cont(_false())

autoRun = (el, state)->
  el.autorunState = state
  el.autorun?.checked = state

head = (l)->l ->(hh)->(tt)->hh()
tail = (l)->l ->(hh)->(tt)->tt()
id = (v)->v()
laz = Leisure.laz

getSvgElement = (id)->
  if (el = document.getElementById id) then el
  else
    svg = createNode "<svg id='HIDDEN_SVG' xmlns='http://www.w3.org/2000/svg' version='1.1' style='bottom: -100000'><text id='HIDDEN_TEXT'>bubba</text></svg>"
    document.body.appendChild(svg)
    document.getElementById id

svgMeasureText = (text)->(style)->(f)->
  txt = getSvgElement('HIDDEN_TEXT')
  if style() then txt.setAttribute 'style', style()
  txt.lastChild.textContent = text()
  bx = txt.getBBox()
  f()(laz(bx.width))(laz(bx.height))

primconcatNodes = (nodes)->
  if nodes == _nil() then ""
  else (head nodes)(id) + concatNodes tail nodes

transformedPoint = (pt, x, y, ctm, ictm)->
  pt.x = x
  pt.y = y
  pt.matrixTransform(ctm).matrixTransform(ictm)

# try to take strokeWidth into account
svgMeasure = (content)-> primSvgMeasure content, baseStrokeWidth

# try to take strokeWidth into account
svgBetterMeasure = (content)-> primSvgMeasure content, transformStrokeWidth

# try to take strokeWidth into account
primSvgMeasure = (content, transformFunc)->(f)->
  svg = createNode "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='bottom: -100000'><g>#{content()}</g></svg>"
  document.body.appendChild(svg)
  g = svg.firstChild
  bbox = g.getBBox()
  pad = getMaxStrokeWidth g, g, svg, transformFunc
  document.body.removeChild(svg)
  f()(laz(bbox.x - Math.ceil(pad/2)))(laz(bbox.y - Math.ceil(pad/2)))(laz(bbox.width + pad))(laz(bbox.height + pad))

baseElements = ['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon']

getMaxStrokeWidth = (el, base, svg, transformFunc)->
  if base.nodeName in baseElements
    #hack to parse strokeWidth string by setting the width of the svg to it
    svg.setAttribute 'width', (getComputedStyle(base).strokeWidth ? '0'), svg
    transformFunc el, svg.width.baseVal.value
  else if base.nodeName == 'use' then getMaxStrokeWidth base, base.instanceRoot.correspondingElement, svg, transformFunc
  else if base.nodeName == 'g'
    Leisure.foldLeft ((v, n)-> Math.max v, (getMaxStrokeWidth n, n, svg, transformFunc)), 0, el.childNodes
  else 0

baseStrokeWidth = (el, w)-> w

transformStrokeWidth = (el, w)->
  if w == 0 then 0
  else
    ctm = el.getScreenCTM()
    tp1 = transformedPoint pt, bx.x - Math.ceil(w), bx.y - Math.ceil(w), ctm, isctm
    tp2 = transformedPoint pt, bx.x + bx.width + Math.ceil(w), bx.y + bx.height + Math.ceil(w), ctm, isctm
    x = tp2.x - tp1.x
    y = tp2.y - tp1.y
    Math.sqrt(x * x + y * y)

presentSvgNode = (node)->
  content = node(laz(id))
  _svg$_present()(laz(content))(laz(id))

Prim.defaultEnv.require = req

root.svgMeasureText = svgMeasureText
root.svgMeasure = svgMeasure
root.initNotebook = initNotebook
root.bindNotebook = bindNotebook
root.evalOutput = evalOutput
root.makeTestCase = makeTestCase
root.cleanOutput = cleanOutput
root.clearOutputBox = clearOutputBox
root.envFor = envFor
root.queueAfterLoad = queueAfterLoad
root.evalDoc = evalDoc
root.getBox = getBox
root.makeRange = makeRange
root.grp = grp
root.changeTheme = changeTheme
root.setSnapper = setSnapper
root.update = update
root.clearUpdates = clearUpdates

#root.selection = -> window.getSelection().getRangeAt(0)
#root.test = -> flatten(root.selection().cloneContents().childNodes[0])
