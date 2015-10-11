Leisure Cliient Adapter
=======================
Copyright (C) 2015, Bill Burdick, Roy Riggs, TEAM CTHULHU

Peer-to-peer connection between Leisure instances.  They send "final"
document changes to each other, meaning that all document computations
are complete and only the document changes need be replicated.

Licensed with ZLIB license.
=============================

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.

    define ['jquery', 'immutable', './editor', './editorSupport', 'sockjs', './advice', './common', 'lib/bluebird.min', 'lib/ot/ot'], (jq, immutable, Editor, Support, SockJS, Advice, Common, Bluebird, OT)->
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
        noTrim
      } = Common
      {
        Promise
      } = Bluebird
      {
        TextOperation
        Selection
        EditorClient
      } = OT
      {
        isRetain
        isInsert
        isDelete
      } = TextOperation

      diag = (args...)-> console.log args...

Peer is the top-level object for a peer-to-peer-capable Leisure instance.

      class Peer
        constructor: ->
          @data = new OrgData()
          @namePromise = randomUserName (@name)->
          @guardedChangeId = 0
          @guardPromises = {}
        setEditor: (@editor)->
        disconnect: ->
          @con?.close()
          @con = null
        connect: (@url, @connectedFunc)->
          @con = new SockJS @url
          opened = false
          @namePromise
            .finally =>
              delete @namePromise
              new Promise (resolve, reject)=>
                @con.onopen = =>
                  opened = true
                  @con.onerror = => @closed()
                  resolve()
                @con.onerror = -> if !openend then reject()
          @con.onmessage = (msg)=> @handleMessage JSON.parse msg.data
          @con.onclose = => @closed()
          peer = this
          changeAdvice @editor.options, true,
            guardedReplaceText: p2p: (parent)-> (start, end, text, gStart, gEnd)->
              peer.sendGuardedOperation(peer.editorClient.revision, peer.opFor({start, end, text}, @getLength()), [gStart, gEnd])
            replaceText: p2p: (parent)-> (start, end, text)->
              oldLen = @getLength()
              repl = {start, end, text}
              newLen = oldLen + text.length - end + start
              peer.editorCallbacks.change peer.opFor(repl, oldLen), peer.inverseOpFor(repl, newLen)
              parent start, end, text
          @editor.on 'selection', => @getSelection()
        opFor: ({start, end, text}, length)->
          op = new TextOperation()
          if start > 0 then op = op.retain start
          if end > start then op = op.delete end - start
          if text.length then op = op.insert text
          if length > end then op = op.retain length - end
          op
        inverseOpFor: ({start, end, text}, len)->
          @opFor (
            start: start
            end: start + text.length
            text: @data.getDocSubstring start, end), len
        type: 'Unknown Handler'
        close: ->
          console.log "CLOSING: #{@type}"
          @con.close()
        closed: ->
          changeAdvice @editor.options, false,
            changesFor: p2p: true
            batchReplace: p2p: true
        send: (type, msg)->
          msg.type = type
          #diag "SEND #{JSON.stringify msg}"
          @con.send JSON.stringify msg
        handleMessage: (msg)->
          #diag "RECEIVE #{JSON.stringify msg}"
          if !(msg.type of @handler)
            console.log "Received bad message #{msg.type}", msg
            @close()
          else @handler[msg.type].call this, msg
        finishConnected: ({@id, peers, revision})->
          @editorClient = new EditorClient revision, peers, this, this
          @newConnectionFunc _.size @editorClient.clients
          @connectedFunc?(this)
          @connectedFunc = null
        handler:
          log: (msg)-> console.log msg.msg
          connection: ({peerId, peerName})->
            @serverCallbacks.set_name peerId, peerName
            @newConnectionFunc _.size @editorClient.clients
          disconnection: ({peerId})->
            @serverCallbacks.client_left peerId
            @newConnectionFunc _.size @editorClient.clients
          error: (msg)->
            console.log "Received error: #{msg.error}", msg
            @close()
          ack: -> @serverCallbacks.ack()
          ackGuard: ({guardId})->
            #console.log "ACKNOWLEDGED GUARD"
            @guardPromises[guardId][0]()
            delete @guardPromises[guardId]
          rejectGuard: ({guardId})->
            #console.log "REJECTED GUARD"
            @guardPromises[guardId][1]()
            delete @guardPromises[guardId]
          operation: ({peerId, operation, meta})->
            @fromServer = true
            @serverCallbacks.operation operation
            @fromServer = false
            @serverCallbacks.selection peerId, meta
          selection: ({peerId, selection})->
            @serverCallbacks.selection selection
          setName: ({peerId, name})->
            @serverCallbacks.set_name peerId, name
            @newConnectionFunc _.size @editorClient.clients
        createSession: (@host, connectedFunc, @newConnectionFunc)->
          @type = 'Master'
          @newConnectionFunc = @newConnectionFunc ? ->
          @handler =
            __proto__: Peer::handler
            connected: (msg)->
              @guid = msg.guid
              @connectUrl = new URL("join-#{@guid}", @url)
              @editorClient = new EditorClient 0, {}, this, this
              @finishConnected msg
            slaveConnect: (msg)->
              @send 'slaveApproval', slaveId: msg.slaveId, approval: true
            slaveDisconnect: (msg)->
          @connect "http://#{@host}/Leisure/create", =>
            @send 'initDoc', doc: @data.getText(), name: @name
            @docSnap = @data.getText()
            connectedFunc()
          @docSnap = @data.getText()
        connectToSession: (@url, connected, @newConnectionFunc)->
          @type = 'Slave'
          @newConnectionFunc = @newConnectionFunc ? ->
          @handler =
            __proto__: Peer::handler
            connected: (msg)->
              @finishConnected msg
              @editor.options.load msg.doc
              @docSnap = msg.doc
          @connect @url, =>
            @send 'intro', name: @name
            connected?()
        replsForTextOp: (textOp)->
          repls = []
          popLastEmpty = ->
            if (r = _.last repls) && r.start == r.end && r.text.length == 0
              repls.pop()
          cursor = 0
          for op in textOp.ops
            if isRetain op
              cursor += op
              popLastEmpty()
              repls.push start: cursor, end: cursor, text: ''
            else if isDelete op
              cursor -= op
              _.last(repls).end = cursor
            else _.last(repls).text += op
          popLastEmpty()
          #console.log "INCOMING REPLACE: #{JSON.stringify repls}"
          repls
        replaceText: (start, end, text)-> @data.replaceText start, end, text
        # OT API
        registerCallbacks: (cb)->
          if cb.client_left then @serverCallbacks = cb
          else @editorCallbacks = cb
        # EditorAdapter methods
        registerUndo: (@undoFunc)->
        registerRedo: (@redoFunc)->
        getValue: -> @data.getText()
        applyOperation: (op)->
          preserveSelection (sel)=>
            if sel.type != 'None'
              @data.addMark 'selStart', sel.start
              @data.addMark 'selEnd', sel.start + sel.length
            for repl in @replsForTextOp op by -1
              @replaceText repl.start, repl.end, repl.text
            if sel.type != 'None'
              sel.start = @data.getMarkLocation 'selStart'
              sel.length = @data.getMarkLocation('selEnd') - sel.start
              @data.removeMark 'selStart'
              @data.removeMark 'selEnd'
        getSelection: ->
          sel = @editor.getSelectedDocRange()
          newSel = if sel.type == 'Caret' then Selection.createCursor sel.start
          else if sel.type == 'Range'
            new Selection [new Selection.Range(sel.start, sel.start + sel.length)]
          else new Selection()
          newSel.scrollTop = sel.scrollTop
          newSel.scrollLeft = sel.scrollLeft
          newSel
        setSelection: (sel)->
          if sel.ranges.length
            @editor.selectDocRange
              start: sel.ranges[0].start
              length: sel.ranges[0].end - sel.ranges[0].start
              scrollTop: sel.scrollTop
              scrollLeft: sel.scrollLeft
        setOtherSelection: (sel, color, id)->
          #$(".selection-#{id}").remove()
          console.log "OTHER SELECTION: #{JSON.stringify sel}"
        # ServerAdapter methods
        sendSelection: (sel)-> @send 'selection', selection: sel
        sendOperation: (revision, operation, selection)-> @send 'operation', {revision, operation, selection}
        sendGuardedOperation: (revision, operation, guards)->
          #console.log "SENDING GUARDED OPERATION"
          guardId = "guard-#{@guardedChangeId++}"
          @send 'guardedOperation', {revision, operation, guards, guardId, selection: @editorClient.selection}
          new Promise((success, failure)=> @guardPromises[guardId] = [success, failure])
            .catch(->)

      ajaxGet = (url)-> new Promise (resolve, reject)->
        xhr = new XMLHttpRequest
        xhr.onerror = reject
        xhr.onload = (e)-> resolve e.target.responseText.trim()
        xhr.open "GET", url
        xhr.send null

      window.randomUserName = randomUserName = (done)->
        Promise
          .all(ajaxGet 'http://randomword.setgetgo.com/get.php' for i in [0...2])
          .then (names)-> done names.join ' '

      {
        Peer
      }
