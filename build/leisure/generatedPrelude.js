define([], function(){
  return L_runMonads([
    function(){return resolve(L_setNameSpace)("core")},
    function(){return resolve(L_newDefine)("asIO", 1, "asIO x = x", lazy(function(L_x){return resolve(L_x)}))},
    function(){return resolve(L_newDefine)("fakereturn", 1, "fakereturn x = x", lazy(function(L_x){return resolve(L_x)}))},
    function(){return resolve(L_newDefine)("bind", 2, "bind x cont = isMonad x\r\n  primBind x cont\r\n  cont x", lazy((function(L_x, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isMonad)(L_x)(function(){"use strict";return resolve(L_primBind)(L_x, L_cont);})(function(){"use strict";return resolve(L_cont)(L_x);});
})))},
    function(){return resolve(L_newDefine)("_recur", 1, "_recur x = \\f . f x", lazy(setDataType(function(L_x){return setType(function(L_f){return resolve(L_f)(L_x)}, '_recur')}, '_recur')))},
    function(){return resolve(L_newDefine)("true", 0, "true = \\a b . a", lazy(setDataType(setType(function(L_a){return function(L_b){return resolve(L_a)}}, 'true'), 'true')))},
    function(){return resolve(L_newDefine)("false", 0, "false = \\a b . b", lazy(setDataType(setType(function(L_a){return function(L_b){return resolve(L_b)}}, 'false'), 'false')))},
    function(){return resolve(L_newDefine)("not", 1, "not b = b false true", lazy(function(L_b){return resolve(L_b)(L_false)(L_true)}))},
    function(){return resolve(L_newDefine)("and", 2, "and a b = a b false", lazy((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_a)(L_b)(L_false);
})))},
    function(){return resolve(L_newDefine)("&&", 0, "&& = and", L_and)},
    function(){return resolve(L_newDefine)("or", 2, "or a b = a true b", lazy((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_a)(L_true)(L_b);
})))},
    function(){return resolve(L_newDefine)("||", 0, "|| = or", L_or)},
    function(){return resolve(L_newDefine)("some", 1, "some x = \\someCase noneCase . someCase x", lazy(setDataType(function(L_x){return setType(function(L_someCase){return function(L_noneCase){return resolve(L_someCase)(L_x)}}, 'some')}, 'some')))},
    function(){return resolve(L_newDefine)("some2", 2, "some2 a b = \\someCase noneCase . someCase a b", lazy(setDataType((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_someCase){return function(L_noneCase){return resolve(L_someCase)(L_a)(L_b)}}, 'some2');
}), 'some2')))},
    function(){return resolve(L_newDefine)("none", 0, "none = \\someCase noneCase . noneCase", lazy(setDataType(setType(function(L_someCase){return function(L_noneCase){return resolve(L_noneCase)}}, 'none'), 'none')))},
    function(){return resolve(L_newDefine)("isNone", 1, "isNone obj = hasType obj none", lazy(function(L_obj){return resolve(L_hasType)(L_obj, L_none)}))},
    function(){return resolve(L_newDefine)("isSome", 1, "isSome obj = hasType obj some", lazy(function(L_obj){return resolve(L_hasType)(L_obj, L_some)}))},
    function(){return resolve(L_newDefine)("isSome2", 1, "isSome2 obj = hasType obj some2", lazy(function(L_obj){return resolve(L_hasType)(L_obj, L_some2)}))},
    function(){return resolve(L_newDefine)("isOption", 1, "isOption obj = or (isSome obj) (isNone obj)", lazy(function(L_obj){return resolve(L_or)(function(){"use strict";return resolve(L_isSome)(L_obj);}, function(){"use strict";return resolve(L_isNone)(L_obj);})}))},
    function(){return resolve(L_newDefine)("neq", 2, "neq a b = not (eq a b)", lazy((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_not)(function(){"use strict";return resolve(L_eq)(L_a, L_b);});
})))},
    function(){return resolve(L_newDefine)("left", 1, "left x = \\lCase rCase . lCase x", lazy(setDataType(function(L_x){return setType(function(L_lCase){return function(L_rCase){return resolve(L_lCase)(L_x)}}, 'left')}, 'left')))},
    function(){return resolve(L_newDefine)("right", 1, "right x = \\lCase rCase . rCase x", lazy(setDataType(function(L_x){return setType(function(L_lCase){return function(L_rCase){return resolve(L_rCase)(L_x)}}, 'right')}, 'right')))},
    function(){return resolve(L_newDefine)("isEither", 1, "isEither obj = or (hasType obj left) (hasType obj right)", lazy(function(L_obj){return resolve(L_or)(function(){"use strict";return resolve(L_hasType)(L_obj, L_left);}, function(){"use strict";return resolve(L_hasType)(L_obj, L_right);})}))},
    function(){return resolve(L_newDefine)("isString", 1, "isString s = == (getType s) '*string'", lazy(function(L_s){return resolve(L_$p$p)(function(){"use strict";return resolve(L_getType)(L_s);}, "*string")}))},
    function(){return resolve(L_newDefine)("isNumber", 1, "isNumber s = == (getType s) '*number'", lazy(function(L_s){return resolve(L_$p$p)(function(){"use strict";return resolve(L_getType)(L_s);}, "*number")}))},
    function(){return resolve(L_newDefine)("strAsc", 1, "strAsc string = _strAsc (assertType 'strAsc string' '*string' string)", lazy(function(L_string){return resolve(L__strAsc)(function(){"use strict";return resolve(L_assertType)("strAsc string", "*string", L_string);})}))},
    function(){return resolve(L_newDefine)("strChr", 1, "strChr ascii = _strChr (assertType 'strChr string' '*number' ascii)", lazy(function(L_ascii){return resolve(L__strChr)(function(){"use strict";return resolve(L_assertType)("strChr string", "*number", L_ascii);})}))},
    function(){return resolve(L_newDefine)("strAt", 2, "strAt string index = _strAt\r\n  assertType 'strAt string' '*string' string\r\n  assertType 'strAt index' '*number' index", lazy((function(L_string, L_index) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__strAt)(function(){"use strict";return resolve(L_assertType)("strAt string", "*string", L_string);}, function(){"use strict";return resolve(L_assertType)("strAt index", "*number", L_index);});
})))},
    function(){return resolve(L_newDefine)("strStartsWith", 2, "strStartsWith string prefix = _strStartsWith\r\n  assertType 'strStartsWith string' '*string' string\r\n  assertType 'strStartsWith prefix' '*string' prefix", lazy((function(L_string, L_prefix) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__strStartsWith)(function(){"use strict";return resolve(L_assertType)("strStartsWith string", "*string", L_string);}, function(){"use strict";return resolve(L_assertType)("strStartsWith prefix", "*string", L_prefix);});
})))},
    function(){return resolve(L_newDefine)("strLen", 1, "strLen string = _strLen (assertType 'strLen string' '*string' string)", lazy(function(L_string){return resolve(L__strLen)(function(){"use strict";return resolve(L_assertType)("strLen string", "*string", L_string);})}))},
    function(){return resolve(L_newDefine)("strToLowerCase", 1, "strToLowerCase string = _strToLowerCase (assertType 'strToLowerCase string' '*string' string)", lazy(function(L_string){return resolve(L__strToLowerCase)(function(){"use strict";return resolve(L_assertType)("strToLowerCase string", "*string", L_string);})}))},
    function(){return resolve(L_newDefine)("strToUpperCase", 1, "strToUpperCase string = _strToUpperCase (assertType 'strToUpperCase string' '*string' string)", lazy(function(L_string){return resolve(L__strToUpperCase)(function(){"use strict";return resolve(L_assertType)("strToUpperCase string", "*string", L_string);})}))},
    function(){return resolve(L_newDefine)("strReplace", 3, "strReplace string pat repl = _strReplace\r\n  assertType 'strReplace string' '*string' string\r\n  assert (or (hasType pat '*string') (hasType pat '*RegExp')) (strCat (cons 'strStartsWith pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat\r\n  assertType 'strReplace repl' '*string' repl", lazy((function(L_string, L_pat, L_repl) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__strReplace)(function(){"use strict";return resolve(L_assertType)("strReplace string", "*string", L_string);}, function(){"use strict";return resolve(L_assert)(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_hasType)(L_pat, "*string");}, function(){"use strict";return resolve(L_hasType)(L_pat, "*RegExp");});})(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("strStartsWith pat should be type string or RegExp but it is type ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_getType)(L_pat);}, function(){"use strict";return resolve(L_cons)(": ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_show)(L_pat);}, L_nil);});});});});})(L_pat);}, function(){"use strict";return resolve(L_assertType)("strReplace repl", "*string", L_repl);});
})))},
    function(){return resolve(L_newDefine)("strSubstring", 3, "strSubstring str start end = _strSubstring\r\n  assertType 'strSubstring str' '*string' str\r\n  assertType 'strSubstring start' '*number' start\r\n  assertType 'strSubstring end' '*number' end", lazy((function(L_str, L_start, L_end) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__strSubstring)(function(){"use strict";return resolve(L_assertType)("strSubstring str", "*string", L_str);}, function(){"use strict";return resolve(L_assertType)("strSubstring start", "*number", L_start);}, function(){"use strict";return resolve(L_assertType)("strSubstring end", "*number", L_end);});
})))},
    function(){return resolve(L_newDefine)("strSplit", 2, "strSplit str pat = _strSplit\r\n  assertType 'strSplit str' '*string' str\r\n  assert (or (hasType pat '*string') (hasType pat '*RegExp')) (strCat (cons 'strSplit pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(L_str, L_pat) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__strSplit)(function(){"use strict";return resolve(L_assertType)("strSplit str", "*string", L_str);}, function(){"use strict";return resolve(L_assert)(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_hasType)(L_pat, "*string");}, function(){"use strict";return resolve(L_hasType)(L_pat, "*RegExp");});})(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("strSplit pat should be type string or RegExp but it is type ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_getType)(L_pat);}, function(){"use strict";return resolve(L_cons)(": ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_show)(L_pat);}, L_nil);});});});});})(L_pat);});
})))},
    function(){return resolve(L_newDefine)("strCat", 1, "strCat list = _strCat\r\n  assert (isList list) (strCat (cons 'strCat list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy(function(L_list){return resolve(L__strCat)(function(){"use strict";return resolve(L_assert)(function(){"use strict";return resolve(L_isList)(L_list);})(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("strCat list should be type cons or nil but it is type ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_getType)(L_list);}, function(){"use strict";return resolve(L_cons)(": ", function(){"use strict";return resolve(L_cons)(L_list);});});});});})(L_list);})}))},
    function(){return resolve(L_newDefine)("strAdd", 2, "strAdd str1 str2 = _strAdd (assertType 'strAdd str1' '*string' str1) (assertType 'strAdd str2' '*string' str2)", lazy((function(L_str1, L_str2) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__strAdd)(function(){"use strict";return resolve(L_assertType)("strAdd str1", "*string", L_str1);}, function(){"use strict";return resolve(L_assertType)("strAdd str2", "*string", L_str2);});
})))},
    function(){return resolve(L_newDefine)("strMatch", 2, "strMatch str pat = _strMatch\r\n  assertType 'strMatch str' '*string' str\r\n  assert (or (hasType pat '*string') (hasType pat '*RegExp')) (strCat (cons 'strMatch pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(L_str, L_pat) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__strMatch)(function(){"use strict";return resolve(L_assertType)("strMatch str", "*string", L_str);}, function(){"use strict";return resolve(L_assert)(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_hasType)(L_pat, "*string");}, function(){"use strict";return resolve(L_hasType)(L_pat, "*RegExp");});})(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("strMatch pat should be type string or RegExp but it is type ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_getType)(L_pat);}, function(){"use strict";return resolve(L_cons)(": ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_show)(L_pat);}, L_nil);});});});});})(L_pat);});
})))},
    function(){return resolve(L_newDefine)("strToList", 1, "strToList str = _strToList (assertType 'strToList str' '*string' str)", lazy(function(L_str){return resolve(L__strToList)(function(){"use strict";return resolve(L_assertType)("strToList str", "*string", L_str);})}))},
    function(){return resolve(L_newDefine)("strFromList", 1, "strFromList list = _strFromList\r\n  assert (isList list) (strCat (cons 'strFromList list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy(function(L_list){return resolve(L__strFromList)(function(){"use strict";return resolve(L_assert)(function(){"use strict";return resolve(L_isList)(L_list);})(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("strFromList list should be type cons or nil but it is type ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_getType)(L_list);}, function(){"use strict";return resolve(L_cons)(": ", function(){"use strict";return resolve(L_cons)(L_list);});});});});})(L_list);})}))},
    function(){return resolve(L_newDefine)("regexp", 1, "regexp str = _regexp (assertType 'regexp str' '*string' str)", lazy(function(L_str){return resolve(L__regexp)(function(){"use strict";return resolve(L_assertType)("regexp str", "*string", L_str);})}))},
    function(){return resolve(L_newDefine)("regexpFlags", 2, "regexpFlags str flags = _regexpFlags\r\n  assertType 'regexp str' '*string' str\r\n  assertType 'regexp flags' '*string' flags", lazy((function(L_str, L_flags) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__regexpFlags)(function(){"use strict";return resolve(L_assertType)("regexp str", "*string", L_str);}, function(){"use strict";return resolve(L_assertType)("regexp flags", "*string", L_flags);});
})))},
    function(){return resolve(L_newDefine)("jsonParse", 3, "jsonParse str failure success = _jsonParse\r\n  assertType 'jsonParse str' '*string' str\r\n  failure\r\n  success", lazy((function(L_str, L_failure, L_success) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__jsonParse)(function(){"use strict";return resolve(L_assertType)("jsonParse str", "*string", L_str);}, L_failure, L_success);
})))},
    function(){return resolve(L_newDefine)("show", 1, "show x = _show x", lazy(function(L_x){return resolve(L__show)(L_x)}))},
    function(){return resolve(L_newDefine)("equal", 2, "equal x y = eq x y", lazy((function(L_x, L_y) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_eq)(L_x, L_y);
})))},
    function(){return resolve(L_newDefine)("id", 1, "id x = x", lazy(function(L_x){return resolve(L_x)}))},
    function(){return resolve(L_newDefine)("unit", 0, "unit = \\x . x", lazy(setDataType(setType(function(L_x){return resolve(L_x)}, 'unit'), 'unit')))},
    function(){return resolve(L_newDefine)("compose", 2, "compose f g = \\x . f (g x)", lazy(setDataType((function(L_f, L_g) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_x){return resolve(L_f)(function(){"use strict";return resolve(L_g)(L_x);})}, 'compose');
}), 'compose')))},
    function(){return resolve(L_newDefine)("flip", 1, "flip func = \\x y . func y x", lazy(setDataType(function(L_func){return setType(function(L_x){return function(L_y){return resolve(L_func)(L_y)(L_x)}}, 'flip')}, 'flip')))},
    function(){return resolve(L_newDefine)("withCons", 3, "withCons l nilCase cont = isCons l (l (\\h t D . cont h t) nilCase) nilCase", lazy((function(L_l, L_nilCase, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isCons)(L_l)(function(){"use strict";return resolve(L_l)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_cont)(L_h)(L_t)}}}))(L_nilCase);})(L_nilCase);
})))},
    function(){return resolve(L_newDefine)("cons", 2, "cons a b = \\f . f a b", lazy(setDataType((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_a)(L_b)}, 'cons');
}), 'cons')))},
    function(){return resolve(L_newDefine)("isCons", 1, "isCons c = hasType c cons", lazy(function(L_c){return resolve(L_hasType)(L_c, L_cons)}))},
    function(){return resolve(L_newDefine)("isList", 1, "isList l = or (hasType l cons) (hasType l nil)", lazy(function(L_l){return resolve(L_or)(function(){"use strict";return resolve(L_hasType)(L_l, L_cons);}, function(){"use strict";return resolve(L_hasType)(L_l, L_nil);})}))},
    function(){return resolve(L_newDefine)("assertType", 3, "assertType msg type value = assert (hasType value type) (strCat (cons msg (cons ' should be type ' (cons (getDataType type) (cons ', but its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))))) value", lazy((function(L_msg, L_type, L_value) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_assert)(function(){"use strict";return resolve(L_hasType)(L_value, L_type);})(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)(L_msg, function(){"use strict";return resolve(L_cons)(" should be type ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_getDataType)(L_type);}, function(){"use strict";return resolve(L_cons)(", but its type is ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_getType)(L_value);}, function(){"use strict";return resolve(L_cons)(": ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_show)(L_value);}, L_nil);});});});});});});});})(L_value);
})))},
    function(){return resolve(L_newDefine)("nil", 0, "nil = \\a b . b", lazy(setDataType(setType(function(L_a){return function(L_b){return resolve(L_b)}}, 'nil'), 'nil')))},
    function(){return resolve(L_newDefine)("isNil", 1, "isNil n = hasType n nil", lazy(function(L_n){return resolve(L_hasType)(L_n, L_nil)}))},
    function(){return resolve(L_newDefine)("head", 1, "head l = l \\h t . h", lazy(function(L_l){return resolve(L_l)(lazy(function(L_h){return function(L_t){return resolve(L_h)}}))}))},
    function(){return resolve(L_newDefine)("tail", 1, "tail l = l \\h t . t", lazy(function(L_l){return resolve(L_l)(lazy(function(L_h){return function(L_t){return resolve(L_t)}}))}))},
    function(){return resolve(L_newDefine)("last", 1, "last l = isNil (tail l)\r\n  head l\r\n  last (tail l)", lazy(function(L_l){return resolve(L_isNil)(function(){"use strict";return resolve(L_tail)(L_l);})(function(){"use strict";return resolve(L_head)(L_l);})(function(){"use strict";return resolve(L_last)(function(){"use strict";return resolve(L_tail)(L_l);});})}))},
    function(){return resolve(L_newDefine)("removeLast", 1, "removeLast l = isNil (tail l)\r\n  nil\r\n  cons (head l) (removeLast (tail l))", lazy(function(L_l){return resolve(L_isNil)(function(){"use strict";return resolve(L_tail)(L_l);})(L_nil)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_l);}, function(){"use strict";return resolve(L_removeLast)(function(){"use strict";return resolve(L_tail)(L_l);});});})}))},
    function(){return resolve(L_newDefine)("length", 1, "length list = isCons list\r\n  + 1 (length (tail list))\r\n  assert (hasType list nil) (strCat (cons \"length argument is not a proper list: \" (cons list nil))) 0", lazy(function(L_list){return resolve(L_isCons)(L_list)(function(){"use strict";return resolve(L_$o)(1, function(){"use strict";return resolve(L_length)(function(){"use strict";return resolve(L_tail)(L_list);});});})(function(){"use strict";return resolve(L_assert)(function(){"use strict";return resolve(L_hasType)(L_list, L_nil);})(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("length argument is not a proper list: ", function(){"use strict";return resolve(L_cons)(L_list, L_nil);});});})(0);})}))},
    function(){return resolve(L_newDefine)("append", 2, "append a b = isNil a\r\n  b\r\n  cons (head a) (append (tail a) b)", lazy((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_a)(L_b)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_a);}, function(){"use strict";return resolve(L_append)(function(){"use strict";return resolve(L_tail)(L_a);}, L_b);});});
})))},
    function(){return resolve(L_newDefine)("flatten", 1, "flatten list = isCons list\r\n  subflatten list nil\r\n  list", lazy(function(L_list){return resolve(L_isCons)(L_list)(function(){"use strict";return resolve(L_subflatten)(L_list, L_nil);})(L_list)}))},
    function(){return resolve(L_newDefine)("subflatten", 2, "subflatten list result = isNil list\r\n  result\r\n  isCons list\r\n    subflatten (head list) (subflatten (tail list) result)\r\n    cons list result", lazy((function(L_list, L_result) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_list)(L_result)(function(){"use strict";return resolve(L_isCons)(L_list)(function(){"use strict";return resolve(L_subflatten)(function(){"use strict";return resolve(L_head)(L_list);}, function(){"use strict";return resolve(L_subflatten)(function(){"use strict";return resolve(L_tail)(L_list);}, L_result);});})(function(){"use strict";return resolve(L_cons)(L_list, L_result);});});
})))},
    function(){return resolve(L_newDefine)("reverse", 1, "reverse l = rev l nil", lazy(function(L_l){return resolve(L_rev)(L_l, L_nil)}))},
    function(){return resolve(L_newDefine)("rev", 2, "rev l result = isNil l\r\n  result\r\n  rev (tail l) (cons (head l) result)", lazy((function(L_l, L_result) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_l)(L_result)(function(){"use strict";return resolve(L_rev)(function(){"use strict";return resolve(L_tail)(L_l);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_l);}, L_result);});});
})))},
    function(){return resolve(L_newDefine)("filter", 2, "filter func list = isNil list\r\n  nil\r\n  func (head list) (cons (head list)) id (filter func (tail list))", lazy((function(L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_list)(L_nil)(function(){"use strict";return resolve(L_func)(function(){"use strict";return resolve(L_head)(L_list);})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_list);});})(L_id)(function(){"use strict";return resolve(L_filter)(L_func, function(){"use strict";return resolve(L_tail)(L_list);});});});
})))},
    function(){return resolve(L_newDefine)("find", 2, "find predicate list = isNil list\r\n  none\r\n  predicate (head list) (some (head list)) (find predicate (tail list))", lazy((function(L_predicate, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_list)(L_none)(function(){"use strict";return resolve(L_predicate)(function(){"use strict";return resolve(L_head)(L_list);})(function(){"use strict";return resolve(L_some)(function(){"use strict";return resolve(L_head)(L_list);});})(function(){"use strict";return resolve(L_find)(L_predicate, function(){"use strict";return resolve(L_tail)(L_list);});});});
})))},
    function(){return resolve(L_newDefine)("contains", 2, "contains list item = find (\\el . eq el item) list (\\x . true) false", lazy((function(L_list, L_item) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_find)(lazy(function(L_el){return resolve(L_eq)(L_el, L_item)}), L_list)(lazy(function(L_x){return resolve(L_true)}))(L_false);
})))},
    function(){return resolve(L_newDefine)("map", 2, "map func l = isCons l\r\n  cons (func (head l)) (map func (tail l))\r\n  l", lazy((function(L_func, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isCons)(L_l)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_func)(function(){"use strict";return resolve(L_head)(L_l);});}, function(){"use strict";return resolve(L_map)(L_func, function(){"use strict";return resolve(L_tail)(L_l);});});})(L_l);
})))},
    function(){return resolve(L_newDefine)("mapSave", 2, "mapSave func l = isNil l\r\n  nil\r\n  \\\\\r\n    newH = func (head l)\r\n    newT = mapSave func (tail l)\r\n    .\r\n    and (eq newH (head l)) (eq newT (tail l))\r\n      l\r\n      cons newH newT", lazy((function(L_func, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_l)(L_nil)(function(){"use strict";return (function(){"use strict";
  var L_newH_0, L_newT_1;
  L_newH_0 = function(){"use strict";return resolve(L_func)(function(){"use strict";return resolve(L_head)(L_l);});};
  L_newT_1 = function(){"use strict";return resolve(L_mapSave)(L_func, function(){"use strict";return resolve(L_tail)(L_l);});};

  return resolve(L_and)(function(){"use strict";return resolve(L_eq)(L_newH_0, function(){"use strict";return resolve(L_head)(L_l);});}, function(){"use strict";return resolve(L_eq)(L_newT_1, function(){"use strict";return resolve(L_tail)(L_l);});})(L_l)(function(){"use strict";return resolve(L_cons)(L_newH_0, L_newT_1);})})();});
})))},
    function(){return resolve(L_newDefine)("foldl", 3, "foldl func initialValue l = l (\\h t D . foldl func (func initialValue h) t) initialValue", lazy((function(L_func, L_initialValue, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_l)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_foldl)(L_func, function(){"use strict";return resolve(L_func)(L_initialValue)(L_h);}, L_t)}}}))(L_initialValue);
})))},
    function(){return resolve(L_newDefine)("foldl1", 2, "foldl1 func l = l \\h t . foldl func h t", lazy((function(L_func, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_l)(lazy(function(L_h){return function(L_t){return resolve(L_foldl)(L_func, L_h, L_t)}}));
})))},
    function(){return resolve(L_newDefine)("foldr", 3, "foldr func initialValue list = list\r\n  \\h t D . func h (foldr func initialValue t)\r\n  initialValue", lazy((function(L_func, L_initialValue, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_func)(L_h)(function(){"use strict";return resolve(L_foldr)(L_func, L_initialValue, L_t);})}}}))(L_initialValue);
})))},
    function(){return resolve(L_newDefine)("foldr1", 2, "foldr1 func list = list \\h t . isNil t\r\n  h\r\n  func h (foldr1 func t)", lazy((function(L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_isNil)(L_t)(L_h)(function(){"use strict";return resolve(L_func)(L_h)(function(){"use strict";return resolve(L_foldr1)(L_func, L_t);});})}}));
})))},
    function(){return resolve(L_newDefine)("intersperse", 2, "intersperse list element = list (\\h t D .\r\n  isNil t\r\n    list\r\n    cons h (cons element (intersperse t element))) nil", lazy((function(L_list, L_element) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isNil)(L_t)(L_list)(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_cons)(L_element, function(){"use strict";return resolve(L_intersperse)(L_t, L_element);});});})}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("join", 2, "join list el = strCat (intersperse list el)", lazy((function(L_list, L_el) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_strCat)(function(){"use strict";return resolve(L_intersperse)(L_list, L_el);});
})))},
    function(){return resolve(L_newDefine)("findIndex", 2, "findIndex func list = idx list func 0", lazy((function(L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_idx)(L_list, L_func, 0);
})))},
    function(){return resolve(L_newDefine)("idx", 3, "idx list func pos = list\r\n  \\h t D . func h\r\n    pos\r\n    idx t func (+ 1 pos)\r\n  -1", lazy((function(L_list, L_func, L_pos) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_func)(L_h)(L_pos)(function(){"use strict";return resolve(L_idx)(L_t, L_func, function(){"use strict";return resolve(L_$o)(1, L_pos);});})}}}))(-1);
})))},
    function(){return resolve(L_newDefine)("index", 2, "index list el = find (\\item . == el item) list", lazy((function(L_list, L_el) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_find)(lazy(function(L_item){return resolve(L_$p$p)(L_el, L_item)}), L_list);
})))},
    function(){return resolve(L_newDefine)("increasing", 1, "increasing x = cons x (increasing (+ x 1))", lazy(function(L_x){return resolve(L_cons)(L_x, function(){"use strict";return resolve(L_increasing)(function(){"use strict";return resolve(L_$o)(L_x, 1);});})}))},
    function(){return resolve(L_newDefine)("wholes", 0, "wholes = increasing 0", function(){"use strict";return resolve(L_increasing)(0);})},
    function(){return resolve(L_newDefine)("naturals", 0, "naturals = tail wholes", function(){"use strict";return resolve(L_tail)(L_wholes);})},
    function(){return resolve(L_newDefine)("zip", 2, "zip a b = isNil a\r\n  nil\r\n  isNil b\r\n    nil\r\n    cons (cons (head a) (head b)) (zip (tail a) (tail b))", lazy((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_a)(L_nil)(function(){"use strict";return resolve(L_isNil)(L_b)(L_nil)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_a);}, function(){"use strict";return resolve(L_head)(L_b);});}, function(){"use strict";return resolve(L_zip)(function(){"use strict";return resolve(L_tail)(L_a);}, function(){"use strict";return resolve(L_tail)(L_b);});});});});
})))},
    function(){return resolve(L_newDefine)("assertAlist", 3, "assertAlist msg value result = assert (isAlist value) (strCat (cons msg (cons ' should be a association list, but it is not; its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))) result", lazy((function(L_msg, L_value, L_result) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_assert)(function(){"use strict";return resolve(L_isAlist)(L_value);})(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)(L_msg, function(){"use strict";return resolve(L_cons)(" should be a association list, but it is not; its type is ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_getType)(L_value);}, function(){"use strict";return resolve(L_cons)(": ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_show)(L_value);}, L_nil);});});});});});})(L_result);
})))},
    function(){return resolve(L_newDefine)("acons", 3, "acons k v alist = assertAlist \"acons alist\" alist (\\@ type cons . \\f . \\@ assoc true . f (cons k v) alist)", lazy((function(L_k, L_v, L_alist) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_assertAlist)("acons alist", L_alist, lazy(setType(setLambdaProperties(function(L_f){return resolve(L_f)(function(){"use strict";return resolve(L_cons)(L_k, L_v);})(L_alist)}, {"assoc":"true"}), 'cons')));
})))},
    function(){return resolve(L_newDefine)("assoc", 2, "assoc k alist  = find (\\el . eq k (head el)) alist (\\cell . cell \\head tail . some tail) none", lazy((function(L_k, L_alist) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_find)(lazy(function(L_el){return resolve(L_eq)(L_k, function(){"use strict";return resolve(L_head)(L_el);})}), L_alist)(lazy(function(L_cell){return resolve(L_cell)(lazy(function(L_head){return function(L_tail){return resolve(L_some)(L_tail)}}))}))(L_none);
})))},
    function(){return resolve(L_newDefine)("rassoc", 2, "rassoc v alist = find (\\el . eq v (tail el)) alist (\\cell . cell \\head tail . some head) none", lazy((function(L_v, L_alist) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_find)(lazy(function(L_el){return resolve(L_eq)(L_v, function(){"use strict";return resolve(L_tail)(L_el);})}), L_alist)(lazy(function(L_cell){return resolve(L_cell)(lazy(function(L_head){return function(L_tail){return resolve(L_some)(L_head)}}))}))(L_none);
})))},
    function(){return resolve(L_newDefine)("isAlist", 1, "isAlist obj = or (isNil obj) (hasProperty obj 'assoc')", lazy(function(L_obj){return resolve(L_or)(function(){"use strict";return resolve(L_isNil)(L_obj);}, function(){"use strict";return resolve(L_hasProperty)(L_obj, "assoc");})}))},
    function(){return resolve(L_newDefine)("aconsPair", 2, "aconsPair keyValue list = \\@ type cons . \\f . \\@ assoc true . f keyValue list", lazy((function(L_keyValue, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(setLambdaProperties(function(L_f){return resolve(L_f)(L_keyValue)(L_list)}, {"assoc":"true"}), 'cons');
})))},
    function(){return resolve(L_newDefine)("appendAlist", 2, "appendAlist a b = isNil a\r\n  b\r\n  aconsPair (head a) (appendAlist (tail a) b)", lazy((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_a)(L_b)(function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_head)(L_a);}, function(){"use strict";return resolve(L_appendAlist)(function(){"use strict";return resolve(L_tail)(L_a);}, L_b);});});
})))},
    function(){return resolve(L_newDefine)("keys", 1, "keys list = map (\\l . head l) list", lazy(function(L_list){return resolve(L_map)(lazy(function(L_l){return resolve(L_head)(L_l)}), L_list)}))},
    function(){return resolve(L_newDefine)("getProperty", 2, "getProperty func prop = assoc prop (getProperties func)", lazy((function(L_func, L_prop) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_assoc)(L_prop, function(){"use strict";return resolve(L_getProperties)(L_func);});
})))},
    function(){return resolve(L_newDefine)("hasProperty", 2, "hasProperty func prop = getProperty func prop\r\n  \\_ . true\r\n  false", lazy((function(L_func, L_prop) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_getProperty)(L_func, L_prop)(lazy(function(L__){return resolve(L_true)}))(L_false);
})))},
    function(){return resolve(L_newDefine)("odds", 1, "odds l = l\r\n  \\h t D . cons h (evens t)\r\n  nil", lazy(function(L_l){return resolve(L_l)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_evens)(L_t);})}}}))(L_nil)}))},
    function(){return resolve(L_newDefine)("evens", 1, "evens l = l\r\n  \\h t D . odds t\r\n  nil", lazy(function(L_l){return resolve(L_l)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_odds)(L_t)}}}))(L_nil)}))},
    function(){return resolve(L_newDefine)("cleave", 1, "cleave l = cons (evens l) (odds l)", lazy(function(L_l){return resolve(L_cons)(function(){"use strict";return resolve(L_evens)(L_l);}, function(){"use strict";return resolve(L_odds)(L_l);})}))},
    function(){return resolve(L_newDefine)("merge", 3, "merge cmp a b = a\r\n  \\ah at D . b\r\n    \\bh bt D . cmp ah bh\r\n      cons ah (merge cmp at b)\r\n      cons bh (merge cmp a bt)\r\n    a\r\n  b", lazy((function(L_cmp, L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_a)(lazy(function(L_ah){return function(L_at){return function(L_D){return resolve(L_b)(lazy(function(L_bh){return function(L_bt){return function(L_D_0){return resolve(L_cmp)(L_ah)(L_bh)(function(){"use strict";return resolve(L_cons)(L_ah, function(){"use strict";return resolve(L_merge)(L_cmp, L_at, L_b);});})(function(){"use strict";return resolve(L_cons)(L_bh, function(){"use strict";return resolve(L_merge)(L_cmp, L_a, L_bt);});})}}}))(L_a)}}}))(L_b);
})))},
    function(){return resolve(L_newDefine)("mergeSort", 2, "mergeSort cmp l = l\r\n  \\h t D . eq (tail l) nil\r\n    l\r\n    \\\\\r\n      cl = cleave l\r\n      e = head cl\r\n      o = tail cl\r\n      .\r\n      merge cmp (mergeSort cmp e) (mergeSort cmp o)\r\n  nil", lazy((function(L_cmp, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_l)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_eq)(function(){"use strict";return resolve(L_tail)(L_l);}, L_nil)(L_l)(function(){"use strict";return (function(){"use strict";
  var L_cl_0, L_e_1, L_o_2;
  L_cl_0 = function(){"use strict";return resolve(L_cleave)(L_l);};
  L_e_1 = function(){"use strict";return resolve(L_head)(L_cl_0);};
  L_o_2 = function(){"use strict";return resolve(L_tail)(L_cl_0);};

  return resolve(L_merge)(L_cmp, function(){"use strict";return resolve(L_mergeSort)(L_cmp, L_e_1);}, function(){"use strict";return resolve(L_mergeSort)(L_cmp, L_o_2);})})();})}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("slowsort", 2, "slowsort less list = (qs less list) nil", lazy((function(L_less, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_qs)(L_less, L_list)(L_nil);
})))},
    function(){return resolve(L_newDefine)("qs", 2, "qs sortedFunc list = list\r\n  \\h t D . \\\\\r\n    greater = filter (sortedFunc h) t\r\n    lesser = filter (compose not (sortedFunc h)) t\r\n    .\r\n    \\rest . (qs sortedFunc lesser) (cons h ((qs sortedFunc greater) rest))\r\n  id", lazy((function(L_sortedFunc, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return (function(){"use strict";
  var L_greater_0, L_lesser_1;
  L_greater_0 = function(){"use strict";return resolve(L_filter)(function(){"use strict";return resolve(L_sortedFunc)(L_h);}, L_t);};
  L_lesser_1 = function(){"use strict";return resolve(L_filter)(function(){"use strict";return resolve(L_compose)(L_not, function(){"use strict";return resolve(L_sortedFunc)(L_h);});}, L_t);};

  return function(L_rest){return resolve(L_qs)(L_sortedFunc, L_lesser_1)(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_qs)(L_sortedFunc, L_greater_0)(L_rest);});})}})()}}}))(L_id);
})))},
    function(){return resolve(L_newDefine)("insertSorted", 3, "insertSorted sortFunc item list = list\r\n  \\h t D . sortFunc item h (cons item list) (cons h (insertSorted sortFunc item t))\r\n  cons item nil", lazy((function(L_sortFunc, L_item, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_sortFunc)(L_item)(L_h)(function(){"use strict";return resolve(L_cons)(L_item, L_list);})(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_insertSorted)(L_sortFunc, L_item, L_t);});})}}}))(function(){"use strict";return resolve(L_cons)(L_item, L_nil);});
})))},
    function(){return resolve(L_newDefine)("err", 1, "err msg = \\f . f msg", lazy(setDataType(function(L_msg){return setType(function(L_f){return resolve(L_f)(L_msg)}, 'err')}, 'err')))},
    function(){return resolve(L_newDefine)("errMsg", 1, "errMsg err = err \\m . m", lazy(function(L_err){return resolve(L_err)(lazy(function(L_m){return resolve(L_m)}))}))},
    function(){return resolve(L_newDefine)("isErr", 1, "isErr thing = hasType thing err", lazy(function(L_thing){return resolve(L_hasType)(L_thing, L_err)}))},
    function(){return resolve(L_newDefine)("ifNotErr", 2, "ifNotErr thing cont = (isErr thing) thing (cont thing)", lazy((function(L_thing, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isErr)(L_thing)(L_thing)(function(){"use strict";return resolve(L_cont)(L_thing);});
})))},
    function(){return resolve(L_setNameSpace)("parser")},
    function(){return resolve(L_newDefine)("token", 2, "token txt pos = \\f . f txt pos", lazy(setDataType((function(L_txt, L_pos) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_txt)(L_pos)}, 'token');
}), 'token')))},
    function(){return resolve(L_newDefine)("tokenString", 1, "tokenString tok = tok \\t p . t", lazy(function(L_tok){return resolve(L_tok)(lazy(function(L_t){return function(L_p){return resolve(L_t)}}))}))},
    function(){return resolve(L_newDefine)("tokenFilepos", 1, "tokenFilepos tok = tok \\t p . p", lazy(function(L_tok){return resolve(L_tok)(lazy(function(L_t){return function(L_p){return resolve(L_p)}}))}))},
    function(){return resolve(L_newDefine)("tokenPos", 1, "tokenPos tok = tok \\t p . isFilepos p\r\n  fileposOffset p\r\n  p", lazy(function(L_tok){return resolve(L_tok)(lazy(function(L_t){return function(L_p){return resolve(L_isFilepos)(L_p)(function(){"use strict";return resolve(L_fileposOffset)(L_p);})(L_p)}}))}))},
    function(){return resolve(L_newDefine)("isToken", 1, "isToken t = hasType t token", lazy(function(L_t){return resolve(L_hasType)(L_t, L_token)}))},
    function(){return resolve(L_newDefine)("emptyLineStarts", 0, "emptyLineStarts = cons 'EMPTYFILE.lsr' (cons 1 nil)", function(){"use strict";return resolve(L_cons)("EMPTYFILE.lsr", function(){"use strict";return resolve(L_cons)(1, L_nil);});})},
    function(){return resolve(L_newDefine)("filepos", 3, "filepos file line offset = \\f . f file line offset", lazy(setDataType((function(L_file, L_line, L_offset) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_file)(L_line)(L_offset)}, 'filepos');
}), 'filepos')))},
    function(){return resolve(L_newDefine)("fileposFile", 1, "fileposFile p = p \\file line offset . file", lazy(function(L_p){return resolve(L_p)(lazy(function(L_file){return function(L_line){return function(L_offset){return resolve(L_file)}}}))}))},
    function(){return resolve(L_newDefine)("fileposLine", 1, "fileposLine p = p \\file line offset . line", lazy(function(L_p){return resolve(L_p)(lazy(function(L_file){return function(L_line){return function(L_offset){return resolve(L_line)}}}))}))},
    function(){return resolve(L_newDefine)("fileposOffset", 1, "fileposOffset p = p \\file line offset . offset", lazy(function(L_p){return resolve(L_p)(lazy(function(L_file){return function(L_line){return function(L_offset){return resolve(L_offset)}}}))}))},
    function(){return resolve(L_newDefine)("isFilepos", 1, "isFilepos p = hasType p filepos", lazy(function(L_p){return resolve(L_hasType)(L_p, L_filepos)}))},
    function(){return resolve(L_newDefine)("addFilepos", 2, "addFilepos pos change = isFilepos pos pos emptyFilePos\r\n  \\file line offset . filepos file line (+ offset change)", lazy((function(L_pos, L_change) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isFilepos)(L_pos)(L_pos)(L_emptyFilePos)(lazy(function(L_file){return function(L_line){return function(L_offset){return resolve(L_filepos)(L_file, L_line, function(){"use strict";return resolve(L_$o)(L_offset, L_change);})}}}));
})))},
    function(){return resolve(L_newDefine)("emptyFilePos", 0, "emptyFilePos = filepos 'NOTHING.lsr' 0 0", function(){"use strict";return resolve(L_filepos)("NOTHING.lsr", 0, 0);})},
    function(){return resolve(L_newDefine)("isEmptyPos", 1, "isEmptyPos pos = and (isFilepos pos) (and (eq 0 (fileposLine pos)) (eq 0 (fileposOffset pos)))", lazy(function(L_pos){return resolve(L_and)(function(){"use strict";return resolve(L_isFilepos)(L_pos);}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_eq)(0, function(){"use strict";return resolve(L_fileposLine)(L_pos);});}, function(){"use strict";return resolve(L_eq)(0, function(){"use strict";return resolve(L_fileposOffset)(L_pos);});});})}))},
    function(){return resolve(L_newDefine)("emptyFor", 1, "emptyFor thing = filepos (fileposFile (position thing)) 0 0", lazy(function(L_thing){return resolve(L_filepos)(function(){"use strict";return resolve(L_fileposFile)(function(){"use strict";return resolve(L_position)(L_thing);});}, 0, 0)}))},
    function(){return resolve(L_newDefine)("startFilePos", 0, "startFilePos = emptyFilePos", L_emptyFilePos)},
    function(){return resolve(L_newDefine)("filePosFor", 2, "filePosFor lineStarts offset = countFilePos (head (tail lineStarts)) 0 (tail (tail lineStarts)) offset\r\n  \\line offset . filepos (head lineStarts) line offset", lazy((function(L_lineStarts, L_offset) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_countFilePos)(function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(L_lineStarts);});}, 0, function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_tail)(L_lineStarts);});}, L_offset)(lazy(function(L_line){return function(L_offset){return resolve(L_filepos)(function(){"use strict";return resolve(L_head)(L_lineStarts);}, L_line, L_offset)}}));
})))},
    function(){return resolve(L_newDefine)("countFilePos", 4, "countFilePos line lineOffset starts offset = or (isNil starts) (> (head starts) offset)\r\n  \\f . f line (- offset lineOffset)\r\n  countFilePos (+ line 1) (head starts) (tail starts) offset", lazy((function(L_line, L_lineOffset, L_starts, L_offset) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_or)(function(){"use strict";return resolve(L_isNil)(L_starts);}, function(){"use strict";return resolve(L_$z)(function(){"use strict";return resolve(L_head)(L_starts);}, L_offset);})(lazy(function(L_f){return resolve(L_f)(L_line)(function(){"use strict";return resolve(L_$_)(L_offset, L_lineOffset);})}))(function(){"use strict";return resolve(L_countFilePos)(function(){"use strict";return resolve(L_$o)(L_line, 1);}, function(){"use strict";return resolve(L_head)(L_starts);}, function(){"use strict";return resolve(L_tail)(L_starts);}, L_offset);});
})))},
    function(){return resolve(L_newDefine)("fileposList", 1, "fileposList pos = pos \\file line offset . cons line (cons offset nil)", lazy(function(L_pos){return resolve(L_pos)(lazy(function(L_file){return function(L_line){return function(L_offset){return resolve(L_cons)(L_line, function(){"use strict";return resolve(L_cons)(L_offset, L_nil);})}}}))}))},
    function(){return resolve(L_newDefine)("parens", 3, "parens start end content = \\f . f start end content", lazy(setDataType((function(L_start, L_end, L_content) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_start)(L_end)(L_content)}, 'parens');
}), 'parens')))},
    function(){return resolve(L_newDefine)("parensStart", 1, "parensStart p = p \\s e c . s", lazy(function(L_p){return resolve(L_p)(lazy(function(L_s){return function(L_e){return function(L_c){return resolve(L_s)}}}))}))},
    function(){return resolve(L_newDefine)("parensEnd", 1, "parensEnd p = p \\s e c . e", lazy(function(L_p){return resolve(L_p)(lazy(function(L_s){return function(L_e){return function(L_c){return resolve(L_e)}}}))}))},
    function(){return resolve(L_newDefine)("parensContent", 1, "parensContent p = p \\s e c . c", lazy(function(L_p){return resolve(L_p)(lazy(function(L_s){return function(L_e){return function(L_c){return resolve(L_c)}}}))}))},
    function(){return resolve(L_newDefine)("isParens", 1, "isParens p = hasType p parens", lazy(function(L_p){return resolve(L_hasType)(L_p, L_parens)}))},
    function(){return resolve(L_newDefine)("makeParens", 3, "makeParens start end content =\r\n  and (isCons content) (isNil (tail content))\r\n    makeParens start end (head content)\r\n    or (isToken content) (isParens content)\r\n      content\r\n      parens start end content", lazy((function(L_start, L_end, L_content) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_and)(function(){"use strict";return resolve(L_isCons)(L_content);}, function(){"use strict";return resolve(L_isNil)(function(){"use strict";return resolve(L_tail)(L_content);});})(function(){"use strict";return resolve(L_makeParens)(L_start, L_end, function(){"use strict";return resolve(L_head)(L_content);});})(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_isToken)(L_content);}, function(){"use strict";return resolve(L_isParens)(L_content);})(L_content)(function(){"use strict";return resolve(L_parens)(L_start, L_end, L_content);});});
})))},
    function(){return resolve(L_newDefine)("parensFromToks", 3, "parensFromToks left right content = \\\\\r\n  start = tokenFilepos left\r\n  end = addFilepos (tokenFilepos right) (strLen (tokenString right))\r\n  .\r\n  parens start end content", lazy((function(L_left, L_right, L_content) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_start_0, L_end_1;
  L_start_0 = function(){"use strict";return resolve(L_tokenFilepos)(L_left);};
  L_end_1 = function(){"use strict";return resolve(L_addFilepos)(function(){"use strict";return resolve(L_tokenFilepos)(L_right);}, function(){"use strict";return resolve(L_strLen)(function(){"use strict";return resolve(L_tokenString)(L_right);});});};

  return resolve(L_parens)(L_start_0, L_end_1, L_content)})();
})))},
    function(){return resolve(L_newDefine)("stripParens", 1, "stripParens p = isParens p (stripParens (parensContent p)) p", lazy(function(L_p){return resolve(L_isParens)(L_p)(function(){"use strict";return resolve(L_stripParens)(function(){"use strict";return resolve(L_parensContent)(L_p);});})(L_p)}))},
    function(){return resolve(L_newDefine)("withStripped", 2, "withStripped p cont = cont (stripParens p)", lazy((function(L_p, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_cont)(function(){"use strict";return resolve(L_stripParens)(L_p);});
})))},
    function(){return resolve(L_newDefine)("parseErr", 2, "parseErr msg1 msg2 = err (strCat (cons msg1 (cons msg2 nil)))", lazy((function(L_msg1, L_msg2) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_err)(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)(L_msg1, function(){"use strict";return resolve(L_cons)(L_msg2, L_nil);});});});
})))},
    function(){return resolve(L_newDefine)("lineStart", 0, "lineStart  = regexp '^\\\\r?\\\\n'", function(){"use strict";return resolve(L_regexp)("^\\r?\\n");})},
    function(){return resolve(L_newDefine)("commentPat", 0, "commentPat = regexp '^\\\\r?\\\\n[ \\\\i]*#'", function(){"use strict";return resolve(L_regexp)("^\\r?\\n[ \\i]*#");})},
    function(){return resolve(L_newDefine)("emptyToken", 0, "emptyToken = regexp '^\\\\r?\\\\n[ \\\\i]*(#|$)'", function(){"use strict";return resolve(L_regexp)("^\\r?\\n[ \\i]*(#|$)");})},
    function(){return resolve(L_newDefine)("makeTokens", 3, "makeTokens lineStarts strings start = _withRecur\r\n  makeMoreTokens lineStarts strings start nil", lazy((function(L_lineStarts, L_strings, L_start) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L__withRecur)(function(){"use strict";return resolve(L_makeMoreTokens)(L_lineStarts, L_strings, L_start, L_nil);});
})))},
    function(){return resolve(L_newDefine)("makeMoreTokens", 4, "makeMoreTokens lineStarts strings start result = strings\r\n  \\h t D . _recur\r\n    makeMoreTokens lineStarts t (+ start (strLen h))\r\n      or (or (strStartsWith h ' ') (strStartsWith h '#')) (and (strMatches h emptyToken) (or (isNil t) (strMatches (head t) lineStart)))\r\n        result\r\n        cons (makeTokenAt lineStarts h start) result\r\n  reverse result", lazy((function(L_lineStarts, L_strings, L_start, L_result) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_strings)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L__recur)(function(){"use strict";return resolve(L_makeMoreTokens)(L_lineStarts, L_t, function(){"use strict";return resolve(L_$o)(L_start, function(){"use strict";return resolve(L_strLen)(L_h);});}, function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_strStartsWith)(L_h, " ");}, function(){"use strict";return resolve(L_strStartsWith)(L_h, "#");});}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_strMatches)(L_h, L_emptyToken);}, function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_isNil)(L_t);}, function(){"use strict";return resolve(L_strMatches)(function(){"use strict";return resolve(L_head)(L_t);}, L_lineStart);});});})(L_result)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_makeTokenAt)(L_lineStarts, L_h, L_start);}, L_result);});});})}}}))(function(){"use strict";return resolve(L_reverse)(L_result);});
})))},
    function(){return resolve(L_newDefine)("makeTokenAt", 3, "makeTokenAt lineStarts txt offset = token txt (filePosFor lineStarts offset)", lazy((function(L_lineStarts, L_txt, L_offset) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_token)(L_txt, function(){"use strict";return resolve(L_filePosFor)(L_lineStarts, L_offset);});
})))},
    function(){return resolve(L_newDefine)("showToken", 1, "showToken tok = log (strCat (cons 'token: ' (cons (tokenString tok) (cons ', ' (cons (showPos (tokenPos tok)) nil))))) tok", lazy(function(L_tok){return resolve(L_log)(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("token: ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tokenString)(L_tok);}, function(){"use strict";return resolve(L_cons)(", ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_showPos)(function(){"use strict";return resolve(L_tokenPos)(L_tok);});}, L_nil);});});});});}, L_tok)}))},
    function(){return resolve(L_newDefine)("showPos", 1, "showPos pos = isFilepos pos\r\n  strCat (cons 'position: ' (cons (fileposFile pos) (cons ', ' (cons (fileposLine pos) (cons '.' (cons (fileposOffset pos) nil))))))\r\n  pos", lazy(function(L_pos){return resolve(L_isFilepos)(L_pos)(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("position: ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_fileposFile)(L_pos);}, function(){"use strict";return resolve(L_cons)(", ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_fileposLine)(L_pos);}, function(){"use strict";return resolve(L_cons)(".", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_fileposOffset)(L_pos);}, L_nil);});});});});});});})(L_pos)}))},
    function(){return resolve(L_newDefine)("splitTokens", 2, "splitTokens str pat = filter (\\s . not (eq s '')) (basicSplitTokens str pat true)", lazy((function(L_str, L_pat) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_filter)(lazy(function(L_s){return resolve(L_not)(function(){"use strict";return resolve(L_eq)(L_s, "");})}), function(){"use strict";return resolve(L_basicSplitTokens)(L_str, L_pat, L_true);});
})))},
    function(){return resolve(L_newDefine)("numberPat", 0, "numberPat = regexp '-?([0-9]+(\\\\.[0-9]+)?|\\\\.[0-9]+)'", function(){"use strict";return resolve(L_regexp)("-?([0-9]+(\\.[0-9]+)?|\\.[0-9]+)");})},
    function(){return resolve(L_newDefine)("matchOffset", 2, "matchOffset str match = isNil match\r\n  strLen str\r\n  head (tail (tail match))", lazy((function(L_str, L_match) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_match)(function(){"use strict";return resolve(L_strLen)(L_str);})(function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_tail)(L_match);});});});
})))},
    function(){return resolve(L_newDefine)("basicSplitTokens", 3, "basicSplitTokens str pat prevIsDel = reverse\r\n  _withRecur (_basicSplitTokens str pat prevIsDel nil)", lazy((function(L_str, L_pat, L_prevIsDel) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_reverse)(function(){"use strict";return resolve(L__withRecur)(function(){"use strict";return resolve(L__basicSplitTokens)(L_str, L_pat, L_prevIsDel, L_nil);});});
})))},
    function(){return resolve(L_newDefine)("_basicSplitTokens", 4, "_basicSplitTokens str pat prevIsDel toks = == str ''\r\n  toks\r\n  \\\\\r\n    num = strMatch str numberPat\r\n    del = strMatch str pat\r\n    numOffset = matchOffset str num\r\n    delOffset = matchOffset str del\r\n    select = and (== numOffset 0) prevIsDel\r\n      \\del num first . num\r\n      == delOffset 0\r\n        \\del num first . del\r\n        \\del num first . first\r\n    first = select (head del) (head num) (strSubstring str 0 delOffset)\r\n    .\r\n    _recur\r\n      _basicSplitTokens\r\n        strSubstring str (strLen first) 0\r\n        pat\r\n        select true false false\r\n        cons first toks", lazy((function(L_str, L_pat, L_prevIsDel, L_toks) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_$p$p)(L_str, "")(L_toks)(function(){"use strict";return (function(){"use strict";
  var L_num_0, L_del_1, L_numOffset_2, L_delOffset_3, L_select_4, L_first_5;
  L_num_0 = function(){"use strict";return resolve(L_strMatch)(L_str, L_numberPat);};
  L_del_1 = function(){"use strict";return resolve(L_strMatch)(L_str, L_pat);};
  L_numOffset_2 = function(){"use strict";return resolve(L_matchOffset)(L_str, L_num_0);};
  L_delOffset_3 = function(){"use strict";return resolve(L_matchOffset)(L_str, L_del_1);};
  L_select_4 = function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_$p$p)(L_numOffset_2, 0);}, L_prevIsDel)(lazy(function(L_del_4){return function(L_num_5){return function(L_first_6){return resolve(L_num_5)}}}))(function(){"use strict";return resolve(L_$p$p)(L_delOffset_3, 0)(lazy(function(L_del_4){return function(L_num_5){return function(L_first_6){return resolve(L_del_4)}}}))(lazy(function(L_del_4){return function(L_num_5){return function(L_first_6){return resolve(L_first_6)}}}));});};
  L_first_5 = function(){"use strict";return resolve(L_select_4)(function(){"use strict";return resolve(L_head)(L_del_1);})(function(){"use strict";return resolve(L_head)(L_num_0);})(function(){"use strict";return resolve(L_strSubstring)(L_str, 0, L_delOffset_3);});};

  return resolve(L__recur)(function(){"use strict";return resolve(L__basicSplitTokens)(function(){"use strict";return resolve(L_strSubstring)(L_str, function(){"use strict";return resolve(L_strLen)(L_first_5);}, 0);}, L_pat, function(){"use strict";return resolve(L_select_4)(L_true)(L_false)(L_false);}, function(){"use strict";return resolve(L_cons)(L_first_5, L_toks);});})})();});
})))},
    function(){return resolve(L_newDefine)("tokens", 2, "tokens str pat = countedTokens emptyLineStarts str pat", lazy((function(L_str, L_pat) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_countedTokens)(L_emptyLineStarts, L_str, L_pat);
})))},
    function(){return resolve(L_newDefine)("countedTokens", 3, "countedTokens lineStarts str pat = makeTokens lineStarts (splitTokens str pat) 0", lazy((function(L_lineStarts, L_str, L_pat) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_makeTokens)(L_lineStarts, function(){"use strict";return resolve(L_splitTokens)(L_str, L_pat);}, 0);
})))},
    function(){return resolve(L_newDefine)("isTokenString", 2, "isTokenString tok str = or\r\n  and (isToken tok) (eq (tokenString tok) str)\r\n  and (isString tok) (eq tok str)", lazy((function(L_tok, L_str) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_or)(function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isToken)(L_tok);}, function(){"use strict";return resolve(L_eq)(function(){"use strict";return resolve(L_tokenString)(L_tok);}, L_str);});}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isString)(L_tok);}, function(){"use strict";return resolve(L_eq)(L_tok, L_str);});});
})))},
    function(){return resolve(L_newDefine)("isTokenStart", 2, "isTokenStart tok str = or\r\n  and (isToken tok) (strStartsWith (tokenString tok) str)\r\n  and (isString tok) (strStartsWith tok str)", lazy((function(L_tok, L_str) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_or)(function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isToken)(L_tok);}, function(){"use strict";return resolve(L_strStartsWith)(function(){"use strict";return resolve(L_tokenString)(L_tok);}, L_str);});}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isString)(L_tok);}, function(){"use strict";return resolve(L_strStartsWith)(L_tok, L_str);});});
})))},
    function(){return resolve(L_newDefine)("strTokenString", 1, "strTokenString tok = withToken tok nil \\str pos . str", lazy(function(L_tok){return resolve(L_withToken)(L_tok, L_nil, lazy(function(L_str){return function(L_pos){return resolve(L_str)}}))}))},
    function(){return resolve(L_newDefine)("withToken", 3, "withToken tok nonTokCase tokCase = isToken tok\r\n  tokCase (tokenString tok) (tokenPos tok)\r\n  isString tok\r\n    tokCase tok emptyFilePos\r\n    nonTokCase", lazy((function(L_tok, L_nonTokCase, L_tokCase) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isToken)(L_tok)(function(){"use strict";return resolve(L_tokCase)(function(){"use strict";return resolve(L_tokenString)(L_tok);})(function(){"use strict";return resolve(L_tokenPos)(L_tok);});})(function(){"use strict";return resolve(L_isString)(L_tok)(function(){"use strict";return resolve(L_tokCase)(L_tok)(L_emptyFilePos);})(L_nonTokCase);});
})))},
    function(){return resolve(L_newDefine)("parseToks", 2, "parseToks toks groups =\r\n  isNil toks nil\r\n    ifNotErr (parseTok toks groups) \\list . list \\h t .\r\n      ifNotErr (parseToks t groups) \\res .\r\n        cons h\r\n          and (isCons res) (isBlockStart (head res))\r\n            cons res nil\r\n            res", lazy((function(L_toks, L_groups) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_toks)(L_nil)(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_parseTok)(L_toks, L_groups);}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_parseToks)(L_t, L_groups);}, lazy(function(L_res){return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isCons)(L_res);}, function(){"use strict";return resolve(L_isBlockStart)(function(){"use strict";return resolve(L_head)(L_res);});})(function(){"use strict";return resolve(L_cons)(L_res, L_nil);})(L_res);})}))}}))}));});
})))},
    function(){return resolve(L_newDefine)("parseTok", 2, "parseTok toks groups = withCons toks nil \\h t .\r\n  withToken h toks \\txt pos .\r\n    assoc txt groups\r\n      \\close . parseGroup h t nil close groups\r\n      (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (parseIndent h t nil groups)\r\n        toks", lazy((function(L_toks, L_groups) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_toks, L_nil, lazy(function(L_h){return function(L_t){return resolve(L_withToken)(L_h, L_toks, lazy(function(L_txt){return function(L_pos){return resolve(L_assoc)(L_txt, L_groups)(lazy(function(L_close){return resolve(L_parseGroup)(L_h, L_t, L_nil, L_close, L_groups)}))(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_isTokenStart)(L_h, "\n");}, function(){"use strict";return resolve(L_isTokenStart)(L_h, "\r\n");})(function(){"use strict";return resolve(L_parseIndent)(L_h, L_t, L_nil, L_groups);})(L_toks);})}}))}}));
})))},
    function(){return resolve(L_newDefine)("parseGroup", 5, "parseGroup left toks gr close groups = withCons toks (parseErr 'Unterminated group starting ' (loc left))\r\n  \\h t . isTokenString h close\r\n    eq close ')'\r\n      cons (parensFromToks left h (reverse gr)) t\r\n      cons (cons left (cons (reverse gr) (cons h nil))) t\r\n    withToken h\r\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT .\r\n        parseGroup left restT (cons restH gr) close groups\r\n      \\txt pos .\r\n        rassoc txt groups\r\n          \\open . parseErr (strCat (cons 'Mismatched group: ' (cons (tokenString left) (cons txt (cons ' ' nil))))) (loc left)\r\n          ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseGroup left restT (cons restH gr) close groups", lazy((function(L_left, L_toks, L_gr, L_close, L_groups) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_toks, function(){"use strict";return resolve(L_parseErr)("Unterminated group starting ", function(){"use strict";return resolve(L_loc)(L_left);});}, lazy(function(L_h){return function(L_t){return resolve(L_isTokenString)(L_h, L_close)(function(){"use strict";return resolve(L_eq)(L_close, ")")(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_parensFromToks)(L_left, L_h, function(){"use strict";return resolve(L_reverse)(L_gr);});}, L_t);})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(L_left, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_reverse)(L_gr);}, function(){"use strict";return resolve(L_cons)(L_h, L_nil);});});}, L_t);});})(function(){"use strict";return resolve(L_withToken)(L_h, function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_parseTok)(L_toks, L_groups);}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_restH){return function(L_restT){return resolve(L_parseGroup)(L_left, L_restT, function(){"use strict";return resolve(L_cons)(L_restH, L_gr);}, L_close, L_groups)}}))}));}, lazy(function(L_txt){return function(L_pos){return resolve(L_rassoc)(L_txt, L_groups)(lazy(function(L_open){return resolve(L_parseErr)(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("Mismatched group: ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tokenString)(L_left);}, function(){"use strict";return resolve(L_cons)(L_txt, function(){"use strict";return resolve(L_cons)(" ", L_nil);});});});});}, function(){"use strict";return resolve(L_loc)(L_left);})}))(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_parseTok)(L_toks, L_groups);}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_restH){return function(L_restT){return resolve(L_parseGroup)(L_left, L_restT, function(){"use strict";return resolve(L_cons)(L_restH, L_gr);}, L_close, L_groups)}}))}));})}}));})}}));
})))},
    function(){return resolve(L_newDefine)("parseIndent", 4, "parseIndent indent toks gr groups =\r\n  withCons toks (cons (makeParens (tokenFilepos indent) (lexEnd (head gr)) (reverse gr)) nil)\r\n    \\h t . or (withToken h false (\\txt pos . rassoc txt groups (\\open . true) false))\r\n      and (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (<= (strLen (tokenString h)) (strLen (tokenString indent)))\r\n      cons (makeParens (tokenFilepos indent) (tokenFilepos h) (reverse gr)) toks\r\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseIndent indent restT (cons restH gr) groups", lazy((function(L_indent, L_toks, L_gr, L_groups) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_toks, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_makeParens)(function(){"use strict";return resolve(L_tokenFilepos)(L_indent);}, function(){"use strict";return resolve(L_lexEnd)(function(){"use strict";return resolve(L_head)(L_gr);});}, function(){"use strict";return resolve(L_reverse)(L_gr);});}, L_nil);}, lazy(function(L_h){return function(L_t){return resolve(L_or)(function(){"use strict";return resolve(L_withToken)(L_h, L_false, lazy(function(L_txt){return function(L_pos){return resolve(L_rassoc)(L_txt, L_groups)(lazy(function(L_open){return resolve(L_true)}))(L_false)}}));}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_isTokenStart)(L_h, "\n");}, function(){"use strict";return resolve(L_isTokenStart)(L_h, "\r\n");});}, function(){"use strict";return resolve(L_$y$p)(function(){"use strict";return resolve(L_strLen)(function(){"use strict";return resolve(L_tokenString)(L_h);});}, function(){"use strict";return resolve(L_strLen)(function(){"use strict";return resolve(L_tokenString)(L_indent);});});});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_makeParens)(function(){"use strict";return resolve(L_tokenFilepos)(L_indent);}, function(){"use strict";return resolve(L_tokenFilepos)(L_h);}, function(){"use strict";return resolve(L_reverse)(L_gr);});}, L_toks);})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_parseTok)(L_toks, L_groups);}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_restH){return function(L_restT){return resolve(L_parseIndent)(L_indent, L_restT, function(){"use strict";return resolve(L_cons)(L_restH, L_gr);}, L_groups)}}))}));})}}));
})))},
    function(){return resolve(L_newDefine)("nilRange", 0, "nilRange = cons 1 (cons 0 nil)", function(){"use strict";return resolve(L_cons)(1, function(){"use strict";return resolve(L_cons)(0, L_nil);});})},
    function(){return resolve(L_newDefine)("lit", 2, "lit value range = \\f . f value range", lazy(setDataType((function(L_value, L_range) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_value)(L_range)}, 'lit');
}), 'lit')))},
    function(){return resolve(L_newDefine)("ref", 2, "ref name range = \\f . f name range", lazy(setDataType((function(L_name, L_range) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_name)(L_range)}, 'ref');
}), 'ref')))},
    function(){return resolve(L_newDefine)("lambda", 3, "lambda name body range = \\f . f name body range", lazy(setDataType((function(L_name, L_body, L_range) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_name)(L_body)(L_range)}, 'lambda');
}), 'lambda')))},
    function(){return resolve(L_newDefine)("apply", 2, "apply func arg = \\f . f func arg", lazy(setDataType((function(L_func, L_arg) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_func)(L_arg)}, 'apply');
}), 'apply')))},
    function(){return resolve(L_newDefine)("let", 4, "let name value body range = \\f . f name value body range", lazy(setDataType((function(L_name, L_value, L_body, L_range) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_name)(L_value)(L_body)(L_range)}, 'let');
}), 'let')))},
    function(){return resolve(L_newDefine)("anno", 3, "anno name data body = \\f . f name data body", lazy(setDataType((function(L_name, L_data, L_body) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_name)(L_data)(L_body)}, 'anno');
}), 'anno')))},
    function(){return resolve(L_newDefine)("withParens", 3, "withParens p err cont = isParens p (p cont) err", lazy((function(L_p, L_err, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isParens)(L_p)(function(){"use strict";return resolve(L_p)(L_cont);})(L_err);
})))},
    function(){return resolve(L_newDefine)("setParens", 2, "setParens p func = isParens p\r\n  p \\start end content . parens start end (func content)\r\n  func p", lazy((function(L_p, L_func) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isParens)(L_p)(function(){"use strict";return resolve(L_p)(lazy(function(L_start){return function(L_end){return function(L_content){return resolve(L_parens)(L_start, L_end, function(){"use strict";return resolve(L_func)(L_content);})}}}));})(function(){"use strict";return resolve(L_func)(L_p);});
})))},
    function(){return resolve(L_newDefine)("position", 1, "position thing = isToken thing (tokenFilepos thing)\r\n  isParens thing (parensStart thing)\r\n    isCons thing\r\n      \\\\\r\n        pos = position (head thing)\r\n        .\r\n        isEmptyPos pos (position (tail thing)) pos\r\n      isFilepos thing thing\r\n        emptyFilePos", lazy(function(L_thing){return resolve(L_isToken)(L_thing)(function(){"use strict";return resolve(L_tokenFilepos)(L_thing);})(function(){"use strict";return resolve(L_isParens)(L_thing)(function(){"use strict";return resolve(L_parensStart)(L_thing);})(function(){"use strict";return resolve(L_isCons)(L_thing)(function(){"use strict";return (function(){"use strict";
  var L_pos_0;
  L_pos_0 = function(){"use strict";return resolve(L_position)(function(){"use strict";return resolve(L_head)(L_thing);});};

  return resolve(L_isEmptyPos)(L_pos_0)(function(){"use strict";return resolve(L_position)(function(){"use strict";return resolve(L_tail)(L_thing);});})(L_pos_0)})();})(function(){"use strict";return resolve(L_isFilepos)(L_thing)(L_thing)(L_emptyFilePos);});});})}))},
    function(){return resolve(L_newDefine)("lexEnd", 1, "lexEnd thing = isToken thing (addFilepos (tokenFilepos thing) (strLen (tokenString thing)))\r\n  isParens thing (parensEnd thing)\r\n    isCons thing (lexEnd (last thing))\r\n      emptyFilePos", lazy(function(L_thing){return resolve(L_isToken)(L_thing)(function(){"use strict";return resolve(L_addFilepos)(function(){"use strict";return resolve(L_tokenFilepos)(L_thing);}, function(){"use strict";return resolve(L_strLen)(function(){"use strict";return resolve(L_tokenString)(L_thing);});});})(function(){"use strict";return resolve(L_isParens)(L_thing)(function(){"use strict";return resolve(L_parensEnd)(L_thing);})(function(){"use strict";return resolve(L_isCons)(L_thing)(function(){"use strict";return resolve(L_lexEnd)(function(){"use strict";return resolve(L_last)(L_thing);});})(L_emptyFilePos);});})}))},
    function(){return resolve(L_newDefine)("loc", 1, "loc thing = \\\\\r\n  p = position thing\r\n  l = isEmptyPos p 'an unknown location' (showPos p)\r\n  .\r\n  strCat (cons 'at ' (cons l nil))", lazy(function(L_thing){return (function(){"use strict";
  var L_p_0, L_l_1;
  L_p_0 = function(){"use strict";return resolve(L_position)(L_thing);};
  L_l_1 = function(){"use strict";return resolve(L_isEmptyPos)(L_p_0)("an unknown location")(function(){"use strict";return resolve(L_showPos)(L_p_0);});};

  return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("at ", function(){"use strict";return resolve(L_cons)(L_l_1, L_nil);});})})()}))},
    function(){return resolve(L_newDefine)("scrub", 1, "scrub str = strFromList (scrubList (strToList str))", lazy(function(L_str){return resolve(L_strFromList)(function(){"use strict";return resolve(L_scrubList)(function(){"use strict";return resolve(L_strToList)(L_str);});})}))},
    function(){return resolve(L_newDefine)("scrubList", 1, "scrubList list = list\r\n  \\h t D . \\\\\r\n    next = scrubList t\r\n    .\r\n    eq h '\\\\' (cons h (cons (head t) (scrubList (tail t))))\r\n      eq h '\\\"' (cons '\\\\' (cons '\\\"' next))\r\n        cons h next\r\n  nil", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return (function(){"use strict";
  var L_next_0;
  L_next_0 = function(){"use strict";return resolve(L_scrubList)(L_t);};

  return resolve(L_eq)(L_h, "\\")(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_t);}, function(){"use strict";return resolve(L_scrubList)(function(){"use strict";return resolve(L_tail)(L_t);});});});})(function(){"use strict";return resolve(L_eq)(L_h, "\"")(function(){"use strict";return resolve(L_cons)("\\", function(){"use strict";return resolve(L_cons)("\"", L_next_0);});})(function(){"use strict";return resolve(L_cons)(L_h, L_next_0);});})})()}}}))(L_nil)}))},
    function(){return resolve(L_newDefine)("createAst", 3, "createAst lineStarts inList names = withStripped inList \\list .\r\n  isToken list (createLitOrRef list names)\r\n    list\r\n      \\h t D .\r\n        isTokenString h '\\\\\\\\' (createLet h t names)\r\n          isTokenString h '\\\\@' (createAnno h t names)\r\n            isTokenString h '\\\\' (createLambda h t names)\r\n              createApply list names\r\n      nil", lazy((function(L_lineStarts, L_inList, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withStripped)(L_inList, lazy(function(L_list){return resolve(L_isToken)(L_list)(function(){"use strict";return resolve(L_createLitOrRef)(L_list, L_names);})(function(){"use strict";return resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isTokenString)(L_h, "\\\\")(function(){"use strict";return resolve(L_createLet)(L_h, L_t, L_names);})(function(){"use strict";return resolve(L_isTokenString)(L_h, "\\@")(function(){"use strict";return resolve(L_createAnno)(L_h, L_t, L_names);})(function(){"use strict";return resolve(L_isTokenString)(L_h, "\\")(function(){"use strict";return resolve(L_createLambda)(L_h, L_t, L_names);})(function(){"use strict";return resolve(L_createApply)(L_list, L_names);});});})}}}))(L_nil);})}));
})))},
    function(){return resolve(L_newDefine)("strMatches", 2, "strMatches str pat = isCons (strMatch str pat)", lazy((function(L_str, L_pat) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isCons)(function(){"use strict";return resolve(L_strMatch)(L_str, L_pat);});
})))},
    function(){return resolve(L_newDefine)("digit", 0, "digit = regexp '^[0-9]+$'", function(){"use strict";return resolve(L_regexp)("^[0-9]+$");})},
    function(){return resolve(L_newDefine)("backslashCodes", 0, "backslashCodes = 'bfnrt'", "bfnrt")},
    function(){return resolve(L_newDefine)("backslashValues", 0, "backslashValues = '\\b\\f\\n\\r\\t'", "\b\f\n\r\t")},
    function(){return resolve(L_newDefine)("convertStringEscape", 3, "convertStringEscape char codes values =\r\n  eq codes ''\r\n    char\r\n    eq char (strAt codes 0)\r\n      strAt values 0\r\n      convertStringEscape char (strSubstring codes 1 0) (strSubstring values 1 0)", lazy((function(L_char, L_codes, L_values) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_eq)(L_codes, "")(L_char)(function(){"use strict";return resolve(L_eq)(L_char, function(){"use strict";return resolve(L_strAt)(L_codes, 0);})(function(){"use strict";return resolve(L_strAt)(L_values, 0);})(function(){"use strict";return resolve(L_convertStringEscape)(L_char, function(){"use strict";return resolve(L_strSubstring)(L_codes, 1, 0);}, function(){"use strict";return resolve(L_strSubstring)(L_values, 1, 0);});});});
})))},
    function(){return resolve(L_newDefine)("convertStringEscapes", 3, "convertStringEscapes orig str cont = \\\\\r\n  res = _convertStringEscapes orig str\r\n  .\r\n  hasType res parseErr\r\n    parseErr\r\n    cont res", lazy((function(L_orig, L_str, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_res_0;
  L_res_0 = function(){"use strict";return resolve(L__convertStringEscapes)(L_orig, L_str);};

  return resolve(L_hasType)(L_res_0, L_parseErr)(L_parseErr)(function(){"use strict";return resolve(L_cont)(L_res_0);})})();
})))},
    function(){return resolve(L_newDefine)("_convertStringEscapes", 2, "_convertStringEscapes orig str =\r\n  eq str '' str\r\n    eq (strAt str 0) '\\\\'\r\n      eq (strLen str) 1 (parseErr \"Error, backslash without character in string: \" orig)\r\n        \\\\\r\n          rest = _convertStringEscapes orig (strSubstring str 2 0)\r\n          .\r\n          hasType rest parseErr\r\n            rest\r\n            strAdd\r\n              convertStringEscape (strAt str 1) backslashCodes backslashValues\r\n              rest\r\n      \\\\\r\n        rest = _convertStringEscapes orig (strSubstring str 1 0)\r\n        .\r\n        hasType rest parseErr\r\n          rest\r\n          strAdd\r\n            strAt str 0\r\n            rest", lazy((function(L_orig, L_str) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_eq)(L_str, "")(L_str)(function(){"use strict";return resolve(L_eq)(function(){"use strict";return resolve(L_strAt)(L_str, 0);}, "\\")(function(){"use strict";return resolve(L_eq)(function(){"use strict";return resolve(L_strLen)(L_str);}, 1)(function(){"use strict";return resolve(L_parseErr)("Error, backslash without character in string: ", L_orig);})(function(){"use strict";return (function(){"use strict";
  var L_rest_0;
  L_rest_0 = function(){"use strict";return resolve(L__convertStringEscapes)(L_orig, function(){"use strict";return resolve(L_strSubstring)(L_str, 2, 0);});};

  return resolve(L_hasType)(L_rest_0, L_parseErr)(L_rest_0)(function(){"use strict";return resolve(L_strAdd)(function(){"use strict";return resolve(L_convertStringEscape)(function(){"use strict";return resolve(L_strAt)(L_str, 1);}, L_backslashCodes, L_backslashValues);}, L_rest_0);})})();});})(function(){"use strict";return (function(){"use strict";
  var L_rest_0;
  L_rest_0 = function(){"use strict";return resolve(L__convertStringEscapes)(L_orig, function(){"use strict";return resolve(L_strSubstring)(L_str, 1, 0);});};

  return resolve(L_hasType)(L_rest_0, L_parseErr)(L_rest_0)(function(){"use strict";return resolve(L_strAdd)(function(){"use strict";return resolve(L_strAt)(L_str, 0);}, L_rest_0);})})();});});
})))},
    function(){return resolve(L_newDefine)("parseString", 2, "parseString str cont =\r\n  neq (strAt str 0) (strAt str -1) (parseErr \"Badly terminated string: \" str)\r\n    convertStringEscapes str (strSubstring str 1 -1) cont", lazy((function(L_str, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_neq)(function(){"use strict";return resolve(L_strAt)(L_str, 0);}, function(){"use strict";return resolve(L_strAt)(L_str, -1);})(function(){"use strict";return resolve(L_parseErr)("Badly terminated string: ", L_str);})(function(){"use strict";return resolve(L_convertStringEscapes)(L_str, function(){"use strict";return resolve(L_strSubstring)(L_str, 1, -1);}, L_cont);});
})))},
    function(){return resolve(L_newDefine)("createLitOrRef", 2, "createLitOrRef token names = \\\\\r\n  tok = tokenString token\r\n  tokRange = (fileposList (position token))\r\n  .\r\n  contains names tok\r\n    ref tok tokRange\r\n    or (strStartsWith tok '\\\"') (strStartsWith tok \"'\")\r\n      parseString tok \\str . lit str tokRange\r\n      strStartsWith tok '.'\r\n        jsonParse (strCat (cons '0' (cons tok nil))) (\\err . ref tok tokRange) (\\item . lit item tokRange)\r\n        or (and (>= (strAt tok 0) '0') (<= (strAt tok 0) '9')) (strStartsWith tok '-')\r\n          jsonParse tok (\\err . ref tok tokRange) (\\item . lit item tokRange)\r\n          ref tok tokRange", lazy((function(L_token, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_tok_0, L_tokRange_1;
  L_tok_0 = function(){"use strict";return resolve(L_tokenString)(L_token);};
  L_tokRange_1 = function(){"use strict";return resolve(L_fileposList)(function(){"use strict";return resolve(L_position)(L_token);});};

  return resolve(L_contains)(L_names, L_tok_0)(function(){"use strict";return resolve(L_ref)(L_tok_0, L_tokRange_1);})(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_strStartsWith)(L_tok_0, "\"");}, function(){"use strict";return resolve(L_strStartsWith)(L_tok_0, "'");})(function(){"use strict";return resolve(L_parseString)(L_tok_0, lazy(function(L_str){return resolve(L_lit)(L_str, L_tokRange_1)}));})(function(){"use strict";return resolve(L_strStartsWith)(L_tok_0, ".")(function(){"use strict";return resolve(L_jsonParse)(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("0", function(){"use strict";return resolve(L_cons)(L_tok_0, L_nil);});});}, lazy(function(L_err){return resolve(L_ref)(L_tok_0, L_tokRange_1)}), lazy(function(L_item){return resolve(L_lit)(L_item, L_tokRange_1)}));})(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_$z$p)(function(){"use strict";return resolve(L_strAt)(L_tok_0, 0);}, "0");}, function(){"use strict";return resolve(L_$y$p)(function(){"use strict";return resolve(L_strAt)(L_tok_0, 0);}, "9");});}, function(){"use strict";return resolve(L_strStartsWith)(L_tok_0, "-");})(function(){"use strict";return resolve(L_jsonParse)(L_tok_0, lazy(function(L_err){return resolve(L_ref)(L_tok_0, L_tokRange_1)}), lazy(function(L_item){return resolve(L_lit)(L_item, L_tokRange_1)}));})(function(){"use strict";return resolve(L_ref)(L_tok_0, L_tokRange_1);});});});})})();
})))},
    function(){return resolve(L_newDefine)("createLambda", 3, "createLambda start list names = \\\\\r\n  err = parseErr \"Lambda needs a variable name, a dot, and a body \" (loc start)\r\n  .\r\n  withCons list err \\name rest .\r\n    withToken name err \\n p .\r\n      withCons rest err \\dot body .\r\n        # are these partial applications too hard to read?\r\n        isTokenString dot '.'\r\n          ifNotErr (createAst nil body (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))\r\n          ifNotErr (createLambda start rest (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))", lazy((function(L_start, L_list, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_err_0;
  L_err_0 = function(){"use strict";return resolve(L_parseErr)("Lambda needs a variable name, a dot, and a body ", function(){"use strict";return resolve(L_loc)(L_start);});};

  return resolve(L_withCons)(L_list, L_err_0, lazy(function(L_name){return function(L_rest){return resolve(L_withToken)(L_name, L_err_0, lazy(function(L_n){return function(L_p){return resolve(L_withCons)(L_rest, L_err_0, lazy(function(L_dot){return function(L_body){return resolve(L_isTokenString)(L_dot, ".")(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createAst)(L_nil, L_body, function(){"use strict";return resolve(L_cons)(L_n, L_names);});}, lazy(function(L_bodyAst){return resolve(L_lambda)(L_n, L_bodyAst, function(){"use strict";return resolve(L_fileposList)(function(){"use strict";return resolve(L_position)(L_name);});})}));})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createLambda)(L_start, L_rest, function(){"use strict";return resolve(L_cons)(L_n, L_names);});}, lazy(function(L_bodyAst){return resolve(L_lambda)(L_n, L_bodyAst, function(){"use strict";return resolve(L_fileposList)(function(){"use strict";return resolve(L_position)(L_name);});})}));})}}))}}))}}))})();
})))},
    function(){return resolve(L_newDefine)("createAnno", 3, "createAnno start list names =\r\n  withCons list (parseErr \"No annotation name or data in annotation \" (loc start)) \\name rest .\r\n    withCons rest (parseErr \"No data for annotation \" (loc start)) \\data rest . \\\\\r\n      finish data body = ifNotErr (createAst nil body names) \\bodyAst .\r\n        cleanTokens start name \\name .\r\n          cleanTokens start data \\data .\r\n            anno name data bodyAst\r\n      .\r\n      isTokenString data '.'\r\n        finish nil rest\r\n        withStripped data \\data .\r\n          withCons rest (parseErr \"No body for annotation \" (loc start)) \\dot body .\r\n            isTokenString dot '.'\r\n              finish data body\r\n              parseErr \"Annotation expects dot after name and data \" (loc start)", lazy((function(L_start, L_list, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_list, function(){"use strict";return resolve(L_parseErr)("No annotation name or data in annotation ", function(){"use strict";return resolve(L_loc)(L_start);});}, lazy(function(L_name){return function(L_rest){return resolve(L_withCons)(L_rest, function(){"use strict";return resolve(L_parseErr)("No data for annotation ", function(){"use strict";return resolve(L_loc)(L_start);});}, lazy(function(L_data){return function(L_rest_0){return (function(){"use strict";
  var L_finish_1;
  L_finish_1 = function(){"use strict";return function(L_data_1){return function(L_body){return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createAst)(L_nil, L_body, L_names);}, lazy(function(L_bodyAst){return resolve(L_cleanTokens)(L_start, L_name, lazy(function(L_name_2){return resolve(L_cleanTokens)(L_start, L_data_1, lazy(function(L_data_3){return resolve(L_anno)(L_name_2, L_data_3, L_bodyAst)}))}))}))}};};

  return resolve(L_isTokenString)(L_data, ".")(function(){"use strict";return resolve(L_finish_1)(L_nil)(L_rest_0);})(function(){"use strict";return resolve(L_withStripped)(L_data, lazy(function(L_data_2){return resolve(L_withCons)(L_rest_0, function(){"use strict";return resolve(L_parseErr)("No body for annotation ", function(){"use strict";return resolve(L_loc)(L_start);});}, lazy(function(L_dot){return function(L_body){return resolve(L_isTokenString)(L_dot, ".")(function(){"use strict";return resolve(L_finish_1)(L_data_2)(L_body);})(function(){"use strict";return resolve(L_parseErr)("Annotation expects dot after name and data ", function(){"use strict";return resolve(L_loc)(L_start);});})}}))}));})})()}}))}}));
})))},
    function(){return resolve(L_newDefine)("bodyStructPat", 0, "bodyStructPat = regexp '\\\\|\\\\\\\\|\\\\@'", function(){"use strict";return resolve(L_regexp)("\\|\\\\|\\@");})},
    function(){return resolve(L_newDefine)("createApply", 2, "createApply inList names = withStripped inList \\list .\r\n  withCons list (parseErr \"Funcion apply expecting a non-empty list \" (loc inList)) \\h t .\r\n    ifNotErr (createAst nil h names) \\func . chainApply func t names", lazy((function(L_inList, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withStripped)(L_inList, lazy(function(L_list){return resolve(L_withCons)(L_list, function(){"use strict";return resolve(L_parseErr)("Funcion apply expecting a non-empty list ", function(){"use strict";return resolve(L_loc)(L_inList);});}, lazy(function(L_h){return function(L_t){return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createAst)(L_nil, L_h, L_names);}, lazy(function(L_func){return resolve(L_chainApply)(L_func, L_t, L_names)}))}}))}));
})))},
    function(){return resolve(L_newDefine)("blockStarts", 0, "blockStarts = cons '\\\\' (cons '\\\\\\\\' (cons '\\\\@' nil))", function(){"use strict";return resolve(L_cons)("\\", function(){"use strict";return resolve(L_cons)("\\\\", function(){"use strict";return resolve(L_cons)("\\@", L_nil);});});})},
    function(){return resolve(L_newDefine)("chainApply", 3, "chainApply func list names = withCons list func \\argItem rest .\r\n  and (isToken argItem) (contains blockStarts (tokenString argItem))\r\n    ifNotErr (createAst nil list names) \\arg . apply func arg\r\n    ifNotErr (createAst nil argItem names) \\arg . chainApply (apply func arg) rest names", lazy((function(L_func, L_list, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_list, L_func, lazy(function(L_argItem){return function(L_rest){return resolve(L_and)(function(){"use strict";return resolve(L_isToken)(L_argItem);}, function(){"use strict";return resolve(L_contains)(L_blockStarts, function(){"use strict";return resolve(L_tokenString)(L_argItem);});})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createAst)(L_nil, L_list, L_names);}, lazy(function(L_arg){return resolve(L_apply)(L_func, L_arg)}));})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createAst)(L_nil, L_argItem, L_names);}, lazy(function(L_arg){return resolve(L_chainApply)(function(){"use strict";return resolve(L_apply)(L_func, L_arg);}, L_rest, L_names)}));})}}));
})))},
    function(){return resolve(L_newDefine)("cleanTokens", 3, "cleanTokens start toks cont = isToken toks\r\n  cont (tokenString toks)\r\n  withCons toks (cont toks) \\head tail .\r\n    cleanTokens start head \\head .\r\n      cleanTokens start tail \\tail .\r\n        cont (cons head tail)", lazy((function(L_start, L_toks, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isToken)(L_toks)(function(){"use strict";return resolve(L_cont)(function(){"use strict";return resolve(L_tokenString)(L_toks);});})(function(){"use strict";return resolve(L_withCons)(L_toks, function(){"use strict";return resolve(L_cont)(L_toks);}, lazy(function(L_head){return function(L_tail){return resolve(L_cleanTokens)(L_start, L_head, lazy(function(L_head_0){return resolve(L_cleanTokens)(L_start, L_tail, lazy(function(L_tail_1){return resolve(L_cont)(function(){"use strict";return resolve(L_cons)(L_head_0, L_tail_1);})}))}))}}));});
})))},
    function(){return resolve(L_newDefine)("createLet", 3, "createLet start list names = withCons list\r\n  parseErr \"No variable or body for let \" (loc start)\r\n  \\binding body . eq body nil (createAst nil binding names)\r\n    ifNotErr (getLetNames start list names) \\newNames .\r\n      createSublets start binding body newNames", lazy((function(L_start, L_list, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_list, function(){"use strict";return resolve(L_parseErr)("No variable or body for let ", function(){"use strict";return resolve(L_loc)(L_start);});}, lazy(function(L_binding){return function(L_body){return resolve(L_eq)(L_body, L_nil)(function(){"use strict";return resolve(L_createAst)(L_nil, L_binding, L_names);})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_getLetNames)(L_start, L_list, L_names);}, lazy(function(L_newNames){return resolve(L_createSublets)(L_start, L_binding, L_body, L_newNames)}));})}}));
})))},
    function(){return resolve(L_newDefine)("getLetNames", 3, "getLetNames start list names = \\\\\r\n  err = parseErr \"Let expected binding \" (loc start)\r\n  .\r\n  withCons list names \\binding body .\r\n    isTokenString binding '.' names\r\n      withParens binding err \\start end def .\r\n        withCons def err \\name rest .\r\n          withToken name err \\str pos .\r\n            getLetNames start body (cons str names)", lazy((function(L_start, L_list, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_err_0;
  L_err_0 = function(){"use strict";return resolve(L_parseErr)("Let expected binding ", function(){"use strict";return resolve(L_loc)(L_start);});};

  return resolve(L_withCons)(L_list, L_names, lazy(function(L_binding){return function(L_body){return resolve(L_isTokenString)(L_binding, ".")(L_names)(function(){"use strict";return resolve(L_withParens)(L_binding, L_err_0, lazy(function(L_start){return function(L_end){return function(L_def){return resolve(L_withCons)(L_def, L_err_0, lazy(function(L_name){return function(L_rest){return resolve(L_withToken)(L_name, L_err_0, lazy(function(L_str){return function(L_pos){return resolve(L_getLetNames)(L_start, L_body, function(){"use strict";return resolve(L_cons)(L_str, L_names);})}}))}}))}}}));})}}))})();
})))},
    function(){return resolve(L_newDefine)("createSublets", 4, "createSublets start binding body names =\r\n  isTokenString binding '.' (createAst nil body names)\r\n    withCons body (parseErr \"Let expected a body \" (loc start)) \\bodyH bodyT .\r\n      ifNotErr (getNameAndDef (parensStart binding) (parensContent binding) names) \\res . res \\name def .\r\n        ifNotErr (createSublets start bodyH bodyT names) \\bodyAst .\r\n          let (tokenString name) def bodyAst nilRange", lazy((function(L_start, L_binding, L_body, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isTokenString)(L_binding, ".")(function(){"use strict";return resolve(L_createAst)(L_nil, L_body, L_names);})(function(){"use strict";return resolve(L_withCons)(L_body, function(){"use strict";return resolve(L_parseErr)("Let expected a body ", function(){"use strict";return resolve(L_loc)(L_start);});}, lazy(function(L_bodyH){return function(L_bodyT){return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_getNameAndDef)(function(){"use strict";return resolve(L_parensStart)(L_binding);}, function(){"use strict";return resolve(L_parensContent)(L_binding);}, L_names);}, lazy(function(L_res){return resolve(L_res)(lazy(function(L_name){return function(L_def){return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createSublets)(L_start, L_bodyH, L_bodyT, L_names);}, lazy(function(L_bodyAst){return resolve(L_let)(function(){"use strict";return resolve(L_tokenString)(L_name);}, L_def, L_bodyAst, L_nilRange)}))}}))}))}}));});
})))},
    function(){return resolve(L_newDefine)("getNameAndDef", 3, "getNameAndDef pos binding names =\r\n  withCons (tail binding) (parseErr \"Let expected binding at \" pos) \\snd sndT .\r\n    isTokenString snd '=' (ifNotErr (createAst nil sndT names) \\def . cons (head binding) def)\r\n      ifNotErr (getLetLambda pos (tail binding) nil names) \\lamb . cons (head binding) lamb", lazy((function(L_pos, L_binding, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(function(){"use strict";return resolve(L_tail)(L_binding);}, function(){"use strict";return resolve(L_parseErr)("Let expected binding at ", L_pos);}, lazy(function(L_snd){return function(L_sndT){return resolve(L_isTokenString)(L_snd, "=")(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createAst)(L_nil, L_sndT, L_names);}, lazy(function(L_def){return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_binding);}, L_def)}));})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_getLetLambda)(L_pos, function(){"use strict";return resolve(L_tail)(L_binding);}, L_nil, L_names);}, lazy(function(L_lamb){return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_binding);}, L_lamb)}));})}}));
})))},
    function(){return resolve(L_newDefine)("getLetLambda", 4, "getLetLambda pos def args names =\r\n  withCons def (parseErr \"Let expected binding at \" pos) \\arg rest .\r\n    not (isToken arg) (parseErr \"Let expected binding at \" pos)\r\n      isTokenString arg '='\r\n        createAst nil (cons (token '\\\\' pos) (append (reverse args) (cons (token '.' (position arg)) rest))) names\r\n        getLetLambda pos rest (cons arg args) names", lazy((function(L_pos, L_def, L_args, L_names) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_def, function(){"use strict";return resolve(L_parseErr)("Let expected binding at ", L_pos);}, lazy(function(L_arg){return function(L_rest){return resolve(L_not)(function(){"use strict";return resolve(L_isToken)(L_arg);})(function(){"use strict";return resolve(L_parseErr)("Let expected binding at ", L_pos);})(function(){"use strict";return resolve(L_isTokenString)(L_arg, "=")(function(){"use strict";return resolve(L_createAst)(L_nil, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_token)("\\", L_pos);}, function(){"use strict";return resolve(L_append)(function(){"use strict";return resolve(L_reverse)(L_args);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_token)(".", function(){"use strict";return resolve(L_position)(L_arg);});}, L_rest);});});}, L_names);})(function(){"use strict";return resolve(L_getLetLambda)(L_pos, L_rest, function(){"use strict";return resolve(L_cons)(L_arg, L_args);}, L_names);});})}}));
})))},
    function(){return resolve(L_newDefine)("countedScanLineG", 7, "countedScanLineG lineStarts str pat groups props onDef onExpr = \\\\\r\n  toks = countedTokens lineStarts str pat\r\n  groupToks = foldr (\\el value . el \\h t . cons h (cons t value)) (cons '=' blockStarts) groups\r\n  .\r\n  # check if it's a definition\r\n  find (\\tok . or (contains groupToks (tokenString tok)) (isCons (strMatch (tokenString tok) '^\\r?\\n'))) toks (\\item . isTokenString item '=') false\r\n    toks \\name rest . \\\\\r\n      parseIt func = \\\\\r\n        parsed = parseToks (checkSetDataType func rest name) groups\r\n        .\r\n        onDef (ifNotErr parsed \\list . createDef list name (arity rest 0) str props)\r\n      .\r\n      isTokenString (head rest) '='\r\n        isTokenString (head (tail rest)) '\\\\'\r\n          parseIt (setTypeAnno (tail rest) (tokenString name))\r\n          parseIt (tail rest)\r\n        ifNotErr (transformDef name rest) \\def .\r\n          parseIt (cons (token '\\\\' (addFilepos (position (head rest)) -1)) def)\r\n    ifNotErr (parseToks toks groups) \\list . onExpr list", lazy((function(L_lineStarts, L_str, L_pat, L_groups, L_props, L_onDef, L_onExpr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_toks_0, L_groupToks_1;
  L_toks_0 = function(){"use strict";return resolve(L_countedTokens)(L_lineStarts, L_str, L_pat);};
  L_groupToks_1 = function(){"use strict";return resolve(L_foldr)(lazy(function(L_el){return function(L_value){return resolve(L_el)(lazy(function(L_h){return function(L_t){return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_cons)(L_t, L_value);})}}))}}), function(){"use strict";return resolve(L_cons)("=", L_blockStarts);}, L_groups);};

  return resolve(L_find)(lazy(function(L_tok){return resolve(L_or)(function(){"use strict";return resolve(L_contains)(L_groupToks_1, function(){"use strict";return resolve(L_tokenString)(L_tok);});}, function(){"use strict";return resolve(L_isCons)(function(){"use strict";return resolve(L_strMatch)(function(){"use strict";return resolve(L_tokenString)(L_tok);}, "^\r?\n");});})}), L_toks_0)(lazy(function(L_item){return resolve(L_isTokenString)(L_item, "=")}))(L_false)(function(){"use strict";return resolve(L_toks_0)(lazy(function(L_name){return function(L_rest){return (function(){"use strict";
  var L_parseIt_2;
  L_parseIt_2 = function(){"use strict";return function(L_func){return (function(){"use strict";
  var L_parsed_2;
  L_parsed_2 = function(){"use strict";return resolve(L_parseToks)(function(){"use strict";return resolve(L_checkSetDataType)(L_func, L_rest, L_name);}, L_groups);};

  return resolve(L_onDef)(function(){"use strict";return resolve(L_ifNotErr)(L_parsed_2, lazy(function(L_list){return resolve(L_createDef)(L_list, L_name, function(){"use strict";return resolve(L_arity)(L_rest, 0);}, L_str, L_props)}));})})()};};

  return resolve(L_isTokenString)(function(){"use strict";return resolve(L_head)(L_rest);}, "=")(function(){"use strict";return resolve(L_isTokenString)(function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(L_rest);});}, "\\")(function(){"use strict";return resolve(L_parseIt_2)(function(){"use strict";return resolve(L_setTypeAnno)(function(){"use strict";return resolve(L_tail)(L_rest);}, function(){"use strict";return resolve(L_tokenString)(L_name);});});})(function(){"use strict";return resolve(L_parseIt_2)(function(){"use strict";return resolve(L_tail)(L_rest);});});})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_transformDef)(L_name, L_rest);}, lazy(function(L_def){return resolve(L_parseIt_2)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_token)("\\", function(){"use strict";return resolve(L_addFilepos)(function(){"use strict";return resolve(L_position)(function(){"use strict";return resolve(L_head)(L_rest);});}, -1);});}, L_def);})}));})})()}}));})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_parseToks)(L_toks_0, L_groups);}, lazy(function(L_list){return resolve(L_onExpr)(L_list)}));})})();
})))},
    function(){return resolve(L_newDefine)("scanLineG", 5, "scanLineG str pat groups onDef onExpr = countedScanLineG emptyLineStarts str pat groups nil onDef onExpr", lazy((function(L_str, L_pat, L_groups, L_onDef, L_onExpr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_countedScanLineG)(L_emptyLineStarts, L_str, L_pat, L_groups, L_nil, L_onDef, L_onExpr);
})))},
    function(){return resolve(L_newDefine)("parseLineG", 6, "parseLineG str pat names groups onDef onExpr = \\\\\r\n  astCallback cb = \\list . ifNotErr (createAst nil list names) \\ast . cb ast\r\n  .\r\n  scanLineG str pat groups (astCallback onDef) (astCallback onExpr)", lazy((function(L_str, L_pat, L_names, L_groups, L_onDef, L_onExpr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_astCallback_0;
  L_astCallback_0 = function(){"use strict";return function(L_cb){return function(L_list){return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createAst)(L_nil, L_list, L_names);}, lazy(function(L_ast){return resolve(L_cb)(L_ast)}))}};};

  return resolve(L_scanLineG)(L_str, L_pat, L_groups, function(){"use strict";return resolve(L_astCallback_0)(L_onDef);}, function(){"use strict";return resolve(L_astCallback_0)(L_onExpr);})})();
})))},
    function(){return resolve(L_newDefine)("transformDef", 2, "transformDef name toks = withCons toks (parseErr \"Bad definition, expecting tokens\" (loc name)) \\h t .\r\n  isTokenString h '='\r\n    isTokenString (head t) '\\\\'\r\n      cons (token '.' (position h)) (setTypeAnno t (tokenString name))\r\n      cons (token '.' (position h)) t\r\n    ifNotErr (transformDef name t) \\list . cons h list", lazy((function(L_name, L_toks) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_toks, function(){"use strict";return resolve(L_parseErr)("Bad definition, expecting tokens", function(){"use strict";return resolve(L_loc)(L_name);});}, lazy(function(L_h){return function(L_t){return resolve(L_isTokenString)(L_h, "=")(function(){"use strict";return resolve(L_isTokenString)(function(){"use strict";return resolve(L_head)(L_t);}, "\\")(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_token)(".", function(){"use strict";return resolve(L_position)(L_h);});}, function(){"use strict";return resolve(L_setTypeAnno)(L_t, function(){"use strict";return resolve(L_tokenString)(L_name);});});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_token)(".", function(){"use strict";return resolve(L_position)(L_h);});}, L_t);});})(function(){"use strict";return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_transformDef)(L_name, L_t);}, lazy(function(L_list){return resolve(L_cons)(L_h, L_list)}));})}}));
})))},
    function(){return resolve(L_newDefine)("setTypeAnno", 2, "setTypeAnno toks name = \\\\\r\n  tok = \\str . token str (position toks)\r\n  .\r\n  cons (tok '\\\\@') (cons (tok 'type') (cons (tok name) (cons (tok '.') toks)))", lazy((function(L_toks, L_name) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_tok_0;
  L_tok_0 = function(){"use strict";return function(L_str){return resolve(L_token)(L_str, function(){"use strict";return resolve(L_position)(L_toks);})};};

  return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)("\\@");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)("type");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)(L_name);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)(".");}, L_toks);});});})})();
})))},
    function(){return resolve(L_newDefine)("setDataTypeAnno", 2, "setDataTypeAnno toks name = \\\\\r\n  tok = \\str . token str (position toks)\r\n  .\r\n  cons (tok '\\\\@') (cons (tok 'dataType') (cons (tok (tokenString name)) (cons (tok '.') toks)))", lazy((function(L_toks, L_name) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_tok_0;
  L_tok_0 = function(){"use strict";return function(L_str){return resolve(L_token)(L_str, function(){"use strict";return resolve(L_position)(L_toks);})};};

  return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)("\\@");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)("dataType");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)(function(){"use strict";return resolve(L_tokenString)(L_name);});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)(".");}, L_toks);});});})})();
})))},
    function(){return resolve(L_newDefine)("createDef", 5, "createDef def name arity src props = \\\\\r\n  #tok str = token str (position def)\r\n  tok str = token str (position name)\r\n  .\r\n  jsonStringify (tokenString name) (\\err . parseErr (strCat (cons \"Bad function name \" (cons (loc name) nil))) err) \\nameStr .\r\n    jsonStringify src (\\err . parseErr (strCat (cons \"Bad source \" (cons (loc name) nil))) err) \\srcStr .\r\n      #cons '\\\\@' (cons 'leisureName' (cons (tokenString name) (cons '.' (cons (tok 'define') (cons (tok nameStr) (cons (tok (strString arity)) (cons (tok srcStr) (cons (spliceFuncProps arity props def) nil))))))))\r\n      cons '\\\\@' (cons 'leisureName' (cons (tokenString name) (cons '.' (cons (tok 'newDefine') (cons (tok nameStr) (cons (tok (strString arity)) (cons (tok srcStr) (cons '\\\\@' (cons 'arity' (cons arity (cons '.' (cons (spliceFuncProps arity props def) nil))))))))))))", lazy((function(L_def, L_name, L_arity, L_src, L_props) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_tok_0;
  L_tok_0 = function(){"use strict";return function(L_str){return resolve(L_token)(L_str, function(){"use strict";return resolve(L_position)(L_name);})};};

  return resolve(L_jsonStringify)(function(){"use strict";return resolve(L_tokenString)(L_name);}, lazy(function(L_err){return resolve(L_parseErr)(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("Bad function name ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_loc)(L_name);}, L_nil);});});}, L_err)}), lazy(function(L_nameStr){return resolve(L_jsonStringify)(L_src, lazy(function(L_err){return resolve(L_parseErr)(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("Bad source ", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_loc)(L_name);}, L_nil);});});}, L_err)}), lazy(function(L_srcStr){return resolve(L_cons)("\\@", function(){"use strict";return resolve(L_cons)("leisureName", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tokenString)(L_name);}, function(){"use strict";return resolve(L_cons)(".", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)("newDefine");}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)(L_nameStr);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)(function(){"use strict";return resolve(L_strString)(L_arity);});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tok_0)(L_srcStr);}, function(){"use strict";return resolve(L_cons)("\\@", function(){"use strict";return resolve(L_cons)("arity", function(){"use strict";return resolve(L_cons)(L_arity, function(){"use strict";return resolve(L_cons)(".", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_spliceFuncProps)(L_arity, L_props, L_def);}, L_nil);});});});});});});});});});});});})}))}))})();
})))},
    function(){return resolve(L_newDefine)("spliceFuncProps", 3, "spliceFuncProps arity props ast = or (isNil props) (== arity 0)\r\n  ast\r\n  subSpliceFuncProps props ast", lazy((function(L_arity, L_props, L_ast) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_or)(function(){"use strict";return resolve(L_isNil)(L_props);}, function(){"use strict";return resolve(L_$p$p)(L_arity, 0);})(L_ast)(function(){"use strict";return resolve(L_subSpliceFuncProps)(L_props, L_ast);});
})))},
    function(){return resolve(L_newDefine)("subSpliceFuncProps", 2, "subSpliceFuncProps props ast = \\\\\r\n  slash = head ast\r\n  var = head (tail ast)\r\n  afterVar = tail (tail ast)\r\n  dot = head afterVar\r\n  body = tail afterVar\r\n  .\r\n  isTokenString slash '\\\\'\r\n    cons\r\n      slash\r\n      cons\r\n        var\r\n        isTokenString dot '.'\r\n          cons dot (addProps props body)\r\n          cons '.' (addProps props afterVar)\r\n    cons\r\n      head ast\r\n      subSpliceFuncProps props (tail ast)", lazy((function(L_props, L_ast) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_slash_0, L_var_1, L_afterVar_2, L_dot_3, L_body_4;
  L_slash_0 = function(){"use strict";return resolve(L_head)(L_ast);};
  L_var_1 = function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(L_ast);});};
  L_afterVar_2 = function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_tail)(L_ast);});};
  L_dot_3 = function(){"use strict";return resolve(L_head)(L_afterVar_2);};
  L_body_4 = function(){"use strict";return resolve(L_tail)(L_afterVar_2);};

  return resolve(L_isTokenString)(L_slash_0, "\\")(function(){"use strict";return resolve(L_cons)(L_slash_0, function(){"use strict";return resolve(L_cons)(L_var_1, function(){"use strict";return resolve(L_isTokenString)(L_dot_3, ".")(function(){"use strict";return resolve(L_cons)(L_dot_3, function(){"use strict";return resolve(L_addProps)(L_props, L_body_4);});})(function(){"use strict";return resolve(L_cons)(".", function(){"use strict";return resolve(L_addProps)(L_props, L_afterVar_2);});});});});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_ast);}, function(){"use strict";return resolve(L_subSpliceFuncProps)(L_props, function(){"use strict";return resolve(L_tail)(L_ast);});});})})();
})))},
    function(){return resolve(L_newDefine)("addProps", 2, "addProps props ast = foldr\r\n  \\prop result . cons '\\\\@' (cons (head prop) (cons (tail prop) (cons '.' result)))\r\n  ast\r\n  props", lazy((function(L_props, L_ast) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_foldr)(lazy(function(L_prop){return function(L_result){return resolve(L_cons)("\\@", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_prop);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_tail)(L_prop);}, function(){"use strict";return resolve(L_cons)(".", L_result);});});})}}), L_ast, L_props);
})))},
    function(){return resolve(L_newDefine)("checkSetDataType", 3, "checkSetDataType toks curToks name = withCons curToks toks \\h t .\r\n  isTokenString h '='\r\n    isTokenString (head t) '\\\\'\r\n      setDataTypeAnno toks name\r\n      toks\r\n    checkSetDataType toks t name", lazy((function(L_toks, L_curToks, L_name) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_withCons)(L_curToks, L_toks, lazy(function(L_h){return function(L_t){return resolve(L_isTokenString)(L_h, "=")(function(){"use strict";return resolve(L_isTokenString)(function(){"use strict";return resolve(L_head)(L_t);}, "\\")(function(){"use strict";return resolve(L_setDataTypeAnno)(L_toks, L_name);})(L_toks);})(function(){"use strict";return resolve(L_checkSetDataType)(L_toks, L_t, L_name);})}}));
})))},
    function(){return resolve(L_newDefine)("arity", 2, "arity toks n = isTokenString (head toks) '=' n (arity (tail toks) (+ n 1))", lazy((function(L_toks, L_n) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isTokenString)(function(){"use strict";return resolve(L_head)(L_toks);}, "=")(L_n)(function(){"use strict";return resolve(L_arity)(function(){"use strict";return resolve(L_tail)(L_toks);}, function(){"use strict";return resolve(L_$o)(L_n, 1);});});
})))},
    function(){return resolve(L_newDefine)("tokListStr", 1, "tokListStr toks = jsonStringify (join (map (\\t . tokenString t) toks) ' ')", lazy(function(L_toks){return resolve(L_jsonStringify)(function(){"use strict";return resolve(L_join)(function(){"use strict";return resolve(L_map)(lazy(function(L_t){return resolve(L_tokenString)(L_t)}), L_toks);}, " ");})}))},
    function(){return resolve(L_newDefine)("linePat", 0, "linePat = regexp '\\\\r?\\\\n(?=[^ ]|$)'", function(){"use strict";return resolve(L_regexp)("\\r?\\n(?=[^ ]|$)");})},
    function(){return resolve(L_newDefine)("emptyLinePat", 0, "emptyLinePat = regexp '(^[ \\\\i]*\\\\#.*|^[ \\\\i]*$|^\\\\r?\\\\n[ \\\\i]*$)'", function(){"use strict";return resolve(L_regexp)("(^[ \\i]*\\#.*|^[ \\i]*$|^\\r?\\n[ \\i]*$)");})},
    function(){return resolve(L_newDefine)("lineScrub", 0, "lineScrub = regexpFlags '\\\\r\\\\n' 'g'", function(){"use strict";return resolve(L_regexpFlags)("\\r\\n", "g");})},
    function(){return resolve(L_newDefine)("linesForFile", 1, "linesForFile text = map tail (countedLinesForFile \"NOTHING.lsr\" text)", lazy(function(L_text){return resolve(L_map)(L_tail, function(){"use strict";return resolve(L_countedLinesForFile)("NOTHING.lsr", L_text);})}))},
    function(){return resolve(L_newDefine)("countedLinesForFile", 2, "countedLinesForFile name text = filter\r\n  \\line . isNil (strMatch (tail line) emptyLinePat)\r\n  countedLines name 1 text", lazy((function(L_name, L_text) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_filter)(lazy(function(L_line){return resolve(L_isNil)(function(){"use strict";return resolve(L_strMatch)(function(){"use strict";return resolve(L_tail)(L_line);}, L_emptyLinePat);})}), function(){"use strict";return resolve(L_countedLines)(L_name, 1, L_text);});
})))},
    function(){return resolve(L_newDefine)("countedLines", 3, "countedLines filename lineOffset str = reverse\r\n  _withRecur\r\n    _countedLines filename lineOffset str nil", lazy((function(L_filename, L_lineOffset, L_str) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_reverse)(function(){"use strict";return resolve(L__withRecur)(function(){"use strict";return resolve(L__countedLines)(L_filename, L_lineOffset, L_str, L_nil);});});
})))},
    function(){return resolve(L_newDefine)("_countedLines", 4, "_countedLines filename lineOffset str lines = \\\\\r\n  m = strMatch str linePat\r\n  idx = head (tail (tail m))\r\n  chunk = strSubstring str 0 idx\r\n  next = + idx (strLen (head m))\r\n  chunkLines = findLines 0 chunk\r\n  .\r\n  eq str ''\r\n    lines\r\n    isNil m\r\n      cons (cons (cons filename (cons lineOffset (tail (findLines 0 str)))) str) lines\r\n      _recur\r\n        _countedLines filename (+ lineOffset (length chunkLines)) (strSubstring str next 0)\r\n          cons (cons (cons filename (cons lineOffset (tail chunkLines))) chunk) lines", lazy((function(L_filename, L_lineOffset, L_str, L_lines) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_m_0, L_idx_1, L_chunk_2, L_next_3, L_chunkLines_4;
  L_m_0 = function(){"use strict";return resolve(L_strMatch)(L_str, L_linePat);};
  L_idx_1 = function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_tail)(L_m_0);});});};
  L_chunk_2 = function(){"use strict";return resolve(L_strSubstring)(L_str, 0, L_idx_1);};
  L_next_3 = function(){"use strict";return resolve(L_$o)(L_idx_1, function(){"use strict";return resolve(L_strLen)(function(){"use strict";return resolve(L_head)(L_m_0);});});};
  L_chunkLines_4 = function(){"use strict";return resolve(L_findLines)(0, L_chunk_2);};

  return resolve(L_eq)(L_str, "")(L_lines)(function(){"use strict";return resolve(L_isNil)(L_m_0)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(L_filename, function(){"use strict";return resolve(L_cons)(L_lineOffset, function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_findLines)(0, L_str);});});});}, L_str);}, L_lines);})(function(){"use strict";return resolve(L__recur)(function(){"use strict";return resolve(L__countedLines)(L_filename, function(){"use strict";return resolve(L_$o)(L_lineOffset, function(){"use strict";return resolve(L_length)(L_chunkLines_4);});}, function(){"use strict";return resolve(L_strSubstring)(L_str, L_next_3, 0);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(L_filename, function(){"use strict";return resolve(L_cons)(L_lineOffset, function(){"use strict";return resolve(L_tail)(L_chunkLines_4);});});}, L_chunk_2);}, L_lines);});});});})})();
})))},
    function(){return resolve(L_newDefine)("defPat", 0, "defPat = regexp '^[^ =]+.* =( |$)'", function(){"use strict";return resolve(L_regexp)("^[^ =]+.* =( |$)");})},
    function(){return resolve(L_newDefine)("unanchoredDefPat", 0, "unanchoredDefPat = regexp '^((?:\\\\s*\\\\n|#[^\\\\n]*\\\\n)*)([^=\\\\n]*)(=\\\\([^=]+=|=)?'", function(){"use strict";return resolve(L_regexp)("^((?:\\s*\\n|#[^\\n]*\\n)*)([^=\\n]*)(=\\([^=]+=|=)?");})},
    function(){return resolve(L_newDefine)("namesForLines", 1, "namesForLines lines = foldl\r\n  \\result line . \\\\\r\n    m = strMatch line defPat\r\n    .\r\n    isNil m result (cons (head (tail m)) result)\r\n  nil\r\n  lines", lazy(function(L_lines){return resolve(L_foldl)(lazy(function(L_result){return function(L_line){return (function(){"use strict";
  var L_m_0;
  L_m_0 = function(){"use strict";return resolve(L_strMatch)(L_line, L_defPat);};

  return resolve(L_isNil)(L_m_0)(L_result)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(L_m_0);});}, L_result);})})()}}), L_nil, L_lines)}))},
    function(){return resolve(L_newDefine)("runParseFilters", 2, "runParseFilters filters line = filters\r\n  \\h t D . primBind (h line) \\filtered . runParseFilters t filtered\r\n  fakereturn line", lazy((function(L_filters, L_line) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_filters)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_primBind)(function(){"use strict";return resolve(L_h)(L_line);}, lazy(function(L_filtered){return resolve(L_runParseFilters)(L_t, L_filtered)}))}}}))(function(){"use strict";return resolve(L_fakereturn)(L_line);});
})))},
    function(){return resolve(L_newDefine)("isBlockStart", 1, "isBlockStart tok = and\r\n  or (isToken tok) (isString tok)\r\n  contains blockStarts (strTokenString tok)", lazy(function(L_tok){return resolve(L_and)(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_isToken)(L_tok);}, function(){"use strict";return resolve(L_isString)(L_tok);});}, function(){"use strict";return resolve(L_contains)(L_blockStarts, function(){"use strict";return resolve(L_strTokenString)(L_tok);});})}))},
    function(){return resolve(L_newDefine)("macroSub", 2, "macroSub macs expr = postProcessMacro (emptyFor expr) (emptyFor expr) (baseMacroSub macs expr)", lazy((function(L_macs, L_expr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_postProcessMacro)(function(){"use strict";return resolve(L_emptyFor)(L_expr);}, function(){"use strict";return resolve(L_emptyFor)(L_expr);}, function(){"use strict";return resolve(L_baseMacroSub)(L_macs, L_expr);});
})))},
    function(){return resolve(L_newDefine)("consifyMacroValue", 1, "consifyMacroValue value = isCons value value (cons value nil)", lazy(function(L_value){return resolve(L_isCons)(L_value)(L_value)(function(){"use strict";return resolve(L_cons)(L_value, L_nil);})}))},
    function(){return resolve(L_newDefine)("baseMacroSub", 2, "baseMacroSub macs expr = isToken expr\r\n  expr\r\n  isParens expr\r\n    expr \\start end content . \\\\\r\n      result = baseMacroSub macs content\r\n      .\r\n      isToken result result (parens start end result)\r\n    withCons expr expr \\h t .\r\n      isBlockStart h\r\n        cons h\r\n          isTokenString h '\\\\\\\\'\r\n            macroSubLet macs t\r\n            macroSubBody '.' macs t\r\n        withToken h\r\n          \\\\\r\n            subH = baseMacroSub macs h\r\n            .\r\n            withToken subH\r\n              cons subH (map (baseMacroSub macs) t)\r\n              \\tok pos . baseMacroSub macs (cons subH t)\r\n          \\tok pos . assoc tok macs\r\n            \\def . baseMacroSub macs (def t)\r\n            cons h (map (baseMacroSub macs) t)", lazy((function(L_macs, L_expr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isToken)(L_expr)(L_expr)(function(){"use strict";return resolve(L_isParens)(L_expr)(function(){"use strict";return resolve(L_expr)(lazy(function(L_start){return function(L_end){return function(L_content){return (function(){"use strict";
  var L_result_0;
  L_result_0 = function(){"use strict";return resolve(L_baseMacroSub)(L_macs, L_content);};

  return resolve(L_isToken)(L_result_0)(L_result_0)(function(){"use strict";return resolve(L_parens)(L_start, L_end, L_result_0);})})()}}}));})(function(){"use strict";return resolve(L_withCons)(L_expr, L_expr, lazy(function(L_h){return function(L_t){return resolve(L_isBlockStart)(L_h)(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_isTokenString)(L_h, "\\\\")(function(){"use strict";return resolve(L_macroSubLet)(L_macs, L_t);})(function(){"use strict";return resolve(L_macroSubBody)(".", L_macs, L_t);});});})(function(){"use strict";return resolve(L_withToken)(L_h, function(){"use strict";return (function(){"use strict";
  var L_subH_0;
  L_subH_0 = function(){"use strict";return resolve(L_baseMacroSub)(L_macs, L_h);};

  return resolve(L_withToken)(L_subH_0, function(){"use strict";return resolve(L_cons)(L_subH_0, function(){"use strict";return resolve(L_map)(function(){"use strict";return resolve(L_baseMacroSub)(L_macs);}, L_t);});}, lazy(function(L_tok){return function(L_pos){return resolve(L_baseMacroSub)(L_macs, function(){"use strict";return resolve(L_cons)(L_subH_0, L_t);})}}))})();}, lazy(function(L_tok){return function(L_pos){return resolve(L_assoc)(L_tok, L_macs)(lazy(function(L_def){return resolve(L_baseMacroSub)(L_macs, function(){"use strict";return resolve(L_def)(L_t);})}))(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_map)(function(){"use strict";return resolve(L_baseMacroSub)(L_macs);}, L_t);});})}}));})}}));});});
})))},
    function(){return resolve(L_newDefine)("macroSubLet", 2, "macroSubLet macs list = list\r\n  \\h t D . isTokenString h '.'\r\n    cons h (baseMacroSub macs t)\r\n    cons (setParens h \\content . macroSubBody '=' macs content) (macroSubLet macs t)\r\n  # Don't bother with parse errors at this point -- ast generator will detect them\r\n  nil", lazy((function(L_macs, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isTokenString)(L_h, ".")(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_baseMacroSub)(L_macs, L_t);});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_setParens)(L_h, lazy(function(L_content){return resolve(L_macroSubBody)("=", L_macs, L_content)}));}, function(){"use strict";return resolve(L_macroSubLet)(L_macs, L_t);});})}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("macroSubBody", 3, "macroSubBody char macs list = list\r\n  \\h t D . cons h\r\n    isTokenString h char baseMacroSub (macroSubBody char)\r\n      macs\r\n      t\r\n  nil", lazy((function(L_char, L_macs, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_isTokenString)(L_h, L_char)(L_baseMacroSub)(function(){"use strict";return resolve(L_macroSubBody)(L_char);})(L_macs)(L_t);})}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("postProcessMacro", 3, "postProcessMacro before after expr = isString expr\r\n  token expr (isEmptyPos after before after)\r\n  isParens expr\r\n    expr \\start end contents . parens start end (postProcessMacro start end contents)\r\n    isCons expr\r\n      expr \\h t .\r\n        isToken h\r\n          cons h (postProcessMacro (addFilepos (addFilepos (tokenFilepos h) (strLen (tokenString h))) 1) (emptyFor h) t)\r\n          \\\\\r\n            posStart = position h\r\n            posEnd = position t\r\n            t2 = postProcessMacro (emptyFor posStart) after t\r\n            h2 = postProcessMacro before (emptyFor posStart) h\r\n            .\r\n            isEmptyPos posStart\r\n              cons (postProcessMacro before (position t2) h) t2\r\n              cons h2 (postProcessMacro (addFilepos (lexEnd h2) 1) after t)\r\n      isNumber expr\r\n        token (strString expr) (isEmptyPos after before after)\r\n        expr", lazy((function(L_before, L_after, L_expr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isString)(L_expr)(function(){"use strict";return resolve(L_token)(L_expr, function(){"use strict";return resolve(L_isEmptyPos)(L_after)(L_before)(L_after);});})(function(){"use strict";return resolve(L_isParens)(L_expr)(function(){"use strict";return resolve(L_expr)(lazy(function(L_start){return function(L_end){return function(L_contents){return resolve(L_parens)(L_start, L_end, function(){"use strict";return resolve(L_postProcessMacro)(L_start, L_end, L_contents);})}}}));})(function(){"use strict";return resolve(L_isCons)(L_expr)(function(){"use strict";return resolve(L_expr)(lazy(function(L_h){return function(L_t){return resolve(L_isToken)(L_h)(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_postProcessMacro)(function(){"use strict";return resolve(L_addFilepos)(function(){"use strict";return resolve(L_addFilepos)(function(){"use strict";return resolve(L_tokenFilepos)(L_h);}, function(){"use strict";return resolve(L_strLen)(function(){"use strict";return resolve(L_tokenString)(L_h);});});}, 1);}, function(){"use strict";return resolve(L_emptyFor)(L_h);}, L_t);});})(function(){"use strict";return (function(){"use strict";
  var L_posStart_0, L_posEnd_1, L_t2_2, L_h2_3;
  L_posStart_0 = function(){"use strict";return resolve(L_position)(L_h);};
  L_posEnd_1 = function(){"use strict";return resolve(L_position)(L_t);};
  L_t2_2 = function(){"use strict";return resolve(L_postProcessMacro)(function(){"use strict";return resolve(L_emptyFor)(L_posStart_0);}, L_after, L_t);};
  L_h2_3 = function(){"use strict";return resolve(L_postProcessMacro)(L_before, function(){"use strict";return resolve(L_emptyFor)(L_posStart_0);}, L_h);};

  return resolve(L_isEmptyPos)(L_posStart_0)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_postProcessMacro)(L_before, function(){"use strict";return resolve(L_position)(L_t2_2);}, L_h);}, L_t2_2);})(function(){"use strict";return resolve(L_cons)(L_h2_3, function(){"use strict";return resolve(L_postProcessMacro)(function(){"use strict";return resolve(L_addFilepos)(function(){"use strict";return resolve(L_lexEnd)(L_h2_3);}, 1);}, L_after, L_t);});})})();})}}));})(function(){"use strict";return resolve(L_isNumber)(L_expr)(function(){"use strict";return resolve(L_token)(function(){"use strict";return resolve(L_strString)(L_expr);}, function(){"use strict";return resolve(L_isEmptyPos)(L_after)(L_before)(L_after);});})(L_expr);});});});
})))},
    function(){return resolve(L_newDefine)("defMacro", 2, "defMacro name def = primBind (getValue 'macroDefs')\r\n  \\macs . setValue 'macroDefs' (acons name def macs)", lazy((function(L_name, L_def) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("macroDefs");}, lazy(function(L_macs){return resolve(L_setValue)("macroDefs", function(){"use strict";return resolve(L_acons)(L_name, L_def, L_macs);})}));
})))},
    function(){return resolve(L_newDefine)("delimiterListPrefix", 0, "delimiterListPrefix = \"\\\"(?:\\\\\\\\.|[^\\\"])*\\\"|'(?:\\\\\\\\.|[^'])*'|\\\\r?\\\\n *#[^\\\\r\\\\n]*|\\\\r?\\\\n *| +|#[^\\\\r\\\\n]*\"", "\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|\\r?\\n *#[^\\r\\n]*|\\r?\\n *| +|#[^\\r\\n]*")},
    function(){return resolve(L_newDefine)("regexpEscapePat", 0, "regexpEscapePat = regexpFlags '[\\\\-\\\\[\\\\]/\\\\{\\\\}\\\\(\\\\)\\\\*\\\\+\\\\?\\\\.\\\\\\\\\\\\^\\\\$\\\\|]' 'g'", function(){"use strict";return resolve(L_regexpFlags)("[\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]", "g");})},
    function(){return resolve(L_newDefine)("addToken", 1, "addToken del = primBind (getValue 'tokenList')\r\n  \\dels . contains dels del\r\n    false\r\n    \\\\\r\n      newDels = insertSorted (\\a b . > (strLen a) (strLen b)) del dels\r\n      .\r\n      primBind (setValue 'tokenList' newDels)\r\n        \\_ . computeTokenPat newDels", lazy(function(L_del){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenList");}, lazy(function(L_dels){return resolve(L_contains)(L_dels, L_del)(L_false)(function(){"use strict";return (function(){"use strict";
  var L_newDels_0;
  L_newDels_0 = function(){"use strict";return resolve(L_insertSorted)(lazy(function(L_a){return function(L_b){return resolve(L_$z)(function(){"use strict";return resolve(L_strLen)(L_a);}, function(){"use strict";return resolve(L_strLen)(L_b);})}}), L_del, L_dels);};

  return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("tokenList", L_newDels_0);}, lazy(function(L__){return resolve(L_computeTokenPat)(L_newDels_0)}))})();})}))}))},
    function(){return resolve(L_newDefine)("computeTokenPat", 1, "computeTokenPat dels = \\\\\r\n  delPats = map (\\item . strReplace item regexpEscapePat \"\\\\$&\") dels\r\n  newPat = strCat (cons '(' (cons (join (cons delimiterListPrefix delPats) '|') (cons ')' nil)))\r\n  .\r\n  setValue 'tokenPat' newPat", lazy(function(L_dels){return (function(){"use strict";
  var L_delPats_0, L_newPat_1;
  L_delPats_0 = function(){"use strict";return resolve(L_map)(lazy(function(L_item){return resolve(L_strReplace)(L_item, L_regexpEscapePat, "\\$&")}), L_dels);};
  L_newPat_1 = function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)("(", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_join)(function(){"use strict";return resolve(L_cons)(L_delimiterListPrefix, L_delPats_0);}, "|");}, function(){"use strict";return resolve(L_cons)(")", L_nil);});});});};

  return resolve(L_setValue)("tokenPat", L_newPat_1)})()}))},
    function(){return resolve(L_newDefine)("addTokenGroup", 2, "addTokenGroup open close = primBind (addToken open)\r\n  \\_ . primBind (addToken close)\r\n    \\_ . primBind (getValue 'tokenGroups')\r\n      \\gr . setValue 'tokenGroups' (acons open close gr)", lazy((function(L_open, L_close) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_addToken)(L_open);}, lazy(function(L__){return resolve(L_primBind)(function(){"use strict";return resolve(L_addToken)(L_close);}, lazy(function(L___0){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenGroups");}, lazy(function(L_gr){return resolve(L_setValue)("tokenGroups", function(){"use strict";return resolve(L_acons)(L_open, L_close, L_gr);})}))}))}));
})))},
    function(){return resolve(L_newDefine)("parenGroups", 0, "parenGroups = acons '(' ')' nil", function(){"use strict";return resolve(L_acons)("(", ")", L_nil);})},
    function(){return resolve(L_newDefine)("testParse", 2, "testParse str pat = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil parenGroups) \\list . list \\h t . stripParens h", lazy((function(L_str, L_pat) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_ifNotErr)(function(){"use strict";return resolve(L_parseIndent)(function(){"use strict";return resolve(L_token)("\n", L_startFilePos);}, function(){"use strict";return resolve(L_tokens)(L_str, L_pat);}, L_nil, L_parenGroups);}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_stripParens)(L_h)}}))}));
})))},
    function(){return resolve(L_newDefine)("parseG", 3, "parseG str pat groups = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil groups) \\list . list \\h t . stripParens h", lazy((function(L_str, L_pat, L_groups) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_ifNotErr)(function(){"use strict";return resolve(L_parseIndent)(function(){"use strict";return resolve(L_token)("\n", L_startFilePos);}, function(){"use strict";return resolve(L_tokens)(L_str, L_pat);}, L_nil, L_groups);}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_stripParens)(L_h)}}))}));
})))},
    function(){return resolve(L_newDefine)("parseToAst", 2, "parseToAst str pat = createAst nil (testParse str pat) nil", lazy((function(L_str, L_pat) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_createAst)(L_nil, function(){"use strict";return resolve(L_testParse)(L_str)(L_pat);}, L_nil);
})))},
    function(){return resolve(L_newDefine)("parseM", 1, "parseM str =\r\n  primBind (getValue 'tokenPat')\r\n    \\tokPat . primBind (getValue 'tokenGroups')\r\n      \\groups . parseG str tokPat groups", lazy(function(L_str){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenPat");}, lazy(function(L_tokPat){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenGroups");}, lazy(function(L_groups){return resolve(L_parseG)(L_str, L_tokPat, L_groups)}))}))}))},
    function(){return resolve(L_newDefine)("scanLine", 4, "scanLine str pat onDef onExpr = scanLineG str pat parenGroups onDef onExpr", lazy((function(L_str, L_pat, L_onDef, L_onExpr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_scanLineG)(L_str, L_pat, L_parenGroups, L_onDef, L_onExpr);
})))},
    function(){return resolve(L_newDefine)("parseLine", 5, "parseLine str pat names onDef onExpr = parseLineG str pat names parenGroups onDef onExpr", lazy((function(L_str, L_pat, L_names, L_onDef, L_onExpr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_parseLineG)(L_str, L_pat, L_names, L_parenGroups, L_onDef, L_onExpr);
})))},
    function(){return resolve(L_newDefine)("parseLineM", 1, "parseLineM str = primBind (getValue 'tokenPat')\r\n  \\tokPat . primBind (getValue 'tokenGroups')\r\n    \\groups . parseLineG str tokPat nil groups id id", lazy(function(L_str){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenPat");}, lazy(function(L_tokPat){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenGroups");}, lazy(function(L_groups){return resolve(L_parseLineG)(L_str, L_tokPat, L_nil, L_groups, L_id, L_id)}))}))}))},
    function(){return resolve(L_newDefine)("macroSubM", 1, "macroSubM expr =\r\n  primBind (getValue 'macroDefs')\r\n    \\macs . macroSub macs expr", lazy(function(L_expr){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("macroDefs");}, lazy(function(L_macs){return resolve(L_macroSub)(L_macs, L_expr)}))}))},
    function(){return resolve(L_newDefine)("macroParse", 1, "macroParse str =\r\n  primBind (parseM str)\r\n    \\ex . macroSubM ex", lazy(function(L_str){return resolve(L_primBind)(function(){"use strict";return resolve(L_parseM)(L_str);}, lazy(function(L_ex){return resolve(L_macroSubM)(L_ex)}))}))},
    function(){return resolve(L_newDefine)("tokensM", 1, "tokensM str =\r\n  primBind (getValue 'tokenPat')\r\n    \\delimiterPat . tokens str delimiterPat", lazy(function(L_str){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenPat");}, lazy(function(L_delimiterPat){return resolve(L_tokens)(L_str, L_delimiterPat)}))}))},
    function(){return resolve(L_newDefine)("parseLines", 2, "parseLines lines result = lines\r\n  \\h t D . primBind (parseLineM h)\r\n    \\ast . parseLines t (cons ast result)\r\n  reverse result", lazy((function(L_lines, L_result) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_lines)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_primBind)(function(){"use strict";return resolve(L_parseLineM)(L_h);}, lazy(function(L_ast){return resolve(L_parseLines)(L_t, function(){"use strict";return resolve(L_cons)(L_ast, L_result);})}))}}}))(function(){"use strict";return resolve(L_reverse)(L_result);});
})))},
    function(){return resolve(L_newDefine)("parseFile", 1, "parseFile text = parseLines (linesForFile text) nil", lazy(function(L_text){return resolve(L_parseLines)(function(){"use strict";return resolve(L_linesForFile)(L_text);}, L_nil)}))},
    function(){return resolve(L_newDefine)("simpleScanLine", 1, "simpleScanLine line = primBind (getValue 'tokenPat')\r\n  \\tokenPat . primBind (getValue 'tokenGroups')\r\n    \\groups . scanLineG line tokenPat groups id id", lazy(function(L_line){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenPat");}, lazy(function(L_tokenPat){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenGroups");}, lazy(function(L_groups){return resolve(L_scanLineG)(L_line, L_tokenPat, L_groups, L_id, L_id)}))}))}))},
    function(){return resolve(L_newDefine)("scanLineM", 1, "scanLineM line = countedScanLineM emptyLineStarts line", lazy(function(L_line){return resolve(L_countedScanLineM)(L_emptyLineStarts, L_line)}))},
    function(){return resolve(L_newDefine)("countedScanLineM", 2, "countedScanLineM lineStarts line = primBind (getValue 'tokenPat')\r\n  \\tokenPat . primBind (getValue 'tokenGroups')\r\n    \\groups . primBind (getValue 'parseFilters')\r\n      \\filters . primBind (getValue 'macroDefs')\r\n        \\macros . primBind (getValue 'parser_funcProps')\r\n          \\props . primBind (runParseFilters filters (countedScanLineG lineStarts line tokenPat groups props id id))\r\n            \\scanned . macroSub macros scanned", lazy((function(L_lineStarts, L_line) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenPat");}, lazy(function(L_tokenPat){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenGroups");}, lazy(function(L_groups){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("parseFilters");}, lazy(function(L_filters){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("macroDefs");}, lazy(function(L_macros){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("parser_funcProps");}, lazy(function(L_props){return resolve(L_primBind)(function(){"use strict";return resolve(L_runParseFilters)(L_filters, function(){"use strict";return resolve(L_countedScanLineG)(L_lineStarts, L_line, L_tokenPat, L_groups, L_props, L_id, L_id);});}, lazy(function(L_scanned){return resolve(L_macroSub)(L_macros, L_scanned)}))}))}))}))}))}));
})))},
    function(){return resolve(L_newDefine)("newline", 0, "newline = regexp '\\\\r?\\\\n'", function(){"use strict";return resolve(L_regexp)("\\r?\\n");})},
    function(){return resolve(L_newDefine)("findLines", 2, "findLines offset line = \\\\\r\n  m = strMatch line newline\r\n  idx = + 1 (head (tail (tail m)))\r\n  .\r\n  eq m nil\r\n    cons offset nil\r\n    cons offset (findLines (+ offset idx) (strSubstring line idx 0))", lazy((function(L_offset, L_line) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_m_0, L_idx_1;
  L_m_0 = function(){"use strict";return resolve(L_strMatch)(L_line, L_newline);};
  L_idx_1 = function(){"use strict";return resolve(L_$o)(1, function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_tail)(L_m_0);});});});};

  return resolve(L_eq)(L_m_0, L_nil)(function(){"use strict";return resolve(L_cons)(L_offset, L_nil);})(function(){"use strict";return resolve(L_cons)(L_offset, function(){"use strict";return resolve(L_findLines)(function(){"use strict";return resolve(L_$o)(L_offset, L_idx_1);}, function(){"use strict";return resolve(L_strSubstring)(L_line, L_idx_1, 0);});});})})();
})))},
    function(){return resolve(L_newDefine)("newParseLine", 3, "newParseLine offset names line = primBind (scanLineM line)\r\n  \\scanned . ifNotErr (createAst (cons \"NEWPARSE.lsr\" (findLines offset line)) scanned names) id", lazy((function(L_offset, L_names, L_line) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_scanLineM)(L_line);}, lazy(function(L_scanned){return resolve(L_ifNotErr)(function(){"use strict";return resolve(L_createAst)(function(){"use strict";return resolve(L_cons)("NEWPARSE.lsr", function(){"use strict";return resolve(L_findLines)(L_offset, L_line);});}, L_scanned, L_names);}, L_id)}));
})))},
    function(){return resolve(L_newDefine)("countedParseLine", 2, "countedParseLine names countedLine = primBind (countedScanLineM (head countedLine) (tail countedLine))\r\n  \\scanned . createAst (head countedLine) scanned names", lazy((function(L_names, L_countedLine) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_countedScanLineM)(function(){"use strict";return resolve(L_head)(L_countedLine);}, function(){"use strict";return resolve(L_tail)(L_countedLine);});}, lazy(function(L_scanned){return resolve(L_createAst)(function(){"use strict";return resolve(L_head)(L_countedLine);}, L_scanned, L_names)}));
})))},
    function(){return resolve(L_newDefine)("runLine", 3, "runLine offset names line = primBind (newParseLine offset names line)\r\n  \\ast . primBind (runAst line ast)\r\n    \\res . primBind res\r\n      \\result . cons\r\n        ast\r\n        isErr result\r\n          left (errMsg result)\r\n          right result", lazy((function(L_offset, L_names, L_line) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_newParseLine)(L_offset, L_names, L_line);}, lazy(function(L_ast){return resolve(L_primBind)(function(){"use strict";return resolve(L_runAst)(L_line)(L_ast);}, lazy(function(L_res){return resolve(L_primBind)(L_res, lazy(function(L_result){return resolve(L_cons)(L_ast, function(){"use strict";return resolve(L_isErr)(L_result)(function(){"use strict";return resolve(L_left)(function(){"use strict";return resolve(L_errMsg)(L_result);});})(function(){"use strict";return resolve(L_right)(L_result);});})}))}))}));
})))},
    function(){return resolve(L_newDefine)("countedRunLine", 3, "countedRunLine file names countedLine = primBind (countedParseLine names countedLine)\r\n  \\ast . \\\\\r\n    wrapped = astFileWrap file ast\r\n    .\r\n    primBind (runAst (tail countedLine) wrapped)\r\n      \\res . primBind res\r\n        \\result . resultOfRun wrapped result", lazy((function(L_file, L_names, L_countedLine) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_countedParseLine)(L_names, L_countedLine);}, lazy(function(L_ast){return (function(){"use strict";
  var L_wrapped_0;
  L_wrapped_0 = function(){"use strict";return resolve(L_astFileWrap)(L_file, L_ast);};

  return resolve(L_primBind)(function(){"use strict";return resolve(L_runAst)(function(){"use strict";return resolve(L_tail)(L_countedLine);})(L_wrapped_0);}, lazy(function(L_res){return resolve(L_primBind)(L_res, lazy(function(L_result){return resolve(L_resultOfRun)(L_wrapped_0, L_result)}))}))})()}));
})))},
    function(){return resolve(L_newDefine)("resultOfRun", 2, "resultOfRun wrapped result =\r\n  cons\r\n    wrapped\r\n    isErr result\r\n      left (errMsg result)\r\n      right result", lazy((function(L_wrapped, L_result) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_cons)(L_wrapped, function(){"use strict";return resolve(L_isErr)(L_result)(function(){"use strict";return resolve(L_left)(function(){"use strict";return resolve(L_errMsg)(L_result);});})(function(){"use strict";return resolve(L_right)(L_result);});});
})))},
    function(){return resolve(L_newDefine)("astFileWrap", 2, "astFileWrap file ast = anno 'filename' (basename file) ast", lazy((function(L_file, L_ast) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_anno)("filename", function(){"use strict";return resolve(L_basename)(L_file);}, L_ast);
})))},
    function(){return resolve(L_newDefine)("basename", 1, "basename file = strReplace file (regexp '^(.*/)?([^/]+)$') '$2'", lazy(function(L_file){return resolve(L_strReplace)(L_file, function(){"use strict";return resolve(L_regexp)("^(.*/)?([^/]+)$");}, "$2")}))},
    function(){return resolve(L_newDefine)("runLines", 2, "runLines names lines = lines\r\n  \\h t D . primBind (runLine 0 names h)\r\n    \\line . primBind (runLines names t)\r\n      \\rest . cons line rest\r\n  nil", lazy((function(L_names, L_lines) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_lines)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_primBind)(function(){"use strict";return resolve(L_runLine)(0, L_names, L_h);}, lazy(function(L_line){return resolve(L_primBind)(function(){"use strict";return resolve(L_runLines)(L_names, L_t);}, lazy(function(L_rest){return resolve(L_cons)(L_line, L_rest)}))}))}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("countedRunLines", 4, "countedRunLines file names countedLines result = countedLines\r\n  \\h t D . primBind (countedRunLine file names h)\r\n    \\line . countedRunLines file names t (cons line result)\r\n  reverse result", lazy((function(L_file, L_names, L_countedLines, L_result) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_countedLines)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_primBind)(function(){"use strict";return resolve(L_countedRunLine)(L_file, L_names, L_h);}, lazy(function(L_line){return resolve(L_countedRunLines)(L_file, L_names, L_t, function(){"use strict";return resolve(L_cons)(L_line, L_result);})}))}}}))(function(){"use strict";return resolve(L_reverse)(L_result);});
})))},
    function(){return resolve(L_newDefine)("runFile", 1, "runFile text = runNamedFile \"RUNFILE.lsr\" text", lazy(function(L_text){return resolve(L_runNamedFile)("RUNFILE.lsr", L_text)}))},
    function(){return resolve(L_newDefine)("runNamedFile", 2, "runNamedFile name text = \\\\\r\n  counted = countedLinesForFile name text\r\n  lines = map tail counted\r\n  names = namesForLines lines\r\n  .\r\n  #countedRunLines name names counted\r\n  countedRunLines name names counted nil", lazy((function(L_name, L_text) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_counted_0, L_lines_1, L_names_2;
  L_counted_0 = function(){"use strict";return resolve(L_countedLinesForFile)(L_name, L_text);};
  L_lines_1 = function(){"use strict";return resolve(L_map)(L_tail, L_counted_0);};
  L_names_2 = function(){"use strict";return resolve(L_namesForLines)(L_lines_1);};

  return resolve(L_countedRunLines)(L_name, L_names_2, L_counted_0, L_nil)})();
})))},
    function(){return resolve(L_newDefine)("baseLoad", 1, "baseLoad file = primBind (readFile file)\r\n  \\result . result\r\n    \\err . err\r\n    \\contents . baseLoadString file contents", lazy(function(L_file){return resolve(L_primBind)(function(){"use strict";return resolve(L_readFile)(L_file);}, lazy(function(L_result){return resolve(L_result)(lazy(function(L_err){return resolve(L_err)}))(lazy(function(L_contents){return resolve(L_baseLoadString)(L_file, L_contents)}))}))}))},
    function(){return resolve(L_newDefine)("baseLoadString", 2, "baseLoadString file contents = primBind (getValue 'activeTokenPacks')\r\n  \\activePacks . primBind resetStdTokenPacks\r\n    \\_ . primBind resetNameSpaceInfo\r\n      \\nsInfo . primBind (runNamedFile file contents)\r\n        \\result . primBind (setNameSpaceInfo nsInfo)\r\n          \\_ . primBind (isNil activePacks\r\n            resetStdTokenPacks\r\n            resetTokenPacks activePacks)\r\n            \\_ . result", lazy((function(L_file, L_contents) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("activeTokenPacks");}, lazy(function(L_activePacks){return resolve(L_primBind)(L_resetStdTokenPacks, lazy(function(L__){return resolve(L_primBind)(L_resetNameSpaceInfo, lazy(function(L_nsInfo){return resolve(L_primBind)(function(){"use strict";return resolve(L_runNamedFile)(L_file, L_contents);}, lazy(function(L_result){return resolve(L_primBind)(function(){"use strict";return resolve(L_setNameSpaceInfo)(L_nsInfo);}, lazy(function(L___0){return resolve(L_primBind)(function(){"use strict";return resolve(L_isNil)(L_activePacks)(L_resetStdTokenPacks)(function(){"use strict";return resolve(L_resetTokenPacks)(L_activePacks);});}, lazy(function(L___1){return resolve(L_result)}))}))}))}))}))}));
})))},
    function(){return resolve(L_newDefine)("load", 1, "load file = primBind (baseLoad file)\r\n  \\result . \\\\\r\n    errs = foldr (\\line results . tail line (\\er . cons er results) (\\x . results)) nil result\r\n    .\r\n    isNil errs\r\n      right true\r\n      left errs", lazy(function(L_file){return resolve(L_primBind)(function(){"use strict";return resolve(L_baseLoad)(L_file);}, lazy(function(L_result){return (function(){"use strict";
  var L_errs_0;
  L_errs_0 = function(){"use strict";return resolve(L_foldr)(lazy(function(L_line){return function(L_results){return resolve(L_tail)(L_line)(lazy(function(L_er){return resolve(L_cons)(L_er, L_results)}))(lazy(function(L_x){return resolve(L_results)}))}}), L_nil, L_result);};

  return resolve(L_isNil)(L_errs_0)(function(){"use strict";return resolve(L_right)(L_true);})(function(){"use strict";return resolve(L_left)(L_errs_0);})})()}))}))},
    function(){return resolve(L_newDefine)("require", 1, "require file = primBind (getValue 'requiredFiles')\r\n  \\files . contains files file\r\n    right false\r\n    primBind (setValue 'requiredFiles' (cons file files))\r\n      \\_. primBind (load file)\r\n        \\result . result\r\n          \\x . left x\r\n          \\_ . right true", lazy(function(L_file){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("requiredFiles");}, lazy(function(L_files){return resolve(L_contains)(L_files, L_file)(function(){"use strict";return resolve(L_right)(L_false);})(function(){"use strict";return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("requiredFiles", function(){"use strict";return resolve(L_cons)(L_file, L_files);});}, lazy(function(L__){return resolve(L_primBind)(function(){"use strict";return resolve(L_load)(L_file);}, lazy(function(L_result){return resolve(L_result)(lazy(function(L_x){return resolve(L_left)(L_x)}))(lazy(function(L___0){return resolve(L_right)(L_true)}))}))}));})}))}))},
    function(){return resolve(L_newDefine)("scanFile", 1, "scanFile file = primBind (readFile file)\r\n  \\result . result\r\n    \\err . err\r\n      \\_ . primBind (runNamedFile file contents)\r\n        counted = countedLinesForFile name text\r\n        lines = map tail counted\r\n        names = namesForLines lines\r\n        .\r\n        countedScanLines name names counted", lazy(function(L_file){return resolve(L_primBind)(function(){"use strict";return resolve(L_readFile)(L_file);}, lazy(function(L_result){return resolve(L_result)(lazy(function(L_err){return resolve(L_err)(lazy(function(L__){return resolve(L_primBind)(function(){"use strict";return resolve(L_runNamedFile)(L_file, L_contents);}, function(){"use strict";return resolve(L_counted)(L_$p)(L_countedLinesForFile)(L_name)(L_text);})(function(){"use strict";return resolve(L_lines)(L_$p)(L_map)(L_tail)(L_counted);})(function(){"use strict";return resolve(L_names)(L_$p)(L_namesForLines)(L_lines);})(L_$B)(function(){"use strict";return resolve(L_countedScanLines)(L_name, L_names, L_counted);})}))}))}))}))},
    function(){return resolve(L_newDefine)("countedScanLines", 3, "countedScanLines file names countedLines = countedLines\r\n  \\h t D . primBind (countedScanLineM (head h) (tail h))\r\n    \\line . primBind (countedScanLines file names t)\r\n      \\rest . cons line rest\r\n  nil", lazy((function(L_file, L_names, L_countedLines) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_countedLines)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_primBind)(function(){"use strict";return resolve(L_countedScanLineM)(function(){"use strict";return resolve(L_head)(L_h);}, function(){"use strict";return resolve(L_tail)(L_h);});}, lazy(function(L_line){return resolve(L_primBind)(function(){"use strict";return resolve(L_countedScanLines)(L_file, L_names, L_t);}, lazy(function(L_rest){return resolve(L_cons)(L_line, L_rest)}))}))}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("defTokenPack", 2, "defTokenPack name pack = primBind (getValue 'tokenPacks')\r\n  \\packs . setValue 'tokenPacks' (acons name pack packs)", lazy((function(L_name, L_pack) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenPacks");}, lazy(function(L_packs){return resolve(L_setValue)("tokenPacks", function(){"use strict";return resolve(L_acons)(L_name, L_pack, L_packs);})}));
})))},
    function(){return resolve(L_newDefine)("useTokenPack", 1, "useTokenPack name = primBind (getValue 'tokenPacks')\r\n  \\packs . primBind (getValue 'tokenGroups')\r\n    \\groups . primBind (getValue 'tokenList')\r\n      \\tokens . primBind (getValue 'activeTokenPacks')\r\n        \\activePacks . primBind (getValue 'parseFilters')\r\n          \\filters . assoc name packs\r\n            \\pack . \\\\\r\n              groupToks = foldl (\\value el . el \\h t . cons h (cons t value)) nil (head (tail pack))\r\n              newToks = mergeSort (\\a b . > (strLen a) (strLen b)) (append (head pack) (append groupToks tokens))\r\n              .\r\n              primBind (setValue 'tokenList' newToks)\r\n                \\_ . primBind (setValue 'tokenGroups' (appendAlist (head (tail pack)) groups))\r\n                  \\_ . primBind (setValue 'parseFilters' (append filters (head (tail (tail pack)))))\r\n                    \\_ . primBind (computeTokenPat newToks)\r\n                      \\_ . setValue 'activeTokenPacks' (cons name activePacks)\r\n            nil", lazy(function(L_name){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenPacks");}, lazy(function(L_packs){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenGroups");}, lazy(function(L_groups){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenList");}, lazy(function(L_tokens){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("activeTokenPacks");}, lazy(function(L_activePacks){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("parseFilters");}, lazy(function(L_filters){return resolve(L_assoc)(L_name, L_packs)(lazy(function(L_pack){return (function(){"use strict";
  var L_groupToks_0, L_newToks_1;
  L_groupToks_0 = function(){"use strict";return resolve(L_foldl)(lazy(function(L_value){return function(L_el){return resolve(L_el)(lazy(function(L_h){return function(L_t){return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_cons)(L_t, L_value);})}}))}}), L_nil, function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(L_pack);});});};
  L_newToks_1 = function(){"use strict";return resolve(L_mergeSort)(lazy(function(L_a){return function(L_b){return resolve(L_$z)(function(){"use strict";return resolve(L_strLen)(L_a);}, function(){"use strict";return resolve(L_strLen)(L_b);})}}), function(){"use strict";return resolve(L_append)(function(){"use strict";return resolve(L_head)(L_pack);}, function(){"use strict";return resolve(L_append)(L_groupToks_0, L_tokens);});});};

  return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("tokenList", L_newToks_1);}, lazy(function(L__){return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("tokenGroups", function(){"use strict";return resolve(L_appendAlist)(function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(L_pack);});}, L_groups);});}, lazy(function(L___2){return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("parseFilters", function(){"use strict";return resolve(L_append)(L_filters, function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_tail)(L_pack);});});});});}, lazy(function(L___3){return resolve(L_primBind)(function(){"use strict";return resolve(L_computeTokenPat)(L_newToks_1);}, lazy(function(L___4){return resolve(L_setValue)("activeTokenPacks", function(){"use strict";return resolve(L_cons)(L_name, L_activePacks);})}))}))}))}))})()}))(L_nil)}))}))}))}))}))}))},
    function(){return resolve(L_newDefine)("resetTokenPacks", 1, "resetTokenPacks packs = primBind (setValue 'tokenGroups' nil)\r\n  \\_ . primBind (setValue 'tokenList' nil)\r\n    \\_ . primBind (setValue 'activeTokenPacks' nil)\r\n      \\_ . primBind (setValue 'parseFilters' nil)\r\n        \\_ . foldr1\r\n          \\packCmd result . primBind packCmd \\_ . result\r\n          map useTokenPack packs", lazy(function(L_packs){return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("tokenGroups", L_nil);}, lazy(function(L__){return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("tokenList", L_nil);}, lazy(function(L___0){return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("activeTokenPacks", L_nil);}, lazy(function(L___1){return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("parseFilters", L_nil);}, lazy(function(L___2){return resolve(L_foldr1)(lazy(function(L_packCmd){return function(L_result){return resolve(L_primBind)(L_packCmd, lazy(function(L___3){return resolve(L_result)}))}}), function(){"use strict";return resolve(L_map)(L_useTokenPack, L_packs);})}))}))}))}))}))},
    function(){return resolve(L_newDefine)("resetStdTokenPacks", 0, "resetStdTokenPacks = primBind (getValue 'stdTokenPacks')\r\n  \\stds . primBind (resetTokenPacks stds)\r\n    \\_ . setValue 'activeTokenPacks' nil", function(){"use strict";return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("stdTokenPacks");}, lazy(function(L_stds){return resolve(L_primBind)(function(){"use strict";return resolve(L_resetTokenPacks)(L_stds);}, lazy(function(L__){return resolve(L_setValue)("activeTokenPacks", L_nil)}))}));})},
    function(){return resolve(L_newDefine)("addStdTokenPacks", 1, "addStdTokenPacks morePacks = primBind (getValue 'stdTokenPacks')\r\n  \\stds . setValue 'stdTokenPacks' (append stds morePacks)", lazy(function(L_morePacks){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("stdTokenPacks");}, lazy(function(L_stds){return resolve(L_setValue)("stdTokenPacks", function(){"use strict";return resolve(L_append)(L_stds, L_morePacks);})}))}))},
    function(){return resolve(L_newDefine)("addParseFilter", 1, "addParseFilter filt = primBind (getValue 'parseFilters')\r\n  \\filters . setValue 'parseFilters' (append filters (cons filt nil))", lazy(function(L_filt){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("parseFilters");}, lazy(function(L_filters){return resolve(L_setValue)("parseFilters", function(){"use strict";return resolve(L_append)(L_filters, function(){"use strict";return resolve(L_cons)(L_filt, L_nil);});})}))}))},
    function(){return resolve(L_newDefine)("d", 3, "d label value expr = log (strCat (cons label (cons value nil))) expr", lazy((function(L_label, L_value, L_expr) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_log)(function(){"use strict";return resolve(L_strCat)(function(){"use strict";return resolve(L_cons)(L_label, function(){"use strict";return resolve(L_cons)(L_value, L_nil);});});}, L_expr);
})))},
    function(){return resolve(L_newDefine)("dd", 2, "dd label arg = d label arg arg", lazy((function(L_label, L_arg) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_d)(L_label, L_arg, L_arg);
})))},
    function(){return resolve(L_newDefine)("testParse", 1, "testParse str = countedParseLine nil (head (countedLinesForFile 'parse' str))", lazy(function(L_str){return resolve(L_countedParseLine)(L_nil, function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_countedLinesForFile)("parse", L_str);});})}))},
    function(){return resolve(L_setValue)("macroDefs", L_nil)},
    function(){return resolve(L_setValue)("requiredFiles", L_nil)},
    function(){return resolve(L_setValue)("tokenPacks", L_nil)},
    function(){return resolve(L_setValue)("activeTokenPacks", L_nil)},
    function(){return resolve(L_setValue)("stdTokenPacks", function(){"use strict";return resolve(L_cons)("std", L_nil);})},
    function(){return resolve(L_setValue)("parser_funcProps", L_nil)},
    function(){return resolve(L_defTokenPack)("std", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(".", function(){"use strict";return resolve(L_cons)("\\", function(){"use strict";return resolve(L_cons)("\\\\", function(){"use strict";return resolve(L_cons)("\\@", L_nil);});});});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_acons)("(", ")", L_nil);}, function(){"use strict";return resolve(L_cons)(L_nil, L_nil);});});})},
    function(){return resolve(L_resetStdTokenPacks)},
    function(){return resolve(L_setNameSpace)("core")},
    function(){return resolve(L_defMacro)("withRecur", lazy(function(L_list){return resolve(L_cons)("_withRecur", function(){"use strict";return resolve(L_cons)(L_list, L_nil);})}))},
    function(){return resolve(L_defMacro)("recur", lazy(function(L_list){return resolve(L_cons)("_recur", function(){"use strict";return resolve(L_cons)(L_list, L_nil);})}))},
    function(){return resolve(L_newDefine)("any", 2, "any f l = find f l (\\el . true) false", lazy((function(L_f, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_find)(L_f, L_l)(lazy(function(L_el){return resolve(L_true)}))(L_false);
})))},
    function(){return resolve(L_newDefine)("all", 2, "all f l = not (any (compose not f) l)", lazy((function(L_f, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_not)(function(){"use strict";return resolve(L_any)(function(){"use strict";return resolve(L_compose)(L_not, L_f);}, L_l);});
})))},
    function(){return resolve(L_newDefine)("takeUpto", 2, "takeUpto func list = \\\\\r\n  ret = subtakeUpto func list\r\n  .\r\n  == ret false\r\n    nil\r\n    ret", lazy((function(L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_ret_0;
  L_ret_0 = function(){"use strict";return resolve(L_subtakeUpto)(L_func, L_list);};

  return resolve(L_$p$p)(L_ret_0, L_false)(L_nil)(L_ret_0)})();
})))},
    function(){return resolve(L_newDefine)("subtakeUpto", 2, "subtakeUpto func list = \\\\\r\n  ret = subtakeUpto func (tail list)\r\n  .\r\n  isNil list\r\n    false\r\n    func (head list)\r\n      nil\r\n      == ret false\r\n        false\r\n        cons (head list) ret", lazy((function(L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_ret_0;
  L_ret_0 = function(){"use strict";return resolve(L_subtakeUpto)(L_func, function(){"use strict";return resolve(L_tail)(L_list);});};

  return resolve(L_isNil)(L_list)(L_false)(function(){"use strict";return resolve(L_func)(function(){"use strict";return resolve(L_head)(L_list);})(L_nil)(function(){"use strict";return resolve(L_$p$p)(L_ret_0, L_false)(L_false)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_list);}, L_ret_0);});});})})();
})))},
    function(){return resolve(L_newDefine)("dropAfter", 2, "dropAfter func list = isNil list\r\n  nil\r\n  func (head list)\r\n    tail list\r\n    dropAfter func (tail list)", lazy((function(L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_list)(L_nil)(function(){"use strict";return resolve(L_func)(function(){"use strict";return resolve(L_head)(L_list);})(function(){"use strict";return resolve(L_tail)(L_list);})(function(){"use strict";return resolve(L_dropAfter)(L_func, function(){"use strict";return resolve(L_tail)(L_list);});});});
})))},
    function(){return resolve(L_newDefine)("doall", 1, "doall x = isNil x\r\n  unit\r\n  foldr1 (\\el res . primBind el \\_ . res) x", lazy(function(L_x){return resolve(L_isNil)(L_x)(L_unit)(function(){"use strict";return resolve(L_foldr1)(lazy(function(L_el){return function(L_res){return resolve(L_primBind)(L_el, lazy(function(L__){return resolve(L_res)}))}}), L_x);})}))},
    function(){return resolve(L_newDefine)("aconsf", 3, "aconsf key value list = acons key value (aremove key list)", lazy((function(L_key, L_value, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_acons)(L_key, L_value, function(){"use strict";return resolve(L_aremove)(L_key, L_list);});
})))},
    function(){return resolve(L_newDefine)("aremove", 2, "aremove key list = isNil list\r\n  nil\r\n  eq (head (head list)) key\r\n    aremove key (tail list)\r\n    aconsPair (head list) (aremove key (tail list))", lazy((function(L_key, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_list)(L_nil)(function(){"use strict";return resolve(L_eq)(function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_head)(L_list);});}, L_key)(function(){"use strict";return resolve(L_aremove)(L_key, function(){"use strict";return resolve(L_tail)(L_list);});})(function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_head)(L_list);}, function(){"use strict";return resolve(L_aremove)(L_key, function(){"use strict";return resolve(L_tail)(L_list);});});});});
})))},
    function(){return resolve(L_addTokenGroup)("[", "]")},
    function(){return resolve(L_addToken)("|")},
    function(){return resolve(L_newDefine)("listifyOp", 2, "listifyOp op list = list\r\n  \\h t D . isTokenString h '|'\r\n    cons t nil\r\n    cons (cons op (cons h (listifyOp op t))) nil\r\n  cons 'nil' nil", lazy((function(L_op, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){"use strict";return resolve(L_cons)(L_t, L_nil);})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(L_op, function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_listifyOp)(L_op, L_t);});});}, L_nil);})}}}))(function(){"use strict";return resolve(L_cons)("nil", L_nil);});
})))},
    function(){return resolve(L_newDefine)("listify", 1, "listify list = listifyOp 'cons' list", lazy(function(L_list){return resolve(L_listifyOp)("cons", L_list)}))},
    function(){return resolve(L_newDefine)("listFilter", 1, "listFilter code = primBind (getValue 'listMacros')\r\n  \\listMacros . filterApplies code \\list . list \\h t .\r\n    and (isToken h) (contains listMacros (tokenString h))\r\n      listFilterTail list\r\n      list", lazy(function(L_code){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("listMacros");}, lazy(function(L_listMacros){return resolve(L_filterApplies)(L_code, lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_and)(function(){"use strict";return resolve(L_isToken)(L_h);}, function(){"use strict";return resolve(L_contains)(L_listMacros, function(){"use strict";return resolve(L_tokenString)(L_h);});})(function(){"use strict";return resolve(L_listFilterTail)(L_list);})(L_list)}}))}))}))}))},
    function(){return resolve(L_newDefine)("listFilterTail", 1, "listFilterTail list = list\r\n  \\h t D . isTokenString h '|'\r\n    > (length t) 2\r\n      cons h (cons (removeLast t) (cons (last t) nil))\r\n      list\r\n    cons h (listFilterTail t)\r\n  nil", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){"use strict";return resolve(L_$z)(function(){"use strict";return resolve(L_length)(L_t);}, 2)(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_removeLast)(L_t);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_last)(L_t);}, L_nil);});});})(L_list);})(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_listFilterTail)(L_t);});})}}}))(L_nil)}))},
    function(){return resolve(L_newDefine)("filterApplies", 2, "filterApplies code func = isParens code\r\n  code \\start end contents . parens start end (filterApplies contents func)\r\n  isCons code\r\n    \\\\\r\n      filtered = filterApplyElements code func\r\n      .\r\n      and (isCons filtered) (isBlockStart (head filtered))\r\n        filtered\r\n        func filtered\r\n    code", lazy((function(L_code, L_func) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isParens)(L_code)(function(){"use strict";return resolve(L_code)(lazy(function(L_start){return function(L_end){return function(L_contents){return resolve(L_parens)(L_start, L_end, function(){"use strict";return resolve(L_filterApplies)(L_contents, L_func);})}}}));})(function(){"use strict";return resolve(L_isCons)(L_code)(function(){"use strict";return (function(){"use strict";
  var L_filtered_0;
  L_filtered_0 = function(){"use strict";return resolve(L_filterApplyElements)(L_code, L_func);};

  return resolve(L_and)(function(){"use strict";return resolve(L_isCons)(L_filtered_0);}, function(){"use strict";return resolve(L_isBlockStart)(function(){"use strict";return resolve(L_head)(L_filtered_0);});})(L_filtered_0)(function(){"use strict";return resolve(L_func)(L_filtered_0);})})();})(L_code);});
})))},
    function(){return resolve(L_newDefine)("filterApplyElements", 2, "filterApplyElements code func = code\r\n  \\h t D . isBlockStart h\r\n    cons h (filterBlock h t func)\r\n    cons (filterApplies h func)\r\n      and (isCons t) (isBlockStart (head t))\r\n        cons (filterApplyElements t func) nil\r\n        filterApplyElements t func\r\n  nil", lazy((function(L_code, L_func) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_code)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isBlockStart)(L_h)(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_filterBlock)(L_h, L_t, L_func);});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_filterApplies)(L_h, L_func);}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isCons)(L_t);}, function(){"use strict";return resolve(L_isBlockStart)(function(){"use strict";return resolve(L_head)(L_t);});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_filterApplyElements)(L_t, L_func);}, L_nil);})(function(){"use strict";return resolve(L_filterApplyElements)(L_t, L_func);});});})}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("filterBlock", 3, "filterBlock type code func = isTokenString type '\\\\'\r\n  filterLambda code func\r\n  filterLet code func", lazy((function(L_type, L_code, L_func) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isTokenString)(L_type, "\\")(function(){"use strict";return resolve(L_filterLambda)(L_code, L_func);})(function(){"use strict";return resolve(L_filterLet)(L_code, L_func);});
})))},
    function(){return resolve(L_newDefine)("filterLet", 2, "filterLet code func = code \\h t . isTokenString h '.'\r\n  cons h (filterApplies t func)\r\n  cons (filterLetBinding h func)\r\n    filterLet t func", lazy((function(L_code, L_func) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_code)(lazy(function(L_h){return function(L_t){return resolve(L_isTokenString)(L_h, ".")(function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_filterApplies)(L_t, L_func);});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_filterLetBinding)(L_h, L_func);}, function(){"use strict";return resolve(L_filterLet)(L_t, L_func);});})}}));
})))},
    function(){return resolve(L_newDefine)("filterLetBinding", 2, "filterLetBinding code func = isParens code\r\n  setParens code \\contents . filterLetBinding contents func\r\n  isCons code\r\n    code \\h t . cons h\r\n      isTokenString h '='\r\n        filterApplies t func\r\n        filterLetBinding t func\r\n    code", lazy((function(L_code, L_func) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isParens)(L_code)(function(){"use strict";return resolve(L_setParens)(L_code, lazy(function(L_contents){return resolve(L_filterLetBinding)(L_contents, L_func)}));})(function(){"use strict";return resolve(L_isCons)(L_code)(function(){"use strict";return resolve(L_code)(lazy(function(L_h){return function(L_t){return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_isTokenString)(L_h, "=")(function(){"use strict";return resolve(L_filterApplies)(L_t, L_func);})(function(){"use strict";return resolve(L_filterLetBinding)(L_t, L_func);});})}}));})(L_code);});
})))},
    function(){return resolve(L_newDefine)("filterLambda", 2, "filterLambda code func = code \\h t . cons h\r\n  isTokenString h '.'\r\n    filterApplies t func\r\n    filterLambda t func", lazy((function(L_code, L_func) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_code)(lazy(function(L_h){return function(L_t){return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_isTokenString)(L_h, ".")(function(){"use strict";return resolve(L_filterApplies)(L_t, L_func);})(function(){"use strict";return resolve(L_filterLambda)(L_t, L_func);});})}}));
})))},
    function(){return resolve(L_defMacro)("[", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_listify)(L_h)}}))}))},
    function(){return resolve(L_setValue)("listMacros", function(){"use strict";return resolve(L_cons)("[", function(){"use strict";return resolve(L_cons)("{", function(){"use strict";return resolve(L_cons)("hamt{", L_nil);});});})},
    function(){return resolve(L_addParseFilter)(L_listFilter)},
    function(){return resolve(L_addTokenGroup)("{", "}")},
    function(){return resolve(L_defMacro)("{", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_listifyOp)("aconsPair", L_h)}}))}))},
    function(){return resolve(L_addTokenGroup)("hamt{", "}")},
    function(){return resolve(L_defMacro)("hamt{", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_hamtify)(L_h)}}))}))},
    function(){return resolve(L_newDefine)("hamtWithPair", 2, "hamtWithPair pair t = hamtWith (head pair) (tail pair) t", lazy((function(L_pair, L_t) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_hamtWith)(function(){"use strict";return resolve(L_head)(L_pair);}, function(){"use strict";return resolve(L_tail)(L_pair);}, L_t);
})))},
    function(){return resolve(L_newDefine)("hamtify", 1, "hamtify list = list\r\n  \\h t D . isTokenString h '|'\r\n    cons t nil\r\n    and (isCons h) (or (isTokenString (head h) 'cons') (isTokenString (head h) ':'))\r\n      [['hamtWith' (head (tail h)) (head (tail (tail h))) | hamtify t]]\r\n      [['hamtWithPair' h | hamtify t]]\r\n  ['hamt']", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){"use strict";return resolve(L_cons)(L_t, L_nil);})(function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isCons)(L_h);}, function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_isTokenString)(function(){"use strict";return resolve(L_head)(L_h);}, "cons");}, function(){"use strict";return resolve(L_isTokenString)(function(){"use strict";return resolve(L_head)(L_h);}, ":");});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("hamtWith", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(L_h);});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_tail)(L_h);});});}, function(){"use strict";return resolve(L_hamtify)(L_t);});});});}, L_nil);})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("hamtWithPair", function(){"use strict";return resolve(L_cons)(L_h, function(){"use strict";return resolve(L_hamtify)(L_t);});});}, L_nil);});})}}}))(function(){"use strict";return resolve(L_cons)("hamt", L_nil);})}))},
    function(){return resolve(L_defTokenPack)("list", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("|", function(){"use strict";return resolve(L_cons)("=", L_nil);});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("{", "}");}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("hamt{", "}");}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("[", "]");}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("or[", "]");}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("and[", "]");}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("concat[", "]");}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("print[", "]");}, function(){"use strict";return resolve(L_aconsPair)(function(){"use strict";return resolve(L_cons)("concatFlat[", "]");}, L_nil);});});});});});});});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(L_listFilter, L_nil);}, L_nil);});});})},
    function(){return resolve(L_addTokenGroup)("or[", "]")},
    function(){return resolve(L_addTokenGroup)("and[", "]")},
    function(){return resolve(L_addTokenGroup)("concat[", "]")},
    function(){return resolve(L_addTokenGroup)("print[", "]")},
    function(){return resolve(L_addTokenGroup)("concatFlat[", "]")},
    function(){return resolve(L_newDefine)("listMacroFoldOp", 3, "listMacroFoldOp op emptyCase list = list \\h t . foldr\r\n    \\case result . [op case result]\r\n    emptyCase\r\n    h", lazy((function(L_op, L_emptyCase, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return resolve(L_foldr)(lazy(function(L_case){return function(L_result){return resolve(L_cons)(L_op, function(){"use strict";return resolve(L_cons)(L_case, function(){"use strict";return resolve(L_cons)(L_result, L_nil);});})}}), L_emptyCase, L_h)}}));
})))},
    function(){return resolve(L_defMacro)("or[", lazy(function(L_list){return resolve(L_listMacroFoldOp)("or", "false", L_list)}))},
    function(){return resolve(L_defMacro)("and[", lazy(function(L_list){return resolve(L_listMacroFoldOp)("and", "true", L_list)}))},
    function(){return resolve(L_defMacro)("print[", lazy(function(L_list){return resolve(L_cons)("print", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("strCat", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_listify)(function(){"use strict";return resolve(L_head)(L_list);});}, L_nil);}, L_nil);});}, L_nil);})}))},
    function(){return resolve(L_defMacro)("concat[", lazy(function(L_list){return resolve(L_cons)("strCat", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_listify)(function(){"use strict";return resolve(L_head)(L_list);});}, L_nil);}, L_nil);})}))},
    function(){return resolve(L_defMacro)("concatFlat[", lazy(function(L_list){return resolve(L_cons)("strCat", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("flatten", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_listify)(function(){"use strict";return resolve(L_head)(L_list);});}, L_nil);}, L_nil);});}, L_nil);})}))},
    function(){return resolve(L_newDefine)("infix", 1, "infix code = primBind (getValue 'infixPrecedence')\r\n  \\prec . primBind (getValue 'infixRightAssociative')\r\n    \\right . primBind (getValue 'tokenGroups')\r\n      \\groups . filterApplies\r\n        code\r\n        \\expr . infixRearrange prec right (map (\\cell . tail cell) groups) expr", lazy(function(L_code){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("infixPrecedence");}, lazy(function(L_prec){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("infixRightAssociative");}, lazy(function(L_right){return resolve(L_primBind)(function(){"use strict";return resolve(L_getValue)("tokenGroups");}, lazy(function(L_groups){return resolve(L_filterApplies)(L_code, lazy(function(L_expr){return resolve(L_infixRearrange)(L_prec, L_right, function(){"use strict";return resolve(L_map)(lazy(function(L_cell){return resolve(L_tail)(L_cell)}), L_groups);}, L_expr)}))}))}))}))}))},
    function(){return resolve(L_newDefine)("infixRearrange", 4, "infixRearrange prec right closes list = \\\\\r\n  len = length list\r\n  head1 = head list\r\n  tail1 = tail list\r\n  head2 = head tail1\r\n  tail2 = tail tail1\r\n  head3 = head tail2\r\n  opPrec = getPrec prec head2\r\n  .\r\n  < len 2\r\n    list\r\n    isInfix opPrec head1 head2 len\r\n      or (== len 2) (not (isInfixArg closes head3))\r\n        [[head2 head1] | tail2]\r\n        infixRearrange prec right closes (absorbArgument opPrec prec right closes head1 head2 tail2 head3 (- len 2))\r\n      [head1 | infixRearrange prec right closes tail1]", lazy((function(L_prec, L_right, L_closes, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_len_0, L_head1_1, L_tail1_2, L_head2_3, L_tail2_4, L_head3_5, L_opPrec_6;
  L_len_0 = function(){"use strict";return resolve(L_length)(L_list);};
  L_head1_1 = function(){"use strict";return resolve(L_head)(L_list);};
  L_tail1_2 = function(){"use strict";return resolve(L_tail)(L_list);};
  L_head2_3 = function(){"use strict";return resolve(L_head)(L_tail1_2);};
  L_tail2_4 = function(){"use strict";return resolve(L_tail)(L_tail1_2);};
  L_head3_5 = function(){"use strict";return resolve(L_head)(L_tail2_4);};
  L_opPrec_6 = function(){"use strict";return resolve(L_getPrec)(L_prec, L_head2_3);};

  return resolve(L_$y)(L_len_0, 2)(L_list)(function(){"use strict";return resolve(L_isInfix)(L_opPrec_6, L_head1_1, L_head2_3, L_len_0)(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_$p$p)(L_len_0, 2);}, function(){"use strict";return resolve(L_not)(function(){"use strict";return resolve(L_isInfixArg)(L_closes, L_head3_5);});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(L_head2_3, function(){"use strict";return resolve(L_cons)(L_head1_1, L_nil);});}, L_tail2_4);})(function(){"use strict";return resolve(L_infixRearrange)(L_prec, L_right, L_closes, function(){"use strict";return resolve(L_absorbArgument)(L_opPrec_6, L_prec, L_right, L_closes, L_head1_1, L_head2_3, L_tail2_4, L_head3_5, function(){"use strict";return resolve(L_$_)(L_len_0, 2);});});});})(function(){"use strict";return resolve(L_cons)(L_head1_1, function(){"use strict";return resolve(L_infixRearrange)(L_prec, L_right, L_closes, L_tail1_2);});});})})();
})))},
    function(){return resolve(L_newDefine)("absorbArgument", 9, "absorbArgument opPrec prec right closes head1 head2 tail2 head3 len = \\\\\r\n  tail3 = tail tail2\r\n  head4 = head tail3\r\n  tail4 = tail tail3\r\n  head5 = head tail4\r\n  .\r\n  infixShouldEatNext opPrec prec (contains right (strTokenString head2)) head3 head4 head5 closes len\r\n    [head1 head2 | absorbArgument (getPrec prec head4) prec right closes head3 head4 tail4 head5 (- len 2)]\r\n    [[head2 head1 head3] | tail3]", lazy((function(L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, L_len) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_tail3_0, L_head4_1, L_tail4_2, L_head5_3;
  L_tail3_0 = function(){"use strict";return resolve(L_tail)(L_tail2);};
  L_head4_1 = function(){"use strict";return resolve(L_head)(L_tail3_0);};
  L_tail4_2 = function(){"use strict";return resolve(L_tail)(L_tail3_0);};
  L_head5_3 = function(){"use strict";return resolve(L_head)(L_tail4_2);};

  return resolve(L_infixShouldEatNext)(L_opPrec, L_prec, function(){"use strict";return resolve(L_contains)(L_right, function(){"use strict";return resolve(L_strTokenString)(L_head2);});}, L_head3, L_head4_1, L_head5_3, L_closes, L_len)(function(){"use strict";return resolve(L_cons)(L_head1, function(){"use strict";return resolve(L_cons)(L_head2, function(){"use strict";return resolve(L_absorbArgument)(function(){"use strict";return resolve(L_getPrec)(L_prec, L_head4_1);}, L_prec, L_right, L_closes, L_head3, L_head4_1, L_tail4_2, L_head5_3, function(){"use strict";return resolve(L_$_)(L_len, 2);});});});})(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(L_head2, function(){"use strict";return resolve(L_cons)(L_head1, function(){"use strict";return resolve(L_cons)(L_head3, L_nil);});});}, L_tail3_0);})})();
})))},
    function(){return resolve(L_newDefine)("isInfixArg", 2, "isInfixArg closes item = or[\r\n  isParens item\r\n  isCons item\r\n  and[\r\n    isToken item\r\n    not (contains closes (tokenString item))\r\n    not (isBlockStart item)]]", lazy((function(L_closes, L_item) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_or)(function(){"use strict";return resolve(L_isParens)(L_item);}, function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_isCons)(L_item);}, function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isToken)(L_item);}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_not)(function(){"use strict";return resolve(L_contains)(L_closes, function(){"use strict";return resolve(L_tokenString)(L_item);});});}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_not)(function(){"use strict";return resolve(L_isBlockStart)(L_item);});}, L_true);});});}, L_false);});});
})))},
    function(){return resolve(L_newDefine)("isInfix", 4, "isInfix opPrec head1 head2 len = and[\r\n  > len 1\r\n  > opPrec -1\r\n  isInfixArg nil head1]", lazy((function(L_opPrec, L_head1, L_head2, L_len) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_and)(function(){"use strict";return resolve(L_$z)(L_len, 1);}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_$z)(L_opPrec, -1);}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isInfixArg)(L_nil, L_head1);}, L_true);});});
})))},
    function(){return resolve(L_newDefine)("getPrec", 2, "getPrec prec token = \\\\\r\n  str = tokenString token\r\n  .\r\n  isToken token\r\n    findIndex (\\level . contains level str) prec\r\n    -1", lazy((function(L_prec, L_token) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_str_0;
  L_str_0 = function(){"use strict";return resolve(L_tokenString)(L_token);};

  return resolve(L_isToken)(L_token)(function(){"use strict";return resolve(L_findIndex)(lazy(function(L_level){return resolve(L_contains)(L_level, L_str_0)}), L_prec);})(-1)})();
})))},
    function(){return resolve(L_newDefine)("infixShouldEatNext", 8, "infixShouldEatNext opPrec prec isRight curArg nextOp nextArg closes len = \\\\\r\n  nextPrec = getPrec prec nextOp\r\n  .\r\n  and[\r\n    > len 2\r\n    isInfix nextPrec curArg nextOp len\r\n    or (> opPrec nextPrec) (and (== opPrec nextPrec) isRight)\r\n    isInfixArg closes nextArg]", lazy((function(L_opPrec, L_prec, L_isRight, L_curArg, L_nextOp, L_nextArg, L_closes, L_len) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_nextPrec_0;
  L_nextPrec_0 = function(){"use strict";return resolve(L_getPrec)(L_prec, L_nextOp);};

  return resolve(L_and)(function(){"use strict";return resolve(L_$z)(L_len, 2);}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isInfix)(L_nextPrec_0, L_curArg, L_nextOp, L_len);}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_or)(function(){"use strict";return resolve(L_$z)(L_opPrec, L_nextPrec_0);}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_$p$p)(L_opPrec, L_nextPrec_0);}, L_isRight);});}, function(){"use strict";return resolve(L_and)(function(){"use strict";return resolve(L_isInfixArg)(L_closes, L_nextArg);}, L_true);});});})})();
})))},
    function(){return resolve(L_defMacro)(":", lazy(function(L_list){return resolve(L_cons)("cons", L_list)}))},
    function(){return resolve(L_newDefine)("iprec", 0, "iprec = [['*' '/' '%'] ['+' '-'] [':'] ['<' '>' '<=' '>='] ['==' '!='] ['&&' '||']]", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("*", function(){"use strict";return resolve(L_cons)("/", function(){"use strict";return resolve(L_cons)("%", L_nil);});});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("+", function(){"use strict";return resolve(L_cons)("-", L_nil);});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(":", L_nil);}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("<", function(){"use strict";return resolve(L_cons)(">", function(){"use strict";return resolve(L_cons)("<=", function(){"use strict";return resolve(L_cons)(">=", L_nil);});});});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("==", function(){"use strict";return resolve(L_cons)("!=", L_nil);});}, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("&&", function(){"use strict";return resolve(L_cons)("||", L_nil);});}, L_nil);});});});});});})},
    function(){return resolve(L_newDefine)("rightAssoc", 0, "rightAssoc = [':']", function(){"use strict";return resolve(L_cons)(":", L_nil);})},
    function(){return resolve(L_newDefine)("setPrecedenceLevels", 1, "setPrecedenceLevels levels = primBind\r\n  setValue 'infixPrecedence' levels\r\n  \\_ . doall (map addInfixProp (flatten levels))", lazy(function(L_levels){return resolve(L_primBind)(function(){"use strict";return resolve(L_setValue)("infixPrecedence", L_levels);}, lazy(function(L__){return resolve(L_doall)(function(){"use strict";return resolve(L_map)(L_addInfixProp, function(){"use strict";return resolve(L_flatten)(L_levels);});})}))}))},
    function(){return resolve(L_newDefine)("addInfixProp", 1, "addInfixProp funcName = getFunction funcName\r\n  \\func . setProperty func 'infix' true\r\n  nil", lazy(function(L_funcName){return resolve(L_getFunction)(L_funcName)(lazy(function(L_func){return resolve(L_setProperty)(L_func, "infix", L_true)}))(L_nil)}))},
    function(){return resolve(L_setPrecedenceLevels)(L_iprec)},
    function(){return resolve(L_setValue)("infixRightAssociative", L_rightAssoc)},
    function(){return resolve(L_defTokenPack)("infix", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_flatten)(L_iprec);}, function(){"use strict";return resolve(L_cons)(L_nil, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)(L_infix, L_nil);}, L_nil);});});})},
    function(){return resolve(L_useTokenPack)("infix")},
    function(){return resolve(L_defMacro)("do", lazy(function(L_list){return resolve(L__withRecur)(function(){"use strict";return resolve(L_handleDo)(L_list, L_false, L_nil, L_id);})}))},
    function(){return resolve(L_newDefine)("handleDo", 4, "handleDo list inLet foldVar cont = list\r\n  \\h t D . isNil t\r\n    cont (inLet ['.' h] [h])\r\n    \\\\\r\n      next = doClause (stripParens h) h nil inLet foldVar\r\n      newInLet = triple1 next\r\n      newFoldVar = triple2 next\r\n      chain = triple3 next\r\n      .\r\n      recur handleDo t newInLet newFoldVar \\rest . cont (chain rest)\r\n  cont nil", lazy((function(L_list, L_inLet, L_foldVar, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isNil)(L_t)(function(){"use strict";return resolve(L_cont)(function(){"use strict";return resolve(L_inLet)(function(){"use strict";return resolve(L_cons)(".", function(){"use strict";return resolve(L_cons)(L_h, L_nil);});})(function(){"use strict";return resolve(L_cons)(L_h, L_nil);});});})(function(){"use strict";return (function(){"use strict";
  var L_next_0, L_newInLet_1, L_newFoldVar_2, L_chain_3;
  L_next_0 = function(){"use strict";return resolve(L_doClause)(function(){"use strict";return resolve(L_stripParens)(L_h);}, L_h, L_nil, L_inLet, L_foldVar);};
  L_newInLet_1 = function(){"use strict";return resolve(L_triple1)(L_next_0);};
  L_newFoldVar_2 = function(){"use strict";return resolve(L_triple2)(L_next_0);};
  L_chain_3 = function(){"use strict";return resolve(L_triple3)(L_next_0);};

  return resolve(L__recur)(function(){"use strict";return resolve(L_handleDo)(L_t, L_newInLet_1, L_newFoldVar_2, lazy(function(L_rest){return resolve(L_cont)(function(){"use strict";return resolve(L_chain_3)(L_rest);})}));})})();})}}}))(function(){"use strict";return resolve(L_cont)(L_nil);});
})))},
    function(){return resolve(L_newDefine)("doClause", 5, "doClause steppingClause clause prefix inLet foldVar = \\\\\r\n  makeBind var value = triple false foldVar \\rest . inLet (cons '.') id\r\n    ['bind' value ['\\\\' var '.' | rest]]\r\n  h = head steppingClause\r\n  t = tail steppingClause\r\n  .\r\n  isCons steppingClause\r\n    isTokenString h '='\r\n      triple true foldVar \\rest . inLet\r\n        [clause | rest]\r\n        ['\\\\\\\\' clause | rest]\r\n      isTokenString h '<-'\r\n        isNil t\r\n          parseErr \"No value in do-clause: \" clause\r\n          prefix\r\n            \\ph pt D . isNil pt\r\n              makeBind (isNil prefix '_' (head prefix)) t\r\n              parseErr \"More than one variable in do-clause: \" clause\r\n            makeBind '_' t\r\n        isTokenString h '<-|'\r\n          parseBind2 clause (isNil prefix '_' (head prefix)) t inLet foldVar\r\n          doClause t clause [h | prefix] inLet foldVar\r\n    makeBind '_' clause", lazy((function(L_steppingClause, L_clause, L_prefix, L_inLet, L_foldVar) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_makeBind_0, L_h_1, L_t_2;
  L_makeBind_0 = function(){"use strict";return function(L_var){return function(L_value){return resolve(L_triple)(L_false, L_foldVar, lazy(function(L_rest){return resolve(L_inLet)(function(){"use strict";return resolve(L_cons)(".");})(L_id)(function(){"use strict";return resolve(L_cons)("bind", function(){"use strict";return resolve(L_cons)(L_value, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("\\", function(){"use strict";return resolve(L_cons)(L_var, function(){"use strict";return resolve(L_cons)(".", L_rest);});});}, L_nil);});});})}))}};};
  L_h_1 = function(){"use strict";return resolve(L_head)(L_steppingClause);};
  L_t_2 = function(){"use strict";return resolve(L_tail)(L_steppingClause);};

  return resolve(L_isCons)(L_steppingClause)(function(){"use strict";return resolve(L_isTokenString)(L_h_1, "=")(function(){"use strict";return resolve(L_triple)(L_true, L_foldVar, lazy(function(L_rest){return resolve(L_inLet)(function(){"use strict";return resolve(L_cons)(L_clause, L_rest);})(function(){"use strict";return resolve(L_cons)("\\\\", function(){"use strict";return resolve(L_cons)(L_clause, L_rest);});})}));})(function(){"use strict";return resolve(L_isTokenString)(L_h_1, "<-")(function(){"use strict";return resolve(L_isNil)(L_t_2)(function(){"use strict";return resolve(L_parseErr)("No value in do-clause: ", L_clause);})(function(){"use strict";return resolve(L_prefix)(lazy(function(L_ph){return function(L_pt){return function(L_D){return resolve(L_isNil)(L_pt)(function(){"use strict";return resolve(L_makeBind_0)(function(){"use strict";return resolve(L_isNil)(L_prefix)("_")(function(){"use strict";return resolve(L_head)(L_prefix);});})(L_t_2);})(function(){"use strict";return resolve(L_parseErr)("More than one variable in do-clause: ", L_clause);})}}}))(function(){"use strict";return resolve(L_makeBind_0)("_")(L_t_2);});});})(function(){"use strict";return resolve(L_isTokenString)(L_h_1, "<-|")(function(){"use strict";return resolve(L_parseBind2)(L_clause, function(){"use strict";return resolve(L_isNil)(L_prefix)("_")(function(){"use strict";return resolve(L_head)(L_prefix);});}, L_t_2, L_inLet, L_foldVar);})(function(){"use strict";return resolve(L_doClause)(L_t_2, L_clause, function(){"use strict";return resolve(L_cons)(L_h_1, L_prefix);}, L_inLet, L_foldVar);});});});})(function(){"use strict";return resolve(L_makeBind_0)("_")(L_clause);})})();
})))},
    function(){return resolve(L_newDefine)("parseBind2", 5, "parseBind2 clause var list inLet foldVar = \\\\\r\n  acc = takeUpto (\\t . isTokenString t '|') list\r\n  value = dropAfter (\\t . isTokenString t '|') list\r\n  accVar = isNil acc\r\n    foldVar\r\n    head acc\r\n  accEq = at acc 1\r\n  accInit = isNil acc\r\n    foldVar\r\n    tail (tail acc)\r\n  .\r\n  not (isCons value) && ((isNil acc) || ((length acc) > 2 && (isTokenString accEq '=')))\r\n    err \"Fold clause expects VAR <-| ACC_VAR = ACC_VALUE | VALUE or VAR <-| | VALUE\"\r\n    triple false accVar \\rest . inLet (cons '.') id\r\n      ['bind2' accInit value ['\\\\' accVar var '.' | rest]]", lazy((function(L_clause, L_var, L_list, L_inLet, L_foldVar) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){"use strict";
  var L_acc_0, L_value_1, L_accVar_2, L_accEq_3, L_accInit_4;
  L_acc_0 = function(){"use strict";return resolve(L_takeUpto)(lazy(function(L_t){return resolve(L_isTokenString)(L_t, "|")}), L_list);};
  L_value_1 = function(){"use strict";return resolve(L_dropAfter)(lazy(function(L_t){return resolve(L_isTokenString)(L_t, "|")}), L_list);};
  L_accVar_2 = function(){"use strict";return resolve(L_isNil)(L_acc_0)(L_foldVar)(function(){"use strict";return resolve(L_head)(L_acc_0);});};
  L_accEq_3 = function(){"use strict";return resolve(L_at)(L_acc_0)(1);};
  L_accInit_4 = function(){"use strict";return resolve(L_isNil)(L_acc_0)(L_foldVar)(function(){"use strict";return resolve(L_tail)(function(){"use strict";return resolve(L_tail)(L_acc_0);});});};

  return resolve(L_not)(function(){"use strict";return resolve(L_$h$h)(function(){"use strict";return resolve(L_isCons)(L_value_1);})(function(){"use strict";return resolve(L_$q$q)(function(){"use strict";return resolve(L_isNil)(L_acc_0);})(function(){"use strict";return resolve(L_$h$h)(function(){"use strict";return resolve(L_$z)(function(){"use strict";return resolve(L_length)(L_acc_0);}, 2);})(function(){"use strict";return resolve(L_isTokenString)(L_accEq_3, "=");});});});})(function(){"use strict";return resolve(L_err)("Fold clause expects VAR <-| ACC_VAR = ACC_VALUE | VALUE or VAR <-| | VALUE");})(function(){"use strict";return resolve(L_triple)(L_false, L_accVar_2, lazy(function(L_rest){return resolve(L_inLet)(function(){"use strict";return resolve(L_cons)(".");})(L_id)(function(){"use strict";return resolve(L_cons)("bind2", function(){"use strict";return resolve(L_cons)(L_accInit_4, function(){"use strict";return resolve(L_cons)(L_value_1, function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("\\", function(){"use strict";return resolve(L_cons)(L_accVar_2, function(){"use strict";return resolve(L_cons)(L_var, function(){"use strict";return resolve(L_cons)(".", L_rest);});});});}, L_nil);});});});})}));})})();
})))},
    function(){return resolve(L_newDefine)("checkFoldFormat", 2, "checkFoldFormat l clause = partition [] (flip isTokenString '=') l \\var eq rest .\r\n  isNil eq\r\n    parseErr \"Bad fold format, expected '=': \" clause\r\n    not 1 == (length var)\r\n      parseErr \"Bad fold format, expected one accumulator variable: \" clause\r\n      partition [] (flip isTokenString '|') rest \\init pipe results .\r\n        isNil pipe\r\n          parseErr \"Bad fold format, expected '|' after init: \" clause\r\n          triple (head var) init results", lazy((function(L_l, L_clause) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_partition)(L_nil, function(){"use strict";return resolve(L_flip)(L_isTokenString)("=");}, L_l)(lazy(function(L_var){return function(L_eq){return function(L_rest){return resolve(L_isNil)(L_eq)(function(){"use strict";return resolve(L_parseErr)("Bad fold format, expected '=': ", L_clause);})(function(){"use strict";return resolve(L_not)(function(){"use strict";return resolve(L_$p$p)(1, function(){"use strict";return resolve(L_length)(L_var);});})(function(){"use strict";return resolve(L_parseErr)("Bad fold format, expected one accumulator variable: ", L_clause);})(function(){"use strict";return resolve(L_partition)(L_nil, function(){"use strict";return resolve(L_flip)(L_isTokenString)("|");}, L_rest)(lazy(function(L_init){return function(L_pipe){return function(L_results){return resolve(L_isNil)(L_pipe)(function(){"use strict";return resolve(L_parseErr)("Bad fold format, expected '|' after init: ", L_clause);})(function(){"use strict";return resolve(L_triple)(function(){"use strict";return resolve(L_head)(L_var);}, L_init, L_results);})}}}));});})}}}));
})))},
    function(){return resolve(L_newDefine)("triple", 3, "triple a b c = \\f . f a b c", lazy(setDataType((function(L_a, L_b, L_c) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_a)(L_b)(L_c)}, 'triple');
}), 'triple')))},
    function(){return resolve(L_newDefine)("triple1", 1, "triple1 t = t \\a b c . a", lazy(function(L_t){return resolve(L_t)(lazy(function(L_a){return function(L_b){return function(L_c){return resolve(L_a)}}}))}))},
    function(){return resolve(L_newDefine)("triple2", 1, "triple2 t = t \\a b c . b", lazy(function(L_t){return resolve(L_t)(lazy(function(L_a){return function(L_b){return function(L_c){return resolve(L_b)}}}))}))},
    function(){return resolve(L_newDefine)("triple3", 1, "triple3 t = t \\a b c . c", lazy(function(L_t){return resolve(L_t)(lazy(function(L_a){return function(L_b){return function(L_c){return resolve(L_c)}}}))}))},
    function(){return resolve(L_newDefine)("partition", 3, "partition res func list = isNil list\r\n  triple [] [] []\r\n  func (head list)\r\n    triple (reverse res) (head list) (tail list)\r\n    partition [(head list) | res] func (tail list)", lazy((function(L_res, L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isNil)(L_list)(function(){"use strict";return resolve(L_triple)(L_nil, L_nil, L_nil);})(function(){"use strict";return resolve(L_func)(function(){"use strict";return resolve(L_head)(L_list);})(function(){"use strict";return resolve(L_triple)(function(){"use strict";return resolve(L_reverse)(L_res);}, function(){"use strict";return resolve(L_head)(L_list);}, function(){"use strict";return resolve(L_tail)(L_list);});})(function(){"use strict";return resolve(L_partition)(function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_head)(L_list);}, L_res);}, L_func, function(){"use strict";return resolve(L_tail)(L_list);});});});
})))},
    function(){return resolve(L_newDefine)("bind2", 3, "bind2 i m cont = bind m (cont i)", lazy((function(L_i, L_m, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_bind)(L_m, function(){"use strict";return resolve(L_cont)(L_i);});
})))},
    function(){return resolve(L_addToken)("<-")},
    function(){return resolve(L_addToken)("<-|")},
    function(){return resolve(L_defTokenPack)("do", function(){"use strict";return resolve(L_cons)(function(){"use strict";return resolve(L_cons)("<-", function(){"use strict";return resolve(L_cons)("<-|", L_nil);});}, function(){"use strict";return resolve(L_cons)(L_nil, function(){"use strict";return resolve(L_cons)(L_nil, L_nil);});});})},
    function(){return resolve(L_addStdTokenPacks)(function(){"use strict";return resolve(L_cons)("do", function(){"use strict";return resolve(L_cons)("list", function(){"use strict";return resolve(L_cons)("infix", L_nil);});});})},
    function(){return resolve(L_resetStdTokenPacks)}
  ]);
});
//# sourceMappingURL=generatedPrelude.map
