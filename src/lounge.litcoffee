Lounge accessors

    define ['./export'], (Exports)->
      {
        mergeExports
      } = Exports

      getBlockNamed = (name)-> Lounge.opts.data.getBlockNamed name

      mergeExports {
        getBlockNamed
      }

      {}
