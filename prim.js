(function() {
  var Lazp, RL, define, getType, makeMonad, output, prompt, root, setTty, tty, write;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    Lazp = window.Lazp;
    output = null;
    write = function write(msg) {
      if (!(output != null)) output = document.getElementById('output');
      return output.innerHTML += "" + msg;
    };
    prompt = function prompt(msg, func) {
      return func(window.prompt(msg));
    };
    root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Lazp = require('./lazp');
    RL = require('readline');
    tty = null;
    write = function write(msg) {
      return tty.write(msg);
    };
    prompt = function prompt(msg, func) {
      return tty.question(msg, func);
    };
  }

  setTty = function setTty(rl) {
    return tty = rl;
  };

  define = Lazp.define;

  getType = Lazp.getType;

  define('is', function(value) {
    return function(type) {
      var _ref;
      if (((_ref = value()) != null ? _ref.type : void 0) === type().dataType) {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('eq', function(a) {
    return function(b) {
      if (a() === b()) {
        return _true();
      } else {
        return  _false();
      }
    };
  });

  define('withType', function(value) {
    return function(t) {
      return function(f) {
        var type;
        if (type = getType(value())) {
          return t()(function() {
            return type;
          });
        } else {
          return f();
        }
      };
    };
  });

  define('+', function(a) {
    return function(b) {
      return a() + b();
    };
  });

  define('-', function(a) {
    return function(b) {
      return a() - b();
    };
  });

  define('*', function(a) {
    return function(b) {
      return a() * b();
    };
  });

  define('/', function(a) {
    return function(b) {
      return a() / b();
    };
  });

  define('%', function(a) {
    return function(b) {
      return a() % b();
    };
  });

  makeMonad = function makeMonad(binding, func) {
    func.type = 'monad';
    func.binding = binding;
    return func;
  };

  define('end', makeMonad(null, function(cont) {
    return cont(null);
  }));

  define('return', function(v, binding) {
    return makeMonad(binding(), function(cont) {
      return cont(v());
    });
  });

  define('print', function(msg) {
    return function(binding) {
      return makeMonad(binding(), function(cont) {
        write("" + (msg()) + "\n");
        return cont(null);
      });
    };
  });

  define('prompt', function(msg) {
    return function(binding) {
      return makeMonad(binding(), function(cont) {
        return prompt(String(msg()), function(input) {
          return cont(input);
        });
      });
    };
  });

  root.setTty = setTty;

}).call(this);
