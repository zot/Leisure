"use strict";
define([], function(){
  var L$context = Leisure_traceTopLevelStd({
    id: Leisure_traceContext++,
    traceCreatePartial: function(){return Leisure_traceCreatePartialStd;},
    traceCallPartial: function(){return Leisure_traceCallPartialStd;},
    debugType: "Std",
    source: "build/leisure/svg.lsr",
    externalMap: "build/leisure/svg.map",
    decls: ["lambda",6,20,null,"assocGetWithDefault",3,"key","defaultValue","map","lambda",8,13,null,"insertFields",1,"map","lazy",9,9,1,"lazy",9,9,2,"lazy",9,10,3,"lazy",9,17,4,"lazy",9,28,3,"lazy",9,29,6,"lazy",9,43,7,"lambda",11,12,null,"svgTemplate",2,"attrs","contents","lazy",11,41,9,"lazy",11,41,10,"lazy",11,98,11,"lazy",11,104,12,"lazy",11,108,13,"lazy",11,117,14,"lambda",13,4,null,"svg",2,"o","map","lazy",13,31,16,"lazy",13,31,17,"lazy",13,48,18,"lazy",13,49,19,"lazy",13,86,19,"lazy",13,102,21,"lazy",13,103,22,"lazy",13,141,22,"lazy",13,149,16,"lambda",15,8,null,"svgFile",1,"map","lazy",15,26,26,"lazy",15,26,27,"lazy",15,86,28,"lazy",15,87,29,"lazy",15,105,29,"lambda",17,6,null,"field",1,"cell","lambda",17,19,32,null,1,"key","lambda",17,23,33,null,1,"value","lazy",17,38,34,"lazy",17,42,35,"lazy",17,47,36,"lazy",17,53,37,"lazy",19,20,null,"lazy",19,28,null,"lazy",19,28,40,"lazy",19,36,40,"lazy",19,36,42,"lazy",19,43,42,"lazy",19,43,44,"lazy",19,60,44,"lazy",19,60,46,"lazy",19,77,46,"lazy",19,77,48,"lazy",20,18,null,"lazy",20,24,null,"lazy",20,24,51,"lazy",20,30,51,"lazy",20,30,53,"lazy",20,41,53,"lazy",20,41,55,"lazy",20,53,55,"lazy",20,53,57,"lazy",20,70,57,"lazy",20,70,59,"lazy",20,87,59,"lazy",20,87,61,"lazy",21,18,null,"lazy",21,25,null,"lazy",21,25,64,"lazy",21,32,64,"lazy",21,32,66,"lazy",21,40,66,"lazy",21,40,68,"lazy",21,48,68,"lazy",21,48,70,"lazy",21,65,70,"lazy",21,65,72,"lazy",22,21,null,"lazy",22,29,null,"lazy",22,29,75,"lazy",22,37,75,"lazy",22,37,77,"lazy",22,45,77,"lazy",22,45,79,"lazy",22,53,79,"lazy",22,53,81,"lazy",22,70,81,"lazy",22,70,83,"lazy",22,87,83,"lazy",22,87,85,"lazy",23,18,null,"lazy",23,24,null,"lazy",23,24,88,"lazy",23,31,88,"lazy",23,31,90,"lazy",23,48,90,"lazy",23,48,92,"lazy",23,65,92,"lazy",23,65,94,"lazy",24,21,null,"lazy",24,112,null,"lazy",24,112,97,"lazy",24,129,97,"lazy",24,129,99,"lazy",24,146,99,"lazy",24,146,101,"lambda",26,8,null,"svgNode",1,"contents","lambda",26,20,103,null,1,"f","lambda",28,9,null,"svgNodes",1,"nodeList","lambda",28,31,105,null,1,"h","lambda",28,33,106,null,1,"t","lambda",28,35,107,null,1,"D","lazy",28,45,108,"lazy",28,52,108,"lambda",30,10,null,"svgConcat",1,"nodeList","lazy",30,30,111,"lazy",30,38,112,"lambda",32,11,null,"svgElement",2,"name","map","lazy",32,37,114,"lazy",32,37,115,"lazy",32,41,116,"lazy",32,46,117,"lazy",32,50,118,"lazy",32,51,119,"lazy",32,69,119,"lambda",36,11,null,"svgPresent",1,"content","lambda",36,41,122,null,1,"x","lambda",36,43,123,null,1,"y","lambda",36,45,124,null,1,"w","lambda",36,47,125,null,1,"h","lazy",37,21,126,"lazy",37,21,127,"lazy",37,31,128,"lazy",37,33,129,"lazy",37,46,130,"lazy",37,48,131,"lazy",37,62,132,"lazy",37,64,133,"lazy",37,68,134,"lazy",37,70,135,"lazy",37,74,136,"lazy",37,76,137,"lazy",37,80,138,"lazy",37,82,139,"lambda",41,7,null,"circle",1,"map","lazy",41,35,141,"lambda",42,5,null,"rect",1,"map","lazy",42,31,143,"lambda",43,8,null,"ellipse",1,"map","lazy",43,37,145,"lambda",44,5,null,"line",1,"map","lazy",44,31,147,"lambda",45,5,null,"text",2,"t","map","lazy",45,28,149,"lazy",45,28,150,"lazy",45,37,151,"lazy",45,38,152,"lazy",45,53,153,"lazy",45,85,152,"lazy",45,89,155,"lazy",45,91,156,"lazy",45,115,156,"lambda",46,8,null,"polygon",1,"map","lazy",46,37,159,"lambda",48,6,null,"group",1,"elem","lazy",48,28,161,"lazy",48,28,162,"lazy",48,34,163,"lazy",48,35,164,"lazy",48,44,164,"lambda",49,10,null,"translate",3,"elem","x","y","lazy",49,36,167,"lazy",49,36,168,"lazy",49,63,169,"lazy",49,65,170,"lazy",49,69,171,"lazy",49,71,172,"lazy",49,77,173,"lazy",49,78,174,"lazy",49,87,174,"lambda",50,7,null,"rotate",2,"elem","r","lazy",50,31,177,"lazy",50,31,178,"lazy",50,55,179,"lazy",50,57,180,"lazy",50,63,181,"lazy",50,64,182,"lazy",50,73,182]
  });
  var L$FUNC_0 = {name: "assocGetWithDefault", args: ["key","defaultValue","map"], id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_1 = {name: undefined, args: undefined, id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_2 = {name: "assocGetWithDefault", args: ["key","defaultValue","map"], id: 0, length: 3, parent: null, context: L$context};
  var L$FUNC_3 = {name: undefined, args: undefined, id: 0, length: 3, parent: null, context: L$context};
  var L$FUNC_4 = {name: "insertFields", args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_5 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_6 = {name: "insertFields", args: ["map"], id: 1, length: 1, parent: null, context: L$context};
  var L$FUNC_7 = {name: undefined, args: undefined, id: 1, length: 1, parent: null, context: L$context};
  var L$FUNC_8 = {name: "svgTemplate", args: ["attrs","contents"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_9 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_10 = {name: "svgTemplate", args: ["attrs","contents"], id: 9, length: 2, parent: null, context: L$context};
  var L$FUNC_11 = {name: undefined, args: undefined, id: 9, length: 2, parent: null, context: L$context};
  var L$FUNC_12 = {name: "svg", args: ["o","map"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_13 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_14 = {name: "svg", args: ["o","map"], id: 16, length: 2, parent: null, context: L$context};
  var L$FUNC_15 = {name: undefined, args: undefined, id: 16, length: 2, parent: null, context: L$context};
  var L$FUNC_16 = {name: "svgFile", args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_17 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_18 = {name: "svgFile", args: ["map"], id: 26, length: 1, parent: null, context: L$context};
  var L$FUNC_19 = {name: undefined, args: undefined, id: 26, length: 1, parent: null, context: L$context};
  var L$FUNC_20 = {name: "field", args: ["cell"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_21 = {name: null, args: ["key"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_22 = {name: null, args: ["value"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_23 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_24 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_25 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_26 = {name: "field", args: ["cell"], id: 32, length: 1, parent: null, context: L$context};
  var L$FUNC_27 = {name: null, args: ["key"], id: 33, length: 1, parent: L$FUNC_26, context: L$context};
  var L$FUNC_28 = {name: null, args: ["value"], id: 34, length: 1, parent: L$FUNC_27, context: L$context};
  var L$FUNC_29 = {name: undefined, args: undefined, id: 34, length: 1, parent: null, context: L$context};
  var L$FUNC_30 = {name: undefined, args: undefined, id: 33, length: 1, parent: null, context: L$context};
  var L$FUNC_31 = {name: undefined, args: undefined, id: 32, length: 1, parent: null, context: L$context};
  var L$FUNC_32 = {name: "svgNode", args: ["contents"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_33 = {name: null, args: ["f"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_34 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_35 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_36 = {name: "svgNode", args: ["contents"], id: 103, length: 1, parent: null, context: L$context};
  var L$FUNC_37 = {name: null, args: ["f"], id: 104, length: 1, parent: L$FUNC_36, context: L$context};
  var L$FUNC_38 = {name: undefined, args: undefined, id: 104, length: 1, parent: null, context: L$context};
  var L$FUNC_39 = {name: undefined, args: undefined, id: 103, length: 1, parent: null, context: L$context};
  var L$FUNC_40 = {name: "svgNodes", args: ["nodeList"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_41 = {name: null, args: ["h"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_42 = {name: null, args: ["t"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_43 = {name: null, args: ["D"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_44 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_45 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_46 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_47 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_48 = {name: "svgNodes", args: ["nodeList"], id: 105, length: 1, parent: null, context: L$context};
  var L$FUNC_49 = {name: null, args: ["h"], id: 106, length: 1, parent: L$FUNC_48, context: L$context};
  var L$FUNC_50 = {name: null, args: ["t"], id: 107, length: 1, parent: L$FUNC_49, context: L$context};
  var L$FUNC_51 = {name: null, args: ["D"], id: 108, length: 1, parent: L$FUNC_50, context: L$context};
  var L$FUNC_52 = {name: undefined, args: undefined, id: 108, length: 1, parent: null, context: L$context};
  var L$FUNC_53 = {name: undefined, args: undefined, id: 107, length: 1, parent: null, context: L$context};
  var L$FUNC_54 = {name: undefined, args: undefined, id: 106, length: 1, parent: null, context: L$context};
  var L$FUNC_55 = {name: undefined, args: undefined, id: 105, length: 1, parent: null, context: L$context};
  var L$FUNC_56 = {name: "svgConcat", args: ["nodeList"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_57 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_58 = {name: "svgConcat", args: ["nodeList"], id: 111, length: 1, parent: null, context: L$context};
  var L$FUNC_59 = {name: undefined, args: undefined, id: 111, length: 1, parent: null, context: L$context};
  var L$FUNC_60 = {name: "svgElement", args: ["name","map"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_61 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_62 = {name: "svgElement", args: ["name","map"], id: 114, length: 2, parent: null, context: L$context};
  var L$FUNC_63 = {name: undefined, args: undefined, id: 114, length: 2, parent: null, context: L$context};
  var L$FUNC_64 = {name: "svgPresent", args: ["content"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_65 = {name: null, args: ["x"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_66 = {name: null, args: ["y"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_67 = {name: null, args: ["w"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_68 = {name: null, args: ["h"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_69 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_70 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_71 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_72 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_73 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_74 = {name: "svgPresent", args: ["content"], id: 122, length: 1, parent: null, context: L$context};
  var L$FUNC_75 = {name: null, args: ["x"], id: 123, length: 1, parent: L$FUNC_74, context: L$context};
  var L$FUNC_76 = {name: null, args: ["y"], id: 124, length: 1, parent: L$FUNC_75, context: L$context};
  var L$FUNC_77 = {name: null, args: ["w"], id: 125, length: 1, parent: L$FUNC_76, context: L$context};
  var L$FUNC_78 = {name: null, args: ["h"], id: 126, length: 1, parent: L$FUNC_77, context: L$context};
  var L$FUNC_79 = {name: undefined, args: undefined, id: 126, length: 1, parent: null, context: L$context};
  var L$FUNC_80 = {name: undefined, args: undefined, id: 125, length: 1, parent: null, context: L$context};
  var L$FUNC_81 = {name: undefined, args: undefined, id: 124, length: 1, parent: null, context: L$context};
  var L$FUNC_82 = {name: undefined, args: undefined, id: 123, length: 1, parent: null, context: L$context};
  var L$FUNC_83 = {name: undefined, args: undefined, id: 122, length: 1, parent: null, context: L$context};
  var L$FUNC_84 = {name: "presentHtml.svgNode", args: ["obj"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_85 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_86 = {name: null, args: ["_"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_87 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_88 = {name: "circle", args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_89 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_90 = {name: "circle", args: ["map"], id: 141, length: 1, parent: null, context: L$context};
  var L$FUNC_91 = {name: undefined, args: undefined, id: 141, length: 1, parent: null, context: L$context};
  var L$FUNC_92 = {name: "rect", args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_93 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_94 = {name: "rect", args: ["map"], id: 143, length: 1, parent: null, context: L$context};
  var L$FUNC_95 = {name: undefined, args: undefined, id: 143, length: 1, parent: null, context: L$context};
  var L$FUNC_96 = {name: "ellipse", args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_97 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_98 = {name: "ellipse", args: ["map"], id: 145, length: 1, parent: null, context: L$context};
  var L$FUNC_99 = {name: undefined, args: undefined, id: 145, length: 1, parent: null, context: L$context};
  var L$FUNC_100 = {name: "line", args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_101 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_102 = {name: "line", args: ["map"], id: 147, length: 1, parent: null, context: L$context};
  var L$FUNC_103 = {name: undefined, args: undefined, id: 147, length: 1, parent: null, context: L$context};
  var L$FUNC_104 = {name: "text", args: ["t","map"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_105 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_106 = {name: "text", args: ["t","map"], id: 149, length: 2, parent: null, context: L$context};
  var L$FUNC_107 = {name: undefined, args: undefined, id: 149, length: 2, parent: null, context: L$context};
  var L$FUNC_108 = {name: "polygon", args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_109 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_110 = {name: "polygon", args: ["map"], id: 159, length: 1, parent: null, context: L$context};
  var L$FUNC_111 = {name: undefined, args: undefined, id: 159, length: 1, parent: null, context: L$context};
  var L$FUNC_112 = {name: "group", args: ["elem"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_113 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_114 = {name: "group", args: ["elem"], id: 161, length: 1, parent: null, context: L$context};
  var L$FUNC_115 = {name: undefined, args: undefined, id: 161, length: 1, parent: null, context: L$context};
  var L$FUNC_116 = {name: "translate", args: ["elem","x","y"], id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_117 = {name: undefined, args: undefined, id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_118 = {name: "translate", args: ["elem","x","y"], id: 167, length: 3, parent: null, context: L$context};
  var L$FUNC_119 = {name: undefined, args: undefined, id: 167, length: 3, parent: null, context: L$context};
  var L$FUNC_120 = {name: "rotate", args: ["elem","r"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_121 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_122 = {name: "rotate", args: ["elem","r"], id: 177, length: 2, parent: null, context: L$context};
  var L$FUNC_123 = {name: undefined, args: undefined, id: 177, length: 2, parent: null, context: L$context};
  return L_runMonads([
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("assocGetWithDefault", 3, "assocGetWithDefault key defaultValue map = assoc key map id defaultValue", lazy((function(){
  var L$F = function(L_key, L_defaultValue, L_map) {
  return L_checkPartial(L$F, arguments) || resolve(L_assoc)(L_key, L_map)(L_id)(L_defaultValue);
};;
  L$F.L$info = L$FUNC_1;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_key, L_defaultValue, L_map) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_assoc)(L_key, L_map)(L_id)(L_defaultValue)))
);
};;
  L$F.L$info = L$FUNC_3;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_5;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_isNil)(L_map)("")((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 8, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 8, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 5, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_field)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 5, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_head)(L_map));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 8, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 8, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_insertFields)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 8, function(){
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
  L$F.L$info = L$FUNC_7;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_9;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_attrs, L_contents) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_html)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 15, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 15, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 15, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_attrs, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 15, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(">", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 15, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_contents, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 15, function(){
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
  L$F.L$info = L$FUNC_11;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_13;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_o, L_map) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgTemplate)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 24, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 24, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("style=\"width: ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 24, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 20, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_assocGetWithDefault)("width", 100, L_map));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 24, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("px; height: ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 24, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 23, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_assocGetWithDefault)("height", 100, L_map));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 24, function(){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 25, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_o)(L_id));
  });
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.L$info = L$FUNC_15;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_17;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_html)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 31, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 31, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<object xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 31, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 30, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_insertFields)(L_map));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 31, function(){
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
  L$F.L$info = L$FUNC_19;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_23;
  return L$F;
})();};
  L$F.L$info = L$FUNC_24;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_25;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_cell){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_cell)(lazy((function(L$instance, L$parent){
  var L$F = function(L_key){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_value){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 38, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_key, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 38, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("=\"", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 38, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_value, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 38, function(){
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
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 39, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("cx", 50));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 49, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 41, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("cy", 50));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 49, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 43, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("r", 40));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 49, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 45, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 49, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 47, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 49, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 49, function(){
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
})(++Leisure_traceInstance, L$instance));
});
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 50, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x", 1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 62, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 52, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y", 1));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 62, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 54, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("width", 50));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 62, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 56, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("height", 50));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 62, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 58, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 62, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 60, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 62, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 62, function(){
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
})(++Leisure_traceInstance, L$instance));
});
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 63, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x1", 0));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 73, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 65, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y1", 0));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 73, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 67, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x2", 50));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 73, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 69, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y2", 50));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 73, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 71, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 73, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 73, function(){
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
})(++Leisure_traceInstance, L$instance));
});
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 74, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("cx", 50));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 86, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 76, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("cy", 50));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 86, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 78, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("rx", 40));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 86, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 80, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("ry", 40));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 86, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 82, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 86, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 84, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 86, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 86, function(){
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
})(++Leisure_traceInstance, L$instance));
});
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 87, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("x", 0));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 95, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 89, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("y", 10));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 95, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 91, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 95, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 93, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 95, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 95, function(){
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
})(++Leisure_traceInstance, L$instance));
});
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  return resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 96, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("points", "350 75  379 161 469 161 397 215 423 301 350 250 277 301 303 215 231 161 321 161"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 102, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 98, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke", "black"));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 102, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 100, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("stroke-width", 2));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 102, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 102, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("fill", "orange"));
  });
})(++Leisure_traceInstance, L$instance), L_nil));
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
  return resolve(L_newDefine)("svgNode", 1, "svgNode contents = \\f . f contents", lazy(setDataType((function(){
  var L$F = function(L_contents){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_contents);};
  L$F.L$info = L$FUNC_34;
  return L$F;
})(), 'svgNode');};
  L$F.L$info = L$FUNC_35;
  return L$F;
})(), 'svgNode')), lazy(setDataType((function(L$instance, L$parent){
  var L$F = function(L_contents){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (setType((function(L$instance, L$parent){
  var L$F = function(L_f){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_f)(L_contents)))
);};
  L$F.L$info = L$FUNC_38;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance), 'svgNode')))
);};
  L$F.L$info = L$FUNC_39;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance), 'svgNode')));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgNodes", 1, "svgNodes nodeList = nodeList (\\h t D . cons (h id) (svgNodes t)) nil", lazy((function(){
  var L$F = function(L_nodeList){return resolve(L_nodeList)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_cons)(function(){
  return resolve(L_h)(L_id);
}, function(){
  return resolve(L_svgNodes)(L_t);
});};
  L$F.L$info = L$FUNC_44;
  return L$F;
})();};
  L$F.L$info = L$FUNC_45;
  return L$F;
})();};
  L$F.L$info = L$FUNC_46;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_47;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_nodeList){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_nodeList)(lazy((function(L$instance, L$parent){
  var L$F = function(L_h){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_t){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_D){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 109, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_h)(L_id));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 110, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgNodes)(L_t));
  });
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.L$info = L$FUNC_52;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_53;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_54;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))(L_nil)))
);};
  L$F.L$info = L$FUNC_55;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("svgConcat", 1, "svgConcat nodeList = svgNode (strCat (svgNodes nodeList))", lazy((function(){
  var L$F = function(L_nodeList){return resolve(L_svgNode)(function(){
  return resolve(L_strCat)(function(){
  return resolve(L_svgNodes)(L_nodeList);
});
});};
  L$F.L$info = L$FUNC_57;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_nodeList){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 113, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 113, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_svgNodes)(L_nodeList));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.L$info = L$FUNC_59;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_61;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_name, L_map) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 121, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 121, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 121, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_name, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 121, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 121, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 120, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_insertFields)(L_map));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 121, function(){
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
  L$F.L$info = L$FUNC_63;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_69;
  return L$F;
})();};
  L$F.L$info = L$FUNC_70;
  return L$F;
})();};
  L$F.L$info = L$FUNC_71;
  return L$F;
})();};
  L$F.L$info = L$FUNC_72;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_73;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_content){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (L$(resolve(L_svgMeasure))(L_content, lazy((function(L$instance, L$parent){
  var L$F = function(L_x){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_y){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_w){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_h){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgTemplate)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("width='", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_w, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("' height='", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_h, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("' viewbox='", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_x, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_y, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_w, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_h, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 140, function(){
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
  L$F.L$info = L$FUNC_79;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_80;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_81;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_82;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_83;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_bind)(function(){
  return resolve(L_advise)("presentHtml", "svgNode", 1, lazy((function(){
  var L$F = function(L_obj){return resolve(L_hasType)(L_obj, L_svgNode)(function(){
  return resolve(L_some)(function(){
  return resolve(L_svgPresent)(function(){
  return resolve(L_obj)(L_id);
})(L_id);
});
})(L_none);};
  L$F.L$info = L$FUNC_85;
  return L$F;
})()));
}, lazy((function(){
  var L$F = function(L__){return resolve(L_unit);};
  L$F.L$info = L$FUNC_87;
  return L$F;
})()));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("circle", 1, "circle map = svgElement 'circle' ((isNil map) defaultCircleMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("circle", function(){
  return resolve(L_isNil)(L_map)(L_defaultCircleMap)(L_map);
});};
  L$F.L$info = L$FUNC_89;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("circle", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 142, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultCircleMap)(L_map));
  });
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.L$info = L$FUNC_91;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("rect", 1, "rect map = svgElement 'rect' ((isNil map) defaultRectMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("rect", function(){
  return resolve(L_isNil)(L_map)(L_defaultRectMap)(L_map);
});};
  L$F.L$info = L$FUNC_93;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("rect", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 144, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultRectMap)(L_map));
  });
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.L$info = L$FUNC_95;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("ellipse", 1, "ellipse map = svgElement 'ellipse' ((isNil map) defaultEllipseMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("ellipse", function(){
  return resolve(L_isNil)(L_map)(L_defaultEllipseMap)(L_map);
});};
  L$F.L$info = L$FUNC_97;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("ellipse", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 146, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultEllipseMap)(L_map));
  });
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.L$info = L$FUNC_99;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("line", 1, "line map = svgElement 'line' ((isNil map) defaultLineMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("line", function(){
  return resolve(L_isNil)(L_map)(L_defaultLineMap)(L_map);
});};
  L$F.L$info = L$FUNC_101;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("line", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 148, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultLineMap)(L_map));
  });
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.L$info = L$FUNC_103;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_105;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_t, L_map) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 158, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 158, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<text ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 158, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 154, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_insertFields)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 154, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultTextMap)(L_map));
  });
})(++Leisure_traceInstance, L$instance)));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 158, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(">", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 158, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 157, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_t)("undefined")(L_t));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 158, function(){
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
  L$F.L$info = L$FUNC_107;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("polygon", 1, "polygon map = svgElement 'polygon' ((isNil map) defaultPolygonMap map)", lazy((function(){
  var L$F = function(L_map){return resolve(L_svgElement)("polygon", function(){
  return resolve(L_isNil)(L_map)(L_defaultPolygonMap)(L_map);
});};
  L$F.L$info = L$FUNC_109;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgElement)("polygon", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 160, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_isNil)(L_map)(L_defaultPolygonMap)(L_map));
  });
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.L$info = L$FUNC_111;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_113;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_elem){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 166, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 166, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<g>", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 166, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 165, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_elem)(L_id));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 166, function(){
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
  L$F.L$info = L$FUNC_115;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_117;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_elem, L_x, L_y) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 176, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 176, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<g transform=\"translate(", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 176, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_x, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 176, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(" ", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 176, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_y, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 176, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(")\">", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 176, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 175, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_elem)(L_id));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 176, function(){
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
  L$F.L$info = L$FUNC_119;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
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
  L$F.L$info = L$FUNC_121;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_elem, L_r) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svgNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 184, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_strCat)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 184, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)("<g transform=\"rotate(", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 184, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(L_r, (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 184, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)(")\">", (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 184, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_cons)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 183, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_elem)(L_id));
  });
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 184, function(){
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
  L$F.L$info = L$FUNC_123;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)}
  ]);
});
//# sourceMappingURL=data:application/json,{"version":3,"sources":["svg.lsr"],"names":[],"mappings":"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","file":"svg.js"}
