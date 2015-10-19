Editing support for Leisure

This file customizes the editor so it can handle Leisure files.  Here is the Leisure
block structure:  ![Block structure](private/doc/blockStructure.png)

    define ['./base', './org', './docOrg', './ast', './eval', './editor', 'lib/lodash.min', 'jquery', './ui', './db', 'handlebars', './export', './lib/prism', './advice', 'lib/js-yaml', 'lib/bluebird.min', 'immutable'], (Base, Org, DocOrg, Ast, Eval, Editor, _, $, UI, DB, Handlebars, BrowserExports, Prism, Advice, Yaml, Bluebird, Immutable)->

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
        presentHtml
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
        changeAdvice
        afterMethod
        beforeMethod
      } = Advice
      {
        addView
        removeView
        renderView
        addController
        removeController
        withContext
        mergeContext
        initializePendingViews
        escapeAttr
      } = UI
      {
        hasDatabase
        transaction
      } = DB
      {
        mergeExports
      } = BrowserExports
      {
        safeLoad
        dump
      } = Yaml
      {
        Map
      } = Immutable
      {
        Promise
      } = Bluebird

      selectionActive = true
      headlineRE = /^(\*+ *)(.*)(\n)$/
      documentParams = null
      localStoreName = 'leisureStorage'
      localDb = null
      localStore = null
      deleteStore = false
      defaults =
        views: {}
        controls: {}

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
          @localBlocks = {}
          @filters = []
          @populateLocalData()
        populateLocalData: ->
          transaction(@localDocumentId()).getAll().then (allData)=>
            @localBlocks = _.indexBy allData, '_id'
            deletes = []
            for name of @localBlocks
              if !@namedBlocks[name] || !(@getBlockNamed name).local then deletes.push name
            for name in deletes
              @deleteLocalBlock name
        makeChanges: (func)->
          if newChange = !@changeCount
            for filter in @filters
              filter.startChange this
          try
            super func
          finally
            if newChange then for filter in @filters
              filter.endChange this
        getBlock: (thing, changes)->
          if typeof thing == 'object' then thing
          else changes?.sets[thing] ? super thing
        changesFor: (first, oldBlocks, newBlocks)->
          changes = super first, oldBlocks, newBlocks
          @linkAllSiblings changes
          changes

`load` -- not the best use of inheritance here, changes is specifically for P2POrgData :).
Let's just call this poetic license for the time being...

        load: (first, blocks, changes)->
          @makeChanges =>
            if !first then super first, blocks
            else
              for filter in @filters
                filter.clear this
              if !changes then changes = sets: blocks, oldBlocks: {}, first: first
              @linkAllSiblings changes
              for block of @blockList()
                @checkChange block, null
              for id, block of changes.sets
                @runFilters null, block
                @checkChange null, block
              super first, blocks
            @populateLocalData()
        setBlock: (id, block)->
          @makeChanges =>
            @runFilters @getBlock(id), block
            super id, block
        deleteBlock: (id)->
          @makeChanges =>
            @runFilters @getBlock(id), null
            super id
        addFilter: (filter)-> @filters.push filter
        removeFilter: (filter)-> _.remove @filters, (i)-> i == filter
        runFilters: (oldBlock, newBlock)->
          for filter in @filters
            filter.replaceBlock this, oldBlock, newBlock
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
            if oldBlock?.codeName then @deleteBlockName oldBlock.codeName
            if newBlock?.codeName then @setBlockName newBlock.codeName, newBlock._id
          if oldBlock?.local && !newBlock?.local then @deleteLocalBlock oldBlock.codeName
        getNamedBlockId: (name)-> @namedBlocks[name]
        setBlockName: (name, blockId)-> @namedBlocks[name] = blockId
        deleteBlockName: (name)->
          delete @namedBlocks[name]
          @deleteLocalBlock name
        getBlockNamed: (name)-> if id = @getNamedBlockId name then @getLocalBlock id
        localDocumentId: -> document.location.href
        getLocalBlock: (thing)->
          if !(blk = @getBlock thing) then null
          else if !blk.local || !(n = blk.codeName) || blk._id != @getNamedBlockId n
            blk
          else if local = copyBlock @localBlocks[n]
            local._id = blk._id
            local
          else blk
        storeLocalBlock: (block)->
          if block.local && (name = block.codeName) && block._id == @getNamedBlockId name
            @localBlocks[name] = block
            block = copyBlock block
            block._id = name
            transaction(@localDocumentId()).put block
        deleteLocalBlock: (name)->
          if @localBlocks[name]
            delete @localBlocks[name]
            transaction(@localDocumentId()).delete name
        textForDataNamed: (name, data, attrs)->
          """
          #+NAME: #{name}
          #+BEGIN_SRC yaml #{(":#{k} #{v}" for k, v of attrs).join ' '}
          #{dump(data, _.merge {sortKeys: true, flowLevel: 2}, attrs ? {}).trim()}
          #+END_SRC
          
          """
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
              env.data = this

      basicDataFilter =
        startChange: (data)->
        endChange: (data)->
        clear: (data)->
        replaceBlock: (data, oldBlock, newBlock)->

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
        if !changes.sets[block._id]
          changes.oldBlocks.push = block
          changes.newBlocks.push changes.sets[block._id] = copy block
        changes.sets[block._id]

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
          @dataChanges = null
          @pendingDataChanges = null
        renderBlocks: -> @mode.renderBlocks this, super()
        setTheme: (theme)->
          if @theme then @editor.node.removeClass @theme
          @editor.node.addClass @theme = theme
        toggleSlides: -> @mode.setSlideMode this, !@showingSlides()
        showingSlides: -> @mode.showingSlides this
        getLocalBlock: (thing)-> @data.getLocalBlock thing
        rerenderAll: ->
          super()
          initializePendingViews()

