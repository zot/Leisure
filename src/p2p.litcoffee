Peer-to-peer connection between Leisure instances.  They send "final"
document changes to each other, meaning that all document computations
are complete and only the document changes need be replicated.

    define ['jquery', 'immutable', './editor', './editorSupport', 'sockjs', './advice', './ot', './common'], (jq, immutable, Editor, Support, SockJS, Advice, OperationTransformation, Common)->
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
        ConcurrentReplacements
        SequentialReplacements
        runReplacements
        computeReplacements
        replacementsString
        sequentialReplacements
        concurrentReplacements
      } = OperationTransformation
      {
        noTrim
      } = Common

      diag = (args...)-> console.log args...

Peer is the top-level object for a peer-to-peer-capable Leisure instance.

      class Peer
        constructor: ->
          @data = new OrgData()
          @clearChanges()
          @pendingReplace = null
          @pendingReplaceFloat = 0
          @pendingReplaceTree = new SequentialReplacements()
          @localReplacements = []
          @unreplacements = []
          @batchCallbacks = []
          @version = -1
          @replacementAckLimit = 5
          @incomingReplacementCount = 0
          @connectionCount = 0
          @newConnectionFunc = ->
          #docSnap and solo are only for diagnostics!
          @docSnap = null
          @solo = true
          @history = []
          @replayingHistory = false
        clearChanges: ->
          @incomingReplaces = []
        setEditor: (@editor)->
        disconnect: ->
          @con?.close()
          @con = null
        subsumesIncoming: (cur, next)->
          next.mine && (!cur ||
          next.pendingCount > (cur.pendingCount ? -1) ||
          (!cur.pendingCount? && next.version > cur.version))
        replayHistory: (items)->
          @replayingHistory = true
          try
            for item, i in items
              [type, msg] = _.pairs(item)[0]
              if type == 'incoming'
                msg.mine = msg.type == 'echo'
                @handleMessage msg
              else if type == 'edit'
                {start, end, text} = msg
                @localReplace msg
                @replaceText start, end, text
                snap = @docSnap
                bounds = @applyIncomingChanges()
                @checkReplacement snap, bounds, @repsForChanges()
              else if type == 'trimVersions' then @handleMessage msg
          finally
            @replayingHistory = false
        dumpReplay: ->
          console.log "PEER.replayHistory(#{JSON.stringify @history})"
        replaceText: (start, end, text, skipData)->
          if @docSnap
            @docSnap = @docSnap.substring(0, start) + text + @docSnap.substring end
          if !skipData then @data.replaceText start, end, text
        rollback: (selections)->
          for repl in @unreplacements by -1
            #@logReplacement "VER U ", repl.start, repl.end, repl.text
            @replaceText repl.start, repl.end, repl.text
            selections.addFloat repl.start, repl.text.length - repl.end + repl.start
          @unreplacements = []

