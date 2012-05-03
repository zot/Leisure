var printAst = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  printAst = root = {};
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

var _printRef, _printLit, _printLambda, _printApply, _typeof, _printAst;
//printRef = AST(\r . concat ([ (ref  , (r id) , ) ]))
root.defs._printRef = _printRef = define('printRef', function(_r){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "(ref "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_r()(_id)))}})())(_$b)((function(){return ")"}))(_$s)))}})())});
;
//printLit = AST(\l . concat ([ (lit  , (l id) , ) ]))
root.defs._printLit = _printLit = define('printLit', function(_l){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "(lit "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_l()(_id)))}})())(_$b)((function(){return ")"}))(_$s)))}})())});
;
//printLambda = AST(\l . l \v b . concat ([ (lambda  , v ,  .  , (printAst b) , ) ]))
root.defs._printLambda = _printLambda = define('printLambda', function(_l){return _l()((function(){var $m; return function(){return $m || ($m = (function(_v){return function(_b){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "(lambda "}))(_$b)(_v)(_$b)((function(){return " . "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_printAst()(_b)))}})())(_$b)((function(){return ")"}))(_$s)))}})())}}))}})())});
;
//printApply = AST(\a . a \func arg . concat ([ (apply  , (printAst func) ,   , (printAst arg) , ) ]))
root.defs._printApply = _printApply = define('printApply', function(_a){return _a()((function(){var $m; return function(){return $m || ($m = (function(_func){return function(_arg){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "(apply "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_printAst()(_func)))}})())(_$b)((function(){return " "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_printAst()(_arg)))}})())(_$b)((function(){return ")"}))(_$s)))}})())}}))}})())});
;
//typeof = AST(\x . getType x id false)
root.defs._typeof = _typeof = define('typeof', function(_x){return _getType()(_x)(_id)(_false)});
;
//printAst = AST(\a . (\t . eq t ref (printRef a) (eq t lit (printLit a) (eq t lambda (printLambda a) (printApply a)))) (typeof a))
root.defs._printAst = _printAst = define('printAst', function(_a){return function(_t){return _eq()(_t)((function(){return "ref"}))((function(){var $m; return function(){return $m || ($m = (_printRef()(_a)))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_t)((function(){return "lit"}))((function(){var $m; return function(){return $m || ($m = (_printLit()(_a)))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_t)((function(){return "lambda"}))((function(){var $m; return function(){return $m || ($m = (_printLambda()(_a)))}})())((function(){var $m; return function(){return $m || ($m = (_printApply()(_a)))}})())))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_typeof()(_a)))}})())});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)