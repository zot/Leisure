var std = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  std = root = {};
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
var _id, _flip, _true, _false, _and, _or, _not, _neq, _left, _right, _some, _some2, _none, _cons, _nil, _null$e, _append, _compose, _iszero, _positive, _length, _$_$_, _$o$o, _even$e, _odd$e, _max, _min, _head, _tail, _reverse, _subreverse, _addstr, _if, _at, _take, _takeWhile, _drop, _dropWhile, _series, _from, _fromBy, _fromTo, _fromToBy, _any, _all, _index_combine, _indexof, _position, _find, _find$_if, _find$_if$_opt, _count, _count$_if, _count$_if$_not, _remove, _remove$_if, _remove$_if$_not, _map, _reduce, _foldr, _foldr1, _foldl, _foldl1, _$r, _$b, _$s, _$q, _dl, _dlAppend, _dlList, _identMacro, _do, _m_subdo, _let, _m_sublet, _m_extractVar, _m_varFromTuple, _html;
//id = AST(\x . x)
root.defs._id = _id = Leisure.define('id', (function(_x){return _x();}), 1, "\\x. x");
;
//flip = AST(\f a b . f b a)
root.defs._flip = _flip = Leisure.define('flip', (Leisure.setDataType(function(_f){return Leisure.setType(function(_a){return function(_b){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_flip', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_flip', 2), ctx);
  return _f()(_b);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}, 'flip');}, 'flip')), 1, "\\f. \\a b . f b a");
;
//true = AST(\a b . a)
root.defs._true = _true = Leisure.define('true', (Leisure.setType(function(_a){return function(_b){return _a();};}, 'true')), 0, "\\a b . a");
;
//false = AST(\a b . b)
root.defs._false = _false = Leisure.define('false', (Leisure.setType(function(_a){return function(_b){return _b();};}, 'false')), 0, "\\a b . b");
;
//and = AST(\a b . a b false)
root.defs._and = _and = Leisure.define('and', (function(_a){return function(_b){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_and', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_and', 2), ctx);
  return _a()(_b);
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
})();};}), 2, "\\a. \\b. a b false");
;
//or = AST(\a . a true)
root.defs._or = _or = Leisure.define('or', (function(_a){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_or', 2), ctx);
  return _a()(_true);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}), 1, "\\a. a true");
;
//not = AST(\a . a false true)
root.defs._not = _not = Leisure.define('not', (function(_a){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_not', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_not', 2), ctx);
  return _a()(_false);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_true);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}), 1, "\\a. a false true");
;
//neq = AST(\a b . not (eq a b))
root.defs._neq = _neq = Leisure.define('neq', (function(_a){return function(_b){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_neq', 6), ctx);
  return _not()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_neq', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_neq', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_neq', 3), ctx);
  return _eq()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_b);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\a. \\b. not (eq a b)");
;
//left = AST(\v l r . l v)
root.defs._left = _left = Leisure.define('left', (Leisure.setDataType(function(_v){return Leisure.setType(function(_l){return function(_r){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_left', 2), ctx);
  return _l()(_v);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}, 'left');}, 'left')), 1, "\\v. \\l r . l v");
;
//right = AST(\v l r . r v)
root.defs._right = _right = Leisure.define('right', (Leisure.setDataType(function(_v){return Leisure.setType(function(_l){return function(_r){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_right', 2), ctx);
  return _r()(_v);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}, 'right');}, 'right')), 1, "\\v. \\l r . r v");
;
//some = AST(\x yes no . yes x)
root.defs._some = _some = Leisure.define('some', (Leisure.setDataType(function(_x){return Leisure.setType(function(_yes){return function(_no){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_some', 2), ctx);
  return _yes()(_x);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}, 'some');}, 'some')), 1, "\\x. \\yes no . yes x");
;
//some2 = AST(\a b yes no . yes a b)
root.defs._some2 = _some2 = Leisure.define('some2', (Leisure.setDataType(function(_a){return function(_b){return Leisure.setType(function(_yes){return function(_no){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_some2', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_some2', 2), ctx);
  return _yes()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_b);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}, 'some2');};}, 'some2')), 2, "\\a. \\b. \\yes no . yes a b");
;
//none = AST(\yes no . no)
root.defs._none = _none = Leisure.define('none', (Leisure.setType(function(_yes){return function(_no){return _no();};}, 'none')), 0, "\\yes no . no");
;
//cons = AST(\a b f . f a b)
root.defs._cons = _cons = Leisure.define('cons', (Leisure.setDataType(function(_a){return function(_b){return Leisure.setType(function(_f){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_cons', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_cons', 2), ctx);
  return _f()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_b);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}, 'cons');};}, 'cons')), 2, "\\a. \\b.\n  \\f . f\n    a\n    b");
;
//nil = AST(\a b . b)
root.defs._nil = _nil = Leisure.define('nil', (Leisure.setType(function(_a){return function(_b){return _b();};}, 'nil')), 0, "\\a b . b");
;
//null? = AST(eq nil)
root.defs._null$e = _null$e = Leisure.define('null?', ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_null$e', 2), ctx);
  return _eq()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()), 0, "eq nil");
