LZ = require('./leisure')
R = require('./repl')

importFile = (file, cont) ->
  R.compile file, (->
    LZ.eval "req('./#{file}')"
    cont()), nomacros

loadStd = -> LZ.eval "Leisure.req('./std')"

nomacros = false
action = importFile
next = R.repl

pos = 2
for i in [2...process.argv.length]
  if process.argv[i] == '-h'
    console.log("""
Usage: #{process.argv[0]} [[-c | -q | -b] file...]

-b -- bootstrap; don't load std functions
-c -- compile arguments only
-q -- quiet
    """)
  else if process.argv[i] == '-b'
    loadStd = ->
    nomacros = true
  else if process.argv[i] == '-c'
    action = (f, cont)->R.compile f, cont, nomacros
    next = ->
  else if process.argv[i] == '-q' then R.loud = 0
  else if process.argv[i] == '-v' then R.loud++
  else break
  pos = i + 1


loadStd()

processArgs = (i)->
  if i < process.argv.length then action(process.argv[i], ->processArgs(i + 1))
  else next()

processArgs pos
