(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  svg = root = {};
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

var _svg, _field, _insert$nfields, _circle;
//svg = AST(\o map . html (concat ([ <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width:  , (get-value-default width 100 map) , ; height:  , (get-value-default height 100 map) , "> , o , </svg> ])))
root.defs._svg = _svg = define('svg', function(_o){return function(_map){return _html()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" style=\"width: "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_get$nvalue$ndefault()((function(){return "width"}))((function(){return 100}))(_map)))}})())(_$b)((function(){return "; height: "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_get$nvalue$ndefault()((function(){return "height"}))((function(){return 100}))(_map)))}})())(_$b)((function(){return "\">"}))(_$b)(_o)(_$b)((function(){return "</svg>"}))(_$s)))}})())))}})())}});
;
//field = AST(\name default map . concat ([ name , =" , (get-value-default name default map) , ",  ]))
root.defs._field = _field = define('field', function(_name){return function(_default){return function(_map){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()(_name)(_$b)((function(){return "=\""}))(_$b)((function(){var $m; return function(){return $m || ($m = (_get$nvalue$ndefault()(_name)(_default)(_map)))}})())(_$b)((function(){return "\", "}))(_$s)))}})())}}});
;
//insert-fields = AST(\list map . if (null? list)  (concat ([ (field (head list) (head (tail list)) map) , (insert-fields (tail (tail list)) map) ])))
root.defs._insert$nfields = _insert$nfields = define('insert-fields', function(_list){return function(_map){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_list)))}})())((function(){return ""}))((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_field()((function(){var $m; return function(){return $m || ($m = (_head()(_list)))}})())((function(){var $m; return function(){return $m || ($m = (_head()((function(){var $m; return function(){return $m || ($m = (_tail()(_list)))}})())))}})())(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_insert$nfields()((function(){var $m; return function(){return $m || ($m = (_tail()((function(){var $m; return function(){return $m || ($m = (_tail()(_list)))}})())))}})())(_map)))}})())(_$s)))}})())))}})())}});
;
//circle = AST(\map . concat ([ <circle  , (field cx 50 map) , (field cy 50 map) , (field r 40 map) , (field stroke black map) , (field stroke-width 2 map) , (field fill red map) , /> ]))
root.defs._circle = _circle = define('circle', function(_map){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<circle "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "cx"}))((function(){return 50}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "cy"}))((function(){return 50}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "r"}))((function(){return 40}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke"}))((function(){return "black"}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke-width"}))((function(){return 2}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "fill"}))((function(){return "red"}))(_map)))}})())(_$b)((function(){return "/>"}))(_$s)))}})())});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)