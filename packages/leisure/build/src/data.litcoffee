Data storage

Requirement:
- functional operation; between IO operations, the DB does not change
- updates could come in the background
- do not use transactions for functional operations
Implementation:
- data id is [batch, subbatch, id] (subbatch 0 is the server copy)
- FP code can use [HAMT, deleted set, batch, subbatch] for DB state (use monad to commit mods)

    indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    db =  null
    store = null

Initialize data -- if serverId is different from what the browser has,
then the browser database is out of date and needs to be initialized

    initData = (doc, serverId)->
      def = jQuery.Deferred()
      db = indexedDB.open doc
      db.onerror = (evt)->
        def.reject evt
        noDatabase()
      db.onsuccess = (evt)->
        store = if !db.objectStoreNames.contains "firstOS"
          db.createObjectStore "firstOS", keyPath: 'id', unique: true
        else db.objectStore 'Leisure'
        def.resolve evt
      def

    transact = (block)->
      db.transaction ['Leisure'], 'readwrite'


    storeData = (batch, localBatch, deletedIds, idValuePairs...)->
      db.transaction ['store'], 'readwrite'
      for i in [0...idValuePairs.length] by 2
        store.put
          batch: batch
          localBatch: localBatch
          id: idValuePairs[i]
          value: idValuePairs[i + 1]
      for id in deletedIds
        store.delete id

    noDatabase = -> db = null
