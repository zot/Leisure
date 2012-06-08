LZ = require('./leisure')
R = require('./repl')

U=require('util')
LZ.ctx.console = console
LZ.ctx.U = U

debug = false

importFile = (file, cont) ->
  if file.match /.lsr$/ then file = file.substring 0, file.length - 4
  R.compile file, (->
    LZ.eval "req('./#{file}')"
    cont()), nomacros, debug

loadStd = -> LZ.eval "Leisure.req('./std')"
#loadStd = -> LZ.eval "Leisure.processDefs(require('./std'))"

nomacros = false
action = importFile
next = R.repl

pos = 2
eaten = 0
for i in [2...process.argv.length]
  if eaten then eaten--
  else if process.argv[i] == '-h'
    console.log("""
Usage: #{process.argv[0]} [[-r file]... [-c | -q | -b] file...]

-b -- bootstrap; don't load std functions
-r file -- require JS file
-c -- compile arguments only
-g -- generate debug code
-q -- quiet
    """)
  else if process.argv[i] == '-b'
    loadStd = ->
    nomacros = true
  else if process.argv[i] == '-c' then next = ->
  else if process.argv[i] == '-q' then R.loud = 0
  else if process.argv[i] == '-v' then R.loud++
  else if process.argv[i] == '-g' then debug = true
  else if process.argv[i] == '-r'
    require "./#{process.argv[i + 1]}"
    eaten = 1
  else break
  pos = i + 1


loadStd()

processArgs = (i)->
  if eaten then eaten--
  else if process.argv[i] == '-r'
    require "./#{process.argv[i + 1]}"
    eaten = 1
  else if i < process.argv.length then action(process.argv[i], ->processArgs(i + 1))
  else next()

processArgs pos
