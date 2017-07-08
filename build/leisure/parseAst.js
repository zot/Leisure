"use strict";
define([], function(){
  var L$context = Leisure_traceTopLevelStd({
    id: Leisure_traceContext++,
    traceCreatePartial: function(){return Leisure_traceCreatePartialStd;},
    traceCallPartial: function(){return Leisure_traceCallPartialStd;},
    debugType: "Std",
    source: "build/leisure/parseAst.lsr",
    externalMap: "build/leisure/parseAst.map",
    decls: ["lambda",37,9,null,"makeNode",1,null,"lambda",37,41,0,null,1,"f","lambda",39,8,null,"nodeSvg",1,"st","lambda",39,17,2,null,1,"svg","lambda",39,21,3,null,1,"width","lambda",39,27,4,null,1,"height","lambda",39,34,5,null,1,"rootX","lambda",39,40,6,null,1,"rootY","lambda",40,10,null,"nodeWidth",1,"st","lambda",40,19,8,null,1,"svg","lambda",40,23,9,null,1,"width","lambda",40,29,10,null,1,"height","lambda",40,36,11,null,1,"rootX","lambda",40,42,12,null,1,"rootY","lambda",41,11,null,"nodeHeight",1,"st","lambda",41,20,14,null,1,"svg","lambda",41,24,15,null,1,"width","lambda",41,30,16,null,1,"height","lambda",41,37,17,null,1,"rootX","lambda",41,43,18,null,1,"rootY","lambda",42,10,null,"nodeRootX",1,"st","lambda",42,19,20,null,1,"svg","lambda",42,23,21,null,1,"width","lambda",42,29,22,null,1,"height","lambda",42,36,23,null,1,"rootX","lambda",42,42,24,null,1,"rootY","lambda",43,10,null,"nodeRootY",1,"st","lambda",43,19,26,null,1,"svg","lambda",43,23,27,null,1,"width","lambda",43,29,28,null,1,"height","lambda",43,36,29,null,1,"rootX","lambda",43,42,30,null,1,"rootY","lambda",48,14,null,"nodeTranslate",1,null,"lambda",48,27,32,null,1,"svg","lambda",48,31,33,null,1,"width","lambda",48,37,34,null,1,"height","lambda",48,44,35,null,1,"rootX","lambda",48,50,36,null,1,"rootY","lazy",49,2,37,"lazy",52,2,37,"lazy",53,2,37,"lambda",55,9,null,"nodeLine",1,null,"lambda",55,21,41,null,1,"s1","lambda",55,24,42,null,1,"w1","lambda",55,27,43,null,1,"h1","lambda",55,30,44,null,1,"x1","lambda",55,33,45,null,1,"y1","lambda",55,42,46,null,1,"s2","lambda",55,45,47,null,1,"w2","lambda",55,48,48,null,1,"h2","lambda",55,51,49,null,1,"x2","lambda",55,54,50,null,1,"y2","lazy",56,9,51,"lazy",56,9,52,"lazy",56,19,52,"lazy",56,19,54,"lazy",56,29,54,"lazy",56,29,56,"lazy",56,39,56,"lazy",56,39,58,"lazy",56,49,58,"lazy",56,49,60,"lambda",58,19,null,"rangeContainsRange",1,null,"lazy",58,56,62,"lazy",58,79,62,"lambda",60,10,null,"highlight",1,"map","lazy",61,6,65,"lazy",63,4,65,"lazy",64,4,65,"lazy",65,6,68,"lazy",66,6,68,"lazy",67,8,70,"lambda",70,8,null,"treeFor",1,"ast","lambda",70,31,72,null,1,"ast","lambda",70,35,73,null,1,"map","lambda",72,12,null,"treeForWith",1,null,"lazy",72,35,75,"lambda",74,15,null,"wrappedTreeFor",1,"ast","lazy",75,12,77,"lambda",75,25,78,null,1,"ast","lambda",75,29,79,null,1,"map","lazy",76,7,77,"lazy",76,25,77,"lazy",76,25,82,"lazy",76,34,83,"lazy",76,44,84,"lazy",76,64,82,"lazy",76,64,86,"lazy",76,74,87,"lazy",76,84,88,"lambda",78,8,null,"nodeFor",1,null,"lazy",79,6,90,"lazy",81,4,90,"lazy",81,23,92,"lazy",81,29,93,"lambda",81,34,94,null,1,"v","lambda",81,36,95,null,1,"p","lazy",82,4,90,"lazy",83,6,97,"lazy",83,25,98,"lazy",83,31,99,"lambda",83,36,100,null,1,"n","lambda",83,38,101,null,1,"p","lazy",84,6,97,"lazy",85,8,103,"lambda",85,14,104,null,1,"v","lambda",85,16,105,null,1,"b","lambda",85,18,106,null,1,"p","lazy",86,8,103,"lazy",87,10,108,"lambda",87,16,109,null,1,"f","lambda",87,18,110,null,1,"a","lazy",88,10,108,"lazy",90,12,112,"lambda",90,18,113,null,1,"n","lambda",90,20,114,null,1,"d","lambda",90,22,115,null,1,"b","lazy",91,12,112,"lazy",91,28,117,"lazy",93,13,null,"lazy",93,32,null,"lazy",93,32,120,"lazy",93,51,120,"lazy",93,51,122,"lazy",93,67,122,"lazy",93,67,124,"lazy",93,76,124,"lazy",93,76,126,"lazy",94,15,null,"lazy",94,34,null,"lazy",94,34,129,"lazy",94,53,129,"lazy",94,53,131,"lazy",94,69,131,"lazy",94,69,133,"lazy",94,78,133,"lazy",94,78,135,"lazy",95,14,null,"lazy",95,33,null,"lazy",95,33,138,"lazy",95,52,138,"lazy",95,52,140,"lazy",95,68,140,"lazy",95,68,142,"lazy",95,77,142,"lazy",95,77,144,"lambda",97,17,null,"createLambdaNode",1,null,"lazy",98,12,146,"lazy",98,22,147,"lazy",99,11,146,"lazy",99,21,149,"lazy",100,13,146,"lazy",101,16,146,"lazy",101,16,152,"lazy",101,16,153,"lazy",101,45,152,"lazy",102,15,146,"lazy",102,31,156,"lazy",103,8,146,"lazy",103,15,158,"lazy",103,15,159,"lazy",104,12,146,"lazy",104,35,161,"lazy",104,35,162,"lazy",104,53,162,"lazy",104,53,164,"lazy",105,11,146,"lazy",105,37,166,"lazy",105,37,167,"lazy",106,13,146,"lazy",106,37,169,"lazy",106,37,170,"lazy",106,44,171,"lazy",106,73,169,"lazy",106,73,173,"lazy",108,4,146,"lazy",108,15,175,"lazy",108,16,176,"lazy",108,41,176,"lazy",108,42,178,"lazy",108,69,178,"lazy",108,70,180,"lazy",108,86,180,"lazy",108,87,182,"lazy",108,105,182,"lazy",108,106,184,"lazy",110,5,146,"lazy",110,5,186,"lazy",110,5,187,"lazy",110,36,186,"lazy",110,41,189,"lazy",110,61,189,"lazy",111,4,146,"lazy",112,5,146,"lazy",112,5,193,"lambda",114,16,null,"createApplyNode",1,null,"lazy",115,12,195,"lazy",115,22,196,"lazy",116,13,195,"lazy",117,12,195,"lazy",118,16,195,"lazy",118,16,200,"lazy",118,16,201,"lazy",118,46,200,"lazy",119,15,195,"lazy",119,31,204,"lazy",120,8,195,"lazy",120,15,206,"lazy",120,15,207,"lazy",121,12,195,"lazy",121,35,209,"lazy",121,35,210,"lazy",121,53,210,"lazy",121,53,212,"lazy",122,13,195,"lazy",122,41,214,"lazy",122,41,215,"lazy",123,12,195,"lazy",123,35,217,"lazy",123,35,218,"lazy",123,42,219,"lazy",123,73,217,"lazy",123,73,221,"lazy",125,4,195,"lazy",125,15,223,"lazy",125,16,224,"lazy",125,43,224,"lazy",125,44,226,"lazy",125,70,226,"lazy",125,71,228,"lazy",125,88,228,"lazy",125,89,230,"lazy",125,107,230,"lazy",125,108,232,"lazy",127,5,195,"lazy",127,5,234,"lazy",127,5,235,"lazy",127,36,234,"lazy",127,41,237,"lazy",127,62,237,"lazy",128,4,195,"lazy",129,5,195,"lazy",129,5,241,"lambda",131,14,null,"createRefNode",1,null,"lazy",131,42,243,"lambda",132,14,null,"createLitNode",1,null,"lazy",132,42,245,"lambda",134,9,null,"textNode",1,null,"lambda",134,44,247,null,1,"w","lambda",134,46,248,null,1,"h","lazy",135,10,249,"lazy",136,10,249,"lazy",138,5,249,"lazy",138,16,252,"lazy",138,17,253,"lazy",138,24,254,"lazy",138,24,255,"lazy",138,32,255,"lazy",138,32,257,"lazy",138,40,257,"lazy",138,40,259,"lazy",138,56,259,"lazy",138,56,261,"lazy",138,80,253,"lazy",138,81,263,"lazy",138,92,264,"lazy",138,92,265,"lazy",138,120,265,"lazy",138,120,267,"lazy",138,145,267,"lazy",138,145,269,"lazy",138,182,269,"lazy",138,182,271,"lazy",138,187,272,"lazy",138,192,273,"lazy",138,200,271,"lazy",138,200,275,"lazy",138,205,276,"lazy",138,214,277,"lazy",138,222,275,"lazy",138,222,279,"lazy",141,4,249,"lazy",142,4,249]
  });
  var L$FUNC_0 = {context: L$context, id: 1, length: 1};
  var L$FUNC_1 = {context: L$context, id: 0, length: 5};
  var L$FUNC_2 = {context: L$context, id: 7, length: 1};
  var L$FUNC_3 = {context: L$context, id: 6, length: 1};
  var L$FUNC_4 = {context: L$context, id: 5, length: 1};
  var L$FUNC_5 = {context: L$context, id: 4, length: 1};
  var L$FUNC_6 = {context: L$context, id: 3, length: 1};
  var L$FUNC_7 = {context: L$context, id: 2, length: 1};
  var L$FUNC_8 = {context: L$context, id: 13, length: 1};
  var L$FUNC_9 = {context: L$context, id: 12, length: 1};
  var L$FUNC_10 = {context: L$context, id: 11, length: 1};
  var L$FUNC_11 = {context: L$context, id: 10, length: 1};
  var L$FUNC_12 = {context: L$context, id: 9, length: 1};
  var L$FUNC_13 = {context: L$context, id: 8, length: 1};
  var L$FUNC_14 = {context: L$context, id: 19, length: 1};
  var L$FUNC_15 = {context: L$context, id: 18, length: 1};
  var L$FUNC_16 = {context: L$context, id: 17, length: 1};
  var L$FUNC_17 = {context: L$context, id: 16, length: 1};
  var L$FUNC_18 = {context: L$context, id: 15, length: 1};
  var L$FUNC_19 = {context: L$context, id: 14, length: 1};
  var L$FUNC_20 = {context: L$context, id: 25, length: 1};
  var L$FUNC_21 = {context: L$context, id: 24, length: 1};
  var L$FUNC_22 = {context: L$context, id: 23, length: 1};
  var L$FUNC_23 = {context: L$context, id: 22, length: 1};
  var L$FUNC_24 = {context: L$context, id: 21, length: 1};
  var L$FUNC_25 = {context: L$context, id: 20, length: 1};
  var L$FUNC_26 = {context: L$context, id: 31, length: 1};
  var L$FUNC_27 = {context: L$context, id: 30, length: 1};
  var L$FUNC_28 = {context: L$context, id: 29, length: 1};
  var L$FUNC_29 = {context: L$context, id: 28, length: 1};
  var L$FUNC_30 = {context: L$context, id: 27, length: 1};
  var L$FUNC_31 = {context: L$context, id: 26, length: 1};
  var L$FUNC_32 = {context: L$context, id: 37, length: 1};
  var L$FUNC_33 = {context: L$context, id: 36, length: 1};
  var L$FUNC_34 = {context: L$context, id: 35, length: 1};
  var L$FUNC_35 = {context: L$context, id: 34, length: 1};
  var L$FUNC_36 = {context: L$context, id: 33, length: 1};
  var L$FUNC_37 = {context: L$context, id: 32, length: 3};
  var L$FUNC_38 = {context: L$context, id: 51, length: 1};
  var L$FUNC_39 = {context: L$context, id: 50, length: 1};
  var L$FUNC_40 = {context: L$context, id: 49, length: 1};
  var L$FUNC_41 = {context: L$context, id: 48, length: 1};
  var L$FUNC_42 = {context: L$context, id: 47, length: 1};
  var L$FUNC_43 = {context: L$context, id: 46, length: 1};
  var L$FUNC_44 = {context: L$context, id: 45, length: 1};
  var L$FUNC_45 = {context: L$context, id: 44, length: 1};
  var L$FUNC_46 = {context: L$context, id: 43, length: 1};
  var L$FUNC_47 = {context: L$context, id: 42, length: 1};
  var L$FUNC_48 = {context: L$context, id: 41, length: 2};
  var L$FUNC_49 = {context: L$context, id: 62, length: 4};
  var L$FUNC_50 = {context: L$context, id: 65, length: 1};
  var L$FUNC_51 = {context: L$context, id: 74, length: 1};
  var L$FUNC_52 = {context: L$context, id: 73, length: 1};
  var L$FUNC_53 = {context: L$context, id: 72, length: 1};
  var L$FUNC_54 = {context: L$context, id: 75, length: 2};
  var L$FUNC_55 = {context: L$context, id: 80, length: 1};
  var L$FUNC_56 = {context: L$context, id: 79, length: 1};
  var L$FUNC_57 = {context: L$context, id: 77, length: 1};
  var L$FUNC_58 = {context: L$context, id: 96, length: 1};
  var L$FUNC_59 = {context: L$context, id: 95, length: 1};
  var L$FUNC_60 = {context: L$context, id: 102, length: 1};
  var L$FUNC_61 = {context: L$context, id: 101, length: 1};
  var L$FUNC_62 = {context: L$context, id: 107, length: 1};
  var L$FUNC_63 = {context: L$context, id: 106, length: 1};
  var L$FUNC_64 = {context: L$context, id: 105, length: 1};
  var L$FUNC_65 = {context: L$context, id: 111, length: 1};
  var L$FUNC_66 = {context: L$context, id: 110, length: 1};
  var L$FUNC_67 = {context: L$context, id: 116, length: 1};
  var L$FUNC_68 = {context: L$context, id: 115, length: 1};
  var L$FUNC_69 = {context: L$context, id: 114, length: 1};
  var L$FUNC_70 = {context: L$context, id: 90, length: 2};
  var L$FUNC_71 = {context: L$context, id: 146, length: 4};
  var L$FUNC_72 = {context: L$context, id: 195, length: 4};
  var L$FUNC_73 = {context: L$context, id: 243, length: 3};
  var L$FUNC_74 = {context: L$context, id: 245, length: 3};
  var L$FUNC_75 = {context: L$context, id: 249, length: 1};
  var L$FUNC_76 = {context: L$context, id: 248, length: 1};
  var L$FUNC_77 = {context: L$context, id: 247, length: 2};
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
  L$F.L$info = L$FUNC_0;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance), 'makeNode')))
);
};;
  L$F.L$info = L$FUNC_1;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_2;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_3;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_4;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_5;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_6;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_7;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_8;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_9;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_10;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_11;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_12;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_13;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_14;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_15;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_16;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_17;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_18;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_19;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_20;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_21;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_22;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_23;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_24;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_25;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_26;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_27;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_28;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_29;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_30;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_31;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_32;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_33;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_34;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_35;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_36;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.L$info = L$FUNC_37;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_38;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_39;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_40;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_41;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_42;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_43;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_44;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_45;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_46;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_47;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.L$info = L$FUNC_48;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_49;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_50;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_51;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_52;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_53;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_54;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_55;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_56;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_57;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_58;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_59;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_60;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_61;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_62;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_63;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_64;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_65;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_66;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_67;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_68;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_69;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  L$F.L$info = L$FUNC_70;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("redStyle", 0, "redStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#fcc'] ['rx'|8] ['ry'|8]]", function(){
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 119, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 127, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 121, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 127, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 123, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "#fcc"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 127, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 125, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("rx", 8));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 127, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 127, function(){
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
})(++Leisure_traceInstance, L$instance));
});
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("greenStyle", 0, "greenStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#cfc'] ['rx'|8] ['ry'|8]]", function(){
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 128, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 136, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 130, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 136, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 132, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "#cfc"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 136, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 134, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("rx", 8));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 136, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 136, function(){
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
})(++Leisure_traceInstance, L$instance));
});
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("blueStyle", 0, "blueStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#ccf'] ['rx'|8] ['ry'|8]]", function(){
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 137, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 145, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 139, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 145, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 141, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "#ccf"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 145, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 143, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("rx", 8));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 145, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 145, function(){
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
})(++Leisure_traceInstance, L$instance));
});
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createLambdaNode", 4, "createLambdaNode ast v b mapFunc = do\n  rootBox = textNode (mapFunc ast greenStyle) 'lambda'\n  varBox = textNode (mapFunc ast greenStyle) v\n  bodyTree = nodeFor b mapFunc\n  childWidth = (nodeWidth varBox) + space + (nodeWidth bodyTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  varBox = nodeTranslate varBox pad (nodeHeight rootBox) + space\n  bodyTree = nodeTranslate bodyTree (pad + (nodeWidth varBox) + space) ((nodeHeight rootBox) + space)\n  log 3 makeNode\n    svgConcat [(nodeLine rootBox varBox) (nodeLine rootBox bodyTree) (nodeSvg varBox) (nodeSvg bodyTree) (nodeSvg rootBox)]\n    totalWidth\n    (nodeHeight rootBox) + space + (max (nodeHeight varBox) (nodeHeight bodyTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_v, L_b, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_v, L_b, L_mapFunc),
  Leisure_traceReturnStd(L$instance, ((function(){  var L_rootBox, L_varBox, L_bodyTree, L_childWidth, L_totalWidth, L_pad, L_rootBox_0, L_varBox_1, L_bodyTree_2;
  L_rootBox = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_greenStyle));
  });
})(++Leisure_traceInstance, L$instance), "lambda"));
  });
})(++Leisure_traceInstance, L$instance);
  L_varBox = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 150, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 150, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_greenStyle));
  });
})(++Leisure_traceInstance, L$instance), L_v));
  });
})(++Leisure_traceInstance, L$instance);
  L_bodyTree = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 151, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_b, L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance);
  L_childWidth = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 155, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 154, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 154, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_varBox));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 155, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_bodyTree));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_totalWidth = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 157, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)(L_childWidth, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 157, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_rootBox));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_pad = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 160, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)(0, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 160, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 160, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$_)(L_totalWidth, L_childWidth));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_rootBox_0 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 165, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_rootBox, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 165, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$_)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 163, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_totalWidth, 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 165, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 165, function(){
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
  return Leisure_traceLazyValueStd(L$instance, L$context, 168, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_varBox, L_pad, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 168, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 168, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_bodyTree_2 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 174, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_bodyTree, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 172, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 172, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_pad, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 172, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_varBox_1));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 174, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 174, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_log)(3, L_makeNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 185, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgConcat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 185, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 177, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeLine)(L_rootBox_0, L_varBox_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 185, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 179, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeLine)(L_rootBox_0, L_bodyTree_2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 185, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 181, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_varBox_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 185, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 183, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_bodyTree_2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 185, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 185, function(){
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
  return Leisure_traceLazyValueStd(L$instance, L$context, 191, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 188, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 191, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 190, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_varBox_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 191, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_bodyTree_2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 192, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_totalWidth, 2));
  });
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 194, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 194, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.L$info = L$FUNC_71;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  return Leisure_traceLazyValueStd(L$instance, L$context, 197, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 197, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_blueStyle));
  });
})(++Leisure_traceInstance, L$instance), "apply"));
  });
})(++Leisure_traceInstance, L$instance);
  L_funcTree = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 198, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_f, L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance);
  L_argTree = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 199, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_a, L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance);
  L_childWidth = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 203, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 202, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 202, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_argTree));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 203, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_funcTree));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_totalWidth = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 205, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)(L_childWidth, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 205, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_rootBox));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_pad = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 208, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)(0, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 208, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 208, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$_)(L_totalWidth, L_childWidth));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_rootBox_0 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 213, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_rootBox, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 213, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$_)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 211, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_totalWidth, 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 213, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 213, function(){
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
  return Leisure_traceLazyValueStd(L$instance, L$context, 216, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_funcTree, L_pad, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 216, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 216, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);
  L_argTree_2 = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 222, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeTranslate)(L_argTree, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 220, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 220, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_pad, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 220, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeWidth)(L_funcTree_1));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 222, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 222, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_makeNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 233, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgConcat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 233, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 225, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeLine)(L_rootBox_0, L_funcTree_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 233, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 227, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeLine)(L_rootBox_0, L_argTree_2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 233, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 229, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 233, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 231, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeSvg)(L_funcTree_1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 233, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 233, function(){
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
  return Leisure_traceLazyValueStd(L$instance, L$context, 239, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 236, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), L_space));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 239, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_max)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 238, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_argTree_2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 239, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_funcTree_1));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 240, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_totalWidth, 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 242, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 242, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeHeight)(L_rootBox_0));
  });
})(++Leisure_traceInstance, L$instance), 2));
  });
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.L$info = L$FUNC_72;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createRefNode", 3, "createRefNode ast ref mapFunc = textNode (mapFunc ast redStyle) ref", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_ref, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_ref, L_mapFunc),
  Leisure_traceReturnStd(L$instance, (resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 244, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_redStyle));
  });
})(++Leisure_traceInstance, L$instance), L_ref)))
);
};;
  L$F.L$info = L$FUNC_73;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createLitNode", 3, "createLitNode ast lit mapFunc = textNode (mapFunc ast greenStyle) lit", lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_lit, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$instance, L_ast, L_lit, L_mapFunc),
  Leisure_traceReturnStd(L$instance, (resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 246, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_greenStyle));
  });
})(++Leisure_traceInstance, L$instance), L_lit)))
);
};;
  L$F.L$info = L$FUNC_74;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
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
  return Leisure_traceLazyValueStd(L$instance, L$context, 250, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_w, 24));
  });
})(++Leisure_traceInstance, L$instance);
  L_nodeH = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 251, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_h, 14));
  });
})(++Leisure_traceInstance, L$instance);

  return resolve(L_makeNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgConcat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 262, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_rect)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 262, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 256, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 262, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 258, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 262, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 260, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("width", L_nodeW));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 262, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 262, function(){
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
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_text)(L_txt, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 266, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("pointer-events", "none"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 268, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("text-anchor", "middle"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 270, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("dominant-baseline", "mathematical"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 274, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 274, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(14, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 274, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_w, 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 278, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 278, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$o)(L_border, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 278, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_h, 2));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 280, function(){
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
  return Leisure_traceLazyValueStd(L$instance, L$context, 281, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_nodeW, 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 282, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_$f)(L_nodeH, 2));
  });
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.L$info = L$FUNC_75;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_76;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.L$info = L$FUNC_77;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)}
  ]);
});
//# sourceMappingURL=data:application/json;base64,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
