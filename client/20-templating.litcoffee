    root = if window? then window.Templating = {} else global.Templating = {}

    viewMarkup = {}

    replacements =
      '<': '&lt;'
      '>': '&gt;'

    escapeHtml = (str)->
      if typeof str == 'string' then str.replace /[<>]/g, (c)-> replacements[c]
      else str

    createTemplateRenderer = (type, template, shadow, cont)->
      comp = Handlebars.compile template
      viewMarkup[type] = (data, target)->
        for node in target
          n = $(node)
          n.html("<span class='hidden'>#{escapeHtml n.text()}</span>")
          el = if shadow
            el = setShadowHtml node, "<span class='view'>#{comp data}</span>", true
            shadowCount = 0
            for input in $(el).find('input')
              input.setAttribute 'data-shadow-id', shadowCount++
            el
          else setHtml node, "<span class='view'>#{comp data}</span>", true
          try
            oldData = Templating.currentViewData
            oldViewLink = Templating.currentViewLink
            oldView = Templating.currentView
            Templating.currentViewData = data
            Templating.currentViewLink = node
            Templating.currentView = el
            activateScripts el
          finally
            Templating.currentViewData = oldData
            Templating.currentViewLink = oldViewLink
            Templating.currentView = oldView
        if cont then cont(data, target)

    activateScripts = (el)->
        for script in $(el).find('script')
          if !script.type || script.type == 'text/javascript'
            newScript = document.createElement 'script'
            newScript.type = 'text/javascript'
            newScript.textContent = script.textContent
            script.parentNode.insertBefore newScript, script
            script.parentNode.removeChild script
        for script in $(el).find('script[type="text/coffeescript"]').add($(el).find 'script[type="text/literate-coffeescript"]')
          CoffeeScript.run script.innerHTML

    setHtml = (holder, html, noactivate)->
      el.innerHTML = html
      if $("body").hasClass 'bar_collapse' then $(el.firstChild).addClass('bar_collapse')
      if !noactivate then activateScripts el
      el

    setShadowHtml = (holder, html, noactivate)->
      if !(el = holder.shadowRoot)
        el = holder.createShadowRoot()
        el.applyAuthorStyles=true
      el.innerHTML = "<span></span>"
      el.firstChild.innerHTML = html
      $(el.firstChild).attr 'data-shadowdom', 'true'
      if !noactivate then activateScripts el.firstChild
      el.firstChild

    getDeepestActiveElement = ->
      el = document.activeElement
      while next = el.shadowRoot?.activeElement
        el = next
      el

    queued = {}
    pending = {}

    interactiveBatch = (id, func)->
      if queued[id] then pending[id] = true;
      else doInteractiveBatch id, func

    doInteractiveBatch = (id, func)->
      queued[id] = true
      pending[id] = false
      func id
      setTimeout (->
        if pending[id] then doInteractiveBatch id, func
        else queued[id] = false;
      ), 200

    root.createTemplateRenderer = createTemplateRenderer
    root.setShadowHtml = setShadowHtml
    root.viewMarkup = viewMarkup
    root.escapeHtml = escapeHtml
    root.interactiveBatch = interactiveBatch
    root.getDeepestActiveElement = getDeepestActiveElement
