Leisure's UI system uses a piece of data's "type" and the "context" (a string) to
choose a handlebars template.

    define ['handlebars'], (Handlebars)->
      {
        compile
        create
        registerHelper
      } = Handlebars

      templates = {}
      controllers = {}
      root = null
      activating = false

      viewKey = (type, context)->
        if context then "#{type.trim()}/#{context.trim()}" else type?.trim()

      addView = (type, context, template)->
        templates[viewKey type, context] = compile template

      removeView = (type, context, template)->
        delete templates[viewKey type, context]

      hasView = (type, context)-> templates[viewKey type, context]

      withContext = (context, func)->
        oldContext = root.context
        root.context = context
        try
          value = func()
        finally
          root.context = oldContext
        value

      mergeContext = (subcontext, func)->
        withContext _.merge({}, root.context, subcontext), func

      Handlebars.registerHelper 'view', (item, contextName, options)->
        if !options
          options = contextName
          contextName = null
        data = if typeof item == 'string'
          block = context.editor.options.getBlock data
          block?.yaml
        else if item?.yaml && item._id
          block = item
          item.yaml
        else
          block = null
          item
        if data?.type
          renderView data.type, contextName, data, null, false, block

      renderView = (type, contextName, data, targets, block)->
        isTop = !root.context?.topView
        key = viewKey type, contextName
        template = templates[key]
        settings =
          type: type
          contextName: contextName
        if isTop
          settings.subviews = {}
          if block then settings.subviews[block._id] = true
        attrs = "class='view' data-view='#{key}'"
        if block then attrs += " data-view-block='#{block._id}'"
        if targets
          if !isTop && block then root.context.subviews[block._id] = true
          for node in targets
            settings.view = node
            mergeContext settings, ->
              root.context.data = data
              if block then root.context.block = block
              if isTop then root.context.topView = node
              html = template data, data: root.context
              if isTop then attrs += " data-ids='#{settings.subviews.join ' '}'"
              html = "<span #{attrs}>'#{html}</span>"
            activateScripts node
        else if block
          root.context.subviews[block._id] = true
          "<span#{attrs}>#{template data, data: root.context}</span>"
        else template data, data: root.context

      activateScripts = (el)->
        if !activating
          activating = true
          try
            for script in $(el).find('script')
              if !script.type || script.type == 'text/javascript'
                newScript = document.createElement 'script'
                newScript.type = 'text/javascript'
                newScript.textContent = script.textContent
                newScript.src = script.src
                root.currentScript = newScript
                script.parentNode.insertBefore newScript, script
                script.remove()
            for script in $(el).find('script[type="text/coffeescript"]').add($(el).find 'script[type="text/literate-coffeescript"]')
              root.currentScript = script
              CoffeeScript.run script.innerHTML
          finally
            root.currentScript = null
            activating = false

      addController = (type, name, func)-> controllers[viewKey type, name] = func

      root = {
        withContext
        renderView
        addView
        removeView
        hasView
        addController
        context: null
      }
