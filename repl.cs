U = require('util')
R = require('readline')
L = require('./liesure')
Prim = require('./prim')
Core = require('./replCore')
FS = require('fs')
Path = require('path')
P = require('./pretty')
VM = require('vm')

root = exports ? this
root.quiet = false

getType = L.getType

vars = {
  c: [false, 'show generated code'],
  a: [false, 'show parsed AST'],
  r: [true, 'show evaluation result'],
}

print = (args...)-> process.stdout.write(U.format.apply(null, args))
write = (args...)-> process.stdout.write args.join('')
face = null

init = ->
  if !face?
    face = R.createInterface(process.stdin, process.stdout)
    face.setPrompt "Liesure> "
    Prim.setTty face
    face.on 'close', ()->process.exit(0)
    face.on 'line', (line)->Core.processLine(line.trim())
    Core.setNext -> face.prompt()

repl = () ->
  print("Welcome to Liesure!\n")
  help()
  init()
  # face = R.createInterface(process.stdin, process.stdout)
  # Prim.setTty(face)
  # face.setPrompt "Liesure> "
  # face.on 'close', ()->process.exit(0)
  # face.on 'line', (line)->Core.processLine(line.trim())
  # Core.setNext -> face.prompt()
  face.prompt()

help = ()->
  write("""
:v -- vars
:h -- help
:c file -- compile file
:q -- quit
!code -- eval JavaScript code

  """)

compile = (file, cont, nomacros)->
  cont = cont ? Core.next
  if !file
    face?.prompt()
  else
    contents = ''
    if !Path.existsSync(file)
      oldfile = file
      file = file + ".lsr"
      if !Path.existsSync(file)
        console.log("No file: #{oldfile}")
        return cont()
    stream = FS.createReadStream(file)
    stream.on('data', (data)-> contents += data)
    stream.on('end', ()->
      out = Core.generateCode(file, contents, !root.quiet, null, nomacros)
      stream = FS.createWriteStream("#{Path.basename file, '.lsr'}.js")
      stream.end(out, 'utf8'))
    stream.on 'close', -> cont()
    stream.on('error', (ex)->
      console.log("Exception reading file: ", ex.stack)
      cont())

processResult = (result)->
  init()
  write("#{getType result}: #{P.print(result)}\n")
  Core.processResult result

createEnv = ->
  ctxObj =
    require: require
    Liesure: L
    Repl: module
    liesureFuncs: {}
    macros: {}
  ctxObj[i] = v for i,v of liesureFuncs
  ctx = VM.createContext ctxObj
  ctx.global = ctx
  L.setEvalFunc ctx, (str)-> VM.runInContext(str, ctx)
  VM.runInContext("""
(function(){
var lll;

  global.liesureGetFuncs = function liesureGetFuncs() {
    return lll
  }
  global.liesureSetFuncs = function liesureSetFuncs(funcs) {
    lll = funcs
  }
  global.liesureAddFunc = function liesureAddFunc(func) {
    lll = Liesure.cons(func, lll)
  }
})()

function req(name) {
  return Liesure.req(name, global)
}
//Liesure.req('./std');

setType = Liesure.setType;
setDataType = Liesure.setDataType;
define = Liesure.define;
defineMacro = Liesure.defineMacro;
defineToken = Liesure.defineToken;
processResult = Repl.processResult;
""", ctx)
  VM.runInContext('liesureSetFuncs', ctx)(liesureFuncNames)

createEnv()
Core.setHelp help
Core.setCompiler compile
Core.setWriter (str)-> process.stdout.write(str)
Core.setResetFunc ->
  write "Creating fresh environment"
  createEnv()
  L.eval "req('./std')"

root.createEnv = createEnv
root.print = print
root.repl = repl
root.compile = compile
root.init = init
root.processResult = processResult
