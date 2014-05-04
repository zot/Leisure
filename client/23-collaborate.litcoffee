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
      docDo,
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

    processChanges = (doc, batch)->
      for item in batch
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
        attr = data.attributes
        if lang == 'html' && attr.defview
          console.log "ADDING DEF: #{data.text}"
          viewTypeData[data.attributes.defview] = codeString data
          viewIdTypes[data._id] = data.attributes.defview
          delay -> root.orgApi.defineView data._id
        else if attr.results?.toLowerCase() == 'def' && lang in ['js', 'javascript']
          eval codeString data
        else if attr.results?.toLowerCase() == 'def' && lang in ['leisure', 'coffeescript', 'clojurescript']
          console.log "ADDING DEF: #{data.text}"

    codeString = (data)-> data.text.substring data.codePrelen, data.text.length - data.codePostlen

    renderParent = (data)->
      [headline, parentId] = getParent data
      if headline then renderBlock parentId
      else
        if parentId then $("##{parentId}").after("<div id='#{data._id}'></div>")
        else $('[data-org-headline="0"]').prepend root.emptySlide data._id
        renderBlock data

    getParent = (data)->
      prev = data.prev
      dataLevel = if data.type == 'headline' then data.level else textLevel
      while prev
        prevItem = root.currentDocument.findOne prev
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
      if org then root.loadOrg $('[maindoc]')[0], org, name, $("##{item._id}")[0]

    setData = (id, value)->
      cur = root.currentDocument.findOne id
      if !cur?.yaml? then throw new Error "Attempt to set data using invalid id"
      else
        newText = cur.text.substring(0, cur.codePrelen) + dump(value) + cur.text.substring cur.text.length - cur.codePostlen
        oldCommitting = committing
        committing = true
        try
          root.currentDocument.update id, $set: {text: newText, yaml: value}
        finally
          committing = oldCommitting

    observing = {}

    root.currentDocument = null

    observeDocument = (name)->
      obs = Meteor.call 'hasDocument', name, (err, result)->
        if !err
          observing[name] = true
          Meteor.subscribe name, ->
            root.currentDocument = observing[name] = docCol = new Meteor.Collection name
            cursor = docCol.find()
            console.log "OBSERVING DOCUMENT WITH #{cursor.count()} nodes"
            sub = cursor.observe
              _suppress_initial: true
              added: (el)-> addBatch 'changes', type: 'added', data: copy(el), (items)-> processChanges docCol, items
              removed: (el)-> addBatch 'changes', type: 'removed', data: copy(el), (items)-> processChanges docCol, items
              changed: (el, oldEl)-> addBatch 'changes', type: 'changed', data: copy(el), oldData: copy(oldEl), (items)-> processChanges docCol, items
            org = docOrg root.currentDocument, (item)-> processDataChange type: 'added', data: item
            root.loadOrg $('[maindoc]')[0], org, name
          document.body.classList.remove 'not-logged-in'
        else console.log "ERROR: #{err}"

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
      new Headline '', 0, null, null, null, children, 0

    subDoc = (col, itemId, offset, level, each)->
      if !itemId then []
      else
        if !col then col = root.currentDocument
        item = if typeof itemId == 'string' then col.findOne itemId else itemId
        if item
          each item
          org = parseOrgMode item.text, offset
          org = if org.children.length == 1 then org.children[0]
          else new Fragment org.offset, org.children
          org.nodeId = item._id
          org.shared = item.type
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
      if node.children then node.children = (docJson col, col.findOne child for child in node.children)
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

    getItem = (overrides, id)-> id && (overrides.adds[id] || overrides.updates[id] || root.currentDocument.findOne id)

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
      committing = true
      for id of overrides.removes
        root.currentDocument.remove id
      for id, item of overrides.adds
        root.currentDocument.insert id, item
      for id, item of overrides.updates
        removes = {}
        removed = false
        old = root.currentDocument.findOne id
        for k of old
          if !item[k]?
            removes[k] = ''
            removed = true
        if removed
          console.log "UPDATE SET: #{pretty item}, UNSET: #{pretty removes}"
          root.currentDocument.update id, $set: item, $unset: removes
        else root.currentDocument.update id, item
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
