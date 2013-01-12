####
# Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl
# 
# (licensed with ZLIB license)
# 
# This software is provided 'as-is', without any express or implied
# warranty. In no event will the authors be held liable for any damages
# arising from the use of this software.
# 
# Permission is granted to anyone to use this software for any purpose,
# including commercial applications, and to alter it and redistribute it
# freely, subject to the following restrictions:
# 
# 1. The origin of this software must not be misrepresented; you must not
# claim that you wrote the original software. If you use this software
# in a product, an acknowledgment in the product documentation would be
# appreciated but is not required.
# 
# 2. Altered source versions must be plainly marked as such, and must not be
# misrepresented as being the original software.
# 
# 3. This notice may not be removed or altered from any source distribution.
####

####
# Use Xus to access storage
# 
# File structure in storage, just use HTML5 file system API for autosave
# Later, do offline mode with syncing
# This lets people share files and get functionality sooner (I think)
# 
# LeisureStorage
#    +- info.json
#    +- Imports -- projects from other users
#    |  +- ImportedProject1-Name -- this is a link to another user's shared Leisure project
#    |  +- ImportedProejct2-Name
#    +- Projects -- your own projects
#       +- Project1-Name
#       |  +- info.json -- list files that are imported: name -> original id -- most likely in an imported project
#       |  +- main.lsr -- main file, which imports the others (order might be important?)
#       |  +- file1.lsr
#       |  +- file2.lsr
#       |  +- import1.lsr -- listed in info.json
#       |  +- import2.lsr -- listed in info.json
#       |  +- ...
#       +- Project2-Name
#       |  +- ...
#       +- ...
# 
####

if window? and (!global? or global == window)
  root = window.GdriveStorage ? (window.GdriveStorage = {})
  Prim = window.Prim ? (window.Prim = {})
  Parse = window.Parse ? (window.Parse = {})
  Notebook = window.Notebook ? (window.Notebook = {})
  window.global = window
else
  root = exports ? this
  Prim = require './prim'

if !window?
  initStorage = ->
  return

# Google drive stuff for projects

# callback function is given one argument: either null or an error string
initStorage = (callback)->
  Prim.newUriHandler 'googledrive',
    read: (uri, cont, err, next)->
      initGdrive ->
        files = path2Ids["/LeisureStorage#{uri.path}"]
        if !files then next()
        else if files.length > 1 then err new Error "More than one file for uri: #{uri}"
        else readFile id2File[files[0]], (err, result)->
          if !err then cont result else new Error "Error reading file #{uri}: #{err.statusText}"
    write: (uri, data, cont, err)->
      initGdrive ->
        files = path2Ids["/LeisureStorage#{uri.path}"]
        if !files then writeFile uri.path.substring(1), data, [{id: leisureDir}], (json)->
          if json then cont() else err new Error "Problem writing file"
        else if files?.length > 1 then err new Error "More than one file for uri: #{uri}"
        else updateFile id2File[files[0]], data, (json)->
          if json then cont() else err new Error "Problem writing file"

openFromGdrive = (callback)->
  frag = (Boot.documentFragment ? '#').substring 1
  {state} = new Prim.URI("#{document.location.href}#{frag}").getFragParams()
  cb = ->
    callback()
    addOpenButton()
  if state
    {ids, action} = JSON.parse state
    if action != "open"
      document.body.innerHTML = "<h1>Unknwn action from Google Drive: #{action}</h1>"
    if !ids || ids.length != 1
      document.body.innerHTML = "<h1>More than one file to open</h1>"
    else
      cb()
      loadFile ids[0]
  else
    window.leisureAutoRunAll = true
    window.markup()
    cb()

loadFile = (id, cont)->
  $('[maindoc]')[0].innerHTML = "<h1>LOADING Google Drive file... </h1>"
  initGdrive ->
    file = id2File[id]
    if !file
      $('[maindoc]')[0].innerHTML = "<h1>Unknown file id: #{ids[0]}</h1>"
    else
      $('[maindoc]')[0].innerHTML = "<h1>LOADING #{file.title}... </h1>"
      readFile file, (err, text)->
        if err
          $('[maindoc]')[0].innerHTML = "<h1>Error loading #{file.title}: #{err.statusText}</h1>"
        else if file.fileExtension == 'lmd'
          if id2Paths[file.id].length > 1
            for path in id2Paths[file.id]
              if path.match '^/LeisureStorage/'
                if filename
                  $('[maindoc]')[0].innerHTML = "<h1>Error loading #{file.title}: More than one path to file in LeisureStorage, #{JSON.stringify id2Paths[file.id]}</h1>"
                return
              else filename = path
          else filename = id2Paths[file.id][0]
          Notebook.replaceContents "googledrive://#{filename}", text
        else
          $('[maindoc]')[0].innerHTML = "<h1>Error loading #{file.title}; can only load *.lmd files.</h1>"
        (cont ? -> )()

