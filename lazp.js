
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
  var CNil, Cons, Memo, Nil, addAst, addDef, addToken, apply, astEval, astPrint, astsById, astsByName, charCodes, codeChars, compileLine, createDefinition, createTokenPat, defineToken, dgen, evalLine, first, gen, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getNthBody, getPrimArg, getPrimRest, getRefVar, groupCloses, groupOpens, isPrim, lambda, laz, linePat, lit, memoEnd, memoStart, nameAst, nameSub, order, parse, prefix, prim, ref, root, scanTok, second, setDataType, setId, setType, specials, tokenPat, tokenize, tokens, tparse, tparseLambda, tparseVariable, warnFreeVariable, __apply, __eq, __is, __lambda, __lit, __prim, __ref, _applyId, _eval, _false, _lambdaId, _litId, _primId, _refId, _true,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  _refId = -1;

  _litId = -2;

  _lambdaId = -3;

  _applyId = -4;

  _primId = -5;

  tokenPat = null;

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

  setDataType = function(func, id, dataType) {
    if (!id) {
      astsById.push(func);
    } else {
      func.id = id;
    }
    if (dataType) func.dataType = dataType;
    return func;
  };

  setType = function(func, id, type) {
    if (!id) {
      astsById.push(func);
    } else {
      func.id = id;
    }
    if (type) func.type = type;
    return func;
  };

  setId = function(func, id) {
    if (!id) {
      astsById.push(func);
    } else {
      func.id = id;
    }
    return func;
  };

  nameAst = function(nm, ast) {
    if (!ast.lazpName) {
      astsByName[nm] = ast;
      ast.lazpName = nm;
      return ast.toString = function() {
        return nm;
      };
    }
  };

  addAst = function(ast) {
    if (!ast.funcId) {
      astsById.push(ast);
      ast.funcId = astsById.length;
      return ast;
    }
  };

  astEval = function(ast, src) {
    src = src || ast.src;
    if (ast.lits.length) {
      return eval("(function(__lits){return " + src + "})")(ast.lits);
    } else {
      return eval(src);
    }
  };

  _eval = function() {
    return function(ast) {
      return astEval(dgen(ast()));
    };
  };

  __lit = function() {
    return function(_x) {
      return setId((function(_f) {
        return _f()(_x);
      }), _litId);
    };
  };

  __ref = function() {
    return function(_x) {
      return setId((function(_f) {
        return _f()(_x);
      }), _refId);
    };
  };

  __lambda = function() {
    return function(_v) {
      return setId((function(_f) {
        return setId((function(_g) {
          return _g()(_v)(_f);
        }), _lambdaId);
      }), -1001);
    };
  };

  __apply = function() {
    return function(_func) {
      return setId((function(_arg) {
        return setId((function(_f) {
          return _f()(_func)(_arg);
        }), _applyId);
      }), -1002);
    };
  };

  __prim = function() {
    return function(_arg) {
      return setId((function(_rest) {
        return setId((function(_f) {
          return _f()(_arg)(_rest);
        }), _primId);
      }), -1003);
    };
  };

  _true = function() {
    return function(a) {
      return function(b) {
        return a();
      };
    };
  };

  _false = function() {
    return function(a) {
      return function(b) {
        return b();
      };
    };
  };

  __is = function() {
    return function(value) {
      return function(type) {
        var _ref;
        if (((_ref = value()) != null ? _ref.type : void 0) === type().dataType) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  };

  __eq = function() {
    return function(a) {
      return function(b) {
        console.log("a = " + a + "\nb = " + b);
        if (a() === b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  };

  astsByName.eval = setId(_eval());

  astsByName["true"] = setId(_true());

  astsByName["false"] = setId(_false());

  astsByName._is = setId(__is());

  astsByName._eq = setId(__eq());

  lit = astsByName._lit = setId(__lit());

  ref = astsByName._ref = setId(__ref());

  lambda = astsByName._lambda = setId(__lambda());

  apply = astsByName._apply = setId(__apply());

  prim = astsByName._prim = setId(__prim());

  getAstType = function(f) {
    var _ref;
    return f.id || ((_ref = f.lambda) != null ? _ref.id : void 0);
  };

  isPrim = function(f) {
    return getAstType(f) === _primId;
  };

  first = function() {
    return function(a) {
      return a;
    };
  };

  second = function() {
    return function(a) {
      return function(b) {
        return b();
      };
    };
  };

  getRefVar = function(r) {
    return r(first)();
  };

  getLitVal = function(l) {
    return l(first)();
  };

  getLambdaVar = function(l) {
    return l(first);
  };

  getLambdaBody = function(l) {
    return l(second);
  };

  getApplyFunc = function(a) {
    return a(first);
  };

  getApplyArg = function(a) {
    return a(second);
  };

  getPrimArg = function(p) {
    return p(first);
  };

  getPrimRest = function(p) {
    return p(second);
  };

  astPrint = function(ast, res) {
    var isFirst, val;
    isFirst = !res;
    res = res || [];
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
        res.push(val.lambda ? "{" + val.lambda.toString() + "}" : val);
        break;
      case _lambdaId:
        res.push('lambda ');
        res.push(getLambdaVar(ast));
        res.push(' . ');
        astPrint(getLambdaBody(ast), res);
        break;
      case _applyId:
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

  Memo = (function() {

    function Memo() {
      this.count = 0;
    }

    Memo.prototype.add = function() {
      return "memo" + this.count++;
    };

    Memo.prototype.toString = function() {
      var i, ret, _ref;
      if (this.count) {
        ret = 'var ';
        for (i = 0, _ref = this.count; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          if (i > 0) ret += ", ";
          ret += "memo" + i;
        }
        ret += "; ";
        return ret;
      } else {
        return '';
      }
    };

    return Memo;

  })();

  memoStart = function(res, memo, deref) {
    var mem;
    if (!deref) {
      mem = memo.add();
      return res.push("function(){return ", mem, " || (", mem, " = ");
    }
  };

  memoEnd = function(res, memo, deref) {
    if (!deref) return res.push(")}");
  };

  Cons = (function() {

    function Cons(head, tail) {
      this.head = head;
      this.tail = tail;
    }

    Cons.prototype.contains = function(val) {
      return this.head === val || this.tail.contains(val);
    };

    return Cons;

  })();

  CNil = (function(_super) {

    __extends(CNil, _super);

    function CNil() {
      CNil.__super__.constructor.apply(this, arguments);
    }

    CNil.prototype.contains = function() {
      return false;
    };

    return CNil;

  })(Cons);

  Nil = new CNil();

  dgen = function(ast, lazy) {
    var mem;
    mem = new Memo();
    ast.lits = [];
    gen(ast, [], ast.lits, Nil, mem, true);
    if (mem.count || lazy) {
      ast.src = "(function(){" + mem + "return " + ast.src + "})" + (!lazy ? '()' : '');
    }
    return ast;
  };

  gen = function(ast, res, lits, vars, memo, deref, prim, cont) {
    var arg, func, idIdx, rest, v, val;
    addAst(ast);
    switch (getAstType(ast)) {
      case _refId:
        val = getRefVar(ast);
        if (val.lambda) throw new Error("attempt to use lambda as a variable");
        if (!vars.contains(val) && !astsByName[val]) {
          throw new Error("unbound variable, '" + val + "' -- use lit instead");
        }
        res.push(nameSub(val));
        if (deref) res.push("()");
        break;
      case _litId:
        val = getLitVal(ast);
        if (!deref) res.push("(function(){return ");
        if (typeof val === 'function' || typeof val === 'object') {
          res.lits.push(val);
          res.push("(function(){return __lits[" + (res.lits.length - 1) + "]})");
        } else {
          res.push(JSON.stringify(val));
        }
        if (!deref) res.push("})");
        break;
      case _lambdaId:
        v = getLambdaVar(ast);
        memo = new Memo();
        if (!deref) res.push("(function(){return ");
        idIdx = res.length;
        res.push("setId", "(function(" + nameSub(v) + "){", memo, "return ");
        gen(getLambdaBody(ast), res, lits, new Cons(v, vars), memo, true);
        res[idIdx] = ast.type ? 'setType' : ast.dataType ? 'setDataType' : 'setId';
        res.push("}, " + ast.funcId + (ast.type ? ', \'' + ast.type + '\'' : '') + (ast.dataType ? ', \'' + ast.dataType + '\'' : '') + ")");
        if (!deref) res.push("})");
        break;
      case _applyId:
        func = getApplyFunc(ast);
        arg = getApplyArg(ast);
        memoStart(res, memo, deref);
        gen(func, res, lits, vars, memo, true);
        res.push("(");
        gen(arg, res, lits, vars, memo);
        res.push(")");
        memoEnd(res, memo, deref);
        break;
      case _primId:
        arg = getPrimArg(ast);
        rest = getPrimRest(ast);
        if (prim) {
          if (cont) res.push(", ");
          res.push(arg);
          if (isPrim(rest)) gen(rest, res, lits, vars, memo, false, true, true);
        } else {
          memoStart(res, memo, deref);
          res.push(arg);
          res.push("(");
          if (isPrim(rest)) gen(rest, res, lits, vars, memo, true, true, false);
          res.push(")");
          memoEnd(res, memo, deref);
        }
        break;
      default:
        throw new Error("Unknown object type in gen: " + ast);
    }
    return ast.src = res.join('');
  };

  laz = function(val) {
    return function() {
      return val;
    };
  };

  nameSub = function(name) {
    var code, i, s, _ref;
    s = '_';
    for (i = 0, _ref = name.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      code = charCodes[name[i]];
      if (code) {
        if (!s) s = name.substring(0, i);
        s += code;
      } else if (s) {
        s += name[i];
      }
    }
    return s || name;
  };

  defineToken = function(name, def) {
    if (def !== '=') {
      tokens[name] = 1;
      tokenPat = null;
      if (def[1] === '(') {
        return groupOpens[name] = def.substring(2, def.length - 1);
      } else if (def[1] === ')') {
        return groupCloses[name] = 1;
      }
    }
  };

  createDefinition = function(name, ast, index) {
    if (index >= name.length) {
      return ast;
    } else {
      return lambda(laz(name[index]))(laz(createDefinition(name, ast, index + 1)));
    }
  };

  prefix = function(name, index, expr, res) {
    if (index >= name.length) {
      res.push(expr);
      return res.join('');
    } else {
      res.push("\\", name[index], '.');
      return prefix(name, index + 1, expr, res);
    }
  };

  getNthBody = function(ast, n) {
    if (n === 1) {
      return ast;
    } else {
      return getNthBody(getLambdaBody(ast), n - 1);
    }
  };

  compileLine = function(line) {
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
        dgen(ast);
        if (nm.length === 1) {
          nameAst(nm[0], ast);
          ast.src = "" + (nameSub(nm[0])) + " = setId(function(){return " + ast.src + "}, null, '" + ast.lazpName + "')";
        } else {
          ast.src = "" + (nameSub(nm[0])) + " = function(){return " + ast.src + "}";
        }
      } else {
        ast = parse(expr);
        dgen(ast);
      }
      return ast;
    }
  };

  evalLine = function(line) {
    var ast, result;
    ast = compileLine(line);
    if (ast) {
      if (ast.lazpName) {
        try {
          astEval(ast);
          result = "Defined: " + ast.lazpName;
        } catch (err) {
          console.log(err.stack);
          result = err.stack;
        }
        return [ast, result];
      } else {
        try {
          result = astEval(ast);
        } catch (err) {
          result = err.stack;
        }
        return [ast, result];
      }
    } else {
      return [];
    }
  };

  addToken = function(tok, group) {
    var pat;
    pat = '';
    tokens[tok] = group;
    return tokenPat = null;
  };

  createTokenPat = function() {
    var i, o, p, s, types, _ref, _ref2;
    if (!tokenPat) {
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
      types.push('((#define|#strict|#lazy)(?=[ \t]))|[()#.\\\\]| +');
      return tokenPat = new RegExp(/'(\\'|[^'])*'|"(\\"|[^"])*"/.source + '|' + types.join('|'));
    }
  };

  tokenize = function(str) {
    var pos, tok, toks;
    pos = 0;
    toks = [];
    str = str.replace(/\u03BB/g, '\\');
    createTokenPat();
    while (str.length && (pos = str.search(tokenPat)) > -1) {
      if (pos > 0) toks.push(str.substring(0, pos));
      tok = tokenPat.exec(str.substring(pos))[0];
      if (tok.trim()) {
        if (tok[0] === '#' && !tok.match(/^#(define|strict|lazy)/)) break;
        toks.push(tok);
      }
      str = str.substring(pos + tok.length);
    }
    if (str.length) toks.push(str);
    return toks;
  };

  parse = function(str) {
    return tparse(tokenize(str).reverse(), {});
  };

  addDef = function(toks) {
    var t;
    t = toks.reverse();
    return defs[t[0]] = t.join(' ');
  };

  tparse = function(toks, vars, expr) {
    cur;
    var cur, expectedClose, i, oldVars, skip, tok;
    oldVars = {};
    while (toks.length) {
      tok = toks.pop();
      if (tok === ')') {
        toks.push(tok);
        return expr;
      }
      if (tok === '\\') {
        cur = tparseLambda(toks, vars);
      } else if (tok === '#define') {
        addDef(toks);
        toks = [];
      } else if (tok === '#lazy' || tok === '#strict') {
        cur = tparseVariable(tok, vars, oldVars);
      } else {
        expectedClose = groupOpens[tok];
        skip = false;
        if (expectedClose) {
          cur = tparse(toks, vars, tok !== '(' ? tparseVariable(tok, vars, oldVars) : null);
          if (toks.length && toks[toks.length - 1] === expectedClose) toks.pop();
          skip = true;
        }
        if (!skip) cur = tparseVariable(tok, vars, oldVars);
      }
      expr = expr ? apply(laz(expr))(laz(cur)) : cur;
      if (groupCloses[tok]) {
        toks.push(tok);
        return expr;
      }
    }
    for (i in oldVars) {
      vars[i] = oldVars[i];
    }
    return expr;
  };

  tparseVariable = function(tok, vars, oldVars) {
    var cur;
    if (vars[tok] || astsByName[tok]) {
      vars[tok] = tok;
      cur = ref(laz(tok));
    } else {
      cur = lit(laz(scanTok(tok)));
    }
    return cur;
  };

  scanTok = function(tok) {
    try {
      return JSON.parse(tok);
    } catch (err) {
      return tok;
    }
  };

  tparseLambda = function(toks, vars) {
    var body, nm, old;
    nm = null;
    if (toks.length < 3 || toks[toks.length - 1] === '.') {
      throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '));
    }
    old = vars[nm];
    if (toks[toks.length - 2] === '.') {
      nm = toks.pop();
      vars[nm] = nm;
      toks.pop();
      body = tparse(toks, vars);
    } else {
      nm = toks.pop();
      vars[nm] = nm;
      body = tparseLambda(toks, vars);
    }
    vars[nm] = old;
    return lambda(laz(nm))(laz(body));
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.parse = parse;

  root.astPrint = astPrint;

  root.gen = dgen;

  root.laz = laz;

  root.compileLine = compileLine;

  root.evalLine = evalLine;

  root.setId = setId;

  root.setType = setType;

  root.setDataType = setDataType;

  root.eval = function(ast) {
    return astEval(dgen(ast));
  };

  global.__is = __is;

  global.__eq = __eq;

}).call(this);
