root = module.exports = require './base'

{
  setType,
  setDataType,
} = require './ast'
{gen} = require './gen'
{
  readFile,
  writeFile,
} = require './base'
{
  parseLine,
  compileFile,
} = require './simpleParse'
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
  if result.cmd then monad result
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

runRepl = ->
  help()
  readFile 'core/simpleParse.lsr', (err, code)->
    js = compileFile code, "simpleParse.js"
    if err then throw new Error err
    else
      writeFile '/tmp/simpleParse.js', js, (err)->
        eval js
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

root.runRepl = runRepl
