var maps = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  maps = root = {};
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
var _add$_hash, _hash$_from$_list, _key, _value, _get$_pair, _get$_pair$_opt, _get$_value, _get$_value$_default, _get$_keys, _num$_keys, _first$_pair, _rest$_pairs, _merge$_hash$_keys, _merge$_hash, _remove$_hash;
//add-hash = AST(\k v hashmap . cons (cons k v) (remove-hash k hashmap))
root.defs._add$_hash = _add$_hash = Leisure.define('add-hash', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('add-hash', 15), ctx)
   try {
     return function(_k){return function(_v){return function(_hashmap){return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_k)(_v)))})})())((function(){var $m; return (function(){return $m || ($m = (_remove$_hash()(_k)(_hashmap)))})})());};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\k. \\v. \\hashmap. cons (cons k v) (remove-hash k hashmap)");
;
//hash-from-list = AST(\l . if (null? l) nil (add-hash (head l) (head (tail l)) (hash-from-list (tail (tail l)))))
root.defs._hash$_from$_list = _hash$_from$_list = Leisure.define('hash-from-list', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('hash-from-list', 27), ctx)
   try {
     return function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_l)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_add$_hash()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_head()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_hash$_from$_list()((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\l. if (null? l) nil\n  add-hash (head l) (head (tail l)) (hash-from-list (tail (tail l)))");
;
//key = AST(\cons . head cons)
root.defs._key = _key = Leisure.define('key', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('key', 3), ctx)
   try {
     return function(_cons){return _head()(_cons);};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\cons. head cons");
;
//value = AST(\cons . tail cons)
root.defs._value = _value = Leisure.define('value', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('value', 3), ctx)
   try {
     return function(_cons){return _tail()(_cons);};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\cons. tail cons");
;
//get-pair = AST(\k hashmap . find-if \x . eq (head x) k hashmap)
root.defs._get$_pair = _get$_pair = Leisure.define('get-pair', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('get-pair', 13), ctx)
   try {
     return function(_k){return function(_hashmap){return _find$_if()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return (function(){return $m || ($m = (_head()(_x)))})})())(_k);}))})})())(_hashmap);};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\k. \\hashmap. find-if (\\x . eq (head x) k) hashmap");
;
//get-pair-opt = AST(\k l . l \h t D . h \kk vv . eq k kk (some2 kk vv) (get-pair-opt k t) none)
root.defs._get$_pair$_opt = _get$_pair$_opt = Leisure.define('get-pair-opt', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('get-pair-opt', 29), ctx)
   try {
     return function(_k){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _h()((function(){var $m; return (function(){return $m || ($m = (function(_kk){return function(_vv){return _eq()(_k)(_kk)((function(){var $m; return (function(){return $m || ($m = (_some2()(_kk)(_vv)))})})())((function(){var $m; return (function(){return $m || ($m = (_get$_pair$_opt()(_k)(_t)))})})());};}))})})());};};}))})})())(_none);};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\k. \\l. l (\\h t D . h (\\kk vv . (eq k kk) (some2 kk vv) (get-pair-opt k t))) none");
;
//get-value = AST(\k hashmap . (\pair . if (eq pair nil) nil (value pair)) (get-pair k hashmap))
root.defs._get$_value = _get$_value = Leisure.define('get-value', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('get-value', 21), ctx)
   try {
     return function(_k){return function(_hashmap){return function(_pair){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_pair)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_value()(_pair)))})})());}((function(){var $m; return (function(){return $m || ($m = (_get$_pair()(_k)(_hashmap)))})})());};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\k. \\hashmap. (\\pair. if (eq pair nil) nil (value pair)) (get-pair k hashmap)");
