Support code for Leisure

    define ['./base', './ast', './runtime', './gen'], (Base, Ast, Runtime, Gen)->
      {
        define
        getType
        cons
        unescapePresentationHtml
      } = Ast
      {
        Node
        resolve
        lazy
        defaultEnv
      } = Base
      rz = resolve
      lz = lazy
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
        Monad2
      } = Runtime

      define 'getDataNamed', (name)->
        new Monad2 (env, cont)->
          console.log "ENV:", env
          cont env.data.getBlockNamed(rz name)?.yaml
