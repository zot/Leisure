
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
  var LCNil, LexCons, Token, apply, badLambdaCont, baseTokenPat, charCodes, checkLambda, codeChars, defGroup, defToken, define, dlappend, dlempty, dlnew, eatAllWhitespace, elements, escapeRegexpChars, evalFunc, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getRefVar, getType, groupCloses, groupOpens, ifParsed, inspect, isLambdaToken, lambda, lexCons, lexConsPos, lexNil, listDo, listToApply, listToAst, listToLambda, lit, makeToken, nameSub, nextTok, numberPat, parseGroup, parseGroupTerm, parsePhase1, pos, positionGroup, primLexCons, primToken, print, printApply, printLambda, ref, resetScanner, root, setDataType, setType, snip, subprint, tag, testParse, tokPos, tokenPat, tokenToAst, tokenTypes, tokens,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Parse = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    inspect = require('util').inspect;
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

  LexCons = (function() {

    function LexCons() {}

    LexCons.prototype.setPos = function setPos(start, end) {
      this.startPos = start;
      this.endPos = end;
      return this;
    };

    LexCons.prototype.start = function start() {
      return this.startPos;
    };

    LexCons.prototype.end = function end() {
      return this.endPos;
    };

    LexCons.prototype.head = function head() {
      return this(function() {
        return function(a) {
          return function(b) {
            return a();
          };
        };
      });
    };

    LexCons.prototype.tail = function tail() {
      return this(function() {
        return function(a) {
          return function(b) {
            return b();
          };
        };
      });
    };

    LexCons.prototype.find = function find(func) {
      return func(this.head()) || this.tail().find(func);
    };

    LexCons.prototype.foldl = function foldl(func, arg) {
      return this.tail().foldl(func, func(arg, this.head()));
    };

    LexCons.prototype.foldr = function foldr(func, arg) {
      return func(this.head(), this.tail().foldr(func, arg));
    };

    LexCons.prototype.toArray = function toArray() {
      return this.foldl((function(i, el) {
        i.push(el);
        return i;
      }), []);
    };

    LexCons.prototype.toString = function toString() {
      return "LexCons[" + (this.toArray().join(' ')) + "]";
    };

    LexCons.prototype.reverse = function reverse() {
      return this.rev(lexNil);
    };

    LexCons.prototype.rev = function rev(result) {
      return this.tail().rev(lexCons(this.head(), result));
    };

    LexCons.prototype.equals = function equals(other) {
      var _ref, _ref2, _ref3, _ref4;
      return (other != null ? other.constructor : void 0) === LexCons && (this.head() === other.head || (((_ref = this.head()) != null ? _ref.constructor : void 0) === LexCons && ((_ref2 = this.head()) != null ? _ref2.equals(other.head) : void 0))) && (this.tail() === other.tail || (((_ref3 = this.tail()) != null ? _ref3.constructor : void 0) === LexCons && ((_ref4 = this.tail()) != null ? _ref4.equals(other.tail) : void 0)));
    };

    LexCons.prototype.each = function each(block) {
      block(this.head());
      return this.tail().each(block);
    };

    LexCons.prototype.last = function last() {
      var t;
      t = this.tail();
      if (t === lexNil) {
        return t;
      } else {
        return t.last();
      }
    };

    return LexCons;

  })();

  LCNil = (function(_super) {

    __extends(LCNil, _super);

    function LCNil() {
      LCNil.__super__.constructor.apply(this, arguments);
    }

    LCNil.prototype.find = function find() {
      return false;
    };

    LCNil.prototype.removeAll = function removeAll() {
      return this;
    };

    LCNil.prototype.foldl = function foldl(func, arg) {
      return arg;
    };

    LCNil.prototype.foldr = function foldr(func, arg) {
      return arg;
    };

    LCNil.prototype.rev = function rev(result) {
      return result;
    };

    LCNil.prototype.equals = function equals(other) {
      return (other != null ? other.constructor : void 0) === LCNil;
    };

    LCNil.prototype.each = function each() {};

    LCNil.prototype.toString = function toString() {
      return 'lexNil';
    };

    return LCNil;

  })(LexCons);

  primLexCons = setDataType((function(a) {
    return function(b) {
      var c;
      c = setType((function(f) {
        return f()(a)(b);
      }), 'lexCons');
      c.__proto__ = LexCons.prototype;
      return c;
    };
  }), 'lexCons');

  lexNil = setType((function(a) {
    return function(b) {
      return b();
    };
  }), 'lexNil');

  lexNil.__proto__ = LCNil.prototype;

  lexCons = function lexCons(a, b) {
    return lexConsPos(a, b, typeof a.start === "function" ? a.start() : void 0, typeof b.end === "function" ? b.end() : void 0);
  };

  lexConsPos = function lexConsPos(a, b, start, end) {
    return primLexCons(function() {
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
      return lexCons(a, b);
    };
  };

  dlappend = function dlappend(a, b) {
    return function(c) {
      return a(b(c));
    };
  };

  global.leisureFuncs = {};

  global.leisureFuncNames = lexNil;

  global.leisureAddFunc = function leisureAddFunc(nm) {
    return global.leisureFuncNames = lexCons(nm, global.leisureFuncNames);
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

  define('lexCons', primLexCons, 2, '\a b f . f a b');

  define('lexNil', lexNil, 0, '\a b . b');

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

  ifParsed = function ifParsed(res, block) {
    if (res[1]) {
      return res;
    } else {
      return block(res[0], res[2]);
    }
  };

  parsePhase1 = function parsePhase1(str) {
    return ifParsed(parseGroup(str, '\n', str.length), function(group, rest) {
      var g;
      g = group(lexNil);
      if (g !== lexNil) g.setPos(g.head().start(), g.last().end());
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
    return groupDL(lexNil).setPos(startTok.start(), endTok.end());
  };

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

  tag = function tag(ast, start, end) {
    ast.leisureStart = start;
    ast.leisureEnd = end;
    return ast;
  };

  getType = function getType(f) {
    var t;
    t = typeof f;
    return (t === 'function' && (f != null ? f.type : void 0)) || ("*" + t);
  };

  lit = function lit(l) {
    console.log("LIT: " + l);
    return _lit()(function() {
      return l;
    });
  };

  ref = function ref(r) {
    console.log("REF: " + r);
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

  listToAst = function listToAst(list) {
    if (list === lexNil) {
      return [null, "Expecting expression, but input is empty"];
    } else if (!(list instanceof LexCons)) {
      return tokenToAst(list);
    } else if (isLambdaToken(list.head())) {
      return checkLambda(list.tail());
    } else {
      return ifParsed(listToAst(list.head()), function(f) {
        return listToApply(f, list.tail());
      });
    }
  };

  isLambdaToken = function isLambdaToken(tok) {
    var _ref;
    return (tok instanceof Token) && ((_ref = tok.tok()) === '\\' || _ref === '\u03BB');
  };

  checkLambda = function checkLambda(list) {
    if (list.head() instanceof Token && list.head().tok() !== '.') {
      return listToLambda(list);
    } else {
      return [null, "Bad lambda construct, expected names, followed by a dot", list];
    }
  };

  badLambdaCont = function badLambdaCont(tok) {
    return !(tok instanceof Token) || isLambdaToken(tok);
  };

  listToLambda = function listToLambda(list) {
    var bodyRes, head;
    if (list === lexNil) {
      return [null, "Bad lambda construct -- no variable or body"];
    } else if (list.tail() === lexNil) {
      return [null, "Bad lambda construct -- no body"];
    } else {
      head = list.head();
      if (badLambdaCont(head) || badLambdaCont(list.tail().head())) {
        return [null, "Bad lambda construct", head];
      } else {
        bodyRes = list.tail().head().tok() === '.' ? listToAst(list.tail().tail()) : listToLambda(list.tail());
        return ifParsed(bodyRes, function(body) {
          return [tag(lambda(head.tok(), body), list.start(), list.end())];
        });
      }
    }
  };

  tokenToAst = function tokenToAst(tok) {
    try {
      return [tag(lit(JSON.parse(tok.tok())), tok.start(), tok.end())];
    } catch (err) {
      return [tag(ref(tok.tok()), tok.start(), tok.end())];
    }
  };

  listToApply = function listToApply(f, rest) {
    if (rest === lexNil) {
      return [f];
    } else {
      return ifParsed(listToAst(rest.head()), function(a) {
        return listToApply(tag(apply(f, a), f.leisureStart, a.leisureEnd), rest.tail());
      });
    }
  };

  /*
  TODO
  
  * get working with current ASTs
  * change to lexCons (start, end, a, b) and new AST structures (start, end, data...)
  * rewrite listToAst in Leisure?
  * write precedence parser in Leisure
  */

  listDo = function listDo(l, f) {
    return l(function() {
      return function(h) {
        return function(t) {
          return f(h(), t());
        };
      };
    });
  };

  print = function print(f) {
    if (!(f != null)) {
      return "UNDEFINED";
    } else if (f === null) {
      return 'NULL';
    } else {
      switch (getType(f)) {
        case 'lit':
        case 'ref':
        case 'lambda':
        case 'apply':
          return "AST(" + (subprint(f)) + ")";
        default:
          return subprint(f);
      }
    }
  };

  subprint = function subprint(f) {
    var _ref;
    if (!(f != null)) {
      return "UNDEFINED";
    } else if (f === null) {
      return 'NULL';
    } else {
      switch (getType(f)) {
        case 'lexCons':
          return "[" + (elements(f, true)) + "]";
        case 'lexNil':
          return "[]";
        case 'token':
          return "Token(" + (f.tok()) + ")";
        case 'ioMonad':
          return "IO";
        case 'lit':
          return f(function() {
            return function(v) {
              return v();
            };
          });
        case 'ref':
          return f(function() {
            return function(v) {
              return v();
            };
          });
        case 'lambda':
          return f(function() {
            return function(v) {
              return function(bod) {
                return "\u03BB" + (printLambda(v(), bod()));
              };
            };
          });
        case 'apply':
          return f(function() {
            return function(func) {
              return function(arg) {
                return printApply(func(), arg());
              };
            };
          });
        case 'some':
          return f(function() {
            return function(v) {
              return "Some(" + (print(v())) + ")";
            };
          })(null);
        case 'some2':
          return f(function() {
            return function(a) {
              return function(b) {
                return "Some2(" + (print(a())) + ", " + (print(b())) + ")";
              };
            };
          })(null);
        case 'left':
          return f(function() {
            return function(l) {
              return "Left(" + (print(l())) + ")";
            };
          })(null);
        case 'right':
          return f(null)(function() {
            return function(r) {
              return "Right(" + (print(r())) + ")";
            };
          });
        case 'html':
          return f(function() {
            return function(txt) {
              return "HTML(" + (txt()) + ")";
            };
          });
        case 'svg-node':
          return f(function() {
            return function(txt) {
              return "SVG NODE(" + (txt()) + ")";
            };
          });
        default:
          if (f instanceof Error) {
            return f.stack;
          } else {
            return (_ref = f.leisureName) != null ? _ref : inspect(f);
          }
      }
    }
  };

  printLambda = function printLambda(v, body) {
    if (body.type === 'lambda') {
      return body(function() {
        return function(v2) {
          return function(b) {
            return "" + v + " " + (printLambda(v2(), b()));
          };
        };
      });
    } else {
      return "" + v + " . " + (subprint(body));
    }
  };

  printApply = function printApply(func, arg) {
    var a, f;
    f = func.type === 'lambda' ? "(" + (subprint(func)) + ")" : subprint(func);
    a = arg.type === 'apply' ? "(" + (subprint(arg)) + ")" : subprint(arg);
    return "" + f + " " + a;
  };

  elements = function elements(l, first, nosubs) {
    if (getType(l) === 'lexNil') {
      return '';
    } else if (getType(l) !== 'lexCons') {
      return " | " + (print(l));
    } else {
      return "" + (first ? '' : ', ') + (listDo(l, function(h, t) {
        return print(h) + elements(t, false);
      }));
    }
  };

  console.log("parse: a b: " + (parsePhase1('a b')[0]));

  console.log("parse: a (b): " + (parsePhase1('a (b)')[0]));

  console.log("parse: a (b c d (e f)): " + (parsePhase1('a (b c d (e f))')[0]));

  console.log("parse: \\\\\\\u03BB\\\u03BB: " + (parsePhase1('\\\\\\\u03BB\\\u03BB')[0]));

  testParse = function testParse(str) {
    var a, p, _ref;
    p = parsePhase1(str);
    if (p[1]) {
      return p[1];
    } else {
      console.log("phase 1: " + (print(p[0])));
      a = listToAst(p[0], str.length);
      return (_ref = a[1]) != null ? _ref : print(a[0]);
    }
  };

  console.log("ast for a: " + (testParse('a')));

  console.log("ast for a b: " + (testParse('a b')));

  console.log("ast for \\a.b: " + (testParse('\\a.b')));

}).call(this);