;
//append = AST(\l1 l2 . l1 \h t D . cons h (append t l2) l2)
root.defs._append = _append = Leisure.define('append', (function(_l1){return function(_l2){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_append', 15), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_append', 13), ctx);
  return _l1()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_append', 12), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_append', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_append', 3), ctx);
  return _cons()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_append', 8), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_append', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_append', 6), ctx);
  return _append()(_t);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_l2);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_l2);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\l1. \\l2. l1 (\\h t D . cons h (append t l2)) l2");
;
//compose = AST(\f g x . f (g x))
root.defs._compose = _compose = Leisure.define('compose', (Leisure.setDataType(function(_f){return function(_g){return Leisure.setType(function(_x){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_compose', 4), ctx);
  return _f()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_compose', 3), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_compose', 3), ctx);
  return _g()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}, 'compose');};}, 'compose')), 2, "\\f. \\g. \\x . f ( g x)");
;
//iszero = AST(eq 0)
root.defs._iszero = _iszero = Leisure.define('iszero', ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_iszero', 2), ctx);
  return _eq()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_iszero', 1), ctx);
  return 0;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()), 0, "eq 0");
;
//positive = AST(< 0)
root.defs._positive = _positive = Leisure.define('positive', ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_positive', 2), ctx);
  return _$y()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_positive', 1), ctx);
  return 0;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()), 0, "< 0");
;
//length = AST(\l . eq l nil 0 (++ (length (tail l))))
root.defs._length = _length = Leisure.define('length', (function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 14), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 2), ctx);
  return _eq()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_nil);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 5), ctx);
  return 0;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 13), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 13), ctx);
  return _$o$o()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 12), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 12), ctx);
  return _length()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 11), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_length', 11), ctx);
  return _tail()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}), 1, "\\l. (eq l nil) 0 (++ (length (tail l) ) )");
;
//-- = AST(flip - 1)
root.defs._$_$_ = _$_$_ = Leisure.define('--', ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$_$_', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$_$_', 2), ctx);
  return _flip()(_$_);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$_$_', 3), ctx);
  return 1;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()), 0, "(flip -) 1");
;
//++ = AST(+ 1)
root.defs._$o$o = _$o$o = Leisure.define('++', ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$o$o', 2), ctx);
  return _$o()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$o$o', 1), ctx);
  return 1;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()), 0, "+ 1");
;
//even? = AST(\x . iszero (% x 2))
root.defs._even$e = _even$e = Leisure.define('even?', (function(_x){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_even$e', 6), ctx);
  return _iszero()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_even$e', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_even$e', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_even$e', 3), ctx);
  return _$A()(_x);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_even$e', 4), ctx);
  return 2;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}), 1, "\\x. iszero (% x 2)");
;
//odd? = AST(\x . eq 1 (% x 2))
root.defs._odd$e = _odd$e = Leisure.define('odd?', (function(_x){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_odd$e', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_odd$e', 2), ctx);
  return _eq()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_odd$e', 1), ctx);
  return 1;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_odd$e', 7), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_odd$e', 7), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_odd$e', 5), ctx);
  return _$A()(_x);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_odd$e', 6), ctx);
  return 2;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}), 1, "\\x. eq 1 (% x 2)");
;
//max = AST(\a b . gt a b a b)
root.defs._max = _max = Leisure.define('max', (function(_a){return function(_b){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_max', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_max', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_max', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_max', 2), ctx);
  return _gt()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_b);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_b);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\a. \\b. (gt a b) a b");
;
//min = AST(\a b . lt a b a b)
root.defs._min = _min = Leisure.define('min', (function(_a){return function(_b){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_min', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_min', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_min', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_min', 2), ctx);
  return _lt()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_b);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_b);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\a. \\b. (lt a b) a b");
