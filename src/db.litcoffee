IndexedDb support for Leisure

    define [], ->
      stores = {}
      storeName = 'leisureStorage'
      deleteStore = false
      #deleteStore = true

      getLocalStore = (id)->
        if deleteStore then new Promise (succeed, fail)->
          deleteStore = false
          delete stores[id]
          req = indexedDB.deleteDatabase id
          req.onsuccess = -> succeed openStore id
          req.onerror = fail
        else openStore id

      openStore = (id)-> stores[id] || stores[id] = new Promise (succeed, fail)->
        req = indexedDB.open id, 1
        req.onupgradeneeded = (e)->
          db = req.result
          if !db.objectStoreNames.contains storeName
            db.createObjectStore storeName, keyPath: '_id'
        req.onsuccess = -> succeed req.result
        req.onerror = fail

      defer = (cont)-> setTimeout cont, 1

      localTransaction = (id, type)->
        getLocalStore(id).then (db)->
          if db.objectStoreNames.contains storeName
            db.transaction [storeName], type || 'readwrite'
          else Promise.reject "No object store named #{storeName}"

      promiseForRequest = (req)-> new Promise (succeed, fail)->
        req.onsuccess = (e)-> succeed req.result
        req.onerror = fail

      hasDatabase = (id)-> stores[id]

      transaction = (id, type)->
        trans = null
        p = localTransaction(id, type).then (t)-> trans = t
        put: (value)->
          p = p.then -> promiseForRequest trans.objectStore(storeName).put value
        get: (key)->
          p = p.then -> promiseForRequest trans.objectStore(storeName).get key
        delete: (key)->
          p = p.then -> promiseForRequest trans.objectStore(storeName).delete key
        getAll: ->
          results = []
          p.then -> new Promise (succeed, fail)->
            trans.objectStore(storeName).openCursor().onsuccess = (e)->
              if cursor = e.target.result
                results.push cursor.value
                cursor.continue()
              else succeed results

      {
        hasDatabase
        transaction
      }
