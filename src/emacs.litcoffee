Emacs connection

    define ['lodash', './ui', './editor', './editorSupport', './diag', './eval', './advice'], (_, UI, Editor, EditorSupport, Diag, Eval, Advice)->

      {
        preserveSelection
        computeNewStructure
      } = Editor
      {
        changeAdvice
      } = Advice
      {
        showMessage
        pushPendingInitialzation
        escapeAttr
        localResources
      } = UI
      {
        getDocumentParams
        basicDataFilter
        fileTypes
        makeBlobUrl
      } = EditorSupport
      {
        clearDiag
        diagMessage
      } = Diag
      {
        knownLanguages
        escapeString
        unescapeString
      } = Eval

      msgPat = /^([^ ]+)( (.*))?$/
      replaceMsgPat = /^([^ ]+) ([^ ]+) ([^ ]+) (.*)$/
      connected = false
      showDiag = false
      #showDiag = true
      imgCount = 0
      fileCount = 0

      diag = (msg...)-> if showDiag then console.log msg...

      messages =
        r: (data, msg, frame)-> replace data, msg
        reload: -> document.location.href = document.location.href
        activate: ->
          window.open "javascript:close()"
          window.focus()
        file: (data, msg, frame)-> receiveFile data, msg

      replace = (data, msg)->
        diag "Received #{msg}"
        [ignore, count, start, end, text] = msg.match replaceMsgPat
        start = Number start
        end = Number end
        text = JSON.parse text
        editor = data.emacsConnection.opts.editor
        context = {start, end, text, source: 'emacs'}
        replaceWhile start, end, text, data, (repl)->
          if end == -1
            context.start = 0
            context.end = data.getLength()
            editor.options.load 'emacs', text, context
          else
            targetLen = data.getDocLength() - (end - start) + text.length
            editor.options.replaceText context

      receiveFile = (data, msg)->
        [lead, id] = msg.match /^([^ ]+) +/
        data.emacsConnection.fileCallbacks[id]?(msg.substring lead.length)
        delete data.emacsConnection.fileCallbacks[id]

      replaceWhile = (start, end, text, data, func)->
        if end == -1
          blocks = []
          newText = text
        else {blocks, newText} = data.blockOverlapsForReplacement(start, end, text)
        repl = computeNewStructure data, blocks, newText
        repl.changeId = "emacs-#{data.emacsConnection.changeCount++}"
        repl.emacsNewBlocks = repl.newBlocks.slice()
        repl.blockOffset = if blocks.length then data.offsetForBlock blocks[0] else 0
        data.emacsConnection.replacing = repl
        data.emacsConnection.opts.mergeChangeContext fromEmacs: repl.changeId
        data.emacsConnection.pendingChanges[repl.changeId] = repl
        try
          func repl
        finally
          data.emacsConnection.replacing = null

      shouldSendConcurrent = (data, newBlock)->
        if newBlock
          repl = data.emacsConnection.replacing
          currentBlock = _.find repl.newBlocks, (b)-> b._id == newBlock._id
          currentBlock && currentBlock.text != newBlock.text

      sendConcurrentBlockChange = (data, newBlock)->
        repl = data.emacsConnection.replacing
        ind = _.findIndex repl.newBlocks, (x)-> x._id = newBlock
        currentNew = repl.emacsNewBlocks[ind]
        if currentNew.text != newBlock.text
          offset = 0
          oldLen = currentNew.text.length
          repl.emacsNewBlocks[ind] = newBlock
          while ind-- > 0
            offset += repl.emacsNewBlocks[ind]
          start = offset + repl.blockOffset
          sendReplace data.emacsConnection.websocket, start, start + oldLen, newBlock.text

      connect = (opts, host, port, cookie, cont)->
        con = new WebSocket "ws://#{host}:#{port}"
        con.onopen = (evt)-> open evt, con, opts, port, cookie, cont
        con.onclose = (evt)-> close evt, opts.data
        con.onmessage = (evt)-> message evt, opts.data
        con.onerror = (evt)-> showMessage opts.editor.node, "Connection error", "Could not open connection to emacs",
          position: my: 'center top', at: 'center top'
          buttons: OK: -> $(this).dialog 'close'

      configureOpts = (opts)->
        data = opts.data
        if !data.emacsConnection.websocket then return
        editor = opts.editor
        changeAdvice opts, true,
          followLink: emacs: (parent)->(e)->
            if e.target.href.match /^elisp/
              sendFollowLink data.emacsConnection.websocket, editor.docOffset($(e.target).prev('.link')[0], 1)
              false
            else parent e
          execute: emacs: (parent)->->
            if editor.blockForCaret()?.language.toLowerCase() of knownLanguages
              parent()
            else sendCcCc data.emacsConnection.websocket, editor.docOffset(editor.domCursorForCaret())
        changeAdvice editor, true,
          activateScripts: emacs: (parent)->(el, context, data, block)->
            ret = parent el, context, data, block
            for img in $(el).find 'img'
              src = img.getAttribute 'src'
              if !src.match '^.*:.*'
                name = src.match(/([^#?]*)([#?].*)?$/)?[1]
                src = "file:#{src}"
              else name = src.match(/^file:([^#?]*)([#?].*)?$/)?[1]
              if name
                if !img.id then img.id = "emacs-image-#{imgCount++}"
                img.src = ''
                fetchImage opts.data.emacsConnection, img.id, src
            ret

      fetchImage = (con, imgId, src)->
        if con && img = $("##{imgId}")[0]
          if data = localResources[src]
            if data instanceof Promise then data.then (data)->
              replaceImage con, img, src, data
            else preserveSelection (range)-> replaceImage con, img, src, data
          else localResources[src] = new Promise (resolve, reject)->
            sendGetFile con, src, (file)->
              if file
                data = localResources[src] = makeBlobUrl atob(file), typeForFile src
                preserveSelection (range)-> replaceImage con, img, src, data
                resolve data
              else reject null

      replaceImage = (con, img, src, data)-> setTimeout (->
          img.src = data
          #img.onload = ->
        ), 0

      typeForFile = (name)->
        [ignore,ext] = name.match /\.([^#.]*)(#.*)?$/
        fileTypes[ext]

      close = (evt, data)->
        console.log "CLOSED EMACS CONNECTION"
        connection = data.emacsConnection
        connection.panel.find('button').button 'enable'
        connection.panel.find('input').removeAttr 'readonly'
        if connection.cookie then window.close()
        data.removeFilter connection.filter
        connection.websocket = null
        connection.filter = null

      message = (evt, data)->
        [ignore, msg, ignore, text] = evt.data.match msgPat
        if method = messages[msg] then preserveSelection => method data, text, evt.data
        else
          console.log "Unknown message #{msg}: #{text}"
          data.emacsConnection.websocket.close()

      error = (evt, data)-> console.log "Error: #{evt.data}"

      open = (evt, ws, opts, port, cookie, cont)->
        data = opts.data
        ws.send "#{cookie ? ''} display"
        connection = data.emacsConnection
        connection.cookie = cookie
        connection.panel.find('button').button 'disable'
        connection.panel.find('input').attr 'readonly', true
        connection.websocket = ws
        connection.filter =
          __proto__: basicDataFilter
          replaceText: (data, {start, end, text, source})->
            if source != 'emacs'
              sendReplace ws, start, end, text
        data.addFilter connection.filter
        if !cookie then sendReplace ws, 0, -1, data.getText()
        changeAdvice opts.data, true,
          getFile: emacs: (parent)->(file, cont, fail)->
            p = new Promise (success, failure)=>
              sendGetFile @emacsConnection, "file:#{file}", (contents)->
                if contents then success atob(contents)
                else failure "No such file: #{file}"
            if cont || fail then p.then cont, fail
            else p
        configureOpts opts
        cont?()

      sendReplace = (con, start, end, text)->
        con.send "r #{start} #{end} #{JSON.stringify text}"
        diag "sending r #{start} #{end} #{JSON.stringify text}"

      sendFollowLink = (con, location)->
        con.send "followLink #{location}"
        diag "sending followLink #{location}"

      sendCcCc = (con, location)->
        con.send "ctrl-c-ctrl-c #{location}"
        diag "sending ctrl-c-ctrl-c #{location}"

      sendGetFile = (con, name, callback)->
        webSocket = con.websocket
        if m = name.match /#.*$/
          name = name.substring 0, name.length - m[0].length
        id = "file-#{fileCount++}"
        diag "sending getFile #{id} #{name}"
        con.fileCallbacks[id] = (file)->
          delete con.fileCallbacks[id]
          callback file
        webSocket.send "getFile #{id} #{name}"

      blockRangeFor = (data, start, end)->
        bOff = data.blockOffsetForDocOffset start
        bOff.block = data.getBlock bOff.block
        bOff.length = end - start
        bOff.type = if start == end then 'Caret' else 'Range'
        bOff

      configureEmacs = (panel)->
        opts = UI.context.opts
        data = opts.data
        data.emacsConnection =
          panel: panel
          opts: UI.context.opts
          fileCallbacks: {}
          changeCount: 0
          pendingChanges: {}
        panel.find('button').button().on 'click', ->
          [host, port] = panel.find('input').val().split(':')
          connect opts, host, Number(port), '', ->
        $(document).ready ->
          if document.location.search.length > 1 && !connected
            connected = true
            {connect:con} = getDocumentParams()
            if con
              u = new URL con
              if u.protocol == 'emacs:' && m = u.pathname.match /^\/\/([^:]*)(:[^\/]*)(\/.*)$/
                [ignore, host, port, cookie] = m
                connect opts, host, port.substring(1), cookie.substring(1)

      Object.assign Leisure, {
        blockRangeFor
        configureEmacs
        configureEmacsOpts: configureOpts
      }

      {
      }
