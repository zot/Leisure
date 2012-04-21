if window? and (!global? or global == window)
  window.global = window
  window.ReplCore = root = {}
  Leisure = window.Leisure
  P = window.Pretty
  Prim = window.Prim
else root = exports ? this

if !Leisure? and require?
  Leisure = require('./leisure')
  P = require('./pretty')
  Prim = require('./prim')
  U = require('util')

compileFunc = ->

setCompiler = (c)-> compileFunc = c

writeFunc = ->

setWriter = (w)-> writeFunc = w

nextFunc = ->

setNext = (n)-> nextFunc = n

resetFunc = null

setResetFunc = (func)-> resetFunc = func

getType = Leisure.getType

handlerFunc = (ast, result, a, c, r, src)->
  if a then write "PREPARED: #{Leisure.prepare(src)}"
  if ast? and ast.err?
    write("ERROR: #{ast.err}\n")
    nextFunc()
  else
    if a
      write("PARSED: #{Leisure.astPrint(ast)}\n")
      write("FORMATTED: #{P.print ast}\n")
    if c then write("GEN: #{ast.src}\n")
    if r
      if !result?
        write("(No Result)\n")
        nextFunc()
      else
        write("#{getType result}: #{P.print(result)}\n")
        processResult result

setHandler = (f)-> handlerFunc = f

helpFunc = ->
  write("""
Type a Leisure expression or one of these commands and hit enter:

:h -- display this help
:c filename -- compile file
:r -- reset the Leisure environment
:v -- display variable values
:v var value -- set a variable
:q -- quit
! code -- eval JavaScript code in the leisure environment
!! code -- eval JavaScript code in the host environment

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
  if (getType result) == 'monad' then Prim.runMonad result, Prim.defaultEnv, -> nextFunc()
  else nextFunc()

handleVar = (name, value)->
  if !name
    for prop in (k for k of vars).sort()
      write("#{prop} = #{vars[prop][0]} -- #{vars[prop][1]}\n")
  else if !value and !vars[name] then write("No variable named #{name}\n")
  else if !value then write("#{name} = #{vars[name]} -- #{vars[prop][1]}\n")
  else vars[name][0] = !(value[0] in ['f', 'F'])

# rewrite in Leisure
processLine = (line)->
  try
    if line
      if line[0] == '!'
        if line[1] == '!'
          result = eval(line.substr(2))
          result = if U? then U.inspect(result) else result
          write(result, "\n")
        else
          result = Leisure.eval(line.substr(1))
          result = if U? then U.inspect(result) else result
          write(result, "\n")
      else if (m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/)) then handleVar(m[2], m[3])
      else if (m = line.match(/^:c\s*([^\s]*)$/)) then return compileFunc(m[1])
      else if (m = line.match(/^:r/)) then resetFunc()
      else switch line
        when ':h' then helpFunc()
        when ':q' then process.exit(0)
        else
          [a, c, r] = [vars.a[0], vars.c[0], vars.r[0]]
          [l, err1] = Leisure.prepare(line)
          [ast, err] = Leisure.compileNext(l, getGlobals(), false, false)
          if err1? or err?
            if ast? then ast.err = err1 ? err
            else ast = {err: err1 ? err}
          else [ast, result] = if r then Leisure.evalNext(l) else [ast, null]
          return handlerFunc(ast, result, a, c, r, line)
  catch err
    write(err.stack)
  nextFunc()

escape = (str)-> str.replace(/\n/g, '\\n')

generateCode = (file, contents, loud, handle, nomacros)->
  if loud then console.log("Compiling #{file}:\n")
  out = """
(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  #{if file? then file.replace(/\.lsr/, '') + ' = ' else ''}root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Leisure = require('./leisure');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

var setType = Leisure.setType;
var setDataType = Leisure.setDataType;
var define = Leisure.define;
var defineMacro = Leisure.defineMacro;
var defineToken = Leisure.defineToken;
var processResult = Repl.processResult;

"""
  [globals, errs] = findDefs contents, nomacros
  if err then throw new Error(err)
  defs = []
  [rest, err] = Leisure.prepare contents
  if err then throw new Error(err)
  varOut = ''
  for v, i in globals.toArray()
    if i > 0 then varOut += ","
    varOut += " #{Leisure.nameSub v}"
  if varOut then out += "\nvar#{varOut};\n"
  globals = Leisure.append(globals, getGlobals())
  while rest
    oldRest = rest
    [ast, err, rest] = Leisure.compileNext rest, globals, null, false, nomacros
    code = if rest then oldRest.substring(0, oldRest.length - rest.length) else ''
    err = err ? ast?.err
    if err
      errs = "#{errs}#{if ast?.leisureName then "Error in #{ast.leisureName}" else ""}#{err}\n"
      rest = ''
    else if ast
      globals = ast.globals
      m = code.match(Leisure.linePat)
      nm = ast.leisureName
      ast.src = """
//#{if nm? then nm + ' = ' else ''}#{escape(P.print(ast))}
#{if nm? then "root.defs.#{Leisure.nameSub(nm)} = #{Leisure.nameSub(nm)} = " else ""}#{ast.src}
"""
      src = if ast.leisureName
        defs.push Leisure.nameSub(ast.leisureName)
        ast.src
      else "processResult(#{ast.src})"
      out += "#{src};\n"
      [a, c, r] = [vars.a[0], vars.c[0], vars.r[0]]
      if handle then handlerFunc ast, null, a, c, r, code
  out += """

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)
"""
  if errs != '' then throw new Error("Errors compiling #{file}: #{errs}")
  out

getGlobals = -> Leisure.eval 'leisureGetFuncs()'

findDefs = (contents, nomacros)->
  errs = ''
  globals = Leisure.Nil
  rest = contents
  while rest
    oldRest = rest
    [ast, err, rest] = Leisure.compileNext rest, globals, true, null, nomacros
    if err then errs = "#{errs}#{if ast.leisureName then "Error in #{ast.leisureName}" else ""}#{err}\n"
    if ast?.leisureName
      if globals?.find((v)->v == ast.leisureName) then throw new Error("Attempt to redefine function: #{ast.leisureName}")
      globals = Leisure.cons(ast.leisureName, globals)
  [globals, errs]


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
root.setResetFunc = setResetFunc
root.findDefs = findDefs
