if (typeof require !== "undefined" && require !== null) {Lazp = require("./lazp")}
setId = Lazp.setId
setType = Lazp.setType
setDataType = Lazp.setDataType
define = Lazp.define
//AST: lambda a . lambda b . ref a
_true = (function(){
  var subfunc0 = setId(function(_a){return setId(function(_b){return _a()})})

  return define('true', (function(){return subfunc0}))
})()
//AST: lambda a . lambda b . ref b
_false = (function(){
  var subfunc0 = setId(function(_b){return _b()})
var subfunc1 = setId(function(_a){return subfunc0})

  return define('false', (function(){return subfunc1}))
})()
//AST: lambda a . lambda b . lambda f . apply (apply (ref f) (ref a)) (ref b)
_cons = (function(){
  var subfunc0 = setDataType(function(_a){return setId(function(_b){return setType(function(_f){return _f()(_a)(_b)}, "cons")})}, "cons")

  return define('cons', (function(){return subfunc0}))
})()
//AST: apply (lit rec) (lambda append . lambda l1 . lambda l2 . apply (apply (ref l1) (lambda h . lambda t . lambda D . apply (apply (ref cons) (ref h)) (apply (apply (ref append) (ref t)) (ref l2)))) (ref l2))
_append = setId((function(){
  var subfunc0 = setId(function(_l1){return setId(function(_l2){return _l1()((function(){return setId(function(_h){return setId(function(_t){return setId(function(_D){return _cons()(_h)((function(){return _append()(_t)(_l2)}))})})})}))(_l2)})})
var subfunc1 = setId(function(_append){return subfunc0})

  return define('append', (function(){return "rec"((function(){return subfunc1}))}))
})(), null, 'append')
//AST: lambda list . apply (ref append) (ref list)
_dl = setId((function(){
  var subfunc0 = setId(function(_list){return _append()(_list)})

  return define('dl', (function(){return subfunc0}))
})(), null, 'dl')
//AST: lambda da . lambda db . lambda list . apply (ref da) (apply (ref db) (ref list))
_dlAppend = setId((function(){
  var subfunc0 = setId(function(_da){return setId(function(_db){return setId(function(_list){return _da()((function(){return _db()(_list)}))})})})

  return define('dlAppend', (function(){return subfunc0}))
})(), null, 'dlAppend')
//AST: lambda dl . apply (ref dl) (lit nil)
_dlList = setId((function(){
  var subfunc0 = setId(function(_dl){return _dl()((function(){return "nil"}))})

  return define('dlList', (function(){return subfunc0}))
})(), null, 'dlList')
//AST: lambda cmds . lambda f . apply (ref f) (ref cmds)
_makeIO = setId((function(){
  var subfunc0 = setId(function(_cmds){return setId(function(_f){return _f()(_cmds)})})

  return define('makeIO', (function(){return subfunc0}))
})(), null, 'makeIO')
//AST: lambda m . apply (ref m) (lambda cmds . ref cmds)
_getCmds = setId((function(){
  var subfunc0 = setId(function(_cmds){return _cmds()})
var subfunc1 = setId(function(_m){return _m()((function(){return subfunc0}))})

  return define('getCmds', (function(){return subfunc1}))
})(), null, 'getCmds')
//AST: lambda m . apply (ref dlList) (apply (ref getCmds) (ref m))
_getAllCmds = setId((function(){
  var subfunc0 = setId(function(_m){return _dlList()((function(){return _getCmds()(_m)}))})

  return define('getAllCmds', (function(){return subfunc0}))
})(), null, 'getAllCmds')
//AST: lambda x . lambda f . apply (ref f) (ref x)
_returnCmd = setId((function(){
  var subfunc0 = setId(function(_x){return setId(function(_f){return _f()(_x)})})

  return define('returnCmd', (function(){return subfunc0}))
})(), null, 'returnCmd')
//AST: lambda x . apply (ref makeIO) (apply (apply (apply (ref dl) (lit [)) (apply (ref returnCmd) (ref x))) (lit ]))
_return = setId((function(){
  var subfunc0 = setId(function(_x){return _makeIO()((function(){return _dl()((function(){return "["}))((function(){return _returnCmd()(_x)}))((function(){return "]"}))}))})

  return define('return', (function(){return subfunc0}))
})(), null, 'return')
//AST: lambda action . lambda f . apply (ref f) (ref action)
_bindCmd = setId((function(){
  var subfunc0 = setId(function(_action){return setId(function(_f){return _f()(_action)})})

  return define('bindCmd', (function(){return subfunc0}))
})(), null, 'bindCmd')
//AST: lambda cmd . apply (ref cmd) (lit ident)
_getBindAction = setId((function(){
  var subfunc0 = setId(function(_cmd){return _cmd()((function(){return "ident"}))})

  return define('getBindAction', (function(){return subfunc0}))
})(), null, 'getBindAction')
//AST: lambda io . lambda f . apply (ref io) (lambda cmds . apply (ref makeIO) (apply (apply (ref dlAppend) (ref cmds)) (apply (apply (apply (ref dl) (lit [)) (apply (ref bindCmd) (ref f))) (lit ]))))
_bind = setId((function(){
  var subfunc0 = setId(function(_io){return setId(function(_f){return _io()((function(){return setId(function(_cmds){return _makeIO()((function(){return _dlAppend()(_cmds)((function(){return _dl()((function(){return "["}))((function(){return _bindCmd()(_f)}))((function(){return "]"}))}))}))})}))})})

  return define('bind', (function(){return subfunc0}))
})(), null, 'bind')
//AST: lambda thing . lambda f . apply (ref f) (ref thing)
_alertCmd = setId((function(){
  var subfunc0 = setId(function(_thing){return setId(function(_f){return _f()(_thing)})})

  return define('alertCmd', (function(){return subfunc0}))
})(), null, 'alertCmd')
//AST: lambda thing . apply (ref makeIO) (apply (apply (apply (ref dl) (lit [)) (apply (ref alertCmd) (ref thing))) (lit ]))
_alert = setId((function(){
  var subfunc0 = setId(function(_thing){return _makeIO()((function(){return _dl()((function(){return "["}))((function(){return _alertCmd()(_thing)}))((function(){return "]"}))}))})

  return define('alert', (function(){return subfunc0}))
})(), null, 'alert')
//AST: lambda prompt . lambda f . apply (ref f) (ref prompt)
_promptCmd = setId((function(){
  var subfunc0 = setId(function(_prompt){return setId(function(_f){return _f()(_prompt)})})

  return define('promptCmd', (function(){return subfunc0}))
})(), null, 'promptCmd')
//AST: lambda prompt . apply (ref makeIO) (apply (apply (apply (ref dl) (lit [)) (apply (ref promptCmd) (ref prompt))) (lit ]))
_prompt = setId((function(){
  var subfunc0 = setId(function(_prompt){return _makeIO()((function(){return _dl()((function(){return "["}))((function(){return _promptCmd()(_prompt)}))((function(){return "]"}))}))})

  return define('prompt', (function(){return subfunc0}))
})(), null, 'prompt')
