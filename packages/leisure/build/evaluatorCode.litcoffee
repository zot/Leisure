
    {
      runMonad2,
      getType,
      newCall,
    } = Leisure

    rz = Leisure.resolve
    lz = Leisure.lazy
    lc = Leisure_call

    if newCall
      id = lz (x)-> rz x
      getLeft = (x)-> lc x, (id), (id)
      getRight = (x)-> lc x, (id), (id)
    else
      id = lz (x)-> rz x
      getLeft = (x)-> x(id)(id)
      getRight = (x)-> x(id)(id)

    bindInput = ->

    enter = ->
      console.log "INPUT", $('#input').val()
      executeText($('#input').val()).then (result)->
        console.log "result", result
        $('#output').append """
          <div class='expr'>#{$('#input').val()}<hr>#{result}</div>
        """

    newEnv = ->
      output: ''
      write: (txt)-> @output += txt + '\n'
      presentValue: (v)-> String(v)

    if Leisure.newCall
      executeText = (txt)->
        new Promise (resolve, reject)->
          result = lc rz(L_baseLoadString), 'evaluator', txt
          env = newEnv()
          runMonad2 result, env, (results)->
            runNextResult results, env, ->
              resolve env.output
    else
      executeText = (txt)->
        new Promise (resolve, reject)->
          result = rz(L_baseLoadString)('evaluator')(txt)
          env = newEnv()
          runMonad2 result, env, (results)->
            runNextResult results, env, ->
              resolve env.output

    runNextResult = (results, env, cont)->
      while results != rz(L_nil) && getType(results.head().tail()) == 'left'
        env.write "PARSE ERROR: #{getLeft results.head().tail()}"
        results = results.tail()
      if results != rz(L_nil)
        runMonad2 getRight(results.head().tail()), env, (res2)->
          if getType(res2) != 'unit' then env.write String(env.presentValue res2)
          runNextResult results.tail(), env, cont
      else cont()
    
    prep = ->
      $('#input').on 'keypress', (e)->
        console.log "key", e
        if e.charCode in [10, 13] && (e.shiftKey || e.ctrlKey) then enter()
      $('#input').focus()
      console.log "booted"

    prep()
