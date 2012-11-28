###
# put this in your browser and it boots the leisure envioronment
###

Leisure = {}

window.Boot = Boot = {}
booted = false
bootFuncs = []

Boot.onboot = (cont)->
  if booted then cont()
  else bootFuncs.push cont

bootLeisure = ->
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
  #for i in ['leisure', 'gaudy', 'thin', 'cthulhu', 'jqModal', 'dialog' ]
  for i in ['leisure', 'gaudy', 'thin', 'cthulhu']
    style = document.createElement('link')
    style.setAttribute 'type', "text/css"
    style.setAttribute 'rel', "stylesheet"
    style.setAttribute 'href', "#{i}.css"
    document.head.appendChild style
  #loadThen ['xus', 'parse', 'patterns', 'leisure', 'prim', 'replCore', 'browserRepl', 'prelude', 'std', 'parsing', 'pattern', 'notebook', 'jquery-1.7.2.min', 'jquery.indexeddb', 'storage', 'marked', 'md'], ->
  loadThen ['xus', 'parse', 'leisure', 'prim', 'replCore', 'browserRepl', 'prelude', 'std', 'parsing', 'pattern', 'notebook', 'jquery-1.7.2.min', 'jquery-ui/js/jquery-ui-1.9.1.custom.min', 'jquery.indexeddb', 'storage', 'marked', 'md', 'scanner'], ->
    window.leisureFirst?()
    window.Leisure.restoreAutosave = restoreAutosave
    window.Leisure.backupAutosave = backupAutosave
    window.Leisure.deleteAutosave = deleteAutosave
    #prepTools()
    Repl.init()
    bootFs ->
      Notebook.bootNotebook()
      if window.leisurePrep? then callPrepCode window.leisurePrep, 0, finishBoot
      else finishBoot()

callPrepCode = (preps, index, finishBoot)->
  if index < preps.length
    ReplCore.processLine preps[index], Prim.defaultEnv, 'Parse.', -> callPrepCode preps, index + 1, finishBoot
  else
    finishBoot()

finishBoot = ->
  for node in document.querySelectorAll "[leisurenode='code']"
    node.setAttribute 'contentEditable', 'true'
    Notebook.bindNotebook node
    Notebook.changeTheme node, 'thin'
    Notebook.evalDoc node
  checkBackup()
  if window.leisureBoot? then bootFuncs.push window.leisureBoot
  while bootFuncs.length
    bootFuncs.shift()()
  Storage.start()
  booted = true

prepTools = ->
  div = document.createElement 'div'
  div.setAttribute 'id', 'autoSaveDataDialog'
  div.setAttribute 'class', 'jqmDialog'
  div.setAttribute 'style', 'width: auto'
  div.innerHTML = """
<div class='jqmdTL'><div class='jqmdTR'><div class='jqmdTC jqDrag'>Autosaved Data</div></div></div>
<div class='jqmdBL'><div class='jqmdBR'><div class='jqmdBC' style="height: auto"><div class='jqmdMSG'>
There is autosave data for this page that has not been saved in your document.<br>
<div style="white-space: nowrap"><button onclick='Leisure.restoreAutosave()'>Restore it</button> <button onclick='Leisure.backupAutosave()'>Do not restore it, but back it up</button> <button onclick='Leisure.deleteAutosave()'>Delete autosave data</button></div>
</div></div></div></div>"""
  #<input type='image' src='dialog/close.gif' class='jqmdX jqmClose'></input>"""
  document.body.appendChild div
  # not dragging, yet, for some reason
  $('#autoSaveDataDialog').jqm({modal: true, overlay: 30, overlayClass: 'whiteOverlay'}).jqDrag('.jqDrag')
  $('input.jqmdX').hover(
    (-> $(this).addClass('jqmdXFocus')),
    (-> $(this).removeClass('jqmdXFocus'))
  ).focus(
    -> this.hideFocus=true; $(this).addClass('jqmdXFocus')
  ).blur(
    -> $(this).removeClass('jqmdXFocus')
  )

restoreAutosave = ->
  d = $('#autoSaveDataDialog')
  window.leisureDocVersion = d.v
  alert 'restoring...'

backupAutosave = ->
  d = $('#autoSaveDataDialog')
  window.leisureDocVersion = d.curV
  alert 'backing up...'

deleteAutosave = ->
  d = $('#autoSaveDataDialog')
  window.leisureDocVersion = d.curV
  alert 'deleting...'

