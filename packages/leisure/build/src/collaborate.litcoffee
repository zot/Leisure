Meteor-based collaboration -- client side

    {
      loadOrg,
    } = require './orgSupport'
    {
      parseOrgMode,
      Headline,
    } = require './org'
    root = require './base'

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

    observing = {}

    observeDocument = (name)->
      console.log "OBSERVE: #{name}"
      obs = Meteor.call 'hasDocument', name, (err, result)->
        if !err
          observing[name] = true
          Meteor.subscribe name, ->
            observing[name] = docCol = new Meteor.Collection name
            cursor = docCol.find()
            console.log "OBSERVING DOCUMENT WITH #{cursor.count()} nodes"
            sub = cursor.observe
              _suppress_initial: true
              added: (el)-> addBatch 'changes', added: el, (items)-> processChanges docCol, items
              removed: (el)-> addBatch 'changes', removed: el, (items)-> processChanges docCol, items
              changed: (el)-> addBatch 'changes', changed: el, (items)-> processChanges docCol, items
            console.log "TEXT: \n#{docText docCol, docCol.findOne(root: true)}"
            root.loadOrg $('[maindoc]')[0], docText(docCol, docCol.findOne(root: true)), name
          document.body.classList.remove 'not-logged-in'
        else console.log "ERROR: #{err}"

    docText = (col, doc)->
      if !doc then docText col, col.findOne root: true
      else doc.text + (if doc.children then (docText col, col.findOne child for child in doc.children).join '' else '')

    docOrg = (col, doc)->
      if !doc then docOrg col, col.findOne root: true
      else
        console.log "TEXT: '#{doc.text}'"
        #console.log "ORG: #{JSON.stringify parseOrgMode doc.text}"
        org = if !doc.text then new Headline '', 0
        else parseOrgMode(doc.text).children[0]
        if doc.children?
          org.children = ((docOrg col, col.findOne child) for child in doc.children ? [])
        org._id = doc._id
        org

    root.observeDocument = observeDocument
    root.docText = docText
    root.docOrg = docOrg
    root.observing = observing
