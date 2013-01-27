# if window? and (!global? or global == window)
#   window.global = window
#   Leisure = window.Leisure
#   ReplCore = window.ReplCore
#   window.Notebook = root = {}
#   Prim = window.Prim
#   Repl = window.Repl
#   Xus = window.Xus
# else root = exports ? this

{jQuery, $, _} = window

{ENTER,
  delay,
  textNode,
  createNode,
  remove,
  unwrap,
  insertControls,
  cleanEmptyNodes,
  isLeisureCode,
  getElementCode,
  previousSibling,
  nextSibling,
  presentLeisureCode,
  mergeLeisureCode,
  closeWindow,
  markupButtons,
  ESC,
  HOME,
  END,
  PAGE_UP,
  PAGE_DOWN,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
  DOWN_ARROW,
  arrows} = Notebook

Q = 81

window.markup = (md)->
  nodes = document.querySelectorAll('[maindoc]')
  if nodes.length == 0
    maindoc = createNode "<div maindoc></div>"
    document.body.insertBefore maindoc, document.body.firstChild
    nodes = [maindoc]
  else maindoc = nodes[0]
  md = (md?.replace(/\r\n/mg, '\n') ? maindoc.innerHTML.replace(/^\s*<!--*/, '').replace(/-->\s*\n*/m, '')).trim();
  document.body.classList.add 'hideControls'
  markupSlides maindoc, md
  insertControls maindoc

lastSlide = null

console?.error? new Error("Incompatibility: using -webkit-calc").stack

slidePat = /^(\*\*\*[^\n]*\n(?:--?\n)?)/m
slideName = /^\*\*\*([^\n]*)\n(?:--?\n)?/m
sliding = false

markupSlides = (el, md)->
  hasCode = markupSlideContent el, md
  slides = el.querySelectorAll('[leisureSection]')
  if slides.length <= (if el.querySelector '[leisureSection="Leisure Controls"]' then 2 else 1) then document.body.classList.add "oneSlide"
  div = createNode """
<div class='slide-controls'>
  <div id='slide-killbutton' onclick='toggleSlideShow()' style='float: right'><button>Slides</button></div>
  <div id='slide-num' style='float: right; margin-right: 10px'></div>
</div>
"""
  markupButtons div
  el.appendChild div
  if location.search && _.find location.search[1..].split('&'), ((p)-> p.match /^slides=/)
    sliding = true
    showSlide $(chooseSlide())
  else document.body.classList.add 'scroll'
  hasCode

markupSlideContent = (el, md, noMain)->
  pages = md.split slidePat
  hasCode = false
  if pages.length > 1
    console.log "PAGES:", JSON.stringify pages
    document.body.classList.add 'slide-container'
    el.innerHTML = ''
    bindSlider()
    el.removeAttribute 'doc'
    if pages.length == 3 && !pages[0] && !pages[2] then pages[2] = '\n'
    for i in [0...pages.length] by 2
      p = pages[i]
      if p
        pageType = if i > 0
          m = pages[i - 1].match(slidePat)?[1]
          if m.match /\n-\n/ then ['continuation', 'hiddenPage']
          else if m.match /\n--\n/ then ['hiddenPage']
          else []
        else []
        content = makeSlideDiv el, pageType, (if i > 0 then pages[i - 1].match(slideName)[1].trim() else 'Main')
        if i > 0 then hasCode = (markupElement content, pages[i - 1] + p) || hasCode
        else
          hasCode = (markupElement content, '***\n' + p) || hasCode
          #if noMain then unwrapContent content
        padSlide content, (if i > 0 then pages[i - 1] else '***\n')
  else
    content = makeSlideDiv el, ['page'], 'Main'
    while el.firstChild != content.parentNode
      content.appendChild el.firstChild
    hasCode = markupElement content, md
    padSlide content, '***\n'
    if noMain then unwrapContent content
  hasCode

padSlide = (content, header)->
  if !content.firstChild || isLeisureCode content.firstChild
    range = document.createRange()
    range.setStart content, 0
    range.setEnd content, 0
    div = makeMarkupDiv range, header
    div.appendChild createNode '<br>'
  if isLeisureCode content.lastChild
    range = document.createRange()
    range.setStartAfter content.lastChild
    range.setEndAfter content.lastChild
    div = makeMarkupDiv range, '\n'
    div.appendChild createNode '<br>'

