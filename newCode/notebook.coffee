###
# use an element as a Leisure notebook
# Only runs in the context of a browser
###

console.log "LOADING NOTEBOOK"

{
  resolve,
  lazy,
} = root = module.exports = require './base'

rz = resolve
lz = lazy

{
  nameSub,
  getRefName,
  define,
  foldLeft,
  Nil,
  getType,
  getAnnoName,
  getAnnoData,
  getAnnoBody,
  Leisure_anno,
} = root = module.exports = require './ast'
{
  isMonad,
  runMonad,
  makeMonad,
  makeSyncMonad,
  identity,
  defaultEnv,
  basicCall,
} = require './runtime'
{
  gen,
} = require './gen'
{
  BS,
  ENTER,
  DEL,
  svgMeasure,
  svgMeasureText,
  createNode,
  textNode,
} = require './browserSupport'

URI = window.URI
Xus = window.Xus
$ = window.$
_ = require './lodash.min'
window.global = window

#debug = true
debug = false

TAB = 9
ESC = 27
PAGE_UP = 33
PAGE_DOWN = 34
END = 35
HOME = 36
LEFT_ARROW = 37
UP_ARROW = 38
RIGHT_ARROW = 39
DOWN_ARROW = 40
arrows = [37..40]
updatePat = /(^|\n)(#@update )([^\n]+)(?:^|\n)/
peer = null
nextId = 0
filename = null

event = (widget, args...)-> basicCall args, envFor(widget), identity

defaultEnv.readFile = (fileName, cont)->
  uri = new URI(document.location.href, fileName)
  console.log "\n\n@@@@READ FILE: #{uri}\n\n"
  $.get(String(uri))
    .done((data)-> cont(null, data))
    .fail((err)-> cont(err, null))

defaultEnv.writeFile = (fileName, data, cont)->

snapshot = (el, pgm)->

setSnapper = (snapFunc)-> snapshot = snapFunc

delay = (func)-> window.setTimeout func, 1

getParseErr = getHtml = (x)-> x lz (value)-> rz value

escapeHtml = (str)->
  if typeof str == 'string' then str.replace /[<>]/g, (c)->
    switch c
      when '<' then '&lt;'
      when '>' then '&gt;'
  else str

presentValue = (v)->
  if (getType v) == 'svgNode'
    content = v(-> id)
    _svgPresent()(-> content)(-> id)
  else if (getType v) == 'html' then getHtml v
  else if (getType v) == 'parseErr' then "PARSE ERROR: #{getParseErr v}"
  else escapeHtml String(v)

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

closeWindow = ->
  console.log "CLOSING WINDOW"
  window.open '', '_self', ''
  window.close()

createPeer = ->
  root.xusServer = server = new Xus.Server()
  #root.xusServer.verbose = (str)-> console.log str
  server.exit = -> closeWindow()
  peer = root.peer = Xus.createDirectPeer server
  peer.server = server
  peer.listen 'leisure/selection/contents', true, (key, value)->
    if key == 'leisure/selection/contents'
      s = window.getSelection()
      if s.rangeCount && s.toString() != value
        r = s.getRangeAt 0
        r.deleteContents()
        node = textNode value.toString()
        r.insertNode node
        s.removeAllRanges()
        r.selectNode node
        s.addRange(r)
  peer.set 'leisure/evalExpr', null, 'transient'
  peer.listen 'leisure/evalExpr', false, (key, value)->
    if key == 'leisure/evalExpr' && value?
      [expr, result] = value
      console.log "EVAL: #{expr}, RESULT: #{result}"
      env = xusEnv(result, expr)
      processLine expr, env, -> env.cleanup?()
  peer.set 'leisure/document', peerGetDocument
  peer.set 'leisure/functions', peerGetFunctions
  peer.set 'leisure/storage', []
  if Boot.documentFragment
    params = {}
    for param in Boot.documentFragment.substring(1).split '&'
      [k, v] = param.split '='
      params[k.toLowerCase()] = decodeURIComponent v
    if params.xusproxy? then Xus.xusToProxy(server, params.xusproxy)

replaceContents = (uri, contents)->
  #console.log new Error("Replacing contents...").stack
  if !contents
    contents = uri
    uri = null
  if uri then setFilename uri.toString()
  document.body.setAttribute 'doc', ''
  window.leisureAutoRunAll = true
  window.markup contents
  bindAll()

bindAll = ->
  for node in document.querySelectorAll "[leisurenode='code']"
    node.setAttribute 'contentEditable', 'true'
    bindNotebook node
    changeTheme node, 'thin'
    evalDoc node
  showFilenames()

xusEnv = (resultVar, expr)->
  result = ''
  env =
    debug: debug
    finishedEvent: ->
    owner: null
    require: req
    write: (msg)-> result += "#{msg}\n"
    prompt:(msg, cont)-> result += "Attempt to prompt with #{msg}"
    processResult: (res, ast)->
      result += res
      peer.set resultVar, JSON.stringify result
    presentValue: (x)-> x
    fileSettings:
      uri: new URI document.location.href
    err: (err)->
      result += if err.leisureContext then "ERROR: #{err}:\n#{leisureContextString(err)}\n#{err.stack}" else "Couldn't parse: #{expr}"
      peer.set resultVar, result
  env.__proto__ = root.defaultEnv
  env

peerGetDocument = ->
  nodes = document.querySelectorAll "[leisurenode='code']"
  if nodes.length > 1 || Notebook.md then getMDDocument()
  else getSimpleDocument()

peerGetFunctions = -> (_.uniq window.leisureFuncNames.toArray().sort(), true).sort()

getMDDocument = ->
  md = ''
  for node in document.querySelectorAll '[doc] [leisureNode]'
    md += if isLeisureCode node then "```\n#{getElementCode node}\n```\n" else node.md ? ''
  md

makeId = (el)-> if !el.id then el.id = "Leisure-#{nextId++}"

allowEvents = true

init = false

bindNotebook = (el)->
  if !init
    init = true
    # MARK CHECK
    defaultEnv.presentValue = presentValue
    defaultEnv.write = (msg)->console.log msg
    defaultEnv.owner = document.body
    defaultEnv.finishedEvent = (evt, channel)->update(channel ? 'app', defaultEnv)
    defaultEnv.debug = debug
  if !el.bound?
    makeId el
    el.bound = true
    el.addEventListener 'DOMCharacterDataModified', ((evt)->if allowEvents && !el.replacing then delay(->checkMutateFromModification evt)), true
    el.addEventListener 'DOMSubtreeModified', ((evt)->if allowEvents && !el.replacing then delay(->checkMutateFromModification evt)), true
    el.addEventListener 'mousedown', ((e)-> if !isSlider e.srcElement then delay -> highlightPosition e), true
    el.addEventListener 'mousemove', ((e)-> if !isSlider e.srcElement then delay -> highlightPosition e), true
    el.addEventListener 'mouseup', ((e)-> if !isSlider e.srcElement then delay -> highlightPosition e), true
    el.addEventListener 'keydown', (e)->
      #if allowEvents
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
      if (c in arrows) or printable c then delay -> highlightPosition e
      if e.ctrlKey and c == ENTER then handleKey "C-ENTER"
      else if e.altKey and c == ENTER then handleKey "M-ENTER"
      else if c == TAB
        handleKey("TAB")
        e.preventDefault()
    el.addEventListener 'keypress', (e)->
      #if allowEvents
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
    el.addEventListener 'focus', (-> if allowEvents then findCurrentCodeHolder()), true
    el.addEventListener 'blur', (-> if allowEvents then findCurrentCodeHolder()), true
    if window.leisureAutoRunAll
      autoRun el, true
      window.setTimeout (->runTests el), 1
    else el.autorunState = false

checkDeleteExpr = (node)->
  if isOutput node && node.output
    out = node.output
    window.setTimeout (->
      if !node.textContent.trim() then node.parentNode.removeChild node
      if !node.parentNode? && out?.parentNode? then out.parentNode.removeChild out
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
  #peer.set 'leisure/selection/id', (if el then el.id else null)
  #peer.set 'leisure/selection/contents', str

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
oldBrackets = [null, Nil]

cleanEmptyNodes = (el)->
  if el.nodeType == 3 and el.parentNode? then cleanEmptyNodes el.parentNode
  else
    prev = el.previousSibling
    next = el.nextSibling
    if el.nodeType == 1 && el.textContent.trim() == '' && el.parentNode?.hasAttribute 'doc'
      el.parentNode.removeChild el
    if next == nextSibling prev then mergeLeisureCode prev, next

presentLeisureCode = (node, doEval)->
  node.setAttribute 'contentEditable', 'true'
  Notebook.bindNotebook node
  Notebook.changeTheme node, 'thin'
  if doEval then evalDoc node else initNotebook node

mergeLeisureCode = (el1, el2)-> # TODO: this should just take one arg and merge an element with the one after it
  if el1 && el2
    if el1.nodeType == 1 && el2.nodeType == 3
      el1.appendChild el2
      el1.normalize()
    else if el1.nodeType == 3 and el2.nodeType == 1
      el2.insertBefore el1, el2.firstChild
      el2.normalize()
    else if el1.hasAttribute('leisureNode') && el1.getAttribute('leisureNode') == el2.getAttribute('leisureNode')
      newCode = textNode el1.md = if el1.getAttribute('leisureNode') == 'code' then "#{getElementCode(el1)}\n#{getElementCode el2}" else "#{el1.md}\n#{el2.md}"
      r = document.createRange()
      r.selectNodeContents el2
      el1.appendChild textNode '\n'
      el1.appendChild r.extractContents()
      el2.parentNode.removeChild el2

highlightPosition = (e)->
  parent = null
  s = window.getSelection()
  if s.rangeCount
    if cleanEmptyNodes s.getRangeAt(0).startContainer then return
    focusBox s.focusNode
    parent = getBox s.focusNode
    if s.getRangeAt(0)?.collapsed
      if !parent or isOutput parent then return
      if parent.parentNode and ast = getAst parent
        r = s.getRangeAt(0)
        r.setStart parent, 0
        pos = getRangeText(r).length
        changed = false
        if false
          brackets = Leisure.bracket ast.leisureBase, pos
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
            while b != Nil
              ranges.push (makeRange parent, b.head().head(), b.head().tail().head())
              b = b.tail()
            for r, i in ranges
              span = document.createElement 'span'
              span.setAttribute 'LeisureBrackets', ''
              span.setAttribute 'class', if i == 0 then 'LeisureFunc' else 'LeisureArg'
              wrapRange r, span
            changed = true
        if e instanceof KeyboardEvent
          if hideSlider() then pos += 1
        else if e instanceof MouseEvent and e.type == 'mousedown' and (e.target == parent or parent.contains e.target) and showSliderButton parent, pos, e
          changed = true
          pos += 1
        if changed
          window.EVT = e
          s.removeAllRanges()
          s.addRange(makeRange parent, pos)
    # MARK TODO
    #if parent?.ast?.leisureName? then update "sel-#{parent.ast.leisureName}"
    peerNotifySelection parent, s.toString()

numberEnd = /(?:^|.*[^0-9.])([0-9]+\.?[0-9]*|\.[0-9]*)$/
numberStart = /^([0-9]+\.[0-9]+|[0-9]+|\.[0-9]+)/
slider = []

showSliderButton = (parent, pos, e)->
  if slider.length
    hideSlider()
    false
  else
    text = parent.textContent
    oldPos = pos
    changed = 0
    if m = text.substring(0, pos).match(numberEnd) then pos -= m[1].length
    if m = text.substring(pos).match(numberStart)
      len = m[1].length
      if oldPos <= pos + len
        [sParent, sPos, sValue] = slider
        if parent != sParent || pos != sPos || m[1] != sValue
          hideSlider()
          r = makeRange parent, pos, pos + m[1].length
          span = createNode "<span class='leisureRangeNumber ui-widget-content'></span>"
          wrapRange r, span
          changed = 1
          span.normalize()
          slider = [parent, pos, m[1], span]
          createSlider()
      changed
    else hideSlider()

isSlider = (el)->
  while el != document
    if el.hasAttribute 'slider' then return true
    el = el.parentNode
  false

createSlider = ->
  [parent, pos, value, span, div] = slider
  if div then return
  inside = false
  sliding = false
  d = createNode "<div style='z-index: 1; position: absolute; width: 200px; background: white; border: solid green 1px' slider contentEditable='false'></div>"
  slider.push d
  d.style.top = "#{span.offsetTop + span.offsetHeight + 5}px"
  d.style.minTop = '0px'
  d.style.left = "#{Math.max(0, (span.offsetLeft + span.offsetWidth)/2 - 100)}px"
  d.addEventListener 'mouseover', (e)->
    if !inside then inside = true
  d.addEventListener 'mouseout', (e)->
    if e.toElement != d && !d.contains e.toElement
      inside = false
      if !sliding then hideSlider()
  value = Number value
  min = if value < 0 then value * 2 else value / 2
  max = if value == 0 then 10 else value * 2
  sl = $(d).slider
    animate: 'fast'
    start: ->
      sliding = true
      delay -> allowEvents = false
    stop: (event, ui)->
      setMinMax sl
      allowEvents = true
      sliding = false
      if !inside then hideSlider()
    slide: (event, ui)->
      if span.firstChild then span.firstChild.nodeValue = String(ui.value)
      if isDef parent
        parent.ast = null
        acceptCode parent
        ast = getAst parent
        # MARK CHECK
        if parent.ast?.leisureName
          update "sel-#{parent.ast.leisureName}"
      else
        makeId parent
        if !parent.getAttribute parent.output, 'leisureUpdate'
          setUpdate parent.output, "id-#{parent.id} compile", true
        update "id-#{parent.id}"
        update "compile"
    value: value
  setMinMax sl, value
  parent.insertBefore d, parent.firstChild
  d.focus()

psgn = (x)-> if x < 0 then -1 else 1

setMinMax = (sl, value)->
  value = value || sl.slider("value")
  min = 0
  max = if 1 <= Math.abs(value) < 50 or value == 0 then 100 * psgn(value) else value * 2
  if Math.round(value) == value
    step = Math.round((max - min) / 100)
    step = step - step % (max - min)
  else
    step = (max - min) / 100
  sl.slider "option", "min", min
  sl.slider "option", "max", max
  sl.slider "option", "step", step

hideSlider = ->
  if slider.length
    [parent, sPos, sValue, span, div] = slider
    unwrap span
    if div then remove div
    parent.normalize()
    slider = []
    2
  else 0

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
    replicate b

replicate = (b)-> if b.replicator then delay -> b.replicator.replicate b

buttonClasses = 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only'.split ' '

boxClasses =
  codeMainExpr: ['codeMainExpr', 'ui-widget', 'ui-widget-content', 'ui-corner-all']
  codeMain: ['codeMain', 'ui-widget', 'ui-widget-content', 'ui-corner-all']
  codeMainTest: ['codeMainTest']
  #output: ['output', 'ui-widget', 'ui-widget-content', 'ui-corner-all']
  output: ['output', 'ui-corner-all']

addBoxClasses = (box, type)->
  box.setAttribute type, ''
  box.classList.add cl for cl in boxClasses[type]

removeBoxClasses = (box, type)->
  box.removeAttribute type
  box.classList.remove cl for cl in boxClasses[type]

toExprBox = (b)->
  removeBoxClasses b, 'codeMain'
  addBoxClasses b, 'codeMainExpr'
  for node in b.querySelectorAll '[codename]'
    unwrap node
  for node in b.querySelectorAll '.astbutton'
    remove node
  makeOutputBox b

toDefBox = (b)->
  if b.output then remove b.output
  removeBoxClasses b, 'codeMainExpr'
  addBoxClasses b, 'codeMain'
  addDefControls b

addDefControls = (box)->
  btn = createNode "<button onclick='Notebook.showAst(this.parentNode)' class='astbutton' title='Show AST'></button>"
  markupButton btn
  box.appendChild btn

remove = (node)->node.parentNode?.removeChild node

showAst = (box)->
  # MARK CHECK
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

highlightNotebookFunction = (funcName, start, stop)->
  box = document.body.querySelector "[leisurefunc=#{funcName}]"
  # MARK CHECK
  # offset = getAst(box).leisureCodeOffset ? 0
  offset = 0
  sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange makeRange box, start + offset, stop + offset

isDef = (box)->
  txt = box.textContent
  # MARK CHECK
  #if (m = txt.match Leisure.linePat)
  if (m = txt.match L_defPat())
    [matched, leading, name, defType] = m
    return defType?.length > 0
  false

initNotebook = (el)->
  el.replacing = true
  removeOldDefs el
  pgm = markupDefs el, findDefs el
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
  <button leisureId='saveButton' class="leisure_start">Save</button>
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
</div>
"""
  spacer = createNode "<div LeisureOutput  contentEditable='false' class='leisure_space'></div>"
  el.insertBefore spacer, el.firstChild
  el.insertBefore controlDiv, el.firstChild
  [el.leisureDownloadLink, el.leisureViewLink, saveButton, testButton, el.testResults, el.autorun, themeSelect, viewSelect] = getElements el, ['downloadLink', 'viewLink', 'saveButton', 'testButton', 'testResults', 'autorunTests', 'themeSelect', 'viewSelect']
  controlDiv.addEventListener 'click', (evt)->
    if document.body.classList.contains 'hideControls'
      document.body.classList.remove 'hideControls'
    else document.body.classList.add 'hideControls'
  saveButton.addEventListener 'click', (evt)-> saveProgram el
  testButton.addEventListener 'click', -> runTests el
  themeSelect.value = el.leisureTheme ? 'thin'
  themeSelect.addEventListener 'change', (evt)-> changeTheme el, evt.target.value
  viewSelect.addEventListener 'change', (evt)-> changeView el, evt.target.value
  el.autorun.checked = el.autorunState
  el.autorun.addEventListener 'change', (evt)->
    el.autorunState = el.autorun.checked
    if el.autorunState then runTests el
  #configureSaveLink(el)
  markupButtons controlDiv

# MARK TODO
saveProgram = ->
  write filename, getMDDocument(), (-> alert "Saving #{filename}"), (err)->
    console.log err
    alert err.stack
    throw err

showFilename = (el)->
  if el && filename
    el.innerHTML = "Save: #{filename.pathName()}"
    el.title = filename.toString()

showFilenames = ->
  for node in document.body.querySelectorAll '[leisureId=saveButton]'
    showFilename node

setFilename = (newName)->
  console.log "SET FILENAME: #{newName}"
  filename = if newName instanceof URI then newName else new URI(document.location.href, newName)
  showFilenames()

markupButtons = (el)->
  markupButton btn for btn in el.querySelectorAll 'button'

markupButton = (btn)->
  btn.classList.add cl for cl in buttonClasses

getElements = (el, ids)->
  els = {}
  for node in el.querySelectorAll '[leisureId]'
    els[node.getAttribute 'leisureId'] = node
  els[id] for id in ids

escapeHtml = (str)->
  if typeof str == 'string' then str.replace /[<>]/g, (c)->
    switch c
      when '<' then '&lt;'
      when '>' then '&gt;'
  else str

loadProgram = (el, files)->
  el = getBox
  fr = new FileReader()
  fr.onloadend = (evt)->
    el.innerHTML = escapeHtml(fr.result)
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
  if parent
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
  notebookAutoNodes = []
  for i in defs
    {main, name, def, body, tests} = i
    if name
      bx = box main, 'codeMain', true
      bx.appendChild (codeSpan name, 'codeName')
      bx.appendChild (textNode def)
      bod = codeSpan textNode(body), 'codeBody'
      bod.appendChild textNode('\n')
      bod.setAttribute('generatedNL', '')
      bx.appendChild bod
      bx.addEventListener 'blur', (-> evalDoc el), true
      markPartialApplies bx
      addDefControls bx
      pgm += "#{name} #{def} #{body}\n"
    else if main?
      bx = box main, 'codeMainExpr', true
      s = codeSpan textNode(body), 'codeExpr'
      s.setAttribute('generatedNL', '')
      s.appendChild textNode('\n')
      bx.appendChild s
      markPartialApplies bx
      if main.leisureAuto?.mode == 'silent' then auto += "#{body}\n"
      else
        if main.leisureAuto?.mode == 'notebook' then notebookAutoNodes.push bx
        makeOutputBox(bx)
    for test in tests
      replaceRange test, makeTestBox test.leisureTest
      totalTests++
  [pgm, auto, totalTests, notebookAutoNodes]

getDefName = (ast)->
  if ast instanceof Leisure_anno && getAnnoName(ast) == 'definition' then getAnnoData(ast)
  else null

getAst = (bx, def)->
  if bx.ast?
    patchFuncAst bx.ast
    # MARK CHECK
    bx.setAttribute 'leisureFunc', (bx.ast.leisureName ? '')
    bx.ast
  else
    def = def || bx.textContent
    # MARK CHECK
    # setAst bx, (Leisure.compileNext def, Parse.Nil, true, null)[0]
    defName = getDefName runMonad rz(L_newParseLine)(lz Nil)(lz def)
    setAst bx, (if defName then {leisureName: defName, leisureSource: def} else {})
    bx.ast

setAst = (bx, ast)->
  bx.ast = ast
  patchFuncAst ast

patchFuncAst = (ast)->
  if ast?.leisureName?
    parent = window[nameSub(ast.leisureName)]
    if parent?
      parent.ast = ast
      parent.src = ast.leisureSource
      update "ast-#{ast.leisureName}"

# mark partial applies within bx
# the last child of bx should be a fresh expr span with the full code in it
markPartialApplies = (bx, def)->
# MARK TODO
#
#  bx.normalize()
#  def = def ? bx.textContent
#  ast = getAst bx, def
#  partial = []
#  # MARK
#  ((Leisure.findFuncs(ast)) Nil).each (f)->
#    name = getRefName(f.head())
#    arity = global[nameSub(name)]?()?.leisureArity
#    if (arity and f.tail().head() < arity)
#      partial.push [f.head(), arity, f.tail().head()]
#  if partial.length
#    ranges = []
#    # MARK
#    offset = ast.leisureCodeOffset ? 0
#    t = bx.lastChild.firstChild
#    for info in partial
#      p = info[0]
#      r = document.createRange()
#      r.setStart t, p.leisureStart + offset
#      r.setEnd t, p.leisureEnd + offset
#      r.expected = info[1]
#      r.actual = info[2]
#      ranges.push r
#    for r in ranges
#      c = r.extractContents()
#      s = document.createElement 'span'
#      s.setAttribute 'Leisure', ''
#      s.setAttribute 'expected', String(r.expected)
#      s.setAttribute 'actual', String(r.actual)
#      s.classList.add 'partialApply'
#      s.appendChild c
#      r.insertNode s

nodeFor = (text)-> if typeof text == 'string' then textNode(text) else text

evalOutput = (exBox, nofocus, cont)->
  exBox = getBox exBox
  if !nofocus then focusBox exBox
  cleanOutput exBox, true
  selector = findUpdateSelector exBox.source
  if selector then exBox.setAttribute 'leisureUpdate', selector
  makeOutputControls exBox
  [updateSelector, stopUpdates] = getElements exBox.firstChild, ['chooseUpdate', 'stopUpdates']
  updateSelector.addEventListener 'change', (evt)-> setUpdate exBox, evt.target.value, true
  updateSelector.addEventListener 'keydown', (e)->
    c = (e.charCode || e.keyCode || e.which)
    if c == ENTER
      e.preventDefault()
      updateSelector.blur()
  updateSelector.value = (exBox.getAttribute 'leisureUpdate') or ''
  exBox.updateSelector = updateSelector
  evalBox exBox.source, exBox, cont

findUpdateSelector = (box)->
  # MARK CHECK
  #if def = box.textContent.match Leisure.linePat
  if def = box.textContent.match rz(L_defPat)
    [matched, leading, name, defType] = def
    if u = leading.match updatePat then u[3]

getExprSource = (box)->
  s = window.getSelection()
  b = getBox s.focusNode
  if b != box or !s.rangeCount or s.getRangeAt(0).collapsed then box.textContent
  else getRangeText s.getRangeAt(0)

setUpdate = (el, channel, preserveSource)->
  el.setAttribute 'leisureUpdate', channel
  if channel then el.classList.add 'ui-state-highlight'
  else el.classList.remove 'ui-state-highlight'
  ast = getAst el.source
  txt = el.source.textContent
  # MARK CHECK
  #if !preserveSource and def = txt.match Leisure.linePat
  if !preserveSource and def = txt.match rz(L_defPat)
    [matched, leading, name, defType] = def
    index = def.index
    if u = leading.match updatePat
      index += u.index + u[1].length + u[2].length
      r = makeRange el.source, index, index + u[3].length
      r.deleteContents()
    else r = makeRange el.source, index + leading.length, index + leading.length
    r.insertNode textNode(channel)
    el.source.normalize()

hasMonadOutput = (box)-> box.firstElementChild?.nextElementSibling?.nextElementSibling?

#hasMonadOutput = (box)-> $(box).find('.outputDiv').length

checkHideSource = (box)->
  if !box.hideOutputSource and hasMonadOutput box
    box.hideOutputSource = true
    hs = createNode "<button class='editToggle' style='float:right'></button>"
    markupButton hs
    hs.addEventListener 'click', -> toggleEdit(hs)
    box.firstElementChild.appendChild hs

makeOutputControls = (exBox)->
  if exBox.firstChild.firstChild == exBox.firstChild.lastChild
    exBox.firstChild.insertBefore createFragment("""
      <button onclick='Notebook.clearOutputBox(this)'>X</button>
    """), exBox.firstChild.firstChild
    exBox.firstChild.appendChild createFragment """
      <button onclick='Notebook.makeTestCase(this)' leisureId='makeTestCase'>Make test
      case</button><b>Update: </b><input type='text'
      placeholder='Click for updating' list='channelList' leisureId='chooseUpdate'></input><button
      onclick='Notebook.clearUpdates(this)' leisureId='stopUpdates'>Stop Updates</button>
    """
    markupButtons exBox
    exBox.classList.add 'fatControls'

showOutputSource = (output)->
  output.classList.remove 'hidingSource'
  output.source.style.display = ''

hideOutputSource = (output)->
  console.log "HIDE: #{output}"
  output.classList.add 'hidingSource'
  output.source.style.display = 'none'

toggleEdit = (toggleButton)->
  output = getBox toggleButton
  if output.classList.contains 'hidingSource' then showOutputSource output
  else hideOutputSource output

clearUpdates = (widget, preserveSource)->
  exBox = getBox widget
  exBox.updateSelector.value = ''
  setUpdate exBox, '', preserveSource

update = (type, env)->
  # MARK DONE
  env = env ? defaultEnv
  for node in env.owner.querySelectorAll "[leisureUpdate~='#{type}']"
    evalOutput node, true

clearOutputBox = (exBox)->
  clearUpdates exBox, true
  cleanOutput(exBox)

cleanOutput = (exBox, preserveControls)->
  exBox = getBox exBox
  exBox.classList.remove 'fatControls'
  if !preserveControls
    exBox.hideOutputSource = null
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
    expected: escapeHtml(Parse.print(output.result))
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
  passed = true
  processLine prepExpr(test.expr), (
    values: {}
    require: req
    write: (str)-> console.log str
    debug: debug
    prompt: (msg, cont)-> cont(null)
    # MARK CHECK
    # processResult: (result, ast)-> passed = showResult bx, escapeHtml(Parse.print(result)), escapeHtml(test.expected)
    processResult: (result, ast)-> passed = showResult bx, escapeHtml(String(result)), escapeHtml(test.expected)
    err: -> passed = false
    presentValue: (x)-> x
  ), identity
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

# MARK CHECK -- used to precede exprs with =
# prepExpr = (txt)-> if txt[0] in '=!' then txt else "=#{txt}"
prepExpr = (txt)-> txt

envFor = (box)->
  exBox = getBox box
  widget = null
  # MARK CHECK
  # env = Prim.initFileSettings
  env =
    fileSettings: {}
    debug: debug
    finishedEvent: (evt, channel)->update(channel ? 'app', this)
    owner: owner(box)
    box: box
    require: req
    write: (msg)->
      div = document.createElement 'div'
      div.classList.add 'outputDiv'
      div.innerHTML = "#{msg}\n"
      exBox.appendChild(div)
      checkHideSource exBox
      markupButtons exBox
    getWidget: ->
      if !widget
        widget = document.createElement "DIV"
        exBox.appendChild widget
      widget
    destroyWidget: -> if widget then remove widget
    prompt:(msg, cont)-> cont(window.prompt(msg))
    processResult: (result, ast)->
      box.result = result
      setAst box, ast
    presentValue: presentValue
    err: (err)->
      btn = box.querySelector '[leisureId="makeTestCase"]'
      if btn then remove btn
      @write  "<div class='errorDiv'>" + escapeHtml("ERROR: #{if err.leisureContext then "#{err}:\n#{leisureContextString(err)}\n" else ''}#{err.stack ? err}") + "</div>"
    cleanup: ->
      @destroyWidget()
      if root.lastEnv == env then root.lastEnv = null
  # MARK DONE
  env.__proto__ = defaultEnv
  env.fileSettings.uri = new URI document.location.href
  root.lastEnv = env
  env

leisureContextString = (err)-> (linkSource func, offset for [func, offset] in err.leisureContext.toArray()).join('\n')

# MARK TODO
linkSource = (funcName, offset)->
#  [src, start, end] = Leisure.funcContextSource funcName, offset
#  "  <a href='javascript:void(Notebook.showSource(\"#{funcName}\", #{offset}))'>#{funcName}:#{start},#{end}</a>"

# MARK TODO
showSource = (funcName, offset)->
#  [src, start, end] = Leisure.funcContextSource funcName, offset
#  alert("#{funcName} = #{src.substring(0, start)} << #{src.substring(start, end)} >> #{src.substring(end)}")

makeOutputBox = (source)->
  node = document.createElement 'div'
  node.setAttribute 'LeisureOutput', ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'LeisureBox', ''
  node.classList.add cl for cl in boxClasses.output
  node.setAttribute 'contentEditable', 'false'
  node.source = source
  source.output = node
  node.innerHTML = "<div class='controls'><button onclick='Notebook.evalOutput(this)'>-&gt;</button></div>"
  markupButtons node
  source.parentNode.insertBefore node, source.nextSibling
  node

codeSpan = (text, boxType)->
  node = document.createElement 'span'
  node.setAttribute boxType, ''
  node.setAttribute 'Leisure', ''
  node.setAttribute 'class', boxType
  if text then node.appendChild nodeFor(text)
  node

codeBox = (boxType)->
  node = document.createElement 'div'
  addBoxClasses node, boxType
  node.setAttribute 'LeisureBox', ''
  node.setAttribute 'Leisure', ''
  node.addEventListener 'compositionstart', (e)-> checkMutateFromModification e
  node

box = (range, boxType, empty)->
  node = codeBox boxType
  if empty then range.deleteContents()
  else node.appendChild(range.extractContents())
  range.insertNode(node)
  node

linePat = new RegExp "(#{rz(L_linePat).source})"

#findDefs = (el)->
#  console.log "\n\n@@@@@ FINDING DEFS"
#  txt = el.textContent
#  exprs = txt.split linePat
#  offset = 0
#  ranges = []
#  for i in [0..exprs.length] by 2
#    start = offset
#    offset += exprs[i].length
#    console.log "\n\n@@@@@ RANGE: #{start}, #{offset}"
#    range = makeRange el, start, offset
#    ranges.push range
#    #span = createNode "<span class='ui-widget-content'></span>"
#    #wrapRange range, span
#    if i + 1 < exprs.length then offset += exprs[i + 1].length
#  ranges

findDefs = (el)->
  txt = el.textContent
  #console.log "LINE EXP: #{linePat.source}"
  #console.log "LINES: [#{txt.split(linePat).join ']\n['}]"
  rest = txt
  ranges = []
  # MARK TODO Leisure.linePat
  #while (def = rest.match Leisure.linePat) and def[1].length != rest.length
  #console.log "FIND DEFS IN #{txt}"
  while (def = rest.match rz(L_unanchoredDefPat)) and def[1].length != rest.length
    #console.log "def: #{def}"
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
    else name = (nameRaw.trim() || null)
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
    if name
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
        if t? and (lm = t.match /^[ \n]+/) then textStart += lm[0].length
        #console.log "CHECKING AUTO..."
        if m = t.match /(?:^|\n)#@auto( +[^\n]*)?(\n|$)/
          outerRange = makeRange el, textStart, exEnd
          outerRange.leisureAuto = JSON.parse "{#{m[1] ? ''}}"
          if outerRange.leisureAuto.mode == 'notebook'
            outerRange.leisureNode = el
            outerRange.leisureStart = textStart
          #console.log "Auto expr: #{txt.substring(textStart, exEnd)}, attrs: #{m[1]}"
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

addsLine = (node)-> node?.nodeType == 1 and (node.nodeName == 'BR' or (getComputedStyle(node, null).display == 'block' and node.childNodes.length > 0))

req = (file, cont)->
  if !(file.match /\.js$/) then file = "#{file}.js"
  name = file.substring(0, file.length - 3)
  s = document.createElement 'script'
  s.setAttribute 'src', file
  s.addEventListener 'load', ->
    # MARK TODO
    Leisure.processDefs global[name], global
    if cont then cont(rz L_false)
  document.head.appendChild s

postLoadQueue = []

loaded = false

queueAfterLoad = (func)-> if loaded then func() else postLoadQueue.push(func)

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

owner = (box)->
  while box and (box.nodeType != 1 or !isLeisureCode box)
    box = box.parentNode
  box

hiddenPat = /(^|\n)#@hidden *(\n|$)/

evalBox = (box, envBox, cont)->
  env = if envBox? then envFor(envBox) else null
  processLine box.textContent, env, (result)->
    env?.cleanup?()
    (cont ? (x)->x) result
  getAst box
  if box.output && hasMonadOutput(box.output) && box.textContent.match hiddenPat then hideOutputSource box.output
  else if box.textContent.match hiddenPat then console.log "NO MONAD, BUT MATCHES HIDDEN"

acceptCode = (box)->
  if (box.getAttribute 'codemain')?
    evalBox box
    update 'compile'
    if owner(box).autorunState then runTests owner(box)

errString = (err)-> err.stack

evaluating = false

evaluationQueue = []

evalNodes = (nodes)->
  if evaluating then evaluationQueue.push nodes
  else chainEvalNodes nodes

chainEvalNodes = (nodes)->
  evaluating = true
  runAuto nodes, 0, ->
    if evaluationQueue.length then chainEvalNodes evaluationQueue.shift()
    else evaluating = false

evalDoc = (el)->
  [pgm, auto, x, autoNodes] = initNotebook(el)
  try
    if auto || autoNodes
      #console.log "\n\n@@@@ AUTO: #{auto}, AUTONODES: #{_(autoNodes ? []).map (el)->'\n' + el.innerHTML}\n\n"
      auto = "do\n  #{(auto ? '#').trim().replace /\n/g, '\n  '}\n  delay\n  finishLoading"
      global.noredefs = false
      Notebook.queueAfterLoad ->
        evalDocCode el, pgm
        if el.autorunState then runTests el
        evalNodes autoNodes
        #runAuto autoNodes, 0
        #for node in autoNodes
        #  console.log "evalOutput", node, node.output
        #  evalOutput node.output
      e = envFor(el)
      e.write = ->
      e.err = (err)->alert('bubba ' + errString err)
      processLine auto, e, identity
    else evalDocCode el, pgm
  catch err
    showError err, "Error compiling #{pgm}"

runAuto = (nodes, index, cont)->
  if index < nodes.length
    console.log "RUNNING AUTO: #{index}"
    node = nodes[index]
    console.log "evalOutput", node, node.output
    evalOutput node.output, false, -> runAuto nodes, index + 1, cont
  else (cont ? ->)()

processLine = (text, env, cont)->
  if text
    try
      runMonad rz(L_newParseLine)(lz Nil)(lz text), env, (ast)->
        try
          if getType(ast) == 'parseErr'
            env.write env.presentValue ast
            env.processResult? ast
            cont ast
          else
            result = eval "(#{gen ast})"
            env.write env.presentValue result
            if isMonad result
              #console.log "INTERMEDIATE RESULT"
              runMonad result, env, (result)->
                #console.log "RESULT: #{result}"
                env.processResult result
                cont result
            else
              #console.log "DIRECT RESULT: #{result}"
              #env.write env.presentValue result
              env.processResult? result
              cont result
        catch err
          console.log "ERROR: #{err.stack}"
          env.write env.presentValue err.stack
          env.processResult? err.stack
          cont err.stack
    catch err
      console.log "ERROR: #{err.stack}"
      env.write env.presentValue err.stack
      env.processResult? err.stack
      cont err.stack
  else cont ''

showError = (e, msg)->
  console.log msg
  console.log e
  console.log e.stack
  alert(e.stack)

evalDocCode = (el, pgm)->
  runMonad rz(L_runFile)(lz pgm), defaultEnv, (result)->
    for node in el.querySelectorAll '[codeMain]'
      getAst node

define 'getDocument', lz makeSyncMonad (env, cont)-> cont peerGetDocument()

# MARK TODO
define 'getLink', ->
  # makeSyncMonad (env, cont)-> cont Prim.linkFor filename
  0

define 'replaceDocument', lz (str)->
  makeSyncMonad (env, cont)->
    replaceContents rz str
    cont rz L_true

define 'gdriveOpen', lz makeMonad (env, cont)->
  GdriveStorage.runOpen (json)->
    if json?.action == 'picked' and json.docs?.length > 0
      GdriveStorage.loadFile json.docs[0].id, -> cont rz(_some)(lz json.docs[0].title)
    else cont rz _none

define 'getFilename', lz makeSyncMonad (env, cont)-> cont filename?.pathName() ? ''

define 'setURI', lz (uri)->
  makeSyncMonad (env, cont)->
    setFilename rz uri
    cont rz L_true

define 'getURI', lz makeSyncMonad (env, cont)-> cont filename?.toString() ? ''

define 'finishLoading', lz makeMonad (env, cont)->
  loaded = true
  for i in postLoadQueue
    rz i
  postLoadQueue = []
  cont rz L_false

define 'markupButtons', lz makeSyncMonad (env, cont)->
  if env.box then markupButtons env.box
  cont rz L_false

define 'alert', lz (str)->
  makeSyncMonad (env, cont)->
    window.alert(rz str)
    cont rz L_false

define 'bindEvent', lz (selector)->(eventName)->(func)->
  makeSyncMonad (env, cont)->
    node = env.box.querySelector rz selector
    if !node then node = document.body.querySelector rz selector
    console.log "ADDING EVENT: #{rz selector} #{rz eventName} NODE: #{node}"
    if node then node.addEventListener eventName(), (e)->
      console.log "EVENT: #{rz selector} #{rz eventName} #{rz func}"
      runMonad rz(func)(lz e), envFor(e.target), ->
    cont rz L_false

define 'quit', lz -> window.close()

define 'config', lz (expr)->
  makeSyncMonad (env, cont)->
    switch rz expr
      when 'autoTest' then autoRun(env.owner, true)
    cont(rz L_false)

define 'notebookSelection', lz (func)->
  makeSyncMonad (env, cont)->
    sel = window.getSelection()
    bx = getBox sel.focusNode
    if bx? and hasFunc bx, func
      # MARK CHECK
      # offset = (bx.ast.leisureCodeOffset ? 0)
      offset = 0
      r = sel.getRangeAt(0)
      window.r = r
      r2 = document.createRange()
      r2.setStart bx, 0
      r2.setEnd r.startContainer, r.startOffset
      p1 = r2.cloneContents().textContent.length - offset
      if !r.collapsed then r2.setEnd r.endContainer, r.endOffset
      p2 = r2.cloneContents().textContent.length - offset
      cont(rz(_some2)(lz p1)(lz p2))
    else cont(rz _none)

hasFunc = (bx, func)->
  ast = getAst(bx)
  ast == func().ast || ast == func.ast

define 'notebookAst', lz (func)->
  makeSyncMonad (env, cont)->
    # MARK CHECK
    if func.leisureName?
      # MARK CHECK
      node = document.querySelector "[LeisureFunc=#{func.leisureName}]"
      if node?
        ast = getAst node
        return cont(rz(_some)(lz ast))
    cont(rz _none)

autoRun = (el, state)->
  el.autorunState = state
  el.autorun?.checked = state

head = (l)->l lz (hh)->(tt)->rz hh
tail = (l)->l lz (hh)->(tt)->rz tt
id = (v)->rz v

primconcatNodes = (nodes)->
  if nodes == rz(_nil) then ""
  else (head nodes)(id) + concatNodes tail nodes

#getSvgElement = (id)->
#  if (el = document.getElementById id) then el
#  else
#    svg = createNode "<svg id='HIDDEN_SVG' xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000px; position: absolute'><text id='HIDDEN_TEXT'>bubba</text></svg>"
#    document.body.appendChild(svg)
#    document.getElementById id
#
#svgMeasureText = (text)->(style)->(f)->
#  txt = getSvgElement('HIDDEN_TEXT')
#  if rz style then txt.setAttribute 'style', rz style
#  txt.lastChild.textContent = rz text
#  bx = txt.getBBox()
#  rz(f)(lz bx.width)(lz bx.height)
#
#
#transformedPoint = (pt, x, y, ctm, ictm)->
#  pt.x = x
#  pt.y = y
#  pt.matrixTransform(ctm).matrixTransform(ictm)
#
## try to take strokeWidth into account
#svgMeasure = (content)-> primSvgMeasure content, baseStrokeWidth
#
## try to take strokeWidth into account
#svgBetterMeasure = (content)-> primSvgMeasure content, transformStrokeWidth
#
## try to take strokeWidth into account
#primSvgMeasure = (content, transformFunc)->(f)->
#  svg = createNode "<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000'><g>#{content()}</g></svg>"
#  document.body.appendChild(svg)
#  g = svg.firstChild
#  bbox = g.getBBox()
#  pad = getMaxStrokeWidth g, g, svg, transformFunc
#  document.body.removeChild(svg)
#  rz(f)(lz bbox.x - Math.ceil(pad/2))(lz bbox.y - Math.ceil(pad/2))(lz bbox.width + pad)(lz bbox.height + pad)
#
#baseElements = ['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon']
#
#getMaxStrokeWidth = (el, base, svg, transformFunc)->
#  if base.nodeName in baseElements
#    #hack to parse strokeWidth string by setting the width of the svg to it
#    svg.setAttribute 'width', (getComputedStyle(base).strokeWidth ? '0'), svg
#    transformFunc el, svg.width.baseVal.value
#  else if base.nodeName == 'use' then getMaxStrokeWidth base, base.instanceRoot.correspondingElement, svg, transformFunc
#  else if base.nodeName == 'g'
#    foldLeft ((v, n)-> Math.max v, (getMaxStrokeWidth n, n, svg, transformFunc)), 0, el.childNodes
#  else 0
#
#baseStrokeWidth = (el, w)-> w
#
#transformStrokeWidth = (el, w)->
#  if w == 0 then 0
#  else
#    ctm = el.getScreenCTM()
#    tp1 = transformedPoint pt, bx.x - Math.ceil(w), bx.y - Math.ceil(w), ctm, isctm
#    tp2 = transformedPoint pt, bx.x + bx.width + Math.ceil(w), bx.y + bx.height + Math.ceil(w), ctm, isctm
#    x = tp2.x - tp1.x
#    y = tp2.y - tp1.y
#    Math.sqrt(x * x + y * y)

previousSibling = (node)->
  while node?.parentNode && !node.previousSibling
    node = node.parentNode
  node?.previousSibling

nextSibling = (node)->
  while node?.parentNode && !node.nextSibling
    node = node.parentNode
  node?.nextSibling

#
# System pages
#

hideControlSection = ->
  controlSection = document.body.querySelector '[leisureSection="Leisure Controls"]'
  if !controlSection
    controlSection = document.createElement 'DIV'
    document.body.insertBefore controlSection, document.body.firstChild
    root.markupElement controlSection, """
# Leisure Controls

## File Save and Load
```
saveFile

saveAs 'filename'

saveAs pickFile

loadFile

emptyFile
```
"""
    unwrap controlSection
  controlSection.classList.add leisure_controls
  controlSection.classList.add hidden

#
# Notebook prims
#

define 'printValue', lz (value)->
  makeMonad (env, cont)->
    if rz(value) != rz(L_nil) then env.write("#{env.presentValue rz value}\n")
    cont L_false()

#
# Exports
#

# MARK CHECK
defaultEnv.require = req

root.initNotebook = initNotebook
root.bindNotebook = bindNotebook
root.bindAll = bindAll
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
root.ENTER = ENTER
root.cleanEmptyNodes = cleanEmptyNodes
root.isLeisureCode = isLeisureCode
root.getElementCode = getElementCode
root.runTests = runTests
root.previousSibling = previousSibling
root.nextSibling = nextSibling
root.presentLeisureCode = presentLeisureCode
root.mergeLeisureCode = mergeLeisureCode
root.highlightNotebookFunction = highlightNotebookFunction
root.ESC = ESC
root.HOME = HOME
root.END = END
root.PAGE_UP = PAGE_UP
root.PAGE_DOWN = PAGE_DOWN
root.LEFT_ARROW = LEFT_ARROW
root.UP_ARROW = UP_ARROW
root.RIGHT_ARROW = RIGHT_ARROW
root.DOWN_ARROW = DOWN_ARROW
root.arrows = arrows
root.closeWindow = closeWindow
root.markupButton = markupButton
root.markupButtons = markupButtons
root.getAst = getAst
root.insertControls = insertControls
root.delay = delay
root.setFilename = setFilename
root.unwrap = unwrap
root.remove = remove
root.wrapRange = wrapRange
root.replaceContents = replaceContents
root.event = event
