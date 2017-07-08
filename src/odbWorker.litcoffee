Shared worker for Leisure's ODB maintains multiple in-memory trace logs and
persists between page refreshes so we can browse logs as if it were a database

    self.traceRecords = traceRecords = {}
    shared = SharedWorkerGlobalScope?

    defKey = (context, id)-> key = "#{context.id}-#{id}"

    verbose = ->
    #verbose = (args...)-> console.log args...

    class OdbWorker
      constructor: ->
        if shared then self.onconnect = (e)=> @init e.ports[0]
        else @init self
      init: (@port)->
        @port.onmessage = (e)->
          verbose "message ", e.data.msg
          worker[e.data.msg] e, e.data
      queueValues: (e, {logName, values})->
        records = traceRecords[logName] ? newTraceRecords(logName)
        pos = 0
        while pos < values.length
          pos = this[values[pos]] records, pos, values
        null
      latestEntry: (e, {logName, msgId})->
        @port.postMessage {
          return: (records = traceRecords[logName]) && records.sequence[records.sequenceCount - 1]
          msgId
        }
      getEntry: (e, {logName, type, key, msgId})->
        @port.postMessage {
          return: (records = traceRecords[logName]) && records[type]?[key]
          msgId
        }
      clearEntries: (e, logName)-> newTraceRecords logName
      deleteEntries: (e, logName)-> traceRecords[logName] = {}
      lazyValue: (records, pos, values)->
        type = values[pos++]
        instance = values[pos++]
        context = values[pos++]
        id = values[pos++]
        records.add records.values, instance, {
          type
          instance
          context
          id
        }
        pos
      resolve: (records, pos, values)->
        type = values[pos++]
        instance = values[pos++]
        result = [values[pos++]]
        if result[0] == -1 then result.push values[pos++]
        records.add records.resolves, instance, {
          type
          instance
          value: result
        }
        pos
      lambda: (records, pos, values)->
        type = values[pos++]
        instance = values[pos++]
        context = values[pos++]
        id = values[pos++]
        parent = values[pos++]
        records.add records.lambdas, instance, {
          type
          instance
          context
          id
          parent
        }
        pos
      call: (records, pos, values)->
        type = values[pos++]
        instance = values[pos++]
        context = values[pos++]
        id = values[pos++]
        args = []
        for i in [0...values[pos++]]
          args.push v = values[pos++]
          if v == -1 then args.push values[pos++]
        record = records.add records.calls, null, {
          type
          instance
          context
          id
          args
        }
        records.stack.push record
        pos
      return: (records, pos, values)->
        type = values[pos++]
        instance = values[pos++]
        context = values[pos++]
        id = values[pos++]
        result = [values[pos++]]
        if result[0] == -1 then result.push values[pos++]
        caller = records.stack.pop()
        records.add records.returns, null, {
          type
          instance
          context
          id
          caller: caller.sequence
          value: result
        }
        pos
      createPartial: (records, pos, values)->
        type = values[pos++]
        instance = values[pos++]
        lambda = values[pos++]
        context = values[pos++]
        id = values[pos++]
        args = []
        for i in [0...values[pos++]]
          args.push v = values[pos++]
          if v == -1 then args.push values[pos++]
        record = records.add records.partials, instance, {
          type
          instance
          lambda
          context
          id
          args
        }
        pos
      callPartial: (records, pos, values)->
        type = values[pos++]
        instance = values[pos++]
        lambda = values[pos++]
        context = values[pos++]
        id = values[pos++]
        args = []
        for i in [0...values[pos++]]
          args.push v = values[pos++]
          if v == -1 then args.push values[pos++]
        record = records.add records.partialCalls, instance, {
          type
          instance
          lambda
          context
          id
          args
        }
        pos
      mark: (records, pos, values)->
        type = values[pos++]
        count = values[pos++]
        record = records.add records.marks, null, {
          type
          count
        }
        pos
      context: (records, pos, values)->
        [type, context, source, inlineMap, externalMap, debugType, length] = values[pos...pos + 7]
        pos += 7
        defs = []
        lambdaDefs = {}
        lazyDefs = {}
        records.contexts[context] = {type, id:context, source, inlineMap, externalMap, defs, lambdaDefs, lazyDefs, debugType}
        id = 0
        length += pos
        while pos < length
          [type, line, col, parent] = values[pos...pos + 4]
          pos += 4
          if type == 'lazy'
            defs.push lazyDefs[id] = {context, id, type: 'lazyDef', line, col, parent}
          else
            [name, argCount] = values[pos...pos + 2]
            pos += 2
            args = values[pos...pos + argCount]
            pos += argCount
            defs.push lambdaDefs[id] = {context, id, type: 'lambdaDef', line, col, parent, name, args}
            if name then records.lambdaDefsByName[name] = lambdaDefs[id]
          id++
        pos

    worker = new OdbWorker()

    console.log "global: ", self
    console.log "worker: ", worker
    console.log "records: ", traceRecords

    addRecord = (records, map, instanceId, record)->
      seq = record.sequence = records.sequenceCount++
      records.sequence[seq] = record
      if map then map[if instanceId != null then instanceId else seq] = record
      if !records.items[instanceId]? then records.items[instanceId] = record
      record

    newTraceRecords = (name)->
      records = traceRecords[name] =
        sequenceCount: 0
        sequence: []
        contexts: traceRecords[name]?.contexts ? []
        lambdaDefsByName: traceRecords[name]?.lambdaDefsByName ? {}
        values: {}
        resolves: {}
        lambdas: {}
        calls: {}
        partials: {}
        partialCalls: {}
        returns: {}
        items: {}
        contexts: []
        stack: []
      records.add = addRecord.bind null, records
      records.dump = dump.bind null, name
      records

    processTrace = (records, value)->

    class TraceDumper
      dump: (@records)->
        @level = 0
        @called = {}
        result = (for context in @records.contexts
          @dumpRecord(context) + '\n' + (for def in context.defs
            type = if def.type == 'lazy' then 'lazyDef' else 'lambdaDef'
            @dumpRecord Object.assign {}, def, {type}).join '\n').join '\n'
        result + '\n' + (for i in [0...@records.sequenceCount]
          @dumpRecord @records.sequence[i]).join '\n'
      dumpRecord: (record)->
        prefix = if record.sequence? then pad(7, String(record.sequence)) + ' ' else ''
        for i in [0...@level]
          prefix = prefix + '  '
        "#{prefix}#{record.type} " + this[record.type](record).join ' '
      nameForLambda: (lambda, context, id)->
        if !context? && typeof lambda == 'number'
          if l = @records.lambdas[lambda]
            def = @records.contexts[l.context].defs[l.id]
        else if context? then def = @records.contexts[context].defs[id]
        else if lambda.context?
          def = @records.contexts[lambda.context].defs[lambda.id]
        if def
          if def.name then def.name
          else
            id = def.id
            ctx = @records.contexts[def.context]
            while def && !def.name
              def = ctx.defs[def.parent]
            "#{def?.name ? ''}[#{id}]"
        else "[#{lambda}]"
      nextValue: (value, pos)->
        pos = pos ? 0
        if value[pos] == -1 then value[pos + 1]
        else if typeof value[pos] == 'number'
          if v = @records.values[value[pos]]
            "VALUE[#{v.instance} in #{@nameForLambda v.parent}]"
          else @nameForLambda value[pos]
        else value[pos]
      context: ({id, source, debugType})-> [id, source, debugType]
      lambdaDef: ({line, col, context, id, parent, name, argNames})->
        #[name ? (if parent? then 'unknown' else '????'), "id: #{context}:#{id}:#{parent ? '-'}", "position: #{line ? '?'}:#{col ? '?'}", argNames]
        [@nameForLambda('unknown', context, id) ? '????', "id: #{context}:#{id}:#{parent ? '-'}", "position: #{line ? '?'}:#{col ? '?'}", argNames]
      lazyDef: ({line, col, context, id, parent})->
        ["id: #{context}:#{id}:#{parent ? '-'}", "position: #{line ? '?'}:#{col ? '?'}"]
      lazyValue: ({instance, id, parent, context})->
        ["(#{instance} #{@nameForLambda("unknown", context, id)})"]
      resolve: ({instance, value})->
        ["(#{instance}):", @nextValue value]
      lambda: ({instance, context, id, parent})->
        [@nameForLambda(instance, context, id), @records.contexts[context].defs[id].args.join ', ']
      call: ({instance, context, id, args})->
        if @called[instance] then @called[instance]++
        else @called[instance] = 1
        @level++
        result = [@nameForLambda(instance, context, id), "(#{instance}):"]
        pos = 0
        while pos < args.length
          result.push @nextValue args, pos
          pos += if args[pos] == -1 then 2 else 1
        result
      return: ({caller, instance, context, id, value})->
        if @called[instance]
          @called[instance]--
          @level--
        ["from", @nameForLambda(instance, context, id), "(#{instance} caller: #{caller}):", @nextValue value]
      createPartial: ({instance, lambda, args})->
        [@nameForLambda(lambda), instance, args]
      callPartial: ({instance, args})->
        [@nameForLambda(@records.partials[instance].lambda), instance, args]

    pad = (number, string)->
      while string.length < number
        string = " " + string
      string

    dump = (logName)-> new TraceDumper().dump traceRecords[logName]

    self.dump = dump
