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
        validateBatch
      } = Editor
      {
        OrgData
        getDocumentParams
        editorToolbar
        basicDataFilter
      } = Support
      {
        HamtOrgData
      } = HamtData
      {
        changeAdvice
        afterMethod
        callOriginal
      } = Advice

Peer is the top-level object for a peer-to-peer-capable Leisure instance.

      class Peer
        constructor: ->
          @data = new HamtOrgData()
          @clearChanges()
          @dataFilter =
            __proto__: basicDataFilter
            endChange: => @dataFinishedChange
            clear: => @dataClear
            replaceBlock: (data, oldBlock, newBlock)=>
              if !newBlock
                @peerChanges.removes[oldBlock._id] = true
                delete @peerChanges.sets[oldBlock._id]
              else
                delete @peerChanges.removes[newBlock._id]
                @peerChanges.sets[newBlock._id] = true
          @change = -1
        clearChanges: ->
          @changedBlocks = new Set()
          @pendingReplaces = []
          @batchCallbacks = []
          @localChanges =
            sets: {}
            removes: {}
          @peerChanges =
            sets: {}
            removes: {}
        checkPendingData: ->
          if !@hasPendingReplaces() && @changedBlocks.isEmpty()
            @incomingData = @data.snapshot()
            @incomingData.addFilter @dataFilter
        setEditor: (@editor)->
        disconnect: ->
          @con?.close()
          @con = null
        hasPendingReplaces: -> @pendingReplaces.length
        connect: (@url, @connectedFunc)->
          @con = new SockJS @url
          @con.onmessage = (msg)=> @handleMessage JSON.parse msg.data
          @con.onclose = => @closed()
          peer = this
          changeAdvice @editor.options, true,
            changesFor: p2p: (parent)->(first, oldBlocks, newBlocks, verbatim)->
              peer.sendReplace parent first, oldBlocks, newBlocks, verbatim
              peer.recordLocalChange oldBlocks, newBlocks
              null
            batchReplace: p2p: (parent)->(replacementsFunc, contFunc, errFunc)->
              peer.runBatchReplace replacementsFunc, contFunc, errFunc
        type: 'Unknown Handler'
        recordLocalChange: (oldBlocks, newBlocks)->
          newIds = _.indexBy newBlocks, '_id'
          for id of _.indexBy oldBlocks, '_id'
            if !newIds[id]
              @localChanges.removes[id] = true
              delete @localChanges.sets[id]
          for id, block of newIds
            delete @localChanges.removes[id]
            @localChanges.sets[id] = true
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
        runBatchReplace: (replacementsFunc, contFunc, errFunc)->
          try
            replacements = validateBatch replacementsFunc()
            msg = type: 'conditionalReplace', replacements: replacements, targetChange: @change
            @pendingReplaces.push msg
            pushedReplaces = true
            @batchCallbacks.push [contFunc, (=> @runBatchReplace replacementsFunc, contFunc, errFunc), errFunc]
            pushedCallbacks = true
            @send 'conditionalReplace', msg
          catch err
            if pushedReplaces then @pendingReplaces.pop()
            if pushedCallbacks then @batchCallbacks.pop()
            errFunc err
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
            {@id, @connectionId, @change} = msg
            #console.log "Connected, id: #{@id}"
            @connectedFunc?(this)
            @connectedFunc = null
          error: (msg)->
            console.log "Received error: #{msg.error}", msg
            @close()
          rejectChange: ->
            @pendingReplaces.shift()
            @batchCallbacks.pop()[1]()
          echo: (msg)->
            @change = msg.change
            pending = @pendingReplaces.shift()
            if pending.type == 'conditionalReplace'
              try
                @replaceBatch pending.replacements
                @batchCallbacks.pop()[0]()
              catch err
                @batchCallbacks.pop()[2](err)
            else
              pending.connectionId = @connectionId
              pending.change = @change
              @handleMessage pending
          conditionalReplace: ({replacements, @change})->
            preserveSelection (range)=>
              offset = 0
              for repl in replacements
                {start, end} = repl
                start += offset
                end += offset
                if end <= range.start
                  range.start += text.length - end + start
                else if start <= range.start < end
                  range.start = start + text.length
                offset += repl.text.length - repl.end + repl.start
              @replaceBatch replacements
          replace: ({start, end, text, context, connectionId, @change})->
            if context then @editor.options.mergeChangeContext context
            if connectionId == @connectionId
              range = @editor.getSelectedDocRange()
              @replaceText start, end, text
              range.start = start + text.length
              range.length = 0
              @editor.selectDocRange range
            else preserveSelection (range)=>
              if end <= range.start
                range.start += text.length - end + start
              else if start <= range.start < end
                range.start = start + text.length
              @replaceText start, end, text
            @editor.options.clearChangeContext()
        replaceBatch: (replacements)->
          @data.batchReplace replacements
          @incomingData.batchReplace replacements
        replaceText: (start, end, text)->
          @data.replaceText start, end, text
          @incomingData.replaceText start, end, text
        createSession: (@host, @connectedFunc)->
          @checkPendingData()
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
              @clearChanges()
              @checkPendingData()
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
