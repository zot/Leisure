
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
  var CNil, Code, Cons, Nil, addDef, append, apply, astPrint, baseTokenPat, bracePat, bracify, charCodes, codeChars, commentPat, compileNext, cons, continueApply, createDefinition, ctx, define, defineToken, dgen, eatAllWhitespace, embeddedBracePat, evalCompiledAst, evalFunc, evalNext, first, freeVar, gen, genCode, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getNthBody, getRefVar, getType, groupCloses, groupOpens, ifParsed, indentPat, lambda, laz, linePat, lit, ll, nameAst, nameSub, nextTok, nextTokWithNl, order, parenthify, parse, parseApply, parseLambda, parseName, parseTerm, prefix, prepare, processTokenDefs, ref, req, root, scanName, scanTok, second, setDataType, setEvalFunc, setType, soff, specials, stripComments, stripSemis, subnextTokWithNl, tag, tokenPat, tokens, topBracePat, warnFreeVariable, wrap,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Lazp = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  baseTokenPat = /`(\\[\\`]|[^`])*`|'(\\[\\']|[^'])*'|"(\\[\\"]|[^"])*"|[().\\\n;]| +|#[^\n]*\n/;

  tokenPat = baseTokenPat;

  specials = '[]().*+?|';

  linePat = /^((?:\s*|#[^\n]*\n)*)([^=\n]*)(=[.)]=|=\([^=]+=|=)?/;

  topBracePat = /^((?:;*)(?:\s*|#[^;]*;)*[^=;]*(?:=[.)]=|=\([^=]+=|=)\s*)?((?:`(?:[^`]|\\`)*`|'(?:[^']|\\')*'|"(?:[^"]|\\")*"|[^;{};])*)([{};])/;

  bracePat = /^()((?:`(?:[^`]|\\[\\`])*`|'(?:[^']|\\[\\'])*'|"(?:[^"]|\\[\\"])*"|[^\n{};])*)([{};])/;

  embeddedBracePat = /^()((?:`(?:[^`]|\\[\\`])*`|'(?:[^']|\\[\\'])*'|"(?:[^"]|\\[\\"])*"|[^{};])*)([{};])/;

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

  global.lazpFuncs = {};

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

  append = function append(a, b) {
    if (a === Nil) {
      return b;
    } else {
      return cons(a.head, append(a.tail, b));
    }
  };

  global.lazpFuncNames = ll = Nil;

  global.lazpAddFunc = function lazpAddFunc(nm) {
    return global.lazpFuncNames = ll = cons(nm, ll);
  };

  global.lazpGetFuncs = function lazpGetFuncs() {
    return ll;
  };

  define = function define(name, func) {
    var f, nm;
    nm = nameSub(name);
    func.lazpName = name;
    if (ctx[nm] != null) {
      throw new Error("[DEF] Attempt to redefine definition: " + name);
    }
    f = function f() {
      return func;
    };
    ctx[nm] = ctx.lazpFuncs[nm] = f;
    (evalFunc('lazpAddFunc'))(name);
    return f;
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
    if (!ast.lazpName) {
      ast.lazpName = nm;
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
    return evalCompiledAst(dgen(ast()));
  });

  define('lit', function(_x) {
    return setType((function(_f) {
      return _f()(_x);
    }), 'lit');
  });

  define('ref', function(_x) {
    return setType((function(_f) {
      return _f()(_x);
    }), 'ref');
  });

  define('lambda', function(_v) {
    return function(_f) {
      return setType((function(_g) {
        return _g()(_v)(_f);
      }), 'lambda');
    };
  });

  define('apply', function(_func) {
    return function(_arg) {
      return setType((function(_f) {
        return _f()(_func)(_arg);
      }), 'apply');
    };
  });

  getType = function getType(f) {
    var t;
    t = typeof f;
    return (t === 'function' && (f != null ? f.type : void 0)) || ("*" + t);
  };

  lit = global._lit();

  ref = global._ref();

  lambda = global._lambda();

  apply = global._apply();

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
    code = gen(ast, new Code().setGlobal(cons(name, globals != null ? globals : Nil)), ast.lits, Nil, true);
    if (code.err !== '') {
      ast.err = code.err;
    } else if (code.subfuncs.length) {
      ast.src = "(function(){" + ((tokenDef != null) && tokenDef !== '=' ? "root.tokenDefs.push('" + name + "', '" + tokenDef + "')\n" : '') + "\n  " + code.subfuncs + "\n  return " + (name != null ? "define('" + name + "', " + code.main + ")" : code.main) + "\n})()";
    } else {
      ast.src = name != null ? "define('" + name + "', " + code.main + ");" + ((tokenDef != null) && tokenDef !== '=' ? "\nroot.tokenDefs.push('" + name + "', '" + tokenDef + "');" : '') + "\n" : "(" + code.main + ")";
    }
    ast.globals = code.global;
    return ast;
  };

  wrap = function wrap(ast, src) {
    var _ref;
    if (!(ast.exprType != null) && !ast.exprDataType) {
      return src;
    } else {
      return "" + (ast.exprType ? 'setType' : 'setDataType') + "(" + src + ", '" + ((_ref = ast.exprType) != null ? _ref : ast.exprDataType) + "')";
    }
  };

  gen = function gen(ast, code, lits, vars, deref) {
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
          } else {
            return code.copyWith(JSON.stringify(scanTok(val))).unreffedValue(deref);
          }
        }
        break;
      case 'lit':
        val = getLitVal(ast);
        src = typeof val === 'function' || typeof val === 'object' ? (lits.push(val), "(function(){\nreturn __lits[" + (lits.length - 1) + "]\n})") : JSON.stringify(val);
        return code.copyWith(src).unreffedValue(deref);
      case 'lambda':
        v = getLambdaVar(ast);
        bodyCode = gen(getLambdaBody(ast), code.resetMemo(), lits, cons(v, vars), true);
        bodyCode = bodyCode.setVars(bodyCode.vars.removeAll(function(bv) {
          return bv === v;
        }));
        return bodyCode.copyWith(wrap(ast, "function(" + (nameSub(v)) + "){return " + bodyCode.main + "}")).useSubfunc(bodyCode.vars === Nil).memoize(deref);
      case 'apply':
        func = getApplyFunc(ast);
        if (getAstType(func === 'lit')) {
          return code.addErr("Attempt to use lit as function: " + (getLitVal(func)));
        } else if (freeVar(func, vars, code.global)) {
          return code.addErr("Attempt to use free variable as function: " + (getRefVar(func)));
        } else {
          arg = getApplyArg(ast);
          funcCode = gen(func, code, lits, vars, true);
          argCode = gen(arg, funcCode, lits, vars);
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

  compileNext = function compileNext(line, globals, parseOnly, check) {
    var def, defType, leading, matched, name, nm, pfx, rest1;
    if ((def = line.match(linePat)) && def[1].length !== line.length) {
      matched = def[0], leading = def[1], name = def[2], defType = def[3];
      rest1 = line.substring((defType ? matched : leading).length);
      nm = defType ? name.trim().split(/\s+/) : null;
      if (nm) {
        if (check && globals.find(function(v) {
          return v === nm[0];
        })) {
          return [null, "Attempt to redefine function: " + nm[0], null];
        } else {
          if (defType && defType !== '=') defineToken(nm[0], defType);
          pfx = prefix(nm, rest1);
          return ifParsed(parseApply(pfx, Nil), function(ast, rest) {
            var bod;
            nameAst(nm[0], ast);
            bod = ast;
            if (nm.length > 1) bod = getNthBody(ast, nm.length);
            if (getAstType(bod) === 'lambda') {
              bod.exprType = nm[0];
              ast.exprDataType = nm[0];
            }
            if (nm.length === 1) nameAst(nm[0], ast);
            ast.lazpPrefixSrcLen = pfx.length;
            ast.lazpPrefixCount = nm.length;
            return genCode(ast, nm[0], globals, defType, rest, parseOnly);
          });
        }
      } else {
        return ifParsed(parseApply(rest1, Nil), function(ast, rest) {
          return genCode(ast, null, globals, null, rest, parseOnly);
        });
      }
    } else {
      return [null, null, null];
    }
  };

  genCode = function genCode(ast, name, globals, defType, rest, parseOnly) {
    if (!parseOnly) dgen(ast, false, name, globals, defType);
    return [ast, ast.err, rest];
  };

  evalNext = function evalNext(code) {
    var ast, err, rest, result, _ref;
    _ref = compileNext(code, null), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (ast) {
      if (ast.lazpName) {
        try {
          evalCompiledAst(ast);
          result = "Defined: " + ast.lazpName;
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
    _ref = bracify(stripComments(str), 1), result = _ref[0], rest = _ref[1];
    if (rest.trim()) {
      return [result, 'Indentation problem: #{result}\n\n------->\n\n#{rest}'];
    } else {
      _ref2 = parenthify(result, true), result = _ref2[0], rest = _ref2[1], err = _ref2[2];
      if (rest.trim()) {
        return [result, 'Unbalanced braces: #{result}\n\n------->\n\n#{rest}'];
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

  indentPat = /^([^\n]*)(\n[ ]*|)/;

  bracify = function bracify(str, indent) {
    var b, lineIndent, m, nextIndent, nextRest, nextResult, pfx, res, resIndent, rest, result, sfx, _ref, _ref2, _ref3, _ref4, _ref5;
    b = str.match(bracePat);
    if (b && b[3] === '{') {
      _ref = parenthify(str.substring(b.index + b[2].length + 1), false, true), result = _ref[0], rest = _ref[1];
      if (rest[0] !== '}') {
        return [null, "No close brace: " + (str.substring(b.index + b[2].length + 1)), indent];
      } else {
        _ref2 = bracify(rest.substring(1), indent), nextResult = _ref2[0], nextRest = _ref2[1], nextIndent = _ref2[2];
        return ["(" + (str.substring(0, b.index + b[2].length).trim()) + result + ") " + nextResult, nextRest, nextIndent];
      }
    } else {
      m = str.match(indentPat);
      if (!m || m[2].length === 0) {
        return [str.trim(), '', 0];
      } else {
        lineIndent = m[2].length;
        pfx = m[1];
        sfx = str.substring(m.index + m[0].length);
        if (lineIndent === indent) {
          _ref3 = bracify(sfx, lineIndent), result = _ref3[0], rest = _ref3[1], resIndent = _ref3[2];
          return ["" + (pfx.trim()) + ";" + result, rest, resIndent];
        } else if (lineIndent > indent) {
          res = (_ref4 = bracify(sfx, lineIndent), result = _ref4[0], rest = _ref4[1], resIndent = _ref4[2], _ref4);
          if (resIndent < indent) {
            return ["" + (pfx.trim()) + "{" + result + "}", rest, resIndent];
          } else {
            _ref5 = bracify(rest, indent), nextResult = _ref5[0], nextRest = _ref5[1], nextIndent = _ref5[2];
            return ["" + (pfx.trim()) + "{" + result + "};" + nextResult, nextRest, nextIndent];
          }
        } else {
          return [pfx.trim(), sfx, lineIndent];
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
        return ["" + (!pfx && !top ? '' : !pfx ? '\n' : top ? "" + def + pfx + "\n" : " " + pfx + " ") + (result.trim()), rest, err];
      } else if (b[3] === '{') {
        _ref3 = parenthify(sfx, false, embedded), result = _ref3[0], rest = _ref3[1], err = _ref3[2];
        if (!err && rest[0] === '}') {
          _ref4 = parenthify(rest.substring(1), top, embedded), next = _ref4[0], nRest = _ref4[1], err = _ref4[2];
          return ["" + (pfx ? "" + def + "(" + pfx : "" + def + "(") + result + ")" + (top ? "\n" : " ") + next, nRest, err];
        } else {
          return ["" + (pfx ? "" + def + " " + pfx : "" + def) + result, rest, "" + err + "\nNo close brace"];
        }
      } else {
        return [(pfx ? "" + def + " " + pfx : "" + def), str.substring(b.index + b[1].length + b[2].length)];
      }
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

  parse = function parse(str, globals) {
    var ast, err, rest, _ref;
    _ref = parseApply(str.replace(/\u03BB/g, '\\'), Nil, globals != null ? globals : Nil, 0), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err) {
      throw new Error(err);
    } else {
      return ast;
    }
  };

  ifParsed = function ifParsed(res, block) {
    if (res[1]) {
      return res;
    } else {
      return block(res[0], res[2]);
    }
  };

  tag = function tag(ast, start, end) {
    ast.lazpStart = start;
    ast.lazpEnd = end;
    return ast;
  };

  soff = function soff(orig, offset, rest) {
    return offset + orig.length - rest.length;
  };

  parseApply = function parseApply(str, vars, globals, offset) {
    var offset1, rest1, tok, _ref;
    if (!str.length) {
      return [null, null, str];
    } else {
      _ref = nextTok(str, offset), tok = _ref[0], offset1 = _ref[1], rest1 = _ref[2];
      if (tok === '\n') {
        return [null, 'Newline when expecting expression', rest1];
      } else if (groupCloses[tok]) {
        return [null, "Unexpected group closing token: " + tok, str];
      } else {
        return ifParsed(parseTerm(tok, rest1, vars, globals, offset1), function(func, rest) {
          return continueApply(func, rest, vars, globals, soff(str, offset, rest));
        });
      }
    }
  };

  continueApply = function continueApply(func, str, vars, globals, offset) {
    var offset1, rest, tok, _ref;
    _ref = nextTok(str, offset), tok = _ref[0], offset1 = _ref[1], rest = _ref[2];
    if (!tok || tok === '\n' || tok === '}' || groupCloses[tok]) {
      return [func, null, str];
    } else {
      return ifParsed(parseTerm(tok, rest, vars, globals, offset1), function(arg, rest) {
        return continueApply(tag(apply(laz(func))(laz(arg)), func.lazpStart, arg.lazpEnd), rest, vars, globals, soff(str, offset, rest));
      });
    }
  };

  parseTerm = function parseTerm(tok, rest, vars, globals, tokOffset) {
    var apl, restOffset;
    restOffset = tokOffset + tok.length;
    if (tok === '\n') {
      return [null, 'Unexpected newline while expecting a term', rest];
    } else if (tok === '\\') {
      return parseLambda(rest, vars, globals, restOffset);
    } else if (groupOpens[tok]) {
      apl = tok === '(' ? parseApply(rest, vars, globals, restOffset) : ifParsed(parseName(tok, rest, vars, globals, tokOffset), function(ast, rest2) {
        return continueApply(ast, rest2, vars, globals, soff(rest, restOffset, rest2));
      });
      return ifParsed(apl, function(ast, rest3) {
        var offset4, rest4, tok4, _ref;
        _ref = nextTok(rest3, soff(rest, restOffset, rest3)), tok4 = _ref[0], offset4 = _ref[1], rest4 = _ref[2];
        if (tok4 !== groupOpens[tok]) {
          return [ast, "Expected close token: " + groupOpens[tok] + ", but got " + tok4, rest4];
        } else if (tok === '(') {
          return [ast, null, rest4];
        } else {
          return ifParsed(parseName(tok4, rest4, vars, globals, soff(rest, restOffset, rest4)), function(arg, rest5) {
            return [tag(apply(laz(ast))(laz(arg)), ast.lazpStart, arg.lazpEnd), null, rest5];
          });
        }
      });
    } else {
      return parseName(tok, rest, vars, globals, tokOffset);
    }
  };

  parseName = function parseName(tok, rest, vars, globals, tokOffset) {
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
    var i, res, v, _fn, _ref;
    gl = gl != null ? gl : global;
    res = require(name);
    if (res.defs != null) {
      _ref = res.defs;
      _fn = function _fn(tmp) {
        return gl[i] = tmp;
      };
      for (i in _ref) {
        v = _ref[i];
        _fn(v);
      }
    }
    processTokenDefs(res.tokenDefs);
    res.lazpFuncNames = ctx.lazpFuncNames;
    res.ctx = ctx;
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

  root.processTokenDefs = processTokenDefs;

  root.setEvalFunc = setEvalFunc;

  root.eval = evalFunc;

  root.parse = parse;

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

}).call(this);
