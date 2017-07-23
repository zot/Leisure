Basic omniscient debugger

    define ['./base', 'bluebird'], (Base, Bluebird)->
      {
        useDebugging
        trackDebugging
        flushTraceLog
      } = Base
      {
        Promise
      } = Bluebird

      messageId = 1
      requestPromises = {}
      currentOdb = null
      worker = new Worker 'build/odbWorker.js'

      worker.onmessage = (e)->
        console.log "Received response: #{JSON.stringify e}"
        if e.data.msgId && p = requestPromises[e.data.msgId]
          requestPromises[e.data.msgId] = null
          if e.data.return then p.resolve e.data.return
          else p.reject e.data.error

      useOdb = (types...)->
        for type in types
          useDebugging 100, handleTraceValues, type

      trackOdb = ->
        console.log 'ODB tracking'
        trackDebugging 100, handleTraceValues

      handleTraceValues = (values)-> currentOdb.handleTraceValues values

      dumpTraceValues = -> currentOdb.dumpTraceValues()

      setVerbose = (state)-> currentOdb.setVerbose state

      getLatestEntry = -> currentOdb.getLatestEntry()

      getEntry = (type, key)-> currentOdb.getEntry type, key

      getCallGraphInfo = -> currentOdb.getCallGraphInfo

      getCallGraphEntry = (n)-> currentOdb.getCallGraphEntry

      getContextDef = (contextId, defId)-> currentOdb.getContextDef contextId, defId

      getLambdaDef = (name)-> currentOdb.getLambdaDef name

      clearEntries = -> currentOdb.clearEntries()

      deleteEntries = -> currentOdb.deleteEntries()

      class ODB
        constructor: (@logName)->
        postRequest: (msg)->
          flushTraceLog()
          msg.logName = @logName
          msgId = msg.msgId = messageId++
          p = new Promise (resolve, reject)->
            requestPromises[msgId] = {resolve, reject}
          worker.postMessage msg
          p
        postMessage: (req, suppressFlush)->
          if !suppressFlush then flushTraceLog()
          req.logName = @logName
          worker.postMessage req
        handleTraceValues: (values)-> @postMessage {msg: 'queueValues', values: values}, true
        dumpTraceValues: -> @postMessage msg: 'dumpValues'
        getLatestEntry: -> @postRequest msg: 'latestEntry'
        getEntry: (type, key)-> @postRequest {type, key, msg: 'getEntry'}
        getContextDef: (contextId, defId)->
          @postRequest {id, msg: 'getContextDef', context: contextId}
        getLambdaDef: (name)-> @postRequest msg: 'getContextDef', lambdaName: name
        getCallGraph: (number)-> @postRequest {number, msg: 'getCallGraph'}
        getCallGraphInfo: -> @postRequest msg: 'getCallGraphInfo'
        clearEntries: -> @postMessage msg: 'clearEntries'
        deleteEntries: -> @postMessage msg: 'deleteEntries'
        setVerbose: (state)-> @postMessage msg: 'setVerbose', verbose: state

      currentOdb = new ODB 'testLog'

      window.useOdb = useOdb

      window.ODB = Leisure.ODB = {
        dump: dumpTraceValues
        useOdb
        trackOdb
        getEntry
        dumpTraceValues
        getLatestEntry
        getEntry
        getContextDef
        getLambdaDef
        clearEntries
        deleteEntries
        setVerbose
      }
