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
  Xus = window.Xus
else root = exports ? this

#debug = true
debug = false

BS = 8
TAB = 9
ENTER = 13
DEL = 46
LEFT_ARROW = 37
arrows = [37..40]
updatePat = /(^|\n)(#@update )([^\n]+)(?:^|\n)/
peer = null
nextId = 0

snapshot = (el, pgm)->

setSnapper = (snapFunc)-> snapshot = snapFunc

delay = (func)-> window.setTimeout func, 1

basePresentValue = null

presentValue = (v)->
  if (ReplCore.getType v) == 'svgNode'
    content = v(laz(id))
    _svgPresent()(laz(content))(laz(id))
  else basePresentValue(v)

bootNotebook = (el)->
  if !(document.getElementById 'channelList')?
    document.body.appendChild createNode """
<datalist id='channelList'>
   <option value=''></option>
   <option value='app'>app</option>
   <option value='compile'>compile</option>
   <option value='editorFocus'>editorFocus</option>
</datalist>"""
  createPeer()

createPeer = ->
  root.xusServer = server = new Xus.Server()
  server.exit = ->
    console.log "CLOSING WINDOW"
    window.open '', '_self', ''
    window.close()
  peer = root.peer = Xus.createDirectPeer server
  peer.server = server
  peer.listen 'leisure/selection/contents', true, (key, value)->
    if key == 'leisure/selection/contents'
      s = window.getSelection()
      if s.rangeCount && s.toString() != value
        r = s.getRangeAt 0
        r.deleteContents()
        node = document.createTextNode value.toString()
        r.insertNode node
        s.removeAllRanges()
        r.selectNode node
        s.addRange(r)
  peer.set 'leisure/evalExpr', null, 'transient'
  peer.listen 'leisure/evalExpr', false, (key, value)->
    if key == 'leisure/evalExpr' && value?
      [expr, result] = value
      console.log "EVAL: #{expr}, RESULT: #{result}"
      ReplCore.processLine expr, xusEnv(result, expr), 'Parse.'
  peer.set 'leisure/document', peerGetDocument
  peer.set 'leisure/functions', peerGetFunctions
  if document.location.hash
    params = {}
    for param in document.location.hash.substring(1).split '&'
      [k, v] = param.split '='
      params[k.toLowerCase()] = decodeURIComponent v
    if params.xusproxy? then Xus.xusToProxy(server, params.xusproxy)

xusEnv = (resultVar, expr)->
  result = ''
  debug: debug
  finishedEvent: ->
  owner: null
  require: req
  write: (msg)-> result += "#{msg}\n"
  prompt:(msg, cont)-> result += "Attempt to prompt with #{msg}"
  processResult: (res, ast)->
    result += res
    peer.set resultVar, result
  presentValue: (x)-> x
  processError: (ast)->
    result += if ast.err.leisureContext then "ERROR: #{ast.err}:\n#{leisureContextString(ast.err)}\n#{ast.err.stack}" else "Couldn't parse: #{expr}"
    peer.set resultVar, result

peerGetDocument = ->
  nodes = document.querySelectorAll "[leisurenode='code']"
  if nodes.length > 1 || Notebook.md then getMDDocument()
  else getSimpleDocument()

peerGetFunctions = -> (_.uniq window.leisureFuncNames.toArray().sort(), true).sort()

getMDDocument = (nodes)->
  #Notebook.md.replace /<pre.*\/pre>/g, (match)-> '\n=>' + match.replace('\n', '\n->')
  md = ''
  for node in document.querySelector('[doc]').childNodes
    md += if isLeisureCode node then "```\n#{getElementCode node}\n```\n" else node.md ? ''
  md

makeId = (el)-> if !el.id then el.id = "Leisure-#{nextId++}"

bindNotebook = (el)->
  if !basePresentValue
    basePresentValue = Prim.defaultEnv.presentValue
    Prim.defaultEnv.presentValue = presentValue
    Prim.defaultEnv.write = (msg)->console.log msg
    Prim.defaultEnv.owner = document.body
    Prim.defaultEnv.finishedEvent = (evt, channel)->update(channel ? 'app', Prim.defaultEnv)
    Prim.defaultEnv.debug = debug
  if !el.bound?
    makeId el
    el.bound = true
    el.addEventListener 'DOMCharacterDataModified', ((evt)->if !el.replacing then delay(->checkMutateFromModification evt)), true
    el.addEventListener 'DOMSubtreeModified', ((evt)->if !el.replacing then delay(->checkMutateFromModification evt)), true
    el.addEventListener 'mousedown', ((e)-> delay highlightPosition), true
    el.addEventListener 'mousemove', ((e)-> delay highlightPosition), true
    el.addEventListener 'mouseup', ((e)-> delay highlightPosition), true
    el.addEventListener 'keydown', (e)->
      c = (e.charCode || e.keyCode || e.which)
      if c == DEL || c == BS
        s = window.getSelection()
        r = s.getRangeAt(0)
        if c == BS
          checkDeleteExpr getBox r.startContainer
          if skipLeftOverOutputBox el, r then return e.preventDefault()
        else if c == DEL
          checkDeleteExpr getBox r.startContainer
          if ignoreDeleteOutputBox el, r then return e.preventDefault()
      if printable c then clearAst getBox window.getSelection().focusNode
      if (c in arrows) or printable c then delay(highlightPosition)
      if e.ctrlKey and c == ENTER then handleKey("C-ENTER")
      else if e.altKey and c == ENTER then handleKey("M-ENTER")
      else if c == TAB
        handleKey("TAB")
        e.preventDefault()
    el.addEventListener 'keypress', (e)->
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
    if window.leisureAutoRunAll
      autoRun el, true
      window.setTimeout (->runTests el), 1
    else el.autorunState = false

checkDeleteExpr = (node)->
  if isOutput node && node.output
    out = node.output
    window.setTimeout (->
      if !node.textContent.trim() then node.parentNode.removeChild node
      if !node.parentNode? then out.parentNode.removeChild out
    ), 1

skipLeftOverOutputBox = (el, r)->
  el.normalize()
  box = previousBoxRangeInternal(r) || previousBoxRangeStart r
  if isOutput box
    s = window.getSelection()
    r.selectNode box
    r.collapse true
    s.removeAllRanges()
    s.addRange r
    true
  else false

previousBoxRangeInternal = (r)->
  r.startContainer.nodeType == 1 && r.startOffset > 0 && r.startContainer.childNodes[r.startOffset - 1]

previousBoxRangeStart = (r)->
  r.startContainer.nodeType == 3 && r.startOffset == 0 && previousSibling r.startContainer


ignoreDeleteOutputBox = (el, r)->
  el.normalize()
  if r.startContainer.nodeType == 3 && r.startOffset == r.startContainer.length
    n = r.startContainer
    n = n.parentNode while n && n.nextSibling == null
    isOutput n?.nextSibling
  else
    false

isOutput = (el)-> el?.nodeType == 1 && el.hasAttribute 'LeisureOutput'

isLeisureCode = (el)-> el?.nodeType == 1 && el.getAttribute('leisureNode') == 'code'

peerNotifySelection = (el, str)->
  peer.set 'leisure/selection/id', (if el then el.id else null)
  peer.set 'leisure/selection/contents', str

printableControlCharacters = (c.charCodeAt(0) for c in "\r\i\n\b")
printable = (code)-> (code > 0xf and code < 37) or code > 40 or code in printableControlCharacters

nonprintable = null
(->
  s=''
  for i in [0..0xf]
    s += String.fromCharCode(i)
  s.replace /[\i\r\f]/g, ''
  nonprintable = new RegExp("[#{s}]"))()

handleKey = (key)->
  switch key
    when "C-ENTER", "TAB"
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
oldBrackets = [null, Parse.Nil]

cleanEmptyNodes = (el)->
  prev = el.previousSibling
  next = el.nextSibling
  if el.nodeType == 1 && el.textContent.trim() == '' && el.parentNode?.hasAttribute 'doc'
    el.parentNode.removeChild el
  if next == nextSibling prev then mergeLeisureCode prev, next

presentLeisureCode = (node, doEval)->
  node.setAttribute 'contentEditable', 'true'
  Notebook.bindNotebook node
  Notebook.changeTheme node, 'thin'
  if doEval then Notebook.evalDoc node else Notebook.initNotebook node

mergeLeisureCode = (el1, el2)->
  if el1.hasAttribute('leisureNode') && el1.getAttribute('leisureNode') == el2.getAttribute('leisureNode')
    newCode = textNode el1.md = if el1.getAttribute('leisureNode') == 'code' then "#{getElementCode(el1)}\n#{getElementCode el2}" else "#{el1.md}\n#{el2.md}"
    #el1.innerHTML = ''
    #el1.appendChild newCode
    #el2.parentNode.removeChild el2
    #presentLeisureCode el1, false
    #if el1.autorunState then Notebook.runTests el1
    r = document.createRange()
    r.selectNodeContents el2
    el1.appendChild r.extractContents()
    el2.parentNode.removeChild el2

highlightPosition = ->
  parent = null
  s = window.getSelection()
  if s.rangeCount
    if cleanEmptyNodes s.getRangeAt(0).startContainer then return
    focusBox s.focusNode
    parent = getBox s.focusNode
    if s.getRangeAt(0)?.collapsed
      if !parent or isOutput parent then return
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
            while b != Parse.Nil
              ranges.push (makeRange parent, b.head().head() + offset, b.head().tail().head() + offset)
              b = b.tail()
            for r, i in ranges
              span = document.createElement 'span'
              span.setAttribute 'LeisureBrackets', ''
              span.setAttribute 'class', if i == 0 then 'LeisureFunc' else 'LeisureArg'
              wrapRange r, span
            s.removeAllRanges()
            #parent.normalize()
            s.addRange(makeRange parent, pos)
    if parent?.ast?.leisureName? then update "sel-#{parent.ast.leisureName}"
  peerNotifySelection parent, s.toString()

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
  for node in b.querySelectorAll '.astbutton'
    remove node
  makeOutputBox b

toDefBox = (b)->
  if b.output then remove b.output
  b.removeAttribute 'codeMainExpr'
  b.classList.remove 'codeMainExpr'
  b.setAttribute 'codeMain', ''
  b.classList.add 'codeMain'
  addDefControls b

addDefControls = (box)->
  box.appendChild createNode "<button onclick='Notebook.showAst(this.parentNode)' class='astbutton' title='Show AST'></button>"

remove = (node)->node.parentNode?.removeChild node

showAst = (box)->
  name = (getAst box).leisureName
  if box.astOut?
    remove box.astOut.output
    remove box.astOut
    box.astOut = null
  else if name?
    node = codeBox 'codeMainExpr'
    box.astOut = node
    node.setAttribute 'leisureOutput', ''
    box.parentNode.insertBefore node, box.nextSibling
    node.textContent = "#@update sel-#{name}\ntreeForNotebook #{name}"
    output = makeOutputBox node
    toggleEdit output
    evalOutput output, true

isDef = (box)->
  txt = box.textContent
  if (m = txt.match Leisure.linePat)
    [matched, leading, name, defType] = m
    return defType?.length > 0
  false

initNotebook = (el)->
  ReplCore.setNext ->3
  el.replacing = true
  removeOldDefs el
  pgm = markupDefs el, findDefs el
  ###
  if !(el?.lastChild?.nodeType == 3 and el.lastChild.data[el.lastChild.data.length - 1] == '\n')
    el.appendChild textNode('\n')
    el.appendChild textNode('\n')
    el.appendChild textNode('\n')
  ###
  el.normalize()
  el.replacing = false
  if !el.hasAttribute('noLeisureBar')
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
    if el.autorunState then runTests el
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
  builder = new WebKitBlobBuilder()
  builder.append getElementCode el
  blob = builder.getBlob('text/plain')
  el.leisureDownloadLink.href = window.URL.createObjectURL(blob)
  el.leisureViewLink.href = window.URL.createObjectURL(blob)

getElementCode = (el)->
  r = document.createRange()
  r.selectNode(el)
  c = r.cloneContents().firstChild
  removeOldDefs c
  c.textContent

runTests = (el)->
  passed = 0
  failed = 0
  for test in el.querySelectorAll '.codeMainTest'
    if runTest test then passed++ else failed++
  if el.testResults
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

changeView = (el, value)->
  debug = value == 'debugging'
  alert 'new view: ' + value + ", debug: " + debug

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
    remove node
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
      addDefControls bx
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
  if bx.ast?
    patchFuncAst bx.ast
    bx.setAttribute 'leisureFunc', (bx.ast.leisureName ? '')
    bx.ast
  else
    def = def || bx.textContent
    #setAst bx, (Leisure.compileNext def, Parse.Nil, true, null, true)[0]
    setAst bx, (Leisure.compileNext def, Parse.Nil, true, null)[0]
    bx.ast

setAst = (bx, ast)->
  bx.ast = ast
  patchFuncAst ast

patchFuncAst = (ast)->
  if ast?.leisureName?
    window[Parse.nameSub(ast.leisureName)]?()?.ast = ast
    window[Parse.nameSub(ast.leisureName)]?()?.src = ast.leisureSource
    update "ast-#{ast.leisureName}"

# mark partial applies within bx
# the last child of bx should be a fresh expr span with the full code in it
markPartialApplies = (bx, def)->
  bx.normalize()
  def = def ? bx.textContent
  ast = getAst bx, def
  partial = []
  ((Leisure.findFuncs(ast)) Parse.Nil).each (f)->
    name = Parse.getRefVar(f.head())
    arity = global[Parse.nameSub(name)]?()?.leisureArity
    if (arity and f.tail().head() < arity)
      partial.push [f.head(), arity, f.tail().head()]
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

evalOutput = (exBox, nofocus)->
  exBox = getBox exBox
  if !nofocus then focusBox exBox
  cleanOutput exBox, true
  selector = findUpdateSelector exBox.source
  if selector then exBox.setAttribute 'leisureUpdate', selector
  makeOutputControls exBox
  [updateSelector, stopUpdates] = getElements exBox.firstChild, ['chooseUpdate', 'stopUpdates']
  updateSelector.addEventListener 'change', (evt)-> setUpdate exBox, evt.target.value
  updateSelector.addEventListener 'keydown', (e)->
    c = (e.charCode || e.keyCode || e.which)
    if c == ENTER
      e.preventDefault()
      updateSelector.blur()
  updateSelector.value = (exBox.getAttribute 'leisureUpdate') or ''
  exBox.updateSelector = updateSelector
  evalBox exBox.source, exBox

findUpdateSelector = (box)->
  if def = box.textContent.match Leisure.linePat
    [matched, leading, name, defType] = def
    if u = leading.match updatePat then u[3]

getExprSource = (box)->
  s = window.getSelection()
  b = getBox s.focusNode
  if b != box or !s.rangeCount or s.getRangeAt(0).collapsed then box.textContent
  else getRangeText s.getRangeAt(0)

setUpdate = (el, channel, preserveSource)->
  el.setAttribute 'leisureUpdate', channel
  ast = getAst el.source
  txt = el.source.textContent
  if !preserveSource and def = txt.match Leisure.linePat
    [matched, leading, name, defType] = def
    index = def.index
    if u = leading.match updatePat
      index += u.index + u[1].length + u[2].length
      r = makeRange el.source, index, index + u[3].length
      r.deleteContents()
    else r = makeRange el.source, index + leading.length, index + leading.length
    r.insertNode textNode(channel)
    el.source.normalize()

checkHideSource = (box)->
  if !box.hideSource and box.firstElementChild?.nextElementSibling?.nextElementSibling?
    box.hideSource = true
    hs = createNode "<button class='editToggle' style='float:right'></button>"
    hs.addEventListener 'click', -> toggleEdit(hs)
    box.firstElementChild.appendChild hs

makeOutputControls = (exBox)->
  if exBox.firstChild.firstChild == exBox.firstChild.lastChild
    exBox.firstChild.insertBefore createFragment("""<button onclick='Notebook.clearOutputBox(this)'>X</button>"""), exBox.firstChild.firstChild
    exBox.firstChild.appendChild createFragment("""<button onclick='Notebook.makeTestCase(this)' leisureId='makeTestCase'>Make test case</button><b>Update: </b><input type='text' placeholder='Click for updating' list='channelList' leisureId='chooseUpdate'></input><button onclick='Notebook.clearUpdates(this)' leisureId='stopUpdates'>Stop Updates</button>""")
    exBox.classList.add 'fatControls'

toggleEdit = (toggleButton)->
  output = getBox toggleButton
  if output.classList.contains 'hidingSource'
    output.classList.remove 'hidingSource'
    output.source.style.display = ''
  else
    output.classList.add 'hidingSource'
    output.source.style.display = 'none'

clearUpdates = (widget, preserveSource)->
  exBox = getBox widget
  exBox.updateSelector.value = ''
  setUpdate exBox, '', preserveSource

update = (type, env)->
  env = env ? Prim.defaultEnv
  for node in env.owner.querySelectorAll "[leisureUpdate=#{type}]"
    evalOutput node, true

clearOutputBox = (exBox)->
  clearUpdates exBox, true
  cleanOutput(exBox)

cleanOutput = (exBox, preserveControls)->
  exBox = getBox exBox
  exBox.classList.remove 'fatControls'
  if !preserveControls
    exBox.hideSource = null
    fc = exBox.firstChild
    fc.removeChild fc.firstChild
    while fc.firstChild != fc.lastChild
      fc.removeChild fc.lastChild
  while exBox.firstChild != exBox.lastChild
    exBox.removeChild exBox.lastChild

makeTestCase = (exBox)->
  output = getBox exBox
  source = output.source
  test =
    expr: source.textContent.trim()
    expected: Repl.escapeHtml(Parse.print(output.result))
  box = makeTestBox test, owner(exBox)
  source.parentNode.insertBefore box, source
  remove source
  remove output
  # semi-fix to allow you to position the caret properly before and after a test case
  box.parentNode.insertBefore textNode('\uFEFF'), box
  box.parentNode.insertBefore textNode('\uFEFF'), box.nextSibling
  if owner(box).autorunState then clickTest(box)

makeTestBox = (test, owner, src)->
  src = src ? "#@test #{JSON.stringify test.expr}\n#@expected #{JSON.stringify test.expected}"
  s = codeSpan src, 'codeTest'
  s.appendChild textNode('\n')
  s.setAttribute('generatedNL', '')
  bx = codeBox 'codeMainTest'
  bx.testSrc = s
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
    debug: debug
    prompt: (msg, cont)-> cont(null)
    processResult: (result, ast)-> passed = showResult bx, Repl.escapeHtml(Parse.print(result)), Repl.escapeHtml(test.expected)
    processError: passed = false
  ))
  passed

