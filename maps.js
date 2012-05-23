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

var setType = Leisure.setType;
var setDataType = Leisure.setDataType;
var define = Leisure.define;
var defineMacro = Leisure.defineMacro;
var defineToken = Leisure.defineToken;
var processResult = Repl.processResult;

var _add$nhash, _hash$nfrom$nlist, _key, _value, _get$npair, _get$npair$nopt, _get$nvalue, _get$nvalue$ndefault, _get$nkeys, _num$nkeys, _first$npair, _rest$npairs, _merge$nhash$nkeys, _merge$nhash, _remove$nhash;
//add-hash = AST(\k v hashmap . cons (cons k v) (remove-hash k hashmap))
root.defs._add$nhash = _add$nhash = define('add-hash', function(_k){return function(_v){return function(_hashmap){return _cons()((function(){var $m; return function(){return $m || ($m = (_cons()(_k)(_v)))}})())((function(){var $m; return function(){return $m || ($m = (_remove$nhash()(_k)(_hashmap)))}})())}}}, 3);
;
//hash-from-list = AST(\l . if (null? l) nil (add-hash (head l) (head (tail l)) (hash-from-list (tail (tail l)))))
root.defs._hash$nfrom$nlist = _hash$nfrom$nlist = define('hash-from-list', function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_l)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_add$nhash()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())((function(){var $m; return function(){return $m || ($m = (_head()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_hash$nfrom$nlist()((function(){var $m; return function(){return $m || ($m = (_tail()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())))}})())))}})())}, 1);
;
//key = AST(\cons . head cons)
root.defs._key = _key = define('key', function(_cons){return _head()(_cons)}, 1);
;
//value = AST(\cons . tail cons)
root.defs._value = _value = define('value', function(_cons){return _tail()(_cons)}, 1);
;
//get-pair = AST(\k hashmap . find-if \x . eq (head x) k hashmap)
root.defs._get$npair = _get$npair = define('get-pair', function(_k){return function(_hashmap){return _find$nif()((function(){var $m; return function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return function(){return $m || ($m = (_head()(_x)))}})())(_k)}))}})())(_hashmap)}}, 2);
;
//get-pair-opt = AST(\k l . l \h t D . h \kk vv . eq k kk (some2 kk vv) (get-pair-opt k t) none)
root.defs._get$npair$nopt = _get$npair$nopt = define('get-pair-opt', function(_k){return function(_l){return _l()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _h()((function(){var $m; return function(){return $m || ($m = (function(_kk){return function(_vv){return _eq()(_k)(_kk)((function(){var $m; return function(){return $m || ($m = (_some2()(_kk)(_vv)))}})())((function(){var $m; return function(){return $m || ($m = (_get$npair$nopt()(_k)(_t)))}})())}}))}})())}}}))}})())(_none)}}, 2);
;
//get-value = AST(\k hashmap . (\pair . if (eq pair nil) nil (value pair)) (get-pair k hashmap))
root.defs._get$nvalue = _get$nvalue = define('get-value', function(_k){return function(_hashmap){return function(_pair){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_pair)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_value()(_pair)))}})())}((function(){var $m; return function(){return $m || ($m = (_get$npair()(_k)(_hashmap)))}})())}}, 2);
;
//get-value-default = AST(\k default hashmap . (\val . if (neq val nil) val default) (get-value k hashmap))
root.defs._get$nvalue$ndefault = _get$nvalue$ndefault = define('get-value-default', function(_k){return function(_default){return function(_hashmap){return function(_val){return _if()((function(){var $m; return function(){return $m || ($m = (_neq()(_val)(_nil)))}})())(_val)(_default)}((function(){var $m; return function(){return $m || ($m = (_get$nvalue()(_k)(_hashmap)))}})())}}}, 3);
;
//get-keys = AST(\hashmap . map \cell . key cell hashmap)
root.defs._get$nkeys = _get$nkeys = define('get-keys', function(_hashmap){return _map()((function(){var $m; return function(){return $m || ($m = (function(_cell){return _key()(_cell)}))}})())(_hashmap)}, 1);
;
//num-keys = AST(\hashmap . length (get-keys hashmap))
root.defs._num$nkeys = _num$nkeys = define('num-keys', function(_hashmap){return _length()((function(){var $m; return function(){return $m || ($m = (_get$nkeys()(_hashmap)))}})())}, 1);
;
//first-pair = AST(\hashmap . head hashmap)
root.defs._first$npair = _first$npair = define('first-pair', function(_hashmap){return _head()(_hashmap)}, 1);
;
//rest-pairs = AST(\hashmap . tail hashmap)
root.defs._rest$npairs = _rest$npairs = define('rest-pairs', function(_hashmap){return _tail()(_hashmap)}, 1);
;
//merge-hash-keys = AST(\hm1 hm2 keys . if (null? keys) hm1 (if (null? (get-pair (head keys) hm1)) (cons (get-pair (head keys) hm2) (merge-hash-keys hm1 hm2 (tail keys))) (merge-hash-keys hm1 hm2 (tail keys))))
root.defs._merge$nhash$nkeys = _merge$nhash$nkeys = define('merge-hash-keys', function(_hm1){return function(_hm2){return function(_keys){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_keys)))}})())(_hm1)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()((function(){var $m; return function(){return $m || ($m = (_get$npair()((function(){var $m; return function(){return $m || ($m = (_head()(_keys)))}})())(_hm1)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_get$npair()((function(){var $m; return function(){return $m || ($m = (_head()(_keys)))}})())(_hm2)))}})())((function(){var $m; return function(){return $m || ($m = (_merge$nhash$nkeys()(_hm1)(_hm2)((function(){var $m; return function(){return $m || ($m = (_tail()(_keys)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_merge$nhash$nkeys()(_hm1)(_hm2)((function(){var $m; return function(){return $m || ($m = (_tail()(_keys)))}})())))}})())))}})())}}}, 3);
;
//merge-hash = AST(\hm1 hm2 . merge-hash-keys hm1 hm2 (get-keys hm2))
root.defs._merge$nhash = _merge$nhash = define('merge-hash', function(_hm1){return function(_hm2){return _merge$nhash$nkeys()(_hm1)(_hm2)((function(){var $m; return function(){return $m || ($m = (_get$nkeys()(_hm2)))}})())}}, 2);
;
//remove-hash = AST(\k hashmap . remove-if \x . eq (key x) k hashmap)
root.defs._remove$nhash = _remove$nhash = define('remove-hash', function(_k){return function(_hashmap){return _remove$nif()((function(){var $m; return function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return function(){return $m || ($m = (_key()(_x)))}})())(_k)}))}})())(_hashmap)}}, 2);
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)