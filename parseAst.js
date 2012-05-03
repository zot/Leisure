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

var _parseRef, _parseLit, _parseLambda, _parseApply, _typeof, _parseAst, _make$nerror, _parseTree, _build$nsvg$nnode, _build$nsvg$nchildren, _build$ntree, _build$nsvg, _tst;
//parseRef = AST(\r tree . add-child tree (make-tree ([ ref , (r id) ])))
root.defs._parseRef = _parseRef = define('parseRef', function(_r){return function(_tree){return _add$nchild()(_tree)((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "ref"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_r()(_id)))}})())(_$s)))}})())))}})())}});
;
//parseLit = AST(\l tree . add-child tree (make-tree ([ lit , (l id) ])))
root.defs._parseLit = _parseLit = define('parseLit', function(_l){return function(_tree){return _add$nchild()(_tree)((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "lit"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_l()(_id)))}})())(_$s)))}})())))}})())}});
;
//parseLambda = AST(\l tree . l \v b . add-child tree (add-child (make-tree ([ lambda , v ])) (parseAst b nil)))
root.defs._parseLambda = _parseLambda = define('parseLambda', function(_l){return function(_tree){return _l()((function(){var $m; return function(){return $m || ($m = (function(_v){return function(_b){return _add$nchild()(_tree)((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "lambda"}))(_$b)(_v)(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_parseAst()(_b)(_nil)))}})())))}})())}}))}})())}});
;
//parseApply = AST(\a tree . a \func arg . add-child tree (add-child (add-child (make-tree ([ apply ,  ])) (parseAst func nil)) (parseAst arg nil)))
root.defs._parseApply = _parseApply = define('parseApply', function(_a){return function(_tree){return _a()((function(){var $m; return function(){return $m || ($m = (function(_func){return function(_arg){return _add$nchild()(_tree)((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_add$nchild()((function(){var $m; return function(){return $m || ($m = (_make$ntree()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "apply"}))(_$b)((function(){return ""}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_parseAst()(_func)(_nil)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_parseAst()(_arg)(_nil)))}})())))}})())}}))}})())}});
;
//typeof = AST(\x . getType x id false)
root.defs._typeof = _typeof = define('typeof', function(_x){return _getType()(_x)(_id)(_false)});
;
//parseAst = AST(\a tree . (\t . eq t ref (parseRef a tree) (eq t lit (parseLit a tree) (eq t lambda (parseLambda a tree) (parseApply a tree)))) (typeof a))
root.defs._parseAst = _parseAst = define('parseAst', function(_a){return function(_tree){return function(_t){return _eq()(_t)((function(){return "ref"}))((function(){var $m; return function(){return $m || ($m = (_parseRef()(_a)(_tree)))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_t)((function(){return "lit"}))((function(){var $m; return function(){return $m || ($m = (_parseLit()(_a)(_tree)))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_t)((function(){return "lambda"}))((function(){var $m; return function(){return $m || ($m = (_parseLambda()(_a)(_tree)))}})())((function(){var $m; return function(){return $m || ($m = (_parseApply()(_a)(_tree)))}})())))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_typeof()(_a)))}})())}});
;
//make-error = AST(\err . make-tree ([ error , (err id) ]))
root.defs._make$nerror = _make$nerror = define('make-error', function(_err){return _make$ntree()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "error"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_err()(_id)))}})())(_$s)))}})())});
;
//parseTree = AST(\s . parse s \x . parseAst x nil make-error)
root.defs._parseTree = _parseTree = define('parseTree', function(_s){return _parse()(_s)((function(){var $m; return function(){return $m || ($m = (function(_x){return _parseAst()(_x)(_nil)}))}})())(_make$nerror)});
;
//build-svg-node = AST(\n . rect nil)
root.defs._build$nsvg$nnode = _build$nsvg$nnode = define('build-svg-node', function(_n){return _rect()(_nil)});
;
//build-svg-children = AST(\t . )
root.defs._build$nsvg$nchildren = _build$nsvg$nchildren = define('build-svg-children', function(_t){return ""});
;
//build-tree = AST(\c . if (null? c)  (concat ([ build-svg-node (data c) , build-svg-children (first-child c) ])))
root.defs._build$ntree = _build$ntree = define('build-tree', function(_c){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_c)))}})())((function(){return ""}))((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()(_build$nsvg$nnode)((function(){var $m; return function(){return $m || ($m = (_data()(_c)))}})())(_$b)(_build$nsvg$nchildren)((function(){var $m; return function(){return $m || ($m = (_first$nchild()(_c)))}})())(_$s)))}})())))}})())});
;
//build-svg = AST(\tree . traverse-infix tree build-tree)
root.defs._build$nsvg = _build$nsvg = define('build-svg', function(_tree){return _traverse$ninfix()(_tree)(_build$ntree)});
;
//tst = AST(build-svg (parseTree 1))
root.defs._tst = _tst = define('tst', _build$nsvg()((function(){var $m; return function(){return $m || ($m = (_parseTree()((function(){return "1"}))))}})()));
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)