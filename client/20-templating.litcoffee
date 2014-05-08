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
          try
            oldData = Templating.currentViewData
            oldViewLink = Templating.currentViewLink
            Templating.currentViewData = data
            Templating.currentViewLink = node
            if shadow then setShadowHtml node, "<span class='view'>#{comp data}</span>"
            else setHtml node, "<span class='view'>#{comp data}</span>"
          finally
            Templating.currentViewData = oldData
            Templating.currentViewLink = oldViewLink
        if cont then cont(data, target)

    activateScripts = (el)->
        for script in $(el).find('script')
          newScript = document.createElement 'script'
          newScript.type = 'text/javascript'
          newScript.textContent = script.textContent
          script.parentNode.insertBefore newScript, script
          script.parentNode.removeChild script

    setHtml = (holder, html)->
      el.innerHTML = html
      if $("body").hasClass 'bar_collapse' then $(el.firstChild).addClass('bar_collapse')
      activateScripts el.firstChild

    setShadowHtml = (holder, html)->
      if !(el = holder.shadowRoot)
        el = holder.createShadowRoot()
        el.applyAuthorStyles=true
      el.innerHTML = "<span></span>"
      el.firstChild.innerHTML = html
      $(el.firstChild).attr 'data-shadowdom', 'true'
      activateScripts el.firstChild

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
