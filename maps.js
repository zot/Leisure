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

var _add$nhash, _key, _value, _get$npair, _get$nvalue, _get$nvalue$ndefault, _remove$nhash;
//add-hash = AST(\k v hashmap . cons (cons k v) (remove-hash k hashmap))
root.defs._add$nhash = _add$nhash = define('add-hash', function(_k){return function(_v){return function(_hashmap){return _cons()((function(){var $m; return function(){return $m || ($m = (_cons()(_k)(_v)))}})())((function(){var $m; return function(){return $m || ($m = (_remove$nhash()(_k)(_hashmap)))}})())}}});
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
//remove-hash = AST(\k hashmap . remove-if \x . eq (head x) k hashmap)
root.defs._remove$nhash = _remove$nhash = define('remove-hash', function(_k){return function(_hashmap){return _remove$nif()((function(){var $m; return function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return function(){return $m || ($m = (_head()(_x)))}})())(_k)}))}})())(_hashmap)}});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)