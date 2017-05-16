Tools to support evaluating Leisure code

    SM = require 'source-map-support'
    SM.install()
    requirejs = require 'requirejs'
    ((typeof window != 'undefined' && window) || global).Lazy = requirejs('lib/lazy')
    Error.stackTraceLimit = Infinity
    {
      newCall
      resolve
      lazy
      defaultEnv
    } = root = module.exports = requirejs './base'
    rz = resolve
    lz = lazy
    lc = Leisure_call
    _ = requirejs 'lodash'
    fs = require 'fs'
    {
      getType
      setType
      setDataType
      ast2Json
      json2Ast
      Nil
    } = requirejs './ast'
    global.btoa = require 'btoa'
    {
      gen
      genSource
      withFile
      sourceNode
      SourceNode
      setMegaArity
    } = requirejs './gen'
    {
      readFile
      writeFile
    #} = requirejs './node'
    } = require './node'
    {
      identity
      runMonad2
      isIO
      asyncMonad
      replaceErr
      getMonadSyncMode
      setWarnAsync
      requireFiles
      getValue
    } = requirejs './runtime'
    {
      Promise
    } = requirejs 'bluebird'
    {
      tangle
      jsCodeFor
    } = requirejs './tangle'
    global.setType = setType
    global.setDataType = setDataType
    global.defaultEnv = defaultEnv
    global.identity = identity

    getParseErr = (x)-> x lz (value)->rz value

    replEnv =
      __proto__: defaultEnv
      prompt: (msg, cont)->
        rl.question(msg, (x)->
          try
            cont x
          catch err
            console.log "ERROR HANDLING PROMPT: #{err.stack}"
        )
      presentValue: (x)-> show(x) + '\n'

    errorString = (err)->
      if L$thunkStack
        #s = L$thunkStack.items().join '\n   at '
        s = L$thunkStack.join '\n   at '
        (global ? window).L$thunkStack = []
        err.toString() + ":\n   at " + s
      else err.stack ? err.toString()

    process.on 'uncaughtException', (err)->
      console.log "Uncaught Exception: #{errorString err}"

    requirePromise = (file)-> new Promise (resolve, reject)->
      requirejs [file], resolve

    leisurePromise = null

    getLeisurePromise = ->
      if !leisurePromise
        leisurePromise = requirePromise './leisure/generatedPrelude'
          .then -> requirePromise './leisure/std'
          .then -> simpleEval 'resetStdTokenPacks'
          .catch (err)-> console.error "ERROR LOADING LEISURE SYSTEM!\n#{err.stack}"
      leisurePromise

    evalInput = (text)->
      if text then getLeisurePromise().then -> simpleEval text
      else succeed ''

    simpleEval = (text)->
      new Promise (succeed, fail)->
        try
          result = lc L_newParseLine, 0, Nil, text
          runMonad2 result, replEnv, (ast)->
            try
              if getType(ast) == 'err'
                fail new Error "PARSE ERORR: #{getParseErr ast}"
              else
                source = genSource text, ast
                result = eval source
                if isIO result then console.log "(processing IO monad)"
                runMonad2 result, replEnv, (result)->
                  succeed {
                    ast
                    source
                    result
                  }
            catch err
              fail new Error errorString err
        catch err
          fail new Error errorString err

    module.exports = {
      evalInput
    }
