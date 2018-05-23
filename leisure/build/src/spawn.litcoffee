Execute commands that can read lines from processes.

This is sort of a coroutine-based version of select.

Kind of.

    Fiber = require 'fibers'
    {ChildProcess} = require 'child_process'

    # Must be used inside a fiber
    class FiberReader
      constructor: ->
        @commands = []
        @waiting = false
        @running = true
        @fiber = new Fiber =>
          while @running
            if !@commands.length then @pause()
            else
              try
                @commands.shift() this
              catch err
                console.log "ERROR IN Reader command", err
        @fiber.run()
      run: (cmd)->
        @commands.push cmd
        @resume()
      stop: ->
        @running = false
        @fiber = null
      addProc: (proc, options)->
        proc._spawnData = Object.assign {pendingData: '', highWater: 4096}, options
        proc.stdout.on 'data', (value)=> @addInput proc, value.toString()
        proc.stdout.on 'close', => @endInput proc
        proc.stdout.on 'end', => @endInput proc
        proc.on 'exit', => @endInput proc
      addStream: (stream, options)->
        stream._spawnData = Object.assign {pendingData: '', highWater: 4096}, options
        stream.on 'data', (value)=> @addInput stream, value.toString()
        stream.on 'close', => @endInput stream
        stream.on 'end', => @endInput stream
      addInput: (stream, str)->
        stream._spawnData.pendingData += str
        if dataLen(stream) > highWater(stream) && hasLine stream
          realStream(stream).pause()
        @resume()
      endInput: (stream)->
        stream.done = true
        @resume()
      pause: ->
        @waiting = true
        Fiber.yield()
        @waiting = false
      resume: -> if @waiting then @fiber.run()
      waitFor: (contFunc)->
        result = null
        pendingFiberDone = false
        process.nextTick => contFunc (res)=>
          pendingFiberDone = true
          result = res
          @resume()
          res
        while !pendingFiberDone
          @pause()
        result
      readLine: (stream)->
        index = stream._spawnData.pendingData.indexOf '\n'
        while !stream.done && index == -1
          @pause()
          index = stream._spawnData.pendingData.indexOf '\n'
        if index == -1 then index = stream._spawnData.pendingData.length else index++
        line = stream._spawnData.pendingData.substring 0, index
        stream._spawnData.pendingData = stream._spawnData.pendingData.substring index
        if !stream.done && realStream(stream).isPaused() && dataLen(stream) < highWater
          realStream(stream).resume()
        if stream.done && !line then null else line

    hasLine = (stream)-> stream._spawnData.pendingData.indexOf('\n') > -1

    dataLen = (stream)-> stream._spawnData.pendingData.length

    highWater = (stream)-> stream._spawnData.highWater

    realStream = (stream)-> if stream instanceof ChildProcess then stream.stdout else stream

    fiberReader = -> new FiberReader()

    module.exports = {
      fiberReader
    }
