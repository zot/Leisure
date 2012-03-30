(function() {
  var Lazp, U, elements, getType, inspect, listDo, print, root;

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
        default:
          return inspect(f);
      }
    }
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
