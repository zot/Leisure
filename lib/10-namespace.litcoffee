Namespace definition

    if window?
      window.App = {}
      root = window.Leisure = {}
    else
      global.App = {}
      root = global.Leisure = {}

    delay = (time, func)->
      if typeof time == 'function'
        func = time
        time = 1
      setTimeout func, time

    root.delay = delay
