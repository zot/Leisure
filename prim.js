(function() {
  var Leisure, Pretty, RL, U, concatList, continueMonad, defaultEnv, define, eventCont, getType, head, laz, leisureEvent, makeMonad, output, r, root, runMonad, setTty, tail, tty, values;

  defaultEnv = {};

  if (typeof window !== "undefined" && window !== null) {
    window.global = window;
    output = null;
    defaultEnv.write = function write(msg) {
      if (!(output != null)) output = document.getElementById('output');
      if (output != null) {
        output.innerHTML += "<span>" + msg + "</span>";
        return output.lastChild.scrollIntoView();
      }
    };
    defaultEnv.prompt = function prompt(msg, cont) {
      return cont(window.prompt(msg));
    };
    window.Prim = root = {};
    Leisure = window.Leisure;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Leisure = require('./leisure');
    Pretty = require('./pretty');
    U = require('util');
    RL = require('readline');
    tty = null;
    defaultEnv.write = function write(msg) {
      return process.stdout.write(msg);
    };
    defaultEnv.prompt = function prompt(msg, cont) {
      return tty.question(msg, cont);
    };
    r = function r(file, cont) {
      if (!(file.match(/^\.\//))) file = "./" + file;
      Leisure.req(file);
      return cont(_false());
    };
    defaultEnv.require = r;
  }

  setTty = function setTty(rl) {
    return tty = rl;
  };

  define = Leisure.define;

  getType = Leisure.getType;

  laz = Leisure.laz;

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

  define('getType', function(value) {
    var type;
    if (type = getType(value())) {
      return _some()(function() {
        return type;
      });
    } else {
      return _none();
    }
  });

  define('parse', function(value) {
    var ast, err, rest, _ref;
    _ref = Leisure.parseFull(value()), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err != null) {
      return _right()(laz("Error: " + err));
    } else if (rest != null ? rest.trim() : void 0) {
      return _right()(laz("Error, input left after parsing: '" + (rest.trim()) + "'"));
    } else {
      return _left()(laz(ast));
    }
  });

  define('pretty', function(value) {
    return Pretty.print(value());
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

  define('floor', function(a) {
    return Math.floor(a());
  });

  define('ceil', function(a) {
    return Math.ceil(a());
  });

  define('round', function(a) {
    return Math.round(a());
  });

  define('randInt', function(from) {
    return function(to) {
      return makeMonad('end', function(env, cont) {
        return cont(Math.floor(from() + Math.random() * (to() - from() + 1)));
      });
    };
  });

  define('rand', function() {
    return makeMonad('end', function(env, cont) {
      return cont(Math.random());
    });
  });

  define('>', function(a) {
    return function(b) {
      if (a() > b()) {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('<', function(a) {
    return function(b) {
      if (a() < b()) {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('gt', function(a) {
    return function(b) {
      if (a() > b()) {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('gte', function(a) {
    return function(b) {
      if (a() >= b()) {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('lt', function(a) {
    return function(b) {
      if (a() < b()) {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('lte', function(a) {
    return function(b) {
      if (a() <= b()) {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('log', function(msg) {
    return function(value) {
      if (msg().type !== 'cons') {
        defaultEnv.write("" + (msg()));
      } else {
        defaultEnv.write(concatList(msg()));
      }
      defaultEnv.write("\n");
      return value();
    };
  });

  leisureEvent = function leisureEvent(leisureFuncName, evt, env) {
    var currentEvent, monad;
    currentEvent = evt;
    monad = Leisure.eval("" + (Leisure.nameSub(leisureFuncName)) + "()")(laz(evt));
    return runMonad(monad, env != null ? env : defaultEnv, function() {});
  };

  eventCont = [];

  continueMonad = function continueMonad(cont) {
    var cell;
    eventCont.unshift(cell = [false, null, cont]);
    return function(value) {
      var cnt, ignore, val, _ref, _results;
      cell[0] = true;
      cell[1] = value;
      _results = [];
      while (eventCont.length && eventCont[0][0]) {
        _ref = eventCont.shift(), ignore = _ref[0], val = _ref[1], cnt = _ref[2];
        _results.push(cnt(val));
      }
      return _results;
    };
  };

  runMonad = function runMonad(monad, env, cont) {
    return monad.cmd(env, continueMonad(cont));
  };

  makeMonad = function makeMonad(binding, guts) {
    var m;
    m = function m() {};
    m.cmd = guts;
    m.type = 'monad';
    if (binding !== "end") m.binding = binding;
    return m;
  };

  define('eventContext', function(evt) {
    return evt().leisureContext;
  });

  define('eventX', function(evt) {
    return evt().x;
  });

  define('eventY', function(evt) {
    return evt().y;
  });

  define('eventTargetId', function(evt) {
    return evt().target.id;
  });

  define('return', function(v) {
    return makeMonad('end', function(env, cont) {
      return cont(v());
    });
  });

  define('require', function(file) {
    return makeMonad('end', function(env, cont) {
      return env.require(file(), cont);
    });
  });

  define('print', function(msg) {
    return makeMonad('end', function(env, cont) {
      if (msg() !== _nil()) env.write("" + (msg()) + "\n");
      return cont(_false());
    });
  });

  define('prompt', function(msg) {
    return makeMonad('end', function(env, cont) {
      return env.prompt(String(msg()), function(input) {
        return cont(input);
      });
    });
  });

  define('bind', function(m) {
    return function(binding) {
      return makeMonad('end', function(env, cont) {
        return runMonad(m(), env, function(value) {
          return runMonad(binding()(function() {
            return value;
          }), env, cont);
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
    return makeMonad('end', function(env, cont) {
      var cl;
      cl = codeList();
      if (cl !== _nil() && cl.type !== 'cons') {
        throw new Error("js expects a list for its code");
      }
      return cont(eval(concatList(cl)));
    });
  });

  define('browser', function(codeList) {
    return makeMonad('end', function(env, cont) {
      var cl;
      if (typeof window !== "undefined" && window !== null) {
        cl = codeList();
        if (cl !== _nil() && cl.type !== 'cons') {
          throw new Error("js expects a list for its code");
        }
        return cont(eval(concatList(cl)));
      } else {
        return cont(null);
      }
    });
  });

  values = {};

  define('getValue', function(name) {
    return makeMonad('end', function(env, cont) {
      return cont(values[name()]);
    });
  });

  define('setValue', function(name) {
    return function(value) {
      return makeMonad('end', function(env, cont) {
        values[name()] = value();
        return cont(_false);
      });
    };
  });

  define('createS', function() {
    return makeMonad('end', function(env, cont) {
      return cont({
        value: null
      });
    });
  });

  define('getS', function(state) {
    return makeMonad('end', function(env, cont) {
      return cont(state().value);
    });
  });

  define('setS', function(state) {
    return function(value) {
      return makeMonad('end', function(env, cont) {
        state().value = value();
        return cont(_false);
      });
    };
  });

  root.setTty = setTty;

  root.runMonad = runMonad;

  root.makeMonad = makeMonad;

  root.tokenDefs = [];

  root.leisureEvent = leisureEvent;

  root.defaultEnv = defaultEnv;

  if (typeof window !== "undefined" && window !== null) {
    window.leisureEvent = leisureEvent;
  }

}).call(this);
