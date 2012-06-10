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

setType = Leisure.setType;
var setDataType = Leisure.setDataType;
var define = Leisure.define;
var defineMacro = Leisure.defineMacro;
var defineToken = Leisure.defineToken;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var Nil = Leisure.Nil;
var cons = Leisure.cons;
var _insert$_fields, _svg$_template, _svg, _svg$_file, _field, _default$_circle$_map, _default$_rect$_map, _default$_line$_map, _default$_ellipse$_map, _default$_text$_map, _default$_polygon$_map, _svg$_node, _svg$_nodes, _svg$_concat, _svg$_element, _svg$_measure, _svg$_present, _circle, _rect, _ellipse, _line, _text, _polygon, _group, _translate, _rotate;
processResult(//AST(require maps)
(_require()((function(){return "maps"}))));
//insert-fields = AST(\map . if (null? map)  (concat ([ (field (first-pair map)) , (insert-fields (rest-pairs map)) ])))
root.defs._insert$_fields = _insert$_fields = Leisure.define('insert-fields', (function(_map){return _if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())((function(){return ""}))((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_field()((function(){var $m; return (function(){return $m || ($m = (_first$_pair()(_map)))})})())))})})())(_$b)((function(){var $m; return (function(){return $m || ($m = (_insert$_fields()((function(){var $m; return (function(){return $m || ($m = (_rest$_pairs()(_map)))})})())))})})())(_$s)))})})())))})})());}), 1, "\\map. if (null? map) ''\n  concat [ (field (first-pair map)), (insert-fields (rest-pairs map)) ]");
;
//svg-template = AST(\attrs contents . html (concat ([ <svg xmlns="http://www.w3.org/2000/svg" version="1.1"  , attrs , > , contents , </svg> ])))
root.defs._svg$_template = _svg$_template = Leisure.define('svg-template', (function(_attrs){return function(_contents){return _html()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" "}))(_$b)(_attrs)(_$b)((function(){return ">"}))(_$b)(_contents)(_$b)((function(){return "</svg>"}))(_$s)))})})())))})})());};}), 2, "\\attrs. \\contents. html (concat [ '<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ', attrs, '>', contents, '</svg>'])");
;
//svg = AST(\o map . svg-template (concat ([ style="width:  , (get-value-default width 100 map) , ; height:  , (get-value-default height 100 map) , " ])) (o id))
root.defs._svg = _svg = Leisure.define('svg', (function(_o){return function(_map){return _svg$_template()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "style=\"width: "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_get$_value$_default()((function(){return "width"}))((function(){return 100}))(_map)))})})())(_$b)((function(){return "; height: "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_get$_value$_default()((function(){return "height"}))((function(){return 100}))(_map)))})})())(_$b)((function(){return "\""}))(_$s)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_o()(_id)))})})());};}), 2, "\\o. \\map. svg-template (concat ['style=\"width: ', (get-value-default 'width' 100 map), '; height: ' , (get-value-default 'height' 100 map), '\"']) (o id)");
;
//svg-file = AST(\map . html (concat ([ <object xmlns="http://www.w3.org/2000/svg" version="1.1"  , (insert-fields map) , </object> ])))
root.defs._svg$_file = _svg$_file = Leisure.define('svg-file', (function(_map){return _html()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_insert$_fields()(_map)))})})())(_$b)((function(){return "</object>"}))(_$s)))})})())))})})());}), 1, "\\map. html (concat [ '<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ', (insert-fields map), '</object>' ] )");
;
//field = AST(\cell . concat ([ (key cell) , =" , (value cell) , "  ]))
root.defs._field = _field = Leisure.define('field', (function(_cell){return _concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){var $m; return (function(){return $m || ($m = (_key()(_cell)))})})())(_$b)((function(){return "=\""}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_value()(_cell)))})})())(_$b)((function(){return "\" "}))(_$s)))})})());}), 1, "\\cell. concat [ (key cell), '=\"', (value cell), '\" ' ]");
;
//default-circle-map = AST(hash-from-list ([ cx , 50 , cy , 50 , r , 40 , stroke , black , stroke-width , 2 , fill , red ]))
root.defs._default$_circle$_map = _default$_circle$_map = Leisure.define('default-circle-map', (_hash$_from$_list()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "cx"}))(_$b)((function(){return 50}))(_$b)((function(){return "cy"}))(_$b)((function(){return 50}))(_$b)((function(){return "r"}))(_$b)((function(){return 40}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "red"}))(_$s)))})})())), 0, "hash-from-list [ 'cx', 50, 'cy', 50, 'r', 40, 'stroke', 'black', 'stroke-width', 2, 'fill', 'red' ]");
;
//default-rect-map = AST(hash-from-list ([ x , 1 , y , 1 , width , 50 , height , 50 , stroke , black , stroke-width , 2 , fill , green ]))
root.defs._default$_rect$_map = _default$_rect$_map = Leisure.define('default-rect-map', (_hash$_from$_list()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x"}))(_$b)((function(){return 1}))(_$b)((function(){return "y"}))(_$b)((function(){return 1}))(_$b)((function(){return "width"}))(_$b)((function(){return 50}))(_$b)((function(){return "height"}))(_$b)((function(){return 50}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "green"}))(_$s)))})})())), 0, "hash-from-list [ 'x', 1, 'y', 1, 'width', 50, 'height', 50, 'stroke', 'black', 'stroke-width', 2, 'fill', 'green' ]");
;
//default-line-map = AST(hash-from-list ([ x1 , 0 , y1 , 0 , x2 , 50 , y2 , 50 , stroke , black , stroke-width , 2 ]))
root.defs._default$_line$_map = _default$_line$_map = Leisure.define('default-line-map', (_hash$_from$_list()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x1"}))(_$b)((function(){return 0}))(_$b)((function(){return "y1"}))(_$b)((function(){return 0}))(_$b)((function(){return "x2"}))(_$b)((function(){return 50}))(_$b)((function(){return "y2"}))(_$b)((function(){return 50}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$s)))})})())), 0, "hash-from-list [ 'x1', 0, 'y1', 0, 'x2', 50, 'y2', 50, 'stroke', 'black', 'stroke-width', 2 ]");
;
//default-ellipse-map = AST(hash-from-list ([ cx , 50 , cy , 50 , rx , 40 , ry , 40 , stroke , black , stroke-width , 2 , fill , blue ]))
root.defs._default$_ellipse$_map = _default$_ellipse$_map = Leisure.define('default-ellipse-map', (_hash$_from$_list()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "cx"}))(_$b)((function(){return 50}))(_$b)((function(){return "cy"}))(_$b)((function(){return 50}))(_$b)((function(){return "rx"}))(_$b)((function(){return 40}))(_$b)((function(){return "ry"}))(_$b)((function(){return 40}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "blue"}))(_$s)))})})())), 0, "hash-from-list [ 'cx', 50, 'cy', 50, 'rx', 40, 'ry', 40, 'stroke', 'black', 'stroke-width', 2, 'fill', 'blue' ]");
;
//default-text-map = AST(hash-from-list ([ x , 0 , y , 10 , stroke , black , stroke-width , 2 , fill , black ]))
root.defs._default$_text$_map = _default$_text$_map = Leisure.define('default-text-map', (_hash$_from$_list()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "x"}))(_$b)((function(){return 0}))(_$b)((function(){return "y"}))(_$b)((function(){return 10}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "black"}))(_$s)))})})())), 0, "hash-from-list [ 'x', 0, 'y', 10, 'stroke', 'black', 'stroke-width', 2, 'fill', 'black' ]");
;
//default-polygon-map = AST(hash-from-list ([ points , 350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161 , stroke , black , stroke-width , 2 , fill , yellow ]))
root.defs._default$_polygon$_map = _default$_polygon$_map = Leisure.define('default-polygon-map', (_hash$_from$_list()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "points"}))(_$b)((function(){return "350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161"}))(_$b)((function(){return "stroke"}))(_$b)((function(){return "black"}))(_$b)((function(){return "stroke-width"}))(_$b)((function(){return 2}))(_$b)((function(){return "fill"}))(_$b)((function(){return "yellow"}))(_$s)))})})())), 0, "hash-from-list [ 'points', '350,75  379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161', 'stroke', 'black', 'stroke-width', 2, 'fill', 'yellow' ]");
;
//svg-node = AST(\contents f . f contents)
root.defs._svg$_node = _svg$_node = Leisure.define('svg-node', (Leisure.setDataType(function(_contents){return Leisure.setType(function(_f){return _f()(_contents);}, 'svg-node');}, 'svg-node')), 1, "\\contents. \\f . f contents");
;
//svg-nodes = AST(\nodeList . nodeList \h t D . cons (h id) (svg-nodes t) nil)
root.defs._svg$_nodes = _svg$_nodes = Leisure.define('svg-nodes', (function(_nodeList){return _nodeList()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()((function(){var $m; return (function(){return $m || ($m = (_h()(_id)))})})())((function(){var $m; return (function(){return $m || ($m = (_svg$_nodes()(_t)))})})());};};}))})})())(_nil);}), 1, "\\nodeList. nodeList (\\h t D . cons (h id) (svg-nodes t)) nil");
;
//svg-concat = AST(\nodeList . svg-node (concat (svg-nodes nodeList)))
root.defs._svg$_concat = _svg$_concat = Leisure.define('svg-concat', (function(_nodeList){return _svg$_node()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_svg$_nodes()(_nodeList)))})})())))})})());}), 1, "\\nodeList. svg-node (concat (svg-nodes nodeList))");
;
//svg-element = AST(\name map . svg-node (concat ([ < , name ,   , (insert-fields map) , /> ])))
root.defs._svg$_element = _svg$_element = Leisure.define('svg-element', (function(_name){return function(_map){return _svg$_node()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<"}))(_$b)(_name)(_$b)((function(){return " "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_insert$_fields()(_map)))})})())(_$b)((function(){return "/>"}))(_$s)))})})())))})})());};}), 2, "\\name. \\map. svg-node (concat [ '<', name, ' ', (insert-fields map), '/>' ])");
;
//svg-measure = AST(\content . prim-svg-measure content)
root.defs._svg$_measure = _svg$_measure = Leisure.define('svg-measure', (function(_content){return _prim$_svg$_measure()(_content);}), 1, "\\content. prim-svg-measure content");
;
//svg-present = AST(\content . svg-measure content \x y w h . svg-template (concat ([ width=' , w , ' height=' , h , ' viewbox=' , x ,   , y ,   , w ,   , h , ' ])) content)
root.defs._svg$_present = _svg$_present = Leisure.define('svg-present', (function(_content){return _svg$_measure()(_content)((function(){var $m; return (function(){return $m || ($m = (function(_x){return function(_y){return function(_w){return function(_h){return _svg$_template()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "width='"}))(_$b)(_w)(_$b)((function(){return "' height='"}))(_$b)(_h)(_$b)((function(){return "' viewbox='"}))(_$b)(_x)(_$b)((function(){return " "}))(_$b)(_y)(_$b)((function(){return " "}))(_$b)(_w)(_$b)((function(){return " "}))(_$b)(_h)(_$b)((function(){return "'"}))(_$s)))})})())))})})())(_content);};};};}))})})());}), 1, "\\content. svg-measure content \\x y w h .\n  svg-template (concat [\"width='\", w, \"' height='\", h, \"' viewbox='\", x, ' ', y, ' ', w, ' ', h, \"'\"]) content");
;
//circle = AST(\map . svg-element circle (if (null? map) default-circle-map map))
root.defs._circle = _circle = Leisure.define('circle', (function(_map){return _svg$_element()((function(){return "circle"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_default$_circle$_map)(_map)))})})());}), 1, "\\map. svg-element 'circle' (if (null? map) default-circle-map map)");
;
//rect = AST(\map . svg-element rect (if (null? map) default-rect-map map))
root.defs._rect = _rect = Leisure.define('rect', (function(_map){return _svg$_element()((function(){return "rect"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_default$_rect$_map)(_map)))})})());}), 1, "\\map. svg-element 'rect' (if (null? map) default-rect-map map)");
;
//ellipse = AST(\map . svg-element ellipse (if (null? map) default-ellipse-map map))
root.defs._ellipse = _ellipse = Leisure.define('ellipse', (function(_map){return _svg$_element()((function(){return "ellipse"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_default$_ellipse$_map)(_map)))})})());}), 1, "\\map. svg-element 'ellipse' (if (null? map) default-ellipse-map map)");
;
//line = AST(\map . svg-element line (if (null? map) default-line-map map))
root.defs._line = _line = Leisure.define('line', (function(_map){return _svg$_element()((function(){return "line"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_default$_line$_map)(_map)))})})());}), 1, "\\map. svg-element 'line' (if (null? map) default-line-map map)");
;
//text = AST(\t map . svg-node (concat ([ <text  , (insert-fields (if (null? map) default-text-map map)) , > , (if (null? t) undefined t) , </text> ])))
root.defs._text = _text = Leisure.define('text', (function(_t){return function(_map){return _svg$_node()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<text "}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_insert$_fields()((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_default$_text$_map)(_map)))})})())))})})())(_$b)((function(){return ">"}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_t)))})})())((function(){return "undefined"}))(_t)))})})())(_$b)((function(){return "</text>"}))(_$s)))})})())))})})());};}), 2, "\\t. \\map. svg-node (concat [ '<text ', (insert-fields (if (null? map) default-text-map map)), '>', (if (null? t) 'undefined' t), '</text>' ])");
;
//polygon = AST(\map . svg-element polygon (if (null? map) default-polygon-map map))
root.defs._polygon = _polygon = Leisure.define('polygon', (function(_map){return _svg$_element()((function(){return "polygon"}))((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_null$e()(_map)))})})())(_default$_polygon$_map)(_map)))})})());}), 1, "\\map. svg-element 'polygon' (if (null? map) default-polygon-map map)");
;
//group = AST(\elem . svg-node (concat ([ <g> , (elem id) , </g> ])))
root.defs._group = _group = Leisure.define('group', (function(_elem){return _svg$_node()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<g>"}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())(_$b)((function(){return "</g>"}))(_$s)))})})())))})})());}), 1, "\\elem. svg-node (concat [ '<g>', (elem id), '</g>' ])");
;
//translate = AST(\elem x y . svg-node (concat ([ <g transform="translate( , x , ,  , y , )"> , (elem id) , </g> ])))
root.defs._translate = _translate = Leisure.define('translate', (function(_elem){return function(_x){return function(_y){return _svg$_node()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<g transform=\"translate("}))(_$b)(_x)(_$b)((function(){return ", "}))(_$b)(_y)(_$b)((function(){return ")\">"}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())(_$b)((function(){return "</g>"}))(_$s)))})})())))})})());};};}), 3, "\\elem. \\x. \\y. svg-node (concat ['<g transform=\"translate(', x, ', ', y, ')\">', (elem id), '</g>' ])");
;
//rotate = AST(\elem r . svg-node (concat ([ <g transform="rotate( , r , )"> , (elem id) , </g> ])))
root.defs._rotate = _rotate = Leisure.define('rotate', (function(_elem){return function(_r){return _svg$_node()((function(){var $m; return (function(){return $m || ($m = (_concat()((function(){var $m; return (function(){return $m || ($m = (_$r()((function(){return "<g transform=\"rotate("}))(_$b)(_r)(_$b)((function(){return ")\">"}))(_$b)((function(){var $m; return (function(){return $m || ($m = (_elem()(_id)))})})())(_$b)((function(){return "</g>"}))(_$s)))})})())))})})());};}), 2, "\\elem. \\r. svg-node (concat ['<g transform=\"rotate(', r, ')\">', (elem id), '</g>' ])");
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)