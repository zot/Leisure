var chip = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  chip = root = {};
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

var _LEFT_ARROW, _UP_ARROW, _RIGHT_ARROW, _DOWN_ARROW, _startChippy, _runPhysics, _key, _boink;
//LEFT_ARROW = AST(37)
root.defs._LEFT_ARROW = _LEFT_ARROW = define('LEFT_ARROW', 37);
;
//UP_ARROW = AST(38)
root.defs._UP_ARROW = _UP_ARROW = define('UP_ARROW', 38);
;
//RIGHT_ARROW = AST(39)
root.defs._RIGHT_ARROW = _RIGHT_ARROW = define('RIGHT_ARROW', 39);
;
//DOWN_ARROW = AST(40)
root.defs._DOWN_ARROW = _DOWN_ARROW = define('DOWN_ARROW', 40);
;
//startChippy = AST(\e . bind startPhysics \_ . runPhysics)
root.defs._startChippy = _startChippy = define('startChippy', function(_e){return _bind()(_startPhysics)((function(){var $m; return function(){return $m || ($m = (function(__){return _runPhysics()}))}})())});
;
//runPhysics = AST(bind (js ([ Chippy.showArbitersAndContacts() ])) \_ . bind stepPhysics \_ . runPhysics)
root.defs._runPhysics = _runPhysics = define('runPhysics', _bind()((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Chippy.showArbitersAndContacts()"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()(_stepPhysics)((function(){var $m; return function(){return $m || ($m = (function(__){return _runPhysics()}))}})())}))}})()));
;
//key = AST(\e . (\c . eq c LEFT_ARROW (js ([ Chippy.boulder.body.w -= 0.5 ])) (eq c RIGHT_ARROW (js ([ Chippy.boulder.body.w += 0.5 ])) false)) (eventKeyCode e))
root.defs._key = _key = define('key', function(_e){return function(_c){return _eq()(_c)(_LEFT_ARROW)((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Chippy.boulder.body.w -= 0.5"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_c)(_RIGHT_ARROW)((function(){var $m; return function(){return $m || ($m = (_js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Chippy.boulder.body.w += 0.5"}))(_$s)))}})())))}})())(_false)))}})())}((function(){var $m; return function(){return $m || ($m = (_eventKeyCode()(_e)))}})())});
;
//boink = AST(\e . js ([ console.log("boink!") ]))
root.defs._boink = _boink = define('boink', function(_e){return _js()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "console.log(\"boink!\")"}))(_$s)))}})())});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)