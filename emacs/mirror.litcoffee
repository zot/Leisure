Simple client for emacs leisure.el that just mirrors changes.

    require ['../src/lib/lodash.min.js', 'jquery', 'cs!export.litcoffee'], (_, $, Export)->
      {
        mergeExports
      } = Export

      con = null

      messages = null

      count = 1

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

      connect = (port, cookie, cont)->
        con = new WebSocket "ws://localhost:#{port}"
        con.onopen = (evt)->
          console.log "opened"
          con.send "#{cookie ? ''} display"
          cont?()
        con.onclose = (evt)-> console.log "closed"
        con.onmessage = (evt)-> console.log "Message", evt.data
        con.onerror = (evt)-> console.log "Error: #{evt.data}"

      trim = (str)-> if str.indexOf(' ') == -1 then str.substring 1, str.length - 1 else str

      window.connect = ->
        console.log('connect')
        connect $("#port").val(), '', -> sendChange 0, -1, $('#editor')[0].textContent

      sendChange = (start, end, str)->
        con.send "r #{count} #{start} #{end} #{trim JSON.stringify str}"

      $(document).ready ->
        if document.location.search.length > 1
          params = {}
          for param in document.location.search.substring(1).split '&'
            [k,v] = param.split '='
            params[k.toLowerCase()] = v
          {port, cookie} = params
          if port then connect port, cookie

      replace = (msg, frame)->

      messages =
        r: replace

      mergeExports {
        escapeString
        unescapeString
      }
