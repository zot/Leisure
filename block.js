var block = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  block = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Leisure = require('./leisure');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

setType = Leisure.setType;
var setDataType = Leisure.setDataType;
var define = Leisure.define;
var defineMacro = Leisure.defineMacro;
var defineToken = Leisure.defineToken;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var Nil = Leisure.Nil;
var cons = Leisure.cons;
var _LEFT_ARROW, _UP_ARROW, _RIGHT_ARROW, _DOWN_ARROW, _startBlocky, _runPhysics, _key, _down, _up, _jsPD;
//LEFT_ARROW = AST(37)
root.defs._LEFT_ARROW = _LEFT_ARROW = Leisure.define('LEFT_ARROW', (37), 0, "37");
;
//UP_ARROW = AST(38)
root.defs._UP_ARROW = _UP_ARROW = Leisure.define('UP_ARROW', (38), 0, "38");
;
//RIGHT_ARROW = AST(39)
root.defs._RIGHT_ARROW = _RIGHT_ARROW = Leisure.define('RIGHT_ARROW', (39), 0, "39");
;
//DOWN_ARROW = AST(40)
root.defs._DOWN_ARROW = _DOWN_ARROW = Leisure.define('DOWN_ARROW', (40), 0, "40");
;
//startBlocky = AST(\e . bind startPhysics \_ . runPhysics)
root.defs._startBlocky = _startBlocky = Leisure.define('startBlocky', (function(_e){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_startBlocky', 5), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_startBlocky', 2), ctx);
    return _bind()(_startPhysics);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_startBlocky', 4), ctx);
      return $m || ($m = (function(__){return _runPhysics();}));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();}), 1, "\\e. do\n  startPhysics\n  runPhysics");
;
//runPhysics = AST(bind (js ([ Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3))) ])) \_ . bind stepPhysics \_ . bind (js ([ Notebook.update("app") ])) \_ . runPhysics)
root.defs._runPhysics = _runPhysics = Leisure.define('runPhysics', ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 27), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 8), ctx);
    return _bind()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 7), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 7), ctx);
    return _js()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 6), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 6), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 4), ctx);
    return _$r()((function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 3), ctx);
      return "Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3)))";
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_$s);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 26), ctx);
      return $m || ($m = (function(__){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 25), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 11), ctx);
    return _bind()(_stepPhysics);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 24), ctx);
      return $m || ($m = (function(__){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 23), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 20), ctx);
    return _bind()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 19), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 19), ctx);
    return _js()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 18), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 18), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 16), ctx);
    return _$r()((function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 15), ctx);
      return "Notebook.update(\"app\")";
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_$s);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_runPhysics', 22), ctx);
      return $m || ($m = (function(__){return _runPhysics();}));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();}));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();}));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()), 0, "do\n  js ['Blocky.block.body.setAngle(Math.max(-Math.PI/3, Math.min(Blocky.block.body.a, Math.PI/3)))']\n  stepPhysics\n  js ['Notebook.update(\"app\")']\n  runPhysics");
;
//key = AST(\e . eq (eventType e) keydown (down e) (up e))
root.defs._key = _key = Leisure.define('key', (function(_e){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 14), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 10), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 6), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 4), ctx);
    return _eq()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 3), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 3), ctx);
    return _eventType()(_e);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 5), ctx);
      return "keydown";
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 9), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 9), ctx);
    return _down()(_e);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 13), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_key', 13), ctx);
    return _up()(_e);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();}), 1, "\\e. eq (eventType e) 'keydown'\n  down e\n  up e");
;
//down = AST(\e . (\c . bind (js ([ Blocky.touchingGround(Blocky.block) ? _true() : _false() ])) \tg . tg (eq c LEFT_ARROW (jsPD e ([ Blocky.moveBlockBy(-50) ])) (eq c RIGHT_ARROW (jsPD e ([ Blocky.moveBlockBy(50) ])) (eq c UP_ARROW (jsPD e ([ Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100) ])) false))) false) (eventKeyCode e))
root.defs._down = _down = Leisure.define('down', (function(_e){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 68), ctx);
    return function(_c){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 63), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 8), ctx);
    return _bind()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 7), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 7), ctx);
    return _js()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 6), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 6), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 4), ctx);
    return _$r()((function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 3), ctx);
      return "Blocky.touchingGround(Blocky.block) ? _true() : _false()";
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_$s);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 62), ctx);
      return $m || ($m = (function(_tg){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 61), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 59), ctx);
    return _tg()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 58), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 58), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 24), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 14), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 12), ctx);
    return _eq()(_c);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_LEFT_ARROW);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 23), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 23), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 17), ctx);
    return _jsPD()(_e);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 22), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 22), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 20), ctx);
    return _$r()((function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 19), ctx);
      return "Blocky.moveBlockBy(-50)";
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_$s);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 57), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 57), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 39), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 29), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 27), ctx);
    return _eq()(_c);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_RIGHT_ARROW);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 38), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 38), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 32), ctx);
    return _jsPD()(_e);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 37), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 37), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 35), ctx);
    return _$r()((function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 34), ctx);
      return "Blocky.moveBlockBy(50)";
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_$s);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 56), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 56), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 54), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 44), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 42), ctx);
    return _eq()(_c);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_UP_ARROW);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 53), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 53), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 47), ctx);
    return _jsPD()(_e);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 52), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 52), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 50), ctx);
    return _$r()((function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 49), ctx);
      return "Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100)";
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_$s);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_false);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()(_false);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();}));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();}((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 67), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_down', 67), ctx);
    return _eventKeyCode()(_e);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();}), 1, "\\e. do\n  c = eventKeyCode e\n  tg <- js ['Blocky.touchingGround(Blocky.block) ? _true() : _false()']\n  tg\n    eq c LEFT_ARROW\n      jsPD e ['Blocky.moveBlockBy(-50)']\n      eq c RIGHT_ARROW\n        jsPD e ['Blocky.moveBlockBy(50)']\n        eq c UP_ARROW\n          jsPD e ['Blocky.block.body.setAngle(0); Blocky.jumpBlockBy(100)']\n          false\n    false");
;
//up = AST(\e . false)
root.defs._up = _up = Leisure.define('up', (function(_e){return _false();}), 1, "\\e. false");
;
//jsPD = AST(\e jsCode . bind (eventPreventDefault e) \_ . js jsCode)
root.defs._jsPD = _jsPD = Leisure.define('jsPD', (function(_e){return function(_jsCode){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_jsPD', 9), ctx);
    return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_jsPD', 4), ctx);
    return _bind()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_jsPD', 3), ctx);
      return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_jsPD', 3), ctx);
    return _eventPreventDefault()(_e);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;

  return function(){
    try {
      var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_jsPD', 8), ctx);
      return $m || ($m = (function(__){return (function(){
  var ctx = Leisure.contextStack;
  var prevNewCtx = newCtx;

  try {
    var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_jsPD', 7), ctx);
    return _js()(_jsCode);
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();}));
    } catch (err) {
      if (!err.leisureContext) err.leisureContext = Leisure.contextStack;
      throw err;
    } finally {
      Leisure.contextStack = ctx
    }
  };
})()})());
  } catch (err) {
    if (!err.leisureContext) {
      err.leisureContext = Leisure.contextStack;
      err.leisureLazyContext = prevNewCtx;
    }
    throw err;
  } finally {
    Leisure.contextStack = ctx
  }
})();};}), 2, "\\e. \\jsCode. do\n  eventPreventDefault e\n  js jsCode");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)