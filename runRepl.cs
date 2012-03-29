R = require('./repl')

importFile = (file) ->
  R.compile file
  console.log("require('./#{file}')")
  require("./#{file}")

action = importFile
next = R.repl

for i in [2...process.argv.length]
  pos = i
  if process.argv[i] == '-h'
    console.log("Usage: #{process.argv[0]} [[-c | -i] file...]")
  else if process.argv[i] == '-c'
    action = R.compile
    next = ->
  else if process.argv[i] == '-q' then R.quiet = true
  else break


for i in [pos...process.argv.length]
  action(process.argv[i])

next()