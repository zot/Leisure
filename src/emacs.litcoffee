Emacs connection

    define ['./lib/lodash.min', 'cs!./export.litcoffee', 'cs!./ui.litcoffee', 'cs!./editor.litcoffee'], (_, Exports, UI, Editor)->

      {
        mergeExports
      } = Exports
      {
        findEditor
      } = Editor

      msgPat = /^([^ ]+) (.*)$/
      replaceMsgPat = /^([^ ]+) ([^ ]+) ([^ ]+) (.*)$/
      replacing = false
      connected = false
      showDiag = false
      showDiag = true

      diag = (msg...)-> if showDiag then console.log msg...

      messages =
        r: (data, msg, frame)-> replace data, msg

      replace = (data, msg)->
        diag "Received #{msg}"
        [ignore, count, start, end, text] = msg.match replaceMsgPat
        start = Number start
        end = Number end
        text = JSON.parse text
        editor = data.emacsConnection.opts.editor
        replaceWhile ->
          if end == -1 then editor.options.load text
          else editor.replace null, blockRangeFor(data, start, end), text

      replaceWhile = (func)->
        replacing = true
        try
          func()
        finally
          replacing = false

      connect = (data, port, cookie, cont)->
        con = new WebSocket "ws://localhost:#{port}"
        con.onopen = (evt)-> open evt, con, data, port, cookie, cont
        con.onclose = (evt)-> close evt, data
        con.onmessage = (evt)-> message evt, data
        con.onerror = (evt)-> error evt, data

      close = (evt, data)->
        connection = data.emacsConnection
        connection.panel.find('button').button 'enable'
        connection.panel.find('input').removeAttr 'readonly'
        console.log "closed"
        if connection.cookie then window.close()

      message = (evt, data)->
        [ignore, msg, text] = evt.data.match msgPat
        if method = messages[msg]
          method data, text, evt.data
        else
          console.log "Unknown message #{msg}: #{text}"
          data.emacsConnection.websocket.close()

      error = (evt, data)-> console.log "Error: #{evt.data}"

      open = (evt, ws, data, port, cookie, cont)->
        console.log "opened"
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
            end = start + (if oldBlock then oldBlock.text.length else 0)
            text = newBlock.text
            if oldBlock && newBlock
              # trim common prefix/suffix off of message
              oldLen = oldBlock.text.length
              newLen = newBlock.text.length
              for startOff in [0...Math.min oldLen, newLen]
                if oldBlock.text[startOff] != newBlock.text[startOff] then break
              start += startOff
              for endOff in [1..Math.min oldLen, newLen, newLen - startOff - 1]
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

      blockRangeFor = (data, start, end)->
        con = data.emacsConnection
        if lastId = _.last con.offsetIds
          offset = con.idOffsets[lastId]
          lastBlock = data.getBlock lastId
        else
          offset = 0
          lastId = data.getFirst()
          lastBlock = data.getBlock lastId
          addBlockOffset data, offset, lastBlock._id, null
        while offset < start && lastId
          [lastId, offset] = addBlockOffset data, offset, lastId, null
        if !lastId
          lastId = _.last con.offsetIds
          offset = con.idOffsets[lastId]
        while offset > start
          lastId = data.getBlock(lastId).prev
          offset = con.idOffsets[lastId]
        block: data.getBlock lastId
        offset: start - offset
        length: end - start
        type: if start == end then 'Caret' else 'Range'

      offsetFor = (data, thing)->
        thingId = if typeof thing == 'string' then thing else thing._id
        connection = data.emacsConnection
        if !(offset = connection.idOffsets[thingId])?
          if lastId = _.last(connection.offsetIds)
            block = data.getBlock(lastId)
            offset = connection.idOffsets[lastId] + block.text.length
            id = block.next
          else
            offset = 0
            id = data.getFirst()
          while ([id, offset] = addBlockOffset data, offset, id, thingId) && id then
          if !id then return connection.idOffsets[_.last connection.offsetIds]
        offset

      addBlockOffset = (data, offset, id, endId)->
        connection = data.emacsConnection
        connection.idOffsets[id] = offset
        connection.offsetIds.push id
        if id == endId then []
        else
          block = data.getBlock id
          [block.next, offset + block.text.length]

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
        data = UI.context.opts.data
        data.emacsConnection =
          panel: panel
          opts: UI.context.opts
        panel.find('button').button().on 'click', ->
          connect data, Number(panel.find('input').val()), '', ->
        $(document).ready ->
          if document.location.search.length > 1 && !connected
            connected = true
            params = {}
            for param in document.location.search.substring(1).split '&'
              [k,v] = param.split '='
              params[k.toLowerCase()] = v
            {port, cookie} = params
            if port then connect data, port, cookie

      mergeExports {
        offsetFor
        blockRangeFor
        configureEmacs
      }

      {
        escapeString
        unescapeString
      }
