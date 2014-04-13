addLoadToDocument = (uri)->
  u = new URI(document.location.href)
  p = u.getFragParams()
  p.load = uri.toString()
  u.setFragParams p
  document.location.href = u.toString()

start = ->
  if !Element.prototype.createShadowRoot && !Element.prototype.webkitCreateShadowRoot
    document.body.style = "background: url(images/steampunk_background-faded.jpg); background-size: 100%; text-align: center"
    document.body.innerHTML = "<h1 style='margin-top: 64px'>Leisure won't work in this browser :(</h1><br>The Leisure environment uses Shadow Dom and this browser doesn't support it, so Leisure won't work!<br><h2>Recent versions of Chrome should work.</h2><br><br><img src='images/steampunk_leisure_button.png'>"
  else
    $("#load_file").click -> $("#internal_load_file").click()
    div = $('[maindoc]')
    window.ORG_TEXT = div.html().replace(/^\s*<!--+/, '').replace(new RegExp('-->\s*\n*','m'), '').trim()
    $('#loading').remove()
    $('body').removeClass 'loading'
    $('#panel').css 'display', ''
    Leisure.initOrg '[maindoc]', '#source'
    $('#name').focus()
    $('#loginForm').submit (e)->
      e.preventDefault()
      $("#local").hide()
      $("#github_loader").removeAttr 'style'
      $("#github").prop 'value', "Please hold..."
      Leisure.connectStorage()

#Bubba = new Meteor.Collection 'bubba'

#processChanges = (items)-> console.log "Bubba added: #{JSON.stringify items, ' '}"

if Meteor.isServer
  global.GlobalAssets = Assets

if Meteor.isClient
  #window.Bubba = Bubba
  #Bubba.find().observe
  #  added: (el)-> addBatch 'changes', {added: el}, processChanges
  #  removed: (el)-> addBatch 'changes', {removed: el}, processChanges
  #  changed: (el)-> addBatch 'changes', {changed: el}, processChanges
  Meteor.startup ->
    window.setTimeout (->
      uri = new window.URI(document.location.href)
      console.log "URI: #{uri}"
      oldParams = uri.getSearchParams()
      params = uri.getSearchParams()
      if params.state
        uri.appendFragment uri.search.substring(1)
        uri.search = null
      {load,state} = uri.getFragParams()
      if state then document.querySelector('[maindoc]').innerHTML = "<h1>LOADING Google Drive file... </h1>"
      else if load then document.querySelector('[maindoc]').innerHTML = "<h1>LOADING #{load}... </h1>"
      document.location.hash = ''
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
      {load,state} = uri.getFragParams()
      if state then window.GdriveStorage.openFromGdrive -> start()
      else if load
        console.log "LOAD: load"
        setTimeout (->
          addLoadToDocument load
          window.Leisure.readFile load, (err, data)->
            if err
              if data then $('[maindoc]').html data
              else $('[maindoc]').html "<h1>ERROR LOADING #{load}: #{err}</h1>"
            else start()), 1
      else start()), 1
