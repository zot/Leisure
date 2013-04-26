
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
  var Nil, addDelimiter, cons, consFrom, define, delimiterList, delimiterPat, delimiters, doNotNil, doParsed, ensureLeisureClass, exports, head, inspect, isTok, makeDelimterPat, makeTokens, parse, parseErr, parseErrMsg, parseGroup, parseTok, parseToks, root, setDataType, setType, splitTokens, tail, token, tokenPos, tokenString, tokens, _, _ref;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    root = window.Leisure = window.Leisure || {};
  } else {
    _ref = root = exports = module.exports = require('./ast'), cons = _ref.cons, Nil = _ref.Nil, consFrom = _ref.consFrom, head = _ref.head, tail = _ref.tail, define = _ref.define, setDataType = _ref.setDataType, setType = _ref.setType, ensureLeisureClass = _ref.ensureLeisureClass;
    inspect = require('util').inspect;
    _ = require('./lodash.min');
  }

  delimiterList = ['\\n *', '\\(', '\\)', ' +'];

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

  doNotNil = function doNotNil(toks, cont) {
    if (toks === Nil) {
      return toks;
    } else {
      return cont(toks);
    }
  };

  doParsed = function doParsed(toks, cont) {
    if (toks instanceof Leisure_parseErr) {
      return toks;
    } else {
      return cont(toks);
    }
  };

  parseToks = function parseToks(toks) {
    return doNotNil(parseTok(toks), function(t) {
      return doParsed(t, function() {
        return doParsed(parseToks(tail(t)), function(rest) {
          return cons(head(t), rest);
        });
      });
    });
  };

  parseTok = function parseTok(toks) {
    return doNotNil(toks, function() {
      var h, t;
      h = head(toks);
      t = tail(toks);
      if (isTok(h) && tokenString(h) === '(') {
        return parseGroup(t, Nil);
      } else if (isTok(h) && tokenString(h)[0] === ' ') {
        return parseTok(t);
      } else {
        return toks;
      }
    });
  };

  parseGroup = function parseGroup(toks, gr) {
    var h;
    if (toks === Nil) {
      return parseErr("Unterminated group");
    } else {
      h = head(toks);
      if (isTok(h) && tokenString(h) === ')') {
        return cons(gr.reverse(), tail(toks));
      } else {
        return doParsed(parseTok(toks), function(rest) {
          return parseGroup(tail(rest), cons(head(rest), gr));
        });
      }
    }
  };

  parse = function parse(str) {
    return parseToks(tokens(str));
  };

  root.splitTokens = splitTokens;

  root.tokens = tokens;

  root.parse = parse;

}).call(this);
