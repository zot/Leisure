    root = module.exports = require './base'
    _ = require './lazy'
    window.Utf8 = require 'utf8'
    sha = require './sha256'
    diff = require './diff'
    #URI = require './uri'
    socket = null
    text = ''
    hash = ''

Trunk comes from the server and represents the picture of the file on the server

    trunk = ''
    texts = {}
    parents = {}
    listener = ->
    watching = false
    watchPeriod = 250

    storeText = (txt)->
      textHash = sha.hash txt
      texts[textHash] = txt
      textHash

    setText = (txt)->
      if socket
        oldHash = hash
        oldText = text
        if txt != text
          text = txt
          hash = storeText txt
          mergeHash = null
          if oldHash
            parents[hash] = oldHash
            if trunk && trunk != oldHash
              sendDiff oldHash, oldText, hash, txt, true
              trunkText = texts[trunk]
              ancestor = commonAncestor oldHash, trunk
              storeText _(diff.diff3_merge txt, texts[ancestor], texts[trunk], true).reduce(((str, result)->
                if result.ok then str + result.ok.join('')
                else str + result.conflict.a + result.conflict.b),
              '')
              mergeHash = oldHash
              oldHash = trunk
              oldText = texts[trunk]
            else storeText txt
            sendDiff oldHash, oldText, hash, txt, false, mergeHash

    sendText = (el)->
      if !watching
        watching = true
        setTimeout (->
          setText el.textContent
          watching = false), watchPeriod

    sendData = (key, value)->
      if socket
        socket.emit 'storeData',
          key: key
          value: value
        textDirty = true

    commonAncestor = (h1, h2)->
      if h1 && h2
        anc = {}
        while h1 || h2
          if r = checkAncestor h1, anc then return r
          if r = checkAncestor h2, anc then return r
          h1 = h1 && parents[h1]
          h2 = h2 && parents[h2]
        null
      else h1 || h2

    checkAncestor = (ancestor, set)->
      if ancestor && set[ancestor] then ancestor
      else ancestor && (set[ancestor] = true) && ancestor

sendDiff
parentHash: hash of parentText
parentText: text of parent
hash: has of text
txt: txt
keepPrivate: do not propagate to other connections
merge: hash of merge parent

    sendDiff = (parentHash, parentText, hash, txt, keepPrivate, merge)->
      if socket
        d = diff.diff_patch parentText, txt
        console.log "Hash: #{hash}, Parent: #{parentHash}, Patch: #{JSON.stringify d, '  '}"
        socket.emit 'store',
          hash: hash
          parent: parentHash
          patch: d
          private: !!keepPrivate
          mergeHash: merge

    receivePatch = (oldHash, patch)->
      text = diff.patch(texts[oldHash], patch).join ''
      hash = storeText text
      trunk = hash
      listener text

    setListener = (l)-> listener = l

    attemptCollaboration = (docUrl, res)->
      u = new URI document.location.href, docUrl
      m = u.path.match /^\/file(\/.*)$/
      if m
        u.path = "/collab#{m[1]}"
        $.get(u.toString(), (data)-> res true, m[1]).fail -> res false
      else res false

    initCollaboration = (url, doc)->
      uri = new URI url
      console.log "\n\n*\n*\n* COLLABORATE #{uri.path}\n*\n*\n"
      attemptCollaboration url, (success, path)->
        if success
          console.log "CONNECTING TO: #{path}"
          socket = io.connect path, 'force new connection': true
          setText doc
          setListener (txt)-> root.useText txt
          socket.on 'connect', ->
            console.log "CONNECTED"
            socket.emit 'init', hash
          socket.on 'patch', ({hash, patch})->
            console.log "RECEIVED hash: #{hash}, patch #{JSON.stringify patch}"
            receivePatch hash, patch
          socket.on 'receiveData', ({key, value, yaml})->

        else console.log "NOT COLLABORATING"

    root.setText = setText
    root.receivePatch = receivePatch
    root.setCollaborationListener = setListener
    root.initCollaboration = initCollaboration
    root.sendText = sendText
    #root.sendDataDiff = sendDataDiff
