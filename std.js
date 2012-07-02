var std = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  std = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

Nil = Parse.Nil;
var cons = Parse.cons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var _id, _flip, _true, _and, _or, _not, _neq, _left, _right, _some, _some2, _none, _null$e, _append, _compose, _iszero, _positive, _length, _$_$_, _$o$o, _even$e, _odd$e, _max, _min, _head, _tail, _reverse, _subreverse, _addstr, _if, _at, _take, _takeWhile, _drop, _dropWhile, _series, _from, _fromBy, _fromTo, _fromToBy, _any, _all, _index_combine, _indexof, _position, _find, _find$_if, _find$_if$_opt, _count, _count$_if, _count$_if$_not, _remove, _remove$_if, _remove$_if$_not, _filter, _map, _reduce, _foldr, _foldr1, _foldl, _foldl1, _$r, _$s, _$q, _$b, _next$_list$_item, _dlempty, _dl, _dlAppend, _m_extractVar, _m_varFromTuple, _html;
processResult(//AST(defGroup [ ])
(_defGroup()((function(){return "["}))((function(){return "]"}))));
processResult(//AST(defToken |)
(_defToken()((function(){return "|"}))));
processResult(//AST(defToken ,)
(_defToken()((function(){return ","}))));
//id = AST(λx . x)
root.defs._id = _id = Parse.define('id', (function() {var f = (function(_x){return _x();}); return function _id(){return f;}})(), 1, "\\x. x");
;
//flip = AST(λf a b . f b a)
root.defs._flip = _flip = Parse.define('flip', (function() {var f = (Parse.setDataType(function(_f){return Parse.setType(function(_a){return function(_b){return _f()(_b)(_a);};}, 'flip');}, 'flip')); return function _flip(){return f;}})(), 1, "\\f. \\a b . f b a");
;
//true = AST(λa b . a)
root.defs._true = _true = Parse.define('true', (function() {var f = (Parse.setType(function(_a){return function(_b){return _a();};}, 'true')); return function _true(){return f;}})(), 0, "\\a b . a");
;
//and = AST(λa b . a b false)
root.defs._and = _and = Parse.define('and', (function() {var f = (function(_a){return function(_b){return _a()(_b)((function(){return false}));};}); return function _and(){return f;}})(), 2, "\\a. \\b. a b false");
;
//or = AST(λa . a true)
root.defs._or = _or = Parse.define('or', (function() {var f = (function(_a){return _a()((function(){return true}));}); return function _or(){return f;}})(), 1, "\\a. a true");
;
//not = AST(λa . a false true)
root.defs._not = _not = Parse.define('not', (function() {var f = (function(_a){return _a()((function(){return false}))((function(){return true}));}); return function _not(){return f;}})(), 1, "\\a. a false true");
;
//neq = AST(λa b . not (eq a b))
root.defs._neq = _neq = Parse.define('neq', (function() {var f = (function(_a){return function(_b){return _not()((function(){var $m; return (function(){return $m || ($m = (_eq()(_a)(_b)))})})());};}); return function _neq(){return f;}})(), 2, "\\a. \\b. not (eq a b)");
;
//left = AST(λv l r . l v)
root.defs._left = _left = Parse.define('left', (function() {var f = (Parse.setDataType(function(_v){return Parse.setType(function(_l){return function(_r){return _l()(_v);};}, 'left');}, 'left')); return function _left(){return f;}})(), 1, "\\v. \\l r . l v");
;
//right = AST(λv l r . r v)
root.defs._right = _right = Parse.define('right', (function() {var f = (Parse.setDataType(function(_v){return Parse.setType(function(_l){return function(_r){return _r()(_v);};}, 'right');}, 'right')); return function _right(){return f;}})(), 1, "\\v. \\l r . r v");
;
//some = AST(λx yes no . yes x)
root.defs._some = _some = Parse.define('some', (function() {var f = (Parse.setDataType(function(_x){return Parse.setType(function(_yes){return function(_no){return _yes()(_x);};}, 'some');}, 'some')); return function _some(){return f;}})(), 1, "\\x. \\yes no . yes x");
;
//some2 = AST(λa b yes no . yes a b)
root.defs._some2 = _some2 = Parse.define('some2', (function() {var f = (Parse.setDataType(function(_a){return function(_b){return Parse.setType(function(_yes){return function(_no){return _yes()(_a)(_b);};}, 'some2');};}, 'some2')); return function _some2(){return f;}})(), 2, "\\a. \\b. \\yes no . yes a b");
;
//none = AST(λyes no . no)
root.defs._none = _none = Parse.define('none', (function() {var f = (Parse.setType(function(_yes){return function(_no){return _no();};}, 'none')); return function _none(){return f;}})(), 0, "\\yes no . no");
;
//null? = AST(eq nil)
root.defs._null$e = _null$e = Parse.define('null?', (function _null$e() {return ((_eq()(_nil)));}), 0, "eq nil");
;
//append = AST(λl1 l2 . l1 λh t D . cons h (append t l2) l2)
root.defs._append = _append = Parse.define('append', (function() {var f = (function(_l1){return function(_l2){return _l1()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_append()(_t)(_l2)))})})());};};}))})})())(_l2);};}); return function _append(){return f;}})(), 2, "\\l1. \\l2. l1 (\\h t D . cons h (append t l2)) l2");
;
//compose = AST(λf g x . f (g x))
root.defs._compose = _compose = Parse.define('compose', (function() {var f = (Parse.setDataType(function(_f){return function(_g){return Parse.setType(function(_x){return _f()((function(){var $m; return (function(){return $m || ($m = (_g()(_x)))})})());}, 'compose');};}, 'compose')); return function _compose(){return f;}})(), 2, "\\f. \\g. \\x . f ( g x)");
;
//iszero = AST(eq 0)
root.defs._iszero = _iszero = Parse.define('iszero', (function _iszero() {return ((_eq()((function(){return 0}))));}), 0, "eq 0");
;
//positive = AST(< 0)
root.defs._positive = _positive = Parse.define('positive', (function _positive() {return ((_$y()((function(){return 0}))));}), 0, "< 0");
;
//length = AST(λl . eq l nil 0 (++ (length (tail l))))
root.defs._length = _length = Parse.define('length', (function() {var f = (function(_l){return _eq()(_l)(_nil)((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$o$o()((function(){var $m; return (function(){return $m || ($m = (_length()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());}); return function _length(){return f;}})(), 1, "\\l. (eq l nil) 0 (++ (length (tail l) ) )");
;
//-- = AST(flip - 1)
root.defs._$_$_ = _$_$_ = Parse.define('--', (function _$_$_() {return ((_flip()(_$_)((function(){return 1}))));}), 0, "(flip -) 1");
;
//++ = AST(+ 1)
root.defs._$o$o = _$o$o = Parse.define('++', (function _$o$o() {return ((_$o()((function(){return 1}))));}), 0, "+ 1");
;
//even? = AST(λx . iszero (% x 2))
root.defs._even$e = _even$e = Parse.define('even?', (function() {var f = (function(_x){return _iszero()((function(){var $m; return (function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))})})());}); return function _even$e(){return f;}})(), 1, "\\x. iszero (% x 2)");
;
//odd? = AST(λx . eq 1 (% x 2))
root.defs._odd$e = _odd$e = Parse.define('odd?', (function() {var f = (function(_x){return _eq()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))})})());}); return function _odd$e(){return f;}})(), 1, "\\x. eq 1 (% x 2)");
;
//max = AST(λa b . gt a b a b)
root.defs._max = _max = Parse.define('max', (function() {var f = (function(_a){return function(_b){return _gt()(_a)(_b)(_a)(_b);};}); return function _max(){return f;}})(), 2, "\\a. \\b. (gt a b) a b");
;
//min = AST(λa b . lt a b a b)
root.defs._min = _min = Parse.define('min', (function() {var f = (function(_a){return function(_b){return _lt()(_a)(_b)(_a)(_b);};}); return function _min(){return f;}})(), 2, "\\a. \\b. (lt a b) a b");
;
//head = AST(λl . l λh t . h)
root.defs._head = _head = Parse.define('head', (function() {var f = (function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return _h();};}))})})());}); return function _head(){return f;}})(), 1, "\\l. l \\h t . h");
;
//tail = AST(λl . l λh t . t)
root.defs._tail = _tail = Parse.define('tail', (function() {var f = (function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return _t();};}))})})());}); return function _tail(){return f;}})(), 1, "\\l. l \\h t . t");
;
//reverse = AST(λl . subreverse l nil)
root.defs._reverse = _reverse = Parse.define('reverse', (function() {var f = (function(_l){return _subreverse()(_l)(_nil);}); return function _reverse(){return f;}})(), 1, "\\l. subreverse l nil");
;
//subreverse = AST(λl result . l λh t D . subreverse t (cons h result) result)
root.defs._subreverse = _subreverse = Parse.define('subreverse', (function() {var f = (function(_l){return function(_result){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _subreverse()(_t)((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)(_result)))})})());};};}))})})())(_result);};}); return function _subreverse(){return f;}})(), 2, "\\l. \\result. l (\\h t D . subreverse t (cons h result)) result");
;
//addstr = AST(λa b . concat ([ a b ]))
root.defs._addstr = _addstr = Parse.define('addstr', (function() {var f = (function(_a){return function(_b){return _concat()((function(){var $m; return (function(){return $m || ($m = (_$r()(_a)(_b)(_$s)))})})());};}); return function _addstr(){return f;}})(), 2, "\\a. \\b. concat [a b]");
;
//if = AST(id)
root.defs._if = _if = Parse.define('if', (function _if() {return ((_id()));}), 0, "id");
;
//at = AST(λl x . iszero x (head l) (at (tail l) (-- x)))
root.defs._at = _at = Parse.define('at', (function() {var f = (function(_l){return function(_x){return _iszero()(_x)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_at()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_x)))})})())))})})());};}); return function _at(){return f;}})(), 2, "\\l. \\x. (iszero (x)) (head l) (at (tail l) (-- (x) ) )");
;
//take = AST(λn list . positive n (list λh t D . cons h (take (-- n) t) nil) nil)
root.defs._take = _take = Parse.define('take', (function() {var f = (function(_n){return function(_list){return _positive()(_n)((function(){var $m; return (function(){return $m || ($m = (_list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_take()((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_n)))})})())(_t)))})})());};};}))})})())(_nil)))})})())(_nil);};}); return function _take(){return f;}})(), 2, "\\n. \\list. positive n\n  list\n    \\h t D . cons h (take (-- n) t)\n    nil\n  nil");
;
//takeWhile = AST(λpredicate list . list λh t D . predicate h (cons h (takeWhile predicate t)) nil nil)
root.defs._takeWhile = _takeWhile = Parse.define('takeWhile', (function() {var f = (function(_predicate){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _predicate()(_h)((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_takeWhile()(_predicate)(_t)))})})())))})})())(_nil);};};}))})})())(_nil);};}); return function _takeWhile(){return f;}})(), 2, "\\predicate. \\list. list\n  \\h t D . predicate h\n    cons h (takeWhile predicate t)\n    nil\n  nil");
;
//drop = AST(λx list . positive x (list λh t D . drop (-- x) t nil) list)
root.defs._drop = _drop = Parse.define('drop', (function() {var f = (function(_x){return function(_list){return _positive()(_x)((function(){var $m; return (function(){return $m || ($m = (_list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _drop()((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_x)))})})())(_t);};};}))})})())(_nil)))})})())(_list);};}); return function _drop(){return f;}})(), 2, "\\x. \\list. positive x\n  list\n    \\h t D . drop (-- x) t\n    nil\n  list");
;
//dropWhile = AST(λpredicate list . list λh t D . predicate h (dropWhile predicate t) list nil)
root.defs._dropWhile = _dropWhile = Parse.define('dropWhile', (function() {var f = (function(_predicate){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _predicate()(_h)((function(){var $m; return (function(){return $m || ($m = (_dropWhile()(_predicate)(_t)))})})())(_list);};};}))})})())(_nil);};}); return function _dropWhile(){return f;}})(), 2, "\\predicate. \\list. list\n  \\h t D . predicate h\n    dropWhile predicate t\n    list\n  nil");
;
//series = AST(λfunc n . cons n (series func (func n)))
root.defs._series = _series = Parse.define('series', (function() {var f = (function(_func){return function(_n){return _cons()(_n)((function(){var $m; return (function(){return $m || ($m = (_series()(_func)((function(){var $m; return (function(){return $m || ($m = (_func()(_n)))})})())))})})());};}); return function _series(){return f;}})(), 2, "\\func. \\n. cons n (series func (func n))");
;
//from = AST(λn . series ++ n)
root.defs._from = _from = Parse.define('from', (function() {var f = (function(_n){return _series()(_$o$o)(_n);}); return function _from(){return f;}})(), 1, "\\n. series ++ n");
;
//fromBy = AST(λn inc . series (+ inc) n)
root.defs._fromBy = _fromBy = Parse.define('fromBy', (function() {var f = (function(_n){return function(_inc){return _series()((function(){var $m; return (function(){return $m || ($m = (_$o()(_inc)))})})())(_n);};}); return function _fromBy(){return f;}})(), 2, "\\n. \\inc. series (+ inc) n");
;
//fromTo = AST(λn m . takeWhile (> m) (from n))
root.defs._fromTo = _fromTo = Parse.define('fromTo', (function() {var f = (function(_n){return function(_m){return _takeWhile()((function(){var $m; return (function(){return $m || ($m = (_$z()(_m)))})})())((function(){var $m; return (function(){return $m || ($m = (_from()(_n)))})})());};}); return function _fromTo(){return f;}})(), 2, "\\n. \\m. takeWhile (> m) (from n)");
;
//fromToBy = AST(λn m inc . takeWhile (> m) (fromBy n inc))
root.defs._fromToBy = _fromToBy = Parse.define('fromToBy', (function() {var f = (function(_n){return function(_m){return function(_inc){return _takeWhile()((function(){var $m; return (function(){return $m || ($m = (_$z()(_m)))})})())((function(){var $m; return (function(){return $m || ($m = (_fromBy()(_n)(_inc)))})})());};};}); return function _fromToBy(){return f;}})(), 3, "\\n. \\m. \\inc. takeWhile (> m) (fromBy n inc)");
;
//any = AST(λf l . l λh t D . or (f h) (any f t) false)
root.defs._any = _any = Parse.define('any', (function() {var f = (function(_f){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _or()((function(){var $m; return (function(){return $m || ($m = (_f()(_h)))})})())((function(){var $m; return (function(){return $m || ($m = (_any()(_f)(_t)))})})());};};}))})})())((function(){return false}));};}); return function _any(){return f;}})(), 2, "\\f. \\l. l\n  \\h t D . or\n    f h\n    any f t\n  false");
;
//all = AST(λf l . l λh t D . and (f h) (all f t) true)
root.defs._all = _all = Parse.define('all', (function() {var f = (function(_f){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _and()((function(){var $m; return (function(){return $m || ($m = (_f()(_h)))})})())((function(){var $m; return (function(){return $m || ($m = (_all()(_f)(_t)))})})());};};}))})})())((function(){return true}));};}); return function _all(){return f;}})(), 2, "\\f. \\l. l\n  \\h t D . and\n    f h\n    all f t\n  true");
;
//index_combine = AST(λx y . or (eq x nil) (eq y nil) nil (+ x y))
root.defs._index_combine = _index_combine = Parse.define('index_combine', (function() {var f = (function(_x){return function(_y){return _or()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_y)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_$o()(_x)(_y)))})})());};}); return function _index_combine(){return f;}})(), 2, "\\x. \\y. (or (eq x nil) (eq y nil)) (nil) (+ x y)");
;
//indexof = AST(λl x . if (eq l nil) nil (if (eq x (head l)) 0 (index_combine 1 (indexof (tail l) x))))
root.defs._indexof = _indexof = Parse.define('indexof', (function() {var f = (function(_l){return function(_x){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_index_combine()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_indexof()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())(_x)))})})())))})})())))})})());};}); return function _indexof(){return f;}})(), 2, "\\l. \\x. if (eq l nil) (nil) (if (eq x (head l)) (0) (index_combine 1 (indexof (tail l) x ) ) )");
;
//position = AST(λl x . indexof x l)
root.defs._position = _position = Parse.define('position', (function() {var f = (function(_l){return function(_x){return _indexof()(_x)(_l);};}); return function _position(){return f;}})(), 2, "\\l. \\x. indexof x l");
;
//find = AST(λx l . find-if (eq x) l)
root.defs._find = _find = Parse.define('find', (function() {var f = (function(_x){return function(_l){return _find$_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}); return function _find(){return f;}})(), 2, "\\x. \\l. find-if (eq x) l");
;
//find-if = AST(λf l . l λh t D . f h h (find-if f t) nil)
root.defs._find$_if = _find$_if = Parse.define('find-if', (function() {var f = (function(_f){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _f()(_h)(_h)((function(){var $m; return (function(){return $m || ($m = (_find$_if()(_f)(_t)))})})());};};}))})})())(_nil);};}); return function _find$_if(){return f;}})(), 2, "\\f. \\l. l (\\h t D . (f h) h (find-if f t)) nil");
;
//find-if-opt = AST(λf l . l λh t D . f h (some h) (find-if-opt f t) none)
root.defs._find$_if$_opt = _find$_if$_opt = Parse.define('find-if-opt', (function() {var f = (function(_f){return function(_l){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _f()(_h)((function(){var $m; return (function(){return $m || ($m = (_some()(_h)))})})())((function(){var $m; return (function(){return $m || ($m = (_find$_if$_opt()(_f)(_t)))})})());};};}))})})())(_none);};}); return function _find$_if$_opt(){return f;}})(), 2, "\\f. \\l. l (\\h t D . (f h) (some h) (find-if-opt f t)) none");
;
//count = AST(λx l . count-if (eq x) l)
root.defs._count = _count = Parse.define('count', (function() {var f = (function(_x){return function(_l){return _count$_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}); return function _count(){return f;}})(), 2, "\\x. \\l. count-if (eq x) l");
;
//count-if = AST(λf l . if (eq l nil) 0 (+ (f (head l) 1 0) (count-if f (tail l))))
root.defs._count$_if = _count$_if = Parse.define('count-if', (function() {var f = (function(_f){return function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$o()((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){return 1}))((function(){return 0}))))})})())((function(){var $m; return (function(){return $m || ($m = (_count$_if()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());};}); return function _count$_if(){return f;}})(), 2, "\\f. \\l. if (eq l nil) 0\n  + (f (head l) 1 0) (count-if f (tail l))");
;
//count-if-not = AST(λf l . count-if λx . not (f x) l)
root.defs._count$_if$_not = _count$_if$_not = Parse.define('count-if-not', (function() {var f = (function(_f){return function(_l){return _count$_if()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _not()((function(){var $m; return (function(){return $m || ($m = (_f()(_x)))})})());}))})})())(_l);};}); return function _count$_if$_not(){return f;}})(), 2, "\\f. \\l. count-if (\\x. not (f x)) l");
;
//remove = AST(λx l . remove-if (eq x) l)
root.defs._remove = _remove = Parse.define('remove', (function() {var f = (function(_x){return function(_l){return _remove$_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)))})})())(_l);};}); return function _remove(){return f;}})(), 2, "\\x. \\l. remove-if (eq x) l");
;
//remove-if = AST(λf l . if (eq l nil) nil (if (f (head l)) (remove-if f (tail l)) (cons (head l) (remove-if f (tail l)))))
root.defs._remove$_if = _remove$_if = Parse.define('remove-if', (function() {var f = (function(_f){return function(_l){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_remove$_if()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_remove$_if()(_f)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())))})})());};}); return function _remove$_if(){return f;}})(), 2, "\\f. \\l. if (eq l nil) nil\n  if (f (head l)) (remove-if f (tail l))\n    cons (head l) (remove-if f (tail l))");
;
//remove-if-not = AST(λf l . remove-if λx . not (f x) l)
root.defs._remove$_if$_not = _remove$_if$_not = Parse.define('remove-if-not', (function() {var f = (function(_f){return function(_l){return _remove$_if()((function(){var $m; return (function(){return $m || ($m = (function(_x){return _not()((function(){var $m; return (function(){return $m || ($m = (_f()(_x)))})})());}))})})())(_l);};}); return function _remove$_if$_not(){return f;}})(), 2, "\\f. \\l. remove-if (\\x. not (f x)) l");
;
//filter = AST(λf . remove-if (compose not f))
root.defs._filter = _filter = Parse.define('filter', (function() {var f = (function(_f){return _remove$_if()((function(){var $m; return (function(){return $m || ($m = (_compose()(_not)(_f)))})})());}); return function _filter(){return f;}})(), 1, "\\f. remove-if (compose not f)");
;
//map = AST(λfunc list . list λh t D . cons (func h) (map func t) nil)
root.defs._map = _map = Parse.define('map', (function() {var f = (function(_func){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()((function(){var $m; return (function(){return $m || ($m = (_func()(_h)))})})())((function(){var $m; return (function(){return $m || ($m = (_map()(_func)(_t)))})})());};};}))})})())(_nil);};}); return function _map(){return f;}})(), 2, "\\func. \\list. list (\\h t D . cons (func h) (map func t)) nil");
;
//reduce = AST(λfunc list . if (eq list nil) nil (if (eq 1 (length list)) (head list) (func (head list) (reduce func (tail list)))))
root.defs._reduce = _reduce = Parse.define('reduce', (function() {var f = (function(_func){return function(_list){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_list)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_length()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_reduce()(_func)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())))})})());};}); return function _reduce(){return f;}})(), 2, "\\func. \\list. if (eq list nil) nil\n  if (eq 1 (length list)) (head list)\n    func (head list) (reduce func (tail list))");
;
//foldr = AST(λfunc value list . list λh t D . func h (foldr func value t) value)
root.defs._foldr = _foldr = Parse.define('foldr', (function() {var f = (function(_func){return function(_value){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _func()(_h)((function(){var $m; return (function(){return $m || ($m = (_foldr()(_func)(_value)(_t)))})})());};};}))})})())(_value);};};}); return function _foldr(){return f;}})(), 3, "\\func. \\value. \\list. list (\\h t D . func h (foldr func value t)) value");
;
//foldr1 = AST(λfunc list . list λh t D . null? t h (func h (foldr1 func t)) nil)
root.defs._foldr1 = _foldr1 = Parse.define('foldr1', (function() {var f = (function(_func){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _null$e()(_t)(_h)((function(){var $m; return (function(){return $m || ($m = (_func()(_h)((function(){var $m; return (function(){return $m || ($m = (_foldr1()(_func)(_t)))})})())))})})());};};}))})})())(_nil);};}); return function _foldr1(){return f;}})(), 2, "\\func. \\list. list\n  \\h t D . null? t\n     h\n     func h (foldr1 func t)\n  nil");
;
//foldl = AST(λfunc value list . list λh t D . foldl func (func value h) t value)
root.defs._foldl = _foldl = Parse.define('foldl', (function() {var f = (function(_func){return function(_value){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _foldl()(_func)((function(){var $m; return (function(){return $m || ($m = (_func()(_value)(_h)))})})())(_t);};};}))})})())(_value);};};}); return function _foldl(){return f;}})(), 3, "\\func. \\value. \\list. list (\\h t D . foldl func (func value h) t) value");
;
//foldl1 = AST(λfunc list . list λh t D . foldl func h t nil)
root.defs._foldl1 = _foldl1 = Parse.define('foldl1', (function() {var f = (function(_func){return function(_list){return _list()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _foldl()(_func)(_h)(_t);};};}))})})())(_nil);};}); return function _foldl1(){return f;}})(), 2, "\\func. \\list. list (\\h t D. foldl func h t) nil");
;
//[ = AST(λitem . eq item ] nil (next-list-item (dl item)))
root.defs._$r = _$r = Parse.define('[', (function() {var f = (Parse.setType(function(_item){return _eq()(_item)(_$s)(_nil)((function(){var $m; return (function(){return $m || ($m = (_next$_list$_item()((function(){var $m; return (function(){return $m || ($m = (_dl()(_item)))})})())))})})());}, '[')); return function _$r(){return f;}})(), 0, "\\item . eq item `]`\n  nil\n  next-list-item (dl item)");
;
//] = AST(λx . x)
root.defs._$s = _$s = Parse.define(']', (function() {var f = (Parse.setType(function(_x){return _x();}, ']')); return function _$s(){return f;}})(), 0, "\\x . x");
;
//| = AST(λx . x)
root.defs._$q = _$q = Parse.define('|', (function() {var f = (Parse.setType(function(_x){return _x();}, '|')); return function _$q(){return f;}})(), 0, "\\x . x");
;
//, = AST(λx . x)
root.defs._$b = _$b = Parse.define(',', (function() {var f = (Parse.setType(function(_x){return _x();}, ',')); return function _$b(){return f;}})(), 0, "\\x . x");
;
//next-list-item = AST(λitems next . eq next ] (items nil) (eq next | λtail close . items tail (eq next , (next-list-item items) (next-list-item (dlAppend items (dl next))))))
root.defs._next$_list$_item = _next$_list$_item = Parse.define('next-list-item', (function() {var f = (function(_items){return function(_next){return _eq()(_next)(_$s)((function(){var $m; return (function(){return $m || ($m = (_items()(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_next)(_$q)((function(){var $m; return (function(){return $m || ($m = (function(_tail){return function(_close){return _items()(_tail);};}))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_next)(_$b)((function(){var $m; return (function(){return $m || ($m = (_next$_list$_item()(_items)))})})())((function(){var $m; return (function(){return $m || ($m = (_next$_list$_item()((function(){var $m; return (function(){return $m || ($m = (_dlAppend()(_items)((function(){var $m; return (function(){return $m || ($m = (_dl()(_next)))})})())))})})())))})})())))})})())))})})());};}); return function _next$_list$_item(){return f;}})(), 2, "\\items. \\next. eq next `]`\n  items nil\n  eq next `|`\n    \\tail close . items tail\n    eq next `,`\n      next-list-item items\n      next-list-item (dlAppend items (dl next))");
;
//dlempty = AST(id)
root.defs._dlempty = _dlempty = Parse.define('dlempty', (function _dlempty() {return ((_id()));}), 0, "id");
;
//dl = AST(λitem rest . cons item rest)
root.defs._dl = _dl = Parse.define('dl', (function() {var f = (Parse.setDataType(function(_item){return Parse.setType(function(_rest){return _cons()(_item)(_rest);}, 'dl');}, 'dl')); return function _dl(){return f;}})(), 1, "\\item. \\rest . cons item rest");
;
//dlAppend = AST(λa b rest . a (b rest))
root.defs._dlAppend = _dlAppend = Parse.define('dlAppend', (function() {var f = (Parse.setDataType(function(_a){return function(_b){return Parse.setType(function(_rest){return _a()((function(){var $m; return (function(){return $m || ($m = (_b()(_rest)))})})());}, 'dlAppend');};}, 'dlAppend')); return function _dlAppend(){return f;}})(), 2, "\\a. \\b. \\rest . a (b rest)");
;
//m_extractVar = AST(λast token . is ast apply (ast λf a . m_varFromTuple f token λv . some2 v a (m_extractVar f token λvar ast . some2 var (apply ast a) none)) none)
root.defs._m_extractVar = _m_extractVar = Parse.define('m_extractVar', (function() {var f = (function(_ast){return function(_token){return _is()(_ast)(_apply)((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_a){return _m_varFromTuple()(_f)(_token)((function(){var $m; return (function(){return $m || ($m = (function(_v){return _some2()(_v)(_a);}))})})())((function(){var $m; return (function(){return $m || ($m = (_m_extractVar()(_f)(_token)((function(){var $m; return (function(){return $m || ($m = (function(_var){return function(_ast){return _some2()(_var)((function(){var $m; return (function(){return $m || ($m = (_apply()(_ast)(_a)))})})());};}))})})())(_none)))})})());};}))})})())))})})())(_none);};}); return function _m_extractVar(){return f;}})(), 2, "\\ast. \\token. is ast apply\n  ast \\f a .m_varFromTuple f token\n    \\v . some2 v a\n    m_extractVar f token\n      \\var ast . some2 var (apply ast a)\n      none\n  none");
;
//m_varFromTuple = AST(λast token . is ast apply (ast λf arg . or (is f ref) (is f lit) (or (is arg ref) (is arg lit) (arg λarrow . eq arrow token (f λv . some v) none) none) none) none)
root.defs._m_varFromTuple = _m_varFromTuple = Parse.define('m_varFromTuple', (function() {var f = (function(_ast){return function(_token){return _is()(_ast)(_apply)((function(){var $m; return (function(){return $m || ($m = (_ast()((function(){var $m; return (function(){return $m || ($m = (function(_f){return function(_arg){return _or()((function(){var $m; return (function(){return $m || ($m = (_is()(_f)(_ref)))})})())((function(){var $m; return (function(){return $m || ($m = (_is()(_f)(_lit)))})})())((function(){var $m; return (function(){return $m || ($m = (_or()((function(){var $m; return (function(){return $m || ($m = (_is()(_arg)(_ref)))})})())((function(){var $m; return (function(){return $m || ($m = (_is()(_arg)(_lit)))})})())((function(){var $m; return (function(){return $m || ($m = (_arg()((function(){var $m; return (function(){return $m || ($m = (function(_arrow){return _eq()(_arrow)(_token)((function(){var $m; return (function(){return $m || ($m = (_f()((function(){var $m; return (function(){return $m || ($m = (function(_v){return _some()(_v);}))})})())))})})())(_none);}))})})())))})})())(_none)))})})())(_none);};}))})})())))})})())(_none);};}); return function _m_varFromTuple(){return f;}})(), 2, "\\ast. \\token. is ast apply\n  ast \\f arg . or (is f ref) (is f lit)\n    or (is arg ref) (is arg lit)\n      arg \\arrow . eq arrow token\n        f \\v . some v\n        none\n      none\n    none\n  none");
;
//html = AST(λx f . f x)
root.defs._html = _html = Parse.define('html', (function() {var f = (Parse.setDataType(function(_x){return Parse.setType(function(_f){return _f()(_x);}, 'html');}, 'html')); return function _html(){return f;}})(), 1, "\\x. \\f . f x");
;

//if (typeof window !== 'undefined' && window !== null) {
//  Leisure.processTokenDefs(root.tokenDefs);
//}
return root;
}).call(this)