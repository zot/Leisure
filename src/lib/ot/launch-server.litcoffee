Launch Server
=============
Copyright (C) 2015, Bill Burdick, Roy Riggs, TEAM CTHULHU

SockJS bindings for OT

Licensed with ZLIB license.
=============================

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.

Launch an OT server

    require('source-map-support').install()
    sockjs = require 'sockjs'
    sockjsUtil = require 'sockjs/lib/utils'
    http = require 'http'
    crypto = require 'crypto'
    serveStatic = require 'serve-static'
    finalhandler = require 'finalhandler'
    path = require 'path'
    console.log "DIR: #{path.resolve path.dirname(module.filename) + '/../..'}"
    baseDir = path.resolve path.dirname(module.filename) + "/../.."
    _ = require "#{baseDir}/lib/lodash.min"
    requirejs = require('requirejs').config
      baseUrl: baseDir
      paths:
        immutable: 'lib/immutable-3.8.1.min.js'

    {
      badMasterIdError
      badMsgTypeError
      disapprovedError
      badVersionError
      noTrim
    } = requirejs './common'
    {
      Server: OtServer
    } = requirejs 'lib/ot/server'
    {
      WrappedOperation
    } = requirejs 'lib/ot/wrapped-operation'
    {
      TextOperation
    } = requirejs 'lib/ot/text-operation'
    {
      RejectGuardedOperation
    } = requirejs 'lib/ot/guarded-operation'
    {
      GuardedServer
    } = requirejs 'lib/ot/guarded-server'
    {
      Selection
    } = requirejs 'lib/ot/selection'

    masters = {}
    socketPrefix = '/Leisure/(create|join(?:-([^/]*)))'

