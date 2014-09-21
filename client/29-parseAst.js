module.exports = L_runMonads([
  function(){return resolve(L_newDefine)("makeNode")(5)("makeNode svg width height rootX rootY = \\f . f svg width height rootX rootY")(lazy(setDataType((function () {
  var main;
  var full = function (L_svg, L_width, L_height, L_rootX, L_rootY) {
    return setType(function(L_f){return resolve(L_f)(L_svg)(L_width)(L_height)(L_rootX)(L_rootY)}, 'makeNode');
  };
  var partial = function(L_svg) {
    var _1 = function(L_width) {
            var _2 = function(L_height) {
              var _3 = function(L_rootX) {
                var _4 = function(L_rootY) {
                  return full(L_svg, L_width, L_height, L_rootX, L_rootY);
                };
                _4.leisureInfo = {arg: L_rootX, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_height, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_width, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_svg, name: main.leisureName};
          return _1;
  };
  main = function(L_svg, L_width, L_height, L_rootX, L_rootY, more) {
    if (L_rootY && (typeof more == "undefined" || more == null)) {
      return full(L_svg, L_width, L_height, L_rootX, L_rootY);
    } else if (typeof L_width == "undefined" || L_width == null) {
      return partial(L_svg);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'makeNode')))},
 function(){return resolve(L_newDefine)("nodeSvg")(1)("nodeSvg st = st \\svg width height rootX rootY . svg")(lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return $F(arguments, function(L_width){return $F(arguments, function(L_height){return $F(arguments, function(L_rootX){return $F(arguments, function(L_rootY){return resolve(L_svg)})})})})}))}))},
 function(){return resolve(L_newDefine)("nodeWidth")(1)("nodeWidth st = st \\svg width height rootX rootY . width")(lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return $F(arguments, function(L_width){return $F(arguments, function(L_height){return $F(arguments, function(L_rootX){return $F(arguments, function(L_rootY){return resolve(L_width)})})})})}))}))},
 function(){return resolve(L_newDefine)("nodeHeight")(1)("nodeHeight st = st \\svg width height rootX rootY . height")(lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return $F(arguments, function(L_width){return $F(arguments, function(L_height){return $F(arguments, function(L_rootX){return $F(arguments, function(L_rootY){return resolve(L_height)})})})})}))}))},
 function(){return resolve(L_newDefine)("nodeRootX")(1)("nodeRootX st = st \\svg width height rootX rootY . rootX")(lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return $F(arguments, function(L_width){return $F(arguments, function(L_height){return $F(arguments, function(L_rootX){return $F(arguments, function(L_rootY){return resolve(L_rootX)})})})})}))}))},
 function(){return resolve(L_newDefine)("nodeRootY")(1)("nodeRootY st = st \\svg width height rootX rootY . rootY")(lazy(function(L_st){return resolve(L_st)(lazy(function(L_svg){return $F(arguments, function(L_width){return $F(arguments, function(L_height){return $F(arguments, function(L_rootX){return $F(arguments, function(L_rootY){return resolve(L_rootY)})})})})}))}))},
 function(){return resolve(L_newDefine)("space")(0)("space = 10")(10)},
 function(){return resolve(L_newDefine)("border")(0)("border = 5")(5)},
 function(){return resolve(L_newDefine)("nodeTranslate")(3)("nodeTranslate st x y = st \\svg width height rootX rootY . makeNode\n  translate svg x y\n  width\n  height\n  rootX + x\n  rootY + y")(lazy((function () {
  var main;
  var full = function (L_st, L_x, L_y) {
    return resolve(L_st)(lazy(function(L_svg){return $F(arguments, function(L_width){return $F(arguments, function(L_height){return $F(arguments, function(L_rootX){return $F(arguments, function(L_rootY){return resolve(L_makeNode)(function(){return resolve(L_translate)(L_svg, L_x, L_y)}, L_width, L_height, function(){return resolve(L_$o)(L_rootX)(L_x)}, function(){return resolve(L_$o)(L_rootY)(L_y)})})})})})}));
  };
  var partial = function(L_st) {
    var _1 = function(L_x) {
            var _2 = function(L_y) {
              return full(L_st, L_x, L_y);
            };
            _2.leisureInfo = {arg: L_x, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_st, name: main.leisureName};
          return _1;
  };
  main = function(L_st, L_x, L_y, more) {
    if (L_y && (typeof more == "undefined" || more == null)) {
      return full(L_st, L_x, L_y);
    } else if (typeof L_x == "undefined" || L_x == null) {
      return partial(L_st);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("nodeLine")(2)("nodeLine n1 n2 = n1 \\s1 w1 h1 x1 y1 . n2 \\s2 w2 h2 x2 y2 .\n  line [['x1'|x1] ['y1'|y1] ['x2'|x2] ['y2'|y2] ['stroke-width'|3] | defaultLineMap]")(lazy((function () {
  var main;
  var full = function (L_n1, L_n2) {
    return resolve(L_n1)(lazy(function(L_s1){return $F(arguments, function(L_w1){return $F(arguments, function(L_h1){return $F(arguments, function(L_x1){return $F(arguments, function(L_y1){return resolve(L_n2)(lazy(function(L_s2){return $F(arguments, function(L_w2){return $F(arguments, function(L_h2){return $F(arguments, function(L_x2){return $F(arguments, function(L_y2){return resolve(L_line)(function(){return resolve(L_cons)(function(){return resolve(L_cons)("x1", L_x1)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("y1", L_y1)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("x2", L_x2)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("y2", L_y2)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 3)}, L_defaultLineMap)})})})})})})})})})}))})})})})}));
  };
  var partial = function(L_n1) {
    var _1 = function(L_n2) {
            return full(L_n1, L_n2);
          };
          _1.leisureInfo = {arg: L_n1, name: main.leisureName};
          return _1;
  };
  main = function(L_n1, L_n2, more) {
    if (L_n2 && (typeof more == "undefined" || more == null)) {
      return full(L_n1, L_n2);
    } else if (typeof L_n2 == "undefined" || L_n2 == null) {
      return partial(L_n1);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("rangeContainsRange")(4)("rangeContainsRange start end innerStart innerEnd = and (lte start innerStart) (lte innerEnd end)")(lazy((function () {
  var main;
  var full = function (L_start, L_end, L_innerStart, L_innerEnd) {
    return resolve(L_and)(function(){return resolve(L_lte)(L_start)(L_innerStart)}, function(){return resolve(L_lte)(L_innerEnd)(L_end)});
  };
  var partial = function(L_start) {
    var _1 = function(L_end) {
            var _2 = function(L_innerStart) {
              var _3 = function(L_innerEnd) {
                return full(L_start, L_end, L_innerStart, L_innerEnd);
              };
              _3.leisureInfo = {arg: L_innerStart, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_end, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_end, L_innerStart, L_innerEnd, more) {
    if (L_innerEnd && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_end, L_innerStart, L_innerEnd);
    } else if (typeof L_end == "undefined" || L_end == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("highlight")(1)("highlight map = do\n  c = assocGetWithDefault 'fill' map nil\n  eq c '#fcc'\n    assocSet 'fill' 'red' map\n    eq c '#cfc'\n      assocSet 'fill' 'green' map\n      eq c '#ccf'\n        assocSet 'fill' 'blue' map\n        map")(lazy(function(L_map){return (function(){
  var L_c_0;
  L_c_0 = function(){return resolve(L_assocGetWithDefault)("fill", L_map, L_nil)};

  return resolve(L_eq)(L_c_0)("#fcc")(function(){return resolve(L_assocSet)("fill")("red")(L_map)})(function(){return resolve(L_eq)(L_c_0)("#cfc")(function(){return resolve(L_assocSet)("fill")("green")(L_map)})(function(){return resolve(L_eq)(L_c_0)("#ccf")(function(){return resolve(L_assocSet)("fill")("blue")(L_map)})(L_map)})})})()}))},
 function(){return resolve(L_newDefine)("treeFor")(1)("treeFor ast = treeForWith ast \\ast map . map")(lazy(function(L_ast){return resolve(L_treeForWith)(L_ast, lazy(function(L_ast_0){return $F(arguments, function(L_map){return resolve(L_map)})}))}))},
 function(){return resolve(L_newDefine)("treeForWith")(2)("treeForWith ast mapFunc = nodeSvg (nodeFor ast mapFunc)")(lazy((function () {
  var main;
  var full = function (L_ast, L_mapFunc) {
    return resolve(L_nodeSvg)(function(){return resolve(L_nodeFor)(L_ast, L_mapFunc)});
  };
  var partial = function(L_ast) {
    var _1 = function(L_mapFunc) {
            return full(L_ast, L_mapFunc);
          };
          _1.leisureInfo = {arg: L_ast, name: main.leisureName};
          return _1;
  };
  main = function(L_ast, L_mapFunc, more) {
    if (L_mapFunc && (typeof more == "undefined" || more == null)) {
      return full(L_ast, L_mapFunc);
    } else if (typeof L_mapFunc == "undefined" || L_mapFunc == null) {
      return partial(L_ast);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("wrappedTreeFor")(1)("wrappedTreeFor ast = do\n  content = nodeFor ast \\ast map . map\n  svg (nodeSvg content) {'width':(border + (nodeWidth content)) 'height':(border + (nodeHeight content))}")(lazy(function(L_ast){return (function(){
  var L_content_0;
  L_content_0 = function(){return resolve(L_nodeFor)(L_ast, lazy(function(L_ast_0){return $F(arguments, function(L_map){return resolve(L_map)})}))};

  return resolve(L_svg)(function(){return resolve(L_nodeSvg)(L_content_0)}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("width", function(){return resolve(L_$o)(L_border)(function(){return resolve(L_nodeWidth)(L_content_0)})})}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("height", function(){return resolve(L_$o)(L_border)(function(){return resolve(L_nodeHeight)(L_content_0)})})}, L_nil)})})})()}))},
 function(){return resolve(L_newDefine)("nodeFor")(2)("nodeFor ast mapFunc = do\n  t = getType ast\n  eq t 'lit'\n    createLitNode ast (show (ast \\v p . v)) mapFunc\n    eq t 'ref'\n      createRefNode ast (show (ast \\n p . n)) mapFunc\n      eq t 'lambda'\n        ast (\\v b p . createLambdaNode ast v b mapFunc)\n        eq t 'apply'\n          ast (\\f a . createApplyNode ast f a mapFunc)\n          eq t 'anno'\n            #ast (\\n d b . createApplyNode ast f a mapFunc)\n            ast (\\n d b . nodeFor b mapFunc)\n            log 2 makeNode (svgNode '') 0 0 0 0")(lazy((function () {
  var main;
  var full = function (L_ast, L_mapFunc) {
    return (function(){
  var L_t_0;
  L_t_0 = function(){return resolve(L_getType)(L_ast)};

  return resolve(L_eq)(L_t_0)("lit")(function(){return resolve(L_createLitNode)(L_ast, function(){return resolve(L_show)(function(){return resolve(L_ast)(lazy(function(L_v){return $F(arguments, function(L_p){return resolve(L_v)})}))})}, L_mapFunc)})(function(){return resolve(L_eq)(L_t_0)("ref")(function(){return resolve(L_createRefNode)(L_ast, function(){return resolve(L_show)(function(){return resolve(L_ast)(lazy(function(L_n){return $F(arguments, function(L_p){return resolve(L_n)})}))})}, L_mapFunc)})(function(){return resolve(L_eq)(L_t_0)("lambda")(function(){return resolve(L_ast)(lazy(function(L_v){return $F(arguments, function(L_b){return $F(arguments, function(L_p){return resolve(L_createLambdaNode)(L_ast, L_v, L_b, L_mapFunc)})})}))})(function(){return resolve(L_eq)(L_t_0)("apply")(function(){return resolve(L_ast)(lazy(function(L_f){return $F(arguments, function(L_a){return resolve(L_createApplyNode)(L_ast, L_f, L_a, L_mapFunc)})}))})(function(){return resolve(L_eq)(L_t_0)("anno")(function(){return resolve(L_ast)(lazy(function(L_n){return $F(arguments, function(L_d){return $F(arguments, function(L_b){return resolve(L_nodeFor)(L_b, L_mapFunc)})})}))})(function(){return resolve(L_log)(2)(L_makeNode)(function(){return resolve(L_svgNode)("")})(0)(0)(0)(0)})})})})})})();
  };
  var partial = function(L_ast) {
    var _1 = function(L_mapFunc) {
            return full(L_ast, L_mapFunc);
          };
          _1.leisureInfo = {arg: L_ast, name: main.leisureName};
          return _1;
  };
  main = function(L_ast, L_mapFunc, more) {
    if (L_mapFunc && (typeof more == "undefined" || more == null)) {
      return full(L_ast, L_mapFunc);
    } else if (typeof L_mapFunc == "undefined" || L_mapFunc == null) {
      return partial(L_ast);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("redStyle")(0)("redStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#fcc'] ['rx'|8] ['ry'|8]]")(function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("fill", "#fcc")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("rx", 8)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("ry", 8)}, L_nil)})})})})})},
 function(){return resolve(L_newDefine)("greenStyle")(0)("greenStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#cfc'] ['rx'|8] ['ry'|8]]")(function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("fill", "#cfc")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("rx", 8)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("ry", 8)}, L_nil)})})})})})},
 function(){return resolve(L_newDefine)("blueStyle")(0)("blueStyle = [['stroke'|'black'] ['stroke-width'|2] ['fill'|'#ccf'] ['rx'|8] ['ry'|8]]")(function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke", "black")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("stroke-width", 2)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("fill", "#ccf")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("rx", 8)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("ry", 8)}, L_nil)})})})})})},
 function(){return resolve(L_newDefine)("createLambdaNode")(4)("createLambdaNode ast v b mapFunc = do\n  rootBox = textNode (mapFunc ast greenStyle) 'lambda'\n  varBox = textNode (mapFunc ast greenStyle) v\n  bodyTree = nodeFor b mapFunc\n  childWidth = (nodeWidth varBox) + space + (nodeWidth bodyTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  varBox = nodeTranslate varBox pad (nodeHeight rootBox) + space\n  bodyTree = nodeTranslate bodyTree (pad + (nodeWidth varBox) + space) ((nodeHeight rootBox) + space)\n  log 3 makeNode\n    svgConcat [(nodeLine rootBox varBox) (nodeLine rootBox bodyTree) (nodeSvg varBox) (nodeSvg bodyTree) (nodeSvg rootBox)]\n    totalWidth\n    (nodeHeight rootBox) + space + (max (nodeHeight varBox) (nodeHeight bodyTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2")(lazy((function () {
  var main;
  var full = function (L_ast, L_v, L_b, L_mapFunc) {
    return (function(){
  var L_rootBox_0, L_varBox_1, L_bodyTree_2, L_childWidth_3, L_totalWidth_4, L_pad_5, L_rootBox_6, L_varBox_7, L_bodyTree_8;
  L_rootBox_0 = function(){return resolve(L_textNode)(function(){return resolve(L_mapFunc)(L_ast)(L_greenStyle)}, "lambda")};
  L_varBox_1 = function(){return resolve(L_textNode)(function(){return resolve(L_mapFunc)(L_ast)(L_greenStyle)}, L_v)};
  L_bodyTree_2 = function(){return resolve(L_nodeFor)(L_b, L_mapFunc)};
  L_childWidth_3 = function(){return resolve(L_$o)(function(){return resolve(L_$o)(function(){return resolve(L_nodeWidth)(L_varBox_1)})(L_space)})(function(){return resolve(L_nodeWidth)(L_bodyTree_2)})};
  L_totalWidth_4 = function(){return resolve(L_max)(L_childWidth_3)(function(){return resolve(L_nodeWidth)(L_rootBox_0)})};
  L_pad_5 = function(){return resolve(L_max)(0)(function(){return resolve(L_$f)(function(){return resolve(L_$_)(L_totalWidth_4)(L_childWidth_3)})(2)})};
  L_rootBox_6 = function(){return resolve(L_nodeTranslate)(L_rootBox_0, function(){return resolve(L_$_)(function(){return resolve(L_$f)(L_totalWidth_4)(2)})(function(){return resolve(L_$f)(function(){return resolve(L_nodeWidth)(L_rootBox_0)})(2)})}, 0)};
  L_varBox_7 = function(){return resolve(L_nodeTranslate)(L_varBox_1, L_pad_5, function(){return resolve(L_$o)(function(){return resolve(L_nodeHeight)(L_rootBox_6)})(L_space)})};
  L_bodyTree_8 = function(){return resolve(L_nodeTranslate)(L_bodyTree_2, function(){return resolve(L_$o)(function(){return resolve(L_$o)(L_pad_5)(function(){return resolve(L_nodeWidth)(L_varBox_7)})})(L_space)}, function(){return resolve(L_$o)(function(){return resolve(L_nodeHeight)(L_rootBox_6)})(L_space)})};

  return resolve(L_log)(3)(L_makeNode)(function(){return resolve(L_svgConcat)(function(){return resolve(L_cons)(function(){return resolve(L_nodeLine)(L_rootBox_6, L_varBox_7)}, function(){return resolve(L_cons)(function(){return resolve(L_nodeLine)(L_rootBox_6, L_bodyTree_8)}, function(){return resolve(L_cons)(function(){return resolve(L_nodeSvg)(L_varBox_7)}, function(){return resolve(L_cons)(function(){return resolve(L_nodeSvg)(L_bodyTree_8)}, function(){return resolve(L_cons)(function(){return resolve(L_nodeSvg)(L_rootBox_6)}, L_nil)})})})})})})(L_totalWidth_4)(function(){return resolve(L_$o)(function(){return resolve(L_$o)(function(){return resolve(L_nodeHeight)(L_rootBox_6)})(L_space)})(function(){return resolve(L_max)(function(){return resolve(L_nodeHeight)(L_varBox_7)})(function(){return resolve(L_nodeHeight)(L_bodyTree_8)})})})(function(){return resolve(L_$f)(L_totalWidth_4)(2)})(function(){return resolve(L_$f)(function(){return resolve(L_nodeHeight)(L_rootBox_6)})(2)})})();
  };
  var partial = function(L_ast) {
    var _1 = function(L_v) {
            var _2 = function(L_b) {
              var _3 = function(L_mapFunc) {
                return full(L_ast, L_v, L_b, L_mapFunc);
              };
              _3.leisureInfo = {arg: L_b, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_v, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_ast, name: main.leisureName};
          return _1;
  };
  main = function(L_ast, L_v, L_b, L_mapFunc, more) {
    if (L_mapFunc && (typeof more == "undefined" || more == null)) {
      return full(L_ast, L_v, L_b, L_mapFunc);
    } else if (typeof L_v == "undefined" || L_v == null) {
      return partial(L_ast);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createApplyNode")(4)("createApplyNode ast f a mapFunc = do\n  rootBox = textNode (mapFunc ast blueStyle) 'apply'\n  funcTree = nodeFor f mapFunc\n  argTree = nodeFor a mapFunc\n  childWidth = (nodeWidth argTree) + space + (nodeWidth funcTree)\n  totalWidth = max childWidth (nodeWidth rootBox)\n  pad = max 0 (totalWidth - childWidth) / 2\n  rootBox = nodeTranslate rootBox (totalWidth / 2 - (nodeWidth rootBox) / 2) 0\n  funcTree = nodeTranslate funcTree pad (nodeHeight rootBox) + space\n  argTree = nodeTranslate argTree (pad + (nodeWidth funcTree) + space) ((nodeHeight rootBox) + space)\n  makeNode\n    svgConcat [(nodeLine rootBox funcTree) (nodeLine rootBox argTree) (nodeSvg rootBox) (nodeSvg funcTree) (nodeSvg argTree)]\n    totalWidth\n    (nodeHeight rootBox) + space + (max (nodeHeight argTree) (nodeHeight funcTree))\n    totalWidth / 2\n    (nodeHeight rootBox) / 2")(lazy((function () {
  var main;
  var full = function (L_ast, L_f, L_a, L_mapFunc) {
    return (function(){
  var L_rootBox_0, L_funcTree_1, L_argTree_2, L_childWidth_3, L_totalWidth_4, L_pad_5, L_rootBox_6, L_funcTree_7, L_argTree_8;
  L_rootBox_0 = function(){return resolve(L_textNode)(function(){return resolve(L_mapFunc)(L_ast)(L_blueStyle)}, "apply")};
  L_funcTree_1 = function(){return resolve(L_nodeFor)(L_f, L_mapFunc)};
  L_argTree_2 = function(){return resolve(L_nodeFor)(L_a, L_mapFunc)};
  L_childWidth_3 = function(){return resolve(L_$o)(function(){return resolve(L_$o)(function(){return resolve(L_nodeWidth)(L_argTree_2)})(L_space)})(function(){return resolve(L_nodeWidth)(L_funcTree_1)})};
  L_totalWidth_4 = function(){return resolve(L_max)(L_childWidth_3)(function(){return resolve(L_nodeWidth)(L_rootBox_0)})};
  L_pad_5 = function(){return resolve(L_max)(0)(function(){return resolve(L_$f)(function(){return resolve(L_$_)(L_totalWidth_4)(L_childWidth_3)})(2)})};
  L_rootBox_6 = function(){return resolve(L_nodeTranslate)(L_rootBox_0, function(){return resolve(L_$_)(function(){return resolve(L_$f)(L_totalWidth_4)(2)})(function(){return resolve(L_$f)(function(){return resolve(L_nodeWidth)(L_rootBox_0)})(2)})}, 0)};
  L_funcTree_7 = function(){return resolve(L_nodeTranslate)(L_funcTree_1, L_pad_5, function(){return resolve(L_$o)(function(){return resolve(L_nodeHeight)(L_rootBox_6)})(L_space)})};
  L_argTree_8 = function(){return resolve(L_nodeTranslate)(L_argTree_2, function(){return resolve(L_$o)(function(){return resolve(L_$o)(L_pad_5)(function(){return resolve(L_nodeWidth)(L_funcTree_7)})})(L_space)}, function(){return resolve(L_$o)(function(){return resolve(L_nodeHeight)(L_rootBox_6)})(L_space)})};

  return resolve(L_makeNode)(function(){return resolve(L_svgConcat)(function(){return resolve(L_cons)(function(){return resolve(L_nodeLine)(L_rootBox_6, L_funcTree_7)}, function(){return resolve(L_cons)(function(){return resolve(L_nodeLine)(L_rootBox_6, L_argTree_8)}, function(){return resolve(L_cons)(function(){return resolve(L_nodeSvg)(L_rootBox_6)}, function(){return resolve(L_cons)(function(){return resolve(L_nodeSvg)(L_funcTree_7)}, function(){return resolve(L_cons)(function(){return resolve(L_nodeSvg)(L_argTree_8)}, L_nil)})})})})})}, L_totalWidth_4, function(){return resolve(L_$o)(function(){return resolve(L_$o)(function(){return resolve(L_nodeHeight)(L_rootBox_6)})(L_space)})(function(){return resolve(L_max)(function(){return resolve(L_nodeHeight)(L_argTree_8)})(function(){return resolve(L_nodeHeight)(L_funcTree_7)})})}, function(){return resolve(L_$f)(L_totalWidth_4)(2)}, function(){return resolve(L_$f)(function(){return resolve(L_nodeHeight)(L_rootBox_6)})(2)})})();
  };
  var partial = function(L_ast) {
    var _1 = function(L_f) {
            var _2 = function(L_a) {
              var _3 = function(L_mapFunc) {
                return full(L_ast, L_f, L_a, L_mapFunc);
              };
              _3.leisureInfo = {arg: L_a, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_f, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_ast, name: main.leisureName};
          return _1;
  };
  main = function(L_ast, L_f, L_a, L_mapFunc, more) {
    if (L_mapFunc && (typeof more == "undefined" || more == null)) {
      return full(L_ast, L_f, L_a, L_mapFunc);
    } else if (typeof L_f == "undefined" || L_f == null) {
      return partial(L_ast);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createRefNode")(3)("createRefNode ast ref mapFunc = textNode (mapFunc ast redStyle) ref")(lazy((function () {
  var main;
  var full = function (L_ast, L_ref, L_mapFunc) {
    return resolve(L_textNode)(function(){return resolve(L_mapFunc)(L_ast)(L_redStyle)}, L_ref);
  };
  var partial = function(L_ast) {
    var _1 = function(L_ref) {
            var _2 = function(L_mapFunc) {
              return full(L_ast, L_ref, L_mapFunc);
            };
            _2.leisureInfo = {arg: L_ref, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_ast, name: main.leisureName};
          return _1;
  };
  main = function(L_ast, L_ref, L_mapFunc, more) {
    if (L_mapFunc && (typeof more == "undefined" || more == null)) {
      return full(L_ast, L_ref, L_mapFunc);
    } else if (typeof L_ref == "undefined" || L_ref == null) {
      return partial(L_ast);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createLitNode")(3)("createLitNode ast lit mapFunc = textNode (mapFunc ast greenStyle) lit")(lazy((function () {
  var main;
  var full = function (L_ast, L_lit, L_mapFunc) {
    return resolve(L_textNode)(function(){return resolve(L_mapFunc)(L_ast)(L_greenStyle)}, L_lit);
  };
  var partial = function(L_ast) {
    var _1 = function(L_lit) {
            var _2 = function(L_mapFunc) {
              return full(L_ast, L_lit, L_mapFunc);
            };
            _2.leisureInfo = {arg: L_lit, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_ast, name: main.leisureName};
          return _1;
  };
  main = function(L_ast, L_lit, L_mapFunc, more) {
    if (L_mapFunc && (typeof more == "undefined" || more == null)) {
      return full(L_ast, L_lit, L_mapFunc);
    } else if (typeof L_lit == "undefined" || L_lit == null) {
      return partial(L_ast);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("textNode")(2)("textNode map txt = (svgMeasureText txt '') \\w h . do\n  nodeW = w + 24\n  nodeH = h + 14\n  makeNode\n    (svgConcat [(rect [['x'|2] ['y'|2] ['width'|nodeW] ['height'|nodeH] | map]) (text txt [['pointer-events' | 'none'] ['text-anchor'|\"middle\"] ['dominant-baseline'|\"mathematical\"] ['x'| 14 + w / 2] ['y'| border + h / 2] ['font-weight'|'bold']])])\n    nodeW\n    nodeH\n    nodeW / 2\n    nodeH / 2")(lazy((function () {
  var main;
  var full = function (L_map, L_txt) {
    return resolve(L_svgMeasureText)(L_txt)("")(lazy(function(L_w){return $F(arguments, function(L_h){return (function(){
  var L_nodeW_0, L_nodeH_1;
  L_nodeW_0 = function(){return resolve(L_$o)(L_w)(24)};
  L_nodeH_1 = function(){return resolve(L_$o)(L_h)(14)};

  return resolve(L_makeNode)(function(){return resolve(L_svgConcat)(function(){return resolve(L_cons)(function(){return resolve(L_rect)(function(){return resolve(L_cons)(function(){return resolve(L_cons)("x", 2)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("y", 2)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("width", L_nodeW_0)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("height", L_nodeH_1)}, L_map)})})})})}, function(){return resolve(L_cons)(function(){return resolve(L_text)(L_txt, function(){return resolve(L_cons)(function(){return resolve(L_cons)("pointer-events", "none")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("text-anchor", "middle")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("dominant-baseline", "mathematical")}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("x", function(){return resolve(L_$o)(14)(function(){return resolve(L_$f)(L_w)(2)})})}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("y", function(){return resolve(L_$o)(L_border)(function(){return resolve(L_$f)(L_h)(2)})})}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("font-weight", "bold")}, L_nil)})})})})})})}, L_nil)})})}, L_nodeW_0, L_nodeH_1, function(){return resolve(L_$f)(L_nodeW_0)(2)}, function(){return resolve(L_$f)(L_nodeH_1)(2)})})()})}));
  };
  var partial = function(L_map) {
    var _1 = function(L_txt) {
            return full(L_map, L_txt);
          };
          _1.leisureInfo = {arg: L_map, name: main.leisureName};
          return _1;
  };
  main = function(L_map, L_txt, more) {
    if (L_txt && (typeof more == "undefined" || more == null)) {
      return full(L_map, L_txt);
    } else if (typeof L_txt == "undefined" || L_txt == null) {
      return partial(L_map);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))}]);

//# sourceMappingURL=parseAst.map