showResult = (bx, actual, expected)->
  cl = bx.classList
  cl.remove 'notrun'
  if actual == expected
    cl.remove 'failed'
    cl.add 'passed'
    bx.testSrc.innerHTML = "#@test #{JSON.stringify bx.test.expr}\n#@expected #{JSON.stringify bx.test.expected}"
  else
    cl.remove 'passed'
    cl.add 'failed'
    bx.testSrc.innerHTML = "#@test #{JSON.stringify bx.test.expr}\n#@expected #{JSON.stringify bx.test.expected}\n#@result #{JSON.stringify actual}"
    console.log "expected <#{expected}> but got <#{actual}>"
  actual == expected

prepExpr = (txt)-> if txt[0] in '=!' then txt else "=#{txt}"

envFor = (box)->
  exBox = getBox box
  debug: debug
  finishedEvent: (evt, channel)->update(channel ? 'app', this)
  owner: owner(box)
  require: req
  write: (msg)->
    div = document.createElement('div')
    div.innerHTML = "#{msg}\n"
    exBox.appendChild(div)
    checkHideSource exBox
  prompt:(msg, cont)-> cont(window.prompt(msg))
  processResult: (result, ast)->
    box.result = result
    setAst box, ast
  presentValue: presentValue
  processError: (ast)->
    btn = box.querySelector '[leisureId="makeTestCase"]'
    if btn then remove btn
    @write "ERROR: #{if ast.err.leisureContext then "#{ast.err}:\n#{leisureContextString(ast.err)}\n" else ''}#{ast.err.stack}"

