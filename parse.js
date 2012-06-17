
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
  var CNil, Cons, Nil, Token, apply, baseTokenPat, charCodes, checkLambda, codeChars, cons, consPos, continueApply, defGroup, defToken, define, defineMacro, dlappend, dlempty, dlnew, eatAllWhitespace, escapeRegexpChars, evalFunc, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getMacro, getRefVar, getType, groupCloses, groupOpens, ifParsed, isLambdaToken, lambda, lambdaChar, listToApply, listToAst, listToLambda, lit, makeToken, nameSub, nextTok, nextTokIgnoreNL, numberAst, numberPat, orPos, parse, parseApply, parseFull, parseGroup, parseGroupTerm, parseLambda, parseName, parsePhase1, parseTerm, pos, positionGroup, primCons, primToken, ref, resetScanner, root, scanName, scanTok, setDataType, setNumber, setType, snip, sourceBracket, sourcePos, substituteMacros, tag, tagBracket, tokPos, tokenPat, tokenTypes, tokens,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Parse = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  charCodes = {
    "'": '$a',
    ',': '$b',
    '$': '$$',
    '@': '$d',
    '?': '$e',
    '/': '$f',
    '*': '$g',
    '&': '$h',
    '^': '$i',
    '!': '$k',
    '`': '$l',
    '~': '$m',
    '-': '$_',
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
    '%': '$A',
    '.': '$B'
  };

  codeChars = new function() {
    var char, code;
    for (char in charCodes) {
      code = charCodes[char];
      this[code.substring(1)] = char;
    }
    return this;
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

  setDataType = function setDataType(func, dataType) {
    if (dataType) func.dataType = dataType;
    return func;
  };

  setType = function setType(func, type) {
    if (type) func.type = type;
    return func;
  };

  Cons = (function() {

    function Cons() {}

    Cons.prototype.setPos = function setPos(start, end) {
      this.startPos = start;
      this.endPos = end;
      return this;
    };

    Cons.prototype.start = function start() {
      return this.startPos;
    };

    Cons.prototype.end = function end() {
      return this.endPos;
    };

    Cons.prototype.head = function head() {
      return this(function() {
        return function(a) {
          return function(b) {
            return a();
          };
        };
      });
    };

    Cons.prototype.tail = function tail() {
      return this(function() {
        return function(a) {
          return function(b) {
            return b();
          };
        };
      });
    };

    Cons.prototype.find = function find(func) {
      return func(this.head()) || this.tail().find(func);
    };

    Cons.prototype.foldl = function foldl(func, arg) {
      return this.tail().foldl(func, func(arg, this.head()));
    };

    Cons.prototype.foldr = function foldr(func, arg) {
      return func(this.head(), this.tail().foldr(func, arg));
    };

    Cons.prototype.toArray = function toArray() {
      return this.foldl((function(i, el) {
        i.push(el);
        return i;
      }), []);
    };

    Cons.prototype.toString = function toString() {
      return "Cons[" + (this.toArray().join(' ')) + "]";
    };

    Cons.prototype.reverse = function reverse() {
      return this.rev(Nil);
    };

    Cons.prototype.rev = function rev(result) {
      return this.tail().rev(cons(this.head(), result));
    };

    Cons.prototype.equals = function equals(other) {
      var _ref, _ref2, _ref3, _ref4;
      return (other != null ? other.constructor : void 0) === Cons && (this.head() === other.head || (((_ref = this.head()) != null ? _ref.constructor : void 0) === Cons && ((_ref2 = this.head()) != null ? _ref2.equals(other.head) : void 0))) && (this.tail() === other.tail || (((_ref3 = this.tail()) != null ? _ref3.constructor : void 0) === Cons && ((_ref4 = this.tail()) != null ? _ref4.equals(other.tail) : void 0)));
    };

    Cons.prototype.each = function each(block) {
      block(this.head());
      return this.tail().each(block);
    };

    Cons.prototype.last = function last() {
      var t;
      t = this.tail();
      if (t === Nil) {
        return t;
      } else {
        return t.last();
      }
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

    CNil.prototype.foldr = function foldr(func, arg) {
      return arg;
    };

    CNil.prototype.foldl = function foldl(func, arg) {
      return arg;
    };

    CNil.prototype.rev = function rev(result) {
      return result;
    };

    CNil.prototype.equals = function equals(other) {
      return (other != null ? other.constructor : void 0) === CNil;
    };

    CNil.prototype.each = function each() {};

    CNil.prototype.toString = function toString() {
      return 'Nil';
    };

    return CNil;

  })(Cons);

  primCons = setDataType((function(a) {
    return function(b) {
      var c;
      c = setType((function(f) {
        return f()(a)(b);
      }), 'cons');
      c.__proto__ = Cons.prototype;
      return c;
    };
  }), 'cons');

  Nil = setType((function(a) {
    return function(b) {
      return b();
    };
  }), 'nil');

  Nil.__proto__ = CNil.prototype;

  cons = function cons(a, b) {
    return consPos(a, b, typeof a.start === "function" ? a.start() : void 0, typeof b.end === "function" ? b.end() : void 0);
  };

  consPos = function consPos(a, b, start, end) {
    return primCons(function() {
      return a;
    })(function() {
      return b;
    }).setPos(start, end);
  };

  dlempty = function dlempty(x) {
    return x;
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

  global.leisureFuncs = {};

  global.leisureFuncNames = Nil;

  global.leisureAddFunc = function leisureAddFunc(nm) {
    return global.leisureFuncNames = cons(nm, global.leisureFuncNames);
  };

  evalFunc = eval;

  define = function define(name, func, arity, src) {
    var f, nm;
    func.src = src;
    func.leisureContexts = [];
    nm = nameSub(name);
    func.leisureName = name;
    func.leisureArity = arity;
    if (global.noredefs && (global[nm] != null)) {
      throw new Error("[DEF] Attempt to redefine definition: " + name);
    }
    f = function f() {
      return func;
    };
    global[nm] = global.leisureFuncs[nm] = f;
    (evalFunc('leisureAddFunc'))(name);
    return f;
  };

  define('cons', primCons, 2, '\a b f . f a b');

  define('nil', Nil, 0, '\a b . b');

  escapeRegexpChars = function escapeRegexpChars(str) {
    return str.replace(/([\][().\\*+?{}|])/g, '\\$1');
  };

  baseTokenPat = /[().\\\u03BB]| +|[0-9]+\.[0-9]+|`(\\[\\`]|[^`\n])*`|'(\\[\\']|[^'\n])*'|"(\\[\\"]|[^"\n])*"|#[^\n]*(\n|$)/;

  tokenPat = null;

  tokens = null;

  tokenTypes = null;

  groupOpens = null;

  groupCloses = null;

  numberPat = /^[0-9]+\.[0-9]+$/;

  resetScanner = function resetScanner() {
    tokenPat = new RegExp("\\n *|" + baseTokenPat.source);
    tokens = {};
    tokenTypes = [];
    groupOpens = {
      '(': ')'
    };
    return groupCloses = {
      ')': 1
    };
  };

  resetScanner();

  defToken = function defToken(name) {
    var i, types;
    if (!(tokens[name] != null)) {
      tokens[name] = 1;
      tokenTypes.push(name);
      tokenTypes.sort(function(a, b) {
        return b.length - a.length;
      });
      types = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = tokenTypes.length; _i < _len; _i++) {
          i = tokenTypes[_i];
          _results.push(escapeRegexpChars(i));
        }
        return _results;
      })();
      return tokenPat = new RegExp("\\n *|" + (types.join('|')) + "|" + baseTokenPat.source);
    }
  };

  defGroup = function defGroup(open, close) {
    if (!(tokens[open] != null)) {
      defToken(open);
      defToken(close);
      groupOpens[name] = close;
      return groupCloses[name] = 1;
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

  nextTok = function nextTok(str) {
    var m, rest;
    m = str.match(tokenPat);
    if (!m) {
      return [str, ''];
    } else if (m.index > 0) {
      return [str.substring(0, m.index), str.substring(m.index)];
    } else {
      rest = str.substring(m.index + m[0].length);
      if (m[0][0] === '#' || m[0][0] === ' ' || (m[0][0] === '\n' && rest[0] === '\n')) {
        return nextTok(rest);
      } else {
        return [m[0], rest];
      }
    }
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

  Token = (function() {

    function Token() {}

    Token.prototype.tok = function tok() {
      return this(function() {
        return function(t) {
          return function(p) {
            return t();
          };
        };
      });
    };

    Token.prototype.start = function start() {
      return this(function() {
        return function(t) {
          return function(p) {
            return p();
          };
        };
      });
    };

    Token.prototype.end = function end() {
      return this.start() + this.tok().length;
    };

    Token.prototype.toString = function toString() {
      return "Token(" + (this.tok()) + ")";
    };

    return Token;

  })();

  primToken = setDataType((function(a) {
    return function(b) {
      var t;
      t = setType((function(f) {
        return f()(a)(b);
      }), 'token');
      t.__proto__ = Token.prototype;
      return t;
    };
  }), 'token');

  makeToken = function makeToken(tok, rest, totalLen) {
    pos = totalLen - rest.length - tok.length;
    return primToken(function() {
      return tok;
    })(function() {
      return pos;
    });
  };

  parsePhase1 = function parsePhase1(str) {
    return ifParsed(parseGroup(str, '\n', str.length), function(group, rest) {
      var g;
      g = group(Nil);
      if (g !== Nil) g.setPos(g.head().start(), g.last().end());
      return [g, null, rest];
    });
  };

  parseGroup = function parseGroup(str, indent, totalLen) {
    var rest, tok, _ref;
    if (!str) {
      return [dlempty, null, str];
    } else {
      _ref = nextTok(str), tok = _ref[0], rest = _ref[1];
      if (!tok || tok[0] === '\n') [dlempty, null, rest];
      if (groupCloses[tok]) {
        return [dlempty, null, str];
      } else {
        return ifParsed(parseGroupTerm(tok, rest, indent, totalLen), function(term, rest2) {
          return ifParsed(parseGroup(rest2, indent, totalLen), function(group, rest3) {
            return [dlappend(term, group), null, rest3];
          });
        });
      }
    }
  };

  parseGroupTerm = function parseGroupTerm(tok, rest, indent, totalLen) {
    var close, token;
    token = makeToken(tok, rest, totalLen);
    if (close = groupOpens[tok]) {
      return ifParsed(parseGroup(rest, indent, totalLen), function(group, rest2) {
        var closeToken, next, rest3, _ref;
        _ref = nextTok(rest2), next = _ref[0], rest3 = _ref[1];
        closeToken = makeToken(next, rest3, totalLen);
        if (close !== next) {
          return [null, "Expecting group close: '" + close + "', but got " + (snip(rest2)) + "\n" + (new Error().stack), rest3];
        } else if (tok === '(') {
          return [dlnew(positionGroup(group, token, closeToken)), null, rest3];
        } else {
          return [dlnew(positionGroup(dlappend(dlappend(dlnew(token), group), dlnew(closeToken), token, closeToken))), null, rest3];
        }
      });
    } else {
      return [dlnew(token), null, rest];
    }
  };

  positionGroup = function positionGroup(groupDL, startTok, endTok) {
    return groupDL(Nil).setPos(startTok.start(), endTok.end());
  };

  console.log("parse: a b: " + (parsePhase1('a b')[0]));

  console.log("parse: a (b): " + (parsePhase1('a (b)')[0]));

  console.log("parse: a (b c d (e f)): " + (parsePhase1('a (b c d (e f))')[0]));

  console.log("parse: \\\\\\\u03BB\\\u03BB: " + (parsePhase1('\\\\\\\u03BB\\\u03BB')[0]));

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

  lit = function lit(l) {
    return _lit()(function() {
      return l;
    });
  };

  ref = function ref(r) {
    return _ref()(function() {
      return r;
    });
  };

  lambda = function lambda(v, body) {
    return _lambda()(function() {
      return v;
    })(function() {
      return body;
    });
  };

  apply = function apply(f, a) {
    return _apply()(function() {
      return f;
    })(function() {
      return a;
    });
  };

  getAstType = function getAstType(f) {
    return f.type;
  };

  getRefVar = function getRefVar(rf) {
    return rf(function(a) {
      return a();
    });
  };

  getLitVal = function getLitVal(lt) {
    return lt(function(a) {
      return a();
    });
  };

  getLambdaVar = function getLambdaVar(lam) {
    return lam(function(a) {
      return function(b) {
        return a();
      };
    });
  };

  getLambdaBody = function getLambdaBody(lam) {
    return lam(function(a) {
      return function(b) {
        return b();
      };
    });
  };

  getApplyFunc = function getApplyFunc(apl) {
    return apl(function(a) {
      return function(b) {
        return a();
      };
    });
  };

  getApplyArg = function getApplyArg(apl) {
    return apl(function(a) {
      return function(b) {
        return b();
      };
    });
  };

  lambdaChar = /^[\\\u03BB]$/;

  listToAst = function listToAst(list, endPos) {
    if (list === Nil) {
      return [null, "Expecting expression, but input is empty", null];
    } else if (isLambdaToken(list.head())) {
      return checkLambda(list.tail());
    } else if (list.tail() === Nil) {
      return tokenToAst(list.head());
    } else {
      return listToApply(list);
    }
  };

  checkLambda = function checkLambda(list) {
    if (list.head() instanceof Token && list.head().tok() !== '.') {
      return listToLambda(list);
    } else {
      return [null, "Bad lambda construct, expected names, followed by a dot", list];
    }
  };

  isLambdaToken = function isLambdaToken(tok) {
    var _ref;
    return (tok instanceof Token) && ((_ref = tok.tok()) === '\\' || _ref === '\u03BB');
  };

  sourcePos = function sourcePos(errItem) {
    if (typeof errItem === 'number') {
      return errItem;
    } else if (errItem instanceof Token) {
      return tok.pos;
    } else {
      return Math.min(sourcePos(errItem.head()), sourcePos(errItem.tail()));
    }
  };

  ifParsed = function ifParsed(res, block) {
    if (res[1]) {
      return res;
    } else {
      return block(res[0]);
    }
  };

  listToLambda = function listToLambda(list, endPos) {
    var bodyRes, head;
    if (list === Nil) {
      return [null, "Bad lambda construct -- no variable or body", endPos];
    } else {
      head = list.head();
      if (isLambdaToken(head) || !(head instanceof Token)) {
        return [null, "Bad lambda construct", head];
      } else {
        bodyRes = head.tok() === '.' ? listToAst(list.tail(), endPos) : listToLambda(list.tail(), endPos);
        return ifParsed(bodyRes, function(body) {
          return [tag(head.start(), rest.leisureEnd, lambda(head.tok(), body))];
        });
      }
    }
  };

  orPos = function orPos(a, b) {
    if (a !== Nil) {
      return a;
    } else {
      return b;
    }
  };

  listToApply = function listToApply(list, endPos) {
    if (list === Nil) {
      return [null, "", orPos(list, endPos)];
    } else {
      return ifParsed(listToAst(list.head()), function(f) {
        return ifParsed(listToAst(list.tail().head()), function(a) {
          if (list.tail().tail() === Nil) return [tag];
        });
      });
    }
  };

  /*
  TODO
  
  * get working with current ASTs
  * change to new ASTs (start, end, data...)
  * rewrite listToAst in Leisure?
  * write precedence parser in Leisure
  */

  parse = function parse(str) {
    var ret;
    ret = parseApply(str, Nil, '\n', str.length);
    if (ret[0]) ret[0] = numberAst(ret[0], 0);
    return ret;
  };

  parseFull = function parseFull(str) {
    var ast, err, rest, _ref;
    _ref = parseApply(str, Nil, '\n', str.length), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (ast) ast = substituteMacros(ast);
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

  defineMacro = function defineMacro(name, func) {
    return ctx.macros[name] = func;
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

  sourceBracket = function sourceBracket(item) {
    var first, rest;
    if (item instanceof Token) {
      return [tok.start(), tok.start() + tok.tok().length];
    } else {
      first = sourceBracket(item.head());
      rest = sourceBracket(item.last());
      return [first[0], rest[1]];
    }
  };

  tagBracket = function tagBracket(item, ast) {
    var br;
    br = sourceBracket(item);
    return tag(br[0], br[1], ast);
  };

  tag = function tag(start, end, ast) {
    ast.leisureStart = start;
    ast.leisureEnd = end;
    return ast;
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

}).call(this);
