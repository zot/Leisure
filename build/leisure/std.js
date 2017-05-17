"use strict";
define([], function(){
  return L_runMonads([
    function(){return resolve(L__declareType)("repeat", "sequence")},
    function(){return resolve(L__declareType)("range", "sequence")},
    function(){return resolve(L__declareType)("hamt", "keyedSequence")},
    function(){return resolve(L__declareType)("amtSet", "sequence")},
    function(){return resolve(L__declareType)("vector", "sequence")},
    function(){return resolve(L__declareType)("fold", 0)},
    function(){return resolve(L__declareType)("flatWrapper", 0)},
    function(){return resolve(L__declareType)("wrapped", 0)},
    function(){return resolve(L__declareType)("wrappedRun", 0)},
    function(){return resolve(L__declareType)("html", 0)},
    function(){return resolve(L_defMacro)("write[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("write", function(){return resolve(L_cons)(function(){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list);});}, L_nil);}, L_nil);});}, L_nil);})});
  L_$F.leisureFunctionId = 531;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("write[", "]")},
    function(){return resolve(L_defMacro)("s[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list);});}, L_nil);}, L_nil);})});
  L_$F.leisureFunctionId = 532;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("s[", "]")},
    function(){return resolve(L_defMacro)("err[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("err", function(){return resolve(L_cons)(function(){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list);});}, L_nil);}, L_nil);});}, L_nil);})});
  L_$F.leisureFunctionId = 533;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("err[", "]")},
    function(){return resolve(L_defMacro)("declareType", lazy((function(){
  var L_$F = (function(L_list){return (function(){  var L_type1, L_t1, L_type2;
  L_type1 = function(){return resolve(L_strTokenString)(function(){return resolve(L_head)(L_list);});};
  L_t1 = function(){return resolve(L_tail)(L_list);};
  L_type2 = function(){return resolve(L_strTokenString)(function(){return resolve(L_head)(L_t1);});};

  return resolve(L_not)(function(){return resolve(L_isList)(L_list);})(function(){return resolve(L_parseErr)("Extends needs 1 or 2 arguments but there were none");})(function(){return resolve(L_isCons)(L_t1)(function(){return resolve(L_cons)("_declareType", function(){return resolve(L_cons)(function(){return resolve(L_jsonStringify)(L_type1, L_id, L_id);}, function(){return resolve(L_cons)(function(){return resolve(L_jsonStringify)(L_type2, L_id, L_id);}, L_nil);});});})(function(){return resolve(L_cons)("_declareType", function(){return resolve(L_cons)(function(){return resolve(L_jsonStringify)(L_type1, L_id, L_id);}, function(){return resolve(L_cons)("0", L_nil);});});});})})()});
  L_$F.leisureFunctionId = 534;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("afetch", 2, "afetch k alist  = alist (\\h t D . h \\key value . eq key k value (afetch k t)) nil", lazy((function(){
  var L_$F = function(L_k, L_alist) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_alist))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_h)(lazy((function(){
  var L_$F = (function(L_key){return (function(){
  var L_$F = (function(L_value){return resolve(L_eq)(L_key, L_k)(L_value)(function(){return resolve(L_afetch)(L_k, L_t);})});
  L_$F.leisureFunctionId = 539;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 538;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 537;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 536;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 535;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil);
  };
  L_$F.leisureFunctionId = 540;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("js[", "]")},
    function(){return resolve(L_defMacro)("js[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("js", function(){return resolve(L_cons)(function(){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)("flatten", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list);});}, L_nil);}, L_nil);});}, L_nil);});}, L_nil);})});
  L_$F.leisureFunctionId = 541;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("html", 1, "html x = \\f . f x", lazy(setDataType((function(){
  var L_$F = (function(L_x){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_x)});
  L_$F.leisureFunctionId = 543;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'html')});
  L_$F.leisureFunctionId = 542;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'html')))},
    function(){return resolve(L_newDefine)("getHtml", 1, "getHtml x = x \\h . h", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_x)(lazy((function(){
  var L_$F = (function(L_h){return resolve(L_h)});
  L_$F.leisureFunctionId = 545;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 544;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("iszero", 0, "iszero = eq 0", function(){return resolve(L_eq)(0);})},
    function(){return resolve(L_newDefine)("positive", 0, "positive = 0 <", function(){return resolve(L_$y)(0);})},
    function(){return resolve(L_addToken)("--")},
    function(){return resolve(L_addToken)("++")},
    function(){return resolve(L_newDefine)("--", 0, "-- = (flip (-)) 1", function(){return resolve(L_flip)(L_$_)(1);})},
    function(){return resolve(L_newDefine)("++", 0, "++ = (1 +)", function(){return resolve(L_$o)(1);})},
    function(){return resolve(L_newDefine)("intercalate", 2, "intercalate x l = strCat (intersperse x l)", lazy((function(){
  var L_$F = function(L_x, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_intersperse)(L_x, L_l);});
  };
  L_$F.leisureFunctionId = 546;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("string", 0, "string = \\x . show x", lazy(setDataType(setType((function(){
  var L_$F = (function(L_x){return resolve(L_show)(L_x)});
  L_$F.leisureFunctionId = 547;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'string'), 'string')))},
    function(){return resolve(L_newDefine)("visit", 2, "visit func l = \\\\\r\n  result = func func l\r\n  .\r\n  isCons result\r\n    result \\h t . cons (visit func h) (visit func t)\r\n    result", lazy((function(){
  var L_$F = function(L_func, L_l) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_result;
  L_result = function(){return L$(resolve(L_func))(L_func, L_l);};

  return resolve(L_isCons)(L_result)(function(){return resolve(L_result)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_cons)(function(){return resolve(L_visit)(L_func, L_h);}, function(){return resolve(L_visit)(L_func, L_t);})});
  L_$F.leisureFunctionId = 549;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 548;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(L_result)})();
  };
  L_$F.leisureFunctionId = 550;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("stripNesting", 1, "stripNesting l = isCons l\r\n  l \\h t . (isCons h) && (isNil t)\r\n    stripNesting h\r\n    _map stripNesting l\r\n  l", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_isCons)(L_l)(function(){return resolve(L_l)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_$h$h)(function(){return resolve(L_isCons)(L_h);})(function(){return resolve(L_isNil)(L_t);})(function(){return resolve(L_stripNesting)(L_h);})(function(){return resolve(L__map)(L_stripNesting, L_l);})});
  L_$F.leisureFunctionId = 553;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 552;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(L_l)});
  L_$F.leisureFunctionId = 551;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("simplify", 1, "simplify exprString = do\r\n  list <- scanLineM exprString\r\n  stripNesting (visit (\\func x . isToken x (tokenString x) ((isParens x) (visit func (parensContent x)) x)) list)", lazy((function(){
  var L_$F = (function(L_exprString){return resolve(L_bind)(function(){return resolve(L_scanLineM)(L_exprString);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_stripNesting)(function(){return resolve(L_visit)(lazy((function(){
  var L_$F = (function(L_func){return (function(){
  var L_$F = (function(L_x){return resolve(L_isToken)(L_x)(function(){return resolve(L_tokenString)(L_x);})(function(){return resolve(L_isParens)(L_x)(function(){return resolve(L_visit)(L_func, function(){return resolve(L_parensContent)(L_x);});})(L_x);})});
  L_$F.leisureFunctionId = 557;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 556;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_list);})});
  L_$F.leisureFunctionId = 555;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 554;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("range", 2, "range a b = \\f . f a b", lazy(setDataType((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_a)(L_b)});
  L_$F.leisureFunctionId = 558;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'range');
  };
  L_$F.leisureFunctionId = 559;
  L_$F.leisureLength = 2;
  return L_$F;
})(), 'range')))},
    function(){return resolve(L_newDefine)("upto", 1, "upto n = range 0 n", lazy((function(){
  var L_$F = (function(L_n){return resolve(L_range)(0, L_n)});
  L_$F.leisureFunctionId = 560;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("repeat", 1, "repeat n = \\f . f n", lazy(setDataType((function(){
  var L_$F = (function(L_n){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_n)});
  L_$F.leisureFunctionId = 562;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'repeat')});
  L_$F.leisureFunctionId = 561;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'repeat')))},
    function(){return resolve(L_newDefine)("isRepeat", 1, "isRepeat r = hasType r repeat", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_hasType)(L_r, L_repeat)});
  L_$F.leisureFunctionId = 563;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isRange", 1, "isRange r = hasType r range", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_hasType)(L_r, L_range)});
  L_$F.leisureFunctionId = 564;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("runRepeat", 3, "runRepeat count limit f = count < limit\r\n  [(f count) | runRepeat (count + 1) limit f]\r\n  []", lazy((function(){
  var L_$F = function(L_count, L_limit, L_f) {
    return L_checkPartial(L_$F, arguments) || resolve(L_$y)(L_count, L_limit)(function(){return resolve(L_cons)(function(){return resolve(L_f)(L_count);}, function(){return resolve(L_runRepeat)(function(){return resolve(L_$o)(L_count, 1);}, L_limit, L_f);});})(L_nil);
  };
  L_$F.leisureFunctionId = 565;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("all", 2, "all func seq = isNil seq\r\n  true\r\n  func (head seq)\r\n    all func (tail seq)\r\n    false\r\n    ", lazy((function(){
  var L_$F = function(L_func, L_seq) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_seq)(L_true)(function(){return L$(resolve(L_func))(function(){return resolve(L_head)(L_seq);}, function(){return resolve(L_all)(L_func, function(){return resolve(L_tail)(L_seq);});}, L_false);});
  };
  L_$F.leisureFunctionId = 566;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("partition", 2, "partition func list = subpartition [] func list", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_subpartition)(L_nil, L_func, L_list);
  };
  L_$F.leisureFunctionId = 567;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("subpartition", 3, "subpartition res func list = isNil list\r\n  triple [] [] []\r\n  func (head list)\r\n    triple (_reverse res) (head list) (tail list)\r\n    subpartition [(head list) | res] func (tail list)", lazy((function(){
  var L_$F = function(L_res, L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_list)(function(){return resolve(L_triple)(L_nil, L_nil, L_nil);})(function(){return L$(resolve(L_func))(function(){return resolve(L_head)(L_list);}, function(){return resolve(L_triple)(function(){return resolve(L__reverse)(L_res);}, function(){return resolve(L_head)(L_list);}, function(){return resolve(L_tail)(L_list);});}, function(){return resolve(L_subpartition)(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_list);}, L_res);}, L_func, function(){return resolve(L_tail)(L_list);});});});
  };
  L_$F.leisureFunctionId = 568;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("findOption", 2, "findOption func list = do\r\n  result = func (head list)\r\n  isNil list\r\n    none\r\n    isNone result\r\n      findOption func (tail list)\r\n      result", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_result;
  L_result = function(){return resolve(L_func)(function(){return resolve(L_head)(L_list);});};

  return resolve(L_isNil)(L_list)(L_none)(function(){return resolve(L_isNone)(L_result)(function(){return resolve(L_findOption)(L_func, function(){return resolve(L_tail)(L_list);});})(L_result);})})();
  };
  L_$F.leisureFunctionId = 569;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("differencelist", 0, "differencelist = \\@dataType differencelist .\\@type differencelist . \\x . x", lazy(setDataType(setType((function(){
  var L_$F = (function(L_x){return resolve(L_x)});
  L_$F.leisureFunctionId = 570;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'differencelist'), 'differencelist')))},
    function(){return resolve(L_newDefine)("dlitem", 1, "dlitem item = \\@type differencelist . \\rest . item : rest", lazy((function(){
  var L_$F = (function(L_item){return setType((function(){
  var L_$F = (function(L_rest){return resolve(L_cons)(L_item, L_rest)});
  L_$F.leisureFunctionId = 572;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'differencelist')});
  L_$F.leisureFunctionId = 571;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("dlpush", 2, "dlpush list item = dlappend list \\rest . item : rest", lazy((function(){
  var L_$F = function(L_list, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_dlappend)(L_list, lazy((function(){
  var L_$F = (function(L_rest){return resolve(L_cons)(L_item, L_rest)});
  L_$F.leisureFunctionId = 573;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 574;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("dlappend", 2, "dlappend a b = \\@type differencelist . \\rest . a (b rest)", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_rest){return resolve(L_a)(function(){return resolve(L_b)(L_rest);})});
  L_$F.leisureFunctionId = 575;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'differencelist');
  };
  L_$F.leisureFunctionId = 576;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("dllist", 1, "dllist l = \\@type differencelist . \\rest . _append l rest", lazy((function(){
  var L_$F = (function(L_l){return setType((function(){
  var L_$F = (function(L_rest){return resolve(L__append)(L_l, L_rest)});
  L_$F.leisureFunctionId = 578;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'differencelist')});
  L_$F.leisureFunctionId = 577;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isDl", 1, "isDl x = hasType x differencelist", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_hasType)(L_x, L_differencelist)});
  L_$F.leisureFunctionId = 579;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("append[", "]")},
    function(){return resolve(L_defMacro)("append[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_foldr1)(lazy((function(){
  var L_$F = (function(L_item){return (function(){
  var L_$F = (function(L_rest){return resolve(L_cons)("append", function(){return resolve(L_cons)(L_item, function(){return resolve(L_cons)(L_rest, L_nil);});})});
  L_$F.leisureFunctionId = 582;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 581;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_head)(L_list);})});
  L_$F.leisureFunctionId = 580;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("dl[", "]")},
    function(){return resolve(L_defMacro)("dl[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("\\@", function(){return resolve(L_cons)("type", function(){return resolve(L_cons)("differencelist", function(){return resolve(L_cons)(".", function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)("rest", function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_listifyDl)(function(){return resolve(L_head)(L_list);}, "rest");}, L_nil);});});});});});});})});
  L_$F.leisureFunctionId = 583;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("listifyDl", 2, "listifyDl list lvar =\r\n  isNil list\r\n    lvar\r\n    partition (flip isTokenString '|') list \\front middle back .\r\n      isNil middle\r\n        _foldl (\\acc el . ['cons' el acc]) lvar (reverse list)\r\n        _foldl (\\acc el . ['cons' el acc]) [[back] lvar] (reverse front)", lazy((function(){
  var L_$F = function(L_list, L_lvar) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_list)(L_lvar)(function(){return resolve(L_partition)(function(){return resolve(L_flip)(L_isTokenString)("|");}, L_list)(lazy((function(){
  var L_$F = (function(L_front){return (function(){
  var L_$F = (function(L_middle){return (function(){
  var L_$F = (function(L_back){return resolve(L_isNil)(L_middle)(function(){return resolve(L__foldl)(lazy((function(){
  var L_$F = (function(L_acc){return (function(){
  var L_$F = (function(L_el){return resolve(L_cons)("cons", function(){return resolve(L_cons)(L_el, function(){return resolve(L_cons)(L_acc, L_nil);});})});
  L_$F.leisureFunctionId = 588;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 587;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_lvar, function(){return resolve(L_reverse)(L_list);});})(function(){return resolve(L__foldl)(lazy((function(){
  var L_$F = (function(L_acc){return (function(){
  var L_$F = (function(L_el){return resolve(L_cons)("cons", function(){return resolve(L_cons)(L_el, function(){return resolve(L_cons)(L_acc, L_nil);});})});
  L_$F.leisureFunctionId = 590;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 589;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_back, L_nil);}, function(){return resolve(L_cons)(L_lvar, L_nil);});}, function(){return resolve(L_reverse)(L_front);});})});
  L_$F.leisureFunctionId = 586;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 585;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 584;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));});
  };
  L_$F.leisureFunctionId = 591;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("map{", "}")},
    function(){return resolve(L_defMacro)("map{", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_listifyOp)("mapPair", function(){return resolve(L_head)(L_list);}, "hamt")});
  L_$F.leisureFunctionId = 592;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("mapPair", 2, "mapPair keyValue map = keyValue \\key value . mapSet key value map", lazy((function(){
  var L_$F = function(L_keyValue, L_map) {
    return L_checkPartial(L_$F, arguments) || resolve(L_keyValue)(lazy((function(){
  var L_$F = (function(L_key){return (function(){
  var L_$F = (function(L_value){return resolve(L_mapSet)(L_key, L_value, L_map)});
  L_$F.leisureFunctionId = 594;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 593;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 595;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isMap", 1, "isMap h = hasType h hamt", lazy((function(){
  var L_$F = (function(L_h){return resolve(L_hasType)(L_h, L_hamt)});
  L_$F.leisureFunctionId = 596;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("mapFoldr", 3, "mapFoldr func finalValue map = empty map\r\n  finalValue\r\n  map \\h t . func h (mapFoldr func finalValue t)", lazy((function(){
  var L_$F = function(L_func, L_finalValue, L_map) {
    return L_checkPartial(L_$F, arguments) || resolve(L_empty)(L_map)(L_finalValue)(function(){return resolve(L_map)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return L$(resolve(L_func))(L_h, function(){return resolve(L_mapFoldr)(L_func, L_finalValue, L_t);})});
  L_$F.leisureFunctionId = 598;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 597;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));});
  };
  L_$F.leisureFunctionId = 599;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("toAlist", 1, "toAlist map = mapFoldr aconsPair nil map", lazy((function(){
  var L_$F = (function(L_map){return resolve(L_mapFoldr)(L_aconsPair, L_nil, L_map)});
  L_$F.leisureFunctionId = 600;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("set[", "]")},
    function(){return resolve(L_defMacro)("set[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_listifyOp)("setAdd", function(){return resolve(L_head)(L_list);}, "amtSet")});
  L_$F.leisureFunctionId = 601;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isSet", 1, "isSet s = hasType s amtSet", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_hasType)(L_s, L_amtSet)});
  L_$F.leisureFunctionId = 602;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("setEmpty", 1, "setEmpty s = (setSize s) == 0", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_$p$p)(function(){return resolve(L_setSize)(L_s);}, 0)});
  L_$F.leisureFunctionId = 603;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("vec[", "]")},
    function(){return resolve(L_defMacro)("vec[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_listifyOp)("vectorUnshift", function(){return resolve(L_head)(L_list);}, "vector")});
  L_$F.leisureFunctionId = 604;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isVector", 1, "isVector v = hasType v vector", lazy((function(){
  var L_$F = (function(L_v){return resolve(L_hasType)(L_v, L_vector)});
  L_$F.leisureFunctionId = 605;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("push", 0, "push = vectorPush", L_vectorPush)},
    function(){return resolve(L_newDefine)("pop", 0, "pop = vectorPop", L_vectorPop)},
    function(){return resolve(L_newDefine)("shift", 0, "shift = vectorShift", L_vectorShift)},
    function(){return resolve(L_newDefine)("unshift", 0, "unshift = vectorUnshift", L_vectorUnshift)},
    function(){return resolve(L_newDefine)("remove", 2, "remove x l = removeIf (eq x) l", lazy((function(){
  var L_$F = function(L_x, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_removeIf)(function(){return resolve(L_eq)(L_x);}, L_l);
  };
  L_$F.leisureFunctionId = 606;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("removeIf", 2, "removeIf f l = filter (compose not f) l", lazy((function(){
  var L_$F = function(L_f, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_filter)(function(){return resolve(L_compose)(L_not, L_f);})(L_l);
  };
  L_$F.leisureFunctionId = 607;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("take", 2, "take n list = positive n\r\n  list\r\n    \\h t D . cons h (take (-- n) t)\r\n    nil\r\n  nil", lazy((function(){
  var L_$F = function(L_n, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_positive)(L_n)(function(){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_cons)(L_h, function(){return resolve(L_take)(function(){return resolve(L_$_$_)(L_n);}, L_t);})});
  L_$F.leisureFunctionId = 610;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 609;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 608;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);})(L_nil);
  };
  L_$F.leisureFunctionId = 611;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("takeWhile", 2, "takeWhile predicate list = list\r\n  \\h t D . predicate (head list)\r\n    cons h (takeWhile predicate t)\r\n    nil\r\n  nil", lazy((function(){
  var L_$F = function(L_predicate, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return L$(resolve(L_predicate))(function(){return resolve(L_head)(L_list);}, function(){return resolve(L_cons)(L_h, function(){return resolve(L_takeWhile)(L_predicate, L_t);});}, L_nil)});
  L_$F.leisureFunctionId = 614;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 613;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 612;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);
  };
  L_$F.leisureFunctionId = 615;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("drop", 2, "drop x list = positive x\r\n  list\r\n    \\h t D . drop (-- x) t\r\n    nil\r\n  list", lazy((function(){
  var L_$F = function(L_x, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_positive)(L_x)(function(){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_drop)(function(){return resolve(L_$_$_)(L_x);}, L_t)});
  L_$F.leisureFunctionId = 618;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 617;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 616;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);})(L_list);
  };
  L_$F.leisureFunctionId = 619;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("dropWhile", 2, "dropWhile predicate list = list\r\n  \\h t D . predicate h\r\n    dropWhile predicate t\r\n    list\r\n  nil", lazy((function(){
  var L_$F = function(L_predicate, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return L$(resolve(L_predicate))(L_h, function(){return resolve(L_dropWhile)(L_predicate, L_t);}, L_list)});
  L_$F.leisureFunctionId = 622;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 621;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 620;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);
  };
  L_$F.leisureFunctionId = 623;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("dropLast", 2, "dropLast n list = reverse (drop n (reverse list))", lazy((function(){
  var L_$F = function(L_n, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_reverse)(function(){return resolve(L_drop)(L_n, function(){return resolve(L_reverse)(L_list);});});
  };
  L_$F.leisureFunctionId = 624;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("box", 2, "box n list = list == nil\r\n  nil\r\n  [(take n list) | box n (drop n list)]", lazy((function(){
  var L_$F = function(L_n, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_$p$p)(L_list, L_nil)(L_nil)(function(){return resolve(L_cons)(function(){return resolve(L_take)(L_n, L_list);}, function(){return resolve(L_box)(L_n, function(){return resolve(L_drop)(L_n, L_list);});});});
  };
  L_$F.leisureFunctionId = 625;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("at", 2, "at l x = (x == 0) (head l) (at (tail l) (-- (x) ) )", lazy((function(){
  var L_$F = function(L_l, L_x) {
    return L_checkPartial(L_$F, arguments) || resolve(L_$p$p)(L_x, 0)(function(){return resolve(L_head)(L_l);})(function(){return resolve(L_at)(function(){return resolve(L_tail)(L_l);}, function(){return resolve(L_$_$_)(L_x);});});
  };
  L_$F.leisureFunctionId = 626;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("series", 2, "series func n = n:(series func (func n))", lazy((function(){
  var L_$F = function(L_func, L_n) {
    return L_checkPartial(L_$F, arguments) || resolve(L_cons)(L_n, function(){return resolve(L_series)(L_func, function(){return resolve(L_func)(L_n);});});
  };
  L_$F.leisureFunctionId = 627;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("from", 1, "from n = series ++ n", lazy((function(){
  var L_$F = (function(L_n){return resolve(L_series)(L_$o$o, L_n)});
  L_$F.leisureFunctionId = 628;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fromBy", 2, "fromBy n inc = series ((+) inc) n", lazy((function(){
  var L_$F = function(L_n, L_inc) {
    return L_checkPartial(L_$F, arguments) || resolve(L_series)(function(){return resolve(L_$o)(L_inc);}, L_n);
  };
  L_$F.leisureFunctionId = 629;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fromTo", 2, "fromTo n m = takeWhile ((>) m) (from n)", lazy((function(){
  var L_$F = function(L_n, L_m) {
    return L_checkPartial(L_$F, arguments) || resolve(L_takeWhile)(function(){return resolve(L_$z)(L_m);}, function(){return resolve(L_from)(L_n);});
  };
  L_$F.leisureFunctionId = 630;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fromToBy", 3, "fromToBy n m inc = takeWhile ((>) m) (fromBy n inc)", lazy((function(){
  var L_$F = function(L_n, L_m, L_inc) {
    return L_checkPartial(L_$F, arguments) || resolve(L_takeWhile)(function(){return resolve(L_$z)(L_m);}, function(){return resolve(L_fromBy)(L_n, L_inc);});
  };
  L_$F.leisureFunctionId = 631;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("count", 2, "count x l = countIf (eq x) l", lazy((function(){
  var L_$F = function(L_x, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_countIf)(function(){return resolve(L_eq)(L_x);}, L_l);
  };
  L_$F.leisureFunctionId = 632;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countIf", 2, "countIf f l = (eq l nil) 0\r\n  + (f (head l) 1 0) (countIf f (tail l))", lazy((function(){
  var L_$F = function(L_f, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_eq)(L_l, L_nil)(0)(function(){return resolve(L_$o)(function(){return L$(resolve(L_f))(function(){return resolve(L_head)(L_l);}, 1, 0);}, function(){return resolve(L_countIf)(L_f, function(){return resolve(L_tail)(L_l);});});});
  };
  L_$F.leisureFunctionId = 633;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countIfNot", 2, "countIfNot f l = countIf (\\x. not (f x)) l", lazy((function(){
  var L_$F = function(L_f, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_countIf)(lazy((function(){
  var L_$F = (function(L_x){return resolve(L_not)(function(){return resolve(L_f)(L_x);})});
  L_$F.leisureFunctionId = 634;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_l);
  };
  L_$F.leisureFunctionId = 635;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("sort", 1, "sort l = sortBy (<=) l", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_sortBy)(L_$y$p, L_l)});
  L_$F.leisureFunctionId = 636;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("sortBy", 2, "sortBy cmp l = mergeSort cmp l", lazy((function(){
  var L_$F = function(L_cmp, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_mergeSort)(L_cmp, L_l);
  };
  L_$F.leisureFunctionId = 637;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("toJson", 1, "toJson obj = isString obj obj\r\n  isKeyedSequence obj\r\n    toJsonObject (foldr (\\pair rest . pair \\h t . [[(toJson h)|(toJson t)] | rest]) nil obj)\r\n    isSequence obj\r\n      toJsonArray (foldr (\\item rest . [(toJson item) | rest]) nil obj)\r\n      obj", lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_isString)(L_obj)(L_obj)(function(){return resolve(L_isKeyedSequence)(L_obj)(function(){return resolve(L_toJsonObject)(function(){return resolve(L_foldr)(lazy((function(){
  var L_$F = (function(L_pair){return (function(){
  var L_$F = (function(L_rest){return resolve(L_pair)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_toJson)(L_h);}, function(){return resolve(L_toJson)(L_t);});}, L_rest)});
  L_$F.leisureFunctionId = 642;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 641;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 640;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 639;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)(L_obj);});})(function(){return resolve(L_isSequence)(L_obj)(function(){return resolve(L_toJsonArray)(function(){return resolve(L_foldr)(lazy((function(){
  var L_$F = (function(L_item){return (function(){
  var L_$F = (function(L_rest){return resolve(L_cons)(function(){return resolve(L_toJson)(L_item);}, L_rest)});
  L_$F.leisureFunctionId = 644;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 643;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)(L_obj);});})(L_obj);});})});
  L_$F.leisureFunctionId = 638;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("toYaml", 1, "toYaml jsonStuff = jsonToYaml (toJson jsonStuff)", lazy((function(){
  var L_$F = (function(L_jsonStuff){return resolve(L_jsonToYaml)(function(){return resolve(L_toJson)(L_jsonStuff);})});
  L_$F.leisureFunctionId = 645;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addToken)("->")},
    function(){return resolve(L_newDefine)("mkStr", 1, "mkStr tok = concat['\"' (tokenString tok) '\"']", lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_strCat)(function(){return resolve(L_cons)("\"", function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(L_tok);}, function(){return resolve(L_cons)("\"", L_nil);});});})});
  L_$F.leisureFunctionId = 646;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("defCase", lazy((function(){
  var L_$F = (function(L_list){return (function(){  var L_h1, L_t1, L_h2, L_t2, L_h3, L_t3;
  L_h1 = function(){return resolve(L_head)(L_list);};
  L_t1 = function(){return resolve(L_tail)(L_list);};
  L_h2 = function(){return resolve(L_head)(L_t1);};
  L_t2 = function(){return resolve(L_tail)(L_t1);};
  L_h3 = function(){return resolve(L_head)(L_t2);};
  L_t3 = function(){return resolve(L_tail)(L_t2);};

  return resolve(L_and)(function(){return resolve(L_all)(L_isCons, function(){return resolve(L_cons)(L_list, function(){return resolve(L_cons)(L_t1, function(){return resolve(L_cons)(L_t2, L_nil);});});});}, function(){return resolve(L_and)(function(){return resolve(L_isTokenString)(L_h2, ".");}, L_true);})(function(){return resolve(L_makeCaseArgs)(L_list, function(){return resolve(L_mkStr)(L_h1);}, function(){return resolve(L_mkStr)(L_h3);}, L_t3, L_id);})(function(){return resolve(L_parseErr)("Error in case definition -- expected func.name args | condition -> action, but got ", L_list);})})()});
  L_$F.leisureFunctionId = 647;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("makeCaseArgs", 5, "makeCaseArgs orig funcName altName rest args = rest\r\n  \\h t D . isTokenString h '|'\r\n    makeCaseCondition orig funcName altName (args nil) t id\r\n    makeCaseArgs orig funcName altName t (dlpush args h)\r\n  parseErr \"Error in case definition -- expected func.name args | condition -> action, but got \" orig", lazy((function(){
  var L_$F = function(L_orig, L_funcName, L_altName, L_rest, L_args) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_rest))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){return resolve(L_makeCaseCondition)(L_orig, L_funcName, L_altName, function(){return resolve(L_args)(L_nil);}, L_t, L_id);})(function(){return resolve(L_makeCaseArgs)(L_orig, L_funcName, L_altName, L_t, function(){return resolve(L_dlpush)(L_args, L_h);});})});
  L_$F.leisureFunctionId = 650;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 649;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 648;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_parseErr)("Error in case definition -- expected func.name args | condition -> action, but got ", L_orig);});
  };
  L_$F.leisureFunctionId = 651;
  L_$F.leisureLength = 5;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("makeCaseCondition", 6, "makeCaseCondition orig funcName altName args rest condition = rest\r\n  \\h t D . isTokenString h '->'\r\n    ['bind' (_foldr1 _append [['advise' funcName altName (length args) '\\\\'] args ['.' (condition nil) ['some' t] 'none']]) ['\\\\' '_' '.' 'unit']]\r\n    makeCaseCondition orig funcName altName args t (dlpush condition h)\r\n parseErr \"Error in case definition -- expected func.name args | condition -> action, but got \" orig", lazy((function(){
  var L_$F = function(L_orig, L_funcName, L_altName, L_args, L_rest, L_condition) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_rest))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isTokenString)(L_h, "->")(function(){return resolve(L_cons)("bind", function(){return resolve(L_cons)(function(){return resolve(L__foldr1)(L__append, function(){return resolve(L_cons)(function(){return resolve(L_cons)("advise", function(){return resolve(L_cons)(L_funcName, function(){return resolve(L_cons)(L_altName, function(){return resolve(L_cons)(function(){return resolve(L_length)(L_args);}, function(){return resolve(L_cons)("\\", L_nil);});});});});}, function(){return resolve(L_cons)(L_args, function(){return resolve(L_cons)(function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_condition)(L_nil);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("some", function(){return resolve(L_cons)(L_t, L_nil);});}, function(){return resolve(L_cons)("none", L_nil);});});});}, L_nil);});});});}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)("_", function(){return resolve(L_cons)(".", function(){return resolve(L_cons)("unit", L_nil);});});});}, L_nil);});});})(function(){return resolve(L_makeCaseCondition)(L_orig, L_funcName, L_altName, L_args, L_t, function(){return resolve(L_dlpush)(L_condition, L_h);});})});
  L_$F.leisureFunctionId = 654;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 653;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 652;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_parseErr)("Error in case definition -- expected func.name args | condition -> action, but got ", L_orig);});
  };
  L_$F.leisureFunctionId = 655;
  L_$F.leisureLength = 6;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("defTypeCase", lazy((function(){
  var L_$F = (function(L_list){return (function(){  var L_func, L_t1, L_dot, L_t2, L_type, L_rest, L_str;
  L_func = function(){return resolve(L_head)(L_list);};
  L_t1 = function(){return resolve(L_tail)(L_list);};
  L_dot = function(){return resolve(L_head)(L_t1);};
  L_t2 = function(){return resolve(L_tail)(L_t1);};
  L_type = function(){return resolve(L_head)(L_t2);};
  L_rest = function(){return resolve(L_tail)(L_t2);};
  L_str = function(){return (function(){
  var L_$F = (function(L_tok){return resolve(L_jsonStringify)(function(){return resolve(L_strTokenString)(L_tok);}, L_id, L_id)});
  L_$F.leisureFunctionId = 657;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})();};

  return resolve(L_and)(function(){return resolve(L_all)(L_isCons, function(){return resolve(L_cons)(L_list, function(){return resolve(L_cons)(L_t1, function(){return resolve(L_cons)(L_t2, function(){return resolve(L_cons)(L_rest, L_nil);});});});});}, function(){return resolve(L_isTokenString)(L_dot, ".");})(function(){return resolve(L_partition)(function(){return resolve(L_flip)(L_isTokenString)("->");}, L_rest)(lazy((function(){
  var L_$F = (function(L_args){return (function(){
  var L_$F = (function(L_arrow){return (function(){
  var L_$F = (function(L_body){return resolve(L_isNil)(L_arrow)(function(){return resolve(L_parseErr)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("No -> in defTypeCase: ", function(){return resolve(L_cons)(L_list, L_nil);});});});})(function(){return resolve(L_cons)("_defTypeCase", function(){return resolve(L_cons)(function(){return resolve(L_str)(L_func);}, function(){return resolve(L_cons)(function(){return resolve(L_str)(L_type);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("\\@", function(){return resolve(L_cons)("arity", function(){return resolve(L_cons)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(function(){return resolve(L_length)(L_args);}, L_nil);});}, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)("\\", function(){return resolve(L__append)(L_args, function(){return resolve(L_cons)(".", L_body);});});});});});});}, L_nil);});});});})});
  L_$F.leisureFunctionId = 660;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 659;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 658;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_parseErr)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("Not enough arguments to defTypeCase: ", function(){return resolve(L_cons)(L_list, L_nil);});});});})})()});
  L_$F.leisureFunctionId = 656;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("equal", "cons", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || resolve(L_and)(function(){return resolve(L_isCons)(L_b);}, function(){return resolve(L_and)(function(){return resolve(L_equal)(function(){return resolve(L_head)(L_a);}, function(){return resolve(L_head)(L_b);});}, function(){return resolve(L_and)(function(){return resolve(L_equal)(function(){return resolve(L_tail)(L_a);}, function(){return resolve(L_tail)(L_b);});}, L_true);});});
  };
  L_$F.leisureFunctionId = 661;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("conj", 2, "conj seq item = cons item seq", lazy((function(){
  var L_$F = function(L_seq, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_cons)(L_item, L_seq);
  };
  L_$F.leisureFunctionId = 662;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("zip", 2, "zip a b = isNil a\r\n  nil\r\n  isNil b\r\n    nil\r\n    cons (cons (head a) (head b)) (zip (tail a) (tail b))", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_a)(L_nil)(function(){return resolve(L_isNil)(L_b)(L_nil)(function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_a);}, function(){return resolve(L_head)(L_b);});}, function(){return resolve(L_zip)(function(){return resolve(L_tail)(L_a);}, function(){return resolve(L_tail)(L_b);});});});});
  };
  L_$F.leisureFunctionId = 663;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("first", 1, "first x = head x", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_head)(L_x)});
  L_$F.leisureFunctionId = 664;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("nth", 2, "nth n seq  = head (drop (max 0 n - 1) seq)", lazy((function(){
  var L_$F = function(L_n, L_seq) {
    return L_checkPartial(L_$F, arguments) || resolve(L_head)(function(){return resolve(L_drop)(function(){return resolve(L_max)(0, function(){return resolve(L_$_)(L_n, 1);});}, L_seq);});
  };
  L_$F.leisureFunctionId = 665;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("second", 1, "second seq = nth 2 seq", lazy((function(){
  var L_$F = (function(L_seq){return resolve(L_nth)(2, L_seq)});
  L_$F.leisureFunctionId = 666;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("third", 1, "third seq  = nth 3 seq", lazy((function(){
  var L_$F = (function(L_seq){return resolve(L_nth)(3, L_seq)});
  L_$F.leisureFunctionId = 667;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("foruth", 1, "foruth seq = nth 4 seq", lazy((function(){
  var L_$F = (function(L_seq){return resolve(L_nth)(4, L_seq)});
  L_$F.leisureFunctionId = 668;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fifth", 1, "fifth seq  = nth 5 seq", lazy((function(){
  var L_$F = (function(L_seq){return resolve(L_nth)(5, L_seq)});
  L_$F.leisureFunctionId = 669;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("sixth", 1, "sixth seq  = nth 6 seq", lazy((function(){
  var L_$F = (function(L_seq){return resolve(L_nth)(6, L_seq)});
  L_$F.leisureFunctionId = 670;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("mapchunks", 2, "mapchunks func list =\r\n  empty list\r\n    nil\r\n    do\r\n      r = func list\r\n      (isSequence r) && (not (empty r))\r\n        [(head r) | mapchunks func (tail r)]\r\n        [r]", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_empty)(L_list)(L_nil)(function(){return (function(){  var L_r;
  L_r = function(){return resolve(L_func)(L_list);};

  return resolve(L_$h$h)(function(){return resolve(L_isSequence)(L_r);})(function(){return resolve(L_not)(function(){return resolve(L_empty)(L_r);});})(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_r);}, function(){return resolve(L_mapchunks)(L_func, function(){return resolve(L_tail)(L_r);});});})(function(){return resolve(L_cons)(L_r, L_nil);})})();});
  };
  L_$F.leisureFunctionId = 671;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("chunk", 2, "chunk n list = mapchunks (\\l . [(take n l) | drop n l]) list", lazy((function(){
  var L_$F = function(L_n, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_mapchunks)(lazy((function(){
  var L_$F = (function(L_l){return resolve(L_cons)(function(){return resolve(L_take)(L_n, L_l);}, function(){return resolve(L_drop)(L_n, L_l);})});
  L_$F.leisureFunctionId = 672;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_list);
  };
  L_$F.leisureFunctionId = 673;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("mapSave", 2, "mapSave func l = isNil l\r\n  nil\r\n  \\\\\r\n    newH = func (head l)\r\n    newT = mapSave func (tail l)\r\n    .\r\n    and (eq newH (head l)) (eq newT (tail l))\r\n      l\r\n      cons newH newT", lazy((function(){
  var L_$F = function(L_func, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_l)(L_nil)(function(){return (function(){  var L_newH, L_newT;
  L_newH = function(){return resolve(L_func)(function(){return resolve(L_head)(L_l);});};
  L_newT = function(){return resolve(L_mapSave)(L_func, function(){return resolve(L_tail)(L_l);});};

  return resolve(L_and)(function(){return resolve(L_eq)(L_newH, function(){return resolve(L_head)(L_l);});}, function(){return resolve(L_eq)(L_newT, function(){return resolve(L_tail)(L_l);});})(L_l)(function(){return resolve(L_cons)(L_newH, L_newT);})})();});
  };
  L_$F.leisureFunctionId = 674;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("slowsort", 2, "slowsort less list = (qs less list) nil", lazy((function(){
  var L_$F = function(L_less, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_qs)(L_less, L_list)(L_nil);
  };
  L_$F.leisureFunctionId = 675;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("qs", 2, "qs sortedFunc list = list\r\n  \\h t D . \\\\\r\n    greater = filter (sortedFunc h) t\r\n    lesser = filter (compose not (sortedFunc h)) t\r\n    .\r\n    \\rest . (qs sortedFunc lesser) (cons h ((qs sortedFunc greater) rest))\r\n  id", lazy((function(){
  var L_$F = function(L_sortedFunc, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return (function(){  var L_greater, L_lesser;
  L_greater = function(){return resolve(L_filter)(function(){return resolve(L_sortedFunc)(L_h);})(L_t);};
  L_lesser = function(){return resolve(L_filter)(function(){return resolve(L_compose)(L_not, function(){return resolve(L_sortedFunc)(L_h);});})(L_t);};

  return (function(){
  var L_$F = (function(L_rest){return resolve(L_qs)(L_sortedFunc, L_lesser)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_qs)(L_sortedFunc, L_greater)(L_rest);});})});
  L_$F.leisureFunctionId = 679;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()})()});
  L_$F.leisureFunctionId = 678;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 677;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 676;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_id);
  };
  L_$F.leisureFunctionId = 680;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isSequence", 1, "isSequence l = isSome (find (\\f . f l) [isCons isNil isRepeat isRange isOption isEither isString isDl isMap isSet isVector])", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_isSome)(function(){return resolve(L_find)(lazy((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_l)});
  L_$F.leisureFunctionId = 682;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_cons)(L_isCons, function(){return resolve(L_cons)(L_isNil, function(){return resolve(L_cons)(L_isRepeat, function(){return resolve(L_cons)(L_isRange, function(){return resolve(L_cons)(L_isOption, function(){return resolve(L_cons)(L_isEither, function(){return resolve(L_cons)(L_isString, function(){return resolve(L_cons)(L_isDl, function(){return resolve(L_cons)(L_isMap, function(){return resolve(L_cons)(L_isSet, function(){return resolve(L_cons)(L_isVector, L_nil);});});});});});});});});});});});})});
  L_$F.leisureFunctionId = 681;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isKeyedSequence", 1, "isKeyedSequence l = isSome (find (\\f . f l) [isAlist isMap])", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_isSome)(function(){return resolve(L_find)(lazy((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_l)});
  L_$F.leisureFunctionId = 684;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_cons)(L_isAlist, function(){return resolve(L_cons)(L_isMap, L_nil);});});})});
  L_$F.leisureFunctionId = 683;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tolist", 1, "tolist x = [x]", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_cons)(L_x, L_nil)});
  L_$F.leisureFunctionId = 685;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "list", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_l)});
  L_$F.leisureFunctionId = 686;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "repeat", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_runRepeat)(0, function(){return resolve(L_r)(L_id);}, L_id)});
  L_$F.leisureFunctionId = 687;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "range", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_r)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_runRepeat)(L_a, L_b, L_id)});
  L_$F.leisureFunctionId = 690;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 689;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 688;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "option", lazy((function(){
  var L_$F = (function(L_o){return resolve(L_o)(lazy((function(){
  var L_$F = (function(L_x){return resolve(L_cons)(L_x, L_nil)});
  L_$F.leisureFunctionId = 692;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)});
  L_$F.leisureFunctionId = 691;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "either", lazy((function(){
  var L_$F = (function(L_e){return resolve(L_e)(lazy((function(){
  var L_$F = (function(L__){return resolve(L_nil)});
  L_$F.leisureFunctionId = 694;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(lazy((function(){
  var L_$F = (function(L_x){return resolve(L_cons)(L_x, L_nil)});
  L_$F.leisureFunctionId = 695;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 693;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "string", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_strToList)(L_s)});
  L_$F.leisureFunctionId = 696;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "differencelist", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_l)(L_nil)});
  L_$F.leisureFunctionId = 697;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "hamt", lazy((function(){
  var L_$F = (function(L_h){return resolve(L_mapPairs)(L_h)});
  L_$F.leisureFunctionId = 698;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "amtSet", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_setItems)(L_s)});
  L_$F.leisureFunctionId = 699;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tolist", "vector", lazy((function(){
  var L_$F = (function(L_v){return resolve(L_vectorItems)(L_v)});
  L_$F.leisureFunctionId = 700;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("conj", "repeat", lazy((function(){
  var L_$F = function(L_r, L_v) {
    return L_checkPartial(L_$F, arguments) || resolve(L_r)(lazy((function(){
  var L_$F = (function(L_count){return resolve(L_$y)(L_v, 0)(function(){return resolve(L_range)(L_v, L_count);})(function(){return resolve(L_$y$p)(L_v, L_count)(L_r)(function(){return resolve(L_repeat)(L_v);});})});
  L_$F.leisureFunctionId = 701;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 702;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("conj", "range", lazy((function(){
  var L_$F = function(L_r, L_v) {
    return L_checkPartial(L_$F, arguments) || resolve(L_r)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_$y)(L_v, L_a)(function(){return resolve(L_range)(L_v, L_b);})(function(){return resolve(L_$y)(L_b, L_v)(function(){return resolve(L_range)(L_a, L_v);})(function(){return resolve(L_range)(L_a, L_b);});})});
  L_$F.leisureFunctionId = 704;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 703;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 705;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("conj", "string", lazy((function(){
  var L_$F = function(L_s, L_b) {
    return L_checkPartial(L_$F, arguments) || resolve(L_$o)(L_s, L_v);
  };
  L_$F.leisureFunctionId = 706;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("conj", "differencelist", lazy((function(){
  var L_$F = function(L_l, L_v) {
    return L_checkPartial(L_$F, arguments) || resolve(L_dlpush)(L_l, L_v);
  };
  L_$F.leisureFunctionId = 707;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("conj", "cons", lazy((function(){
  var L_$F = function(L_l, L_v) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isAlist)(L_l)(function(){return resolve(L_aconsPair)(L_v, L_l);})(function(){return resolve(L_cons)(L_v, L_l);});
  };
  L_$F.leisureFunctionId = 708;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("conj", "hamt", lazy((function(){
  var L_$F = function(L_h, L_v) {
    return L_checkPartial(L_$F, arguments) || resolve(L_mapPair)(L_v, L_h);
  };
  L_$F.leisureFunctionId = 709;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("conj", "amtSet", lazy((function(){
  var L_$F = function(L_s, L_v) {
    return L_checkPartial(L_$F, arguments) || resolve(L_setAdd)(L_v, L_s);
  };
  L_$F.leisureFunctionId = 710;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("conj", "vector", lazy((function(){
  var L_$F = function(L_vec, L_val) {
    return L_checkPartial(L_$F, arguments) || resolve(L_vectorPush)(L_val, L_vec);
  };
  L_$F.leisureFunctionId = 711;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("head", "list", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_x)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_h)});
  L_$F.leisureFunctionId = 714;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 713;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 712;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("head", "repeat", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_$p$p)(function(){return resolve(L_r)(L_id);}, 0)(L_nil)(0)});
  L_$F.leisureFunctionId = 715;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("head", "range", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_r)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_$y)(L_a, L_b)(L_a)(L_nil)});
  L_$F.leisureFunctionId = 718;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 717;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 716;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("head", "string", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_strAt)(L_s, 0)});
  L_$F.leisureFunctionId = 719;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("head", "hamt", lazy((function(){
  var L_$F = (function(L_h){return resolve(L_mapFirst)(L_h)});
  L_$F.leisureFunctionId = 720;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("head", "amtSet", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_setFirst)(L_s)});
  L_$F.leisureFunctionId = 721;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("head", "vector", lazy((function(){
  var L_$F = (function(L_v){return resolve(L_vectorFirst)(L_v)});
  L_$F.leisureFunctionId = 722;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("head", 1, "head x = x", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_x)});
  L_$F.leisureFunctionId = 723;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tail", "cons", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_x)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_t)});
  L_$F.leisureFunctionId = 726;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 725;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 724;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tail", "repeat", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_$p$p)(function(){return resolve(L_r)(L_id);}, 0)(L_nil)(function(){return resolve(L_range)(1, function(){return resolve(L_r)(L_id);});})});
  L_$F.leisureFunctionId = 727;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tail", "range", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_r)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_$y)(L_a, L_b)(function(){return resolve(L_range)(function(){return resolve(L_$o)(L_a, 1);}, L_b);})(L_r)});
  L_$F.leisureFunctionId = 730;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 729;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 728;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tail", "string", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_strSubstring)(L_s, 1, function(){return resolve(L_length)(L_s);})});
  L_$F.leisureFunctionId = 731;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tail", "hamt", lazy((function(){
  var L_$F = (function(L_h){return resolve(L_mapRest)(L_h)});
  L_$F.leisureFunctionId = 732;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tail", "amtSet", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_setRest)(L_s)});
  L_$F.leisureFunctionId = 733;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("tail", "vector", lazy((function(){
  var L_$F = (function(L_v){return resolve(L_vectorRest)(L_v)});
  L_$F.leisureFunctionId = 734;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tail", 1, "tail x = nil", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_nil)});
  L_$F.leisureFunctionId = 735;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("consLength", 1, "consLength list = isNil list\r\n  0\r\n  assert (hasType list cons) (strCat (cons \"length argument is not a proper list: \" (cons list nil))) 1 + (consLength (tail list))", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_isNil)(L_list)(0)(function(){return resolve(L_assert)(function(){return resolve(L_hasType)(L_list, L_cons);})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("length argument is not a proper list: ", function(){return resolve(L_cons)(L_list, L_nil);});});})(function(){return resolve(L_$o)(1, function(){return resolve(L_consLength)(function(){return resolve(L_tail)(L_list);});});});})});
  L_$F.leisureFunctionId = 736;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("length", "list", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_consLength)(L_l)});
  L_$F.leisureFunctionId = 737;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("length", "range", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_r)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_$_)(L_b, L_a)});
  L_$F.leisureFunctionId = 740;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 739;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 738;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("length", "repeat", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_r)(lazy((function(){
  var L_$F = (function(L_count){return resolve(L_$p$p)(L_count, 0)});
  L_$F.leisureFunctionId = 742;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 741;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("length", "string", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_strLen)(L_s)});
  L_$F.leisureFunctionId = 743;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("length", "differencelist", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_length)(function(){return resolve(L_tolist)(L_l);})});
  L_$F.leisureFunctionId = 744;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("length", "hamt", lazy((function(){
  var L_$F = (function(L_h){return resolve(L_mapSize)(L_h)});
  L_$F.leisureFunctionId = 745;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("length", "amtSet", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_setSize)(L_s)});
  L_$F.leisureFunctionId = 746;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("length", "vector", lazy((function(){
  var L_$F = (function(L_v){return resolve(L_vectorSize)(L_v)});
  L_$F.leisureFunctionId = 747;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("length", 1, "length x = 1", lazy((function(){
  var L_$F = (function(L_x){return 1});
  L_$F.leisureFunctionId = 748;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("empty", 1, "empty l = (length l) == 0", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_$p$p)(function(){return resolve(L_length)(L_l);}, 0)});
  L_$F.leisureFunctionId = 749;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("empty", "cons", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_false)});
  L_$F.leisureFunctionId = 750;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("empty", "nil", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_true)});
  L_$F.leisureFunctionId = 751;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("append", "list", lazy((function(){
  var L_$F = function(L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L__append)(L_x, function(){return resolve(L_tolist)(L_y);});
  };
  L_$F.leisureFunctionId = 752;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("append", "range", lazy((function(){
  var L_$F = function(L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isRange)(L_y)(function(){return resolve(L_x)(lazy((function(){
  var L_$F = (function(L_xa){return (function(){
  var L_$F = (function(L_xb){return resolve(L_y)(lazy((function(){
  var L_$F = (function(L_ya){return (function(){
  var L_$F = (function(L_yb){return resolve(L_range)(function(){return resolve(L_min)(L_xa, L_ya);}, function(){return resolve(L_max)(L_xb, L_yb);})});
  L_$F.leisureFunctionId = 756;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 755;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 754;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 753;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L__append)(function(){return resolve(L_tolist)(L_x);}, function(){return resolve(L_tolist)(L_y);});});
  };
  L_$F.leisureFunctionId = 757;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("append", "string", lazy((function(){
  var L_$F = function(L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L_$o)(L_x, L_y);
  };
  L_$F.leisureFunctionId = 758;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("append", "differencelist", lazy((function(){
  var L_$F = function(L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L_dlappend)(L_x, function(){return resolve(L_isDl)(L_y)(L_y)(function(){return resolve(L_dllist)(function(){return resolve(L_tolist)(L_y);});});});
  };
  L_$F.leisureFunctionId = 759;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("append", "hamt", lazy((function(){
  var L_$F = function(L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isMap)(L_y)(function(){return L$(resolve(L_mapMerge))(L_x, L_y);})(function(){return resolve(L_isKeyedSequence)(L_y)(function(){return resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_result){return resolve(L_el)(lazy((function(){
  var L_$F = (function(L_k){return (function(){
  var L_$F = (function(L_v){return resolve(L_set)(L_k)(L_v)(L_result)});
  L_$F.leisureFunctionId = 763;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 762;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 761;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 760;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_x, function(){return resolve(L_tolist)(L_y);});})(function(){return resolve(L__append)(function(){return resolve(L_tolist)(L_x);}, function(){return resolve(L_tolist)(L_y);});});});
  };
  L_$F.leisureFunctionId = 764;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("append", "amtSet", lazy((function(){
  var L_$F = function(L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isSet)(L_y)(function(){return resolve(L_setUnion)(L_x, L_y);})(function(){return resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_result){return resolve(L_setAdd)(L_el, L_result)});
  L_$F.leisureFunctionId = 766;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 765;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_x, function(){return resolve(L_tolist)(L_y);});});
  };
  L_$F.leisureFunctionId = 767;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("append", "vector", lazy((function(){
  var L_$F = function(L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isVector)(L_y)(function(){return resolve(L_vectorConcat)(L_x, L_y);})(function(){return resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_result){return resolve(L_vectorPush)(L_el, L_result)});
  L_$F.leisureFunctionId = 769;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 768;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_x, function(){return resolve(L_reverse)(function(){return resolve(L_tolist)(L_y);});});});
  };
  L_$F.leisureFunctionId = 770;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("append", 2, "append a b = _append (tolist a) (tolist b)", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || resolve(L__append)(function(){return resolve(L_tolist)(L_a);}, function(){return resolve(L_tolist)(L_b);});
  };
  L_$F.leisureFunctionId = 771;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("delete", 2, "delete list item = item == list nil list", lazy((function(){
  var L_$F = function(L_list, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_$p$p)(L_item, L_list)(L_nil)(L_list);
  };
  L_$F.leisureFunctionId = 772;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("delete", "cons", lazy((function(){
  var L_$F = function(L_list, L_key) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isAlist)(L_list)(function(){return resolve(L_aremove)(L_key, L_alist);})(function(){return resolve(L_filter)(function(){return resolve(L_$k$p)(L_item);})(L_list);});
  };
  L_$F.leisureFunctionId = 773;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("delete", "amtSet", lazy((function(){
  var L_$F = function(L_set, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_setRemove)(L_item, L_set);
  };
  L_$F.leisureFunctionId = 774;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("delete", "vector", lazy((function(){
  var L_$F = function(L_vec, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_vectorRemove)(L_item, L_vec);
  };
  L_$F.leisureFunctionId = 775;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("delete", "hamt", lazy((function(){
  var L_$F = function(L_map, L_key) {
    return L_checkPartial(L_$F, arguments) || resolve(L_mapRemove)(L_key, L_map);
  };
  L_$F.leisureFunctionId = 776;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("delete", "differencelist", lazy((function(){
  var L_$F = function(L_dl, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_dllist)(function(){return resolve(L_filter)(function(){return resolve(L_$k$p)(L_item);})(function(){return resolve(L_tolist)(L_dl);});});
  };
  L_$F.leisureFunctionId = 777;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("dispatchMap", 2, "dispatchMap l func = _map func (tolist l)", lazy((function(){
  var L_$F = function(L_l, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L__map)(L_func, function(){return resolve(L_tolist)(L_l);});
  };
  L_$F.leisureFunctionId = 778;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "list", lazy((function(){
  var L_$F = function(L_l, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isAlist)(L_l)(function(){return resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_result){return resolve(L_set)(function(){return resolve(L_head)(L_el);})(function(){return resolve(L_func)(function(){return resolve(L_tail)(L_el);});})(L_result)});
  L_$F.leisureFunctionId = 780;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 779;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil, L_alist);})(function(){return resolve(L__map)(L_func, L_l);});
  };
  L_$F.leisureFunctionId = 781;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "repeat", lazy((function(){
  var L_$F = function(L_r, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_runRepeat)(0, function(){return resolve(L_r)(L_id);}, L_func);
  };
  L_$F.leisureFunctionId = 782;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "range", lazy((function(){
  var L_$F = function(L_r, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_r)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_runRepeat)(L_a, L_b, L_func)});
  L_$F.leisureFunctionId = 784;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 783;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 785;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "option", lazy((function(){
  var L_$F = function(L_o, L_func) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_o))(function(){return resolve(L_compose)(L_some, L_func);}, L_none);
  };
  L_$F.leisureFunctionId = 786;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "either", lazy((function(){
  var L_$F = function(L_e, L_func) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_e))(lazy((function(){
  var L_$F = (function(L__){return resolve(L_e)});
  L_$F.leisureFunctionId = 787;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_compose)(L_right, L_func);});
  };
  L_$F.leisureFunctionId = 788;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "string", lazy((function(){
  var L_$F = function(L_s, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L__map)(L_func, function(){return resolve(L_strToList)(L_s);});});
  };
  L_$F.leisureFunctionId = 789;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "differencelist", lazy((function(){
  var L_$F = function(L_l, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_dllist)(function(){return resolve(L__map)(L_func, function(){return resolve(L_l)(L_nil);});});
  };
  L_$F.leisureFunctionId = 790;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "hamt", lazy((function(){
  var L_$F = function(L_h, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_result){return resolve(L_set)(function(){return resolve(L_head)(L_el);})(function(){return resolve(L_func)(function(){return resolve(L_tail)(L_el);});})(L_result)});
  L_$F.leisureFunctionId = 792;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 791;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_hamt, function(){return resolve(L_tolist)(L_h);});
  };
  L_$F.leisureFunctionId = 793;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "amtSet", lazy((function(){
  var L_$F = function(L_s, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_result){return resolve(L_setAdd)(function(){return resolve(L_func)(L_el);}, L_result)});
  L_$F.leisureFunctionId = 795;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 794;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_amtSet, function(){return resolve(L_setItems)(L_s);});
  };
  L_$F.leisureFunctionId = 796;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("dispatchMap", "vector", lazy((function(){
  var L_$F = function(L_v, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_result){return resolve(L_vectorPush)(function(){return resolve(L_func)(L_el);}, L_result)});
  L_$F.leisureFunctionId = 798;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 797;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_vector, function(){return resolve(L_vectorItems)(L_v);});
  };
  L_$F.leisureFunctionId = 799;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("map", 2, "map func l = dispatchMap l func", lazy((function(){
  var L_$F = function(L_func, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_dispatchMap)(L_l, L_func);
  };
  L_$F.leisureFunctionId = 800;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("foldl", "any", 3, lazy((function(){
  var L_$F = (function(L_func){return (function(){
  var L_$F = (function(L_init){return (function(){
  var L_$F = (function(L_l){return resolve(L_not)(function(){return resolve(L_isList)(L_l);})(function(){return resolve(L_some)(function(){return resolve(L__foldl)(L_func, L_init, function(){return resolve(L_tolist)(L_l);});});})(L_none)});
  L_$F.leisureFunctionId = 803;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 802;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 801;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 804;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("foldl1", "any", 2, lazy((function(){
  var L_$F = (function(L_func){return (function(){
  var L_$F = (function(L_l){return resolve(L_not)(function(){return resolve(L_isList)(L_l);})(function(){return resolve(L_some)(function(){return resolve(L__foldl1)(L_func, function(){return resolve(L_tolist)(L_l);});});})(L_none)});
  L_$F.leisureFunctionId = 806;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 805;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 807;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("foldr", "any", 3, lazy((function(){
  var L_$F = (function(L_func){return (function(){
  var L_$F = (function(L_final){return (function(){
  var L_$F = (function(L_l){return resolve(L_not)(function(){return resolve(L_isList)(L_l);})(function(){return resolve(L_some)(function(){return resolve(L__foldr)(L_func, L_final, function(){return resolve(L_tolist)(L_l);});});})(L_none)});
  L_$F.leisureFunctionId = 810;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 809;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 808;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 811;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("foldr", "map", 3, lazy((function(){
  var L_$F = (function(L_func){return (function(){
  var L_$F = (function(L_final){return (function(){
  var L_$F = (function(L_m){return resolve(L_isMap)(L_m)(function(){return resolve(L_some)(function(){return resolve(L_mapFoldr)(L_func, L_final, L_m);});})(L_none)});
  L_$F.leisureFunctionId = 814;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 813;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 812;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 815;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("foldr1", "any", 2, lazy((function(){
  var L_$F = (function(L_func){return (function(){
  var L_$F = (function(L_l){return resolve(L_not)(function(){return resolve(L_isList)(L_l);})(function(){return resolve(L_some)(function(){return resolve(L__foldr1)(L_func, function(){return resolve(L_tolist)(L_l);});});})(L_none)});
  L_$F.leisureFunctionId = 817;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 816;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 818;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("reverse", "list", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_isAlist)(L_l)(function(){return resolve(L_foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_rest){return L$(resolve(L_aconPair))(L_el, L_rest)});
  L_$F.leisureFunctionId = 821;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 820;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)(function(){return resolve(L__reverse)(L_l);});})(function(){return resolve(L__reverse)(L_l);})});
  L_$F.leisureFunctionId = 819;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("reverse", "range", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_r)});
  L_$F.leisureFunctionId = 822;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("reverse", "repeat", lazy((function(){
  var L_$F = (function(L_r){return resolve(L_r)});
  L_$F.leisureFunctionId = 823;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("reverse", "string", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_strReverse)(L_s)});
  L_$F.leisureFunctionId = 824;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("reverse", "differencelist", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_dllist)(function(){return resolve(L_reverse)(function(){return resolve(L_l)(L_nil);});})});
  L_$F.leisureFunctionId = 825;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("reverse", "hamt", lazy((function(){
  var L_$F = (function(L_h){return resolve(L_mapReverse)(L_h)});
  L_$F.leisureFunctionId = 826;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("reverse", "amtSet", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_setReverse)(L_s)});
  L_$F.leisureFunctionId = 827;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("reverse", "vector", lazy((function(){
  var L_$F = (function(L_v){return resolve(L_vectorReverse)(L_v)});
  L_$F.leisureFunctionId = 828;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("contains", 2, "contains l item = _contains (tolist l) item", lazy((function(){
  var L_$F = function(L_l, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L__contains)(function(){return resolve(L_tolist)(L_l);}, L_item);
  };
  L_$F.leisureFunctionId = 829;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("contains", "list", lazy((function(){
  var L_$F = function(L_l, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isAlist)(L_l)(function(){return resolve(L_isSome)(function(){return resolve(L__find)(lazy((function(){
  var L_$F = (function(L_el){return resolve(L_$p$p)(L_item, function(){return resolve(L_head)(L_el);})});
  L_$F.leisureFunctionId = 830;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_l);});})(function(){return resolve(L__contains)(L_l, L_item);});
  };
  L_$F.leisureFunctionId = 831;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("contains", "range", lazy((function(){
  var L_$F = function(L_r, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_r)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_$h$h)(function(){return resolve(L_isNumber)(L_item);})(function(){return resolve(L_$q$q)(function(){return resolve(L_$y$p)(L_a, L_item);})(function(){return resolve(L_$y)(L_item, L_b);});})});
  L_$F.leisureFunctionId = 833;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 832;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 834;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("contains", "repeat", lazy((function(){
  var L_$F = function(L_r, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_r)(lazy((function(){
  var L_$F = (function(L_count){return resolve(L_$h$h)(function(){return resolve(L_isNumber)(L_item);})(function(){return resolve(L_$q$q)(function(){return resolve(L_$y$p)(0, L_item);})(function(){return resolve(L_$y)(L_item, L_count);});})});
  L_$F.leisureFunctionId = 835;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 836;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("contains", "differencelist", lazy((function(){
  var L_$F = function(L_l, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L__contains)(L_item, function(){return resolve(L_l)(L_nil);});
  };
  L_$F.leisureFunctionId = 837;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("contains", "hamt", lazy((function(){
  var L_$F = function(L_h, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_mapContains)(L_item, L_h);
  };
  L_$F.leisureFunctionId = 838;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("contains", "amtSet", lazy((function(){
  var L_$F = function(L_s, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_setContains)(L_item, L_s);
  };
  L_$F.leisureFunctionId = 839;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("contains", "vector", lazy((function(){
  var L_$F = function(L_v, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_vectorContains)(L_item, L_v);
  };
  L_$F.leisureFunctionId = 840;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("get", "cons", lazy((function(){
  var L_$F = function(L_alist, L_key) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isAlist)(L_alist)(function(){return resolve(L_find)(lazy((function(){
  var L_$F = (function(L_el){return resolve(L_eq)(L_key, function(){return resolve(L_head)(L_el);})});
  L_$F.leisureFunctionId = 841;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_alist)(lazy((function(){
  var L_$F = (function(L_cell){return resolve(L_cell)(lazy((function(){
  var L_$F = (function(L_head){return (function(){
  var L_$F = (function(L_tail){return resolve(L_tail)});
  L_$F.leisureFunctionId = 844;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 843;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 842;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_unit);})(L_nil);
  };
  L_$F.leisureFunctionId = 845;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("get", "hamt", lazy((function(){
  var L_$F = function(L_h, L_key) {
    return L_checkPartial(L_$F, arguments) || resolve(L_mapGet)(L_key, L_h);
  };
  L_$F.leisureFunctionId = 846;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("getOpt", "cons", lazy((function(){
  var L_$F = function(L_alist, L_key) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isAlist)(L_alist)(function(){return resolve(L_find)(lazy((function(){
  var L_$F = (function(L_el){return resolve(L_eq)(L_key, function(){return resolve(L_head)(L_el);})});
  L_$F.leisureFunctionId = 847;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_alist)(lazy((function(){
  var L_$F = (function(L_cell){return resolve(L_cell)(lazy((function(){
  var L_$F = (function(L_head){return (function(){
  var L_$F = (function(L_tail){return resolve(L_some)(L_tail)});
  L_$F.leisureFunctionId = 850;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 849;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 848;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_none);})(L_none);
  };
  L_$F.leisureFunctionId = 851;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("getOpt", "hamt", lazy((function(){
  var L_$F = function(L_h, L_key) {
    return L_checkPartial(L_$F, arguments) || resolve(L_mapGetOpt)(L_key, L_h);
  };
  L_$F.leisureFunctionId = 852;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("set", "cons", lazy((function(){
  var L_$F = function(L_alist, L_key, L_value) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isAlist)(L_alist)(function(){return resolve(L_acons)(L_key, L_value, function(){return resolve(L_aremove)(L_key, L_alist);});})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_key, L_value);}, L_alist);});
  };
  L_$F.leisureFunctionId = 853;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("set", "hamt", lazy((function(){
  var L_$F = function(L_h, L_key, L_value) {
    return L_checkPartial(L_$F, arguments) || resolve(L_mapSet)(L_key, L_value, L_h);
  };
  L_$F.leisureFunctionId = 854;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("increasing", 1, "increasing x = cons x (increasing (+ x 1))", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_cons)(L_x, function(){return resolve(L_increasing)(function(){return resolve(L_$o)(L_x, 1);});})});
  L_$F.leisureFunctionId = 855;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("wholes", 0, "wholes = increasing 0", function(){return resolve(L_increasing)(0);})},
    function(){return resolve(L_newDefine)("naturals", 0, "naturals = tail wholes", function(){return resolve(L_tail)(L_wholes);})},
    function(){return resolve(L_newDefine)("showBase", 2, "showBase obj func = func obj", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_func)(L_obj);
  };
  L_$F.leisureFunctionId = 856;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "unit", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || "";
  };
  L_$F.leisureFunctionId = 857;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "some", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_cons)("(some ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return L$(resolve(L_obj))(L_id, L_false);}, L_func);}, function(){return resolve(L_cons)(")", L_nil);});});});
  };
  L_$F.leisureFunctionId = 858;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "err", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_cons)("(err ", function(){return resolve(L_cons)(function(){return resolve(L_obj)(L_id);}, function(){return resolve(L_cons)(")", L_nil);});});});
  };
  L_$F.leisureFunctionId = 859;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "token", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_obj)(lazy((function(){
  var L_$F = (function(L_str){return (function(){
  var L_$F = (function(L_pos){return resolve(L_isFilepos)(L_pos)(function(){return resolve(L_pos)(lazy((function(){
  var L_$F = (function(L_file){return (function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_offset){return resolve(L_strCat)(function(){return resolve(L_cons)("(token ", function(){return resolve(L_cons)(L_str, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_file, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_line, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_offset, function(){return resolve(L_cons)(")", L_nil);});});});});});});});});})});
  L_$F.leisureFunctionId = 864;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 863;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 862;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(token ", function(){return resolve(L_cons)(L_str, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_pos, function(){return resolve(L_cons)(")", L_nil);});});});});});})});
  L_$F.leisureFunctionId = 861;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 860;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 865;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "filepos", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_obj)(lazy((function(){
  var L_$F = (function(L_file){return (function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_offset){return resolve(L_strCat)(function(){return resolve(L_cons)("(filepos ", function(){return resolve(L_cons)(L_file, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_line, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_offset, function(){return resolve(L_cons)(")", L_nil);});});});});});});})});
  L_$F.leisureFunctionId = 868;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 867;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 866;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 869;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "cons", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isAlist)(L_obj)(function(){return resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("{", function(){return resolve(L_cons)(function(){return resolve(L_intersperse)(function(){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_item){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return resolve(L_head)(L_item);}, L_func);}, function(){return resolve(L_cons)(":", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return resolve(L_tail)(L_item);}, L_func);}, L_nil);});})});
  L_$F.leisureFunctionId = 870;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_obj);}, " ");}, function(){return resolve(L_cons)("}", L_nil);});});});});})(function(){return resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("[", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return resolve(L_head)(L_obj);}, L_func);}, function(){return resolve(L_cons)(function(){return resolve(L_showConsElements)(function(){return resolve(L_tail)(L_obj);}, L_func);}, function(){return resolve(L_cons)("]", L_nil);});});});});});});
  };
  L_$F.leisureFunctionId = 871;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("showConsElements", 2, "showConsElements list func = isCons list\r\n  [' ' (showBase (head list) func) (showConsElements (tail list) func)]\r\n  isNil list\r\n    ''\r\n    [' | ' (showBase list func)]", lazy((function(){
  var L_$F = function(L_list, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isCons)(L_list)(function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return resolve(L_head)(L_list);}, L_func);}, function(){return resolve(L_cons)(function(){return resolve(L_showConsElements)(function(){return resolve(L_tail)(L_list);}, L_func);}, L_nil);});});})(function(){return resolve(L_isNil)(L_list)("")(function(){return resolve(L_cons)(" | ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_list, L_func);}, L_nil);});});});
  };
  L_$F.leisureFunctionId = 872;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "range", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_obj)(lazy((function(){
  var L_$F = (function(L_start){return (function(){
  var L_$F = (function(L_end){return resolve(L_strCat)(function(){return resolve(L_cons)("(range ", function(){return resolve(L_cons)(L_start, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_end, function(){return resolve(L_cons)(")", L_nil);});});});});})});
  L_$F.leisureFunctionId = 874;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 873;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 875;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "repeat", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_cons)("(repeat ", function(){return resolve(L_cons)(function(){return resolve(L_obj)(L_id);}, function(){return resolve(L_cons)(")", L_nil);});});});
  };
  L_$F.leisureFunctionId = 876;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "hamt", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("map{", function(){return resolve(L_cons)(function(){return resolve(L_intersperse)(function(){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_item){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return resolve(L_head)(L_item);}, L_func);}, function(){return resolve(L_cons)(":", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return resolve(L_tail)(L_item);}, L_func);}, L_nil);});})});
  L_$F.leisureFunctionId = 877;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_mapPairs)(L_obj);});}, " ");}, function(){return resolve(L_cons)("}", L_nil);});});});});
  };
  L_$F.leisureFunctionId = 878;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "amtSet", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("set[", function(){return resolve(L_cons)(function(){return resolve(L_intersperse)(function(){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_item){return resolve(L_showBase)(L_item, L_func)});
  L_$F.leisureFunctionId = 879;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_setItems)(L_obj);});}, " ");}, function(){return resolve(L_cons)("]", L_nil);});});});});
  };
  L_$F.leisureFunctionId = 880;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "vector", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("vec[", function(){return resolve(L_cons)(function(){return resolve(L_intersperse)(function(){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_item){return resolve(L_showBase)(L_item, L_func)});
  L_$F.leisureFunctionId = 881;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_vectorItems)(L_obj);});}, " ");}, function(){return resolve(L_cons)("]", L_nil);});});});});
  };
  L_$F.leisureFunctionId = 882;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "left", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_cons)("(left ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return L$(resolve(L_obj))(L_id, L_id);}, L_func);}, function(){return resolve(L_cons)(")", L_nil);});});});
  };
  L_$F.leisureFunctionId = 883;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "right", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_cons)("(right ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return L$(resolve(L_obj))(L_id, L_id);}, L_func);}, function(){return resolve(L_cons)(")", L_nil);});});});
  };
  L_$F.leisureFunctionId = 884;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "differencelist", lazy((function(){
  var L_$F = function(L_l, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("dl[", function(){return resolve(L_cons)(function(){return resolve(L_intersperse)(function(){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_item){return resolve(L_showBase)(L_item, L_func)});
  L_$F.leisureFunctionId = 885;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_l)(L_nil);});}, " ");}, function(){return resolve(L_cons)("]", L_nil);});});});});
  };
  L_$F.leisureFunctionId = 886;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "triple", lazy((function(){
  var L_$F = function(L_obj, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_obj)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return resolve(L_strCat)(function(){return resolve(L_cons)("(triple ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_a, L_func);}, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_b, L_func);}, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_c, L_func);}, function(){return resolve(L_cons)(")", L_nil);});});});});});});})});
  L_$F.leisureFunctionId = 889;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 888;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 887;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 890;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("showHtml", 1, "showHtml x = showBase x presentHtml", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_showBase)(L_x, L_presentHtml)});
  L_$F.leisureFunctionId = 891;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("show", 1, "show x = showBase x present", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_showBase)(L_x, L_present)});
  L_$F.leisureFunctionId = 892;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("present", 1, "present x = x", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_x)});
  L_$F.leisureFunctionId = 893;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("present", "func", 1, lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_obj);}, "*function")(function(){return resolve(L_some)(function(){return resolve(L_presentFunction)(L_obj);});})(L_none)});
  L_$F.leisureFunctionId = 894;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 895;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("presentFunction", 1, "presentFunction obj = do\r\n  info = funcInfo obj\r\n  guts = isNil info\r\n    [(funcName obj\r\n      id\r\n      'unknown')]\r\n    and (> (length info) 1) (getFunction (head info) (\\func . hasProperty func 'infix') false)\r\n      [(present (head (tail info))) (head info) | _map present (tail (tail info))]\r\n      cons (head info) (_map present (tail info))\r\n  concat[\"(\" (join guts ' ') \")\"]", lazy((function(){
  var L_$F = (function(L_obj){return (function(){  var L_info, L_guts;
  L_info = function(){return resolve(L_funcInfo)(L_obj);};
  L_guts = function(){return resolve(L_isNil)(L_info)(function(){return resolve(L_cons)(function(){return resolve(L_funcName)(L_obj)(L_id)("unknown");}, L_nil);})(function(){return resolve(L_and)(function(){return resolve(L_$z)(function(){return resolve(L_length)(L_info);}, 1);}, function(){return resolve(L_getFunction)(function(){return resolve(L_head)(L_info);})(lazy((function(){
  var L_$F = (function(L_func){return resolve(L_hasProperty)(L_func, "infix")});
  L_$F.leisureFunctionId = 897;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_false);})(function(){return resolve(L_cons)(function(){return resolve(L_present)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_info);});});}, function(){return resolve(L_cons)(function(){return resolve(L_head)(L_info);}, function(){return resolve(L__map)(L_present, function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_info);});});});});})(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_info);}, function(){return resolve(L__map)(L_present, function(){return resolve(L_tail)(L_info);});});});});};

  return resolve(L_strCat)(function(){return resolve(L_cons)("(", function(){return resolve(L_cons)(function(){return resolve(L_join)(L_guts, " ");}, function(){return resolve(L_cons)(")", L_nil);});});})})()});
  L_$F.leisureFunctionId = 896;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("present", "type", 1, lazy((function(){
  var L_$F = (function(L_t){return resolve(L_isType)(L_t)(function(){return resolve(L_some)(function(){return resolve(L_typeName)(L_t);});})(L_none)});
  L_$F.leisureFunctionId = 898;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 899;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("present", "string", lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_jsonStringify)(L_obj, L_id, L_id)});
  L_$F.leisureFunctionId = 900;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("present", "nil", lazy((function(){
  var L_$F = (function(L_obj){return "nil"});
  L_$F.leisureFunctionId = 901;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("present", "none", lazy((function(){
  var L_$F = (function(L_obj){return "none"});
  L_$F.leisureFunctionId = 902;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("presentHtml", 1, "presentHtml x = escapeHtml (present x)", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_escapeHtml)(function(){return resolve(L_present)(L_x);})});
  L_$F.leisureFunctionId = 903;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_bind)(function(){return resolve(L_advise)("presentHtml", "func", 1, lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_obj);}, "*function")(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<span class=\"partial-application\">", function(){return resolve(L_cons)(function(){return resolve(L_presentFunction)(L_obj);}, function(){return resolve(L_cons)("</span>", L_nil);});});});});})(L_none)});
  L_$F.leisureFunctionId = 904;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_unit)});
  L_$F.leisureFunctionId = 905;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("presentHtml", "html", lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_obj)(L_id)});
  L_$F.leisureFunctionId = 906;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("wrapped", 1, "wrapped x = \\f . f x", lazy(setDataType((function(){
  var L_$F = (function(L_x){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_x)});
  L_$F.leisureFunctionId = 908;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'wrapped')});
  L_$F.leisureFunctionId = 907;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'wrapped')))},
    function(){return resolve(L_defMacro)("wrap", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("wrapped", function(){return resolve(L_cons)(L_list, L_nil);})});
  L_$F.leisureFunctionId = 909;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("showBase", "wrapped", lazy((function(){
  var L_$F = function(L_v, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_cons)("(wrap ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return resolve(L_v)(L_id);}, L_func);}, function(){return resolve(L_cons)(")", L_nil);});});});
  };
  L_$F.leisureFunctionId = 910;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "wrapped", lazy((function(){
  var L_$F = function(L_v, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_cont)(function(){return resolve(L_v)(L_id);});
  };
  L_$F.leisureFunctionId = 911;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "boolean", lazy((function(){
  var L_$F = function(L_bool, L_cont) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_bool))(function(){return resolve(L_cont)(L_true);}, L_false);
  };
  L_$F.leisureFunctionId = 912;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "option", lazy((function(){
  var L_$F = function(L_opt, L_cont) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_opt))(lazy((function(){
  var L_$F = (function(L_value){return resolve(L_cont)(L_value)});
  L_$F.leisureFunctionId = 913;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_none);
  };
  L_$F.leisureFunctionId = 914;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "either", lazy((function(){
  var L_$F = function(L_either, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_either)(lazy((function(){
  var L_$F = (function(L__){return resolve(L_either)});
  L_$F.leisureFunctionId = 915;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(lazy((function(){
  var L_$F = (function(L_value){return resolve(L_cont)(L_value)});
  L_$F.leisureFunctionId = 916;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 917;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("for", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("tolist", function(){return resolve(L_cons)(L_list, L_nil);})});
  L_$F.leisureFunctionId = 918;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("flat", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("flatWrapper", function(){return resolve(L_cons)(L_list, L_nil);})});
  L_$F.leisureFunctionId = 919;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("flatWrapper", 1, "flatWrapper m = \\f . f m", lazy(setDataType((function(){
  var L_$F = (function(L_m){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_m)});
  L_$F.leisureFunctionId = 921;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'flatWrapper')});
  L_$F.leisureFunctionId = 920;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'flatWrapper')))},
    function(){return resolve(L__defTypeCase)("showBase", "flatWrapper", lazy((function(){
  var L_$F = function(L_v, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_cons)("(flat ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(function(){return resolve(L_v)(L_id);}, L_func);}, function(){return resolve(L_cons)(")", L_nil);});});});
  };
  L_$F.leisureFunctionId = 922;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "flatWrapper", lazy((function(){
  var L_$F = function(L_fe, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_monadicFlatMap)(L_cont, function(){return resolve(L_fe)(L_id);});
  };
  L_$F.leisureFunctionId = 923;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "list", lazy((function(){
  var L_$F = function(L_l, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_monadicMap)(L_cont, L_l);
  };
  L_$F.leisureFunctionId = 924;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "differencelist", lazy((function(){
  var L_$F = function(L_l, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_monadicMap)(L_cont, L_l);}, lazy((function(){
  var L_$F = (function(L_l){return resolve(L_dllist)(L_l)});
  L_$F.leisureFunctionId = 925;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 926;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fold", 2, "fold l i = \\f . f l i", lazy(setDataType((function(){
  var L_$F = function(L_l, L_i) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_l)(L_i)});
  L_$F.leisureFunctionId = 927;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'fold');
  };
  L_$F.leisureFunctionId = 928;
  L_$F.leisureLength = 2;
  return L_$F;
})(), 'fold')))},
    function(){return resolve(L__defTypeCase)("showBase", "fold", lazy((function(){
  var L_$F = function(L_v, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_v)(lazy((function(){
  var L_$F = (function(L_l){return (function(){
  var L_$F = (function(L_i){return resolve(L_strCat)(function(){return resolve(L_cons)("(fold ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_l, L_func);}, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_i, L_func);}, function(){return resolve(L_cons)(")", L_nil);});});});});})});
  L_$F.leisureFunctionId = 930;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 929;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 931;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "fold", lazy((function(){
  var L_$F = function(L_fr, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_fr)(lazy((function(){
  var L_$F = (function(L_list){return (function(){
  var L_$F = (function(L_init){return resolve(L__foldl)(lazy((function(){
  var L_$F = (function(L_acc){return (function(){
  var L_$F = (function(L_el){return resolve(L_maybeBind)(L_acc, lazy((function(){
  var L_$F = (function(L_accVal){return (function(){  var L_ret;
  L_ret = function(){return L$(resolve(L_cont))(L_accVal, L_el);};

  return resolve(L_$p$p)(L_ret, L_unit)(L_accVal)(L_ret)})()});
  L_$F.leisureFunctionId = 936;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 935;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 934;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_init, function(){return resolve(L_tolist)(L_list);})});
  L_$F.leisureFunctionId = 933;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 932;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 937;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("monadicFlatMap", 2, "monadicFlatMap cont list = _foldr (\\el acc . maybeBind (cont el) \\elVal . maybeBind acc \\accVal .\r\n  elVal == unit\r\n    accVal\r\n    _append elVal accVal) [] (tolist list)", lazy((function(){
  var L_$F = function(L_cont, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_acc){return resolve(L_maybeBind)(function(){return resolve(L_cont)(L_el);}, lazy((function(){
  var L_$F = (function(L_elVal){return resolve(L_maybeBind)(L_acc, lazy((function(){
  var L_$F = (function(L_accVal){return resolve(L_$p$p)(L_elVal, L_unit)(L_accVal)(function(){return resolve(L__append)(L_elVal, L_accVal);})});
  L_$F.leisureFunctionId = 941;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 940;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 939;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 938;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil, function(){return resolve(L_tolist)(L_list);});
  };
  L_$F.leisureFunctionId = 942;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("monadicMap", 2, "monadicMap cont list = _foldr (\\el acc . maybeBind (cont el) \\elVal . maybeBind acc \\accVal .\r\n  elVal == unit\r\n    accVal\r\n    [elVal | accVal]) [] (tolist list)", lazy((function(){
  var L_$F = function(L_cont, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_acc){return resolve(L_maybeBind)(function(){return resolve(L_cont)(L_el);}, lazy((function(){
  var L_$F = (function(L_elVal){return resolve(L_maybeBind)(L_acc, lazy((function(){
  var L_$F = (function(L_accVal){return resolve(L_$p$p)(L_elVal, L_unit)(L_accVal)(function(){return resolve(L_cons)(L_elVal, L_accVal);})});
  L_$F.leisureFunctionId = 946;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 945;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 944;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 943;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil, function(){return resolve(L_tolist)(L_list);});
  };
  L_$F.leisureFunctionId = 947;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("maybeBind", 2, "maybeBind item cont = isIO item\r\n  primBind item cont\r\n  cont item", lazy((function(){
  var L_$F = function(L_item, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isIO)(L_item)(function(){return resolve(L_primBind)(L_item, L_cont);})(function(){return resolve(L_cont)(L_item);});
  };
  L_$F.leisureFunctionId = 948;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("check", 2, "check condition elseResult = condition true elseResult", lazy((function(){
  var L_$F = function(L_condition, L_elseResult) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_condition))(L_true, L_elseResult);
  };
  L_$F.leisureFunctionId = 949;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L__defTypeCase)("bind", "err", lazy((function(){
  var L_$F = function(L_err, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_err);
  };
  L_$F.leisureFunctionId = 950;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("run", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("wrappedRun", function(){return resolve(L_cons)(L_list, L_nil);})});
  L_$F.leisureFunctionId = 951;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("wrappedRun", 1, "wrappedRun m = \\f . f m", lazy(setDataType((function(){
  var L_$F = (function(L_m){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_m)});
  L_$F.leisureFunctionId = 953;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'wrappedRun')});
  L_$F.leisureFunctionId = 952;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'wrappedRun')))},
    function(){return resolve(L__defTypeCase)("bind", "wrappedRun", lazy((function(){
  var L_$F = function(L_m, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_bind)(function(){return resolve(L_m)(L_id);}, lazy((function(){
  var L_$F = (function(L_x){return resolve(L_bind)(L_x, L_cont)});
  L_$F.leisureFunctionId = 954;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 955;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("defWrapper", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_partition)(function(){return resolve(L_flip)(L_isTokenString)("->");}, L_list)(lazy((function(){
  var L_$F = (function(L_left){return (function(){
  var L_$F = (function(L_arrow){return (function(){
  var L_$F = (function(L_right){return (function(){  var L_name, L_oldName, L_args;
  L_name = function(){return resolve(L_strCat)(function(){return resolve(L_cons)("'", function(){return resolve(L_cons)(function(){return resolve(L_strTokenString)(function(){return resolve(L_head)(L_left);});}, function(){return resolve(L_cons)("'", L_nil);});});});};
  L_oldName = function(){return resolve(L_head)(function(){return resolve(L_tail)(L_left);});};
  L_args = function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_left);});};

  return resolve(L_cons)("override", function(){return resolve(L_cons)(L_name, function(){return resolve(L_cons)(function(){return resolve(L__append)(function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)(L_oldName, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)("\\@", function(){return resolve(L_cons)("arity", function(){return resolve(L_cons)(function(){return resolve(L_length)(L_args);}, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)("\\", L_args);});});});});});});});}, function(){return resolve(L_cons)(".", L_right);});}, L_nil);});})})()});
  L_$F.leisureFunctionId = 959;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 958;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 957;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 956;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("html", 1, "html x = \\f . f x", lazy(setDataType((function(){
  var L_$F = (function(L_x){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_x)});
  L_$F.leisureFunctionId = 961;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'html')});
  L_$F.leisureFunctionId = 960;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'html')))},
    function(){return resolve(L_newDefine)("_1of2", 1, "_1of2 s = s \\a b . a", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_a)});
  L_$F.leisureFunctionId = 964;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 963;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 962;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_2of2", 1, "_2of2 s = s \\a b . b", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_b)});
  L_$F.leisureFunctionId = 967;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 966;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 965;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_1of3", 1, "_1of3 s = s \\a b c . a", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return resolve(L_a)});
  L_$F.leisureFunctionId = 971;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 970;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 969;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 968;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_2of3", 1, "_2of3 s = s \\a b c . b", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return resolve(L_b)});
  L_$F.leisureFunctionId = 975;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 974;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 973;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 972;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_3of3", 1, "_3of3 s = s \\a b c . c", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return resolve(L_c)});
  L_$F.leisureFunctionId = 979;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 978;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 977;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 976;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_1of4", 1, "_1of4 s = s \\a b c d . a", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return (function(){
  var L_$F = (function(L_d){return resolve(L_a)});
  L_$F.leisureFunctionId = 984;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 983;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 982;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 981;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 980;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_2of4", 1, "_2of4 s = s \\a b c d . b", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return (function(){
  var L_$F = (function(L_d){return resolve(L_b)});
  L_$F.leisureFunctionId = 989;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 988;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 987;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 986;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 985;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_3of4", 1, "_3of4 s = s \\a b c d . c", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return (function(){
  var L_$F = (function(L_d){return resolve(L_c)});
  L_$F.leisureFunctionId = 994;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 993;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 992;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 991;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 990;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_4of4", 1, "_4of4 s = s \\a b c d . d", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_s)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return (function(){
  var L_$F = (function(L_d){return resolve(L_d)});
  L_$F.leisureFunctionId = 999;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 998;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 997;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 996;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 995;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLitValue", 1, "getLitValue ast = _1of2 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__1of2)(L_ast)});
  L_$F.leisureFunctionId = 1000;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLitRange", 1, "getLitRange ast = _2of2 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__2of2)(L_ast)});
  L_$F.leisureFunctionId = 1001;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getRefName", 1, "getRefName ast = _1of2 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__1of2)(L_ast)});
  L_$F.leisureFunctionId = 1002;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getRefRange", 1, "getRefRange ast = _2of2 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__2of2)(L_ast)});
  L_$F.leisureFunctionId = 1003;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLambdaName", 1, "getLambdaName ast = _1of3 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__1of3)(L_ast)});
  L_$F.leisureFunctionId = 1004;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLambdaBody", 1, "getLambdaBody ast = _2of3 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__2of3)(L_ast)});
  L_$F.leisureFunctionId = 1005;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLambdaRange", 1, "getLambdaRange ast = _3of3 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__3of3)(L_ast)});
  L_$F.leisureFunctionId = 1006;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getApplyFunc", 1, "getApplyFunc ast = _1of2 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__1of2)(L_ast)});
  L_$F.leisureFunctionId = 1007;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getApplyArg", 1, "getApplyArg ast = _2of2 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__2of2)(L_ast)});
  L_$F.leisureFunctionId = 1008;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLetName", 1, "getLetName ast = _1of4 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__1of4)(L_ast)});
  L_$F.leisureFunctionId = 1009;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLetValue", 1, "getLetValue ast = _2of4 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__2of4)(L_ast)});
  L_$F.leisureFunctionId = 1010;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLetBody", 1, "getLetBody ast = _3of4 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__3of4)(L_ast)});
  L_$F.leisureFunctionId = 1011;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLetRange", 1, "getLetRange ast = _4of4 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__4of4)(L_ast)});
  L_$F.leisureFunctionId = 1012;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getAnnoName", 1, "getAnnoName ast = _1of3 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__1of3)(L_ast)});
  L_$F.leisureFunctionId = 1013;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getAnnoData", 1, "getAnnoData ast = _2of3 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__2of3)(L_ast)});
  L_$F.leisureFunctionId = 1014;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getAnnoBody", 1, "getAnnoBody ast = _3of3 ast", lazy((function(){
  var L_$F = (function(L_ast){return resolve(L__3of3)(L_ast)});
  L_$F.leisureFunctionId = 1015;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("requireJS", 1, "requireJS file = primBind (getValue 'requiredFiles')\r\n  \\files . contains files file\r\n    false\r\n    primBind (loadJS file)\r\n      \\result . result\r\n        \\x . left x\r\n        \\_ . primBind (setValue 'requiredFiles' (cons file files))\r\n          \\_ . right true", lazy((function(){
  var L_$F = (function(L_file){return resolve(L_primBind)(function(){return resolve(L_getValue)("requiredFiles");}, lazy((function(){
  var L_$F = (function(L_files){return resolve(L_contains)(L_files, L_file)(L_false)(function(){return resolve(L_primBind)(function(){return resolve(L_loadJS)(L_file);}, lazy((function(){
  var L_$F = (function(L_result){return resolve(L_result)(lazy((function(){
  var L_$F = (function(L_x){return resolve(L_left)(L_x)});
  L_$F.leisureFunctionId = 1019;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(lazy((function(){
  var L_$F = (function(L__){return resolve(L_primBind)(function(){return resolve(L_setValue)("requiredFiles", function(){return resolve(L_cons)(L_file, L_files);});}, lazy((function(){
  var L_$F = (function(L___0){return resolve(L_right)(L_true)});
  L_$F.leisureFunctionId = 1021;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1020;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1018;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1017;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1016;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("loadJS", 1, "loadJS file = primBind (readFile file)\r\n  \\result . result\r\n    \\err . err\r\n    \\contents . js contents", lazy((function(){
  var L_$F = (function(L_file){return resolve(L_primBind)(function(){return resolve(L_readFile)(L_file);}, lazy((function(){
  var L_$F = (function(L_result){return resolve(L_result)(lazy((function(){
  var L_$F = (function(L_err){return resolve(L_err)});
  L_$F.leisureFunctionId = 1024;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(lazy((function(){
  var L_$F = (function(L_contents){return resolve(L_js)(L_contents)});
  L_$F.leisureFunctionId = 1025;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1023;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1022;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("definitionList", 0, "definitionList = do\r\n  f <- funcList\r\n  m <- getValue 'macroDefs'\r\n  sort (_append f (_map head m))", function(){return resolve(L_bind)(L_funcList, lazy((function(){
  var L_$F = (function(L_f){return resolve(L_bind)(function(){return resolve(L_getValue)("macroDefs");}, lazy((function(){
  var L_$F = (function(L_m){return resolve(L_sort)(function(){return resolve(L__append)(L_f, function(){return resolve(L__map)(L_head, L_m);});})});
  L_$F.leisureFunctionId = 1027;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1026;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})},
    function(){return resolve(L_newDefine)("eval", 1, "eval str = do\r\n  ast <- newParseLine 0 nil str\r\n  ifNotErr ast (runAst ast)", lazy((function(){
  var L_$F = (function(L_str){return resolve(L_bind)(function(){return resolve(L_newParseLine)(0, L_nil, L_str);}, lazy((function(){
  var L_$F = (function(L_ast){return resolve(L_ifNotErr)(L_ast, function(){return resolve(L_runAst)(L_ast);})});
  L_$F.leisureFunctionId = 1029;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1028;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tokenSrc", 1, "tokenSrc tokens = do\r\n  tokens = flatten (tokenList tokens)\r\n  tokens = mapchunks (\\l . [[\r\n   tokenString (head l)\r\n   (isNil (tail l)) '' (spacesBetween (first l) (second l))] | tail l]) tokens\r\n  strCat (flatten tokens)", lazy((function(){
  var L_$F = (function(L_tokens){return (function(){  var L_tokens_0, L_tokens_1;
  L_tokens_0 = function(){return resolve(L_flatten)(function(){return resolve(L_tokenList)(L_tokens);});};
  L_tokens_1 = function(){return resolve(L_mapchunks)(lazy((function(){
  var L_$F = (function(L_l){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(function(){return resolve(L_head)(L_l);});}, function(){return resolve(L_cons)(function(){return resolve(L_isNil)(function(){return resolve(L_tail)(L_l);})("")(function(){return resolve(L_spacesBetween)(function(){return resolve(L_first)(L_l);}, function(){return resolve(L_second)(L_l);});});}, L_nil);});}, function(){return resolve(L_tail)(L_l);})});
  L_$F.leisureFunctionId = 1031;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_tokens_0);};

  return resolve(L_strCat)(function(){return resolve(L_flatten)(L_tokens_1);})})()});
  L_$F.leisureFunctionId = 1030;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("spacesBetween", 2, "spacesBetween tok1 tok2 = tok1 \\t1 p1 . tok2 \\_ p2. p1 \\_ l1 o1 . p2 \\_ l2 o2 .\r\n  (l1 == l2)\r\n    strRep o2 - o1 - (length t1) ' '\r\n    (strRep l2 - l1 '\\n') + (strRep o2 ' ')", lazy((function(){
  var L_$F = function(L_tok1, L_tok2) {
    return L_checkPartial(L_$F, arguments) || resolve(L_tok1)(lazy((function(){
  var L_$F = (function(L_t1){return (function(){
  var L_$F = (function(L_p1){return resolve(L_tok2)(lazy((function(){
  var L_$F = (function(L__){return (function(){
  var L_$F = (function(L_p2){return resolve(L_p1)(lazy((function(){
  var L_$F = (function(L___0){return (function(){
  var L_$F = (function(L_l1){return (function(){
  var L_$F = (function(L_o1){return resolve(L_p2)(lazy((function(){
  var L_$F = (function(L___1){return (function(){
  var L_$F = (function(L_l2){return (function(){
  var L_$F = (function(L_o2){return resolve(L_$p$p)(L_l1, L_l2)(function(){return resolve(L_strRep)(function(){return resolve(L_$_)(function(){return resolve(L_$_)(L_o2, L_o1);}, function(){return resolve(L_length)(L_t1);});}, " ");})(function(){return resolve(L_$o)(function(){return resolve(L_strRep)(function(){return resolve(L_$_)(L_l2, L_l1);}, "\n");}, function(){return resolve(L_strRep)(L_o2, " ");});})});
  L_$F.leisureFunctionId = 1041;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1040;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1039;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1038;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1037;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1036;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1035;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1034;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1033;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1032;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1042;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strRep", 2, "strRep n char = n <= 0 '' char + (strRep n - 1 char)", lazy((function(){
  var L_$F = function(L_n, L_char) {
    return L_checkPartial(L_$F, arguments) || resolve(L_$y$p)(L_n, 0)("")(function(){return resolve(L_$o)(L_char, function(){return resolve(L_strRep)(function(){return resolve(L_$_)(L_n, 1);}, L_char);});});
  };
  L_$F.leisureFunctionId = 1043;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tokenList", 1, "tokenList tokens = do\r\n  isParens tokens\r\n    tokens \\start end content . [\r\n      token '(' start\r\n      tokenList content\r\n      token ')' (end \\f l o . filepos f l (max 0 o - 1))]\r\n    isList tokens\r\n      map tokenList tokens\r\n      [tokens]", lazy((function(){
  var L_$F = (function(L_tokens){return resolve(L_isParens)(L_tokens)(function(){return resolve(L_tokens)(lazy((function(){
  var L_$F = (function(L_start){return (function(){
  var L_$F = (function(L_end){return (function(){
  var L_$F = (function(L_content){return resolve(L_cons)(function(){return resolve(L_token)("(", L_start);}, function(){return resolve(L_cons)(function(){return resolve(L_tokenList)(L_content);}, function(){return resolve(L_cons)(function(){return resolve(L_token)(")", function(){return resolve(L_end)(lazy((function(){
  var L_$F = (function(L_f){return (function(){
  var L_$F = (function(L_l){return (function(){
  var L_$F = (function(L_o){return resolve(L_filepos)(L_f, L_l, function(){return resolve(L_max)(0, function(){return resolve(L_$_)(L_o, 1);});})});
  L_$F.leisureFunctionId = 1050;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1049;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1048;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));});}, L_nil);});})});
  L_$F.leisureFunctionId = 1047;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1046;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1045;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_isList)(L_tokens)(function(){return resolve(L_map)(L_tokenList, L_tokens);})(function(){return resolve(L_cons)(L_tokens, L_nil);});})});
  L_$F.leisureFunctionId = 1044;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("cond", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_foldr)(lazy((function(){
  var L_$F = (function(L_l){return (function(){
  var L_$F = (function(L_rest){return (function(){  var L_l_0;
  L_l_0 = function(){return resolve(L_stripParens)(L_l);};

  return resolve(L_not)(function(){return resolve(L_and)(function(){return resolve(L_isSequence)(L_l_0);}, function(){return resolve(L_and)(function(){return resolve(L_$p$p)(function(){return resolve(L_length)(L_l_0);}, 2);}, L_true);});})(function(){return resolve(L_error)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("Bad cond clause: ", function(){return resolve(L_cons)(function(){return resolve(L_tokenSrc)(L_l_0);}, function(){return resolve(L_cons)(", cond expects pairs of expressions: ", function(){return resolve(L_cons)(function(){return resolve(L_tokenSrc)(L_list);}, L_nil);});});});});});})(function(){return resolve(L_cons)(function(){return resolve(L_first)(L_l_0);}, function(){return resolve(L_cons)(function(){return resolve(L_second)(L_l_0);}, function(){return resolve(L_cons)(function(){return resolve(L_empty)(L_rest)("false")(L_rest);}, L_nil);});});})})()});
  L_$F.leisureFunctionId = 1053;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1052;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)(L_list)});
  L_$F.leisureFunctionId = 1051;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_addToken)("`")},
    function(){return resolve(L_addToken)("~")},
    function(){return resolve(L_addToken)("~@")},
    function(){return resolve(L_defMacro)("`", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_consFromTokens)(function(){return resolve(L_head)(L_list);})});
  L_$F.leisureFunctionId = 1054;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("consFromTokens", 1, "consFromTokens toks = do\r\n  item = head toks\r\n  rest = tail toks\r\n  item2 = head rest\r\n  rest2 = tail rest\r\n  cond\r\n    (isNil toks) 'nil'\r\n    (isParens toks) (toks \\s e c . consFromTokens c)\r\n    (isToken toks) (stringForToken toks)\r\n    (isString toks) (jsonStringify toks id id)\r\n    (not (isCons toks)) toks\r\n    (isTokenString item '~') ['cons' (stripParens item2) (consFromTokens rest2)]\r\n    (isTokenString item '~@')\r\n      empty rest2\r\n        stripParens item2\r\n        ['_append' ['tolist' (stripParens item2)] (consFromTokens rest2)]\r\n    true ['cons' (consFromTokens item) (consFromTokens rest)]", lazy((function(){
  var L_$F = (function(L_toks){return (function(){  var L_item, L_rest, L_item2, L_rest2;
  L_item = function(){return resolve(L_head)(L_toks);};
  L_rest = function(){return resolve(L_tail)(L_toks);};
  L_item2 = function(){return resolve(L_head)(L_rest);};
  L_rest2 = function(){return resolve(L_tail)(L_rest);};

  return resolve(L_isNil)(L_toks)("nil")(function(){return resolve(L_isParens)(L_toks)(function(){return resolve(L_toks)(lazy((function(){
  var L_$F = (function(L_s){return (function(){
  var L_$F = (function(L_e){return (function(){
  var L_$F = (function(L_c){return resolve(L_consFromTokens)(L_c)});
  L_$F.leisureFunctionId = 1058;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1057;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1056;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_isToken)(L_toks)(function(){return resolve(L_stringForToken)(L_toks);})(function(){return resolve(L_isString)(L_toks)(function(){return resolve(L_jsonStringify)(L_toks, L_id, L_id);})(function(){return resolve(L_not)(function(){return resolve(L_isCons)(L_toks);})(L_toks)(function(){return resolve(L_isTokenString)(L_item, "~")(function(){return resolve(L_cons)("cons", function(){return resolve(L_cons)(function(){return resolve(L_stripParens)(L_item2);}, function(){return resolve(L_cons)(function(){return resolve(L_consFromTokens)(L_rest2);}, L_nil);});});})(function(){return resolve(L_isTokenString)(L_item, "~@")(function(){return resolve(L_empty)(L_rest2)(function(){return resolve(L_stripParens)(L_item2);})(function(){return resolve(L_cons)("_append", function(){return resolve(L_cons)(function(){return resolve(L_cons)("tolist", function(){return resolve(L_cons)(function(){return resolve(L_stripParens)(L_item2);}, L_nil);});}, function(){return resolve(L_cons)(function(){return resolve(L_consFromTokens)(L_rest2);}, L_nil);});});});})(function(){return resolve(L_true)(function(){return resolve(L_cons)("cons", function(){return resolve(L_cons)(function(){return resolve(L_consFromTokens)(L_item);}, function(){return resolve(L_cons)(function(){return resolve(L_consFromTokens)(L_rest);}, L_nil);});});})(L_false);});});});});});});})})()});
  L_$F.leisureFunctionId = 1055;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("stringForToken", 1, "stringForToken tok = tok \\tok pos . token (jsonStringify tok id id) pos", lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_tok)(lazy((function(){
  var L_$F = (function(L_tok_0){return (function(){
  var L_$F = (function(L_pos){return resolve(L_token)(function(){return resolve(L_jsonStringify)(L_tok_0, L_id, L_id);}, L_pos)});
  L_$F.leisureFunctionId = 1061;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1060;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1059;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defTokenPack)("util", function(){return resolve(L_cons)(function(){return resolve(L_cons)("->", function(){return resolve(L_cons)("--", function(){return resolve(L_cons)("++", function(){return resolve(L_cons)("`", function(){return resolve(L_cons)("~", function(){return resolve(L_cons)("~@", L_nil);});});});});});}, function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_cons)("js[", "]");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("write[", "]");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("s[", "]");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("err[", "]");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("dl[", "]");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("map{", "}");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("set[", "]");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("vec[", "]");}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("append[", "]");}, L_nil);});});});});});});});});}, function(){return resolve(L_cons)(L_nil, L_nil);});});})},
    function(){return resolve(L_addStdTokenPacks)(function(){return resolve(L_cons)("util", L_nil);})}
  ]);
});
//# sourceMappingURL=std.map
