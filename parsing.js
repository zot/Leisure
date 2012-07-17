var parsing = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  parsing = root = {};
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
var define = Parse.define;processResult(//AST((λx . bind (defInfixToken "*" "before" nil) λ_ . bind (defInfixToken "/" "at" "*") λ_ . bind (defInfixToken "+" "at" nil) λ_ . bind (defInfixToken "-" "at" "+") λ_ . (λx . addParseFilter mainParseInfix) (log "filter" 2)) (log "infix" 1))
(function(_x){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "*"}))((function(){return "before"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "/"}))((function(){return "at"}))((function(){return "*"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "+"}))((function(){return "at"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return (function(){return $m || ($m = (_defInfixToken()((function(){return "-"}))((function(){return "at"}))((function(){return "+"}))))})})())((function(){var $m; return (function(){return $m || ($m = (function(__){return function(_x){return _addParseFilter()(_mainParseInfix);}((function(){var $m; return (function(){return $m || ($m = (_log()((function(){return "filter"}))((function(){return 2}))))})})());}))})})());}))})})());}))})})());}))})})());}((function(){var $m; return (function(){return $m || ($m = (_log()((function(){return "infix"}))((function(){return 1}))))})})())));

//if (typeof window !== 'undefined' && window !== null) {
//  Leisure.processTokenDefs(root.tokenDefs);
//}
return root;
}).call(this)