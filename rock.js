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
root.macros = {};

var setType = Lazp.setType;
var setDataType = Lazp.setDataType;
var define = Lazp.define;
var defineMacro = Lazp.defineMacro;
var defineToken = Lazp.defineToken;
var processResult = Repl.processResult;

var _main;
//main = AST(bind (js ([ moveRock() ])) \_ . bind (js ([ moveRock() ])) \_ . bind (js ([ moveRock() ])) \_ . js ([ moveRock() ]))
root.defs._main = _main = define('main', _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())}))}})())}))}})())}))}})()));
;

if (typeof window !== 'undefined' && window !== null) {
  Lazp.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)