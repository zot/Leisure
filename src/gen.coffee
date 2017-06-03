###
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
###

'use strict'
define ['./base', './ast', './runtime', 'lodash', 'lib/source-map', 'browser-source-map-support', 'lib/js-yaml'], (Base, Ast, Runtime, _, SourceMap, SourceMapSupport, Yaml)->
  #SourceMapSupport?.install()
  {
    simpyCons
    resolve
    lazy
    verboseMsg
    nsLog
    isResolved
    addDebugType
  } = Base
  {
    dump
  } = Yaml
  rz = resolve
  lz = lazy
  lc = Leisure_call
  {
    nameSub
    getLitVal
    getRefName
    getLambdaVar
    getLambdaBody
    getApplyFunc
    getApplyArg
    getAnnoName
    getAnnoData
    getAnnoBody
    getLetName
    getLetValue
    getLetBody
    Leisure_lit
    Leisure_ref
    Leisure_lambda
    Leisure_apply
    Leisure_let
    Leisure_anno
    setType
    setDataType
    cons
    Nil
    define
    functionInfo
    getPos
    isNil
    getType
    ast2Json
    rangeToJson
    getPos
  } = root = Ast
  {
    Monad2
    _true
    _false
    _unit
    left
    right
    booleanFor
    newConsFrom
    dumpMonadStack
  } = Runtime

  consFrom = newConsFrom

  {
    SourceNode
    SourceMapConsumer
    SourceMapGenerator
  } = SourceMap

  varNameSub = (n)-> "L_#{nameSub n}"

  useArity = true
  megaArity = false
  curDef = null
  debugType = 'User'
  trace = false
  trace = true
  stackSize = 20
  USE_STRICT = '"use strict";\n'
  #USE_STRICT = ''

  setMegaArity = (setting)-> megaArity = setting

