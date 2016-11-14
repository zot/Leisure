Lounge browser storage. Load and save documents to lounge storage. Saved
documents will checkpoint as you type.

    define ['./org', './docOrg', './utilities', './db', './editorSupport'], (Org, DocOrg, Utilites, EditorSupport)->
      {
        parseOrgDoc
      } = EditorSupport

      clearIndices = true

      initStorage = ->

      storeNameFor = (docName)-> "@local #{docName}"

      getDocument = (docName)->
        t = transaction storeNameFor(docName), 'readonly'
        blocks = null
        t.getAll('ids').then (rawBlocks)->
          blocks = _.keyBy rawBlocks, '_id'
          t.get('first').then (first)-> {
            first
            blocks
          }

      storeDocument = (data, docName, first, blocks)->
        if !blocks
          blocks = parseOrgMode first
          first =  blocks[0]._id
          sets = _.keyBy blocks, '_id'
          data.linkAllSiblings {first, sets}
        transaction(storeNameFor docName).then (t)->
          if clearIndices
            for index in t.store.indexNames
              store.deleteIndex index
          if !store.indexNames.length
            store.createIndex 'ids', '_id', unique: true
            store.createIndex 'names', 'codeName'
          t.put first, 'first'
          for block in blocks
            t.put block, block._id
          null

      class LocalDoc
        constructor: (data)->
          @storeName = storeNameFor data.baseDocName
          data.addFilter
        transaction: (type)-> transaction @storeName, type
        replaceBlock: (data, oldBlock, newBlock, context)->
          @transaction().put newBlock, newBlock._id
        clear: (data)=> @transaction().clear()

      {
        initStorage
      }