Thanks to [Broofa's stackoverflow post](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105074#105074) Altered the code to use crypto's random.

    s4 = ->
      bytes = crypto.randomBytes 2
      n = (bytes[0] + (bytes[1] << 8)).toString(16)
      while n.length < 4
        n = '0' + n
      n

    guid = -> "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"

    diag = (args...)-> console.log args...

    class MessageHandler
      constructor: ->
        @guid = guid()
        @messageCount = 1
        @lastVersionAck = -1
      setConnection: (@con)->
        console.log "#{@type} connection: #{@guid}"
        @con.leisure = this
        @con.on 'data', (msg)=> @handleMessage JSON.parse msg
        @con.on 'close', => @closed()
      type: 'Unknown Handler'
      close: -> @con.close()
      closed: -> console.log "#{@type} closed: #{@guid}"
      send: (msg)->
        diag "S    #{JSON.stringify msg}"
        @con.write JSON.stringify msg
      broadcast: (msg)-> @master.sendBroadcast this, msg
      sendError: (msg)->
        msg.type = 'error'
        @send msg
        setTimeout (=> @close()), 1

Handle a message from the connected browser

      handleMessage: (msg)->
        msg.connectionId = @connectionId
        diag "R    #{JSON.stringify msg}"
        if !(msg.type of @handler)
          console.log "Received bad message #{msg.type}", msg
          @close()
        else
          try
            @handler[msg.type].call this, msg
          catch err
            console.log err.stack
      handler:
        log: (msg)-> console.log msg.msg
        replace: (msg)->
          @lastVersionAck = msg.parent
          @master.relay msg
        conditionalReplace: (msg)->
          if msg.version != @master.version && @master.versionDirty
            @send type: 'rejectChange', targetVersion: msg.targetVersion, version: @version
          else @master.relay msg
        guardedOperation: (msg)-> @master.guardedOperation this, msg
        operation: (msg)-> @master.operation this, msg
        selection: (msg)-> @master.selection this, msg
        setName: (msg)-> @master.setName this, msg
      peerEntry: -> {@name, @selection}

    isTextMsg = (msg)-> msg.type in ['replace', 'conditionalReplace']

    class MasterHandler extends MessageHandler
      constructor: ->
        super()
        @master = this
        @connectionId = "peer-0"
        @slaves = {}
        @pendingSlaves = {}
        @peerCount = 0
      type: 'Master'
      peers: ->
        cons = {}
        cons[@connectionId] = @peerEntry()
        for id, s of @slaves
          cons[id] = s.peerEntry()
        cons
      setConnection: (con)->
        masters[@guid] = this
        super con
        @send type: 'connected', guid: @guid, id: @connectionId, revision: 0, peers: @peers()
      addSlave: (slave)->
        slave.connectionId = "peer-#{++@peerCount}"
        @pendingSlaves[slave.connectionId] = slave
        @send type: 'slaveConnect', slaveId: slave.connectionId
      removeSlave: (slave)->
        delete @slaves[slave.connectionId]
        delete @pendingSlaves[slave.connectionId]
        @send type: 'slaveDisconnect', slaveId: slave.connectionId
        @sendBroadcast null, type: 'disconnection', peerId: slave.connectionId
      closed: ->
        delete masters[@con.leisure.id]
        for id, slave of @slaves
          slave.close()
        @slaves = {}
        super()
      sendBroadcast: (sender, msg)->
        for id, slave of @slaves
          if sender != slave then slave.send msg
        if sender != this then @send msg
      guardedOperation: (peer, {revision, operation, selection, guards, guardId})->
        try
          wrapped = new WrappedOperation(
            TextOperation.fromJSON operation,
            selection && Selection.fromJSON(selection))
        catch exc
          peer.send {type: 'rejectGuard', guardId}
          console.error "Invalid operation received: " + exc.stack
          return;
        try
          wrappedPrime = @otServer.receiveGuardedOperation revision, wrapped, guards
          if wrappedPrime == RejectGuardedOperation
            peer.send {type: 'rejectGuard', guardId, retryOK: true}
          else
            console.log "new guard operation: " + JSON.stringify wrapped
            peer.selection = wrappedPrime.meta
            @sendBroadcast null, type: 'operation', peerId: peer.connectionId, operation: wrappedPrime.wrapped.toJSON(), meta: wrappedPrime.meta
            peer.send {type: 'ackGuard', guardId, operation: wrappedPrime.wrapped.toJSON()}
        catch exc
          peer.send {type: 'rejectGuard', guardId}
          console.error exc.stack
      operation: (peer, {revision, operation, selection})->
        try
          wrapped = new WrappedOperation(
            TextOperation.fromJSON operation,
            selection && Selection.fromJSON(selection))
        catch exc
          console.error "Invalid operation received: " + exc.stack
          return;
        try
          wrappedPrime = @otServer.receiveOperation revision, wrapped
          console.log "new operation: " + JSON.stringify wrapped
          peer.selection = wrappedPrime.meta
          peer.send type: 'ack'
          peer.broadcast type: 'operation', peerId: peer.connectionId, operation: wrappedPrime.wrapped.toJSON(), meta: wrappedPrime.meta
        catch exc
          console.error exc.stack
      selection: (peer, {selection})->
        if selection then peer.selection = selection;
        else delete peer.selection;
        peer.broadcast type: 'selection', peerId: peer.id, selection: selection
      setName: (peer, {name})->
        peer.name = name;
        peer.broadcast type: 'setName', peerId: peer.id, name: name
      handler:
        __proto__: MessageHandler::handler
        initDoc: ({doc, @name})-> @otServer = new GuardedServer(doc)
        slaveApproval: ({slaveId, approval})->
          if slave = @pendingSlaves[slaveId]
            delete @pendingSlaves[slaveId]
            if approval
              slave.send type: 'connected', id: slave.connectionId, doc: @otServer.document, revision: @otServer.operations.length, peers: @peers()
              @slaves[slaveId] = slave
            else slave.sendError disapprovedError()
        fileContent: (msg)->
          id = msg.slaveId
          delete msg.slaveId
          @slaves[id].send msg
        fileError: (msg)->
          id = msg.slaveId
          delete msg.slaveId
          @slaves[id].send msg
        customResponse: (msg)->
          id = msg.slaveId
          delete msg.slaveId
          @slaves[id].send msg

    class SlaveHandler extends MessageHandler
      type: 'Slave'
      setConnection: (con, masterId)->
        if !(@master = masters[masterId])
          @sendError badMasterIdError masterId
        else @master.addSlave this
        super con
      closed: ->
        @master.removeSlave this
        super()
      handler:
        __proto__: MessageHandler::handler
        intro: ({@name})->
          @broadcast type: 'connection', peerId: @connectionId, peerName: @name
        requestFile: (msg)->
          msg.slaveId = @connectionId
          @master.send msg
        customMessage: (msg)->
          msg.slaveId = @connectionId
          @master.send msg

    startServer = (port)->
      console.log 'serve: ' + path.dirname(process.cwd())
      files = serveStatic path.dirname(process.cwd()), index: ['index.html']
      docs = serveStatic path.resolve(path.dirname(process.cwd()), "../docs")
      http_server = http.createServer (req, res)->
        (if m = req.url.match /^\/docs(\/.*)$/
          req.url = m[1]
          docs
        else files) req, res, finalhandler req, res
      sockjs.createServer(
        sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
        prefix: socketPrefix)
        .on 'connection', (con)->
          if [ignore, type, masterId] = con.pathname.match socketPrefix
            if type == 'create' then new MasterHandler().setConnection con
            else new SlaveHandler().setConnection con, masterId
        .installHandlers(http_server)
      http_server.listen(port, '0.0.0.0')
      masters

    module.exports = {
      startServer
    }
