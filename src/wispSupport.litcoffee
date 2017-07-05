Clojure support for Lounge

    define ['./eval', './docOrg', 'bluebird', './gen', 'immutable', './editor', './editorSupport', 'acorn', 'lodash', 'jquery'], (Eval, DocOrg, Bluebird, Gen, Immutable, Editor, EditorSupport, Acorn, _, $)->
      {
        setLounge
        parseIt
        Scope
        lineColumnStrOffset
        presentHtml
      } = Eval
      {
        blockSource
      } = DocOrg
      {
        Promise
      } = Bluebird
      {
        SourceNode
        SourceMapConsumer
        SourceMapGenerator
        jsCodeFor
      } = Gen

      Leisure.WispNS = lounge: tools: {}
      Wisp = null
      wispCompile = null
      wispFileCounter = 0
      modules =
        immutable: Immutable
        eval: Eval
        "doc-org": DocOrg
        editor: Editor
        "editor-support": EditorSupport
        lodash: _
        jquery: $

      class WispScope extends Scope
        constructor: (nsName)->
          super()
          @_ns_ = id: nsName
          @exports = {}
        wispEval: (s)->
          try
            Leisure.wispScope = this
            @eval s
          finally
            Leisure.wispScope = null

      wispRequire = (s, base)->
        s = new URL(s, 'http://x\/' + base.replace(/\./g, "\/")).pathname.replace(/^\//, '').replace /\//g, '.'
        _.get(modules, s) || findNs(s).exports

      findNs = (nsName, create)->
        scope = _.get Leisure.WispNS, nsName
        if !scope && create
          _.set Leisure.WispNS, nsName, scope = new WispScope nsName
        scope

      wp = null

      translateIdentifierWord = null

      wispPromise = ->
        wp || (wp = new Promise (resolve, reject)->
          req = window.require
          window.require = null
          requirejs ['lib/wisp'], (W)->
            Leisure.Wisp = modules.wisp = Wisp = W
            {translateIdentifierWord} = W.backend.escodegen.writer
            baseWispCompile = Wisp.compiler.compile
            window.require = req
            wispCompile = (args...)->
              node = baseWispCompile args...
              if node.error then throw node.error
              node
            Leisure.wispCompilePrim = wispCompile
            Leisure.wispCompileBase = baseWispCompile
            exports = Leisure.WispNS.lounge.tools
            newMacroDef = wispCompile """
              (defn expand-defmacro
                "Like defn, but the resulting function name is declared as a
                macro and will be used as a macro by the compiler when it is
                called."
                [&form id & body]
                (let [fn (with-meta `(defn ~id ~@body) (meta &form))
                      form `(do ~fn ~id)
                      ast (analyze form)
                      code (compile ast)
                      nsObj (or (and Leisure.wispScope Leisure.wispScope.*ns*) *ns*)
                      nsName (if nsObj (:id nsObj))
                      ns (or Leisure.wispScope (and *ns* (Leisure.wispFindNs nsName)))
                      wrapped (if ns
                                (str \"(function(){var exports = Leisure.WispNS.\" (:id (:_ns_ ns)) \".exports; return \" code \";})()\")
                                code)
                      macro (if ns
                              (.eval ns wrapped)
                              (eval code))]

                (if window.DEBUG_WISP (do debugger 3))


                  (install-macro! id macro)
                  nil))
              (install-macro! 'defmacro (with-meta expand-defmacro {:implicit [:&form]}))
            """
            eval """
              (function() {
                var symbol = Leisure.Wisp.ast.symbol;
                var meta = Leisure.Wisp.ast.meta;
                var withMeta = Leisure.Wisp.ast.withMeta;
                var gensym = Leisure.Wisp.ast.gensym;
                var installMacro = Leisure.Wisp.expander.installMacro;
                var list = Leisure.Wisp.sequence.list;
                var vec = Leisure.Wisp.sequence.vec;
                var analyze = Leisure.Wisp.analyzer.analyze;
                var compile = Leisure.Wisp.backend.escodegen.writer.compile;

                #{newMacroDef.code}
              })()
            """
            resolve wispCompile)

Compile Wisp code, optionally in a namespace.

      class Compiler
        constructor: ->
        compile: (s, @nsName, @wrapFunction, @returnList)->
          @reqs = ''
          @splice = ''
          @exportLocs = []
          @pad = if @wrapFunction then '  ' else ''
          try
            oldScope = Leisure.wispScope
            if @nsName && newScope = findNs @nsName
              Leisure.wispScope = newScope
            @result = wispCompile s, "source-uri": "wispEval-#{wispFileCounter++}"
          finally
            if newScope then Leisure.wispScope = oldScope
          if @declaresNs = (@result.ast[0].op == 'ns')
            @nsName = @result.ast[0].form.tail.head?.name
          nameSpace: @handleNameSpace()
          code: @scanNodes()
        handleNameSpace: ->
          @gennedNs = true
          #needsExports = _.find @result.ast, (n)-> n.op == 'def'
          needsExports = true
          if @nsName
            nsObj = findNs @nsName, true
            names = {}
            findExports @result.ast, names, @exportLocs
            #for node in @result.ast when node.op == 'def'
            #  names[translateIdentifierWord node.id.id.name] = true
            if @declaresNs && @result.ast[0].require
              for req in @result.ast[0].require
                for ref in req.refer
                  names[translateIdentifierWord (ref.rename ? ref.name).name] = true
            nsObj.newNames _.keys names
            if needsExports
              if @wrapFunction then @reqs += "exports = exports || window.Leisure.WispNS.#{@nsName}.exports;\n"
              else @reqs += "var exports = window.Leisure.WispNS.#{@nsName}.exports;\n"
            if @result.ast[0].require then @reqs += """
              var require = function(s) {
                return Leisure.wispRequire(s, '#{translateIdentifierWord @nsName}');
              };

            """
            if @declaresNs then @reqs += """
              _ns_ = {
                id: '#{@nsName}',
                doc: void 0
              };

            """
            else if @result.ast[0].doc then @splice = """
              exports._ns_.doc = _ns_.doc;

            """
            @end = @result.ast[0].end ? line: 0, column: 0
            if @pad then @splice = @splice.replace /\n/g, '\n' + @pad
            @gennedNs = false
          else if needsExports
            if @wrapFunction then @reqs += "exports = exports || {};\n"
            else @destroyExports = true
          if @pad then @reqs = @reqs.replace /\n/g, '\n' + @pad
          nsObj
        scanNodes: ->
          if @returnList
            exprs = _.filter _.map(@result.ast, (n, i)=>
              if !(n.op in ['def', 'ns']) && n.form && !(n.op == 'var' && n.form.name == 'debugger') then @result['js-ast'].body[i].loc), identity
            if exprs.length then @reqs += "var $ret$ = [];\n"
            else @returnList = false
          else if @wrapFunction then addReturn = true
          # splice in export, require, and namespace code at proper position
          # edit out "var " occurances because Scope objects already declare the variables
          # if returning a list, add expr results to list
          # replace the bottom source-mapping comment with a new one
          head = []
          tail = []
          foundEnd = false
          startedPush = false
          exprPos = 0
          returnNode = null
          destroyingExport = false
          # prevCode lookback hack for inserting 'push(' before operation
          prevCode = code: ''
          con = SourceMapConsumer.fromSourceMap @result['source-map']
          inExpr = false
          declaredNs = false
          #exportLocs = _.filter _.map @result.ast, (n)-> n.export && n.start
          nodes = SourceNode.fromStringWithSourceMap @result.code, con
          if addReturn
            addReturn = lastLoc = _.last _.filter(_.map(@result.ast, (n, i)=> if !(n.op in ['def', 'ns']) && n.form then @result['js-ast'].body[i].loc?.start), identity)
          prevLoc = line: 1, column: 0
          prevSemi = null
          nodes.walk (code, loc)=>
            if loc?.line && (loc.line > prevLoc.line || loc.column > prevLoc.column)
              prevLoc = loc
            if code.match /\/\/# sourceMappingURL=/
              foundEnd = true
              code = code.replace /\/\/# sourceMappingURL=.*/, ''
              if !code.trim() then return
            else if foundEnd then return
            if @destroyExports && !destroyingExport && code == "exports" && prevCode.code.match(/ *= */)
              destroyingExport = true
              return
            else if destroyingExport
              if code.match(/ *= */) then destroyingExport = false
              return
            if @nsName
              if prevLoc && @exportLocs.length && atOrAfter(prevLoc, @exportLocs[0]) && code.match /^ *var/
                declaredNs = true
                @exportLocs.shift()
                code = code.replace /^ *var /g, ' '
              else if !declaredNs && @declaresNs && code.match /^ *var/
                code = code.replace /^ *var /g, ' '
            closeLoc = (loc.line? && loc) || prevLoc
            if (startedPush && closeLoc.line? && ((closeLoc.line > exprs[exprPos].end.line) || (closeLoc.line == exprs[exprPos].end.line && (code.match(/^void 0;/) || closeLoc.column > exprs[exprPos].end.column))))
              startedPush = false
              if prevSemi
                c = prevSemi.node.children[0]
                c2 = c.replace(/;([ \n]*)$/, ');$1')
              if prevSemi.node && c != c2 then prevSemi.node.children[0] = c2
              else code = code.replace(/;([ \n]*)$/, ');$1')
              exprPos++
            if @returnList && !startedPush && (loc.line > exprs[exprPos]?.start.line || (loc.line == exprs[exprPos]?.start.line && loc.column >= exprs[exprPos].start.column))
              startedPush = true
              usedPrev = false
              if prevCode?.node && !prevCode.loc.line && !prevCode.node.children[0].match /;/
                c = prevCode.node.children[0]
                prevCode.node.children[0] = "$ret$.push(#{c}"
                usedPrev = true
              if !usedPrev then code = "$ret$.push(#{code}"
            if @pad then code = code.replace /\n/g, '\n' + @pad
            node = new SourceNode loc.line, loc.column, loc.source, code, loc.name
            if addReturn && !returnNode && loc.line == lastLoc.line && loc.column >= lastLoc.column - 1
              returnNode = node
            if !@gennedNs && (loc.line < @end.line + 1 || (loc.line == @end.line + 1 && loc.column < @end.column))
              head.push node
            else
              @gennedNs = true
              tail.push node
            if code.trim()
              prevCode = {code, loc, node}
              if code.match(/;[ \n]*$/) && !code.match(/^void 0;/) then prevSemi = prevCode
              if loc.line && (loc.line > prevLoc.line || (loc.line == prevLoc.line && loc.column > prevLoc.column))
                prevLoc = loc
          file = (_.find nodes.children, (n)-> n instanceof SourceNode)?.source
          children = [head, new SourceNode(1, 0, file, @splice), tail]
          if returnNode
            code = returnNode.children[0]
            if _.last(tail) == returnNode then returnNode.children[0] = "return #{code}"
            else
              returnNode.children[0] = "var $ret$ = #{code}"
              children.push "\n#{@pad}return $ret$;\n"
          else if @returnList then children.push(if @wrapFunction then "\n#{@pad}return $ret$;\n" else "\n#{@pad}$ret$;\n")
          if startedPush
            lastChildren = _.last(tail)?.children || _.last(head)?.children
            lastCode = lastChildren[lastChildren.length - 1]
            lastChildren[lastChildren.length - 1] = lastCode.replace(/;([ \n]*)$/, ');$1')
          if @reqs then children.unshift @reqs
          if @wrapFunction
            children.unshift "(function(exports, console){\n#{@pad}console = console ? console : window.console;\n#{@pad}"
            children.push '})'
          splicedResult = new SourceNode(1, 0, file, children).toStringWithSourceMap()
          if file then splicedResult.map.setSourceContent file, con.sourceContentFor file
          Acorn.parse splicedResult.code
          splicedResult.code + "\n//# sourceMappingURL=data:application/json;base64,#{btoa JSON.stringify splicedResult.map.toJSON()}\n"

      dumpNodes = (nodes)->
        output = ""
        nodes.walk (code, loc)->
          output += "#{loc.line}:#{loc.column} #{code}\n"
        output

      lastExportLoc = null

      findExports = (ast, names, exportLocs)->
        baseFindExports ast, names, exportLocs
        lastExportLoc = null

      baseFindExports = (ast, names, exportLocs)->
        if ast.start then lastExportLoc = ast.start
        names = names ? []
        if _.isArray ast
          for a in ast
            baseFindExports a, names, exportLocs
        else
          if ast.op == 'def'
            names[translateIdentifierWord ast.id.id.name] = true
            exportLocs.push lastExportLoc
          for n in ['statements', 'result', 'methods', 'init']
            if ast[n] then baseFindExports ast[n], names, exportLocs

      atOrAfter = (nodeLoc, astLoc)->
        nodeLoc.line - 1 > astLoc.line || (nodeLoc.line - 1 == astLoc.line && nodeLoc.column >= astLoc.column)

      compile = (s, nsName, @wrapFunction, returnList)->
        new Compiler().compile s, nsName, @wrapFunction, returnList

      Leisure.wispCompile = compile
      Leisure.wispEval = wispEval = (args...)->
        {nameSpace, code} = compile args...
        if nameSpace then nameSpace.wispEval code
        else eval code
      Leisure.wispRequire = wispRequire
      Leisure.wispFindNs = findNs

      sourceMapFromCode = (code)->
        new SourceMapConsumer JSON.parse atob code.substring(code.lastIndexOf '\n', code.length - 2).match(/sourceMappingURL=.*base64,([^\n]*)\n/)[1]

      codeOffset = (err, code, src, originalSrc)->
        [ign, line, column] = err.stack.match /\n +at .*:([0-9]*):([0-9]*)/
        line = Number line
        column = Number column
        {line, column} = sourceMapFromCode(code).originalPositionFor {line: line - 1, column}
        lineColumnStrOffset(src, line, column) + (originalSrc ? src).length - src.length

      envFunc = (env)->
        env.presentHtml = (str)->
          if str.toString()
            str = str.toString()
            if str.name then str = str.name
          presentHtml str.replace(/\uFEFF/g, '').replace(/\uA789/g, ':').replace(/\u2044/g, '\/')
        env.executeText = (text, props, cont)-> setLounge this, =>
          result = [Leisure.wispEval(text)]
          if cont then cont result else result
        env.executeBlock = (block, cont)->
          p = @compileBlock(block)
          if p instanceof Promise then p.then (f)-> f.call this, cont
          else p.call this, cont
        env.compileBlock = (block)->
          action = =>
            original = res = "#{blockSource(block).trim()}"
            try
              props = @data.properties(block)
              ns = props.namespace?.trim() ? undefined
              if ns
                if props.macro then macros = true
                #res = "(ns #{ns})\n#{res}"
                ns = ns.match(/^[^ ]+/)[0]
              {nameSpace, code} = compile res, ns, true, true
              func = if nameSpace then nameSpace.wispEval code else eval code
              (cont, args...)->
                env = this
                envConsole = log: (args...)-> env.write args.join ' '
                try
                  setLounge env, -> (cont ? identity) _.filter func.call(env, null, envConsole, args...), (n)-> typeof n != 'undefined'
                catch err
                  console.error err.stack ? err
                  if (cur = (env.data.getBlock block._id)) && original != blockSource(cur).trim()
                    console.error "Warning, code is from a different version of block #{block._id}"
                  env.errorAt codeOffset(err, code, res, original), err.message
                  (cont ? identity) []
            catch err
              console.error err.stack ? err
              if m = err.message.match /^([^\n]+)\nline:([^\n]+)\ncolumn:([^\n]+)(\n|$)/
                [ignore, msg, line, column] = m
                pos = lineColumnStrOffset(res, Number(line.trim()), Number(column.trim()))
                pos += original.length - res.length
                env.errorAt pos, msg
              else if code
                env.errorAt codeOffset(err, code, res, original), err.message
              else env.errorAt 0, err.message
          if wispPromise().isResolved() then action()
          else wispPromise().then action
        env.generateCode = (text, noFunc)-> debugger
        env

      Leisure.assert = (test, msg)-> assert test, msg

      (env)->
        wispPromise().then ->
          envFunc env
          resolve envFunc