;
//head = AST(\l . l \h t . h)
root.defs._head = _head = Leisure.define('head', (function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_head', 4), ctx);
  return _l()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_head', 3), ctx);
  return $m || ($m = (function(_h){return function(_t){return _h();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}), 1, "\\l. l \\h t . h");
;
//tail = AST(\l . l \h t . t)
root.defs._tail = _tail = Leisure.define('tail', (function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_tail', 4), ctx);
  return _l()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_tail', 3), ctx);
  return $m || ($m = (function(_h){return function(_t){return _t();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}), 1, "\\l. l \\h t . t");
;
//reverse = AST(\l . subreverse l nil)
root.defs._reverse = _reverse = Leisure.define('reverse', (function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reverse', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reverse', 2), ctx);
  return _subreverse()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}), 1, "\\l. subreverse l nil");
;
//subreverse = AST(\l result . l \h t D . subreverse t (cons h result) result)
root.defs._subreverse = _subreverse = Leisure.define('subreverse', (function(_l){return function(_result){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_subreverse', 15), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_subreverse', 13), ctx);
  return _l()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_subreverse', 12), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_subreverse', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_subreverse', 3), ctx);
  return _subreverse()(_t);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_subreverse', 8), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_subreverse', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_subreverse', 6), ctx);
  return _cons()(_h);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_result);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_result);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\l. \\result. l (\\h t D . subreverse t (cons h result)) result");
;
//addstr = AST(\a b . concat ([ a , b ]))
root.defs._addstr = _addstr = Leisure.define('addstr', (function(_a){return function(_b){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_addstr', 10), ctx);
  return _concat()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_addstr', 9), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_addstr', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_addstr', 7), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_addstr', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_addstr', 3), ctx);
  return _$r()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_$b);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_b);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\a. \\b. concat [a, b]");
;
//if = AST(id)
root.defs._if = _if = Leisure.define('if', (_id()), 0, "id");
;
//at = AST(\l x . iszero x (head l) (at (tail l) (-- x)))
root.defs._at = _at = Leisure.define('at', (function(_l){return function(_x){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 16), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 2), ctx);
  return _iszero()(_x);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 5), ctx);
  return _head()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 15), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 15), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 11), ctx);
  return _at()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 10), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 10), ctx);
  return _tail()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 14), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_at', 14), ctx);
  return _$_$_()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\l. \\x. (iszero (x)) (head l) (at (tail l) (-- (x) ) )");
;
//take = AST(\n list . positive n (list \h t D . cons h (take (-- n) t) nil) nil)
root.defs._take = _take = Leisure.define('take', (function(_n){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 23), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 21), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 2), ctx);
  return _positive()(_n);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 20), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 20), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 18), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 17), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 14), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 6), ctx);
  return _cons()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 13), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 13), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 11), ctx);
  return _take()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 10), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_take', 10), ctx);
  return _$_$_()(_n);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\n. \\list. positive n\n  list\n    \\h t D . cons h (take (-- n) t)\n    nil\n  nil");
;
//takeWhile = AST(\predicate list . list \h t D . predicate h (cons h (takeWhile predicate t)) nil nil)
root.defs._takeWhile = _takeWhile = Leisure.define('takeWhile', (function(_predicate){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 21), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 19), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 18), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 15), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 13), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 3), ctx);
  return _predicate()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 12), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 12), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 6), ctx);
  return _cons()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 11), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_takeWhile', 9), ctx);
  return _takeWhile()(_predicate);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\predicate. \\list. list\n  \\h t D . predicate h\n    cons h (takeWhile predicate t)\n    nil\n  nil");
;
//drop = AST(\x list . positive x (list \h t D . drop (-- x) t nil) list)
root.defs._drop = _drop = Leisure.define('drop', (function(_x){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 19), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 2), ctx);
  return _positive()(_x);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 16), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 16), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 14), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 13), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 8), ctx);
  return _drop()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 7), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_drop', 7), ctx);
  return _$_$_()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_t);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_list);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\x. \\list. positive x\n  list\n    \\h t D . drop (-- x) t\n    nil\n  list");
;
//dropWhile = AST(\predicate list . list \h t D . predicate h (dropWhile predicate t) list nil)
root.defs._dropWhile = _dropWhile = Leisure.define('dropWhile', (function(_predicate){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 15), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 14), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 3), ctx);
  return _predicate()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 8), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dropWhile', 6), ctx);
  return _dropWhile()(_predicate);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_list);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\predicate. \\list. list\n  \\h t D . predicate h\n    dropWhile predicate t\n    list\n  nil");
;
//series = AST(\func n . cons n (series func (func n)))
root.defs._series = _series = Leisure.define('series', (function(_func){return function(_n){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_series', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_series', 2), ctx);
  return _cons()(_n);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_series', 9), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_series', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_series', 5), ctx);
  return _series()(_func);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_series', 8), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_series', 8), ctx);
  return _func()(_n);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\func. \\n. cons n (series func (func n))");
;
//from = AST(\n . series ++ n)
root.defs._from = _from = Leisure.define('from', (function(_n){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_from', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_from', 2), ctx);
  return _series()(_$o$o);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_n);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}), 1, "\\n. series ++ n");
