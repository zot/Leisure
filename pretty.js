(function() {
  var Leisure, U, elements, getType, inspect, listDo, print, printApply, printLambda, root, subprint;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Pretty = root = {};
    Leisure = window.Leisure;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  if (!(Leisure != null) && (typeof require !== "undefined" && require !== null)) {
    Leisure = require('./leisure');
    U = require('util');
  }

  getType = Leisure.getType;

  inspect = (U != null ? U.inspect : void 0) || function(v) {
    return v;
  };

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
        case 'cons':
          return "[" + (elements(f, true)) + "]";
        case 'nil':
          return "[]";
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
                return "\\" + (printLambda(v(), bod()));
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
              return txt();
            };
          });
        default:
          return (_ref = f != null ? f.leisureName : void 0) != null ? _ref : inspect(f);
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
    } else if (getType(l) !== 'cons') {
      return " | " + (print(l));
    } else {
      return "" + (first ? '' : ', ') + (listDo(l, function(h, t) {
        return print(h) + elements(t, false);
      }));
    }
  };

  root.print = print;

}).call(this);
