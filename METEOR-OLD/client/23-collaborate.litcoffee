Meteor-based collaboration -- client side

    {
      resolve,
      lazy,
    } = root = module.exports = require '15-base'
    rz = resolve
    lz = lazy
    {
      SortedMap
    } = require 'collections/sorted-map'
    {
      gen,
      genMap,
      genSource,
      withFile,
      sourceNode,
      SourceNode,
    } = require '18-gen'
    {
      loadOrg,
    } = require '24-orgSupport'
    {
      json2Ast,
      ast2Json,
    } = require '16-ast'
    {
      parseOrgMode,
      Headline,
      Fragment,
    } = require '11-org'
    {
      docRoot,
      orgDoc,
      crnl,
    } = require '12-docOrg'
    {
      Monad2,
    } = require '17-runtime'
    {
      safeLoad,
      dump,
    } = Leisure.yaml

    root = require '15-base'
    _ = require 'lodash.min'
    Nil = resolve L_nil
    committing = false
    editing = false
    ignore = ->
    localStoreName = 'storage'
    nullHandlers = onsuccess: (->), onerror: ((e)-> console.log("ERROR:", e))
    codeContexts = {}
    observers = {}
    observing = {}
    observingDoc = {}
    importedDocs = {}
    universalObservers = {}
    context = L()
    indexes = {}
    namedBlocks = {}
    controllerIdDescriptor = {}
    controllerDescriptorIds = {}
    viewTypeData = {}
    viewIdTypes = {}
    dataTypeIds = {}
    updateAll = false
    scriptCounter = 0
    valid = true
    changePromise = Promise.resolve 0

Batching code -- addBatch batches items and calls the given function
with the batch You should send the same function for each batch name,
every time, because func is ignored after the first call in a batch

    batchers = null
    disableUpdates = false
    funcBatch = []
    funcBatchQueued = false
    renderCount = 1

    delay = (func)->
      funcBatch.push func
      if !funcBatchQueued
        funcBatchQueued = true
        setTimeout (->
          #console.log "Running batch of #{funcBatch.length} funcs"
          b = funcBatch
          funcBatch = []
          funcBatchQueued = false
          for f in b
            f()), 1

    addBatch = (name, value, func)->
      if !disableUpdates && (!committing || passesFilters name, value)
        #console.log "Adding batch: #{JSON.stringify value}"
        if !batchers
          batchers = []
          setTimeout runBatches, 100
        if batchers[name] then batchers[name][0].push value
        else batchers[name] = [[value], func]

    passesFilters = (name, value)->
      for name, filter of batchFilters
        if !filter name, value then return false
      true

    batchFilters = {}

    addBatchFilter = (name, filter)-> batchFilters[name] = filter

    runBatches = ->
      b = batchers
      batchers = null
      for k,[items, func] of b
        func items

