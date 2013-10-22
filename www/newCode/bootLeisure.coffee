###
# put this in your browser and it boots the leisure envioronment
###

Leisure = window.Leisure ? (window.Leisure = {})
Boot = window.Boot ? (window.Boot = {})

extras = [
#  'marked',
  'base',
  'ast',
  'runtime',
  'gen',
  'generatedPrelude',
  'std',
  'browserSupport',
  'svg',
#  'md',
  'calcSupport',
  'parseAst',
  'calcSkin',
  'calc',
]

Boot.jsFiles.push ("#{f}.js" for f in extras)...

reqGuard = false
window.require = (file)->
  if reqGuard then Leisure
  else
    reqGuard = true
    try
      Leisure.require file
    finally
      reqGuard = false

window.global = window

booted = false
bootFuncs = []


Boot.onboot = (cont)->
  if booted then cont()
  else bootFuncs.push cont

bootLeisure = ->
  loadThen [uniquify("uri.js")], ->
    uri = new window.URI(document.location.href)
    oldParams = uri.getSearchParams()
    params = uri.getSearchParams()
    if !params.uniq then uri.appendSearch "uniq=#{Math.random()}"
    if params.state
      uri.appendFragment uri.search.substring(1)
      uri.search = null
    if oldParams.state || !oldParams.uniq then document.location.href = uri.toString()
    else
      {load,state} = uri.getFragParams()
      if Leisure.calc then bootCalc(uri, load, state) else bootNotebook(uri, load, state)

bootCalc = (uri, load, state)->
  console.log "BOOTING CALC"
  loadThen Boot.jsFiles, ->
    #window.GdriveStorage.initStorage()
    #Repl.init()
    console.log "LOADED: #{Boot.jsFiles}"
    finishBoot()

bootNotebook = (uri, load, state)->
  if state then document.querySelector('[maindoc]').innerHTML = "<h1>LOADING Google Drive file... </h1>"
  else if load then document.querySelector('[maindoc]').innerHTML = "<h1>LOADING #{load}... </h1>"
  Boot.documentFragment = uri.fragment
  document.location.hash = ''
  bootLeisureCont load, state

uniquify = (str)-> "#{str}?uniq=#{new Date().getTime()}"

bootLeisureCont = (load, state)->
  window.removeEventListener 'load', bootLeisure
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
  for i in Boot.cssFiles
    style = document.createElement('link')
    style.setAttribute 'type', "text/css"
    style.setAttribute 'rel', "stylesheet"
    style.setAttribute 'href', i
    document.head.appendChild style
  f = if state then (cont)-> window.GdriveStorage.openFromGdrive cont
  else if load then (cont)->
    addLoadToDocument load
    #load = new URI(document.location.href, load)
    console.log "LOADING #{load}"
    window.Leisure.readFile load, (err, data)->
      if !err
        window.Notebook.replaceContents load, data
        cont()
      else if data then $('[maindoc]').html data
      else $('[maindoc]').html "<h1>ERROR LOADING #{load}: #{err}</h1>"
  else (cont)->
    window.Notebook.replaceContents()
    cont()
  loadThen Boot.jsFiles, ->
    #window.GdriveStorage.initStorage()
    #Repl.init()
    console.log "LOADED: #{Boot.jsFiles}"
    window.Notebook.bootNotebook()
    f ->
      window.leisureFirst?()
      if window.leisurePrep? then callPrepCode window.leisurePrep, 0, finishBoot
      else finishBoot()

addLoadToDocument = (uri)->
  u = new URI(document.location.href)
  p = u.getFragParams()
  p.load = uri.toString()
  u.setFragParams p
  document.location.href = u.toString()

callPrepCode = (preps, index, finishBoot)->
  if index < preps.length
    ReplCore.processLine preps[index], Prim.defaultEnv, 'Parse.', -> callPrepCode preps, index + 1, finishBoot
  else
    finishBoot()

finishBoot = ->
  console.log "Finished initializing storage"
  if window.leisureBoot? then bootFuncs.push window.leisureBoot
  while bootFuncs.length
    bootFuncs.shift()()
  booted = true

loadThen = (files, cont, index)->
  index = index ? 0
  if index == files.length then cont?()
  else
    if !files[index]
      err = new Error("NO FILE AT INDEX #{index} in #{JSON.stringify files}")
      console.log err.stack
      throw err
    window.module = exports: Leisure
    script = document.createElement('script')
    script.setAttribute 'src', files[index]
    script.addEventListener 'load', -> loadThen files, cont, index + 1
    document.head.appendChild script

if document.readyState == 'complete' then bootLeisure()
else window.addEventListener 'load', bootLeisure

handleError = (args...)->(e)->console.log 'Error: ', args..., e

#window.Leisure = Leisure
#window.Notebook = Notebook
Leisure.bootLeisure = bootLeisure
Boot.loadThen = loadThen
Boot.addLoadToDocument = addLoadToDocument
