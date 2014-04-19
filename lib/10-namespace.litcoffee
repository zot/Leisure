Namespace definition

    root = if window? then window.Leisure = {} else global.Leisure = {}

    delay = (time, func)->
      if typeof time == 'function'
        func = time
        time = 1
      setTimeout func, time

    root.delay = delay
