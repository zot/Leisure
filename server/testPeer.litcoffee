    define ['sockjs'], (SockJS)->
      console.log "SockJS: ", SockJS
      url = 'http://localhost:9090/Leisure/master'
      #url = 'http://localhost:9090/Leisure/slave-f340e224-e2bf-44c3-95f8-bcf51a17de76'
      console.log "opening socket #{url}..."
      sock = new SockJS(url);
      sock.onopen = ->
        console.log('open')
        sock.send('{"type": "log", "msg": "test"}')
      sock.onmessage = (e)->
        console.log('message', e.data)
        if JSON.parse(e.data)?.type == 'close' then sock.close()
      sock.onclose = -> console.log('close')
