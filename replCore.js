(function() {
  var Leisure, P, Prim, U, compileFunc, escape, findDefs, generateCode, getGlobals, getType, handleVar, handlerFunc, helpFunc, nextFunc, print, processLine, processResult, resetFunc, root, setCompiler, setHandler, setHelp, setNext, setResetFunc, setWriter, showAst, vars, write, writeFunc,
    __slice = Array.prototype.slice;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.ReplCore = root = {};
    Leisure = window.Leisure;
    P = window.Pretty;
    Prim = window.Prim;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  if (!(Leisure != null) && (typeof require !== "undefined" && require !== null)) {
    Leisure = require('./leisure');
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

  getType = Leisure.getType;

  handlerFunc = function handlerFunc(ast, result, a, c, r, src, env) {
    env = env != null ? env : Prim.defaultEnv;
    if (a) env.write("PREPARED: " + (Leisure.prepare(src)));
    if ((ast != null) && (ast.err != null)) {
      env.write("ERROR: " + ast.err + "\n");
      return nextFunc();
    } else {
      if (a) {
        env.write("PARSED: " + (Leisure.astPrint(ast)) + "\n");
        env.write("FORMATTED: " + (P.print(ast)) + "\n");
      }
      if (c) env.write("GEN: " + ast.src + "\n");
      if (r) {
        if (!(result != null)) {
          env.write("(No Result)\n");
          return nextFunc();
        } else {
          global.$0 = result;
          env.write("" + (getType(result)) + ": " + (P.print(result)) + "\n");
          return processResult(result);
        }
      }
    }
  };

  setHandler = function setHandler(f) {
    return handlerFunc = f;
  };

  helpFunc = function helpFunc(env) {
    return env.write("Type a Leisure expression or one of these commands and hit enter:\n\n:h -- display this help\n:c filename -- compile file\n:r -- reset the Leisure environment\n:v -- display variable values\n:v var value -- set a variable\n:q -- quit\n! code -- eval JavaScript code in the leisure environment\n!! code -- eval JavaScript code in the host environment\n");
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

  processResult = function processResult(result, env) {
    if ((getType(result)) === 'monad') {
      return Prim.runMonad(result, env != null ? env : Prim.defaultEnv, function() {
        return nextFunc();
      });
    } else {
      return nextFunc();
    }
  };

  handleVar = function handleVar(name, value, env) {
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
        _results.push(env.write("" + prop + " = " + vars[prop][0] + " -- " + vars[prop][1] + "\n"));
      }
      return _results;
    } else if (!value && !vars[name]) {
      return env.write("No variable named " + name + "\n");
    } else if (!value) {
      return env.write("" + name + " = " + vars[name] + " -- " + vars[prop][1] + "\n");
    } else {
      return vars[name][0] = !((_ref2 = value[0]) === 'f' || _ref2 === 'F');
    }
  };

  processLine = function processLine(line, env) {
    var a, ast, c, err, err1, l, m, r, result, _ref, _ref2, _ref3, _ref4;
    env = env != null ? env : Prim.defaultEnv;
    try {
      if (line) {
        if (line[0] === '!') {
          if (line[1] === '!') {
            result = eval(line.substr(2));
            result = U != null ? U.inspect(result) : result;
            env.write("" + result + "\n");
          } else {
            result = Leisure.eval(line.substr(1));
            result = U != null ? U.inspect(result) : result;
            env.write("" + result + "\n");
          }
        } else if ((m = line.match(/^:v\s*(([^\s]*)\s*([^\s]*)\s*)$/))) {
          handleVar(m[2], m[3], env);
        } else if ((m = line.match(/^:c\s*([^\s]*)$/))) {
          return compileFunc(m[1], env);
        } else if ((m = line.match(/^:r/))) {
          resetFunc();
        } else if (line.trim() === ':h') {
          helpFunc(env);
        } else if (line.trim() === ':q') {
          process.exit(0);
        } else {
          _ref = [vars.a[0], vars.c[0], vars.r[0]], a = _ref[0], c = _ref[1], r = _ref[2];
          _ref2 = Leisure.prepare(line), l = _ref2[0], err1 = _ref2[1];
          _ref3 = Leisure.compileNext(l, getGlobals(), false, false), ast = _ref3[0], err = _ref3[1];
          if ((err1 != null) || (err != null)) {
            if (ast != null) {
              ast.err = err1 != null ? err1 : err;
            } else {
              ast = {
                err: err1 != null ? err1 : err
              };
            }
          } else {
            _ref4 = r ? Leisure.evalNext(l) : [ast, null], ast = _ref4[0], result = _ref4[1];
          }
          return handlerFunc(ast, result, a, c, r, line, env);
        }
      }
    } catch (err) {
      env.write(err.stack);
    }
    return nextFunc();
  };

  escape = function escape(str) {
    return str.replace(/\n/g, '\\n');
  };

  generateCode = function generateCode(file, contents, loud, handle, nomacros) {
    var a, ast, c, code, defs, err, errs, globals, i, m, names, nm, objName, oldRest, out, prev, r, rest, src, v, varOut, _len, _ref, _ref2, _ref3, _ref4, _ref5;
    if (loud) console.log("Compiling " + file + ":\n");
    objName = (file != null) && file.match(/\.lsr$/) ? file.substring(0, file.length - 4) : file != null ? file : '_anonymous';
    out = "var " + objName + " = (function(){\nvar root;\n\nif ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {\n  " + (file != null ? file.replace(/\.lsr/, '') + ' = ' : '') + "root = {};\n  global = window;\n} else {\n  root = typeof exports !== 'undefined' && exports !== null ? exports : this;\n  Leisure = require('./leisure');\n  Leisure.req('./std');\n  require('./prim');\n  ReplCore = require('./replCore');\n  Repl = require('./repl');\n}\nroot.defs = {};\nroot.tokenDefs = [];\nroot.macros = {};\n\nvar setType = Leisure.setType;\nvar setDataType = Leisure.setDataType;\nvar define = Leisure.define;\nvar defineMacro = Leisure.defineMacro;\nvar defineToken = Leisure.defineToken;\nvar processResult = Repl.processResult;\n";
    _ref = findDefs(contents, nomacros, loud), globals = _ref[0], errs = _ref[1];
    names = globals;
    prev = Leisure.Nil;
    if (err) throw new Error(err);
    defs = [];
    _ref2 = Leisure.prepare(contents), rest = _ref2[0], err = _ref2[1];
    if (err) throw new Error(err);
    varOut = '';
    _ref3 = globals.reverse().toArray();
    for (i = 0, _len = _ref3.length; i < _len; i++) {
      v = _ref3[i];
      if (i > 0) varOut += ",";
      varOut += " " + (Leisure.nameSub(v));
    }
    if (varOut) out += "\nvar" + varOut + ";\n";
    globals = Leisure.append(globals, getGlobals());
    while (rest && rest.trim()) {
      if (loud > 1 && prev !== names && names !== Leisure.Nil) {
        console.log("Compiling function: " + names.head);
      }
      oldRest = rest;
      _ref4 = Leisure.compileNext(rest, globals, null, false, nomacros), ast = _ref4[0], err = _ref4[1], rest = _ref4[2];
      if ((ast != null ? ast.leisureName : void 0) != null) {
        prev = ast.leisureName;
        names = names.tail;
      }
      code = rest ? oldRest.substring(0, oldRest.length - rest.length) : '';
      err = err != null ? err : ast != null ? ast.err : void 0;
      if (err) {
        errs = "" + errs + ((ast != null ? ast.leisureName : void 0) ? "Error in " + ast.leisureName + (showAst(ast)) : "") + err + "\n";
        rest = '';
      } else if (ast) {
        globals = ast.globals;
        m = code.match(Leisure.linePat);
        nm = ast.leisureName;
        ast.src = "//" + (nm != null ? nm + ' = ' : '') + (escape(P.print(ast))) + "\n" + (nm != null ? "root.defs." + (Leisure.nameSub(nm)) + " = " + (Leisure.nameSub(nm)) + " = " : "") + ast.src;
        src = ast.leisureName ? (defs.push(Leisure.nameSub(ast.leisureName)), ast.src) : "processResult(" + ast.src + ")";
        out += "" + src + ";\n";
        _ref5 = [vars.a[0], vars.c[0], vars.r[0]], a = _ref5[0], c = _ref5[1], r = _ref5[2];
        if (handle) handlerFunc(ast, null, a, c, r, code);
      }
    }
    out += "\nif (typeof window !== 'undefined' && window !== null) {\n  Leisure.processTokenDefs(root.tokenDefs);\n}\nreturn root;\n}).call(this)";
    if (errs !== '') throw new Error("Errors compiling " + file + ": " + errs);
    return out;
  };

  getGlobals = function getGlobals() {
    return Leisure.eval('leisureGetFuncs()');
  };

  showAst = function showAst(ast) {
    if (ast != null) {
      return "(" + (P.print(ast)) + ")/(" + (Leisure.astPrint(ast)) + ")";
    } else {
      return "";
    }
  };

  findDefs = function findDefs(contents, nomacros, loud) {
    var ast, err, errs, globals, oldRest, prevName, rest, _ref;
    errs = '';
    globals = Leisure.Nil;
    rest = contents;
    while (rest) {
      oldRest = rest;
      _ref = Leisure.compileNext(rest, globals, true, null, nomacros), ast = _ref[0], err = _ref[1], rest = _ref[2];
      if (err) {
        if (ast != null ? ast.leisureName : void 0) {
          errs = "" + errs + "Error in " + ast.leisureName + (showAst(ast)) + ": " + err + "\n";
        } else if (typeof prevName !== "undefined" && prevName !== null) {
          errs = "" + errs + "Error after " + prevName + ": " + err + "\n";
        } else {
          errs = "" + erros + err + "\n";
        }
      }
      if (ast != null ? ast.leisureName : void 0) {
        prevName = ast.leisureName;
        if (loud > 2) console.log("Found function: " + ast.leisureName);
        if (globals != null ? globals.find(function(v) {
          return v === ast.leisureName;
        }) : void 0) {
          throw new Error("Attempt to redefine function: " + ast.leisureName + (showAst(ast)));
        }
        globals = Leisure.cons(ast.leisureName, globals);
      }
    }
    return [globals.reverse(), errs];
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

  root.findDefs = findDefs;

}).call(this);
