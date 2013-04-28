
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
  var Nil, addDelimiter, apply, chainApply, cons, consFrom, createApply, createAst, createLambda, createLet, createLitOrRef, createSublets, define, delimiterList, delimiterPat, delimiters, ensureLeisureClass, exports, getLetLambda, getLetNames, getNameAndDef, head, identity, inspect, isParens, isToken, isTokenString, lambda, lit, llet, loc, makeDelimterPat, makeTokens, parens, parensContent, parensEnd, parensFromToks, parensStart, parse, parseErr, parseErrMsg, parseGroup, parseToAst, parseTok, parseToks, ref, root, setDataType, setType, splitTokens, strip, tail, token, tokenPos, tokenString, tokens, withCons, withParens, withToken, _, _ref;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    root = window.Leisure = window.Leisure || {};
  } else {
    _ref = root = exports = module.exports = require('./ast'), cons = _ref.cons, Nil = _ref.Nil, consFrom = _ref.consFrom, head = _ref.head, tail = _ref.tail, define = _ref.define, setDataType = _ref.setDataType, setType = _ref.setType, ensureLeisureClass = _ref.ensureLeisureClass, ref = _ref.ref, lit = _ref.lit, apply = _ref.apply, lambda = _ref.lambda, llet = _ref.llet;
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

  isToken = function isToken(t) {
    return t instanceof Leisure_token;
  };

  define('parens', (function() {
    return setDataType((function(left) {
      return function(right) {
        return function(content) {
          return setType((function(f) {
            return f()(left)(right)(content);
          }), 'parens');
        };
      };
    }), 'parens');
  }), 3, '\\left right ast . \\f . f left right ast');

  ensureLeisureClass('parens');

  Leisure_parens.prototype.toString = function toString() {
    return "Parens(" + (parensStart(this)) + ", " + (parensEnd(this)) + ", " + (parensContent(this)) + ")";
  };

  parens = function parens(start, end, content) {
    return L_parens()(function() {
      return start;
    })(function() {
      return end;
    })(function() {
      return content;
    });
  };

  parensFromToks = function parensFromToks(left, right, content) {
    var end, start;
    start = tokenPos(left);
    end = tokenPos(right) + tokenString(right).length;
    return L_parens()(function() {
      return start;
    })(function() {
      return end;
    })(function() {
      return content;
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

  parensContent = function parensContent(p) {
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

  isTokenString = function isTokenString(t, str) {
    return isToken(t) && tokenString(t) === str;
  };

  withCons = function withCons(l, nilCase, cont) {
    if (l instanceof Leisure_cons) {
      return cont(head(l), tail(l));
    } else {
      return nilCase();
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
    return withCons(toks, (function() {
      return Nil;
    }), function(h, t) {
      if (isTokenString(h, '(')) {
        return parseGroup(h, t, Nil, cont);
      } else if (isToken(h) && tokenString(h)[0] === ' ') {
        return parseTok(t, cont);
      } else {
        return cont(h, t);
      }
    });
  };

  parseGroup = function parseGroup(left, toks, gr, cont) {
    return withCons(toks, (function() {
      return parseErr("Unterminated group starting at " + (tokenPos(left)));
    }), function(h, t) {
      if (isTokenString(h, ')')) {
        return cont(parensFromToks(left, h, gr.reverse()), t);
      } else {
        return parseTok(toks, function(restH, restT) {
          return parseGroup(left, restT, cons(restH, gr), cont);
        });
      }
    });
  };

  identity = function identity(x) {
    return x;
  };

  parse = function parse(str) {
    return parseToks(tokens(str), identity);
  };

  parseToAst = function parseToAst(str) {
    return createAst(parse(str), Nil, identity);
  };

  withToken = function withToken(tok, nonTokenCase, cont) {
    if (isToken(tok)) {
      return cont(tokenString(tok));
    } else {
      return nonTokenCase();
    }
  };

  withParens = function withParens(p, err, cont) {
    if (!isParens(p)) {
      return err();
    } else {
      return cont(parensContent(p));
    }
  };

  strip = function strip(list, cont) {
    return withParens(list, (function() {
      return cont(list);
    }), function(c) {
      return strip(c, cont);
    });
  };

  loc = function loc(thing) {
    if (isToken(thing)) {
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
      } else if (isToken(list)) {
        return createLitOrRef(tokenString(list), names, cont);
      } else {
        return withCons(list, (function() {
          return parseErr("Null list for AST" + (loc(inList)) + ": " + inList);
        }), function(h, t) {
          if (isTokenString(h, '\\\\')) {
            return createLet(h, t, names, cont);
          } else if (isTokenString(h, '\\')) {
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
          if (isTokenString(dot, '.')) {
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
    return withCons(list, (function() {
      return parseErr("No variable or body for let at " + (tokenPos(start)));
    }), function(binding, body) {
      if (body === Nil) {
        return createAst(binding, names, cont);
      } else {
        return getLetNames(start, list, names, function(newNames) {
          return createSublets(start, binding, body, newNames, cont);
        });
      }
    });
  };

  getLetNames = function getLetNames(start, list, names, cont) {
    return withCons(list, (function() {
      return cont(names);
    }), function(binding, body) {
      if (body === Nil) {
        return cont(names);
      } else {
        return withParens(binding, (function() {
          return parseErr("Let expected binding at " + (tokenPos(start)));
        }), function(def) {
          return withCons(def, (function() {
            return parseErr("Let expected binding at " + (tokenPos(start)));
          }), function(name, rest) {
            return withToken(name, (function() {
              return parseErr("Let expected binding at " + (tokenPos(start)));
            }), function(str) {
              return getLetNames(start, body, cons(str, names), cont);
            });
          });
        });
      }
    });
  };

  createSublets = function createSublets(start, binding, body, names, cont) {
    return withCons(body, (function() {
      return createAst(binding, names, cont);
    }), function(bodyH, bodyT) {
      return getNameAndDef(parensStart(binding), parensContent(binding), names, function(name, def) {
        return createSublets(start, bodyH, bodyT, names, function(bodyAst) {
          return cont(llet(tokenString(name), def, bodyAst));
        });
      });
    });
  };

  getNameAndDef = function getNameAndDef(pos, binding, names, cont) {
    return withCons(tail(binding), (function() {
      return parseErr("Let expected binding at " + pos);
    }), function(snd, sndT) {
      if (isTokenString(snd, '=')) {
        return createAst(sndT, names, function(def) {
          return cont(head(binding), def);
        });
      } else {
        return getLetLambda(pos, tail(binding), Nil, names, function(lamb) {
          return cont(head(binding), lamb);
        });
      }
    });
  };

  getLetLambda = function getLetLambda(pos, def, args, names, cont) {
    return withCons(def, (function() {
      return parseErr("Let expected binding at " + pos);
    }), function(arg, rest) {
      if (!isToken(arg)) {
        return parseErr("Let expected binding at " + pos);
      } else if (isTokenString(arg, '=')) {
        return createAst(cons(token('\\', pos), args.reverse()).append(cons(token('.', tokenPos(arg)), rest)), names, cont);
      } else {
        return getLetLambda(pos, rest, cons(arg, args), names, cont);
      }
    });
  };

  root.splitTokens = splitTokens;

  root.tokens = tokens;

  root.parse = parse;

  root.parseToAst = parseToAst;

}).call(this);
