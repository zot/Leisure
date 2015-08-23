Peer-to-peer connection

    define ['jquery', 'immutable', 'cs!./lib/webrtc.litcoffee', 'lib/cycle', 'cs!./editor.litcoffee', 'cs!./editorSupport.litcoffee', 'sockjs', 'cs!./hamtData.litcoffee'], (jq, immutable, Peer, cycle, Editor, Support, SockJS, HamtData)->
      {
        Map
      } = window.Immutable = immutable
      {
        PeerConnection
        MasterConnection
        SlaveConnection
      } = Peer
      {
        DataStore
        preserveSelection
      } = Editor
      {
        OrgData
      } = Support
      {
        HamtOrgData
      } = HamtData

      class Peer
        constructor: ->
          #@data = new HamtOrgData()
          @data = new OrgData()
        disconnect: ->
          @con?.close()
          @con = null
        createSession: (host, connected)->
          @con = new MasterConnection()
          @con.setConnection this, host, connected
        connectToSession: (host)->
          @con = new SlaveConnection()
          @con.setConnection this, host

      class MessageHandler
        setConnection: (@peer, @host, @connectedFunc)->
          @con = new SockJS "http://#{@host}/Leisure/master"
          @con.onmessage = (msg)=> @handleMessage JSON.parse msg.data
          @con.onclose = => @closed()
        type: 'Unknown Handler'
        close: -> @con.close()
        closed: ->
        send: (type, msg)->
          msg.type = type
          console.log "Sending message", msg
          @con.send JSON.stringify msg
        handleMessage: (msg)->
          console.log "#{@type} received: #{JSON.stringify msg}"
          if msg.type?.toLowerCase() in @legalMessages
            this[msg.type](msg)
          else
            console.log "Received bad message #{msg.type}", msg
            @close()
        legalMessages: ['log', 'connect', 'error']
        log: (msg)-> console.log msg.msg
        connect: (msg)->
          @id = msg.id
          console.log "Connected, id: #{@id}"
          @peer.data.addFilter @filter()
          @connectedFunc? this
          @connectedFunc = null
        error: (msg)->
          console.log "Received error: #{msg.error}", msg
          @close()

      class MasterConnection extends MessageHandler
        type: 'Master'
        filter: ->
          if !@myFilter
            con = this
            @myFilter =
              clear: ->
              replaceBlock: (oldBlock, newBlock)->
                start = con.peer.data.offsetForBlock oldBlock?._id ? newBlock._id
                end = start + (oldBlock?.text.length ? 0)
                text = newBlock.text
                if oldBlock && newBlock
                  # trim common prefix/suffix off of message
                  oldLen = oldBlock.text.length
                  newLen = newBlock.text.length
                  for startOff in [0...Math.min oldLen, newLen]
                    if oldBlock.text[startOff] != newBlock.text[startOff] then break
                  start += startOff
                  for endOff in [0..Math.min oldLen, newLen]
                    if oldBlock.text[oldLen - endOff] != newBlock.text[newLen - endOff] || oldLen - endOff <= startOff || newLen - endOff <= startOff
                      break
                  end -= endOff
                  if startOff || endOff
                    text = text.substring startOff, text.length - endOff
                if start != end || text != ''
                  con.sendReplace start, end, text
          @myFilter
        closed: ->
          console.log "CLOSING MASTER"
          @peer.data.removeFilter @myFilter
          @myFilter = null
          super()
        sendReplace: (start, end, text)->
          @send 'replace', start: start, end: end, text: text
        connect: (msg)->
          @connectUrl = "http://#{@host}/Leisure/slave-#{msg.id}"
          super msg

      {
        Peer
      }
