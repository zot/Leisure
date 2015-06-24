Evaulation support for Leisure


    define ['cs!base', 'cs!ast', 'cs!runtime', 'acorn', 'acorn_walk'], (Base, Ast, Runtime, Acorn, AcornWalk)->
      acorn = window.Acorn = Acorn
      acornWalk = window.AcornWalk = AcornWalk
      acornLoose = null
      # loose doesn't seem to play well with others, so load it separately
      setTimeout (->require ['acorn_loose'], (AcornLoose)->
        acornLoose = window.AcornLoose = AcornLoose), 1
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
          try
            value = jsEval(env, text)
            if value.length then @write @presentValue value.join '\n'
          catch err
            @errorAt 0, err.message
          finally
            cont? env
        env

      jsEval = (env, text)->
        try
          parsed = Acorn.parse text
        catch err
          errNode = null
          handleErrors AcornLoose.parse_dammit(text), (node)-> errNode = node
          try
            eval text
          catch err2
            if errNode
              env.errorAt Math.min(errNode.start, errNode.end), err2.message
            else
              env.errorAt findError(err.message, text), err2.message
            return []
        env.results = []
        newText = 'var leisure_results=[];'
        for expr in parsed.body
          if expr.type == 'ExpressionStatement'
            exprText = text.substring expr.start, expr.end
            if exprText[exprText.length - 1] == ';'
              exprText = exprText.substring(0, exprText.length - 1)
            newText += "leisure_results.push(" + exprText + ");"
          else newText += text.substring expr.start, expr.end
        newText += ";leisure_results;"
        console = log: (str)=> env.write env.presentValue str
        eval newText

      findError = (err, text)->
        [x, line, col] = err.match(/\(([0-9]*):([0-9]*)\)/)
        line = Number line - 1
        tot = Number col
        for txt, n in text.split('\n')
          if n == line then break
          else tot += txt.length + 1
        tot

      walk = window.Walk = (node, func)->
        v = {}
        for type of acornWalk.base
          v[type] = func
        acornWalk.simple node, v, null

      isError = (node)-> node.name == "✖"

      handleErrors = (ast, func)-> walk ast, (node)-> if isError node then func node

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
