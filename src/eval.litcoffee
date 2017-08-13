Evaulation support for Leisure

    'use strict'
    define.amd = true
    define ['./base', './ast', './runtime', 'acorn', 'acorn_walk', 'acorn_loose', 'lispyscript', './coffee-script', 'bluebird', './gen', 'lib/js-yaml', './docOrg', 'lodash', 'fingertree', 'browser-source-map-support', 'lib/sourcemapped-stacktrace'], (Base, Ast, Runtime, Acorn, AcornWalk, AcornLoose, LispyScript, CS, Bluebird, Gen, Yaml, DocOrg, _, FingerTree, SourceMapSupport, SourcemappedStackTrace)->
      SourceMapSupport?.install()

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
        flushTraceLog
        addSourceFile
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
        left
        right
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
        CodeGenerator
        withFile
        jsCodeFor
        setDebugType
      } = Gen
      {
        dump
      } = Yaml
      {
        getCodeItems
        blockSource
        parseYaml
      } = DocOrg
      {
        mapStackTrace
      } = SourcemappedStackTrace

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
            .then -> setDebugType 'User'
            .then -> console.log "LOADED LEISURE"
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
      getLeft = getRight = (x)-> x(id)(id)
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

      # force Chrome to register this source file by compiling dummy JS code associated with the file
      defineSourceFile = (fileName, contents)->
        addSourceFile fileName, contents
        eval jsCodeFor codeMap new SourceNode(1, 0, fileName, 'void(0)'), contents, fileName, true

      class ErrorCache
        constructor: (@limit = 10)->
          @cacheArray = []
          @cacheSet = {}
        addError: (err)->
          while @cacheArray.length >= @limit
            e = @cacheArray.shift()
            delete @cacheSet[e.cacheId]
          err.cacheId = "errorid#{Math.round(Math.abs(Math.random() * 1000000000))}"
          @cacheSet[err.cacheId] = err
          @cacheArray.push err
          err.cacheId

      errCache = new ErrorCache
      Leisure.errCache = errCache.cacheSet

      leisureErrorHtml = (err)->
        "<span class='error'>Error computing value: #{err.stack.replace(/\n/g, '<br>')}</span>"

      leisureEnv = (env)->
        env.presentValue = (v)->
          try
            str = if v instanceof Error || v?.stack? then leisureErrorHtml v
            else rz(L_showHtml) lz v
          catch err
            str = leisureErrorHtml err
          html str
        env.executeText = (text, props, cont)-> setLounge this, =>
          if opts = @opts then console.log "OPTS:", opts
          getLeisurePromise().then (=>
            if !@opts then @opts = opts
            leisureExec this, text, props, ((result)=>
              r = result.head().tail()
              if getType(r) == 'left' then throw new Error getLeft r
              else
                r = getRight r
                cont? r))
            .catch (err)=>
              @errorAt 0, err?.message ? err
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
        env.genBlock = (block, cont)-> @generateCode blockSource(block), true, cont
        env.executeBlock = (block, cont)-> runWithPromiseCont ((c)=> @genBlock block, c), (results)->
          results = arrayify results
          for result in results
            if result instanceof Error
              return mapErrors results, cont
          cont results
        env.generateCode = (text, noFunc, cont)-> setLounge this, =>
          fileName = currentGeneratedFileName()
          exec = =>
            env.fileName = fileName
            defineSourceFile fileName, text
            leisureExec this, text, L_nil, ((result)->
              env.fileName = null
              errs = []
              results = []
              #asts = _.map result.toArray(), (el)-> el.head()
              asts = _.map result.toArray(), (el)->
                if getType(el.tail()) == 'left' then errs.push getLeft el.tail()
                else if cont then results.push getRight el.tail()
                el.head()
              if errs.length then cont? errs[0]
              else withFile fileName, null, ->
                cont? results
                code = for item in asts
                  gen = new CodeGenerator(fileName, false, true, false, text)
                  node = gen.genNode item
                  sourceNode item, 'function(){return ', node, ';}'
                node = new SourceNode 1, 0, fileName, [
                  '"use strict";\n',
                  (if !noFunc then '(function(cont){return ' else []),
                  'L_runMonads([\n    ',
                  intersperse(code, ',\n    '),
                  (if !noFunc then '\n  ], null, cont)' else '\n  ])'),
                  (if !noFunc then ';})' else [])
                ]
                codeMap node, text, fileName, true), (err)-> throw err
          if getLeisurePromise().isResolved() then exec() else getLeisurePromise().then exec
        env.userEvent = -> flushTraceLog()
        env.compileBlock = (block)->
          p = @generateCode blockSource(block)
          if p instanceof Promise then p.then (result)-> eval codeFor result else eval codeFor p
        env

      mapErrors = (results, cont)->
        Promise.all((if result instanceof Error #&& false
          do (result)-> new Promise (succeed, fail)-> mapStackTrace result.stack, (r)->
            tidyFrames = for frame in r
              frame.replace(/^   */, '  ').replace /\([^/][^)]*\)/, (s)->
                "(#{new URL s.substring(1, s.length - 1), location})"
            succeed stack: tidyFrames.join '\n'
        else result) for result in results)
          .then (newResults)-> cont newResults

      runWithPromiseCont = (func, cont)->
        sync = false
        res = null
        succeedPromise = null
        failPromise = null
        try
          func (result)->
            sync = true
            if succeedPromise
              cont result
              succeedPromise result
            else res = result
          if sync
            cont res
            res
          else new Promise (resolve, reject)->
            succeedPromise = resolve
            failPromise = reject
        catch err
          if failPromise then failPromise err
          else throw err

      codeFor = (codeObject)->
        if typeof codeObject == 'string' then codeObject
        else if codeObject.map? then jsCodeFor codeObject
        else codeObject.code

      codeMap = (sourceNode, content, fileName, tagContext)->
        fileName = fileName ? currentGeneratedFileName()
        cm = sourceNode.toStringWithSourceMap(file: fileName)
        cm.map.setSourceContent fileName, content
        if tagContext then cm.useContext = true
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
              runNextResult results, env, ((finalResults)->
                setValue 'parser_funcProps', old
                (cont ? (x)->x)(finalResults)), errCont, []
        catch err
          callFail errCont, err

      runNextResult = (results, env, cont, errCont, finalResults)->
        while results != rz(L_nil)
          if getType(results.head().tail()) == 'left'
            v = results.head().tail()
            if !(getLeft(v) instanceof Error) then v = left new Error getLeft v
            finalResults.push cons results.head().head(), v
            env.write "ERROR: #{getLeft results.head().tail()}"
          else
            sync = true
            async = true
            try
              setLounge env, => runMonad2 getRight(results.head().tail()), env, (res2)->
                finalResults.push cons results.head().head(), L_right res2
                #if getType(res2) != 'unit' then env.write env.presentValue res2
                if sync then async = false
                else runNextResult results.tail(), env, cont, errCont, finalResults
            catch err
              callFail errCont, err
            sync = false
            if async then return
          results = results.tail()
        cont newConsFrom finalResults

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
        else escapeHtml stringFor(v).replace(/\r?\n/g, '\n: '))
        if _.last(str) == '\n' then str else str + '\n'

      basicFormat = (block, prefix, items)->
        if isYamlResult block
          if items.length == 1 then items = items[0]
          ': ' + (dump items, {sortKeys: true, flowLevel: Number block.codeAttributes.flowlevel ? 2}).trim().replace(/\n/g, '\n: ') + '\n'
        else prefix + _.map(items, presentHtml).join ''

      arrayify = (val)-> if _.isArray(val) then val else [val]

      writeResults = (env, values)->
        first = true
        for value in arrayify(values)
          if !first then env.write '\n'
          env.write env.presentValue value

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
        if !preceding.isEmpty() || !target.isEmpty()
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
        env.executeBlock = (block, cont)->
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

      #jsCodeFor = (codeMap)->
      #  #"#{codeMap.code}\n"
      #  "#{codeMap.code}\n//# sourceMappingURL=data:application/json;base64,#{btoa JSON.stringify codeMap.map.toJSON()}\n"

      indentCode = (str)-> str.replace /\n/g, '\n  '

      stringFor = (v)->
        str = if typeof v == 'function' then v.toString() || 'UNKNOWN'
        else if v.toString then v.toString()
        else String v
        if typeof str == 'string' then str else 'undefined'

      class Html
        constructor: (content)-> @content = stringFor content

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

## Scope class

      class Scope
        constructor: ->
          @names = []
          @nameSet = {}
          @setters = {}
          @getters = {}
          @eval = eval newEvalFuncString()
        newNames: (names)->
          newNames = _.without names, @names...
          totalNames = newNames.concat _.without @names, names...
          if !_.isEmpty newNames
            for name in newNames
              @nameSet[name] = true
            code = """
              #{('var ' + n + ' = null;' for n in newNames).join '\n  '}

              (#{newEvalFuncString()})
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

      gensymCounter = 0

      gensym = (prefix)-> "$L_#{prefix}_#{gensymCounter++}$"

      newEvalFuncString = ->
        evalVar = gensym "EXPR"
        "(function(#{evalVar}) {return eval(#{evalVar})})"

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

      localEval = ($x$)-> eval $x$

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

      escapeString = (str)-> stringFor(str).replace specials, (c)-> escaped[c]

      unescapeString = (str)-> stringFor(str).replace slashed, (c)-> unescaped[c] ? c[1]

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
        nextGeneratedFileName
        getLeisurePromise
        autoLoadEnv
        Scope
        lineColumnStrOffset
        writeResults
        runWithPromiseCont
      }
