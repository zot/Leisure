Editing support for Leisure

This file customizes the editor so it can handle Leisure files.  Here is the Leisure
block structure:  ![Block structure](private/doc/blockStructure.png)

    define ['cs!./base', 'cs!./org', 'cs!./docOrg.litcoffee', 'cs!./ast', 'cs!./eval.litcoffee', 'cs!./editor.litcoffee', 'lib/lodash.min', 'jquery', 'cs!./ui.litcoffee', 'handlebars', 'cs!./export.litcoffee', './lib/prism'], (Base, Org, DocOrg, Ast, Eval, Editor, _, $, UI, Handlebars, BrowserExports, Prism)->

      {
        defaultEnv
      } = Base
      {
        parseOrgMode
        Fragment
        Headline
        headlineRE
      } = Org
      {
        orgDoc
        getCodeItems
        blockSource
      } = DocOrg
      {
        Nil
      } = Ast
      {
        languageEnvMaker
        Html
      } = Eval
      {
        LeisureEditCore
        last
        DataStore
        DataStoreEditingOptions
        blockText
        posFor
        escapeHtml
        copy
        setHtml
        findEditor
        copyBlock
        preserveSelection
      } = Editor
      {
        addView
        removeView
        renderView
        addController
        removeController
        withContext
        mergeContext
        initializePendingViews
      } = UI
      {
        mergeExports
      } = BrowserExports

      selectionActive = true
      headlineRE = /^(\*+ *)(.*)(\n)$/
      defaults =
        views: {}
        controls: {}

      escapeAttr = (text)->
        escapeHtml(text).replace /['"&]/g, (c)->
          switch c
            when '"' then '&quot;'
            when "'" then '&#39;'
            when '&' then '&amp;'

      blockOrg = (data, blockOrText)->
        text = if typeof blockOrText == 'string' then data.getBlock(blockOrText) ? blockOrText else blockOrText.text
        org = parseOrgMode text
        org = if org.children.length == 1 then org.children[0]
        else
          frag = new Fragment org.offset, org.children
          frag
        if typeof blockOrText == 'object'
          org.nodeId = blockOrText._id
          org.shared = blockOrText.type
        org.linkNodes()
        org

`OrgData` -- a DataStore that supports block-structured org file data.  Each block has type 'headline', 'code', or 'chunk'.  Blocks use nextSibling and previousSibling ids to indicate the tree structure of the org document (there are no direct parent/child links).

      class OrgData extends DataStore
        constructor: ->
          DataStore.apply this, arguments
          @namedBlocks = {}
          @filters = []
        getBlock: (thing, changes)->
          if typeof thing == 'string' then changes?.sets[thing] ? super(thing) else thing

`load` -- not the best use of inheritance here, changes is specifically for P2POrgData :).
Let's just call this poetic license for the time being...

        load: (first, blocks, changes)->
          if !first then super first, blocks
          else
            for filter in @filters
              filter.clear()
            if !changes then changes = sets: blocks, oldBlocks: {}, first: first
            @linkAllSiblings changes
            for block of @blockList()
              @checkChange block, null
            for id, block of changes.sets
              @runFilters null, block
              @checkChange null, block
            super first, blocks
        setBlock: (id, block)->
          @runFilters @getBlock(id), block
          super id, block
        deleteBlock: (id)->
          @runFilters @getBlock(block), null
          super id
        addFilter: (filter)-> @filters.push filter
        removeFilter: (filter)-> _.remove @filters, (i)-> i == filter
        runFilters: (oldBlock, newBlock)->
          for filter in @filters
            filter.replaceBlock oldBlock, newBlock
        parseBlocks: (text)->
          if text == '' then []
          else orgDoc parseOrgMode text.replace /\r\n/g, '\n'
        nextSibling: (thing, changes)-> @getBlock @getBlock(thing, changes)?.nextSibling, changes
        previousSibling: (thing, changes)-> @getBlock @getBlock(thing, changes).previousSibling, changes
        reducePreviousSiblings: (thing, changes, func, arg)->
          greduce @getBlock(thing, changes), changes, func, arg, (b)=> @getBlock b.previousSibling, changes
        reduceNextSiblings: (thing, changes, func, arg)->
          greduce @getBlock(thing, changes), changes, func, arg, (b)=> @getBlock b.nextSibling, changes
        lastSibling: (thing, changes)-> @reduceNextSiblings thing, changes, ((x, y)-> y), null
        firstSibling: (thing, changes)-> @reducePreviousSiblings thing, changes, ((x, y)-> y), null
        parent: (thing, changes)-> @getBlock @firstSibling(thing, changes)?.prev, changes
        firstChild: (thing, changes)->
          if (block = @getBlock thing, changes) && (n = @getBlock block.next, changes) && !n.previousSibling
            n
        lastChild: (thing, changes)-> @lastSibling @firstChild(thing, changes), changes
        children: (thing, changes)->
          c = []
          @reduceNextSiblings @firstChild(thing, changes), changes, ((x, y)-> c.push y), null
          c

