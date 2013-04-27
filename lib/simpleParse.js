
/*
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

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
  var Nil, addDelimiter, apply, chainApply, cons, consFrom, createApply, createAst, createLambda, createLet, createLets, createLitOrRef, define, delimiterList, delimiterPat, delimiters, doCons, doParsed, doToken, ensureLeisureClass, exports, getLetDefValue, head, identity, inspect, isCons, isParens, isTok, isTokString, lambda, lit, loc, makeDelimterPat, makeTokens, parens, parensEnd, parensFromToks, parensList, parensStart, parse, parseErr, parseErrMsg, parseGroup, parseToAst, parseTok, parseToks, ref, root, setDataType, setType, shead, splitTokens, stail, strip, tail, token, tokenPos, tokenString, tokens, withCons, withToken, _, _ref;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    root = window.Leisure = window.Leisure || {};
  } else {
    _ref = root = exports = module.exports = require('./ast'), cons = _ref.cons, Nil = _ref.Nil, consFrom = _ref.consFrom, head = _ref.head, tail = _ref.tail, define = _ref.define, setDataType = _ref.setDataType, setType = _ref.setType, ensureLeisureClass = _ref.ensureLeisureClass, ref = _ref.ref, lit = _ref.lit, apply = _ref.apply, lambda = _ref.lambda;
    inspect = require('util').inspect;
    _ = require('./lodash.min');
  }

  delimiterList = ['\\n *', '\\(', '\\)', ' +', '\\.', '\\\\\\\\', '\\\\'];

  delimiters = _.object(_.map(delimiterList, function(x) {
    return [x, true];
  }));

  delimiterPat = null;

  makeDelimterPat = function makeDelimterPat() {
    console.log("New delimiterPat: '(" + (delimiterList.join('|')) + ")'");
    return delimiterPat = new RegExp("(" + (delimiterList.join('|')) + ")");
  };

  addDelimiter = function addDelimiter(del) {
    if (!delimiters) {
      delimiters[del] = true;
      delimiterList.push(del);
      _.sortBy(delimiters, function(x) {
        return -x.length;
      });
      makeDelimterPat();
    }
    return end;
  };

  makeDelimterPat();

  define('token', (function() {
    return setDataType((function(txt) {
      return function(pos) {
        return setType((function(f) {
          return f()(txt)(pos);
        }), 'token');
      };
    }), 'token');
  }), 2, '\\txt pos . \\f . f txt pos');

  ensureLeisureClass('token');

  Leisure_token.prototype.toString = function toString() {
    return "Token(" + (JSON.stringify(tokenString(this))) + ", " + (tokenPos(this)) + ")";
  };

  tokenString = function tokenString(t) {
    return t(function() {
      return function(txt) {
        return function(pos) {
          return txt();
        };
      };
    });
  };

  tokenPos = function tokenPos(t) {
    return t(function() {
      return function(txt) {
        return function(pos) {
          return pos();
        };
      };
    });
  };

  token = function token(str, pos) {
    return L_token()(function() {
      return str;
    })(function() {
      return pos;
    });
  };

  isTok = function isTok(t) {
    return t instanceof Leisure_token;
  };

  define('parens', (function() {
    return setDataType((function(left) {
      return function(right) {
        return function(ast) {
          return setType((function(f) {
            return f()(left)(right)(ast);
          }), 'parens');
        };
      };
    }), 'parens');
  }), 3, '\\left right ast . \\f . f left right ast');

  ensureLeisureClass('parens');

  Leisure_parens.prototype.toString = function toString() {
    return "Parens(" + (parensStart(this)) + ", " + (parensEnd(this)) + ", " + (parensList(this)) + ")";
  };

  parens = function parens(start, end, list) {
    return L_parens()(function() {
      return start;
    })(function() {
      return end;
    })(function() {
      return list;
    });
  };

  parensFromToks = function parensFromToks(left, right, list) {
    var end, start;
    start = tokenPos(left);
    end = tokenPos(right) + tokenString(right).length;
    return L_parens()(function() {
      return start;
    })(function() {
      return end;
    })(function() {
      return list;
    });
  };

  parensStart = function parensStart(p) {
    return p(function() {
      return function(s) {
        return function(e) {
          return function(l) {
            return s();
          };
        };
      };
    });
  };

  parensEnd = function parensEnd(p) {
    return p(function() {
      return function(s) {
        return function(e) {
          return function(l) {
            return e();
          };
        };
      };
    });
  };

  parensList = function parensList(p) {
    return p(function() {
      return function(s) {
        return function(e) {
          return function(l) {
            return l();
          };
        };
      };
    });
  };

  isParens = function isParens(p) {
    return p instanceof Leisure_parens;
  };

  define('parseErr', (function() {
    return setDataType((function(msg) {
      return setType((function(f) {
        return f()(msg);
      }), 'parseErr');
    }), 'parseErr');
  }), 1, '\\msg . \\f . f msg');

  ensureLeisureClass('parseErr');

  Leisure_parseErr.prototype.toString = function toString() {
    return "ParseErr(" + (JSON.stringify(parseErrMsg(this))) + ")";
  };

  parseErr = function parseErr(msg) {
    return L_parseErr()(function() {
      return msg;
    });
  };

  parseErrMsg = function parseErrMsg(e) {
    return e(function() {
      return function(msg) {
        return msg();
      };
    });
  };

  makeTokens = function makeTokens(strings, start) {
    if (strings === Nil) {
      return Nil;
    } else if (head(strings)[0] === ' ') {
      return makeTokens(tail(strings), start + head(strings).length);
    } else {
      return cons(token(head(strings), start), makeTokens(tail(strings), start + head(strings).length));
    }
  };

  splitTokens = function splitTokens(str) {
    return consFrom(_.filter(str.split(delimiterPat), function(s) {
      return s.length;
    }));
  };

  tokens = function tokens(str) {
    return makeTokens(splitTokens(str), 0);
  };

  isTokString = function isTokString(t, str) {
    return isTok(t) && tokenString(t) === str;
  };

  doParsed = function doParsed(toks, cont) {
    if (toks instanceof Leisure_parseErr) {
      return toks;
    } else {
      return cont(toks);
    }
  };

  parseToks = function parseToks(toks, cont) {
    if (toks === Nil) {
      return cont(Nil);
    } else {
      return parseTok(toks, function(h, t) {
        return parseToks(t, function(res) {
          return cont(cons(h, res));
        });
      });
    }
  };

  parseTok = function parseTok(toks, cont) {
    var h, t;
    if (toks === Nil) {
      return Nil;
    } else {
      h = head(toks);
      t = tail(toks);
      if (isTokString(h, '(')) {
        return parseGroup(h, t, Nil, cont);
      } else if (isTok(h) && tokenString(h)[0] === ' ') {
        return parseTok(t, cont);
      } else {
        return cont(h, t);
      }
    }
  };

  parseGroup = function parseGroup(left, toks, gr, cont) {
    var h;
    if (toks === Nil) {
      return parseErr("Unterminated group starting at " + (tokenPos(left)));
    } else {
      h = head(toks);
      if (isTokString(h, ')')) {
        return cont(parensFromToks(left, h, gr.reverse()), tail(toks));
      } else {
        return parseTok(toks, function(restH, restT) {
          return parseGroup(left, restT, cons(restH, gr), cont);
        });
      }
    }
  };

  identity = function identity(x) {
    return x;
  };

  parse = function parse(str) {
    return parseToks(tokens(str), identity);
  };

  strip = function strip(list, cont) {
    if (isParens(list)) {
      return strip(parensList(list), cont);
    } else {
      return cont(list);
    }
  };

  shead = function shead(list) {
    return strip(head(list), function(l) {
      return l;
    });
  };

  stail = function stail(list) {
    return strip(tail(list), function(l) {
      return l;
    });
  };

  isCons = function isCons(c) {
    return c instanceof Leisure_cons;
  };

  doCons = function doCons(c, cont) {
    if (isCons(c)) {
      return cont(c);
    } else if (isTok(c)) {
      return parseErr("Expected list, but get token at " + (tokenStart(c)));
    } else if (isParens(c)) {
      return parseErr("Expected list, but got parentheses at " + (tokenStart(c)));
    }
  };

  doToken = function doToken(t, cont) {
    if (isTok(t)) {
      return cont(t);
    } else if (isParens(t)) {
      return parseErr("Expected token, but got parentheses at " + (parensStart(t)));
    } else if (isCons(t)) {
      return parseErr("Expected token, but got list");
    } else {
      return parseErr("Expected token");
    }
  };

  withCons = function withCons(l, err, cont) {
    if (isCons(l)) {
      return cont(head(l), tail(l));
    } else {
      return err();
    }
  };

  loc = function loc(thing) {
    if (isTok(thing)) {
      return "at " + (tokenPos(thing));
    } else if (isParens(thing)) {
      return "at " + (parensStart(thing));
    } else {
      return '';
    }
  };

  createAst = function createAst(inList, names, cont) {
    return strip(inList, function(list) {
      if (list === Nil) {
        return cont(Nil);
      } else if (isTok(list)) {
        return createLitOrRef(tokenString(list), names, cont);
      } else {
        return withCons(list, (function() {
          return parseErr("Null list for AST" + (loc(inList)) + ": " + inList);
        }), function(h, t) {
          if (isTokString(h, '\\\\')) {
            return createLet(h, t, names, cont);
          } else if (isTokString(h, '\\')) {
            return createLambda(h, t, names, cont);
          } else {
            return createApply(list, names, cont);
          }
        });
      }
    });
  };

  createLitOrRef = function createLitOrRef(tok, names, cont) {
    if (names.find(function(el) {
      return el === tok;
    }) !== Nil) {
      return cont(ref(tok));
    } else {
      try {
        return cont(lit(JSON.parse(tok)));
      } catch (err) {
        return cont(ref(tok));
      }
    }
  };

  createLambda = function createLambda(start, list, names, cont) {
    return withCons(list, (function() {
      return parseErr("No variable or body for lambda at " + (tokenPos(start)));
    }), function(name, rest) {
      return withCons(rest, (function() {
        return parseErr("No body for lambda at " + (tokenPos(start)));
      }), function(dot, body) {
        return withToken(name, (function() {
          return parseErr("Expecting name for lambda at " + (tokenPos(start)));
        }), function(n) {
          if (isTokString(dot, '.')) {
            return createAst(body, cons(name, names), function(bodyAst) {
              return cont(lambda(n, bodyAst));
            });
          } else {
            return createLambda(start, rest, cons(name, names), function(bodyAst) {
              return cont(lambda(n, bodyAst));
            });
          }
        });
      });
    });
  };

  createApply = function createApply(inList, names, cont) {
    return strip(inList, function(list) {
      return withCons(list, (function() {
        return parseErr("Expecting a non-empty list" + (loc(inList)));
      }), function(h, t) {
        return createAst(h, names, function(func) {
          return chainApply(func, t, names, cont);
        });
      });
    });
  };

  chainApply = function chainApply(func, list, names, cont) {
    if (list === Nil) {
      return cont(func);
    } else {
      return withCons(list, (function() {
        return parseErr("Expecting list" + (loc(inList)));
      }), function(argItem, rest) {
        return createAst(argItem, names, function(arg) {
          return chainApply(apply(func, arg), rest, names, cont);
        });
      });
    }
  };

  createLet = function createLet(start, list, names, cont) {
    if (list === Nil) {
      return parseErr("No variable or body for let at " + (tokenPos(start)));
    } else {
      return createLets(start, list, names, cont);
    }
  };

  createLets = function createLets(start, list, names, cont) {
    var def;
    def = head(list);
    if (def === Nil) {
      return parseErr("No variable for let at " + (tokenPos(start)));
    } else {
      return doCons(def, function() {
        return getLetDefValue(tail(def), names, function(defValue) {
          return doCons(tail(list), function(body) {
            return doParsed(createAst(body, names), function(body) {
              return llet(head(def), defValue, body);
            });
          });
        });
      });
    }
  };

  getLetDefValue = function getLetDefValue(def, names, cont) {
    return "LET DEF";
  };

  withToken = function withToken(tok, err, cont) {
    if (isTok(tok)) {
      return cont(tokenString(tok));
    } else {
      return err();
    }
  };

  parseToAst = function parseToAst(str) {
    return createAst(parse(str), Nil, identity);
  };

  root.splitTokens = splitTokens;

  root.tokens = tokens;

  root.parse = parse;

  root.parseToAst = parseToAst;

}).call(this);
