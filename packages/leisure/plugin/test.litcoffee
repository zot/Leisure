    #console.log "meteor: ", Meteor
    console.log "plugin:  ", Plugin
    console.log "hello"

    handler = (compileStep, isLiterate)->
      source = compileStep.read().toString('utf8')
      outputFile = compileStep.inputPath + ".js"
      output = null

      try
        output = "console.log('test output for file #{compileStep.inputPath}');"
      catch e
        # XXX better error handling, once the Plugin interface support it
        throw new Error(
          compileStep.inputPath + ':' +
          (if e.location then (e.location.first_line + ': ') else ' ') +
          e.message
        )

      compileStep.addJavaScript
        path: outputFile
        sourcePath: compileStep.inputPath
        data: output
        #sourceMap: sourceWithMap.sourceMap
        #bare: compileStep.fileOptions.bare

    Plugin.registerSourceHandler "lorg", handler