`nextRight` returns the next thing in the tree after this subtree, which is just the
next sibling if there is one, otherwise it's the closest "right uncle" of this node

        nextRight: (thing, changes)->
          while thing
            if sib = @nextSibling thing, changes then return sib
            thing = @parent thing, changes
          null

`linkAllSiblings` -- modify changes so that the sibling links will be correct when the changes are applied.

        linkAllSiblings: (changes)->
          stack = []
          parent = null
          sibling = null
          emptyNexts = {}
          cur = @getBlock changes.first, changes
          while cur
            if cur.nextSibling then emptyNexts[cur._id] = cur
            if cur.type == 'headline'
              while parent && cur.level <= parent.level
                [parent, sibling] = stack.pop()
            else if cur.type == 'chunk' && cur.properties? && parent && !_(parent.propertiesBlocks).contains cur._id
              if !parent.propertiesBlocks
                parent.propertiesBlocks = []
              parent.propertiesBlocks.push cur._id
            if sibling
              delete emptyNexts[sibling._id]
              if sibling.nextSibling != cur._id
                addChange(sibling, changes).nextSibling = cur._id
              if cur.previousSibling != sibling._id
                addChange(cur, changes).previousSibling = sibling._id
            else if cur.previousSibling
              delete addChange(cur, changes).previousSibling
            sibling = cur
            if cur.type == 'headline'
              stack.push [parent, sibling]
              parent = cur
              sibling = null
            cur = @getBlock cur.next, changes
          for id, block of emptyNexts
            delete addChange(block, changes).nextSibling

`makeChange` -- handle incoming changes (local or remote).  This is for computations
that must be done regardless of the source of changes

        makeChange: (changes)->
          {sets, removes} = changes
          for id of removes
            @checkChange @getBlock(id), null
          for id, block of sets
            @checkChange @getBlock(id), block
          super changes
        processDefaults: (lorgText)->
          viewBlocks = orgDoc parseOrgMode lorgText.replace /\r\n?/g, '\n'
          for block in viewBlocks
            @checkChange null, block, true
        checkChange: (oldBlock, newBlock, isDefault)->
          @checkCssChange oldBlock, newBlock, isDefault
          @checkCodeChange oldBlock, newBlock, isDefault
          @checkViewChange oldBlock, newBlock, isDefault
          @checkControlChange oldBlock, newBlock, isDefault
        checkCssChange: (oldBlock, newBlock, isDefault)->
          if isCss(oldBlock) || isCss(newBlock)
            $("#css-#{blockElementId(oldBlock) || blockElementId(newBlock)}").filter('style').remove()
          if isCss newBlock
            $('head').append "<style id='css-#{blockElementId newBlock}'>#{blockSource newBlock}</style>"
        checkCodeChange: (oldBlock, newBlock, isDefault)->
          if oldBlock?.codeName != newBlock?.codeName
            if oldBlock?.codeName then delete @namedBlocks[oldBlock.codeName]
            if newBlock?.codeName then @namedBlocks[newBlock.codeName] = newBlock._id
        checkViewChange: (oldBlock, newBlock, isDefault)->
          removeView ov = blockViewType oldBlock
          if vt = blockViewType newBlock
            source = blockSource newBlock
            addView vt, null, source.substring 0, source.length - 1
            if isDefault then defaults.views[vt] = source.substring 0, source.length - 1
          if ov && ov != vt && view = defaults.views[ov] then addView ov, null, view
        checkControlChange: (oldBlock, newBlock, isDefault)->
          if oldBlock?.type != 'code' || blockSource(oldBlock) != blockSource(newBlock) || isControl(oldBlock) != isControl(newBlock)
            removeController ov = blockViewType oldBlock, 'control'
            if vt = blockViewType newBlock, 'control'
              env = blockEnvMaker(newBlock) __proto__: defaultEnv
              controller = {}
              addController vt, null, controller
              env.eval = (text)-> controllerEval.call controller, text
              env.write = (str)->
              env.errorAt = (offset, msg)-> console.log msg
              env.executeText blockSource(newBlock), Nil, (->)

      blockElementId = (block)-> block && (block.codeName || block._id)

      blockIsHidden = (block)->
        String(block?.properties?.hidden ? '').toLowerCase() == 'true'

