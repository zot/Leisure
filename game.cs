window.Game = root = {}

LEFT_ARROW = 37
UP_ARROW = 38
RIGHT_ARROW = 39
DOWN_ARROW = 40

keys = {}
count = 0

down = (e, keyFunc)->
  window.EVT = e
  c = (e.charCode || e.keyCode || e.which)
  if !keys[c]?
    keys[c] = e
    count++
    if count == 1 then press keyFunc
  else e.preventDefault()

up = (e, keyFunc)->
  c = (e.charCode || e.keyCode || e.which)
  if keys[c]
    keys[c] = null
    keyFunc e
    count--

press = (keyFunc)->
  found = false
  for c, e of keys
    if e?
      keyFunc(e)
      found = true
  if found then window.setTimeout (()-> press keyFunc), 100

bindSvgDiv = (div, keyFunc)->
  div.focus()
  div.addEventListener 'keydown', (e)-> down(e, keyFunc)
  div.addEventListener 'keyup', (e)->up(e, keyFunc)
  div.firstElementChild.getSVGDocument().rootElement.addEventListener 'mousedown', ((evt)->
    div.focus()
    evt.preventDefault()
  ), true, true

root.bindSvgDiv = bindSvgDiv