;
//fromBy = AST(\n inc . series (+ inc) n)
root.defs._fromBy = _fromBy = Leisure.define('fromBy', (function(_n){return function(_inc){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromBy', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromBy', 4), ctx);
  return _series()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromBy', 3), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromBy', 3), ctx);
  return _$o()(_inc);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_n);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\n. \\inc. series (+ inc) n");
;
//fromTo = AST(\n m . takeWhile (> m) (from n))
root.defs._fromTo = _fromTo = Leisure.define('fromTo', (function(_n){return function(_m){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromTo', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromTo', 4), ctx);
  return _takeWhile()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromTo', 3), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromTo', 3), ctx);
  return _$z()(_m);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromTo', 7), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromTo', 7), ctx);
  return _from()(_n);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\n. \\m. takeWhile (> m) (from n)");
;
//fromToBy = AST(\n m inc . takeWhile (> m) (fromBy n inc))
root.defs._fromToBy = _fromToBy = Leisure.define('fromToBy', (function(_n){return function(_m){return function(_inc){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromToBy', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromToBy', 4), ctx);
  return _takeWhile()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromToBy', 3), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromToBy', 3), ctx);
  return _$z()(_m);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromToBy', 9), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromToBy', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_fromToBy', 7), ctx);
  return _fromBy()(_n);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_inc);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}), 3, "\\n. \\m. \\inc. takeWhile (> m) (fromBy n inc)");
;
//any = AST(\f l . l \h t D . or (f h) (any f t) false)
root.defs._any = _any = Leisure.define('any', (function(_f){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 15), ctx);
  return _l()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 14), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 5), ctx);
  return _or()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 4), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 4), ctx);
  return _f()(_h);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 10), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_any', 8), ctx);
  return _any()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\f. \\l. l\n  \\h t D . or\n    f h\n    any f t\n  false");
;
//all = AST(\f l . l \h t D . and (f h) (all f t) true)
root.defs._all = _all = Leisure.define('all', (function(_f){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 15), ctx);
  return _l()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 14), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 5), ctx);
  return _and()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 4), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 4), ctx);
  return _f()(_h);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 10), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_all', 8), ctx);
  return _all()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_true);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\f. \\l. l\n  \\h t D . and\n    f h\n    all f t\n  true");
;
//index_combine = AST(\x y . or (eq x nil) (eq y nil) nil (+ x y))
root.defs._index_combine = _index_combine = Leisure.define('index_combine', (function(_x){return function(_y){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 20), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 14), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 12), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 6), ctx);
  return _or()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 3), ctx);
  return _eq()(_x);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_nil);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 11), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 9), ctx);
  return _eq()(_y);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_nil);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 19), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 19), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_index_combine', 17), ctx);
  return _$o()(_x);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_y);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\x. \\y. (or (eq x nil) (eq y nil)) (nil) (+ x y)");
;
//indexof = AST(\l x . if (eq l nil) nil (if (eq x (head l)) 0 (index_combine 1 (indexof (tail l) x))))
root.defs._indexof = _indexof = Leisure.define('indexof', (function(_l){return function(_x){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 32), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 6), ctx);
  return _if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 3), ctx);
  return _eq()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_nil);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 31), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 31), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 19), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 17), ctx);
  return _if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 16), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 16), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 12), ctx);
  return _eq()(_x);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 15), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 15), ctx);
  return _head()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 18), ctx);
  return 0;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 30), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 30), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 22), ctx);
  return _index_combine()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 21), ctx);
  return 1;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 29), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 29), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 27), ctx);
  return _indexof()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 26), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_indexof', 26), ctx);
  return _tail()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\l. \\x. if (eq l nil) (nil) (if (eq x (head l)) (0) (index_combine 1 (indexof (tail l) x ) ) )");
;
//position = AST(\l x . indexof x l)
root.defs._position = _position = Leisure.define('position', (function(_l){return function(_x){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_position', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_position', 2), ctx);
  return _indexof()(_x);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\l. \\x. indexof x l");
;
//find = AST(\x l . find-if (eq x) l)
root.defs._find = _find = Leisure.define('find', (function(_x){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find', 4), ctx);
  return _find$_if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find', 3), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find', 3), ctx);
  return _eq()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\x. \\l. find-if (eq x) l");
;
//find-if = AST(\f l . l \h t D . f h h (find-if f t) nil)
root.defs._find$_if = _find$_if = Leisure.define('find-if', (function(_f){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 15), ctx);
  return _l()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 14), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 3), ctx);
  return _f()(_h);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 10), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if', 8), ctx);
  return _find$_if()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\f. \\l. l (\\h t D . (f h) h (find-if f t)) nil");
