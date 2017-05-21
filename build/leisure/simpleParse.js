'use strict';
define([], function(){
  if (typeof module != 'undefined') require('source-map-support').install();
  return L_runMonads([
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setNameSpace)("core");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("err", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("boolean", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("true", "boolean");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("false", "boolean");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("option", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("some", "option");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("none", "option");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("either", 0);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("left", "either");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("right", "either");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L__declareType)("keyedSequence", "sequence");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("asIO", 1, "asIO x = x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("fakereturn", 1, "fakereturn x = x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_recur", 1, "_recur x = \\f . f x", lazy(setDataType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("true", 0, "true = \\a b . a", lazy(setDataType(setType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("false", 0, "false = \\a b . b", lazy(setDataType(setType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("not", 1, "not b = b false true", lazy((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_b)(L_false)(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("and", 2, "and a b = a b false", lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_a)(L_b)(L_false)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("&&", 0, "&& = and", L_and);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("or", 2, "or a b = a true b", lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_a)(L_true)(L_b)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("||", 0, "|| = or", L_or);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("some", 1, "some x = \\someCase noneCase . someCase x", lazy(setDataType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("none", 0, "none = \\someCase noneCase . noneCase", lazy(setDataType(setType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isNone", 1, "isNone obj = hasType obj none", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_obj, L_none)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isSome", 1, "isSome obj = hasType obj some", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_obj, L_some)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isOption", 1, "isOption obj = or (isSome obj) (isNone obj)", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("neq", 2, "neq a b = not (eq a b)", lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_not)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_a, L_b));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("left", 1, "left x = \\lCase rCase . lCase x", lazy(setDataType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("right", 1, "right x = \\lCase rCase . rCase x", lazy(setDataType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isEither", 1, "isEither obj = or (hasType obj left) (hasType obj right)", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isString", 1, "isString s = == (getType s) 'string'", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isNumber", 1, "isNumber s = == (getType s) 'number'", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strAsc", 1, "strAsc string = _strAsc (assertType 'strAsc string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strAsc)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strAsc string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strChr", 1, "strChr ascii = _strChr (assertType 'strChr string' 'number' ascii)", lazy((function(){
  var L$F = function(L_ascii){return (
  Leisure_traceCall(L$F, L_ascii),
  Leisure_traceReturn(L$F, (resolve(L__strChr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strChr string", "number", L_ascii));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strAt", 2, "strAt string index = _strAt\n  assertType 'strAt string' 'string' string\n  assertType 'strAt index' 'number' index", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_index){return (
  Leisure_traceCall(L$F, L_index),
  Leisure_traceReturn(L$F, (resolve(L__strAt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strAt string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strAt index", "number", L_index));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strStartsWith", 2, "strStartsWith string prefix = _strStartsWith\n  assertType 'strStartsWith string' 'string' string\n  assertType 'strStartsWith prefix' 'string' prefix", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_prefix){return (
  Leisure_traceCall(L$F, L_prefix),
  Leisure_traceReturn(L$F, (resolve(L__strStartsWith)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strStartsWith string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strStartsWith prefix", "string", L_prefix));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strLen", 1, "strLen string = _strLen (assertType 'strLen string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strLen)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strLen string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strReverse", 1, "strReverse string = _strReverse (assertType 'strLen string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strReverse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strLen string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strToLowerCase", 1, "strToLowerCase string = _strToLowerCase (assertType 'strToLowerCase string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strToLowerCase)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strToLowerCase string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strToUpperCase", 1, "strToUpperCase string = _strToUpperCase (assertType 'strToUpperCase string' 'string' string)", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, (resolve(L__strToUpperCase)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strToUpperCase string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strReplace", 3, "strReplace string pat repl = _strReplace\n  assertType 'strReplace string' 'string' string\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strStartsWith pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat\n  assertType 'strReplace repl' 'string' repl", lazy((function(){
  var L$F = function(L_string){return (
  Leisure_traceCall(L$F, L_string),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_repl){return (
  Leisure_traceCall(L$F, L_repl),
  Leisure_traceReturn(L$F, (resolve(L__strReplace)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strReplace string", "string", L_string));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_cons))("strStartsWith pat should be type string or RegExp but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_pat));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_assertType))("strReplace repl", "string", L_repl));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strSubstring", 3, "strSubstring str start end = _strSubstring\n  assertType 'strSubstring str' 'string' str\n  assertType 'strSubstring start' 'number' start\n  assertType 'strSubstring end' 'number' end", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, (resolve(L__strSubstring)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strSubstring str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strSubstring start", "number", L_start));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strSubstring end", "number", L_end));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strSplit", 2, "strSplit str pat = _strSplit\n  assertType 'strSplit str' 'string' str\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strSplit pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, (resolve(L__strSplit)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strSplit str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_cons))("strSplit pat should be type string or RegExp but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_pat));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strCat", 1, "strCat list = _strCat\n  assert (isList list) (strCat (cons 'strCat list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L_cons))("strCat list should be type cons or nil but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(": ", (function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strAdd", 2, "strAdd str1 str2 = _strAdd (assertType 'strAdd str1' 'string' str1) (assertType 'strAdd str2' 'string' str2)", lazy((function(){
  var L$F = function(L_str1){return (
  Leisure_traceCall(L$F, L_str1),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str2){return (
  Leisure_traceCall(L$F, L_str2),
  Leisure_traceReturn(L$F, (resolve(L__strAdd)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strAdd str1", "string", L_str1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strAdd str2", "string", L_str2));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strMatch", 2, "strMatch str pat = _strMatch\n  assertType 'strMatch str' 'string' str\n  assert (or (hasType pat 'string') (hasType pat '*RegExp')) (strCat (cons 'strMatch pat should be type string or RegExp but it is type ' (cons (getType pat) (cons ': ' (cons (show pat) nil))))) pat", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, (resolve(L__strMatch)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strMatch str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_cons))("strMatch pat should be type string or RegExp but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_pat));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strToList", 1, "strToList str = _strToList (assertType 'strToList str' 'string' str)", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L__strToList)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("strToList str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strFromList", 1, "strFromList list = _strFromList\n  assert (isList list) (strCat (cons 'strFromList list should be type cons or nil but it is type ' (cons (getType list) (cons ': ' (cons list))))) list", lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L_cons))("strFromList list should be type cons or nil but it is type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(": ", (function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("regexp", 1, "regexp str = _regexp (assertType 'regexp str' 'string' str)", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L__regexp)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("regexp str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("regexpFlags", 2, "regexpFlags str flags = _regexpFlags\n  assertType 'regexp str' 'string' str\n  assertType 'regexp flags' 'string' flags", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_flags){return (
  Leisure_traceCall(L$F, L_flags),
  Leisure_traceReturn(L$F, (resolve(L__regexpFlags)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("regexp str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("regexp flags", "string", L_flags));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("jsonParse", 3, "jsonParse str failure success = _jsonParse\n  assertType 'jsonParse str' 'string' str\n  failure\n  success", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_failure){return (
  Leisure_traceCall(L$F, L_failure),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_success){return (
  Leisure_traceCall(L$F, L_success),
  Leisure_traceReturn(L$F, (resolve(L__jsonParse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_assertType))("jsonParse str", "string", L_str));
});
})(++Leisure_traceInstance, L$instance), L_failure, L_success)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("show", 1, "show x = _show x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L__show)(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("equal", 2, "equal x y = eq x y", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_y){return (
  Leisure_traceCall(L$F, L_y),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_x, L_y)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("id", 1, "id x = x", lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("unit", 0, "unit = \\x . x", lazy(setDataType(setType((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_x)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})(), 'unit'), 'unit')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("compose", 2, "compose f g = \\x . f (g x)", lazy(setDataType((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_g){return (
  Leisure_traceCall(L$F, L_g),
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
})(), 'compose')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("flip", 1, "flip func = \\x y . func y x", lazy(setDataType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("withCons", 3, "withCons l nilCase cont = isCons l (l (\\h t D . cont h t) nilCase) nilCase", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_nilCase){return (
  Leisure_traceCall(L$F, L_nilCase),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_cont){return (
  Leisure_traceCall(L$F, L_cont),
  Leisure_traceReturn(L$F, (L$(resolve(L_isCons))(L_l, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_cont)(L_h)(L_t)))
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
})()))(L_nilCase));
});
})(++Leisure_traceInstance, L$instance), L_nilCase)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("cons", 2, "cons a b = \\f . f a b", lazy(setDataType((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
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
})(), 'cons')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isCons", 1, "isCons c = hasType c cons", lazy((function(){
  var L$F = function(L_c){return (
  Leisure_traceCall(L$F, L_c),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_c, L_cons)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isList", 1, "isList l = or (hasType l cons) (hasType l nil)", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("assertType", 3, "assertType msg type value =\n  assert\n    hasType value type\n    strCat (cons msg (cons ' should be type ' (cons (getDataType type) (cons ', but its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))))\n    value", lazy((function(){
  var L$F = function(L_msg){return (
  Leisure_traceCall(L$F, L_msg),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_type){return (
  Leisure_traceCall(L$F, L_type),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, (resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_value, L_type));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_msg, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(" should be type ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getDataType)(L_type));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(", but its type is ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_value));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("nil", 0, "nil = \\a b . b", lazy(setDataType(setType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isNil", 1, "isNil n = hasType n nil", lazy((function(){
  var L$F = function(L_n){return (
  Leisure_traceCall(L$F, L_n),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_n, L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("head", 1, "head l = l \\h t . h", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("tail", 1, "tail l = l \\h t . t", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("last", 1, "last l = isNil (tail l)\n  head l\n  last (tail l)", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_l));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("removeLast", 1, "removeLast l = isNil (tail l)\n  nil\n  cons (head l) (removeLast (tail l))", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance), L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("length", 1, "length list = isCons list\n  + 1 (length (tail list))\n  assert (hasType list nil) (strCat (cons \"length argument is not a proper list: \" (cons list nil))) 0", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_isCons))(L_list, (function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_hasType)(L_list, L_nil));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("length argument is not a proper list: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_list, L_nil));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_foldl", 3, "_foldl func initialValue l = l (\\h t D . foldl func (func initialValue h) t) initialValue", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_initialValue){return (
  Leisure_traceCall(L$F, L_initialValue),
  Leisure_traceReturn(L$F, ((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_foldl))(L_func, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)(L_initialValue)(L_h));
});
})(++Leisure_traceInstance, L$instance), L_t)))
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
})()))(L_initialValue)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_foldl1", 2, "_foldl1 func l = l \\h t . foldl func h t", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (resolve(L_l)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (L$(resolve(L_foldl))(L_func, L_h, L_t)))
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_foldr", 3, "_foldr func finalValue list = list\n  \\h t D . func h (foldr func finalValue t)\n  finalValue", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_finalValue){return (
  Leisure_traceCall(L$F, L_finalValue),
  Leisure_traceReturn(L$F, ((function(){
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
  Leisure_traceReturn(L$F, (resolve(L_func)(L_h)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_foldr))(L_func, L_finalValue, L_t));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_foldr1", 2, "_foldr1 func list = list \\h t . isNil t\n  h\n  func h (foldr1 func t)", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))(L_t, L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)(L_h)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_foldr1))(L_func, L_t));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_append", 2, "_append a b = _foldr cons b a", lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (L$(resolve(L__foldr))(L_cons, L_b, L_a)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("foldl", 0, "foldl = _foldl", L__foldl);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("foldl1", 0, "foldl1 = _foldl1", L__foldl1);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("foldr", 0, "foldr = _foldr", L__foldr);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("foldr1", 0, "foldr1 = _foldr1", L__foldr1);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("append", 0, "append = _append", L__append);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_reverse", 1, "_reverse l = rev l nil", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (L$(resolve(L_rev))(L_l, L_nil)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("reverse", 0, "reverse = _reverse", L__reverse);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("rev", 2, "rev l result = isNil l\n  result\n  rev (tail l) (cons (head l) result)", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))(L_l, L_result, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_rev))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_l));
});
})(++Leisure_traceInstance, L$instance), L_result));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_flatten", 1, "_flatten list = isCons list\n  subflatten list nil\n  list", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_isCons))(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_subflatten))(L_list, L_nil));
});
})(++Leisure_traceInstance, L$instance), L_list)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("flatten", 0, "flatten = _flatten", L__flatten);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("subflatten", 2, "subflatten list result = isNil list\n  result\n  isCons list\n    subflatten (head list) (subflatten (tail list) result)\n    cons list result", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))(L_list, L_result, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isCons))(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_subflatten))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_subflatten))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
});
})(++Leisure_traceInstance, L$instance), L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_list, L_result));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_filter", 2, "_filter func list = isNil list\n  nil\n  func (head list) (cons (head list)) id (_filter func (tail list))", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))(L_list, L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_list));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_id)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__filter))(L_func, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_list));
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 8, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("filter", 0, "filter = _filter", L__filter);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_find", 2, "_find predicate list =\n  foldr (\\item result . (predicate item) (some item) result) none list", lazy((function(){
  var L$F = function(L_predicate){return (
  Leisure_traceCall(L$F, L_predicate),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_foldr))(lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_predicate)(L_item)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_some)(L_item));
});
})(++Leisure_traceInstance, L$instance))(L_result)))
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
})()), L_none, L_list)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("find", 0, "find = _find", L__find);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_contains", 2, "_contains list item = find (\\el . eq el item) list (\\x . true) false", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (L$(resolve(L_find))(lazy((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_el, L_item)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()), L_list, lazy((function(){
  var L$F = function(L_x){return (
  Leisure_traceCall(L$F, L_x),
  Leisure_traceReturn(L$F, (resolve(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()), L_false)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("findIndex", 2, "findIndex func list = idx list func 0", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_idx))(L_list, L_func, 0)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("idx", 3, "idx list func pos = list\n  \\h t D . func h\n    pos\n    idx t func (+ 1 pos)\n  -1", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_func)(L_h)(L_pos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_idx))(L_t, L_func, (function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("index", 2, "index list el = find (\\item . == el item) list", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (L$(resolve(L_find))(lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (resolve(L_$p$p)(L_el, L_item)))
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_map", 2, "_map func l = isCons l\n  cons (func (head l)) (_map func (tail l))\n  l", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (L$(resolve(L_isCons))(L_l, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_l));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__map))(L_func, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_l));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_l)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("map", 0, "map = _map", L__map);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("intersperse", 2, "intersperse list element = list (\\h t D .\n  isNil t\n    list\n    cons h (cons element (intersperse t element))) nil", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_element){return (
  Leisure_traceCall(L$F, L_element),
  Leisure_traceReturn(L$F, (resolve(L_list)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))(L_t, L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_element, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_intersperse))(L_t, L_element));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("join", 2, "join list el = strCat (intersperse list el)", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_el){return (
  Leisure_traceCall(L$F, L_el),
  Leisure_traceReturn(L$F, (resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_intersperse))(L_list, L_el));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("assertAlist", 3, "assertAlist msg value result = assert (isAlist value) (strCat (cons msg (cons ' should be a association list, but it is not; its type is ' (cons (getType value) (cons ': ' (cons (show value) nil)))))) result", lazy((function(){
  var L$F = function(L_msg){return (
  Leisure_traceCall(L$F, L_msg),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_assert)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isAlist)(L_value));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_msg, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(" should be a association list, but it is not; its type is ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getType)(L_value));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(": ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("acons", 3, "acons k v alist = assertAlist \"acons alist\" alist (\\@ type cons . \\f . \\@ assoc true . f (cons k v) alist)", lazy((function(){
  var L$F = function(L_k){return (
  Leisure_traceCall(L$F, L_k),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_v){return (
  Leisure_traceCall(L$F, L_v),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_alist){return (
  Leisure_traceCall(L$F, L_alist),
  Leisure_traceReturn(L$F, (L$(resolve(L_assertAlist))("acons alist", L_alist, lazy(setType(setLambdaProperties((function(){
  var L$F = function(L_f){return (
  Leisure_traceCall(L$F, L_f),
  Leisure_traceReturn(L$F, (resolve(L_f)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_k, L_v));
});
})(++Leisure_traceInstance, L$instance))(L_alist)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})(), {"assoc":"true"}), 'cons')))))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("assoc", 2, "assoc k alist  = find (\\el . eq k (head el)) alist (\\cell . cell \\head tail . some tail) none", lazy((function(){
  var L$F = function(L_k){return (
  Leisure_traceCall(L$F, L_k),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_alist){return (
  Leisure_traceCall(L$F, L_alist),
  Leisure_traceReturn(L$F, (L$(resolve(L_find))(lazy((function(){
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
})()), L_alist, lazy((function(){
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
})()), L_none)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("rassoc", 2, "rassoc v alist = find (\\el . eq v (tail el)) alist (\\cell . cell \\head tail . some head) none", lazy((function(){
  var L$F = function(L_v){return (
  Leisure_traceCall(L$F, L_v),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_alist){return (
  Leisure_traceCall(L$F, L_alist),
  Leisure_traceReturn(L$F, (L$(resolve(L_find))(lazy((function(){
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
})()), L_alist, lazy((function(){
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
})()), L_none)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isAlist", 1, "isAlist obj = or (isNil obj) (hasProperty obj 'assoc')", lazy((function(){
  var L$F = function(L_obj){return (
  Leisure_traceCall(L$F, L_obj),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_obj));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_hasProperty))(L_obj, "assoc"));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("aconsPair", 2, "aconsPair keyValue list = \\@ type cons . \\f . \\@ assoc true . f keyValue list", lazy((function(){
  var L$F = function(L_keyValue){return (
  Leisure_traceCall(L$F, L_keyValue),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("appendAlist", 2, "appendAlist a b = _foldr aconsPair a b", lazy((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (L$(resolve(L__foldr))(L_aconsPair, L_a, L_b)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("keys", 1, "keys list = _map (\\l . head l) list", lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L__map))(lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("getProperty", 2, "getProperty func prop = assoc prop (getProperties func)", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_prop){return (
  Leisure_traceCall(L$F, L_prop),
  Leisure_traceReturn(L$F, (L$(resolve(L_assoc))(L_prop, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getProperties)(L_func));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("hasProperty", 2, "hasProperty func prop = getProperty func prop\n  \\_ . true\n  false", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_prop){return (
  Leisure_traceCall(L$F, L_prop),
  Leisure_traceReturn(L$F, (L$(resolve(L_getProperty))(L_func, L_prop, lazy((function(){
  var L$F = function(L__){return (
  Leisure_traceCall(L$F, L__),
  Leisure_traceReturn(L$F, (resolve(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()), L_false)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("odds", 1, "odds l = l\n  \\h t D . cons h (evens t)\n  nil", lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("evens", 1, "evens l = l\n  \\h t D . odds t\n  nil", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("cleave", 1, "cleave l = cons (evens l) (odds l)", lazy((function(){
  var L$F = function(L_l){return (
  Leisure_traceCall(L$F, L_l),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("merge", 3, "merge cmp a b = a\n  \\ah at D . b\n    \\bh bt D . cmp ah bh\n      cons ah (merge cmp at b)\n      cons bh (merge cmp a bt)\n    a\n  b", lazy((function(){
  var L$F = function(L_cmp){return (
  Leisure_traceCall(L$F, L_cmp),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_a){return (
  Leisure_traceCall(L$F, L_a),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_b){return (
  Leisure_traceCall(L$F, L_b),
  Leisure_traceReturn(L$F, (resolve(L_a)(lazy((function(){
  var L$F = function(L_ah){return (
  Leisure_traceCall(L$F, L_ah),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_at){return (
  Leisure_traceCall(L$F, L_at),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D){return (
  Leisure_traceCall(L$F, L_D),
  Leisure_traceReturn(L$F, (resolve(L_b)(lazy((function(){
  var L$F = function(L_bh){return (
  Leisure_traceCall(L$F, L_bh),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_bt){return (
  Leisure_traceCall(L$F, L_bt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_D_0){return (
  Leisure_traceCall(L$F, L_D_0),
  Leisure_traceReturn(L$F, (resolve(L_cmp)(L_ah)(L_bh)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_ah, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_merge))(L_cmp, L_at, L_b));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_bh, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_merge))(L_cmp, L_a, L_bt));
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
})()))(L_a)))
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
})()))(L_b)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("mergeSort", 2, "mergeSort cmp l = l\n  \\h t D . eq (tail l) nil\n    l\n    \\\\\n      cl = cleave l\n      e = head cl\n      o = tail cl\n      .\n      merge cmp (mergeSort cmp e) (mergeSort cmp o)\n  nil", lazy((function(){
  var L$F = function(L_cmp){return (
  Leisure_traceCall(L$F, L_cmp),
  Leisure_traceReturn(L$F, ((function(){
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

  return L$(resolve(L_merge))(L_cmp, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_mergeSort))(L_cmp, L_e));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_mergeSort))(L_cmp, L_o));
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
})()))(L_nil)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("insertSorted", 3, "insertSorted sortFunc item list = list\n  \\h t D . sortFunc item h (cons item list) (cons h (insertSorted sortFunc item t))\n  cons item nil", lazy((function(){
  var L$F = function(L_sortFunc){return (
  Leisure_traceCall(L$F, L_sortFunc),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, ((function(){
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
  Leisure_traceReturn(L$F, (resolve(L_sortFunc)(L_item)(L_h)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_item, L_list));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_insertSorted))(L_sortFunc, L_item, L_t));
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
  return Leisure_traceResolve(L$(resolve(L_cons))(L_item, L_nil));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("err", 1, "err msg = \\f . f msg", lazy(setDataType((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("errMsg", 1, "errMsg err = err \\m . m", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isErr", 1, "isErr thing = hasType thing err", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_thing, L_err)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("ifNotErr", 2, "ifNotErr thing cont = (isErr thing) thing (cont thing)", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_cont){return (
  Leisure_traceCall(L$F, L_cont),
  Leisure_traceReturn(L$F, (L$(resolve(L_isErr))(L_thing, L_thing, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)(L_thing));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setNameSpace)("parser");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("token", 2, "token txt pos = \\f . f txt pos", lazy(setDataType((function(){
  var L$F = function(L_txt){return (
  Leisure_traceCall(L$F, L_txt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
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
})(), 'token')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("tokenString", 1, "tokenString tok = tok \\t p . t", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("tokenFilepos", 1, "tokenFilepos tok = tok \\t p . p", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("tokenPos", 1, "tokenPos tok = tok \\t p . isFilepos p\n  fileposOffset p\n  p", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_tok)(lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (L$(resolve(L_isFilepos))(L_p, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposOffset)(L_p));
});
})(++Leisure_traceInstance, L$instance), L_p)))
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isToken", 1, "isToken t = hasType t token", lazy((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_t, L_token)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("emptyLineStarts", 0, "emptyLineStarts = cons 'EMPTYFILE.lsr' (cons 1 nil)", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("EMPTYFILE.lsr", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(1, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("filepos", 3, "filepos file line offset = \\f . f file line offset", lazy(setDataType((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
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
})(), 'filepos')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("fileposFile", 1, "fileposFile p = p \\file line offset . file", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("fileposLine", 1, "fileposLine p = p \\file line offset . line", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("fileposOffset", 1, "fileposOffset p = p \\file line offset . offset", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isFilepos", 1, "isFilepos p = hasType p filepos", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_p, L_filepos)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("addFilepos", 2, "addFilepos pos change = isFilepos pos pos emptyFilePos\n  \\file line offset . filepos file line (+ offset change)", lazy((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_change){return (
  Leisure_traceCall(L$F, L_change),
  Leisure_traceReturn(L$F, (L$(resolve(L_isFilepos))(L_pos, L_pos, L_emptyFilePos, lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (resolve(L_filepos)(L_file)(L_line)((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("emptyFilePos", 0, "emptyFilePos = filepos 'NOTHING.lsr' 0 0", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_filepos)("NOTHING.lsr")(0)(0));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isEmptyPos", 1, "isEmptyPos pos = and (isFilepos pos) (and (eq 0 (fileposLine pos)) (eq 0 (fileposOffset pos)))", lazy((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isFilepos)(L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("emptyFor", 1, "emptyFor thing = filepos (fileposFile (position thing)) 0 0", lazy((function(){
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
})(++Leisure_traceInstance, L$instance))(0)(0)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("startFilePos", 0, "startFilePos = emptyFilePos", L_emptyFilePos);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("filePosFor", 2, "filePosFor lineStarts offset = countFilePos (head (tail lineStarts)) 0 (tail (tail lineStarts)) offset\n  \\line offset . filepos (head lineStarts) line offset", lazy((function(){
  var L$F = function(L_lineStarts){return (
  Leisure_traceCall(L$F, L_lineStarts),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (L$(resolve(L_countFilePos))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), L_offset, lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset_0){return (
  Leisure_traceCall(L$F, L_offset_0),
  Leisure_traceReturn(L$F, (resolve(L_filepos)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_lineStarts));
});
})(++Leisure_traceInstance, L$instance))(L_line)(L_offset_0)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countFilePos", 4, "countFilePos line lineOffset starts offset = or (isNil starts) (> (head starts) offset)\n  \\f . f line (- offset lineOffset)\n  countFilePos (+ line 1) (head starts) (tail starts) offset", lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_lineOffset){return (
  Leisure_traceCall(L$F, L_lineOffset),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_starts){return (
  Leisure_traceCall(L$F, L_starts),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), lazy((function(){
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
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countFilePos))((function(L$instance, L$parentInstance){
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("fileposList", 1, "fileposList pos = pos \\file line offset . cons line (cons offset nil)", lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_line, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_offset, L_nil));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parens", 3, "parens start end content = \\f . f start end content", lazy(setDataType((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_content){return (
  Leisure_traceCall(L$F, L_content),
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
})(), 'parens')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parensStart", 1, "parensStart p = p \\s e c . s", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parensEnd", 1, "parensEnd p = p \\s e c . e", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parensContent", 1, "parensContent p = p \\s e c . c", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isParens", 1, "isParens p = hasType p parens", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (resolve(L_hasType)(L_p, L_parens)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("makeParens", 3, "makeParens start end content =\n  and (isCons content) (isNil (tail content))\n    makeParens start end (head content)\n    or (isToken content) (isParens content)\n      content\n      parens start end content", lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_content){return (
  Leisure_traceCall(L$F, L_content),
  Leisure_traceReturn(L$F, (L$(resolve(L_and))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_makeParens))(L_start, L_end, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_content));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_content));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isParens)(L_content));
});
})(++Leisure_traceInstance, L$instance), L_content, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parens)(L_start)(L_end)(L_content));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parensFromToks", 3, "parensFromToks left right content = \\\\\n  start = tokenFilepos left\n  end = addFilepos (tokenFilepos right) (strLen (tokenString right))\n  .\n  parens start end content", lazy((function(){
  var L$F = function(L_left){return (
  Leisure_traceCall(L$F, L_left),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_right){return (
  Leisure_traceCall(L$F, L_right),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_content){return (
  Leisure_traceCall(L$F, L_content),
  Leisure_traceReturn(L$F, ((function(){  var L_start, L_end;
  L_start = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_left));
});
})(++Leisure_traceInstance, L$instance);
  L_end = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_addFilepos))((function(L$instance, L$parentInstance){
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

  return resolve(L_parens)(L_start)(L_end)(L_content)})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("stripParens", 1, "stripParens p = isParens p (stripParens (parensContent p)) p", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (L$(resolve(L_isParens))(L_p, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_stripParens)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensContent)(L_p));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_p)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("withStripped", 2, "withStripped p cont = cont (stripParens p)", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_cont){return (
  Leisure_traceCall(L$F, L_cont),
  Leisure_traceReturn(L$F, (resolve(L_cont)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_stripParens)(L_p));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseErr", 2, "parseErr msg1 msg2 = err (strCat (cons msg1 (cons msg2 nil)))", lazy((function(){
  var L$F = function(L_msg1){return (
  Leisure_traceCall(L$F, L_msg1),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_msg2){return (
  Leisure_traceCall(L$F, L_msg2),
  Leisure_traceReturn(L$F, (resolve(L_err)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_msg1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_msg2, L_nil));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("lineStart", 0, "lineStart  = regexp '^\\\\r?\\\\n'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^\\r?\\n"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("commentPat", 0, "commentPat = regexp '^\\\\r?\\\\n[ \\\\i]*#'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^\\r?\\n[ \\i]*#"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("emptyToken", 0, "emptyToken = regexp '^\\\\r?\\\\n[ \\\\i]*(#|$)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^\\r?\\n[ \\i]*(#|$)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("makeTokens", 3, "makeTokens lineStarts strings start = _withRecur\n  makeMoreTokens lineStarts strings start nil", lazy((function(){
  var L$F = function(L_lineStarts){return (
  Leisure_traceCall(L$F, L_lineStarts),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_strings){return (
  Leisure_traceCall(L$F, L_strings),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, (resolve(L__withRecur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_makeMoreTokens))(L_lineStarts, L_strings, L_start, L_nil));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("makeMoreTokens", 4, "makeMoreTokens lineStarts strings start result = strings\n  \\h t D . _recur\n    makeMoreTokens lineStarts t (+ start (strLen h))\n      or (or (strStartsWith h ' ') (strStartsWith h '#')) (and (strMatches h emptyToken) (or (isNil t) (strMatches (head t) lineStart)))\n        result\n        cons (makeTokenAt lineStarts h start) result\n  _reverse result", lazy((function(){
  var L$F = function(L_lineStarts){return (
  Leisure_traceCall(L$F, L_lineStarts),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_strings){return (
  Leisure_traceCall(L$F, L_strings),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_strings)(lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L_makeMoreTokens))(L_lineStarts, L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_start, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strStartsWith))(L_h, " "));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strStartsWith))(L_h, "#"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatches))(L_h, L_emptyToken));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_t));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatches))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_t));
});
})(++Leisure_traceInstance, L$instance), L_lineStart));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_result, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_makeTokenAt))(L_lineStarts, L_h, L_start));
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
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_result));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 20, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 21, L$F.L$instanceId);
  return L$F;
})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("makeTokenAt", 3, "makeTokenAt lineStarts txt offset = isNil (strMatch txt zeroNum)\n  token txt (filePosFor lineStarts offset)\n  token (strReplace txt zeroPrefix '') (filePosFor lineStarts offset)", lazy((function(){
  var L$F = function(L_lineStarts){return (
  Leisure_traceCall(L$F, L_lineStarts),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_txt){return (
  Leisure_traceCall(L$F, L_txt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))(L_txt, L_zeroNum));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(L_txt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_filePosFor))(L_lineStarts, L_offset));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strReplace))(L_txt, L_zeroPrefix, ""));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_filePosFor))(L_lineStarts, L_offset));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("showToken", 1, "showToken tok = log (strCat (cons 'token: ' (cons (tokenString tok) (cons ', ' (cons (showPos (tokenPos tok)) nil))))) tok", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (resolve(L_log)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("token: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(", ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("showPos", 1, "showPos pos = isFilepos pos\n  strCat (cons 'position: ' (cons (fileposFile pos) (cons ', ' (cons (fileposLine pos) (cons '.' (cons (fileposOffset pos) nil))))))\n  pos", lazy((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (L$(resolve(L_isFilepos))(L_pos, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("position: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposFile)(L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(", ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fileposLine)(L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), L_pos)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("splitTokens", 2, "splitTokens str pat = filter (\\s . not (eq s '')) (basicSplitTokens str pat true)", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, (L$(resolve(L_filter))(lazy((function(){
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
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_basicSplitTokens))(L_str, L_pat, L_true));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("numberPat", 0, "numberPat = regexp '-?([0-9]+(\\\\.[0-9]+)?|\\\\.[0-9]+)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("-?([0-9]+(\\.[0-9]+)?|\\.[0-9]+)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("zeroNum", 0, "zeroNum = regexp '^0+[0-9]'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^0+[0-9]"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("zeroPrefix", 0, "zeroPrefix = regexp '^0+'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^0+"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("matchOffset", 2, "matchOffset str match = isNil match\n  strLen str\n  head (tail (tail match))", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_match){return (
  Leisure_traceCall(L$F, L_match),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))(L_match, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("basicSplitTokens", 3, "basicSplitTokens str pat prevIsDel = _reverse\n  _withRecur (_basicSplitTokens str pat prevIsDel nil)", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_prevIsDel){return (
  Leisure_traceCall(L$F, L_prevIsDel),
  Leisure_traceReturn(L$F, (resolve(L__reverse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__withRecur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__basicSplitTokens))(L_str, L_pat, L_prevIsDel, L_nil));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_basicSplitTokens", 4, "_basicSplitTokens str pat prevIsDel toks = == str ''\n  toks\n  \\\\\n    num = strMatch str numberPat\n    del = strMatch str pat\n    numOffset = matchOffset str num\n    delOffset = matchOffset str del\n    select = and (== numOffset 0) prevIsDel\n      \\del num first . num\n      == delOffset 0\n        \\del num first . del\n        \\del num first . first\n    first = select (head del) (head num) (strSubstring str 0 delOffset)\n    .\n    _recur\n      _basicSplitTokens\n        strSubstring str (strLen first) 0\n        pat\n        select true false false\n        cons first toks", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_prevIsDel){return (
  Leisure_traceCall(L$F, L_prevIsDel),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, (resolve(L_$p$p)(L_str, "")(L_toks)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_num, L_del, L_numOffset, L_delOffset, L_select, L_first;
  L_num = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))(L_str, L_numberPat));
});
})(++Leisure_traceInstance, L$instance);
  L_del = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))(L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance);
  L_numOffset = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_matchOffset))(L_str, L_num));
});
})(++Leisure_traceInstance, L$instance);
  L_delOffset = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_matchOffset))(L_str, L_del));
});
})(++Leisure_traceInstance, L$instance);
  L_select = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$p$p)(L_numOffset, 0));
});
})(++Leisure_traceInstance, L$instance), L_prevIsDel, lazy((function(){
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
})()), (function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_str, 0, L_delOffset));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L__recur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__basicSplitTokens))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_str, (function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_cons))(L_first, L_toks));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance))))
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 29, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 30, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("tokens", 2, "tokens str pat = countedTokens emptyLineStarts str pat", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, (L$(resolve(L_countedTokens))(L_emptyLineStarts, L_str, L_pat)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedTokens", 3, "countedTokens lineStarts str pat = makeTokens lineStarts (splitTokens str pat) 0", lazy((function(){
  var L$F = function(L_lineStarts){return (
  Leisure_traceCall(L$F, L_lineStarts),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, (L$(resolve(L_makeTokens))(L_lineStarts, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_splitTokens))(L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance), 0)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isTokenString", 2, "isTokenString tok str = or\n  and (isToken tok) (eq (tokenString tok) str)\n  and (isString tok) (eq tok str)", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isTokenStart", 2, "isTokenStart tok str = or\n  and (isToken tok) (strStartsWith (tokenString tok) str)\n  and (isString tok) (strStartsWith tok str)", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strStartsWith))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), L_str));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isString)(L_tok));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strStartsWith))(L_tok, L_str));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strTokenString", 1, "strTokenString tok = withToken tok nil \\str pos . str", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (L$(resolve(L_withToken))(L_tok, L_nil, lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("withToken", 3, "withToken tok nonTokCase tokCase = isToken tok\n  tokCase (tokenString tok) (tokenPos tok)\n  isString tok\n    tokCase tok emptyFilePos\n    nonTokCase", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_nonTokCase){return (
  Leisure_traceCall(L$F, L_nonTokCase),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_tokCase){return (
  Leisure_traceCall(L$F, L_tokCase),
  Leisure_traceReturn(L$F, (L$(resolve(L_isToken))(L_tok, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokCase)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenPos)(L_tok));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isString))(L_tok, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokCase)(L_tok)(L_emptyFilePos));
});
})(++Leisure_traceInstance, L$instance), L_nonTokCase));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseToks", 2, "parseToks toks groups =\n  isNil toks nil\n    ifNotErr (parseTok toks groups) \\list . list \\h t .\n      ifNotErr (parseToks t groups) \\res .\n        cons h\n          and (isCons res) (isBlockStart (head res))\n            cons res nil\n            res", lazy((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (L$(resolve(L_isNil))(L_toks, L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseTok))(L_toks, L_groups));
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
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseToks))(L_t, L_groups));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_res){return (
  Leisure_traceCall(L$F, L_res),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_res, L_nil));
});
})(++Leisure_traceInstance, L$instance), L_res));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseTok", 2, "parseTok toks groups = withCons toks nil \\h t .\n  withToken h toks \\txt pos .\n    assoc txt groups\n      \\close . parseGroup h t nil close groups\n      (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (parseIndent h t nil groups)\n        toks", lazy((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_toks, L_nil, lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (L$(resolve(L_withToken))(L_h, L_toks, lazy((function(){
  var L$F = function(L_txt){return (
  Leisure_traceCall(L$F, L_txt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (L$(resolve(L_assoc))(L_txt, L_groups, lazy((function(){
  var L$F = function(L_close){return (
  Leisure_traceCall(L$F, L_close),
  Leisure_traceReturn(L$F, (L$(resolve(L_parseGroup))(L_h, L_t, L_nil, L_close, L_groups)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenStart))(L_h, "\n"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenStart))(L_h, "\r\n"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseIndent))(L_h, L_t, L_nil, L_groups));
});
})(++Leisure_traceInstance, L$instance), L_toks));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseGroup", 5, "parseGroup left toks gr close groups = withCons toks (parseErr 'Unterminated group starting ' (loc left))\n  \\h t . isTokenString h close\n    eq close ')'\n      cons (parensFromToks left h (_reverse gr)) t\n      cons (cons left (cons (_reverse gr) (cons h nil))) t\n    withToken h\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT .\n        parseGroup left restT (cons restH gr) close groups\n      \\txt pos .\n        rassoc txt groups\n          \\open . parseErr (strCat (cons 'Mismatched group: ' (cons (tokenString left) (cons txt (cons ' ' nil))))) (loc left)\n          ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseGroup left restT (cons restH gr) close groups", lazy((function(){
  var L$F = function(L_left){return (
  Leisure_traceCall(L$F, L_left),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_gr){return (
  Leisure_traceCall(L$F, L_gr),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_close){return (
  Leisure_traceCall(L$F, L_close),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Unterminated group starting ")((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_h, L_close, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_close, ")")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parensFromToks))(L_left, L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_gr));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_left, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_gr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 34, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_withToken))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseTok))(L_toks, L_groups));
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
  Leisure_traceReturn(L$F, (L$(resolve(L_parseGroup))(L_left, L_restT, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_restH, L_gr));
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
  Leisure_traceReturn(L$F, (L$(resolve(L_rassoc))(L_txt, L_groups, lazy((function(){
  var L$F = function(L_open){return (
  Leisure_traceCall(L$F, L_open),
  Leisure_traceReturn(L$F, (resolve(L_parseErr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("Mismatched group: ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_left));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_txt, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(" ", L_nil));
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
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_left));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 25, L$F.L$instanceId);
  return L$F;
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseTok))(L_toks, L_groups));
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
  Leisure_traceReturn(L$F, (L$(resolve(L_parseGroup))(L_left, L_restT, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_restH, L_gr));
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
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 37, L$F.L$instanceId);
  return L$F;
})()))
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 41, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseIndent", 4, "parseIndent indent toks gr groups =\n  withCons toks (cons (makeParens (tokenFilepos indent) (lexEnd (head gr)) (_reverse gr)) nil)\n    \\h t . or (withToken h false (\\txt pos . rassoc txt groups (\\open . true) false))\n      and (or (isTokenStart h '\\n') (isTokenStart h '\\r\\n')) (<= (strLen (tokenString h)) (strLen (tokenString indent)))\n      cons (makeParens (tokenFilepos indent) (tokenFilepos h) (_reverse gr)) toks\n      ifNotErr (parseTok toks groups) \\list . list \\restH restT . parseIndent indent restT (cons restH gr) groups", lazy((function(){
  var L$F = function(L_indent){return (
  Leisure_traceCall(L$F, L_indent),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_gr){return (
  Leisure_traceCall(L$F, L_gr),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_makeParens))((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_withToken))(L_h, L_false, lazy((function(){
  var L$F = function(L_txt){return (
  Leisure_traceCall(L$F, L_txt),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (L$(resolve(L_rassoc))(L_txt, L_groups, lazy((function(){
  var L$F = function(L_open){return (
  Leisure_traceCall(L$F, L_open),
  Leisure_traceReturn(L$F, (resolve(L_true)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})()), L_false)))
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
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenStart))(L_h, "\n"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenStart))(L_h, "\r\n"));
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_makeParens))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseTok))(L_toks, L_groups));
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
  Leisure_traceReturn(L$F, (L$(resolve(L_parseIndent))(L_indent, L_restT, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_restH, L_gr));
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
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 33, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 34, L$F.L$instanceId);
  return L$F;
})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("nilRange", 0, "nilRange = cons 1 (cons 0 nil)", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(1, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(0, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("lit", 2, "lit value range = \\f . f value range", lazy(setDataType((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_range){return (
  Leisure_traceCall(L$F, L_range),
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
})(), 'lit')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("ref", 2, "ref name range = \\f . f name range", lazy(setDataType((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_range){return (
  Leisure_traceCall(L$F, L_range),
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
})(), 'ref')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("lambda", 3, "lambda name body range = \\f . f name body range", lazy(setDataType((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_range){return (
  Leisure_traceCall(L$F, L_range),
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
})(), 'lambda')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("apply", 2, "apply func arg = \\f . f func arg", lazy(setDataType((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_arg){return (
  Leisure_traceCall(L$F, L_arg),
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
})(), 'apply')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("let", 4, "let name value body range = \\f . f name value body range", lazy(setDataType((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_range){return (
  Leisure_traceCall(L$F, L_range),
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})(), 'let')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("anno", 3, "anno name data body = \\f . f name data body", lazy(setDataType((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_data){return (
  Leisure_traceCall(L$F, L_data),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
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
})(), 'anno')));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("withParens", 3, "withParens p err cont = isParens p (p cont) err", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_cont){return (
  Leisure_traceCall(L$F, L_cont),
  Leisure_traceReturn(L$F, (L$(resolve(L_isParens))(L_p, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_p)(L_cont));
});
})(++Leisure_traceInstance, L$instance), L_err)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("setParens", 2, "setParens p func = isParens p\n  p \\start end content . parens start end (func content)\n  func p", lazy((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, (L$(resolve(L_isParens))(L_p, (function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (resolve(L_parens)(L_start)(L_end)((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_func)(L_p));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("position", 1, "position thing = isToken thing (tokenFilepos thing)\n  isParens thing (parensStart thing)\n    isCons thing\n      \\\\\n        pos = position (head thing)\n        .\n        isEmptyPos pos (position (tail thing)) pos\n      isFilepos thing thing\n        emptyFilePos", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, (L$(resolve(L_isToken))(L_thing, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenFilepos)(L_thing));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isParens))(L_thing, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensStart)(L_thing));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isCons))(L_thing, (function(L$instance, L$parentInstance){
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

  return L$(resolve(L_isEmptyPos))(L_pos, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_thing));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_pos)})());
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isFilepos))(L_thing, L_thing, L_emptyFilePos));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("lexEnd", 1, "lexEnd thing = isToken thing (addFilepos (tokenFilepos thing) (strLen (tokenString thing)))\n  isParens thing (parensEnd thing)\n    isCons thing (lexEnd (last thing))\n      emptyFilePos", lazy((function(){
  var L$F = function(L_thing){return (
  Leisure_traceCall(L$F, L_thing),
  Leisure_traceReturn(L$F, (L$(resolve(L_isToken))(L_thing, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_addFilepos))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isParens))(L_thing, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parensEnd)(L_thing));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isCons))(L_thing, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_lexEnd)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_last)(L_thing));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_emptyFilePos));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("loc", 1, "loc thing = \\\\\n  p = position thing\n  l = isEmptyPos p 'an unknown location' (showPos p)\n  .\n  strCat (cons 'at ' (cons l nil))", lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L_isEmptyPos))(L_p, "an unknown location", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_showPos)(L_p));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("at ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_l, L_nil));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("scrub", 1, "scrub str = strFromList (scrubList (strToList str))", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("scrubList", 1, "scrubList list = list\n  \\h t D . \\\\\n    next = scrubList t\n    .\n    eq h '\\\\' (cons h (cons (head t) (scrubList (tail t))))\n      eq h '\\\"' (cons '\\\\' (cons '\\\"' next))\n        cons h next\n  nil", lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_cons))("\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("\"", L_next));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, L_next));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("createAst", 3, "createAst lineStarts inList names = withStripped inList \\list .\n  isToken list (createLitOrRef list names)\n    list\n      \\h t D .\n        isTokenString h '\\\\\\\\' (createLet h t names)\n          isTokenString h '\\\\@' (createAnno h t names)\n            isTokenString h '\\\\' (createLambda h t names)\n              createApply list names\n      nil", lazy((function(){
  var L$F = function(L_lineStarts){return (
  Leisure_traceCall(L$F, L_lineStarts),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_inList){return (
  Leisure_traceCall(L$F, L_inList),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, (L$(resolve(L_withStripped))(L_inList, lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_isToken))(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createLitOrRef))(L_list, L_names));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_h, "\\\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createLet))(L_h, L_t, L_names));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))(L_h, "\\@", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAnno))(L_h, L_t, L_names));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))(L_h, "\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createLambda))(L_h, L_t, L_names));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createApply))(L_list, L_names));
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("strMatches", 2, "strMatches str pat = isCons (strMatch str pat)", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, (resolve(L_isCons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))(L_str, L_pat));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("digit", 0, "digit = regexp '^[0-9]+$'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^[0-9]+$"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("backslashCodes", 0, "backslashCodes = 'bfnrt'", "bfnrt");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("backslashValues", 0, "backslashValues = '\\b\\f\\n\\r\\t'", "\b\f\n\r\t");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("convertStringEscape", 3, "convertStringEscape char codes values =\n  eq codes ''\n    char\n    eq char (strAt codes 0)\n      strAt values 0\n      convertStringEscape char (strSubstring codes 1 0) (strSubstring values 1 0)", lazy((function(){
  var L$F = function(L_char){return (
  Leisure_traceCall(L$F, L_char),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_codes){return (
  Leisure_traceCall(L$F, L_codes),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_values){return (
  Leisure_traceCall(L$F, L_values),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_codes, "")(L_char)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)(L_char, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_codes, 0));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_values, 0));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_convertStringEscape))(L_char, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_codes, 1, 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_values, 1, 0));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("convertStringEscapes", 3, "convertStringEscapes orig str cont = \\\\\n  res = _convertStringEscapes orig str\n  .\n  hasType res err\n    res\n    cont res", lazy((function(){
  var L$F = function(L_orig){return (
  Leisure_traceCall(L$F, L_orig),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_cont){return (
  Leisure_traceCall(L$F, L_cont),
  Leisure_traceReturn(L$F, ((function(){  var L_res;
  L_res = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__convertStringEscapes))(L_orig, L_str));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_hasType)(L_res, L_err)(L_res)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)(L_res));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_convertStringEscapes", 2, "_convertStringEscapes orig str =\n  eq str '' str\n    eq (strAt str 0) '\\\\'\n      eq (strLen str) 1 (parseErr \"Error, backslash without character in string: \" orig)\n        \\\\\n          rest = _convertStringEscapes orig (strSubstring str 2 0)\n          .\n          hasType rest err\n            rest\n            strAdd\n              convertStringEscape (strAt str 1) backslashCodes backslashValues\n              rest\n      \\\\\n        rest = _convertStringEscapes orig (strSubstring str 1 0)\n        .\n        hasType rest err\n          rest\n          strAdd\n            strAt str 0\n            rest", lazy((function(){
  var L$F = function(L_orig){return (
  Leisure_traceCall(L$F, L_orig),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_eq)(L_str, "")(L_str)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_str, 0));
});
})(++Leisure_traceInstance, L$instance), "\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_eq)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strLen)(L_str));
});
})(++Leisure_traceInstance, L$instance), 1)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Error, backslash without character in string: ")(L_orig));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_rest;
  L_rest = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__convertStringEscapes))(L_orig, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_str, 2, 0));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_hasType)(L_rest, L_err)(L_rest)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAdd))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_convertStringEscape))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_str, 1));
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
  return Leisure_traceResolve(L$(resolve(L__convertStringEscapes))(L_orig, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_str, 1, 0));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_hasType)(L_rest, L_err)(L_rest)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAdd))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_str, 0));
});
})(++Leisure_traceInstance, L$instance), L_rest));
});
})(++Leisure_traceInstance, L$instance))})());
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseString", 2, "parseString str cont =\n  neq (strAt str 0) (strAt str -1) (parseErr \"Badly terminated string: \" str)\n    convertStringEscapes str (strSubstring str 1 -1) cont", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_cont){return (
  Leisure_traceCall(L$F, L_cont),
  Leisure_traceReturn(L$F, (L$(resolve(L_neq))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_str, 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_str, -1));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Badly terminated string: ")(L_str));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_convertStringEscapes))(L_str, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_str, 1, -1));
});
})(++Leisure_traceInstance, L$instance), L_cont));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("createLitOrRef", 2, "createLitOrRef token names = \\\\\n  tok = tokenString token\n  tokRange = (fileposList (position token))\n  .\n  _contains names tok\n    ref tok tokRange\n    or (strStartsWith tok '\\\"') (strStartsWith tok \"'\")\n      parseString tok \\str . lit str tokRange\n      strStartsWith tok '.'\n        jsonParse (strCat (cons '0' (cons tok nil))) (\\err . ref tok tokRange) (\\item . lit item tokRange)\n        or (and (>= (strAt tok 0) '0') (<= (strAt tok 0) '9')) (strStartsWith tok '-')\n          jsonParse tok (\\err . ref tok tokRange) (\\item . lit item tokRange)\n          ref tok tokRange", lazy((function(){
  var L$F = function(L_token){return (
  Leisure_traceCall(L$F, L_token),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
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

  return L$(resolve(L__contains))(L_names, L_tok, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ref)(L_tok)(L_tokRange));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strStartsWith))(L_tok, "\""));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strStartsWith))(L_tok, "'"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseString))(L_tok, lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_lit)(L_str)(L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 7, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strStartsWith))(L_tok, ".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_jsonParse))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("0", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_tok, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_ref)(L_tok)(L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 12, L$F.L$instanceId);
  return L$F;
})()), lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (resolve(L_lit)(L_item)(L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$z$p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_tok, 0));
});
})(++Leisure_traceInstance, L$instance), "0"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$y$p)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strAt))(L_tok, 0));
});
})(++Leisure_traceInstance, L$instance), "9"));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strStartsWith))(L_tok, "-"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_jsonParse))(L_tok, lazy((function(){
  var L$F = function(L_err){return (
  Leisure_traceCall(L$F, L_err),
  Leisure_traceReturn(L$F, (resolve(L_ref)(L_tok)(L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 21, L$F.L$instanceId);
  return L$F;
})()), lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (resolve(L_lit)(L_item)(L_tokRange)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 22, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_ref)(L_tok)(L_tokRange));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("createLambda", 3, "createLambda start list names = \\\\\n  err = parseErr \"Lambda needs a variable name, a dot, and a body \" (loc start)\n  .\n  withCons list err \\name rest .\n    withToken name err \\n p .\n      withCons rest err \\dot body .\n        # are these partial applications too hard to read?\n        isTokenString dot '.'\n          ifNotErr (createAst nil body (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))\n          ifNotErr (createLambda start rest (cons n names)) \\bodyAst . lambda n bodyAst (fileposList (position name))", lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){  var L_err;
  L_err = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Lambda needs a variable name, a dot, and a body ")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return L$(resolve(L_withCons))(L_list, L_err, lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_withToken))(L_name, L_err, lazy((function(){
  var L$F = function(L_n){return (
  Leisure_traceCall(L$F, L_n),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_p){return (
  Leisure_traceCall(L$F, L_p),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_rest, L_err, lazy((function(){
  var L$F = function(L_dot){return (
  Leisure_traceCall(L$F, L_dot),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_dot, ".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_body, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_n, L_names));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyAst){return (
  Leisure_traceCall(L$F, L_bodyAst),
  Leisure_traceReturn(L$F, (resolve(L_lambda)(L_n)(L_bodyAst)((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createLambda))(L_start, L_rest, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_n, L_names));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyAst){return (
  Leisure_traceCall(L$F, L_bodyAst),
  Leisure_traceReturn(L$F, (resolve(L_lambda)(L_n)(L_bodyAst)((function(L$instance, L$parentInstance){
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
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 21, L$F.L$instanceId);
  return L$F;
})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("createAnno", 3, "createAnno start list names =\n  withCons list (parseErr \"No annotation name or data in annotation \" (loc start)) \\name rest .\n    withCons rest (parseErr \"No data for annotation \" (loc start)) \\data rest . \\\\\n      finish data body = ifNotErr (createAst nil body names) \\bodyAst .\n        cleanTokens start name \\name .\n          cleanTokens start data \\data .\n            anno name data bodyAst\n      .\n      isTokenString data '.'\n        finish nil rest\n        withStripped data \\data .\n          withCons rest (parseErr \"No body for annotation \" (loc start)) \\dot body .\n            isTokenString dot '.'\n              finish data body\n              parseErr \"Annotation expects dot after name and data \" (loc start)", lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No annotation name or data in annotation ")((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_rest, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No data for annotation ")((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_body, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyAst){return (
  Leisure_traceCall(L$F, L_bodyAst),
  Leisure_traceReturn(L$F, (L$(resolve(L_cleanTokens))(L_start, L_name, lazy((function(){
  var L$F = function(L_name_2){return (
  Leisure_traceCall(L$F, L_name_2),
  Leisure_traceReturn(L$F, (L$(resolve(L_cleanTokens))(L_start, L_data_1, lazy((function(){
  var L$F = function(L_data_3){return (
  Leisure_traceCall(L$F, L_data_3),
  Leisure_traceReturn(L$F, (resolve(L_anno)(L_name_2)(L_data_3)(L_bodyAst)))
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

  return L$(resolve(L_isTokenString))(L_data, ".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_finish)(L_nil)(L_rest_0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_withStripped))(L_data, lazy((function(){
  var L$F = function(L_data_1){return (
  Leisure_traceCall(L$F, L_data_1),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_rest_0, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No body for annotation ")((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_dot, ".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_finish)(L_data_1)(L_body));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Annotation expects dot after name and data ")((function(L$instance, L$parentInstance){
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
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 26, L$F.L$instanceId);
  return L$F;
})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("bodyStructPat", 0, "bodyStructPat = regexp '\\\\|\\\\\\\\|\\\\@'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("\\|\\\\|\\@"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("createApply", 2, "createApply inList names = withStripped inList \\list .\n  withCons list (parseErr \"Funcion apply expecting a non-empty list \" (loc inList)) \\h t .\n    ifNotErr (createAst nil h names) \\func . chainApply func t names", lazy((function(){
  var L$F = function(L_inList){return (
  Leisure_traceCall(L$F, L_inList),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, (L$(resolve(L_withStripped))(L_inList, lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Funcion apply expecting a non-empty list ")((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_h, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, (L$(resolve(L_chainApply))(L_func, L_t, L_names)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("blockStarts", 0, "blockStarts = cons '\\\\' (cons '\\\\\\\\' (cons '\\\\@' nil))", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("\\\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("\\@", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("chainApply", 3, "chainApply func list names = withCons list func \\argItem rest .\n  and (isToken argItem) (_contains blockStarts (tokenString argItem))\n    ifNotErr (createAst nil list names) \\arg . apply func arg\n    ifNotErr (createAst nil argItem names) \\arg . chainApply (apply func arg) rest names", lazy((function(){
  var L$F = function(L_func){return (
  Leisure_traceCall(L$F, L_func),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_list, L_func, lazy((function(){
  var L$F = function(L_argItem){return (
  Leisure_traceCall(L$F, L_argItem),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_argItem));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__contains))(L_blockStarts, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_argItem));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_list, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_arg){return (
  Leisure_traceCall(L$F, L_arg),
  Leisure_traceReturn(L$F, (resolve(L_apply)(L_func)(L_arg)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 5, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_argItem, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_arg){return (
  Leisure_traceCall(L$F, L_arg),
  Leisure_traceReturn(L$F, (L$(resolve(L_chainApply))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_apply)(L_func)(L_arg));
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("cleanTokens", 3, "cleanTokens start toks cont = isToken toks\n  cont (tokenString toks)\n  withCons toks (cont toks) \\head tail .\n    cleanTokens start head \\head .\n      cleanTokens start tail \\tail .\n        cont (cons head tail)", lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_cont){return (
  Leisure_traceCall(L$F, L_cont),
  Leisure_traceReturn(L$F, (L$(resolve(L_isToken))(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_toks));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_withCons))(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_cont)(L_toks));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_head){return (
  Leisure_traceCall(L$F, L_head),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_tail){return (
  Leisure_traceCall(L$F, L_tail),
  Leisure_traceReturn(L$F, (L$(resolve(L_cleanTokens))(L_start, L_head, lazy((function(){
  var L$F = function(L_head_0){return (
  Leisure_traceCall(L$F, L_head_0),
  Leisure_traceReturn(L$F, (L$(resolve(L_cleanTokens))(L_start, L_tail, lazy((function(){
  var L$F = function(L_tail_1){return (
  Leisure_traceCall(L$F, L_tail_1),
  Leisure_traceReturn(L$F, (resolve(L_cont)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_head_0, L_tail_1));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("createLet", 3, "createLet start list names = withCons list\n  parseErr \"No variable or body for let \" (loc start)\n  \\binding body . eq body nil (createAst nil binding names)\n    ifNotErr (getLetNames start list names) \\newNames .\n      createSublets start binding body newNames", lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_list, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("No variable or body for let ")((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_binding, L_names));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_getLetNames))(L_start, L_list, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_newNames){return (
  Leisure_traceCall(L$F, L_newNames),
  Leisure_traceReturn(L$F, (L$(resolve(L_createSublets))(L_start, L_binding, L_body, L_newNames)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("getLetNames", 3, "getLetNames start list names = \\\\\n  err = parseErr \"Let expected binding \" (loc start)\n  .\n  withCons list names \\binding body .\n    isTokenString binding '.' names\n      withParens binding err \\start end def .\n        withCons def err \\name rest .\n          withToken name err \\str pos .\n            getLetNames start body (cons str names)", lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){  var L_err;
  L_err = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected binding ")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_start));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance);

  return L$(resolve(L_withCons))(L_list, L_names, lazy((function(){
  var L$F = function(L_binding){return (
  Leisure_traceCall(L$F, L_binding),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_binding, ".", L_names, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_withParens))(L_binding, L_err, lazy((function(){
  var L$F = function(L_start_0){return (
  Leisure_traceCall(L$F, L_start_0),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_end){return (
  Leisure_traceCall(L$F, L_end),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_def, L_err, lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_withToken))(L_name, L_err, lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, (L$(resolve(L_getLetNames))(L_start_0, L_body, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_str, L_names));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("createSublets", 4, "createSublets start binding body names =\n  isTokenString binding '.' (createAst nil body names)\n    withCons body (parseErr \"Let expected a body \" (loc start)) \\bodyH bodyT .\n      ifNotErr (getNameAndDef (parensStart binding) (parensContent binding) names) \\res . res \\name def .\n        ifNotErr (createSublets start bodyH bodyT names) \\bodyAst .\n          let (tokenString name) def bodyAst nilRange", lazy((function(){
  var L$F = function(L_start){return (
  Leisure_traceCall(L$F, L_start),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_binding){return (
  Leisure_traceCall(L$F, L_binding),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_body){return (
  Leisure_traceCall(L$F, L_body),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_binding, ".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_body, L_names));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_withCons))(L_body, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected a body ")((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_getNameAndDef))((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createSublets))(L_start, L_bodyH, L_bodyT, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_bodyAst){return (
  Leisure_traceCall(L$F, L_bodyAst),
  Leisure_traceReturn(L$F, (resolve(L_let)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance))(L_def)(L_bodyAst)(L_nilRange)))
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 19, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("getNameAndDef", 3, "getNameAndDef pos binding names =\n  withCons (tail binding) (parseErr \"Let expected binding at \" pos) \\snd sndT .\n    isTokenString snd '=' (ifNotErr (createAst nil sndT names) \\def . cons (head binding) def)\n      ifNotErr (getLetLambda pos (tail binding) nil names) \\lamb . cons (head binding) lamb", lazy((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_binding){return (
  Leisure_traceCall(L$F, L_binding),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_binding));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected binding at ")(L_pos));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_snd){return (
  Leisure_traceCall(L$F, L_snd),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_sndT){return (
  Leisure_traceCall(L$F, L_sndT),
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_snd, "=", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_sndT, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_getLetLambda))(L_pos, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_binding));
});
})(++Leisure_traceInstance, L$instance), L_nil, L_names));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_lamb){return (
  Leisure_traceCall(L$F, L_lamb),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("getLetLambda", 4, "getLetLambda pos def args names =\n  withCons def (parseErr \"Let expected binding at \" pos) \\arg rest .\n    not (isToken arg) (parseErr \"Let expected binding at \" pos)\n      isTokenString arg '='\n        createAst nil (cons (token '\\\\' pos) (_append (_reverse args) (cons (token '.' (position arg)) rest))) names\n        getLetLambda pos rest (cons arg args) names", lazy((function(){
  var L$F = function(L_pos){return (
  Leisure_traceCall(L$F, L_pos),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_args){return (
  Leisure_traceCall(L$F, L_args),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_def, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected binding at ")(L_pos));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_arg){return (
  Leisure_traceCall(L$F, L_arg),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_not))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isToken)(L_arg));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Let expected binding at ")(L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))(L_arg, "=", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)("\\")(L_pos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__append))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__reverse)(L_args));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(".")((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_getLetLambda))(L_pos, L_rest, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_arg, L_args));
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
})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedScanLineG", 7, "countedScanLineG lineStarts str pat groups props onDef onExpr = \\\\\n  toks = countedTokens lineStarts str pat\n  groupToks = _foldr (\\el value . el \\h t . cons h (cons t value)) (cons '=' blockStarts) groups\n  .\n  # check if it's a definition\n  find (\\tok . or (_contains groupToks (tokenString tok)) (isCons (strMatch (tokenString tok) '^\\r?\\n'))) toks (\\item . isTokenString item '=') false\n    toks \\name rest . \\\\\n      parseIt func = \\\\\n        parsed = parseToks (checkSetDataType func rest name) groups\n        .\n        onDef (ifNotErr parsed \\list . createDef list name (arity rest 0) str props)\n      .\n      isTokenString (head rest) '='\n        isTokenString (head (tail rest)) '\\\\'\n          parseIt (setTypeAnno (tail rest) (tokenString name))\n          parseIt (tail rest)\n        ifNotErr (transformDef name rest) \\def .\n          parseIt (cons (token '\\\\' (addFilepos (position (head rest)) -1)) def)\n    ifNotErr (parseToks toks groups) \\list . onExpr list", lazy((function(){
  var L$F = function(L_lineStarts){return (
  Leisure_traceCall(L$F, L_lineStarts),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_props){return (
  Leisure_traceCall(L$F, L_props),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onDef){return (
  Leisure_traceCall(L$F, L_onDef),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onExpr){return (
  Leisure_traceCall(L$F, L_onExpr),
  Leisure_traceReturn(L$F, ((function(){  var L_toks, L_groupToks;
  L_toks = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countedTokens))(L_lineStarts, L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance);
  L_groupToks = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__foldr))(lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_t, L_value));
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
  return Leisure_traceResolve(L$(resolve(L_cons))("=", L_blockStarts));
});
})(++Leisure_traceInstance, L$instance), L_groups));
});
})(++Leisure_traceInstance, L$instance);

  return L$(resolve(L_find))(lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__contains))(L_groupToks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_tok));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isCons)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))((function(L$instance, L$parentInstance){
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
})()), L_toks, lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_item, "=")))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 15, L$F.L$instanceId);
  return L$F;
})()), L_false, (function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_parseToks))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_checkSetDataType))(L_func, L_rest, L_name));
});
})(++Leisure_traceInstance, L$instance), L_groups));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_onDef)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))(L_parsed, lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_createDef))(L_list, L_name, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_arity))(L_rest, 0));
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

  return L$(resolve(L_isTokenString))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_rest));
});
})(++Leisure_traceInstance, L$instance), "=", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 32, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_rest));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), "\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 29, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseIt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 28, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_setTypeAnno))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseIt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_rest));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 40, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 33, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_transformDef))(L_name, L_rest));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, (resolve(L_parseIt)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 38, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 37, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)("\\")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 36, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_addFilepos))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 46, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 44, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseToks))(L_toks, L_groups));
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
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 47, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 48, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 49, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 50, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 51, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 52, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 53, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("scanLineG", 5, "scanLineG str pat groups onDef onExpr = countedScanLineG emptyLineStarts str pat groups nil onDef onExpr", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onDef){return (
  Leisure_traceCall(L$F, L_onDef),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onExpr){return (
  Leisure_traceCall(L$F, L_onExpr),
  Leisure_traceReturn(L$F, (L$(resolve(L_countedScanLineG))(L_emptyLineStarts, L_str, L_pat, L_groups, L_nil, L_onDef, L_onExpr)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseLineG", 6, "parseLineG str pat names groups onDef onExpr = \\\\\n  astCallback cb = \\list . ifNotErr (createAst nil list names) \\ast . cb ast\n  .\n  scanLineG str pat groups (astCallback onDef) (astCallback onExpr)", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onDef){return (
  Leisure_traceCall(L$F, L_onDef),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onExpr){return (
  Leisure_traceCall(L$F, L_onExpr),
  Leisure_traceReturn(L$F, ((function(){  var L_astCallback;
  L_astCallback = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_cb){return (
  Leisure_traceCall(L$F, L_cb),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))(L_nil, L_list, L_names));
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

  return L$(resolve(L_scanLineG))(L_str, L_pat, L_groups, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_astCallback)(L_onDef));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_astCallback)(L_onExpr));
});
})(++Leisure_traceInstance, L$instance))})()))
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 13, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("transformDef", 2, "transformDef name toks = withCons toks (parseErr \"Bad definition, expecting tokens\" (loc name)) \\h t .\n  isTokenString h '='\n    isTokenString (head t) '\\\\'\n      cons (token '.' (position h)) (setTypeAnno t (tokenString name))\n      cons (token '.' (position h)) t\n    ifNotErr (transformDef name t) \\list . cons h list", lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_toks, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parseErr)("Bad definition, expecting tokens")((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_h, "=", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_t));
});
})(++Leisure_traceInstance, L$instance), "\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_setTypeAnno))(L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(".")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_h));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_transformDef))(L_name, L_t));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_list){return (
  Leisure_traceCall(L$F, L_list),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_h, L_list)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("setTypeAnno", 2, "setTypeAnno toks name = \\\\\n  tok = \\str . token str (position toks)\n  .\n  cons (tok '\\\\@') (cons (tok 'type') (cons (tok name) (cons (tok '.') toks)))", lazy((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){  var L_tok;
  L_tok = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_token)(L_str)((function(L$instance, L$parentInstance){
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

  return L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("\\@"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("type"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)(L_name));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("setDataTypeAnno", 2, "setDataTypeAnno toks name = \\\\\n  tok = \\str . token str (position toks)\n  .\n  cons (tok '\\\\@') (cons (tok 'dataType') (cons (tok (tokenString name)) (cons (tok '.') toks)))", lazy((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){  var L_tok;
  L_tok = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_token)(L_str)((function(L$instance, L$parentInstance){
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

  return L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("\\@"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("dataType"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("createDef", 5, "createDef def name arity src props = \\\\\n  #tok str = token str (position def)\n  tok str = token str (position name)\n  .\n  jsonStringify (tokenString name) (\\err . parseErr (strCat (cons \"Bad function name \" (cons (loc name) nil))) err) \\nameStr .\n    jsonStringify src (\\err . parseErr (strCat (cons \"Bad source \" (cons (loc name) nil))) err) \\srcStr .\n      cons '\\\\@' (cons 'leisureName' (cons (tokenString name) (cons '.' (cons (tok 'newDefine') (cons (tok nameStr) (cons (tok (strString arity)) (cons (tok srcStr) (cons '\\\\@' (cons 'arity' (cons arity (cons '.' (cons (spliceFuncProps arity props def) nil))))))))))))", lazy((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_arity){return (
  Leisure_traceCall(L$F, L_arity),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_src){return (
  Leisure_traceCall(L$F, L_src),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_props){return (
  Leisure_traceCall(L$F, L_props),
  Leisure_traceReturn(L$F, ((function(){  var L_tok;
  L_tok = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_token)(L_str)((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_cons))("Bad function name ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_name));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_err)))
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
  return Leisure_traceResolve(L$(resolve(L_cons))("Bad source ", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_loc)(L_name));
});
})(++Leisure_traceInstance, L$instance), L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))(L_err)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 14, L$F.L$instanceId);
  return L$F;
})()), lazy((function(){
  var L$F = function(L_srcStr){return (
  Leisure_traceCall(L$F, L_srcStr),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))("\\@", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 33, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("leisureName", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 32, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tokenString)(L_name));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)("newDefine"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 29, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)(L_nameStr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 28, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strString)(L_arity));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tok)(L_srcStr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("\\@", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("arity", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_arity, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_spliceFuncProps))(L_arity, L_props, L_def));
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
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 36, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 37, L$F.L$instanceId);
  return L$F;
})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("spliceFuncProps", 3, "spliceFuncProps arity props ast = or (isNil props) (== arity 0)\n  ast\n  subSpliceFuncProps props ast", lazy((function(){
  var L$F = function(L_arity){return (
  Leisure_traceCall(L$F, L_arity),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_props){return (
  Leisure_traceCall(L$F, L_props),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
  Leisure_traceReturn(L$F, (L$(resolve(L_or))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_isNil)(L_props));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$p$p)(L_arity, 0));
});
})(++Leisure_traceInstance, L$instance), L_ast, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_subSpliceFuncProps))(L_props, L_ast));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("subSpliceFuncProps", 2, "subSpliceFuncProps props ast = \\\\\n  slash = head ast\n  var = head (tail ast)\n  afterVar = tail (tail ast)\n  dot = head afterVar\n  body = tail afterVar\n  .\n  isTokenString slash '\\\\'\n    cons\n      slash\n      cons\n        var\n        isTokenString dot '.'\n          cons dot (addProps props body)\n          cons '.' (addProps props afterVar)\n    cons\n      head ast\n      subSpliceFuncProps props (tail ast)", lazy((function(){
  var L$F = function(L_props){return (
  Leisure_traceCall(L$F, L_props),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
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

  return L$(resolve(L_isTokenString))(L_slash, "\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_slash, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_var, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))(L_dot, ".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_dot, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_addProps))(L_props, L_body));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_addProps))(L_props, L_afterVar));
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
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_ast));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_subSpliceFuncProps))(L_props, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_ast));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("addProps", 2, "addProps props ast = _foldr\n  \\prop result . cons '\\\\@' (cons (head prop) (cons (tail prop) (cons '.' result)))\n  ast\n  props", lazy((function(){
  var L$F = function(L_props){return (
  Leisure_traceCall(L$F, L_props),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
  Leisure_traceReturn(L$F, (L$(resolve(L__foldr))(lazy((function(){
  var L$F = function(L_prop){return (
  Leisure_traceCall(L$F, L_prop),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))("\\@", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_prop));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)(L_prop));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(".", L_result));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("checkSetDataType", 3, "checkSetDataType toks curToks name = withCons curToks toks \\h t .\n  isTokenString h '='\n    isTokenString (head t) '\\\\'\n      setDataTypeAnno toks name\n      toks\n    checkSetDataType toks t name", lazy((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_curToks){return (
  Leisure_traceCall(L$F, L_curToks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, (L$(resolve(L_withCons))(L_curToks, L_toks, lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_h, "=", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_t));
});
})(++Leisure_traceInstance, L$instance), "\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_setDataTypeAnno))(L_toks, L_name));
});
})(++Leisure_traceInstance, L$instance), L_toks));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_checkSetDataType))(L_toks, L_t, L_name));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("arity", 2, "arity toks n = isTokenString (head toks) '=' n (arity (tail toks) (+ n 1))", lazy((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_n){return (
  Leisure_traceCall(L$F, L_n),
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_toks));
});
})(++Leisure_traceInstance, L$instance), "=", L_n, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_arity))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("tokListStr", 1, "tokListStr toks = jsonStringify (_strJoin (_map (\\t . tokenString t) toks) ' ')", lazy((function(){
  var L$F = function(L_toks){return (
  Leisure_traceCall(L$F, L_toks),
  Leisure_traceReturn(L$F, (resolve(L_jsonStringify)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__strJoin)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__map))(lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("linePat", 0, "linePat = regexp '\\\\r?\\\\n(?=[^ ]|$)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("\\r?\\n(?=[^ ]|$)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("emptyLinePat", 0, "emptyLinePat = regexp '(^[ \\\\i]*\\\\#.*|^[ \\\\i]*$|^\\\\r?\\\\n[ \\\\i]*$)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("(^[ \\i]*\\#.*|^[ \\i]*$|^\\r?\\n[ \\i]*$)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("lineScrub", 0, "lineScrub = regexpFlags '\\\\r\\\\n' 'g'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_regexpFlags))("\\r\\n", "g"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("linesForFile", 1, "linesForFile text = _map tail (countedLinesForFile \"NOTHING.lsr\" text)", lazy((function(){
  var L$F = function(L_text){return (
  Leisure_traceCall(L$F, L_text),
  Leisure_traceReturn(L$F, (L$(resolve(L__map))(L_tail, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countedLinesForFile))("NOTHING.lsr", L_text));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedLinesForFile", 2, "countedLinesForFile name text = filter\n  \\line . isNil (strMatch (tail line) emptyLinePat)\n  countedLines name 1 text", lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_text){return (
  Leisure_traceCall(L$F, L_text),
  Leisure_traceReturn(L$F, (L$(resolve(L_filter))(lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_isNil)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))((function(L$instance, L$parentInstance){
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
})()), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countedLines))(L_name, 1, L_text));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedLines", 3, "countedLines filename lineOffset str = _reverse\n  _withRecur\n    _countedLines filename lineOffset str nil", lazy((function(){
  var L$F = function(L_filename){return (
  Leisure_traceCall(L$F, L_filename),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_lineOffset){return (
  Leisure_traceCall(L$F, L_lineOffset),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L__reverse)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__withRecur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__countedLines))(L_filename, L_lineOffset, L_str, L_nil));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("_countedLines", 4, "_countedLines filename lineOffset str lines = \\\\\n  m = strMatch str linePat\n  idx = head (tail (tail m))\n  chunk = strSubstring str 0 idx\n  next = + idx (strLen (head m))\n  chunkLines = findLines 0 chunk\n  .\n  eq str ''\n    lines\n    isNil m\n      cons (cons (cons filename (cons lineOffset (tail (findLines 0 str)))) str) lines\n      _recur\n        _countedLines filename (+ lineOffset (length chunkLines)) (strSubstring str next 0)\n          cons (cons (cons filename (cons lineOffset (tail chunkLines))) chunk) lines", lazy((function(){
  var L$F = function(L_filename){return (
  Leisure_traceCall(L$F, L_filename),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_lineOffset){return (
  Leisure_traceCall(L$F, L_lineOffset),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_lines){return (
  Leisure_traceCall(L$F, L_lines),
  Leisure_traceReturn(L$F, ((function(){  var L_m, L_idx, L_chunk, L_next, L_chunkLines;
  L_m = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))(L_str, L_linePat));
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
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_str, 0, L_idx));
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
  return Leisure_traceResolve(L$(resolve(L_findLines))(0, L_chunk));
});
})(++Leisure_traceInstance, L$instance);

  return resolve(L_eq)(L_str, "")(L_lines)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isNil))(L_m, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_filename, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_lineOffset, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_tail)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_findLines))(0, L_str));
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 25, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__recur)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__countedLines))(L_filename, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 17, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_lineOffset, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 16, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_length)(L_chunkLines));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_str, L_next, 0));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_filename, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_lineOffset, (function(L$instance, L$parentInstance){
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 29, L$F.L$instanceId);
  return L$F;
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 30, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("defPat", 0, "defPat = regexp '^[^ =]+.* =( |$)'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^[^ =]+.* =( |$)"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("unanchoredDefPat", 0, "unanchoredDefPat = regexp '^((?:\\\\s*\\\\n|#[^\\\\n]*\\\\n)*)([^=\\\\n]*)(=\\\\([^=]+=|=)?'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("^((?:\\s*\\n|#[^\\n]*\\n)*)([^=\\n]*)(=\\([^=]+=|=)?"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("namesForLines", 1, "namesForLines lines = _foldl\n  \\result line . \\\\\n    m = strMatch line defPat\n    .\n    isNil m result (cons (head (tail m)) result)\n  nil\n  lines", lazy((function(){
  var L$F = function(L_lines){return (
  Leisure_traceCall(L$F, L_lines),
  Leisure_traceReturn(L$F, (L$(resolve(L__foldl))(lazy((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){  var L_m;
  L_m = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))(L_line, L_defPat));
});
})(++Leisure_traceInstance, L$instance);

  return L$(resolve(L_isNil))(L_m, L_result, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("runParseFilters", 2, "runParseFilters filters line = filters\n  \\h t D . primBind (h line) \\filtered . runParseFilters t filtered\n  fakereturn line", lazy((function(){
  var L$F = function(L_filters){return (
  Leisure_traceCall(L$F, L_filters),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_filters)(lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_runParseFilters))(L_t, L_filtered)))
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
})()))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_fakereturn)(L_line));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("isBlockStart", 1, "isBlockStart tok = and\n  or (isToken tok) (isString tok)\n  _contains blockStarts (strTokenString tok)", lazy((function(){
  var L$F = function(L_tok){return (
  Leisure_traceCall(L$F, L_tok),
  Leisure_traceReturn(L$F, (L$(resolve(L_and))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_or))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L__contains))(L_blockStarts, (function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("macroSub", 2, "macroSub macs expr = postProcessMacro (emptyFor expr) (emptyFor expr) (baseMacroSub macs expr)", lazy((function(){
  var L$F = function(L_macs){return (
  Leisure_traceCall(L$F, L_macs),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_expr){return (
  Leisure_traceCall(L$F, L_expr),
  Leisure_traceReturn(L$F, (L$(resolve(L_postProcessMacro))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_expr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_expr));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_baseMacroSub))(L_macs, L_expr));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("consifyMacroValue", 1, "consifyMacroValue value = isCons value value (cons value nil)", lazy((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, (L$(resolve(L_isCons))(L_value, L_value, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_value, L_nil));
});
})(++Leisure_traceInstance, L$instance))))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("baseMacroSub", 2, "baseMacroSub macs expr = isToken expr\n  expr\n  isParens expr\n    expr \\start end content . \\\\\n      result = baseMacroSub macs content\n      .\n      isToken result result (parens start end result)\n    withCons expr expr \\h t .\n      isBlockStart h\n        cons h\n          isTokenString h '\\\\\\\\'\n            macroSubLet macs t\n            macroSubBody '.' macs t\n        withToken h\n          \\\\\n            subH = baseMacroSub macs h\n            .\n            withToken subH\n              cons subH (_map (baseMacroSub macs) t)\n              \\tok pos . baseMacroSub macs (cons subH t)\n          \\tok pos . \\\\\n            def = mapGet tok macs\n            .\n            mapContains tok macs\n              baseMacroSub macs (def t)\n              cons h (_map (baseMacroSub macs) t)", lazy((function(){
  var L$F = function(L_macs){return (
  Leisure_traceCall(L$F, L_macs),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_expr){return (
  Leisure_traceCall(L$F, L_expr),
  Leisure_traceReturn(L$F, (L$(resolve(L_isToken))(L_expr, L_expr, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 31, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isParens))(L_expr, (function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_baseMacroSub))(L_macs, L_content));
});
})(++Leisure_traceInstance, L$instance);

  return L$(resolve(L_isToken))(L_result, L_result, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_parens)(L_start)(L_end)(L_result));
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 30, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_withCons))(L_expr, L_expr, lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (L$(resolve(L_isBlockStart))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))(L_h, "\\\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_macroSubLet))(L_macs, L_t));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_macroSubBody))(".", L_macs, L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_withToken))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_subH;
  L_subH = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_baseMacroSub))(L_macs, L_h));
});
})(++Leisure_traceInstance, L$instance);

  return L$(resolve(L_withToken))(L_subH, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_subH, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__map))((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_baseMacroSub))(L_macs, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_subH, L_t));
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
  return Leisure_traceResolve(L$(resolve(L_baseMacroSub))(L_macs, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_def)(L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__map))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("macroSubLet", 2, "macroSubLet macs list = list\n  \\h t D . isTokenString h '.'\n    cons h (baseMacroSub macs t)\n    cons (setParens h \\content . macroSubBody '=' macs content) (macroSubLet macs t)\n  # Don't bother with parse errors at this point -- ast generator will detect them\n  nil", lazy((function(){
  var L$F = function(L_macs){return (
  Leisure_traceCall(L$F, L_macs),
  Leisure_traceReturn(L$F, ((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_isTokenString))(L_h, ".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_baseMacroSub))(L_macs, L_t));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_setParens))(L_h, lazy((function(){
  var L$F = function(L_content){return (
  Leisure_traceCall(L$F, L_content),
  Leisure_traceReturn(L$F, (L$(resolve(L_macroSubBody))("=", L_macs, L_content)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 3, L$F.L$instanceId);
  return L$F;
})())));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_macroSubLet))(L_macs, L_t));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("macroSubBody", 3, "macroSubBody char macs list = list\n  \\h t D . cons h\n    isTokenString h char baseMacroSub (macroSubBody char)\n      macs\n      t\n  nil", lazy((function(){
  var L$F = function(L_char){return (
  Leisure_traceCall(L$F, L_char),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_macs){return (
  Leisure_traceCall(L$F, L_macs),
  Leisure_traceReturn(L$F, ((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isTokenString))(L_h, L_char, L_baseMacroSub, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_macroSubBody)(L_char));
});
})(++Leisure_traceInstance, L$instance), L_macs, L_t));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("postProcessMacro", 3, "postProcessMacro before after expr = isString expr\n  token expr (isEmptyPos after before after)\n  isParens expr\n    expr \\start end contents . parens start end (postProcessMacro start end contents)\n    isCons expr\n      expr \\h t .\n        isToken h\n          cons h (postProcessMacro (addFilepos (addFilepos (tokenFilepos h) (strLen (tokenString h))) 1) (emptyFor h) t)\n          \\\\\n            posStart = position h\n            posEnd = position t\n            t2 = postProcessMacro (emptyFor posStart) after t\n            h2 = postProcessMacro before (emptyFor posStart) h\n            .\n            isEmptyPos posStart\n              cons (postProcessMacro before (position t2) h) t2\n              cons h2 (postProcessMacro (addFilepos (lexEnd h2) 1) after t)\n      isNumber expr\n        token (strString expr) (isEmptyPos after before after)\n        expr", lazy((function(){
  var L$F = function(L_before){return (
  Leisure_traceCall(L$F, L_before),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_after){return (
  Leisure_traceCall(L$F, L_after),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_expr){return (
  Leisure_traceCall(L$F, L_expr),
  Leisure_traceReturn(L$F, (L$(resolve(L_isString))(L_expr, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)(L_expr)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isEmptyPos))(L_after, L_before, L_after));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 38, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isParens))(L_expr, (function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (resolve(L_parens)(L_start)(L_end)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_postProcessMacro))(L_start, L_end, L_contents));
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 37, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isCons))(L_expr, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 32, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_expr)(lazy((function(){
  var L$F = function(L_h){return (
  Leisure_traceCall(L$F, L_h),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_t){return (
  Leisure_traceCall(L$F, L_t),
  Leisure_traceReturn(L$F, (L$(resolve(L_isToken))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 15, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 14, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_postProcessMacro))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 12, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_addFilepos))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 11, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_addFilepos))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_postProcessMacro))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_posStart));
});
})(++Leisure_traceInstance, L$instance), L_after, L_t));
});
})(++Leisure_traceInstance, L$instance);
  L_h2 = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 21, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_postProcessMacro))(L_before, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 20, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_emptyFor)(L_posStart));
});
})(++Leisure_traceInstance, L$instance), L_h));
});
})(++Leisure_traceInstance, L$instance);

  return L$(resolve(L_isEmptyPos))(L_posStart, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 24, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 23, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_postProcessMacro))(L_before, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 22, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_position)(L_t2));
});
})(++Leisure_traceInstance, L$instance), L_h));
});
})(++Leisure_traceInstance, L$instance), L_t2));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 28, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_h2, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 27, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_postProcessMacro))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 26, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_addFilepos))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 36, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isNumber))(L_expr, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 35, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 33, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strString)(L_expr));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 34, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isEmptyPos))(L_after, L_before, L_after));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_expr));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance))))
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 41, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("defMacro", 2, "defMacro name def = primBind (getValue 'macroDefs')\n  \\macs . setValue 'macroDefs' (mapSet name def macs)", lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_def){return (
  Leisure_traceCall(L$F, L_def),
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("delimiterListPrefix", 0, "delimiterListPrefix = \"\\\"(?:\\\\\\\\.|[^\\\"])*\\\"|'(?:\\\\\\\\.|[^'])*'|\\\\r?\\\\n *#[^\\\\r\\\\n]*|\\\\r?\\\\n *| +|#[^\\\\r\\\\n]*\"", "\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'|\\r?\\n *#[^\\r\\n]*|\\r?\\n *| +|#[^\\r\\n]*");
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("regexpEscapePat", 0, "regexpEscapePat = regexpFlags '[\\\\-\\\\[\\\\]/\\\\{\\\\}\\\\(\\\\)\\\\*\\\\+\\\\?\\\\.\\\\\\\\\\\\^\\\\$\\\\|]' 'g'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_regexpFlags))("[\\-\\[\\]/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]", "g"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("addToken", 1, "addToken del = primBind (getValue 'tokenList')\n  \\dels . _contains dels del\n    false\n    \\\\\n      newDels = insertSorted (\\a b . > (strLen a) (strLen b)) del dels\n      .\n      primBind (setValue 'tokenList' newDels)\n        \\_ . computeTokenPat newDels", lazy((function(){
  var L$F = function(L_del){return (
  Leisure_traceCall(L$F, L_del),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenList"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_dels){return (
  Leisure_traceCall(L$F, L_dels),
  Leisure_traceReturn(L$F, (L$(resolve(L__contains))(L_dels, L_del, L_false, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve((function(){  var L_newDels;
  L_newDels = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_insertSorted))(lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("computeTokenPat", 1, "computeTokenPat dels = \\\\\n  delPats = _map (\\item . strReplace item regexpEscapePat \"\\\\$&\") dels\n  newPat = strCat (cons '(' (cons (_strJoin (cons delimiterListPrefix delPats) '|') (cons ')' nil)))\n  .\n  setValue 'tokenPat' newPat", lazy((function(){
  var L$F = function(L_dels){return (
  Leisure_traceCall(L$F, L_dels),
  Leisure_traceReturn(L$F, ((function(){  var L_delPats, L_newPat;
  L_delPats = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__map))(lazy((function(){
  var L$F = function(L_item){return (
  Leisure_traceCall(L$F, L_item),
  Leisure_traceReturn(L$F, (L$(resolve(L_strReplace))(L_item, L_regexpEscapePat, "\\$&")))
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
  return Leisure_traceResolve(L$(resolve(L_cons))("(", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L__strJoin)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_delimiterListPrefix, L_delPats));
});
})(++Leisure_traceInstance, L$instance), "|"));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(")", L_nil));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("addTokenGroup", 2, "addTokenGroup open close = primBind (addToken open)\n  \\_ . primBind (addToken close)\n    \\_ . primBind (getValue 'tokenGroups')\n      \\gr . setValue 'tokenGroups' (acons open close gr)", lazy((function(){
  var L$F = function(L_open){return (
  Leisure_traceCall(L$F, L_open),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_close){return (
  Leisure_traceCall(L$F, L_close),
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
  return Leisure_traceResolve(L$(resolve(L_acons))(L_open, L_close, L_gr));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parenGroups", 0, "parenGroups = acons '(' ')' nil", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_acons))("(", ")", L_nil));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("testParse", 2, "testParse str pat = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil parenGroups) \\list . list \\h t . stripParens h", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseIndent))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)("\n")(L_startFilePos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_tokens))(L_str, L_pat));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseG", 3, "parseG str pat groups = ifNotErr (parseIndent (token '\\n' startFilePos) (tokens str pat) nil groups) \\list . list \\h t . stripParens h", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_groups){return (
  Leisure_traceCall(L$F, L_groups),
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_parseIndent))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_token)("\n")(L_startFilePos));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_tokens))(L_str, L_pat));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseToAst", 2, "parseToAst str pat = createAst nil (testParse str pat) nil", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, (L$(resolve(L_createAst))(L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_testParse))(L_str, L_pat));
});
})(++Leisure_traceInstance, L$instance), L_nil)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseM", 1, "parseM str =\n  primBind (getValue 'tokenPat')\n    \\tokPat . primBind (getValue 'tokenGroups')\n      \\groups . parseG str tokPat groups", lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_parseG))(L_str, L_tokPat, L_groups)))
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("scanLine", 4, "scanLine str pat onDef onExpr = scanLineG str pat parenGroups onDef onExpr", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onDef){return (
  Leisure_traceCall(L$F, L_onDef),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onExpr){return (
  Leisure_traceCall(L$F, L_onExpr),
  Leisure_traceReturn(L$F, (L$(resolve(L_scanLineG))(L_str, L_pat, L_parenGroups, L_onDef, L_onExpr)))
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 4, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseLine", 5, "parseLine str pat names onDef onExpr = parseLineG str pat names parenGroups onDef onExpr", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pat){return (
  Leisure_traceCall(L$F, L_pat),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onDef){return (
  Leisure_traceCall(L$F, L_onDef),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_onExpr){return (
  Leisure_traceCall(L$F, L_onExpr),
  Leisure_traceReturn(L$F, (L$(resolve(L_parseLineG))(L_str, L_pat, L_names, L_parenGroups, L_onDef, L_onExpr)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseLineM", 1, "parseLineM str = primBind (getValue 'tokenPat')\n  \\tokPat . primBind (getValue 'tokenGroups')\n    \\groups . parseLineG str tokPat nil groups id id", lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_parseLineG))(L_str, L_tokPat, L_nil, L_groups, L_id, L_id)))
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("macroSubM", 1, "macroSubM expr =\n  primBind (getValue 'macroDefs')\n    \\macs . macroSub macs expr", lazy((function(){
  var L$F = function(L_expr){return (
  Leisure_traceCall(L$F, L_expr),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("macroDefs"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_macs){return (
  Leisure_traceCall(L$F, L_macs),
  Leisure_traceReturn(L$F, (L$(resolve(L_macroSub))(L_macs, L_expr)))
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("macroParse", 1, "macroParse str =\n  primBind (parseM str)\n    \\ex . macroSubM ex", lazy((function(){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("tokensM", 1, "tokensM str =\n  primBind (getValue 'tokenPat')\n    \\delimiterPat . tokens str delimiterPat", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPat"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_delimiterPat){return (
  Leisure_traceCall(L$F, L_delimiterPat),
  Leisure_traceReturn(L$F, (L$(resolve(L_tokens))(L_str, L_delimiterPat)))
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseLines", 2, "parseLines lines result = lines\n  \\h t D . primBind (parseLineM h)\n    \\ast . parseLines t (cons ast result)\n  _reverse result", lazy((function(){
  var L$F = function(L_lines){return (
  Leisure_traceCall(L$F, L_lines),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (resolve(L_lines)(lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_parseLines))(L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_ast, L_result));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("parseFile", 1, "parseFile text = parseLines (linesForFile text) nil", lazy((function(){
  var L$F = function(L_text){return (
  Leisure_traceCall(L$F, L_text),
  Leisure_traceReturn(L$F, (L$(resolve(L_parseLines))((function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("simpleScanLine", 1, "simpleScanLine line = primBind (getValue 'tokenPat')\n  \\tokenPat . primBind (getValue 'tokenGroups')\n    \\groups . scanLineG line tokenPat groups id id", lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_scanLineG))(L_line, L_tokenPat, L_groups, L_id, L_id)))
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("scanLineM", 1, "scanLineM line = countedScanLineM emptyLineStarts line", lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (L$(resolve(L_countedScanLineM))(L_emptyLineStarts, L_line)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedScanLineM", 2, "countedScanLineM lineStarts line = primBind (getValue 'tokenPat')\n  \\tokenPat . primBind (getValue 'tokenGroups')\n    \\groups . primBind (getValue 'parseFilters')\n      \\filters . primBind (getValue 'macroDefs')\n        \\macros . primBind (getValue 'parser_funcProps')\n          \\props . primBind (runParseFilters filters (countedScanLineG lineStarts line tokenPat groups props id id))\n            \\scanned . macroSub macros scanned", lazy((function(){
  var L$F = function(L_lineStarts){return (
  Leisure_traceCall(L$F, L_lineStarts),
  Leisure_traceReturn(L$F, ((function(){
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
  return Leisure_traceResolve(L$(resolve(L_runParseFilters))(L_filters, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countedScanLineG))(L_lineStarts, L_line, L_tokenPat, L_groups, L_props, L_id, L_id));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_scanned){return (
  Leisure_traceCall(L$F, L_scanned),
  Leisure_traceReturn(L$F, (L$(resolve(L_macroSub))(L_macros, L_scanned)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("newline", 0, "newline = regexp '\\\\r?\\\\n'", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_regexp)("\\r?\\n"));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("findLines", 2, "findLines offset line = \\\\\n  m = strMatch line newline\n  idx = + 1 (head (tail (tail m)))\n  .\n  eq m nil\n    cons offset nil\n    cons offset (findLines (+ offset idx) (strSubstring line idx 0))", lazy((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){  var L_m, L_idx;
  L_m = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strMatch))(L_line, L_newline));
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
  return Leisure_traceResolve(L$(resolve(L_cons))(L_offset, L_nil));
});
})(++Leisure_traceInstance, L$instance))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_offset, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 9, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_findLines))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_$o)(L_offset, L_idx));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_strSubstring))(L_line, L_idx, 0));
});
})(++Leisure_traceInstance, L$instance)));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("newParseLine", 3, "newParseLine offset names line = primBind (scanLineM line)\n  \\scanned . ifNotErr (createAst (cons \"NEWPARSE.lsr\" (findLines offset line)) scanned names) id", lazy((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_scanLineM)(L_line));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_scanned){return (
  Leisure_traceCall(L$F, L_scanned),
  Leisure_traceReturn(L$F, (L$(resolve(L_ifNotErr))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_createAst))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("NEWPARSE.lsr", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_findLines))(L_offset, L_line));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedParseLine", 2, "countedParseLine names countedLine = primBind (countedScanLineM (head countedLine) (tail countedLine))\n  \\scanned . createAst (head countedLine) scanned names", lazy((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_countedLine){return (
  Leisure_traceCall(L$F, L_countedLine),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countedScanLineM))((function(L$instance, L$parentInstance){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_createAst))((function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("runLine", 3, "runLine offset names line = primBind (newParseLine offset names line)\n  \\ast . primBind (runAst line ast)\n    \\res . primBind res\n      \\result . cons\n        ast\n        isErr result\n          left (errMsg result)\n          right result", lazy((function(){
  var L$F = function(L_offset){return (
  Leisure_traceCall(L$F, L_offset),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_newParseLine))(L_offset, L_names, L_line));
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
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_ast, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isErr))(L_result, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_left)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_errMsg)(L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedRunLine", 3, "countedRunLine file names countedLine = primBind (countedParseLine names countedLine)\n  \\ast . \\\\\n    wrapped = astFileWrap file ast\n    .\n    primBind (runAst (tail countedLine) wrapped)\n      \\res . primBind res\n        \\result . resultOfRun wrapped result", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_countedLine){return (
  Leisure_traceCall(L$F, L_countedLine),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countedParseLine))(L_names, L_countedLine));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
  Leisure_traceReturn(L$F, ((function(){  var L_wrapped;
  L_wrapped = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_astFileWrap))(L_file, L_ast));
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
  Leisure_traceReturn(L$F, (L$(resolve(L_resultOfRun))(L_wrapped, L_result)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("resultOfRun", 2, "resultOfRun wrapped result =\n  cons\n    wrapped\n    isErr result\n      left (errMsg result)\n      right result", lazy((function(){
  var L$F = function(L_wrapped){return (
  Leisure_traceCall(L$F, L_wrapped),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_wrapped, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_isErr))(L_result, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_left)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_errMsg)(L_result));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_right)(L_result));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("astFileWrap", 2, "astFileWrap file ast = anno 'filename' (basename file) ast", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_ast){return (
  Leisure_traceCall(L$F, L_ast),
  Leisure_traceReturn(L$F, (resolve(L_anno)("filename")((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_basename)(L_file));
});
})(++Leisure_traceInstance, L$instance))(L_ast)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("basename", 1, "basename file = strReplace file (regexp '^(.*/)?([^/]+)$') '$2'", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, (L$(resolve(L_strReplace))(L_file, (function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("runLines", 2, "runLines names lines = lines\n  \\h t D . primBind (runLine 0 names h)\n    \\line . primBind (runLines names t)\n      \\rest . cons line rest\n  nil", lazy((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_lines){return (
  Leisure_traceCall(L$F, L_lines),
  Leisure_traceReturn(L$F, (resolve(L_lines)(lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L_runLine))(0, L_names, L_h));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_runLines))(L_names, L_t));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_line, L_rest)))
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
})()))(L_nil)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedRunLines", 4, "countedRunLines file names countedLines result = countedLines\n  \\h t D . primBind (countedRunLine file names h)\n    \\line . countedRunLines file names t (cons line result)\n  _reverse result", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_countedLines){return (
  Leisure_traceCall(L$F, L_countedLines),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_result){return (
  Leisure_traceCall(L$F, L_result),
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
  return Leisure_traceResolve(L$(resolve(L_countedRunLine))(L_file, L_names, L_h));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, (L$(resolve(L_countedRunLines))(L_file, L_names, L_t, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_line, L_result));
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
})()))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 11, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("runFile", 1, "runFile text = runNamedFile \"RUNFILE.lsr\" text", lazy((function(){
  var L$F = function(L_text){return (
  Leisure_traceCall(L$F, L_text),
  Leisure_traceReturn(L$F, (L$(resolve(L_runNamedFile))("RUNFILE.lsr", L_text)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 1, L$F.L$instanceId);
  return L$F;
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("runNamedFile", 2, "runNamedFile name text = \\\\\n  counted = countedLinesForFile name text\n  lines = _map tail counted\n  names = namesForLines lines\n  .\n  #countedRunLines name names counted\n  countedRunLines name names counted nil", lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_text){return (
  Leisure_traceCall(L$F, L_text),
  Leisure_traceReturn(L$F, ((function(){  var L_counted, L_lines, L_names;
  L_counted = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countedLinesForFile))(L_name, L_text));
});
})(++Leisure_traceInstance, L$instance);
  L_lines = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__map))(L_tail, L_counted));
});
})(++Leisure_traceInstance, L$instance);
  L_names = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_namesForLines)(L_lines));
});
})(++Leisure_traceInstance, L$instance);

  return L$(resolve(L_countedRunLines))(L_name, L_names, L_counted, L_nil)})()))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("baseLoad", 1, "baseLoad file = primBind (readFile file)\n  \\result . result\n    \\err . err\n    \\contents . baseLoadString file contents", lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_baseLoadString))(L_file, L_contents)))
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("baseLoadString", 2, "baseLoadString file contents = primBind (getValue 'activeTokenPacks')\n  \\activePacks . primBind resetStdTokenPacks\n    \\_ . primBind resetNameSpaceInfo\n      \\nsInfo . primBind (runNamedFile file contents)\n        \\result . primBind (setNameSpaceInfo nsInfo)\n          \\_ . primBind (isNil activePacks\n            resetStdTokenPacks\n            resetTokenPacks activePacks)\n            \\_ . result", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_contents){return (
  Leisure_traceCall(L$F, L_contents),
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
  return Leisure_traceResolve(L$(resolve(L_runNamedFile))(L_file, L_contents));
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
  return Leisure_traceResolve(L$(resolve(L_isNil))(L_activePacks, L_resetStdTokenPacks, (function(L$instance, L$parentInstance){
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("load", 1, "load file = primBind (baseLoad file)\n  \\result . \\\\\n    errs = _foldr (\\line results . tail line (\\er . cons er results) (\\x . results)) nil result\n    .\n    isNil errs\n      right true\n      left errs", lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L__foldr))(lazy((function(){
  var L$F = function(L_line){return (
  Leisure_traceCall(L$F, L_line),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_results){return (
  Leisure_traceCall(L$F, L_results),
  Leisure_traceReturn(L$F, (L$(resolve(L_tail))(L_line, lazy((function(){
  var L$F = function(L_er){return (
  Leisure_traceCall(L$F, L_er),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_er, L_results)))
);};
  L$F.leisureLength = L$F.length;
  L$F.L$instanceId = ++Leisure_traceInstance;
  Leisure_traceLambda(L$F, L$context, 2, L$F.L$instanceId);
  return L$F;
})()), lazy((function(){
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

  return L$(resolve(L_isNil))(L_errs, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_right)(L_true));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("require", 1, "require file = primBind (getValue 'requiredFiles')\n  \\files . _contains files file\n    right false\n    primBind (setValue 'requiredFiles' (cons file files))\n      \\_. primBind (load file)\n        \\result . result\n          \\x . left x\n          \\_ . right true", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("requiredFiles"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_files){return (
  Leisure_traceCall(L$F, L_files),
  Leisure_traceReturn(L$F, (L$(resolve(L__contains))(L_files, L_file, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_right)(L_false));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 10, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_setValue)("requiredFiles", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_file, L_files));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("scanFile", 1, "scanFile file = primBind (readFile file)\n  \\result . result\n    \\err . err\n      \\_ . primBind (runNamedFile file contents)\n        counted = countedLinesForFile name text\n        lines = _map tail counted\n        names = namesForLines lines\n        .\n        countedScanLines name names counted", lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L_runNamedFile))(L_file, L_contents));
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
  return Leisure_traceResolve(L$(resolve(L_countedScanLines))(L_name, L_names, L_counted));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("countedScanLines", 3, "countedScanLines file names countedLines = countedLines\n  \\h t D . primBind (countedScanLineM (head h) (tail h))\n    \\line . primBind (countedScanLines file names t)\n      \\rest . cons line rest\n  nil", lazy((function(){
  var L$F = function(L_file){return (
  Leisure_traceCall(L$F, L_file),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_names){return (
  Leisure_traceCall(L$F, L_names),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_countedLines){return (
  Leisure_traceCall(L$F, L_countedLines),
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
  return Leisure_traceResolve(L$(resolve(L_countedScanLineM))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_countedScanLines))(L_file, L_names, L_t));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_rest){return (
  Leisure_traceCall(L$F, L_rest),
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_line, L_rest)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("defTokenPack", 2, "defTokenPack name pack = primBind (getValue 'tokenPacks')\n  \\packs . setValue 'tokenPacks' (acons name pack packs)", lazy((function(){
  var L$F = function(L_name){return (
  Leisure_traceCall(L$F, L_name),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_pack){return (
  Leisure_traceCall(L$F, L_pack),
  Leisure_traceReturn(L$F, (resolve(L_primBind)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_getValue)("tokenPacks"));
});
})(++Leisure_traceInstance, L$instance), lazy((function(){
  var L$F = function(L_packs){return (
  Leisure_traceCall(L$F, L_packs),
  Leisure_traceReturn(L$F, (resolve(L_setValue)("tokenPacks", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_acons))(L_name, L_pack, L_packs));
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("useTokenPack", 1, "useTokenPack name = primBind (getValue 'tokenPacks')\n  \\packs . primBind (getValue 'tokenGroups')\n    \\groups . primBind (getValue 'tokenList')\n      \\tokens . primBind (getValue 'activeTokenPacks')\n        \\activePacks . primBind (getValue 'parseFilters')\n          \\filters . assoc name packs\n            \\pack . \\\\\n              groupToks = _foldl (\\value el . el \\h t . cons h (cons t value)) nil (head (tail pack))\n              newToks = _sort (\\a b . > (strLen a) (strLen b)) (_append (head pack) (_append groupToks tokens))\n              .\n              primBind (setValue 'tokenList' newToks)\n                \\_ . primBind (setValue 'tokenGroups' (appendAlist (head (tail pack)) groups))\n                  \\_ . primBind (setValue 'parseFilters' (_append filters (head (tail (tail pack)))))\n                    \\_ . primBind (computeTokenPat newToks)\n                      \\_ . setValue 'activeTokenPacks' (cons name activePacks)\n            nil", lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_assoc))(L_name, L_packs, lazy((function(){
  var L$F = function(L_pack){return (
  Leisure_traceCall(L$F, L_pack),
  Leisure_traceReturn(L$F, ((function(){  var L_groupToks, L_newToks;
  L_groupToks = (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 13, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__foldl))(lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L_cons))(L_h, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_t, L_value));
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
  return Leisure_traceResolve(L$(resolve(L__append))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 18, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)(L_pack));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 19, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L__append))(L_groupToks, L_tokens));
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
  return Leisure_traceResolve(L$(resolve(L_appendAlist))((function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L__append))(L_filters, (function(L$instance, L$parentInstance){
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
  return Leisure_traceResolve(L$(resolve(L_cons))(L_name, L_activePacks));
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
})()), L_nil)))
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("resetTokenPacks", 1, "resetTokenPacks packs = primBind (setValue 'tokenGroups' nil)\n  \\_ . primBind (setValue 'tokenList' nil)\n    \\_ . primBind (setValue 'activeTokenPacks' nil)\n      \\_ . primBind (setValue 'parseFilters' nil)\n        \\_ . _foldr1\n          \\packCmd result . primBind packCmd \\_ . result\n          _map useTokenPack packs", lazy((function(){
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
  Leisure_traceReturn(L$F, (L$(resolve(L__foldr1))(lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L__map))(L_useTokenPack, L_packs));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("resetStdTokenPacks", 0, "resetStdTokenPacks = primBind (getValue 'stdTokenPacks')\n  \\stds . primBind (resetTokenPacks stds)\n    \\_ . setValue 'activeTokenPacks' nil", (function(L$instance, L$parentInstance){
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("addStdTokenPacks", 1, "addStdTokenPacks morePacks = primBind (getValue 'stdTokenPacks')\n  \\stds . setValue 'stdTokenPacks' (_append stds morePacks)", lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L__append))(L_stds, L_morePacks));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("addParseFilter", 1, "addParseFilter filt = primBind (getValue 'parseFilters')\n  \\filters . setValue 'parseFilters' (_append filters (cons filt nil))", lazy((function(){
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
  return Leisure_traceResolve(L$(resolve(L__append))(L_filters, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_filt, L_nil));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("d", 3, "d label value expr = log (strCat (cons label (cons value nil))) expr", lazy((function(){
  var L$F = function(L_label){return (
  Leisure_traceCall(L$F, L_label),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_value){return (
  Leisure_traceCall(L$F, L_value),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_expr){return (
  Leisure_traceCall(L$F, L_expr),
  Leisure_traceReturn(L$F, (resolve(L_log)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_strCat)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_label, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_value, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), L_expr)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("dd", 2, "dd label arg = d label arg arg", lazy((function(){
  var L$F = function(L_label){return (
  Leisure_traceCall(L$F, L_label),
  Leisure_traceReturn(L$F, ((function(){
  var L$F = function(L_arg){return (
  Leisure_traceCall(L$F, L_arg),
  Leisure_traceReturn(L$F, (L$(resolve(L_d))(L_label, L_arg, L_arg)))
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
})()));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_define)("testParse", 1, "testParse str = countedParseLine nil (head (countedLinesForFile 'parse' str))", lazy((function(){
  var L$F = function(L_str){return (
  Leisure_traceCall(L$F, L_str),
  Leisure_traceReturn(L$F, (L$(resolve(L_countedParseLine))(L_nil, (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(resolve(L_head)((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_countedLinesForFile))("parse", L_str));
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
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("macroDefs", L_hamt);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("requiredFiles", L_nil);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("tokenPacks", L_nil);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("activeTokenPacks", L_nil);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("stdTokenPacks", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("std", L_nil));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return resolve(L_setValue)("parser_funcProps", L_nil);
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return ((function(L$context, L$instance){
  var L$ret;
  Leisure_traceTopLevel(L$context);
  return L$(resolve(L_defTokenPack))("std", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 8, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 4, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(".", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 3, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 2, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("\\\\", (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 1, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))("\\@", L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 7, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))((function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 5, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_acons))("(", ")", L_nil));
});
})(++Leisure_traceInstance, L$instance), (function(L$instance, L$parentInstance){
  return Leisure_traceLazyValue(L$context, 6, L$instance, L$parentInstance, function(){
  return Leisure_traceResolve(L$(resolve(L_cons))(L_nil, L_nil));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance)));
});
})(++Leisure_traceInstance, L$instance));
})(++Leisure_traceContext, ++Leisure_traceInstance));}, 
    function(){return (resolve(L_resetStdTokenPacks));}
  ]);
});
//# sourceMappingURL=simpleParse.map
