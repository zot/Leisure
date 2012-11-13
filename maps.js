var maps = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  maps = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  Leisure.req('./prelude');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};


var Nil = Parse.Nil;
var cons = Parse.cons;
var primCons = Parse.primCons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var wrapContext = Leisure.wrapContext;
var markLeisureErrors = Leisure.markLeisureErrors;//addHash = AST(λk v hashmap . cons (cons k v) (removeHash k hashmap))
root.defs._addHash = _addHash = Parse.define('addHash', (function() {var f; return function _addHash(){return f || (f = (function(_k){return function(_v){return function(_hashmap){return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()(_k)(_v)))})})())((function(){var $m; return (function(){return $m || ($m = (_removeHash()(_k)(_hashmap)))})})());};};}));}})(), 3, "\\k v hashmap . cons (cons k v) (removeHash k hashmap)");;
//hashFromList = AST(λl . if (null? l) nil (addHash (head l) (head (tail l)) (hashFromList (tail (tail l)))))
root.defs._hashFromList = _hashFromList = Parse.define('hashFromList', (function() {var f; return function _hashFromList(){return f || (f = (function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_l)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_addHash()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_head()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_hashFromList()((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())))})})());}));}})(), 1, "\\l . if (null? l) nil\n  addHash (head l) (head (tail l)) (hashFromList (tail (tail l)))");;
//key = AST(λcons . head cons)
root.defs._key = _key = Parse.define('key', (function() {var f; return function _key(){return f || (f = (function(_cons){return _head()(_cons);}));}})(), 1, "\\cons . head cons");;
//value = AST(λcons . tail cons)
root.defs._value = _value = Parse.define('value', (function() {var f; return function _value(){return f || (f = (function(_cons){return _tail()(_cons);}));}})(), 1, "\\cons . tail cons");;
//getPair = AST(λk hashmap . findIf λx . eq (head x) k hashmap)
root.defs._getPair = _getPair = Parse.define('getPair', (function() {var f; return function _getPair(){return f || (f = (function(_k){return function(_hashmap){return _findIf()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return (function(){return $m || ($m = (_head()(_x)))})})())(_k);}))})})())(_hashmap);};}));}})(), 2, "\\k hashmap . findIf (\\x . eq (head x) k) hashmap");;
//getPairOpt = AST(λk l . l λh t D . h λkk vv . eq k kk (some2 kk vv) (getPairOpt k t) none)
root.defs._getPairOpt = _getPairOpt = Parse.define('getPairOpt', (function() {var f; return function _getPairOpt(){return f || (f = (function(_k){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _h()((function(){var $m; return (function(){return $m || ($m = (function(_kk){return function(_vv){return _eq()(_k)(_kk)((function(){var $m; return (function(){return $m || ($m = (_some2()(_kk)(_vv)))})})())((function(){var $m; return (function(){return $m || ($m = (_getPairOpt()(_k)(_t)))})})());};}))})})());};};}))})})())(_none);};}));}})(), 2, "\\k l . l (\\h t D . h (\\kk vv . (eq k kk) (some2 kk vv) (getPairOpt k t))) none");;
//getHashValue = AST(λk hashmap . (λpair . if (eq pair nil) nil (value pair)) (getPair k hashmap))
root.defs._getHashValue = _getHashValue = Parse.define('getHashValue', (function() {var f; return function _getHashValue(){return f || (f = (function(_k){return function(_hashmap){return function(_pair){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_pair)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_value()(_pair)))})})());}((function(){var $m; return (function(){return $m || ($m = (_getPair()(_k)(_hashmap)))})})());};}));}})(), 2, "\\k hashmap . (\\pair. if (eq pair nil) nil (value pair)) (getPair k hashmap)");;
//getHashValueDefault = AST(λk default hashmap . (λval . if (neq val nil) val default) (getHashValue k hashmap))
root.defs._getHashValueDefault = _getHashValueDefault = Parse.define('getHashValueDefault', (function() {var f; return function _getHashValueDefault(){return f || (f = (function(_k){return function(_default){return function(_hashmap){return function(_val){return _if()((function(){var $m; return (function(){return $m || ($m = (_neq()(_val)(_nil)))})})())(_val)(_default);}((function(){var $m; return (function(){return $m || ($m = (_getHashValue()(_k)(_hashmap)))})})());};};}));}})(), 3, "\\k default hashmap . do\n  val = getHashValue k hashmap\n  if (neq val nil) val default");;
//getKeys = AST(λhashmap . map λcell . key cell hashmap)
root.defs._getKeys = _getKeys = Parse.define('getKeys', (function() {var f; return function _getKeys(){return f || (f = (function(_hashmap){return _map()((function(){var $m; return (function(){return $m || ($m = (function(_cell){return _key()(_cell);}))})})())(_hashmap);}));}})(), 1, "\\hashmap . map (\\cell . (key cell)) hashmap");;
//numKeys = AST(λhashmap . length (getKeys hashmap))
root.defs._numKeys = _numKeys = Parse.define('numKeys', (function() {var f; return function _numKeys(){return f || (f = (function(_hashmap){return _length()((function(){var $m; return (function(){return $m || ($m = (_getKeys()(_hashmap)))})})());}));}})(), 1, "\\hashmap . length (getKeys hashmap)");;
//firstPair = AST(λhashmap . head hashmap)
root.defs._firstPair = _firstPair = Parse.define('firstPair', (function() {var f; return function _firstPair(){return f || (f = (function(_hashmap){return _head()(_hashmap);}));}})(), 1, "\\hashmap . head hashmap");;
//restPairs = AST(λhashmap . tail hashmap)
root.defs._restPairs = _restPairs = Parse.define('restPairs', (function() {var f; return function _restPairs(){return f || (f = (function(_hashmap){return _tail()(_hashmap);}));}})(), 1, "\\hashmap . tail hashmap");;
//mergeHashKeys = AST(λhm1 hm2 keys . if (null? keys) hm1 (if (null? (getPair (head keys) hm1)) (cons (getPair (head keys) hm2) (mergeHashKeys hm1 hm2 (tail keys))) (mergeHashKeys hm1 hm2 (tail keys))))
root.defs._mergeHashKeys = _mergeHashKeys = Parse.define('mergeHashKeys', (function() {var f; return function _mergeHashKeys(){return f || (f = (function(_hm1){return function(_hm2){return function(_keys){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_keys)))})})())(_hm1)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()((function(){var $m; return (function(){return $m || ($m = (_getPair()((function(){var $m; return (function(){return $m || ($m = (_head()(_keys)))})})())(_hm1)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_getPair()((function(){var $m; return (function(){return $m || ($m = (_head()(_keys)))})})())(_hm2)))})})())((function(){var $m; return (function(){return $m || ($m = (_mergeHashKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_tail()(_keys)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_mergeHashKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_tail()(_keys)))})})())))})})())))})})());};};}));}})(), 3, "\\hm1 hm2 keys . if (null? keys) hm1\n  if (null? (getPair (head keys) hm1) )\n    cons (getPair (head keys) hm2) (mergeHashKeys hm1 hm2 (tail keys))\n    mergeHashKeys hm1 hm2 (tail keys)");;
//mergeHash = AST(λhm1 hm2 . mergeHashKeys hm1 hm2 (getKeys hm2))
root.defs._mergeHash = _mergeHash = Parse.define('mergeHash', (function() {var f; return function _mergeHash(){return f || (f = (function(_hm1){return function(_hm2){return _mergeHashKeys()(_hm1)(_hm2)((function(){var $m; return (function(){return $m || ($m = (_getKeys()(_hm2)))})})());};}));}})(), 2, "\\hm1 hm2 . mergeHashKeys hm1 hm2 (getKeys hm2)");;
//removeHash = AST(λk hashmap . removeIf λx . eq (key x) k hashmap)
root.defs._removeHash = _removeHash = Parse.define('removeHash', (function() {var f; return function _removeHash(){return f || (f = (function(_k){return function(_hashmap){return _removeIf()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return (function(){return $m || ($m = (_key()(_x)))})})())(_k);}))})})())(_hashmap);};}));}})(), 2, "\\k hashmap . removeIf (\\x . eq (key x) k) hashmap");;

//if (typeof window !== 'undefined' && window !== null) {
//  Leisure.processTokenDefs(root.tokenDefs);
//}
return root;
}).call(this)