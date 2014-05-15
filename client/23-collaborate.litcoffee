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
    ignore = ->
    localStoreName = 'storage'
    nullHandlers = onsuccess: (->), onerror: ((e)-> console.log("ERROR:", e))

Batching code -- addBatch batches items and calls the given function
with the batch You should send the same function for each batch name,
every time, because func is ignored after the first call in a batch

    batchers = null

    addBatch = (name, value, func)->
      #console.log "BATCH (COMMITTING: #{committing}): #{pretty value}"
      if !committing || passesFilters name, value
        if !batchers
          batchers = []
          setTimeout runBatches, 1
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
      for item in batch
        if !!item.data.local == local
          if item.data.local && item.type == 'added' && (old = root.currentDocument.findOne item.data._id)
            item.type = 'changed'
            item.oldData = old
          processDataChange item
          # delay here because each item will alter DOM in a delayed function
          # and successive items depend on current DOM content
          do (item)-> delay ->
            #console.log "#{item.type.toUpperCase()}: #{pretty item.data}"
            switch item.type
              when 'added'
                renderParent item.data
              when 'removed'
                [headline, parent] = getParent item.data
                if headline then renderBlock parent
                else $("##{item.data._id}").remove()
              when 'changed'
                processChange item,
                  text: -> renderBlock item.data
                  indent: (oldLevel, newLevel)->
                    if oldLevel == 1
                      $("##{item.data._id}").remove()
                      renderParent item.data
                    else renderParent item.oldData
                  outdent: (oldLevel, newLevel)->
                    renderParent item.oldData
                    renderParent item.data
                  none: ->

    processDataChange = ({type, data})->
      if type in ['changed', 'removed'] && viewIdTypes[data._id]
        console.log "DELETING OLD DEF: #{data.text}"
        delete viewTypeData[viewIdTypes[data._id]]
        delete viewIdTypes[data._id]
      if type in ['changed', 'added'] && data.type == 'code'
        lang = data.language.toLowerCase()
        attr = data.attributes ? {}
        if lang == 'html' && attr.defview
          viewTypeData[data.attributes.defview] = codeString data
          viewIdTypes[data._id] = data.attributes.defview
          delay -> root.orgApi.defineView data._id
        else if attr.results?.toLowerCase() == 'def' && lang in ['js', 'javascript']
          eval codeString data
        else if attr.results?.toLowerCase() == 'def' && lang == 'coffeescript'
          CoffeeScript.run codeString data
        else if attr.results?.toLowerCase() == 'def' && lang in ['leisure', 'clojurescript']
          console.log "ADDING DEF: #{data.text}"

    codeString = (data)-> data.text.substring data.codePrelen, data.text.length - data.codePostlen

    renderParent = (data)->
      [headline, parentId] = getParent data
      if headline then renderBlock parentId
      else
        if parentId then $("##{parentId}").after("<div id='#{data._id}'></div>")
        else $('[data-org-headline="0"]').prepend root.emptySlide data._id
        renderBlock data

    getBlock = (id)->
      doc = root.currentDocument
      doc.leisure.localCollection.findOne(id) ? doc.findOne id

    getParent = (data)->
      prev = data.prev
      dataLevel = if data.type == 'headline' then data.level else textLevel
      while prev
        prevItem = getBlock prev
        if prevItem.type == 'headline'
          if prevItem.level < dataLevel then return [true, renderBlock prevItem]
          else if dataLevel == 1 && prevItem.level == 1
            break
        prev = prev.prev
      [false, prev && prevItem._id]

    processChange = (item, processor)->
      data = item.data
      old = item.oldData
      if data.type == 'headline'
        if old.type != 'headline' then processor.outdent textLevel, data.level
        else
          if data.level < old.level then processor.outdent old.level, data.level
          else if data.level > old.level then processor.indent old.level, data.level
          else if data.text != old.text then processor.text()
          else processor.none()
      else if old.type == 'headline' then processor.indent old.level, textLevel
      else if data.text != old.text then processor.text()
      else processor.none()

    renderBlock = (item)->
      if $("##{item._id}").is "[data-org-headline='0']"
        org = docOrg root.currentDocument
      else
        org = subDoc(root.currentDocument, item, 0, 0, ignore)[0]
      if org then root.loadOrg root.parentForBlockId(item._id), org, name, $("##{item._id}")[0]

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
        updateItem overrides = newOverrides(), cur
        commitOverrides overrides

    observing = {}

    root.currentDocument = null

    observeDocument = (name)->
      login()
      obs = Meteor.call 'hasDocument', name, (err, result)->
        if !err
          observing[name] = true
          Meteor.subscribe name, ->
            root.currentDocument = observing[name] = docCol = new Meteor.Collection name
            docCol.leisure = {name: name}
            res = null
            res = Meteor.subscribe name, ->
              res.stop()
              docCol.leisure.info = docCol.findOne info: true
              initLocal root.currentDocument, ->
                cursor = docCol.find()
                console.log "OBSERVING DOCUMENT WITH #{cursor.count()} nodes"
                sub = cursor.observe observer docCol, false
                org = docOrg root.currentDocument, (item)-> processDataChange type: 'added', data: item
                root.loadOrg root.parentForDocId(docCol.leisure.info._id), org, name
          document.body.classList.remove 'not-logged-in'
        else console.log "ERROR: #{err}"

    login = ->


    observer = (docCol, local)->
      _suppress_initial: true
      added: (el)-> addBatch "changes-#{local}", type: 'added', here: committing, data: copy(el), (items)-> processChanges docCol, items, local
      removed: (el)-> addBatch "changes-#{local}", type: 'removed', here: committing, data: copy(el), (items)-> processChanges docCol, items, local
      changed: (el, oldEl)-> addBatch "changes-#{local}", type: 'changed', here: committing, data: copy(el), oldData: copy(oldEl), (items)-> processChanges docCol, items, local

