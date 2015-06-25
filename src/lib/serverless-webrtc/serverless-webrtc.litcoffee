Converted to AMD and CoffeeScript and sorely hacked based on Chris Ball's example:
[Serverless WebRTC Chat Room](http://cjb.github.io/serverless-webrtc/serverless-webrtc.html)

-- Bill Burdick 2015

    define ['adapter'], ->

      # See also:
      # http://www.html5rocks.com/en/tutorials/webrtc/basics/
      # https://code.google.com/p/webrtc-samples/source/browse/trunk/apprtc/index.html
      #
      # https://webrtc-demos.appspot.com/html/pc1.html
      cfg = iceServers: [url: "stun:23.21.150.121"]
      con = optional: [DtlsSrtpKeyAgreement: true]

      class Peer
        constructor: ->
          @con = new RTCPeerConnection cfg, con
          @con.onsignalingstatechange = (s)-> @log 'signaling state change: ', s
          @con.oniceconnectionstatechange = (s)-> @log 'ice connection state change: ', s
          @con.onicegatheringstatechange = (s)-> @log 'ice gathering state change: ', s
          @con.onicecandidate = (e)=>
            @log "candidate", e
            if e.candidate == null
              @offerReady @con.localDescription
        log: (msg, args...)-> console.log "#{@desc}: #{msg}", args...
        useOffer: (offerJson)->
          @log "using offer", offerJson
          @con.setRemoteDescription new RTCSessionDescription JSON.parse offerJson
        configChannel: (@chan)->
          @chan.onmessage = (e)->
            if e.data.charCodeAt(0) == 2
              # The first message we get from Firefox (but not Chrome)
              # is literal ASCII 2 and I don't understand why -- if we
              # leave it in, JSON.parse() will barf.
              @log "ignoring message '2'"
              return
            @log "got message", e.data
            @handleMessage JSON.parse(e.data).message
          @chan.onopen = (e)-> @log 'data channel connect'
        handleMessage: (message)->
          @log "received message: #{message}"

      class Master extends Peer
        desc: 'Master'
        createOffer: (cont, err)-> # create the offer
          # this will trigger @con.onicecandidate when it is ready
          @setupDataChannel()
          @con.createOffer ((desc)=>
            @con.setLocalDescription desc, (->), (->)
            cont desc
          ), err
        offerReady: (offer)-> # finished generating the offer, now send it
          @log "offer ready offer: #{JSON.stringify offer}"
          # send offer to slave using server
        setupDataChannel: ->
          try
            @configChannel @con.createDataChannel 'test', reliable:true
            @log "created datachannel"
          catch e then console.warn "#{@desc}: couldn't create data channel", e

      class SlavePeer extends Peer
        constructor: (offerJson)->
        desc: 'Slave'
        prepareSlave: (offerJson)->
          @con.ondatachannel = (e)->
            @configChannel e.channel || e // Chrome sends event, FF sends raw channel
            @log "received datachannel", arguments
          @useOffer offerJson
          @con.createAnswer ((answerDesc)->
            writeToChatLog("Created local answer", "text-success")
            console.log("Created local answer: ", answerDesc)
            @con.setLocalDescription(answerDesc)
          ), (-> console.warn("No answer created"))
        slaveAnswerReady: (desc)->
          console.log "Answer ready: #{JSON.stringify offer}"
          # send answer JSON to master using server
