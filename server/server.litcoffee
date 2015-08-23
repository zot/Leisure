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
    masterPrefix = '/Leisure/master'
    slavePrefix = '/Leisure/slave[^/]*'

Thanks to [Broofa's stackoverflow post](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105074#105074) for guid code.

    s4 = ->
      bytes = crypto.randomBytes 2
      n = (bytes[0] + (bytes[1] << 8)).toString(16)
      while n.length < 4
        n = '0' + n
      n

    guid = -> "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"

    class MessageHandler
      setConnection: (@con)->
        @id = guid()
        @con.leisure = this
        @con.on 'data', (msg)=> @handleMessage JSON.parse msg
        @con.on 'close', => @closed()
        @send type: 'connect', id: @id
      type: 'Unknown Handler'
      close: -> @con.close()
      closed: ->
      send: (msg)-> @con.write JSON.stringify msg

Handle a message from the connected browser

      handleMessage: (msg)->
        console.log "#{@type} received: #{JSON.stringify msg}"
        if msg.type?.toLowerCase() in @legalMessages
          this[msg.type](msg)
          @send type: 'close'
        else @send badMsgTypeError msg
      legalMessages: ['log']
      log: (msg)-> console.log msg.msg

    class MasterHandler extends MessageHandler
      constructor: ->
        @slaves = {}
      setConnection: (con)->
        super con
        console.log "Master connection: #{con.leisure.id}"
        masters[@id] = this
      addSlave: (slave)-> @slaves[slave.id] = slave
      type: 'Master'
      closed: ->
        console.log "Closed master: #{@con.leisure.id}"
        delete masters[@con.leisure.id]
        for id, slave of @slaves
          slave.close()
      legalMessages: ['log', 'change']
      change: (msg)->

    class SlaveHandler extends MessageHandler
      connectToMaster: (@master)-> 
      type: 'Slave'
      setConnection: (con)->
        super con
        [ignore, masterId] = con.pathname.match(con.prefix)[0].match /.*([0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12})/
        if !(master = masters[masterId])
          @send badMasterIdError masterId
          @close()
        else
          @master.addSlave this
      legalMessages: []

    startServer = (port)->
      http_server = http.createServer()
      sockjs.createServer(
        sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
        prefix: masterPrefix)
        .on 'connection', (con)-> new MasterHandler().setConnection con
        .installHandlers(http_server)
      sockjs.createServer(
        sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
        prefix: slavePrefix)
        .on 'connection', (con)-> new SlaveHandler().setConnection con
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
