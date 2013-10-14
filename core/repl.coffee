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
Error.stackTraceLimit = Infinity
#Error.stackTraceLimit = 50
{
  resolve,
  lazy,
} = root = module.exports = require './base'
rz = resolve
lz = lazy
_ = require './lodash.min'
path = require 'path'
fs = require 'fs'

{
  getType,
  setType,
  setDataType,
  ast2Json,
  json2Ast,
  Nil,
} = require './ast'
{
  gen,
  genMap,
  genSource,
  withFile,
  sourceNode,
} = require './gen'
{
  SourceNode,
} = require 'source-map'
{
  readFile,
  writeFile,
} = require './node'
{
  identity,
  runMonad,
  newRunMonad,
  isMonad,
  asyncMonad,
  defaultEnv,
  replaceErr,
  getMonadSyncMode,
  setWarnAsync,
} = require './runtime'

global.runMonad = runMonad
global.setType = setType
global.setDataType = setDataType
global.defaultEnv = defaultEnv
global.identity = identity
global.Leisure = root

# compilation stage
# 0: use CoffeeScript Leisure compiler
# 1: use only SimpleParse.lsr
# 2: use generatedPrelude.lsr
#
stage = 2
stages = ['./simpleParseJS', './simpleParse', './generatedPrelude']

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
replEnv.__proto__ = defaultEnv

getParseErr = (x)-> x lz (value)->rz value

evalInput = (text, cont)->
  if text
    try
      result = rz(L_newParseLine)(0)(lz Nil)(lz text)
      runMonad result, replEnv, (ast)->
        try
          if getType(ast) == 'parseErr'
            cont "PARSE ERORR: #{getParseErr ast}"
          else
            if diag
              if L_simplify? then console.log "\nSIMPLIFIED: #{runMonad rz(L_simplify) lz text}"
              console.log "\nAST: #{ast}"
              console.log "\nCODE: (#{gen ast})"
            result = eval "#{genSource text, ast}"
            if isMonad result then console.log "(processing IO monad)"
            runMonad result, replEnv, cont
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
    leisureFunctions = global.leisureFuncNames.toArray()

tokenString = (t)-> t(lz (txt)->(pos)-> rz txt)
rl = null

leisureCompleter = (line)->
  tokens = rz(L_tokens)(lz line)(lz root.getValue 'tokenPat').toArray()
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

show = (obj)-> if L_show? then rz(L_show)(lz obj) else console.log obj

repl = (config)->
  lines = null
  leisureDir = path.join config.home, '.leisure'
  historyFile = path.join(leisureDir, 'history')
  rl = readline.createInterface process.stdin, process.stdout, leisureCompleter
  fs.exists historyFile, (exists)->
    ((cont)->
      if exists then readFile historyFile, (err, contents)->
        if !err then rl.history = contents.trim().split('\n').reverse()
        cont()
      else fs.exists leisureDir, (exists)->
        if exists then cont()
        else fs.mkdir leisureDir, (err)->
          if err
            console.log "Could not create leisure dir!"
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
        if multiline then console.log "Already reading multiline input"
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
              if L_simplify? then console.log "\n#{show runMonad rz(L_simplify) lz line.substring(2)}\n"
              else console.log "No simplify function.  Load std.lsr"
            else if line.match /^!/ then console.log eval line.substring 1
            else
              evalInput line, (result)->
                console.log "RESULT: " + show(result)
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
    runMonad rz(L_protect)(lz rz(L_require)(lz file)), defaultEnv, (result)->
      cont []
  catch err
    console.log "ERROR LOADING FILE: #{file}...\n#{err.stack}"
    cont []

compile = (file, cont)->
  ext = path.extname file
  runMonad rz(L_baseLoad)(lz file), defaultEnv, (result)->
    if verbose then console.log "Preparing to write code for #{file}"
    errors = []
    asts = _.map result.toArray(), (lineData)->
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
      result = withFile path.basename(bareLsr), null, -> (new SourceNode 1, 0, bareLsr, [
        "module.exports = L_runMonads([\n  ",
        intersperse(_(asts).map((item)-> sourceNode item, "function(){return ", (genMap item), "}"), ',\n '),
        "]);\n"
      ]).toStringWithSourceMap(file: path.basename(bareJs))
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
    for i in array
      result.push element, i
    result

primCompile = (file, cont)->
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

genJsFromAst = (file, cont)->
  readFile file, (err, contents)->
    if !err then genJs _(JSON.parse(contents)).map((json)-> json2Ast json), cont

usage = ->
  console.log """
  Usage repl [-v | -a | -0 | -1 | -c | -d DIR] [FILE ...]

  -v            verbose
  -a            only parse to AST
  -0            use CoffeeScript parser
  -1            use simple Leisure parser
  -c            for -0, compile to JS using CoffeeScript compiler
                for -1, or normal case, create AST and JS file
  -r FILE       require JS FILE
  -d DIR        specify output directory for .ast and .js files

  Without no FILE arguments, runs interactive REPL
  """
  process.exit 0

interactive = false

requireList = []

doRequirements = (cont)->
  if verbose then console.log "DO REQUIREMENTS.  loaded: #{loadedParser}"
  if !loadedParser
    #console.log "REQUIRING #{stages[stage]}"
    require stages[stage]
    loadedParser = true
    if stage == 1 then root.lockGen = false
  loadRequirements requireList, cont

loadRequirements = (req, cont)->
  if req.length
    if verbose then console.log "LOADING REQUIREMENT: #{req[0]}"
    contStack = require req.shift()
    if Array.isArray(contStack) && contStack.length then contStack.unshift ->
      loadRequirements req, cont
    else loadRequirements req, cont
  else
    cont()

processArg = (config, pos)->
  #console.log "Process args: #{process.argv.join ', '}, pos: #{pos}"
  if pos >= process.argv.length
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
  #console.log "Processing arg: #{process.argv[pos]}"
  if process.argv[pos][0] == '-' and !newOptions
    actions = []
    newOptions = true
    gennedAst = gennedJs = false
  switch process.argv[pos]
    when '-p'
      promptText = process.argv[pos + 1]
      pos++
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
        action = compile
        createAstFile = createJsFile = true
    when '-d'
      outDir = process.argv[pos + 1]
      pos++
    when '-0'
      stage = 0
      root.lockGen = true
    when '-1'
      stage = 1
      root.lockGen = true
    when '-i'
      interactive = true
    when '-r'
      if verbose then console.log "PUSHING REQUIREMENT: #{process.argv[pos + 1]}"
      requireList.push process.argv[pos + 1]
      pos++
    else
      newOptions = true
      #console.log "Process #{process.argv.join ', '}"
      if process.argv[pos][0] == '-' then usage()
      else
        processedFiles = true
        #if !loadedParser
        #  #console.log "REQUIRING #{stages[stage]}"
        #  require stages[stage]
        #  if stage == 1 then root.lockGen = false
        #  for f in requireList
        #    require f
        doRequirements ->
          #console.log "PROCESSING #{process.argv[pos]} with #{action}"
          action process.argv[pos], -> processArg config, pos + 1
      return
  processArg config, pos + 1

run = (args, config)->
  action = runFile
  #console.log "Run: #{args.join ', '}"
  if args.length == 2
    require stages[stage]
    repl config
  else processArg config, 2

root.runFile = runFile

if verbose then console.log "ARGS: #{JSON.stringify process.argv}"

prog = path.basename(process.argv[1])

if prog == 'repl' || prog == 'leisure'
  if verbose then console.log "RUNNING REPL"
  run process.argv,
    home: process.env.HOME
else require stages[stage]
