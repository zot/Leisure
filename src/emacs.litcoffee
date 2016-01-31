Emacs connection

    define ['./lib/lodash.min', './export', './ui', './editor', './editorSupport', './diag', './eval', './advice'], (_, Exports, UI, Editor, EditorSupport, Diag, Eval, Advice)->

      {
        mergeExports
      } = Exports
      {
        findEditor
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
      fileTypes =
        png: 'image/png'
        gif: 'image/gif'
        bmp: 'image/bmp'
        xpm: 'image/xpm'
        svg: 'image/svg+xml'

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
        replaceWhile start, end, text, data, (repl)->
          if end == -1
            editor.options.load 'emacs', text
          else
            targetLen = data.getDocLength() - (end - start) + text.length
            #editor.options.makeStructureChange start, end, text, repl
            editor.options.replaceText start, end, text, repl
            endLen = data.getDocLength()
            if endLen != targetLen
              diagMessage "BAD DOC LENGTH AFTER REPLACEMENT, expected <#{targetLen}> but ggot<#{endLen}>"

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
          activateScripts: emacs: (parent)->(el, context)->
            ret = parent el, context
            for img in $(el).find 'img'
              src = img.getAttribute 'src'
              if !src.match '^.*:.*'
                name = src.match(/([^#?]*)([#?].*)?$/)?[1]
                src = "file:#{src}"
              else name = src.match(/^file:([^#?]*)([#?].*)?$/)?[1]
              if name
                if !img.id then img.id = "emacs-image-#{imgCount++}"
                img.src = ''
                fetchImage data.emacsConnection, img.id, src
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
                data = localResources[src] = "data:#{typeForFile src};base64,#{file}"
                preserveSelection (range)-> replaceImage con, img, src, data
                resolve data
              else reject null

      replaceImage = (con, img, src, data)-> setTimeout (->
          img.src = data
          img.onload = ->
            img.removeAttribute 'style'
            con.imageSizes[src] = " style='height: #{img.height}px; width: #{img.width}px'"
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
          replaceBlock: (data, oldBlock, newBlock)->
            con = data.emacsConnection
            if !con.replacing && con.opts.changeContext?.fromEmacs?
              tmpReplacing = con.replacing = con.pendingChanges[con.opts.changeContext.fromEmacs]
            if con.replacing
              delete data.emacsConnection.pendingChanges[con.replacing.changeId]
            if !con.replacing || shouldSendConcurrent data, newBlock
              start = data.offsetForBlock oldBlock?._id ? newBlock._id
              end = start + (oldBlock?.text.length ? 0)
              text = newBlock.text
              if data.emacsConnection.replacing
                sendConcurrentBlockChange data, newBlock
              else
                if oldBlock && newBlock
                  # trim common prefix/suffix off of message
                  oldLen = oldBlock.text.length
                  newLen = newBlock.text.length
                  for startOff in [0...Math.min oldLen, newLen]
                    if oldBlock.text[startOff] != newBlock.text[startOff] then break
                  start += startOff
                  for endOff in [0..Math.min oldLen - startOff - 1, newLen - startOff - 1] by 1
                    if oldBlock.text[oldLen - endOff - 1] != newBlock.text[newLen - endOff - 1]
                      break
                  end -= endOff
                  if startOff || endOff
                    text = text.substring startOff, text.length - endOff
                if start != end || text != ''
                  sendReplace ws, start, end, text
            if tmpReplacing then con.replacing = null
        data.addFilter connection.filter
        if !cookie then sendReplace ws, 0, -1, data.getText()
        changeAdvice opts.data, true,
          getFile: emacs: (parent)->(file, cont, fail)->
            sendGetFile @emacsConnection, "file:#{file}", (contents)->
              if contents then cont atob(contents)
              else fail "No such file: #{file}"
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
          imageSizes: {}
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

      mergeExports {
        blockRangeFor
        configureEmacs
        configureEmacsOpts: configureOpts
      }

      {
      }
