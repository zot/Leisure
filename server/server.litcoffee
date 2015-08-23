SockJS relay server

    sockjs = require 'sockjs'
    sockjsUtil = require 'sockjs/lib/utils'
    http = require 'http'
    crypto = require 'crypto'

    {
      BAD_ID_ERROR
    } = require('requirejs').config(baseUrl: path.dirname(module.filename))('./common')

    masters = {}
    slaves = {}
    masterPrefix = '/Leisure/master[^/]*'
    slavePrefix = '/Leisure/slave[^/]*'

Thanks to [Broofa's stackoverflow post](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105074#105074) for guid code.

    s4 = ->
      bytes = crypto.randomBytes 2
      n = (bytes[0] + (bytes[1] << 8)).toString(16)
      while n.length < 4
        n = '0' + n
      n

    guid = -> "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"

    startServer = (port)->
      http_server = http.createServer()
      sockjs.createServer(
        sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
        prefix: masterPrefix)
        .on 'connection', (con)-> masterConnection con
        .installHandlers(http_server)
      sockjs.createServer(
        sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
        prefix: slavePrefix)
        .on 'connection', (con)-> slaveConnection con
        .installHandlers(http_server)
      http_server.listen(port, '0.0.0.0')

    masterConnection = (con)->
      con.leisure = id: guid()
      masters[con.leisure.id] = con
      console.log "Master connection: #{con.leisure.id}"
      con.write JSON.stringify id: con.leisure.id
      con.on 'data', (msg)->
        console.log "Master message: #{msg}"
        con.write 'pong'
      con.on 'close', ->
        console.log "Closed master: #{con.leisure.id}"
        delete masters[con.leisure.id]

    slaveConnection = (con)->
      [ignore, masterId] = con.pathname.match(con.prefix)[0].match /.*([0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12})/
      console.log "Slave connection to #{masterId}"
      if master = masters[masterId]
        con.leisure =
          master: master
          id: guid()
        con.write JSON.stringify id: con.leisure.id
        con.on 'data', (msg)->
          console.log "Slave message: #{msg}"
          con.write 'pong'
        con.on 'close', ->
          console.log "Closed slave: #{con.leisure.id}"
          delete slaves[con.leisure.id]
      else
        con.write JSON.stringify error: "Bad master Id", code: BAD_ID_ERROR
        con.close()

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
