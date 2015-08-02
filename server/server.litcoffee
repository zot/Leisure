SockJS relay server

    sockjs = require 'sockjs'

Thanks to [Broofa's stackoverflow post](http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/105074#105074)

    s4 = ->
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)

    guid = -> "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"

    startServer = (port, prefix)->
      server = sockjs.createServer
        sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
        prefix: prefix
      connectExp = new RegExp "^#{prefix}/connect/(.*)$"
      http_server = http.createServer()
      server.installHandlers(http_server)
      #addCors http_server, prefix
      http_server.listen(port, '0.0.0.0')
      server
        .on 'connection', (con)->
          console.log "CONNECTION path: #{con.pathname}"
          configureConnection con

    configureConnection = (con)->
      con.write 'ook'
      con.on 'data', (msg)->
        console.log "Message: #{msg}"
        con.write 'pong'

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
    }
