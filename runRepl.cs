R = require('./repl')

if process.argv[2] == '-h'
  console.log("Usage: #{process.argv[0]} [[-c] file...]")
else if process.argv[2] == '-c'
  for i in [3...process.argv.length]
    R.compile null, process.argv[i]
else if process.argv.length > 2
  for i in [2...process.argv.length]
    R.compile null, process.argv[i]
    require("./#{process.argv[i]}")
else R.repl()
