Meteor-based collaboration -- client side

    {
      delay,
    } = require '10-namespace'
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
    } = require '12-docOrg'
    root = require '15-base'
    _ = Lazy

Batching code -- addBatch batches items and calls the given function
with the batch You should send the same function for each batch name,
every time, because func is ignored after the first call in a batch

    batchers = null

    addBatch = (name, value, func)->
      if !batchers
        batchers = []
        setTimeout runBatches, 1
      if batchers[name] then batchers[name][0].push value
      else batchers[name] = [[value], func]

    runBatches = ->
      b = batchers
      batchers = null
      for k,[items, func] of b
        func items

Handle changes to the doc nodes

    textLevel = Number.MAX_SAFE_INTEGER

    processChanges = (doc, batch)->
      for item in batch
        # delay here because each item will alter DOM in a delayed function
        # and successive items depend on current DOM content
        do (item)-> delay ->
          switch item.type
            when 'added'
              console.log "ADDED: #{pretty item.data}"
              renderParent item.data
            when 'removed'
              console.log "REMOVED: #{pretty item.data}"
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
        org = subDoc(root.currentDocument, item, 0, 0)[0]
      if org then root.loadOrg $('[maindoc]')[0], org, name, $("##{item._id}")[0]

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
            org = docOrg()
            root.loadOrg $('[maindoc]')[0], org, name
          document.body.classList.remove 'not-logged-in'
        else console.log "ERROR: #{err}"

    copy = (obj)->
      newObj = {}
      for k, v of obj
        newObj[k] = v
      newObj

    docOrg = (col)->
      if !col then col = root.currentDocument
      children = []
      next = docRoot(col).head
      offset = 0
      while next
        [org, next] = subDoc col, next, offset, 0
        if !org then break
        offset += org.length()
        children.push org
      new Headline '', 0, null, null, null, children, 0

    subDoc = (col, itemId, offset, level)->
      if !itemId then []
      else
        if !col then col = root.currentDocument
        item = if typeof itemId == 'string' then col.findOne itemId else itemId
        if item
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
                [child, next] = subDoc col, next, offset, item.level
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

    addChild = (org, child)->
      if child instanceof Headline && child.level == 0
        for c in child.children ? []
          addChild org, c
      else org.children.push child

    crnl = (data)->
      if typeof data == 'string' then data.replace /\r\n/g, '\n'
      else if data.text
        data.text = crnl data.text
        data
      else data

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

    getItem = (overrides, id)-> id && (overrides.contents[id] || root.currentDocument.findOne id)

    addItem = (overrides, item)->
      overrides.contents[item._id] = item
      delete overrides.removes[item._id]

    removeId = (overrides, id)->
      item = getItem overrides, id
      prev = getItem overrides, item.prev
      next = getItem overrides, item.next
      delete overrides.contents[id]
      overrides.removes[id] = true
      if prev
        prev.next = item.next
        addItem overrides, prev
      if next
        next.prev = item.prev
        addItem overrides, next

    commitOverrides = (overrides)->
      for id of overrides.removes
        root.currentDocument.remove id
      for id, item of overrides.contents
        removes = {}
        removed = false
        old = root.currentDocument.findOne id
        for k of old
          if !item[k]?
            removes[k] = ''
            removed = true
        delete item._id
        if removed
          console.log "UPDATE SET: #{pretty item}, UNSET: #{pretty removes}"
          root.currentDocument.update id, $set: item, $unset: removes
        else root.currentDocument.upsert id, item

    sourceStart = /(^|\n)(#\+name|#\+begin_src)/i

    stealFirstLine = (overrides, item)->
      if item
        match = item.text.match /^[^\n]*\n/
        line = match?[0] ? item.text
        if match
          item.text = item.text.substring match[0].length
          addItem overrides, item
        else removeId overrides, item._id
        line
      else ''

    pretty = (obj)-> JSON.stringify obj, null, '  '

    newOverrides = -> contents: {}, removes: {}

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
        addItem overrides, cur
        addItem overrides, item
        cur = item

    mergeFirstChunk = (overrides, prev, newDoc)->
      if prev?.type == 'chunk' && newDoc[0]?.type == 'chunk'
        prev.text += newDoc.shift().text
        addItem overrides, prev

    mergeFirstCode = (overrides, prev, cur, newDoc)->
      if prev?.type == 'chunk' && newDoc[0]?.type == 'code'
        if simpleCheckCodeMerge overrides, prev, newDoc[0]
          if !prev.text then removeId overrides, prev._id
          else addItem overrides, prev

    mergeLastChunk = (overrides, next, newDoc)->
      if newDoc.length > 0 && newDoc[newDoc.length - 1]?.type == 'chunk' && next?.type == 'chunk'
        next.text = newDoc.pop().text + next.text
        addItem overrides, next

    mergeLastCode = (overrides, next, newDoc)->
      if newDoc.length > 0 && simpleCheckCodeMerge newDoc[newDoc.length - 1], next
        if !newDoc[newDoc.length - 1].text then newDoc.pop()
        addItem overrides, next

    updateDoc = (overrides, newBlock, oldBlock)->
      newBlock._id = oldBlock._id
      newBlock.prev = oldBlock.prev
      newBlock.next = oldBlock.next
      addItem overrides, newBlock
      newBlock

    checkCodeMerge = (overrides, prev, code)->
      if simpleCheckCodeMerge prev, code
        if !prev.text? then removeId overrides, prev._id
        else addItem overrides, prev
        addItem overrides, code

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
