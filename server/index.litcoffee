Simple server test

    WebSocket = require 'websocket'
    WebSocketServer = WebSocket.server
    http = require 'http'
    server = http.createServer (request, response)->
      console.log 'Received request for ' + request.url
      response.writeHead 400
      response.end

    server.listen 8080, ->
      console.log 'Server is listening on port 8080'

    wsServer = new WebSocketServer
      httpServer: server
      autoAcceptConnections: false

    originIsAllowed = -> true

    wsServer.on 'request', (request)->
      if !originIsAllowed request.origin
        request.reject
        console.log 'Connection from origin ' + request.origin + ' rejected.'
      else
        connection = request.accept 'echo-protocol', request.origin
        console.log 'Connection accepted.'
        connection.on 'message', (message)->
          if message.type == 'utf8'
            console.log 'Received Message: ' + message.utf8Data
            connection.sendUTF 'THIS IS UTF'
          else if message.type == 'binary'
            console.log 'Received Binary Message of ' + message.binaryData.length + ' bytes'
            connection.sendBytes message.binaryData
        connection.on 'close', (reasonCode, description)->
          console.log 'Peer ' + connection.remoteAddress + ' disconnected.'