`controllerEval` looks like a useless wrapper for eval, but you can use `apply()`
and `call` to set "this" for the code, which you can't do with the primitive `eval()`

      controllerEval = (txt)-> eval txt

      isCss = (block)-> block?.language == 'css'

      isControl = (block)-> block?.type == 'code' && block.codeAttributes?.control

      blockViewType = (block, attr = 'defview')->
        (block?.type == 'code' && block.codeAttributes?[attr]) || null

      addChange = (block, changes)->
        if !changes.oldBlocks[block._id] then changes.oldBlocks[block._id] = copy block
        changes.sets[block._id] = block

      greduce = (thing, changes, func, arg, next)->
        if typeof changes == 'function'
          next = arg
          arg = func
          func = changes
        if thing && typeof arg == 'undefined'
          arg = thing
          thing = next thing
        while thing
          arg = func arg, thing
          thing = next thing
        arg

      getId = (thing)-> if typeof thing == 'string' then thing else thing._id

`OrgEditing` -- editing options for the org editor.

      class OrgEditing extends DataStoreEditingOptions
        constructor: (data)->
          super data
          data.on 'load', => @rerenderAll()
          data.on 'change', -> initializePendingViews()
          @setPrefix 'leisureBlock-'
          @hiding = true
          @setMode Leisure.plainMode
          @toggledSlides = {}
        rerenderAll: ->
          super()
          initializePendingViews()
        changed: (changes)->
          {newBlocks, oldBlocks} = changes
          if newBlocks.length == oldBlocks.length == 1
            for newBlock, i in newBlocks
              oldBlock = oldBlocks[i]
              if newBlocks.type == 'headline' || oldBlock.type == 'headline' ||
              newBlock._id != oldBlock._id
                return super changes
            blockIds = {}
            for block in newBlocks
              blockIds[block._id] = true
            @mode.renderChanged this, newBlocks, @idPrefix, true
            viewNodes = $()
            for block in newBlocks
              viewNodes = viewNodes.add @find "[data-view-block='#{block._id}']"
              viewNodes = @findViewsForDefiner block, viewNodes
            @withContext =>
              for node in viewNodes.filter((n)=> !blockIds[@idForNode n])
                node = $(node)
                if data = (block = @getBlock(node.attr 'data-view-block'))?.yaml
                  renderView $(node).attr('data-view'), null, data, node, block
          else super changes
        find: (sel)-> $(@editor.node).find sel
        findViewsForDefiner: (block, nodes)->
          attrs = (block.type == 'code' && block.codeAttributes)
          if attrs && viewType = (attrs.control || attrs.defview)
            nodes = nodes.add @find "[data-view='#{viewType}']"
          nodes
        withContext: (func)-> mergeContext {}, =>
          UI.context.opts = this
          UI.context.prefix = @idPrefix
          func()
        initToolbar: ->
          @withContext => $(@editor.node).before(renderView 'leisure-toolbar', null, null)
          initializePendingViews()
        slideFor: (thing)->
          block = @data.getBlock thing
          while block && !(block.type == 'headline' && block.level == 1)
            parent = @data.parent block
            if !parent then break
            block = parent
          block
        slidesFor: (blocks)->
          slides = {}
          for block in blocks
            if slide = @slideFor block
              slides[slide._id] = block
          slides
        toggleSlide: (id)->
          block = @data.getBlock id
          if (block?.type == 'headline' && block.level == 1) || (block && !block.prev)
            if @toggledSlides[id] then delete @toggledSlides[id]
            else @toggledSlides[id] = true
        isToggled: (thing)-> (slide = @slideFor thing) && @toggledSlides[slide._id]
        removeToggles: -> @toggledSlides = {}
        toggleHidden: ->
          @hiding = !@hiding
          @rerenderAll()
        hideHiddenSlides: -> if !@hiding then @toggleHidden()
        showAllSlides: -> if @hiding then @toggleHidden()
        isHidden: (thing)-> blockIsHidden @slideFor thing
        canHideSlides: -> @hiding && @mode == Leisure.fancyMode
        shouldHide: (thing)->
          @canHideSlides() && (slide = @slideFor thing) && @isHidden(slide) && !@isToggled(slide)
        setEditor: (ed)->
          super ed
          @setMode @mode
          @initToolbar()
        setMode: (@mode)->
          if @mode && @editor then @editor.node.attr 'data-edit-mode', @mode.name
          this
        setPrefix: (prefix)->
          @idPrefix = prefix
          @idPattern = new RegExp "^#{prefix}(.*)$"
        nodeForId: (id)-> $("##{@idPrefix}#{id}")
        idForNode: (node)-> $(node).closest('[data-block]')[0]?.id.match(@idPattern)?[1]
        parseBlocks: (text)-> @data.parseBlocks text
        renderBlock: (block)-> @mode.render this, block, @idPrefix

