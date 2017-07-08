'use strict';
define([], function(){
  return L_runMonads([
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_setNameSpace)("core");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_debugType)("Std");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("err", 0);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("boolean", 0);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("true", "boolean");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("false", "boolean");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("option", 0);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("some", "option");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("none", "option");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("either", 0);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("left", "either");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("right", "either");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L__declareType)("keyedSequence", "sequence");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("asIO", 1, "asIO x = x", lazy((function(){
  var L$F = function(L_x){return resolve(L_x);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("fakereturn", 1, "fakereturn x = x", lazy((function(){
  var L$F = function(L_x){return resolve(L_x);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("_recur", 1, "_recur x = \\f . f x", lazy(setDataType((function(){
  var L$F = function(L_x){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_x);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})(), '_recur');};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), '_recur')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("true", 0, "true = \\a b . a", lazy(setDataType(setType((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_a);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'true'), 'true')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("false", 0, "false = \\a b . b", lazy(setDataType(setType((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_b);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'false'), 'false')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("not", 1, "not b = b false true", lazy((function(){
  var L$F = function(L_b){return resolve(L_b)(L_false)(L_true);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("and", 2, "and a b = a b false", lazy((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_a)(L_b)(L_false);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("&&", 0, "&& = and", L_and);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("or", 2, "or a b = a true b", lazy((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_a)(L_true)(L_b);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("||", 0, "|| = or", L_or);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("some", 1, "some x = \\someCase noneCase . someCase x", lazy(setDataType((function(){
  var L$F = function(L_x){return setType((function(){
  var L$F = function(L_someCase){return (function(){
  var L$F = function(L_noneCase){return resolve(L_someCase)(L_x);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'some');};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'some')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("none", 0, "none = \\someCase noneCase . noneCase", lazy(setDataType(setType((function(){
  var L$F = function(L_someCase){return (function(){
  var L$F = function(L_noneCase){return resolve(L_noneCase);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'none'), 'none')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isNone", 1, "isNone obj = hasType obj none", lazy((function(){
  var L$F = function(L_obj){return resolve(L_hasType)(L_obj, L_none);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isSome", 1, "isSome obj = hasType obj some", lazy((function(){
  var L$F = function(L_obj){return resolve(L_hasType)(L_obj, L_some);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isOption", 1, "isOption obj = or (isSome obj) (isNone obj)", lazy((function(){
  var L$F = function(L_obj){return L$(resolve(L_or))(function(){
  return resolve(L_isSome)(L_obj);
}, function(){
  return resolve(L_isNone)(L_obj);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("neq", 2, "neq a b = not (eq a b)", lazy((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_not)(function(){
  return resolve(L_eq)(L_a, L_b);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("left", 1, "left x = \\lCase rCase . lCase x", lazy(setDataType((function(){
  var L$F = function(L_x){return setType((function(){
  var L$F = function(L_lCase){return (function(){
  var L$F = function(L_rCase){return resolve(L_lCase)(L_x);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'left');};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'left')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("right", 1, "right x = \\lCase rCase . rCase x", lazy(setDataType((function(){
  var L$F = function(L_x){return setType((function(){
  var L$F = function(L_lCase){return (function(){
  var L$F = function(L_rCase){return resolve(L_rCase)(L_x);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'right');};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'right')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isEither", 1, "isEither obj = or (hasType obj left) (hasType obj right)", lazy((function(){
  var L$F = function(L_obj){return L$(resolve(L_or))(function(){
  return resolve(L_hasType)(L_obj, L_left);
}, function(){
  return resolve(L_hasType)(L_obj, L_right);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isString", 1, "isString s = == (getType s) 'string'", lazy((function(){
  var L$F = function(L_s){return resolve(L_$p$p)(function(){
  return resolve(L_getType)(L_s);
}, "string");};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isNumber", 1, "isNumber s = == (getType s) 'number'", lazy((function(){
  var L$F = function(L_s){return resolve(L_$p$p)(function(){
  return resolve(L_getType)(L_s);
}, "number");};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strAsc", 1, "strAsc string = _strAsc (assertType 'strAsc string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return resolve(L__strAsc)(function(){
  return L$(resolve(L_assertType))("strAsc string", "string", L_string);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strChr", 1, "strChr ascii = _strChr (assertType 'strChr string' 'number' ascii)", lazy((function(){
  var L$F = function(L_ascii){return resolve(L__strChr)(function(){
  return L$(resolve(L_assertType))("strChr string", "number", L_ascii);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("strAt", 2, "strAt string index = _strAt\n  assertType 'strAt string' 'string' string\n  assertType 'strAt index' 'number' index", lazy((function(){
  var L$F = function(L_string){return (function(){
  var L$F = function(L_index){return resolve(L__strAt)(function(){
  return L$(resolve(L_assertType))("strAt string", "string", L_string);
}, function(){
  return L$(resolve(L_assertType))("strAt index", "number", L_index);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("strStartsWith", 2, "strStartsWith string prefix = _strStartsWith\n  assertType 'strStartsWith string' 'string' string\n  assertType 'strStartsWith prefix' 'string' prefix", lazy((function(){
  var L$F = function(L_string){return (function(){
  var L$F = function(L_prefix){return resolve(L__strStartsWith)(function(){
  return L$(resolve(L_assertType))("strStartsWith string", "string", L_string);
}, function(){
  return L$(resolve(L_assertType))("strStartsWith prefix", "string", L_prefix);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strLen", 1, "strLen string = _strLen (assertType 'strLen string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return resolve(L__strLen)(function(){
  return L$(resolve(L_assertType))("strLen string", "string", L_string);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strReverse", 1, "strReverse string = _strReverse (assertType 'strLen string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return resolve(L__strReverse)(function(){
  return L$(resolve(L_assertType))("strLen string", "string", L_string);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strToLowerCase", 1, "strToLowerCase string = _strToLowerCase (assertType 'strToLowerCase string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return resolve(L__strToLowerCase)(function(){
  return L$(resolve(L_assertType))("strToLowerCase string", "string", L_string);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strToUpperCase", 1, "strToUpperCase string = _strToUpperCase (assertType 'strToUpperCase string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return resolve(L__strToUpperCase)(function(){
  return L$(resolve(L_assertType))("strToUpperCase string", "string", L_string);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("strReplace", 3, "strReplace string pat repl = _strReplace\n  assertType 'strReplace string' 'string' string\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strStartsWith pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat\n  assertType 'strReplace repl' 'string' repl", lazy((function(){
  var L$F = function(L_string){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_repl){return resolve(L__strReplace)(function(){
  return L$(resolve(L_assertType))("strReplace string", "string", L_string);
}, function(){
  return resolve(L_assert)(function(){
  return L$(resolve(L_or))(function(){
  return resolve(L_hasType)(L_pat, "string");
}, function(){
  return resolve(L_hasType)(L_pat, "*RegExp");
});
}, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("strStartsWith pat should be type string or RegExp but it is type ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_getType)(L_pat);
}, function(){
  return L$(resolve(L_cons))(": ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_show)(L_pat);
}, L_nil);
});
});
});
});
}, L_pat);
}, function(){
  return L$(resolve(L_assertType))("strReplace repl", "string", L_repl);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("strSubstring", 3, "strSubstring str start end = _strSubstring\n  assertType 'strSubstring str' 'string' str\n  assertType 'strSubstring start' 'number' start\n  assertType 'strSubstring end' 'number' end", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_end){return resolve(L__strSubstring)(function(){
  return L$(resolve(L_assertType))("strSubstring str", "string", L_str);
}, function(){
  return L$(resolve(L_assertType))("strSubstring start", "number", L_start);
}, function(){
  return L$(resolve(L_assertType))("strSubstring end", "number", L_end);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("strSplit", 2, "strSplit str pat = _strSplit\n  assertType 'strSplit str' 'string' str\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strSplit pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return resolve(L__strSplit)(function(){
  return L$(resolve(L_assertType))("strSplit str", "string", L_str);
}, function(){
  return resolve(L_assert)(function(){
  return L$(resolve(L_or))(function(){
  return resolve(L_hasType)(L_pat, "string");
}, function(){
  return resolve(L_hasType)(L_pat, "*RegExp");
});
}, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("strSplit pat should be type string or RegExp but it is type ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_getType)(L_pat);
}, function(){
  return L$(resolve(L_cons))(": ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_show)(L_pat);
}, L_nil);
});
});
});
});
}, L_pat);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strCat", 1, "strCat list = _strCat\n  assert (isList list) (strCat (cons 'strCat list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy((function(){
  var L$F = function(L_list){return resolve(L__strCat)(function(){
  return resolve(L_assert)(function(){
  return resolve(L_isList)(L_list);
}, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("strCat list should be type cons or nil but it is type ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_getType)(L_list);
}, function(){
  return L$(resolve(L_cons))(": ", function(){
  return resolve(L_cons)(L_list);
});
});
});
});
}, L_list);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("strAdd", 2, "strAdd str1 str2 = _strAdd (assertType 'strAdd str1' 'string' str1) (assertType 'strAdd str2' 'string' str2)", lazy((function(){
  var L$F = function(L_str1){return (function(){
  var L$F = function(L_str2){return resolve(L__strAdd)(function(){
  return L$(resolve(L_assertType))("strAdd str1", "string", L_str1);
}, function(){
  return L$(resolve(L_assertType))("strAdd str2", "string", L_str2);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("strMatch", 2, "strMatch str pat = _strMatch\n  assertType 'strMatch str' 'string' str\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strMatch pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return resolve(L__strMatch)(function(){
  return L$(resolve(L_assertType))("strMatch str", "string", L_str);
}, function(){
  return resolve(L_assert)(function(){
  return L$(resolve(L_or))(function(){
  return resolve(L_hasType)(L_pat, "string");
}, function(){
  return resolve(L_hasType)(L_pat, "*RegExp");
});
}, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("strMatch pat should be type string or RegExp but it is type ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_getType)(L_pat);
}, function(){
  return L$(resolve(L_cons))(": ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_show)(L_pat);
}, L_nil);
});
});
});
});
}, L_pat);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strToList", 1, "strToList str = _strToList (assertType 'strToList str' 'string' str)", lazy((function(){
  var L$F = function(L_str){return resolve(L__strToList)(function(){
  return L$(resolve(L_assertType))("strToList str", "string", L_str);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("strFromList", 1, "strFromList list = _strFromList\n  assert (isList list) (strCat (cons 'strFromList list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy((function(){
  var L$F = function(L_list){return resolve(L__strFromList)(function(){
  return resolve(L_assert)(function(){
  return resolve(L_isList)(L_list);
}, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("strFromList list should be type cons or nil but it is type ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_getType)(L_list);
}, function(){
  return L$(resolve(L_cons))(": ", function(){
  return resolve(L_cons)(L_list);
});
});
});
});
}, L_list);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("regexp", 1, "regexp str = _regexp (assertType 'regexp str' 'string' str)", lazy((function(){
  var L$F = function(L_str){return resolve(L__regexp)(function(){
  return L$(resolve(L_assertType))("regexp str", "string", L_str);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("regexpFlags", 2, "regexpFlags str flags = _regexpFlags\n  assertType 'regexp str' 'string' str\n  assertType 'regexp flags' 'string' flags", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_flags){return resolve(L__regexpFlags)(function(){
  return L$(resolve(L_assertType))("regexp str", "string", L_str);
}, function(){
  return L$(resolve(L_assertType))("regexp flags", "string", L_flags);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("jsonParse", 3, "jsonParse str failure success = _jsonParse\n  assertType 'jsonParse str' 'string' str\n  failure\n  success", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_failure){return (function(){
  var L$F = function(L_success){return resolve(L__jsonParse)(function(){
  return L$(resolve(L_assertType))("jsonParse str", "string", L_str);
}, L_failure, L_success);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("show", 1, "show x = _show x", lazy((function(){
  var L$F = function(L_x){return resolve(L__show)(L_x);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("equal", 2, "equal x y = eq x y", lazy((function(){
  var L$F = function(L_x){return (function(){
  var L$F = function(L_y){return resolve(L_eq)(L_x, L_y);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("id", 1, "id x = x", lazy((function(){
  var L$F = function(L_x){return resolve(L_x);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("unit", 0, "unit = \\x . x", lazy(setDataType(setType((function(){
  var L$F = function(L_x){return resolve(L_x);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})(), 'unit'), 'unit')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("compose", 2, "compose f g = \\x . f (g x)", lazy(setDataType((function(){
  var L$F = function(L_f){return (function(){
  var L$F = function(L_g){return setType((function(){
  var L$F = function(L_x){return resolve(L_f)(function(){
  return resolve(L_g)(L_x);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'compose');};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'compose')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("flip", 1, "flip func = \\x y . func y x", lazy(setDataType((function(){
  var L$F = function(L_func){return setType((function(){
  var L$F = function(L_x){return (function(){
  var L$F = function(L_y){return resolve(L_func)(L_y)(L_x);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'flip');};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'flip')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("withCons", 3, "withCons l nilCase cont = isCons l (l (\\h t D . cont h t) nilCase) nilCase", lazy((function(){
  var L$F = function(L_l){return (function(){
  var L$F = function(L_nilCase){return (function(){
  var L$F = function(L_cont){return L$(resolve(L_isCons))(L_l, function(){
  return resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_cont)(L_h)(L_t);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()))(L_nilCase);
}, L_nilCase);};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("cons", 2, "cons a b = \\f . f a b", lazy(setDataType((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_a)(L_b);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'cons');};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'cons')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isCons", 1, "isCons c = hasType c cons", lazy((function(){
  var L$F = function(L_c){return resolve(L_hasType)(L_c, L_cons);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isList", 1, "isList l = or (hasType l cons) (hasType l nil)", lazy((function(){
  var L$F = function(L_l){return L$(resolve(L_or))(function(){
  return resolve(L_hasType)(L_l, L_cons);
}, function(){
  return resolve(L_hasType)(L_l, L_nil);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("assertType", 3, "assertType msg type value =\n  assert\n    hasType value type\n    strCat (cons msg (cons ' should be type ' (cons (getDataType type) (cons ', but its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))))\n    value", lazy((function(){
  var L$F = function(L_msg){return (function(){
  var L$F = function(L_type){return (function(){
  var L$F = function(L_value){return resolve(L_assert)(function(){
  return resolve(L_hasType)(L_value, L_type);
}, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))(L_msg, function(){
  return L$(resolve(L_cons))(" should be type ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_getDataType)(L_type);
}, function(){
  return L$(resolve(L_cons))(", but its type is ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_getType)(L_value);
}, function(){
  return L$(resolve(L_cons))(": ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_show)(L_value);
}, L_nil);
});
});
});
});
});
});
});
}, L_value);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("nil", 0, "nil = \\a b . b", lazy(setDataType(setType((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_b);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'nil'), 'nil')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isNil", 1, "isNil n = hasType n nil", lazy((function(){
  var L$F = function(L_n){return resolve(L_hasType)(L_n, L_nil);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("head", 1, "head l = l \\h t . h", lazy((function(){
  var L$F = function(L_l){return resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return resolve(L_h);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("tail", 1, "tail l = l \\h t . t", lazy((function(){
  var L$F = function(L_l){return resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return resolve(L_t);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("last", 1, "last l = isNil (tail l)\n  head l\n  last (tail l)", lazy((function(){
  var L$F = function(L_l){return L$(resolve(L_isNil))(function(){
  return resolve(L_tail)(L_l);
}, function(){
  return resolve(L_head)(L_l);
}, function(){
  return resolve(L_last)(function(){
  return resolve(L_tail)(L_l);
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("removeLast", 1, "removeLast l = isNil (tail l)\n  nil\n  cons (head l) (removeLast (tail l))", lazy((function(){
  var L$F = function(L_l){return L$(resolve(L_isNil))(function(){
  return resolve(L_tail)(L_l);
}, L_nil, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_head)(L_l);
}, function(){
  return resolve(L_removeLast)(function(){
  return resolve(L_tail)(L_l);
});
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("consLength", 1, "consLength list = isCons list\n  + 1 (consLength (tail list))\n  assert (hasType list nil) (strCat (cons \"consLength argument is not a proper list: \" (cons list nil))) 0", lazy((function(){
  var L$F = function(L_list){return L$(resolve(L_isCons))(L_list, function(){
  return resolve(L_$o)(1, function(){
  return resolve(L_consLength)(function(){
  return resolve(L_tail)(L_list);
});
});
}, function(){
  return resolve(L_assert)(function(){
  return resolve(L_hasType)(L_list, L_nil);
}, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("consLength argument is not a proper list: ", function(){
  return L$(resolve(L_cons))(L_list, L_nil);
});
});
}, 0);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("_foldl", 3, "_foldl func initialValue l = l (\\h t D . foldl func (func initialValue h) t) initialValue", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_initialValue){return (function(){
  var L$F = function(L_l){return resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return L$(resolve(L_foldl))(L_func, function(){
  return resolve(L_func)(L_initialValue)(L_h);
}, L_t);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()))(L_initialValue);};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("_foldl1", 2, "_foldl1 func l = l \\h t . foldl func h t", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_l){return resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_foldl))(L_func, L_h, L_t);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("_foldr", 3, "_foldr func finalValue list = list\n  \\h t D . func h (foldr func finalValue t)\n  finalValue", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_finalValue){return (function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_func)(L_h)(function(){
  return L$(resolve(L_foldr))(L_func, L_finalValue, L_t);
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()))(L_finalValue);};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("_foldr1", 2, "_foldr1 func list = list \\h t . isNil t\n  h\n  func h (foldr1 func t)", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_isNil))(L_t, L_h, function(){
  return resolve(L_func)(L_h)(function(){
  return L$(resolve(L_foldr1))(L_func, L_t);
});
});};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("_append", 2, "_append a b = _foldr cons b a", lazy((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return L$(resolve(L__foldr))(L_cons, L_b, L_a);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("foldl", 0, "foldl = _foldl", L__foldl);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("foldl1", 0, "foldl1 = _foldl1", L__foldl1);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("foldr", 0, "foldr = _foldr", L__foldr);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("foldr1", 0, "foldr1 = _foldr1", L__foldr1);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("append", 0, "append = _append", L__append);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("_reverse", 1, "_reverse l = rev l nil", lazy((function(){
  var L$F = function(L_l){return L$(resolve(L_rev))(L_l, L_nil);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("reverse", 0, "reverse = _reverse", L__reverse);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("rev", 2, "rev l result = isNil l\n  result\n  rev (tail l) (cons (head l) result)", lazy((function(){
  var L$F = function(L_l){return (function(){
  var L$F = function(L_result){return L$(resolve(L_isNil))(L_l, L_result, function(){
  return L$(resolve(L_rev))(function(){
  return resolve(L_tail)(L_l);
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_head)(L_l);
}, L_result);
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("_flatten", 1, "_flatten list = isCons list\n  subflatten list nil\n  list", lazy((function(){
  var L$F = function(L_list){return L$(resolve(L_isCons))(L_list, function(){
  return L$(resolve(L_subflatten))(L_list, L_nil);
}, L_list);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("flatten", 0, "flatten = _flatten", L__flatten);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("subflatten", 2, "subflatten list result = isNil list\n  result\n  isCons list\n    subflatten (head list) (subflatten (tail list) result)\n    cons list result", lazy((function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_result){return L$(resolve(L_isNil))(L_list, L_result, function(){
  return L$(resolve(L_isCons))(L_list, function(){
  return L$(resolve(L_subflatten))(function(){
  return resolve(L_head)(L_list);
}, function(){
  return L$(resolve(L_subflatten))(function(){
  return resolve(L_tail)(L_list);
}, L_result);
});
}, function(){
  return L$(resolve(L_cons))(L_list, L_result);
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("_filter", 2, "_filter func list = isNil list\n  nil\n  func (head list) (cons (head list)) id (_filter func (tail list))", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_list){return L$(resolve(L_isNil))(L_list, L_nil, function(){
  return resolve(L_func)(function(){
  return resolve(L_head)(L_list);
})(function(){
  return resolve(L_cons)(function(){
  return resolve(L_head)(L_list);
});
})(L_id)(function(){
  return L$(resolve(L__filter))(L_func, function(){
  return resolve(L_tail)(L_list);
});
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("filter", 0, "filter = _filter", L__filter);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("_find", 2, "_find predicate list =\n  foldr (\\item result . (predicate item) (some item) result) none list", lazy((function(){
  var L$F = function(L_predicate){return (function(){
  var L$F = function(L_list){return L$(resolve(L_foldr))(lazy((function(){
  var L$F = function(L_item){return (function(){
  var L$F = function(L_result){return resolve(L_predicate)(L_item)(function(){
  return resolve(L_some)(L_item);
})(L_result);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()), L_none, L_list);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("find", 0, "find = _find", L__find);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("_contains", 2, "_contains list item = find (\\el . eq el item) list (\\x . true) false", lazy((function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_item){return L$(resolve(L_find))(lazy((function(){
  var L$F = function(L_el){return resolve(L_eq)(L_el, L_item);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()), L_list, lazy((function(){
  var L$F = function(L_x){return resolve(L_true);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()), L_false);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("findIndex", 2, "findIndex func list = idx list func 0", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_list){return L$(resolve(L_idx))(L_list, L_func, 0);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("idx", 3, "idx list func pos = list\n  \\h t D . func h\n    pos\n    idx t func (+ 1 pos)\n  -1", lazy((function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_pos){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_func)(L_h)(L_pos)(function(){
  return L$(resolve(L_idx))(L_t, L_func, function(){
  return resolve(L_$o)(1, L_pos);
});
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()))(-1);};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("index", 2, "index list el = find (\\item . == el item) list", lazy((function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_el){return L$(resolve(L_find))(lazy((function(){
  var L$F = function(L_item){return resolve(L_$p$p)(L_el, L_item);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()), L_list);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("_map", 2, "_map func l = isCons l\n  cons (func (head l)) (_map func (tail l))\n  l", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_l){return L$(resolve(L_isCons))(L_l, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_func)(function(){
  return resolve(L_head)(L_l);
});
}, function(){
  return L$(resolve(L__map))(L_func, function(){
  return resolve(L_tail)(L_l);
});
});
}, L_l);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("map", 0, "map = _map", L__map);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("intersperse", 2, "intersperse list element = list (\\h t D .\n  isNil t\n    list\n    cons h (cons element (intersperse t element))) nil", lazy((function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_element){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return L$(resolve(L_isNil))(L_t, L_list, function(){
  return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_cons))(L_element, function(){
  return L$(resolve(L_intersperse))(L_t, L_element);
});
});
});};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("join", 2, "join list el = strCat (intersperse list el)", lazy((function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_el){return resolve(L_strCat)(function(){
  return L$(resolve(L_intersperse))(L_list, L_el);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("assertAlist", 3, "assertAlist msg value result = assert (isAlist value) (strCat (cons msg (cons ' should be a association list, but it is not; its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))) result", lazy((function(){
  var L$F = function(L_msg){return (function(){
  var L$F = function(L_value){return (function(){
  var L$F = function(L_result){return resolve(L_assert)(function(){
  return resolve(L_isAlist)(L_value);
}, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))(L_msg, function(){
  return L$(resolve(L_cons))(" should be a association list, but it is not; its type is ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_getType)(L_value);
}, function(){
  return L$(resolve(L_cons))(": ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_show)(L_value);
}, L_nil);
});
});
});
});
});
}, L_result);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("acons", 3, "acons k v alist = assertAlist \"acons alist\" alist (\\@ type cons . \\f . \\@ assoc true . f (cons k v) alist)", lazy((function(){
  var L$F = function(L_k){return (function(){
  var L$F = function(L_v){return (function(){
  var L$F = function(L_alist){return L$(resolve(L_assertAlist))("acons alist", L_alist, lazy(setType((function(){
  var L$F = setLambdaProperties(function(L_f){return resolve(L_f)(function(){
  return L$(resolve(L_cons))(L_k, L_v);
})(L_alist);}, {"assoc":"true"});
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'cons')));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("assoc", 2, "assoc k alist  = find (\\el . eq k (head el)) alist (\\cell . cell \\head tail . some tail) none", lazy((function(){
  var L$F = function(L_k){return (function(){
  var L$F = function(L_alist){return L$(resolve(L_find))(lazy((function(){
  var L$F = function(L_el){return resolve(L_eq)(L_k, function(){
  return resolve(L_head)(L_el);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()), L_alist, lazy((function(){
  var L$F = function(L_cell){return resolve(L_cell)(lazy((function(){
  var L$F = function(L_head){return (function(){
  var L$F = function(L_tail){return resolve(L_some)(L_tail);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()), L_none);};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("rassoc", 2, "rassoc v alist = find (\\el . eq v (tail el)) alist (\\cell . cell \\head tail . some head) none", lazy((function(){
  var L$F = function(L_v){return (function(){
  var L$F = function(L_alist){return L$(resolve(L_find))(lazy((function(){
  var L$F = function(L_el){return resolve(L_eq)(L_v, function(){
  return resolve(L_tail)(L_el);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()), L_alist, lazy((function(){
  var L$F = function(L_cell){return resolve(L_cell)(lazy((function(){
  var L$F = function(L_head){return (function(){
  var L$F = function(L_tail){return resolve(L_some)(L_head);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()), L_none);};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isAlist", 1, "isAlist obj = or (isNil obj) (hasProperty obj 'assoc')", lazy((function(){
  var L$F = function(L_obj){return L$(resolve(L_or))(function(){
  return resolve(L_isNil)(L_obj);
}, function(){
  return L$(resolve(L_hasProperty))(L_obj, "assoc");
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("aconsPair", 2, "aconsPair keyValue list = \\@ type cons . \\f . \\@ assoc true . f keyValue list", lazy((function(){
  var L$F = function(L_keyValue){return (function(){
  var L$F = function(L_list){return setType((function(){
  var L$F = setLambdaProperties(function(L_f){return resolve(L_f)(L_keyValue)(L_list);}, {"assoc":"true"});
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'cons');};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("appendAlist", 2, "appendAlist a b = _foldr aconsPair a b", lazy((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return L$(resolve(L__foldr))(L_aconsPair, L_a, L_b);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("keys", 1, "keys list = _map (\\l . head l) list", lazy((function(){
  var L$F = function(L_list){return L$(resolve(L__map))(lazy((function(){
  var L$F = function(L_l){return resolve(L_head)(L_l);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()), L_list);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("getProperty", 2, "getProperty func prop = assoc prop (getProperties func)", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_prop){return L$(resolve(L_assoc))(L_prop, function(){
  return resolve(L_getProperties)(L_func);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("hasProperty", 2, "hasProperty func prop = getProperty func prop\n  \\_ . true\n  false", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_prop){return L$(resolve(L_getProperty))(L_func, L_prop, lazy((function(){
  var L$F = function(L__){return resolve(L_true);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()), L_false);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("odds", 1, "odds l = l\n  \\h t D . cons h (evens t)\n  nil", lazy((function(){
  var L$F = function(L_l){return resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return L$(resolve(L_cons))(L_h, function(){
  return resolve(L_evens)(L_t);
});};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("evens", 1, "evens l = l\n  \\h t D . odds t\n  nil", lazy((function(){
  var L$F = function(L_l){return resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_odds)(L_t);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("cleave", 1, "cleave l = cons (evens l) (odds l)", lazy((function(){
  var L$F = function(L_l){return L$(resolve(L_cons))(function(){
  return resolve(L_evens)(L_l);
}, function(){
  return resolve(L_odds)(L_l);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  return resolve(L_define)("merge", 3, "merge cmp a b = a\n  \\ah at D . b\n    \\bh bt D . cmp ah bh\n      cons ah (merge cmp at b)\n      cons bh (merge cmp a bt)\n    a\n  b", lazy((function(){
  var L$F = function(L_cmp){return (function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_a)(lazy((function(){
  var L$F = function(L_ah){return (function(){
  var L$F = function(L_at){return (function(){
  var L$F = function(L_D){return resolve(L_b)(lazy((function(){
  var L$F = function(L_bh){return (function(){
  var L$F = function(L_bt){return (function(){
  var L$F = function(L_D_0){return resolve(L_cmp)(L_ah)(L_bh)(function(){
  return L$(resolve(L_cons))(L_ah, function(){
  return L$(resolve(L_merge))(L_cmp, L_at, L_b);
});
})(function(){
  return L$(resolve(L_cons))(L_bh, function(){
  return L$(resolve(L_merge))(L_cmp, L_a, L_bt);
});
});};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()))(L_a);};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})()))(L_b);};
  L$F.L$info = L$FUNC_15;
  return L$F;
})();};
  L$F.L$info = L$FUNC_16;
  return L$F;
})();};
  L$F.L$info = L$FUNC_17;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("mergeSort", 2, "mergeSort cmp l = l\n  \\h t D . eq (tail l) nil\n    l\n    \\\\\n      cl = cleave l\n      e = head cl\n      o = tail cl\n      .\n      merge cmp (mergeSort cmp e) (mergeSort cmp o)\n  nil", lazy((function(){
  var L$F = function(L_cmp){return (function(){
  var L$F = function(L_l){return resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_eq)(function(){
  return resolve(L_tail)(L_l);
}, L_nil)(L_l)(function(){
  return (function(){  var L_cl, L_e, L_o;
  L_cl = function(){
  return resolve(L_cleave)(L_l);
};
  L_e = function(){
  return resolve(L_head)(L_cl);
};
  L_o = function(){
  return resolve(L_tail)(L_cl);
};

  return L$(resolve(L_merge))(L_cmp, function(){
  return L$(resolve(L_mergeSort))(L_cmp, L_e);
}, function(){
  return L$(resolve(L_mergeSort))(L_cmp, L_o);
})})();
});};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("insertSorted", 3, "insertSorted sortFunc item list = list\n  \\h t D . sortFunc item h (cons item list) (cons h (insertSorted sortFunc item t))\n  cons item nil", lazy((function(){
  var L$F = function(L_sortFunc){return (function(){
  var L$F = function(L_item){return (function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_sortFunc)(L_item)(L_h)(function(){
  return L$(resolve(L_cons))(L_item, L_list);
})(function(){
  return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_insertSorted))(L_sortFunc, L_item, L_t);
});
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()))(function(){
  return L$(resolve(L_cons))(L_item, L_nil);
});};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("err", 1, "err msg = \\f . f msg", lazy(setDataType((function(){
  var L$F = function(L_msg){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_msg);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})(), 'err');};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'err')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("errMsg", 1, "errMsg err = err \\m . m", lazy((function(){
  var L$F = function(L_err){return resolve(L_err)(lazy((function(){
  var L$F = function(L_m){return resolve(L_m);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isErr", 1, "isErr thing = hasType thing err", lazy((function(){
  var L$F = function(L_thing){return resolve(L_hasType)(L_thing, L_err);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("ifNotErr", 2, "ifNotErr thing cont = (isErr thing) thing (cont thing)", lazy((function(){
  var L$F = function(L_thing){return (function(){
  var L$F = function(L_cont){return L$(resolve(L_isErr))(L_thing, L_thing, function(){
  return resolve(L_cont)(L_thing);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_debugType)("Parser");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_setNameSpace)("parser");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("token", 2, "token txt pos = \\f . f txt pos", lazy(setDataType((function(){
  var L$F = function(L_txt){return (function(){
  var L$F = function(L_pos){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_txt)(L_pos);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'token');};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'token')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("tokenString", 1, "tokenString tok = tok \\t p . t", lazy((function(){
  var L$F = function(L_tok){return resolve(L_tok)(lazy((function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_p){return resolve(L_t);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("tokenFilepos", 1, "tokenFilepos tok = tok \\t p . p", lazy((function(){
  var L$F = function(L_tok){return resolve(L_tok)(lazy((function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_p){return resolve(L_p);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("tokenPos", 1, "tokenPos tok = tok \\t p . isFilepos p\n  fileposOffset p\n  p", lazy((function(){
  var L$F = function(L_tok){return resolve(L_tok)(lazy((function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_p){return L$(resolve(L_isFilepos))(L_p, function(){
  return resolve(L_fileposOffset)(L_p);
}, L_p);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isToken", 1, "isToken t = hasType t token", lazy((function(){
  var L$F = function(L_t){return resolve(L_hasType)(L_t, L_token);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("emptyLineStarts", 0, "emptyLineStarts = cons 'EMPTYFILE.lsr' (cons 1 nil)", function(){
  return L$(resolve(L_cons))("EMPTYFILE.lsr", function(){
  return L$(resolve(L_cons))(1, L_nil);
});
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("filepos", 3, "filepos file line offset = \\f . f file line offset", lazy(setDataType((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_offset){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_file)(L_line)(L_offset);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'filepos');};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})(), 'filepos')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("fileposFile", 1, "fileposFile p = p \\file line offset . file", lazy((function(){
  var L$F = function(L_p){return resolve(L_p)(lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_offset){return resolve(L_file);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("fileposLine", 1, "fileposLine p = p \\file line offset . line", lazy((function(){
  var L$F = function(L_p){return resolve(L_p)(lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_offset){return resolve(L_line);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("fileposOffset", 1, "fileposOffset p = p \\file line offset . offset", lazy((function(){
  var L$F = function(L_p){return resolve(L_p)(lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_offset){return resolve(L_offset);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isFilepos", 1, "isFilepos p = hasType p filepos", lazy((function(){
  var L$F = function(L_p){return resolve(L_hasType)(L_p, L_filepos);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("addFilepos", 2, "addFilepos pos change = isFilepos pos pos emptyFilePos\n  \\file line offset . filepos file line (+ offset change)", lazy((function(){
  var L$F = function(L_pos){return (function(){
  var L$F = function(L_change){return L$(resolve(L_isFilepos))(L_pos, L_pos, L_emptyFilePos, lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_offset){return resolve(L_filepos)(L_file)(L_line)(function(){
  return resolve(L_$o)(L_offset, L_change);
});};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("emptyFilePos", 0, "emptyFilePos = filepos 'NOTHING.lsr' 0 0", function(){
  return resolve(L_filepos)("NOTHING.lsr")(0)(0);
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isEmptyPos", 1, "isEmptyPos pos = and (isFilepos pos) (and (eq 0 (fileposLine pos)) (eq 0 (fileposOffset pos)))", lazy((function(){
  var L$F = function(L_pos){return L$(resolve(L_and))(function(){
  return resolve(L_isFilepos)(L_pos);
}, function(){
  return L$(resolve(L_and))(function(){
  return resolve(L_eq)(0, function(){
  return resolve(L_fileposLine)(L_pos);
});
}, function(){
  return resolve(L_eq)(0, function(){
  return resolve(L_fileposOffset)(L_pos);
});
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("emptyFor", 1, "emptyFor thing = filepos (fileposFile (position thing)) 0 0", lazy((function(){
  var L$F = function(L_thing){return resolve(L_filepos)(function(){
  return resolve(L_fileposFile)(function(){
  return resolve(L_position)(L_thing);
});
})(0)(0);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("startFilePos", 0, "startFilePos = emptyFilePos", L_emptyFilePos);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("filePosFor", 2, "filePosFor lineStarts offset = countFilePos (head (tail lineStarts)) 0 (tail (tail lineStarts)) offset\n  \\line offset . filepos (head lineStarts) line offset", lazy((function(){
  var L$F = function(L_lineStarts){return (function(){
  var L$F = function(L_offset){return L$(resolve(L_countFilePos))(function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(L_lineStarts);
});
}, 0, function(){
  return resolve(L_tail)(function(){
  return resolve(L_tail)(L_lineStarts);
});
}, L_offset, lazy((function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_offset_0){return resolve(L_filepos)(function(){
  return resolve(L_head)(L_lineStarts);
})(L_line)(L_offset_0);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("countFilePos", 4, "countFilePos line lineOffset starts offset = or (isNil starts) (> (head starts) offset)\n  \\f . f line (- offset lineOffset)\n  countFilePos (+ line 1) (head starts) (tail starts) offset", lazy((function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_lineOffset){return (function(){
  var L$F = function(L_starts){return (function(){
  var L$F = function(L_offset){return L$(resolve(L_or))(function(){
  return resolve(L_isNil)(L_starts);
}, function(){
  return resolve(L_$z)(function(){
  return resolve(L_head)(L_starts);
}, L_offset);
}, lazy((function(){
  var L$F = function(L_f){return resolve(L_f)(L_line)(function(){
  return resolve(L_$_)(L_offset, L_lineOffset);
});};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()), function(){
  return L$(resolve(L_countFilePos))(function(){
  return resolve(L_$o)(L_line, 1);
}, function(){
  return resolve(L_head)(L_starts);
}, function(){
  return resolve(L_tail)(L_starts);
}, L_offset);
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("fileposList", 1, "fileposList pos = pos \\file line offset . cons line (cons offset nil)", lazy((function(){
  var L$F = function(L_pos){return resolve(L_pos)(lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_offset){return L$(resolve(L_cons))(L_line, function(){
  return L$(resolve(L_cons))(L_offset, L_nil);
});};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("parens", 3, "parens start end content = \\f . f start end content", lazy(setDataType((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_end){return (function(){
  var L$F = function(L_content){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_start)(L_end)(L_content);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'parens');};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})(), 'parens')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("parensStart", 1, "parensStart p = p \\s e c . s", lazy((function(){
  var L$F = function(L_p){return resolve(L_p)(lazy((function(){
  var L$F = function(L_s){return (function(){
  var L$F = function(L_e){return (function(){
  var L$F = function(L_c){return resolve(L_s);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("parensEnd", 1, "parensEnd p = p \\s e c . e", lazy((function(){
  var L$F = function(L_p){return resolve(L_p)(lazy((function(){
  var L$F = function(L_s){return (function(){
  var L$F = function(L_e){return (function(){
  var L$F = function(L_c){return resolve(L_e);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("parensContent", 1, "parensContent p = p \\s e c . c", lazy((function(){
  var L$F = function(L_p){return resolve(L_p)(lazy((function(){
  var L$F = function(L_s){return (function(){
  var L$F = function(L_e){return (function(){
  var L$F = function(L_c){return resolve(L_c);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isParens", 1, "isParens p = hasType p parens", lazy((function(){
  var L$F = function(L_p){return resolve(L_hasType)(L_p, L_parens);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("makeParens", 3, "makeParens start end content =\n  and (isCons content) (isNil (tail content))\n    makeParens start end (head content)\n    or (isToken content) (isParens content)\n      content\n      parens start end content", lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_end){return (function(){
  var L$F = function(L_content){return L$(resolve(L_and))(function(){
  return resolve(L_isCons)(L_content);
}, function(){
  return resolve(L_isNil)(function(){
  return resolve(L_tail)(L_content);
});
}, function(){
  return L$(resolve(L_makeParens))(L_start, L_end, function(){
  return resolve(L_head)(L_content);
});
}, function(){
  return L$(resolve(L_or))(function(){
  return resolve(L_isToken)(L_content);
}, function(){
  return resolve(L_isParens)(L_content);
}, L_content, function(){
  return resolve(L_parens)(L_start)(L_end)(L_content);
});
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("parensFromToks", 3, "parensFromToks left right content = \\\\\n  start = tokenFilepos left\n  end = addFilepos (tokenFilepos right) (strLen (tokenString right))\n  .\n  parens start end content", lazy((function(){
  var L$F = function(L_left){return (function(){
  var L$F = function(L_right){return (function(){
  var L$F = function(L_content){return (function(){  var L_start, L_end;
  L_start = function(){
  return resolve(L_tokenFilepos)(L_left);
};
  L_end = function(){
  return L$(resolve(L_addFilepos))(function(){
  return resolve(L_tokenFilepos)(L_right);
}, function(){
  return resolve(L_strLen)(function(){
  return resolve(L_tokenString)(L_right);
});
});
};

  return resolve(L_parens)(L_start)(L_end)(L_content)})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("stripParens", 1, "stripParens p = isParens p (stripParens (parensContent p)) p", lazy((function(){
  var L$F = function(L_p){return L$(resolve(L_isParens))(L_p, function(){
  return resolve(L_stripParens)(function(){
  return resolve(L_parensContent)(L_p);
});
}, L_p);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("withStripped", 2, "withStripped p cont = cont (stripParens p)", lazy((function(){
  var L$F = function(L_p){return (function(){
  var L$F = function(L_cont){return resolve(L_cont)(function(){
  return resolve(L_stripParens)(L_p);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("parseErr", 2, "parseErr msg1 msg2 = err (strCat (cons msg1 (cons msg2 nil)))", lazy((function(){
  var L$F = function(L_msg1){return (function(){
  var L$F = function(L_msg2){return resolve(L_err)(function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))(L_msg1, function(){
  return L$(resolve(L_cons))(L_msg2, L_nil);
});
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("lineStart", 0, "lineStart  = regexp '^\\\\r?\\\\n'", function(){
  return resolve(L_regexp)("^\\r?\\n");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("commentPat", 0, "commentPat = regexp '^\\\\r?\\\\n[ \\\\i]*#'", function(){
  return resolve(L_regexp)("^\\r?\\n[ \\i]*#");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("emptyToken", 0, "emptyToken = regexp '^\\\\r?\\\\n[ \\\\i]*(#|$)'", function(){
  return resolve(L_regexp)("^\\r?\\n[ \\i]*(#|$)");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("makeTokens", 3, "makeTokens lineStarts strings start = _withRecur\n  makeMoreTokens lineStarts strings start nil", lazy((function(){
  var L$F = function(L_lineStarts){return (function(){
  var L$F = function(L_strings){return (function(){
  var L$F = function(L_start){return resolve(L__withRecur)(function(){
  return L$(resolve(L_makeMoreTokens))(L_lineStarts, L_strings, L_start, L_nil);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  return resolve(L_define)("makeMoreTokens", 4, "makeMoreTokens lineStarts strings start result = strings\n  \\h t D . _recur\n    makeMoreTokens lineStarts t (+ start (strLen h))\n      or (or (strStartsWith h ' ') (strStartsWith h '#')) (and (strMatches h emptyToken) (or (isNil t) (strMatches (head t) lineStart)))\n        result\n        cons (makeTokenAt lineStarts h start) result\n  _reverse result", lazy((function(){
  var L$F = function(L_lineStarts){return (function(){
  var L$F = function(L_strings){return (function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_result){return resolve(L_strings)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L__recur)(function(){
  return L$(resolve(L_makeMoreTokens))(L_lineStarts, L_t, function(){
  return resolve(L_$o)(L_start, function(){
  return resolve(L_strLen)(L_h);
});
}, function(){
  return L$(resolve(L_or))(function(){
  return L$(resolve(L_or))(function(){
  return L$(resolve(L_strStartsWith))(L_h, " ");
}, function(){
  return L$(resolve(L_strStartsWith))(L_h, "#");
});
}, function(){
  return L$(resolve(L_and))(function(){
  return L$(resolve(L_strMatches))(L_h, L_emptyToken);
}, function(){
  return L$(resolve(L_or))(function(){
  return resolve(L_isNil)(L_t);
}, function(){
  return L$(resolve(L_strMatches))(function(){
  return resolve(L_head)(L_t);
}, L_lineStart);
});
});
}, L_result, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_makeTokenAt))(L_lineStarts, L_h, L_start);
}, L_result);
});
});
});};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()))(function(){
  return resolve(L__reverse)(L_result);
});};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("makeTokenAt", 3, "makeTokenAt lineStarts txt offset = isNil (strMatch txt zeroNum)\n  token txt (filePosFor lineStarts offset)\n  token (strReplace txt zeroPrefix '') (filePosFor lineStarts offset)", lazy((function(){
  var L$F = function(L_lineStarts){return (function(){
  var L$F = function(L_txt){return (function(){
  var L$F = function(L_offset){return L$(resolve(L_isNil))(function(){
  return L$(resolve(L_strMatch))(L_txt, L_zeroNum);
}, function(){
  return resolve(L_token)(L_txt)(function(){
  return L$(resolve(L_filePosFor))(L_lineStarts, L_offset);
});
}, function(){
  return resolve(L_token)(function(){
  return L$(resolve(L_strReplace))(L_txt, L_zeroPrefix, "");
})(function(){
  return L$(resolve(L_filePosFor))(L_lineStarts, L_offset);
});
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("showToken", 1, "showToken tok = log (strCat (cons 'token: ' (cons (tokenString tok) (cons ', ' (cons (showPos (tokenPos tok)) nil))))) tok", lazy((function(){
  var L$F = function(L_tok){return resolve(L_log)(function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("token: ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tokenString)(L_tok);
}, function(){
  return L$(resolve(L_cons))(", ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_showPos)(function(){
  return resolve(L_tokenPos)(L_tok);
});
}, L_nil);
});
});
});
});
}, L_tok);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("showPos", 1, "showPos pos = isFilepos pos\n  strCat (cons 'position: ' (cons (fileposFile pos) (cons ', ' (cons (fileposLine pos) (cons '.' (cons (fileposOffset pos) nil))))))\n  pos", lazy((function(){
  var L$F = function(L_pos){return L$(resolve(L_isFilepos))(L_pos, function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("position: ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_fileposFile)(L_pos);
}, function(){
  return L$(resolve(L_cons))(", ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_fileposLine)(L_pos);
}, function(){
  return L$(resolve(L_cons))(".", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_fileposOffset)(L_pos);
}, L_nil);
});
});
});
});
});
});
}, L_pos);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("splitTokens", 2, "splitTokens str pat = filter (\\s . not (eq s '')) (basicSplitTokens str pat true)", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return L$(resolve(L_filter))(lazy((function(){
  var L$F = function(L_s){return resolve(L_not)(function(){
  return resolve(L_eq)(L_s, "");
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()), function(){
  return L$(resolve(L_basicSplitTokens))(L_str, L_pat, L_true);
});};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("numberPat", 0, "numberPat = regexp '-?([0-9]+(\\\\.[0-9]+)?|\\\\.[0-9]+)'", function(){
  return resolve(L_regexp)("-?([0-9]+(\\.[0-9]+)?|\\.[0-9]+)");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("zeroNum", 0, "zeroNum = regexp '^0+[0-9]'", function(){
  return resolve(L_regexp)("^0+[0-9]");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("zeroPrefix", 0, "zeroPrefix = regexp '^0+'", function(){
  return resolve(L_regexp)("^0+");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("matchOffset", 2, "matchOffset str match = isNil match\n  strLen str\n  head (tail (tail match))", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_match){return L$(resolve(L_isNil))(L_match, function(){
  return resolve(L_strLen)(L_str);
}, function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(function(){
  return resolve(L_tail)(L_match);
});
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("basicSplitTokens", 3, "basicSplitTokens str pat prevIsDel = _reverse\n  _withRecur (_basicSplitTokens str pat prevIsDel nil)", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_prevIsDel){return resolve(L__reverse)(function(){
  return resolve(L__withRecur)(function(){
  return L$(resolve(L__basicSplitTokens))(L_str, L_pat, L_prevIsDel, L_nil);
});
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: null, length: 1};
  var L$FUNC_12 = {name: null, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: null, length: 1};
  var L$FUNC_17 = {name: null, length: 1};
  var L$FUNC_18 = {name: null, length: 1};
  var L$FUNC_19 = {name: undefined, length: 1};
  var L$FUNC_20 = {name: undefined, length: 1};
  var L$FUNC_21 = {name: undefined, length: 1};
  var L$FUNC_22 = {name: undefined, length: 1};
  var L$FUNC_23 = {name: undefined, length: 1};
  var L$FUNC_24 = {name: undefined, length: 1};
  var L$FUNC_25 = {name: undefined, length: 1};
  return resolve(L_define)("_basicSplitTokens", 4, "_basicSplitTokens str pat prevIsDel toks = == str ''\n  toks\n  \\\\\n    num = strMatch str numberPat\n    del = strMatch str pat\n    numOffset = matchOffset str num\n    delOffset = matchOffset str del\n    select = and (== numOffset 0) prevIsDel\n      \\del num first . num\n      == delOffset 0\n        \\del num first . del\n        \\del num first . first\n    first = select (head del) (head num) (strSubstring str 0 delOffset)\n    .\n    _recur\n      _basicSplitTokens\n        strSubstring str (strLen first) 0\n        pat\n        select true false false\n        cons first toks", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_prevIsDel){return (function(){
  var L$F = function(L_toks){return resolve(L_$p$p)(L_str, "")(L_toks)(function(){
  return (function(){  var L_num, L_del, L_numOffset, L_delOffset, L_select, L_first;
  L_num = function(){
  return L$(resolve(L_strMatch))(L_str, L_numberPat);
};
  L_del = function(){
  return L$(resolve(L_strMatch))(L_str, L_pat);
};
  L_numOffset = function(){
  return L$(resolve(L_matchOffset))(L_str, L_num);
};
  L_delOffset = function(){
  return L$(resolve(L_matchOffset))(L_str, L_del);
};
  L_select = function(){
  return L$(resolve(L_and))(function(){
  return resolve(L_$p$p)(L_numOffset, 0);
}, L_prevIsDel, lazy((function(){
  var L$F = function(L_del_0){return (function(){
  var L$F = function(L_num_1){return (function(){
  var L$F = function(L_first){return resolve(L_num_1);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()), function(){
  return resolve(L_$p$p)(L_delOffset, 0)(lazy((function(){
  var L$F = function(L_del_0){return (function(){
  var L$F = function(L_num_1){return (function(){
  var L$F = function(L_first){return resolve(L_del_0);};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()))(lazy((function(){
  var L$F = function(L_del_0){return (function(){
  var L$F = function(L_num_1){return (function(){
  var L$F = function(L_first){return resolve(L_first);};
  L$F.L$info = L$FUNC_19;
  return L$F;
})();};
  L$F.L$info = L$FUNC_20;
  return L$F;
})();};
  L$F.L$info = L$FUNC_21;
  return L$F;
})()));
});
};
  L_first = function(){
  return resolve(L_select)(function(){
  return resolve(L_head)(L_del);
})(function(){
  return resolve(L_head)(L_num);
})(function(){
  return L$(resolve(L_strSubstring))(L_str, 0, L_delOffset);
});
};

  return resolve(L__recur)(function(){
  return L$(resolve(L__basicSplitTokens))(function(){
  return L$(resolve(L_strSubstring))(L_str, function(){
  return resolve(L_strLen)(L_first);
}, 0);
}, L_pat, function(){
  return resolve(L_select)(L_true)(L_false)(L_false);
}, function(){
  return L$(resolve(L_cons))(L_first, L_toks);
});
})})();
});};
  L$F.L$info = L$FUNC_22;
  return L$F;
})();};
  L$F.L$info = L$FUNC_23;
  return L$F;
})();};
  L$F.L$info = L$FUNC_24;
  return L$F;
})();};
  L$F.L$info = L$FUNC_25;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("tokens", 2, "tokens str pat = countedTokens emptyLineStarts str pat", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return L$(resolve(L_countedTokens))(L_emptyLineStarts, L_str, L_pat);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("countedTokens", 3, "countedTokens lineStarts str pat = makeTokens lineStarts (splitTokens str pat) 0", lazy((function(){
  var L$F = function(L_lineStarts){return (function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return L$(resolve(L_makeTokens))(L_lineStarts, function(){
  return L$(resolve(L_splitTokens))(L_str, L_pat);
}, 0);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("isTokenString", 2, "isTokenString tok str = or\n  and (isToken tok) (eq (tokenString tok) str)\n  and (isString tok) (eq tok str)", lazy((function(){
  var L$F = function(L_tok){return (function(){
  var L$F = function(L_str){return L$(resolve(L_or))(function(){
  return L$(resolve(L_and))(function(){
  return resolve(L_isToken)(L_tok);
}, function(){
  return resolve(L_eq)(function(){
  return resolve(L_tokenString)(L_tok);
}, L_str);
});
}, function(){
  return L$(resolve(L_and))(function(){
  return resolve(L_isString)(L_tok);
}, function(){
  return resolve(L_eq)(L_tok, L_str);
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("isTokenStart", 2, "isTokenStart tok str = or\n  and (isToken tok) (strStartsWith (tokenString tok) str)\n  and (isString tok) (strStartsWith tok str)", lazy((function(){
  var L$F = function(L_tok){return (function(){
  var L$F = function(L_str){return L$(resolve(L_or))(function(){
  return L$(resolve(L_and))(function(){
  return resolve(L_isToken)(L_tok);
}, function(){
  return L$(resolve(L_strStartsWith))(function(){
  return resolve(L_tokenString)(L_tok);
}, L_str);
});
}, function(){
  return L$(resolve(L_and))(function(){
  return resolve(L_isString)(L_tok);
}, function(){
  return L$(resolve(L_strStartsWith))(L_tok, L_str);
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("strTokenString", 1, "strTokenString tok = withToken tok nil \\str pos . str", lazy((function(){
  var L$F = function(L_tok){return L$(resolve(L_withToken))(L_tok, L_nil, lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pos){return resolve(L_str);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("withToken", 3, "withToken tok nonTokCase tokCase = isToken tok\n  tokCase (tokenString tok) (tokenPos tok)\n  isString tok\n    tokCase tok emptyFilePos\n    nonTokCase", lazy((function(){
  var L$F = function(L_tok){return (function(){
  var L$F = function(L_nonTokCase){return (function(){
  var L$F = function(L_tokCase){return L$(resolve(L_isToken))(L_tok, function(){
  return resolve(L_tokCase)(function(){
  return resolve(L_tokenString)(L_tok);
})(function(){
  return resolve(L_tokenPos)(L_tok);
});
}, function(){
  return L$(resolve(L_isString))(L_tok, function(){
  return resolve(L_tokCase)(L_tok)(L_emptyFilePos);
}, L_nonTokCase);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("parseToks", 2, "parseToks toks groups =\n  isNil toks nil\n    ifNotErr (parseTok toks groups) \\list . list \\h t .\n      ifNotErr (parseToks t groups) \\res .\n        cons h\n          and (isCons res) (isBlockStart (head res))\n            cons res nil\n            res", lazy((function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_groups){return L$(resolve(L_isNil))(L_toks, L_nil, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_parseTok))(L_toks, L_groups);
}, lazy((function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_parseToks))(L_t, L_groups);
}, lazy((function(){
  var L$F = function(L_res){return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_and))(function(){
  return resolve(L_isCons)(L_res);
}, function(){
  return resolve(L_isBlockStart)(function(){
  return resolve(L_head)(L_res);
});
}, function(){
  return L$(resolve(L_cons))(L_res, L_nil);
}, L_res);
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  return resolve(L_define)("parseTok", 2, "parseTok toks groups = withCons toks nil \\h t .\n  withToken h toks \\txt pos .\n    assoc txt groups\n      \\close . parseGroup h t nil close groups\n      (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (parseIndent h t nil groups)\n        toks", lazy((function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_groups){return L$(resolve(L_withCons))(L_toks, L_nil, lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_withToken))(L_h, L_toks, lazy((function(){
  var L$F = function(L_txt){return (function(){
  var L$F = function(L_pos){return L$(resolve(L_assoc))(L_txt, L_groups, lazy((function(){
  var L$F = function(L_close){return L$(resolve(L_parseGroup))(L_h, L_t, L_nil, L_close, L_groups);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()), function(){
  return L$(resolve(L_or))(function(){
  return L$(resolve(L_isTokenStart))(L_h, "\n");
}, function(){
  return L$(resolve(L_isTokenStart))(L_h, "\r\n");
}, function(){
  return L$(resolve(L_parseIndent))(L_h, L_t, L_nil, L_groups);
}, L_toks);
});};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: null, length: 1};
  var L$FUNC_14 = {name: null, length: 1};
  var L$FUNC_15 = {name: null, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: null, length: 1};
  var L$FUNC_18 = {name: null, length: 1};
  var L$FUNC_19 = {name: null, length: 1};
  var L$FUNC_20 = {name: undefined, length: 1};
  var L$FUNC_21 = {name: undefined, length: 1};
  var L$FUNC_22 = {name: undefined, length: 1};
  var L$FUNC_23 = {name: undefined, length: 1};
  var L$FUNC_24 = {name: undefined, length: 1};
  var L$FUNC_25 = {name: undefined, length: 1};
  var L$FUNC_26 = {name: undefined, length: 1};
  var L$FUNC_27 = {name: undefined, length: 1};
  var L$FUNC_28 = {name: undefined, length: 1};
  var L$FUNC_29 = {name: undefined, length: 1};
  var L$FUNC_30 = {name: undefined, length: 1};
  var L$FUNC_31 = {name: undefined, length: 1};
  return resolve(L_define)("parseGroup", 5, "parseGroup left toks gr close groups = withCons toks (parseErr 'Unterminated group starting ' (loc left))\n  \\h t . isTokenString h close\n    eq close ')'\n      cons (parensFromToks left h (_reverse gr)) t\n      cons (cons left (cons (_reverse gr) (cons h nil))) t\n    withToken h\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT .\n        parseGroup left restT (cons restH gr) close groups\n      \\txt pos .\n        rassoc txt groups\n          \\open . parseErr (strCat (cons 'Mismatched group: ' (cons (tokenString left) (cons txt (cons ' ' nil))))) (loc left)\n          ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseGroup left restT (cons restH gr) close groups", lazy((function(){
  var L$F = function(L_left){return (function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_gr){return (function(){
  var L$F = function(L_close){return (function(){
  var L$F = function(L_groups){return L$(resolve(L_withCons))(L_toks, function(){
  return resolve(L_parseErr)("Unterminated group starting ")(function(){
  return resolve(L_loc)(L_left);
});
}, lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_isTokenString))(L_h, L_close, function(){
  return resolve(L_eq)(L_close, ")")(function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_parensFromToks))(L_left, L_h, function(){
  return resolve(L__reverse)(L_gr);
});
}, L_t);
})(function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_cons))(L_left, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L__reverse)(L_gr);
}, function(){
  return L$(resolve(L_cons))(L_h, L_nil);
});
});
}, L_t);
});
}, function(){
  return L$(resolve(L_withToken))(L_h, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_parseTok))(L_toks, L_groups);
}, lazy((function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_restH){return (function(){
  var L$F = function(L_restT){return L$(resolve(L_parseGroup))(L_left, L_restT, function(){
  return L$(resolve(L_cons))(L_restH, L_gr);
}, L_close, L_groups);};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));
}, lazy((function(){
  var L$F = function(L_txt){return (function(){
  var L$F = function(L_pos){return L$(resolve(L_rassoc))(L_txt, L_groups, lazy((function(){
  var L$F = function(L_open){return resolve(L_parseErr)(function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("Mismatched group: ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tokenString)(L_left);
}, function(){
  return L$(resolve(L_cons))(L_txt, function(){
  return L$(resolve(L_cons))(" ", L_nil);
});
});
});
});
})(function(){
  return resolve(L_loc)(L_left);
});};
  L$F.L$info = L$FUNC_16;
  return L$F;
})()), function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_parseTok))(L_toks, L_groups);
}, lazy((function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_restH){return (function(){
  var L$F = function(L_restT){return L$(resolve(L_parseGroup))(L_left, L_restT, function(){
  return L$(resolve(L_cons))(L_restH, L_gr);
}, L_close, L_groups);};
  L$F.L$info = L$FUNC_20;
  return L$F;
})();};
  L$F.L$info = L$FUNC_21;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_22;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_23;
  return L$F;
})();};
  L$F.L$info = L$FUNC_24;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_25;
  return L$F;
})();};
  L$F.L$info = L$FUNC_26;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_27;
  return L$F;
})();};
  L$F.L$info = L$FUNC_28;
  return L$F;
})();};
  L$F.L$info = L$FUNC_29;
  return L$F;
})();};
  L$F.L$info = L$FUNC_30;
  return L$F;
})();};
  L$F.L$info = L$FUNC_31;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: null, length: 1};
  var L$FUNC_13 = {name: null, length: 1};
  var L$FUNC_14 = {name: null, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  var L$FUNC_18 = {name: undefined, length: 1};
  var L$FUNC_19 = {name: undefined, length: 1};
  var L$FUNC_20 = {name: undefined, length: 1};
  var L$FUNC_21 = {name: undefined, length: 1};
  var L$FUNC_22 = {name: undefined, length: 1};
  var L$FUNC_23 = {name: undefined, length: 1};
  return resolve(L_define)("parseIndent", 4, "parseIndent indent toks gr groups =\n  withCons toks (cons (makeParens (tokenFilepos indent) (lexEnd (head gr)) (_reverse gr)) nil)\n    \\h t . or (withToken h false (\\txt pos . rassoc txt groups (\\open . true) false))\n      and (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (<= (strLen (tokenString h)) (strLen (tokenString indent)))\n      cons (makeParens (tokenFilepos indent) (tokenFilepos h) (_reverse gr)) toks\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseIndent indent restT (cons restH gr) groups", lazy((function(){
  var L$F = function(L_indent){return (function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_gr){return (function(){
  var L$F = function(L_groups){return L$(resolve(L_withCons))(L_toks, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_makeParens))(function(){
  return resolve(L_tokenFilepos)(L_indent);
}, function(){
  return resolve(L_lexEnd)(function(){
  return resolve(L_head)(L_gr);
});
}, function(){
  return resolve(L__reverse)(L_gr);
});
}, L_nil);
}, lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_or))(function(){
  return L$(resolve(L_withToken))(L_h, L_false, lazy((function(){
  var L$F = function(L_txt){return (function(){
  var L$F = function(L_pos){return L$(resolve(L_rassoc))(L_txt, L_groups, lazy((function(){
  var L$F = function(L_open){return resolve(L_true);};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()), L_false);};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_and))(function(){
  return L$(resolve(L_or))(function(){
  return L$(resolve(L_isTokenStart))(L_h, "\n");
}, function(){
  return L$(resolve(L_isTokenStart))(L_h, "\r\n");
});
}, function(){
  return resolve(L_$y$p)(function(){
  return resolve(L_strLen)(function(){
  return resolve(L_tokenString)(L_h);
});
}, function(){
  return resolve(L_strLen)(function(){
  return resolve(L_tokenString)(L_indent);
});
});
});
}, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_makeParens))(function(){
  return resolve(L_tokenFilepos)(L_indent);
}, function(){
  return resolve(L_tokenFilepos)(L_h);
}, function(){
  return resolve(L__reverse)(L_gr);
});
}, L_toks);
}, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_parseTok))(L_toks, L_groups);
}, lazy((function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_restH){return (function(){
  var L$F = function(L_restT){return L$(resolve(L_parseIndent))(L_indent, L_restT, function(){
  return L$(resolve(L_cons))(L_restH, L_gr);
}, L_groups);};
  L$F.L$info = L$FUNC_15;
  return L$F;
})();};
  L$F.L$info = L$FUNC_16;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_17;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_18;
  return L$F;
})();};
  L$F.L$info = L$FUNC_19;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_20;
  return L$F;
})();};
  L$F.L$info = L$FUNC_21;
  return L$F;
})();};
  L$F.L$info = L$FUNC_22;
  return L$F;
})();};
  L$F.L$info = L$FUNC_23;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("nilRange", 0, "nilRange = cons 1 (cons 0 nil)", function(){
  return L$(resolve(L_cons))(1, function(){
  return L$(resolve(L_cons))(0, L_nil);
});
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("lit", 2, "lit value range = \\f . f value range", lazy(setDataType((function(){
  var L$F = function(L_value){return (function(){
  var L$F = function(L_range){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_value)(L_range);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'lit');};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'lit')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("ref", 2, "ref name range = \\f . f name range", lazy(setDataType((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_range){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_name)(L_range);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'ref');};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'ref')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("lambda", 3, "lambda name body range = \\f . f name body range", lazy(setDataType((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_body){return (function(){
  var L$F = function(L_range){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_name)(L_body)(L_range);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'lambda');};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})(), 'lambda')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("apply", 2, "apply func arg = \\f . f func arg", lazy(setDataType((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_arg){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_func)(L_arg);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})(), 'apply');};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'apply')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("let", 4, "let name value body range = \\f . f name value body range", lazy(setDataType((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_value){return (function(){
  var L$F = function(L_body){return (function(){
  var L$F = function(L_range){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_name)(L_value)(L_body)(L_range);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})(), 'let');};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})(), 'let')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("anno", 3, "anno name data body = \\f . f name data body", lazy(setDataType((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_data){return (function(){
  var L$F = function(L_body){return setType((function(){
  var L$F = function(L_f){return resolve(L_f)(L_name)(L_data)(L_body);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})(), 'anno');};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})(), 'anno')));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("withParens", 3, "withParens p err cont = isParens p (p cont) err", lazy((function(){
  var L$F = function(L_p){return (function(){
  var L$F = function(L_err){return (function(){
  var L$F = function(L_cont){return L$(resolve(L_isParens))(L_p, function(){
  return resolve(L_p)(L_cont);
}, L_err);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("setParens", 2, "setParens p func = isParens p\n  p \\start end content . parens start end (func content)\n  func p", lazy((function(){
  var L$F = function(L_p){return (function(){
  var L$F = function(L_func){return L$(resolve(L_isParens))(L_p, function(){
  return resolve(L_p)(lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_end){return (function(){
  var L$F = function(L_content){return resolve(L_parens)(L_start)(L_end)(function(){
  return resolve(L_func)(L_content);
});};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
}, function(){
  return resolve(L_func)(L_p);
});};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("position", 1, "position thing = isToken thing (tokenFilepos thing)\n  isParens thing (parensStart thing)\n    isCons thing\n      \\\\\n        pos = position (head thing)\n        .\n        isEmptyPos pos (position (tail thing)) pos\n      isFilepos thing thing\n        emptyFilePos", lazy((function(){
  var L$F = function(L_thing){return L$(resolve(L_isToken))(L_thing, function(){
  return resolve(L_tokenFilepos)(L_thing);
}, function(){
  return L$(resolve(L_isParens))(L_thing, function(){
  return resolve(L_parensStart)(L_thing);
}, function(){
  return L$(resolve(L_isCons))(L_thing, function(){
  return (function(){  var L_pos;
  L_pos = function(){
  return resolve(L_position)(function(){
  return resolve(L_head)(L_thing);
});
};

  return L$(resolve(L_isEmptyPos))(L_pos, function(){
  return resolve(L_position)(function(){
  return resolve(L_tail)(L_thing);
});
}, L_pos)})();
}, function(){
  return L$(resolve(L_isFilepos))(L_thing, L_thing, L_emptyFilePos);
});
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("lexEnd", 1, "lexEnd thing = isToken thing (addFilepos (tokenFilepos thing) (strLen (tokenString thing)))\n  isParens thing (parensEnd thing)\n    isCons thing (lexEnd (last thing))\n      emptyFilePos", lazy((function(){
  var L$F = function(L_thing){return L$(resolve(L_isToken))(L_thing, function(){
  return L$(resolve(L_addFilepos))(function(){
  return resolve(L_tokenFilepos)(L_thing);
}, function(){
  return resolve(L_strLen)(function(){
  return resolve(L_tokenString)(L_thing);
});
});
}, function(){
  return L$(resolve(L_isParens))(L_thing, function(){
  return resolve(L_parensEnd)(L_thing);
}, function(){
  return L$(resolve(L_isCons))(L_thing, function(){
  return resolve(L_lexEnd)(function(){
  return resolve(L_last)(L_thing);
});
}, L_emptyFilePos);
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("loc", 1, "loc thing = \\\\\n  p = position thing\n  l = isEmptyPos p 'an unknown location' (showPos p)\n  .\n  strCat (cons 'at ' (cons l nil))", lazy((function(){
  var L$F = function(L_thing){return (function(){  var L_p, L_l;
  L_p = function(){
  return resolve(L_position)(L_thing);
};
  L_l = function(){
  return L$(resolve(L_isEmptyPos))(L_p, "an unknown location", function(){
  return resolve(L_showPos)(L_p);
});
};

  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("at ", function(){
  return L$(resolve(L_cons))(L_l, L_nil);
});
})})();};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("scrub", 1, "scrub str = strFromList (scrubList (strToList str))", lazy((function(){
  var L$F = function(L_str){return resolve(L_strFromList)(function(){
  return resolve(L_scrubList)(function(){
  return resolve(L_strToList)(L_str);
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("scrubList", 1, "scrubList list = list\n  \\h t D . \\\\\n    next = scrubList t\n    .\n    eq h '\\\\' (cons h (cons (head t) (scrubList (tail t))))\n      eq h '\\\"' (cons '\\\\' (cons '\\\"' next))\n        cons h next\n  nil", lazy((function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return (function(){  var L_next;
  L_next = function(){
  return resolve(L_scrubList)(L_t);
};

  return resolve(L_eq)(L_h, "\\")(function(){
  return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_head)(L_t);
}, function(){
  return resolve(L_scrubList)(function(){
  return resolve(L_tail)(L_t);
});
});
});
})(function(){
  return resolve(L_eq)(L_h, "\"")(function(){
  return L$(resolve(L_cons))("\\", function(){
  return L$(resolve(L_cons))("\"", L_next);
});
})(function(){
  return L$(resolve(L_cons))(L_h, L_next);
});
})})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  return resolve(L_define)("createAst", 3, "createAst lineStarts inList names = withStripped inList \\list .\n  isToken list (createLitOrRef list names)\n    list\n      \\h t D .\n        isTokenString h '\\\\\\\\' (createLet h t names)\n          isTokenString h '\\\\@' (createAnno h t names)\n            isTokenString h '\\\\' (createLambda h t names)\n              createApply list names\n      nil", lazy((function(){
  var L$F = function(L_lineStarts){return (function(){
  var L$F = function(L_inList){return (function(){
  var L$F = function(L_names){return L$(resolve(L_withStripped))(L_inList, lazy((function(){
  var L$F = function(L_list){return L$(resolve(L_isToken))(L_list, function(){
  return L$(resolve(L_createLitOrRef))(L_list, L_names);
}, function(){
  return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return L$(resolve(L_isTokenString))(L_h, "\\\\", function(){
  return L$(resolve(L_createLet))(L_h, L_t, L_names);
}, function(){
  return L$(resolve(L_isTokenString))(L_h, "\\@", function(){
  return L$(resolve(L_createAnno))(L_h, L_t, L_names);
}, function(){
  return L$(resolve(L_isTokenString))(L_h, "\\", function(){
  return L$(resolve(L_createLambda))(L_h, L_t, L_names);
}, function(){
  return L$(resolve(L_createApply))(L_list, L_names);
});
});
});};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()))(L_nil);
});};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("strMatches", 2, "strMatches str pat = isCons (strMatch str pat)", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return resolve(L_isCons)(function(){
  return L$(resolve(L_strMatch))(L_str, L_pat);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("digit", 0, "digit = regexp '^[0-9]+$'", function(){
  return resolve(L_regexp)("^[0-9]+$");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("backslashCodes", 0, "backslashCodes = 'bfnrt'", "bfnrt");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("backslashValues", 0, "backslashValues = '\\b\\f\\n\\r\\t'", "\b\f\n\r\t");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("convertStringEscape", 3, "convertStringEscape char codes values =\n  eq codes ''\n    char\n    eq char (strAt codes 0)\n      strAt values 0\n      convertStringEscape char (strSubstring codes 1 0) (strSubstring values 1 0)", lazy((function(){
  var L$F = function(L_char){return (function(){
  var L$F = function(L_codes){return (function(){
  var L$F = function(L_values){return resolve(L_eq)(L_codes, "")(L_char)(function(){
  return resolve(L_eq)(L_char, function(){
  return L$(resolve(L_strAt))(L_codes, 0);
})(function(){
  return L$(resolve(L_strAt))(L_values, 0);
})(function(){
  return L$(resolve(L_convertStringEscape))(L_char, function(){
  return L$(resolve(L_strSubstring))(L_codes, 1, 0);
}, function(){
  return L$(resolve(L_strSubstring))(L_values, 1, 0);
});
});
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("convertStringEscapes", 3, "convertStringEscapes orig str cont = \\\\\n  res = _convertStringEscapes orig str\n  .\n  hasType res err\n    res\n    cont res", lazy((function(){
  var L$F = function(L_orig){return (function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_cont){return (function(){  var L_res;
  L_res = function(){
  return L$(resolve(L__convertStringEscapes))(L_orig, L_str);
};

  return resolve(L_hasType)(L_res, L_err)(L_res)(function(){
  return resolve(L_cont)(L_res);
})})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("_convertStringEscapes", 2, "_convertStringEscapes orig str =\n  eq str '' str\n    eq (strAt str 0) '\\\\'\n      eq (strLen str) 1 (parseErr \"Error, backslash without character in string: \" orig)\n        \\\\\n          rest = _convertStringEscapes orig (strSubstring str 2 0)\n          .\n          hasType rest err\n            rest\n            strAdd\n              convertStringEscape (strAt str 1) backslashCodes backslashValues\n              rest\n      \\\\\n        rest = _convertStringEscapes orig (strSubstring str 1 0)\n        .\n        hasType rest err\n          rest\n          strAdd\n            strAt str 0\n            rest", lazy((function(){
  var L$F = function(L_orig){return (function(){
  var L$F = function(L_str){return resolve(L_eq)(L_str, "")(L_str)(function(){
  return resolve(L_eq)(function(){
  return L$(resolve(L_strAt))(L_str, 0);
}, "\\")(function(){
  return resolve(L_eq)(function(){
  return resolve(L_strLen)(L_str);
}, 1)(function(){
  return resolve(L_parseErr)("Error, backslash without character in string: ")(L_orig);
})(function(){
  return (function(){  var L_rest;
  L_rest = function(){
  return L$(resolve(L__convertStringEscapes))(L_orig, function(){
  return L$(resolve(L_strSubstring))(L_str, 2, 0);
});
};

  return resolve(L_hasType)(L_rest, L_err)(L_rest)(function(){
  return L$(resolve(L_strAdd))(function(){
  return L$(resolve(L_convertStringEscape))(function(){
  return L$(resolve(L_strAt))(L_str, 1);
}, L_backslashCodes, L_backslashValues);
}, L_rest);
})})();
});
})(function(){
  return (function(){  var L_rest;
  L_rest = function(){
  return L$(resolve(L__convertStringEscapes))(L_orig, function(){
  return L$(resolve(L_strSubstring))(L_str, 1, 0);
});
};

  return resolve(L_hasType)(L_rest, L_err)(L_rest)(function(){
  return L$(resolve(L_strAdd))(function(){
  return L$(resolve(L_strAt))(L_str, 0);
}, L_rest);
})})();
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("parseString", 2, "parseString str cont =\n  neq (strAt str 0) (strAt str -1) (parseErr \"Badly terminated string: \" str)\n    convertStringEscapes str (strSubstring str 1 -1) cont", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_cont){return L$(resolve(L_neq))(function(){
  return L$(resolve(L_strAt))(L_str, 0);
}, function(){
  return L$(resolve(L_strAt))(L_str, -1);
}, function(){
  return resolve(L_parseErr)("Badly terminated string: ")(L_str);
}, function(){
  return L$(resolve(L_convertStringEscapes))(L_str, function(){
  return L$(resolve(L_strSubstring))(L_str, 1, -1);
}, L_cont);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  return resolve(L_define)("createLitOrRef", 2, "createLitOrRef token names = \\\\\n  tok = tokenString token\n  tokRange = (fileposList (position token))\n  .\n  _contains names tok\n    ref tok tokRange\n    or (strStartsWith tok '\\\"') (strStartsWith tok \"'\")\n      parseString tok \\str . lit str tokRange\n      strStartsWith tok '.'\n        jsonParse (strCat (cons '0' (cons tok nil))) (\\err . ref tok tokRange) (\\item . lit item tokRange)\n        or (and (>= (strAt tok 0) '0') (<= (strAt tok 0) '9')) (strStartsWith tok '-')\n          jsonParse tok (\\err . ref tok tokRange) (\\item . lit item tokRange)\n          ref tok tokRange", lazy((function(){
  var L$F = function(L_token){return (function(){
  var L$F = function(L_names){return (function(){  var L_tok, L_tokRange;
  L_tok = function(){
  return resolve(L_tokenString)(L_token);
};
  L_tokRange = function(){
  return resolve(L_fileposList)(function(){
  return resolve(L_position)(L_token);
});
};

  return L$(resolve(L__contains))(L_names, L_tok, function(){
  return resolve(L_ref)(L_tok)(L_tokRange);
}, function(){
  return L$(resolve(L_or))(function(){
  return L$(resolve(L_strStartsWith))(L_tok, "\"");
}, function(){
  return L$(resolve(L_strStartsWith))(L_tok, "'");
}, function(){
  return L$(resolve(L_parseString))(L_tok, lazy((function(){
  var L$F = function(L_str){return resolve(L_lit)(L_str)(L_tokRange);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_strStartsWith))(L_tok, ".", function(){
  return L$(resolve(L_jsonParse))(function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("0", function(){
  return L$(resolve(L_cons))(L_tok, L_nil);
});
});
}, lazy((function(){
  var L$F = function(L_err){return resolve(L_ref)(L_tok)(L_tokRange);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_item){return resolve(L_lit)(L_item)(L_tokRange);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_or))(function(){
  return L$(resolve(L_and))(function(){
  return resolve(L_$z$p)(function(){
  return L$(resolve(L_strAt))(L_tok, 0);
}, "0");
}, function(){
  return resolve(L_$y$p)(function(){
  return L$(resolve(L_strAt))(L_tok, 0);
}, "9");
});
}, function(){
  return L$(resolve(L_strStartsWith))(L_tok, "-");
}, function(){
  return L$(resolve(L_jsonParse))(L_tok, lazy((function(){
  var L$F = function(L_err){return resolve(L_ref)(L_tok)(L_tokRange);};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_item){return resolve(L_lit)(L_item)(L_tokRange);};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
}, function(){
  return resolve(L_ref)(L_tok)(L_tokRange);
});
});
});
})})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: null, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  var L$FUNC_18 = {name: undefined, length: 1};
  var L$FUNC_19 = {name: undefined, length: 1};
  var L$FUNC_20 = {name: undefined, length: 1};
  var L$FUNC_21 = {name: undefined, length: 1};
  return resolve(L_define)("createLambda", 3, "createLambda start list names = \\\\\n  err = parseErr \"Lambda needs a variable name, a dot, and a body \" (loc start)\n  .\n  withCons list err \\name rest .\n    withToken name err \\n p .\n      withCons rest err \\dot body .\n        # are these partial applications too hard to read?\n        isTokenString dot '.'\n          ifNotErr (createAst nil body (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))\n          ifNotErr (createLambda start rest (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))", lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_names){return (function(){  var L_err;
  L_err = function(){
  return resolve(L_parseErr)("Lambda needs a variable name, a dot, and a body ")(function(){
  return resolve(L_loc)(L_start);
});
};

  return L$(resolve(L_withCons))(L_list, L_err, lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_rest){return L$(resolve(L_withToken))(L_name, L_err, lazy((function(){
  var L$F = function(L_n){return (function(){
  var L$F = function(L_p){return L$(resolve(L_withCons))(L_rest, L_err, lazy((function(){
  var L$F = function(L_dot){return (function(){
  var L$F = function(L_body){return L$(resolve(L_isTokenString))(L_dot, ".", function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createAst))(L_nil, L_body, function(){
  return L$(resolve(L_cons))(L_n, L_names);
});
}, lazy((function(){
  var L$F = function(L_bodyAst){return resolve(L_lambda)(L_n)(L_bodyAst)(function(){
  return resolve(L_fileposList)(function(){
  return resolve(L_position)(L_name);
});
});};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createLambda))(L_start, L_rest, function(){
  return L$(resolve(L_cons))(L_n, L_names);
});
}, lazy((function(){
  var L$F = function(L_bodyAst){return resolve(L_lambda)(L_n)(L_bodyAst)(function(){
  return resolve(L_fileposList)(function(){
  return resolve(L_position)(L_name);
});
});};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_15;
  return L$F;
})();};
  L$F.L$info = L$FUNC_16;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_17;
  return L$F;
})();};
  L$F.L$info = L$FUNC_18;
  return L$F;
})()))})();};
  L$F.L$info = L$FUNC_19;
  return L$F;
})();};
  L$F.L$info = L$FUNC_20;
  return L$F;
})();};
  L$F.L$info = L$FUNC_21;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: null, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: null, length: 1};
  var L$FUNC_18 = {name: null, length: 1};
  var L$FUNC_19 = {name: null, length: 1};
  var L$FUNC_20 = {name: undefined, length: 1};
  var L$FUNC_21 = {name: undefined, length: 1};
  var L$FUNC_22 = {name: undefined, length: 1};
  var L$FUNC_23 = {name: undefined, length: 1};
  var L$FUNC_24 = {name: undefined, length: 1};
  var L$FUNC_25 = {name: undefined, length: 1};
  var L$FUNC_26 = {name: undefined, length: 1};
  var L$FUNC_27 = {name: undefined, length: 1};
  var L$FUNC_28 = {name: undefined, length: 1};
  var L$FUNC_29 = {name: undefined, length: 1};
  return resolve(L_define)("createAnno", 3, "createAnno start list names =\n  withCons list (parseErr \"No annotation name or data in annotation \" (loc start)) \\name rest .\n    withCons rest (parseErr \"No data for annotation \" (loc start)) \\data rest . \\\\\n      finish data body = ifNotErr (createAst nil body names) \\bodyAst .\n        cleanTokens start name \\name .\n          cleanTokens start data \\data .\n            anno name data bodyAst\n      .\n      isTokenString data '.'\n        finish nil rest\n        withStripped data \\data .\n          withCons rest (parseErr \"No body for annotation \" (loc start)) \\dot body .\n            isTokenString dot '.'\n              finish data body\n              parseErr \"Annotation expects dot after name and data \" (loc start)", lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_names){return L$(resolve(L_withCons))(L_list, function(){
  return resolve(L_parseErr)("No annotation name or data in annotation ")(function(){
  return resolve(L_loc)(L_start);
});
}, lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_rest){return L$(resolve(L_withCons))(L_rest, function(){
  return resolve(L_parseErr)("No data for annotation ")(function(){
  return resolve(L_loc)(L_start);
});
}, lazy((function(){
  var L$F = function(L_data){return (function(){
  var L$F = function(L_rest_0){return (function(){  var L_finish;
  L_finish = function(){
  return (function(){
  var L$F = function(L_data_1){return (function(){
  var L$F = function(L_body){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createAst))(L_nil, L_body, L_names);
}, lazy((function(){
  var L$F = function(L_bodyAst){return L$(resolve(L_cleanTokens))(L_start, L_name, lazy((function(){
  var L$F = function(L_name_2){return L$(resolve(L_cleanTokens))(L_start, L_data_1, lazy((function(){
  var L$F = function(L_data_3){return resolve(L_anno)(L_name_2)(L_data_3)(L_bodyAst);};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_14;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_15;
  return L$F;
})();};
  L$F.L$info = L$FUNC_16;
  return L$F;
})();
};

  return L$(resolve(L_isTokenString))(L_data, ".", function(){
  return resolve(L_finish)(L_nil)(L_rest_0);
}, function(){
  return L$(resolve(L_withStripped))(L_data, lazy((function(){
  var L$F = function(L_data_1){return L$(resolve(L_withCons))(L_rest_0, function(){
  return resolve(L_parseErr)("No body for annotation ")(function(){
  return resolve(L_loc)(L_start);
});
}, lazy((function(){
  var L$F = function(L_dot){return (function(){
  var L$F = function(L_body){return L$(resolve(L_isTokenString))(L_dot, ".", function(){
  return resolve(L_finish)(L_data_1)(L_body);
}, function(){
  return resolve(L_parseErr)("Annotation expects dot after name and data ")(function(){
  return resolve(L_loc)(L_start);
});
});};
  L$F.L$info = L$FUNC_20;
  return L$F;
})();};
  L$F.L$info = L$FUNC_21;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_22;
  return L$F;
})()));
})})();};
  L$F.L$info = L$FUNC_23;
  return L$F;
})();};
  L$F.L$info = L$FUNC_24;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_25;
  return L$F;
})();};
  L$F.L$info = L$FUNC_26;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_27;
  return L$F;
})();};
  L$F.L$info = L$FUNC_28;
  return L$F;
})();};
  L$F.L$info = L$FUNC_29;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("bodyStructPat", 0, "bodyStructPat = regexp '\\\\|\\\\\\\\|\\\\@'", function(){
  return resolve(L_regexp)("\\|\\\\|\\@");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("createApply", 2, "createApply inList names = withStripped inList \\list .\n  withCons list (parseErr \"Funcion apply expecting a non-empty list \" (loc inList)) \\h t .\n    ifNotErr (createAst nil h names) \\func . chainApply func t names", lazy((function(){
  var L$F = function(L_inList){return (function(){
  var L$F = function(L_names){return L$(resolve(L_withStripped))(L_inList, lazy((function(){
  var L$F = function(L_list){return L$(resolve(L_withCons))(L_list, function(){
  return resolve(L_parseErr)("Funcion apply expecting a non-empty list ")(function(){
  return resolve(L_loc)(L_inList);
});
}, lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createAst))(L_nil, L_h, L_names);
}, lazy((function(){
  var L$F = function(L_func){return L$(resolve(L_chainApply))(L_func, L_t, L_names);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("blockStarts", 0, "blockStarts = cons '\\\\' (cons '\\\\\\\\' (cons '\\\\@' nil))", function(){
  return L$(resolve(L_cons))("\\", function(){
  return L$(resolve(L_cons))("\\\\", function(){
  return L$(resolve(L_cons))("\\@", L_nil);
});
});
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  return resolve(L_define)("chainApply", 3, "chainApply func list names = withCons list func \\argItem rest .\n  and (isToken argItem) (_contains blockStarts (tokenString argItem))\n    ifNotErr (createAst nil list names) \\arg . apply func arg\n    ifNotErr (createAst nil argItem names) \\arg . chainApply (apply func arg) rest names", lazy((function(){
  var L$F = function(L_func){return (function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_names){return L$(resolve(L_withCons))(L_list, L_func, lazy((function(){
  var L$F = function(L_argItem){return (function(){
  var L$F = function(L_rest){return L$(resolve(L_and))(function(){
  return resolve(L_isToken)(L_argItem);
}, function(){
  return L$(resolve(L__contains))(L_blockStarts, function(){
  return resolve(L_tokenString)(L_argItem);
});
}, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createAst))(L_nil, L_list, L_names);
}, lazy((function(){
  var L$F = function(L_arg){return resolve(L_apply)(L_func)(L_arg);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createAst))(L_nil, L_argItem, L_names);
}, lazy((function(){
  var L$F = function(L_arg){return L$(resolve(L_chainApply))(function(){
  return resolve(L_apply)(L_func)(L_arg);
}, L_rest, L_names);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  return resolve(L_define)("cleanTokens", 3, "cleanTokens start toks cont = isToken toks\n  cont (tokenString toks)\n  withCons toks (cont toks) \\head tail . \\\\\n    cleaned = cleanTokens start head \\head .\n      cleanTokens start tail \\tail .\n        cons head tail\n    .\n    cont cleaned", lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_cont){return L$(resolve(L_isToken))(L_toks, function(){
  return resolve(L_cont)(function(){
  return resolve(L_tokenString)(L_toks);
});
}, function(){
  return L$(resolve(L_withCons))(L_toks, function(){
  return resolve(L_cont)(L_toks);
}, lazy((function(){
  var L$F = function(L_head){return (function(){
  var L$F = function(L_tail){return (function(){  var L_cleaned;
  L_cleaned = function(){
  return L$(resolve(L_cleanTokens))(L_start, L_head, lazy((function(){
  var L$F = function(L_head_0){return L$(resolve(L_cleanTokens))(L_start, L_tail, lazy((function(){
  var L$F = function(L_tail_1){return L$(resolve(L_cons))(L_head_0, L_tail_1);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));
};

  return resolve(L_cont)(L_cleaned)})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("createLet", 3, "createLet start list names = withCons list\n  parseErr \"No variable or body for let \" (loc start)\n  \\binding body . eq body nil (createAst nil binding names)\n    ifNotErr (getLetNames start list names) \\newNames .\n      createSublets start binding body newNames", lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_names){return L$(resolve(L_withCons))(L_list, function(){
  return resolve(L_parseErr)("No variable or body for let ")(function(){
  return resolve(L_loc)(L_start);
});
}, lazy((function(){
  var L$F = function(L_binding){return (function(){
  var L$F = function(L_body){return resolve(L_eq)(L_body, L_nil)(function(){
  return L$(resolve(L_createAst))(L_nil, L_binding, L_names);
})(function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_getLetNames))(L_start, L_list, L_names);
}, lazy((function(){
  var L$F = function(L_newNames){return L$(resolve(L_createSublets))(L_start, L_binding, L_body, L_newNames);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: null, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  var L$FUNC_18 = {name: undefined, length: 1};
  var L$FUNC_19 = {name: undefined, length: 1};
  var L$FUNC_20 = {name: undefined, length: 1};
  var L$FUNC_21 = {name: undefined, length: 1};
  var L$FUNC_22 = {name: undefined, length: 1};
  var L$FUNC_23 = {name: undefined, length: 1};
  return resolve(L_define)("getLetNames", 3, "getLetNames start list names = \\\\\n  err = parseErr \"Let expected binding \" (loc start)\n  .\n  withCons list names \\binding body .\n    isTokenString binding '.' names\n      withParens binding err \\start end def .\n        withCons def err \\name rest .\n          withToken name err \\str pos .\n            getLetNames start body (cons str names)", lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_list){return (function(){
  var L$F = function(L_names){return (function(){  var L_err;
  L_err = function(){
  return resolve(L_parseErr)("Let expected binding ")(function(){
  return resolve(L_loc)(L_start);
});
};

  return L$(resolve(L_withCons))(L_list, L_names, lazy((function(){
  var L$F = function(L_binding){return (function(){
  var L$F = function(L_body){return L$(resolve(L_isTokenString))(L_binding, ".", L_names, function(){
  return L$(resolve(L_withParens))(L_binding, L_err, lazy((function(){
  var L$F = function(L_start_0){return (function(){
  var L$F = function(L_end){return (function(){
  var L$F = function(L_def){return L$(resolve(L_withCons))(L_def, L_err, lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_rest){return L$(resolve(L_withToken))(L_name, L_err, lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pos){return L$(resolve(L_getLetNames))(L_start_0, L_body, function(){
  return L$(resolve(L_cons))(L_str, L_names);
});};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_16;
  return L$F;
})();};
  L$F.L$info = L$FUNC_17;
  return L$F;
})();};
  L$F.L$info = L$FUNC_18;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_19;
  return L$F;
})();};
  L$F.L$info = L$FUNC_20;
  return L$F;
})()))})();};
  L$F.L$info = L$FUNC_21;
  return L$F;
})();};
  L$F.L$info = L$FUNC_22;
  return L$F;
})();};
  L$F.L$info = L$FUNC_23;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  var L$FUNC_18 = {name: undefined, length: 1};
  var L$FUNC_19 = {name: undefined, length: 1};
  return resolve(L_define)("createSublets", 4, "createSublets start binding body names =\n  isTokenString binding '.' (createAst nil body names)\n    withCons body (parseErr \"Let expected a body \" (loc start)) \\bodyH bodyT .\n      ifNotErr (getNameAndDef (parensStart binding) (parensContent binding) names) \\res . res \\name def .\n        ifNotErr (createSublets start bodyH bodyT names) \\bodyAst .\n          let (tokenString name) def bodyAst nilRange", lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_binding){return (function(){
  var L$F = function(L_body){return (function(){
  var L$F = function(L_names){return L$(resolve(L_isTokenString))(L_binding, ".", function(){
  return L$(resolve(L_createAst))(L_nil, L_body, L_names);
}, function(){
  return L$(resolve(L_withCons))(L_body, function(){
  return resolve(L_parseErr)("Let expected a body ")(function(){
  return resolve(L_loc)(L_start);
});
}, lazy((function(){
  var L$F = function(L_bodyH){return (function(){
  var L$F = function(L_bodyT){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_getNameAndDef))(function(){
  return resolve(L_parensStart)(L_binding);
}, function(){
  return resolve(L_parensContent)(L_binding);
}, L_names);
}, lazy((function(){
  var L$F = function(L_res){return resolve(L_res)(lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_def){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createSublets))(L_start, L_bodyH, L_bodyT, L_names);
}, lazy((function(){
  var L$F = function(L_bodyAst){return resolve(L_let)(function(){
  return resolve(L_tokenString)(L_name);
})(L_def)(L_bodyAst)(L_nilRange);};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_16;
  return L$F;
})();};
  L$F.L$info = L$FUNC_17;
  return L$F;
})();};
  L$F.L$info = L$FUNC_18;
  return L$F;
})();};
  L$F.L$info = L$FUNC_19;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  return resolve(L_define)("getNameAndDef", 3, "getNameAndDef pos binding names =\n  withCons (tail binding) (parseErr \"Let expected binding at \" pos) \\snd sndT .\n    isTokenString snd '=' (ifNotErr (createAst nil sndT names) \\def . cons (head binding) def)\n      ifNotErr (getLetLambda pos (tail binding) nil names) \\lamb . cons (head binding) lamb", lazy((function(){
  var L$F = function(L_pos){return (function(){
  var L$F = function(L_binding){return (function(){
  var L$F = function(L_names){return L$(resolve(L_withCons))(function(){
  return resolve(L_tail)(L_binding);
}, function(){
  return resolve(L_parseErr)("Let expected binding at ")(L_pos);
}, lazy((function(){
  var L$F = function(L_snd){return (function(){
  var L$F = function(L_sndT){return L$(resolve(L_isTokenString))(L_snd, "=", function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createAst))(L_nil, L_sndT, L_names);
}, lazy((function(){
  var L$F = function(L_def){return L$(resolve(L_cons))(function(){
  return resolve(L_head)(L_binding);
}, L_def);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_getLetLambda))(L_pos, function(){
  return resolve(L_tail)(L_binding);
}, L_nil, L_names);
}, lazy((function(){
  var L$F = function(L_lamb){return L$(resolve(L_cons))(function(){
  return resolve(L_head)(L_binding);
}, L_lamb);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("getLetLambda", 4, "getLetLambda pos def args names =\n  withCons def (parseErr \"Let expected binding at \" pos) \\arg rest .\n    not (isToken arg) (parseErr \"Let expected binding at \" pos)\n      isTokenString arg '='\n        createAst nil (cons (token '\\\\' pos) (_append (_reverse args) (cons (token '.' (position arg)) rest))) names\n        getLetLambda pos rest (cons arg args) names", lazy((function(){
  var L$F = function(L_pos){return (function(){
  var L$F = function(L_def){return (function(){
  var L$F = function(L_args){return (function(){
  var L$F = function(L_names){return L$(resolve(L_withCons))(L_def, function(){
  return resolve(L_parseErr)("Let expected binding at ")(L_pos);
}, lazy((function(){
  var L$F = function(L_arg){return (function(){
  var L$F = function(L_rest){return L$(resolve(L_not))(function(){
  return resolve(L_isToken)(L_arg);
}, function(){
  return resolve(L_parseErr)("Let expected binding at ")(L_pos);
}, function(){
  return L$(resolve(L_isTokenString))(L_arg, "=", function(){
  return L$(resolve(L_createAst))(L_nil, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_token)("\\")(L_pos);
}, function(){
  return L$(resolve(L__append))(function(){
  return resolve(L__reverse)(L_args);
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_token)(".")(function(){
  return resolve(L_position)(L_arg);
});
}, L_rest);
});
});
}, L_names);
}, function(){
  return L$(resolve(L_getLetLambda))(L_pos, L_rest, function(){
  return L$(resolve(L_cons))(L_arg, L_args);
}, L_names);
});
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: null, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: null, length: 1};
  var L$FUNC_18 = {name: undefined, length: 1};
  var L$FUNC_19 = {name: null, length: 1};
  var L$FUNC_20 = {name: null, length: 1};
  var L$FUNC_21 = {name: null, length: 1};
  var L$FUNC_22 = {name: null, length: 1};
  var L$FUNC_23 = {name: undefined, length: 1};
  var L$FUNC_24 = {name: undefined, length: 1};
  var L$FUNC_25 = {name: null, length: 1};
  var L$FUNC_26 = {name: undefined, length: 1};
  var L$FUNC_27 = {name: undefined, length: 1};
  var L$FUNC_28 = {name: undefined, length: 1};
  var L$FUNC_29 = {name: null, length: 1};
  var L$FUNC_30 = {name: undefined, length: 1};
  var L$FUNC_31 = {name: undefined, length: 1};
  var L$FUNC_32 = {name: undefined, length: 1};
  var L$FUNC_33 = {name: undefined, length: 1};
  var L$FUNC_34 = {name: undefined, length: 1};
  var L$FUNC_35 = {name: undefined, length: 1};
  var L$FUNC_36 = {name: undefined, length: 1};
  var L$FUNC_37 = {name: undefined, length: 1};
  return resolve(L_define)("countedScanLineG", 7, "countedScanLineG lineStarts str pat groups props onDef onExpr = \\\\\n  toks = countedTokens lineStarts str pat\n  groupToks = _foldr (\\el value . el \\h t . cons h (cons t value)) (cons '=' blockStarts) groups\n  .\n  # check if it's a definition\n  find (\\tok . or (_contains groupToks (tokenString tok)) (isCons (strMatch (tokenString tok) '^\\r?\\n'))) toks (\\item . isTokenString item '=') false\n    toks \\name rest . \\\\\n      parseIt func = \\\\\n        parsed = parseToks (checkSetDataType func rest name) groups\n        .\n        onDef (ifNotErr parsed \\list . createDef list name (arity rest 0) str props)\n      .\n      isTokenString (head rest) '='\n        isTokenString (head (tail rest)) '\\\\'\n          parseIt (setTypeAnno (tail rest) (tokenString name))\n          parseIt (tail rest)\n        ifNotErr (transformDef name rest) \\def .\n          parseIt (cons (token '\\\\' (addFilepos (position (head rest)) -1)) def)\n    ifNotErr (parseToks toks groups) \\list . onExpr list", lazy((function(){
  var L$F = function(L_lineStarts){return (function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_groups){return (function(){
  var L$F = function(L_props){return (function(){
  var L$F = function(L_onDef){return (function(){
  var L$F = function(L_onExpr){return (function(){  var L_toks, L_groupToks;
  L_toks = function(){
  return L$(resolve(L_countedTokens))(L_lineStarts, L_str, L_pat);
};
  L_groupToks = function(){
  return L$(resolve(L__foldr))(lazy((function(){
  var L$F = function(L_el){return (function(){
  var L$F = function(L_value){return resolve(L_el)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_cons))(L_t, L_value);
});};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})()), function(){
  return L$(resolve(L_cons))("=", L_blockStarts);
}, L_groups);
};

  return L$(resolve(L_find))(lazy((function(){
  var L$F = function(L_tok){return L$(resolve(L_or))(function(){
  return L$(resolve(L__contains))(L_groupToks, function(){
  return resolve(L_tokenString)(L_tok);
});
}, function(){
  return resolve(L_isCons)(function(){
  return L$(resolve(L_strMatch))(function(){
  return resolve(L_tokenString)(L_tok);
}, "^\r?\n");
});
});};
  L$F.L$info = L$FUNC_16;
  return L$F;
})()), L_toks, lazy((function(){
  var L$F = function(L_item){return L$(resolve(L_isTokenString))(L_item, "=");};
  L$F.L$info = L$FUNC_18;
  return L$F;
})()), L_false, function(){
  return resolve(L_toks)(lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_rest){return (function(){  var L_parseIt;
  L_parseIt = function(){
  return (function(){
  var L$F = function(L_func){return (function(){  var L_parsed;
  L_parsed = function(){
  return L$(resolve(L_parseToks))(function(){
  return L$(resolve(L_checkSetDataType))(L_func, L_rest, L_name);
}, L_groups);
};

  return resolve(L_onDef)(function(){
  return L$(resolve(L_ifNotErr))(L_parsed, lazy((function(){
  var L$F = function(L_list){return L$(resolve(L_createDef))(L_list, L_name, function(){
  return L$(resolve(L_arity))(L_rest, 0);
}, L_str, L_props);};
  L$F.L$info = L$FUNC_23;
  return L$F;
})()));
})})();};
  L$F.L$info = L$FUNC_24;
  return L$F;
})();
};

  return L$(resolve(L_isTokenString))(function(){
  return resolve(L_head)(L_rest);
}, "=", function(){
  return L$(resolve(L_isTokenString))(function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(L_rest);
});
}, "\\", function(){
  return resolve(L_parseIt)(function(){
  return L$(resolve(L_setTypeAnno))(function(){
  return resolve(L_tail)(L_rest);
}, function(){
  return resolve(L_tokenString)(L_name);
});
});
}, function(){
  return resolve(L_parseIt)(function(){
  return resolve(L_tail)(L_rest);
});
});
}, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_transformDef))(L_name, L_rest);
}, lazy((function(){
  var L$F = function(L_def){return resolve(L_parseIt)(function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_token)("\\")(function(){
  return L$(resolve(L_addFilepos))(function(){
  return resolve(L_position)(function(){
  return resolve(L_head)(L_rest);
});
}, -1);
});
}, L_def);
});};
  L$F.L$info = L$FUNC_26;
  return L$F;
})()));
})})();};
  L$F.L$info = L$FUNC_27;
  return L$F;
})();};
  L$F.L$info = L$FUNC_28;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_parseToks))(L_toks, L_groups);
}, lazy((function(){
  var L$F = function(L_list){return resolve(L_onExpr)(L_list);};
  L$F.L$info = L$FUNC_30;
  return L$F;
})()));
})})();};
  L$F.L$info = L$FUNC_31;
  return L$F;
})();};
  L$F.L$info = L$FUNC_32;
  return L$F;
})();};
  L$F.L$info = L$FUNC_33;
  return L$F;
})();};
  L$F.L$info = L$FUNC_34;
  return L$F;
})();};
  L$F.L$info = L$FUNC_35;
  return L$F;
})();};
  L$F.L$info = L$FUNC_36;
  return L$F;
})();};
  L$F.L$info = L$FUNC_37;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("scanLineG", 5, "scanLineG str pat groups onDef onExpr = countedScanLineG emptyLineStarts str pat groups nil onDef onExpr", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_groups){return (function(){
  var L$F = function(L_onDef){return (function(){
  var L$F = function(L_onExpr){return L$(resolve(L_countedScanLineG))(L_emptyLineStarts, L_str, L_pat, L_groups, L_nil, L_onDef, L_onExpr);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  return resolve(L_define)("parseLineG", 6, "parseLineG str pat names groups onDef onExpr = \\\\\n  astCallback cb = \\list . ifNotErr (createAst nil list names) \\ast . cb ast\n  .\n  scanLineG str pat groups (astCallback onDef) (astCallback onExpr)", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_groups){return (function(){
  var L$F = function(L_onDef){return (function(){
  var L$F = function(L_onExpr){return (function(){  var L_astCallback;
  L_astCallback = function(){
  return (function(){
  var L$F = function(L_cb){return (function(){
  var L$F = function(L_list){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createAst))(L_nil, L_list, L_names);
}, lazy((function(){
  var L$F = function(L_ast){return resolve(L_cb)(L_ast);};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();
};

  return L$(resolve(L_scanLineG))(L_str, L_pat, L_groups, function(){
  return resolve(L_astCallback)(L_onDef);
}, function(){
  return resolve(L_astCallback)(L_onExpr);
})})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
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
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("transformDef", 2, "transformDef name toks = withCons toks (parseErr \"Bad definition, expecting tokens\" (loc name)) \\h t .\n  isTokenString h '='\n    isTokenString (head t) '\\\\'\n      cons (token '.' (position h)) (setTypeAnno t (tokenString name))\n      cons (token '.' (position h)) t\n    ifNotErr (transformDef name t) \\list . cons h list", lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_toks){return L$(resolve(L_withCons))(L_toks, function(){
  return resolve(L_parseErr)("Bad definition, expecting tokens")(function(){
  return resolve(L_loc)(L_name);
});
}, lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_isTokenString))(L_h, "=", function(){
  return L$(resolve(L_isTokenString))(function(){
  return resolve(L_head)(L_t);
}, "\\", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_token)(".")(function(){
  return resolve(L_position)(L_h);
});
}, function(){
  return L$(resolve(L_setTypeAnno))(L_t, function(){
  return resolve(L_tokenString)(L_name);
});
});
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_token)(".")(function(){
  return resolve(L_position)(L_h);
});
}, L_t);
});
}, function(){
  return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_transformDef))(L_name, L_t);
}, lazy((function(){
  var L$F = function(L_list){return L$(resolve(L_cons))(L_h, L_list);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("setTypeAnno", 2, "setTypeAnno toks name = \\\\\n  tok = \\str . token str (position toks)\n  .\n  cons (tok '\\\\@') (cons (tok 'type') (cons (tok name) (cons (tok '.') toks)))", lazy((function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_name){return (function(){  var L_tok;
  L_tok = function(){
  return (function(){
  var L$F = function(L_str){return resolve(L_token)(L_str)(function(){
  return resolve(L_position)(L_toks);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();
};

  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)("\\@");
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)("type");
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)(L_name);
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)(".");
}, L_toks);
});
});
})})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("setDataTypeAnno", 2, "setDataTypeAnno toks name = \\\\\n  tok = \\str . token str (position toks)\n  .\n  cons (tok '\\\\@') (cons (tok 'dataType') (cons (tok (tokenString name)) (cons (tok '.') toks)))", lazy((function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_name){return (function(){  var L_tok;
  L_tok = function(){
  return (function(){
  var L$F = function(L_str){return resolve(L_token)(L_str)(function(){
  return resolve(L_position)(L_toks);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();
};

  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)("\\@");
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)("dataType");
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)(function(){
  return resolve(L_tokenString)(L_name);
});
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)(".");
}, L_toks);
});
});
})})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: null, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  var L$FUNC_18 = {name: undefined, length: 1};
  var L$FUNC_19 = {name: undefined, length: 1};
  return resolve(L_define)("createDef", 5, "createDef def name arity src props = \\\\\n  tok str = token str (position name)\n  code = cons '\\\\@' (cons 'leisureName' (cons (tokenString name) (cons '.' (cons '\\\\@' (cons 'arity' (cons arity (cons '.' (cons (spliceFuncProps arity props def) nil))))))))\n  debugCode = cons '\\\\@' (cons 'debug' (cons 'true' (cons '.' code)))\n  .\n  jsonStringify (tokenString name) (\\err . parseErr (strCat (cons \"Bad function name \" (cons (loc name) nil))) err) \\nameStr .\n    jsonStringify src (\\err . parseErr (strCat (cons \"Bad source \" (cons (loc name) nil))) err) \\srcStr .\n      cons (tok 'newDefine') (cons (tok nameStr) (cons (tok (strString arity)) (cons (tok srcStr) (cons code (cons debugCode nil)))))", lazy((function(){
  var L$F = function(L_def){return (function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_arity){return (function(){
  var L$F = function(L_src){return (function(){
  var L$F = function(L_props){return (function(){  var L_tok, L_code, L_debugCode;
  L_tok = function(){
  return (function(){
  var L$F = function(L_str){return resolve(L_token)(L_str)(function(){
  return resolve(L_position)(L_name);
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();
};
  L_code = function(){
  return L$(resolve(L_cons))("\\@", function(){
  return L$(resolve(L_cons))("leisureName", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tokenString)(L_name);
}, function(){
  return L$(resolve(L_cons))(".", function(){
  return L$(resolve(L_cons))("\\@", function(){
  return L$(resolve(L_cons))("arity", function(){
  return L$(resolve(L_cons))(L_arity, function(){
  return L$(resolve(L_cons))(".", function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_spliceFuncProps))(L_arity, L_props, L_def);
}, L_nil);
});
});
});
});
});
});
});
});
};
  L_debugCode = function(){
  return L$(resolve(L_cons))("\\@", function(){
  return L$(resolve(L_cons))("debug", function(){
  return L$(resolve(L_cons))("true", function(){
  return L$(resolve(L_cons))(".", L_code);
});
});
});
};

  return resolve(L_jsonStringify)(function(){
  return resolve(L_tokenString)(L_name);
}, lazy((function(){
  var L$F = function(L_err){return resolve(L_parseErr)(function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("Bad function name ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_loc)(L_name);
}, L_nil);
});
});
})(L_err);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_nameStr){return resolve(L_jsonStringify)(L_src, lazy((function(){
  var L$F = function(L_err){return resolve(L_parseErr)(function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("Bad source ", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_loc)(L_name);
}, L_nil);
});
});
})(L_err);};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_srcStr){return L$(resolve(L_cons))(function(){
  return resolve(L_tok)("newDefine");
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)(L_nameStr);
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)(function(){
  return resolve(L_strString)(L_arity);
});
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tok)(L_srcStr);
}, function(){
  return L$(resolve(L_cons))(L_code, function(){
  return L$(resolve(L_cons))(L_debugCode, L_nil);
});
});
});
});
});};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_14;
  return L$F;
})()))})();};
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
})();};
  L$F.L$info = L$FUNC_19;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("spliceFuncProps", 3, "spliceFuncProps arity props ast = or (isNil props) (== arity 0)\n  ast\n  subSpliceFuncProps props ast", lazy((function(){
  var L$F = function(L_arity){return (function(){
  var L$F = function(L_props){return (function(){
  var L$F = function(L_ast){return L$(resolve(L_or))(function(){
  return resolve(L_isNil)(L_props);
}, function(){
  return resolve(L_$p$p)(L_arity, 0);
}, L_ast, function(){
  return L$(resolve(L_subSpliceFuncProps))(L_props, L_ast);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("subSpliceFuncProps", 2, "subSpliceFuncProps props ast = \\\\\n  slash = head ast\n  var = head (tail ast)\n  afterVar = tail (tail ast)\n  dot = head afterVar\n  body = tail afterVar\n  .\n  isTokenString slash '\\\\'\n    cons\n      slash\n      cons\n        var\n        isTokenString dot '.'\n          cons dot (addProps props body)\n          cons '.' (addProps props afterVar)\n    cons\n      head ast\n      subSpliceFuncProps props (tail ast)", lazy((function(){
  var L$F = function(L_props){return (function(){
  var L$F = function(L_ast){return (function(){  var L_slash, L_var, L_afterVar, L_dot, L_body;
  L_slash = function(){
  return resolve(L_head)(L_ast);
};
  L_var = function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(L_ast);
});
};
  L_afterVar = function(){
  return resolve(L_tail)(function(){
  return resolve(L_tail)(L_ast);
});
};
  L_dot = function(){
  return resolve(L_head)(L_afterVar);
};
  L_body = function(){
  return resolve(L_tail)(L_afterVar);
};

  return L$(resolve(L_isTokenString))(L_slash, "\\", function(){
  return L$(resolve(L_cons))(L_slash, function(){
  return L$(resolve(L_cons))(L_var, function(){
  return L$(resolve(L_isTokenString))(L_dot, ".", function(){
  return L$(resolve(L_cons))(L_dot, function(){
  return L$(resolve(L_addProps))(L_props, L_body);
});
}, function(){
  return L$(resolve(L_cons))(".", function(){
  return L$(resolve(L_addProps))(L_props, L_afterVar);
});
});
});
});
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_head)(L_ast);
}, function(){
  return L$(resolve(L_subSpliceFuncProps))(L_props, function(){
  return resolve(L_tail)(L_ast);
});
});
})})();};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("addProps", 2, "addProps props ast = _foldr\n  \\prop result . cons '\\\\@' (cons (head prop) (cons (tail prop) (cons '.' result)))\n  ast\n  props", lazy((function(){
  var L$F = function(L_props){return (function(){
  var L$F = function(L_ast){return L$(resolve(L__foldr))(lazy((function(){
  var L$F = function(L_prop){return (function(){
  var L$F = function(L_result){return L$(resolve(L_cons))("\\@", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_head)(L_prop);
}, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_tail)(L_prop);
}, function(){
  return L$(resolve(L_cons))(".", L_result);
});
});
});};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()), L_ast, L_props);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("checkSetDataType", 3, "checkSetDataType toks curToks name = withCons curToks toks \\h t .\n  isTokenString h '='\n    isTokenString (head t) '\\\\'\n      setDataTypeAnno toks name\n      toks\n    checkSetDataType toks t name", lazy((function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_curToks){return (function(){
  var L$F = function(L_name){return L$(resolve(L_withCons))(L_curToks, L_toks, lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_isTokenString))(L_h, "=", function(){
  return L$(resolve(L_isTokenString))(function(){
  return resolve(L_head)(L_t);
}, "\\", function(){
  return L$(resolve(L_setDataTypeAnno))(L_toks, L_name);
}, L_toks);
}, function(){
  return L$(resolve(L_checkSetDataType))(L_toks, L_t, L_name);
});};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("arity", 2, "arity toks n = isTokenString (head toks) '=' n (arity (tail toks) (+ n 1))", lazy((function(){
  var L$F = function(L_toks){return (function(){
  var L$F = function(L_n){return L$(resolve(L_isTokenString))(function(){
  return resolve(L_head)(L_toks);
}, "=", L_n, function(){
  return L$(resolve(L_arity))(function(){
  return resolve(L_tail)(L_toks);
}, function(){
  return resolve(L_$o)(L_n, 1);
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("tokListStr", 1, "tokListStr toks = jsonStringify (_strJoin (_map (\\t . tokenString t) toks) ' ')", lazy((function(){
  var L$F = function(L_toks){return resolve(L_jsonStringify)(function(){
  return resolve(L__strJoin)(function(){
  return L$(resolve(L__map))(lazy((function(){
  var L$F = function(L_t){return resolve(L_tokenString)(L_t);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()), L_toks);
}, " ");
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("linePat", 0, "linePat = regexp '\\\\r?\\\\n(?=[^ ]|$)'", function(){
  return resolve(L_regexp)("\\r?\\n(?=[^ ]|$)");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("emptyLinePat", 0, "emptyLinePat = regexp '(^[ \\\\i]*\\\\#.*|^[ \\\\i]*$|^\\\\r?\\\\n[ \\\\i]*$)'", function(){
  return resolve(L_regexp)("(^[ \\i]*\\#.*|^[ \\i]*$|^\\r?\\n[ \\i]*$)");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("lineScrub", 0, "lineScrub = regexpFlags '\\\\r\\\\n' 'g'", function(){
  return L$(resolve(L_regexpFlags))("\\r\\n", "g");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("linesForFile", 1, "linesForFile text = _map tail (countedLinesForFile \"NOTHING.lsr\" text)", lazy((function(){
  var L$F = function(L_text){return L$(resolve(L__map))(L_tail, function(){
  return L$(resolve(L_countedLinesForFile))("NOTHING.lsr", L_text);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("countedLinesForFile", 2, "countedLinesForFile name text = filter\n  \\line . isNil (strMatch (tail line) emptyLinePat)\n  countedLines name 1 text", lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_text){return L$(resolve(L_filter))(lazy((function(){
  var L$F = function(L_line){return resolve(L_isNil)(function(){
  return L$(resolve(L_strMatch))(function(){
  return resolve(L_tail)(L_line);
}, L_emptyLinePat);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()), function(){
  return L$(resolve(L_countedLines))(L_name, 1, L_text);
});};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("countedLines", 3, "countedLines filename lineOffset str = _reverse\n  _withRecur\n    _countedLines filename lineOffset str nil", lazy((function(){
  var L$F = function(L_filename){return (function(){
  var L$F = function(L_lineOffset){return (function(){
  var L$F = function(L_str){return resolve(L__reverse)(function(){
  return resolve(L__withRecur)(function(){
  return L$(resolve(L__countedLines))(L_filename, L_lineOffset, L_str, L_nil);
});
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("_countedLines", 4, "_countedLines filename lineOffset str lines = \\\\\n  m = strMatch str linePat\n  idx = head (tail (tail m))\n  chunk = strSubstring str 0 idx\n  next = + idx (strLen (head m))\n  chunkLines = findLines 0 chunk\n  .\n  eq str ''\n    lines\n    isNil m\n      cons (cons (cons filename (cons lineOffset (tail (findLines 0 str)))) str) lines\n      _recur\n        _countedLines filename (+ lineOffset (consLength chunkLines)) (strSubstring str next 0)\n          cons (cons (cons filename (cons lineOffset (tail chunkLines))) chunk) lines", lazy((function(){
  var L$F = function(L_filename){return (function(){
  var L$F = function(L_lineOffset){return (function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_lines){return (function(){  var L_m, L_idx, L_chunk, L_next, L_chunkLines;
  L_m = function(){
  return L$(resolve(L_strMatch))(L_str, L_linePat);
};
  L_idx = function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(function(){
  return resolve(L_tail)(L_m);
});
});
};
  L_chunk = function(){
  return L$(resolve(L_strSubstring))(L_str, 0, L_idx);
};
  L_next = function(){
  return resolve(L_$o)(L_idx, function(){
  return resolve(L_strLen)(function(){
  return resolve(L_head)(L_m);
});
});
};
  L_chunkLines = function(){
  return L$(resolve(L_findLines))(0, L_chunk);
};

  return resolve(L_eq)(L_str, "")(L_lines)(function(){
  return L$(resolve(L_isNil))(L_m, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_cons))(L_filename, function(){
  return L$(resolve(L_cons))(L_lineOffset, function(){
  return resolve(L_tail)(function(){
  return L$(resolve(L_findLines))(0, L_str);
});
});
});
}, L_str);
}, L_lines);
}, function(){
  return resolve(L__recur)(function(){
  return L$(resolve(L__countedLines))(L_filename, function(){
  return resolve(L_$o)(L_lineOffset, function(){
  return resolve(L_consLength)(L_chunkLines);
});
}, function(){
  return L$(resolve(L_strSubstring))(L_str, L_next, 0);
}, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_cons))(L_filename, function(){
  return L$(resolve(L_cons))(L_lineOffset, function(){
  return resolve(L_tail)(L_chunkLines);
});
});
}, L_chunk);
}, L_lines);
});
});
});
})})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("defPat", 0, "defPat = regexp '^[^ =]+.* =( |$)'", function(){
  return resolve(L_regexp)("^[^ =]+.* =( |$)");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("unanchoredDefPat", 0, "unanchoredDefPat = regexp '^((?:\\\\s*\\\\n|#[^\\\\n]*\\\\n)*)([^=\\\\n]*)(=\\\\([^=]+=|=)?'", function(){
  return resolve(L_regexp)("^((?:\\s*\\n|#[^\\n]*\\n)*)([^=\\n]*)(=\\([^=]+=|=)?");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("namesForLines", 1, "namesForLines lines = _foldl\n  \\result line . \\\\\n    m = strMatch line defPat\n    .\n    isNil m result (cons (head (tail m)) result)\n  nil\n  lines", lazy((function(){
  var L$F = function(L_lines){return L$(resolve(L__foldl))(lazy((function(){
  var L$F = function(L_result){return (function(){
  var L$F = function(L_line){return (function(){  var L_m;
  L_m = function(){
  return L$(resolve(L_strMatch))(L_line, L_defPat);
};

  return L$(resolve(L_isNil))(L_m, L_result, function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(L_m);
});
}, L_result);
})})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()), L_nil, L_lines);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("runParseFilters", 2, "runParseFilters filters line = filters\n  \\h t D . primBind (h line) \\filtered . runParseFilters t filtered\n  fakereturn line", lazy((function(){
  var L$F = function(L_filters){return (function(){
  var L$F = function(L_line){return resolve(L_filters)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_primBind)(function(){
  return resolve(L_h)(L_line);
}, lazy((function(){
  var L$F = function(L_filtered){return L$(resolve(L_runParseFilters))(L_t, L_filtered);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()))(function(){
  return resolve(L_fakereturn)(L_line);
});};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("isBlockStart", 1, "isBlockStart tok = and\n  or (isToken tok) (isString tok)\n  _contains blockStarts (strTokenString tok)", lazy((function(){
  var L$F = function(L_tok){return L$(resolve(L_and))(function(){
  return L$(resolve(L_or))(function(){
  return resolve(L_isToken)(L_tok);
}, function(){
  return resolve(L_isString)(L_tok);
});
}, function(){
  return L$(resolve(L__contains))(L_blockStarts, function(){
  return resolve(L_strTokenString)(L_tok);
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("macroSub", 2, "macroSub macs expr = postProcessMacro (emptyFor expr) (emptyFor expr) (baseMacroSub macs expr)", lazy((function(){
  var L$F = function(L_macs){return (function(){
  var L$F = function(L_expr){return L$(resolve(L_postProcessMacro))(function(){
  return resolve(L_emptyFor)(L_expr);
}, function(){
  return resolve(L_emptyFor)(L_expr);
}, function(){
  return L$(resolve(L_baseMacroSub))(L_macs, L_expr);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("consifyMacroValue", 1, "consifyMacroValue value = isCons value value (cons value nil)", lazy((function(){
  var L$F = function(L_value){return L$(resolve(L_isCons))(L_value, L_value, function(){
  return L$(resolve(L_cons))(L_value, L_nil);
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: null, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: null, length: 1};
  var L$FUNC_15 = {name: null, length: 1};
  var L$FUNC_16 = {name: undefined, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  var L$FUNC_18 = {name: undefined, length: 1};
  var L$FUNC_19 = {name: undefined, length: 1};
  var L$FUNC_20 = {name: undefined, length: 1};
  var L$FUNC_21 = {name: undefined, length: 1};
  return resolve(L_define)("baseMacroSub", 2, "baseMacroSub macs expr = isToken expr\n  expr\n  isParens expr\n    expr \\start end content . \\\\\n      result = baseMacroSub macs content\n      .\n      isToken result result (parens start end result)\n    withCons expr expr \\h t .\n      isBlockStart h\n        cons h\n          isTokenString h '\\\\\\\\'\n            macroSubLet macs t\n            macroSubBody '.' macs t\n        withToken h\n          \\\\\n            subH = baseMacroSub macs h\n            .\n            withToken subH\n              cons subH (_map (baseMacroSub macs) t)\n              \\tok pos . baseMacroSub macs (cons subH t)\n          \\tok pos . \\\\\n            def = mapGet tok macs\n            .\n            mapContains tok macs\n              baseMacroSub macs (def t)\n              cons h (_map (baseMacroSub macs) t)", lazy((function(){
  var L$F = function(L_macs){return (function(){
  var L$F = function(L_expr){return L$(resolve(L_isToken))(L_expr, L_expr, function(){
  return L$(resolve(L_isParens))(L_expr, function(){
  return resolve(L_expr)(lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_end){return (function(){
  var L$F = function(L_content){return (function(){  var L_result;
  L_result = function(){
  return L$(resolve(L_baseMacroSub))(L_macs, L_content);
};

  return L$(resolve(L_isToken))(L_result, L_result, function(){
  return resolve(L_parens)(L_start)(L_end)(L_result);
})})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_withCons))(L_expr, L_expr, lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_isBlockStart))(L_h, function(){
  return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_isTokenString))(L_h, "\\\\", function(){
  return L$(resolve(L_macroSubLet))(L_macs, L_t);
}, function(){
  return L$(resolve(L_macroSubBody))(".", L_macs, L_t);
});
});
}, function(){
  return L$(resolve(L_withToken))(L_h, function(){
  return (function(){  var L_subH;
  L_subH = function(){
  return L$(resolve(L_baseMacroSub))(L_macs, L_h);
};

  return L$(resolve(L_withToken))(L_subH, function(){
  return L$(resolve(L_cons))(L_subH, function(){
  return L$(resolve(L__map))(function(){
  return resolve(L_baseMacroSub)(L_macs);
}, L_t);
});
}, lazy((function(){
  var L$F = function(L_tok){return (function(){
  var L$F = function(L_pos){return L$(resolve(L_baseMacroSub))(L_macs, function(){
  return L$(resolve(L_cons))(L_subH, L_t);
});};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()))})();
}, lazy((function(){
  var L$F = function(L_tok){return (function(){
  var L$F = function(L_pos){return (function(){  var L_def;
  L_def = function(){
  return resolve(L_mapGet)(L_tok, L_macs);
};

  return resolve(L_mapContains)(L_tok, L_macs)(function(){
  return L$(resolve(L_baseMacroSub))(L_macs, function(){
  return resolve(L_def)(L_t);
});
})(function(){
  return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L__map))(function(){
  return resolve(L_baseMacroSub)(L_macs);
}, L_t);
});
})})();};
  L$F.L$info = L$FUNC_16;
  return L$F;
})();};
  L$F.L$info = L$FUNC_17;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_18;
  return L$F;
})();};
  L$F.L$info = L$FUNC_19;
  return L$F;
})()));
});
});};
  L$F.L$info = L$FUNC_20;
  return L$F;
})();};
  L$F.L$info = L$FUNC_21;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("macroSubLet", 2, "macroSubLet macs list = list\n  \\h t D . isTokenString h '.'\n    cons h (baseMacroSub macs t)\n    cons (setParens h \\content . macroSubBody '=' macs content) (macroSubLet macs t)\n  # Don't bother with parse errors at this point -- ast generator will detect them\n  nil", lazy((function(){
  var L$F = function(L_macs){return (function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return L$(resolve(L_isTokenString))(L_h, ".", function(){
  return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_baseMacroSub))(L_macs, L_t);
});
}, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_setParens))(L_h, lazy((function(){
  var L$F = function(L_content){return L$(resolve(L_macroSubBody))("=", L_macs, L_content);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_macroSubLet))(L_macs, L_t);
});
});};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("macroSubBody", 3, "macroSubBody char macs list = list\n  \\h t D . cons h\n    isTokenString h char baseMacroSub (macroSubBody char)\n      macs\n      t\n  nil", lazy((function(){
  var L$F = function(L_char){return (function(){
  var L$F = function(L_macs){return (function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_isTokenString))(L_h, L_char, L_baseMacroSub, function(){
  return resolve(L_macroSubBody)(L_char);
}, L_macs, L_t);
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  return resolve(L_define)("postProcessMacro", 3, "postProcessMacro before after expr = isString expr\n  token expr (isEmptyPos after before after)\n  isParens expr\n    expr \\start end contents . parens start end (postProcessMacro start end contents)\n    isCons expr\n      expr \\h t .\n        isToken h\n          cons h (postProcessMacro (addFilepos (addFilepos (tokenFilepos h) (strLen (tokenString h))) 1) (emptyFor h) t)\n          \\\\\n            posStart = position h\n            posEnd = position t\n            t2 = postProcessMacro (emptyFor posStart) after t\n            h2 = postProcessMacro before (emptyFor posStart) h\n            .\n            isEmptyPos posStart\n              cons (postProcessMacro before (position t2) h) t2\n              cons h2 (postProcessMacro (addFilepos (lexEnd h2) 1) after t)\n      isNumber expr\n        token (strString expr) (isEmptyPos after before after)\n        expr", lazy((function(){
  var L$F = function(L_before){return (function(){
  var L$F = function(L_after){return (function(){
  var L$F = function(L_expr){return L$(resolve(L_isString))(L_expr, function(){
  return resolve(L_token)(L_expr)(function(){
  return L$(resolve(L_isEmptyPos))(L_after, L_before, L_after);
});
}, function(){
  return L$(resolve(L_isParens))(L_expr, function(){
  return resolve(L_expr)(lazy((function(){
  var L$F = function(L_start){return (function(){
  var L$F = function(L_end){return (function(){
  var L$F = function(L_contents){return resolve(L_parens)(L_start)(L_end)(function(){
  return L$(resolve(L_postProcessMacro))(L_start, L_end, L_contents);
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_isCons))(L_expr, function(){
  return resolve(L_expr)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_isToken))(L_h, function(){
  return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_postProcessMacro))(function(){
  return L$(resolve(L_addFilepos))(function(){
  return L$(resolve(L_addFilepos))(function(){
  return resolve(L_tokenFilepos)(L_h);
}, function(){
  return resolve(L_strLen)(function(){
  return resolve(L_tokenString)(L_h);
});
});
}, 1);
}, function(){
  return resolve(L_emptyFor)(L_h);
}, L_t);
});
}, function(){
  return (function(){  var L_posStart, L_posEnd, L_t2, L_h2;
  L_posStart = function(){
  return resolve(L_position)(L_h);
};
  L_posEnd = function(){
  return resolve(L_position)(L_t);
};
  L_t2 = function(){
  return L$(resolve(L_postProcessMacro))(function(){
  return resolve(L_emptyFor)(L_posStart);
}, L_after, L_t);
};
  L_h2 = function(){
  return L$(resolve(L_postProcessMacro))(L_before, function(){
  return resolve(L_emptyFor)(L_posStart);
}, L_h);
};

  return L$(resolve(L_isEmptyPos))(L_posStart, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_postProcessMacro))(L_before, function(){
  return resolve(L_position)(L_t2);
}, L_h);
}, L_t2);
}, function(){
  return L$(resolve(L_cons))(L_h2, function(){
  return L$(resolve(L_postProcessMacro))(function(){
  return L$(resolve(L_addFilepos))(function(){
  return resolve(L_lexEnd)(L_h2);
}, 1);
}, L_after, L_t);
});
})})();
});};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));
}, function(){
  return L$(resolve(L_isNumber))(L_expr, function(){
  return resolve(L_token)(function(){
  return resolve(L_strString)(L_expr);
})(function(){
  return L$(resolve(L_isEmptyPos))(L_after, L_before, L_after);
});
}, L_expr);
});
});
});};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("_defMacro", 2, "_defMacro name def = primBind (getValue 'macroDefs')\n  \\macs . setValue 'macroDefs' (mapSet name def macs)", lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_def){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("macroDefs");
}, lazy((function(){
  var L$F = function(L_macs){return resolve(L_setValue)("macroDefs", function(){
  return resolve(L_mapSet)(L_name, L_def, L_macs);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("delimiterListPrefix", 0, "delimiterListPrefix = \"\\\"(?:\\\\\\\\.|[^\\\"])*\\\"|'(?:\\\\\\\\.|[^'])*'|\\\\r?\\\\n *#[^\\\\r\\\\n]*|\\\\r?\\\\n *| +|#[^\\\\r\\\\n]*\"", "\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|\\r?\\n *#[^\\r\\n]*|\\r?\\n *| +|#[^\\r\\n]*");
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("regexpEscapePat", 0, "regexpEscapePat = regexpFlags '[\\\\-\\\\[\\\\]/\\\\{\\\\}\\\\(\\\\)\\\\*\\\\+\\\\?\\\\.\\\\\\\\\\\\^\\\\$\\\\|]' 'g'", function(){
  return L$(resolve(L_regexpFlags))("[\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]", "g");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("addToken", 1, "addToken del = primBind (getValue 'tokenList')\n  \\dels . _contains dels del\n    false\n    \\\\\n      newDels = insertSorted (\\a b . > (strLen a) (strLen b)) del dels\n      .\n      primBind (setValue 'tokenList' newDels)\n        \\_ . computeTokenPat newDels", lazy((function(){
  var L$F = function(L_del){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenList");
}, lazy((function(){
  var L$F = function(L_dels){return L$(resolve(L__contains))(L_dels, L_del, L_false, function(){
  return (function(){  var L_newDels;
  L_newDels = function(){
  return L$(resolve(L_insertSorted))(lazy((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_$z)(function(){
  return resolve(L_strLen)(L_a);
}, function(){
  return resolve(L_strLen)(L_b);
});};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()), L_del, L_dels);
};

  return resolve(L_primBind)(function(){
  return resolve(L_setValue)("tokenList", L_newDels);
}, lazy((function(){
  var L$F = function(L__){return resolve(L_computeTokenPat)(L_newDels);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()))})();
});};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("computeTokenPat", 1, "computeTokenPat dels = \\\\\n  delPats = _map (\\item . strReplace item regexpEscapePat \"\\\\$&\") dels\n  newPat = strCat (cons '(' (cons (_strJoin (cons delimiterListPrefix delPats) '|') (cons ')' nil)))\n  .\n  setValue 'tokenPat' newPat", lazy((function(){
  var L$F = function(L_dels){return (function(){  var L_delPats, L_newPat;
  L_delPats = function(){
  return L$(resolve(L__map))(lazy((function(){
  var L$F = function(L_item){return L$(resolve(L_strReplace))(L_item, L_regexpEscapePat, "\\$&");};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()), L_dels);
};
  L_newPat = function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))("(", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L__strJoin)(function(){
  return L$(resolve(L_cons))(L_delimiterListPrefix, L_delPats);
}, "|");
}, function(){
  return L$(resolve(L_cons))(")", L_nil);
});
});
});
};

  return resolve(L_setValue)("tokenPat", L_newPat)})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("addTokenGroup", 2, "addTokenGroup open close = primBind (addToken open)\n  \\_ . primBind (addToken close)\n    \\_ . primBind (getValue 'tokenGroups')\n      \\gr . setValue 'tokenGroups' (acons open close gr)", lazy((function(){
  var L$F = function(L_open){return (function(){
  var L$F = function(L_close){return resolve(L_primBind)(function(){
  return resolve(L_addToken)(L_open);
}, lazy((function(){
  var L$F = function(L__){return resolve(L_primBind)(function(){
  return resolve(L_addToken)(L_close);
}, lazy((function(){
  var L$F = function(L___0){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenGroups");
}, lazy((function(){
  var L$F = function(L_gr){return resolve(L_setValue)("tokenGroups", function(){
  return L$(resolve(L_acons))(L_open, L_close, L_gr);
});};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("parenGroups", 0, "parenGroups = acons '(' ')' nil", function(){
  return L$(resolve(L_acons))("(", ")", L_nil);
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("testParse", 2, "testParse str pat = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil parenGroups) \\list . list \\h t . stripParens h", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_parseIndent))(function(){
  return resolve(L_token)("\n")(L_startFilePos);
}, function(){
  return L$(resolve(L_tokens))(L_str, L_pat);
}, L_nil, L_parenGroups);
}, lazy((function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return resolve(L_stripParens)(L_h);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("parseG", 3, "parseG str pat groups = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil groups) \\list . list \\h t . stripParens h", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_groups){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_parseIndent))(function(){
  return resolve(L_token)("\n")(L_startFilePos);
}, function(){
  return L$(resolve(L_tokens))(L_str, L_pat);
}, L_nil, L_groups);
}, lazy((function(){
  var L$F = function(L_list){return resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return resolve(L_stripParens)(L_h);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("parseToAst", 2, "parseToAst str pat = createAst nil (testParse str pat) nil", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return L$(resolve(L_createAst))(L_nil, function(){
  return L$(resolve(L_testParse))(L_str, L_pat);
}, L_nil);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("parseM", 1, "parseM str =\n  primBind (getValue 'tokenPat')\n    \\tokPat . primBind (getValue 'tokenGroups')\n      \\groups . parseG str tokPat groups", lazy((function(){
  var L$F = function(L_str){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenPat");
}, lazy((function(){
  var L$F = function(L_tokPat){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenGroups");
}, lazy((function(){
  var L$F = function(L_groups){return L$(resolve(L_parseG))(L_str, L_tokPat, L_groups);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("scanLine", 4, "scanLine str pat onDef onExpr = scanLineG str pat parenGroups onDef onExpr", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_onDef){return (function(){
  var L$F = function(L_onExpr){return L$(resolve(L_scanLineG))(L_str, L_pat, L_parenGroups, L_onDef, L_onExpr);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  return resolve(L_define)("parseLine", 5, "parseLine str pat names onDef onExpr = parseLineG str pat names parenGroups onDef onExpr", lazy((function(){
  var L$F = function(L_str){return (function(){
  var L$F = function(L_pat){return (function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_onDef){return (function(){
  var L$F = function(L_onExpr){return L$(resolve(L_parseLineG))(L_str, L_pat, L_names, L_parenGroups, L_onDef, L_onExpr);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("parseLineM", 1, "parseLineM str = primBind (getValue 'tokenPat')\n  \\tokPat . primBind (getValue 'tokenGroups')\n    \\groups . parseLineG str tokPat nil groups id id", lazy((function(){
  var L$F = function(L_str){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenPat");
}, lazy((function(){
  var L$F = function(L_tokPat){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenGroups");
}, lazy((function(){
  var L$F = function(L_groups){return L$(resolve(L_parseLineG))(L_str, L_tokPat, L_nil, L_groups, L_id, L_id);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("macroSubM", 1, "macroSubM expr =\n  primBind (getValue 'macroDefs')\n    \\macs . macroSub macs expr", lazy((function(){
  var L$F = function(L_expr){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("macroDefs");
}, lazy((function(){
  var L$F = function(L_macs){return L$(resolve(L_macroSub))(L_macs, L_expr);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("macroParse", 1, "macroParse str =\n  primBind (parseM str)\n    \\ex . macroSubM ex", lazy((function(){
  var L$F = function(L_str){return resolve(L_primBind)(function(){
  return resolve(L_parseM)(L_str);
}, lazy((function(){
  var L$F = function(L_ex){return resolve(L_macroSubM)(L_ex);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("tokensM", 1, "tokensM str =\n  primBind (getValue 'tokenPat')\n    \\delimiterPat . tokens str delimiterPat", lazy((function(){
  var L$F = function(L_str){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenPat");
}, lazy((function(){
  var L$F = function(L_delimiterPat){return L$(resolve(L_tokens))(L_str, L_delimiterPat);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("parseLines", 2, "parseLines lines result = lines\n  \\h t D . primBind (parseLineM h)\n    \\ast . parseLines t (cons ast result)\n  _reverse result", lazy((function(){
  var L$F = function(L_lines){return (function(){
  var L$F = function(L_result){return resolve(L_lines)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_primBind)(function(){
  return resolve(L_parseLineM)(L_h);
}, lazy((function(){
  var L$F = function(L_ast){return L$(resolve(L_parseLines))(L_t, function(){
  return L$(resolve(L_cons))(L_ast, L_result);
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()))(function(){
  return resolve(L__reverse)(L_result);
});};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("parseFile", 1, "parseFile text = parseLines (linesForFile text) nil", lazy((function(){
  var L$F = function(L_text){return L$(resolve(L_parseLines))(function(){
  return resolve(L_linesForFile)(L_text);
}, L_nil);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("simpleScanLine", 1, "simpleScanLine line = primBind (getValue 'tokenPat')\n  \\tokenPat . primBind (getValue 'tokenGroups')\n    \\groups . scanLineG line tokenPat groups id id", lazy((function(){
  var L$F = function(L_line){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenPat");
}, lazy((function(){
  var L$F = function(L_tokenPat){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenGroups");
}, lazy((function(){
  var L$F = function(L_groups){return L$(resolve(L_scanLineG))(L_line, L_tokenPat, L_groups, L_id, L_id);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("scanLineM", 1, "scanLineM line = countedScanLineM emptyLineStarts line", lazy((function(){
  var L$F = function(L_line){return L$(resolve(L_countedScanLineM))(L_emptyLineStarts, L_line);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  return resolve(L_define)("countedScanLineM", 2, "countedScanLineM lineStarts line = primBind (getValue 'tokenPat')\n  \\tokenPat . primBind (getValue 'tokenGroups')\n    \\groups . primBind (getValue 'parseFilters')\n      \\filters . primBind (getValue 'macroDefs')\n        \\macros . primBind (getValue 'parser_funcProps')\n          \\props . primBind (runParseFilters filters (countedScanLineG lineStarts line tokenPat groups props id id))\n            \\scanned . macroSub macros scanned", lazy((function(){
  var L$F = function(L_lineStarts){return (function(){
  var L$F = function(L_line){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenPat");
}, lazy((function(){
  var L$F = function(L_tokenPat){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenGroups");
}, lazy((function(){
  var L$F = function(L_groups){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("parseFilters");
}, lazy((function(){
  var L$F = function(L_filters){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("macroDefs");
}, lazy((function(){
  var L$F = function(L_macros){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("parser_funcProps");
}, lazy((function(){
  var L$F = function(L_props){return resolve(L_primBind)(function(){
  return L$(resolve(L_runParseFilters))(L_filters, function(){
  return L$(resolve(L_countedScanLineG))(L_lineStarts, L_line, L_tokenPat, L_groups, L_props, L_id, L_id);
});
}, lazy((function(){
  var L$F = function(L_scanned){return L$(resolve(L_macroSub))(L_macros, L_scanned);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_define)("newline", 0, "newline = regexp '\\\\r?\\\\n'", function(){
  return resolve(L_regexp)("\\r?\\n");
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("findLines", 2, "findLines offset line = \\\\\n  m = strMatch line newline\n  idx = + 1 (head (tail (tail m)))\n  .\n  eq m nil\n    cons offset nil\n    cons offset (findLines (+ offset idx) (strSubstring line idx 0))", lazy((function(){
  var L$F = function(L_offset){return (function(){
  var L$F = function(L_line){return (function(){  var L_m, L_idx;
  L_m = function(){
  return L$(resolve(L_strMatch))(L_line, L_newline);
};
  L_idx = function(){
  return resolve(L_$o)(1, function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(function(){
  return resolve(L_tail)(L_m);
});
});
});
};

  return resolve(L_eq)(L_m, L_nil)(function(){
  return L$(resolve(L_cons))(L_offset, L_nil);
})(function(){
  return L$(resolve(L_cons))(L_offset, function(){
  return L$(resolve(L_findLines))(function(){
  return resolve(L_$o)(L_offset, L_idx);
}, function(){
  return L$(resolve(L_strSubstring))(L_line, L_idx, 0);
});
});
})})();};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("newParseLine", 3, "newParseLine offset names line = primBind (scanLineM line)\n  \\scanned . ifNotErr (createAst (cons \"NEWPARSE.lsr\" (findLines offset line)) scanned names) id", lazy((function(){
  var L$F = function(L_offset){return (function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_line){return resolve(L_primBind)(function(){
  return resolve(L_scanLineM)(L_line);
}, lazy((function(){
  var L$F = function(L_scanned){return L$(resolve(L_ifNotErr))(function(){
  return L$(resolve(L_createAst))(function(){
  return L$(resolve(L_cons))("NEWPARSE.lsr", function(){
  return L$(resolve(L_findLines))(L_offset, L_line);
});
}, L_scanned, L_names);
}, L_id);};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})();};
  L$F.L$info = L$FUNC_6;
  return L$F;
})();};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("countedParseLine", 2, "countedParseLine names countedLine = primBind (countedScanLineM (head countedLine) (tail countedLine))\n  \\scanned . createAst (head countedLine) scanned names", lazy((function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_countedLine){return resolve(L_primBind)(function(){
  return L$(resolve(L_countedScanLineM))(function(){
  return resolve(L_head)(L_countedLine);
}, function(){
  return resolve(L_tail)(L_countedLine);
});
}, lazy((function(){
  var L$F = function(L_scanned){return L$(resolve(L_createAst))(function(){
  return resolve(L_head)(L_countedLine);
}, L_scanned, L_names);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("runLine", 3, "runLine offset names line = primBind (newParseLine offset names line)\n  \\ast . primBind (runAst line ast)\n    \\res . primBind res\n      \\result . cons\n        ast\n        isErr result\n          left (errMsg result)\n          right result", lazy((function(){
  var L$F = function(L_offset){return (function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_line){return resolve(L_primBind)(function(){
  return L$(resolve(L_newParseLine))(L_offset, L_names, L_line);
}, lazy((function(){
  var L$F = function(L_ast){return resolve(L_primBind)(function(){
  return resolve(L_runAst)(L_line)(L_ast);
}, lazy((function(){
  var L$F = function(L_res){return resolve(L_primBind)(L_res, lazy((function(){
  var L$F = function(L_result){return L$(resolve(L_cons))(L_ast, function(){
  return L$(resolve(L_isErr))(L_result, function(){
  return resolve(L_left)(function(){
  return resolve(L_errMsg)(L_result);
});
}, function(){
  return resolve(L_right)(L_result);
});
});};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("countedRunLine", 3, "countedRunLine file names countedLine = primBind (countedParseLine names countedLine)\n  \\ast . \\\\\n    wrapped = astFileWrap file ast\n    .\n    primBind (runAst (tail countedLine) wrapped)\n      \\res . primBind res\n        \\result . resultOfRun wrapped result", lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_countedLine){return resolve(L_primBind)(function(){
  return L$(resolve(L_countedParseLine))(L_names, L_countedLine);
}, lazy((function(){
  var L$F = function(L_ast){return (function(){  var L_wrapped;
  L_wrapped = function(){
  return L$(resolve(L_astFileWrap))(L_file, L_ast);
};

  return resolve(L_primBind)(function(){
  return resolve(L_runAst)(function(){
  return resolve(L_tail)(L_countedLine);
})(L_wrapped);
}, lazy((function(){
  var L$F = function(L_res){return resolve(L_primBind)(L_res, lazy((function(){
  var L$F = function(L_result){return L$(resolve(L_resultOfRun))(L_wrapped, L_result);};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()))})();};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("resultOfRun", 2, "resultOfRun wrapped result =\n  cons\n    wrapped\n    isErr result\n      left (errMsg result)\n      right result", lazy((function(){
  var L$F = function(L_wrapped){return (function(){
  var L$F = function(L_result){return L$(resolve(L_cons))(L_wrapped, function(){
  return L$(resolve(L_isErr))(L_result, function(){
  return resolve(L_left)(function(){
  return resolve(L_errMsg)(L_result);
});
}, function(){
  return resolve(L_right)(L_result);
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("astFileWrap", 2, "astFileWrap file ast = anno 'filename' (basename file) ast", lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_ast){return resolve(L_anno)("filename")(function(){
  return resolve(L_basename)(L_file);
})(L_ast);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("basename", 1, "basename file = strReplace file (regexp '^(.*/)?([^/]+)$') '$2'", lazy((function(){
  var L$F = function(L_file){return L$(resolve(L_strReplace))(L_file, function(){
  return resolve(L_regexp)("^(.*/)?([^/]+)$");
}, "$2");};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  return resolve(L_define)("runLines", 2, "runLines names lines = lines\n  \\h t D . primBind (runLine 0 names h)\n    \\line . primBind (runLines names t)\n      \\rest . cons line rest\n  nil", lazy((function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_lines){return resolve(L_lines)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_primBind)(function(){
  return L$(resolve(L_runLine))(0, L_names, L_h);
}, lazy((function(){
  var L$F = function(L_line){return resolve(L_primBind)(function(){
  return L$(resolve(L_runLines))(L_names, L_t);
}, lazy((function(){
  var L$F = function(L_rest){return L$(resolve(L_cons))(L_line, L_rest);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  return resolve(L_define)("countedRunLines", 4, "countedRunLines file names countedLines result = countedLines\n  \\h t D . primBind (countedRunLine file names h)\n    \\line . countedRunLines file names t (cons line result)\n  _reverse result", lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_countedLines){return (function(){
  var L$F = function(L_result){return resolve(L_countedLines)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_primBind)(function(){
  return L$(resolve(L_countedRunLine))(L_file, L_names, L_h);
}, lazy((function(){
  var L$F = function(L_line){return L$(resolve(L_countedRunLines))(L_file, L_names, L_t, function(){
  return L$(resolve(L_cons))(L_line, L_result);
});};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()))(function(){
  return resolve(L__reverse)(L_result);
});};
  L$F.L$info = L$FUNC_12;
  return L$F;
})();};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("runFile", 1, "runFile text = runNamedFile \"RUNFILE.lsr\" text", lazy((function(){
  var L$F = function(L_text){return L$(resolve(L_runNamedFile))("RUNFILE.lsr", L_text);};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("runNamedFile", 2, "runNamedFile name text = \\\\\n  counted = countedLinesForFile name text\n  lines = _map tail counted\n  names = namesForLines lines\n  .\n  #countedRunLines name names counted\n  countedRunLines name names counted nil", lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_text){return (function(){  var L_counted, L_lines, L_names;
  L_counted = function(){
  return L$(resolve(L_countedLinesForFile))(L_name, L_text);
};
  L_lines = function(){
  return L$(resolve(L__map))(L_tail, L_counted);
};
  L_names = function(){
  return resolve(L_namesForLines)(L_lines);
};

  return L$(resolve(L_countedRunLines))(L_name, L_names, L_counted, L_nil)})();};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("baseLoad", 1, "baseLoad file = primBind (readFile file)\n  \\result . result\n    \\err . err\n    \\contents . baseLoadString file contents", lazy((function(){
  var L$F = function(L_file){return resolve(L_primBind)(function(){
  return resolve(L_readFile)(L_file);
}, lazy((function(){
  var L$F = function(L_result){return resolve(L_result)(lazy((function(){
  var L$F = function(L_err){return resolve(L_err);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()))(lazy((function(){
  var L$F = function(L_contents){return L$(resolve(L_baseLoadString))(L_file, L_contents);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  return resolve(L_define)("baseLoadString", 2, "baseLoadString file contents = primBind (getValue 'activeTokenPacks')\n  \\activePacks . primBind resetStdTokenPacks\n    \\_ . primBind resetNameSpaceInfo\n      \\nsInfo . primBind (runNamedFile file contents)\n        \\result . primBind (setNameSpaceInfo nsInfo)\n          \\_ . primBind (isNil activePacks\n            resetStdTokenPacks\n            resetTokenPacks activePacks)\n            \\_ . result", lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_contents){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("activeTokenPacks");
}, lazy((function(){
  var L$F = function(L_activePacks){return resolve(L_primBind)(L_resetStdTokenPacks, lazy((function(){
  var L$F = function(L__){return resolve(L_primBind)(L_resetNameSpaceInfo, lazy((function(){
  var L$F = function(L_nsInfo){return resolve(L_primBind)(function(){
  return L$(resolve(L_runNamedFile))(L_file, L_contents);
}, lazy((function(){
  var L$F = function(L_result){return resolve(L_primBind)(function(){
  return resolve(L_setNameSpaceInfo)(L_nsInfo);
}, lazy((function(){
  var L$F = function(L___0){return resolve(L_primBind)(function(){
  return L$(resolve(L_isNil))(L_activePacks, L_resetStdTokenPacks, function(){
  return resolve(L_resetTokenPacks)(L_activePacks);
});
}, lazy((function(){
  var L$F = function(L___1){return resolve(L_result);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("load", 1, "load file = primBind (baseLoad file)\n  \\result . \\\\\n    errs = _foldr (\\line results . tail line (\\er . cons er results) (\\x . results)) nil result\n    .\n    isNil errs\n      right true\n      left errs", lazy((function(){
  var L$F = function(L_file){return resolve(L_primBind)(function(){
  return resolve(L_baseLoad)(L_file);
}, lazy((function(){
  var L$F = function(L_result){return (function(){  var L_errs;
  L_errs = function(){
  return L$(resolve(L__foldr))(lazy((function(){
  var L$F = function(L_line){return (function(){
  var L$F = function(L_results){return L$(resolve(L_tail))(L_line, lazy((function(){
  var L$F = function(L_er){return L$(resolve(L_cons))(L_er, L_results);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()), lazy((function(){
  var L$F = function(L_x){return resolve(L_results);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})();};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()), L_nil, L_result);
};

  return L$(resolve(L_isNil))(L_errs, function(){
  return resolve(L_right)(L_true);
}, function(){
  return resolve(L_left)(L_errs);
})})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  return resolve(L_define)("require", 1, "require file = primBind (getValue 'requiredFiles')\n  \\files . _contains files file\n    right false\n    primBind (setValue 'requiredFiles' (cons file files))\n      \\_. primBind (load file)\n        \\result . result\n          \\x . left x\n          \\_ . right true", lazy((function(){
  var L$F = function(L_file){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("requiredFiles");
}, lazy((function(){
  var L$F = function(L_files){return L$(resolve(L__contains))(L_files, L_file, function(){
  return resolve(L_right)(L_false);
}, function(){
  return resolve(L_primBind)(function(){
  return resolve(L_setValue)("requiredFiles", function(){
  return L$(resolve(L_cons))(L_file, L_files);
});
}, lazy((function(){
  var L$F = function(L__){return resolve(L_primBind)(function(){
  return resolve(L_load)(L_file);
}, lazy((function(){
  var L$F = function(L_result){return resolve(L_result)(lazy((function(){
  var L$F = function(L_x){return resolve(L_left)(L_x);};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()))(lazy((function(){
  var L$F = function(L___0){return resolve(L_right)(L_true);};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));
});};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  var L$FUNC_6 = {name: undefined, length: 1};
  var L$FUNC_7 = {name: undefined, length: 1};
  return resolve(L_define)("scanFile", 1, "scanFile file = primBind (readFile file)\n  \\result . result\n    \\err . err\n      \\_ . primBind (runNamedFile file contents)\n        counted = countedLinesForFile name text\n        lines = _map tail counted\n        names = namesForLines lines\n        .\n        countedScanLines name names counted", lazy((function(){
  var L$F = function(L_file){return resolve(L_primBind)(function(){
  return resolve(L_readFile)(L_file);
}, lazy((function(){
  var L$F = function(L_result){return resolve(L_result)(lazy((function(){
  var L$F = function(L_err){return resolve(L_err)(lazy((function(){
  var L$F = function(L__){return resolve(L_primBind)(function(){
  return L$(resolve(L_runNamedFile))(L_file, L_contents);
}, function(){
  return L$(resolve(L_counted))(L_$p, L_countedLinesForFile, L_name, L_text);
})(function(){
  return L$(resolve(L_lines))(L_$p, L__map, L_tail, L_counted);
})(function(){
  return L$(resolve(L_names))(L_$p, L_namesForLines, L_lines);
})(L_$B)(function(){
  return L$(resolve(L_countedScanLines))(L_name, L_names, L_counted);
});};
  L$F.L$info = L$FUNC_4;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_6;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_7;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  return resolve(L_define)("countedScanLines", 3, "countedScanLines file names countedLines = countedLines\n  \\h t D . primBind (countedScanLineM (head h) (tail h))\n    \\line . primBind (countedScanLines file names t)\n      \\rest . cons line rest\n  nil", lazy((function(){
  var L$F = function(L_file){return (function(){
  var L$F = function(L_names){return (function(){
  var L$F = function(L_countedLines){return resolve(L_countedLines)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return (function(){
  var L$F = function(L_D){return resolve(L_primBind)(function(){
  return L$(resolve(L_countedScanLineM))(function(){
  return resolve(L_head)(L_h);
}, function(){
  return resolve(L_tail)(L_h);
});
}, lazy((function(){
  var L$F = function(L_line){return resolve(L_primBind)(function(){
  return L$(resolve(L_countedScanLines))(L_file, L_names, L_t);
}, lazy((function(){
  var L$F = function(L_rest){return L$(resolve(L_cons))(L_line, L_rest);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_10;
  return L$F;
})();};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()))(L_nil);};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})();};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("defTokenPack", 2, "defTokenPack name pack = primBind (getValue 'tokenPacks')\n  \\packs . setValue 'tokenPacks' (acons name pack packs)", lazy((function(){
  var L$F = function(L_name){return (function(){
  var L$F = function(L_pack){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenPacks");
}, lazy((function(){
  var L$F = function(L_packs){return resolve(L_setValue)("tokenPacks", function(){
  return L$(resolve(L_acons))(L_name, L_pack, L_packs);
});};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: null, length: 1};
  var L$FUNC_9 = {name: null, length: 1};
  var L$FUNC_10 = {name: null, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: null, length: 1};
  var L$FUNC_16 = {name: null, length: 1};
  var L$FUNC_17 = {name: undefined, length: 1};
  var L$FUNC_18 = {name: undefined, length: 1};
  var L$FUNC_19 = {name: null, length: 1};
  var L$FUNC_20 = {name: null, length: 1};
  var L$FUNC_21 = {name: null, length: 1};
  var L$FUNC_22 = {name: null, length: 1};
  var L$FUNC_23 = {name: undefined, length: 1};
  var L$FUNC_24 = {name: undefined, length: 1};
  var L$FUNC_25 = {name: undefined, length: 1};
  var L$FUNC_26 = {name: undefined, length: 1};
  var L$FUNC_27 = {name: undefined, length: 1};
  var L$FUNC_28 = {name: undefined, length: 1};
  var L$FUNC_29 = {name: undefined, length: 1};
  var L$FUNC_30 = {name: undefined, length: 1};
  var L$FUNC_31 = {name: undefined, length: 1};
  var L$FUNC_32 = {name: undefined, length: 1};
  var L$FUNC_33 = {name: undefined, length: 1};
  return resolve(L_define)("useTokenPack", 1, "useTokenPack name = primBind (getValue 'tokenPacks')\n  \\packs . primBind (getValue 'tokenGroups')\n    \\groups . primBind (getValue 'tokenList')\n      \\tokens . primBind (getValue 'activeTokenPacks')\n        \\activePacks . primBind (getValue 'parseFilters')\n          \\filters . assoc name packs\n            \\pack . \\\\\n              groupToks = _foldl (\\value el . el \\h t . cons h (cons t value)) nil (head (tail pack))\n              newToks = _sort (\\a b . > (strLen a) (strLen b)) (_append (head pack) (_append groupToks tokens))\n              .\n              primBind (setValue 'tokenList' newToks)\n                \\_ . primBind (setValue 'tokenGroups' (appendAlist (head (tail pack)) groups))\n                  \\_ . primBind (setValue 'parseFilters' (_append filters (head (tail (tail pack)))))\n                    \\_ . primBind (computeTokenPat newToks)\n                      \\_ . setValue 'activeTokenPacks' (cons name activePacks)\n            nil", lazy((function(){
  var L$F = function(L_name){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenPacks");
}, lazy((function(){
  var L$F = function(L_packs){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenGroups");
}, lazy((function(){
  var L$F = function(L_groups){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("tokenList");
}, lazy((function(){
  var L$F = function(L_tokens){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("activeTokenPacks");
}, lazy((function(){
  var L$F = function(L_activePacks){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("parseFilters");
}, lazy((function(){
  var L$F = function(L_filters){return L$(resolve(L_assoc))(L_name, L_packs, lazy((function(){
  var L$F = function(L_pack){return (function(){  var L_groupToks, L_newToks;
  L_groupToks = function(){
  return L$(resolve(L__foldl))(lazy((function(){
  var L$F = function(L_value){return (function(){
  var L$F = function(L_el){return resolve(L_el)(lazy((function(){
  var L$F = function(L_h){return (function(){
  var L$F = function(L_t){return L$(resolve(L_cons))(L_h, function(){
  return L$(resolve(L_cons))(L_t, L_value);
});};
  L$F.L$info = L$FUNC_11;
  return L$F;
})();};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_13;
  return L$F;
})();};
  L$F.L$info = L$FUNC_14;
  return L$F;
})()), L_nil, function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(L_pack);
});
});
};
  L_newToks = function(){
  return resolve(L__sort)(lazy((function(){
  var L$F = function(L_a){return (function(){
  var L$F = function(L_b){return resolve(L_$z)(function(){
  return resolve(L_strLen)(L_a);
}, function(){
  return resolve(L_strLen)(L_b);
});};
  L$F.L$info = L$FUNC_17;
  return L$F;
})();};
  L$F.L$info = L$FUNC_18;
  return L$F;
})()), function(){
  return L$(resolve(L__append))(function(){
  return resolve(L_head)(L_pack);
}, function(){
  return L$(resolve(L__append))(L_groupToks, L_tokens);
});
});
};

  return resolve(L_primBind)(function(){
  return resolve(L_setValue)("tokenList", L_newToks);
}, lazy((function(){
  var L$F = function(L__){return resolve(L_primBind)(function(){
  return resolve(L_setValue)("tokenGroups", function(){
  return L$(resolve(L_appendAlist))(function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(L_pack);
});
}, L_groups);
});
}, lazy((function(){
  var L$F = function(L___0){return resolve(L_primBind)(function(){
  return resolve(L_setValue)("parseFilters", function(){
  return L$(resolve(L__append))(L_filters, function(){
  return resolve(L_head)(function(){
  return resolve(L_tail)(function(){
  return resolve(L_tail)(L_pack);
});
});
});
});
}, lazy((function(){
  var L$F = function(L___1){return resolve(L_primBind)(function(){
  return resolve(L_computeTokenPat)(L_newToks);
}, lazy((function(){
  var L$F = function(L___2){return resolve(L_setValue)("activeTokenPacks", function(){
  return L$(resolve(L_cons))(L_name, L_activePacks);
});};
  L$F.L$info = L$FUNC_23;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_24;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_25;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_26;
  return L$F;
})()))})();};
  L$F.L$info = L$FUNC_27;
  return L$F;
})()), L_nil);};
  L$F.L$info = L$FUNC_28;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_29;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_30;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_31;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_32;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_33;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: null, length: 1};
  var L$FUNC_4 = {name: null, length: 1};
  var L$FUNC_5 = {name: null, length: 1};
  var L$FUNC_6 = {name: null, length: 1};
  var L$FUNC_7 = {name: null, length: 1};
  var L$FUNC_8 = {name: undefined, length: 1};
  var L$FUNC_9 = {name: undefined, length: 1};
  var L$FUNC_10 = {name: undefined, length: 1};
  var L$FUNC_11 = {name: undefined, length: 1};
  var L$FUNC_12 = {name: undefined, length: 1};
  var L$FUNC_13 = {name: undefined, length: 1};
  var L$FUNC_14 = {name: undefined, length: 1};
  var L$FUNC_15 = {name: undefined, length: 1};
  return resolve(L_define)("resetTokenPacks", 1, "resetTokenPacks packs = primBind (setValue 'tokenGroups' nil)\n  \\_ . primBind (setValue 'tokenList' nil)\n    \\_ . primBind (setValue 'activeTokenPacks' nil)\n      \\_ . primBind (setValue 'parseFilters' nil)\n        \\_ . _foldr1\n          \\packCmd result . primBind packCmd \\_ . result\n          _map useTokenPack packs", lazy((function(){
  var L$F = function(L_packs){return resolve(L_primBind)(function(){
  return resolve(L_setValue)("tokenGroups", L_nil);
}, lazy((function(){
  var L$F = function(L__){return resolve(L_primBind)(function(){
  return resolve(L_setValue)("tokenList", L_nil);
}, lazy((function(){
  var L$F = function(L___0){return resolve(L_primBind)(function(){
  return resolve(L_setValue)("activeTokenPacks", L_nil);
}, lazy((function(){
  var L$F = function(L___1){return resolve(L_primBind)(function(){
  return resolve(L_setValue)("parseFilters", L_nil);
}, lazy((function(){
  var L$F = function(L___2){return L$(resolve(L__foldr1))(lazy((function(){
  var L$F = function(L_packCmd){return (function(){
  var L$F = function(L_result){return resolve(L_primBind)(L_packCmd, lazy((function(){
  var L$F = function(L___3){return resolve(L_result);};
  L$F.L$info = L$FUNC_8;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_9;
  return L$F;
})();};
  L$F.L$info = L$FUNC_10;
  return L$F;
})()), function(){
  return L$(resolve(L__map))(L_useTokenPack, L_packs);
});};
  L$F.L$info = L$FUNC_11;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_12;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_13;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_14;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_15;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("resetStdTokenPacks", 0, "resetStdTokenPacks = primBind (getValue 'stdTokenPacks')\n  \\stds . primBind (resetTokenPacks stds)\n    \\_ . setValue 'activeTokenPacks' nil", function(){
  return resolve(L_primBind)(function(){
  return resolve(L_getValue)("stdTokenPacks");
}, lazy((function(){
  var L$F = function(L_stds){return resolve(L_primBind)(function(){
  return resolve(L_resetTokenPacks)(L_stds);
}, lazy((function(){
  var L$F = function(L__){return resolve(L_setValue)("activeTokenPacks", L_nil);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("addStdTokenPacks", 1, "addStdTokenPacks morePacks = primBind (getValue 'stdTokenPacks')\n  \\stds . setValue 'stdTokenPacks' (_append stds morePacks)", lazy((function(){
  var L$F = function(L_morePacks){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("stdTokenPacks");
}, lazy((function(){
  var L$F = function(L_stds){return resolve(L_setValue)("stdTokenPacks", function(){
  return L$(resolve(L__append))(L_stds, L_morePacks);
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("addParseFilter", 1, "addParseFilter filt = primBind (getValue 'parseFilters')\n  \\filters . setValue 'parseFilters' (_append filters (cons filt nil))", lazy((function(){
  var L$F = function(L_filt){return resolve(L_primBind)(function(){
  return resolve(L_getValue)("parseFilters");
}, lazy((function(){
  var L$F = function(L_filters){return resolve(L_setValue)("parseFilters", function(){
  return L$(resolve(L__append))(L_filters, function(){
  return L$(resolve(L_cons))(L_filt, L_nil);
});
});};
  L$F.L$info = L$FUNC_2;
  return L$F;
})()));};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: null, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  var L$FUNC_4 = {name: undefined, length: 1};
  var L$FUNC_5 = {name: undefined, length: 1};
  return resolve(L_define)("d", 3, "d label value expr = log (strCat (cons label (cons value nil))) expr", lazy((function(){
  var L$F = function(L_label){return (function(){
  var L$F = function(L_value){return (function(){
  var L$F = function(L_expr){return resolve(L_log)(function(){
  return resolve(L_strCat)(function(){
  return L$(resolve(L_cons))(L_label, function(){
  return L$(resolve(L_cons))(L_value, L_nil);
});
});
}, L_expr);};
  L$F.L$info = L$FUNC_3;
  return L$F;
})();};
  L$F.L$info = L$FUNC_4;
  return L$F;
})();};
  L$F.L$info = L$FUNC_5;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: null, length: 1};
  var L$FUNC_2 = {name: undefined, length: 1};
  var L$FUNC_3 = {name: undefined, length: 1};
  return resolve(L_define)("dd", 2, "dd label arg = d label arg arg", lazy((function(){
  var L$F = function(L_label){return (function(){
  var L$F = function(L_arg){return L$(resolve(L_d))(L_label, L_arg, L_arg);};
  L$F.L$info = L$FUNC_2;
  return L$F;
})();};
  L$F.L$info = L$FUNC_3;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: null, length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return resolve(L_define)("testParse", 1, "testParse str = countedParseLine nil (head (countedLinesForFile 'parse' str))", lazy((function(){
  var L$F = function(L_str){return L$(resolve(L_countedParseLine))(L_nil, function(){
  return resolve(L_head)(function(){
  return L$(resolve(L_countedLinesForFile))("parse", L_str);
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_setValue)("macroDefs", L_hamt);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_setValue)("requiredFiles", L_nil);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_setValue)("tokenPacks", L_nil);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_setValue)("activeTokenPacks", L_nil);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_setValue)("stdTokenPacks", function(){
  return L$(resolve(L_cons))("std", L_nil);
});
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return resolve(L_setValue)("parser_funcProps", L_nil);
})());}, 
    function(){return ((function(){
  var L$context = null;
  
  return L$(resolve(L_defTokenPack))("std", function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_cons))(".", function(){
  return L$(resolve(L_cons))("\\", function(){
  return L$(resolve(L_cons))("\\\\", function(){
  return L$(resolve(L_cons))("\\@", L_nil);
});
});
});
}, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_acons))("(", ")", L_nil);
}, function(){
  return L$(resolve(L_cons))(L_nil, L_nil);
});
});
});
})());}, 
    function(){return (resolve(L_resetStdTokenPacks));}, 
    function(){return ((function(){
  var L$context = null;
  
  var L$FUNC_0 = {name: "defMacro", length: 1};
  var L$FUNC_1 = {name: undefined, length: 1};
  return L$(resolve(L__defMacro))("defMacro", lazy((function(){
  var L$F = function(L_list){return L$(resolve(L_cons))("_defMacro", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_head)(L_list);
}, function(){
  return L$(resolve(L_cons))(function(){
  return L$(resolve(L_cons))("\\@", function(){
  return L$(resolve(L_cons))("leisureName", function(){
  return L$(resolve(L_cons))(function(){
  return resolve(L_strTokenString)(function(){
  return resolve(L_head)(L_list);
});
}, function(){
  return L$(resolve(L_cons))(".", function(){
  return resolve(L_tail)(L_list);
});
});
});
});
}, L_nil);
});
});};
  L$F.L$info = L$FUNC_1;
  return L$F;
})()));
})());}
  ]);
});
//# sourceMappingURL=simpleParse.map