unwrapContent = (content)->
  section = content.parentNode
  el = section.parentNode
  el.insertBefore content, section
  remove section
  unwrap content

makeSlideDiv = (el, pageTypes, title)->
  lastSlide = div = createNode "<div class='leisure_page'></div>"
  div.setAttribute 'leisureSection', title
  div.setAttribute 'doc', ''
  div.setAttribute 'slide', ''
  div.classList.add 'slide'
  div.classList.add 'ui-corner-all'
  div.classList.add 'ui-widget'
  div.classList.add 'ui-widget-content'
  div.classList.add pageType for pageType in pageTypes
  el.appendChild div
  sectionTitle = createNode("<div class='pageTitle'>#{title}</div>")
  sectionTitle.setAttribute 'leisureoutput', ''
  div.appendChild sectionTitle
  content = createNode "<div class='pageContent'></div>"
  div.appendChild content
  content

chooseSlide = ->
  param = _.find location.search[1..].split('&'), ((p)-> p.match /^slide=.*/)
  console.log param
  if param then document.querySelector "[slide='#{param.split('=')[1]}']"
  else document.querySelector('[maindoc]').firstElementChild

oldSlide = 0

window.toggleSlideShow = ->
  sliding = $(document.body).is('.scroll')
  if sliding
    $(document.body).removeClass 'scroll'
    #showSlide $(document.body.firstElementChild)
    showSlide nthSlide oldSlide
  else
    oldSlide = $('.slide.showing').attr('slide')
    hideSlide $('.slide.showing')
    $(document.body).addClass 'scroll'
    $('#slide-num').html('')

bindSlider = ->
  document.body.addEventListener 'keydown', slideKeyListener

slideControls = [Q, ESC, LEFT_ARROW, RIGHT_ARROW, HOME, END, PAGE_UP, PAGE_DOWN]

slideKeyListener = (e)->
  if sliding
    window.evt = e
    c = (e.charCode || e.keyCode || e.which)
    if (c in slideControls) && !$(e.target).is('[leisurenode=code],[leisurenode=code] *')
      e.preventDefault()
      if c == ESC then toggleSlideShow()
      else if c == Q then closeWindow()
      else
        cur = $('.slide.showing')
        next = switch c
          when HOME then slides()
          when END
            s = slides().last()
          when LEFT_ARROW, PAGE_UP
            n = cur.prev('[slide]').not('[leisureSection="Leisure Controls"]')
            if n.length then n else slides()
          when RIGHT_ARROW, PAGE_DOWN
            n = cur.next('[slide]').not('[leisureSection="Leisure Controls"]')
            if n.length then n else slides().last()
        hideSlide cur
        showSlide next

slides = -> $('[slide]').not('[leisureSection="Leisure Controls"]').not('.hiddenPage')

nthSlide = (n)-> slides()[n...]

countSlide = (el)->
  n = -1
  count = 0
  for slide in slides()
    count++
    if slide == el then n = count
  [n, count]

showSlide = (el)->
  [n, count] = countSlide el[0]
  oldSlide = n
  $('#slide-num').html "#{n} / #{count}"
  $(el).first().removeClass('hidden').addClass('showing')

hideSlide = (el)-> $(el).first().addClass('hidden').removeClass('showing')

markupElement = (el, md)->
  len = md.length
  slide = (md.match slidePat) ? ''
  #console.log "LEN: #{slide[0].length}, SLIDE: '#{md[0...20]}', SLICED '#{md[slide[0].length...20]}'"
  [markup, lex] = window.marked (if slide then md[slide[0].length..] else md), saveLex: true, gfm: true
  el.innerHTML = markup.trim() || '<br>'
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
    code.setAttribute 'leisureNode', 'code'
    code.md = lex[codePos].text
    if code.parentNode.firstChild != code
      if prev == null || prev.parentNode != code.parentNode then range.setStart code.parentNode, 0 else range.setStartAfter prev
      range.setEndBefore code
      makeMarkupDiv range, md.substring((if prevCodePos == -1 then 0 else len - lex[prevCodePos].remain), len - lex[codePos].remain - lex[codePos].textLen)
    prevCodePos = codePos
    codePos++
    prev = code
  if prevCodePos > -1
    if lex[prevCodePos].remain > 0
      #range.selectNodeContents el
      range.selectNodeContents prev.parentNode
      range.setStartAfter prev
      makeMarkupDiv range, md.substring len - lex[prevCodePos].remain
  else
    #el.md = md
    range.selectNodeContents el
    makeMarkupDiv range, md
    #if !el.bound then bindMarkupDiv el
  prevCodePos > -1

