Namespace definition

    if process?.versions['node-webkit']?
      global.NW = window.NW = true
    if window?
      if !window.NW? then window.NW = false
      window.ENV = 'browser'
      window.NW = false
      window.App = {}
      root = window.Leisure = window.Leisure ? {}
    else
      if !global.NW? then global.NW = false
      global.ENV = 'node'
      global.App = {}
      root = global.Leisure = global.Leisure ? {}

    delay = (time, func)->
      if typeof time == 'function'
        func = time
        time = 1
      setTimeout func, time

    root.delay = delay