showDialog = (curV, v)->
  d = $('#autoSaveDataDialog')
  d.curV = curV
  d.v = v
  d.jqmShow()

loadThen = (files, cont, index)->
  index = index ? 0
  if index == files.length then cont?()
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
else window.addEventListener 'load', bootLeisure

#####################
# File system hookup -- Here's a great resource for learning about this: http://www.html5rocks.com/en/tutorials/file/filesystem/
#####################

fileSystem = null
propsEntry = null
dirEntry = null
nextNameNumber = 1
properties = {}

bootFs = (cont)-> cont()

bootFsX = (cont)->
  Notebook.setSnapper fsSnapper
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder
  window.webkitStorageInfo.requestQuota PERSISTENT, 1024*1024, ((grantedBytes) ->
    window.requestFileSystem PERSISTENT, grantedBytes, ((fs)->
      fileSystem = fs
      initNotebookProperties(fs, cont)
    ), handleError "Couldn't request file system"
  ), handleError "Couldn't get quota"

handleError = (args...)->(e)->console.log 'Error: ', args..., e

# sheesh, all this nesting would be easier with monads
initNotebookProperties = (fs, cont)->
  pageName = document.location.pathname.substring(1).replace(/_/g, '__').replace(/\//g, '_').replace(/\.html?$/i, '')
  fs.root.getFile "#{pageName}.properties", {create: true}, ((fileEntry)->
    fileEntry.getMetadata ((m)->
      dir = "#{pageName}.dir"
      fs.root.getDirectory dir, {create: true}, ((dentry)->
        propsEntry = fileEntry
        dirEntry = dentry
        if m.size then readFile fileEntry, (contents)->
          properties = JSON.parse contents
          docV = Number((document.body.getAttribute 'leisureDocVersion') || 0)
          cont()
        else
          properties.version = 0
          writeFile fileEntry, JSON.stringify properties
          cont()
      ), handleError "Couldn't get directory: #{leisureDir}"
    ), handleError "Couldn't get information about '#{fileEntry.name}'"
  ), handleError "Couldn't get file, '#{pageName}.properties'"

checkBackup = ->
#  if properties.dirty or docV != properties.version then showDialog(docV, properties.version)


readFile = (fileEntry, success)->
  fileEntry.file ((file)->
    reader = new FileReader();
    reader.onloadend = (e)-> success this.result
    reader.readAsText file
  ), handleError "Couldn't read file: '#{fileEntry.name}'"

writeFile = (fileEntry, data)->
  fileEntry.createWriter ((fileWriter)->
    fileWriter.onwriteend = (e)-> #console.log('Write completed.')
    fileWriter.onerror = (e)-> handleError "Write failed for file: '#{fileEntry.name}'"
    bb = new BlobBuilder();
    bb.append(data)
    fileWriter.write bb.getBlob('text/plain')
  ), handleError "Couldn't create writer for file: '#{fileEntry.name}'"

docs = {}

withDirHash = (cont)->
  pgm = ''
  allEntries = []
  reader = dirEntry.createReader()
  readFiles = (entries, index)->
    if index then readFile entries[index - 1], (contents)-> pgm += JSON.stringify(entries[index - 1].name) + JSON.stringify(contents)
    else cont(Sha256.hash pgm)
  re = ->
    reader.readEntries ((results)->
      if results.length
        allEntries.push results...
        re()
      else readFiles allEntries.sort(), allEntries.length
    ), handleError "Couldn't read directory: #{dirEntry.name}"
  re()

addHashResult = (results, index, cont)->
  if index then readFile

hashForDocs = ->
  pgm = ''
  keys = []
  for v, k of docs
    keys.push k
  for k in keys.sort
    pgm += (JSON.stringify k) + (JSON.stringify docsObj[k])
  Sha256.hash pgm

fsSnapper = (el, pgm)->
  if dirEntry?
    makeDirty()
    elementName = el.getAttribute 'leisurecode'
    if !elementName
      elementName = "doc#{nextNameNumber++}"
      el.setAttribute 'leisurecode', elementName
    dirEntry.getFile "#{elementName}.lsr", {create: true}, ((fileEntry)->
      docs[fileEntry.name] = pgm
      writeFile fileEntry, pgm
    ), handleError "Couldn't create file '#{dirEntry.name}/#{elementName}.lsr'"

window.Leisure = Leisure
Leisure.bootLeisure = bootLeisure
window.showAutosaveDialog = showDialog
Boot.loadThen = loadThen
