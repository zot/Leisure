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

var _svg, _field, _insert$nfields, _circle, _rect, _ellipse, _line, _text, _group, _translate, _rotate;
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
//rect = AST(\map . concat ([ <rect  , (field x 0 map) , (field y 0 map) , (field width 50 map) , (field height 50 map) , (field stroke black map) , (field stroke-width 2 map) , (field fill green map) , /> ]))
root.defs._rect = _rect = define('rect', function(_map){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<rect "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "x"}))((function(){return 0}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "y"}))((function(){return 0}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "width"}))((function(){return 50}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "height"}))((function(){return 50}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke"}))((function(){return "black"}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke-width"}))((function(){return 2}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "fill"}))((function(){return "green"}))(_map)))}})())(_$b)((function(){return "/>"}))(_$s)))}})())});
;
//ellipse = AST(\map . concat ([ <ellipse  , (field cx 50 map) , (field cy 50 map) , (field rx 40 map) , (field ry 40 map) , (field stroke black map) , (field stroke-width 2 map) , (field fill blue map) , /> ]))
root.defs._ellipse = _ellipse = define('ellipse', function(_map){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<ellipse "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "cx"}))((function(){return 50}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "cy"}))((function(){return 50}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "rx"}))((function(){return 40}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "ry"}))((function(){return 40}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke"}))((function(){return "black"}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke-width"}))((function(){return 2}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "fill"}))((function(){return "blue"}))(_map)))}})())(_$b)((function(){return "/>"}))(_$s)))}})())});
;
//line = AST(\map . concat ([ <line  , (field x1 0 map) , (field y1 0 map) , (field x2 50 map) , (field y2 50 map) , (field stroke black map) , (field stroke-width 2 map) , /> ]))
root.defs._line = _line = define('line', function(_map){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<line "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "x1"}))((function(){return 0}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "y1"}))((function(){return 0}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "x2"}))((function(){return 50}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "y2"}))((function(){return 50}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke"}))((function(){return "black"}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke-width"}))((function(){return 2}))(_map)))}})())(_$b)((function(){return "/>"}))(_$s)))}})())});
;
//text = AST(\t map . concat ([ <text  , (field x 0 map) , (field y 0 map) , (field stroke black map) , (field stroke-width 2 map) , (field fill black map) , > , t , </text> ]))
root.defs._text = _text = define('text', function(_t){return function(_map){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<text "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "x"}))((function(){return 0}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "y"}))((function(){return 0}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke"}))((function(){return "black"}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "stroke-width"}))((function(){return 2}))(_map)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_field()((function(){return "fill"}))((function(){return "black"}))(_map)))}})())(_$b)((function(){return ">"}))(_$b)(_t)(_$b)((function(){return "</text>"}))(_$s)))}})())}});
;
//group = AST(\elem . concat ([ <g> , elem , </g> ]))
root.defs._group = _group = define('group', function(_elem){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<g>"}))(_$b)(_elem)(_$b)((function(){return "</g>"}))(_$s)))}})())});
;
//translate = AST(\elem x y . concat ([ <g transform="translate( , x , ,  , y , )"> , elem , </g> ]))
root.defs._translate = _translate = define('translate', function(_elem){return function(_x){return function(_y){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<g transform=\"translate("}))(_$b)(_x)(_$b)((function(){return ", "}))(_$b)(_y)(_$b)((function(){return ")\">"}))(_$b)(_elem)(_$b)((function(){return "</g>"}))(_$s)))}})())}}});
;
//rotate = AST(\elem a . concat ([ <g transform="rotate( , a , )"> , elem , </g> ]))
root.defs._rotate = _rotate = define('rotate', function(_elem){return function(_a){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<g transform=\"rotate("}))(_$b)(_a)(_$b)((function(){return ")\">"}))(_$b)(_elem)(_$b)((function(){return "</g>"}))(_$s)))}})())}});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)