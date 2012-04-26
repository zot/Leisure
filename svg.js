var svg = (function(){
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

var _insert$nfields, _svg, _svg$nfile, _field, _default$ncircle$nmap, _default$nrect$nmap, _default$nline$nmap, _default$nellipse$nmap, _default$ntext$nmap, _default$npolygon$nmap, _svg$nelement, _circle, _rect, _ellipse, _line, _text, _polygon, _group, _translate, _rotate;
processResult(//AST(require maps)
(_require()((function(){return "maps"}))));
//insert-fields = AST(\map . if (null? map)  (concat ([ (field (first-pair map)) , (insert-fields (rest-pairs map)) ])))
root.defs._insert$nfields = _insert$nfields = define('insert-fields', function(_map){return _if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_map)))}})())((function(){return ""}))((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_field()((function(){var $m; return function(){return $m || ($m = (_first$npair()(_map)))}})())))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_insert$nfields()((function(){var $m; return function(){return $m || ($m = (_rest$npairs()(_map)))}})())))}})())(_$s)))}})())))}})())});
;
//svg = AST(\o map . html (concat ([ <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="scene" style="width:  , (get-value-default width 100 map) , ; height:  , (get-value-default height 100 map) , "> , o , </svg> ])))
root.defs._svg = _svg = define('svg', function(_o){return function(_map){return _html()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" id=\"scene\" style=\"width: "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_get$nvalue$ndefault()((function(){return "width"}))((function(){return 100}))(_map)))}})())(_$b)((function(){return "; height: "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_get$nvalue$ndefault()((function(){return "height"}))((function(){return 100}))(_map)))}})())(_$b)((function(){return "\">"}))(_$b)(_o)(_$b)((function(){return "</svg>"}))(_$s)))}})())))}})())}});
;
//svg-file = AST(\map . html (concat ([ <object xmlns="http://www.w3.org/2000/svg" version="1.1"  , (insert-fields map) , </object> ])))
root.defs._svg$nfile = _svg$nfile = define('svg-file', function(_map){return _html()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_insert$nfields()(_map)))}})())(_$b)((function(){return "</object>"}))(_$s)))}})())))}})())});
;
//field = AST(\cell . concat ([ (key cell) , =" , (value cell) , ",  ]))
root.defs._field = _field = define('field', function(_cell){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_key()(_cell)))}})())(_$b)((function(){return "=\""}))(_$b)((function(){var $m; return function(){return $m || ($m = (_value()(_cell)))}})())(_$b)((function(){return "\", "}))(_$s)))}})())});
;
//default-circle-map = AST(hash-from-list ([ cx , 50 , cy , 50 , r , 40 , stroke , black , stroke-width , 2 , fill , red ]))
root.defs._default$ncircle$nmap = _default$ncircle$nmap = define('default-circle-map', _hash$nfrom$nlist()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "cx"}))(_$b)((function(){return 50}))(_$b)((function(){return "cy"}))(_$b)((function(){return 50}))(_$b)((function(){return "r"}))(_$b)((function(){return 40}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "red"}))(_$s)))}})()));
;
//default-rect-map = AST(hash-from-list ([ x , 1 , y , 1 , width , 50 , height , 50 , stroke , black , stroke-width , 2 , fill , green ]))
root.defs._default$nrect$nmap = _default$nrect$nmap = define('default-rect-map', _hash$nfrom$nlist()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "x"}))(_$b)((function(){return 1}))(_$b)((function(){return "y"}))(_$b)((function(){return 1}))(_$b)((function(){return "width"}))(_$b)((function(){return 50}))(_$b)((function(){return "height"}))(_$b)((function(){return 50}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "green"}))(_$s)))}})()));
;
//default-line-map = AST(hash-from-list ([ x1 , 0 , y1 , 0 , x2 , 50 , y2 , 50 , stroke , black , stroke-width , 2 ]))
root.defs._default$nline$nmap = _default$nline$nmap = define('default-line-map', _hash$nfrom$nlist()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "x1"}))(_$b)((function(){return 0}))(_$b)((function(){return "y1"}))(_$b)((function(){return 0}))(_$b)((function(){return "x2"}))(_$b)((function(){return 50}))(_$b)((function(){return "y2"}))(_$b)((function(){return 50}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$s)))}})()));
;
//default-ellipse-map = AST(hash-from-list ([ cx , 50 , cy , 50 , rx , 40 , ry , 40 , stroke , black , stroke-width , 2 , fill , blue ]))
root.defs._default$nellipse$nmap = _default$nellipse$nmap = define('default-ellipse-map', _hash$nfrom$nlist()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "cx"}))(_$b)((function(){return 50}))(_$b)((function(){return "cy"}))(_$b)((function(){return 50}))(_$b)((function(){return "rx"}))(_$b)((function(){return 40}))(_$b)((function(){return "ry"}))(_$b)((function(){return 40}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "blue"}))(_$s)))}})()));
;
//default-text-map = AST(hash-from-list ([ x , 0 , y , 10 , stroke , black , stroke-width , 2 , fill , black ]))
root.defs._default$ntext$nmap = _default$ntext$nmap = define('default-text-map', _hash$nfrom$nlist()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "x"}))(_$b)((function(){return 0}))(_$b)((function(){return "y"}))(_$b)((function(){return 10}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "black"}))(_$s)))}})()));
;
//default-polygon-map = AST(hash-from-list ([ points , 350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161 , stroke , black , stroke-width , 2 , fill , yellow ]))
root.defs._default$npolygon$nmap = _default$npolygon$nmap = define('default-polygon-map', _hash$nfrom$nlist()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "points"}))(_$b)((function(){return "350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161"}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "yellow"}))(_$s)))}})()));
;
//svg-element = AST(\name map . concat ([ < , name ,   , (insert-fields map) , />" ]))
root.defs._svg$nelement = _svg$nelement = define('svg-element', function(_name){return function(_map){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<"}))(_$b)(_name)(_$b)((function(){return " "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_insert$nfields()(_map)))}})())(_$b)((function(){return "/>\""}))(_$s)))}})())}});
;
//circle = AST(\map . svg-element circle (if (null? map) default-circle-map map))
root.defs._circle = _circle = define('circle', function(_map){return _svg$nelement()((function(){return "circle"}))((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_map)))}})())(_default$ncircle$nmap)(_map)))}})())});
;
//rect = AST(\map . svg-element rect (if (null? map) default-rect-map map))
root.defs._rect = _rect = define('rect', function(_map){return _svg$nelement()((function(){return "rect"}))((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_map)))}})())(_default$nrect$nmap)(_map)))}})())});
;
//ellipse = AST(\map . svg-element ellipse (if (null? map) default-ellipse-map map))
root.defs._ellipse = _ellipse = define('ellipse', function(_map){return _svg$nelement()((function(){return "ellipse"}))((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_map)))}})())(_default$nellipse$nmap)(_map)))}})())});
;
//line = AST(\map . svg-element line (if (null? map) default-line-map map))
root.defs._line = _line = define('line', function(_map){return _svg$nelement()((function(){return "line"}))((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_map)))}})())(_default$nline$nmap)(_map)))}})())});
;
//text = AST(\t map . concat ([ <text  , (insert-fields (if (null? map) default-text-map map)) , > , (if (null? t) undefined t) , </text> ]))
root.defs._text = _text = define('text', function(_t){return function(_map){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<text "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_insert$nfields()((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_map)))}})())(_default$ntext$nmap)(_map)))}})())))}})())(_$b)((function(){return ">"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_t)))}})())((function(){return "undefined"}))(_t)))}})())(_$b)((function(){return "</text>"}))(_$s)))}})())}});
;
//polygon = AST(\map . svg-element polygon (if (null? map) default-polygon-map map))
root.defs._polygon = _polygon = define('polygon', function(_map){return _svg$nelement()((function(){return "polygon"}))((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_null$e()(_map)))}})())(_default$npolygon$nmap)(_map)))}})())});
;
//group = AST(\elem . concat ([ <g> , elem , </g> ]))
root.defs._group = _group = define('group', function(_elem){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<g>"}))(_$b)(_elem)(_$b)((function(){return "</g>"}))(_$s)))}})())});
;
//translate = AST(\elem x y . concat ([ <g transform="translate( , x , ,  , y , )"> , elem , </g> ]))
root.defs._translate = _translate = define('translate', function(_elem){return function(_x){return function(_y){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<g transform=\"translate("}))(_$b)(_x)(_$b)((function(){return ", "}))(_$b)(_y)(_$b)((function(){return ")\">"}))(_$b)(_elem)(_$b)((function(){return "</g>"}))(_$s)))}})())}}});
;
//rotate = AST(\elem r . concat ([ <g transform="rotate( , r , )"> , elem , </g> ]))
root.defs._rotate = _rotate = define('rotate', function(_elem){return function(_r){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "<g transform=\"rotate("}))(_$b)(_r)(_$b)((function(){return ")\">"}))(_$b)(_elem)(_$b)((function(){return "</g>"}))(_$s)))}})())}});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)