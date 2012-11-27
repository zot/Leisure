var pattern = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  pattern = root = {};
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


var Nil = Parse.Nil;
var cons = Parse.cons;
var primCons = Parse.primCons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var wrapContext = Leisure.wrapContext;
var markLeisureErrors = Leisure.markLeisureErrors;processResult(//AST("nothing, yet")
("nothing, yet"));

//if (typeof window !== 'undefined' && window !== null) {
//  Leisure.processTokenDefs(root.tokenDefs);
//}
return root;
}).call(this)