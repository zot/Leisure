var prelude = (function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  prelude = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Parse = require('./parse');
  Leisure = require('./leisure');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};


var Nil = Parse.Nil;
var cons = Parse.cons;
var primCons = Parse.primCons;
var setType = Parse.setType;
var setDataType = Parse.setDataType;
var define = Parse.define;
var processResult = Repl.processResult;
var setContext = Leisure.setContext;
var funcContext = Leisure.funcContext;
var define = Parse.define;
var wrapContext = Leisure.wrapContext;
var markLeisureErrors = Leisure.markLeisureErrors;processResult(//AST(defGroup "[" "]")
(_defGroup()((function(){return "["}))((function(){return "]"}))));
processResult(//AST(defGroup "concat[" "]")
(_defGroup()((function(){return "concat["}))((function(){return "]"}))));
processResult(//AST(defToken "|")
(_defToken()((function(){return "|"}))));
processResult(//AST(defToken ",")
(_defToken()((function(){return ","}))));
processResult(//AST(defToken "<-")
(_defToken()((function(){return "<-"}))));
//id = AST(λx . x)
root.defs._id = _id = Parse.define('id', (function() {var f; return function _id(){return f || (f = (function(_x){return _x();}));}})(), 1, "\\x . x");;
//flip = AST(λf a b . f b a)
root.defs._flip = _flip = Parse.define('flip', (function() {var f; return function _flip(){return f || (f = (Parse.setDataType(function(_f){return Parse.setType(function(_a){return function(_b){return _f()(_b)(_a);};}, 'flip');}, 'flip')));}})(), 1, "\\f . \\a b . f b a");;
//compose = AST(λf g x . f (g x))
root.defs._compose = _compose = Parse.define('compose', (function() {var f; return function _compose(){return f || (f = (Parse.setDataType(function(_f){return function(_g){return Parse.setType(function(_x){return _f()((function(){var $m; return (function(){return $m || ($m = (_g()(_x)))})})());}, 'compose');};}, 'compose')));}})(), 2, "\\f g . \\x . f ( g x)");;
//true = AST(λa b . a)
root.defs._true = _true = Parse.define('true', (function() {var f; return function _true(){return f || (f = (Parse.setType(function(_a){return function(_b){return _a();};}, 'true')));}})(), 0, "\\a b . a");;
//false = AST(λa b . b)
root.defs._false = _false = Parse.define('false', (function() {var f; return function _false(){return f || (f = (Parse.setType(function(_a){return function(_b){return _b();};}, 'false')));}})(), 0, "\\a b . b");;
//and = AST(λa b . a b false)
root.defs._and = _and = Parse.define('and', (function() {var f; return function _and(){return f || (f = (function(_a){return function(_b){return _a()(_b)(_false);};}));}})(), 2, "\\a b . a b false");;
//or = AST(λa . a true)
root.defs._or = _or = Parse.define('or', (function() {var f; return function _or(){return f || (f = (function(_a){return _a()(_true);}));}})(), 1, "\\a . a true");;
//not = AST(λa . a false true)
root.defs._not = _not = Parse.define('not', (function() {var f; return function _not(){return f || (f = (function(_a){return _a()(_false)(_true);}));}})(), 1, "\\a . a false true");;
//neq = AST(λa b . not (eq a b))
root.defs._neq = _neq = Parse.define('neq', (function() {var f; return function _neq(){return f || (f = (function(_a){return function(_b){return _not()((function(){var $m; return (function(){return $m || ($m = (_eq()(_a)(_b)))})})());};}));}})(), 2, "\\a b . not (eq a b)");;
//left = AST(λv l r . l v)
root.defs._left = _left = Parse.define('left', (function() {var f; return function _left(){return f || (f = (Parse.setDataType(function(_v){return Parse.setType(function(_l){return function(_r){return _l()(_v);};}, 'left');}, 'left')));}})(), 1, "\\v . \\l r . l v");;
//right = AST(λv l r . r v)
root.defs._right = _right = Parse.define('right', (function() {var f; return function _right(){return f || (f = (Parse.setDataType(function(_v){return Parse.setType(function(_l){return function(_r){return _r()(_v);};}, 'right');}, 'right')));}})(), 1, "\\v . \\l r . r v");;
//some = AST(λx yes no . yes x)
root.defs._some = _some = Parse.define('some', (function() {var f; return function _some(){return f || (f = (Parse.setDataType(function(_x){return Parse.setType(function(_yes){return function(_no){return _yes()(_x);};}, 'some');}, 'some')));}})(), 1, "\\x . \\yes no . yes x");;
//some2 = AST(λa b yes no . yes a b)
root.defs._some2 = _some2 = Parse.define('some2', (function() {var f; return function _some2(){return f || (f = (Parse.setDataType(function(_a){return function(_b){return Parse.setType(function(_yes){return function(_no){return _yes()(_a)(_b);};}, 'some2');};}, 'some2')));}})(), 2, "\\a b . \\yes no . yes a b");;
//none = AST(λyes no . no)
root.defs._none = _none = Parse.define('none', (function() {var f; return function _none(){return f || (f = (Parse.setType(function(_yes){return function(_no){return _no();};}, 'none')));}})(), 0, "\\yes no . no");;
//iszero = AST(eq 0)
root.defs._iszero = _iszero = Parse.define('iszero', (function _iszero() {return ((_eq()((function(){return 0}))));}), 0, "eq 0");;
//positive = AST(< 0)
root.defs._positive = _positive = Parse.define('positive', (function _positive() {return ((_$y()((function(){return 0}))));}), 0, "< 0");;
//-- = AST(flip - 1)
root.defs._$_$_ = _$_$_ = Parse.define('--', (function _$_$_() {return ((_flip()(_$_)((function(){return 1}))));}), 0, "(flip -) 1");;
//++ = AST(+ 1)
root.defs._$o$o = _$o$o = Parse.define('++', (function _$o$o() {return ((_$o()((function(){return 1}))));}), 0, "+ 1");;
//even? = AST(λx . iszero (% x 2))
root.defs._even$e = _even$e = Parse.define('even?', (function() {var f; return function _even$e(){return f || (f = (function(_x){return _iszero()((function(){var $m; return (function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))})})());}));}})(), 1, "\\x . iszero (% x 2)");;
//odd? = AST(λx . eq 1 (% x 2))
root.defs._odd$e = _odd$e = Parse.define('odd?', (function() {var f; return function _odd$e(){return f || (f = (function(_x){return _eq()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_$A()(_x)((function(){return 2}))))})})());}));}})(), 1, "\\x . eq 1 (% x 2)");;
//max = AST(λa b . gt a b a b)
root.defs._max = _max = Parse.define('max', (function() {var f; return function _max(){return f || (f = (function(_a){return function(_b){return _gt()(_a)(_b)(_a)(_b);};}));}})(), 2, "\\a b . (gt a b) a b");;
//min = AST(λa b . lt a b a b)
root.defs._min = _min = Parse.define('min', (function() {var f; return function _min(){return f || (f = (function(_a){return function(_b){return _lt()(_a)(_b)(_a)(_b);};}));}})(), 2, "\\a b . (lt a b) a b");;
//isStream = AST(λx . false)
root.defs._isStream = _isStream = Parse.define('isStream', (function() {var f; return function _isStream(){return f || (f = (function(_x){return _false();}));}})(), 1, "\\x . false");;
//isStream = AST(λx . true)
root.defs._isStream = _isStream = Leisure.makeDispatchFunction('isStream', '_isStream', '_x', ['_isStream', '_x']);
Leisure.createMethod('cons', 'isStream', "\\x       . true", function(_x) {return _true();});
//isStream = AST(λx . true)
root.defs._isStream = _isStream = Leisure.makeDispatchFunction('isStream', '_isStream', '_x', ['_isStream', '_x']);
Leisure.createMethod('lexCons', 'isStream', "\\x          . true", function(_x) {return _true();});
//head = AST(λl . l λh t . h)
root.defs._head = _head = Leisure.makeDispatchFunction('head', '_head', '_l', ['_head', '_l']);
Leisure.createMethod('cons', 'head', "\\l       . l \\h t . h", function(_l) {return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return _h();};}))})})());});
//tail = AST(λl . l λh t . t)
root.defs._tail = _tail = Leisure.makeDispatchFunction('tail', '_tail', '_l', ['_tail', '_l']);
Leisure.createMethod('cons', 'tail', "\\l       . l \\h t . t", function(_l) {return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return _t();};}))})})());});
//head = AST(λl . l λh s t e . h)
root.defs._head = _head = Leisure.makeDispatchFunction('head', '_head', '_l', ['_head', '_l']);
Leisure.createMethod('lexCons', 'head', "\\l          . l \\h s t e . h", function(_l) {return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_s){return function(_t){return function(_e){return _h();};};};}))})})());});
//tail = AST(λl . l λh s t e . t)
root.defs._tail = _tail = Leisure.makeDispatchFunction('tail', '_tail', '_l', ['_tail', '_l']);
Leisure.createMethod('lexCons', 'tail', "\\l          . l \\h s t e . t", function(_l) {return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_s){return function(_t){return function(_e){return _t();};};};}))})})());});
//length = AST(λl . eq l nil 0 (++ (length (tail l))))
root.defs._length = _length = Parse.define('length', (function() {var f; return function _length(){return f || (f = (function(_l){return _eq()(_l)(_nil)((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_$o$o()((function(){var $m; return (function(){return $m || ($m = (_length()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})())))})})());}));}})(), 1, "\\l . (eq l nil) 0 (++ (length (tail l) ) )");;
//last = AST(λl . eq (tail l) nil (head l) (last (tail l)))
root.defs._last = _last = Parse.define('last', (function() {var f; return function _last(){return f || (f = (function(_l){return _eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_last()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())))})})());}));}})(), 1, "\\l . eq (tail l) nil\n  head l\n  last (tail l)");;
//startPos = AST(λl . lexStart l)
root.defs._startPos = _startPos = Leisure.makeDispatchFunction('startPos', '_startPos', '_l', ['_startPos', '_l']);
Leisure.createMethod('lexCons', 'startPos', "\\l          . lexStart l", function(_l) {return _lexStart()(_l);});
//startPos = AST(λt . t λt p . p)
root.defs._startPos = _startPos = Leisure.makeDispatchFunction('startPos', '_startPos', '_t', ['_startPos', '_t']);
Leisure.createMethod('token', 'startPos', "\\t        . t \\t p . p", function(_t) {return _t()((function(){var $m; return (function(){return $m || ($m = (function(_t){return function(_p){return _p();};}))})})());});
//endPos = AST(λl . lexEnd l)
root.defs._endPos = _endPos = Leisure.makeDispatchFunction('endPos', '_endPos', '_l', ['_endPos', '_l']);
Leisure.createMethod('lexCons', 'endPos', "\\l          . lexEnd l", function(_l) {return _lexEnd()(_l);});
//endPos = AST(λt . + (tokenStart t) (strlen (tokenName t)))
root.defs._endPos = _endPos = Leisure.makeDispatchFunction('endPos', '_endPos', '_t', ['_endPos', '_t']);
Leisure.createMethod('token', 'endPos', "\\t        . + (tokenStart t) (strlen (tokenName t))", function(_t) {return _$o()((function(){var $m; return (function(){return $m || ($m = (_tokenStart()(_t)))})})())((function(){var $m; return (function(){return $m || ($m = (_strlen()((function(){var $m; return (function(){return $m || ($m = (_tokenName()(_t)))})})())))})})());});
//pairFunc = AST(λl . false)
root.defs._pairFunc = _pairFunc = Parse.define('pairFunc', (function() {var f; return function _pairFunc(){return f || (f = (function(_l){return _false();}));}})(), 1, "\\l . false");;
//pairFunc = AST(λl . cons)
root.defs._pairFunc = _pairFunc = Leisure.makeDispatchFunction('pairFunc', '_pairFunc', '_l', ['_pairFunc', '_l']);
Leisure.createMethod('cons', 'pairFunc', "\\l       . cons", function(_l) {return _cons();});
//pairFunc = AST(λl . lexConsFuzzy)
root.defs._pairFunc = _pairFunc = Leisure.makeDispatchFunction('pairFunc', '_pairFunc', '_l', ['_pairFunc', '_l']);
Leisure.createMethod('lexCons', 'pairFunc', "\\l          . lexConsFuzzy", function(_l) {return _lexConsFuzzy();});
//pairFunc = AST(λl . lexConsFuzzy)
root.defs._pairFunc = _pairFunc = Leisure.makeDispatchFunction('pairFunc', '_pairFunc', '_l', ['_pairFunc', '_l']);
Leisure.createMethod('token', 'pairFunc', "\\l        . lexConsFuzzy", function(_l) {return _lexConsFuzzy();});
//lexConsFuzzy = AST(λh t . null? t (lexCons h (startPos h) nil (endPos h)) (lexCons h (startPos h) t (endPos t)))
root.defs._lexConsFuzzy = _lexConsFuzzy = Parse.define('lexConsFuzzy', (function() {var f; return function _lexConsFuzzy(){return f || (f = (function(_h){return function(_t){return _null$e()(_t)((function(){var $m; return (function(){return $m || ($m = (_lexCons()(_h)((function(){var $m; return (function(){return $m || ($m = (_startPos()(_h)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_endPos()(_h)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_lexCons()(_h)((function(){var $m; return (function(){return $m || ($m = (_startPos()(_h)))})})())(_t)((function(){var $m; return (function(){return $m || ($m = (_endPos()(_t)))})})())))})})());};}));}})(), 2, "\\h t . null? t\n  lexCons h (startPos h) nil (endPos h)\n  lexCons h (startPos h) t (endPos t)");;
//null? = AST(λx . false)
root.defs._null$e = _null$e = Parse.define('null?', (function() {var f; return function _null$e(){return f || (f = (function(_x){return _false();}));}})(), 1, "\\x . false");;
//null? = AST(λx . true)
root.defs._null$e = _null$e = Leisure.makeDispatchFunction('null?', '_null$e', '_x', ['_null$e', '_x']);
Leisure.createMethod('nil', 'null?', "\\x      . true", function(_x) {return _true();});
//map = AST(λfunc list . _map (pairFunc list) func list)
root.defs._map = _map = Parse.define('map', (function() {var f; return function _map(){return f || (f = (function(_func){return function(_list){return __map()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_list)))})})())(_func)(_list);};}));}})(), 2, "\\func list . _map (pairFunc list) func list");;
//_map = AST(λpairF func list . null? list nil (pairF (func (head list)) (_map pairF func (tail list))))
root.defs.__map = __map = Parse.define('_map', (function() {var f; return function __map(){return f || (f = (function(_pairF){return function(_func){return function(_list){return _null$e()(_list)(_nil)((function(){var $m; return (function(){return $m || ($m = (_pairF()((function(){var $m; return (function(){return $m || ($m = (_func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (__map()(_pairF)(_func)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());};};}));}})(), 3, "\\pairF func list . null? list\n  nil\n  pairF (func (head list)) (_map pairF func (tail list))");;
//foldl = AST(λfunc arg list . foldl func (func arg (head list)) (tail list))
root.defs._foldl = _foldl = Parse.define('foldl', (function() {var f; return function _foldl(){return f || (f = (function(_func){return function(_arg){return function(_list){return _foldl()(_func)((function(){var $m; return (function(){return $m || ($m = (_func()(_arg)((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());};};}));}})(), 3, "\\func arg list . foldl func (func arg (head list)) (tail list)");;
//foldl = AST(λfunc arg list . arg)
root.defs._foldl = _foldl = Leisure.makeDispatchFunction('foldl', '_foldl', '_list', ['_foldl', '_func', '_arg', '_list']);
Leisure.createMethod('nil', 'foldl', "\\func arg list      . arg", function(_func, _arg, _list) {return _arg();});
//foldl1 = AST(λfunc list . foldl func (head list) (tail list))
root.defs._foldl1 = _foldl1 = Parse.define('foldl1', (function() {var f; return function _foldl1(){return f || (f = (function(_func){return function(_list){return _foldl()(_func)((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());};}));}})(), 2, "\\func list . foldl func (head list) (tail list)");;
//foldl1 = AST(λfunc list . nil)
root.defs._foldl1 = _foldl1 = Leisure.makeDispatchFunction('foldl1', '_foldl1', '_list', ['_foldl1', '_func', '_list']);
Leisure.createMethod('nil', 'foldl1', "\\func list      . nil", function(_func, _list) {return _nil();});
//foldr = AST(λfunc arg list . null? list arg (func (head list) (foldr func arg (tail list))))
root.defs._foldr = _foldr = Parse.define('foldr', (function() {var f; return function _foldr(){return f || (f = (function(_func){return function(_arg){return function(_list){return _null$e()(_list)(_arg)((function(){var $m; return (function(){return $m || ($m = (_func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_foldr()(_func)(_arg)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());};};}));}})(), 3, "\\func arg list . null? list\n  arg\n  func (head list) (foldr func arg (tail list))");;
//foldr1 = AST(λfunc list . eq (tail list) nil (head list) (func (head list) (foldr1 func (tail list))))
root.defs._foldr1 = _foldr1 = Parse.define('foldr1', (function() {var f; return function _foldr1(){return f || (f = (function(_func){return function(_list){return _eq()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_func()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_foldr1()(_func)((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());};}));}})(), 2, "\\func list . eq (tail list) nil\n  head list\n  func (head list) (foldr1 func (tail list))");;
//foldr1 = AST(λfunc list . nil)
root.defs._foldr1 = _foldr1 = Leisure.makeDispatchFunction('foldr1', '_foldr1', '_list', ['_foldr1', '_func', '_list']);
Leisure.createMethod('nil', 'foldr1', "\\func list      . nil", function(_func, _list) {return _nil();});
//append = AST(λl1 l2 . _append (pairFunc l1) l1 l2)
root.defs._append = _append = Parse.define('append', (function() {var f; return function _append(){return f || (f = (function(_l1){return function(_l2){return __append()((function(){var $m; return (function(){return $m || ($m = (_pairFunc()(_l1)))})})())(_l1)(_l2);};}));}})(), 2, "\\l1 l2 . _append (pairFunc l1) l1 l2");;
//append = AST(λl1 l2 . l2)
root.defs._append = _append = Leisure.makeDispatchFunction('append', '_append', '_l1', ['_append', '_l1', '_l2']);
Leisure.createMethod('nil', 'append', "\\l1      l2 . l2", function(_l1, _l2) {return _l2();});
//_append = AST(λpairF l1 l2 . pairF (head l1) (_append pairF (tail l1) l2))
root.defs.__append = __append = Parse.define('_append', (function() {var f; return function __append(){return f || (f = (function(_pairF){return function(_l1){return function(_l2){return _pairF()((function(){var $m; return (function(){return $m || ($m = (_head()(_l1)))})})())((function(){var $m; return (function(){return $m || ($m = (__append()(_pairF)((function(){var $m; return (function(){return $m || ($m = (_tail()(_l1)))})})())(_l2)))})})());};};}));}})(), 3, "\\pairF l1 l2 . pairF (head l1) (_append pairF (tail l1) l2)");;
//_append = AST(λpairF l1 l2 . l2)
root.defs.__append = __append = Leisure.makeDispatchFunction('_append', '__append', '_l1', ['__append', '_pairF', '_l1', '_l2']);
Leisure.createMethod('nil', '_append', "\\pairF l1      l2 . l2", function(_pairF, _l1, _l2) {return _l2();});
//reverse = AST(λl . subreverse l nil)
root.defs._reverse = _reverse = Parse.define('reverse', (function() {var f; return function _reverse(){return f || (f = (function(_l){return _subreverse()(_l)(_nil);}));}})(), 1, "\\l . subreverse l nil");;
//subreverse = AST(λl result . l λh t D . subreverse t (cons h result) result)
root.defs._subreverse = _subreverse = Parse.define('subreverse', (function() {var f; return function _subreverse(){return f || (f = (function(_l){return function(_result){return _l()((function(){var $m; return (function(){return $m || ($m = (function(_h){return function(_t){return function(_D){return _subreverse()(_t)((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)(_result)))})})());};};}))})})())(_result);};}));}})(), 2, "\\l result . l (\\h t D . subreverse t (cons h result)) result");;
//if = AST(id)
root.defs._if = _if = Parse.define('if', (function _if() {return ((_id()));}), 0, "id");;
//at = AST(λl x . iszero x (head l) (at (tail l) (-- x)))
root.defs._at = _at = Parse.define('at', (function() {var f; return function _at(){return f || (f = (function(_l){return function(_x){return _iszero()(_x)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_at()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())((function(){var $m; return (function(){return $m || ($m = (_$_$_()(_x)))})})())))})})());};}));}})(), 2, "\\l x . (iszero (x)) (head l) (at (tail l) (-- (x) ) )");;
//index_combine = AST(λx y . or (eq x nil) (eq y nil) nil (+ x y))
root.defs._index_combine = _index_combine = Parse.define('index_combine', (function() {var f; return function _index_combine(){return f || (f = (function(_x){return function(_y){return _or()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_y)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_$o()(_x)(_y)))})})());};}));}})(), 2, "\\x y . (or (eq x nil) (eq y nil)) (nil) (+ x y)");;
//indexof = AST(λl x . if (eq l nil) nil (if (eq x (head l)) 0 (index_combine 1 (indexof (tail l) x))))
root.defs._indexof = _indexof = Parse.define('indexof', (function() {var f; return function _indexof(){return f || (f = (function(_l){return function(_x){return _if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_l)(_nil)))})})())(_nil)((function(){var $m; return (function(){return $m || ($m = (_if()((function(){var $m; return (function(){return $m || ($m = (_eq()(_x)((function(){var $m; return (function(){return $m || ($m = (_head()(_l)))})})())))})})())((function(){return 0}))((function(){var $m; return (function(){return $m || ($m = (_index_combine()((function(){return 1}))((function(){var $m; return (function(){return $m || ($m = (_indexof()((function(){var $m; return (function(){return $m || ($m = (_tail()(_l)))})})())(_x)))})})())))})})())))})})());};}));}})(), 2, "\\l x . if (eq l nil) (nil) (if (eq x (head l)) (0) (index_combine 1 (indexof (tail l) x ) ) )");;
//position = AST(λl x . indexof x l)
root.defs._position = _position = Parse.define('position', (function() {var f; return function _position(){return f || (f = (function(_l){return function(_x){return _indexof()(_x)(_l);};}));}})(), 2, "\\l x . indexof x l");;
//[ = AST(λlist . constructList (tail list))
root.defs._$r = _$r = Parse.defineMacro('[', (function() {var f; return function _$r(){return f || (f = (function(_list){return _constructList()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());}));}})(), 1, "\\list . constructList (tail list)");
root.tokenDefs.push('[', '=M=');;
//constructList = AST(λlist . cl (head list) (tokString (head list)) (tail list))
root.defs._constructList = _constructList = Parse.define('constructList', (function() {var f; return function _constructList(){return f || (f = (function(_list){return _cl()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_tokString()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());}));}})(), 1, "\\list . cl (head list) (tokString (head list)) (tail list)");;
//constructList = AST(λlist . nil)
root.defs._constructList = _constructList = Leisure.makeDispatchFunction('constructList', '_constructList', '_list', ['_constructList', '_list']);
Leisure.createMethod('nil', 'constructList', "\\list      . nil", function(_list) {return _nil();});
//cl = AST(λh hs t . eq hs "|" (eq (length t) 2 (cons (head t) nil) (error "Bad list format.")) (eq hs "]" (cons "nil" nil) (eq hs "," (constructList t) (cons (cons "cons" (cons h (constructList t))) nil))))
root.defs._cl = _cl = Parse.define('cl', (function() {var f; return function _cl(){return f || (f = (function(_h){return function(_hs){return function(_t){return _eq()(_hs)((function(){return "|"}))((function(){var $m; return (function(){return $m || ($m = (_eq()((function(){var $m; return (function(){return $m || ($m = (_length()(_t)))})})())((function(){return 2}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_t)))})})())(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_error()((function(){return "Bad list format."}))))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_hs)((function(){return "]"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "nil"}))(_nil)))})})())((function(){var $m; return (function(){return $m || ($m = (_eq()(_hs)((function(){return ","}))((function(){var $m; return (function(){return $m || ($m = (_constructList()(_t)))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "cons"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_h)((function(){var $m; return (function(){return $m || ($m = (_constructList()(_t)))})})())))})})())))})})())(_nil)))})})())))})})())))})})());};};}));}})(), 3, "\\h hs t . eq hs '|'\n  eq (length t) 2\n    # -- scanner ensures: eq (tokString (head (tail t))) ']'\n    cons (head t) nil\n    error \"Bad list format.\"\n  eq hs ']'\n    # -- scanner ensures: eq t nil\n    cons 'nil' nil\n    eq hs ','\n      constructList t\n      cons (cons 'cons' (cons h (constructList t))) nil");;
//tokString = AST(λx . x)
root.defs._tokString = _tokString = Parse.define('tokString', (function() {var f; return function _tokString(){return f || (f = (function(_x){return _x();}));}})(), 1, "\\x . x");;
//tokString = AST(λt . t λt p . t)
root.defs._tokString = _tokString = Leisure.makeDispatchFunction('tokString', '_tokString', '_t', ['_tokString', '_t']);
Leisure.createMethod('token', 'tokString', "\\t        . t \\t p . t", function(_t) {return _t()((function(){var $m; return (function(){return $m || ($m = (function(_t){return function(_p){return _t();};}))})})());});
//identMacro = AST(λlist . tail list)
root.defs._identMacro = _identMacro = Parse.defineMacro('identMacro', (function() {var f; return function _identMacro(){return f || (f = (function(_list){return _tail()(_list);}));}})(), 1, "\\list . tail list");
root.tokenDefs.push('identMacro', '=M=');;
//macroCons = AST(λlist . cons "cons" (tail list))
root.defs._macroCons = _macroCons = Parse.defineMacro('macroCons', (function() {var f; return function _macroCons(){return f || (f = (function(_list){return _cons()((function(){return "cons"}))((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})());}));}})(), 1, "\\list . cons 'cons' (tail list)");
root.tokenDefs.push('macroCons', '=M=');;
//concat[ = AST(λlist . cons (token "concat" (tokenStart list)) (cons (cons (token "[" (tokenStart (tail list))) (tail list)) nil))
root.defs._concat$r = _concat$r = Parse.defineMacro('concat[', (function() {var f; return function _concat$r(){return f || (f = (function(_list){return _cons()((function(){var $m; return (function(){return $m || ($m = (_token()((function(){return "concat"}))((function(){var $m; return (function(){return $m || ($m = (_tokenStart()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_token()((function(){return "["}))((function(){var $m; return (function(){return $m || ($m = (_tokenStart()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())(_nil)))})})());}));}})(), 1, "\\list . cons (token 'concat' (tokenStart list)) (cons (cons (token '[' (tokenStart (tail list))) (tail list)) nil)");
root.tokenDefs.push('concat[', '=M=');;
//doFilter = AST(λparseDefs list . transformDo list)
root.defs._doFilter = _doFilter = Parse.define('doFilter', (function() {var f; return function _doFilter(){return f || (f = (function(_parseDefs){return function(_list){return _transformDo()(_list);};}));}})(), 2, "\\parseDefs list . transformDo list");;
//transformDo = AST(λlist . list)
root.defs._transformDo = _transformDo = Parse.define('transformDo', (function() {var f; return function _transformDo(){return f || (f = (function(_list){return _list();}));}})(), 1, "\\list . list");;
//transformDo = AST(λlist . subDos list)
root.defs._transformDo = _transformDo = Leisure.makeDispatchFunction('transformDo', '_transformDo', '_list', ['_transformDo', '_list']);
Leisure.createMethod('cons', 'transformDo', "\\list       . subDos list", function(_list) {return _subDos()(_list);});
//transformDo = AST(λlist . subDos list)
root.defs._transformDo = _transformDo = Leisure.makeDispatchFunction('transformDo', '_transformDo', '_list', ['_transformDo', '_list']);
Leisure.createMethod('lexCons', 'transformDo', "\\list          . subDos list", function(_list) {return _subDos()(_list);});
//subDos = AST(λlist . eq "do" (tokString (head list)) (foldr1 λel . doClause el (subNextDos (tail list))) (subNextDos list))
root.defs._subDos = _subDos = Parse.define('subDos', (function() {var f; return function _subDos(){return f || (f = (function(_list){return _eq()((function(){return "do"}))((function(){var $m; return (function(){return $m || ($m = (_tokString()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_foldr1()((function(){var $m; return (function(){return $m || ($m = (function(_el){return _doClause()(_el);}))})})())((function(){var $m; return (function(){return $m || ($m = (_subNextDos()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_subNextDos()(_list)))})})());}));}})(), 1, "\\list . eq 'do' (tokString (head list))\n  foldr1 (\\el . doClause el) (subNextDos (tail list))\n  subNextDos list");;
//subNextDos = AST(λnonlist . nonlist)
root.defs._subNextDos = _subNextDos = Parse.define('subNextDos', (function() {var f; return function _subNextDos(){return f || (f = (function(_nonlist){return _nonlist();}));}})(), 1, "\\nonlist . nonlist");;
//subNextDos = AST(λlist . listSubNextDos list)
root.defs._subNextDos = _subNextDos = Leisure.makeDispatchFunction('subNextDos', '_subNextDos', '_list', ['_subNextDos', '_list']);
Leisure.createMethod('cons', 'subNextDos', "\\list       . listSubNextDos list", function(_list) {return _listSubNextDos()(_list);});
//subNextDos = AST(λlist . listSubNextDos list)
root.defs._subNextDos = _subNextDos = Leisure.makeDispatchFunction('subNextDos', '_subNextDos', '_list', ['_subNextDos', '_list']);
Leisure.createMethod('lexCons', 'subNextDos', "\\list          . listSubNextDos list", function(_list) {return _listSubNextDos()(_list);});
//listSubNextDos = AST(λlist . eq "." (tokString (head list)) (cons (head list) (transformDo (tail list))) (cons (transformDo (head list)) (subNextDos (tail list))))
root.defs._listSubNextDos = _listSubNextDos = Parse.define('listSubNextDos', (function() {var f; return function _listSubNextDos(){return f || (f = (function(_list){return _eq()((function(){return "."}))((function(){var $m; return (function(){return $m || ($m = (_tokString()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())((function(){var $m; return (function(){return $m || ($m = (_transformDo()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_transformDo()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_subNextDos()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})());}));}})(), 1, "\\list . eq '.' (tokString (head list))\n  cons (head list) (transformDo (tail list))\n  cons (transformDo (head list)) (subNextDos (tail list))");;
//doClause = AST(λclause rest . doExtractVar clause "<-" λvar . cons "bind" (cons (tail (tail clause)) (cons "\\" (cons var (cons "." (cons rest nil))))) (doExtractVar clause "=" λvar . cons (cons "\\" (cons var (cons "." (cons rest nil)))) (cons (tail (tail clause)) nil) (cons "bind" (cons clause (cons "\\" (cons "_" (cons "." (cons rest nil))))))))
root.defs._doClause = _doClause = Parse.define('doClause', (function() {var f; return function _doClause(){return f || (f = (function(_clause){return function(_rest){return _doExtractVar()(_clause)((function(){return "<-"}))((function(){var $m; return (function(){return $m || ($m = (function(_var){return _cons()((function(){return "bind"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_clause)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "\\"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_var)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "."}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_rest)(_nil)))})})())))})})())))})})())))})})())))})})());}))})})())((function(){var $m; return (function(){return $m || ($m = (_doExtractVar()(_clause)((function(){return "="}))((function(){var $m; return (function(){return $m || ($m = (function(_var){return _cons()((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "\\"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_var)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "."}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_rest)(_nil)))})})())))})})())))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){var $m; return (function(){return $m || ($m = (_tail()((function(){var $m; return (function(){return $m || ($m = (_tail()(_clause)))})})())))})})())(_nil)))})})());}))})})())((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "bind"}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_clause)((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "\\"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "_"}))((function(){var $m; return (function(){return $m || ($m = (_cons()((function(){return "."}))((function(){var $m; return (function(){return $m || ($m = (_cons()(_rest)(_nil)))})})())))})})())))})})())))})})())))})})())))})})())))})})());};}));}})(), 2, "\\clause rest . doExtractVar clause '<-'\n  \\var . cons 'bind' (cons (tail (tail clause)) (cons '\\\\' (cons var (cons '.' (cons rest nil)))))\n  doExtractVar clause '='\n    \\var . cons (cons '\\\\' (cons var (cons '.' (cons rest nil)))) (cons (tail (tail clause)) nil)\n    cons 'bind' (cons clause (cons '\\\\' (cons '_' (cons '.' (cons rest nil)))))");;
//doExtractVar = AST(λlist tokName . none)
root.defs._doExtractVar = _doExtractVar = Parse.define('doExtractVar', (function() {var f; return function _doExtractVar(){return f || (f = (function(_list){return function(_tokName){return _none();};}));}})(), 2, "\\list tokName . none");;
//doExtractVar = AST(λlist tokName . listDoExtractVar list tokName)
root.defs._doExtractVar = _doExtractVar = Leisure.makeDispatchFunction('doExtractVar', '_doExtractVar', '_list', ['_doExtractVar', '_list', '_tokName']);
Leisure.createMethod('cons', 'doExtractVar', "\\list       tokName . listDoExtractVar list tokName", function(_list, _tokName) {return _listDoExtractVar()(_list)(_tokName);});
//doExtractVar = AST(λlist tokName . listDoExtractVar list tokName)
root.defs._doExtractVar = _doExtractVar = Leisure.makeDispatchFunction('doExtractVar', '_doExtractVar', '_list', ['_doExtractVar', '_list', '_tokName']);
Leisure.createMethod('lexCons', 'doExtractVar', "\\list          tokName . listDoExtractVar list tokName", function(_list, _tokName) {return _listDoExtractVar()(_list)(_tokName);});
//listDoExtractVar = AST(λlist tokName . or (null? (tail list)) (neq tokName (tokString (head (tail list)))) none (some (head list)))
root.defs._listDoExtractVar = _listDoExtractVar = Parse.define('listDoExtractVar', (function() {var f; return function _listDoExtractVar(){return f || (f = (function(_list){return function(_tokName){return _or()((function(){var $m; return (function(){return $m || ($m = (_null$e()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())((function(){var $m; return (function(){return $m || ($m = (_neq()(_tokName)((function(){var $m; return (function(){return $m || ($m = (_tokString()((function(){var $m; return (function(){return $m || ($m = (_head()((function(){var $m; return (function(){return $m || ($m = (_tail()(_list)))})})())))})})())))})})())))})})())(_none)((function(){var $m; return (function(){return $m || ($m = (_some()((function(){var $m; return (function(){return $m || ($m = (_head()(_list)))})})())))})})());};}));}})(), 2, "\\list tokName . or (null? (tail list)) (neq tokName (tokString (head (tail list))))\n  none\n  some (head list)");;

//if (typeof window !== 'undefined' && window !== null) {
//  Leisure.processTokenDefs(root.tokenDefs);
//}
return root;
}).call(this)