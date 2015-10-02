Peer-to-peer connection between Leisure instances.  They send "final"
document changes to each other, meaning that all document computations
are complete and only the document changes need be replicated.

    define ['jquery', 'immutable', './editor', './editorSupport', 'sockjs', './advice', './ot'], (jq, immutable, Editor, Support, SockJS, Advice, OperationTransformation)->
      {
        Map
        Set
      } = window.Immutable = immutable
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
        replacementFor
      } = Support
      {
        changeAdvice
        afterMethod
        beforeMethod
        callOriginal
      } = Advice
      {
        SequentialReplacements
        runReplacements
        replacementsString
        sequentialReplacements
        concurrentReplacements
      } = OperationTransformation

      noTrim = true
      #noTrim = false

      diag = (args...)-> console.log args...

Peer is the top-level object for a peer-to-peer-capable Leisure instance.

      class Peer
        constructor: ->
          #@data = new HamtOrgData()
          @data = new OrgData()
          @clearChanges()
          @pendingReplaces = []
          @pendingCount = 0
          @unreplacements = []
          @batchCallbacks = []
          @version = -1
          @successiveChanges = 0
          @lastReplace = null
          @localChangeLimit = 3
          @replacementAckLimit = 5
          @incomingReplacementCount = 0
          @connectionCount = 0
          @newConnectionFunc = ->
          #docSnap and solo are only for diagnostics!
          @docSnap = null
          @solo = true
          @history = []
        clearChanges: ->
          @incomingReplaces = []
        setEditor: (@editor)->
        disconnect: ->
          @con?.close()
          @con = null
        subsumesIncoming: (cur, next)->
          next.mine && (!cur ||
          next.pendingCount > (cur.pendingCount ? -1) ||
          (!cur.pendingCount? && next.messageCount > cur.messageCount))
        replayHistory: (items)->
          #oldH = @history
          @history = []
          for item, i in items
            [type, msg] = _.pairs(item)[0]
            if type == 'incoming' then @handleMessage msg
            else if type == 'outgoing'
              {start, end, text} = msg
              @localReplace msg
              @data.replaceText start, end, text
            else if type == 'trimVersions' then @handleMessage msg
          #@history = oldH
        dumpReplay: ->
          console.log "PEER.replayHistory(#{JSON.stringify @history})"
        rollback: ->
          for repl in @unreplacements by -1
            #@logReplacement "VER U ", repl.start, repl.end, repl.text
            @data.replaceText repl.start, repl.end, repl.text
          @unreplacements = []
        applyIncomingChanges: (changes)->
          myPos = -1
          myLatest = null
          myLast = _.last @pendingReplaces
          reps = changes || @incomingReplaces.concat @pendingReplaces
          #reps = changes || @incomingReplaces
          if @solo && !changes && @docSnap? then seq = new SequentialReplacements()
          preserveSelection (range)=>
            @rollback()
            runReplacements reps, (start, end, text, cookies, node)=>
              @pushUnreplacement start, end, text
              @logReplacement "#{@nodeLabel node} R ", start, end, text
              if @solo && !changes && @docSnap? then seq.replace {start, end, text}
              try
                @data.replaceText start, end, text
              catch err
                console.log err
              if !changes
                for inRepl in cookies
                  if inRepl == myLast || (inRepl != myLast && @subsumesIncoming myLatest, inRepl)
                    myPos = start + text.length
                    myLatest = inRepl
                if end <= range.start
                  range.start += text.length - end + start
                else if start <= range.start < end
                  range.start = start + text.length
            if @solo && !changes && @docSnap?
              bounds = seq.finalBounds()
              if (exp = @docSnap.substring(bounds.start, bounds.end)) != (act = @data.getDocSubstring(bounds.start, bounds.end))
                console.log "BAD REPLACEMENT, EXPECTED:\n#{exp.replace /$/, '$'}\n BUT GOT:\n#{act.replace /$/, '$'}"
                console.log "REPLACEMENT DUMP FOLLOWS...\n#{replacementsString reps}"
                console.log "Replacements:", reps
            if myPos > -1
              range.start = myPos
              range.length = 0
        nodeLabel: (node)->
          hasPending = false
          hasIncoming = false
          for op in node.activeOperations ? [node]
            for cookie in op.cookies
              if op.pendingCount then hasPending = true
              else hasIncoming = true
          if hasIncoming && hasPending then "P/I"
          else if hasIncoming then "IN "
          else "PEN"
        connect: (@url, @connectedFunc)->
          @con = new SockJS @url
          @con.onmessage = (msg)=> @handleMessage JSON.parse msg.data
          @con.onclose = => @closed()
          peer = this
          changeAdvice @editor.options, true,
            editBlocks: p2p: (parent)=> (blocks, start, length, newContent, select)=>
              @editingReplacement = {
                blocks
                start: @data.offsetForBlock(blocks[0]) + start
                length
                text: newContent
              }
              parent blocks, start, length, newContent, select
              @editingReplacement = null
            changesFor: p2p: (parent)->(first, oldBlocks, newBlocks)->
              changes = parent first, oldBlocks, newBlocks
              peer.sendReplace changes
              changes
            batchReplace: p2p: (parent)->(replacementsFunc, contFunc, errFunc)->
              peer.runBatchReplace replacementsFunc, contFunc, errFunc
        type: 'Unknown Handler'
        close: ->
          console.log "CLOSING: #{@type}"
          @con.close()
        closed: ->
          changeAdvice @editor.options, false,
            changesFor: p2p: true
        send: (type, msg)->
          msg.type = type
          msg.knownVersion = @lastReplace?.messageCount ? @version
          #diag "SEND #{JSON.stringify msg}"
          @con.send JSON.stringify msg
        runBatchReplace: (replacementsFunc, contFunc, errFunc)->
          #try
          #  replacements = validateBatch replacementsFunc()
          #  msg = type: 'conditionalReplace', replacements: replacements, targetVersion: @version
          #  @pendingReplaces.push msg
          #  pushedReplaces = true
          #  @batchCallbacks.push
          #    cont: contFunc
          #    error: errFunc
          #    replay: => @runBatchReplace replacementsFunc, contFunc, errFunc
          #  pushedCallbacks = true
          #  @send 'conditionalReplace', msg
          #catch err
          #  if pushedReplaces then @pendingReplaces.pop()
          #  if pushedCallbacks then @batchCallbacks.pop()
          #  errFunc err
        sendReplace: ({oldBlocks, newBlocks})->
          #batch and throttle at one send every 100-125 millis
          @incomingReplacementCount = 0
          offset = @data.offsetForBlock oldBlocks[0]
          repl = if @editingReplacement
            start = @editingReplacement.start
            start: start
            end: start + @editingReplacement.length
            text: @editingReplacement.text
          else replacementFor offset, blockText(oldBlocks), blockText(newBlocks)
          repl.type = 'replace'
          repl.version = @version
          repl.connectionId = @connectionId
          @send 'replace', repl
          @localReplace repl
        localReplace: (repl)->
          if @history then @history.push outgoing: repl
          @pushUnreplacement repl.start, repl.end, repl.text
          @logReplacement "OUT R ", repl.start, repl.end, repl.text
          @pendingReplaces.push newRepl = _.merge (connectionId: @connectionId, mine: true, pendingCount: ++@pendingCount), repl
          if @solo && @docSnap?
            @docSnap = @docSnap.substring(0, repl.start) + repl.text + @docSnap.substring repl.end
        logReplacement: (label, start, end, text)->
          #diag "#{label} #{start} '#{@data.getDocSubstring start, end}' -> '#{text}'"
        pushUnreplacement: (start, end, text)->
          #if !@unreplacements.length then @docSnap = @data.getText()
          @unreplacements.push
            start: start
            end: start + text.length
            text: @data.getDocSubstring start, end
        handleMessage: (msg)->
          msg.mine = msg.connectionId == @connectionId || msg.type == 'echo'
          #diag "RECEIVE #{JSON.stringify msg}"
          if !(msg.type of @handler)
            console.log "Received bad message #{msg.type}", msg
            @close()
          else @handler[msg.type].call this, msg
        handler:
          log: (msg)-> console.log msg.msg
          connect: (msg)->
            {@id, @connectionId, @version} = msg
            @clearChanges()
            #diag "Connected, id: #{@id}"
            @connectedFunc?(this)
            @connectedFunc = null
          connections: ({count})->
            @connectionCount = count
            @newConnectionFunc count
          error: (msg)->
            console.log "Received error: #{msg.error}", msg
            @close()
          rejectChange: ->
            #@pendingReplaces.shift()
            #@batchCallbacks.pop().replay()
          Xecho: (msg)->
            if @history then @history.push incoming: msg
            pending = @pendingReplaces.shift()
            pending.messageCount = msg.messageCount
            #pending.version = @version
            #if pending.type == 'conditionalReplace'
            #  try
            #    @replaceBatch pending.replacements
            #    @batchCallbacks.pop().cont()
            #  catch err
            #    @batchCallbacks.pop().error(err)
            #else
            @handleMessage pending
          echo: (msg)->
            if @history then @history.push incoming: msg
            pending = @pendingReplaces.shift()
            pending.messageCount = msg.messageCount
            #pending.version = @version
            #if pending.type == 'conditionalReplace'
            #  try
            #    @replaceBatch pending.replacements
            #    @batchCallbacks.pop().cont()
            #  catch err
            #    @batchCallbacks.pop().error(err)
            #else
            @handleMessage pending
          conditionalReplace: ({replacements, version})->
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
          replace: (msg)->
            if @history && !msg.mine then @history.push incoming: msg
            if msg.connectionId != @connectionId
              @solo = false
              @docSnap = null
            if @successiveChanges < 2 && msg.mine && (!@lastReplace || @lastReplace.mine)
              @successiveChanges++
            else
              @version = msg.messageCount
              @successiveChanges = 0
            if !msg.mine && ++@incomingReplacementCount > @replacementAckLimit
              @incomingReplacementCount = 0
              @send 'ack', version: msg.messageCount
            @lastReplace = msg
            @incomingReplaces.push msg
            @applyIncomingChanges()
          XtrimVersions: (msg)->
            {version} = msg
            console.log "TRIM VERSIONS: #{version}"
            for op, pos in @incomingReplaces
              if op.version >= version then break
              #if op.messageCount >= version then break
              #if op.messageCount > version then break
            #if pos > 0 && @incomingReplaces[pos - 1].messageCount < version
            minKnownVersion = _.reduce @incomingReplaces.slice(pos),
              ((a, el)-> Math.min a, el.knownVersion),
              @incomingReplaces[pos - 1].messageCount
            for op, pos in @incomingReplaces
              if op.messageCount >= minKnownVersion then break
            if pos > 0 && @incomingReplaces[pos - 1].version < version
              if @history then @history.push trimVersions: msg
              preserveSelection =>
                console.log "TRIMMING #{pos} versions"
                @applyIncomingChanges @incomingReplaces.slice(0, pos)
                @unreplacements = []
                @incomingReplaces = @incomingReplaces.slice pos
                if @incomingReplaces.length then @applyIncomingChanges()
              @version = Math.max @version, version
          trimVersions: (msg)->
            if noTrim then return
            {version} = msg
            console.log "TRIM VERSIONS: #{version}"
            for op, pos in @incomingReplaces
              if op.version >= version then break
            if pos > 0
              if @history then @history.push trimVersions: msg
              preserveSelection =>
                console.log "TRIMMING #{pos} versions"
                @applyIncomingChanges @incomingReplaces.slice(0, pos)
                @unreplacements = []
                repls = runReplacements @incomingReplaces.concat(@pendingReplaces), (->), version
                @incomingReplaces = _.filter repls, (r)-> r.messageCount?
                if @incomingReplaces.length then @applyIncomingChanges()
              @version = Math.max @version, version
        replaceBatch: (replacements)->
          @data.batchReplace replacements
        createSession: (@host, @connectedFunc, @newConnectionFunc)->
          @type = 'Master'
          @newConnectionFunc = @newConnectionFunc ? ->
          @handler =
            __proto__: Peer::handler
            connect: (msg)->
              @newConnectionFunc 1
              @connectUrl = new URL("slave-#{msg.id}", @url)
              Peer::handler.connect.call this, msg
              @send 'initDoc', doc: @data.getText()
              @docSnap = @data.getText()
            slaveConnect: (msg)->
              @send 'slaveApproval', slaveId: msg.slaveId, approval: true
            slaveDisconnect: (msg)->
          @connect "http://#{@host}/Leisure/master", @connectedFunc
          @docSnap = @data.getText()
        connectToSession: (@url, connected, @newConnectionFunc)->
          @type = 'Slave'

          @newConnectionFunc = @newConnectionFunc ? ->
          @handler =
            __proto__: Peer::handler
            connect: (msg)->
              Peer::handler.connect.call this, msg
              @editor.options.load msg.doc
              @docSnap = msg.doc
          @connect @url, connected

      $(document).ready ->
        if document.location.search.length > 1 && !connected
          connected = true
          #{join} = getDocumentParams()
          #if join
          #  setTimeout (->
          #    createSessionButton = $(editorToolbar window.PEER.editor.node).find('[name=p2pConnector] [name=createSession]')
          #    createSessionButton.data hasSession: true
          #    createSessionButton.closest('.contents').removeClass 'not-connected'
          #    createSessionButton.closest('.contents').addClass 'connected'
          #    createSessionButton.button 'option', 'label', 'Disconnect'
          #    console.log "CREATE SESSION:", createSessionButton[0]
          #    u = new URL join
          #    console.log "JOIN SESSION: #{u}"
          #    window.PEER.connectToSession u.toString()), 1


      Peer::test = (count)->
        v = count = count ? 0
        @handleMessage testMsg 63, 63, 'a', v, ++count
        #@handleMessage testMsg 59, 59, 'a', v, ++count

      testMsg = (start, end, text, version, messageCount)-> {
        start
        end
        text
        version
        messageCount
        type: 'replace'
        connectionId: 'test-peer'
        mine: false
      }

      Peer::testReplay = ->
        @replayHistory @testHistory
        console.log "Rotator should be 43, not 33"

      Peer::dumpHistory = (n, hist)->
        if typeof hist == 'string' then hist = JSON.parse hist
        else if !hist then hist = @history
        dump = "      Peer::testReplay#{n} = ->\n        replay = => @replayHistory ["
        for repl in hist
          dump += "\n          #{pretty repl},"
        dump += '\n        ]\n        if !@con\n          Leisure.createSession document.location.host || "localhost:8080", replay\n        else replay()'
        console.log dump

      pretty = (obj)->
        if _.isArray obj
          '[{'+(item for item in obj).join(', ')+']'
        else if typeof obj == 'object'
          '{'+("#{key}: #{pretty obj[key]}" for key in _.sortBy _.keys(obj)).join(', ')+'}'
        else JSON.stringify obj

      Peer::testHistory = [
        {incoming: {start: 31, end: 31, text: "a", type: "replace", version: 0, connectionId: "peer-1", messageCount: 2, mine: false, knownVersion: 0}},
        {outgoing: {start: 169, end: 170, text: "3", type: "replace", version: 2, connectionId: "peer-0", knownVersion: 2}},
        {incoming: {start: 32, end: 32, text: "s", type: "replace", version: 0, connectionId: "peer-1", messageCount: 3, mine: false, knownVersion: 0}},
        {incoming: {type: "echo", version: 0, connectionId: "peer-0", messageCount: 4}},
      ]

      Peer::testReplay2 = ->
        replay = => @replayHistory [
          {outgoing: {start: 13, end: 13, text: "a", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}}, 
          {incoming: {type: "echo", version: 0, connectionId: "peer-0", messageCount: 1}}, 
          {outgoing: {start: 14, end: 14, text: "s", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 1}}, 
          {incoming: {type: "echo", version: 0, connectionId: "peer-0", messageCount: 2}}, 
          {outgoing: {start: 15, end: 15, text: "d", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 2}}, 
          {incoming: {type: "echo", version: 0, connectionId: "peer-0", messageCount: 4}}, 
          {outgoing: {start: 16, end: 16, text: "a", type: "replace", version: 4, connectionId: "peer-0", knownVersion: 4}}, 
          {incoming: {type: "echo", version: 4, connectionId: "peer-0", messageCount: 6}}, 
          {outgoing: {start: 17, end: 17, text: "s", type: "replace", version: 4, connectionId: "peer-0", knownVersion: 6}}, 
          {outgoing: {start: 18, end: 18, text: "d", type: "replace", version: 4, connectionId: "peer-0", knownVersion: 6}}, 
          {incoming: {type: "echo", version: 4, connectionId: "peer-0", messageCount: 8}}, 
          {incoming: {type: "echo", version: 4, connectionId: "peer-0", messageCount: 9}}
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay3 = ->
        replay = => @replayHistory [
          {outgoing: {start: 168, end: 169, text: "4", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}},
          {outgoing: {start: 168, end: 169, text: "3", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}},
          {outgoing: {start: 167, end: 169, text: "37", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}},
          {outgoing: {start: 168, end: 169, text: "0", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}},
          {outgoing: {start: 167, end: 169, text: "24", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}},
          {outgoing: {start: 168, end: 169, text: "3", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}},
          {incoming: {type: "echo", version: 0, messageCount: 2, mine: true}},
          {outgoing: {start: 168, end: 169, text: "2", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 2}},
          {incoming: {type: "echo", version: 0, messageCount: 3, mine: true}},
          {outgoing: {start: 168, end: 169, text: "0", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 3}},
          {incoming: {type: "echo", version: 0, messageCount: 4, mine: true}},
          {incoming: {type: "echo", version: 0, messageCount: 5, mine: true}},
          {incoming: {start: 30, end: 30, text: "a", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 6, mine: false}},
          {outgoing: {start: 168, end: 170, text: "11", type: "replace", version: 6, connectionId: "peer-0", knownVersion: 6}},
          {incoming: {type: "echo", version: 0, messageCount: 7, mine: true}},
          {outgoing: {start: 168, end: 170, text: "9", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 7}},
          {incoming: {type: "echo", version: 0, messageCount: 8, mine: true}},
          {outgoing: {start: 168, end: 169, text: "8", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 8}},
          {outgoing: {start: 168, end: 169, text: "-1", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 8}},
          {incoming: {type: "echo", version: 0, messageCount: 9, mine: true}},
          {outgoing: {start: 169, end: 170, text: "2", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 9}},
          {incoming: {type: "echo", version: 0, messageCount: 10, mine: true}},
          {outgoing: {start: 169, end: 170, text: "5", type: "replace", version: 10, connectionId: "peer-0", knownVersion: 10}},
          {outgoing: {start: 169, end: 170, text: "10", type: "replace", version: 10, connectionId: "peer-0", knownVersion: 10}},
          # (danger) looks OK
          {incoming: {start: 31, end: 31, text: "s", type: "replace", version: 3, connectionId: "peer-1", knownVersion: 3, messageCount: 12, mine: false}},
          {incoming: {type: "echo", version: 0, messageCount: 13, mine: true}},
          {incoming: {type: "echo", version: 0, messageCount: 14, mine: true}},
          {incoming: {type: "echo", version: 0, messageCount: 15, mine: true}},
          {incoming: {type: "echo", version: 0, messageCount: 16, mine: true}},
          # (danger) looks OK
          {incoming: {start: 32, end: 32, text: "f", type: "replace", version: 8, connectionId: "peer-1", knownVersion: 8, messageCount: 18, mine: false}},
          {incoming: {type: "echo", version: 0, messageCount: 19, mine: true}},
          {incoming: {type: "echo", version: 0, messageCount: 20, mine: true}},
          # danger
          #{incoming: {start: 33, end: 33, text: "a", type: "replace", version: 9, connectionId: "peer-1", knownVersion: 9, messageCount: 22, mine: false}},
          #{incoming: {type: "echo", version: 0, messageCount: 23, mine: true}},
          #{incoming: {start: 34, end: 34, text: "s", type: "replace", version: 12, connectionId: "peer-1", knownVersion: 12, messageCount: 25, mine: false}},
          #{incoming: {start: 35, end: 35, text: "f", type: "replace", version: 13, connectionId: "peer-1", knownVersion: 13, messageCount: 26, mine: false}},
          #{incoming: {start: 36, end: 36, text: "d", type: "replace", version: 13, connectionId: "peer-1", knownVersion: 13, messageCount: 27, mine: false}},
          #{incoming: {start: 37, end: 37, text: "a", type: "replace", version: 18, connectionId: "peer-1", knownVersion: 18, messageCount: 28, mine: false}},
          #{incoming: {start: 38, end: 38, text: "s", type: "replace", version: 18, connectionId: "peer-1", knownVersion: 18, messageCount: 29, mine: false}},
          #{incoming: {start: 39, end: 39, text: "d", type: "replace", version: 18, connectionId: "peer-1", knownVersion: 18, messageCount: 30, mine: false}},
          #{incoming: {start: 40, end: 40, text: "d", type: "replace", version: 18, connectionId: "peer-1", knownVersion: 18, messageCount: 31, mine: false}},
          #{incoming: {start: 41, end: 41, text: "f", type: "replace", version: 23, connectionId: "peer-1", knownVersion: 23, messageCount: 34, mine: false}}
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay4 = ->
        replay = => @replayHistory [
          {outgoing: {start: 168, end: 169, text: "4", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}}, 
          {incoming: {start: 30, end: 30, text: "a", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 2, mine: false}}, 
          {outgoing: {start: 169, end: 170, text: "1", type: "replace", version: 2, connectionId: "peer-0", knownVersion: 2}}, 
          {incoming: {start: 31, end: 31, text: "s", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 3, mine: false}}, 
          #{outgoing: {start: 169, end: 171, text: "23", type: "replace", version: 3, connectionId: "peer-0", knownVersion: 3}}, 
          #{incoming: {start: 32, end: 32, text: "d", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 4, mine: false}}, 
          #{outgoing: {start: 170, end: 172, text: "12", type: "replace", version: 4, connectionId: "peer-0", knownVersion: 4}}, 
          #{incoming: {start: 33, end: 33, text: "f", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 5, mine: false}}, 
          #{outgoing: {start: 171, end: 173, text: "-3", type: "replace", version: 5, connectionId: "peer-0", knownVersion: 5}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 6, mine: true}}, 
          #{outgoing: {start: 172, end: 173, text: "12", type: "replace", version: 6, connectionId: "peer-0", knownVersion: 6}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 7, mine: true}}, 
          #{outgoing: {start: 173, end: 174, text: "7", type: "replace", version: 6, connectionId: "peer-0", knownVersion: 7}}, 
          #{incoming: {start: 34, end: 34, text: "a", type: "replace", version: 4, connectionId: "peer-1", knownVersion: 4, messageCount: 8, mine: false}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 10, mine: true}}, 
          #{incoming: {start: 36, end: 36, text: "s", type: "replace", version: 4, connectionId: "peer-1", knownVersion: 5, messageCount: 11, mine: false}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 13, mine: true}}, 
          #{incoming: {start: 37, end: 37, text: "f", type: "replace", version: 6, connectionId: "peer-1", knownVersion: 6, messageCount: 14, mine: false}}, 
          #{incoming: {start: 38, end: 38, text: "d", type: "replace", version: 6, connectionId: "peer-1", knownVersion: 6, messageCount: 15, mine: false}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 17, mine: true}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 19, mine: true}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 20, mine: true}}, 
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay5 = ->
        replay = => @replayHistory [
          {outgoing: {start: 168, end: 169, text: "4", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}}, 
          {outgoing: {start: 168, end: 169, text: "1", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0}}, 
          {incoming: {start: 30, end: 30, text: "a", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 2, mine: false}}, 
          {outgoing: {start: 168, end: 169, text: "1", type: "replace", version: 2, connectionId: "peer-0", knownVersion: 2}}, 
          {outgoing: {start: 168, end: 170, text: "2", type: "replace", version: 2, connectionId: "peer-0", knownVersion: 2}}, 
          {incoming: {type: "echo", version: 0, messageCount: 3, mine: true}}, 
          #{outgoing: {start: 167, end: 169, text: "-8", type: "replace", version: 3, connectionId: "peer-0", knownVersion: 3}}, 
          #{outgoing: {start: 168, end: 169, text: "9", type: "replace", version: 3, connectionId: "peer-0", knownVersion: 3}}, 
          #{incoming: {start: 31, end: 31, text: "d", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 4, mine: false}}, 
          # bad
          #{incoming: {type: "echo", version: 0, messageCount: 5, mine: true}}, 
          #{incoming: {start: 32, end: 32, text: "s", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 6, mine: false}}, 
          #{incoming: {start: 33, end: 33, text: "f", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 7, mine: false}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 8, mine: true}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 9, mine: true}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 10, mine: true}}, 
          #{incoming: {type: "echo", version: 0, messageCount: 11, mine: true}}, 
          #{incoming: {start: 41, end: 41, text: "s", type: "replace", version: 11, connectionId: "peer-1", knownVersion: 11, messageCount: 13, mine: false}}, 
          #{incoming: {start: 42, end: 42, text: "f", type: "replace", version: 11, connectionId: "peer-1", knownVersion: 11, messageCount: 14, mine: false}}, 
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay6 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 168, text: "4", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 167, text: "36", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 167, text: "22", type: "replace", version: 0}},
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 0, messageCount: 2, mine: false, start: 30, text: "a", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 2, start: 168, text: "16", type: "replace", version: 2}},
          {incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 169, knownVersion: 3, start: 167, text: "12", type: "replace", version: 3}},
          #{incoming: {connectionId: "peer-1", end: 31, knownVersion: 0, messageCount: 4, mine: false, start: 31, text: "s", type: "replace", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 171, knownVersion: 4, start: 169, text: "4", type: "replace", version: 4}},
          #{outgoing: {connectionId: "peer-0", end: 170, knownVersion: 4, start: 169, text: "-2", type: "replace", version: 4}},
          #{incoming: {connectionId: "peer-1", end: 32, knownVersion: 0, messageCount: 5, mine: false, start: 32, text: "d", type: "replace", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 172, knownVersion: 5, start: 171, text: "8", type: "replace", version: 5}},
          #{incoming: {messageCount: 6, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 172, knownVersion: 6, start: 171, text: "15", type: "replace", version: 6}},
          #{incoming: {messageCount: 7, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 173, knownVersion: 7, start: 172, text: "6", type: "replace", version: 6}},
          #{incoming: {connectionId: "peer-1", end: 33, knownVersion: 0, messageCount: 8, mine: false, start: 33, text: "f", type: "replace", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 174, knownVersion: 8, start: 173, text: "7", type: "replace", version: 8}},
          #{incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 174, knownVersion: 9, start: 173, text: "9", type: "replace", version: 9}},
          #{incoming: {messageCount: 10, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 11, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 173, knownVersion: 11, start: 171, text: "-31", type: "replace", version: 9}},
          #{incoming: {messageCount: 12, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 34, knownVersion: 8, messageCount: 14, mine: false, start: 34, text: "a", type: "replace", version: 8}},
          #{incoming: {connectionId: "peer-1", end: 35, knownVersion: 8, messageCount: 15, mine: false, start: 35, text: "s", type: "replace", version: 8}},
          #{incoming: {connectionId: "peer-1", end: 36, knownVersion: 8, messageCount: 16, mine: false, start: 36, text: "d", type: "replace", version: 8}},
          #{incoming: {messageCount: 18, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 37, knownVersion: 9, messageCount: 19, mine: false, start: 37, text: "f", type: "replace", version: 9}},
          #{incoming: {messageCount: 21, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 38, knownVersion: 10, messageCount: 22, mine: false, start: 38, text: "a", type: "replace", version: 10}},
      ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay7 = ->
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 0, messageCount: 2, mine: false, start: 30, text: "a", type: "replace", version: 0}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 0, messageCount: 3, mine: false, start: 31, text: "s", type: "replace", version: 0}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 0, messageCount: 4, mine: false, start: 32, text: "d", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 4, start: 171, text: "4", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 4, start: 171, text: "1", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 4, start: 171, text: "0", type: "replace", version: 4}},
          {incoming: {connectionId: "peer-1", end: 33, knownVersion: 2, messageCount: 5, mine: false, start: 33, text: "f", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 5, start: 171, text: "38", type: "replace", version: 5}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 5, start: 172, text: "7", type: "replace", version: 5}},
          {incoming: {messageCount: 6, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 6, start: 172, text: "4", type: "replace", version: 6}},
          {incoming: {connectionId: "peer-1", end: 34, knownVersion: 4, messageCount: 8, mine: false, start: 34, text: "a", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 174, knownVersion: 8, start: 173, text: "0", type: "replace", version: 8}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 174, knownVersion: 9, start: 172, text: "19", type: "replace", version: 9}},
          {incoming: {connectionId: "peer-1", end: 35, knownVersion: 4, messageCount: 10, mine: false, start: 35, text: "s", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 175, knownVersion: 10, start: 174, text: "6", type: "replace", version: 10}},
          {incoming: {messageCount: 11, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 175, knownVersion: 11, start: 174, text: "3", type: "replace", version: 11}},
          {incoming: {messageCount: 12, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 175, knownVersion: 12, start: 174, text: "1", type: "replace", version: 11}},
          {incoming: {messageCount: 13, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 175, knownVersion: 13, start: 173, text: "8", type: "replace", version: 11}},
          {outgoing: {connectionId: "peer-0", end: 174, knownVersion: 13, start: 173, text: "4", type: "replace", version: 11}},
          {incoming: {connectionId: "peer-1", end: 37, knownVersion: 5, messageCount: 15, mine: false, start: 37, text: "f", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 175, knownVersion: 15, start: 174, text: "-1", type: "replace", version: 15}},
          {incoming: {messageCount: 16, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 176, knownVersion: 16, start: 175, text: "5", type: "replace", version: 16}},
          {incoming: {messageCount: 17, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 176, knownVersion: 17, start: 175, text: "6", type: "replace", version: 16}},
          {incoming: {messageCount: 18, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 176, knownVersion: 18, start: 175, text: "9", type: "replace", version: 16}},
          {incoming: {messageCount: 19, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 176, knownVersion: 19, start: 175, text: "3", type: "replace", version: 19}},
          {incoming: {connectionId: "peer-1", end: 42, knownVersion: 12, messageCount: 21, mine: false, start: 42, text: "a", type: "replace", version: 12}},
          #{incoming: {messageCount: 23, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 25, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 44, knownVersion: 15, messageCount: 26, mine: false, start: 44, text: "s", type: "replace", version: 15}},
          #{incoming: {connectionId: "peer-1", end: 45, knownVersion: 15, messageCount: 27, mine: false, start: 45, text: "f", type: "replace", version: 15}},
          #{incoming: {messageCount: 29, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 46, knownVersion: 15, messageCount: 30, mine: false, start: 46, text: "d", type: "replace", version: 15}},
          #{incoming: {messageCount: 31, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 33, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 47, knownVersion: 17, messageCount: 34, mine: false, start: 47, text: "a", type: "replace", version: 17}},
          #{incoming: {connectionId: "peer-1", end: 48, knownVersion: 17, messageCount: 35, mine: false, start: 48, text: "s", type: "replace", version: 17}},
          #{incoming: {messageCount: 37, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 49, knownVersion: 18, messageCount: 38, mine: false, start: 49, text: "d", type: "replace", version: 18}},
          #{incoming: {connectionId: "peer-1", end: 50, knownVersion: 18, messageCount: 39, mine: false, start: 50, text: "f", type: "replace", version: 18}},
          #{incoming: {messageCount: 41, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 43, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 44, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 52, knownVersion: 21, messageCount: 46, mine: false, start: 52, text: "a", type: "replace", version: 21}},
          #{incoming: {connectionId: "peer-1", end: 53, knownVersion: 21, messageCount: 47, mine: false, start: 53, text: "s", type: "replace", version: 21}},
          #{incoming: {connectionId: "peer-1", end: 54, knownVersion: 21, messageCount: 48, mine: false, start: 54, text: "d", type: "replace", version: 21}},
          #{incoming: {connectionId: "peer-1", end: 55, knownVersion: 21, messageCount: 49, mine: false, start: 55, text: "f", type: "replace", version: 21}},
          #{incoming: {connectionId: "peer-1", end: 58, knownVersion: 30, messageCount: 50, mine: false, start: 58, text: "a", type: "replace", version: 30}},
          #{incoming: {connectionId: "peer-1", end: 59, knownVersion: 30, messageCount: 51, mine: false, start: 59, text: "s", type: "replace", version: 30}},
          #{incoming: {connectionId: "peer-1", end: 60, knownVersion: 31, messageCount: 52, mine: false, start: 60, text: "d", type: "replace", version: 31}},
          #{incoming: {connectionId: "peer-1", end: 61, knownVersion: 31, messageCount: 53, mine: false, start: 61, text: "f", type: "replace", version: 31}},
          #{incoming: {connectionId: "peer-1", end: 65, knownVersion: 37, messageCount: 56, mine: false, start: 65, text: "a", type: "replace", version: 37}},
          #{incoming: {connectionId: "peer-1", end: 66, knownVersion: 37, messageCount: 57, mine: false, start: 66, text: "s", type: "replace", version: 37}},
          #{incoming: {connectionId: "peer-1", end: 69, knownVersion: 39, messageCount: 60, mine: false, start: 69, text: "d", type: "replace", version: 38}},
          #{incoming: {connectionId: "peer-1", end: 70, knownVersion: 39, messageCount: 61, mine: false, start: 70, text: "f", type: "replace", version: 38}},
          #{incoming: {connectionId: "peer-1", end: 71, knownVersion: 41, messageCount: 63, mine: false, start: 71, text: "s", type: "replace", version: 41}},
          #{incoming: {connectionId: "peer-1", end: 72, knownVersion: 41, messageCount: 64, mine: false, start: 72, text: "a", type: "replace", version: 41}},
          #{incoming: {connectionId: "peer-1", end: 73, knownVersion: 41, messageCount: 65, mine: false, start: 73, text: "d", type: "replace", version: 41}},
          #{incoming: {connectionId: "peer-1", end: 74, knownVersion: 43, messageCount: 67, mine: false, start: 74, text: "a", type: "replace", version: 43}},
          #{incoming: {connectionId: "peer-1", end: 75, knownVersion: 43, messageCount: 68, mine: false, start: 75, text: "s", type: "replace", version: 43}},
          #{incoming: {connectionId: "peer-1", end: 76, knownVersion: 43, messageCount: 69, mine: false, start: 76, text: "d", type: "replace", version: 43}},
          #{incoming: {connectionId: "peer-1", end: 77, knownVersion: 44, messageCount: 71, mine: false, start: 77, text: "f", type: "replace", version: 44}},
          #{incoming: {connectionId: "peer-1", end: 82, knownVersion: 49, messageCount: 73, mine: false, start: 82, text: "s", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 83, knownVersion: 49, messageCount: 74, mine: false, start: 83, text: "a", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 84, knownVersion: 49, messageCount: 75, mine: false, start: 84, text: "f", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 85, knownVersion: 49, messageCount: 76, mine: false, start: 85, text: "d", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 86, knownVersion: 49, messageCount: 77, mine: false, start: 86, text: "a", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 87, knownVersion: 49, messageCount: 78, mine: false, start: 87, text: "s", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 88, knownVersion: 49, messageCount: 79, mine: false, start: 88, text: "d", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 89, knownVersion: 49, messageCount: 80, mine: false, start: 89, text: "f", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 90, knownVersion: 49, messageCount: 81, mine: false, start: 90, text: "a", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 91, knownVersion: 49, messageCount: 82, mine: false, start: 91, text: "s", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 92, knownVersion: 49, messageCount: 83, mine: false, start: 92, text: "f", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 93, knownVersion: 49, messageCount: 84, mine: false, start: 93, text: "d", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 94, knownVersion: 49, messageCount: 85, mine: false, start: 94, text: "s", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 95, knownVersion: 49, messageCount: 86, mine: false, start: 95, text: "a", type: "replace", version: 49}},
          #{incoming: {connectionId: "peer-1", end: 96, knownVersion: 49, messageCount: 87, mine: false, start: 96, text: "f", type: "replace", version: 49}},
      ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay8 = ->
        @connectionId = 'peer-1'
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-1", end: 30, knownVersion: 0, start: 30, text: "a", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-1", end: 31, knownVersion: 0, start: 31, text: "s", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-1", end: 32, knownVersion: 0, start: 32, text: "d", type: "replace", version: 0}},
          {incoming: {messageCount: 2, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-1", end: 33, knownVersion: 2, start: 33, text: "f", type: "replace", version: 0}},
          #{incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 4, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-1", end: 34, knownVersion: 4, start: 34, text: "a", type: "replace", version: 4}},
          # bad
          #{outgoing: {connectionId: "peer-1", end: 35, knownVersion: 4, start: 35, text: "s", type: "replace", version: 4}},
          #{incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-1", end: 37, knownVersion: 5, start: 37, text: "f", type: "replace", version: 4}},
          #{incoming: {connectionId: "peer-0", end: 172, knownVersion: 4, messageCount: 6, mine: false, start: 171, text: "4", type: "replace", version: 4}},
          #{incoming: {messageCount: 8, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-0", end: 172, knownVersion: 4, messageCount: 9, mine: false, start: 171, text: "1", type: "replace", version: 4}},
          #{incoming: {messageCount: 10, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-0", end: 172, knownVersion: 4, messageCount: 11, mine: false, start: 171, text: "0", type: "replace", version: 4}},
          #{incoming: {connectionId: "peer-0", end: 173, knownVersion: 5, messageCount: 12, mine: false, start: 171, text: "38", type: "replace", version: 5}},
          #{outgoing: {connectionId: "peer-1", end: 42, knownVersion: 12, start: 42, text: "a", type: "replace", version: 12}},
          #{incoming: {connectionId: "peer-0", end: 173, knownVersion: 5, messageCount: 13, mine: false, start: 172, text: "7", type: "replace", version: 5}},
          #{incoming: {messageCount: 15, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-1", end: 44, knownVersion: 15, start: 44, text: "s", type: "replace", version: 15}},
          #{outgoing: {connectionId: "peer-1", end: 45, knownVersion: 15, start: 45, text: "f", type: "replace", version: 15}},
          #{outgoing: {connectionId: "peer-1", end: 46, knownVersion: 15, start: 46, text: "d", type: "replace", version: 15}},
          #{incoming: {connectionId: "peer-0", end: 173, knownVersion: 6, messageCount: 16, mine: false, start: 172, text: "4", type: "replace", version: 6}},
          #{incoming: {connectionId: "peer-0", end: 174, knownVersion: 8, messageCount: 17, mine: false, start: 173, text: "0", type: "replace", version: 8}},
          #{outgoing: {connectionId: "peer-1", end: 47, knownVersion: 17, start: 47, text: "a", type: "replace", version: 17}},
          #{outgoing: {connectionId: "peer-1", end: 48, knownVersion: 17, start: 48, text: "s", type: "replace", version: 17}},
          #{incoming: {connectionId: "peer-0", end: 174, knownVersion: 9, messageCount: 18, mine: false, start: 172, text: "19", type: "replace", version: 9}},
          #{outgoing: {connectionId: "peer-1", end: 49, knownVersion: 18, start: 49, text: "d", type: "replace", version: 18}},
          #{outgoing: {connectionId: "peer-1", end: 50, knownVersion: 18, start: 50, text: "f", type: "replace", version: 18}},
          #{incoming: {connectionId: "peer-0", end: 175, knownVersion: 10, messageCount: 19, mine: false, start: 174, text: "6", type: "replace", version: 10}},
          #{incoming: {messageCount: 21, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-1", end: 52, knownVersion: 21, start: 52, text: "a", type: "replace", version: 21}},
          #{outgoing: {connectionId: "peer-1", end: 53, knownVersion: 21, start: 53, text: "s", type: "replace", version: 21}},
          #{outgoing: {connectionId: "peer-1", end: 54, knownVersion: 21, start: 54, text: "d", type: "replace", version: 21}},
          #{outgoing: {connectionId: "peer-1", end: 55, knownVersion: 21, start: 55, text: "f", type: "replace", version: 21}},
          #{incoming: {connectionId: "peer-0", end: 175, knownVersion: 11, messageCount: 23, mine: false, start: 174, text: "3", type: "replace", version: 11}},
          #{incoming: {connectionId: "peer-0", end: 175, knownVersion: 12, messageCount: 25, mine: false, start: 174, text: "1", type: "replace", version: 11}},
          #{incoming: {messageCount: 26, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 27, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-0", end: 175, knownVersion: 13, messageCount: 29, mine: false, start: 173, text: "8", type: "replace", version: 11}},
          #{incoming: {messageCount: 30, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-1", end: 58, knownVersion: 30, start: 58, text: "a", type: "replace", version: 30}},
          #{outgoing: {connectionId: "peer-1", end: 59, knownVersion: 30, start: 59, text: "s", type: "replace", version: 30}},
          #{incoming: {connectionId: "peer-0", end: 174, knownVersion: 13, messageCount: 31, mine: false, start: 173, text: "4", type: "replace", version: 11}},
          #{outgoing: {connectionId: "peer-1", end: 60, knownVersion: 31, start: 60, text: "d", type: "replace", version: 31}},
          #{outgoing: {connectionId: "peer-1", end: 61, knownVersion: 31, start: 61, text: "f", type: "replace", version: 31}},
          #{incoming: {connectionId: "peer-0", end: 175, knownVersion: 15, messageCount: 33, mine: false, start: 174, text: "-1", type: "replace", version: 15}},
          #{incoming: {messageCount: 34, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 35, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-0", end: 176, knownVersion: 16, messageCount: 37, mine: false, start: 175, text: "5", type: "replace", version: 16}},
          #{outgoing: {connectionId: "peer-1", end: 65, knownVersion: 37, start: 65, text: "a", type: "replace", version: 37}},
          #{outgoing: {connectionId: "peer-1", end: 66, knownVersion: 37, start: 66, text: "s", type: "replace", version: 37}},
          #{incoming: {messageCount: 38, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 39, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-1", end: 69, knownVersion: 39, start: 69, text: "d", type: "replace", version: 38}},
          #{outgoing: {connectionId: "peer-1", end: 70, knownVersion: 39, start: 70, text: "f", type: "replace", version: 38}},
          #{incoming: {connectionId: "peer-0", end: 176, knownVersion: 17, messageCount: 41, mine: false, start: 175, text: "6", type: "replace", version: 16}},
          #{outgoing: {connectionId: "peer-1", end: 71, knownVersion: 41, start: 71, text: "s", type: "replace", version: 41}},
          #{outgoing: {connectionId: "peer-1", end: 72, knownVersion: 41, start: 72, text: "a", type: "replace", version: 41}},
          #{outgoing: {connectionId: "peer-1", end: 73, knownVersion: 41, start: 73, text: "d", type: "replace", version: 41}},
          #{incoming: {connectionId: "peer-0", end: 176, knownVersion: 18, messageCount: 43, mine: false, start: 175, text: "9", type: "replace", version: 16}},
          #{outgoing: {connectionId: "peer-1", end: 74, knownVersion: 43, start: 74, text: "a", type: "replace", version: 43}},
          #{outgoing: {connectionId: "peer-1", end: 75, knownVersion: 43, start: 75, text: "s", type: "replace", version: 43}},
          #{outgoing: {connectionId: "peer-1", end: 76, knownVersion: 43, start: 76, text: "d", type: "replace", version: 43}},
          #{incoming: {connectionId: "peer-0", end: 176, knownVersion: 19, messageCount: 44, mine: false, start: 175, text: "3", type: "replace", version: 19}},
          #{outgoing: {connectionId: "peer-1", end: 77, knownVersion: 44, start: 77, text: "f", type: "replace", version: 44}},
          #{incoming: {messageCount: 46, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 47, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 48, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 49, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-1", end: 82, knownVersion: 49, start: 82, text: "s", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 83, knownVersion: 49, start: 83, text: "a", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 84, knownVersion: 49, start: 84, text: "f", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 85, knownVersion: 49, start: 85, text: "d", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 86, knownVersion: 49, start: 86, text: "a", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 87, knownVersion: 49, start: 87, text: "s", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 88, knownVersion: 49, start: 88, text: "d", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 89, knownVersion: 49, start: 89, text: "f", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 90, knownVersion: 49, start: 90, text: "a", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 91, knownVersion: 49, start: 91, text: "s", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 92, knownVersion: 49, start: 92, text: "f", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 93, knownVersion: 49, start: 93, text: "d", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 94, knownVersion: 49, start: 94, text: "s", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 95, knownVersion: 49, start: 95, text: "a", type: "replace", version: 49}},
          #{outgoing: {connectionId: "peer-1", end: 96, knownVersion: 49, start: 96, text: "f", type: "replace", version: 49}},
          #{incoming: {messageCount: 50, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 51, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 52, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 53, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 56, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 57, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 60, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 61, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 63, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 64, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 65, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 67, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 68, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 69, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 71, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 73, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 74, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 75, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 76, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 77, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 78, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 79, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 80, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 81, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 82, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 83, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 84, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 85, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 86, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 87, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay9 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 9, knownVersion: 0, start: 9, text: "a", type: "replace", version: 0}},
          {incoming: {messageCount: 1, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 10, knownVersion: 1, start: 10, text: "s", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 11, knownVersion: 1, start: 11, text: "d", type: "replace", version: 0}},
          {incoming: {messageCount: 2, mine: true, type: "echo", version: 0}},
          {incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 12, knownVersion: 3, start: 12, text: "f", type: "replace", version: 3}},
          {outgoing: {connectionId: "peer-0", end: 13, knownVersion: 3, start: 13, text: ";", type: "replace", version: 3}},
          {outgoing: {connectionId: "peer-0", end: 14, knownVersion: 3, start: 14, text: "l", type: "replace", version: 3}},
          {trimVersions: {messageCount: 4, mine: false, type: "trimVersions", version: 3}},
          {incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 15, knownVersion: 5, start: 15, text: "k", type: "replace", version: 3}},
          {incoming: {messageCount: 6, mine: true, type: "echo", version: 0}},
          {incoming: {messageCount: 7, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 16, knownVersion: 7, start: 16, text: "j", type: "replace", version: 7}},
          {trimVersions: {messageCount: 8, mine: false, type: "trimVersions", version: 5}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay10 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 9, knownVersion: 0, start: 9, text: "a", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 10, knownVersion: 0, start: 10, text: "s", type: "replace", version: 0}},
          {incoming: {messageCount: 1, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 11, knownVersion: 1, start: 11, text: "d", type: "replace", version: 0}},
          {incoming: {messageCount: 2, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 12, knownVersion: 2, start: 12, text: "f", type: "replace", version: 0}},
          {incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 13, knownVersion: 3, start: 13, text: ";", type: "replace", version: 3}},
          {trimVersions: {messageCount: 4, mine: false, type: "trimVersions", version: 2}},
          {incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 14, knownVersion: 5, start: 14, text: "l", type: "replace", version: 2}},
          {outgoing: {connectionId: "peer-0", end: 15, knownVersion: 5, start: 15, text: "k", type: "replace", version: 2}},
          {trimVersions: {messageCount: 6, mine: false, type: "trimVersions", version: 3}},
          #{incoming: {messageCount: 7, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 16, knownVersion: 7, start: 16, text: "j", type: "replace", version: 3}},
          #{outgoing: {connectionId: "peer-0", end: 17, knownVersion: 7, start: 17, text: "a", type: "replace", version: 3}},
          #bad
          #{trimVersions: {messageCount: 8, mine: false, type: "trimVersions", version: 5}},
          #{incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 10, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 17, knownVersion: 10, start: 17, text: "s", type: "replace", version: 9}},
          #{outgoing: {connectionId: "peer-0", end: 18, knownVersion: 10, start: 18, text: "d", type: "replace", version: 9}},
          #{outgoing: {connectionId: "peer-0", end: 19, knownVersion: 10, start: 19, text: "f", type: "replace", version: 9}},
          #{trimVersions: {messageCount: 11, mine: false, type: "trimVersions", version: 7}},
          #{incoming: {messageCount: 12, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 13, mine: true, type: "echo", version: 0}},
          #{trimVersions: {messageCount: 14, mine: false, type: "trimVersions", version: 10}},
          #{incoming: {messageCount: 15, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 16, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 17, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay11 = ->
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 0, messageCount: 2, mine: false, start: 30, text: "a", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 2, start: 169, text: "4", type: "replace", version: 2}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 0, messageCount: 3, mine: false, start: 31, text: "s", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 3, start: 170, text: "1", type: "replace", version: 3}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 0, messageCount: 4, mine: false, start: 32, text: "f", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 4, start: 170, text: "29", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 4, start: 171, text: "2", type: "replace", version: 4}},
          {incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 5, start: 170, text: "18", type: "replace", version: 5}},
          {incoming: {messageCount: 6, mine: true, type: "echo", version: 0}},
          {trimVersions: {messageCount: 7, mine: false, type: "trimVersions", version: 3}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 6, start: 171, text: "6", type: "replace", version: 5}},
          {incoming: {connectionId: "peer-1", end: 33, knownVersion: 4, messageCount: 8, mine: false, start: 33, text: "a", type: "replace", version: 4}},
          {trimVersions: {messageCount: 9, mine: false, type: "trimVersions", version: 4}},
          #{incoming: {messageCount: 10, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 11, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 34, knownVersion: 5, messageCount: 12, mine: false, start: 34, text: "s", type: "replace", version: 5}},
          # bad
          #{trimVersions: {messageCount: 13, mine: false, type: "trimVersions", version: 5}},
          #{incoming: {messageCount: 14, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 35, knownVersion: 6, messageCount: 15, mine: false, start: 35, text: "f", type: "replace", version: 6}},
          #{trimVersions: {messageCount: 16, mine: false, type: "trimVersions", version: 6}},
          #{incoming: {messageCount: 17, mine: true, type: "echo", version: 0}},
          #{incoming: {connectionId: "peer-1", end: 36, knownVersion: 12, messageCount: 18, mine: false, start: 36, text: "a", type: "replace", version: 12}},
          #{incoming: {connectionId: "peer-1", end: 37, knownVersion: 14, messageCount: 19, mine: false, start: 37, text: "s", type: "replace", version: 14}},
          #{incoming: {connectionId: "peer-1", end: 38, knownVersion: 15, messageCount: 20, mine: false, start: 38, text: "f", type: "replace", version: 15}},
          #{trimVersions: {messageCount: 21, mine: false, type: "trimVersions", version: 15}},
          #{trimVersions: {messageCount: 22, mine: false, type: "trimVersions", version: 17}},
          #{incoming: {connectionId: "peer-1", end: 39, knownVersion: 17, messageCount: 23, mine: false, start: 39, text: "a", type: "replace", version: 17}},
          #{incoming: {connectionId: "peer-1", end: 40, knownVersion: 17, messageCount: 24, mine: false, start: 40, text: "s", type: "replace", version: 17}},
          #{incoming: {connectionId: "peer-1", end: 41, knownVersion: 17, messageCount: 25, mine: false, start: 41, text: "f", type: "replace", version: 17}},
          #{trimVersions: {messageCount: 26, mine: false, type: "trimVersions", version: 18}},
          #{incoming: {connectionId: "peer-1", end: 42, knownVersion: 18, messageCount: 27, mine: false, start: 42, text: "a", type: "replace", version: 18}},
          #{incoming: {connectionId: "peer-1", end: 43, knownVersion: 18, messageCount: 28, mine: false, start: 43, text: "s", type: "replace", version: 18}},
          #{incoming: {connectionId: "peer-1", end: 44, knownVersion: 18, messageCount: 29, mine: false, start: 44, text: "f", type: "replace", version: 18}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay12 = ->
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 0, messageCount: 2, mine: false, start: 30, text: "a", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 2, start: 169, text: "4", type: "replace", version: 2}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 0, messageCount: 3, mine: false, start: 31, text: "s", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 3, start: 170, text: "3", type: "replace", version: 3}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 0, messageCount: 4, mine: false, start: 32, text: "d", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 4, start: 170, text: "37", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 4, start: 170, text: "2", type: "replace", version: 4}},
          {incoming: {connectionId: "peer-1", end: 33, knownVersion: 0, messageCount: 5, mine: false, start: 33, text: "f", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 5, start: 171, text: "19", type: "replace", version: 5}},
          {incoming: {messageCount: 6, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 6, start: 172, text: "6", type: "replace", version: 6}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 6, start: 172, text: "5", type: "replace", version: 6}},
          {incoming: {connectionId: "peer-1", end: 34, knownVersion: 4, messageCount: 7, mine: false, start: 34, text: "a", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 7, start: 172, text: "", type: "replace", version: 7}},
          {trimVersions: {messageCount: 8, mine: false, type: "trimVersions", version: 3}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          {incoming: {connectionId: "peer-1", end: 35, knownVersion: 5, messageCount: 10, mine: false, start: 35, text: "s", type: "replace", version: 4}},
          {incoming: {connectionId: "peer-1", end: 36, knownVersion: 5, messageCount: 11, mine: false, start: 36, text: "d", type: "replace", version: 4}},
          {trimVersions: {messageCount: 12, mine: false, type: "trimVersions", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 175, knownVersion: 11, start: 174, text: "4", type: "replace", version: 11}},
          {incoming: {messageCount: 13, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 175, knownVersion: 13, start: 174, text: "6", type: "replace", version: 13}},
          {incoming: {connectionId: "peer-1", end: 37, knownVersion: 5, messageCount: 14, mine: false, start: 37, text: "f", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 176, knownVersion: 14, start: 175, text: "13", type: "replace", version: 14}},
          {incoming: {messageCount: 15, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 177, knownVersion: 15, start: 176, text: "9", type: "replace", version: 15}},
          {trimVersions: {messageCount: 16, mine: false, type: "trimVersions", version: 5}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay13 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 168, text: "4", type: "replace", version: 0}},
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 0, messageCount: 2, mine: false, start: 30, text: "a", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 2, start: 169, text: "3", type: "replace", version: 2}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 0, messageCount: 3, mine: false, start: 31, text: "s", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 3, start: 169, text: "37", type: "replace", version: 3}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 3, start: 170, text: "0", type: "replace", version: 3}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 0, messageCount: 4, mine: false, start: 32, text: "d", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 4, start: 170, text: "22", type: "replace", version: 4}},
          {incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 5, start: 171, text: "0", type: "replace", version: 5}},
          {incoming: {connectionId: "peer-1", end: 33, knownVersion: 0, messageCount: 6, mine: false, start: 33, text: "f", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 6, start: 171, text: "11", type: "replace", version: 6}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 6, start: 171, text: "9", type: "replace", version: 6}},
          {incoming: {messageCount: 7, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 7, start: 171, text: "4", type: "replace", version: 7}},
          {incoming: {messageCount: 8, mine: true, type: "echo", version: 0}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 172, knownVersion: 9, start: 171, text: "2", type: "replace", version: 7}},
          {trimVersions: {messageCount: 10, mine: false, type: "trimVersions", version: 3}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay14 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 168, text: "4", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 168, text: "3", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 168, text: "0", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 167, text: "38", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 0, start: 168, text: "7", type: "replace", version: 0}},
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 0, messageCount: 2, mine: false, start: 30, text: "a", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 2, start: 169, text: "6", type: "replace", version: 2}},
          {incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 3, start: 169, text: "4", type: "replace", version: 3}},
          {incoming: {messageCount: 4, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 4, start: 169, text: "3", type: "replace", version: 3}},
          {incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 5, start: 169, text: "0", type: "replace", version: 3}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 0, messageCount: 6, mine: false, start: 31, text: "s", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 6, start: 169, text: "27", type: "replace", version: 6}},
          {incoming: {messageCount: 7, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 7, start: 170, text: "6", type: "replace", version: 7}},
          {incoming: {messageCount: 8, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 8, start: 170, text: "4", type: "replace", version: 7}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 3, messageCount: 10, mine: false, start: 32, text: "f", type: "replace", version: 3}},
          {trimVersions: {messageCount: 11, mine: false, type: "trimVersions", version: 3}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay15 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 30, knownVersion: 0, start: 30, text: "a", type: "replace", version: 0}},
          {incoming: {messageCount: 1, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 31, knownVersion: 1, start: 31, text: "s", type: "replace", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 32, knownVersion: 1, start: 32, text: "d", type: "replace", version: 0}},
          {incoming: {messageCount: 2, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 33, knownVersion: 3, start: 33, text: "f", type: "replace", version: 3}},
          #{incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay16 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 1, start: 168, text: "4", type: "replace", version: 1}},
          {incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 3, start: 168, text: "1", type: "replace", version: 1}},
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 3, start: 167, text: "34", type: "replace", version: 1}},
          {incoming: {messageCount: 4, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay17 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 9, knownVersion: 1, start: 9, text: "a", type: "replace", version: 1}},
          {incoming: {messageCount: 2, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 10, knownVersion: 2, start: 10, text: "s", type: "replace", version: 1}},
          {outgoing: {connectionId: "peer-0", end: 11, knownVersion: 2, start: 11, text: "d", type: "replace", version: 1}},
          {incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          #{incoming: {messageCount: 4, mine: true, type: "echo", version: 0}},
          #{outgoing: {connectionId: "peer-0", end: 12, knownVersion: 4, start: 12, text: "f", type: "replace", version: 4}},
          #{trimVersions: {messageCount: 5, mine: false, type: "trimVersions", version: 4}},
          #{incoming: {messageCount: 6, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay18 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 9, knownVersion: 1, start: 9, text: "a", type: "replace", version: 1}},
          {incoming: {messageCount: 2, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 10, knownVersion: 2, start: 10, text: "s", type: "replace", version: 1}},
          {incoming: {messageCount: 3, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 11, knownVersion: 3, start: 11, text: "d", type: "replace", version: 1}},
          {trimVersions: {messageCount: 4, mine: false, type: "trimVersions", version: 3}},
          {incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 12, knownVersion: 5, start: 12, text: "f", type: "replace", version: 5}},
          {trimVersions: {messageCount: 6, mine: false, type: "trimVersions", version: 5}},
          {incoming: {messageCount: 7, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 13, knownVersion: 7, start: 13, text: "a", type: "replace", version: 5}},
          {trimVersions: {messageCount: 8, mine: false, type: "trimVersions", version: 7}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 14, knownVersion: 9, start: 14, text: "s", type: "replace", version: 7}},
          {trimVersions: {messageCount: 10, mine: false, type: "trimVersions", version: 9}},
          {incoming: {messageCount: 11, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 15, knownVersion: 11, start: 15, text: "d", type: "replace", version: 11}},
          {trimVersions: {messageCount: 12, mine: false, type: "trimVersions", version: 11}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay19 = ->
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 1, lockedDelta: 0, messageCount: 3, mine: false, start: 30, text: "a", type: "replace", version: 1}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 3, lockedDelta: 0, messageCount: 4, mine: false, start: 31, text: "s", type: "replace", version: 1}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 4, lockedDelta: 0, messageCount: 5, mine: false, start: 32, text: "d", type: "replace", version: 1}},
          {incoming: {connectionId: "peer-1", end: 33, knownVersion: 4, lockedDelta: 0, messageCount: 6, mine: false, start: 33, text: "f", type: "replace", version: 1}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 6, start: 172, text: "4", type: "replace", version: 6}},
          {trimVersions: {messageCount: 7, mine: false, type: "trimVersions", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 6, start: 172, text: "3", type: "replace", version: 6}},
          {incoming: {messageCount: 8, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 8, start: 171, text: "37", type: "replace", version: 8}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 9, start: 171, text: "29", type: "replace", version: 8}},
          {incoming: {messageCount: 10, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 10, start: 171, text: "16", type: "replace", version: 8}},
          {trimVersions: {messageCount: 11, mine: false, type: "trimVersions", version: 8}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 10, start: 171, text: "8", type: "replace", version: 8}},
          {incoming: {connectionId: "peer-1", end: 34, knownVersion: 9, lockedDelta: 0, messageCount: 12, mine: false, start: 34, text: "a", type: "replace", version: 9}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 12, start: 172, text: "5", type: "replace", version: 12}},
          {trimVersions: {messageCount: 13, mine: false, type: "trimVersions", version: 9}},
          {outgoing: {connectionId: "peer-0", end: 173, knownVersion: 12, start: 171, text: "2", type: "replace", version: 12}},
          {incoming: {messageCount: 14, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay20 = ->
        noTrim = true
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 1, messageCount: 3, mine: false, start: 30, text: "a", type: "replace", version: 1}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 3, start: 169, text: "4", type: "replace", version: 3}},
          {incoming: {messageCount: 4, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 4, start: 169, text: "1", type: "replace", version: 4}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 4, messageCount: 5, mine: false, start: 31, text: "f", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 5, start: 170, text: "0", type: "replace", version: 5}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 5, start: 169, text: "34", type: "replace", version: 5}},
          {incoming: {messageCount: 7, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 7, start: 169, text: "27", type: "replace", version: 7}},
          {incoming: {messageCount: 8, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 8, start: 170, text: "6", type: "replace", version: 7}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 9, start: 169, text: "1", type: "replace", version: 7}},
          {incoming: {messageCount: 10, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 10, start: 170, text: "3", type: "replace", version: 10}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 10, start: 169, text: "5", type: "replace", version: 10}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 9, messageCount: 12, mine: false, start: 32, text: "a", type: "replace", version: 9}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay21 = ->
        replay = => @replayHistory [
          {outgoing: {connectionId: "peer-0", end: 169, knownVersion: 1, start: 168, text: "4", type: "replace", version: 1}},
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 1, messageCount: 3, mine: false, start: 30, text: "a", type: "replace", version: 1}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 3, start: 169, text: "1", type: "replace", version: 3}},
          {incoming: {messageCount: 4, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 4, start: 168, text: "16", type: "replace", version: 4}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 4, start: 168, text: "8", type: "replace", version: 4}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 3, messageCount: 5, mine: false, start: 31, text: "s", type: "replace", version: 1}},
          {outgoing: {connectionId: "peer-0", end: 170, knownVersion: 5, start: 169, text: "-1", type: "replace", version: 5}},
          {incoming: {messageCount: 6, mine: true, type: "echo", version: 0}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 4, messageCount: 7, mine: false, start: 32, text: "d", type: "replace", version: 4}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay22 = ->
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", end: 30, knownVersion: 1, messageCount: 3, mine: false, start: 30, text: "a", type: "replace", version: 1}},
          {incoming: {connectionId: "peer-1", end: 31, knownVersion: 3, messageCount: 4, mine: false, start: 31, text: "s", type: "replace", version: 1}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 4, start: 170, text: "4", type: "replace", version: 4}},
          {incoming: {messageCount: 5, mine: true, type: "echo", version: 0}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 5, start: 170, text: "3", type: "replace", version: 5}},
          {outgoing: {connectionId: "peer-0", end: 171, knownVersion: 5, start: 169, text: "34", type: "replace", version: 5}},
          {incoming: {connectionId: "peer-1", end: 32, knownVersion: 4, messageCount: 7, mine: false, start: 32, text: "d", type: "replace", version: 1}},
          {incoming: {connectionId: "peer-1", end: 33, knownVersion: 4, messageCount: 8, mine: false, start: 33, text: "f", type: "replace", version: 1}},
          {incoming: {messageCount: 9, mine: true, type: "echo", version: 0}},
          {incoming: {messageCount: 10, mine: true, type: "echo", version: 0}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      {
        Peer
      }
