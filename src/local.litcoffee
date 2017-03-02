Code for local-mode.  This will not be loaded under meteor.

    require ['./domCursor'], (DC)-> window.DOMCursor = DC

    init = (base, jqui, EditorSupport, Modes, Diag, P2P, Tests, Defaults, UI, Search, Emacs, Todo, Advice, LoungeDefs, Atom, Tangle, Storage)->

      {
        OrgData
        installSelectionMenu
        getDocumentParams
        editorToolbar
      } = EditorSupport
      {
        plainEditDiv
        fancyEditDiv
      } = Modes
      {
        createStructureDisplay
        createEditorDisplay
      } = Diag
      {
        Peer
      } = P2P
      {
        runTests
      } = Tests
      {
        renderView
        initializePendingViews
        withContext
        setPanelExpanded
        localResources
      } = UI
      {
        addSearchDataFilter
      } = Search
      {
        addEmacsDataFilter
      } = Emacs
      {
        todoForEditor
      } = Todo
      {
        changeAdvice
      } = Advice
      {
        configureAtom
      } = Atom
      {
        initStorage
      } = Storage

      useP2P = true
      #useP2P = false
      peer = null
      p2pPanel = null
      p2pConnections = null
      DEFAULT_PAGE='demo/documentComputers.lorg'

      Leisure.configureP2P = ({panel, hostField, sessionField, createSessionButton, connections})->
        p2pPanel = panel
        p2pConnections = connections
        if !useP2P then panel.css 'display', 'none'
        hostField.val document.location.host || "localhost:8080"
        createSessionButton.data hasSession: false
        Leisure.createSession = (url, doneFunc)->
          createSessionButton.closest('.contents').removeClass 'not-connected'
          createSessionButton.closest('.contents').addClass 'connected'
          peer.createSession hostField.val(), ((con)->
            url = new URL("", document.location)
            url.search = "?join=#{peer.connectUrl}"
            sessionField.attr 'href', url.toString()
            sessionField.text url.toString()
            setPanelExpanded panel, true
            createSessionButton.button('option', 'label', 'Disconnect')
            doneFunc?()), (n)->
              connections.html n
        createSessionButton.click ->
          if !createSessionButton.data().hasSession
            Leisure.createSession hostField.val()
          else
            createSessionButton.closest('.contents').removeClass 'connected'
            createSessionButton.closest('.contents').addClass 'not-connected'
            peer.disconnect()
            createSessionButton.button('option', 'label', 'Create Session')
            setTimeout (->setPanelExpanded panel, true), 1
          createSessionButton.data hasSession: !createSessionButton.data().hasSession

      configureLocal = (opts)->
        u = new URL '.', opts.loadName
        opts.data.localURL = u.href
        localActivateScripts opts

      Leisure.localActivateScripts = localActivateScripts = (opts)->
        changeAdvice opts.editor, true,
          activateScripts: local: (parent)->(el, context)->
            ret = parent el, context
            errorEvt = (e)->
              checkImage opts, e.target
              removeEvents e
            removeEvents = (e)->
              e.target.removeEventListener 'load', removeEvents
              e.target.removeEventListener 'error', errorEvt
            for img in $(el).find 'img'
              if !img.complete && !localResources[img.src]
                img.addEventListener 'error', errorEvt
                img.addEventListener 'load', removeEvents
              else checkImage opts, img

      checkImage = (opts, img)->
        if (img.complete && !img.naturalHeight) || localResources[img.src]
          src = img.getAttribute 'src'
          if !src.match '^.*:.*'
            name = src.match(/([^#?]*)([#?].*)?$/)?[1]
          else name = src.match(/^file:([^#?]*)([#?].*)?$/)?[1]
          if name && !img.leisureLoaded
            img.leisureLoaded = true
            try
              u = new URL name, opts.data.loadName
              localResources[img.src] = img.src = u.href
              img.onerror = (e)-> opts.imageError img, e
            catch err
              opts.imageError img, err

      $(document).ready ->
        runTests()
        installSelectionMenu()
        if useP2P
          window.PEER = peer = new Peer
          window.DATA = data = peer.data
          p2pPanel?.css 'display', ''
        else window.DATA = data = new OrgData()
        addSearchDataFilter data
        Leisure.autoLoadEnv ['wisp'], './wispSupport'
        data.processDefaults(Defaults).then =>
          createStructureDisplay data
          #window.ED = plainEditDiv $("[maindoc]"), data
          window.ED = fancyEditDiv $("[maindoc]"), data
          if useP2P then window.PEER.setEditor ED
          createEditorDisplay ED
          todoForEditor ED
          if document.location.search
            {load, theme, join} = getDocumentParams()
          else load = DEFAULT_PAGE
          if load
            ED.options.data.baseDocName = load
            load = new URL(load, document.location).toString()
            ED.options.loadName = load
            configureLocal ED.options
            tanglePresent = false
            $.ajax(load + '.tangle')
              .done((content)->
                tanglePresent = ED.options.data.tangled = true
                #console.log "Handle tangle:", content
                ED.options.data.loadTangles content)
              .always ->
                $.ajax(load)
                  .then (data)->
                    #console.log "Tangle present: ", tanglePresent
                    ED.options.load load, data
          else configureAtom ED.options, configureLocal
          if theme then ED.options.setTheme theme
          if join
            setTimeout (->
              createSessionButton = $(editorToolbar window.PEER.editor.node).find('[name=p2pConnector] [name=createSession]')
              createSessionButton.data hasSession: true
              createSessionButton.closest('.contents').removeClass 'not-connected'
              createSessionButton.closest('.contents').addClass 'connected'
              createSessionButton.button 'option', 'label', 'Disconnect'
              console.log "CREATE SESSION:", createSessionButton[0]
              u = new URL join
              console.log "JOIN SESSION: #{u}"
              window.PEER.connectToSession u.toString(), null, (n)-> p2pConnections.html n), 1
          $('#globalLoad').remove()

    require ['./editor', 'jquery', 'lodash', 'bluebird'], (editor, $, ld, Bluebird)->
      #Bluebird.Promise.config longStackTraces: true, monitoring: true
      editor.set$ $, (obj)-> obj instanceof $
      debugger
      require ['acorn', 'acorn_walk'], -> require ['acorn_loose'], ->
        require ['./base', 'jqueryui', './editorSupport', './modes', './diag', './leisure-client-adapter', './tests', 'text!../src/defaults.lorg', './ui', './search', './emacs', './todo', './advice', './lounge', 'atomSupport', './tangle', './storage'], init
