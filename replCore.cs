if window? and (!global? or global == window)
  window.global = window
  window.ReplCore = root = {}
  Lazp = window.Lazp
  P = window.Pretty
else root = exports ? this

if !Lazp? and require?
  Lazp = require('./lazp')
  P = require('./pretty')
  U = require('util')

compileFunc = ->

setCompiler = (c)-> compileFunc = c

writeFunc = ->

setWriter = (w)-> writeFunc = w

nextFunc = ->

setNext = (n)-> nextFunc = n

getType = Lazp.getType

handlerFunc = (ast, result, a, c, r)->
  if a then write("PARSED: #{Lazp.astPrint(ast)}\n")
  if c then write("GEN: #{ast.src}\n")
  if r
    if !result then write("(No Result)\n")
    else
      write("#{getType result}: #{P.print(result)}\n")
      processResult result

setHandler = (f)-> handlerFunc = f

helpFunc = ->
  write("""
Type a Lazp expression or one of these commands and hit enter:

:h -- display this help
:v -- display variable values
:v var value -- set a variable
:q -- quit
!code -- eval JavaScript code

  """)

setHelp = (h)-> helpFunc = h

vars = {
  c: [false, 'show generated code'],
  a: [false, 'show parsed AST'],
  r: [true, 'show evaluation result'],
}

print = (args...)-> writeFunc(U.format.apply(null, args))

write = (args...)-> writeFunc args.join('')

processResult = (result)->
  if (getType result) == 'monad'
    result.cmd (value) -> if result.binding? then processResult(result.binding(-> value))
    else nextFunc()
  else nextFunc()

handleVar = (name, value)->
  if !name
    for prop in (k for k of vars).sort()
      write("#{prop} = #{vars[prop][0]} -- #{vars[prop][1]}\n")
  else if !value and !vars[name] then write("No variable named #{name}\n")
  else if !value then write("#{name} = #{vars[name]} -- #{vars[prop][1]}\n")
  else vars[name][0] = JSON.parse(value)

# rewrite in Lazp
processLine = (line)->
  try
    if line
      if line[0] == '!' then write(U.inspect(eval(line.substr(1))), "\n")
      else if (m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/)) then handleVar(m[2], m[3])
      else if (m = line.match(/^:c\s*([^\s]*)$/)) then return compileFunc(m[1])
      else switch line
        when ':h' then helpFunc()
        when ':q' then process.exit(0)
        else
          [a, c, r] = [vars.a[0], vars.c[0], vars.r[0]]
          [ast, err] = Lazp.compileNext(line)
          if r then ([ast, result] = if err then [null, err] else Lazp.evalLine(line))
          else result = null
          return handlerFunc(ast, result, a, c, r)
  catch err
    write(err.stack)
  nextFunc()

generateCode = (file, contents, loud)->
  if loud then console.log("Compiling #{file}:\n")
  out = """
if (typeof require !== "undefined" && require !== null) {
  Lazp = require("./lazp")
  require('./prim');
  ReplCore = require("./replCore");
  Repl = require('./repl');
}
setId = Lazp.setId;
setType = Lazp.setType;
setDataType = Lazp.setDataType;
define = Lazp.define;
defineToken = Lazp.defineToken;
processResult = Repl.processResult;

"""
  errs = ''
  globals = Lazp.Nil
  rest = contents
  while rest
    oldRest = rest
    [ast, err, rest] = Lazp.compileNext rest, globals
    if ast
      code = oldRest.substring(0, oldRest.length - rest.length)
      globals = ast.globals
      if ast.err? then errs = "#{errs}#{ast.err}\n"
      m = code.match(Lazp.linePat)
      nm = m and m[2].trim().split(/\s+/)[0]
      ast.src = "//#{if nm then nm + ' = ' else ''}#{Lazp.astPrint(ast)}\n#{ast.src}"
      src = if ast.lazpName then ast.src else "processResult(#{ast.src})"
      out += "#{src};\n"
    else if err
      errs = "#{errs}#{err}\n"
      rest = ''
  if errs != '' then throw new Error("Errors compiling #{file}: #{errs}")
  out

root.processLine = processLine
root.setCompiler = setCompiler
root.setHelp = setHelp
root.setWriter = setWriter
root.setNext = setNext
root.setHandler = setHandler
root.next = -> nextFunc()
root.help = -> helpFunc()
root.getType = getType
root.generateCode = generateCode
root.processResult = processResult