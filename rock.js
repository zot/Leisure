(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  rock = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Lazp = require('./lazp');
  Lazp.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];

var setType = Lazp.setType;
var setDataType = Lazp.setDataType;
var define = Lazp.define;
var defineToken = Lazp.defineToken;
var processResult = Repl.processResult;

var _main;
//main = apply (apply (ref js) (apply (apply (ref [) (lit moveRock())) (ref ]))) (lambda _ . apply (apply (ref js) (apply (apply (ref [) (lit moveRock())) (ref ]))) (lambda _ . apply (apply (ref js) (apply (apply (ref [) (lit moveRock())) (ref ]))) (lambda _ . apply (apply (ref js) (apply (apply (ref [) (lit moveRock())) (ref ]))) (ref end))))
root.defs._main = _main = define('main', _js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())(_end)}))}})())}))}})())}))}})()));
;

if (typeof window !== 'undefined' && window !== null) {
  Lazp.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)