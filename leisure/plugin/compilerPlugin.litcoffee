    #console.log "meteor: ", Meteor
    #console.log "plugin:  ", Plugin
    #console.log "hello"
    #console.log "org?", global.Org?
    {Compiler} = Org = require?('org') ? global.Org

    handler = (compileStep, isLiterate)->
      inputFile = compileStep.inputPath
      source = compileStep.read().toString('utf8')
      outputFile = inputFile + ".js"

      try
        {code, map} = new Compiler(source, inputFile, outputFile).generate()
        #console.log "code: #{code}"
        #console.log "map:", map.toJSON()
      catch e
        # XXX better error handling, once the Plugin interface support it
        throw new Error(
          inputFile + ':' +
          (if e.location then (e.location.first_line + ': ') else ' ') +
          e.message
        )

      compileStep.addJavaScript
        path: outputFile
        sourcePath: inputFile
        data: code
        sourceMap: map.toJSON()

    Plugin.registerSourceHandler "lorg", handler