Handling local content.

Leisure initially uses local content from the document.
Any changes to local data stay on the client and override the data in the document.

Users can mark any slide as local by setting a "local" property to true in the slide.  You can make data nonlocal by changing the local property so that it is no longer true (change its name, change its value, etc)

    initLocal = (col, cont)->
      localCol = col.leisure.localCollection = new Meteor.Collection(null)
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
              clearLocal col, nullHandlers, e.target.transaction
              cont()
          onerror: (e)->
            console.log "Initializing local storage..."
            clearLocal col, nullHandlers, e.target.result
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

    clearLocal = (col, handlers, trans)->
      if trans = trans || localTransaction col
        store = localStore col, trans
        req = store.clear()
        req.onsuccess = (e)->
          putToLocalStore col, {_id: 'info', collectionId: col.leisure.info._id}, handlers ? nullHandlers, trans
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
        req = store.remove key
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

    edits = {}
    pendingPush = false

    edited = (node)->
      console.log "edited", node
      node = $(node).closest('[data-shared]')[0]
      if node
        delay ->
          root.checkSingleNode root.blockText node
          edits[node.id] = true
          if !pendingPush
            pendingPush = true
            setTimeout doPush, 200

    doPush = ->
      currentEdits = edits
      edits = {}
      pendingPush = false
      overrides = newOverrides()
      for id of currentEdits
        changeDocText id, textForId(id), overrides
      commitOverrides overrides

    getItem = (overrides, id)-> id && (overrides.adds[id] || overrides.updates[id] || getBlock id)

    addItem = (overrides, item)->
      overrides.adds[item._id] = item
      delete overrides.removes[item._id]

    updateItem = (overrides, item)->
      (if overrides.adds[item._id]? then overrides.adds else overrides.updates)[item._id] = item
      delete overrides.removes[item._id]

    removeId = (overrides, id)->
      item = getItem overrides, id
      prev = getItem overrides, item.prev
      next = getItem overrides, item.next
      delete overrides.adds[id]
      delete overrides.updates[id]
      overrides.removes[id] = true
      if prev
        prev.next = item.next
        updateItem overrides, prev
      if next
        next.prev = item.prev
        updateItem overrides, next

    commitOverrides = (overrides)->
      doc = root.currentDocument
      localDoc = doc.leisure.localCollection
      committing = true
      trans = doc.leisure.localDb.transaction [localStoreName], 'readwrite'
      for id of overrides.removes
        (if local = localDoc.findOne id then localDoc else doc).remove id
        if local then removeFromLocalStore doc, id, nullHandlers, trans
      for id, item of overrides.adds
        (if item.local then localDoc else doc).insert item
        if item.local then putToLocalStore doc, item, nullHandlers, trans
      for id, item of overrides.updates
        removes = {}
        removed = false
        modDoc = if local = item.local then localDoc else doc
        old = modDoc.findOne id
        if local && !old then modDoc.insert item
        else
          for k of old
            if !item[k]?
              removes[k] = ''
              removed = true
          if removed
            console.log "UPDATE SET: #{pretty item}, UNSET: #{pretty removes}"
            i = {}
            for k, v of item
              if k != '_id' && !removes[k]? then i[k] = v
            modDoc.update id, $set: i, $unset: removes
          else modDoc.update id, item
        if local then putToLocalStore doc, item, nullHandlers, trans
      committing = false

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

    newOverrides = -> adds: {}, updates: {}, removes: {}

    changeDocText = (id, newText, overrides)->
      cur = getItem overrides, id
      prev = getItem overrides, cur.prev
      next = getItem overrides, cur.next
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
        item.prev = cur._id
        item.next = cur.next
        cur.next = item._id
        updateItem overrides, cur
        addItem overrides, item
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
