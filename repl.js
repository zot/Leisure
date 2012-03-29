(function() {
  var Core, FS, L, Path, R, U, compile, generateCode, help, print, repl, root, vars, write,
    __slice = Array.prototype.slice;

  U = require('util');

  R = require('readline');

  L = require('./lazp');

  Core = require('./replCore');

  FS = require('fs');

  Path = require('path');

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.quiet = false;

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

  repl = function repl() {
    var face;
    print("Welcome to Lazp!\n");
    help();
    face = R.createInterface(process.stdin, process.stdout);
    face.setPrompt("Lazp> ");
    face.on('close', function() {
      return process.exit(0);
    });
    face.on('line', function(line) {
      return Core.processLine(line.trim());
    });
    Core.setNext(function() {
      return face.prompt();
    });
    return face.prompt();
  };

  help = function help() {
    return write(":v -- vars\n:h -- help\n:c file -- compile file\n:q -- quit\n!code -- eval JavaScript code\n");
  };

  compile = function compile(file) {
    var contents, oldfile, stream;
    if (!file) {
      console.log("No file to compile");
      return typeof face !== "undefined" && face !== null ? face.prompt() : void 0;
    } else {
      contents = '';
      if (!Path.existsSync(file)) {
        oldfile = file;
        file = file + ".laz";
        if (!Path.existsSync(file)) {
          console.log("No file: " + oldfile);
          return Core.next();
        }
      }
      stream = FS.createReadStream(file);
      stream.on('data', function(data) {
        return contents += data;
      });
      stream.on('end', function() {
        generateCode(file, contents, !root.quiet);
        return Core.next();
      });
      return stream.on('error', function(ex) {
        console.log("Exception reading file: ", ex.stack);
        return Core.next();
      });
    }
  };

  generateCode = function generateCode(file, contents, loud) {
    var ast, i, line, out, src, stream, _len, _ref;
    if (loud) console.log("Compiling " + file + ":\n");
    out = 'if (typeof require !== "undefined" && require !== null) {Lazp = require("./lazp")}\nsetId = Lazp.setId\nsetType = Lazp.setType\nsetDataType = Lazp.setDataType\ndefine = Lazp.define\n';
    _ref = contents.split('\n');
    for (i = 0, _len = _ref.length; i < _len; i++) {
      line = _ref[i];
      if (line) {
        ast = L.compileLine(line);
        if (ast) {
          ast.src = "//AST: " + (L.astPrint(ast)) + "\n" + ast.src;
          src = ast.lazpName ? ast.src : "console.log(String(" + ast.src + "))";
          out += "" + src + "\n";
        }
      }
    }
    stream = FS.createWriteStream("" + (Path.basename(file, '.laz')) + ".js");
    return stream.end(out, 'utf8');
  };

  Core.setHelp(help);

  Core.setCompiler(compile);

  Core.setWriter(function(str) {
    return process.stdout.write(str);
  });

  root.print = print;

  root.repl = repl;

  root.compile = compile;

}).call(this);
