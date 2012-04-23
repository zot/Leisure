(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  rnd = root = {};
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

var _derp, _make_list, _count_down, _count_up, _removeAt, _shuffle, _test;
//derp = AST(bind (randInt 0 15) \r . print r)
root.defs._derp = _derp = define('derp', _bind()((function(){var $m; return function(){return $m || ($m = (_randInt()((function(){return 0}))((function(){return 15}))))}})())((function(){var $m; return function(){return $m || ($m = (function(_r){return _print()(_r)}))}})()));
;
//make_list = AST(\e c . if (eq c 0) nil (cons e (make_list e (-- c))))
root.defs._make_list = _make_list = define('make_list', function(_e){return function(_c){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_c)((function(){return 0}))))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_cons()(_e)((function(){var $m; return function(){return $m || ($m = (_make_list()(_e)((function(){var $m; return function(){return $m || ($m = (_$n$n()(_c)))}})())))}})())))}})())}});
;
//count_down = AST(\c . if (eq c -1) nil (cons c (count_down (-- c))))
root.defs._count_down = _count_down = define('count_down', function(_c){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_c)((function(){return -1}))))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_cons()(_c)((function(){var $m; return function(){return $m || ($m = (_count_down()((function(){var $m; return function(){return $m || ($m = (_$n$n()(_c)))}})())))}})())))}})())});
;
//count_up = AST(\c . reverse (count_down c))
root.defs._count_up = _count_up = define('count_up', function(_c){return _reverse()((function(){var $m; return function(){return $m || ($m = (_count_down()(_c)))}})())});
;
//removeAt = AST(\i list . append (take i list) (drop (++ i) list))
root.defs._removeAt = _removeAt = define('removeAt', function(_i){return function(_list){return _append()((function(){var $m; return function(){return $m || ($m = (_take()(_i)(_list)))}})())((function(){var $m; return function(){return $m || ($m = (_drop()((function(){var $m; return function(){return $m || ($m = (_$o$o()(_i)))}})())(_list)))}})())}});
;
//shuffle = AST(\list . if (eq list nil) (log at end of list! nil) (bind (randInt 0 (-- (length list))) \index . (\len . (\rest . bind (if (eq len 1) list (cons (at list index) (shuffle rest))) \ret . print ret) (removeAt index list)) (length list)))
root.defs._shuffle = _shuffle = define('shuffle', function(_list){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_list)(_nil)))}})())((function(){var $m; return function(){return $m || ($m = (_log()((function(){return "at end of list!"}))(_nil)))}})())((function(){var $m; return function(){return $m || ($m = (_bind()((function(){var $m; return function(){return $m || ($m = (_randInt()((function(){return 0}))((function(){var $m; return function(){return $m || ($m = (_$n$n()((function(){var $m; return function(){return $m || ($m = (_length()(_list)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(_index){return function(_len){return function(_rest){return _bind()((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_eq()(_len)((function(){return 1}))))}})())(_list)((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_at()(_list)(_index)))}})())((function(){var $m; return function(){return $m || ($m = (_shuffle()(_rest)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(_ret){return _print()(_ret)}))}})())}((function(){var $m; return function(){return $m || ($m = (_removeAt()(_index)(_list)))}})())}((function(){var $m; return function(){return $m || ($m = (_length()(_list)))}})())}))}})())))}})())});
;
//test = AST(shuffle (count_up 3))
root.defs._test = _test = define('test', _shuffle()((function(){var $m; return function(){return $m || ($m = (_count_up()((function(){return 3}))))}})()));
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)