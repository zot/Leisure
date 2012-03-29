
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

/*
High level representation of Lambda Calculus AST

Represent ASTs as LC cons-lists
*/

(function() {
  var CNil, Code, Cons, Nil, addAst, addDef, apply, astPrint, astsById, astsByName, charCodes, codeChars, compileLine, createDefinition, define, defineToken, dgen, evalCompiledAst, evalLine, first, gen, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getNthBody, getPrimArg, getPrimArgs, getPrimRest, getRefVar, groupCloses, groupOpens, isPrim, lambda, laz, line, linePat, lit, nameAst, nameSub, order, parse, prefix, prim, ref, root, scanTok, second, setDataType, setId, setType, specials, tokenPat, tokenize, tokens, tparse, tparseLambda, tparseVariable, warnFreeVariable, _apply, _applyId, _cons, _eq, _eval, _false, _i, _is, _lambda, _lambdaId, _len, _lit, _litId, _prim, _primId, _ref, _ref2, _refId, _true,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Lazp = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  _refId = -1;

  _litId = -2;

  _lambdaId = -3;

  _applyId = -4;

  _primId = -5;

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

  define = function define(name, func) {
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

  _eval = define('eval', function() {
    return function(ast) {
      return evalCompiledAst(dgen(ast()));
    };
  });

  _lit = global._lit = define('lit', function() {
    return function(_x) {
      return setId((function(_f) {
        return _f()(_x);
      }), _litId);
    };
  });

  _ref = global._ref = define('ref', function() {
    return function(_x) {
      return setId((function(_f) {
        return _f()(_x);
      }), _refId);
    };
  });

  _lambda = global._lambda = define('lambda', function() {
    return function(_v) {
      return setId((function(_f) {
        return setId((function(_g) {
          return _g()(_v)(_f);
        }), _lambdaId);
      }), -1001);
    };
  });

  _apply = global._apply = define('apply', function() {
    return function(_func) {
      return setId((function(_arg) {
        return setId((function(_f) {
          return _f()(_func)(_arg);
        }), _applyId);
      }), -1002);
    };
  });

  _prim = global._prim = define('prim', function() {
    return function(_arg) {
      return setId((function(_rest) {
        return setId((function(_f) {
          return _f()(_arg)(_rest);
        }), _primId);
      }), -1003);
    };
  });

  _is = global._is = define('is', function() {
    return function(value) {
      return function(type) {
        var _ref2;
        if (((_ref2 = value()) != null ? _ref2.type : void 0) === type().dataType) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  _eq = global._eq = define('eq', function() {
    return function(a) {
      return function(b) {
        if (a() === b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  astsByName.eval = setId(_eval());

  astsByName.is = setId(_is());

  astsByName.eq = setId(_eq());

  lit = astsByName.lit = setId(_lit());

  ref = astsByName.ref = setId(_ref());

  lambda = astsByName.lambda = setId(_lambda());

  apply = astsByName.apply = setId(_apply());

  prim = astsByName.prim = setId(_prim());

  getAstType = function getAstType(f) {
    var _ref2, _ref3;
    return (_ref2 = f.id) != null ? _ref2 : (_ref3 = f.lambda) != null ? _ref3.id : void 0;
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
      var _ref2, _ref3, _ref4, _ref5;
      this.main = main;
      this.subfuncs = subfuncs;
      this.fcount = fcount;
      this.mcount = mcount;
      this.main = (_ref2 = this.main) != null ? _ref2 : '';
      this.subfuncs = (_ref3 = this.subfuncs) != null ? _ref3 : '';
      this.fcount = (_ref4 = this.fcount) != null ? _ref4 : 0;
      this.mcount = (_ref5 = this.mcount) != null ? _ref5 : 0;
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
        var _ref2, _results;
        _results = [];
        for (i = 0, _ref2 = this.mcount; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
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

  gen = function gen(ast, code, lits, vars, deref) {
    var arg, argCode, args, bodyCode, func, funcCode, src, v, val, _ref2, _ref3, _ref4;
    addAst(ast);
    switch (getAstType(ast)) {
      case _refId:
        val = getRefVar(ast);
        if (val.lambda) throw new Error("attempt to use lambda as a variable");
        if (!vars.contains(val) && !astsByName[val]) {
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
        return bodyCode.copyWith("" + (ast.type ? 'setType' : ast.dataType ? 'setDataType' : 'setId') + "(function(" + (nameSub(v)) + "){return " + bodyCode.main + "}" + (((_ref2 = (_ref3 = ast.type) != null ? _ref3 : ast.dataType) != null ? _ref2 : false) ? ', "' + ((_ref4 = ast.type) != null ? _ref4 : ast.dataType) + '"' : '') + ")").useSubfunc(!ast.notFree).memo(deref);
      case _applyId:
        func = getApplyFunc(ast);
        arg = getApplyArg(ast);
        funcCode = gen(func, code, lits, vars, true);
        argCode = gen(arg, funcCode, lits, vars);
        return argCode.copyWith("" + funcCode.main + "(" + argCode.main + ")").unreffedValue(deref);
      case _primId:
        args = (function() {
          var _i, _len, _ref5, _results;
          _ref5 = getPrimArgs(ast);
          _results = [];
          for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
            arg = _ref5[_i];
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

  nameSub = function nameSub(name) {
    var code, i, s, _ref2;
    s = '_';
    for (i = 0, _ref2 = name.length; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      code = charCodes[name[i]];
      s += code != null ? code : name[i];
    }
    return s;
  };

  defineToken = function defineToken(name, def) {
    var i, o, p, s, types, _ref2, _ref3;
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
      for (i = 0, _ref2 = types.length; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
        s = types[i];
        o = '';
        for (p = 0, _ref3 = s.length; 0 <= _ref3 ? p < _ref3 : p > _ref3; 0 <= _ref3 ? p++ : p--) {
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
    def = line.match(linePat);
    expr = (def ? def[3] : line).trim();
    if (expr) {
      nm = def && def[1] ? def[1].trim().split(/\s+/) : null;
      ast = null;
      if (nm) {
        astsByName[nm[0]] = 1;
        if (def) defineToken(nm[0], def[2]);
        ast = parse(prefix(nm, 1, expr, []));
        if (nm.length > 1) {
          bod = getNthBody(ast, nm.length);
          if (getAstType(bod) === _lambdaId) {
            bod.type = nm[0];
            ast.dataType = nm[0];
          }
          addAst(ast);
        }
        nameAst(nm[0], ast);
        dgen(ast, true, nm[0]);
        if (nm.length === 1) {
          nameAst(nm[0], ast);
          ast.src = "" + (nameSub(nm[0])) + " = setId(" + ast.src + ", null, '" + ast.lazpName + "')";
        } else {
          ast.src = "" + (nameSub(nm[0])) + " = " + ast.src;
        }
      } else {
        ast = parse(expr);
        dgen(ast);
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

  tokenize = function tokenize(str) {
    var pos, tok, toks;
    pos = 0;
    toks = [];
    str = str.replace(/\u03BB/g, '\\');
    while (str.length && (pos = str.search(tokenPat)) > -1) {
      if (pos > 0) toks.push(str.substring(0, pos));
      tok = tokenPat.exec(str.substring(pos))[0];
      if (tok.trim()) {
        if (tok[0] === '#') break;
        toks.push(tok);
      }
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
    var path, v, _i, _len, _ref2;
    if (((_ref2 = global[nameSub(tok)]) != null ? _ref2.lazpName : void 0) === tok || astsByName[tok]) {
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

  _ref2 = "true a b = a\nfalse a b = b\n\n# lists\ncons a b = \f . f a b\nappend = rec \append l1 l2 . l1 (\h t D . cons h (append t l2)) l2\n\n# difference lists\ndl = \list . append list\ndlAppend = \da db list . da (db list)\ndlList = \dl . dl nil\n# simple IO monad\nmakeIO = \cmds f . f cmds\ngetCmds = \m . m (\cmds . cmds)\ngetAllCmds = \m . dlList (getCmds m)\nreturnCmd = \x f . f x\nreturn = \x . makeIO (dl [(returnCmd x)])\nbindCmd = \action f . f action\ngetBindAction = \cmd . cmd ident\nbind = \io f . io \cmds . makeIO (dlAppend cmds (dl [(bindCmd f)]))\nalertCmd = \thing f . f thing\nalert = \thing . makeIO (dl [(alertCmd thing)])\npromptCmd = \prompt f . f prompt\nprompt = \prompt . makeIO (dl [(promptCmd prompt)])".split('\n');
  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
    line = _ref2[_i];
    evalLine(line);
  }

  _true = global._true;

  _false = global._false;

  _cons = global._cons;

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

}).call(this);
