if (typeof require !== "undefined" && require !== null) {Lazp = require("./lazp")};
setId = Lazp.setId;
setType = Lazp.setType;
setDataType = Lazp.setDataType;
define = Lazp.define;
//id = lambda x . ref x
(function(){
  var subfunc0 = function(_x){return _x()}

  return define('id', subfunc0)
})();
//true = lambda a . lambda b . ref a
(function(){
  var subfunc0 = setType(function(_a){return function(_b){return _a()}}, 'true')

  return define('true', subfunc0)
})();
//false = lambda a . lambda b . ref b
(function(){
  var subfunc0 = function(_b){return _b()}
var subfunc1 = setType(function(_a){return subfunc0}, 'false')

  return define('false', subfunc1)
})();
//cons = lambda a . lambda b . lambda f . apply (apply (ref f) (ref a)) (ref b)
(function(){
  var subfunc0 = setDataType(function(_a){return function(_b){return setType(function(_f){return _f()(_a)(_b)}, 'cons')}}, 'cons')

  return define('cons', subfunc0)
})();
//nil = lambda a . lambda b . ref b
(function(){
  var subfunc0 = function(_b){return _b()}
var subfunc1 = setType(function(_a){return subfunc0}, 'nil')

  return define('nil', subfunc1)
})();
//append = lambda l1 . lambda l2 . apply (apply (ref l1) (lambda h . lambda t . lambda D . apply (apply (ref cons) (ref h)) (apply (apply (ref append) (ref t)) (ref l2)))) (ref l2)
(function(){
  var subfunc0 = function(_l1){return function(_l2){return _l1()((function(){return function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){return _append()(_t)(_l2)}))}}}}))(_l2)}}

  return define('append', subfunc0)
})();
//[ = lambda item . lambda c . apply (ref c) (lambda rest . apply (apply (ref cons) (ref item)) (ref rest))
(function(){
  var subfunc0 = setType(function(_item){return function(_c){return _c()((function(){return function(_rest){return _cons()(_item)(_rest)}}))}}, '[')

  return define('[', subfunc0)
})();
//, = lambda f . lambda item . lambda c . apply (ref c) (lambda rest . apply (ref f) (apply (apply (ref cons) (ref item)) (ref rest)))
(function(){
  var subfunc0 = setType(function(_f){return function(_item){return function(_c){return _c()((function(){return function(_rest){return _f()((function(){return _cons()(_item)(_rest)}))}}))}}}, ',')

  return define(',', subfunc0)
})();
//] = lambda f . apply (ref f) (ref nil)
(function(){
  var subfunc0 = setType(function(_f){return _f()(_nil)}, ']')

  return define(']', subfunc0)
})();
//| = lambda f . lambda rest . lambda g . apply (ref f) (ref rest)
(function(){
  var subfunc0 = setType(function(_f){return function(_rest){return function(_g){return _f()(_rest)}}}, '|')

  return define('|', subfunc0)
})();
//dl = lambda list . apply (ref append) (ref list)
(function(){
  var subfunc0 = function(_list){return _append()(_list)}

  return define('dl', subfunc0)
})();
//dlAppend = lambda da . lambda db . lambda list . apply (ref da) (apply (ref db) (ref list))
(function(){
  var subfunc0 = function(_da){return function(_db){return function(_list){return _da()((function(){return _db()(_list)}))}}}

  return define('dlAppend', subfunc0)
})();
//dlList = lambda dl . apply (ref dl) (ref nil)
(function(){
  var subfunc0 = function(_dl){return _dl()(_nil)}

  return define('dlList', subfunc0)
})();
//ioMonad = lambda cmds . lambda f . apply (ref f) (ref cmds)
(function(){
  var subfunc0 = setDataType(function(_cmds){return setType(function(_f){return _f()(_cmds)}, 'ioMonad')}, 'ioMonad')

  return define('ioMonad', subfunc0)
})();
//getCmds = lambda m . apply (ref m) (lambda cmds . ref cmds)
(function(){
  var subfunc0 = function(_m){return _m()((function(){return function(_cmds){return _cmds()}}))}

  return define('getCmds', subfunc0)
})();
//getAllCmds = lambda m . apply (ref dlList) (apply (ref getCmds) (ref m))
(function(){
  var subfunc0 = function(_m){return _dlList()((function(){return _getCmds()(_m)}))}

  return define('getAllCmds', subfunc0)
})();
//returnCmd = lambda x . lambda f . apply (ref f) (ref x)
(function(){
  var subfunc0 = function(_x){return function(_f){return _f()(_x)}}

  return define('returnCmd', subfunc0)
})();
//return = lambda x . apply (ref ioMonad) (apply (ref dl) (apply (apply (ref [) (apply (ref returnCmd) (ref x))) (ref ])))
(function(){
  var subfunc0 = function(_x){return _ioMonad()((function(){return _dl()((function(){return _$r()((function(){return _returnCmd()(_x)}))(_$s)}))}))}

  return define('return', subfunc0)
})();
//bindCmd = lambda action . lambda f . apply (ref f) (ref action)
(function(){
  var subfunc0 = function(_action){return function(_f){return _f()(_action)}}

  return define('bindCmd', subfunc0)
})();
//getBindAction = lambda cmd . apply (ref cmd) (lit ident)
(function(){
  var subfunc0 = function(_cmd){return _cmd()((function(){return "ident"}))}

  return define('getBindAction', subfunc0)
})();
//bind = lambda io . lambda f . apply (ref io) (lambda cmds . apply (ref ioMonad) (apply (apply (ref dlAppend) (ref cmds)) (apply (ref dl) (apply (apply (ref [) (apply (ref bindCmd) (ref f))) (ref ])))))
(function(){
  var subfunc0 = function(_io){return function(_f){return _io()((function(){return function(_cmds){return _ioMonad()((function(){return _dlAppend()(_cmds)((function(){return _dl()((function(){return _$r()((function(){return _bindCmd()(_f)}))(_$s)}))}))}))}}))}}

  return define('bind', subfunc0)
})();
//alertCmd = lambda thing . lambda f . apply (ref f) (ref thing)
(function(){
  var subfunc0 = function(_thing){return function(_f){return _f()(_thing)}}

  return define('alertCmd', subfunc0)
})();
//alert = lambda thing . apply (ref ioMonad) (apply (ref dl) (apply (apply (ref [) (apply (ref alertCmd) (ref thing))) (ref ])))
(function(){
  var subfunc0 = function(_thing){return _ioMonad()((function(){return _dl()((function(){return _$r()((function(){return _alertCmd()(_thing)}))(_$s)}))}))}

  return define('alert', subfunc0)
})();
//promptCmd = lambda pmt . lambda f . apply (ref f) (ref pmt)
(function(){
  var subfunc0 = function(_pmt){return function(_f){return _f()(_pmt)}}

  return define('promptCmd', subfunc0)
})();
//prompt = lambda pmt . apply (ref ioMonad) (apply (ref dl) (apply (apply (ref [) (apply (ref promptCmd) (ref pmt))) (ref ])))
(function(){
  var subfunc0 = function(_pmt){return _ioMonad()((function(){return _dl()((function(){return _$r()((function(){return _promptCmd()(_pmt)}))(_$s)}))}))}

  return define('prompt', subfunc0)
})();
