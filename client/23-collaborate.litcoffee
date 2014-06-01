Meteor-based collaboration -- client side

    {
      delay,
    } = Leisure = require '10-namespace'
    {
      loadOrg,
    } = require '24-orgSupport'
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
      safeLoad,
      dump,
    } = Leisure.yaml

    root = require '15-base'
    _ = Lazy

    viewTypeData = {}
    viewIdTypes = {}
    committing = false
    editing = false
    ignore = ->
    localStoreName = 'storage'
    nullHandlers = onsuccess: (->), onerror: ((e)-> console.log("ERROR:", e))
    codeContexts = {}
    observers = {}
    namedBlocks = {}

Batching code -- addBatch batches items and calls the given function
with the batch You should send the same function for each batch name,
every time, because func is ignored after the first call in a batch

    batchers = null
    disableUpdates = false

    addBatch = (name, value, func)->
      if !disableUpdates && (!committing || passesFilters name, value)
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

    processChanges = (doc, batch, local)->
      rc = createRenderingComputer()
      updated = {}
      for item in batch
        if !!item.data.local == local
          root.changeContext = item.context
          if item.data.local && item.type == 'added' && (old = root.currentDocument.findOne item.data._id)
            item.type = 'changed'
            item.oldData = old
          if !item.data.local then expungeLocalData doc.leisure.master, item.data._id
          processDataChange item, updated
          if !item.editing
            #console.log "ITEM: #{item.type} #{item.data._id}"
            switch item.type
              when 'added' then rc.add item.data
              when 'removed' then rc.remove item.data
              when 'changed' then rc.change item.oldData, item.data
        else updateObservers item.data, item.type, updated
      rc.render()

    # at this point, fully rerender all changed slides
    createRenderingComputer = (overrides)->
      changedStructure: false
      rerender: {}
      add: (data)->
        @changedStructure = true
        @rerender[data._id] = data
        if data.type == 'headline' && data.level == 1 && prev = getItem overrides, data.prev
          @rerender[prev._id] = prev
      remove: (data)->
        @changedStructure = true
        @removeElement data._id
        if data.type == 'headline' && data.level == 1 && prev = getItem overrides, data.prev
          @rerender[prev._id] = prev
      change: (oldData, newData)->
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
          when 'indent' | 'outdent'
            @rerender[newData._id] = newData
            prev = getItem overrides, newData.prev
            @rerender[prev._id] = prev
          when 'none' then
      removeElement: (id)->
        el = $("##{id}")
        if el.is "[data-org-headline='1']" then root.orgApi.removeSlide id
        else if el.length then root.restorePosition el[0].parentNode, => el.remove()
      render: ->
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

    processDataChange = ({type, data}, updated)->
      if type in ['changed', 'removed'] && viewIdTypes[data._id]
        root.orgApi.deleteView viewIdTypes[data._id]
        delete viewTypeData[viewIdTypes[data._id]]
        delete viewIdTypes[data._id]
      if type in ['changed', 'added'] && data.type == 'code'
        lang = data.language.toLowerCase()
        attr = data.codeAttributes ? {}
        if lang == 'html' && attr.defview
          viewTypeData[data.codeAttributes.defview] = codeString data
          viewIdTypes[data._id] = data.codeAttributes.defview
          delay -> root.orgApi.defineView data._id
        else if lang == 'yaml'
          if data.codeName then namedBlocks[data.codeName] = data._id
          root.orgApi.updateBlock data
          updateObservers data, type, updated
        else if attr.results?.toLowerCase() == 'def' && lang in ['js', 'javascript']
          try
            eval codeString data
          catch err
            console.log err.stack
        else if attr.results?.toLowerCase() == 'def' && lang in ['coffeescript', 'coffee']
          try
            if data.codeName
              if data.codeAttributes.observe
                if !(l = observers[data.codeAttributes.observe])
                  l = observers[data.codeAttributes.observe] = []
                l.push data.codeName
              codeContexts[data.codeName] = new -> eval CoffeeScript.compile codeString data
            else CoffeeScript.run codeString data
          catch err
            console.log err.stack
        else if attr.results?.toLowerCase() == 'def' && lang == 'leisure'
          #root.orgApi.executeText codeString(data), {}, null, (->)
          processLeisureBlock data

    updateObservers = (data, type, updated)->
      if data.codeName && data.yaml && observers[data.codeName] && !updated[data.codeName]
        updated[data.codeName] = true
        for o in observers[data.codeName]
          codeContexts[o]?.update?(data.yaml, type)

    leisureBlocks = []

    processingLeisure = false

    processLeisureBlock = (data)->
      leisureBlocks.push data
      if !processingLeisure
        processingLeisure = true
        processNextLeisureBlock()

    processNextLeisureBlock = ->
      if leisureBlocks.length == 0 then processingLeisure = false
      else
        data = leisureBlocks.shift()
        delay -> root.orgApi.executeText codeString(data), {}, null, processNextLeisureBlock

    codeString = (data)-> data.text.substring data.codePrelen, data.text.length - data.codePostlen

    getBlock = (id)->
      if id
        doc = root.currentDocument
        doc.leisure.localCollection.findOne(id) ? doc.findOne id

    getBlockNamed = (name)-> if id = namedBlocks[name] then getBlock id

    getDataNamed = (name)-> getBlockNamed(name)?.yaml

    setDataNamed = (name, value)-> if id = namedBlocks[name] then setData id, value

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

    setData = (id, value)->
      doc = root.currentDocument
      cur = getBlock id
      if !cur?.yaml? then throw new Error "Attempt to set data using invalid id"
      else
        newText = cur.text.substring(0, cur.codePrelen) + dump(value, cur.codeAttributes ? {}) + cur.text.substring cur.text.length - cur.codePostlen
        cur.text = newText
        cur.yaml = value
        #oldCommitting = committing
        #committing = true
        #try
        #  doc.update id, $set: {text: newText, yaml: value}
        #finally
        #  committing = oldCommitting
        updateItem overrides = new Overrides(), cur
        commitOverrides overrides

    observing = {}

    root.currentDocument = null

    observeDocument = (name)->
      login()
      obs = Meteor.call 'hasDocument', name, (err, docName)->
        if !err
          if typeof docName == 'object'
            $("#error").html "Error: #{docName.error}"
            $(document.body).addClass 'leisureError'
          else
            console.log "OBSERVING #{docName}"
            observing[docName] = true
            Meteor.subscribe docName, ->
              if name.match /^demo\/(.*)$/
                document.location.hash = "#load=/tmp/#{docName}"
              root.currentDocument = observing[docName] = docCol = new Meteor.Collection docName
              docCol.leisure = {name: docName}
              docCol.leisure.master = docCol
              res = null
              res = Meteor.subscribe docName, ->
                res.stop()
                docCol.leisure.info = docCol.findOne info: true
                initLocal root.currentDocument, ->
                  cursor = docCol.find()
                  sub = cursor.observe observer docCol, false
                  blockId = getBlock docCol.leisure.info.head
                  while blockId && block = getBlock blockId
                    processDataChange type: 'added', data: block
                    blockId = block.next
                  org = docOrg root.currentDocument, -> #(item)-> processDataChange type: 'added', data: item
                  root.loadOrg root.parentForDocId(docCol.leisure.info._id), org, docName
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
            document.body.classList.remove 'not-logged-in'
        else console.log "ERROR: #{err}\n#{err.stack}", err

    login = ->

    observer = (docCol, local)->
      changeName = "changes-#{local}"
      _suppress_initial: true
      added: (el)-> addChange changeName, 'added', copy(el), (items)-> processChanges docCol, items, local
      removed: (el)-> addChange changeName, 'removed', copy(el), (items)-> processChanges docCol, items, local
      changed: (el, oldEl)-> addChange changeName, 'changed', copy(el), copy(oldEl), (items)-> processChanges docCol, items, local

    context = L()

    addChangeContextWhile = (obj, func)->
      oldc = context
      try
        context = context.merge(obj).memoize()
        func()
      finally
        context = oldc

    addChange = (name, type, data, oldData, cont)->
      change = type: type, here: committing, editing: editing, data: data, context: context.toObject()
      if !cont then cont = oldData
      else change.oldData = oldData
      addBatch name, change, cont

