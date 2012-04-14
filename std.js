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
root.macros = {};

var setType = Lazp.setType;
var setDataType = Lazp.setDataType;
var define = Lazp.define;
var defineMacro = Lazp.defineMacro;
var defineToken = Lazp.defineToken;
var processResult = Repl.processResult;

var _id, _true, _false, _and, _or, _cons, _nil, _append, _$r, _$b, _$s, _$q, _dl, _dlAppend, _dlList, _identMacro, _do, _subdo;
//id = \x . x
root.defs._id = _id = define('id', function(_x){return _x()});
;
//true = \a b . a
root.defs._true = _true = define('true', setType(function(_a){return function(_b){return _a()}}, 'true'));
;
//false = \a b . b
root.defs._false = _false = define('false', setType(function(_a){return function(_b){return _b()}}, 'false'));
;
//and = \a b . a b false
root.defs._and = _and = define('and', function(_a){return function(_b){return _a()(_b)(_false)}});
;
//or = \a . a true
root.defs._or = _or = define('or', function(_a){return _a()(_true)});
;
//cons = \a b f . f a b
root.defs._cons = _cons = define('cons', setDataType(function(_a){return function(_b){return setType(function(_f){return _f()(_a)(_b)}, 'cons')}}, 'cons'));
;
//nil = \a b . b
root.defs._nil = _nil = define('nil', setType(function(_a){return function(_b){return _b()}}, 'nil'));
;
//append = \l1 l2 . l1 \h t D . cons h (append t l2) l2
root.defs._append = _append = define('append', function(_l1){return function(_l2){return _l1()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){var $m; return function(){return $m || ($m = (_append()(_t)(_l2)))}})())}}}))}})())(_l2)}});
;
//[ = \item c . c \rest . cons item rest
root.defs._$r = _$r = define('[', setType(function(_item){return function(_c){return _c()((function(){var $m; return function(){return $m || ($m = (function(_rest){return _cons()(_item)(_rest)}))}})())}}, '['));
root.tokenDefs.push('[', '=(]=');
;
//, = \f item c . c \rest . f (cons item rest)
root.defs._$b = _$b = define(',', setType(function(_f){return function(_item){return function(_c){return _c()((function(){var $m; return function(){return $m || ($m = (function(_rest){return _f()((function(){var $m; return function(){return $m || ($m = (_cons()(_item)(_rest)))}})())}))}})())}}}, ','));
root.tokenDefs.push(',', '=.=');
;
//] = \f . f nil
root.defs._$s = _$s = define(']', setType(function(_f){return _f()(_nil)}, ']'));
root.tokenDefs.push(']', '=)=');
;
//| = \f rest g . f rest
root.defs._$q = _$q = define('|', setType(function(_f){return function(_rest){return function(_g){return _f()(_rest)}}}, '|'));
root.tokenDefs.push('|', '=.=');
;
//dl = \list . append list
root.defs._dl = _dl = define('dl', function(_list){return _append()(_list)});
;
//dlAppend = \da db list . da (db list)
root.defs._dlAppend = _dlAppend = define('dlAppend', function(_da){return function(_db){return function(_list){return _da()((function(){var $m; return function(){return $m || ($m = (_db()(_list)))}})())}}});
;
//dlList = \dl . dl nil
root.defs._dlList = _dlList = define('dlList', function(_dl){return _dl()(_nil)});
;
//identMacro = \apl . apl \f a . is f ref a (apply (identMacro f) a)
root.defs._identMacro = _identMacro = defineMacro('identMacro', function(_apl){return _apl()((function(){var $m; return function(){return $m || ($m = (function(_f){return function(_a){return _is()(_f)(_ref)(_a)((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_identMacro()(_f)))}})())(_a)))}})())}}))}})())});
root.tokenDefs.push('identMacro', '=M=');
;
//do = \apl . apl \f a . subdo a f
root.defs._do = _do = defineMacro('do', function(_apl){return _apl()((function(){var $m; return function(){return $m || ($m = (function(_f){return function(_a){return _subdo()(_a)(_f)}}))}})())});
root.tokenDefs.push('do', '=M=');
;
//subdo = \a f . is f ref a (f \f2 a2 . subdo (and (is a2 apply) (a2 \f3 a3 . and (or (is f3 ref) (is f3 lit)) (eq a3 <-)) (a2 \f3 expr . f3 \f4 _ . f4 \v . apply (apply (ref bind) expr) (lambda v a)) (apply (apply (ref bind) a2) (lambda _ a))) f2)
root.defs._subdo = _subdo = define('subdo', function(_a){return function(_f){return _is()(_f)(_ref)(_a)((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (function(_f2){return function(_a2){return _subdo()((function(){var $m; return function(){return $m || ($m = (_and()((function(){var $m; return function(){return $m || ($m = (_is()(_a2)(_apply)))}})())((function(){var $m; return function(){return $m || ($m = (_a2()((function(){var $m; return function(){return $m || ($m = (function(_f3){return function(_a3){return _and()((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_is()(_f3)(_ref)))}})())((function(){var $m; return function(){return $m || ($m = (_is()(_f3)(_lit)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_a3)((function(){return "<-"}))))}})())}}))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_a2()((function(){var $m; return function(){return $m || ($m = (function(_f3){return function(_expr){return _f3()((function(){var $m; return function(){return $m || ($m = (function(_f4){return function(__){return _f4()((function(){var $m; return function(){return $m || ($m = (function(_v){return _apply()((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_ref()((function(){return "bind"}))))}})())(_expr)))}})())((function(){var $m; return function(){return $m || ($m = (_lambda()(_v)(_a)))}})())}))}})())}}))}})())}}))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_ref()((function(){return "bind"}))))}})())(_a2)))}})())((function(){var $m; return function(){return $m || ($m = (_lambda()((function(){return "_"}))(_a)))}})())))}})())))}})())(_f2)}}))}})())))}})())}});
;

if (typeof window !== 'undefined' && window !== null) {
  Lazp.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)