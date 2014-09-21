module.exports = L_runMonads([
  function(){return resolve(L_setNameSpace)("core")},
 function(){return resolve(L_newDefine)("true")(0)("true = \\a b . a")(lazy(setDataType(setType(function(L_a){return $F(arguments, function(L_b){return resolve(L_a)})}, 'true'), 'true')))},
 function(){return resolve(L_newDefine)("false")(0)("false = \\a b . b")(lazy(setDataType(setType(function(L_a){return $F(arguments, function(L_b){return resolve(L_b)})}, 'false'), 'false')))},
 function(){return resolve(L_newDefine)("not")(1)("not b = b false true")(lazy(function(L_b){return resolve(L_b)(L_false)(L_true)}))},
 function(){return resolve(L_newDefine)("and")(2)("and a b = a b false")(lazy((function () {
  var main;
  var full = function (L_a, L_b) {
    return resolve(L_a)(L_b)(L_false);
  };
  var partial = function(L_a) {
    var _1 = function(L_b) {
            return full(L_a, L_b);
          };
          _1.leisureInfo = {arg: L_a, name: main.leisureName};
          return _1;
  };
  main = function(L_a, L_b, more) {
    if (L_b && (typeof more == "undefined" || more == null)) {
      return full(L_a, L_b);
    } else if (typeof L_b == "undefined" || L_b == null) {
      return partial(L_a);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("or")(2)("or a b = a true b")(lazy((function () {
  var main;
  var full = function (L_a, L_b) {
    return resolve(L_a)(L_true)(L_b);
  };
  var partial = function(L_a) {
    var _1 = function(L_b) {
            return full(L_a, L_b);
          };
          _1.leisureInfo = {arg: L_a, name: main.leisureName};
          return _1;
  };
  main = function(L_a, L_b, more) {
    if (L_b && (typeof more == "undefined" || more == null)) {
      return full(L_a, L_b);
    } else if (typeof L_b == "undefined" || L_b == null) {
      return partial(L_a);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("some")(1)("some x = \\someCase noneCase . someCase x")(lazy(setDataType(function(L_x){return setType(function(L_someCase){return $F(arguments, function(L_noneCase){return resolve(L_someCase)(L_x)})}, 'some')}, 'some')))},
 function(){return resolve(L_newDefine)("some2")(2)("some2 a b = \\someCase noneCase . someCase a b")(lazy(setDataType((function () {
  var main;
  var full = function (L_a, L_b) {
    return setType(function(L_someCase){return $F(arguments, function(L_noneCase){return resolve(L_someCase)(L_a)(L_b)})}, 'some2');
  };
  var partial = function(L_a) {
    var _1 = function(L_b) {
            return full(L_a, L_b);
          };
          _1.leisureInfo = {arg: L_a, name: main.leisureName};
          return _1;
  };
  main = function(L_a, L_b, more) {
    if (L_b && (typeof more == "undefined" || more == null)) {
      return full(L_a, L_b);
    } else if (typeof L_b == "undefined" || L_b == null) {
      return partial(L_a);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'some2')))},
 function(){return resolve(L_newDefine)("none")(0)("none = \\someCase noneCase . noneCase")(lazy(setDataType(setType(function(L_someCase){return $F(arguments, function(L_noneCase){return resolve(L_noneCase)})}, 'none'), 'none')))},
 function(){return resolve(L_newDefine)("isNone")(1)("isNone obj = hasType obj none")(lazy(function(L_obj){return resolve(L_hasType)(L_obj)(L_none)}))},
 function(){return resolve(L_newDefine)("isSome")(1)("isSome obj = hasType obj some")(lazy(function(L_obj){return resolve(L_hasType)(L_obj)(L_some)}))},
 function(){return resolve(L_newDefine)("isSome2")(1)("isSome2 obj = hasType obj some2")(lazy(function(L_obj){return resolve(L_hasType)(L_obj)(L_some2)}))},
 function(){return resolve(L_newDefine)("isOption")(1)("isOption obj = or (isSome obj) (isNone obj)")(lazy(function(L_obj){return resolve(L_or)(function(){return resolve(L_isSome)(L_obj)}, function(){return resolve(L_isNone)(L_obj)})}))},
 function(){return resolve(L_newDefine)("neq")(2)("neq a b = not (eq a b)")(lazy((function () {
  var main;
  var full = function (L_a, L_b) {
    return resolve(L_not)(function(){return resolve(L_eq)(L_a)(L_b)});
  };
  var partial = function(L_a) {
    var _1 = function(L_b) {
            return full(L_a, L_b);
          };
          _1.leisureInfo = {arg: L_a, name: main.leisureName};
          return _1;
  };
  main = function(L_a, L_b, more) {
    if (L_b && (typeof more == "undefined" || more == null)) {
      return full(L_a, L_b);
    } else if (typeof L_b == "undefined" || L_b == null) {
      return partial(L_a);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("left")(1)("left x = \\lCase rCase . lCase x")(lazy(setDataType(function(L_x){return setType(function(L_lCase){return $F(arguments, function(L_rCase){return resolve(L_lCase)(L_x)})}, 'left')}, 'left')))},
 function(){return resolve(L_newDefine)("right")(1)("right x = \\lCase rCase . rCase x")(lazy(setDataType(function(L_x){return setType(function(L_lCase){return $F(arguments, function(L_rCase){return resolve(L_rCase)(L_x)})}, 'right')}, 'right')))},
 function(){return resolve(L_newDefine)("isEither")(1)("isEither obj = or (hasType obj left) (hasType obj right)")(lazy(function(L_obj){return resolve(L_or)(function(){return resolve(L_hasType)(L_obj)(L_left)}, function(){return resolve(L_hasType)(L_obj)(L_right)})}))},
 function(){return resolve(L_newDefine)("isString")(1)("isString s = == (getType s) '*string'")(lazy(function(L_s){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_s)})("*string")}))},
 function(){return resolve(L_newDefine)("isNumber")(1)("isNumber s = == (getType s) '*number'")(lazy(function(L_s){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_s)})("*number")}))},
 function(){return resolve(L_newDefine)("strAsc")(1)("strAsc string = _strAsc (assertType 'strAsc string' '*string' string)")(lazy(function(L_string){return resolve(L__strAsc)(function(){return resolve(L_assertType)("strAsc string", "*string", L_string)})}))},
 function(){return resolve(L_newDefine)("strChr")(1)("strChr ascii = _strChr (assertType 'strChr string' '*number' ascii)")(lazy(function(L_ascii){return resolve(L__strChr)(function(){return resolve(L_assertType)("strChr string", "*number", L_ascii)})}))},
 function(){return resolve(L_newDefine)("strAt")(2)("strAt string index = _strAt\n  assertType 'strAt string' '*string' string\n  assertType 'strAt index' '*number' index")(lazy((function () {
  var main;
  var full = function (L_string, L_index) {
    return resolve(L__strAt)(function(){return resolve(L_assertType)("strAt string", "*string", L_string)})(function(){return resolve(L_assertType)("strAt index", "*number", L_index)});
  };
  var partial = function(L_string) {
    var _1 = function(L_index) {
            return full(L_string, L_index);
          };
          _1.leisureInfo = {arg: L_string, name: main.leisureName};
          return _1;
  };
  main = function(L_string, L_index, more) {
    if (L_index && (typeof more == "undefined" || more == null)) {
      return full(L_string, L_index);
    } else if (typeof L_index == "undefined" || L_index == null) {
      return partial(L_string);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strStartsWith")(2)("strStartsWith string prefix = _strStartsWith\n  assertType 'strStartsWith string' '*string' string\n  assertType 'strStartsWith prefix' '*string' prefix")(lazy((function () {
  var main;
  var full = function (L_string, L_prefix) {
    return resolve(L__strStartsWith)(function(){return resolve(L_assertType)("strStartsWith string", "*string", L_string)})(function(){return resolve(L_assertType)("strStartsWith prefix", "*string", L_prefix)});
  };
  var partial = function(L_string) {
    var _1 = function(L_prefix) {
            return full(L_string, L_prefix);
          };
          _1.leisureInfo = {arg: L_string, name: main.leisureName};
          return _1;
  };
  main = function(L_string, L_prefix, more) {
    if (L_prefix && (typeof more == "undefined" || more == null)) {
      return full(L_string, L_prefix);
    } else if (typeof L_prefix == "undefined" || L_prefix == null) {
      return partial(L_string);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strLen")(1)("strLen string = _strLen (assertType 'strLen string' '*string' string)")(lazy(function(L_string){return resolve(L__strLen)(function(){return resolve(L_assertType)("strLen string", "*string", L_string)})}))},
 function(){return resolve(L_newDefine)("strToLowerCase")(1)("strToLowerCase string = _strToLowerCase (assertType 'strToLowerCase string' '*string' string)")(lazy(function(L_string){return resolve(L__strToLowerCase)(function(){return resolve(L_assertType)("strToLowerCase string", "*string", L_string)})}))},
 function(){return resolve(L_newDefine)("strToUpperCase")(1)("strToUpperCase string = _strToUpperCase (assertType 'strToUpperCase string' '*string' string)")(lazy(function(L_string){return resolve(L__strToUpperCase)(function(){return resolve(L_assertType)("strToUpperCase string", "*string", L_string)})}))},
 function(){return resolve(L_newDefine)("strReplace")(3)("strReplace string pat repl = _strReplace\n  assertType 'strReplace string' '*string' string\n  assert (or (hasType pat '*string') (hasType pat '*RegExp')) (strCat (cons 'strStartsWith pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat\n  assertType 'strReplace repl' '*string' repl")(lazy((function () {
  var main;
  var full = function (L_string, L_pat, L_repl) {
    return resolve(L__strReplace)(function(){return resolve(L_assertType)("strReplace string", "*string", L_string)})(function(){return resolve(L_assert)(function(){return resolve(L_or)(function(){return resolve(L_hasType)(L_pat)("*string")}, function(){return resolve(L_hasType)(L_pat)("*RegExp")})})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strStartsWith pat should be type string or RegExp but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_pat)}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_pat)}, L_nil)})})})})})(L_pat)})(function(){return resolve(L_assertType)("strReplace repl", "*string", L_repl)});
  };
  var partial = function(L_string) {
    var _1 = function(L_pat) {
            var _2 = function(L_repl) {
              return full(L_string, L_pat, L_repl);
            };
            _2.leisureInfo = {arg: L_pat, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_string, name: main.leisureName};
          return _1;
  };
  main = function(L_string, L_pat, L_repl, more) {
    if (L_repl && (typeof more == "undefined" || more == null)) {
      return full(L_string, L_pat, L_repl);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_string);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strSubstring")(3)("strSubstring str start end = _strSubstring\n  assertType 'strSubstring str' '*string' str\n  assertType 'strSubstring start' '*number' start\n  assertType 'strSubstring end' '*number' end")(lazy((function () {
  var main;
  var full = function (L_str, L_start, L_end) {
    return resolve(L__strSubstring)(function(){return resolve(L_assertType)("strSubstring str", "*string", L_str)})(function(){return resolve(L_assertType)("strSubstring start", "*number", L_start)})(function(){return resolve(L_assertType)("strSubstring end", "*number", L_end)});
  };
  var partial = function(L_str) {
    var _1 = function(L_start) {
            var _2 = function(L_end) {
              return full(L_str, L_start, L_end);
            };
            _2.leisureInfo = {arg: L_start, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_start, L_end, more) {
    if (L_end && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_start, L_end);
    } else if (typeof L_start == "undefined" || L_start == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strSplit")(2)("strSplit str pat = _strSplit\n  assertType 'strSplit str' '*string' str\n  assert (or (hasType pat '*string') (hasType pat '*RegExp')) (strCat (cons 'strSplit pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat")(lazy((function () {
  var main;
  var full = function (L_str, L_pat) {
    return resolve(L__strSplit)(function(){return resolve(L_assertType)("strSplit str", "*string", L_str)})(function(){return resolve(L_assert)(function(){return resolve(L_or)(function(){return resolve(L_hasType)(L_pat)("*string")}, function(){return resolve(L_hasType)(L_pat)("*RegExp")})})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strSplit pat should be type string or RegExp but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_pat)}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_pat)}, L_nil)})})})})})(L_pat)});
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            return full(L_str, L_pat);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, more) {
    if (L_pat && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strCat")(1)("strCat list = _strCat\n  assert (isList list) (strCat (cons 'strCat list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list")(lazy(function(L_list){return resolve(L__strCat)(function(){return resolve(L_assert)(function(){return resolve(L_isList)(L_list)})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strCat list should be type cons or nil but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_list)}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(L_list)})})})})})(L_list)})}))},
 function(){return resolve(L_newDefine)("strAdd")(2)("strAdd str1 str2 = _strAdd (assertType 'strAdd str1' '*string' str1) (assertType 'strAdd str2' '*string' str2)")(lazy((function () {
  var main;
  var full = function (L_str1, L_str2) {
    return resolve(L__strAdd)(function(){return resolve(L_assertType)("strAdd str1", "*string", L_str1)})(function(){return resolve(L_assertType)("strAdd str2", "*string", L_str2)});
  };
  var partial = function(L_str1) {
    var _1 = function(L_str2) {
            return full(L_str1, L_str2);
          };
          _1.leisureInfo = {arg: L_str1, name: main.leisureName};
          return _1;
  };
  main = function(L_str1, L_str2, more) {
    if (L_str2 && (typeof more == "undefined" || more == null)) {
      return full(L_str1, L_str2);
    } else if (typeof L_str2 == "undefined" || L_str2 == null) {
      return partial(L_str1);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strMatch")(2)("strMatch str pat = _strMatch\n  assertType 'strMatch str' '*string' str\n  assert (or (hasType pat '*string') (hasType pat '*RegExp')) (strCat (cons 'strMatch pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat")(lazy((function () {
  var main;
  var full = function (L_str, L_pat) {
    return resolve(L__strMatch)(function(){return resolve(L_assertType)("strMatch str", "*string", L_str)})(function(){return resolve(L_assert)(function(){return resolve(L_or)(function(){return resolve(L_hasType)(L_pat)("*string")}, function(){return resolve(L_hasType)(L_pat)("*RegExp")})})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strMatch pat should be type string or RegExp but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_pat)}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_pat)}, L_nil)})})})})})(L_pat)});
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            return full(L_str, L_pat);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, more) {
    if (L_pat && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strToList")(1)("strToList str = _strToList (assertType 'strToList str' '*string' str)")(lazy(function(L_str){return resolve(L__strToList)(function(){return resolve(L_assertType)("strToList str", "*string", L_str)})}))},
 function(){return resolve(L_newDefine)("strFromList")(1)("strFromList list = _strFromList\n  assert (isList list) (strCat (cons 'strFromList list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list")(lazy(function(L_list){return resolve(L__strFromList)(function(){return resolve(L_assert)(function(){return resolve(L_isList)(L_list)})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("strFromList list should be type cons or nil but it is type ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_list)}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(L_list)})})})})})(L_list)})}))},
 function(){return resolve(L_newDefine)("regexp")(1)("regexp str = _regexp (assertType 'regexp str' '*string' str)")(lazy(function(L_str){return resolve(L__regexp)(function(){return resolve(L_assertType)("regexp str", "*string", L_str)})}))},
 function(){return resolve(L_newDefine)("regexpFlags")(2)("regexpFlags str flags = _regexpFlags\n  assertType 'regexp str' '*string' str\n  assertType 'regexp flags' '*string' flags")(lazy((function () {
  var main;
  var full = function (L_str, L_flags) {
    return resolve(L__regexpFlags)(function(){return resolve(L_assertType)("regexp str", "*string", L_str)})(function(){return resolve(L_assertType)("regexp flags", "*string", L_flags)});
  };
  var partial = function(L_str) {
    var _1 = function(L_flags) {
            return full(L_str, L_flags);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_flags, more) {
    if (L_flags && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_flags);
    } else if (typeof L_flags == "undefined" || L_flags == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("jsonParse")(3)("jsonParse str failure success = _jsonParse\n  assertType 'jsonParse str' '*string' str\n  failure\n  success")(lazy((function () {
  var main;
  var full = function (L_str, L_failure, L_success) {
    return resolve(L__jsonParse)(function(){return resolve(L_assertType)("jsonParse str", "*string", L_str)})(L_failure)(L_success);
  };
  var partial = function(L_str) {
    var _1 = function(L_failure) {
            var _2 = function(L_success) {
              return full(L_str, L_failure, L_success);
            };
            _2.leisureInfo = {arg: L_failure, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_failure, L_success, more) {
    if (L_success && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_failure, L_success);
    } else if (typeof L_failure == "undefined" || L_failure == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("show")(1)("show x = _show x")(lazy(function(L_x){return resolve(L__show)(L_x)}))},
 function(){return resolve(L_newDefine)("id")(1)("id x = x")(lazy(function(L_x){return resolve(L_x)}))},
 function(){return resolve(L_newDefine)("compose")(2)("compose f g = \\x . f (g x)")(lazy(setDataType((function () {
  var main;
  var full = function (L_f, L_g) {
    return setType(function(L_x){return resolve(L_f)(function(){return resolve(L_g)(L_x)})}, 'compose');
  };
  var partial = function(L_f) {
    var _1 = function(L_g) {
            return full(L_f, L_g);
          };
          _1.leisureInfo = {arg: L_f, name: main.leisureName};
          return _1;
  };
  main = function(L_f, L_g, more) {
    if (L_g && (typeof more == "undefined" || more == null)) {
      return full(L_f, L_g);
    } else if (typeof L_g == "undefined" || L_g == null) {
      return partial(L_f);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'compose')))},
 function(){return resolve(L_newDefine)("flip")(1)("flip func = \\x y . func y x")(lazy(setDataType(function(L_func){return setType(function(L_x){return $F(arguments, function(L_y){return resolve(L_func)(L_y)(L_x)})}, 'flip')}, 'flip')))},
 function(){return resolve(L_newDefine)("withCons")(3)("withCons l nilCase cont = isCons l (l (\\h t D . cont h t) nilCase) nilCase")(lazy((function () {
  var main;
  var full = function (L_l, L_nilCase, L_cont) {
    return resolve(L_isCons)(L_l)(function(){return resolve(L_l)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_cont)(L_h)(L_t)})})}))(L_nilCase)})(L_nilCase);
  };
  var partial = function(L_l) {
    var _1 = function(L_nilCase) {
            var _2 = function(L_cont) {
              return full(L_l, L_nilCase, L_cont);
            };
            _2.leisureInfo = {arg: L_nilCase, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_l, name: main.leisureName};
          return _1;
  };
  main = function(L_l, L_nilCase, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_l, L_nilCase, L_cont);
    } else if (typeof L_nilCase == "undefined" || L_nilCase == null) {
      return partial(L_l);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("cons")(2)("cons a b = \\f . f a b")(lazy(setDataType((function () {
  var main;
  var full = function (L_a, L_b) {
    return setType(function(L_f){return resolve(L_f)(L_a)(L_b)}, 'cons');
  };
  var partial = function(L_a) {
    var _1 = function(L_b) {
            return full(L_a, L_b);
          };
          _1.leisureInfo = {arg: L_a, name: main.leisureName};
          return _1;
  };
  main = function(L_a, L_b, more) {
    if (L_b && (typeof more == "undefined" || more == null)) {
      return full(L_a, L_b);
    } else if (typeof L_b == "undefined" || L_b == null) {
      return partial(L_a);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'cons')))},
 function(){return resolve(L_newDefine)("isCons")(1)("isCons c = hasType c cons")(lazy(function(L_c){return resolve(L_hasType)(L_c)(L_cons)}))},
 function(){return resolve(L_newDefine)("isList")(1)("isList l = or (hasType l cons) (hasType l nil)")(lazy(function(L_l){return resolve(L_or)(function(){return resolve(L_hasType)(L_l)(L_cons)}, function(){return resolve(L_hasType)(L_l)(L_nil)})}))},
 function(){return resolve(L_newDefine)("assertType")(3)("assertType msg type value = assert (hasType value type) (strCat (cons msg (cons ' should be type ' (cons (getDataType type) (cons ', but its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))))) value")(lazy((function () {
  var main;
  var full = function (L_msg, L_type, L_value) {
    return resolve(L_assert)(function(){return resolve(L_hasType)(L_value)(L_type)})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(L_msg, function(){return resolve(L_cons)(" should be type ", function(){return resolve(L_cons)(function(){return resolve(L_getDataType)(L_type)}, function(){return resolve(L_cons)(", but its type is ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_value)}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_value)}, L_nil)})})})})})})})})(L_value);
  };
  var partial = function(L_msg) {
    var _1 = function(L_type) {
            var _2 = function(L_value) {
              return full(L_msg, L_type, L_value);
            };
            _2.leisureInfo = {arg: L_type, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_msg, name: main.leisureName};
          return _1;
  };
  main = function(L_msg, L_type, L_value, more) {
    if (L_value && (typeof more == "undefined" || more == null)) {
      return full(L_msg, L_type, L_value);
    } else if (typeof L_type == "undefined" || L_type == null) {
      return partial(L_msg);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("nil")(0)("nil = \\a b . b")(lazy(setDataType(setType(function(L_a){return $F(arguments, function(L_b){return resolve(L_b)})}, 'nil'), 'nil')))},
 function(){return resolve(L_newDefine)("isNil")(1)("isNil n = hasType n nil")(lazy(function(L_n){return resolve(L_hasType)(L_n)(L_nil)}))},
 function(){return resolve(L_newDefine)("head")(1)("head l = l \\h t . h")(lazy(function(L_l){return resolve(L_l)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_h)})}))}))},
 function(){return resolve(L_newDefine)("tail")(1)("tail l = l \\h t . t")(lazy(function(L_l){return resolve(L_l)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_t)})}))}))},
 function(){return resolve(L_newDefine)("last")(1)("last l = isNil (tail l)\n  head l\n  last (tail l)")(lazy(function(L_l){return resolve(L_isNil)(function(){return resolve(L_tail)(L_l)})(function(){return resolve(L_head)(L_l)})(function(){return resolve(L_last)(function(){return resolve(L_tail)(L_l)})})}))},
 function(){return resolve(L_newDefine)("removeLast")(1)("removeLast l = isNil (tail l)\n  nil\n  cons (head l) (removeLast (tail l))")(lazy(function(L_l){return resolve(L_isNil)(function(){return resolve(L_tail)(L_l)})(L_nil)(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_l)}, function(){return resolve(L_removeLast)(function(){return resolve(L_tail)(L_l)})})})}))},
 function(){return resolve(L_newDefine)("length")(1)("length list = isCons list\n  + 1 (length (tail list))\n  assert (hasType list nil) (strCat (cons \"length argument is not a proper list: \" (cons list nil))) 0")(lazy(function(L_list){return resolve(L_isCons)(L_list)(function(){return resolve(L_$o)(1)(function(){return resolve(L_length)(function(){return resolve(L_tail)(L_list)})})})(function(){return resolve(L_assert)(function(){return resolve(L_hasType)(L_list)(L_nil)})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("length argument is not a proper list: ", function(){return resolve(L_cons)(L_list, L_nil)})})})(0)})}))},
 function(){return resolve(L_newDefine)("append")(2)("append a b = isNil a\n  b\n  cons (head a) (append (tail a) b)")(lazy((function () {
  var main;
  var full = function (L_a, L_b) {
    return resolve(L_isNil)(L_a)(L_b)(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_a)}, function(){return resolve(L_append)(function(){return resolve(L_tail)(L_a)}, L_b)})});
  };
  var partial = function(L_a) {
    var _1 = function(L_b) {
            return full(L_a, L_b);
          };
          _1.leisureInfo = {arg: L_a, name: main.leisureName};
          return _1;
  };
  main = function(L_a, L_b, more) {
    if (L_b && (typeof more == "undefined" || more == null)) {
      return full(L_a, L_b);
    } else if (typeof L_b == "undefined" || L_b == null) {
      return partial(L_a);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("flatten")(1)("flatten list = isCons list\n  subflatten list nil\n  list")(lazy(function(L_list){return resolve(L_isCons)(L_list)(function(){return resolve(L_subflatten)(L_list, L_nil)})(L_list)}))},
 function(){return resolve(L_newDefine)("subflatten")(2)("subflatten list result = isNil list\n  result\n  isCons list\n    subflatten (head list) (subflatten (tail list) result)\n    cons list result")(lazy((function () {
  var main;
  var full = function (L_list, L_result) {
    return resolve(L_isNil)(L_list)(L_result)(function(){return resolve(L_isCons)(L_list)(function(){return resolve(L_subflatten)(function(){return resolve(L_head)(L_list)}, function(){return resolve(L_subflatten)(function(){return resolve(L_tail)(L_list)}, L_result)})})(function(){return resolve(L_cons)(L_list, L_result)})});
  };
  var partial = function(L_list) {
    var _1 = function(L_result) {
            return full(L_list, L_result);
          };
          _1.leisureInfo = {arg: L_list, name: main.leisureName};
          return _1;
  };
  main = function(L_list, L_result, more) {
    if (L_result && (typeof more == "undefined" || more == null)) {
      return full(L_list, L_result);
    } else if (typeof L_result == "undefined" || L_result == null) {
      return partial(L_list);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("reverse")(1)("reverse l = rev l nil")(lazy(function(L_l){return resolve(L_rev)(L_l, L_nil)}))},
 function(){return resolve(L_newDefine)("rev")(2)("rev l result = isNil l\n  result\n  rev (tail l) (cons (head l) result)")(lazy((function () {
  var main;
  var full = function (L_l, L_result) {
    return resolve(L_isNil)(L_l)(L_result)(function(){return resolve(L_rev)(function(){return resolve(L_tail)(L_l)}, function(){return resolve(L_cons)(function(){return resolve(L_head)(L_l)}, L_result)})});
  };
  var partial = function(L_l) {
    var _1 = function(L_result) {
            return full(L_l, L_result);
          };
          _1.leisureInfo = {arg: L_l, name: main.leisureName};
          return _1;
  };
  main = function(L_l, L_result, more) {
    if (L_result && (typeof more == "undefined" || more == null)) {
      return full(L_l, L_result);
    } else if (typeof L_result == "undefined" || L_result == null) {
      return partial(L_l);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("filter")(2)("filter func list = isNil list\n  nil\n  func (head list) (cons (head list)) id (filter func (tail list))")(lazy((function () {
  var main;
  var full = function (L_func, L_list) {
    return resolve(L_isNil)(L_list)(L_nil)(function(){return resolve(L_func)(function(){return resolve(L_head)(L_list)})(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_list)})})(L_id)(function(){return resolve(L_filter)(L_func, function(){return resolve(L_tail)(L_list)})})});
  };
  var partial = function(L_func) {
    var _1 = function(L_list) {
            return full(L_func, L_list);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("find")(2)("find predicate list = isNil list\n  none\n  predicate (head list) (some (head list)) (find predicate (tail list))")(lazy((function () {
  var main;
  var full = function (L_predicate, L_list) {
    return resolve(L_isNil)(L_list)(L_none)(function(){return resolve(L_predicate)(function(){return resolve(L_head)(L_list)})(function(){return resolve(L_some)(function(){return resolve(L_head)(L_list)})})(function(){return resolve(L_find)(L_predicate, function(){return resolve(L_tail)(L_list)})})});
  };
  var partial = function(L_predicate) {
    var _1 = function(L_list) {
            return full(L_predicate, L_list);
          };
          _1.leisureInfo = {arg: L_predicate, name: main.leisureName};
          return _1;
  };
  main = function(L_predicate, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_predicate, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_predicate);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("contains")(2)("contains list item = find (\\el . eq el item) list (\\x . true) false")(lazy((function () {
  var main;
  var full = function (L_list, L_item) {
    return resolve(L_find)(lazy(function(L_el){return resolve(L_eq)(L_el)(L_item)}), L_list)(lazy(function(L_x){return resolve(L_true)}))(L_false);
  };
  var partial = function(L_list) {
    var _1 = function(L_item) {
            return full(L_list, L_item);
          };
          _1.leisureInfo = {arg: L_list, name: main.leisureName};
          return _1;
  };
  main = function(L_list, L_item, more) {
    if (L_item && (typeof more == "undefined" || more == null)) {
      return full(L_list, L_item);
    } else if (typeof L_item == "undefined" || L_item == null) {
      return partial(L_list);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("map")(2)("map func l = isNil l\n  nil\n  cons (func (head l)) (map func (tail l))")(lazy((function () {
  var main;
  var full = function (L_func, L_l) {
    return resolve(L_isNil)(L_l)(L_nil)(function(){return resolve(L_cons)(function(){return resolve(L_func)(function(){return resolve(L_head)(L_l)})}, function(){return resolve(L_map)(L_func, function(){return resolve(L_tail)(L_l)})})});
  };
  var partial = function(L_func) {
    var _1 = function(L_l) {
            return full(L_func, L_l);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_l, more) {
    if (L_l && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_l);
    } else if (typeof L_l == "undefined" || L_l == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("mapSave")(2)("mapSave func l = isNil l\n  nil\n  \\\\\n    newH = func (head l)\n    newT = mapSave func (tail l)\n    .\n    and (eq newH (head l)) (eq newT (tail l))\n      l\n      cons newH newT")(lazy((function () {
  var main;
  var full = function (L_func, L_l) {
    return resolve(L_isNil)(L_l)(L_nil)(function(){return(function(){
  var L_newH_0, L_newT_1;
  L_newH_0 = function(){return resolve(L_func)(function(){return resolve(L_head)(L_l)})};
  L_newT_1 = function(){return resolve(L_mapSave)(L_func, function(){return resolve(L_tail)(L_l)})};

  return resolve(L_and)(function(){return resolve(L_eq)(L_newH_0)(function(){return resolve(L_head)(L_l)})}, function(){return resolve(L_eq)(L_newT_1)(function(){return resolve(L_tail)(L_l)})})(L_l)(function(){return resolve(L_cons)(L_newH_0, L_newT_1)})})();});
  };
  var partial = function(L_func) {
    var _1 = function(L_l) {
            return full(L_func, L_l);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_l, more) {
    if (L_l && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_l);
    } else if (typeof L_l == "undefined" || L_l == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("foldl")(3)("foldl func initialValue l = l (\\h t D . foldl func (func initialValue h) t) initialValue")(lazy((function () {
  var main;
  var full = function (L_func, L_initialValue, L_l) {
    return resolve(L_l)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_foldl)(L_func, function(){return resolve(L_func)(L_initialValue)(L_h)}, L_t)})})}))(L_initialValue);
  };
  var partial = function(L_func) {
    var _1 = function(L_initialValue) {
            var _2 = function(L_l) {
              return full(L_func, L_initialValue, L_l);
            };
            _2.leisureInfo = {arg: L_initialValue, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_initialValue, L_l, more) {
    if (L_l && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_initialValue, L_l);
    } else if (typeof L_initialValue == "undefined" || L_initialValue == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("foldl1")(2)("foldl1 func l = l \\h t . foldl func h t")(lazy((function () {
  var main;
  var full = function (L_func, L_l) {
    return resolve(L_l)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_foldl)(L_func, L_h, L_t)})}));
  };
  var partial = function(L_func) {
    var _1 = function(L_l) {
            return full(L_func, L_l);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_l, more) {
    if (L_l && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_l);
    } else if (typeof L_l == "undefined" || L_l == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("foldr")(3)("foldr func initialValue list = list\n  \\h t D . func h (foldr func initialValue t)\n  initialValue")(lazy((function () {
  var main;
  var full = function (L_func, L_initialValue, L_list) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_func)(L_h)(function(){return resolve(L_foldr)(L_func, L_initialValue, L_t)})})})}))(L_initialValue);
  };
  var partial = function(L_func) {
    var _1 = function(L_initialValue) {
            var _2 = function(L_list) {
              return full(L_func, L_initialValue, L_list);
            };
            _2.leisureInfo = {arg: L_initialValue, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_initialValue, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_initialValue, L_list);
    } else if (typeof L_initialValue == "undefined" || L_initialValue == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("foldr1")(2)("foldr1 func list = list \\h t . isNil t\n  h\n  func h (foldr1 func t)")(lazy((function () {
  var main;
  var full = function (L_func, L_list) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_isNil)(L_t)(L_h)(function(){return resolve(L_func)(L_h)(function(){return resolve(L_foldr1)(L_func, L_t)})})})}));
  };
  var partial = function(L_func) {
    var _1 = function(L_list) {
            return full(L_func, L_list);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("intersperse")(2)("intersperse list element = list (\\h t D .\n  isNil t\n    list\n    cons h (cons element (intersperse t element))) nil")(lazy((function () {
  var main;
  var full = function (L_list, L_element) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_isNil)(L_t)(L_list)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(L_element, function(){return resolve(L_intersperse)(L_t, L_element)})})})})})}))(L_nil);
  };
  var partial = function(L_list) {
    var _1 = function(L_element) {
            return full(L_list, L_element);
          };
          _1.leisureInfo = {arg: L_list, name: main.leisureName};
          return _1;
  };
  main = function(L_list, L_element, more) {
    if (L_element && (typeof more == "undefined" || more == null)) {
      return full(L_list, L_element);
    } else if (typeof L_element == "undefined" || L_element == null) {
      return partial(L_list);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("join")(2)("join list el = strCat (intersperse list el)")(lazy((function () {
  var main;
  var full = function (L_list, L_el) {
    return resolve(L_strCat)(function(){return resolve(L_intersperse)(L_list, L_el)});
  };
  var partial = function(L_list) {
    var _1 = function(L_el) {
            return full(L_list, L_el);
          };
          _1.leisureInfo = {arg: L_list, name: main.leisureName};
          return _1;
  };
  main = function(L_list, L_el, more) {
    if (L_el && (typeof more == "undefined" || more == null)) {
      return full(L_list, L_el);
    } else if (typeof L_el == "undefined" || L_el == null) {
      return partial(L_list);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("findIndex")(2)("findIndex func list = idx list func 0")(lazy((function () {
  var main;
  var full = function (L_func, L_list) {
    return resolve(L_idx)(L_list, L_func, 0);
  };
  var partial = function(L_func) {
    var _1 = function(L_list) {
            return full(L_func, L_list);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("idx")(3)("idx list func pos = list\n  \\h t D . func h\n    pos\n    idx t func (+ 1 pos)\n  -1")(lazy((function () {
  var main;
  var full = function (L_list, L_func, L_pos) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_func)(L_h)(L_pos)(function(){return resolve(L_idx)(L_t, L_func, function(){return resolve(L_$o)(1)(L_pos)})})})})}))(-1);
  };
  var partial = function(L_list) {
    var _1 = function(L_func) {
            var _2 = function(L_pos) {
              return full(L_list, L_func, L_pos);
            };
            _2.leisureInfo = {arg: L_func, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_list, name: main.leisureName};
          return _1;
  };
  main = function(L_list, L_func, L_pos, more) {
    if (L_pos && (typeof more == "undefined" || more == null)) {
      return full(L_list, L_func, L_pos);
    } else if (typeof L_func == "undefined" || L_func == null) {
      return partial(L_list);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("index")(2)("index list el = find (\\item . == el item) list")(lazy((function () {
  var main;
  var full = function (L_list, L_el) {
    return resolve(L_find)(lazy(function(L_item){return resolve(L_$p$p)(L_el)(L_item)}), L_list);
  };
  var partial = function(L_list) {
    var _1 = function(L_el) {
            return full(L_list, L_el);
          };
          _1.leisureInfo = {arg: L_list, name: main.leisureName};
          return _1;
  };
  main = function(L_list, L_el, more) {
    if (L_el && (typeof more == "undefined" || more == null)) {
      return full(L_list, L_el);
    } else if (typeof L_el == "undefined" || L_el == null) {
      return partial(L_list);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("increasing")(1)("increasing x = cons x (increasing (+ x 1))")(lazy(function(L_x){return resolve(L_cons)(L_x, function(){return resolve(L_increasing)(function(){return resolve(L_$o)(L_x)(1)})})}))},
 function(){return resolve(L_newDefine)("wholes")(0)("wholes = increasing 0")(function(){return resolve(L_increasing)(0)})},
 function(){return resolve(L_newDefine)("naturals")(0)("naturals = tail wholes")(function(){return resolve(L_tail)(L_wholes)})},
 function(){return resolve(L_newDefine)("zip")(2)("zip a b = isNil a\n  nil\n  isNil b\n    nil\n    cons (cons (head a) (head b)) (zip (tail a) (tail b))")(lazy((function () {
  var main;
  var full = function (L_a, L_b) {
    return resolve(L_isNil)(L_a)(L_nil)(function(){return resolve(L_isNil)(L_b)(L_nil)(function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_a)}, function(){return resolve(L_head)(L_b)})}, function(){return resolve(L_zip)(function(){return resolve(L_tail)(L_a)}, function(){return resolve(L_tail)(L_b)})})})});
  };
  var partial = function(L_a) {
    var _1 = function(L_b) {
            return full(L_a, L_b);
          };
          _1.leisureInfo = {arg: L_a, name: main.leisureName};
          return _1;
  };
  main = function(L_a, L_b, more) {
    if (L_b && (typeof more == "undefined" || more == null)) {
      return full(L_a, L_b);
    } else if (typeof L_b == "undefined" || L_b == null) {
      return partial(L_a);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("assertAlist")(3)("assertAlist msg value result = assert (isAlist value) (strCat (cons msg (cons ' should be a association list, but it is not; its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))) result")(lazy((function () {
  var main;
  var full = function (L_msg, L_value, L_result) {
    return resolve(L_assert)(function(){return resolve(L_isAlist)(L_value)})(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(L_msg, function(){return resolve(L_cons)(" should be a association list, but it is not; its type is ", function(){return resolve(L_cons)(function(){return resolve(L_getType)(L_value)}, function(){return resolve(L_cons)(": ", function(){return resolve(L_cons)(function(){return resolve(L_show)(L_value)}, L_nil)})})})})})})(L_result);
  };
  var partial = function(L_msg) {
    var _1 = function(L_value) {
            var _2 = function(L_result) {
              return full(L_msg, L_value, L_result);
            };
            _2.leisureInfo = {arg: L_value, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_msg, name: main.leisureName};
          return _1;
  };
  main = function(L_msg, L_value, L_result, more) {
    if (L_result && (typeof more == "undefined" || more == null)) {
      return full(L_msg, L_value, L_result);
    } else if (typeof L_value == "undefined" || L_value == null) {
      return partial(L_msg);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("acons")(3)("acons k v alist = assertAlist \"acons alist\" alist (\\@ type cons . \\f . \\@ assoc true . f (cons k v) alist)")(lazy((function () {
  var main;
  var full = function (L_k, L_v, L_alist) {
    return resolve(L_assertAlist)("acons alist", L_alist, lazy(setType(setLambdaProperties(function(L_f){return resolve(L_f)(function(){return resolve(L_cons)(L_k, L_v)})(L_alist)}, {"assoc":"true"}), 'cons')));
  };
  var partial = function(L_k) {
    var _1 = function(L_v) {
            var _2 = function(L_alist) {
              return full(L_k, L_v, L_alist);
            };
            _2.leisureInfo = {arg: L_v, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_k, name: main.leisureName};
          return _1;
  };
  main = function(L_k, L_v, L_alist, more) {
    if (L_alist && (typeof more == "undefined" || more == null)) {
      return full(L_k, L_v, L_alist);
    } else if (typeof L_v == "undefined" || L_v == null) {
      return partial(L_k);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("assoc")(2)("assoc k alist  = find (\\el . eq k (head el)) alist (\\cell . cell \\head tail . some tail) none")(lazy((function () {
  var main;
  var full = function (L_k, L_alist) {
    return resolve(L_find)(lazy(function(L_el){return resolve(L_eq)(L_k)(function(){return resolve(L_head)(L_el)})}), L_alist)(lazy(function(L_cell){return resolve(L_cell)(lazy(function(L_head){return $F(arguments, function(L_tail){return resolve(L_some)(L_tail)})}))}))(L_none);
  };
  var partial = function(L_k) {
    var _1 = function(L_alist) {
            return full(L_k, L_alist);
          };
          _1.leisureInfo = {arg: L_k, name: main.leisureName};
          return _1;
  };
  main = function(L_k, L_alist, more) {
    if (L_alist && (typeof more == "undefined" || more == null)) {
      return full(L_k, L_alist);
    } else if (typeof L_alist == "undefined" || L_alist == null) {
      return partial(L_k);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("rassoc")(2)("rassoc v alist = find (\\el . eq v (tail el)) alist (\\cell . cell \\head tail . some head) none")(lazy((function () {
  var main;
  var full = function (L_v, L_alist) {
    return resolve(L_find)(lazy(function(L_el){return resolve(L_eq)(L_v)(function(){return resolve(L_tail)(L_el)})}), L_alist)(lazy(function(L_cell){return resolve(L_cell)(lazy(function(L_head){return $F(arguments, function(L_tail){return resolve(L_some)(L_head)})}))}))(L_none);
  };
  var partial = function(L_v) {
    var _1 = function(L_alist) {
            return full(L_v, L_alist);
          };
          _1.leisureInfo = {arg: L_v, name: main.leisureName};
          return _1;
  };
  main = function(L_v, L_alist, more) {
    if (L_alist && (typeof more == "undefined" || more == null)) {
      return full(L_v, L_alist);
    } else if (typeof L_alist == "undefined" || L_alist == null) {
      return partial(L_v);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("isAlist")(1)("isAlist obj = or (isNil obj) (hasProperty obj 'assoc')")(lazy(function(L_obj){return resolve(L_or)(function(){return resolve(L_isNil)(L_obj)}, function(){return resolve(L_hasProperty)(L_obj, "assoc")})}))},
 function(){return resolve(L_newDefine)("aconsPair")(2)("aconsPair keyValue list = \\@ type cons . \\f . \\@ assoc true . f keyValue list")(lazy((function () {
  var main;
  var full = function (L_keyValue, L_list) {
    return setType(setLambdaProperties(function(L_f){return resolve(L_f)(L_keyValue)(L_list)}, {"assoc":"true"}), 'cons');
  };
  var partial = function(L_keyValue) {
    var _1 = function(L_list) {
            return full(L_keyValue, L_list);
          };
          _1.leisureInfo = {arg: L_keyValue, name: main.leisureName};
          return _1;
  };
  main = function(L_keyValue, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_keyValue, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_keyValue);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("appendAlist")(2)("appendAlist a b = isNil a\n  b\n  aconsPair (head a) (appendAlist (tail a) b)")(lazy((function () {
  var main;
  var full = function (L_a, L_b) {
    return resolve(L_isNil)(L_a)(L_b)(function(){return resolve(L_aconsPair)(function(){return resolve(L_head)(L_a)}, function(){return resolve(L_appendAlist)(function(){return resolve(L_tail)(L_a)}, L_b)})});
  };
  var partial = function(L_a) {
    var _1 = function(L_b) {
            return full(L_a, L_b);
          };
          _1.leisureInfo = {arg: L_a, name: main.leisureName};
          return _1;
  };
  main = function(L_a, L_b, more) {
    if (L_b && (typeof more == "undefined" || more == null)) {
      return full(L_a, L_b);
    } else if (typeof L_b == "undefined" || L_b == null) {
      return partial(L_a);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("keys")(1)("keys list = map (\\l . head l) list")(lazy(function(L_list){return resolve(L_map)(lazy(function(L_l){return resolve(L_head)(L_l)}), L_list)}))},
 function(){return resolve(L_newDefine)("getProperty")(2)("getProperty func prop = assoc prop (getProperties func)")(lazy((function () {
  var main;
  var full = function (L_func, L_prop) {
    return resolve(L_assoc)(L_prop, function(){return resolve(L_getProperties)(L_func)});
  };
  var partial = function(L_func) {
    var _1 = function(L_prop) {
            return full(L_func, L_prop);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_prop, more) {
    if (L_prop && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_prop);
    } else if (typeof L_prop == "undefined" || L_prop == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("hasProperty")(2)("hasProperty func prop = getProperty func prop\n  \\_ . true\n  false")(lazy((function () {
  var main;
  var full = function (L_func, L_prop) {
    return resolve(L_getProperty)(L_func, L_prop)(lazy(function(L__){return resolve(L_true)}))(L_false);
  };
  var partial = function(L_func) {
    var _1 = function(L_prop) {
            return full(L_func, L_prop);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_prop, more) {
    if (L_prop && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_prop);
    } else if (typeof L_prop == "undefined" || L_prop == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("quicksort")(2)("quicksort less list = (qs less list) nil")(lazy((function () {
  var main;
  var full = function (L_less, L_list) {
    return resolve(L_qs)(L_less, L_list)(L_nil);
  };
  var partial = function(L_less) {
    var _1 = function(L_list) {
            return full(L_less, L_list);
          };
          _1.leisureInfo = {arg: L_less, name: main.leisureName};
          return _1;
  };
  main = function(L_less, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_less, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_less);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("qs")(2)("qs sortedFunc list = list\n  \\h t D . \\\\\n    greater = filter (sortedFunc h) t\n    lesser = filter (compose not (sortedFunc h)) t\n    .\n    \\rest . (qs sortedFunc lesser) (cons h ((qs sortedFunc greater) rest))\n  id")(lazy((function () {
  var main;
  var full = function (L_sortedFunc, L_list) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return (function(){
  var L_greater_0, L_lesser_1;
  L_greater_0 = function(){return resolve(L_filter)(function(){return resolve(L_sortedFunc)(L_h)}, L_t)};
  L_lesser_1 = function(){return resolve(L_filter)(function(){return resolve(L_compose)(L_not, function(){return resolve(L_sortedFunc)(L_h)})}, L_t)};

  return function(L_rest){return resolve(L_qs)(L_sortedFunc, L_lesser_1)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_qs)(L_sortedFunc, L_greater_0)(L_rest)})})}})()})})}))(L_id);
  };
  var partial = function(L_sortedFunc) {
    var _1 = function(L_list) {
            return full(L_sortedFunc, L_list);
          };
          _1.leisureInfo = {arg: L_sortedFunc, name: main.leisureName};
          return _1;
  };
  main = function(L_sortedFunc, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_sortedFunc, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_sortedFunc);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("insertSorted")(3)("insertSorted sortFunc item list = list\n  \\h t D . sortFunc item h (cons item list) (cons h (insertSorted sortFunc item t))\n  cons item nil")(lazy((function () {
  var main;
  var full = function (L_sortFunc, L_item, L_list) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_sortFunc)(L_item)(L_h)(function(){return resolve(L_cons)(L_item, L_list)})(function(){return resolve(L_cons)(L_h, function(){return resolve(L_insertSorted)(L_sortFunc, L_item, L_t)})})})})}))(function(){return resolve(L_cons)(L_item, L_nil)});
  };
  var partial = function(L_sortFunc) {
    var _1 = function(L_item) {
            var _2 = function(L_list) {
              return full(L_sortFunc, L_item, L_list);
            };
            _2.leisureInfo = {arg: L_item, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_sortFunc, name: main.leisureName};
          return _1;
  };
  main = function(L_sortFunc, L_item, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_sortFunc, L_item, L_list);
    } else if (typeof L_item == "undefined" || L_item == null) {
      return partial(L_sortFunc);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("err")(1)("err msg = \\f . f msg")(lazy(setDataType(function(L_msg){return setType(function(L_f){return resolve(L_f)(L_msg)}, 'err')}, 'err')))},
 function(){return resolve(L_newDefine)("errMsg")(1)("errMsg err = err \\m . m")(lazy(function(L_err){return resolve(L_err)(lazy(function(L_m){return resolve(L_m)}))}))},
 function(){return resolve(L_newDefine)("isErr")(1)("isErr thing = hasType thing err")(lazy(function(L_thing){return resolve(L_hasType)(L_thing)(L_err)}))},
 function(){return resolve(L_newDefine)("ifNotErr")(2)("ifNotErr thing cont = hasType thing parseErr thing (cont thing)")(lazy((function () {
  var main;
  var full = function (L_thing, L_cont) {
    return resolve(L_hasType)(L_thing)(L_parseErr)(L_thing)(function(){return resolve(L_cont)(L_thing)});
  };
  var partial = function(L_thing) {
    var _1 = function(L_cont) {
            return full(L_thing, L_cont);
          };
          _1.leisureInfo = {arg: L_thing, name: main.leisureName};
          return _1;
  };
  main = function(L_thing, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_thing, L_cont);
    } else if (typeof L_cont == "undefined" || L_cont == null) {
      return partial(L_thing);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_setNameSpace)("parser")},
 function(){return resolve(L_newDefine)("token")(2)("token txt pos = \\f . f txt pos")(lazy(setDataType((function () {
  var main;
  var full = function (L_txt, L_pos) {
    return setType(function(L_f){return resolve(L_f)(L_txt)(L_pos)}, 'token');
  };
  var partial = function(L_txt) {
    var _1 = function(L_pos) {
            return full(L_txt, L_pos);
          };
          _1.leisureInfo = {arg: L_txt, name: main.leisureName};
          return _1;
  };
  main = function(L_txt, L_pos, more) {
    if (L_pos && (typeof more == "undefined" || more == null)) {
      return full(L_txt, L_pos);
    } else if (typeof L_pos == "undefined" || L_pos == null) {
      return partial(L_txt);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'token')))},
 function(){return resolve(L_newDefine)("tokenString")(1)("tokenString tok = tok \\t p . t")(lazy(function(L_tok){return resolve(L_tok)(lazy(function(L_t){return $F(arguments, function(L_p){return resolve(L_t)})}))}))},
 function(){return resolve(L_newDefine)("tokenFilepos")(1)("tokenFilepos tok = tok \\t p . p")(lazy(function(L_tok){return resolve(L_tok)(lazy(function(L_t){return $F(arguments, function(L_p){return resolve(L_p)})}))}))},
 function(){return resolve(L_newDefine)("tokenPos")(1)("tokenPos tok = tok \\t p . isFilepos p\n  fileposOffset p\n  p")(lazy(function(L_tok){return resolve(L_tok)(lazy(function(L_t){return $F(arguments, function(L_p){return resolve(L_isFilepos)(L_p)(function(){return resolve(L_fileposOffset)(L_p)})(L_p)})}))}))},
 function(){return resolve(L_newDefine)("isToken")(1)("isToken t = hasType t token")(lazy(function(L_t){return resolve(L_hasType)(L_t)(L_token)}))},
 function(){return resolve(L_newDefine)("emptyLineStarts")(0)("emptyLineStarts = cons 'EMPTYFILE.lsr' (cons 1 nil)")(function(){return resolve(L_cons)("EMPTYFILE.lsr", function(){return resolve(L_cons)(1, L_nil)})})},
 function(){return resolve(L_newDefine)("filepos")(3)("filepos file line offset = \\f . f file line offset")(lazy(setDataType((function () {
  var main;
  var full = function (L_file, L_line, L_offset) {
    return setType(function(L_f){return resolve(L_f)(L_file)(L_line)(L_offset)}, 'filepos');
  };
  var partial = function(L_file) {
    var _1 = function(L_line) {
            var _2 = function(L_offset) {
              return full(L_file, L_line, L_offset);
            };
            _2.leisureInfo = {arg: L_line, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_file, name: main.leisureName};
          return _1;
  };
  main = function(L_file, L_line, L_offset, more) {
    if (L_offset && (typeof more == "undefined" || more == null)) {
      return full(L_file, L_line, L_offset);
    } else if (typeof L_line == "undefined" || L_line == null) {
      return partial(L_file);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'filepos')))},
 function(){return resolve(L_newDefine)("fileposFile")(1)("fileposFile p = p \\file line offset . file")(lazy(function(L_p){return resolve(L_p)(lazy(function(L_file){return $F(arguments, function(L_line){return $F(arguments, function(L_offset){return resolve(L_file)})})}))}))},
 function(){return resolve(L_newDefine)("fileposLine")(1)("fileposLine p = p \\file line offset . line")(lazy(function(L_p){return resolve(L_p)(lazy(function(L_file){return $F(arguments, function(L_line){return $F(arguments, function(L_offset){return resolve(L_line)})})}))}))},
 function(){return resolve(L_newDefine)("fileposOffset")(1)("fileposOffset p = p \\file line offset . offset")(lazy(function(L_p){return resolve(L_p)(lazy(function(L_file){return $F(arguments, function(L_line){return $F(arguments, function(L_offset){return resolve(L_offset)})})}))}))},
 function(){return resolve(L_newDefine)("isFilepos")(1)("isFilepos p = hasType p filepos")(lazy(function(L_p){return resolve(L_hasType)(L_p)(L_filepos)}))},
 function(){return resolve(L_newDefine)("addFilepos")(2)("addFilepos pos change = isFilepos pos pos emptyFilePos\n  \\file line offset . filepos file line (+ offset change)")(lazy((function () {
  var main;
  var full = function (L_pos, L_change) {
    return resolve(L_isFilepos)(L_pos)(L_pos)(L_emptyFilePos)(lazy(function(L_file){return $F(arguments, function(L_line){return $F(arguments, function(L_offset){return resolve(L_filepos)(L_file, L_line, function(){return resolve(L_$o)(L_offset)(L_change)})})})}));
  };
  var partial = function(L_pos) {
    var _1 = function(L_change) {
            return full(L_pos, L_change);
          };
          _1.leisureInfo = {arg: L_pos, name: main.leisureName};
          return _1;
  };
  main = function(L_pos, L_change, more) {
    if (L_change && (typeof more == "undefined" || more == null)) {
      return full(L_pos, L_change);
    } else if (typeof L_change == "undefined" || L_change == null) {
      return partial(L_pos);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("emptyFilePos")(0)("emptyFilePos = filepos 'NOTHING.lsr' 0 0")(function(){return resolve(L_filepos)("NOTHING.lsr", 0, 0)})},
 function(){return resolve(L_newDefine)("isEmptyPos")(1)("isEmptyPos pos = and (isFilepos pos) (and (eq 0 (fileposLine pos)) (eq 0 (fileposOffset pos)))")(lazy(function(L_pos){return resolve(L_and)(function(){return resolve(L_isFilepos)(L_pos)}, function(){return resolve(L_and)(function(){return resolve(L_eq)(0)(function(){return resolve(L_fileposLine)(L_pos)})}, function(){return resolve(L_eq)(0)(function(){return resolve(L_fileposOffset)(L_pos)})})})}))},
 function(){return resolve(L_newDefine)("emptyFor")(1)("emptyFor thing = filepos (fileposFile (position thing)) 0 0")(lazy(function(L_thing){return resolve(L_filepos)(function(){return resolve(L_fileposFile)(function(){return resolve(L_position)(L_thing)})}, 0, 0)}))},
 function(){return resolve(L_newDefine)("startFilePos")(0)("startFilePos = emptyFilePos")(L_emptyFilePos)},
 function(){return resolve(L_newDefine)("filePosFor")(2)("filePosFor lineStarts offset = countFilePos (head (tail lineStarts)) 0 (tail (tail lineStarts)) offset\n  \\line offset . filepos (head lineStarts) line offset")(lazy((function () {
  var main;
  var full = function (L_lineStarts, L_offset) {
    return resolve(L_countFilePos)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_lineStarts)})}, 0, function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_lineStarts)})}, L_offset)(lazy(function(L_line){return $F(arguments, function(L_offset){return resolve(L_filepos)(function(){return resolve(L_head)(L_lineStarts)}, L_line, L_offset)})}));
  };
  var partial = function(L_lineStarts) {
    var _1 = function(L_offset) {
            return full(L_lineStarts, L_offset);
          };
          _1.leisureInfo = {arg: L_lineStarts, name: main.leisureName};
          return _1;
  };
  main = function(L_lineStarts, L_offset, more) {
    if (L_offset && (typeof more == "undefined" || more == null)) {
      return full(L_lineStarts, L_offset);
    } else if (typeof L_offset == "undefined" || L_offset == null) {
      return partial(L_lineStarts);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("countFilePos")(4)("countFilePos line lineOffset starts offset = or (isNil starts) (> (head starts) offset)\n  \\f . f line (- offset lineOffset)\n  countFilePos (+ line 1) (head starts) (tail starts) offset")(lazy((function () {
  var main;
  var full = function (L_line, L_lineOffset, L_starts, L_offset) {
    return resolve(L_or)(function(){return resolve(L_isNil)(L_starts)}, function(){return resolve(L_$z)(function(){return resolve(L_head)(L_starts)})(L_offset)})(lazy(function(L_f){return resolve(L_f)(L_line)(function(){return resolve(L_$_)(L_offset)(L_lineOffset)})}))(function(){return resolve(L_countFilePos)(function(){return resolve(L_$o)(L_line)(1)}, function(){return resolve(L_head)(L_starts)}, function(){return resolve(L_tail)(L_starts)}, L_offset)});
  };
  var partial = function(L_line) {
    var _1 = function(L_lineOffset) {
            var _2 = function(L_starts) {
              var _3 = function(L_offset) {
                return full(L_line, L_lineOffset, L_starts, L_offset);
              };
              _3.leisureInfo = {arg: L_starts, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_lineOffset, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_line, name: main.leisureName};
          return _1;
  };
  main = function(L_line, L_lineOffset, L_starts, L_offset, more) {
    if (L_offset && (typeof more == "undefined" || more == null)) {
      return full(L_line, L_lineOffset, L_starts, L_offset);
    } else if (typeof L_lineOffset == "undefined" || L_lineOffset == null) {
      return partial(L_line);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("fileposList")(1)("fileposList pos = pos \\file line offset . cons line (cons offset nil)")(lazy(function(L_pos){return resolve(L_pos)(lazy(function(L_file){return $F(arguments, function(L_line){return $F(arguments, function(L_offset){return resolve(L_cons)(L_line, function(){return resolve(L_cons)(L_offset, L_nil)})})})}))}))},
 function(){return resolve(L_newDefine)("parens")(3)("parens start end content = \\f . f start end content")(lazy(setDataType((function () {
  var main;
  var full = function (L_start, L_end, L_content) {
    return setType(function(L_f){return resolve(L_f)(L_start)(L_end)(L_content)}, 'parens');
  };
  var partial = function(L_start) {
    var _1 = function(L_end) {
            var _2 = function(L_content) {
              return full(L_start, L_end, L_content);
            };
            _2.leisureInfo = {arg: L_end, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_end, L_content, more) {
    if (L_content && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_end, L_content);
    } else if (typeof L_end == "undefined" || L_end == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'parens')))},
 function(){return resolve(L_newDefine)("parensStart")(1)("parensStart p = p \\s e c . s")(lazy(function(L_p){return resolve(L_p)(lazy(function(L_s){return $F(arguments, function(L_e){return $F(arguments, function(L_c){return resolve(L_s)})})}))}))},
 function(){return resolve(L_newDefine)("parensEnd")(1)("parensEnd p = p \\s e c . e")(lazy(function(L_p){return resolve(L_p)(lazy(function(L_s){return $F(arguments, function(L_e){return $F(arguments, function(L_c){return resolve(L_e)})})}))}))},
 function(){return resolve(L_newDefine)("parensContent")(1)("parensContent p = p \\s e c . c")(lazy(function(L_p){return resolve(L_p)(lazy(function(L_s){return $F(arguments, function(L_e){return $F(arguments, function(L_c){return resolve(L_c)})})}))}))},
 function(){return resolve(L_newDefine)("isParens")(1)("isParens p = hasType p parens")(lazy(function(L_p){return resolve(L_hasType)(L_p)(L_parens)}))},
 function(){return resolve(L_newDefine)("makeParens")(3)("makeParens start end content =\n  and (isCons content) (isNil (tail content))\n    makeParens start end (head content)\n    or (isToken content) (isParens content)\n      content\n      parens start end content")(lazy((function () {
  var main;
  var full = function (L_start, L_end, L_content) {
    return resolve(L_and)(function(){return resolve(L_isCons)(L_content)}, function(){return resolve(L_isNil)(function(){return resolve(L_tail)(L_content)})})(function(){return resolve(L_makeParens)(L_start, L_end, function(){return resolve(L_head)(L_content)})})(function(){return resolve(L_or)(function(){return resolve(L_isToken)(L_content)}, function(){return resolve(L_isParens)(L_content)})(L_content)(function(){return resolve(L_parens)(L_start, L_end, L_content)})});
  };
  var partial = function(L_start) {
    var _1 = function(L_end) {
            var _2 = function(L_content) {
              return full(L_start, L_end, L_content);
            };
            _2.leisureInfo = {arg: L_end, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_end, L_content, more) {
    if (L_content && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_end, L_content);
    } else if (typeof L_end == "undefined" || L_end == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parensFromToks")(3)("parensFromToks left right content = \\\\\n  start = tokenFilepos left\n  end = addFilepos (tokenFilepos right) (strLen (tokenString right))\n  .\n  parens start end content")(lazy((function () {
  var main;
  var full = function (L_left, L_right, L_content) {
    return (function(){
  var L_start_0, L_end_1;
  L_start_0 = function(){return resolve(L_tokenFilepos)(L_left)};
  L_end_1 = function(){return resolve(L_addFilepos)(function(){return resolve(L_tokenFilepos)(L_right)}, function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_right)})})};

  return resolve(L_parens)(L_start_0, L_end_1, L_content)})();
  };
  var partial = function(L_left) {
    var _1 = function(L_right) {
            var _2 = function(L_content) {
              return full(L_left, L_right, L_content);
            };
            _2.leisureInfo = {arg: L_right, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_left, name: main.leisureName};
          return _1;
  };
  main = function(L_left, L_right, L_content, more) {
    if (L_content && (typeof more == "undefined" || more == null)) {
      return full(L_left, L_right, L_content);
    } else if (typeof L_right == "undefined" || L_right == null) {
      return partial(L_left);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("stripParens")(1)("stripParens p = isParens p (parensContent p) p")(lazy(function(L_p){return resolve(L_isParens)(L_p)(function(){return resolve(L_parensContent)(L_p)})(L_p)}))},
 function(){return resolve(L_newDefine)("parseErr")(2)("parseErr msg1 msg2 = \\f . f (strCat (cons msg1 (cons msg2 nil)))")(lazy(setDataType((function () {
  var main;
  var full = function (L_msg1, L_msg2) {
    return setType(function(L_f){return resolve(L_f)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(L_msg1, function(){return resolve(L_cons)(L_msg2, L_nil)})})})}, 'parseErr');
  };
  var partial = function(L_msg1) {
    var _1 = function(L_msg2) {
            return full(L_msg1, L_msg2);
          };
          _1.leisureInfo = {arg: L_msg1, name: main.leisureName};
          return _1;
  };
  main = function(L_msg1, L_msg2, more) {
    if (L_msg2 && (typeof more == "undefined" || more == null)) {
      return full(L_msg1, L_msg2);
    } else if (typeof L_msg2 == "undefined" || L_msg2 == null) {
      return partial(L_msg1);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'parseErr')))},
 function(){return resolve(L_newDefine)("parseErrMsg")(1)("parseErrMsg err = err \\m . m")(lazy(function(L_err){return resolve(L_err)(lazy(function(L_m){return resolve(L_m)}))}))},
 function(){return resolve(L_newDefine)("isParseErr")(1)("isParseErr thing = hasType thing parseErr")(lazy(function(L_thing){return resolve(L_hasType)(L_thing)(L_parseErr)}))},
 function(){return resolve(L_newDefine)("emptyToken")(0)("emptyToken = regexp '^\\\\r?\\\\n[ \\\\i]*(#|$)'")(function(){return resolve(L_regexp)("^\\r?\\n[ \\i]*(#|$)")})},
 function(){return resolve(L_newDefine)("makeTokens")(3)("makeTokens lineStarts strings start = strings (\\h t D . makeMoreTokens lineStarts h t start) nil")(lazy((function () {
  var main;
  var full = function (L_lineStarts, L_strings, L_start) {
    return resolve(L_strings)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_makeMoreTokens)(L_lineStarts, L_h, L_t, L_start)})})}))(L_nil);
  };
  var partial = function(L_lineStarts) {
    var _1 = function(L_strings) {
            var _2 = function(L_start) {
              return full(L_lineStarts, L_strings, L_start);
            };
            _2.leisureInfo = {arg: L_strings, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_lineStarts, name: main.leisureName};
          return _1;
  };
  main = function(L_lineStarts, L_strings, L_start, more) {
    if (L_start && (typeof more == "undefined" || more == null)) {
      return full(L_lineStarts, L_strings, L_start);
    } else if (typeof L_strings == "undefined" || L_strings == null) {
      return partial(L_lineStarts);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("makeMoreTokens")(4)("makeMoreTokens lineStarts h t start = \\\\\n  next = makeTokens lineStarts t (+ start (strLen h))\n  .\n  and (strMatches h emptyToken) (or (isNil t) (or (strStartsWith (head t) '\\n') (strStartsWith (head t) '\\r\\n')))\n    makeTokens lineStarts t (+ start (strLen h))\n    or (strStartsWith h ' ') (strStartsWith h '#')\n      next\n      and (or (strStartsWith h '\\n') (strStartsWith h '\\r\\n')) (strStartsWith (head t) '#')\n        makeTokens lineStarts (tail t) (+ start (+ (strLen h) (strLen (head t))))\n        #cons (token h start) next\n        cons (makeTokenAt lineStarts h start) next")(lazy((function () {
  var main;
  var full = function (L_lineStarts, L_h, L_t, L_start) {
    return (function(){
  var L_next_0;
  L_next_0 = function(){return resolve(L_makeTokens)(L_lineStarts, L_t, function(){return resolve(L_$o)(L_start)(function(){return resolve(L_strLen)(L_h)})})};

  return resolve(L_and)(function(){return resolve(L_strMatches)(L_h, L_emptyToken)}, function(){return resolve(L_or)(function(){return resolve(L_isNil)(L_t)}, function(){return resolve(L_or)(function(){return resolve(L_strStartsWith)(function(){return resolve(L_head)(L_t)}, "\n")}, function(){return resolve(L_strStartsWith)(function(){return resolve(L_head)(L_t)}, "\r\n")})})})(function(){return resolve(L_makeTokens)(L_lineStarts, L_t, function(){return resolve(L_$o)(L_start)(function(){return resolve(L_strLen)(L_h)})})})(function(){return resolve(L_or)(function(){return resolve(L_strStartsWith)(L_h, " ")}, function(){return resolve(L_strStartsWith)(L_h, "#")})(L_next_0)(function(){return resolve(L_and)(function(){return resolve(L_or)(function(){return resolve(L_strStartsWith)(L_h, "\n")}, function(){return resolve(L_strStartsWith)(L_h, "\r\n")})}, function(){return resolve(L_strStartsWith)(function(){return resolve(L_head)(L_t)}, "#")})(function(){return resolve(L_makeTokens)(L_lineStarts, function(){return resolve(L_tail)(L_t)}, function(){return resolve(L_$o)(L_start)(function(){return resolve(L_$o)(function(){return resolve(L_strLen)(L_h)})(function(){return resolve(L_strLen)(function(){return resolve(L_head)(L_t)})})})})})(function(){return resolve(L_cons)(function(){return resolve(L_makeTokenAt)(L_lineStarts, L_h, L_start)}, L_next_0)})})})})();
  };
  var partial = function(L_lineStarts) {
    var _1 = function(L_h) {
            var _2 = function(L_t) {
              var _3 = function(L_start) {
                return full(L_lineStarts, L_h, L_t, L_start);
              };
              _3.leisureInfo = {arg: L_t, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_h, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_lineStarts, name: main.leisureName};
          return _1;
  };
  main = function(L_lineStarts, L_h, L_t, L_start, more) {
    if (L_start && (typeof more == "undefined" || more == null)) {
      return full(L_lineStarts, L_h, L_t, L_start);
    } else if (typeof L_h == "undefined" || L_h == null) {
      return partial(L_lineStarts);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("makeTokenAt")(3)("makeTokenAt lineStarts txt offset = token txt (filePosFor lineStarts offset)")(lazy((function () {
  var main;
  var full = function (L_lineStarts, L_txt, L_offset) {
    return resolve(L_token)(L_txt, function(){return resolve(L_filePosFor)(L_lineStarts, L_offset)});
  };
  var partial = function(L_lineStarts) {
    var _1 = function(L_txt) {
            var _2 = function(L_offset) {
              return full(L_lineStarts, L_txt, L_offset);
            };
            _2.leisureInfo = {arg: L_txt, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_lineStarts, name: main.leisureName};
          return _1;
  };
  main = function(L_lineStarts, L_txt, L_offset, more) {
    if (L_offset && (typeof more == "undefined" || more == null)) {
      return full(L_lineStarts, L_txt, L_offset);
    } else if (typeof L_txt == "undefined" || L_txt == null) {
      return partial(L_lineStarts);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("showToken")(1)("showToken tok = log (strCat (cons 'token: ' (cons (tokenString tok) (cons ', ' (cons (showPos (tokenPos tok)) nil))))) tok")(lazy(function(L_tok){return resolve(L_log)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("token: ", function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(L_tok)}, function(){return resolve(L_cons)(", ", function(){return resolve(L_cons)(function(){return resolve(L_showPos)(function(){return resolve(L_tokenPos)(L_tok)})}, L_nil)})})})})})(L_tok)}))},
 function(){return resolve(L_newDefine)("showPos")(1)("showPos pos = isFilepos pos\n  strCat (cons 'position: ' (cons (fileposFile pos) (cons ', ' (cons (fileposLine pos) (cons '.' (cons (fileposOffset pos) nil))))))\n  pos")(lazy(function(L_pos){return resolve(L_isFilepos)(L_pos)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("position: ", function(){return resolve(L_cons)(function(){return resolve(L_fileposFile)(L_pos)}, function(){return resolve(L_cons)(", ", function(){return resolve(L_cons)(function(){return resolve(L_fileposLine)(L_pos)}, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_fileposOffset)(L_pos)}, L_nil)})})})})})})})(L_pos)}))},
 function(){return resolve(L_newDefine)("splitTokens")(2)("splitTokens str pat = filter (\\s . not (eq s '')) (basicSplitTokens str pat true)")(lazy((function () {
  var main;
  var full = function (L_str, L_pat) {
    return resolve(L_filter)(lazy(function(L_s){return resolve(L_not)(function(){return resolve(L_eq)(L_s)("")})}), function(){return resolve(L_basicSplitTokens)(L_str, L_pat, L_true)});
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            return full(L_str, L_pat);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, more) {
    if (L_pat && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("numberPat")(0)("numberPat = regexp '-?([0-9]+(\\\\.[0-9]+)?|\\\\.[0-9]+)'")(function(){return resolve(L_regexp)("-?([0-9]+(\\.[0-9]+)?|\\.[0-9]+)")})},
 function(){return resolve(L_newDefine)("matchOffset")(2)("matchOffset str match = isNil match\n  strLen str\n  head (tail (tail match))")(lazy((function () {
  var main;
  var full = function (L_str, L_match) {
    return resolve(L_isNil)(L_match)(function(){return resolve(L_strLen)(L_str)})(function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_match)})})});
  };
  var partial = function(L_str) {
    var _1 = function(L_match) {
            return full(L_str, L_match);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_match, more) {
    if (L_match && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_match);
    } else if (typeof L_match == "undefined" || L_match == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("basicSplitTokens")(3)("basicSplitTokens str pat prevIsDel = == str ''\n  nil\n  \\\\\n    num = strMatch str numberPat\n    del = strMatch str pat\n    numOffset = matchOffset str num\n    delOffset = matchOffset str del\n    select = and (== numOffset 0) prevIsDel\n      \\del num first . num\n      == delOffset 0\n        \\del num first . del\n        \\del num first . first\n    first = select (head del) (head num) (strSubstring str 0 delOffset)\n    .\n    cons\n      first\n      basicSplitTokens\n        strSubstring str (strLen first) 0\n        pat\n        select true false false")(lazy((function () {
  var main;
  var full = function (L_str, L_pat, L_prevIsDel) {
    return resolve(L_$p$p)(L_str)("")(L_nil)(function(){return(function(){
  var L_num_0, L_del_1, L_numOffset_2, L_delOffset_3, L_select_4, L_first_5;
  L_num_0 = function(){return resolve(L_strMatch)(L_str, L_numberPat)};
  L_del_1 = function(){return resolve(L_strMatch)(L_str, L_pat)};
  L_numOffset_2 = function(){return resolve(L_matchOffset)(L_str, L_num_0)};
  L_delOffset_3 = function(){return resolve(L_matchOffset)(L_str, L_del_1)};
  L_select_4 = function(){return resolve(L_and)(function(){return resolve(L_$p$p)(L_numOffset_2)(0)}, L_prevIsDel)(lazy(function(L_del_4){return $F(arguments, function(L_num_5){return $F(arguments, function(L_first_6){return resolve(L_num_5)})})}))(function(){return resolve(L_$p$p)(L_delOffset_3)(0)(lazy(function(L_del_4){return $F(arguments, function(L_num_5){return $F(arguments, function(L_first_6){return resolve(L_del_4)})})}))(lazy(function(L_del_4){return $F(arguments, function(L_num_5){return $F(arguments, function(L_first_6){return resolve(L_first_6)})})}))})};
  L_first_5 = function(){return resolve(L_select_4)(function(){return resolve(L_head)(L_del_1)})(function(){return resolve(L_head)(L_num_0)})(function(){return resolve(L_strSubstring)(L_str, 0, L_delOffset_3)})};

  return resolve(L_cons)(L_first_5, function(){return resolve(L_basicSplitTokens)(function(){return resolve(L_strSubstring)(L_str, function(){return resolve(L_strLen)(L_first_5)}, 0)}, L_pat, function(){return resolve(L_select_4)(L_true)(L_false)(L_false)})})})();});
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            var _2 = function(L_prevIsDel) {
              return full(L_str, L_pat, L_prevIsDel);
            };
            _2.leisureInfo = {arg: L_pat, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, L_prevIsDel, more) {
    if (L_prevIsDel && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat, L_prevIsDel);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("tokens")(2)("tokens str pat = countedTokens emptyLineStarts str pat")(lazy((function () {
  var main;
  var full = function (L_str, L_pat) {
    return resolve(L_countedTokens)(L_emptyLineStarts, L_str, L_pat);
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            return full(L_str, L_pat);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, more) {
    if (L_pat && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("countedTokens")(3)("countedTokens lineStarts str pat = makeTokens lineStarts (splitTokens str pat) 0")(lazy((function () {
  var main;
  var full = function (L_lineStarts, L_str, L_pat) {
    return resolve(L_makeTokens)(L_lineStarts, function(){return resolve(L_splitTokens)(L_str, L_pat)}, 0);
  };
  var partial = function(L_lineStarts) {
    var _1 = function(L_str) {
            var _2 = function(L_pat) {
              return full(L_lineStarts, L_str, L_pat);
            };
            _2.leisureInfo = {arg: L_str, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_lineStarts, name: main.leisureName};
          return _1;
  };
  main = function(L_lineStarts, L_str, L_pat, more) {
    if (L_pat && (typeof more == "undefined" || more == null)) {
      return full(L_lineStarts, L_str, L_pat);
    } else if (typeof L_str == "undefined" || L_str == null) {
      return partial(L_lineStarts);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("isTokenString")(2)("isTokenString tok str = or\n  and (isToken tok) (eq (tokenString tok) str)\n  and (isString tok) (eq tok str)")(lazy((function () {
  var main;
  var full = function (L_tok, L_str) {
    return resolve(L_or)(function(){return resolve(L_and)(function(){return resolve(L_isToken)(L_tok)}, function(){return resolve(L_eq)(function(){return resolve(L_tokenString)(L_tok)})(L_str)})}, function(){return resolve(L_and)(function(){return resolve(L_isString)(L_tok)}, function(){return resolve(L_eq)(L_tok)(L_str)})});
  };
  var partial = function(L_tok) {
    var _1 = function(L_str) {
            return full(L_tok, L_str);
          };
          _1.leisureInfo = {arg: L_tok, name: main.leisureName};
          return _1;
  };
  main = function(L_tok, L_str, more) {
    if (L_str && (typeof more == "undefined" || more == null)) {
      return full(L_tok, L_str);
    } else if (typeof L_str == "undefined" || L_str == null) {
      return partial(L_tok);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("isTokenStart")(2)("isTokenStart tok str = or\n  and (isToken tok) (strStartsWith (tokenString tok) str)\n  and (isString tok) (strStartsWith tok str)")(lazy((function () {
  var main;
  var full = function (L_tok, L_str) {
    return resolve(L_or)(function(){return resolve(L_and)(function(){return resolve(L_isToken)(L_tok)}, function(){return resolve(L_strStartsWith)(function(){return resolve(L_tokenString)(L_tok)}, L_str)})}, function(){return resolve(L_and)(function(){return resolve(L_isString)(L_tok)}, function(){return resolve(L_strStartsWith)(L_tok, L_str)})});
  };
  var partial = function(L_tok) {
    var _1 = function(L_str) {
            return full(L_tok, L_str);
          };
          _1.leisureInfo = {arg: L_tok, name: main.leisureName};
          return _1;
  };
  main = function(L_tok, L_str, more) {
    if (L_str && (typeof more == "undefined" || more == null)) {
      return full(L_tok, L_str);
    } else if (typeof L_str == "undefined" || L_str == null) {
      return partial(L_tok);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strTokenString")(1)("strTokenString tok = withToken tok nil \\str pos . str")(lazy(function(L_tok){return resolve(L_withToken)(L_tok, L_nil, lazy(function(L_str){return $F(arguments, function(L_pos){return resolve(L_str)})}))}))},
 function(){return resolve(L_newDefine)("withToken")(3)("withToken tok nonTokCase tokCase = isToken tok\n  tokCase (tokenString tok) (tokenPos tok)\n  isString tok\n    tokCase tok emptyFilePos\n    nonTokCase")(lazy((function () {
  var main;
  var full = function (L_tok, L_nonTokCase, L_tokCase) {
    return resolve(L_isToken)(L_tok)(function(){return resolve(L_tokCase)(function(){return resolve(L_tokenString)(L_tok)})(function(){return resolve(L_tokenPos)(L_tok)})})(function(){return resolve(L_isString)(L_tok)(function(){return resolve(L_tokCase)(L_tok)(L_emptyFilePos)})(L_nonTokCase)});
  };
  var partial = function(L_tok) {
    var _1 = function(L_nonTokCase) {
            var _2 = function(L_tokCase) {
              return full(L_tok, L_nonTokCase, L_tokCase);
            };
            _2.leisureInfo = {arg: L_nonTokCase, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_tok, name: main.leisureName};
          return _1;
  };
  main = function(L_tok, L_nonTokCase, L_tokCase, more) {
    if (L_tokCase && (typeof more == "undefined" || more == null)) {
      return full(L_tok, L_nonTokCase, L_tokCase);
    } else if (typeof L_nonTokCase == "undefined" || L_nonTokCase == null) {
      return partial(L_tok);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseToks")(2)("parseToks toks groups =\n  isNil toks nil\n    ifNotErr (parseTok toks groups) \\list . list \\h t .\n      ifNotErr (parseToks t groups) \\res .\n        cons h\n          and (isCons res) (isBlockStart (head res))\n            cons res nil\n            res")(lazy((function () {
  var main;
  var full = function (L_toks, L_groups) {
    return resolve(L_isNil)(L_toks)(L_nil)(function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseTok)(L_toks, L_groups)}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_ifNotErr)(function(){return resolve(L_parseToks)(L_t, L_groups)}, lazy(function(L_res){return resolve(L_cons)(L_h, function(){return resolve(L_and)(function(){return resolve(L_isCons)(L_res)}, function(){return resolve(L_isBlockStart)(function(){return resolve(L_head)(L_res)})})(function(){return resolve(L_cons)(L_res, L_nil)})(L_res)})}))})}))}))});
  };
  var partial = function(L_toks) {
    var _1 = function(L_groups) {
            return full(L_toks, L_groups);
          };
          _1.leisureInfo = {arg: L_toks, name: main.leisureName};
          return _1;
  };
  main = function(L_toks, L_groups, more) {
    if (L_groups && (typeof more == "undefined" || more == null)) {
      return full(L_toks, L_groups);
    } else if (typeof L_groups == "undefined" || L_groups == null) {
      return partial(L_toks);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseTok")(2)("parseTok toks groups = withCons toks nil \\h t .\n  withToken h toks \\txt pos .\n    assoc txt groups\n      \\close . parseGroup h t nil close groups\n      (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (parseIndent h t nil groups)\n        toks")(lazy((function () {
  var main;
  var full = function (L_toks, L_groups) {
    return resolve(L_withCons)(L_toks, L_nil, lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_withToken)(L_h, L_toks, lazy(function(L_txt){return $F(arguments, function(L_pos){return resolve(L_assoc)(L_txt, L_groups)(lazy(function(L_close){return resolve(L_parseGroup)(L_h, L_t, L_nil, L_close, L_groups)}))(function(){return resolve(L_or)(function(){return resolve(L_isTokenStart)(L_h, "\n")}, function(){return resolve(L_isTokenStart)(L_h, "\r\n")})(function(){return resolve(L_parseIndent)(L_h, L_t, L_nil, L_groups)})(L_toks)})})}))})}));
  };
  var partial = function(L_toks) {
    var _1 = function(L_groups) {
            return full(L_toks, L_groups);
          };
          _1.leisureInfo = {arg: L_toks, name: main.leisureName};
          return _1;
  };
  main = function(L_toks, L_groups, more) {
    if (L_groups && (typeof more == "undefined" || more == null)) {
      return full(L_toks, L_groups);
    } else if (typeof L_groups == "undefined" || L_groups == null) {
      return partial(L_toks);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseGroup")(5)("parseGroup left toks gr close groups = withCons toks (parseErr 'Unterminated group starting ' (loc left))\n  \\h t . isTokenString h close\n    eq close ')'\n      cons (parensFromToks left h (reverse gr)) t\n      cons (cons left (cons (reverse gr) (cons h nil))) t\n    withToken h\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT .\n        parseGroup left restT (cons restH gr) close groups\n      \\txt pos .\n        rassoc txt groups\n          \\open . parseErr (strCat (cons 'Mismatched group: ' (cons (tokenString left) (cons txt (cons ' ' nil))))) (loc left)\n          ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseGroup left restT (cons restH gr) close groups")(lazy((function () {
  var main;
  var full = function (L_left, L_toks, L_gr, L_close, L_groups) {
    return resolve(L_withCons)(L_toks, function(){return resolve(L_parseErr)("Unterminated group starting ", function(){return resolve(L_loc)(L_left)})}, lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_isTokenString)(L_h, L_close)(function(){return resolve(L_eq)(L_close)(")")(function(){return resolve(L_cons)(function(){return resolve(L_parensFromToks)(L_left, L_h, function(){return resolve(L_reverse)(L_gr)})}, L_t)})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_left, function(){return resolve(L_cons)(function(){return resolve(L_reverse)(L_gr)}, function(){return resolve(L_cons)(L_h, L_nil)})})}, L_t)})})(function(){return resolve(L_withToken)(L_h, function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseTok)(L_toks, L_groups)}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_restH){return $F(arguments, function(L_restT){return resolve(L_parseGroup)(L_left, L_restT, function(){return resolve(L_cons)(L_restH, L_gr)}, L_close, L_groups)})}))}))}, lazy(function(L_txt){return $F(arguments, function(L_pos){return resolve(L_rassoc)(L_txt, L_groups)(lazy(function(L_open){return resolve(L_parseErr)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("Mismatched group: ", function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(L_left)}, function(){return resolve(L_cons)(L_txt, function(){return resolve(L_cons)(" ", L_nil)})})})})}, function(){return resolve(L_loc)(L_left)})}))(function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseTok)(L_toks, L_groups)}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_restH){return $F(arguments, function(L_restT){return resolve(L_parseGroup)(L_left, L_restT, function(){return resolve(L_cons)(L_restH, L_gr)}, L_close, L_groups)})}))}))})})}))})})}));
  };
  var partial = function(L_left) {
    var _1 = function(L_toks) {
            var _2 = function(L_gr) {
              var _3 = function(L_close) {
                var _4 = function(L_groups) {
                  return full(L_left, L_toks, L_gr, L_close, L_groups);
                };
                _4.leisureInfo = {arg: L_close, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_gr, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_toks, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_left, name: main.leisureName};
          return _1;
  };
  main = function(L_left, L_toks, L_gr, L_close, L_groups, more) {
    if (L_groups && (typeof more == "undefined" || more == null)) {
      return full(L_left, L_toks, L_gr, L_close, L_groups);
    } else if (typeof L_toks == "undefined" || L_toks == null) {
      return partial(L_left);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseIndent")(4)("parseIndent indent toks gr groups =\n  withCons toks (cons (makeParens (tokenFilepos indent) (lexEnd (head gr)) (reverse gr)) nil)\n    \\h t . or (withToken h false (\\txt pos . rassoc txt groups (\\open . true) false))\n      and (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (<= (strLen (tokenString h)) (strLen (tokenString indent)))\n      cons (makeParens (tokenFilepos indent) (tokenFilepos h) (reverse gr)) toks\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseIndent indent restT (cons restH gr) groups")(lazy((function () {
  var main;
  var full = function (L_indent, L_toks, L_gr, L_groups) {
    return resolve(L_withCons)(L_toks, function(){return resolve(L_cons)(function(){return resolve(L_makeParens)(function(){return resolve(L_tokenFilepos)(L_indent)}, function(){return resolve(L_lexEnd)(function(){return resolve(L_head)(L_gr)})}, function(){return resolve(L_reverse)(L_gr)})}, L_nil)}, lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_or)(function(){return resolve(L_withToken)(L_h, L_false, lazy(function(L_txt){return $F(arguments, function(L_pos){return resolve(L_rassoc)(L_txt, L_groups)(lazy(function(L_open){return resolve(L_true)}))(L_false)})}))}, function(){return resolve(L_and)(function(){return resolve(L_or)(function(){return resolve(L_isTokenStart)(L_h, "\n")}, function(){return resolve(L_isTokenStart)(L_h, "\r\n")})}, function(){return resolve(L_$y$p)(function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_h)})})(function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_indent)})})})})(function(){return resolve(L_cons)(function(){return resolve(L_makeParens)(function(){return resolve(L_tokenFilepos)(L_indent)}, function(){return resolve(L_tokenFilepos)(L_h)}, function(){return resolve(L_reverse)(L_gr)})}, L_toks)})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseTok)(L_toks, L_groups)}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_restH){return $F(arguments, function(L_restT){return resolve(L_parseIndent)(L_indent, L_restT, function(){return resolve(L_cons)(L_restH, L_gr)}, L_groups)})}))}))})})}));
  };
  var partial = function(L_indent) {
    var _1 = function(L_toks) {
            var _2 = function(L_gr) {
              var _3 = function(L_groups) {
                return full(L_indent, L_toks, L_gr, L_groups);
              };
              _3.leisureInfo = {arg: L_gr, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_toks, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_indent, name: main.leisureName};
          return _1;
  };
  main = function(L_indent, L_toks, L_gr, L_groups, more) {
    if (L_groups && (typeof more == "undefined" || more == null)) {
      return full(L_indent, L_toks, L_gr, L_groups);
    } else if (typeof L_toks == "undefined" || L_toks == null) {
      return partial(L_indent);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("nilRange")(0)("nilRange = cons 1 (cons 0 nil)")(function(){return resolve(L_cons)(1, function(){return resolve(L_cons)(0, L_nil)})})},
 function(){return resolve(L_newDefine)("lit")(2)("lit value range = \\f . f value range")(lazy(setDataType((function () {
  var main;
  var full = function (L_value, L_range) {
    return setType(function(L_f){return resolve(L_f)(L_value)(L_range)}, 'lit');
  };
  var partial = function(L_value) {
    var _1 = function(L_range) {
            return full(L_value, L_range);
          };
          _1.leisureInfo = {arg: L_value, name: main.leisureName};
          return _1;
  };
  main = function(L_value, L_range, more) {
    if (L_range && (typeof more == "undefined" || more == null)) {
      return full(L_value, L_range);
    } else if (typeof L_range == "undefined" || L_range == null) {
      return partial(L_value);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'lit')))},
 function(){return resolve(L_newDefine)("ref")(2)("ref name range = \\f . f name range")(lazy(setDataType((function () {
  var main;
  var full = function (L_name, L_range) {
    return setType(function(L_f){return resolve(L_f)(L_name)(L_range)}, 'ref');
  };
  var partial = function(L_name) {
    var _1 = function(L_range) {
            return full(L_name, L_range);
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_range, more) {
    if (L_range && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_range);
    } else if (typeof L_range == "undefined" || L_range == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'ref')))},
 function(){return resolve(L_newDefine)("lambda")(3)("lambda name body range = \\f . f name body range")(lazy(setDataType((function () {
  var main;
  var full = function (L_name, L_body, L_range) {
    return setType(function(L_f){return resolve(L_f)(L_name)(L_body)(L_range)}, 'lambda');
  };
  var partial = function(L_name) {
    var _1 = function(L_body) {
            var _2 = function(L_range) {
              return full(L_name, L_body, L_range);
            };
            _2.leisureInfo = {arg: L_body, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_body, L_range, more) {
    if (L_range && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_body, L_range);
    } else if (typeof L_body == "undefined" || L_body == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'lambda')))},
 function(){return resolve(L_newDefine)("apply")(2)("apply func arg = \\f . f func arg")(lazy(setDataType((function () {
  var main;
  var full = function (L_func, L_arg) {
    return setType(function(L_f){return resolve(L_f)(L_func)(L_arg)}, 'apply');
  };
  var partial = function(L_func) {
    var _1 = function(L_arg) {
            return full(L_func, L_arg);
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_arg, more) {
    if (L_arg && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_arg);
    } else if (typeof L_arg == "undefined" || L_arg == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'apply')))},
 function(){return resolve(L_newDefine)("let")(4)("let name value body range = \\f . f name value body range")(lazy(setDataType((function () {
  var main;
  var full = function (L_name, L_value, L_body, L_range) {
    return setType(function(L_f){return resolve(L_f)(L_name)(L_value)(L_body)(L_range)}, 'let');
  };
  var partial = function(L_name) {
    var _1 = function(L_value) {
            var _2 = function(L_body) {
              var _3 = function(L_range) {
                return full(L_name, L_value, L_body, L_range);
              };
              _3.leisureInfo = {arg: L_body, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_value, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_value, L_body, L_range, more) {
    if (L_range && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_value, L_body, L_range);
    } else if (typeof L_value == "undefined" || L_value == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'let')))},
 function(){return resolve(L_newDefine)("anno")(3)("anno name data body = \\f . f name data body")(lazy(setDataType((function () {
  var main;
  var full = function (L_name, L_data, L_body) {
    return setType(function(L_f){return resolve(L_f)(L_name)(L_data)(L_body)}, 'anno');
  };
  var partial = function(L_name) {
    var _1 = function(L_data) {
            var _2 = function(L_body) {
              return full(L_name, L_data, L_body);
            };
            _2.leisureInfo = {arg: L_data, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_data, L_body, more) {
    if (L_body && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_data, L_body);
    } else if (typeof L_data == "undefined" || L_data == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})(), 'anno')))},
 function(){return resolve(L_newDefine)("withParens")(3)("withParens p err cont = isParens p (p cont) err")(lazy((function () {
  var main;
  var full = function (L_p, L_err, L_cont) {
    return resolve(L_isParens)(L_p)(function(){return resolve(L_p)(L_cont)})(L_err);
  };
  var partial = function(L_p) {
    var _1 = function(L_err) {
            var _2 = function(L_cont) {
              return full(L_p, L_err, L_cont);
            };
            _2.leisureInfo = {arg: L_err, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_p, name: main.leisureName};
          return _1;
  };
  main = function(L_p, L_err, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_p, L_err, L_cont);
    } else if (typeof L_err == "undefined" || L_err == null) {
      return partial(L_p);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("setParens")(2)("setParens p func = isParens p\n  p \\start end content . parens start end (func content)\n  func p")(lazy((function () {
  var main;
  var full = function (L_p, L_func) {
    return resolve(L_isParens)(L_p)(function(){return resolve(L_p)(lazy(function(L_start){return $F(arguments, function(L_end){return $F(arguments, function(L_content){return resolve(L_parens)(L_start, L_end, function(){return resolve(L_func)(L_content)})})})}))})(function(){return resolve(L_func)(L_p)});
  };
  var partial = function(L_p) {
    var _1 = function(L_func) {
            return full(L_p, L_func);
          };
          _1.leisureInfo = {arg: L_p, name: main.leisureName};
          return _1;
  };
  main = function(L_p, L_func, more) {
    if (L_func && (typeof more == "undefined" || more == null)) {
      return full(L_p, L_func);
    } else if (typeof L_func == "undefined" || L_func == null) {
      return partial(L_p);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("withStripped")(2)("withStripped list cont = withParens list (cont list) \\start end content . withStripped content cont")(lazy((function () {
  var main;
  var full = function (L_list, L_cont) {
    return resolve(L_withParens)(L_list, function(){return resolve(L_cont)(L_list)}, lazy(function(L_start){return $F(arguments, function(L_end){return $F(arguments, function(L_content){return resolve(L_withStripped)(L_content, L_cont)})})}));
  };
  var partial = function(L_list) {
    var _1 = function(L_cont) {
            return full(L_list, L_cont);
          };
          _1.leisureInfo = {arg: L_list, name: main.leisureName};
          return _1;
  };
  main = function(L_list, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_list, L_cont);
    } else if (typeof L_cont == "undefined" || L_cont == null) {
      return partial(L_list);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("position")(1)("position thing = isToken thing (tokenFilepos thing)\n  isParens thing (parensStart thing)\n    isCons thing\n      \\\\\n        pos = position (head thing)\n        .\n        isEmptyPos pos (position (tail thing)) pos\n      isFilepos thing thing\n        emptyFilePos")(lazy(function(L_thing){return resolve(L_isToken)(L_thing)(function(){return resolve(L_tokenFilepos)(L_thing)})(function(){return resolve(L_isParens)(L_thing)(function(){return resolve(L_parensStart)(L_thing)})(function(){return resolve(L_isCons)(L_thing)(function(){return(function(){
  var L_pos_0;
  L_pos_0 = function(){return resolve(L_position)(function(){return resolve(L_head)(L_thing)})};

  return resolve(L_isEmptyPos)(L_pos_0)(function(){return resolve(L_position)(function(){return resolve(L_tail)(L_thing)})})(L_pos_0)})();})(function(){return resolve(L_isFilepos)(L_thing)(L_thing)(L_emptyFilePos)})})})}))},
 function(){return resolve(L_newDefine)("lexEnd")(1)("lexEnd thing = isToken thing (addFilepos (tokenFilepos thing) (strLen (tokenString thing)))\n  isParens thing (parensEnd thing)\n    isCons thing (lexEnd (last thing))\n      emptyFilePos")(lazy(function(L_thing){return resolve(L_isToken)(L_thing)(function(){return resolve(L_addFilepos)(function(){return resolve(L_tokenFilepos)(L_thing)}, function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_thing)})})})(function(){return resolve(L_isParens)(L_thing)(function(){return resolve(L_parensEnd)(L_thing)})(function(){return resolve(L_isCons)(L_thing)(function(){return resolve(L_lexEnd)(function(){return resolve(L_last)(L_thing)})})(L_emptyFilePos)})})}))},
 function(){return resolve(L_newDefine)("loc")(1)("loc thing = \\\\\n  p = position thing\n  l = isEmptyPos p 'an unknown location' (showPos p)\n  .\n  strCat (cons 'at ' (cons l nil))")(lazy(function(L_thing){return (function(){
  var L_p_0, L_l_1;
  L_p_0 = function(){return resolve(L_position)(L_thing)};
  L_l_1 = function(){return resolve(L_isEmptyPos)(L_p_0)("an unknown location")(function(){return resolve(L_showPos)(L_p_0)})};

  return resolve(L_strCat)(function(){return resolve(L_cons)("at ", function(){return resolve(L_cons)(L_l_1, L_nil)})})})()}))},
 function(){return resolve(L_newDefine)("scrub")(1)("scrub str = strFromList (scrubList (strToList str))")(lazy(function(L_str){return resolve(L_strFromList)(function(){return resolve(L_scrubList)(function(){return resolve(L_strToList)(L_str)})})}))},
 function(){return resolve(L_newDefine)("scrubList")(1)("scrubList list = list\n  \\h t D . \\\\\n    next = scrubList t\n    .\n    eq h '\\\\' (cons h (cons (head t) (scrubList (tail t))))\n      eq h '\\\"' (cons '\\\\' (cons '\\\"' next))\n        cons h next\n  nil")(lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return (function(){
  var L_next_0;
  L_next_0 = function(){return resolve(L_scrubList)(L_t)};

  return resolve(L_eq)(L_h)("\\")(function(){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(function(){return resolve(L_head)(L_t)}, function(){return resolve(L_scrubList)(function(){return resolve(L_tail)(L_t)})})})})(function(){return resolve(L_eq)(L_h)("\"")(function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)("\"", L_next_0)})})(function(){return resolve(L_cons)(L_h, L_next_0)})})})()})})}))(L_nil)}))},
 function(){return resolve(L_newDefine)("createAst")(3)("createAst lineStarts inList names = withStripped inList \\list .\n  isToken list (createLitOrRef list names)\n    list\n      \\h t D .\n        isTokenString h '\\\\\\\\' (createLet h t names)\n          isTokenString h '\\\\@' (createAnno h t names)\n            isTokenString h '\\\\' (createLambda h t names)\n              createApply list names\n      nil")(lazy((function () {
  var main;
  var full = function (L_lineStarts, L_inList, L_names) {
    return resolve(L_withStripped)(L_inList, lazy(function(L_list){return resolve(L_isToken)(L_list)(function(){return resolve(L_createLitOrRef)(L_list, L_names)})(function(){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_isTokenString)(L_h, "\\\\")(function(){return resolve(L_createLet)(L_h, L_t, L_names)})(function(){return resolve(L_isTokenString)(L_h, "\\@")(function(){return resolve(L_createAnno)(L_h, L_t, L_names)})(function(){return resolve(L_isTokenString)(L_h, "\\")(function(){return resolve(L_createLambda)(L_h, L_t, L_names)})(function(){return resolve(L_createApply)(L_list, L_names)})})})})})}))(L_nil)})}));
  };
  var partial = function(L_lineStarts) {
    var _1 = function(L_inList) {
            var _2 = function(L_names) {
              return full(L_lineStarts, L_inList, L_names);
            };
            _2.leisureInfo = {arg: L_inList, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_lineStarts, name: main.leisureName};
          return _1;
  };
  main = function(L_lineStarts, L_inList, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_lineStarts, L_inList, L_names);
    } else if (typeof L_inList == "undefined" || L_inList == null) {
      return partial(L_lineStarts);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("strMatches")(2)("strMatches str pat = isCons (strMatch str pat)")(lazy((function () {
  var main;
  var full = function (L_str, L_pat) {
    return resolve(L_isCons)(function(){return resolve(L_strMatch)(L_str, L_pat)});
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            return full(L_str, L_pat);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, more) {
    if (L_pat && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("digit")(0)("digit = regexp '^[0-9]+$'")(function(){return resolve(L_regexp)("^[0-9]+$")})},
 function(){return resolve(L_newDefine)("backslashCodes")(0)("backslashCodes = 'bfnrt'")("bfnrt")},
 function(){return resolve(L_newDefine)("backslashValues")(0)("backslashValues = '\\b\\f\\n\\r\\t'")("\b\f\n\r\t")},
 function(){return resolve(L_newDefine)("convertStringEscape")(3)("convertStringEscape char codes values =\n  eq codes ''\n    char\n    eq char (strAt codes 0)\n      strAt values 0\n      convertStringEscape char (strSubstring codes 1 0) (strSubstring values 1 0)")(lazy((function () {
  var main;
  var full = function (L_char, L_codes, L_values) {
    return resolve(L_eq)(L_codes)("")(L_char)(function(){return resolve(L_eq)(L_char)(function(){return resolve(L_strAt)(L_codes, 0)})(function(){return resolve(L_strAt)(L_values, 0)})(function(){return resolve(L_convertStringEscape)(L_char, function(){return resolve(L_strSubstring)(L_codes, 1, 0)}, function(){return resolve(L_strSubstring)(L_values, 1, 0)})})});
  };
  var partial = function(L_char) {
    var _1 = function(L_codes) {
            var _2 = function(L_values) {
              return full(L_char, L_codes, L_values);
            };
            _2.leisureInfo = {arg: L_codes, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_char, name: main.leisureName};
          return _1;
  };
  main = function(L_char, L_codes, L_values, more) {
    if (L_values && (typeof more == "undefined" || more == null)) {
      return full(L_char, L_codes, L_values);
    } else if (typeof L_codes == "undefined" || L_codes == null) {
      return partial(L_char);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("convertStringEscapes")(3)("convertStringEscapes orig str cont =\n  eq str ''\n    cont str\n    eq (strAt str 0) '\\\\'\n      eq (strLen str) 1 (parseErr \"Error, backslash without character in string: \" orig)\n        convertStringEscapes orig (strSubstring str 2 0) \\rest . cont\n          strAdd\n            convertStringEscape (strAt str 1) backslashCodes backslashValues\n            rest\n      convertStringEscapes orig (strSubstring str 1 0) \\rest . cont\n        strAdd\n          strAt str 0\n          rest")(lazy((function () {
  var main;
  var full = function (L_orig, L_str, L_cont) {
    return resolve(L_eq)(L_str)("")(function(){return resolve(L_cont)(L_str)})(function(){return resolve(L_eq)(function(){return resolve(L_strAt)(L_str, 0)})("\\")(function(){return resolve(L_eq)(function(){return resolve(L_strLen)(L_str)})(1)(function(){return resolve(L_parseErr)("Error, backslash without character in string: ", L_orig)})(function(){return resolve(L_convertStringEscapes)(L_orig, function(){return resolve(L_strSubstring)(L_str, 2, 0)}, lazy(function(L_rest){return resolve(L_cont)(function(){return resolve(L_strAdd)(function(){return resolve(L_convertStringEscape)(function(){return resolve(L_strAt)(L_str, 1)}, L_backslashCodes, L_backslashValues)}, L_rest)})}))})})(function(){return resolve(L_convertStringEscapes)(L_orig, function(){return resolve(L_strSubstring)(L_str, 1, 0)}, lazy(function(L_rest){return resolve(L_cont)(function(){return resolve(L_strAdd)(function(){return resolve(L_strAt)(L_str, 0)}, L_rest)})}))})});
  };
  var partial = function(L_orig) {
    var _1 = function(L_str) {
            var _2 = function(L_cont) {
              return full(L_orig, L_str, L_cont);
            };
            _2.leisureInfo = {arg: L_str, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_orig, name: main.leisureName};
          return _1;
  };
  main = function(L_orig, L_str, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_orig, L_str, L_cont);
    } else if (typeof L_str == "undefined" || L_str == null) {
      return partial(L_orig);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseString")(2)("parseString str cont =\n  neq (strAt str 0) (strAt str -1) (parseErr \"Badly terminated string: \" str)\n    convertStringEscapes str (strSubstring str 1 -1) cont")(lazy((function () {
  var main;
  var full = function (L_str, L_cont) {
    return resolve(L_neq)(function(){return resolve(L_strAt)(L_str, 0)}, function(){return resolve(L_strAt)(L_str, -1)})(function(){return resolve(L_parseErr)("Badly terminated string: ", L_str)})(function(){return resolve(L_convertStringEscapes)(L_str, function(){return resolve(L_strSubstring)(L_str, 1, -1)}, L_cont)});
  };
  var partial = function(L_str) {
    var _1 = function(L_cont) {
            return full(L_str, L_cont);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_cont);
    } else if (typeof L_cont == "undefined" || L_cont == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createLitOrRef")(2)("createLitOrRef token names = \\\\\n  tok = tokenString token\n  tokRange = (fileposList (position token))\n  .\n  contains names tok\n    ref tok tokRange\n    or (strStartsWith tok '\\\"') (strStartsWith tok \"'\")\n      parseString tok \\str . lit str tokRange\n      strStartsWith tok '.'\n        jsonParse (strCat (cons '0' (cons tok nil))) (\\err . ref tok tokRange) (\\item . lit item tokRange)\n        or (and (>= (strAt tok 0) '0') (<= (strAt tok 0) '9')) (strStartsWith tok '-')\n          jsonParse tok (\\err . ref tok tokRange) (\\item . lit item tokRange)\n          ref tok tokRange")(lazy((function () {
  var main;
  var full = function (L_token, L_names) {
    return (function(){
  var L_tok_0, L_tokRange_1;
  L_tok_0 = function(){return resolve(L_tokenString)(L_token)};
  L_tokRange_1 = function(){return resolve(L_fileposList)(function(){return resolve(L_position)(L_token)})};

  return resolve(L_contains)(L_names, L_tok_0)(function(){return resolve(L_ref)(L_tok_0, L_tokRange_1)})(function(){return resolve(L_or)(function(){return resolve(L_strStartsWith)(L_tok_0, "\"")}, function(){return resolve(L_strStartsWith)(L_tok_0, "'")})(function(){return resolve(L_parseString)(L_tok_0, lazy(function(L_str){return resolve(L_lit)(L_str, L_tokRange_1)}))})(function(){return resolve(L_strStartsWith)(L_tok_0, ".")(function(){return resolve(L_jsonParse)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("0", function(){return resolve(L_cons)(L_tok_0, L_nil)})})}, lazy(function(L_err){return resolve(L_ref)(L_tok_0, L_tokRange_1)}), lazy(function(L_item){return resolve(L_lit)(L_item, L_tokRange_1)}))})(function(){return resolve(L_or)(function(){return resolve(L_and)(function(){return resolve(L_$z$p)(function(){return resolve(L_strAt)(L_tok_0, 0)})("0")}, function(){return resolve(L_$y$p)(function(){return resolve(L_strAt)(L_tok_0, 0)})("9")})}, function(){return resolve(L_strStartsWith)(L_tok_0, "-")})(function(){return resolve(L_jsonParse)(L_tok_0, lazy(function(L_err){return resolve(L_ref)(L_tok_0, L_tokRange_1)}), lazy(function(L_item){return resolve(L_lit)(L_item, L_tokRange_1)}))})(function(){return resolve(L_ref)(L_tok_0, L_tokRange_1)})})})})})();
  };
  var partial = function(L_token) {
    var _1 = function(L_names) {
            return full(L_token, L_names);
          };
          _1.leisureInfo = {arg: L_token, name: main.leisureName};
          return _1;
  };
  main = function(L_token, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_token, L_names);
    } else if (typeof L_names == "undefined" || L_names == null) {
      return partial(L_token);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createLambda")(3)("createLambda start list names = \\\\\n  err = parseErr \"Lambda needs a variable name, a dot, and a body \" (loc start)\n  .\n  withCons list err \\name rest .\n    withToken name err \\n p .\n      withCons rest err \\dot body .\n        # are these partial applications too hard to read?\n        isTokenString dot '.'\n          ifNotErr (createAst nil body (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))\n          ifNotErr (createLambda start rest (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))")(lazy((function () {
  var main;
  var full = function (L_start, L_list, L_names) {
    return (function(){
  var L_err_0;
  L_err_0 = function(){return resolve(L_parseErr)("Lambda needs a variable name, a dot, and a body ", function(){return resolve(L_loc)(L_start)})};

  return resolve(L_withCons)(L_list, L_err_0, lazy(function(L_name){return $F(arguments, function(L_rest){return resolve(L_withToken)(L_name, L_err_0, lazy(function(L_n){return $F(arguments, function(L_p){return resolve(L_withCons)(L_rest, L_err_0, lazy(function(L_dot){return $F(arguments, function(L_body){return resolve(L_isTokenString)(L_dot, ".")(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_body, function(){return resolve(L_cons)(L_n, L_names)})}, lazy(function(L_bodyAst){return resolve(L_lambda)(L_n, L_bodyAst, function(){return resolve(L_fileposList)(function(){return resolve(L_position)(L_name)})})}))})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createLambda)(L_start, L_rest, function(){return resolve(L_cons)(L_n, L_names)})}, lazy(function(L_bodyAst){return resolve(L_lambda)(L_n, L_bodyAst, function(){return resolve(L_fileposList)(function(){return resolve(L_position)(L_name)})})}))})})}))})}))})}))})();
  };
  var partial = function(L_start) {
    var _1 = function(L_list) {
            var _2 = function(L_names) {
              return full(L_start, L_list, L_names);
            };
            _2.leisureInfo = {arg: L_list, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_list, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_list, L_names);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createAnno")(3)("createAnno start list names =\n  withCons list (parseErr \"No annotation name or data in annotation \" (loc start)) \\name rest .\n    withCons rest (parseErr \"No data for annotation \" (loc start)) \\data rest . \\\\\n      finish data body = ifNotErr (createAst nil body names) \\bodyAst .\n        cleanTokens start name \\name .\n          cleanTokens start data \\data .\n            anno name data bodyAst\n      .\n      isTokenString data '.'\n        finish nil rest\n        withStripped data \\data .\n          withCons rest (parseErr \"No body for annotation \" (loc start)) \\dot body .\n            isTokenString dot '.'\n              finish data body\n              parseErr \"Annotation expects dot after name and data \" (loc start)")(lazy((function () {
  var main;
  var full = function (L_start, L_list, L_names) {
    return resolve(L_withCons)(L_list, function(){return resolve(L_parseErr)("No annotation name or data in annotation ", function(){return resolve(L_loc)(L_start)})}, lazy(function(L_name){return $F(arguments, function(L_rest){return resolve(L_withCons)(L_rest, function(){return resolve(L_parseErr)("No data for annotation ", function(){return resolve(L_loc)(L_start)})}, lazy(function(L_data){return $F(arguments, function(L_rest_0){return (function(){
  var L_finish_1;
  L_finish_1 = function(){return function(L_data_1){return $F(arguments, function(L_body){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_body, L_names)}, lazy(function(L_bodyAst){return resolve(L_cleanTokens)(L_start, L_name, lazy(function(L_name_2){return resolve(L_cleanTokens)(L_start, L_data_1, lazy(function(L_data_3){return resolve(L_anno)(L_name_2, L_data_3, L_bodyAst)}))}))}))})}};

  return resolve(L_isTokenString)(L_data, ".")(function(){return resolve(L_finish_1)(L_nil)(L_rest_0)})(function(){return resolve(L_withStripped)(L_data, lazy(function(L_data_2){return resolve(L_withCons)(L_rest_0, function(){return resolve(L_parseErr)("No body for annotation ", function(){return resolve(L_loc)(L_start)})}, lazy(function(L_dot){return $F(arguments, function(L_body){return resolve(L_isTokenString)(L_dot, ".")(function(){return resolve(L_finish_1)(L_data_2)(L_body)})(function(){return resolve(L_parseErr)("Annotation expects dot after name and data ", function(){return resolve(L_loc)(L_start)})})})}))}))})})()})}))})}));
  };
  var partial = function(L_start) {
    var _1 = function(L_list) {
            var _2 = function(L_names) {
              return full(L_start, L_list, L_names);
            };
            _2.leisureInfo = {arg: L_list, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_list, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_list, L_names);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("bodyStructPat")(0)("bodyStructPat = regexp '\\\\|\\\\\\\\|\\\\@'")(function(){return resolve(L_regexp)("\\|\\\\|\\@")})},
 function(){return resolve(L_newDefine)("createApply")(2)("createApply inList names = withStripped inList \\list .\n  withCons list (parseErr \"Funcion apply expecting a non-empty list \" (loc inList)) \\h t .\n    ifNotErr (createAst nil h names) \\func . chainApply func t names")(lazy((function () {
  var main;
  var full = function (L_inList, L_names) {
    return resolve(L_withStripped)(L_inList, lazy(function(L_list){return resolve(L_withCons)(L_list, function(){return resolve(L_parseErr)("Funcion apply expecting a non-empty list ", function(){return resolve(L_loc)(L_inList)})}, lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_h, L_names)}, lazy(function(L_func){return resolve(L_chainApply)(L_func, L_t, L_names)}))})}))}));
  };
  var partial = function(L_inList) {
    var _1 = function(L_names) {
            return full(L_inList, L_names);
          };
          _1.leisureInfo = {arg: L_inList, name: main.leisureName};
          return _1;
  };
  main = function(L_inList, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_inList, L_names);
    } else if (typeof L_names == "undefined" || L_names == null) {
      return partial(L_inList);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("blockStarts")(0)("blockStarts = cons '\\\\' (cons '\\\\\\\\' (cons '\\\\@' nil))")(function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)("\\\\", function(){return resolve(L_cons)("\\@", L_nil)})})})},
 function(){return resolve(L_newDefine)("chainApply")(3)("chainApply func list names = withCons list func \\argItem rest .\n  and (isToken argItem) (contains blockStarts (tokenString argItem))\n    ifNotErr (createAst nil list names) \\arg . apply func arg\n    ifNotErr (createAst nil argItem names) \\arg . chainApply (apply func arg) rest names")(lazy((function () {
  var main;
  var full = function (L_func, L_list, L_names) {
    return resolve(L_withCons)(L_list, L_func, lazy(function(L_argItem){return $F(arguments, function(L_rest){return resolve(L_and)(function(){return resolve(L_isToken)(L_argItem)}, function(){return resolve(L_contains)(L_blockStarts, function(){return resolve(L_tokenString)(L_argItem)})})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_list, L_names)}, lazy(function(L_arg){return resolve(L_apply)(L_func, L_arg)}))})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_argItem, L_names)}, lazy(function(L_arg){return resolve(L_chainApply)(function(){return resolve(L_apply)(L_func, L_arg)}, L_rest, L_names)}))})})}));
  };
  var partial = function(L_func) {
    var _1 = function(L_list) {
            var _2 = function(L_names) {
              return full(L_func, L_list, L_names);
            };
            _2.leisureInfo = {arg: L_list, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_func, name: main.leisureName};
          return _1;
  };
  main = function(L_func, L_list, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_func, L_list, L_names);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_func);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("cleanTokens")(3)("cleanTokens start toks cont = isToken toks\n  cont (tokenString toks)\n  withCons toks (cont toks) \\head tail .\n    cleanTokens start head \\head .\n      cleanTokens start tail \\tail .\n        cont (cons head tail)")(lazy((function () {
  var main;
  var full = function (L_start, L_toks, L_cont) {
    return resolve(L_isToken)(L_toks)(function(){return resolve(L_cont)(function(){return resolve(L_tokenString)(L_toks)})})(function(){return resolve(L_withCons)(L_toks, function(){return resolve(L_cont)(L_toks)}, lazy(function(L_head){return $F(arguments, function(L_tail){return resolve(L_cleanTokens)(L_start, L_head, lazy(function(L_head_0){return resolve(L_cleanTokens)(L_start, L_tail, lazy(function(L_tail_1){return resolve(L_cont)(function(){return resolve(L_cons)(L_head_0, L_tail_1)})}))}))})}))});
  };
  var partial = function(L_start) {
    var _1 = function(L_toks) {
            var _2 = function(L_cont) {
              return full(L_start, L_toks, L_cont);
            };
            _2.leisureInfo = {arg: L_toks, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_toks, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_toks, L_cont);
    } else if (typeof L_toks == "undefined" || L_toks == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createLet")(3)("createLet start list names = withCons list\n  parseErr \"No variable or body for let \" (loc start)\n  \\binding body . eq body nil (createAst nil binding names)\n    ifNotErr (getLetNames start list names) \\newNames .\n      createSublets start binding body newNames")(lazy((function () {
  var main;
  var full = function (L_start, L_list, L_names) {
    return resolve(L_withCons)(L_list, function(){return resolve(L_parseErr)("No variable or body for let ", function(){return resolve(L_loc)(L_start)})}, lazy(function(L_binding){return $F(arguments, function(L_body){return resolve(L_eq)(L_body)(L_nil)(function(){return resolve(L_createAst)(L_nil, L_binding, L_names)})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_getLetNames)(L_start, L_list, L_names)}, lazy(function(L_newNames){return resolve(L_createSublets)(L_start, L_binding, L_body, L_newNames)}))})})}));
  };
  var partial = function(L_start) {
    var _1 = function(L_list) {
            var _2 = function(L_names) {
              return full(L_start, L_list, L_names);
            };
            _2.leisureInfo = {arg: L_list, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_list, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_list, L_names);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("getLetNames")(3)("getLetNames start list names = \\\\\n  err = parseErr \"Let expected binding \" (loc start)\n  .\n  withCons list names \\binding body .\n    isTokenString binding '.' names\n      withParens binding err \\start end def .\n        withCons def err \\name rest .\n          withToken name err \\str pos .\n            getLetNames start body (cons str names)")(lazy((function () {
  var main;
  var full = function (L_start, L_list, L_names) {
    return (function(){
  var L_err_0;
  L_err_0 = function(){return resolve(L_parseErr)("Let expected binding ", function(){return resolve(L_loc)(L_start)})};

  return resolve(L_withCons)(L_list, L_names, lazy(function(L_binding){return $F(arguments, function(L_body){return resolve(L_isTokenString)(L_binding, ".")(L_names)(function(){return resolve(L_withParens)(L_binding, L_err_0, lazy(function(L_start){return $F(arguments, function(L_end){return $F(arguments, function(L_def){return resolve(L_withCons)(L_def, L_err_0, lazy(function(L_name){return $F(arguments, function(L_rest){return resolve(L_withToken)(L_name, L_err_0, lazy(function(L_str){return $F(arguments, function(L_pos){return resolve(L_getLetNames)(L_start, L_body, function(){return resolve(L_cons)(L_str, L_names)})})}))})}))})})}))})})}))})();
  };
  var partial = function(L_start) {
    var _1 = function(L_list) {
            var _2 = function(L_names) {
              return full(L_start, L_list, L_names);
            };
            _2.leisureInfo = {arg: L_list, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_list, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_list, L_names);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createSublets")(4)("createSublets start binding body names =\n  isTokenString binding '.' (createAst nil body names)\n    withCons body (parseErr \"Let expected a body \" (loc start)) \\bodyH bodyT .\n      ifNotErr (getNameAndDef (parensStart binding) (parensContent binding) names) \\res . res \\name def .\n        ifNotErr (createSublets start bodyH bodyT names) \\bodyAst .\n          let (tokenString name) def bodyAst nilRange")(lazy((function () {
  var main;
  var full = function (L_start, L_binding, L_body, L_names) {
    return resolve(L_isTokenString)(L_binding, ".")(function(){return resolve(L_createAst)(L_nil, L_body, L_names)})(function(){return resolve(L_withCons)(L_body, function(){return resolve(L_parseErr)("Let expected a body ", function(){return resolve(L_loc)(L_start)})}, lazy(function(L_bodyH){return $F(arguments, function(L_bodyT){return resolve(L_ifNotErr)(function(){return resolve(L_getNameAndDef)(function(){return resolve(L_parensStart)(L_binding)}, function(){return resolve(L_parensContent)(L_binding)}, L_names)}, lazy(function(L_res){return resolve(L_res)(lazy(function(L_name){return $F(arguments, function(L_def){return resolve(L_ifNotErr)(function(){return resolve(L_createSublets)(L_start, L_bodyH, L_bodyT, L_names)}, lazy(function(L_bodyAst){return resolve(L_let)(function(){return resolve(L_tokenString)(L_name)}, L_def, L_bodyAst, L_nilRange)}))})}))}))})}))});
  };
  var partial = function(L_start) {
    var _1 = function(L_binding) {
            var _2 = function(L_body) {
              var _3 = function(L_names) {
                return full(L_start, L_binding, L_body, L_names);
              };
              _3.leisureInfo = {arg: L_body, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_binding, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_start, name: main.leisureName};
          return _1;
  };
  main = function(L_start, L_binding, L_body, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_start, L_binding, L_body, L_names);
    } else if (typeof L_binding == "undefined" || L_binding == null) {
      return partial(L_start);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("getNameAndDef")(3)("getNameAndDef pos binding names =\n  withCons (tail binding) (parseErr \"Let expected binding at \" pos) \\snd sndT .\n    isTokenString snd '=' (ifNotErr (createAst nil sndT names) \\def . cons (head binding) def)\n      ifNotErr (getLetLambda pos (tail binding) nil names) \\lamb . cons (head binding) lamb")(lazy((function () {
  var main;
  var full = function (L_pos, L_binding, L_names) {
    return resolve(L_withCons)(function(){return resolve(L_tail)(L_binding)}, function(){return resolve(L_parseErr)("Let expected binding at ", L_pos)}, lazy(function(L_snd){return $F(arguments, function(L_sndT){return resolve(L_isTokenString)(L_snd, "=")(function(){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_sndT, L_names)}, lazy(function(L_def){return resolve(L_cons)(function(){return resolve(L_head)(L_binding)}, L_def)}))})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_getLetLambda)(L_pos, function(){return resolve(L_tail)(L_binding)}, L_nil, L_names)}, lazy(function(L_lamb){return resolve(L_cons)(function(){return resolve(L_head)(L_binding)}, L_lamb)}))})})}));
  };
  var partial = function(L_pos) {
    var _1 = function(L_binding) {
            var _2 = function(L_names) {
              return full(L_pos, L_binding, L_names);
            };
            _2.leisureInfo = {arg: L_binding, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_pos, name: main.leisureName};
          return _1;
  };
  main = function(L_pos, L_binding, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_pos, L_binding, L_names);
    } else if (typeof L_binding == "undefined" || L_binding == null) {
      return partial(L_pos);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("getLetLambda")(4)("getLetLambda pos def args names =\n  withCons def (parseErr \"Let expected binding at \" pos) \\arg rest .\n    not (isToken arg) (parseErr \"Let expected binding at \" pos)\n      isTokenString arg '='\n        createAst nil (cons (token '\\\\' pos) (append (reverse args) (cons (token '.' (position arg)) rest))) names\n        getLetLambda pos rest (cons arg args) names")(lazy((function () {
  var main;
  var full = function (L_pos, L_def, L_args, L_names) {
    return resolve(L_withCons)(L_def, function(){return resolve(L_parseErr)("Let expected binding at ", L_pos)}, lazy(function(L_arg){return $F(arguments, function(L_rest){return resolve(L_not)(function(){return resolve(L_isToken)(L_arg)})(function(){return resolve(L_parseErr)("Let expected binding at ", L_pos)})(function(){return resolve(L_isTokenString)(L_arg, "=")(function(){return resolve(L_createAst)(L_nil, function(){return resolve(L_cons)(function(){return resolve(L_token)("\\", L_pos)}, function(){return resolve(L_append)(function(){return resolve(L_reverse)(L_args)}, function(){return resolve(L_cons)(function(){return resolve(L_token)(".", function(){return resolve(L_position)(L_arg)})}, L_rest)})})}, L_names)})(function(){return resolve(L_getLetLambda)(L_pos, L_rest, function(){return resolve(L_cons)(L_arg, L_args)}, L_names)})})})}));
  };
  var partial = function(L_pos) {
    var _1 = function(L_def) {
            var _2 = function(L_args) {
              var _3 = function(L_names) {
                return full(L_pos, L_def, L_args, L_names);
              };
              _3.leisureInfo = {arg: L_args, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_def, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_pos, name: main.leisureName};
          return _1;
  };
  main = function(L_pos, L_def, L_args, L_names, more) {
    if (L_names && (typeof more == "undefined" || more == null)) {
      return full(L_pos, L_def, L_args, L_names);
    } else if (typeof L_def == "undefined" || L_def == null) {
      return partial(L_pos);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("scanLineG")(5)("scanLineG str pat groups onDef onExpr = countedScanLineG emptyLineStarts str pat groups nil onDef onExpr")(lazy((function () {
  var main;
  var full = function (L_str, L_pat, L_groups, L_onDef, L_onExpr) {
    return resolve(L_countedScanLineG)(L_emptyLineStarts, L_str, L_pat, L_groups, L_nil, L_onDef, L_onExpr);
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            var _2 = function(L_groups) {
              var _3 = function(L_onDef) {
                var _4 = function(L_onExpr) {
                  return full(L_str, L_pat, L_groups, L_onDef, L_onExpr);
                };
                _4.leisureInfo = {arg: L_onDef, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_groups, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_pat, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, L_groups, L_onDef, L_onExpr, more) {
    if (L_onExpr && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat, L_groups, L_onDef, L_onExpr);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("countedScanLineG")(7)("countedScanLineG lineStarts str pat groups props onDef onExpr = \\\\\n  toks = countedTokens lineStarts str pat\n  groupToks = foldr (\\el value . el \\h t . cons h (cons t value)) (cons '=' blockStarts) groups\n  .\n  # check if it's a definition\n  find (\\tok . or (contains groupToks (tokenString tok)) (isCons (strMatch (tokenString tok) '^\\r?\\n'))) toks (\\item . isTokenString item '=') false\n    toks \\name rest . \\\\\n      parseIt func = \\\\\n        parsed = parseToks (checkSetDataType func rest name) groups\n        .\n        onDef (ifNotErr parsed \\list . createDef list name (arity rest 0) str props)\n      .\n      isTokenString (head rest) '='\n        isTokenString (head (tail rest)) '\\\\'\n          parseIt (setTypeAnno (tail rest) (tokenString name))\n          parseIt (tail rest)\n        ifNotErr (transformDef name rest) \\def .\n          parseIt (cons (token '\\\\' (addFilepos (position (head rest)) -1)) def)\n    ifNotErr (parseToks toks groups) \\list . onExpr list")(lazy((function () {
  var main;
  var full = function (L_lineStarts, L_str, L_pat, L_groups, L_props, L_onDef, L_onExpr) {
    return (function(){
  var L_toks_0, L_groupToks_1;
  L_toks_0 = function(){return resolve(L_countedTokens)(L_lineStarts, L_str, L_pat)};
  L_groupToks_1 = function(){return resolve(L_foldr)(lazy(function(L_el){return $F(arguments, function(L_value){return resolve(L_el)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(L_t, L_value)})})}))})}), function(){return resolve(L_cons)("=", L_blockStarts)}, L_groups)};

  return resolve(L_find)(lazy(function(L_tok){return resolve(L_or)(function(){return resolve(L_contains)(L_groupToks_1, function(){return resolve(L_tokenString)(L_tok)})}, function(){return resolve(L_isCons)(function(){return resolve(L_strMatch)(function(){return resolve(L_tokenString)(L_tok)}, "^\r?\n")})})}), L_toks_0)(lazy(function(L_item){return resolve(L_isTokenString)(L_item, "=")}))(L_false)(function(){return resolve(L_toks_0)(lazy(function(L_name){return $F(arguments, function(L_rest){return (function(){
  var L_parseIt_2;
  L_parseIt_2 = function(){return function(L_func){return (function(){
  var L_parsed_2;
  L_parsed_2 = function(){return resolve(L_parseToks)(function(){return resolve(L_checkSetDataType)(L_func, L_rest, L_name)}, L_groups)};

  return resolve(L_onDef)(function(){return resolve(L_ifNotErr)(L_parsed_2, lazy(function(L_list){return resolve(L_createDef)(L_list, L_name, function(){return resolve(L_arity)(L_rest, 0)}, L_str, L_props)}))})})()}};

  return resolve(L_isTokenString)(function(){return resolve(L_head)(L_rest)}, "=")(function(){return resolve(L_isTokenString)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_rest)})}, "\\")(function(){return resolve(L_parseIt_2)(function(){return resolve(L_setTypeAnno)(function(){return resolve(L_tail)(L_rest)}, function(){return resolve(L_tokenString)(L_name)})})})(function(){return resolve(L_parseIt_2)(function(){return resolve(L_tail)(L_rest)})})})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_transformDef)(L_name, L_rest)}, lazy(function(L_def){return resolve(L_parseIt_2)(function(){return resolve(L_cons)(function(){return resolve(L_token)("\\", function(){return resolve(L_addFilepos)(function(){return resolve(L_position)(function(){return resolve(L_head)(L_rest)})}, -1)})}, L_def)})}))})})()})}))})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_parseToks)(L_toks_0, L_groups)}, lazy(function(L_list){return resolve(L_onExpr)(L_list)}))})})();
  };
  var partial = function(L_lineStarts) {
    var _1 = function(L_str) {
            var _2 = function(L_pat) {
              var _3 = function(L_groups) {
                var _4 = function(L_props) {
                  var _5 = function(L_onDef) {
                    var _6 = function(L_onExpr) {
                      return full(L_lineStarts, L_str, L_pat, L_groups, L_props, L_onDef, L_onExpr);
                    };
                    _6.leisureInfo = {arg: L_onDef, parent: _5.leisureInfo};
                    return _6;
                  };
                  _5.leisureInfo = {arg: L_props, parent: _4.leisureInfo};
                  return _5;
                };
                _4.leisureInfo = {arg: L_groups, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_pat, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_str, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_lineStarts, name: main.leisureName};
          return _1;
  };
  main = function(L_lineStarts, L_str, L_pat, L_groups, L_props, L_onDef, L_onExpr, more) {
    if (L_onExpr && (typeof more == "undefined" || more == null)) {
      return full(L_lineStarts, L_str, L_pat, L_groups, L_props, L_onDef, L_onExpr);
    } else if (typeof L_str == "undefined" || L_str == null) {
      return partial(L_lineStarts);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseLineG")(6)("parseLineG str pat names groups onDef onExpr = \\\\\n  astCallback cb = \\list . ifNotErr (createAst nil list names) \\ast . cb ast\n  .\n  scanLineG str pat groups (astCallback onDef) (astCallback onExpr)")(lazy((function () {
  var main;
  var full = function (L_str, L_pat, L_names, L_groups, L_onDef, L_onExpr) {
    return (function(){
  var L_astCallback_0;
  L_astCallback_0 = function(){return function(L_cb){return $F(arguments, function(L_list){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(L_nil, L_list, L_names)}, lazy(function(L_ast){return resolve(L_cb)(L_ast)}))})}};

  return resolve(L_scanLineG)(L_str, L_pat, L_groups, function(){return resolve(L_astCallback_0)(L_onDef)}, function(){return resolve(L_astCallback_0)(L_onExpr)})})();
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            var _2 = function(L_names) {
              var _3 = function(L_groups) {
                var _4 = function(L_onDef) {
                  var _5 = function(L_onExpr) {
                    return full(L_str, L_pat, L_names, L_groups, L_onDef, L_onExpr);
                  };
                  _5.leisureInfo = {arg: L_onDef, parent: _4.leisureInfo};
                  return _5;
                };
                _4.leisureInfo = {arg: L_groups, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_names, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_pat, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, L_names, L_groups, L_onDef, L_onExpr, more) {
    if (L_onExpr && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat, L_names, L_groups, L_onDef, L_onExpr);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("transformDef")(2)("transformDef name toks = withCons toks (parseErr \"Bad definition, expecting tokens\" (loc name)) \\h t .\n  isTokenString h '='\n    isTokenString (head t) '\\\\'\n      cons (token '.' (position h)) (setTypeAnno t (tokenString name))\n      cons (token '.' (position h)) t\n    ifNotErr (transformDef name t) \\list . cons h list")(lazy((function () {
  var main;
  var full = function (L_name, L_toks) {
    return resolve(L_withCons)(L_toks, function(){return resolve(L_parseErr)("Bad definition, expecting tokens", function(){return resolve(L_loc)(L_name)})}, lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_isTokenString)(L_h, "=")(function(){return resolve(L_isTokenString)(function(){return resolve(L_head)(L_t)}, "\\")(function(){return resolve(L_cons)(function(){return resolve(L_token)(".", function(){return resolve(L_position)(L_h)})}, function(){return resolve(L_setTypeAnno)(L_t, function(){return resolve(L_tokenString)(L_name)})})})(function(){return resolve(L_cons)(function(){return resolve(L_token)(".", function(){return resolve(L_position)(L_h)})}, L_t)})})(function(){return resolve(L_ifNotErr)(function(){return resolve(L_transformDef)(L_name, L_t)}, lazy(function(L_list){return resolve(L_cons)(L_h, L_list)}))})})}));
  };
  var partial = function(L_name) {
    var _1 = function(L_toks) {
            return full(L_name, L_toks);
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_toks, more) {
    if (L_toks && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_toks);
    } else if (typeof L_toks == "undefined" || L_toks == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("setTypeAnno")(2)("setTypeAnno toks name = \\\\\n  tok = \\str . token str (position toks)\n  .\n  cons (tok '\\\\@') (cons (tok 'type') (cons (tok name) (cons (tok '.') toks)))")(lazy((function () {
  var main;
  var full = function (L_toks, L_name) {
    return (function(){
  var L_tok_0;
  L_tok_0 = function(){return function(L_str){return resolve(L_token)(L_str, function(){return resolve(L_position)(L_toks)})}};

  return resolve(L_cons)(function(){return resolve(L_tok_0)("\\@")}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)("type")}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)(L_name)}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)(".")}, L_toks)})})})})();
  };
  var partial = function(L_toks) {
    var _1 = function(L_name) {
            return full(L_toks, L_name);
          };
          _1.leisureInfo = {arg: L_toks, name: main.leisureName};
          return _1;
  };
  main = function(L_toks, L_name, more) {
    if (L_name && (typeof more == "undefined" || more == null)) {
      return full(L_toks, L_name);
    } else if (typeof L_name == "undefined" || L_name == null) {
      return partial(L_toks);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("setDataTypeAnno")(2)("setDataTypeAnno toks name = \\\\\n  tok = \\str . token str (position toks)\n  .\n  cons (tok '\\\\@') (cons (tok 'dataType') (cons (tok (tokenString name)) (cons (tok '.') toks)))")(lazy((function () {
  var main;
  var full = function (L_toks, L_name) {
    return (function(){
  var L_tok_0;
  L_tok_0 = function(){return function(L_str){return resolve(L_token)(L_str, function(){return resolve(L_position)(L_toks)})}};

  return resolve(L_cons)(function(){return resolve(L_tok_0)("\\@")}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)("dataType")}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)(function(){return resolve(L_tokenString)(L_name)})}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)(".")}, L_toks)})})})})();
  };
  var partial = function(L_toks) {
    var _1 = function(L_name) {
            return full(L_toks, L_name);
          };
          _1.leisureInfo = {arg: L_toks, name: main.leisureName};
          return _1;
  };
  main = function(L_toks, L_name, more) {
    if (L_name && (typeof more == "undefined" || more == null)) {
      return full(L_toks, L_name);
    } else if (typeof L_name == "undefined" || L_name == null) {
      return partial(L_toks);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("createDef")(5)("createDef def name arity src props = \\\\\n  #tok str = token str (position def)\n  tok str = token str (position name)\n  .\n  jsonStringify (tokenString name) (\\err . parseErr (strCat (cons \"Bad function name \" (cons (loc name) nil))) err) \\nameStr .\n    jsonStringify src (\\err . parseErr (strCat (cons \"Bad source \" (cons (loc name) nil))) err) \\srcStr .\n      #cons '\\\\@' (cons 'leisureName' (cons (tokenString name) (cons '.' (cons (tok 'define') (cons (tok nameStr) (cons (tok (strString arity)) (cons (tok srcStr) (cons (spliceFuncProps arity props def) nil))))))))\n      cons '\\\\@' (cons 'leisureName' (cons (tokenString name) (cons '.' (cons (tok 'newDefine') (cons (tok nameStr) (cons (tok (strString arity)) (cons (tok srcStr) (cons '\\\\@' (cons 'arity' (cons arity (cons '.' (cons (spliceFuncProps arity props def) nil))))))))))))")(lazy((function () {
  var main;
  var full = function (L_def, L_name, L_arity, L_src, L_props) {
    return (function(){
  var L_tok_0;
  L_tok_0 = function(){return function(L_str){return resolve(L_token)(L_str, function(){return resolve(L_position)(L_name)})}};

  return resolve(L_jsonStringify)(function(){return resolve(L_tokenString)(L_name)})(lazy(function(L_err){return resolve(L_parseErr)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("Bad function name ", function(){return resolve(L_cons)(function(){return resolve(L_loc)(L_name)}, L_nil)})})}, L_err)}))(lazy(function(L_nameStr){return resolve(L_jsonStringify)(L_src)(lazy(function(L_err){return resolve(L_parseErr)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)("Bad source ", function(){return resolve(L_cons)(function(){return resolve(L_loc)(L_name)}, L_nil)})})}, L_err)}))(lazy(function(L_srcStr){return resolve(L_cons)("\\@", function(){return resolve(L_cons)("leisureName", function(){return resolve(L_cons)(function(){return resolve(L_tokenString)(L_name)}, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_tok_0)("newDefine")}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)(L_nameStr)}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)(function(){return resolve(L_strString)(L_arity)})}, function(){return resolve(L_cons)(function(){return resolve(L_tok_0)(L_srcStr)}, function(){return resolve(L_cons)("\\@", function(){return resolve(L_cons)("arity", function(){return resolve(L_cons)(L_arity, function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(function(){return resolve(L_spliceFuncProps)(L_arity, L_props, L_def)}, L_nil)})})})})})})})})})})})})}))}))})();
  };
  var partial = function(L_def) {
    var _1 = function(L_name) {
            var _2 = function(L_arity) {
              var _3 = function(L_src) {
                var _4 = function(L_props) {
                  return full(L_def, L_name, L_arity, L_src, L_props);
                };
                _4.leisureInfo = {arg: L_src, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_arity, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_name, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_def, name: main.leisureName};
          return _1;
  };
  main = function(L_def, L_name, L_arity, L_src, L_props, more) {
    if (L_props && (typeof more == "undefined" || more == null)) {
      return full(L_def, L_name, L_arity, L_src, L_props);
    } else if (typeof L_name == "undefined" || L_name == null) {
      return partial(L_def);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("spliceFuncProps")(3)("spliceFuncProps arity props ast = or (isNil props) (== arity 0)\n  ast\n  subSpliceFuncProps props ast")(lazy((function () {
  var main;
  var full = function (L_arity, L_props, L_ast) {
    return resolve(L_or)(function(){return resolve(L_isNil)(L_props)}, function(){return resolve(L_$p$p)(L_arity)(0)})(L_ast)(function(){return resolve(L_subSpliceFuncProps)(L_props, L_ast)});
  };
  var partial = function(L_arity) {
    var _1 = function(L_props) {
            var _2 = function(L_ast) {
              return full(L_arity, L_props, L_ast);
            };
            _2.leisureInfo = {arg: L_props, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_arity, name: main.leisureName};
          return _1;
  };
  main = function(L_arity, L_props, L_ast, more) {
    if (L_ast && (typeof more == "undefined" || more == null)) {
      return full(L_arity, L_props, L_ast);
    } else if (typeof L_props == "undefined" || L_props == null) {
      return partial(L_arity);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("subSpliceFuncProps")(2)("subSpliceFuncProps props ast = \\\\\n  slash = head ast\n  var = head (tail ast)\n  afterVar = tail (tail ast)\n  dot = head afterVar\n  body = tail afterVar\n  .\n  isTokenString slash '\\\\'\n    cons\n      slash\n      cons\n        var\n        isTokenString dot '.'\n          cons dot (addProps props body)\n          cons '.' (addProps props afterVar)\n    cons\n      head ast\n      subSpliceFuncProps props (tail ast)")(lazy((function () {
  var main;
  var full = function (L_props, L_ast) {
    return (function(){
  var L_slash_0, L_var_1, L_afterVar_2, L_dot_3, L_body_4;
  L_slash_0 = function(){return resolve(L_head)(L_ast)};
  L_var_1 = function(){return resolve(L_head)(function(){return resolve(L_tail)(L_ast)})};
  L_afterVar_2 = function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_ast)})};
  L_dot_3 = function(){return resolve(L_head)(L_afterVar_2)};
  L_body_4 = function(){return resolve(L_tail)(L_afterVar_2)};

  return resolve(L_isTokenString)(L_slash_0, "\\")(function(){return resolve(L_cons)(L_slash_0, function(){return resolve(L_cons)(L_var_1, function(){return resolve(L_isTokenString)(L_dot_3, ".")(function(){return resolve(L_cons)(L_dot_3, function(){return resolve(L_addProps)(L_props, L_body_4)})})(function(){return resolve(L_cons)(".", function(){return resolve(L_addProps)(L_props, L_afterVar_2)})})})})})(function(){return resolve(L_cons)(function(){return resolve(L_head)(L_ast)}, function(){return resolve(L_subSpliceFuncProps)(L_props, function(){return resolve(L_tail)(L_ast)})})})})();
  };
  var partial = function(L_props) {
    var _1 = function(L_ast) {
            return full(L_props, L_ast);
          };
          _1.leisureInfo = {arg: L_props, name: main.leisureName};
          return _1;
  };
  main = function(L_props, L_ast, more) {
    if (L_ast && (typeof more == "undefined" || more == null)) {
      return full(L_props, L_ast);
    } else if (typeof L_ast == "undefined" || L_ast == null) {
      return partial(L_props);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("addProps")(2)("addProps props ast = foldr\n  \\prop result . cons '\\\\@' (cons (head prop) (cons (tail prop) (cons '.' result)))\n  ast\n  props")(lazy((function () {
  var main;
  var full = function (L_props, L_ast) {
    return resolve(L_foldr)(lazy(function(L_prop){return $F(arguments, function(L_result){return resolve(L_cons)("\\@", function(){return resolve(L_cons)(function(){return resolve(L_head)(L_prop)}, function(){return resolve(L_cons)(function(){return resolve(L_tail)(L_prop)}, function(){return resolve(L_cons)(".", L_result)})})})})}), L_ast, L_props);
  };
  var partial = function(L_props) {
    var _1 = function(L_ast) {
            return full(L_props, L_ast);
          };
          _1.leisureInfo = {arg: L_props, name: main.leisureName};
          return _1;
  };
  main = function(L_props, L_ast, more) {
    if (L_ast && (typeof more == "undefined" || more == null)) {
      return full(L_props, L_ast);
    } else if (typeof L_ast == "undefined" || L_ast == null) {
      return partial(L_props);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("checkSetDataType")(3)("checkSetDataType toks curToks name = withCons curToks toks \\h t .\n  isTokenString h '='\n    isTokenString (head t) '\\\\'\n      setDataTypeAnno toks name\n      toks\n    checkSetDataType toks t name")(lazy((function () {
  var main;
  var full = function (L_toks, L_curToks, L_name) {
    return resolve(L_withCons)(L_curToks, L_toks, lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_isTokenString)(L_h, "=")(function(){return resolve(L_isTokenString)(function(){return resolve(L_head)(L_t)}, "\\")(function(){return resolve(L_setDataTypeAnno)(L_toks, L_name)})(L_toks)})(function(){return resolve(L_checkSetDataType)(L_toks, L_t, L_name)})})}));
  };
  var partial = function(L_toks) {
    var _1 = function(L_curToks) {
            var _2 = function(L_name) {
              return full(L_toks, L_curToks, L_name);
            };
            _2.leisureInfo = {arg: L_curToks, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_toks, name: main.leisureName};
          return _1;
  };
  main = function(L_toks, L_curToks, L_name, more) {
    if (L_name && (typeof more == "undefined" || more == null)) {
      return full(L_toks, L_curToks, L_name);
    } else if (typeof L_curToks == "undefined" || L_curToks == null) {
      return partial(L_toks);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("arity")(2)("arity toks n = isTokenString (head toks) '=' n (arity (tail toks) (+ n 1))")(lazy((function () {
  var main;
  var full = function (L_toks, L_n) {
    return resolve(L_isTokenString)(function(){return resolve(L_head)(L_toks)}, "=")(L_n)(function(){return resolve(L_arity)(function(){return resolve(L_tail)(L_toks)}, function(){return resolve(L_$o)(L_n)(1)})});
  };
  var partial = function(L_toks) {
    var _1 = function(L_n) {
            return full(L_toks, L_n);
          };
          _1.leisureInfo = {arg: L_toks, name: main.leisureName};
          return _1;
  };
  main = function(L_toks, L_n, more) {
    if (L_n && (typeof more == "undefined" || more == null)) {
      return full(L_toks, L_n);
    } else if (typeof L_n == "undefined" || L_n == null) {
      return partial(L_toks);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("tokListStr")(1)("tokListStr toks = jsonStringify (join (map (\\t . tokenString t) toks) ' ')")(lazy(function(L_toks){return resolve(L_jsonStringify)(function(){return resolve(L_join)(function(){return resolve(L_map)(lazy(function(L_t){return resolve(L_tokenString)(L_t)}), L_toks)}, " ")})}))},
 function(){return resolve(L_newDefine)("linePat")(0)("linePat = regexp '\\\\r?\\\\n(?=[^ ]|$)'")(function(){return resolve(L_regexp)("\\r?\\n(?=[^ ]|$)")})},
 function(){return resolve(L_newDefine)("emptyLinePat")(0)("emptyLinePat = regexp '(^[ \\\\i]*\\\\#.*|^[ \\\\i]*$|^\\\\r?\\\\n[ \\\\i]*$)'")(function(){return resolve(L_regexp)("(^[ \\i]*\\#.*|^[ \\i]*$|^\\r?\\n[ \\i]*$)")})},
 function(){return resolve(L_newDefine)("lineScrub")(0)("lineScrub = regexpFlags '\\\\r\\\\n' 'g'")(function(){return resolve(L_regexpFlags)("\\r\\n", "g")})},
 function(){return resolve(L_newDefine)("linesForFile")(1)("linesForFile text = map tail (countedLinesForFile \"NOTHING.lsr\" text)")(lazy(function(L_text){return resolve(L_map)(L_tail, function(){return resolve(L_countedLinesForFile)("NOTHING.lsr", L_text)})}))},
 function(){return resolve(L_newDefine)("countedLinesForFile")(2)("countedLinesForFile name text = filter\n  \\line . isNil (strMatch (tail line) emptyLinePat)\n  countedLines name 1 text")(lazy((function () {
  var main;
  var full = function (L_name, L_text) {
    return resolve(L_filter)(lazy(function(L_line){return resolve(L_isNil)(function(){return resolve(L_strMatch)(function(){return resolve(L_tail)(L_line)}, L_emptyLinePat)})}), function(){return resolve(L_countedLines)(L_name, 1, L_text)});
  };
  var partial = function(L_name) {
    var _1 = function(L_text) {
            return full(L_name, L_text);
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_text, more) {
    if (L_text && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_text);
    } else if (typeof L_text == "undefined" || L_text == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("countedLines")(3)("countedLines filename lineOffset str = \\\\\n  m = strMatch str linePat\n  idx = head (tail (tail m))\n  chunk = strSubstring str 0 idx\n  next = + idx (strLen (head m))\n  chunkLines = findLines 0 chunk\n  .\n  eq str ''\n    nil\n    isNil m\n      cons (cons (cons filename (cons lineOffset (tail (findLines 0 str)))) str) nil\n      cons (cons (cons filename (cons lineOffset (tail chunkLines))) chunk)\n        countedLines filename (+ lineOffset (length chunkLines)) (strSubstring str next 0)")(lazy((function () {
  var main;
  var full = function (L_filename, L_lineOffset, L_str) {
    return (function(){
  var L_m_0, L_idx_1, L_chunk_2, L_next_3, L_chunkLines_4;
  L_m_0 = function(){return resolve(L_strMatch)(L_str, L_linePat)};
  L_idx_1 = function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_m_0)})})};
  L_chunk_2 = function(){return resolve(L_strSubstring)(L_str, 0, L_idx_1)};
  L_next_3 = function(){return resolve(L_$o)(L_idx_1)(function(){return resolve(L_strLen)(function(){return resolve(L_head)(L_m_0)})})};
  L_chunkLines_4 = function(){return resolve(L_findLines)(0, L_chunk_2)};

  return resolve(L_eq)(L_str)("")(L_nil)(function(){return resolve(L_isNil)(L_m_0)(function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_filename, function(){return resolve(L_cons)(L_lineOffset, function(){return resolve(L_tail)(function(){return resolve(L_findLines)(0, L_str)})})})}, L_str)}, L_nil)})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_filename, function(){return resolve(L_cons)(L_lineOffset, function(){return resolve(L_tail)(L_chunkLines_4)})})}, L_chunk_2)}, function(){return resolve(L_countedLines)(L_filename, function(){return resolve(L_$o)(L_lineOffset)(function(){return resolve(L_length)(L_chunkLines_4)})}, function(){return resolve(L_strSubstring)(L_str, L_next_3, 0)})})})})})();
  };
  var partial = function(L_filename) {
    var _1 = function(L_lineOffset) {
            var _2 = function(L_str) {
              return full(L_filename, L_lineOffset, L_str);
            };
            _2.leisureInfo = {arg: L_lineOffset, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_filename, name: main.leisureName};
          return _1;
  };
  main = function(L_filename, L_lineOffset, L_str, more) {
    if (L_str && (typeof more == "undefined" || more == null)) {
      return full(L_filename, L_lineOffset, L_str);
    } else if (typeof L_lineOffset == "undefined" || L_lineOffset == null) {
      return partial(L_filename);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("defPat")(0)("defPat = regexp '^[^ =]+.* =( |$)'")(function(){return resolve(L_regexp)("^[^ =]+.* =( |$)")})},
 function(){return resolve(L_newDefine)("unanchoredDefPat")(0)("unanchoredDefPat = regexp '^((?:\\\\s*\\\\n|#[^\\\\n]*\\\\n)*)([^=\\\\n]*)(=\\\\([^=]+=|=)?'")(function(){return resolve(L_regexp)("^((?:\\s*\\n|#[^\\n]*\\n)*)([^=\\n]*)(=\\([^=]+=|=)?")})},
 function(){return resolve(L_newDefine)("namesForLines")(1)("namesForLines lines = foldl\n  \\result line . \\\\\n    m = strMatch line defPat\n    .\n    isNil m result (cons (head (tail m)) result)\n  nil\n  lines")(lazy(function(L_lines){return resolve(L_foldl)(lazy(function(L_result){return $F(arguments, function(L_line){return (function(){
  var L_m_0;
  L_m_0 = function(){return resolve(L_strMatch)(L_line, L_defPat)};

  return resolve(L_isNil)(L_m_0)(L_result)(function(){return resolve(L_cons)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_m_0)})}, L_result)})})()})}), L_nil, L_lines)}))},
 function(){return resolve(L_newDefine)("runParseFilters")(2)("runParseFilters filters line = filters\n  \\h t D . bind (h line) \\filtered . runParseFilters t filtered\n  line")(lazy((function () {
  var main;
  var full = function (L_filters, L_line) {
    return resolve(L_filters)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_bind)(function(){return resolve(L_h)(L_line)})(lazy(function(L_filtered){return resolve(L_runParseFilters)(L_t, L_filtered)}))})})}))(L_line);
  };
  var partial = function(L_filters) {
    var _1 = function(L_line) {
            return full(L_filters, L_line);
          };
          _1.leisureInfo = {arg: L_filters, name: main.leisureName};
          return _1;
  };
  main = function(L_filters, L_line, more) {
    if (L_line && (typeof more == "undefined" || more == null)) {
      return full(L_filters, L_line);
    } else if (typeof L_line == "undefined" || L_line == null) {
      return partial(L_filters);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("isBlockStart")(1)("isBlockStart tok = and\n  or (isToken tok) (isString tok)\n  contains blockStarts (strTokenString tok)")(lazy(function(L_tok){return resolve(L_and)(function(){return resolve(L_or)(function(){return resolve(L_isToken)(L_tok)}, function(){return resolve(L_isString)(L_tok)})}, function(){return resolve(L_contains)(L_blockStarts, function(){return resolve(L_strTokenString)(L_tok)})})}))},
 function(){return resolve(L_newDefine)("macroSub")(2)("macroSub macs expr = postProcessMacro (emptyFor expr) (emptyFor expr) (baseMacroSub macs expr)")(lazy((function () {
  var main;
  var full = function (L_macs, L_expr) {
    return resolve(L_postProcessMacro)(function(){return resolve(L_emptyFor)(L_expr)}, function(){return resolve(L_emptyFor)(L_expr)}, function(){return resolve(L_baseMacroSub)(L_macs, L_expr)});
  };
  var partial = function(L_macs) {
    var _1 = function(L_expr) {
            return full(L_macs, L_expr);
          };
          _1.leisureInfo = {arg: L_macs, name: main.leisureName};
          return _1;
  };
  main = function(L_macs, L_expr, more) {
    if (L_expr && (typeof more == "undefined" || more == null)) {
      return full(L_macs, L_expr);
    } else if (typeof L_expr == "undefined" || L_expr == null) {
      return partial(L_macs);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("consifyMacroValue")(1)("consifyMacroValue value = isCons value value (cons value nil)")(lazy(function(L_value){return resolve(L_isCons)(L_value)(L_value)(function(){return resolve(L_cons)(L_value, L_nil)})}))},
 function(){return resolve(L_newDefine)("baseMacroSub")(2)("baseMacroSub macs expr = isToken expr\n  expr\n  isParens expr\n    expr \\start end content . \\\\\n      result = baseMacroSub macs content\n      .\n      isToken result result (parens start end result)\n    withCons expr expr \\h t .\n      isBlockStart h\n        cons h\n          isTokenString h '\\\\\\\\'\n            macroSubLet macs t\n            macroSubBody '.' macs t\n        withToken h\n          \\\\\n            subH = baseMacroSub macs h\n            .\n            withToken subH\n              cons subH (map (baseMacroSub macs) t)\n              \\tok pos . baseMacroSub macs (cons subH t)\n          \\tok pos . assoc tok macs\n            \\def . baseMacroSub macs (def t)\n            cons h (map (baseMacroSub macs) t)")(lazy((function () {
  var main;
  var full = function (L_macs, L_expr) {
    return resolve(L_isToken)(L_expr)(L_expr)(function(){return resolve(L_isParens)(L_expr)(function(){return resolve(L_expr)(lazy(function(L_start){return $F(arguments, function(L_end){return $F(arguments, function(L_content){return (function(){
  var L_result_0;
  L_result_0 = function(){return resolve(L_baseMacroSub)(L_macs, L_content)};

  return resolve(L_isToken)(L_result_0)(L_result_0)(function(){return resolve(L_parens)(L_start, L_end, L_result_0)})})()})})}))})(function(){return resolve(L_withCons)(L_expr, L_expr, lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_isBlockStart)(L_h)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_isTokenString)(L_h, "\\\\")(function(){return resolve(L_macroSubLet)(L_macs, L_t)})(function(){return resolve(L_macroSubBody)(".", L_macs, L_t)})})})(function(){return resolve(L_withToken)(L_h, function(){return(function(){
  var L_subH_0;
  L_subH_0 = function(){return resolve(L_baseMacroSub)(L_macs, L_h)};

  return resolve(L_withToken)(L_subH_0, function(){return resolve(L_cons)(L_subH_0, function(){return resolve(L_map)(function(){return resolve(L_baseMacroSub)(L_macs)}, L_t)})}, lazy(function(L_tok){return $F(arguments, function(L_pos){return resolve(L_baseMacroSub)(L_macs, function(){return resolve(L_cons)(L_subH_0, L_t)})})}))})();}, lazy(function(L_tok){return $F(arguments, function(L_pos){return resolve(L_assoc)(L_tok, L_macs)(lazy(function(L_def){return resolve(L_baseMacroSub)(L_macs, function(){return resolve(L_def)(L_t)})}))(function(){return resolve(L_cons)(L_h, function(){return resolve(L_map)(function(){return resolve(L_baseMacroSub)(L_macs)}, L_t)})})})}))})})}))})});
  };
  var partial = function(L_macs) {
    var _1 = function(L_expr) {
            return full(L_macs, L_expr);
          };
          _1.leisureInfo = {arg: L_macs, name: main.leisureName};
          return _1;
  };
  main = function(L_macs, L_expr, more) {
    if (L_expr && (typeof more == "undefined" || more == null)) {
      return full(L_macs, L_expr);
    } else if (typeof L_expr == "undefined" || L_expr == null) {
      return partial(L_macs);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("macroSubLet")(2)("macroSubLet macs list = list\n  \\h t D . isTokenString h '.'\n    cons h (baseMacroSub macs t)\n    cons (setParens h \\content . macroSubBody '=' macs content) (macroSubLet macs t)\n  # Don't bother with parse errors at this point -- ast generator will detect them\n  nil")(lazy((function () {
  var main;
  var full = function (L_macs, L_list) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_isTokenString)(L_h, ".")(function(){return resolve(L_cons)(L_h, function(){return resolve(L_baseMacroSub)(L_macs, L_t)})})(function(){return resolve(L_cons)(function(){return resolve(L_setParens)(L_h, lazy(function(L_content){return resolve(L_macroSubBody)("=", L_macs, L_content)}))}, function(){return resolve(L_macroSubLet)(L_macs, L_t)})})})})}))(L_nil);
  };
  var partial = function(L_macs) {
    var _1 = function(L_list) {
            return full(L_macs, L_list);
          };
          _1.leisureInfo = {arg: L_macs, name: main.leisureName};
          return _1;
  };
  main = function(L_macs, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_macs, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_macs);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("macroSubBody")(3)("macroSubBody char macs list = list\n  \\h t D . cons h\n    isTokenString h char baseMacroSub (macroSubBody char)\n      macs\n      t\n  nil")(lazy((function () {
  var main;
  var full = function (L_char, L_macs, L_list) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_cons)(L_h, function(){return resolve(L_isTokenString)(L_h, L_char)(L_baseMacroSub)(function(){return resolve(L_macroSubBody)(L_char)})(L_macs)(L_t)})})})}))(L_nil);
  };
  var partial = function(L_char) {
    var _1 = function(L_macs) {
            var _2 = function(L_list) {
              return full(L_char, L_macs, L_list);
            };
            _2.leisureInfo = {arg: L_macs, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_char, name: main.leisureName};
          return _1;
  };
  main = function(L_char, L_macs, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_char, L_macs, L_list);
    } else if (typeof L_macs == "undefined" || L_macs == null) {
      return partial(L_char);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("postProcessMacro")(3)("postProcessMacro before after expr = isString expr\n  token expr (isEmptyPos after before after)\n  isParens expr\n    expr \\start end contents . parens start end (postProcessMacro start end contents)\n    isCons expr\n      expr \\h t .\n        isToken h\n          cons h (postProcessMacro (addFilepos (addFilepos (tokenFilepos h) (strLen (tokenString h))) 1) (emptyFor h) t)\n          \\\\\n            posStart = position h\n            posEnd = position t\n            t2 = postProcessMacro (emptyFor posStart) after t\n            h2 = postProcessMacro before (emptyFor posStart) h\n            .\n            isEmptyPos posStart\n              cons (postProcessMacro before (position t2) h) t2\n              cons h2 (postProcessMacro (addFilepos (lexEnd h2) 1) after t)\n      isNumber expr\n        token (strString expr) (isEmptyPos after before after)\n        expr")(lazy((function () {
  var main;
  var full = function (L_before, L_after, L_expr) {
    return resolve(L_isString)(L_expr)(function(){return resolve(L_token)(L_expr, function(){return resolve(L_isEmptyPos)(L_after)(L_before)(L_after)})})(function(){return resolve(L_isParens)(L_expr)(function(){return resolve(L_expr)(lazy(function(L_start){return $F(arguments, function(L_end){return $F(arguments, function(L_contents){return resolve(L_parens)(L_start, L_end, function(){return resolve(L_postProcessMacro)(L_start, L_end, L_contents)})})})}))})(function(){return resolve(L_isCons)(L_expr)(function(){return resolve(L_expr)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_isToken)(L_h)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_postProcessMacro)(function(){return resolve(L_addFilepos)(function(){return resolve(L_addFilepos)(function(){return resolve(L_tokenFilepos)(L_h)}, function(){return resolve(L_strLen)(function(){return resolve(L_tokenString)(L_h)})})}, 1)}, function(){return resolve(L_emptyFor)(L_h)}, L_t)})})(function(){return(function(){
  var L_posStart_0, L_posEnd_1, L_t2_2, L_h2_3;
  L_posStart_0 = function(){return resolve(L_position)(L_h)};
  L_posEnd_1 = function(){return resolve(L_position)(L_t)};
  L_t2_2 = function(){return resolve(L_postProcessMacro)(function(){return resolve(L_emptyFor)(L_posStart_0)}, L_after, L_t)};
  L_h2_3 = function(){return resolve(L_postProcessMacro)(L_before, function(){return resolve(L_emptyFor)(L_posStart_0)}, L_h)};

  return resolve(L_isEmptyPos)(L_posStart_0)(function(){return resolve(L_cons)(function(){return resolve(L_postProcessMacro)(L_before, function(){return resolve(L_position)(L_t2_2)}, L_h)}, L_t2_2)})(function(){return resolve(L_cons)(L_h2_3, function(){return resolve(L_postProcessMacro)(function(){return resolve(L_addFilepos)(function(){return resolve(L_lexEnd)(L_h2_3)}, 1)}, L_after, L_t)})})})();})})}))})(function(){return resolve(L_isNumber)(L_expr)(function(){return resolve(L_token)(function(){return resolve(L_strString)(L_expr)}, function(){return resolve(L_isEmptyPos)(L_after)(L_before)(L_after)})})(L_expr)})})});
  };
  var partial = function(L_before) {
    var _1 = function(L_after) {
            var _2 = function(L_expr) {
              return full(L_before, L_after, L_expr);
            };
            _2.leisureInfo = {arg: L_after, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_before, name: main.leisureName};
          return _1;
  };
  main = function(L_before, L_after, L_expr, more) {
    if (L_expr && (typeof more == "undefined" || more == null)) {
      return full(L_before, L_after, L_expr);
    } else if (typeof L_after == "undefined" || L_after == null) {
      return partial(L_before);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("defMacro")(2)("defMacro name def = bind (getValue 'macroDefs') \\macs . setValue 'macroDefs' (acons name def macs)")(lazy((function () {
  var main;
  var full = function (L_name, L_def) {
    return resolve(L_bind)(function(){return resolve(L_getValue)("macroDefs")})(lazy(function(L_macs){return resolve(L_setValue)("macroDefs")(function(){return resolve(L_acons)(L_name, L_def, L_macs)})}));
  };
  var partial = function(L_name) {
    var _1 = function(L_def) {
            return full(L_name, L_def);
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_def, more) {
    if (L_def && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_def);
    } else if (typeof L_def == "undefined" || L_def == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("delimiterListPrefix")(0)("delimiterListPrefix = \"\\\"(?:\\\\\\\\.|[^\\\"])*\\\"|'(?:\\\\\\\\.|[^'])*'|\\\\r?\\\\n *|#.*| +\"")("\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|\\r?\\n *|#.*| +")},
 function(){return resolve(L_newDefine)("regexpEscapePat")(0)("regexpEscapePat = regexpFlags '[\\\\-\\\\[\\\\]/\\\\{\\\\}\\\\(\\\\)\\\\*\\\\+\\\\?\\\\.\\\\\\\\\\\\^\\\\$\\\\|]' 'g'")(function(){return resolve(L_regexpFlags)("[\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]", "g")})},
 function(){return resolve(L_newDefine)("addToken")(1)("addToken del = bind (getValue 'tokenList')\n  \\dels . contains dels del\n    false\n    \\\\\n      newDels = insertSorted (\\a b . > (strLen a) (strLen b)) del dels\n      .\n      bind (setValue 'tokenList' newDels)\n        \\_ . computeTokenPat newDels")(lazy(function(L_del){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenList")})(lazy(function(L_dels){return resolve(L_contains)(L_dels, L_del)(L_false)(function(){return(function(){
  var L_newDels_0;
  L_newDels_0 = function(){return resolve(L_insertSorted)(lazy(function(L_a){return $F(arguments, function(L_b){return resolve(L_$z)(function(){return resolve(L_strLen)(L_a)})(function(){return resolve(L_strLen)(L_b)})})}), L_del, L_dels)};

  return resolve(L_bind)(function(){return resolve(L_setValue)("tokenList")(L_newDels_0)})(lazy(function(L__){return resolve(L_computeTokenPat)(L_newDels_0)}))})();})}))}))},
 function(){return resolve(L_newDefine)("computeTokenPat")(1)("computeTokenPat dels = \\\\\n  delPats = map (\\item . strReplace item regexpEscapePat \"\\\\$&\") dels\n  newPat = strCat (cons '(' (cons (join (cons delimiterListPrefix delPats) '|') (cons ')' nil)))\n  .\n  setValue 'tokenPat' newPat")(lazy(function(L_dels){return (function(){
  var L_delPats_0, L_newPat_1;
  L_delPats_0 = function(){return resolve(L_map)(lazy(function(L_item){return resolve(L_strReplace)(L_item, L_regexpEscapePat, "\\$&")}), L_dels)};
  L_newPat_1 = function(){return resolve(L_strCat)(function(){return resolve(L_cons)("(", function(){return resolve(L_cons)(function(){return resolve(L_join)(function(){return resolve(L_cons)(L_delimiterListPrefix, L_delPats_0)}, "|")}, function(){return resolve(L_cons)(")", L_nil)})})})};

  return resolve(L_setValue)("tokenPat")(L_newPat_1)})()}))},
 function(){return resolve(L_newDefine)("addTokenGroup")(2)("addTokenGroup open close = bind (addToken open)\n  \\_ . bind (addToken close)\n    \\_ . bind (getValue 'tokenGroups')\n      \\gr . setValue 'tokenGroups' (acons open close gr)")(lazy((function () {
  var main;
  var full = function (L_open, L_close) {
    return resolve(L_bind)(function(){return resolve(L_addToken)(L_open)})(lazy(function(L__){return resolve(L_bind)(function(){return resolve(L_addToken)(L_close)})(lazy(function(L___0){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenGroups")})(lazy(function(L_gr){return resolve(L_setValue)("tokenGroups")(function(){return resolve(L_acons)(L_open, L_close, L_gr)})}))}))}));
  };
  var partial = function(L_open) {
    var _1 = function(L_close) {
            return full(L_open, L_close);
          };
          _1.leisureInfo = {arg: L_open, name: main.leisureName};
          return _1;
  };
  main = function(L_open, L_close, more) {
    if (L_close && (typeof more == "undefined" || more == null)) {
      return full(L_open, L_close);
    } else if (typeof L_close == "undefined" || L_close == null) {
      return partial(L_open);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parenGroups")(0)("parenGroups = acons '(' ')' nil")(function(){return resolve(L_acons)("(", ")", L_nil)})},
 function(){return resolve(L_newDefine)("testParse")(2)("testParse str pat = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil parenGroups) \\list . list \\h t . stripParens h")(lazy((function () {
  var main;
  var full = function (L_str, L_pat) {
    return resolve(L_ifNotErr)(function(){return resolve(L_parseIndent)(function(){return resolve(L_token)("\n", L_startFilePos)}, function(){return resolve(L_tokens)(L_str, L_pat)}, L_nil, L_parenGroups)}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_stripParens)(L_h)})}))}));
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            return full(L_str, L_pat);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, more) {
    if (L_pat && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseG")(3)("parseG str pat groups = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil groups) \\list . list \\h t . stripParens h")(lazy((function () {
  var main;
  var full = function (L_str, L_pat, L_groups) {
    return resolve(L_ifNotErr)(function(){return resolve(L_parseIndent)(function(){return resolve(L_token)("\n", L_startFilePos)}, function(){return resolve(L_tokens)(L_str, L_pat)}, L_nil, L_groups)}, lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_stripParens)(L_h)})}))}));
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            var _2 = function(L_groups) {
              return full(L_str, L_pat, L_groups);
            };
            _2.leisureInfo = {arg: L_pat, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, L_groups, more) {
    if (L_groups && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat, L_groups);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseToAst")(2)("parseToAst str pat = createAst nil (testParse str pat) nil")(lazy((function () {
  var main;
  var full = function (L_str, L_pat) {
    return resolve(L_createAst)(L_nil, function(){return resolve(L_testParse)(L_str, L_pat)}, L_nil);
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            return full(L_str, L_pat);
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, more) {
    if (L_pat && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseM")(1)("parseM str =\n  bind (getValue 'tokenPat')\n    \\tokPat . bind (getValue 'tokenGroups')\n      \\groups . parseG str tokPat groups")(lazy(function(L_str){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenPat")})(lazy(function(L_tokPat){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenGroups")})(lazy(function(L_groups){return resolve(L_parseG)(L_str, L_tokPat, L_groups)}))}))}))},
 function(){return resolve(L_newDefine)("scanLine")(4)("scanLine str pat onDef onExpr = scanLineG str pat parenGroups onDef onExpr")(lazy((function () {
  var main;
  var full = function (L_str, L_pat, L_onDef, L_onExpr) {
    return resolve(L_scanLineG)(L_str, L_pat, L_parenGroups, L_onDef, L_onExpr);
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            var _2 = function(L_onDef) {
              var _3 = function(L_onExpr) {
                return full(L_str, L_pat, L_onDef, L_onExpr);
              };
              _3.leisureInfo = {arg: L_onDef, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_pat, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, L_onDef, L_onExpr, more) {
    if (L_onExpr && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat, L_onDef, L_onExpr);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseLine")(5)("parseLine str pat names onDef onExpr = parseLineG str pat names parenGroups onDef onExpr")(lazy((function () {
  var main;
  var full = function (L_str, L_pat, L_names, L_onDef, L_onExpr) {
    return resolve(L_parseLineG)(L_str, L_pat, L_names, L_parenGroups, L_onDef, L_onExpr);
  };
  var partial = function(L_str) {
    var _1 = function(L_pat) {
            var _2 = function(L_names) {
              var _3 = function(L_onDef) {
                var _4 = function(L_onExpr) {
                  return full(L_str, L_pat, L_names, L_onDef, L_onExpr);
                };
                _4.leisureInfo = {arg: L_onDef, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_names, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_pat, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_str, name: main.leisureName};
          return _1;
  };
  main = function(L_str, L_pat, L_names, L_onDef, L_onExpr, more) {
    if (L_onExpr && (typeof more == "undefined" || more == null)) {
      return full(L_str, L_pat, L_names, L_onDef, L_onExpr);
    } else if (typeof L_pat == "undefined" || L_pat == null) {
      return partial(L_str);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseLineM")(1)("parseLineM str = bind (getValue 'tokenPat')\n  \\tokPat . bind (getValue 'tokenGroups')\n    \\groups . parseLineG str tokPat nil groups id id")(lazy(function(L_str){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenPat")})(lazy(function(L_tokPat){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenGroups")})(lazy(function(L_groups){return resolve(L_parseLineG)(L_str, L_tokPat, L_nil, L_groups, L_id, L_id)}))}))}))},
 function(){return resolve(L_newDefine)("macroSubM")(1)("macroSubM expr =\n  bind (getValue 'macroDefs')\n    \\macs . macroSub macs expr")(lazy(function(L_expr){return resolve(L_bind)(function(){return resolve(L_getValue)("macroDefs")})(lazy(function(L_macs){return resolve(L_macroSub)(L_macs, L_expr)}))}))},
 function(){return resolve(L_newDefine)("macroParse")(1)("macroParse str =\n  bind (parseM str)\n    \\ex . macroSubM ex")(lazy(function(L_str){return resolve(L_bind)(function(){return resolve(L_parseM)(L_str)})(lazy(function(L_ex){return resolve(L_macroSubM)(L_ex)}))}))},
 function(){return resolve(L_newDefine)("tokensM")(1)("tokensM str =\n  bind (getValue 'tokenPat')\n    \\delimiterPat . tokens str delimiterPat")(lazy(function(L_str){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenPat")})(lazy(function(L_delimiterPat){return resolve(L_tokens)(L_str, L_delimiterPat)}))}))},
 function(){return resolve(L_newDefine)("parseLines")(2)("parseLines lines result = lines\n  \\h t D . bind (parseLineM h)\n    \\ast . parseLines t (cons ast result)\n  reverse result")(lazy((function () {
  var main;
  var full = function (L_lines, L_result) {
    return resolve(L_lines)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_bind)(function(){return resolve(L_parseLineM)(L_h)})(lazy(function(L_ast){return resolve(L_parseLines)(L_t, function(){return resolve(L_cons)(L_ast, L_result)})}))})})}))(function(){return resolve(L_reverse)(L_result)});
  };
  var partial = function(L_lines) {
    var _1 = function(L_result) {
            return full(L_lines, L_result);
          };
          _1.leisureInfo = {arg: L_lines, name: main.leisureName};
          return _1;
  };
  main = function(L_lines, L_result, more) {
    if (L_result && (typeof more == "undefined" || more == null)) {
      return full(L_lines, L_result);
    } else if (typeof L_result == "undefined" || L_result == null) {
      return partial(L_lines);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("parseFile")(1)("parseFile text = parseLines (linesForFile text) nil")(lazy(function(L_text){return resolve(L_parseLines)(function(){return resolve(L_linesForFile)(L_text)}, L_nil)}))},
 function(){return resolve(L_newDefine)("simpleScanLine")(1)("simpleScanLine line = bind (getValue 'tokenPat')\n  \\tokenPat . bind (getValue 'tokenGroups')\n    \\groups . scanLineG line tokenPat groups id id")(lazy(function(L_line){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenPat")})(lazy(function(L_tokenPat){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenGroups")})(lazy(function(L_groups){return resolve(L_scanLineG)(L_line, L_tokenPat, L_groups, L_id, L_id)}))}))}))},
 function(){return resolve(L_newDefine)("scanLineM")(1)("scanLineM line = countedScanLineM emptyLineStarts line")(lazy(function(L_line){return resolve(L_countedScanLineM)(L_emptyLineStarts, L_line)}))},
 function(){return resolve(L_newDefine)("countedScanLineM")(2)("countedScanLineM lineStarts line = bind (getValue 'tokenPat')\n  \\tokenPat . bind (getValue 'tokenGroups')\n    \\groups . bind (getValue 'parseFilters')\n      \\filters . bind (getValue 'macroDefs')\n        \\macros . bind (getValue 'parser_funcProps')\n          \\props . bind (runParseFilters filters (countedScanLineG lineStarts line tokenPat groups props id id))\n            \\scanned . macroSub macros scanned")(lazy((function () {
  var main;
  var full = function (L_lineStarts, L_line) {
    return resolve(L_bind)(function(){return resolve(L_getValue)("tokenPat")})(lazy(function(L_tokenPat){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenGroups")})(lazy(function(L_groups){return resolve(L_bind)(function(){return resolve(L_getValue)("parseFilters")})(lazy(function(L_filters){return resolve(L_bind)(function(){return resolve(L_getValue)("macroDefs")})(lazy(function(L_macros){return resolve(L_bind)(function(){return resolve(L_getValue)("parser_funcProps")})(lazy(function(L_props){return resolve(L_bind)(function(){return resolve(L_runParseFilters)(L_filters, function(){return resolve(L_countedScanLineG)(L_lineStarts, L_line, L_tokenPat, L_groups, L_props, L_id, L_id)})})(lazy(function(L_scanned){return resolve(L_macroSub)(L_macros, L_scanned)}))}))}))}))}))}));
  };
  var partial = function(L_lineStarts) {
    var _1 = function(L_line) {
            return full(L_lineStarts, L_line);
          };
          _1.leisureInfo = {arg: L_lineStarts, name: main.leisureName};
          return _1;
  };
  main = function(L_lineStarts, L_line, more) {
    if (L_line && (typeof more == "undefined" || more == null)) {
      return full(L_lineStarts, L_line);
    } else if (typeof L_line == "undefined" || L_line == null) {
      return partial(L_lineStarts);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("newline")(0)("newline = regexp '\\\\r?\\\\n'")(function(){return resolve(L_regexp)("\\r?\\n")})},
 function(){return resolve(L_newDefine)("findLines")(2)("findLines offset line = \\\\\n  m = strMatch line newline\n  idx = + 1 (head (tail (tail m)))\n  .\n  eq m nil\n    cons offset nil\n    cons offset (findLines (+ offset idx) (strSubstring line idx 0))")(lazy((function () {
  var main;
  var full = function (L_offset, L_line) {
    return (function(){
  var L_m_0, L_idx_1;
  L_m_0 = function(){return resolve(L_strMatch)(L_line, L_newline)};
  L_idx_1 = function(){return resolve(L_$o)(1)(function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_m_0)})})})};

  return resolve(L_eq)(L_m_0)(L_nil)(function(){return resolve(L_cons)(L_offset, L_nil)})(function(){return resolve(L_cons)(L_offset, function(){return resolve(L_findLines)(function(){return resolve(L_$o)(L_offset)(L_idx_1)}, function(){return resolve(L_strSubstring)(L_line, L_idx_1, 0)})})})})();
  };
  var partial = function(L_offset) {
    var _1 = function(L_line) {
            return full(L_offset, L_line);
          };
          _1.leisureInfo = {arg: L_offset, name: main.leisureName};
          return _1;
  };
  main = function(L_offset, L_line, more) {
    if (L_line && (typeof more == "undefined" || more == null)) {
      return full(L_offset, L_line);
    } else if (typeof L_line == "undefined" || L_line == null) {
      return partial(L_offset);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("newParseLine")(3)("newParseLine offset names line = bind (scanLineM line)\n  \\scanned . ifNotErr (createAst (cons \"NEWPARSE.lsr\" (findLines offset line)) scanned names) \\ast . ast")(lazy((function () {
  var main;
  var full = function (L_offset, L_names, L_line) {
    return resolve(L_bind)(function(){return resolve(L_scanLineM)(L_line)})(lazy(function(L_scanned){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(function(){return resolve(L_cons)("NEWPARSE.lsr", function(){return resolve(L_findLines)(L_offset, L_line)})}, L_scanned, L_names)}, lazy(function(L_ast){return resolve(L_ast)}))}));
  };
  var partial = function(L_offset) {
    var _1 = function(L_names) {
            var _2 = function(L_line) {
              return full(L_offset, L_names, L_line);
            };
            _2.leisureInfo = {arg: L_names, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_offset, name: main.leisureName};
          return _1;
  };
  main = function(L_offset, L_names, L_line, more) {
    if (L_line && (typeof more == "undefined" || more == null)) {
      return full(L_offset, L_names, L_line);
    } else if (typeof L_names == "undefined" || L_names == null) {
      return partial(L_offset);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("countedParseLine")(2)("countedParseLine names countedLine = bind (countedScanLineM (head countedLine) (tail countedLine))\n  \\scanned . ifNotErr (createAst (head countedLine) scanned names) \\ast . ast")(lazy((function () {
  var main;
  var full = function (L_names, L_countedLine) {
    return resolve(L_bind)(function(){return resolve(L_countedScanLineM)(function(){return resolve(L_head)(L_countedLine)}, function(){return resolve(L_tail)(L_countedLine)})})(lazy(function(L_scanned){return resolve(L_ifNotErr)(function(){return resolve(L_createAst)(function(){return resolve(L_head)(L_countedLine)}, L_scanned, L_names)}, lazy(function(L_ast){return resolve(L_ast)}))}));
  };
  var partial = function(L_names) {
    var _1 = function(L_countedLine) {
            return full(L_names, L_countedLine);
          };
          _1.leisureInfo = {arg: L_names, name: main.leisureName};
          return _1;
  };
  main = function(L_names, L_countedLine, more) {
    if (L_countedLine && (typeof more == "undefined" || more == null)) {
      return full(L_names, L_countedLine);
    } else if (typeof L_countedLine == "undefined" || L_countedLine == null) {
      return partial(L_names);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("runLine")(3)("runLine offset names line = bind (newParseLine offset names line)\n  \\ast . bind (runAst line ast)\n    \\result . cons\n      ast\n      isParseErr result\n        left (parseErrMsg result)\n        right result")(lazy((function () {
  var main;
  var full = function (L_offset, L_names, L_line) {
    return resolve(L_bind)(function(){return resolve(L_newParseLine)(L_offset, L_names, L_line)})(lazy(function(L_ast){return resolve(L_bind)(function(){return resolve(L_runAst)(L_line)(L_ast)})(lazy(function(L_result){return resolve(L_cons)(L_ast, function(){return resolve(L_isParseErr)(L_result)(function(){return resolve(L_left)(function(){return resolve(L_parseErrMsg)(L_result)})})(function(){return resolve(L_right)(L_result)})})}))}));
  };
  var partial = function(L_offset) {
    var _1 = function(L_names) {
            var _2 = function(L_line) {
              return full(L_offset, L_names, L_line);
            };
            _2.leisureInfo = {arg: L_names, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_offset, name: main.leisureName};
          return _1;
  };
  main = function(L_offset, L_names, L_line, more) {
    if (L_line && (typeof more == "undefined" || more == null)) {
      return full(L_offset, L_names, L_line);
    } else if (typeof L_names == "undefined" || L_names == null) {
      return partial(L_offset);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("countedRunLine")(3)("countedRunLine file names countedLine = bind (countedParseLine names countedLine)\n  \\ast . \\\\\n    wrapped = astFileWrap file ast\n    value = runAst (tail countedLine) wrapped\n    .\n    not (== (getType value) 'monad')\n      resultOfRun wrapped value\n      bind (runAst (tail countedLine) wrapped)\n        \\result . resultOfRun wrapped result")(lazy((function () {
  var main;
  var full = function (L_file, L_names, L_countedLine) {
    return resolve(L_bind)(function(){return resolve(L_countedParseLine)(L_names, L_countedLine)})(lazy(function(L_ast){return (function(){
  var L_wrapped_0, L_value_1;
  L_wrapped_0 = function(){return resolve(L_astFileWrap)(L_file, L_ast)};
  L_value_1 = function(){return resolve(L_runAst)(function(){return resolve(L_tail)(L_countedLine)})(L_wrapped_0)};

  return resolve(L_not)(function(){return resolve(L_$p$p)(function(){return resolve(L_getType)(L_value_1)})("monad")})(function(){return resolve(L_resultOfRun)(L_wrapped_0, L_value_1)})(function(){return resolve(L_bind)(function(){return resolve(L_runAst)(function(){return resolve(L_tail)(L_countedLine)})(L_wrapped_0)})(lazy(function(L_result){return resolve(L_resultOfRun)(L_wrapped_0, L_result)}))})})()}));
  };
  var partial = function(L_file) {
    var _1 = function(L_names) {
            var _2 = function(L_countedLine) {
              return full(L_file, L_names, L_countedLine);
            };
            _2.leisureInfo = {arg: L_names, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_file, name: main.leisureName};
          return _1;
  };
  main = function(L_file, L_names, L_countedLine, more) {
    if (L_countedLine && (typeof more == "undefined" || more == null)) {
      return full(L_file, L_names, L_countedLine);
    } else if (typeof L_names == "undefined" || L_names == null) {
      return partial(L_file);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("resultOfRun")(2)("resultOfRun wrapped result = cons\n  wrapped\n  isParseErr result\n    left (parseErrMsg result)\n    right result")(lazy((function () {
  var main;
  var full = function (L_wrapped, L_result) {
    return resolve(L_cons)(L_wrapped, function(){return resolve(L_isParseErr)(L_result)(function(){return resolve(L_left)(function(){return resolve(L_parseErrMsg)(L_result)})})(function(){return resolve(L_right)(L_result)})});
  };
  var partial = function(L_wrapped) {
    var _1 = function(L_result) {
            return full(L_wrapped, L_result);
          };
          _1.leisureInfo = {arg: L_wrapped, name: main.leisureName};
          return _1;
  };
  main = function(L_wrapped, L_result, more) {
    if (L_result && (typeof more == "undefined" || more == null)) {
      return full(L_wrapped, L_result);
    } else if (typeof L_result == "undefined" || L_result == null) {
      return partial(L_wrapped);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("astFileWrap")(2)("astFileWrap file ast = anno 'filename' (basename file) ast")(lazy((function () {
  var main;
  var full = function (L_file, L_ast) {
    return resolve(L_anno)("filename", function(){return resolve(L_basename)(L_file)}, L_ast);
  };
  var partial = function(L_file) {
    var _1 = function(L_ast) {
            return full(L_file, L_ast);
          };
          _1.leisureInfo = {arg: L_file, name: main.leisureName};
          return _1;
  };
  main = function(L_file, L_ast, more) {
    if (L_ast && (typeof more == "undefined" || more == null)) {
      return full(L_file, L_ast);
    } else if (typeof L_ast == "undefined" || L_ast == null) {
      return partial(L_file);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("basename")(1)("basename file = strReplace file (regexp '^(.*/)?([^/]+)$') '$2'")(lazy(function(L_file){return resolve(L_strReplace)(L_file, function(){return resolve(L_regexp)("^(.*/)?([^/]+)$")}, "$2")}))},
 function(){return resolve(L_newDefine)("runLines")(2)("runLines names lines = lines\n  \\h t D . bind (runLine 0 names h)\n    \\line . bind (runLines names t)\n      \\rest . cons line rest\n  nil")(lazy((function () {
  var main;
  var full = function (L_names, L_lines) {
    return resolve(L_lines)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_bind)(function(){return resolve(L_runLine)(0, L_names, L_h)})(lazy(function(L_line){return resolve(L_bind)(function(){return resolve(L_runLines)(L_names, L_t)})(lazy(function(L_rest){return resolve(L_cons)(L_line, L_rest)}))}))})})}))(L_nil);
  };
  var partial = function(L_names) {
    var _1 = function(L_lines) {
            return full(L_names, L_lines);
          };
          _1.leisureInfo = {arg: L_names, name: main.leisureName};
          return _1;
  };
  main = function(L_names, L_lines, more) {
    if (L_lines && (typeof more == "undefined" || more == null)) {
      return full(L_names, L_lines);
    } else if (typeof L_lines == "undefined" || L_lines == null) {
      return partial(L_names);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("countedRunLines")(3)("countedRunLines file names countedLines = countedLines\n  \\h t D . bind (countedRunLine file names h)\n    \\line . bind (countedRunLines file names t)\n      \\rest . cons line rest\n  nil")(lazy((function () {
  var main;
  var full = function (L_file, L_names, L_countedLines) {
    return resolve(L_countedLines)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_bind)(function(){return resolve(L_countedRunLine)(L_file, L_names, L_h)})(lazy(function(L_line){return resolve(L_bind)(function(){return resolve(L_countedRunLines)(L_file, L_names, L_t)})(lazy(function(L_rest){return resolve(L_cons)(L_line, L_rest)}))}))})})}))(L_nil);
  };
  var partial = function(L_file) {
    var _1 = function(L_names) {
            var _2 = function(L_countedLines) {
              return full(L_file, L_names, L_countedLines);
            };
            _2.leisureInfo = {arg: L_names, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_file, name: main.leisureName};
          return _1;
  };
  main = function(L_file, L_names, L_countedLines, more) {
    if (L_countedLines && (typeof more == "undefined" || more == null)) {
      return full(L_file, L_names, L_countedLines);
    } else if (typeof L_names == "undefined" || L_names == null) {
      return partial(L_file);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("runFile")(1)("runFile text = runNamedFile \"RUNFILE.lsr\" text")(lazy(function(L_text){return resolve(L_runNamedFile)("RUNFILE.lsr", L_text)}))},
 function(){return resolve(L_newDefine)("runNamedFile")(2)("runNamedFile name text = \\\\\n  counted = countedLinesForFile name text\n  lines = map tail counted\n  names = namesForLines lines\n  .\n  countedRunLines name names counted")(lazy((function () {
  var main;
  var full = function (L_name, L_text) {
    return (function(){
  var L_counted_0, L_lines_1, L_names_2;
  L_counted_0 = function(){return resolve(L_countedLinesForFile)(L_name, L_text)};
  L_lines_1 = function(){return resolve(L_map)(L_tail, L_counted_0)};
  L_names_2 = function(){return resolve(L_namesForLines)(L_lines_1)};

  return resolve(L_countedRunLines)(L_name, L_names_2, L_counted_0)})();
  };
  var partial = function(L_name) {
    var _1 = function(L_text) {
            return full(L_name, L_text);
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_text, more) {
    if (L_text && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_text);
    } else if (typeof L_text == "undefined" || L_text == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("baseLoad")(1)("baseLoad file = bind (readFile file)\n  \\result . result\n    \\err . err\n    \\contents . baseLoadString file contents")(lazy(function(L_file){return resolve(L_bind)(function(){return resolve(L_readFile)(L_file)})(lazy(function(L_result){return resolve(L_result)(lazy(function(L_err){return resolve(L_err)}))(lazy(function(L_contents){return resolve(L_baseLoadString)(L_file, L_contents)}))}))}))},
 function(){return resolve(L_newDefine)("baseLoadString")(2)("baseLoadString file contents = bind (getValue 'activeTokenPacks')\n  \\activePacks . bind resetStdTokenPacks\n    \\_ . bind resetNameSpaceInfo\n      \\nsInfo . bind (runNamedFile file contents)\n        \\result . bind (setNameSpaceInfo nsInfo)\n          \\_ . isNil activePacks\n            bind resetStdTokenPacks \\_ . result\n            bind (resetTokenPacks activePacks) \\_ . result")(lazy((function () {
  var main;
  var full = function (L_file, L_contents) {
    return resolve(L_bind)(function(){return resolve(L_getValue)("activeTokenPacks")})(lazy(function(L_activePacks){return resolve(L_bind)(L_resetStdTokenPacks)(lazy(function(L__){return resolve(L_bind)(L_resetNameSpaceInfo)(lazy(function(L_nsInfo){return resolve(L_bind)(function(){return resolve(L_runNamedFile)(L_file, L_contents)})(lazy(function(L_result){return resolve(L_bind)(function(){return resolve(L_setNameSpaceInfo)(L_nsInfo)})(lazy(function(L___0){return resolve(L_isNil)(L_activePacks)(function(){return resolve(L_bind)(L_resetStdTokenPacks)(lazy(function(L___1){return resolve(L_result)}))})(function(){return resolve(L_bind)(function(){return resolve(L_resetTokenPacks)(L_activePacks)})(lazy(function(L___1){return resolve(L_result)}))})}))}))}))}))}));
  };
  var partial = function(L_file) {
    var _1 = function(L_contents) {
            return full(L_file, L_contents);
          };
          _1.leisureInfo = {arg: L_file, name: main.leisureName};
          return _1;
  };
  main = function(L_file, L_contents, more) {
    if (L_contents && (typeof more == "undefined" || more == null)) {
      return full(L_file, L_contents);
    } else if (typeof L_contents == "undefined" || L_contents == null) {
      return partial(L_file);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("load")(1)("load file = bind (baseLoad file)\n  \\result . \\\\\n    errs = foldr (\\line results . tail line (\\er . cons er results) (\\x . results)) nil result\n    .\n    isNil errs\n      right true\n      left errs")(lazy(function(L_file){return resolve(L_bind)(function(){return resolve(L_baseLoad)(L_file)})(lazy(function(L_result){return (function(){
  var L_errs_0;
  L_errs_0 = function(){return resolve(L_foldr)(lazy(function(L_line){return $F(arguments, function(L_results){return resolve(L_tail)(L_line)(lazy(function(L_er){return resolve(L_cons)(L_er, L_results)}))(lazy(function(L_x){return resolve(L_results)}))})}), L_nil, L_result)};

  return resolve(L_isNil)(L_errs_0)(function(){return resolve(L_right)(L_true)})(function(){return resolve(L_left)(L_errs_0)})})()}))}))},
 function(){return resolve(L_newDefine)("require")(1)("require file = bind (getValue 'requiredFiles')\n  \\files . contains files file\n    right false\n    bind (setValue 'requiredFiles' (cons file files))\n      \\_. bind (load file)\n        \\result . result\n          \\x . left x\n          \\_ . right true")(lazy(function(L_file){return resolve(L_bind)(function(){return resolve(L_getValue)("requiredFiles")})(lazy(function(L_files){return resolve(L_contains)(L_files, L_file)(function(){return resolve(L_right)(L_false)})(function(){return resolve(L_bind)(function(){return resolve(L_setValue)("requiredFiles")(function(){return resolve(L_cons)(L_file, L_files)})})(lazy(function(L__){return resolve(L_bind)(function(){return resolve(L_load)(L_file)})(lazy(function(L_result){return resolve(L_result)(lazy(function(L_x){return resolve(L_left)(L_x)}))(lazy(function(L___0){return resolve(L_right)(L_true)}))}))}))})}))}))},
 function(){return resolve(L_newDefine)("scanFile")(1)("scanFile file = bind (readFile file)\n  \\result . result\n    \\err . err\n      \\_ . bind (runNamedFile file contents)\n        counted = countedLinesForFile name text\n        lines = map tail counted\n        names = namesForLines lines\n        .\n        countedScanLines name names counted")(lazy(function(L_file){return resolve(L_bind)(function(){return resolve(L_readFile)(L_file)})(lazy(function(L_result){return resolve(L_result)(lazy(function(L_err){return resolve(L_err)(lazy(function(L__){return resolve(L_bind)(function(){return resolve(L_runNamedFile)(L_file, L_contents)})(function(){return resolve(L_counted)(L_$p)(L_countedLinesForFile)(L_name)(L_text)})(function(){return resolve(L_lines)(L_$p)(L_map)(L_tail)(L_counted)})(function(){return resolve(L_names)(L_$p)(L_namesForLines)(L_lines)})(L_$B)(function(){return resolve(L_countedScanLines)(L_name, L_names, L_counted)})}))}))}))}))},
 function(){return resolve(L_newDefine)("countedScanLines")(3)("countedScanLines file names countedLines = countedLines\n  \\h t D . bind (countedScanLineM (head h) (tail h))\n    \\line . bind (countedScanLines file names t)\n      \\rest . cons line rest\n  nil")(lazy((function () {
  var main;
  var full = function (L_file, L_names, L_countedLines) {
    return resolve(L_countedLines)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_bind)(function(){return resolve(L_countedScanLineM)(function(){return resolve(L_head)(L_h)}, function(){return resolve(L_tail)(L_h)})})(lazy(function(L_line){return resolve(L_bind)(function(){return resolve(L_countedScanLines)(L_file, L_names, L_t)})(lazy(function(L_rest){return resolve(L_cons)(L_line, L_rest)}))}))})})}))(L_nil);
  };
  var partial = function(L_file) {
    var _1 = function(L_names) {
            var _2 = function(L_countedLines) {
              return full(L_file, L_names, L_countedLines);
            };
            _2.leisureInfo = {arg: L_names, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_file, name: main.leisureName};
          return _1;
  };
  main = function(L_file, L_names, L_countedLines, more) {
    if (L_countedLines && (typeof more == "undefined" || more == null)) {
      return full(L_file, L_names, L_countedLines);
    } else if (typeof L_names == "undefined" || L_names == null) {
      return partial(L_file);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("defTokenPack")(2)("defTokenPack name pack = bind (getValue 'tokenPacks')\n  \\packs . setValue 'tokenPacks' (acons name pack packs)")(lazy((function () {
  var main;
  var full = function (L_name, L_pack) {
    return resolve(L_bind)(function(){return resolve(L_getValue)("tokenPacks")})(lazy(function(L_packs){return resolve(L_setValue)("tokenPacks")(function(){return resolve(L_acons)(L_name, L_pack, L_packs)})}));
  };
  var partial = function(L_name) {
    var _1 = function(L_pack) {
            return full(L_name, L_pack);
          };
          _1.leisureInfo = {arg: L_name, name: main.leisureName};
          return _1;
  };
  main = function(L_name, L_pack, more) {
    if (L_pack && (typeof more == "undefined" || more == null)) {
      return full(L_name, L_pack);
    } else if (typeof L_pack == "undefined" || L_pack == null) {
      return partial(L_name);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("useTokenPack")(1)("useTokenPack name = bind (getValue 'tokenPacks')\n  \\packs . bind (getValue 'tokenGroups')\n    \\groups . bind (getValue 'tokenList')\n      \\tokens . bind (getValue 'activeTokenPacks')\n        \\activePacks . bind (getValue 'parseFilters')\n          \\filters . assoc name packs\n            \\pack . \\\\\n              groupToks = foldl (\\value el . el \\h t . cons h (cons t value)) nil (head (tail pack))\n              newToks = quicksort (\\a b . > (strLen a) (strLen b)) (append (head pack) (append groupToks tokens))\n              .\n              bind (setValue 'tokenList' newToks)\n                \\_ . bind (setValue 'tokenGroups' (appendAlist (head (tail pack)) groups))\n                  \\_ . bind (setValue 'parseFilters' (append filters (head (tail (tail pack)))))\n                    \\_ . bind (computeTokenPat newToks)\n                      \\_ . setValue 'activeTokenPacks' (cons name activePacks)\n            nil")(lazy(function(L_name){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenPacks")})(lazy(function(L_packs){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenGroups")})(lazy(function(L_groups){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenList")})(lazy(function(L_tokens){return resolve(L_bind)(function(){return resolve(L_getValue)("activeTokenPacks")})(lazy(function(L_activePacks){return resolve(L_bind)(function(){return resolve(L_getValue)("parseFilters")})(lazy(function(L_filters){return resolve(L_assoc)(L_name, L_packs)(lazy(function(L_pack){return (function(){
  var L_groupToks_0, L_newToks_1;
  L_groupToks_0 = function(){return resolve(L_foldl)(lazy(function(L_value){return $F(arguments, function(L_el){return resolve(L_el)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(L_t, L_value)})})}))})}), L_nil, function(){return resolve(L_head)(function(){return resolve(L_tail)(L_pack)})})};
  L_newToks_1 = function(){return resolve(L_quicksort)(lazy(function(L_a){return $F(arguments, function(L_b){return resolve(L_$z)(function(){return resolve(L_strLen)(L_a)})(function(){return resolve(L_strLen)(L_b)})})}), function(){return resolve(L_append)(function(){return resolve(L_head)(L_pack)}, function(){return resolve(L_append)(L_groupToks_0, L_tokens)})})};

  return resolve(L_bind)(function(){return resolve(L_setValue)("tokenList")(L_newToks_1)})(lazy(function(L__){return resolve(L_bind)(function(){return resolve(L_setValue)("tokenGroups")(function(){return resolve(L_appendAlist)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_pack)})}, L_groups)})})(lazy(function(L___2){return resolve(L_bind)(function(){return resolve(L_setValue)("parseFilters")(function(){return resolve(L_append)(L_filters, function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_pack)})})})})})(lazy(function(L___3){return resolve(L_bind)(function(){return resolve(L_computeTokenPat)(L_newToks_1)})(lazy(function(L___4){return resolve(L_setValue)("activeTokenPacks")(function(){return resolve(L_cons)(L_name, L_activePacks)})}))}))}))}))})()}))(L_nil)}))}))}))}))}))}))},
 function(){return resolve(L_newDefine)("resetTokenPacks")(1)("resetTokenPacks packs = bind (setValue 'tokenGroups' nil)\n  \\_ . bind (setValue 'tokenList' nil)\n    \\_ . bind (setValue 'activeTokenPacks' nil)\n      \\_ . bind (setValue 'parseFilters' nil)\n        \\_ . foldr1\n          \\packCmd result . bind packCmd \\_ . result\n          map useTokenPack packs")(lazy(function(L_packs){return resolve(L_bind)(function(){return resolve(L_setValue)("tokenGroups")(L_nil)})(lazy(function(L__){return resolve(L_bind)(function(){return resolve(L_setValue)("tokenList")(L_nil)})(lazy(function(L___0){return resolve(L_bind)(function(){return resolve(L_setValue)("activeTokenPacks")(L_nil)})(lazy(function(L___1){return resolve(L_bind)(function(){return resolve(L_setValue)("parseFilters")(L_nil)})(lazy(function(L___2){return resolve(L_foldr1)(lazy(function(L_packCmd){return $F(arguments, function(L_result){return resolve(L_bind)(L_packCmd)(lazy(function(L___3){return resolve(L_result)}))})}), function(){return resolve(L_map)(L_useTokenPack, L_packs)})}))}))}))}))}))},
 function(){return resolve(L_newDefine)("resetStdTokenPacks")(0)("resetStdTokenPacks = bind (getValue 'stdTokenPacks')\n  \\stds . bind (resetTokenPacks stds)\n    \\_ . setValue 'activeTokenPacks' nil")(function(){return resolve(L_bind)(function(){return resolve(L_getValue)("stdTokenPacks")})(lazy(function(L_stds){return resolve(L_bind)(function(){return resolve(L_resetTokenPacks)(L_stds)})(lazy(function(L__){return resolve(L_setValue)("activeTokenPacks")(L_nil)}))}))})},
 function(){return resolve(L_newDefine)("addStdTokenPacks")(1)("addStdTokenPacks morePacks = bind (getValue 'stdTokenPacks')\n  \\stds . setValue 'stdTokenPacks' (append stds morePacks)")(lazy(function(L_morePacks){return resolve(L_bind)(function(){return resolve(L_getValue)("stdTokenPacks")})(lazy(function(L_stds){return resolve(L_setValue)("stdTokenPacks")(function(){return resolve(L_append)(L_stds, L_morePacks)})}))}))},
 function(){return resolve(L_newDefine)("addParseFilter")(1)("addParseFilter filt = bind (getValue 'parseFilters')\n  \\filters . setValue 'parseFilters' (append filters (cons filt nil))")(lazy(function(L_filt){return resolve(L_bind)(function(){return resolve(L_getValue)("parseFilters")})(lazy(function(L_filters){return resolve(L_setValue)("parseFilters")(function(){return resolve(L_append)(L_filters, function(){return resolve(L_cons)(L_filt, L_nil)})})}))}))},
 function(){return resolve(L_newDefine)("d")(3)("d label value expr = log (strCat (cons label (cons value nil))) expr")(lazy((function () {
  var main;
  var full = function (L_label, L_value, L_expr) {
    return resolve(L_log)(function(){return resolve(L_strCat)(function(){return resolve(L_cons)(L_label, function(){return resolve(L_cons)(L_value, L_nil)})})})(L_expr);
  };
  var partial = function(L_label) {
    var _1 = function(L_value) {
            var _2 = function(L_expr) {
              return full(L_label, L_value, L_expr);
            };
            _2.leisureInfo = {arg: L_value, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_label, name: main.leisureName};
          return _1;
  };
  main = function(L_label, L_value, L_expr, more) {
    if (L_expr && (typeof more == "undefined" || more == null)) {
      return full(L_label, L_value, L_expr);
    } else if (typeof L_value == "undefined" || L_value == null) {
      return partial(L_label);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("dd")(2)("dd label arg = d label arg arg")(lazy((function () {
  var main;
  var full = function (L_label, L_arg) {
    return resolve(L_d)(L_label, L_arg, L_arg);
  };
  var partial = function(L_label) {
    var _1 = function(L_arg) {
            return full(L_label, L_arg);
          };
          _1.leisureInfo = {arg: L_label, name: main.leisureName};
          return _1;
  };
  main = function(L_label, L_arg, more) {
    if (L_arg && (typeof more == "undefined" || more == null)) {
      return full(L_label, L_arg);
    } else if (typeof L_arg == "undefined" || L_arg == null) {
      return partial(L_label);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_setValue)("macroDefs")(L_nil)},
 function(){return resolve(L_setValue)("requiredFiles")(L_nil)},
 function(){return resolve(L_setValue)("tokenPacks")(L_nil)},
 function(){return resolve(L_setValue)("activeTokenPacks")(L_nil)},
 function(){return resolve(L_setValue)("stdTokenPacks")(function(){return resolve(L_cons)("std", L_nil)})},
 function(){return resolve(L_setValue)("parser_funcProps")(L_nil)},
 function(){return resolve(L_defTokenPack)("std", function(){return resolve(L_cons)(function(){return resolve(L_cons)(".", function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)("\\\\", function(){return resolve(L_cons)("\\@", L_nil)})})})}, function(){return resolve(L_cons)(function(){return resolve(L_acons)("(", ")", L_nil)}, function(){return resolve(L_cons)(L_nil, L_nil)})})})},
 function(){return resolve(L_resetStdTokenPacks)},
 function(){return resolve(L_setNameSpace)("core")},
 function(){return resolve(L_newDefine)("doall")(0)("doall = foldr1 (\\el res . bind el \\_ . res)")(function(){return resolve(L_foldr1)(lazy(function(L_el){return $F(arguments, function(L_res){return resolve(L_bind)(L_el)(lazy(function(L__){return resolve(L_res)}))})}))})},
 function(){return resolve(L_newDefine)("aconsf")(3)("aconsf key value list = acons key value (aremove key list)")(lazy((function () {
  var main;
  var full = function (L_key, L_value, L_list) {
    return resolve(L_acons)(L_key, L_value, function(){return resolve(L_aremove)(L_key, L_list)});
  };
  var partial = function(L_key) {
    var _1 = function(L_value) {
            var _2 = function(L_list) {
              return full(L_key, L_value, L_list);
            };
            _2.leisureInfo = {arg: L_value, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_key, name: main.leisureName};
          return _1;
  };
  main = function(L_key, L_value, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_key, L_value, L_list);
    } else if (typeof L_value == "undefined" || L_value == null) {
      return partial(L_key);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("aremove")(2)("aremove key list = isNil list\n  nil\n  eq (head (head list)) key\n    aremove key (tail list)\n    aconsPair (head list) (aremove key (tail list))")(lazy((function () {
  var main;
  var full = function (L_key, L_list) {
    return resolve(L_isNil)(L_list)(L_nil)(function(){return resolve(L_eq)(function(){return resolve(L_head)(function(){return resolve(L_head)(L_list)})})(L_key)(function(){return resolve(L_aremove)(L_key, function(){return resolve(L_tail)(L_list)})})(function(){return resolve(L_aconsPair)(function(){return resolve(L_head)(L_list)}, function(){return resolve(L_aremove)(L_key, function(){return resolve(L_tail)(L_list)})})})});
  };
  var partial = function(L_key) {
    var _1 = function(L_list) {
            return full(L_key, L_list);
          };
          _1.leisureInfo = {arg: L_key, name: main.leisureName};
          return _1;
  };
  main = function(L_key, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_key, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_key);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_addTokenGroup)("[", "]")},
 function(){return resolve(L_addToken)("|")},
 function(){return resolve(L_newDefine)("listifyOp")(2)("listifyOp op list = list\n  \\h t D . isTokenString h '|'\n    cons t nil\n    cons (cons op (cons h (listifyOp op t))) nil\n  cons 'nil' nil")(lazy((function () {
  var main;
  var full = function (L_op, L_list) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){return resolve(L_cons)(L_t, L_nil)})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_op, function(){return resolve(L_cons)(L_h, function(){return resolve(L_listifyOp)(L_op, L_t)})})}, L_nil)})})})}))(function(){return resolve(L_cons)("nil", L_nil)});
  };
  var partial = function(L_op) {
    var _1 = function(L_list) {
            return full(L_op, L_list);
          };
          _1.leisureInfo = {arg: L_op, name: main.leisureName};
          return _1;
  };
  main = function(L_op, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_op, L_list);
    } else if (typeof L_list == "undefined" || L_list == null) {
      return partial(L_op);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("listify")(1)("listify list = listifyOp 'cons' list")(lazy(function(L_list){return resolve(L_listifyOp)("cons", L_list)}))},
 function(){return resolve(L_defMacro)("[", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_listify)(L_h)})}))}))},
 function(){return resolve(L_newDefine)("listFilter")(1)("listFilter code = bind (getValue 'listMacros')\n  \\listMacros . filterApplies code \\list . list \\h t .\n    and (isToken h) (contains listMacros (tokenString h))\n      listFilterTail list\n      list")(lazy(function(L_code){return resolve(L_bind)(function(){return resolve(L_getValue)("listMacros")})(lazy(function(L_listMacros){return resolve(L_filterApplies)(L_code, lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_and)(function(){return resolve(L_isToken)(L_h)}, function(){return resolve(L_contains)(L_listMacros, function(){return resolve(L_tokenString)(L_h)})})(function(){return resolve(L_listFilterTail)(L_list)})(L_list)})}))}))}))}))},
 function(){return resolve(L_newDefine)("listFilterTail")(1)("listFilterTail list = list\n  \\h t D . isTokenString h '|'\n    > (length t) 2\n      cons h (cons (removeLast t) (cons (last t) nil))\n      list\n    cons h (listFilterTail t)\n  nil")(lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){return resolve(L_$z)(function(){return resolve(L_length)(L_t)})(2)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_cons)(function(){return resolve(L_removeLast)(L_t)}, function(){return resolve(L_cons)(function(){return resolve(L_last)(L_t)}, L_nil)})})})(L_list)})(function(){return resolve(L_cons)(L_h, function(){return resolve(L_listFilterTail)(L_t)})})})})}))(L_nil)}))},
 function(){return resolve(L_newDefine)("filterApplies")(2)("filterApplies code func = isParens code\n  code \\start end contents . parens start end (filterApplies contents func)\n  isCons code\n    \\\\\n      filtered = filterApplyElements code func\n      .\n      and (isCons filtered) (isBlockStart (head filtered))\n        filtered\n        func filtered\n    code")(lazy((function () {
  var main;
  var full = function (L_code, L_func) {
    return resolve(L_isParens)(L_code)(function(){return resolve(L_code)(lazy(function(L_start){return $F(arguments, function(L_end){return $F(arguments, function(L_contents){return resolve(L_parens)(L_start, L_end, function(){return resolve(L_filterApplies)(L_contents, L_func)})})})}))})(function(){return resolve(L_isCons)(L_code)(function(){return(function(){
  var L_filtered_0;
  L_filtered_0 = function(){return resolve(L_filterApplyElements)(L_code, L_func)};

  return resolve(L_and)(function(){return resolve(L_isCons)(L_filtered_0)}, function(){return resolve(L_isBlockStart)(function(){return resolve(L_head)(L_filtered_0)})})(L_filtered_0)(function(){return resolve(L_func)(L_filtered_0)})})();})(L_code)});
  };
  var partial = function(L_code) {
    var _1 = function(L_func) {
            return full(L_code, L_func);
          };
          _1.leisureInfo = {arg: L_code, name: main.leisureName};
          return _1;
  };
  main = function(L_code, L_func, more) {
    if (L_func && (typeof more == "undefined" || more == null)) {
      return full(L_code, L_func);
    } else if (typeof L_func == "undefined" || L_func == null) {
      return partial(L_code);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("filterApplyElements")(2)("filterApplyElements code func = code\n  \\h t D . isBlockStart h\n    cons h (filterBlock h t func)\n    cons (filterApplies h func)\n      and (isCons t) (isBlockStart (head t))\n        cons (filterApplyElements t func) nil\n        filterApplyElements t func\n  nil")(lazy((function () {
  var main;
  var full = function (L_code, L_func) {
    return resolve(L_code)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_isBlockStart)(L_h)(function(){return resolve(L_cons)(L_h, function(){return resolve(L_filterBlock)(L_h, L_t, L_func)})})(function(){return resolve(L_cons)(function(){return resolve(L_filterApplies)(L_h, L_func)}, function(){return resolve(L_and)(function(){return resolve(L_isCons)(L_t)}, function(){return resolve(L_isBlockStart)(function(){return resolve(L_head)(L_t)})})(function(){return resolve(L_cons)(function(){return resolve(L_filterApplyElements)(L_t, L_func)}, L_nil)})(function(){return resolve(L_filterApplyElements)(L_t, L_func)})})})})})}))(L_nil);
  };
  var partial = function(L_code) {
    var _1 = function(L_func) {
            return full(L_code, L_func);
          };
          _1.leisureInfo = {arg: L_code, name: main.leisureName};
          return _1;
  };
  main = function(L_code, L_func, more) {
    if (L_func && (typeof more == "undefined" || more == null)) {
      return full(L_code, L_func);
    } else if (typeof L_func == "undefined" || L_func == null) {
      return partial(L_code);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("filterBlock")(3)("filterBlock type code func = isTokenString type '\\\\'\n  filterLambda code func\n  filterLet code func")(lazy((function () {
  var main;
  var full = function (L_type, L_code, L_func) {
    return resolve(L_isTokenString)(L_type, "\\")(function(){return resolve(L_filterLambda)(L_code, L_func)})(function(){return resolve(L_filterLet)(L_code, L_func)});
  };
  var partial = function(L_type) {
    var _1 = function(L_code) {
            var _2 = function(L_func) {
              return full(L_type, L_code, L_func);
            };
            _2.leisureInfo = {arg: L_code, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_type, name: main.leisureName};
          return _1;
  };
  main = function(L_type, L_code, L_func, more) {
    if (L_func && (typeof more == "undefined" || more == null)) {
      return full(L_type, L_code, L_func);
    } else if (typeof L_code == "undefined" || L_code == null) {
      return partial(L_type);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("filterLet")(2)("filterLet code func = code \\h t . isTokenString h '.'\n  cons h (filterApplies t func)\n  cons (filterLetBinding h func)\n    filterLet t func")(lazy((function () {
  var main;
  var full = function (L_code, L_func) {
    return resolve(L_code)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_isTokenString)(L_h, ".")(function(){return resolve(L_cons)(L_h, function(){return resolve(L_filterApplies)(L_t, L_func)})})(function(){return resolve(L_cons)(function(){return resolve(L_filterLetBinding)(L_h, L_func)}, function(){return resolve(L_filterLet)(L_t, L_func)})})})}));
  };
  var partial = function(L_code) {
    var _1 = function(L_func) {
            return full(L_code, L_func);
          };
          _1.leisureInfo = {arg: L_code, name: main.leisureName};
          return _1;
  };
  main = function(L_code, L_func, more) {
    if (L_func && (typeof more == "undefined" || more == null)) {
      return full(L_code, L_func);
    } else if (typeof L_func == "undefined" || L_func == null) {
      return partial(L_code);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("filterLetBinding")(2)("filterLetBinding code func = isParens code\n  setParens code \\contents . filterLetBinding contents func\n  isCons code\n    code \\h t . cons h\n      isTokenString h '='\n        filterApplies t func\n        filterLetBinding t func\n    code")(lazy((function () {
  var main;
  var full = function (L_code, L_func) {
    return resolve(L_isParens)(L_code)(function(){return resolve(L_setParens)(L_code, lazy(function(L_contents){return resolve(L_filterLetBinding)(L_contents, L_func)}))})(function(){return resolve(L_isCons)(L_code)(function(){return resolve(L_code)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_cons)(L_h, function(){return resolve(L_isTokenString)(L_h, "=")(function(){return resolve(L_filterApplies)(L_t, L_func)})(function(){return resolve(L_filterLetBinding)(L_t, L_func)})})})}))})(L_code)});
  };
  var partial = function(L_code) {
    var _1 = function(L_func) {
            return full(L_code, L_func);
          };
          _1.leisureInfo = {arg: L_code, name: main.leisureName};
          return _1;
  };
  main = function(L_code, L_func, more) {
    if (L_func && (typeof more == "undefined" || more == null)) {
      return full(L_code, L_func);
    } else if (typeof L_func == "undefined" || L_func == null) {
      return partial(L_code);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("filterLambda")(2)("filterLambda code func = code \\h t . cons h\n  isTokenString h '.'\n    filterApplies t func\n    filterLambda t func")(lazy((function () {
  var main;
  var full = function (L_code, L_func) {
    return resolve(L_code)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_cons)(L_h, function(){return resolve(L_isTokenString)(L_h, ".")(function(){return resolve(L_filterApplies)(L_t, L_func)})(function(){return resolve(L_filterLambda)(L_t, L_func)})})})}));
  };
  var partial = function(L_code) {
    var _1 = function(L_func) {
            return full(L_code, L_func);
          };
          _1.leisureInfo = {arg: L_code, name: main.leisureName};
          return _1;
  };
  main = function(L_code, L_func, more) {
    if (L_func && (typeof more == "undefined" || more == null)) {
      return full(L_code, L_func);
    } else if (typeof L_func == "undefined" || L_func == null) {
      return partial(L_code);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_setValue)("listMacros")(function(){return resolve(L_cons)("[", function(){return resolve(L_cons)("{", function(){return resolve(L_cons)("hamt{", L_nil)})})})},
 function(){return resolve(L_addParseFilter)(L_listFilter)},
 function(){return resolve(L_addTokenGroup)("{", "}")},
 function(){return resolve(L_defMacro)("{", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_listifyOp)("aconsPair", L_h)})}))}))},
 function(){return resolve(L_addTokenGroup)("hamt{", "}")},
 function(){return resolve(L_defMacro)("hamt{", lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_hamtify)(L_h)})}))}))},
 function(){return resolve(L_newDefine)("hamtWithPair")(2)("hamtWithPair pair t = hamtWith (head pair) (tail pair) t")(lazy((function () {
  var main;
  var full = function (L_pair, L_t) {
    return resolve(L_hamtWith)(function(){return resolve(L_head)(L_pair)})(function(){return resolve(L_tail)(L_pair)})(L_t);
  };
  var partial = function(L_pair) {
    var _1 = function(L_t) {
            return full(L_pair, L_t);
          };
          _1.leisureInfo = {arg: L_pair, name: main.leisureName};
          return _1;
  };
  main = function(L_pair, L_t, more) {
    if (L_t && (typeof more == "undefined" || more == null)) {
      return full(L_pair, L_t);
    } else if (typeof L_t == "undefined" || L_t == null) {
      return partial(L_pair);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("hamtify")(1)("hamtify list = list\n  \\h t D . isTokenString h '|'\n    cons t nil\n    and (isCons h) (or (isTokenString (head h) 'cons') (isTokenString (head h) ':'))\n      [['hamtWith' (head (tail h)) (head (tail (tail h))) | hamtify t]]\n      [['hamtWithPair' h | hamtify t]]\n  ['hamt']")(lazy(function(L_list){return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_isTokenString)(L_h, "|")(function(){return resolve(L_cons)(L_t, L_nil)})(function(){return resolve(L_and)(function(){return resolve(L_isCons)(L_h)}, function(){return resolve(L_or)(function(){return resolve(L_isTokenString)(function(){return resolve(L_head)(L_h)}, "cons")}, function(){return resolve(L_isTokenString)(function(){return resolve(L_head)(L_h)}, ":")})})(function(){return resolve(L_cons)(function(){return resolve(L_cons)("hamtWith", function(){return resolve(L_cons)(function(){return resolve(L_head)(function(){return resolve(L_tail)(L_h)})}, function(){return resolve(L_cons)(function(){return resolve(L_head)(function(){return resolve(L_tail)(function(){return resolve(L_tail)(L_h)})})}, function(){return resolve(L_hamtify)(L_t)})})})}, L_nil)})(function(){return resolve(L_cons)(function(){return resolve(L_cons)("hamtWithPair", function(){return resolve(L_cons)(L_h, function(){return resolve(L_hamtify)(L_t)})})}, L_nil)})})})})}))(function(){return resolve(L_cons)("hamt", L_nil)})}))},
 function(){return resolve(L_defTokenPack)("list", function(){return resolve(L_cons)(function(){return resolve(L_cons)("|", function(){return resolve(L_cons)("=", L_nil)})}, function(){return resolve(L_cons)(function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("{", "}")}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("hamt{", "}")}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("[", "]")}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("or[", "]")}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("and[", "]")}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("concat[", "]")}, function(){return resolve(L_aconsPair)(function(){return resolve(L_cons)("concatFlat[", "]")}, L_nil)})})})})})})}, function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_listFilter, L_nil)}, L_nil)})})})},
 function(){return resolve(L_addTokenGroup)("or[", "]")},
 function(){return resolve(L_addTokenGroup)("and[", "]")},
 function(){return resolve(L_addTokenGroup)("concat[", "]")},
 function(){return resolve(L_addTokenGroup)("concatFlat[", "]")},
 function(){return resolve(L_newDefine)("listMacroFoldOp")(3)("listMacroFoldOp op emptyCase list = list \\h t . foldr\n    \\case result . [op case result]\n    emptyCase\n    h")(lazy((function () {
  var main;
  var full = function (L_op, L_emptyCase, L_list) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_foldr)(lazy(function(L_case){return $F(arguments, function(L_result){return resolve(L_cons)(L_op, function(){return resolve(L_cons)(L_case, function(){return resolve(L_cons)(L_result, L_nil)})})})}), L_emptyCase, L_h)})}));
  };
  var partial = function(L_op) {
    var _1 = function(L_emptyCase) {
            var _2 = function(L_list) {
              return full(L_op, L_emptyCase, L_list);
            };
            _2.leisureInfo = {arg: L_emptyCase, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_op, name: main.leisureName};
          return _1;
  };
  main = function(L_op, L_emptyCase, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_op, L_emptyCase, L_list);
    } else if (typeof L_emptyCase == "undefined" || L_emptyCase == null) {
      return partial(L_op);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_defMacro)("or[", lazy(function(L_list){return resolve(L_listMacroFoldOp)("or", "false", L_list)}))},
 function(){return resolve(L_defMacro)("and[", lazy(function(L_list){return resolve(L_listMacroFoldOp)("and", "true", L_list)}))},
 function(){return resolve(L_defMacro)("concat[", lazy(function(L_list){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list)})}, L_nil)}, L_nil)})}))},
 function(){return resolve(L_defMacro)("concatFlat[", lazy(function(L_list){return resolve(L_cons)("strCat", function(){return resolve(L_cons)(function(){return resolve(L_cons)("flatten", function(){return resolve(L_cons)(function(){return resolve(L_cons)(function(){return resolve(L_listify)(function(){return resolve(L_head)(L_list)})}, L_nil)}, L_nil)})}, L_nil)})}))},
 function(){return resolve(L_bind)(function(){return resolve(L_getValue)("listMacros")})(lazy(function(L_lm){return resolve(L_cons)("concat[", L_lm)}))},
 function(){return resolve(L_newDefine)("infix")(1)("infix code = bind (getValue 'infixPrecedence')\n  \\prec . bind (getValue 'infixRightAssociative')\n    \\right . bind (getValue 'tokenGroups')\n      \\groups . filterApplies\n        code\n        \\expr . infixRearrange prec right (map (\\cell . tail cell) groups) expr")(lazy(function(L_code){return resolve(L_bind)(function(){return resolve(L_getValue)("infixPrecedence")})(lazy(function(L_prec){return resolve(L_bind)(function(){return resolve(L_getValue)("infixRightAssociative")})(lazy(function(L_right){return resolve(L_bind)(function(){return resolve(L_getValue)("tokenGroups")})(lazy(function(L_groups){return resolve(L_filterApplies)(L_code, lazy(function(L_expr){return resolve(L_infixRearrange)(L_prec, L_right, function(){return resolve(L_map)(lazy(function(L_cell){return resolve(L_tail)(L_cell)}), L_groups)}, L_expr)}))}))}))}))}))},
 function(){return resolve(L_newDefine)("infixRearrange")(4)("infixRearrange prec right closes list = \\\\\n  len = length list\n  head1 = head list\n  tail1 = tail list\n  head2 = head tail1\n  tail2 = tail tail1\n  head3 = head tail2\n  opPrec = getPrec prec head2\n  .\n  < len 2\n    list\n    isInfix opPrec head1 head2 len\n      or (== len 2) (not (isInfixArg closes head3))\n        [[head2 head1] | tail2]\n        infixRearrange prec right closes (absorbArgument opPrec prec right closes head1 head2 tail2 head3 (- len 2))\n      [head1 | infixRearrange prec right closes tail1]")(lazy((function () {
  var main;
  var full = function (L_prec, L_right, L_closes, L_list) {
    return (function(){
  var L_len_0, L_head1_1, L_tail1_2, L_head2_3, L_tail2_4, L_head3_5, L_opPrec_6;
  L_len_0 = function(){return resolve(L_length)(L_list)};
  L_head1_1 = function(){return resolve(L_head)(L_list)};
  L_tail1_2 = function(){return resolve(L_tail)(L_list)};
  L_head2_3 = function(){return resolve(L_head)(L_tail1_2)};
  L_tail2_4 = function(){return resolve(L_tail)(L_tail1_2)};
  L_head3_5 = function(){return resolve(L_head)(L_tail2_4)};
  L_opPrec_6 = function(){return resolve(L_getPrec)(L_prec, L_head2_3)};

  return resolve(L_$y)(L_len_0)(2)(L_list)(function(){return resolve(L_isInfix)(L_opPrec_6, L_head1_1, L_head2_3, L_len_0)(function(){return resolve(L_or)(function(){return resolve(L_$p$p)(L_len_0)(2)}, function(){return resolve(L_not)(function(){return resolve(L_isInfixArg)(L_closes, L_head3_5)})})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_head2_3, function(){return resolve(L_cons)(L_head1_1, L_nil)})}, L_tail2_4)})(function(){return resolve(L_infixRearrange)(L_prec, L_right, L_closes, function(){return resolve(L_absorbArgument)(L_opPrec_6, L_prec, L_right, L_closes, L_head1_1, L_head2_3, L_tail2_4, L_head3_5, function(){return resolve(L_$_)(L_len_0)(2)})})})})(function(){return resolve(L_cons)(L_head1_1, function(){return resolve(L_infixRearrange)(L_prec, L_right, L_closes, L_tail1_2)})})})})();
  };
  var partial = function(L_prec) {
    var _1 = function(L_right) {
            var _2 = function(L_closes) {
              var _3 = function(L_list) {
                return full(L_prec, L_right, L_closes, L_list);
              };
              _3.leisureInfo = {arg: L_closes, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_right, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_prec, name: main.leisureName};
          return _1;
  };
  main = function(L_prec, L_right, L_closes, L_list, more) {
    if (L_list && (typeof more == "undefined" || more == null)) {
      return full(L_prec, L_right, L_closes, L_list);
    } else if (typeof L_right == "undefined" || L_right == null) {
      return partial(L_prec);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("absorbArgument")(9)("absorbArgument opPrec prec right closes head1 head2 tail2 head3 len = \\\\\n  tail3 = tail tail2\n  head4 = head tail3\n  tail4 = tail tail3\n  head5 = head tail4\n  .\n  infixShouldEatNext opPrec prec (contains right (strTokenString head2)) head3 head4 head5 closes len\n    [head1 head2 | absorbArgument (getPrec prec head4) prec right closes head3 head4 tail4 head5 (- len 2)]\n    [[head2 head1 head3] | tail3]")(lazy((function () {
  var main;
  var full = function (L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, L_len) {
    return (function(){
  var L_tail3_0, L_head4_1, L_tail4_2, L_head5_3;
  L_tail3_0 = function(){return resolve(L_tail)(L_tail2)};
  L_head4_1 = function(){return resolve(L_head)(L_tail3_0)};
  L_tail4_2 = function(){return resolve(L_tail)(L_tail3_0)};
  L_head5_3 = function(){return resolve(L_head)(L_tail4_2)};

  return resolve(L_infixShouldEatNext)(L_opPrec, L_prec, function(){return resolve(L_contains)(L_right, function(){return resolve(L_strTokenString)(L_head2)})}, L_head3, L_head4_1, L_head5_3, L_closes, L_len)(function(){return resolve(L_cons)(L_head1, function(){return resolve(L_cons)(L_head2, function(){return resolve(L_absorbArgument)(function(){return resolve(L_getPrec)(L_prec, L_head4_1)}, L_prec, L_right, L_closes, L_head3, L_head4_1, L_tail4_2, L_head5_3, function(){return resolve(L_$_)(L_len)(2)})})})})(function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_head2, function(){return resolve(L_cons)(L_head1, function(){return resolve(L_cons)(L_head3, L_nil)})})}, L_tail3_0)})})();
  };
  var partial = function(L_opPrec) {
    var _1 = function(L_prec) {
            var _2 = function(L_right) {
              var _3 = function(L_closes) {
                var _4 = function(L_head1) {
                  var _5 = function(L_head2) {
                    var _6 = function(L_tail2) {
                      var _7 = function(L_head3) {
                        var _8 = function(L_len) {
                          return full(L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, L_len);
                        };
                        _8.leisureInfo = {arg: L_head3, parent: _7.leisureInfo};
                        return _8;
                      };
                      _7.leisureInfo = {arg: L_tail2, parent: _6.leisureInfo};
                      return _7;
                    };
                    _6.leisureInfo = {arg: L_head2, parent: _5.leisureInfo};
                    return _6;
                  };
                  _5.leisureInfo = {arg: L_head1, parent: _4.leisureInfo};
                  return _5;
                };
                _4.leisureInfo = {arg: L_closes, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_right, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_prec, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_opPrec, name: main.leisureName};
          return _1;
  };
  main = function(L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, L_len, more) {
    if (L_len && (typeof more == "undefined" || more == null)) {
      return full(L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, L_len);
    } else if (typeof L_prec == "undefined" || L_prec == null) {
      return partial(L_opPrec);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("isInfixArg")(2)("isInfixArg closes item = or[\n  isParens item\n  isCons item\n  and[\n    isToken item\n    not (contains closes (tokenString item))\n    not (isBlockStart item)]]")(lazy((function () {
  var main;
  var full = function (L_closes, L_item) {
    return resolve(L_or)(function(){return resolve(L_isParens)(L_item)}, function(){return resolve(L_or)(function(){return resolve(L_isCons)(L_item)}, function(){return resolve(L_or)(function(){return resolve(L_and)(function(){return resolve(L_isToken)(L_item)}, function(){return resolve(L_and)(function(){return resolve(L_not)(function(){return resolve(L_contains)(L_closes, function(){return resolve(L_tokenString)(L_item)})})}, function(){return resolve(L_and)(function(){return resolve(L_not)(function(){return resolve(L_isBlockStart)(L_item)})}, L_true)})})}, L_false)})});
  };
  var partial = function(L_closes) {
    var _1 = function(L_item) {
            return full(L_closes, L_item);
          };
          _1.leisureInfo = {arg: L_closes, name: main.leisureName};
          return _1;
  };
  main = function(L_closes, L_item, more) {
    if (L_item && (typeof more == "undefined" || more == null)) {
      return full(L_closes, L_item);
    } else if (typeof L_item == "undefined" || L_item == null) {
      return partial(L_closes);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("isInfix")(4)("isInfix opPrec head1 head2 len = and[\n  > len 1\n  > opPrec -1\n  isInfixArg nil head1]")(lazy((function () {
  var main;
  var full = function (L_opPrec, L_head1, L_head2, L_len) {
    return resolve(L_and)(function(){return resolve(L_$z)(L_len)(1)}, function(){return resolve(L_and)(function(){return resolve(L_$z)(L_opPrec)(-1)}, function(){return resolve(L_and)(function(){return resolve(L_isInfixArg)(L_nil, L_head1)}, L_true)})});
  };
  var partial = function(L_opPrec) {
    var _1 = function(L_head1) {
            var _2 = function(L_head2) {
              var _3 = function(L_len) {
                return full(L_opPrec, L_head1, L_head2, L_len);
              };
              _3.leisureInfo = {arg: L_head2, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_head1, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_opPrec, name: main.leisureName};
          return _1;
  };
  main = function(L_opPrec, L_head1, L_head2, L_len, more) {
    if (L_len && (typeof more == "undefined" || more == null)) {
      return full(L_opPrec, L_head1, L_head2, L_len);
    } else if (typeof L_head1 == "undefined" || L_head1 == null) {
      return partial(L_opPrec);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("getPrec")(2)("getPrec prec token = \\\\\n  str = tokenString token\n  .\n  isToken token\n    findIndex (\\level . contains level str) prec\n    -1")(lazy((function () {
  var main;
  var full = function (L_prec, L_token) {
    return (function(){
  var L_str_0;
  L_str_0 = function(){return resolve(L_tokenString)(L_token)};

  return resolve(L_isToken)(L_token)(function(){return resolve(L_findIndex)(lazy(function(L_level){return resolve(L_contains)(L_level, L_str_0)}), L_prec)})(-1)})();
  };
  var partial = function(L_prec) {
    var _1 = function(L_token) {
            return full(L_prec, L_token);
          };
          _1.leisureInfo = {arg: L_prec, name: main.leisureName};
          return _1;
  };
  main = function(L_prec, L_token, more) {
    if (L_token && (typeof more == "undefined" || more == null)) {
      return full(L_prec, L_token);
    } else if (typeof L_token == "undefined" || L_token == null) {
      return partial(L_prec);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("infixShouldEatNext")(8)("infixShouldEatNext opPrec prec isRight curArg nextOp nextArg closes len = \\\\\n  nextPrec = getPrec prec nextOp\n  .\n  and[\n    > len 2\n    isInfix nextPrec curArg nextOp len\n    or (> opPrec nextPrec) (and (== opPrec nextPrec) isRight)\n    isInfixArg closes nextArg]")(lazy((function () {
  var main;
  var full = function (L_opPrec, L_prec, L_isRight, L_curArg, L_nextOp, L_nextArg, L_closes, L_len) {
    return (function(){
  var L_nextPrec_0;
  L_nextPrec_0 = function(){return resolve(L_getPrec)(L_prec, L_nextOp)};

  return resolve(L_and)(function(){return resolve(L_$z)(L_len)(2)}, function(){return resolve(L_and)(function(){return resolve(L_isInfix)(L_nextPrec_0, L_curArg, L_nextOp, L_len)}, function(){return resolve(L_and)(function(){return resolve(L_or)(function(){return resolve(L_$z)(L_opPrec)(L_nextPrec_0)}, function(){return resolve(L_and)(function(){return resolve(L_$p$p)(L_opPrec)(L_nextPrec_0)}, L_isRight)})}, function(){return resolve(L_and)(function(){return resolve(L_isInfixArg)(L_closes, L_nextArg)}, L_true)})})})})();
  };
  var partial = function(L_opPrec) {
    var _1 = function(L_prec) {
            var _2 = function(L_isRight) {
              var _3 = function(L_curArg) {
                var _4 = function(L_nextOp) {
                  var _5 = function(L_nextArg) {
                    var _6 = function(L_closes) {
                      var _7 = function(L_len) {
                        return full(L_opPrec, L_prec, L_isRight, L_curArg, L_nextOp, L_nextArg, L_closes, L_len);
                      };
                      _7.leisureInfo = {arg: L_closes, parent: _6.leisureInfo};
                      return _7;
                    };
                    _6.leisureInfo = {arg: L_nextArg, parent: _5.leisureInfo};
                    return _6;
                  };
                  _5.leisureInfo = {arg: L_nextOp, parent: _4.leisureInfo};
                  return _5;
                };
                _4.leisureInfo = {arg: L_curArg, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_isRight, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_prec, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_opPrec, name: main.leisureName};
          return _1;
  };
  main = function(L_opPrec, L_prec, L_isRight, L_curArg, L_nextOp, L_nextArg, L_closes, L_len, more) {
    if (L_len && (typeof more == "undefined" || more == null)) {
      return full(L_opPrec, L_prec, L_isRight, L_curArg, L_nextOp, L_nextArg, L_closes, L_len);
    } else if (typeof L_prec == "undefined" || L_prec == null) {
      return partial(L_opPrec);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_defMacro)(":", lazy(function(L_list){return resolve(L_cons)("cons", L_list)}))},
 function(){return resolve(L_newDefine)("iprec")(0)("iprec = [['*' '/' '%'] ['+' '-'] [':'] ['<' '>' '<=' '>='] ['==' '!=']]")(function(){return resolve(L_cons)(function(){return resolve(L_cons)("*", function(){return resolve(L_cons)("/", function(){return resolve(L_cons)("%", L_nil)})})}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("+", function(){return resolve(L_cons)("-", L_nil)})}, function(){return resolve(L_cons)(function(){return resolve(L_cons)(":", L_nil)}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("<", function(){return resolve(L_cons)(">", function(){return resolve(L_cons)("<=", function(){return resolve(L_cons)(">=", L_nil)})})})}, function(){return resolve(L_cons)(function(){return resolve(L_cons)("==", function(){return resolve(L_cons)("!=", L_nil)})}, L_nil)})})})})})},
 function(){return resolve(L_newDefine)("rightAssoc")(0)("rightAssoc = [':']")(function(){return resolve(L_cons)(":", L_nil)})},
 function(){return resolve(L_newDefine)("setPrecedenceLevels")(1)("setPrecedenceLevels levels = bind\n  setValue 'infixPrecedence' levels\n  \\_ . doall (map addInfixProp (flatten levels))")(lazy(function(L_levels){return resolve(L_bind)(function(){return resolve(L_setValue)("infixPrecedence")(L_levels)})(lazy(function(L__){return resolve(L_doall)(function(){return resolve(L_map)(L_addInfixProp, function(){return resolve(L_flatten)(L_levels)})})}))}))},
 function(){return resolve(L_newDefine)("addInfixProp")(1)("addInfixProp funcName = getFunction funcName\n  \\func . setProperty func 'infix' true\n  nil")(lazy(function(L_funcName){return resolve(L_getFunction)(L_funcName)(lazy(function(L_func){return resolve(L_setProperty)(L_func)("infix")(L_true)}))(L_nil)}))},
 function(){return resolve(L_setPrecedenceLevels)(L_iprec)},
 function(){return resolve(L_setValue)("infixRightAssociative")(L_rightAssoc)},
 function(){return resolve(L_defTokenPack)("infix", function(){return resolve(L_cons)(function(){return resolve(L_flatten)(L_iprec)}, function(){return resolve(L_cons)(L_nil, function(){return resolve(L_cons)(function(){return resolve(L_cons)(L_infix, L_nil)}, L_nil)})})})},
 function(){return resolve(L_useTokenPack)("infix")},
 function(){return resolve(L_defMacro)("do", lazy(function(L_list){return resolve(L_handleDo)(L_list, L_false, L_id)}))},
 function(){return resolve(L_newDefine)("handleDo")(3)("handleDo list inLet cont = list\n  \\h t D . isNil t\n    cont (inLet ['.' h] [h])\n    doClause (stripParens h) h nil inLet \\newInLet chain .\n      handleDo t newInLet \\rest . cont (chain rest)\n  cont nil")(lazy((function () {
  var main;
  var full = function (L_list, L_inLet, L_cont) {
    return resolve(L_list)(lazy(function(L_h){return $F(arguments, function(L_t){return $F(arguments, function(L_D){return resolve(L_isNil)(L_t)(function(){return resolve(L_cont)(function(){return resolve(L_inLet)(function(){return resolve(L_cons)(".", function(){return resolve(L_cons)(L_h, L_nil)})})(function(){return resolve(L_cons)(L_h, L_nil)})})})(function(){return resolve(L_doClause)(function(){return resolve(L_stripParens)(L_h)}, L_h, L_nil, L_inLet, lazy(function(L_newInLet){return $F(arguments, function(L_chain){return resolve(L_handleDo)(L_t, L_newInLet, lazy(function(L_rest){return resolve(L_cont)(function(){return resolve(L_chain)(L_rest)})}))})}))})})})}))(function(){return resolve(L_cont)(L_nil)});
  };
  var partial = function(L_list) {
    var _1 = function(L_inLet) {
            var _2 = function(L_cont) {
              return full(L_list, L_inLet, L_cont);
            };
            _2.leisureInfo = {arg: L_inLet, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_list, name: main.leisureName};
          return _1;
  };
  main = function(L_list, L_inLet, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_list, L_inLet, L_cont);
    } else if (typeof L_inLet == "undefined" || L_inLet == null) {
      return partial(L_list);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_newDefine)("doClause")(5)("doClause steppingClause clause prefix inLet cont = \\\\\n  makeBind var monad = cont false \\rest . inLet (cons '.') id\n    ['bind' monad ['\\\\' var '.' | rest]]\n  .\n  isCons steppingClause\n    steppingClause \\h t . isTokenString h '='\n      inLet\n        cont true \\rest . [clause | rest]\n        cont true \\rest . ['\\\\\\\\' clause | rest]\n      isTokenString h '<-'\n        isNil t\n          parseErr \"No monad in do-clause: \" clause\n          prefix\n            \\ph pt D . isNil pt\n              makeBind (isNil prefix '_' (head prefix)) t\n              parseErr \"More than one variable in do-clause: \" clause\n            makeBind '_' t\n        doClause t clause [h | prefix] inLet cont\n    makeBind '_' clause")(lazy((function () {
  var main;
  var full = function (L_steppingClause, L_clause, L_prefix, L_inLet, L_cont) {
    return (function(){
  var L_makeBind_0;
  L_makeBind_0 = function(){return function(L_var){return $F(arguments, function(L_monad){return resolve(L_cont)(L_false)(lazy(function(L_rest){return resolve(L_inLet)(function(){return resolve(L_cons)(".")})(L_id)(function(){return resolve(L_cons)("bind", function(){return resolve(L_cons)(L_monad, function(){return resolve(L_cons)(function(){return resolve(L_cons)("\\", function(){return resolve(L_cons)(L_var, function(){return resolve(L_cons)(".", L_rest)})})}, L_nil)})})})}))})}};

  return resolve(L_isCons)(L_steppingClause)(function(){return resolve(L_steppingClause)(lazy(function(L_h){return $F(arguments, function(L_t){return resolve(L_isTokenString)(L_h, "=")(function(){return resolve(L_inLet)(function(){return resolve(L_cont)(L_true)(lazy(function(L_rest){return resolve(L_cons)(L_clause, L_rest)}))})(function(){return resolve(L_cont)(L_true)(lazy(function(L_rest){return resolve(L_cons)("\\\\", function(){return resolve(L_cons)(L_clause, L_rest)})}))})})(function(){return resolve(L_isTokenString)(L_h, "<-")(function(){return resolve(L_isNil)(L_t)(function(){return resolve(L_parseErr)("No monad in do-clause: ", L_clause)})(function(){return resolve(L_prefix)(lazy(function(L_ph){return $F(arguments, function(L_pt){return $F(arguments, function(L_D){return resolve(L_isNil)(L_pt)(function(){return resolve(L_makeBind_0)(function(){return resolve(L_isNil)(L_prefix)("_")(function(){return resolve(L_head)(L_prefix)})})(L_t)})(function(){return resolve(L_parseErr)("More than one variable in do-clause: ", L_clause)})})})}))(function(){return resolve(L_makeBind_0)("_")(L_t)})})})(function(){return resolve(L_doClause)(L_t, L_clause, function(){return resolve(L_cons)(L_h, L_prefix)}, L_inLet, L_cont)})})})}))})(function(){return resolve(L_makeBind_0)("_")(L_clause)})})();
  };
  var partial = function(L_steppingClause) {
    var _1 = function(L_clause) {
            var _2 = function(L_prefix) {
              var _3 = function(L_inLet) {
                var _4 = function(L_cont) {
                  return full(L_steppingClause, L_clause, L_prefix, L_inLet, L_cont);
                };
                _4.leisureInfo = {arg: L_inLet, parent: _3.leisureInfo};
                return _4;
              };
              _3.leisureInfo = {arg: L_prefix, parent: _2.leisureInfo};
              return _3;
            };
            _2.leisureInfo = {arg: L_clause, parent: _1.leisureInfo};
            return _2;
          };
          _1.leisureInfo = {arg: L_steppingClause, name: main.leisureName};
          return _1;
  };
  main = function(L_steppingClause, L_clause, L_prefix, L_inLet, L_cont, more) {
    if (L_cont && (typeof more == "undefined" || more == null)) {
      return full(L_steppingClause, L_clause, L_prefix, L_inLet, L_cont);
    } else if (typeof L_clause == "undefined" || L_clause == null) {
      return partial(L_steppingClause);
    } else {
      return Leisure.curryCall(arguments, partial);
    }
  };
  return main;
})()))},
 function(){return resolve(L_defTokenPack)("do", function(){return resolve(L_cons)(function(){return resolve(L_cons)("<-", L_nil)}, function(){return resolve(L_cons)(L_nil, function(){return resolve(L_cons)(L_nil, L_nil)})})})},
 function(){return resolve(L_addStdTokenPacks)(function(){return resolve(L_cons)("list", function(){return resolve(L_cons)("infix", function(){return resolve(L_cons)("do", L_nil)})})})},
 function(){return resolve(L_resetStdTokenPacks)}]);

//# sourceMappingURL=generatedPrelude.map
