    root = (window ? global).Templating = {}

    viewMarkup = {}

    replacements =
      '<': '&lt;'
      '>': '&gt;'
      '&': '&amp;'

    escapeHtml = (str)->
      if typeof str == 'string' then str.replace /[<>&]/g, (c)-> replacements[c]
      else str

    shadowCount = 0
    rendering = false

Important: this does not remove old ids, yet, from data-view-ids on updates

    createTemplateRenderer = (type, template, shadow, cont)->
      comp = Handlebars.compile template
      viewMarkup[type] = (data, target, preserveContents, block, update, link)->
        updateAttr = if block then " data-view-type='#{type}'" else ""
        updateAttr += " data-view='true'"
        if block then updateAttr = "#{updateAttr} data-view-block='#{block._id}'"
        if target
          for node in target
            try
              oldRendering = rendering
              if !rendering
                rendering = true
                shadowCount = 0
              oldData = Templating.currentViewData
              oldViewLink = Templating.currentViewLink
              oldView = Templating.currentView
              oldInputCount = Templating.currentInputCount
              Templating.currentViewData = data
              Templating.currentViewLink = node
              Templating.currentInputCount = 0
              html = "<span class='view'#{updateAttr}>#{comp data}</span>"
              el = if update
                node.innerHTML = comp data
                Templating.currentViewLink = link
                numberInputs node
                el = node
                node = node.parentNode
                el
              else if shadow
                n = $(node)
                if !preserveContents
                  n.append "<span class='hidden'>#{escapeHtml n.text()}</span>"
                el = setShadowHtml node, html, true
                numberInputs el
                el
              else
                clearView node
                content = createFragment(html).firstChild
                root.nonOrg content
                node.appendChild content
              Templating.currentView = el
              if block then addBlockInfo Templating.currentViewLink, block, el
              activateScripts viewRoots node
              if cont then cont(data, target, block, update)
            finally
              Templating.currentViewData = oldData
              Templating.currentViewLink = oldViewLink
              Templating.currentView = oldView
              Templating.currentInputCount = oldInputCount
              rendering = oldRendering
        else if block
          addBlockInfo Templating.currentViewLink, block
          "<span#{updateAttr}>#{comp data}</span>"
        else comp data

    createFragment = (txt)->
      scratch = document.createElement 'DIV'
      scratch.innerHTML = txt
      frag = document.createDocumentFragment()
      while scratch.firstChild
        frag.appendChild scratch.firstChild
      frag

    addBlockInfo = (el, block, view)->
      addId el, block._id
      for node in $(view).find "[data-org-index]"
        addIndex el, node.getAttribute 'data-org-index'

    addId = (el, id)->
      for node in $(el).not("[data-view-ids~=#{id}]")
        old = node.getAttribute('data-view-ids')
        node.setAttribute 'data-view-ids', "#{if old then old + ' ' else ''}#{id}"

    addIndex = (el, index)->
      for node in $(el).not("[data-view-indexes~=#{index}]")
        old = node.getAttribute('data-view-indexes')
        node.setAttribute 'data-view-indexes', "#{if old then old + ' ' else ''}#{index}"

    numberInputs = (el)->
      for input in $(el).find('input')
        input.setAttribute 'data-shadow-id', shadowCount++

    activating = false

    viewRoots = (el)-> $(el).children().filter('[data-view]')

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
              Templating.currentScript = newScript
              script.parentNode.insertBefore newScript, script
              script.parentNode.removeChild script
          for script in $(el).find('script[type="text/coffeescript"]').add($(el).find 'script[type="text/literate-coffeescript"]')
            Templating.currentScript = script
            CoffeeScript.run script.innerHTML
        finally
          Templating.currentScript = null
          activating = false

    createNode = (txt)->
      if typeof txt == 'string'
        d = document.createElement 'div'
        d.innerHTML = txt
        d.firstChild
      else $(txt)[0]

nodeText uses innerHTML to validate HTML text

    nodeText = (txt)->
      if typeof txt == 'string'
        d = document.createElement 'div'
        d.innerHTML = txt
        d.innerHTML
      else $(txt).html(true)

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

    appendAndActivate = (holder, html)->
      n = $(html)
      n.attr 'data-rendered', true
      holder.children().filter("[data-rendered]").remove()
      holder.append n
      activateScripts n

    clearView = (holder)->
      for child in Array.prototype.slice.call holder.childNodes
        if child.nodeType == Node.ELEMENT_NODE && child.hasAttribute 'data-view'
          child.remove()

    getDeepestActiveElement = ->
      el = document.activeElement
      while next = el.shadowRoot?.activeElement
        el = next
      el

    root.createTemplateRenderer = createTemplateRenderer
    root.setShadowHtml = setShadowHtml
    root.activateScripts = activateScripts
    root.clearView = clearView
    root.viewRoots = viewRoots
    root.viewMarkup = viewMarkup
    root.escapeHtml = escapeHtml
    root.getDeepestActiveElement = getDeepestActiveElement
    root.createNode = createNode
    root.nodeText = nodeText
