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
          @dataFilter =
            __proto__: basicDataFilter
            endChange: => @dataFinishedChange
            clear: => @dataClear
            replaceBlock: (data, oldBlock, newBlock)=>
              @recordChange @peerChanges, oldBlock, newBlock
          @version = -1
          @successiveChanges = 0
          @lastReplace = null
          @localChangeLimit = 3
          @replacementAckLimit = 5
          @incomingReplacementCount = 0
          #docSnap is for diagnostic purposes only!
          @docSnap = null
          @solo = true
        clearChanges: ->
          @incomingReplaces = []
        recordChange: (changes, oldBlock, newBlock)->
          if !newBlock
            changes.removes[oldBlock._id] = true
            delete changes.sets[oldBlock._id]
          else
            delete changes.removes[newBlock._id]
            changes.sets[newBlock._id] = true
        recordLocalChanges: (oldBlocks, newBlocks)->
          newIds = _.indexBy newBlocks, '_id'
          for id, block of _.indexBy oldBlocks, '_id'
            if !newIds[id] then @recordChange @localChanges, block, null
          for id, block of newIds
            @recordChange @localChanges, null, block
        setEditor: (@editor)->
        disconnect: ->
          @con?.close()
          @con = null
        subsumesIncoming: (cur, next)->
          next.mine && (!cur ||
          next.pendingCount > (cur.pendingCount ? -1) ||
          (!cur.pendingCount? && next.messageCount > cur.messageCount))
        rollback: (track)->
          if track
            seq = sequentialReplacements(repl for repl in @unreplacements by -1)
            oldText = seq.initialBounds()
            #final = seq.finalBounds()
            oldText.text = @data.getDocSubstring oldText.start, oldText.end
            #console.log "OLD TEXT: #{oldText.text}"
          else oldText = null
          for repl in @unreplacements by -1
            #@logReplacement "VER U ", repl.start, repl.end, repl.text
            @data.replaceText repl.start, repl.end, repl.text
          @unreplacements = []
          #if oldText
          #  expected = @docSnap.substring final.start, final.end
          #  actual = @data.getDocSubstring final.start, final.end
          #  if expected != actual
          #    console.log "BAD UNREPLACEMENT, EXPECTED: #{expected} BUT GOT: #{actual}"
          oldText
        applyIncomingChanges: (changes)->
          myPos = -1
          myLatest = null
          myLast = _.last @pendingReplaces
          reps = changes || @incomingReplaces.concat @pendingReplaces
          preserveSelection (range)=>
            oldText = @rollback @solo
            runReplacements reps, (start, end, text, cookies, node)=>
              @pushUnreplacement start, end, text
              #@logReplacement "#{@nodeLabel node} R ", start, end, text
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
            if @solo && !changes
              if oldText && (txt = @data.getDocSubstring(oldText.start, oldText.end)) != oldText.text
                console.log "BAD REPLACEMENT, EXPECTED:\n#{oldText.text.replace /$/, '$'}\n BUT GOT:\n#{txt.replace /$/, '$'}"
                console.log "REPLACEMENT DUMP FOLLOWS...\n#{replacementsString reps}"
                console.log "Replacements:", reps
              else
                seq = new SequentialReplacements()
                runReplacements reps, (start, end, text)=>
                  seq.replace {start, end, text}
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
          for op in node.activeOperations
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
                start
                length
                text: newContent
              }
              parent blocks, start, length, newContent, select
              @editingReplacement = null
            changesFor: p2p: (parent)->(first, oldBlocks, newBlocks, verbatim)->
              changes = parent first, oldBlocks, newBlocks, verbatim
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
            start = offset + @editingReplacement.start
            start: start
            end: start + @editingReplacement.length
            text: @editingReplacement.text
          else replacementFor offset, blockText(oldBlocks), blockText(newBlocks)
          repl.type = 'replace'
          repl.version = @version
          repl.connectionId = @connectionId
          @pushUnreplacement repl.start, repl.end, repl.text
          @logReplacement "OUT R ", repl.start, repl.end, repl.text
          @pendingReplaces.push newRepl = _.merge (mine: true, pendingCount: ++@pendingCount), repl
          @send 'replace', repl
          if @solo
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
          error: (msg)->
            console.log "Received error: #{msg.error}", msg
            @close()
          rejectChange: ->
            #@pendingReplaces.shift()
            #@batchCallbacks.pop().replay()
          echo: (msg)->
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
            pending.connectionId = @connectionId
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
            if msg.connectionId != @connectionId
              @solo = false
              @docSnap = null
            if @successiveChanges < 2 && msg.mine && @lastReplace?.mine
              @successiveChanges++
            else
              @version = msg.messageCount
              @successiveChanges = 0
            if !msg.mine && ++@incomingReplacementCount > @replacementAckLimit
              @incomingReplacementCount = 0
              @send 'ack', version: @version
            @lastReplace = msg
            @incomingReplaces.push msg
            @applyIncomingChanges()
          trimVersions: ({version})->
            for op, pos in @incomingReplaces
              if op.messageCount >= version
                if pos > 0
                  preserveSelection =>
                    console.log "TRIMMING #{pos} versions"
                    @applyIncomingChanges @incomingReplaces.slice(0, pos)
                    @unreplacements = []
                    @incomingReplaces = @incomingReplaces.slice pos
                    @applyIncomingChanges()
                break
        replaceBatch: (replacements)->
          @data.batchReplace replacements
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
          @docSnap = @data.getText()
        connectToSession: (@url, connected)->
          @type = 'Slave'
          @handler =
            __proto__: Peer::handler
            connect: (msg)->
              Peer::handler.connect.call this, msg
              @editor.options.load msg.doc
              @docSnap = msg.doc
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