Handle changes to the doc nodes

    textLevel = Number.MAX_SAFE_INTEGER

    processChanges = (doc, batch, local, norender, initial, cont, ignoreLocal)->
      incRenderCount()
      if !norender then rc = createRenderingComputer()
      updated = {}
      for item in batch
        doc.leisure.parentCache?.update item.type, item.data, item.oldData
        if item.data.info?
          if item.type != 'removed'
            if doc.leisure.info?._id != item.data._id then return setTimeout (->newDoc()), 100
            doc.leisure.info = item.data
            if !valid && doc == root.currentDocument
              do (oldCont = cont)->
                cont = ->
                  valid = true
                  root.loadOrg root.parentForDocId(doc.leisure.info._id), docOrg(), doc.leisure.name
                  oldCont?()
          else if doc == root.currentDocument then valid = false
          continue
        if !ignoreLocal && item.type != 'removed' && !isCurrent item.data then continue
        if ignoreLocal || !!item.data.local == !!local
          root.changeContext = item.context ? {}
          if !ignoreLocal && item.data.local && item.type == 'added' && (old = doc.leisure.master.findOne item.data._id)
            item.type = 'changed'
            item.oldData = old
          if !ignoreLocal && !item.data.local then expungeLocalData doc.leisure.master, item.data._id
          if item.type == 'added' && oldData = overridingIndexedItem doc, item.data
            changeIndex doc, item.data, oldData
          else if item.type == 'removed' && oldData = overridingIndexedItem doc, item.data
            changeIndex doc, oldData, item.data
          else switch item.type
            when 'added' then addIndex doc, item.data
            when 'changed' then changeIndex doc, item.data, item.oldData
            when 'removed' then removeIndex doc, item.data
          if item.type in ['changed', 'removed']
            d = if item.type == 'changed' then item.oldData else item.data
            if d.codeName? && (item.type == 'removed' || d.codeName != item.data.codeName) && namedBlocks[d.codeName] == d._id
              delete namedBlocks[d.codeName]
        if item.type in ['changed', 'added'] && item.data.codeName? && overridesName(item.data)
          namedBlocks[item.data.codeName] = item.data._id
      for item in batch
        if item.data.info? && !item.removed
          doc.leisure.info = item.data
        else if ignoreLocal || isCurrent item.data
          work = do (item)-> ->
            if ignoreLocal || !!item.data.local == !!local
              if !item.editing && !norender
                switch item.type
                  when 'added' then rc.add item.data
                  when 'removed' then rc.remove item.data
                  when 'changed' then rc.change item.oldData, item.data
              lang = item.data.language?.toLowerCase()
              new Promise (good, bad)-> processDataChange doc, item, lang, updated, initial, good
            else updateObservers item.data, item.type, updated
          changePromise = if changePromise.isFulfilled() then Promise.method(work)()
          else changePromise.then work
      if !norender && valid then rc.render()
      work = if updateAll
        updateAll = false
        ->
          root.orgApi.updateAllBlocks()
          cont?()
      else cont ? ->
      changePromise = if changePromise.isFulfilled() then Promise.method(work)()
      else changePromise.then work

    overridesName = (data)->
      !namedBlocks[data.codeName] || data.origin == Leisure.currentDocument._name

    getRenderCount = -> renderCount
    incRenderCount = -> renderCount++

    # at this point, fully rerender all changed slides
    createRenderingComputer = (overrides)->
      if !overrides? then overrides = new Overrides()
      changedStructure: false
      rerender: {}
      add: (data)->
        if root.orgApi.isHiddenBlock data then return
        @changedStructure = true
        @rerender[data._id] = data
        if data.type == 'headline' && data.level == 1 && prev = getItem overrides, data.prev
          @rerender[prev._id] = prev
      remove: (data)->
        if root.orgApi.isHiddenBlock data then return
        @changedStructure = true
        @removeElement data._id
        if data.type == 'headline' && data.level == 1 && prev = getItem overrides, data.prev
          @rerender[prev._id] = prev
      change: (oldData, newData)->
        if root.orgApi.isHiddenBlock newData then return
        change = classifyChange oldData, newData
        if oldData.type != newData.type || (oldData.type == 'headline' && oldData.level != newData.level)
          @changedStructure = true
        switch change.type
          when 'text'
            @rerender[newData._id] = newData
            if oldData.type != newData.type
              prev = getItem overrides, newData.prev
              @rerender[prev._id] = prev
              if oldData.type == 'headline' && oldData.level == 1
                @removeElement newData._id
          when 'indent' , 'outdent'
            @rerender[newData._id] = newData
            prev = getItem overrides, newData.prev
            @rerender[prev._id] = prev
          when 'none' then
      removeElement: (id)->
        el = $("##{id}")
        if el.is "[data-org-headline='1']" then root.orgApi.removeSlide id
        else if el.length then root.restorePosition el[0].parentNode, => el.remove()
      render: ->
        # only one pass through loop here
        # using it to test if there is anything to rerender
        for i of @rerender
          root.restorePosition '[maindoc]', =>
            if @changedStructure
              slides = findSlides overrides, @rerender
              #console.log "RENDER SLIDES: #{(slide for slide of slides).join ', '}"
              for id, block of slides
                el = $("##{block._id}")
                if block.type == 'headline' && block.level == 1
                  if !el.is("[data-org-headline='1']")
                    if (parent = el.closest("[data-org-headline='1']")[0]) && !slides[parent.id]
                       renderBlock getBlock parent.id
                    removeNewChildren block.next
                else if el.is("[data-org-headline='1']")
                  if block = getBlock block.prev && !slides[block.prev]
                    renderBlock block
                renderBlock block
            else for id, block of @rerender
              renderBlock block
          break

    removeNewChildren = (id)->
      root.restorePosition "[maindoc]", =>
        while (block = getBlock id) && !(block.type == 'headline' && block.level == 1)
          $("##{block.id}").remove()
          id = block.next

    classifyChange = (old, data)->
      if data.type == 'headline'
        newLevel: data.level
        oldLevel: if old.type == 'headline' then old.level else textLevel
        type: if old.type != 'headline' || data.level < old.level then 'outdent'
        else if data.level > old.level then 'indent'
        else if data.text != old.text then 'text'
        else 'none'
      else if old.type == 'headline'
        type: 'indent', oldLevel: old.level, newLevel: textLevel
      else if data.text != old.text then type: 'text'
      else type: 'none'

    # return an object containing only the slides containing a list of blocks
    findSlides = (overrides, blocks)->
      result = {}
      considered = {}
      for id, block of blocks
        considered[id] = true
        if block.type == 'headline' && block.level == 1 then result[id] = block
        else
          while ([headline, pid, block] = getParent overrides, block) && headline
            if !considered[pid]
              considered[pid] = true
              if block.level > 1 then continue
              result[pid] = block
            break
      result

    isCurrent = (block)-> block.text == getBlock(block._id)?.text

    processDataChange = (doc, {editing, type, context, data, oldData}, lang, updated, init, cont)->
      if type in ['changed', 'removed']
        if type == 'removed' then oldData = data
        if viewIdTypes[oldData._id] && (type == 'removed' || lang != 'html')
          root.orgApi.deleteView viewIdTypes[oldData._id]
          delete viewTypeData[viewIdTypes[oldData._id]]
          delete viewIdTypes[oldData._id]
          if dataTypeIds[oldData.type]? then delete dataTypeIds[oldData.type][oldData._id]
        if descriptor = controllerIdDescriptor[data._id]
          old = controllerDescriptorIds[descriptor]
          if old.length == 1 then delete controllerDescriptorIds[descriptor]
          else _.remove old, (i)-> i == data._id
          delete controllerIdDescriptor[data._id]
      if init && type == 'added' && data.type == 'headline' && data.properties.import?
        return importDocument data.properties.import, cont
      else if type in ['changed', 'added'] && data.type == 'code'
        if data.yaml?.type
          if !dataTypeIds[data.yaml.type]? then dataTypeIds[data.yaml.type] = {}
          dataTypeIds[data.yaml.type][data._id] = true
        attr = data.codeAttributes ? {}
        if descriptor = attr.control
          if !(ids = controllerDescriptorIds[descriptor])
            ids = controllerDescriptorIds[descriptor] = []
          ids.push data._id
          controllerIdDescriptor[data._id] = descriptor
        for dataType in observing[data._id] || []
          observers[dataType] = L(observers[dataType]).without(data._id).toArray()
        delete observing[data._id]
        if attr.observe?
          if attr.observe == '*' then universalObservers[data._id] = true
          else
            if !(o = observers[attr.observe])
              o = observers[attr.observe] = []
            o.push data._id
            if !(a = observing[data._id]) then a = observing[data._id] = []
            a.push attr.observe
        else delete universalObservers[data._id]
        if lang in ['css', 'yaml', 'html']
          if def = data.codeAttributes?.defview
            viewTypeData[def] = codeString(data).trim()
            viewIdTypes[data._id] = def
          root.orgApi.updateBlock data, allowInplaceUpdate(type, data, oldData)
        else
          if lang == 'leisure' && needsContext data
            codeContexts[data._id] =
              update: -> runLeisureBlock data
              initializeView: -> runLeisureBlock data
              block: data
          if !editing && isDef(data) && data.text != oldData?.text
            return runBlock doc, data, root.textEnv(lang), ->
              updateObservers data, type, updated
              cont?()
        updateObservers data, type, updated
      cont?()

    isSlide = (data)-> data && data.type == 'headline' && data.level == 1

    class ParentCache
      constructor: -> @clear()
      clear: ->
        @next = {}
        @prev = {}
        @slide = {}
        @hidden = {}
      update: (type, data, oldData)->
        if data.info == true then return
        id = data._id
        if isSlide(data) || isSlide(oldData)
          if type in ['removed', 'added'] || @next[id] != data.next || @prev[id] != data.prev
            @clear()
            if type != 'removed' then @addData data
        else if type == 'removed'
          @next[id] = null
          @prev[id] = null
          @slide[id] = null
        else if !@slide[id] || @next[id] != data.next || @prev[id] != data.prev then @addData data
      addData: (data)->
        id = data._id
        slide = data
        slideId = data._id
        while slide.type != 'headline' || slide.level > 1
          [found, slideId, slide] = getParent null, slide
        @next[id] = data.next
        @prev[id] = data.prev
        if found then @slide[id] = slideId
        if isSlide(data)
          @hidden[id] = data.properties?.hidden || (data.origin && data.origin != root.currentDocument._name)
          @slide[slideId] = slideId
        else if !@slide[slideId] then @addData slide
      getSlide: (data)->
        id = if typeof data == 'string' then data else data._id
        @slide[id] || (
          @addData (if id == data then getBlock id else data)
          @slide[id])
      isHidden: (data)-> @hidden[@getSlide data]

    allowInplaceUpdate = (type, data, oldData)->
      type == 'changed' && sameIndex(data, oldData) && sameName(data, oldData)

    sameIndex = (data, oldData)->
      data.codeAttributes?.index == oldData.codeAttributes?.index &&
      (!data.codeAttributes?.index || data.yaml[data.codeAttributes.index] == oldData.yaml[data.codeAttributes.index])

    sameName = (data, oldData)-> data.codeName == oldData.codeName

    runBlock = (doc, data, env, cont)->
      lang = data.language?.toLowerCase()
      if typeof env == 'function'
        cont = env
        env = null
      if lang in ['js', 'javascript']
        try
          env?.clear()
          eval codeString data
        catch err
          console.log err.stack
      else if lang in ['coffeescript', 'coffee']
        try
          if needsContext data then compileCoffeeContext data._id, data
          else
            env?.clear()
            CoffeeScript.eval codeString(data), coffeeOpts()
        catch err
          console.log err.stack
      else if lang == 'leisure' then return runCachedLeisure doc, data, editing, env, cont
      cont?()

    pendingLeisure = {}
    pendingLeisureQueue = []
    processingLeisure = null

    runCachedLeisure = (doc, data, editing, env, cont)->
      if typeof env == 'function' then [env, cont] = [null, env]
      #console.log "run: #{JSON.stringify codeString data}"
      if !processingLeisure
        processingLeisure = data._id
        cont ||= ->
        if !data.js && data.asts then cacheCodeFromAsts doc, block, editing, _.map asts, (ast)-> json2Ast ast
        if env
          written = false
          w = env.write
          env.write = (str)->
            if !written then env.clear()
            written = true
            w.call this, str
        else written = true
        finished = ->
          #console.log "FINISHED"
          if !written then env.clear()
          cont?()
          processingLeisure = null
          if pendingLeisureQueue.length
            next = pendingLeisureQueue.shift()
            conts = pendingLeisure[next]
            pendingLeisure[next] = null
            if block = getBlock next
              runCachedLeisure doc, block, editing, env, ->
                for c in conts
                  c?()
        if data.js
          eval(data.js) resolve, (-> new Monad2 (env, c)->
            c()
            finished()), env
        else
          runLeisureBlock data, true, env, (env, results)->
            cacheCode doc, data, editing, results
            finished()
      else
        if !pendingLeisure[data._id]
          pendingLeisure[data._id] = []
          pendingLeisureQueue.push data._id
        if cont? then pendingLeisure[data._id].push cont

    cacheCode = (doc, block, editing, results)->
      if getBlock(block._id).text == block.text
        errors = []
        asts = _.map results.toArray(), (each)-> each.head()
        block.asts = _.map asts, (ast)-> ast2Json ast
        cacheCodeFromAsts doc, block, editing, asts

    editingCont = (block)->
      oldEditing = editing
      editing = true
      block -> editing = oldEditing

    editingWhile = (block)->
      editingCont (done)->
        try
          block()
        finally
          done()

    cacheCodeFromAsts = (doc, block, newEditing, asts)->
      if getBlock(block._id).text == block.text
        leisureName = doc.leisure.name + ":source"
        jsName = doc.leisure.name + ":code"
        lastArgs = null
        try
          gennedCode = withFile leisureName, null, -> (new SourceNode 1, 0, leisureName, [
            "(function(resolve, last) {L_runMonads([\n  ",
            intersperse(lastArgs = _.map(asts, (item)-> sourceNode item, "function(){return ", (genMap item), "}"), ',\n '),
            ", function(){return last()}]);})"
          ]).toStringWithSourceMap(file: jsName)
          block.js = gennedCode.code
          editingWhile -> doc.update block._id, block
        catch err
          console.log "Error in source node,\nargs:", lastArgs
          console.log "Error: #{err.stack}"

    intersperse = (array, element)->
      if array.length < 2 then array
      else
        result = [array[0]]
        for i in [1...array.length]
          result.push element, array[i]
        result

    importDocument = (name, cont)->
      name = new URI("x://h/#{root.currentDocument.leisure.name}", name).path.substring 1
      if root.currentDocument.demo then name = "demo/#{name}"
      basicObserveDocument name, (result, docCol, downloadPath)->
        docCol.find().observe observer docCol, false, true, name
        docCol.leisure.localCollection = new Meteor.Collection null
        importedDocs[name] = docCol
        oldPromise = changePromise
        changePromise = Promise.resolve 0
        processDocumentChanges docCol, ->
          changePromise = changePromise.then oldPromise
          cont()

    coffeeOpts = ->
      filename = "coffeescript-#{++scriptCounter}"
      filename: filename, sourceMap: true, sourceFiles: [filename]

    isDef = (data)->
      (attr = data.codeAttributes) &&
        (attr.results?.toLowerCase() in ['def', 'notebook'] ||
        attr.observe ||
        attr.control)

    needsContext = (data)->
      (attr = data.codeAttributes) && (attr.observe || attr.control)

    compileCoffeeContext = (id, data)->
      data = data || getBlock id
      con = codeContexts[id] = new ->
        @result = eval CoffeeScript.compile(codeString(data), coffeeOpts()).js
        this
      con.block = data
      if !con.update
        if data.codeAttributes?.results?.toLowerCase == 'dynamic'
          console.log "need to plug in results"
        con.update = -> compileCoffeeContext id

    updateObservers = (data, type, updated)->
      if data.type == 'code'
        if data.yaml?.type && observers[data.yaml.type]
          for id in observers[data.yaml.type]
            if !updated[id]
              updated[id] = true
              root.orgApi.updateObserver id, codeContexts[id], data.yaml, data, type
        for id of universalObservers
          if id != data._id
            root.orgApi.updateObserver id, codeContexts[id], data.yaml, data, type

    runLeisureBlock = (block, init, env, cont)->
      if typeof env == 'function'
        cont = env
        env = null
      root.textEnv('leisure', env).executeText codeString(block), Nil, cont

    codeString = (data)-> (data.codePrelen? && data.codePostlen? && data.text.substring data.codePrelen, data.text.length - data.codePostlen) ? ''

    getBlock = (id)->
      if id
        doc = root.currentDocument
        doc.leisure.localCollection.findOne(id) ? doc.findOne(id) ? findImportedBlock(id)

    findImportedBlock = (id)->
      for name, doc of importedDocs
        if block = doc.findOne id then return block
      null

    getBlockNamed = (name)-> if id = namedBlocks[name] then getBlock id

    getDataNamed = (name)-> getBlockNamed(name)?.yaml

    setDataNamed = (name, value)-> if id = namedBlocks[name] then setData id, value

    getIndexedBlocks = (index, value)-> getBlock id for id in indexes[index].get(value) ? []

    getParent = (overrides, data)->
      prev = data.prev
      dataLevel = if data.type == 'headline' then data.level else textLevel
      while prev
        prevItem = getItem overrides, prev
        if prevItem?.type == 'headline'
          if prevItem.level < dataLevel then return [true, prevItem._id, prevItem]
          else if dataLevel == 1 && prevItem.level == 1
            break
        prev = prevItem?.prev
      [false, prev && prevItem._id, prev && prevItem]

    renderBlock = (item)->
      #console.log "RENDER #{item._id}"
      if $("##{item._id}").is "[data-org-headline='0']"
        org = docOrg root.currentDocument
      else
        org = subDoc(root.currentDocument, item, 0, 0, ignore)[0]
        org.linkNodes()
      if org
        if !(node = $("##{item._id}")[0])
          if prev = getBlock item.prev
            while prev && !(prev.type == 'headline' && prev.level == 1)
              [headline, prevId, prev] = getParent null, prev
              if !headline then prev == null
          node = root.orgApi.insertEmptySlide item._id, prev?._id
        root.loadOrg root.parentForBlockId(item._id), org, name, node

    getData = (id, value)-> getBlock(id)?.yaml

