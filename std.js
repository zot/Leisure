if (typeof require !== "undefined" && require !== null) {Lazp = require("./lazp")};
setId = Lazp.setId;
setType = Lazp.setType;
setDataType = Lazp.setDataType;
define = Lazp.define;
//AST: lambda x . ref x
(function(){
  var subfunc0 = function(_x){return _x()}

  return define('id', subfunc0)
})();
//AST: lambda a . lambda b . ref a
(function(){
  var subfunc0 = setType(function(_a){return function(_b){return _a()}}, 'true')

  return define('true', subfunc0)
})();
//AST: lambda a . lambda b . ref b
(function(){
  var subfunc0 = function(_b){return _b()}
var subfunc1 = setType(function(_a){return subfunc0}, 'false')

  return define('false', subfunc1)
})();
//AST: lambda a . lambda b . lambda f . apply (apply (ref f) (ref a)) (ref b)
(function(){
  var subfunc0 = setDataType(function(_a){return function(_b){return setType(function(_f){return _f()(_a)(_b)}, 'cons')}}, 'cons')

  return define('cons', subfunc0)
})();
//AST: lambda a . lambda b . ref b
(function(){
  var subfunc0 = function(_b){return _b()}
var subfunc1 = setType(function(_a){return subfunc0}, 'nil')

  return define('nil', subfunc1)
})();
//AST: apply (apply (apply (apply (apply (lit l1) (lit l2)) (lit .)) (lit l1)) (lambda h . lambda t . lambda D . apply (apply (ref cons) (ref h)) (apply (apply (ref append) (ref t)) (lit l2)))) (lit l2)
undefined;
//AST: lambda item . lambda c . apply (ref c) (lambda rest . apply (apply (ref cons) (ref item)) (ref rest))
undefined;
//AST: lambda f . lambda item . lambda c . apply (ref c) (lambda rest . apply (ref f) (apply (apply (ref cons) (ref item)) (ref rest)))
undefined;
//AST: lambda f . apply (ref f) (ref nil)
undefined;
//AST: lambda f . lambda rest . lambda g . apply (ref f) (ref rest)
(function(){
  var subfunc0 = setType(function(_f){return function(_rest){return function(_g){return _f()(_rest)}}}, '|')

  return define('|', subfunc0)
})();
//AST: lambda list . apply (ref append) (ref list)
undefined;
//AST: lambda da . lambda db . lambda list . apply (ref da) (apply (ref db) (ref list))
(function(){
  var subfunc0 = function(_da){return function(_db){return function(_list){return _da()((function(){return _db()(_list)}))}}}

  return define('dlAppend', subfunc0)
})();
//AST: lambda dl . apply (ref dl) (ref nil)
undefined;
//AST: lambda cmds . lambda f . apply (ref f) (ref cmds)
(function(){
  var subfunc0 = setDataType(function(_cmds){return setType(function(_f){return _f()(_cmds)}, 'ioMonad')}, 'ioMonad')

  return define('ioMonad', subfunc0)
})();
//AST: lambda m . apply (ref m) (lambda cmds . ref cmds)
(function(){
  var subfunc0 = function(_m){return _m()((function(){return function(_cmds){return _cmds()}}))}

  return define('getCmds', subfunc0)
})();
//AST: lambda m . apply (ref dlList) (apply (ref getCmds) (ref m))
undefined;
//AST: lambda x . lambda f . apply (ref f) (ref x)
(function(){
  var subfunc0 = function(_x){return function(_f){return _f()(_x)}}

  return define('returnCmd', subfunc0)
})();
//AST: lambda x . apply (ref ioMonad) (apply (ref dl) (apply (apply (ref [) (apply (ref returnCmd) (ref x))) (ref ])))
undefined;
//AST: lambda action . lambda f . apply (ref f) (ref action)
(function(){
  var subfunc0 = function(_action){return function(_f){return _f()(_action)}}

  return define('bindCmd', subfunc0)
})();
//AST: lambda cmd . apply (ref cmd) (lit ident)
(function(){
  var subfunc0 = function(_cmd){return _cmd()((function(){return "ident"}))}

  return define('getBindAction', subfunc0)
})();
//AST: lambda io . lambda f . apply (ref io) (lambda cmds . apply (ref ioMonad) (apply (apply (ref dlAppend) (ref cmds)) (apply (ref dl) (apply (apply (ref [) (apply (ref bindCmd) (ref f))) (ref ])))))
undefined;
//AST: lambda thing . lambda f . apply (ref f) (ref thing)
(function(){
  var subfunc0 = function(_thing){return function(_f){return _f()(_thing)}}

  return define('alertCmd', subfunc0)
})();
//AST: lambda thing . apply (ref ioMonad) (apply (ref dl) (apply (apply (ref [) (apply (ref alertCmd) (ref thing))) (ref ])))
undefined;
//AST: lambda pmt . lambda f . apply (ref f) (ref pmt)
(function(){
  var subfunc0 = function(_pmt){return function(_f){return _f()(_pmt)}}

  return define('promptCmd', subfunc0)
})();
//AST: lambda pmt . apply (ref ioMonad) (apply (ref dl) (apply (apply (ref [) (apply (ref promptCmd) (ref pmt))) (ref ])))
undefined;