#
# directory cache
#

id2Paths = {}
path2Ids = {}
id2File = {}
leisureDir = null

addPath = (id, path)->
  if path2Ids[path] then path2Ids[path].push id else path2Ids[path] = [id]
  if id2Paths[id] then id2Paths[id].push path else id2Paths[id] = [path]

computePaths = (file)->
  if !file then []
  else if id2Paths[file.id] then id2Paths[file.id]
  else
    id2File[file.id] = file
    if file.parents.length == 0 then addPath file.id, "/#{file.title}"
    else
      for parent in file.parents
        if parent.isRoot then addPath file.id, "/#{file.title}"
        else for parentPath in computePaths id2File[parent.id]
          addPath file.id, "#{parentPath}/#{file.title}"
    id2Paths[file.id]

#
# BEGIN AUTHENTICATION CODE
#

auth =
  finished: false
  succeeded: false
  started: false
  cont: []
  err: null
  status: null
  token: null

showDelay = ->
  if widget = Notebook.lastEnv?.getWidget()
    widget.appendChild Notebook.createNode "<img src='loading.gif'>"
    -> Notebook.lastEnv.destroyWidget()
  else ->

initGdrive = (cont)->
  if auth.finished then cont()
  else if auth.started then auth.cont.push cont
  else
    del = showDelay()
    Notebook.delay ->
      Boot.loadThen ["https://apis.google.com/js/client.js?onload=gapiClientLoaded"], true, ->
      auth.started = true
      auth.cont.push ->
        del?()
        cont()

initFileList = (cont)->
  listFiles (json)->
    id2File[item.id] = item for item in json.items when !item.explicitlyTrashed
    computePaths item for item in json.items
    names = (key for key of path2Ids)
    names.sort()
    for name in names
      console.log name
    dirs = path2Ids["/LeisureStorage"]
    if !dirs then makeLeisureDir cont
    else
      if dirs.length > 1
        replaceAuth
          succeeded: false
          err: "More than one LeisureStorage directory"
      else
        console.log "SETTING DIR TO #{dirs[0]}"
        leisureDir = dirs[0]
      cont()

window.gapiClientLoaded = -> window.setTimeout (-> checkDriveAuth true), 100

window.handleAuthClick = (event)->
  checkDriveAuth false
  false

checkDriveAuth = (immediate)->
  console.log "AUTH"
  try
    gapi.auth.authorize({
      client_id: '270759921607',
      scope: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.install',
      ].join(' '),
      immediate: immediate
    }, handleAuthResult);
  catch err
    finishAuth
      status: 'failed'
      err: err
    console.log("Authentication not allowed by security")

handleAuthResult = (authResult)->
  authorizeButton = document.getElementById('authorize-button')
  if !authResult
    console.log("Not authenticated, yet -- creating button")
    createAuthButton()
  else
    if authResult.error
      console.log "Authentication failed: #{authResult.error}"
      finishAuth
        succeeded: false
        err:authResult?.error
    else
      console.log "Authenticated: #{JSON.stringify authResult}"
      finishAuth
        succeeded: true
        token: authResult.access_token

createAuthButton = ->
  if !auth.buttonDiv
    auth.buttonDiv = document.createElement 'div'
    auth.buttonDiv.setAttribute 'style', 'background: white; z-index: 10000; position: absolute; left: 0; top: 0; width: 100%; height: 100%'
    auth.buttonDiv.innerHTML = '<span>Would you like to authorize Leisure to create files and access them in a LeisureStorage directory in your Google drive?  <button onclick="handleAuthClick()">Yes</button> <button onclick="denyAuth()">No</button></span>'
    document.body.insertBefore auth.buttonDiv, document.body.firstChild

window.denyAuth = ->
  finishAuth
    succeeded: false
    err: 'User denied authorization'

finishAuth = (obj)->
  if !auth.finished
    replaceAuth obj
    if obj.succeeded then initFileList -> cont() for cont in (auth.cont ? [])
    else cont() for cont in (auth.cont ? [])

