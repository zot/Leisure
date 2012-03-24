U = require('util')
R = require('readline')
L = require('./lazp')

print = (args...)->
  process.stdout.write(U.format.apply(null, args))

repl = () ->
  print("Welcome to Lazp!\n")
  help(process.stdout)
  runRepl(R.createInterface(process.stdin, process.stdout))

help = (out)->
  out.write("""
:v -- vars
:h -- help
:q -- quit

  """)

runRepl = (face)->
  face.question('Lazp> ', (line)-> processLine(face, line))

# rewrite in Lazp
processLine = (face, line)->
  try
    switch line
      when ':q'
        process.exit(0)
      when ':h'
        help(face)
      else
        p = L.parse(line)
        face.write("PARSED: " + L.astPrint(p) + "\n")
        g = L.gen(p)
        face.write("GEN: " + g[0] + "\n")
        r = g[1] g[0]
        face.write("RESULT: " + r + " (" + (typeof r) + ")\n")
  catch err
  finally
    runRepl(face)

root = exports ? this
root.print = print
root.repl = repl
