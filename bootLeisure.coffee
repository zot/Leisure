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
  loadThen [uniquify("uri.js")], ->
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
      console.log "FRAG PARAMS: #{JSON.stringify uri.getFragParams()}"
      {load,state} = uri.getFragParams()
      if state then document.querySelector('[maindoc]').innerHTML = "<h1>LOADING Google Drive file... </h1>"
      else if load then document.querySelector('[maindoc]').innerHTML = "<h1>LOADING #{load}... </h1>"
      Boot.documentFragment = document.location.hash
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
    console.log "LOADING #{load}"
    Prim.read load, ((data)->
      Notebook.replaceContents load, data
      cont()
    ), (err)-> $('[maindoc]').innerHTML = "<h1>ERROR LOADING #{load}: #{err}</h1>"
  else (cont)->
    Notebook.replaceContents()
    cont()
  loadThen Boot.jsFiles, ->
    window.GdriveStorage.initStorage()
    Repl.init()
    Notebook.bootNotebook()
    f ->
      window.leisureFirst?()
      if window.leisurePrep? then callPrepCode window.leisurePrep, 0, finishBoot
      else finishBoot()

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
    script = document.createElement('script')
    script.setAttribute 'src', files[index]
    script.addEventListener 'load', -> loadThen files, cont, index + 1
    document.head.appendChild script

if document.readyState == 'complete' then bootLeisure()
else window.addEventListener 'load', bootLeisure

handleError = (args...)->(e)->console.log 'Error: ', args..., e

window.Leisure = Leisure
Leisure.bootLeisure = bootLeisure
Boot.loadThen = loadThen
