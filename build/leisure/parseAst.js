"use strict";
define([], function(){
  var L$context = Leisure_traceTopLevelStd({
    id: Leisure_traceContext++,
    traceCreatePartial: function(){return Leisure_traceCreatePartialStd;},
    traceCallPartial: function(){return Leisure_traceCallPartialStd;},
    debugType: "Std",
    source: "build/leisure/parseAst.lsr",
    externalMap: "build/leisure/parseAst.map",
    decls: ["lambda",37,9,null,"makeNode",5,"svg","width","height","rootX","rootY","lambda",37,41,0,null,1,"f","lambda",39,8,null,"nodeSvg",1,"st","lambda",39,17,2,null,1,"svg","lambda",39,21,3,null,1,"width","lambda",39,27,4,null,1,"height","lambda",39,34,5,null,1,"rootX","lambda",39,40,6,null,1,"rootY","lambda",40,10,null,"nodeWidth",1,"st","lambda",40,19,8,null,1,"svg","lambda",40,23,9,null,1,"width","lambda",40,29,10,null,1,"height","lambda",40,36,11,null,1,"rootX","lambda",40,42,12,null,1,"rootY","lambda",41,11,null,"nodeHeight",1,"st","lambda",41,20,14,null,1,"svg","lambda",41,24,15,null,1,"width","lambda",41,30,16,null,1,"height","lambda",41,37,17,null,1,"rootX","lambda",41,43,18,null,1,"rootY","lambda",42,10,null,"nodeRootX",1,"st","lambda",42,19,20,null,1,"svg","lambda",42,23,21,null,1,"width","lambda",42,29,22,null,1,"height","lambda",42,36,23,null,1,"rootX","lambda",42,42,24,null,1,"rootY","lambda",43,10,null,"nodeRootY",1,"st","lambda",43,19,26,null,1,"svg","lambda",43,23,27,null,1,"width","lambda",43,29,28,null,1,"height","lambda",43,36,29,null,1,"rootX","lambda",43,42,30,null,1,"rootY","lambda",48,14,null,"nodeTranslate",3,"st","x","y","lambda",48,27,32,null,1,"svg","lambda",48,31,33,null,1,"width","lambda",48,37,34,null,1,"height","lambda",48,44,35,null,1,"rootX","lambda",48,50,36,null,1,"rootY","lazy",49,2,37,"lazy",52,2,37,"lazy",53,2,37,"lambda",55,9,null,"nodeLine",2,"n1","n2","lambda",55,21,41,null,1,"s1","lambda",55,24,42,null,1,"w1","lambda",55,27,43,null,1,"h1","lambda",55,30,44,null,1,"x1","lambda",55,33,45,null,1,"y1","lambda",55,42,46,null,1,"s2","lambda",55,45,47,null,1,"w2","lambda",55,48,48,null,1,"h2","lambda",55,51,49,null,1,"x2","lambda",55,54,50,null,1,"y2","lazy",56,9,51,"lazy",56,9,52,"lazy",56,19,52,"lazy",56,19,54,"lazy",56,29,54,"lazy",56,29,56,"lazy",56,39,56,"lazy",56,39,58,"lazy",56,49,58,"lazy",56,49,60,"lambda",58,19,null,"rangeContainsRange",4,"start","end","innerStart","innerEnd","lazy",58,56,62,"lazy",58,79,62,"lambda",60,10,null,"highlight",1,"map","lazy",61,6,65,"lazy",63,4,65,"lazy",64,4,65,"lazy",65,6,68,"lazy",66,6,68,"lazy",67,8,70,"lambda",70,8,null,"treeFor",1,"ast","lambda",70,31,72,null,1,"ast","lambda",70,35,73,null,1,"map","lambda",72,12,null,"treeForWith",2,"ast","mapFunc","lazy",72,35,75,"lambda",74,15,null,"wrappedTreeFor",1,"ast","lazy",75,12,77,"lambda",75,25,78,null,1,"ast","lambda",75,29,79,null,1,"map","lazy",76,7,77,"lazy",76,25,77,"lazy",76,25,82,"lazy",76,34,83,"lazy",76,44,84,"lazy",76,64,82,"lazy",76,64,86,"lazy",76,74,87,"lazy",76,84,88,"lambda",78,8,null,"nodeFor",2,"ast","mapFunc","lazy",79,6,90,"lazy",81,4,90,"lazy",81,23,92,"lazy",81,29,93,"lambda",81,34,94,null,1,"v","lambda",81,36,95,null,1,"p","lazy",82,4,90,"lazy",83,6,97,"lazy",83,25,98,"lazy",83,31,99,"lambda",83,36,100,null,1,"n","lambda",83,38,101,null,1,"p","lazy",84,6,97,"lazy",85,8,103,"lambda",85,14,104,null,1,"v","lambda",85,16,105,null,1,"b","lambda",85,18,106,null,1,"p","lazy",86,8,103,"lazy",87,10,108,"lambda",87,16,109,null,1,"f","lambda",87,18,110,null,1,"a","lazy",88,10,108,"lazy",90,12,112,"lambda",90,18,113,null,1,"n","lambda",90,20,114,null,1,"d","lambda",90,22,115,null,1,"b","lazy",91,12,112,"lazy",91,28,117,"lazy",93,13,null,"lazy",93,32,null,"lazy",93,32,120,"lazy",93,51,120,"lazy",93,51,122,"lazy",93,67,122,"lazy",93,67,124,"lazy",93,76,124,"lazy",93,76,126,"lazy",94,15,null,"lazy",94,34,null,"lazy",94,34,129,"lazy",94,53,129,"lazy",94,53,131,"lazy",94,69,131,"lazy",94,69,133,"lazy",94,78,133,"lazy",94,78,135,"lazy",95,14,null,"lazy",95,33,null,"lazy",95,33,138,"lazy",95,52,138,"lazy",95,52,140,"lazy",95,68,140,"lazy",95,68,142,"lazy",95,77,142,"lazy",95,77,144,"lambda",97,17,null,"createLambdaNode",4,"ast","v","b","mapFunc","lazy",98,12,146,"lazy",98,22,147,"lazy",99,11,146,"lazy",99,21,149,"lazy",100,13,146,"lazy",101,16,146,"lazy",101,16,152,"lazy",101,16,153,"lazy",101,45,152,"lazy",102,15,146,"lazy",102,31,156,"lazy",103,8,146,"lazy",103,15,158,"lazy",103,15,159,"lazy",104,12,146,"lazy",104,35,161,"lazy",104,35,162,"lazy",104,53,162,"lazy",104,53,164,"lazy",105,11,146,"lazy",105,37,166,"lazy",105,37,167,"lazy",106,13,146,"lazy",106,37,169,"lazy",106,37,170,"lazy",106,44,171,"lazy",106,73,169,"lazy",106,73,173,"lazy",108,4,146,"lazy",108,15,175,"lazy",108,16,176,"lazy",108,41,176,"lazy",108,42,178,"lazy",108,69,178,"lazy",108,70,180,"lazy",108,86,180,"lazy",108,87,182,"lazy",108,105,182,"lazy",108,106,184,"lazy",110,5,146,"lazy",110,5,186,"lazy",110,5,187,"lazy",110,36,186,"lazy",110,41,189,"lazy",110,61,189,"lazy",111,4,146,"lazy",112,5,146,"lazy",112,5,193,"lambda",114,16,null,"createApplyNode",4,"ast","f","a","mapFunc","lazy",115,12,195,"lazy",115,22,196,"lazy",116,13,195,"lazy",117,12,195,"lazy",118,16,195,"lazy",118,16,200,"lazy",118,16,201,"lazy",118,46,200,"lazy",119,15,195,"lazy",119,31,204,"lazy",120,8,195,"lazy",120,15,206,"lazy",120,15,207,"lazy",121,12,195,"lazy",121,35,209,"lazy",121,35,210,"lazy",121,53,210,"lazy",121,53,212,"lazy",122,13,195,"lazy",122,41,214,"lazy",122,41,215,"lazy",123,12,195,"lazy",123,35,217,"lazy",123,35,218,"lazy",123,42,219,"lazy",123,73,217,"lazy",123,73,221,"lazy",125,4,195,"lazy",125,15,223,"lazy",125,16,224,"lazy",125,43,224,"lazy",125,44,226,"lazy",125,70,226,"lazy",125,71,228,"lazy",125,88,228,"lazy",125,89,230,"lazy",125,107,230,"lazy",125,108,232,"lazy",127,5,195,"lazy",127,5,234,"lazy",127,5,235,"lazy",127,36,234,"lazy",127,41,237,"lazy",127,62,237,"lazy",128,4,195,"lazy",129,5,195,"lazy",129,5,241,"lambda",131,14,null,"createRefNode",3,"ast","ref","mapFunc","lazy",131,42,243,"lambda",132,14,null,"createLitNode",3,"ast","lit","mapFunc","lazy",132,42,245,"lambda",134,9,null,"textNode",2,"map","txt","lambda",134,44,247,null,1,"w","lambda",134,46,248,null,1,"h","lazy",135,10,249,"lazy",136,10,249,"lazy",138,5,249,"lazy",138,16,252,"lazy",138,17,253,"lazy",138,24,254,"lazy",138,24,255,"lazy",138,32,255,"lazy",138,32,257,"lazy",138,40,257,"lazy",138,40,259,"lazy",138,56,259,"lazy",138,56,261,"lazy",138,80,253,"lazy",138,81,263,"lazy",138,92,264,"lazy",138,92,265,"lazy",138,120,265,"lazy",138,120,267,"lazy",138,145,267,"lazy",138,145,269,"lazy",138,182,269,"lazy",138,182,271,"lazy",138,187,272,"lazy",138,192,273,"lazy",138,200,271,"lazy",138,200,275,"lazy",138,205,276,"lazy",138,214,277,"lazy",138,222,275,"lazy",138,222,279,"lazy",141,4,249,"lazy",142,4,249]
  });
  var L$FUNC_0 = {name: "makeNode", args: ["svg","width","height","rootX","rootY"], id: undefined, length: 5, parent: null, context: L$context};
  var L$FUNC_1 = {name: null, args: ["f"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_2 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_3 = {name: undefined, args: undefined, id: undefined, length: 5, parent: null, context: L$context};
  var L$FUNC_4 = {name: "makeNode", args: ["svg","width","height","rootX","rootY"], id: 0, length: 5, parent: null, context: L$context};
  var L$FUNC_5 = {name: null, args: ["f"], id: 1, length: 1, parent: L$FUNC_4, context: L$context};
  var L$FUNC_6 = {name: undefined, args: undefined, id: 1, length: 1, parent: null, context: L$context};
  var L$FUNC_7 = {name: undefined, args: undefined, id: 0, length: 5, parent: null, context: L$context};
  var L$FUNC_8 = {name: "nodeSvg", args: ["st"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_9 = {name: null, args: ["svg"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_10 = {name: null, args: ["width"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_11 = {name: null, args: ["height"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_12 = {name: null, args: ["rootX"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_13 = {name: null, args: ["rootY"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_14 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_15 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_16 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_17 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_18 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_19 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_20 = {name: "nodeSvg", args: ["st"], id: 2, length: 1, parent: null, context: L$context};
  var L$FUNC_21 = {name: null, args: ["svg"], id: 3, length: 1, parent: L$FUNC_20, context: L$context};
  var L$FUNC_22 = {name: null, args: ["width"], id: 4, length: 1, parent: L$FUNC_21, context: L$context};
  var L$FUNC_23 = {name: null, args: ["height"], id: 5, length: 1, parent: L$FUNC_22, context: L$context};
  var L$FUNC_24 = {name: null, args: ["rootX"], id: 6, length: 1, parent: L$FUNC_23, context: L$context};
  var L$FUNC_25 = {name: null, args: ["rootY"], id: 7, length: 1, parent: L$FUNC_24, context: L$context};
  var L$FUNC_26 = {name: undefined, args: undefined, id: 7, length: 1, parent: null, context: L$context};
  var L$FUNC_27 = {name: undefined, args: undefined, id: 6, length: 1, parent: null, context: L$context};
  var L$FUNC_28 = {name: undefined, args: undefined, id: 5, length: 1, parent: null, context: L$context};
  var L$FUNC_29 = {name: undefined, args: undefined, id: 4, length: 1, parent: null, context: L$context};
  var L$FUNC_30 = {name: undefined, args: undefined, id: 3, length: 1, parent: null, context: L$context};
  var L$FUNC_31 = {name: undefined, args: undefined, id: 2, length: 1, parent: null, context: L$context};
  var L$FUNC_32 = {name: "nodeWidth", args: ["st"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_33 = {name: null, args: ["svg"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_34 = {name: null, args: ["width"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_35 = {name: null, args: ["height"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_36 = {name: null, args: ["rootX"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_37 = {name: null, args: ["rootY"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_38 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_39 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_40 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_41 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_42 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_43 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_44 = {name: "nodeWidth", args: ["st"], id: 8, length: 1, parent: null, context: L$context};
  var L$FUNC_45 = {name: null, args: ["svg"], id: 9, length: 1, parent: L$FUNC_44, context: L$context};
  var L$FUNC_46 = {name: null, args: ["width"], id: 10, length: 1, parent: L$FUNC_45, context: L$context};
  var L$FUNC_47 = {name: null, args: ["height"], id: 11, length: 1, parent: L$FUNC_46, context: L$context};
  var L$FUNC_48 = {name: null, args: ["rootX"], id: 12, length: 1, parent: L$FUNC_47, context: L$context};
  var L$FUNC_49 = {name: null, args: ["rootY"], id: 13, length: 1, parent: L$FUNC_48, context: L$context};
  var L$FUNC_50 = {name: undefined, args: undefined, id: 13, length: 1, parent: null, context: L$context};
  var L$FUNC_51 = {name: undefined, args: undefined, id: 12, length: 1, parent: null, context: L$context};
  var L$FUNC_52 = {name: undefined, args: undefined, id: 11, length: 1, parent: null, context: L$context};
  var L$FUNC_53 = {name: undefined, args: undefined, id: 10, length: 1, parent: null, context: L$context};
  var L$FUNC_54 = {name: undefined, args: undefined, id: 9, length: 1, parent: null, context: L$context};
  var L$FUNC_55 = {name: undefined, args: undefined, id: 8, length: 1, parent: null, context: L$context};
  var L$FUNC_56 = {name: "nodeHeight", args: ["st"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_57 = {name: null, args: ["svg"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_58 = {name: null, args: ["width"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_59 = {name: null, args: ["height"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_60 = {name: null, args: ["rootX"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_61 = {name: null, args: ["rootY"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_62 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_63 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_64 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_65 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_66 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_67 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_68 = {name: "nodeHeight", args: ["st"], id: 14, length: 1, parent: null, context: L$context};
  var L$FUNC_69 = {name: null, args: ["svg"], id: 15, length: 1, parent: L$FUNC_68, context: L$context};
  var L$FUNC_70 = {name: null, args: ["width"], id: 16, length: 1, parent: L$FUNC_69, context: L$context};
  var L$FUNC_71 = {name: null, args: ["height"], id: 17, length: 1, parent: L$FUNC_70, context: L$context};
  var L$FUNC_72 = {name: null, args: ["rootX"], id: 18, length: 1, parent: L$FUNC_71, context: L$context};
  var L$FUNC_73 = {name: null, args: ["rootY"], id: 19, length: 1, parent: L$FUNC_72, context: L$context};
  var L$FUNC_74 = {name: undefined, args: undefined, id: 19, length: 1, parent: null, context: L$context};
  var L$FUNC_75 = {name: undefined, args: undefined, id: 18, length: 1, parent: null, context: L$context};
  var L$FUNC_76 = {name: undefined, args: undefined, id: 17, length: 1, parent: null, context: L$context};
  var L$FUNC_77 = {name: undefined, args: undefined, id: 16, length: 1, parent: null, context: L$context};
  var L$FUNC_78 = {name: undefined, args: undefined, id: 15, length: 1, parent: null, context: L$context};
  var L$FUNC_79 = {name: undefined, args: undefined, id: 14, length: 1, parent: null, context: L$context};
  var L$FUNC_80 = {name: "nodeRootX", args: ["st"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_81 = {name: null, args: ["svg"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_82 = {name: null, args: ["width"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_83 = {name: null, args: ["height"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_84 = {name: null, args: ["rootX"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_85 = {name: null, args: ["rootY"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_86 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_87 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_88 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_89 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_90 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_91 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_92 = {name: "nodeRootX", args: ["st"], id: 20, length: 1, parent: null, context: L$context};
  var L$FUNC_93 = {name: null, args: ["svg"], id: 21, length: 1, parent: L$FUNC_92, context: L$context};
  var L$FUNC_94 = {name: null, args: ["width"], id: 22, length: 1, parent: L$FUNC_93, context: L$context};
  var L$FUNC_95 = {name: null, args: ["height"], id: 23, length: 1, parent: L$FUNC_94, context: L$context};
  var L$FUNC_96 = {name: null, args: ["rootX"], id: 24, length: 1, parent: L$FUNC_95, context: L$context};
  var L$FUNC_97 = {name: null, args: ["rootY"], id: 25, length: 1, parent: L$FUNC_96, context: L$context};
  var L$FUNC_98 = {name: undefined, args: undefined, id: 25, length: 1, parent: null, context: L$context};
  var L$FUNC_99 = {name: undefined, args: undefined, id: 24, length: 1, parent: null, context: L$context};
  var L$FUNC_100 = {name: undefined, args: undefined, id: 23, length: 1, parent: null, context: L$context};
  var L$FUNC_101 = {name: undefined, args: undefined, id: 22, length: 1, parent: null, context: L$context};
  var L$FUNC_102 = {name: undefined, args: undefined, id: 21, length: 1, parent: null, context: L$context};
  var L$FUNC_103 = {name: undefined, args: undefined, id: 20, length: 1, parent: null, context: L$context};
  var L$FUNC_104 = {name: "nodeRootY", args: ["st"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_105 = {name: null, args: ["svg"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_106 = {name: null, args: ["width"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_107 = {name: null, args: ["height"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_108 = {name: null, args: ["rootX"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_109 = {name: null, args: ["rootY"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_110 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_111 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_112 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_113 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_114 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_115 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_116 = {name: "nodeRootY", args: ["st"], id: 26, length: 1, parent: null, context: L$context};
  var L$FUNC_117 = {name: null, args: ["svg"], id: 27, length: 1, parent: L$FUNC_116, context: L$context};
  var L$FUNC_118 = {name: null, args: ["width"], id: 28, length: 1, parent: L$FUNC_117, context: L$context};
  var L$FUNC_119 = {name: null, args: ["height"], id: 29, length: 1, parent: L$FUNC_118, context: L$context};
  var L$FUNC_120 = {name: null, args: ["rootX"], id: 30, length: 1, parent: L$FUNC_119, context: L$context};
  var L$FUNC_121 = {name: null, args: ["rootY"], id: 31, length: 1, parent: L$FUNC_120, context: L$context};
  var L$FUNC_122 = {name: undefined, args: undefined, id: 31, length: 1, parent: null, context: L$context};
  var L$FUNC_123 = {name: undefined, args: undefined, id: 30, length: 1, parent: null, context: L$context};
  var L$FUNC_124 = {name: undefined, args: undefined, id: 29, length: 1, parent: null, context: L$context};
  var L$FUNC_125 = {name: undefined, args: undefined, id: 28, length: 1, parent: null, context: L$context};
  var L$FUNC_126 = {name: undefined, args: undefined, id: 27, length: 1, parent: null, context: L$context};
  var L$FUNC_127 = {name: undefined, args: undefined, id: 26, length: 1, parent: null, context: L$context};
  var L$FUNC_128 = {name: "nodeTranslate", args: ["st","x","y"], id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_129 = {name: null, args: ["svg"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_130 = {name: null, args: ["width"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_131 = {name: null, args: ["height"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_132 = {name: null, args: ["rootX"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_133 = {name: null, args: ["rootY"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_134 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_135 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_136 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_137 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_138 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_139 = {name: undefined, args: undefined, id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_140 = {name: "nodeTranslate", args: ["st","x","y"], id: 32, length: 3, parent: null, context: L$context};
  var L$FUNC_141 = {name: null, args: ["svg"], id: 33, length: 1, parent: L$FUNC_140, context: L$context};
  var L$FUNC_142 = {name: null, args: ["width"], id: 34, length: 1, parent: L$FUNC_141, context: L$context};
  var L$FUNC_143 = {name: null, args: ["height"], id: 35, length: 1, parent: L$FUNC_142, context: L$context};
  var L$FUNC_144 = {name: null, args: ["rootX"], id: 36, length: 1, parent: L$FUNC_143, context: L$context};
  var L$FUNC_145 = {name: null, args: ["rootY"], id: 37, length: 1, parent: L$FUNC_144, context: L$context};
  var L$FUNC_146 = {name: undefined, args: undefined, id: 37, length: 1, parent: null, context: L$context};
  var L$FUNC_147 = {name: undefined, args: undefined, id: 36, length: 1, parent: null, context: L$context};
  var L$FUNC_148 = {name: undefined, args: undefined, id: 35, length: 1, parent: null, context: L$context};
  var L$FUNC_149 = {name: undefined, args: undefined, id: 34, length: 1, parent: null, context: L$context};
  var L$FUNC_150 = {name: undefined, args: undefined, id: 33, length: 1, parent: null, context: L$context};
  var L$FUNC_151 = {name: undefined, args: undefined, id: 32, length: 3, parent: null, context: L$context};
  var L$FUNC_152 = {name: "nodeLine", args: ["n1","n2"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_153 = {name: null, args: ["s1"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_154 = {name: null, args: ["w1"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_155 = {name: null, args: ["h1"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_156 = {name: null, args: ["x1"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_157 = {name: null, args: ["y1"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_158 = {name: null, args: ["s2"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_159 = {name: null, args: ["w2"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_160 = {name: null, args: ["h2"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_161 = {name: null, args: ["x2"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_162 = {name: null, args: ["y2"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_163 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_164 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_165 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_166 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_167 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_168 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_169 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_170 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_171 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_172 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_173 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_174 = {name: "nodeLine", args: ["n1","n2"], id: 41, length: 2, parent: null, context: L$context};
  var L$FUNC_175 = {name: null, args: ["s1"], id: 42, length: 1, parent: L$FUNC_174, context: L$context};
  var L$FUNC_176 = {name: null, args: ["w1"], id: 43, length: 1, parent: L$FUNC_175, context: L$context};
  var L$FUNC_177 = {name: null, args: ["h1"], id: 44, length: 1, parent: L$FUNC_176, context: L$context};
  var L$FUNC_178 = {name: null, args: ["x1"], id: 45, length: 1, parent: L$FUNC_177, context: L$context};
  var L$FUNC_179 = {name: null, args: ["y1"], id: 46, length: 1, parent: L$FUNC_178, context: L$context};
  var L$FUNC_180 = {name: null, args: ["s2"], id: 47, length: 1, parent: L$FUNC_179, context: L$context};
  var L$FUNC_181 = {name: null, args: ["w2"], id: 48, length: 1, parent: L$FUNC_180, context: L$context};
  var L$FUNC_182 = {name: null, args: ["h2"], id: 49, length: 1, parent: L$FUNC_181, context: L$context};
  var L$FUNC_183 = {name: null, args: ["x2"], id: 50, length: 1, parent: L$FUNC_182, context: L$context};
  var L$FUNC_184 = {name: null, args: ["y2"], id: 51, length: 1, parent: L$FUNC_183, context: L$context};
  var L$FUNC_185 = {name: undefined, args: undefined, id: 51, length: 1, parent: null, context: L$context};
  var L$FUNC_186 = {name: undefined, args: undefined, id: 50, length: 1, parent: null, context: L$context};
  var L$FUNC_187 = {name: undefined, args: undefined, id: 49, length: 1, parent: null, context: L$context};
  var L$FUNC_188 = {name: undefined, args: undefined, id: 48, length: 1, parent: null, context: L$context};
  var L$FUNC_189 = {name: undefined, args: undefined, id: 47, length: 1, parent: null, context: L$context};
  var L$FUNC_190 = {name: undefined, args: undefined, id: 46, length: 1, parent: null, context: L$context};
  var L$FUNC_191 = {name: undefined, args: undefined, id: 45, length: 1, parent: null, context: L$context};
  var L$FUNC_192 = {name: undefined, args: undefined, id: 44, length: 1, parent: null, context: L$context};
  var L$FUNC_193 = {name: undefined, args: undefined, id: 43, length: 1, parent: null, context: L$context};
  var L$FUNC_194 = {name: undefined, args: undefined, id: 42, length: 1, parent: null, context: L$context};
  var L$FUNC_195 = {name: undefined, args: undefined, id: 41, length: 2, parent: null, context: L$context};
  var L$FUNC_196 = {name: "rangeContainsRange", args: ["start","end","innerStart","innerEnd"], id: undefined, length: 4, parent: null, context: L$context};
  var L$FUNC_197 = {name: undefined, args: undefined, id: undefined, length: 4, parent: null, context: L$context};
  var L$FUNC_198 = {name: "rangeContainsRange", args: ["start","end","innerStart","innerEnd"], id: 62, length: 4, parent: null, context: L$context};
  var L$FUNC_199 = {name: undefined, args: undefined, id: 62, length: 4, parent: null, context: L$context};
  var L$FUNC_200 = {name: "highlight", args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_201 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_202 = {name: "highlight", args: ["map"], id: 65, length: 1, parent: null, context: L$context};
  var L$FUNC_203 = {name: undefined, args: undefined, id: 65, length: 1, parent: null, context: L$context};
  var L$FUNC_204 = {name: "treeFor", args: ["ast"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_205 = {name: null, args: ["ast"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_206 = {name: null, args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_207 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_208 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_209 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_210 = {name: "treeFor", args: ["ast"], id: 72, length: 1, parent: null, context: L$context};
  var L$FUNC_211 = {name: null, args: ["ast"], id: 73, length: 1, parent: L$FUNC_210, context: L$context};
  var L$FUNC_212 = {name: null, args: ["map"], id: 74, length: 1, parent: L$FUNC_211, context: L$context};
  var L$FUNC_213 = {name: undefined, args: undefined, id: 74, length: 1, parent: null, context: L$context};
  var L$FUNC_214 = {name: undefined, args: undefined, id: 73, length: 1, parent: null, context: L$context};
  var L$FUNC_215 = {name: undefined, args: undefined, id: 72, length: 1, parent: null, context: L$context};
  var L$FUNC_216 = {name: "treeForWith", args: ["ast","mapFunc"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_217 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_218 = {name: "treeForWith", args: ["ast","mapFunc"], id: 75, length: 2, parent: null, context: L$context};
  var L$FUNC_219 = {name: undefined, args: undefined, id: 75, length: 2, parent: null, context: L$context};
  var L$FUNC_220 = {name: "wrappedTreeFor", args: ["ast"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_221 = {name: null, args: ["ast"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_222 = {name: null, args: ["map"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_223 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_224 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_225 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_226 = {name: "wrappedTreeFor", args: ["ast"], id: 77, length: 1, parent: null, context: L$context};
  var L$FUNC_227 = {name: null, args: ["ast"], id: 79, length: 1, parent: L$FUNC_226, context: L$context};
  var L$FUNC_228 = {name: null, args: ["map"], id: 80, length: 1, parent: L$FUNC_227, context: L$context};
  var L$FUNC_229 = {name: undefined, args: undefined, id: 80, length: 1, parent: null, context: L$context};
  var L$FUNC_230 = {name: undefined, args: undefined, id: 79, length: 1, parent: null, context: L$context};
  var L$FUNC_231 = {name: undefined, args: undefined, id: 77, length: 1, parent: null, context: L$context};
  var L$FUNC_232 = {name: "nodeFor", args: ["ast","mapFunc"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_233 = {name: null, args: ["v"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_234 = {name: null, args: ["p"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_235 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_236 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_237 = {name: null, args: ["n"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_238 = {name: null, args: ["p"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_239 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_240 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_241 = {name: null, args: ["v"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_242 = {name: null, args: ["b"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_243 = {name: null, args: ["p"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_244 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_245 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_246 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_247 = {name: null, args: ["f"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_248 = {name: null, args: ["a"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_249 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_250 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_251 = {name: null, args: ["n"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_252 = {name: null, args: ["d"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_253 = {name: null, args: ["b"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_254 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_255 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_256 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_257 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_258 = {name: "nodeFor", args: ["ast","mapFunc"], id: 90, length: 2, parent: null, context: L$context};
  var L$FUNC_259 = {name: null, args: ["v"], id: 95, length: 1, parent: L$FUNC_258, context: L$context};
  var L$FUNC_260 = {name: null, args: ["p"], id: 96, length: 1, parent: L$FUNC_259, context: L$context};
  var L$FUNC_261 = {name: undefined, args: undefined, id: 96, length: 1, parent: null, context: L$context};
  var L$FUNC_262 = {name: undefined, args: undefined, id: 95, length: 1, parent: null, context: L$context};
  var L$FUNC_263 = {name: null, args: ["n"], id: 101, length: 1, parent: L$FUNC_258, context: L$context};
  var L$FUNC_264 = {name: null, args: ["p"], id: 102, length: 1, parent: L$FUNC_263, context: L$context};
  var L$FUNC_265 = {name: undefined, args: undefined, id: 102, length: 1, parent: null, context: L$context};
  var L$FUNC_266 = {name: undefined, args: undefined, id: 101, length: 1, parent: null, context: L$context};
  var L$FUNC_267 = {name: null, args: ["v"], id: 105, length: 1, parent: L$FUNC_258, context: L$context};
  var L$FUNC_268 = {name: null, args: ["b"], id: 106, length: 1, parent: L$FUNC_267, context: L$context};
  var L$FUNC_269 = {name: null, args: ["p"], id: 107, length: 1, parent: L$FUNC_268, context: L$context};
  var L$FUNC_270 = {name: undefined, args: undefined, id: 107, length: 1, parent: null, context: L$context};
  var L$FUNC_271 = {name: undefined, args: undefined, id: 106, length: 1, parent: null, context: L$context};
  var L$FUNC_272 = {name: undefined, args: undefined, id: 105, length: 1, parent: null, context: L$context};
  var L$FUNC_273 = {name: null, args: ["f"], id: 110, length: 1, parent: L$FUNC_258, context: L$context};
  var L$FUNC_274 = {name: null, args: ["a"], id: 111, length: 1, parent: L$FUNC_273, context: L$context};
  var L$FUNC_275 = {name: undefined, args: undefined, id: 111, length: 1, parent: null, context: L$context};
  var L$FUNC_276 = {name: undefined, args: undefined, id: 110, length: 1, parent: null, context: L$context};
  var L$FUNC_277 = {name: null, args: ["n"], id: 114, length: 1, parent: L$FUNC_258, context: L$context};
  var L$FUNC_278 = {name: null, args: ["d"], id: 115, length: 1, parent: L$FUNC_277, context: L$context};
  var L$FUNC_279 = {name: null, args: ["b"], id: 116, length: 1, parent: L$FUNC_278, context: L$context};
  var L$FUNC_280 = {name: undefined, args: undefined, id: 116, length: 1, parent: null, context: L$context};
  var L$FUNC_281 = {name: undefined, args: undefined, id: 115, length: 1, parent: null, context: L$context};
  var L$FUNC_282 = {name: undefined, args: undefined, id: 114, length: 1, parent: null, context: L$context};
  var L$FUNC_283 = {name: undefined, args: undefined, id: 90, length: 2, parent: null, context: L$context};
  var L$FUNC_284 = {name: "createLambdaNode", args: ["ast","v","b","mapFunc"], id: undefined, length: 4, parent: null, context: L$context};
  var L$FUNC_285 = {name: undefined, args: undefined, id: undefined, length: 4, parent: null, context: L$context};
  var L$FUNC_286 = {name: "createLambdaNode", args: ["ast","v","b","mapFunc"], id: 146, length: 4, parent: null, context: L$context};
  var L$FUNC_287 = {name: undefined, args: undefined, id: 146, length: 4, parent: null, context: L$context};
  var L$FUNC_288 = {name: "createApplyNode", args: ["ast","f","a","mapFunc"], id: undefined, length: 4, parent: null, context: L$context};
  var L$FUNC_289 = {name: undefined, args: undefined, id: undefined, length: 4, parent: null, context: L$context};
  var L$FUNC_290 = {name: "createApplyNode", args: ["ast","f","a","mapFunc"], id: 195, length: 4, parent: null, context: L$context};
  var L$FUNC_291 = {name: undefined, args: undefined, id: 195, length: 4, parent: null, context: L$context};
  var L$FUNC_292 = {name: "createRefNode", args: ["ast","ref","mapFunc"], id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_293 = {name: undefined, args: undefined, id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_294 = {name: "createRefNode", args: ["ast","ref","mapFunc"], id: 243, length: 3, parent: null, context: L$context};
  var L$FUNC_295 = {name: undefined, args: undefined, id: 243, length: 3, parent: null, context: L$context};
  var L$FUNC_296 = {name: "createLitNode", args: ["ast","lit","mapFunc"], id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_297 = {name: undefined, args: undefined, id: undefined, length: 3, parent: null, context: L$context};
  var L$FUNC_298 = {name: "createLitNode", args: ["ast","lit","mapFunc"], id: 245, length: 3, parent: null, context: L$context};
  var L$FUNC_299 = {name: undefined, args: undefined, id: 245, length: 3, parent: null, context: L$context};
  var L$FUNC_300 = {name: "textNode", args: ["map","txt"], id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_301 = {name: null, args: ["w"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_302 = {name: null, args: ["h"], id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_303 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_304 = {name: undefined, args: undefined, id: undefined, length: 1, parent: null, context: L$context};
  var L$FUNC_305 = {name: undefined, args: undefined, id: undefined, length: 2, parent: null, context: L$context};
  var L$FUNC_306 = {name: "textNode", args: ["map","txt"], id: 247, length: 2, parent: null, context: L$context};
  var L$FUNC_307 = {name: null, args: ["w"], id: 248, length: 1, parent: L$FUNC_306, context: L$context};
  var L$FUNC_308 = {name: null, args: ["h"], id: 249, length: 1, parent: L$FUNC_307, context: L$context};
  var L$FUNC_309 = {name: undefined, args: undefined, id: 249, length: 1, parent: null, context: L$context};
  var L$FUNC_310 = {name: undefined, args: undefined, id: 248, length: 1, parent: null, context: L$context};
  var L$FUNC_311 = {name: undefined, args: undefined, id: 247, length: 2, parent: null, context: L$context};
  return L_runMonads([
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("makeNode", 5, "makeNode svg width height rootX rootY = \\f . f svg width height rootX rootY", lazy(setDataType((function(){
  var L$F = function(L_svg, L_width, L_height, L_rootX, L_rootY) {
  return L_checkPartial(L$F, arguments) || setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_svg)(L_width)(L_height)(L_rootX)(L_rootY);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})(), 'makeNode');
};;
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'makeNode')), lazy(setDataType((function(L$instance, L$parent){
  var L$F = function(L_svg, L_width, L_height, L_rootX, L_rootY) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (setType((function(L$instance, L$parent){
  var L$F = function(L_f){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_f)(L_svg)(L_width)(L_height)(L_rootX)(L_rootY)))
);};
  L$F.L$info = L$FUNC_6;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance), 'makeNode')))
);
};;
  L$F.L$info = L$FUNC_7;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance), 'makeNode')));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeSvg", 1, "nodeSvg st = st \\svg width height rootX rootY . svg", lazy((function(){
  var L$F = function(L_st){return resolve(L_st)(lazy((function(){
  var L$F = function(L_svg){return (function(){
  var L$F = function(L_width){return (function(){
  var L$F = function(L_height){return (function(){
  var L$F = function(L_rootX){return (function(){
  var L$F = function(L_rootY){return resolve(L_svg);};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})();};
  L$F.L$info = L$FUNC_16;
  return L$F;
})();};
  L$F.L$info = L$FUNC_17;
  return L$F;
})();};
  L$F.L$info = L$FUNC_18;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_19;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_svg)))
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
  return resolve(L_newDefine)("nodeWidth", 1, "nodeWidth st = st \\svg width height rootX rootY . width", lazy((function(){
  var L$F = function(L_st){return resolve(L_st)(lazy((function(){
  var L$F = function(L_svg){return (function(){
  var L$F = function(L_width){return (function(){
  var L$F = function(L_height){return (function(){
  var L$F = function(L_rootX){return (function(){
  var L$F = function(L_rootY){return resolve(L_width);};
  L$F.L$info = L$FUNC_38;
  return L$F;
})();};
  L$F.L$info = L$FUNC_39;
  return L$F;
})();};
  L$F.L$info = L$FUNC_40;
  return L$F;
})();};
  L$F.L$info = L$FUNC_41;
  return L$F;
})();};
  L$F.L$info = L$FUNC_42;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_43;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_width)))
);};
  L$F.L$info = L$FUNC_50;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
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
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_55;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeHeight", 1, "nodeHeight st = st \\svg width height rootX rootY . height", lazy((function(){
  var L$F = function(L_st){return resolve(L_st)(lazy((function(){
  var L$F = function(L_svg){return (function(){
  var L$F = function(L_width){return (function(){
  var L$F = function(L_height){return (function(){
  var L$F = function(L_rootX){return (function(){
  var L$F = function(L_rootY){return resolve(L_height);};
  L$F.L$info = L$FUNC_62;
  return L$F;
})();};
  L$F.L$info = L$FUNC_63;
  return L$F;
})();};
  L$F.L$info = L$FUNC_64;
  return L$F;
})();};
  L$F.L$info = L$FUNC_65;
  return L$F;
})();};
  L$F.L$info = L$FUNC_66;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_67;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_height)))
);};
  L$F.L$info = L$FUNC_74;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
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
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_77;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_78;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_79;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeRootX", 1, "nodeRootX st = st \\svg width height rootX rootY . rootX", lazy((function(){
  var L$F = function(L_st){return resolve(L_st)(lazy((function(){
  var L$F = function(L_svg){return (function(){
  var L$F = function(L_width){return (function(){
  var L$F = function(L_height){return (function(){
  var L$F = function(L_rootX){return (function(){
  var L$F = function(L_rootY){return resolve(L_rootX);};
  L$F.L$info = L$FUNC_86;
  return L$F;
})();};
  L$F.L$info = L$FUNC_87;
  return L$F;
})();};
  L$F.L$info = L$FUNC_88;
  return L$F;
})();};
  L$F.L$info = L$FUNC_89;
  return L$F;
})();};
  L$F.L$info = L$FUNC_90;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_91;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_rootX)))
);};
  L$F.L$info = L$FUNC_98;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_99;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_100;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_101;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_102;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_103;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeRootY", 1, "nodeRootY st = st \\svg width height rootX rootY . rootY", lazy((function(){
  var L$F = function(L_st){return resolve(L_st)(lazy((function(){
  var L$F = function(L_svg){return (function(){
  var L$F = function(L_width){return (function(){
  var L$F = function(L_height){return (function(){
  var L$F = function(L_rootX){return (function(){
  var L$F = function(L_rootY){return resolve(L_rootY);};
  L$F.L$info = L$FUNC_110;
  return L$F;
})();};
  L$F.L$info = L$FUNC_111;
  return L$F;
})();};
  L$F.L$info = L$FUNC_112;
  return L$F;
})();};
  L$F.L$info = L$FUNC_113;
  return L$F;
})();};
  L$F.L$info = L$FUNC_114;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_115;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_st){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_rootY)))
);};
  L$F.L$info = L$FUNC_122;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_123;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_124;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_125;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_126;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_127;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("space", 0, "space = 10", 10, 10);
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("border", 0, "border = 5", 5, 5);
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeTranslate", 3, "nodeTranslate st x y = st \\svg width height rootX rootY . makeNode\n  translate svg x y\n  width\n  height\n  rootX + x\n  rootY + y", lazy((function(){
  var L$F = function(L_st, L_x, L_y) {
  return L_checkPartial(L$F, arguments) || resolve(L_st)(lazy((function(){
  var L$F = function(L_svg){return (function(){
  var L$F = function(L_width){return (function(){
  var L$F = function(L_height){return (function(){
  var L$F = function(L_rootX){return (function(){
  var L$F = function(L_rootY){return resolve(L_makeNode)(function(){
  return resolve(L_translate)(L_svg, L_x, L_y);
}, L_width, L_height, function(){
  return resolve(L_$o)(L_rootX, L_x);
}, function(){
  return resolve(L_$o)(L_rootY, L_y);
});};
  L$F.L$info = L$FUNC_134;
  return L$F;
})();};
  L$F.L$info = L$FUNC_135;
  return L$F;
})();};
  L$F.L$info = L$FUNC_136;
  return L$F;
})();};
  L$F.L$info = L$FUNC_137;
  return L$F;
})();};
  L$F.L$info = L$FUNC_138;
  return L$F;
})()));
};;
  L$F.L$info = L$FUNC_139;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_st, L_x, L_y) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_st)(lazy((function(L$instance, L$parent){
  var L$F = function(L_svg){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_width){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_height){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootX){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_rootY){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_makeNode)((function(L$instance, L$parent) {
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
  L$F.L$info = L$FUNC_146;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_147;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_148;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_149;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_150;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.L$info = L$FUNC_151;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeLine", 2, "nodeLine n1 n2 = n1 \\s1 w1 h1 x1 y1 . n2 \\s2 w2 h2 x2 y2 .\n  line [['x1'|x1] ['y1'|y1] ['x2'|x2] ['y2'|y2] ['stroke-width'|3] | defaultLineMap]", lazy((function(){
  var L$F = function(L_n1, L_n2) {
  return L_checkPartial(L$F, arguments) || resolve(L_n1)(lazy((function(){
  var L$F = function(L_s1){return (function(){
  var L$F = function(L_w1){return (function(){
  var L$F = function(L_h1){return (function(){
  var L$F = function(L_x1){return (function(){
  var L$F = function(L_y1){return resolve(L_n2)(lazy((function(){
  var L$F = function(L_s2){return (function(){
  var L$F = function(L_w2){return (function(){
  var L$F = function(L_h2){return (function(){
  var L$F = function(L_x2){return (function(){
  var L$F = function(L_y2){return resolve(L_line)(function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x1", L_x1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y1", L_y1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x2", L_x2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y2", L_y2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 3);
}, L_defaultLineMap);
});
});
});
});
});};
  L$F.L$info = L$FUNC_163;
  return L$F;
})();};
  L$F.L$info = L$FUNC_164;
  return L$F;
})();};
  L$F.L$info = L$FUNC_165;
  return L$F;
})();};
  L$F.L$info = L$FUNC_166;
  return L$F;
})();};
  L$F.L$info = L$FUNC_167;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_168;
  return L$F;
})();};
  L$F.L$info = L$FUNC_169;
  return L$F;
})();};
  L$F.L$info = L$FUNC_170;
  return L$F;
})();};
  L$F.L$info = L$FUNC_171;
  return L$F;
})();};
  L$F.L$info = L$FUNC_172;
  return L$F;
})()));
};;
  L$F.L$info = L$FUNC_173;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_n1, L_n2) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_n1)(lazy((function(L$instance, L$parent){
  var L$F = function(L_s1){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_w1){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_h1){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_x1){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_y1){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_n2)(lazy((function(L$instance, L$parent){
  var L$F = function(L_s2){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_w2){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_h2){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_x2){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_y2){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_line)((function(L$instance, L$parent) {
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
  L$F.L$info = L$FUNC_185;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_186;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_187;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_188;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_189;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_190;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_191;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_192;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_193;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_194;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.L$info = L$FUNC_195;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("rangeContainsRange", 4, "rangeContainsRange start end innerStart innerEnd = and (lte start innerStart) (lte innerEnd end)", lazy((function(){
  var L$F = function(L_start, L_end, L_innerStart, L_innerEnd) {
  return L_checkPartial(L$F, arguments) || resolve(L_and)(function(){
  return L$(resolve(L_lte))(L_start, L_innerStart);
}, function(){
  return L$(resolve(L_lte))(L_innerEnd, L_end);
});
};;
  L$F.L$info = L$FUNC_197;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_start, L_end, L_innerStart, L_innerEnd) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_and)((function(L$instance, L$parent) {
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
  L$F.L$info = L$FUNC_199;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("highlight", 1, "highlight map = do\n  c = assocGetWithDefault 'fill' map nil\n  eq c '#fcc'\n    assocSet 'fill' 'red' map\n    eq c '#cfc'\n      assocSet 'fill' 'green' map\n      eq c '#ccf'\n        assocSet 'fill' 'blue' map\n        map", lazy((function(){
  var L$F = function(L_map){return (function(){  var L_c;
  L_c = function(){
  return resolve(L_assocGetWithDefault)("fill", L_map, L_nil);
};

  return resolve(L_eq)(L_c, "#fcc")(function(){
  return L$(resolve(L_assocSet))("fill", "red", L_map);
})(function(){
  return resolve(L_eq)(L_c, "#cfc")(function(){
  return L$(resolve(L_assocSet))("fill", "green", L_map);
})(function(){
  return resolve(L_eq)(L_c, "#ccf")(function(){
  return L$(resolve(L_assocSet))("fill", "blue", L_map);
})(L_map);
});
})})();};
  L$F.L$info = L$FUNC_201;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(){  var L_c;
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
  L$F.L$info = L$FUNC_203;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("treeFor", 1, "treeFor ast = treeForWith ast \\ast map . map", lazy((function(){
  var L$F = function(L_ast){return resolve(L_treeForWith)(L_ast, lazy((function(){
  var L$F = function(L_ast_0){return (function(){
  var L$F = function(L_map){return resolve(L_map);};
  L$F.L$info = L$FUNC_207;
  return L$F;
})();};
  L$F.L$info = L$FUNC_208;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_209;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_ast){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_treeForWith)(L_ast, lazy((function(L$instance, L$parent){
  var L$F = function(L_ast_0){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_map)))
);};
  L$F.L$info = L$FUNC_213;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_214;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);};
  L$F.L$info = L$FUNC_215;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("treeForWith", 2, "treeForWith ast mapFunc = nodeSvg (nodeFor ast mapFunc)", lazy((function(){
  var L$F = function(L_ast, L_mapFunc) {
  return L_checkPartial(L$F, arguments) || resolve(L_nodeSvg)(function(){
  return resolve(L_nodeFor)(L_ast, L_mapFunc);
});
};;
  L$F.L$info = L$FUNC_217;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_nodeSvg)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 76, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_ast, L_mapFunc));
  });
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.L$info = L$FUNC_219;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("wrappedTreeFor", 1, "wrappedTreeFor ast = do\n  content = nodeFor ast \\ast map . map\n  svg (nodeSvg content) {'width':(border + (nodeWidth content)) 'height':(border + (nodeHeight content))}", lazy((function(){
  var L$F = function(L_ast){return (function(){  var L_content;
  L_content = function(){
  return resolve(L_nodeFor)(L_ast, lazy((function(){
  var L$F = function(L_ast_0){return (function(){
  var L$F = function(L_map){return resolve(L_map);};
  L$F.L$info = L$FUNC_223;
  return L$F;
})();};
  L$F.L$info = L$FUNC_224;
  return L$F;
})()));
};

  return resolve(L_svg)(function(){
  return resolve(L_nodeSvg)(L_content);
}, function(){
  return resolve(L_aconsPair)(function(){
  return resolve(L_cons)("width", function(){
  return resolve(L_$o)(L_border, function(){
  return resolve(L_nodeWidth)(L_content);
});
});
}, function(){
  return resolve(L_aconsPair)(function(){
  return resolve(L_cons)("height", function(){
  return resolve(L_$o)(L_border, function(){
  return resolve(L_nodeHeight)(L_content);
});
});
}, L_nil);
});
})})();};
  L$F.L$info = L$FUNC_225;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_ast){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(){  var L_content;
  L_content = (function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 80, function(){
    return Leisure_traceResolveStd(L$instance, resolve(L_nodeFor)(L_ast, lazy((function(L$instance, L$parent){
  var L$F = function(L_ast_0){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_map){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_map)))
);};
  L$F.L$info = L$FUNC_229;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_230;
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
  L$F.L$info = L$FUNC_231;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("nodeFor", 2, "nodeFor ast mapFunc = do\n  t = getType ast\n  eq t 'lit'\n    createLitNode ast (show (ast \\v p . v)) mapFunc\n    eq t 'ref'\n      createRefNode ast (show (ast \\n p . n)) mapFunc\n      eq t 'lambda'\n        ast (\\v b p . createLambdaNode ast v b mapFunc)\n        eq t 'apply'\n          ast (\\f a . createApplyNode ast f a mapFunc)\n          eq t 'anno'\n            #ast (\\n d b . createApplyNode ast f a mapFunc)\n            ast (\\n d b . nodeFor b mapFunc)\n            log 2 makeNode (svgNode '') 0 0 0 0", lazy((function(){
  var L$F = function(L_ast, L_mapFunc) {
  return L_checkPartial(L$F, arguments) || (function(){  var L_t;
  L_t = function(){
  return resolve(L_getType)(L_ast);
};

  return resolve(L_eq)(L_t, "lit")(function(){
  return resolve(L_createLitNode)(L_ast, function(){
  return resolve(L_show)(function(){
  return resolve(L_ast)(lazy((function(){
  var L$F = function(L_v){return (function(){
  var L$F = function(L_p){return resolve(L_v);};
  L$F.L$info = L$FUNC_235;
  return L$F;
})();};
  L$F.L$info = L$FUNC_236;
  return L$F;
})()));
});
}, L_mapFunc);
})(function(){
  return resolve(L_eq)(L_t, "ref")(function(){
  return resolve(L_createRefNode)(L_ast, function(){
  return resolve(L_show)(function(){
  return resolve(L_ast)(lazy((function(){
  var L$F = function(L_n){return (function(){
  var L$F = function(L_p){return resolve(L_n);};
  L$F.L$info = L$FUNC_239;
  return L$F;
})();};
  L$F.L$info = L$FUNC_240;
  return L$F;
})()));
});
}, L_mapFunc);
})(function(){
  return resolve(L_eq)(L_t, "lambda")(function(){
  return resolve(L_ast)(lazy((function(){
  var L$F = function(L_v){return (function(){
  var L$F = function(L_b){return (function(){
  var L$F = function(L_p){return resolve(L_createLambdaNode)(L_ast, L_v, L_b, L_mapFunc);};
  L$F.L$info = L$FUNC_244;
  return L$F;
})();};
  L$F.L$info = L$FUNC_245;
  return L$F;
})();};
  L$F.L$info = L$FUNC_246;
  return L$F;
})()));
})(function(){
  return resolve(L_eq)(L_t, "apply")(function(){
  return resolve(L_ast)(lazy((function(){
  var L$F = function(L_f){return (function(){
  var L$F = function(L_a){return resolve(L_createApplyNode)(L_ast, L_f, L_a, L_mapFunc);};
  L$F.L$info = L$FUNC_249;
  return L$F;
})();};
  L$F.L$info = L$FUNC_250;
  return L$F;
})()));
})(function(){
  return resolve(L_eq)(L_t, "anno")(function(){
  return resolve(L_ast)(lazy((function(){
  var L$F = function(L_n){return (function(){
  var L$F = function(L_d){return (function(){
  var L$F = function(L_b){return resolve(L_nodeFor)(L_b, L_mapFunc);};
  L$F.L$info = L$FUNC_254;
  return L$F;
})();};
  L$F.L$info = L$FUNC_255;
  return L$F;
})();};
  L$F.L$info = L$FUNC_256;
  return L$F;
})()));
})(function(){
  return resolve(L_log)(2, L_makeNode)(function(){
  return resolve(L_svgNode)("");
})(0)(0)(0)(0);
});
});
});
});
})})();
};;
  L$F.L$info = L$FUNC_257;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(){  var L_t;
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
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_p){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_v)))
);};
  L$F.L$info = L$FUNC_261;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_262;
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
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_p){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_n)))
);};
  L$F.L$info = L$FUNC_265;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_266;
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
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_b){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_p){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_createLambdaNode)(L_ast, L_v, L_b, L_mapFunc)))
);};
  L$F.L$info = L$FUNC_270;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_271;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_272;
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
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_a){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_createApplyNode)(L_ast, L_f, L_a, L_mapFunc)))
);};
  L$F.L$info = L$FUNC_275;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_276;
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
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_d){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_b){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_nodeFor)(L_b, L_mapFunc)))
);};
  L$F.L$info = L$FUNC_280;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_281;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_282;
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
  L$F.L$info = L$FUNC_283;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("redStyle", 0, "redStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#fcc'] ['rx'|8] ['ry'|8]]", function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "#fcc");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("rx", 8);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("ry", 8);
}, L_nil);
});
});
});
});
}, function(){
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
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "#cfc");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("rx", 8);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("ry", 8);
}, L_nil);
});
});
});
});
}, function(){
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
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke", "black");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("stroke-width", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("fill", "#ccf");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("rx", 8);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("ry", 8);
}, L_nil);
});
});
});
});
}, function(){
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
  return resolve(L_newDefine)("createLambdaNode", 4, "createLambdaNode ast v b mapFunc = do\n  rootBox = textNode (mapFunc ast greenStyle) 'lambda'\n  varBox = textNode (mapFunc ast greenStyle) v\n  bodyTree = nodeFor b mapFunc\n  childWidth = (nodeWidth varBox) + space + (nodeWidth bodyTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  varBox = nodeTranslate varBox pad (nodeHeight rootBox) + space\n  bodyTree = nodeTranslate bodyTree (pad + (nodeWidth varBox) + space) ((nodeHeight rootBox) + space)\n  log 3 makeNode\n    svgConcat [(nodeLine rootBox varBox) (nodeLine rootBox bodyTree) (nodeSvg varBox) (nodeSvg bodyTree) (nodeSvg rootBox)]\n    totalWidth\n    (nodeHeight rootBox) + space + (max (nodeHeight varBox) (nodeHeight bodyTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2", lazy((function(){
  var L$F = function(L_ast, L_v, L_b, L_mapFunc) {
  return L_checkPartial(L$F, arguments) || (function(){  var L_rootBox, L_varBox, L_bodyTree, L_childWidth, L_totalWidth, L_pad, L_rootBox_0, L_varBox_1, L_bodyTree_2;
  L_rootBox = function(){
  return resolve(L_textNode)(function(){
  return L$(resolve(L_mapFunc))(L_ast, L_greenStyle);
}, "lambda");
};
  L_varBox = function(){
  return resolve(L_textNode)(function(){
  return L$(resolve(L_mapFunc))(L_ast, L_greenStyle);
}, L_v);
};
  L_bodyTree = function(){
  return resolve(L_nodeFor)(L_b, L_mapFunc);
};
  L_childWidth = function(){
  return resolve(L_$o)(function(){
  return resolve(L_$o)(function(){
  return resolve(L_nodeWidth)(L_varBox);
}, L_space);
}, function(){
  return resolve(L_nodeWidth)(L_bodyTree);
});
};
  L_totalWidth = function(){
  return resolve(L_max)(L_childWidth, function(){
  return resolve(L_nodeWidth)(L_rootBox);
});
};
  L_pad = function(){
  return resolve(L_max)(0, function(){
  return resolve(L_$f)(function(){
  return resolve(L_$_)(L_totalWidth, L_childWidth);
}, 2);
});
};
  L_rootBox_0 = function(){
  return resolve(L_nodeTranslate)(L_rootBox, function(){
  return resolve(L_$_)(function(){
  return resolve(L_$f)(L_totalWidth, 2);
}, function(){
  return resolve(L_$f)(function(){
  return resolve(L_nodeWidth)(L_rootBox);
}, 2);
});
}, 0);
};
  L_varBox_1 = function(){
  return resolve(L_nodeTranslate)(L_varBox, L_pad, function(){
  return resolve(L_$o)(function(){
  return resolve(L_nodeHeight)(L_rootBox_0);
}, L_space);
});
};
  L_bodyTree_2 = function(){
  return resolve(L_nodeTranslate)(L_bodyTree, function(){
  return resolve(L_$o)(function(){
  return resolve(L_$o)(L_pad, function(){
  return resolve(L_nodeWidth)(L_varBox_1);
});
}, L_space);
}, function(){
  return resolve(L_$o)(function(){
  return resolve(L_nodeHeight)(L_rootBox_0);
}, L_space);
});
};

  return resolve(L_log)(3, L_makeNode)(function(){
  return resolve(L_svgConcat)(function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeLine)(L_rootBox_0, L_varBox_1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeLine)(L_rootBox_0, L_bodyTree_2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeSvg)(L_varBox_1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeSvg)(L_bodyTree_2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeSvg)(L_rootBox_0);
}, L_nil);
});
});
});
});
});
})(L_totalWidth)(function(){
  return resolve(L_$o)(function(){
  return resolve(L_$o)(function(){
  return resolve(L_nodeHeight)(L_rootBox_0);
}, L_space);
}, function(){
  return resolve(L_max)(function(){
  return resolve(L_nodeHeight)(L_varBox_1);
}, function(){
  return resolve(L_nodeHeight)(L_bodyTree_2);
});
});
})(function(){
  return resolve(L_$f)(L_totalWidth, 2);
})(function(){
  return resolve(L_$f)(function(){
  return resolve(L_nodeHeight)(L_rootBox_0);
}, 2);
})})();
};;
  L$F.L$info = L$FUNC_285;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_v, L_b, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(){  var L_rootBox, L_varBox, L_bodyTree, L_childWidth, L_totalWidth, L_pad, L_rootBox_0, L_varBox_1, L_bodyTree_2;
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
  L$F.L$info = L$FUNC_287;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createApplyNode", 4, "createApplyNode ast f a mapFunc = do\n  rootBox = textNode (mapFunc ast blueStyle) 'apply'\n  funcTree = nodeFor f mapFunc\n  argTree = nodeFor a mapFunc\n  childWidth = (nodeWidth argTree) + space + (nodeWidth funcTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  funcTree = nodeTranslate funcTree pad (nodeHeight rootBox) + space\n  argTree = nodeTranslate argTree (pad + (nodeWidth funcTree) + space) ((nodeHeight rootBox) + space)\n  makeNode\n    svgConcat [(nodeLine rootBox funcTree) (nodeLine rootBox argTree) (nodeSvg rootBox) (nodeSvg funcTree) (nodeSvg argTree)]\n    totalWidth\n    (nodeHeight rootBox) + space + (max (nodeHeight argTree) (nodeHeight funcTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2", lazy((function(){
  var L$F = function(L_ast, L_f, L_a, L_mapFunc) {
  return L_checkPartial(L$F, arguments) || (function(){  var L_rootBox, L_funcTree, L_argTree, L_childWidth, L_totalWidth, L_pad, L_rootBox_0, L_funcTree_1, L_argTree_2;
  L_rootBox = function(){
  return resolve(L_textNode)(function(){
  return L$(resolve(L_mapFunc))(L_ast, L_blueStyle);
}, "apply");
};
  L_funcTree = function(){
  return resolve(L_nodeFor)(L_f, L_mapFunc);
};
  L_argTree = function(){
  return resolve(L_nodeFor)(L_a, L_mapFunc);
};
  L_childWidth = function(){
  return resolve(L_$o)(function(){
  return resolve(L_$o)(function(){
  return resolve(L_nodeWidth)(L_argTree);
}, L_space);
}, function(){
  return resolve(L_nodeWidth)(L_funcTree);
});
};
  L_totalWidth = function(){
  return resolve(L_max)(L_childWidth, function(){
  return resolve(L_nodeWidth)(L_rootBox);
});
};
  L_pad = function(){
  return resolve(L_max)(0, function(){
  return resolve(L_$f)(function(){
  return resolve(L_$_)(L_totalWidth, L_childWidth);
}, 2);
});
};
  L_rootBox_0 = function(){
  return resolve(L_nodeTranslate)(L_rootBox, function(){
  return resolve(L_$_)(function(){
  return resolve(L_$f)(L_totalWidth, 2);
}, function(){
  return resolve(L_$f)(function(){
  return resolve(L_nodeWidth)(L_rootBox);
}, 2);
});
}, 0);
};
  L_funcTree_1 = function(){
  return resolve(L_nodeTranslate)(L_funcTree, L_pad, function(){
  return resolve(L_$o)(function(){
  return resolve(L_nodeHeight)(L_rootBox_0);
}, L_space);
});
};
  L_argTree_2 = function(){
  return resolve(L_nodeTranslate)(L_argTree, function(){
  return resolve(L_$o)(function(){
  return resolve(L_$o)(L_pad, function(){
  return resolve(L_nodeWidth)(L_funcTree_1);
});
}, L_space);
}, function(){
  return resolve(L_$o)(function(){
  return resolve(L_nodeHeight)(L_rootBox_0);
}, L_space);
});
};

  return resolve(L_makeNode)(function(){
  return resolve(L_svgConcat)(function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeLine)(L_rootBox_0, L_funcTree_1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeLine)(L_rootBox_0, L_argTree_2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeSvg)(L_rootBox_0);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeSvg)(L_funcTree_1);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_nodeSvg)(L_argTree_2);
}, L_nil);
});
});
});
});
});
}, L_totalWidth, function(){
  return resolve(L_$o)(function(){
  return resolve(L_$o)(function(){
  return resolve(L_nodeHeight)(L_rootBox_0);
}, L_space);
}, function(){
  return resolve(L_max)(function(){
  return resolve(L_nodeHeight)(L_argTree_2);
}, function(){
  return resolve(L_nodeHeight)(L_funcTree_1);
});
});
}, function(){
  return resolve(L_$f)(L_totalWidth, 2);
}, function(){
  return resolve(L_$f)(function(){
  return resolve(L_nodeHeight)(L_rootBox_0);
}, 2);
})})();
};;
  L$F.L$info = L$FUNC_289;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_f, L_a, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(){  var L_rootBox, L_funcTree, L_argTree, L_childWidth, L_totalWidth, L_pad, L_rootBox_0, L_funcTree_1, L_argTree_2;
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
  L$F.L$info = L$FUNC_291;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createRefNode", 3, "createRefNode ast ref mapFunc = textNode (mapFunc ast redStyle) ref", lazy((function(){
  var L$F = function(L_ast, L_ref, L_mapFunc) {
  return L_checkPartial(L$F, arguments) || resolve(L_textNode)(function(){
  return L$(resolve(L_mapFunc))(L_ast, L_redStyle);
}, L_ref);
};;
  L$F.L$info = L$FUNC_293;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_ref, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 244, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_redStyle));
  });
})(++Leisure_traceInstance, L$instance), L_ref)))
);
};;
  L$F.L$info = L$FUNC_295;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("createLitNode", 3, "createLitNode ast lit mapFunc = textNode (mapFunc ast greenStyle) lit", lazy((function(){
  var L$F = function(L_ast, L_lit, L_mapFunc) {
  return L_checkPartial(L$F, arguments) || resolve(L_textNode)(function(){
  return L$(resolve(L_mapFunc))(L_ast, L_greenStyle);
}, L_lit);
};;
  L$F.L$info = L$FUNC_297;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_ast, L_lit, L_mapFunc) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (resolve(L_textNode)((function(L$instance, L$parent) {
  return Leisure_traceLazyValueStd(L$instance, L$context, 246, function(){
    return Leisure_traceResolveStd(L$instance, L$(resolve(L_mapFunc))(L_ast, L_greenStyle));
  });
})(++Leisure_traceInstance, L$instance), L_lit)))
);
};;
  L$F.L$info = L$FUNC_299;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)},
    function(){return (function(L$instance){
  var L$ret;
  return resolve(L_newDefine)("textNode", 2, "textNode map txt = (svgMeasureText txt '') \\w h . do\n  nodeW = w + 24\n  nodeH = h + 14\n  makeNode\n    (svgConcat [(rect [['x'|2] ['y'|2] ['width'|nodeW] ['height'|nodeH] | map]) (text txt [['pointer-events' | 'none'] ['text-anchor'|\"middle\"] ['dominant-baseline'|\"mathematical\"] ['x'| 14 + w / 2] ['y'| border + h / 2] ['font-weight'|'bold']])])\n    nodeW\n    nodeH\n    nodeW / 2\n    nodeH / 2", lazy((function(){
  var L$F = function(L_map, L_txt) {
  return L_checkPartial(L$F, arguments) || L$(resolve(L_svgMeasureText))(L_txt, "", lazy((function(){
  var L$F = function(L_w){return (function(){
  var L$F = function(L_h){return (function(){  var L_nodeW, L_nodeH;
  L_nodeW = function(){
  return resolve(L_$o)(L_w, 24);
};
  L_nodeH = function(){
  return resolve(L_$o)(L_h, 14);
};

  return resolve(L_makeNode)(function(){
  return resolve(L_svgConcat)(function(){
  return resolve(L_cons)(function(){
  return resolve(L_rect)(function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y", 2);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("width", L_nodeW);
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("height", L_nodeH);
}, L_map);
});
});
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_text)(L_txt, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("pointer-events", "none");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("text-anchor", "middle");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("dominant-baseline", "mathematical");
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("x", function(){
  return resolve(L_$o)(14, function(){
  return resolve(L_$f)(L_w, 2);
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("y", function(){
  return resolve(L_$o)(L_border, function(){
  return resolve(L_$f)(L_h, 2);
});
});
}, function(){
  return resolve(L_cons)(function(){
  return resolve(L_cons)("font-weight", "bold");
}, L_nil);
});
});
});
});
});
});
}, L_nil);
});
});
}, L_nodeW, L_nodeH, function(){
  return resolve(L_$f)(L_nodeW, 2);
}, function(){
  return resolve(L_$f)(L_nodeH, 2);
})})();};
  L$F.L$info = L$FUNC_303;
  return L$F;
})();};
  L$F.L$info = L$FUNC_304;
  return L$F;
})()));
};;
  L$F.L$info = L$FUNC_305;
  return L$F;
})()), lazy((function(L$instance, L$parent){
  var L$F = function(L_map, L_txt) {
  return L_checkPartial(L$F, arguments, Leisure_traceCreatePartialStd, Leisure_traceCallPartialStd) || (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, (L$(resolve(L_svgMeasureText))(L_txt, "", lazy((function(L$instance, L$parent){
  var L$F = function(L_w){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(L$instance, L$parent){
  var L$F = function(L_h){return (
  Leisure_traceCallStd(L$F, arguments),
  Leisure_traceReturnStd(L$F, ((function(){  var L_nodeW, L_nodeH;
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
  L$F.L$info = L$FUNC_309;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))
);};
  L$F.L$info = L$FUNC_310;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)))))
);
};;
  L$F.L$info = L$FUNC_311;
  L$F.L$instanceId = L$instance;
  L$F.L$parentId = L$parent;
  return Leisure_traceLambdaStd(L$F);
})(++Leisure_traceInstance, L$instance)));
})(++Leisure_traceInstance)}
  ]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlQXN0LmxzciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQW9DQTtBQUFBO0FBQUEsNkhBQVM7QUFBQTtBQUFBLDJDQUFnQztBQUFBLGlDQUFJLHdEQUFKO0FBQUE7QUFBQTtBQUFBLGlCQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUFULEVBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBZ0M7QUFBQTtBQUFBO0FBQUEsK0JBQUksd0RBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsb0RBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscURBQVQ7QUFBQSw0QkFwQ0E7QUFBQSxJQXNDQTtBQUFBO0FBQUEsb0dBQVE7QUFBQSxrQ0FBSyxjQUFJO0FBQUEsbUNBQUk7QUFBQSxxQ0FBTTtBQUFBLHNDQUFPO0FBQUEscUNBQU07QUFBQSxxQ0FBUSxjQUFSO0FBQUE7QUFBQTtBQUFBLElBQU47QUFBQTtBQUFBO0FBQUEsSUFBUDtBQUFBO0FBQUE7QUFBQSxJQUFOO0FBQUE7QUFBQTtBQUFBLElBQUo7QUFBQTtBQUFBO0FBQUEsS0FBSixDQUFMO0FBQUE7QUFBQTtBQUFBLEtBQVIsRUFBUTtBQUFBO0FBQUE7QUFBQSwrQkFBSyxjQUFJO0FBQUE7QUFBQTtBQUFBLCtCQUFJO0FBQUE7QUFBQTtBQUFBLCtCQUFNO0FBQUE7QUFBQTtBQUFBLCtCQUFPO0FBQUE7QUFBQTtBQUFBLCtCQUFNO0FBQUE7QUFBQTtBQUFBLCtCQUFRLGNBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQUosQ0FBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBUjtBQUFBLDRCQXRDQTtBQUFBLElBdUNBO0FBQUE7QUFBQSwwR0FBVTtBQUFBLGtDQUFLLGNBQUk7QUFBQSxtQ0FBSTtBQUFBLHFDQUFNO0FBQUEsc0NBQU87QUFBQSxxQ0FBTTtBQUFBLHFDQUFRLGdCQUFSO0FBQUE7QUFBQTtBQUFBLElBQU47QUFBQTtBQUFBO0FBQUEsSUFBUDtBQUFBO0FBQUE7QUFBQSxJQUFOO0FBQUE7QUFBQTtBQUFBLElBQUo7QUFBQTtBQUFBO0FBQUEsS0FBSixDQUFMO0FBQUE7QUFBQTtBQUFBLEtBQVYsRUFBVTtBQUFBO0FBQUE7QUFBQSwrQkFBSyxjQUFJO0FBQUE7QUFBQTtBQUFBLCtCQUFJO0FBQUE7QUFBQTtBQUFBLCtCQUFNO0FBQUE7QUFBQTtBQUFBLCtCQUFPO0FBQUE7QUFBQTtBQUFBLCtCQUFNO0FBQUE7QUFBQTtBQUFBLCtCQUFRLGdCQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFKLENBQUw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVY7QUFBQSw0QkF2Q0E7QUFBQSxJQXdDQTtBQUFBO0FBQUEsNkdBQVc7QUFBQSxrQ0FBSyxjQUFJO0FBQUEsbUNBQUk7QUFBQSxxQ0FBTTtBQUFBLHNDQUFPO0FBQUEscUNBQU07QUFBQSxxQ0FBUSxpQkFBUjtBQUFBO0FBQUE7QUFBQSxJQUFOO0FBQUE7QUFBQTtBQUFBLElBQVA7QUFBQTtBQUFBO0FBQUEsSUFBTjtBQUFBO0FBQUE7QUFBQSxJQUFKO0FBQUE7QUFBQTtBQUFBLEtBQUosQ0FBTDtBQUFBO0FBQUE7QUFBQSxLQUFYLEVBQVc7QUFBQTtBQUFBO0FBQUEsK0JBQUssY0FBSTtBQUFBO0FBQUE7QUFBQSwrQkFBSTtBQUFBO0FBQUE7QUFBQSwrQkFBTTtBQUFBO0FBQUE7QUFBQSwrQkFBTztBQUFBO0FBQUE7QUFBQSwrQkFBTTtBQUFBO0FBQUE7QUFBQSwrQkFBUSxpQkFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBSixDQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFYO0FBQUEsNEJBeENBO0FBQUEsSUF5Q0E7QUFBQTtBQUFBLDBHQUFVO0FBQUEsa0NBQUssY0FBSTtBQUFBLG1DQUFJO0FBQUEscUNBQU07QUFBQSxzQ0FBTztBQUFBLHFDQUFNO0FBQUEscUNBQVEsZ0JBQVI7QUFBQTtBQUFBO0FBQUEsSUFBTjtBQUFBO0FBQUE7QUFBQSxJQUFQO0FBQUE7QUFBQTtBQUFBLElBQU47QUFBQTtBQUFBO0FBQUEsSUFBSjtBQUFBO0FBQUE7QUFBQSxLQUFKLENBQUw7QUFBQTtBQUFBO0FBQUEsS0FBVixFQUFVO0FBQUE7QUFBQTtBQUFBLCtCQUFLLGNBQUk7QUFBQTtBQUFBO0FBQUEsK0JBQUk7QUFBQTtBQUFBO0FBQUEsK0JBQU07QUFBQTtBQUFBO0FBQUEsK0JBQU87QUFBQTtBQUFBO0FBQUEsK0JBQU07QUFBQTtBQUFBO0FBQUEsK0JBQVEsZ0JBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQUosQ0FBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBVjtBQUFBLDRCQXpDQTtBQUFBLElBMENBO0FBQUE7QUFBQSwwR0FBVTtBQUFBLGtDQUFLLGNBQUk7QUFBQSxtQ0FBSTtBQUFBLHFDQUFNO0FBQUEsc0NBQU87QUFBQSxxQ0FBTTtBQUFBLHFDQUFRLGdCQUFSO0FBQUE7QUFBQTtBQUFBLElBQU47QUFBQTtBQUFBO0FBQUEsSUFBUDtBQUFBO0FBQUE7QUFBQSxJQUFOO0FBQUE7QUFBQTtBQUFBLElBQUo7QUFBQTtBQUFBO0FBQUEsS0FBSixDQUFMO0FBQUE7QUFBQTtBQUFBLEtBQVYsRUFBVTtBQUFBO0FBQUE7QUFBQSwrQkFBSyxjQUFJO0FBQUE7QUFBQTtBQUFBLCtCQUFJO0FBQUE7QUFBQTtBQUFBLCtCQUFNO0FBQUE7QUFBQTtBQUFBLCtCQUFPO0FBQUE7QUFBQTtBQUFBLCtCQUFNO0FBQUE7QUFBQTtBQUFBLCtCQUFRLGdCQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFKLENBQUw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVY7QUFBQSw0QkExQ0E7QUFBQSxJQTRDQTtBQUFBO0FBQUEsd0RBQVEsRUFBUixFQUFRLEVBQVI7QUFBQSw0QkE1Q0E7QUFBQSxJQTZDQTtBQUFBO0FBQUEseURBQVMsQ0FBVCxFQUFTLENBQVQ7QUFBQSw0QkE3Q0E7QUFBQSxJQStDQTtBQUFBO0FBQUEsMkxBQWM7QUFBQTtBQUFBLDJDQUFTLGNBQUk7QUFBQSxtQ0FBSTtBQUFBLHFDQUFNO0FBQUEsc0NBQU87QUFBQSxxQ0FBTTtBQUFBLHFDQUFRLG9CQUN4RDtBQUFBLDhCQUFVLEtBQVYsRUFBYyxHQUFkLEVBQWdCLEdBQWhCO0FBQUEsQ0FEd0QsRUFFeEQsT0FGd0QsRUFHeEQsUUFId0QsRUFJeEQ7QUFBQSxTQUFNLGFBQU4sVUFBUSxHQUFSO0FBQUEsQ0FKd0QsRUFLeEQ7QUFBQSxTQUFNLGFBQU4sVUFBUSxHQUFSO0FBQUEsQ0FMd0QsQ0FBUjtBQUFBO0FBQUE7QUFBQSxJQUFOO0FBQUE7QUFBQTtBQUFBLElBQVA7QUFBQTtBQUFBO0FBQUEsSUFBTjtBQUFBO0FBQUE7QUFBQSxJQUFKO0FBQUE7QUFBQTtBQUFBLEtBQUosQ0FBVDtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQWQsRUFBYztBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUFTLGNBQUk7QUFBQTtBQUFBO0FBQUEsK0JBQUk7QUFBQTtBQUFBO0FBQUEsK0JBQU07QUFBQTtBQUFBO0FBQUEsK0JBQU87QUFBQTtBQUFBO0FBQUEsK0JBQU07QUFBQTtBQUFBO0FBQUEsK0JBQVEsb0JBQ3hEO0FBQUE7QUFBQSxvRUFBVSxLQUFWLEVBQWMsR0FBZCxFQUFnQixHQUFoQjtBQUFBO0FBQUEsdUNBRHdELEVBRXhELE9BRndELEVBR3hELFFBSHdELEVBSXhEO0FBQUE7QUFBQSwrQ0FBTSxhQUFOLFVBQVEsR0FBUjtBQUFBO0FBQUEsdUNBSndELEVBS3hEO0FBQUE7QUFBQSwrQ0FBTSxhQUFOLFVBQVEsR0FBUjtBQUFBO0FBQUEsdUNBTHdELENBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQUosQ0FBVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFkO0FBQUEsNEJBL0NBO0FBQUEsSUFzREE7QUFBQTtBQUFBLG1NQUFTO0FBQUE7QUFBQSwyQ0FBUSxjQUFJO0FBQUEsa0NBQUc7QUFBQSxrQ0FBRztBQUFBLGtDQUFHO0FBQUEsa0NBQUc7QUFBQSxrQ0FBSyxjQUFJO0FBQUEsa0NBQUc7QUFBQSxrQ0FBRztBQUFBLGtDQUFHO0FBQUEsa0NBQUc7QUFBQSxrQ0FDcEQsZ0JBQU87QUFBQTtBQUFBLCtCQUFLLElBQUw7QUFBQSxHQUFVO0FBQUE7QUFBQSwrQkFBSyxJQUFMO0FBQUEsR0FBVTtBQUFBO0FBQUEsK0JBQUssSUFBTDtBQUFBLEdBQVU7QUFBQTtBQUFBLCtCQUFLLElBQUw7QUFBQSxHQUFVO0FBQUE7QUFBQSx5Q0FBZSxDQUFmO0FBQUEsR0FBb0IsZ0JBQXBCO0FBQUEsQ0FBVjtBQUFBLENBQVY7QUFBQSxDQUFWO0FBQUEsQ0FBVjtBQUFBLENBQVAsQ0FEb0Q7QUFBQTtBQUFBO0FBQUEsSUFBSDtBQUFBO0FBQUE7QUFBQSxJQUFIO0FBQUE7QUFBQTtBQUFBLElBQUg7QUFBQTtBQUFBO0FBQUEsSUFBSDtBQUFBO0FBQUE7QUFBQSxLQUFKLENBQUw7QUFBQTtBQUFBO0FBQUEsSUFBSDtBQUFBO0FBQUE7QUFBQSxJQUFIO0FBQUE7QUFBQTtBQUFBLElBQUg7QUFBQTtBQUFBO0FBQUEsSUFBSDtBQUFBO0FBQUE7QUFBQSxLQUFKLENBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFULEVBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBUSxjQUFJO0FBQUE7QUFBQTtBQUFBLCtCQUFHO0FBQUE7QUFBQTtBQUFBLCtCQUFHO0FBQUE7QUFBQTtBQUFBLCtCQUFHO0FBQUE7QUFBQTtBQUFBLCtCQUFHO0FBQUE7QUFBQTtBQUFBLCtCQUFLLGNBQUk7QUFBQTtBQUFBO0FBQUEsK0JBQUc7QUFBQTtBQUFBO0FBQUEsK0JBQUc7QUFBQTtBQUFBO0FBQUEsK0JBQUc7QUFBQTtBQUFBO0FBQUEsK0JBQUc7QUFBQTtBQUFBO0FBQUEsK0JBQ3BELGdCQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEscUVBQUssSUFBTDtBQUFBO0FBQUEseUNBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSxxRUFBSyxJQUFMO0FBQUE7QUFBQSx5Q0FBVTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFFQUFLLElBQUw7QUFBQTtBQUFBLHlDQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEscUVBQUssSUFBTDtBQUFBO0FBQUEseUNBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSwrRUFBZSxDQUFmO0FBQUE7QUFBQSx5Q0FBb0IsZ0JBQXBCO0FBQUE7QUFBQSx1Q0FBVjtBQUFBO0FBQUEsdUNBQVY7QUFBQTtBQUFBLHVDQUFWO0FBQUE7QUFBQSx1Q0FBVjtBQUFBO0FBQUEsdUNBQVAsQ0FEb0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQUosQ0FBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBSixDQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVQ7QUFBQSw0QkF0REE7QUFBQSxJQXlEQTtBQUFBO0FBQUEsMkpBQW1CO0FBQUE7QUFBQSwyQ0FBZ0MsZUFBSztBQUFBLDRCQUFJLE9BQUosRUFBVSxZQUFWO0FBQUEsQ0FBTCxFQUE0QjtBQUFBLDRCQUFJLFVBQUosRUFBYSxLQUFiO0FBQUEsQ0FBNUIsQ0FBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFuQixFQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUFnQyxlQUFLO0FBQUE7QUFBQSxrRUFBSSxPQUFKLEVBQVUsWUFBVjtBQUFBO0FBQUEsdUNBQUwsRUFBNEI7QUFBQTtBQUFBLGtFQUFJLFVBQUosRUFBYSxLQUFiO0FBQUE7QUFBQSx1Q0FBNUIsQ0FBaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBbkI7QUFBQSw0QkF6REE7QUFBQSxJQTJEQTtBQUFBO0FBQUEsb1JBQVU7QUFBQSxtQ0EzRFY7QUFBQSxRQTRETTtBQUFBLHdDQUFvQixNQUFwQixFQUEyQixLQUEzQixFQUErQixLQUEvQjtBQUFBLENBNUROO0FBQUE7QUFBQSxTQTZERSxjQUFHLEdBQUgsRUFBSyxNQUFMLEVBQ0U7QUFBQSxpQ0FBUyxNQUFULEVBQWdCLEtBQWhCLEVBQXNCLEtBQXRCO0FBQUEsQ0FERixFQUVFO0FBQUEsdUJBQUcsR0FBSCxFQUFLLE1BQUwsRUFDRTtBQUFBLGlDQUFTLE1BQVQsRUFBZ0IsT0FBaEIsRUFBd0IsS0FBeEI7QUFBQSxDQURGLEVBRUU7QUFBQSx1QkFBRyxHQUFILEVBQUssTUFBTCxFQUNFO0FBQUEsaUNBQVMsTUFBVCxFQUFnQixNQUFoQixFQUF1QixLQUF2QjtBQUFBLENBREYsRUFFRSxLQUZGO0FBQUEsQ0FGRjtBQUFBLENBRkYsQ0E3REYsSUEyRFU7QUFBQTtBQUFBO0FBQUEsS0FBVixFQUFVO0FBQUE7QUFBQTtBQUFBLCtCQTNEVjtBQUFBLFFBNERNO0FBQUE7QUFBQSw4RUFBb0IsTUFBcEIsRUFBMkIsS0FBM0IsRUFBK0IsS0FBL0I7QUFBQTtBQUFBLHVDQTVETjtBQUFBO0FBQUEsU0E2REUsY0FBRyxHQUFILEVBQUssTUFBTCxFQUNFO0FBQUE7QUFBQSx1RUFBUyxNQUFULEVBQWdCLEtBQWhCLEVBQXNCLEtBQXRCO0FBQUE7QUFBQSx1Q0FERixFQUVFO0FBQUE7QUFBQSw2REFBRyxHQUFILEVBQUssTUFBTCxFQUNFO0FBQUE7QUFBQSx1RUFBUyxNQUFULEVBQWdCLE9BQWhCLEVBQXdCLEtBQXhCO0FBQUE7QUFBQSx1Q0FERixFQUVFO0FBQUE7QUFBQSw2REFBRyxHQUFILEVBQUssTUFBTCxFQUNFO0FBQUE7QUFBQSx1RUFBUyxNQUFULEVBQWdCLE1BQWhCLEVBQXVCLEtBQXZCO0FBQUE7QUFBQSx1Q0FERixFQUVFLEtBRkY7QUFBQTtBQUFBLHVDQUZGO0FBQUE7QUFBQSx1Q0FGRixDQTdERixJQTJEVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBVjtBQUFBLDRCQTNEQTtBQUFBLElBcUVBO0FBQUE7QUFBQSw2RkFBUTtBQUFBLG1DQUFNLHVCQUFZLEtBQVosRUFBaUI7QUFBQSxxQ0FBSTtBQUFBLG1DQUFNLGNBQU47QUFBQTtBQUFBO0FBQUEsSUFBSjtBQUFBO0FBQUE7QUFBQSxLQUFqQixDQUFOO0FBQUE7QUFBQTtBQUFBLEtBQVIsRUFBUTtBQUFBO0FBQUE7QUFBQSwrQkFBTSx1QkFBWSxLQUFaLEVBQWlCO0FBQUE7QUFBQTtBQUFBLCtCQUFJO0FBQUE7QUFBQTtBQUFBLCtCQUFNLGNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQWpCLENBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQVI7QUFBQSw0QkFyRUE7QUFBQSxJQXVFQTtBQUFBO0FBQUEsMkdBQVk7QUFBQTtBQUFBLDJDQUFjLG1CQUFTO0FBQUEsNEJBQVEsS0FBUixFQUFZLFNBQVo7QUFBQSxDQUFULENBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFaLEVBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBYyxtQkFBUztBQUFBO0FBQUEsa0VBQVEsS0FBUixFQUFZLFNBQVo7QUFBQTtBQUFBLHVDQUFULENBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBWjtBQUFBLDRCQXZFQTtBQUFBLElBeUVBO0FBQUE7QUFBQSxrT0FBZTtBQUFBLG1DQXpFZjtBQUFBLGNBMEVZO0FBQUEsNEJBQVEsS0FBUixFQUFhO0FBQUEscUNBQUk7QUFBQSxtQ0FBTSxjQUFOO0FBQUE7QUFBQTtBQUFBLElBQUo7QUFBQTtBQUFBO0FBQUEsS0FBYjtBQUFBLENBMUVaO0FBQUE7QUFBQSxTQTJFRSxlQUFLO0FBQUE7QUFBQSxDQUFMLEVBQXVCO0FBQUE7QUFBQSxrQ0FBUztBQUFBLFNBQU8sYUFBUCxXQUFVO0FBQUE7QUFBQSxDQUFWO0FBQUEsQ0FBVDtBQUFBLEdBQXVDO0FBQUE7QUFBQSxtQ0FBVTtBQUFBLFNBQU8sYUFBUCxXQUFVO0FBQUE7QUFBQSxDQUFWO0FBQUEsQ0FBVjtBQUFBLEdBQXlDLEtBQXpDO0FBQUEsQ0FBdkM7QUFBQSxDQUF2QixDQTNFRixJQXlFZTtBQUFBO0FBQUE7QUFBQSxLQUFmLEVBQWU7QUFBQTtBQUFBO0FBQUEsK0JBekVmO0FBQUEsY0EwRVk7QUFBQTtBQUFBLGtFQUFRLEtBQVIsRUFBYTtBQUFBO0FBQUE7QUFBQSwrQkFBSTtBQUFBO0FBQUE7QUFBQSwrQkFBTSxjQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFiO0FBQUE7QUFBQSx1Q0ExRVo7QUFBQTtBQUFBLFNBMkVFLGVBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBTCxFQUF1QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHdFQUFTO0FBQUE7QUFBQSwrQ0FBTyxhQUFQLFdBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBVjtBQUFBO0FBQUEsdUNBQVQ7QUFBQTtBQUFBLHlDQUF1QztBQUFBO0FBQUE7QUFBQTtBQUFBLHlFQUFVO0FBQUE7QUFBQSwrQ0FBTyxhQUFQLFdBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBVjtBQUFBO0FBQUEsdUNBQVY7QUFBQTtBQUFBLHlDQUF5QyxLQUF6QztBQUFBO0FBQUEsdUNBQXZDO0FBQUE7QUFBQSx1Q0FBdkIsQ0EzRUYsSUF5RWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQWY7QUFBQSw0QkF6RUE7QUFBQSxJQTZFQTtBQUFBO0FBQUEsMGpCQUFRO0FBQUE7QUFBQSwyQ0E3RVI7QUFBQSxRQThFTTtBQUFBO0FBQUEsQ0E5RU47QUFBQTtBQUFBLFNBK0VFLGNBQUcsR0FBSCxFQUFLLEtBQUwsRUFDRTtBQUFBLGtDQUFjLEtBQWQsRUFBbUI7QUFBQSx5QkFBTTtBQUFBLHdCQUFLO0FBQUEsaUNBQUU7QUFBQSxpQ0FBSSxZQUFKO0FBQUE7QUFBQTtBQUFBLElBQUY7QUFBQTtBQUFBO0FBQUEsS0FBTDtBQUFBLENBQU47QUFBQSxDQUFuQixFQUF3QyxTQUF4QztBQUFBLENBREYsRUFFRTtBQUFBLHVCQUFHLEdBQUgsRUFBSyxLQUFMLEVBQ0U7QUFBQSxrQ0FBYyxLQUFkLEVBQW1CO0FBQUEseUJBQU07QUFBQSx3QkFBSztBQUFBLGlDQUFFO0FBQUEsaUNBQUksWUFBSjtBQUFBO0FBQUE7QUFBQSxJQUFGO0FBQUE7QUFBQTtBQUFBLEtBQUw7QUFBQSxDQUFOO0FBQUEsQ0FBbkIsRUFBd0MsU0FBeEM7QUFBQSxDQURGLEVBRUU7QUFBQSx1QkFBRyxHQUFILEVBQUssUUFBTCxFQUNFO0FBQUEsd0JBQU07QUFBQSxpQ0FBRTtBQUFBLGlDQUFFO0FBQUEsaUNBQUksNEJBQWlCLEtBQWpCLEVBQXFCLEdBQXJCLEVBQXVCLEdBQXZCLEVBQXlCLFNBQXpCLENBQUo7QUFBQTtBQUFBO0FBQUEsSUFBRjtBQUFBO0FBQUE7QUFBQSxJQUFGO0FBQUE7QUFBQTtBQUFBLEtBQU47QUFBQSxDQURGLEVBRUU7QUFBQSx1QkFBRyxHQUFILEVBQUssT0FBTCxFQUNFO0FBQUEsd0JBQU07QUFBQSxpQ0FBRTtBQUFBLGlDQUFJLDJCQUFnQixLQUFoQixFQUFvQixHQUFwQixFQUFzQixHQUF0QixFQUF3QixTQUF4QixDQUFKO0FBQUE7QUFBQTtBQUFBLElBQUY7QUFBQTtBQUFBO0FBQUEsS0FBTjtBQUFBLENBREYsRUFFRTtBQUFBLHVCQUFHLEdBQUgsRUFBSyxNQUFMLEVBRUU7QUFBQSx3QkFBTTtBQUFBLGlDQUFFO0FBQUEsaUNBQUU7QUFBQSxpQ0FBSSxtQkFBUSxHQUFSLEVBQVUsU0FBVixDQUFKO0FBQUE7QUFBQTtBQUFBLElBQUY7QUFBQTtBQUFBO0FBQUEsSUFBRjtBQUFBO0FBQUE7QUFBQSxLQUFOO0FBQUEsQ0FGRixFQUdFO0FBQUEsd0JBQUksQ0FBSixFQUFNLFVBQU4sRUFBZ0I7QUFBQSw0QkFBUSxFQUFSO0FBQUEsQ0FBaEIsRUFBNEIsQ0FBNUIsRUFBOEIsQ0FBOUIsRUFBZ0MsQ0FBaEMsRUFBa0MsQ0FBbEM7QUFBQSxDQUhGO0FBQUEsQ0FGRjtBQUFBLENBRkY7QUFBQSxDQUZGO0FBQUEsQ0FGRixDQS9FRixJQTZFUTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVIsRUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQTdFUjtBQUFBLFFBOEVNO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBOUVOO0FBQUE7QUFBQSxTQStFRSxjQUFHLEdBQUgsRUFBSyxLQUFMLEVBQ0U7QUFBQTtBQUFBLHdFQUFjLEtBQWQsRUFBbUI7QUFBQTtBQUFBLCtEQUFNO0FBQUE7QUFBQSw4REFBSztBQUFBO0FBQUE7QUFBQSwrQkFBRTtBQUFBO0FBQUE7QUFBQSwrQkFBSSxZQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFMO0FBQUE7QUFBQSx1Q0FBTjtBQUFBO0FBQUEsdUNBQW5CLEVBQXdDLFNBQXhDO0FBQUE7QUFBQSx1Q0FERixFQUVFO0FBQUE7QUFBQSw2REFBRyxHQUFILEVBQUssS0FBTCxFQUNFO0FBQUE7QUFBQSx3RUFBYyxLQUFkLEVBQW1CO0FBQUE7QUFBQSwrREFBTTtBQUFBO0FBQUEsOERBQUs7QUFBQTtBQUFBO0FBQUEsK0JBQUU7QUFBQTtBQUFBO0FBQUEsK0JBQUksWUFBSjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBTDtBQUFBO0FBQUEsdUNBQU47QUFBQTtBQUFBLHVDQUFuQixFQUF3QyxTQUF4QztBQUFBO0FBQUEsdUNBREYsRUFFRTtBQUFBO0FBQUEsNkRBQUcsR0FBSCxFQUFLLFFBQUwsRUFDRTtBQUFBO0FBQUEsOERBQU07QUFBQTtBQUFBO0FBQUEsK0JBQUU7QUFBQTtBQUFBO0FBQUEsK0JBQUU7QUFBQTtBQUFBO0FBQUEsK0JBQUksNEJBQWlCLEtBQWpCLEVBQXFCLEdBQXJCLEVBQXVCLEdBQXZCLEVBQXlCLFNBQXpCLENBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQU47QUFBQTtBQUFBLHVDQURGLEVBRUU7QUFBQTtBQUFBLDZEQUFHLEdBQUgsRUFBSyxPQUFMLEVBQ0U7QUFBQTtBQUFBLDhEQUFNO0FBQUE7QUFBQTtBQUFBLCtCQUFFO0FBQUE7QUFBQTtBQUFBLCtCQUFJLDJCQUFnQixLQUFoQixFQUFvQixHQUFwQixFQUFzQixHQUF0QixFQUF3QixTQUF4QixDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFOO0FBQUE7QUFBQSx1Q0FERixFQUVFO0FBQUE7QUFBQSw2REFBRyxHQUFILEVBQUssTUFBTCxFQUVFO0FBQUE7QUFBQSw4REFBTTtBQUFBO0FBQUE7QUFBQSwrQkFBRTtBQUFBO0FBQUE7QUFBQSwrQkFBRTtBQUFBO0FBQUE7QUFBQSwrQkFBSSxtQkFBUSxHQUFSLEVBQVUsU0FBVixDQUFKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFOO0FBQUE7QUFBQSx1Q0FGRixFQUdFO0FBQUE7QUFBQSw4REFBSSxDQUFKLEVBQU0sVUFBTixFQUFnQjtBQUFBO0FBQUEsa0VBQVEsRUFBUjtBQUFBO0FBQUEsdUNBQWhCLEVBQTRCLENBQTVCLEVBQThCLENBQTlCLEVBQWdDLENBQWhDLEVBQWtDLENBQWxDO0FBQUE7QUFBQSx1Q0FIRjtBQUFBO0FBQUEsdUNBRkY7QUFBQTtBQUFBLHVDQUZGO0FBQUE7QUFBQSx1Q0FGRjtBQUFBO0FBQUEsdUNBRkYsQ0EvRUYsSUE2RVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBUjtBQUFBLDRCQTdFQTtBQUFBLElBNEZBO0FBQUE7QUFBQSxxSUFBYTtBQUFBO0FBQUEsbUNBQVMsT0FBVDtBQUFBLEdBQW1CO0FBQUE7QUFBQSx5Q0FBZSxDQUFmO0FBQUEsR0FBbUI7QUFBQTtBQUFBLGlDQUFPLE1BQVA7QUFBQSxHQUFnQjtBQUFBO0FBQUEsK0JBQUssQ0FBTDtBQUFBLEdBQVM7QUFBQTtBQUFBLCtCQUFLLENBQUw7QUFBQSxHQUFPLEtBQVA7QUFBQSxDQUFUO0FBQUEsQ0FBaEI7QUFBQSxDQUFuQjtBQUFBLENBQW5CO0FBQUEsQ0FBYixFQUFhO0FBQUE7QUFBQTtBQUFBLHlFQUFTLE9BQVQ7QUFBQTtBQUFBLHlDQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBLCtFQUFlLENBQWY7QUFBQTtBQUFBLHlDQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVFQUFPLE1BQVA7QUFBQTtBQUFBLHlDQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFFQUFLLENBQUw7QUFBQTtBQUFBLHlDQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUEscUVBQUssQ0FBTDtBQUFBO0FBQUEseUNBQU8sS0FBUDtBQUFBO0FBQUEsdUNBQVQ7QUFBQTtBQUFBLHVDQUFoQjtBQUFBO0FBQUEsdUNBQW5CO0FBQUE7QUFBQSx1Q0FBbkI7QUFBQSxDQUFiO0FBQUEsNEJBNUZBO0FBQUEsSUE2RkE7QUFBQTtBQUFBLHlJQUFlO0FBQUE7QUFBQSxtQ0FBUyxPQUFUO0FBQUEsR0FBbUI7QUFBQTtBQUFBLHlDQUFlLENBQWY7QUFBQSxHQUFtQjtBQUFBO0FBQUEsaUNBQU8sTUFBUDtBQUFBLEdBQWdCO0FBQUE7QUFBQSwrQkFBSyxDQUFMO0FBQUEsR0FBUztBQUFBO0FBQUEsK0JBQUssQ0FBTDtBQUFBLEdBQU8sS0FBUDtBQUFBLENBQVQ7QUFBQSxDQUFoQjtBQUFBLENBQW5CO0FBQUEsQ0FBbkI7QUFBQSxDQUFmLEVBQWU7QUFBQTtBQUFBO0FBQUEseUVBQVMsT0FBVDtBQUFBO0FBQUEseUNBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0VBQWUsQ0FBZjtBQUFBO0FBQUEseUNBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUVBQU8sTUFBUDtBQUFBO0FBQUEseUNBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUVBQUssQ0FBTDtBQUFBO0FBQUEseUNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxRUFBSyxDQUFMO0FBQUE7QUFBQSx5Q0FBTyxLQUFQO0FBQUE7QUFBQSx1Q0FBVDtBQUFBO0FBQUEsdUNBQWhCO0FBQUE7QUFBQSx1Q0FBbkI7QUFBQTtBQUFBLHVDQUFuQjtBQUFBLENBQWY7QUFBQSw0QkE3RkE7QUFBQSxJQThGQTtBQUFBO0FBQUEsdUlBQWM7QUFBQTtBQUFBLG1DQUFTLE9BQVQ7QUFBQSxHQUFtQjtBQUFBO0FBQUEseUNBQWUsQ0FBZjtBQUFBLEdBQW1CO0FBQUE7QUFBQSxpQ0FBTyxNQUFQO0FBQUEsR0FBZ0I7QUFBQTtBQUFBLCtCQUFLLENBQUw7QUFBQSxHQUFTO0FBQUE7QUFBQSwrQkFBSyxDQUFMO0FBQUEsR0FBTyxLQUFQO0FBQUEsQ0FBVDtBQUFBLENBQWhCO0FBQUEsQ0FBbkI7QUFBQSxDQUFuQjtBQUFBLENBQWQsRUFBYztBQUFBO0FBQUE7QUFBQSx5RUFBUyxPQUFUO0FBQUE7QUFBQSx5Q0FBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQSwrRUFBZSxDQUFmO0FBQUE7QUFBQSx5Q0FBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1RUFBTyxNQUFQO0FBQUE7QUFBQSx5Q0FBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxxRUFBSyxDQUFMO0FBQUE7QUFBQSx5Q0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBLHFFQUFLLENBQUw7QUFBQTtBQUFBLHlDQUFPLEtBQVA7QUFBQTtBQUFBLHVDQUFUO0FBQUE7QUFBQSx1Q0FBaEI7QUFBQTtBQUFBLHVDQUFuQjtBQUFBO0FBQUEsdUNBQW5CO0FBQUEsQ0FBZDtBQUFBLDRCQTlGQTtBQUFBLElBZ0dBO0FBQUE7QUFBQSxzNkJBQWlCO0FBQUE7QUFBQSwyQ0FoR2pCO0FBQUEsY0FpR1k7QUFBQSw2QkFBVTtBQUFBLGdDQUFRLEtBQVIsRUFBWSxZQUFaO0FBQUEsQ0FBVixFQUFrQyxRQUFsQztBQUFBLENBakdaO0FBQUEsYUFrR1c7QUFBQSw2QkFBVTtBQUFBLGdDQUFRLEtBQVIsRUFBWSxZQUFaO0FBQUEsQ0FBVixFQUFrQyxHQUFsQztBQUFBLENBbEdYO0FBQUEsZUFtR2E7QUFBQSw0QkFBUSxHQUFSLEVBQVUsU0FBVjtBQUFBLENBbkdiO0FBQUEsaUJBb0dnQjtBQUFBLFNBQTBCLGFBQTFCO0FBQUEsU0FBa0IsYUFBbEI7QUFBQTtBQUFBLEdBQW9CLE9BQXBCO0FBQUEsR0FBNkI7QUFBQTtBQUFBLENBQTdCO0FBQUEsQ0FwR2hCO0FBQUEsaUJBcUdlO0FBQUEsd0JBQUksWUFBSixFQUFnQjtBQUFBO0FBQUEsQ0FBaEI7QUFBQSxDQXJHZjtBQUFBLFVBc0dRO0FBQUEsd0JBQUksQ0FBSixFQUFPO0FBQUEsU0FBeUIsYUFBekI7QUFBQSxTQUFXLGFBQVgsZUFBYSxZQUFiO0FBQUEsR0FBMkIsQ0FBM0I7QUFBQSxDQUFQO0FBQUEsQ0F0R1I7QUFBQSxnQkF1R1k7QUFBQSxrQ0FBYyxTQUFkLEVBQXVCO0FBQUEsU0FBZSxhQUFmO0FBQUEsU0FBVyxhQUFYLGVBQWEsQ0FBYjtBQUFBLEdBQWtCO0FBQUEsU0FBbUIsYUFBbkI7QUFBQTtBQUFBLEdBQXFCLENBQXJCO0FBQUEsQ0FBbEI7QUFBQSxDQUF2QixFQUFpRSxDQUFqRTtBQUFBLENBdkdaO0FBQUEsZUF3R1c7QUFBQSxrQ0FBYyxRQUFkLEVBQXFCLEtBQXJCLEVBQTBCO0FBQUEsU0FBb0IsYUFBcEI7QUFBQTtBQUFBLEdBQXNCLE9BQXRCO0FBQUEsQ0FBMUI7QUFBQSxDQXhHWDtBQUFBLGlCQXlHYTtBQUFBLGtDQUFjLFVBQWQsRUFBd0I7QUFBQSxTQUF5QixhQUF6QjtBQUFBLFNBQUksYUFBSixRQUFPO0FBQUE7QUFBQSxDQUFQO0FBQUEsR0FBMkIsT0FBM0I7QUFBQSxDQUF4QixFQUE0RDtBQUFBLFNBQW9CLGFBQXBCO0FBQUE7QUFBQSxHQUFzQixPQUF0QjtBQUFBLENBQTVEO0FBQUEsQ0F6R2I7QUFBQTtBQUFBLFNBMEdFLGVBQUksQ0FBSixFQUFNLFVBQU4sRUFDRTtBQUFBLDhCQUFXO0FBQUEseUJBQUM7QUFBQSw2QkFBUyxXQUFULEVBQWlCLFVBQWpCO0FBQUEsQ0FBRCxFQUEwQjtBQUFBLHlCQUFDO0FBQUEsNkJBQVMsV0FBVCxFQUFpQixZQUFqQjtBQUFBLENBQUQsRUFBNEI7QUFBQSx5QkFBQztBQUFBO0FBQUEsQ0FBRCxFQUFpQjtBQUFBLHlCQUFDO0FBQUE7QUFBQSxDQUFELEVBQW1CO0FBQUEseUJBQUM7QUFBQTtBQUFBLENBQUQsRUFBa0IsS0FBbEI7QUFBQSxDQUFuQjtBQUFBLENBQWpCO0FBQUEsQ0FBNUI7QUFBQSxDQUExQjtBQUFBLENBQVg7QUFBQSxDQURGLEVBRUUsWUFGRixFQUdHO0FBQUEsU0FBNEIsYUFBNUI7QUFBQSxTQUFvQixhQUFwQjtBQUFBO0FBQUEsR0FBc0IsT0FBdEI7QUFBQSxHQUErQjtBQUFBLHdCQUFLO0FBQUE7QUFBQSxDQUFMLEVBQXlCO0FBQUE7QUFBQSxDQUF6QjtBQUFBLENBQS9CO0FBQUEsQ0FISCxFQUlFO0FBQUEsU0FBVyxhQUFYLGVBQWEsQ0FBYjtBQUFBLENBSkYsRUFLRztBQUFBLFNBQW9CLGFBQXBCO0FBQUE7QUFBQSxHQUFzQixDQUF0QjtBQUFBLENBTEgsQ0ExR0YsSUFnR2lCO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBakIsRUFBaUI7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFoR2pCO0FBQUEsY0FpR1k7QUFBQTtBQUFBLG1FQUFVO0FBQUE7QUFBQSxzRUFBUSxLQUFSLEVBQVksWUFBWjtBQUFBO0FBQUEsdUNBQVYsRUFBa0MsUUFBbEM7QUFBQTtBQUFBLHVDQWpHWjtBQUFBLGFBa0dXO0FBQUE7QUFBQSxtRUFBVTtBQUFBO0FBQUEsc0VBQVEsS0FBUixFQUFZLFlBQVo7QUFBQTtBQUFBLHVDQUFWLEVBQWtDLEdBQWxDO0FBQUE7QUFBQSx1Q0FsR1g7QUFBQSxlQW1HYTtBQUFBO0FBQUEsa0VBQVEsR0FBUixFQUFVLFNBQVY7QUFBQTtBQUFBLHVDQW5HYjtBQUFBLGlCQW9HZ0I7QUFBQTtBQUFBLCtDQUEwQixhQUExQjtBQUFBO0FBQUEsK0NBQWtCLGFBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQW9CLE9BQXBCO0FBQUE7QUFBQSx5Q0FBNkI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBN0I7QUFBQTtBQUFBLHVDQXBHaEI7QUFBQSxpQkFxR2U7QUFBQTtBQUFBLDhEQUFJLFlBQUosRUFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBaEI7QUFBQTtBQUFBLHVDQXJHZjtBQUFBLFVBc0dRO0FBQUE7QUFBQSw4REFBSSxDQUFKLEVBQU87QUFBQTtBQUFBLCtDQUF5QixhQUF6QjtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLFlBQWI7QUFBQTtBQUFBLHlDQUEyQixDQUEzQjtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBLHVDQXRHUjtBQUFBLGdCQXVHWTtBQUFBO0FBQUEsd0VBQWMsU0FBZCxFQUF1QjtBQUFBO0FBQUEsK0NBQWUsYUFBZjtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLENBQWI7QUFBQTtBQUFBLHlDQUFrQjtBQUFBO0FBQUEsK0NBQW1CLGFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXFCLENBQXJCO0FBQUE7QUFBQSx1Q0FBbEI7QUFBQTtBQUFBLHVDQUF2QixFQUFpRSxDQUFqRTtBQUFBO0FBQUEsdUNBdkdaO0FBQUEsZUF3R1c7QUFBQTtBQUFBLHdFQUFjLFFBQWQsRUFBcUIsS0FBckIsRUFBMEI7QUFBQTtBQUFBLCtDQUFvQixhQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQUFzQixPQUF0QjtBQUFBO0FBQUEsdUNBQTFCO0FBQUE7QUFBQSx1Q0F4R1g7QUFBQSxpQkF5R2E7QUFBQTtBQUFBLHdFQUFjLFVBQWQsRUFBd0I7QUFBQTtBQUFBLCtDQUF5QixhQUF6QjtBQUFBO0FBQUEsK0NBQUksYUFBSixRQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBLHlDQUEyQixPQUEzQjtBQUFBO0FBQUEsdUNBQXhCLEVBQTREO0FBQUE7QUFBQSwrQ0FBb0IsYUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FBc0IsT0FBdEI7QUFBQTtBQUFBLHVDQUE1RDtBQUFBO0FBQUEsdUNBekdiO0FBQUE7QUFBQSxTQTBHRSxlQUFJLENBQUosRUFBTSxVQUFOLEVBQ0U7QUFBQTtBQUFBLG9FQUFXO0FBQUE7QUFBQSwrREFBQztBQUFBO0FBQUEsbUVBQVMsV0FBVCxFQUFpQixVQUFqQjtBQUFBO0FBQUEsdUNBQUQsRUFBMEI7QUFBQTtBQUFBLCtEQUFDO0FBQUE7QUFBQSxtRUFBUyxXQUFULEVBQWlCLFlBQWpCO0FBQUE7QUFBQSx1Q0FBRCxFQUE0QjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFpQjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFtQjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFrQixLQUFsQjtBQUFBO0FBQUEsdUNBQW5CO0FBQUE7QUFBQSx1Q0FBakI7QUFBQTtBQUFBLHVDQUE1QjtBQUFBO0FBQUEsdUNBQTFCO0FBQUE7QUFBQSx1Q0FBWDtBQUFBO0FBQUEsdUNBREYsRUFFRSxZQUZGLEVBR0c7QUFBQTtBQUFBLCtDQUE0QixhQUE1QjtBQUFBO0FBQUEsK0NBQW9CLGFBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXNCLE9BQXRCO0FBQUE7QUFBQSx5Q0FBK0I7QUFBQTtBQUFBLDhEQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUwsRUFBeUI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBekI7QUFBQTtBQUFBLHVDQUEvQjtBQUFBO0FBQUEsdUNBSEgsRUFJRTtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLENBQWI7QUFBQTtBQUFBLHVDQUpGLEVBS0c7QUFBQTtBQUFBLCtDQUFvQixhQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQUFzQixDQUF0QjtBQUFBO0FBQUEsdUNBTEgsQ0ExR0YsSUFnR2lCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQWpCO0FBQUEsNEJBaEdBO0FBQUEsSUFpSEE7QUFBQTtBQUFBLG01QkFBZ0I7QUFBQTtBQUFBLDJDQWpIaEI7QUFBQSxjQWtIWTtBQUFBLDZCQUFVO0FBQUEsZ0NBQVEsS0FBUixFQUFZLFdBQVo7QUFBQSxDQUFWLEVBQWlDLE9BQWpDO0FBQUEsQ0FsSFo7QUFBQSxlQW1IYTtBQUFBLDRCQUFRLEdBQVIsRUFBVSxTQUFWO0FBQUEsQ0FuSGI7QUFBQSxjQW9IWTtBQUFBLDRCQUFRLEdBQVIsRUFBVSxTQUFWO0FBQUEsQ0FwSFo7QUFBQSxpQkFxSGdCO0FBQUEsU0FBMkIsYUFBM0I7QUFBQSxTQUFtQixhQUFuQjtBQUFBO0FBQUEsR0FBcUIsT0FBckI7QUFBQSxHQUE4QjtBQUFBO0FBQUEsQ0FBOUI7QUFBQSxDQXJIaEI7QUFBQSxpQkFzSGU7QUFBQSx3QkFBSSxZQUFKLEVBQWdCO0FBQUE7QUFBQSxDQUFoQjtBQUFBLENBdEhmO0FBQUEsVUF1SFE7QUFBQSx3QkFBSSxDQUFKLEVBQU87QUFBQSxTQUF5QixhQUF6QjtBQUFBLFNBQVcsYUFBWCxlQUFhLFlBQWI7QUFBQSxHQUEyQixDQUEzQjtBQUFBLENBQVA7QUFBQSxDQXZIUjtBQUFBLGdCQXdIWTtBQUFBLGtDQUFjLFNBQWQsRUFBdUI7QUFBQSxTQUFlLGFBQWY7QUFBQSxTQUFXLGFBQVgsZUFBYSxDQUFiO0FBQUEsR0FBa0I7QUFBQSxTQUFtQixhQUFuQjtBQUFBO0FBQUEsR0FBcUIsQ0FBckI7QUFBQSxDQUFsQjtBQUFBLENBQXZCLEVBQWlFLENBQWpFO0FBQUEsQ0F4SFo7QUFBQSxpQkF5SGE7QUFBQSxrQ0FBYyxVQUFkLEVBQXVCLEtBQXZCLEVBQTRCO0FBQUEsU0FBb0IsYUFBcEI7QUFBQTtBQUFBLEdBQXNCLE9BQXRCO0FBQUEsQ0FBNUI7QUFBQSxDQXpIYjtBQUFBLGdCQTBIWTtBQUFBLGtDQUFjLFNBQWQsRUFBdUI7QUFBQSxTQUEyQixhQUEzQjtBQUFBLFNBQUksYUFBSixRQUFPO0FBQUE7QUFBQSxDQUFQO0FBQUEsR0FBNkIsT0FBN0I7QUFBQSxDQUF2QixFQUE2RDtBQUFBLFNBQW9CLGFBQXBCO0FBQUE7QUFBQSxHQUFzQixPQUF0QjtBQUFBLENBQTdEO0FBQUEsQ0ExSFo7QUFBQTtBQUFBLFNBMkhFLG9CQUNFO0FBQUEsOEJBQVc7QUFBQSx5QkFBQztBQUFBLDZCQUFTLFdBQVQsRUFBaUIsWUFBakI7QUFBQSxDQUFELEVBQTRCO0FBQUEseUJBQUM7QUFBQSw2QkFBUyxXQUFULEVBQWlCLFdBQWpCO0FBQUEsQ0FBRCxFQUEyQjtBQUFBLHlCQUFDO0FBQUE7QUFBQSxDQUFELEVBQWtCO0FBQUEseUJBQUM7QUFBQTtBQUFBLENBQUQsRUFBbUI7QUFBQSx5QkFBQztBQUFBO0FBQUEsQ0FBRCxFQUFrQixLQUFsQjtBQUFBLENBQW5CO0FBQUEsQ0FBbEI7QUFBQSxDQUEzQjtBQUFBLENBQTVCO0FBQUEsQ0FBWDtBQUFBLENBREYsRUFFRSxZQUZGLEVBR0c7QUFBQSxTQUE0QixhQUE1QjtBQUFBLFNBQW9CLGFBQXBCO0FBQUE7QUFBQSxHQUFzQixPQUF0QjtBQUFBLEdBQStCO0FBQUEsd0JBQUs7QUFBQTtBQUFBLENBQUwsRUFBMEI7QUFBQTtBQUFBLENBQTFCO0FBQUEsQ0FBL0I7QUFBQSxDQUhILEVBSUU7QUFBQSxTQUFXLGFBQVgsZUFBYSxDQUFiO0FBQUEsQ0FKRixFQUtHO0FBQUEsU0FBb0IsYUFBcEI7QUFBQTtBQUFBLEdBQXNCLENBQXRCO0FBQUEsQ0FMSCxDQTNIRixJQWlIZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFoQixFQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQWpIaEI7QUFBQSxjQWtIWTtBQUFBO0FBQUEsbUVBQVU7QUFBQTtBQUFBLHNFQUFRLEtBQVIsRUFBWSxXQUFaO0FBQUE7QUFBQSx1Q0FBVixFQUFpQyxPQUFqQztBQUFBO0FBQUEsdUNBbEhaO0FBQUEsZUFtSGE7QUFBQTtBQUFBLGtFQUFRLEdBQVIsRUFBVSxTQUFWO0FBQUE7QUFBQSx1Q0FuSGI7QUFBQSxjQW9IWTtBQUFBO0FBQUEsa0VBQVEsR0FBUixFQUFVLFNBQVY7QUFBQTtBQUFBLHVDQXBIWjtBQUFBLGlCQXFIZ0I7QUFBQTtBQUFBLCtDQUEyQixhQUEzQjtBQUFBO0FBQUEsK0NBQW1CLGFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXFCLE9BQXJCO0FBQUE7QUFBQSx5Q0FBOEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBOUI7QUFBQTtBQUFBLHVDQXJIaEI7QUFBQSxpQkFzSGU7QUFBQTtBQUFBLDhEQUFJLFlBQUosRUFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBaEI7QUFBQTtBQUFBLHVDQXRIZjtBQUFBLFVBdUhRO0FBQUE7QUFBQSw4REFBSSxDQUFKLEVBQU87QUFBQTtBQUFBLCtDQUF5QixhQUF6QjtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLFlBQWI7QUFBQTtBQUFBLHlDQUEyQixDQUEzQjtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBLHVDQXZIUjtBQUFBLGdCQXdIWTtBQUFBO0FBQUEsd0VBQWMsU0FBZCxFQUF1QjtBQUFBO0FBQUEsK0NBQWUsYUFBZjtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLENBQWI7QUFBQTtBQUFBLHlDQUFrQjtBQUFBO0FBQUEsK0NBQW1CLGFBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXFCLENBQXJCO0FBQUE7QUFBQSx1Q0FBbEI7QUFBQTtBQUFBLHVDQUF2QixFQUFpRSxDQUFqRTtBQUFBO0FBQUEsdUNBeEhaO0FBQUEsaUJBeUhhO0FBQUE7QUFBQSx3RUFBYyxVQUFkLEVBQXVCLEtBQXZCLEVBQTRCO0FBQUE7QUFBQSwrQ0FBb0IsYUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5Q0FBc0IsT0FBdEI7QUFBQTtBQUFBLHVDQUE1QjtBQUFBO0FBQUEsdUNBekhiO0FBQUEsZ0JBMEhZO0FBQUE7QUFBQSx3RUFBYyxTQUFkLEVBQXVCO0FBQUE7QUFBQSwrQ0FBMkIsYUFBM0I7QUFBQTtBQUFBLCtDQUFJLGFBQUosUUFBTztBQUFBO0FBQUE7QUFBQTtBQUFBLHVDQUFQO0FBQUE7QUFBQSx5Q0FBNkIsT0FBN0I7QUFBQTtBQUFBLHVDQUF2QixFQUE2RDtBQUFBO0FBQUEsK0NBQW9CLGFBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXNCLE9BQXRCO0FBQUE7QUFBQSx1Q0FBN0Q7QUFBQTtBQUFBLHVDQTFIWjtBQUFBO0FBQUEsU0EySEUsb0JBQ0U7QUFBQTtBQUFBLG9FQUFXO0FBQUE7QUFBQSwrREFBQztBQUFBO0FBQUEsbUVBQVMsV0FBVCxFQUFpQixZQUFqQjtBQUFBO0FBQUEsdUNBQUQsRUFBNEI7QUFBQTtBQUFBLCtEQUFDO0FBQUE7QUFBQSxtRUFBUyxXQUFULEVBQWlCLFdBQWpCO0FBQUE7QUFBQSx1Q0FBRCxFQUEyQjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFrQjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFtQjtBQUFBO0FBQUEsK0RBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRCxFQUFrQixLQUFsQjtBQUFBO0FBQUEsdUNBQW5CO0FBQUE7QUFBQSx1Q0FBbEI7QUFBQTtBQUFBLHVDQUEzQjtBQUFBO0FBQUEsdUNBQTVCO0FBQUE7QUFBQSx1Q0FBWDtBQUFBO0FBQUEsdUNBREYsRUFFRSxZQUZGLEVBR0c7QUFBQTtBQUFBLCtDQUE0QixhQUE1QjtBQUFBO0FBQUEsK0NBQW9CLGFBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUNBQXNCLE9BQXRCO0FBQUE7QUFBQSx5Q0FBK0I7QUFBQTtBQUFBLDhEQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBQUwsRUFBMEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBMUI7QUFBQTtBQUFBLHVDQUEvQjtBQUFBO0FBQUEsdUNBSEgsRUFJRTtBQUFBO0FBQUEsK0NBQVcsYUFBWCxlQUFhLENBQWI7QUFBQTtBQUFBLHVDQUpGLEVBS0c7QUFBQTtBQUFBLCtDQUFvQixhQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlDQUFzQixDQUF0QjtBQUFBO0FBQUEsdUNBTEgsQ0EzSEYsSUFpSGdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBQWhCO0FBQUEsNEJBakhBO0FBQUEsSUFrSUE7QUFBQTtBQUFBLHlIQUFjO0FBQUE7QUFBQSwyQ0FBa0Isb0JBQVU7QUFBQSxnQ0FBUSxLQUFSLEVBQVksVUFBWjtBQUFBLENBQVYsRUFBZ0MsS0FBaEMsQ0FBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFkLEVBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBa0Isb0JBQVU7QUFBQTtBQUFBLHNFQUFRLEtBQVIsRUFBWSxVQUFaO0FBQUE7QUFBQSx1Q0FBVixFQUFnQyxLQUFoQyxDQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFkO0FBQUEsNEJBbElBO0FBQUEsSUFtSUE7QUFBQTtBQUFBLDJIQUFjO0FBQUE7QUFBQSwyQ0FBa0Isb0JBQVU7QUFBQSxnQ0FBUSxLQUFSLEVBQVksWUFBWjtBQUFBLENBQVYsRUFBa0MsS0FBbEMsQ0FBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFkLEVBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQkFBa0Isb0JBQVU7QUFBQTtBQUFBLHNFQUFRLEtBQVIsRUFBWSxZQUFaO0FBQUE7QUFBQSx1Q0FBVixFQUFrQyxLQUFsQyxDQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFkO0FBQUEsNEJBbklBO0FBQUEsSUFxSUE7QUFBQTtBQUFBLHVjQUFTO0FBQUE7QUFBQSwyQ0FBVyw4QkFBZSxLQUFmLEVBQW1CLEVBQW5CLEVBQXdCO0FBQUEsaUNBQUU7QUFBQSxpQ0FySTlDO0FBQUEsWUFzSVU7QUFBQSxTQUFFLGFBQUYsTUFBSSxFQUFKO0FBQUEsQ0F0SVY7QUFBQSxZQXVJVTtBQUFBLFNBQUUsYUFBRixNQUFJLEVBQUo7QUFBQSxDQXZJVjtBQUFBO0FBQUEsU0F3SUUsb0JBQ0c7QUFBQSw4QkFBVztBQUFBLHlCQUFDO0FBQUEseUJBQU87QUFBQTtBQUFBLDhCQUFJLENBQUo7QUFBQSxHQUFRO0FBQUE7QUFBQSw4QkFBSSxDQUFKO0FBQUEsR0FBUTtBQUFBO0FBQUEsa0NBQVEsT0FBUjtBQUFBLEdBQWdCO0FBQUE7QUFBQSxtQ0FBUyxPQUFUO0FBQUEsR0FBa0IsS0FBbEI7QUFBQSxDQUFoQjtBQUFBLENBQVI7QUFBQSxDQUFSO0FBQUEsQ0FBUDtBQUFBLENBQUQsRUFBZ0U7QUFBQSx5QkFBQztBQUFBLHlCQUFLLEtBQUwsRUFBVztBQUFBO0FBQUEsMkNBQW1CLE1BQW5CO0FBQUEsR0FBNEI7QUFBQTtBQUFBLHdDQUFjLFFBQWQ7QUFBQSxHQUF5QjtBQUFBO0FBQUEsOENBQW9CLGNBQXBCO0FBQUEsR0FBcUM7QUFBQTtBQUFBLDhCQUFLO0FBQUEsU0FBRyxhQUFILEtBQUs7QUFBQSxTQUFFLGFBQUYsTUFBSSxDQUFKO0FBQUEsQ0FBTDtBQUFBLENBQUw7QUFBQSxHQUFrQjtBQUFBO0FBQUEsOEJBQUs7QUFBQSxTQUFPLGFBQVAsV0FBUztBQUFBLFNBQUUsYUFBRixNQUFJLENBQUo7QUFBQSxDQUFUO0FBQUEsQ0FBTDtBQUFBLEdBQXNCO0FBQUE7QUFBQSx3Q0FBYyxNQUFkO0FBQUEsR0FBcUIsS0FBckI7QUFBQSxDQUF0QjtBQUFBLENBQWxCO0FBQUEsQ0FBckM7QUFBQSxDQUF6QjtBQUFBLENBQTVCO0FBQUEsQ0FBWDtBQUFBLENBQUQsRUFBc0ssS0FBdEs7QUFBQSxDQUFoRTtBQUFBLENBQVg7QUFBQSxDQURILEVBRUUsT0FGRixFQUdFLE9BSEYsRUFJRTtBQUFBLFNBQU0sYUFBTixVQUFRLENBQVI7QUFBQSxDQUpGLEVBS0U7QUFBQSxTQUFNLGFBQU4sVUFBUSxDQUFSO0FBQUEsQ0FMRixDQXhJRixJQXFJOEM7QUFBQTtBQUFBO0FBQUEsSUFBRjtBQUFBO0FBQUE7QUFBQSxLQUF4QixDQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBVCxFQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0JBQVcsOEJBQWUsS0FBZixFQUFtQixFQUFuQixFQUF3QjtBQUFBO0FBQUE7QUFBQSwrQkFBRTtBQUFBO0FBQUE7QUFBQSwrQkFySTlDO0FBQUEsWUFzSVU7QUFBQTtBQUFBLCtDQUFFLGFBQUYsTUFBSSxFQUFKO0FBQUE7QUFBQSx1Q0F0SVY7QUFBQSxZQXVJVTtBQUFBO0FBQUEsK0NBQUUsYUFBRixNQUFJLEVBQUo7QUFBQTtBQUFBLHVDQXZJVjtBQUFBO0FBQUEsU0F3SUUsb0JBQ0c7QUFBQTtBQUFBLG9FQUFXO0FBQUE7QUFBQSwrREFBQztBQUFBO0FBQUEsK0RBQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxvRUFBSSxDQUFKO0FBQUE7QUFBQSx5Q0FBUTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9FQUFJLENBQUo7QUFBQTtBQUFBLHlDQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0VBQVEsT0FBUjtBQUFBO0FBQUEseUNBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUVBQVMsT0FBVDtBQUFBO0FBQUEseUNBQWtCLEtBQWxCO0FBQUE7QUFBQSx1Q0FBaEI7QUFBQTtBQUFBLHVDQUFSO0FBQUE7QUFBQSx1Q0FBUjtBQUFBO0FBQUEsdUNBQVA7QUFBQTtBQUFBLHVDQUFELEVBQWdFO0FBQUE7QUFBQSwrREFBQztBQUFBO0FBQUEsK0RBQUssS0FBTCxFQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUZBQW1CLE1BQW5CO0FBQUE7QUFBQSx5Q0FBNEI7QUFBQTtBQUFBO0FBQUE7QUFBQSw4RUFBYyxRQUFkO0FBQUE7QUFBQSx5Q0FBeUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxvRkFBb0IsY0FBcEI7QUFBQTtBQUFBLHlDQUFxQztBQUFBO0FBQUE7QUFBQTtBQUFBLG9FQUFLO0FBQUE7QUFBQSwrQ0FBRyxhQUFILEtBQUs7QUFBQTtBQUFBLCtDQUFFLGFBQUYsTUFBSSxDQUFKO0FBQUE7QUFBQSx1Q0FBTDtBQUFBO0FBQUEsdUNBQUw7QUFBQTtBQUFBLHlDQUFrQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG9FQUFLO0FBQUE7QUFBQSwrQ0FBTyxhQUFQLFdBQVM7QUFBQTtBQUFBLCtDQUFFLGFBQUYsTUFBSSxDQUFKO0FBQUE7QUFBQSx1Q0FBVDtBQUFBO0FBQUEsdUNBQUw7QUFBQTtBQUFBLHlDQUFzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLDhFQUFjLE1BQWQ7QUFBQTtBQUFBLHlDQUFxQixLQUFyQjtBQUFBO0FBQUEsdUNBQXRCO0FBQUE7QUFBQSx1Q0FBbEI7QUFBQTtBQUFBLHVDQUFyQztBQUFBO0FBQUEsdUNBQXpCO0FBQUE7QUFBQSx1Q0FBNUI7QUFBQTtBQUFBLHVDQUFYO0FBQUE7QUFBQSx1Q0FBRCxFQUFzSyxLQUF0SztBQUFBO0FBQUEsdUNBQWhFO0FBQUE7QUFBQSx1Q0FBWDtBQUFBO0FBQUEsdUNBREgsRUFFRSxPQUZGLEVBR0UsT0FIRixFQUlFO0FBQUE7QUFBQSwrQ0FBTSxhQUFOLFVBQVEsQ0FBUjtBQUFBO0FBQUEsdUNBSkYsRUFLRTtBQUFBO0FBQUEsK0NBQU0sYUFBTixVQUFRLENBQVI7QUFBQTtBQUFBLHVDQUxGLENBeElGLElBcUk4QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1Q0FBRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FBeEIsQ0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUFUO0FBQUEsNEJBcklBO0FBQUE7QUFBQSIsImZpbGUiOiJwYXJzZUFzdC5qcyJ9
