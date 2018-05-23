Test piping data from one process to another

    {fiberReader} = module = require './spawn'
    {spawn} = require 'child_process'
    fs = require 'fs'

    runTestProcesses1 = ->
      p1 = spawn 'ls', []
      spawn 'grep', ['index'], stdio: [p1.stdout, 'pipe', 'inherit']

    runTestProcesses2 = ->
      p1 = spawn 'echo', ['one', 'two']
      spawn 'wc', [], stdio: [p1.stdout, 'pipe', 'inherit']

    trimNL = (str)-> if str[str.length - 1] == '\n' then str.substring(0, str.length - 1) else str

    reader = fiberReader()
    reader.run ->
      try
        proc1 = runTestProcesses1()
        reader.addProc proc1
        file1 = fs.createReadStream '/tmp/derp2', highWaterMark: 4096, encoding: 'binary'
        #console.log "READING FILE", file1
        reader.addStream file1
        while (output = reader.readLine file1)?
          str = trimNL output
          console.log "FILE 1 '#{str}#{if str == output then '%' else ''}'"
        console.log "FILE DONE"
        console.log "READING PROC"
        while (output = reader.readLine proc1)?
          str = trimNL output
          console.log "PROC 1 '#{str}#{if str == output then '%' else ''}'"
      catch err
        console.log err
      finally
        console.log "EXITING"

    reader.run -> console.log "FINISHED"
