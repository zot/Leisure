(function() {
  var Leisure, Monad, Notebook, Parse, RL, ReplCore, U, URI, URIHandler, arrayRest, baseHandler, codeMonad, concatList, defaultEnv, define, dotPat, eventCont, fs, getType, head, initFileSettings, isStorageUri, laz, leisureEvent, load, loadSource, loading, makeMonad, newUriHandler, nextMonad, nextMonadOld, output, parentPat, path, primRequire, primRequire2, r, read, readSourceFile, required, root, runMonad, runRequire, setTty, tail, throwError, tmpFalse, tryRead, tty, uriHandlerFor, uriHandlers, urlPat, values, write, _ref, _ref2,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  defaultEnv = {
    handleError: function handleError(err, cont) {
      return console.log(err.stack);
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.global = window;
    output = null;
    defaultEnv.write = function write(msg) {
      console.log(msg);
      if (!(output != null)) output = document.getElementById('output');
      if (output != null) {
        output.innerHTML += "<span>" + msg + "</span>";
        return output.lastChild.scrollIntoView();
      } else {
        return console.log(msg);
      }
    };
    defaultEnv.prompt = function prompt(msg, cont) {
      return cont(window.prompt(msg));
    };
    window.Prim = root = (_ref = window.Prim) != null ? _ref : {};
    Leisure = window.Leisure;
    Parse = window.Parse;
    Notebook = window.Notebook;
    ReplCore = window.ReplCore = (_ref2 = window.ReplCore) != null ? _ref2 : {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Parse = require('./parse');
    Leisure = require('./leisure');
    ReplCore = require('./replCore');
    U = require('util');
    RL = require('readline');
    tty = null;
    fs = require('fs');
    path = require('path');
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
      var result;
      if (!(file.match(/^\.\//))) file = "./" + file;
      result = require(file);
      if (cont) return cont(result);
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

  initFileSettings = function initFileSettings(env) {
    env.fileSettings = {
      parseFilters: {}
    };
    return env;
  };

  define('is', (function() {
    return function(value) {
      return function(type) {
        var _ref3;
        if (((_ref3 = value()) != null ? _ref3.type : void 0) === type().dataType) {
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
      var ast, err, rest, _ref3;
      _ref3 = Leisure.parseFull(value()), ast = _ref3[0], err = _ref3[1], rest = _ref3[2];
      if (err != null) {
        return _right()(laz("Error: " + err));
      } else if (rest != null ? rest.trim() : void 0) {
        return _right()(laz("Error, input left after parsing: '" + (rest.trim()) + "'"));
      } else {
        return _left()(laz(ast));
      }
    };
  });

  define('astStart', function() {
    return function(ast) {
      return ast().leisureStart;
    };
  });

  define('astEnd', function() {
    return function(ast) {
      return ast().leisureEnd;
    };
  });

  define('pretty', function() {
    return function(value) {
      return Parse.print(value());
    };
  });

  define('funcName', function() {
    return function(func) {
      if (func.leisureName != null) {
        return _some()(laz(func.leisureName));
      } else {
        return _none();
      }
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

  define('addParseFilter', (function() {
    return function(filter) {
      return makeMonad(function(env, cont) {
        Parse.defaultScanner.addFilter(filter());
        return cont(tmpFalse);
      });
    };
  }), 1);

  define('getParseFilterInfo', (function() {
    return makeMonad(function(env, cont) {
      return cont(Parse.defaultScanner.filterInfo);
    });
  }), 0);

  define('setParseFilterInfo', (function() {
    return function(info) {
      return makeMonad(function(env, cont) {
        Parse.defaultScanner.filterInfo = info();
        return cont(tmpFalse);
      });
    };
  }), 1);

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

  define('break', function() {
    return function(value) {
      console.log('breakpoint');
      return value();
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

  nextMonadOld = function nextMonadOld(cont) {
    var cell;
    eventCont.push(cell = [false, null, cont]);
    return function(value) {
      var cnt, ignore, val, _ref3;
      cell[0] = true;
      cell[1] = value;
      while (eventCont.length && eventCont[eventCont.length - 1][0]) {
        try {
          _ref3 = eventCont.pop(), ignore = _ref3[0], val = _ref3[1], cnt = _ref3[2];
          cnt(val);
        } catch (err) {
          console.log("ERROR RUNNING MONAD: " + err.stack);
        }
      }
      return null;
    };
  };

  nextMonad = function nextMonad(cont) {
    return cont;
  };

  runMonad = function runMonad(monad, env, cont) {
    try {
      if (monad.cmd != null) {
        return monad.cmd(env, nextMonad(cont));
      } else {
        return cont(monad);
      }
    } catch (err) {
      return console.log("ERROR RUNNING MONAD: " + err.stack);
    }
  };

  Monad = (function() {

    function Monad() {}

    Monad.prototype.andThen = function andThen(func) {
      var _this = this;
      return makeMonad(function(env, cont) {
        return runMonad(_this, env, function(value) {
          return runMonad(codeMonad(func), env, cont);
        });
      });
    };

    Monad.prototype.toString = function toString() {
      return "Monad: " + (this.cmd.toString());
    };

    return Monad;

  })();

  codeMonad = function codeMonad(code) {
    return makeMonad(function(env, cont) {
      var result;
      result = code(env);
      if (result instanceof Monad) {
        return runMonad(result, env, cont);
      } else {
        return cont(_false());
      }
    });
  };

  makeMonad = function makeMonad(guts) {
    var m;
    m = function m() {};
    m.__proto__ = Monad.prototype;
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

  define('dump', function() {
    return function(file) {
      return makeMonad(function(env, cont) {
        return fs.readFile(file(), function(err, data) {
          console.log((err != null ? err : data).toString());
          return cont();
        });
      });
    };
  });

  define('fdump', function() {
    return function(file) {
      return makeMonad(function(env, cont) {
        return Notebook.peer.value("peer/local-storage/public/storage" + (file()), null, false, function(_arg) {
          var data, x1, x2, x3, x4, x5;
          x1 = _arg[0], x2 = _arg[1], x3 = _arg[2], x4 = _arg[3], x5 = _arg[4], data = _arg[5];
          console.log(data.toString());
          return cont();
        });
      });
    };
  });

  isStorageUri = function isStorageUri(uri) {
    var _ref3, _ref4, _ref5;
    return _ref3 = uri.scheme, __indexOf.call((_ref4 = Notebook != null ? (_ref5 = Notebook.xusServer) != null ? _ref5.varStorage.values['leisure/storage'] : void 0 : void 0) != null ? _ref4 : [], _ref3) >= 0;
  };

  tryRead = function tryRead(endings, handler, uri, cont, err) {
    var newUri;
    if (!endings.length) {
      return err(new Error("No loadable file found for " + uri));
    } else {
      newUri = uri.relative("" + uri.path + "." + endings[0]);
      return handler.read(newUri, (function(data) {
        return cont(newUri, data);
      }), err, function() {
        return tryRead(endings.slice(1), handler, uri, cont, err);
      });
    }
  };

  readSourceFile = function readSourceFile(uri, cont, err) {
    var endings, m;
    if (m = uri.path.match(/$(.*\/[^/]*)\.([^/]*)$/)) {
      uri = m[1];
      endings = [m[2]];
    } else {
      endings = ['js', 'lmd', 'lsr'];
    }
    if (!required[uri.toString()]) {
      console.log("LOADING " + uri + "...");
      required[uri.toString()] = true;
      return tryRead(endings, uriHandlerFor(uri), uri, cont, err);
    } else {
      return cont(null);
    }
  };

  URIHandler = (function() {

    function URIHandler(label) {
      this.label = label;
    }

    URIHandler.prototype.read = function read(uri, cont, errHandler, next) {
      return errHandler(new Error("Read not currently supported for " + this.label + " uris"));
    };

    URIHandler.prototype.write = function write(uri, data, cont, errHandler) {
      return errHandler(new Error("Write not currently supported for " + this.label + " uris"));
    };

    return URIHandler;

  })();

  baseHandler = new URIHandler('base');

  uriHandlers = {};

  newUriHandler = function newUriHandler(label, obj) {
    obj.__proto__ = baseHandler;
    obj.label = label;
    return uriHandlers[label] = obj;
  };

  newUriHandler('err', {
    read: function read(uri, cont, errHandler, next) {
      return errHandler(new Error("No uri handler for " + uri.scheme + " uris"));
    },
    write: function write(uri, data, cont, errHandler) {
      return errHandler(new Error("No uri handler for " + uri.scheme + " uris"));
    }
  });

  newUriHandler('http', {
    read: function read(uri, cont, errHandler, next) {
      if (typeof window !== "undefined" && window !== null) {
        return jQuery.ajax(uri.toString(), {
          success: function success(data) {
            return cont(data);
          },
          error: function error() {
            return next();
          },
          dataType: 'text'
        });
      } else {
        return (http.get(uri.toString(), function(data) {
          return loadSource(uri, data, cont, errHandler);
        })).on('error', next);
      }
    }
  });

  newUriHandler('xus', {
    read: function read(uri, cont, err, next) {
      var f;
      f = "peer/" + uri.scheme + "/public/storage" + uri.path;
      return Notebook.peer.value(f, null, false, function(_arg) {
        var data, x1, x2, x3, x4, x5;
        x1 = _arg[0], x2 = _arg[1], x3 = _arg[2], x4 = _arg[3], x5 = _arg[4], data = _arg[5];
        if (data) {
          return cont(data);
        } else {
          return next();
        }
      });
    },
    write: function write(uri, data, cont, err, next) {
      return Notebook.peer.set("peer/" + uri.scheme + "/public/storage" + uri.path, data.toString());
    }
  });

  newUriHandler('file', {
    read: function read(uri, cont, err, next) {
      return fs.stat(uri.path, function(e) {
        if (e) {
          return next();
        } else {
          return fs.readFile(uri.path, function(e2, data) {
            if (e2) {
              return err(e2);
            } else {
              return cont(data);
            }
          });
        }
      });
    },
    write: function write(uri, data, cont, err) {
      var parent;
      parent = new URI("" + uri + "/..").path;
      return fs.stat(parent, function(e) {
        if (e) {
          return err(new Error("Parent directory of " + uri + " does not exist"));
        } else {
          return fs.writeFile(uri.path, data, function(e2) {
            if (e2) {
              return err(e2);
            } else {
              return cont();
            }
          });
        }
      });
    }
  });

  uriHandlerFor = function uriHandlerFor(uri) {
    var _ref3;
    if (isStorageUri(uri)) {
      return uriHandlers.xus;
    } else {
      return (_ref3 = uriHandlers[uri.scheme]) != null ? _ref3 : uriHandlers.err;
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    uriHandlers.file = new URIHandler('file');
  }

  loadSource = function loadSource(uri, data, cont, err) {
    try {
      if (uri.path.match(/\.lmd$|\.lsr$/)) {
        return ReplCore.compileString(uri.path, uri.path.match(/\.lmd$/), data, false, false, false, function() {
          return cont(null);
        });
      } else {
        return cont(eval("var module = {exports: {}};\n" + data + ";\nmodule.exports;"));
      }
    } catch (e) {
      console.log("ERROR EVALUATING SOURCE FOR " + uri + ": \n" + e.stack + "\n" + data);
      global.ERR = e;
      return err(e, cont);
    }
  };

  read = function read(uri, cont, err) {
    return uriHandlerFor(uri).read(uri, cont, err, function() {
      return err(new Error("File not found: " + uri));
    });
  };

  write = function write(uri, data, cont, err) {
    return uriHandlerFor(uri).write(uri, data, cont, err);
  };

  load = function load(uri, cont, err) {
    return readSourceFile(uri, (function(uri, data) {
      return loadSource(uri, data, cont, err);
    }), err);
  };

  primRequire = function primRequire() {
    return function(file) {
      return makeMonad(function(env, cont) {
        var fileSettings;
        fileSettings = env.fileSettings;
        initFileSettings(env);
        return env.require(file(), function(monad) {
          if (monad instanceof Monad) {
            return runMonad(monad, env, function() {
              env.fileSettings = fileSettings;
              return cont();
            });
          } else {
            env.fileSettings = fileSettings;
            return cont();
          }
        });
      });
    };
  };

  primRequire2 = function primRequire2() {
    return function(file) {
      return makeMonad(function(env, cont) {
        var fileSettings, newCont, uri;
        uri = env.fileSettings.uri.relative(file());
        fileSettings = env.fileSettings;
        initFileSettings(env);
        env.fileSettings.uri = uri;
        newCont = function newCont() {
          env.fileSettings = fileSettings;
          return cont();
        };
        return load(uri, (function(monad) {
          if (monad instanceof Monad) {
            return runMonad(monad, env, newCont);
          } else {
            return newCont();
          }
        }), function(err) {
          console.log("ERROR: " + err.stack);
          return env.fileSettings = fileSettings;
        });
      });
    };
  };

  define('require', primRequire2);

  urlPat = /^(([^:/]+):\/\/([^/]*))?(\/(.*?))?(\?.*?)?(#.*)?$/;

  dotPat = /\/\.(?=\/|$)/g;

  parentPat = /^\/\.\.|\/[^/]+?\/\.\./g;

  URI = (function() {

    function URI(src) {
      var match, _ref3, _ref4;
      if (match = src.match(urlPat)) {
        if (match[2]) {
          this.scheme = match[2].toLowerCase();
          this.host = match[3].toLowerCase();
        }
        this.path = match[5] ? this.normalize(((this.scheme ? '/' : '') + match[5]).replace(dotPat, '')) : '/';
        this.query = (_ref3 = match[6]) != null ? _ref3 : '';
        this.fragment = (_ref4 = match[7]) != null ? _ref4 : '';
      }
    }

    URI.prototype.normalize = function normalize(path) {
      var replaced;
      while (true) {
        replaced = false;
        path = path.replace(parentPat, function(match) {
          replaced = true;
          return '';
        });
        if (!replaced) break;
      }
      return path;
    };

    URI.prototype.relative = function relative(path) {
      var u;
      u = new URI(path);
      if (u.scheme) {
        return u;
      } else {
        return new URI((this.scheme ? "" + this.scheme + "://" + this.host : '') + (path.match(/^\//) ? path : this.path.match(/\/$/) ? "" + this.path + path : "" + this.path + "/../" + path));
      }
    };

    URI.prototype.toString = function toString() {
      return (this.scheme ? "" + this.scheme + "://" + this.host : "") + this.path;
    };

    return URI;

  })();

  required = {};

  loading = function loading(file) {
    var _ref3;
    file = file.replace(/^(.*?)(\.lsr|\.lmd|)$/, '$1');
    if (defaultEnv != null ? (_ref3 = defaultEnv.fileSettings) != null ? _ref3.uri : void 0 : void 0) {
      return required[defaultEnv.fileSettings.uri.relative(file).toString()] = true;
    }
  };

  runRequire = function runRequire(file, cont) {
    var m;
    if (!required["file://" + file]) {
      required["file://" + file] = true;
      m = require(file);
      if (!(m instanceof Monad)) {
        console.log("REQUIRE " + file + " WARNING: RESULT IS NOT A MONAD");
      }
      return runMonad(m, defaultEnv, function() {
        return (cont != null ? cont : function() {})();
      });
    } else {
      return (cont != null ? cont : function() {})();
    }
  };

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
          var _ref3;
          return cont((_ref3 = values[name()]) != null ? _ref3 : defaultValue());
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

  define('read', function() {
    return function(uri) {
      return makeMonad(function(env, cont) {
        return read(new URI(uri()), (function(data) {
          return cont(_left()(laz(data.toString())));
        }), function(err) {
          return cont(_right()(laz(err.stack.toString())));
        });
      });
    };
  });

  define('write', function() {
    return function(uri) {
      return function(data) {
        return makeMonad(function(env, cont) {
          return write(new URI(uri()), data(), (function() {
            return cont(_left()(laz("success")));
          }), function(err) {
            return cont(_right()(laz(err.stack.toString())));
          });
        });
      };
    };
  });

  define('svgMeasureText', (function() {
    return function(text) {
      return Notebook != null ? Notebook.svgMeasureText(text) : void 0;
    };
  }), 2);

  define('primSvgMeasure', (function() {
    return function(content) {
      return Notebook != null ? Notebook.svgMeasure(content) : void 0;
    };
  }), 1);

  initFileSettings(defaultEnv);

  root.setTty = setTty;

  root.runMonad = runMonad;

  root.makeMonad = makeMonad;

  root.tokenDefs = [];

  root.leisureEvent = leisureEvent;

  root.defaultEnv = defaultEnv;

  root.codeMonad = codeMonad;

  root.runRequire = runRequire;

  root.loading = loading;

  root.initFileSettings = initFileSettings;

  root.URI = URI;

  root.Monad = Monad;

  root.newUriHandler = newUriHandler;

  if (typeof window !== "undefined" && window !== null) {
    window.leisureEvent = leisureEvent;
  }

}).call(this);