;
//get-value-default = AST(\k default hashmap . (\val . if (neq val nil) val default) (get-value k hashmap))
root.defs._get$_value$_default = _get$_value$_default = Leisure.define('get-value-default', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('get-value-default', 20), ctx)
   try {
     return function(_k){return function(_default){return function(_hashmap){return function(_val){return _if()((function(){var $m; return (function(){return $m || ($m = (_neq()(_val)(_nil)))})})())(_val)(_default);}((function(){var $m; return (function(){return $m || ($m = (_get$_value()(_k)(_hashmap)))})})());};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\k. \\default. \\hashmap. do\n  val = get-value k hashmap\n  if (neq val nil) val default");
;
//get-keys = AST(\hashmap . map \cell . key cell hashmap)
root.defs._get$_keys = _get$_keys = Leisure.define('get-keys', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('get-keys', 8), ctx)
   try {
     return function(_hashmap){return _map()((function(){var $m; return (function(){return $m || ($m = (function(_cell){return _key()(_cell);}))})})())(_hashmap);};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\hashmap. map (\\cell . (key cell)) hashmap");
;
//num-keys = AST(\hashmap . length (get-keys hashmap))
root.defs._num$_keys = _num$_keys = Leisure.define('num-keys', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('num-keys', 5), ctx)
   try {
     return function(_hashmap){return _length()((function(){var $m; return (function(){return $m || ($m = (_get$_keys()(_hashmap)))})})());};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\hashmap. length (get-keys hashmap)");
;
//first-pair = AST(\hashmap . head hashmap)
root.defs._first$_pair = _first$_pair = Leisure.define('first-pair', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('first-pair', 3), ctx)
   try {
     return function(_hashmap){return _head()(_hashmap);};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\hashmap. head hashmap");
;
//rest-pairs = AST(\hashmap . tail hashmap)
root.defs._rest$_pairs = _rest$_pairs = Leisure.define('rest-pairs', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('rest-pairs', 3), ctx)
   try {
     return function(_hashmap){return _tail()(_hashmap);};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 1, "\\hashmap. tail hashmap");
;
//merge-hash-keys = AST(\hm1 hm2 keys . if (null? keys) hm1 (if (null? (get-pair (head keys) hm1)) (cons (get-pair (head keys) hm2) (merge-hash-keys hm1 hm2 (tail keys))) (merge-hash-keys hm1 hm2 (tail keys))))
root.defs._merge$_hash$_keys = _merge$_hash$_keys = Leisure.define('merge-hash-keys', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('merge-hash-keys', 51), ctx)
   try {
     return function(_hm1){return function(_hm2){return function(_keys){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_keys)))})})())(_hm1)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()((function(){var $m; return (function(){return $m || ($m = (_get$_pair()((function(){var $m; return (function(){return $m || ($m = (_head()(_keys)))})})())(_hm1)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_get$_pair()((function(){var $m; return (function(){return $m || ($m = (_head()(_keys)))})})())(_hm2)))})})())((function(){var $m; return (function(){return $m || ($m = (_merge$_hash$_keys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_tail()(_keys)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_merge$_hash$_keys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_tail()(_keys)))})})())))})})())))})})());};};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 3, "\\hm1. \\hm2. \\keys. if (null? keys) hm1\n  if (null? (get-pair (head keys) hm1) )\n    cons (get-pair (head keys) hm2) (merge-hash-keys hm1 hm2 (tail keys))\n    merge-hash-keys hm1 hm2 (tail keys)");
;
//merge-hash = AST(\hm1 hm2 . merge-hash-keys hm1 hm2 (get-keys hm2))
root.defs._merge$_hash = _merge$_hash = Leisure.define('merge-hash', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('merge-hash', 10), ctx)
   try {
     return function(_hm1){return function(_hm2){return _merge$_hash$_keys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_get$_keys()(_hm2)))})})());};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\hm1. \\hm2. merge-hash-keys hm1 hm2 (get-keys hm2)");
;
//remove-hash = AST(\k hashmap . remove-if \x . eq (key x) k hashmap)
root.defs._remove$_hash = _remove$_hash = Leisure.define('remove-hash', (function(){
  var ctx = Leisure.contextStack
  
   var ctx = Leisure.contextStack;
   Leisure.contextStack = cons(funcContext('remove-hash', 13), ctx)
   try {
     return function(_k){return function(_hashmap){return _remove$_if()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return (function(){return $m || ($m = (_key()(_x)))})})())(_k);}))})})())(_hashmap);};};
   } catch (err) {
     if (!err.leisureContext) {
       err.leisureContext = Leisure.contextStack;
     }
     throw err;
   } finally {
     Leisure.contextStack = ctx
   }
})(), 2, "\\k. \\hashmap. remove-if (\\x . eq (key x) k) hashmap");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)