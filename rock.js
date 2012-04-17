(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  rock = root = {};
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

var _main, _clickRock;
//main = AST(bind (js ([ getRockBounds() ])) \bbox . bind (bbox \x y w h . print (concat ([ Rock x:  , x , , y:  , y , , w:  , w , , h:  , h ]))) \_ . bind (js ([ moveRock() ])) \_ . bind (js ([ moveRock() ])) \_ . bind (js ([ moveRock() ])) \_ . js ([ moveRock() ]))
root.defs._main = _main = define('main', _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "getRockBounds()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(_bbox){return _bind()((function(){var $m; return function(){return $m || ($m = (_bbox()((function(){var $m; return function(){return $m || ($m = (function(_x){return function(_y){return function(_w){return function(_h){return _print()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Rock x: "}))(_$b)(_x)(_$b)((function(){return ", y: "}))(_$b)(_y)(_$b)((function(){return ", w: "}))(_$b)(_w)(_$b)((function(){return ", h: "}))(_$b)(_h)(_$s)))}})())))}})())}}}}))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "moveRock()"}))(_$s)))}})())}))}})())}))}})())}))}})())}))}})())}))}})()));
;
//clickRock = AST(\e . print (concat ([ event x:  , (eventX e) , , target:  , (eventTargetId e) ])))
root.defs._clickRock = _clickRock = define('clickRock', function(_e){return _print()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "event x: "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_eventX()(_e)))}})())(_$b)((function(){return ", target: "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_eventTargetId()(_e)))}})())(_$s)))}})())))}})())});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)