;
//find-if-opt = AST(\f l . l \h t D . f h (some h) (find-if-opt f t) none)
root.defs._find$_if$_opt = _find$_if$_opt = Leisure.define('find-if-opt', (function(_f){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 19), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 17), ctx);
  return _l()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 16), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 13), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 7), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 3), ctx);
  return _f()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 6), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 6), ctx);
  return _some()(_h);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 12), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 12), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_find$_if$_opt', 10), ctx);
  return _find$_if$_opt()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_none);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\f. \\l. l (\\h t D . (f h) (some h) (find-if-opt f t)) none");
;
//count = AST(\x l . count-if (eq x) l)
root.defs._count = _count = Leisure.define('count', (function(_x){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count', 4), ctx);
  return _count$_if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count', 3), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count', 3), ctx);
  return _eq()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\x. \\l. count-if (eq x) l");
;
//count-if = AST(\f l . if (eq l nil) 0 (+ (f (head l) 1 0) (count-if f (tail l))))
root.defs._count$_if = _count$_if = Leisure.define('count-if', (function(_f){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 28), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 6), ctx);
  return _if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 3), ctx);
  return _eq()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_nil);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 7), ctx);
  return 0;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 27), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 27), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 19), ctx);
  return _$o()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 18), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 18), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 16), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 14), ctx);
  return _f()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 13), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 13), ctx);
  return _head()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 15), ctx);
  return 1;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 17), ctx);
  return 0;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 26), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 26), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 22), ctx);
  return _count$_if()(_f);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 25), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if', 25), ctx);
  return _tail()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\f. \\l. if (eq l nil) 0\n  + (f (head l) 1 0) (count-if f (tail l))");
;
//count-if-not = AST(\f l . count-if \x . not (f x) l)
root.defs._count$_if$_not = _count$_if$_not = Leisure.define('count-if-not', (function(_f){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if$_not', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if$_not', 7), ctx);
  return _count$_if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if$_not', 6), ctx);
  return $m || ($m = (function(_x){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if$_not', 5), ctx);
  return _not()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if$_not', 4), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_count$_if$_not', 4), ctx);
  return _f()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\f. \\l. count-if (\\x. not (f x)) l");
;
//remove = AST(\x l . remove-if (eq x) l)
root.defs._remove = _remove = Leisure.define('remove', (function(_x){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove', 4), ctx);
  return _remove$_if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove', 3), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove', 3), ctx);
  return _eq()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\x. \\l. remove-if (eq x) l");
;
//remove-if = AST(\f l . if (eq l nil) nil (if (f (head l)) (remove-if f (tail l)) (cons (head l) (remove-if f (tail l)))))
root.defs._remove$_if = _remove$_if = Leisure.define('remove-if', (function(_f){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 38), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 6), ctx);
  return _if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 3), ctx);
  return _eq()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_nil);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 37), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 37), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 23), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 15), ctx);
  return _if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 14), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 14), ctx);
  return _f()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 13), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 13), ctx);
  return _head()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 22), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 22), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 18), ctx);
  return _remove$_if()(_f);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 21), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 21), ctx);
  return _tail()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 36), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 36), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 28), ctx);
  return _cons()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 27), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 27), ctx);
  return _head()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 35), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 35), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 31), ctx);
  return _remove$_if()(_f);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 34), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if', 34), ctx);
  return _tail()(_l);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\f. \\l. if (eq l nil) nil\n  if (f (head l)) (remove-if f (tail l))\n    cons (head l) (remove-if f (tail l))");
;
//remove-if-not = AST(\f l . remove-if \x . not (f x) l)
root.defs._remove$_if$_not = _remove$_if$_not = Leisure.define('remove-if-not', (function(_f){return function(_l){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if$_not', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if$_not', 7), ctx);
  return _remove$_if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if$_not', 6), ctx);
  return $m || ($m = (function(_x){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if$_not', 5), ctx);
  return _not()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if$_not', 4), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_remove$_if$_not', 4), ctx);
  return _f()(_x);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_l);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\f. \\l. remove-if (\\x. not (f x)) l");
;
//map = AST(\func list . list \h t D . cons (func h) (map func t) nil)
root.defs._map = _map = Leisure.define('map', (function(_func){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 15), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 14), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 5), ctx);
  return _cons()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 4), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 4), ctx);
  return _func()(_h);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 10), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_map', 8), ctx);
  return _map()(_func);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\func. \\list. list (\\h t D . cons (func h) (map func t)) nil");
;
//reduce = AST(\func list . if (eq list nil) nil (if (eq 1 (length list)) (head list) (func (head list) (reduce func (tail list)))))
root.defs._reduce = _reduce = Leisure.define('reduce', (function(_func){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 36), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 6), ctx);
  return _if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 3), ctx);
  return _eq()(_list);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_nil);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 35), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 35), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 21), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 17), ctx);
  return _if()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 16), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 16), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 12), ctx);
  return _eq()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 11), ctx);
  return 1;
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 15), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 15), ctx);
  return _length()(_list);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 20), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 20), ctx);
  return _head()(_list);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 34), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 34), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 26), ctx);
  return _func()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 25), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 25), ctx);
  return _head()(_list);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 33), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 33), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 29), ctx);
  return _reduce()(_func);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 32), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_reduce', 32), ctx);
  return _tail()(_list);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\func. \\list. if (eq list nil) nil\n  if (eq 1 (length list)) (head list)\n    func (head list) (reduce func (tail list))");