`change(changes)` -- about to change the data; compute some effects immediately.

        change: (changes)->
          if @changesHidden changes
            console.log "REJECTING DELETE OF HIDDEN"
            return false
          computedProperties = {}
          changedProperties = []
          for id, change of changes.sets
            oldBlock = @getBlock change._id
            if @checkPropertyChange changes, change, oldBlock
              changedProperties.push change._id
            @checkCodeChange changes, change, oldBlock
          @data.linkAllSiblings changes
          for change in changedProperties
            if parent = @data.parent(change, changes)?._id
              if !computedProperties[parent]
                computedProperties[parent] = true
                props = {}
                for child in @data.children parent, changes
                  props = _.merge props, child.properties
                addChange(@data.getBlock(parent, changes), changes).properties = props
          super changes
        changesHidden: (changes)->
          if @canHideSlides()
            for change in changes.oldBlocks
              if @shouldHide change then return true
          false
        checkPropertyChange: (changes, change, oldBlock)->
          change.type == 'chunk' && !_.isEqual change.properties, @getBlock(change._id)?.properties
        checkCodeChange: (changes, change, oldBlock)->
          if change.type == 'code' && isDynamic(change) && envM = blockEnvMaker(change)
            {source: newSource, results: newResults} = blockCodeItems this, change
            hasChange = !oldBlock || oldBlock.type != 'code' || oldBlock.codeAttributes.results != 'dynamic' || if oldBlock
              oldSource = blockSource oldBlock
              newSource.content != oldSource.content
            if hasChange
              result = ''
              newBlock = setError change
              sync = true
              env = envM __proto__: defaultEnv
              opts = this
              do (change)->
                env.errorAt = (offset, msg)->
                  newBlock = setError change, offset, msg
                  if newBlock != change && !sync
                    opts.change
                      first: opts.data.getFirst()
                      removes: {}
                      sets: change._id, newBlock
                env.write = (str)->
                  #result += ': ' + (if str instanceof Html then str.content else escapeHtml String(str).replace(/\r?\n/g, '\n: ')) + '\n'
                  result += str
                  if !sync
                    newBlock = setResult change, str
                    opts.change
                      first: opts.data.getFirst()
                      removes: {}
                      sets: change._id, newBlock
              env.executeText newSource.content, Nil, ->
              newBlock = setResult newBlock, result
              changes.sets[newBlock._id] = newBlock
              for block, i in changes.newBlocks
                if block._id == newBlock._id then changes.newBlocks[i] = newBlock
              sync = false

      setResult = (block, result)->
        {results} = blockCodeItems this, block
        if !results && (!result? || result == '') then block
        else
          newBlock = copyBlock block
          text = if !result? || result == ''
            block.text.substring(0, results.offset) + block.text.substring(results.offset + results.text.length)
          else if results
            block.text.substring(0, results.offset + results.contentPos) + result + block.text.substring(results.offset + results.text.length)
          else block.text + "#+RESULTS:\n#{result}"
          [tmp] = orgDoc parseOrgMode text.replace /\r\n/g, '\n'
          for prop, value of tmp
            newBlock[prop] = value
          newBlock

      setError = (block, offset, msg)->
        {error, results} = blockCodeItems this, block
        if !offset? && !error then block
        else
          newBlock = copyBlock block
          msg = if msg then msg.trim() + "\n"
          err = "#+ERROR: #{offset}, #{msg}"
          text = if error
            if !offset?
              block.text.substring(0, error.offset) + block.text.substring(error.offset + error.text.length)
            else
              block.text.substring(0, error.offset) + err + block.text.substring(error.offset + error.text.length)
          else if results
            block.text.substring(0, results.offset) + err + block.text.substring(results.offset)
          else block.text + err
          [tmp] = orgDoc parseOrgMode text.replace /\r\n/g, '\n'
          for prop, value of tmp
            newBlock[prop] = value
          newBlock

      isDynamic = (block)-> block.codeAttributes?.results == 'dynamic'

      blockEnvMaker = (block)-> languageEnvMaker block.language

      createBlockEnv = (block, envMaker)->

      blockCodeItems = (data, block)->
        if block?.type == 'code'
          org = blockOrg data, block
          if org instanceof Fragment || org instanceof Headline then org = org.children[0]
          getCodeItems org
        else {}

      createLocalData = -> new OrgData()

      installSelectionMenu = ->
        $(document.body)
          .append "<div id='selectionBubble' contenteditable='false'></div>"
          .append "<div id='topCaretBox' contenteditable='false'></div>"
          .append "<div id='bottomCaretBox' contenteditable='false'></div>"
        $("#selectionBubble")
          .html selectionMenu
          .on 'mouseenter', -> configureMenu $("#selectionBubble ul")
        $("#selectionBubble ul").menu select: (event, ui)-> console.log "MENU SELECT"; false
        monitorSelectionChange()
    
      selectionMenu = """
      <div>
      <ul>
        <li name='insert'><a href='javascript:void(0)'><span>Insert</span></a>
          <ul>
            <li><a href='javascript:void(0)'><span>Leisure</span></a></li>
            <li><a href='javascript:void(0)'><span>YAML</span></a></li>
            <li><a href='javascript:void(0)'><span>HTML</span></a></li>
            <li><a href='javascript:void(0)'><span>CoffeeScript</span></a></li>
            <li><a href='javascript:void(0)'><span>JavaScript</span></a></li>
          </ul>
        </li>
      </ul>
      </div>
      """
      
      configureMenu = (menu)->
        console.log "configure menu"
        #if getSelection().type == 'Caret'
        #  [el] = blockElementsForSelection()
        #  bl = getBlock el.id
        #  if bl?.type == 'chunk'
        #    return menu.find("[name='insert']").removeClass 'ui-state-disabled'
        #menu.find("[name='insert']").addClass 'ui-state-disabled'
      
      throttledUpdateSelection = _.throttle (-> actualSelectionUpdate()), 30,
        leading: true
        trailing: true
      
      updateSelection = (e)->
        #console.log "updating selection...", new Error('trace').stack
        throttledUpdateSelection()
    
      actualSelectionUpdate = ->
        if selectionActive
          if editor = findEditor getSelection().focusNode
            c = editor.domCursorForCaret()
            if !c.isEmpty() && (p = c.textPosition()) && isContentEditable c.node
              left = p.left
              top = p.top
              bubble = $("#selectionBubble")[0]
              bubble.style.left = "#{left}px"
              bubble.style.top = "#{top - bubble.offsetHeight}px"
              $(document.body).addClass 'selection'
              editor.trigger 'selection'
              return
        $(document.body).removeClass 'selection'
        editor?.trigger 'selection'

      monitorSelectionChange = ->
        $(document).on 'selectionchange', updateSelection
        $(window).on 'scroll', updateSelection
        $(window).on 'blur focus', (e)->
          selectionActive = (e.type == 'focus')
          updateSelection()

      editorForToolbar = (el)->
        findEditor $(el).closest('[data-view]')[0].nextSibling

      showHide = (toolbar)->
        editingOpts = editorForToolbar(toolbar).options
        editingOpts.toggleHidden()
        editingOpts.hiding

      breakpoint = ->
        console.log()
        console.log "breakpoint"

      isContentEditable = (node)->
        (if node instanceof Element then node else node.parentElement).isContentEditable

Exports

      mergeExports {
        findEditor
        showHide
        editorForToolbar
        breakpoint
      }

      {
        createLocalData
        OrgData
        OrgEditing
        installSelectionMenu
        blockOrg
        setResult
        setError
        editorForToolbar
        blockCodeItems
        escapeAttr
      }
