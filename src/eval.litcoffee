Evaulation support for Leisure

    define ['./base', './ast', './runtime', 'acorn', 'acorn_walk', './lib/lispyscript/browser-bundle', './coffee-script', 'lib/bluebird.min', './gen', './export', 'lib/js-yaml', './docOrg'], (Base, Ast, Runtime, Acorn, AcornWalk, LispyScript, CS, Bluebird, Gen, Exports, Yaml, DocOrg)->
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
      {
        safeLoad
        dump
      } = Yaml
      {
        getCodeItems
        blockSource
      } = DocOrg

      #########
      # init
      #########

      defaultEnv.prompt = (str, defaultValue, cont)-> cont prompt(str, defaultValue)

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
      defaultEnv.errorAt = (offset, msg)-> debugger; console.log msg

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
        env.executeText = (text, props, cont)-> setLounge this, ->
          if !cont then cont = (x)->
            r = x.head().tail()
            if getType(r) == 'left' then new Error getLeft r
            else getRight r
          if getLeisurePromise().isResolved()
            leisureExec env, text, props, cont, (err)-> env.errorAt 0, err?.message ? err
          else
            if opts = env.opts then console.log "OPTS:", opts
            getLeisurePromise().then (=>
              if !env.opts then env.opts = opts
              leisureExec env, text, props, cont, (err)-> env.errorAt 0, err?.message ? err),
            (err)-> env.errorAt 0, err?.message ? err
        env.createObserver = (blockNames, text, cont)-> throw new Error 'Leisure observers not implemented yet'
        env

      leisureExec = (env, text, props, cont, errCont)->
        try
          old = getValue 'parser_funcProps'
          setValue 'parser_funcProps', props
          setLounge env, =>
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
              setLounge env, => runMonad2 getRight(results.head().tail()), env, (res2)->
                if getType(res2) != 'unit' then env.write env.presentValue res2
                if sync then async = false
                else runNextResult results.tail(), env, cont, errCont
            catch err
              errCont err
            sync = false
            if async then return
          results = results.tail()
        cont()

      hasCodeAttribute = (block, attr, value)->
        if !block.attributeWords? then block.attributeWords = {}
        if !block.attributeWords[attr]
          a = block.codeAttributes?[attr] ? []
          if !_.isArray a then a = a.split ' '
          block.attributeWords[attr] = (word.toLowerCase() for word in a)
        value.toLowerCase() in block.attributeWords[attr]

      isYamlResult = (block)-> hasCodeAttribute(block, 'results', 'yaml') || block.language in ['text', 'string']

      presentHtml = (v)->
        str = ': ' + (if v instanceof Html then v.content.replace(/\r?\n/g, '\\n')
        else escapeHtml String(v).replace(/\r?\n/g, '\n: '))
        if _.last(str) == '\n' then str else str + '\n'

      basicFormat = (block, prefix, items)->
        if isYamlResult block
          if items.length == 1 then items = items[0]
          ': ' + (dump items, {sortKeys: true, flowLevel: Number block.codeAttributes.flowlevel ? 2}).trim().replace(/\n/g, '\n: ') + '\n'
        else prefix + (presentHtml item for item in items).join ''

      writeValues = (env, values)-> env.write values.join '\n'

      defaultEnv.formatResult = (block, prefix, items)-> basicFormat block, prefix, items

      setLounge = (env, func)->
        oldLounge = window.Lounge
        window.Lounge = env
        env.opts = env.opts
        result = func()
        window.Lounge = oldLounge
        result

      textEnv = (env)->
        env.executeText = (text)-> text
        env

      jsEnv = (env)->
        env.executeText = (text, props, cont)-> setLounge this, =>
          try
            writeValues env, value = jsEval(env, text)
          catch err
            @errorAt 0, err.message
          cont? value
        env.createObserver = (blockNames, text, cont)-> throw new Error 'JavaScript observers not implemented yet'
        env

      jsGatherResults = (env, text, returnResults)->
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
        if env.silent then text
        else
          newText = 'var leisure_results=[];'
          for expr in parsed.body
            if expr.type == 'ExpressionStatement'
              exprText = text.substring expr.start, expr.end
              if exprText[exprText.length - 1] == ';'
                exprText = exprText.substring(0, exprText.length - 1)
              newText = "#{newText}leisure_results.push(#{exprText});"
            else newText += text.substring expr.start, expr.end
          "#{newText};#{if returnResults then 'return ' else ''}leisure_results;"

      jsBaseEval = (env, text)->
        if !env.silent
          env.results = []
        console = log: (str)=> env.write env.presentValue str
        setLounge env, -> (env.eval ? localEval) text

      jsEval = (env, text)-> jsBaseEval env, jsGatherResults env, text

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
        env.executeText = (text, props, cont)-> setLounge this, =>
          try
            console = log: (str)=> env.write env.presentValue str
            value = setLounge env, -> eval(lispyScript._compile(text));
            if typeof value != 'undefined' then writeValues env, [value]
          catch err
            @errorAt 0, err.message
          cont? value
        env.createObserver = (blockNames, text, cont)-> throw new Error 'LispyScript observers not implemented yet'
        env

      csEnv = (env)->
        env.executeText = (text, props, cont)-> setLounge this, =>
          try
            writeValues env, values = jsEval env, CS.compile text, bare: true
          catch err
            @errorAt 0, err.message
          cont? values
        env.compileBlock = (block)->
          block = env.data.getBlock block
          [..., vars, varNames] = blockVars env.data, block.codeAttributes.var
          src = blockSource(block)
          blocks = {}
          consts = {}
          for name, value of vars
            if Number(value) == value || value[0] in "'\""
              consts[name] = value
            else blocks[name] = value
          jsBaseEval(env, """
          (function(__data) {
            return function (__cont, #{varNames.join ', '}) {
              #{("if (#{constName} == undefined) #{constName} = #{value};" for constName, value of consts).join('\n  ')}
              #{("player = player || __data.getYaml(__data.getBlockNamed('#{value}'));" for blockName, value of blocks).join('\n  ')}
              var res = (function() {#{jsGatherResults env, CS.compile(src, bare: true), true}})();
              return __cont ? __cont(res) : res;
            };
          })
          """)(env.data)
        env

      indentCode = (str)-> str.replace /\n/g, '\n  '

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
        text: textEnv
        string: textEnv

      localEval = do (html)-> (x)-> eval x

      languageEnvMaker = (name)-> knownLanguages[name?.toLowerCase()]

      blocksObserved = (block)-> ob.replace /^block\./, '' for ob in block.observing when ob.match /^block\./

      blockVars = (data, varDefs)->
        blockIds = {}
        blockNames = {}
        vars = {}
        varNames = if varDefs
          for v in (if _.isArray varDefs then varDefs else [varDefs])
            [..., name, def, value] = v.match /^([^=]*)(=(.*))?$/
            name = name.trim()
            if !def then value = name
            if value[0] in "'\"0123456789" then value = JSON.parse value
            else if bl = data.getBlockNamed value
              blockIds[bl._id] = true
              blockNames[name] = value
              value = data.getYaml bl
            else value = value.trim()
            vars[name] = value
            name
        [vars, _.keys(blockIds), blockNames, varNames ? []]

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
        setLounge
      }

      {
        languageEnvMaker
        html
        Html
        escapeHtml
        blockVars
        blocksObserved
        knownLanguages
        presentHtml
        escapeString
        unescapeString
        evalLeisure
        setLounge
        hasCodeAttribute
        isYamlResult
      }
