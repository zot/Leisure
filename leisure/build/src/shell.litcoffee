Shell support for Leisure. Runs in Node.js

If a line begins with a string that is unevaluable
* try executing it as a shell command
* pass any unevaluable arguments that are strings through verbatim

    {
      execFileSync
    } = require 'child_process'
    {
      define
      booleanFor
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
    } = Leisure.Ast
    rz = resolve
    lz = lazy

    inErr = false

    global.handleError = (err, cont, text, source)->
      if inErr then throw err
      inErr = true
      try
        cont evalInput "e[#{text}]", show
      catch err2
        if err2.status && err2.stderr then cont "ERR #{trimLastNl err2.stderr.toString()}"
        else
          console.log "Shell ERROR:", err, text
          cont ''
      finally
        inErr = false

    trimLastNl = (str)-> if str[str.length - 1] == '\n' then str.substring 0, str.length - 1 else str

    asBool = (bool)-> bool instanceof Leisure_true

    define 'exec', (list)->
      if res = L_checkPartial(L_exec, arguments) then res
      else
        list = rz list
        fargs = []
        while list instanceof Leisure_cons
          t = L_head list
          arg = null
          err = null
          try
            arg = evalInput (detoken t), show, true
          catch err2
            err = err2
          if !arg?
            arg = if typeof t == 'string' then t
            else if t instanceof Leisure_token then L_tokenString t
            else if err then throw err
          fargs.push arg
          list = L_tail list
        try
          trimLastNl execFileSync.call(null, fargs[0], fargs[1..], stdio: 'pipe').toString()
        catch err
          if err.stderr then trimLastNl err.stderr.toString()
          else throw err

    detoken = (toks)->
      if toks instanceof Leisure_cons then "(#{toks.map(detoken).join ' '})"
      else L_strTokenString toks

    evalInput """
      stringify s = s["'" s "'"]
    """, identity
    evalInput """
      destructure toks = isCons toks
        toks
          \\h t D . ['cons' (destructure h) (destructure t)]
          'nil'
        isNil toks
          'nil'
          isToken toks
            toks \\t p . p \\fil ln off . ['token' (stringify t) ['filepos' (stringify fil) ln off]]
            isParens toks
              toks \\s e c . ['parens' s e (destructure c)]
              isString toks
                stringify toks
                toks
    """, identity
    evalInput """
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
    """, identity
    evalInput """
      handleDash list = do
        a1 = head list
        a1Pos = tokenFilepos a1
        a1Line = fileposLine a1Pos
        a1Off = fileposOffset a1Pos
        a2 = second list
        a2D = handleDash a2
        a2F = isNil a2D a2 a2D
        a3 = third list
        a3Str = tokenString a3
        a3Pos = tokenFilepos a3
        a3Line = fileposLine a3Pos
        a3Off = fileposOffset a3Pos
        and[
          isCons list
          (consLength list) == 3
          isToken a1
          isToken a3
          isTokenString a1 '-'
          a1Line == a3Line
          a1Off + 1 == a3Off]
          a2F == a2D
            append a2F [s['-' a3Str]]
            [a2F s['-' a3Str]]
          []
    """, identity
    evalInput """
      defMacro 'e[' \\list . ['exec' (destructure (rewriteFlags (head (stripNesting list))))]
    """, identity
    evalInput """
      defTokenPack 'shell' [[] ['e[':']'] []]
    """, identity
    evalInput """
      addStdTokenPacks ['shell']
    """, identity
