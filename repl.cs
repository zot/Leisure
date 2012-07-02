U = require('util')
R = require('readline')
Parse = require('./parse')
L = require('./leisure')
Prim = require('./prim')
Core = require('./replCore')
FS = require('fs')
Buffer = require('buffer')
Path = require('path')
#P = require('./pretty')
VM = require('vm')

root = exports ? this
root.loud = 1

getType = Parse.getType

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
    face.setPrompt "Leisure> "
    Prim.setTty face
    face.on 'close', ()->process.exit(0)
    face.on 'line', (line)->Core.processLine(line.trim(), Prim.defaultEnv)
    Core.setNext -> face.prompt()

repl = ->
  print("Welcome to Leisure!\n")
  Core.help()
  init()
  face.prompt()

compile = (file, cont, nomacros, debug)->
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
    jsFile = "#{Path.basename file, '.lsr'}.js"
    if Path.existsSync(jsFile)
      FS.unlink(jsFile)
    stream = FS.createReadStream(file)
    stream.on 'data', (data)-> contents += data
    stream.on 'end', ()->
      try
        contents = contents.replace( /\r\n?/g, "\n")
        out = Core.generateCode(file, contents, root.loud, null, nomacros, null, debug)
        str = FS.createWriteStream("#{jsFile}Tmp")
        str.on 'close', ->
          FS.renameSync("#{jsFile}Tmp", jsFile)
          cont()
        str.on 'error', -> cont()
        str.end out
        str.destroySoon()
      catch err
        console.log "ERROR: #{err.stack}"
        write err.stack + "\n"
        cont()
    stream.on 'error', (ex)->
      console.log("Exception reading file: ", ex.stack)
      cont()

processResult = (result)->
  init()
  write("#{getType result}: #{Parse.print(result)}\n")
  Core.processResult result

# patched to just prep the global env instead of creating a new one for now
createEnv = ->
  ctxObj =
    #require: require
    console: console
    Leisure: L
    Repl: module
    leisureFuncs: {}
    macros: {}
  ctxObj[i] = v for i,v of leisureFuncs
  #ctx = VM.createContext ctxObj
  #ctx.global = ctx
  #L.setEvalFunc ctx, (str)-> VM.runInContext(str, ctx)
  L.setEvalFunc global, (arg)-> eval(arg)
  ctx = global
  global.Leisure = L
  global.Repl = module
  global.leisureFuncs = {}
  global.macros = {}
  global.req = L.req
  ###
  ctx.U = require('util')
  #VM.runInContext("""
  L.eval("""
(function(req){
  global.requireCache = {};
  global.require = function() {
    var c = req.cache;
    req.cache = global.requireCache;
    var result = req.apply(null, arguments);
    console.log('Called require(' + arguments[0] + '), cache: \\n' + U.inspect(requireCache) + '\\n old cache: \\n' + U.inspect(c))
    req.cache = c;
    return result;
  };
})
""")(require)
  ###
  #VM.runInContext("""
  L.eval("""
(function(){
var lll;

  global.leisureGetFuncs = function leisureGetFuncs() {
    return lll
  }
  global.leisureSetFuncs = function leisureSetFuncs(funcs) {
    lll = funcs
  }
  global.leisureAddFunc = function leisureAddFunc(func) {
    lll = Parse.cons(func, lll)
  }
})()

function req(name) {
  return Leisure.req(name, global)
}
//Leisure.req('./std');

#{Core.prelude}
""")
  #VM.runInContext('leisureSetFuncs', ctx)(leisureFuncNames)
  L.eval('leisureSetFuncs')(leisureFuncNames)

#Core.setHelp help
Core.setCompiler compile
Core.setResetFunc ->
  write "Creating fresh environment"
  createEnv()
  L.eval "Leisure.req('./std')"

root.createEnv = createEnv
root.print = print
root.repl = repl
root.compile = compile
root.init = init
root.processResult = processResult
createEnv()