Set the data for an id.  This may do copy-on-write if the data is
local or imported.

commitOverrides handles copy-on-write for local data by adding it to
an indexed db in the browser.

setData handles copy-on-write for imported data by inserting it into
the document as the bottom child of the headline that imports the
data.

    setData = (id, value)->
      doc = root.currentDocument
      cur = getBlock id
      if !cur?.yaml? then throw new Error "Attempt to set data using invalid id"
      else
        newText = cur.text.substring(0, cur.codePrelen) + dump(value, cur.codeAttributes ? {}) + cur.text.substring cur.text.length - cur.codePostlen
        cur.text = newText
        cur.yaml = value
        storeBlock cur

    storeBlock = (block, cont)->
      if !block.local && block.origin? && block.origin != root.currentDocument._name && !(root.currentDocument.findOne block._id)
        if slide = findImportSlide block.origin
          block.origin = root.currentDocument._name
          addBlockAfter lastBlockForSlide(slide), block, cont
      else
        updateItem overrides = new Overrides(), block
        commitOverrides overrides
        cont?()

    findImportSlide = (docName)->
      if node = $("[data-property-import='#{docName}']")[0] then node.id
      else
        for slide of root.currentDocument.leisure.parentCache.hidden
          block = getBlock slide
          if block.properties?.import == docName then return block
        slide = null
        mapDocumentBlocks root.currentDocument, (block)->
          if !slide && block.type == 'headline' && block.level == 1 && block.properties?.import == docName then slide = block
        slide

