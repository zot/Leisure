if window? and (!global? or global == window)
  window.global = window
  window.ReplCore = root = {}
  Parse = window.Parse
  Leisure = window.Leisure
  Prim = window.Prim
else root = exports ? this

if !Leisure? and require?
  Parse = require('./parse')
  Leisure = require('./leisure')
  Prim = require('./prim')
  U = require('util')

includeStd = true

setIncludeStd = (flag)-> includeStd = flag

throwError = Parse.throwError

compileFunc = ->

setCompiler = (c)-> compileFunc = c

nextFunc = ->

setNext = (n)-> nextFunc = n

resetFunc = null

setResetFunc = (func)-> resetFunc = func

getType = Parse.getType

formatContexts = (stack)->
  for [funcName, offset] in stack.toArray()
    console.log "FUNCNAME: #{funcName}, OFFSET: #{offset}"
    [src, start, end] = Leisure.funcContextSource funcName, offset
    "#{funcName}:#{start},#{end}: #{Leisure.indent "#{src.substring(0, start)} << #{src.substring(start, end)} >> #{src.substring(end)}", 4}"

errString = (err)->
  if err instanceof Error
    "#{if err.leisureContext? then "\n#{err}:\n  #{formatContexts(err.leisureContext).join('\n  ')}\n\n" else ''}#{err.stack}"
  else err

handlerFunc = (ast, result, a, c, r, src, env, next)->
  env = env ? Prim.defaultEnv
  if ast?.err?
    env.write errString ast.err
    next?()
  else
    if a
      # env.write("PARSED: #{Leisure.astPrint(ast)}\n")
      env.write("FORMATTED: #{Parse.print ast}\n")
    if c then env.write("GEN: #{ast.src}\n")
    if r
      if !result?
        env.write("(No Result)\n")
        next?()
      else
        global.$0 = result
        env.write("#{getType result}: #{Parse.print(result)}\n")
        processResult result, env, next

setHandler = (f)-> handlerFunc = f

