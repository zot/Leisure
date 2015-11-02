###
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
###

require('source-map-support').install()

path = require 'path'

baseDir = path.resolve path.dirname(module.filename) + '/../../../build'
baseLeisureDir = baseDir + '/leisure/'

requirejs = require('requirejs').config
  baseUrl: baseDir
  paths:
    lib: baseDir + '/lib'
    immutable: baseDir + '/lib/immutable-3.7.4.min'

((typeof window != 'undefined' && window) || global).Lazy = requirejs('lib/lazy')

#require '10-namespace'

Error.stackTraceLimit = Infinity
#Error.stackTraceLimit = 50
{
  newCall
  resolve
  lazy
  defaultEnv
} = root = module.exports = requirejs './base'
rz = resolve
lz = lazy
lc = Leisure_call
_ = require 'lodash.min'
fs = require 'fs'
#compiler = require 'compiler'

if _.includes process.argv, '-x' then global.L_DEBUG = true

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
  genMap
  genSource
  withFile
  sourceNode
  SourceNode
  setMegaArity
} = requirejs './gen'
{
  readFile
  writeFile
} = requirejs './node'
{
  identity
  runMonad2
  isMonad
  asyncMonad
  replaceErr
  getMonadSyncMode
  setWarnAsync
  requireFiles
  getValue
} = requirejs './runtime'
{
  Promise
} = requirejs 'lib/bluebird.min'

global.setType = setType
global.setDataType = setDataType
global.defaultEnv = defaultEnv
global.identity = identity
#global.Leisure = root

# compilation stage
# 0: use CoffeeScript Leisure compiler
# 1: use only SimpleParse.lsr
# 2: use generatedPrelude.lsr
#
stage = 2
std = true
stages = ['simpleParseJS', 'simpleParse', 'generatedPrelude']
shouldNsLog = false
pargs = null

diag = false

readline = require('readline')

replEnv =
  prompt: (msg, cont)->
    rl.question(msg, (x)->
      try
        cont x
      catch err
        console.log "ERROR HANDLING PROMPT: #{err.stack}"
    )
  presentValue: (x)-> show(x) + '\n'

replEnv.__proto__ = defaultEnv

getParseErr = (x)-> x lz (value)->rz value

evalInput = (text, cont)->
  if text
    try
      if newCall
        result = lc L_newParseLine, 0, Nil, text
      else
        result = rz(L_newParseLine)(0)(lz Nil)(lz text)
      runMonad2 result, replEnv, (ast)->
        try
          if getType(ast) == 'err'
            cont "PARSE ERORR: #{getParseErr ast}"
          else
            if diag
              if L_simplify?
                runMonad2 (rz(L_simplify) lz text), replEnv, (result)-> console.log "\nSIMPLIFIED: #{result}"
              console.log "\nAST: #{ast}"
            source = genSource text, ast
            if diag
              #console.log "\nCODE: (#{gen ast})"
              console.log "\nCODE: (#{source})"
            #result = eval genSource text, ast
            result = eval source
            if isMonad result then console.log "(processing IO monad)"
            runMonad2 result, replEnv, cont
        catch err
          cont rz(L_err)(lz (err.stack ? err.toString()))
    catch err
      cont rz(L_err)(lz (err.stack ? err.toString()))
  else cont ''

help = ->
  console.log """
  Welcome to the Leisure REPL!

  Here are the commands:
  :d -- toggle diagnostics
  :s expr -- simplify an expression
  :{ -- start multiline input
  :} -- end multiline input
  :h -- print this message
  ! -- evaluate JavaScript expression (after the !)
  funcs -- list all known functions (this is really just a monad)
  (anything else) -- evaluate Leisure code

"""

oldFunctionCount = 0
leisureFunctions = null

updateCompleter = (rl)->
  if root.functionCount != oldFunctionCount
    oldFunctionCount = root.functionCount
    leisureFunctions = global.leisureFuncNames.toArray().concat (getValue('macroDefs')?.map((x)->x.head()).toArray() ? [])

tokenString = (t)-> t(lz (txt)->(pos)-> rz txt)
rl = null

leisureCompleter = (line)->
  if newCall
    tokens = lc(L_tokens, line, getValue 'tokenPat').toArray()
  else
    tokens = rz(L_tokens)(lz line)(lz getValue 'tokenPat').toArray()
  if tokens.length > 0
    origLast = tokenString(tokens[tokens.length - 1])
    last = origLast.toLowerCase()
    completions = _.filter(leisureFunctions, (el)->el.toLowerCase().indexOf(last) == 0)
    if completions.length == 1
      newLast = completions[0].substring 0, last.length
      rl.line = line.substring(0, line.length - last.length) + newLast
      [completions, newLast]
    else [_.filter(leisureFunctions, (el)->el.toLowerCase().indexOf(last) == 0), origLast]
  else [[], line]

