
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
  var L_parens, L_parseErr, L_token, Nil, addDelimiter, anno, apply, arity, ast2Json, chainApply, checkSetDataType, checkSetDataTypeFurther, cleanTokens, compileFile, compileLine, cons, consFrom, createAnno, createApply, createAst, createLambda, createLet, createLitOrRef, createSublets, defPat, define, delimiterList, delimiterPat, delimiters, ensureLeisureClass, gen, genLine, getLetLambda, getLetNames, getNameAndDef, head, identity, isParens, isToken, isTokenString, jsonForFile, lambda, lit, llet, loc, makeDelimterPat, makeTokens, parens, parensContent, parensEnd, parensFromToks, parensStart, parse, parseErr, parseErrMsg, parseGroup, parseLine, parseToAst, parseTok, parseToks, position, ref, root, setDataType, setDataTypeAnno, setDefAnno, setType, setTypeAnno, splitTokens, strip, tail, tokListStr, token, tokenPos, tokenString, tokens, transformDef, withCons, withParens, withToken, _, _ref;

  _ref = root = module.exports = require('./ast'), cons = _ref.cons, Nil = _ref.Nil, consFrom = _ref.consFrom, head = _ref.head, tail = _ref.tail, define = _ref.define, setDataType = _ref.setDataType, setType = _ref.setType, ensureLeisureClass = _ref.ensureLeisureClass, ref = _ref.ref, lit = _ref.lit, apply = _ref.apply, lambda = _ref.lambda, llet = _ref.llet, anno = _ref.anno, ast2Json = _ref.ast2Json;

  gen = require('./gen').gen;

  _ = require('./lodash.min');

  delimiterList = ['\\n *', '\\(', '\\)', ' +', '\\.', '\\\\\\\\', '\\\\@', '\\\\'];

  delimiters = _.object(_.map(delimiterList, function(x) {
    return [x, true];
  }));

  delimiterPat = null;

  defPat = /^[^ ].*=/;

  makeDelimterPat = function makeDelimterPat() {
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

  L_token = setDataType((function(txt) {
    return function(pos) {
      return setType((function(f) {
        return f()(txt)(pos);
      }), 'token');
    };
  }), 'token');

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
    return L_token(function() {
      return str;
    })(function() {
      return pos;
    });
  };

  isToken = function isToken(t) {
    return t instanceof Leisure_token;
  };

  L_parens = function L_parens() {
    return setDataType((function(left) {
      return function(right) {
        return function(content) {
          return setType((function(f) {
            return f()(left)(right)(content);
          }), 'parens');
        };
      };
    }), 'parens');
  };

  ensureLeisureClass('parens');

  Leisure_parens.prototype.toString = function toString() {
    return "Parens(" + (parensStart(this)) + ", " + (parensEnd(this)) + ", " + (parensContent(this)) + ")";
  };

  parens = function parens(start, end, content) {
    return L_parens(function() {
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

  L_parseErr = setDataType((function(msg) {
    return setType((function(f) {
      return f()(msg);
    }), 'parseErr');
  }), 'parseErr');

  ensureLeisureClass('parseErr');

  Leisure_parseErr.prototype.toString = function toString() {
    return "ParseErr(" + (JSON.stringify(parseErrMsg(this))) + ")";
  };

  parseErr = function parseErr(msg) {
    return L_parseErr(function() {
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
      return cont(tokenString(tok, tokenPos(tok)));
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

  position = function position(thing) {
    if (isToken(thing)) {
      return tokenPos(thing);
    } else if (isParens(thing)) {
      return parensStart(thing);
    } else if (thing instanceof Leisure_cons) {
      return position(head(thing));
    } else {
      return -1;
    }
  };

  loc = function loc(thing) {
    var p;
    p = position(thing);
    return "at " + (p === -1 ? 'an unknown location' : p);
  };

  createAst = function createAst(inList, names, cont) {
    return strip(inList, function(list) {
      if (list === Nil) {
        return cont(Nil);
      } else if (isToken(list)) {
        return createLitOrRef(tokenString(list), names, cont);
      } else {
        return withCons(list, (function() {
          return parseErr("Null list for AST " + (loc(inList)) + ": " + inList);
        }), function(h, t) {
          if (isTokenString(h, '\\\\')) {
            return createLet(h, t, names, cont);
          } else if (isTokenString(h, '\\@')) {
            return createAnno(h, t, names, cont);
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
      return parseErr("No variable or body for lambda " + (loc(start)));
    }), function(name, rest) {
      return withCons(rest, (function() {
        return parseErr("No body for lambda " + (loc(start)));
      }), function(dot, body) {
        return withToken(name, (function() {
          return parseErr("Expecting name for lambda " + (loc(start)));
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

  createAnno = function createAnno(start, list, names, cont) {
    return withCons(list, (function() {
      return parseErr("No annotation name or data in annotation " + (loc(start)));
    }), function(name, rest) {
      return withCons(rest, (function() {
        return parseErr("No data for annotation " + (loc(start)));
      }), function(data, rest) {
        return withCons(rest, (function() {
          return parseErr("No body for annotation " + (loc(start)));
        }), function(dot, body) {
          if (isTokenString(dot, '.')) {
            return createAst(body, names, function(bodyAst) {
              return cleanTokens(start, name, function(name) {
                return cleanTokens(start, data, function(data) {
                  return cont(anno(name, data, bodyAst));
                });
              });
            });
          } else {
            return parseErr("Annotation expected dot after name and data");
          }
        });
      });
    });
  };

  cleanTokens = function cleanTokens(start, toks, cont) {
    if (toks === Nil) {
      return cont(toks);
    } else if (isToken(toks)) {
      return cont(tokenString(toks));
    } else {
      return withCons(toks, (function() {
        return parseErr("Expected token or list but got " + toks + " " + (loc(start)));
      }), function(head, tail) {
        return cleanTokens(start, head, function(head) {
          return cleanTokens(start, tail, function(tail) {
            return cont(cons(head, tail));
          });
        });
      });
    }
  };

  createApply = function createApply(inList, names, cont) {
    return strip(inList, function(list) {
      return withCons(list, (function() {
        return parseErr("Expecting a non-empty list " + (loc(inList)));
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
        return parseErr("Expecting list " + (loc(inList)));
      }), function(argItem, rest) {
        var _ref2;
        if (isToken(argItem) && ((_ref2 = tokenString(argItem)) === '\\' || _ref2 === '\\\\' || _ref2 === '\\@')) {
          return createAst(list, names, function(arg) {
            return cont(apply(func, arg));
          });
        } else {
          return createAst(argItem, names, function(arg) {
            return chainApply(apply(func, arg), rest, names, cont);
          });
        }
      });
    }
  };

  createLet = function createLet(start, list, names, cont) {
    return withCons(list, (function() {
      return parseErr("No variable or body for let " + (loc(start)));
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
          return parseErr("Let expected binding " + (loc(start)));
        }), function(def) {
          return withCons(def, (function() {
            return parseErr("Let expected binding " + (loc(start)));
          }), function(name, rest) {
            return withToken(name, (function() {
              return parseErr("Let expected binding " + (loc(start)));
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
        return createAst(cons(token('\\', pos), args.reverse()).append(cons(token('.', position(arg)), rest)), names, cont);
      } else {
        return getLetLambda(pos, rest, cons(arg, args), names, cont);
      }
    });
  };

  parseLine = function parseLine(str, isDef, isExpr) {
    var func, name, toks;
    toks = tokens(str);
    if (str.match(defPat)) {
      name = head(toks);
      func = isTokenString(head(tail(toks)), '=') ? isTokenString(head(tail(tail(toks))), '\\') ? setTypeAnno(head(tail(tail(toks))), tail(tail(toks)), tokenString(name)) : tail(tail(toks)) : cons(token('\\', position(head(tail(toks))) - 1), transformDef(name, tail(toks)));
      return parseToks(setDefAnno(checkSetDataType(func, toks, name), name, arity(tail(toks), 0), str), function(list) {
        return createAst(list, Nil, function(ast) {
          return isDef(ast);
        });
      });
    } else {
      return parseToks(toks, function(list) {
        return createAst(list, Nil, function(ast) {
          return isExpr(ast);
        });
      });
    }
  };

  genLine = function genLine(str, isDef, isExpr) {
    return parseLine(str, (function(ast) {
      return isDef("(" + (gen(ast)) + ");\n");
    }), function(ast) {
      return isExpr("(function(){return " + (gen(ast)) + ";});\n");
    });
  };

  compileLine = function compileLine(str, isDef, isExpr) {
    return genLine(str, (function(code) {
      return isDef(eval(code));
    }), function(code) {
      return isExpr(eval(code));
    });
  };

  transformDef = function transformDef(name, toks) {
    if (isTokenString(head(toks), '=')) {
      if (isTokenString(head(tail(toks)), '\\')) {
        return cons(token('.', position(head(toks))), setTypeAnno(head(tail(toks)), tail(toks), tokenString(name)));
      } else {
        return cons(token('.', position(head(toks))), tail(toks));
      }
    } else {
      return cons(head(toks), transformDef(name, tail(toks)));
    }
  };

  setTypeAnno = function setTypeAnno(start, toks, name) {
    var pos, tok;
    pos = position(start);
    tok = function tok(str) {
      return token(str, pos);
    };
    return cons(tok('\\@'), cons(tok('type'), cons(tok(name), cons(tok('.'), toks))));
  };

  setDefAnno = function setDefAnno(def, name, arity, src) {
    var pos, tok;
    pos = position(def);
    tok = function tok(str) {
      return token(str, pos);
    };
    return cons(tok('\\@'), cons(tok('define'), cons(cons(tok(tokenString(name)), cons(tok(String(arity)), cons(tok(src), Nil))), cons(tok('.'), def))));
  };

  checkSetDataType = function checkSetDataType(toks, curToks, name) {
    if (isTokenString(head(curToks), '=')) {
      return toks;
    } else {
      return checkSetDataTypeFurther(toks, curToks, name);
    }
  };

  checkSetDataTypeFurther = function checkSetDataTypeFurther(toks, curToks, name) {
    if (isTokenString(head(curToks), '=')) {
      if (isTokenString(head(tail(curToks)), '\\')) {
        return setDataTypeAnno(toks, name);
      } else {
        return toks;
      }
    } else {
      return checkSetDataType(toks, tail(curToks), name);
    }
  };

  setDataTypeAnno = function setDataTypeAnno(toks, name) {
    var pos;
    pos = position(toks);
    return cons(token('\\@', pos), cons(token('dataType', pos), cons(token(name, pos), cons(token('.', pos), toks))));
  };

  arity = function arity(toks, n) {
    if (isTokenString(head(toks), '=')) {
      return n;
    } else {
      return arity(tail(toks), n + 1);
    }
  };

  tokListStr = function tokListStr(toks) {
    return JSON.stringify(toks.map(function(t) {
      return tokenString(t);
    }).join(' '));
  };

  compileFile = function compileFile(text) {
    var id;
    id = function id(x) {
      return x;
    };
    return _.map(text.split('\n'), function(line) {
      return genLine(line, id, id);
    }).join('');
  };

  jsonForFile = function jsonForFile(text) {
    var id;
    id = function id(x) {
      return x;
    };
    return _.map(text.split('\n'), function(line) {
      return JSON.stringify(ast2Json(parseLine(line, id, id)));
    }).join('\n');
  };

  root.splitTokens = splitTokens;

  root.tokens = tokens;

  root.parse = parse;

  root.parseToAst = parseToAst;

  root.compileLine = compileLine;

  root.parseLine = parseLine;

  root.compileFile = compileFile;

  root.jsonForFile = jsonForFile;

}).call(this);
