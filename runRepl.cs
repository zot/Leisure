R = require('./repl')

if process.argv[2] == '-h'
  console.log("Usage: #{process.argv[0]} [[-c | -i] file...]")
else if process.argv[2] == '-c'
  for i in [3...process.argv.length]
    R.compile null, process.argv[i]
else if process.argv.length > 1
  start = 2
  if process.argv[2] == '-i'
    interactive = true
    start = 3
  for i in [start...process.argv.length]
    R.compile null, process.argv[i]
    require("./#{process.argv[i]}")
  if interactive then R.repl()
else R.repl()
