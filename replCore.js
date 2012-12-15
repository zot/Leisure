(function() {
  var Leisure, Parse, Prim, U, compileFunc, errString, escape, findDefs, formatContexts, generate, generateCode, getGlobals, getType, handleVar, handlerFunc, helpFunc, includeStd, localPrelude, nextFunc, prelude, print, processLine, processResult, resetFunc, root, runAutosThen, setCompiler, setHandler, setHelp, setIncludeStd, setNext, setResetFunc, showAst, throwError, vars, write,
    __slice = Array.prototype.slice;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.ReplCore = root = {};
    Parse = window.Parse;
    Leisure = window.Leisure;
    Prim = window.Prim;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  if (!(Leisure != null) && (typeof require !== "undefined" && require !== null)) {
    Parse = require('./parse');
    Leisure = require('./leisure');
    Prim = require('./prim');
    U = require('util');
  }

  includeStd = true;

  setIncludeStd = function setIncludeStd(flag) {
    return includeStd = flag;
  };

  throwError = Parse.throwError;

  compileFunc = function compileFunc() {};

  setCompiler = function setCompiler(c) {
    return compileFunc = c;
  };

  nextFunc = function nextFunc() {};

  setNext = function setNext(n) {
    return nextFunc = n;
  };

  resetFunc = null;

  setResetFunc = function setResetFunc(func) {
    return resetFunc = func;
  };

  getType = Parse.getType;

  formatContexts = function formatContexts(stack) {
    var end, funcName, offset, src, start, _i, _len, _ref, _ref2, _ref3, _results;
    _ref = stack.toArray();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref2 = _ref[_i], funcName = _ref2[0], offset = _ref2[1];
      console.log("FUNCNAME: " + funcName + ", OFFSET: " + offset);
      _ref3 = Leisure.funcContextSource(funcName, offset), src = _ref3[0], start = _ref3[1], end = _ref3[2];
      _results.push("" + funcName + ":" + start + "," + end + ": " + (Leisure.indent("" + (src.substring(0, start)) + " << " + (src.substring(start, end)) + " >> " + (src.substring(end)), 4)));
    }
    return _results;
  };

  errString = function errString(err) {
    if (err instanceof Error) {
      return "" + (err.leisureContext != null ? "\n" + err + ":\n  " + (formatContexts(err.leisureContext).join('\n  ')) + "\n\n" : '') + err.stack;
    } else {
      return err;
    }
  };

  handlerFunc = function handlerFunc(ast, result, a, c, r, src, env, next) {
    env = env != null ? env : Prim.defaultEnv;
    if ((ast != null ? ast.err : void 0) != null) {
      env.write(errString(ast.err));
      return typeof next === "function" ? next() : void 0;
    } else {
      if (a) env.write("FORMATTED: " + (Parse.print(ast)) + "\n");
      if (c) env.write("GEN: " + ast.src + "\n");
      if (r) {
        if (!(result != null)) {
          env.write("(No Result)\n");
          return typeof next === "function" ? next() : void 0;
        } else {
          global.$0 = result;
          env.write("" + (getType(result)) + ": " + (Parse.print(result)) + "\n");
          return processResult(result, env, next);
        }
      }
    }
  };

  setHandler = function setHandler(f) {
    return handlerFunc = f;
  };

  helpFunc = function helpFunc(env) {
    return (env != null ? env : Prim.defaultEnv).write("Type a Leisure expression or one of these commands and hit enter:\n\n:h -- display this help\n:c filename -- compile file\n:r -- reset the Leisure environment\n:v -- display variable values\n:v var value -- set a variable\n:q -- quit\n! code -- eval JavaScript code in the leisure environment\n!! code -- eval JavaScript code in the host environment\n");
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

  processResult = function processResult(result, env, next) {
    next = next != null ? next : nextFunc;
    if ((getType(result)) === 'monad') {
      return Prim.runMonad(result, env != null ? env : Prim.defaultEnv, function() {
        return next();
      });
    } else {
      return next();
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

  processLine = function processLine(line, env, namespace, next) {
    var a, ast, c, err, m, r, result, _ref, _ref2, _ref3;
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
          _ref2 = Leisure.compileNext(line, getGlobals(), false, false, false, namespace, env.debug), ast = _ref2[0], err = _ref2[1];
          if (err != null) {
            if (ast != null) {
              ast.err = err;
            } else {
              ast = {
                err: err
              };
            }
          } else {
            _ref3 = r ? Leisure.evalNext(line, namespace, env.debug) : [ast, null], ast = _ref3[0], result = _ref3[1];
          }
          return handlerFunc(ast, result, a, c, r, line, env, next);
        }
      }
    } catch (err) {
      env.write(errString(err));
    }
    return (next != null ? next : nextFunc)();
  };

  escape = function escape(str) {
    return str.replace(/\n/g, '\\n');
  };

  prelude = "\nNil = Parse.Nil;\ncons = Parse.cons;\nprimCons = Parse.primCons;\nsetType = Parse.setType;\nsetDataType = Parse.setDataType;\ndefine = Parse.define;\nprocessResult = Repl.processResult;\nsetContext = Leisure.setContext;\nfuncContext = Leisure.funcContext;\ndefine = Parse.define;\nwrapContext = Leisure.wrapContext;\nmarkLeisureErrors = Leisure.markLeisureErrors;";

  localPrelude = prelude.replace(/\n/g, "\nvar ");

  generateCode = function generateCode(file, contents, loud, handle, nomacros, check, debug) {
    var auto, errs, globals, _ref;
    _ref = findDefs(contents, nomacros, loud), globals = _ref[0], errs = _ref[1], auto = _ref[2];
    return runAutosThen(auto, debug, function() {
      return generate(file, contents, loud, handle, nomacros, check, globals, errs, debug);
    });
  };

  runAutosThen = function runAutosThen(autos, debug, cont) {
    if (autos === Parse.Nil) {
      return cont();
    } else {
      return processResult(Leisure.evalNext(autos.head(), 'Parse.', debug)[1], {}, function() {
        return runAutosThen(autos.tail(), debug, cont);
      });
    }
  };

  generate = function generate(file, contents, loud, handle, nomacros, check, globals, errs, debug) {
    var a, ast, c, code, defs, err, i, m, names, nm, objName, oldRest, out, prev, r, rest, src, v, varOut, _len, _ref, _ref2, _ref3;
    if (loud) console.log("Compiling " + file + ":\n");
    objName = (file != null) && file.match(/\.lsr$|\.lmd$/) ? file.substring(0, file.length - 4) : file != null ? file : '_anonymous';
    out = "var " + objName + " = (function(){\nvar root;\n\nif ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {\n  " + (file != null ? file.replace(/\.(lsr|lmd)/, '') + ' = ' : '') + "root = {};\n  global = window;\n} else {\n  root = typeof exports !== 'undefined' && exports !== null ? exports : this;\n  Parse = require('./parse');\n  Leisure = require('./leisure');" + (includeStd ? "\n  Leisure.req('./prelude');\n  Leisure.req('./std');" : '') + "\n  Prim = require('./prim');\n  ReplCore = require('./replCore');\n  Repl = require('./repl');\n}\nroot.defs = {};\nroot.tokenDefs = [];\nroot.macros = {};\n\n" + localPrelude + "\n\nprocessResult(\nPrim.codeMonad(function(){})\n);";
    names = globals;
    prev = Parse.Nil;
    if (err) throwError(err);
    defs = [];
    rest = contents;
    varOut = '';
    _ref = globals.toArray();
    for (i = 0, _len = _ref.length; i < _len; i++) {
      v = _ref[i];
      if (i > 0) varOut += ",";
      varOut += " " + (Parse.nameSub(v));
    }
    globals = globals.append(getGlobals());
    while (rest && rest.trim()) {
      if (loud > 1 && prev !== names && names !== Parse.Nil) {
        console.log("Compiling function: " + (names.head()));
      }
      oldRest = rest;
      _ref2 = Leisure.compileNext(rest, globals, null, check, nomacros, 'Parse.', debug), ast = _ref2[0], err = _ref2[1], rest = _ref2[2];
      if ((ast != null ? ast.leisureName : void 0) != null) {
        prev = ast.leisureName;
        names = names.tail();
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
        ast.src = "//" + (nm != null ? nm + ' = ' : '') + (escape(Parse.print(ast))) + "\n" + (nm != null ? "root.defs." + (Parse.nameSub(nm)) + " = " + (Parse.nameSub(nm)) + " = " : "") + ast.src;
        src = ast.leisureName ? (defs.push(Parse.nameSub(ast.leisureName)), ast.src) : "processResult(" + ast.src + ")";
        out += "" + src + ";\n";
        _ref3 = [vars.a[0], vars.c[0], vars.r[0]], a = _ref3[0], c = _ref3[1], r = _ref3[2];
        if (handle) handlerFunc(ast, null, a, c, r, code);
      }
    }
    out += "\n//if (typeof window !== 'undefined' && window !== null) {\n//  Leisure.processTokenDefs(root.tokenDefs);\n//}\nreturn root;\n}).call(this)";
    if (errs !== '') throwError("Errors compiling " + file + ": " + errs);
    return out;
  };

  getGlobals = function getGlobals() {
    return Leisure.eval('leisureGetFuncs()');
  };

  showAst = function showAst(ast) {
    if (ast != null) {
      return "(" + (Parse.print(ast)) + ")";
    } else {
      return "";
    }
  };

  findDefs = function findDefs(contents, nomacros, loud) {
    var ast, auto, err, errs, globals, line, oldRest, prevName, rest, _ref;
    auto = Parse.dlempty;
    errs = '';
    globals = Parse.Nil;
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
          errs = "" + errs + err + "\n";
        }
      } else {
        line = oldRest.substring(0, (rest != null ? oldRest.length - rest.length : oldRest.length));
        if (line.match(/(^|\n)#@auto/)) {
          auto = Parse.dlappend(auto, Parse.dlnew(line));
        }
      }
      if (ast != null ? ast.leisureName : void 0) {
        prevName = ast.leisureName;
        if (loud > 2) console.log("Found function: " + ast.leisureName);
        if (globals != null ? globals.find(function(v) {
          return v === ast.leisureName && !ast.leisureTypeAssertions;
        }) : void 0) {
          throwError("Attempt to redefine function: " + ast.leisureName + (showAst(ast)));
        }
        globals = Parse.cons(ast.leisureName, globals);
      }
    }
    return [globals.reverse(), errs, auto(Parse.Nil)];
  };

  root.processLine = processLine;

  root.setCompiler = setCompiler;

  root.setHelp = setHelp;

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

  root.prelude = prelude;

  root.errString = errString;

  root.setIncludeStd = setIncludeStd;

}).call(this);
