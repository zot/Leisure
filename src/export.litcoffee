Browser exports

    define ->
      root = (window ? global).Leisure = (window ? global).Leisure ? {}

      mergeExports = (exports)->
        for k, v of exports
          root[k] = v
        exports

      (window ? global).Leisure = root

      root.mergeExports = mergeExports

      {
        mergeExports
      }
