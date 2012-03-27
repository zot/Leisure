(function() {
  var FS, L, Path, R, U, compile, generateCode, getType, handleVar, help, print, processLine, repl, root, vars, write,
    __slice = Array.prototype.slice;

  U = require('util');

  R = require('readline');

  L = require('./lazp');

  FS = require('fs');

  Path = require('path');

  vars = {
    c: [true, 'show generated code'],
    a: [true, 'show parsed AST'],
    r: [true, 'show evaluation result']
  };

  print = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return process.stdout.write(U.format.apply(null, args));
  };

  write = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return process.stdout.write(args.join(''));
  };

  repl = function() {
    var face;
    print("Welcome to Lazp!\n");
    help();
    face = R.createInterface(process.stdin, process.stdout);
    face.setPrompt("Lazp> ");
    face.on('close', function() {
      return process.exit(0);
    });
    face.on('line', function(line) {
      return processLine(face, line.trim());
    });
    return face.prompt();
  };

  help = function() {
    return write(":v -- vars\n:h -- help\n:c file -- compile file\n:q -- quit\n!code -- eval JavaScript code\n");
  };

  handleVar = function(name, value) {
    var k, prop, _i, _len, _ref, _results;
    if (!name) {
      _ref = ((function() {
        var _results2;
        _results2 = [];
        for (k in vars) {
          _results2.push(k);
        }
        return _results2;
      })()).sort();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prop = _ref[_i];
        _results.push(write("" + prop + " = " + vars[prop][0] + " -- " + vars[prop][1] + "\n"));
      }
      return _results;
    } else if (!value && !vars[name]) {
      return write("No variable named " + name + "\n");
    } else if (!value) {
      return write("" + name + " = " + vars[name] + " -- " + vars[prop][1] + "\n");
    } else {
      return vars[name][0] = JSON.parse(value);
    }
  };

  compile = function(face, file) {
    var contents, oldfile, stream;
    if (!file) {
      console.log("No file to compile");
      return face != null ? face.prompt() : void 0;
    } else {
      contents = '';
      if (!Path.existsSync(file)) {
        oldfile = file;
        file = file + ".laz";
        if (!Path.existsSync(file)) {
          console.log("No file: " + oldfile);
          return face != null ? face.promp() : void 0;
        }
      }
      stream = FS.createReadStream(file);
      stream.on('data', function(data) {
        return contents += data;
      });
      stream.on('end', function() {
        generateCode(file, contents, face);
        return face != null ? face.prompt() : void 0;
      });
      return stream.on('error', function(ex) {
        console.log("Exception reading file: ", ex.stack);
        return face != null ? face.prompt() : void 0;
      });
    }
  };

  generateCode = function(file, contents, loud) {
    var ast, i, line, out, src, stream, _len, _ref;
    if (loud) console.log("Compiling " + file + ":\n");
    out = 'L = require("./lazp")\nsetId = L.setId\nsetType = L.setType\nsetDataType = L.setDataType\n';
    _ref = contents.split('\n');
    for (i = 0, _len = _ref.length; i < _len; i++) {
      line = _ref[i];
      if (line) {
        ast = L.compileLine(line);
        ast.src = "//AST: " + (L.astPrint(ast)) + "\n" + ast.src;
        src = ast.lazpName ? ast.src : "console.log(String(" + ast.src + "))";
        out += "" + src + "\n";
      }
    }
    stream = FS.createWriteStream("" + (Path.basename(file, '.laz')) + ".js");
    return stream.end(out, 'utf8');
  };

  getType = function(value) {
    return (typeof value === 'function' && value.type) || typeof value;
  };

  processLine = function(face, line) {
    var a, ast, c, m, r, result, _ref, _ref2;
    try {
      if (line) {
        if (line[0] === '!') {
          write(U.inspect(eval(line.substr(1))), "\n");
        } else if ((m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/))) {
          handleVar(m[2], m[3]);
        } else if ((m = line.match(/^:c\s*([^\s]*)$/))) {
          return compile(face, m[1]);
        } else {
          switch (line) {
            case ':h':
              help();
              break;
            case ':q':
              process.exit(0);
              break;
            default:
              _ref = [vars.a[0], vars.c[0], vars.r[0]], a = _ref[0], c = _ref[1], r = _ref[2];
              ast = L.compileLine(line);
              if (a) write("PARSED: " + (L.astPrint(ast)) + "\n");
              if (c) write("GEN: " + ast.src + "\n");
              if (r) {
                _ref2 = L.evalLine(line), ast = _ref2[0], result = _ref2[1];
                if (!result) {
                  write("(No Result)\n");
                } else {
                  write("" + result + " (" + (getType(result)) + ")\n");
                }
              }
          }
        }
      }
    } catch (err) {
      console.log(err);
      console.log(err.stack);
    }
    return face.prompt();
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.print = print;

  root.repl = repl;

  root.compile = compile;

}).call(this);