replaceAuth = (obj)->
  if auth.buttonDiv then document.body.removeChild auth.buttonDiv
  obj.cont = (auth.cont ? []).concat (obj.cont ? [])
  obj.finished = true
  auth = obj

makeLeisureDir = (cont)->
  console.log "No LeisureStorage directory.  Creating one"
  mkdir 'LeisureStorage', (json, raw)->
    computePaths json
    console.log "SETTING DIR TO #{json.id}"
    leisureDir = json.id
    console.log "CREATED DIR: #{raw}", json
    cont()

#
# END OF AUTHENTICATAION CODE
# 

addOpenButton = ->
  return
  save = document.body.querySelector '[leisureId=saveButton]'
  open = Notebook.createNode "<button>Open</button>"
  save.parentNode.insertBefore open, save.nextSibling
  open.addEventListener 'click', -> runOpen()

runOpen = (arg)->
  initGdrive ->
    view = new google.picker.DocsView()
    view.setParent path2Ids["/LeisureStorage"]
    picker = new google.picker.PickerBuilder().
      #addView(google.picker.ViewId.DOCS).
      addView(view).
      setCallback(arg ? openFile).
      build()
    picker.setVisible(true)

openFile = (json)->
  if json?.action == 'picked' and json.docs?.length > 0
    loadFile json.docs[0].id

mimePart = (boundary, mimeType, content)->
  return [
    "\r\n--", boundary, "\r\n",
    "Content-Type: ", mimeType, "\r\n",
    "Content-Length: ", content.length, "\r\n",
    "\r\n",
    content,
  ].join('');

DONE = 4

readFile = (file, callback)->
  if file.downloadUrl
    del = showDelay()
    Notebook.delay ->
      console.log "File:", file
      xhr = new XMLHttpRequest();
      xhr.open 'GET', file.downloadUrl
      xhr.setRequestHeader('Authorization', 'Bearer ' + auth.token);
      xhr.onreadystatechange = ->
        if @readyState == DONE
          del()
          console.log "XHR", xhr
          if @status == 200 then callback null, xhr.responseText
          else callback xhr
      xhr.send();
  else callback null

writeFile = (name, contents, parents, callback)->
  del = showDelay()
  Notebook.delay ->
    console.log "WRITING #{name} (del: #{del}), parents:", JSON.stringify parents
    json = JSON.stringify
      mimeType: 'text/plain'
      title: name
      parents: parents ? []
    req = gapi.client.request(
      'path': '/upload/drive/v2/files?uploadType=multipart'
      'method': 'POST'
      'headers':
        'Content-Type': 'multipart/mixed; boundary="END_OF_PART"'
        'Authorization': 'Bearer ' + auth.token
      'body': [
        mimePart("END_OF_PART", "application/json", json),
        mimePart("END_OF_PART", "text/plain", contents),
        "\r\n--END_OF_PART--\r\n",
      ].join(''))
    req.execute (json)->
      del()
      if json then computePaths json
      callback json

updateFile = (file, contents, callback)->
  del = showDelay()
  Notebook.delay ->
    console.log "UPDATING #{name}, parents:", JSON.stringify file.parents
    gapi.client.request(
      'path': "/upload/drive/v2/files/#{file.id}?uploadType=multipart&alt=json"
      'method': 'PUT'
      'headers':
        'Content-Type': 'multipart/mixed; boundary="END_OF_PART"'
        'Authorization': 'Bearer ' + auth.token
      'body': [
        mimePart("END_OF_PART", "application/json", JSON.stringify file),
        mimePart("END_OF_PART", "text/plain", contents),
        "\r\n--END_OF_PART--\r\n",
      ].join('')).execute (json)->
        del()
        callback json

listFiles = (query, callback)->
  if !callback
    callback = query
    q = ''
  else q = "&q=#{encodeURIComponent query}"
  (gapi.client.request
    path: "/drive/v2/files?maxResults=10000#{q}"
    method: 'GET').execute callback

mkdir = (name, callback)->
  (gapi.client.request
    path: '/drive/v2/files'
    method: 'POST'
    headers:
      'Authorization': 'Bearer ' + auth.token
    body: JSON.stringify
      title: name
      parents: []
      mimeType: "application/vnd.google-apps.folder").execute callback

root.initStorage = initStorage
root.runOpen = runOpen
root.loadFile = loadFile
