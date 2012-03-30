
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
  var CNil, Code, Cons, Nil, addAst, addDef, apply, astPrint, astsById, astsByName, charCodes, codeChars, commentPat, compileLine, createDefinition, define, defineToken, dgen, evalCompiledAst, evalLine, first, gen, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getNthBody, getPrimArg, getPrimArgs, getPrimRest, getRefVar, groupCloses, groupOpens, isPrim, lambda, laz, linePat, lit, nameAst, nameSub, order, parse, prefix, prim, ref, root, scanTok, second, setDataType, setId, setType, specials, tokenPat, tokenize, tokens, tparse, tparseLambda, tparseVariable, warnFreeVariable, wrap, _applyId, _lambdaId, _litId, _primId, _refId,
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

  tokenPat = /'(\\'|[^'])*'|"(\\"|[^"])*"|[()#.\\\\]| +/;

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
    root.funcs[nm] = func;
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

  define('is', function(value) {
    return function(type) {
      var _ref;
      if (((_ref = value()) != null ? _ref.type : void 0) === type().dataType) {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('eq', function(a) {
    return function(b) {
      if (a() === b()) {
        return _true();
      } else {
        return  _false();
      }
    };
  });

  define('withType', function(value) {
    return function(t) {
      return function(f) {
        var type, _ref;
        if (type = (_ref = value()) != null ? _ref.type : void 0) {
          return t()(function() {
            return type;
          });
        } else {
          return f();
        }
      };
    };
  });

  lit = setId(root.funcs._lit);

  ref = setId(root.funcs._ref);

  lambda = setId(root.funcs._lambda);

  apply = setId(root.funcs._apply);

  prim = setId(root.funcs._prim);

  getAstType = function getAstType(f) {
    var _ref, _ref2;
    return (_ref = f.id) != null ? _ref : (_ref2 = f.lambda) != null ? _ref2.id : void 0;
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

    Cons.prototype.contains = function contains(val) {
      return this.head === val || this.tail.contains(val);
    };

    Cons.prototype.find = function find(func) {
      return func(this.head) || this.tail.find(func);
    };

    return Cons;

  })();

  CNil = (function(_super) {

    __extends(CNil, _super);

    function CNil() {
      CNil.__super__.constructor.apply(this, arguments);
    }

    CNil.prototype.contains = function contains() {
      return false;
    };

    CNil.prototype.find = function find() {
      return false;
    };

    return CNil;

  })(Cons);

  Nil = new CNil();

  Code = (function() {

    function Code(main, subfuncs, fcount, mcount) {
      var _ref, _ref2, _ref3, _ref4;
      this.main = main;
      this.subfuncs = subfuncs;
      this.fcount = fcount;
      this.mcount = mcount;
      this.main = (_ref = this.main) != null ? _ref : '';
      this.subfuncs = (_ref2 = this.subfuncs) != null ? _ref2 : '';
      this.fcount = (_ref3 = this.fcount) != null ? _ref3 : 0;
      this.mcount = (_ref4 = this.mcount) != null ? _ref4 : 0;
    }

    Code.prototype.copyWith = function copyWith(main, subfuncs, fcount, mcount) {
      return new Code(main != null ? main : this.main, subfuncs != null ? subfuncs : this.subfuncs, fcount != null ? fcount : this.fcount, mcount != null ? mcount : this.mcount);
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

    Code.prototype.useSubfunc = function useSubfunc(free) {
      if (!free) {
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

  dgen = function dgen(ast, lazy, name) {
    var code, res;
    ast.lits = [];
    res = [];
    code = (gen(ast, new Code(), ast.lits, Nil, true)).memo(!lazy);
    if (code.subfuncs.length) {
      ast.src = "(function(){\n  " + code.subfuncs + "\n  return " + (name != null ? "define('" + name + "', " + code.main + ")" : code.main) + "\n})()";
    } else {
      ast.src = code.main;
    }
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
    var arg, argCode, args, bodyCode, func, funcCode, src, v, val, _ref;
    addAst(ast);
    switch (getAstType(ast)) {
      case _refId:
        val = getRefVar(ast);
        if (val.lambda) throw new Error("attempt to use lambda as a variable");
        if (!vars.contains(val) && !astsByName[val] && !(((_ref = global[nameSub(val)]) != null ? _ref.lazpName : void 0) === val)) {
          throw new Error("unbound variable, '" + val + "' -- use lit instead");
        }
        return code.copyWith(nameSub(val)).reffedValue(deref);
      case _litId:
        val = getLitVal(ast);
        src = typeof val === 'function' || typeof val === 'object' ? (lits.push(val), "(function(){\nreturn __lits[" + (lits.length - 1) + "]\n})") : JSON.stringify(val);
        return code.copyWith(src).unreffedValue(deref);
      case _lambdaId:
        v = getLambdaVar(ast);
        bodyCode = gen(getLambdaBody(ast), code.resetMemo(), lits, new Cons(v, vars), true);
        return bodyCode.copyWith(wrap(ast, "function(" + (nameSub(v)) + "){return " + bodyCode.main + "}")).useSubfunc(!ast.notFree).memo(deref);
      case _applyId:
        func = getApplyFunc(ast);
        arg = getApplyArg(ast);
        funcCode = gen(func, code, lits, vars, true);
        argCode = gen(arg, funcCode, lits, vars);
        return argCode.copyWith("" + funcCode.main + "(" + argCode.main + ")").unreffedValue(deref);
      case _primId:
        args = (function() {
          var _i, _len, _ref2, _results;
          _ref2 = getPrimArgs(ast);
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            arg = _ref2[_i];
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
    if (def !== '=') {
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
      types.push('[()#.\\\\]| +');
      return tokenPat = new RegExp(/'(\\'|[^'])*'|"(\\"|[^"])*"/.source + '|' + types.join('|'));
    }
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

  compileLine = function compileLine(line) {
    var ast, bod, def, expr, nm;
    if (line.match(commentPat)) line = '';
    if (true) {
      def = line.match(linePat);
      expr = (def ? def[3] : line).trim();
      if (expr) {
        nm = def && def[1] ? def[1].trim().split(/\s+/) : null;
        ast = null;
        if (nm) {
          astsByName[nm[0]] = 1;
          if (def) defineToken(nm[0], def[2]);
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
          dgen(ast, false, nm[0]);
          if (nm.length === 1) nameAst(nm[0], ast);
        } else {
          ast = parse(expr);
          dgen(ast);
        }
        return ast;
      }
    } else {
      return console.log("comment: " + line);
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

  tokenize = function tokenize(str) {
    var pos, tok, toks;
    toks = [];
    pos = 0;
    str = str.replace(/\u03BB/g, '\\');
    while (str.length && (pos = str.search(tokenPat)) > -1) {
      if (pos > 0) toks.push(str.substring(0, pos));
      tok = tokenPat.exec(str.substring(pos))[0];
      if (tok.trim()) toks.push(tok);
      str = str.substring(pos + tok.length);
    }
    if (str.length) toks.push(str);
    return toks;
  };

  parse = function parse(str) {
    return tparse(tokenize(str).reverse(), Nil);
  };

  addDef = function addDef(toks) {
    var t;
    t = toks.reverse();
    return defs[t[0]] = t.join(' ');
  };

  tparse = function tparse(toks, vars, expr) {
    cur;
    var ast, cur, expectedClose, skip, tok;
    while (toks.length) {
      tok = toks.pop();
      if (tok === ')') {
        toks.push(tok);
        return expr;
      }
      if (tok === '\\') {
        cur = tparseLambda(toks, vars);
      } else {
        expectedClose = groupOpens[tok];
        skip = false;
        if (expectedClose) {
          cur = tparse(toks, vars, tok !== '(' ? tparseVariable(tok, vars) : null);
          if (toks.length && toks[toks.length - 1] === expectedClose) toks.pop();
          skip = true;
        }
        if (!skip) cur = tparseVariable(tok, vars);
      }
      expr = expr ? (ast = apply(laz(expr))(laz(cur)), ast.notFree = expr.notFree || cur.notFree, ast) : cur;
      if (groupCloses[tok]) {
        toks.push(tok);
        return expr;
      }
    }
    return expr;
  };

  tparseVariable = function tparseVariable(tok, vars) {
    var path, v, _i, _len, _ref;
    if (((_ref = global[nameSub(tok)]) != null ? _ref.lazpName : void 0) === tok || astsByName[tok]) {
      return ref(laz(tok));
    } else {
      path = [];
      if (vars.find(function(v) {
        return tok === v.name || !path.push(v);
      })) {
        for (_i = 0, _len = path.length; _i < _len; _i++) {
          v = path[_i];
          v.notFree = true;
        }
        return ref(laz(tok));
      } else {
        return lit(laz(scanTok(tok)));
      }
    }
  };

  scanTok = function scanTok(tok) {
    try {
      return JSON.parse(tok);
    } catch (err) {
      return tok;
    }
  };

  tparseLambda = function tparseLambda(toks, vars) {
    var ast, body, nm, v;
    nm = null;
    v = {
      notFree: false
    };
    if (toks.length < 3 || toks[toks.length - 1] === '.') {
      throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '));
    }
    if (toks[toks.length - 2] === '.') {
      nm = toks.pop();
      toks.pop();
      v.name = nm;
      body = tparse(toks, new Cons(v, vars));
    } else {
      nm = toks.pop();
      v.name = nm;
      body = tparseLambda(toks, new Cons(v, vars));
    }
    ast = lambda(laz(nm))(laz(body));
    ast.notFree = v.notFree;
    return ast;
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

}).call(this);
