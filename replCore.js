(function() {
  var Lazp, P, Prim, U, compileFunc, escape, findDefs, generateCode, getGlobals, getType, handleVar, handlerFunc, helpFunc, nextFunc, print, processLine, processResult, resetFunc, root, setCompiler, setHandler, setHelp, setNext, setResetFunc, setWriter, vars, write, writeFunc,
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

  resetFunc = null;

  setResetFunc = function setResetFunc(func) {
    return resetFunc = func;
  };

  getType = Lazp.getType;

  handlerFunc = function handlerFunc(ast, result, a, c, r, src) {
    if (a) write("PREPARED: " + (Lazp.prepare(src)));
    if ((ast != null) && (ast.err != null)) {
      write("ERROR: " + ast.err + "\n");
      return nextFunc();
    } else {
      if (a) {
        write("PARSED: " + (Lazp.astPrint(ast)) + "\n");
        write("FORMATTED: " + (P.print(ast)) + "\n");
      }
      if (c) write("GEN: " + ast.src + "\n");
      if (r) {
        if (!(result != null)) {
          write("(No Result)\n");
          return nextFunc();
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
    return write("Type a Lazp expression or one of these commands and hit enter:\n\n:h -- display this help\n:c filename -- compile file\n:r -- reset the Lazp environment\n:v -- display variable values\n:v var value -- set a variable\n:q -- quit\n! code -- eval JavaScript code in the lazp environment\n!! code -- eval JavaScript code in the host environment\n");
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
    var a, ast, c, err, err1, l, m, r, result, _ref, _ref2, _ref3, _ref4;
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
        } else if ((m = line.match(/^:r/))) {
          resetFunc();
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
              _ref2 = Lazp.prepare(line), l = _ref2[0], err1 = _ref2[1];
              _ref3 = Lazp.compileNext(l, getGlobals(), false, false), ast = _ref3[0], err = _ref3[1];
              if ((err1 != null) || (err != null)) {
                if (ast != null) {
                  ast.err = err1 != null ? err1 : err;
                } else {
                  ast = {
                    err: err1 != null ? err1 : err
                  };
                }
              } else {
                _ref4 = r ? Lazp.evalNext(l) : [ast, null], ast = _ref4[0], result = _ref4[1];
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

  generateCode = function generateCode(file, contents, loud, handle, nomacros) {
    var a, ast, c, code, defs, err, errs, globals, i, m, nm, oldRest, out, r, rest, src, v, _len, _ref, _ref2, _ref3, _ref4;
    if (loud) console.log("Compiling " + file + ":\n");
    out = "(function(){\nvar root;\n\nif ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {\n  " + (file != null ? file.replace(/\.laz(p)?/, '') + ' = ' : '') + "root = {};\n  global = window;\n} else {\n  root = typeof exports !== 'undefined' && exports !== null ? exports : this;\n  Lazp = require('./lazp');\n  Lazp.req('./std');\n  require('./prim');\n  ReplCore = require('./replCore');\n  Repl = require('./repl');\n}\nroot.defs = {};\nroot.tokenDefs = [];\nroot.macros = {};\n\nvar setType = Lazp.setType;\nvar setDataType = Lazp.setDataType;\nvar define = Lazp.define;\nvar defineMacro = Lazp.defineMacro;\nvar defineToken = Lazp.defineToken;\nvar processResult = Repl.processResult;\n";
    errs = '';
    globals = findDefs(file, contents, nomacros);
    defs = [];
    _ref = Lazp.prepare(contents), rest = _ref[0], err = _ref[1];
    if (err) throw new Error(err);
    out += "\nvar";
    _ref2 = globals.toArray();
    for (i = 0, _len = _ref2.length; i < _len; i++) {
      v = _ref2[i];
      if (i > 0) out += ",";
      out += " " + (Lazp.nameSub(v));
    }
    out += ";\n";
    globals = Lazp.append(globals, getGlobals());
    while (rest) {
      oldRest = rest;
      _ref3 = Lazp.compileNext(rest, globals, null, false, nomacros), ast = _ref3[0], err = _ref3[1], rest = _ref3[2];
      code = rest ? oldRest.substring(0, oldRest.length - rest.length) : '';
      err = err != null ? err : ast != null ? ast.err : void 0;
      if (err) {
        errs = "" + errs + ((ast != null ? ast.lazpName : void 0) ? "Error in " + ast.lazpName : "") + err + "\n";
        rest = '';
      } else if (ast) {
        globals = ast.globals;
        m = code.match(Lazp.linePat);
        nm = ast.lazpName;
        ast.src = "//" + (nm != null ? nm + ' = ' : '') + (escape(P.print(ast))) + "\n" + (nm != null ? "root.defs." + (Lazp.nameSub(nm)) + " = " + (Lazp.nameSub(nm)) + " = " : "") + ast.src;
        src = ast.lazpName ? (defs.push(Lazp.nameSub(ast.lazpName)), ast.src) : "processResult(" + ast.src + ")";
        out += "" + src + ";\n";
        _ref4 = [vars.a[0], vars.c[0], vars.r[0]], a = _ref4[0], c = _ref4[1], r = _ref4[2];
        if (handle) handlerFunc(ast, null, a, c, r, code);
      }
    }
    out += "\nif (typeof window !== 'undefined' && window !== null) {\n  Lazp.processTokenDefs(root.tokenDefs);\n}\nreturn root;\n}).call(this)";
    if (errs !== '') throw new Error("Errors compiling " + file + ": " + errs);
    return out;
  };

  getGlobals = function getGlobals() {
    return Lazp.eval('lazpGetFuncs()');
  };

  findDefs = function findDefs(file, contents, nomacros) {
    var ast, err, errs, globals, oldRest, rest, _ref;
    errs = '';
    globals = Lazp.Nil;
    rest = contents;
    while (rest) {
      oldRest = rest;
      _ref = Lazp.compileNext(rest, globals, true, null, nomacros), ast = _ref[0], err = _ref[1], rest = _ref[2];
      if (err) {
        errs = "" + errs + (ast.lazpName ? "Error in " + ast.lazpName : "") + err + "\n";
      }
      if (ast != null ? ast.lazpName : void 0) {
        if (globals != null ? globals.find(function(v) {
          return v === ast.lazpName;
        }) : void 0) {
          throw new Error("Attempt to redefine function: " + ast.lazpName);
        }
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

  root.setResetFunc = setResetFunc;

}).call(this);
