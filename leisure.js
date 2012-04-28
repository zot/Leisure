
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
  var CNil, Code, Cons, Nil, addDef, append, apply, astBrackets, astPrint, baseGroupingPat, baseTokenPat, between, bracePat, bracify, bracket, bracketApplyParts, brackets, bracketsForApply, burp, charCodes, codeChars, commentPat, compileNext, cons, continueApply, continueApply2, createDefinition, ctx, define, defineMacro, defineToken, dgen, dlappend, dlnew, eatAllWhitespace, embeddedBracePat, escapeRegexpChars, evalCompiledAst, evalFunc, evalNext, findGroup, first, freeVar, gen, genCode, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getMacro, getNesting, getNthBody, getRefVar, getType, groupCloses, groupOpens, groupingPat, ifParsed, indentPat, lambda, laz, linePat, lit, ll, nameAst, nameSub, nextGroupTok, nextTok, nextTok2, nextTok2IgnoreNL, nextTokWithNl, order, parenthesizeTokens, parenthify, parse, parseApply, parseApply2, parseApplyNew, parseFull, parseIf, parseLambda, parseLambda2, parseName, parseName2, parseTerm, parseTerm2, pos, prefix, prepare, printGroups, processDefs, processTokenDefs, ref, req, root, scanName, scanTok, second, setContext, setDataType, setEvalFunc, setType, snip, soff, specials, srcApply, srcLambda, srcPrint, stripComments, stripSemis, subnextTokWithNl, substituteMacros, tag, tag2, tokPos, tokenPat, tokenPat2, tokens, topBracePat, warnFreeVariable, within, wordPat, wrap, wrapDebug, wrapNoDebug,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Leisure = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  escapeRegexpChars = function escapeRegexpChars(str) {
    return str.replace(/([\][().\\*+?{}|])/g, '\\$1');
  };

  wordPat = /^[^\s]*$/;

  baseTokenPat = /[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|[().\\\n;]| +|#[^\n]*\n/;

  baseGroupingPat = /\n *|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*\n/;

  tokenPat = baseTokenPat;

  tokenPat2 = new RegExp("\\n *|" + baseTokenPat.source);

  groupingPat = new RegExp("" + baseGroupingPat.source + "|" + (escapeRegexpChars('[()]')));

  specials = '[]().*+?|';

  linePat = /^((?:\s*\n|#[^\n]*\n)*)([^=\n]*)(=[.)M]=|=\([^=]+=|=)?/;

  topBracePat = /^((?:;*)(?:\s*|#[^;]*;)*[^=;{}]*(?:=[.)M]=|=\([^=]+=|=)\s*)?((?:`(?:[^`\n]|\\[\\`])*`|'(?:[^'\n]|\\[\\'])*'|"(?:[^"\n]|\\[\\"])*"|[^;{};'"`])*)([{};])/;

  bracePat = /^()((?:`(?:[^`\n]|\\[\\`])*`|'(?:[^'\n]|\\[\\'])*'|"(?:[^"\n]|\\[\\"])*"|[^\n{};'`"])*)([{};])/;

  embeddedBracePat = /^()((?:`(?:[^`\n]|\\[\\`])*`|'(?:[^'\n]|\\[\\'])*'|"(?:[^"\n]|\\[\\"])*"|[^{};'`"])*)([{};])/;

  order = [];

  warnFreeVariable = [];

  charCodes = {
    "'": '$a',
    ',': '$b',
    '$': '$c',
    '@': '$d',
    '?': '$e',
    '/': '$f',
    '*': '$g',
    '&': '$h',
    '^': '$i',
    '!': '$k',
    '`': '$l',
    '~': '$m',
    '-': '$n',
    '+': '$o',
    '=': '$p',
    '|': '$q',
    '[': '$r',
    ']': '$s',
    '{': '$t',
    '}': '$u',
    '"': '$v',
    ':': '$w',
    ';': '$x',
    '<': '$y',
    '>': '$z',
    '%': '$A'
  };

  codeChars = new function() {
    var char, code;
    for (char in charCodes) {
      code = charCodes[char];
      this[code.substring(1)] = char;
    }
    return this;
  };

  global.leisureFuncs = {};

  global.macros = {};

  tokens = {};

  groupOpens = {
    '(': ')'
  };

  groupCloses = {
    ')': 1
  };

  nameSub = function nameSub(name) {
    var code, i, s, _ref;
    s = '_';
    for (i = 0, _ref = name.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      code = charCodes[name[i]];
      s += code != null ? code : name[i];
    }
    return s;
  };

  ctx = global;

  evalFunc = eval;

  Cons = (function() {

    function Cons(head, tail) {
      this.head = head;
      this.tail = tail;
    }

    Cons.prototype.find = function find(func) {
      return func(this.head) || this.tail.find(func);
    };

    Cons.prototype.removeAll = function removeAll(func) {
      var t;
      t = this.tail.removeAll(func);
      if (func(this.head)) {
        return t;
      } else if (t === this.tail) {
        return this;
      } else {
        return cons(this.head, t);
      }
    };

    Cons.prototype.foldl = function foldl(arg, func) {
      return func(this.tail.foldl(arg, func), this.head);
    };

    Cons.prototype.toArray = function toArray() {
      return this.reverse().foldl([], (function(i, el) {
        i.push(el);
        return i;
      }));
    };

    Cons.prototype.toString = function toString() {
      return "Cons(" + (this.toArray().join(', ')) + ")";
    };

    Cons.prototype.reverse = function reverse() {
      return this.rev(Nil);
    };

    Cons.prototype.rev = function rev(result) {
      return this.tail.rev(cons(this.head, result));
    };

    Cons.prototype.equals = function equals(other) {
      var _ref, _ref2;
      return (other != null ? other.constructor : void 0) === Cons && (this.head === other.head || (((_ref = this.head) != null ? _ref.constructor : void 0) === Cons && this.head.equals(other.head))) && (this.tail === other.tail || (((_ref2 = this.tail) != null ? _ref2.constructor : void 0) === Cons && this.tail.equals(other.tail)));
    };

    return Cons;

  })();

  CNil = (function(_super) {

    __extends(CNil, _super);

    function CNil() {
      CNil.__super__.constructor.apply(this, arguments);
    }

    CNil.prototype.find = function find() {
      return false;
    };

    CNil.prototype.removeAll = function removeAll() {
      return this;
    };

    CNil.prototype.foldl = function foldl(arg, func) {
      return arg;
    };

    CNil.prototype.rev = function rev(result) {
      return result;
    };

    CNil.prototype.equals = function equals(other) {
      return (other != null ? other.constructor : void 0) === CNil;
    };

    return CNil;

  })(Cons);

  Nil = new CNil();

  cons = function cons(a, b) {
    return new Cons(a, b);
  };

  dlnew = function dlnew(a) {
    return function(b) {
      return cons(a, b);
    };
  };

  dlappend = function dlappend(a, b) {
    return function(c) {
      return a(b(c));
    };
  };

  append = function append(a, b) {
    if (a === Nil) {
      return b;
    } else {
      return cons(a.head, append(a.tail, b));
    }
  };

  global.leisureFuncNames = ll = Nil;

  global.leisureAddFunc = function leisureAddFunc(nm) {
    return global.leisureFuncNames = ll = cons(nm, ll);
  };

  global.leisureGetFuncs = function leisureGetFuncs() {
    return ll;
  };

  define = function define(name, func) {
    var f, nm;
    nm = nameSub(name);
    func.leisureName = name;
    if (ctx[nm] != null) {
      throw new Error("[DEF] Attempt to redefine definition: " + name);
    }
    f = function f() {
      return func;
    };
    ctx[nm] = ctx.leisureFuncs[nm] = f;
    (evalFunc('leisureAddFunc'))(name);
    return f;
  };

  defineMacro = function defineMacro(name, func) {
    return ctx.macros[name] = func;
  };

  setDataType = function setDataType(func, dataType) {
    if (dataType) func.dataType = dataType;
    return func;
  };

  setType = function setType(func, type) {
    if (type) func.type = type;
    return func;
  };

  nameAst = function nameAst(nm, ast) {
    if (!ast.leisureName) {
      ast.leisureName = nm;
      return ast.toString = function toString() {
        return nm;
      };
    }
  };

  evalCompiledAst = function evalCompiledAst(ast) {
    if (ast.lits.length) {
      return evalFunc("(function(__lits){\nreturn " + ast.src + "})")(ast.lits);
    } else {
      return evalFunc(ast.src);
    }
  };

  define('eval', function(ast) {
    return evalCompiledAst(dgen(substituteMacros(ast())));
  });

  define('lit', setDataType((function(_x) {
    return setType((function(_f) {
      return _f()(_x);
    }), 'lit');
  }), 'lit'));

  define('ref', setDataType((function(_x) {
    return setType((function(_f) {
      return _f()(_x);
    }), 'ref');
  }), 'ref'));

  define('lambda', setDataType((function(_v) {
    return function(_f) {
      return setType((function(_g) {
        return _g()(_v)(_f);
      }), 'lambda');
    };
  }), 'lambda'));

  define('apply', setDataType((function(_func) {
    return function(_arg) {
      return setType((function(_f) {
        return _f()(_func)(_arg);
      }), 'apply');
    };
  }), 'apply'));

  getType = function getType(f) {
    var t;
    t = typeof f;
    return (t === 'function' && (f != null ? f.type : void 0)) || ("*" + t);
  };

  lit = _lit();

  ref = _ref();

  lambda = _lambda();

  apply = _apply();

  getAstType = function getAstType(f) {
    return f.type;
  };

  first = function first() {
    return function(a) {
      return a;
    };
  };

  second = function second() {
    return function(a) {
      return function(b) {
        return b();
      };
    };
  };

  getRefVar = function getRefVar(r) {
    return r(first)();
  };

  getLitVal = function getLitVal(l) {
    return l(first)();
  };

  getLambdaVar = function getLambdaVar(l) {
    return l(first);
  };

  getLambdaBody = function getLambdaBody(l) {
    return l(second);
  };

  getApplyFunc = function getApplyFunc(a) {
    return a(first);
  };

  getApplyArg = function getApplyArg(a) {
    return a(second);
  };

  astPrint = function astPrint(ast, res) {
    var arg, func, isFirst, val;
    isFirst = !res;
    res = res != null ? res : [];
    switch (getAstType(ast)) {
      case 'ref':
        res.push('ref ');
        val = getRefVar(ast);
        if (val.lambda) {
          throw new Error("Attempt to use lambda in ref, instead of string or number: " + val);
        }
        res.push(val);
        break;
      case 'lit':
        res.push('lit ');
        val = getLitVal(ast);
        res.push((val != null ? val.lambda : void 0) ? "{" + val.lambda.toString() + "}" : val);
        break;
      case 'lambda':
        res.push('lambda ');
        res.push(getLambdaVar(ast));
        res.push(' . ');
        astPrint(getLambdaBody(ast), res);
        break;
      case 'apply':
        func = getApplyFunc(ast);
        arg = getApplyArg(ast);
        res.push('apply (');
        astPrint(getApplyFunc(ast), res);
        res.push(') (');
        astPrint(getApplyArg(ast), res);
        res.push(')');
        break;
      default:
        throw new Error("Unknown type of object in AST: " + ast);
    }
    return isFirst && res.join('');
  };

  srcPrint = function srcPrint(str, ast) {
    switch (getAstType(ast)) {
      case 'ref':
      case 'lit':
        return "[" + (getAstType(ast)) + " " + (str.substring(ast.leisureStart, ast.leisureEnd)) + "]";
      case 'lambda':
        return "\\" + (srcLambda(str, ast, getLambdaVar(ast), getLambdaBody(ast)));
      case 'apply':
        return srcApply(str, getApplyFunc(ast), getApplyArg(ast));
    }
  };

  srcLambda = function srcLambda(str, lambda, varname, body) {
    var vsrc;
    vsrc = str.substring(lambda.leisureStart, lambda.leisureNameEnd);
    if (body.type === 'lambda') {
      return body(function() {
        return function(v2) {
          return function(b) {
            return "[" + vsrc + "] [" + (srcLambda(str, body, v2(), b())) + "]";
          };
        };
      });
    } else {
      return "[" + vsrc + "] . [" + (srcPrint(str, body)) + "]";
    }
  };

  srcApply = function srcApply(str, func, arg) {
    var a, f;
    f = func.type === 'lambda' ? "(" + (srcPrint(str, func)) + ")" : srcPrint(str, func);
    a = arg.type === 'apply' ? "(" + (srcPrint(str, arg)) + ")" : srcPrint(str, arg);
    return "" + f + " " + a;
  };

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
    if (within(ast, pos)) {
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

  Code = (function() {

    function Code(main, subfuncs, fcount, mcount, vars, err, global) {
      var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      this.main = main;
      this.subfuncs = subfuncs;
      this.fcount = fcount;
      this.mcount = mcount;
      this.vars = vars;
      this.err = err;
      this.global = global;
      this.main = (_ref = this.main) != null ? _ref : '';
      this.subfuncs = (_ref2 = this.subfuncs) != null ? _ref2 : '';
      this.fcount = (_ref3 = this.fcount) != null ? _ref3 : 0;
      this.mcount = (_ref4 = this.mcount) != null ? _ref4 : 0;
      this.vars = (_ref5 = this.vars) != null ? _ref5 : Nil;
      this.err = (_ref6 = this.err) != null ? _ref6 : '';
      this.global = (_ref7 = this.global) != null ? _ref7 : Nil;
    }

    Code.prototype.copyWith = function copyWith(main, subfuncs, fcount, mcount, vars, err, global) {
      return new Code(main != null ? main : this.main, subfuncs != null ? subfuncs : this.subfuncs, fcount != null ? fcount : this.fcount, mcount != null ? mcount : this.mcount, vars != null ? vars : this.vars, err != null ? err : this.err, global != null ? global : this.global);
    };

    Code.prototype.addErr = function addErr(e) {
      return this.copyWith(null, null, null, null, null, "" + this.err + e + "\n");
    };

    Code.prototype.setGlobal = function setGlobal(v) {
      return this.copyWith(null, null, null, null, null, null, v);
    };

    Code.prototype.addVar = function addVar(v) {
      return this.copyWith(null, null, null, null, cons(v, this.vars), null);
    };

    Code.prototype.setVars = function setVars(v) {
      return this.copyWith(null, null, null, null, v, null);
    };

    Code.prototype.resetMemo = function resetMemo(n) {
      return this.copyWith(null, null, null, n != null ? n : 0);
    };

    Code.prototype.reffedValue = function reffedValue(deref) {
      if (deref) {
        return this.copyWith(this.main + "()");
      } else {
        return this;
      }
    };

    Code.prototype.unreffedValue = function unreffedValue(deref) {
      if (deref) {
        return this;
      } else {
        return this.copyWith("(function(){return " + this.main + "})");
      }
    };

    Code.prototype.useSubfunc = function useSubfunc() {
      return this;
    };

    Code.prototype.memoize = function memoize(deref) {
      if (deref) {
        return this.unreffedValue(deref);
      } else {
        return this.copyWith("(function(){var $m; return function(){return $m || ($m = (" + this.main + "))}})()");
      }
    };

    return Code;

  })();

  dgen = function dgen(ast, lazy, name, globals, tokenDef) {
    var code, res;
    ast.lits = [];
    res = [];
    code = gen(ast, new Code().setGlobal(cons(name, globals != null ? globals : Nil)), ast.lits, Nil, true, name);
    if (code.err !== '') {
      ast.err = code.err;
    } else if (code.subfuncs.length) {
      ast.src = "(function(){" + ((tokenDef != null) && tokenDef !== '=' ? "root.tokenDefs.push('" + name + "', '" + tokenDef + "')\n" : '') + "\n  " + code.subfuncs + "\n  return " + (name != null ? "" + (tokenDef === '=M=' ? 'defineMacro' : 'define') + "('" + name + "', " + code.main + ")" : code.main) + "\n})()";
    } else {
      ast.src = name != null ? "" + (tokenDef === '=M=' ? 'defineMacro' : 'define') + "('" + name + "', " + code.main + ");" + ((tokenDef != null) && tokenDef !== '=' ? "\nroot.tokenDefs.push('" + name + "', '" + tokenDef + "');" : '') + "\n" : "(" + code.main + ")";
    }
    ast.globals = code.global;
    return ast;
  };

  wrapNoDebug = function wrapNoDebug(name, ast, v, body) {
    var src, _ref;
    src = "function(" + v + "){return " + body + "}";
    if (!(ast.exprType != null) && !ast.exprDataType) {
      return src;
    } else {
      return "" + (ast.exprType ? 'setType' : 'setDataType') + "(" + src + ", '" + ((_ref = ast.exprType) != null ? _ref : ast.exprDataType) + "')";
    }
  };

  wrapDebug = function wrapDebug(name, ast, v, body) {
    var _ref;
    if (!(ast.exprType != null) && !ast.exprDataType) {
      if (typeof name === "function" ? name("setContext($ctx, (" + src + "))") : void 0) {} else {
        return src;
      }
    } else {
      return "" + (ast.exprType ? 'setType' : 'setDataType') + "(" + src + ", '" + ((_ref = ast.exprType) != null ? _ref : ast.exprDataType) + "')";
    }
  };

  wrap = wrapNoDebug;

  setContext = function setContext(ctx, func) {
    func.LeisureContext = ctx;
    return func;
  };

  gen = function gen(ast, code, lits, vars, deref, name) {
    var arg, argCode, bodyCode, func, funcCode, src, v, val;
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
          })) {
            return code;
          } else if (typeof val === 'number') {
            return code.copyWith(JSON.stringify(scanTok(val))).unreffedValue(deref);
          } else {
            return code.addErr("attempt to use free variable: " + val);
          }
        }
        break;
      case 'lit':
        val = getLitVal(ast);
        src = typeof val === 'function' || typeof val === 'object' ? (lits.push(val), "(function(){\nreturn __lits[" + (lits.length - 1) + "]\n})") : JSON.stringify(val);
        return code.copyWith(src).unreffedValue(deref);
      case 'lambda':
        v = getLambdaVar(ast);
        bodyCode = gen(getLambdaBody(ast), code.resetMemo(), lits, cons(v, vars), true, name);
        bodyCode = bodyCode.setVars(bodyCode.vars.removeAll(function(bv) {
          return bv === v;
        }));
        return bodyCode.copyWith(wrap(name, ast, nameSub(v), bodyCode.main)).useSubfunc(bodyCode.vars === Nil).memoize(deref);
      case 'apply':
        func = getApplyFunc(ast);
        if (getAstType(func === 'lit')) {
          return code.addErr("Attempt to use lit as function: " + (getLitVal(func)));
        } else if (freeVar(func, vars, code.global)) {
          return code.addErr("Attempt to use free variable as function: " + (getRefVar(func)));
        } else {
          arg = getApplyArg(ast);
          funcCode = gen(func, code, lits, vars, true, name);
          argCode = gen(arg, funcCode, lits, vars, false, name);
          return argCode.copyWith("" + funcCode.main + "(" + argCode.main + ")").memoize(deref);
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
      });
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
    var groupToks, i, k, types, v;
    if (def !== '=M=') {
      tokens[name] = 1;
      if (def[1] === '(') {
        groupOpens[name] = def.substring(2, def.length - 1);
      } else if (def[1] === ')') {
        groupCloses[name] = 1;
      }
      types = [];
      for (i in tokens) {
        types.push(i);
      }
      types.sort(function(a, b) {
        return b.length - a.length;
      });
      types = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = types.length; _i < _len; _i++) {
          i = types[_i];
          _results.push(escapeRegexpChars(i));
        }
        return _results;
      })();
      types.push('[().\\\\]| +');
      tokenPat = new RegExp(baseTokenPat.source + '|' + types.join('|'));
      tokenPat2 = new RegExp("\\n *|" + (types.join('|')) + "|" + baseTokenPat.source);
      groupToks = [];
      for (k in groupOpens) {
        v = groupOpens[k];
        groupToks.push(k);
        groupToks.push(v);
      }
      groupToks.sort(function(a, b) {
        return b.length - a.length;
      });
      return groupingPat = new RegExp(((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = groupToks.length; _i < _len; _i++) {
          i = groupToks[_i];
          _results.push(escapeRegexpChars(i));
        }
        return _results;
      })()).join('|') + '|' + baseGroupingPat.source);
    }
  };

  createDefinition = function createDefinition(name, ast, index) {
    if (index >= name.length) {
      return ast;
    } else {
      return lambda(laz(name[index]))(laz(createDefinition(name, ast, index + 1)));
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

  compileNext = function compileNext(line, globals, parseOnly, check, nomacros) {
    var def, defType, errPrefix, leading, matched, name, nm, pfx, rest, rest1;
    if (line[0] === '=') {
      rest = line.substring(1);
      return ifParsed((nomacros ? parseApplyNew(rest, Nil) : parseFull(rest)), (function(ast, rest) {
        return genCode(ast, null, globals, null, rest, parseOnly);
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
          burp("PARSING: " + nm[0] + " (nomacros: " + nomacros + ") " + (snip(pfx)));
          return ifParsed((nomacros ? parseApplyNew(pfx, Nil) : parseFull(pfx)), (function(ast, rest) {
            var bod;
            burp("PARSED: " + nm[0]);
            ast.leisureDefPrefix = pfx.length - rest1.length;
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
            return genCode(ast, nm[0], globals, defType, rest, parseOnly);
          }), errPrefix);
        }
      } else {
        return ifParsed((nomacros ? parseApplyNew(rest1, Nil) : parseFull(rest1)), (function(ast, rest) {
          return genCode(ast, null, globals, null, rest, parseOnly);
        }), "Error compiling expr:  " + (snip(line)));
      }
    } else {
      return [null, null, null];
    }
  };

  genCode = function genCode(ast, name, globals, defType, rest, parseOnly) {
    if (!parseOnly) dgen(ast, false, name, globals, defType);
    if ((ast.err != null) && (name != null)) {
      ast.err = "Error while compiling " + name + ": " + ast.err;
    }
    burp("GENERATED: " + name);
    return [ast, ast.err, rest];
  };

  evalNext = function evalNext(code) {
    var ast, err, nm, rest, result, _ref;
    _ref = compileNext(code, null), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (ast) {
      if (ast.leisureName) {
        try {
          nm = nameSub(ast.leisureName);
          if (ctx[nm]) evalFunc("" + nm + " = null");
          evalCompiledAst(ast);
          result = "Defined: " + ast.leisureName;
        } catch (err) {
          console.log(err.stack);
          result = err.stack;
          ast.err = err.stack;
        }
        return [ast, result];
      } else {
        try {
          result = evalCompiledAst(ast);
        } catch (err) {
          ast.err = err.stack;
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

  prepare = function prepare(str) {
    var err, rest, result, _ref, _ref2;
    _ref = bracify(stripComments(str.replace(/\u03BB/g, '\\')), 1), result = _ref[0], rest = _ref[1];
    if (rest.trim()) {
      return [result, "Indentation problem: " + result + "\n\n------->\n\n" + rest];
    } else {
      _ref2 = parenthify(result.trim(), true), result = _ref2[0], rest = _ref2[1], err = _ref2[2];
      if (rest.trim()) {
        return [result, "Unbalanced braces: " + result + "\n\n------->\n\n" + rest];
      } else {
        return [result, err];
      }
    }
  };

  commentPat = /([^\n#]*)(#[^\n]*)(\n|$)/g;

  stripComments = function stripComments(str) {
    return str.replace(commentPat, function(str, p1, p2, p3, offset) {
      if (p1.trim()) {
        return "" + p1 + p3;
      } else {
        return "";
      }
    });
  };

  indentPat = /^([^\n]*)(\n[ ]*|$)/;

  bracify = function bracify(str, indent) {
    var b, lineIndent, m, nextIndent, nextRest, nextResult, pfx, resIndent, rest, result, sfx, _ref, _ref2, _ref3, _ref4;
    b = str.match(bracePat);
    if (b && b[3] === '{') {
      _ref = parenthify(str.substring(b.index + b[2].length + 1), false, true), result = _ref[0], rest = _ref[1];
      if (rest[0] !== '}') {
        return [null, "No close brace: " + (str.substring(b.index + b[2].length + 1)), indent];
      } else {
        _ref2 = bracify(rest.substring(1), indent), nextResult = _ref2[0], nextRest = _ref2[1], nextIndent = _ref2[2];
        return ["" + (parenthesizeTokens(str.substring(0, b.index + b[2].length).trim() + result)) + " " + nextResult, nextRest, nextIndent];
      }
    } else {
      m = str.match(indentPat);
      if (!m || m[2].length === 0) {
        return [str.trim(), '', 0];
      } else {
        lineIndent = m[2].length;
        pfx = m[1];
        sfx = str.substring(m[0].length);
        if (lineIndent < indent) {
          return [pfx.trim(), sfx, lineIndent];
        } else {
          _ref3 = bracify(sfx, lineIndent), result = _ref3[0], rest = _ref3[1], resIndent = _ref3[2];
          if (lineIndent === indent) {
            return ["" + (pfx.trim()) + ";" + result, rest, resIndent];
          } else if (resIndent < indent) {
            return ["" + (pfx.trim()) + "{" + result + "}", rest, resIndent];
          } else {
            _ref4 = bracify(rest, indent), nextResult = _ref4[0], nextRest = _ref4[1], nextIndent = _ref4[2];
            return ["" + (pfx.trim()) + "{" + result + "};" + nextResult, nextRest, nextIndent];
          }
        }
      }
    }
  };

  parenthify = function parenthify(str, top, embedded) {
    var b, def, err, nRest, next, pfx, rest, result, sfx, _ref, _ref2, _ref3, _ref4;
    b = str.match((embedded ? embeddedBracePat : top ? topBracePat : bracePat));
    if (!b) {
      return [(str && !top ? "(" + str + ")" : str), '', null];
    } else {
      def = (stripSemis((_ref = b[1]) != null ? _ref : '')).trim();
      if (def) def = "" + def + " ";
      pfx = b[2].trim();
      sfx = str.substring(b.index + b[0].length);
      if (b[3] === ';') {
        _ref2 = parenthify(sfx, top, embedded), result = _ref2[0], rest = _ref2[1], err = _ref2[2];
        return ["" + (!pfx && !top ? '' : !pfx ? '\n' : top ? "" + def + pfx + "\n" : " " + (parenthesizeTokens(pfx)) + " ") + (result.trim()), rest, err];
      } else if (b[3] === '{') {
        _ref3 = parenthify(sfx, false, embedded), result = _ref3[0], rest = _ref3[1], err = _ref3[2];
        if (!err && rest[0] === '}') {
          _ref4 = parenthify(rest.substring(1), top, embedded), next = _ref4[0], nRest = _ref4[1], err = _ref4[2];
          return ["" + def + (parenthesizeTokens((pfx ? pfx + result : result))) + (top ? "\n" : " ") + next, nRest, err];
        } else {
          return ["" + (pfx ? "" + def + " " + pfx : "" + def) + result, rest, "" + err + "\nNo close brace"];
        }
      } else {
        return [(pfx ? "" + def + " " + (parenthesizeTokens(pfx)) : "" + def), str.substring(b.index + b[1].length + b[2].length)];
      }
    }
  };

  parenthesizeTokens = function parenthesizeTokens(str) {
    var tok, trimmed;
    trimmed = str.trim();
    tok = trimmed.match(wordPat);
    if ((tok && tok[0] === trimmed) || (!tok && trimmed.match(wordPat))) {
      return trimmed;
    } else {
      return "(" + trimmed + ")";
    }
  };

  stripSemis = function stripSemis(str) {
    return str.replace(/^;*/, '');
  };

  nextTok = function nextTok(str, offset) {
    var m, rest, tok;
    m = str.match(tokenPat);
    if (!m) {
      return [str, offset, ''];
    } else if (m.index === 0 && m[0] === '\n') {
      return ['\n', offset, str.substring(1)];
    } else {
      tok = str.substring(0, m.index > 0 ? m.index : m[0].length);
      rest = str.substring(tok.length);
      if (tok[0] !== '#' && tok.trim()) {
        return [tok, offset, rest];
      } else {
        return nextTok(rest, offset + tok.length);
      }
    }
  };

  parseFull = function parseFull(str) {
    var ast, err, rest, _ref;
    _ref = parseApplyNew(str, Nil, 0), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err) {
      return [ast, err, rest];
    } else {
      return [substituteMacros(ast), err, rest];
    }
  };

  substituteMacros = function substituteMacros(ast) {
    var a, arg, b, body, f, func, macro;
    switch (getAstType(ast)) {
      case 'ref':
      case 'lit':
        return ast;
      case 'lambda':
        body = getLambdaBody(ast);
        b = substituteMacros(body);
        if (b === body) {
          return ast;
        } else {
          return lambda(laz(getLambdaVar(ast)))(laz(b));
        }
        break;
      case 'apply':
        macro = getMacro(ast);
        if (macro) {
          return substituteMacros(macro(laz(ast)));
        } else {
          func = getApplyFunc(ast);
          arg = getApplyArg(ast);
          f = substituteMacros(func);
          a = substituteMacros(arg);
          if (a === arg && f === func) {
            return ast;
          } else {
            return apply(laz(f))(laz(a));
          }
        }
    }
  };

  getMacro = function getMacro(ast) {
    var _ref;
    if (getAstType(ast) === 'ref') {
      return (_ref = ctx.macros[getRefVar(ast)]) != null ? _ref : null;
    } else if (getAstType(ast) === 'apply') {
      return getMacro(getApplyFunc(ast));
    } else {
      return null;
    }
  };

  parse = function parse(str) {
    var ast, err, rest, _ref;
    _ref = parseApplyNew(str.replace(/\u03BB/g, '\\'), Nil, 0), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err) {
      throw new Error(err);
    } else {
      return ast;
    }
  };

  ifParsed = function ifParsed(res, block, errPrefix) {
    if (res[1]) {
      return [res[0], errPrefix + res[1], res[2]];
    } else {
      return block(res[0], res[2]);
    }
  };

  tag = function tag(ast, start, end) {
    ast.leisureStart = start;
    ast.leisureEnd = end;
    return ast;
  };

  soff = function soff(orig, offset, rest) {
    return offset + orig.length - rest.length;
  };

  parseApply = function parseApply(str, vars, offset) {
    var offset1, rest1, tok, _ref;
    if (!str.length) {
      return [null, null, str];
    } else {
      _ref = nextTok(str, offset), tok = _ref[0], offset1 = _ref[1], rest1 = _ref[2];
      if (tok === '\n') {
        return [null, 'Newline when expecting expression', rest1];
      } else if (groupCloses[tok]) {
        return [null, "Unexpected group closing token: " + tok + " " + (snip(rest1)), str];
      } else {
        return ifParsed(parseTerm(tok, rest1, vars, offset1), function(func, rest) {
          return continueApply(func, rest, vars, soff(str, offset, rest));
        });
      }
    }
  };

  continueApply = function continueApply(func, str, vars, offset) {
    var offset1, rest, tok, _ref;
    _ref = nextTok(str, offset), tok = _ref[0], offset1 = _ref[1], rest = _ref[2];
    if (!tok || tok === '\n' || tok === '}' || groupCloses[tok]) {
      return [func, null, str];
    } else {
      return ifParsed(parseTerm(tok, rest, vars, offset1), function(arg, rest) {
        return continueApply(tag(apply(laz(func))(laz(arg)), func.leisureStart, arg.leisureEnd), rest, vars, soff(str, offset, rest));
      });
    }
  };

  parseTerm = function parseTerm(tok, rest, vars, tokOffset) {
    var apl, restOffset;
    restOffset = tokOffset + tok.length;
    if (tok === '\n') {
      return [null, 'Unexpected newline while expecting a term', rest];
    } else if (tok === '\\') {
      return parseLambda(rest, vars, restOffset);
    } else if (groupOpens[tok]) {
      apl = tok === '(' ? parseApply(rest, vars, restOffset) : ifParsed(parseName(tok, rest, vars, tokOffset), function(ast, rest2) {
        return continueApply(ast, rest2, vars, soff(rest, restOffset, rest2));
      });
      return ifParsed(apl, function(ast, rest3) {
        var offset4, rest4, tok4, _ref;
        _ref = nextTok(rest3, soff(rest, restOffset, rest3)), tok4 = _ref[0], offset4 = _ref[1], rest4 = _ref[2];
        if (tok4 !== groupOpens[tok]) {
          return [ast, "Expected close token: " + groupOpens[tok] + ", but got " + tok4 + " " + (snip(rest4)), rest4];
        } else if (tok === '(') {
          return [ast, null, rest4];
        } else {
          return ifParsed(parseName(tok4, rest4, vars, soff(rest, restOffset, rest4)), function(arg, rest5) {
            return [tag(apply(laz(ast))(laz(arg)), ast.leisureStart, arg.leisureEnd), null, rest5];
          });
        }
      });
    } else {
      return parseName(tok, rest, vars, tokOffset);
    }
  };

  parseName = function parseName(tok, rest, vars, tokOffset) {
    var restOffset;
    restOffset = tokOffset + tok.length;
    return [
      tag((tok[0] === "'" ? lit(laz(tok.substring(1, tok.length - 1))) : tok[0] === '"' ? lit(laz(scanTok(tok))) : tok[0] === '`' ? ref(laz(tok.substring(1, tok.length - 1))) : vars.find(function(v) {
        return tok === v;
      }) ? ref(laz(tok)) : scanName(tok)), tokOffset, restOffset), null, rest
    ];
  };

  scanTok = function scanTok(tok) {
    try {
      return JSON.parse(tok);
    } catch (err) {
      return tok;
    }
  };

  scanName = function scanName(name) {
    var l;
    try {
      l = JSON.parse(name);
      if (typeof l === 'string') {
        return lit(laz(l));
      } else if (typeof l === 'number') {
        return ref(laz(l));
      } else {
        return ref(laz(name));
      }
    } catch (err) {
      return ref(laz(name));
    }
  };

  nextTokWithNl = function nextTokWithNl(str, offset) {
    var rest, t, _ref;
    _ref = subnextTokWithNl(str), t = _ref[0], rest = _ref[1];
    return [t, soff(str, offset, rest), rest];
  };

  subnextTokWithNl = function subnextTokWithNl(str) {
    var offset, rest, tok, _ref;
    _ref = nextTok(str, 0), tok = _ref[0], offset = _ref[1], rest = _ref[2];
    if (tok === '\n') {
      return subnextTokWithNl(rest);
    } else {
      return [tok, rest];
    }
  };

  eatAllWhitespace = function eatAllWhitespace(str) {
    var m;
    m = str.match(/^(\s+|;)/);
    if (m) {
      return str.substring(m[0].length);
    } else {
      return str;
    }
  };

  parseLambda = function parseLambda(str, vars, offset) {
    var nm, off2, offset1, offset2, rest1, rest2, str2, tok2, _ref, _ref2;
    _ref = nextTokWithNl(str, offset), nm = _ref[0], offset1 = _ref[1], rest1 = _ref[2];
    _ref2 = nextTokWithNl(rest1, offset1), tok2 = _ref2[0], offset2 = _ref2[1], rest2 = _ref2[2];
    return ifParsed((tok2 === '.' ? (str2 = eatAllWhitespace(rest2), off2 = soff(str, offset, str2), parseApply(str2, cons(nm, vars), off2)) : parseLambda(rest1, cons(nm, vars), soff(str, offset, rest1))), function(body, rest2) {
      return [tag(lambda(laz(nm))(laz(body)), offset, soff(str, offset, rest2)), null, rest2];
    });
  };

  addDef = function addDef(toks) {
    var t;
    t = toks.reverse();
    return defs[t[0]] = t.join(' ');
  };

  setEvalFunc = function setEvalFunc(ct, func) {
    ctx = root.ctx = ct;
    return root.eval = evalFunc = func;
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
      processTokenDefs(res.tokenDefs);
      res.leisureFuncNames = ctx.leisureFuncNames;
      res.ctx = ctx;
    }
    return res;
  };

  processTokenDefs = function processTokenDefs(defs) {
    var i, _ref, _results;
    if (defs != null) {
      _results = [];
      for (i = 0, _ref = defs.length; i < _ref; i += 2) {
        _results.push(defineToken(defs[i], defs[i + 1]));
      }
      return _results;
    }
  };

  nextTok2 = function nextTok2(str, indent) {
    var m, rest;
    m = str.match(tokenPat2);
    if (!m) {
      return [str, ''];
    } else if (m.index > 0) {
      return [str.substring(0, m.index), str.substring(m.index)];
    } else {
      rest = str.substring(m.index + m[0].length);
      if (m[0][0] === '#' || m[0][0] === ' ' || (m[0][0] === '\n' && rest[0] === '\n')) {
        return nextTok2(rest, indent);
      } else {
        return [m[0], rest];
      }
    }
  };

  tag2 = function tag2(start, end, ast) {
    ast.leisureStart = start;
    ast.leisureEnd = end;
    return ast;
  };

  pos = function pos(str, totalLen) {
    return totalLen - str.length;
  };

  tokPos = function tokPos(tok, str, totalLen) {
    return totalLen - str.length - tok.length;
  };

  parseIf = function parseIf(res, block, errPrefix) {
    if (res[1]) {
      return [res[0], (errPrefix != null ? errPrefix : '') + res[1], res[2]];
    } else {
      return block(res[0], res[2]);
    }
  };

  snip = function snip(str) {
    return "[" + (str.substring(0, 80)) + "]";
  };

  parseApply2 = function parseApply2(str, vars, indent, totalLen) {
    var rest, tok, _ref;
    if (!str) {
      return [null, null, str];
    } else {
      _ref = nextTok2(str, indent), tok = _ref[0], rest = _ref[1];
      if (!tok || tok[0] === '\n') {
        return [null, "expecting expression " + (snip(str)) + "\n" + (new Error().stack), rest];
      } else if (groupCloses[tok]) {
        return [null, "Unexpected group close: " + tok + " " + (snip(rest)), rest];
      } else {
        return parseIf(parseTerm2(tok, rest, vars, indent, totalLen), function(func, rest) {
          return continueApply2(func, rest, vars, indent, totalLen);
        });
      }
    }
  };

  continueApply2 = function continueApply2(func, str, vars, indent, totalLen) {
    var parsedArg, rest, tok, _ref;
    _ref = nextTok2(str, indent), tok = _ref[0], rest = _ref[1];
    if (!tok || (tok[0] === '\n' && tok.length <= indent.length) || groupCloses[tok]) {
      return [func, null, str];
    } else {
      parsedArg = tok[0] === '\n' ? (burp("CONTINUING, tok len = " + tok.length + ", indent len = " + indent.length), parseApply2(rest, vars, tok, totalLen)) : parseTerm2(tok, rest, vars, indent, totalLen);
      return parseIf(parsedArg, function(arg, rest) {
        return continueApply2(tag2(func.leisureStart, arg.leisureEnd, apply(laz(func))(laz(arg))), rest, vars, indent, totalLen);
      });
    }
  };

  parseTerm2 = function parseTerm2(tok, rest, vars, indent, totalLen) {
    var apl;
    if (tok === '\\') {
      return parseLambda2(rest, vars, indent, totalLen);
    } else if (groupOpens[tok]) {
      apl = tok === '(' ? parseApply2(rest, vars, indent, totalLen) : parseIf(parseName2(tok, rest, vars, totalLen), function(ast, rest2) {
        return continueApply2(ast, rest2, vars, indent, totalLen);
      });
      return parseIf(apl, function(ast, rest3) {
        var rest4, tok4, _ref;
        _ref = nextTok2(rest3, indent), tok4 = _ref[0], rest4 = _ref[1];
        if (tok4 !== groupOpens[tok]) {
          return [ast, "Expected close token: " + groupOpens[tok] + ", but got " + tok4, rest4];
        } else if (tok === '(') {
          return [tag2(tokPos(tok, rest, totalLen), pos(rest4, totalLen), ast), null, rest4];
        } else {
          return parseIf(parseName2(tok4, rest4, vars, totalLen), function(arg, rest5) {
            return [tag2(tokPos(tok, rest, totalLen), pos(rest4, totalLen), apply(laz(ast))(laz(arg))), null, rest5];
          });
        }
      });
    } else {
      return parseName2(tok, rest, vars, totalLen);
    }
  };

  parseName2 = function parseName2(tok, rest, vars, totalLen) {
    var name;
    name = tok[0] === "'" ? lit(laz(tok.substring(1, tok.length - 1))) : tok[0] === '"' ? lit(laz(scanTok(tok))) : tok[0] === '`' ? ref(laz(tok.substring(1, tok.length - 1))) : vars.find(function(v) {
      return tok === v;
    }) ? ref(laz(tok)) : scanName(tok);
    return [tag2(tokPos(tok, rest, totalLen), pos(rest, totalLen), name), null, rest];
  };

  nextTok2IgnoreNL = function nextTok2IgnoreNL(str, indent) {
    var r, rest, tok, _ref;
    _ref = r = nextTok2(str, indent), tok = _ref[0], rest = _ref[1];
    if (tok && (tok[0] === '\n' || tok[0] === ' ')) nextTok2(rest, indent);
    return r;
  };

  parseLambda2 = function parseLambda2(str, vars, indent, totalLen) {
    var apl, nm, rest1, rest2, tok2, _ref, _ref2;
    _ref = nextTok2IgnoreNL(str, indent), nm = _ref[0], rest1 = _ref[1];
    _ref2 = nextTok2IgnoreNL(rest1, indent), tok2 = _ref2[0], rest2 = _ref2[1];
    apl = tok2 === '.' ? parseApply2(eatAllWhitespace(rest2), cons(nm, vars), indent, totalLen) : parseLambda2(rest1, cons(nm, vars), indent, totalLen);
    return parseIf(apl, function(body, rest2) {
      var ast;
      ast = lambda(laz(nm))(laz(body));
      ast.leisureNameEnd = pos(rest1, totalLen);
      return [tag2(tokPos(nm, rest1, totalLen), body.leisureEnd, ast), null, rest2];
    });
  };

  nextGroupTok = function nextGroupTok(str) {
    var m, rest, _ref;
    m = str.match(groupingPat);
    if (!m) {
      return ['', ''];
    } else {
      rest = str.substring(m.index + m[0].length);
      if (!(_ref = m[0][0], __indexOf.call('\'`"', _ref) >= 0) && ((groupOpens[m[0]] != null) || (groupCloses[m[0]] != null) || m[0][0] === '\n')) {
        return [m[0], rest];
      } else {
        return nextGroupTok(rest);
      }
    }
  };

  getNesting = function getNesting(txt) {
    return findGroup(txt, '\n', txt.length);
  };

  findGroup = function findGroup(txt, indent, totalLen) {
    var done, end, group, next, nextGroup, nextRest, rest, subgroup, subrest, tok, _ref, _ref2, _ref3, _ref4;
    _ref = nextGroupTok(txt), tok = _ref[0], rest = _ref[1];
    if (!tok) {
      return [null, ''];
    } else if ((end = groupOpens[tok])) {
      group = [tok, totalLen - rest.length, -1];
      while (true) {
        _ref2 = nextGroupTok(rest), next = _ref2[0], nextRest = _ref2[1];
        if (next === end) {
          group[2] = totalLen - nextRest.length - next.length;
          return [group, nextRest];
        }
        _ref3 = findGroup(nextRest, indent, totalLen), nextGroup = _ref3[0], nextRest = _ref3[1];
        group.push(nextGroup);
        rest = nextRest;
      }
    } else if (groupCloses[tok] != null) {
      return [null, null];
    } else if (tok.length === indent.length) {
      return [['', totalLen - txt.length, totalLen - rest.length - tok.length], rest];
    } else if (tok.length < indent.length) {
      return [null, txt];
    } else if (tok.length > indent.length) {
      group = [tok, totalLen - rest.length, -1];
      done = false;
      while (true) {
        _ref4 = findGroup(rest, tok, totalLen), subgroup = _ref4[0], subrest = _ref4[1];
        if (!(subgroup != null)) {
          group[2] = totalLen - rest.length;
          return [group, rest];
        }
        group.push(subgroup);
        rest = subrest;
      }
    }
  };

  printGroups = function printGroups(txt, groups) {
    var close, i, last, open, out, start, _ref, _ref2;
    close = (_ref = groupOpens[groups[0]]) != null ? _ref : '';
    open = close ? groups[0] : '';
    out = "(" + open;
    last = groups[1];
    for (i = 3, _ref2 = groups.length; 3 <= _ref2 ? i < _ref2 : i > _ref2; 3 <= _ref2 ? i++ : i--) {
      start = groups[i][1];
      if (groupOpens[groups[i][0]] != null) start -= groups[i][0].length;
      out += txt.substring(last, start);
      out += " " + (printGroups(txt, groups[i]));
      last = groups[i][2];
      if (groupOpens[groups[i][0]] != null) {
        last += groupOpens[groups[i][0]].length;
      }
    }
    out += txt.substring(last, groups[2]);
    return out + ("" + close + ")");
  };

  burp = function burp(str) {};

  parseApplyNew = function parseApplyNew(str, vars) {
    return parseApply2(str, vars, '\n', str.length);
  };

  root.processTokenDefs = processTokenDefs;

  root.setEvalFunc = setEvalFunc;

  root.eval = evalFunc;

  root.parse = parse;

  root.parseFull = parseFull;

  root.astPrint = astPrint;

  root.gen = dgen;

  root.laz = laz;

  root.compileNext = compileNext;

  root.evalNext = evalNext;

  root.setType = setType;

  root.setDataType = setDataType;

  root.astEval = function astEval(ast) {
    return evalCompiledAst(dgen(ast));
  };

  root.define = define;

  root.defineMacro = defineMacro;

  root.getAstType = getAstType;

  root.getType = getType;

  root.linePat = linePat;

  root.Nil = Nil;

  root.cons = cons;

  root.append = append;

  root.defineToken = defineToken;

  root.req = req;

  root.nameSub = nameSub;

  root.bracify = bracify;

  root.parenthify = parenthify;

  root.prepare = prepare;

  root.processDefs = processDefs;

  root.getNesting = getNesting;

  root.printGroups = printGroups;

  root.parseApply2 = parseApply2;

  root.srcPrint = srcPrint;

  root.bracket = bracket;

  root.dlnew = dlnew;

  root.dlappend = dlappend;

}).call(this);
