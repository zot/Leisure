(function() {
  var Lazp, RL, U, concatList, define, getType, head, makeMonad, output, prompt, root, runMonad, setTty, tail, tty, write;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    Lazp = window.Lazp;
    output = null;
    write = function write(msg) {
      if (!(output != null)) output = document.getElementById('output');
      return output.innerHTML += "" + msg;
    };
    prompt = function prompt(msg, cont) {
      return cont(window.prompt(msg));
    };
    root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Lazp = require('./lazp');
    U = require('util');
    RL = require('readline');
    tty = null;
    write = function write(msg) {
      return process.stdout.write(msg);
    };
    prompt = function prompt(msg, cont) {
      return tty.question(msg, cont);
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

  runMonad = function runMonad(monad, cont) {
    return monad.cmd(function(value) {
      if (monad.binding != null) {
        return runMonad(monad.binding(function() {
          return value;
        }), cont);
      } else {
        return cont(value);
      }
    });
  };

  makeMonad = function makeMonad(binding, guts) {
    var m;
    m = function m() {};
    m.cmd = guts;
    m.type = 'monad';
    if (binding !== "end") m.binding = binding;
    return m;
  };

  define('end', "end");

  define('bind', function(m) {
    return function(binding) {
      return makeMonad(binding(), function(cont) {
        return runMonad(m(), cont);
      });
    };
  });

  define('return', function(v) {
    return function(binding) {
      return makeMonad(binding(), function(cont) {
        return cont(v());
      });
    };
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

  head = function head(l) {
    return l(function() {
      return function(hh) {
        return function(tt) {
          return hh();
        };
      };
    });
  };

  tail = function tail(l) {
    return l(function() {
      return function(hh) {
        return function(tt) {
          return tt();
        };
      };
    });
  };

  concatList = function concatList(l) {
    if (l === _nil()) {
      return "";
    } else {
      return (head(l)) + concatList(tail(l));
    }
  };

  define('concat', function(l) {
    return concatList(l());
  });

  define('js', function(codeList) {
    return function(binding) {
      return makeMonad(binding(), function(cont) {
        var cl;
        cl = codeList();
        if (cl !== _nil() && cl.type !== 'cons') {
          throw new Error("js expects a list for its code");
        }
        return cont(eval(concatList(cl)));
      });
    };
  });

  root.setTty = setTty;

  root.runMonad = runMonad;

}).call(this);
