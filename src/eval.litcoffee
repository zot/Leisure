Evaulation support for Leisure

    define ['cs!base', 'cs!ast', 'cs!runtime'], (Base, Ast, Runtime)->
      {
        getType,
        cons,
        define,
        unescapePresentationHtml,
      } = Ast
      {
        Node,
        resolve,
        lazy,
        defaultEnv,
      } = Base
      rz = resolve
      lz = lazy
      lc = Leisure_call
      {
        runMonad,
        runMonad2,
        newConsFrom,
        setValue,
        getValue,
        makeSyncMonad,
        makeHamt,
        _true,
        jsonConvert,
      } = Runtime

      leisureEnv = (env)->
        env.presentValue = (v)-> rz(L_showHtml) lz v
        env.executeText = (text, props, cont)->
          old = getValue 'parser_funcProps'
          setValue 'parser_funcProps', props
          result = rz(L_baseLoadString)('notebook')(text)
          runMonad2 result, env, (results)->
            runNextResult results, env, ->
              setValue 'parser_funcProps', old
              cont? env, results
        env

      runNextResult = (results, env, cont)->
        while results != rz(L_nil) && getType(results.head().tail()) == 'left'
          env.write "PARSE ERROR: #{getLeft results.head().tail()}"
          results = results.tail()
        if results != rz(L_nil)
          runMonad2 getRight(results.head().tail()), env, (res2)->
            if getType(res2) != 'unit' then env.write String(env.presentValue res2)
            runNextResult results.tail(), env, cont
        else cont()

      jsEnv = (env)->
        env.presentValue = (v)-> if v instanceof Html then v.content else escapeHtml v
        env.executeText = (text, props, cont)->
          console = log: (str)=> @write @presentValue str
          try
            #@write @presentValue eval text
            console.log eval text
          catch err
            @write html errorDiv err.stack
          finally
            cont? env
        env

      class Html
        constructor: (@content)->
      
      html = (content)-> new Html content
      
      errorDiv = (err, orgText)-> "<span class='error' contenteditable='false'><span class='hidden'>#{orgText || ''}</span><span data-nonorg='true'>#{escapeHtml err}</span></span>"
      
      replacements =
        '<': '&lt;'
        '>': '&gt;'
        '&': '&amp;'

      escapeHtml = (str)->
        if typeof str == 'string' then str.replace /[<>&]/g, (c)-> replacements[c]
        else str

      knownLanguages =
        leisure: leisureEnv
        javascript: jsEnv
        js: jsEnv

      languageEnvMaker = (name)-> knownLanguages[name.toLowerCase()]

      languageEnvMaker: languageEnvMaker
      html: html
      Html: Html
      escapeHtml: escapeHtml
