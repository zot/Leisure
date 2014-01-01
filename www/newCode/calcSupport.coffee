{
  resolve,
  lazy,
  defaultEnv,
  minInt,
} = root = module.exports = require './base'
rz = resolve
lz = lazy
{
  genSource,
} = require './gen'
{
  runMonad,
  isMonad,
} = require './runtime'
{
  getType,
  define,
  BS,
  ENTER,
  DEL,
  textNode,
} = require './ast'
{
  svgMeasureText,
} = require './browserSupport'

delayedEval = (env, input, output, simplified, ast, code, count)-> setTimeout (-> evalDiv input.text(), env, input, output, simplified, ast, code, count), 1

buttons = ['simplified', 'ast', 'code']

cleaning = false

clean = (input)->
  # this removes spurious BR nodes
  #burp input
  resetText input

burp = (input)-> console.log "Child nodes: ", input.childNodes

resetText = (input)->
  if !cleaning
    if input.textContent == ''
      cleaning = true
      setTimeout (->
        #if input.firstElementChild != null then input.removeChild input.firstElementChild
        input.textContent = '\n'
        s = window.getSelection()
        r = document.createRange()
        r.setStart input.firstChild, 0
        s.removeAllRanges()
        s.addRange(r)
        setTimeout (-> cleaning = false), 1
      ), 1

configureCalc = (input, output, simplified, ast, code)->
  env = write: (str)-> output.append str
  env.__proto__ = defaultEnv
  inputCount = minInt
  resetText input[0]
  input[0].addEventListener 'keypress', (e)->
    console.log "KEY: #{e.charCode || e.keyCode || e.which}"
    par = e.target
    s = window.getSelection()
    r = s.getRangeAt(0)
    #burp par
    inputCount++
    #if (e.charCode || e.keyCode || e.which) in [BS, DEL] then clean e.target
    if (e.charCode || e.keyCode || e.which) == ENTER
      par = e.target
      e.preventDefault()
      console.log "ENTER"
      br = textNode('\n')
      r.insertNode br
      r.setStartBefore par.firstChild
      r.setEndAfter br
      len = r.cloneContents().textContent.length
      tc = par.textContent
      console.log "len: #{len}, tc.len: #{tc.length}"
      if $.browser.chrome && tc.length == len
      #if br == br.parentNode.lastChild
        if tc.length < 2 || tc.substring(tc.length - 2, tc.length) != '\n\n'
          console.log 'ADDING NEWLINE'
          len = tc.length + 1
          br.nodeValue = '\n\n'
      par.normalize()
      r.setStart par.firstChild, len
      r.collapse()
      s.removeAllRanges()
      s.addRange(r)
  input[0].addEventListener 'DOMCharacterDataModified', (evt)->
    if !cleaning
      clean input[0]
      delayedEval env, input, output, simplified, ast, code, inputCount
  input[0].addEventListener 'DOMSubtreeModified', (evt)->
    if !cleaning
      clean input[0]
      delayedEval env, input, output, simplified, ast, code, inputCount
  for button in buttons
    configurePanelToggle button
  $('#allButton').click (evt)-> toggleAll()
  $('body').removeClass 'loading'

updateAllButton = ->
  allOn = true
  for button in buttons
    if !$("##{button}Button").hasClass('selected')
      allOn = false
      break
  if $('#allButton').hasClass('selected') != allOn then $('#allButton').toggleClass 'selected'

toggleAll = ->
  allOn = $('#allButton').hasClass('selected')
  for button in buttons
    showButton button, !allOn

configurePanelToggle = (button)-> $("##{button}Button").click (evt)-> toggleButton button

toggleButton = (button)-> showButton button, !$("##{button}Button").hasClass('selected')

showButton = (button, state)->
  if state
    $("##{button}Button").addClass 'selected'
    $("##{button}Panel").removeClass 'hidden'
  else
    $("##{button}Button").removeClass 'selected'
    $("##{button}Panel").addClass 'hidden'
  updateAllButton()

#define 'svgMeasureText', (lz (text)->Notebook?.svgMeasureText(text)), 2
define 'svgMeasureText', (lz (text)->svgMeasureText(text)), 1

getParseErr = (x)-> x lz (value)->rz value

show = (obj)-> rz(L_show)(lz obj)

evalCount = minInt

evalDiv = (text, env, input, output, simplified, astDiv, code, count)->
  if count < evalCount then return
  evalCount = count
  output.html ''
  output.removeClass 'err'
  simplified.html ''
  astDiv.html ''
  code.html ''
  if text.trim()
    try
      result = rz(L_newParseLine)(lz 0)(L_nil)(lz text)
      runMonad result, env, (ast)->
        try
          if getType(ast) == 'parseErr'
            output.addClass 'err'
            output.html "Parse error: #{getParseErr ast}"
          else
            output.removeClass 'err'
            simplified.html show lz(runMonad rz(L_simplify) lz text)
            js = genSource text, ast
            code.html js
            result = eval js
            output.html (if isMonad result then "(processing IO monad)\n" else '')
            runMonad result, env, (res)-> output.append show res
            try
              astDiv.html rz(L_wrappedTreeFor)(lz ast)(L_id)
            catch err
              console.log err.stack
        catch err
          output.addClass 'err'
          #output.html err.toString()
          output.html err.stack
          console.log err.stack
    catch err
      output.addClass 'err'
      output.addClass 'err'
      #output.html err.toString()
      output.html err.stack
      console.log err.stack
  else output.html ''

root.configureCalc = configureCalc
root.showButton = showButton