leisureContextString = (err)-> (linkSource func, offset for [func, offset] in err.leisureContext.toArray()).join('\n')

linkSource = (funcName, offset)->
  [src, start, end] = Leisure.funcContextSource funcName, offset
  "  <a href='javascript:void(Notebook.showSource(\"#{funcName}\", #{offset}))'>#{funcName}:#{start},#{end}</a>"

showSource = (funcName, offset)->
  [src, start, end] = Leisure.funcContextSource funcName, offset
  alert("#{funcName} = #{src.substring(0, start)} << #{src.substring(start, end)} >> #{src.substring(end)}")

makeOutputBox = (source)->
  node = document.createElement 'div'
  node.setAttribute 'LeisureOutput', ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'LeisureBox', ''
  node.setAttribute 'class', 'output'
  node.setAttribute 'contentEditable', 'false'
  node.source = source
  source.output = node
  node.innerHTML = "<div class='controls'><button onclick='Notebook.evalOutput(this)'>-&gt;</button></div>"
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

testPat = /(#@test([^\n]*)\n#@expected([^\n]*))\n/m

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
        r.leisureTest = expr: JSON.parse(m2[2]), expected: JSON.parse(m2[3])
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
  if offset? and offset > 0 then range.setStart(node, offset)
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
  while box and (box.nodeType != 1 or !isLeisureCode box)
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
  while box and (box.nodeType != 1 or !isLeisureCode box)
    box = box.parentNode
  box

evalBox = (box, envBox)->
  ReplCore.processLine box.textContent, (if envBox? then envFor(envBox) else null), 'Parse.'
  getAst box

acceptCode = (box)->
  if (box.getAttribute 'codemain')?
    evalBox box
    update 'compile'
    if owner(box).autorunState then runTests owner(box)

evalDoc = (el)->
  [pgm, auto] = initNotebook(el)
  try
    if auto
      auto = "do\n  #{auto.trim().replace /\n/g, '\n  '}\n  finishLoading 'fred'"
      global.noredefs = false
      Notebook.queueAfterLoad ->
        evalDocCode el, pgm
        if el.autorunState then runTests el
      e = envFor(el)
      console.log "ENV DEBUG: #{e.debug}"
      e.write = ->
      e.processError = (ast)->alert(ReplCore.errString ast.err)
      ReplCore.processLine(auto, e, 'Parse.')
    else evalDocCode el, pgm
  catch err
    console.log err
    alert(err.stack)

evalDocCode = (el, pgm)->
  Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false, false, false, null, debug), global))
  for node in el.querySelectorAll '[codeMain]'
    getAst node

