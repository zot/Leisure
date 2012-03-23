
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
  var CNil, CTX, Cons, Memo, Nil, addDef, addExpr, addToken, apply, astPrint, charCodes, codeChars, createContext, createTokenPat, defineToken, dgen, evalLine, first, gen, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getNameAst, getNameNm, getPrimArg, getPrimRest, getRefVar, isPrim, lambda, laz, lit, memoEnd, memoStart, name, nameSub, newEntry, order, parse, prim, ref, root, second, specials, tokenDefPat, tokenPat, tokenize, tparse, tparseLambda, tparseVariable, warnFreeVariable, _applyId, _lambdaId, _litId, _nameId, _primId, _refId,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  CTX = lit = ref = lambda = apply = prim = name = null;

  _refId = -1;

  _litId = -2;

  _lambdaId = -3;

  _applyId = -4;

  _primId = -5;

  _nameId = -6;

  tokenPat = null;

  specials = '[]().*+?|';

  tokenDefPat = /^ *([^ ]+) *(=[.)]=|=\([^=]+=|=)(?:[^=])/;

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

  /*
       * multiline string
  */

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

  getNameNm = function(n) {
    return n(first);
  };

  getNameAst = function(n) {
    return n(second);
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
      case _nameId:
        res.push('name ', getNameNm(ast), ' (');
        astPrint(getNameAst(ast), res);
        res.push(')');
        break;
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

  createContext = function() {
    var ctx;
    ctx = (function() {
      var C, addAst, groupCloses, groupOpens, id, nameAst, tokens, __apply, __lambda, __lit, __name, __prim, __ref, _eval;
      tokens = {};
      groupOpens = {
        '(': ')'
      };
      groupCloses = {
        ')': 1
      };
      _eval = function() {
        return function(ast) {
          return eval(dgen(ast())[0]);
        };
      };
      __lit = function() {
        return function(_x) {
          return id((function(_f) {
            return _f()(_x);
          }), _litId);
        };
      };
      __ref = function() {
        return function(_x) {
          return id((function(_f) {
            return _f()(_x);
          }), _refId);
        };
      };
      __lambda = function() {
        return function(_v) {
          return id((function(_f) {
            return id((function(_g) {
              return _g()(_v)(_f);
            }), _lambdaId);
          }), -1001);
        };
      };
      __apply = function() {
        return function(_func) {
          return id((function(_arg) {
            return id((function(_f) {
              return _f()(_func)(_arg);
            }), _applyId);
          }), -1002);
        };
      };
      __prim = function() {
        return function(_arg) {
          return id((function(_rest) {
            return id((function(_f) {
              return _f()(_arg)(_rest);
            }), _primId);
          }), -1003);
        };
      };
      __name = function() {
        return function(_nm) {
          return id((function(_ast) {
            return id((function(_f) {
              return _f()(_nm)(_ast);
            }), _nameId);
          }), -1004);
        };
      };
      id = function(func, id) {
        if (!id) C.astsById.push(func.name);
        func.context = C;
        func.id = id;
        return func;
      };
      nameAst = function(nm, ast) {
        if (!ast.name) {
          C.astsByName[nm] = ast;
          return ast.name = nm;
        }
      };
      addAst = function(ast) {
        if (!ast.id) {
          C.astsById.push(ast);
          ast.id = C.astsById.length;
          return ast;
        }
      };
      C = {
        tokens: tokens,
        groupOpens: groupOpens,
        groupCloses: groupCloses,
        astsById: [],
        astsByName: {},
        addAst: addAst,
        id: id,
        nameAst: nameAst,
        eval: function(str) {
          return eval(str);
        },
        subcontext: function() {
          return function(str) {
            return eval(str);
          };
        }
      };
      C.astsByName.eval = id(_eval());
      lit = C.astsByName._lit = id(__lit());
      ref = C.astsByName._ref = id(__ref());
      lambda = C.astsByName._lambda = id(__lambda());
      apply = C.astsByName._apply = id(__apply());
      prim = C.astsByName._prim = id(__prim());
      name = C.astsByName._name = id(__name());
      return C;
    })();
    ctx.funcId = 0;
    return CTX = ctx;
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
    var mem, ret;
    mem = new Memo();
    ret = gen(ast, [], null, Nil, mem, true);
    if (mem.count || lazy) {
      return [["(function(){", mem, "return " + ret[0] + "})", !lazy ? "()" : ""].join(''), ret[1]];
    } else {
      return ret;
    }
  };

  gen = function(ast, res, ctx, vars, memo, deref, prim, cont) {
    var a, arg, func, isFirst, nm, rest, v, val;
    isFirst = !ctx;
    res = res || [];
    ctx = ctx || CTX.subcontext();
    ctx.curLit = 0;
    CTX.addAst(ast);
    switch (getAstType(ast)) {
      case _nameId:
        nm = getNameNm(ast);
        a = getNameAst(ast);
        CTX.nameAst(nm, a);
        gen(a, res, ctx, vars, memo);
        break;
      case _refId:
        val = getRefVar(ast);
        if (val.lambda) throw new Error("attempt to use lambda as a variable");
        if (!vars.contains(val) && !CTX.astsByName[val]) {
          throw new Error("unbound variable, '" + val + "' -- use lit instead");
        }
        res.push(nameSub(val));
        if (deref) res.push("()");
        break;
      case _litId:
        val = getLitVal(ast);
        lit;
        memoStart(res, memo, deref);
        if (typeof val === 'function' || typeof val === 'object') {
          lit = "lit" + ctx.curLit++;
          ctx("var " + lit);
          ctx("(function(v){" + lit + " = v})")(getLitVal(ast));
          res.push(lit);
        } else {
          res.push(JSON.stringify(val));
        }
        memoEnd(res, memo, deref);
        break;
      case _lambdaId:
        v = getLambdaVar(ast);
        memo = new Memo();
        if (!deref) res.push("(function(){return ");
        res.push("id(function(" + nameSub(v) + "){", memo, "return ");
        gen(getLambdaBody(ast), res, ctx, new Cons(v, vars), memo, true);
        res.push("}, " + ast.id + ")");
        if (!deref) res.push("})");
        break;
      case _applyId:
        func = getApplyFunc(ast);
        arg = getApplyArg(ast);
        memoStart(res, memo, deref);
        gen(func, res, ctx, vars, memo, true);
        res.push("(");
        gen(arg, res, ctx, vars, memo);
        res.push(")");
        memoEnd(res, memo, deref);
        break;
      case _primId:
        arg = getPrimArg(ast);
        rest = getPrimRest(ast);
        if (prim) {
          if (cont) res.push(", ");
          res.push(arg);
          if (isPrim(rest)) gen(rest, res, ctx, vars, memo, false, true, true);
        } else {
          memoStart(res, memo, deref);
          res.push(arg);
          res.push("(");
          if (isPrim(rest)) gen(rest, res, ctx, vars, memo, true, true, false);
          res.push(")");
          memoEnd(res, memo, deref);
        }
        break;
      default:
        throw new Error("Unknown object type in gen: " + ast);
    }
    ast.src = res.join('');
    return isFirst && [ast.src, ctx];
  };

  laz = function(val) {
    return function() {
      return val;
    };
  };

  defineToken = function(name, def) {
    if (def !== '=') {
      CTX.tokens[name] = 1;
      tokenPat = null;
      if (def[1] === '(') {
        return CTX.groupOpens[name] = def.substring(2, def.length - 1);
      } else if (def[1] === ')') {
        return CTX.groupCloses[name] = 1;
      }
    }
  };

  evalLine = function(line, noRebuild) {
    var def;
    if (line !== "" && (line.match(/^#(define|strict|lazy)/) || line[0] !== '#')) {
      def = line.match(tokenDefPat);
      name = def ? def[1].trim() : null;
      if (def) {
        defineToken(name, def[2]);
        line = line.substring(def[0].length).trim();
      }
      addExpr(name, line, noRebuild);
    }
    return false;
  };

  newEntry = function(name, ast) {
    var cmp;
    ast.name = name;
    ast.cname = nameSub(name);
    try {
      cmp = compile(ast);
      ast.func = cmp[0];
      ast.env = cmp[1];
      ast.src = dgen(ast, true);
      if (warnFreeVariable.length) {
        ast.usesFree = warnFreeVariable.join(', ');
        return warnFreeVariable = [];
      }
    } catch (err) {
      return ast.src = function() {
        return "Error compiling: " + expr;
      };
    }
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

  addExpr = function(name, txt, noRebuild) {
    var expr, hk, i, newOutput, _ref;
    if (name) {
      expr = newEntry(name, parse(txt));
      newOutput = '';
      expr.expr.name = name;
      if (!noRebuild) {
        for (i = 0, _ref = order.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          if (order[i].name === name) order.splice(i, 1);
        }
      }
      order.push(expr);
      hk = expr.expr.hashKey();
      if (!hashed[hk]) hashed[hk] = expr;
      exprs[name] = expr;
      return true;
    } else {
      runExpr(txt.trim());
      return false;
    }
  };

  addToken = function(tok, group) {
    var pat;
    pat = '';
    CTX.tokens[tok] = group;
    return tokenPat = null;
  };

  createTokenPat = function() {
    var i, o, p, s, types, _ref, _ref2;
    if (!tokenPat) {
      types = [];
      for (i in CTX.tokens) {
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
        expectedClose = CTX.groupOpens[tok];
        skip = false;
        if (expectedClose) {
          cur = tparse(toks, vars, tok !== '(' ? tparseVariable(tok, vars, oldVars) : null);
          if (toks.length && toks[toks.length - 1] === expectedClose) toks.pop();
          skip = true;
        }
        if (!skip) cur = tparseVariable(tok, vars, oldVars);
      }
      expr = expr ? apply(laz(expr))(laz(cur)) : cur;
      if (CTX.groupCloses[tok]) {
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
    if (vars[tok] || CTX.astsByName[tok]) {
      vars[tok] = tok;
      cur = ref(laz(tok));
    } else {
      cur = lit(laz(tok));
    }
    return cur;
  };

  tparseLambda = function(toks, vars) {
    var body, old;
    if (toks.length < 3 || toks[toks.length - 1] === '.') {
      throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '));
    }
    old = vars[name];
    if (toks[toks.length - 2] === '.') {
      name = toks.pop();
      vars[name] = name;
      toks.pop();
      body = tparse(toks, vars);
    } else {
      name = toks.pop();
      vars[name] = name;
      body = tparseLambda(toks, vars);
    }
    vars[name] = old;
    return lambda(laz(name))(laz(body));
  };

  createContext();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.parse = parse;

  root.astPrint = astPrint;

  root.gen = dgen;

  root.laz = laz;

  root.eval = CTX.eval;

}).call(this);
