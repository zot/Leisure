###
# put this in your browser and it boots the leisure envioronment
###

Leisure = window.Leisure ? (window.Leisure = {})
Boot = window.Boot ? (window.Boot = {})

booted = false
bootFuncs = []


Boot.onboot = (cont)->
  if booted then cont()
  else bootFuncs.push cont

bootLeisure = ->
  loadThen ['uri'], ->
    uri = new window.URI(document.location.href)
    params = uri.getSearchParams()
    if params.state
      uri.fragment = (if uri.fragment then uri.fragment + '&' else '#') + uri.search.substring(1)
      uri.search = null
      document.location.href = uri.toString()
    else if !params.uniq
      uri.search = "#{uri.search ? ''}#{if uri.search then '&' else '?'}uniq=#{Math.random()}"
      document.location.href = uri.toString()
    else
      Boot.documentFragment = document.location.hash
      document.location.hash = ''
      bootLeisureCont()

uniquify = (str)-> "#{str}?uniq=#{new Date().getTime()}"

bootLeisureCont = ->
  body = document.body
  # Gotta be able to stuff extra hidden things in the body
  # so if it's a code container, copy it into a child
  if 'code' == body.getAttribute 'leisureNode'
    pre = document.createElement 'pre'
    pre.setAttribute 'leisureNode', 'code'
    pre.setAttribute 'contentEditable', 'true'
    pre.innerHTML = body.innerHTML
    while body.firstChild
      body.removeChild body.firstChild
    body.appendChild pre
    body.removeAttribute 'leisureNode'
  window.removeEventListener 'load', bootLeisure
  for i in ['leisure', 'gaudy', 'thin', 'cthulhu']
    style = document.createElement('link')
    style.setAttribute 'type', "text/css"
    style.setAttribute 'rel', "stylesheet"
    style.setAttribute 'href', uniquify "#{i}.css"
    document.head.appendChild style
  loadThen ['marked', 'xus', 'storage', 'parse', 'leisure', 'prim', 'replCore', 'browserRepl', 'std', 'notebook', 'jquery-1.7.2.min', 'jquery-ui/js/jquery-ui-1.9.1.custom.min', 'md', 'maps', 'svg', 'parseAst'], ->
    window.GdriveStorage.initStorage ->
      window.leisureFirst?()
      Repl.init()
      Notebook.bootNotebook()
      if window.leisurePrep? then callPrepCode window.leisurePrep, 0, finishBoot
      else finishBoot()

callPrepCode = (preps, index, finishBoot)->
  if index < preps.length
    ReplCore.processLine preps[index], Prim.defaultEnv, 'Parse.', -> callPrepCode preps, index + 1, finishBoot
  else
    finishBoot()

finishBoot = ->
  console.log "Finished initializing storage"
  for node in document.querySelectorAll "[leisurenode='code']"
    node.setAttribute 'contentEditable', 'true'
    Notebook.bindNotebook node
    Notebook.changeTheme node, 'thin'
    Notebook.evalDoc node
  if window.leisureBoot? then bootFuncs.push window.leisureBoot
  while bootFuncs.length
    bootFuncs.shift()()
  booted = true

loadThen = (files, nosuffix, cont, index)->
  if typeof nosuffix == 'function'
    index = cont
    cont = nosuffix
    nosuffix = false
  index = index ? 0
  if index == files.length then cont?()
  else
    script = document.createElement('script')
    script.setAttribute 'src', (if nosuffix then files[index] else uniquify "#{files[index]}.js")
    script.addEventListener 'load', -> loadThen files, cont, index + 1
    document.head.appendChild script

if document.readyState == 'complete' then bootLeisure()
else window.addEventListener 'load', bootLeisure

handleError = (args...)->(e)->console.log 'Error: ', args..., e

window.Leisure = Leisure
Leisure.bootLeisure = bootLeisure
Boot.loadThen = loadThen
