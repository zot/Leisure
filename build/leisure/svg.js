"use strict";
define([], function(){
  return L_runMonads([
    function(){return resolve(L_newDefine)("assocGetWithDefault", 3, "assocGetWithDefault key defaultValue map = assoc key map id defaultValue", lazy((function(){
  var L_$F = function(L_key, L_defaultValue, L_map) {
    return L_checkPartial(L_$F, arguments) || resolve(L_assoc)(L_key, L_map)(L_id)(L_defaultValue);
  };
  L_$F.leisureFunctionId = 32;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("insertFields", 1, "insertFields map = (isNil map) ''\r\n  concat[(field (head map)) (insertFields (tail map))]", lazy((function(){
  var L_$F = (function(L_map){return resolve(L_isNil)(L_map)("")(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(function(){return resolve(L_field)(function(){return resolve(L_head)(L_map);});}, function(){return resolve(L_cons)(function(){return resolve(L_insertFields)(function(){return resolve(L_tail)(L_map);});}, L_nil);});});})});
  L_$F.leisureFunctionId = 33;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("svgTemplate", 2, "svgTemplate attrs contents = html concat['<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ' attrs '>' contents '</svg>']", lazy((function(){
  var L_$F = function(L_attrs, L_contents) {
    return L_checkPartial(L_$F, arguments) || resolve(L_html)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", function(){return resolve(L_cons)(L_attrs, function(){return resolve(L_cons)(">", function(){return resolve(L_cons)(L_contents, function(){return resolve(L_cons)("</svg>", L_nil);});});});});});});
  };
  L_$F.leisureFunctionId = 34;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("svg", 2, "svg o map = svgTemplate concat['style=\"width: ' (assocGetWithDefault 'width' 100 map) 'px; height: '  (assocGetWithDefault 'height' 100 map) 'px\"'] (o id)", lazy((function(){
  var L_$F = function(L_o, L_map) {
    return L_checkPartial(L_$F, arguments) || resolve(L_svgTemplate)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("style=\"width: ", function(){return resolve(L_cons)(function(){return resolve(L_assocGetWithDefault)("width", 100, L_map);}, function(){return resolve(L_cons)("px; height: ", function(){return resolve(L_cons)(function(){return resolve(L_assocGetWithDefault)("height", 100, L_map);}, function(){return resolve(L_cons)("px\"", L_nil);});});});});});}, function(){return resolve(L_o)(L_id);});
  };
  L_$F.leisureFunctionId = 35;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("svgFile", 1, "svgFile map = html concat['<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ' (insertFields map) '</object>']", lazy((function(){
  var L_$F = (function(L_map){return resolve(L_html)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", function(){return resolve(L_cons)(function(){return resolve(L_insertFields)(L_map);}, function(){return resolve(L_cons)("</object>", L_nil);});});});})});
  L_$F.leisureFunctionId = 36;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("field", 1, "field cell = cell \\key value . concat[key '=\"' value '\" ']", lazy((function(){
  var L_$F = (function(L_cell){return resolve(L_cell)(lazy((function(){
  var L_$F = (function(L_key){return (function(){
  var L_$F = (function(L_value){return resolve(L_strCat)(function(){return resolve(L_cons)(L_key, function(){return resolve(L_cons)("=\"", function(){return resolve(L_cons)(L_value, function(){return resolve(L_cons)("\" ", L_nil);});});});})});
  L_$F.leisureFunctionId = 39;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 38;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 37;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("defaultCircleMap", 0, "defaultCircleMap = ['cx':50 'cy':50 'r':40 'stroke':'black' 'stroke-width':2 'fill':'red']", function(){return resolve(L_cons)(function(){return resolve(L_cons)("cx", 50);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("cy", 50);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("r", 40);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("fill", "red");}, L_nil);});});});});});})},
    function(){return resolve(L_newDefine)("defaultRectMap", 0, "defaultRectMap = ['x':1 'y':1 'width':50 'height':50 'stroke':'black' 'stroke-width':2 'fill':'green']", function(){return resolve(L_cons)(function(){return resolve(L_cons)("x", 1);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("y", 1);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("width", 50);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("height", 50);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("fill", "green");}, L_nil);});});});});});});})},
    function(){return resolve(L_newDefine)("defaultLineMap", 0, "defaultLineMap = ['x1':0 'y1':0 'x2':50 'y2':50 'stroke':'black' 'stroke-width':2]", function(){return resolve(L_cons)(function(){return resolve(L_cons)("x1", 0);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("y1", 0);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("x2", 50);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("y2", 50);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2);}, L_nil);});});});});});})},
    function(){return resolve(L_newDefine)("defaultEllipseMap", 0, "defaultEllipseMap = ['cx':50 'cy':50 'rx':40 'ry':40 'stroke':'black' 'stroke-width':2 'fill':'blue']", function(){return resolve(L_cons)(function(){return resolve(L_cons)("cx", 50);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("cy", 50);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("rx", 40);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("ry", 40);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("fill", "blue");}, L_nil);});});});});});});})},
    function(){return resolve(L_newDefine)("defaultTextMap", 0, "defaultTextMap = ['x':0 'y':10 'stroke':'black' 'stroke-width':2 'fill':'black']", function(){return resolve(L_cons)(function(){return resolve(L_cons)("x", 0);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("y", 10);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("fill", "black");}, L_nil);});});});});})},
    function(){return resolve(L_newDefine)("defaultPolygonMap", 0, "defaultPolygonMap = ['points':'350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161' 'stroke':'black' 'stroke-width':2 'fill':'orange']", function(){return resolve(L_cons)(function(){return resolve(L_cons)("points", "350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("fill", "orange");}, L_nil);});});});})},
    function(){return resolve(L_newDefine)("svgNode", 1, "svgNode contents = \\f . f contents", lazy(setDataType((function(){
  var L_$F = (function(L_contents){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_contents)});
  L_$F.leisureFunctionId = 41;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'svgNode')});
  L_$F.leisureFunctionId = 40;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'svgNode')))},
    function(){return resolve(L_newDefine)("svgNodes", 1, "svgNodes nodeList = nodeList (\\h t D . cons (h id) (svgNodes t)) nil", lazy((function(){
  var L_$F = (function(L_nodeList){return resolve(L_nodeList)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_cons)(function(){return resolve(L_h)(L_id);}, function(){return resolve(L_svgNodes)(L_t);})});
  L_$F.leisureFunctionId = 45;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 44;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 43;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)});
  L_$F.leisureFunctionId = 42;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("svgConcat", 1, "svgConcat nodeList = svgNode (strCat (svgNodes nodeList))", lazy((function(){
  var L_$F = (function(L_nodeList){return resolve(L_svgNode)(function(){return resolve(L_strCat)(function(){return resolve(L_svgNodes)(L_nodeList);});})});
  L_$F.leisureFunctionId = 46;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("svgElement", 2, "svgElement name map = svgNode concat['<' name ' ' (insertFields map) '/>']", lazy((function(){
  var L_$F = function(L_name, L_map) {
    return L_checkPartial(L_$F, arguments) || resolve(L_svgNode)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<", function(){return resolve(L_cons)(L_name, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(function(){return resolve(L_insertFields)(L_map);}, function(){return resolve(L_cons)("/>", L_nil);});});});});});});
  };
  L_$F.leisureFunctionId = 47;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("svgPresent", 1, "svgPresent content = svgMeasure content \\x y w h .\r\n  svgTemplate concat[\"width='\" w \"' height='\" h \"' viewbox='\" x ' ' y ' ' w ' ' h \"'\"] content", lazy((function(){
  var L_$F = (function(L_content){return L$(resolve(L_svgMeasure))(L_content, lazy((function(){
  var L_$F = (function(L_x){return (function(){
  var L_$F = (function(L_y){return (function(){
  var L_$F = (function(L_w){return (function(){
  var L_$F = (function(L_h){return resolve(L_svgTemplate)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("width='", function(){return resolve(L_cons)(L_w, function(){return resolve(L_cons)("' height='", function(){return resolve(L_cons)(L_h, function(){return resolve(L_cons)("' viewbox='", function(){return resolve(L_cons)(L_x, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_y, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_w, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_h, function(){return resolve(L_cons)("'", L_nil);});});});});});});});});});});});});});}, L_content)});
  L_$F.leisureFunctionId = 52;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 51;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 50;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 49;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 48;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("presentHtml", "svgNode", 1, lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_hasType)(L_obj, L_svgNode)(function(){return resolve(L_some)(function(){return resolve(L_svgPresent)(function(){return resolve(L_obj)(L_id);})(L_id);});})(L_none)});
  L_$F.leisureFunctionId = 53;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 54;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("circle", 1, "circle map = svgElement 'circle' ((isNil map) defaultCircleMap map)", lazy((function(){
  var L_$F = (function(L_map){return resolve(L_svgElement)("circle", function(){return resolve(L_isNil)(L_map)(L_defaultCircleMap)(L_map);})});
  L_$F.leisureFunctionId = 55;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("rect", 1, "rect map = svgElement 'rect' ((isNil map) defaultRectMap map)", lazy((function(){
  var L_$F = (function(L_map){return resolve(L_svgElement)("rect", function(){return resolve(L_isNil)(L_map)(L_defaultRectMap)(L_map);})});
  L_$F.leisureFunctionId = 56;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("ellipse", 1, "ellipse map = svgElement 'ellipse' ((isNil map) defaultEllipseMap map)", lazy((function(){
  var L_$F = (function(L_map){return resolve(L_svgElement)("ellipse", function(){return resolve(L_isNil)(L_map)(L_defaultEllipseMap)(L_map);})});
  L_$F.leisureFunctionId = 57;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("line", 1, "line map = svgElement 'line' ((isNil map) defaultLineMap map)", lazy((function(){
  var L_$F = (function(L_map){return resolve(L_svgElement)("line", function(){return resolve(L_isNil)(L_map)(L_defaultLineMap)(L_map);})});
  L_$F.leisureFunctionId = 58;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("text", 2, "text t map = svgNode concat['<text ' (insertFields ((isNil map) defaultTextMap map)) '>' ((isNil t) 'undefined' t) '</text>']", lazy((function(){
  var L_$F = function(L_t, L_map) {
    return L_checkPartial(L_$F, arguments) || resolve(L_svgNode)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<text ", function(){return resolve(L_cons)(function(){return resolve(L_insertFields)(function(){return resolve(L_isNil)(L_map)(L_defaultTextMap)(L_map);});}, function(){return resolve(L_cons)(">", function(){return resolve(L_cons)(function(){return resolve(L_isNil)(L_t)("undefined")(L_t);}, function(){return resolve(L_cons)("</text>", L_nil);});});});});});});
  };
  L_$F.leisureFunctionId = 59;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("polygon", 1, "polygon map = svgElement 'polygon' ((isNil map) defaultPolygonMap map)", lazy((function(){
  var L_$F = (function(L_map){return resolve(L_svgElement)("polygon", function(){return resolve(L_isNil)(L_map)(L_defaultPolygonMap)(L_map);})});
  L_$F.leisureFunctionId = 60;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("group", 1, "group elem = svgNode concat['<g>' (elem id) '</g>']", lazy((function(){
  var L_$F = (function(L_elem){return resolve(L_svgNode)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<g>", function(){return resolve(L_cons)(function(){return resolve(L_elem)(L_id);}, function(){return resolve(L_cons)("</g>", L_nil);});});});})});
  L_$F.leisureFunctionId = 61;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("translate", 3, "translate elem x y = svgNode concat['<g transform=\"translate(' x ' ' y ')\">' (elem id) '</g>']", lazy((function(){
  var L_$F = function(L_elem, L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L_svgNode)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<g transform=\"translate(", function(){return resolve(L_cons)(L_x, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_y, function(){return resolve(L_cons)(")\">", function(){return resolve(L_cons)(function(){return resolve(L_elem)(L_id);}, function(){return resolve(L_cons)("</g>", L_nil);});});});});});});});});
  };
  L_$F.leisureFunctionId = 62;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("rotate", 2, "rotate elem r = svgNode concat['<g transform=\"rotate(' r ')\">' (elem id) '</g>']", lazy((function(){
  var L_$F = function(L_elem, L_r) {
    return L_checkPartial(L_$F, arguments) || resolve(L_svgNode)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<g transform=\"rotate(", function(){return resolve(L_cons)(L_r, function(){return resolve(L_cons)(")\">", function(){return resolve(L_cons)(function(){return resolve(L_elem)(L_id);}, function(){return resolve(L_cons)("</g>", L_nil);});});});});});});
  };
  L_$F.leisureFunctionId = 63;
  L_$F.leisureLength = 2;
  return L_$F;
})()))}
  ]);
});
//# sourceMappingURL=svg.map
