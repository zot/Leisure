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

    processChanges = (doc, batch)->
      for item in batch
        # delay here because each item will alter DOM in a delayed function
        # and successive items depend on current DOM content
        do (item)-> delay ->
          if isLocal item then console.log "IGNORING LOCAL CHANGE: #{JSON.stringify item}"
          else if item.type == 'changed'
            console.log "CHANGED:\n#{JSON.stringify item}\nORG ROOT:\n#{docOrg root.currentDocument, 0, item.data}\n#{}\nNODE: #{$ "##{item.data._id}"}"
            if item.data.type != item.oldData.type
              if item.data.type == 'headline' && item.data.level == 1
                prev = item.data.prev
                rendered = false
                while prev
                  prevItem = root.currentDocument.findOne prev
                  if prevItem.type == 'headline'
                    if !rendered
                      renderBlock prevItem
                      rendered = true
                    if prevItem.level == 1 then break
                if prev then $("##{prevItem._id}").after("<div id='#{item.data._id}'></div>")
                else $('[maindoc]').prepend("<div id='#{item.data._id}'></div>")
                renderBlock item.data
              else
                level = Number.MAX_SAFE_INTEGER
                redraw = item
                if item.data.type == 'headline' then level = item.data.level
                else if item.oldData.type == 'headline' then level = item.oldData.level
                prev = item.data.prev
                while prev
                  prevItem = root.currentDocument.findOne prev
                  if prevItem.type == 'headline' && prevItem.level < level
                    redraw = prevItem
                    break
                  prev = prevItem.prev
                renderBlock item.data
            else renderBlock item.data

    renderBlock = (item)->
      if $("##{item._id}").is "[data-org-headline='0']"
        org = docOrg root.currentDocument
      else
        org = subDoc(root.currentDocument, item, 0, 0)[0]
      root.loadOrg $('[maindoc]')[0], org, name, $("##{item._id}")[0]

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
        offset += org.length()
        children.push org
      new Headline '', 0, null, null, null, children, 0

    subDoc = (col, itemId, offset, level)->
      if !itemId then []
      else
        if !col then col = root.currentDocument
        item = if typeof itemId == 'string' then col.findOne itemId else itemId
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
        #root.currentDocument.update id, $set: {text: textForId(id), session: Meteor.connection._lastSessionId}
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