helpFunc = (env)->
  (env ? Prim.defaultEnv).write("""
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

processResult = (result, env, next)->
  next = next ? nextFunc
  if (getType result) == 'monad' then Prim.runMonad result, (env ? Prim.defaultEnv), -> next()
  else next()

handleVar = (name, value, env)->
  if !name
    for prop in (k for k of vars).sort()
      env.write("#{prop} = #{vars[prop][0]} -- #{vars[prop][1]}\n")
  else if !value and !vars[name] then env.write("No variable named #{name}\n")
  else if !value then env.write("#{name} = #{vars[name]} -- #{vars[prop][1]}\n")
  else vars[name][0] = !(value[0] in ['f', 'F'])

# rewrite in Leisure
processLine = (line, env, namespace, next)->
  env = env ? Prim.defaultEnv
  try
    if line
      if line[0] == '!'
        if line[1] == '!'
          result = eval(line.substr(2))
          result = if U? then U.inspect(result) else result
          env.write("#{result}\n")
        else
          result = Leisure.eval(line.substr(1))
          result = if U? then U.inspect(result) else result
          env.write("#{result}\n")
      else if (m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/)) then handleVar(m[2], m[3], env)
      else if (m = line.match(/^:c\s*([^\s]*)$/)) then return compileFunc(m[1], env)
      else if (m = line.match(/^:r/)) then resetFunc()
      else if (line.trim() == ':h') then helpFunc(env)
      else if (line.trim() == ':q') then process.exit(0)
      else
        [a, c, r] = [vars.a[0], vars.c[0], vars.r[0]]
        [ast, err] = Leisure.compileNext(line, getGlobals(), false, false, false, namespace, env.debug)
        if err?
          if ast? then ast.err = err
          else ast = {err: err}
        else [ast, result] = if r then Leisure.evalNext(line, namespace, env.debug) else [ast, null]
        return handlerFunc(ast, result, a, c, r, line, env, next)
  catch err
    env.write errString err
  (next ? nextFunc)()

escape = (str)-> str.replace(/\n/g, '\\n')

prelude = """

Nil = Parse.Nil;
cons = Parse.cons;
primCons = Parse.primCons;
setType = Parse.setType;
setDataType = Parse.setDataType;
define = Parse.define;
processResult = Repl.processResult;
setContext = Leisure.setContext;
funcContext = Leisure.funcContext;
define = Parse.define;
wrapContext = Leisure.wrapContext;
markLeisureErrors = Leisure.markLeisureErrors;
"""

localPrelude = prelude.replace(/\n/g, "\nvar ")

generateCode = (file, contents, loud, handle, nomacros, check, debug)->
  [globals, errs, auto] = findDefs contents, nomacros, loud
  runAutosThen auto, debug, -> generate file, contents, loud, handle, nomacros, check, globals, errs, debug

runAutosThen = (autos, debug, cont)->
  if autos == Parse.Nil then cont()
  else  processResult Leisure.evalNext(autos.head(), 'Parse.', debug)[1], {}, ->
    runAutosThen autos.tail(), debug, cont

generate = (file, contents, loud, handle, nomacros, check, globals, errs, debug)->
  if loud then console.log("Compiling #{file}:\n")
  objName = if file? and file.match /\.lsr$|\.lmd$/ then file.substring(0, file.length - 4) else file ? '_anonymous'
  out = """
var #{objName} = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  #{if file? then file.replace(/\.lsr/, '') + ' = ' else ''}root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');#{if includeStd then "\n  Leisure.req('./prelude');\n  Leisure.req('./std');" else ''}
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

#{localPrelude}
"""
  names = globals
  prev = Parse.Nil
  if err then throwError(err)
  defs = []
  rest = contents
  varOut = ''
  for v, i in globals.toArray()
    if i > 0 then varOut += ","
    varOut += " #{Parse.nameSub v}"
  #if varOut then out += "\nvar#{varOut};\n"
  globals = globals.append(getGlobals())
  while rest and rest.trim()
    if loud > 1 and prev != names and names != Parse.Nil then console.log "Compiling function: #{names.head()}"
    oldRest = rest
    [ast, err, rest] = Leisure.compileNext rest, globals, null, check, nomacros, 'Parse.', debug
    if ast?.leisureName?
      prev = ast.leisureName
      names = names.tail()
    code = if rest then oldRest.substring(0, oldRest.length - rest.length) else ''
    err = err ? ast?.err
    if err
      errs = "#{errs}#{if ast?.leisureName then "Error in #{ast.leisureName}#{showAst ast}" else ""}#{err}\n"
      rest = ''
    else if ast
      globals = ast.globals
      m = code.match(Leisure.linePat)
      nm = ast.leisureName
      ast.src = """
//#{if nm? then nm + ' = ' else ''}#{escape(Parse.print(ast))}
#{if nm? then "root.defs.#{Parse.nameSub(nm)} = #{Parse.nameSub(nm)} = " else ""}#{ast.src}
"""
      src = if ast.leisureName
        defs.push Parse.nameSub(ast.leisureName)
        ast.src
      else "processResult(#{ast.src})"
      out += "#{src};\n"
      [a, c, r] = [vars.a[0], vars.c[0], vars.r[0]]
      if handle then handlerFunc ast, null, a, c, r, code
  out += """

//if (typeof window !== 'undefined' && window !== null) {
//  Leisure.processTokenDefs(root.tokenDefs);
//}
return root;
}).call(this)
"""
  if errs != '' then throwError("Errors compiling #{file}: #{errs}")
  out

getGlobals = -> Leisure.eval 'leisureGetFuncs()'

#showAst = (ast)-> if ast? then "(#{Parse.print(ast)})/(#{Leisure.astPrint(ast)})" else ""
showAst = (ast)-> if ast? then "(#{Parse.print(ast)})" else ""

findDefs = (contents, nomacros, loud)->
  auto = Parse.dlempty
  errs = ''
  globals = Parse.Nil
  rest = contents
  while rest
    oldRest = rest
    [ast, err, rest] = Leisure.compileNext rest, globals, true, null, nomacros
    if err
      if ast?.leisureName then errs = "#{errs}Error in #{ast.leisureName}#{showAst ast}: #{err}\n"
      else if prevName? then errs = "#{errs}Error after #{prevName}: #{err}\n"
      else errs = "#{errs}#{err}\n"
    else
      line = oldRest.substring(0, (if rest? then oldRest.length - rest.length else oldRest.length))
      if line.match /(^|\n)#@auto/ then auto = Parse.dlappend auto, (Parse.dlnew line)
    if ast?.leisureName
      prevName = ast.leisureName
      if loud > 2 then console.log "Found function: #{ast.leisureName}"
      if globals?.find((v)->v == ast.leisureName && !ast.leisureTypeAssertions) then throwError("Attempt to redefine function: #{ast.leisureName}#{showAst ast}")
      globals = Parse.cons(ast.leisureName, globals)
  [globals.reverse(), errs, auto(Parse.Nil)]

root.processLine = processLine
root.setCompiler = setCompiler
root.setHelp = setHelp
root.setNext = setNext
root.setHandler = setHandler
root.next = -> nextFunc()
root.help = -> helpFunc()
root.getType = getType
root.generateCode = generateCode
root.processResult = processResult
root.setResetFunc = setResetFunc
root.findDefs = findDefs
root.prelude = prelude
root.errString = errString
root.setIncludeStd = setIncludeStd
