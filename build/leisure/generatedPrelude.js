"use strict";
define([], function(){
  return L_runMonads([
    function(){return resolve(L_setNameSpace)("core")},
    function(){return resolve(L__declareType)("err", 0)},
    function(){return resolve(L__declareType)("boolean", 0)},
    function(){return resolve(L__declareType)("true", "boolean")},
    function(){return resolve(L__declareType)("false", "boolean")},
    function(){return resolve(L__declareType)("option", 0)},
    function(){return resolve(L__declareType)("some", "option")},
    function(){return resolve(L__declareType)("none", "option")},
    function(){return resolve(L__declareType)("either", 0)},
    function(){return resolve(L__declareType)("left", "either")},
    function(){return resolve(L__declareType)("right", "either")},
    function(){return resolve(L__declareType)("keyedSequence", "sequence")},
    function(){return resolve(L_newDefine)("asIO", 1, "asIO x = x", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_x)});
  L_$F.leisureFunctionId = 748;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fakereturn", 1, "fakereturn x = x", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_x)});
  L_$F.leisureFunctionId = 749;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_recur", 1, "_recur x = \\f . f x", lazy(setDataType((function(){
  var L_$F = (function(L_x){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_x)});
  L_$F.leisureFunctionId = 751;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), '_recur')});
  L_$F.leisureFunctionId = 750;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), '_recur')))},
    function(){return resolve(L_newDefine)("true", 0, "true = \\a b . a", lazy(setDataType(setType((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_a)});
  L_$F.leisureFunctionId = 753;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 752;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'true'), 'true')))},
    function(){return resolve(L_newDefine)("false", 0, "false = \\a b . b", lazy(setDataType(setType((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_b)});
  L_$F.leisureFunctionId = 755;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 754;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'false'), 'false')))},
    function(){return resolve(L_newDefine)("not", 1, "not b = b false true", lazy((function(){
  var L_$F = (function(L_b){return resolve(L_b)(L_false)(L_true)});
  L_$F.leisureFunctionId = 756;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("and", 2, "and a b = a b false", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_a))(L_b, L_false);
  };
  L_$F.leisureFunctionId = 757;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("&&", 0, "&& = and", L_and)},
    function(){return resolve(L_newDefine)("or", 2, "or a b = a true b", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_a))(L_true, L_b);
  };
  L_$F.leisureFunctionId = 758;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("||", 0, "|| = or", L_or)},
    function(){return resolve(L_newDefine)("some", 1, "some x = \\someCase noneCase . someCase x", lazy(setDataType((function(){
  var L_$F = (function(L_x){return setType((function(){
  var L_$F = (function(L_someCase){return (function(){
  var L_$F = (function(L_noneCase){return resolve(L_someCase)(L_x)});
  L_$F.leisureFunctionId = 761;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 760;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'some')});
  L_$F.leisureFunctionId = 759;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'some')))},
    function(){return resolve(L_newDefine)("none", 0, "none = \\someCase noneCase . noneCase", lazy(setDataType(setType((function(){
  var L_$F = (function(L_someCase){return (function(){
  var L_$F = (function(L_noneCase){return resolve(L_noneCase)});
  L_$F.leisureFunctionId = 763;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 762;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'none'), 'none')))},
    function(){return resolve(L_newDefine)("isNone", 1, "isNone obj = hasType obj none", lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_hasType)(L_obj, L_none)});
  L_$F.leisureFunctionId = 764;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isSome", 1, "isSome obj = hasType obj some", lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_hasType)(L_obj, L_some)});
  L_$F.leisureFunctionId = 765;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isOption", 1, "isOption obj = or (isSome obj) (isNone obj)", lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_or)(function(){return resolve(L_isSome)(L_obj);}, function(){return resolve(L_isNone)(L_obj);})});
  L_$F.leisureFunctionId = 766;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("neq", 2, "neq a b = not (eq a b)", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || resolve(L_not)(function(){return resolve(L_eq)(L_a, L_b);});
  };
  L_$F.leisureFunctionId = 767;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("left", 1, "left x = \\lCase rCase . lCase x", lazy(setDataType((function(){
  var L_$F = (function(L_x){return setType((function(){
  var L_$F = (function(L_lCase){return (function(){
  var L_$F = (function(L_rCase){return resolve(L_lCase)(L_x)});
  L_$F.leisureFunctionId = 770;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 769;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'left')});
  L_$F.leisureFunctionId = 768;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'left')))},
    function(){return resolve(L_newDefine)("right", 1, "right x = \\lCase rCase . rCase x", lazy(setDataType((function(){
  var L_$F = (function(L_x){return setType((function(){
  var L_$F = (function(L_lCase){return (function(){
  var L_$F = (function(L_rCase){return resolve(L_rCase)(L_x)});
  L_$F.leisureFunctionId = 773;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 772;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'right')});
  L_$F.leisureFunctionId = 771;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'right')))},
    function(){return resolve(L_newDefine)("isEither", 1, "isEither obj = or (hasType obj left) (hasType obj right)", lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_or)(function(){return resolve(L_hasType)(L_obj, L_left);}, function(){return resolve(L_hasType)(L_obj, L_right);})});
  L_$F.leisureFunctionId = 774;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isString", 1, "isString s = == (getType s) 'string'", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_s);}, "string")});
  L_$F.leisureFunctionId = 775;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isNumber", 1, "isNumber s = == (getType s) 'number'", lazy((function(){
  var L_$F = (function(L_s){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_s);}, "number")});
  L_$F.leisureFunctionId = 776;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strAsc", 1, "strAsc string = _strAsc (assertType 'strAsc string' 'string' string)", lazy((function(){
  var L_$F = (function(L_string){return resolve(L__strAsc)(function(){return resolve(L_assertType)("strAsc string", "string", L_string);})});
  L_$F.leisureFunctionId = 777;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strChr", 1, "strChr ascii = _strChr (assertType 'strChr string' 'number' ascii)", lazy((function(){
  var L_$F = (function(L_ascii){return resolve(L__strChr)(function(){return resolve(L_assertType)("strChr string", "number", L_ascii);})});
  L_$F.leisureFunctionId = 778;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strAt", 2, "strAt string index = _strAt\r\n  assertType 'strAt string' 'string' string\r\n  assertType 'strAt index' 'number' index", lazy((function(){
  var L_$F = function(L_string, L_index) {
    return L_checkPartial(L_$F, arguments) || resolve(L__strAt)(function(){return resolve(L_assertType)("strAt string", "string", L_string);}, function(){return resolve(L_assertType)("strAt index", "number", L_index);});
  };
  L_$F.leisureFunctionId = 779;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strStartsWith", 2, "strStartsWith string prefix = _strStartsWith\r\n  assertType 'strStartsWith string' 'string' string\r\n  assertType 'strStartsWith prefix' 'string' prefix", lazy((function(){
  var L_$F = function(L_string, L_prefix) {
    return L_checkPartial(L_$F, arguments) || resolve(L__strStartsWith)(function(){return resolve(L_assertType)("strStartsWith string", "string", L_string);}, function(){return resolve(L_assertType)("strStartsWith prefix", "string", L_prefix);});
  };
  L_$F.leisureFunctionId = 780;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strLen", 1, "strLen string = _strLen (assertType 'strLen string' 'string' string)", lazy((function(){
  var L_$F = (function(L_string){return resolve(L__strLen)(function(){return resolve(L_assertType)("strLen string", "string", L_string);})});
  L_$F.leisureFunctionId = 781;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strReverse", 1, "strReverse string = _strReverse (assertType 'strLen string' 'string' string)", lazy((function(){
  var L_$F = (function(L_string){return resolve(L__strReverse)(function(){return resolve(L_assertType)("strLen string", "string", L_string);})});
  L_$F.leisureFunctionId = 782;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strToLowerCase", 1, "strToLowerCase string = _strToLowerCase (assertType 'strToLowerCase string' 'string' string)", lazy((function(){
  var L_$F = (function(L_string){return resolve(L__strToLowerCase)(function(){return resolve(L_assertType)("strToLowerCase string", "string", L_string);})});
  L_$F.leisureFunctionId = 783;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strToUpperCase", 1, "strToUpperCase string = _strToUpperCase (assertType 'strToUpperCase string' 'string' string)", lazy((function(){
  var L_$F = (function(L_string){return resolve(L__strToUpperCase)(function(){return resolve(L_assertType)("strToUpperCase string", "string", L_string);})});
  L_$F.leisureFunctionId = 784;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strReplace", 3, "strReplace string pat repl = _strReplace\r\n  assertType 'strReplace string' 'string' string\r\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strStartsWith pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat\r\n  assertType 'strReplace repl' 'string' repl", lazy((function(){
  var L_$F = function(L_string, L_pat, L_repl) {
    return L_checkPartial(L_$F, arguments) || resolve(L__strReplace)(function(){return resolve(L_assertType)("strReplace string", "string", L_string);}, function(){return resolve(L_assert)(function(){return resolve(L_or)(function(){return resolve(L_hasType)(L_pat, "string");}, function(){return resolve(L_hasType)(L_pat, "*RegExp");});})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strStartsWith pat should be type string or RegExp but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_pat);}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_pat);}, L_nil);});});});});})(L_pat);}, function(){return resolve(L_assertType)("strReplace repl", "string", L_repl);});
  };
  L_$F.leisureFunctionId = 785;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strSubstring", 3, "strSubstring str start end = _strSubstring\r\n  assertType 'strSubstring str' 'string' str\r\n  assertType 'strSubstring start' 'number' start\r\n  assertType 'strSubstring end' 'number' end", lazy((function(){
  var L_$F = function(L_str, L_start, L_end) {
    return L_checkPartial(L_$F, arguments) || resolve(L__strSubstring)(function(){return resolve(L_assertType)("strSubstring str", "string", L_str);}, function(){return resolve(L_assertType)("strSubstring start", "number", L_start);}, function(){return resolve(L_assertType)("strSubstring end", "number", L_end);});
  };
  L_$F.leisureFunctionId = 786;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strSplit", 2, "strSplit str pat = _strSplit\r\n  assertType 'strSplit str' 'string' str\r\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strSplit pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(){
  var L_$F = function(L_str, L_pat) {
    return L_checkPartial(L_$F, arguments) || resolve(L__strSplit)(function(){return resolve(L_assertType)("strSplit str", "string", L_str);}, function(){return resolve(L_assert)(function(){return resolve(L_or)(function(){return resolve(L_hasType)(L_pat, "string");}, function(){return resolve(L_hasType)(L_pat, "*RegExp");});})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strSplit pat should be type string or RegExp but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_pat);}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_pat);}, L_nil);});});});});})(L_pat);});
  };
  L_$F.leisureFunctionId = 787;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strCat", 1, "strCat list = _strCat\r\n  assert (isList list) (strCat (cons 'strCat list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy((function(){
  var L_$F = (function(L_list){return resolve(L__strCat)(function(){return resolve(L_assert)(function(){return resolve(L_isList)(L_list);})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strCat list should be type cons or nil but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_list);}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(L_list);});});});});})(L_list);})});
  L_$F.leisureFunctionId = 788;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strAdd", 2, "strAdd str1 str2 = _strAdd (assertType 'strAdd str1' 'string' str1) (assertType 'strAdd str2' 'string' str2)", lazy((function(){
  var L_$F = function(L_str1, L_str2) {
    return L_checkPartial(L_$F, arguments) || resolve(L__strAdd)(function(){return resolve(L_assertType)("strAdd str1", "string", L_str1);}, function(){return resolve(L_assertType)("strAdd str2", "string", L_str2);});
  };
  L_$F.leisureFunctionId = 789;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strMatch", 2, "strMatch str pat = _strMatch\r\n  assertType 'strMatch str' 'string' str\r\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strMatch pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(){
  var L_$F = function(L_str, L_pat) {
    return L_checkPartial(L_$F, arguments) || resolve(L__strMatch)(function(){return resolve(L_assertType)("strMatch str", "string", L_str);}, function(){return resolve(L_assert)(function(){return resolve(L_or)(function(){return resolve(L_hasType)(L_pat, "string");}, function(){return resolve(L_hasType)(L_pat, "*RegExp");});})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strMatch pat should be type string or RegExp but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_pat);}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_pat);}, L_nil);});});});});})(L_pat);});
  };
  L_$F.leisureFunctionId = 790;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strToList", 1, "strToList str = _strToList (assertType 'strToList str' 'string' str)", lazy((function(){
  var L_$F = (function(L_str){return resolve(L__strToList)(function(){return resolve(L_assertType)("strToList str", "string", L_str);})});
  L_$F.leisureFunctionId = 791;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strFromList", 1, "strFromList list = _strFromList\r\n  assert (isList list) (strCat (cons 'strFromList list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy((function(){
  var L_$F = (function(L_list){return resolve(L__strFromList)(function(){return resolve(L_assert)(function(){return resolve(L_isList)(L_list);})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strFromList list should be type cons or nil but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_list);}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(L_list);});});});});})(L_list);})});
  L_$F.leisureFunctionId = 792;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("regexp", 1, "regexp str = _regexp (assertType 'regexp str' 'string' str)", lazy((function(){
  var L_$F = (function(L_str){return resolve(L__regexp)(function(){return resolve(L_assertType)("regexp str", "string", L_str);})});
  L_$F.leisureFunctionId = 793;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("regexpFlags", 2, "regexpFlags str flags = _regexpFlags\r\n  assertType 'regexp str' 'string' str\r\n  assertType 'regexp flags' 'string' flags", lazy((function(){
  var L_$F = function(L_str, L_flags) {
    return L_checkPartial(L_$F, arguments) || resolve(L__regexpFlags)(function(){return resolve(L_assertType)("regexp str", "string", L_str);}, function(){return resolve(L_assertType)("regexp flags", "string", L_flags);});
  };
  L_$F.leisureFunctionId = 794;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("jsonParse", 3, "jsonParse str failure success = _jsonParse\r\n  assertType 'jsonParse str' 'string' str\r\n  failure\r\n  success", lazy((function(){
  var L_$F = function(L_str, L_failure, L_success) {
    return L_checkPartial(L_$F, arguments) || resolve(L__jsonParse)(function(){return resolve(L_assertType)("jsonParse str", "string", L_str);}, L_failure, L_success);
  };
  L_$F.leisureFunctionId = 795;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("show", 1, "show x = _show x", lazy((function(){
  var L_$F = (function(L_x){return resolve(L__show)(L_x)});
  L_$F.leisureFunctionId = 796;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("equal", 2, "equal x y = eq x y", lazy((function(){
  var L_$F = function(L_x, L_y) {
    return L_checkPartial(L_$F, arguments) || resolve(L_eq)(L_x, L_y);
  };
  L_$F.leisureFunctionId = 797;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("id", 1, "id x = x", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_x)});
  L_$F.leisureFunctionId = 798;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("unit", 0, "unit = \\x . x", lazy(setDataType(setType((function(){
  var L_$F = (function(L_x){return resolve(L_x)});
  L_$F.leisureFunctionId = 799;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'unit'), 'unit')))},
    function(){return resolve(L_newDefine)("compose", 2, "compose f g = \\x . f (g x)", lazy(setDataType((function(){
  var L_$F = function(L_f, L_g) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_x){return resolve(L_f)(function(){return resolve(L_g)(L_x);})});
  L_$F.leisureFunctionId = 800;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'compose');
  };
  L_$F.leisureFunctionId = 801;
  L_$F.leisureLength = 2;
  return L_$F;
})(), 'compose')))},
    function(){return resolve(L_newDefine)("flip", 1, "flip func = \\x y . func y x", lazy(setDataType((function(){
  var L_$F = (function(L_func){return setType((function(){
  var L_$F = (function(L_x){return (function(){
  var L_$F = (function(L_y){return resolve(L_func)(L_y)(L_x)});
  L_$F.leisureFunctionId = 804;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 803;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'flip')});
  L_$F.leisureFunctionId = 802;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'flip')))},
    function(){return resolve(L_newDefine)("withCons", 3, "withCons l nilCase cont = isCons l (l (\\h t D . cont h t) nilCase) nilCase", lazy((function(){
  var L_$F = function(L_l, L_nilCase, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isCons)(L_l)(function(){return L$(resolve(L_l))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return L$(resolve(L_cont))(L_h, L_t)});
  L_$F.leisureFunctionId = 807;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 806;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 805;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nilCase);})(L_nilCase);
  };
  L_$F.leisureFunctionId = 808;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("cons", 2, "cons a b = \\f . f a b", lazy(setDataType((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_a)(L_b)});
  L_$F.leisureFunctionId = 809;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'cons');
  };
  L_$F.leisureFunctionId = 810;
  L_$F.leisureLength = 2;
  return L_$F;
})(), 'cons')))},
    function(){return resolve(L_newDefine)("isCons", 1, "isCons c = hasType c cons", lazy((function(){
  var L_$F = (function(L_c){return resolve(L_hasType)(L_c, L_cons)});
  L_$F.leisureFunctionId = 811;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isList", 1, "isList l = or (hasType l cons) (hasType l nil)", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_or)(function(){return resolve(L_hasType)(L_l, L_cons);}, function(){return resolve(L_hasType)(L_l, L_nil);})});
  L_$F.leisureFunctionId = 812;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("assertType", 3, "assertType msg type value =\r\n  assert\r\n    hasType value type\r\n    strCat (cons msg (cons ' should be type ' (cons (getDataType type) (cons ', but its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))))\r\n    value", lazy((function(){
  var L_$F = function(L_msg, L_type, L_value) {
    return L_checkPartial(L_$F, arguments) || resolve(L_assert)(function(){return resolve(L_hasType)(L_value, L_type);})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(L_msg, function(){return resolve(L_cons)(" should be type ", function(){return resolve(L_cons)(function(){return resolve(L_getDataType)(L_type);}, function(){return resolve(L_cons)(", but its type is ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_value);}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_value);}, L_nil);});});});});});});});})(L_value);
  };
  L_$F.leisureFunctionId = 813;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("nil", 0, "nil = \\a b . b", lazy(setDataType(setType((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_b)});
  L_$F.leisureFunctionId = 815;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 814;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'nil'), 'nil')))},
    function(){return resolve(L_newDefine)("isNil", 1, "isNil n = hasType n nil", lazy((function(){
  var L_$F = (function(L_n){return resolve(L_hasType)(L_n, L_nil)});
  L_$F.leisureFunctionId = 816;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("head", 1, "head l = l \\h t . h", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_l)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_h)});
  L_$F.leisureFunctionId = 819;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 818;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 817;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tail", 1, "tail l = l \\h t . t", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_l)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_t)});
  L_$F.leisureFunctionId = 822;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 821;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 820;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("last", 1, "last l = isNil (tail l)\r\n  head l\r\n  last (tail l)", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_isNil)(function(){return resolve(L_tail)(L_l);})(function(){return resolve(L_head)(L_l);})(function(){return resolve(L_last)(function(){return resolve(L_tail)(L_l);});})});
  L_$F.leisureFunctionId = 823;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("removeLast", 1, "removeLast l = isNil (tail l)\r\n  nil\r\n  cons (head l) (removeLast (tail l))", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_isNil)(function(){return resolve(L_tail)(L_l);})(L_nil)(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_l);}, function(){return resolve(L_removeLast)(function(){return resolve(L_tail)(L_l);});});})});
  L_$F.leisureFunctionId = 824;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("length", 1, "length list = isCons list\r\n  + 1 (length (tail list))\r\n  assert (hasType list nil) (strCat (cons \"length argument is not a proper list: \" (cons list nil))) 0", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_isCons)(L_list)(function(){return resolve(L_$o)(1, function(){return resolve(L_length)(function(){return resolve(L_tail)(L_list);});});})(function(){return resolve(L_assert)(function(){return resolve(L_hasType)(L_list, L_nil);})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("length argument is not a proper list: ", function(){return resolve(L_cons)(L_list, L_nil);});});})(0);})});
  L_$F.leisureFunctionId = 825;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_foldl", 3, "_foldl func initialValue l = l (\\h t D . foldl func (func initialValue h) t) initialValue", lazy((function(){
  var L_$F = function(L_func, L_initialValue, L_l) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_l))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_foldl)(L_func)(function(){return L$(resolve(L_func))(L_initialValue, L_h);})(L_t)});
  L_$F.leisureFunctionId = 828;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 827;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 826;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_initialValue);
  };
  L_$F.leisureFunctionId = 829;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_foldl1", 2, "_foldl1 func l = l \\h t . foldl func h t", lazy((function(){
  var L_$F = function(L_func, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_l)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_foldl)(L_func)(L_h)(L_t)});
  L_$F.leisureFunctionId = 831;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 830;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 832;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_foldr", 3, "_foldr func finalValue list = list\r\n  \\h t D . func h (foldr func finalValue t)\r\n  finalValue", lazy((function(){
  var L_$F = function(L_func, L_finalValue, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return L$(resolve(L_func))(L_h, function(){return resolve(L_foldr)(L_func)(L_finalValue)(L_t);})});
  L_$F.leisureFunctionId = 835;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 834;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 833;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_finalValue);
  };
  L_$F.leisureFunctionId = 836;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_foldr1", 2, "_foldr1 func list = list \\h t . isNil t\r\n  h\r\n  func h (foldr1 func t)", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_isNil)(L_t)(L_h)(function(){return L$(resolve(L_func))(L_h, function(){return resolve(L_foldr1)(L_func)(L_t);});})});
  L_$F.leisureFunctionId = 838;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 837;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 839;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_append", 2, "_append a b = _foldr cons b a", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || resolve(L__foldr)(L_cons, L_b, L_a);
  };
  L_$F.leisureFunctionId = 840;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("foldl", 0, "foldl = _foldl", L__foldl)},
    function(){return resolve(L_newDefine)("foldl1", 0, "foldl1 = _foldl1", L__foldl1)},
    function(){return resolve(L_newDefine)("foldr", 0, "foldr = _foldr", L__foldr)},
    function(){return resolve(L_newDefine)("foldr1", 0, "foldr1 = _foldr1", L__foldr1)},
    function(){return resolve(L_newDefine)("append", 0, "append = _append", L__append)},
    function(){return resolve(L_newDefine)("_reverse", 1, "_reverse l = rev l nil", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_rev)(L_l, L_nil)});
  L_$F.leisureFunctionId = 841;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("reverse", 0, "reverse = _reverse", L__reverse)},
    function(){return resolve(L_newDefine)("rev", 2, "rev l result = isNil l\r\n  result\r\n  rev (tail l) (cons (head l) result)", lazy((function(){
  var L_$F = function(L_l, L_result) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_l)(L_result)(function(){return resolve(L_rev)(function(){return resolve(L_tail)(L_l);}, function(){return resolve(L_cons)(function(){return resolve(L_head)(L_l);}, L_result);});});
  };
  L_$F.leisureFunctionId = 842;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_flatten", 1, "_flatten list = isCons list\r\n  subflatten list nil\r\n  list", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_isCons)(L_list)(function(){return resolve(L_subflatten)(L_list, L_nil);})(L_list)});
  L_$F.leisureFunctionId = 843;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("flatten", 0, "flatten = _flatten", L__flatten)},
    function(){return resolve(L_newDefine)("subflatten", 2, "subflatten list result = isNil list\r\n  result\r\n  isCons list\r\n    subflatten (head list) (subflatten (tail list) result)\r\n    cons list result", lazy((function(){
  var L_$F = function(L_list, L_result) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_list)(L_result)(function(){return resolve(L_isCons)(L_list)(function(){return resolve(L_subflatten)(function(){return resolve(L_head)(L_list);}, function(){return resolve(L_subflatten)(function(){return resolve(L_tail)(L_list);}, L_result);});})(function(){return resolve(L_cons)(L_list, L_result);});});
  };
  L_$F.leisureFunctionId = 844;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_filter", 2, "_filter func list = isNil list\r\n  nil\r\n  func (head list) (cons (head list)) id (_filter func (tail list))", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_list)(L_nil)(function(){return L$(resolve(L_func))(function(){return resolve(L_head)(L_list);}, function(){return resolve(L_cons)(function(){return resolve(L_head)(L_list);});}, L_id, function(){return resolve(L__filter)(L_func, function(){return resolve(L_tail)(L_list);});});});
  };
  L_$F.leisureFunctionId = 845;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("filter", 0, "filter = _filter", L__filter)},
    function(){return resolve(L_newDefine)("_find", 2, "_find predicate list =\r\n  foldr (\\item result . (predicate item) (some item) result) none list", lazy((function(){
  var L_$F = function(L_predicate, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_foldr)(lazy((function(){
  var L_$F = (function(L_item){return (function(){
  var L_$F = (function(L_result){return L$(resolve(L_predicate))(L_item, function(){return resolve(L_some)(L_item);}, L_result)});
  L_$F.leisureFunctionId = 847;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 846;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_none)(L_list);
  };
  L_$F.leisureFunctionId = 848;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("find", 0, "find = _find", L__find)},
    function(){return resolve(L_newDefine)("_contains", 2, "_contains list item = find (\\el . eq el item) list (\\x . true) false", lazy((function(){
  var L_$F = function(L_list, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_find)(lazy((function(){
  var L_$F = (function(L_el){return resolve(L_eq)(L_el, L_item)});
  L_$F.leisureFunctionId = 849;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_list)(lazy((function(){
  var L_$F = (function(L_x){return resolve(L_true)});
  L_$F.leisureFunctionId = 850;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_false);
  };
  L_$F.leisureFunctionId = 851;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("findIndex", 2, "findIndex func list = idx list func 0", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_idx)(L_list, L_func, 0);
  };
  L_$F.leisureFunctionId = 852;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("idx", 3, "idx list func pos = list\r\n  \\h t D . func h\r\n    pos\r\n    idx t func (+ 1 pos)\r\n  -1", lazy((function(){
  var L_$F = function(L_list, L_func, L_pos) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return L$(resolve(L_func))(L_h, L_pos, function(){return resolve(L_idx)(L_t, L_func, function(){return resolve(L_$o)(1, L_pos);});})});
  L_$F.leisureFunctionId = 855;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 854;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 853;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(-1);
  };
  L_$F.leisureFunctionId = 856;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("index", 2, "index list el = find (\\item . == el item) list", lazy((function(){
  var L_$F = function(L_list, L_el) {
    return L_checkPartial(L_$F, arguments) || resolve(L_find)(lazy((function(){
  var L_$F = (function(L_item){return resolve(L_$p$p)(L_el, L_item)});
  L_$F.leisureFunctionId = 857;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_list);
  };
  L_$F.leisureFunctionId = 858;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_map", 2, "_map func l = isCons l\r\n  cons (func (head l)) (_map func (tail l))\r\n  l", lazy((function(){
  var L_$F = function(L_func, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isCons)(L_l)(function(){return resolve(L_cons)(function(){return resolve(L_func)(function(){return resolve(L_head)(L_l);});}, function(){return resolve(L__map)(L_func, function(){return resolve(L_tail)(L_l);});});})(L_l);
  };
  L_$F.leisureFunctionId = 859;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("map", 0, "map = _map", L__map)},
    function(){return resolve(L_newDefine)("intersperse", 2, "intersperse list element = list (\\h t D .\r\n  isNil t\r\n    list\r\n    cons h (cons element (intersperse t element))) nil", lazy((function(){
  var L_$F = function(L_list, L_element) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isNil)(L_t)(L_list)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(L_element, function(){return resolve(L_intersperse)(L_t, L_element);});});})});
  L_$F.leisureFunctionId = 862;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 861;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 860;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);
  };
  L_$F.leisureFunctionId = 863;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("join", 2, "join list el = strCat (intersperse list el)", lazy((function(){
  var L_$F = function(L_list, L_el) {
    return L_checkPartial(L_$F, arguments) || resolve(L_strCat)(function(){return resolve(L_intersperse)(L_list, L_el);});
  };
  L_$F.leisureFunctionId = 864;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("assertAlist", 3, "assertAlist msg value result = assert (isAlist value) (strCat (cons msg (cons ' should be a association list, but it is not; its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))) result", lazy((function(){
  var L_$F = function(L_msg, L_value, L_result) {
    return L_checkPartial(L_$F, arguments) || resolve(L_assert)(function(){return resolve(L_isAlist)(L_value);})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(L_msg, function(){return resolve(L_cons)(" should be a association list, but it is not; its type is ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_value);}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_value);}, L_nil);});});});});});})(L_result);
  };
  L_$F.leisureFunctionId = 865;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("acons", 3, "acons k v alist = assertAlist \"acons alist\" alist (\\@ type cons . \\f . \\@ assoc true . f (cons k v) alist)", lazy((function(){
  var L_$F = function(L_k, L_v, L_alist) {
    return L_checkPartial(L_$F, arguments) || resolve(L_assertAlist)("acons alist", L_alist, lazy(setType(setLambdaProperties((function(){
  var L_$F = (function(L_f){return resolve(L_f)(function(){return resolve(L_cons)(L_k, L_v);})(L_alist)});
  L_$F.leisureFunctionId = 866;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), {"assoc":"true"}), 'cons')));
  };
  L_$F.leisureFunctionId = 867;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("assoc", 2, "assoc k alist  = find (\\el . eq k (head el)) alist (\\cell . cell \\head tail . some tail) none", lazy((function(){
  var L_$F = function(L_k, L_alist) {
    return L_checkPartial(L_$F, arguments) || resolve(L_find)(lazy((function(){
  var L_$F = (function(L_el){return resolve(L_eq)(L_k, function(){return resolve(L_head)(L_el);})});
  L_$F.leisureFunctionId = 868;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_alist)(lazy((function(){
  var L_$F = (function(L_cell){return resolve(L_cell)(lazy((function(){
  var L_$F = (function(L_head){return (function(){
  var L_$F = (function(L_tail){return resolve(L_some)(L_tail)});
  L_$F.leisureFunctionId = 871;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 870;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 869;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_none);
  };
  L_$F.leisureFunctionId = 872;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("rassoc", 2, "rassoc v alist = find (\\el . eq v (tail el)) alist (\\cell . cell \\head tail . some head) none", lazy((function(){
  var L_$F = function(L_v, L_alist) {
    return L_checkPartial(L_$F, arguments) || resolve(L_find)(lazy((function(){
  var L_$F = (function(L_el){return resolve(L_eq)(L_v, function(){return resolve(L_tail)(L_el);})});
  L_$F.leisureFunctionId = 873;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_alist)(lazy((function(){
  var L_$F = (function(L_cell){return resolve(L_cell)(lazy((function(){
  var L_$F = (function(L_head){return (function(){
  var L_$F = (function(L_tail){return resolve(L_some)(L_head)});
  L_$F.leisureFunctionId = 876;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 875;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 874;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_none);
  };
  L_$F.leisureFunctionId = 877;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isAlist", 1, "isAlist obj = or (isNil obj) (hasProperty obj 'assoc')", lazy((function(){
  var L_$F = (function(L_obj){return resolve(L_or)(function(){return resolve(L_isNil)(L_obj);}, function(){return resolve(L_hasProperty)(L_obj, "assoc");})});
  L_$F.leisureFunctionId = 878;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("aconsPair", 2, "aconsPair keyValue list = \\@ type cons . \\f . \\@ assoc true . f keyValue list", lazy((function(){
  var L_$F = function(L_keyValue, L_list) {
    return L_checkPartial(L_$F, arguments) || setType(setLambdaProperties((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_keyValue)(L_list)});
  L_$F.leisureFunctionId = 879;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), {"assoc":"true"}), 'cons');
  };
  L_$F.leisureFunctionId = 880;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("appendAlist", 2, "appendAlist a b = _foldr aconsPair a b", lazy((function(){
  var L_$F = function(L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || resolve(L__foldr)(L_aconsPair, L_a, L_b);
  };
  L_$F.leisureFunctionId = 881;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("keys", 1, "keys list = _map (\\l . head l) list", lazy((function(){
  var L_$F = (function(L_list){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_l){return resolve(L_head)(L_l)});
  L_$F.leisureFunctionId = 883;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_list)});
  L_$F.leisureFunctionId = 882;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getProperty", 2, "getProperty func prop = assoc prop (getProperties func)", lazy((function(){
  var L_$F = function(L_func, L_prop) {
    return L_checkPartial(L_$F, arguments) || resolve(L_assoc)(L_prop, function(){return resolve(L_getProperties)(L_func);});
  };
  L_$F.leisureFunctionId = 884;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("hasProperty", 2, "hasProperty func prop = getProperty func prop\r\n  \\_ . true\r\n  false", lazy((function(){
  var L_$F = function(L_func, L_prop) {
    return L_checkPartial(L_$F, arguments) || resolve(L_getProperty)(L_func, L_prop)(lazy((function(){
  var L_$F = (function(L__){return resolve(L_true)});
  L_$F.leisureFunctionId = 885;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_false);
  };
  L_$F.leisureFunctionId = 886;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("odds", 1, "odds l = l\r\n  \\h t D . cons h (evens t)\r\n  nil", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_l)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_cons)(L_h, function(){return resolve(L_evens)(L_t);})});
  L_$F.leisureFunctionId = 890;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 889;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 888;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)});
  L_$F.leisureFunctionId = 887;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("evens", 1, "evens l = l\r\n  \\h t D . odds t\r\n  nil", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_l)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_odds)(L_t)});
  L_$F.leisureFunctionId = 894;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 893;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 892;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)});
  L_$F.leisureFunctionId = 891;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("cleave", 1, "cleave l = cons (evens l) (odds l)", lazy((function(){
  var L_$F = (function(L_l){return resolve(L_cons)(function(){return resolve(L_evens)(L_l);}, function(){return resolve(L_odds)(L_l);})});
  L_$F.leisureFunctionId = 895;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("merge", 3, "merge cmp a b = a\r\n  \\ah at D . b\r\n    \\bh bt D . cmp ah bh\r\n      cons ah (merge cmp at b)\r\n      cons bh (merge cmp a bt)\r\n    a\r\n  b", lazy((function(){
  var L_$F = function(L_cmp, L_a, L_b) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_a))(lazy((function(){
  var L_$F = (function(L_ah){return (function(){
  var L_$F = (function(L_at){return (function(){
  var L_$F = (function(L_D){return L$(resolve(L_b))(lazy((function(){
  var L_$F = (function(L_bh){return (function(){
  var L_$F = (function(L_bt){return (function(){
  var L_$F = (function(L_D_0){return L$(resolve(L_cmp))(L_ah, L_bh, function(){return resolve(L_cons)(L_ah, function(){return resolve(L_merge)(L_cmp, L_at, L_b);});}, function(){return resolve(L_cons)(L_bh, function(){return resolve(L_merge)(L_cmp, L_a, L_bt);});})});
  L_$F.leisureFunctionId = 901;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 900;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 899;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_a)});
  L_$F.leisureFunctionId = 898;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 897;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 896;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_b);
  };
  L_$F.leisureFunctionId = 902;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("mergeSort", 2, "mergeSort cmp l = l\r\n  \\h t D . eq (tail l) nil\r\n    l\r\n    \\\\\r\n      cl = cleave l\r\n      e = head cl\r\n      o = tail cl\r\n      .\r\n      merge cmp (mergeSort cmp e) (mergeSort cmp o)\r\n  nil", lazy((function(){
  var L_$F = function(L_cmp, L_l) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_l))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_eq)(function(){return resolve(L_tail)(L_l);}, L_nil)(L_l)(function(){return (function(){  var L_cl, L_e, L_o;
  L_cl = function(){return resolve(L_cleave)(L_l);};
  L_e = function(){return resolve(L_head)(L_cl);};
  L_o = function(){return resolve(L_tail)(L_cl);};

  return resolve(L_merge)(L_cmp, function(){return resolve(L_mergeSort)(L_cmp, L_e);}, function(){return resolve(L_mergeSort)(L_cmp, L_o);})})();})});
  L_$F.leisureFunctionId = 905;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 904;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 903;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil);
  };
  L_$F.leisureFunctionId = 906;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("insertSorted", 3, "insertSorted sortFunc item list = list\r\n  \\h t D . sortFunc item h (cons item list) (cons h (insertSorted sortFunc item t))\r\n  cons item nil", lazy((function(){
  var L_$F = function(L_sortFunc, L_item, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return L$(resolve(L_sortFunc))(L_item, L_h, function(){return resolve(L_cons)(L_item, L_list);}, function(){return resolve(L_cons)(L_h, function(){return resolve(L_insertSorted)(L_sortFunc, L_item, L_t);});})});
  L_$F.leisureFunctionId = 909;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 908;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 907;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_cons)(L_item, L_nil);});
  };
  L_$F.leisureFunctionId = 910;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("err", 1, "err msg = \\f . f msg", lazy(setDataType((function(){
  var L_$F = (function(L_msg){return setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_msg)});
  L_$F.leisureFunctionId = 912;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'err')});
  L_$F.leisureFunctionId = 911;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'err')))},
    function(){return resolve(L_newDefine)("errMsg", 1, "errMsg err = err \\m . m", lazy((function(){
  var L_$F = (function(L_err){return resolve(L_err)(lazy((function(){
  var L_$F = (function(L_m){return resolve(L_m)});
  L_$F.leisureFunctionId = 914;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 913;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isErr", 1, "isErr thing = hasType thing err", lazy((function(){
  var L_$F = (function(L_thing){return resolve(L_hasType)(L_thing, L_err)});
  L_$F.leisureFunctionId = 915;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("ifNotErr", 2, "ifNotErr thing cont = (isErr thing) thing (cont thing)", lazy((function(){
  var L_$F = function(L_thing, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isErr)(L_thing)(L_thing)(function(){return resolve(L_cont)(L_thing);});
  };
  L_$F.leisureFunctionId = 916;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_setNameSpace)("parser")},
    function(){return resolve(L_newDefine)("token", 2, "token txt pos = \\f . f txt pos", lazy(setDataType((function(){
  var L_$F = function(L_txt, L_pos) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_txt)(L_pos)});
  L_$F.leisureFunctionId = 917;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'token');
  };
  L_$F.leisureFunctionId = 918;
  L_$F.leisureLength = 2;
  return L_$F;
})(), 'token')))},
    function(){return resolve(L_newDefine)("tokenString", 1, "tokenString tok = tok \\t p . t", lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_tok)(lazy((function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_p){return resolve(L_t)});
  L_$F.leisureFunctionId = 921;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 920;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 919;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tokenFilepos", 1, "tokenFilepos tok = tok \\t p . p", lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_tok)(lazy((function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_p){return resolve(L_p)});
  L_$F.leisureFunctionId = 924;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 923;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 922;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tokenPos", 1, "tokenPos tok = tok \\t p . isFilepos p\r\n  fileposOffset p\r\n  p", lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_tok)(lazy((function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_p){return resolve(L_isFilepos)(L_p)(function(){return resolve(L_fileposOffset)(L_p);})(L_p)});
  L_$F.leisureFunctionId = 927;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 926;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 925;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isToken", 1, "isToken t = hasType t token", lazy((function(){
  var L_$F = (function(L_t){return resolve(L_hasType)(L_t, L_token)});
  L_$F.leisureFunctionId = 928;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("emptyLineStarts", 0, "emptyLineStarts = cons 'EMPTYFILE.lsr' (cons 1 nil)", function(){return resolve(L_cons)("EMPTYFILE.lsr", function(){return resolve(L_cons)(1, L_nil);});})},
    function(){return resolve(L_newDefine)("filepos", 3, "filepos file line offset = \\f . f file line offset", lazy(setDataType((function(){
  var L_$F = function(L_file, L_line, L_offset) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_file)(L_line)(L_offset)});
  L_$F.leisureFunctionId = 929;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'filepos');
  };
  L_$F.leisureFunctionId = 930;
  L_$F.leisureLength = 3;
  return L_$F;
})(), 'filepos')))},
    function(){return resolve(L_newDefine)("fileposFile", 1, "fileposFile p = p \\file line offset . file", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_p)(lazy((function(){
  var L_$F = (function(L_file){return (function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_offset){return resolve(L_file)});
  L_$F.leisureFunctionId = 934;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 933;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 932;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 931;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fileposLine", 1, "fileposLine p = p \\file line offset . line", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_p)(lazy((function(){
  var L_$F = (function(L_file){return (function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_offset){return resolve(L_line)});
  L_$F.leisureFunctionId = 938;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 937;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 936;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 935;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fileposOffset", 1, "fileposOffset p = p \\file line offset . offset", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_p)(lazy((function(){
  var L_$F = (function(L_file){return (function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_offset){return resolve(L_offset)});
  L_$F.leisureFunctionId = 942;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 941;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 940;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 939;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isFilepos", 1, "isFilepos p = hasType p filepos", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_hasType)(L_p, L_filepos)});
  L_$F.leisureFunctionId = 943;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("addFilepos", 2, "addFilepos pos change = isFilepos pos pos emptyFilePos\r\n  \\file line offset . filepos file line (+ offset change)", lazy((function(){
  var L_$F = function(L_pos, L_change) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isFilepos)(L_pos)(L_pos)(L_emptyFilePos)(lazy((function(){
  var L_$F = (function(L_file){return (function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_offset){return resolve(L_filepos)(L_file, L_line, function(){return resolve(L_$o)(L_offset, L_change);})});
  L_$F.leisureFunctionId = 946;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 945;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 944;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 947;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("emptyFilePos", 0, "emptyFilePos = filepos 'NOTHING.lsr' 0 0", function(){return resolve(L_filepos)("NOTHING.lsr", 0, 0);})},
    function(){return resolve(L_newDefine)("isEmptyPos", 1, "isEmptyPos pos = and (isFilepos pos) (and (eq 0 (fileposLine pos)) (eq 0 (fileposOffset pos)))", lazy((function(){
  var L_$F = (function(L_pos){return resolve(L_and)(function(){return resolve(L_isFilepos)(L_pos);}, function(){return resolve(L_and)(function(){return resolve(L_eq)(0, function(){return resolve(L_fileposLine)(L_pos);});}, function(){return resolve(L_eq)(0, function(){return resolve(L_fileposOffset)(L_pos);});});})});
  L_$F.leisureFunctionId = 948;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("emptyFor", 1, "emptyFor thing = filepos (fileposFile (position thing)) 0 0", lazy((function(){
  var L_$F = (function(L_thing){return resolve(L_filepos)(function(){return resolve(L_fileposFile)(function(){return resolve(L_position)(L_thing);});}, 0, 0)});
  L_$F.leisureFunctionId = 949;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("startFilePos", 0, "startFilePos = emptyFilePos", L_emptyFilePos)},
    function(){return resolve(L_newDefine)("filePosFor", 2, "filePosFor lineStarts offset = countFilePos (head (tail lineStarts)) 0 (tail (tail lineStarts)) offset\r\n  \\line offset . filepos (head lineStarts) line offset", lazy((function(){
  var L_$F = function(L_lineStarts, L_offset) {
    return L_checkPartial(L_$F, arguments) || resolve(L_countFilePos)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_lineStarts);});}, 0, function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_lineStarts);});}, L_offset)(lazy((function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_offset){return resolve(L_filepos)(function(){return resolve(L_head)(L_lineStarts);}, L_line, L_offset)});
  L_$F.leisureFunctionId = 951;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 950;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 952;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countFilePos", 4, "countFilePos line lineOffset starts offset = or (isNil starts) (> (head starts) offset)\r\n  \\f . f line (- offset lineOffset)\r\n  countFilePos (+ line 1) (head starts) (tail starts) offset", lazy((function(){
  var L_$F = function(L_line, L_lineOffset, L_starts, L_offset) {
    return L_checkPartial(L_$F, arguments) || resolve(L_or)(function(){return resolve(L_isNil)(L_starts);}, function(){return resolve(L_$z)(function(){return resolve(L_head)(L_starts);}, L_offset);})(lazy((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_line)(function(){return resolve(L_$_)(L_offset, L_lineOffset);})});
  L_$F.leisureFunctionId = 953;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_countFilePos)(function(){return resolve(L_$o)(L_line, 1);}, function(){return resolve(L_head)(L_starts);}, function(){return resolve(L_tail)(L_starts);}, L_offset);});
  };
  L_$F.leisureFunctionId = 954;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("fileposList", 1, "fileposList pos = pos \\file line offset . cons line (cons offset nil)", lazy((function(){
  var L_$F = (function(L_pos){return resolve(L_pos)(lazy((function(){
  var L_$F = (function(L_file){return (function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_offset){return resolve(L_cons)(L_line, function(){return resolve(L_cons)(L_offset, L_nil);})});
  L_$F.leisureFunctionId = 958;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 957;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 956;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 955;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parens", 3, "parens start end content = \\f . f start end content", lazy(setDataType((function(){
  var L_$F = function(L_start, L_end, L_content) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_start)(L_end)(L_content)});
  L_$F.leisureFunctionId = 959;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'parens');
  };
  L_$F.leisureFunctionId = 960;
  L_$F.leisureLength = 3;
  return L_$F;
})(), 'parens')))},
    function(){return resolve(L_newDefine)("parensStart", 1, "parensStart p = p \\s e c . s", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_p)(lazy((function(){
  var L_$F = (function(L_s){return (function(){
  var L_$F = (function(L_e){return (function(){
  var L_$F = (function(L_c){return resolve(L_s)});
  L_$F.leisureFunctionId = 964;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 963;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 962;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 961;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parensEnd", 1, "parensEnd p = p \\s e c . e", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_p)(lazy((function(){
  var L_$F = (function(L_s){return (function(){
  var L_$F = (function(L_e){return (function(){
  var L_$F = (function(L_c){return resolve(L_e)});
  L_$F.leisureFunctionId = 968;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
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
    function(){return resolve(L_newDefine)("parensContent", 1, "parensContent p = p \\s e c . c", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_p)(lazy((function(){
  var L_$F = (function(L_s){return (function(){
  var L_$F = (function(L_e){return (function(){
  var L_$F = (function(L_c){return resolve(L_c)});
  L_$F.leisureFunctionId = 972;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 971;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 970;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 969;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isParens", 1, "isParens p = hasType p parens", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_hasType)(L_p, L_parens)});
  L_$F.leisureFunctionId = 973;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("makeParens", 3, "makeParens start end content =\r\n  and (isCons content) (isNil (tail content))\r\n    makeParens start end (head content)\r\n    or (isToken content) (isParens content)\r\n      content\r\n      parens start end content", lazy((function(){
  var L_$F = function(L_start, L_end, L_content) {
    return L_checkPartial(L_$F, arguments) || resolve(L_and)(function(){return resolve(L_isCons)(L_content);}, function(){return resolve(L_isNil)(function(){return resolve(L_tail)(L_content);});})(function(){return resolve(L_makeParens)(L_start, L_end, function(){return resolve(L_head)(L_content);});})(function(){return resolve(L_or)(function(){return resolve(L_isToken)(L_content);}, function(){return resolve(L_isParens)(L_content);})(L_content)(function(){return resolve(L_parens)(L_start, L_end, L_content);});});
  };
  L_$F.leisureFunctionId = 974;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parensFromToks", 3, "parensFromToks left right content = \\\\\r\n  start = tokenFilepos left\r\n  end = addFilepos (tokenFilepos right) (strLen (tokenString right))\r\n  .\r\n  parens start end content", lazy((function(){
  var L_$F = function(L_left, L_right, L_content) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_start, L_end;
  L_start = function(){return resolve(L_tokenFilepos)(L_left);};
  L_end = function(){return resolve(L_addFilepos)(function(){return resolve(L_tokenFilepos)(L_right);}, function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_right);});});};

  return resolve(L_parens)(L_start, L_end, L_content)})();
  };
  L_$F.leisureFunctionId = 975;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("stripParens", 1, "stripParens p = isParens p (stripParens (parensContent p)) p", lazy((function(){
  var L_$F = (function(L_p){return resolve(L_isParens)(L_p)(function(){return resolve(L_stripParens)(function(){return resolve(L_parensContent)(L_p);});})(L_p)});
  L_$F.leisureFunctionId = 976;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("withStripped", 2, "withStripped p cont = cont (stripParens p)", lazy((function(){
  var L_$F = function(L_p, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_cont)(function(){return resolve(L_stripParens)(L_p);});
  };
  L_$F.leisureFunctionId = 977;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseErr", 2, "parseErr msg1 msg2 = err (strCat (cons msg1 (cons msg2 nil)))", lazy((function(){
  var L_$F = function(L_msg1, L_msg2) {
    return L_checkPartial(L_$F, arguments) || resolve(L_err)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(L_msg1, function(){return resolve(L_cons)(L_msg2, L_nil);});});});
  };
  L_$F.leisureFunctionId = 978;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("lineStart", 0, "lineStart  = regexp '^\\\\r?\\\\n'", function(){return resolve(L_regexp)("^\\r?\\n");})},
    function(){return resolve(L_newDefine)("commentPat", 0, "commentPat = regexp '^\\\\r?\\\\n[ \\\\i]*#'", function(){return resolve(L_regexp)("^\\r?\\n[ \\i]*#");})},
    function(){return resolve(L_newDefine)("emptyToken", 0, "emptyToken = regexp '^\\\\r?\\\\n[ \\\\i]*(#|$)'", function(){return resolve(L_regexp)("^\\r?\\n[ \\i]*(#|$)");})},
    function(){return resolve(L_newDefine)("makeTokens", 3, "makeTokens lineStarts strings start = _withRecur\r\n  makeMoreTokens lineStarts strings start nil", lazy((function(){
  var L_$F = function(L_lineStarts, L_strings, L_start) {
    return L_checkPartial(L_$F, arguments) || resolve(L__withRecur)(function(){return resolve(L_makeMoreTokens)(L_lineStarts, L_strings, L_start, L_nil);});
  };
  L_$F.leisureFunctionId = 979;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("makeMoreTokens", 4, "makeMoreTokens lineStarts strings start result = strings\r\n  \\h t D . _recur\r\n    makeMoreTokens lineStarts t (+ start (strLen h))\r\n      or (or (strStartsWith h ' ') (strStartsWith h '#')) (and (strMatches h emptyToken) (or (isNil t) (strMatches (head t) lineStart)))\r\n        result\r\n        cons (makeTokenAt lineStarts h start) result\r\n  _reverse result", lazy((function(){
  var L_$F = function(L_lineStarts, L_strings, L_start, L_result) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_strings))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L__recur)(function(){return resolve(L_makeMoreTokens)(L_lineStarts, L_t, function(){return resolve(L_$o)(L_start, function(){return resolve(L_strLen)(L_h);});}, function(){return resolve(L_or)(function(){return resolve(L_or)(function(){return resolve(L_strStartsWith)(L_h, " ");}, function(){return resolve(L_strStartsWith)(L_h, "#");});}, function(){return resolve(L_and)(function(){return resolve(L_strMatches)(L_h, L_emptyToken);}, function(){return resolve(L_or)(function(){return resolve(L_isNil)(L_t);}, function(){return resolve(L_strMatches)(function(){return resolve(L_head)(L_t);}, L_lineStart);});});})(L_result)(function(){return resolve(L_cons)(function(){return resolve(L_makeTokenAt)(L_lineStarts, L_h, L_start);}, L_result);});});})});
  L_$F.leisureFunctionId = 982;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 981;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 980;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L__reverse)(L_result);});
  };
  L_$F.leisureFunctionId = 983;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("makeTokenAt", 3, "makeTokenAt lineStarts txt offset = isNil (strMatch txt zeroNum)\r\n  token txt (filePosFor lineStarts offset)\r\n  token (strReplace txt zeroPrefix '') (filePosFor lineStarts offset)", lazy((function(){
  var L_$F = function(L_lineStarts, L_txt, L_offset) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(function(){return resolve(L_strMatch)(L_txt, L_zeroNum);})(function(){return resolve(L_token)(L_txt, function(){return resolve(L_filePosFor)(L_lineStarts, L_offset);});})(function(){return resolve(L_token)(function(){return resolve(L_strReplace)(L_txt, L_zeroPrefix, "");}, function(){return resolve(L_filePosFor)(L_lineStarts, L_offset);});});
  };
  L_$F.leisureFunctionId = 984;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("showToken", 1, "showToken tok = log (strCat (cons 'token: ' (cons (tokenString tok) (cons ', ' (cons (showPos (tokenPos tok)) nil))))) tok", lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_log)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("token: ", function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(L_tok);}, function(){return resolve(L_cons)(", ", function(){return resolve(L_cons)(function(){return resolve(L_showPos)(function(){return resolve(L_tokenPos)(L_tok);});}, L_nil);});});});});}, L_tok)});
  L_$F.leisureFunctionId = 985;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("showPos", 1, "showPos pos = isFilepos pos\r\n  strCat (cons 'position: ' (cons (fileposFile pos) (cons ', ' (cons (fileposLine pos) (cons '.' (cons (fileposOffset pos) nil))))))\r\n  pos", lazy((function(){
  var L_$F = (function(L_pos){return resolve(L_isFilepos)(L_pos)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("position: ", function(){return resolve(L_cons)(function(){return resolve(L_fileposFile)(L_pos);}, function(){return resolve(L_cons)(", ", function(){return resolve(L_cons)(function(){return resolve(L_fileposLine)(L_pos);}, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_fileposOffset)(L_pos);}, L_nil);});});});});});});})(L_pos)});
  L_$F.leisureFunctionId = 986;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("splitTokens", 2, "splitTokens str pat = filter (\\s . not (eq s '')) (basicSplitTokens str pat true)", lazy((function(){
  var L_$F = function(L_str, L_pat) {
    return L_checkPartial(L_$F, arguments) || resolve(L_filter)(lazy((function(){
  var L_$F = (function(L_s){return resolve(L_not)(function(){return resolve(L_eq)(L_s, "");})});
  L_$F.leisureFunctionId = 987;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_basicSplitTokens)(L_str, L_pat, L_true);});
  };
  L_$F.leisureFunctionId = 988;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("numberPat", 0, "numberPat = regexp '-?([0-9]+(\\\\.[0-9]+)?|\\\\.[0-9]+)'", function(){return resolve(L_regexp)("-?([0-9]+(\\.[0-9]+)?|\\.[0-9]+)");})},
    function(){return resolve(L_newDefine)("zeroNum", 0, "zeroNum = regexp '^0+[0-9]'", function(){return resolve(L_regexp)("^0+[0-9]");})},
    function(){return resolve(L_newDefine)("zeroPrefix", 0, "zeroPrefix = regexp '^0+'", function(){return resolve(L_regexp)("^0+");})},
    function(){return resolve(L_newDefine)("matchOffset", 2, "matchOffset str match = isNil match\r\n  strLen str\r\n  head (tail (tail match))", lazy((function(){
  var L_$F = function(L_str, L_match) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_match)(function(){return resolve(L_strLen)(L_str);})(function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_match);});});});
  };
  L_$F.leisureFunctionId = 989;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("basicSplitTokens", 3, "basicSplitTokens str pat prevIsDel = _reverse\r\n  _withRecur (_basicSplitTokens str pat prevIsDel nil)", lazy((function(){
  var L_$F = function(L_str, L_pat, L_prevIsDel) {
    return L_checkPartial(L_$F, arguments) || resolve(L__reverse)(function(){return resolve(L__withRecur)(function(){return resolve(L__basicSplitTokens)(L_str, L_pat, L_prevIsDel, L_nil);});});
  };
  L_$F.leisureFunctionId = 990;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_basicSplitTokens", 4, "_basicSplitTokens str pat prevIsDel toks = == str ''\r\n  toks\r\n  \\\\\r\n    num = strMatch str numberPat\r\n    del = strMatch str pat\r\n    numOffset = matchOffset str num\r\n    delOffset = matchOffset str del\r\n    select = and (== numOffset 0) prevIsDel\r\n      \\del num first . num\r\n      == delOffset 0\r\n        \\del num first . del\r\n        \\del num first . first\r\n    first = select (head del) (head num) (strSubstring str 0 delOffset)\r\n    .\r\n    _recur\r\n      _basicSplitTokens\r\n        strSubstring str (strLen first) 0\r\n        pat\r\n        select true false false\r\n        cons first toks", lazy((function(){
  var L_$F = function(L_str, L_pat, L_prevIsDel, L_toks) {
    return L_checkPartial(L_$F, arguments) || resolve(L_$p$p)(L_str, "")(L_toks)(function(){return (function(){  var L_num, L_del, L_numOffset, L_delOffset, L_select, L_first;
  L_num = function(){return resolve(L_strMatch)(L_str, L_numberPat);};
  L_del = function(){return resolve(L_strMatch)(L_str, L_pat);};
  L_numOffset = function(){return resolve(L_matchOffset)(L_str, L_num);};
  L_delOffset = function(){return resolve(L_matchOffset)(L_str, L_del);};
  L_select = function(){return resolve(L_and)(function(){return resolve(L_$p$p)(L_numOffset, 0);}, L_prevIsDel)(lazy((function(){
  var L_$F = (function(L_del_0){return (function(){
  var L_$F = (function(L_num_1){return (function(){
  var L_$F = (function(L_first){return resolve(L_num_1)});
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
})()))(function(){return resolve(L_$p$p)(L_delOffset, 0)(lazy((function(){
  var L_$F = (function(L_del_0){return (function(){
  var L_$F = (function(L_num_1){return (function(){
  var L_$F = (function(L_first){return resolve(L_del_0)});
  L_$F.leisureFunctionId = 996;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 995;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 994;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(lazy((function(){
  var L_$F = (function(L_del_0){return (function(){
  var L_$F = (function(L_num_1){return (function(){
  var L_$F = (function(L_first){return resolve(L_first)});
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
})()));});};
  L_first = function(){return resolve(L_select)(function(){return resolve(L_head)(L_del);})(function(){return resolve(L_head)(L_num);})(function(){return resolve(L_strSubstring)(L_str, 0, L_delOffset);});};

  return resolve(L__recur)(function(){return resolve(L__basicSplitTokens)(function(){return resolve(L_strSubstring)(L_str, function(){return resolve(L_strLen)(L_first);}, 0);}, L_pat, function(){return resolve(L_select)(L_true)(L_false)(L_false);}, function(){return resolve(L_cons)(L_first, L_toks);});})})();});
  };
  L_$F.leisureFunctionId = 1000;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tokens", 2, "tokens str pat = countedTokens emptyLineStarts str pat", lazy((function(){
  var L_$F = function(L_str, L_pat) {
    return L_checkPartial(L_$F, arguments) || resolve(L_countedTokens)(L_emptyLineStarts, L_str, L_pat);
  };
  L_$F.leisureFunctionId = 1001;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedTokens", 3, "countedTokens lineStarts str pat = makeTokens lineStarts (splitTokens str pat) 0", lazy((function(){
  var L_$F = function(L_lineStarts, L_str, L_pat) {
    return L_checkPartial(L_$F, arguments) || resolve(L_makeTokens)(L_lineStarts, function(){return resolve(L_splitTokens)(L_str, L_pat);}, 0);
  };
  L_$F.leisureFunctionId = 1002;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isTokenString", 2, "isTokenString tok str = or\r\n  and (isToken tok) (eq (tokenString tok) str)\r\n  and (isString tok) (eq tok str)", lazy((function(){
  var L_$F = function(L_tok, L_str) {
    return L_checkPartial(L_$F, arguments) || resolve(L_or)(function(){return resolve(L_and)(function(){return resolve(L_isToken)(L_tok);}, function(){return resolve(L_eq)(function(){return resolve(L_tokenString)(L_tok);}, L_str);});}, function(){return resolve(L_and)(function(){return resolve(L_isString)(L_tok);}, function(){return resolve(L_eq)(L_tok, L_str);});});
  };
  L_$F.leisureFunctionId = 1003;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isTokenStart", 2, "isTokenStart tok str = or\r\n  and (isToken tok) (strStartsWith (tokenString tok) str)\r\n  and (isString tok) (strStartsWith tok str)", lazy((function(){
  var L_$F = function(L_tok, L_str) {
    return L_checkPartial(L_$F, arguments) || resolve(L_or)(function(){return resolve(L_and)(function(){return resolve(L_isToken)(L_tok);}, function(){return resolve(L_strStartsWith)(function(){return resolve(L_tokenString)(L_tok);}, L_str);});}, function(){return resolve(L_and)(function(){return resolve(L_isString)(L_tok);}, function(){return resolve(L_strStartsWith)(L_tok, L_str);});});
  };
  L_$F.leisureFunctionId = 1004;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strTokenString", 1, "strTokenString tok = withToken tok nil \\str pos . str", lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_withToken)(L_tok, L_nil, lazy((function(){
  var L_$F = (function(L_str){return (function(){
  var L_$F = (function(L_pos){return resolve(L_str)});
  L_$F.leisureFunctionId = 1007;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1006;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1005;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("withToken", 3, "withToken tok nonTokCase tokCase = isToken tok\r\n  tokCase (tokenString tok) (tokenPos tok)\r\n  isString tok\r\n    tokCase tok emptyFilePos\r\n    nonTokCase", lazy((function(){
  var L_$F = function(L_tok, L_nonTokCase, L_tokCase) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isToken)(L_tok)(function(){return L$(resolve(L_tokCase))(function(){return resolve(L_tokenString)(L_tok);}, function(){return resolve(L_tokenPos)(L_tok);});})(function(){return resolve(L_isString)(L_tok)(function(){return L$(resolve(L_tokCase))(L_tok, L_emptyFilePos);})(L_nonTokCase);});
  };
  L_$F.leisureFunctionId = 1008;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseToks", 2, "parseToks toks groups =\r\n  isNil toks nil\r\n    ifNotErr (parseTok toks groups) \\list . list \\h t .\r\n      ifNotErr (parseToks t groups) \\res .\r\n        cons h\r\n          and (isCons res) (isBlockStart (head res))\r\n            cons res nil\r\n            res", lazy((function(){
  var L_$F = function(L_toks, L_groups) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_toks)(L_nil)(function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseTok)(L_toks, L_groups);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_ifNotErr)(function(){return resolve(L_parseToks)(L_t, L_groups);}, lazy((function(){
  var L_$F = (function(L_res){return resolve(L_cons)(L_h, function(){return resolve(L_and)(function(){return resolve(L_isCons)(L_res);}, function(){return resolve(L_isBlockStart)(function(){return resolve(L_head)(L_res);});})(function(){return resolve(L_cons)(L_res, L_nil);})(L_res);})});
  L_$F.leisureFunctionId = 1012;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1011;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1010;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1009;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));});
  };
  L_$F.leisureFunctionId = 1013;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseTok", 2, "parseTok toks groups = withCons toks nil \\h t .\r\n  withToken h toks \\txt pos .\r\n    assoc txt groups\r\n      \\close . parseGroup h t nil close groups\r\n      (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (parseIndent h t nil groups)\r\n        toks", lazy((function(){
  var L_$F = function(L_toks, L_groups) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_toks, L_nil, lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_withToken)(L_h, L_toks, lazy((function(){
  var L_$F = (function(L_txt){return (function(){
  var L_$F = (function(L_pos){return resolve(L_assoc)(L_txt, L_groups)(lazy((function(){
  var L_$F = (function(L_close){return resolve(L_parseGroup)(L_h, L_t, L_nil, L_close, L_groups)});
  L_$F.leisureFunctionId = 1018;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_or)(function(){return resolve(L_isTokenStart)(L_h, "\n");}, function(){return resolve(L_isTokenStart)(L_h, "\r\n");})(function(){return resolve(L_parseIndent)(L_h, L_t, L_nil, L_groups);})(L_toks);})});
  L_$F.leisureFunctionId = 1017;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1016;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1015;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1014;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1019;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseGroup", 5, "parseGroup left toks gr close groups = withCons toks (parseErr 'Unterminated group starting ' (loc left))\r\n  \\h t . isTokenString h close\r\n    eq close ')'\r\n      cons (parensFromToks left h (_reverse gr)) t\r\n      cons (cons left (cons (_reverse gr) (cons h nil))) t\r\n    withToken h\r\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT .\r\n        parseGroup left restT (cons restH gr) close groups\r\n      \\txt pos .\r\n        rassoc txt groups\r\n          \\open . parseErr (strCat (cons 'Mismatched group: ' (cons (tokenString left) (cons txt (cons ' ' nil))))) (loc left)\r\n          ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseGroup left restT (cons restH gr) close groups", lazy((function(){
  var L_$F = function(L_left, L_toks, L_gr, L_close, L_groups) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_toks, function(){return resolve(L_parseErr)("Unterminated group starting ", function(){return resolve(L_loc)(L_left);});}, lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_isTokenString)(L_h, L_close)(function(){return resolve(L_eq)(L_close, ")")(function(){return resolve(L_cons)(function(){return resolve(L_parensFromToks)(L_left, L_h, function(){return resolve(L__reverse)(L_gr);});}, L_t);})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_left, function(){return resolve(L_cons)(function(){return resolve(L__reverse)(L_gr);}, function(){return resolve(L_cons)(L_h, L_nil);});});}, L_t);});})(function(){return resolve(L_withToken)(L_h, function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseTok)(L_toks, L_groups);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_restH){return (function(){
  var L_$F = (function(L_restT){return resolve(L_parseGroup)(L_left, L_restT, function(){return resolve(L_cons)(L_restH, L_gr);}, L_close, L_groups)});
  L_$F.leisureFunctionId = 1024;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1023;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1022;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, lazy((function(){
  var L_$F = (function(L_txt){return (function(){
  var L_$F = (function(L_pos){return resolve(L_rassoc)(L_txt, L_groups)(lazy((function(){
  var L_$F = (function(L_open){return resolve(L_parseErr)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("Mismatched group: ", function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(L_left);}, function(){return resolve(L_cons)(L_txt, function(){return resolve(L_cons)(" ", L_nil);});});});});}, function(){return resolve(L_loc)(L_left);})});
  L_$F.leisureFunctionId = 1027;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseTok)(L_toks, L_groups);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_restH){return (function(){
  var L_$F = (function(L_restT){return resolve(L_parseGroup)(L_left, L_restT, function(){return resolve(L_cons)(L_restH, L_gr);}, L_close, L_groups)});
  L_$F.leisureFunctionId = 1030;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1029;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1028;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1026;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1025;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1021;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1020;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1031;
  L_$F.leisureLength = 5;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseIndent", 4, "parseIndent indent toks gr groups =\r\n  withCons toks (cons (makeParens (tokenFilepos indent) (lexEnd (head gr)) (_reverse gr)) nil)\r\n    \\h t . or (withToken h false (\\txt pos . rassoc txt groups (\\open . true) false))\r\n      and (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (<= (strLen (tokenString h)) (strLen (tokenString indent)))\r\n      cons (makeParens (tokenFilepos indent) (tokenFilepos h) (_reverse gr)) toks\r\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseIndent indent restT (cons restH gr) groups", lazy((function(){
  var L_$F = function(L_indent, L_toks, L_gr, L_groups) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_toks, function(){return resolve(L_cons)(function(){return resolve(L_makeParens)(function(){return resolve(L_tokenFilepos)(L_indent);}, function(){return resolve(L_lexEnd)(function(){return resolve(L_head)(L_gr);});}, function(){return resolve(L__reverse)(L_gr);});}, L_nil);}, lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_or)(function(){return resolve(L_withToken)(L_h, L_false, lazy((function(){
  var L_$F = (function(L_txt){return (function(){
  var L_$F = (function(L_pos){return resolve(L_rassoc)(L_txt, L_groups)(lazy((function(){
  var L_$F = (function(L_open){return resolve(L_true)});
  L_$F.leisureFunctionId = 1036;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_false)});
  L_$F.leisureFunctionId = 1035;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1034;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, function(){return resolve(L_and)(function(){return resolve(L_or)(function(){return resolve(L_isTokenStart)(L_h, "\n");}, function(){return resolve(L_isTokenStart)(L_h, "\r\n");});}, function(){return resolve(L_$y$p)(function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_h);});}, function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_indent);});});});})(function(){return resolve(L_cons)(function(){return resolve(L_makeParens)(function(){return resolve(L_tokenFilepos)(L_indent);}, function(){return resolve(L_tokenFilepos)(L_h);}, function(){return resolve(L__reverse)(L_gr);});}, L_toks);})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseTok)(L_toks, L_groups);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_restH){return (function(){
  var L_$F = (function(L_restT){return resolve(L_parseIndent)(L_indent, L_restT, function(){return resolve(L_cons)(L_restH, L_gr);}, L_groups)});
  L_$F.leisureFunctionId = 1039;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1038;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1037;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1033;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1032;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1040;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("nilRange", L_true, "nilRange = cons 1 (cons 0 nil)", function(){return resolve(L_cons)(1, function(){return resolve(L_cons)(0, L_nil);});})},
    function(){return resolve(L_newDefine)("lit", 2, "lit value range = \\f . f value range", lazy(setDataType((function(){
  var L_$F = function(L_value, L_range) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_value)(L_range)});
  L_$F.leisureFunctionId = 1041;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'lit');
  };
  L_$F.leisureFunctionId = 1042;
  L_$F.leisureLength = 2;
  return L_$F;
})(), 'lit')))},
    function(){return resolve(L_newDefine)("ref", 2, "ref name range = \\f . f name range", lazy(setDataType((function(){
  var L_$F = function(L_name, L_range) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_name)(L_range)});
  L_$F.leisureFunctionId = 1043;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'ref');
  };
  L_$F.leisureFunctionId = 1044;
  L_$F.leisureLength = 2;
  return L_$F;
})(), 'ref')))},
    function(){return resolve(L_newDefine)("lambda", 3, "lambda name body range = \\f . f name body range", lazy(setDataType((function(){
  var L_$F = function(L_name, L_body, L_range) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_name)(L_body)(L_range)});
  L_$F.leisureFunctionId = 1045;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'lambda');
  };
  L_$F.leisureFunctionId = 1046;
  L_$F.leisureLength = 3;
  return L_$F;
})(), 'lambda')))},
    function(){return resolve(L_newDefine)("apply", 2, "apply func arg = \\f . f func arg", lazy(setDataType((function(){
  var L_$F = function(L_func, L_arg) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_func)(L_arg)});
  L_$F.leisureFunctionId = 1047;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'apply');
  };
  L_$F.leisureFunctionId = 1048;
  L_$F.leisureLength = 2;
  return L_$F;
})(), 'apply')))},
    function(){return resolve(L_newDefine)("let", 4, "let name value body range = \\f . f name value body range", lazy(setDataType((function(){
  var L_$F = function(L_name, L_value, L_body, L_range) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_name)(L_value)(L_body)(L_range)});
  L_$F.leisureFunctionId = 1049;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'let');
  };
  L_$F.leisureFunctionId = 1050;
  L_$F.leisureLength = 4;
  return L_$F;
})(), 'let')))},
    function(){return resolve(L_newDefine)("anno", 3, "anno name data body = \\f . f name data body", lazy(setDataType((function(){
  var L_$F = function(L_name, L_data, L_body) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_name)(L_data)(L_body)});
  L_$F.leisureFunctionId = 1051;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'anno');
  };
  L_$F.leisureFunctionId = 1052;
  L_$F.leisureLength = 3;
  return L_$F;
})(), 'anno')))},
    function(){return resolve(L_newDefine)("withParens", 3, "withParens p err cont = isParens p (p cont) err", lazy((function(){
  var L_$F = function(L_p, L_err, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isParens)(L_p)(function(){return resolve(L_p)(L_cont);})(L_err);
  };
  L_$F.leisureFunctionId = 1053;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("setParens", 2, "setParens p func = isParens p\r\n  p \\start end content . parens start end (func content)\r\n  func p", lazy((function(){
  var L_$F = function(L_p, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isParens)(L_p)(function(){return resolve(L_p)(lazy((function(){
  var L_$F = (function(L_start){return (function(){
  var L_$F = (function(L_end){return (function(){
  var L_$F = (function(L_content){return resolve(L_parens)(L_start, L_end, function(){return resolve(L_func)(L_content);})});
  L_$F.leisureFunctionId = 1056;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1055;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1054;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_func)(L_p);});
  };
  L_$F.leisureFunctionId = 1057;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("position", 1, "position thing = isToken thing (tokenFilepos thing)\r\n  isParens thing (parensStart thing)\r\n    isCons thing\r\n      \\\\\r\n        pos = position (head thing)\r\n        .\r\n        isEmptyPos pos (position (tail thing)) pos\r\n      isFilepos thing thing\r\n        emptyFilePos", lazy((function(){
  var L_$F = (function(L_thing){return resolve(L_isToken)(L_thing)(function(){return resolve(L_tokenFilepos)(L_thing);})(function(){return resolve(L_isParens)(L_thing)(function(){return resolve(L_parensStart)(L_thing);})(function(){return resolve(L_isCons)(L_thing)(function(){return (function(){  var L_pos;
  L_pos = function(){return resolve(L_position)(function(){return resolve(L_head)(L_thing);});};

  return resolve(L_isEmptyPos)(L_pos)(function(){return resolve(L_position)(function(){return resolve(L_tail)(L_thing);});})(L_pos)})();})(function(){return resolve(L_isFilepos)(L_thing)(L_thing)(L_emptyFilePos);});});})});
  L_$F.leisureFunctionId = 1058;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("lexEnd", 1, "lexEnd thing = isToken thing (addFilepos (tokenFilepos thing) (strLen (tokenString thing)))\r\n  isParens thing (parensEnd thing)\r\n    isCons thing (lexEnd (last thing))\r\n      emptyFilePos", lazy((function(){
  var L_$F = (function(L_thing){return resolve(L_isToken)(L_thing)(function(){return resolve(L_addFilepos)(function(){return resolve(L_tokenFilepos)(L_thing);}, function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_thing);});});})(function(){return resolve(L_isParens)(L_thing)(function(){return resolve(L_parensEnd)(L_thing);})(function(){return resolve(L_isCons)(L_thing)(function(){return resolve(L_lexEnd)(function(){return resolve(L_last)(L_thing);});})(L_emptyFilePos);});})});
  L_$F.leisureFunctionId = 1059;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("loc", 1, "loc thing = \\\\\r\n  p = position thing\r\n  l = isEmptyPos p 'an unknown location' (showPos p)\r\n  .\r\n  strCat (cons 'at ' (cons l nil))", lazy((function(){
  var L_$F = (function(L_thing){return (function(){  var L_p, L_l;
  L_p = function(){return resolve(L_position)(L_thing);};
  L_l = function(){return resolve(L_isEmptyPos)(L_p)("an unknown location")(function(){return resolve(L_showPos)(L_p);});};

  return resolve(L_strCat)(function(){return resolve(L_cons)("at ", function(){return resolve(L_cons)(L_l, L_nil);});})})()});
  L_$F.leisureFunctionId = 1060;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("scrub", 1, "scrub str = strFromList (scrubList (strToList str))", lazy((function(){
  var L_$F = (function(L_str){return resolve(L_strFromList)(function(){return resolve(L_scrubList)(function(){return resolve(L_strToList)(L_str);});})});
  L_$F.leisureFunctionId = 1061;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("scrubList", 1, "scrubList list = list\r\n  \\h t D . \\\\\r\n    next = scrubList t\r\n    .\r\n    eq h '\\\\' (cons h (cons (head t) (scrubList (tail t))))\r\n      eq h '\\\"' (cons '\\\\' (cons '\\\"' next))\r\n        cons h next\r\n  nil", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return (function(){  var L_next;
  L_next = function(){return resolve(L_scrubList)(L_t);};

  return resolve(L_eq)(L_h, "\\")(function(){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(function(){return resolve(L_head)(L_t);}, function(){return resolve(L_scrubList)(function(){return resolve(L_tail)(L_t);});});});})(function(){return resolve(L_eq)(L_h, "\"")(function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)("\"", L_next);});})(function(){return resolve(L_cons)(L_h, L_next);});})})()});
  L_$F.leisureFunctionId = 1065;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1064;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1063;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)});
  L_$F.leisureFunctionId = 1062;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("createAst", 3, "createAst lineStarts inList names = withStripped inList \\list .\r\n  isToken list (createLitOrRef list names)\r\n    list\r\n      \\h t D .\r\n        isTokenString h '\\\\\\\\' (createLet h t names)\r\n          isTokenString h '\\\\@' (createAnno h t names)\r\n            isTokenString h '\\\\' (createLambda h t names)\r\n              createApply list names\r\n      nil", lazy((function(){
  var L_$F = function(L_lineStarts, L_inList, L_names) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withStripped)(L_inList, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_isToken)(L_list)(function(){return resolve(L_createLitOrRef)(L_list, L_names);})(function(){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isTokenString)(L_h, "\\\\")(function(){return resolve(L_createLet)(L_h, L_t, L_names);})(function(){return resolve(L_isTokenString)(L_h, "\\@")(function(){return resolve(L_createAnno)(L_h, L_t, L_names);})(function(){return resolve(L_isTokenString)(L_h, "\\")(function(){return resolve(L_createLambda)(L_h, L_t, L_names);})(function(){return resolve(L_createApply)(L_list, L_names);});});})});
  L_$F.leisureFunctionId = 1069;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1068;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1067;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);})});
  L_$F.leisureFunctionId = 1066;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1070;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("strMatches", 2, "strMatches str pat = isCons (strMatch str pat)", lazy((function(){
  var L_$F = function(L_str, L_pat) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isCons)(function(){return resolve(L_strMatch)(L_str, L_pat);});
  };
  L_$F.leisureFunctionId = 1071;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("digit", L_true, "digit = regexp '^[0-9]+$'", function(){return resolve(L_regexp)("^[0-9]+$");})},
    function(){return resolve(L_newDefine)("backslashCodes", L_true, "backslashCodes = 'bfnrt'", "bfnrt")},
    function(){return resolve(L_newDefine)("backslashValues", L_true, "backslashValues = '\\b\\f\\n\\r\\t'", "\b\f\n\r\t")},
    function(){return resolve(L_newDefine)("convertStringEscape", 3, "convertStringEscape char codes values =\r\n  eq codes ''\r\n    char\r\n    eq char (strAt codes 0)\r\n      strAt values 0\r\n      convertStringEscape char (strSubstring codes 1 0) (strSubstring values 1 0)", lazy((function(){
  var L_$F = function(L_char, L_codes, L_values) {
    return L_checkPartial(L_$F, arguments) || resolve(L_eq)(L_codes, "")(L_char)(function(){return resolve(L_eq)(L_char, function(){return resolve(L_strAt)(L_codes, 0);})(function(){return resolve(L_strAt)(L_values, 0);})(function(){return resolve(L_convertStringEscape)(L_char, function(){return resolve(L_strSubstring)(L_codes, 1, 0);}, function(){return resolve(L_strSubstring)(L_values, 1, 0);});});});
  };
  L_$F.leisureFunctionId = 1072;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("convertStringEscapes", 3, "convertStringEscapes orig str cont = \\\\\r\n  res = _convertStringEscapes orig str\r\n  .\r\n  hasType res err\r\n    res\r\n    cont res", lazy((function(){
  var L_$F = function(L_orig, L_str, L_cont) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_res;
  L_res = function(){return resolve(L__convertStringEscapes)(L_orig, L_str);};

  return resolve(L_hasType)(L_res, L_err)(L_res)(function(){return resolve(L_cont)(L_res);})})();
  };
  L_$F.leisureFunctionId = 1073;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_convertStringEscapes", 2, "_convertStringEscapes orig str =\r\n  eq str '' str\r\n    eq (strAt str 0) '\\\\'\r\n      eq (strLen str) 1 (parseErr \"Error, backslash without character in string: \" orig)\r\n        \\\\\r\n          rest = _convertStringEscapes orig (strSubstring str 2 0)\r\n          .\r\n          hasType rest err\r\n            rest\r\n            strAdd\r\n              convertStringEscape (strAt str 1) backslashCodes backslashValues\r\n              rest\r\n      \\\\\r\n        rest = _convertStringEscapes orig (strSubstring str 1 0)\r\n        .\r\n        hasType rest err\r\n          rest\r\n          strAdd\r\n            strAt str 0\r\n            rest", lazy((function(){
  var L_$F = function(L_orig, L_str) {
    return L_checkPartial(L_$F, arguments) || resolve(L_eq)(L_str, "")(L_str)(function(){return resolve(L_eq)(function(){return resolve(L_strAt)(L_str, 0);}, "\\")(function(){return resolve(L_eq)(function(){return resolve(L_strLen)(L_str);}, 1)(function(){return resolve(L_parseErr)("Error, backslash without character in string: ", L_orig);})(function(){return (function(){  var L_rest;
  L_rest = function(){return resolve(L__convertStringEscapes)(L_orig, function(){return resolve(L_strSubstring)(L_str, 2, 0);});};

  return resolve(L_hasType)(L_rest, L_err)(L_rest)(function(){return resolve(L_strAdd)(function(){return resolve(L_convertStringEscape)(function(){return resolve(L_strAt)(L_str, 1);}, L_backslashCodes, L_backslashValues);}, L_rest);})})();});})(function(){return (function(){  var L_rest;
  L_rest = function(){return resolve(L__convertStringEscapes)(L_orig, function(){return resolve(L_strSubstring)(L_str, 1, 0);});};

  return resolve(L_hasType)(L_rest, L_err)(L_rest)(function(){return resolve(L_strAdd)(function(){return resolve(L_strAt)(L_str, 0);}, L_rest);})})();});});
  };
  L_$F.leisureFunctionId = 1074;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseString", 2, "parseString str cont =\r\n  neq (strAt str 0) (strAt str -1) (parseErr \"Badly terminated string: \" str)\r\n    convertStringEscapes str (strSubstring str 1 -1) cont", lazy((function(){
  var L_$F = function(L_str, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_neq)(function(){return resolve(L_strAt)(L_str, 0);}, function(){return resolve(L_strAt)(L_str, -1);})(function(){return resolve(L_parseErr)("Badly terminated string: ", L_str);})(function(){return resolve(L_convertStringEscapes)(L_str, function(){return resolve(L_strSubstring)(L_str, 1, -1);}, L_cont);});
  };
  L_$F.leisureFunctionId = 1075;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("createLitOrRef", 2, "createLitOrRef token names = \\\\\r\n  tok = tokenString token\r\n  tokRange = (fileposList (position token))\r\n  .\r\n  _contains names tok\r\n    ref tok tokRange\r\n    or (strStartsWith tok '\\\"') (strStartsWith tok \"'\")\r\n      parseString tok \\str . lit str tokRange\r\n      strStartsWith tok '.'\r\n        jsonParse (strCat (cons '0' (cons tok nil))) (\\err . ref tok tokRange) (\\item . lit item tokRange)\r\n        or (and (>= (strAt tok 0) '0') (<= (strAt tok 0) '9')) (strStartsWith tok '-')\r\n          jsonParse tok (\\err . ref tok tokRange) (\\item . lit item tokRange)\r\n          ref tok tokRange", lazy((function(){
  var L_$F = function(L_token, L_names) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_tok, L_tokRange;
  L_tok = function(){return resolve(L_tokenString)(L_token);};
  L_tokRange = function(){return resolve(L_fileposList)(function(){return resolve(L_position)(L_token);});};

  return resolve(L__contains)(L_names, L_tok)(function(){return resolve(L_ref)(L_tok, L_tokRange);})(function(){return resolve(L_or)(function(){return resolve(L_strStartsWith)(L_tok, "\"");}, function(){return resolve(L_strStartsWith)(L_tok, "'");})(function(){return resolve(L_parseString)(L_tok, lazy((function(){
  var L_$F = (function(L_str){return resolve(L_lit)(L_str, L_tokRange)});
  L_$F.leisureFunctionId = 1076;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_strStartsWith)(L_tok, ".")(function(){return resolve(L_jsonParse)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("0", function(){return resolve(L_cons)(L_tok, L_nil);});});}, lazy((function(){
  var L_$F = (function(L_err){return resolve(L_ref)(L_tok, L_tokRange)});
  L_$F.leisureFunctionId = 1077;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), lazy((function(){
  var L_$F = (function(L_item){return resolve(L_lit)(L_item, L_tokRange)});
  L_$F.leisureFunctionId = 1078;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_or)(function(){return resolve(L_and)(function(){return resolve(L_$z$p)(function(){return resolve(L_strAt)(L_tok, 0);}, "0");}, function(){return resolve(L_$y$p)(function(){return resolve(L_strAt)(L_tok, 0);}, "9");});}, function(){return resolve(L_strStartsWith)(L_tok, "-");})(function(){return resolve(L_jsonParse)(L_tok, lazy((function(){
  var L_$F = (function(L_err){return resolve(L_ref)(L_tok, L_tokRange)});
  L_$F.leisureFunctionId = 1079;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), lazy((function(){
  var L_$F = (function(L_item){return resolve(L_lit)(L_item, L_tokRange)});
  L_$F.leisureFunctionId = 1080;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_ref)(L_tok, L_tokRange);});});});})})();
  };
  L_$F.leisureFunctionId = 1081;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("createLambda", 3, "createLambda start list names = \\\\\r\n  err = parseErr \"Lambda needs a variable name, a dot, and a body \" (loc start)\r\n  .\r\n  withCons list err \\name rest .\r\n    withToken name err \\n p .\r\n      withCons rest err \\dot body .\r\n        # are these partial applications too hard to read?\r\n        isTokenString dot '.'\r\n          ifNotErr (createAst nil body (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))\r\n          ifNotErr (createLambda start rest (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))", lazy((function(){
  var L_$F = function(L_start, L_list, L_names) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_err;
  L_err = function(){return resolve(L_parseErr)("Lambda needs a variable name, a dot, and a body ", function(){return resolve(L_loc)(L_start);});};

  return resolve(L_withCons)(L_list, L_err, lazy((function(){
  var L_$F = (function(L_name){return (function(){
  var L_$F = (function(L_rest){return resolve(L_withToken)(L_name, L_err, lazy((function(){
  var L_$F = (function(L_n){return (function(){
  var L_$F = (function(L_p){return resolve(L_withCons)(L_rest, L_err, lazy((function(){
  var L_$F = (function(L_dot){return (function(){
  var L_$F = (function(L_body){return resolve(L_isTokenString)(L_dot, ".")(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_body, function(){return resolve(L_cons)(L_n, L_names);});}, lazy((function(){
  var L_$F = (function(L_bodyAst){return resolve(L_lambda)(L_n, L_bodyAst, function(){return resolve(L_fileposList)(function(){return resolve(L_position)(L_name);});})});
  L_$F.leisureFunctionId = 1088;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createLambda)(L_start, L_rest, function(){return resolve(L_cons)(L_n, L_names);});}, lazy((function(){
  var L_$F = (function(L_bodyAst){return resolve(L_lambda)(L_n, L_bodyAst, function(){return resolve(L_fileposList)(function(){return resolve(L_position)(L_name);});})});
  L_$F.leisureFunctionId = 1089;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1087;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1086;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1085;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1084;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1083;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1082;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))})();
  };
  L_$F.leisureFunctionId = 1090;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("createAnno", 3, "createAnno start list names =\r\n  withCons list (parseErr \"No annotation name or data in annotation \" (loc start)) \\name rest .\r\n    withCons rest (parseErr \"No data for annotation \" (loc start)) \\data rest . \\\\\r\n      finish data body = ifNotErr (createAst nil body names) \\bodyAst .\r\n        cleanTokens start name \\name .\r\n          cleanTokens start data \\data .\r\n            anno name data bodyAst\r\n      .\r\n      isTokenString data '.'\r\n        finish nil rest\r\n        withStripped data \\data .\r\n          withCons rest (parseErr \"No body for annotation \" (loc start)) \\dot body .\r\n            isTokenString dot '.'\r\n              finish data body\r\n              parseErr \"Annotation expects dot after name and data \" (loc start)", lazy((function(){
  var L_$F = function(L_start, L_list, L_names) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_list, function(){return resolve(L_parseErr)("No annotation name or data in annotation ", function(){return resolve(L_loc)(L_start);});}, lazy((function(){
  var L_$F = (function(L_name){return (function(){
  var L_$F = (function(L_rest){return resolve(L_withCons)(L_rest, function(){return resolve(L_parseErr)("No data for annotation ", function(){return resolve(L_loc)(L_start);});}, lazy((function(){
  var L_$F = (function(L_data){return (function(){
  var L_$F = (function(L_rest_0){return (function(){  var L_finish;
  L_finish = function(){return (function(){
  var L_$F = (function(L_data_1){return (function(){
  var L_$F = (function(L_body){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_body, L_names);}, lazy((function(){
  var L_$F = (function(L_bodyAst){return resolve(L_cleanTokens)(L_start, L_name, lazy((function(){
  var L_$F = (function(L_name_2){return resolve(L_cleanTokens)(L_start, L_data_1, lazy((function(){
  var L_$F = (function(L_data_3){return resolve(L_anno)(L_name_2, L_data_3, L_bodyAst)});
  L_$F.leisureFunctionId = 1099;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1098;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1097;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1096;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1095;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})();};

  return resolve(L_isTokenString)(L_data, ".")(function(){return resolve(L_finish)(L_nil)(L_rest_0);})(function(){return resolve(L_withStripped)(L_data, lazy((function(){
  var L_$F = (function(L_data_1){return resolve(L_withCons)(L_rest_0, function(){return resolve(L_parseErr)("No body for annotation ", function(){return resolve(L_loc)(L_start);});}, lazy((function(){
  var L_$F = (function(L_dot){return (function(){
  var L_$F = (function(L_body){return resolve(L_isTokenString)(L_dot, ".")(function(){return resolve(L_finish)(L_data_1)(L_body);})(function(){return resolve(L_parseErr)("Annotation expects dot after name and data ", function(){return resolve(L_loc)(L_start);});})});
  L_$F.leisureFunctionId = 1102;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1101;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1100;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})})()});
  L_$F.leisureFunctionId = 1094;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1093;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1092;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1091;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1103;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("bodyStructPat", L_true, "bodyStructPat = regexp '\\\\|\\\\\\\\|\\\\@'", function(){return resolve(L_regexp)("\\|\\\\|\\@");})},
    function(){return resolve(L_newDefine)("createApply", 2, "createApply inList names = withStripped inList \\list .\r\n  withCons list (parseErr \"Funcion apply expecting a non-empty list \" (loc inList)) \\h t .\r\n    ifNotErr (createAst nil h names) \\func . chainApply func t names", lazy((function(){
  var L_$F = function(L_inList, L_names) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withStripped)(L_inList, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_withCons)(L_list, function(){return resolve(L_parseErr)("Funcion apply expecting a non-empty list ", function(){return resolve(L_loc)(L_inList);});}, lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_h, L_names);}, lazy((function(){
  var L_$F = (function(L_func){return resolve(L_chainApply)(L_func, L_t, L_names)});
  L_$F.leisureFunctionId = 1107;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1106;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1105;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1104;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1108;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("blockStarts", L_true, "blockStarts = cons '\\\\' (cons '\\\\\\\\' (cons '\\\\@' nil))", function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)("\\\\", function(){return resolve(L_cons)("\\@", L_nil);});});})},
    function(){return resolve(L_newDefine)("chainApply", 3, "chainApply func list names = withCons list func \\argItem rest .\r\n  and (isToken argItem) (_contains blockStarts (tokenString argItem))\r\n    ifNotErr (createAst nil list names) \\arg . apply func arg\r\n    ifNotErr (createAst nil argItem names) \\arg . chainApply (apply func arg) rest names", lazy((function(){
  var L_$F = function(L_func, L_list, L_names) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_list, L_func, lazy((function(){
  var L_$F = (function(L_argItem){return (function(){
  var L_$F = (function(L_rest){return resolve(L_and)(function(){return resolve(L_isToken)(L_argItem);}, function(){return resolve(L__contains)(L_blockStarts, function(){return resolve(L_tokenString)(L_argItem);});})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_list, L_names);}, lazy((function(){
  var L_$F = (function(L_arg){return resolve(L_apply)(L_func, L_arg)});
  L_$F.leisureFunctionId = 1111;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_argItem, L_names);}, lazy((function(){
  var L_$F = (function(L_arg){return resolve(L_chainApply)(function(){return resolve(L_apply)(L_func, L_arg);}, L_rest, L_names)});
  L_$F.leisureFunctionId = 1112;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1110;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1109;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1113;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("cleanTokens", 3, "cleanTokens start toks cont = isToken toks\r\n  cont (tokenString toks)\r\n  withCons toks (cont toks) \\head tail .\r\n    cleanTokens start head \\head .\r\n      cleanTokens start tail \\tail .\r\n        cont (cons head tail)", lazy((function(){
  var L_$F = function(L_start, L_toks, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isToken)(L_toks)(function(){return resolve(L_cont)(function(){return resolve(L_tokenString)(L_toks);});})(function(){return resolve(L_withCons)(L_toks, function(){return resolve(L_cont)(L_toks);}, lazy((function(){
  var L_$F = (function(L_head){return (function(){
  var L_$F = (function(L_tail){return resolve(L_cleanTokens)(L_start, L_head, lazy((function(){
  var L_$F = (function(L_head_0){return resolve(L_cleanTokens)(L_start, L_tail, lazy((function(){
  var L_$F = (function(L_tail_1){return resolve(L_cont)(function(){return resolve(L_cons)(L_head_0, L_tail_1);})});
  L_$F.leisureFunctionId = 1117;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1116;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1115;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1114;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));});
  };
  L_$F.leisureFunctionId = 1118;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("createLet", 3, "createLet start list names = withCons list\r\n  parseErr \"No variable or body for let \" (loc start)\r\n  \\binding body . eq body nil (createAst nil binding names)\r\n    ifNotErr (getLetNames start list names) \\newNames .\r\n      createSublets start binding body newNames", lazy((function(){
  var L_$F = function(L_start, L_list, L_names) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_list, function(){return resolve(L_parseErr)("No variable or body for let ", function(){return resolve(L_loc)(L_start);});}, lazy((function(){
  var L_$F = (function(L_binding){return (function(){
  var L_$F = (function(L_body){return resolve(L_eq)(L_body, L_nil)(function(){return resolve(L_createAst)(L_nil, L_binding, L_names);})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_getLetNames)(L_start, L_list, L_names);}, lazy((function(){
  var L_$F = (function(L_newNames){return resolve(L_createSublets)(L_start, L_binding, L_body, L_newNames)});
  L_$F.leisureFunctionId = 1121;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1120;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1119;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1122;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLetNames", 3, "getLetNames start list names = \\\\\r\n  err = parseErr \"Let expected binding \" (loc start)\r\n  .\r\n  withCons list names \\binding body .\r\n    isTokenString binding '.' names\r\n      withParens binding err \\start end def .\r\n        withCons def err \\name rest .\r\n          withToken name err \\str pos .\r\n            getLetNames start body (cons str names)", lazy((function(){
  var L_$F = function(L_start, L_list, L_names) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_err;
  L_err = function(){return resolve(L_parseErr)("Let expected binding ", function(){return resolve(L_loc)(L_start);});};

  return resolve(L_withCons)(L_list, L_names, lazy((function(){
  var L_$F = (function(L_binding){return (function(){
  var L_$F = (function(L_body){return resolve(L_isTokenString)(L_binding, ".")(L_names)(function(){return resolve(L_withParens)(L_binding, L_err, lazy((function(){
  var L_$F = (function(L_start){return (function(){
  var L_$F = (function(L_end){return (function(){
  var L_$F = (function(L_def){return resolve(L_withCons)(L_def, L_err, lazy((function(){
  var L_$F = (function(L_name){return (function(){
  var L_$F = (function(L_rest){return resolve(L_withToken)(L_name, L_err, lazy((function(){
  var L_$F = (function(L_str){return (function(){
  var L_$F = (function(L_pos){return resolve(L_getLetNames)(L_start, L_body, function(){return resolve(L_cons)(L_str, L_names);})});
  L_$F.leisureFunctionId = 1131;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1130;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1129;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1128;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1127;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1126;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1125;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1124;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1123;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))})();
  };
  L_$F.leisureFunctionId = 1132;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("createSublets", 4, "createSublets start binding body names =\r\n  isTokenString binding '.' (createAst nil body names)\r\n    withCons body (parseErr \"Let expected a body \" (loc start)) \\bodyH bodyT .\r\n      ifNotErr (getNameAndDef (parensStart binding) (parensContent binding) names) \\res . res \\name def .\r\n        ifNotErr (createSublets start bodyH bodyT names) \\bodyAst .\r\n          let (tokenString name) def bodyAst nilRange", lazy((function(){
  var L_$F = function(L_start, L_binding, L_body, L_names) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isTokenString)(L_binding, ".")(function(){return resolve(L_createAst)(L_nil, L_body, L_names);})(function(){return resolve(L_withCons)(L_body, function(){return resolve(L_parseErr)("Let expected a body ", function(){return resolve(L_loc)(L_start);});}, lazy((function(){
  var L_$F = (function(L_bodyH){return (function(){
  var L_$F = (function(L_bodyT){return resolve(L_ifNotErr)(function(){return resolve(L_getNameAndDef)(function(){return resolve(L_parensStart)(L_binding);}, function(){return resolve(L_parensContent)(L_binding);}, L_names);}, lazy((function(){
  var L_$F = (function(L_res){return resolve(L_res)(lazy((function(){
  var L_$F = (function(L_name){return (function(){
  var L_$F = (function(L_def){return resolve(L_ifNotErr)(function(){return resolve(L_createSublets)(L_start, L_bodyH, L_bodyT, L_names);}, lazy((function(){
  var L_$F = (function(L_bodyAst){return resolve(L_let)(function(){return resolve(L_tokenString)(L_name);}, L_def, L_bodyAst, L_nilRange)});
  L_$F.leisureFunctionId = 1138;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1137;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1136;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1135;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1134;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1133;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));});
  };
  L_$F.leisureFunctionId = 1139;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getNameAndDef", 3, "getNameAndDef pos binding names =\r\n  withCons (tail binding) (parseErr \"Let expected binding at \" pos) \\snd sndT .\r\n    isTokenString snd '=' (ifNotErr (createAst nil sndT names) \\def . cons (head binding) def)\r\n      ifNotErr (getLetLambda pos (tail binding) nil names) \\lamb . cons (head binding) lamb", lazy((function(){
  var L_$F = function(L_pos, L_binding, L_names) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(function(){return resolve(L_tail)(L_binding);}, function(){return resolve(L_parseErr)("Let expected binding at ", L_pos);}, lazy((function(){
  var L_$F = (function(L_snd){return (function(){
  var L_$F = (function(L_sndT){return resolve(L_isTokenString)(L_snd, "=")(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_sndT, L_names);}, lazy((function(){
  var L_$F = (function(L_def){return resolve(L_cons)(function(){return resolve(L_head)(L_binding);}, L_def)});
  L_$F.leisureFunctionId = 1142;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_getLetLambda)(L_pos, function(){return resolve(L_tail)(L_binding);}, L_nil, L_names);}, lazy((function(){
  var L_$F = (function(L_lamb){return resolve(L_cons)(function(){return resolve(L_head)(L_binding);}, L_lamb)});
  L_$F.leisureFunctionId = 1143;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1141;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1140;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1144;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getLetLambda", 4, "getLetLambda pos def args names =\r\n  withCons def (parseErr \"Let expected binding at \" pos) \\arg rest .\r\n    not (isToken arg) (parseErr \"Let expected binding at \" pos)\r\n      isTokenString arg '='\r\n        createAst nil (cons (token '\\\\' pos) (_append (_reverse args) (cons (token '.' (position arg)) rest))) names\r\n        getLetLambda pos rest (cons arg args) names", lazy((function(){
  var L_$F = function(L_pos, L_def, L_args, L_names) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_def, function(){return resolve(L_parseErr)("Let expected binding at ", L_pos);}, lazy((function(){
  var L_$F = (function(L_arg){return (function(){
  var L_$F = (function(L_rest){return resolve(L_not)(function(){return resolve(L_isToken)(L_arg);})(function(){return resolve(L_parseErr)("Let expected binding at ", L_pos);})(function(){return resolve(L_isTokenString)(L_arg, "=")(function(){return resolve(L_createAst)(L_nil, function(){return resolve(L_cons)(function(){return resolve(L_token)("\\", L_pos);}, function(){return resolve(L__append)(function(){return resolve(L__reverse)(L_args);}, function(){return resolve(L_cons)(function(){return resolve(L_token)(".", function(){return resolve(L_position)(L_arg);});}, L_rest);});});}, L_names);})(function(){return resolve(L_getLetLambda)(L_pos, L_rest, function(){return resolve(L_cons)(L_arg, L_args);}, L_names);});})});
  L_$F.leisureFunctionId = 1146;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1145;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1147;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedScanLineG", 7, "countedScanLineG lineStarts str pat groups props onDef onExpr = \\\\\r\n  toks = countedTokens lineStarts str pat\r\n  groupToks = _foldr (\\el value . el \\h t . cons h (cons t value)) (cons '=' blockStarts) groups\r\n  .\r\n  # check if it's a definition\r\n  find (\\tok . or (_contains groupToks (tokenString tok)) (isCons (strMatch (tokenString tok) '^\\r?\\n'))) toks (\\item . isTokenString item '=') false\r\n    toks \\name rest . \\\\\r\n      parseIt func = \\\\\r\n        parsed = parseToks (checkSetDataType func rest name) groups\r\n        .\r\n        onDef (ifNotErr parsed \\list . createDef list name (arity rest 0) str props)\r\n      .\r\n      isTokenString (head rest) '='\r\n        isTokenString (head (tail rest)) '\\\\'\r\n          parseIt (setTypeAnno (tail rest) (tokenString name))\r\n          parseIt (tail rest)\r\n        ifNotErr (transformDef name rest) \\def .\r\n          parseIt (cons (token '\\\\' (addFilepos (position (head rest)) -1)) def)\r\n    ifNotErr (parseToks toks groups) \\list . onExpr list", lazy((function(){
  var L_$F = function(L_lineStarts, L_str, L_pat, L_groups, L_props, L_onDef, L_onExpr) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_toks, L_groupToks;
  L_toks = function(){return resolve(L_countedTokens)(L_lineStarts, L_str, L_pat);};
  L_groupToks = function(){return resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_value){return resolve(L_el)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(L_t, L_value);})});
  L_$F.leisureFunctionId = 1151;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1150;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1149;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1148;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_cons)("=", L_blockStarts);}, L_groups);};

  return resolve(L_find)(lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_or)(function(){return resolve(L__contains)(L_groupToks, function(){return resolve(L_tokenString)(L_tok);});}, function(){return resolve(L_isCons)(function(){return resolve(L_strMatch)(function(){return resolve(L_tokenString)(L_tok);}, "^\r?\n");});})});
  L_$F.leisureFunctionId = 1152;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_toks)(lazy((function(){
  var L_$F = (function(L_item){return resolve(L_isTokenString)(L_item, "=")});
  L_$F.leisureFunctionId = 1153;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_false)(function(){return resolve(L_toks)(lazy((function(){
  var L_$F = (function(L_name){return (function(){
  var L_$F = (function(L_rest){return (function(){  var L_parseIt;
  L_parseIt = function(){return (function(){
  var L_$F = (function(L_func){return (function(){  var L_parsed;
  L_parsed = function(){return resolve(L_parseToks)(function(){return resolve(L_checkSetDataType)(L_func, L_rest, L_name);}, L_groups);};

  return resolve(L_onDef)(function(){return resolve(L_ifNotErr)(L_parsed, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_createDef)(L_list, L_name, function(){return resolve(L_arity)(L_rest, 0);}, L_str, L_props)});
  L_$F.leisureFunctionId = 1157;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})})()});
  L_$F.leisureFunctionId = 1156;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})();};

  return resolve(L_isTokenString)(function(){return resolve(L_head)(L_rest);}, "=")(function(){return resolve(L_isTokenString)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_rest);});}, "\\")(function(){return resolve(L_parseIt)(function(){return resolve(L_setTypeAnno)(function(){return resolve(L_tail)(L_rest);}, function(){return resolve(L_tokenString)(L_name);});});})(function(){return resolve(L_parseIt)(function(){return resolve(L_tail)(L_rest);});});})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_transformDef)(L_name, L_rest);}, lazy((function(){
  var L_$F = (function(L_def){return resolve(L_parseIt)(function(){return resolve(L_cons)(function(){return resolve(L_token)("\\", function(){return resolve(L_addFilepos)(function(){return resolve(L_position)(function(){return resolve(L_head)(L_rest);});}, -1);});}, L_def);})});
  L_$F.leisureFunctionId = 1158;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})})()});
  L_$F.leisureFunctionId = 1155;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1154;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseToks)(L_toks, L_groups);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_onExpr)(L_list)});
  L_$F.leisureFunctionId = 1159;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})})();
  };
  L_$F.leisureFunctionId = 1160;
  L_$F.leisureLength = 7;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("scanLineG", 5, "scanLineG str pat groups onDef onExpr = countedScanLineG emptyLineStarts str pat groups nil onDef onExpr", lazy((function(){
  var L_$F = function(L_str, L_pat, L_groups, L_onDef, L_onExpr) {
    return L_checkPartial(L_$F, arguments) || resolve(L_countedScanLineG)(L_emptyLineStarts, L_str, L_pat, L_groups, L_nil, L_onDef, L_onExpr);
  };
  L_$F.leisureFunctionId = 1161;
  L_$F.leisureLength = 5;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseLineG", 6, "parseLineG str pat names groups onDef onExpr = \\\\\r\n  astCallback cb = \\list . ifNotErr (createAst nil list names) \\ast . cb ast\r\n  .\r\n  scanLineG str pat groups (astCallback onDef) (astCallback onExpr)", lazy((function(){
  var L_$F = function(L_str, L_pat, L_names, L_groups, L_onDef, L_onExpr) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_astCallback;
  L_astCallback = function(){return (function(){
  var L_$F = (function(L_cb){return (function(){
  var L_$F = (function(L_list){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_list, L_names);}, lazy((function(){
  var L_$F = (function(L_ast){return resolve(L_cb)(L_ast)});
  L_$F.leisureFunctionId = 1164;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1163;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1162;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})();};

  return resolve(L_scanLineG)(L_str, L_pat, L_groups, function(){return resolve(L_astCallback)(L_onDef);}, function(){return resolve(L_astCallback)(L_onExpr);})})();
  };
  L_$F.leisureFunctionId = 1165;
  L_$F.leisureLength = 6;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("transformDef", 2, "transformDef name toks = withCons toks (parseErr \"Bad definition, expecting tokens\" (loc name)) \\h t .\r\n  isTokenString h '='\r\n    isTokenString (head t) '\\\\'\r\n      cons (token '.' (position h)) (setTypeAnno t (tokenString name))\r\n      cons (token '.' (position h)) t\r\n    ifNotErr (transformDef name t) \\list . cons h list", lazy((function(){
  var L_$F = function(L_name, L_toks) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_toks, function(){return resolve(L_parseErr)("Bad definition, expecting tokens", function(){return resolve(L_loc)(L_name);});}, lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_isTokenString)(L_h, "=")(function(){return resolve(L_isTokenString)(function(){return resolve(L_head)(L_t);}, "\\")(function(){return resolve(L_cons)(function(){return resolve(L_token)(".", function(){return resolve(L_position)(L_h);});}, function(){return resolve(L_setTypeAnno)(L_t, function(){return resolve(L_tokenString)(L_name);});});})(function(){return resolve(L_cons)(function(){return resolve(L_token)(".", function(){return resolve(L_position)(L_h);});}, L_t);});})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_transformDef)(L_name, L_t);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)(L_h, L_list)});
  L_$F.leisureFunctionId = 1168;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1167;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1166;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1169;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("setTypeAnno", 2, "setTypeAnno toks name = \\\\\r\n  tok = \\str . token str (position toks)\r\n  .\r\n  cons (tok '\\\\@') (cons (tok 'type') (cons (tok name) (cons (tok '.') toks)))", lazy((function(){
  var L_$F = function(L_toks, L_name) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_tok;
  L_tok = function(){return (function(){
  var L_$F = (function(L_str){return resolve(L_token)(L_str, function(){return resolve(L_position)(L_toks);})});
  L_$F.leisureFunctionId = 1170;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})();};

  return resolve(L_cons)(function(){return resolve(L_tok)("\\@");}, function(){return resolve(L_cons)(function(){return resolve(L_tok)("type");}, function(){return resolve(L_cons)(function(){return resolve(L_tok)(L_name);}, function(){return resolve(L_cons)(function(){return resolve(L_tok)(".");}, L_toks);});});})})();
  };
  L_$F.leisureFunctionId = 1171;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("setDataTypeAnno", 2, "setDataTypeAnno toks name = \\\\\r\n  tok = \\str . token str (position toks)\r\n  .\r\n  cons (tok '\\\\@') (cons (tok 'dataType') (cons (tok (tokenString name)) (cons (tok '.') toks)))", lazy((function(){
  var L_$F = function(L_toks, L_name) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_tok;
  L_tok = function(){return (function(){
  var L_$F = (function(L_str){return resolve(L_token)(L_str, function(){return resolve(L_position)(L_toks);})});
  L_$F.leisureFunctionId = 1172;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})();};

  return resolve(L_cons)(function(){return resolve(L_tok)("\\@");}, function(){return resolve(L_cons)(function(){return resolve(L_tok)("dataType");}, function(){return resolve(L_cons)(function(){return resolve(L_tok)(function(){return resolve(L_tokenString)(L_name);});}, function(){return resolve(L_cons)(function(){return resolve(L_tok)(".");}, L_toks);});});})})();
  };
  L_$F.leisureFunctionId = 1173;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("createDef", 5, "createDef def name arity src props = \\\\\r\n  #tok str = token str (position def)\r\n  tok str = token str (position name)\r\n  .\r\n  jsonStringify (tokenString name) (\\err . parseErr (strCat (cons \"Bad function name \" (cons (loc name) nil))) err) \\nameStr .\r\n    jsonStringify src (\\err . parseErr (strCat (cons \"Bad source \" (cons (loc name) nil))) err) \\srcStr .\r\n      cons '\\\\@' (cons 'leisureName' (cons (tokenString name) (cons '.' (cons (tok 'newDefine') (cons (tok nameStr) (cons (tok (strString arity)) (cons (tok srcStr) (cons '\\\\@' (cons 'arity' (cons arity (cons '.' (cons (spliceFuncProps arity props def) nil))))))))))))", lazy((function(){
  var L_$F = function(L_def, L_name, L_arity, L_src, L_props) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_tok;
  L_tok = function(){return (function(){
  var L_$F = (function(L_str){return resolve(L_token)(L_str, function(){return resolve(L_position)(L_name);})});
  L_$F.leisureFunctionId = 1174;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})();};

  return resolve(L_jsonStringify)(function(){return resolve(L_tokenString)(L_name);}, lazy((function(){
  var L_$F = (function(L_err){return resolve(L_parseErr)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("Bad function name ", function(){return resolve(L_cons)(function(){return resolve(L_loc)(L_name);}, L_nil);});});}, L_err)});
  L_$F.leisureFunctionId = 1175;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), lazy((function(){
  var L_$F = (function(L_nameStr){return resolve(L_jsonStringify)(L_src, lazy((function(){
  var L_$F = (function(L_err){return resolve(L_parseErr)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("Bad source ", function(){return resolve(L_cons)(function(){return resolve(L_loc)(L_name);}, L_nil);});});}, L_err)});
  L_$F.leisureFunctionId = 1177;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), lazy((function(){
  var L_$F = (function(L_srcStr){return resolve(L_cons)("\\@", function(){return resolve(L_cons)("leisureName", function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(L_name);}, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_tok)("newDefine");}, function(){return resolve(L_cons)(function(){return resolve(L_tok)(L_nameStr);}, function(){return resolve(L_cons)(function(){return resolve(L_tok)(function(){return resolve(L_strString)(L_arity);});}, function(){return resolve(L_cons)(function(){return resolve(L_tok)(L_srcStr);}, function(){return resolve(L_cons)("\\@", function(){return resolve(L_cons)("arity", function(){return resolve(L_cons)(L_arity, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_spliceFuncProps)(L_arity, L_props, L_def);}, L_nil);});});});});});});});});});});});})});
  L_$F.leisureFunctionId = 1178;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1176;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))})();
  };
  L_$F.leisureFunctionId = 1179;
  L_$F.leisureLength = 5;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("spliceFuncProps", 3, "spliceFuncProps arity props ast = or (isNil props) (== arity 0)\r\n  ast\r\n  subSpliceFuncProps props ast", lazy((function(){
  var L_$F = function(L_arity, L_props, L_ast) {
    return L_checkPartial(L_$F, arguments) || resolve(L_or)(function(){return resolve(L_isNil)(L_props);}, function(){return resolve(L_$p$p)(L_arity, 0);})(L_ast)(function(){return resolve(L_subSpliceFuncProps)(L_props, L_ast);});
  };
  L_$F.leisureFunctionId = 1180;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("subSpliceFuncProps", 2, "subSpliceFuncProps props ast = \\\\\r\n  slash = head ast\r\n  var = head (tail ast)\r\n  afterVar = tail (tail ast)\r\n  dot = head afterVar\r\n  body = tail afterVar\r\n  .\r\n  isTokenString slash '\\\\'\r\n    cons\r\n      slash\r\n      cons\r\n        var\r\n        isTokenString dot '.'\r\n          cons dot (addProps props body)\r\n          cons '.' (addProps props afterVar)\r\n    cons\r\n      head ast\r\n      subSpliceFuncProps props (tail ast)", lazy((function(){
  var L_$F = function(L_props, L_ast) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_slash, L_var, L_afterVar, L_dot, L_body;
  L_slash = function(){return resolve(L_head)(L_ast);};
  L_var = function(){return resolve(L_head)(function(){return resolve(L_tail)(L_ast);});};
  L_afterVar = function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_ast);});};
  L_dot = function(){return resolve(L_head)(L_afterVar);};
  L_body = function(){return resolve(L_tail)(L_afterVar);};

  return resolve(L_isTokenString)(L_slash, "\\")(function(){return resolve(L_cons)(L_slash, function(){return resolve(L_cons)(L_var, function(){return resolve(L_isTokenString)(L_dot, ".")(function(){return resolve(L_cons)(L_dot, function(){return resolve(L_addProps)(L_props, L_body);});})(function(){return resolve(L_cons)(".", function(){return resolve(L_addProps)(L_props, L_afterVar);});});});});})(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_ast);}, function(){return resolve(L_subSpliceFuncProps)(L_props, function(){return resolve(L_tail)(L_ast);});});})})();
  };
  L_$F.leisureFunctionId = 1181;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("addProps", 2, "addProps props ast = _foldr\r\n  \\prop result . cons '\\\\@' (cons (head prop) (cons (tail prop) (cons '.' result)))\r\n  ast\r\n  props", lazy((function(){
  var L_$F = function(L_props, L_ast) {
    return L_checkPartial(L_$F, arguments) || resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_prop){return (function(){
  var L_$F = (function(L_result){return resolve(L_cons)("\\@", function(){return resolve(L_cons)(function(){return resolve(L_head)(L_prop);}, function(){return resolve(L_cons)(function(){return resolve(L_tail)(L_prop);}, function(){return resolve(L_cons)(".", L_result);});});})});
  L_$F.leisureFunctionId = 1183;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1182;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_ast, L_props);
  };
  L_$F.leisureFunctionId = 1184;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("checkSetDataType", 3, "checkSetDataType toks curToks name = withCons curToks toks \\h t .\r\n  isTokenString h '='\r\n    isTokenString (head t) '\\\\'\r\n      setDataTypeAnno toks name\r\n      toks\r\n    checkSetDataType toks t name", lazy((function(){
  var L_$F = function(L_toks, L_curToks, L_name) {
    return L_checkPartial(L_$F, arguments) || resolve(L_withCons)(L_curToks, L_toks, lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_isTokenString)(L_h, "=")(function(){return resolve(L_isTokenString)(function(){return resolve(L_head)(L_t);}, "\\")(function(){return resolve(L_setDataTypeAnno)(L_toks, L_name);})(L_toks);})(function(){return resolve(L_checkSetDataType)(L_toks, L_t, L_name);})});
  L_$F.leisureFunctionId = 1186;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1185;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1187;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("arity", 2, "arity toks n = isTokenString (head toks) '=' n (arity (tail toks) (+ n 1))", lazy((function(){
  var L_$F = function(L_toks, L_n) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isTokenString)(function(){return resolve(L_head)(L_toks);}, "=")(L_n)(function(){return resolve(L_arity)(function(){return resolve(L_tail)(L_toks);}, function(){return resolve(L_$o)(L_n, 1);});});
  };
  L_$F.leisureFunctionId = 1188;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tokListStr", 1, "tokListStr toks = jsonStringify (_strJoin (_map (\\t . tokenString t) toks) ' ')", lazy((function(){
  var L_$F = (function(L_toks){return resolve(L_jsonStringify)(function(){return resolve(L__strJoin)(function(){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_t){return resolve(L_tokenString)(L_t)});
  L_$F.leisureFunctionId = 1190;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_toks);}, " ");})});
  L_$F.leisureFunctionId = 1189;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("linePat", 0, "linePat = regexp '\\\\r?\\\\n(?=[^ ]|$)'", function(){return resolve(L_regexp)("\\r?\\n(?=[^ ]|$)");})},
    function(){return resolve(L_newDefine)("emptyLinePat", 0, "emptyLinePat = regexp '(^[ \\\\i]*\\\\#.*|^[ \\\\i]*$|^\\\\r?\\\\n[ \\\\i]*$)'", function(){return resolve(L_regexp)("(^[ \\i]*\\#.*|^[ \\i]*$|^\\r?\\n[ \\i]*$)");})},
    function(){return resolve(L_newDefine)("lineScrub", 0, "lineScrub = regexpFlags '\\\\r\\\\n' 'g'", function(){return resolve(L_regexpFlags)("\\r\\n", "g");})},
    function(){return resolve(L_newDefine)("linesForFile", 1, "linesForFile text = _map tail (countedLinesForFile \"NOTHING.lsr\" text)", lazy((function(){
  var L_$F = (function(L_text){return resolve(L__map)(L_tail, function(){return resolve(L_countedLinesForFile)("NOTHING.lsr", L_text);})});
  L_$F.leisureFunctionId = 1191;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedLinesForFile", 2, "countedLinesForFile name text = filter\r\n  \\line . isNil (strMatch (tail line) emptyLinePat)\r\n  countedLines name 1 text", lazy((function(){
  var L_$F = function(L_name, L_text) {
    return L_checkPartial(L_$F, arguments) || resolve(L_filter)(lazy((function(){
  var L_$F = (function(L_line){return resolve(L_isNil)(function(){return resolve(L_strMatch)(function(){return resolve(L_tail)(L_line);}, L_emptyLinePat);})});
  L_$F.leisureFunctionId = 1192;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_countedLines)(L_name, 1, L_text);});
  };
  L_$F.leisureFunctionId = 1193;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedLines", 3, "countedLines filename lineOffset str = _reverse\r\n  _withRecur\r\n    _countedLines filename lineOffset str nil", lazy((function(){
  var L_$F = function(L_filename, L_lineOffset, L_str) {
    return L_checkPartial(L_$F, arguments) || resolve(L__reverse)(function(){return resolve(L__withRecur)(function(){return resolve(L__countedLines)(L_filename, L_lineOffset, L_str, L_nil);});});
  };
  L_$F.leisureFunctionId = 1194;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("_countedLines", 4, "_countedLines filename lineOffset str lines = \\\\\r\n  m = strMatch str linePat\r\n  idx = head (tail (tail m))\r\n  chunk = strSubstring str 0 idx\r\n  next = + idx (strLen (head m))\r\n  chunkLines = findLines 0 chunk\r\n  .\r\n  eq str ''\r\n    lines\r\n    isNil m\r\n      cons (cons (cons filename (cons lineOffset (tail (findLines 0 str)))) str) lines\r\n      _recur\r\n        _countedLines filename (+ lineOffset (length chunkLines)) (strSubstring str next 0)\r\n          cons (cons (cons filename (cons lineOffset (tail chunkLines))) chunk) lines", lazy((function(){
  var L_$F = function(L_filename, L_lineOffset, L_str, L_lines) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_m, L_idx, L_chunk, L_next, L_chunkLines;
  L_m = function(){return resolve(L_strMatch)(L_str, L_linePat);};
  L_idx = function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_m);});});};
  L_chunk = function(){return resolve(L_strSubstring)(L_str, 0, L_idx);};
  L_next = function(){return resolve(L_$o)(L_idx, function(){return resolve(L_strLen)(function(){return resolve(L_head)(L_m);});});};
  L_chunkLines = function(){return resolve(L_findLines)(0, L_chunk);};

  return resolve(L_eq)(L_str, "")(L_lines)(function(){return resolve(L_isNil)(L_m)(function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_filename, function(){return resolve(L_cons)(L_lineOffset, function(){return resolve(L_tail)(function(){return resolve(L_findLines)(0, L_str);});});});}, L_str);}, L_lines);})(function(){return resolve(L__recur)(function(){return resolve(L__countedLines)(L_filename, function(){return resolve(L_$o)(L_lineOffset, function(){return resolve(L_length)(L_chunkLines);});}, function(){return resolve(L_strSubstring)(L_str, L_next, 0);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_filename, function(){return resolve(L_cons)(L_lineOffset, function(){return resolve(L_tail)(L_chunkLines);});});}, L_chunk);}, L_lines);});});});})})();
  };
  L_$F.leisureFunctionId = 1195;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("defPat", 0, "defPat = regexp '^[^ =]+.* =( |$)'", function(){return resolve(L_regexp)("^[^ =]+.* =( |$)");})},
    function(){return resolve(L_newDefine)("unanchoredDefPat", 0, "unanchoredDefPat = regexp '^((?:\\\\s*\\\\n|#[^\\\\n]*\\\\n)*)([^=\\\\n]*)(=\\\\([^=]+=|=)?'", function(){return resolve(L_regexp)("^((?:\\s*\\n|#[^\\n]*\\n)*)([^=\\n]*)(=\\([^=]+=|=)?");})},
    function(){return resolve(L_newDefine)("namesForLines", 1, "namesForLines lines = _foldl\r\n  \\result line . \\\\\r\n    m = strMatch line defPat\r\n    .\r\n    isNil m result (cons (head (tail m)) result)\r\n  nil\r\n  lines", lazy((function(){
  var L_$F = (function(L_lines){return resolve(L__foldl)(lazy((function(){
  var L_$F = (function(L_result){return (function(){
  var L_$F = (function(L_line){return (function(){  var L_m;
  L_m = function(){return resolve(L_strMatch)(L_line, L_defPat);};

  return resolve(L_isNil)(L_m)(L_result)(function(){return resolve(L_cons)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_m);});}, L_result);})})()});
  L_$F.leisureFunctionId = 1198;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1197;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil, L_lines)});
  L_$F.leisureFunctionId = 1196;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("runParseFilters", 2, "runParseFilters filters line = filters\r\n  \\h t D . primBind (h line) \\filtered . runParseFilters t filtered\r\n  fakereturn line", lazy((function(){
  var L_$F = function(L_filters, L_line) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_filters))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_primBind)(function(){return resolve(L_h)(L_line);}, lazy((function(){
  var L_$F = (function(L_filtered){return resolve(L_runParseFilters)(L_t, L_filtered)});
  L_$F.leisureFunctionId = 1202;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1201;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1200;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1199;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_fakereturn)(L_line);});
  };
  L_$F.leisureFunctionId = 1203;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isBlockStart", 1, "isBlockStart tok = and\r\n  or (isToken tok) (isString tok)\r\n  _contains blockStarts (strTokenString tok)", lazy((function(){
  var L_$F = (function(L_tok){return resolve(L_and)(function(){return resolve(L_or)(function(){return resolve(L_isToken)(L_tok);}, function(){return resolve(L_isString)(L_tok);});}, function(){return resolve(L__contains)(L_blockStarts, function(){return resolve(L_strTokenString)(L_tok);});})});
  L_$F.leisureFunctionId = 1204;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("macroSub", 2, "macroSub macs expr = postProcessMacro (emptyFor expr) (emptyFor expr) (baseMacroSub macs expr)", lazy((function(){
  var L_$F = function(L_macs, L_expr) {
    return L_checkPartial(L_$F, arguments) || resolve(L_postProcessMacro)(function(){return resolve(L_emptyFor)(L_expr);}, function(){return resolve(L_emptyFor)(L_expr);}, function(){return resolve(L_baseMacroSub)(L_macs, L_expr);});
  };
  L_$F.leisureFunctionId = 1205;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("consifyMacroValue", 1, "consifyMacroValue value = isCons value value (cons value nil)", lazy((function(){
  var L_$F = (function(L_value){return resolve(L_isCons)(L_value)(L_value)(function(){return resolve(L_cons)(L_value, L_nil);})});
  L_$F.leisureFunctionId = 1206;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("baseMacroSub", 2, "baseMacroSub macs expr = isToken expr\r\n  expr\r\n  isParens expr\r\n    expr \\start end content . \\\\\r\n      result = baseMacroSub macs content\r\n      .\r\n      isToken result result (parens start end result)\r\n    withCons expr expr \\h t .\r\n      isBlockStart h\r\n        cons h\r\n          isTokenString h '\\\\\\\\'\r\n            macroSubLet macs t\r\n            macroSubBody '.' macs t\r\n        withToken h\r\n          \\\\\r\n            subH = baseMacroSub macs h\r\n            .\r\n            withToken subH\r\n              cons subH (_map (baseMacroSub macs) t)\r\n              \\tok pos . baseMacroSub macs (cons subH t)\r\n          \\tok pos . assoc tok macs\r\n            \\def . baseMacroSub macs (def t)\r\n            cons h (_map (baseMacroSub macs) t)", lazy((function(){
  var L_$F = function(L_macs, L_expr) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isToken)(L_expr)(L_expr)(function(){return resolve(L_isParens)(L_expr)(function(){return resolve(L_expr)(lazy((function(){
  var L_$F = (function(L_start){return (function(){
  var L_$F = (function(L_end){return (function(){
  var L_$F = (function(L_content){return (function(){  var L_result;
  L_result = function(){return resolve(L_baseMacroSub)(L_macs, L_content);};

  return resolve(L_isToken)(L_result)(L_result)(function(){return resolve(L_parens)(L_start, L_end, L_result);})})()});
  L_$F.leisureFunctionId = 1209;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1208;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1207;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_withCons)(L_expr, L_expr, lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_isBlockStart)(L_h)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_isTokenString)(L_h, "\\\\")(function(){return resolve(L_macroSubLet)(L_macs, L_t);})(function(){return resolve(L_macroSubBody)(".", L_macs, L_t);});});})(function(){return resolve(L_withToken)(L_h, function(){return (function(){  var L_subH;
  L_subH = function(){return resolve(L_baseMacroSub)(L_macs, L_h);};

  return resolve(L_withToken)(L_subH, function(){return resolve(L_cons)(L_subH, function(){return resolve(L__map)(function(){return resolve(L_baseMacroSub)(L_macs);}, L_t);});}, lazy((function(){
  var L_$F = (function(L_tok){return (function(){
  var L_$F = (function(L_pos){return resolve(L_baseMacroSub)(L_macs, function(){return resolve(L_cons)(L_subH, L_t);})});
  L_$F.leisureFunctionId = 1213;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1212;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))})();}, lazy((function(){
  var L_$F = (function(L_tok){return (function(){
  var L_$F = (function(L_pos){return resolve(L_assoc)(L_tok, L_macs)(lazy((function(){
  var L_$F = (function(L_def){return resolve(L_baseMacroSub)(L_macs, function(){return resolve(L_def)(L_t);})});
  L_$F.leisureFunctionId = 1216;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_cons)(L_h, function(){return resolve(L__map)(function(){return resolve(L_baseMacroSub)(L_macs);}, L_t);});})});
  L_$F.leisureFunctionId = 1215;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1214;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1211;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1210;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));});});
  };
  L_$F.leisureFunctionId = 1217;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("macroSubLet", 2, "macroSubLet macs list = list\r\n  \\h t D . isTokenString h '.'\r\n    cons h (baseMacroSub macs t)\r\n    cons (setParens h \\content . macroSubBody '=' macs content) (macroSubLet macs t)\r\n  # Don't bother with parse errors at this point -- ast generator will detect them\r\n  nil", lazy((function(){
  var L_$F = function(L_macs, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isTokenString)(L_h, ".")(function(){return resolve(L_cons)(L_h, function(){return resolve(L_baseMacroSub)(L_macs, L_t);});})(function(){return resolve(L_cons)(function(){return resolve(L_setParens)(L_h, lazy((function(){
  var L_$F = (function(L_content){return resolve(L_macroSubBody)("=", L_macs, L_content)});
  L_$F.leisureFunctionId = 1221;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));}, function(){return resolve(L_macroSubLet)(L_macs, L_t);});})});
  L_$F.leisureFunctionId = 1220;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1219;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1218;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);
  };
  L_$F.leisureFunctionId = 1222;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("macroSubBody", 3, "macroSubBody char macs list = list\r\n  \\h t D . cons h\r\n    isTokenString h char baseMacroSub (macroSubBody char)\r\n      macs\r\n      t\r\n  nil", lazy((function(){
  var L_$F = function(L_char, L_macs, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_cons)(L_h, function(){return resolve(L_isTokenString)(L_h, L_char)(L_baseMacroSub)(function(){return resolve(L_macroSubBody)(L_char);})(L_macs)(L_t);})});
  L_$F.leisureFunctionId = 1225;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1224;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1223;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);
  };
  L_$F.leisureFunctionId = 1226;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("postProcessMacro", 3, "postProcessMacro before after expr = isString expr\r\n  token expr (isEmptyPos after before after)\r\n  isParens expr\r\n    expr \\start end contents . parens start end (postProcessMacro start end contents)\r\n    isCons expr\r\n      expr \\h t .\r\n        isToken h\r\n          cons h (postProcessMacro (addFilepos (addFilepos (tokenFilepos h) (strLen (tokenString h))) 1) (emptyFor h) t)\r\n          \\\\\r\n            posStart = position h\r\n            posEnd = position t\r\n            t2 = postProcessMacro (emptyFor posStart) after t\r\n            h2 = postProcessMacro before (emptyFor posStart) h\r\n            .\r\n            isEmptyPos posStart\r\n              cons (postProcessMacro before (position t2) h) t2\r\n              cons h2 (postProcessMacro (addFilepos (lexEnd h2) 1) after t)\r\n      isNumber expr\r\n        token (strString expr) (isEmptyPos after before after)\r\n        expr", lazy((function(){
  var L_$F = function(L_before, L_after, L_expr) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isString)(L_expr)(function(){return resolve(L_token)(L_expr, function(){return resolve(L_isEmptyPos)(L_after)(L_before)(L_after);});})(function(){return resolve(L_isParens)(L_expr)(function(){return resolve(L_expr)(lazy((function(){
  var L_$F = (function(L_start){return (function(){
  var L_$F = (function(L_end){return (function(){
  var L_$F = (function(L_contents){return resolve(L_parens)(L_start, L_end, function(){return resolve(L_postProcessMacro)(L_start, L_end, L_contents);})});
  L_$F.leisureFunctionId = 1229;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1228;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1227;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_isCons)(L_expr)(function(){return resolve(L_expr)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_isToken)(L_h)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_postProcessMacro)(function(){return resolve(L_addFilepos)(function(){return resolve(L_addFilepos)(function(){return resolve(L_tokenFilepos)(L_h);}, function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_h);});});}, 1);}, function(){return resolve(L_emptyFor)(L_h);}, L_t);});})(function(){return (function(){  var L_posStart, L_posEnd, L_t2, L_h2;
  L_posStart = function(){return resolve(L_position)(L_h);};
  L_posEnd = function(){return resolve(L_position)(L_t);};
  L_t2 = function(){return resolve(L_postProcessMacro)(function(){return resolve(L_emptyFor)(L_posStart);}, L_after, L_t);};
  L_h2 = function(){return resolve(L_postProcessMacro)(L_before, function(){return resolve(L_emptyFor)(L_posStart);}, L_h);};

  return resolve(L_isEmptyPos)(L_posStart)(function(){return resolve(L_cons)(function(){return resolve(L_postProcessMacro)(L_before, function(){return resolve(L_position)(L_t2);}, L_h);}, L_t2);})(function(){return resolve(L_cons)(L_h2, function(){return resolve(L_postProcessMacro)(function(){return resolve(L_addFilepos)(function(){return resolve(L_lexEnd)(L_h2);}, 1);}, L_after, L_t);});})})();})});
  L_$F.leisureFunctionId = 1231;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1230;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_isNumber)(L_expr)(function(){return resolve(L_token)(function(){return resolve(L_strString)(L_expr);}, function(){return resolve(L_isEmptyPos)(L_after)(L_before)(L_after);});})(L_expr);});});});
  };
  L_$F.leisureFunctionId = 1232;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("defMacro", 2, "defMacro name def = primBind (getValue 'macroDefs')\r\n  \\macs . setValue 'macroDefs' (acons name def macs)", lazy((function(){
  var L_$F = function(L_name, L_def) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_getValue)("macroDefs");}, lazy((function(){
  var L_$F = (function(L_macs){return resolve(L_setValue)("macroDefs", function(){return resolve(L_acons)(L_name, L_def, L_macs);})});
  L_$F.leisureFunctionId = 1233;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1234;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("delimiterListPrefix", 0, "delimiterListPrefix = \"\\\"(?:\\\\\\\\.|[^\\\"])*\\\"|'(?:\\\\\\\\.|[^'])*'|\\\\r?\\\\n *#[^\\\\r\\\\n]*|\\\\r?\\\\n *| +|#[^\\\\r\\\\n]*\"", "\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|\\r?\\n *#[^\\r\\n]*|\\r?\\n *| +|#[^\\r\\n]*")},
    function(){return resolve(L_newDefine)("regexpEscapePat", 0, "regexpEscapePat = regexpFlags '[\\\\-\\\\[\\\\]/\\\\{\\\\}\\\\(\\\\)\\\\*\\\\+\\\\?\\\\.\\\\\\\\\\\\^\\\\$\\\\|]' 'g'", function(){return resolve(L_regexpFlags)("[\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]", "g");})},
    function(){return resolve(L_newDefine)("addToken", 1, "addToken del = primBind (getValue 'tokenList')\r\n  \\dels . _contains dels del\r\n    false\r\n    \\\\\r\n      newDels = insertSorted (\\a b . > (strLen a) (strLen b)) del dels\r\n      .\r\n      primBind (setValue 'tokenList' newDels)\r\n        \\_ . computeTokenPat newDels", lazy((function(){
  var L_$F = (function(L_del){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenList");}, lazy((function(){
  var L_$F = (function(L_dels){return resolve(L__contains)(L_dels, L_del)(L_false)(function(){return (function(){  var L_newDels;
  L_newDels = function(){return resolve(L_insertSorted)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_$z)(function(){return resolve(L_strLen)(L_a);}, function(){return resolve(L_strLen)(L_b);})});
  L_$F.leisureFunctionId = 1238;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1237;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_del, L_dels);};

  return resolve(L_primBind)(function(){return resolve(L_setValue)("tokenList", L_newDels);}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_computeTokenPat)(L_newDels)});
  L_$F.leisureFunctionId = 1239;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))})();})});
  L_$F.leisureFunctionId = 1236;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1235;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("computeTokenPat", 1, "computeTokenPat dels = \\\\\r\n  delPats = _map (\\item . strReplace item regexpEscapePat \"\\\\$&\") dels\r\n  newPat = strCat (cons '(' (cons (_strJoin (cons delimiterListPrefix delPats) '|') (cons ')' nil)))\r\n  .\r\n  setValue 'tokenPat' newPat", lazy((function(){
  var L_$F = (function(L_dels){return (function(){  var L_delPats, L_newPat;
  L_delPats = function(){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_item){return resolve(L_strReplace)(L_item, L_regexpEscapePat, "\\$&")});
  L_$F.leisureFunctionId = 1241;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_dels);};
  L_newPat = function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(", function(){return resolve(L_cons)(function(){return resolve(L__strJoin)(function(){return resolve(L_cons)(L_delimiterListPrefix, L_delPats);}, "|");}, function(){return resolve(L_cons)(")", L_nil);});});});};

  return resolve(L_setValue)("tokenPat", L_newPat)})()});
  L_$F.leisureFunctionId = 1240;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("addTokenGroup", 2, "addTokenGroup open close = primBind (addToken open)\r\n  \\_ . primBind (addToken close)\r\n    \\_ . primBind (getValue 'tokenGroups')\r\n      \\gr . setValue 'tokenGroups' (acons open close gr)", lazy((function(){
  var L_$F = function(L_open, L_close) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_addToken)(L_open);}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_primBind)(function(){return resolve(L_addToken)(L_close);}, lazy((function(){
  var L_$F = (function(L___0){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenGroups");}, lazy((function(){
  var L_$F = (function(L_gr){return resolve(L_setValue)("tokenGroups", function(){return resolve(L_acons)(L_open, L_close, L_gr);})});
  L_$F.leisureFunctionId = 1244;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1243;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1242;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1245;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parenGroups", 0, "parenGroups = acons '(' ')' nil", function(){return resolve(L_acons)("(", ")", L_nil);})},
    function(){return resolve(L_newDefine)("testParse", 2, "testParse str pat = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil parenGroups) \\list . list \\h t . stripParens h", lazy((function(){
  var L_$F = function(L_str, L_pat) {
    return L_checkPartial(L_$F, arguments) || resolve(L_ifNotErr)(function(){return resolve(L_parseIndent)(function(){return resolve(L_token)("\n", L_startFilePos);}, function(){return resolve(L_tokens)(L_str, L_pat);}, L_nil, L_parenGroups);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_stripParens)(L_h)});
  L_$F.leisureFunctionId = 1248;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1247;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1246;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1249;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseG", 3, "parseG str pat groups = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil groups) \\list . list \\h t . stripParens h", lazy((function(){
  var L_$F = function(L_str, L_pat, L_groups) {
    return L_checkPartial(L_$F, arguments) || resolve(L_ifNotErr)(function(){return resolve(L_parseIndent)(function(){return resolve(L_token)("\n", L_startFilePos);}, function(){return resolve(L_tokens)(L_str, L_pat);}, L_nil, L_groups);}, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_stripParens)(L_h)});
  L_$F.leisureFunctionId = 1252;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1251;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1250;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1253;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseToAst", 2, "parseToAst str pat = createAst nil (testParse str pat) nil", lazy((function(){
  var L_$F = function(L_str, L_pat) {
    return L_checkPartial(L_$F, arguments) || resolve(L_createAst)(L_nil, function(){return resolve(L_testParse)(L_str)(L_pat);}, L_nil);
  };
  L_$F.leisureFunctionId = 1254;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseM", 1, "parseM str =\r\n  primBind (getValue 'tokenPat')\r\n    \\tokPat . primBind (getValue 'tokenGroups')\r\n      \\groups . parseG str tokPat groups", lazy((function(){
  var L_$F = (function(L_str){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenPat");}, lazy((function(){
  var L_$F = (function(L_tokPat){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenGroups");}, lazy((function(){
  var L_$F = (function(L_groups){return resolve(L_parseG)(L_str, L_tokPat, L_groups)});
  L_$F.leisureFunctionId = 1257;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1256;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1255;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("scanLine", 4, "scanLine str pat onDef onExpr = scanLineG str pat parenGroups onDef onExpr", lazy((function(){
  var L_$F = function(L_str, L_pat, L_onDef, L_onExpr) {
    return L_checkPartial(L_$F, arguments) || resolve(L_scanLineG)(L_str, L_pat, L_parenGroups, L_onDef, L_onExpr);
  };
  L_$F.leisureFunctionId = 1258;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseLine", 5, "parseLine str pat names onDef onExpr = parseLineG str pat names parenGroups onDef onExpr", lazy((function(){
  var L_$F = function(L_str, L_pat, L_names, L_onDef, L_onExpr) {
    return L_checkPartial(L_$F, arguments) || resolve(L_parseLineG)(L_str, L_pat, L_names, L_parenGroups, L_onDef, L_onExpr);
  };
  L_$F.leisureFunctionId = 1259;
  L_$F.leisureLength = 5;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseLineM", 1, "parseLineM str = primBind (getValue 'tokenPat')\r\n  \\tokPat . primBind (getValue 'tokenGroups')\r\n    \\groups . parseLineG str tokPat nil groups id id", lazy((function(){
  var L_$F = (function(L_str){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenPat");}, lazy((function(){
  var L_$F = (function(L_tokPat){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenGroups");}, lazy((function(){
  var L_$F = (function(L_groups){return resolve(L_parseLineG)(L_str, L_tokPat, L_nil, L_groups, L_id, L_id)});
  L_$F.leisureFunctionId = 1262;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1261;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1260;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("macroSubM", 1, "macroSubM expr =\r\n  primBind (getValue 'macroDefs')\r\n    \\macs . macroSub macs expr", lazy((function(){
  var L_$F = (function(L_expr){return resolve(L_primBind)(function(){return resolve(L_getValue)("macroDefs");}, lazy((function(){
  var L_$F = (function(L_macs){return resolve(L_macroSub)(L_macs, L_expr)});
  L_$F.leisureFunctionId = 1264;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1263;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("macroParse", 1, "macroParse str =\r\n  primBind (parseM str)\r\n    \\ex . macroSubM ex", lazy((function(){
  var L_$F = (function(L_str){return resolve(L_primBind)(function(){return resolve(L_parseM)(L_str);}, lazy((function(){
  var L_$F = (function(L_ex){return resolve(L_macroSubM)(L_ex)});
  L_$F.leisureFunctionId = 1266;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1265;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("tokensM", 1, "tokensM str =\r\n  primBind (getValue 'tokenPat')\r\n    \\delimiterPat . tokens str delimiterPat", lazy((function(){
  var L_$F = (function(L_str){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenPat");}, lazy((function(){
  var L_$F = (function(L_delimiterPat){return resolve(L_tokens)(L_str, L_delimiterPat)});
  L_$F.leisureFunctionId = 1268;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1267;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseLines", 2, "parseLines lines result = lines\r\n  \\h t D . primBind (parseLineM h)\r\n    \\ast . parseLines t (cons ast result)\r\n  _reverse result", lazy((function(){
  var L_$F = function(L_lines, L_result) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_lines))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_primBind)(function(){return resolve(L_parseLineM)(L_h);}, lazy((function(){
  var L_$F = (function(L_ast){return resolve(L_parseLines)(L_t, function(){return resolve(L_cons)(L_ast, L_result);})});
  L_$F.leisureFunctionId = 1272;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1271;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1270;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1269;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L__reverse)(L_result);});
  };
  L_$F.leisureFunctionId = 1273;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("parseFile", 1, "parseFile text = parseLines (linesForFile text) nil", lazy((function(){
  var L_$F = (function(L_text){return resolve(L_parseLines)(function(){return resolve(L_linesForFile)(L_text);}, L_nil)});
  L_$F.leisureFunctionId = 1274;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("simpleScanLine", 1, "simpleScanLine line = primBind (getValue 'tokenPat')\r\n  \\tokenPat . primBind (getValue 'tokenGroups')\r\n    \\groups . scanLineG line tokenPat groups id id", lazy((function(){
  var L_$F = (function(L_line){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenPat");}, lazy((function(){
  var L_$F = (function(L_tokenPat){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenGroups");}, lazy((function(){
  var L_$F = (function(L_groups){return resolve(L_scanLineG)(L_line, L_tokenPat, L_groups, L_id, L_id)});
  L_$F.leisureFunctionId = 1277;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1276;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1275;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("scanLineM", 1, "scanLineM line = countedScanLineM emptyLineStarts line", lazy((function(){
  var L_$F = (function(L_line){return resolve(L_countedScanLineM)(L_emptyLineStarts, L_line)});
  L_$F.leisureFunctionId = 1278;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedScanLineM", 2, "countedScanLineM lineStarts line = primBind (getValue 'tokenPat')\r\n  \\tokenPat . primBind (getValue 'tokenGroups')\r\n    \\groups . primBind (getValue 'parseFilters')\r\n      \\filters . primBind (getValue 'macroDefs')\r\n        \\macros . primBind (getValue 'parser_funcProps')\r\n          \\props . primBind (runParseFilters filters (countedScanLineG lineStarts line tokenPat groups props id id))\r\n            \\scanned . macroSub macros scanned", lazy((function(){
  var L_$F = function(L_lineStarts, L_line) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_getValue)("tokenPat");}, lazy((function(){
  var L_$F = (function(L_tokenPat){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenGroups");}, lazy((function(){
  var L_$F = (function(L_groups){return resolve(L_primBind)(function(){return resolve(L_getValue)("parseFilters");}, lazy((function(){
  var L_$F = (function(L_filters){return resolve(L_primBind)(function(){return resolve(L_getValue)("macroDefs");}, lazy((function(){
  var L_$F = (function(L_macros){return resolve(L_primBind)(function(){return resolve(L_getValue)("parser_funcProps");}, lazy((function(){
  var L_$F = (function(L_props){return resolve(L_primBind)(function(){return resolve(L_runParseFilters)(L_filters, function(){return resolve(L_countedScanLineG)(L_lineStarts, L_line, L_tokenPat, L_groups, L_props, L_id, L_id);});}, lazy((function(){
  var L_$F = (function(L_scanned){return resolve(L_macroSub)(L_macros, L_scanned)});
  L_$F.leisureFunctionId = 1284;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1283;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1282;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1281;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1280;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1279;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1285;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("newline", 0, "newline = regexp '\\\\r?\\\\n'", function(){return resolve(L_regexp)("\\r?\\n");})},
    function(){return resolve(L_newDefine)("findLines", 2, "findLines offset line = \\\\\r\n  m = strMatch line newline\r\n  idx = + 1 (head (tail (tail m)))\r\n  .\r\n  eq m nil\r\n    cons offset nil\r\n    cons offset (findLines (+ offset idx) (strSubstring line idx 0))", lazy((function(){
  var L_$F = function(L_offset, L_line) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_m, L_idx;
  L_m = function(){return resolve(L_strMatch)(L_line, L_newline);};
  L_idx = function(){return resolve(L_$o)(1, function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_m);});});});};

  return resolve(L_eq)(L_m, L_nil)(function(){return resolve(L_cons)(L_offset, L_nil);})(function(){return resolve(L_cons)(L_offset, function(){return resolve(L_findLines)(function(){return resolve(L_$o)(L_offset, L_idx);}, function(){return resolve(L_strSubstring)(L_line, L_idx, 0);});});})})();
  };
  L_$F.leisureFunctionId = 1286;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("newParseLine", 3, "newParseLine offset names line = primBind (scanLineM line)\r\n  \\scanned . ifNotErr (createAst (cons \"NEWPARSE.lsr\" (findLines offset line)) scanned names) id", lazy((function(){
  var L_$F = function(L_offset, L_names, L_line) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_scanLineM)(L_line);}, lazy((function(){
  var L_$F = (function(L_scanned){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(function(){return resolve(L_cons)("NEWPARSE.lsr", function(){return resolve(L_findLines)(L_offset, L_line);});}, L_scanned, L_names);}, L_id)});
  L_$F.leisureFunctionId = 1287;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1288;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedParseLine", 2, "countedParseLine names countedLine = primBind (countedScanLineM (head countedLine) (tail countedLine))\r\n  \\scanned . createAst (head countedLine) scanned names", lazy((function(){
  var L_$F = function(L_names, L_countedLine) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_countedScanLineM)(function(){return resolve(L_head)(L_countedLine);}, function(){return resolve(L_tail)(L_countedLine);});}, lazy((function(){
  var L_$F = (function(L_scanned){return resolve(L_createAst)(function(){return resolve(L_head)(L_countedLine);}, L_scanned, L_names)});
  L_$F.leisureFunctionId = 1289;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1290;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("runLine", 3, "runLine offset names line = primBind (newParseLine offset names line)\r\n  \\ast . primBind (runAst line ast)\r\n    \\res . primBind res\r\n      \\result . cons\r\n        ast\r\n        isErr result\r\n          left (errMsg result)\r\n          right result", lazy((function(){
  var L_$F = function(L_offset, L_names, L_line) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_newParseLine)(L_offset, L_names, L_line);}, lazy((function(){
  var L_$F = (function(L_ast){return resolve(L_primBind)(function(){return resolve(L_runAst)(L_line)(L_ast);}, lazy((function(){
  var L_$F = (function(L_res){return resolve(L_primBind)(L_res, lazy((function(){
  var L_$F = (function(L_result){return resolve(L_cons)(L_ast, function(){return resolve(L_isErr)(L_result)(function(){return resolve(L_left)(function(){return resolve(L_errMsg)(L_result);});})(function(){return resolve(L_right)(L_result);});})});
  L_$F.leisureFunctionId = 1293;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1292;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1291;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1294;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedRunLine", 3, "countedRunLine file names countedLine = primBind (countedParseLine names countedLine)\r\n  \\ast . \\\\\r\n    wrapped = astFileWrap file ast\r\n    .\r\n    primBind (runAst (tail countedLine) wrapped)\r\n      \\res . primBind res\r\n        \\result . resultOfRun wrapped result", lazy((function(){
  var L_$F = function(L_file, L_names, L_countedLine) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_countedParseLine)(L_names, L_countedLine);}, lazy((function(){
  var L_$F = (function(L_ast){return (function(){  var L_wrapped;
  L_wrapped = function(){return resolve(L_astFileWrap)(L_file, L_ast);};

  return resolve(L_primBind)(function(){return resolve(L_runAst)(function(){return resolve(L_tail)(L_countedLine);})(L_wrapped);}, lazy((function(){
  var L_$F = (function(L_res){return resolve(L_primBind)(L_res, lazy((function(){
  var L_$F = (function(L_result){return resolve(L_resultOfRun)(L_wrapped, L_result)});
  L_$F.leisureFunctionId = 1297;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1296;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))})()});
  L_$F.leisureFunctionId = 1295;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1298;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("resultOfRun", 2, "resultOfRun wrapped result =\r\n  cons\r\n    wrapped\r\n    isErr result\r\n      left (errMsg result)\r\n      right result", lazy((function(){
  var L_$F = function(L_wrapped, L_result) {
    return L_checkPartial(L_$F, arguments) || resolve(L_cons)(L_wrapped, function(){return resolve(L_isErr)(L_result)(function(){return resolve(L_left)(function(){return resolve(L_errMsg)(L_result);});})(function(){return resolve(L_right)(L_result);});});
  };
  L_$F.leisureFunctionId = 1299;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("astFileWrap", 2, "astFileWrap file ast = anno 'filename' (basename file) ast", lazy((function(){
  var L_$F = function(L_file, L_ast) {
    return L_checkPartial(L_$F, arguments) || resolve(L_anno)("filename", function(){return resolve(L_basename)(L_file);}, L_ast);
  };
  L_$F.leisureFunctionId = 1300;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("basename", 1, "basename file = strReplace file (regexp '^(.*/)?([^/]+)$') '$2'", lazy((function(){
  var L_$F = (function(L_file){return resolve(L_strReplace)(L_file, function(){return resolve(L_regexp)("^(.*/)?([^/]+)$");}, "$2")});
  L_$F.leisureFunctionId = 1301;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("runLines", 2, "runLines names lines = lines\r\n  \\h t D . primBind (runLine 0 names h)\r\n    \\line . primBind (runLines names t)\r\n      \\rest . cons line rest\r\n  nil", lazy((function(){
  var L_$F = function(L_names, L_lines) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_lines))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_primBind)(function(){return resolve(L_runLine)(0, L_names, L_h);}, lazy((function(){
  var L_$F = (function(L_line){return resolve(L_primBind)(function(){return resolve(L_runLines)(L_names, L_t);}, lazy((function(){
  var L_$F = (function(L_rest){return resolve(L_cons)(L_line, L_rest)});
  L_$F.leisureFunctionId = 1306;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1305;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1304;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1303;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1302;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil);
  };
  L_$F.leisureFunctionId = 1307;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedRunLines", 4, "countedRunLines file names countedLines result = countedLines\r\n  \\h t D . primBind (countedRunLine file names h)\r\n    \\line . countedRunLines file names t (cons line result)\r\n  _reverse result", lazy((function(){
  var L_$F = function(L_file, L_names, L_countedLines, L_result) {
    return L_checkPartial(L_$F, arguments) || resolve(L_countedLines)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_primBind)(function(){return resolve(L_countedRunLine)(L_file, L_names, L_h);}, lazy((function(){
  var L_$F = (function(L_line){return resolve(L_countedRunLines)(L_file, L_names, L_t, function(){return resolve(L_cons)(L_line, L_result);})});
  L_$F.leisureFunctionId = 1311;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1310;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1309;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1308;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L__reverse)(L_result);});
  };
  L_$F.leisureFunctionId = 1312;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("runFile", 1, "runFile text = runNamedFile \"RUNFILE.lsr\" text", lazy((function(){
  var L_$F = (function(L_text){return resolve(L_runNamedFile)("RUNFILE.lsr", L_text)});
  L_$F.leisureFunctionId = 1313;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("runNamedFile", 2, "runNamedFile name text = \\\\\r\n  counted = countedLinesForFile name text\r\n  lines = _map tail counted\r\n  names = namesForLines lines\r\n  .\r\n  #countedRunLines name names counted\r\n  countedRunLines name names counted nil", lazy((function(){
  var L_$F = function(L_name, L_text) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_counted, L_lines, L_names;
  L_counted = function(){return resolve(L_countedLinesForFile)(L_name, L_text);};
  L_lines = function(){return resolve(L__map)(L_tail, L_counted);};
  L_names = function(){return resolve(L_namesForLines)(L_lines);};

  return resolve(L_countedRunLines)(L_name, L_names, L_counted, L_nil)})();
  };
  L_$F.leisureFunctionId = 1314;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("baseLoad", 1, "baseLoad file = primBind (readFile file)\r\n  \\result . result\r\n    \\err . err\r\n    \\contents . baseLoadString file contents", lazy((function(){
  var L_$F = (function(L_file){return resolve(L_primBind)(function(){return resolve(L_readFile)(L_file);}, lazy((function(){
  var L_$F = (function(L_result){return resolve(L_result)(lazy((function(){
  var L_$F = (function(L_err){return resolve(L_err)});
  L_$F.leisureFunctionId = 1317;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(lazy((function(){
  var L_$F = (function(L_contents){return resolve(L_baseLoadString)(L_file, L_contents)});
  L_$F.leisureFunctionId = 1318;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1316;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1315;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("baseLoadString", 2, "baseLoadString file contents = primBind (getValue 'activeTokenPacks')\r\n  \\activePacks . primBind resetStdTokenPacks\r\n    \\_ . primBind resetNameSpaceInfo\r\n      \\nsInfo . primBind (runNamedFile file contents)\r\n        \\result . primBind (setNameSpaceInfo nsInfo)\r\n          \\_ . primBind (isNil activePacks\r\n            resetStdTokenPacks\r\n            resetTokenPacks activePacks)\r\n            \\_ . result", lazy((function(){
  var L_$F = function(L_file, L_contents) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_getValue)("activeTokenPacks");}, lazy((function(){
  var L_$F = (function(L_activePacks){return resolve(L_primBind)(L_resetStdTokenPacks, lazy((function(){
  var L_$F = (function(L__){return resolve(L_primBind)(L_resetNameSpaceInfo, lazy((function(){
  var L_$F = (function(L_nsInfo){return resolve(L_primBind)(function(){return resolve(L_runNamedFile)(L_file, L_contents);}, lazy((function(){
  var L_$F = (function(L_result){return resolve(L_primBind)(function(){return resolve(L_setNameSpaceInfo)(L_nsInfo);}, lazy((function(){
  var L_$F = (function(L___0){return resolve(L_primBind)(function(){return resolve(L_isNil)(L_activePacks)(L_resetStdTokenPacks)(function(){return resolve(L_resetTokenPacks)(L_activePacks);});}, lazy((function(){
  var L_$F = (function(L___1){return resolve(L_result)});
  L_$F.leisureFunctionId = 1324;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1323;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1322;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1321;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1320;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1319;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1325;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("load", 1, "load file = primBind (baseLoad file)\r\n  \\result . \\\\\r\n    errs = _foldr (\\line results . tail line (\\er . cons er results) (\\x . results)) nil result\r\n    .\r\n    isNil errs\r\n      right true\r\n      left errs", lazy((function(){
  var L_$F = (function(L_file){return resolve(L_primBind)(function(){return resolve(L_baseLoad)(L_file);}, lazy((function(){
  var L_$F = (function(L_result){return (function(){  var L_errs;
  L_errs = function(){return resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_line){return (function(){
  var L_$F = (function(L_results){return resolve(L_tail)(L_line)(lazy((function(){
  var L_$F = (function(L_er){return resolve(L_cons)(L_er, L_results)});
  L_$F.leisureFunctionId = 1330;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(lazy((function(){
  var L_$F = (function(L_x){return resolve(L_results)});
  L_$F.leisureFunctionId = 1331;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1329;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1328;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil, L_result);};

  return resolve(L_isNil)(L_errs)(function(){return resolve(L_right)(L_true);})(function(){return resolve(L_left)(L_errs);})})()});
  L_$F.leisureFunctionId = 1327;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1326;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("require", 1, "require file = primBind (getValue 'requiredFiles')\r\n  \\files . _contains files file\r\n    right false\r\n    primBind (setValue 'requiredFiles' (cons file files))\r\n      \\_. primBind (load file)\r\n        \\result . result\r\n          \\x . left x\r\n          \\_ . right true", lazy((function(){
  var L_$F = (function(L_file){return resolve(L_primBind)(function(){return resolve(L_getValue)("requiredFiles");}, lazy((function(){
  var L_$F = (function(L_files){return resolve(L__contains)(L_files, L_file)(function(){return resolve(L_right)(L_false);})(function(){return resolve(L_primBind)(function(){return resolve(L_setValue)("requiredFiles", function(){return resolve(L_cons)(L_file, L_files);});}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_primBind)(function(){return resolve(L_load)(L_file);}, lazy((function(){
  var L_$F = (function(L_result){return resolve(L_result)(lazy((function(){
  var L_$F = (function(L_x){return resolve(L_left)(L_x)});
  L_$F.leisureFunctionId = 1336;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(lazy((function(){
  var L_$F = (function(L___0){return resolve(L_right)(L_true)});
  L_$F.leisureFunctionId = 1337;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1335;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1334;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})});
  L_$F.leisureFunctionId = 1333;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1332;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("scanFile", 1, "scanFile file = primBind (readFile file)\r\n  \\result . result\r\n    \\err . err\r\n      \\_ . primBind (runNamedFile file contents)\r\n        counted = countedLinesForFile name text\r\n        lines = _map tail counted\r\n        names = namesForLines lines\r\n        .\r\n        countedScanLines name names counted", lazy((function(){
  var L_$F = (function(L_file){return resolve(L_primBind)(function(){return resolve(L_readFile)(L_file);}, lazy((function(){
  var L_$F = (function(L_result){return resolve(L_result)(lazy((function(){
  var L_$F = (function(L_err){return resolve(L_err)(lazy((function(){
  var L_$F = (function(L__){return resolve(L_primBind)(function(){return resolve(L_runNamedFile)(L_file, L_contents);}, function(){return L$(resolve(L_counted))(L_$p, L_countedLinesForFile, L_name, L_text);})(function(){return L$(resolve(L_lines))(L_$p, L__map, L_tail, L_counted);})(function(){return L$(resolve(L_names))(L_$p, L_namesForLines, L_lines);})(L_$B)(function(){return resolve(L_countedScanLines)(L_name, L_names, L_counted);})});
  L_$F.leisureFunctionId = 1341;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1340;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1339;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1338;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("countedScanLines", 3, "countedScanLines file names countedLines = countedLines\r\n  \\h t D . primBind (countedScanLineM (head h) (tail h))\r\n    \\line . primBind (countedScanLines file names t)\r\n      \\rest . cons line rest\r\n  nil", lazy((function(){
  var L_$F = function(L_file, L_names, L_countedLines) {
    return L_checkPartial(L_$F, arguments) || resolve(L_countedLines)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_primBind)(function(){return resolve(L_countedScanLineM)(function(){return resolve(L_head)(L_h);}, function(){return resolve(L_tail)(L_h);});}, lazy((function(){
  var L_$F = (function(L_line){return resolve(L_primBind)(function(){return resolve(L_countedScanLines)(L_file, L_names, L_t);}, lazy((function(){
  var L_$F = (function(L_rest){return resolve(L_cons)(L_line, L_rest)});
  L_$F.leisureFunctionId = 1346;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1345;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1344;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1343;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1342;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil);
  };
  L_$F.leisureFunctionId = 1347;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("defTokenPack", 2, "defTokenPack name pack = primBind (getValue 'tokenPacks')\r\n  \\packs . setValue 'tokenPacks' (acons name pack packs)", lazy((function(){
  var L_$F = function(L_name, L_pack) {
    return L_checkPartial(L_$F, arguments) || resolve(L_primBind)(function(){return resolve(L_getValue)("tokenPacks");}, lazy((function(){
  var L_$F = (function(L_packs){return resolve(L_setValue)("tokenPacks", function(){return resolve(L_acons)(L_name, L_pack, L_packs);})});
  L_$F.leisureFunctionId = 1348;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1349;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("useTokenPack", 1, "useTokenPack name = primBind (getValue 'tokenPacks')\r\n  \\packs . primBind (getValue 'tokenGroups')\r\n    \\groups . primBind (getValue 'tokenList')\r\n      \\tokens . primBind (getValue 'activeTokenPacks')\r\n        \\activePacks . primBind (getValue 'parseFilters')\r\n          \\filters . assoc name packs\r\n            \\pack . \\\\\r\n              groupToks = _foldl (\\value el . el \\h t . cons h (cons t value)) nil (head (tail pack))\r\n              newToks = _sort (\\a b . > (strLen a) (strLen b)) (_append (head pack) (_append groupToks tokens))\r\n              .\r\n              primBind (setValue 'tokenList' newToks)\r\n                \\_ . primBind (setValue 'tokenGroups' (appendAlist (head (tail pack)) groups))\r\n                  \\_ . primBind (setValue 'parseFilters' (_append filters (head (tail (tail pack)))))\r\n                    \\_ . primBind (computeTokenPat newToks)\r\n                      \\_ . setValue 'activeTokenPacks' (cons name activePacks)\r\n            nil", lazy((function(){
  var L_$F = (function(L_name){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenPacks");}, lazy((function(){
  var L_$F = (function(L_packs){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenGroups");}, lazy((function(){
  var L_$F = (function(L_groups){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenList");}, lazy((function(){
  var L_$F = (function(L_tokens){return resolve(L_primBind)(function(){return resolve(L_getValue)("activeTokenPacks");}, lazy((function(){
  var L_$F = (function(L_activePacks){return resolve(L_primBind)(function(){return resolve(L_getValue)("parseFilters");}, lazy((function(){
  var L_$F = (function(L_filters){return resolve(L_assoc)(L_name, L_packs)(lazy((function(){
  var L_$F = (function(L_pack){return (function(){  var L_groupToks, L_newToks;
  L_groupToks = function(){return resolve(L__foldl)(lazy((function(){
  var L_$F = (function(L_value){return (function(){
  var L_$F = (function(L_el){return resolve(L_el)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(L_t, L_value);})});
  L_$F.leisureFunctionId = 1360;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1359;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1358;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1357;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil, function(){return resolve(L_head)(function(){return resolve(L_tail)(L_pack);});});};
  L_newToks = function(){return resolve(L__sort)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return resolve(L_$z)(function(){return resolve(L_strLen)(L_a);}, function(){return resolve(L_strLen)(L_b);})});
  L_$F.leisureFunctionId = 1362;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1361;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L__append)(function(){return resolve(L_head)(L_pack);}, function(){return resolve(L__append)(L_groupToks, L_tokens);});});};

  return resolve(L_primBind)(function(){return resolve(L_setValue)("tokenList", L_newToks);}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_primBind)(function(){return resolve(L_setValue)("tokenGroups", function(){return resolve(L_appendAlist)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_pack);});}, L_groups);});}, lazy((function(){
  var L_$F = (function(L___0){return resolve(L_primBind)(function(){return resolve(L_setValue)("parseFilters", function(){return resolve(L__append)(L_filters, function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_pack);});});});});}, lazy((function(){
  var L_$F = (function(L___1){return resolve(L_primBind)(function(){return resolve(L_computeTokenPat)(L_newToks);}, lazy((function(){
  var L_$F = (function(L___2){return resolve(L_setValue)("activeTokenPacks", function(){return resolve(L_cons)(L_name, L_activePacks);})});
  L_$F.leisureFunctionId = 1366;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1365;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1364;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1363;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))})()});
  L_$F.leisureFunctionId = 1356;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)});
  L_$F.leisureFunctionId = 1355;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1354;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1353;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1352;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1351;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1350;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("resetTokenPacks", 1, "resetTokenPacks packs = primBind (setValue 'tokenGroups' nil)\r\n  \\_ . primBind (setValue 'tokenList' nil)\r\n    \\_ . primBind (setValue 'activeTokenPacks' nil)\r\n      \\_ . primBind (setValue 'parseFilters' nil)\r\n        \\_ . _foldr1\r\n          \\packCmd result . primBind packCmd \\_ . result\r\n          _map useTokenPack packs", lazy((function(){
  var L_$F = (function(L_packs){return resolve(L_primBind)(function(){return resolve(L_setValue)("tokenGroups", L_nil);}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_primBind)(function(){return resolve(L_setValue)("tokenList", L_nil);}, lazy((function(){
  var L_$F = (function(L___0){return resolve(L_primBind)(function(){return resolve(L_setValue)("activeTokenPacks", L_nil);}, lazy((function(){
  var L_$F = (function(L___1){return resolve(L_primBind)(function(){return resolve(L_setValue)("parseFilters", L_nil);}, lazy((function(){
  var L_$F = (function(L___2){return resolve(L__foldr1)(lazy((function(){
  var L_$F = (function(L_packCmd){return (function(){
  var L_$F = (function(L_result){return resolve(L_primBind)(L_packCmd, lazy((function(){
  var L_$F = (function(L___3){return resolve(L_result)});
  L_$F.leisureFunctionId = 1374;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1373;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1372;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L__map)(L_useTokenPack, L_packs);})});
  L_$F.leisureFunctionId = 1371;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1370;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1369;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1368;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1367;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("resetStdTokenPacks", 0, "resetStdTokenPacks = primBind (getValue 'stdTokenPacks')\r\n  \\stds . primBind (resetTokenPacks stds)\r\n    \\_ . setValue 'activeTokenPacks' nil", function(){return resolve(L_primBind)(function(){return resolve(L_getValue)("stdTokenPacks");}, lazy((function(){
  var L_$F = (function(L_stds){return resolve(L_primBind)(function(){return resolve(L_resetTokenPacks)(L_stds);}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_setValue)("activeTokenPacks", L_nil)});
  L_$F.leisureFunctionId = 1376;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1375;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})},
    function(){return resolve(L_newDefine)("addStdTokenPacks", 1, "addStdTokenPacks morePacks = primBind (getValue 'stdTokenPacks')\r\n  \\stds . setValue 'stdTokenPacks' (_append stds morePacks)", lazy((function(){
  var L_$F = (function(L_morePacks){return resolve(L_primBind)(function(){return resolve(L_getValue)("stdTokenPacks");}, lazy((function(){
  var L_$F = (function(L_stds){return resolve(L_setValue)("stdTokenPacks", function(){return resolve(L__append)(L_stds, L_morePacks);})});
  L_$F.leisureFunctionId = 1378;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1377;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("addParseFilter", 1, "addParseFilter filt = primBind (getValue 'parseFilters')\r\n  \\filters . setValue 'parseFilters' (_append filters (cons filt nil))", lazy((function(){
  var L_$F = (function(L_filt){return resolve(L_primBind)(function(){return resolve(L_getValue)("parseFilters");}, lazy((function(){
  var L_$F = (function(L_filters){return resolve(L_setValue)("parseFilters", function(){return resolve(L__append)(L_filters, function(){return resolve(L_cons)(L_filt, L_nil);});})});
  L_$F.leisureFunctionId = 1380;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1379;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("d", 3, "d label value expr = log (strCat (cons label (cons value nil))) expr", lazy((function(){
  var L_$F = function(L_label, L_value, L_expr) {
    return L_checkPartial(L_$F, arguments) || resolve(L_log)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(L_label, function(){return resolve(L_cons)(L_value, L_nil);});});}, L_expr);
  };
  L_$F.leisureFunctionId = 1381;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("dd", 2, "dd label arg = d label arg arg", lazy((function(){
  var L_$F = function(L_label, L_arg) {
    return L_checkPartial(L_$F, arguments) || resolve(L_d)(L_label, L_arg, L_arg);
  };
  L_$F.leisureFunctionId = 1382;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("testParse", 1, "testParse str = countedParseLine nil (head (countedLinesForFile 'parse' str))", lazy((function(){
  var L_$F = (function(L_str){return resolve(L_countedParseLine)(L_nil, function(){return resolve(L_head)(function(){return resolve(L_countedLinesForFile)("parse", L_str);});})});
  L_$F.leisureFunctionId = 1383;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_setValue)("macroDefs", L_nil)},
    function(){return resolve(L_setValue)("requiredFiles", L_nil)},
    function(){return resolve(L_setValue)("tokenPacks", L_nil)},
    function(){return resolve(L_setValue)("activeTokenPacks", L_nil)},
    function(){return resolve(L_setValue)("stdTokenPacks", function(){return resolve(L_cons)("std", L_nil);})},
    function(){return resolve(L_setValue)("parser_funcProps", L_nil)},
    function(){return resolve(L_defTokenPack)("std", function(){return resolve(L_cons)(function(){return resolve(L_cons)(".", function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)("\\\\", function(){return resolve(L_cons)("\\@", L_nil);});});});}, function(){return resolve(L_cons)(function(){return resolve(L_acons)("(", ")", L_nil);}, function(){return resolve(L_cons)(L_nil, L_nil);});});})},
    function(){return resolve(L_resetStdTokenPacks)},
    function(){return resolve(L_setNameSpace)("core")},
    function(){return resolve(L__declareType)("triple", 0)},
    function(){return resolve(L_defMacro)("withRecur", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("_withRecur", function(){return resolve(L_cons)(L_list, L_nil);})});
  L_$F.leisureFunctionId = 1384;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("recur", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("_recur", function(){return resolve(L_cons)(L_list, L_nil);})});
  L_$F.leisureFunctionId = 1385;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("any", 2, "any f l = find f l (\\el . true) false", lazy((function(){
  var L_$F = function(L_f, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_find)(L_f)(L_l)(lazy((function(){
  var L_$F = (function(L_el){return resolve(L_true)});
  L_$F.leisureFunctionId = 1386;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_false);
  };
  L_$F.leisureFunctionId = 1387;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("all", 2, "all f l = not (any (compose not f) l)", lazy((function(){
  var L_$F = function(L_f, L_l) {
    return L_checkPartial(L_$F, arguments) || resolve(L_not)(function(){return resolve(L_any)(function(){return resolve(L_compose)(L_not, L_f);}, L_l);});
  };
  L_$F.leisureFunctionId = 1388;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("takeUpto", 2, "takeUpto func list = \\\\\r\n  ret = subtakeUpto func list\r\n  .\r\n  == ret false\r\n    nil\r\n    ret", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_ret;
  L_ret = function(){return resolve(L_subtakeUpto)(L_func, L_list);};

  return resolve(L_$p$p)(L_ret, L_false)(L_nil)(L_ret)})();
  };
  L_$F.leisureFunctionId = 1389;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("subtakeUpto", 2, "subtakeUpto func list = \\\\\r\n  ret = subtakeUpto func (tail list)\r\n  .\r\n  isNil list\r\n    false\r\n    func (head list)\r\n      nil\r\n      == ret false\r\n        false\r\n        cons (head list) ret", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_ret;
  L_ret = function(){return resolve(L_subtakeUpto)(L_func, function(){return resolve(L_tail)(L_list);});};

  return resolve(L_isNil)(L_list)(L_false)(function(){return L$(resolve(L_func))(function(){return resolve(L_head)(L_list);}, L_nil, function(){return resolve(L_$p$p)(L_ret, L_false)(L_false)(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_list);}, L_ret);});});})})();
  };
  L_$F.leisureFunctionId = 1390;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("dropAfter", 2, "dropAfter func list = isNil list\r\n  nil\r\n  func (head list)\r\n    tail list\r\n    dropAfter func (tail list)", lazy((function(){
  var L_$F = function(L_func, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_list)(L_nil)(function(){return L$(resolve(L_func))(function(){return resolve(L_head)(L_list);}, function(){return resolve(L_tail)(L_list);}, function(){return resolve(L_dropAfter)(L_func, function(){return resolve(L_tail)(L_list);});});});
  };
  L_$F.leisureFunctionId = 1391;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("doall", 1, "doall x = isNil x\r\n  unit\r\n  _foldr1 (\\el res . primBind el \\_ . res) x", lazy((function(){
  var L_$F = (function(L_x){return resolve(L_isNil)(L_x)(L_unit)(function(){return resolve(L__foldr1)(lazy((function(){
  var L_$F = (function(L_el){return (function(){
  var L_$F = (function(L_res){return resolve(L_primBind)(L_el, lazy((function(){
  var L_$F = (function(L__){return resolve(L_res)});
  L_$F.leisureFunctionId = 1395;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1394;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1393;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_x);})});
  L_$F.leisureFunctionId = 1392;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("aconsf", 3, "aconsf key value list = acons key value (aremove key list)", lazy((function(){
  var L_$F = function(L_key, L_value, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_acons)(L_key, L_value, function(){return resolve(L_aremove)(L_key, L_list);});
  };
  L_$F.leisureFunctionId = 1396;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("aremove", 2, "aremove key list = isNil list\r\n  nil\r\n  eq (head (head list)) key\r\n    aremove key (tail list)\r\n    aconsPair (head list) (aremove key (tail list))", lazy((function(){
  var L_$F = function(L_key, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isNil)(L_list)(L_nil)(function(){return resolve(L_eq)(function(){return resolve(L_head)(function(){return resolve(L_head)(L_list);});}, L_key)(function(){return resolve(L_aremove)(L_key, function(){return resolve(L_tail)(L_list);});})(function(){return resolve(L_aconsPair)(function(){return resolve(L_head)(L_list);}, function(){return resolve(L_aremove)(L_key, function(){return resolve(L_tail)(L_list);});});});});
  };
  L_$F.leisureFunctionId = 1397;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_addTokenGroup)("[", "]")},
    function(){return resolve(L_addToken)("|")},
    function(){return resolve(L_newDefine)("listifyOp", 3, "listifyOp op list last = list\r\n  \\h t D . isTokenString h '|'\r\n    cons t nil\r\n    cons (cons op (cons h (listifyOp op t last))) nil\r\n  cons last nil", lazy((function(){
  var L_$F = function(L_op, L_list, L_last) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){return resolve(L_cons)(L_t, L_nil);})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_op, function(){return resolve(L_cons)(L_h, function(){return resolve(L_listifyOp)(L_op, L_t, L_last);});});}, L_nil);})});
  L_$F.leisureFunctionId = 1400;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1399;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1398;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_cons)(L_last, L_nil);});
  };
  L_$F.leisureFunctionId = 1401;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("listify", 1, "listify list = listifyOp 'cons' list 'nil'", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_listifyOp)("cons", L_list, "nil")});
  L_$F.leisureFunctionId = 1402;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("listFilter", 1, "listFilter code = primBind (getValue 'listMacros')\r\n  \\listMacros . filterApplies code \\list . list \\h t .\r\n    and (isToken h) (_contains listMacros (tokenString h))\r\n      listFilterTail list\r\n      list", lazy((function(){
  var L_$F = (function(L_code){return resolve(L_primBind)(function(){return resolve(L_getValue)("listMacros");}, lazy((function(){
  var L_$F = (function(L_listMacros){return resolve(L_filterApplies)(L_code, lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_and)(function(){return resolve(L_isToken)(L_h);}, function(){return resolve(L__contains)(L_listMacros, function(){return resolve(L_tokenString)(L_h);});})(function(){return resolve(L_listFilterTail)(L_list);})(L_list)});
  L_$F.leisureFunctionId = 1407;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1406;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1405;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1404;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1403;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("listFilterTail", 1, "listFilterTail list = list\r\n  \\h t D . isTokenString h '|'\r\n    > (length t) 2\r\n      cons h (cons (removeLast t) (cons (last t) nil))\r\n      list\r\n    cons h (listFilterTail t)\r\n  nil", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){return resolve(L_$z)(function(){return resolve(L_length)(L_t);}, 2)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(function(){return resolve(L_removeLast)(L_t);}, function(){return resolve(L_cons)(function(){return resolve(L_last)(L_t);}, L_nil);});});})(L_list);})(function(){return resolve(L_cons)(L_h, function(){return resolve(L_listFilterTail)(L_t);});})});
  L_$F.leisureFunctionId = 1411;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1410;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1409;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)});
  L_$F.leisureFunctionId = 1408;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("filterApplies", 2, "filterApplies code func = isParens code\r\n  code \\start end contents . parens start end (filterApplies contents func)\r\n  isCons code\r\n    \\\\\r\n      filtered = filterApplyElements code func\r\n      .\r\n      and (isCons filtered) (isBlockStart (head filtered))\r\n        filtered\r\n        func filtered\r\n    code", lazy((function(){
  var L_$F = function(L_code, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isParens)(L_code)(function(){return resolve(L_code)(lazy((function(){
  var L_$F = (function(L_start){return (function(){
  var L_$F = (function(L_end){return (function(){
  var L_$F = (function(L_contents){return resolve(L_parens)(L_start, L_end, function(){return resolve(L_filterApplies)(L_contents, L_func);})});
  L_$F.leisureFunctionId = 1414;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1413;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1412;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_isCons)(L_code)(function(){return (function(){  var L_filtered;
  L_filtered = function(){return resolve(L_filterApplyElements)(L_code, L_func);};

  return resolve(L_and)(function(){return resolve(L_isCons)(L_filtered);}, function(){return resolve(L_isBlockStart)(function(){return resolve(L_head)(L_filtered);});})(L_filtered)(function(){return resolve(L_func)(L_filtered);})})();})(L_code);});
  };
  L_$F.leisureFunctionId = 1415;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("filterApplyElements", 2, "filterApplyElements code func = code\r\n  \\h t D . isBlockStart h\r\n    cons h (filterBlock h t func)\r\n    cons (filterApplies h func)\r\n      and (isCons t) (isBlockStart (head t))\r\n        cons (filterApplyElements t func) nil\r\n        filterApplyElements t func\r\n  nil", lazy((function(){
  var L_$F = function(L_code, L_func) {
    return L_checkPartial(L_$F, arguments) || L$(resolve(L_code))(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isBlockStart)(L_h)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_filterBlock)(L_h, L_t, L_func);});})(function(){return resolve(L_cons)(function(){return resolve(L_filterApplies)(L_h, L_func);}, function(){return resolve(L_and)(function(){return resolve(L_isCons)(L_t);}, function(){return resolve(L_isBlockStart)(function(){return resolve(L_head)(L_t);});})(function(){return resolve(L_cons)(function(){return resolve(L_filterApplyElements)(L_t, L_func);}, L_nil);})(function(){return resolve(L_filterApplyElements)(L_t, L_func);});});})});
  L_$F.leisureFunctionId = 1418;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1417;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1416;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_nil);
  };
  L_$F.leisureFunctionId = 1419;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("filterBlock", 3, "filterBlock type code func = isTokenString type '\\\\'\r\n  filterLambda code func\r\n  filterLet code func", lazy((function(){
  var L_$F = function(L_type, L_code, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isTokenString)(L_type, "\\")(function(){return resolve(L_filterLambda)(L_code, L_func);})(function(){return resolve(L_filterLet)(L_code, L_func);});
  };
  L_$F.leisureFunctionId = 1420;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("filterLet", 2, "filterLet code func = code \\h t . isTokenString h '.'\r\n  cons h (filterApplies t func)\r\n  cons (filterLetBinding h func)\r\n    filterLet t func", lazy((function(){
  var L_$F = function(L_code, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_code)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_isTokenString)(L_h, ".")(function(){return resolve(L_cons)(L_h, function(){return resolve(L_filterApplies)(L_t, L_func);});})(function(){return resolve(L_cons)(function(){return resolve(L_filterLetBinding)(L_h, L_func);}, function(){return resolve(L_filterLet)(L_t, L_func);});})});
  L_$F.leisureFunctionId = 1422;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1421;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1423;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("filterLetBinding", 2, "filterLetBinding code func = isParens code\r\n  setParens code \\contents . filterLetBinding contents func\r\n  isCons code\r\n    code \\h t . cons h\r\n      isTokenString h '='\r\n        filterApplies t func\r\n        filterLetBinding t func\r\n    code", lazy((function(){
  var L_$F = function(L_code, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isParens)(L_code)(function(){return resolve(L_setParens)(L_code, lazy((function(){
  var L_$F = (function(L_contents){return resolve(L_filterLetBinding)(L_contents, L_func)});
  L_$F.leisureFunctionId = 1424;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_isCons)(L_code)(function(){return resolve(L_code)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_cons)(L_h, function(){return resolve(L_isTokenString)(L_h, "=")(function(){return resolve(L_filterApplies)(L_t, L_func);})(function(){return resolve(L_filterLetBinding)(L_t, L_func);});})});
  L_$F.leisureFunctionId = 1426;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1425;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(L_code);});
  };
  L_$F.leisureFunctionId = 1427;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("filterLambda", 2, "filterLambda code func = code \\h t . cons h\r\n  isTokenString h '.'\r\n    filterApplies t func\r\n    filterLambda t func", lazy((function(){
  var L_$F = function(L_code, L_func) {
    return L_checkPartial(L_$F, arguments) || resolve(L_code)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_cons)(L_h, function(){return resolve(L_isTokenString)(L_h, ".")(function(){return resolve(L_filterApplies)(L_t, L_func);})(function(){return resolve(L_filterLambda)(L_t, L_func);});})});
  L_$F.leisureFunctionId = 1429;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1428;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1430;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_listify)(L_h)});
  L_$F.leisureFunctionId = 1433;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1432;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1431;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_setValue)("listMacros", function(){return resolve(L_cons)("[", function(){return resolve(L_cons)("{", L_nil);});})},
    function(){return resolve(L_addParseFilter)(L_listFilter)},
    function(){return resolve(L_addTokenGroup)("{", "}")},
    function(){return resolve(L_defMacro)("{", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L_listifyOp)("aconsPair", L_h, "nil")});
  L_$F.leisureFunctionId = 1436;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1435;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1434;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defTokenPack)("list", function(){return resolve(L_cons)(function(){return resolve(L_cons)("|", function(){return resolve(L_cons)("=", L_nil);});}, function(){return resolve(L_cons)(function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("{", "}");}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("[", "]");}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("or[", "]");}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("and[", "]");}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("concat[", "]");}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("print[", "]");}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("concatFlat[", "]");}, L_nil);});});});});});});}, function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_listFilter, L_nil);}, L_nil);});});})},
    function(){return resolve(L_addTokenGroup)("or[", "]")},
    function(){return resolve(L_addTokenGroup)("and[", "]")},
    function(){return resolve(L_addTokenGroup)("concat[", "]")},
    function(){return resolve(L_addTokenGroup)("print[", "]")},
    function(){return resolve(L_addTokenGroup)("concatFlat[", "]")},
    function(){return resolve(L_newDefine)("listMacroFoldOp", 3, "listMacroFoldOp op emptyCase list = list \\h t . _foldr\r\n    \\case result . [op case result]\r\n    emptyCase\r\n    h", lazy((function(){
  var L_$F = function(L_op, L_emptyCase, L_list) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return resolve(L__foldr)(lazy((function(){
  var L_$F = (function(L_case){return (function(){
  var L_$F = (function(L_result){return resolve(L_cons)(L_op, function(){return resolve(L_cons)(L_case, function(){return resolve(L_cons)(L_result, L_nil);});})});
  L_$F.leisureFunctionId = 1440;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1439;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_emptyCase, L_h)});
  L_$F.leisureFunctionId = 1438;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1437;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));
  };
  L_$F.leisureFunctionId = 1441;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("or[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_listMacroFoldOp)("or", "false", L_list)});
  L_$F.leisureFunctionId = 1442;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("and[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_listMacroFoldOp)("and", "true", L_list)});
  L_$F.leisureFunctionId = 1443;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("print[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("print", function(){return resolve(L_cons)(function(){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list);});}, L_nil);}, L_nil);});}, L_nil);})});
  L_$F.leisureFunctionId = 1444;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("concat[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list);});}, L_nil);}, L_nil);})});
  L_$F.leisureFunctionId = 1445;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)("concatFlat[", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)("flatten", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list);});}, L_nil);}, L_nil);});}, L_nil);})});
  L_$F.leisureFunctionId = 1446;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("infix", 1, "infix code = primBind (getValue 'infixPrecedence')\r\n  \\prec . primBind (getValue 'infixRightAssociative')\r\n    \\right . primBind (getValue 'tokenGroups')\r\n      \\groups . filterApplies\r\n        code\r\n        \\expr . infixRearrange prec right (_map (\\cell . tail cell) groups) expr", lazy((function(){
  var L_$F = (function(L_code){return resolve(L_primBind)(function(){return resolve(L_getValue)("infixPrecedence");}, lazy((function(){
  var L_$F = (function(L_prec){return resolve(L_primBind)(function(){return resolve(L_getValue)("infixRightAssociative");}, lazy((function(){
  var L_$F = (function(L_right){return resolve(L_primBind)(function(){return resolve(L_getValue)("tokenGroups");}, lazy((function(){
  var L_$F = (function(L_groups){return resolve(L_filterApplies)(L_code, lazy((function(){
  var L_$F = (function(L_expr){return resolve(L_infixRearrange)(L_prec, L_right, function(){return resolve(L__map)(lazy((function(){
  var L_$F = (function(L_cell){return resolve(L_tail)(L_cell)});
  L_$F.leisureFunctionId = 1452;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_groups);}, L_expr)});
  L_$F.leisureFunctionId = 1451;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1450;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1449;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1448;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1447;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("infixRearrange", 4, "infixRearrange prec right closes list = \\\\\r\n  len = length list\r\n  head1 = head list\r\n  tail1 = tail list\r\n  head2 = head tail1\r\n  tail2 = tail tail1\r\n  head3 = head tail2\r\n  opPrec = getPrec prec head2\r\n  .\r\n  < len 2\r\n    list\r\n    isInfix opPrec head1 head2 len\r\n      or (== len 2) (not (isInfixArg closes head3))\r\n        [[head2 head1] | tail2]\r\n        infixRearrange prec right closes (absorbArgument opPrec prec right closes head1 head2 tail2 head3 (- len 2))\r\n      [head1 | infixRearrange prec right closes tail1]", lazy((function(){
  var L_$F = function(L_prec, L_right, L_closes, L_list) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_len, L_head1, L_tail1, L_head2, L_tail2, L_head3, L_opPrec;
  L_len = function(){return resolve(L_length)(L_list);};
  L_head1 = function(){return resolve(L_head)(L_list);};
  L_tail1 = function(){return resolve(L_tail)(L_list);};
  L_head2 = function(){return resolve(L_head)(L_tail1);};
  L_tail2 = function(){return resolve(L_tail)(L_tail1);};
  L_head3 = function(){return resolve(L_head)(L_tail2);};
  L_opPrec = function(){return resolve(L_getPrec)(L_prec, L_head2);};

  return resolve(L_$y)(L_len, 2)(L_list)(function(){return resolve(L_isInfix)(L_opPrec, L_head1, L_head2, L_len)(function(){return resolve(L_or)(function(){return resolve(L_$p$p)(L_len, 2);}, function(){return resolve(L_not)(function(){return resolve(L_isInfixArg)(L_closes, L_head3);});})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_head2, function(){return resolve(L_cons)(L_head1, L_nil);});}, L_tail2);})(function(){return resolve(L_infixRearrange)(L_prec, L_right, L_closes, function(){return resolve(L_absorbArgument)(L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, function(){return resolve(L_$_)(L_len, 2);});});});})(function(){return resolve(L_cons)(L_head1, function(){return resolve(L_infixRearrange)(L_prec, L_right, L_closes, L_tail1);});});})})();
  };
  L_$F.leisureFunctionId = 1453;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("absorbArgument", 9, "absorbArgument opPrec prec right closes head1 head2 tail2 head3 len = \\\\\r\n  tail3 = tail tail2\r\n  head4 = head tail3\r\n  tail4 = tail tail3\r\n  head5 = head tail4\r\n  .\r\n  infixShouldEatNext opPrec prec (_contains right (strTokenString head2)) head3 head4 head5 closes len\r\n    [head1 head2 | absorbArgument (getPrec prec head4) prec right closes head3 head4 tail4 head5 (- len 2)]\r\n    [[head2 head1 head3] | tail3]", lazy((function(){
  var L_$F = function(L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, L_len) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_tail3, L_head4, L_tail4, L_head5;
  L_tail3 = function(){return resolve(L_tail)(L_tail2);};
  L_head4 = function(){return resolve(L_head)(L_tail3);};
  L_tail4 = function(){return resolve(L_tail)(L_tail3);};
  L_head5 = function(){return resolve(L_head)(L_tail4);};

  return resolve(L_infixShouldEatNext)(L_opPrec, L_prec, function(){return resolve(L__contains)(L_right, function(){return resolve(L_strTokenString)(L_head2);});}, L_head3, L_head4, L_head5, L_closes, L_len)(function(){return resolve(L_cons)(L_head1, function(){return resolve(L_cons)(L_head2, function(){return resolve(L_absorbArgument)(function(){return resolve(L_getPrec)(L_prec, L_head4);}, L_prec, L_right, L_closes, L_head3, L_head4, L_tail4, L_head5, function(){return resolve(L_$_)(L_len, 2);});});});})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_head2, function(){return resolve(L_cons)(L_head1, function(){return resolve(L_cons)(L_head3, L_nil);});});}, L_tail3);})})();
  };
  L_$F.leisureFunctionId = 1454;
  L_$F.leisureLength = 9;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isInfixArg", 2, "isInfixArg closes item = or[\r\n  isParens item\r\n  isCons item\r\n  and[\r\n    isToken item\r\n    not (_contains closes (tokenString item))\r\n    not (isBlockStart item)]]", lazy((function(){
  var L_$F = function(L_closes, L_item) {
    return L_checkPartial(L_$F, arguments) || resolve(L_or)(function(){return resolve(L_isParens)(L_item);}, function(){return resolve(L_or)(function(){return resolve(L_isCons)(L_item);}, function(){return resolve(L_or)(function(){return resolve(L_and)(function(){return resolve(L_isToken)(L_item);}, function(){return resolve(L_and)(function(){return resolve(L_not)(function(){return resolve(L__contains)(L_closes, function(){return resolve(L_tokenString)(L_item);});});}, function(){return resolve(L_and)(function(){return resolve(L_not)(function(){return resolve(L_isBlockStart)(L_item);});}, L_true);});});}, L_false);});});
  };
  L_$F.leisureFunctionId = 1455;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("isInfix", 4, "isInfix opPrec head1 head2 len = and[\r\n  > len 1\r\n  > opPrec -1\r\n  isInfixArg nil head1]", lazy((function(){
  var L_$F = function(L_opPrec, L_head1, L_head2, L_len) {
    return L_checkPartial(L_$F, arguments) || resolve(L_and)(function(){return resolve(L_$z)(L_len, 1);}, function(){return resolve(L_and)(function(){return resolve(L_$z)(L_opPrec, -1);}, function(){return resolve(L_and)(function(){return resolve(L_isInfixArg)(L_nil, L_head1);}, L_true);});});
  };
  L_$F.leisureFunctionId = 1456;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("getPrec", 2, "getPrec prec token = \\\\\r\n  str = tokenString token\r\n  .\r\n  isToken token\r\n    findIndex (\\level . _contains level str) prec\r\n    -1", lazy((function(){
  var L_$F = function(L_prec, L_token) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_str;
  L_str = function(){return resolve(L_tokenString)(L_token);};

  return resolve(L_isToken)(L_token)(function(){return resolve(L_findIndex)(lazy((function(){
  var L_$F = (function(L_level){return resolve(L__contains)(L_level, L_str)});
  L_$F.leisureFunctionId = 1457;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_prec);})(-1)})();
  };
  L_$F.leisureFunctionId = 1458;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("infixShouldEatNext", 8, "infixShouldEatNext opPrec prec isRight curArg nextOp nextArg closes len = \\\\\r\n  nextPrec = getPrec prec nextOp\r\n  .\r\n  and[\r\n    > len 2\r\n    isInfix nextPrec curArg nextOp len\r\n    or (> opPrec nextPrec) (and (== opPrec nextPrec) isRight)\r\n    isInfixArg closes nextArg]", lazy((function(){
  var L_$F = function(L_opPrec, L_prec, L_isRight, L_curArg, L_nextOp, L_nextArg, L_closes, L_len) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_nextPrec;
  L_nextPrec = function(){return resolve(L_getPrec)(L_prec, L_nextOp);};

  return resolve(L_and)(function(){return resolve(L_$z)(L_len, 2);}, function(){return resolve(L_and)(function(){return resolve(L_isInfix)(L_nextPrec, L_curArg, L_nextOp, L_len);}, function(){return resolve(L_and)(function(){return resolve(L_or)(function(){return resolve(L_$z)(L_opPrec, L_nextPrec);}, function(){return resolve(L_and)(function(){return resolve(L_$p$p)(L_opPrec, L_nextPrec);}, L_isRight);});}, function(){return resolve(L_and)(function(){return resolve(L_isInfixArg)(L_closes, L_nextArg);}, L_true);});});})})();
  };
  L_$F.leisureFunctionId = 1459;
  L_$F.leisureLength = 8;
  return L_$F;
})()))},
    function(){return resolve(L_defMacro)(":", lazy((function(){
  var L_$F = (function(L_list){return resolve(L_cons)("cons", L_list)});
  L_$F.leisureFunctionId = 1460;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("iprec", 0, "iprec = [['*' '/' '%'] ['+' '-'] [':'] ['<' '>' '<=' '>='] ['==' '!='] ['&&' '||']]", function(){return resolve(L_cons)(function(){return resolve(L_cons)("*", function(){return resolve(L_cons)("/", function(){return resolve(L_cons)("%", L_nil);});});}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("+", function(){return resolve(L_cons)("-", L_nil);});}, function(){return resolve(L_cons)(function(){return resolve(L_cons)(":", L_nil);}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("<", function(){return resolve(L_cons)(">", function(){return resolve(L_cons)("<=", function(){return resolve(L_cons)(">=", L_nil);});});});}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("==", function(){return resolve(L_cons)("!=", L_nil);});}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("&&", function(){return resolve(L_cons)("||", L_nil);});}, L_nil);});});});});});})},
    function(){return resolve(L_newDefine)("rightAssoc", 0, "rightAssoc = [':']", function(){return resolve(L_cons)(":", L_nil);})},
    function(){return resolve(L_newDefine)("setPrecedenceLevels", 1, "setPrecedenceLevels levels = primBind\r\n  setValue 'infixPrecedence' levels\r\n  \\_ . doall (_map addInfixProp (flatten levels))", lazy((function(){
  var L_$F = (function(L_levels){return resolve(L_primBind)(function(){return resolve(L_setValue)("infixPrecedence", L_levels);}, lazy((function(){
  var L_$F = (function(L__){return resolve(L_doall)(function(){return resolve(L__map)(L_addInfixProp, function(){return resolve(L_flatten)(L_levels);});})});
  L_$F.leisureFunctionId = 1462;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1461;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("addInfixProp", 1, "addInfixProp funcName = getFunction funcName\r\n  \\func . setProperty func 'infix' true\r\n  nil", lazy((function(){
  var L_$F = (function(L_funcName){return resolve(L_getFunction)(L_funcName)(lazy((function(){
  var L_$F = (function(L_func){return resolve(L_setProperty)(L_func, "infix", L_true)});
  L_$F.leisureFunctionId = 1464;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(L_nil)});
  L_$F.leisureFunctionId = 1463;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_setPrecedenceLevels)(L_iprec)},
    function(){return resolve(L_setValue)("infixRightAssociative", L_rightAssoc)},
    function(){return resolve(L_defTokenPack)("infix", function(){return resolve(L_cons)(function(){return resolve(L_flatten)(L_iprec);}, function(){return resolve(L_cons)(L_nil, function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_infix, L_nil);}, L_nil);});});})},
    function(){return resolve(L_useTokenPack)("infix")},
    function(){return resolve(L_defMacro)("do", lazy((function(){
  var L_$F = (function(L_list){return resolve(L__withRecur)(function(){return resolve(L_handleDo)(L_list, L_false, L_id);})});
  L_$F.leisureFunctionId = 1465;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("handleDo", 3, "handleDo list inLet cont = list\r\n  \\h t D . isNil t\r\n    cont (inLet ['.' h] [h])\r\n    \\\\\r\n      next = doClause (stripParens h) h nil inLet\r\n      newInLet = head next\r\n      chain = tail next\r\n      .\r\n      recur handleDo t newInLet \\rest . cont (chain rest)\r\n  cont nil", lazy((function(){
  var L_$F = function(L_list, L_inLet, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_list)(lazy((function(){
  var L_$F = (function(L_h){return (function(){
  var L_$F = (function(L_t){return (function(){
  var L_$F = (function(L_D){return resolve(L_isNil)(L_t)(function(){return resolve(L_cont)(function(){return L$(resolve(L_inLet))(function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(L_h, L_nil);});}, function(){return resolve(L_cons)(L_h, L_nil);});});})(function(){return (function(){  var L_next, L_newInLet, L_chain;
  L_next = function(){return resolve(L_doClause)(function(){return resolve(L_stripParens)(L_h);}, L_h, L_nil, L_inLet);};
  L_newInLet = function(){return resolve(L_head)(L_next);};
  L_chain = function(){return resolve(L_tail)(L_next);};

  return resolve(L__recur)(function(){return resolve(L_handleDo)(L_t, L_newInLet, lazy((function(){
  var L_$F = (function(L_rest){return resolve(L_cont)(function(){return resolve(L_chain)(L_rest);})});
  L_$F.leisureFunctionId = 1469;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})})();})});
  L_$F.leisureFunctionId = 1468;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1467;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1466;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))(function(){return resolve(L_cont)(L_nil);});
  };
  L_$F.leisureFunctionId = 1470;
  L_$F.leisureLength = 3;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("doClause", 4, "doClause steppingClause clause prefix inLet = \\\\\r\n  makeBind var value = cons false \\rest . inLet (cons '.') id\r\n    ['bind' value ['\\\\' var '.' | rest]]\r\n  h = head steppingClause\r\n  t = tail steppingClause\r\n  .\r\n  isCons steppingClause\r\n    isTokenString h '='\r\n      cons true \\rest . inLet\r\n        [clause | rest]\r\n        ['\\\\\\\\' clause | rest]\r\n      isTokenString h '<-'\r\n        isNil t\r\n          parseErr \"No value in do-clause: \" clause\r\n          prefix\r\n            \\ph pt D . isNil pt\r\n              makeBind (isNil prefix '_' (head prefix)) t\r\n              any (\\el . not (or (isString el) (isToken el))) prefix\r\n                parseErr \"Non-variable for bind in do clause: \" clause\r\n                cons false \\rest . inLet (cons '.') id\r\n                  ['bind' t (_append ['\\\\' | prefix] ['.' | rest])]\r\n            makeBind '_' t\r\n        doClause t clause [h | prefix] inLet\r\n    makeBind '_' clause", lazy((function(){
  var L_$F = function(L_steppingClause, L_clause, L_prefix, L_inLet) {
    return L_checkPartial(L_$F, arguments) || (function(){  var L_makeBind, L_h, L_t;
  L_makeBind = function(){return (function(){
  var L_$F = (function(L_var){return (function(){
  var L_$F = (function(L_value){return resolve(L_cons)(L_false, lazy((function(){
  var L_$F = (function(L_rest){return L$(resolve(L_inLet))(function(){return resolve(L_cons)(".");}, L_id, function(){return resolve(L_cons)("bind", function(){return resolve(L_cons)(L_value, function(){return resolve(L_cons)(function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)(L_var, function(){return resolve(L_cons)(".", L_rest);});});}, L_nil);});});})});
  L_$F.leisureFunctionId = 1473;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1472;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1471;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})();};
  L_h = function(){return resolve(L_head)(L_steppingClause);};
  L_t = function(){return resolve(L_tail)(L_steppingClause);};

  return resolve(L_isCons)(L_steppingClause)(function(){return resolve(L_isTokenString)(L_h, "=")(function(){return resolve(L_cons)(L_true, lazy((function(){
  var L_$F = (function(L_rest){return L$(resolve(L_inLet))(function(){return resolve(L_cons)(L_clause, L_rest);}, function(){return resolve(L_cons)("\\\\", function(){return resolve(L_cons)(L_clause, L_rest);});})});
  L_$F.leisureFunctionId = 1474;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));})(function(){return resolve(L_isTokenString)(L_h, "<-")(function(){return resolve(L_isNil)(L_t)(function(){return resolve(L_parseErr)("No value in do-clause: ", L_clause);})(function(){return L$(resolve(L_prefix))(lazy((function(){
  var L_$F = (function(L_ph){return (function(){
  var L_$F = (function(L_pt){return (function(){
  var L_$F = (function(L_D){return resolve(L_isNil)(L_pt)(function(){return resolve(L_makeBind)(function(){return resolve(L_isNil)(L_prefix)("_")(function(){return resolve(L_head)(L_prefix);});})(L_t);})(function(){return resolve(L_any)(lazy((function(){
  var L_$F = (function(L_el){return resolve(L_not)(function(){return resolve(L_or)(function(){return resolve(L_isString)(L_el);}, function(){return resolve(L_isToken)(L_el);});})});
  L_$F.leisureFunctionId = 1478;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), L_prefix)(function(){return resolve(L_parseErr)("Non-variable for bind in do clause: ", L_clause);})(function(){return resolve(L_cons)(L_false, lazy((function(){
  var L_$F = (function(L_rest){return L$(resolve(L_inLet))(function(){return resolve(L_cons)(".");}, L_id, function(){return resolve(L_cons)("bind", function(){return resolve(L_cons)(L_t, function(){return resolve(L_cons)(function(){return resolve(L__append)(function(){return resolve(L_cons)("\\", L_prefix);}, function(){return resolve(L_cons)(".", L_rest);});}, L_nil);});});})});
  L_$F.leisureFunctionId = 1479;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()));});})});
  L_$F.leisureFunctionId = 1477;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1476;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1475;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()), function(){return resolve(L_makeBind)("_")(L_t);});});})(function(){return resolve(L_doClause)(L_t, L_clause, function(){return resolve(L_cons)(L_h, L_prefix);}, L_inLet);});});})(function(){return resolve(L_makeBind)("_")(L_clause);})})();
  };
  L_$F.leisureFunctionId = 1480;
  L_$F.leisureLength = 4;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("triple", 3, "triple a b c = \\f . f a b c", lazy(setDataType((function(){
  var L_$F = function(L_a, L_b, L_c) {
    return L_checkPartial(L_$F, arguments) || setType((function(){
  var L_$F = (function(L_f){return resolve(L_f)(L_a)(L_b)(L_c)});
  L_$F.leisureFunctionId = 1481;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})(), 'triple');
  };
  L_$F.leisureFunctionId = 1482;
  L_$F.leisureLength = 3;
  return L_$F;
})(), 'triple')))},
    function(){return resolve(L_newDefine)("triple1", 1, "triple1 t = t \\a b c . a", lazy((function(){
  var L_$F = (function(L_t){return resolve(L_t)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return resolve(L_a)});
  L_$F.leisureFunctionId = 1486;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1485;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1484;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1483;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("triple2", 1, "triple2 t = t \\a b c . b", lazy((function(){
  var L_$F = (function(L_t){return resolve(L_t)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return resolve(L_b)});
  L_$F.leisureFunctionId = 1490;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1489;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1488;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1487;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("triple3", 1, "triple3 t = t \\a b c . c", lazy((function(){
  var L_$F = (function(L_t){return resolve(L_t)(lazy((function(){
  var L_$F = (function(L_a){return (function(){
  var L_$F = (function(L_b){return (function(){
  var L_$F = (function(L_c){return resolve(L_c)});
  L_$F.leisureFunctionId = 1494;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1493;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()});
  L_$F.leisureFunctionId = 1492;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))});
  L_$F.leisureFunctionId = 1491;
  L_$F.leisureLength = L_$F.length;
  return L_$F;
})()))},
    function(){return resolve(L_newDefine)("bind", 2, "bind x cont = isIO x\r\n  primBind x cont\r\n  cont x", lazy((function(){
  var L_$F = function(L_x, L_cont) {
    return L_checkPartial(L_$F, arguments) || resolve(L_isIO)(L_x)(function(){return resolve(L_primBind)(L_x, L_cont);})(function(){return resolve(L_cont)(L_x);});
  };
  L_$F.leisureFunctionId = 1495;
  L_$F.leisureLength = 2;
  return L_$F;
})()))},
    function(){return resolve(L_addToken)("<-")},
    function(){return resolve(L_defTokenPack)("do", function(){return resolve(L_cons)(function(){return resolve(L_cons)("<-", L_nil);}, function(){return resolve(L_cons)(L_nil, function(){return resolve(L_cons)(L_nil, L_nil);});});})},
    function(){return resolve(L_addStdTokenPacks)(function(){return resolve(L_cons)("do", function(){return resolve(L_cons)("list", function(){return resolve(L_cons)("infix", L_nil);});});})},
    function(){return resolve(L_resetStdTokenPacks)}
  ]);
});
//# sourceMappingURL=generatedPrelude.map
