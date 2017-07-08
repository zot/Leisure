"use strict";
define([], function(){
  return L_runMonads([
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  return resolve(L_newDefine)("assocGetWithDefault", 3, "assocGetWithDefault key defaultValue map = assoc key map id defaultValue", lazy((function(){
  var L$F = function(L_key, L_defaultValue, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_assoc)(L_key, L_map)(L_id)(L_defaultValue);
};;
  L$F.L$info = L$FUNC_0;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_key, L_defaultValue, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_assoc)(L_key, L_map)(L_id)(L_defaultValue);
};;
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("insertFields", 1, "insertFields map = (isNil map) ''\n  concat[(field (head map)) (insertFields (tail map))]", lazy((function(){
  var L$F = function(L_map){return resolve(L_isNil)(L_map)("")(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)(function(){
  return resolve(L_field)(function(){
  return resolve(L_head)(L_map);
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_insertFields)(function(){
  return resolve(L_tail)(L_map);
});
}, L_nil);
});
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_map){return resolve(L_isNil)(L_map)("")(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)(function(){
  return resolve(L_field)(function(){
  return resolve(L_head)(L_map);
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_insertFields)(function(){
  return resolve(L_tail)(L_map);
});
}, L_nil);
});
});
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  return resolve(L_newDefine)("svgTemplate", 2, "svgTemplate attrs contents = html concat['<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ' attrs '>' contents '</svg>']", lazy((function(){
  var L$F = function(L_attrs, L_contents) {
  return L_checkPartial(L$F, arguments) || resolve(L_html)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", function(){
  return resolve(L_cons)(L_attrs, function(){
  return resolve(L_cons)(">", function(){
  return resolve(L_cons)(L_contents, function(){
  return resolve(L_cons)("</svg>", L_nil);
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_4;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_attrs, L_contents) {
  return L_checkPartial(L$F, arguments) || resolve(L_html)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", function(){
  return resolve(L_cons)(L_attrs, function(){
  return resolve(L_cons)(">", function(){
  return resolve(L_cons)(L_contents, function(){
  return resolve(L_cons)("</svg>", L_nil);
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  return resolve(L_newDefine)("svg", 2, "svg o map = svgTemplate concat['style=\"width: ' (assocGetWithDefault 'width' 100 map) 'px; height: '  (assocGetWithDefault 'height' 100 map) 'px\"'] (o id)", lazy((function(){
  var L$F = function(L_o, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgTemplate)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("style=\"width: ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_assocGetWithDefault)("width", 100, L_map);
}, function(){
  return resolve(L_cons)("px; height: ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_assocGetWithDefault)("height", 100, L_map);
}, function(){
  return resolve(L_cons)("px\"", L_nil);
});
});
});
});
});
}, function(){
  return resolve(L_o)(L_id);
});
};;
  L$F.L$info = L$FUNC_6;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_o, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgTemplate)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("style=\"width: ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_assocGetWithDefault)("width", 100, L_map);
}, function(){
  return resolve(L_cons)("px; height: ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_assocGetWithDefault)("height", 100, L_map);
}, function(){
  return resolve(L_cons)("px\"", L_nil);
});
});
});
});
});
}, function(){
  return resolve(L_o)(L_id);
});
};;
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("svgFile", 1, "svgFile map = html concat['<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ' (insertFields map) '</object>']", lazy((function(){
  var L$F = function(L_map){return resolve(L_html)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_insertFields)(L_map);
}, function(){
  return resolve(L_cons)("</object>", L_nil);
});
});
});
});};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_map){return resolve(L_html)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_insertFields)(L_map);
}, function(){
  return resolve(L_cons)("</object>", L_nil);
});
});
});
});};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("field", 1, "field cell = cell \\key value . concat[key '=\"' value '\" ']", lazy((function(){
  var L$F = function(L_cell){return resolve(L_cell)(lazy((function(){
  var L$F = function(L_key){return (function(){
  var L$F = function(L_value){return resolve(L_strCat)(function(){
  return resolve(L_cons)(L_key, function(){
  return resolve(L_cons)("=\"", function(){
  return resolve(L_cons)(L_value, function(){
  return resolve(L_cons)("\" ", L_nil);
});
});
});
});};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_cell){return resolve(L_cell)(lazy((function(){
  var L$F = function(L_key){return (function(){
  var L$F = function(L_value){return resolve(L_strCat)(function(){
  return resolve(L_cons)(L_key, function(){
  return resolve(L_cons)("=\"", function(){
  return resolve(L_cons)(L_value, function(){
  return resolve(L_cons)("\" ", L_nil);
});
});
});
});};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("defaultCircleMap", 0, "defaultCircleMap = ['cx':50 'cy':50 'r':40 'stroke':'black' 'stroke-width':2 'fill':'red']", function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("cx", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("cy", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("r", 40);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "red");
}, L_nil);
});
});
});
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("cx", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("cy", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("r", 40);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "red");
}, L_nil);
});
});
});
});
});
});
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("defaultRectMap", 0, "defaultRectMap = ['x':1 'y':1 'width':50 'height':50 'stroke':'black' 'stroke-width':2 'fill':'green']", function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x", 1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y", 1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("width", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("height", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "green");
}, L_nil);
});
});
});
});
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x", 1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y", 1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("width", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("height", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "green");
}, L_nil);
});
});
});
});
});
});
});
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("defaultLineMap", 0, "defaultLineMap = ['x1':0 'y1':0 'x2':50 'y2':50 'stroke':'black' 'stroke-width':2]", function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x1", 0);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y1", 0);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x2", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y2", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, L_nil);
});
});
});
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x1", 0);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y1", 0);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x2", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y2", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, L_nil);
});
});
});
});
});
});
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("defaultEllipseMap", 0, "defaultEllipseMap = ['cx':50 'cy':50 'rx':40 'ry':40 'stroke':'black' 'stroke-width':2 'fill':'blue']", function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("cx", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("cy", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("rx", 40);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("ry", 40);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "blue");
}, L_nil);
});
});
});
});
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("cx", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("cy", 50);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("rx", 40);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("ry", 40);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "blue");
}, L_nil);
});
});
});
});
});
});
});
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("defaultTextMap", 0, "defaultTextMap = ['x':0 'y':10 'stroke':'black' 'stroke-width':2 'fill':'black']", function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x", 0);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y", 10);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "black");
}, L_nil);
});
});
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x", 0);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y", 10);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "black");
}, L_nil);
});
});
});
});
});
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("defaultPolygonMap", 0, "defaultPolygonMap = ['points':'350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161' 'stroke':'black' 'stroke-width':2 'fill':'orange']", function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("points", "350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "orange");
}, L_nil);
});
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("points", "350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "orange");
}, L_nil);
});
});
});
});
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("svgNode", 1, "svgNode contents = \\f . f contents", lazy(setDataType((function(){
  var L$F = function(L_contents){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_contents);};
  L$F.L$info = L$FUNC_16;
  return L$F;
})(), 'svgNode');};
  L$F.L$info = L$FUNC_17;
  return L$F;
})(), 'svgNode')), lazy(setDataType((function(){
  var L$F = function(L_contents){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_contents);};
  L$F.L$info = L$FUNC_18;
  return L$F;
})(), 'svgNode');};
  L$F.L$info = L$FUNC_19;
  return L$F;
})(), 'svgNode')));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("svgNodes", 1, "svgNodes nodeList = nodeList (\\h t D . cons (h id) (svgNodes t)) nil", lazy((function(){
  var L$F = function(L_nodeList){return resolve(L_nodeList)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_cons)(function(){
  return resolve(L_h)(L_id);
}, function(){
  return resolve(L_svgNodes)(L_t);
});};
  L$F.L$info = L$FUNC_20;
  return L$F;
})();};
  L$F.L$info = L$FUNC_21;
  return L$F;
})();};
  L$F.L$info = L$FUNC_22;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_23;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_nodeList){return resolve(L_nodeList)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_cons)(function(){
  return resolve(L_h)(L_id);
}, function(){
  return resolve(L_svgNodes)(L_t);
});};
  L$F.L$info = L$FUNC_24;
  return L$F;
})();};
  L$F.L$info = L$FUNC_25;
  return L$F;
})();};
  L$F.L$info = L$FUNC_26;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_27;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("svgConcat", 1, "svgConcat nodeList = svgNode (strCat (svgNodes nodeList))", lazy((function(){
  var L$F = function(L_nodeList){return resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_svgNodes)(L_nodeList);
});
});};
  L$F.L$info = L$FUNC_28;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_nodeList){return resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_svgNodes)(L_nodeList);
});
});};
  L$F.L$info = L$FUNC_29;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  return resolve(L_newDefine)("svgElement", 2, "svgElement name map = svgNode concat['<' name ' ' (insertFields map) '/>']", lazy((function(){
  var L$F = function(L_name, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<", function(){
  return resolve(L_cons)(L_name, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_insertFields)(L_map);
}, function(){
  return resolve(L_cons)("/>", L_nil);
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_30;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_name, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<", function(){
  return resolve(L_cons)(L_name, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_insertFields)(L_map);
}, function(){
  return resolve(L_cons)("/>", L_nil);
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_31;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("svgPresent", 1, "svgPresent content = svgMeasure content \\x y w h .\n  svgTemplate concat[\"width='\" w \"' height='\" h \"' viewbox='\" x ' ' y ' ' w ' ' h \"'\"] content", lazy((function(){
  var L$F = function(L_content){return L$(resolve(L_svgMeasure))(L_content, lazy((function(){
  var L$F = function(L_x){return (function(){
  var L$F = function(L_y){return (function(){
  var L$F = function(L_w){return (function(){
  var L$F = function(L_h){return resolve(L_svgTemplate)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("width='", function(){
  return resolve(L_cons)(L_w, function(){
  return resolve(L_cons)("' height='", function(){
  return resolve(L_cons)(L_h, function(){
  return resolve(L_cons)("' viewbox='", function(){
  return resolve(L_cons)(L_x, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(L_y, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(L_w, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(L_h, function(){
  return resolve(L_cons)("'", L_nil);
});
});
});
});
});
});
});
});
});
});
});
});
});
}, L_content);};
  L$F.L$info = L$FUNC_32;
  return L$F;
})();};
  L$F.L$info = L$FUNC_33;
  return L$F;
})();};
  L$F.L$info = L$FUNC_34;
  return L$F;
})();};
  L$F.L$info = L$FUNC_35;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_36;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_content){return L$(resolve(L_svgMeasure))(L_content, lazy((function(){
  var L$F = function(L_x){return (function(){
  var L$F = function(L_y){return (function(){
  var L$F = function(L_w){return (function(){
  var L$F = function(L_h){return resolve(L_svgTemplate)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("width='", function(){
  return resolve(L_cons)(L_w, function(){
  return resolve(L_cons)("' height='", function(){
  return resolve(L_cons)(L_h, function(){
  return resolve(L_cons)("' viewbox='", function(){
  return resolve(L_cons)(L_x, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(L_y, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(L_w, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(L_h, function(){
  return resolve(L_cons)("'", L_nil);
});
});
});
});
});
});
});
});
});
});
});
});
});
}, L_content);};
  L$F.L$info = L$FUNC_37;
  return L$F;
})();};
  L$F.L$info = L$FUNC_38;
  return L$F;
})();};
  L$F.L$info = L$FUNC_39;
  return L$F;
})();};
  L$F.L$info = L$FUNC_40;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_41;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  return resolve(L_bind)(function(){
  return resolve(L_advise)("presentHtml", "svgNode", 1, lazy((function(){
  var L$F = function(L_obj){return resolve(L_hasType)(L_obj, L_svgNode)(function(){
  return resolve(L_some)(function(){
  return resolve(L_svgPresent)(function(){
  return resolve(L_obj)(L_id);
})(L_id);
});
})(L_none);};
  L$F.L$info = L$FUNC_42;
  return L$F;
})()));
}, lazy((function(){
  var L$F = function(L__){return resolve(L_unit);};
  L$F.L$info = L$FUNC_43;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("circle", 1, "circle map = svgElement 'circle' ((isNil map) defaultCircleMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("circle", function(){
  return resolve(L_isNil)(L_map)(L_defaultCircleMap)(L_map);
});};
  L$F.L$info = L$FUNC_44;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("circle", function(){
  return resolve(L_isNil)(L_map)(L_defaultCircleMap)(L_map);
});};
  L$F.L$info = L$FUNC_45;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_46 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_47 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("rect", 1, "rect map = svgElement 'rect' ((isNil map) defaultRectMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("rect", function(){
  return resolve(L_isNil)(L_map)(L_defaultRectMap)(L_map);
});};
  L$F.L$info = L$FUNC_46;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("rect", function(){
  return resolve(L_isNil)(L_map)(L_defaultRectMap)(L_map);
});};
  L$F.L$info = L$FUNC_47;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_46 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_47 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_48 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_49 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("ellipse", 1, "ellipse map = svgElement 'ellipse' ((isNil map) defaultEllipseMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("ellipse", function(){
  return resolve(L_isNil)(L_map)(L_defaultEllipseMap)(L_map);
});};
  L$F.L$info = L$FUNC_48;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("ellipse", function(){
  return resolve(L_isNil)(L_map)(L_defaultEllipseMap)(L_map);
});};
  L$F.L$info = L$FUNC_49;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_46 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_47 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_48 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_49 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_50 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_51 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("line", 1, "line map = svgElement 'line' ((isNil map) defaultLineMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("line", function(){
  return resolve(L_isNil)(L_map)(L_defaultLineMap)(L_map);
});};
  L$F.L$info = L$FUNC_50;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("line", function(){
  return resolve(L_isNil)(L_map)(L_defaultLineMap)(L_map);
});};
  L$F.L$info = L$FUNC_51;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_46 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_47 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_48 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_49 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_50 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_51 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_52 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_53 = {context: L$context, id: undefined, length: 2};
  return resolve(L_newDefine)("text", 2, "text t map = svgNode concat['<text ' (insertFields ((isNil map) defaultTextMap map)) '>' ((isNil t) 'undefined' t) '</text>']", lazy((function(){
  var L$F = function(L_t, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<text ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_insertFields)(function(){
  return resolve(L_isNil)(L_map)(L_defaultTextMap)(L_map);
});
}, function(){
  return resolve(L_cons)(">", function(){
  return resolve(L_cons)(function(){
  return resolve(L_isNil)(L_t)("undefined")(L_t);
}, function(){
  return resolve(L_cons)("</text>", L_nil);
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_52;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_t, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<text ", function(){
  return resolve(L_cons)(function(){
  return resolve(L_insertFields)(function(){
  return resolve(L_isNil)(L_map)(L_defaultTextMap)(L_map);
});
}, function(){
  return resolve(L_cons)(">", function(){
  return resolve(L_cons)(function(){
  return resolve(L_isNil)(L_t)("undefined")(L_t);
}, function(){
  return resolve(L_cons)("</text>", L_nil);
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_53;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_46 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_47 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_48 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_49 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_50 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_51 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_52 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_53 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_54 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_55 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("polygon", 1, "polygon map = svgElement 'polygon' ((isNil map) defaultPolygonMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("polygon", function(){
  return resolve(L_isNil)(L_map)(L_defaultPolygonMap)(L_map);
});};
  L$F.L$info = L$FUNC_54;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("polygon", function(){
  return resolve(L_isNil)(L_map)(L_defaultPolygonMap)(L_map);
});};
  L$F.L$info = L$FUNC_55;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_46 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_47 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_48 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_49 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_50 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_51 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_52 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_53 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_54 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_55 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_56 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_57 = {context: L$context, id: undefined, length: 1};
  return resolve(L_newDefine)("group", 1, "group elem = svgNode concat['<g>' (elem id) '</g>']", lazy((function(){
  var L$F = function(L_elem){return resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<g>", function(){
  return resolve(L_cons)(function(){
  return resolve(L_elem)(L_id);
}, function(){
  return resolve(L_cons)("</g>", L_nil);
});
});
});
});};
  L$F.L$info = L$FUNC_56;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_elem){return resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<g>", function(){
  return resolve(L_cons)(function(){
  return resolve(L_elem)(L_id);
}, function(){
  return resolve(L_cons)("</g>", L_nil);
});
});
});
});};
  L$F.L$info = L$FUNC_57;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_46 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_47 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_48 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_49 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_50 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_51 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_52 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_53 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_54 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_55 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_56 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_57 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_58 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_59 = {context: L$context, id: undefined, length: 3};
  return resolve(L_newDefine)("translate", 3, "translate elem x y = svgNode concat['<g transform=\"translate(' x ' ' y ')\">' (elem id) '</g>']", lazy((function(){
  var L$F = function(L_elem, L_x, L_y) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<g transform=\"translate(", function(){
  return resolve(L_cons)(L_x, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(L_y, function(){
  return resolve(L_cons)(")\">", function(){
  return resolve(L_cons)(function(){
  return resolve(L_elem)(L_id);
}, function(){
  return resolve(L_cons)("</g>", L_nil);
});
});
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_58;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_elem, L_x, L_y) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<g transform=\"translate(", function(){
  return resolve(L_cons)(L_x, function(){
  return resolve(L_cons)(" ", function(){
  return resolve(L_cons)(L_y, function(){
  return resolve(L_cons)(")\">", function(){
  return resolve(L_cons)(function(){
  return resolve(L_elem)(L_id);
}, function(){
  return resolve(L_cons)("</g>", L_nil);
});
});
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_59;
  return L$F;
})()));
})()},
    function(){return (function(){
  var L$context = null;
  
  var L$FUNC_0 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_1 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_2 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_3 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_4 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_5 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_6 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_7 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_8 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_9 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_10 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_11 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_12 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_13 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_14 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_15 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_16 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_17 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_18 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_19 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_20 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_21 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_22 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_23 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_24 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_25 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_26 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_27 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_28 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_29 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_30 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_31 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_32 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_33 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_34 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_35 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_36 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_37 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_38 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_39 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_40 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_41 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_42 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_43 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_44 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_45 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_46 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_47 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_48 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_49 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_50 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_51 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_52 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_53 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_54 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_55 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_56 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_57 = {context: L$context, id: undefined, length: 1};
  var L$FUNC_58 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_59 = {context: L$context, id: undefined, length: 3};
  var L$FUNC_60 = {context: L$context, id: undefined, length: 2};
  var L$FUNC_61 = {context: L$context, id: undefined, length: 2};
  return resolve(L_newDefine)("rotate", 2, "rotate elem r = svgNode concat['<g transform=\"rotate(' r ')\">' (elem id) '</g>']", lazy((function(){
  var L$F = function(L_elem, L_r) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<g transform=\"rotate(", function(){
  return resolve(L_cons)(L_r, function(){
  return resolve(L_cons)(")\">", function(){
  return resolve(L_cons)(function(){
  return resolve(L_elem)(L_id);
}, function(){
  return resolve(L_cons)("</g>", L_nil);
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_60;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_elem, L_r) {
  return L_checkPartial(L$F, arguments) || resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_cons)("<g transform=\"rotate(", function(){
  return resolve(L_cons)(L_r, function(){
  return resolve(L_cons)(")\">", function(){
  return resolve(L_cons)(function(){
  return resolve(L_elem)(L_id);
}, function(){
  return resolve(L_cons)("</g>", L_nil);
});
});
});
});
});
});
};;
  L$F.L$info = L$FUNC_61;
  return L$F;
})()));
})()}
  ]);
});
//# sourceMappingURL=data:application/json;base64,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QUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEdBQUs7QUFBQSxtQ0FBTSxzQkFBVyxNQUFYLEVBQW9CO0FBQUEsMEJBQU0sS0FBTixFQUFXLGdCQUFYLEVBQTBCLEtBQTFCO0FBQUEsQ0FBcEIsQ0FBTjtBQUFBO0FBQUE7QUFBQSxLQUFMLEVBQUs7QUFBQSxtQ0FBTSxzQkFBVyxNQUFYLEVBQW9CO0FBQUEsMEJBQU0sS0FBTixFQUFXLGdCQUFYLEVBQTBCLEtBQTFCO0FBQUEsQ0FBcEIsQ0FBTjtBQUFBO0FBQUE7QUFBQSxLQUFMO0FBQUEsS0F6Q0E7QUFBQSxJQTBDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0hBQVE7QUFBQSxtQ0FBTSxzQkFBVyxTQUFYLEVBQXVCO0FBQUEsMEJBQU0sS0FBTixFQUFXLG1CQUFYLEVBQTZCLEtBQTdCO0FBQUEsQ0FBdkIsQ0FBTjtBQUFBO0FBQUE7QUFBQSxLQUFSLEVBQVE7QUFBQSxtQ0FBTSxzQkFBVyxTQUFYLEVBQXVCO0FBQUEsMEJBQU0sS0FBTixFQUFXLG1CQUFYLEVBQTZCLEtBQTdCO0FBQUEsQ0FBdkIsQ0FBTjtBQUFBO0FBQUE7QUFBQSxLQUFSO0FBQUEsS0ExQ0E7QUFBQSxJQTJDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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
