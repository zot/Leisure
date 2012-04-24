(function(){
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

var _add$nhash, _hash$nfrom$nlist, _key, _value, _get$npair, _get$nvalue, _get$nvalue$ndefault, _get$nkeys, _num$nkeys, _first$npair, _rest$npairs, _merge$nhash$nkeys, _merge$nhash, _remove$nhash;
//add-hash = AST(\k v hashmap . cons (cons k v) (remove-hash k hashmap))
root.defs._add$nhash = _add$nhash = define('add-hash', function(_k){return function(_v){return function(_hashmap){return _cons()((function(){var $m; return function(){return $m || ($m = (_cons()(_k)(_v)))}})())((function(){var $m; return function(){return $m || ($m = (_remove$nhash()(_k)(_hashmap)))}})())}}});
;
//hash-from-list = AST(\l . if (null? l) nil (add-hash (head l) (head (tail l)) (hash-from-list (tail (tail l)))))
root.defs._hash$nfrom$nlist = _hash$nfrom$nlist = define('hash-from-list', function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_l)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_add$nhash()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())((function(){var $m; return function(){return $m || ($m = (_head()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_hash$nfrom$nlist()((function(){var $m; return function(){return $m || ($m = (_tail()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())))}})())))}})())});
;
//key = AST(\cons . head cons)
root.defs._key = _key = define('key', function(_cons){return _head()(_cons)});
;
//value = AST(\cons . tail cons)
root.defs._value = _value = define('value', function(_cons){return _tail()(_cons)});
;
//get-pair = AST(\k hashmap . find-if \x . eq (head x) k hashmap)
root.defs._get$npair = _get$npair = define('get-pair', function(_k){return function(_hashmap){return _find$nif()((function(){var $m; return function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return function(){return $m || ($m = (_head()(_x)))}})())(_k)}))}})())(_hashmap)}});
;
//get-value = AST(\k hashmap . (\pair . if (eq pair nil) nil (value pair)) (get-pair k hashmap))
root.defs._get$nvalue = _get$nvalue = define('get-value', function(_k){return function(_hashmap){return function(_pair){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_pair)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_value()(_pair)))}})())}((function(){var $m; return function(){return $m || ($m = (_get$npair()(_k)(_hashmap)))}})())}});
;
//get-value-default = AST(\k default hashmap . (\val . if (neq val nil) val default) (get-value k hashmap))
root.defs._get$nvalue$ndefault = _get$nvalue$ndefault = define('get-value-default', function(_k){return function(_default){return function(_hashmap){return function(_val){return _if()((function(){var $m; return function(){return $m || ($m = (_neq()(_val)(_nil)))}})())(_val)(_default)}((function(){var $m; return function(){return $m || ($m = (_get$nvalue()(_k)(_hashmap)))}})())}}});
;
//get-keys = AST(\hashmap . map \cell . key cell hashmap)
root.defs._get$nkeys = _get$nkeys = define('get-keys', function(_hashmap){return _map()((function(){var $m; return function(){return $m || ($m = (function(_cell){return _key()(_cell)}))}})())(_hashmap)});
;
//num-keys = AST(\hashmap . length (get-keys hashmap))
root.defs._num$nkeys = _num$nkeys = define('num-keys', function(_hashmap){return _length()((function(){var $m; return function(){return $m || ($m = (_get$nkeys()(_hashmap)))}})())});
;
//first-pair = AST(\hashmap . head hashmap)
root.defs._first$npair = _first$npair = define('first-pair', function(_hashmap){return _head()(_hashmap)});
;
//rest-pairs = AST(\hashmap . tail hashmap)
root.defs._rest$npairs = _rest$npairs = define('rest-pairs', function(_hashmap){return _tail()(_hashmap)});
;
//merge-hash-keys = AST(\hm1 hm2 keys . if (null? keys) hm1 (if (null? (get-pair (head keys) hm1)) (cons (get-pair (head keys) hm2) (merge-hash-keys hm1 hm2 (tail keys))) (merge-hash-keys hm1 hm2 (tail keys))))
root.defs._merge$nhash$nkeys = _merge$nhash$nkeys = define('merge-hash-keys', function(_hm1){return function(_hm2){return function(_keys){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_keys)))}})())(_hm1)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()((function(){var $m; return function(){return $m || ($m = (_get$npair()((function(){var $m; return function(){return $m || ($m = (_head()(_keys)))}})())(_hm1)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_get$npair()((function(){var $m; return function(){return $m || ($m = (_head()(_keys)))}})())(_hm2)))}})())((function(){var $m; return function(){return $m || ($m = (_merge$nhash$nkeys()(_hm1)(_hm2)((function(){var $m; return function(){return $m || ($m = (_tail()(_keys)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_merge$nhash$nkeys()(_hm1)(_hm2)((function(){var $m; return function(){return $m || ($m = (_tail()(_keys)))}})())))}})())))}})())}}});
;
//merge-hash = AST(\hm1 hm2 . merge-hash-keys hm1 hm2 (get-keys hm2))
root.defs._merge$nhash = _merge$nhash = define('merge-hash', function(_hm1){return function(_hm2){return _merge$nhash$nkeys()(_hm1)(_hm2)((function(){var $m; return function(){return $m || ($m = (_get$nkeys()(_hm2)))}})())}});
;
//remove-hash = AST(\k hashmap . remove-if \x . eq (key x) k hashmap)
root.defs._remove$nhash = _remove$nhash = define('remove-hash', function(_k){return function(_hashmap){return _remove$nif()((function(){var $m; return function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return function(){return $m || ($m = (_key()(_x)))}})())(_k)}))}})())(_hashmap)}});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)