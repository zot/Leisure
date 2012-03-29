R = require('./repl')

importFile = (file) ->
  R.compile file
  console.log("require('./#{file}')")
  require("./#{file}")

loadStd = -> require('./std')
action = importFile
next = R.repl

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
    action = R.compile
    next = ->
  else if process.argv[i] == '-q' then R.quiet = true
  else break
  pos = i + 1


loadStd()

for i in [pos...process.argv.length]
  action(process.argv[i])

next()