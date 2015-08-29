SockJS relay server

    sockjs = require 'sockjs'
    sockjsUtil = require 'sockjs/lib/utils'
    http = require 'http'
    crypto = require 'crypto'

    {
      badIdError
      badMsgTypeError
    } = require('requirejs').config(baseUrl: path.dirname(module.filename))('./common')

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
        #console.log "Sending message", msg
        @con.write JSON.stringify msg
      sendError: (msg)->
        msg.type = 'error'
        @send msg
        setTimeout (=> @close()), 1

Handle a message from the connected browser

      handleMessage: (msg)->
        msg.connectionId = @connectionId
        #console.log "#{@type} received: #{JSON.stringify msg}"
        if !(msg.type of @handler)
          console.log "Received bad message #{msg.type}", msg
          @close()
        else @handler[msg.type].call this, msg
      handler:
        log: (msg)-> console.log msg.msg
        replace: (msg)-> @master.relay msg
      sendEcho: -> @send type: 'echo'

    class MasterHandler extends MessageHandler
      constructor: ->
        super()
        @master = this
        @msgCount = 0
        @connectionId = "peer-0"
        @slaves = {}
        @pendingSlaves = {}
        @doc = ''
        @peerCount = 0
      type: 'Master'
      setConnection: (con)->
        masters[@id] = this
        super con
        @send type: 'connect', id: @id, connectionId: @connectionId
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
      relay: (msg)->
        if msg.type == 'replace'
          {start, end, text, connectionId: replId} = msg
          @doc = @doc.substring(0, start) + text + @doc.substring(end)
          if msg.connectionId == @connectionId then @sendEcho()
          else @slaves[replId].sendEcho()
        msg.msgCount = @msgCount++
        if replId != @connectionId then @send msg
        for id, slave of @slaves
          if replId != slave.connectionId then slave.send msg
      handler:
        __proto__: MessageHandler::handler
        initDoc: ({@doc})->
        slaveApproval: ({slaveId, approval})->
          if slave = @pendingSlaves[slaveId]
            delete @pendingSlaves[slaveId]
            if approval
              @slaves[slaveId] = slave
              slave.send type: 'connect', id: @id, connectionId: slave.connectionId, doc: @doc
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
