SockJS relay server

    require('source-map-support').install()
    sockjs = require 'sockjs'
    sockjsUtil = require 'sockjs/lib/utils'
    http = require 'http'
    crypto = require 'crypto'
    _ = require './lib/lodash.min'
    requirejs = require('requirejs').config baseUrl: path.dirname(module.filename)

    {
      badIdError
      badMsgTypeError
      disapprovedError
      badVersionError
    } = requirejs './common'
    OT = requirejs './ot'

    masters = {}
    slaves = {}
    socketPrefix = '/Leisure/(master|slave(?:-([^/]*)))'

Thanks to [Broofa's stackoverflow post](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105074#105074) Altered the code to use crypto's random.

    s4 = ->
      bytes = crypto.randomBytes 2
      n = (bytes[0] + (bytes[1] << 8)).toString(16)
      while n.length < 4
        n = '0' + n
      n

    guid = -> "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"

    class MessageHandler
      constructor: ->
        @id = guid()
        @messageCount = 0
      setConnection: (@con)->
        console.log "#{@type} connection: #{@id}"
        @con.leisure = this
        @con.on 'data', (msg)=> @handleMessage JSON.parse msg
        @con.on 'close', => @closed()
      type: 'Unknown Handler'
      close: -> @con.close()
      closed: ->
        console.log "#{@type} closed: #{@id}"
      send: (msg)->
        msg.messageCount = ++@messageCount
        console.log "S    #{JSON.stringify msg}"
        @con.write JSON.stringify msg
      sendError: (msg)->
        msg.type = 'error'
        @send msg
        setTimeout (=> @close()), 1

Handle a message from the connected browser

      handleMessage: (msg)->
        msg.connectionId = @connectionId
        console.log "R    #{JSON.stringify msg}"
        if !(msg.type of @handler)
          console.log "Received bad message #{msg.type}", msg
          @close()
        else @handler[msg.type].call this, msg
      handler:
        log: (msg)-> console.log msg.msg
        replace: (msg)-> @master.relay msg
        conditionalReplace: (msg)->
          if msg.version != @master.version && @master.versionDirty
            @send type: 'rejectChange', targetVersion: msg.targetVersion, version: @version
          else @master.relay msg
        ack: (msg)-> @master.peerAcknowledgedVersion msg
      shouldEcho: (msg)-> isTextMsg(msg) && msg.connectionId == @connectionId

    isTextMsg = (msg)-> msg.type in ['replace', 'conditionalReplace']

    validateBatch = (replacements)->
      replacements = _.sortBy replacements, (x)-> x.start
      last = 0
      for repl in replacements
        if repl.start < last then throw new Error "Attempt to perform overlapping replacements in batch"
        last = repl.end
      replacements

    class MasterHandler extends MessageHandler
      constructor: ->
        super()
        @master = this
        @connectionId = "peer-0"
        @slaves = {}
        @pendingSlaves = {}
        @doc = ''
        @peerCount = 0
        @version = 0
        @nextVersionCallbacks = []
        @pendingVersionAcks = {}
        @remainingVersionAcks = 0
        @versionDirty = false
        @ot = new OT()
      type: 'Master'
      setConnection: (con)->
        masters[@id] = this
        super con
        @send type: 'connect', id: @id, connectionId: @connectionId, version: @version
      addSlave: (slave)->
        slave.connectionId = "peer-#{++@peerCount}"
        @pendingSlaves[slave.connectionId] = slave
        @send type: 'slaveConnect', slaveId: slave.connectionId
      removeSlave: (slave)->
        delete @slaves[slave.connectionId]
        delete @pendingSlaves[slave.connectionId]
        @send type: 'slaveDisconnect', slaveId: slave.connectionId
      closed: ->
        delete masters[@con.leisure.id]
        for id, slave of @slaves
          slave.close()
        @slaves = {}
        super()
      versionClean: -> !@versionDirty && !@remainingVersionAcks
      startVersionInc: ->
        if @versionDirty && !@remainingVersionAcks
          @pendingVersionAcks = _.clone slaves
          @pendingVersionAcks[@connectionId] = this
          @remainingVersionAcks = _.size @pendingVersionAcks
          @broadcast type: 'newVersion', version: @version + 1
      setDoc: (@doc)-> @versionDirty = true
      peerAcknowledgedVersion: (msg)->
        console.log "RECEIVED VERSION ACK"
        if @pendingVersionAcks[msg.connectionId]
          delete @pendingVersionAcks[msg.connectionId]
          @remainingVersionAcks--
          if !@remainingVersionAcks
            @versionDirty = false
            @version++
            console.log "VERSION INC: #{@version}"
            @ot = new OT()
            for cb in @nextVersionCallbacks
              cb()
            @nextVersionCallbacks = []
            if @versionDirty then @startVersionInc()
      connection: (msg)->
        if msg.connectionId == @connectionId then this else @slaves[msg.connectionId]
      upgradeMsg: (msg)->
        offset = @ot.floatFor msg
        msg.start += offset
        msg.end += offset
        msg.version = @version + 1
        msg.upgraded = true
        console.log "PUSH #{JSON.stringify msg}"
        @nextVersionCallbacks.push =>
          console.log "RUN  #{JSON.stringify msg}"
          @relay msg, true
      relay: (msg, suppressVersionInc)->
        if @remainingVersionAcks
          if msg.version == @version
            @upgradeMsg msg
          else if msg.version == @version + 1
            console.log "PUSH #{JSON.stringify msg}"
            @nextVersionCallbacks.push =>
              console.log "RUN  #{JSON.stringify msg}"
              @relay msg, true
          else @sendError badVersionError @version, msg
        else if msg.version != @version
          @sendError badVersionError @version, msg
        else
          if msg.type == 'replace'
            {start, end, text} = msg
            @ot.replace msg
            @setDoc @doc.substring(0, start) + text + @doc.substring end
          else if msg.type == 'conditionalReplace'
            msg.replacements = validateBatch msg.replacements
            offset = 0
            for repl in msg.replacements
              @setDoc = @doc.substring(0, repl.start + offset) + repl.text + @doc.substring repl.end + offset
              offset += repl.text.length - repl.end + repl.start
          @broadcast msg
          if !suppressVersionInc then @startVersionInc()
      sendEchoIfNeeded: (msg)->
        if isTextMsg(msg) && !msg.upgraded && con = @connection msg
          con.send type: 'echo', version: @version
          con
      broadcast: (msg)->
        if (echoer = @sendEchoIfNeeded(msg)) != this then @send msg
        for id, slave of @slaves
          if echoer != slave then slave.send msg
      handler:
        __proto__: MessageHandler::handler
        initDoc: ({@doc})->
        slaveApproval: ({slaveId, approval})->
          if slave = @pendingSlaves[slaveId]
            delete @pendingSlaves[slaveId]
            if approval
              @slaves[slaveId] = slave
              slave.send type: 'connect', id: @id, connectionId: slave.connectionId, doc: @doc, version: @version
            else slave.sendError disapprovedError()

    class SlaveHandler extends MessageHandler
      type: 'Slave'
      setConnection: (con, masterId)->
        if !(@master = masters[masterId])
          @sendError badMasterIdError masterId
        else @master.addSlave this
        super con
      setId: (@id)->
      closed: ->
        @master.removeSlave this
        super()

    startServer = (port)->
      http_server = http.createServer()
      sockjs.createServer(
        sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
        prefix: socketPrefix)
        .on 'connection', (con)->
          [ignore, type, masterId] = con.pathname.match socketPrefix
          if type == 'master' then new MasterHandler().setConnection con
          else new SlaveHandler().setConnection con, masterId
        .installHandlers(http_server)
      http_server.listen(port, '0.0.0.0')

    module.exports = {
      startServer
      guid
    }
