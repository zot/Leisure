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

      messageId = 0
      requestPromises = {}

      worker = new Worker 'build/odbWorker.js'

      worker.onmessage = (e)->
        if e.data.requestId && p = requestPromises[e.data.requestId]
          requestPromises[e.data.requestId] = null
          p e.data.return

      postRequest = (msg)->
        msgId = msg.msgId = messageId++
        p = new Promise (resolve, reject)-> requestPromises[msgId] = resolve
        worker.postMessage msg
        p

      handleTraceValues = (values)->
        worker.postMessage {
          msg: 'queueValues'
          logName: 'testLog'
          values: values
        }

      useOdb = (types...)->
        for type in types
          useDebugging 100, handleTraceValues, type

      trackOdb = ->
        console.log 'ODB tracking'
        trackDebugging 100, handleTraceValues

      addRecord = (map, instanceId, record)->
        seq = record.sequence = traceRecords.sequenceNum++
        traceRecords.sequence[seq] = map[instanceId] = record
        if !traceRecords.items[seq]? then traceRecords.items[seq] = record

      getLatestEntry = ->
        postRequest
          msg: 'latestEntry'
          logName: 'testLog'

      getEntry = (type, key)->
        postRequest {
          msg: 'getEntry'
          logName: 'testLog'
          type
          key
        }

      clearEntries = ->
        worker.postMessage
          msg: 'clearEntries'
          logName: 'testLog'

      deleteEntries = ->
        worker.postMessage
          msg: 'deleteEntries'
          logName: 'testLog'

      window.useOdb = useOdb

      window.ODB = {
        useOdb
        trackOdb
        getEntry
        getLatestEntry
        clearEntries
        deleteEntries
      }
