Evaulation support for Leisure

    define ['./base', './ast', './runtime', 'acorn', 'acorn_walk', './lib/lispyscript/browser-bundle', './coffee-script', 'lib/bluebird.min', './gen', './export'], (Base, Ast, Runtime, Acorn, AcornWalk, LispyScript, CS, Bluebird, Gen, Exports)->
      acorn = Acorn
      acornWalk = AcornWalk
      acornLoose = null
      setTimeout (-> require ['acorn_loose'], (AcornLoose)-> acornLoose = AcornLoose), 1
      lispyScript = lsrequire("lispyscript")
      {
        getType
        cons
        unescapePresentationHtml
        Nil
      } = Ast
      {
        mergeExports
      } = Exports
      {
        Node
        resolve
        lazy
        defaultEnv
      } = Base
      window.resolve = rz = resolve
      window.lazy = lz = lazy
      lc = Leisure_call
      {
        runMonad
        runMonad2
        newConsFrom
        setValue
        getValue
        makeSyncMonad
        makeHamt
        _true
        jsonConvert
        getLeisurePromise
      } = Runtime
      {
        Promise
      } = Bluebird
      {
        genSource
      } = Gen

      #########
      # init
      #########

      requirePromise = (file...)-> new Promise (resolve, reject)->
        require file, resolve

      leisurePromise = null

      getLeisurePromise = ->
        if !leisurePromise
          leisurePromise = requirePromise './leisure/generatedPrelude'
            .then -> requirePromise './leisure/std'
            .then -> requirePromise './leisure/parseAst'
            .then -> requirePromise './leisure/svg'
            .then -> new Promise (resolve, reject)->
              simpleEval 'resetStdTokenPacks', resolve, reject
        leisurePromise

      simpleEval = (txt, success, fail)->
        rejected = false
        env =
          __proto__: defaultEnv
          errorAt: (offset, msg)->
            if !rejected
              rejected = true
              fail msg
        runMonad2 rz(L_newParseLine)(0, L_nil, txt), env, (ast)->
          if getType(ast) != 'err'
            try
              runMonad2 (eval genSource txt, ast), env, (x)->
                if !rejected then success x
            catch err
              if !rejected then fail err
          else if !rejected then fail new Error "Parse error: #{ast id}"

      #########
      # CODE
      #########

      defaultEnv.write = (str)-> console.log str
      defaultEnv.errorAt = (offset, msg)-> console.log msg

      id = lz (x)-> rz x
      getLeft = (x)-> x(id)(id)
      getRight = (x)-> x(id)(id)
      show = (obj)-> if L_show? then rz(L_show)(lz obj) else console.log obj

      window.evalLeisure = evalLeisure = (str, cont)->
        #console.log "EVAL: \n#{str}"
        env = leisureEnv(__proto__: defaultEnv)
        env.presentValue = (v)-> v
        env.executeText str, Nil, cont

      leisureEnv = (env)->
        env.presentValue = (v)-> html rz(L_showHtml) lz v
        env.executeText = (text, props, cont)->
          if !cont then cont = (x)->
            r = x.head().tail()
            if getType(r) == 'left' then new Error getLeft r
            else getRight r
          if getLeisurePromise().isResolved()
            leisureExec env, text, props, cont, (err)=> @errorAt 0, err?.message ? err
          else
            if opts = env.opts then console.log "OPTS:", opts
            getLeisurePromise().then (=>
              if !env.opts then env.opts = opts
              leisureExec env, text, props, cont, (err)=> @errorAt 0, err?.message ? err),
            (err)=> @errorAt 0, err?.message ? err
        env

      leisureExec = (env, text, props, cont, errCont)->
        try
          old = getValue 'parser_funcProps'
          setValue 'parser_funcProps', props
          setLounge env, ->
            result = rz(L_baseLoadString)('notebook', text)
            runMonad2 result, env, (results)->
              runNextResult results, env, (->
                setValue 'parser_funcProps', old
                (cont ? (x)->x)(results)), errCont
        catch err
          errCont err

      runNextResult = (results, env, cont, errCont)->
        while results != rz(L_nil)
          if getType(results.head().tail()) == 'left'
            env.write "PARSE ERROR: #{getLeft results.head().tail()}"
          else
            sync = true
            async = true
            try
              setLounge env, -> runMonad2 getRight(results.head().tail()), env, (res2)->
                if getType(res2) != 'unit' then env.write env.presentValue res2
                if sync then async = false
                else runNextResult results.tail(), env, cont, errCont
            catch err
              errCont err
            sync = false
            if async then return
          results = results.tail()
        cont()

      presentHtml = (v)->
        str = ': ' + (if v instanceof Html then v.content.replace(/\r?\n/g, '\\n')
        else escapeHtml String(v).replace(/\r?\n/g, '\n: '))
        if _.last(str) == '\n' then str else str + '\n'

      writeValues = (env, values)-> env.write values.join '\n'

      setLounge = (env, func)->
        window.Lounge = env
        env.opts = env.opts
        result = func()
        window.Lounge = null
        result

      jsEnv = (env)->
        env.executeText = (text, props, cont)->
          try
            writeValues env, value = jsEval(env, text)
          catch err
            @errorAt 0, err.message
          cont? value
        env

      jsEval = (env, text)->
        try
          parsed = acorn.parse text
        catch err
          errNode = null
          handleErrors acornLoose.parse_dammit(text), (node)-> errNode = node
          try
            setLounge env, -> eval text
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
        setLounge env, -> (env.eval ? localEval) newText

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

      lsEnv = (env)->
        env.executeText = (text, props, cont)->
          try
            console = log: (str)=> env.write env.presentValue str
            value = setLounge env, -> eval(lispyScript._compile(text));
            if typeof value != 'undefined' then writeValues env, [value]
          catch err
            @errorAt 0, err.message
          cont? value
        env

      csEnv = (env)->
        env.executeText = (text, props, cont)->
          try
            writeValues env, values = jsEval env, CS.compile text, bare: true
          catch err
            @errorAt 0, err.message
          cont? values
        env

      class Html
        constructor: (content)-> @content = String(content)
      
      html = (content)-> new Html content
      
      errorDiv = (err, orgText)-> "<span class='error' contenteditable='false'><span class='hidden'>#{orgText || ''}</span><span data-nonorg='true'>#{escapeHtml err}</span></span>"
      
      replacements =
        '<': '&lt;'
        '>': '&gt;'
        '&': '&amp;'
        '"': '&quot;'
        "'": '&#39;'

      escapeHtml = (str)->
        if typeof str == 'string' then str.replace /[<>&'"]/g, (c)-> replacements[c]
        else str

      knownLanguages =
        leisure: leisureEnv
        javascript: jsEnv
        js: jsEnv
        lisp: lsEnv
        cs: csEnv
        coffee: csEnv
        coffeescript: csEnv

      localEval = do (html)-> (x)-> eval x

      languageEnvMaker = (name)-> knownLanguages[name?.toLowerCase()]

      blockVars = (data, varDefs)->
        blockIds = {}
        vars = {}
        if varDefs
          for v in (if _.isArray varDefs then varDefs else [varDefs])
            if (eq = v.indexOf '=') > 0
              value = v.substring(eq + 1).trim()
              if value[0] in "'\"0123456789" then value = JSON.parse value
              else if bl = data.getBlockNamed value
                blockIds[bl] = true
                value = data.getBlock(bl)?.yaml
              else value = value.trim()
              vars[v.substring(0, eq).trim()] = value
        [vars, _.keys blockIds]

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

      specials = /[\b\f\n\r\t\v\"\\]/g

      slashed = /\\./g

      escapeString = (str)-> String(str).replace specials, (c)-> escaped[c]

      unescapeString = (str)-> String(str).replace slashed, (c)-> unescaped[c] ? c[1]

      mergeExports {
        evalLeisure
      }

      {
        languageEnvMaker
        html
        Html
        escapeHtml
        blockVars
        knownLanguages
        presentHtml
        escapeString
        unescapeString
        evalLeisure
        setLounge
      }