interrupted = false

promptText = 'Leisure> '

prompt = ->
  updateCompleter()
  rl.setPrompt promptText
  rl.prompt()

show = (obj)-> if L_show? then rz(L_show)(lz obj) else String obj

repl = (config)->
  evalInput 'resetStdTokenPacks', (->)
  lines = null
  leisureDir = path.join config.home, '.leisure'
  historyFile = path.join(leisureDir, 'history')
  rl = readline.createInterface
    input: process.stdin
    output: process.stdout
    completer: leisureCompleter
  fs.exists historyFile, (exists)->
    ((cont)->
      if exists then readFile historyFile, (err, contents)->
        if !err then rl.history = contents.trim().split('\n').reverse()
        cont()
      else fs.exists leisureDir, (exists)->
        if exists then cont()
        else fs.mkdir leisureDir, (err)->
          if err
            console.log 'Could not create leisure dir!'
            process.exit 1
          cont()) ()->
      help()
      multiline = false
      prompt()
      root.defaultEnv.err = (err)->
        console.log "REPL Error: #{err.stack ? err}"
        multiline = false
        prompt()
      startMultiline = ->
        if multiline then console.log 'Already reading multiline input'
        else
          multiline = true
          lines = []
          rl.setPrompt '... '
      finishMultiline = (dumpInput)->
        multiline = false
        line = lines.join '\n'
        l = lines
        lines = []
        if dumpInput
          prompt()
        else
          try
            if line.substring(0,2) == ':s'
              if L_simplify?
                runMonad2 (rz(L_simplify) lz text), replEnv, (result)->
                  console.log "\n#{result}"
              else console.log 'No simplify function.  Load std.lsr'
            else if line.match /^!/ then console.log eval line.substring 1
            else
              evalInput line, (result)->
                console.log 'RESULT: ' + show(result)
                prompt()
              return
          catch err
            console.log "ERROR: #{err.stack}"
          prompt()
      rl.on 'line', (line)->
        interrupted = false
        if rl.history[0] == rl.history[1] then rl.history.shift()
        else if line.trim() then fs.appendFile historyFile, "#{line}\n", (->)
        switch line.trim()
          when ':d'
            diag = !diag
            console.log "Diag: #{if diag then 'on' else 'off'}"
          when ':{'
            startMultiline()
          when ':}'
            if ! multiline then console.log "Not reading multiline input."
            else
              finishMultiline()
          when ':h' then help()
          else
            if m = line.match /^:{(.*)$/
              startMultiline()
              if m[1] then lines.push m[1]
            else if multiline
              if !line then finishMultiline()
              else lines.push line
            else
              lines = [line]
              finishMultiline()
      rl.on 'close', ->
        #console.log "EXITING 1"
        process.exit 0
      rl.on 'SIGINT', ->
        if interrupted then process.exit()
        else if multiline then finishMultiline true
        else
          console.log "\n(^C again to quit)"
          interrupted = true

verbose = false
gennedAst = false
gennedJs = false
newOptions = true
action = null
outDir = null
recompiled = false
loadedParser = false
processedFiles = false
createAstFile = false
createJsFile = false

runFile = (file, cont)->
  try
    runMonad2 rz(L_protect)(lz rz(L_require)(lz file)), defaultEnv, (result)->
      cont []
  catch err
    console.log "ERROR LOADING FILE: #{file}...\n#{err.stack}"
    cont []

compile = (file, cont)->
  defaultEnv.errorHandlers?.push (e)-> process.exit 1
  ext = path.extname file
  runMonad2 rz(L_baseLoad)(lz file), defaultEnv, (result)->
    if verbose then console.log "Preparing to write code for #{file}"
    errors = []
    asts = _.map result.toArray(), (lineData)->
      if newCall
        result = lc lineData.tail(), (lz (x)->rz x), (lz (x)-> rz x)
      else
        result = lineData.tail()(lz (x)->rz x)(lz (x)-> rz x)
      if result instanceof Error
        result = replaceErr result, "Error compiling line: #{lines.head()}...\n#{ast.message}"
        errors.push[result]
      lineData.head()
    if errors.length
      for err in errors
        console.log err.stack
      return
    if createAstFile
      outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".ast"
      if outDir then outputFile = path.join(outDir, path.basename(outputFile))
      if verbose then console.log "AST FILE: #{outputFile}"
      writeFile outputFile, "[\n  #{_(asts).map((item)-> JSON.stringify ast2Json item).join ',\n  '}\n]", (err)->
        if err
          console.log "Error writing AST file: #{outputFile}"
          cont replaceErr err, "Error writing AST file: #{outputFile}...\n#{err.message}"
        else if !createJsFile then cont(asts)
    if createJsFile
      outputFileBase = (if ext == file then file else file.substring(0, file.length - ext.length))
      outputFile = outputFileBase + ".js"
      outputMap = outputFileBase + ".map"
      bareFile = outputFileBase.replace /^.*\/([^/]*$)/, '$1'
      bareJs = bareFile + ".js"
      bareLsr = bareFile + ".lsr"
      bareOutputMap = bareFile + ".map"
      if outDir
        outputFile = path.join(outDir, path.basename(outputFile))
        outputMap = path.join(outDir, path.basename(outputMap))
      if verbose then console.log "JS FILE: #{outputFile}"
      #console.log "FIRST AST: #{asts[0]}"
      try
        lastArgs = null
        result = withFile path.basename(bareLsr), null, -> (new SourceNode 1, 0, bareLsr, [
          #"module.exports = L_runMonads([\n  ",
          'define([], function(){\n  return L_runMonads([\n    ',
          intersperse(lastArgs = _.map(asts, (item)-> sourceNode item, 'function(){return ', (genMap item), '}'), ',\n    '),
          '\n  ]);\n});'
        ]).toStringWithSourceMap(file: path.basename(bareJs))
      catch err
        inspect = require?('util').inspect ? (x)-> x
        console.log "Error in source node,\nargs: #{inspect lastArgs, depth: 128}\nError: #{err.stack}"
        throw err
      #writeFile outputFile, "L_runMonads([\n  " + _(asts).map((item)-> "function(){return #{gen item}}").join(',\n  ') + "]);\n", (err)->
      if verbose then console.log "FILE: #{outputFile}, MAP: #{outputMap}"
      writeFile outputFile, result.code + "\n//# sourceMappingURL=#{path.basename bareOutputMap}\n", (err)->
        if !err
          writeFile outputMap, JSON.stringify(result.map, null, "  "), (err)->
            if !err then cont(asts)
            else
              console.log "Error writing map file: #{outputMap}"
              cont replaceErr err, "Error writing map file: #{outputMap}...\n#{err.message}"
        else
          console.log "Error writing JS file: #{outputFile}"
          cont replaceErr err, "Error writing JS file: #{outputFile}...\n#{err.message}"
    else cont []

intersperse = (array, element)->
  if array.length < 2 then array
  else
    result = [array[0]]
    for i in [1...array.length]
      result.push element, array[i]
    result

primCompile = (file, cont)->
  #if stage < 2 then root.shouldNsLog = false
  root.shouldNsLog = shouldNsLog
  {
    parseLine,
    compileFile,
  } = require stages[stage]
  ext = path.extname file
  readFile file, (err, contents)->
    if !err
      compiled = compileFile contents, file
      outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".js"
      if outDir then outputFile = path.join(outDir, path.basename(outputFile))
      if verbose then console.log "JS FILE: #{outputFile}"
      writeFile outputFile, compiled, (err)-> if !err then cont(compiled)
    else console.log "ERROR COMPILING: #{err}"

genJsFromAst = (file, cont)->
  readFile file, (err, contents)->
    if !err then genJs _(JSON.parse(contents)).map((json)-> json2Ast json), cont

usage = ->
  console.log """
  Usage repl [-v | -a | -0 | -1 | -c | -coffee | -j | -d DIR] [FILE ...]

  -v            verbose
  -a            only parse to AST
  -0            use CoffeeScript parser
  -1            use simple Leisure parser
  -2            use normal Leisure parser but don't load std
  -c            for -0, compile to JS using CoffeeScript compiler
                for -1, or normal case, create AST and JS file
  -r FILE       require JS FILE
  -d DIR        specify output directory for .ast and .js files
  -j            run JavaScript interactively after requiring Leisure files
  -coffee       run CoffeeScript interactively after requiring Leisure files

  With no FILE arguments, runs interactive REPL
  """
  process.exit 0

interactive = false

requireList = []

doRequirements = (cont)->
  if verbose then console.log "DO REQUIREMENTS.  loaded: #{loadedParser}"
  if std then requireList.unshift 'leisure/std'
  if !loadedParser
    #if stage < 2 then root.shouldNsLog = false
    root.shouldNsLog = shouldNsLog
    requirejs ['./leisure/' + stages[stage]], (promise)->
      loadedParser = true
      if stage == 1 then root.lockGen = false
      if promise instanceof Promise
        promise.then -> requireFiles requireList, cont, verbose
      else
        requireFiles requireList, cont, verbose
  else requireFiles requireList, cont, verbose

#loadRequirements = (req, cont)->
#  if req.length
#    if verbose then console.log "LOADING REQUIREMENT: #{req[0]}"
#    contStack = require req.shift()
#    if Array.isArray(contStack) && contStack.length then contStack.unshift ->
#      loadRequirements req, cont
#    else loadRequirements req, cont
#  else
#    cont()

processArg = (config, pos)->
  #console.log "Process args: #{pargs.join ', '}, pos: #{pos}"
  if pos >= pargs.length
    if processedFiles && !interactive
      #console.log "EXITING 2"
      process.exit 0
    else
      if verbose then console.log "STARTING REPL"
      #if !loadedParser
      #  #console.log "REQUIRING #{stages[stage]}"
      #  require stages[stage]
      doRequirements ->
        repl config
      return
  #console.log "Processing arg: #{pargs[pos]}"
  if pargs[pos][0] == '-' and !newOptions
    actions = []
    newOptions = true
    gennedAst = gennedJs = false
  switch pargs[pos]
    when '-p'
      promptText = pargs[pos + 1]
      pos++
    when '-x' then #ignore because processed above
    when '-v'
      verbose = true
      global.verbose.gen = true
      setWarnAsync true
    when '-a'
      action = compile
      createAstFile = true
    when '-c'
      if stage == 0
        action = primCompile
        loadedParser = true
      else
        #setMegaArity true
        action = compile
        createAstFile = createJsFile = true
    when '-d'
      outDir = pargs[pos + 1]
      pos++
    when '-0'
      stage = 0
      std = false
      root.lockGen = true
    when '-1'
      stage = 1
      std = false
      root.lockGen = true
    when '-2'
      std = false
    when '-i'
      interactive = true
    when '--nslog' then shouldNsLog = true
    when '-r'
      if verbose then console.log "PUSHING REQUIREMENT: #{pargs[pos + 1]}"
      requireList.push pargs[pos + 1]
      pos++
    else
      newOptions = true
      if pargs[pos] == '-coffee'
        processedFiles = true
        requireUtils()
        require('coffee-script/lib/coffee-script/repl').start useGlobal: true
        return
      if pargs[pos] == '-j'
        processedFiles = true
        requireUtils()
        doRequirements -> require('repl').start useGlobal: true
        return
      #console.log "Process #{pargs.join ', '}"
      if pargs[pos][0] == '-' then usage()
      else
        processedFiles = true
        #if !loadedParser
        #  #console.log "REQUIRING #{stages[stage]}"
        #  require stages[stage]
        #  if stage == 1 then root.lockGen = false
        #  for f in requireList
        #    require f
        doRequirements ->
          #console.log "PROCESSING #{pargs[pos]} with #{action}"
          action pargs[pos], -> processArg config, pos + 1
      return
  processArg config, pos + 1

requireUtils = ->
  global.Leisure = root
  global.Lazy = require '10-lazy'
  global.Org = require '11-org'

run = (args, config)->
  pargs = args
  action = runFile
  console.log "Run: #{args.join ', '}"
  if args.length == 2
    #if stage < 2 then root.shouldNsLog = false
    root.shouldNsLog = shouldNsLog
    #require baseLeisureDir + stages[stage]
    #requirejs ['./leisure/' + stages[stage]], (promise)->
    #  if promise instanceof Promise
    #    console.log 'GOT PROMISE IN RUN'
    #    promise.then -> repl config
    #  else
    #    console.log 'NO PROMISE IN RUN'
    #    repl config
    doRequirements -> repl config
  else processArg config, 2

root.runFile = runFile
root.run = run
root.nwrun = (line)-> run line.split(' '), home: process.env.HOME

if verbose then console.log "ARGS: #{JSON.stringify pargs}"

if process.versions['node-webkit']? then console.log "HELLO"
else
  prog = path.basename(process.argv[1])
  switch prog.toLowerCase()
    when 'repl' , 'runrepl' , 'leisure'
      if verbose then console.log "RUNNING REPL"
      run process.argv, home: process.env.HOME
    else
      #if stage < 2 then root.shouldNsLog = false
      root.shouldNsLog = shouldNsLog
      requirejs ['./leisure/' + stages[stage]], 