;
//foldr = AST(\func value list . list \h t D . func h (foldr func value t) value)
root.defs._foldr = _foldr = Leisure.define('foldr', (function(_func){return function(_value){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 15), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 14), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 3), ctx);
  return _func()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 10), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr', 6), ctx);
  return _foldr()(_func);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_value);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_value);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};};}), 3, "\\func. \\value. \\list. list (\\h t D . func h (foldr func value t)) value");
;
//foldr1 = AST(\func list . list \h t D . null? t h (func h (foldr1 func t)) nil)
root.defs._foldr1 = _foldr1 = Leisure.define('foldr1', (function(_func){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 21), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 19), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 18), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 15), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 3), ctx);
  return _null$e()(_t);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 14), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 14), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 8), ctx);
  return _func()(_h);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 13), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 13), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldr1', 11), ctx);
  return _foldr1()(_func);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\func. \\list. list\n  \\h t D . null? t\n     h\n     func h (foldr1 func t)\n  nil");
;
//foldl = AST(\func value list . list \h t D . foldl func (func value h) t value)
root.defs._foldl = _foldl = Leisure.define('foldl', (function(_func){return function(_value){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 15), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 14), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 9), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 3), ctx);
  return _foldl()(_func);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 8), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 8), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl', 6), ctx);
  return _func()(_value);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_h);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_t);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_value);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};};}), 3, "\\func. \\value. \\list. list (\\h t D . foldl func (func value h) t) value");
;
//foldl1 = AST(\func list . list \h t D . foldl func h t nil)
root.defs._foldl1 = _foldl1 = Leisure.define('foldl1', (function(_func){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl1', 13), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl1', 11), ctx);
  return _list()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl1', 10), ctx);
  return $m || ($m = (function(_h){return function(_t){return function(_D){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl1', 7), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl1', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_foldl1', 3), ctx);
  return _foldl()(_func);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_h);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_t);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\func. \\list. list (\\h t D. foldl func h t) nil");
;
//[ = AST(\item c . c \rest . cons item rest)
root.defs._$r = _$r = Leisure.define('[', (Leisure.setType(function(_item){return function(_c){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$r', 7), ctx);
  return _c()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$r', 6), ctx);
  return $m || ($m = (function(_rest){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$r', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$r', 3), ctx);
  return _cons()(_item);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_rest);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}, '[')), 0, "\\item c . c \\rest . cons item rest");
root.tokenDefs.push('[', '=(]=');
;
//, = AST(\f item c . c \rest . f (cons item rest))
root.defs._$b = _$b = Leisure.define(',', (Leisure.setType(function(_f){return function(_item){return function(_c){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$b', 9), ctx);
  return _c()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$b', 8), ctx);
  return $m || ($m = (function(_rest){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$b', 7), ctx);
  return _f()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$b', 6), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$b', 6), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$b', 4), ctx);
  return _cons()(_item);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_rest);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}, ',')), 0, "\\f item c . c \\rest . f (cons item rest)");
root.tokenDefs.push(',', '=.=');
;
//] = AST(\f . f nil)
root.defs._$s = _$s = Leisure.define(']', (Leisure.setType(function(_f){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$s', 2), ctx);
  return _f()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}, ']')), 0, "\\f . f nil");
root.tokenDefs.push(']', '=)=');
;
//| = AST(\f rest g . f rest)
root.defs._$q = _$q = Leisure.define('|', (Leisure.setType(function(_f){return function(_rest){return function(_g){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_$q', 2), ctx);
  return _f()(_rest);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};};}, '|')), 0, "\\f rest g . f rest");
root.tokenDefs.push('|', '=.=');
;
//dl = AST(\list . append list)
root.defs._dl = _dl = Leisure.define('dl', (function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dl', 2), ctx);
  return _append()(_list);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}), 1, "\\list. append list");
;
//dlAppend = AST(\da db list . da (db list))
root.defs._dlAppend = _dlAppend = Leisure.define('dlAppend', (function(_da){return function(_db){return function(_list){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dlAppend', 4), ctx);
  return _da()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dlAppend', 3), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dlAppend', 3), ctx);
  return _db()(_list);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};};}), 3, "\\da. \\db. \\list. da (db list)");
;
//dlList = AST(\dl . dl nil)
root.defs._dlList = _dlList = Leisure.define('dlList', (function(_dl){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_dlList', 2), ctx);
  return _dl()(_nil);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}), 1, "\\dl. dl nil");
;
//identMacro = AST(\apl . apl \f a . is f ref a (apply (identMacro f) a))
root.defs._identMacro = _identMacro = Leisure.defineMacro('identMacro', (function(_apl){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 18), ctx);
  return _apl()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 17), ctx);
  return $m || ($m = (function(_f){return function(_a){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 15), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 7), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 3), ctx);
  return _is()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_ref);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 14), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 14), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 12), ctx);
  return _apply()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 11), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_identMacro', 11), ctx);
  return _identMacro()(_f);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_a);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}), 1, "\\apl. apl \\f a . (is f ref) a (apply (identMacro f) a)");
