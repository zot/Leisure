Meteor-based collaboration -- client side

    {
      loadOrg,
    } = require '24-orgSupport'
    {
      parseOrgMode,
      Headline,
    } = require '11-org'
    root = require '15-base'

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
        if isLocal item then console.log "IGNORING LOCAL CHANGE: #{JSON.stringify item}"
        else if item.type == 'changed'
          console.log "CHANGED:\n#{JSON.stringify item}\nORG ROOT:\n#{docOrg root.currentDocument, 0, item.data}\n#{}\nNODE: #{$ "##{item.data._id}"}"
          #root.loadOrg $('[maindoc]')[0], docOrg(root.currentDocument, 0, item.data), name, $("##{item.data._id}")[0]
          root.loadOrg $('[maindoc]')[0], item.data, name, $("##{item.data._id}")[0]

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
              added: (el)-> addBatch 'changes', type: 'added', data: el, (items)-> processChanges docCol, items
              removed: (el)-> addBatch 'changes', type: 'removed', data: el, (items)-> processChanges docCol, items
              changed: (el)-> addBatch 'changes', type: 'changed', data: el, (items)-> processChanges docCol, items
            #org = docOrg docCol, 0
            #org.linkNodes()
            #root.loadOrg $('[maindoc]')[0], org, name
            root.loadOrg $('[maindoc]')[0], docCol.findOne(root: true), name
          document.body.classList.remove 'not-logged-in'
        else console.log "ERROR: #{err}"

    docOrg = (col, offset, doc)->
      if !doc then docOrg col, offset, col.findOne root: true
      else
        org = if !doc.text then new Headline '', 0, null, null, null, [], 0
        else parseOrgMode crnl(doc.text), offset
        if org instanceof Headline && org.level == 0
          if org.children?.length == 1 then org = org.children[0]
          else org = new Fragment org.offset, org.children
          org.nodeId = doc._id
          org.shared = true
        if doc.children?
          for child in doc.children
            childOrg = docOrg col, offset, col.findOne child
            addChild org, childOrg
            offset += childOrg.length()
        org

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

    crnl = (data)-> if typeof data == 'string' then data.replace /\r\n/g, '\n' else data

    edits = {}
    pendingPush = false

    edited = (node)->
      node = $(node).closest('[data-shared]')[0]
      if node
        edits[node.id] = true
        if !pendingPush
          pendingPush = true
          setTimeout doPush, 200

    doPush = ->
      currentEdits = edits
      edits = {}
      pendingPush = false
      for id of currentEdits
        root.currentDocument.update id, $set: {text: textForId(id), session: Meteor.connection._lastSessionId}

    textForId = (id)-> root.blockText $("##{id}")[0]

    root.observeDocument = observeDocument
    root.docOrg = docOrg
    root.docJson = docJson
    root.observing = observing
    root.crnl = crnl
    root.edited = edited
    root.textForId = textForId
