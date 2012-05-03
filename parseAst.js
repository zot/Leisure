var parseAst = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  parseAst = root = {};
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

var _make$nsubtree, _subtree$nsvg, _subtree$nwidth, _subtree$nheight, _subtree$nroot$nx, _subtree$nroot$ny, _subtree$nset$nsvg, _subtree$nset$nwidth, _subtree$nset$nheight, _subtree$nset$nroot$nx, _subtree$nset$nroot$ny, _treeFor, _subtreeFor, _createLitSubtree, _typeof;
//make-subtree = AST(\svg width height root-x root-y f . f svg width height root-x root-y)
root.defs._make$nsubtree = _make$nsubtree = define('make-subtree', setDataType(function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return setType(function(_f){return _f()(_svg)(_width)(_height)(_root$nx)(_root$ny)}, 'make-subtree')}}}}}, 'make-subtree'));
;
//subtree-svg = AST(\st . st \svg width height root-x root-y . svg)
root.defs._subtree$nsvg = _subtree$nsvg = define('subtree-svg', function(_st){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _svg()}}}}}))}})())});
;
//subtree-width = AST(\st . st \svg width height root-x root-y . width)
root.defs._subtree$nwidth = _subtree$nwidth = define('subtree-width', function(_st){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _width()}}}}}))}})())});
;
//subtree-height = AST(\st . st \svg width height root-x root-y . height)
root.defs._subtree$nheight = _subtree$nheight = define('subtree-height', function(_st){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _height()}}}}}))}})())});
;
//subtree-root-x = AST(\st . st \svg width height root-x root-y . root-x)
root.defs._subtree$nroot$nx = _subtree$nroot$nx = define('subtree-root-x', function(_st){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _root$nx()}}}}}))}})())});
;
//subtree-root-y = AST(\st . st \svg width height root-x root-y . root-y)
root.defs._subtree$nroot$ny = _subtree$nroot$ny = define('subtree-root-y', function(_st){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _root$ny()}}}}}))}})())});
;
//subtree-set-svg = AST(\st value . st \svg width height root-x root-y . make-subtree value width height root-x root-y)
root.defs._subtree$nset$nsvg = _subtree$nset$nsvg = define('subtree-set-svg', function(_st){return function(_value){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _make$nsubtree()(_value)(_width)(_height)(_root$nx)(_root$ny)}}}}}))}})())}});
;
//subtree-set-width = AST(\st value . st \svg width height root-x root-y . make-subtree svg value height root-x root-y)
root.defs._subtree$nset$nwidth = _subtree$nset$nwidth = define('subtree-set-width', function(_st){return function(_value){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _make$nsubtree()(_svg)(_value)(_height)(_root$nx)(_root$ny)}}}}}))}})())}});
;
//subtree-set-height = AST(\st value . st \svg width height root-x root-y . make-subtree svg width value root-x root-y)
root.defs._subtree$nset$nheight = _subtree$nset$nheight = define('subtree-set-height', function(_st){return function(_value){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _make$nsubtree()(_svg)(_width)(_value)(_root$nx)(_root$ny)}}}}}))}})())}});
;
//subtree-set-root-x = AST(\st value . st \svg width height root-x root-y . make-subtree svg width height value root-y)
root.defs._subtree$nset$nroot$nx = _subtree$nset$nroot$nx = define('subtree-set-root-x', function(_st){return function(_value){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _make$nsubtree()(_svg)(_width)(_height)(_value)(_root$ny)}}}}}))}})())}});
;
//subtree-set-root-y = AST(\st value . st \svg width height root-x root-y . make-subtree svg width height root-x value)
root.defs._subtree$nset$nroot$ny = _subtree$nset$nroot$ny = define('subtree-set-root-y', function(_st){return function(_value){return _st()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return function(_root$nx){return function(_root$ny){return _make$nsubtree()(_svg)(_width)(_height)(_root$nx)(_value)}}}}}))}})())}});
;
//treeFor = AST(\ast . svg (subtree-svg (subtreeFor ast)) ([ ([ width | 200 ]) , ([ height | 200 ]) ]))
root.defs._treeFor = _treeFor = define('treeFor', function(_ast){return _svg()((function(){var $m; return function(){return $m || ($m = (_subtree$nsvg()((function(){var $m; return function(){return $m || ($m = (_subtreeFor()(_ast)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "width"}))(_$q)((function(){return 200}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "height"}))(_$q)((function(){return 200}))(_$s)))}})())(_$s)))}})())});
;
//subtreeFor = AST(\ast . (\t . eq t lit (createLitSubtree (pretty (ast id))) (eq t ref (createLitSubtree (pretty (ast id)))) (make-subtree  0 0 0 0)) (typeof ast))
root.defs._subtreeFor = _subtreeFor = define('subtreeFor', function(_ast){return function(_t){return _eq()(_t)((function(){return "lit"}))((function(){var $m; return function(){return $m || ($m = (_createLitSubtree()((function(){var $m; return function(){return $m || ($m = (_pretty()((function(){var $m; return function(){return $m || ($m = (_ast()(_id)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_t)((function(){return "ref"}))((function(){var $m; return function(){return $m || ($m = (_createLitSubtree()((function(){var $m; return function(){return $m || ($m = (_pretty()((function(){var $m; return function(){return $m || ($m = (_ast()(_id)))}})())))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_make$nsubtree()((function(){return ""}))((function(){return 0}))((function(){return 0}))((function(){return 0}))((function(){return 0}))))}})())}((function(){var $m; return function(){return $m || ($m = (_typeof()(_ast)))}})())});
;
//createLitSubtree = AST(\lit . svg-measure-text lit  \w h . (\box-w . (\box-h . make-subtree (concat ([ (rect ([ ([ x | 0 ]) , ([ y | 0 ]) , ([ width | box-w ]) , ([ height | box-h ]) , ([ stroke | black ]) , ([ stroke-width | 2 ]) , ([ fill | green ]) ])) , (text lit ([ ([ text-anchor | middle ]) , ([ dominant-baseline | mathematical ]) , ([ x | (+ 10 (/ w 2)) ]) , ([ y | (+ 5 (/ h 2)) ]) ])) ])) box-w box-h (/ box-w 2) (/ box-h 2)) (+ h 10)) (+ w 20))
root.defs._createLitSubtree = _createLitSubtree = define('createLitSubtree', function(_lit){return _svg$nmeasure$ntext()(_lit)((function(){return ""}))((function(){var $m; return function(){return $m || ($m = (function(_w){return function(_h){return function(_box$nw){return function(_box$nh){return _make$nsubtree()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_rect()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "x"}))(_$q)((function(){return 0}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "y"}))(_$q)((function(){return 0}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "width"}))(_$q)(_box$nw)(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "height"}))(_$q)(_box$nh)(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "stroke"}))(_$q)((function(){return "black"}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "stroke-width"}))(_$q)((function(){return 2}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "fill"}))(_$q)((function(){return "green"}))(_$s)))}})())(_$s)))}})())))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_text()(_lit)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "text-anchor"}))(_$q)((function(){return "middle"}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "dominant-baseline"}))(_$q)((function(){return "mathematical"}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "x"}))(_$q)((function(){var $m; return function(){return $m || ($m = (_$o()((function(){return 10}))((function(){var $m; return function(){return $m || ($m = (_$f()(_w)((function(){return 2}))))}})())))}})())(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "y"}))(_$q)((function(){var $m; return function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return function(){return $m || ($m = (_$f()(_h)((function(){return 2}))))}})())))}})())(_$s)))}})())(_$s)))}})())))}})())(_$s)))}})())))}})())(_box$nw)(_box$nh)((function(){var $m; return function(){return $m || ($m = (_$f()(_box$nw)((function(){return 2}))))}})())((function(){var $m; return function(){return $m || ($m = (_$f()(_box$nh)((function(){return 2}))))}})())}((function(){var $m; return function(){return $m || ($m = (_$o()(_h)((function(){return 10}))))}})())}((function(){var $m; return function(){return $m || ($m = (_$o()(_w)((function(){return 20}))))}})())}}))}})())});
;
//typeof = AST(\x . getType x id false)
root.defs._typeof = _typeof = define('typeof', function(_x){return _getType()(_x)(_id)(_false)});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)