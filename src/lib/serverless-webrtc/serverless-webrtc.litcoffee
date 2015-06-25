Converted to AMD and CoffeeScript and sorely hacked based on Chris Ball's example:
[Serverless WebRTC Chat Room](http://cjb.github.io/serverless-webrtc/serverless-webrtc.html)

-- Bill Burdick 2015

    define ['./adapter'], ->
      # See also:
      # http://www.html5rocks.com/en/tutorials/webrtc/basics/
      # https://code.google.com/p/webrtc-samples/source/browse/trunk/apprtc/index.html
      #
      # https://webrtc-demos.appspot.com/html/pc1.html
      cfg = iceServers: [url: "stun:23.21.150.121"]
      con = optional: [DtlsSrtpKeyAgreement: true]

`PeerConnection` starts by creating an ordered connection and configuring its event
handlers.

      class PeerConnection
        start: ->
          if !@offerReady || !@handleMessage then throw new Error "Unconfigured #{@desc}"
          @con = new RTCPeerConnection cfg, con
          @con.onsignalingstatechange = (s)=> @log 'signaling state change: ', s
          @con.oniceconnectionstatechange = (s)=> @log 'ice connection state change: ', s
          @con.onicegatheringstatechange = (s)=> @log 'ice gathering state change: ', s
          @con.onicecandidate = (e)=>
            @log "candidate", e
            if e.candidate == null
              @offerReady @con.localDescription
          @first = true
        log: (msg, args...)-> console.log "#{@desc}: #{msg}", args...
        useOffer: (offerJson)->
          @log "using offer", offerJson
          @con.setRemoteDescription new RTCSessionDescription JSON.parse offerJson
        useChannel: (@chan)->
          @chan.onmessage = (e)=>
            if @first
              @first = false
              if e.data.charCodeAt(0) == 2
                # The first message we get from Firefox (but not Chrome)
                # is literal ASCII 2 and I don't understand why -- if we
                # leave it in, JSON.parse() will barf.
                @log "ignoring message '2'"
                return
            @log "got message", e.data
            @handleMessage e.data
          @chan.onopen = (e)=> @connected()
        connected: (e)-> @log 'data channel connect'
        sendMessage: (msg)-> @chan.send msg
        close: -> @con.close()

`MasterConnection` starts by creating a connection and an offer.

The developer needs to make sure @offerReady() sends this offer to the slave connection,
perhaps by using a common server or by presenting it to the user so they can send it to
another user.

**API**

**You must set handleMessage and offerReady before calling start() (see below)**

- `handleMessage(msg)`: **set** this to handle incoming messages
- `offerReady(offer)`: **set** this to handle when the offer is ready
- `connected(event)`: **optionally set** this to be informed of the connection
- `start(errFunc)`: start
- `establishConnection(slaveAnswerJSON)`: establish the connection using the slave's answer
- `sendMessage(msg)`: use this to send a message
- `close()`: close the connection
- `con`: the RTCPeerConnection

      class MasterConnection extends PeerConnection
        desc: 'Master'
        start: (errFunc)->
          super()
          @useChannel @con.createDataChannel 'test', reliable:true
          @log "created datachannel"
          # this will trigger @con.onicecandidate when it is ready
          @con.createOffer ((desc)=>
            @con.setLocalDescription desc, (->), (->)
          ), errFunc
        establishConnection: (slaveAnswerJSON)->
          @con.setRemoteDescription new RTCSessionDescription JSON.parse slaveAnswerJSON

`SlaveConnection` starts with an existing offer from a master connection on another
peer.  It then creates a counter offer (answer).

The developer needs to make sure @offerReady() sends this counter offer to back to the
master connection, perhaps by using a common server or by presenting it to the user so
they can send it to the master connection's user.

**API**

**You must set handleMessage and offerReady before calling start() (see below)**

- `handleMessage(msg)`: **set** this to handle incoming messages
- `offerReady(offer)`: **set** this to handle when the offer is ready
- `connected(event)`: **optionally set** this to be informed of the connection
- `start(offerJson, errFunc)`: start the connection using an offer from a master
- `sendMessage(msg)`: use this to send a message
- `close()`: close the connection
- `con`: the RTCPeerConnection

      class SlaveConnection extends PeerConnection
        desc: 'Slave'
        start: (offerJson, errFunc)->
          super()
          @con.ondatachannel = (e)=>
            @useChannel e.channel || e // Chrome sends event, FF sends raw channel
            @connected e
          @useOffer offerJson
          # this will trigger @con.onicecandidate when it is ready
          @con.createAnswer ((answerDesc)=>
            @con.setLocalDescription answerDesc, (->), (->)
          ), errFunc

      PeerConnection: PeerConnection
      MasterConnection: MasterConnection
      SlaveConnection: SlaveConnection
