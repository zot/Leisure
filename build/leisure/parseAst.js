"use strict";
define([], function(){
  var L$context = Leisure_traceTopLevelStd({
    id: Leisure_traceContext++,
    traceCreatePartial: function(){return Leisure_traceCreatePartialStd;},
    traceCallPartial: function(){return Leisure_traceCallPartialStd;},
    source: "build/leisure/parseAst.lsr",
    externalMap: "build/leisure/parseAst.map",
    decls: ["lambda",37,9,null,"makeNode",1,null,"lambda",37,41,0,null,1,"f","lambda",39,8,null,"nodeSvg",1,"st","lambda",39,17,2,null,1,"svg","lambda",39,21,3,null,1,"width","lambda",39,27,4,null,1,"height","lambda",39,34,5,null,1,"rootX","lambda",39,40,6,null,1,"rootY","lambda",40,10,null,"nodeWidth",1,"st","lambda",40,19,8,null,1,"svg","lambda",40,23,9,null,1,"width","lambda",40,29,10,null,1,"height","lambda",40,36,11,null,1,"rootX","lambda",40,42,12,null,1,"rootY","lambda",41,11,null,"nodeHeight",1,"st","lambda",41,20,14,null,1,"svg","lambda",41,24,15,null,1,"width","lambda",41,30,16,null,1,"height","lambda",41,37,17,null,1,"rootX","lambda",41,43,18,null,1,"rootY","lambda",42,10,null,"nodeRootX",1,"st","lambda",42,19,20,null,1,"svg","lambda",42,23,21,null,1,"width","lambda",42,29,22,null,1,"height","lambda",42,36,23,null,1,"rootX","lambda",42,42,24,null,1,"rootY","lambda",43,10,null,"nodeRootY",1,"st","lambda",43,19,26,null,1,"svg","lambda",43,23,27,null,1,"width","lambda",43,29,28,null,1,"height","lambda",43,36,29,null,1,"rootX","lambda",43,42,30,null,1,"rootY","lambda",48,14,null,"nodeTranslate",1,null,"lambda",48,27,32,null,1,"svg","lambda",48,31,33,null,1,"width","lambda",48,37,34,null,1,"height","lambda",48,44,35,null,1,"rootX","lambda",48,50,36,null,1,"rootY","lazy",49,2,37,"lazy",52,2,37,"lazy",53,2,37,"lambda",55,9,null,"nodeLine",1,null,"lambda",55,21,41,null,1,"s1","lambda",55,24,42,null,1,"w1","lambda",55,27,43,null,1,"h1","lambda",55,30,44,null,1,"x1","lambda",55,33,45,null,1,"y1","lambda",55,42,46,null,1,"s2","lambda",55,45,47,null,1,"w2","lambda",55,48,48,null,1,"h2","lambda",55,51,49,null,1,"x2","lambda",55,54,50,null,1,"y2","lazy",56,9,51,"lazy",56,9,52,"lazy",56,19,52,"lazy",56,19,54,"lazy",56,29,54,"lazy",56,29,56,"lazy",56,39,56,"lazy",56,39,58,"lazy",56,49,58,"lazy",56,49,60,"lambda",58,19,null,"rangeContainsRange",1,null,"lazy",58,56,62,"lazy",58,79,62,"lambda",60,10,null,"highlight",1,"map","lazy",61,6,65,"lazy",63,4,65,"lazy",64,4,65,"lazy",65,6,68,"lazy",66,6,68,"lazy",67,8,70,"lambda",70,8,null,"treeFor",1,"ast","lambda",70,31,72,null,1,"ast","lambda",70,35,73,null,1,"map","lambda",72,12,null,"treeForWith",1,null,"lazy",72,35,75,"lambda",74,15,null,"wrappedTreeFor",1,"ast","lazy",75,12,77,"lambda",75,25,78,null,1,"ast","lambda",75,29,79,null,1,"map","lazy",76,7,77,"lazy",76,25,77,"lazy",76,25,82,"lazy",76,34,83,"lazy",76,44,84,"lazy",76,64,82,"lazy",76,64,86,"lazy",76,74,87,"lazy",76,84,88,"lambda",78,8,null,"nodeFor",1,null,"lazy",79,6,90,"lazy",81,4,90,"lazy",81,23,92,"lazy",81,29,93,"lambda",81,34,94,null,1,"v","lambda",81,36,95,null,1,"p","lazy",82,4,90,"lazy",83,6,97,"lazy",83,25,98,"lazy",83,31,99,"lambda",83,36,100,null,1,"n","lambda",83,38,101,null,1,"p","lazy",84,6,97,"lazy",85,8,103,"lambda",85,14,104,null,1,"v","lambda",85,16,105,null,1,"b","lambda",85,18,106,null,1,"p","lazy",86,8,103,"lazy",87,10,108,"lambda",87,16,109,null,1,"f","lambda",87,18,110,null,1,"a","lazy",88,10,108,"lazy",90,12,112,"lambda",90,18,113,null,1,"n","lambda",90,20,114,null,1,"d","lambda",90,22,115,null,1,"b","lazy",91,12,112,"lazy",91,28,117,"lazy",93,13,null,"lazy",93,13,119,"lazy",93,32,119,"lazy",93,32,121,"lazy",93,51,121,"lazy",93,51,123,"lazy",93,67,123,"lazy",93,67,125,"lazy",93,76,125,"lazy",93,76,127,"lazy",94,15,null,"lazy",94,15,129,"lazy",94,34,129,"lazy",94,34,131,"lazy",94,53,131,"lazy",94,53,133,"lazy",94,69,133,"lazy",94,69,135,"lazy",94,78,135,"lazy",94,78,137,"lazy",95,14,null,"lazy",95,14,139,"lazy",95,33,139,"lazy",95,33,141,"lazy",95,52,141,"lazy",95,52,143,"lazy",95,68,143,"lazy",95,68,145,"lazy",95,77,145,"lazy",95,77,147,"lambda",97,17,null,"createLambdaNode",1,null,"lazy",98,12,149,"lazy",98,22,150,"lazy",99,11,149,"lazy",99,21,152,"lazy",100,13,149,"lazy",101,16,149,"lazy",101,16,155,"lazy",101,16,156,"lazy",101,45,155,"lazy",102,15,149,"lazy",102,31,159,"lazy",103,8,149,"lazy",103,15,161,"lazy",103,15,162,"lazy",104,12,149,"lazy",104,35,164,"lazy",104,35,165,"lazy",104,53,165,"lazy",104,53,167,"lazy",105,11,149,"lazy",105,37,169,"lazy",105,37,170,"lazy",106,13,149,"lazy",106,37,172,"lazy",106,37,173,"lazy",106,44,174,"lazy",106,73,172,"lazy",106,73,176,"lazy",108,4,149,"lazy",108,15,178,"lazy",108,16,179,"lazy",108,41,179,"lazy",108,42,181,"lazy",108,69,181,"lazy",108,70,183,"lazy",108,86,183,"lazy",108,87,185,"lazy",108,105,185,"lazy",108,106,187,"lazy",110,5,149,"lazy",110,5,189,"lazy",110,5,190,"lazy",110,36,189,"lazy",110,41,192,"lazy",110,61,192,"lazy",111,4,149,"lazy",112,5,149,"lazy",112,5,196,"lambda",114,16,null,"createApplyNode",1,null,"lazy",115,12,198,"lazy",115,22,199,"lazy",116,13,198,"lazy",117,12,198,"lazy",118,16,198,"lazy",118,16,203,"lazy",118,16,204,"lazy",118,46,203,"lazy",119,15,198,"lazy",119,31,207,"lazy",120,8,198,"lazy",120,15,209,"lazy",120,15,210,"lazy",121,12,198,"lazy",121,35,212,"lazy",121,35,213,"lazy",121,53,213,"lazy",121,53,215,"lazy",122,13,198,"lazy",122,41,217,"lazy",122,41,218,"lazy",123,12,198,"lazy",123,35,220,"lazy",123,35,221,"lazy",123,42,222,"lazy",123,73,220,"lazy",123,73,224,"lazy",125,4,198,"lazy",125,15,226,"lazy",125,16,227,"lazy",125,43,227,"lazy",125,44,229,"lazy",125,70,229,"lazy",125,71,231,"lazy",125,88,231,"lazy",125,89,233,"lazy",125,107,233,"lazy",125,108,235,"lazy",127,5,198,"lazy",127,5,237,"lazy",127,5,238,"lazy",127,36,237,"lazy",127,41,240,"lazy",127,62,240,"lazy",128,4,198,"lazy",129,5,198,"lazy",129,5,244,"lambda",131,14,null,"createRefNode",1,null,"lazy",131,42,246,"lambda",132,14,null,"createLitNode",1,null,"lazy",132,42,248,"lambda",134,9,null,"textNode",1,null,"lambda",134,44,250,null,1,"w","lambda",134,46,251,null,1,"h","lazy",135,10,252,"lazy",136,10,252,"lazy",138,5,252,"lazy",138,16,255,"lazy",138,17,256,"lazy",138,24,257,"lazy",138,24,258,"lazy",138,32,258,"lazy",138,32,260,"lazy",138,40,260,"lazy",138,40,262,"lazy",138,56,262,"lazy",138,56,264,"lazy",138,80,256,"lazy",138,81,266,"lazy",138,92,267,"lazy",138,92,268,"lazy",138,120,268,"lazy",138,120,270,"lazy",138,145,270,"lazy",138,145,272,"lazy",138,182,272,"lazy",138,182,274,"lazy",138,187,275,"lazy",138,192,276,"lazy",138,200,274,"lazy",138,200,278,"lazy",138,205,279,"lazy",138,214,280,"lazy",138,222,278,"lazy",138,222,282,"lazy",141,4,252,"lazy",142,4,252]
  });
  return L_runMonads([
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("makeNode", 5, "makeNode svg width height rootX rootY = \\f . f svg width height rootX rootY", lazy(setDataType((function(L$instance, L$parent){
  var L$F = function(L_svg, L_width, L_height, L_rootX, L_rootY) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_svg, L_width, L_height, L_rootX, L_rootY),
  Leisure_traceReturnStd(L$instance, (setType((function(L$instance, L$parent){
  var L$F = function(L_f){return (
  Leisure_traceCallStd(L$instance, L_f),
  Leisure_traceReturnStd(L$instance, (resolve(L_f)(L_svg)(L_width)(L_height)(L_rootX)(L_rootY)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 1;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance), 'makeNode')))
);
};;
  L$F.leisureLength = 5;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 0;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance), 'makeNode')));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeSvg", 1, "nodeSvg st = st \\svg width height rootX rootY . svg", lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$instance, L_st),
  Leisure_traceReturnStd(L$instance, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$instance, L_svg),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$instance, L_width),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$instance, L_height),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$instance, L_rootX),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$instance, L_rootY),
  Leisure_traceReturnStd(L$instance, (resolve(L_svg)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 7;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 6;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 5;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 4;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 3;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 2;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeWidth", 1, "nodeWidth st = st \\svg width height rootX rootY . width", lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$instance, L_st),
  Leisure_traceReturnStd(L$instance, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$instance, L_svg),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$instance, L_width),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$instance, L_height),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$instance, L_rootX),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$instance, L_rootY),
  Leisure_traceReturnStd(L$instance, (resolve(L_width)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 13;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 12;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 11;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 10;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 9;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 8;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeHeight", 1, "nodeHeight st = st \\svg width height rootX rootY . height", lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$instance, L_st),
  Leisure_traceReturnStd(L$instance, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$instance, L_svg),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$instance, L_width),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$instance, L_height),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$instance, L_rootX),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$instance, L_rootY),
  Leisure_traceReturnStd(L$instance, (resolve(L_height)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 19;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 18;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 17;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 16;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 15;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 14;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeRootX", 1, "nodeRootX st = st \\svg width height rootX rootY . rootX", lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$instance, L_st),
  Leisure_traceReturnStd(L$instance, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$instance, L_svg),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$instance, L_width),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$instance, L_height),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$instance, L_rootX),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$instance, L_rootY),
  Leisure_traceReturnStd(L$instance, (resolve(L_rootX)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 25;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 24;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 23;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 22;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 21;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 20;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeRootY", 1, "nodeRootY st = st \\svg width height rootX rootY . rootY", lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$instance, L_st),
  Leisure_traceReturnStd(L$instance, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$instance, L_svg),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$instance, L_width),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$instance, L_height),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$instance, L_rootX),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$instance, L_rootY),
  Leisure_traceReturnStd(L$instance, (resolve(L_rootY)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 31;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 30;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 29;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 28;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 27;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 26;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("space", 0, "space = 10", 10);
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("border", 0, "border = 5", 5);
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeTranslate", 3, "nodeTranslate st x y = st \\svg width height rootX rootY . makeNode\n  translate svg x y\n  width\n  height\n  rootX + x\n  rootY + y", lazy((function(L$instance, L$parent){
  var L$F = function(L_st, L_x, L_y) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_st, L_x, L_y),
  Leisure_traceReturnStd(L$instance, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$instance, L_svg),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$instance, L_width),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$instance, L_height),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$instance, L_rootX),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$instance, L_rootY),
  Leisure_traceReturnStd(L$instance, (resolve(L_makeNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 38, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_translate)(L_svg, L_x, L_y));
  });
})(++Leisure_traceInstance, L$instance), L_width, L_height, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 39, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_rootX, L_x));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 40, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_rootY, L_y));
  });
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 37;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 36;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 35;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 34;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 33;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 32;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeLine", 2, "nodeLine n1 n2 = n1 \\s1 w1 h1 x1 y1 . n2 \\s2 w2 h2 x2 y2 .\n  line [['x1'|x1] ['y1'|y1] ['x2'|x2] ['y2'|y2] ['stroke-width'|3] | defaultLineMap]", lazy((function(L$instance, L$parent){
  var L$F = function(L_n1, L_n2) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_n1, L_n2),
  Leisure_traceReturnStd(L$instance, (resolve(L_n1)(lazy((function(L$instance, L$parent){
  var L$F = function(L_s1){return (
  Leisure_traceCallStd(L$instance, L_s1),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_w1){return (
  Leisure_traceCallStd(L$instance, L_w1),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_h1){return (
  Leisure_traceCallStd(L$instance, L_h1),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_x1){return (
  Leisure_traceCallStd(L$instance, L_x1),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_y1){return (
  Leisure_traceCallStd(L$instance, L_y1),
  Leisure_traceReturnStd(L$instance, (resolve(L_n2)(lazy((function(L$instance, L$parent){
  var L$F = function(L_s2){return (
  Leisure_traceCallStd(L$instance, L_s2),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_w2){return (
  Leisure_traceCallStd(L$instance, L_w2),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_h2){return (
  Leisure_traceCallStd(L$instance, L_h2),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_x2){return (
  Leisure_traceCallStd(L$instance, L_x2),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_y2){return (
  Leisure_traceCallStd(L$instance, L_y2),
  Leisure_traceReturnStd(L$instance, (resolve(L_line)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 61, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 53, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x1", L_x1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 61, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 55, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y1", L_y1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 61, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 57, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x2", L_x2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 61, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 59, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y2", L_y2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 61, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 61, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 3));
  });
})(++Leisure_traceInstance, L$instance), L_defaultLineMap));
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
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 51;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 50;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 49;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 48;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 47;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 46;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 45;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 44;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 43;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 42;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 41;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("rangeContainsRange", 4, "rangeContainsRange start end innerStart innerEnd = and (lte start innerStart) (lte innerEnd end)", lazy((function(L$instance, L$parent){
  var L$F = function(L_start, L_end, L_innerStart, L_innerEnd) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_start, L_end, L_innerStart, L_innerEnd),
  Leisure_traceReturnStd(L$instance, (resolve(L_and)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 63, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_lte))(L_start, L_innerStart));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 64, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_lte))(L_innerEnd, L_end));
  });
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 62;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("highlight", 1, "highlight map = do\n  c = assocGetWithDefault 'fill' map nil\n  eq c '#fcc'\n    assocSet 'fill' 'red' map\n    eq c '#cfc'\n      assocSet 'fill' 'green' map\n      eq c '#ccf'\n        assocSet 'fill' 'blue' map\n        map", lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$instance, L_map),
  Leisure_traceReturnStd(L$instance, ((function(){  var L_c;
  L_c = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 66, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_assocGetWithDefault)("fill", L_map, L_nil));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_eq)(L_c, "#fcc")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 67, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_assocSet))("fill", "red", L_map));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 71, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_eq)(L_c, "#cfc")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 69, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_assocSet))("fill", "green", L_map));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 71, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_eq)(L_c, "#ccf")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 71, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_assocSet))("fill", "blue", L_map));
  });
})(++Leisure_traceInstance, L$instance))(L_map));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 65;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("treeFor", 1, "treeFor ast = treeForWith ast \\ast map . map", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast){return (
  Leisure_traceCallStd(L$instance, L_ast),
  Leisure_traceReturnStd(L$instance, (resolve(L_treeForWith)(L_ast, lazy((function(L$instance, L$parent){
  var L$F = function(L_ast_0){return (
  Leisure_traceCallStd(L$instance, L_ast_0),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$instance, L_map),
  Leisure_traceReturnStd(L$instance, (resolve(L_map)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 74;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 73;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 72;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("treeForWith", 2, "treeForWith ast mapFunc = nodeSvg (nodeFor ast mapFunc)", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_mapFunc),
  Leisure_traceReturnStd(L$instance, (resolve(L_nodeSvg)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 76, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_ast, L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 75;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("wrappedTreeFor", 1, "wrappedTreeFor ast = do\n  content = nodeFor ast \\ast map . map\n  svg (nodeSvg content) {'width':(border + (nodeWidth content)) 'height':(border + (nodeHeight content))}", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast){return (
  Leisure_traceCallStd(L$instance, L_ast),
  Leisure_traceReturnStd(L$instance, ((function(){  var L_content;
  L_content = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 80, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_ast, lazy((function(L$instance, L$parent){
  var L$F = function(L_ast_0){return (
  Leisure_traceCallStd(L$instance, L_ast_0),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$instance, L_map),
  Leisure_traceReturnStd(L$instance, (resolve(L_map)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 80;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 79;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance))));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_svg)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 81, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_content));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 89, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_aconsPair)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 85, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("width", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 85, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_border, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 85, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_content));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 89, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_aconsPair)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 89, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("height", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 89, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_border, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 89, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_content));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), L_nil));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 77;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeFor", 2, "nodeFor ast mapFunc = do\n  t = getType ast\n  eq t 'lit'\n    createLitNode ast (show (ast \\v p . v)) mapFunc\n    eq t 'ref'\n      createRefNode ast (show (ast \\n p . n)) mapFunc\n      eq t 'lambda'\n        ast (\\v b p . createLambdaNode ast v b mapFunc)\n        eq t 'apply'\n          ast (\\f a . createApplyNode ast f a mapFunc)\n          eq t 'anno'\n            #ast (\\n d b . createApplyNode ast f a mapFunc)\n            ast (\\n d b . nodeFor b mapFunc)\n            log 2 makeNode (svgNode '') 0 0 0 0", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_mapFunc),
  Leisure_traceReturnStd(L$instance, ((function(){  var L_t;
  L_t = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 91, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_getType)(L_ast));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_eq)(L_t, "lit")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 96, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_createLitNode)(L_ast, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 96, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_show)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 96, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_ast)(lazy((function(L$instance, L$parent){
  var L$F = function(L_v){return (
  Leisure_traceCallStd(L$instance, L_v),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_p){return (
  Leisure_traceCallStd(L$instance, L_p),
  Leisure_traceReturnStd(L$instance, (resolve(L_v)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 96;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 95;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance))));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 118, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_eq)(L_t, "ref")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 102, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_createRefNode)(L_ast, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 102, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_show)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 102, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_ast)(lazy((function(L$instance, L$parent){
  var L$F = function(L_n){return (
  Leisure_traceCallStd(L$instance, L_n),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_p){return (
  Leisure_traceCallStd(L$instance, L_p),
  Leisure_traceReturnStd(L$instance, (resolve(L_n)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 102;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 101;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance))));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 118, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_eq)(L_t, "lambda")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 107, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_ast)(lazy((function(L$instance, L$parent){
  var L$F = function(L_v){return (
  Leisure_traceCallStd(L$instance, L_v),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_b){return (
  Leisure_traceCallStd(L$instance, L_b),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_p){return (
  Leisure_traceCallStd(L$instance, L_p),
  Leisure_traceReturnStd(L$instance, (resolve(L_createLambdaNode)(L_ast, L_v, L_b, L_mapFunc)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 107;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 106;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 105;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance))));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 118, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_eq)(L_t, "apply")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 111, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_ast)(lazy((function(L$instance, L$parent){
  var L$F = function(L_f){return (
  Leisure_traceCallStd(L$instance, L_f),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_a){return (
  Leisure_traceCallStd(L$instance, L_a),
  Leisure_traceReturnStd(L$instance, (resolve(L_createApplyNode)(L_ast, L_f, L_a, L_mapFunc)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 111;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 110;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance))));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 118, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_eq)(L_t, "anno")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 116, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_ast)(lazy((function(L$instance, L$parent){
  var L$F = function(L_n){return (
  Leisure_traceCallStd(L$instance, L_n),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_d){return (
  Leisure_traceCallStd(L$instance, L_d),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_b){return (
  Leisure_traceCallStd(L$instance, L_b),
  Leisure_traceReturnStd(L$instance, (resolve(L_nodeFor)(L_b, L_mapFunc)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 116;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 115;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 114;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance))));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 118, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_log)(2, L_makeNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 118, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgNode)(""));
  });
})(++Leisure_traceInstance, L$instance))(0)(0)(0)(0));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 90;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("redStyle", 0, "redStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#fcc'] ['rx'|8] ['ry'|8]]", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 128, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 120, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 128, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 122, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 128, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 124, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "#fcc"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 128, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 126, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("rx", 8));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 128, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 128, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("ry", 8));
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
  return resolve(L_newDefine)("greenStyle", 0, "greenStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#cfc'] ['rx'|8] ['ry'|8]]", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 138, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 130, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 138, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 132, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 138, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 134, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "#cfc"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 138, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 136, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("rx", 8));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 138, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 138, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("ry", 8));
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
  return resolve(L_newDefine)("blueStyle", 0, "blueStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#ccf'] ['rx'|8] ['ry'|8]]", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 142, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 144, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "#ccf"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 146, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("rx", 8));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("ry", 8));
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
  return resolve(L_newDefine)("createLambdaNode", 4, "createLambdaNode ast v b mapFunc = do\n  rootBox = textNode (mapFunc ast greenStyle) 'lambda'\n  varBox = textNode (mapFunc ast greenStyle) v\n  bodyTree = nodeFor b mapFunc\n  childWidth = (nodeWidth varBox) + space + (nodeWidth bodyTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  varBox = nodeTranslate varBox pad (nodeHeight rootBox) + space\n  bodyTree = nodeTranslate bodyTree (pad + (nodeWidth varBox) + space) ((nodeHeight rootBox) + space)\n  log 3 makeNode\n    svgConcat [(nodeLine rootBox varBox) (nodeLine rootBox bodyTree) (nodeSvg varBox) (nodeSvg bodyTree) (nodeSvg rootBox)]\n    totalWidth\n    (nodeHeight rootBox) + space + (max (nodeHeight varBox) (nodeHeight bodyTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_v, L_b, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_v, L_b, L_mapFunc),
  Leisure_traceReturnStd(L$instance, ((function(){  var L_rootBox, L_varBox, L_bodyTree, L_childWidth, L_totalWidth, L_pad, L_rootBox_0, L_varBox_1, L_bodyTree_2;
  L_rootBox = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 151, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 151, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_greenStyle));
  });
})(++Leisure_traceInstance, L$instance), "lambda"));
  });
})(++Leisure_traceInstance, L$instance);
  L_varBox = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 153, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 153, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_greenStyle));
  });
})(++Leisure_traceInstance, L$instance), L_v));
  });
})(++Leisure_traceInstance, L$instance);
  L_bodyTree = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 154, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_b, L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance);
  L_childWidth = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 158, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 157, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 157, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_varBox));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 158, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_bodyTree));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_totalWidth = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 160, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)(L_childWidth, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 160, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_rootBox));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_pad = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 163, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)(0, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 163, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 163, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$_)(L_totalWidth, L_childWidth));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_rootBox_0 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 168, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_rootBox, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 168, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$_)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 166, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_totalWidth, 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 168, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 168, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_rootBox));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), 0));
  });
})(++Leisure_traceInstance, L$instance);
  L_varBox_1 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 171, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_varBox, L_pad, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 171, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 171, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_bodyTree_2 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 177, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_bodyTree, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 175, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 175, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_pad, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 175, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_varBox_1));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 177, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 177, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_log)(3, L_makeNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgConcat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 180, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeLine)(L_rootBox_0, L_varBox_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 182, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeLine)(L_rootBox_0, L_bodyTree_2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 184, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_varBox_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 186, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_bodyTree_2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_rootBox_0));
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
})(++Leisure_traceInstance, L$instance))(L_totalWidth)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 194, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 191, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 191, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 194, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 193, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_varBox_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 194, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_bodyTree_2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 195, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_totalWidth, 2));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 197, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 197, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 149;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createApplyNode", 4, "createApplyNode ast f a mapFunc = do\n  rootBox = textNode (mapFunc ast blueStyle) 'apply'\n  funcTree = nodeFor f mapFunc\n  argTree = nodeFor a mapFunc\n  childWidth = (nodeWidth argTree) + space + (nodeWidth funcTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  funcTree = nodeTranslate funcTree pad (nodeHeight rootBox) + space\n  argTree = nodeTranslate argTree (pad + (nodeWidth funcTree) + space) ((nodeHeight rootBox) + space)\n  makeNode\n    svgConcat [(nodeLine rootBox funcTree) (nodeLine rootBox argTree) (nodeSvg rootBox) (nodeSvg funcTree) (nodeSvg argTree)]\n    totalWidth\n    (nodeHeight rootBox) + space + (max (nodeHeight argTree) (nodeHeight funcTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_f, L_a, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_f, L_a, L_mapFunc),
  Leisure_traceReturnStd(L$instance, ((function(){  var L_rootBox, L_funcTree, L_argTree, L_childWidth, L_totalWidth, L_pad, L_rootBox_0, L_funcTree_1, L_argTree_2;
  L_rootBox = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 200, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 200, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_blueStyle));
  });
})(++Leisure_traceInstance, L$instance), "apply"));
  });
})(++Leisure_traceInstance, L$instance);
  L_funcTree = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 201, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_f, L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance);
  L_argTree = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 202, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_a, L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance);
  L_childWidth = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 206, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 205, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 205, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_argTree));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 206, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_funcTree));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_totalWidth = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 208, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)(L_childWidth, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 208, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_rootBox));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_pad = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 211, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)(0, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 211, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 211, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$_)(L_totalWidth, L_childWidth));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_rootBox_0 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 216, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_rootBox, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 216, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$_)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 214, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_totalWidth, 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 216, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 216, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_rootBox));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), 0));
  });
})(++Leisure_traceInstance, L$instance);
  L_funcTree_1 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 219, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_funcTree, L_pad, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 219, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 219, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_argTree_2 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 225, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_argTree, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 223, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 223, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_pad, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 223, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_funcTree_1));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 225, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 225, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_makeNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgConcat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 228, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeLine)(L_rootBox_0, L_funcTree_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 230, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeLine)(L_rootBox_0, L_argTree_2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 232, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 234, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_funcTree_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_argTree_2));
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
})(++Leisure_traceInstance, L$instance), L_totalWidth, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 242, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 239, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 239, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 242, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 241, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_argTree_2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 242, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_funcTree_1));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 243, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_totalWidth, 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 245, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 245, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 198;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createRefNode", 3, "createRefNode ast ref mapFunc = textNode (mapFunc ast redStyle) ref", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_ref, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_ref, L_mapFunc),
  Leisure_traceReturnStd(L$instance, (resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 247, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_redStyle));
  });
})(++Leisure_traceInstance, L$instance), L_ref)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 246;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createLitNode", 3, "createLitNode ast lit mapFunc = textNode (mapFunc ast greenStyle) lit", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_lit, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_lit, L_mapFunc),
  Leisure_traceReturnStd(L$instance, (resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 249, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_greenStyle));
  });
})(++Leisure_traceInstance, L$instance), L_lit)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 248;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("textNode", 2, "textNode map txt = (svgMeasureText txt '') \\w h . do\n  nodeW = w + 24\n  nodeH = h + 14\n  makeNode\n    (svgConcat [(rect [['x'|2] ['y'|2] ['width'|nodeW] ['height'|nodeH] | map]) (text txt [['pointer-events' | 'none'] ['text-anchor'|\"middle\"] ['dominant-baseline'|\"mathematical\"] ['x'| 14 + w / 2] ['y'| border + h / 2] ['font-weight'|'bold']])])\n    nodeW\n    nodeH\n    nodeW / 2\n    nodeH / 2", lazy((function(L$instance, L$parent){
  var L$F = function(L_map, L_txt) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_map, L_txt),
  Leisure_traceReturnStd(L$instance, (L$(resolve(L_svgMeasureText))(L_txt, "", lazy((function(L$instance, L$parent){
  var L$F = function(L_w){return (
  Leisure_traceCallStd(L$instance, L_w),
  Leisure_traceReturnStd(L$instance, ((function(L$instance, L$parent){
  var L$F = function(L_h){return (
  Leisure_traceCallStd(L$instance, L_h),
  Leisure_traceReturnStd(L$instance, ((function(){  var L_nodeW, L_nodeH;
  L_nodeW = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 253, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_w, 24));
  });
})(++Leisure_traceInstance, L$instance);
  L_nodeH = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 254, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_h, 14));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_makeNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgConcat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 265, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_rect)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 265, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 259, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 265, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 261, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 265, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 263, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("width", L_nodeW));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 265, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 265, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("height", L_nodeH));
  });
})(++Leisure_traceInstance, L$instance), L_map));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_text)(L_txt, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 269, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("pointer-events", "none"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 271, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("text-anchor", "middle"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 273, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("dominant-baseline", "mathematical"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 277, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 277, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(14, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 277, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_w, 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 281, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 281, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_border, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 281, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_h, 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 283, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("font-weight", "bold"));
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
})(++Leisure_traceInstance, L$instance), L_nil));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), L_nodeW, L_nodeH, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 284, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_nodeW, 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 285, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_nodeH, 2));
  });
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 252;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.leisureLength = 1;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 251;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = L$instance;
  L$F.L$context = L$context;
  L$F.L$id = 250;
  Leisure_traceLambdaStd(L$F);
  return L$F;
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)}
  ]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlQXN0LmxzciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFvQ0E7QUFBQTtBQUFBLDZIQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBQWdDO0FBQUE7QUFBQTtBQUFBLHNDQUFJLHdEQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvREFBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscURBQVQ7QUFBQSw0QkFwQ0E7QUFBQSxJQXNDQTtBQUFBO0FBQUEsb0dBQVE7QUFBQTtBQUFBO0FBQUEsc0NBQUssY0FBSTtBQUFBO0FBQUE7QUFBQSxzQ0FBSTtBQUFBO0FBQUE7QUFBQSxzQ0FBTTtBQUFBO0FBQUE7QUFBQSxzQ0FBTztBQUFBO0FBQUE7QUFBQSxzQ0FBTTtBQUFBO0FBQUE7QUFBQSxzQ0FBUSxjQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQUosQ0FBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVI7QUFBQSw0QkF0Q0E7QUFBQSxJQXVDQTtBQUFBO0FBQUEsMEdBQVU7QUFBQTtBQUFBO0FBQUEsc0NBQUssY0FBSTtBQUFBO0FBQUE7QUFBQSxzQ0FBSTtBQUFBO0FBQUE7QUFBQSxzQ0FBTTtBQUFBO0FBQUE7QUFBQSxzQ0FBTztBQUFBO0FBQUE7QUFBQSxzQ0FBTTtBQUFBO0FBQUE7QUFBQSxzQ0FBUSxnQkFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFKLENBQUw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFWO0FBQUEsNEJBdkNBO0FBQUEsSUF3Q0E7QUFBQTtBQUFBLDZHQUFXO0FBQUE7QUFBQTtBQUFBLHNDQUFLLGNBQUk7QUFBQTtBQUFBO0FBQUEsc0NBQUk7QUFBQTtBQUFBO0FBQUEsc0NBQU07QUFBQTtBQUFBO0FBQUEsc0NBQU87QUFBQTtBQUFBO0FBQUEsc0NBQU07QUFBQTtBQUFBO0FBQUEsc0NBQVEsaUJBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBSixDQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBWDtBQUFBLDRCQXhDQTtBQUFBLElBeUNBO0FBQUE7QUFBQSwwR0FBVTtBQUFBO0FBQUE7QUFBQSxzQ0FBSyxjQUFJO0FBQUE7QUFBQTtBQUFBLHNDQUFJO0FBQUE7QUFBQTtBQUFBLHNDQUFNO0FBQUE7QUFBQTtBQUFBLHNDQUFPO0FBQUE7QUFBQTtBQUFBLHNDQUFNO0FBQUE7QUFBQTtBQUFBLHNDQUFRLGdCQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQUosQ0FBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVY7QUFBQSw0QkF6Q0E7QUFBQSxJQTBDQTtBQUFBO0FBQUEsMEdBQVU7QUFBQTtBQUFBO0FBQUEsc0NBQUssY0FBSTtBQUFBO0FBQUE7QUFBQSxzQ0FBSTtBQUFBO0FBQUE7QUFBQSxzQ0FBTTtBQUFBO0FBQUE7QUFBQSxzQ0FBTztBQUFBO0FBQUE7QUFBQSxzQ0FBTTtBQUFBO0FBQUE7QUFBQSxzQ0FBUSxnQkFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFKLENBQUw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFWO0FBQUEsNEJBMUNBO0FBQUEsSUE0Q0E7QUFBQTtBQUFBLHdEQUFRLEVBQVI7QUFBQSw0QkE1Q0E7QUFBQSxJQTZDQTtBQUFBO0FBQUEseURBQVMsQ0FBVDtBQUFBLDRCQTdDQTtBQUFBLElBK0NBO0FBQUE7QUFBQSwyTEFBYztBQUFBO0FBQUE7QUFBQTtBQUFBLHNDQUFTLGNBQUk7QUFBQTtBQUFBO0FBQUEsc0NBQUk7QUFBQTtBQUFBO0FBQUEsc0NBQU07QUFBQTtBQUFBO0FBQUEsc0NBQU87QUFBQTtBQUFBO0FBQUEsc0NBQU07QUFBQTtBQUFBO0FBQUEsc0NBQVEsb0JBQ3hEO0FBQUE7QUFBQSxvRUFBVSxLQUFWLEVBQWMsR0FBZCxFQUFnQixHQUFoQjtBQUFBO0FBQUEsdUNBRHdELEVBRXhELE9BRndELEVBR3hELFFBSHdELEVBSXhEO0FBQUE7QUFBQSwrQ0FBTSxhQUFOLFVBQVEsR0FBUjtBQUFBO0FBQUEsdUNBSndELEVBS3hEO0FBQUE7QUFBQSwrQ0FBTSxhQUFOLFVBQVEsR0FBUjtBQUFBO0FBQUEsdUNBTHdELENBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBSixDQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFkO0FBQUEsNEJBL0NBO0FBQUEsSUFzREE7QUFBQTtBQUFBLG1NQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBQVEsY0FBSTtBQUFBO0FBQUE7QUFBQSxzQ0FBRztBQUFBO0FBQUE7QUFBQSxzQ0FBRztBQUFBO0FBQUE7QUFBQSxzQ0FBRztBQUFBO0FBQUE7QUFBQSxzQ0FBRztBQUFBO0FBQUE7QUFBQSxzQ0FBSyxjQUFJO0FBQUE7QUFBQTtBQUFBLHNDQUFHO0FBQUE7QUFBQTtBQUFBLHNDQUFHO0FBQUE7QUFBQTtBQUFBLHNDQUFHO0FBQUE7QUFBQTtBQUFBLHNDQUFHO0FBQUE7QUFBQTtBQUFBLHNDQUNwRCxnQkFBTztBQUFBO0FBQUE7QUFBQTtBQUFBLHFFQUFLLElBQUw7QUFBQTtBQUFBLHlDQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEscUVBQUssSUFBTDtBQUFBO0FBQUEseUNBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSxxRUFBSyxJQUFMO0FBQUE7QUFBQSx5Q0FBVTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFFQUFLLElBQUw7QUFBQTtBQUFBLHlDQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0VBQWUsQ0FBZjtBQUFBO0FBQUEseUNBQW9CLGdCQUFwQjtBQUFBO0FBQUEsdUNBQVY7QUFBQTtBQUFBLHVDQUFWO0FBQUE7QUFBQSx1Q0FBVjtBQUFBO0FBQUEsdUNBQVY7QUFBQTtBQUFBLHVDQUFQLENBRG9EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQUosQ0FBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFKLENBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVQ7QUFBQSw0QkF0REE7QUFBQSxJQXlEQTtBQUFBO0FBQUEsMkpBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBQWdDLGVBQUs7QUFBQTtBQUFBLGtFQUFJLE9BQUosRUFBVSxZQUFWO0FBQUE7QUFBQSx1Q0FBTCxFQUE0QjtBQUFBO0FBQUEsa0VBQUksVUFBSixFQUFhLEtBQWI7QUFBQTtBQUFBLHVDQUE1QixDQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBbkI7QUFBQSw0QkF6REE7QUFBQSxJQTJEQTtBQUFBO0FBQUEsb1JBQVU7QUFBQTtBQUFBO0FBQUEsc0NBM0RWO0FBQUEsUUE0RE07QUFBQTtBQUFBLDhFQUFvQixNQUFwQixFQUEyQixLQUEzQixFQUErQixLQUEvQjtBQUFBO0FBQUEsdUNBNUROO0FBQUE7QUFBQSxTQTZERSxjQUFHLEdBQUgsRUFBSyxNQUFMLEVBQ0U7QUFBQTtBQUFBLHVFQUFTLE1BQVQsRUFBZ0IsS0FBaEIsRUFBc0IsS0FBdEI7QUFBQTtBQUFBLHVDQURGLEVBRUU7QUFBQTtBQUFBLDZEQUFHLEdBQUgsRUFBSyxNQUFMLEVBQ0U7QUFBQTtBQUFBLHVFQUFTLE1BQVQsRUFBZ0IsT0FBaEIsRUFBd0IsS0FBeEI7QUFBQTtBQUFBLHVDQURGLEVBRUU7QUFBQTtBQUFBLDZEQUFHLEdBQUgsRUFBSyxNQUFMLEVBQ0U7QUFBQTtBQUFBLHVFQUFTLE1BQVQsRUFBZ0IsTUFBaEIsRUFBdUIsS0FBdkI7QUFBQTtBQUFBLHVDQURGLEVBRUUsS0FGRjtBQUFBO0FBQUEsdUNBRkY7QUFBQTtBQUFBLHVDQUZGLENBN0RGLElBMkRVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBVjtBQUFBLDRCQTNEQTtBQUFBLElBcUVBO0FBQUE7QUFBQSw2RkFBUTtBQUFBO0FBQUE7QUFBQSxzQ0FBTSx1QkFBWSxLQUFaLEVBQWlCO0FBQUE7QUFBQTtBQUFBLHNDQUFJO0FBQUE7QUFBQTtBQUFBLHNDQUFNLGNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBakIsQ0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVI7QUFBQSw0QkFyRUE7QUFBQSxJQXVFQTtBQUFBO0FBQUEsMkdBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQ0FBYyxtQkFBUztBQUFBO0FBQUEsa0VBQVEsS0FBUixFQUFZLFNBQVo7QUFBQTtBQUFBLHVDQUFULENBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVo7QUFBQSw0QkF2RUE7QUFBQSxJQXlFQTtBQUFBO0FBQUEsa09BQWU7QUFBQTtBQUFBO0FBQUEsc0NBekVmO0FBQUEsY0EwRVk7QUFBQTtBQUFBLGtFQUFRLEtBQVIsRUFBYTtBQUFBO0FBQUE7QUFBQSxzQ0FBSTtBQUFBO0FBQUE7QUFBQSxzQ0FBTSxjQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQWI7QUFBQTtBQUFBLHVDQTFFWjtBQUFBO0FBQUEsU0EyRUUsZUFBSztBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFMLEVBQXVCO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0VBQVM7QUFBQTtBQUFBLCtDQUFPLGFBQVAsV0FBVTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFWO0FBQUE7QUFBQSx1Q0FBVDtBQUFBO0FBQUEseUNBQXVDO0FBQUE7QUFBQTtBQUFBO0FBQUEseUVBQVU7QUFBQTtBQUFBLCtDQUFPLGFBQVAsV0FBVTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFWO0FBQUE7QUFBQSx1Q0FBVjtBQUFBO0FBQUEseUNBQXlDLEtBQXpDO0FBQUE7QUFBQSx1Q0FBdkM7QUFBQTtBQUFBLHVDQUF2QixDQTNFRixJQXlFZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQWY7QUFBQSw0QkF6RUE7QUFBQSxJQTZFQTtBQUFBO0FBQUEsMGpCQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBN0VSO0FBQUEsUUE4RU07QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0E5RU47QUFBQTtBQUFBLFNBK0VFLGNBQUcsR0FBSCxFQUFLLEtBQUwsRUFDRTtBQUFBO0FBQUEsd0VBQWMsS0FBZCxFQUFtQjtBQUFBO0FBQUEsK0RBQU07QUFBQTtBQUFBLDhEQUFLO0FBQUE7QUFBQTtBQUFBLHNDQUFFO0FBQUE7QUFBQTtBQUFBLHNDQUFJLFlBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBTDtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBLHVDQUFuQixFQUF3QyxTQUF4QztBQUFBO0FBQUEsdUNBREYsRUFFRTtBQUFBO0FBQUEsNkRBQUcsR0FBSCxFQUFLLEtBQUwsRUFDRTtBQUFBO0FBQUEsd0VBQWMsS0FBZCxFQUFtQjtBQUFBO0FBQUEsK0RBQU07QUFBQTtBQUFBLDhEQUFLO0FBQUE7QUFBQTtBQUFBLHNDQUFFO0FBQUE7QUFBQTtBQUFBLHNDQUFJLFlBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBTDtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBLHVDQUFuQixFQUF3QyxTQUF4QztBQUFBO0FBQUEsdUNBREYsRUFFRTtBQUFBO0FBQUEsNkRBQUcsR0FBSCxFQUFLLFFBQUwsRUFDRTtBQUFBO0FBQUEsOERBQU07QUFBQTtBQUFBO0FBQUEsc0NBQUU7QUFBQTtBQUFBO0FBQUEsc0NBQUU7QUFBQTtBQUFBO0FBQUEsc0NBQUksNEJBQWlCLEtBQWpCLEVBQXFCLEdBQXJCLEVBQXVCLEdBQXZCLEVBQXlCLFNBQXpCLENBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQU47QUFBQTtBQUFBLHVDQURGLEVBRUU7QUFBQTtBQUFBLDZEQUFHLEdBQUgsRUFBSyxPQUFMLEVBQ0U7QUFBQTtBQUFBLDhEQUFNO0FBQUE7QUFBQTtBQUFBLHNDQUFFO0FBQUE7QUFBQTtBQUFBLHNDQUFJLDJCQUFnQixLQUFoQixFQUFvQixHQUFwQixFQUFzQixHQUF0QixFQUF3QixTQUF4QixDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQU47QUFBQTtBQUFBLHVDQURGLEVBRUU7QUFBQTtBQUFBLDZEQUFHLEdBQUgsRUFBSyxNQUFMLEVBRUU7QUFBQTtBQUFBLDhEQUFNO0FBQUE7QUFBQTtBQUFBLHNDQUFFO0FBQUE7QUFBQTtBQUFBLHNDQUFFO0FBQUE7QUFBQTtBQUFBLHNDQUFJLG1CQUFRLEdBQVIsRUFBVSxTQUFWLENBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQU47QUFBQTtBQUFBLHVDQUZGLEVBR0U7QUFBQTtBQUFBLDhEQUFJLENBQUosRUFBTSxVQUFOLEVBQWdCO0FBQUE7QUFBQSxrRUFBUSxFQUFSO0FBQUE7QUFBQSx1Q0FBaEIsRUFBNEIsQ0FBNUIsRUFBOEIsQ0FBOUIsRUFBZ0MsQ0FBaEMsRUFBa0MsQ0FBbEM7QUFBQTtBQUFBLHVDQUhGO0FBQUE7QUFBQSx1Q0FGRjtBQUFBO0FBQUEsdUNBRkY7QUFBQTtBQUFBLHVDQUZGO0FBQUE7QUFBQSx1Q0FGRixDQS9FRixJQTZFUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBUjtBQUFBLDRCQTdFQTtBQUFBLElBNEZBO0FBQUE7QUFBQSxxSUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUFTLE9BQVQ7QUFBQTtBQUFBLHlDQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBLCtFQUFlLENBQWY7QUFBQTtBQUFBLHlDQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVFQUFPLE1BQVA7QUFBQTtBQUFBLHlDQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFFQUFLLENBQUw7QUFBQTtBQUFBLHlDQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUEscUVBQUssQ0FBTDtBQUFBO0FBQUEseUNBQU8sS0FBUDtBQUFBO0FBQUEsdUNBQVQ7QUFBQTtBQUFBLHVDQUFoQjtBQUFBO0FBQUEsdUNBQW5CO0FBQUE7QUFBQSx1Q0FBbkI7QUFBQTtBQUFBLHVDQUFiO0FBQUEsNEJBNUZBO0FBQUEsSUE2RkE7QUFBQTtBQUFBLHlJQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUEseUVBQVMsT0FBVDtBQUFBO0FBQUEseUNBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0VBQWUsQ0FBZjtBQUFBO0FBQUEseUNBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUVBQU8sTUFBUDtBQUFBO0FBQUEseUNBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUVBQUssQ0FBTDtBQUFBO0FBQUEseUNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxRUFBSyxDQUFMO0FBQUE7QUFBQSx5Q0FBTyxLQUFQO0FBQUE7QUFBQSx1Q0FBVDtBQUFBO0FBQUEsdUNBQWhCO0FBQUE7QUFBQSx1Q0FBbkI7QUFBQTtBQUFBLHVDQUFuQjtBQUFBO0FBQUEsdUNBQWY7QUFBQSw0QkE3RkE7QUFBQSxJQThGQTtBQUFBO0FBQUEsdUlBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQSx5RUFBUyxPQUFUO0FBQUE7QUFBQSx5Q0FBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQSwrRUFBZSxDQUFmO0FBQUE7QUFBQSx5Q0FBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1RUFBTyxNQUFQO0FBQUE7QUFBQSx5Q0FBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxxRUFBSyxDQUFMO0FBQUE7QUFBQSx5Q0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBLHFFQUFLLENBQUw7QUFBQTtBQUFBLHlDQUFPLEtBQVA7QUFBQTtBQUFBLHVDQUFUO0FBQUE7QUFBQSx1Q0FBaEI7QUFBQTtBQUFBLHVDQUFuQjtBQUFBO0FBQUEsdUNBQW5CO0FBQUE7QUFBQSx1Q0FBZDtBQUFBLDRCQTlGQTtBQUFBLElBZ0dBO0FBQUE7QUFBQSxzNkJBQWlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBaEdqQjtBQUFBLGNBaUdZO0FBQUE7QUFBQSxtRUFBVTtBQUFBO0FBQUEsc0VBQVEsS0FBUixFQUFZLFlBQVo7QUFBQTtBQUFBLHVDQUFWLEVBQWtDLFFBQWxDO0FBQUE7QUFBQSx1Q0FqR1o7QUFBQSxhQWtHVztBQUFBO0FBQUEsbUVBQVU7QUFBQTtBQUFBLHNFQUFRLEtBQVIsRUFBWSxZQUFaO0FBQUE7QUFBQSx1Q0FBVixFQUFrQyxHQUFsQztBQUFBO0FBQUEsdUNBbEdYO0FBQUEsZUFtR2E7QUFBQTtBQUFBLGtFQUFRLEdBQVIsRUFBVSxTQUFWO0FBQUE7QUFBQSx1Q0FuR2I7QUFBQSxpQkFvR2dCO0FBQUE7QUFBQSwrQ0FBMEIsYUFBMUI7QUFBQTtBQUFBLCtDQUFrQixhQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQUFvQixPQUFwQjtBQUFBO0FBQUEseUNBQTZCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQTdCO0FBQUE7QUFBQSx1Q0FwR2hCO0FBQUEsaUJBcUdlO0FBQUE7QUFBQSw4REFBSSxZQUFKLEVBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQWhCO0FBQUE7QUFBQSx1Q0FyR2Y7QUFBQSxVQXNHUTtBQUFBO0FBQUEsOERBQUksQ0FBSixFQUFPO0FBQUE7QUFBQSwrQ0FBeUIsYUFBekI7QUFBQTtBQUFBLCtDQUFXLGFBQVgsZUFBYSxZQUFiO0FBQUE7QUFBQSx5Q0FBMkIsQ0FBM0I7QUFBQTtBQUFBLHVDQUFQO0FBQUE7QUFBQSx1Q0F0R1I7QUFBQSxnQkF1R1k7QUFBQTtBQUFBLHdFQUFjLFNBQWQsRUFBdUI7QUFBQTtBQUFBLCtDQUFlLGFBQWY7QUFBQTtBQUFBLCtDQUFXLGFBQVgsZUFBYSxDQUFiO0FBQUE7QUFBQSx5Q0FBa0I7QUFBQTtBQUFBLCtDQUFtQixhQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQUFxQixDQUFyQjtBQUFBO0FBQUEsdUNBQWxCO0FBQUE7QUFBQSx1Q0FBdkIsRUFBaUUsQ0FBakU7QUFBQTtBQUFBLHVDQXZHWjtBQUFBLGVBd0dXO0FBQUE7QUFBQSx3RUFBYyxRQUFkLEVBQXFCLEtBQXJCLEVBQTBCO0FBQUE7QUFBQSwrQ0FBb0IsYUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FBc0IsT0FBdEI7QUFBQTtBQUFBLHVDQUExQjtBQUFBO0FBQUEsdUNBeEdYO0FBQUEsaUJBeUdhO0FBQUE7QUFBQSx3RUFBYyxVQUFkLEVBQXdCO0FBQUE7QUFBQSwrQ0FBeUIsYUFBekI7QUFBQTtBQUFBLCtDQUFJLGFBQUosUUFBTztBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFQO0FBQUE7QUFBQSx5Q0FBMkIsT0FBM0I7QUFBQTtBQUFBLHVDQUF4QixFQUE0RDtBQUFBO0FBQUEsK0NBQW9CLGFBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXNCLE9BQXRCO0FBQUE7QUFBQSx1Q0FBNUQ7QUFBQTtBQUFBLHVDQXpHYjtBQUFBO0FBQUEsU0EwR0UsZUFBSSxDQUFKLEVBQU0sVUFBTixFQUNFO0FBQUE7QUFBQSxvRUFBVztBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBLG1FQUFTLFdBQVQsRUFBaUIsVUFBakI7QUFBQTtBQUFBLHVDQUFELEVBQTBCO0FBQUE7QUFBQSwrREFBQztBQUFBO0FBQUEsbUVBQVMsV0FBVCxFQUFpQixZQUFqQjtBQUFBO0FBQUEsdUNBQUQsRUFBNEI7QUFBQTtBQUFBLCtEQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUQsRUFBaUI7QUFBQTtBQUFBLCtEQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUQsRUFBbUI7QUFBQTtBQUFBLCtEQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUQsRUFBa0IsS0FBbEI7QUFBQTtBQUFBLHVDQUFuQjtBQUFBO0FBQUEsdUNBQWpCO0FBQUE7QUFBQSx1Q0FBNUI7QUFBQTtBQUFBLHVDQUExQjtBQUFBO0FBQUEsdUNBQVg7QUFBQTtBQUFBLHVDQURGLEVBRUUsWUFGRixFQUdHO0FBQUE7QUFBQSwrQ0FBNEIsYUFBNUI7QUFBQTtBQUFBLCtDQUFvQixhQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQUFzQixPQUF0QjtBQUFBO0FBQUEseUNBQStCO0FBQUE7QUFBQSw4REFBSztBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFMLEVBQXlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQXpCO0FBQUE7QUFBQSx1Q0FBL0I7QUFBQTtBQUFBLHVDQUhILEVBSUU7QUFBQTtBQUFBLCtDQUFXLGFBQVgsZUFBYSxDQUFiO0FBQUE7QUFBQSx1Q0FKRixFQUtHO0FBQUE7QUFBQSwrQ0FBb0IsYUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FBc0IsQ0FBdEI7QUFBQTtBQUFBLHVDQUxILENBMUdGLElBZ0dpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBakI7QUFBQSw0QkFoR0E7QUFBQSxJQWlIQTtBQUFBO0FBQUEsbTVCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHNDQWpIaEI7QUFBQSxjQWtIWTtBQUFBO0FBQUEsbUVBQVU7QUFBQTtBQUFBLHNFQUFRLEtBQVIsRUFBWSxXQUFaO0FBQUE7QUFBQSx1Q0FBVixFQUFpQyxPQUFqQztBQUFBO0FBQUEsdUNBbEhaO0FBQUEsZUFtSGE7QUFBQTtBQUFBLGtFQUFRLEdBQVIsRUFBVSxTQUFWO0FBQUE7QUFBQSx1Q0FuSGI7QUFBQSxjQW9IWTtBQUFBO0FBQUEsa0VBQVEsR0FBUixFQUFVLFNBQVY7QUFBQTtBQUFBLHVDQXBIWjtBQUFBLGlCQXFIZ0I7QUFBQTtBQUFBLCtDQUEyQixhQUEzQjtBQUFBO0FBQUEsK0NBQW1CLGFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXFCLE9BQXJCO0FBQUE7QUFBQSx5Q0FBOEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBOUI7QUFBQTtBQUFBLHVDQXJIaEI7QUFBQSxpQkFzSGU7QUFBQTtBQUFBLDhEQUFJLFlBQUosRUFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBaEI7QUFBQTtBQUFBLHVDQXRIZjtBQUFBLFVBdUhRO0FBQUE7QUFBQSw4REFBSSxDQUFKLEVBQU87QUFBQTtBQUFBLCtDQUF5QixhQUF6QjtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLFlBQWI7QUFBQTtBQUFBLHlDQUEyQixDQUEzQjtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBLHVDQXZIUjtBQUFBLGdCQXdIWTtBQUFBO0FBQUEsd0VBQWMsU0FBZCxFQUF1QjtBQUFBO0FBQUEsK0NBQWUsYUFBZjtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLENBQWI7QUFBQTtBQUFBLHlDQUFrQjtBQUFBO0FBQUEsK0NBQW1CLGFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXFCLENBQXJCO0FBQUE7QUFBQSx1Q0FBbEI7QUFBQTtBQUFBLHVDQUF2QixFQUFpRSxDQUFqRTtBQUFBO0FBQUEsdUNBeEhaO0FBQUEsaUJBeUhhO0FBQUE7QUFBQSx3RUFBYyxVQUFkLEVBQXVCLEtBQXZCLEVBQTRCO0FBQUE7QUFBQSwrQ0FBb0IsYUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FBc0IsT0FBdEI7QUFBQTtBQUFBLHVDQUE1QjtBQUFBO0FBQUEsdUNBekhiO0FBQUEsZ0JBMEhZO0FBQUE7QUFBQSx3RUFBYyxTQUFkLEVBQXVCO0FBQUE7QUFBQSwrQ0FBMkIsYUFBM0I7QUFBQTtBQUFBLCtDQUFJLGFBQUosUUFBTztBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFQO0FBQUE7QUFBQSx5Q0FBNkIsT0FBN0I7QUFBQTtBQUFBLHVDQUF2QixFQUE2RDtBQUFBO0FBQUEsK0NBQW9CLGFBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXNCLE9BQXRCO0FBQUE7QUFBQSx1Q0FBN0Q7QUFBQTtBQUFBLHVDQTFIWjtBQUFBO0FBQUEsU0EySEUsb0JBQ0U7QUFBQTtBQUFBLG9FQUFXO0FBQUE7QUFBQSwrREFBQztBQUFBO0FBQUEsbUVBQVMsV0FBVCxFQUFpQixZQUFqQjtBQUFBO0FBQUEsdUNBQUQsRUFBNEI7QUFBQTtBQUFBLCtEQUFDO0FBQUE7QUFBQSxtRUFBUyxXQUFULEVBQWlCLFdBQWpCO0FBQUE7QUFBQSx1Q0FBRCxFQUEyQjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFrQjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFtQjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFrQixLQUFsQjtBQUFBO0FBQUEsdUNBQW5CO0FBQUE7QUFBQSx1Q0FBbEI7QUFBQTtBQUFBLHVDQUEzQjtBQUFBO0FBQUEsdUNBQTVCO0FBQUE7QUFBQSx1Q0FBWDtBQUFBO0FBQUEsdUNBREYsRUFFRSxZQUZGLEVBR0c7QUFBQTtBQUFBLCtDQUE0QixhQUE1QjtBQUFBO0FBQUEsK0NBQW9CLGFBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXNCLE9BQXRCO0FBQUE7QUFBQSx5Q0FBK0I7QUFBQTtBQUFBLDhEQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUwsRUFBMEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBMUI7QUFBQTtBQUFBLHVDQUEvQjtBQUFBO0FBQUEsdUNBSEgsRUFJRTtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLENBQWI7QUFBQTtBQUFBLHVDQUpGLEVBS0c7QUFBQTtBQUFBLCtDQUFvQixhQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQUFzQixDQUF0QjtBQUFBO0FBQUEsdUNBTEgsQ0EzSEYsSUFpSGdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFoQjtBQUFBLDRCQWpIQTtBQUFBLElBa0lBO0FBQUE7QUFBQSx5SEFBYztBQUFBO0FBQUE7QUFBQTtBQUFBLHNDQUFrQixvQkFBVTtBQUFBO0FBQUEsc0VBQVEsS0FBUixFQUFZLFVBQVo7QUFBQTtBQUFBLHVDQUFWLEVBQWdDLEtBQWhDLENBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFkO0FBQUEsNEJBbElBO0FBQUEsSUFtSUE7QUFBQTtBQUFBLDJIQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0NBQWtCLG9CQUFVO0FBQUE7QUFBQSxzRUFBUSxLQUFSLEVBQVksWUFBWjtBQUFBO0FBQUEsdUNBQVYsRUFBa0MsS0FBbEMsQ0FBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQWQ7QUFBQSw0QkFuSUE7QUFBQSxJQXFJQTtBQUFBO0FBQUEsdWNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQ0FBVyw4QkFBZSxLQUFmLEVBQW1CLEVBQW5CLEVBQXdCO0FBQUE7QUFBQTtBQUFBLHNDQUFFO0FBQUE7QUFBQTtBQUFBLHNDQXJJOUM7QUFBQSxZQXNJVTtBQUFBO0FBQUEsK0NBQUUsYUFBRixNQUFJLEVBQUo7QUFBQTtBQUFBLHVDQXRJVjtBQUFBLFlBdUlVO0FBQUE7QUFBQSwrQ0FBRSxhQUFGLE1BQUksRUFBSjtBQUFBO0FBQUEsdUNBdklWO0FBQUE7QUFBQSxTQXdJRSxvQkFDRztBQUFBO0FBQUEsb0VBQVc7QUFBQTtBQUFBLCtEQUFDO0FBQUE7QUFBQSwrREFBTztBQUFBO0FBQUE7QUFBQTtBQUFBLG9FQUFJLENBQUo7QUFBQTtBQUFBLHlDQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0VBQUksQ0FBSjtBQUFBO0FBQUEseUNBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3RUFBUSxPQUFSO0FBQUE7QUFBQSx5Q0FBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSx5RUFBUyxPQUFUO0FBQUE7QUFBQSx5Q0FBa0IsS0FBbEI7QUFBQTtBQUFBLHVDQUFoQjtBQUFBO0FBQUEsdUNBQVI7QUFBQTtBQUFBLHVDQUFSO0FBQUE7QUFBQSx1Q0FBUDtBQUFBO0FBQUEsdUNBQUQsRUFBZ0U7QUFBQTtBQUFBLCtEQUFDO0FBQUE7QUFBQSwrREFBSyxLQUFMLEVBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSxpRkFBbUIsTUFBbkI7QUFBQTtBQUFBLHlDQUE0QjtBQUFBO0FBQUE7QUFBQTtBQUFBLDhFQUFjLFFBQWQ7QUFBQTtBQUFBLHlDQUF5QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG9GQUFvQixjQUFwQjtBQUFBO0FBQUEseUNBQXFDO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0VBQUs7QUFBQTtBQUFBLCtDQUFHLGFBQUgsS0FBSztBQUFBO0FBQUEsK0NBQUUsYUFBRixNQUFJLENBQUo7QUFBQTtBQUFBLHVDQUFMO0FBQUE7QUFBQSx1Q0FBTDtBQUFBO0FBQUEseUNBQWtCO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0VBQUs7QUFBQTtBQUFBLCtDQUFPLGFBQVAsV0FBUztBQUFBO0FBQUEsK0NBQUUsYUFBRixNQUFJLENBQUo7QUFBQTtBQUFBLHVDQUFUO0FBQUE7QUFBQSx1Q0FBTDtBQUFBO0FBQUEseUNBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsOEVBQWMsTUFBZDtBQUFBO0FBQUEseUNBQXFCLEtBQXJCO0FBQUE7QUFBQSx1Q0FBdEI7QUFBQTtBQUFBLHVDQUFsQjtBQUFBO0FBQUEsdUNBQXJDO0FBQUE7QUFBQSx1Q0FBekI7QUFBQTtBQUFBLHVDQUE1QjtBQUFBO0FBQUEsdUNBQVg7QUFBQTtBQUFBLHVDQUFELEVBQXNLLEtBQXRLO0FBQUE7QUFBQSx1Q0FBaEU7QUFBQTtBQUFBLHVDQUFYO0FBQUE7QUFBQSx1Q0FESCxFQUVFLE9BRkYsRUFHRSxPQUhGLEVBSUU7QUFBQTtBQUFBLCtDQUFNLGFBQU4sVUFBUSxDQUFSO0FBQUE7QUFBQSx1Q0FKRixFQUtFO0FBQUE7QUFBQSwrQ0FBTSxhQUFOLFVBQVEsQ0FBUjtBQUFBO0FBQUEsdUNBTEYsQ0F4SUYsSUFxSThDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQXhCLENBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVQ7QUFBQSw0QkFySUE7QUFBQTtBQUFBIiwiZmlsZSI6InBhcnNlQXN0LmpzIn0=
