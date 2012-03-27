U = require('util')
R = require('readline')
L = require('./lazp')
FS = require('fs')
Path = require('path')

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
  face.on 'line', (line)->processLine(face, line.trim())
  face.prompt()

help = ()->
  write("""
:v -- vars
:h -- help
:c file -- compile file
:q -- quit
!code -- eval JavaScript code

  """)

handleVar = (name, value)->
  if !name
    for prop in (k for k of vars).sort()
      write("#{prop} = #{vars[prop][0]} -- #{vars[prop][1]}\n")
  else if !value and !vars[name] then write("No variable named #{name}\n")
  else if !value then write("#{name} = #{vars[name]} -- #{vars[prop][1]}\n")
  else vars[name][0] = JSON.parse(value)

compile = (face, file)->
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
        return face?.promp()
    stream = FS.createReadStream(file)
    stream.on('data', (data)-> contents += data)
    stream.on('end', ()->
      generateCode(file, contents, face)
      face?.prompt())
    stream.on('error', (ex)->
      console.log("Exception reading file: ", ex.stack)
      face?.prompt())


generateCode = (file, contents, loud)->
  if loud then console.log("Compiling #{file}:\n")
  out = 'L = require("./lazp")\nsetId = L.setId\nsetType = L.setType\nsetDataType = L.setDataType\n'
  for line, i in contents.split('\n')
    if line
      ast = L.compileLine line
      ast.src = "//AST: #{L.astPrint(ast)}\n#{ast.src}"
      src = if ast.lazpName then ast.src else "console.log(String(#{ast.src}))"
      out += "#{src}\n"
  stream = FS.createWriteStream("#{Path.basename file, '.laz'}.js")
  stream.end(out, 'utf8')

getType = (value)-> (typeof value == 'function' and value.type) || typeof value

# rewrite in Lazp
processLine = (face, line)->
  try
    if line
      if line[0] == '!' then write(U.inspect(eval(line.substr(1))), "\n")
      else if (m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/)) then handleVar(m[2], m[3])
      else if (m = line.match(/^:c\s*([^\s]*)$/)) then return compile(face, m[1])
      else switch line
        when ':h' then help()
        when ':q' then process.exit(0)
        else
          [a, c, r] = [vars.a[0], vars.c[0], vars.r[0]]
          ast = L.compileLine(line)
          if a then write("PARSED: #{L.astPrint(ast)}\n")
          if c then write("GEN: #{ast.src}\n")
          if r
            [ast, result] = L.evalLine(line)
            if !result then write("(No Result)\n")
            else write("#{result} (#{getType result})\n")
  catch err
    console.log err
    console.log(err.stack)
  face.prompt()

root = exports ? this
root.print = print
root.repl = repl
root.compile = compile