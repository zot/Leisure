(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  std = root = {};
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

var _id, _true, _false, _and, _or, _not, _neq, _left, _right, _some, _some2, _none, _cons, _nil, _append, _compose, _head, _tail, _isempty, _null, _reverse, _addstr, _if, _iszero, _length, _$n$n, _$o$o, _even$e, _odd$e, _at, _take, _drop, _max, _min, _any, _all, _index_combine, _indexof, _position, _find, _find$nif, _count, _count$nif, _count$nif$nnot, _remove, _remove$nif, _remove$nif$nnot, _map, _flip, _reduce, _$r, _$b, _$s, _$q, _dl, _dlAppend, _dlList, _identMacro, _do, _m_subdo, _let, _m_sublet, _m_extractVar, _m_varFromTuple, _add$nhash, _key, _value, _get$npair, _get$nvalue, _remove$nhash;
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
//not = AST(\a . a false true)
root.defs._not = _not = define('not', function(_a){return _a()(_false)(_true)});
;
//neq = AST(\a b . not (eq a b))
root.defs._neq = _neq = define('neq', function(_a){return function(_b){return _not()((function(){var $m; return function(){return $m || ($m = (_eq()(_a)(_b)))}})())}});
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
//some2 = AST(\a b yes no . yes a b)
root.defs._some2 = _some2 = define('some2', setDataType(function(_a){return function(_b){return setType(function(_yes){return function(_no){return _yes()(_a)(_b)}}, 'some2')}}, 'some2'));
;
//none = AST(\yes no . no)
root.defs._none = _none = define('none', setType(function(_yes){return function(_no){return _no()}}, 'none'));
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
//compose = AST(\f g x . f (g x))
root.defs._compose = _compose = define('compose', setDataType(function(_f){return function(_g){return setType(function(_x){return _f()((function(){var $m; return function(){return $m || ($m = (_g()(_x)))}})())}, 'compose')}}, 'compose'));
;
//head = AST(\l . l \h t . h)
root.defs._head = _head = define('head', function(_l){return _l()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return _h()}}))}})())});
;
//tail = AST(\l . l \h t . t)
root.defs._tail = _tail = define('tail', function(_l){return _l()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return _t()}}))}})())});
;
//isempty = AST(\l . eq l nil)
root.defs._isempty = _isempty = define('isempty', function(_l){return _eq()(_l)(_nil)});
;
//null = AST(\l . l \h t D . false true)
root.defs._null = _null = define('null', function(_l){return _l()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _false()}}}))}})())(_true)});
;
//reverse = AST(\l . eq (tail l) nil l (append (reverse (tail l)) (cons (head l) nil)))
root.defs._reverse = _reverse = define('reverse', function(_l){return _eq()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())(_nil)(_l)((function(){var $m; return function(){return $m || ($m = (_append()((function(){var $m; return function(){return $m || ($m = (_reverse()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())(_nil)))}})())))}})())});
;
//addstr = AST(\a b . concat ([ a , b ]))
root.defs._addstr = _addstr = define('addstr', function(_a){return function(_b){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()(_a)(_$b)(_b)(_$s)))}})())}});
;
//if = AST(\p . p)
root.defs._if = _if = define('if', function(_p){return _p()});
;
//iszero = AST(eq 0)
root.defs._iszero = _iszero = define('iszero', _eq()((function(){return 0})));
;
//length = AST(\l . eq l nil 0 (++ (length (tail l))))
root.defs._length = _length = define('length', function(_l){return _eq()(_l)(_nil)((function(){return 0}))((function(){var $m; return function(){return $m || ($m = (_$o$o()((function(){var $m; return function(){return $m || ($m = (_length()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())))}})())});
;
//-- = AST(\x . - x 1)
root.defs._$n$n = _$n$n = define('--', function(_x){return _$n()(_x)((function(){return 1}))});
;
//++ = AST(\x . + x 1)
root.defs._$o$o = _$o$o = define('++', function(_x){return _$o()(_x)((function(){return 1}))});
;
//even? = AST(\x . eq 0 (% x 2))
root.defs._even$e = _even$e = define('even?', function(_x){return _eq()((function(){return 0}))((function(){var $m; return function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))}})())});
;
//odd? = AST(\x . eq 1 (% x 2))
root.defs._odd$e = _odd$e = define('odd?', function(_x){return _eq()((function(){return 1}))((function(){var $m; return function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))}})())});
;
//at = AST(\l x . iszero x (head l) (at (tail l) (-- x)))
root.defs._at = _at = define('at', function(_l){return function(_x){return _iszero()(_x)((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())((function(){var $m; return function(){return $m || ($m = (_at()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())((function(){var $m; return function(){return $m || ($m = (_$n$n()(_x)))}})())))}})())}});
;
//take = AST(\x l . iszero x nil (append ([ (head l) ]) (take (-- x) (tail l))))
root.defs._take = _take = define('take', function(_x){return function(_l){return _iszero()(_x)(_nil)((function(){var $m; return function(){return $m || ($m = (_append()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())(_$s)))}})())((function(){var $m; return function(){return $m || ($m = (_take()((function(){var $m; return function(){return $m || ($m = (_$n$n()(_x)))}})())((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())))}})())}});
;
//drop = AST(\x l . iszero x l (drop (-- x) (tail l)))
root.defs._drop = _drop = define('drop', function(_x){return function(_l){return _iszero()(_x)(_l)((function(){var $m; return function(){return $m || ($m = (_drop()((function(){var $m; return function(){return $m || ($m = (_$n$n()(_x)))}})())((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())}});
;
//max = AST(\a b . gt a b a b)
root.defs._max = _max = define('max', function(_a){return function(_b){return _gt()(_a)(_b)(_a)(_b)}});
;
//min = AST(\a b . lt a b a b)
root.defs._min = _min = define('min', function(_a){return function(_b){return _lt()(_a)(_b)(_a)(_b)}});
;
//any = AST(\f l . if (eq l nil) false (if (f (head l)) true (any f (tail l))))
root.defs._any = _any = define('any', function(_f){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())(_false)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())(_true)((function(){var $m; return function(){return $m || ($m = (_any()(_f)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())))}})())}});
;
//all = AST(\f l . if (eq l nil) true (if (f (head l)) (all f (tail l)) false))
root.defs._all = _all = define('all', function(_f){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())(_true)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_all()(_f)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())(_false)))}})())}});
;
//index_combine = AST(\x y . or (eq x nil) (eq y nil) nil (+ x y))
root.defs._index_combine = _index_combine = define('index_combine', function(_x){return function(_y){return _or()((function(){var $m; return function(){return $m || ($m = (_eq()(_x)(_nil)))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_y)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_$o()(_x)(_y)))}})())}});
;
//indexof = AST(\l x . if (eq l nil) nil (if (eq x (head l)) 0 (index_combine 1 (indexof (tail l) x))))
root.defs._indexof = _indexof = define('indexof', function(_l){return function(_x){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_eq()(_x)((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())((function(){return 0}))((function(){var $m; return function(){return $m || ($m = (_index_combine()((function(){return 1}))((function(){var $m; return function(){return $m || ($m = (_indexof()((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())(_x)))}})())))}})())))}})())}});
;
//position = AST(\l x . indexof x l)
root.defs._position = _position = define('position', function(_l){return function(_x){return _indexof()(_x)(_l)}});
;
//find = AST(\x l . find-if (eq x) l)
root.defs._find = _find = define('find', function(_x){return function(_l){return _find$nif()((function(){var $m; return function(){return $m || ($m = (_eq()(_x)))}})())(_l)}});
;
//find-if = AST(\f l . if (eq l nil) nil (if (f (head l)) (head l) (find-if f (tail l))))
root.defs._find$nif = _find$nif = define('find-if', function(_f){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())((function(){var $m; return function(){return $m || ($m = (_find$nif()(_f)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())))}})())}});
;
//count = AST(\x l . count-if (eq x) l)
root.defs._count = _count = define('count', function(_x){return function(_l){return _count$nif()((function(){var $m; return function(){return $m || ($m = (_eq()(_x)))}})())(_l)}});
;
//count-if = AST(\f l . if (eq l nil) 0 (+ (f (head l) 1 0) (count-if f (tail l))))
root.defs._count$nif = _count$nif = define('count-if', function(_f){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())((function(){return 0}))((function(){var $m; return function(){return $m || ($m = (_$o()((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())((function(){return 1}))((function(){return 0}))))}})())((function(){var $m; return function(){return $m || ($m = (_count$nif()(_f)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())))}})())}});
;
//count-if-not = AST(\f l . count-if \x . not (f x) l)
root.defs._count$nif$nnot = _count$nif$nnot = define('count-if-not', function(_f){return function(_l){return _count$nif()((function(){var $m; return function(){return $m || ($m = (function(_x){return _not()((function(){var $m; return function(){return $m || ($m = (_f()(_x)))}})())}))}})())(_l)}});
;
//remove = AST(\x l . remove-if (eq x) l)
root.defs._remove = _remove = define('remove', function(_x){return function(_l){return _remove$nif()((function(){var $m; return function(){return $m || ($m = (_eq()(_x)))}})())(_l)}});
;
//remove-if = AST(\f l . if (eq l nil) nil (if (f (head l)) (remove-if f (tail l)) (cons (head l) (remove-if f (tail l)))))
root.defs._remove$nif = _remove$nif = define('remove-if', function(_f){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_remove$nif()(_f)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())((function(){var $m; return function(){return $m || ($m = (_remove$nif()(_f)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())))}})())))}})())}});
;
//remove-if-not = AST(\f l . remove-if \x . not (f x) l)
root.defs._remove$nif$nnot = _remove$nif$nnot = define('remove-if-not', function(_f){return function(_l){return _remove$nif()((function(){var $m; return function(){return $m || ($m = (function(_x){return _not()((function(){var $m; return function(){return $m || ($m = (_f()(_x)))}})())}))}})())(_l)}});
;
//map = AST(\func list . list \h t D . cons (func h) (map func t) nil)
root.defs._map = _map = define('map', function(_func){return function(_list){return _list()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()((function(){var $m; return function(){return $m || ($m = (_func()(_h)))}})())((function(){var $m; return function(){return $m || ($m = (_map()(_func)(_t)))}})())}}}))}})())(_nil)}});
;
//flip = AST(\f a b . f b a)
root.defs._flip = _flip = define('flip', function(_f){return function(_a){return function(_b){return _f()(_b)(_a)}}});
;
//reduce = AST(\func list . if (eq list nil) nil (if (eq 1 (length list)) (head list) (func (head list) (reduce func (tail list)))))
root.defs._reduce = _reduce = define('reduce', function(_func){return function(_list){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_list)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_eq()((function(){return 1}))((function(){var $m; return function(){return $m || ($m = (_length()(_list)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_head()(_list)))}})())((function(){var $m; return function(){return $m || ($m = (_func()((function(){var $m; return function(){return $m || ($m = (_head()(_list)))}})())((function(){var $m; return function(){return $m || ($m = (_reduce()(_func)((function(){var $m; return function(){return $m || ($m = (_tail()(_list)))}})())))}})())))}})())))}})())}});
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
//do = AST(\apl . apl \f a . m_subdo a f)
root.defs._do = _do = defineMacro('do', function(_apl){return _apl()((function(){var $m; return function(){return $m || ($m = (function(_f){return function(_a){return _m_subdo()(_a)(_f)}}))}})())});
root.tokenDefs.push('do', '=M=');
;
//m_subdo = AST(\a f . or (is f ref) (is f lit) a (f \f2 a2 . m_subdo (m_extractVar a2 <- \v ast . apply (apply (ref bind) ast) (lambda v a) (m_extractVar a2 = \v ast . apply (lambda v a) ast (apply (apply (ref bind) a2) (lambda _ a)))) f2))
root.defs._m_subdo = _m_subdo = define('m_subdo', function(_a){return function(_f){return _or()((function(){var $m; return function(){return $m || ($m = (_is()(_f)(_ref)))}})())((function(){var $m; return function(){return $m || ($m = (_is()(_f)(_lit)))}})())(_a)((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (function(_f2){return function(_a2){return _m_subdo()((function(){var $m; return function(){return $m || ($m = (_m_extractVar()(_a2)((function(){return "<-"}))((function(){var $m; return function(){return $m || ($m = (function(_v){return function(_ast){return _apply()((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_ref()((function(){return "bind"}))))}})())(_ast)))}})())((function(){var $m; return function(){return $m || ($m = (_lambda()(_v)(_a)))}})())}}))}})())((function(){var $m; return function(){return $m || ($m = (_m_extractVar()(_a2)((function(){return "="}))((function(){var $m; return function(){return $m || ($m = (function(_v){return function(_ast){return _apply()((function(){var $m; return function(){return $m || ($m = (_lambda()(_v)(_a)))}})())(_ast)}}))}})())((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_ref()((function(){return "bind"}))))}})())(_a2)))}})())((function(){var $m; return function(){return $m || ($m = (_lambda()((function(){return "_"}))(_a)))}})())))}})())))}})())))}})())(_f2)}}))}})())))}})())}});
;
//let = AST(\apl . apl \f a . m_sublet f a)
root.defs._let = _let = defineMacro('let', function(_apl){return _apl()((function(){var $m; return function(){return $m || ($m = (function(_f){return function(_a){return _m_sublet()(_f)(_a)}}))}})())});
root.tokenDefs.push('let', '=M=');
;
//m_sublet = AST(\f a . or (is f ref) (is f lit) a (f \f2 a2 . m_extractVar a2 = \v ast . m_sublet f2 (apply (lambda v a) ast) (apply a a2)))
root.defs._m_sublet = _m_sublet = define('m_sublet', function(_f){return function(_a){return _or()((function(){var $m; return function(){return $m || ($m = (_is()(_f)(_ref)))}})())((function(){var $m; return function(){return $m || ($m = (_is()(_f)(_lit)))}})())(_a)((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (function(_f2){return function(_a2){return _m_extractVar()(_a2)((function(){return "="}))((function(){var $m; return function(){return $m || ($m = (function(_v){return function(_ast){return _m_sublet()(_f2)((function(){var $m; return function(){return $m || ($m = (_apply()((function(){var $m; return function(){return $m || ($m = (_lambda()(_v)(_a)))}})())(_ast)))}})())}}))}})())((function(){var $m; return function(){return $m || ($m = (_apply()(_a)(_a2)))}})())}}))}})())))}})())}});
;
//m_extractVar = AST(\ast token . is ast apply (ast \f a . m_varFromTuple f token \v . some2 v a (m_extractVar f token \var ast . some2 var (apply ast a) none)) none)
root.defs._m_extractVar = _m_extractVar = define('m_extractVar', function(_ast){return function(_token){return _is()(_ast)(_apply)((function(){var $m; return function(){return $m || ($m = (_ast()((function(){var $m; return function(){return $m || ($m = (function(_f){return function(_a){return _m_varFromTuple()(_f)(_token)((function(){var $m; return function(){return $m || ($m = (function(_v){return _some2()(_v)(_a)}))}})())((function(){var $m; return function(){return $m || ($m = (_m_extractVar()(_f)(_token)((function(){var $m; return function(){return $m || ($m = (function(_var){return function(_ast){return _some2()(_var)((function(){var $m; return function(){return $m || ($m = (_apply()(_ast)(_a)))}})())}}))}})())(_none)))}})())}}))}})())))}})())(_none)}});
;
//m_varFromTuple = AST(\ast token . is ast apply (ast \f arg . or (is f ref) (is f lit) (or (is arg ref) (is arg lit) (arg \arrow . eq arrow token (f \v . some v) none) none) none) none)
root.defs._m_varFromTuple = _m_varFromTuple = define('m_varFromTuple', function(_ast){return function(_token){return _is()(_ast)(_apply)((function(){var $m; return function(){return $m || ($m = (_ast()((function(){var $m; return function(){return $m || ($m = (function(_f){return function(_arg){return _or()((function(){var $m; return function(){return $m || ($m = (_is()(_f)(_ref)))}})())((function(){var $m; return function(){return $m || ($m = (_is()(_f)(_lit)))}})())((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_is()(_arg)(_ref)))}})())((function(){var $m; return function(){return $m || ($m = (_is()(_arg)(_lit)))}})())((function(){var $m; return function(){return $m || ($m = (_arg()((function(){var $m; return function(){return $m || ($m = (function(_arrow){return _eq()(_arrow)(_token)((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (function(_v){return _some()(_v)}))}})())))}})())(_none)}))}})())))}})())(_none)))}})())(_none)}}))}})())))}})())(_none)}});
;
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
//remove-hash = AST(\k hashmap . remove-if \x . eq (head x) k hashmap)
root.defs._remove$nhash = _remove$nhash = define('remove-hash', function(_k){return function(_hashmap){return _remove$nif()((function(){var $m; return function(){return $m || ($m = (function(_x){return _eq()((function(){var $m; return function(){return $m || ($m = (_head()(_x)))}})())(_k)}))}})())(_hashmap)}});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)