Produce a replacement message from the transformed pending local operations

        replacementForLocal: ->
          #if @pendingReplace && @pendingReplace.parent != @version
          if @pendingReplace
            reps = @incomingReplaces[..]
            reps.push _.defaults {version: @version + 1}, @pendingReplace
          else reps = @incomingReplaces
          locals = _.cloneDeep @localReplacements
          {firstVersion, versionInfo} = computeReplacements reps
          l = locals[..]
          all = new SequentialReplacements()
          fv = locals[0].parent - firstVersion
          for vinfo, v in versionInfo[fv + 1..]
            version = v + fv + firstVersion
            all.merge vinfo
            while l.length && version >= l[0].parent
              l.shift()
            if !l.length then break
            else for repl in l
              if float = all.floatFor repl.start
                #console.log "transform #{if float > 0 then '+' else ''}#{float} #{repl.start}, #{repl.end}, #{repl.text}"
                repl.start += float
                repl.end += float
          results = new SequentialReplacements()
          for repl in locals
            results.replace repl
          rep = replacement
            type: 'replace'
            version: @version + if @pendingReplace then 2 else 1
            parent: @version + if @pendingReplace then 1 else 0
            replacements: results.toArray()
          [rep, results]
        repsForChanges: ->
          reps = @incomingReplaces
          if @pendingReplace
            pending = _.defaults {version: @version + 1}, @pendingReplace
            reps = @incomingReplaces.concat [pending]
            if @localReplacements.length then reps.push @replacementForLocal()[0]
          reps
        repsDiag: (reps)->
          reps = reps ? @repsForChanges()
          (REPSTR rep for rep in reps).join('\n') + '\n---\n' + replacementsString reps
        dumpReps: (reps)-> console.log @repsDiag reps
        applyIncomingChanges: (changes)->
          reps = if changes then changes else @repsForChanges()
          if !changes then seq = new SequentialReplacements()
          bounds = null
          preserveSelection (range)=>
            float = @pendingReplaceTree.floatFor range.start
            selections = new SequentialReplacements()
            if range.start?
              selections.replace
                start: range.start
                end: range.start
                text: ''
                labels: [name: 'caret', offset: 0]
            @rollback(selections)
            runReplacements reps, (start, end, text, labels, node)=>
              selections.addFloat start, text.length - start + end
              @makeChange start, end, text, !changes, seq
            selections.eachOperation (start, end, text, labels)->
              if labels?.length then for label in labels
                if label.name == 'caret'
                  range.start = start + label.offset
                  range.length = 0
            bounds = seq?.finalBounds()
            if @solo && !changes && @docSnap? then @checkReplacement @docSnap, bounds, reps
          bounds
        checkReplacement: (snap, bounds, reps)->
          if (exp = snap.substring(bounds.start, bounds.end)) != (act = @data.getDocSubstring(bounds.start, bounds.end))
            console.log "BAD REPLACEMENT, EXPECTED:\n#{exp.replace /$/, '$'}\n BUT GOT:\n#{act.replace /$/, '$'}"
            console.log "REPLACEMENT DUMP...\n#{@repsDiag reps}"
        makeChange: (start, end, text, check, seq)->
          if start != end || text.length != 0
            @pushUnreplacement start, end, text
            #@logReplacement "#{@nodeLabel node} R ", start, end, text
            if check then seq.replace {start, end, text}
            try
              @replaceText start, end, text
            catch err
              console.log err
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
          wasPending = @pendingReplace
          @history?.push edit: repl
          @localReplace repl
          @replaceText repl.start, repl.end, repl.text, true
          #if !wasPending then @send 'replace', @pendingReplace
        localReplace: (repl)->
          #if !@pendingReplace || @pendingReplace.parent == @version
          if !@pendingReplace
            repl.parent = @version
            @localReplacements.push repl
            if !@pendingReplace then @newPendingReplace()
          else
            float = @pendingReplaceTree.floatFor repl.start
            newRepl = _.clone repl
            newRepl.parent = @version
            #newRepl.start -= float
            #newRepl.end -= float
            @localReplacements.push newRepl
          @pushUnreplacement repl.start, repl.end, repl.text
          #@logReplacement "OUT R ", repl.start, repl.end, repl.text
          #@makeChange repl.start, repl.end, repl.text
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
        newPendingReplace: ->
          [rep, localTree] = @replacementForLocal()
          @pendingReplace = replacement _.defaults {mine: true, @connectionId}, rep
          #if @version? then @pendingReplace.parent = @version
          @pendingReplaceTree = localTree
          @pendingReplaceFloat = localTree.measure().float
          @localReplacements = []
          if !@replayingHistory then @send 'replace', rep
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
          echo: (msg)->
            @history?.push incoming: msg
            @incomingReplacementCount = 0
            pending = @pendingReplace
            pending.version = msg.version
            @version = msg.version
            @pendingReplace = null
            @pendingReplaceFloat = 0
            @pendingReplaceTree = new SequentialReplacements()
            if !@localReplacements.length
              #@pendingReplace = null
              #@pendingReplaceFloat = 0
              #@pendingReplaceTree = new SequentialReplacements()
            else
              @incomingReplaces.push pending
              @newPendingReplace()
              @incomingReplaces.pop()
            #@version = msg.version
            @handleMessage pending
          replace: (msg)->
            if !msg.mine then @history?.push incoming: msg
            if msg.connectionId != @connectionId || !msg.mine
              @solo = false
              if !@replayingHistory then @docSnap = null
            @version = msg.version
            if ++@incomingReplacementCount > @replacementAckLimit
              @incomingReplacementCount = 0
              @send 'ack', version: msg.version
            @incomingReplaces.push msg
            if !msg.mine && @localReplacements.length
              seq = SequentialReplacements.fromArray msg.replacements
              for r in @localReplacements
                if float = seq.floatFor r.start
                  r.start += float
                  r.end += float
            @applyIncomingChanges()
          trimVersions: (msg)->
            if noTrim then return
            #{version} = msg
            #console.log "TRIM VERSIONS: #{version}"
            #for op, pos in @incomingReplaces
            #  if op.version >= version then break
            #if pos > 0
            #  @history?.push trimVersions: msg
            #  preserveSelection =>
            #    console.log "TRIMMING #{pos} versions"
            #    @applyIncomingChanges @incomingReplaces.slice(0, pos)
            #    @unreplacements = []
            #    repls = runReplacements @incomingReplaces.concat(@pendingReplaces), (->), version
            #    @incomingReplaces = _.filter repls, (r)-> r.version?
            #    if @incomingReplaces.length then @applyIncomingChanges()
            #  @version = Math.max @version, version
          rejectChange: ->
            #@pendingReplaces.shift()
            #@batchCallbacks.pop().replay()
          conditionalReplace: ({replacements, version})->
            #preserveSelection (range)=>
            #  offset = 0
            #  for repl in replacements
            #    {start, end} = repl
            #    start += offset
            #    end += offset
            #    if end <= range.start
            #      range.start += text.length - end + start
            #    else if start <= range.start < end
            #      range.start = start + text.length
            #    offset += repl.text.length - repl.end + repl.start
            #  @replaceBatch replacements
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

      class Replacement
        toString: -> "(p: #{@parent}, v: #{@version}) #{@replacements.join ', '}"

      replacement = (repl)->
        repl.__proto__ = Replacement.prototype
        repl

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

      testMsg = (start, end, text, version, parent)-> {
        start
        end
        text
        version
        parent
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
        dump = "      Peer::testReplay#{n} = ->\n        @history = null\n        replay = => @replayHistory ["
        for repl in hist
          dump += "\n          #{pretty repl},"
        dump += '\n        ]\n        if !@con\n          Leisure.createSession document.location.host || "localhost:8080", replay\n        else replay()'
        console.log dump

      pretty = (obj)->
        if _.isArray obj
          '['+(pretty item for item in obj).join(', ')+']'
        else if typeof obj == 'object'
          '{'+("#{key}: #{pretty obj[key]}" for key in _.sortBy _.keys(obj)).join(', ')+'}'
        else JSON.stringify obj

      Peer::testReplay1 = ->
        @history = null
        replay = => @replayHistory [
          {edit: {end: 30, parent: 1, start: 30, text: "a"}},
          {incoming: {mine: true, type: "echo", version: 2}},
          {edit: {end: 31, parent: 2, start: 31, text: "s"}},
          {edit: {end: 32, start: 32, text: "d"}},
          {incoming: {mine: true, type: "echo", version: 3}},
          #{edit: {end: 33, start: 33, text: "f"}},
          #{incoming: {mine: true, type: "echo", version: 4}},
          #{incoming: {mine: true, type: "echo", version: 5}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay2 = ->
        @history = null
        replay = => @replayHistory [
          {edit: {end: 30, parent: 1, start: 30, text: "a"}},
          {incoming: {mine: true, type: "echo", version: 2}},
          {edit: {end: 31, parent: 2, start: 31, text: "s"}},
          {incoming: {mine: true, type: "echo", version: 3}},
          {edit: {end: 32, parent: 3, start: 32, text: "d"}},
          {edit: {end: 33, parent: 3, start: 33, text: "f"}},
          {incoming: {mine: true, type: "echo", version: 4}},
          {incoming: {mine: true, type: "echo", version: 5}},
          {edit: {end: 34, parent: 5, start: 34, text: "a"}},
          {edit: {end: 35, parent: 5, start: 35, text: "s"}},
          {edit: {end: 36, parent: 5, start: 36, text: "d"}},
          {incoming: {mine: true, type: "echo", version: 6}},
          #{edit: {end: 36, parent: 6, start: 36, text: "f"}},
          #{incoming: {mine: true, type: "echo", version: 7}},
          #{incoming: {mine: true, type: "echo", version: 8}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay3 = ->
        @history = null
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", mine: false, parent: 1, replacements: [30, 30, 'a'], type: "replace", version: 3}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 2, replacements: [31, 31, 's'], type: "replace", version: 4}},
          {edit: {end: 61, parent: 4, start: 61, text: "r"}},
          {incoming: {mine: true, type: "echo", version: 5}},
          {edit: {end: 62, parent: 5, start: 62, text: "e"}},
          {edit: {end: 63, start: 63, text: "w"}},
          {edit: {end: 64, start: 64, text: "q"}},
          {incoming: {mine: true, type: "echo", version: 6}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 4, replacements: [31, 31, 'f'], type: "replace", version: 7}},
          {incoming: {mine: true, type: "echo", version: 8}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 7, replacements: [32, 32, 'd'], type: "replace", version: 9}},
          {edit: {end: 66, parent: 9, start: 66, text: "r"}},
          {edit: {end: 67, start: 67, text: "e"}},
          {incoming: {mine: true, type: "echo", version: 10}},
          {edit: {end: 68, start: 68, text: "w"}},
          {incoming: {mine: true, type: "echo", version: 11}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 9, replacements: [32, 32, 'sa'], type: "replace", version: 12}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay4 = ->
        @history = null
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", mine: false, parent: 1, replacements: [30, 30, "a"], type: "replace", version: 3}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 2, replacements: [31, 31, "s"], type: "replace", version: 4}},
          {edit: {end: 171, parent: 4, start: 171, text: "3"}},
          {incoming: {mine: true, type: "echo", version: 5}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 4, replacements: [31, 31, "fd"], type: "replace", version: 6}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay5 = ->
        @history = null
        replay = => @replayHistory [
          {edit: {end: 30, parent: 1, start: 30, text: "a"}},
          {edit: {end: 31, start: 31, text: "s"}},
          {incoming: {mine: true, type: "echo", version: 3}},
          {edit: {end: 32, start: 32, text: "f"}},
          {edit: {end: 33, start: 33, text: "d"}},
          {incoming: {mine: true, type: "echo", version: 4}},
          {incoming: {connectionId: "peer-0", mine: false, parent: 4, replacements: [171, 171, "3"], type: "replace", version: 5}},
          {incoming: {mine: true, type: "echo", version: 6}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay6 = ->
        @history = null
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", mine: false, parent: 1, replacements: [30, 30, "a"], type: "replace", version: 3}},
          {edit: {end: 60, parent: 3, start: 60, text: "q"}},
          {incoming: {mine: true, type: "echo", version: 4}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 3, replacements: [31, 31, "s"], type: "replace", version: 5}},
          {edit: {end: 62, parent: 5, start: 62, text: "w"}}, # version 6
          {edit: {end: 63, start: 63, text: "e"}}, # version 8
          {incoming: {mine: true, type: "echo", version: 6}},
          {edit: {end: 64, start: 64, text: "r"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 5, replacements: [31, 31, "d"], type: "replace", version: 7}},
          #{incoming: {mine: true, type: "echo", version: 8}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 7, replacements: [33, 33, "f"], type: "replace", version: 9}},
          #{incoming: {mine: true, type: "echo", version: 10}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay7 = ->
        @history = null
        replay = => @replayHistory [
          {edit: {end: 169, parent: 1, start: 169, text: "3"}},
          {incoming: {mine: true, type: "echo", version: 3}},
          {edit: {end: 170, parent: 3, start: 170, text: "2"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 3, replacements: [30, 30, "s"], type: "replace", version: 4}},
          {incoming: {mine: true, type: "echo", version: 5}},
          {edit: {end: 172, parent: 5, start: 172, text: "3"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 4, replacements: [31, 31, "adf"], type: "replace", version: 6}},
          {incoming: {mine: true, type: "echo", version: 7}},
          {edit: {end: 176, parent: 7, start: 176, text: "2"}},
          {edit: {end: 176, parent: 7, start: 176, text: "3"}},
          {incoming: {mine: true, type: "echo", version: 8}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 6, replacements: [34, 34, "s"], type: "replace", version: 9}},
          {incoming: {mine: true, type: "echo", version: 10}},
          {edit: {end: 179, parent: 10, start: 179, text: "2"}},
          {edit: {end: 179, parent: 10, start: 179, text: "3"}},
          {edit: {end: 180, parent: 10, start: 180, text: "2"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 9, replacements: [34, 34, "adf"], type: "replace", version: 11}},
          {incoming: {mine: true, type: "echo", version: 12}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 11, replacements: [41, 41, "sad", 3, 3, "fsad"], type: "replace", version: 13}},
          {incoming: {mine: true, type: "echo", version: 14}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay8 = ->
        @history = null
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", mine: false, parent: 1, replacements: [30, 30, "a"], type: "replace", version: 3}},
          {edit: {end: 170, parent: 3, start: 170, text: "4"}},
          {incoming: {mine: true, type: "echo", version: 4}},
          {edit: {end: 171, parent: 4, start: 171, text: "3"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 3, replacements: [31, 31, "s"], type: "replace", version: 5}},
          {incoming: {mine: true, type: "echo", version: 6}},
          {edit: {end: 173, parent: 6, start: 173, text: "4"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 5, replacements: [33, 33, "f", 1, 1, "d"], type: "replace", version: 7}},
          {edit: {end: 175, parent: 7, start: 175, text: "3"}},
          {incoming: {mine: true, type: "echo", version: 8}},
          {incoming: {mine: true, type: "echo", version: 9}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 7, replacements: [31, 31, "sda"], type: "replace", version: 10}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 10, replacements: [36, 36, "f"], type: "replace", version: 11}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay9 = ->
        @history = null
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", mine: false, parent: 1, replacements: [30, 30, "a"], type: "replace", version: 3}},
          {edit: {end: 60, parent: 3, start: 60, text: "q"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 3, replacements: [31, 31, "s"], type: "replace", version: 4}},
          {edit: {end: 62, start: 62, text: "w"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 4, replacements: [32, 32, "d"], type: "replace", version: 5}},
          {edit: {end: 64, start: 64, text: "e"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 5, replacements: [33, 33, "f"], type: "replace", version: 6}},
          {edit: {end: 65, start: 65, text: "r"}},
          {incoming: {mine: true, type: "echo", version: 7}},
          {incoming: {mine: true, type: "echo", version: 8}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay10 = ->
        @history = null
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", mine: false, parent: 1, replacements: [30, 30, "a"], type: "replace", version: 3}},
          {edit: {end: 60, parent: 3, start: 60, text: "q"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 3, replacements: [31, 31, "s"], type: "replace", version: 4}},
          {incoming: {mine: true, type: "echo", version: 5}},
          {edit: {end: 62, parent: 5, start: 62, text: "w"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 4, replacements: [32, 32, "d"], type: "replace", version: 6}},
          {incoming: {mine: true, type: "echo", version: 7}},
          {edit: {end: 64, parent: 7, start: 64, text: "e"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 6, replacements: [33, 33, "f"], type: "replace", version: 8}},
          {incoming: {mine: true, type: "echo", version: 9}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 9, replacements: [34, 34, "a"], type: "replace", version: 10}},
          {edit: {end: 67, parent: 10, start: 67, text: "q"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 10, replacements: [35, 35, "s"], type: "replace", version: 11}},
          {incoming: {mine: true, type: "echo", version: 12}},
          {edit: {end: 69, parent: 12, start: 69, text: "w"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 11, replacements: [36, 36, "f"], type: "replace", version: 13}},
          {edit: {end: 71, start: 71, text: "e"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 13, replacements: [36, 36, "d"], type: "replace", version: 14}},
          #{incoming: {mine: true, type: "echo", version: 15}},
          #{incoming: {mine: true, type: "echo", version: 16}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 16, replacements: [38, 38, "a"], type: "replace", version: 17}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 17, replacements: [39, 39, "s"], type: "replace", version: 18}},
          #{edit: {end: 75, parent: 18, start: 75, text: "q"}},
          #{edit: {end: 76, start: 76, text: "w"}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 18, replacements: [40, 40, "d"], type: "replace", version: 19}},
          #{incoming: {mine: true, type: "echo", version: 20}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 19, replacements: [41, 41, "f"], type: "replace", version: 21}},
          #{edit: {end: 79, start: 79, text: "e"}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 21, replacements: [42, 42, "a"], type: "replace", version: 22}},
          #{incoming: {mine: true, type: "echo", version: 23}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 22, replacements: [43, 43, "s"], type: "replace", version: 24}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 24, replacements: [43, 43, "d"], type: "replace", version: 25}},
          #{edit: {end: 83, start: 83, text: "q"}},
          #{edit: {end: 84, start: 84, text: "w"}},
          #{edit: {end: 85, start: 85, text: "e"}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 25, replacements: [45, 45, "f"], type: "replace", version: 26}},
          #{incoming: {mine: true, type: "echo", version: 27}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 27, replacements: [46, 46, "a"], type: "replace", version: 28}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 28, replacements: [47, 47, "s"], type: "replace", version: 29}},
          #{edit: {end: 89, start: 89, text: "e"}},
          #{incoming: {connectionId: "peer-1", mine: false, parent: 29, replacements: [48, 48, "df"], type: "replace", version: 30}},
          #{edit: {end: 92, start: 92, text: "w"}},
          #{edit: {end: 93, start: 93, text: "q"}},
          #{incoming: {mine: true, type: "echo", version: 31}},
          #{incoming: {mine: true, type: "echo", version: 32}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay11 = ->
        @history = null
        replay = => @replayHistory [
          {edit: {end: 30, parent: 1, start: 30, text: "a"}},
          {incoming: {mine: true, type: "echo", version: 2}},
          {edit: {end: 31, parent: 2, start: 31, text: "s"}},
          {incoming: {mine: true, type: "echo", version: 3}},
          {edit: {end: 32, parent: 3, start: 32, text: "d"}},
          {incoming: {mine: true, type: "echo", version: 4}},
          {edit: {end: 33, parent: 4, start: 33, text: "f"}},
          {incoming: {mine: true, type: "echo", version: 5}},
          {edit: {end: 34, parent: 5, start: 34, text: ";"}},
          {incoming: {mine: true, type: "echo", version: 6}},
          {edit: {end: 35, parent: 6, start: 35, text: "l"}},
          {edit: {end: 36, start: 36, text: "k"}},
          {incoming: {mine: true, type: "echo", version: 7}},
          {incoming: {mine: true, type: "echo", version: 8}},
          {edit: {end: 37, parent: 8, start: 37, text: "j"}},
          {incoming: {mine: true, type: "echo", version: 9}},
          {edit: {end: 38, parent: 9, start: 38, text: "a"}},
          {incoming: {mine: true, type: "echo", version: 10}},
          {edit: {end: 39, parent: 10, start: 39, text: "s"}},
          {incoming: {mine: true, type: "echo", version: 11}},
          {edit: {end: 40, parent: 11, start: 40, text: "d"}},
          {incoming: {mine: true, type: "echo", version: 12}},
          {edit: {end: 41, parent: 12, start: 41, text: "f"}},
          {incoming: {mine: true, type: "echo", version: 13}},
          {edit: {end: 42, parent: 13, start: 42, text: ";"}},
          {edit: {end: 43, start: 43, text: "l"}},
          {incoming: {mine: true, type: "echo", version: 14}},
          {edit: {end: 44, start: 44, text: "k"}},
          {incoming: {mine: true, type: "echo", version: 15}},
          {edit: {end: 45, start: 45, text: "j"}},
          {incoming: {mine: true, type: "echo", version: 16}},
          {incoming: {mine: true, type: "echo", version: 17}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay12 = ->
        @history = null
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", mine: false, parent: 1, replacements: [30, 30, "a"], type: "replace", version: 3}},
          {edit: {end: 60, parent: 3, start: 60, text: "q"}},
          {incoming: {mine: true, type: "echo", version: 4}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 2, replacements: [31, 31, "s"], type: "replace", version: 5}},
          {edit: {end: 62, parent: 5, start: 62, text: "w"}},
          {edit: {end: 63, start: 63, text: "e"}},
          {incoming: {mine: true, type: "echo", version: 6}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 5, replacements: [30, 30, "f"], type: "replace", version: 7}},
          {incoming: {mine: true, type: "echo", version: 8}},
          {edit: {end: 65, parent: 8, start: 65, text: "q"}},
          {incoming: {mine: true, type: "echo", version: 9}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 8, replacements: [32, 32, "a"], type: "replace", version: 10}},
          {edit: {end: 67, parent: 10, start: 67, text: "w"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 10, replacements: [34, 34, "sd", 1, 1, "f"], type: "replace", version: 11}},
          {incoming: {mine: true, type: "echo", version: 12}},
          {edit: {end: 71, parent: 12, start: 71, text: "e"}},
          {incoming: {mine: true, type: "echo", version: 13}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 12, replacements: [34, 34, "a"], type: "replace", version: 14}},
          {edit: {end: 73, parent: 14, start: 73, text: "q"}},
          {incoming: {mine: true, type: "echo", version: 15}},
          {edit: {end: 74, parent: 15, start: 74, text: "w"}},
          {edit: {end: 75, start: 75, text: "e"}},
          {incoming: {mine: true, type: "echo", version: 16}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 14, replacements: [34, 34, "sdf"], type: "replace", version: 17}},
          {incoming: {mine: true, type: "echo", version: 18}},
          {edit: {end: 79, parent: 18, start: 79, text: "q"}},
          {incoming: {mine: true, type: "echo", version: 19}},
          {edit: {end: 80, parent: 19, start: 80, text: "w"}},
          {edit: {end: 81, start: 81, text: "e"}},
          {edit: {end: 82, start: 82, text: "e"}},
          {incoming: {mine: true, type: "echo", version: 20}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 18, replacements: [38, 38, "s"], type: "replace", version: 21}},
          {incoming: {mine: true, type: "echo", version: 22}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 21, replacements: [39, 39, "adf"], type: "replace", version: 23}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay13 = ->
        @history = null
        replay = => @replayHistory [
          {edit: {end: 59, parent: 1, start: 59, text: "q"}},
          {incoming: {type: "echo", version: 3}},
          {edit: {end: 60, parent: 3, start: 60, text: "w"}},
          {incoming: {type: "echo", version: 4}},
          {edit: {end: 61, parent: 4, start: 61, text: "e"}},
          {incoming: {type: "echo", version: 5}},
          {incoming: {parent: 1, replacements: [30, 30, "a"], type: "replace", version: 6}},
          {incoming: {parent: 6, replacements: [30, 30, "sdf"], type: "replace", version: 7}},
          {edit: {end: 66, parent: 7, start: 66, text: "q"}},
          {incoming: {type: "echo", version: 8}},
          {edit: {end: 67, parent: 8, start: 67, text: "w"}},
          {incoming: {parent: 7, replacements: [34, 34, "a"], type: "replace", version: 9}},
          {incoming: {type: "echo", version: 10}},
          {edit: {end: 69, parent: 10, start: 69, text: "e"}},
          {incoming: {type: "echo", version: 11}},
          {incoming: {parent: 9, replacements: [36, 36, "s", 1, 1, "df"], type: "replace", version: 12}},
          {edit: {end: 73, parent: 12, start: 73, text: "q"}},
          {incoming: {type: "echo", version: 13}},
          {edit: {end: 74, parent: 13, start: 74, text: "w"}},
          {edit: {end: 75, start: 75, text: "e"}},
          {incoming: {type: "echo", version: 14}},
          {incoming: {type: "echo", version: 15}},
          {edit: {end: 76, parent: 15, start: 76, text: "q"}},
          {incoming: {type: "echo", version: 16}},
          {incoming: {parent: 12, replacements: [37, 37, "a"], type: "replace", version: 17}},
          {edit: {end: 78, parent: 17, start: 78, text: "w"}},
          {edit: {end: 79, start: 79, text: "e"}},
          {incoming: {type: "echo", version: 18}},
          {incoming: {type: "echo", version: 19}},
          {incoming: {parent: 17, replacements: [41, 41, "fd", 3, 3, "sdfa"], type: "replace", version: 20}},
          {incoming: {parent: 20, replacements: [40, 40, "sa"], type: "replace", version: 21}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay14 = ->
        @history = null
        replay = => @replayHistory [
          {edit: {end: 30, parent: 1, start: 30, text: "a"}},
          {incoming: {mine: true, type: "echo", version: 2}},
          {edit: {end: 31, parent: 2, start: 31, text: "s"}},
          {incoming: {mine: true, type: "echo", version: 3}},
          {edit: {end: 32, parent: 3, start: 32, text: "d"}},
          {incoming: {mine: true, type: "echo", version: 4}},
          {edit: {end: 33, parent: 4, start: 33, text: "a"}},
          {incoming: {mine: true, type: "echo", version: 5}},
          {edit: {end: 34, parent: 5, start: 34, text: "s"}},
          {edit: {end: 35, start: 35, text: "d"}},
          {incoming: {mine: true, type: "echo", version: 6}},
          {incoming: {mine: true, type: "echo", version: 7}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      Peer::testReplay15 = ->
        @history = null
        replay = => @replayHistory [
          {incoming: {connectionId: "peer-1", mine: false, parent: 1, replacements: [30, 30, "a"], type: "replace", version: 3}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 3, replacements: [31, 31, "s"], type: "replace", version: 4}},
          {edit: {end: 171, parent: 4, start: 170, text: "4"}},
          {incoming: {mine: true, type: "echo", version: 5}},
          {edit: {end: 171, parent: 5, start: 170, text: "3"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 4, replacements: [32, 32, "d"], type: "replace", version: 6}},
          {edit: {end: 172, start: 170, text: "31"}},
          {incoming: {mine: true, type: "echo", version: 7}},
          {edit: {end: 172, start: 170, text: "15"}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 6, replacements: [33, 33, "f"], type: "replace", version: 8}},
          {incoming: {mine: true, type: "echo", version: 9}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 8, replacements: [34, 34, "a"], type: "replace", version: 10}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 10, replacements: [35, 35, "s"], type: "replace", version: 11}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 11, replacements: [36, 36, "f"], type: "replace", version: 12}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 12, replacements: [37, 37, "a"], type: "replace", version: 13}},
          {incoming: {connectionId: "peer-1", mine: false, parent: 13, replacements: [38, 38, "sf"], type: "replace", version: 14}},
          {incoming: {mine: true, type: "echo", version: 15}},
        ]
        if !@con
          Leisure.createSession document.location.host || "localhost:8080", replay
        else replay()

      window.Replacement = Replacement

      window.REPSTR = (r)-> Replacement.prototype.toString.call(r)

      window.REP = (r)-> console.log REPSTR r

      {
        Peer
      }
