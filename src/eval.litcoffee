Evaulation support for Leisure

    define.amd = true
    define ['./base', './ast', './runtime', 'acorn', 'acorn_walk', 'acorn_loose', 'lispyscript', './coffee-script', 'bluebird', './gen', 'lib/js-yaml', './docOrg', 'lodash', './lib/fingertree'], (Base, Ast, Runtime, Acorn, AcornWalk, AcornLoose, LispyScript, CS, Bluebird, Gen, Yaml, DocOrg, _, FingerTree)->
      acorn = Acorn
      acornWalk = AcornWalk
      acornLoose = AcornLoose
      lispyScript = lsrequire("lispyscript")
      {
        getType
        cons
        unescapePresentationHtml
        Nil
      } = Ast
      {
        Node
        resolve
        lazy
        defaultEnv
      } = Base
      (window ? global).resolve = rz = resolve
      (window ? global).lazy = lz = lazy
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
        SourceNode
        sourceNode
        SourceMapConsumer
        SourceMapGenerator
        genMap
        withFile
      } = Gen
      {
        dump
      } = Yaml
      {
        getCodeItems
        blockSource
        parseYaml
      } = DocOrg

      #########
      # init
      #########

      generatedFileCount = 0
      defaultEnv.prompt = (str, defaultValue, cont)-> cont prompt(str, defaultValue)

      currentGeneratedFileName = -> "notebook-#{generatedFileCount}"

      nextGeneratedFileName = ->
        generatedFileCount++
        currentGeneratedFileName()

      requirePromise = (file)-> new Promise (resolve, reject)->
        requirejs [file], resolve

      leisurePromise = null

      getLeisurePromise = ->
        if !leisurePromise
          leisurePromise = requirePromise './leisure/generatedPrelude'
            .then -> requirePromise './leisure/std'
            .then -> requirePromise './leisure/parseAst'
            .then -> requirePromise './leisure/svg'
            .then -> new Promise (resolve, reject)->
              simpleEval 'resetStdTokenPacks', resolve, reject
            .catch (err)-> console.error "ERROR LOADING LEISURE SYSTEM!\n#{err.stack}"
        leisurePromise

      callFail = (fail, err)-> if fail then fail err else throw err

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
              if !rejected then callFail fail, err
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

      (window ? global).evalLeisure = evalLeisure = (str, cont)->
        #console.log "EVAL: \n#{str}"
        env = leisureEnv(__proto__: defaultEnv)
        env.presentValue = (v)-> v
        env.executeText str, Nil, cont

      runLeisureMonad = (value, cont)->
        env = leisureEnv(__proto__: defaultEnv, opts: defaultEnv.opts)
        env.presentValue = (v)-> v
        runMonad2 value, env, cont

      leisureEnv = (env)->
        env.presentValue = (v)-> html rz(L_showHtml) lz v
        env.executeText = (text, props, cont)-> setLounge this, ->
          if opts = env.opts then console.log "OPTS:", opts
          getLeisurePromise().then (->
            if !env.opts then env.opts = opts
            leisureExec env, text, props, ((result)->
              r = result.head().tail()
              if getType(r) == 'left' then throw new Error getLeft r
              else
                r = getRight r
                cont? r))
            .catch (err)->
              env.errorAt 0, err?.message ? err
              console.error e
              console.error "Leisure text: #{text}"
        env.XexecuteText = (text, props, cont)-> setLounge this, ->
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
        env.formatResult = (block, prefix, items)-> basicFormat block, prefix, [@presentValue items]
        env.genBlock = (block)-> @generateCode blockSource(block), true
        env.generateCode = (text, noFunc)-> setLounge this, ->
          exec = =>
            leisureExec env, text, L_nil, ((result)->
              errs = []
              #asts = _.map result.toArray(), (el)-> el.head()
              asts = _.map result.toArray(), (el)->
                if (result = el.tail()(id, id)) && result instanceof Error
                  errs.push err
                el.head()
              if errs.length then throw new Error _.map(errs, (el)-> el.message).join('\n')
              else withFile (fileName = currentGeneratedFileName()), null, ->
                codeMap new SourceNode(1, 0, fileName, [
                  (if !noFunc then '(function(cont){return ' else []),
                  'L_runMonads([\n    ',
                  intersperse(_.map(asts, (item)-> sourceNode item, 'function(){return ', (genMap item), '}'), ',\n    '),
                  #'\n  ])'
                  (if !noFunc then '\n  ], null, cont)' else '\n  ])'),
                  (if !noFunc then ';})' else [])
                ]), text, fileName), (err)-> throw err
          if getLeisurePromise().isResolved() then exec() else getLeisurePromise().then exec
        env.compileBlock = (block)->
          p = @generateCode blockSource(block)
          if p instanceof Promise then p.then (result)-> eval result.code else eval p.code
        env

      codeMap = (sourceNode, content, fileName)->
        fileName = fileName ? currentGeneratedFileName()
        cm = sourceNode.toStringWithSourceMap(file: fileName)
        cm.map.setSourceContent fileName, content
        cm

      sourceNodeFromCodeMap = (codeMap)-> SourceNode.fromStringWithSourceMap codeMap.code, new SourceMapConsumer codeMap.map.toJSON()

      joinSourceMaps = (args...)-> new SourceNode 1, 0, '', Array.prototype.slice.call args

      composeSourceMaps = (args...)->
        result = SourceMapGenerator.fromSourceMap new SourceMapConsumer _.last(args)
        for map in args[..args.length - 2] by -1
          result.applySourceMap new SourceMapConsumer map
        result.toJSON()

      intersperse = (array, element)->
        if array.length < 2 then array
        else
          result = [array[0]]
          for i in [1...array.length]
            result.push element, array[i]
          result

      leisureExec = (env, text, props, cont, errCont)->
        try
          old = getValue 'parser_funcProps'
          setValue 'parser_funcProps', props
          setLounge env, =>
            result = rz(L_baseLoadString)(nextGeneratedFileName(), text)
            runMonad2 result, env, (results)->
              runNextResult results, env, (->
                setValue 'parser_funcProps', old
                (cont ? (x)->x)(results)), errCont
        catch err
          callFail errCont, err

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
              callFail errCont, err
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

      isYamlResult = (block)-> hasCodeAttribute(block, 'results', 'yaml') || block.language in ['text', 'string', 'yaml']

      presentHtml = (v)->
        str = ': ' + (if v instanceof Html then v.content.replace(/\r?\n/g, '\\n')
        else escapeHtml String(v).replace(/\r?\n/g, '\n: '))
        if _.last(str) == '\n' then str else str + '\n'

      basicFormat = (block, prefix, items)->
        if isYamlResult block
          if items.length == 1 then items = items[0]
          ': ' + (dump items, {sortKeys: true, flowLevel: Number block.codeAttributes.flowlevel ? 2}).trim().replace(/\n/g, '\n: ') + '\n'
        else prefix + _.map(items, presentHtml).join ''

      arrayify = (val)-> if _.isArray(val) then val else [val]

      writeResults = (env, values)-> env.write arrayify(values).join '\n'

      defaultEnv.formatResult = (block, prefix, items)-> basicFormat block, prefix, items

      setLounge = (env, func)->
        oldLounge = (window ? global).Lounge
        (window ? global).Lounge = env
        env.opts = env.opts
        try
          result = func()
        finally
          (window ? global).Lounge = oldLounge
        result

      textEnv = (env)->
        env.executeText = (text)-> text
        env

      yamlEnv = (env)->
        env.executeText = (text)-> parseYaml text
        env

      jsEnv = (env)->
        env.executeText = (text, props, cont)-> setLounge this, =>
          new Promise((succeed)->
            writeResults env, value = jsEval(env, text)
            succeed value
            cont? value).catch (err)=>
              @errorAt 0, err.message
        env.generateCode = (text)->
          fileName = nextGeneratedFileName()
          cm = codeMap new SourceNode(1, 0, fileName, text), text, fileName
          nodes = SourceNode.fromStringWithSourceMap text, SourceMapConsumer.fromSourceMap cm
          (new SourceNode 1, 0, fileName, ['function(){', nodes, '}']).toStringWithSourceMap()
        env

      jsGatherSourceResults = (env, text, map, fileName, src)->
        if env.silent then text
        else
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
              return 'void 0'
          oldNodes = sourceNodeTree SourceNode.fromStringWithSourceMap text, map
          newSource = ['var leisure_results=[];\n']
          for expr in parsed.body
            {line, column, source, name} = lineLocationForOffset map, text, expr.start
            if expr.type == 'ExpressionStatement'
              if expr.expression.type != 'ObjectExpression' then expr = expr.expression
              exprText = text.substring expr.start, expr.end
              if exprText[exprText.length - 1] == ';'
                expr =
                 start: expr.start
                 end: expr.end - 1
              if (s = new SourceNode(line, column, source, nodesForGeneratedText(oldNodes, expr))).toString() != text.substring expr.start, expr.end
                console.warn "Source nodes don't line up:\n#{s.toString()}"
              newSource.push new SourceNode(line, column, source, ['\nleisure_results.push(', nodesForGeneratedText(oldNodes, expr), ');\n'], name)
            else newSource.push new SourceNode(line, column, source, [text.substring expr.start, expr.end])
          {code, map} = new SourceNode(1, 0, fileName, newSource).toStringWithSourceMap()
          map.setSourceContent fileName, src
          SourceNode.fromStringWithSourceMap(code, SourceMapConsumer.fromSourceMap map)
          #new SourceNode 1, 0, fileName, newSource

      sourceNodeTree = (nodes)->
        entryArray = []
        nodes.walk (code, node)-> entryArray.push [code, node]
        FingerTree.fromArray entryArray,
          measure: (n)-> n[0].length
          identity: -> 0
          sum: (a, b)-> a + b

      nodesForGeneratedText = (nodeTree, {start, end})->
        result = []
        [preceding, target] = nodeTree.split (m)-> m > start
        startLen = preceding.measure()
        if !preceding.isEmpty()
          [code, node] = preceding.peekLast()
          result.push sn node, code.substring start - startLen
        [preceding, target] = target.split (m)-> startLen + m > end
        if !preceding.isEmpty()
          for [code, node] in preceding.toArray()
            result.push sn node, code
          if !target.isEmpty()
            endPos = startLen + preceding.measure()
            [code, node] = target.peekFirst()
            result.push sn node, code.substring 0, end - endPos
        result

      sn = ({line, column, source}, code)-> new SourceNode line, column, source, code

      lineLocationForOffset = (map, str, offset)->
        line = 1
        pos = -1
        while (next = str.indexOf '\n', pos + 1) < offset && next != -1
          pos = next
          line++
        map.originalPositionFor {line, column: offset - pos + 1}

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
            return 'void 0'
        if env.silent then text
        else
          newText = 'var leisure_results=[];\n'
          for expr in parsed.body
            if expr.type == 'ExpressionStatement'
              exprText = text.substring expr.start, expr.end
              if exprText[exprText.length - 1] == ';'
                exprText = exprText.substring(0, exprText.length - 1)
              newText = "#{newText.trim()}\nleisure_results.push(#{exprText.trim()});\n"
            else newText += text.substring expr.start, expr.end
          "#{newText}#{if returnResults then ';\nreturn leisure_results' else ''}"

      jsBaseEval = (env, text)->
        if !env.silent
          env.results = []
        console = log: (str)=> env.write env.presentValue str
        setLounge env, -> if env.eval then env.eval(text) else localEval

      jsEval = (env, text)-> jsBaseEval env, jsGatherResults(env, text)
      #jsEval = (env, text)-> (jsBaseEval env, "(function(){" + jsGatherResults(env, text, true) + "})").call(env)

      findError = (err, text)->
        [x, line, col] = err.match(/\(([0-9]*):([0-9]*)\)/)
        line = Number line - 1
        tot = Number col
        for txt, n in text.split('\n')
          if n == line then break
          else tot += txt.length + 1
        tot

      walk = (window ? global).Walk = (node, func)->
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
            if typeof value != 'undefined' then writeResults env, [value]
          catch err
            @errorAt 0, err.message
          cont? value
        env

      csEnv = (env)->
        env.executeText = (text, props, cont)-> setLounge this, =>
          new Promise((succeed)=>
            writeResults env, values = (@runWith {}, eval "(function(){#{@blockCode text, null, null, null, true}})")
            succeed values ? []
            cont? values ? []).catch (err)->
              console.error err.stack ? err
              env.errorAt 0, err.message
        env.executeBlock = (block, props, cont)->
          new Promise((succeed)=>
            @compileBlock(block).call this, (result)->
              succeed result
              cont? result).catch (err)->
                console.error err.stack ? err
                env.errorAt 0, err.message
        env.compileBlock = (block)->
          fileName = currentGeneratedFileName()
          [..., vars, varNames, varMappings] = blockVars @data, block.codeAttributes?.var
          nodes = new SourceNode 1, 0, fileName, ['(function(){', @blockCode(blockSource(block), vars, varNames, varMappings, true, null, fileName, true), '})']
          code = @runWith {}, jsCodeFor nodes.toStringWithSourceMap()
          (cont, args...)->
            if this != (window ? global)
              @ctx = _blocks: {}
              for varName, i in varNames
                @ctx[varName] = args[i] ? @data.getYaml @data.getBlockNamed varMappings[varName]
                if !args[i] then @ctx._blocks[varName] = @data.getBlockNamed varMappings[varName]
            ret = code.apply this, args
            if cont then cont ret else ret
        env.genBlock = (block, vars, varNames, varMappings)->
          [..., vars, varNames, varMappings] = blockVars @data, block.codeAttributes?.var
          fileName = nextGeneratedFileName()
          nodes = new SourceNode 1, 0, fileName, ['(function(){', @blockCode(blockSource(block), vars, varNames, varMappings, false, null, fileName, true), '})']
          nodes.toStringWithSourceMap()
        env.blockCode = (src, vars, varNames, varMappings, useReturn, noGather, fileName, sourceNodes)->
          fileName = fileName ? currentGeneratedFileName()
          vars = vars ? {}
          varNames = varNames ? []
          varMappings = varMappings ? {}
          blocks = {}
          consts = {}
          for name, value of vars
            if Number(value) == value || value[0] in "'\""
              consts[name] = value
            else blocks[name] = value
          constStr = ("  if (#{constName} == undefined) #{constName} = #{value};\n" for constName, value of consts).join('')
          blockVarStr = ("  #{varName} = this.ctx.#{varName} || this.data.getYaml(this.data.getBlockNamed('#{value}'));\n" for varName, value of varMappings).join('')
          {js, v3SourceMap} = CS.compile src,
            bare: true
            sourceMap: true
            sourceFiles: [fileName]
          smGen = SourceMapGenerator.fromSourceMap new SourceMapConsumer JSON.parse(v3SourceMap)
          smGen.setSourceContent fileName, src
          con = SourceMapConsumer.fromSourceMap smGen
          output = if !noGather && !env.silent
            [jsGatherSourceResults this, js, con, fileName, src]
          else
            [SourceNode.fromStringWithSourceMap(js, con)]
          output.unshift "#{constStr}#{blockVarStr}\n"
          if !env.silent && !noGather
            if useReturn then output.push 'return '
            output.push 'typeof __cont != "undefined" ? __cont(leisure_results) : leisure_results;\n'
          nodes = new SourceNode 1, 0, fileName, output
          if sourceNodes then nodes else jsCodeFor nodes.toStringWithSourceMap()
        env.generateCode = (text)->
          fileName = currentGeneratedFileName()
          {js, v3SourceMap} = CS.compile(text, bare: true, sourceMap: true, sourceFiles: [fileName])
          smGen = SourceMapGenerator.fromSourceMap new SourceMapConsumer JSON.parse(v3SourceMap)
          smGen.setSourceContent fileName, text
          nodes = SourceNode.fromStringWithSourceMap js, SourceMapConsumer.fromSourceMap smGen
          (new SourceNode 1, 0, fileName, ['function(){', nodes, '}']).toStringWithSourceMap()
        env

      jsCodeFor = (codeMap)->
        #"#{codeMap.code}\n//# sourceMappingURL=data:application/json;base64,#{btoa JSON.stringify codeMap.map.toJSON()}\n"
        "#{codeMap.code}\n"

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
        if typeof str == 'string' then str.replace /[<>&\'\"]/g, (c)-> replacements[c]
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
        yaml: yamlEnv

      envTemplate =
        executeText: null
        executeBlock: null
        generateCode: null
        compileBlock: null

      class Scope
        constructor: ->
          @names = []
          @nameSet = {}
          @setters = {}
          @getters = {}
          @eval = (-> (s)-> eval(s))()
        newNames: (names)->
          newNames = _.without names, @names...
          totalNames = newNames.concat _.without @names, names...
          if !_.isEmpty newNames
            for name in newNames
              @nameSet[name] = true
            code = """
              #{('var ' + n + ' = null;' for n in newNames).join '\n  '}

              (function(str) {return eval(str)})
            """
            @names = totalNames
            @eval = @eval(code)
        get: (name)->
          if !@nameSet[name]
            throw new Error "No member of namespace named '#{name}'"
          if !(g = @getters[name])
            g = @getters[name] = @eval "(function() {return #{name};})"
          g()
        set: (name, value)->
          if !@nameSet[name]
            throw new Error "No member of namespace named '#{name}'"
          if !(s = @setters[name])
            s = @setters[name] = @eval "(function($v$) {#{name} = $v$})"
          s value

      installEnv = (names, func)->
        for langName in names
          knownLanguages[langName] = func

      autoLoadProperty = (env, names, property, libraryName, cont)->
        env[property] = (args...)->
          if !knownLanguages[names[0]].autoLoad then env[property] args...
          else
            requirePromise(libraryName)
              .then (installFunc)->
                res = installFunc(env)
                if knownLanguages[names[0]].autoLoad
                  if res instanceof Promise then res.then (envFunc)-> installEnv names, envFunc
                  else installEnv names, res
              .then ->
                #debugger
                env[property] args...
              .catch (err)-> env.errorAt 0, err.message

      autoLoadEnv = (names, libraryName)->
        names = _.map (if _.isArray names then names else [names]), (n)-> n.toLowerCase()
        func = (env)->
          for prop of envTemplate
            autoLoadProperty env, names, prop, libraryName
          env
        func.autoLoad = true
        installEnv names, func

      localEval = do (html)-> (x)-> eval x

      languageEnvMaker = (name)-> knownLanguages[name?.toLowerCase()]

      blocksObserved = (block)-> ob.replace /^block\./, '' for ob in block.observing when ob.match /^block\./

      blockVars = (data, varDefs)->
        blockIds = {}
        blockNames = {}
        vars = {}
        varMappings = {}
        varNames = if varDefs
          for v in (if _.isArray varDefs then varDefs else [varDefs])
            [..., name, def, value] = v.match /^([^=]*)(=(.*))?$/
            name = name.trim()
            if !def then value = name
            if value[0] in "'\"0123456789" then value = JSON.parse value
            else
              varMappings[name] = value
              if bl = data.getBlockNamed value
                blockIds[bl._id] = true
                value = data.getYaml bl
              blockNames[name] = value
            #else value = value.trim()
            vars[name] = value
            name
        [vars, _.keys(blockIds), blockNames, varNames ? [], varMappings]

      escaped =
        '\b': "\\b"
        '\f': "\\f"
        '\n': "\\n"
        '\r': "\\r"
        '\t': "\\t"
        '\v': "\\v"
        '\"': "\\\""
        '\\': "\\\\"

      unescaped = _.invert escaped

      specials = /[\b\f\n\r\t\v\"\\]/g

      slashed = /\\./g

      escapeString = (str)-> String(str).replace specials, (c)-> escaped[c]

      unescapeString = (str)-> String(str).replace slashed, (c)-> unescaped[c] ? c[1]

      lineColumnStrOffset = (str, line, column)->
        pos = -1
        while line-- > 0
          newPos = str.indexOf '\n', pos
          if newPos < pos
            return str.length
          pos = newPos + 1
        Math.min str.length, pos + 1 + column

      Object.assign Leisure, {
        evalLeisure
        runLeisureMonad
        setLounge
        joinSourceMaps
        codeMap
        sourceNodeFromCodeMap
        composeSourceMaps
        SourceNode
        SourceMapConsumer
        SourceMapGenerator
        autoLoadEnv
        languageEnvMaker
        Scope
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
        runLeisureMonad
        setLounge
        hasCodeAttribute
        isYamlResult
        jsCodeFor
        nextGeneratedFileName
        getLeisurePromise
        autoLoadEnv
        Scope
        lineColumnStrOffset
        writeResults
      }
