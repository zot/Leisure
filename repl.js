(function() {
  var Core, FS, L, P, Path, Prim, R, U, VM, compile, createEnv, face, getType, help, init, print, processResult, repl, root, vars, write,
    __slice = Array.prototype.slice;

  U = require('util');

  R = require('readline');

  L = require('./lazp');

  Prim = require('./prim');

  Core = require('./replCore');

  FS = require('fs');

  Path = require('path');

  P = require('./pretty');

  VM = require('vm');

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.quiet = false;

  getType = L.getType;

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
      face.setPrompt("Lazp> ");
      Prim.setTty(face);
      face.on('close', function() {
        return process.exit(0);
      });
      face.on('line', function(line) {
        return Core.processLine(line.trim());
      });
      return Core.setNext(function() {
        return face.prompt();
      });
    }
  };

  repl = function repl() {
    print("Welcome to Lazp!\n");
    help();
    init();
    return face.prompt();
  };

  help = function help() {
    return write(":v -- vars\n:h -- help\n:c file -- compile file\n:q -- quit\n!code -- eval JavaScript code\n");
  };

  compile = function compile(file, cont) {
    var contents, oldfile, stream;
    cont = cont != null ? cont : Core.next;
    if (!file) {
      return face != null ? face.prompt() : void 0;
    } else {
      contents = '';
      if (!Path.existsSync(file)) {
        oldfile = file;
        file = file + ".laz";
        if (!Path.existsSync(file)) {
          console.log("No file: " + oldfile);
          return cont();
        }
      }
      stream = FS.createReadStream(file);
      stream.on('data', function(data) {
        return contents += data;
      });
      stream.on('end', function() {
        var out;
        out = Core.generateCode(file, contents, !root.quiet);
        stream = FS.createWriteStream("" + (Path.basename(file, '.laz')) + ".js");
        return stream.end(out, 'utf8');
      });
      stream.on('close', function() {
        return cont();
      });
      return stream.on('error', function(ex) {
        console.log("Exception reading file: ", ex.stack);
        return cont();
      });
    }
  };

  processResult = function processResult(result) {
    init();
    write("" + (getType(result)) + ": " + (P.print(result)) + "\n");
    return Core.processResult(result);
  };

  createEnv = function createEnv() {
    var ctx, ctxObj, i, v;
    ctxObj = {
      require: require,
      Lazp: L,
      Repl: module,
      lazpFuncs: {},
      macros: {}
    };
    for (i in lazpFuncs) {
      v = lazpFuncs[i];
      ctxObj[i] = v;
    }
    ctx = VM.createContext(ctxObj);
    ctx.global = ctx;
    L.setEvalFunc(ctx, function(str) {
      return VM.runInContext(str, ctx);
    });
    VM.runInContext("(function(){\nvar lll;\n\n  global.lazpGetFuncs = function lazpGetFuncs() {\n    return lll\n  }\n  global.lazpSetFuncs = function lazpSetFuncs(funcs) {\n    lll = funcs\n  }\n  global.lazpAddFunc = function lazpAddFunc(func) {\n    lll = Lazp.cons(func, lll)\n  }\n})()\n\nfunction req(name) {\n  return Lazp.req(name, global)\n}\n//Lazp.req('./std');\n\nsetType = Lazp.setType;\nsetDataType = Lazp.setDataType;\ndefine = Lazp.define;\ndefineMacro = Lazp.defineMacro;\ndefineToken = Lazp.defineToken;\nprocessResult = Repl.processResult;", ctx);
    return VM.runInContext('lazpSetFuncs', ctx)(lazpFuncNames);
  };

  createEnv();

  Core.setHelp(help);

  Core.setCompiler(compile);

  Core.setWriter(function(str) {
    return process.stdout.write(str);
  });

  Core.setResetFunc(function() {
    write("Creating fresh environment");
    createEnv();
    return L.eval("req('./std')");
  });

  root.createEnv = createEnv;

  root.print = print;

  root.repl = repl;

  root.compile = compile;

  root.init = init;

  root.processResult = processResult;

}).call(this);
