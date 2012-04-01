(function() {
  var Lazp, P, U, compileFunc, generateCode, getType, handleVar, handlerFunc, helpFunc, nextFunc, print, processLine, root, setCompiler, setHandler, setHelp, setNext, setWriter, vars, write, writeFunc,
    __slice = Array.prototype.slice;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.ReplCore = root = {};
    Lazp = window.Lazp;
    P = window.Pretty;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  if (!(Lazp != null) && (typeof require !== "undefined" && require !== null)) {
    Lazp = require('./lazp');
    P = require('./pretty');
    U = require('util');
  }

  compileFunc = function compileFunc() {};

  setCompiler = function setCompiler(c) {
    return compileFunc = c;
  };

  writeFunc = function writeFunc() {};

  setWriter = function setWriter(w) {
    return writeFunc = w;
  };

  nextFunc = function nextFunc() {};

  setNext = function setNext(n) {
    return nextFunc = n;
  };

  getType = function getType(value) {
    return (typeof value === 'function' && value.type) || typeof value;
  };

  handlerFunc = function handlerFunc(ast, result, a, c, r) {
    if (a) write("PARSED: " + (Lazp.astPrint(ast)) + "\n");
    if (c) write("GEN: " + ast.src + "\n");
    if (r) {
      if (!result) {
        return write("(No Result)\n");
      } else {
        return write("" + (getType(result)) + ": " + (P.print(result)) + "\n");
      }
    }
  };

  setHandler = function setHandler(f) {
    return handlerFunc = f;
  };

  helpFunc = function helpFunc() {
    return write("Type a Lazp expression or one of these commands and hit enter:\n\n:h -- display this help\n:v -- display variable values\n:v var value -- set a variable\n:q -- quit\n!code -- eval JavaScript code\n");
  };

  setHelp = function setHelp(h) {
    return helpFunc = h;
  };

  vars = {
    c: [false, 'show generated code'],
    a: [false, 'show parsed AST'],
    r: [true, 'show evaluation result']
  };

  print = function print() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return writeFunc(U.format.apply(null, args));
  };

  write = function write() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return writeFunc(args.join(''));
  };

  handleVar = function handleVar(name, value) {
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

  processLine = function processLine(line) {
    var a, ast, c, m, r, result, _ref, _ref2;
    try {
      if (line) {
        if (line[0] === '!') {
          write(U.inspect(eval(line.substr(1))), "\n");
        } else if ((m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/))) {
          handleVar(m[2], m[3]);
        } else if ((m = line.match(/^:c\s*([^\s]*)$/))) {
          return compileFunc(m[1]);
        } else {
          switch (line) {
            case ':h':
              helpFunc();
              break;
            case ':q':
              process.exit(0);
              break;
            default:
              _ref = [vars.a[0], vars.c[0], vars.r[0]], a = _ref[0], c = _ref[1], r = _ref[2];
              ast = Lazp.compileLine(line);
              if (r) {
                _ref2 = Lazp.evalLine(line), ast = _ref2[0], result = _ref2[1];
              } else {
                result = null;
              }
              handlerFunc(ast, result, a, c, r);
          }
        }
      }
    } catch (err) {
      write(err.stack);
    }
    return nextFunc();
  };

  generateCode = function generateCode(file, contents, loud) {
    var ast, errs, globals, i, line, m, nm, out, src, _len, _ref;
    if (loud) console.log("Compiling " + file + ":\n");
    out = 'if (typeof require !== "undefined" && require !== null) {Lazp = require("./lazp")};\nsetId = Lazp.setId;\nsetType = Lazp.setType;\nsetDataType = Lazp.setDataType;\ndefine = Lazp.define;\n';
    errs = '';
    globals = Lazp.Nil;
    _ref = contents.split('\n');
    for (i = 0, _len = _ref.length; i < _len; i++) {
      line = _ref[i];
      if (line) {
        ast = Lazp.compileLine(line, globals);
        if (ast) {
          globals = ast.globals;
          if (ast.err != null) errs = "" + errs + ast.err + "\n";
          m = line.match(Lazp.linePat);
          nm = m && m[1].trim().split(/\s+/)[0];
          ast.src = "//" + (nm ? nm + ' = ' : '') + (Lazp.astPrint(ast)) + "\n" + ast.src;
          src = ast.lazpName ? ast.src : "console.log(String(" + ast.src + "))";
          out += "" + src + ";\n";
        }
      }
    }
    if (errs) throw new Error("Errors compiling " + file + ": " + errs);
    return out;
  };

  root.processLine = processLine;

  root.setCompiler = setCompiler;

  root.setHelp = setHelp;

  root.setWriter = setWriter;

  root.setNext = setNext;

  root.setHandler = setHandler;

  root.next = function next() {
    return nextFunc();
  };

  root.help = function help() {
    return helpFunc();
  };

  root.getType = getType;

  root.generateCode = generateCode;

}).call(this);