changeData(func) -- make data changes in func using addData(),
setData(), and removeData().  Func should not have side effects
(addData, setData, and removeData are monadic operations) because it
may be called more than once.  changeData() returns a promise.

        changeData: (replaceFunc)-> new Promise (succeed, fail)=>
          if @pendingDataChanges then @pendingDataChanges.push =>
            @executeDataChange replaceFunc, succeed, fail
          else
            @pendingDataChanges = []
            @executeDataChange replaceFunc, succeed, fail
        executeDataChange: (replaceFunc, succeed, fail)->
          dataChanges = null
          @batchReplace (=>
            dataChanges = @dataChanges =
              sharedRemoves: {}
              sharedInserts: {}
              sharedSets: {}
              localRemoves: {}
              localSets: {}
            try
              replaceFunc()
              repls = []
              for name of @dataChanges.sharedRemoves
                b = @blockBounds name
                b.text = ''
                repls.push b
              for name, {parent, parentType, block} of @dataChanges.sharedInserts
                b = @blockBounds name
                b.text = block.text
                repls.push b
              for name, block of @dataChanges.sharedSets
                b = @blockBounds name
                b.text = block.text
                repls.push b
              repls
            finally
              @dataChanges = null),
            (=>
              for name of dataChanges.localRemoves
                @data.deleteLocalBlock name
              for name, block of dataChanges.localSets
                @data.storeLocalBlock block
              if !_.isEmpty dataChanges.localSets
                blocks = ((block._id = @data.getNamedBlockId name; block) for name, block of dataChanges.localSets)
                #@mode.handleChanges this, sets: _.indexBy(blocks, '_id'), removes: {}, oldBlocks: [], newBlocks: blocks
                #@mode.renderChanged this, blocks, @idPrefix, true
                @changed oldBlocks: [], newBlocks: blocks
              succeed()
              @nextDataChange()),
            (e)=>
              if e.retryOK then @executeDataChange replaceFunc, succeed, fail
              else
                fail e
                @nextDataChange()
        nextDataChange: ->
          if @pendingDataChanges?.length
            @pendingDataChanges.shift()()
          else @pendingDataChanges = null
        blockBounds: (name)->
          block = @data.getBlockNamed name
          start = @data.offsetForBlock block
          end = start + block.text.length
          {start, end, gStart: start, gEnd: end}
        checkChanging: -> if !@dataChanges
          throw new Error "Attempt to access data outside of a change block"
        appendDataToHeadline: (parent, name, value, codeOpts)->
          appendData 'headline', parent, name, value, codeOpts
        appendDataAfter: (parent, name, value, codeOpts)->
          appendData 'block', parent, name, value, codeOpts
        appendData: (parentType, parent, name, value, codeOpts)->
          @checkChanging()
          if @getData(name)
            throw new Error "Attempt to add block with duplicate name: #{name}"
          @dataChanges.sharedInserts[name] = {
            parentType
            parent
            block: @data.parseBlocks(@data.textForDataNamed(name, value, codeOpts))[0]
          }
        getData: (name, skipCheck)->
          if !skipCheck then @checkChanging()
          block = if @dataChanges.localRemoves[name] || @dataChanges.sharedRemoves[name]
            null
          else if block = (@dataChanges.localSets[name] || @dataChanges.sharedSets[name])
            block
          else if info = @dataChanges.sharedInserts[name] then info.block
          else @data.getBlockNamed name
          block?.yaml
        setData: (name, value, codeOpts)->
          @checkChanging()
          if @dataChanges.sharedRemoves[name] then delete @dataChanges.sharedRemoves[name]
          if @dataChanges.localRemoves[name] then delete @dataChanges.localRemoves[name]
          if !(block = @data.getBlockNamed name)
            throw new Error "No block named #{name}"
          else
            codeOpts = _.merge {}, block.codeAttributes ? {}, codeOpts ? {}
            [newBlock] = @data.parseBlocks @data.textForDataNamed name, value, codeOpts
            newBlock._id = block._id
            if block.local && @getData name then @dataChanges.localSets[name] = newBlock
            else @dataChanges.sharedSets[name] = newBlock
        removeData: (name)->
          @checkChanging()
          if !(block = @data.getBlockNamed name)
            throw new Error "No block named #{name}"
          else
            if block.local then @dataChanges.localRemoves[name] = true
            @dataChanges.sharedRemoves[name] = true
        changed: (changes)->
          {newBlocks, oldBlocks} = changes
          if newBlocks.length == oldBlocks.length == 1
            for newBlock, i in newBlocks
              oldBlock = oldBlocks[i]
              #if newBlock.type == 'headline' || oldBlock.type == 'headline' ||
              #newBlock._id != oldBlock._id
              if trickyChange oldBlock, newBlock
                return super changes
            nb = newBlocks.slice()
            viewNodes = $()
            nameNodes = $()
            for block in newBlocks
              viewNodes = viewNodes.add @find "[data-view-block='#{block._id}']"
              if block.codeName
                nameNodes = viewNodes.add @find "[data-view-block-name='#{block.codeName}']"
              viewNodes = @findViewsForDefiner block, viewNodes
              viewNodes = @findViewsForDefiner changes.old[block._id], viewNodes
              for node in @find "[data-observe~=#{block._id}]"
                if id = @idForNode node
                  nb.push @getBlock id, changes
            nb = _.values(_.indexBy(nb, '_id'))
            @mode.renderChanged this, nb, @idPrefix, true
            @withNewContext =>
              for node in viewNodes.filter((n)=> !nb[@idForNode n])
                node = $(node)
                if data = (block = @getBlock(node.attr 'data-view-block'))?.yaml
                  [view, name] = ($(node).attr('data-requested-view') ? '').split '/'
                  renderView view, name, data, node, block
              for node in nameNodes.filter((n)=> !nb[@idForNode n])
                node = $(node)
                if data = (blk = @data.getBlockNamed(blkName = node.attr 'data-view-block-name'))?.yaml
                  [view, name] = ($(node).attr('data-requested-view') ? '').split '/'
                  renderView view, name, data, node, blk, blkName
          else super changes
        find: (sel)-> $(@editor.node).find sel
        findViewsForDefiner: (block, nodes)->
          if block
            attrs = (block.type == 'code' && block.codeAttributes)
            if attrs && viewType = (attrs.control || attrs.defview)
              nodes = nodes.add @find "[data-view='#{viewType}']"
              nodes = nodes.add @find "[data-requested-view='#{viewType}']"
          nodes
        withNewContext: (func)-> mergeContext {}, =>
          UI.context.opts = this
          UI.context.prefix = @idPrefix
          func()
        initToolbar: ->
          @withNewContext => $(@editor.node).before(renderView 'leisure-toolbar', null, null)
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
          $(ed.node).addClass 'leisure-editor'
          @setMode @mode
          @initToolbar()
          @bindings =
            __proto__: @bindings
            'C-C C-C': ((editor, e, r)=>
              # execute asynchronously because alerts mess with the events
              setTimeout (=>@execute()),1
              false)
          @bindings.PAGEUP = (editor, e, r)=>
            if @mode.showPrevSlide this then e.preventDefault()
            false
          @bindings.PAGEDOWN = (editor, e, r)=>
            if @mode.showNextSlide this then e.preventDefault()
            false
          opts = this
          changeAdvice ed, true,
            enter: options: (parent)-> (e)->
              opts.mode.enter opts, parent, e
            handleDelete: options: (parent)-> (e, sel, forward)->
              opts.mode.handleDelete opts, parent, e, sel, forward
          $(@editor.node).on 'scroll', updateSelection
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
        replaceBlocks: (prev, oldBlocks, newBlocks)->
          @change @changesFor prev, oldBlocks, newBlocks
        replaceTextEffects: (start, end, text, skipMode)->
          {prev, oldBlocks, newBlocks} = @data.changesForReplacement start, end, text
          if !oldBlocks
            oldBlocks = []
            newBlocks = [@data.getBlock @data.blockForOffset start]
            sets = {}
            sets[newBlocks._id] = newBlocks[0]
            changes = {
              first: @data.getFirst()
              oldBlocks
              newBlocks
              sets: sets
              removes: {}
            }
          else if oldBlocks
            changes = @changesFor prev, oldBlocks, newBlocks
          if !skipMode then @mode.handleChanges this, changes
          changes
        replaceText: (start, end, text, skipEffects)->
          if !skipEffects && repls = @replaceTextEffects(start, end, text).repls
            super start, end, text
            for repl in repls
              @replaceText repl.start, repl.end, repl.text, true
          else super start, end, text

