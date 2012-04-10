(function() {
  var Lazp, P, Prim, U, compileFunc, escape, findDefs, generateCode, getType, handleVar, handlerFunc, helpFunc, nextFunc, print, processLine, processResult, root, setCompiler, setHandler, setHelp, setNext, setWriter, vars, write, writeFunc,
    __slice = Array.prototype.slice;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.ReplCore = root = {};
    Lazp = window.Lazp;
    P = window.Pretty;
    Prim = window.Prim;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  if (!(Lazp != null) && (typeof require !== "undefined" && require !== null)) {
    Lazp = require('./lazp');
    P = require('./pretty');
    Prim = require('./prim');
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

  getType = Lazp.getType;

  handlerFunc = function handlerFunc(ast, result, a, c, r, src) {
    if (ast && ast.err) {
      write("ERROR: " + ast.err);
      return next();
    } else {
      if (a) {
        write("PARSED: " + (Lazp.astPrint(ast)) + "\n");
        write("FORMATTED: " + (P.print(ast)) + "\n");
      }
      if (c) write("GEN: " + ast.src + "\n");
      if (r) {
        if (!result) {
          write("(No Result)\n");
          return next();
        } else {
          write("" + (getType(result)) + ": " + (P.print(result)) + "\n");
          return processResult(result);
        }
      }
    }
  };

  setHandler = function setHandler(f) {
    return handlerFunc = f;
  };

  helpFunc = function helpFunc() {
    return write("Type a Lazp expression or one of these commands and hit enter:\n\n:h -- display this help\n:v -- display variable values\n:v var value -- set a variable\n:q -- quit\n! code -- eval JavaScript code in the lazp environment\n!! code -- eval JavaScript code in the host environment\n");
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

  processResult = function processResult(result) {
    if ((getType(result)) === 'monad') {
      return Prim.runMonad(result, function() {
        return nextFunc();
      });
    } else {
      return nextFunc();
    }
  };

  handleVar = function handleVar(name, value) {
    var k, prop, _i, _len, _ref, _ref2, _results;
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
      return vars[name][0] = !((_ref2 = value[0]) === 'f' || _ref2 === 'F');
    }
  };

  processLine = function processLine(line) {
    var a, ast, c, err, m, r, result, _ref, _ref2, _ref3;
    try {
      if (line) {
        if (line[0] === '!') {
          if (line[1] === '!') {
            result = eval(line.substr(2));
            result = U != null ? U.inspect(result) : result;
            write(result, "\n");
          } else {
            result = Lazp.eval(line.substr(1));
            result = U != null ? U.inspect(result) : result;
            write(result, "\n");
          }
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
              _ref2 = Lazp.compileNext(line), ast = _ref2[0], err = _ref2[1];
              if (r) {
                _ref3 = err ? [
                  {
                    err: err
                  }, err
                ] : Lazp.evalNext(line), ast = _ref3[0], result = _ref3[1];
              } else {
                result = null;
              }
              return handlerFunc(ast, result, a, c, r, line);
          }
        }
      }
    } catch (err) {
      write(err.stack);
    }
    return nextFunc();
  };

  escape = function escape(str) {
    return str.replace(/\n/g, '\\n');
  };

  generateCode = function generateCode(file, contents, loud, handle) {
    var a, ast, c, code, defs, err, errs, globals, m, nm, oldRest, out, r, rest, src, _ref, _ref2;
    if (loud) console.log("Compiling " + file + ":\n");
    out = "(function(){\nvar root;\n\nif ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {\n  root = {};\n  global = window;\n} else {\n  root = typeof exports !== 'undefined' && exports !== null ? exports : this;\n  Lazp = require('./lazp');\n  Lazp.req('./std');\n  require('./prim');\n  ReplCore = require('./replCore');\n  Repl = require('./repl');\n}\nroot.defs = {};\nroot.tokenDefs = [];\n\nvar setType = Lazp.setType;\nvar setDataType = Lazp.setDataType;\nvar define = Lazp.define;\nvar defineToken = Lazp.defineToken;\nvar processResult = Repl.processResult;\n";
    errs = '';
    globals = findDefs(file, contents);
    defs = [];
    rest = contents;
    while (rest) {
      oldRest = rest;
      _ref = Lazp.compileNext(rest, globals), ast = _ref[0], err = _ref[1], rest = _ref[2];
      code = rest ? oldRest.substring(0, oldRest.length - rest.length) : '';
      if (ast) {
        globals = ast.globals;
        if (ast.err != null) errs = "" + errs + ast.err + "\n";
        m = code.match(Lazp.linePat);
        nm = m && m[3] ? m[2].trim().split(/\s+/)[0] : null;
        ast.src = "//" + (nm != null ? nm + ' = ' : '') + (escape(Lazp.astPrint(ast))) + "\n" + (nm != null ? "root.defs." + (Lazp.nameSub(nm)) + " = " : "") + ast.src;
        src = ast.lazpName ? (defs.push(Lazp.nameSub(ast.lazpName)), ast.src) : "processResult(" + ast.src + ")";
        out += "" + src + ";\n";
        _ref2 = [vars.a[0], vars.c[0], vars.r[0]], a = _ref2[0], c = _ref2[1], r = _ref2[2];
        if (handle) handlerFunc(ast, null, a, c, r, code);
      } else if (err) {
        errs = "" + errs + err + "\n";
        rest = '';
      }
    }
    out += "\nreturn root;\n}).call(this)";
    if (errs !== '') throw new Error("Errors compiling " + file + ": " + errs);
    return out;
  };

  findDefs = function findDefs(file, contents) {
    var ast, err, errs, globals, oldRest, rest, _ref;
    errs = '';
    globals = Lazp.Nil;
    rest = contents;
    while (rest) {
      oldRest = rest;
      _ref = Lazp.compileNext(rest, globals, true), ast = _ref[0], err = _ref[1], rest = _ref[2];
      if (ast != null ? ast.lazpName : void 0) {
        globals = Lazp.cons(ast.lazpName, globals);
      }
    }
    if (errs !== '') throw new Error("Errors compiling " + file + ": " + errs);
    return globals;
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

  root.processResult = processResult;

}).call(this);
