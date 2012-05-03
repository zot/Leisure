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

var _make$nsubtree, _subtree$nsvg, _subtree$nwidth, _subtree$nheight, _subtree$nroot$nx, _subtree$nroot$ny, _subtree$nset$nsvg, _subtree$nset$nwidth, _subtree$nset$nheight, _subtree$nset$nroot$nx, _subtree$nset$nroot$ny, _make$nbox, _box$nsvg, _box$nwidth, _box$nheight, _treeFor, _subtreeFor, _greenStyle, _createLambdaSubtree, _createLitSubtree, _textBox, _typeof;
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
//make-box = AST(\svg width height f . f svg width height)
root.defs._make$nbox = _make$nbox = define('make-box', setDataType(function(_svg){return function(_width){return function(_height){return setType(function(_f){return _f()(_svg)(_width)(_height)}, 'make-box')}}}, 'make-box'));
;
//box-svg = AST(\b . b \svg width height . svg)
root.defs._box$nsvg = _box$nsvg = define('box-svg', function(_b){return _b()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return _svg()}}}))}})())});
;
//box-width = AST(\b . b \svg width height . width)
root.defs._box$nwidth = _box$nwidth = define('box-width', function(_b){return _b()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return _width()}}}))}})())});
;
//box-height = AST(\b . b \svg width height . height)
root.defs._box$nheight = _box$nheight = define('box-height', function(_b){return _b()((function(){var $m; return function(){return $m || ($m = (function(_svg){return function(_width){return function(_height){return _height()}}}))}})())});
;
//treeFor = AST(\ast . svg (subtree-svg (subtreeFor ast)) ([ ([ width | 200 ]) , ([ height | 200 ]) ]))
root.defs._treeFor = _treeFor = define('treeFor', function(_ast){return _svg()((function(){var $m; return function(){return $m || ($m = (_subtree$nsvg()((function(){var $m; return function(){return $m || ($m = (_subtreeFor()(_ast)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "width"}))(_$q)((function(){return 200}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "height"}))(_$q)((function(){return 200}))(_$s)))}})())(_$s)))}})())});
;
//subtreeFor = AST(\ast . (\t . eq t lit (createLitSubtree (pretty (ast id))) (eq t ref (createLitSubtree (pretty (ast id))) (eq t lambda (ast \v b . createLambdaSubtree v b) (make-subtree  0 0 0 0)))) (typeof ast))
root.defs._subtreeFor = _subtreeFor = define('subtreeFor', function(_ast){return function(_t){return _eq()(_t)((function(){return "lit"}))((function(){var $m; return function(){return $m || ($m = (_createLitSubtree()((function(){var $m; return function(){return $m || ($m = (_pretty()((function(){var $m; return function(){return $m || ($m = (_ast()(_id)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_t)((function(){return "ref"}))((function(){var $m; return function(){return $m || ($m = (_createLitSubtree()((function(){var $m; return function(){return $m || ($m = (_pretty()((function(){var $m; return function(){return $m || ($m = (_ast()(_id)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_t)((function(){return "lambda"}))((function(){var $m; return function(){return $m || ($m = (_ast()((function(){var $m; return function(){return $m || ($m = (function(_v){return function(_b){return _createLambdaSubtree()(_v)(_b)}}))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_make$nsubtree()((function(){return ""}))((function(){return 0}))((function(){return 0}))((function(){return 0}))((function(){return 0}))))}})())))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_typeof()(_ast)))}})())});
;
//greenStyle = AST([ ([ stroke | black ]) , ([ stroke-width | 2 ]) , ([ fill | green ]) ])
root.defs._greenStyle = _greenStyle = define('greenStyle', _$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "stroke"}))(_$q)((function(){return "black"}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "stroke-width"}))(_$q)((function(){return 2}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "fill"}))(_$q)((function(){return "green"}))(_$s)))}})())(_$s));
;
//createLambdaSubtree = AST(\v b . (\rootBox . (\rootSvg . (\varBox . (\varSvg . (\bodyTree . (\bodySvg . (\childWidth . (\totalWidth . (\pad . make-subtree (concat ([ (translate varSvg pad (+ (box-height rootBox) 5)) , (translate bodySvg (+ pad (+ (box-width varBox) 5)) (+ (box-height rootBox) 5)) , (translate rootSvg (- (/ totalWidth 2) (/ (box-width rootBox) 2)) 0) ])) totalWidth (+ (+ (box-height rootBox) 5) (max (box-height varBox) (subtree-height bodyTree))) (/ totalWidth 2) (/ (box-height rootBox) 2)) (max 0 (/ (- totalWidth childWidth) 2))) (max childWidth (box-width rootBox))) (+ (+ (box-width varBox) 5) (subtree-width bodyTree))) (subtree-svg bodyTree)) (subtreeFor b)) (box-svg varBox)) (textBox greenStyle v)) (box-svg rootBox)) (textBox greenStyle lambda))
root.defs._createLambdaSubtree = _createLambdaSubtree = define('createLambdaSubtree', function(_v){return function(_b){return function(_rootBox){return function(_rootSvg){return function(_varBox){return function(_varSvg){return function(_bodyTree){return function(_bodySvg){return function(_childWidth){return function(_totalWidth){return function(_pad){return _make$nsubtree()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_translate()(_varSvg)(_pad)((function(){var $m; return function(){return $m || ($m = (_$o()((function(){var $m; return function(){return $m || ($m = (_box$nheight()(_rootBox)))}})())((function(){return 5}))))}})())))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_translate()(_bodySvg)((function(){var $m; return function(){return $m || ($m = (_$o()(_pad)((function(){var $m; return function(){return $m || ($m = (_$o()((function(){var $m; return function(){return $m || ($m = (_box$nwidth()(_varBox)))}})())((function(){return 5}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_$o()((function(){var $m; return function(){return $m || ($m = (_box$nheight()(_rootBox)))}})())((function(){return 5}))))}})())))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_translate()(_rootSvg)((function(){var $m; return function(){return $m || ($m = (_$n()((function(){var $m; return function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))}})())((function(){var $m; return function(){return $m || ($m = (_$f()((function(){var $m; return function(){return $m || ($m = (_box$nwidth()(_rootBox)))}})())((function(){return 2}))))}})())))}})())((function(){return 0}))))}})())(_$s)))}})())))}})())(_totalWidth)((function(){var $m; return function(){return $m || ($m = (_$o()((function(){var $m; return function(){return $m || ($m = (_$o()((function(){var $m; return function(){return $m || ($m = (_box$nheight()(_rootBox)))}})())((function(){return 5}))))}})())((function(){var $m; return function(){return $m || ($m = (_max()((function(){var $m; return function(){return $m || ($m = (_box$nheight()(_varBox)))}})())((function(){var $m; return function(){return $m || ($m = (_subtree$nheight()(_bodyTree)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_$f()(_totalWidth)((function(){return 2}))))}})())((function(){var $m; return function(){return $m || ($m = (_$f()((function(){var $m; return function(){return $m || ($m = (_box$nheight()(_rootBox)))}})())((function(){return 2}))))}})())}((function(){var $m; return function(){return $m || ($m = (_max()((function(){return 0}))((function(){var $m; return function(){return $m || ($m = (_$f()((function(){var $m; return function(){return $m || ($m = (_$n()(_totalWidth)(_childWidth)))}})())((function(){return 2}))))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_max()(_childWidth)((function(){var $m; return function(){return $m || ($m = (_box$nwidth()(_rootBox)))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_$o()((function(){var $m; return function(){return $m || ($m = (_$o()((function(){var $m; return function(){return $m || ($m = (_box$nwidth()(_varBox)))}})())((function(){return 5}))))}})())((function(){var $m; return function(){return $m || ($m = (_subtree$nwidth()(_bodyTree)))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_subtree$nsvg()(_bodyTree)))}})())}((function(){var $m; return function(){return $m || ($m = (_subtreeFor()(_b)))}})())}((function(){var $m; return function(){return $m || ($m = (_box$nsvg()(_varBox)))}})())}((function(){var $m; return function(){return $m || ($m = (_textBox()(_greenStyle)(_v)))}})())}((function(){var $m; return function(){return $m || ($m = (_box$nsvg()(_rootBox)))}})())}((function(){var $m; return function(){return $m || ($m = (_textBox()(_greenStyle)((function(){return "lambda"}))))}})())}});
;
//createLitSubtree = AST(\lit . textBox greenStyle lit \b w h . make-subtree b w h (/ w 2) (/ h 2))
root.defs._createLitSubtree = _createLitSubtree = define('createLitSubtree', function(_lit){return _textBox()(_greenStyle)(_lit)((function(){var $m; return function(){return $m || ($m = (function(_b){return function(_w){return function(_h){return _make$nsubtree()(_b)(_w)(_h)((function(){var $m; return function(){return $m || ($m = (_$f()(_w)((function(){return 2}))))}})())((function(){var $m; return function(){return $m || ($m = (_$f()(_h)((function(){return 2}))))}})())}}}))}})())});
;
//textBox = AST(\map txt . svg-measure-text txt  \w h . (\box-w . (\box-h . make-box (concat ([ (rect ([ ([ x | 0 ]) , ([ y | 0 ]) , ([ width | box-w ]) , ([ height | box-h ]) | map ])) , (text txt ([ ([ text-anchor | middle ]) , ([ dominant-baseline | mathematical ]) , ([ x | (+ 10 (/ w 2)) ]) , ([ y | (+ 5 (/ h 2)) ]) ])) ])) box-w box-h) (+ h 10)) (+ w 20))
root.defs._textBox = _textBox = define('textBox', function(_map){return function(_txt){return _svg$nmeasure$ntext()(_txt)((function(){return ""}))((function(){var $m; return function(){return $m || ($m = (function(_w){return function(_h){return function(_box$nw){return function(_box$nh){return _make$nbox()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_rect()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "x"}))(_$q)((function(){return 0}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "y"}))(_$q)((function(){return 0}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "width"}))(_$q)(_box$nw)(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "height"}))(_$q)(_box$nh)(_$s)))}})())(_$q)(_map)(_$s)))}})())))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_text()(_txt)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "text-anchor"}))(_$q)((function(){return "middle"}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "dominant-baseline"}))(_$q)((function(){return "mathematical"}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "x"}))(_$q)((function(){var $m; return function(){return $m || ($m = (_$o()((function(){return 10}))((function(){var $m; return function(){return $m || ($m = (_$f()(_w)((function(){return 2}))))}})())))}})())(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "y"}))(_$q)((function(){var $m; return function(){return $m || ($m = (_$o()((function(){return 5}))((function(){var $m; return function(){return $m || ($m = (_$f()(_h)((function(){return 2}))))}})())))}})())(_$s)))}})())(_$s)))}})())))}})())(_$s)))}})())))}})())(_box$nw)(_box$nh)}((function(){var $m; return function(){return $m || ($m = (_$o()(_h)((function(){return 10}))))}})())}((function(){var $m; return function(){return $m || ($m = (_$o()(_w)((function(){return 20}))))}})())}}))}})())}});
;
//typeof = AST(\x . getType x id false)
root.defs._typeof = _typeof = define('typeof', function(_x){return _getType()(_x)(_id)(_false)});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)