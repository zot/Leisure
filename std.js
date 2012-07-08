var std = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  std = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
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
var _concat$r, _or$r, _lexAsCons, _maluba, _i, _i;
processResult(//AST(defGroup "concat[" "]")
(_defGroup()((function(){return "concat["}))((function(){return "]"}))));
processResult(//AST(defGroup "or[" "]")
(_defGroup()((function(){return "or["}))((function(){return "]"}))));
processResult(//AST(defGroup "and[" "]")
(_defGroup()((function(){return "and["}))((function(){return "]"}))));
//concat[ = AST(λlist . [ "concat" (cons "[" (tail list)) ])
root.defs._concat$r = _concat$r = Parse.defineMacro('concat[', (function() {var f = (function(_list){return _$r()((function(){return "concat"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "["}))((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())(_$s);}); return function _concat$r(){return f;}})(), 1, "\\list. ['concat' (cons '[' (tail list))]");
root.tokenDefs.push('concat[', '=M=');;
//or[ = AST(λlist . (λargs . eq args nil ([ "true" ]) (eq (tail args) nil args (foldr1 λv el . [ "or" v el ] args))) (dropLast 1 (tail list)))
root.defs._or$r = _or$r = Parse.defineMacro('or[', (function() {var f = (function(_list){return function(_args){return _eq()(_args)(_nil)((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "true"}))(_$s)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_args)))})})())(_nil)(_args)((function(){var $m; return (function(){return $m || ($m = (_foldr1()((function(){var $m; return (function(){return $m || ($m = (function(_v){return function(_el){return _$r()((function(){return "or"}))(_v)(_el)(_$s);};}))})})())(_args)))})})())))})})());}((function(){var $m; return (function(){return $m || ($m = (_dropLast()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})());}); return function _or$r(){return f;}})(), 1, "\\list. do\n  args = (dropLast 1 (tail list))\n  eq args nil\n    ['true']\n    eq (tail args) nil\n      args\n      foldr1 (\\v el . ['or' v el]) args");
root.tokenDefs.push('or[', '=M=');;
//lexAsCons = AST(λl . eq l nil nil (is l lexCons (cons (lexAsCons (head l)) (lexAsCons (tail l))) (is l token (tokenName l) l)))
root.defs._lexAsCons = _lexAsCons = Parse.define('lexAsCons', (function() {var f = (function(_l){return _eq()(_l)(_nil)(_nil)((function(){var $m; return (function(){return $m || ($m = (_is()(_l)(_lexCons)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_lexAsCons()((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_lexAsCons()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_is()(_l)(_token)((function(){var $m; return (function(){return $m || ($m = (_tokenName()(_l)))})})())(_l)))})})())))})})());}); return function _lexAsCons(){return f;}})(), 1, "\\l. eq l nil\n  nil\n  is l lexCons\n    cons (lexAsCons (head l)) (lexAsCons (tail l))\n    is l token\n      tokenName l\n      l");;
//maluba = AST(λx f . f x)
root.defs._maluba = _maluba = Parse.define('maluba', (function() {var f = (Parse.setDataType(function(_x){return Parse.setType(function(_f){return _f()(_x);}, 'maluba');}, 'maluba')); return function _maluba(){return f;}})(), 1, "\\x. \\f . f x");;
//i = AST(λx . x)
root.defs._i = _i = Parse.define('i', (function() {var f = (function(_x){return _x();}); return function _i(){return f;}})(), 1, "\\x. x");;
//i = AST(λx . concat ([ "maluba: " (x id) ]))
root.defs._i = _i = Leisure.makeDispatchFunction('i', '_i', '_x', ['_i', '_x']);
Leisure.createMethod('maluba', 'i', "\\x. concat ['maluba: ' (x id)]", function(_x) {return _concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "maluba: "}))((function(){var $m; return (function(){return $m || ($m = (_x()(_id)))})})())(_$s)))})})());});

//if (typeof window !== 'undefined' && window !== null) {
//  Leisure.processTokenDefs(root.tokenDefs);
//}
return root;
}).call(this)