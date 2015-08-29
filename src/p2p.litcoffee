Peer-to-peer connection between Leisure instances.  They send "final"
document changes to each other, meaning that all document computations
are complete and only the document changes need be replicated.

    define ['jquery', 'immutable', 'cs!./lib/webrtc.litcoffee', 'lib/cycle', 'cs!./editor.litcoffee', 'cs!./editorSupport.litcoffee', 'sockjs', 'cs!./hamtData.litcoffee', './lib/fingertree', 'cs!./advice.litcoffee'], (jq, immutable, Peer, cycle, Editor, Support, SockJS, HamtData, Fingertree, Advice)->
      {
        Map
        Set
      } = window.Immutable = immutable
      {
        PeerConnection
        MasterConnection
        SlaveConnection
      } = Peer
      {
        DataStore
        preserveSelection
        blockText
        computeNewStructure
      } = Editor
      {
        OrgData
        getDocumentParams
        editorToolbar
      } = Support
      {
        HamtOrgData
      } = HamtData
      {
        changeAdvice
        callOriginal
      } = Advice

Peer is the top-level object for a peer-to-peer-capable Leisure instance.

      class Peer
        constructor: ->
          @data = new HamtOrgData()
          @changedBlocks = new Set()
          @checkPendingData()
          @pendingReplaces = []
        checkPendingData: ->
          if !@con?.hasPendingReplaces() && @changedBlocks.isEmpty()
            @incomingData = @data.snapshot()
        setEditor: (@editor)->
        disconnect: ->
          @con?.close()
          @con = null
        hasPendingReplaces: -> @pendingReplaces.length
        connect: (@url, @connectedFunc)->
          @con = new SockJS @url
          @con.onmessage = (msg)=> @handleMessage JSON.parse msg.data
          @con.onclose = => @closed()
          handler = this
          changeAdvice @editor.options, true,
            changesFor: p2p: (parent)->(first, oldBlocks, newBlocks, verbatim)->
              handler.sendReplace parent first, oldBlocks, newBlocks, verbatim
              null
        type: 'Unknown Handler'
        close: ->
          console.log "CLOSING: #{@type}"
          @con.close()
        closed: ->
          changeAdvice @editor.options, false,
            changesFor: p2p: true
        send: (type, msg)->
          msg.type = type
          #console.log "Sending message", msg
          @con.send JSON.stringify msg
        sendReplace: ({oldBlocks, newBlocks})->
          #batch and throttle at one send every 100-125 millis
          offset = @data.offsetForBlock oldBlocks[0]
          repl = replacementFor offset, blockText(oldBlocks), blockText(newBlocks)
          repl.context = @editor.options.changeContext
          repl.type = 'replace'
          @pendingReplaces.push repl
          @send 'replace', repl
        handleMessage: (msg)->
          #console.log "#{@type} received: #{JSON.stringify msg}"
          if !(msg.type of @handler)
            console.log "Received bad message #{msg.type}", msg
            @close()
          else @handler[msg.type].call this, msg
        handler:
          log: (msg)-> console.log msg.msg
          connect: (msg)->
            @id = msg.id
            @connectionId = msg.connectionId
            #console.log "Connected, id: #{@id}"
            @connectedFunc?(this)
            @connectedFunc = null
          error: (msg)->
            console.log "Received error: #{msg.error}", msg
            @close()
          echo: (msg)->
            msg = @pendingReplaces.shift()
            msg.connectionId = @connectionId
            @handleMessage msg
          replace: (msg)->
            {start, end, text} = msg
            {blocks} = @data.blockOverlapsForReplacement start, end, text
            offset = @data.blockOffsetForDocOffset(start).offset
            if msg.context
              @editor.options.mergeChangeContext msg.context
            if msg.connectionId == @connectionId
              range = @editor.getSelectedDocRange()
              @replaceContent blocks, offset, end - start, text
              range.start = start + text.length
              range.length = 0
              @editor.selectDocRange range
            else preserveSelection (range)=>
              if end <= range.start
                range.start += text.length - end + start
              else if start <= range.start < end
                range.start = start + text.length
              @replaceContent blocks, offset, end - start, text
        replaceContent: (blocks, start, length, text)->
          oldText = blockText blocks
          newText = oldText.substring(0, start) + text + oldText.substring start + length
          pos = @data.docOffsetForBlockOffset blocks[0]._id, start
          {oldBlocks, newBlocks, offset, prev} = computeNewStructure @data, blocks, newText
          if oldBlocks.length || newBlocks.length
            @data.change @data.changesFor prev, oldBlocks.slice(), newBlocks.slice()

        createSession: (@host, @connectedFunc)->
          @type = 'Master'
          @handler =
            __proto__: Peer::handler
            connect: (msg)->
              @connectUrl = new URL("slave-#{msg.id}", @url)
              Peer::handler.connect.call this, msg
              @send 'initDoc', doc: @data.getText()
            slaveConnect: (msg)->
              @send 'slaveApproval', slaveId: msg.slaveId, approval: true
            slaveDisconnect: (msg)->
          @connect "http://#{@host}/Leisure/master", @connectedFunc
        connectToSession: (@url, connected)->
          @type = 'Slave'
          @handler =
            __proto__: Peer::handler
            connect: (msg)->
              Peer::handler.connect.call this, msg
              @editor.options.load msg.doc
          @connect @url, connected

      replacementFor = (start, oldText, newText)->
        end = start + (oldText.length ? 0)
        for startOff in [0...Math.min oldText.length, newText.length]
          if oldText[startOff] != newText[startOff] then break
        start += startOff
        for endOff in [0..Math.min oldText.length - startOff - 1, newText.length - startOff - 1] by 1
          if oldText[oldText.length - endOff - 1] != newText[newText.length - endOff - 1]
            break
        {
          start
          end: end - endOff
          text: (if startOff || endOff then newText.substring startOff, newText.length - endOff else '')
        }

      $(document).ready ->
        if document.location.search.length > 1 && !connected
          connected = true
          {join} = getDocumentParams()
          if join
            setTimeout (->
              createSessionButton = $(editorToolbar window.PEER.editor.node).find('[name=p2pConnector] [name=createSession]')
              createSessionButton.data hasSession: true
              createSessionButton.closest('.contents').removeClass 'not-connected'
              createSessionButton.closest('.contents').addClass 'connected'
              createSessionButton.button 'option', 'label', 'Disconnect'
              console.log "CREATE SESSION:", createSessionButton[0]
              u = new URL join
              console.log "JOIN SESSION: #{u}"
              window.PEER.connectToSession u.toString()), 1

      {
        Peer
      }
