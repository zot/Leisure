(function() {
  var Lazp, Pretty, RL, U, addCmd, concatList, define, eventCmds, getType, head, laz, lazpEvent, makeMonad, output, prompt, root, runMonad, runMonads, running, setTty, tail, tty, write;

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
    Lazp = window.Lazp;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Lazp = require('./lazp');
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

  define = Lazp.define;

  getType = Lazp.getType;

  laz = Lazp.laz;

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
    _ref = Lazp.prepare(String(value())), prepped = _ref[0], err = _ref[1];
    if (err != null) {
      return _right()(laz("Error: " + err));
    } else {
      _ref2 = Lazp.parseFull(prepped), ast = _ref2[0], err = _ref2[1], rest = _ref2[2];
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

  /*
  define '++', (a)->a() + 1
  define '--', (a)->a() - 1
  define 'iszero', (a)-> if 0 == a() then `_true()` else` _false()`
  
  define 'randInt', (from)->(to)-> Math.floor(Math.random() * (to() - from() + 1)) + from();
  */

  eventCmds = [];

  running = false;

  lazpEvent = function lazpEvent(lazpFuncName) {
    alert("adding event: " + lazpFuncName);
    return runMonad(Lazp.eval("" + (Lazp.nameSub(lazpFuncName)) + "()"), function() {});
  };

  addCmd = function addCmd(cmd) {};

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
    return monad.cmd(function(value) {
      if (monad.binding != null) {
        return runMonads(monad.binding(function() {
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

  define('event', function(v) {
    return makeMonad('end', function(cont) {
      return cont(event);
    });
  });

  define('eventX', function(evt) {
    return evt().x;
  });

  define('eventY', function(evt) {
    return evt().y;
  });

  define('return', function(v) {
    return makeMonad('end', function(cont) {
      return cont(v());
    });
  });

  define('print', function(msg) {
    return makeMonad('end', function(cont) {
      write("" + (msg()) + "\n");
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

  root.lazpEvent = lazpEvent;

  if (typeof window !== "undefined" && window !== null) {
    window.lazpEvent = lazpEvent;
  }

}).call(this);
