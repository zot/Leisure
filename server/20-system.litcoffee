System services for Leisure

    root = Leisure
    child_process = Meteor.require 'child_process'
    inspect = Meteor.require('util').inspect

    #allowSystem = root.allowSystem
    allowSystem = true
    connectionCount = 0

    checkConnection = (meths)->
      if !meths.connection.leisure.systemCollection
        throw Meteor.Error 500, "No system connection"

    cleanupProcesses = (connection)->
      for callId, process of connection.leisure.processes ? {}
        process.kill 'SIGKILL'
      connection.leisure.processes = null

    Meteor.methods
      systemConnect: ->
        #console.log inspect @connection
        #if @connection.clientAddress != '127.0.0.1'
        #  throw new Meteor.Error 500, 'connection rejected'
        #if !@connection.leisure? then @connection.leisure = {}
        #if !@connection.leisure.systemCollection
        #  col = @connection.leisure.systemCollection = new Meteor.Collection " -SYSTEM- #{connectionCount++}"
        #  if !col.findOne 'results'
        #    col.insert _id: 'results'
        #  @connection.leisure.processes = {}
        #  @connection.onClose -> cleanupProcesses @connection
        #@connection.leisure.systemCollection._name

      exec: (callId, name, args, options)->
        checkConnection this
        proc = child_process.spawn name, args, options
        proc.connection = this.connection
        proc.connection.processes[callId] = proc
        proc.on 'error', (e)-> sendEvent 'error', proc, err: e.err.toString()
        proc.on 'exit', (e)->
          delete processes[proc.pid]
          sendEvent 'exit', proc, callId: callId, code: e.code, signal: e.signal
        proc.stdout.on 'data', (chunk)-> sendEvent 'stdout', proc, callId: callId, chunk: chunk
        proc.stderr.on 'data', (chunk)-> sendEvent 'stderr', proc, callId: callId, chunk: chunk
      kill: (callId, signal)->
        checkConnection this
        @connection.leisure.processes[callId]?.kill signal
        
    sendEvent = (type, proc, event)->
      event._id = 'results'
      event.type = type
      proc.connection.leisure.systemCollection.update 'results', event
