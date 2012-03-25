U = require('util')
R = require('readline')
L = require('./lazp')
FS = require('fs')
Path = require('path')

vars = {
  c: [true, 'show generated code'],
  a: [true, 'show parsed AST'],
  r: [true, 'show evaluation result'],
}

print = (args...)->
  process.stdout.write(U.format.apply(null, args))

write = (args...)->
  process.stdout.write args.join('')

repl = () ->
  print("Welcome to Lazp!\n")
  help()
  runRepl(R.createInterface(process.stdin, process.stdout))

help = ()->
  write("""
:v -- vars
:h -- help
:c file -- compile file
:q -- quit
!code -- eval JavaScript code

  """)

runRepl = (face)->
  face.question('Lazp> ', (line)-> processLine(face, line))

handleVar = (name, value)->
  if !name
    for prop in (k for k of vars).sort()
      write("#{prop} = #{vars[prop][0]} -- #{vars[prop][1]}\n")
  else if !value and !vars[name] then write("No variable named #{name}")
  else if !value then write("#{name} = #{vars[name]} -- #{vars[prop][1]}")
  else vars[name][0] = JSON.parse(value)

compile = (face, file)->
  if !file
    console.log("No file to compile")
    runRepl(face)
  else
    contents = ''
    if !Path.existsSync(file)
      oldfile = file
      file = file + ".laz"
      if !Path.existsSync(file)
        console.log("No file: #{oldfile}")
        return runRepl(face)
    stream = FS.createReadStream(file)
    stream.on('data', (data)-> contents += data)
    stream.on('end', ()->
#     stream.destroy()
      generateCode(file, contents)
      runRepl(face))
    stream.on('error', (ex)->
      console.log("Exception reading file: ", ex.stack)
      runRepl(face))


generateCode = (file, contents)->
  console.log("Compiling #{file}:\n")
  console.log("#{i + 1}: #{line}") for line, i in contents.split('\n')

# rewrite in Lazp
processLine = (face, line)->
  try
    if line
      if line[0] == '!' then write(U.inspect(eval(line.substr(1))))
      else if (m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/)) then handleVar(m[2], m[3])
      else if (m = line.match(/^:c\s*([^\s]*)$/)) then return compile(face, m[1])
      else switch line
        when ':h' then help()
        when ':q' then process.exit(0)
        else
          [a, c, r] = [vars.a[0], vars.c[0], vars.r[0]]
          if r
            [ast, code, result] = L.evalLine(line)
            if !result then write("No Result")
            else
              if a then write("PARSED: " + L.astPrint(ast) + "\n")
              if c then write("GEN: " + code + "\n")
              write("RESULT: " + result + " (" + (typeof result) + ")\n")
          else if a or c
            ast = L.parse(line)
            if a then write("PARSED: " + L.astPrint(ast) + "\n")
            if c then write("GEN: " + L.gen(ast)[0] + "\n")
  catch err
    console.log(err.stack)
  runRepl(face)

root = exports ? this
root.print = print
root.repl = repl