root.tokenDefs.push('identMacro', '=M=');
;
//do = AST(\apl . apl \f a . m_subdo a f)
root.defs._do = _do = Leisure.defineMacro('do', (function(_apl){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_do', 8), ctx);
  return _apl()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_do', 7), ctx);
  return $m || ($m = (function(_f){return function(_a){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_do', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_do', 3), ctx);
  return _m_subdo()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}), 1, "\\apl. apl \\f a . m_subdo a f");
root.tokenDefs.push('do', '=M=');
;
//m_subdo = AST(\a f . or (is f ref) (is f lit) a (f \f2 a2 . m_subdo (m_extractVar a2 <- \v ast . apply (apply (ref bind) ast) (lambda v a) (m_extractVar a2 = \v ast . apply (lambda v a) ast (apply (apply (ref bind) a2) (lambda _ a)))) f2))
root.defs._m_subdo = _m_subdo = Leisure.define('m_subdo', (function(_a){return function(_f){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 80), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 14), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 12), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 6), ctx);
  return _or()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 3), ctx);
  return _is()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_ref);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 11), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 9), ctx);
  return _is()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_lit);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_a);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 79), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 79), ctx);
  return _f()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 78), ctx);
  return $m || ($m = (function(_f2){return function(_a2){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 76), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 74), ctx);
  return _m_subdo()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 73), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 73), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 39), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 21), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 19), ctx);
  return _m_extractVar()(_a2);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 20), ctx);
  return "<-";
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 38), ctx);
  return $m || ($m = (function(_v){return function(_ast){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 36), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 30), ctx);
  return _apply()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 29), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 29), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 27), ctx);
  return _apply()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 26), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 26), ctx);
  return _ref()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 25), ctx);
  return "bind";
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_ast);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 35), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 35), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 33), ctx);
  return _lambda()(_v);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 72), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 72), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 56), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 44), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 42), ctx);
  return _m_extractVar()(_a2);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 43), ctx);
  return "=";
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 55), ctx);
  return $m || ($m = (function(_v){return function(_ast){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 53), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 51), ctx);
  return _apply()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 50), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 50), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 48), ctx);
  return _lambda()(_v);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_ast);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 71), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 71), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 65), ctx);
  return _apply()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 64), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 64), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 62), ctx);
  return _apply()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 61), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 61), ctx);
  return _ref()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 60), ctx);
  return "bind";
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_a2);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 70), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 70), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 68), ctx);
  return _lambda()((function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_subdo', 67), ctx);
  return "_";
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_a);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_f2);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\a. \\f. or (is f ref) (is f lit)\n  a\n  f \\f2 a2 . m_subdo\n    m_extractVar a2 '<-'\n      \\v ast . apply (apply (ref 'bind') ast) (lambda v a)\n      m_extractVar a2 '='\n        \\v ast . apply (lambda v a) ast\n        apply (apply (ref 'bind') a2) (lambda '_' a)\n    f2");
;
//let = AST(\apl . apl \f a . m_sublet f a)
root.defs._let = _let = Leisure.defineMacro('let', (function(_apl){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_let', 8), ctx);
  return _apl()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_let', 7), ctx);
  return $m || ($m = (function(_f){return function(_a){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_let', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_let', 3), ctx);
  return _m_sublet()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();}), 1, "\\apl. apl \\f a . m_sublet f a");
root.tokenDefs.push('let', '=M=');
;
//m_sublet = AST(\f a . or (is f ref) (is f lit) a (f \f2 a2 . m_extractVar a2 = \v ast . m_sublet f2 (apply (lambda v a) ast) (apply a a2)))
root.defs._m_sublet = _m_sublet = Leisure.define('m_sublet', (function(_f){return function(_a){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 46), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 14), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 12), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 6), ctx);
  return _or()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 5), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 5), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 3), ctx);
  return _is()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_ref);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 11), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 9), ctx);
  return _is()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_lit);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_a);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 45), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 45), ctx);
  return _f()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 44), ctx);
  return $m || ($m = (function(_f2){return function(_a2){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 42), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 36), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 20), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 18), ctx);
  return _m_extractVar()(_a2);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 19), ctx);
  return "=";
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 35), ctx);
  return $m || ($m = (function(_v){return function(_ast){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 33), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 23), ctx);
  return _m_sublet()(_f2);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 32), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 32), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 30), ctx);
  return _apply()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 29), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 29), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 27), ctx);
  return _lambda()(_v);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_ast);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 41), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 41), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_sublet', 39), ctx);
  return _apply()(_a);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a2);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}), 2, "\\f. \\a. or (is f ref) (is f lit)\n  a\n  f \\f2 a2 . m_extractVar a2 '='\n    \\v ast . m_sublet f2 (apply (lambda v a) ast)\n    apply a a2");
