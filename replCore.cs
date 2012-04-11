if window? and (!global? or global == window)
  window.global = window
  window.ReplCore = root = {}
  Lazp = window.Lazp
  P = window.Pretty
  Prim = window.Prim
else root = exports ? this

if !Lazp? and require?
  Lazp = require('./lazp')
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

getType = Lazp.getType

handlerFunc = (ast, result, a, c, r, src)->
  if ast? and ast.err?
    write("ERROR: #{ast.err}\n")
    nextFunc()
  else
    if a
      write("PARSED: #{Lazp.astPrint(ast)}\n")
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
Type a Lazp expression or one of these commands and hit enter:

:h -- display this help
:c filename -- compile file
:r -- reset the Lazp environment
:v -- display variable values
:v var value -- set a variable
:q -- quit
! code -- eval JavaScript code in the lazp environment
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
  if (getType result) == 'monad' then Prim.runMonad result, -> nextFunc()
  else nextFunc()

handleVar = (name, value)->
  if !name
    for prop in (k for k of vars).sort()
      write("#{prop} = #{vars[prop][0]} -- #{vars[prop][1]}\n")
  else if !value and !vars[name] then write("No variable named #{name}\n")
  else if !value then write("#{name} = #{vars[name]} -- #{vars[prop][1]}\n")
  else vars[name][0] = !(value[0] in ['f', 'F'])

# rewrite in Lazp
processLine = (line)->
  try
    if line
      if line[0] == '!'
        if line[1] == '!'
          result = eval(line.substr(2))
          result = if U? then U.inspect(result) else result
          write(result, "\n")
        else
          result = Lazp.eval(line.substr(1))
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
          [ast, err] = Lazp.compileNext(line, getGlobals(), false, true)
          if err?
            if ast? then ast.err = err
            else ast = {err: err}
          else [ast, result] = if r then Lazp.evalNext(line) else [ast, null]
          return handlerFunc(ast, result, a, c, r, line)
  catch err
    write(err.stack)
  nextFunc()

escape = (str)-> str.replace(/\n/g, '\\n')

generateCode = (file, contents, loud, handle)->
  if loud then console.log("Compiling #{file}:\n")
  out = """
(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Lazp = require('./lazp');
  Lazp.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];

var setType = Lazp.setType;
var setDataType = Lazp.setDataType;
var define = Lazp.define;
var defineToken = Lazp.defineToken;
var processResult = Repl.processResult;

"""
  errs = ''
  globals = findDefs file, contents
  defs = []
  rest = contents
  while rest
    oldRest = rest
    [ast, err, rest] = Lazp.compileNext rest, globals
    code = if rest then oldRest.substring(0, oldRest.length - rest.length) else ''
    if ast
      globals = ast.globals
      if ast.err? then errs = "#{errs}#{ast.err}\n"
      m = code.match(Lazp.linePat)
      nm = if m and m[3] then m[2].trim().split(/\s+/)[0] else null
      #if !nm? then console.log("\n@@@ DEF @@@: #{code}\n")
      ast.src = """
//#{if nm? then nm + ' = ' else ''}#{escape(Lazp.astPrint(ast))}
#{if nm? then "root.defs.#{Lazp.nameSub(nm)} = " else ""}#{ast.src}
"""
      src = if ast.lazpName
        defs.push Lazp.nameSub(ast.lazpName)
        ast.src
      else "processResult(#{ast.src})"
      out += "#{src};\n"
      [a, c, r] = [vars.a[0], vars.c[0], vars.r[0]]
      if handle then handlerFunc ast, null, a, c, r, code
    else if err
      errs = "#{errs}#{err}\n"
      rest = ''
  out += """

return root;
}).call(this)
"""
  if errs != '' then throw new Error("Errors compiling #{file}: #{errs}")
  out

#getGlobals = -> Lazp.ctx.ll
getGlobals = -> Lazp.eval 'lazpGetFuncs()'

findDefs = (file, contents)->
  errs = ''
  globals = getGlobals()
  rest = contents
  while rest
    oldRest = rest
    [ast, err, rest] = Lazp.compileNext rest, globals, true
    if ast?.lazpName
      if (globals ? Lazp.Nil).find((v)->v == ast.lazpName) then throw new Error("Attempt to redefine function: #{ast.lazpName}")
      globals = Lazp.cons(ast.lazpName, globals)
  if errs != '' then throw new Error("Errors compiling #{file}: #{errs}")
  globals


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
