IndexedDb support for Leisure

    define ['bluebird'], (Bluebird)->
      {
        Promise
      } = Bluebird

      stores = {}
      dbName = 'leisureStorage'
      deleteStore = false
      #deleteStore = true
      localStore = null

      getLocalStore = (id)->
        if deleteStore then (new Promise (succeed, fail)->
          deleteStore = false
          delete stores[id]
          req = indexedDB.deleteDatabase dbName
          req.onsuccess = succeed
          req.onerror = fail).then -> openStore id
        else openStore id

      openStore = (id, version)-> stores[id] || stores[id] = new Promise (succeed, fail)->
        req = indexedDB.open dbName, version ? 1
        req.onupgradeneeded = (e)->
          db = req.result
          if !db.objectStoreNames.contains id
            db.createObjectStore id, keyPath: '_id'
        req.onsuccess = ->
          db = req.result
          if !db.objectStoreNames.contains id then openStore id, db.version + 1
          else succeed localStore = req.result
        req.onerror = fail

      defer = (cont)-> setTimeout cont, 1

      localTransaction = (id, type)->
        p = getLocalStore(id)
        action = (db)->
          if db.objectStoreNames.contains id
            db.transaction [id], type || 'readwrite'
          else Promise.reject "No object store named #{id}"
        if p.isResolved() then action p.value() else p.then action

      promiseForRequest = (req)-> new Promise (succeed, fail)->
        req.onsuccess = (e)-> succeed req.result
        req.onerror = (e)->
          console.log "Database failure:", e
          fail e

      hasDatabase = (id)-> stores[id]

      transaction = (id, type)->
        trans = null
        p = localTransaction id, type
        obj =
          transaction: null
          store: null
          then: (func)-> if trans then func trans else p.then obj
          put: (value, key)->
            console.log "Putting value into store #{id}", value
            doAction => @store.put value, key
          get: (key)-> doAction => @store.get key
          delete: (key)-> doAction => @store.delete key
          clear: -> doAction => @store.clear()
          getAll: (index)->
            results = []
            doAction => new Promise (succeed, fail)=>
              cursorReq = (if index then @store.index index else @store).openCursor()
              cursorReq.onsuccess = (e)->
                if cursor = e.target.result
                  results.push cursor.value
                  cursor.continue()
                else succeed results
              cursorReq.onerror = fail
        setTrans = (t)->
          trans = obj.transaction = t
          obj.store = t.objectStore id
        if p instanceof Promise then p = p.then((t)-> setTrans t) else setTrans p
        doAction = (action)-> if trans then promiseForRequest action()
        else p.then -> promiseForRequest action()
        obj

      {
        hasDatabase
        transaction
      }