;
//m_extractVar = AST(\ast token . is ast apply (ast \f a . m_varFromTuple f token \v . some2 v a (m_extractVar f token \var ast . some2 var (apply ast a) none)) none)
root.defs._m_extractVar = _m_extractVar = Leisure.define('m_extractVar', (function(_ast){return function(_token){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 43), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 41), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 2), ctx);
  return _is()(_ast);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_apply);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 40), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 40), ctx);
  return _ast()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 39), ctx);
  return $m || ($m = (function(_f){return function(_a){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 37), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 10), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 8), ctx);
  return _m_varFromTuple()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_token);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 16), ctx);
  return $m || ($m = (function(_v){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 15), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 13), ctx);
  return _some2()(_v);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 36), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 36), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 34), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 22), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 20), ctx);
  return _m_extractVar()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_token);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 33), ctx);
  return $m || ($m = (function(_var){return function(_ast){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 31), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 25), ctx);
  return _some2()(_var);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 30), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 30), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_extractVar', 28), ctx);
  return _apply()(_ast);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_a);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_none);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_none);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\ast. \\token. is ast apply\n  ast \\f a .m_varFromTuple f token\n    \\v . some2 v a\n    m_extractVar f token\n      \\var ast . some2 var (apply ast a)\n      none\n  none");
;
//m_varFromTuple = AST(\ast token . is ast apply (ast \f arg . or (is f ref) (is f lit) (or (is arg ref) (is arg lit) (arg \arrow . eq arrow token (f \v . some v) none) none) none) none)
root.defs._m_varFromTuple = _m_varFromTuple = Leisure.define('m_varFromTuple', (function(_ast){return function(_token){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 60), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 58), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 4), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 2), ctx);
  return _is()(_ast);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_apply);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 57), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 57), ctx);
  return _ast()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 56), ctx);
  return $m || ($m = (function(_f){return function(_arg){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 54), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 52), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 18), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 12), ctx);
  return _or()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 11), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 11), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 9), ctx);
  return _is()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_ref);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 17), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 17), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 15), ctx);
  return _is()(_f);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_lit);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 51), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 51), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 49), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 31), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 25), ctx);
  return _or()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 24), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 24), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 22), ctx);
  return _is()(_arg);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_ref);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 30), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 30), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 28), ctx);
  return _is()(_arg);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_lit);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 48), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 48), ctx);
  return _arg()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 47), ctx);
  return $m || ($m = (function(_arrow){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 46), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 44), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 37), ctx);
  return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 35), ctx);
  return _eq()(_arrow);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})()(_token);
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
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 43), ctx);
  return $m || ($m = ((function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 43), ctx);
  return _f()((function(){var $m; return (function(){
  var ctx = Leisure.contextStack;
  

  return function(){try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 42), ctx);
  return $m || ($m = (function(_v){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_m_varFromTuple', 41), ctx);
  return _some()(_v);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_none);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_none);
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_none);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}));
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}};
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
})()(_none);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();};}), 2, "\\ast. \\token. is ast apply\n  ast \\f arg . or (is f ref) (is f lit)\n    or (is arg ref) (is arg lit)\n      arg \\arrow . eq arrow token\n        f \\v . some v\n        none\n      none\n    none\n  none");
;
//html = AST(\x f . f x)
root.defs._html = _html = Leisure.define('html', (Leisure.setDataType(function(_x){return Leisure.setType(function(_f){return (function(){
  var ctx = Leisure.contextStack;
  

  try {
  var newCtx = Leisure.contextStack = Leisure.cons(funcContext('_html', 2), ctx);
  return _f()(_x);
} catch (err) {
  if (!err.leisureContext) {
    err.leisureContext = Leisure.contextStack;
    err.leisureLazyContext = prevNewCtx;
  }
  throw err;
} finally {
  Leisure.contextStack = ctx
}
})();}, 'html');}, 'html')), 1, "\\x. \\f . f x");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)