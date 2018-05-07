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

    global.handleError = (err, cont, text)->
      if inErr then throw err
      inErr = true
      global.ERR = err
      try
        runMonad2 (rz(L_simplify) lz text), replEnv, (result)->
          global.RESULT = result
          cont trimLastNl lExec L_head(result), L_map(lz((x)->
            r = rz x
            try
              evalInput toText(r), show
            catch err
              if typeof r == 'string' then r else throw err), L_tail(result))
      catch err2
        if err2.status && err2.stderr
          #console._stderr.write err2.stderr.toString()
          #cont ''
          cont "ERR #{trimLastNl err2.stderr.toString()}"
        else
          global.ERR2 = err2
          global.ERR = err
          console.log "Shell ERROR:", err, text
      finally
        inErr = false

    toText = (list)->
      if list instanceof Leisure_cons
        result = '('
        first = true
        while list instanceof Leisure_cons
          if first then first = false else result += ' '
          global.LIST = list
          result += toText rz list.head()
          list = list.tail()
        result + ')'
      else list

    trimLastNl = (str)-> if str[str.length - 1] == '\n' then str.substring 0, str.length - 1 else str

    lExec = define 'exec', (cmd, args)->
      if res = L_checkPartial(L_eq, arguments) then res
      else execFileSync.call(null, rz(cmd), rz(args).toArray().map(show), stdio: 'pipe').toString()

    evalInput """
    do
      addTokenGroup 'exec[' ']'
      defMacro 'exec[' \\list . ['exec' (head (head (head list)))]
    """, identity