handleInternalSections = (content)->
  section = content.parentNode
  sectionHolder = section.parentNode
  innerSections = section.querySelectorAll '[leisureSection]'
  if innerSections.length == 0
    if !(content.firstChild.md?.match /^\*\*\*/)
      if !section.previousSibling then section.setAttribute('leisureSection', 'Main')
      else
        prev = section.previousSibling.querySelector '.pageContent'
        while content.firstChild
          mergeUp content.firstChild, prev
        remove section
  else
    title = section.getAttribute 'leisureSection'
    firstSlide = !section.previousSibling || section.previousSibling.getAttribute('leisureSection') == 'Leisure Controls'
    before = false
    for node in innerSections
      if node.getAttribute('leisureSection') == title
        before = true
        break
    before = before || (!innerSections[0].previousSibling)
    marker = section
    for node in innerSections
      nodeTitle = node.getAttribute 'leisureSection'
      nodeContent = node.querySelector '.pageContent'
      if nodeTitle == title or (node.previousSibling && nodeTitle == 'Main')
        if nodeTitle == title then before = false
        while nodeContent.firstChild
          content.insertBefore nodeContent.firstChild, node
          mergeLeisureCode node.previousSibling, node
        remove node
      else
        while node.nextSibling && !node.nextSibling.getAttribute('leisureSection')
          mergeUp node.nextSibling, nodeContent
        padSlide nodeContent, "***#{nodeTitle}\n"
        if before then section.parentNode.insertBefore node, section
        else
          section.parentNode.insertBefore node, marker.nextSibling
          marker = node
    if !content.firstChild then remove section
    else padSlide content, "***#{title}\n"

mergeUp = (el, newParent)->
  newParent.appendChild el
  mergeLeisureCode newParent.lastChild.previousSibling, newParent.lastChild

# make a section with the given title
# put node-next into it (not including next -- null means include everthing after node)
makeSection = (title, node, next)->
  div = createNode "<div leisureSection='#{title}'></div>"
  node.parentNode.insertBefore div, node
  while div.nextSibling && div.nextSibling != next
    div.appendChild div.nextSibling
  div

makeMarkupDiv = (range, md)->
  div = document.createElement 'div'
  range.surroundContents div
  div.md = md
  bindMarkupDiv div
  div

bindMarkupDiv = (div)->
  div.bound = true
  div.setAttribute 'leisureNode', 'markdown'
  div.setAttribute 'contenteditable', 'false'
  editing = false
  div.addEventListener 'dblclick', (e)->
    if !editing
      div.innerHTML = ''
      div.appendChild textNode div.md
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
      scroll = document.body.scrollTop
      div.style.whiteSpace = ''
      editing = false
      div.setAttribute 'contenteditable', 'false'
      #if markupElement div, div.textContent
      prevSection = div.parentNode.parentNode.previousSibling?.getAttribute 'leisureSection'
      parent = div.parentNode
      if markupSlideContent div, div.textContent, (prevSection && prevSection != 'Leisure Controls')
        for node in div.querySelectorAll "[leisurenode='code']"
          presentLeisureCode node, true
      else if div.textContent.trim() == '' then cleanEmptyNodes div
      r = document.createRange()
      r.selectNodeContents div
      frag = r.extractContents()
      first = frag.childNodes[0]
      last = frag.childNodes[frag.childNodes.length - 1]
      parent.replaceChild frag, div
      mergeLeisureCode previousSibling(first), first
      mergeLeisureCode last, nextSibling last
      handleInternalSections parent
      delay -> document.body.scrollTop = scroll

Notebook.markupElement = markupElement
