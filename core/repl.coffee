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
  identity,
  runMonad,
  defaultEnv,
} = require './runtime'

global.runMonad = runMonad
global.setType = setType
global.setDataType = setDataType
global.defaultEnv = defaultEnv
global.identity = identity

diag = false

readline = require('readline')

evalInput = (text)-> if text
  if diag then console.log "Eval: (#{gen monad L_parseLineM()(->text)})"
  result = eval "(#{gen monad L_parseLineM()(->text)})"
  if result.cmd then console.log monad result
  else console.log String(result)

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
        else
          try
            evalInput line
          catch err
            console.log "ERROR: #{err.stack}"
    rl.prompt()
  rl.on 'close', -> process.exit 0

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

compile = (file, cont)->
  ext = path.extname file
  readFile file, (err, contents)->
    if !err
      lines = monad L_linesForFile()(-> contents)
      names = monad L_namesForLines()(-> lines)
      asts = []
      for line in lines.toArray()
        asts.push monad L_runLine()(->names)(->line)
      if createAstFile
        outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".ast"
        if outDir then outputFile = path.join(outDir, path.basename(outputFile))
        if verbose then console.log "AST FILE: #{outputFile}"
        writeFile outputFile, "[\n  #{_(asts).map((item)-> JSON.stringify ast2Json item).join ',\n  '}\n]", (err)-> if !err then cont(asts)
      if createJsFile
        outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".js"
        if outDir then outputFile = path.join(outDir, path.basename(outputFile))
        if verbose then console.log "JS FILE: #{outputFile}"
        writeFile outputFile, _(asts).map((item)-> "runMonad(#{gen item})").join(';\n') + ";\n", (err)-> if !err then cont(asts)

primCompile = (file, cont)->
  {
    parseLine,
    compileFile,
  } = require './simpleParseJS'
  ext = path.extname file
  readFile file, (err, contents)->
    if !err
      compiled = compileFile contents, file
      outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".js"
      if outDir then outputFile = path.join(outDir, path.basename(outputFile))
      if verbose then console.log "JS FILE: #{outputFile}"
      writeFile outputFile, compiled, (err)-> if !err then cont(compiled)

#genAst = (file, cont)->
#  ext = path.extname file
#  outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".ast"
#  if outDir then outputFile = path.join(outDir, path.basename(outputFile))
#  console.log "OUTPUT FILE: #{outputFile}"
#  readFile file, (err, contents)->
#    if !err
#      asts = monad(L_parseFile()(-> contents)).toArray()
#      writeFile outputFile, "[\n  #{_(asts).map((item)-> JSON.stringify ast2Json item).join ',\n  '}\n]", (err)-> if !err then cont(asts)
#
#genJs = (file, asts, cont)->
#  ext = path.extname file
#  outputFile = (if ext == file then file else file.substring(0, file.length - ext.length)) + ".js"
#  if outDir then outputFile = path.join(outDir, path.basename(outputFile))
#  writeFile outputFile, _(asts).map((ast)-> "runMonad(#{gen ast});").join '\n', (err)-> if !err then cont(asts)

genJsFromAst = (file, cont)->
  readFile file, (err, contents)->
    if !err then genJs _(JSON.parse(contents)).map((json)-> json2Ast json), cont

processArg = (pos)->
  #console.log "Process Arg: #{process.argv.join ', '}, pos: #{pos}"
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
    #when '-a'
    #  action = genAst
    #  gennedAst = true
    #when '-c'
    #  if !gennedAst then action = (file, cont)-> genAst file, (asts)-> genJs file, asts, cont
    #  else action = genJsFromAst
    #  gennedJs = gennedAst = true
    when '-a'
      action = compile
      createAstFile = true
    when '-c'
      action = compile
      createAstFile = createJsFile = true
    when '-d'
      outDir = process.argv[pos + 1]
      pos++
    when '-p'
      action = primCompile
      loadedParser = true
      #readFile 'core/simpleParse.lsr', (err, code)->
      #  recompiled = true
      #  js = compileFile code, "simpleParse.js"
      #  if err then throw new Error err
      #  else
      #    writeFile '/tmp/simpleParse.js', js, (err)->
      #      eval js
      #      loadedParser = true
      #      if process.argv.length == 2 then repl()
      #      else processArg pos + 1
      #return
    when '-v' then verbose = true
    else
      newOptions = true
      #console.log "Process #{process.argv.join ', '}"
      if process.argv[pos][0] == '-' then usage()
      else
        processedFiles = true
        if !loadedParser then require './simpleParse'
        action process.argv[pos], -> processArg pos + 1
      return
  processArg pos + 1

run = ->
  #console.log "Run: #{process.argv.join ', '}"
  if process.argv.length == 2
    require './simpleParse'
    repl()
  else processArg 2

run()
