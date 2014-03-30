Leisure server -- supports collaboration on documents

    root = module.exports = require './base'
    global.Utf8 = require 'utf8'
    URI = require './uri'
    _ = require './lazy'
    sha = require './sha256'
    diff = require './diff'
    fs = require 'fs'
    util = require 'util'
    dir = null
    ns = {}
    io = null
    hashes = {}
    trunks = {}

    console.log "HASH 'hello' = #{sha.hash 'hello'}"

    handler = (req, res)->
      uri = new URI req.url
      console.log "PATH: #{uri.path}"
      if m = uri.path.match /^file\/(.*)$/ then getFile uri, req, res, m
      else if m = uri.path.match /^collab\/(.*)$/ then attemptCollab uri, req, res, m
      else
        console.log "BAD REQUEST: #{uri.path}"
        res.writeHead 404
        res.end "Unknown uri: #{uri.path}"

    getFile = (uri, req, res, m)->
      fileName = m[1]
      if trunks[fileName]
        console.log "retrieving working copy: #{fileName}"
        res.writeHead 200
        res.end hashes[trunks[fileName]]
      fs.readFile "#{dir}/#{fileName}", (err, data)->
        if (err)
          console.log "ERROR READING FILE: #{fileName}"
          res.writeHead 500
          res.end 'Error loading index.html'
        else
          console.log "SENDING FILE: #{fileName}"
          res.writeHead 200
          res.end data

    attemptCollab = (uri, req, res, m)->
      fileName = m[1]
      if !trunks[fileName]
        file = "#{dir}/#{fileName}"
        if !(fs.existsSync file)
          res.writeHead 404
          res.end "No file: #{file}"
        else
          fs.readFile "#{dir}/#{fileName}", {encoding: 'utf8'}, (err, data)->
            if (err)
              res.writeHead 404
              res.end "No file: #{file}"
            else
              ns[fileName] = true
              createNamespace fileName
              newTrunk fileName, data
              console.log "COLLABORATE: #{fileName} (NEW NAMESPACE)"
              res.writeHead 200
              res.end "true"
      else
        console.log "COLLABORATE: #{fileName}"
        res.writeHead 200
        res.end "true"

    newTrunk = (fileName, data)->
      console.log "encode type: #{typeof data}"
      hash = sha.hash data
      trunks[fileName] = hash
      hashes[hash] = data

    createNamespace = (file)->
      console.log "CREATED NAMESPACE: #{file}"
      ns = io.of("/#{file}")
      ns.on 'connection', (socket)->
        console.log "CONNECTION TO NAMESPACE: #{file}\n#{util.inspect socket}"
        #console.log "CONNECTION TO NAMESPACE: #{file}"
        socket.file = file
        socket.on 'init', (data)->
          console.log "INIT: #{data}"
          socket.hash = data
        socket.on 'store', ({hash, parent, patch, keepPrivate, mergeHash})->
          storeVersion socket, hash, parent, patch, keepPrivate, mergeHash

    storeVersion = (socket, hash, parent, patch, keepPrivate, mergeHash)->
      console.log "STORE hash: #{hash}, parent: #{parent}, patch length: #{patch.length}"
      d = hashes[hash] = diff.patch(hashes[parent], patch).join ''
      if sha.hash(hashes[hash]) != hash then console.log "WARNING, bad data for hash: #{hash}...\n#{d}"
      else console.log "STORED: #{d}"
      trunks[socket.file] = hash
      socket.hash = hash
      if !keepPrivate
        for sockName, sock of socket.namespace.sockets
          if sock.hash && sock.hash != hash
            sock.emit 'patch',
              hash: sock.hash
              patch: diff.diff_patch hashes[sock.hash], d
            sock.hash = hash

    createServer = (opts)->
      dir = opts.dir
      app = require('http').createServer handler
      io = require('socket.io').listen app
      app.listen opts.port ? 80
      io.sockets.on 'connection', (socket)-> console.log "GLOBAL CONNECTION"

    root.createServer = createServer
