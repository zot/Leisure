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
          if item.type == 'changed'
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
      prev = data.prev
      dataLevel = if data.type == 'headline' then data.level else textLevel
      while prev
        prevItem = root.currentDocument.findOne prev
        if prevItem.type == 'headline'
          if prevItem.level < dataLevel then return renderBlock prevItem
          else if dataLevel == 1 && prevItem.level == 1
            break
        prev = prev.prev
      if prev then $("##{prevItem._id}").after("<div id='#{data._id}'></div>")
      else $('[data-org-headline="0"]').prepend root.emptySlide data._id
      renderBlock data

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

    isLocal = (item)->
      Meteor.connection._lastSessionId == item.data.session

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
      for id of currentEdits
        newDoc = orgDoc parseOrgMode textForId(id)
        if newDoc.length > 1 then console.log "WARNING, SPLIT NODE: #{JSON.stringify newDoc, null, '  '}"
        else if newDoc.length == 0 then console.log "WARNING, COULDN'T PARSE NODE: #{textForId id}"
        else
          oldItem = root.currentDocument.findOne id
          newItem = newDoc[0]
          newItem.session = Meteor.connection._lastSessionId
          newItem.prev = oldItem.prev
          newItem.next = oldItem.next
          if !newItem.level? && oldItem.level? then change = {$set: newItem, $unset: {level: ''}}
          else change = newItem
        root.currentDocument.update id, change

    textForId = (id)-> root.blockText $("##{id}")[0]

    root.observeDocument = observeDocument
    root.docOrg = docOrg
    root.docJson = docJson
    root.observing = observing
    root.crnl = crnl
    root.edited = edited
    root.textForId = textForId
