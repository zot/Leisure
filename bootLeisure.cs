###
# put this in your browser and it boots the leisure envioronment
###

Leisure = {}

bootLeisure = ->
  body = document.body
  if (body.getAttribute 'leisurecode')?
    pre = document.createElement 'pre'
    pre.setAttribute 'leisurecode', ''
    pre.innerHTML = body.innerHTML
    while body.firstChild
      body.removeChild body.firstChild
    body.appendChild pre
    body.removeAttribute 'leisurecode'
  window.removeEventListener 'load', bootLeisure
  for i in ['leisure', 'gaudy', 'thin']
    style = document.createElement('link')
    style.setAttribute 'type', "text/css"
    style.setAttribute 'rel', "stylesheet"
    style.setAttribute 'href', "#{i}.css"
    document.head.appendChild style
  loadThen ['leisure', 'prim', 'pretty', 'replCore', 'browserRepl', 'std', 'notebook', 'jquery-1.7.2.min'], ->
    Repl.init()
    for node in document.querySelectorAll "[leisurecode]"
      Notebook.bindNotebook node
      Notebook.evalDoc node

loadThen = (files, cont, index)->
  index = index ? 0
  if index == files.length then cont()
  else
    script = document.createElement('script')
    script.setAttribute 'src', "#{files[index]}.js"
    script.addEventListener 'load', -> loadThen files, cont, index + 1
    document.head.appendChild script

evalDoc = ->
  Repl.clearEnv()
  for doc in document.querySelectorAll ".leisure-notebook"
    Notebook.evalDoc(doc)

if document.readyState == 'complete' then bootLeisure()
else
  window.addEventListener 'load', bootLeisure

window.Leisure = Leisure
Leisure.bootLeisure = bootLeisure