Add some data to the document

appendData adds data to the end of a given headline section (but before any subheadlines)
and returns the id of the block for the new data

attrLine, doc, and name are optional (if there are 4 args and only one string, it will
be assumed to be attrLine)

    appendData = (headline, value, attrLine, doc, name, cont)->
      addDataAfter lastBlockForSlide(headline), value, attrLine, doc, name, cont

    lastBlockForSlide = (slide)->
      prev = if typeof slide == 'string' then getBlock slide else slide
      next = getBlock prev.next
      while next && next.type != 'headline'
        prev = next
        next = getBlock prev.next
      prev

addDataAfter adds data after a block and returns the id of the block for the new data

attrLine, doc, and name are optional (if there are 4 args and only one string, it will
be assumed to be attrLine)

    addDataAfter = (id, value, attrLine, doc, name, cont)->
      if !(notStringOrFunc doc) || typeof attrLine != 'string'
        opts = [attrLine, doc, name, cont]
        attrLine = nextIfString opts
        doc = nextIf opts, notStringOrFunc
        name = nextIfString opts
        cont = nextIf opts, (v)-> typeof v == 'function'
      if typeof id != 'string' then id = id._id
      src = """
      #{if name? then "#+NAME: #{name}\n" else ""}#+BEGIN_SRC yaml#{if attrLine then ' ' + attrLine else ''}
      #{dump value}
      #+END_SRC
      """
      block = (curOrgDoc src)[0]
      addBlockAfter id, block, cont

    addBlockAfter = (id, block, cont)->
      Meteor.call 'addBlockAfter', root.currentDocument.leisure.name, id, block, (err, res)->
        if err then console.log "ERROR ADDING DATA: #{err}"
        cont? err, res
      block._id

    nextIf = (args, comp)->
      if args.length > 0 && comp(args[0]) then args.shift()

    nextIfString = (args)-> nextIf args, isStringOrEmpty

    notStringOrFunc = (value)->
      !(typeof value in ['string', 'null', 'undefined', 'function'])

    isStringOrEmpty = (value)-> typeof value in ['string', 'null', 'undefined']

    curOrgDoc = (text)->
      blocks = orgDoc parseOrgMode text
      for block in blocks
        block.origin = root.currentDocument.leisure.name
      blocks

    getSourceAttribute = (text, attr)->
      text.match(new RegExp "#\\+BEGIN_SRC.*:#{attr}\\b([^:]*)", 'i')?[1]?.trim()

    setSourceAttribute = (text, attr, value)->
      attrText = if value? then ":#{attr} #{value.trim()}" else ""
      if old = text.match(new RegExp "(#\\+BEGIN_SRC.*):#{attr}\\b[^:\\n]*", 'i')
        start = old.index + old[1].length
        end = old.index + old[0].length
        text.substring(0, start) + attrText + text.substring end
      else if value? && line = text.match(new RegExp "#\\+BEGIN_SRC[^\\n]*", 'i')
        nl = line.index + line[0].length
        if text[nl - 2] != ' ' then attrText = ' ' + attrText
        text.substring(0, nl) + attrText + text.substring nl
      else text

    root.currentDocument = null

    clearObject = (obj)->
      for k in _.keys(obj)
        delete obj[k]

    #TODO put these into a document class
    newDoc = ->
      docCol = root.currentDocument
      docCol.leisure.parentCache.clear()
      docCol.leisure.localCollection = new Meteor.Collection null
      universalObservers = {}
      namedBlocks = {}
      observers = {}
      controllerIdDescriptor = {}
      # clear exported objects in case of aliasing
      clearObject importedDocs
      clearObject indexes
      clearObject codeContexts
      clearObject observing
      clearObject controllerDescriptorIds
      clearObject viewTypeData
      clearObject viewIdTypes
      clearObject dataTypeIds
      observingDoc = {}
      observingDoc[docCol._id] = docCol
      docCol.leisure.info = docCol.findOne info: true
      processDocumentChanges docCol
      org = docOrg root.currentDocument
      root.loadOrg root.parentForDocId(docCol.leisure.info._id), org, root.currentDocument._name

