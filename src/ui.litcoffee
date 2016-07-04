Leisure's UI system uses a piece of data's "type" and the "context" (a string) to
choose a handlebars template.

    define ['handlebars', './export', './editor', './coffee-script', 'immutable'], (Handlebars, Exports, Editor, CoffeeScript, Immutable)->
      {
        compile
        create
        registerHelper
      } = window.Handlebars = Handlebars
      {
        mergeExports
      } = Exports
      {
        escapeHtml
        findEditor
      } = Editor
      {
        Set
      } = Immutable

      templates = {}
      controllers = {}
      defaults =
        controllers: {}
        templates: {}
      root = null
      activating = false
      viewIdCounter = 0
      pendingViews = []
      imageRefreshCounter = 0
      localResources = {}

      getTemplates = (isDefault)-> if isDefault then defaults.templates
      else templates

      getTemplate = (type)-> templates[type] ? defaults.templates[type]

      getControllers = (isDefault)-> if isDefault then defaults.controllers
      else controllers

      getController = (type)-> controllers[type] ? defaults.controllers[type]

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
          for att in img.attributes
            newImg.setAttribute att.name, att.value
          newImg.onload = -> $(img).replaceWith newImg
          newImg.src = nextImageSrc img.src

      viewKey = (type, context)->
        if context then "#{type.trim()}/#{context.trim()}" else type?.trim()

      addView = (type, context, template, isDefault)->
        getTemplates(isDefault)[name = viewKey type, context] = compile template
        Handlebars.registerPartial name, "{{#viewWrapper '#{name}' this}}#{template}{{/viewWrapper}}"

      removeView = (type, context, template, isDefault)->
        delete getTemplates(isDefault)[name = viewKey type, context]
        Handlebars.unregisterPartial name

      getView = hasView = (type, context)->
        getTemplate(viewKey type, context) || getTemplate(type)

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

      dontRerender = (view, func)->
        oldDonts = root.context?.dontRender ? new Set()
        mergeContext {dontRender: oldDonts.add(view)}, func

      condenseHtml = (html, extreme)->
        if extreme then html.replace />\s+</g, '><'
        else
          html
            .replace(/>[ ]+<(?=[^\/])/g, '><')
            .replace(/^\s*\n/gm, '')
            .replace(/>\s+$/gm, '>')
            .replace(/^\s+<(?=[^\/])/gm, '<')

      Handlebars.registerHelper 'condense', (extreme, options)->
        if !(options && extreme)
          options = options || extreme
          extreme = false
        condenseHtml options.fn(this), extreme

      Handlebars.registerHelper 'debug', (options)->
        debugger
        ''

      Handlebars.registerHelper 'find', (name..., options)->
        data = options.data.opts.data
        items = if name.length == 1 then data.find(name[0]) else data.find name[0], name[1]
        res = "<span data-find-index='#{name[0]}'>"
        for item in items ? []
          res += options.fn data.getYaml(item), options
        res + "</span>"

      Handlebars.registerHelper 'findReverse', (name..., options)->
        data = options.data.opts.data
        items = if name.length == 1 then data.find(name[0]) else data.find name[0], name[1]
        res = ''
        for item in (items ? []).reverse()
          res += options.fn data.getYaml(item), options
        res

      Handlebars.registerHelper 'view', (item, contextName, options)->
        if !options
          options = contextName
          contextName = null
        context = options?.data
        data = (if (block = context.opts.data.getBlockNamed item) && yaml = context.opts.data.getYaml block
          yaml
        else
          block = null
          item)
        if data?.type
          renderView data.type, contextName, data, null, block

      Handlebars.registerHelper 'viewWrapper', (name, data, opts)->
        simpleRenderView "data-view='#{name}' data-requested-view='#{name}' class='view'", name, opts.fn, this

      bindView = (view)->
        #name = view.getAttribute 'data-view-block-name'
        if !(opts = findEditor(view)?.options) then return
        for input in $(view).find 'input[data-value]'
          if name = $(input).closest('[data-view-block-name]').attr 'data-view-block-name'
            path = input.getAttribute 'data-value'
            getter = eval "(function(data){return data.#{path}})"
            setter = eval "(function(data, value){data.#{path} = value})"
            input.value = getter opts.data.getYaml opts.data.getBlockNamed name
            do (name)->
              input.onkeypress = (e)-> e.stopPropagation()
              input.onkeydown = (e)->
                console.log 'derp'
                e.stopPropagation()
              input.onkeyup = (e)->
                e.stopPropagation()
                data = _.clone opts.data.getYaml(opts.data.getBlockNamed name), true
                setter data, input.value
                dontRerender view, ->
                  block = opts.data.getBlockNamed name
                  if block.local then opts.setLocalData name, data
                  else
                    if !opts.hasCollaborativeCode 'viewBoundSet'
                      opts.registerCollaborativeCode 'viewBoundSet', (name, data)->
                        opts.setData name, data
                    opts.collaborativeCode.viewBoundSet name, data

      renderView = (type, contextName, data, targets, block, blockName)->
        blockName = blockName ? block?.codeName
        isTop = !root.context?.topView
        requestedKey = key = viewKey type, contextName
        if !(template = getTemplate key)
          key = type
          contextName = null
          if !(template = getTemplate key) then return
        settings =
          type: type
          contextName: contextName
        if isTop
          settings.subviews = {}
          if block then settings.subviews[block._id] = true
        attrs = "data-view='#{key}' data-requested-view='#{requestedKey}'"
        classAttr = 'view'
        for attr, value of root.context.viewAttrs ? {}
          if attr == 'class' then classAttr += " #{value}"
          else attrs += " #{attr}='#{value}'"
        attrs += " class='#{classAttr}'"
        if block && blockName then attrs += " data-view-block-name='#{blockName}'"
        else if block then attrs += " data-view-block='#{block._id}'"
        if targets
          if !isTop && block then root.context.subviews[block._id] = true
          for node in targets
            if root.context?.dontRender?.has(node) then continue
            settings.view = node
            mergeContext settings, ->
              root.context.data = data
              if block then root.context.block = block
              if isTop then root.context.topView = node
              html = runTemplate template, data, data: root.context
              if isTop then attrs += " data-ids='#{_.keys(settings.subviews).join ' '}'"
              n = $("<span #{attrs}>#{html}</span>")
              $(node).replaceWith n
              root.context.opts.editor.activateScripts n, root.context
        else mergeContext settings, -> simpleRenderView attrs, key, template, data, block

      runTemplate = (template, args...)->
        try
          template args...
        catch err
          console.log err.stack ? err.msg
          " <span class='error'>[Error in template]</span> "

      simpleRenderView = (attrs, key, template, data, block)->
        id = "view-#{viewIdCounter++}"
        do (context = root.context)->
          pendingViews.push -> activateScripts $("##{id}"), context
        attrs += " id='#{id}'"
        if block then root.context.subviews[block._id] = true
        root.context.simpleViewId = id
        "<span #{attrs}>#{runTemplate template, data, data: root.context}</span>"

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
              for script in el.find('script')
                if !script.type || script.type == 'text/javascript'
                  newScript = document.createElement 'script'
                  newScript.type = 'text/javascript'
                  newScript.textContent = script.textContent
                  newScript.src = script.src
                  root.currentScript = newScript
                  script.parentNode.insertBefore newScript, script
                  script.remove()
              for script in el.find('script[type="text/coffeescript"]').add(el.find 'script[type="text/literate-coffeescript"]')
                root.currentScript = script
                CoffeeScript.run script.innerHTML
              getController(el.attr 'data-view')?.initializeView?(el, context.data)
              for img in el.find 'img'
                refreshImage img
              for node in el
                bindView node
            finally
              root.currentScript = null
              activating = false

      addController = (type, name, func, isDefault)->
        getControllers(isDefault)[viewKey type, name] = func

      removeController = (type, name, isDefault)->
        delete getControllers(isDefault)[viewKey type, name]

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

      setPanelExpanded = (view, expand)->
        panel = getPanel(view)
        panel.removeClass (if expand then 'contract' else 'expand')
        panel.addClass (if expand then 'expand' else 'contract')

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

      root = mergeExports({
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
          setPanelExpanded
          activateScripts
          pendingScripts: []
          localResources
        }
        condenseHtml
        Handlebars
      }).UI
