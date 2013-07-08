root = module.exports = require './base'
_ = require './lodash.min'
path = require 'path'

{
  setType,
  setDataType,
  ast2Json,
  json2Ast,
} = require './ast'
{gen} = require './gen'
{
  readFile,
  writeFile,
} = require './base'
{
  parseLine,
  compileFile,
} = require './simpleParseJS'
{
  identity,
  runMonad,
  defaultEnv,
} = require './runtime'

diag = false

readline = require('readline')

evalInput = (text)-> if text
  if diag then console.log "Eval: (#{gen monad L_parseLineM()(->text)})"
  result = eval "(#{gen monad L_parseLineM()(->text)})"
  if result.cmd then console.log monad result
  else console.log result

monad = (m)-> runMonad m, defaultEnv, (x)->x

help = ->
  console.log """
  Welcome to the Leisure REPL!

  Here are the commands:
  :d -- toggle diagnostics
  :{ -- start multiline input
  :} -- end multiline input
  :h -- print this message
  funcs -- list all known functions
  * -- evaluate Leisure code
  """

repl = ->
  help()
  lines = null
  rl = readline.createInterface process.stdin, process.stdout
  multiline = false
  rl.setPrompt 'Leisure> '
  rl.prompt()
  rl.on 'line', (line)->
    switch line.trim()
      when ':d'
        diag = !diag
        console.log "Diag: #{if diag then 'on' else 'off'}"
      when ':{'
        if multiline then console.log "Already reading multiline input"
        else
          multiline = true
          lines = []
          rl.setPrompt 'Leisure {> '
      when ':}'
        if ! multiline then console.log "Not reading multiline input."
        else
          evalInput lines.join '\n'
          lines = []
          rl.setPrompt 'Leisure> '
      when ':h' then help()
      else
        if multiline then lines.push line
        else evalInput line
    rl.prompt()
  rl.on 'close', -> process.exit 0

verbose = false
gennedAst = false
gennedJs = false
newOptions = true
action = null
outDir = null
recompileParser = false
processedFiles = false

genAst = (file, cont)->
  ext = path.extname file
  outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".ast"
  if outDir then outputFile = path.join(outDir, path.basename(outputFile))
  console.log "OUTPUT FILE: #{outputFile}"
  readFile file, (err, contents)->
    if !err
      asts = monad(L_parseFile()(-> contents)).toArray()
      writeFile outputFile, "[\n  #{_(asts).map((item)-> JSON.stringify ast2Json item).join ',\n  '}\n]", (err)-> if !err then cont(asts)

genJs = (file, asts, cont)->
  ext = path.extname file
  outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".js"
  if outDir then outputFile = path.join(outDir, path.basename(outputFile))
  writeFile outputFile, _(asts).map((ast)-> "runMonad(#{gen ast});").join '\n', (err)-> if !err then cont(asts)

genJsFromAst = (file, cont)->
  readFile file, (err, contents)->
    if !err then genJs _(JSON.parse(contents)).map((json)-> json2Ast json), cont

processArg = (pos)->
  console.log "Process Arg: #{process.argv.join ', '}, pos: #{pos}"
  if pos >= process.argv.length
    if processedFiles then process.exit 1
    else
      repl()
      return
  if process.argv[pos][0] == '-' and !newOptions
    actions = []
    newOptions = true
    gennedAst = gennedJs = false
  switch process.argv[pos]
    when '-v'
      verbose = true
    when '-a'
      action = genAst
      gennedAst = true
    when '-c'
      if !gennedAst then action = (file, cont)-> genAst file, (asts)-> genJs file, asts, cont
      else action = genJsFromAst
      gennedJs = gennedAst = true
    when '-d'
      outDir = process.argv[pos + 1]
      pos++
    when '-p'
      readFile 'core/simpleParse.lsr', (err, code)->
        js = compileFile code, "simpleParse.js"
        if err then throw new Error err
        else
          writeFile '/tmp/simpleParse.js', js, (err)->
            eval js
            if process.argv.length == 2 then repl()
            else processArg pos + 1
      return
    else
      newOptions = true
      console.log "Process #{process.argv.join ', '}"
      if process.argv[pos][0] == '-' then usage()
      else
        processedFiles = true
        action process.argv[pos], -> processArg pos + 1
      return
  processArg pos + 1

run = ->
  console.log "Run: #{process.argv.join ', '}"
  if process.argv.length == 2
    global.runMonad = runMonad
    global.setType = setType
    global.setDataType = setDataType
    require './simpleParse'
    repl()
  else processArg 2

run()
