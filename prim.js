(function() {
  var Leisure, Pretty, RL, U, concatList, define, eventCmds, getType, head, laz, leisureEvent, makeMonad, output, prompt, root, runMonad, runMonads, running, setTty, tail, tty, values, write;

  if (typeof window !== "undefined" && window !== null) {
    window.global = window;
    output = null;
    write = function write(msg) {
      if (!(output != null)) output = document.getElementById('output');
      output.innerHTML += "<span>" + msg + "</span>";
      return output.lastChild.scrollIntoView();
    };
    prompt = function prompt(msg, cont) {
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
    var ast, err, prepped, rest, _ref, _ref2;
    _ref = Leisure.prepare(String(value())), prepped = _ref[0], err = _ref[1];
    if (err != null) {
      return _right()(laz("Error: " + err));
    } else {
      _ref2 = Leisure.parseFull(prepped), ast = _ref2[0], err = _ref2[1], rest = _ref2[2];
      if (err != null) {
        return _right()(laz("Error: " + err));
      } else if (rest != null ? rest.trim() : void 0) {
        return _right()(laz("Error, input left after parsing: '" + (rest.trim()) + "'"));
      } else {
        return _left()(laz(ast));
      }
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
      return makeMonad('end', function(cont) {
        return cont(Math.floor(from() + Math.random() * (to() - from() + 1)));
      });
    };
  });

  define('rand', function() {
    return makeMonad('end', function(cont) {
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

  eventCmds = [];

  running = false;

  leisureEvent = function leisureEvent(leisureFuncName, evt) {
    var currentEvent, monad;
    currentEvent = evt;
    monad = Leisure.eval("" + (Leisure.nameSub(leisureFuncName)) + "()")(laz(evt));
    return runMonad(monad, function() {});
  };

  runMonad = function runMonad(monad, cont) {
    eventCmds.push(function() {
      return runMonads(monad, function(value) {
        if (eventCmds.length) eventCmds.shift()();
        running = false;
        return cont(value);
      });
    });
    if (!running && eventCmds.length) {
      running = true;
      return eventCmds.shift()();
    }
  };

  runMonads = function runMonads(monad, cont) {
    if ((monad != null ? monad.cmd : void 0) != null) {
      return monad.cmd(function(value) {
        if (monad.binding != null) {
          return runMonads(monad.binding(function() {
            return value;
          }), cont);
        } else {
          return cont(value);
        }
      });
    } else {
      throw new Error("Attempted to run something that's not a monad");
    }
  };

  makeMonad = function makeMonad(binding, guts) {
    var m;
    m = function m() {};
    m.cmd = guts;
    m.type = 'monad';
    if (binding !== "end") m.binding = binding;
    return m;
  };

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
    return makeMonad('end', function(cont) {
      return cont(v());
    });
  });

  define('log', function(msg) {
    return function(value) {
      if (msg().type !== 'cons') {
        write("" + (msg()));
      } else {
        write(concatList(msg()));
      }
      write("\n");
      return value();
    };
  });

  define('print', function(msg) {
    return makeMonad('end', function(cont) {
      if (msg() !== _nil()) write("" + (msg()) + "\n");
      return cont(_false);
    });
  });

  define('prompt', function(msg) {
    return makeMonad('end', function(cont) {
      return prompt(String(msg()), function(input) {
        return cont(input);
      });
    });
  });

  define('bind', function(m) {
    return function(binding) {
      return makeMonad(binding(), function(cont) {
        return runMonads(m(), cont);
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
    return makeMonad('end', function(cont) {
      var cl;
      cl = codeList();
      if (cl !== _nil() && cl.type !== 'cons') {
        throw new Error("js expects a list for its code");
      }
      return cont(eval(concatList(cl)));
    });
  });

  define('browser', function(codeList) {
    return makeMonad('end', function(cont) {
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
    return makeMonad('end', function(cont) {
      return cont(values[name()]);
    });
  });

  define('setValue', function(name) {
    return function(value) {
      return makeMonad('end', function(cont) {
        values[name()] = value();
        return cont(_false);
      });
    };
  });

  define('createS', function() {
    return makeMonad('end', function(cont) {
      return cont({
        value: null
      });
    });
  });

  define('getS', function(state) {
    return makeMonad('end', function(cont) {
      return cont(state().value);
    });
  });

  define('setS', function(state) {
    return function(value) {
      return makeMonad('end', function(cont) {
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

  if (typeof window !== "undefined" && window !== null) {
    window.leisureEvent = leisureEvent;
  }

}).call(this);
