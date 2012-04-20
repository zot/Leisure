(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  c4 = root = {};
  global = window;
} else {
  root = typeof exports !== 'undefined' && exports !== null ? exports : this;
  Leisure = require('./leisure');
  Leisure.req('./std');
  require('./prim');
  ReplCore = require('./replCore');
  Repl = require('./repl');
}
root.defs = {};
root.tokenDefs = [];
root.macros = {};

var setType = Leisure.setType;
var setDataType = Leisure.setDataType;
var define = Leisure.define;
var defineMacro = Leisure.defineMacro;
var defineToken = Leisure.defineToken;
var processResult = Repl.processResult;

var _make_list, _count_down, _count_up, _digits, _player1, _player2, _empty, _NUM_COLS, _NUM_ROWS, _ALL_COLS_UP, _ALL_ROWS_UP, _rc2spot, _spot, _fill_spot, _base_find_empty_spot, _find_empty_spot, _playMove, _playMoves, _div, _ending, _showR, _showRow, _showRows, _showBoard, _horzWinSpots, _vertWinSpots, _lDiagWinSpots, _rDiagWinSpots, _testMoves, _testWins2, _testWins, _testHorz, _testVert, _check_group, _loop_spots, _win$e, _CONNECT, _player1Win, _player2Win, _startBoard, _win1Board, _win2Board, _testFullBoard, _tie$e, _nextPlayer, _isColumnLegal, _isLegalMove, _checkMove, _gameOver, _convertMove, _winner, _promptOrEnd, _playGame, _main, _minmax, _all_moves, _base_legalMoves, _legalMoves, _promptPlayer, _newGame, _click, _click0, _click1, _click2, _click3, _click4, _click5, _click6;
//make_list = AST(\e c . if (eq c 0) nil (cons e (make_list e (-- c))))
root.defs._make_list = _make_list = define('make_list', function(_e){return function(_c){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_c)((function(){return 0}))))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_cons()(_e)((function(){var $m; return function(){return $m || ($m = (_make_list()(_e)((function(){var $m; return function(){return $m || ($m = (_$n$n()(_c)))}})())))}})())))}})())}});
;
//count_down = AST(\c . if (eq c -1) nil (cons c (count_down (-- c))))
root.defs._count_down = _count_down = define('count_down', function(_c){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_c)((function(){return -1}))))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_cons()(_c)((function(){var $m; return function(){return $m || ($m = (_count_down()((function(){var $m; return function(){return $m || ($m = (_$n$n()(_c)))}})())))}})())))}})())});
;
//count_up = AST(\c . reverse (count_down c))
root.defs._count_up = _count_up = define('count_up', function(_c){return _reverse()((function(){var $m; return function(){return $m || ($m = (_count_down()(_c)))}})())});
;
//digits = AST([ 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ])
root.defs._digits = _digits = define('digits', _$r()((function(){return "0"}))(_$b)((function(){return "1"}))(_$b)((function(){return "2"}))(_$b)((function(){return "3"}))(_$b)((function(){return "4"}))(_$b)((function(){return "5"}))(_$b)((function(){return "6"}))(_$b)((function(){return "7"}))(_$b)((function(){return "8"}))(_$b)((function(){return "9"}))(_$s));
;
//player1 = AST(R)
root.defs._player1 = _player1 = define('player1', "R");
;
//player2 = AST(B)
root.defs._player2 = _player2 = define('player2', "B");
;
//empty = AST( )
root.defs._empty = _empty = define('empty', " ");
;
//NUM_COLS = AST(7)
root.defs._NUM_COLS = _NUM_COLS = define('NUM_COLS', 7);
;
//NUM_ROWS = AST(6)
root.defs._NUM_ROWS = _NUM_ROWS = define('NUM_ROWS', 6);
;
//ALL_COLS_UP = AST(count_up (-- NUM_COLS))
root.defs._ALL_COLS_UP = _ALL_COLS_UP = define('ALL_COLS_UP', _count_up()((function(){var $m; return function(){return $m || ($m = (_$n$n()(_NUM_COLS)))}})()));
;
//ALL_ROWS_UP = AST(count_up (-- NUM_ROWS))
root.defs._ALL_ROWS_UP = _ALL_ROWS_UP = define('ALL_ROWS_UP', _count_up()((function(){var $m; return function(){return $m || ($m = (_$n$n()(_NUM_ROWS)))}})()));
;
//rc2spot = AST(\r c . + r (* NUM_ROWS c))
root.defs._rc2spot = _rc2spot = define('rc2spot', function(_r){return function(_c){return _$o()(_r)((function(){var $m; return function(){return $m || ($m = (_$g()(_NUM_ROWS)(_c)))}})())}});
;
//spot = AST(\b r c . at b (rc2spot r c))
root.defs._spot = _spot = define('spot', function(_b){return function(_r){return function(_c){return _at()(_b)((function(){var $m; return function(){return $m || ($m = (_rc2spot()(_r)(_c)))}})())}}});
;
//fill_spot = AST(\p b spot . append (take spot b) (append ([ p ]) (drop (++ spot) b)))
root.defs._fill_spot = _fill_spot = define('fill_spot', function(_p){return function(_b){return function(_spot){return _append()((function(){var $m; return function(){return $m || ($m = (_take()(_spot)(_b)))}})())((function(){var $m; return function(){return $m || ($m = (_append()((function(){var $m; return function(){return $m || ($m = (_$r()(_p)(_$s)))}})())((function(){var $m; return function(){return $m || ($m = (_drop()((function(){var $m; return function(){return $m || ($m = (_$o$o()(_spot)))}})())(_b)))}})())))}})())}}});
;
//base_find_empty_spot = AST(\b c r . if (or (lt r 0) (gte r NUM_ROWS)) nil (if (eq empty (spot b r c)) (rc2spot r c) (base_find_empty_spot b c (-- r))))
root.defs._base_find_empty_spot = _base_find_empty_spot = define('base_find_empty_spot', function(_b){return function(_c){return function(_r){return _if()((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_lt()(_r)((function(){return 0}))))}})())((function(){var $m; return function(){return $m || ($m = (_gte()(_r)(_NUM_ROWS)))}})())))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_eq()(_empty)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)(_r)(_c)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_rc2spot()(_r)(_c)))}})())((function(){var $m; return function(){return $m || ($m = (_base_find_empty_spot()(_b)(_c)((function(){var $m; return function(){return $m || ($m = (_$n$n()(_r)))}})())))}})())))}})())}}});
;
//find_empty_spot = AST(\b c . base_find_empty_spot b c (-- NUM_ROWS))
root.defs._find_empty_spot = _find_empty_spot = define('find_empty_spot', function(_b){return function(_c){return _base_find_empty_spot()(_b)(_c)((function(){var $m; return function(){return $m || ($m = (_$n$n()(_NUM_ROWS)))}})())}});
;
//playMove = AST(\p b c . fill_spot p b (find_empty_spot b c))
root.defs._playMove = _playMove = define('playMove', function(_p){return function(_b){return function(_c){return _fill_spot()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_find_empty_spot()(_b)(_c)))}})())}}});
;
//playMoves = AST(\p b l . if (eq l nil) b ((\new_b . playMoves p new_b (tail l)) (playMove p b (head l))))
root.defs._playMoves = _playMoves = define('playMoves', function(_p){return function(_b){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())(_b)((function(){var $m; return function(){return $m || ($m = (function(_new_b){return _playMoves()(_p)(_new_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())}((function(){var $m; return function(){return $m || ($m = (_playMove()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())))}})())}}});
;
//div = AST(+---+---+---+---+---+---+---+)
root.defs._div = _div = define('div', "+---+---+---+---+---+---+---+");
;
//ending = AST(| 0 | 1 | 2 | 3 | 4 | 5 | 6 |\n)
root.defs._ending = _ending = define('ending', "| 0 | 1 | 2 | 3 | 4 | 5 | 6 |\n");
;
//showR = AST(\b r l . if (eq l nil)  (concat ([ |  , (spot b r (head l)) ,   , (showR b r (tail l)) ])))
root.defs._showR = _showR = define('showR', function(_b){return function(_r){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())((function(){return ""}))((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "| "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)(_r)((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())(_$b)((function(){return " "}))(_$b)((function(){var $m; return function(){return $m || ($m = (_showR()(_b)(_r)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())))}})())(_$s)))}})())))}})())}}});
;
//showRow = AST(\b r . + (showR b r ALL_COLS_UP) |)
root.defs._showRow = _showRow = define('showRow', function(_b){return function(_r){return _$o()((function(){var $m; return function(){return $m || ($m = (_showR()(_b)(_r)(_ALL_COLS_UP)))}})())((function(){return "|"}))}});
;
//showRows = AST(\b l . if (eq l nil) (print div) (bind (print (showRow b (head l))) \_ . showRows b (tail l)))
root.defs._showRows = _showRows = define('showRows', function(_b){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())((function(){var $m; return function(){return $m || ($m = (_print()(_div)))}})())((function(){var $m; return function(){return $m || ($m = (_bind()((function(){var $m; return function(){return $m || ($m = (_print()((function(){var $m; return function(){return $m || ($m = (_showRow()(_b)((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _showRows()(_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())}))}})())))}})())}});
;
//showBoard = AST(\b . bind (print (concat ([ \n , div ]))) \_ . bind (showRows b ALL_ROWS_UP) \_ . print ending)
root.defs._showBoard = _showBoard = define('showBoard', function(_b){return _bind()((function(){var $m; return function(){return $m || ($m = (_print()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "\n"}))(_$b)(_div)(_$s)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_showRows()(_b)(_ALL_ROWS_UP)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _print()(_ending)}))}})())}))}})())});
;
//horzWinSpots = AST([ ([ 0 , 6 , 12 , 18 ]) , ([ 6 , 12 , 18 , 24 ]) , ([ 12 , 18 , 24 , 30 ]) , ([ 18 , 24 , 30 , 36 ]) , ([ 1 , 7 , 13 , 19 ]) , ([ 7 , 13 , 19 , 25 ]) , ([ 13 , 19 , 25 , 31 ]) , ([ 19 , 25 , 31 , 37 ]) , ([ 2 , 8 , 14 , 20 ]) , ([ 8 , 14 , 20 , 26 ]) , ([ 14 , 20 , 26 , 32 ]) , ([ 20 , 26 , 32 , 38 ]) , ([ 3 , 9 , 15 , 21 ]) , ([ 9 , 15 , 21 , 27 ]) , ([ 15 , 21 , 27 , 33 ]) , ([ 21 , 27 , 33 , 39 ]) , ([ 4 , 10 , 16 , 22 ]) , ([ 10 , 16 , 22 , 28 ]) , ([ 16 , 22 , 28 , 34 ]) , ([ 22 , 28 , 34 , 40 ]) , ([ 5 , 11 , 17 , 23 ]) , ([ 11 , 17 , 23 , 29 ]) , ([ 17 , 23 , 29 , 35 ]) , ([ 23 , 29 , 35 , 41 ]) ])
root.defs._horzWinSpots = _horzWinSpots = define('horzWinSpots', _$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 0}))(_$b)((function(){return 6}))(_$b)((function(){return 12}))(_$b)((function(){return 18}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 6}))(_$b)((function(){return 12}))(_$b)((function(){return 18}))(_$b)((function(){return 24}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 12}))(_$b)((function(){return 18}))(_$b)((function(){return 24}))(_$b)((function(){return 30}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 18}))(_$b)((function(){return 24}))(_$b)((function(){return 30}))(_$b)((function(){return 36}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 1}))(_$b)((function(){return 7}))(_$b)((function(){return 13}))(_$b)((function(){return 19}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 7}))(_$b)((function(){return 13}))(_$b)((function(){return 19}))(_$b)((function(){return 25}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 13}))(_$b)((function(){return 19}))(_$b)((function(){return 25}))(_$b)((function(){return 31}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 19}))(_$b)((function(){return 25}))(_$b)((function(){return 31}))(_$b)((function(){return 37}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 2}))(_$b)((function(){return 8}))(_$b)((function(){return 14}))(_$b)((function(){return 20}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 8}))(_$b)((function(){return 14}))(_$b)((function(){return 20}))(_$b)((function(){return 26}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 14}))(_$b)((function(){return 20}))(_$b)((function(){return 26}))(_$b)((function(){return 32}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 20}))(_$b)((function(){return 26}))(_$b)((function(){return 32}))(_$b)((function(){return 38}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 3}))(_$b)((function(){return 9}))(_$b)((function(){return 15}))(_$b)((function(){return 21}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 9}))(_$b)((function(){return 15}))(_$b)((function(){return 21}))(_$b)((function(){return 27}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 15}))(_$b)((function(){return 21}))(_$b)((function(){return 27}))(_$b)((function(){return 33}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 21}))(_$b)((function(){return 27}))(_$b)((function(){return 33}))(_$b)((function(){return 39}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 4}))(_$b)((function(){return 10}))(_$b)((function(){return 16}))(_$b)((function(){return 22}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 10}))(_$b)((function(){return 16}))(_$b)((function(){return 22}))(_$b)((function(){return 28}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 16}))(_$b)((function(){return 22}))(_$b)((function(){return 28}))(_$b)((function(){return 34}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 22}))(_$b)((function(){return 28}))(_$b)((function(){return 34}))(_$b)((function(){return 40}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 5}))(_$b)((function(){return 11}))(_$b)((function(){return 17}))(_$b)((function(){return 23}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 11}))(_$b)((function(){return 17}))(_$b)((function(){return 23}))(_$b)((function(){return 29}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 17}))(_$b)((function(){return 23}))(_$b)((function(){return 29}))(_$b)((function(){return 35}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 23}))(_$b)((function(){return 29}))(_$b)((function(){return 35}))(_$b)((function(){return 41}))(_$s)))}})())(_$s));
;
//vertWinSpots = AST([ ([ 0 , 1 , 2 , 3 ]) , ([ 1 , 2 , 3 , 4 ]) , ([ 2 , 3 , 4 , 5 ]) , ([ 6 , 7 , 8 , 9 ]) , ([ 7 , 8 , 9 , 10 ]) , ([ 8 , 9 , 10 , 11 ]) , ([ 12 , 13 , 14 , 15 ]) , ([ 13 , 14 , 15 , 16 ]) , ([ 14 , 15 , 16 , 17 ]) , ([ 18 , 19 , 20 , 21 ]) , ([ 19 , 20 , 21 , 22 ]) , ([ 20 , 21 , 22 , 23 ]) , ([ 24 , 25 , 26 , 27 ]) , ([ 25 , 26 , 27 , 28 ]) , ([ 26 , 27 , 28 , 29 ]) , ([ 30 , 31 , 32 , 33 ]) , ([ 31 , 32 , 33 , 34 ]) , ([ 32 , 33 , 34 , 35 ]) , ([ 36 , 37 , 38 , 39 ]) , ([ 37 , 38 , 39 , 40 ]) , ([ 38 , 39 , 40 , 41 ]) ])
root.defs._vertWinSpots = _vertWinSpots = define('vertWinSpots', _$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 0}))(_$b)((function(){return 1}))(_$b)((function(){return 2}))(_$b)((function(){return 3}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 1}))(_$b)((function(){return 2}))(_$b)((function(){return 3}))(_$b)((function(){return 4}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 2}))(_$b)((function(){return 3}))(_$b)((function(){return 4}))(_$b)((function(){return 5}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 6}))(_$b)((function(){return 7}))(_$b)((function(){return 8}))(_$b)((function(){return 9}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 7}))(_$b)((function(){return 8}))(_$b)((function(){return 9}))(_$b)((function(){return 10}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 8}))(_$b)((function(){return 9}))(_$b)((function(){return 10}))(_$b)((function(){return 11}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 12}))(_$b)((function(){return 13}))(_$b)((function(){return 14}))(_$b)((function(){return 15}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 13}))(_$b)((function(){return 14}))(_$b)((function(){return 15}))(_$b)((function(){return 16}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 14}))(_$b)((function(){return 15}))(_$b)((function(){return 16}))(_$b)((function(){return 17}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 18}))(_$b)((function(){return 19}))(_$b)((function(){return 20}))(_$b)((function(){return 21}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 19}))(_$b)((function(){return 20}))(_$b)((function(){return 21}))(_$b)((function(){return 22}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 20}))(_$b)((function(){return 21}))(_$b)((function(){return 22}))(_$b)((function(){return 23}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 24}))(_$b)((function(){return 25}))(_$b)((function(){return 26}))(_$b)((function(){return 27}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 25}))(_$b)((function(){return 26}))(_$b)((function(){return 27}))(_$b)((function(){return 28}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 26}))(_$b)((function(){return 27}))(_$b)((function(){return 28}))(_$b)((function(){return 29}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 30}))(_$b)((function(){return 31}))(_$b)((function(){return 32}))(_$b)((function(){return 33}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 31}))(_$b)((function(){return 32}))(_$b)((function(){return 33}))(_$b)((function(){return 34}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 32}))(_$b)((function(){return 33}))(_$b)((function(){return 34}))(_$b)((function(){return 35}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 36}))(_$b)((function(){return 37}))(_$b)((function(){return 38}))(_$b)((function(){return 39}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 37}))(_$b)((function(){return 38}))(_$b)((function(){return 39}))(_$b)((function(){return 40}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 38}))(_$b)((function(){return 39}))(_$b)((function(){return 40}))(_$b)((function(){return 41}))(_$s)))}})())(_$s));
;
//lDiagWinSpots = AST([ ([ 2 , 9 , 16 , 23 ]) , ([ 1 , 8 , 15 , 22 ]) , ([ 8 , 15 , 22 , 29 ]) , ([ 0 , 7 , 14 , 21 ]) , ([ 7 , 14 , 21 , 28 ]) , ([ 14 , 21 , 28 , 35 ]) , ([ 6 , 13 , 20 , 27 ]) , ([ 13 , 20 , 27 , 34 ]) , ([ 20 , 27 , 34 , 41 ]) , ([ 12 , 19 , 26 , 33 ]) , ([ 19 , 26 , 33 , 40 ]) , ([ 18 , 25 , 32 , 39 ]) ])
root.defs._lDiagWinSpots = _lDiagWinSpots = define('lDiagWinSpots', _$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 2}))(_$b)((function(){return 9}))(_$b)((function(){return 16}))(_$b)((function(){return 23}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 1}))(_$b)((function(){return 8}))(_$b)((function(){return 15}))(_$b)((function(){return 22}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 8}))(_$b)((function(){return 15}))(_$b)((function(){return 22}))(_$b)((function(){return 29}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 0}))(_$b)((function(){return 7}))(_$b)((function(){return 14}))(_$b)((function(){return 21}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 7}))(_$b)((function(){return 14}))(_$b)((function(){return 21}))(_$b)((function(){return 28}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 14}))(_$b)((function(){return 21}))(_$b)((function(){return 28}))(_$b)((function(){return 35}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 6}))(_$b)((function(){return 13}))(_$b)((function(){return 20}))(_$b)((function(){return 27}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 13}))(_$b)((function(){return 20}))(_$b)((function(){return 27}))(_$b)((function(){return 34}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 20}))(_$b)((function(){return 27}))(_$b)((function(){return 34}))(_$b)((function(){return 41}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 12}))(_$b)((function(){return 19}))(_$b)((function(){return 26}))(_$b)((function(){return 33}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 19}))(_$b)((function(){return 26}))(_$b)((function(){return 33}))(_$b)((function(){return 40}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 18}))(_$b)((function(){return 25}))(_$b)((function(){return 32}))(_$b)((function(){return 39}))(_$s)))}})())(_$s));
;
//rDiagWinSpots = AST([ ([ 3 , 8 , 13 , 18 ]) , ([ 4 , 9 , 14 , 19 ]) , ([ 9 , 14 , 19 , 24 ]) , ([ 5 , 10 , 15 , 20 ]) , ([ 10 , 15 , 20 , 25 ]) , ([ 15 , 20 , 25 , 30 ]) , ([ 11 , 16 , 21 , 26 ]) , ([ 16 , 21 , 26 , 31 ]) , ([ 21 , 26 , 31 , 36 ]) , ([ 17 , 22 , 27 , 32 ]) , ([ 22 , 27 , 32 , 37 ]) , ([ 23 , 28 , 33 , 38 ]) ])
root.defs._rDiagWinSpots = _rDiagWinSpots = define('rDiagWinSpots', _$r()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 3}))(_$b)((function(){return 8}))(_$b)((function(){return 13}))(_$b)((function(){return 18}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 4}))(_$b)((function(){return 9}))(_$b)((function(){return 14}))(_$b)((function(){return 19}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 9}))(_$b)((function(){return 14}))(_$b)((function(){return 19}))(_$b)((function(){return 24}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 5}))(_$b)((function(){return 10}))(_$b)((function(){return 15}))(_$b)((function(){return 20}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 10}))(_$b)((function(){return 15}))(_$b)((function(){return 20}))(_$b)((function(){return 25}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 15}))(_$b)((function(){return 20}))(_$b)((function(){return 25}))(_$b)((function(){return 30}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 11}))(_$b)((function(){return 16}))(_$b)((function(){return 21}))(_$b)((function(){return 26}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 16}))(_$b)((function(){return 21}))(_$b)((function(){return 26}))(_$b)((function(){return 31}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 21}))(_$b)((function(){return 26}))(_$b)((function(){return 31}))(_$b)((function(){return 36}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 17}))(_$b)((function(){return 22}))(_$b)((function(){return 27}))(_$b)((function(){return 32}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 22}))(_$b)((function(){return 27}))(_$b)((function(){return 32}))(_$b)((function(){return 37}))(_$s)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return 23}))(_$b)((function(){return 28}))(_$b)((function(){return 33}))(_$b)((function(){return 38}))(_$s)))}})())(_$s));
;
//testMoves = AST(\p b l . if (eq l nil) b ((\new_b . testMoves p new_b (tail l)) (fill_spot p b (head l))))
root.defs._testMoves = _testMoves = define('testMoves', function(_p){return function(_b){return function(_l){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_l)(_nil)))}})())(_b)((function(){var $m; return function(){return $m || ($m = (function(_new_b){return _testMoves()(_p)(_new_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_l)))}})())}((function(){var $m; return function(){return $m || ($m = (_fill_spot()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_head()(_l)))}})())))}})())))}})())}}});
;
//testWins2 = AST(\b grp . showBoard (testMoves W b grp))
root.defs._testWins2 = _testWins2 = define('testWins2', function(_b){return function(_grp){return _showBoard()((function(){var $m; return function(){return $m || ($m = (_testMoves()((function(){return "W"}))(_b)(_grp)))}})())}});
;
//testWins = AST(\b spots . if (eq spots nil) nil (bind (testWins2 b (head spots)) \_ . testWins b (tail spots)))
root.defs._testWins = _testWins = define('testWins', function(_b){return function(_spots){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_spots)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_bind()((function(){var $m; return function(){return $m || ($m = (_testWins2()(_b)((function(){var $m; return function(){return $m || ($m = (_head()(_spots)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _testWins()(_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_spots)))}})())}))}})())))}})())}});
;
//testHorz = AST(testWins startBoard horzWinSpots)
root.defs._testHorz = _testHorz = define('testHorz', _testWins()(_startBoard)(_horzWinSpots));
;
//testVert = AST(testWins startBoard vertWinSpots)
root.defs._testVert = _testVert = define('testVert', _testWins()(_startBoard)(_vertWinSpots));
;
//check_group = AST(\b l . (\check . if (eq check player1Win) player1 (if (eq check player2Win) player2 empty)) (concat ([ (at b (at l 0)) , (at b (at l 1)) , (at b (at l 2)) , (at b (at l 3)) ])))
root.defs._check_group = _check_group = define('check_group', function(_b){return function(_l){return function(_check){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_check)(_player1Win)))}})())(_player1)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_eq()(_check)(_player2Win)))}})())(_player2)(_empty)))}})())}((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_at()(_b)((function(){var $m; return function(){return $m || ($m = (_at()(_l)((function(){return 0}))))}})())))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_at()(_b)((function(){var $m; return function(){return $m || ($m = (_at()(_l)((function(){return 1}))))}})())))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_at()(_b)((function(){var $m; return function(){return $m || ($m = (_at()(_l)((function(){return 2}))))}})())))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_at()(_b)((function(){var $m; return function(){return $m || ($m = (_at()(_l)((function(){return 3}))))}})())))}})())(_$s)))}})())))}})())}});
;
//loop_spots = AST(\b spots . if (eq spots nil) empty ((\grp . if (neq grp empty) grp (loop_spots b (tail spots))) (check_group b (head spots))))
root.defs._loop_spots = _loop_spots = define('loop_spots', function(_b){return function(_spots){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_spots)(_nil)))}})())(_empty)((function(){var $m; return function(){return $m || ($m = (function(_grp){return _if()((function(){var $m; return function(){return $m || ($m = (_neq()(_grp)(_empty)))}})())(_grp)((function(){var $m; return function(){return $m || ($m = (_loop_spots()(_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_spots)))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_check_group()(_b)((function(){var $m; return function(){return $m || ($m = (_head()(_spots)))}})())))}})())))}})())}});
;
//win? = AST(\b . (\spot1 . (\spot2 . (\spot3 . (\spot4 . if (neq spot1 empty) spot1 (if (neq spot2 empty) spot2 (if (neq spot3 empty) spot3 (if (neq spot4 empty) spot4 empty)))) (loop_spots b rDiagWinSpots)) (loop_spots b lDiagWinSpots)) (loop_spots b vertWinSpots)) (loop_spots b horzWinSpots))
root.defs._win$e = _win$e = define('win?', function(_b){return function(_spot1){return function(_spot2){return function(_spot3){return function(_spot4){return _if()((function(){var $m; return function(){return $m || ($m = (_neq()(_spot1)(_empty)))}})())(_spot1)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_neq()(_spot2)(_empty)))}})())(_spot2)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_neq()(_spot3)(_empty)))}})())(_spot3)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_neq()(_spot4)(_empty)))}})())(_spot4)(_empty)))}})())))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_loop_spots()(_b)(_rDiagWinSpots)))}})())}((function(){var $m; return function(){return $m || ($m = (_loop_spots()(_b)(_lDiagWinSpots)))}})())}((function(){var $m; return function(){return $m || ($m = (_loop_spots()(_b)(_vertWinSpots)))}})())}((function(){var $m; return function(){return $m || ($m = (_loop_spots()(_b)(_horzWinSpots)))}})())});
;
//CONNECT = AST(4)
root.defs._CONNECT = _CONNECT = define('CONNECT', 4);
;
//player1Win = AST(concat (make_list player1 CONNECT))
root.defs._player1Win = _player1Win = define('player1Win', _concat()((function(){var $m; return function(){return $m || ($m = (_make_list()(_player1)(_CONNECT)))}})()));
;
//player2Win = AST(concat (make_list player2 CONNECT))
root.defs._player2Win = _player2Win = define('player2Win', _concat()((function(){var $m; return function(){return $m || ($m = (_make_list()(_player2)(_CONNECT)))}})()));
;
//startBoard = AST(make_list empty (* NUM_ROWS NUM_COLS))
root.defs._startBoard = _startBoard = define('startBoard', _make_list()(_empty)((function(){var $m; return function(){return $m || ($m = (_$g()(_NUM_ROWS)(_NUM_COLS)))}})()));
;
//win1Board = AST(playMoves player1 startBoard (make_list 0 CONNECT))
root.defs._win1Board = _win1Board = define('win1Board', _playMoves()(_player1)(_startBoard)((function(){var $m; return function(){return $m || ($m = (_make_list()((function(){return 0}))(_CONNECT)))}})()));
;
//win2Board = AST(playMoves player2 startBoard (count_up (-- CONNECT)))
root.defs._win2Board = _win2Board = define('win2Board', _playMoves()(_player2)(_startBoard)((function(){var $m; return function(){return $m || ($m = (_count_up()((function(){var $m; return function(){return $m || ($m = (_$n$n()(_CONNECT)))}})())))}})()));
;
//testFullBoard = AST(make_list - (* NUM_ROWS NUM_COLS))
root.defs._testFullBoard = _testFullBoard = define('testFullBoard', _make_list()((function(){return "-"}))((function(){var $m; return function(){return $m || ($m = (_$g()(_NUM_ROWS)(_NUM_COLS)))}})()));
;
//tie? = AST(\b . not (any (eq empty) b))
root.defs._tie$e = _tie$e = define('tie?', function(_b){return _not()((function(){var $m; return function(){return $m || ($m = (_any()((function(){var $m; return function(){return $m || ($m = (_eq()(_empty)))}})())(_b)))}})())});
;
//nextPlayer = AST(\p . if (eq p player1) player2 player1)
root.defs._nextPlayer = _nextPlayer = define('nextPlayer', function(_p){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_p)(_player1)))}})())(_player2)(_player1)});
;
//isColumnLegal = AST(\b c . eq empty (spot b 0 c))
root.defs._isColumnLegal = _isColumnLegal = define('isColumnLegal', function(_b){return function(_c){return _eq()(_empty)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 0}))(_c)))}})())}});
;
//isLegalMove = AST(\b m . (\i . and (not (eq i nil)) (isColumnLegal b i)) (indexof digits m))
root.defs._isLegalMove = _isLegalMove = define('isLegalMove', function(_b){return function(_m){return function(_i){return _and()((function(){var $m; return function(){return $m || ($m = (_not()((function(){var $m; return function(){return $m || ($m = (_eq()(_i)(_nil)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_isColumnLegal()(_b)(_i)))}})())}((function(){var $m; return function(){return $m || ($m = (_indexof()(_digits)(_m)))}})())}});
;
//checkMove = AST(\p b move . if (isLegalMove b move) (playGame (nextPlayer p) (playMove p b (indexof digits move))) (promptOrEnd p b))
root.defs._checkMove = _checkMove = define('checkMove', function(_p){return function(_b){return function(_move){return _if()((function(){var $m; return function(){return $m || ($m = (_isLegalMove()(_b)(_move)))}})())((function(){var $m; return function(){return $m || ($m = (_playGame()((function(){var $m; return function(){return $m || ($m = (_nextPlayer()(_p)))}})())((function(){var $m; return function(){return $m || ($m = (_playMove()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_indexof()(_digits)(_move)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_promptOrEnd()(_p)(_b)))}})())}}});
;
//gameOver = AST(\b winner . if (eq winner empty) (if (tie? b) WE HAVE A TIE!!! empty) (concat ([ WINNER: Player  , winner , !!! ])))
root.defs._gameOver = _gameOver = define('gameOver', function(_b){return function(_winner){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_winner)(_empty)))}})())((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_tie$e()(_b)))}})())((function(){return "WE HAVE A TIE!!!"}))(_empty)))}})())((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "WINNER: Player "}))(_$b)(_winner)(_$b)((function(){return "!!!"}))(_$s)))}})())))}})())}});
;
//convertMove = AST(\p b move . eq move c (checkMove p b (minmax p b)) (checkMove p b move))
root.defs._convertMove = _convertMove = define('convertMove', function(_p){return function(_b){return function(_move){return _eq()(_move)((function(){return "c"}))((function(){var $m; return function(){return $m || ($m = (_checkMove()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_minmax()(_p)(_b)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_checkMove()(_p)(_b)(_move)))}})())}}});
;
//winner = AST(\w p b . if (eq empty w) (bind (prompt (concat ([ Your move player  , p , > ]))) \move . convertMove p b move) (print w))
root.defs._winner = _winner = define('winner', function(_w){return function(_p){return function(_b){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_empty)(_w)))}})())((function(){var $m; return function(){return $m || ($m = (_bind()((function(){var $m; return function(){return $m || ($m = (_prompt()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Your move player "}))(_$b)(_p)(_$b)((function(){return ">"}))(_$s)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(_move){return _convertMove()(_p)(_b)(_move)}))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_print()(_w)))}})())}}});
;
//promptOrEnd = AST(\p b . winner (gameOver b (win? b)) p b)
root.defs._promptOrEnd = _promptOrEnd = define('promptOrEnd', function(_p){return function(_b){return _winner()((function(){var $m; return function(){return $m || ($m = (_gameOver()(_b)((function(){var $m; return function(){return $m || ($m = (_win$e()(_b)))}})())))}})())(_p)(_b)}});
;
//playGame = AST(\p b . bind (showBoard b) \_ . promptOrEnd p b)
root.defs._playGame = _playGame = define('playGame', function(_p){return function(_b){return _bind()((function(){var $m; return function(){return $m || ($m = (_showBoard()(_b)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _promptOrEnd()(_p)(_b)}))}})())}});
;
//main = AST(playGame player1 startBoard)
root.defs._main = _main = define('main', _playGame()(_player1)(_startBoard));
;
//minmax = AST(\p b . at digits (head (legalMoves b)))
root.defs._minmax = _minmax = define('minmax', function(_p){return function(_b){return _at()(_digits)((function(){var $m; return function(){return $m || ($m = (_head()((function(){var $m; return function(){return $m || ($m = (_legalMoves()(_b)))}})())))}})())}});
;
//all_moves = AST(ALL_COLS_UP)
root.defs._all_moves = _all_moves = define('all_moves', _ALL_COLS_UP());
;
//base_legalMoves = AST(\b all . if (eq all nil) nil (if (eq (at b (head all)) empty) (cons (head all) (base_legalMoves b (tail all))) (base_legalMoves b (tail all))))
root.defs._base_legalMoves = _base_legalMoves = define('base_legalMoves', function(_b){return function(_all){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_all)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_eq()((function(){var $m; return function(){return $m || ($m = (_at()(_b)((function(){var $m; return function(){return $m || ($m = (_head()(_all)))}})())))}})())(_empty)))}})())((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_head()(_all)))}})())((function(){var $m; return function(){return $m || ($m = (_base_legalMoves()(_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_all)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_base_legalMoves()(_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_all)))}})())))}})())))}})())}});
;
//legalMoves = AST(\b . base_legalMoves b all_moves)
root.defs._legalMoves = _legalMoves = define('legalMoves', function(_b){return _base_legalMoves()(_b)(_all_moves)});
;
//promptPlayer = AST(\p . print (concat ([ Your move player  , p ,  [0-6] or c or q> ])))
root.defs._promptPlayer = _promptPlayer = define('promptPlayer', function(_p){return _print()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Your move player "}))(_$b)(_p)(_$b)((function(){return " [0-6] or c or q>"}))(_$s)))}})())))}})())});
;
//newGame = AST(\e . bind (setValue board startBoard) \_ . bind (setValue player player1) \_ . bind (showBoard startBoard) \_ . bind (browser ([ showBoard(' , (concat startBoard) , ') ])) \_ . promptPlayer player1)
root.defs._newGame = _newGame = define('newGame', function(_e){return _bind()((function(){var $m; return function(){return $m || ($m = (_setValue()((function(){return "board"}))(_startBoard)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_setValue()((function(){return "player"}))(_player1)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_showBoard()(_startBoard)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_browser()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "showBoard('"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_concat()(_startBoard)))}})())(_$b)((function(){return "')"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _promptPlayer()(_player1)}))}})())}))}})())}))}})())}))}})())});
;
//click = AST(\move . bind (getValue board) \b . bind (getValue player) \p . if (eq c move) (click (minmax p b)) (if (isLegalMove b move) ((\new_b . (\win_msg . (\next_p . showBoard new_b) (nextPlayer p)) (gameOver new_b (win? new_b))) (playMove p b (indexof digits move)))))
root.defs._click = _click = define('click', function(_move){return _bind()((function(){var $m; return function(){return $m || ($m = (_getValue()((function(){return "board"}))))}})())((function(){var $m; return function(){return $m || ($m = (function(_b){return _bind()((function(){var $m; return function(){return $m || ($m = (_getValue()((function(){return "player"}))))}})())((function(){var $m; return function(){return $m || ($m = (function(_p){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()((function(){return "c"}))(_move)))}})())((function(){var $m; return function(){return $m || ($m = (_click()((function(){var $m; return function(){return $m || ($m = (_minmax()(_p)(_b)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_isLegalMove()(_b)(_move)))}})())((function(){var $m; return function(){return $m || ($m = (function(_new_b){return function(_win_msg){return function(_next_p){return _showBoard()(_new_b)}((function(){var $m; return function(){return $m || ($m = (_nextPlayer()(_p)))}})())}((function(){var $m; return function(){return $m || ($m = (_gameOver()(_new_b)((function(){var $m; return function(){return $m || ($m = (_win$e()(_new_b)))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_playMove()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_indexof()(_digits)(_move)))}})())))}})())))}})())))}})())}))}})())}))}})())});
;
processResult(//AST(browser ([ showBoard(' , (concat new_b) , ') ]) (if (neq win_msg empty) (print win_msg) (promptPlayer next_p)) (setValue board new_b) (setValue player next_p))
(_browser()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "showBoard('"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_concat()((function(){return "new_b"}))))}})())(_$b)((function(){return "')"}))(_$s)))}})())((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_neq()((function(){return "win_msg"}))(_empty)))}})())((function(){var $m; return function(){return $m || ($m = (_print()((function(){return "win_msg"}))))}})())((function(){var $m; return function(){return $m || ($m = (_promptPlayer()((function(){return "next_p"}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_setValue()((function(){return "board"}))((function(){return "new_b"}))))}})())((function(){var $m; return function(){return $m || ($m = (_setValue()((function(){return "player"}))((function(){return "next_p"}))))}})())));
processResult(//AST(print Illegal move, please try again)
(_print()((function(){return "Illegal move, please try again"}))));
//click0 = AST(\e . click 0)
root.defs._click0 = _click0 = define('click0', function(_e){return _click()((function(){return "0"}))});
;
//click1 = AST(\e . click 1)
root.defs._click1 = _click1 = define('click1', function(_e){return _click()((function(){return "1"}))});
;
//click2 = AST(\e . click 2)
root.defs._click2 = _click2 = define('click2', function(_e){return _click()((function(){return "2"}))});
;
//click3 = AST(\e . click 3)
root.defs._click3 = _click3 = define('click3', function(_e){return _click()((function(){return "3"}))});
;
//click4 = AST(\e . click 4)
root.defs._click4 = _click4 = define('click4', function(_e){return _click()((function(){return "4"}))});
;
//click5 = AST(\e . click 5)
root.defs._click5 = _click5 = define('click5', function(_e){return _click()((function(){return "5"}))});
;
//click6 = AST(\e . click 6)
root.defs._click6 = _click6 = define('click6', function(_e){return _click()((function(){return "6"}))});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)