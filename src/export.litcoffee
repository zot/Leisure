Browser exports

    define ->
      root = window.Leisure = window.Leisure ? {}

      mergeExports = (exports)->
        for k, v of exports
          root[k] = v

      window.Leisure = root

      {
        mergeExports
      }
