###
# put this in your browser and it boots the leisure envioronment
###

Leisure = {}

bootLeisure = ->
  body = document.body
  # if (body.getAttribute 'leisurecode')?
  #   pre = document.createElement 'pre'
  #   pre.setAttribute 'leisurecode', ''
  #   pre.setAttribute 'contentEditable', 'true'
  #   pre.innerHTML = body.innerHTML
  #   while body.firstChild
  #     body.removeChild body.firstChild
  #   body.appendChild pre
  #   body.removeAttribute 'leisurecode'
  window.removeEventListener 'load', bootLeisure
  for i in ['leisure', 'gaudy', 'thin', 'cthulhu' ]
    style = document.createElement('link')
    style.setAttribute 'type', "text/css"
    style.setAttribute 'rel', "stylesheet"
    style.setAttribute 'href', "#{i}.css"
    document.head.appendChild style
  loadThen ['leisure', 'prim', 'pretty', 'replCore', 'browserRepl', 'std', 'notebook', 'jquery-1.7.2.min'], ->
    Repl.init()
    bootFs()
    for node in document.querySelectorAll "[leisurecode]"
      node.setAttribute 'contentEditable', 'true'
      Notebook.bindNotebook node
      Notebook.changeTheme node, 'thin'
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

bootFs = ->
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  window.webkitStorageInfo.requestQuota PERSISTENT, 1024*1024, ((grantedBytes) ->
    window.requestFileSystem PERSISTENT, grantedBytes, ((fs)->
      window.leisureFileSystem = fs
      initNotebookProperties(fs)
    ), handleError "Couldn't request file system"
  ), handleError "Couldn't get quota"

handleError = (args...)->(e)->console.log 'Error: ', args..., e

initNotebookProperties = (fs)->
  pageName = document.location.pathname.substring(1).replace(/_/g, '__').replace(/\//g, '_').replace(/\.html?$/i, '')
  fs.root.getFile "#{pageName}.properties", {create: true, exclusive: true}, ((fileEntry)->
    console.log "Got file, '#{pageName}.properties'"
    #// fileEntry.isFile === true
    #// fileEntry.name == 'log.txt'
    #// fileEntry.fullPath == '/log.txt'
  ), handleError "Couldn't get file, '#{pageName}.properties'"

window.Leisure = Leisure
Leisure.bootLeisure = bootLeisure
