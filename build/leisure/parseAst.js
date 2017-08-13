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
//# sourceMappingURL=data:application/json,{"version":3,"sources":["parseAst.lsr"],"names":[],"mappings":"AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;AAAA;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","file":"parseAst.js"}
