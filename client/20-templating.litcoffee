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
      viewMarkup[type] = (data, target, preserveContents)->
        if target
          for node in target
            n = $(node)
            if !preserveContents
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
              if cont then cont(data, target)
            finally
              Templating.currentViewData = oldData
              Templating.currentViewLink = oldViewLink
              Templating.currentView = oldView
        else comp data

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
        holder.setAttribute 'data-shadowholder', 'true'
        el = holder.createShadowRoot()
        el.applyAuthorStyles=true
      el.innerHTML = "<span></span>"
      el.firstChild.innerHTML = html
      $(el.firstChild).attr 'data-shadowdom', 'true'
      if !noactivate then activateScripts el.firstChild
      el.firstChild

    clearShadow = (holder)->
      #if holder.shadowRoot then holder.shadowRoot.innerHTML = ''
      setShadowHtml holder, ''

    getDeepestActiveElement = ->
      el = document.activeElement
      while next = el.shadowRoot?.activeElement
        el = next
      el

    root.createTemplateRenderer = createTemplateRenderer
    root.setShadowHtml = setShadowHtml
    root.clearShadow = clearShadow
    root.viewMarkup = viewMarkup
    root.escapeHtml = escapeHtml
    root.getDeepestActiveElement = getDeepestActiveElement
