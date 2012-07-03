
/*
Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/

(function() {
  var Code, Nil, Parse, Scanner, astAtOffset, astBrackets, baseTokenPat, between, bracket, bracketApplyParts, brackets, bracketsForApply, compileNext, cons, contexts, ctx, declScanner, define, defineForward, defineToken, dgen, dlappend, dlempty, dlnew, escapeRegexpChars, evalCompiledAst, evalFunc, evalNext, findFuncApply, findFuncs, foldLeft, forward, freeVar, funcAst, funcAstAtOffset, funcContext, funcContextSource, gen, genCode, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getNthBody, getRefVar, ifParsed, indent, laz, lexCons, lexDlappend, lexDlempty, lexDlnew, linePat, listToAst, mkProto, nameAst, nameSub, numberAst, parse, parseFull, prefix, primFoldLeft, processDefs, req, root, setDataType, setEvalFunc, setNumber, setType, snip, tokenPat, within, wrap, wrapContext, wrapContextBody, wrapContextVars, wrapLazyContext;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Leisure = root = {};
    Parse = window.Parse;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Parse = require('./parse');
  }

  nameSub = Parse.nameSub, setDataType = Parse.setDataType, setType = Parse.setType, mkProto = Parse.mkProto, cons = Parse.cons, dlempty = Parse.dlempty, dlnew = Parse.dlnew, dlappend = Parse.dlappend, lexCons = Parse.lexCons, lexDlempty = Parse.lexDlempty, lexDlnew = Parse.lexDlnew, lexDlappend = Parse.lexDlappend, define = Parse.define, listToAst = Parse.listToAst, evalFunc = Parse.evalFunc, Nil = Parse.Nil, cons = Parse.cons, getAstType = Parse.getAstType, getRefVar = Parse.getRefVar, getLitVal = Parse.getLitVal, getLambdaBody = Parse.getLambdaBody, getLambdaVar = Parse.getLambdaVar, getApplyFunc = Parse.getApplyFunc, getApplyArg = Parse.getApplyArg, ifParsed = Parse.ifParsed, snip = Parse.snip, Scanner = Parse.Scanner;

  declScanner = new Scanner();

  declScanner.defToken('::');

  escapeRegexpChars = function escapeRegexpChars(str) {
    return str.replace(/([\][().\\*+?{}|])/g, '\\$1');
  };

  forward = {};

  baseTokenPat = /[().\\]| +|[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*(\n|$)/;

  tokenPat = new RegExp("\\n *|" + baseTokenPat.source);

  linePat = /^((?:\s*\n|#[^\n]*\n)*)([^=\n]*)(=[.)M]=|=\([^=]+=|=)?/;

  ctx = global;

  global.leisureGetFuncs = function leisureGetFuncs() {
    return global.leisureFuncNames;
  };

  global.noredefs = true;

  funcAstAtOffset = function funcAstAtOffset(func, nodeOffset) {
    var ast;
    ast = funcAst(func);
    if (ast) {
      return astAtOffset(ast, nodeOffset);
    } else {
      return null;
    }
  };

  funcAst = function funcAst(func) {
    var _ref;
    if (func.src) {
      return (_ref = func.ast) != null ? _ref : (func.ast = parseFull(func.src)[0]);
    } else {
      return null;
    }
  };

  astAtOffset = function astAtOffset(ast, offset) {
    if (ast.leisureNodeNumber === offset) {
      return ast;
    } else {
      switch (getAstType(ast)) {
        case 'lambda':
          return astAtOffset(getLambdaBody(ast), offset);
        case 'apply':
          if (ast.leisureNodeNumber > offset) {
            return astAtOffset(getApplyFunc(ast), offset);
          } else {
            return astAtOffset(getApplyArg(ast), offset);
          }
      }
    }
  };

  funcContextSource = function funcContextSource(funcName, offset) {
    var ast, end, func, start;
    func = global[Leisure.nameSub(funcName)]();
    ast = Leisure.funcAstAtOffset(func, offset);
    start = ast.leisureStart;
    end = ast.leisureEnd;
    return [func.src, start, end, func, ast];
  };

  contexts = {};

  funcContext = function funcContext(funcName, offset) {
    var cur;
    cur = contexts[funcName];
    if (!(cur != null)) cur = contexts[funcName] = [];
    if (!cur[offset]) cur[offset] = [funcName, offset];
    return cur[offset];
  };

  nameAst = function nameAst(nm, ast) {
    if (!ast.leisureName) {
      ast.leisureName = nm;
      return ast.toString = function toString() {
        return "{" + nm + "}";
      };
    }
  };

  evalCompiledAst = function evalCompiledAst(ast) {
    if (ast.lits.length) {
      return evalFunc("(function(__lits){\nreturn " + ast.src + "})")(ast.lits);
    } else {
      return Parse.evalFunc(ast.src);
    }
  };

  define('eval', function() {
    return function(ast) {
      return evalCompiledAst(dgen(ast()));
    };
  });

  between = function between(start, end, pos) {
    return start <= pos && pos <= end;
  };

  within = function within(ast, pos) {
    return between(ast.leisureStart, ast.leisureEnd, pos);
  };

  brackets = function brackets(start, end) {
    return cons(start, cons(end, Nil));
  };

  astBrackets = function astBrackets(ast) {
    return brackets(ast.leisureStart, ast.leisureEnd);
  };

  bracket = function bracket(ast, pos) {
    if ((ast != null) && within(ast, pos)) {
      switch (getAstType(ast)) {
        case 'ref':
        case 'lit':
          if (within(ast, pos)) {
            return cons(astBrackets(ast), Nil);
          } else {
            return Nil;
          }
          break;
        case 'lambda':
          if (between(ast.leisureStart, ast.leisureNameEnd, pos)) {
            return cons(brackets(ast.leisureStart, ast.leisureNameEnd), Nil);
          } else {
            return bracket(getLambdaBody(ast, pos));
          }
          break;
        case 'apply':
          return bracketsForApply(ast, ast, pos);
      }
    } else {
      return Nil;
    }
  };

  bracketsForApply = function bracketsForApply(apply, part, pos) {
    var arg, func, _ref;
    arg = getApplyArg(part);
    if (within(arg, pos)) {
      if (arg.type === 'apply') {
        return bracketsForApply(arg, arg, pos);
      } else if (arg.type === 'lambda') {
        return bracket(arg, pos);
      } else {
        return (bracketApplyParts(apply))(Nil);
      }
    } else {
      func = getApplyFunc(part);
      if (func.type === 'apply') {
        return bracketsForApply(apply, getApplyFunc(part), pos);
      } else if ((_ref = func.type) === 'ref' || _ref === 'lit') {
        return (bracketApplyParts(apply))(Nil);
      } else {
        return bracket(func, pos);
      }
    }
  };

  bracketApplyParts = function bracketApplyParts(ast) {
    var astFunc, start;
    astFunc = getApplyFunc(ast);
    start = (function() {
      switch (getAstType(astFunc)) {
        case 'ref':
        case 'lit':
        case 'lambda':
          return dlnew(astBrackets(astFunc));
        case 'apply':
          return bracketApplyParts(astFunc);
      }
    })();
    return dlappend(start, dlnew(astBrackets(getApplyArg(ast))));
  };

  findFuncs = function findFuncs(ast) {
    if (!ast || (getAstType(ast)) !== 'apply') {
      return dlempty;
    } else {
      return findFuncApply(ast, 0);
    }
  };

  findFuncApply = function findFuncApply(apply, count) {
    if ((getAstType(apply)) === 'apply') {
      return dlappend(findFuncApply(getApplyFunc(apply), count + 1), findFuncs(getApplyArg(apply)));
    } else if ((getAstType(apply)) === 'ref') {
      return dlnew(cons(apply, cons(count, Nil)));
    } else {
      return dlempty;
    }
  };

  wrapContextVars = function wrapContextVars(name, ast, code, top) {
    return "(function(){\n  var ctx = Leisure.contextStack\n  " + (indent(code)) + "\n})()";
  };

  indent = function indent(str, amt) {
    var i, idt;
    amt = amt != null ? amt : 2;
    idt = '\n';
    for (i = 0; 0 <= amt ? i <= amt : i >= amt; 0 <= amt ? i++ : i--) {
      idt += ' ';
    }
    return str.replace(/\n/g, idt);
  };

  wrapContext = function wrapContext(name, ast, code, top) {
    if (name != null) {
      return wrapContextVars(name, ast, wrapContextBody(name, ast, code, top), top);
    } else {
      return code;
    }
  };

  wrapLazyContext = function wrapLazyContext(name, ast, code, top) {
    if (name != null) {
      return wrapContextVars(name, ast, "return function(){" + (indent(wrapContextBody(name, ast, code, top))) + "};", top);
    } else {
      return "(function(){return " + code + "})";
    }
  };

  wrapContextBody = function wrapContextBody(name, ast, code, top) {
    return "" + (top ? '' : "var oldCtx = ctx;\n  ") + "\nvar ctx = Leisure.contextStack;\nLeisure.contextStack = Leisure.cons(Leisure.funcContext('" + name + "', " + ast.leisureNodeNumber + "), " + (top ? 'ctx' : 'oldCtx') + ")\ntry {\n  return " + (indent(code)) + ";\n} catch (err) {\n  if (!err.leisureContext) {\n    err.leisureContext = Leisure.contextStack;\n  }\n  throw err;\n} finally {\n  Leisure.contextStack = ctx\n}";
  };

  Code = (function() {

    function Code(main, vars, err, global, debug) {
      var _ref, _ref2, _ref3, _ref4;
      this.main = main;
      this.vars = vars;
      this.err = err;
      this.global = global;
      this.debug = debug;
      this.main = (_ref = this.main) != null ? _ref : '';
      this.vars = (_ref2 = this.vars) != null ? _ref2 : Nil;
      this.err = (_ref3 = this.err) != null ? _ref3 : '';
      this.global = (_ref4 = this.global) != null ? _ref4 : Nil;
    }

    Code.prototype.copyWith = function copyWith(main, vars, err, global, debug) {
      return new Code(main != null ? main : this.main, vars != null ? vars : this.vars, err != null ? err : this.err, global != null ? global : this.global, debug != null ? debug : this.debug);
    };

    Code.prototype.setVars = function setVars(v) {
      return this.copyWith(null, v);
    };

    Code.prototype.addVar = function addVar(v) {
      return this.copyWith(null, cons(v, this.vars));
    };

    Code.prototype.addErr = function addErr(e) {
      return this.copyWith(null, null, "" + this.err + e + "\n");
    };

    Code.prototype.setGlobal = function setGlobal(v) {
      return this.copyWith(null, null, null, v);
    };

    Code.prototype.setDebug = function setDebug(d) {
      return this.copyWith(null, null, null, null, d);
    };

    Code.prototype.reffedValue = function reffedValue(deref) {
      if (deref) {
        return this.copyWith(this.main + "()");
      } else {
        return this;
      }
    };

    Code.prototype.unreffedValue = function unreffedValue(deref, name, ast, top) {
      if (deref) {
        return this;
      } else {
        return this.lazy(name, ast, top);
      }
    };

    Code.prototype.memoize = function memoize(deref, name, ast, top) {
      var tmp;
      if (deref) {
        return this;
      } else {
        tmp = this.copyWith("$m || ($m = (" + this.main + "))").lazy(name, ast, top);
        return tmp.copyWith("(function(){var $m; return " + tmp.main + "})()");
      }
    };

    Code.prototype.lazy = function lazy(name, ast, top) {
      if (!this.debug || !((name != null) && (ast.leisureNodeNumber != null))) {
        return this.copyWith("(function(){return " + this.main + "})");
      } else {
        return this.copyWith(wrapLazyContext(name, ast, this.main, top));
      }
    };

    Code.prototype.grabContext = function grabContext(ast) {
      if (getAstType(ast === 'lambda')) {
        return this.copyWith("");
      } else {
        return this.copyWith("");
      }
    };

    return Code;

  })();

  dgen = function dgen(ast, lazy, name, globals, tokenDef, namespace, src, debug) {
    var code, jsCode, n, res;
    debug = false;
    ast.lits = [];
    res = [];
    code = gen(ast, new Code().setDebug(debug).setGlobal(cons(name, globals != null ? globals : global.leisureFuncNames)), ast.lits, Nil, true, name, namespace, true);
    if (code.err !== '') {
      ast.err = code.err;
    } else {
      jsCode = !debug || (getAstType(ast)) === 'apply' || !name ? "(" + code.main + ")" : wrapContext(name, ast, code.main, true);
      if (name) {
        n = nameSub(name);
        jsCode = (getAstType(ast)) === 'lambda' ? "(function() {var f = " + jsCode + "; return function " + n + "(){return f;}})()" : "(function " + n + "() {return (" + jsCode + ");})";
      }
      ast.src = name != null ? "" + (namespace != null ? namespace : '') + (tokenDef === '=M=' ? 'defineMacro' : 'define') + "('" + name + "', " + jsCode + ", " + ((ast.leisurePrefixCount || 1) - 1) + ", " + (src ? JSON.stringify(src) : '""') + ");" + ((tokenDef != null) && tokenDef !== '=' ? "\nroot.tokenDefs.push('" + name + "', '" + tokenDef + "');" : '') + "\n" : jsCode;
    }
    ast.globals = code.global;
    return ast;
  };

  wrap = function wrap(name, ast, v, body, namespace, debug) {
    var _ref;
    body = "function(" + v + "){return " + body + ";}";
    if (!(ast.exprType != null) && !ast.exprDataType) {
      return body;
    } else {
      return "" + (namespace != null ? namespace : '') + (ast.exprType ? 'setType' : 'setDataType') + "(" + body + ", '" + ((_ref = ast.exprType) != null ? _ref : ast.exprDataType) + "')";
    }
  };

  gen = function gen(ast, code, lits, vars, deref, name, namespace, top) {
    var aplCode, arg, argCode, bodyCode, func, funcCode, src, v, val;
    switch (getAstType(ast)) {
      case 'ref':
        val = getRefVar(ast);
        if (val.lambda) {
          return code.addErr("attempt to use lambda as a variable");
        } else {
          code = code.copyWith(nameSub(val)).reffedValue(deref);
          if (vars.find(function(v) {
            return v === val;
          })) {
            return code.addVar(val);
          } else if ((ctx[nameSub(val)] != null) || code.global.find(function(v) {
            return v === val;
          }) || (forward[nameSub(val)] != null)) {
            return code;
          } else if (typeof val === 'number') {
            return code.copyWith(JSON.stringify(scanTok(val))).unreffedValue(deref, name, ast, top);
          } else {
            return code.addErr("attempt to use free variable: " + val);
          }
        }
        break;
      case 'lit':
        val = getLitVal(ast);
        src = typeof val === 'function' || typeof val === 'object' ? (lits.push(val), "(function(){\nreturn __lits[" + (lits.length - 1) + "]\n})") : JSON.stringify(val);
        return code.copyWith(src).unreffedValue(deref, name, ast, top);
      case 'lambda':
        v = getLambdaVar(ast);
        bodyCode = gen(getLambdaBody(ast), code, lits, cons(v, vars), true, name, namespace, false);
        bodyCode = bodyCode.setVars(bodyCode.vars.removeAll(function(bv) {
          return bv === v;
        }));
        return bodyCode.copyWith(wrap(name, ast, nameSub(v), bodyCode.main, namespace)).memoize(deref, name, ast, top);
      case 'apply':
        func = getApplyFunc(ast);
        if (getAstType(func) === 'lit') {
          return code.addErr("Attempt to use lit as function: " + (getLitVal(func)));
        } else if (freeVar(func, vars, code.global)) {
          return code.addErr("Attempt to use free variable as function: " + (getRefVar(func)));
        } else {
          arg = getApplyArg(ast);
          funcCode = gen(func, code, lits, vars, true, name, namespace, false);
          argCode = gen(arg, funcCode, lits, vars, false, name, namespace, false);
          aplCode = code.debug ? wrapContext(name, ast, "" + funcCode.main + "(" + argCode.main + ")", top) : "" + funcCode.main + "(" + argCode.main + ")";
          return argCode.copyWith(aplCode).memoize(deref, name, ast, top);
        }
        break;
      default:
        return code.addErr("Unknown object type in gen: " + ast);
    }
  };

  freeVar = function freeVar(ast, vars, globals) {
    var rv;
    if ((getAstType(ast)) === 'ref') {
      rv = getRefVar(ast);
      return !ctx[nameSub(rv)] && !vars.find(function(v) {
        return v === rv;
      }) && !globals.find(function(v) {
        return v === rv;
      }) && !forward[nameSub(rv)];
    } else {
      return false;
    }
  };

  laz = function laz(val) {
    return function() {
      return val;
    };
  };

  defineToken = function defineToken(name, def) {
    if (def !== '=M=') {
      if (def[1] === '(') {
        return Parse.defGroup(name, def.substring(2, def.length - 1));
      } else if (def[1] !== ')') {
        return Parse.defToken(name);
      }
    }
  };

  prefix = function prefix(name, str) {
    return (name.length > 1 ? '\\' + name.slice(1).join('. \\') + '.' : '') + str;
  };

  getNthBody = function getNthBody(ast, n) {
    if (n === 1) {
      return ast;
    } else {
      return getNthBody(getLambdaBody(ast), n - 1);
    }
  };

  defineForward = function defineForward(name) {
    return forward[nameSub(name())] = true;
  };

  compileNext = function compileNext(line, globals, parseOnly, check, nomacros, namespace, debug) {
    var def, defType, errPrefix, leading, matched, name, nm, pfx, rest1;
    if (line[0] === '=') {
      rest1 = line.substring(1);
      return ifParsed((nomacros ? parse(rest1) : parseFull(rest1)), (function(ast, rest) {
        ast.leisureCodeOffset = 0;
        return genCode(ast, null, globals, null, rest, parseOnly, namespace, rest1.substring(0, rest1.length - rest.length).trim(), debug);
      }), "Error compiling expr " + (snip(line)));
    } else if ((def = line.match(linePat)) && def[1].length !== line.length) {
      matched = def[0], leading = def[1], name = def[2], defType = def[3];
      if (name[0] === ' ') {
        name = null;
        defType = null;
        nm = null;
      } else {
        nm = defType ? name.trim().split(/\s+/) : null;
      }
      rest1 = line.substring((defType ? matched : leading).length);
      if (nm) {
        if (check && globals.find(function(v) {
          return v === nm[0];
        })) {
          return [null, "Attempt to redefine function: " + nm[0] + " " + (snip(rest1)), null];
        } else {
          if (defType && defType !== '=') defineToken(nm[0], defType);
          pfx = prefix(nm, rest1);
          errPrefix = "Error while compiling " + nm + ": ";
          return ifParsed((nomacros ? parse(pfx) : parseFull(pfx)), (function(ast, rest) {
            var bod;
            ast.leisureCodeOffset = ast.leisureDefPrefix = line.length - pfx.length;
            ast.leisureBase = getNthBody(ast, nm.length);
            nameAst(nm[0], ast);
            bod = ast;
            if (nm.length > 1) bod = getNthBody(ast, nm.length);
            if (getAstType(bod) === 'lambda') {
              bod.exprType = nm[0];
              ast.exprDataType = nm[0];
            }
            if (nm.length === 1) nameAst(nm[0], ast);
            ast.leisurePrefixSrcLen = pfx.length;
            ast.leisurePrefixCount = nm.length;
            ast.leisureSource = pfx.substring(0, pfx.length - rest.length).trim();
            return genCode(ast, nm[0], globals, defType, rest, parseOnly, namespace, ast.leisureSource, debug);
          }), errPrefix);
        }
      } else {
        return ifParsed((nomacros ? parse(rest1) : parseFull(rest1)), (function(ast, rest) {
          ast.leisureCodeOffset = line.length - rest1.length;
          ast.leisureBase = ast;
          ast.leisureSource = rest1.substring(0, rest1.length - rest.length).trim();
          return genCode(ast, null, globals, null, rest, parseOnly, namespace, ast.leisureSource, debug);
        }), "Error compiling expr:  " + (snip(line)));
      }
    } else {
      return [null, null, null];
    }
  };

  genCode = function genCode(ast, name, globals, defType, rest, parseOnly, namespace, src, debug) {
    if (!parseOnly) {
      dgen(ast, false, name, globals, defType, namespace, src, debug);
    }
    if ((ast.err != null) && (name != null)) {
      ast.err = "Error while compiling " + name + ": " + ast.err;
    }
    return [ast, ast.err, rest];
  };

  evalNext = function evalNext(code, namespace, debug) {
    var ast, err, nm, rest, result, _ref;
    _ref = compileNext(code, null, null, null, null, namespace, debug), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (ast) {
      if (ast.leisureName) {
        try {
          nm = nameSub(ast.leisureName);
          if (ctx[nm]) evalFunc("" + nm + " = null");
          evalCompiledAst(ast);
          result = "Defined: " + ast.leisureName;
        } catch (err) {
          console.log(err.stack);
          result = err;
          ast.err = err;
        }
        return [ast, result];
      } else {
        try {
          result = evalCompiledAst(ast);
        } catch (err) {
          ast.err = err;
        }
        return [ast, result];
      }
    } else {
      return [
        {
          err: err
        }, err
      ];
    }
  };

  parse = function parse(str) {
    var ret;
    ret = Parse.parse(str);
    if (ret[0]) ret[0] = numberAst(ret[0], 0);
    return ret;
  };

  parseFull = function parseFull(str) {
    var ast, err, rest, _ref;
    _ref = Parse.parseFull(str), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (ast) ast = numberAst(ast, 0);
    return [ast, err, rest];
  };

  numberAst = function numberAst(ast, number) {
    switch (getAstType(ast)) {
      case 'ref':
      case 'lit':
        return setNumber(ast, number);
      case 'lambda':
        return setNumber(ast, (numberAst(getLambdaBody(ast), number)).leisureNodeNumber + 1);
      case 'apply':
        return setNumber(ast, (numberAst(getApplyArg(ast), (numberAst(getApplyFunc(ast), number)).leisureNodeNumber + 1)).leisureNodeNumber + 1);
    }
  };

  setNumber = function setNumber(ast, number) {
    ast.leisureNodeNumber = number;
    return ast;
  };

  setEvalFunc = function setEvalFunc(ct, func) {
    ctx = root.ctx = ct;
    return root.eval = evalFunc = Parse.evalFunc = func;
  };

  req = function req(name, gl) {
    return processDefs(require(name), gl);
  };

  processDefs = function processDefs(res, gl) {
    var i, v, _ref;
    if (res) {
      gl = gl != null ? gl : global;
      if (res.defs != null) {
        _ref = res.defs;
        for (i in _ref) {
          v = _ref[i];
          gl[i] = v;
        }
      }
      res.leisureFuncNames = ctx.leisureFuncNames;
      res.ctx = ctx;
    }
    return res;
  };

  foldLeft = function foldLeft(func, val, array) {
    return primFoldLeft(func, val, array, 0);
  };

  primFoldLeft = function primFoldLeft(func, val, array, index) {
    if (index < array.length) {
      return primFoldLeft(func, func(val, array[index]), array, index + 1);
    } else {
      return val;
    }
  };

  root.setEvalFunc = setEvalFunc;

  root.eval = evalFunc;

  root.gen = dgen;

  root.laz = laz;

  root.compileNext = compileNext;

  root.evalNext = evalNext;

  root.astEval = function astEval(ast) {
    return evalCompiledAst(dgen(ast));
  };

  root.linePat = linePat;

  root.req = req;

  root.processDefs = processDefs;

  root.bracket = bracket;

  root.findFuncs = findFuncs;

  root.foldLeft = foldLeft;

  root.defineForward = defineForward;

  root.funcAstAtOffset = funcAstAtOffset;

  root.funcAst = funcAst;

  root.funcContext = funcContext;

  root.contextStack = Nil;

  root.funcContextSource = funcContextSource;

  root.indent = indent;

  root.parse = parse;

  root.parseFull = parseFull;

}).call(this);
