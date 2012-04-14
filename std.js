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

var _id, _true, _false, _and, _or, _cons, _nil, _append, _$r, _$b, _$s, _$q, _dl, _dlAppend, _dlList, _identMacro, _left, _right, _some, _none, _tuple3, _m_extractVar;
//id = AST(\x . x)
root.defs._id = _id = define('id', function(_x){return _x()});
;
//true = AST(\a b . a)
root.defs._true = _true = define('true', setType(function(_a){return function(_b){return _a()}}, 'true'));
;
//false = AST(\a b . b)
root.defs._false = _false = define('false', setType(function(_a){return function(_b){return _b()}}, 'false'));
;
//and = AST(\a b . a b false)
root.defs._and = _and = define('and', function(_a){return function(_b){return _a()(_b)(_false)}});
;
//or = AST(\a . a true)
root.defs._or = _or = define('or', function(_a){return _a()(_true)});
;
//cons = AST(\a b f . f a b)
root.defs._cons = _cons = define('cons', setDataType(function(_a){return function(_b){return setType(function(_f){return _f()(_a)(_b)}, 'cons')}}, 'cons'));
;
//nil = AST(\a b . b)
root.defs._nil = _nil = define('nil', setType(function(_a){return function(_b){return _b()}}, 'nil'));
;
//append = AST(\l1 l2 . l1 \h t D . cons h (append t l2) l2)
root.defs._append = _append = define('append', function(_l1){return function(_l2){return _l1()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){var $m; return function(){return $m || ($m = (_append()(_t)(_l2)))}})())}}}))}})())(_l2)}});
;
//[ = AST(\item c . c \rest . cons item rest)
root.defs._$r = _$r = define('[', setType(function(_item){return function(_c){return _c()((function(){var $m; return function(){return $m || ($m = (function(_rest){return _cons()(_item)(_rest)}))}})())}}, '['));
root.tokenDefs.push('[', '=(]=');
;
//, = AST(\f item c . c \rest . f (cons item rest))
root.defs._$b = _$b = define(',', setType(function(_f){return function(_item){return function(_c){return _c()((function(){var $m; return function(){return $m || ($m = (function(_rest){return _f()((function(){var $m; return function(){return $m || ($m = (_cons()(_item)(_rest)))}})())}))}})())}}}, ','));
root.tokenDefs.push(',', '=.=');
;
//] = AST(\f . f nil)
root.defs._$s = _$s = define(']', setType(function(_f){return _f()(_nil)}, ']'));
root.tokenDefs.push(']', '=)=');
;
//| = AST(\f rest g . f rest)
root.defs._$q = _$q = define('|', setType(function(_f){return function(_rest){return function(_g){return _f()(_rest)}}}, '|'));
root.tokenDefs.push('|', '=.=');
;
//dl = AST(\list . append list)
root.defs._dl = _dl = define('dl', function(_list){return _append()(_list)});
;
//dlAppend = AST(\da db list . da (db list))
root.defs._dlAppend = _dlAppend = define('dlAppend', function(_da){return function(_db){return function(_list){return _da()((function(){var $m; return function(){return $m || ($m = (_db()(_list)))}})())}}});
;
//dlList = AST(\dl . dl nil)
root.defs._dlList = _dlList = define('dlList', function(_dl){return _dl()(_nil)});
;
//identMacro = AST(\apl . apl \f a . is f ref a (apply (identMacro f) a))
root.defs._identMacro = _identMacro = defineMacro('identMacro', function(_apl){return _apl()((function(){var $m; return function(){return $m || ($m = (function(_f){return function(_a){return _is()(_f)(_ref)(_a)((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_identMacro()(_f)))}})())(_a)))}})())}}))}})())});
root.tokenDefs.push('identMacro', '=M=');
;
//left = AST(\v l r . l v)
root.defs._left = _left = define('left', setDataType(function(_v){return setType(function(_l){return function(_r){return _l()(_v)}}, 'left')}, 'left'));
;
//right = AST(\v l r . r v)
root.defs._right = _right = define('right', setDataType(function(_v){return setType(function(_l){return function(_r){return _r()(_v)}}, 'right')}, 'right'));
;
//some = AST(\x yes no . yes x)
root.defs._some = _some = define('some', setDataType(function(_x){return setType(function(_yes){return function(_no){return _yes()(_x)}}, 'some')}, 'some'));
;
//none = AST(\yes no . no)
root.defs._none = _none = define('none', setType(function(_yes){return function(_no){return _no()}}, 'none'));
;
//tuple3 = AST(\a b c f . f a b c)
root.defs._tuple3 = _tuple3 = define('tuple3', setDataType(function(_a){return function(_b){return function(_c){return setType(function(_f){return _f()(_a)(_b)(_c)}, 'tuple3')}}}, 'tuple3'));
;
//m_extractVar = AST(\ast . is ast apply (ast \f arg . is f apply (f \innerF innerA . and (is innerF ref) (eq innerA <-) (some (cons arg (innerF id))) (m_extractVar f \l . l \innerAst var . some (cons (apply innerAst arg) var) none)) none) none)
root.defs._m_extractVar = _m_extractVar = define('m_extractVar', function(_ast){return _is()(_ast)(_apply)((function(){var $m; return function(){return $m || ($m = (_ast()((function(){var $m; return function(){return $m || ($m = (function(_f){return function(_arg){return _is()(_f)(_apply)((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (function(_innerF){return function(_innerA){return _and()((function(){var $m; return function(){return $m || ($m = (_is()(_innerF)(_ref)))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_innerA)((function(){return "<-"}))))}})())((function(){var $m; return function(){return $m || ($m = (_some()((function(){var $m; return function(){return $m || ($m = (_cons()(_arg)((function(){var $m; return function(){return $m || ($m = (_innerF()(_id)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_m_extractVar()(_f)((function(){var $m; return function(){return $m || ($m = (function(_l){return _l()((function(){var $m; return function(){return $m || ($m = (function(_innerAst){return function(_var){return _some()((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_apply()(_innerAst)(_arg)))}})())(_var)))}})())}}))}})())}))}})())(_none)))}})())}}))}})())))}})())(_none)}}))}})())))}})())(_none)});
;

if (typeof window !== 'undefined' && window !== null) {
  Lazp.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)