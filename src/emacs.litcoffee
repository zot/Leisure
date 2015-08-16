Emacs connection

    define ['./lib/lodash.min', 'cs!./export.litcoffee', 'cs!./ui.litcoffee', 'cs!./editor.litcoffee', 'cs!./editorSupport.litcoffee'], (_, Exports, UI, Editor, EditorSupport)->

      {
        mergeExports
      } = Exports
      {
        findEditor
        preserveSelection
        aroundMethod
        advise
      } = Editor
      {
        showMessage
        pushPendingInitialzation
        escapeAttr
      } = UI
      {
        getDocumentParams
      } = EditorSupport

      msgPat = /^([^ ]+)( (.*))?$/
      replaceMsgPat = /^([^ ]+) ([^ ]+) ([^ ]+) (.*)$/
      replacing = false
      connected = false
      showDiag = false
      #showDiag = true
      imgCount = 0
      fileCount = 0
      fileTypes =
        pgn: 'image/png'
        gif: 'image/gif'
        bmp: 'image/bmp'
        xpm: 'image/xpm'
        svg: 'image/svg'

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
        replaceWhile ->
          if end == -1
            editor.options.load text
          else editor.replace null, blockRangeFor(data, start, end), text

      receiveFile = (data, msg)->
        [lead, id] = msg.match /^([^ ]+) +/
        data.emacsConnection.fileCallbacks[id]?(msg.substring lead.length)
        delete data.emacsConnection.fileCallbacks[id]

      replaceWhile = (func)->
        replacing = true
        try
          func()
        finally
          replacing = false

      connect = (opts, host, port, cookie, cont)->
        con = new WebSocket "ws://#{host}:#{port}"
        con.onopen = (evt)-> open evt, con, opts.data, port, cookie, cont
        con.onclose = (evt)-> close evt, opts.data
        con.onmessage = (evt)-> message evt, opts.data
        con.onerror = (evt)-> showMessage opts.editor.node, "Connection error", "Could not open connection to emacs",
          position: my: 'center top', at: 'center top'
          buttons: OK: -> $(this).dialog 'close'
        _.merge opts, {
          renderImage
        }
        advise opts, followLink: emacs: aroundMethod (parent)->(e)->
          if e.target.href.match /^elisp/
            sendFollowLink @data.emacsConnection.websocket, @editor.docOffset($(e.target).prev('.link')[0], 1)
            false
          else parent()
        opts.bindings['C-C C-C'] = (editor, e, r)->
          sendCcCc editor.options.data.emacsConnection.websocket, editor.docOffset(e.target, 0)

      renderImage = (src, title)->
        if src.match /^file:/
          imgId = "emacs-image-#{imgCount++}"
          sendGetFile @data, src, (file)->
            $("##{imgId}").prop 'src', "data:#{typeForFile src};base64,#{file}"
          "<img id='#{imgId}' title='#{escapeAttr title}'>"
        else "<img src='#{src}' title='#{title}'>"

      typeForFile = (name)->
        [ignore,ext] = name.match /\.(.*)$/
        fileTypes[ext]

      close = (evt, data)->
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

      open = (evt, ws, data, port, cookie, cont)->
        ws.send "#{cookie ? ''} display"
        connection = data.emacsConnection
        connection.cookie = cookie
        connection.panel.find('button').button 'disable'
        connection.panel.find('input').attr 'readonly', true
        connection.websocket = ws
        connection.filter =
          clear: ->
            connection.offsetIds = []
            connection.idOffsets = {}
          replaceBlock: (oldBlock, newBlock)-> if !replacing
            if (index = connection.idOffsets[oldBlock?._id])?
              while connection.offsetIds.length > index
                delete connection.idOffsets[connection.offsetIds.pop()]
            start = offsetFor(data, oldBlock._id ? newBlock._id)
            end = start + (oldBlock?.text.length ? 0)
            text = newBlock.text
            if oldBlock && newBlock
              # trim common prefix/suffix off of message
              oldLen = oldBlock.text.length
              newLen = newBlock.text.length
              for startOff in [0...Math.min oldLen, newLen]
                if oldBlock.text[startOff] != newBlock.text[startOff] then break
              start += startOff
              for endOff in [0..Math.min oldLen, newLen, newLen - startOff - 1]
                if oldBlock.text[oldLen - endOff] != newBlock.text[newLen - endOff] then break
              endOff -= 1
              end -= endOff
              if startOff || endOff
                text = text.substring startOff, text.length - endOff
            sendReplace ws, start, end, text
        connection.filter.clear()
        data.addFilter connection.filter
        if !cookie then sendReplace ws, 0, -1, data.getText()
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

      sendGetFile = (data, name, callback)->
        con = data.emacsConnection.websocket
        if m = name.match /#.*$/
          name = name.substring 0, name.length - m[0].length
        id = "file-#{fileCount++}"
        diag "sending getFile #{id} #{name}"
        data.emacsConnection.fileCallbacks[id] = (file)->
          delete data.emacsConnection.fileCallbacks[id]
          callback file
        con.send "getFile #{id} #{name}"

      blockRangeFor = (data, start, end)->
        bOff = data.blockOffsetForDocOffset start
        bOff.block = data.getBlock bOff.block
        bOff.length = end - start
        bOff.type = if start == end then 'Caret' else 'Range'
        bOff

      offsetFor = (data, thing)->
        thingId = if typeof thing == 'string' then thing else thing._id
        con = data.emacsConnection
        offset = 0
        block = data.getBlock data.getFirst()
        while block && block._id != thingId
          offset += block.text.length
          block = data.getBlock block.next
        offset

      specials = /[\b\f\n\r\t\v\"\\]/g

      slashed = /\\./g

      escaped =
        '\b': "\\b"
        '\f': "\\f"
        '\n': "\\n"
        '\r': "\\r"
        '\t': "\\t"
        '\v': "\\v"
        '\"': "\\\""
        '\\': "\\\\"

      unescaped = _.zipObject ([e, c] for c, e of escaped)

      escapeString = (str)-> str.replace specials, (c)-> escaped[c]

      unescapeString = (str)-> str.replace slashed, (c)-> unescaped[c] ? c[1]

      configureEmacs = (panel)->
        opts = UI.context.opts
        data = opts.data
        data.emacsConnection =
          panel: panel
          opts: UI.context.opts
          fileCallbacks: {}
        panel.find('button').button().on 'click', ->
          [host, port] = panel.find('input').val().split(':')
          connect opts, host, Number(port), '', ->
        $(document).ready ->
          if document.location.search.length > 1 && !connected
            connected = true
            {connect:con, theme} = getDocumentParams()
            if con
              u = new URL con
              if u.protocol == 'emacs:' && m = u.pathname.match /^\/\/([^:]*)(:[^:]*)(\/.*)$/
                [ignore, host, port, cookie] = m
                connect opts, host, port.substring(1), cookie.substring(1)

      mergeExports {
        offsetFor
        blockRangeFor
        configureEmacs
      }

      {
        escapeString
        unescapeString
      }
