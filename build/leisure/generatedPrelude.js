"use strict";
define([], function(){
  return L_runMonads([
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setNameSpace)("core");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("err", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("boolean", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("true", "boolean");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("false", "boolean");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("option", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("some", "option");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("none", "option");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("either", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("left", "either");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("right", "either");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("keyedSequence", "sequence");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("asIO", 1, "asIO x = x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("fakereturn", 1, "fakereturn x = x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_recur", 1, "_recur x = \\f . f x", lazy(setDataType((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), '_recur')))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), '_recur')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("true", 0, "true = \\a b . a", lazy(setDataType(setType((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_a)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'true'), 'true')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("false", 0, "false = \\a b . b", lazy(setDataType(setType((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_b)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'false'), 'false')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("not", 1, "not b = b false true", lazy((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_b)(L_false)(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("and", 2, "and a b = a b false", lazy((function(){
  var L$F = function(L_a, L_b) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_a, L_b),
  Leisure_traceReturn(L$F, (L$(resolve(L_a))(L_b, L_false)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("&&", 0, "&& = and", L_and);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("or", 2, "or a b = a true b", lazy((function(){
  var L$F = function(L_a, L_b) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_a, L_b),
  Leisure_traceReturn(L$F, (L$(resolve(L_a))(L_true, L_b)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("||", 0, "|| = or", L_or);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("some", 1, "some x = \\someCase noneCase . someCase x", lazy(setDataType((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_someCase){return (
  Leisure_traceCall(L$F, L_someCase),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_noneCase){return (
  Leisure_traceCall(L$F, L_noneCase),
  Leisure_traceReturn(L$F, (resolve(L_someCase)(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'some')))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})(), 'some')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("none", 0, "none = \\someCase noneCase . noneCase", lazy(setDataType(setType((function(){
  var L$F = function(L_someCase){return (
  Leisure_traceCall(L$F, L_someCase),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_noneCase){return (
  Leisure_traceCall(L$F, L_noneCase),
  Leisure_traceReturn(L$F, (resolve(L_noneCase)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'none'), 'none')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isNone", 1, "isNone obj = hasType obj none", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_obj, L_none)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isSome", 1, "isSome obj = hasType obj some", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_obj, L_some)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isOption", 1, "isOption obj = or (isSome obj) (isNone obj)", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isSome)(L_obj));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNone)(L_obj));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("neq", 2, "neq a b = not (eq a b)", lazy((function(){
  var L$F = function(L_a, L_b) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_a, L_b),
  Leisure_traceReturn(L$F, (resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_a, L_b));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("left", 1, "left x = \\lCase rCase . lCase x", lazy(setDataType((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_lCase){return (
  Leisure_traceCall(L$F, L_lCase),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rCase){return (
  Leisure_traceCall(L$F, L_rCase),
  Leisure_traceReturn(L$F, (resolve(L_lCase)(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'left')))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})(), 'left')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("right", 1, "right x = \\lCase rCase . rCase x", lazy(setDataType((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_lCase){return (
  Leisure_traceCall(L$F, L_lCase),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rCase){return (
  Leisure_traceCall(L$F, L_rCase),
  Leisure_traceReturn(L$F, (resolve(L_rCase)(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'right')))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})(), 'right')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isEither", 1, "isEither obj = or (hasType obj left) (hasType obj right)", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_obj, L_left));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_obj, L_right));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isString", 1, "isString s = == (getType s) 'string'", lazy((function(){
  var L$F = function(L_s){return (
  Leisure_traceCall(L$F, L_s),
  Leisure_traceReturn(L$F, (resolve(L_$p$p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_s));
});
})(++Leisure_traceInstance, L$instance), "string")))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isNumber", 1, "isNumber s = == (getType s) 'number'", lazy((function(){
  var L$F = function(L_s){return (
  Leisure_traceCall(L$F, L_s),
  Leisure_traceReturn(L$F, (resolve(L_$p$p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_s));
});
})(++Leisure_traceInstance, L$instance), "number")))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strAsc", 1, "strAsc string = _strAsc (assertType 'strAsc string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strAsc)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strAsc string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strChr", 1, "strChr ascii = _strChr (assertType 'strChr string' 'number' ascii)", lazy((function(){
  var L$F = function(L_ascii){return (
  Leisure_traceCall(L$F, L_ascii),
  Leisure_traceReturn(L$F, (resolve(L__strChr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strChr string", "number", L_ascii));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strAt", 2, "strAt string index = _strAt\r\n  assertType 'strAt string' 'string' string\r\n  assertType 'strAt index' 'number' index", lazy((function(){
  var L$F = function(L_string, L_index) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_string, L_index),
  Leisure_traceReturn(L$F, (resolve(L__strAt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strAt string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strAt index", "number", L_index));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strStartsWith", 2, "strStartsWith string prefix = _strStartsWith\r\n  assertType 'strStartsWith string' 'string' string\r\n  assertType 'strStartsWith prefix' 'string' prefix", lazy((function(){
  var L$F = function(L_string, L_prefix) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_string, L_prefix),
  Leisure_traceReturn(L$F, (resolve(L__strStartsWith)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strStartsWith string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strStartsWith prefix", "string", L_prefix));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strLen", 1, "strLen string = _strLen (assertType 'strLen string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strLen)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strLen string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strReverse", 1, "strReverse string = _strReverse (assertType 'strLen string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strReverse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strLen string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strToLowerCase", 1, "strToLowerCase string = _strToLowerCase (assertType 'strToLowerCase string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strToLowerCase)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strToLowerCase string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strToUpperCase", 1, "strToUpperCase string = _strToUpperCase (assertType 'strToUpperCase string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strToUpperCase)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strToUpperCase string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strReplace", 3, "strReplace string pat repl = _strReplace\r\n  assertType 'strReplace string' 'string' string\r\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strStartsWith pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat\r\n  assertType 'strReplace repl' 'string' repl", lazy((function(){
  var L$F = function(L_string, L_pat, L_repl) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_string, L_pat, L_repl),
  Leisure_traceReturn(L$F, (resolve(L__strReplace)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strReplace string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_pat, "string"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_pat, "*RegExp"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("strStartsWith pat should be type string or RegExp but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_pat));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_show)(L_pat));
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
})(++Leisure_traceInstance, L$instance))(L_pat));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strReplace repl", "string", L_repl));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strSubstring", 3, "strSubstring str start end = _strSubstring\r\n  assertType 'strSubstring str' 'string' str\r\n  assertType 'strSubstring start' 'number' start\r\n  assertType 'strSubstring end' 'number' end", lazy((function(){
  var L$F = function(L_str, L_start, L_end) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_start, L_end),
  Leisure_traceReturn(L$F, (resolve(L__strSubstring)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strSubstring str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strSubstring start", "number", L_start));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strSubstring end", "number", L_end));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strSplit", 2, "strSplit str pat = _strSplit\r\n  assertType 'strSplit str' 'string' str\r\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strSplit pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(){
  var L$F = function(L_str, L_pat) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat),
  Leisure_traceReturn(L$F, (resolve(L__strSplit)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strSplit str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_pat, "string"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_pat, "*RegExp"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("strSplit pat should be type string or RegExp but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_pat));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_show)(L_pat));
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
})(++Leisure_traceInstance, L$instance))(L_pat));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strCat", 1, "strCat list = _strCat\r\n  assert (isList list) (strCat (cons 'strCat list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L__strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isList)(L_list));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("strCat list should be type cons or nil but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_list));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strAdd", 2, "strAdd str1 str2 = _strAdd (assertType 'strAdd str1' 'string' str1) (assertType 'strAdd str2' 'string' str2)", lazy((function(){
  var L$F = function(L_str1, L_str2) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str1, L_str2),
  Leisure_traceReturn(L$F, (resolve(L__strAdd)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strAdd str1", "string", L_str1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strAdd str2", "string", L_str2));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strMatch", 2, "strMatch str pat = _strMatch\r\n  assertType 'strMatch str' 'string' str\r\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strMatch pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(){
  var L$F = function(L_str, L_pat) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat),
  Leisure_traceReturn(L$F, (resolve(L__strMatch)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strMatch str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_pat, "string"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_pat, "*RegExp"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("strMatch pat should be type string or RegExp but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_pat));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_show)(L_pat));
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
})(++Leisure_traceInstance, L$instance))(L_pat));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strToList", 1, "strToList str = _strToList (assertType 'strToList str' 'string' str)", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L__strToList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("strToList str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strFromList", 1, "strFromList list = _strFromList\r\n  assert (isList list) (strCat (cons 'strFromList list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L__strFromList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isList)(L_list));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("strFromList list should be type cons or nil but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_list));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("regexp", 1, "regexp str = _regexp (assertType 'regexp str' 'string' str)", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L__regexp)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("regexp str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("regexpFlags", 2, "regexpFlags str flags = _regexpFlags\r\n  assertType 'regexp str' 'string' str\r\n  assertType 'regexp flags' 'string' flags", lazy((function(){
  var L$F = function(L_str, L_flags) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_flags),
  Leisure_traceReturn(L$F, (resolve(L__regexpFlags)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("regexp str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("regexp flags", "string", L_flags));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("jsonParse", 3, "jsonParse str failure success = _jsonParse\r\n  assertType 'jsonParse str' 'string' str\r\n  failure\r\n  success", lazy((function(){
  var L$F = function(L_str, L_failure, L_success) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_failure, L_success),
  Leisure_traceReturn(L$F, (resolve(L__jsonParse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assertType)("jsonParse str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), L_failure, L_success)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("show", 1, "show x = _show x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L__show)(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("equal", 2, "equal x y = eq x y", lazy((function(){
  var L$F = function(L_x, L_y) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_x, L_y),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_x, L_y)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("id", 1, "id x = x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("unit", 0, "unit = \\x . x", lazy(setDataType(setType((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'unit'), 'unit')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("compose", 2, "compose f g = \\x . f (g x)", lazy(setDataType((function(){
  var L$F = function(L_f, L_g) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_f, L_g),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_f)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_g)(L_x));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'compose')))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})(), 'compose')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("flip", 1, "flip func = \\x y . func y x", lazy(setDataType((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_y){return (
  Leisure_traceCall(L$F, L_y),
  Leisure_traceReturn(L$F, (resolve(L_func)(L_y)(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'flip')))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})(), 'flip')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("withCons", 3, "withCons l nilCase cont = isCons l (l (\\h t D . cont h t) nilCase) nilCase", lazy((function(){
  var L$F = function(L_l, L_nilCase, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_l, L_nilCase, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_isCons)(L_l)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_l))(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (L$(resolve(L_cont))(L_h, L_t)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()), L_nilCase));
});
})(++Leisure_traceInstance, L$instance))(L_nilCase)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("cons", 2, "cons a b = \\f . f a b", lazy(setDataType((function(){
  var L$F = function(L_a, L_b) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_a, L_b),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_a)(L_b)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'cons')))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'cons')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isCons", 1, "isCons c = hasType c cons", lazy((function(){
  var L$F = function(L_c){return (
  Leisure_traceCall(L$F, L_c),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_c, L_cons)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isList", 1, "isList l = or (hasType l cons) (hasType l nil)", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_l, L_cons));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_l, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("assertType", 3, "assertType msg type value =\r\n  assert\r\n    hasType value type\r\n    strCat (cons msg (cons ' should be type ' (cons (getDataType type) (cons ', but its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))))\r\n    value", lazy((function(){
  var L$F = function(L_msg, L_type, L_value) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_msg, L_type, L_value),
  Leisure_traceReturn(L$F, (resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_value, L_type));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_msg, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(" should be type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getDataType)(L_type));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(", but its type is ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_value));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_show)(L_value));
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
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_value)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("nil", 0, "nil = \\a b . b", lazy(setDataType(setType((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_b)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'nil'), 'nil')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isNil", 1, "isNil n = hasType n nil", lazy((function(){
  var L$F = function(L_n){return (
  Leisure_traceCall(L$F, L_n),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_n, L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("head", 1, "head l = l \\h t . h", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_h)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("tail", 1, "tail l = l \\h t . t", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_t)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("last", 1, "last l = isNil (tail l)\r\n  head l\r\n  last (tail l)", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_isNil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_l));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_last)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("removeLast", 1, "removeLast l = isNil (tail l)\r\n  nil\r\n  cons (head l) (removeLast (tail l))", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_isNil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance))(L_nil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_l));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_removeLast)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("length", 1, "length list = isCons list\r\n  + 1 (length (tail list))\r\n  assert (hasType list nil) (strCat (cons \"length argument is not a proper list: \" (cons list nil))) 0", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_isCons)(L_list)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_length)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_list, L_nil));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("length argument is not a proper list: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_list, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(0));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_foldl", 3, "_foldl func initialValue l = l (\\h t D . foldl func (func initialValue h) t) initialValue", lazy((function(){
  var L$F = function(L_func, L_initialValue, L_l) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_initialValue, L_l),
  Leisure_traceReturn(L$F, (L$(resolve(L_l))(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_foldl)(L_func)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_func))(L_initialValue, L_h));
});
})(++Leisure_traceInstance, L$instance))(L_t)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()), L_initialValue)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_foldl1", 2, "_foldl1 func l = l \\h t . foldl func h t", lazy((function(){
  var L$F = function(L_func, L_l) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_l),
  Leisure_traceReturn(L$F, (resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_foldl)(L_func)(L_h)(L_t)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_foldr", 3, "_foldr func finalValue list = list\r\n  \\h t D . func h (foldr func finalValue t)\r\n  finalValue", lazy((function(){
  var L$F = function(L_func, L_finalValue, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_finalValue, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (L$(resolve(L_func))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_foldr)(L_func)(L_finalValue)(L_t));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))(L_finalValue)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_foldr1", 2, "_foldr1 func list = list \\h t . isNil t\r\n  h\r\n  func h (foldr1 func t)", lazy((function(){
  var L$F = function(L_func, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_t)(L_h)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_func))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_foldr1)(L_func)(L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_append", 2, "_append a b = _foldr cons b a", lazy((function(){
  var L$F = function(L_a, L_b) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_a, L_b),
  Leisure_traceReturn(L$F, (resolve(L__foldr)(L_cons, L_b, L_a)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("foldl", 0, "foldl = _foldl", L__foldl);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("foldl1", 0, "foldl1 = _foldl1", L__foldl1);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("foldr", 0, "foldr = _foldr", L__foldr);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("foldr1", 0, "foldr1 = _foldr1", L__foldr1);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("append", 0, "append = _append", L__append);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_reverse", 1, "_reverse l = rev l nil", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_rev)(L_l, L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("reverse", 0, "reverse = _reverse", L__reverse);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("rev", 2, "rev l result = isNil l\r\n  result\r\n  rev (tail l) (cons (head l) result)", lazy((function(){
  var L$F = function(L_l, L_result) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_l, L_result),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_l)(L_result)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_rev)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_l));
});
})(++Leisure_traceInstance, L$instance), L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_flatten", 1, "_flatten list = isCons list\r\n  subflatten list nil\r\n  list", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_isCons)(L_list)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_subflatten)(L_list, L_nil));
});
})(++Leisure_traceInstance, L$instance))(L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("flatten", 0, "flatten = _flatten", L__flatten);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("subflatten", 2, "subflatten list result = isNil list\r\n  result\r\n  isCons list\r\n    subflatten (head list) (subflatten (tail list) result)\r\n    cons list result", lazy((function(){
  var L$F = function(L_list, L_result) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_list, L_result),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_list)(L_result)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_list)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_subflatten)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_subflatten)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance), L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_list, L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_filter", 2, "_filter func list = isNil list\r\n  nil\r\n  func (head list) (cons (head list)) id (_filter func (tail list))", lazy((function(){
  var L$F = function(L_func, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_list),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_list)(L_nil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_func))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_id, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__filter)(L_func, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filter", 0, "filter = _filter", L__filter);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_find", 2, "_find predicate list =\r\n  foldr (\\item result . (predicate item) (some item) result) none list", lazy((function(){
  var L$F = function(L_predicate, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_predicate, L_list),
  Leisure_traceReturn(L$F, (resolve(L_foldr)(lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (L$(resolve(L_predicate))(L_item, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_some)(L_item));
});
})(++Leisure_traceInstance, L$instance), L_result)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))(L_none)(L_list)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("find", 0, "find = _find", L__find);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_contains", 2, "_contains list item = find (\\el . eq el item) list (\\x . true) false", lazy((function(){
  var L$F = function(L_list, L_item) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_list, L_item),
  Leisure_traceReturn(L$F, (resolve(L_find)(lazy((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_el, L_item)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))(L_list)(lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))(L_false)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("findIndex", 2, "findIndex func list = idx list func 0", lazy((function(){
  var L$F = function(L_func, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_list),
  Leisure_traceReturn(L$F, (resolve(L_idx)(L_list, L_func, 0)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("idx", 3, "idx list func pos = list\r\n  \\h t D . func h\r\n    pos\r\n    idx t func (+ 1 pos)\r\n  -1", lazy((function(){
  var L$F = function(L_list, L_func, L_pos) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_list, L_func, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (L$(resolve(L_func))(L_h, L_pos, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_idx)(L_t, L_func, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(1, L_pos));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))(-1)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("index", 2, "index list el = find (\\item . == el item) list", lazy((function(){
  var L$F = function(L_list, L_el) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_list, L_el),
  Leisure_traceReturn(L$F, (resolve(L_find)(lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (resolve(L_$p$p)(L_el, L_item)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))(L_list)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_map", 2, "_map func l = isCons l\r\n  cons (func (head l)) (_map func (tail l))\r\n  l", lazy((function(){
  var L$F = function(L_func, L_l) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_l),
  Leisure_traceReturn(L$F, (resolve(L_isCons)(L_l)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_l));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)(L_func, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_l)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("map", 0, "map = _map", L__map);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("intersperse", 2, "intersperse list element = list (\\h t D .\r\n  isNil t\r\n    list\r\n    cons h (cons element (intersperse t element))) nil", lazy((function(){
  var L$F = function(L_list, L_element) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_list, L_element),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_t)(L_list)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_element, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_intersperse)(L_t, L_element));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("join", 2, "join list el = strCat (intersperse list el)", lazy((function(){
  var L$F = function(L_list, L_el) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_list, L_el),
  Leisure_traceReturn(L$F, (resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_intersperse)(L_list, L_el));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("assertAlist", 3, "assertAlist msg value result = assert (isAlist value) (strCat (cons msg (cons ' should be a association list, but it is not; its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))) result", lazy((function(){
  var L$F = function(L_msg, L_value, L_result) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_msg, L_value, L_result),
  Leisure_traceReturn(L$F, (resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isAlist)(L_value));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_msg, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(" should be a association list, but it is not; its type is ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_value));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_show)(L_value));
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
})(++Leisure_traceInstance, L$instance))(L_result)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("acons", 3, "acons k v alist = assertAlist \"acons alist\" alist (\\@ type cons . \\f . \\@ assoc true . f (cons k v) alist)", lazy((function(){
  var L$F = function(L_k, L_v, L_alist) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_k, L_v, L_alist),
  Leisure_traceReturn(L$F, (resolve(L_assertAlist)("acons alist", L_alist, lazy(setType(setLambdaProperties((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_k, L_v));
});
})(++Leisure_traceInstance, L$instance))(L_alist)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), {"assoc":"true"}), 'cons')))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("assoc", 2, "assoc k alist  = find (\\el . eq k (head el)) alist (\\cell . cell \\head tail . some tail) none", lazy((function(){
  var L$F = function(L_k, L_alist) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_k, L_alist),
  Leisure_traceReturn(L$F, (resolve(L_find)(lazy((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_k, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_el));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))(L_alist)(lazy((function(){
  var L$F = function(L_cell){return (
  Leisure_traceCall(L$F, L_cell),
  Leisure_traceReturn(L$F, (resolve(L_cell)(lazy((function(){
  var L$F = function(L_head){return (
  Leisure_traceCall(L$F, L_head),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_tail){return (
  Leisure_traceCall(L$F, L_tail),
  Leisure_traceReturn(L$F, (resolve(L_some)(L_tail)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))(L_none)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("rassoc", 2, "rassoc v alist = find (\\el . eq v (tail el)) alist (\\cell . cell \\head tail . some head) none", lazy((function(){
  var L$F = function(L_v, L_alist) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_v, L_alist),
  Leisure_traceReturn(L$F, (resolve(L_find)(lazy((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_v, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_el));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))(L_alist)(lazy((function(){
  var L$F = function(L_cell){return (
  Leisure_traceCall(L$F, L_cell),
  Leisure_traceReturn(L$F, (resolve(L_cell)(lazy((function(){
  var L$F = function(L_head){return (
  Leisure_traceCall(L$F, L_head),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_tail){return (
  Leisure_traceCall(L$F, L_tail),
  Leisure_traceReturn(L$F, (resolve(L_some)(L_head)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))(L_none)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isAlist", 1, "isAlist obj = or (isNil obj) (hasProperty obj 'assoc')", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_obj));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasProperty)(L_obj, "assoc"));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("aconsPair", 2, "aconsPair keyValue list = \\@ type cons . \\f . \\@ assoc true . f keyValue list", lazy((function(){
  var L$F = function(L_keyValue, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_keyValue, L_list),
  Leisure_traceReturn(L$F, (setType(setLambdaProperties((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_keyValue)(L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), {"assoc":"true"}), 'cons')))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("appendAlist", 2, "appendAlist a b = _foldr aconsPair a b", lazy((function(){
  var L$F = function(L_a, L_b) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_a, L_b),
  Leisure_traceReturn(L$F, (resolve(L__foldr)(L_aconsPair, L_a, L_b)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("keys", 1, "keys list = _map (\\l . head l) list", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L__map)(lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_head)(L_l)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()), L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("getProperty", 2, "getProperty func prop = assoc prop (getProperties func)", lazy((function(){
  var L$F = function(L_func, L_prop) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_prop),
  Leisure_traceReturn(L$F, (resolve(L_assoc)(L_prop, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getProperties)(L_func));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("hasProperty", 2, "hasProperty func prop = getProperty func prop\r\n  \\_ . true\r\n  false", lazy((function(){
  var L$F = function(L_func, L_prop) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_prop),
  Leisure_traceReturn(L$F, (resolve(L_getProperty)(L_func, L_prop)(lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))(L_false)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("odds", 1, "odds l = l\r\n  \\h t D . cons h (evens t)\r\n  nil", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_evens)(L_t));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("evens", 1, "evens l = l\r\n  \\h t D . odds t\r\n  nil", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_odds)(L_t)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("cleave", 1, "cleave l = cons (evens l) (odds l)", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_evens)(L_l));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_odds)(L_l));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("merge", 3, "merge cmp a b = a\r\n  \\ah at D . b\r\n    \\bh bt D . cmp ah bh\r\n      cons ah (merge cmp at b)\r\n      cons bh (merge cmp a bt)\r\n    a\r\n  b", lazy((function(){
  var L$F = function(L_cmp, L_a, L_b) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_cmp, L_a, L_b),
  Leisure_traceReturn(L$F, (L$(resolve(L_a))(lazy((function(){
  var L$F = function(L_ah){return (
  Leisure_traceCall(L$F, L_ah),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_at){return (
  Leisure_traceCall(L$F, L_at),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (L$(resolve(L_b))(lazy((function(){
  var L$F = function(L_bh){return (
  Leisure_traceCall(L$F, L_bh),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_bt){return (
  Leisure_traceCall(L$F, L_bt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D_0){return (
  Leisure_traceCall(L$F, L_D_0),
  Leisure_traceReturn(L$F, (L$(resolve(L_cmp))(L_ah, L_bh, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_ah, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_merge)(L_cmp, L_at, L_b));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_bh, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_merge)(L_cmp, L_a, L_bt));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()), L_a)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()), L_b)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("mergeSort", 2, "mergeSort cmp l = l\r\n  \\h t D . eq (tail l) nil\r\n    l\r\n    \\\\\r\n      cl = cleave l\r\n      e = head cl\r\n      o = tail cl\r\n      .\r\n      merge cmp (mergeSort cmp e) (mergeSort cmp o)\r\n  nil", lazy((function(){
  var L$F = function(L_cmp, L_l) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_cmp, L_l),
  Leisure_traceReturn(L$F, (L$(resolve(L_l))(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_eq)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance), L_nil)(L_l)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_cl, L_e, L_o;
  L_cl = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cleave)(L_l));
});
})(++Leisure_traceInstance, L$instance);
  L_e = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_cl));
});
})(++Leisure_traceInstance, L$instance);
  L_o = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_cl));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_merge)(L_cmp, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_mergeSort)(L_cmp, L_e));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_mergeSort)(L_cmp, L_o));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()), L_nil)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("insertSorted", 3, "insertSorted sortFunc item list = list\r\n  \\h t D . sortFunc item h (cons item list) (cons h (insertSorted sortFunc item t))\r\n  cons item nil", lazy((function(){
  var L$F = function(L_sortFunc, L_item, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_sortFunc, L_item, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (L$(resolve(L_sortFunc))(L_item, L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_item, L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_insertSorted)(L_sortFunc, L_item, L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_item, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("err", 1, "err msg = \\f . f msg", lazy(setDataType((function(){
  var L$F = function(L_msg){return (
  Leisure_traceCall(L$F, L_msg),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_msg)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'err')))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'err')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("errMsg", 1, "errMsg err = err \\m . m", lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_err)(lazy((function(){
  var L$F = function(L_m){return (
  Leisure_traceCall(L$F, L_m),
  Leisure_traceReturn(L$F, (resolve(L_m)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isErr", 1, "isErr thing = hasType thing err", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_thing, L_err)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("ifNotErr", 2, "ifNotErr thing cont = (isErr thing) thing (cont thing)", lazy((function(){
  var L$F = function(L_thing, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_thing, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_isErr)(L_thing)(L_thing)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)(L_thing));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setNameSpace)("parser");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("token", 2, "token txt pos = \\f . f txt pos", lazy(setDataType((function(){
  var L$F = function(L_txt, L_pos) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_txt, L_pos),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_txt)(L_pos)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'token')))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'token')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("tokenString", 1, "tokenString tok = tok \\t p . t", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_tok)(lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_t)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("tokenFilepos", 1, "tokenFilepos tok = tok \\t p . p", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_tok)(lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_p)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("tokenPos", 1, "tokenPos tok = tok \\t p . isFilepos p\r\n  fileposOffset p\r\n  p", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_tok)(lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_isFilepos)(L_p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposOffset)(L_p));
});
})(++Leisure_traceInstance, L$instance))(L_p)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isToken", 1, "isToken t = hasType t token", lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_t, L_token)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("emptyLineStarts", 0, "emptyLineStarts = cons 'EMPTYFILE.lsr' (cons 1 nil)", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("EMPTYFILE.lsr", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(1, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filepos", 3, "filepos file line offset = \\f . f file line offset", lazy(setDataType((function(){
  var L$F = function(L_file, L_line, L_offset) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_file, L_line, L_offset),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_file)(L_line)(L_offset)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'filepos')))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'filepos')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("fileposFile", 1, "fileposFile p = p \\file line offset . file", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_p)(lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_file)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("fileposLine", 1, "fileposLine p = p \\file line offset . line", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_p)(lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_line)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("fileposOffset", 1, "fileposOffset p = p \\file line offset . offset", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_p)(lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_offset)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isFilepos", 1, "isFilepos p = hasType p filepos", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_p, L_filepos)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("addFilepos", 2, "addFilepos pos change = isFilepos pos pos emptyFilePos\r\n  \\file line offset . filepos file line (+ offset change)", lazy((function(){
  var L$F = function(L_pos, L_change) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_pos, L_change),
  Leisure_traceReturn(L$F, (resolve(L_isFilepos)(L_pos)(L_pos)(L_emptyFilePos)(lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_filepos)(L_file, L_line, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_offset, L_change));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("emptyFilePos", 0, "emptyFilePos = filepos 'NOTHING.lsr' 0 0", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filepos)("NOTHING.lsr", 0, 0));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isEmptyPos", 1, "isEmptyPos pos = and (isFilepos pos) (and (eq 0 (fileposLine pos)) (eq 0 (fileposOffset pos)))", lazy((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isFilepos)(L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(0, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposLine)(L_pos));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(0, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposOffset)(L_pos));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("emptyFor", 1, "emptyFor thing = filepos (fileposFile (position thing)) 0 0", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, (resolve(L_filepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposFile)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_thing));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), 0, 0)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("startFilePos", 0, "startFilePos = emptyFilePos", L_emptyFilePos);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filePosFor", 2, "filePosFor lineStarts offset = countFilePos (head (tail lineStarts)) 0 (tail (tail lineStarts)) offset\r\n  \\line offset . filepos (head lineStarts) line offset", lazy((function(){
  var L$F = function(L_lineStarts, L_offset) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lineStarts, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_countFilePos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_lineStarts));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), 0, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_lineStarts));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_offset)(lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_filepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_lineStarts));
});
})(++Leisure_traceInstance, L$instance), L_line, L_offset)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countFilePos", 4, "countFilePos line lineOffset starts offset = or (isNil starts) (> (head starts) offset)\r\n  \\f . f line (- offset lineOffset)\r\n  countFilePos (+ line 1) (head starts) (tail starts) offset", lazy((function(){
  var L$F = function(L_line, L_lineOffset, L_starts, L_offset) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_line, L_lineOffset, L_starts, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_starts));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$z)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_starts));
});
})(++Leisure_traceInstance, L$instance), L_offset));
});
})(++Leisure_traceInstance, L$instance))(lazy((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_line)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$_)(L_offset, L_lineOffset));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countFilePos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_line, 1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_starts));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_starts));
});
})(++Leisure_traceInstance, L$instance), L_offset));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("fileposList", 1, "fileposList pos = pos \\file line offset . cons line (cons offset nil)", lazy((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_pos)(lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_line, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_offset, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parens", 3, "parens start end content = \\f . f start end content", lazy(setDataType((function(){
  var L$F = function(L_start, L_end, L_content) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_start, L_end, L_content),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_start)(L_end)(L_content)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'parens')))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'parens')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parensStart", 1, "parensStart p = p \\s e c . s", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_p)(lazy((function(){
  var L$F = function(L_s){return (
  Leisure_traceCall(L$F, L_s),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_e){return (
  Leisure_traceCall(L$F, L_e),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_c){return (
  Leisure_traceCall(L$F, L_c),
  Leisure_traceReturn(L$F, (resolve(L_s)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parensEnd", 1, "parensEnd p = p \\s e c . e", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_p)(lazy((function(){
  var L$F = function(L_s){return (
  Leisure_traceCall(L$F, L_s),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_e){return (
  Leisure_traceCall(L$F, L_e),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_c){return (
  Leisure_traceCall(L$F, L_c),
  Leisure_traceReturn(L$F, (resolve(L_e)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parensContent", 1, "parensContent p = p \\s e c . c", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_p)(lazy((function(){
  var L$F = function(L_s){return (
  Leisure_traceCall(L$F, L_s),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_e){return (
  Leisure_traceCall(L$F, L_e),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_c){return (
  Leisure_traceCall(L$F, L_c),
  Leisure_traceReturn(L$F, (resolve(L_c)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isParens", 1, "isParens p = hasType p parens", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_p, L_parens)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("makeParens", 3, "makeParens start end content =\r\n  and (isCons content) (isNil (tail content))\r\n    makeParens start end (head content)\r\n    or (isToken content) (isParens content)\r\n      content\r\n      parens start end content", lazy((function(){
  var L$F = function(L_start, L_end, L_content) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_start, L_end, L_content),
  Leisure_traceReturn(L$F, (resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_content));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_content));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeParens)(L_start, L_end, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_content));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_content));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isParens)(L_content));
});
})(++Leisure_traceInstance, L$instance))(L_content)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parens)(L_start, L_end, L_content));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parensFromToks", 3, "parensFromToks left right content = \\\\\r\n  start = tokenFilepos left\r\n  end = addFilepos (tokenFilepos right) (strLen (tokenString right))\r\n  .\r\n  parens start end content", lazy((function(){
  var L$F = function(L_left, L_right, L_content) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_left, L_right, L_content),
  Leisure_traceReturn(L$F, ((function(){  var L_start, L_end;
  L_start = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_left));
});
})(++Leisure_traceInstance, L$instance);
  L_end = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addFilepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_right));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_right));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_parens)(L_start, L_end, L_content)})()))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("stripParens", 1, "stripParens p = isParens p (stripParens (parensContent p)) p", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_isParens)(L_p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_stripParens)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensContent)(L_p));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_p)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("withStripped", 2, "withStripped p cont = cont (stripParens p)", lazy((function(){
  var L$F = function(L_p, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_p, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_cont)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_stripParens)(L_p));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseErr", 2, "parseErr msg1 msg2 = err (strCat (cons msg1 (cons msg2 nil)))", lazy((function(){
  var L$F = function(L_msg1, L_msg2) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_msg1, L_msg2),
  Leisure_traceReturn(L$F, (resolve(L_err)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_msg1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_msg2, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("lineStart", 0, "lineStart  = regexp '^\\\\r?\\\\n'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^\\r?\\n"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("commentPat", 0, "commentPat = regexp '^\\\\r?\\\\n[ \\\\i]*#'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^\\r?\\n[ \\i]*#"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("emptyToken", 0, "emptyToken = regexp '^\\\\r?\\\\n[ \\\\i]*(#|$)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^\\r?\\n[ \\i]*(#|$)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("makeTokens", 3, "makeTokens lineStarts strings start = _withRecur\r\n  makeMoreTokens lineStarts strings start nil", lazy((function(){
  var L$F = function(L_lineStarts, L_strings, L_start) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lineStarts, L_strings, L_start),
  Leisure_traceReturn(L$F, (resolve(L__withRecur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeMoreTokens)(L_lineStarts, L_strings, L_start, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("makeMoreTokens", 4, "makeMoreTokens lineStarts strings start result = strings\r\n  \\h t D . _recur\r\n    makeMoreTokens lineStarts t (+ start (strLen h))\r\n      or (or (strStartsWith h ' ') (strStartsWith h '#')) (and (strMatches h emptyToken) (or (isNil t) (strMatches (head t) lineStart)))\r\n        result\r\n        cons (makeTokenAt lineStarts h start) result\r\n  _reverse result", lazy((function(){
  var L$F = function(L_lineStarts, L_strings, L_start, L_result) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lineStarts, L_strings, L_start, L_result),
  Leisure_traceReturn(L$F, (L$(resolve(L_strings))(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L__recur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeMoreTokens)(L_lineStarts, L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_start, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strStartsWith)(L_h, " "));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strStartsWith)(L_h, "#"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatches)(L_h, L_emptyToken));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_t));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatches)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_t));
});
})(++Leisure_traceInstance, L$instance), L_lineStart));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_result)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeTokenAt)(L_lineStarts, L_h, L_start));
});
})(++Leisure_traceInstance, L$instance), L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 18, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_result));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 20, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("makeTokenAt", 3, "makeTokenAt lineStarts txt offset = isNil (strMatch txt zeroNum)\r\n  token txt (filePosFor lineStarts offset)\r\n  token (strReplace txt zeroPrefix '') (filePosFor lineStarts offset)", lazy((function(){
  var L$F = function(L_lineStarts, L_txt, L_offset) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lineStarts, L_txt, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_isNil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)(L_txt, L_zeroNum));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(L_txt, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filePosFor)(L_lineStarts, L_offset));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strReplace)(L_txt, L_zeroPrefix, ""));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filePosFor)(L_lineStarts, L_offset));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("showToken", 1, "showToken tok = log (strCat (cons 'token: ' (cons (tokenString tok) (cons ', ' (cons (showPos (tokenPos tok)) nil))))) tok", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_log)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("token: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(", ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_showPos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenPos)(L_tok));
});
})(++Leisure_traceInstance, L$instance)));
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
})(++Leisure_traceInstance, L$instance), L_tok)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("showPos", 1, "showPos pos = isFilepos pos\r\n  strCat (cons 'position: ' (cons (fileposFile pos) (cons ', ' (cons (fileposLine pos) (cons '.' (cons (fileposOffset pos) nil))))))\r\n  pos", lazy((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_isFilepos)(L_pos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("position: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposFile)(L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(", ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposLine)(L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposOffset)(L_pos));
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
})(++Leisure_traceInstance, L$instance))(L_pos)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("splitTokens", 2, "splitTokens str pat = filter (\\s . not (eq s '')) (basicSplitTokens str pat true)", lazy((function(){
  var L$F = function(L_str, L_pat) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat),
  Leisure_traceReturn(L$F, (resolve(L_filter)(lazy((function(){
  var L$F = function(L_s){return (
  Leisure_traceCall(L$F, L_s),
  Leisure_traceReturn(L$F, (resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_s, ""));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_basicSplitTokens)(L_str, L_pat, L_true));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("numberPat", 0, "numberPat = regexp '-?([0-9]+(\\\\.[0-9]+)?|\\\\.[0-9]+)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("-?([0-9]+(\\.[0-9]+)?|\\.[0-9]+)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("zeroNum", 0, "zeroNum = regexp '^0+[0-9]'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^0+[0-9]"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("zeroPrefix", 0, "zeroPrefix = regexp '^0+'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^0+"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("matchOffset", 2, "matchOffset str match = isNil match\r\n  strLen str\r\n  head (tail (tail match))", lazy((function(){
  var L$F = function(L_str, L_match) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_match),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_match)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_str));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_match));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("basicSplitTokens", 3, "basicSplitTokens str pat prevIsDel = _reverse\r\n  _withRecur (_basicSplitTokens str pat prevIsDel nil)", lazy((function(){
  var L$F = function(L_str, L_pat, L_prevIsDel) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat, L_prevIsDel),
  Leisure_traceReturn(L$F, (resolve(L__reverse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__withRecur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__basicSplitTokens)(L_str, L_pat, L_prevIsDel, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_basicSplitTokens", 4, "_basicSplitTokens str pat prevIsDel toks = == str ''\r\n  toks\r\n  \\\\\r\n    num = strMatch str numberPat\r\n    del = strMatch str pat\r\n    numOffset = matchOffset str num\r\n    delOffset = matchOffset str del\r\n    select = and (== numOffset 0) prevIsDel\r\n      \\del num first . num\r\n      == delOffset 0\r\n        \\del num first . del\r\n        \\del num first . first\r\n    first = select (head del) (head num) (strSubstring str 0 delOffset)\r\n    .\r\n    _recur\r\n      _basicSplitTokens\r\n        strSubstring str (strLen first) 0\r\n        pat\r\n        select true false false\r\n        cons first toks", lazy((function(){
  var L$F = function(L_str, L_pat, L_prevIsDel, L_toks) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat, L_prevIsDel, L_toks),
  Leisure_traceReturn(L$F, (resolve(L_$p$p)(L_str, "")(L_toks)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_num, L_del, L_numOffset, L_delOffset, L_select, L_first;
  L_num = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)(L_str, L_numberPat));
});
})(++Leisure_traceInstance, L$instance);
  L_del = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)(L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance);
  L_numOffset = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_matchOffset)(L_str, L_num));
});
})(++Leisure_traceInstance, L$instance);
  L_delOffset = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_matchOffset)(L_str, L_del));
});
})(++Leisure_traceInstance, L$instance);
  L_select = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$p$p)(L_numOffset, 0));
});
})(++Leisure_traceInstance, L$instance), L_prevIsDel)(lazy((function(){
  var L$F = function(L_del_0){return (
  Leisure_traceCall(L$F, L_del_0),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_num_1){return (
  Leisure_traceCall(L$F, L_num_1),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_first){return (
  Leisure_traceCall(L$F, L_first),
  Leisure_traceReturn(L$F, (resolve(L_num_1)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$p$p)(L_delOffset, 0)(lazy((function(){
  var L$F = function(L_del_0){return (
  Leisure_traceCall(L$F, L_del_0),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_num_1){return (
  Leisure_traceCall(L$F, L_num_1),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_first){return (
  Leisure_traceCall(L$F, L_first),
  Leisure_traceReturn(L$F, (resolve(L_del_0)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))(lazy((function(){
  var L$F = function(L_del_0){return (
  Leisure_traceCall(L$F, L_del_0),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_num_1){return (
  Leisure_traceCall(L$F, L_num_1),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_first){return (
  Leisure_traceCall(L$F, L_first),
  Leisure_traceReturn(L$F, (resolve(L_first)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);
  L_first = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_select)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_del));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_num));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_str, 0, L_delOffset));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L__recur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__basicSplitTokens)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_str, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_first));
});
})(++Leisure_traceInstance, L$instance), 0));
});
})(++Leisure_traceInstance, L$instance), L_pat, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_select)(L_true)(L_false)(L_false));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_first, L_toks));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 27, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("tokens", 2, "tokens str pat = countedTokens emptyLineStarts str pat", lazy((function(){
  var L$F = function(L_str, L_pat) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat),
  Leisure_traceReturn(L$F, (resolve(L_countedTokens)(L_emptyLineStarts, L_str, L_pat)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedTokens", 3, "countedTokens lineStarts str pat = makeTokens lineStarts (splitTokens str pat) 0", lazy((function(){
  var L$F = function(L_lineStarts, L_str, L_pat) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lineStarts, L_str, L_pat),
  Leisure_traceReturn(L$F, (resolve(L_makeTokens)(L_lineStarts, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_splitTokens)(L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance), 0)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isTokenString", 2, "isTokenString tok str = or\r\n  and (isToken tok) (eq (tokenString tok) str)\r\n  and (isString tok) (eq tok str)", lazy((function(){
  var L$F = function(L_tok, L_str) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_tok, L_str),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), L_str));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_tok, L_str));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isTokenStart", 2, "isTokenStart tok str = or\r\n  and (isToken tok) (strStartsWith (tokenString tok) str)\r\n  and (isString tok) (strStartsWith tok str)", lazy((function(){
  var L$F = function(L_tok, L_str) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_tok, L_str),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strStartsWith)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), L_str));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strStartsWith)(L_tok, L_str));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strTokenString", 1, "strTokenString tok = withToken tok nil \\str pos . str", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_withToken)(L_tok, L_nil, lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_str)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("withToken", 3, "withToken tok nonTokCase tokCase = isToken tok\r\n  tokCase (tokenString tok) (tokenPos tok)\r\n  isString tok\r\n    tokCase tok emptyFilePos\r\n    nonTokCase", lazy((function(){
  var L$F = function(L_tok, L_nonTokCase, L_tokCase) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_tok, L_nonTokCase, L_tokCase),
  Leisure_traceReturn(L$F, (resolve(L_isToken)(L_tok)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_tokCase))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenPos)(L_tok));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isString)(L_tok)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_tokCase))(L_tok, L_emptyFilePos));
});
})(++Leisure_traceInstance, L$instance))(L_nonTokCase));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseToks", 2, "parseToks toks groups =\r\n  isNil toks nil\r\n    ifNotErr (parseTok toks groups) \\list . list \\h t .\r\n      ifNotErr (parseToks t groups) \\res .\r\n        cons h\r\n          and (isCons res) (isBlockStart (head res))\r\n            cons res nil\r\n            res", lazy((function(){
  var L$F = function(L_toks, L_groups) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_toks, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_toks)(L_nil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseTok)(L_toks, L_groups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseToks)(L_t, L_groups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_res){return (
  Leisure_traceCall(L$F, L_res),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_res));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isBlockStart)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_res));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_res, L_nil));
});
})(++Leisure_traceInstance, L$instance))(L_res));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseTok", 2, "parseTok toks groups = withCons toks nil \\h t .\r\n  withToken h toks \\txt pos .\r\n    assoc txt groups\r\n      \\close . parseGroup h t nil close groups\r\n      (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (parseIndent h t nil groups)\r\n        toks", lazy((function(){
  var L$F = function(L_toks, L_groups) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_toks, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_toks, L_nil, lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_withToken)(L_h, L_toks, lazy((function(){
  var L$F = function(L_txt){return (
  Leisure_traceCall(L$F, L_txt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_assoc)(L_txt, L_groups)(lazy((function(){
  var L$F = function(L_close){return (
  Leisure_traceCall(L$F, L_close),
  Leisure_traceReturn(L$F, (resolve(L_parseGroup)(L_h, L_t, L_nil, L_close, L_groups)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenStart)(L_h, "\n"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenStart)(L_h, "\r\n"));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseIndent)(L_h, L_t, L_nil, L_groups));
});
})(++Leisure_traceInstance, L$instance))(L_toks));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseGroup", 5, "parseGroup left toks gr close groups = withCons toks (parseErr 'Unterminated group starting ' (loc left))\r\n  \\h t . isTokenString h close\r\n    eq close ')'\r\n      cons (parensFromToks left h (_reverse gr)) t\r\n      cons (cons left (cons (_reverse gr) (cons h nil))) t\r\n    withToken h\r\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT .\r\n        parseGroup left restT (cons restH gr) close groups\r\n      \\txt pos .\r\n        rassoc txt groups\r\n          \\open . parseErr (strCat (cons 'Mismatched group: ' (cons (tokenString left) (cons txt (cons ' ' nil))))) (loc left)\r\n          ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseGroup left restT (cons restH gr) close groups", lazy((function(){
  var L$F = function(L_left, L_toks, L_gr, L_close, L_groups) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_left, L_toks, L_gr, L_close, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Unterminated group starting ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_left));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_h, L_close)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_close, ")")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensFromToks)(L_left, L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_gr));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_left, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_gr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 34, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_withToken)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseTok)(L_toks, L_groups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_restH){return (
  Leisure_traceCall(L$F, L_restH),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_restT){return (
  Leisure_traceCall(L$F, L_restT),
  Leisure_traceReturn(L$F, (resolve(L_parseGroup)(L_left, L_restT, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_restH, L_gr));
});
})(++Leisure_traceInstance, L$instance), L_close, L_groups)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_txt){return (
  Leisure_traceCall(L$F, L_txt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_rassoc)(L_txt, L_groups)(lazy((function(){
  var L$F = function(L_open){return (
  Leisure_traceCall(L$F, L_open),
  Leisure_traceReturn(L$F, (resolve(L_parseErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("Mismatched group: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_left));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_txt, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(" ", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_left));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 25, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseTok)(L_toks, L_groups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_restH){return (
  Leisure_traceCall(L$F, L_restH),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_restT){return (
  Leisure_traceCall(L$F, L_restT),
  Leisure_traceReturn(L$F, (resolve(L_parseGroup)(L_left, L_restT, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_restH, L_gr));
});
})(++Leisure_traceInstance, L$instance), L_close, L_groups)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 28, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 29, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 30, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 32, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 33, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 35, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 36, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 5;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 37, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseIndent", 4, "parseIndent indent toks gr groups =\r\n  withCons toks (cons (makeParens (tokenFilepos indent) (lexEnd (head gr)) (_reverse gr)) nil)\r\n    \\h t . or (withToken h false (\\txt pos . rassoc txt groups (\\open . true) false))\r\n      and (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (<= (strLen (tokenString h)) (strLen (tokenString indent)))\r\n      cons (makeParens (tokenFilepos indent) (tokenFilepos h) (_reverse gr)) toks\r\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseIndent indent restT (cons restH gr) groups", lazy((function(){
  var L$F = function(L_indent, L_toks, L_gr, L_groups) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_indent, L_toks, L_gr, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeParens)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_indent));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_lexEnd)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_gr));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_gr));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_withToken)(L_h, L_false, lazy((function(){
  var L$F = function(L_txt){return (
  Leisure_traceCall(L$F, L_txt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_rassoc)(L_txt, L_groups)(lazy((function(){
  var L$F = function(L_open){return (
  Leisure_traceCall(L$F, L_open),
  Leisure_traceReturn(L$F, (resolve(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))(L_false)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenStart)(L_h, "\n"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenStart)(L_h, "\r\n"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$y$p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_indent));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeParens)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_indent));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_h));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_gr));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_toks));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseTok)(L_toks, L_groups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_restH){return (
  Leisure_traceCall(L$F, L_restH),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_restT){return (
  Leisure_traceCall(L$F, L_restT),
  Leisure_traceReturn(L$F, (resolve(L_parseIndent)(L_indent, L_restT, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_restH, L_gr));
});
})(++Leisure_traceInstance, L$instance), L_groups)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 27, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 28, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 29, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 31, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 32, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 33, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("nilRange", L_true, "nilRange = cons 1 (cons 0 nil)", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(0, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("lit", 2, "lit value range = \\f . f value range", lazy(setDataType((function(){
  var L$F = function(L_value, L_range) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_value, L_range),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_value)(L_range)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'lit')))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'lit')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("ref", 2, "ref name range = \\f . f name range", lazy(setDataType((function(){
  var L$F = function(L_name, L_range) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_range),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_name)(L_range)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'ref')))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'ref')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("lambda", 3, "lambda name body range = \\f . f name body range", lazy(setDataType((function(){
  var L$F = function(L_name, L_body, L_range) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_body, L_range),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_name)(L_body)(L_range)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'lambda')))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'lambda')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("apply", 2, "apply func arg = \\f . f func arg", lazy(setDataType((function(){
  var L$F = function(L_func, L_arg) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_arg),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_func)(L_arg)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'apply')))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'apply')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("let", 4, "let name value body range = \\f . f name value body range", lazy(setDataType((function(){
  var L$F = function(L_name, L_value, L_body, L_range) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_value, L_body, L_range),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_name)(L_value)(L_body)(L_range)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'let')))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'let')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("anno", 3, "anno name data body = \\f . f name data body", lazy(setDataType((function(){
  var L$F = function(L_name, L_data, L_body) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_data, L_body),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_name)(L_data)(L_body)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'anno')))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'anno')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("withParens", 3, "withParens p err cont = isParens p (p cont) err", lazy((function(){
  var L$F = function(L_p, L_err, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_p, L_err, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_isParens)(L_p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_p)(L_cont));
});
})(++Leisure_traceInstance, L$instance))(L_err)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("setParens", 2, "setParens p func = isParens p\r\n  p \\start end content . parens start end (func content)\r\n  func p", lazy((function(){
  var L$F = function(L_p, L_func) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_p, L_func),
  Leisure_traceReturn(L$F, (resolve(L_isParens)(L_p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_p)(lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_content){return (
  Leisure_traceCall(L$F, L_content),
  Leisure_traceReturn(L$F, (resolve(L_parens)(L_start, L_end, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)(L_content));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)(L_p));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("position", 1, "position thing = isToken thing (tokenFilepos thing)\r\n  isParens thing (parensStart thing)\r\n    isCons thing\r\n      \\\\\r\n        pos = position (head thing)\r\n        .\r\n        isEmptyPos pos (position (tail thing)) pos\r\n      isFilepos thing thing\r\n        emptyFilePos", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, (resolve(L_isToken)(L_thing)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_thing));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isParens)(L_thing)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensStart)(L_thing));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_thing)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_pos;
  L_pos = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_thing));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isEmptyPos)(L_pos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_thing));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_pos)})());
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isFilepos)(L_thing)(L_thing)(L_emptyFilePos));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("lexEnd", 1, "lexEnd thing = isToken thing (addFilepos (tokenFilepos thing) (strLen (tokenString thing)))\r\n  isParens thing (parensEnd thing)\r\n    isCons thing (lexEnd (last thing))\r\n      emptyFilePos", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, (resolve(L_isToken)(L_thing)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addFilepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_thing));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_thing));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isParens)(L_thing)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensEnd)(L_thing));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_thing)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_lexEnd)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_last)(L_thing));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_emptyFilePos));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("loc", 1, "loc thing = \\\\\r\n  p = position thing\r\n  l = isEmptyPos p 'an unknown location' (showPos p)\r\n  .\r\n  strCat (cons 'at ' (cons l nil))", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, ((function(){  var L_p, L_l;
  L_p = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_thing));
});
})(++Leisure_traceInstance, L$instance);
  L_l = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isEmptyPos)(L_p)("an unknown location")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_showPos)(L_p));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("at ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_l, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("scrub", 1, "scrub str = strFromList (scrubList (strToList str))", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_strFromList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_scrubList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strToList)(L_str));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("scrubList", 1, "scrubList list = list\r\n  \\h t D . \\\\\r\n    next = scrubList t\r\n    .\r\n    eq h '\\\\' (cons h (cons (head t) (scrubList (tail t))))\r\n      eq h '\\\"' (cons '\\\\' (cons '\\\"' next))\r\n        cons h next\r\n  nil", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, ((function(){  var L_next;
  L_next = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_scrubList)(L_t));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_eq)(L_h, "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_t));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_scrubList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_h, "\"")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\"", L_next));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, L_next));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("createAst", 3, "createAst lineStarts inList names = withStripped inList \\list .\r\n  isToken list (createLitOrRef list names)\r\n    list\r\n      \\h t D .\r\n        isTokenString h '\\\\\\\\' (createLet h t names)\r\n          isTokenString h '\\\\@' (createAnno h t names)\r\n            isTokenString h '\\\\' (createLambda h t names)\r\n              createApply list names\r\n      nil", lazy((function(){
  var L$F = function(L_lineStarts, L_inList, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lineStarts, L_inList, L_names),
  Leisure_traceReturn(L$F, (resolve(L_withStripped)(L_inList, lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_isToken)(L_list)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createLitOrRef)(L_list, L_names));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_h, "\\\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createLet)(L_h, L_t, L_names));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_h, "\\@")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAnno)(L_h, L_t, L_names));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_h, "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createLambda)(L_h, L_t, L_names));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createApply)(L_list, L_names));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))(L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("strMatches", 2, "strMatches str pat = isCons (strMatch str pat)", lazy((function(){
  var L$F = function(L_str, L_pat) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat),
  Leisure_traceReturn(L$F, (resolve(L_isCons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)(L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("digit", L_true, "digit = regexp '^[0-9]+$'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^[0-9]+$"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("backslashCodes", L_true, "backslashCodes = 'bfnrt'", "bfnrt");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("backslashValues", L_true, "backslashValues = '\\b\\f\\n\\r\\t'", "\b\f\n\r\t");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("convertStringEscape", 3, "convertStringEscape char codes values =\r\n  eq codes ''\r\n    char\r\n    eq char (strAt codes 0)\r\n      strAt values 0\r\n      convertStringEscape char (strSubstring codes 1 0) (strSubstring values 1 0)", lazy((function(){
  var L$F = function(L_char, L_codes, L_values) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_char, L_codes, L_values),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_codes, "")(L_char)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_char, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_codes, 0));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_values, 0));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_convertStringEscape)(L_char, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_codes, 1, 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_values, 1, 0));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("convertStringEscapes", 3, "convertStringEscapes orig str cont = \\\\\r\n  res = _convertStringEscapes orig str\r\n  .\r\n  hasType res err\r\n    res\r\n    cont res", lazy((function(){
  var L$F = function(L_orig, L_str, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_orig, L_str, L_cont),
  Leisure_traceReturn(L$F, ((function(){  var L_res;
  L_res = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__convertStringEscapes)(L_orig, L_str));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_hasType)(L_res, L_err)(L_res)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)(L_res));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_convertStringEscapes", 2, "_convertStringEscapes orig str =\r\n  eq str '' str\r\n    eq (strAt str 0) '\\\\'\r\n      eq (strLen str) 1 (parseErr \"Error, backslash without character in string: \" orig)\r\n        \\\\\r\n          rest = _convertStringEscapes orig (strSubstring str 2 0)\r\n          .\r\n          hasType rest err\r\n            rest\r\n            strAdd\r\n              convertStringEscape (strAt str 1) backslashCodes backslashValues\r\n              rest\r\n      \\\\\r\n        rest = _convertStringEscapes orig (strSubstring str 1 0)\r\n        .\r\n        hasType rest err\r\n          rest\r\n          strAdd\r\n            strAt str 0\r\n            rest", lazy((function(){
  var L$F = function(L_orig, L_str) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_orig, L_str),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_str, "")(L_str)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_str, 0));
});
})(++Leisure_traceInstance, L$instance), "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_str));
});
})(++Leisure_traceInstance, L$instance), 1)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Error, backslash without character in string: ", L_orig));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_rest;
  L_rest = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__convertStringEscapes)(L_orig, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_str, 2, 0));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_hasType)(L_rest, L_err)(L_rest)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAdd)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_convertStringEscape)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_str, 1));
});
})(++Leisure_traceInstance, L$instance), L_backslashCodes, L_backslashValues));
});
})(++Leisure_traceInstance, L$instance), L_rest));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_rest;
  L_rest = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__convertStringEscapes)(L_orig, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_str, 1, 0));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_hasType)(L_rest, L_err)(L_rest)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAdd)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_str, 0));
});
})(++Leisure_traceInstance, L$instance), L_rest));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseString", 2, "parseString str cont =\r\n  neq (strAt str 0) (strAt str -1) (parseErr \"Badly terminated string: \" str)\r\n    convertStringEscapes str (strSubstring str 1 -1) cont", lazy((function(){
  var L$F = function(L_str, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_neq)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_str, 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_str, -1));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Badly terminated string: ", L_str));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_convertStringEscapes)(L_str, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_str, 1, -1));
});
})(++Leisure_traceInstance, L$instance), L_cont));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("createLitOrRef", 2, "createLitOrRef token names = \\\\\r\n  tok = tokenString token\r\n  tokRange = (fileposList (position token))\r\n  .\r\n  _contains names tok\r\n    ref tok tokRange\r\n    or (strStartsWith tok '\\\"') (strStartsWith tok \"'\")\r\n      parseString tok \\str . lit str tokRange\r\n      strStartsWith tok '.'\r\n        jsonParse (strCat (cons '0' (cons tok nil))) (\\err . ref tok tokRange) (\\item . lit item tokRange)\r\n        or (and (>= (strAt tok 0) '0') (<= (strAt tok 0) '9')) (strStartsWith tok '-')\r\n          jsonParse tok (\\err . ref tok tokRange) (\\item . lit item tokRange)\r\n          ref tok tokRange", lazy((function(){
  var L$F = function(L_token, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_token, L_names),
  Leisure_traceReturn(L$F, ((function(){  var L_tok, L_tokRange;
  L_tok = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_token));
});
})(++Leisure_traceInstance, L$instance);
  L_tokRange = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_token));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L__contains)(L_names, L_tok)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ref)(L_tok, L_tokRange));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strStartsWith)(L_tok, "\""));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strStartsWith)(L_tok, "'"));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseString)(L_tok, lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_lit)(L_str, L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strStartsWith)(L_tok, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_jsonParse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("0", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_tok, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_ref)(L_tok, L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()), lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (resolve(L_lit)(L_item, L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$z$p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_tok, 0));
});
})(++Leisure_traceInstance, L$instance), "0"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$y$p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strAt)(L_tok, 0));
});
})(++Leisure_traceInstance, L$instance), "9"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strStartsWith)(L_tok, "-"));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_jsonParse)(L_tok, lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_ref)(L_tok, L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 21, L$F.L$instanceId);
  return L$F;
})()), lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (resolve(L_lit)(L_item, L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 22, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ref)(L_tok, L_tokRange));
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
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 28, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("createLambda", 3, "createLambda start list names = \\\\\r\n  err = parseErr \"Lambda needs a variable name, a dot, and a body \" (loc start)\r\n  .\r\n  withCons list err \\name rest .\r\n    withToken name err \\n p .\r\n      withCons rest err \\dot body .\r\n        # are these partial applications too hard to read?\r\n        isTokenString dot '.'\r\n          ifNotErr (createAst nil body (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))\r\n          ifNotErr (createLambda start rest (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))", lazy((function(){
  var L$F = function(L_start, L_list, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_start, L_list, L_names),
  Leisure_traceReturn(L$F, ((function(){  var L_err;
  L_err = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Lambda needs a variable name, a dot, and a body ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_withCons)(L_list, L_err, lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (resolve(L_withToken)(L_name, L_err, lazy((function(){
  var L$F = function(L_n){return (
  Leisure_traceCall(L$F, L_n),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_rest, L_err, lazy((function(){
  var L$F = function(L_dot){return (
  Leisure_traceCall(L$F, L_dot),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_dot, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_body, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_n, L_names));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyAst){return (
  Leisure_traceCall(L$F, L_bodyAst),
  Leisure_traceReturn(L$F, (resolve(L_lambda)(L_n, L_bodyAst, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_name));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createLambda)(L_start, L_rest, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_n, L_names));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyAst){return (
  Leisure_traceCall(L$F, L_bodyAst),
  Leisure_traceReturn(L$F, (resolve(L_lambda)(L_n, L_bodyAst, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_name));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 18, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 19, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 20, L$F.L$instanceId);
  return L$F;
})()))})()))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 21, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("createAnno", 3, "createAnno start list names =\r\n  withCons list (parseErr \"No annotation name or data in annotation \" (loc start)) \\name rest .\r\n    withCons rest (parseErr \"No data for annotation \" (loc start)) \\data rest . \\\\\r\n      finish data body = ifNotErr (createAst nil body names) \\bodyAst .\r\n        cleanTokens start name \\name .\r\n          cleanTokens start data \\data .\r\n            anno name data bodyAst\r\n      .\r\n      isTokenString data '.'\r\n        finish nil rest\r\n        withStripped data \\data .\r\n          withCons rest (parseErr \"No body for annotation \" (loc start)) \\dot body .\r\n            isTokenString dot '.'\r\n              finish data body\r\n              parseErr \"Annotation expects dot after name and data \" (loc start)", lazy((function(){
  var L$F = function(L_start, L_list, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_start, L_list, L_names),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No annotation name or data in annotation ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_rest, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No data for annotation ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_data){return (
  Leisure_traceCall(L$F, L_data),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest_0){return (
  Leisure_traceCall(L$F, L_rest_0),
  Leisure_traceReturn(L$F, ((function(){  var L_finish;
  L_finish = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_data_1){return (
  Leisure_traceCall(L$F, L_data_1),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_body, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyAst){return (
  Leisure_traceCall(L$F, L_bodyAst),
  Leisure_traceReturn(L$F, (resolve(L_cleanTokens)(L_start, L_name, lazy((function(){
  var L$F = function(L_name_2){return (
  Leisure_traceCall(L$F, L_name_2),
  Leisure_traceReturn(L$F, (resolve(L_cleanTokens)(L_start, L_data_1, lazy((function(){
  var L$F = function(L_data_3){return (
  Leisure_traceCall(L$F, L_data_3),
  Leisure_traceReturn(L$F, (resolve(L_anno)(L_name_2, L_data_3, L_bodyAst)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})());
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isTokenString)(L_data, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_finish)(L_nil)(L_rest_0));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_withStripped)(L_data, lazy((function(){
  var L$F = function(L_data_1){return (
  Leisure_traceCall(L$F, L_data_1),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_rest_0, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No body for annotation ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_dot){return (
  Leisure_traceCall(L$F, L_dot),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_dot, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_finish)(L_data_1)(L_body));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Annotation expects dot after name and data ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 18, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 19, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 20, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 22, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 23, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 24, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 25, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 26, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("bodyStructPat", L_true, "bodyStructPat = regexp '\\\\|\\\\\\\\|\\\\@'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("\\|\\\\|\\@"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("createApply", 2, "createApply inList names = withStripped inList \\list .\r\n  withCons list (parseErr \"Funcion apply expecting a non-empty list \" (loc inList)) \\h t .\r\n    ifNotErr (createAst nil h names) \\func . chainApply func t names", lazy((function(){
  var L$F = function(L_inList, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_inList, L_names),
  Leisure_traceReturn(L$F, (resolve(L_withStripped)(L_inList, lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Funcion apply expecting a non-empty list ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_inList));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_h, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, (resolve(L_chainApply)(L_func, L_t, L_names)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("blockStarts", L_true, "blockStarts = cons '\\\\' (cons '\\\\\\\\' (cons '\\\\@' nil))", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\@", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("chainApply", 3, "chainApply func list names = withCons list func \\argItem rest .\r\n  and (isToken argItem) (_contains blockStarts (tokenString argItem))\r\n    ifNotErr (createAst nil list names) \\arg . apply func arg\r\n    ifNotErr (createAst nil argItem names) \\arg . chainApply (apply func arg) rest names", lazy((function(){
  var L$F = function(L_func, L_list, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_list, L_names),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_list, L_func, lazy((function(){
  var L$F = function(L_argItem){return (
  Leisure_traceCall(L$F, L_argItem),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_argItem));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__contains)(L_blockStarts, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_argItem));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_list, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_arg){return (
  Leisure_traceCall(L$F, L_arg),
  Leisure_traceReturn(L$F, (resolve(L_apply)(L_func, L_arg)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_argItem, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_arg){return (
  Leisure_traceCall(L$F, L_arg),
  Leisure_traceReturn(L$F, (resolve(L_chainApply)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_apply)(L_func, L_arg));
});
})(++Leisure_traceInstance, L$instance), L_rest, L_names)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("cleanTokens", 3, "cleanTokens start toks cont = isToken toks\r\n  cont (tokenString toks)\r\n  withCons toks (cont toks) \\head tail .\r\n    cleanTokens start head \\head .\r\n      cleanTokens start tail \\tail .\r\n        cont (cons head tail)", lazy((function(){
  var L$F = function(L_start, L_toks, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_start, L_toks, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_isToken)(L_toks)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_toks));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_withCons)(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)(L_toks));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_head){return (
  Leisure_traceCall(L$F, L_head),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_tail){return (
  Leisure_traceCall(L$F, L_tail),
  Leisure_traceReturn(L$F, (resolve(L_cleanTokens)(L_start, L_head, lazy((function(){
  var L$F = function(L_head_0){return (
  Leisure_traceCall(L$F, L_head_0),
  Leisure_traceReturn(L$F, (resolve(L_cleanTokens)(L_start, L_tail, lazy((function(){
  var L$F = function(L_tail_1){return (
  Leisure_traceCall(L$F, L_tail_1),
  Leisure_traceReturn(L$F, (resolve(L_cont)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head_0, L_tail_1));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("createLet", 3, "createLet start list names = withCons list\r\n  parseErr \"No variable or body for let \" (loc start)\r\n  \\binding body . eq body nil (createAst nil binding names)\r\n    ifNotErr (getLetNames start list names) \\newNames .\r\n      createSublets start binding body newNames", lazy((function(){
  var L$F = function(L_start, L_list, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_start, L_list, L_names),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No variable or body for let ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_binding){return (
  Leisure_traceCall(L$F, L_binding),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_body, L_nil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_binding, L_names));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getLetNames)(L_start, L_list, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_newNames){return (
  Leisure_traceCall(L$F, L_newNames),
  Leisure_traceReturn(L$F, (resolve(L_createSublets)(L_start, L_binding, L_body, L_newNames)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("getLetNames", 3, "getLetNames start list names = \\\\\r\n  err = parseErr \"Let expected binding \" (loc start)\r\n  .\r\n  withCons list names \\binding body .\r\n    isTokenString binding '.' names\r\n      withParens binding err \\start end def .\r\n        withCons def err \\name rest .\r\n          withToken name err \\str pos .\r\n            getLetNames start body (cons str names)", lazy((function(){
  var L$F = function(L_start, L_list, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_start, L_list, L_names),
  Leisure_traceReturn(L$F, ((function(){  var L_err;
  L_err = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected binding ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_withCons)(L_list, L_names, lazy((function(){
  var L$F = function(L_binding){return (
  Leisure_traceCall(L$F, L_binding),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_binding, ".")(L_names)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_withParens)(L_binding, L_err, lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_def, L_err, lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (resolve(L_withToken)(L_name, L_err, lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_getLetNames)(L_start, L_body, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_str, L_names));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()))})()))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("createSublets", 4, "createSublets start binding body names =\r\n  isTokenString binding '.' (createAst nil body names)\r\n    withCons body (parseErr \"Let expected a body \" (loc start)) \\bodyH bodyT .\r\n      ifNotErr (getNameAndDef (parensStart binding) (parensContent binding) names) \\res . res \\name def .\r\n        ifNotErr (createSublets start bodyH bodyT names) \\bodyAst .\r\n          let (tokenString name) def bodyAst nilRange", lazy((function(){
  var L$F = function(L_start, L_binding, L_body, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_start, L_binding, L_body, L_names),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_binding, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_body, L_names));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_withCons)(L_body, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected a body ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyH){return (
  Leisure_traceCall(L$F, L_bodyH),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_bodyT){return (
  Leisure_traceCall(L$F, L_bodyT),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getNameAndDef)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensStart)(L_binding));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensContent)(L_binding));
});
})(++Leisure_traceInstance, L$instance), L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_res){return (
  Leisure_traceCall(L$F, L_res),
  Leisure_traceReturn(L$F, (resolve(L_res)(lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createSublets)(L_start, L_bodyH, L_bodyT, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyAst){return (
  Leisure_traceCall(L$F, L_bodyAst),
  Leisure_traceReturn(L$F, (resolve(L_let)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance), L_def, L_bodyAst, L_nilRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("getNameAndDef", 3, "getNameAndDef pos binding names =\r\n  withCons (tail binding) (parseErr \"Let expected binding at \" pos) \\snd sndT .\r\n    isTokenString snd '=' (ifNotErr (createAst nil sndT names) \\def . cons (head binding) def)\r\n      ifNotErr (getLetLambda pos (tail binding) nil names) \\lamb . cons (head binding) lamb", lazy((function(){
  var L$F = function(L_pos, L_binding, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_pos, L_binding, L_names),
  Leisure_traceReturn(L$F, (resolve(L_withCons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_binding));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected binding at ", L_pos));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_snd){return (
  Leisure_traceCall(L$F, L_snd),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_sndT){return (
  Leisure_traceCall(L$F, L_sndT),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_snd, "=")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_sndT, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, (resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_binding));
});
})(++Leisure_traceInstance, L$instance), L_def)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getLetLambda)(L_pos, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_binding));
});
})(++Leisure_traceInstance, L$instance), L_nil, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_lamb){return (
  Leisure_traceCall(L$F, L_lamb),
  Leisure_traceReturn(L$F, (resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_binding));
});
})(++Leisure_traceInstance, L$instance), L_lamb)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("getLetLambda", 4, "getLetLambda pos def args names =\r\n  withCons def (parseErr \"Let expected binding at \" pos) \\arg rest .\r\n    not (isToken arg) (parseErr \"Let expected binding at \" pos)\r\n      isTokenString arg '='\r\n        createAst nil (cons (token '\\\\' pos) (_append (_reverse args) (cons (token '.' (position arg)) rest))) names\r\n        getLetLambda pos rest (cons arg args) names", lazy((function(){
  var L$F = function(L_pos, L_def, L_args, L_names) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_pos, L_def, L_args, L_names),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_def, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected binding at ", L_pos));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_arg){return (
  Leisure_traceCall(L$F, L_arg),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_arg));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected binding at ", L_pos));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_arg, "=")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)("\\", L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__append)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_args));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_arg));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_rest));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_names));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getLetLambda)(L_pos, L_rest, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_arg, L_args));
});
})(++Leisure_traceInstance, L$instance), L_names));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedScanLineG", 7, "countedScanLineG lineStarts str pat groups props onDef onExpr = \\\\\r\n  toks = countedTokens lineStarts str pat\r\n  groupToks = _foldr (\\el value . el \\h t . cons h (cons t value)) (cons '=' blockStarts) groups\r\n  .\r\n  # check if it's a definition\r\n  find (\\tok . or (_contains groupToks (tokenString tok)) (isCons (strMatch (tokenString tok) '^\\r?\\n'))) toks (\\item . isTokenString item '=') false\r\n    toks \\name rest . \\\\\r\n      parseIt func = \\\\\r\n        parsed = parseToks (checkSetDataType func rest name) groups\r\n        .\r\n        onDef (ifNotErr parsed \\list . createDef list name (arity rest 0) str props)\r\n      .\r\n      isTokenString (head rest) '='\r\n        isTokenString (head (tail rest)) '\\\\'\r\n          parseIt (setTypeAnno (tail rest) (tokenString name))\r\n          parseIt (tail rest)\r\n        ifNotErr (transformDef name rest) \\def .\r\n          parseIt (cons (token '\\\\' (addFilepos (position (head rest)) -1)) def)\r\n    ifNotErr (parseToks toks groups) \\list . onExpr list", lazy((function(){
  var L$F = function(L_lineStarts, L_str, L_pat, L_groups, L_props, L_onDef, L_onExpr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lineStarts, L_str, L_pat, L_groups, L_props, L_onDef, L_onExpr),
  Leisure_traceReturn(L$F, ((function(){  var L_toks, L_groupToks;
  L_toks = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedTokens)(L_lineStarts, L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance);
  L_groupToks = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__foldr)(lazy((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, (resolve(L_el)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_t, L_value));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("=", L_blockStarts));
});
})(++Leisure_traceInstance, L$instance), L_groups));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_find)(lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__contains)(L_groupToks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), "^\r?\n"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()))(L_toks)(lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_item, "=")))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()))(L_false)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 43, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_toks)(lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, ((function(){  var L_parseIt;
  L_parseIt = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){  var L_parsed;
  L_parsed = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseToks)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_checkSetDataType)(L_func, L_rest, L_name));
});
})(++Leisure_traceInstance, L$instance), L_groups));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_onDef)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)(L_parsed, lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_createDef)(L_list, L_name, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_arity)(L_rest, 0));
});
})(++Leisure_traceInstance, L$instance), L_str, L_props)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 19, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 21, L$F.L$instanceId);
  return L$F;
})());
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isTokenString)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_rest));
});
})(++Leisure_traceInstance, L$instance), "=")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 32, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_rest));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 29, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseIt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 28, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setTypeAnno)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_rest));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseIt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_rest));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 40, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 33, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_transformDef)(L_name, L_rest));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, (resolve(L_parseIt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 38, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 37, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)("\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 36, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addFilepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 35, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 34, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_rest));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), -1));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_def));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 39, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 41, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 42, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 46, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 44, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseToks)(L_toks, L_groups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_onExpr)(L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 45, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 7;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 47, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("scanLineG", 5, "scanLineG str pat groups onDef onExpr = countedScanLineG emptyLineStarts str pat groups nil onDef onExpr", lazy((function(){
  var L$F = function(L_str, L_pat, L_groups, L_onDef, L_onExpr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat, L_groups, L_onDef, L_onExpr),
  Leisure_traceReturn(L$F, (resolve(L_countedScanLineG)(L_emptyLineStarts, L_str, L_pat, L_groups, L_nil, L_onDef, L_onExpr)))
);
};;
  L$F.leisureLength = 5;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseLineG", 6, "parseLineG str pat names groups onDef onExpr = \\\\\r\n  astCallback cb = \\list . ifNotErr (createAst nil list names) \\ast . cb ast\r\n  .\r\n  scanLineG str pat groups (astCallback onDef) (astCallback onExpr)", lazy((function(){
  var L$F = function(L_str, L_pat, L_names, L_groups, L_onDef, L_onExpr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat, L_names, L_groups, L_onDef, L_onExpr),
  Leisure_traceReturn(L$F, ((function(){  var L_astCallback;
  L_astCallback = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_cb){return (
  Leisure_traceCall(L$F, L_cb),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)(L_nil, L_list, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
  Leisure_traceReturn(L$F, (resolve(L_cb)(L_ast)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})());
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_scanLineG)(L_str, L_pat, L_groups, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_astCallback)(L_onDef));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_astCallback)(L_onExpr));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 6;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("transformDef", 2, "transformDef name toks = withCons toks (parseErr \"Bad definition, expecting tokens\" (loc name)) \\h t .\r\n  isTokenString h '='\r\n    isTokenString (head t) '\\\\'\r\n      cons (token '.' (position h)) (setTypeAnno t (tokenString name))\r\n      cons (token '.' (position h)) t\r\n    ifNotErr (transformDef name t) \\list . cons h list", lazy((function(){
  var L$F = function(L_name, L_toks) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_toks),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Bad definition, expecting tokens", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_name));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_h, "=")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_t));
});
})(++Leisure_traceInstance, L$instance), "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setTypeAnno)(L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_transformDef)(L_name, L_t));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_h, L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 18, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("setTypeAnno", 2, "setTypeAnno toks name = \\\\\r\n  tok = \\str . token str (position toks)\r\n  .\r\n  cons (tok '\\\\@') (cons (tok 'type') (cons (tok name) (cons (tok '.') toks)))", lazy((function(){
  var L$F = function(L_toks, L_name) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_toks, L_name),
  Leisure_traceReturn(L$F, ((function(){  var L_tok;
  L_tok = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_token)(L_str, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_toks));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})());
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("\\@"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("type"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)(L_name));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("."));
});
})(++Leisure_traceInstance, L$instance), L_toks));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("setDataTypeAnno", 2, "setDataTypeAnno toks name = \\\\\r\n  tok = \\str . token str (position toks)\r\n  .\r\n  cons (tok '\\\\@') (cons (tok 'dataType') (cons (tok (tokenString name)) (cons (tok '.') toks)))", lazy((function(){
  var L$F = function(L_toks, L_name) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_toks, L_name),
  Leisure_traceReturn(L$F, ((function(){  var L_tok;
  L_tok = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_token)(L_str, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_toks));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})());
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("\\@"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("dataType"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("."));
});
})(++Leisure_traceInstance, L$instance), L_toks));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("createDef", 5, "createDef def name arity src props = \\\\\r\n  #tok str = token str (position def)\r\n  tok str = token str (position name)\r\n  .\r\n  jsonStringify (tokenString name) (\\err . parseErr (strCat (cons \"Bad function name \" (cons (loc name) nil))) err) \\nameStr .\r\n    jsonStringify src (\\err . parseErr (strCat (cons \"Bad source \" (cons (loc name) nil))) err) \\srcStr .\r\n      cons '\\\\@' (cons 'leisureName' (cons (tokenString name) (cons '.' (cons (tok 'newDefine') (cons (tok nameStr) (cons (tok (strString arity)) (cons (tok srcStr) (cons '\\\\@' (cons 'arity' (cons arity (cons '.' (cons (spliceFuncProps arity props def) nil))))))))))))", lazy((function(){
  var L$F = function(L_def, L_name, L_arity, L_src, L_props) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_def, L_name, L_arity, L_src, L_props),
  Leisure_traceReturn(L$F, ((function(){  var L_tok;
  L_tok = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_token)(L_str, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_name));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})());
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_jsonStringify)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_parseErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("Bad function name ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_name));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_err)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()), lazy((function(){
  var L$F = function(L_nameStr){return (
  Leisure_traceCall(L$F, L_nameStr),
  Leisure_traceReturn(L$F, (resolve(L_jsonStringify)(L_src, lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_parseErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("Bad source ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_name));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_err)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()), lazy((function(){
  var L$F = function(L_srcStr){return (
  Leisure_traceCall(L$F, L_srcStr),
  Leisure_traceReturn(L$F, (resolve(L_cons)("\\@", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 33, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("leisureName", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 32, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("newDefine"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 29, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)(L_nameStr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 28, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strString)(L_arity));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)(L_srcStr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\@", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("arity", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_arity, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_spliceFuncProps)(L_arity, L_props, L_def));
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
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 34, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 35, L$F.L$instanceId);
  return L$F;
})()))})()))
);
};;
  L$F.leisureLength = 5;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 36, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("spliceFuncProps", 3, "spliceFuncProps arity props ast = or (isNil props) (== arity 0)\r\n  ast\r\n  subSpliceFuncProps props ast", lazy((function(){
  var L$F = function(L_arity, L_props, L_ast) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_arity, L_props, L_ast),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_props));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$p$p)(L_arity, 0));
});
})(++Leisure_traceInstance, L$instance))(L_ast)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_subSpliceFuncProps)(L_props, L_ast));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("subSpliceFuncProps", 2, "subSpliceFuncProps props ast = \\\\\r\n  slash = head ast\r\n  var = head (tail ast)\r\n  afterVar = tail (tail ast)\r\n  dot = head afterVar\r\n  body = tail afterVar\r\n  .\r\n  isTokenString slash '\\\\'\r\n    cons\r\n      slash\r\n      cons\r\n        var\r\n        isTokenString dot '.'\r\n          cons dot (addProps props body)\r\n          cons '.' (addProps props afterVar)\r\n    cons\r\n      head ast\r\n      subSpliceFuncProps props (tail ast)", lazy((function(){
  var L$F = function(L_props, L_ast) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_props, L_ast),
  Leisure_traceReturn(L$F, ((function(){  var L_slash, L_var, L_afterVar, L_dot, L_body;
  L_slash = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_ast));
});
})(++Leisure_traceInstance, L$instance);
  L_var = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_ast));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);
  L_afterVar = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_ast));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);
  L_dot = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_afterVar));
});
})(++Leisure_traceInstance, L$instance);
  L_body = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_afterVar));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isTokenString)(L_slash, "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_slash, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_var, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_dot, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_dot, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addProps)(L_props, L_body));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addProps)(L_props, L_afterVar));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_ast));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_subSpliceFuncProps)(L_props, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_ast));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 19, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("addProps", 2, "addProps props ast = _foldr\r\n  \\prop result . cons '\\\\@' (cons (head prop) (cons (tail prop) (cons '.' result)))\r\n  ast\r\n  props", lazy((function(){
  var L$F = function(L_props, L_ast) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_props, L_ast),
  Leisure_traceReturn(L$F, (resolve(L__foldr)(lazy((function(){
  var L$F = function(L_prop){return (
  Leisure_traceCall(L$F, L_prop),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_cons)("\\@", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_prop));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_prop));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()), L_ast, L_props)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("checkSetDataType", 3, "checkSetDataType toks curToks name = withCons curToks toks \\h t .\r\n  isTokenString h '='\r\n    isTokenString (head t) '\\\\'\r\n      setDataTypeAnno toks name\r\n      toks\r\n    checkSetDataType toks t name", lazy((function(){
  var L$F = function(L_toks, L_curToks, L_name) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_toks, L_curToks, L_name),
  Leisure_traceReturn(L$F, (resolve(L_withCons)(L_curToks, L_toks, lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_h, "=")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_t));
});
})(++Leisure_traceInstance, L$instance), "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setDataTypeAnno)(L_toks, L_name));
});
})(++Leisure_traceInstance, L$instance))(L_toks));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_checkSetDataType)(L_toks, L_t, L_name));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("arity", 2, "arity toks n = isTokenString (head toks) '=' n (arity (tail toks) (+ n 1))", lazy((function(){
  var L$F = function(L_toks, L_n) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_toks, L_n),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_toks));
});
})(++Leisure_traceInstance, L$instance), "=")(L_n)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_arity)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_toks));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_n, 1));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("tokListStr", 1, "tokListStr toks = jsonStringify (_strJoin (_map (\\t . tokenString t) toks) ' ')", lazy((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, (resolve(L_jsonStringify)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__strJoin)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)(lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_tokenString)(L_t)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()), L_toks));
});
})(++Leisure_traceInstance, L$instance), " "));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("linePat", 0, "linePat = regexp '\\\\r?\\\\n(?=[^ ]|$)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("\\r?\\n(?=[^ ]|$)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("emptyLinePat", 0, "emptyLinePat = regexp '(^[ \\\\i]*\\\\#.*|^[ \\\\i]*$|^\\\\r?\\\\n[ \\\\i]*$)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("(^[ \\i]*\\#.*|^[ \\i]*$|^\\r?\\n[ \\i]*$)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("lineScrub", 0, "lineScrub = regexpFlags '\\\\r\\\\n' 'g'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexpFlags)("\\r\\n", "g"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("linesForFile", 1, "linesForFile text = _map tail (countedLinesForFile \"NOTHING.lsr\" text)", lazy((function(){
  var L$F = function(L_text){return (
  Leisure_traceCall(L$F, L_text),
  Leisure_traceReturn(L$F, (resolve(L__map)(L_tail, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedLinesForFile)("NOTHING.lsr", L_text));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedLinesForFile", 2, "countedLinesForFile name text = filter\r\n  \\line . isNil (strMatch (tail line) emptyLinePat)\r\n  countedLines name 1 text", lazy((function(){
  var L$F = function(L_name, L_text) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_text),
  Leisure_traceReturn(L$F, (resolve(L_filter)(lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_isNil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_line));
});
})(++Leisure_traceInstance, L$instance), L_emptyLinePat));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedLines)(L_name, 1, L_text));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedLines", 3, "countedLines filename lineOffset str = _reverse\r\n  _withRecur\r\n    _countedLines filename lineOffset str nil", lazy((function(){
  var L$F = function(L_filename, L_lineOffset, L_str) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_filename, L_lineOffset, L_str),
  Leisure_traceReturn(L$F, (resolve(L__reverse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__withRecur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__countedLines)(L_filename, L_lineOffset, L_str, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("_countedLines", 4, "_countedLines filename lineOffset str lines = \\\\\r\n  m = strMatch str linePat\r\n  idx = head (tail (tail m))\r\n  chunk = strSubstring str 0 idx\r\n  next = + idx (strLen (head m))\r\n  chunkLines = findLines 0 chunk\r\n  .\r\n  eq str ''\r\n    lines\r\n    isNil m\r\n      cons (cons (cons filename (cons lineOffset (tail (findLines 0 str)))) str) lines\r\n      _recur\r\n        _countedLines filename (+ lineOffset (length chunkLines)) (strSubstring str next 0)\r\n          cons (cons (cons filename (cons lineOffset (tail chunkLines))) chunk) lines", lazy((function(){
  var L$F = function(L_filename, L_lineOffset, L_str, L_lines) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_filename, L_lineOffset, L_str, L_lines),
  Leisure_traceReturn(L$F, ((function(){  var L_m, L_idx, L_chunk, L_next, L_chunkLines;
  L_m = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)(L_str, L_linePat));
});
})(++Leisure_traceInstance, L$instance);
  L_idx = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_m));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);
  L_chunk = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_str, 0, L_idx));
});
})(++Leisure_traceInstance, L$instance);
  L_next = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_idx, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_m));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);
  L_chunkLines = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_findLines)(0, L_chunk));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_eq)(L_str, "")(L_lines)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_m)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_filename, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_lineOffset, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_findLines)(0, L_str));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_str));
});
})(++Leisure_traceInstance, L$instance), L_lines));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__recur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__countedLines)(L_filename, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_lineOffset, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_length)(L_chunkLines));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_str, L_next, 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_filename, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_lineOffset, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_chunkLines));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_chunk));
});
})(++Leisure_traceInstance, L$instance), L_lines));
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
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 27, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defPat", 0, "defPat = regexp '^[^ =]+.* =( |$)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^[^ =]+.* =( |$)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("unanchoredDefPat", 0, "unanchoredDefPat = regexp '^((?:\\\\s*\\\\n|#[^\\\\n]*\\\\n)*)([^=\\\\n]*)(=\\\\([^=]+=|=)?'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^((?:\\s*\\n|#[^\\n]*\\n)*)([^=\\n]*)(=\\([^=]+=|=)?"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("namesForLines", 1, "namesForLines lines = _foldl\r\n  \\result line . \\\\\r\n    m = strMatch line defPat\r\n    .\r\n    isNil m result (cons (head (tail m)) result)\r\n  nil\r\n  lines", lazy((function(){
  var L$F = function(L_lines){return (
  Leisure_traceCall(L$F, L_lines),
  Leisure_traceReturn(L$F, (resolve(L__foldl)(lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){  var L_m;
  L_m = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)(L_line, L_defPat));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isNil)(L_m)(L_result)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_m));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_result));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()), L_nil, L_lines)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("runParseFilters", 2, "runParseFilters filters line = filters\r\n  \\h t D . primBind (h line) \\filtered . runParseFilters t filtered\r\n  fakereturn line", lazy((function(){
  var L$F = function(L_filters, L_line) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_filters, L_line),
  Leisure_traceReturn(L$F, (L$(resolve(L_filters))(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_h)(L_line));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_filtered){return (
  Leisure_traceCall(L$F, L_filtered),
  Leisure_traceReturn(L$F, (resolve(L_runParseFilters)(L_t, L_filtered)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fakereturn)(L_line));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isBlockStart", 1, "isBlockStart tok = and\r\n  or (isToken tok) (isString tok)\r\n  _contains blockStarts (strTokenString tok)", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isString)(L_tok));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__contains)(L_blockStarts, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strTokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("macroSub", 2, "macroSub macs expr = postProcessMacro (emptyFor expr) (emptyFor expr) (baseMacroSub macs expr)", lazy((function(){
  var L$F = function(L_macs, L_expr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_macs, L_expr),
  Leisure_traceReturn(L$F, (resolve(L_postProcessMacro)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_expr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_expr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_baseMacroSub)(L_macs, L_expr));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("consifyMacroValue", 1, "consifyMacroValue value = isCons value value (cons value nil)", lazy((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, (resolve(L_isCons)(L_value)(L_value)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_value, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("baseMacroSub", 2, "baseMacroSub macs expr = isToken expr\r\n  expr\r\n  isParens expr\r\n    expr \\start end content . \\\\\r\n      result = baseMacroSub macs content\r\n      .\r\n      isToken result result (parens start end result)\r\n    withCons expr expr \\h t .\r\n      isBlockStart h\r\n        cons h\r\n          isTokenString h '\\\\\\\\'\r\n            macroSubLet macs t\r\n            macroSubBody '.' macs t\r\n        withToken h\r\n          \\\\\r\n            subH = baseMacroSub macs h\r\n            .\r\n            withToken subH\r\n              cons subH (_map (baseMacroSub macs) t)\r\n              \\tok pos . baseMacroSub macs (cons subH t)\r\n          \\tok pos . \\\\\r\n            def = mapGet tok macs\r\n            .\r\n            mapContains tok macs\r\n              baseMacroSub macs (def t)\r\n              cons h (_map (baseMacroSub macs) t)\r\n              ", lazy((function(){
  var L$F = function(L_macs, L_expr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_macs, L_expr),
  Leisure_traceReturn(L$F, (resolve(L_isToken)(L_expr)(L_expr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isParens)(L_expr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_expr)(lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_content){return (
  Leisure_traceCall(L$F, L_content),
  Leisure_traceReturn(L$F, ((function(){  var L_result;
  L_result = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_baseMacroSub)(L_macs, L_content));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isToken)(L_result)(L_result)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parens)(L_start, L_end, L_result));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_withCons)(L_expr, L_expr, lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_isBlockStart)(L_h)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_h, "\\\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_macroSubLet)(L_macs, L_t));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_macroSubBody)(".", L_macs, L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_withToken)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_subH;
  L_subH = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_baseMacroSub)(L_macs, L_h));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_withToken)(L_subH, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_subH, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_baseMacroSub)(L_macs));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_baseMacroSub)(L_macs, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_subH, L_t));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})()))})());
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, ((function(){  var L_def;
  L_def = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_mapGet)(L_tok, L_macs));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_mapContains)(L_tok, L_macs)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_baseMacroSub)(L_macs, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_def)(L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_baseMacroSub)(L_macs));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 25, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 26, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 28, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 29, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 32, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("macroSubLet", 2, "macroSubLet macs list = list\r\n  \\h t D . isTokenString h '.'\r\n    cons h (baseMacroSub macs t)\r\n    cons (setParens h \\content . macroSubBody '=' macs content) (macroSubLet macs t)\r\n  # Don't bother with parse errors at this point -- ast generator will detect them\r\n  nil", lazy((function(){
  var L$F = function(L_macs, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_macs, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_h, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_baseMacroSub)(L_macs, L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setParens)(L_h, lazy((function(){
  var L$F = function(L_content){return (
  Leisure_traceCall(L$F, L_content),
  Leisure_traceReturn(L$F, (resolve(L_macroSubBody)("=", L_macs, L_content)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_macroSubLet)(L_macs, L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("macroSubBody", 3, "macroSubBody char macs list = list\r\n  \\h t D . cons h\r\n    isTokenString h char baseMacroSub (macroSubBody char)\r\n      macs\r\n      t\r\n  nil", lazy((function(){
  var L$F = function(L_char, L_macs, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_char, L_macs, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_h, L_char)(L_baseMacroSub)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_macroSubBody)(L_char));
});
})(++Leisure_traceInstance, L$instance))(L_macs)(L_t));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("postProcessMacro", 3, "postProcessMacro before after expr = isString expr\r\n  token expr (isEmptyPos after before after)\r\n  isParens expr\r\n    expr \\start end contents . parens start end (postProcessMacro start end contents)\r\n    isCons expr\r\n      expr \\h t .\r\n        isToken h\r\n          cons h (postProcessMacro (addFilepos (addFilepos (tokenFilepos h) (strLen (tokenString h))) 1) (emptyFor h) t)\r\n          \\\\\r\n            posStart = position h\r\n            posEnd = position t\r\n            t2 = postProcessMacro (emptyFor posStart) after t\r\n            h2 = postProcessMacro before (emptyFor posStart) h\r\n            .\r\n            isEmptyPos posStart\r\n              cons (postProcessMacro before (position t2) h) t2\r\n              cons h2 (postProcessMacro (addFilepos (lexEnd h2) 1) after t)\r\n      isNumber expr\r\n        token (strString expr) (isEmptyPos after before after)\r\n        expr", lazy((function(){
  var L$F = function(L_before, L_after, L_expr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_before, L_after, L_expr),
  Leisure_traceReturn(L$F, (resolve(L_isString)(L_expr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(L_expr, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isEmptyPos)(L_after)(L_before)(L_after));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 38, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isParens)(L_expr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_expr)(lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_contents){return (
  Leisure_traceCall(L$F, L_contents),
  Leisure_traceReturn(L$F, (resolve(L_parens)(L_start, L_end, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_postProcessMacro)(L_start, L_end, L_contents));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 37, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_expr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 32, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_expr)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_isToken)(L_h)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_postProcessMacro)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addFilepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addFilepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_h));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), 1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_h));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 29, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_posStart, L_posEnd, L_t2, L_h2;
  L_posStart = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_h));
});
})(++Leisure_traceInstance, L$instance);
  L_posEnd = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_t));
});
})(++Leisure_traceInstance, L$instance);
  L_t2 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_postProcessMacro)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_posStart));
});
})(++Leisure_traceInstance, L$instance), L_after, L_t));
});
})(++Leisure_traceInstance, L$instance);
  L_h2 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_postProcessMacro)(L_before, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_posStart));
});
})(++Leisure_traceInstance, L$instance), L_h));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isEmptyPos)(L_posStart)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_postProcessMacro)(L_before, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_t2));
});
})(++Leisure_traceInstance, L$instance), L_h));
});
})(++Leisure_traceInstance, L$instance), L_t2));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 28, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h2, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_postProcessMacro)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addFilepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_lexEnd)(L_h2));
});
})(++Leisure_traceInstance, L$instance), 1));
});
})(++Leisure_traceInstance, L$instance), L_after, L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 30, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 31, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 36, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNumber)(L_expr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 35, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 33, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strString)(L_expr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 34, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isEmptyPos)(L_after)(L_before)(L_after));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_expr));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 39, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defMacro", 2, "defMacro name def = primBind (getValue 'macroDefs')\r\n  \\macs . setValue 'macroDefs' (mapSet name def macs)", lazy((function(){
  var L$F = function(L_name, L_def) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_def),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("macroDefs"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_macs){return (
  Leisure_traceCall(L$F, L_macs),
  Leisure_traceReturn(L$F, (resolve(L_setValue)("macroDefs", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_mapSet)(L_name, L_def, L_macs));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("delimiterListPrefix", 0, "delimiterListPrefix = \"\\\"(?:\\\\\\\\.|[^\\\"])*\\\"|'(?:\\\\\\\\.|[^'])*'|\\\\r?\\\\n *#[^\\\\r\\\\n]*|\\\\r?\\\\n *| +|#[^\\\\r\\\\n]*\"", "\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|\\r?\\n *#[^\\r\\n]*|\\r?\\n *| +|#[^\\r\\n]*");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("regexpEscapePat", 0, "regexpEscapePat = regexpFlags '[\\\\-\\\\[\\\\]/\\\\{\\\\}\\\\(\\\\)\\\\*\\\\+\\\\?\\\\.\\\\\\\\\\\\^\\\\$\\\\|]' 'g'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexpFlags)("[\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]", "g"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("addToken", 1, "addToken del = primBind (getValue 'tokenList')\r\n  \\dels . _contains dels del\r\n    false\r\n    \\\\\r\n      newDels = insertSorted (\\a b . > (strLen a) (strLen b)) del dels\r\n      .\r\n      primBind (setValue 'tokenList' newDels)\r\n        \\_ . computeTokenPat newDels", lazy((function(){
  var L$F = function(L_del){return (
  Leisure_traceCall(L$F, L_del),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenList"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_dels){return (
  Leisure_traceCall(L$F, L_dels),
  Leisure_traceReturn(L$F, (resolve(L__contains)(L_dels, L_del)(L_false)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_newDels;
  L_newDels = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_insertSorted)(lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_$z)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_a));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_b));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()), L_del, L_dels));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("tokenList", L_newDels));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_computeTokenPat)(L_newDels)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))})());
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("computeTokenPat", 1, "computeTokenPat dels = \\\\\r\n  delPats = _map (\\item . strReplace item regexpEscapePat \"\\\\$&\") dels\r\n  newPat = strCat (cons '(' (cons (_strJoin (cons delimiterListPrefix delPats) '|') (cons ')' nil)))\r\n  .\r\n  setValue 'tokenPat' newPat", lazy((function(){
  var L$F = function(L_dels){return (
  Leisure_traceCall(L$F, L_dels),
  Leisure_traceReturn(L$F, ((function(){  var L_delPats, L_newPat;
  L_delPats = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)(lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (resolve(L_strReplace)(L_item, L_regexpEscapePat, "\\$&")))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()), L_dels));
});
})(++Leisure_traceInstance, L$instance);
  L_newPat = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("(", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__strJoin)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_delimiterListPrefix, L_delPats));
});
})(++Leisure_traceInstance, L$instance), "|"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(")", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_setValue)("tokenPat", L_newPat)})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("addTokenGroup", 2, "addTokenGroup open close = primBind (addToken open)\r\n  \\_ . primBind (addToken close)\r\n    \\_ . primBind (getValue 'tokenGroups')\r\n      \\gr . setValue 'tokenGroups' (acons open close gr)", lazy((function(){
  var L$F = function(L_open, L_close) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_open, L_close),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addToken)(L_open));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_addToken)(L_close));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___0){return (
  Leisure_traceCall(L$F, L___0),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenGroups"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_gr){return (
  Leisure_traceCall(L$F, L_gr),
  Leisure_traceReturn(L$F, (resolve(L_setValue)("tokenGroups", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_acons)(L_open, L_close, L_gr));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parenGroups", 0, "parenGroups = acons '(' ')' nil", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_acons)("(", ")", L_nil));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("testParse", 2, "testParse str pat = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil parenGroups) \\list . list \\h t . stripParens h", lazy((function(){
  var L$F = function(L_str, L_pat) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseIndent)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)("\n", L_startFilePos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokens)(L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance), L_nil, L_parenGroups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_stripParens)(L_h)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseG", 3, "parseG str pat groups = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil groups) \\list . list \\h t . stripParens h", lazy((function(){
  var L$F = function(L_str, L_pat, L_groups) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseIndent)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)("\n", L_startFilePos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokens)(L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance), L_nil, L_groups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_stripParens)(L_h)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseToAst", 2, "parseToAst str pat = createAst nil (testParse str pat) nil", lazy((function(){
  var L$F = function(L_str, L_pat) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat),
  Leisure_traceReturn(L$F, (resolve(L_createAst)(L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_testParse)(L_str)(L_pat));
});
})(++Leisure_traceInstance, L$instance), L_nil)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseM", 1, "parseM str =\r\n  primBind (getValue 'tokenPat')\r\n    \\tokPat . primBind (getValue 'tokenGroups')\r\n      \\groups . parseG str tokPat groups", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPat"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_tokPat){return (
  Leisure_traceCall(L$F, L_tokPat),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenGroups"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_parseG)(L_str, L_tokPat, L_groups)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("scanLine", 4, "scanLine str pat onDef onExpr = scanLineG str pat parenGroups onDef onExpr", lazy((function(){
  var L$F = function(L_str, L_pat, L_onDef, L_onExpr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat, L_onDef, L_onExpr),
  Leisure_traceReturn(L$F, (resolve(L_scanLineG)(L_str, L_pat, L_parenGroups, L_onDef, L_onExpr)))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseLine", 5, "parseLine str pat names onDef onExpr = parseLineG str pat names parenGroups onDef onExpr", lazy((function(){
  var L$F = function(L_str, L_pat, L_names, L_onDef, L_onExpr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_str, L_pat, L_names, L_onDef, L_onExpr),
  Leisure_traceReturn(L$F, (resolve(L_parseLineG)(L_str, L_pat, L_names, L_parenGroups, L_onDef, L_onExpr)))
);
};;
  L$F.leisureLength = 5;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseLineM", 1, "parseLineM str = primBind (getValue 'tokenPat')\r\n  \\tokPat . primBind (getValue 'tokenGroups')\r\n    \\groups . parseLineG str tokPat nil groups id id", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPat"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_tokPat){return (
  Leisure_traceCall(L$F, L_tokPat),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenGroups"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_parseLineG)(L_str, L_tokPat, L_nil, L_groups, L_id, L_id)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("macroSubM", 1, "macroSubM expr =\r\n  primBind (getValue 'macroDefs')\r\n    \\macs . macroSub macs expr", lazy((function(){
  var L$F = function(L_expr){return (
  Leisure_traceCall(L$F, L_expr),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("macroDefs"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_macs){return (
  Leisure_traceCall(L$F, L_macs),
  Leisure_traceReturn(L$F, (resolve(L_macroSub)(L_macs, L_expr)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("macroParse", 1, "macroParse str =\r\n  primBind (parseM str)\r\n    \\ex . macroSubM ex", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseM)(L_str));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_ex){return (
  Leisure_traceCall(L$F, L_ex),
  Leisure_traceReturn(L$F, (resolve(L_macroSubM)(L_ex)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("tokensM", 1, "tokensM str =\r\n  primBind (getValue 'tokenPat')\r\n    \\delimiterPat . tokens str delimiterPat", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPat"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_delimiterPat){return (
  Leisure_traceCall(L$F, L_delimiterPat),
  Leisure_traceReturn(L$F, (resolve(L_tokens)(L_str, L_delimiterPat)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseLines", 2, "parseLines lines result = lines\r\n  \\h t D . primBind (parseLineM h)\r\n    \\ast . parseLines t (cons ast result)\r\n  _reverse result", lazy((function(){
  var L$F = function(L_lines, L_result) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lines, L_result),
  Leisure_traceReturn(L$F, (L$(resolve(L_lines))(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseLineM)(L_h));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
  Leisure_traceReturn(L$F, (resolve(L_parseLines)(L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_ast, L_result));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_result));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("parseFile", 1, "parseFile text = parseLines (linesForFile text) nil", lazy((function(){
  var L$F = function(L_text){return (
  Leisure_traceCall(L$F, L_text),
  Leisure_traceReturn(L$F, (resolve(L_parseLines)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_linesForFile)(L_text));
});
})(++Leisure_traceInstance, L$instance), L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("simpleScanLine", 1, "simpleScanLine line = primBind (getValue 'tokenPat')\r\n  \\tokenPat . primBind (getValue 'tokenGroups')\r\n    \\groups . scanLineG line tokenPat groups id id", lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPat"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_tokenPat){return (
  Leisure_traceCall(L$F, L_tokenPat),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenGroups"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_scanLineG)(L_line, L_tokenPat, L_groups, L_id, L_id)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("scanLineM", 1, "scanLineM line = countedScanLineM emptyLineStarts line", lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_countedScanLineM)(L_emptyLineStarts, L_line)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedScanLineM", 2, "countedScanLineM lineStarts line = primBind (getValue 'tokenPat')\r\n  \\tokenPat . primBind (getValue 'tokenGroups')\r\n    \\groups . primBind (getValue 'parseFilters')\r\n      \\filters . primBind (getValue 'macroDefs')\r\n        \\macros . primBind (getValue 'parser_funcProps')\r\n          \\props . primBind (runParseFilters filters (countedScanLineG lineStarts line tokenPat groups props id id))\r\n            \\scanned . macroSub macros scanned", lazy((function(){
  var L$F = function(L_lineStarts, L_line) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_lineStarts, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPat"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_tokenPat){return (
  Leisure_traceCall(L$F, L_tokenPat),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenGroups"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("parseFilters"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_filters){return (
  Leisure_traceCall(L$F, L_filters),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("macroDefs"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_macros){return (
  Leisure_traceCall(L$F, L_macros),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("parser_funcProps"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_props){return (
  Leisure_traceCall(L$F, L_props),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_runParseFilters)(L_filters, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedScanLineG)(L_lineStarts, L_line, L_tokenPat, L_groups, L_props, L_id, L_id));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_scanned){return (
  Leisure_traceCall(L$F, L_scanned),
  Leisure_traceReturn(L$F, (resolve(L_macroSub)(L_macros, L_scanned)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("newline", 0, "newline = regexp '\\\\r?\\\\n'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("\\r?\\n"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("findLines", 2, "findLines offset line = \\\\\r\n  m = strMatch line newline\r\n  idx = + 1 (head (tail (tail m)))\r\n  .\r\n  eq m nil\r\n    cons offset nil\r\n    cons offset (findLines (+ offset idx) (strSubstring line idx 0))", lazy((function(){
  var L$F = function(L_offset, L_line) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_offset, L_line),
  Leisure_traceReturn(L$F, ((function(){  var L_m, L_idx;
  L_m = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strMatch)(L_line, L_newline));
});
})(++Leisure_traceInstance, L$instance);
  L_idx = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_m));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_eq)(L_m, L_nil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_offset, L_nil));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_offset, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_findLines)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_offset, L_idx));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strSubstring)(L_line, L_idx, 0));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("newParseLine", 3, "newParseLine offset names line = primBind (scanLineM line)\r\n  \\scanned . ifNotErr (createAst (cons \"NEWPARSE.lsr\" (findLines offset line)) scanned names) id", lazy((function(){
  var L$F = function(L_offset, L_names, L_line) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_offset, L_names, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_scanLineM)(L_line));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_scanned){return (
  Leisure_traceCall(L$F, L_scanned),
  Leisure_traceReturn(L$F, (resolve(L_ifNotErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_createAst)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("NEWPARSE.lsr", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_findLines)(L_offset, L_line));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_scanned, L_names));
});
})(++Leisure_traceInstance, L$instance), L_id)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedParseLine", 2, "countedParseLine names countedLine = primBind (countedScanLineM (head countedLine) (tail countedLine))\r\n  \\scanned . createAst (head countedLine) scanned names", lazy((function(){
  var L$F = function(L_names, L_countedLine) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_names, L_countedLine),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedScanLineM)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_countedLine));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_countedLine));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_scanned){return (
  Leisure_traceCall(L$F, L_scanned),
  Leisure_traceReturn(L$F, (resolve(L_createAst)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_countedLine));
});
})(++Leisure_traceInstance, L$instance), L_scanned, L_names)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("runLine", 3, "runLine offset names line = primBind (newParseLine offset names line)\r\n  \\ast . primBind (runAst line ast)\r\n    \\res . primBind res\r\n      \\result . cons\r\n        ast\r\n        isErr result\r\n          left (errMsg result)\r\n          right result", lazy((function(){
  var L$F = function(L_offset, L_names, L_line) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_offset, L_names, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_newParseLine)(L_offset, L_names, L_line));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_runAst)(L_line)(L_ast));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_res){return (
  Leisure_traceCall(L$F, L_res),
  Leisure_traceReturn(L$F, (resolve(L_primBind)(L_res, lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_ast, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isErr)(L_result)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_left)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_errMsg)(L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_right)(L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedRunLine", 3, "countedRunLine file names countedLine = primBind (countedParseLine names countedLine)\r\n  \\ast . \\\\\r\n    wrapped = astFileWrap file ast\r\n    .\r\n    primBind (runAst (tail countedLine) wrapped)\r\n      \\res . primBind res\r\n        \\result . resultOfRun wrapped result", lazy((function(){
  var L$F = function(L_file, L_names, L_countedLine) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_file, L_names, L_countedLine),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedParseLine)(L_names, L_countedLine));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
  Leisure_traceReturn(L$F, ((function(){  var L_wrapped;
  L_wrapped = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_astFileWrap)(L_file, L_ast));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_runAst)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_countedLine));
});
})(++Leisure_traceInstance, L$instance))(L_wrapped));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_res){return (
  Leisure_traceCall(L$F, L_res),
  Leisure_traceReturn(L$F, (resolve(L_primBind)(L_res, lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_resultOfRun)(L_wrapped, L_result)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("resultOfRun", 2, "resultOfRun wrapped result =\r\n  cons\r\n    wrapped\r\n    isErr result\r\n      left (errMsg result)\r\n      right result", lazy((function(){
  var L$F = function(L_wrapped, L_result) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_wrapped, L_result),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_wrapped, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isErr)(L_result)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_left)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_errMsg)(L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_right)(L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("astFileWrap", 2, "astFileWrap file ast = anno 'filename' (basename file) ast", lazy((function(){
  var L$F = function(L_file, L_ast) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_file, L_ast),
  Leisure_traceReturn(L$F, (resolve(L_anno)("filename", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_basename)(L_file));
});
})(++Leisure_traceInstance, L$instance), L_ast)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("basename", 1, "basename file = strReplace file (regexp '^(.*/)?([^/]+)$') '$2'", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, (resolve(L_strReplace)(L_file, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^(.*/)?([^/]+)$"));
});
})(++Leisure_traceInstance, L$instance), "$2")))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("runLines", 2, "runLines names lines = lines\r\n  \\h t D . primBind (runLine 0 names h)\r\n    \\line . primBind (runLines names t)\r\n      \\rest . cons line rest\r\n  nil", lazy((function(){
  var L$F = function(L_names, L_lines) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_names, L_lines),
  Leisure_traceReturn(L$F, (L$(resolve(L_lines))(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_runLine)(0, L_names, L_h));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_runLines)(L_names, L_t));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_line, L_rest)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()), L_nil)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedRunLines", 4, "countedRunLines file names countedLines result = countedLines\r\n  \\h t D . primBind (countedRunLine file names h)\r\n    \\line . countedRunLines file names t (cons line result)\r\n  _reverse result", lazy((function(){
  var L$F = function(L_file, L_names, L_countedLines, L_result) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_file, L_names, L_countedLines, L_result),
  Leisure_traceReturn(L$F, (resolve(L_countedLines)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedRunLine)(L_file, L_names, L_h));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_countedRunLines)(L_file, L_names, L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_line, L_result));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_result));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("runFile", 1, "runFile text = runNamedFile \"RUNFILE.lsr\" text", lazy((function(){
  var L$F = function(L_text){return (
  Leisure_traceCall(L$F, L_text),
  Leisure_traceReturn(L$F, (resolve(L_runNamedFile)("RUNFILE.lsr", L_text)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("runNamedFile", 2, "runNamedFile name text = \\\\\r\n  counted = countedLinesForFile name text\r\n  lines = _map tail counted\r\n  names = namesForLines lines\r\n  .\r\n  #countedRunLines name names counted\r\n  countedRunLines name names counted nil", lazy((function(){
  var L$F = function(L_name, L_text) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_text),
  Leisure_traceReturn(L$F, ((function(){  var L_counted, L_lines, L_names;
  L_counted = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedLinesForFile)(L_name, L_text));
});
})(++Leisure_traceInstance, L$instance);
  L_lines = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)(L_tail, L_counted));
});
})(++Leisure_traceInstance, L$instance);
  L_names = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_namesForLines)(L_lines));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_countedRunLines)(L_name, L_names, L_counted, L_nil)})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("baseLoad", 1, "baseLoad file = primBind (readFile file)\r\n  \\result . result\r\n    \\err . err\r\n    \\contents . baseLoadString file contents", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_readFile)(L_file));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_result)(lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_err)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))(lazy((function(){
  var L$F = function(L_contents){return (
  Leisure_traceCall(L$F, L_contents),
  Leisure_traceReturn(L$F, (resolve(L_baseLoadString)(L_file, L_contents)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("baseLoadString", 2, "baseLoadString file contents = primBind (getValue 'activeTokenPacks')\r\n  \\activePacks . primBind resetStdTokenPacks\r\n    \\_ . primBind resetNameSpaceInfo\r\n      \\nsInfo . primBind (runNamedFile file contents)\r\n        \\result . primBind (setNameSpaceInfo nsInfo)\r\n          \\_ . primBind (isNil activePacks\r\n            resetStdTokenPacks\r\n            resetTokenPacks activePacks)\r\n            \\_ . result", lazy((function(){
  var L$F = function(L_file, L_contents) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_file, L_contents),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("activeTokenPacks"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_activePacks){return (
  Leisure_traceCall(L$F, L_activePacks),
  Leisure_traceReturn(L$F, (resolve(L_primBind)(L_resetStdTokenPacks, lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_primBind)(L_resetNameSpaceInfo, lazy((function(){
  var L$F = function(L_nsInfo){return (
  Leisure_traceCall(L$F, L_nsInfo),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_runNamedFile)(L_file, L_contents));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setNameSpaceInfo)(L_nsInfo));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___0){return (
  Leisure_traceCall(L$F, L___0),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_activePacks)(L_resetStdTokenPacks)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_resetTokenPacks)(L_activePacks));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___1){return (
  Leisure_traceCall(L$F, L___1),
  Leisure_traceReturn(L$F, (resolve(L_result)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("load", 1, "load file = primBind (baseLoad file)\r\n  \\result . \\\\\r\n    errs = _foldr (\\line results . tail line (\\er . cons er results) (\\x . results)) nil result\r\n    .\r\n    isNil errs\r\n      right true\r\n      left errs", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_baseLoad)(L_file));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, ((function(){  var L_errs;
  L_errs = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__foldr)(lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_results){return (
  Leisure_traceCall(L$F, L_results),
  Leisure_traceReturn(L$F, (resolve(L_tail)(L_line)(lazy((function(){
  var L$F = function(L_er){return (
  Leisure_traceCall(L$F, L_er),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_er, L_results)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))(lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_results)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()), L_nil, L_result));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isNil)(L_errs)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_right)(L_true));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_left)(L_errs));
});
})(++Leisure_traceInstance, L$instance))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("require", 1, "require file = primBind (getValue 'requiredFiles')\r\n  \\files . _contains files file\r\n    right false\r\n    primBind (setValue 'requiredFiles' (cons file files))\r\n      \\_. primBind (load file)\r\n        \\result . result\r\n          \\x . left x\r\n          \\_ . right true", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("requiredFiles"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_files){return (
  Leisure_traceCall(L$F, L_files),
  Leisure_traceReturn(L$F, (resolve(L__contains)(L_files, L_file)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_right)(L_false));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("requiredFiles", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_file, L_files));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_load)(L_file));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_result)(lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_left)(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))(lazy((function(){
  var L$F = function(L___0){return (
  Leisure_traceCall(L$F, L___0),
  Leisure_traceReturn(L$F, (resolve(L_right)(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("scanFile", 1, "scanFile file = primBind (readFile file)\r\n  \\result . result\r\n    \\err . err\r\n      \\_ . primBind (runNamedFile file contents)\r\n        counted = countedLinesForFile name text\r\n        lines = _map tail counted\r\n        names = namesForLines lines\r\n        .\r\n        countedScanLines name names counted", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_readFile)(L_file));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_result)(lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_err)(lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_runNamedFile)(L_file, L_contents));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_counted))(L_$p, L_countedLinesForFile, L_name, L_text));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_lines))(L_$p, L__map, L_tail, L_counted));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_names))(L_$p, L_namesForLines, L_lines));
});
})(++Leisure_traceInstance, L$instance))(L_$B)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedScanLines)(L_name, L_names, L_counted));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("countedScanLines", 3, "countedScanLines file names countedLines = countedLines\r\n  \\h t D . primBind (countedScanLineM (head h) (tail h))\r\n    \\line . primBind (countedScanLines file names t)\r\n      \\rest . cons line rest\r\n  nil", lazy((function(){
  var L$F = function(L_file, L_names, L_countedLines) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_file, L_names, L_countedLines),
  Leisure_traceReturn(L$F, (resolve(L_countedLines)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedScanLineM)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_h));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedScanLines)(L_file, L_names, L_t));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_line, L_rest)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("defTokenPack", 2, "defTokenPack name pack = primBind (getValue 'tokenPacks')\r\n  \\packs . setValue 'tokenPacks' (acons name pack packs)", lazy((function(){
  var L$F = function(L_name, L_pack) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_name, L_pack),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPacks"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_packs){return (
  Leisure_traceCall(L$F, L_packs),
  Leisure_traceReturn(L$F, (resolve(L_setValue)("tokenPacks", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_acons)(L_name, L_pack, L_packs));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("useTokenPack", 1, "useTokenPack name = primBind (getValue 'tokenPacks')\r\n  \\packs . primBind (getValue 'tokenGroups')\r\n    \\groups . primBind (getValue 'tokenList')\r\n      \\tokens . primBind (getValue 'activeTokenPacks')\r\n        \\activePacks . primBind (getValue 'parseFilters')\r\n          \\filters . assoc name packs\r\n            \\pack . \\\\\r\n              groupToks = _foldl (\\value el . el \\h t . cons h (cons t value)) nil (head (tail pack))\r\n              newToks = _sort (\\a b . > (strLen a) (strLen b)) (_append (head pack) (_append groupToks tokens))\r\n              .\r\n              primBind (setValue 'tokenList' newToks)\r\n                \\_ . primBind (setValue 'tokenGroups' (appendAlist (head (tail pack)) groups))\r\n                  \\_ . primBind (setValue 'parseFilters' (_append filters (head (tail (tail pack)))))\r\n                    \\_ . primBind (computeTokenPat newToks)\r\n                      \\_ . setValue 'activeTokenPacks' (cons name activePacks)\r\n            nil", lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPacks"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_packs){return (
  Leisure_traceCall(L$F, L_packs),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenGroups"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenList"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_tokens){return (
  Leisure_traceCall(L$F, L_tokens),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("activeTokenPacks"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_activePacks){return (
  Leisure_traceCall(L$F, L_activePacks),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("parseFilters"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_filters){return (
  Leisure_traceCall(L$F, L_filters),
  Leisure_traceReturn(L$F, (resolve(L_assoc)(L_name, L_packs)(lazy((function(){
  var L$F = function(L_pack){return (
  Leisure_traceCall(L$F, L_pack),
  Leisure_traceReturn(L$F, ((function(){  var L_groupToks, L_newToks;
  L_groupToks = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__foldl)(lazy((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (resolve(L_el)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_t, L_value));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()), L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_pack));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);
  L_newToks = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__sort)(lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_$z)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_a));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_b));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__append)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_pack));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__append)(L_groupToks, L_tokens));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("tokenList", L_newToks));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("tokenGroups", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_appendAlist)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_pack));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_groups));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___0){return (
  Leisure_traceCall(L$F, L___0),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("parseFilters", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__append)(L_filters, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 29, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 28, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_pack));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___1){return (
  Leisure_traceCall(L$F, L___1),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 32, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_computeTokenPat)(L_newToks));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___2){return (
  Leisure_traceCall(L$F, L___2),
  Leisure_traceReturn(L$F, (resolve(L_setValue)("activeTokenPacks", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 33, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_name, L_activePacks));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 34, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 35, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 36, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 37, L$F.L$instanceId);
  return L$F;
})()))})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 38, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 39, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 40, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 41, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 42, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 43, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 44, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("resetTokenPacks", 1, "resetTokenPacks packs = primBind (setValue 'tokenGroups' nil)\r\n  \\_ . primBind (setValue 'tokenList' nil)\r\n    \\_ . primBind (setValue 'activeTokenPacks' nil)\r\n      \\_ . primBind (setValue 'parseFilters' nil)\r\n        \\_ . _foldr1\r\n          \\packCmd result . primBind packCmd \\_ . result\r\n          _map useTokenPack packs", lazy((function(){
  var L$F = function(L_packs){return (
  Leisure_traceCall(L$F, L_packs),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("tokenGroups", L_nil));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("tokenList", L_nil));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___0){return (
  Leisure_traceCall(L$F, L___0),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("activeTokenPacks", L_nil));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___1){return (
  Leisure_traceCall(L$F, L___1),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("parseFilters", L_nil));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L___2){return (
  Leisure_traceCall(L$F, L___2),
  Leisure_traceReturn(L$F, (resolve(L__foldr1)(lazy((function(){
  var L$F = function(L_packCmd){return (
  Leisure_traceCall(L$F, L_packCmd),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_primBind)(L_packCmd, lazy((function(){
  var L$F = function(L___3){return (
  Leisure_traceCall(L$F, L___3),
  Leisure_traceReturn(L$F, (resolve(L_result)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)(L_useTokenPack, L_packs));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("resetStdTokenPacks", 0, "resetStdTokenPacks = primBind (getValue 'stdTokenPacks')\r\n  \\stds . primBind (resetTokenPacks stds)\r\n    \\_ . setValue 'activeTokenPacks' nil", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("stdTokenPacks"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_stds){return (
  Leisure_traceCall(L$F, L_stds),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_resetTokenPacks)(L_stds));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_setValue)("activeTokenPacks", L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("addStdTokenPacks", 1, "addStdTokenPacks morePacks = primBind (getValue 'stdTokenPacks')\r\n  \\stds . setValue 'stdTokenPacks' (_append stds morePacks)", lazy((function(){
  var L$F = function(L_morePacks){return (
  Leisure_traceCall(L$F, L_morePacks),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("stdTokenPacks"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_stds){return (
  Leisure_traceCall(L$F, L_stds),
  Leisure_traceReturn(L$F, (resolve(L_setValue)("stdTokenPacks", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__append)(L_stds, L_morePacks));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("addParseFilter", 1, "addParseFilter filt = primBind (getValue 'parseFilters')\r\n  \\filters . setValue 'parseFilters' (_append filters (cons filt nil))", lazy((function(){
  var L$F = function(L_filt){return (
  Leisure_traceCall(L$F, L_filt),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("parseFilters"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_filters){return (
  Leisure_traceCall(L$F, L_filters),
  Leisure_traceReturn(L$F, (resolve(L_setValue)("parseFilters", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__append)(L_filters, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_filt, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("d", 3, "d label value expr = log (strCat (cons label (cons value nil))) expr", lazy((function(){
  var L$F = function(L_label, L_value, L_expr) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_label, L_value, L_expr),
  Leisure_traceReturn(L$F, (resolve(L_log)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_label, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_value, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_expr)))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("dd", 2, "dd label arg = d label arg arg", lazy((function(){
  var L$F = function(L_label, L_arg) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_label, L_arg),
  Leisure_traceReturn(L$F, (resolve(L_d)(L_label, L_arg, L_arg)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("testParse", 1, "testParse str = countedParseLine nil (head (countedLinesForFile 'parse' str))", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_countedParseLine)(L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_countedLinesForFile)("parse", L_str));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("macroDefs", L_hamt);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("requiredFiles", L_nil);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("tokenPacks", L_nil);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("activeTokenPacks", L_nil);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("stdTokenPacks", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("std", L_nil));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("parser_funcProps", L_nil);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defTokenPack)("std", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\@", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_acons)("(", ")", L_nil));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_nil, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return resolve(L_resetStdTokenPacks)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setNameSpace)("core");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("triple", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("withRecur", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_cons)("_withRecur", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_list, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("recur", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_cons)("_recur", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_list, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("any", 2, "any f l = find f l (\\el . true) false", lazy((function(){
  var L$F = function(L_f, L_l) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_f, L_l),
  Leisure_traceReturn(L$F, (resolve(L_find)(L_f)(L_l)(lazy((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (resolve(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))(L_false)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("all", 2, "all f l = not (any (compose not f) l)", lazy((function(){
  var L$F = function(L_f, L_l) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_f, L_l),
  Leisure_traceReturn(L$F, (resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_any)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_compose)(L_not, L_f));
});
})(++Leisure_traceInstance, L$instance), L_l));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("takeUpto", 2, "takeUpto func list = \\\\\r\n  ret = subtakeUpto func list\r\n  .\r\n  == ret false\r\n    nil\r\n    ret", lazy((function(){
  var L$F = function(L_func, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_list),
  Leisure_traceReturn(L$F, ((function(){  var L_ret;
  L_ret = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_subtakeUpto)(L_func, L_list));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_$p$p)(L_ret, L_false)(L_nil)(L_ret)})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("subtakeUpto", 2, "subtakeUpto func list = \\\\\r\n  ret = subtakeUpto func (tail list)\r\n  .\r\n  isNil list\r\n    false\r\n    func (head list)\r\n      nil\r\n      == ret false\r\n        false\r\n        cons (head list) ret", lazy((function(){
  var L$F = function(L_func, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_list),
  Leisure_traceReturn(L$F, ((function(){  var L_ret;
  L_ret = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_subtakeUpto)(L_func, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isNil)(L_list)(L_false)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_func))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance), L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$p$p)(L_ret, L_false)(L_false)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance), L_ret));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("dropAfter", 2, "dropAfter func list = isNil list\r\n  nil\r\n  func (head list)\r\n    tail list\r\n    dropAfter func (tail list)", lazy((function(){
  var L$F = function(L_func, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_func, L_list),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_list)(L_nil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_func))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_dropAfter)(L_func, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("doall", 1, "doall x = isNil x\r\n  unit\r\n  _foldr1 (\\el res . primBind el \\_ . res) x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_x)(L_unit)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__foldr1)(lazy((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_res){return (
  Leisure_traceCall(L$F, L_res),
  Leisure_traceReturn(L$F, (resolve(L_primBind)(L_el, lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_res)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()), L_x));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("aconsf", 3, "aconsf key value list = acons key value (aremove key list)", lazy((function(){
  var L$F = function(L_key, L_value, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_key, L_value, L_list),
  Leisure_traceReturn(L$F, (resolve(L_acons)(L_key, L_value, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aremove)(L_key, L_list));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("aremove", 2, "aremove key list = isNil list\r\n  nil\r\n  eq (head (head list)) key\r\n    aremove key (tail list)\r\n    aconsPair (head list) (aremove key (tail list))", lazy((function(){
  var L$F = function(L_key, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_key, L_list),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_list)(L_nil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_key)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aremove)(L_key, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aconsPair)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aremove)(L_key, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
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
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addTokenGroup)("[", "]");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addToken)("|");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("listifyOp", 3, "listifyOp op list last = list\r\n  \\h t D . isTokenString h '|'\r\n    cons t nil\r\n    cons (cons op (cons h (listifyOp op t last))) nil\r\n  cons last nil", lazy((function(){
  var L$F = function(L_op, L_list, L_last) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_op, L_list, L_last),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_h, "|")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_t, L_nil));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_op, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_listifyOp)(L_op, L_t, L_last));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_last, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("listify", 1, "listify list = listifyOp 'cons' list 'nil'", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_listifyOp)("cons", L_list, "nil")))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("listFilter", 1, "listFilter code = primBind (getValue 'listMacros')\r\n  \\listMacros . filterApplies code \\list . list \\h t .\r\n    and (isToken h) (_contains listMacros (tokenString h))\r\n      listFilterTail list\r\n      list", lazy((function(){
  var L$F = function(L_code){return (
  Leisure_traceCall(L$F, L_code),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("listMacros"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_listMacros){return (
  Leisure_traceCall(L$F, L_listMacros),
  Leisure_traceReturn(L$F, (resolve(L_filterApplies)(L_code, lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_h));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__contains)(L_listMacros, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_listFilterTail)(L_list));
});
})(++Leisure_traceInstance, L$instance))(L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("listFilterTail", 1, "listFilterTail list = list\r\n  \\h t D . isTokenString h '|'\r\n    > (length t) 2\r\n      cons h (cons (removeLast t) (cons (last t) nil))\r\n      list\r\n    cons h (listFilterTail t)\r\n  nil", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_h, "|")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$z)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_length)(L_t));
});
})(++Leisure_traceInstance, L$instance), 2)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_removeLast)(L_t));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_last)(L_t));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_list));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_listFilterTail)(L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filterApplies", 2, "filterApplies code func = isParens code\r\n  code \\start end contents . parens start end (filterApplies contents func)\r\n  isCons code\r\n    \\\\\r\n      filtered = filterApplyElements code func\r\n      .\r\n      and (isCons filtered) (isBlockStart (head filtered))\r\n        filtered\r\n        func filtered\r\n    code", lazy((function(){
  var L$F = function(L_code, L_func) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_code, L_func),
  Leisure_traceReturn(L$F, (resolve(L_isParens)(L_code)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_code)(lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_contents){return (
  Leisure_traceCall(L$F, L_contents),
  Leisure_traceReturn(L$F, (resolve(L_parens)(L_start, L_end, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterApplies)(L_contents, L_func));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_code)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_filtered;
  L_filtered = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterApplyElements)(L_code, L_func));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_filtered));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isBlockStart)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_filtered));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_filtered)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)(L_filtered));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance))(L_code));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filterApplyElements", 2, "filterApplyElements code func = code\r\n  \\h t D . isBlockStart h\r\n    cons h (filterBlock h t func)\r\n    cons (filterApplies h func)\r\n      and (isCons t) (isBlockStart (head t))\r\n        cons (filterApplyElements t func) nil\r\n        filterApplyElements t func\r\n  nil", lazy((function(){
  var L$F = function(L_code, L_func) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_code, L_func),
  Leisure_traceReturn(L$F, (L$(resolve(L_code))(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_isBlockStart)(L_h)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterBlock)(L_h, L_t, L_func));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterApplies)(L_h, L_func));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_t));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isBlockStart)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterApplyElements)(L_t, L_func));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterApplyElements)(L_t, L_func));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()), L_nil)))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filterBlock", 3, "filterBlock type code func = isTokenString type '\\\\'\r\n  filterLambda code func\r\n  filterLet code func", lazy((function(){
  var L$F = function(L_type, L_code, L_func) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_type, L_code, L_func),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_type, "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterLambda)(L_code, L_func));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterLet)(L_code, L_func));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filterLet", 2, "filterLet code func = code \\h t . isTokenString h '.'\r\n  cons h (filterApplies t func)\r\n  cons (filterLetBinding h func)\r\n    filterLet t func", lazy((function(){
  var L$F = function(L_code, L_func) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_code, L_func),
  Leisure_traceReturn(L$F, (resolve(L_code)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_isTokenString)(L_h, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterApplies)(L_t, L_func));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterLetBinding)(L_h, L_func));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterLet)(L_t, L_func));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filterLetBinding", 2, "filterLetBinding code func = isParens code\r\n  setParens code \\contents . filterLetBinding contents func\r\n  isCons code\r\n    code \\h t . cons h\r\n      isTokenString h '='\r\n        filterApplies t func\r\n        filterLetBinding t func\r\n    code", lazy((function(){
  var L$F = function(L_code, L_func) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_code, L_func),
  Leisure_traceReturn(L$F, (resolve(L_isParens)(L_code)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setParens)(L_code, lazy((function(){
  var L$F = function(L_contents){return (
  Leisure_traceCall(L$F, L_contents),
  Leisure_traceReturn(L$F, (resolve(L_filterLetBinding)(L_contents, L_func)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_code)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_code)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_h, "=")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterApplies)(L_t, L_func));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterLetBinding)(L_t, L_func));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))(L_code));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("filterLambda", 2, "filterLambda code func = code \\h t . cons h\r\n  isTokenString h '.'\r\n    filterApplies t func\r\n    filterLambda t func", lazy((function(){
  var L$F = function(L_code, L_func) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_code, L_func),
  Leisure_traceReturn(L$F, (resolve(L_code)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_h, ".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterApplies)(L_t, L_func));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filterLambda)(L_t, L_func));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("[", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_listify)(L_h)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("listMacros", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("[", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("{", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addParseFilter)(L_listFilter);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addTokenGroup)("{", "}");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("{", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_listifyOp)("aconsPair", L_h, "nil")))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defTokenPack)("list", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("|", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("=", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aconsPair)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("{", "}"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aconsPair)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("[", "]"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aconsPair)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("or[", "]"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aconsPair)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("and[", "]"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aconsPair)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("concat[", "]"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aconsPair)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("print[", "]"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_aconsPair)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("concatFlat[", "]"));
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_listFilter, L_nil));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addTokenGroup)("or[", "]");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addTokenGroup)("and[", "]");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addTokenGroup)("concat[", "]");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addTokenGroup)("print[", "]");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addTokenGroup)("concatFlat[", "]");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("listMacroFoldOp", 3, "listMacroFoldOp op emptyCase list = list \\h t . _foldr\r\n    \\case result . [op case result]\r\n    emptyCase\r\n    h", lazy((function(){
  var L$F = function(L_op, L_emptyCase, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_op, L_emptyCase, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L__foldr)(lazy((function(){
  var L$F = function(L_case){return (
  Leisure_traceCall(L$F, L_case),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_op, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_case, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_result, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()), L_emptyCase, L_h)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("or[", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_listMacroFoldOp)("or", "false", L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("and[", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_listMacroFoldOp)("and", "true", L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("print[", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_cons)("print", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("strCat", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_listify)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("concat[", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_cons)("strCat", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_listify)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("concatFlat[", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_cons)("strCat", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("flatten", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_listify)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("infix", 1, "infix code = primBind (getValue 'infixPrecedence')\r\n  \\prec . primBind (getValue 'infixRightAssociative')\r\n    \\right . primBind (getValue 'tokenGroups')\r\n      \\groups . filterApplies\r\n        code\r\n        \\expr . infixRearrange prec right (_map (\\cell . tail cell) groups) expr", lazy((function(){
  var L$F = function(L_code){return (
  Leisure_traceCall(L$F, L_code),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("infixPrecedence"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_prec){return (
  Leisure_traceCall(L$F, L_prec),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("infixRightAssociative"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_right){return (
  Leisure_traceCall(L$F, L_right),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenGroups"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (resolve(L_filterApplies)(L_code, lazy((function(){
  var L$F = function(L_expr){return (
  Leisure_traceCall(L$F, L_expr),
  Leisure_traceReturn(L$F, (resolve(L_infixRearrange)(L_prec, L_right, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)(lazy((function(){
  var L$F = function(L_cell){return (
  Leisure_traceCall(L$F, L_cell),
  Leisure_traceReturn(L$F, (resolve(L_tail)(L_cell)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()), L_groups));
});
})(++Leisure_traceInstance, L$instance), L_expr)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("infixRearrange", 4, "infixRearrange prec right closes list = \\\\\r\n  len = length list\r\n  head1 = head list\r\n  tail1 = tail list\r\n  head2 = head tail1\r\n  tail2 = tail tail1\r\n  head3 = head tail2\r\n  opPrec = getPrec prec head2\r\n  .\r\n  < len 2\r\n    list\r\n    isInfix opPrec head1 head2 len\r\n      or (== len 2) (not (isInfixArg closes head3))\r\n        [[head2 head1] | tail2]\r\n        infixRearrange prec right closes (absorbArgument opPrec prec right closes head1 head2 tail2 head3 (- len 2))\r\n      [head1 | infixRearrange prec right closes tail1]", lazy((function(){
  var L$F = function(L_prec, L_right, L_closes, L_list) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_prec, L_right, L_closes, L_list),
  Leisure_traceReturn(L$F, ((function(){  var L_len, L_head1, L_tail1, L_head2, L_tail2, L_head3, L_opPrec;
  L_len = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_length)(L_list));
});
})(++Leisure_traceInstance, L$instance);
  L_head1 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance);
  L_tail1 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance);
  L_head2 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_tail1));
});
})(++Leisure_traceInstance, L$instance);
  L_tail2 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_tail1));
});
})(++Leisure_traceInstance, L$instance);
  L_head3 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_tail2));
});
})(++Leisure_traceInstance, L$instance);
  L_opPrec = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getPrec)(L_prec, L_head2));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_$y)(L_len, 2)(L_list)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isInfix)(L_opPrec, L_head1, L_head2, L_len)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$p$p)(L_len, 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isInfixArg)(L_closes, L_head3));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head2, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head1, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_tail2));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_infixRearrange)(L_prec, L_right, L_closes, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_absorbArgument)(L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$_)(L_len, 2));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_infixRearrange)(L_prec, L_right, L_closes, L_tail1));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 21, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("absorbArgument", 9, "absorbArgument opPrec prec right closes head1 head2 tail2 head3 len = \\\\\r\n  tail3 = tail tail2\r\n  head4 = head tail3\r\n  tail4 = tail tail3\r\n  head5 = head tail4\r\n  .\r\n  infixShouldEatNext opPrec prec (_contains right (strTokenString head2)) head3 head4 head5 closes len\r\n    [head1 head2 | absorbArgument (getPrec prec head4) prec right closes head3 head4 tail4 head5 (- len 2)]\r\n    [[head2 head1 head3] | tail3]", lazy((function(){
  var L$F = function(L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, L_len) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_opPrec, L_prec, L_right, L_closes, L_head1, L_head2, L_tail2, L_head3, L_len),
  Leisure_traceReturn(L$F, ((function(){  var L_tail3, L_head4, L_tail4, L_head5;
  L_tail3 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_tail2));
});
})(++Leisure_traceInstance, L$instance);
  L_head4 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_tail3));
});
})(++Leisure_traceInstance, L$instance);
  L_tail4 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_tail3));
});
})(++Leisure_traceInstance, L$instance);
  L_head5 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_tail4));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_infixShouldEatNext)(L_opPrec, L_prec, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__contains)(L_right, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strTokenString)(L_head2));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_head3, L_head4, L_head5, L_closes, L_len)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head2, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_absorbArgument)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getPrec)(L_prec, L_head4));
});
})(++Leisure_traceInstance, L$instance), L_prec, L_right, L_closes, L_head3, L_head4, L_tail4, L_head5, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$_)(L_len, 2));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head2, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_head3, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_tail3));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 9;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isInfixArg", 2, "isInfixArg closes item = or[\r\n  isParens item\r\n  isCons item\r\n  and[\r\n    isToken item\r\n    not (_contains closes (tokenString item))\r\n    not (isBlockStart item)]]", lazy((function(){
  var L$F = function(L_closes, L_item) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_closes, L_item),
  Leisure_traceReturn(L$F, (resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isParens)(L_item));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)(L_item));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_item));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__contains)(L_closes, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_item));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isBlockStart)(L_item));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_true));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_false));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("isInfix", 4, "isInfix opPrec head1 head2 len = and[\r\n  > len 1\r\n  > opPrec -1\r\n  isInfixArg nil head1]", lazy((function(){
  var L$F = function(L_opPrec, L_head1, L_head2, L_len) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_opPrec, L_head1, L_head2, L_len),
  Leisure_traceReturn(L$F, (resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$z)(L_len, 1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$z)(L_opPrec, -1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isInfixArg)(L_nil, L_head1));
});
})(++Leisure_traceInstance, L$instance), L_true));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 6, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("getPrec", 2, "getPrec prec token = \\\\\r\n  str = tokenString token\r\n  .\r\n  isToken token\r\n    findIndex (\\level . _contains level str) prec\r\n    -1", lazy((function(){
  var L$F = function(L_prec, L_token) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_prec, L_token),
  Leisure_traceReturn(L$F, ((function(){  var L_str;
  L_str = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_token));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isToken)(L_token)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_findIndex)(lazy((function(){
  var L$F = function(L_level){return (
  Leisure_traceCall(L$F, L_level),
  Leisure_traceReturn(L$F, (resolve(L__contains)(L_level, L_str)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()), L_prec));
});
})(++Leisure_traceInstance, L$instance))(-1)})()))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("infixShouldEatNext", 8, "infixShouldEatNext opPrec prec isRight curArg nextOp nextArg closes len = \\\\\r\n  nextPrec = getPrec prec nextOp\r\n  .\r\n  and[\r\n    > len 2\r\n    isInfix nextPrec curArg nextOp len\r\n    or (> opPrec nextPrec) (and (== opPrec nextPrec) isRight)\r\n    isInfixArg closes nextArg]", lazy((function(){
  var L$F = function(L_opPrec, L_prec, L_isRight, L_curArg, L_nextOp, L_nextArg, L_closes, L_len) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_opPrec, L_prec, L_isRight, L_curArg, L_nextOp, L_nextArg, L_closes, L_len),
  Leisure_traceReturn(L$F, ((function(){  var L_nextPrec;
  L_nextPrec = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getPrec)(L_prec, L_nextOp));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$z)(L_len, 2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isInfix)(L_nextPrec, L_curArg, L_nextOp, L_len));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$z)(L_opPrec, L_nextPrec));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$p$p)(L_opPrec, L_nextPrec));
});
})(++Leisure_traceInstance, L$instance), L_isRight));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_and)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isInfixArg)(L_closes, L_nextArg));
});
})(++Leisure_traceInstance, L$instance), L_true));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 8;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)(":", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_cons)("cons", L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("iprec", 0, "iprec = [['*' '/' '%'] ['+' '-'] [':'] ['<' '>' '<=' '>='] ['==' '!='] ['&&' '||']]", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("*", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("/", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("%", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("+", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("-", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(":", L_nil));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(">", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<=", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(">=", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("==", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("!=", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("&&", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("||", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
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
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("rightAssoc", 0, "rightAssoc = [':']", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(":", L_nil));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("setPrecedenceLevels", 1, "setPrecedenceLevels levels = primBind\r\n  setValue 'infixPrecedence' levels\r\n  \\_ . doall (_map addInfixProp (flatten levels))", lazy((function(){
  var L$F = function(L_levels){return (
  Leisure_traceCall(L$F, L_levels),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("infixPrecedence", L_levels));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_doall)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__map)(L_addInfixProp, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_flatten)(L_levels));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("addInfixProp", 1, "addInfixProp funcName = getFunction funcName\r\n  \\func . setProperty func 'infix' true\r\n  nil", lazy((function(){
  var L$F = function(L_funcName){return (
  Leisure_traceCall(L$F, L_funcName),
  Leisure_traceReturn(L$F, (resolve(L_getFunction)(L_funcName)(lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, (resolve(L_setProperty)(L_func, "infix", L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))(L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setPrecedenceLevels)(L_iprec);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("infixRightAssociative", L_rightAssoc);
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defTokenPack)("infix", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_flatten)(L_iprec));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_infix, L_nil));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_useTokenPack)("infix");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defMacro)("do", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L__withRecur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_handleDo)(L_list, L_false, L_id));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("handleDo", 3, "handleDo list inLet cont = list\r\n  \\h t D . isNil t\r\n    cont (inLet ['.' h] [h])\r\n    \\\\\r\n      next = doClause (stripParens h) h nil inLet\r\n      newInLet = head next\r\n      chain = tail next\r\n      .\r\n      recur handleDo t newInLet \\rest . cont (chain rest)\r\n  cont nil", lazy((function(){
  var L$F = function(L_list, L_inLet, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_list, L_inLet, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_t)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_inLet))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_next, L_newInLet, L_chain;
  L_next = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_doClause)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_stripParens)(L_h));
});
})(++Leisure_traceInstance, L$instance), L_h, L_nil, L_inLet));
});
})(++Leisure_traceInstance, L$instance);
  L_newInLet = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_next));
});
})(++Leisure_traceInstance, L$instance);
  L_chain = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_next));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L__recur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_handleDo)(L_t, L_newInLet, lazy((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (resolve(L_cont)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_chain)(L_rest));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 16, L$F.L$instanceId);
  return L$F;
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)(L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 18, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("doClause", 4, "doClause steppingClause clause prefix inLet = \\\\\r\n  makeBind var value = cons false \\rest . inLet (cons '.') id\r\n    ['bind' value ['\\\\' var '.' | rest]]\r\n  h = head steppingClause\r\n  t = tail steppingClause\r\n  .\r\n  isCons steppingClause\r\n    isTokenString h '='\r\n      cons true \\rest . inLet\r\n        [clause | rest]\r\n        ['\\\\\\\\' clause | rest]\r\n      isTokenString h '<-'\r\n        isNil t\r\n          parseErr \"No value in do-clause: \" clause\r\n          prefix\r\n            \\ph pt D . isNil pt\r\n              makeBind (isNil prefix '_' (head prefix)) t\r\n              any (\\el . not (or (isString el) (isToken el))) prefix\r\n                parseErr \"Non-variable for bind in do clause: \" clause\r\n                cons false \\rest . inLet (cons '.') id\r\n                  ['bind' t (_append ['\\\\' | prefix] ['.' | rest])]\r\n            makeBind '_' t\r\n        doClause t clause [h | prefix] inLet\r\n    makeBind '_' clause", lazy((function(){
  var L$F = function(L_steppingClause, L_clause, L_prefix, L_inLet) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_steppingClause, L_clause, L_prefix, L_inLet),
  Leisure_traceReturn(L$F, ((function(){  var L_makeBind, L_h, L_t;
  L_makeBind = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_var){return (
  Leisure_traceCall(L$F, L_var),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, (resolve(L_cons)(L_false, lazy((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_inLet))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("."));
});
})(++Leisure_traceInstance, L$instance), L_id, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("bind", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_value, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_var, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", L_rest));
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
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 9, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 10, L$F.L$instanceId);
  return L$F;
})());
});
})(++Leisure_traceInstance, L$instance);
  L_h = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_steppingClause));
});
})(++Leisure_traceInstance, L$instance);
  L_t = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_steppingClause));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_isCons)(L_steppingClause)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 47, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_h, "=")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_true, lazy((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_inLet))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_clause, L_rest));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_clause, L_rest));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 17, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 46, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isTokenString)(L_h, "<-")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 43, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_t)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No value in do-clause: ", L_clause));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 42, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_prefix))(lazy((function(){
  var L$F = function(L_ph){return (
  Leisure_traceCall(L$F, L_ph),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pt){return (
  Leisure_traceCall(L$F, L_pt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_isNil)(L_pt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_prefix)("_")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_prefix));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_t));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 37, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_any)(lazy((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_or)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isString)(L_el));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_el));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 26, L$F.L$instanceId);
  return L$F;
})()), L_prefix)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Non-variable for bind in do clause: ", L_clause));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 36, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_false, lazy((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_inLet))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 28, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("."));
});
})(++Leisure_traceInstance, L$instance), L_id, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 34, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("bind", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 33, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 32, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__append)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 29, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("\\", L_prefix));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(".", L_rest));
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
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 35, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 38, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 39, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 40, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 41, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeBind)("_")(L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 45, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_doClause)(L_t, L_clause, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 44, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_h, L_prefix));
});
})(++Leisure_traceInstance, L$instance), L_inLet));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 48, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_makeBind)("_")(L_clause));
});
})(++Leisure_traceInstance, L$instance))})()))
);
};;
  L$F.leisureLength = 4;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 49, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("triple", 3, "triple a b c = \\f . f a b c", lazy(setDataType((function(){
  var L$F = function(L_a, L_b, L_c) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_a, L_b, L_c),
  Leisure_traceReturn(L$F, (setType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)(L_a)(L_b)(L_c)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'triple')))
);
};;
  L$F.leisureLength = 3;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), 'triple')));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("triple1", 1, "triple1 t = t \\a b c . a", lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_t)(lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_c){return (
  Leisure_traceCall(L$F, L_c),
  Leisure_traceReturn(L$F, (resolve(L_a)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("triple2", 1, "triple2 t = t \\a b c . b", lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_t)(lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_c){return (
  Leisure_traceCall(L$F, L_c),
  Leisure_traceReturn(L$F, (resolve(L_b)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("triple3", 1, "triple3 t = t \\a b c . c", lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_t)(lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_c){return (
  Leisure_traceCall(L$F, L_c),
  Leisure_traceReturn(L$F, (resolve(L_c)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_newDefine)("bind", 2, "bind x cont = isIO x\r\n  primBind x cont\r\n  cont x", lazy((function(){
  var L$F = function(L_x, L_cont) {
  return L_checkPartial(L$F, arguments) || (
  Leisure_traceCall(L$F, L_x, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_isIO)(L_x)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_primBind)(L_x, L_cont));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)(L_x));
});
})(++Leisure_traceInstance, L$instance))))
);
};;
  L$F.leisureLength = 2;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addToken)("<-");
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_defTokenPack)("do", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("<-", L_nil));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)(L_nil, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return (function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_addStdTokenPacks)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("do", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("list", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)("infix", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance)},
    function(){return resolve(L_resetStdTokenPacks)}
  ]);
});
//# sourceMappingURL=generatedPrelude.map
