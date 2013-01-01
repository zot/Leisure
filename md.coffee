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
  textNode,
  createNode,
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

window.markup = ->
  nodes = document.querySelectorAll('[doc]')
  oneDoc = nodes.length == 1 && nodes[0] == document.body
  document.body.classList.add 'hideControls'
  for el in nodes
    #console.log "source: ", el.innerHTML
    md = Notebook.md = el.innerHTML.replace(/^\s*<!--*/, '').replace(/-->\s*\n*/m, '').trim();
    #console.log "replaced: ", md
    #if oneDoc
    #  markupSlides el, md
    #else
    #  markupElement el, md
    markupSlides el, md
    Notebook.insertControls el

lastSlide = null
slideCount = 0

console?.error? new Error("Incompatibility: using -webkit-calc").stack

markupSlides = (el, md)->
  pages = md.split /^\*\*\*([^\n]*)\n/m
  if pages.length > 1
    console.log "PAGES:", JSON.stringify pages
    document.body.classList.add 'slide-container'
    document.body.innerHTML = ''
    bindSlider()
    el.removeAttribute 'doc'
    for i in [0...pages.length] by 2
      p = pages[i]
      if p
        continuation = p.match /-\n/m
        lastSlide = div = Notebook.createNode "<div class='leisure_page'></fieldset>"
        el.appendChild div
        div.classList.add 'slide'
        div.classList.add 'ui-corner-all'
        div.classList.add 'ui-widget'
        div.classList.add 'ui-widget-content'
        div.setAttribute 'doc', ''
        if continuation then div.classList.add 'continuation'
        div.setAttribute 'slide', ++slideCount
        hideSlide $(div)
        content = Notebook.createNode "<div class='pageContent'></div>"
        div.innerHTML = ''
        div.appendChild content
        if i > 0
          title = pages[i - 1].trim()
          div.setAttribute 'leisureSection', title
          markupElement content, p
          div.insertBefore Notebook.createNode("<span class='pageTitle'>#{title}</span>"), div.firstChild
        else markupElement content, p
    slides = el.querySelectorAll('[leisureSection]')
    if slides.length <= (if el.querySelector '[leisureSection="Leisure Controls"]' then 2 else 1) then document.body.classList.add "oneSlide"
    div = createNode """
<div class='slide-controls'>
  <div id='slide-killbutton' onclick='toggleSlideShow()' style='float: right'><button>Slides</button></div>
  <div id='slide-num' style='float: right; margin-right: 10px'></div>
</div>
"""
    markupButtons div
    document.body.appendChild div
    if location.search && _.find location.search[1..].split('&'), ((p)-> p.match /^slides=/)
      showSlide $(chooseSlide())
    else
      document.body.classList.add 'scroll'
  else
    markupElement el, md

chooseSlide = ->
  param = _.find location.search[1..].split('&'), ((p)-> p.match /^slide=.*/)
  console.log param
  if param then document.querySelector "[slide='#{param.split('=')[1]}']"
  else document.body.firstElementChild

sliding = true

oldSlide = 1

window.toggleSlideShow = ->
  sliding = $(document.body).is('.scroll')
  if sliding
    $(document.body).removeClass 'scroll'
    #showSlide $(document.body.firstElementChild)
    showSlide $("[slide=#{oldSlide}]")
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
          when HOME then $(document.body.firstElementChild)
          when END then $(lastSlide)
          when LEFT_ARROW, PAGE_UP
            n = cur.prev()
            if n.length then n else $(document.body.firstElementChild)
          when RIGHT_ARROW, PAGE_DOWN
            n = cur.next('.slide')
            if n.length then n else $(lastSlide)
        hideSlide cur
        showSlide next

showSlide = (el)->
  $('#slide-num').html "#{el[0].getAttribute('slide')} / #{slideCount}"
  el.removeClass('hidden').addClass('showing')

hideSlide = (el)-> el.addClass('hidden').removeClass('showing')

markupElement = (el, md)->
  len = md.length
  slide = md.match /^\*\*\*\n(-\n)?|^-\n/
  #console.log "LEN: #{slide[0].length}, SLIDE: '#{md[0...20]}', SLICED '#{md[slide[0].length...20]}'"
  [el.innerHTML, lex] = window.marked (if slide then md[slide[0].length..] else md), saveLex: true, gfm: true
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
  #handleInternalSections el
  prevCodePos > -1

handleInternalSections = (el)->
  innerSections = el.querySelectorAll '[leisureSection]'
  parentSection = el.parentNode
  parentTitle = parentSection.getAttribute 'leisureSection'
  if !(el.firstChild.getAttribute 'leisureSection')
    if !(parentSection.previousSibling?.getAttribute 'leisureSection')
      prev = document.createElement 'DIV'
      prev.setAttribute 'leisureSection', 'Main'
      parentSection.parentSection.insertBefore prev, parentSection
    else prev = parentSection.previousSibling
    while !(el.firstChild.getAttribute 'leisureSection')
      prev.appendChild el.firstChild
  before = true
  for node in innerSections
    if node.getAttribute('leisureSection') == parentTitle
      before = false
      while node.firstChild
        el.parentNode.insertBefore node.firstChild, el
      Notebook.remove node
    else if before then parentSection.parentNode.insertBefore node, parentSection
    else parentSection.parentNode.insertBefore node, parentSection.nextSibling


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
      div.style.whiteSpace = ''
      editing = false
      div.setAttribute 'contenteditable', 'false'
      if markupElement div, div.textContent
        for node in div.querySelectorAll "[leisurenode='code']"
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

Notebook.markupElement = markupElement
