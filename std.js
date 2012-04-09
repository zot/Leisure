if (typeof require !== "undefined" && require !== null) {
  Lazp = require("./lazp")
  require('./std');
  require('./prim');
  ReplCore = require("./replCore");
  Repl = require('./repl');
}
setType = Lazp.setType;
setDataType = Lazp.setDataType;
define = Lazp.define;
defineToken = Lazp.defineToken;
processResult = Repl.processResult;
//id = lambda x . ref x

define('id', function(_x){return _x()});
//true = lambda a . lambda b . ref a

define('true', setType(function(_a){return function(_b){return _a()}}, 'true'));
//false = lambda a . lambda b . ref b

define('false', setType(function(_a){return function(_b){return _b()}}, 'false'));
//cons = lambda a . lambda b . lambda f . apply (apply (ref f) (ref a)) (ref b)

define('cons', setDataType(function(_a){return function(_b){return setType(function(_f){return _f()(_a)(_b)}, 'cons')}}, 'cons'));
//nil = lambda a . lambda b . ref b

define('nil', setType(function(_a){return function(_b){return _b()}}, 'nil'));
//append = lambda l1 . lambda l2 . apply (apply (ref l1) (lambda h . lambda t . lambda D . apply (apply (ref cons) (ref h)) (apply (apply (ref append) (ref t)) (ref l2)))) (ref l2)

define('append', function(_l1){return function(_l2){return _l1()((function(){var $m; return function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _cons()(_h)((function(){var $m; return function(){return $m || ($m = (_append()(_t)(_l2)))}})())}}}))}})())(_l2)}});
//[ = lambda item . lambda c . apply (ref c) (lambda rest . apply (apply (ref cons) (ref item)) (ref rest))
defineToken('[', '=(]=')

define('[', setType(function(_item){return function(_c){return _c()((function(){var $m; return function(){return $m || ($m = (function(_rest){return _cons()(_item)(_rest)}))}})())}}, '['));
//, = lambda f . lambda item . lambda c . apply (ref c) (lambda rest . apply (ref f) (apply (apply (ref cons) (ref item)) (ref rest)))
defineToken(',', '=.=')

define(',', setType(function(_f){return function(_item){return function(_c){return _c()((function(){var $m; return function(){return $m || ($m = (function(_rest){return _f()((function(){var $m; return function(){return $m || ($m = (_cons()(_item)(_rest)))}})())}))}})())}}}, ','));
//] = lambda f . apply (ref f) (ref nil)
defineToken(']', '=)=')

define(']', setType(function(_f){return _f()(_nil)}, ']'));
//| = lambda f . lambda rest . lambda g . apply (ref f) (ref rest)
defineToken('|', '=.=')

define('|', setType(function(_f){return function(_rest){return function(_g){return _f()(_rest)}}}, '|'));
//dl = lambda list . apply (ref append) (ref list)

define('dl', function(_list){return _append()(_list)});
//dlAppend = lambda da . lambda db . lambda list . apply (ref da) (apply (ref db) (ref list))

define('dlAppend', function(_da){return function(_db){return function(_list){return _da()((function(){var $m; return function(){return $m || ($m = (_db()(_list)))}})())}}});
//dlList = lambda dl . apply (ref dl) (ref nil)

define('dlList', function(_dl){return _dl()(_nil)});
