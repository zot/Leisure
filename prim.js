(function() {
  var Leisure, Parse, RL, U, arrayRest, concatList, continueMonad, defaultEnv, define, eventCont, getType, head, laz, leisureEvent, makeMonad, output, r, root, runMonad, setTty, tail, throwError, tmpFalse, tty, values;

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
    Parse = window.Parse;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Parse = require('./parse');
    Leisure = require('./leisure');
    U = require('util');
    RL = require('readline');
    tty = null;
    defaultEnv.write = function write(msg) {
      return process.stdout.write(msg);
    };
    defaultEnv.prompt = function prompt(msg, cont) {
      return tty.question(msg, function() {
        try {
          return cont();
        } catch (err) {
          return console.log("ERROR PRINTING VALUE: " + err.stack);
        }
      });
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

  define = Parse.define;

  getType = Parse.getType;

  throwError = Parse.throwError;

  laz = Leisure.laz;

  define('is', (function() {
    return function(value) {
      return function(type) {
        var _ref;
        if (((_ref = value()) != null ? _ref.type : void 0) === type().dataType) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  }), 2);

  define('isFunc', function() {
    return function(value) {
      if (typeof value() === 'function') {
        return _true();
      } else {
        return _false();
      }
    };
  });

  define('eq', (function() {
    return function(a) {
      return function(b) {
        if (a() === b()) {
          return _true();
        } else {
          return  _false();
        }
      };
    };
  }), 2);

  define('getType', function() {
    return function(value) {
      var type;
      if (type = getType(value())) {
        return _some()(function() {
          return type;
        });
      } else {
        return _none();
      }
    };
  });

  define('parse', function() {
    return function(value) {
      var ast, err, rest, _ref;
      _ref = Leisure.parseFull(value()), ast = _ref[0], err = _ref[1], rest = _ref[2];
      if (err != null) {
        return _right()(laz("Error: " + err));
      } else if (rest != null ? rest.trim() : void 0) {
        return _right()(laz("Error, input left after parsing: '" + (rest.trim()) + "'"));
      } else {
        return _left()(laz(ast));
      }
    };
  });

  define('ast-start', function() {
    return function(ast) {
      return ast().leisureStart;
    };
  });

  define('ast-end', function() {
    return function(ast) {
      return ast().leisureEnd;
    };
  });

  define('pretty', function() {
    return function(value) {
      return Parse.print(value());
    };
  });

  define('funcSource', function() {
    return function(func) {
      var f;
      f = func();
      if (f.src != null) {
        return _some()(laz(f.src));
      } else {
        return _none();
      }
    };
  });

  define('error', (function() {
    return function(str) {
      throw new Error(str());
    };
  }), 1);

  tmpFalse = function tmpFalse(a) {
    return function(b) {
      return b();
    };
  };

  define('defToken', function() {
    return function(token) {
      return makeMonad(function(env, cont) {
        Parse.defToken(token());
        return cont(tmpFalse);
      });
    };
  });

  define('defGroup', function() {
    return function(open) {
      return function(close) {
        return makeMonad(function(env, cont) {
          Parse.defGroup(open(), close());
          return cont(tmpFalse);
        });
      };
    };
  });

  define('+', function() {
    return function(a) {
      return function(b) {
        return a() + b();
      };
    };
  });

  define('-', function() {
    return function(a) {
      return function(b) {
        return a() - b();
      };
    };
  });

  define('*', function() {
    return function(a) {
      return function(b) {
        return a() * b();
      };
    };
  });

  define('/', function() {
    return function(a) {
      return function(b) {
        return a() / b();
      };
    };
  });

  define('%', function() {
    return function(a) {
      return function(b) {
        return a() % b();
      };
    };
  });

  define('floor', function() {
    return function(a) {
      return Math.floor(a());
    };
  });

  define('ceil', function() {
    return function(a) {
      return Math.ceil(a());
    };
  });

  define('round', function() {
    return function(a) {
      return Math.round(a());
    };
  });

  define('randInt', function() {
    return function(from) {
      return function(to) {
        return makeMonad(function(env, cont) {
          return cont(Math.floor(from() + Math.random() * (to() - from() + 1)));
        });
      };
    };
  });

  define('rand', function() {
    return makeMonad(function(env, cont) {
      return cont(Math.random());
    });
  });

  define('>', function() {
    return function(a) {
      return function(b) {
        if (a() > b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('<', function() {
    return function(a) {
      return function(b) {
        if (a() < b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('gt', function() {
    return function(a) {
      return function(b) {
        if (a() > b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('gte', function() {
    return function(a) {
      return function(b) {
        if (a() >= b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('lt', function() {
    return function(a) {
      return function(b) {
        if (a() < b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('lte', function() {
    return function(a) {
      return function(b) {
        if (a() <= b()) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  });

  define('strlen', function() {
    return function(a) {
      return a().length;
    };
  });

  define('log', function() {
    return function(msg) {
      return function(value) {
        if (msg().type !== 'cons') {
          defaultEnv.write("" + (msg()));
        } else {
          defaultEnv.write(concatList(msg()));
        }
        defaultEnv.write("\n");
        return value();
      };
    };
  });

  leisureEvent = function leisureEvent(leisureFuncName, evt, env, channel) {
    var currentEvent, monad;
    currentEvent = evt;
    monad = Leisure.eval("" + (Parse.nameSub(leisureFuncName)) + "()")(laz(evt));
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
        try {
          _ref = eventCont.shift(), ignore = _ref[0], val = _ref[1], cnt = _ref[2];
          _results.push(cnt(val));
        } catch (err) {
          _results.push(console.log("ERROR RUNNING MONAD: " + err.stack));
        }
      }
      return _results;
    };
  };

  runMonad = function runMonad(monad, env, cont) {
    try {
      if (monad.cmd != null) {
        return monad.cmd(env, continueMonad(cont));
      } else {
        return cont(monad);
      }
    } catch (err) {
      return console.log("ERROR RUNNING MONAD: " + err.stack);
    }
  };

  makeMonad = function makeMonad(guts) {
    var m;
    m = function m() {};
    m.cmd = guts;
    m.type = 'monad';
    return m;
  };

  define('eventContext', function() {
    return function(evt) {
      return evt().leisureContext;
    };
  });

  define('eventType', function() {
    return function(evt) {
      return evt().type;
    };
  });

  define('eventX', function() {
    return function(evt) {
      return evt().x;
    };
  });

  define('eventY', function() {
    return function(evt) {
      return evt().y;
    };
  });

  define('eventTargetId', function() {
    return function(evt) {
      return evt().target.id;
    };
  });

  define('eventKeyCode', function() {
    return function(evt) {
      var e;
      e = evt();
      return e.charCode || e.keyCode || e.which;
    };
  });

  define('eventPreventDefault', function() {
    return function(evt) {
      return makeMonad(function(env, cont) {
        evt().preventDefault();
        return cont(_false());
      });
    };
  });

  define('forward', function() {
    return function(name) {
      return makeMonad(function(env, cont) {
        Leisure.defineForward(name);
        return cont(_false());
      });
    };
  });

  define('return', function() {
    return function(v) {
      return makeMonad(function(env, cont) {
        return cont(v());
      });
    };
  });

  define('require', function() {
    return function(file) {
      return makeMonad(function(env, cont) {
        return env.require(file(), cont);
      });
    };
  });

  define('print', function() {
    return function(msg) {
      return makeMonad(function(env, cont) {
        var m;
        m = msg();
        env.write("" + (typeof m === 'string' ? m : Parse.print(m)) + "\n");
        return cont(_false());
      });
    };
  });

  define('printValue', function() {
    return function(value) {
      return makeMonad(function(env, cont) {
        if (value() !== _nil()) env.write("" + (env.presentValue(value())) + "\n");
        return cont(_false());
      });
    };
  });

  define('prompt', function() {
    return function(msg) {
      return makeMonad(function(env, cont) {
        return env.prompt(String(msg()), function(input) {
          return cont(input);
        });
      });
    };
  });

  define('bind', function() {
    return function(m) {
      return function(binding) {
        return makeMonad(function(env, cont) {
          return runMonad(m(), env, function(value) {
            return runMonad(binding()(function() {
              return value;
            }), env, cont);
          });
        });
      };
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
    } else if (typeof (head(l)) === 'string') {
      return (head(l)) + concatList(tail(l));
    } else {
      return Parse.print(head(l)) + concatList(tail(l));
    }
  };

  define('concat', function() {
    return function(l) {
      return concatList(l());
    };
  });

  define('js', function() {
    return function(codeList) {
      return makeMonad(function(env, cont) {
        var cl;
        cl = codeList();
        if (cl !== _nil() && cl.type !== 'cons') {
          throwError("js expects a list for its code");
        }
        return cont(eval(concatList(cl)));
      });
    };
  });

  define('arrayLength', function() {
    return function(array) {
      return array().length;
    };
  });

  define('arrayElements', function() {
    return function(array) {
      return function(f) {
        return arrayRest(array(), 0, f());
      };
    };
  });

  arrayRest = function arrayRest(array, index, f) {
    if (index < array.length) {
      return arrayRest(array, index + 1, f(laz(array[index])));
    } else {
      return f;
    }
  };

  define('browser', function() {
    return function(codeList) {
      return makeMonad(function(env, cont) {
        var cl;
        if (typeof window !== "undefined" && window !== null) {
          cl = codeList();
          if (cl !== _nil() && cl.type !== 'cons') {
            throwError("js expects a list for its code");
          }
          return cont(eval(concatList(cl)));
        } else {
          return cont(null);
        }
      });
    };
  });

  global.LeisureValues = values = {};

  define('hasValue', function() {
    return function(name) {
      return makeMonad(function(env, cont) {
        return cont((values[name()] != null ? _true() : _false()));
      });
    };
  });

  define('getValueOr', function() {
    return function(name) {
      return function(defaultValue) {
        return makeMonad(function(env, cont) {
          var _ref;
          return cont((_ref = values[name()]) != null ? _ref : defaultValue());
        });
      };
    };
  });

  define('getValue', function() {
    return function(name) {
      return makeMonad(function(env, cont) {
        return cont(values[name()]);
      });
    };
  });

  define('setValue', function() {
    return function(name) {
      return function(value) {
        return makeMonad(function(env, cont) {
          values[name()] = value();
          return cont(_false());
        });
      };
    };
  });

  define('createS', function() {
    return makeMonad(function(env, cont) {
      return cont({
        value: null
      });
    });
  });

  define('getS', function() {
    return function(state) {
      return makeMonad(function(env, cont) {
        return cont(state().value);
      });
    };
  });

  define('setS', function() {
    return function(state) {
      return function(value) {
        return makeMonad(function(env, cont) {
          state().value = value();
          return cont(_false());
        });
      };
    };
  });

  define('svgMeasureText', (function() {
    return function(text) {
      return typeof Notebook !== "undefined" && Notebook !== null ? Notebook.svgMeasureText(text) : void 0;
    };
  }), 2);

  define('primSvgMeasure', (function() {
    return function(content) {
      return typeof Notebook !== "undefined" && Notebook !== null ? Notebook.svgMeasure(content) : void 0;
    };
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
