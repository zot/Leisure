(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  std = root = {};
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

var _id, _true, _false, _cons, _nil, _append, _$r, _$b, _$s, _$q, _dl, _dlAppend, _dlList;
//id = lambda x . ref x
root.defs._id = _id = define('id', function(_x){return _x()});
;
//true = lambda a . lambda b . ref a
root.defs._true = _true = define('true', setType(function(_a){return function(_b){return _a()}}, 'true'));
;
//false = lambda a . lambda b . ref b
root.defs._false = _false = define('false', setType(function(_a){return function(_b){return _b()}}, 'false'));
;
//cons = lambda a . lambda b . lambda f . apply (apply (ref f) (ref a)) (ref b)
root.defs._cons = _cons = define('cons', setDataType(function(_a){return function(_b){return setType(function(_f){return _f()(_a)(_b)}, 'cons')}}, 'cons'));
;
//nil = lambda a . lambda b . ref b
root.defs._nil = _nil = define('nil', setType(function(_a){return function(_b){return _b()}}, 'nil'));
;
//append = lambda l1 . lambda l2 . apply (apply (ref l1) (lambda h . lambda t . lambda D . apply (apply (ref cons) (ref h)) (apply (apply (ref append) (ref t)) (ref l2)))) (ref l2)
root.defs._append = _append = define('append', function(_l1){return function(_l2){return _l1()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){var $m; return function(){return $m || ($m = (_append()(_t)(_l2)))}})())}}}))}})())(_l2)}});
;
//[ = lambda item . lambda c . apply (ref c) (lambda rest . apply (apply (ref cons) (ref item)) (ref rest))
root.defs._$r = _$r = define('[', setType(function(_item){return function(_c){return _c()((function(){var $m; return function(){return $m || ($m = (function(_rest){return _cons()(_item)(_rest)}))}})())}}, '['));
root.tokenDefs.push('[', '=(]=');
;
//, = lambda f . lambda item . lambda c . apply (ref c) (lambda rest . apply (ref f) (apply (apply (ref cons) (ref item)) (ref rest)))
root.defs._$b = _$b = define(',', setType(function(_f){return function(_item){return function(_c){return _c()((function(){var $m; return function(){return $m || ($m = (function(_rest){return _f()((function(){var $m; return function(){return $m || ($m = (_cons()(_item)(_rest)))}})())}))}})())}}}, ','));
root.tokenDefs.push(',', '=.=');
;
//] = lambda f . apply (ref f) (ref nil)
root.defs._$s = _$s = define(']', setType(function(_f){return _f()(_nil)}, ']'));
root.tokenDefs.push(']', '=)=');
;
//| = lambda f . lambda rest . lambda g . apply (ref f) (ref rest)
root.defs._$q = _$q = define('|', setType(function(_f){return function(_rest){return function(_g){return _f()(_rest)}}}, '|'));
root.tokenDefs.push('|', '=.=');
;
//dl = lambda list . apply (ref append) (ref list)
root.defs._dl = _dl = define('dl', function(_list){return _append()(_list)});
;
//dlAppend = lambda da . lambda db . lambda list . apply (ref da) (apply (ref db) (ref list))
root.defs._dlAppend = _dlAppend = define('dlAppend', function(_da){return function(_db){return function(_list){return _da()((function(){var $m; return function(){return $m || ($m = (_db()(_list)))}})())}}});
;
//lambda dl . apply (ref dl) (ref nil)
define('dlList', function(_dl){return _dl()(_nil)});
;

if (typeof window !== 'undefined' && window !== null) {
  Lazp.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)