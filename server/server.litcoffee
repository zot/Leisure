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
      setConnection: (@con)->
        @con.leisure = this
        @con.on 'data', (msg)=> @handleMessage JSON.parse msg
        @con.on 'close', => @closed()
      type: 'Unknown Handler'
      close: -> @con.close()
      closed: ->
      send: (msg)-> @con.write JSON.stringify msg

Handle a message from the connected browser

      handleMessage: (msg)->
        console.log "#{@type} received:", msg
        if msg.type?.toLowerCase() in @legalMessages
          this[msg.type](msg)
        else @send badMsgTypeError msg
      legalMessages: ['log']
      log: (msg)-> console.log msg.msg

    class MasterHandler extends MessageHandler
      constructor: ->
        @slaveCount = 1
        @slaves = {}
      type: 'Master'
      setConnection: (con)->
        super con
        @id = guid()
        console.log "Master connection: #{con.leisure.id}"
        masters[@id] = this
        @send type: 'connect', id: @id
      addSlave: (slave)->
        slaveId = "slave-#{@slaveCount++}"
        @slaves[slaveId] = slave
        slave.setId slaveId
      removeSlave: (slave)-> delete @slaves[slave.id]
      closed: ->
        console.log "Closed master: #{@con.leisure.id}"
        delete masters[@con.leisure.id]
        for id, slave of @slaves
          slave.close()
        @slaves = {}
      legalMessages: ['log', 'replace']
      replace: (msg)->

    class SlaveHandler extends MessageHandler
      type: 'Slave'
      setConnection: (con, masterId)->
        super con
        if !(master = masters[masterId])
          @send badMasterIdError masterId
          @close()
        else
          @master.addSlave this
      setId: (@id)->
      closed: -> @master.removeSlave this
      legalMessages: []

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

    rerequire = (module)->
      removeKey = null
      if module.match /^\.[\/\\]/
        exp = new RegExp "#{module.substring 2}\.js$"
        console.log exp
        for k, v of require.cache
          if (k.match exp) && !k.match /node_modules/
            if removeKey
              console.log "WARNING: More than one module matches #{module}"
              removeKey = null
              break
            removeKey = k
        if removeKey
          delete require.cache[removeKey]
      require module

    module.exports = {
      startServer
      rerequire
      guid
    }
