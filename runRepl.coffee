LZ = require('./leisure')
R = require('./repl')
RC = require('./replCore')
Prim = require('./prim')

U=require('util')
LZ.ctx.console = console
LZ.ctx.U = U

debug = false

interactiveMode = 'unknown'

importFile = (file, cont) ->
  if file.match /\.lsr$|\.lmd$/ then file = file.substring 0, file.length - 4
  R.compile file, (->
    LZ.eval "req('./#{file}')"
    cont()), nomacros, debug

#standard = ['prelude', 'std', 'parsing', 'pattern']
standard = ['prelude', 'std', 'parsing']

loadStandardLimit = standard.length

loadStd = (std)-> if std.length then Prim.runRequire "./#{standard[std[0]]}", -> loadStd std[1..]

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

-b n -- bootstrap; only load up to standard file N
-m -- bootstrap; do not expand macros
-r file -- require JS file
-c -- compile arguments only
-g -- generate debug code
-q -- quiet
    """)
  else if process.argv[i] == '-b'
    loadStandardLimit = process.argv[i + 1]
    RC.setIncludeStd(false)
    eaten = 1
  else if process.argv[i] == '-c'
    if interactiveMode == 'unknown'
      interactiveMode = 'off'
      next = -> process.exit(0)
  else if process.argv[i] == '-q' then R.loud = 0
  else if process.argv[i] == '-v' then R.loud++
  else if process.argv[i] == '-i'
    interactiveMode = 'on'
    next = R.repl
  else if process.argv[i] == '-g'
    debug = true
    Prim.defaultEnv.debug = true
  else if process.argv[i] == '-r'
    require "./#{process.argv[i + 1]}"
    eaten = 1
  else break
  pos = i + 1


loadStd [0...loadStandardLimit]

processArgs = (i)->
  if eaten then eaten--
  else if process.argv[i] == '-r'
    require "./#{process.argv[i + 1]}"
    eaten = 1
  else if i < process.argv.length then action(process.argv[i], ->processArgs(i + 1))
  else next()

processArgs pos
