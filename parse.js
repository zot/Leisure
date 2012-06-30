
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
  var CNil, Cons, DL, LexCons, LexDL, Nil, Token, apply, badLambdaCont, baseTokenPat, charCodes, checkLambda, checkType, codeChars, collapseTrivial, cons, defGroup, defToken, define, dlappend, dlempty, dlnew, eatAllWhitespace, elements, escapeRegexpChars, evalFunc, getApplyArg, getApplyFunc, getAstType, getLambdaBody, getLambdaVar, getLitVal, getRefVar, getType, groupCloses, groupOpens, ifParsed, inspect, isLambdaToken, jsType, lambda, lexCons, lexDlappend, lexDlempty, lexDlnew, listToApply, listToAst, listToLambda, lit, makeToken, mkProto, nameSub, nextTok, numberPat, parseGroup, parseGroupTerm, parsePhase1, pos, positionGroup, primCons, primLexCons, primToken, print, printApply, printLambda, ref, resetScanner, root, setDataType, setType, snip, subprint, tag, testParse, tokPos, tokenPat, tokenToAst, tokenTypes, tokens,
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

  Cons = (function() {

    function Cons() {}

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

    Cons.prototype.cons = function cons(a, b) {
      return cons(a, b);
    };

    Cons.prototype.find = function find(func) {
      return func(this.head()) || this.tail().find(func);
    };

    Cons.prototype.removeAll = function removeAll(func) {
      var t;
      t = this.tail().removeAll(func);
      if (func(this.head)) {
        return t;
      } else if (t === this.tail()) {
        return this;
      } else {
        return cons(this.head(), t);
      }
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
      return "Cons[" + (this.toArray().join(', ')) + "]";
    };

    Cons.prototype.reverse = function reverse() {
      return this.rev(Nil);
    };

    Cons.prototype.rev = function rev(result) {
      return this.tail().rev(cons(this.head(), result));
    };

    Cons.prototype.equals = function equals(other) {
      return this === other || (other instanceof Cons && (this.head() === other.head() || (this.head() instanceof Cons && this.head().equals(other.head()))) && (this.tail() === other.tail() || (this.tail() instanceof Cons && this.tail().equals(other.tail()))));
    };

    Cons.prototype.each = function each(block) {
      block(this.head());
      return this.tail().each(block);
    };

    Cons.prototype.last = function last() {
      var t;
      t = this.tail();
      if (t === lexNil) {
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

    CNil.prototype.foldl = function foldl(func, arg) {
      return arg;
    };

    CNil.prototype.foldr = function foldr(func, arg) {
      return arg;
    };

    CNil.prototype.rev = function rev(result) {
      return result;
    };

    CNil.prototype.equals = function equals(other) {
      return other instanceof CNil;
    };

    CNil.prototype.each = function each() {};

    return CNil;

  })(Cons);

  DL = (function() {

    function DL() {}

    return DL;

  })();

  jsType = function jsType(v) {
    var t;
    t = typeof v;
    if (t === 'object') {
      return v.constructor || t;
    } else {
      return t;
    }
  };

  mkProto = function mkProto(protoFunc, value) {
    value.__proto__ = protoFunc.prototype;
    return value;
  };

  checkType = function checkType(value, type) {
    if (!(value instanceof type)) {
      throw new Error("Type error: expected type: " + type + ", but got: " + (jsType(value)));
    }
  };

  primCons = setDataType((function(a) {
    return function(b) {
      return mkProto(Cons, setType((function(f) {
        return f()(a)(b);
      }), 'cons'));
    };
  }), 'cons');

  Nil = mkProto(CNil, setType((function(a) {
    return function(b) {
      return b();
    };
  }), 'nil'));

  cons = function cons(a, b) {
    return primCons(function() {
      return a;
    })(function() {
      return b;
    });
  };

  dlempty = mkProto(DL, function(x) {
    return x;
  });

  dlnew = function dlnew(a) {
    return mkProto(DL, function(b) {
      return cons(a, b);
    });
  };

  dlappend = function dlappend(a, b) {
    checkType(a, DL);
    checkType(b, DL);
    return mkProto(DL, function(c) {
      return a(b(c));
    });
  };

  LexCons = (function(_super) {

    __extends(LexCons, _super);

    function LexCons() {
      LexCons.__super__.constructor.apply(this, arguments);
    }

    LexCons.prototype.head = function head() {
      return this(function() {
        return function(a) {
          return function(s) {
            return function(b) {
              return function(e) {
                return a();
              };
            };
          };
        };
      });
    };

    LexCons.prototype.tail = function tail() {
      return this(function() {
        return function(a) {
          return function(s) {
            return function(b) {
              return function(e) {
                return b();
              };
            };
          };
        };
      });
    };

    LexCons.prototype.start = function start() {
      return this(function() {
        return function(a) {
          return function(s) {
            return function(b) {
              return function(e) {
                return s();
              };
            };
          };
        };
      });
    };

    LexCons.prototype.end = function end() {
      return this(function() {
        return function(a) {
          return function(s) {
            return function(b) {
              return function(e) {
                return e();
              };
            };
          };
        };
      });
    };

    LexCons.prototype.withStart = function withStart(start) {
      return lexCons(this.head(), start, this.tail(), this.end());
    };

    LexCons.prototype.toString = function toString() {
      return "LexCons(" + (this.start()) + ", " + (this.end()) + ")[" + (this.toArray().join(' ')) + "]";
    };

    return LexCons;

  })(Cons);

  primLexCons = setDataType((function(a) {
    return function(start) {
      return function(b) {
        return function(end) {
          return mkProto(LexCons, setType((function(f) {
            return f()(a)(start)(b)(end);
          }), 'lexCons'));
        };
      };
    };
  }), 'lexCons');

  LexDL = (function() {

    function LexDL() {}

    return LexDL;

  })();

  lexCons = function lexCons(a, start, b, end) {
    return primLexCons(function() {
      return a;
    })(function() {
      return start;
    })(function() {
      return b;
    })(function() {
      return end;
    });
  };

  lexDlempty = mkProto(LexDL, function(x, end) {
    return x;
  });

  lexDlnew = function lexDlnew(a, start) {
    return mkProto(LexDL, function(b, end) {
      return lexCons(a, start, b, end);
    });
  };

  lexDlappend = function lexDlappend(a, b) {
    checkType(a, LexDL);
    checkType(b, LexDL);
    return mkProto(LexDL, function(c, end) {
      return a(b(c, end), end);
    });
  };

  global.leisureFuncs = {};

  global.leisureFuncNames = Nil;

  global.leisureAddFunc = function leisureAddFunc(nm) {
    return global.leisureFuncNames = cons(nm, global.leisureFuncNames);
  };

  evalFunc = eval;

  define = function define(name, func, arity, src) {
    var nm;
    func.src = src;
    func.leisureContexts = [];
    nm = nameSub(name);
    func.leisureName = name;
    func.leisureArity = arity;
    if (global.noredefs && (global[nm] != null)) {
      throw new Error("[DEF] Attempt to redefine definition: " + name);
    }
    global[nm] = global.leisureFuncs[nm] = func;
    (evalFunc('leisureAddFunc'))(name);
    return func;
  };

  define('cons', (function() {
    return primCons;
  }), 2, '\a b f . f a b');

  define('nil', (function() {
    return primNil;
  }), 0, '\a b . b');

  define('lexCons', (function() {
    return primLexCons;
  }), 4, '\a s b e f . f a s b e');

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
      return "Token('" + (this.tok()) + "', " + (this.start()) + "-" + (this.end()) + ")";
    };

    return Token;

  })();

  primToken = setDataType((function(a) {
    return function(b) {
      var t;
      t = mkProto(Token, setType((function(f) {
        return f()(a)(b);
      }), 'token'));
      return t;
    };
  }), 'token');

  makeToken = function makeToken(tok, rest, totalLen) {
    var tp;
    tp = totalLen - rest.length - tok.length;
    return primToken(function() {
      return tok;
    })(function() {
      return tp;
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
      g = group(Nil, str.length - rest.length);
      return [g, null, rest];
    });
  };

  parseGroup = function parseGroup(str, indent, totalLen) {
    var rest, tok, _ref;
    if (!str) {
      return [lexDlempty, null, str];
    } else {
      _ref = nextTok(str), tok = _ref[0], rest = _ref[1];
      if (!tok || (tok[0] === '\n' && tok.length <= indent.length) || groupCloses[tok]) {
        return [lexDlempty, null, str];
      } else {
        return ifParsed(parseGroupTerm(tok, rest, indent, totalLen), function(term, rest2) {
          return ifParsed(parseGroup(rest2, indent, totalLen), function(group, rest3) {
            return [lexDlappend(term, group), null, rest3];
          });
        });
      }
    }
  };

  collapseTrivial = function collapseTrivial(group) {
    if (group instanceof Cons && group.tail() === Nil) {
      return collapseTrivial(group.head());
    } else {
      return group;
    }
  };

  parseGroupTerm = function parseGroupTerm(tok, rest, indent, totalLen) {
    var close, token;
    token = makeToken(tok, rest, totalLen);
    if (tok[0] === '\n') {
      return ifParsed(parseGroup(rest, tok, totalLen), function(group, rest2) {
        return [lexDlnew(collapseTrivial(group(Nil, totalLen - rest2.length)), token.start()), null, rest2];
      });
    } else {
      if (close = groupOpens[tok]) {
        return ifParsed(parseGroup(rest, indent, totalLen), function(group, rest2) {
          var closeToken, innerGroup, next, rest3, _ref;
          _ref = nextTok(rest2), next = _ref[0], rest3 = _ref[1];
          closeToken = makeToken(next, rest3, totalLen);
          if (close !== next) {
            return [null, "Expecting group close: '" + close + "', but got " + (snip(rest2)) + "\n" + (new Error().stack), rest3];
          } else if (tok === '(') {
            return [lexDlnew(positionGroup(group, token, closeToken), token.start()), null, rest3];
          } else {
            innerGroup = lexDlappend(lexDlappend(lexDlnew(token, token.start()), group), lexDlnew(closeToken, closeToken.start()))(Nil, closeToken.end());
            return [lexDlnew(innerGroup, token.start()), null, rest3];
          }
        });
      } else {
        return [lexDlnew(token, token.start()), null, rest];
      }
    }
  };

  positionGroup = function positionGroup(groupDL, startTok, endTok) {
    var g;
    g = collapseTrivial(groupDL(Nil, endTok.end()));
    if (g instanceof LexCons) {
      return g.withStart(startTok.start());
    } else {
      return g;
    }
  };

  define('lit', function() {
    return setDataType((function(_x) {
      return setType((function(_f) {
        return _f()(_x);
      }), 'lit');
    }), 'lit');
  });

  define('ref', function() {
    return setDataType((function(_x) {
      return setType((function(_f) {
        return _f()(_x);
      }), 'ref');
    }), 'ref');
  });

  define('lambda', function() {
    return setDataType((function(_v) {
      return function(_f) {
        return setType((function(_g) {
          return _g()(_v)(_f);
        }), 'lambda');
      };
    }), 'lambda');
  });

  define('apply', function() {
    return setDataType((function(_func) {
      return function(_arg) {
        return setType((function(_f) {
          return _f()(_func)(_arg);
        }), 'apply');
      };
    }), 'apply');
  });

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
    if (list === Nil) {
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
    if (list === Nil) {
      return [null, "Bad lambda construct -- no variable or body"];
    } else if (list.tail() === Nil) {
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
    if (rest === Nil) {
      return [f];
    } else {
      return ifParsed(listToAst(rest.head()), function(a) {
        return listToApply(tag(apply(f, a), f.leisureStart, a.leisureEnd), rest.tail());
      });
    }
  };

  /*
  tests
  
  TODO
  
  * get working with current ASTs
  * rewrite listToAst in Leisure?
  * write precedence parser in Leisure
  */

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
          return "(" + (f.start()) + ", " + (f.end()) + ")[" + (elements(f, true)) + "]";
        case 'cons':
          return "[" + (elements(f, true)) + "]";
        case 'nil':
          return "[]";
        case 'token':
          return "" + f;
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
    if (getType(l) === 'nil') {
      return '';
    } else if (getType(l) !== 'lexCons') {
      return " | " + (print(l));
    } else {
      return "" + (first ? '' : ' ') + (print(l.head()) + elements(l.tail(), false));
    }
  };

  console.log("parse: a b: " + (parsePhase1('a b')[0]));

  console.log("parse: a (b): " + (parsePhase1('a (b)')[0]));

  console.log("parse: a (b c d (e f)): " + (parsePhase1('a (b c d (e f))')[0]));

  console.log("parse: \\\\\\\u03BB\\\u03BB: " + (parsePhase1('\\\\\\\u03BB\\\u03BB')[0]));

  console.log("parse: 'a\n  b c\n  d\n  e f g\nh': " + (parsePhase1('a\n  b c\n  d\n  e f g\nh')[0]));

  console.log("parse: 'a\n b\n  c\n   d\n  e\n f\ng': " + (parsePhase1('a\n b\n  c\n   d\n  e\n f\ng')[0]));

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
