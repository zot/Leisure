(function() {
  var Lazp, U, elements, getType, inspect, listDo, print, printApply, printLambda, root;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Pretty = root = {};
    Lazp = window.Lazp;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  if (!(Lazp != null) && (typeof require !== "undefined" && require !== null)) {
    Lazp = require('./lazp');
    U = require('util');
  }

  getType = Lazp.getType;

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
        default:
          return (_ref = f != null ? f.lazpName : void 0) != null ? _ref : inspect(f);
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
      return "" + v + " . " + (print(body));
    }
  };

  printApply = function printApply(func, arg) {
    var a, f;
    f = func.type === 'lambda' ? "(" + (print(func)) + ")" : print(func);
    a = arg.type === 'apply' ? "(" + (print(arg)) + ")" : print(arg);
    return "" + f + " " + a;
  };

  elements = function elements(l, first, nosubs) {
    if (getType(l) === 'nil') {
      return '';
    } else if (getType(l) !== 'cons') {
      return " . " + (print(l));
    } else {
      return "" + (first ? '' : ', ') + (listDo(l, function(h, t) {
        return print(h) + elements(t, false);
      }));
    }
  };

  root.print = print;

}).call(this);