`changesFor(first, oldBlocks, newBlocks)` -- compute some effects immediately

        changesFor: (first, oldBlocks, newBlocks)->
          changes = @data.changesFor first, oldBlocks, newBlocks
          changes.repls = []
          computedProperties = {}
          changedProperties = []
          for id, change of changes.sets
            oldBlock = @getBlock change._id
            if @checkPropertyChange changes, change, oldBlock
              changedProperties.push change._id
            @checkCodeChange changes, change, oldBlock, oldBlocks, newBlocks
          for change in changedProperties
            if parent = @data.parent(change, changes)?._id
              if !computedProperties[parent]
                computedProperties[parent] = true
                props = {}
                for child in @data.children parent, changes
                  props = _.defaults props, child.properties
                addChange(@data.getBlock(parent, changes), changes).properties = props
          changes

`change(changes)` -- about to change the data, allow mode to render some things

        change: (changes)->
          if changes then @mode.handleChanges this, changes
          super changes
        update: (block)->
          oldBlock = @getBlock block._id
          if !_.isEqual block, oldBlock
            @change
              first: @data.getFirst()
              removes: {}
              sets: _.object [[block._id, block]]
              newBlocks: [block]
              oldBlocks: (if oldBlock then [oldBlock] else [])
        changesHidden: (changes)->
          if @canHideSlides()
            for change in changes.oldBlocks
              if @shouldHide change then return true
          false
        checkPropertyChange: (changes, change, oldBlock)->
          change.type == 'chunk' && !_.isEqual change.properties, @getBlock(change._id)?.properties
        checkCodeChange: (changes, change, oldBlock, oldBlocks, newBlocks)->
          if change.type == 'code' && isDynamic(change) && envM = blockEnvMaker(change)
            {source: newSource, results: newResults} = blockCodeItems this, change
            hasChange = !oldBlock || oldBlock.type != 'code' || oldBlock.codeAttributes.results != 'dynamic' || if oldBlock
              oldSource = blockSource oldBlock
              newSource.content != oldSource.content
            if hasChange
              result = ''
              newBlock = setError change
              sync = true
              env = envM
                __proto__: defaultEnv
                options: this
                data: @data
              opts = this
              do (change)=>
                env.errorAt = (offset, msg)->
                  newBlock = setError change, offset, msg
                  if newBlock != change && !sync
                    sets = {}
                    sets[change._id] = newBlock
                    opts.change
                      first: opts.data.getFirst()
                      removes: {}
                      sets: sets
                      newBlocks: [newBlock]
                      oldBlocks: [change]
                env.write = (str)=>
                  result += presentHtml str
                  if result[result.length - 1] != '\n' then result += '\n'
                  if !sync then @replaceResult change._id, result
              finished = {}
              if finished == env.executeText newSource.content, Nil, (-> finished)
                newBlock = setResult newBlock, result
                if newBlock.text != change.text
                  changes.sets[newBlock._id] = newBlock
                  for block, i in changes.newBlocks
                    if block._id == newBlock._id then changes.newBlocks[i] = newBlock
                  start = @offsetForNewBlock newBlock, oldBlocks, newBlocks
                  changes.repls.push replacementFor start, change.text, newBlock.text
              sync = false
        offsetForNewBlock: (newBlock, oldBlocks, newBlocks)->
          start = if oldBlocks.length == 0 then 0 else @data.offsetForBlock oldBlocks[0]
          for block in newBlocks
            if block._id == newBlock._id then return start
            start += block.text.length
          -1
        execute: ->
          block = @editor.blockForCaret()
          if block.type == 'code' && envM = blockEnvMaker block
            @executeBlock block, envM
        executeBlock: (block, envM)->
          if envM = blockEnvMaker block
            {source} = blockCodeItems this, block
            result = ''
            sync = true
            env = envM __proto__: defaultEnv
            opts = this
            newBlock = setError block
            env.errorAt = (offset, msg)->
              newBlock = setError block, offset, msg
              if newBlock != block && !sync then opts.update newBlock
            env.write = (str)->
              result += str
              if !sync then opts.update newBlock = setResult block, str
            env.executeText source.content, Nil, ->
            sync = false
            newBlock = setResult newBlock, result
            if newBlock != block then opts.update newBlock
        renderImage: (src, title)->
          if @loadName && m = src.match /^file:(\/\/)?(.*)$/
            src = new URL(m[2], @loadName).toString()
          "<img src='#{src}'#{title}>"
        followLink: (e)->
          if e.target.href.match /^elisp/
            console.log "Attempt to follow elisp link at #{@editor.docOffset e.target, 0}"
            alert "Elisp links not supported:\n#{e.target.href}"
          else open e.target.href
          false
        replaceResult: (block, str)->
          if typeof block != 'string' then blockId = block._id
          if current = @data.getBlock block
            start = @data.offsetForBlock current
            {results, last} = blockCodeItems this, current
            if str[str.length - 1] != '\n' then str += '\n'
            str = "#+RESULTS:\n" + str
            if results
              start += results.offset
              end = start + results.text.length
            else end = (start += last.end())
            @replaceText start, end, str, true

      trickyChange = (oldBlock, newBlock)->
        oldBlock._id != newBlock._id ||
        ('headline' in (t = [oldBlock.type, newBlock.type]) && t[0] != t[1]) ||
        (t[0] == 'headline' && oldBlock.level != newBlock.level)

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
        #$("#selectionBubble")
        #  .html selectionMenu
        #  .on 'mouseenter', -> configureMenu $("#selectionBubble ul")
        #$("#selectionBubble ul").menu select: (event, ui)-> console.log "MENU SELECT"; false
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

      toolbarFor = (el)->
        $(el).closest('[data-view]')[0]

      editorForToolbar = (el)->
        findEditor toolbarFor(el).nextSibling

      editorToolbar = (editorNode)-> findEditor(editorNode).node.prev()

      showHide = (toolbar)->
        editingOpts = editorForToolbar(toolbar).options
        editingOpts.toggleHidden()
        editingOpts.hiding

      breakpoint = ->
        console.log()
        console.log "breakpoint"

      isContentEditable = (node)->
        (if node instanceof Element then node else node.parentElement).isContentEditable

      getDocumentParams = ->
        if !documentParams
          documentParams = {}
          for param in document.location.search.substring(1).split '&'
            [k,v] = param.split '='
            documentParams[k.toLowerCase()] = v
        documentParams

      followLink = (e)-> Leisure.findEditor(e.target)?.options.followLink(e) || false

      replacementFor = (start, oldText, newText)->
        end = start + (oldText.length ? 0)
        for startOff in [0...Math.min oldText.length, newText.length]
          if oldText[startOff] != newText[startOff] then break
        start += startOff
        for endOff in [0..Math.min oldText.length - startOff - 1, newText.length - startOff - 1] by 1
          if oldText[oldText.length - endOff - 1] != newText[newText.length - endOff - 1]
            break
        {
          start
          end: end - endOff
          text: (if startOff || endOff then newText.substring startOff, newText.length - endOff else '')
        }

Exports

      mergeExports {
        findEditor
        showHide
        toolbarFor
        editorToolbar
        editorForToolbar
        breakpoint
        blockOrg
        parseOrgMode
        followLink
      }

      {
        createLocalData
        OrgData
        OrgEditing
        installSelectionMenu
        blockOrg
        setResult
        setError
        toolbarFor
        editorToolbar
        editorForToolbar
        blockCodeItems
        escapeAttr
        blockIsHidden
        blockEnvMaker
        controllerEval
        getDocumentParams
        basicDataFilter
        replacementFor
      }