Handling local content.

Leisure initially uses local content from the document.
Any changes to local data stay on the client and override the data in the document.

Users can mark any slide as local by setting a "local" property to true in the slide.  You can make data nonlocal by changing the local property so that it is no longer true (change its name, change its value, etc)

    initLocal = (col, cont)->
      localCol = col.leisure.localCollection = new Meteor.Collection(null)
      localCol.leisure = master: col
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
            if info.collectionId == col.leisure.info._id
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

    hasLocalStore = (col)-> col.leisure.localDb.objectStoreNames.contains localStoreName

    localTransaction = (col, type)->
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
      if store = localStore doc, trans, 'readonly'
        req = store.get key
        req.onsuccess = onsuccess
        req.onerror = onerror
      else onerror {}

    putToLocalStore = (doc, value, {onsuccess, onerror}, trans)->
      if store = localStore doc, trans
        req = store.put value
        req.onsuccess = onsuccess
        req.onerror = onerror
      else onerror {}

    removeFromLocalStore = (doc, key, {onsuccess, onerror}, trans)->
      if store = localStore doc, trans
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
        root.checkSingleNode root.blockText node
        overrides = new Overrides()
        changeDocText id, textForId(id), overrides
        commitEdits overrides
        if render then renderBlock getBlock id

    commitEdits = (overrides)->
        editing = true
        try
          commitOverrides overrides
        finally
          editing = false

    isRemoved = (overrides, id)-> overrides.removes[id]

    getItem = (overrides, id)-> id && !overrides?.removes[id] && (overrides?.adds[id] || overrides?.updates[id] || getBlock id)

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
              assert prev.next == id, "Bad prev/next for", id, ' / ', block.prev
          if !checkedNext[id]
            checkedNext[id] = true
            if block.next && !checkedNext[block.next]
              checkedNext[block.next] = true
              assert next = (getItem overrides, block.next), "Missing next for", id
              assert next.prev == id, "Bad prev/next for", block.next, " / ", id
      assert getItem(overrides, overrides.head), "Missing head: ", overrides.head

    commitOverrides = (overrides)->
      doc = overrides.doc
      localDoc = doc.leisure.localCollection
      committing = true
      trans = doc.leisure.localDb.transaction [localStoreName], 'readwrite'
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
        modDoc = doc
        if !(item.local && !doc.findOne(id)?.local) # item is not newly local
          if item.local
            modDoc = localDoc
            putToLocalStore doc, item, nullHandlers, trans
          else expungeLocalData doc, id # remove extraneous local data
        old = modDoc.findOne id
        if !old then modDoc.insert item
        else
          for k of old
            if !item[k]?
              removes[k] = ''
              removed = true
          if removed
            i = {}
            for k, v of item
              if k != '_id' && !removes[k]? then i[k] = v
            modDoc.update id, $set: i, $unset: removes
          else modDoc.update id, item
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
      newDoc = orgDoc parseOrgMode newText
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
        newDoc = orgDoc parseOrgMode prev.text + code.text
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

    addDocsAfter = (overrides, id, prev)->

    textForId = (id)-> root.blockText $("##{id}")[0]

    root.observeDocument = observeDocument
    root.docOrg = docOrg
    root.subDoc = subDoc
    root.docJson = docJson
    root.observing = observing
    root.crnl = crnl
    root.edited = edited
    root.textForId = textForId
    root.setData = setData
    root.pretty = pretty
    root.viewTypeData = viewTypeData
    root.viewIdTypes = viewIdTypes
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
    root.codeContexts = codeContexts
    root.getBlockNamed = getBlockNamed
    root.getDataNamed = getDataNamed
    root.setDataNamed = setDataNamed
