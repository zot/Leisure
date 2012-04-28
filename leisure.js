
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
  var CNil, Code, Cons, Nil, append, apply, astBrackets, astPrint, baseTokenPat, between, bracket, bracketApplyParts, brackets, bracketsForApply, charCodes, codeChars, compileNext, cons, continueApply, createDefinition, ctx, define, defineMacro, defineToken, dgen, dlappend, dlnew, eatAllWhitespace, escapeRegexpChars, evalCompiledAst, evalFunc, evalNext, first, freeVar, gen, genCode, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getMacro, getNthBody, getRefVar, getType, groupCloses, groupOpens, ifParsed, lambda, laz, linePat, lit, ll, nameAst, nameSub, nextTok, nextTokIgnoreNL, order, parseApply, parseApplyNew, parseFull, parseLambda, parseName, parseTerm, pos, prefix, processDefs, processTokenDefs, ref, req, root, scanName, scanTok, second, setContext, setDataType, setEvalFunc, setType, snip, specials, substituteMacros, tag, tokPos, tokenPat, tokens, warnFreeVariable, within, wordPat, wrap, wrapDebug, wrapNoDebug,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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

  tokenPat = new RegExp("\\n *|" + baseTokenPat.source);

  specials = '[]().*+?|';

  linePat = /^((?:\s*\n|#[^\n]*\n)*)([^=\n]*)(=[.)M]=|=\([^=]+=|=)?/;

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
    var i, types;
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
      return tokenPat = new RegExp("\\n *|" + (types.join('|')) + "|" + baseTokenPat.source);
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
          return ifParsed((nomacros ? parseApplyNew(pfx, Nil) : parseFull(pfx)), (function(ast, rest) {
            var bod;
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

  eatAllWhitespace = function eatAllWhitespace(str) {
    var m;
    m = str.match(/^(\s+|;)/);
    if (m) {
      return str.substring(m[0].length);
    } else {
      return str;
    }
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

  nextTok = function nextTok(str, indent) {
    var m, rest;
    m = str.match(tokenPat);
    if (!m) {
      return [str, ''];
    } else if (m.index > 0) {
      return [str.substring(0, m.index), str.substring(m.index)];
    } else {
      rest = str.substring(m.index + m[0].length);
      if (m[0][0] === '#' || m[0][0] === ' ' || (m[0][0] === '\n' && rest[0] === '\n')) {
        return nextTok(rest, indent);
      } else {
        return [m[0], rest];
      }
    }
  };

  tag = function tag(start, end, ast) {
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

  ifParsed = function ifParsed(res, block, errPrefix) {
    if (res[1]) {
      return [res[0], errPrefix + res[1], res[2]];
    } else {
      return block(res[0], res[2]);
    }
  };

  snip = function snip(str) {
    return "[" + (str.substring(0, 80)) + "]";
  };

  parseApplyNew = function parseApplyNew(str, vars) {
    return parseApply(str, vars, '\n', str.length);
  };

  parseApply = function parseApply(str, vars, indent, totalLen) {
    var rest, tok, _ref;
    if (!str) {
      return [null, null, str];
    } else {
      _ref = nextTok(str, indent), tok = _ref[0], rest = _ref[1];
      if (!tok || tok[0] === '\n') {
        return [null, "expecting expression " + (snip(str)) + "\n" + (new Error().stack), rest];
      } else if (groupCloses[tok]) {
        return [null, "Unexpected group close: " + tok + " " + (snip(rest)), rest];
      } else {
        return ifParsed(parseTerm(tok, rest, vars, indent, totalLen), function(func, rest) {
          return continueApply(func, rest, vars, indent, totalLen);
        });
      }
    }
  };

  continueApply = function continueApply(func, str, vars, indent, totalLen) {
    var parsedArg, rest, tok, _ref;
    _ref = nextTok(str, indent), tok = _ref[0], rest = _ref[1];
    if (!tok || (tok[0] === '\n' && tok.length <= indent.length) || groupCloses[tok]) {
      return [func, null, str];
    } else {
      parsedArg = tok[0] === '\n' ? parseApply(rest, vars, tok, totalLen) : parseTerm(tok, rest, vars, indent, totalLen);
      return ifParsed(parsedArg, function(arg, rest) {
        return continueApply(tag(func.leisureStart, arg.leisureEnd, apply(laz(func))(laz(arg))), rest, vars, indent, totalLen);
      });
    }
  };

  parseTerm = function parseTerm(tok, rest, vars, indent, totalLen) {
    var apl;
    if (tok === '\\') {
      return parseLambda(rest, vars, indent, totalLen);
    } else if (groupOpens[tok]) {
      apl = tok === '(' ? parseApply(rest, vars, indent, totalLen) : ifParsed(parseName(tok, rest, vars, totalLen), function(ast, rest2) {
        return continueApply(ast, rest2, vars, indent, totalLen);
      });
      return ifParsed(apl, function(ast, rest3) {
        var rest4, tok4, _ref;
        _ref = nextTok(rest3, indent), tok4 = _ref[0], rest4 = _ref[1];
        if (tok4 !== groupOpens[tok]) {
          return [ast, "Expected close token: " + groupOpens[tok] + ", but got " + tok4, rest4];
        } else if (tok === '(') {
          return [tag(tokPos(tok, rest, totalLen), pos(rest4, totalLen), ast), null, rest4];
        } else {
          return ifParsed(parseName(tok4, rest4, vars, totalLen), function(arg, rest5) {
            return [tag(tokPos(tok, rest, totalLen), pos(rest4, totalLen), apply(laz(ast))(laz(arg))), null, rest5];
          });
        }
      });
    } else {
      return parseName(tok, rest, vars, totalLen);
    }
  };

  parseName = function parseName(tok, rest, vars, totalLen) {
    var name;
    name = tok[0] === "'" ? lit(laz(tok.substring(1, tok.length - 1))) : tok[0] === '"' ? lit(laz(scanTok(tok))) : tok[0] === '`' ? ref(laz(tok.substring(1, tok.length - 1))) : vars.find(function(v) {
      return tok === v;
    }) ? ref(laz(tok)) : scanName(tok);
    return [tag(tokPos(tok, rest, totalLen), pos(rest, totalLen), name), null, rest];
  };

  nextTokIgnoreNL = function nextTokIgnoreNL(str, indent) {
    var r, rest, tok, _ref;
    _ref = r = nextTok(str, indent), tok = _ref[0], rest = _ref[1];
    if (tok && (tok[0] === '\n' || tok[0] === ' ')) nextTok(rest, indent);
    return r;
  };

  parseLambda = function parseLambda(str, vars, indent, totalLen) {
    var apl, nm, rest1, rest2, tok2, _ref, _ref2;
    _ref = nextTokIgnoreNL(str, indent), nm = _ref[0], rest1 = _ref[1];
    _ref2 = nextTokIgnoreNL(rest1, indent), tok2 = _ref2[0], rest2 = _ref2[1];
    apl = tok2 === '.' ? parseApply(eatAllWhitespace(rest2), cons(nm, vars), indent, totalLen) : parseLambda(rest1, cons(nm, vars), indent, totalLen);
    return ifParsed(apl, function(body, rest2) {
      var ast;
      ast = lambda(laz(nm))(laz(body));
      ast.leisureNameEnd = pos(rest1, totalLen);
      return [tag(tokPos(nm, rest1, totalLen), body.leisureEnd, ast), null, rest2];
    });
  };

  root.processTokenDefs = processTokenDefs;

  root.setEvalFunc = setEvalFunc;

  root.eval = evalFunc;

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

  root.processDefs = processDefs;

  root.parseApply = parseApply;

  root.bracket = bracket;

}).call(this);