Parse.define 'finishLoading', ->(bubba)->
  Prim.makeMonad (env, cont)->
    for i in postLoadQueue
      i()
    postLoadQueue = []
    cont(_false())

Parse.define 'quit', -> window.close()

Parse.define 'config', ->(expr)->
  Prim.makeMonad (env, cont)->
    switch expr()
      when 'autoTest' then autoRun(env.owner, true)
    cont(_false())

Parse.define 'notebookSelection', ->(func)->
  Prim.makeMonad (env, cont)->
    sel = window.getSelection()
    bx = getBox sel.focusNode
    if bx? and getAst(bx) == func().ast
      offset = (bx.ast.leisureCodeOffset ? 0)
      r = sel.getRangeAt(0)
      window.r = r
      r2 = document.createRange()
      r2.setStart bx, 0
      r2.setEnd r.startContainer, r.startOffset
      p1 = r2.cloneContents().textContent.length - offset
      if !r.collapsed then r2.setEnd r.endContainer, r.endOffset
      p2 = r2.cloneContents().textContent.length - offset
      cont(_some2()(->p1)(->p2))
    else cont(_none())

Parse.define 'notebookAst', ->(func)->
  Prim.makeMonad (env, cont)->
    if func.leisureName?
      node = document.querySelector "[LeisureFunc=#{func.leisureName}]"
      if node?
        ast = getAst node
        return cont(_some()(->ast))
    cont(_none())

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
    svg = createNode "<svg id='HIDDEN_SVG' xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000; position: absolute'><text id='HIDDEN_TEXT'>bubba</text></svg>"
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
  svg = createNode "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000'><g>#{content()}</g></svg>"
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
    Parse.foldLeft ((v, n)-> Math.max v, (getMaxStrokeWidth n, n, svg, transformFunc)), 0, el.childNodes
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

previousSibling = (node)->
  while node?.parentNode && !node.previousSibling
    node = node.parentNode
  node?.previousSibling

nextSibling = (node)->
  while node?.parentNode && !node.nextSibling
    node = node.parentNode
  node?.nextSibling

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
root.showAst = showAst
root.toggleEdit = toggleEdit
root.showSource = showSource
root.bootNotebook = bootNotebook
root.createNode = createNode
root.ENTER = ENTER
root.textNode = textNode
root.cleanEmptyNodes = cleanEmptyNodes
root.isLeisureCode = isLeisureCode
root.getElementCode = getElementCode
root.runTests = runTests
root.previousSibling = previousSibling
root.nextSibling = nextSibling
root.presentLeisureCode = presentLeisureCode
root.mergeLeisureCode = mergeLeisureCode

#root.selection = -> window.getSelection().getRangeAt(0)
#root.test = -> flatten(root.selection().cloneContents().childNodes[0])
