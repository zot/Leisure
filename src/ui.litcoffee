Leisure's UI system uses a piece of data's "type" and the "context" (a string) to
choose a handlebars template.

    define ['handlebars', 'cs!./export.litcoffee', 'cs!./editor.litcoffee'], (Handlebars, Exports, Editor)->
      {
        compile
        create
        registerHelper
      } = Handlebars
      {
        mergeExports
      } = Exports
      {
        escapeHtml
      } = Editor

      templates = {}
      controllers = {}
      root = null
      activating = false
      viewIdCounter = 0
      pendingViews = []
      imageRefreshCounter = 0

      nextImageSrc = (src)->
        if (slide = root.context.currentView?.closest '.slideholder')?.length
          slide.attr 'imgCount', imageRefreshCounter
        if (hashLoc = src.indexOf '#') == -1 then hashLoc = src.length
        "#{src.substring(0, hashLoc)}##{imageRefreshCounter}"

      prevImageSrc = (src)->
        count = if (slide = root.context.currentView?.closest '.slideholder')?.length
          Number slide.attr 'imgCount'
        else imageRefreshCounter - 1
        if (hashLoc = src.indexOf '#') == -1 then hashLoc = src.length
        "#{src.substring(0, hashLoc)}##{count}"

      refreshImage = (img)->
        if img.src.indexOf("file:") == 0
          newImg = document.createElement('img')
          newImg.onload = -> $(img).replaceWith newImg
          newImg.src = nextImageSrc img.src

      viewKey = (type, context)->
        if context then "#{type.trim()}/#{context.trim()}" else type?.trim()

      addView = (type, context, template)->
        templates[name = viewKey type, context] = compile template
        Handlebars.registerPartial name, "{{#viewWrapper '#{name}' this}}#{template}{{/viewWrapper}}"

      removeView = (type, context, template)->
        delete templates[name = viewKey type, context]
        Handlebars.unregisterPartial name

      getView = hasView = (type, context)-> templates[viewKey type, context] || templates[type]

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

      Handlebars.registerHelper 'viewWrapper', (name, data, opts)->
        simpleRenderView "data-view='#{name}' class='view'", name, opts.fn, this

      renderView = (type, contextName, data, targets, block)->
        isTop = !root.context?.topView
        key = viewKey type, contextName
        if !(template = templates[key])
          key = type
          contextName = null
          if !(template = templates[key]) then return
        settings =
          type: type
          contextName: contextName
        if isTop
          settings.subviews = {}
          if block then settings.subviews[block._id] = true
        attrs = "data-view='#{key}'"
        classAttr = 'view'
        for attr, value of root.context.viewAttrs ? {}
          if attr == 'class' then classAttr += " #{value}"
          else attrs += " #{attr}='#{value}'"
        attrs += " class='#{classAttr}'"
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
              if isTop then attrs += " data-ids='#{_.keys(settings.subviews).join ' '}'"
              n = $("<span #{attrs}>#{html}</span>")
              $(node).replaceWith n
              activateScripts n, root.context
        else mergeContext settings, -> simpleRenderView attrs, key, template, data, block

      simpleRenderView = (attrs, key, template, data, block)->
        id = "view-#{viewIdCounter++}"
        do (context = root.context)->
          pendingViews.push -> activateScripts $("##{id}"), context
        attrs += " id='#{id}'"
        if block then root.context.subviews[block._id] = true
        root.context.simpleViewId = id
        "<span #{attrs}>#{template data, data: root.context}</span>"

      initializePendingViews = ->
        imageRefreshCounter++
        p = pendingViews
        pendingViews = []
        for func in p
          func()

      activateScripts = (el, context)->
        if !activating
          withContext _.merge({}, context), ->
            root.context.currentView = el
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
              controllers[$(el).attr 'data-view']?.initializeView(el, context.data)
              for img in el.find 'img'
                refreshImage img
            finally
              root.currentScript = null
              activating = false

      addController = (type, name, func)-> controllers[viewKey type, name] = func

      removeController = (type, name, func)-> delete controllers[viewKey type, name]

      getPendingViews = -> pendingViews

      pushPendingInitialzation = (pending)-> pendingViews.push pending

      getPanel = (view)-> $(view).closest '.expandable-panel'

      configurePanels = (view)->
        $(view).find('.hidden-panel').children().filter('.label')
          .append(" <i class='fa fa-arrow-right'></i>")
          .button()
        $(view).find('.expandable-panel').children().filter('.label')
          .append(" <i class='fa fa-arrow-left'></i><i class='fa fa-arrow-right'></i>")
          .button()
          .on 'click', ->
            getPanel(this).addClass 'expand'
            getPanel(this).find("[name='hiddenFocus']")[0].focus()
        ep = $(view).find '.expandable-panel'
        $("<input name='hiddenFocus' class='hiddenTextField'>").appendTo ep
        ep.mouseenter -> getPanel(this).removeClass 'contract'
        ep.click ((e)-> if !$(e.target).closest('input,button').length
          getPanel(this).find("[name='hiddenFocus']")[0].focus())
        ep.find('input').focus -> getPanel(this).addClass 'expand'
        ep.find('input').blur -> getPanel(this).removeClass 'expand'
        ep.find('button').click -> getPanel(this).addClass 'contract'

      showMessage = (node, title, str, opts, func)->
        dialog = $("<div title=#{escapeAttr title}><div>#{str}</div></div>")
          .appendTo node
          .dialog _.merge {close: -> dialog.remove()}, opts ? {}
        func?(dialog)

      escapeAttr = (text)->
        escapeHtml(text).replace /['"&]/g, (c)->
          switch c
            when '"' then '&quot;'
            when "'" then '&#39;'
            when '&' then '&amp;'

      root = mergeExports(
        UI: {
          withContext
          mergeContext
          renderView
          addView
          removeView
          hasView
          getView
          addController
          removeController
          initializePendingViews
          getPendingViews
          viewKey
          configurePanels
          context: null
          showMessage
          escapeAttr
          refreshImage
          nextImageSrc
          prevImageSrc
          pushPendingInitialzation
        }
      ).UI
