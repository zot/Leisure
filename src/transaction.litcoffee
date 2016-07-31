Note data accesses and changes.

    define ['./base', './org', './docOrg', 'lib/lodash.min', './export', './advice', 'lib/bluebird.min'], (Base, Org, DocOrg, _, BrowserExports, Advice, Bluebird)->
      {
        changeAdvice
      } = Advice
      {
        BPromise
      } = Bluebird

      getId = null

      class ChangeMonitor
        constructor: (@data)->
          @accessed = {}
          @original = {}
          @set = {}
          @deleted = {}
          if !getId then getId = Leisure.getId
        start: ->
          changeAdvice @data, true, @advice
          this
        stop: ->
          changeAdvice @data, false, @advice
          this
        advice:
          getBlock: changeMonitor: (parent)-> (thing, changes)->
            changeMonitor.accessed[getId thing] = true
            parent thing, changes
          setBlock: changeMonitor: (parent)-> (id, block)->
            id = getId id
            changeMonitor.set[id] = true
            if !changeMonitor.original[id] then changeMonitor.original[id] = @getBlock id
            parent id, block
          deleteBlock: changeMonitor: (parent)-> (id)->
            changeMonitor.deleted[id] = true
            if !changeMonitor.original[id] then changeMonitor.original[id] = @getBlock id
            parent id

      monitorChanges = (data)-> new ChangeMonitor(data).start()

      monitorChangesWhile = (data, func)->
        mon = monitorChanges data
        try
          func()
        finally
          mon.stop()

      {
        monitorChanges
        monitorChangesWhile
      }
