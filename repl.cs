U = require('util')
R = require('readline')
L = require('./lazp')
Core = require('./replCore')
FS = require('fs')
Path = require('path')

#require('./std')
#console.log("cons: #{`_cons`}")

root = exports ? this
root.quiet = false

vars = {
  c: [false, 'show generated code'],
  a: [false, 'show parsed AST'],
  r: [true, 'show evaluation result'],
}

print = (args...)->
  process.stdout.write(U.format.apply(null, args))

write = (args...)-> process.stdout.write args.join('')

repl = () ->
  print("Welcome to Lazp!\n")
  help()
  face = R.createInterface(process.stdin, process.stdout)
  face.setPrompt "Lazp> "
  face.on 'close', ()->process.exit(0)
  face.on 'line', (line)->Core.processLine(line.trim())
  Core.setNext -> face.prompt()
  face.prompt()

help = ()->
  write("""
:v -- vars
:h -- help
:c file -- compile file
:q -- quit
!code -- eval JavaScript code

  """)

compile = (file)->
  if !file
    console.log("No file to compile")
    face?.prompt()
  else
    contents = ''
    if !Path.existsSync(file)
      oldfile = file
      file = file + ".laz"
      if !Path.existsSync(file)
        console.log("No file: #{oldfile}")
        return Core.next()
    stream = FS.createReadStream(file)
    stream.on('data', (data)-> contents += data)
    stream.on('end', ()->
      generateCode(file, contents, !root.quiet)
      Core.next())
    stream.on('error', (ex)->
      console.log("Exception reading file: ", ex.stack)
      Core.next())


generateCode = (file, contents, loud)->
  if loud then console.log("Compiling #{file}:\n")
  out = 'L = require("./lazp")\nsetId = L.setId\nsetType = L.setType\nsetDataType = L.setDataType\ndefine = L.define\n'
  for line, i in contents.split('\n')
    if line
      ast = L.compileLine line
      if ast
        ast.src = "//AST: #{L.astPrint(ast)}\n#{ast.src}"
        src = if ast.lazpName then ast.src else "console.log(String(#{ast.src}))"
        out += "#{src}\n"
  stream = FS.createWriteStream("#{Path.basename file, '.laz'}.js")
  stream.end(out, 'utf8')

Core.setHelp help
Core.setCompiler compile
Core.setWriter (str)-> process.stdout.write(str)

root.print = print
root.repl = repl
root.compile = compile