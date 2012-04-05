
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
  var CNil, Code, Cons, Nil, addAst, addDef, apply, astPrint, astsById, astsByName, baseTokenPat, charCodes, codeChars, commentPat, compileLine, cons, createDefinition, define, defineToken, dgen, evalCompiledAst, evalLine, first, gen, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getNthBody, getPrimArg, getPrimArgs, getPrimRest, getRefVar, getType, groupCloses, groupOpens, isPrim, lambda, laz, linePat, lit, nameAst, nameSub, newContinueApply, newParseApply, newParseLambda, newParseTerm, nextTok, order, parse, parseExpr, parseLambda, parseVariable, prefix, prim, ref, root, scanTok, second, setDataType, setId, setType, specials, tokenPat, tokenize, tokens, warnFreeVariable, wrap, _applyId, _lambdaId, _litId, _primId, _refId,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Lazp = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  root.funcs = {};

  _refId = -1;

  _litId = -2;

  _lambdaId = -3;

  _applyId = -4;

  _primId = -5;

  commentPat = /^\s*#/;

  baseTokenPat = /\n|'(\\'|[^'])*'|"(\\"|[^"])*"|[().\\]| +/;

  tokenPat = baseTokenPat;

  specials = '[]().*+?|';

  linePat = /^([^=]*)(=[.)]=|=\([^=]+=|=)(?=[^=])(.*)$/;

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

  astsByName = {};

  astsById = [];

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

  define = function define(name, func) {
    var nm;
    nm = nameSub(name);
    global[nm] = function() {
      return func;
    };
    root.funcs[name] = func;
    astsByName[name] = func;
    func.lazpName = name;
    return func;
  };

  setDataType = function setDataType(func, dataType, id) {
    if (!id) {
      astsById.push(func);
    } else {
      func.id = id;
    }
    if (dataType) func.dataType = dataType;
    return func;
  };

  setType = function setType(func, type, id) {
    if (!id) {
      astsById.push(func);
    } else {
      func.id = id;
    }
    if (type) func.type = type;
    return func;
  };

  setId = function setId(func, id) {
    if (!id) {
      astsById.push(func);
    } else {
      func.id = id;
    }
    return func;
  };

  nameAst = function nameAst(nm, ast) {
    if (!ast.lazpName) {
      astsByName[nm] = ast;
      ast.lazpName = nm;
      return ast.toString = function toString() {
        return nm;
      };
    }
  };

  addAst = function addAst(ast) {
    if (!ast.funcId) {
      astsById.push(ast);
      ast.funcId = astsById.length;
      return ast;
    }
  };

  evalCompiledAst = function evalCompiledAst(ast) {
    if (ast.lits.length) {
      return eval("(function(__lits){\nreturn " + ast.src + "})")(ast.lits);
    } else {
      return eval(ast.src);
    }
  };

  define('eval', function(ast) {
    return evalCompiledAst(dgen(ast()));
  });

  define('lit', function(_x) {
    return setId((function(_f) {
      return _f()(_x);
    }), _litId);
  });

  define('ref', function(_x) {
    return setId((function(_f) {
      return _f()(_x);
    }), _refId);
  });

  define('lambda', function(_v) {
    return setId((function(_f) {
      return setId((function(_g) {
        return _g()(_v)(_f);
      }), _lambdaId);
    }), -1001);
  });

  define('apply', function(_func) {
    return setId((function(_arg) {
      return setId((function(_f) {
        return _f()(_func)(_arg);
      }), _applyId);
    }), -1002);
  });

  define('prim', function(_arg) {
    return setId((function(_rest) {
      return setId((function(_f) {
        return _f()(_arg)(_rest);
      }), _primId);
    }), -1003);
  });

  getType = function getType(f) {
    var t;
    t = typeof f;
    return (t === 'function' && (f != null ? f.type : void 0)) || ("*" + t);
  };

  lit = setId(root.funcs.lit);

  ref = setId(root.funcs.ref);

  lambda = setId(root.funcs.lambda);

  apply = setId(root.funcs.apply);

  prim = setId(root.funcs.prim);

  getAstType = function getAstType(f) {
    return f.id;
  };

  isPrim = function isPrim(f) {
    return getAstType(f) === _primId;
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

  getPrimArg = function getPrimArg(p) {
    return p(first);
  };

  getPrimRest = function getPrimRest(p) {
    return p(second);
  };

  getPrimArgs = function getPrimArgs(p, args) {
    args = args != null ? args : [];
    p = getPrimRest(p);
    while (isPrim(p)) {
      args.push(getPrimArg(p));
      p = getPrimRest(p);
    }
    args.push(p);
    return args;
  };

  astPrint = function astPrint(ast, res) {
    var arg, func, isFirst, val;
    isFirst = !res;
    res = res != null ? res : [];
    switch (getAstType(ast)) {
      case _refId:
        res.push('ref ');
        val = getRefVar(ast);
        if (val.lambda) {
          throw new Error("Attempt to use lambda in ref, instead of string or number: " + val);
        }
        res.push(val);
        break;
      case _litId:
        res.push('lit ');
        val = getLitVal(ast);
        res.push((val != null ? val.lambda : void 0) ? "{" + val.lambda.toString() + "}" : val);
        break;
      case _lambdaId:
        res.push('lambda ');
        res.push(getLambdaVar(ast));
        res.push(' . ');
        astPrint(getLambdaBody(ast), res);
        break;
      case _applyId:
        func = getApplyFunc(ast);
        arg = getApplyArg(ast);
        res.push('apply (');
        astPrint(getApplyFunc(ast), res);
        res.push(') (');
        astPrint(getApplyArg(ast), res);
        res.push(')');
        break;
      case _primId:
        res.push('prim ');
        astPrint(getPrimArg(ast), res);
        astPrint(getPrimRest(ast), res);
        break;
      default:
        throw new Error("Unknown type of object in AST: " + ast);
    }
    return isFirst && res.join('');
  };

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
      return this.foldl([], (function(i, el) {
        i.push(el);
        return i;
      }));
    };

    Cons.prototype.toString = function toString() {
      return "Cons(" + (this.toArray().join(', ')) + ")";
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

    return CNil;

  })(Cons);

  Nil = new CNil();

  cons = function cons(a, b) {
    return new Cons(a, b);
  };

  Code = (function() {

    function Code(main, subfuncs, fcount, mcount, vars, err, global) {
      var _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
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
      this.global = (_ref6 = this.global) != null ? _ref6 : Nil;
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

    Code.prototype.resetMemo = function resetMemo() {
      return this.copyWith(null, null, null, 0);
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

    Code.prototype.subfuncName = function subfuncName() {
      return "subfunc" + this.fcount;
    };

    Code.prototype.useSubfunc = function useSubfunc(closed) {
      if (!closed) {
        return this;
      } else {
        return this.copyWith(this.subfuncName(), "" + this.subfuncs + "var " + (this.subfuncName()) + " = " + this.main + "\n", this.fcount + 1);
      }
    };

    Code.prototype.memoNames = function memoNames() {
      var i;
      return ((function() {
        var _ref, _results;
        _results = [];
        for (i = 0, _ref = this.mcount; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          _results.push("memo" + i);
        }
        return _results;
      }).call(this)).join(', ');
    };

    Code.prototype.memo = function memo(deref) {
      if (!this.mcount) {
        return this.unreffedValue(deref);
      } else {
        return this.copyWith("(function(){var " + (this.memoNames()) + "; return " + this.main + "})", null, null, 0).reffedValue(deref);
      }
    };

    return Code;

  })();

  dgen = function dgen(ast, lazy, name, globals, tokenDef) {
    var code, res;
    ast.lits = [];
    res = [];
    code = (gen(ast, new Code().setGlobal(cons(name, globals != null ? globals : Nil)), ast.lits, Nil, true)).memo(!lazy);
    if (code.err != null) {
      ast.err = code.err;
    } else if (code.subfuncs.length) {
      ast.src = "(function(){" + (tokenDef != null ? "defineToken('" + name + "', '" + tokenDef + "')\n" : '') + "\n  " + code.subfuncs + "\n  return " + (name != null ? "define('" + name + "', " + code.main + ")" : code.main) + "\n})()";
    } else {
      ast.src = name != null ? "define('" + name + "', " + code.main + ")" : "(" + code.main + ")";
    }
    ast.globals = code.global;
    return ast;
  };

  wrap = function wrap(ast, src) {
    var _ref;
    if (!(ast.type != null) && !ast.dataType) {
      return src;
    } else {
      return "" + (ast.type ? 'setType' : 'setDataType') + "(" + src + ", '" + ((_ref = ast.type) != null ? _ref : ast.dataType) + "')";
    }
  };

  gen = function gen(ast, code, lits, vars, deref) {
    var arg, argCode, args, bodyCode, func, funcCode, src, v, val;
    addAst(ast);
    switch (getAstType(ast)) {
      case _refId:
        val = getRefVar(ast);
        if (val.lambda) throw new Error("attempt to use lambda as a variable");
        code = code.copyWith(nameSub(val)).reffedValue(deref);
        if (vars.find(function(v) {
          return v === val;
        })) {
          return code.addVar(val);
        } else if ((global[nameSub(val)] != null) || code.global.find(function(v) {
          return v === val;
        })) {
          return code;
        } else {
          return code.addErr("Referenced free variable: " + val + ", use lit, instead of ref.");
        }
        break;
      case _litId:
        val = getLitVal(ast);
        src = typeof val === 'function' || typeof val === 'object' ? (lits.push(val), "(function(){\nreturn __lits[" + (lits.length - 1) + "]\n})") : JSON.stringify(val);
        return code.copyWith(src).unreffedValue(deref);
      case _lambdaId:
        v = getLambdaVar(ast);
        bodyCode = gen(getLambdaBody(ast), code.resetMemo(), lits, cons(v, vars), true);
        bodyCode = bodyCode.setVars(bodyCode.vars.removeAll(function(bv) {
          return bv === v;
        }));
        return bodyCode.copyWith(wrap(ast, "function(" + (nameSub(v)) + "){return " + bodyCode.main + "}")).useSubfunc(bodyCode.vars === Nil).memo(deref);
      case _applyId:
        func = getApplyFunc(ast);
        arg = getApplyArg(ast);
        funcCode = gen(func, code, lits, vars, true);
        argCode = gen(arg, funcCode, lits, vars);
        return argCode.copyWith("" + funcCode.main + "(" + argCode.main + ")").unreffedValue(deref);
      case _primId:
        args = (function() {
          var _i, _len, _ref, _results;
          _ref = getPrimArgs(ast);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            arg = _ref[_i];
            _results.push(code = gen(arg, code, lits, vars, true));
          }
          return _results;
        })();
        code.copyWith("" + (getPrimArg(ast)) + "(" + (args.map(a(function() {
          return a.main;
        })).join(', ')) + ")");
        return code.unreffedValue(deref);
      default:
        throw new Error("Unknown object type in gen: " + ast);
    }
  };

  laz = function laz(val) {
    return function() {
      return val;
    };
  };

  defineToken = function defineToken(name, def) {
    var i, o, p, s, types, _ref, _ref2;
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
    for (i = 0, _ref = types.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      s = types[i];
      o = '';
      for (p = 0, _ref2 = s.length; 0 <= _ref2 ? p < _ref2 : p > _ref2; 0 <= _ref2 ? p++ : p--) {
        if (specials.indexOf(s[p]) > -1) o += '\\';
        o += s[p];
      }
      types[i] = o;
    }
    types.push('[().\\\\]| +');
    return tokenPat = new RegExp(baseTokenPat.source + '|' + types.join('|'));
  };

  createDefinition = function createDefinition(name, ast, index) {
    if (index >= name.length) {
      return ast;
    } else {
      return lambda(laz(name[index]))(laz(createDefinition(name, ast, index + 1)));
    }
  };

  prefix = function prefix(name, index, expr, res) {
    if (index >= name.length) {
      res.push(expr);
      return res.join('');
    } else {
      res.push("\\", name[index], '.');
      return prefix(name, index + 1, expr, res);
    }
  };

  getNthBody = function getNthBody(ast, n) {
    if (n === 1) {
      return ast;
    } else {
      return getNthBody(getLambdaBody(ast), n - 1);
    }
  };

  compileLine = function compileLine(line, globals) {
    var ast, bod, def, expr, nm;
    if (line.match(commentPat)) line = '';
    def = line.match(linePat);
    expr = (def ? def[3] : line).trim();
    if (expr) {
      nm = def && def[1] ? def[1].trim().split(/\s+/) : null;
      ast = null;
      if (nm) {
        astsByName[nm[0]] = 1;
        if (def && def[2] !== '=') defineToken(nm[0], def[2]);
        ast = parse(prefix(nm, 1, expr, []));
        bod = ast;
        if (nm.length > 1) {
          bod = getNthBody(ast, nm.length);
          addAst(ast);
        }
        if (getAstType(bod) === _lambdaId) {
          bod.type = nm[0];
          ast.dataType = nm[0];
        }
        nameAst(nm[0], ast);
        dgen(ast, false, nm[0], globals, (def[2] && def[2] !== '=' ? def[2] : null));
        if (nm.length === 1) nameAst(nm[0], ast);
      } else {
        ast = parse(expr);
        dgen(ast, null, null, globals);
      }
      return ast;
    }
  };

  evalLine = function evalLine(line) {
    var ast, result;
    ast = compileLine(line);
    if (ast) {
      if (ast.lazpName) {
        try {
          evalCompiledAst(ast);
          result = "Defined: " + ast.lazpName;
        } catch (err) {
          console.log(err.stack);
          result = err.stack;
        }
        return [ast, result];
      } else {
        try {
          result = evalCompiledAst(ast);
        } catch (err) {
          result = err.stack;
        }
        return [ast, result];
      }
    } else {
      return [];
    }
  };

  nextTok = function nextTok(str) {
    var m, rest, tok;
    m = str.match(tokenPat);
    if (!m) {
      return [str, ''];
    } else if (m[0] === '\n') {
      return ['\n', str.substring(1)];
    } else {
      tok = str.substring(0, m.index > 0 ? m.index : m[0].length);
      rest = str.substring(tok.length);
      if (tok.trim()) {
        return [tok, rest];
      } else {
        return nextTok(rest);
      }
    }
  };

  newParseApply = function newParseApply(str, vars) {
    var err, func, rest, tok, _ref, _ref2;
    if (!str.length) {
      return [null, null, str];
    } else {
      _ref = nextTok(str), tok = _ref[0], rest = _ref[1];
      if (tok === '\n') {
        return [null, null, rest];
      } else if (tok === ')') {
        return [null, "Unexpected close paren", str];
      } else {
        _ref2 = newParseTerm(tok, rest, vars), func = _ref2[0], err = _ref2[1], str = _ref2[2];
        if (err) {
          return [ast, err, rest];
        } else {
          return newContinueApply(func, str, vars);
        }
      }
    }
  };

  newContinueApply = function newContinueApply(func, str, vars) {
    var arg, err, rest, tok, _ref, _ref2;
    _ref = nextTok(str), tok = _ref[0], rest = _ref[1];
    if (tok === '\n' || tok === ')') {
      return [func, null, str];
    } else {
      _ref2 = newParseTerm(tok, rest, vars), arg = _ref2[0], err = _ref2[1], rest = _ref2[2];
      if (err) {
        return [ast, err, rest];
      } else {
        return newContinueApply(apply(laz(func))(laz(arg)), rest, vars);
      }
    }
  };

  newParseTerm = function newParseTerm(tok, rest, vars) {
    var ast, err, str, _ref, _ref2, _ref3;
    if (tok === '\\') {
      return parseLambda(rest, vars);
    } else if (tok === '(') {
      _ref = newParse(rest, vars), ast = _ref[0], err = _ref[1], rest = _ref[2];
      if (err) {
        return [ast, err, rest];
      } else {
        str = rest;
        _ref2 = nextTok(str), tok = _ref2[0], rest = _ref2[1];
        if (tok !== ')') {
          return [ast, 'Expected close paren', str];
        } else {
          return [ast, null, rest];
        }
      }
    } else if (tok[0] === '"' || tok[0] === "'") {
      return [lit(laz(tok.substring(1, tok.length - 1))), null, rest];
    } else if (((_ref3 = global[nameSub(tok)]) != null ? _ref3.lazpName : void 0) === tok || astsByName[tok] || (vars.find(function(v) {
      return tok === v;
    }))) {
      return [ref(laz(tok)), null, rest];
    } else {
      return [lit(laz(scanTok(tok))), null, rest];
    }
  };

  newParseLambda = function newParseLambda(rest, vars) {};

  tokenize = function tokenize(str) {
    var m, pos, tok, toks;
    toks = [];
    pos = 0;
    str = str.replace(/\u03BB/g, '\\');
    while (str.length && (m = str.match(tokenPat))) {
      if (m.index > 0) toks.push(str.substring(0, m.index));
      tok = m[0];
      str = str.substring(m.index + tok.length);
      if (tok === '\n' || tok.trim()) toks.push(tok);
    }
    if (str.length) toks.push(str);
    return toks;
  };

  parse = function parse(str) {
    return parseExpr(tokenize(str).reverse(), Nil);
  };

  addDef = function addDef(toks) {
    var t;
    t = toks.reverse();
    return defs[t[0]] = t.join(' ');
  };

  parseExpr = function parseExpr(toks, vars, expr) {
    var cur, expectedClose, skip, tok;
    while (toks.length) {
      tok = toks.pop();
      if (tok === '\n') return expr;
      if (tok === ')') {
        toks.push(tok);
        return expr;
      }
      if (tok === '\\') {
        cur = parseLambda(toks, vars);
      } else {
        expectedClose = groupOpens[tok];
        skip = false;
        if (expectedClose) {
          cur = parseExpr(toks, vars, tok !== '(' ? parseVariable(tok, vars) : null);
          if (toks.length && toks[toks.length - 1] === expectedClose) toks.pop();
          skip = true;
        }
        if (!skip) cur = parseVariable(tok, vars);
      }
      expr = expr ? apply(laz(expr))(laz(cur)) : cur;
      if (groupCloses[tok]) {
        toks.push(tok);
        return expr;
      }
    }
    return expr;
  };

  parseVariable = function parseVariable(tok, vars) {
    var _ref;
    if (tok[0] === '"' || tok[0] === "'") {
      return lit(laz(tok.substring(1, tok.length - 1)));
    } else if (((_ref = global[nameSub(tok)]) != null ? _ref.lazpName : void 0) === tok || astsByName[tok] || (vars.find(function(v) {
      return tok === v;
    }))) {
      return ref(laz(tok));
    } else {
      return lit(laz(scanTok(tok)));
    }
  };

  scanTok = function scanTok(tok) {
    try {
      return JSON.parse(tok);
    } catch (err) {
      return tok;
    }
  };

  parseLambda = function parseLambda(toks, vars) {
    var body, nm;
    if (toks.length < 3 || toks[toks.length - 1] === '.') {
      throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '));
    }
    nm = toks.pop();
    if (toks[toks.length - 1] === '.') {
      toks.pop();
      while (toks.length && toks[toks.length - 1] === '\n') {
        toks.pop();
      }
      body = parseExpr(toks, cons(nm, vars));
    } else {
      body = parseLambda(toks, cons(nm, vars));
    }
    return lambda(laz(nm))(laz(body));
  };

  root.parse = parse;

  root.astPrint = astPrint;

  root.gen = dgen;

  root.laz = laz;

  root.compileLine = compileLine;

  root.evalLine = evalLine;

  root.setId = setId;

  root.setType = setType;

  root.setDataType = setDataType;

  root.astEval = function astEval(ast) {
    return evalCompiledAst(dgen(ast));
  };

  root.define = define;

  root.getAstType = getAstType;

  root.getType = getType;

  root.linePat = linePat;

  root.Nil = Nil;

  root.cons = cons;

  root.defineToken = defineToken;

  root.tokenize = tokenize;

  root.nextTok = nextTok;

}).call(this);
