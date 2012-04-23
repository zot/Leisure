(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  tree = root = {};
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

var _null$e, _empty$ntree, _make$ntree, _add$nchild, _first$nchild, _next$nsibling, _data, _traverse$nprefix, _traverse, _inner$nchildren, _children, _test$ntree, _test$nsmall$ntree, _tiny$ntree, _t1, _t2, _t6, _t7, _t8, _test$nbuild2, _test$nbuild, _tmt4, _tmt5, _tmt1, _test$nminimax$ntree, _alpha$nbeta, _alpha$nbeta$neval, _alpha$nbeta$ntree, _alpha$nbeta$ninside, _test;
//null? = AST(eq nil)
root.defs._null$e = _null$e = define('null?', _eq()(_nil));
;
//empty-tree = AST(nil)
root.defs._empty$ntree = _empty$ntree = define('empty-tree', _nil());
;
//make-tree = AST(\t . cons (cons t nil) nil)
root.defs._make$ntree = _make$ntree = define('make-tree', function(_t){return _cons()((function(){var $m; return function(){return $m || ($m = (_cons()(_t)(_nil)))}})())(_nil)});
;
//add-child = AST(\t c . if (null? t) c (cons (append (head t) c) nil))
root.defs._add$nchild = _add$nchild = define('add-child', function(_t){return function(_c){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_t)))}})())(_c)((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_append()((function(){var $m; return function(){return $m || ($m = (_head()(_t)))}})())(_c)))}})())(_nil)))}})())}});
;
//first-child = AST(\t . tail (head t))
root.defs._first$nchild = _first$nchild = define('first-child', function(_t){return _tail()((function(){var $m; return function(){return $m || ($m = (_head()(_t)))}})())});
;
//next-sibling = AST(\t . tail t)
root.defs._next$nsibling = _next$nsibling = define('next-sibling', function(_t){return _tail()(_t)});
;
//data = AST(\t . head (head t))
root.defs._data = _data = define('data', function(_t){return _head()((function(){var $m; return function(){return $m || ($m = (_head()(_t)))}})())});
;
//traverse-prefix = AST(\t f . if (null? t) (f nil) (bind (f (data t)) \_ . bind (traverse (first-child t) f) \_ . traverse (next-sibling t) f))
root.defs._traverse$nprefix = _traverse$nprefix = define('traverse-prefix', function(_t){return function(_f){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_t)))}})())((function(){var $m; return function(){return $m || ($m = (_f()(_nil)))}})())((function(){var $m; return function(){return $m || ($m = (_bind()((function(){var $m; return function(){return $m || ($m = (_f()((function(){var $m; return function(){return $m || ($m = (_data()(_t)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_traverse()((function(){var $m; return function(){return $m || ($m = (_first$nchild()(_t)))}})())(_f)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _traverse()((function(){var $m; return function(){return $m || ($m = (_next$nsibling()(_t)))}})())(_f)}))}})())}))}})())))}})())}});
;
//traverse = AST(traverse-prefix)
root.defs._traverse = _traverse = define('traverse', _traverse$nprefix());
;
//inner-children = AST(\c . if (eq c nil) nil (cons (head c) (inner-children (next-sibling c))))
root.defs._inner$nchildren = _inner$nchildren = define('inner-children', function(_c){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_c)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_head()(_c)))}})())((function(){var $m; return function(){return $m || ($m = (_inner$nchildren()((function(){var $m; return function(){return $m || ($m = (_next$nsibling()(_c)))}})())))}})())))}})())});
;
//children = AST(\t . if (eq t nil) nil (inner-children (first-child t)))
root.defs._children = _children = define('children', function(_t){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_t)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_inner$nchildren()((function(){var $m; return function(){return $m || ($m = (_first$nchild()(_t)))}})())))}})())});
;
//test-tree = AST([ ([ 1 , ([ 2 , ([ 6 ]) , ([ 7 ]) , ([ 8 ]) ]) , ([ 3 ]) , ([ 4 , ([ 9 , ([ 12 ]) ]) ]) , ([ 5 , ([ 10 ]) , ([ 11 ]) ]) ]) ])
root.defs._test$ntree = _test$ntree = define('test-tree', _$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 1}))(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 2}))(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 6}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 7}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 8}))(_$s)))}})())(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 3}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 4}))(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 9}))(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 12}))(_$s)))}})())(_$s)))}})())(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 5}))(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 10}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 11}))(_$s)))}})())(_$s)))}})())(_$s)))}})())(_$s));
;
//test-small-tree = AST([ ([ 1 , ([ 2 , ([ 6 ]) , ([ 7 ]) , ([ 8 ]) ]) ]) ])
root.defs._test$nsmall$ntree = _test$nsmall$ntree = define('test-small-tree', _$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 1}))(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 2}))(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 6}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 7}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 8}))(_$s)))}})())(_$s)))}})())(_$s)))}})())(_$s));
;
//tiny-tree = AST([ ([ 1 , ([ 2 ]) ]) ])
root.defs._tiny$ntree = _tiny$ntree = define('tiny-tree', _$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 1}))(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 2}))(_$s)))}})())(_$s)))}})())(_$s));
;
//t1 = AST(make-tree 1)
root.defs._t1 = _t1 = define('t1', _make$ntree()((function(){return 1})));
;
//t2 = AST(make-tree 2)
root.defs._t2 = _t2 = define('t2', _make$ntree()((function(){return 2})));
;
//t6 = AST(make-tree 6)
root.defs._t6 = _t6 = define('t6', _make$ntree()((function(){return 6})));
;
//t7 = AST(make-tree 7)
root.defs._t7 = _t7 = define('t7', _make$ntree()((function(){return 7})));
;
//t8 = AST(make-tree 8)
root.defs._t8 = _t8 = define('t8', _make$ntree()((function(){return 8})));
;
//test-build2 = AST(add-child (add-child (add-child t2 t6) t7) t8)
root.defs._test$nbuild2 = _test$nbuild2 = define('test-build2', _add$nchild()((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_add$nchild()(_t2)(_t6)))}})())(_t7)))}})())(_t8));
;
//test-build = AST(add-child t1 test-build2)
root.defs._test$nbuild = _test$nbuild = define('test-build', _add$nchild()(_t1)(_test$nbuild2));
;
//tmt4 = AST(add-child (make-tree 4) (add-child (add-child (make-tree 4) (make-tree 12)) (make-tree 7)))
root.defs._tmt4 = _tmt4 = define('tmt4', _add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 4}))))}})())((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 4}))))}})())((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 12}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 7}))))}})())))}})()));
;
//tmt5 = AST(add-child (make-tree 5) (add-child (add-child (make-tree 10) (make-tree 5)) (make-tree 6)))
root.defs._tmt5 = _tmt5 = define('tmt5', _add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 5}))))}})())((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 10}))))}})())((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 5}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 6}))))}})())))}})()));
;
//tmt1 = AST(add-child (make-tree 1) (add-child (add-child (make-tree 1) (make-tree 2)) (make-tree 3)))
root.defs._tmt1 = _tmt1 = define('tmt1', _add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 1}))))}})())((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 1}))))}})())((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 2}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 3}))))}})())))}})()));
;
//test-minimax-tree = AST(add-child (add-child (add-child (make-tree 5) tmt4) tmt5) tmt1)
root.defs._test$nminimax$ntree = _test$nminimax$ntree = define('test-minimax-tree', _add$nchild()((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){return 5}))))}})())(_tmt4)))}})())(_tmt5)))}})())(_tmt1));
;
//alpha-beta = AST(\t . alpha-beta-tree t 4 -999999 999999)
root.defs._alpha$nbeta = _alpha$nbeta = define('alpha-beta', function(_t){return _alpha$nbeta$ntree()(_t)((function(){return 4}))((function(){return -999999}))((function(){return 999999}))});
;
//alpha-beta-eval = AST(\t . data t)
root.defs._alpha$nbeta$neval = _alpha$nbeta$neval = define('alpha-beta-eval', function(_t){return _data()(_t)});
;
//alpha-beta-tree = AST(\t d alpha beta . if (null? t) alpha (if (or (null? (first-child t)) (lte d 0)) (alpha-beta-eval t) (alpha-beta-inside (first-child t) (-- d) alpha beta)))
root.defs._alpha$nbeta$ntree = _alpha$nbeta$ntree = define('alpha-beta-tree', function(_t){return function(_d){return function(_alpha){return function(_beta){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_t)))}})())(_alpha)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_null$e()((function(){var $m; return function(){return $m || ($m = (_first$nchild()(_t)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_lte()(_d)((function(){return 0}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_alpha$nbeta$neval()(_t)))}})())((function(){var $m; return function(){return $m || ($m = (_alpha$nbeta$ninside()((function(){var $m; return function(){return $m || ($m = (_first$nchild()(_t)))}})())((function(){var $m; return function(){return $m || ($m = (_$n$n()(_d)))}})())(_alpha)(_beta)))}})())))}})())}}}});
;
//alpha-beta-inside = AST(\t d alpha beta . if (null? t) alpha ((\val . if (gte val beta) val (if (gt val alpha) (alpha-beta-tree (next-sibling t) d val beta) (alpha-beta-tree (next-sibling t) d alpha beta))) (* -1 (alpha-beta-tree t d (- 0 beta) (- 0 alpha)))))
root.defs._alpha$nbeta$ninside = _alpha$nbeta$ninside = define('alpha-beta-inside', function(_t){return function(_d){return function(_alpha){return function(_beta){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_t)))}})())(_alpha)((function(){var $m; return function(){return $m || ($m = (function(_val){return _if()((function(){var $m; return function(){return $m || ($m = (_gte()(_val)(_beta)))}})())(_val)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_gt()(_val)(_alpha)))}})())((function(){var $m; return function(){return $m || ($m = (_alpha$nbeta$ntree()((function(){var $m; return function(){return $m || ($m = (_next$nsibling()(_t)))}})())(_d)(_val)(_beta)))}})())((function(){var $m; return function(){return $m || ($m = (_alpha$nbeta$ntree()((function(){var $m; return function(){return $m || ($m = (_next$nsibling()(_t)))}})())(_d)(_alpha)(_beta)))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_$g()((function(){return -1}))((function(){var $m; return function(){return $m || ($m = (_alpha$nbeta$ntree()(_t)(_d)((function(){var $m; return function(){return $m || ($m = (_$n()((function(){return 0}))(_beta)))}})())((function(){var $m; return function(){return $m || ($m = (_$n()((function(){return 0}))(_alpha)))}})())))}})())))}})())))}})())}}}});
;
//test = AST(alpha-beta test-minimax-tree)
root.defs._test = _test = define('test', _alpha$nbeta()(_test$nminimax$ntree));
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)