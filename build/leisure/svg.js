"use strict";
define([], function(){
  return L_runMonads([
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("assocGetWithDefault", 3, "assocGetWithDefault key defaultValue map = assoc key map id defaultValue", lazy((function(){
  var L$F = function(L_key, L_defaultValue, L_map) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_key, L_defaultValue, L_map),
  Leisure_traceReturn(L$F, (resolve(L_assoc)(L_key, L_map)(L_id)(L_defaultValue)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("insertFields", 1, "insertFields map = (isNil map) ''\r\n  concat[(field (head map)) (insertFields (tail map))]", lazy((function(){
  var L$F = function(L_map){return (
  Leisure_traceCall(L$F, L_map),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_map)("")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_field)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_map));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_insertFields)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_map));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("svgTemplate", 2, "svgTemplate attrs contents = html concat['<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ' attrs '>' contents '</svg>']", lazy((function(){
  var L$F = function(L_attrs, L_contents) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_attrs, L_contents),
  Leisure_traceReturn(L$F, (resolve(L_html)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_attrs, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_contents, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("</svg>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("svg", 2, "svg o map = svgTemplate concat['style=\"width: ' (assocGetWithDefault 'width' 100 map) 'px; height: '  (assocGetWithDefault 'height' 100 map) 'px\"'] (o id)", lazy((function(){
  var L$F = function(L_o, L_map) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_o, L_map),
  Leisure_traceReturn(L$F, (resolve(L_svgTemplate)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("style=\"width: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assocGetWithDefault)("width", 100, L_map));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("px; height: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assocGetWithDefault)("height", 100, L_map));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("px\"", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_o)(L_id));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("svgFile", 1, "svgFile map = html concat['<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ' (insertFields map) '</object>']", lazy((function(){
  var L$F = function(L_map){return (
  Leisure_traceCall(L$F, L_map),
  Leisure_traceReturn(L$F, (resolve(L_html)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_insertFields)(L_map));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("</object>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("field", 1, "field cell = cell \\key value . concat[key '=\"' value '\" ']", lazy((function(){
  var L$F = function(L_cell){return (
  Leisure_traceCall(L$F, L_cell),
  Leisure_traceReturn(L$F, (resolve(L_cell)(lazy((function(){
  var L$F = function(L_key){return (
  Leisure_traceCall(L$F, L_key),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, (resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_key, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("=\"", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_value, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\" ", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defaultCircleMap", 0, "defaultCircleMap = ['cx':50 'cy':50 'r':40 'stroke':'black' 'stroke-width':2 'fill':'red']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("cx", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("cy", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("r", 40));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("fill", "red"));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defaultRectMap", 0, "defaultRectMap = ['x':1 'y':1 'width':50 'height':50 'stroke':'black' 'stroke-width':2 'fill':'green']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("x", 1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("y", 1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("width", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("height", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("fill", "green"));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defaultLineMap", 0, "defaultLineMap = ['x1':0 'y1':0 'x2':50 'y2':50 'stroke':'black' 'stroke-width':2]", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("x1", 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("y1", 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("x2", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("y2", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defaultEllipseMap", 0, "defaultEllipseMap = ['cx':50 'cy':50 'rx':40 'ry':40 'stroke':'black' 'stroke-width':2 'fill':'blue']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("cx", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("cy", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("rx", 40));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("ry", 40));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("fill", "blue"));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defaultTextMap", 0, "defaultTextMap = ['x':0 'y':10 'stroke':'black' 'stroke-width':2 'fill':'black']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("x", 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("y", 10));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("fill", "black"));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defaultPolygonMap", 0, "defaultPolygonMap = ['points':'350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161' 'stroke':'black' 'stroke-width':2 'fill':'orange']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("points", "350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("fill", "orange"));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("svgNode", 1, "svgNode contents = \\f . f contents", lazy(setDataType((function(){
  var L$F = function(L_contents){return (
  Leisure_traceCall(L$F, L_contents),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_contents)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'svgNode')))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'svgNode')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("svgNodes", 1, "svgNodes nodeList = nodeList (\\h t D . cons (h id) (svgNodes t)) nil", lazy((function(){
  var L$F = function(L_nodeList){return (
  Leisure_traceCall(L$F, L_nodeList),
  Leisure_traceReturn(L$F, (resolve(L_nodeList)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_h)(L_id));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_svgNodes)(L_t));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("svgConcat", 1, "svgConcat nodeList = svgNode (strCat (svgNodes nodeList))", lazy((function(){
  var L$F = function(L_nodeList){return (
  Leisure_traceCall(L$F, L_nodeList),
  Leisure_traceReturn(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_svgNodes)(L_nodeList));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("svgElement", 2, "svgElement name map = svgNode concat['<' name ' ' (insertFields map) '/>']", lazy((function(){
  var L$F = function(L_name, L_map) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_map),
  Leisure_traceReturn(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_name, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_insertFields)(L_map));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("/>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("svgPresent", 1, "svgPresent content = svgMeasure content \\x y w h .\r\n  svgTemplate concat[\"width='\" w \"' height='\" h \"' viewbox='\" x ' ' y ' ' w ' ' h \"'\"] content", lazy((function(){
  var L$F = function(L_content){return (
  Leisure_traceCall(L$F, L_content),
  Leisure_traceReturn(L$F, (L$(resolve(L_svgMeasure))(L_content, lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_y){return (
  Leisure_traceCall(L$F, L_y),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_w){return (
  Leisure_traceCall(L$F, L_w),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, (resolve(L_svgTemplate)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("width='", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_w, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("' height='", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("' viewbox='", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_x, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_y, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_w, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("'", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_content)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 18, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 19, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_bind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_advise)("presentHtml", "svgNode", 1, lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_obj, L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_some)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_svgPresent)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_obj)(L_id));
});
})(++Leisure_traceInstance, L$instance))(L_id));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_none)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_unit)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("circle", 1, "circle map = svgElement 'circle' ((isNil map) defaultCircleMap map)", lazy((function(){
  var L$F = function(L_map){return (
  Leisure_traceCall(L$F, L_map),
  Leisure_traceReturn(L$F, (resolve(L_svgElement)("circle", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_map)(L_defaultCircleMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("rect", 1, "rect map = svgElement 'rect' ((isNil map) defaultRectMap map)", lazy((function(){
  var L$F = function(L_map){return (
  Leisure_traceCall(L$F, L_map),
  Leisure_traceReturn(L$F, (resolve(L_svgElement)("rect", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_map)(L_defaultRectMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("ellipse", 1, "ellipse map = svgElement 'ellipse' ((isNil map) defaultEllipseMap map)", lazy((function(){
  var L$F = function(L_map){return (
  Leisure_traceCall(L$F, L_map),
  Leisure_traceReturn(L$F, (resolve(L_svgElement)("ellipse", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_map)(L_defaultEllipseMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("line", 1, "line map = svgElement 'line' ((isNil map) defaultLineMap map)", lazy((function(){
  var L$F = function(L_map){return (
  Leisure_traceCall(L$F, L_map),
  Leisure_traceReturn(L$F, (resolve(L_svgElement)("line", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_map)(L_defaultLineMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("text", 2, "text t map = svgNode concat['<text ' (insertFields ((isNil map) defaultTextMap map)) '>' ((isNil t) 'undefined' t) '</text>']", lazy((function(){
  var L$F = function(L_t, L_map) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_t, L_map),
  Leisure_traceReturn(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<text ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_insertFields)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_map)(L_defaultTextMap)(L_map));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_t)("undefined")(L_t));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("</text>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("polygon", 1, "polygon map = svgElement 'polygon' ((isNil map) defaultPolygonMap map)", lazy((function(){
  var L$F = function(L_map){return (
  Leisure_traceCall(L$F, L_map),
  Leisure_traceReturn(L$F, (resolve(L_svgElement)("polygon", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_map)(L_defaultPolygonMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("group", 1, "group elem = svgNode concat['<g>' (elem id) '</g>']", lazy((function(){
  var L$F = function(L_elem){return (
  Leisure_traceCall(L$F, L_elem),
  Leisure_traceReturn(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<g>", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_elem)(L_id));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("</g>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("translate", 3, "translate elem x y = svgNode concat['<g transform=\"translate(' x ' ' y ')\">' (elem id) '</g>']", lazy((function(){
  var L$F = function(L_elem, L_x, L_y) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_elem, L_x, L_y),
  Leisure_traceReturn(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<g transform=\"translate(", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_x, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_y, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(")\">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_elem)(L_id));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("</g>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("rotate", 2, "rotate elem r = svgNode concat['<g transform=\"rotate(' r ')\">' (elem id) '</g>']", lazy((function(){
  var L$F = function(L_elem, L_r) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_elem, L_r),
  Leisure_traceReturn(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<g transform=\"rotate(", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_r, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(")\">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_elem)(L_id));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("</g>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)}
  ]);
});
//# sourceMappingURL=svg.map