#########
# Code
#########

  setDebugType = (type)->
    addDebugType type
    debugType = type

  collectArgs = (args, result)->
    for i in args
      if Array.isArray i then collectArgs i, result else result.push i
    result

  locateAst = (ast)->
    [line, col] = pos = getPos(ast).toArray()
    [line,col]

  check = (bool, arg)->
    if !bool then console.log new Error("Bad sourcemap arg: #{arg}").stack

  checkChild = (child)->
    if Array.isArray child
      child.forEach checkChild
    else check (typeof child == 'string') || (child instanceof SourceNode), child

  currentFile = 'NEVERGIVENFILE.lsr'
  currentFuncName = undefined

  withFile = (file, name, block)->
    oldFileName = currentFile
    oldFuncName = currentFuncName
    currentFile = file
    currentFuncName = name
    try
      block()
    finally
      currentFile = oldFileName
      currentFuncName = oldFuncName

  sn = (ast, str...)->
    [line, offset] = locateAst ast
    check typeof line == 'number', 'line'
    check typeof offset == 'number', 'offset'
    checkChild str
    if line < 1 then line = 1
    if currentFile == 'NEVERGIVENFILE.lsr'
      console.log new Error("SN CALLED WITHOUT FILE").stack
    if currentFuncName?
      new SourceNode(line, offset, currentFile, str, currentFuncName)
    else new SourceNode(line, offset, currentFile, str)

  jstr = (str)-> JSON.stringify str

  jsCodeFor = (codeMap, mapType, externalMap)->
    code = codeMap.code
    if mapType == 'inline'
      code = code.replace /map: '@SOURCEMAP@'/, 'inlineMap: ' + jstr codeMap.map.toJSON()
    else if mapType == 'external'
      code = code.replace /map: '@SOURCEMAP@'/, 'externalMap: ' + jstr externalMap
    "#{code}\n//# sourceMappingURL=data:application/json;base64,#{btoa jstr codeMap.map.toJSON()}\n"

  functionId = 0
  codeNum = 0

  class CodeGenerator
    constructor: (fileName, @useContext, @noFile, @suppressContextCreation, @source)->
      @fileName = fileName ? "dynamic code with source #{++codeNum}"
      @startId = functionId
      @positions = []
      @createContext = !@suppressContextCreation
      @decls = []
      @declStack = []
    contextInit: ->
      if @useContext then '\n  L$F.context = L_$context;'
      else ''
    decl: (ast, dec)->
      if Leisure_generateDebuggingCode
        dec.id = @decls.length
        [line, col] = getPos(ast).toArray()
        dec.line = line
        dec.col = col
        if @declStack.length then dec.parent = _.last(@declStack).id
        @decls.push dec
        @declStack.push dec
    declLazy: (ast, arg)->
      @decl ast, lazy: true
      if arg?
        result = arg()
        @popDecl()
        result
    declLambda: (ast, name, args)-> @decl ast, lambda: name, args: args
    popDecl: ->
      if Leisure_generateDebuggingCode then @declStack.pop()
    genSource: (source, ast)->
      if @noFile
        sm = @genNode(ast).prepend(USE_STRICT + '(').add(')').toStringWithSourceMap file: @fileName
        map = JSON.parse sm.map.toString()
        result = sm.code
      else
        funcName = if ast instanceof Leisure_anno && getAnnoName(ast) == 'leisureName' then getAnnoData ast else null
        #fileName = "dynamic code with source #{++codeNum}"
        withFile @fileName, funcName, =>
          try
            sm = @genNode(ast).toStringWithSourceMap file: @fileName
            map = JSON.parse sm.map.toString()
            map.sourcesContent =  [source]
            result = sm.code
          catch err
            err.message = "Error generating code for:\n  #{source.trim().replace /\n/g, '\n  '}\n#{err.message}"
            throw err
      @endId = functionId
      jsCodeFor sm, 'inline'
    genNode: (ast)->
      result = @genUniq ast, Nil, [Nil, 0]
      @endId = functionId
      @genTopLevel ast, result
    genMap: (ast)->
      hasFile = ast instanceof Leisure_anno && getAnnoName(ast) == 'filename'
      #filename = if hasFile then getAnnoData ast else 'GENFORUNKNOWNFILE.lsr'
      filename = if hasFile then getAnnoData ast else @fileName
      nameAst = if hasFile then getAnnoBody ast else null
      funcname = if nameAst instanceof Leisure_anno && getAnnoName(nameAst) == 'leisureName' then getAnnoData nameAst else currentFuncName
      sub = withFile filename, null, => @genNode(ast)
      @endId = functionId
      if !funcname then sub
      else withFile filename, funcname, -> sn ast, sub
    gen: (ast)-> new SourceNode(1, 0, currentFile, ['(', @genMap(ast), ')']).toStringWithSourceMap(file: currentFile).code
    genUniq: (ast, names, uniq)->
      switch ast.constructor
        when Leisure_lit then sn ast, jstr getLitVal ast
        when Leisure_ref then sn ast, "resolve(", (@genRefName ast, uniq, names, true), ")"
        when Leisure_lambda then @genLambda ast, names, uniq
        when Leisure_apply
          if useArity then @genArifiedApply ast, names, uniq, arity
          else sn ast, (@genUniq (getApplyFunc ast), names, uniq), "(", (@genApplyArg (getApplyArg ast), names, uniq), ")"
        when Leisure_let then sn ast, "(function(){", (@genLets ast, names, uniq), "})()"
        when Leisure_anno
          name = getAnnoName ast
          data = getAnnoData ast
          if name == 'arity' && useArity && data > 1
            @genArifiedLambda (getAnnoBody ast), names, uniq, data
          else
            try
              if trace && name == 'leisureName'
                oldDef = curDef
                curDef = data
              else if name == 'debug'
                oldDebugType = debugType
                setDebugType data
              else if name == 'define' then @declLazy getAnnoBody ast
              genned = @genUniq (getAnnoBody ast), names, uniq
              if name == 'debug' then debugType = oldDebugType
              switch name
                when 'type' then sn ast, "setType(", (genned), ", '", data, "')"
                when 'dataType' then sn ast, "setDataType(", genned, ", '", data, "')"
                when 'define'
                  [funcName, arity, src] = data.toArray()
                  @popDecl()
                  sn ast, "define('", funcName, "', ", lazify(ast, genned), ", ", arity, ", ", jstr(src), ")"
                when 'leisureName' then genned
                else genned
            finally
              if trace && name == 'leisureName' then curDef = oldDef
        else "CANNOT GENERATE CODE FOR UNKNOWN AST TYPE: #{ast}, #{ast.constructor} #{Leisure_lambda}"
    genArifiedApply: (ast, names, uniq)->
      args = []
      func = ast
      while dumpAnno(func) instanceof Leisure_apply
        args.push getApplyArg dumpAnno func
        func = getApplyFunc dumpAnno func
      args.reverse()
      defaultArity = false
      if args.length > 1 && ((dmp = dumpAnno(func)) instanceof Leisure_ref) && (((info = functionInfo[funcName = getRefName dmp]) && ((info.newArity && (arity = info.arity) && arity <= args.length) || (!arity && megaArity))) || (!info && isNil names.find (el)-> el == funcName))
        if defaultArity = !arity then arity = args.length
        argCode = []
        argCode.push ast
        if defaultArity then argCode.push 'L$('
        argCode.push @genUniq func, names, uniq
        if defaultArity then argCode.push ')('
        else argCode.push '('
        for i in [0...arity]
          if i > 0 then argCode.push ', '
          argCode.push sn args[i], @genApplyArg args[i], names, uniq
        argCode.push ')'
        for i in [arity...args.length] by 1
          argCode.push '(', (sn args[i], @genApplyArg args[i], names, uniq), ')'
        sn argCode...
      else
        ast = dumpAnno ast
        sn ast, (@genUniq (getApplyFunc ast), names, uniq), "(", (@genApplyArg (getApplyArg ast), names, uniq), ")"
    genLambda: (ast, names, uniq)->
      name = getLambdaVar ast
      u = addUniq name, names, uniq
      n = cons name, names
      argName = (uniqName name, u)
      @declLambda ast, curDef, [name]
      bodyCode = @genUniq (getLambdaBody ast), n, u
      code = sn ast, "function(#{argName}){return ", @genTraceCall(ast, bodyCode, argName), ";}"
      #addLambdaProperties ast, @genLambdaDecl ast, 'L$F.length', code
      result = @genLambdaDecl ast, '1', addLambdaProperties ast, code
      @popDecl()
      result
    genArifiedLambda: (ast, names, uniq, arity)->
      if arity < 2 then @genLambda ast, names, uniq, 0
      else
        args = getNArgs(arity, ast).toArray()
        argList = _.map(args, ((x)-> 'L_' + x)).join ', '
        @declLambda ast, curDef, names
        bodyCode = @genUniq(getNthLambdaBody(ast, arity), names, uniq)
        code = sn ast, """
          function(#{argList}) {
            return L_checkPartial(L$F, arguments, Leisure_tracePartial#{debugType}) || """, @genTraceCall(ast, bodyCode, argList), """;
          };
        """
        #result = addLambdaProperties ast, @genLambdaDecl ast, args.length, code
        result = @genLambdaDecl ast, args.length, addLambdaProperties ast, code
        annoAst = ast
        while annoAst instanceof Leisure_anno
          name = getAnnoName annoAst
          data = getAnnoData annoAst
          switch name
            when 'type' then result = sn ast, "setType(", result, ", '", data, "')"
            when 'dataType' then result = sn ast, "setDataType(", result, ", '", data, "')"
          annoAst = getAnnoBody annoAst
        @popDecl()
        result
    genRefName: (ref, uniq, names, checkMacro)->
      name = getRefName ref
      if isNil (val = names.find (el)-> el == name)
        vname = varNameSub name
        if !(window ? global)[vname] && Leisure.stateValues.macroDefs?.map.has name
          throw new Error "Attempt to use a macro as a value: #{name}"
        ns = findName nameSub name
        if ns == root.currentNameSpace then nsLog "LOCAL NAME: #{name} FOR #{root.currentNameSpace} #{location ref}"
        else if !ns then nsLog "GUESSING LOCAL NAME #{name} FOR #{root.currentNameSpace} #{location ref}"
        vname
      else uniqName name, uniq
    genApplyArg: (arg, names, uniq)->
      d = dumpAnno arg
      if d instanceof Leisure_apply
        @declLazy arg, => @lazify d, @genUniq arg, names, uniq
      else if d instanceof Leisure_ref then @genRefName d, uniq, names
      else if d instanceof Leisure_lit then sn arg, jstr getLitVal d
      else if d instanceof Leisure_let
        @declLazy arg, => @lazify arg, (@genUniq arg, names, uniq)
      else if d instanceof Leisure_lambda then sn arg, 'lazy(', (@genUniq arg, names, uniq), ')'
      else @declLazy arg, => @lazify arg, (@genUniq arg, names, uniq)
    genLetAssign: (arg, names, uniq)->
      @declLazy arg, => @lazify arg, (@genUniq arg, names, uniq)
    lazify: (ast, body)->
      if Leisure_generateDebuggingCode then id = _.last(@decls).is
      code = lazify ast, body, true
      if Leisure_generateDebuggingCode
        sn ast, """
          (function(L$instance, L$parentInstance){
            return Leisure_traceLazyValue#{debugType}(L$context, #{id}, L$instance, """, code, """);
          })(++Leisure_traceInstance, L$instance)
        """
      else code
    genLets: (ast, names, uniq)->
      bindings = letList ast, []
      [letUniq, decs, assigns, ln] = _.reduce bindings, ((result, l)=>
        [u, code, assigns, ln] = result
        newU = addUniq (getLetName l), ln, u
        letName = uniqName (getLetName l), newU
        newNames = cons (getLetName l), ln
        [newU,
          (cons (sn ast, letName + ' = ', @genLetAssign(getLetValue(l), newNames, u)), code),
          (cons letName, assigns),
          newNames]), [uniq, Nil, Nil, names]
      sn ast, "  var ", assigns.reverse().intersperse(', ').toArray(), ";\n  ", decs.reverse().intersperse(';\n  ').toArray(), ";\n\n  return ", (@genUniq (getLastLetBody ast), ln, letUniq)
    genTraceCall: (ast, code, argNames)->
      if Leisure_generateDebuggingCode then sn ast, """
        (
          Leisure_traceCall#{debugType}(L$F, #{argNames}),
          Leisure_traceReturn#{debugType}(L$F, (""", code, """))
        )
      """
      else code
    genLambdaDecl: (ast, length, code)->
      if curDef
        nameCode = jstr curDef
        curDef = null
      else nameCode = 'undefined'
      if Leisure_generateDebuggingCode
        sn ast, """
          (function(L$instance, L$parent){
            var L$F = """, code, """;
            L$F.leisureLength = #{length};
            L$F.L$instanceId = L$instance;
            Leisure_traceLambda#{debugType}(L$instance, L$F, L$context, #{_.last(@declStack).id}, L$parent);
            return L$F;
          })(++Leisure_traceInstance, L$instance)
        """
      else sn ast, """
        (function(){
          var L$F = """, code, """;
          L$F.leisureLength = #{length};
          return L$F;
        })()
      """
    genAddSource: ->
      if @source then "\n  Leisure_addSourceFile(@fileName, #{jstr @source});"
      else ''
    genTraceMemos: ->
      # memos for trace codes
      ''
    genTopLevel: (ast, node)->
      if dumpAnno(ast).constructor in [Leisure_lit, Leisure_ref] then node
      else if Leisure_generateDebuggingCode
        header = "var L$ret;"
        if @createContext then header += @genContext()
        sn ast, """
          (function(L$instance){
            #{header}
            return """, node, """;
          })(++Leisure_traceInstance)
        """
      else node
    genContext: ->
      source = if @source || @noFile then """
        source: Leisure_addSourceFile(#{jstr @fileName}, #{jstr @source}),
            map: '@SOURCEMAP@'
      """
      else if @sourceMap then """
        source: #{jstr @fileName},
            map: '@SOURCEMAP@'
      """
      else """
        source: #{jstr @fileName}
      """
      decls = []
      for decl in @decls
        type = if decl.lazy then 'lazy' else 'lambda'
        decls.push type, decl.line, decl.col, decl.parent
        if decl.lambda then decls.push decl.name, decl.args.length, decl.args...
      """
        \n  var L$context = Leisure_traceTopLevel#{debugType}({
            id: Leisure_traceContext++,
            #{source},
            decls: #{JSON.stringify decls}
          });
      """

  lazify = (ast, body, hasId)->
    if Leisure_generateDebuggingCode then sn ast, """
      function(){
        return Leisure_traceResolve#{debugType}(L$instance, """, body, """);
      }
    """
    else sn ast, """
      function(){
        return """, body, """;
      }
    """

  findName = (name)->
    for i in [root.nameSpacePath.length - 1 .. 0]
      if LeisureNameSpaces[root.nameSpacePath[i]]?[name] then return root.nameSpacePath[i]
    if root.currentNameSpace && LeisureNameSpaces[root.currentNameSpace][name] then root.currentNameSpace
    else null

  location = (ast)->
    [line, col] = locateAst ast
    "#{line}:#{col}"

  getLambdaArgs = (ast)->
    args = []
    while ast instanceof Leisure_lambda
      args.push getLambdaVar ast
      ast = getLambdaBody ast
    [args, ast]

  getNthLambdaBody = (ast, n)->
    if n == 0 then ast
    else if (d = dumpAnno ast) instanceof Leisure_lambda then getNthLambdaBody getLambdaBody(d), n - 1
    else throw new Error "Expected lambda but got #{ast}"

  (window ? global ? {}).curryCall = curryCall = (args, func)->
    f = func args[0]
    for i in [1...args.length]
      f = f args[i]
    f

  getNArgs = (n, ast)->
    d = dumpAnno ast
    if !n then Nil else cons (getLambdaVar d), getNArgs n - 1, getLambdaBody d

  specialAnnotations = ['type', 'dataType', 'define']

  arrayify = (cons)->
    if cons instanceof Leisure_cons then cons.map((el)-> arrayify el).toArray()
    else cons

  getLambdaProperties = (body, props)->
    if body instanceof Leisure_anno
      if !_.includes specialAnnotations, getAnnoName(body)
        if !props then props = {}
        value = getAnnoData body
        props[getAnnoName body] = arrayify value
      getLambdaProperties getAnnoBody(body), props
    props

  addLambdaProperties = (ast, def, extras)->
    props = getLambdaProperties getLambdaBody ast
    if props || extras
      p = {}
      if props then _.merge p, props
      if extras then _.merge p, extras
      sn ast, "setLambdaProperties(", def, ", ", (jstr p), ")"
    else def

  lcons = (a, b)-> rz(L_cons)(lz a)(lz b)
  parseErr = (a, b)-> rz(L_parseErr)(a, b)

  lconsFrom = (array)->
    if array instanceof Array
      p = rz L_nil
      for el in array.reverse()
        p = lcons lconsFrom(el), p
      p
    else array

  assocListProps = null

  getAssocListProps = ->
    if !assocListProps
      assocListProps = lcons lcons('assoc', 'true'), rz(L_nil)
      assocListProps.properties = assocListProps
    assocListProps

  lacons = (key, value, list)->
    alist = lcons lcons(key, value), list
    alist.properties = getAssocListProps()
    alist

  (window ? global).setLambdaProperties = (def, props)->
    p = rz L_nil
    for k, v of props
      p = lacons k, lconsFrom(v), p
    def.properties = p
    def

  (global ? window).L$convertError = (err, args)->
    if !err.L_stack
      console.log 'CONVERTING ERROR:', err
      (global ? window).ERR = err
      err.L_stack = args.callee.L$stack
      err.L_args = args
    err

  dumpAnno = (ast)-> if ast instanceof Leisure_anno then dumpAnno getAnnoBody ast else ast

  addUniq = (name, names, uniq)->
    if (names.find (el)-> el == name) != Nil
      [overrides, num] = uniq
      [(cons (cons name, "#{name}_#{num}"), overrides), num + 1]
    else uniq

  uniqName = (name, uniq)->
    [uniq] = uniq
    kv = uniq.find ((el)-> el.head() == name), uniq
    varNameSub (if kv != Nil then kv.tail() else name)

  letList = (ast, buf)->
    if ast instanceof Leisure_let
      buf.push ast
      letList getLetBody(ast), buf
    else buf

  getLastLetBody = (ast)-> if ast instanceof Leisure_let then getLastLetBody getLetBody ast else ast

  define 'debugType', (lvl)->
    new Monad2 'debugType', (env, cont)->
      setDebugType String rz lvl
      cont _unit

  define 'debugMessage', (type, msg)-> checkPartial(L_vectorRemove, arguments) || (
    new Monad2 'debugMessage', (env, cont)->
      count = (window ? global)["Leisure_traceMessage#{rz type}"] rz msg
      env.writeTraceMessage count, rz msg
      cont _unit)

  define 'traceOff', new Monad2 'traceOff', (env, cont)->
    trace = false
    cont _unit

  define 'traceOn', new Monad2 'traceOn', (env, cont)->
    trace = true
    cont _unit

  define 'runAst', ((code)->(ast)->
    new Monad2 'runAst', (env, cont)->
      #console.log "running code", code
      jsCode = null
      try
        jsCode = if env.fileName then withFile env.fileName, null, =>
          new CodeGenerator(env.fileName, false, true).genSource null, rz(ast)
        else new CodeGenerator().genSource rz(code), rz(ast)
        cont eval jsCode
      catch err
        dumpMonadStack err, env
        codeMsg = (if jsCode then "CODE: \n#{jsCode}\n" else '')
        baseMsg = "\n\nParse error: #{err.message}\n#{codeMsg}AST: "
        err.message = "#{baseMsg}#{ast()}"
        err.L$ast = ast
        cont err), null, null, null, 'parser'

  define 'genAst', ((ast)->
    try
      gen rz ast
    catch err
      parseErr (lz '\n\nParse error: ' + err.toString() + "AST: "), (ast)), null, null, null, 'parser'


#####
# TMP HOOKS
#####

#####
# END TMP HOOKS
#####

  gen = (ast)-> new CodeGenerator().gen ast
  genMap = (ast, fileName)->
    new CodeGenerator(fileName, false, false, fileName).genMap ast
  genSource = (source, ast)-> new CodeGenerator().genSource source, ast

  {
    gen
    genMap
    genSource
    sourceNode: sn
    withFile
    curryCall
    #useNameSpace: useNameSpace
    #pushNameSpace: pushNameSpace
    #getNameSpacePath: getNameSpacePath
    #clearNameSpacePath: clearNameSpacePath
    #saveNameSpace: saveNameSpace
    #restoreNameSpace: restoreNameSpace
    SourceNode
    SourceMapConsumer
    SourceMapGenerator
    setMegaArity
    CodeGenerator
    setDebugType
    jsCodeFor
  }
