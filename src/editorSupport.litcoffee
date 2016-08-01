+Editing support for Leisure

This file customizes the editor so it can handle Leisure files.  Here is the Leisure
block structure:  ![Block structure](private/doc/blockStructure.png)

    define ['./base', './org', './docOrg', './ast', './eval', './leisure-support', './editor', 'lib/lodash.min', 'jquery', './ui', './db', 'handlebars', './export', './lib/prism', './advice', 'lib/js-yaml', 'lib/bluebird.min', 'immutable', 'lib/fingertree', './tangle', 'lib/sha1'], (Base, Org, DocOrg, Ast, Eval, LeisureSupport, Editor, _, $, UI, DB, Handlebars, BrowserExports, Prism, Advice, Yaml, Bluebird, Immutable, FingerTree, Tangle, SHA1)->
      {
        defaultEnv
        CodeContext
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
        blockOrg: docBlockOrg
        ParsedCodeBlock
      } = DocOrg
      {
        Nil
      } = Ast
      {
        languageEnvMaker
        Html
        presentHtml
        setLounge
        blockVars
        blocksObserved
        hasCodeAttribute
        isYamlResult
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
        findEditor
        copyBlock
        preserveSelection
        BasicEditingOptions
        modifyingKey
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
        Set
      } = Immutable
      {
        Promise
      } = Bluebird
      {
        shouldTangle
      } = Tangle

      selectionActive = true
      headlineRE = /^(\*+ *)(.*)(\n)$/
      documentParams = null
      localStoreName = 'leisureStorage'
      localDb = null
      localStore = null
      deleteStore = false
      bubbleTopOffset = -5
      bubbleLeftOffset = 0
      keySplitPat = new RegExp ' +'
      postCallPat = /^([^(]*)\((.*)\)/

      CodeContext::executeBlock = (block, props, cont)-> @executeText blockSource(block), props, cont

      blockOrg = (data, blockOrText)-> docBlockOrg (if typeof blockOrText == 'string' then data.getBlock blockOrText) ? blockOrText

`OrgData` -- a DataStore that supports block-structured org file data.
Each block has type 'headline', 'code', or 'chunk'.  Blocks use nextSibling
and previousSibling ids to indicate the tree structure of the org document
(there are no direct parent/child links).

      class OrgData extends DataStore
        constructor: ->
          DataStore.apply this, arguments
          @disableObservation = true
          @pendingObserves = {}
          @running = {}
          @observers = new NMap()
          @filters = []
          @initializeLocalData()
          @pendingEvals = []
          @importPromise = Promise.resolve()
          @tangles = {}
        change: (changes)->
          ch = @makeChange changes
          @trigger 'change', ch
        allowObservation: (func)->
          old = @disableObservation
          @disableObservation = false
          func()
          @disableObservation = old
        addImported: (importFile, type, name)->
          if typeof importFile == 'string'
            if @importRecords[type][name]
              @importRecords[type][name].push importFile
              console.log "Warning, conflicting block of type: #{type} imported from #{@importRecords[type][name]}"
            else @importRecords[type][name] = [importFile]
          else typeof importFile == 'boolean'
        initializeLocalData: ->
          @namedBlocks = {}
          @localBlocks = {}
          @indexes = FingerTree.fromArray [],
            identity: -> []
            measure: (v)-> v.key
            sum: (a, b)-> if compareSorted(a, b) < 1 then b else a
          @imported =
            css: {}
            view: {}
            control: {}
            data: {}

At this point, there is no conflict handling for imports that use the
same names for blocks other than printing a warning.

          @importedData = {}
          @importRecords =
            data: {}
            view: {}
            controller: {}
            importedFiles: {}
          transaction(@localDocumentId()).getAll().then (allData)=>
            @localBlocks = _.keyBy allData, '_id'
            deletes = []
            for name of @localBlocks
              if !@namedBlocks[name] || !(@getBlockNamed name).local then deletes.push name
            for name in deletes
              @deleteLocalBlock name
        replaceText: (repl)->
          super repl
          @runTextFilters repl
          @scheduleEvals()
        #makeChanges: (func)->
        #  if newChange = !@changeCount
        #    for filter in @filters
        #      filter.startChange this
        #  try
        #    super func
        #  finally
        #    if newChange then for filter in @filters
        #      filter.endChange this
        getImage: (name, cont, fail)->
          @getFile name, ((contents)->
            if url = makeImageBlob name, contents then cont url else fail "Couldn't create image for #{{name}}"
          ), fail
        getBlock: (thing, changes)->
          if typeof thing == 'object' then thing
          else changes?.sets[thing] ? super(thing) ? @imported.data[thing]
        changesFor: (first, oldBlocks, newBlocks)->
          changes = super first, oldBlocks, newBlocks
          @linkAllSiblings changes
          changes

`load` -- not the best use of inheritance here, changes is specifically for P2POrgData :).
Let's just call this poetic license for the time being...

        load: (name, text, context)->
          @loadName = name
          @makeChanges =>
            replacement = context ?
              start: 0
              end: @getLength()
              text: text
              source: 'load'
            @initializeLocalData()
            @loading = true
            @suppressTriggers => super name, text
            for filter in @filters
              filter.clear this
            newBlocks = @blockList()
            if !changes then changes = sets: @blocks, oldBlocks: [], newBlocks: newBlocks, first: @first
            @linkAllSiblings changes
            for id, block of changes.sets
              @checkImports block
            @runTextFilters context
            for id, block of changes.sets
              @runFilters null, block, context
              @checkChange null, block
            @scheduleEvals().then => @trigger 'load'
            @loading = false
        loadTangles: (tangleText)-> eval tangleText
        addTangle: (block, code)->
          console.log "ADDING TANGLE: #{block.hash}"
          @tangles[block.hash] = code ? block
        hasTangle: (block)-> @getTangle block
        getTangle: (block)-> @tangles[block.hash ? block.hash = SHA1.hash block.text]
        tangleAddData: (block, data)->
          @addTangle block
          if block.codeName then @importedData[block.codeName] = block
        tangleAddView: (block, code)->
          @addTangle block
          @checkViewChange null, block, true
        tangleAddController: (block, code)-> @addTangle block, code
        tangleAddObserver: (block, code)-> @addTangle block, code
        tangleAddDef: (block, code)-> @addTangle block, code
        setBlock: (id, block)->
          @makeChanges =>
            @runFilters @getBlock(id), block
            super id, block
        contextForBlock: (id, context)->
          if start = @offsetForBlock id
            context.start = start
            context.end = start + @getBlock(id).text.length
            context
        deleteBlock: (id)->
          @makeChanges =>
            @runFilters @getBlock(id), null
            super id
        addFilter: (filter)-> @filters.push filter
        removeFilter: (filter)-> _.remove @filters, (i)-> i == filter
        runFilters: (oldBlock, newBlock, context)->
          for filter in @filters
            filter.replaceBlock this, oldBlock, newBlock, context
        runTextFilters: (context)->
          if context
            for filter in @filters
              filter.replaceText? this, context
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
            else if cur.type == 'chunk' && cur.properties? && parent && !_(parent.propertiesBlocks).includes cur._id
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
          for id, block of changes.sets
            @checkImports block
          for id, block of @removesAndSets changes
            if block then @checkChange @getBlock(id), block ? null
          super changes
        removesAndSets: ({sets, removes})->
          blocks = {}
          for id of removes
            blocks[id] = false
          for id, block of sets
            blocks[id] = block
          blocks
        processDefaults: (lorgText)->
          viewBlocks = orgDoc parseOrgMode lorgText.replace /\r\n?/g, '\n'
          id = 0
          for block in viewBlocks
            block._id = "default-#{id++}"
            @checkChange null, block, true
          @scheduleEvals()
        checkChange: (oldBlock, newBlock, isDefault)->
          @checkIndexChange oldBlock, newBlock, isDefault
          @checkPropChange oldBlock, newBlock, isDefault
          @checkCssChange oldBlock, newBlock, isDefault
          @checkCodeChange oldBlock, newBlock, isDefault
          @checkChannelChange oldBlock, newBlock
          @checkViewChange oldBlock, newBlock, isDefault
          @checkControlChange oldBlock, newBlock, isDefault
        checkIndexChange: (oldBlock, newBlock, isDefault)->
          if newBlock
            if (index = newBlock.codeAttributes?.index) && yaml = @getYaml newBlock
              newBlock.keys = (for key in ((k.trim().split keySplitPat) for k in index.split ',') when key.length == 2
                [key[0].trim(), key[1].trim(), newBlock._id]).sort compareSorted
            else delete newBlock.keys
          if !(_.isEqual newBlock?.keys, oldBlock?.keys)
            if oldBlock?.keys
              k = newBlock?.keys ? []
              for key in oldBlock.keys
                if !(key in k) then @deleteBlockKey id: oldBlock._id, key: key
            if newBlock.keys
              k = oldBlock?.keys ? []
              for key in newBlock.keys
                if !(key in k) then @addBlockKey id: newBlock._id, key: key
        addBlockKey: (k)->
          [first, rest] = @indexes.split (m)-> m >= k.key
          @indexes = first.concat rest.addFirst k
        deleteBlockKey: (k)->
          [first, rest] = @indexes.split (m)-> m == k.key
          r = rest
          while !r.isEmpty() && found = r.peekFirst() && found.key == k.key && found.id == k.id
            r = r.removeFirst()
          if r != rest then @indexes = first.concat rest
        find: (index, key)->
          k = [index]
          result = []
          if key then k.push key
          [first, rest] = @indexes.split (m)-> compareSorted(k, m) < 1
          while !rest.isEmpty() && isPrefix k, rest.peekFirst().key
            result.push rest.peekFirst().id
            rest = rest.removeFirst()
          result
        queueEval: (func)-> @pendingEvals.push func
        runOnImport: (func)->
          @importPromise = if @importPromise.isResolved()
            p = func()
            if p instanceof Promise then p else Promise.resolve()
          else @importPromise.then => func()
        scheduleEvals: -> @runOnImport =>
          e = @pendingEvals
          @pendingEvals = []
          for func in e
            func()
          if !_.isEmpty @pendingObserves
            @allowObservation =>
              blocked = {}
              oldRunning = {}
              while !_.isEmpty @pendingObserves
                p = @pendingObserves
                @pendingObserves = {}
                for blockId of p
                  if !@running[blockId] && (block = @getBlock(blockId))
                    blocked[blockId] = true
                    oldRunning[blockId] = @running[blockId]
                    @running[blockId] = true
                    obs = block.observer
                    block.observer?.observe?()
                    if !@getBlock(block._id).observer then @getBlock(block._id).observer = obs
              for k of blocked
                @running[k] = oldRunning[k]
        triggerUpdate: (channelKeys..., block)->
          if items = @observers.get channelKeys...
            for id, v of items
              # verify that it's exactly equal to true
              # if not, then it's not really an observer
              if v == true && !@running[id] then @pendingObserves[id] = true
          null
        checkPropChange: (oldBlock, newBlock, isDefault)->
          if !isDefault && !newBlock?.level && !_.isEqual(oldBlock?.properties, newBlock?.properties) && parent = @parent newBlock ? oldBlock
            newProperties = _.defaults @parseBlocks(parent.text).properties ? {}, newBlock.properties ? {}
            if !_.isEqual parent.properties, newProperties
              sets = {}
              sets[parent._id] = parent
              parent.properties = newProperties
              setTimeout (=> @change {first: @getFirst(), sets, removes: {}, oldBlocks: [], newBlocks: [parent]}), 1
        checkCssChange: (oldBlock, newBlock, isDefault)->
          if isCss(oldBlock) || isCss(newBlock)
            $("#css-#{blockElementId(oldBlock) || blockElementId(newBlock)}").filter('style').remove()
          if isCss newBlock
            $('head').append "<style id='css-#{blockElementId newBlock}'>#{blockSource newBlock}</style>"
        checkCodeChange: (oldBlock, newBlock, isDefault)->
          if newBlock && @running[newBlock._id] then return
          oldName = oldBlock?.codeName ? (oldBlock?.type == 'headline' && oldBlock?.properties?.name)
          newName = newBlock?.codeName ? (newBlock?.type == 'headline' && newBlock?.properties?.name)
          if oldName != newName
            if oldName then @deleteBlockName oldName
            if newName && (!isDefault || @addImported isDefault, 'data', newName)
              @setBlockName newName, newBlock._id, isDefault
          if isDefault && newName then @imported.data[newBlock._id] = newBlock
          if oldBlock?.local && !newBlock?.local then @deleteLocalBlock oldName
          if (resultType = newBlock?.codeAttributes?.results?.toLowerCase() in ['def', 'web']) || (resultType = newBlock?.codeAttributes?.observe? && 'observe')
            opts = defaultEnv.opts
            @queueEval =>
              oldOpts = defaultEnv.opts
              defaultEnv.opts = opts
              if resultType == 'observe'
                @updateObserver newBlock, oldBlock
                @createObserver newBlock
              else @executeBlock newBlock
              defaultEnv.opts = oldOpts
        createObserver: (block)->
          env = @env block.language
          blockId = block._id
          sync = false
          if isYamlResult block
            env.write = (str)->
              result += str
              if result[result.length - 1] != '\n' then result += '\n'
              if !sync then @replaceResult change._id, result
          else
            env.write = (str)->
              result += presentHtml str
              if result[result.length - 1] != '\n' then result += '\n'
              if !sync then @replaceResult change._id, result
          block.observer = new CodeContext()
          block.observer.data = this
          block.observer.observe = =>
            sync = true
            try
              @replaceResult blockId, env.formatResult @getBlock(blockId), '', @getCode(blockId).call block.observer
            catch err
              @replaceResult blockId, ": #{err.stack.replace /\n/g, '\n: '}"
            sync = false
        checkChannelChange: (oldBlock, newBlock)-> if !@disableObservation
          if type = @getYaml(newBlock)?.type then @triggerUpdate 'type', type, newBlock
          if name = newBlock?.codeName then @triggerUpdate 'block', name, newBlock
          if channels = newBlock?.codeAttributes?.channels
            for channel in channels.split ' '
              @triggerUpdate (channel.split '.')..., newBlock
          null
        updateObserver: (block, oldBlock)->
          obs = @decodeObservers block
          block.observing = obs
          oldObs = oldBlock?.codeAttributes?.observe?.split(' ') ? []
          for ch in oldObs
            if !(ch in obs)
              @observers.remove (ch.split '.')..., getId(oldBlock)
          for ch in obs
            if !(ch in oldObs)
              @observers.add (ch.split '.')..., getId(block), true
        getNamedBlockId: (name)-> @namedBlocks[name] ? @importedData[name]
        setBlockName: (name, blockId, isDefault)->
          (if isDefault then @importedData else @namedBlocks)[name] = blockId
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
          #{if name then "#+NAME: #{name}\n" else ''}#+BEGIN_SRC yaml #{(":#{k} #{v}" for k, v of attrs).join ' '}
          #{dump(data, _.defaults attrs ? {}, {sortKeys: true, flowLevel: 2}).trim()}
          #+END_SRC

          """
        checkViewChange: (oldBlock, newBlock, isDefault)->
          if oldBlock && ov = blockViewType oldBlock
            removeView ov
          if vt = blockViewType newBlock
            source = blockSource newBlock
            if !isDefault || @addImported isDefault, 'view', vt
              addView vt, null, source.substring(0, source.length - 1), isDefault
        checkControlChange: (oldBlock, newBlock, isDefault)->
          if (isControl(oldBlock) || isControl(newBlock)) && (oldBlock?.type != 'code' || blockSource(oldBlock) != blockSource(newBlock) || isControl(oldBlock) != isControl(newBlock))
            @queueEval => @changeController oldBlock, newBlock, isDefault
        changeController: (oldBlock, newBlock, isDefault)->
          if newBlock && @running[newBlock._id] then return
          if oldBlock && ov = blockViewType oldBlock, 'control', isDefault
            removeController ov
          if vt = blockViewType newBlock, 'control'
            controller = {}
            if !isDefault || @addImported isDefault, 'controller', vt
              addController vt, null, controller, isDefault
              env = @env newBlock.language
              controller.__proto__ = env
              setLounge env, => @getCode(newBlock).call controller
              controller.__proto__ = null
        oldExecuteBlock: (block, envConf)->
          @executeText block.language, blockSource(block), null, (env)->
            envConf? env
            if newBlock?.codeAttributes?.results?.toLowerCase() in ['def', 'silent']
              env.silent = true
              env.write = (str)-> console.log str
        executeBlock: (block, envConf)->
          env = @env block.language, (env)->
            envConf? env
            if newBlock?.codeAttributes?.results?.toLowerCase() in ['def', 'web', 'silent']
              env.silent = true
              env.write = (str)-> console.log str
          if code = @getCode block then setLounge env, code
          else @oldExecuteBlock block, envConf
        env: (language, envConf)->
          if env = languageEnvMaker(language)?(__proto__: defaultEnv)
            env.data = this
            env.write = (str)-> console.log str
            envConf?(env)
            env
        executeText: (language, text, cont, envConf)->
          @env(language, envConf).executeText text, Nil, (cont ? (x)-> x)
        checkImports: (block)->
          if (i = block?.properties?.import) && !@importRecords.importedFiles[filename = block.properties.import]
            console.log "Import: #{block?.properties?.import}"
            @importRecords.importedFiles[filename] = true
            @runOnImport => new Promise (resolve, reject)=>
              @getFile filename, ((contents)=>
                oldPromise = @importPromise
                oldEvals = @pendingEvals
                @pendingEvals = []
                @importPromise = Promise.resolve()
                id = 0
                for block in @parseBlocks contents
                  block._id = "imported-#{filename}-#{id++}"
                  @checkChange null, block, filename
                @scheduleEvals().then =>
                  @pendingEvals = oldEvals
                  @importPromise = oldPromise
                  resolve()), (e)=> reject displayError e
        getFile: (filename, cont, fail)-> ajaxGet(new URL(filename, @loadName).toString()).then(cont).error(fail)
        decodeObservers: (block)->
          finalObs = []
          obs = block.codeAttributes?.observe?.split(' ') ? []
          for ob in obs
            if ob in ['vars', '']
              bv = blockVars this, block.codeAttributes?.var
              finalObs.push ("block.#{bv[4][v]}" for v in bv[3])...
            else finalObs.push ob
          finalObs
        runBlock: (block, func)->
          id = getId block
          r = @running[id]
          @running[id] = true
          try
            func()
          finally
            @running[id] = r
        replaceResult: (block, str)->
          block = @getBlock (if typeof block == 'string' then block else block._id)
          @runBlock block, =>
            replaceResult this, this, block, str
        clearError: (block)->
          block = @getBlock (if typeof block == 'string' then block else block._id)
          {error, results} = blockCodeItems this, block
          if error
            start = @offsetForBlock(block) + error.offset
            @runBlock block, => @replaceText {start, end: start + error.text.length, text: '', source: 'code'}, true
        getYaml: (block)->
          block = @getBlock block
          block.yaml ? (block.yaml = if isYamlResult block
            {results} = blockCodeItems this, block
            if results
              firstResult = results.text.indexOf('\n') + 1
              safeLoad results.text.substring(firstResult).replace /(^|\n): /gm, '$1'
          else null)
        getCode: (block, env)->
          block = @getBlock block
          if block.code then block.code
          else
            tangle = @getTangle block
            code = (if typeof tangle == 'function'
              console.error "GOT TANGLED CODE", block._id
              tangle
            else if isText block then (cont)->
              if cont then cont.call this, [blockSource block]
              else [blockSource block]
            else if block.language == 'yaml' then (cont)->
              yaml = (!block.computedYaml && block.yaml) || parseYaml blockSource block
              if cont then cont.call this, [yaml] else [yaml]
            else if env = env ? @env(block.language) then env.compileBlock block)
            if code then block.code = @addPostProcessing block, code
        parsedCodeBlock: (block)-> new EditorParsedCodeBlock this, block
        addPostProcessing: (block, func)->
          if m = block.codeAttributes?.post?.match postCallPat
            [..., blockName, argNames] = m
            argNames = argNames.trim().split '\s*,\s*'
            blockName = blockName.trim()
            data = this
            (cont, args...)->
              if postProcessor = data.getCode data.getBlockNamed blockName
                func.call this, ((result)->
                  if result.length == 1 then result = result[0]
                  blockArgs = []
                  Lounge?.blockVars = blockArgs
                  postProcessor.call this, cont, (for arg in argNames
                    if `Number(arg) == arg` || arg[0] in "'\""
                      blockArgs.push null
                      JSON.parse arg
                    else
                      if arg == '*this*'
                        argBlock = block
                        argData = result
                      else
                        argBlock = data.getBlockNamed arg
                        argData = data.getYaml argData
                      blockArgs.push argBlock
                      argData)...), args...
          else func

      makeImageBlob = (name, contents)->
        if m = name.match /png|gif|bmp|xpm|svg+xml/
          byteArrays = for offset in [0...contents.length] by 512
            slice = contents.slice offset, offset + 512
            new Uint8Array (slice.charCodeAt(i) for i in [0...512])
          blob = new Blob byteArrays, type: "image/#{m[0]}"
          URL.createObjectURL blob

      class EditorParsedCodeBlock extends ParsedCodeBlock
        constructor: (@data, block)->
          super @data.getBlock(block) || block
        clone: -> new EditorParsedCodeBlock @data, @block
        save: (withUpdates)->
          start = @data.offsetForBlock @block._id
          replaceBlock = => @data.replaceText {start, end: start + @data.getBlock(@block._id).text.length, text: @block.text, source: 'code'}
          if withUpdates then replaceBlock()
          else @data.runBlock @block, replaceBlock

      displayError = (e)->
        console.log "Error: #{e}"
        e

      compareSorted = (a, b)->
        for i in [0...Math.min a.length, b.length]
          if a[i] < b[i] then return -1
          if a[i] > b[i] then return 1
        a.length - b.length

      isPrefix = (a, b)->
        if a.length > b.length then return false
        for av, i in a
          if av != b[i] then return false
        true

      basicDataFilter =
        #startChange: (data)->
        #endChange: (data)->
        clear: (data)->
        replaceBlock: (data, oldBlock, newBlock)->
        replaceText: (data, {start, end, text, source})->

      blockElementId = (block)-> block && (block.codeName ? block._id)

      blockIsHidden = (block)->
        String(block?.properties?.hidden ? '').toLowerCase() == 'true'

`controllerEval` looks like a useless wrapper for eval, but you can use `apply()`
and `call` to set "this" for the code, which you can't do with the primitive `eval()`

      controllerEval = (txt)-> eval txt

      isCss = (block)-> block?.language == 'css'

      isText = (block)-> block?.language.trim() in ['text', 'string']

      isControl = (block)-> block?.type == 'code' && block.codeAttributes?.control

      blockViewType = (block, attr = 'defview')->
        (block?.type == 'code' && block.codeAttributes?[attr]) ? null

      addChange = (block, changes)->
        if !changes.sets[block._id]
          changes.oldBlocks.push block
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

NMap is a very simple trie.

      class NMap
        constructor: (@items)-> if !@items then @items = {}
        clone: -> new NMap _.clone @items
        clear: -> @items = {}
        add: (args..., value)->
          i = @items
          for pos in [0...args.length - 1]
            if !i[args[pos]] then i[args[pos]] = {}
            i = i[args[pos]]
          i[args[args.length - 1]] = value
        get: (keys...)->
          i = @items
          for pos in [0...keys.length]
            if !i[keys[pos]] then return null
            i = i[keys[pos]]
          i
        getAll: (keys...)-> new NMap @get keys...
        remove: (keys...)->
          path = []
          items = @items
          for pos in [0...keys.length]
            if !items[keys[pos]] then break
            path.push items
            items = items[keys[pos]]
          for collection, i in path by -1
            delete collection[keys[i]]
            if !_.isEmpty collection then break
          items[keys[keys.length - 1]]
        toString: -> "NMAP #{JSON.stringify @items}"

      window.NMap = NMap

`OrgEditing` -- editing options for the org editor.

      class OrgEditing extends DataStoreEditingOptions
        constructor: (data)->
          super data
          @setPrefix 'leisureBlock-'
          @hiding = true
          @setMode Leisure.plainMode
          @toggledSlides = {}
          @dataChanges = null
          @pendingDataChanges = null
          @collaborativeCode = {}
          @collaborativeBase = {}
        runBlock: (block, replace)-> @data.runBlock block, replace
        parsedCodeBlock: (block)->
          pb = @data.parsedCodeBlock block
          pb.data = this
          pb
        dataChanged: (changes)->
          preserveSelection =>
            super changes
            initializePendingViews()
        dataLoaded: ->
          super()
          @rerenderAll()
        load: (name, text)->
          oldOpts = defaultEnv.opts
          defaultEnv.opts = this
          super name, text
          defaultEnv.opts = oldOpts
        renderBlocks: -> @mode.renderBlocks this, super()
        setTheme: (theme)->
          if @theme then @editor.node.removeClass @theme
          @editor.node.addClass @theme = theme
        toggleSlides: -> @mode.setSlideMode this, !@showingSlides()
        showingSlides: -> @mode.showingSlides this
        hideToolbar: -> @editor.node.prev().addClass 'collapse'
        showToolbar: -> @editor.node.prev().removeClass 'collapse'
        getLocalBlock: (thing)-> @data.getLocalBlock thing
        isValidDocOffset: (offset)->
          if @currentSlide
            start = @data.offsetForBlock(@currentSlide)
            if next = @data.nextSibling @currentSlide
              end = @data.offsetForBlock(next) + next.text.length
            else end = start + @getBlock(@currentSlide).text.length
            start <= offset < end
          else super offset
        rerenderAll: ->
          super()
          initializePendingViews()
        verifyDataObject: (opType, obj)->
          if !(typeof obj in ['object', 'string', 'number', 'boolean'])
            throw new Error "Attempt to #{opType} value that is not an object."
        blockBoundsForHeadline: (name)->
        blockBounds: (name)->
          if name
            block = if typeof name == 'string' then @data.getBlockNamed name else name
            start = @data.offsetForBlock block
            end = start + block.text.length
            {start, end, gStart: start, gEnd: end}
        appendDataToHeadline: (parent, name, value, codeOpts)->
          @appendData 'headline', parent, name, value, codeOpts
        appendDataAfter: (parent, name, value, codeOpts)->
          @appendData 'block', parent, name, value, codeOpts
        appendData: (parentType, parent, name, value, codeOpts)->
          [block] = @data.parseBlocks @data.textForDataNamed name, value, codeOpts
          @checkCollaborating block
          if name && @getData(name) then throw new Error "Attempt to add block with duplicate name: #{name}"
          if b = @blockBounds (if parentType == 'block' then parent else @data.lastChild @data.getNamedBlockId parent)
            @data.replaceText start: b.end, end: b.end, source: 'code', text: block.text
          else throw new Error "Attempt to append a block after nonexistant block: #{parent}"
        getLocalData: (name)->
          if block = @data.getBlockNamed name
            if !block.local then throw new Error "Attempt to use getLocalData with a shared block"
            @data.getYaml block
        getData: (name, skipCheck)->
          if block = @data.getBlockNamed(name)
            if !skipCheck then @checkCollaborating block
            @data.getYaml block
        setLocalData: (name, value, codeOpts)->
          if !(block = @data.getBlockNamed name) then throw new Error "No block named #{name}"
          if !block.local then throw new Error "Attempt to use setLocalData with a shared block"
          @baseSetData name, block, value, codeOpts
        setData: (name, value, codeOpts)->
          if !(block = @data.getBlockNamed name) then throw new Error "No block named #{name}"
          @checkCollaborating block
          @baseSetData name, block, value, codeOpts
        baseSetData: (name, block, value, codeOpts)->
          @verifyDataObject "set #{name} to ", value
          codeOpts = _.merge {}, block.codeAttributes ? {}, codeOpts ? {}
          [newBlock] = @data.parseBlocks @data.textForDataNamed name, value, codeOpts
          if newBlock.local
            newBlock._id = block._id
            @data.storeLocalBlock newBlock
          else
            b = @blockBounds name
            b.text = newBlock.text
            b.source = 'code'
            @data.replaceText b
        removeData: (name)->
          if !(block = @data.getBlockNamed name) then throw new Error "No block named #{name}"
          @checkCollaborating()
          if block.local then @dataChanges.localRemoves[name] = true
          b = @blockBounds name
          b.text = ''
          b.source = 'code'
          @data.replaceText b
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
            nb = _.values(_.keyBy(nb, '_id'))
            @mode.renderChanged this, nb, @idPrefix, true
            @withNewContext =>
              for node in viewNodes.filter((n)=> !nb[@idForNode n])
                node = $(node)
                if data = @data.getYaml block = @blockForNode node
                  [view, name] = ($(node).attr('data-requested-view') ? '').split '/'
                  renderView view, name, data, node, block
              for node in nameNodes.filter((n)=> !nb[@idForNode n])
                node = $(node)
                if (data = @data.getYaml blk = @data.getBlockNamed(blkName = node.attr 'data-view-block-name')) && data.type
                  if $(node).hasClass 'error'
                    view = data.type
                    name = $(node).attr 'data-view-name'
                  else [view, name] = ($(node).attr('data-requested-view') ? '').split '/'
                  renderView view, name, data, node, blk, blkName
          else super changes
        blockForNode: (node)->
          @getBlock(node.attr 'data-view-block') ?
            @data.getBlockNamed(node.attr 'data-view-block-name')
        find: (sel)-> $(@editor.node).find sel
        findViewsForDefiner: (block, nodes)->
          if block
            attrs = (block.type == 'code' && block.codeAttributes)
            if attrs && viewType = (attrs.control ? attrs.defview)
              nodes = nodes.add @find "[data-view='#{viewType}']"
              nodes = nodes.add @find "[data-requested-view='#{viewType}']"
          nodes
        withNewContext: (func)-> mergeContext Leisure.rootContext, =>
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
        imageError: (img, e)->
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
            keyPress: options: (parent)-> (e)->
              opts.mode.keyPress opts, parent, e
            enter: options: (parent)-> (e)->
              opts.mode.enter opts, parent, e
            handleDelete: options: (parent)-> (e, sel, forward)->
              opts.mode.handleDelete opts, parent, e, sel, forward
            setCurrentScript: options: (parent)-> (script)->
              Leisure.UI.currentScript = script
            activateScripts: options: (parent)-> (jq)->
              if UI.context then UI.activateScripts jq, UI.context
              else parent jq
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
          else
            changes = @changesFor prev, oldBlocks, newBlocks
          if !skipMode then @mode.handleChanges this, changes
          changes
        replaceText: (repl, skipEffects)->
          if !skipEffects && {repls} = @replaceTextEffects repl.start, repl.end, repl.text
            @data.allowObservation => super repl
            if repls
              for repl in repls
                @replaceText repl, true
          else @data.allowObservation => super repl

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
            #@data.checkChannelChange oldBlock, change, true
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
        replaceBlock: (block, textOrBlock, source)->
          block = @getBlock block
          offset = @data.offsetForBlock block
          text = if typeof textOrBlock == 'object' then textOrBlock.text else textOrBlock
          @replaceText {start: offset, end: offset + block.text.length, text, source}
        update: (block)->
          oldBlock = @getBlock block._id
          if !_.isEqual block, oldBlock
            @replaceBlock oldBlock, block.text, 'code'
        changesHidden: (changes)->
          if @canHideSlides()
            for change in changes.oldBlocks
              if @shouldHide change then return true
          false
        checkPropertyChange: (changes, change, oldBlock)->
          change.type == 'chunk' && !_.isEqual change.properties, @getBlock(change._id)?.properties
        checkCodeChange: (changes, change, oldBlock, oldBlocks, newBlocks)->
          try
            if !@data.running[change._id] && change.type == 'code' && isDynamic(change) && !isObserver(change) && envM = blockEnvMaker(change)
              {source: newSource, results: newResults} = blockCodeItems this, change
              hasChange = !oldBlock || oldBlock.type != 'code' || !(isDynamic(oldBlock) && !isObserver(oldBlock)) || if oldBlock
                oldSource = blockSource oldBlock
                newSource.content != oldSource.content
              if hasChange
                result = ''
                newBlock = setError change
                sync = true
                env = envM
                  __proto__: defaultEnv
                  write: ->
                  opts: this
                  data: @data
                  prompt: (str, defaultValue, cont)-> cont prompt(str, defaultValue)
                opts = this
                do (change)=>
                  env.errorAt = (offset, msg)->
                    newBlock = setError change, offset, msg
                    if newBlock != change && !sync
                      opts.replaceBlock change, newBlock.text, 'code'
                  env.write = (str)=>
                    result += presentHtml str
                    if result[result.length - 1] != '\n' then result += '\n'
                    if !sync then @replaceResult change._id, result
                finished = {}
                res = (if change.codeAttributes?.post then setLounge env, => @data.getCode(newBlock).call(env, (data)->
                  result = env.formatResult newBlock, '', data
                  finished)
                #else env.executeText newSource.content, Nil, (-> finished))
                else @data.getCode(newBlock).call env, (data)->
                  result = env.formatResult newBlock, '', data
                  finished)
                if finished == res
                  oldCode = newBlock.code
                  newBlock = setResult newBlock, result
                  newBlock.code = oldCode
                  if newBlock.text != change.text
                    changes.sets[newBlock._id] = newBlock
                    for block, i in changes.newBlocks
                      if block._id == newBlock._id then changes.newBlocks[i] = newBlock
                    start = @offsetForNewBlock newBlock, oldBlocks, newBlocks
                    changes.repls.push repl = replacementFor start, change.text, newBlock.text
                    repl.source = 'code'
                sync = false
          catch err
            null
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
        env: (language)->
          env = @data.env language
          env.opts = this
          env.prompt = (str, defaultValue, cont)-> cont prompt(str, defaultValue)
          env
        executeBlock: (block, envM)->
          if envM = blockEnvMaker block
            {source} = blockCodeItems this, block
            result = ''
            sync = true
            env = envM
              __proto__: defaultEnv
              opts: opts = this
              data: @data
            newBlock = setError block
            env.errorAt = (offset, msg)->
              newBlock = setError block, offset, msg
              if newBlock != block && !sync then opts.update newBlock
            env.write = (str)->
              result += presentHtml str
              if !sync then opts.update newBlock = setResult block, result
            env.prompt = (str, defaultValue, cont)-> cont prompt(str, defaultValue)
            setLounge env, -> env.executeBlock block, Nil, ->
            sync = false
            newBlock = setResult newBlock, result
            if newBlock != block then opts.update newBlock
        renderImage: (src, title)->
          if @loadName && ((m = src.match /^file:(\/\/)?(.*)$/) || !(src.match /^.*:/))
            src = new URL(m?[2] ? src, @loadName).toString()
          "<img src='#{src}'#{title}>"
        followLink: (e)->
          if e.target.href.match /^elisp/
            console.log "Attempt to follow elisp link at #{@editor.docOffset e.target, 0}"
            alert "Elisp links not supported:\n#{e.target.href}"
          else open e.target.href
          false
        replaceResult: (block, str)-> replaceResult this, @data, block, str
        hasCollaborativeCode: (name)-> @collaborativeCode[name]
        registerCollaborativeCode: (name, func)->
          @collaborativeCode[name] = (args...)=> @doCollaboratively name, args
          @collaborativeBase[name] = func
        _runCollaborativeCode: (name, slaveId, args)->
          new Promise (succeed, fail)=>
            try
              @inCollaboration = true
              if code = @collaborativeBase[name]
                succeed code {options: this, slaveId}, args...
              else throw new Error "No collaborative code named '#{name}'"
            catch err
              fail err
            finally
              @inCollaboration = false
        doCollaboratively: (name, args)-> @_runCollaborativeCode name, null, args
        checkCollaborating: (optBlock)->
          if optBlock?.local then throw new Error "Attempt to use local block in collaborative code"
          else if !@inCollaboration then throw new Error "Not running collboartively"

      replaceResult = (source, data, block, str)->
        if typeof block != 'string' then blockId = block._id
        if current = data.getBlock block
          start = data.offsetForBlock current
          {results, last} = blockCodeItems this, current
          if str[str.length - 1] != '\n' then str += '\n'
          str = "#+RESULTS:\n" + str
          if results
            start += results.offset
            end = start + results.text.length
          else end = (start += last.end())
          source.replaceText {start, end, text: str, source: 'code'}, true

      trickyChange = (oldBlock, newBlock)->
        oldBlock._id != newBlock._id ||
          ('headline' in (t = [oldBlock.type, newBlock.type]) && t[0] != t[1]) ||
          (t[0] == 'headline' && oldBlock.level != newBlock.level)

      setResult = (block, result)->
        if block?.codeAttributes?.results?.toLowerCase() in ['def', 'web', 'silent']
          result = ''
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

      isDynamic = (block)-> hasCodeAttribute block, 'results', 'dynamic'

      isObserver = (block)-> block?.codeAttributes?.observe

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

      actualSelectionUpdate = ->
        if selectionActive
          if editor = findEditor getSelection().focusNode
            c = editor.domCursorForCaret()
            if !c.isEmpty() && (p = c.textPosition()) && isContentEditable c.node
              left = p.left
              top = p.top
              bubble = $("#selectionBubble")[0]
              bubble.style.left = "#{left + bubbleLeftOffset}px"
              bubble.style.top = "#{top - bubble.offsetHeight + bubbleTopOffset}px"
              $(document.body).addClass 'selection'
              editor.trigger 'selection'
              return
        $(document.body).removeClass 'selection'
        editor?.trigger 'selection'

      updateSelection = _.throttle (->
        actualSelectionUpdate()
        actualSelectionUpdate()), 30,
        leading: true
        trailing: true

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

      parseYaml = (yaml)->
        try
          safeLoad yaml
        catch err
          null

      replacementFor = (start, oldText, newText)->
        lim = Math.min oldText.length, newText.length
        startOff = endOff = 0
        while startOff < lim && oldText[startOff] == newText[startOff]
          startOff++
        if startOff < lim
          lim -= startOff
          endOff = 0
          while endOff < lim && oldText[oldText.length - endOff - 1] == newText[newText.length - endOff - 1]
            endOff++
        {
          start: start + startOff
          end: start + oldText.length - endOff
          text: newText.substring startOff, newText.length - endOff
        }

      ajaxGet = (url)->
        new Promise (resolve, reject)->
          xhr = new XMLHttpRequest
          xhr.responseType = 'arraybuffer'
          xhr.onerror = reject
          xhr.onload = (e)->
            binary = ''
            for i in new Uint8Array(e.target.response)
              binary += String.fromCharCode i
            resolve binary
          xhr.open "GET", url
          xhr.send null

Exports

      mergeExports {
        blockCodeItems
        findEditor
        showHide
        toolbarFor
        editorToolbar
        editorForToolbar
        breakpoint
        blockOrg
        parseOrgMode
        followLink
        defaultEnv
        preserveSelection
        rootContext: {}
        isDynamic
        ParsedCodeBlock
        setLounge
        parseYaml
        blockSource
        BasicEditingOptions
        LeisureEditCore
        DataStore
        DataStoreEditingOptions
        Editor
        CodeContext
        modifyingKey
        getId
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
        ajaxGet
        parseYaml
        makeImageBlob
        getId
      }
