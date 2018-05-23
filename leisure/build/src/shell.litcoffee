Shell support for Leisure. Runs in Node.js

If a line begins with a string that is unevaluable
* try executing it as a shell command
* pass any unevaluable arguments that are strings through verbatim

    {
      execFileSync
      spawn
      spawnSync
      ChildProcess
    } = require 'child_process'
    {
      define
      booleanFor
      hasMacro
    } = Leisure.Runtime
    {
      newCall
      resolve
      lazy
      defaultEnv
      replEnv
      show
      evalInput
    } = Leisure.Base
    {
      Nil
      cons
      consFrom
      functionInfo
    } = Leisure.Ast
    {
      fiberReader
    } = require './spawn'
    
    {
      inspect
    } = require 'util'

    Fiber = require 'fibers'

    rz = resolve
    lz = lazy

    inErr = false

    reader = fiberReader()

    global.handleError = (err, cont, text, source)->
      if inErr
        console.log "ALREADY HANDLING ERROR", inErr
        console.log "BUT GOT ERROR", err
        throw err
      inErr = err
      try
        cont evalInput "e[#{text}]", (lines)->
          l = lines
          while l instanceof Leisure_cons
            console.log L_head l
            l = L_tail l
          L_unit
      catch err2
        if err2.status && err2.stderr then cont "ERR #{trimNl err2.stderr.toString()}"
        else
          console.log "Shell ERROR:", err, text
          cont ''
      finally
        inErr = false

    asBool = (bool)-> bool instanceof Leisure_true

    quote = (str)-> "'" + str.replace(/'/, "\\'") + "'"

    # extract out pipe tails that were gathered into unparenthesized lambdas
    splicePipes = (list)->
      foundPipe = false
      doScan = true
      last = list[list.length - 1]
      while doScan && last instanceof Leisure_cons && tokenString(last.head()) == '\\'
        la = last.toArray()
        if (i = la.findIndex((x)-> tokenString(x) == '|')) > -1
          foundPipe = true
          list[list.length - 1] = consFrom la[0...i]
          list[list.length...] = la[i...]
          last = list[list.length - 1]
        else doScan = false
      foundPipe

    define 'gatherProcArgs', (list)->
      list = rz list
      pargs = []
      procs = []
      l = list.toArray()
      while true
        if !splicePipes l then break
      for t in l
        tStr = L_strTokenString t
        if tStr == '|'
          procs.push pargs
          pargs = []
        else pargs.push t
      procs.push pargs
      output = null
      for proc, i in procs
        if shouldSpawn proc[0]
          cmd = tokenString proc[0]
          if cmd[0] == '$' then cmd = cmd[1..]
          proc[0] = quote cmd
          for cmd, j in proc
            if j > 0 && shouldSpawn cmd
              cmd = tokenString cmd
              if cmd[0] == '$' then cmd = cmd[1..]
              proc[j] = quote cmd
          list = 'nil'
          for arg in proc.reverse()
            p = L_position arg
            list = consFrom [(L_token 'cons', p), arg, list]
          mode = quote(switch i
            when 0 then 'first'
            else 'middle')
          proc = [(L_token 'spawnProcess', p), mode, list]
        else if i > 0 then proc = ['pipelineWrap', consFrom proc]
        else proc = ['toPipeCons', consFrom proc]
        if output then output = consFrom([consFrom(proc), output])
        else output = consFrom proc
      output

    isDefined = (cmd)-> typeof str == 'string' && (str[0] in '\\\'"' || functionInfo[str] || hasMacro(str))

    isDollar = (cmd)-> typeof str == 'string' && str[0] == '$'

    shouldSpawn = (cmd)->
      str = L_strTokenString cmd
      typeof str == 'string' && (!isDefined(str) || isDollar(cmd))

    define 'spawnProcess', (mode, list)->
      if res = L_checkPartial(L_spawnProcess, arguments) then res
      else
        mode = rz mode
        list = rz(list).toArray()
        switch mode
          when 'first'
            try
              readStream spawn(list[0], list[1..]).stdout
            catch err
              if err.stderr then consFrom [trimNl err.stderr.toString()]
              else throw err
          when 'middle'
            lz (input)->
              input = rz input
              procInput = if input instanceof ChildProcess then input.stdout else 'pipe'
              proc = spawn list[0], list[1..], stdio: [procInput, 'pipe']
              if input instanceof Leisure_cons then writeLinesToStream proc.stdin, input
              readStream proc.stdout
          else throw "#{rz(args)}"

    readStream = (stream)->
      reader.addStream stream
      lineListForStream stream

    lineListForStream = (stream)->
      line = reader.readLine stream
      if !line then L_nil
      else L_cons trimNL(line), -> lineListForStream stream

    writeLinesToStream = (stream, lines)->
      stream.on 'close', -> stream.isClosed = true
      stream.on 'finish', -> stream.isClosed = true
      stream.on 'error', -> stream.isClosed = true
      global.STREAM = stream
      pumpStream stream, lines

    # Write lines to a stream, like for piping function output to a process
    pumpStream = (stream, lines)->
      while (lines instanceof Leisure_cons) && !stream.isClosed
        line = L_head lines
        if !stream.write "#{line}\n"
          stream.once 'drain', -> pumpStream stream, L_tail(lines)
          break
        lines = L_tail lines
      if !stream.isClosed then stream.end()

    trimNL = (str)-> if str[str.length - 1] == '\n' then str.substring 0, str.length - 1 else str

    tokenString = (tok)-> L_strTokenString tok

    id = (x)-> x

    Leisure.Base.promptText = 'lsh> '

    if Leisure.Base.batchMode then reader.addStream process.stdin
    
    Leisure.Base.nextLine = ->
      if Fiber.current != reader.fiber then reader.run Leisure.Base.nextLine
      else
        while (input = reader.readLine process.stdin)?
          input = trimNL input
          if input
            Leisure.Base.processLine input
            break

    Leisure.Base.inputProcessor = (text, cont, noErrHandling)->
      if Fiber.current != reader.fiber
        reader.run -> Leisure.Base.inputProcessor text, cont, noErrHandling
      else Leisure.Base.evalInput text, cont, noErrHandling

    evalLeisure = (string, cont)-> runMonad2 L_baseLoadString('input', string), defaultEnv, cont ? id

    evalLeisure """
      stringify s = s["'" s "'"]

      rewriteFlags list = isCons list
        do
          n = handleDash list
          isNil n
            do
              x <- flat list
              n = handleDash x
              isNil n
                [(rewriteFlags x)]
                n
            n
        isNil list
          nil
          list

      handleDash list = do
        a1 = head list
        a1Pos = tokenFilepos a1
        a1Line = fileposLine a1Pos
        a1Off = fileposOffset a1Pos
        a2 = second list
        a2D = handleDash a2
        a3 = third list
        a3Str = tokenString a3
        a3Pos = tokenFilepos a3
        a3Line = fileposLine a3Pos
        a3Off = fileposOffset a3Pos
        and[
          isCons list
          (length list) == 3
          isToken a1
          (tokenString a1) == '-'
          isToken a3
          a1Line == a3Line
          a1Off + 1 == a3Off]
          isNil a2D
            [a2 s['-' a3Str]]
            append a2D [s['-' a3Str]]
          []

      # gather arguments for a pipeline
      defMacro 'e[' \\list . gatherProcArgs (rewriteFlags (stripNesting (head list)))

      toPipeCons x = isCons x
        x
        isString x
          strSplit x '\\n'
          [x]

      pipelineWrap f = compose toPipeCons f

      defTokenPack 'shell' [[] ['e[':']'] []]

      addStdTokenPacks ['shell']
    """
