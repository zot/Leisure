(function() {
  var Leisure, Pretty, RL, U, arrayRest, concatList, continueMonad, defaultEnv, define, eventCont, getType, head, laz, leisureEvent, makeMonad, output, r, root, runMonad, setTty, tail, tty, values;

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

  define('is', (function(value) {
    return function(type) {
      var _ref;
      if (((_ref = value()) != null ? _ref.type : void 0) === type().dataType) {
        return _true();
      } else {
        return _false();
      }
    };
  }), 2);

  define('eq', (function(a) {
    return function(b) {
      if (a() === b()) {
        return _true();
      } else {
        return  _false();
      }
    };
  }), 2);

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
    if (!Pretty) Pretty = window.Pretty;
    return Pretty.print(value());
  });

  define('funcSource', function(func) {
    var f;
    f = func();
    if (f.src != null) {
      return _some()(laz(f.src));
    } else {
      return _none();
    }
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
      return makeMonad(function(env, cont) {
        return cont(Math.floor(from() + Math.random() * (to() - from() + 1)));
      });
    };
  });

  define('rand', function() {
    return makeMonad(function(env, cont) {
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

  leisureEvent = function leisureEvent(leisureFuncName, evt, env, channel) {
    var currentEvent, monad;
    currentEvent = evt;
    monad = Leisure.eval("" + (Leisure.nameSub(leisureFuncName)) + "()")(laz(evt));
    return runMonad(monad, env != null ? env : defaultEnv, function() {
      return (env != null ? env : defaultEnv).finishedEvent(evt, channel);
    });
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
    if (monad.cmd != null) {
      return monad.cmd(env, continueMonad(cont));
    } else {
      return cont(monad);
    }
  };

  makeMonad = function makeMonad(guts) {
    var m;
    m = function m() {};
    m.cmd = guts;
    m.type = 'monad';
    return m;
  };

  define('eventContext', function(evt) {
    return evt().leisureContext;
  });

  define('eventType', function(evt) {
    return evt().type;
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

  define('eventKeyCode', function(evt) {
    var e;
    e = evt();
    return e.charCode || e.keyCode || e.which;
  });

  define('eventPreventDefault', function(evt) {
    return makeMonad(function(env, cont) {
      evt().preventDefault();
      return cont(_false());
    });
  });

  define('return', function(v) {
    return makeMonad(function(env, cont) {
      return cont(v());
    });
  });

  define('require', function(file) {
    return makeMonad(function(env, cont) {
      return env.require(file(), cont);
    });
  });

  define('print', function(msg) {
    return makeMonad(function(env, cont) {
      if (msg() !== _nil()) env.write("" + (msg()) + "\n");
      return cont(_false());
    });
  });

  define('prompt', function(msg) {
    return makeMonad(function(env, cont) {
      return env.prompt(String(msg()), function(input) {
        return cont(input);
      });
    });
  });

  define('bind', function(m) {
    return function(binding) {
      return makeMonad(function(env, cont) {
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
    return makeMonad(function(env, cont) {
      var cl;
      cl = codeList();
      if (cl !== _nil() && cl.type !== 'cons') {
        throw new Error("js expects a list for its code");
      }
      return cont(eval(concatList(cl)));
    });
  });

  define('arrayLength', function(array) {
    return array().length;
  });

  define('arrayElements', function(array) {
    return function(f) {
      return arrayRest(array(), 0, f());
    };
  });

  arrayRest = function arrayRest(array, index, f) {
    if (index < array.length) {
      return arrayRest(array, index + 1, f(laz(array[index])));
    } else {
      return f;
    }
  };

  define('browser', function(codeList) {
    return makeMonad(function(env, cont) {
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
    return makeMonad(function(env, cont) {
      return cont(values[name()]);
    });
  });

  define('setValue', function(name) {
    return function(value) {
      return makeMonad(function(env, cont) {
        values[name()] = value();
        return cont(_false);
      });
    };
  });

  define('createS', function() {
    return makeMonad(function(env, cont) {
      return cont({
        value: null
      });
    });
  });

  define('getS', function(state) {
    return makeMonad(function(env, cont) {
      return cont(state().value);
    });
  });

  define('setS', function(state) {
    return function(value) {
      return makeMonad(function(env, cont) {
        state().value = value();
        return cont(_false);
      });
    };
  });

  define('poop', 3);

  define('svg-measure-text', (function(text) {
    return typeof Notebook !== "undefined" && Notebook !== null ? Notebook.svgMeasureText(text) : void 0;
  }), 2);

  define('prim-svg-measure', (function(content) {
    return typeof Notebook !== "undefined" && Notebook !== null ? Notebook.svgMeasure(content) : void 0;
  }), 1);

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
