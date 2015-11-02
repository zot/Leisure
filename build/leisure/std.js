define([], function(){
  return L_runMonads([
    function(){return resolve(L_newDefine)("afetch", 2, "afetch k alist  = alist (\\h t D . h \\key value . eq key k value (afetch k t)) nil", lazy((function(L_k, L_alist) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_alist)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_h)(lazy(function(L_key){return function(L_value){return resolve(L_eq)(L_key, L_k)(L_value)(function(){return resolve(L_afetch)(L_k, L_t)})}}))}}}))(L_nil);
})))},
    function(){return resolve(L_addTokenGroup)("js[", "]")},
    function(){return resolve(L_defMacro)("js[", lazy(function(L_list){return resolve(L_cons)("js", function(){return resolve(L_cons)(function(){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)("flatten", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list)})}, L_nil)}, L_nil)})}, L_nil)})}, L_nil)})}))},
    function(){return resolve(L_newDefine)("html", 1, "html x = \\f . f x", lazy(setDataType(function(L_x){return setType(function(L_f){return resolve(L_f)(L_x)}, 'html')}, 'html')))},
    function(){return resolve(L_newDefine)("getHtml", 1, "getHtml x = x \\h . h", lazy(function(L_x){return resolve(L_x)(lazy(function(L_h){return resolve(L_h)}))}))},
    function(){return resolve(L_newDefine)("iszero", 0, "iszero = eq 0", function(){return resolve(L_eq)(0)})},
    function(){return resolve(L_newDefine)("positive", 0, "positive = 0 <", function(){return resolve(L_$y)(0)})},
    function(){return resolve(L_addToken)("--")},
    function(){return resolve(L_addToken)("++")},
    function(){return resolve(L_newDefine)("--", 0, "-- = (flip (-)) 1", function(){return resolve(L_flip)(L_$_)(1)})},
    function(){return resolve(L_newDefine)("++", 0, "++ = (1 +)", function(){return resolve(L_$o)(1)})},
    function(){return resolve(L_newDefine)("intercalate", 2, "intercalate x l = strCat (intersperse x l)", lazy((function(L_x, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_strCat)(function(){return resolve(L_intersperse)(L_x, L_l)});
})))},
    function(){return resolve(L_newDefine)("string", 0, "string = show", L_show)},
    function(){return resolve(L_newDefine)("visit", 2, "visit func l = \\\\\r\n  result = func func l\r\n  .\r\n  isCons result\r\n    result \\h t . cons (visit func h) (visit func t)\r\n    result", lazy((function(L_func, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){
  var L_result_0;
  L_result_0 = function(){return resolve(L_func)(L_func)(L_l)};

  return resolve(L_isCons)(L_result_0)(function(){return resolve(L_result_0)(lazy(function(L_h){return function(L_t){return resolve(L_cons)(function(){return resolve(L_visit)(L_func, L_h)}, function(){return resolve(L_visit)(L_func, L_t)})}}))})(L_result_0)})();
})))},
    function(){return resolve(L_newDefine)("simplify", 1, "simplify exprString = do\r\n  list <- scanLineM exprString\r\n  visit (\\func x . isToken x (tokenString x) ((isParens x) (visit func (parensContent x)) x)) list", lazy(function(L_exprString){return resolve(L_primBind)(function(){return resolve(L_scanLineM)(L_exprString)}, lazy(function(L_list){return resolve(L_visit)(lazy(function(L_func){return function(L_x){return resolve(L_isToken)(L_x)(function(){return resolve(L_tokenString)(L_x)})(function(){return resolve(L_isParens)(L_x)(function(){return resolve(L_visit)(L_func, function(){return resolve(L_parensContent)(L_x)})})(L_x)})}}), L_list)}))}))},
    function(){return resolve(L_newDefine)("range", 2, "range a b = \\f . f a b", lazy(setDataType((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_f){return resolve(L_f)(L_a)(L_b)}, 'range');
}), 'range')))},
    function(){return resolve(L_newDefine)("upto", 1, "upto n = range 0 n", lazy(function(L_n){return resolve(L_range)(0, L_n)}))},
    function(){return resolve(L_newDefine)("repeat", 1, "repeat n = \\f . f n", lazy(setDataType(function(L_n){return setType(function(L_f){return resolve(L_f)(L_n)}, 'repeat')}, 'repeat')))},
    function(){return resolve(L_newDefine)("isRepeat", 1, "isRepeat r = hasType r repeat", lazy(function(L_r){return resolve(L_hasType)(L_r, L_repeat)}))},
    function(){return resolve(L_newDefine)("isRange", 1, "isRange r = hasType r range", lazy(function(L_r){return resolve(L_hasType)(L_r, L_range)}))},
    function(){return resolve(L_newDefine)("requireJS", 1, "requireJS file = primBind (getValue 'requiredFiles')\r\n  \\files . contains files file\r\n    false\r\n    primBind (loadJS file)\r\n      \\result . result\r\n        \\x . left x\r\n        \\_ . primBind (setValue 'requiredFiles' (cons file files))\r\n          \\_ . right true", lazy(function(L_file){return resolve(L_primBind)(function(){return resolve(L_getValue)("requiredFiles")}, lazy(function(L_files){return resolve(L_contains)(L_files, L_file)(L_false)(function(){return resolve(L_primBind)(function(){return resolve(L_loadJS)(L_file)}, lazy(function(L_result){return resolve(L_result)(lazy(function(L_x){return resolve(L_left)(L_x)}))(lazy(function(L__){return resolve(L_primBind)(function(){return resolve(L_setValue)("requiredFiles", function(){return resolve(L_cons)(L_file, L_files)})}, lazy(function(L___0){return resolve(L_right)(L_true)}))}))}))})}))}))},
    function(){return resolve(L_newDefine)("loadJS", 1, "loadJS file = primBind (readFile file)\r\n  \\result . result\r\n    \\err . err\r\n    \\contents . js contents", lazy(function(L_file){return resolve(L_primBind)(function(){return resolve(L_readFile)(L_file)}, lazy(function(L_result){return resolve(L_result)(lazy(function(L_err){return resolve(L_err)}))(lazy(function(L_contents){return resolve(L_js)(L_contents)}))}))}))},
    function(){return resolve(L_newDefine)("findOption", 2, "findOption func list = do\r\n  result = func (head list)\r\n  isNil list\r\n    none\r\n    isNone result\r\n      findOption func (tail list)\r\n      result", lazy((function(L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : (function(){
  var L_result_0;
  L_result_0 = function(){return resolve(L_func)(function(){return resolve(L_head)(L_list)})};

  return resolve(L_isNil)(L_list)(L_none)(function(){return resolve(L_isNone)(L_result_0)(function(){return resolve(L_findOption)(L_func, function(){return resolve(L_tail)(L_list)})})(L_result_0)})})();
})))},
    function(){return resolve(L_newDefine)("dlempty", 0, "dlempty = id", L_id)},
    function(){return resolve(L_newDefine)("dl", 1, "dl item = \\rest . item:rest", lazy(setDataType(function(L_item){return setType(function(L_rest){return resolve(L_cons)(L_item, L_rest)}, 'dl')}, 'dl')))},
    function(){return resolve(L_newDefine)("dlPush", 2, "dlPush list item = dlAppend list (dl item)", lazy((function(L_list, L_item) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_dlAppend)(L_list, function(){return resolve(L_dl)(L_item)});
})))},
    function(){return resolve(L_newDefine)("dlAppend", 2, "dlAppend a b = \\rest . a (b rest)", lazy(setDataType((function(L_a, L_b) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : setType(function(L_rest){return resolve(L_a)(function(){return resolve(L_b)(L_rest)})}, 'dlAppend');
}), 'dlAppend')))},
    function(){return resolve(L_newDefine)("remove", 2, "remove x l = removeIf (eq x) l", lazy((function(L_x, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_removeIf)(function(){return resolve(L_eq)(L_x)}, L_l);
})))},
    function(){return resolve(L_newDefine)("removeIf", 2, "removeIf f l = filter (compose not f) l", lazy((function(L_f, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_filter)(function(){return resolve(L_compose)(L_not, L_f)}, L_l);
})))},
    function(){return resolve(L_newDefine)("take", 2, "take n list = positive n\r\n  list\r\n    \\h t D . cons h (take (-- n) t)\r\n    nil\r\n  nil", lazy((function(L_n, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_positive)(L_n)(function(){return resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_cons)(L_h, function(){return resolve(L_take)(function(){return resolve(L_$_$_)(L_n)}, L_t)})}}}))(L_nil)})(L_nil);
})))},
    function(){return resolve(L_newDefine)("takeWhile", 2, "takeWhile predicate list = list\r\n  \\h t D . predicate (head list)\r\n    cons h (takeWhile predicate t)\r\n    nil\r\n  nil", lazy((function(L_predicate, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_predicate)(function(){return resolve(L_head)(L_list)})(function(){return resolve(L_cons)(L_h, function(){return resolve(L_takeWhile)(L_predicate, L_t)})})(L_nil)}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("drop", 2, "drop x list = positive x\r\n  list\r\n    \\h t D . drop (-- x) t\r\n    nil\r\n  list", lazy((function(L_x, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_positive)(L_x)(function(){return resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_drop)(function(){return resolve(L_$_$_)(L_x)}, L_t)}}}))(L_nil)})(L_list);
})))},
    function(){return resolve(L_newDefine)("dropWhile", 2, "dropWhile predicate list = list\r\n  \\h t D . predicate h\r\n    dropWhile predicate t\r\n    list\r\n  nil", lazy((function(L_predicate, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_list)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_predicate)(L_h)(function(){return resolve(L_dropWhile)(L_predicate, L_t)})(L_list)}}}))(L_nil);
})))},
    function(){return resolve(L_newDefine)("dropLast", 2, "dropLast n list = reverse (drop n (reverse list))", lazy((function(L_n, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_reverse)(function(){return resolve(L_drop)(L_n, function(){return resolve(L_reverse)(L_list)})});
})))},
    function(){return resolve(L_newDefine)("box", 2, "box n list = list == nil\r\n  nil\r\n  [(take n list) | box n (drop n list)]", lazy((function(L_n, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_$p$p)(L_list, L_nil)(L_nil)(function(){return resolve(L_cons)(function(){return resolve(L_take)(L_n, L_list)}, function(){return resolve(L_box)(L_n, function(){return resolve(L_drop)(L_n, L_list)})})});
})))},
    function(){return resolve(L_newDefine)("at", 2, "at l x = (x == 0) (head l) (at (tail l) (-- (x) ) )", lazy((function(L_l, L_x) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_$p$p)(L_x, 0)(function(){return resolve(L_head)(L_l)})(function(){return resolve(L_at)(function(){return resolve(L_tail)(L_l)}, function(){return resolve(L_$_$_)(L_x)})});
})))},
    function(){return resolve(L_newDefine)("series", 2, "series func n = n:(series func (func n))", lazy((function(L_func, L_n) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_cons)(L_n, function(){return resolve(L_series)(L_func, function(){return resolve(L_func)(L_n)})});
})))},
    function(){return resolve(L_newDefine)("from", 1, "from n = series ++ n", lazy(function(L_n){return resolve(L_series)(L_$o$o, L_n)}))},
    function(){return resolve(L_newDefine)("fromBy", 2, "fromBy n inc = series ((+) inc) n", lazy((function(L_n, L_inc) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_series)(function(){return resolve(L_$o)(L_inc)}, L_n);
})))},
    function(){return resolve(L_newDefine)("fromTo", 2, "fromTo n m = takeWhile ((>) m) (from n)", lazy((function(L_n, L_m) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_takeWhile)(function(){return resolve(L_$z)(L_m)}, function(){return resolve(L_from)(L_n)});
})))},
    function(){return resolve(L_newDefine)("fromToBy", 3, "fromToBy n m inc = takeWhile ((>) m) (fromBy n inc)", lazy((function(L_n, L_m, L_inc) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_takeWhile)(function(){return resolve(L_$z)(L_m)}, function(){return resolve(L_fromBy)(L_n, L_inc)});
})))},
    function(){return resolve(L_newDefine)("count", 2, "count x l = countIf (eq x) l", lazy((function(L_x, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_countIf)(function(){return resolve(L_eq)(L_x)}, L_l);
})))},
    function(){return resolve(L_newDefine)("countIf", 2, "countIf f l = (eq l nil) 0\r\n  + (f (head l) 1 0) (countIf f (tail l))", lazy((function(L_f, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_eq)(L_l, L_nil)(0)(function(){return resolve(L_$o)(function(){return resolve(L_f)(function(){return resolve(L_head)(L_l)})(1)(0)}, function(){return resolve(L_countIf)(L_f, function(){return resolve(L_tail)(L_l)})})});
})))},
    function(){return resolve(L_newDefine)("countIfNot", 2, "countIfNot f l = countIf (\\x. not (f x)) l", lazy((function(L_f, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_countIf)(lazy(function(L_x){return resolve(L_not)(function(){return resolve(L_f)(L_x)})}), L_l);
})))},
    function(){return resolve(L_newDefine)("sort", 1, "sort l = sortBy (<=) l", lazy(function(L_l){return resolve(L_sortBy)(L_$y$p, L_l)}))},
    function(){return resolve(L_newDefine)("sortBy", 2, "sortBy cmp l = mergeSort cmp l", lazy((function(L_cmp, L_l) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_mergeSort)(L_cmp, L_l);
})))},
    function(){return resolve(L_newDefine)("toJson", 1, "toJson obj = isAlist obj\r\n  toJsonObject (map (\\pair . cons (head pair) (toJson (tail pair))) (reverse obj))\r\n  isCons obj\r\n    toJsonArray (map (\\item . toJson item) obj)\r\n    obj", lazy(function(L_obj){return resolve(L_isAlist)(L_obj)(function(){return resolve(L_toJsonObject)(function(){return resolve(L_map)(lazy(function(L_pair){return resolve(L_cons)(function(){return resolve(L_head)(L_pair)}, function(){return resolve(L_toJson)(function(){return resolve(L_tail)(L_pair)})})}), function(){return resolve(L_reverse)(L_obj)})})})(function(){return resolve(L_isCons)(L_obj)(function(){return resolve(L_toJsonArray)(function(){return resolve(L_map)(lazy(function(L_item){return resolve(L_toJson)(L_item)}), L_obj)})})(L_obj)})}))},
    function(){return resolve(L_newDefine)("toYaml", 1, "toYaml jsonStuff = jsonToYaml (toJson jsonStuff)", lazy(function(L_jsonStuff){return resolve(L_jsonToYaml)(function(){return resolve(L_toJson)(L_jsonStuff)})}))},
    function(){return resolve(L_addToken)("->")},
    function(){return resolve(L_newDefine)("mkStr", 1, "mkStr tok = concat['\"' (tokenString tok) '\"']", lazy(function(L_tok){return resolve(L_strCat)(function(){return resolve(L_cons)("\"", function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(L_tok)}, function(){return resolve(L_cons)("\"", L_nil)})})})}))},
    function(){return resolve(L_defMacro)("defCase", lazy(function(L_list){return (function(){
  var L_h1_0, L_t1_1, L_h2_2, L_t2_3, L_h3_4, L_t3_5;
  L_h1_0 = function(){return resolve(L_head)(L_list)};
  L_t1_1 = function(){return resolve(L_tail)(L_list)};
  L_h2_2 = function(){return resolve(L_head)(L_t1_1)};
  L_t2_3 = function(){return resolve(L_tail)(L_t1_1)};
  L_h3_4 = function(){return resolve(L_head)(L_t2_3)};
  L_t3_5 = function(){return resolve(L_tail)(L_t2_3)};

  return resolve(L_and)(function(){return resolve(L_isCons)(L_list)}, function(){return resolve(L_and)(function(){return resolve(L_isCons)(L_t1_1)}, function(){return resolve(L_and)(function(){return resolve(L_isCons)(L_t2_3)}, function(){return resolve(L_and)(function(){return resolve(L_isTokenString)(L_h2_2, ".")}, L_true)})})})(function(){return resolve(L_makeCaseArgs)(L_list, function(){return resolve(L_mkStr)(L_h1_0)}, function(){return resolve(L_mkStr)(L_h3_4)}, L_t3_5, L_id)})(function(){return resolve(L_parseErr)("Error in case definition -- expected func.name args | condition -> action, but got ", L_list)})})()}))},
    function(){return resolve(L_newDefine)("makeCaseArgs", 5, "makeCaseArgs orig funcName altName rest args = rest\r\n  \\h t D . isTokenString h '|'\r\n    makeCaseCondition orig funcName altName (args nil) t id\r\n    makeCaseArgs orig funcName altName t (dlPush args h)\r\n  parseErr \"Error in case definition -- expected func.name args | condition -> action, but got \" orig", lazy((function(L_orig, L_funcName, L_altName, L_rest, L_args) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_rest)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){return resolve(L_makeCaseCondition)(L_orig, L_funcName, L_altName, function(){return resolve(L_args)(L_nil)}, L_t, L_id)})(function(){return resolve(L_makeCaseArgs)(L_orig, L_funcName, L_altName, L_t, function(){return resolve(L_dlPush)(L_args, L_h)})})}}}))(function(){return resolve(L_parseErr)("Error in case definition -- expected func.name args | condition -> action, but got ", L_orig)});
})))},
    function(){return resolve(L_newDefine)("makeCaseCondition", 6, "makeCaseCondition orig funcName altName args rest cond = rest\r\n  \\h t D . isTokenString h '->'\r\n    foldr1 append [['advise' funcName altName (length args) '\\\\'] args ['.' (cond nil) ['some' t] 'none']]\r\n    makeCaseCondition orig funcName altName args t (dlPush cond h)\r\n parseErr \"Error in case definition -- expected func.name args | condition -> action, but got \" orig", lazy((function(L_orig, L_funcName, L_altName, L_args, L_rest, L_cond) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_rest)(lazy(function(L_h){return function(L_t){return function(L_D){return resolve(L_isTokenString)(L_h, "->")(function(){return resolve(L_foldr1)(L_append, function(){return resolve(L_cons)(function(){return resolve(L_cons)("advise", function(){return resolve(L_cons)(L_funcName, function(){return resolve(L_cons)(L_altName, function(){return resolve(L_cons)(function(){return resolve(L_length)(L_args)}, function(){return resolve(L_cons)("\\", L_nil)})})})})}, function(){return resolve(L_cons)(L_args, function(){return resolve(L_cons)(function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_cond)(L_nil)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("some", function(){return resolve(L_cons)(L_t, L_nil)})}, function(){return resolve(L_cons)("none", L_nil)})})})}, L_nil)})})})})(function(){return resolve(L_makeCaseCondition)(L_orig, L_funcName, L_altName, L_args, L_t, function(){return resolve(L_dlPush)(L_cond, L_h)})})}}}))(function(){return resolve(L_parseErr)("Error in case definition -- expected func.name args | condition -> action, but got ", L_orig)});
})))},
    function(){return resolve(L_advise)("equal", "cons", 2, lazy(function(L_a){return function(L_b){return resolve(L_and)(function(){return resolve(L_isCons)(L_a)}, function(){return resolve(L_isCons)(L_b)})(function(){return resolve(L_some)(function(){return resolve(L_and)(function(){return resolve(L_equal)(function(){return resolve(L_head)(L_a)}, function(){return resolve(L_head)(L_b)})}, function(){return resolve(L_equal)(function(){return resolve(L_tail)(L_a)}, function(){return resolve(L_tail)(L_b)})})})})(L_none)}}))},
    function(){return resolve(L_newDefine)("showBase", 2, "showBase func obj = func obj", lazy((function(L_func, L_obj) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_func)(L_obj);
})))},
    function(){return resolve(L_advise)("showBase", "unit", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_unit)(function(){return resolve(L_some)("")})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "some", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_some)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(some ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_obj)(L_id)(L_false)})}, function(){return resolve(L_cons)(")", L_nil)})})})})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "some2", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_some2)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(some2 ", function(){return resolve(L_cons)(function(){return resolve(L_obj)(lazy(function(L_a){return function(L_b){return resolve(L_showBase)(L_func, function(){return resolve(L_cons)(L_a, function(){return resolve(L_cons)(", ", function(){return resolve(L_cons)(L_b, L_nil)})})})}}))(L_false)}, function(){return resolve(L_cons)(")", L_nil)})})})})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "err", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_err)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(err ", function(){return resolve(L_cons)(function(){return resolve(L_obj)(L_id)}, function(){return resolve(L_cons)(")", L_nil)})})})})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "token", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_token)(function(){return resolve(L_some)(function(){return resolve(L_obj)(lazy(function(L_str){return function(L_pos){return resolve(L_isFilepos)(L_pos)(function(){return resolve(L_pos)(lazy(function(L_file){return function(L_line){return function(L_offset){return resolve(L_strCat)(function(){return resolve(L_cons)("token ", function(){return resolve(L_cons)(L_str, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_file, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_line, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_offset, L_nil)})})})})})})})})}}}))})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(token ", function(){return resolve(L_cons)(L_str, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_pos, function(){return resolve(L_cons)(")", L_nil)})})})})})})}}))})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "filepos", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_filepos)(function(){return resolve(L_some)(function(){return resolve(L_obj)(lazy(function(L_file){return function(L_line){return function(L_offset){return resolve(L_strCat)(function(){return resolve(L_cons)("(filepos ", function(){return resolve(L_cons)(L_file, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_line, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_offset, function(){return resolve(L_cons)(")", L_nil)})})})})})})})}}}))})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "cons", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_cons)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("[", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_head)(L_obj)})}, function(){return resolve(L_cons)(function(){return resolve(L_showConsElements)(L_func, function(){return resolve(L_tail)(L_obj)})}, function(){return resolve(L_cons)("]", L_nil)})})})})})})})(L_none)}}))},
    function(){return resolve(L_newDefine)("showConsElements", 2, "showConsElements func list = isCons list\r\n  [' ' (showBase func (head list)) (showConsElements func (tail list))]\r\n  isNil list\r\n    ''\r\n    [' | ' (showBase func list)]", lazy((function(L_func, L_list) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isCons)(L_list)(function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_head)(L_list)})}, function(){return resolve(L_cons)(function(){return resolve(L_showConsElements)(L_func, function(){return resolve(L_tail)(L_list)})}, L_nil)})})})(function(){return resolve(L_isNil)(L_list)("")(function(){return resolve(L_cons)(" | ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, L_list)}, L_nil)})})});
})))},
    function(){return resolve(L_advise)("showBase", "range", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_range)(function(){return resolve(L_some)(function(){return resolve(L_obj)(lazy(function(L_start){return function(L_end){return resolve(L_strCat)(function(){return resolve(L_cons)("(range ", function(){return resolve(L_cons)(L_start, function(){return resolve(L_cons)(" ", function(){return resolve(L_cons)(L_end, function(){return resolve(L_cons)(")", L_nil)})})})})})}}))})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "repeat", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_repeat)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(repeat ", function(){return resolve(L_cons)(function(){return resolve(L_obj)(L_id)}, function(){return resolve(L_cons)(")", L_nil)})})})})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "hamt", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_hamt)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("hamt{", function(){return resolve(L_cons)(function(){return resolve(L_intersperse)(function(){return resolve(L_map)(lazy(function(L_item){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_head)(L_item)})}, function(){return resolve(L_cons)(":", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_tail)(L_item)})}, L_nil)})})}), function(){return resolve(L_hamtPairs)(L_obj)})}, " ")}, function(){return resolve(L_cons)("}", L_nil)})})})})})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "assoc", 2, lazy(function(L_func){return function(L_obj){return resolve(L_isAlist)(L_obj)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_flatten)(function(){return resolve(L_cons)("{", function(){return resolve(L_cons)(function(){return resolve(L_intersperse)(function(){return resolve(L_map)(lazy(function(L_item){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_head)(L_item)})}, function(){return resolve(L_cons)(":", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_tail)(L_item)})}, L_nil)})})}), L_obj)}, " ")}, function(){return resolve(L_cons)("}", L_nil)})})})})})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "left", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_left)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(left ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_obj)(L_id)(L_id)})}, function(){return resolve(L_cons)(")", L_nil)})})})})})(L_none)}}))},
    function(){return resolve(L_advise)("showBase", "right", 2, lazy(function(L_func){return function(L_obj){return resolve(L_hasType)(L_obj, L_right)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(right ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_obj)(L_id)(L_id)})}, function(){return resolve(L_cons)(")", L_nil)})})})})})(L_none)}}))},
    function(){return resolve(L_newDefine)("showHtml", 1, "showHtml x = showBase presentHtml x", lazy(function(L_x){return resolve(L_showBase)(L_presentHtml, L_x)}))},
    function(){return resolve(L_newDefine)("show", 1, "show x = showBase present x", lazy(function(L_x){return resolve(L_showBase)(L_present, L_x)}))},
    function(){return resolve(L_newDefine)("present", 1, "present x = x", lazy(function(L_x){return resolve(L_x)}))},
    function(){return resolve(L_newDefine)("presentHtml", 1, "presentHtml x = escapeHtml (present x)", lazy(function(L_x){return resolve(L_escapeHtml)(function(){return resolve(L_present)(L_x)})}))},
    function(){return resolve(L_advise)("present", "string", 1, lazy(function(L_obj){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_obj)}, "*string")(function(){return resolve(L_some)(function(){return resolve(L_jsonStringify)(L_obj, L_id, L_id)})})(L_none)}))},
    function(){return resolve(L_advise)("present", "func", 1, lazy(function(L_obj){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_obj)}, "*function")(function(){return resolve(L_some)(function(){return resolve(L_presentFunction)(L_obj)})})(L_none)}))},
    function(){return resolve(L_newDefine)("presentFunction", 1, "presentFunction obj = do\r\n  info = funcInfo obj\r\n  guts = isNil info\r\n    [(funcName obj\r\n      id\r\n      'unknown')]\r\n    and (> (length info) 1) (getFunction (head info) (\\func . hasProperty func 'infix') false)\r\n      [(present (head (tail info))) (head info) | map present (tail (tail info))]\r\n      cons (head info) (map present (tail info))\r\n  concat[\"(\" (join guts ' ') \")\"]", lazy(function(L_obj){return (function(){
  var L_info_0, L_guts_1;
  L_info_0 = function(){return resolve(L_funcInfo)(L_obj)};
  L_guts_1 = function(){return resolve(L_isNil)(L_info_0)(function(){return resolve(L_cons)(function(){return resolve(L_funcName)(L_obj)(L_id)("unknown")}, L_nil)})(function(){return resolve(L_and)(function(){return resolve(L_$z)(function(){return resolve(L_length)(L_info_0)}, 1)}, function(){return resolve(L_getFunction)(function(){return resolve(L_head)(L_info_0)})(lazy(function(L_func){return resolve(L_hasProperty)(L_func, "infix")}))(L_false)})(function(){return resolve(L_cons)(function(){return resolve(L_present)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_info_0)})})}, function(){return resolve(L_cons)(function(){return resolve(L_head)(L_info_0)}, function(){return resolve(L_map)(L_present, function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_info_0)})})})})})(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_info_0)}, function(){return resolve(L_map)(L_present, function(){return resolve(L_tail)(L_info_0)})})})})};

  return resolve(L_strCat)(function(){return resolve(L_cons)("(", function(){return resolve(L_cons)(function(){return resolve(L_join)(L_guts_1, " ")}, function(){return resolve(L_cons)(")", L_nil)})})})})()}))},
    function(){return resolve(L_advise)("presentHtml", "func", 1, lazy(function(L_obj){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_obj)}, "*function")(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("<span class=\"partial-application\">", function(){return resolve(L_cons)(function(){return resolve(L_presentFunction)(L_obj)}, function(){return resolve(L_cons)("</span>", L_nil)})})})})})(L_none)}))},
    function(){return resolve(L_advise)("present", "nil", 1, lazy(function(L_obj){return resolve(L_hasType)(L_obj, L_nil)(function(){return resolve(L_some)("nil")})(L_none)}))},
    function(){return resolve(L_advise)("present", "none", 1, lazy(function(L_obj){return resolve(L_hasType)(L_obj, L_none)(function(){return resolve(L_some)("none")})(L_none)}))},
    function(){return resolve(L_advise)("presentHtml", "html", 1, lazy(function(L_obj){return resolve(L_hasType)(L_obj, L_html)(function(){return resolve(L_some)(function(){return resolve(L_obj)(L_id)})})(L_none)}))},
    function(){return resolve(L_newDefine)("wrapped", 1, "wrapped x = \\f . f x", lazy(setDataType(function(L_x){return setType(function(L_f){return resolve(L_f)(L_x)}, 'wrapped')}, 'wrapped')))},
    function(){return resolve(L_advise)("showBase", "wrapped", 2, lazy(function(L_func){return function(L_v){return resolve(L_hasType)(L_v, L_wrapped)(function(){return resolve(L_some)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("wrapped ", function(){return resolve(L_cons)(function(){return resolve(L_showBase)(L_func, function(){return resolve(L_v)(L_id)})}, L_nil)})})})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "wrapped", 2, lazy(function(L_v){return function(L_cont){return resolve(L_hasType)(L_v, L_wrapped)(function(){return resolve(L_some)(function(){return resolve(L_cont)(function(){return resolve(L_v)(L_id)})})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "bool", 2, lazy(function(L_opt){return function(L_cont){return resolve(L_or)(function(){return resolve(L_$p$p)(L_opt, L_true)}, function(){return resolve(L_$p$p)(L_opt, L_false)})(function(){return resolve(L_some)(function(){return resolve(L_opt)(function(){return resolve(L_cont)(L_true)})(L_unit)})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "option", 2, lazy(function(L_opt){return function(L_cont){return resolve(L_isOption)(L_opt)(function(){return resolve(L_some)(function(){return resolve(L_opt)(lazy(function(L_value){return resolve(L_cont)(L_value)}))(L_unit)})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "either", 2, lazy(function(L_either){return function(L_cont){return resolve(L_isEither)(L_either)(function(){return resolve(L_some)(function(){return resolve(L_either)(lazy(function(L__){return resolve(L_either)}))(lazy(function(L_value){return resolve(L_cont)(L_value)}))})})(L_none)}}))},
    function(){return resolve(L_newDefine)("caseResult", 1, "caseResult x = \\f . f x", lazy(setDataType(function(L_x){return setType(function(L_f){return resolve(L_f)(L_x)}, 'caseResult')}, 'caseResult')))},
    function(){return resolve(L_newDefine)("isCaseResult", 1, "isCaseResult v = hasType v caseResult", lazy(function(L_v){return resolve(L_hasType)(L_v, L_caseResult)}))},
    function(){return resolve(L_newDefine)("case", 2, "case test res = test (caseResult res) unit", lazy((function(L_test, L_res) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_test)(function(){return resolve(L_caseResult)(L_res)})(L_unit);
})))},
    function(){return resolve(L_advise)("bind", "caseResult", 2, lazy(function(L_data){return function(L_cont){return resolve(L_isCaseResult)(L_data)(function(){return resolve(L_some)(function(){return resolve(L_data)(L_id)})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "cons", 2, lazy(function(L_list){return function(L_cont){return resolve(L_hasType)(L_list, L_cons)(function(){return resolve(L_some)(function(){return resolve(L_map)(L_cont, L_list)})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "range", 2, lazy(function(L_r){return function(L_cont){return resolve(L_hasType)(L_r, L_range)(function(){return resolve(L_some)(function(){return resolve(L_map)(L_cont, L_r)})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "repeat", 2, lazy(function(L_r){return function(L_cont){return resolve(L_hasType)(L_r, L_repeat)(function(){return resolve(L_some)(function(){return resolve(L_map)(function(){return resolve(L_cont)(L_nil)}, L_r)})})(L_none)}}))},
    function(){return resolve(L_newDefine)("subbind", 2, "subbind m cont = bind (wrapped m) cont", lazy((function(L_m, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_bind)(function(){return resolve(L_wrapped)(L_m)}, L_cont);
})))},
    function(){return resolve(L_advise)("subbind", "monad", 2, lazy(function(L_m){return function(L_cont){return resolve(L_or)(function(){return resolve(L_hasType)(L_m, "*Monad2")}, function(){return resolve(L_hasType)(L_m, "monad")})(function(){return resolve(L_some)(function(){return resolve(L_bind)(L_m, L_cont)})})(L_none)}}))},
    function(){return resolve(L_advise)("subbind", "boolean", 2, lazy(function(L_m){return function(L_cont){return resolve(L_$p$p)(L_m, L_false)(function(){return resolve(L_some)(function(){return resolve(L_cont)(L_unit)})})(L_none)}}))},
    function(){return resolve(L_advise)("subbind", "option", 2, lazy(function(L_m){return function(L_cont){return resolve(L_hasType)(L_m, L_none)(function(){return resolve(L_some)(function(){return resolve(L_cont)(L_unit)})})(L_none)}}))},
    function(){return resolve(L_advise)("subbind", "either", 2, lazy(function(L_m){return function(L_cont){return resolve(L_hasType)(L_m, L_left)(function(){return resolve(L_some)(function(){return resolve(L_cont)(L_unit)})})(L_none)}}))},
    function(){return resolve(L_newDefine)("runRepeat", 3, "runRepeat count limit f = count < limit\r\n  [(f count) | runRepeat (count + 1) limit f]\r\n  []", lazy((function(L_count, L_limit, L_f) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_$y)(L_count, L_limit)(function(){return resolve(L_cons)(function(){return resolve(L_f)(L_count)}, function(){return resolve(L_runRepeat)(function(){return resolve(L_$o)(L_count, 1)}, L_limit, L_f)})})(L_nil);
})))},
    function(){return resolve(L_advise)("map", "range", 2, lazy(function(L_func){return function(L_r){return resolve(L_isRange)(L_r)(function(){return resolve(L_some)(function(){return resolve(L_r)(lazy(function(L_a){return function(L_b){return resolve(L_runRepeat)(L_a, L_b, L_func)}}))})})(L_none)}}))},
    function(){return resolve(L_advise)("map", "repeat", 2, lazy(function(L_item){return function(L_r){return resolve(L_isRepeat)(L_r)(function(){return resolve(L_some)(function(){return resolve(L_r)(lazy(function(L_n){return resolve(L_runRepeat)(0, L_n, lazy(function(L_x){return resolve(L_item)}))}))})})(L_none)}}))},
    function(){return resolve(L_newDefine)("wrappedForeach", 1, "wrappedForeach x = \\f . f x", lazy(setDataType(function(L_x){return setType(function(L_f){return resolve(L_f)(L_x)}, 'wrappedForeach')}, 'wrappedForeach')))},
    function(){return resolve(L_newDefine)("testWrappedForeach", 2, "testWrappedForeach f test = and (hasType f wrappedForeach) (f test)", lazy((function(L_f, L_test) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_and)(function(){return resolve(L_hasType)(L_f, L_wrappedForeach)}, function(){return resolve(L_f)(L_test)});
})))},
    function(){return resolve(L_advise)("bind", "wrappedForeachCons", 2, lazy(function(L_list){return function(L_cont){return resolve(L_testWrappedForeach)(L_list, L_isCons)(function(){return resolve(L_some)(function(){return resolve(L_doall)(function(){return resolve(L_map)(L_cont, function(){return resolve(L_list)(L_id)})})})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "wrappedForeachRep", 2, lazy(function(L_rep){return function(L_cont){return resolve(L_testWrappedForeach)(L_rep, L_isRepeat)(function(){return resolve(L_some)(function(){return resolve(L_doall)(function(){return resolve(L_map)(function(){return resolve(L_cont)(L_nil)}, function(){return resolve(L_rep)(L_id)})})})})(L_none)}}))},
    function(){return resolve(L_advise)("bind", "wrappedForeachRange", 2, lazy(function(L_r){return function(L_cont){return resolve(L_testWrappedForeach)(L_r, L_isRange)(function(){return resolve(L_some)(function(){return resolve(L_doall)(function(){return resolve(L_map)(L_cont, function(){return resolve(L_r)(L_id)})})})})(L_none)}}))},
    function(){return resolve(L_defMacro)("foreach", lazy(function(L_list){return resolve(L_cons)("wrappedForeach", function(){return resolve(L_cons)(L_list, L_nil)})}))},
    function(){return resolve(L_defMacro)("defWrapper", lazy(function(L_list){return resolve(L_grabLeftOfArrow)(L_list, L_nil, lazy(function(L_left){return function(L_right){return resolve(L_cons)("override", function(){return resolve(L_cons)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("'", function(){return resolve(L_cons)(function(){return resolve(L_strTokenString)(function(){return resolve(L_head)(L_left)})}, function(){return resolve(L_cons)("'", L_nil)})})})}, function(){return resolve(L_cons)(function(){return resolve(L_append)(function(){return resolve(L_cons)("\\", function(){return resolve(L_tail)(L_left)})}, function(){return resolve(L_cons)(".", L_right)})}, L_nil)})})}}))}))},
    function(){return resolve(L_newDefine)("grabLeftOfArrow", 3, "grabLeftOfArrow list left cont = isTokenString (head list) '->'\r\n  cont (reverse left) (tail list)\r\n  grabLeftOfArrow (tail list) (head list) : left cont", lazy((function(L_list, L_left, L_cont) {
    return arguments.callee.length != arguments.length
        ? Leisure_primCall(arguments.callee, 0, arguments)
        : resolve(L_isTokenString)(function(){return resolve(L_head)(L_list)}, "->")(function(){return resolve(L_cont)(function(){return resolve(L_reverse)(L_left)})(function(){return resolve(L_tail)(L_list)})})(function(){return resolve(L_grabLeftOfArrow)(function(){return resolve(L_tail)(L_list)}, function(){return resolve(L_cons)(function(){return resolve(L_head)(L_list)}, L_left)}, L_cont)});
})))},
    function(){return resolve(L_override)("head", lazy(function(L_oldHead){return function(L_list){return resolve(L_assertType)("head argument", L_cons, L_list)(lazy(function(L_h){return function(L_t){return resolve(L_h)}}))}}))},
    function(){return resolve(L_override)("tail", lazy(function(L_oldTail){return function(L_list){return resolve(L_assertType)("tail argument", L_cons, L_list)(lazy(function(L_h){return function(L_t){return resolve(L_t)}}))}}))},
    function(){return resolve(L_override)("hamtWith", lazy(function(L_oldHamtWith){return function(L_key){return function(L_value){return function(L_hamt){return resolve(L_oldHamtWith)(function(){return resolve(L_assertType)("hamtWith key", "*string", L_key)})(L_value)(L_hamt)}}}}))},
    function(){return resolve(L_newDefine)("html", 1, "html x = \\f . f x", lazy(setDataType(function(L_x){return setType(function(L_f){return resolve(L_f)(L_x)}, 'html')}, 'html')))},
    function(){return resolve(L_defTokenPack)("util", function(){return resolve(L_cons)(function(){return resolve(L_cons)("->", function(){return resolve(L_cons)("--", function(){return resolve(L_cons)("++", L_nil)})})}, function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_cons)("js[", "]")}, L_nil)}, function(){return resolve(L_cons)(L_nil, L_nil)})})})},
    function(){return resolve(L_addStdTokenPacks)(function(){return resolve(L_cons)("util", L_nil)})},
    function(){return resolve(L_newDefine)("_1of2", 1, "_1of2 s = s \\a b . a", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return resolve(L_a)}}))}))},
    function(){return resolve(L_newDefine)("_2of2", 1, "_2of2 s = s \\a b . b", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return resolve(L_b)}}))}))},
    function(){return resolve(L_newDefine)("_1of3", 1, "_1of3 s = s \\a b c . a", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return function(L_c){return resolve(L_a)}}}))}))},
    function(){return resolve(L_newDefine)("_2of3", 1, "_2of3 s = s \\a b c . b", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return function(L_c){return resolve(L_b)}}}))}))},
    function(){return resolve(L_newDefine)("_3of3", 1, "_3of3 s = s \\a b c . c", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return function(L_c){return resolve(L_c)}}}))}))},
    function(){return resolve(L_newDefine)("_1of4", 1, "_1of4 s = s \\a b c d . a", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return function(L_c){return function(L_d){return resolve(L_a)}}}}))}))},
    function(){return resolve(L_newDefine)("_2of4", 1, "_2of4 s = s \\a b c d . b", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return function(L_c){return function(L_d){return resolve(L_b)}}}}))}))},
    function(){return resolve(L_newDefine)("_3of4", 1, "_3of4 s = s \\a b c d . c", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return function(L_c){return function(L_d){return resolve(L_c)}}}}))}))},
    function(){return resolve(L_newDefine)("_4of4", 1, "_4of4 s = s \\a b c d . d", lazy(function(L_s){return resolve(L_s)(lazy(function(L_a){return function(L_b){return function(L_c){return function(L_d){return resolve(L_d)}}}}))}))},
    function(){return resolve(L_newDefine)("getLitValue", 1, "getLitValue ast = _1of2 ast", lazy(function(L_ast){return resolve(L__1of2)(L_ast)}))},
    function(){return resolve(L_newDefine)("getLitRange", 1, "getLitRange ast = _2of2 ast", lazy(function(L_ast){return resolve(L__2of2)(L_ast)}))},
    function(){return resolve(L_newDefine)("getRefName", 1, "getRefName ast = _1of2 ast", lazy(function(L_ast){return resolve(L__1of2)(L_ast)}))},
    function(){return resolve(L_newDefine)("getRefRange", 1, "getRefRange ast = _2of2 ast", lazy(function(L_ast){return resolve(L__2of2)(L_ast)}))},
    function(){return resolve(L_newDefine)("getLambdaName", 1, "getLambdaName ast = _1of3 ast", lazy(function(L_ast){return resolve(L__1of3)(L_ast)}))},
    function(){return resolve(L_newDefine)("getLambdaBody", 1, "getLambdaBody ast = _2of3 ast", lazy(function(L_ast){return resolve(L__2of3)(L_ast)}))},
    function(){return resolve(L_newDefine)("getLambdaRange", 1, "getLambdaRange ast = _3of3 ast", lazy(function(L_ast){return resolve(L__3of3)(L_ast)}))},
    function(){return resolve(L_newDefine)("getApplyFunc", 1, "getApplyFunc ast = _1of2 ast", lazy(function(L_ast){return resolve(L__1of2)(L_ast)}))},
    function(){return resolve(L_newDefine)("getApplyArg", 1, "getApplyArg ast = _2of2 ast", lazy(function(L_ast){return resolve(L__2of2)(L_ast)}))},
    function(){return resolve(L_newDefine)("getLetName", 1, "getLetName ast = _1of4 ast", lazy(function(L_ast){return resolve(L__1of4)(L_ast)}))},
    function(){return resolve(L_newDefine)("getLetValue", 1, "getLetValue ast = _2of4 ast", lazy(function(L_ast){return resolve(L__2of4)(L_ast)}))},
    function(){return resolve(L_newDefine)("getLetBody", 1, "getLetBody ast = _3of4 ast", lazy(function(L_ast){return resolve(L__3of4)(L_ast)}))},
    function(){return resolve(L_newDefine)("getLetRange", 1, "getLetRange ast = _4of4 ast", lazy(function(L_ast){return resolve(L__4of4)(L_ast)}))},
    function(){return resolve(L_newDefine)("getAnnoName", 1, "getAnnoName ast = _1of3 ast", lazy(function(L_ast){return resolve(L__1of3)(L_ast)}))},
    function(){return resolve(L_newDefine)("getAnnoData", 1, "getAnnoData ast = _2of3 ast", lazy(function(L_ast){return resolve(L__2of3)(L_ast)}))},
    function(){return resolve(L_newDefine)("getAnnoBody", 1, "getAnnoBody ast = _3of3 ast", lazy(function(L_ast){return resolve(L__3of3)(L_ast)}))},
    function(){return resolve(L_newDefine)("definitionList", 0, "definitionList = do\r\n  f <- funcList\r\n  m <- getValue 'macroDefs'\r\n  sort (append f (map head m))", function(){return resolve(L_primBind)(L_funcList, lazy(function(L_f){return resolve(L_primBind)(function(){return resolve(L_getValue)("macroDefs")}, lazy(function(L_m){return resolve(L_sort)(function(){return resolve(L_append)(L_f, function(){return resolve(L_map)(L_head, L_m)})})}))}))})},
    function(){return resolve(L_newDefine)("eval", 1, "eval str = do\r\n  ast <- newParseLine 0 nil str\r\n  ifNotErr ast (runAst ast)", lazy(function(L_str){return resolve(L_primBind)(function(){return resolve(L_newParseLine)(0, L_nil, L_str)}, lazy(function(L_ast){return resolve(L_ifNotErr)(L_ast, function(){return resolve(L_runAst)(L_ast)})}))}))}
  ]);
});
//# sourceMappingURL=std.map
