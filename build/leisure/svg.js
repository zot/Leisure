"use strict";
define([], function(){
  var L$context = Leisure_traceTopLevelStd({
    id: Leisure_traceContext++,
    source: "build/leisure/svg.lsr",
    externalMap: "build/leisure/svg.map",
    decls: ["lambda",6,20,null,null,1,null,"lambda",8,13,null,null,1,"map","lazy",9,9,1,"lazy",9,9,2,"lazy",9,10,3,"lazy",9,17,4,"lazy",9,28,3,"lazy",9,29,6,"lazy",9,43,7,"lambda",11,12,null,null,1,null,"lazy",11,41,9,"lazy",11,41,10,"lazy",11,98,11,"lazy",11,104,12,"lazy",11,108,13,"lazy",11,117,14,"lambda",13,4,null,null,1,null,"lazy",13,31,16,"lazy",13,31,17,"lazy",13,48,18,"lazy",13,49,19,"lazy",13,86,19,"lazy",13,102,21,"lazy",13,103,22,"lazy",13,141,22,"lazy",13,149,16,"lambda",15,8,null,null,1,"map","lazy",15,26,26,"lazy",15,26,27,"lazy",15,86,28,"lazy",15,87,29,"lazy",15,105,29,"lambda",17,6,null,null,1,"cell","lambda",17,19,32,null,1,"key","lambda",17,23,33,null,1,"value","lazy",17,38,34,"lazy",17,42,35,"lazy",17,47,36,"lazy",17,53,37,"lazy",19,20,null,"lazy",19,20,39,"lazy",19,28,39,"lazy",19,28,41,"lazy",19,36,41,"lazy",19,36,43,"lazy",19,43,43,"lazy",19,43,45,"lazy",19,60,45,"lazy",19,60,47,"lazy",19,77,47,"lazy",19,77,49,"lazy",20,18,null,"lazy",20,18,51,"lazy",20,24,51,"lazy",20,24,53,"lazy",20,30,53,"lazy",20,30,55,"lazy",20,41,55,"lazy",20,41,57,"lazy",20,53,57,"lazy",20,53,59,"lazy",20,70,59,"lazy",20,70,61,"lazy",20,87,61,"lazy",20,87,63,"lazy",21,18,null,"lazy",21,18,65,"lazy",21,25,65,"lazy",21,25,67,"lazy",21,32,67,"lazy",21,32,69,"lazy",21,40,69,"lazy",21,40,71,"lazy",21,48,71,"lazy",21,48,73,"lazy",21,65,73,"lazy",21,65,75,"lazy",22,21,null,"lazy",22,21,77,"lazy",22,29,77,"lazy",22,29,79,"lazy",22,37,79,"lazy",22,37,81,"lazy",22,45,81,"lazy",22,45,83,"lazy",22,53,83,"lazy",22,53,85,"lazy",22,70,85,"lazy",22,70,87,"lazy",22,87,87,"lazy",22,87,89,"lazy",23,18,null,"lazy",23,18,91,"lazy",23,24,91,"lazy",23,24,93,"lazy",23,31,93,"lazy",23,31,95,"lazy",23,48,95,"lazy",23,48,97,"lazy",23,65,97,"lazy",23,65,99,"lazy",24,21,null,"lazy",24,21,101,"lazy",24,112,101,"lazy",24,112,103,"lazy",24,129,103,"lazy",24,129,105,"lazy",24,146,105,"lazy",24,146,107,"lambda",26,8,null,null,1,"contents","lambda",26,20,109,null,1,"f","lambda",28,9,null,null,1,"nodeList","lambda",28,31,111,null,1,"h","lambda",28,33,112,null,1,"t","lambda",28,35,113,null,1,"D","lazy",28,45,114,"lazy",28,52,114,"lambda",30,10,null,null,1,"nodeList","lazy",30,30,117,"lazy",30,38,118,"lambda",32,11,null,null,1,null,"lazy",32,37,120,"lazy",32,37,121,"lazy",32,41,122,"lazy",32,46,123,"lazy",32,50,124,"lazy",32,51,125,"lazy",32,69,125,"lambda",36,11,null,null,1,"content","lambda",36,41,128,null,1,"x","lambda",36,43,129,null,1,"y","lambda",36,45,130,null,1,"w","lambda",36,47,131,null,1,"h","lazy",37,21,132,"lazy",37,21,133,"lazy",37,31,134,"lazy",37,33,135,"lazy",37,46,136,"lazy",37,48,137,"lazy",37,62,138,"lazy",37,64,139,"lazy",37,68,140,"lazy",37,70,141,"lazy",37,74,142,"lazy",37,76,143,"lazy",37,80,144,"lazy",37,82,145,"lazy",39,28,null,"lambda",39,28,147,"lazy",39,57,148,"lazy",39,57,149,"lazy",39,69,150,"lambda",0,0,null,"lambda",41,7,null,null,1,"map","lazy",41,35,153,"lambda",42,5,null,null,1,"map","lazy",42,31,155,"lambda",43,8,null,null,1,"map","lazy",43,37,157,"lambda",44,5,null,null,1,"map","lazy",44,31,159,"lambda",45,5,null,null,1,null,"lazy",45,28,161,"lazy",45,28,162,"lazy",45,37,163,"lazy",45,38,164,"lazy",45,53,165,"lazy",45,85,164,"lazy",45,89,167,"lazy",45,91,168,"lazy",45,115,168,"lambda",46,8,null,null,1,"map","lazy",46,37,171,"lambda",48,6,null,null,1,"elem","lazy",48,28,173,"lazy",48,28,174,"lazy",48,34,175,"lazy",48,35,176,"lazy",48,44,176,"lambda",49,10,null,null,1,null,"lazy",49,36,179,"lazy",49,36,180,"lazy",49,63,181,"lazy",49,65,182,"lazy",49,69,183,"lazy",49,71,184,"lazy",49,77,185,"lazy",49,78,186,"lazy",49,87,186,"lambda",50,7,null,null,1,null,"lazy",50,31,189,"lazy",50,31,190,"lazy",50,55,191,"lazy",50,57,192,"lazy",50,63,193,"lazy",50,64,194,"lazy",50,73,194]
  });
  return L_runMonads([
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("assocGetWithDefault", 3, "assocGetWithDefault key defaultValue map = assoc key map id defaultValue", lazy((function(L$instance, L$parent){
  var L$F = function(L_key, L_defaultValue, L_map) {
  return L_checkPartial(L$F, arguments, Leisure_tracePartialStd) || (
  Leisure_traceCallStd(L$F, L_key, L_defaultValue, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_assoc)(L_key, L_map)(L_id)(L_defaultValue)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 0, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("insertFields", 1, "insertFields map = (isNil map) ''\n  concat[(field (head map)) (insertFields (tail map))]", lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_isNil)(L_map)("")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_field)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_head)(L_map));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_insertFields)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_tail)(L_map));
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
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 1, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgTemplate", 2, "svgTemplate attrs contents = html concat['<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ' attrs '>' contents '</svg>']", lazy((function(L$instance, L$parent){
  var L$F = function(L_attrs, L_contents) {
  return L_checkPartial(L$F, arguments, Leisure_tracePartialStd) || (
  Leisure_traceCallStd(L$F, L_attrs, L_contents),
  Leisure_traceReturnStd(L$F, (resolve(L_html)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_attrs, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_contents, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("</svg>", L_nil));
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
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 9, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svg", 2, "svg o map = svgTemplate concat['style=\"width: ' (assocGetWithDefault 'width' 100 map) 'px; height: '  (assocGetWithDefault 'height' 100 map) 'px\"'] (o id)", lazy((function(L$instance, L$parent){
  var L$F = function(L_o, L_map) {
  return L_checkPartial(L$F, arguments, Leisure_tracePartialStd) || (
  Leisure_traceCallStd(L$F, L_o, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_svgTemplate)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("style=\"width: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_assocGetWithDefault)("width", 100, L_map));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("px; height: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_assocGetWithDefault)("height", 100, L_map));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("px\"", L_nil));
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
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_o)(L_id));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 16, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgFile", 1, "svgFile map = html concat['<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ' (insertFields map) '</object>']", lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_html)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_insertFields)(L_map));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("</object>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 26, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("field", 1, "field cell = cell \\key value . concat[key '=\"' value '\" ']", lazy((function(L$instance, L$parent){
  var L$F = function(L_cell){return (
  Leisure_traceCallStd(L$F, L_cell),
  Leisure_traceReturnStd(L$F, (resolve(L_cell)(lazy((function(L$instance, L$parent){
  var L$F = function(L_key){return (
  Leisure_traceCallStd(L$F, L_key),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_value){return (
  Leisure_traceCallStd(L$F, L_value),
  Leisure_traceReturnStd(L$F, (resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_key, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("=\"", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_value, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("\" ", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 34, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 33, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 32, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("defaultCircleMap", 0, "defaultCircleMap = ['cx':50 'cy':50 'r':40 'stroke':'black' 'stroke-width':2 'fill':'red']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("cx", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("cy", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("r", 40));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "red"));
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
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("defaultRectMap", 0, "defaultRectMap = ['x':1 'y':1 'width':50 'height':50 'stroke':'black' 'stroke-width':2 'fill':'green']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x", 1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y", 1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("width", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("height", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "green"));
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
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("defaultLineMap", 0, "defaultLineMap = ['x1':0 'y1':0 'x2':50 'y2':50 'stroke':'black' 'stroke-width':2]", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x1", 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y1", 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x2", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y2", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
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
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("defaultEllipseMap", 0, "defaultEllipseMap = ['cx':50 'cy':50 'rx':40 'ry':40 'stroke':'black' 'stroke-width':2 'fill':'blue']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("cx", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("cy", 50));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("rx", 40));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("ry", 40));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "blue"));
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
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("defaultTextMap", 0, "defaultTextMap = ['x':0 'y':10 'stroke':'black' 'stroke-width':2 'fill':'black']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x", 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y", 10));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "black"));
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
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("defaultPolygonMap", 0, "defaultPolygonMap = ['points':'350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161' 'stroke':'black' 'stroke-width':2 'fill':'orange']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("points", "350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "orange"));
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
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgNode", 1, "svgNode contents = \\f . f contents", lazy(setDataType((function(L$instance, L$parent){
  var L$F = function(L_contents){return (
  Leisure_traceCallStd(L$F, L_contents),
  Leisure_traceReturnStd(L$F, (setType((function(L$instance, L$parent){
  var L$F = function(L_f){return (
  Leisure_traceCallStd(L$F, L_f),
  Leisure_traceReturnStd(L$F, (resolve(L_f)(L_contents)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 110, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance), 'svgNode')))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 109, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance), 'svgNode')));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgNodes", 1, "svgNodes nodeList = nodeList (\\h t D . cons (h id) (svgNodes t)) nil", lazy((function(L$instance, L$parent){
  var L$F = function(L_nodeList){return (
  Leisure_traceCallStd(L$F, L_nodeList),
  Leisure_traceReturnStd(L$F, (resolve(L_nodeList)(lazy((function(L$instance, L$parent){
  var L$F = function(L_h){return (
  Leisure_traceCallStd(L$F, L_h),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_t){return (
  Leisure_traceCallStd(L$F, L_t),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_D){return (
  Leisure_traceCallStd(L$F, L_D),
  Leisure_traceReturnStd(L$F, (resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_h)(L_id));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_svgNodes)(L_t));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 114, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 113, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 112, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))(L_nil)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 111, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgConcat", 1, "svgConcat nodeList = svgNode (strCat (svgNodes nodeList))", lazy((function(L$instance, L$parent){
  var L$F = function(L_nodeList){return (
  Leisure_traceCallStd(L$F, L_nodeList),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_svgNodes)(L_nodeList));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 117, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgElement", 2, "svgElement name map = svgNode concat['<' name ' ' (insertFields map) '/>']", lazy((function(L$instance, L$parent){
  var L$F = function(L_name, L_map) {
  return L_checkPartial(L$F, arguments, Leisure_tracePartialStd) || (
  Leisure_traceCallStd(L$F, L_name, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_name, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_insertFields)(L_map));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("/>", L_nil));
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
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 120, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgPresent", 1, "svgPresent content = svgMeasure content \\x y w h .\n  svgTemplate concat[\"width='\" w \"' height='\" h \"' viewbox='\" x ' ' y ' ' w ' ' h \"'\"] content", lazy((function(L$instance, L$parent){
  var L$F = function(L_content){return (
  Leisure_traceCallStd(L$F, L_content),
  Leisure_traceReturnStd(L$F, (L$(resolve(L_svgMeasure))(L_content, lazy((function(L$instance, L$parent){
  var L$F = function(L_x){return (
  Leisure_traceCallStd(L$F, L_x),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_y){return (
  Leisure_traceCallStd(L$F, L_y),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_w){return (
  Leisure_traceCallStd(L$F, L_w),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_h){return (
  Leisure_traceCallStd(L$F, L_h),
  Leisure_traceReturnStd(L$F, (resolve(L_svgTemplate)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("width='", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_w, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("' height='", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("' viewbox='", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_x, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_y, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_w, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("'", L_nil));
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
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 132, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 131, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 130, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 129, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 128, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_bind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_advise)("presentHtml", "svgNode", 1, lazy((function(L$instance, L$parent){
  var L$F = function(L_obj){return (
  Leisure_traceCallStd(L$F, L_obj),
  Leisure_traceReturnStd(L$F, (resolve(L_hasType)(L_obj, L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_some)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_svgPresent)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_obj)(L_id));
});
})(++Leisure_traceInstance, L$instance))(L_id));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_none)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 148, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance))));
});
})(++Leisure_traceInstance, L$instance), lazy((function(L$instance, L$parent){
  var L$F = function(L__){return (
  Leisure_traceCallStd(L$F, L__),
  Leisure_traceReturnStd(L$F, (resolve(L_unit)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 152, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("circle", 1, "circle map = svgElement 'circle' ((isNil map) defaultCircleMap map)", lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("circle", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultCircleMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 153, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("rect", 1, "rect map = svgElement 'rect' ((isNil map) defaultRectMap map)", lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("rect", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultRectMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 155, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("ellipse", 1, "ellipse map = svgElement 'ellipse' ((isNil map) defaultEllipseMap map)", lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("ellipse", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultEllipseMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 157, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("line", 1, "line map = svgElement 'line' ((isNil map) defaultLineMap map)", lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("line", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultLineMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 159, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("text", 2, "text t map = svgNode concat['<text ' (insertFields ((isNil map) defaultTextMap map)) '>' ((isNil t) 'undefined' t) '</text>']", lazy((function(L$instance, L$parent){
  var L$F = function(L_t, L_map) {
  return L_checkPartial(L$F, arguments, Leisure_tracePartialStd) || (
  Leisure_traceCallStd(L$F, L_t, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<text ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_insertFields)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultTextMap)(L_map));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_t)("undefined")(L_t));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("</text>", L_nil));
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
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 161, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("polygon", 1, "polygon map = svgElement 'polygon' ((isNil map) defaultPolygonMap map)", lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, L_map),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("polygon", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultPolygonMap)(L_map));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 171, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("group", 1, "group elem = svgNode concat['<g>' (elem id) '</g>']", lazy((function(L$instance, L$parent){
  var L$F = function(L_elem){return (
  Leisure_traceCallStd(L$F, L_elem),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<g>", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_elem)(L_id));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("</g>", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 173, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("translate", 3, "translate elem x y = svgNode concat['<g transform=\"translate(' x ' ' y ')\">' (elem id) '</g>']", lazy((function(L$instance, L$parent){
  var L$F = function(L_elem, L_x, L_y) {
  return L_checkPartial(L$F, arguments, Leisure_tracePartialStd) || (
  Leisure_traceCallStd(L$F, L_elem, L_x, L_y),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<g transform=\"translate(", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_x, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_y, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(")\">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_elem)(L_id));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("</g>", L_nil));
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
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 179, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("rotate", 2, "rotate elem r = svgNode concat['<g transform=\"rotate(' r ')\">' (elem id) '</g>']", lazy((function(L$instance, L$parent){
  var L$F = function(L_elem, L_r) {
  return L_checkPartial(L$F, arguments, Leisure_tracePartialStd) || (
  Leisure_traceCallStd(L$F, L_elem, L_r),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<g transform=\"rotate(", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_r, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)(")\">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_elem)(L_id));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValueStd(L$context, undefined, L$instance, function(){
  return Leisure_traceResolveStd(L$instance, resolve(L_cons)("</g>", L_nil));
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
  L$F.L$instanceId = L$instance;
  Leisure_traceLambdaStd(L$instance, L$F, L$context, 189, L$parent);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)}
  ]);
});
//# sourceMappingURL=data:application/json;base64,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
