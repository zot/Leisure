(function() {
  var Buffer, Core, FS, L, Parse, Path, Prim, R, U, VM, compile, createEnv, face, getType, init, print, processResult, repl, root, vars, write,
    __slice = Array.prototype.slice;

  U = require('util');

  R = require('readline');

  Parse = require('./parse');

  L = require('./leisure');

  Prim = require('./prim');

  Core = require('./replCore');

  FS = require('fs');

  Buffer = require('buffer');

  Path = require('path');

  VM = require('vm');

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.loud = 1;

  getType = Parse.getType;

  vars = {
    c: [false, 'show generated code'],
    a: [false, 'show parsed AST'],
    r: [true, 'show evaluation result']
  };

  print = function print() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return process.stdout.write(U.format.apply(null, args));
  };

  write = function write() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return process.stdout.write(args.join(''));
  };

  face = null;

  init = function init() {
    if (!(face != null)) {
      face = R.createInterface(process.stdin, process.stdout);
      face.setPrompt("Leisure> ");
      Prim.setTty(face);
      face.on('close', function() {
        return process.exit(0);
      });
      face.on('line', function(line) {
        return Core.processLine(line.trim(), Prim.defaultEnv);
      });
      return Core.setNext(function() {
        return face.prompt();
      });
    }
  };

  repl = function repl() {
    print("Welcome to Leisure!\n");
    Core.help();
    init();
    return face.prompt();
  };

  compile = function compile(file, cont, nomacros, debug) {
    var contents, jsFile, oldfile, stream;
    cont = cont != null ? cont : Core.next;
    if (!file) {
      return face != null ? face.prompt() : void 0;
    } else {
      contents = '';
      if (!Path.existsSync(file)) {
        oldfile = file;
        file = file + ".lsr";
        if (!Path.existsSync(file)) {
          console.log("No file: " + oldfile);
          return cont();
        }
      }
      jsFile = "" + (Path.basename(file, '.lsr')) + ".js";
      if (Path.existsSync(jsFile)) FS.unlink(jsFile);
      stream = FS.createReadStream(file);
      stream.on('data', function(data) {
        return contents += data;
      });
      stream.on('end', function() {
        var out, str;
        try {
          contents = contents.replace(/\r\n?/g, "\n");
          out = Core.generateCode(file, contents, root.loud, null, nomacros, null, debug);
          str = FS.createWriteStream("" + jsFile + "Tmp");
          str.on('close', function() {
            FS.renameSync("" + jsFile + "Tmp", jsFile);
            return cont();
          });
          str.on('error', function() {
            return cont();
          });
          str.end(out);
          return str.destroySoon();
        } catch (err) {
          console.log("ERROR: " + err + "\n" + err.stack);
          write(err.stack + "\n");
          return cont();
        }
      });
      return stream.on('error', function(ex) {
        console.log("Exception reading file: ", ex.stack);
        return cont();
      });
    }
  };

  processResult = function processResult(result, next) {
    init();
    write("" + (getType(result)) + ": " + (Parse.print(result)) + "\n");
    return Core.processResult(result, next);
  };

  createEnv = function createEnv() {
    var ctx, ctxObj, i, v;
    ctxObj = {
      console: console,
      Leisure: L,
      Repl: module,
      leisureFuncs: {},
      macros: {}
    };
    for (i in leisureFuncs) {
      v = leisureFuncs[i];
      ctxObj[i] = v;
    }
    L.setEvalFunc(global, function(arg) {
      return eval(arg);
    });
    ctx = global;
    global.Leisure = L;
    global.Repl = module;
    global.leisureFuncs = {};
    global.macros = {};
    global.req = L.req;
    /*
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
    */
    L.eval("(function(){\nvar lll;\n\n  global.leisureGetFuncs = function leisureGetFuncs() {\n    return lll\n  }\n  global.leisureSetFuncs = function leisureSetFuncs(funcs) {\n    lll = funcs\n  }\n  global.leisureAddFunc = function leisureAddFunc(func) {\n    lll = Parse.cons(func, lll)\n  }\n})()\n\nfunction req(name) {\n  return Leisure.req(name, global)\n}\n//Leisure.req('./std');\n\n" + Core.prelude);
    return L.eval('leisureSetFuncs')(leisureFuncNames);
  };

  Core.setCompiler(compile);

  Core.setResetFunc(function() {
    write("Creating fresh environment");
    createEnv();
    return L.eval("Leisure.req('./std')");
  });

  root.createEnv = createEnv;

  root.print = print;

  root.repl = repl;

  root.compile = compile;

  root.init = init;

  root.processResult = processResult;

  createEnv();

}).call(this);