Private function to observe a document

    processDocumentChanges = (doc, cont)->
      b = mapDocumentBlocks doc, (block)->
        type: 'added', data: documentOrLocalBlockFor(block), editing: false, context: context
      processChanges doc, b, false, true, true, cont, true

    documentOrLocalBlockFor = (block)->
      if block.local
        root.currentDocument.leisure.localCollection.findOne(block._id) ? block
      else block

    observeDocument = (name, cont)->
      basicObserveDocument name, (result, docCol, downloadPath)->
        root.currentDocument = docCol
        docCol.leisure.parentCache = new ParentCache()
        if name.match /^demo\/(.*)$/
          document.location.hash = "#load=/tmp/#{docCol.leisure.name}"
          docCol.demo = true
        else docCol.demo = (name.match(/^tmp\//) || name.match(/^local\//))
        initLocal root.currentDocument, ->
          docCol.find().observe observer docCol, false
          processDocumentChanges docCol, ->
            org = docOrg root.currentDocument
            root.loadOrg root.parentForDocId(docCol.leisure.info._id), org, downloadPath
            if name.match /^demo\/(.*)$/
              $("#hide-show-button")
                .tooltip()
                .tooltip('option', 'content', 'Give the temporary URL in the location bar to other people to collaborate')
                .tooltip('open')
              setTimeout (->
                $('#hide-show-button').tooltip 'close'
                setTimeout (->Leisure.applyShowHidden()), 2000), 3000
              setTimeout (->
                if document.location.hash.match /^#load=\/tmp\//
                  $('#hide-show-button')
                    .tooltip('option', 'content', 'Restored URL; press the forward history buttom to see the collaboration URL, again')
                    .tooltip('open')
                  history.back()
                  setTimeout (->
                    $('#hide-show-button').tooltip 'close'
                    setTimeout (->Leisure.applyShowHidden()), 2000), 3000
                ), 10000

    mapDocumentBlocks = (docCol, each)->
      blockId = docCol.findOne getBlock docCol.leisure.info.head
      b = while blockId && block = docCol.findOne blockId
        blockId = block.next
        each block
      b

    basicObserveDocument = (name, initializedBlock)->
      Meteor.call 'hasDocument', name, (err, result)->
        if !err
          if result.error
            $("#error").html "Error: #{result.error}"
            $(document.body).addClass 'leisureError'
          else
            root.hasGit = result.hasGit
            if root.hasGit
              $('#checkpoint').css 'display', ''
              $('#revert').css 'display', ''
            console.log "OBSERVING #{result.id}, #{if result.hasGit then 'HAS' else 'NO'} GIT"
            Meteor.subscribe result.id, ->
              observingDoc[result.id] = docCol = new Meteor.Collection result.id
              docCol.leisure = {name: result.id, master: docCol}
              downloadPath = result.id
              if m = name.match(/^local\/([^\/]*)\//) then downloadPath = m[1]
              docCol.leisure.info = docCol.findOne info: true
              initializedBlock result, docCol, downloadPath
            document.body.classList.remove 'not-logged-in'
        else console.log "ERROR: #{err}\n#{err.stack}", err

    observer = (docCol, local, norender, name)->
      changeName = "changes-#{name ? local}"
      _suppress_initial: true
      added: (el)-> addChange changeName, 'added', copy(el), (items)-> processChanges docCol, items, local, norender
      removed: (el)-> addChange changeName, 'removed', copy(el), (items)-> processChanges docCol, items, local, norender
      changed: (el, oldEl)-> addChange changeName, 'changed', copy(el), copy(oldEl), (items)-> processChanges docCol, items, local, norender

Indexer is a private helper class for indexed data.  Indexes store
value -> id pairs and are in-memory until we switch to IndexedDB.
Indexers manage adding and removing data from these indexes.

Data index attributes specify an indexer and have the form

:index name1 field1, name field2, ...

    overridingIndexedItem = (doc, data)->
      doc == root.currentDocument && data.origin != doc.leisure.name && data.codeAttributes?.index && findImportedBlock(data._id)

    addIndex = (doc, data, info, oldData)->
      if key = data.codeAttributes?.index
        ind = new Indexer(doc, key)
        ind.add data._id, data.yaml
        if !allowInplaceUpdate (if oldData then 'changed' else 'added'), data, oldData
          for i in ind.indexes
            root.orgApi.updateIndexViews i
      else if data.language?.toLowerCase() == 'index'
        try
          info = info ? safeLoad codeString data
          compare = if info.order.toLowerCase() == 'desc' then flip stdCompare else stdCompare
          replaceIndexDef doc, info.name, compare
          root.orgApi.updateIndexViews info.name
        catch err then

    changeIndex = (doc, data, oldData)->
      oldIndexDef = oldData.language?.toLowerCase() == 'index' && safeLoad codeString oldData
      newIndexDef = data.language?.toLowerCase() == 'index' && safeLoad codeString data
      removeIndex doc, oldData, oldIndexDef?.name == newIndexDef?.name
      addIndex doc, data, newIndexDef, oldData

    removeIndex = (doc, data, replaceIndex)->
      if key = data.codeAttributes?.index
        new Indexer(doc, key).remove data._id, data.yaml
      else if !replaceIndex && data.language?.toLowerCase() == 'index'
        try
          info = safeLoad codeString data
          replaceIndexDef doc, info.name
        catch err then

    typeRank = (o)->
      switch typeof o
        when 'undefined' then 0
        when 'null' then 1
        when 'number' then 2
        when 'string' then 4
        when 'object'
          if o instanceof Date then 3
          else if o instanceof Array then 5
          else 6

    flip = (f)-> (a, b)-> f b, a

    # Lexical object comparison, based on IndexedDB's ordering
    stdCompare = (a, b)->
      rankA = typeRank a
      rankB = typeRank b
      if rankA < rankB then -1
      else if rankB < rankA then 1
      else if typeof a in ['undefined', 'null'] then 0
      else if typeof a in ['string', 'number']
        if a < b then -1
        else if a == b then 0
        else 1
      else if a instanceof Array then arrayCompare a, b
      else a.compare b

    arrayCompare = (a, b)->
      for i in [0...Math.min a.length, b.length]
        cmp = stdCompare a[i], b[i]
        if cmp != 0 then return cmp
      stdCompare a.length, b.length

    replaceIndexDef = (doc, name, compare)->
      if name
        #console.log "Redefining index '#{name}' #{if compare then 'desc' else 'asc'}"
        oldIndex = indexes[name]
        compare = compare ? stdCompare
        newIndex = indexes[name] = new SortedMap null, ((a, b)-> compare(a, b) == 0), compare
        newIndex._leisure_intentional = true
        oldIndex?.forEach (value, key)-> newIndex.set key, value
        updateAll = true

    #TODO: remove @doc from this
    class Indexer
      constructor: (@doc, key)->
        @indexes = []
        for indexPair in key.split ','
          desc = indexPair.trim().split /[ ]+/
          if desc.length < 2 then throw new Error "Bad data index: #{desc} in #{key}"
          @indexes.push desc
        @indexes.sort (a,b)-> if a[0] < b[0] then -1 else if a[0] == b[0] then 0 else 1
      sameIndexer: (i)-> _.isEqual @indexes, i.indexes
      sameValues: (a, b)->
        for desc in @indexes
          vA = a
          vB = b
          for i in [1...desc.length]
            vA = vA && vA[desc[i]]
            vB = vB && vB[desc[i]]
          if !_.isEqual vA, vB then return false
        true
      add: (id, data)->
        for desc in @indexes
          v = data
          for i in [1...desc.length]
            v = v && v[desc[i]]
          if v?
            if !indexes[desc[0]] then console.log "No index '#{desc[0]}'"
            index = (indexes[desc[0]] ? (console.log("Defining default index '#{desc[0]}'"); indexes[desc[0]] = new SortedMap null, ((a, b)-> stdCompare(a, b) == 0), stdCompare))
            if !(a = index.get v) then index.set v, a = []
            a.push id
      remove: (id, data)->
        for desc in @indexes
          v = data
          for i in [1...desc.length]
            v = v && v[desc[i]]
          if v? && (index = indexes[desc[0]]) && a = index.get v
            _.remove a, (el)-> el == id
            if a.length == 0
              if index.length == 1 && !index._leisure_intentional then console.log("removing index '#{desc[0]}'"); delete indexes[desc[0]]
              else index.delete v

    #TODO: remove @doc from this
    class IndexedCursor
      constructor: (@doc, @name, node, getFirst, limit)->
        if @index = indexes[@name]
          if getFirst then @_getFirst = getFirst
          if node then @node = node else @rewind()
          @limit = limit ? -> true
        else
          @forEach = @rewind = @greaterThan = @greaterThanOrEqual = @lessThan = @lessThanOrEqual = -> this
      forEach: (f)->
        while @node && @limit @node.value.key
          for id in @node.value.value
            f getBlock id
          @node = @index.store.findLeastGreaterThan @node.value
      _getFirst: -> @index.store.findLeast()
      rewind: -> @node = @_getFirst()
      map: (f)->
        result = []
        @forEach (item)-> result.push f item
        result
      fetch: ->
        result = []
        @forEach (item)-> result.push item
        result
      count: ->
        oldNode = @node
        tot = 0
        forEach -> tot++
        @node = oldNode
        tot
      greaterThan: (key)->
        getFirst = => @index.store.findLeastGreaterThanOrEqual key: key
        node = if @index.contentCompare(@node.value.key, key) > 0 then @node else getFirst()
        new IndexedCursor @doc, @name, node, getFirst, @limit
      greaterThanOrEqual: (key)->
        getFirst = => @index.store.findLeastGreaterThanOrEqual key: key
        node = if @index.contentCompare(@node.value.key, key) > -1 then @node else getFirst()
        new IndexedCursor @doc, @name, node, getFirst, @limit
      lessThan: (key)->
        cmp = (k)=> @index.contentCompare(k, key) < 0
        new IndexedCursor @doc, @name, @node, @_getFirst, cmp
      lessThanOrEqual: (key)->
        cmp = (k)=> @index.contentCompare(k, key) < 1
        new IndexedCursor @doc, @name, @node, @_getFirst, cmp

    indexedCursor = (doc, name)-> new IndexedCursor doc, name

    addChangeContextWhile = (obj, func)->
      oldc = context
      try
        context = context.merge(obj)
        func()
      finally
        context = oldc

    addChange = (name, type, data, oldData, cont)->
      change = type: type, here: committing, editing: editing, data: data, context: context.toObject()
      if !cont then cont = oldData
      else change.oldData = oldData
      if editing then cont [change]
      else addBatch name, change, cont

Handling local content.

Leisure initially uses local content from the document.
Any changes to local data stay on the client and override the data in the document.

Users can mark any slide as local by setting a "local" property to true in the slide.  You can make data nonlocal by changing the local property so that it is no longer true (change its name, change its value, etc).

You can also mark any piece of data as local.

    initLocal = (col, cont)->
      localCol = col.leisure.localCollection = new Meteor.Collection(null)
      localCol.leisure = master: col
      if col.demo
        localCol.find().observe observer localCol, true
        cont()
      else
        req = indexedDB.open col.leisure.name, 1
        req.onupgradeneeded = (e)->
          db = col.leisure.localDb = req.result
          if db.objectStoreNames.contains localStoreName then db.deleteObjectStore localStoreName
          store = db.createObjectStore localStoreName, keyPath: '_id'
          putToLocalStore col, {_id: 'info', collectionId: col.leisure.info._id}, handlers ? nullHandlers, e.target.transaction
        req.onsuccess = (e)->
          db = col.leisure.localDb = req.result
          getFromLocalStore col, 'info', (
            onsuccess: (e)->
              info = e.target.result
              if info && info.collectionId == col.leisure.info._id
                loadRecords localCol, cont, e.target.transaction
              else
                clearLocal col, localCol, nullHandlers, e.target.transaction
                cont()
            onerror: (e)->
              clearLocal col, localCol, nullHandlers, e.target.result
              cont()), db.transaction [localStoreName], 'readwrite'
        req.onerror = (e)->
          console.log "Couldn't open database for #{col.leisure.name}", e
          cont()

    loadRecords = (localCol, cont, trans)->
      req = trans.objectStore(localStoreName).openCursor()
      req.onerror = (e)->
        console.log "Error creating cursor", e
        cont()
      req.onsuccess = (e)->
        cursor = req.result
        req.onsuccess = advance = (e)->
          if e.target.result
            #console.log "LOAD RECORD: #{JSON.stringify cursor.value}"
            if e.target.result.key != 'info' then localCol.insert cursor.value
            cursor.continue()
          else
            localCol.find().observe observer localCol, true
            cont()
        req.onerror = (e)->
          console.log "Error reading in local records", e
          cont()
        advance target: result: cursor

    localTransaction = (col, type)->
      if !col.demo
        db = col.leisure.localDb
        if db.objectStoreNames.contains localStoreName then db.transaction [localStoreName], type || 'readwrite' else null

    localStore = (doc, trans, transType)->
      (trans || localTransaction doc, transType || 'readwrite').objectStore localStoreName

    clearLocal = (col, localCol, handlers, trans)->
      if trans = trans || localTransaction col
        store = localStore col, trans
        req = store.clear()
        req.onsuccess = (e)->
          putToLocalStore col, {_id: 'info', collectionId: col.leisure.info._id}, handlers ? nullHandlers, trans
          localCol.find().observe observer localCol, true
        req.onerror = handlers.onerror
      else handlers.onerror()

    addLocalData = (doc, item)-> doc.leisure.localCollection.upsert item

    getFromLocalStore = (doc, key, {onsuccess, onerror}, trans)->
      if doc.demo then onsuccess()
      else if store = localStore doc, trans, 'readonly'
        req = store.get key
        req.onsuccess = onsuccess
        req.onerror = onerror
      else onerror {}

    putToLocalStore = (doc, value, {onsuccess, onerror}, trans)->
      if doc.demo then onsuccess()
      else if store = localStore doc, trans
        req = store.put value
        req.onsuccess = onsuccess
        req.onerror = onerror
      else onerror {}

    removeFromLocalStore = (doc, key, {onsuccess, onerror}, trans)->
      if doc.demo then onsuccess()
      else if store = localStore doc, trans
        req = store.delete key
        req.onsuccess = onsuccess
        req.onerror = onerror
      else onerror {}

    copy = (obj)->
      newObj = {}
      for k, v of obj
        newObj[k] = v
      newObj

    docOrg = (col, each)->
      if !col then col = root.currentDocument
      if !each then each = ignore
      children = []
      next = docRoot(col).head
      offset = 0
      while next
        [org, next] = subDoc col, next, offset, 0, each
        if !org then break
        offset += org.length()
        children.push org
      org = new Headline '', 0, null, null, null, children, 0
      org.linkNodes()
      org

    subDoc = (col, itemId, offset, level, each)->
      if !itemId then []
      else
        if !col then col = root.currentDocument
        item = if typeof itemId == 'string' then getBlock itemId else itemId
        if item
          each item
          org = parseOrgMode item.text, offset
          org = if org.children.length == 1 then org.children[0]
          else
            frag = new Fragment org.offset, org.children
            frag.linkNodes()
            frag
          org.nodeId = item._id
          org.shared = item.type
          if item.local then org.local = true
          if item.type == 'headline'
            offset += item.text.length
            if item.level <= level then [null, item._id]
            else
              next = item.next
              while next
                [child, next, isCode] = subDoc col, next, offset, item.level, each
                if child
                  org.children.push child
                  offset += child.length()
                else break
              [org, next]
          else [org, item.next]
        else []

    docJson = (col, node)->
      if !col then return docJson root.currentDocument
      if !node then return docJson col, col.findOne root: true
      if node.children then node.children = (docJson col, getBlock child for child in node.children)
      node

    edited = (node, render)->
      if node = $(node).closest('[data-shared]')[0]
        id = node.id
        text = root.blockText node
        if getBlock(id).text != text
          root.checkSingleNode text
          overrides = new Overrides()
          changeDocText id, textForId(id), overrides
          commitEdits overrides
          if render then renderBlock getBlock id

    commitEdits = (overrides, verbose)->
      editingWhile -> commitOverrides overrides, verbose

    isRemoved = (overrides, id)-> overrides.removes[id]

    getItem = (overrides, id)-> id && (!overrides || !overrides.removes[id]) && ((overrides && (overrides.adds[id] || overrides.updates[id])) || getBlock id)

    addItem = (overrides, item, prevId)->
      if !item._id then item._id = new Meteor.Collection.ObjectID().toJSONValue()
      if !prevId
        next = getItem overrides, overrides.head
        item.next = overrides.head
        overrides.head = item._id
      else
        item.prev = prevId
        if prev = getItem overrides, prevId
          next = getItem overrides, prev.next
          prev.next = item._id
          updateItem overrides, prev, null, true
      if item.next = next?._id
        next.prev = item._id
        updateItem overrides, next, null, true
      overrides.adds[item._id] = item
      delete overrides.removes[item._id]
      checkOverrides overrides, item._id

    updateItem = (overrides, item, updateLinks, ignoreCheck)->
      if updateLinks
        old = getItem overrides, item._id
        item.prev = old.prev
        item.next = old.next
      (if overrides.adds[item._id]? then overrides.adds else overrides.updates)[item._id] = item
      delete overrides.removes[item._id]
      if !ignoreCheck then checkOverrides overrides, item._id

    removeId = (overrides, id)->
      item = getItem overrides, id
      prev = getItem overrides, item.prev
      next = getItem overrides, item.next
      if !prev
        if overrides.head != id then console.log "Error, removing item with non prev, but it is not the head"
        else overrides.head = item.next
      delete overrides.adds[id]
      delete overrides.updates[id]
      overrides.removes[id] = true
      if prev && prev.next == id
        prev.next = item.next
        updateItem overrides, prev, null, true
      if next && next.prev == id
        next.prev = item.prev
        updateItem overrides, next, null, true
      checkOverrides overrides, prev?._id, next?._id

    assert = -> console.assert.apply console, arguments

    checkOverrides = (overrides, keys...)->
      checkedPrev = {}
      checkedNext = {}
      for id in (if keys.length > 0 then keys else overrides.keys().toArray())
        if id
          block = getItem overrides, id
          if !checkedPrev[id]
            checkedPrev[id] = true
            if block.prev && !checkedNext[block.prev]
              checkedNext[block.prev] = true
              assert prev = (getItem overrides, block.prev), "Missing prev for", id
              if block.origin == prev.origin
                assert prev.next == id, "Bad prev/next for", id, ' / ', block.prev
          if !checkedNext[id]
            checkedNext[id] = true
            if block.next && !checkedNext[block.next]
              checkedNext[block.next] = true
              assert next = (getItem overrides, block.next), "Missing next for", id
              if block.origin == next.origin
                assert next.prev == id, "Bad prev/next for", block.next, " / ", id
      assert getItem(overrides, overrides.head), "Missing head: ", overrides.head

    commitOverrides = (overrides, verbose)->
      doc = overrides.doc
      localDoc = doc.leisure.localCollection
      committing = true
      trans = localTransaction doc, 'readwrite'
      if doc.leisure.info.head != overrides.head
        doc.leisure.info.head = overrides.head
        doc.update doc.leisure.info._id, doc.leisure.info
      for id of overrides.removes
        (if local = localDoc.findOne id then localDoc else doc).remove id
        if local then removeFromLocalStore doc, id, nullHandlers, trans
      for id, item of overrides.adds
        (if item.local then localDoc else doc).insert item
        if item.local then putToLocalStore doc, item, nullHandlers, trans
      for id, item of overrides.updates
        removes = {}
        removed = false
        old = getBlock id
        if item.local
          root.currentDocument.leisure.localCollection.upsert id, item
          putToLocalStore doc, item, nullHandlers, trans
        else
          if old?.local
            expungeLocalData doc, id # remove extraneous local data
          if doc.findOne id then doc.update id, item
          else doc.insert item
      committing = false

    expungeLocalData = (doc, id)->
      if (localDoc = doc.leisure.localCollection).findOne id
        disableUpdates = true
        try
          localDoc.remove id
          removeFromLocalStore doc, id, nullHandlers
        finally
          disableUpdates = false

    sourceStart = /(^|\n)(#\+name|#\+begin_src)/i

    stealFirstLine = (overrides, item)->
      if item
        match = item.text.match /^[^\n]*\n/
        line = match?[0] ? item.text
        if match
          item.text = item.text.substring match[0].length
          updateItem overrides, item
        else removeId overrides, item._id
        line
      else ''

    pretty = (obj)-> JSON.stringify obj, null, '  '

    class Overrides
      constructor: (@doc)->
        if !@doc then @doc = root.currentDocument
        @head = @originalHead = @doc?.leisure.info.head
        @adds = {}
        @updates = {}
        @removes = {}
      keys: ->
        L(@)
          .pick('adds','removes','updates')
          .map (o)-> L(o).keys()
          .flatten()

    changeDocText = (id, newText, overrides)->
      cur = getItem overrides, id
      if cur?.text == newText then return
      prev = getItem overrides, cur?.prev
      next = getItem overrides, cur?.next
      if newText[newText.length - 1] != '\n' then newText += stealFirstLine overrides, next
      newDoc = curOrgDoc newText
      mergeFirstChunk overrides, prev, newDoc
      mergeFirstCode overrides, prev, cur, newDoc
      mergeLastChunk overrides, next, newDoc
      mergeLastCode overrides, next, newDoc
      # at this point, some of the first and last items may have been removed from newDoc
      if newDoc.length == 0 then removeId overrides, id
      else cur = updateDoc overrides, newDoc.shift(), cur
      for item in newDoc
        item._id = new Meteor.Collection.ObjectID().toJSONValue()
        addItem overrides, item, cur._id
        cur = item

    mergeFirstChunk = (overrides, prev, newDoc)->
      if prev?.type == 'chunk' && newDoc[0]?.type == 'chunk'
        prev.text += newDoc.shift().text
        updateItem overrides, prev

    mergeFirstCode = (overrides, prev, cur, newDoc)->
      if prev?.type == 'chunk' && newDoc[0]?.type == 'code'
        if simpleCheckCodeMerge overrides, prev, newDoc[0]
          if !prev.text then removeId overrides, prev._id
          else updateItem overrides, prev

    mergeLastChunk = (overrides, next, newDoc)->
      if newDoc.length > 0 && newDoc[newDoc.length - 1]?.type == 'chunk' && next?.type == 'chunk'
        next.text = newDoc.pop().text + next.text
        updateItem overrides, next

    mergeLastCode = (overrides, next, newDoc)->
      if newDoc.length > 0 && simpleCheckCodeMerge newDoc[newDoc.length - 1], next
        if !newDoc[newDoc.length - 1].text then newDoc.pop()
        updateItem overrides, next

    updateDoc = (overrides, newBlock, oldBlock)->
      newBlock._id = oldBlock._id
      if oldBlock.prev then newBlock.prev = oldBlock.prev
      if oldBlock.next then newBlock.next = oldBlock.next
      updateItem overrides, newBlock
      newBlock

    checkCodeMerge = (overrides, prev, code)->
      if simpleCheckCodeMerge prev, code
        if !prev.text? then removeId overrides, prev._id
        else updateItem overrides, prev
        updateItem overrides, code

    simpleCheckCodeMerge = (prev, code)->
      if prev?.type == 'chunk' && code?.type == 'code' && prev.text.match sourceStart
        newDoc = curOrgDoc prev.text + code.text
        if newDoc.length == 1
          prev.text = null
          code.text = newDoc[0].text
          true
        else if newDoc.length != 2
          throw new Error "ERROR DURING CODE BLOCK MERGE!\nPREV:\n#{pretty prev}\nCODE:\n#{pretty code}\nNEWDOC:\n#{pretty newDoc}"
        else if newDoc[0].text.length != prev.text.length
          prev.text = newDoc[0].text
          code.text = newDoc[1].text
          true
        else false
      else false

    snapshot = (name)->
      name = name ? root.currentDocument.leisure.name
      console.log "CALLING SNAPSHOT..."
      Meteor.call 'snapshot', name, (err, result)->
        console.log "SNAPSHOT RESULT: #{result}"

    revertAll = ->
      for name of importedDocs
        revert name
      revert root.currentDocument.leisure.name

    revert = (name)->
      name = name ? root.currentDocument.leisure.name
      Meteor.call 'revert', name, (err, result)->
        console.log "REVERT RESULT: #{result}"

    addDocsAfter = (overrides, id, prev)->

    textForId = (id)-> root.blockText $("##{id}")[0]

    root.observeDocument = observeDocument
    root.subDoc = subDoc
    root.docJson = docJson
    root.observing = observing
    root.crnl = crnl
    root.edited = edited
    root.textForId = textForId
    root.getData = getData
    root.setData = setData
    root.pretty = pretty
    root.codeString = codeString
    root.getBlock = getBlock
    root.Overrides = Overrides
    root.getItem = getItem
    root.addItem = addItem
    root.updateItem = updateItem
    root.removeId = removeId
    root.isRemoved = isRemoved
    root.createRenderingComputer = createRenderingComputer
    root.addChangeContextWhile = addChangeContextWhile
    root.changeContext = {}
    root.renderBlock = renderBlock
    root.commitEdits = commitEdits
    root.editingWhile = editingWhile
    root.codeContexts = codeContexts
    root.getBlockNamed = getBlockNamed
    root.getDataNamed = getDataNamed
    root.setDataNamed = setDataNamed
    root.getIndexedBlocks = getIndexedBlocks
    root.getSourceAttribute = getSourceAttribute
    root.setSourceAttribute = setSourceAttribute
    root.snapshot = snapshot
    root.revert = revert
    root.revertAll = revertAll
    root.indexedCursor = indexedCursor
    root.getRenderCount = getRenderCount
    root.incRenderCount = incRenderCount
    root.addDataAfter = addDataAfter
    root.curOrgDoc = curOrgDoc
    root.runBlock = runBlock
    root.mapDocumentBlocks = mapDocumentBlocks
    root.isCurrent = isCurrent
    root.appendData = appendData
    root.storeBlock = storeBlock
    root.stdCompare = stdCompare
    root.docOrg = docOrg
    root.dataTypeIds = dataTypeIds
    root.viewTypeData = viewTypeData
    root.viewIdTypes = viewIdTypes
    root.controllerDescriptorIds = controllerDescriptorIds
    root.indexes = indexes
    root.importedDocs = importedDocs
