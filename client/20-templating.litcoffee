    root = (window ? global).Templating = {}

    viewMarkup = {}

    replacements =
      '<': '&lt;'
      '>': '&gt;'

    escapeHtml = (str)->
      if typeof str == 'string' then str.replace /[<>]/g, (c)-> replacements[c]
      else str

    shadowCount = 0

Important: this does not remove old ids from data-view-ids on updates

    createTemplateRenderer = (type, template, shadow, cont)->
      comp = Handlebars.compile template
      viewMarkup[type] = (data, target, preserveContents, block, update, link)->
        updateAttr = if block then " data-view-type='#{type}'" else ""
        if block then updateAttr = "#{updateAttr} data-view-block='#{block._id}'"
        if target
          for node in target
            try
              oldData = Templating.currentViewData
              oldViewLink = Templating.currentViewLink
              oldView = Templating.currentView
              Templating.currentViewData = data
              Templating.currentViewLink = node
              html = "<span class='view'#{updateAttr}>#{comp data}</span>"
              el = if update
                node.innerHTML = comp data
                Templating.currentViewLink = link
                numberInputs node
                node
              else if shadow
                n = $(node)
                if !preserveContents
                  n.html("<span class='hidden'>#{escapeHtml n.text()}</span>")
                el = setShadowHtml node, html, true
                numberInputs el
                el
              else
                setHtml node, html, true
              Templating.currentView = el
              if block then addId Templating.currentViewLink, block._id
              activateScripts el
              if cont then cont(data, target, block, update)
            finally
              Templating.currentViewData = oldData
              Templating.currentViewLink = oldViewLink
              Templating.currentView = oldView
        else if block
          addId Templating.currentViewLink, block._id
          "<span#{updateAttr}>#{comp data}</span>"
        else comp data

    addId = (el, id)->
      for node in $(el).not("[data-view-ids~=#{id}]")
        old = node.getAttribute('data-view-ids')
        node.setAttribute 'data-view-ids', "#{old} #{id}"

    numberInputs = (el)->
      for input in $(el).find('input')
        input.setAttribute 'data-shadow-id', shadowCount++

    activating = false

    activateScripts = (el)->
      if !activating
        activating = true
        try
          for script in $(el).find('script')
            if !script.type || script.type == 'text/javascript'
              newScript = document.createElement 'script'
              newScript.type = 'text/javascript'
              newScript.textContent = script.textContent
              Templating.currentScript = newScript
              script.parentNode.insertBefore newScript, script
              script.parentNode.removeChild script
          for script in $(el).find('script[type="text/coffeescript"]').add($(el).find 'script[type="text/literate-coffeescript"]')
            Templating.currentScript = script
            CoffeeScript.run script.innerHTML
        finally
          Templating.currentScript = null
          activating = false

    setHtml = (el, html, noactivate)->
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
