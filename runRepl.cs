R = require('./repl')

importFile = (file, cont) ->
  R.compile file, ->
    R.runInEnv "require('./#{file}')"
    cont()

loadStd = -> require('./std')
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
  else if process.argv[i] == '-b' then loadStd = ->
  else if process.argv[i] == '-c'
    action = (f, cont)->R.compile f, cont
    next = ->
  else if process.argv[i] == '-q' then R.quiet = true
  else break
  pos = i + 1


loadStd()

processArgs = (i)->
  if i < process.argv.length then action(process.argv[i], ->processArgs(i + 1))
  else next()

processArgs pos
