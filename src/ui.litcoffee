Leisure's UI system uses a piece of data's "type" and the "context" (a string) to
choose a handlebars template.

    define ['handlebars', './editor', './coffee-script', 'immutable'], (Handlebars, Editor, CoffeeScript, Immutable)->
      {
        compile
        create
        registerHelper
      } = window.Handlebars = Handlebars
      {
        escapeHtml
        findEditor
        preserveSelection
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
        if (slide = root.context?.currentView?.closest '.slideholder')?.length
          slide.attr 'imgCount', imageRefreshCounter
        if (hashLoc = src.indexOf '#') == -1 then hashLoc = src.length
        "#{src.substring(0, hashLoc)}##{imageRefreshCounter}"

      prevImageSrc = (src)->
        count = if (slide = root.context.currentView?.closest '.slideholder')?.length
          Number slide.attr 'imgCount'
        else imageRefreshCounter - 1
        if (hashLoc = src.indexOf '#') == -1 then hashLoc = src.length
        "#{src.substring(0, hashLoc)}##{count}"

      replaceImage = (img)->
        if img.src.indexOf("file:") == 0
          newImg = document.createElement('img')
          for att in img.attributes
            newImg.setAttribute att.name, att.value
          newImg.onload = -> $(img).replaceWith newImg
          newImg.src = nextImageSrc img.src

      refreshImage = (img)->
        if !img.complete then img.onerror = -> replaceImage img
        else if img.complete && !img.naturalWidth then replaceImage img

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
        if view
          oldDonts = root.context?.dontRender ? new Set()
          mergeContext {dontRender: oldDonts.add(view)}, func
        else func()

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
          mergeContext {currentBlock: data.getBlock(item)}, ->
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
          renderView data.type, contextName, data, null, block ? root.context.currentBlock

      Handlebars.registerHelper 'viewWrapper', (name, data, opts)->
        simpleRenderView "data-view='#{name}' data-requested-view='#{name}' class='view'", name, opts.fn, this

      bindView = (view)->
        if !(opts = findEditor(view)?.options) then return
        for input, i in $(view).find 'input[data-value]'
          path = input.getAttribute 'data-value'
          if index = path.indexOf '.'
            name = path.substring 0, index
            path = path.substring index + 1
          else (parent = $(input).closest('[data-view-block-name]')).attr 'data-view-block-name'
          if name
            input.setAttribute 'input-number', i
            getter = eval "(function(data){return data.#{path}})"
            setter = eval "(function(data, value){data.#{path} = value})"
            oldValue = input.value = getter opts.data.getYaml opts.data.getBlockNamed name
            do (name)->
              input.onkeypress = (e)-> e.stopPropagation()
              input.onkeydown = (e)-> e.stopPropagation()
              input.onkeyup = (e)->
                e.stopPropagation()
                if input.value != oldValue
                  oldValue = input.value
                  data = _.clone opts.data.getYaml(opts.data.getBlockNamed name), true
                  setter data, input.value
                  start = input.selectionStart
                  end = input.selectionEnd
                  dontRerender view, -> dontRerender parent?[0], -> dontRerender view, ->
                    block = opts.data.getBlockNamed name
                    if block.local then opts.setLocalData name, data
                    else
                      preserveSelection -> opts.data.collaborativeCode.viewBoundSet name, data

      traverse = (obj, func, t, key, path, set)->
        if typeof obj == 'object'
          if !set then set = new Set()
          if !set.has obj
            if !path then path=[]
            set.add obj
            switch directive = func obj, t, key, path, set
              when 'stop' then 'stop'
              when 'skip' then
              else
                path.push [key, obj]
                if _.isArray(obj)
                  for v, k in obj
                    if traverse(v, func, t, k, path, set) == 'stop' then return
                else for k, v of obj
                  if traverse(v, func, t, k, path, set) == 'stop' then return
                path.pop()
        null

      touchedBlocks = (html, data)->
        v = {}
        traverse Handlebars.parse(html), (obj)->
          if obj.type == 'PathExpression'
            blockName = obj.parts[0]
            if (block = data.getBlockNamed(blockName))
              v[blockName] = if d = data.getYaml block then d else null
        v

****************
This isn't rendering and updatable view for bindings to the external scope
HTML blocks with no variables can reference blocks in the external scope
Use handlebars to extract the refrences to be able to construct the proper
data to send
****************

      renderView = (type, contextName, data, targets, block, blockName, addIds, extraAttrs)->
        if !block && root.context?.currentBlock?.yaml == data
          block = root.context?.currentBlock
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
        if !isTop && block then root.context.subviews[block._id] = true
        attrs = "data-view='#{key}' data-requested-view='#{requestedKey}'"
        classAttr = 'view'
        for attr, value of root.context.viewAttrs ? {}
          if attr == 'class' then classAttr += " #{value}"
          else attrs += " #{attr}='#{value}'"
        attrs += " class='#{classAttr}'"
        if block && blockName then attrs += " data-view-block-name='#{blockName}'"
        else if block then attrs += " data-view-block='#{block._id}'"
        if extraAttrs then attrs += " " + extraAttrs.trim()
        if targets
          for node in targets
            if root.context?.dontRender?.has(node) then continue
            settings.view = node
            mergeContext settings, ->
              root.context.data = data
              if block then root.context.block = block
              if isTop then root.context.topView = node
              id = node.id
              html = runTemplate template, data, data: root.context
              if isTop then attrs += " data-ids='#{_.keys(settings.subviews).join ' '}'"
              n = $("<span #{attrs}>#{html}</span>")
              n[0].id = id
              $(node).replaceWith n
              root.context.opts.editor.activateScripts n, root.context, data, block
        else mergeContext settings, -> simpleRenderView attrs, key, template, data, block, addIds

      runTemplate = (template, args...)->
        try
          template args...
        catch err
          console.log err.stack ? err.msg
          " <span class='error'>[Error in template]</span> "

      nextViewId = -> "view-#{viewIdCounter++}"

      simpleRenderView = (attrs, key, template, data, block)->
        id = nextViewId()
        do (context = root.context)->
          pendingViews.push -> activateScripts $("##{id}"), context, data, block
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

      activateScripts = (el, context, data, block)->
        if !activating
          block = block ? context.block
          data = data ? context.data
          withContext _.merge({data: block: block}, context), ->
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
              getController(el.attr 'data-view')?.initializeView?(el, data, data: root.context)
              for img in el.find 'img'
                refreshImage img
              for node in el
                bindView node
            catch err
              console.error err
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
        #ep.mouseenter -> getPanel(this).removeClass 'contract'
        ep.click ((e)->
          if !$(e.target).closest('input,button').length
            $(this).closest('.expandable-panel').find("[name='hiddenFocus']")[0].focus())
        ep.children().filter('.contents').on 'click', ->
          panel = $(this).closest('.expandable-panel')[0]
          if panel.hasMousedown
            panel.hasMousedown = false
            if !(document.activeElement instanceof HTMLInputElement)
              $(panel).find("[name='hiddenFocus']")[0].focus()
        ep.children().filter('.contents').on 'mousedown', ->
          $(this).closest('.expandable-panel')[0].hasMousedown = true
        ep.find('input').focus ->
          $(this).closest('.expandable-panel').addClass 'expand'
        ep.find('input').blur ->
          panel = $(this).closest('.expandable-panel')[0]
          if !panel.hasMousedown && $(document.activeElement).closest('.expandable-panel')[0] != panel
            $(panel).removeClass 'expand'
        ep.find('button').click ->
          $(this).closest('.expandable-panel').addClass 'contract'
        hp = $(view).find '.hidden-panel'
        $("<input name='hiddenFocus' class='hiddenTextField'>").appendTo hp
        hp.on 'click', (e)->
          panel = $(this).closest('.hidden-panel')[0]
          if panel.hasMousedown
            panel.hasMousedown = false
            if $(panel).hasClass 'expand'
              button = $($(panel).children()[1]).children().first()[0]
              if button == e.target || button.contains e.target then $(panel).removeClass 'expand'
            else if !(document.activeElement instanceof HTMLInputElement)
              $(panel).find("[name='hiddenFocus']")[0].focus()
        hp.on 'mousedown', -> $(this).closest('.hidden-panel')[0].hasMousedown = true
        hp.find('input').focus -> $(this).closest('.hidden-panel').addClass 'expand'
        hp.find('input').blur ->
          panel = $(this).closest('.hidden-panel')[0]
          if !panel.hasMousedown && $(document.activeElement).closest('.hidden-panel')[0] != panel
            $(panel).removeClass 'expand'

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

      root = Object.assign(Leisure, {
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
          nextViewId
          traverse
          touchedBlocks
        }
        condenseHtml
        Handlebars
      }).UI
