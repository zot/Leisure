    root = module.exports = require './base'
    _ = require './lazy'

    sha = require './sha256'
    diff = require './diff'

    text = ''
    hash = ''
    trunk = ''
    texts = {}
    parents = {}
    listener = ->

    storeText = (txt)->
      textHash = sha.hash txt
      texts[textHash] = txt
      textHash

    setText = (txt)->
      oldHash = hash
      oldText = text
      if txt != text
        text = txt
        hash = storeText txt
        merge = null
        if oldHash
          parents[hash] = oldHash
          if trunk != oldHash
            sendDiff oldHash, oldText, hash, txt, true
            trunkText = texts[trunk]
            ancestor = commonAncestor oldHash, trunk
            storeText _(diff.diff3_merge txt, texts[ancestor], texts[trunk], true).reduce(((str, result)->
              if result.ok then result.ok.join('')
              else result.conflict.a + result.conflict.b),
            '')
            merge = oldHash
            oldHash = trunk
            oldText = texts[trunk]
          sendDiff oldHash, oldText, hash, txt, false, merge

    commonAncestor = (h1, h2)->
      anc = {}
      while h1 || h2
        if r = checkAncestor h1, anc then return r
        if r = checkAncestor h2, anc then return r
        h1 = h1 && parents[h1]
        h2 = h2 && parents[h2]
      null

    checkAncestor = (ancestor, set)->
      if ancestor && set[ancestor] then set[ancestor]
      else
        set[ancestor] = true
        null

parentHash: hash of parentText
parentText: text of parent
hash: has of text
txt: txt
keepPrivate: don't propagate to other connections
merge: hash of merge parent

    sendDiff = (parentHash, parentText, hash, txt, keepPrivate, merge)->
      d = diff.diff_patch parentText, txt
      console.log "Hash: #{hash}, Parent: #{parentHash}, Patch: #{JSON.stringify d}"

    receiveDiff = (hash, diff)->
      storeText d.patch texts[hash], diff
      trunk = hash
      listener()

    setListener = (l)-> listener = l

    root.setText = setText
    root.receiveDiff = receiveDiff
    root.setCollaborationListener = setListener
