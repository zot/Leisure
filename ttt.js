(function(){
var root;

if ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {
  ttt = root = {};
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

var _digits, _player1, _player2, _empty, _player1Win, _player2Win, _startBoard, _testBoard, _win1Board, _win2Board, _slowBoard, _div, _ending, _spot, _row, _col, _diag1, _diag2, _showRow, _showRowDiv, _showBoard2, _showBoard, _showStartBoard, _playMove, _base_win, _win, _tie, _nextPlayer, _isLegalMove, _checkMove, _gameOver, _convertMove, _winner, _promptOrEnd, _playGame, _main, _minmax, _all_moves, _base_legalMoves, _legalMoves, _promptPlayer, _newGame, _click, _click0, _click1, _click2, _click3, _click4, _click5, _click6, _click7, _click8, _clickC;
//digits = AST([ 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ])
root.defs._digits = _digits = define('digits', _$r()((function(){return "0"}))(_$b)((function(){return "1"}))(_$b)((function(){return "2"}))(_$b)((function(){return "3"}))(_$b)((function(){return "4"}))(_$b)((function(){return "5"}))(_$b)((function(){return "6"}))(_$b)((function(){return "7"}))(_$b)((function(){return "8"}))(_$b)((function(){return "9"}))(_$s));
;
//player1 = AST(X)
root.defs._player1 = _player1 = define('player1', "X");
;
//player2 = AST(O)
root.defs._player2 = _player2 = define('player2', "O");
;
//empty = AST( )
root.defs._empty = _empty = define('empty', " ");
;
//player1Win = AST(concat ([ player1 , player1 , player1 ]))
root.defs._player1Win = _player1Win = define('player1Win', _concat()((function(){var $m; return function(){return $m || ($m = (_$r()(_player1)(_$b)(_player1)(_$b)(_player1)(_$s)))}})()));
;
//player2Win = AST(concat ([ player2 , player2 , player2 ]))
root.defs._player2Win = _player2Win = define('player2Win', _concat()((function(){var $m; return function(){return $m || ($m = (_$r()(_player2)(_$b)(_player2)(_$b)(_player2)(_$s)))}})()));
;
//startBoard = AST([ empty , empty , empty , empty , empty , empty , empty , empty , empty ])
root.defs._startBoard = _startBoard = define('startBoard', _$r()(_empty)(_$b)(_empty)(_$b)(_empty)(_$b)(_empty)(_$b)(_empty)(_$b)(_empty)(_$b)(_empty)(_$b)(_empty)(_$b)(_empty)(_$s));
;
//testBoard = AST([ a , b , c , d , e , f , g , h , i ])
root.defs._testBoard = _testBoard = define('testBoard', _$r()((function(){return "a"}))(_$b)((function(){return "b"}))(_$b)((function(){return "c"}))(_$b)((function(){return "d"}))(_$b)((function(){return "e"}))(_$b)((function(){return "f"}))(_$b)((function(){return "g"}))(_$b)((function(){return "h"}))(_$b)((function(){return "i"}))(_$s));
;
//win1Board = AST([ player1 , empty , empty , empty , player1 , empty , empty , empty , player1 ])
root.defs._win1Board = _win1Board = define('win1Board', _$r()(_player1)(_$b)(_empty)(_$b)(_empty)(_$b)(_empty)(_$b)(_player1)(_$b)(_empty)(_$b)(_empty)(_$b)(_empty)(_$b)(_player1)(_$s));
;
//win2Board = AST([ empty , empty , player2 , empty , empty , player2 , empty , empty , player2 ])
root.defs._win2Board = _win2Board = define('win2Board', _$r()(_empty)(_$b)(_empty)(_$b)(_player2)(_$b)(_empty)(_$b)(_empty)(_$b)(_player2)(_$b)(_empty)(_$b)(_empty)(_$b)(_player2)(_$s));
;
//slowBoard = AST([ a , b , c , d , e , f , g , empty , empty ])
root.defs._slowBoard = _slowBoard = define('slowBoard', _$r()((function(){return "a"}))(_$b)((function(){return "b"}))(_$b)((function(){return "c"}))(_$b)((function(){return "d"}))(_$b)((function(){return "e"}))(_$b)((function(){return "f"}))(_$b)((function(){return "g"}))(_$b)(_empty)(_$b)(_empty)(_$s));
;
//div = AST([ \n , - , - , - , - , - , \n ])
root.defs._div = _div = define('div', _$r()((function(){return "\n"}))(_$b)((function(){return "-"}))(_$b)((function(){return "-"}))(_$b)((function(){return "-"}))(_$b)((function(){return "-"}))(_$b)((function(){return "-"}))(_$b)((function(){return "\n"}))(_$s));
;
//ending = AST([ \n ])
root.defs._ending = _ending = define('ending', _$r()((function(){return "\n"}))(_$s));
;
//spot = AST(\b r c . at b (+ c (+ r (+ r r))))
root.defs._spot = _spot = define('spot', function(_b){return function(_r){return function(_c){return _at()(_b)((function(){var $m; return function(){return $m || ($m = (_$o()(_c)((function(){var $m; return function(){return $m || ($m = (_$o()(_r)((function(){var $m; return function(){return $m || ($m = (_$o()(_r)(_r)))}})())))}})())))}})())}}});
;
//row = AST(\b r . concat ([ (spot b r 0) , (spot b r 1) , (spot b r 2) ]))
root.defs._row = _row = define('row', function(_b){return function(_r){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_spot()(_b)(_r)((function(){return 0}))))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)(_r)((function(){return 1}))))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)(_r)((function(){return 2}))))}})())(_$s)))}})())}});
;
//col = AST(\b c . concat ([ (spot b 0 c) , (spot b 1 c) , (spot b 2 c) ]))
root.defs._col = _col = define('col', function(_b){return function(_c){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 0}))(_c)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 1}))(_c)))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 2}))(_c)))}})())(_$s)))}})())}});
;
//diag1 = AST(\b . concat ([ (spot b 0 0) , (spot b 1 1) , (spot b 2 2) ]))
root.defs._diag1 = _diag1 = define('diag1', function(_b){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 0}))((function(){return 0}))))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 1}))((function(){return 1}))))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 2}))((function(){return 2}))))}})())(_$s)))}})())});
;
//diag2 = AST(\b . concat ([ (spot b 0 2) , (spot b 1 1) , (spot b 2 0) ]))
root.defs._diag2 = _diag2 = define('diag2', function(_b){return _concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 0}))((function(){return 2}))))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 1}))((function(){return 1}))))}})())(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)((function(){return 2}))((function(){return 0}))))}})())(_$s)))}})())});
;
//showRow = AST(\b r . [ (spot b r 0) , | , (spot b r 1) , | , (spot b r 2) ])
root.defs._showRow = _showRow = define('showRow', function(_b){return function(_r){return _$r()((function(){var $m; return function(){return $m || ($m = (_spot()(_b)(_r)((function(){return 0}))))}})())(_$b)((function(){return "|"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)(_r)((function(){return 1}))))}})())(_$b)((function(){return "|"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_spot()(_b)(_r)((function(){return 2}))))}})())(_$s)}});
;
//showRowDiv = AST(\b r . append (showRow b r) div)
root.defs._showRowDiv = _showRowDiv = define('showRowDiv', function(_b){return function(_r){return _append()((function(){var $m; return function(){return $m || ($m = (_showRow()(_b)(_r)))}})())(_div)}});
;
//showBoard2 = AST(\b . concat (append (showRowDiv b 0) (append (showRowDiv b 1) (append (showRow b 2) ending))))
root.defs._showBoard2 = _showBoard2 = define('showBoard2', function(_b){return _concat()((function(){var $m; return function(){return $m || ($m = (_append()((function(){var $m; return function(){return $m || ($m = (_showRowDiv()(_b)((function(){return 0}))))}})())((function(){var $m; return function(){return $m || ($m = (_append()((function(){var $m; return function(){return $m || ($m = (_showRowDiv()(_b)((function(){return 1}))))}})())((function(){var $m; return function(){return $m || ($m = (_append()((function(){var $m; return function(){return $m || ($m = (_showRow()(_b)((function(){return 2}))))}})())(_ending)))}})())))}})())))}})())});
;
//showBoard = AST(\b . bind (browser ([ showBoard(' , (concat b) , ') ])) \_ . print (showBoard2 b))
root.defs._showBoard = _showBoard = define('showBoard', function(_b){return _bind()((function(){var $m; return function(){return $m || ($m = (_browser()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "showBoard('"}))(_$b)((function(){var $m; return function(){return $m || ($m = (_concat()(_b)))}})())(_$b)((function(){return "')"}))(_$s)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _print()((function(){var $m; return function(){return $m || ($m = (_showBoard2()(_b)))}})())}))}})())});
;
//showStartBoard = AST(showBoard startBoard)
root.defs._showStartBoard = _showStartBoard = define('showStartBoard', _showBoard()(_startBoard));
;
//playMove = AST(\p b m . append (take m b) (append ([ p ]) (drop (++ m) b)))
root.defs._playMove = _playMove = define('playMove', function(_p){return function(_b){return function(_m){return _append()((function(){var $m; return function(){return $m || ($m = (_take()(_m)(_b)))}})())((function(){var $m; return function(){return $m || ($m = (_append()((function(){var $m; return function(){return $m || ($m = (_$r()(_p)(_$s)))}})())((function(){var $m; return function(){return $m || ($m = (_drop()((function(){var $m; return function(){return $m || ($m = (_$o$o()(_m)))}})())(_b)))}})())))}})())}}});
;
//base_win = AST(\b cond . or (eq cond (row b 0)) (or (eq cond (row b 1)) (or (eq cond (row b 2)) (or (eq cond (col b 0)) (or (eq cond (col b 1)) (or (eq cond (col b 2)) (or (eq cond (diag1 b)) (eq cond (diag2 b)))))))))
root.defs._base_win = _base_win = define('base_win', function(_b){return function(_cond){return _or()((function(){var $m; return function(){return $m || ($m = (_eq()(_cond)((function(){var $m; return function(){return $m || ($m = (_row()(_b)((function(){return 0}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_eq()(_cond)((function(){var $m; return function(){return $m || ($m = (_row()(_b)((function(){return 1}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_eq()(_cond)((function(){var $m; return function(){return $m || ($m = (_row()(_b)((function(){return 2}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_eq()(_cond)((function(){var $m; return function(){return $m || ($m = (_col()(_b)((function(){return 0}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_eq()(_cond)((function(){var $m; return function(){return $m || ($m = (_col()(_b)((function(){return 1}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_eq()(_cond)((function(){var $m; return function(){return $m || ($m = (_col()(_b)((function(){return 2}))))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_or()((function(){var $m; return function(){return $m || ($m = (_eq()(_cond)((function(){var $m; return function(){return $m || ($m = (_diag1()(_b)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_cond)((function(){var $m; return function(){return $m || ($m = (_diag2()(_b)))}})())))}})())))}})())))}})())))}})())))}})())))}})())))}})())}});
;
//win = AST(\b . if (base_win b player1Win) player1 (if (base_win b player2Win) player2 empty))
root.defs._win = _win = define('win', function(_b){return _if()((function(){var $m; return function(){return $m || ($m = (_base_win()(_b)(_player1Win)))}})())(_player1)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_base_win()(_b)(_player2Win)))}})())(_player2)(_empty)))}})())});
;
//tie = AST(\b . not (any (eq empty) b))
root.defs._tie = _tie = define('tie', function(_b){return _not()((function(){var $m; return function(){return $m || ($m = (_any()((function(){var $m; return function(){return $m || ($m = (_eq()(_empty)))}})())(_b)))}})())});
;
//nextPlayer = AST(\p . if (eq p player1) player2 player1)
root.defs._nextPlayer = _nextPlayer = define('nextPlayer', function(_p){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_p)(_player1)))}})())(_player2)(_player1)});
;
//isLegalMove = AST(\b m . if (eq m nil) false ((\i . and (not (eq i nil)) (eq (at b i) empty)) (indexof digits m)))
root.defs._isLegalMove = _isLegalMove = define('isLegalMove', function(_b){return function(_m){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_m)(_nil)))}})())(_false)((function(){var $m; return function(){return $m || ($m = (function(_i){return _and()((function(){var $m; return function(){return $m || ($m = (_not()((function(){var $m; return function(){return $m || ($m = (_eq()(_i)(_nil)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()((function(){var $m; return function(){return $m || ($m = (_at()(_b)(_i)))}})())(_empty)))}})())}((function(){var $m; return function(){return $m || ($m = (_indexof()(_digits)(_m)))}})())))}})())}});
;
//checkMove = AST(\p b move . if (isLegalMove b move) (playGame (nextPlayer p) (playMove p b (indexof digits move))) (promptOrEnd p b))
root.defs._checkMove = _checkMove = define('checkMove', function(_p){return function(_b){return function(_move){return _if()((function(){var $m; return function(){return $m || ($m = (_isLegalMove()(_b)(_move)))}})())((function(){var $m; return function(){return $m || ($m = (_playGame()((function(){var $m; return function(){return $m || ($m = (_nextPlayer()(_p)))}})())((function(){var $m; return function(){return $m || ($m = (_playMove()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_indexof()(_digits)(_move)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_promptOrEnd()(_p)(_b)))}})())}}});
;
//gameOver = AST(\b winner . if (eq winner empty) (if (tie b) WE HAVE A TIE!!! empty) (concat ([ WINNER: Player  , winner , !!! ])))
root.defs._gameOver = _gameOver = define('gameOver', function(_b){return function(_winner){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_winner)(_empty)))}})())((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_tie()(_b)))}})())((function(){return "WE HAVE A TIE!!!"}))(_empty)))}})())((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "WINNER: Player "}))(_$b)(_winner)(_$b)((function(){return "!!!"}))(_$s)))}})())))}})())}});
;
//convertMove = AST(\p b move . eq move c (checkMove p b (minmax p b)) (eq move q (print PLAYER FORFEITED!!!) (checkMove p b move)))
root.defs._convertMove = _convertMove = define('convertMove', function(_p){return function(_b){return function(_move){return _eq()(_move)((function(){return "c"}))((function(){var $m; return function(){return $m || ($m = (_checkMove()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_minmax()(_p)(_b)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_eq()(_move)((function(){return "q"}))((function(){var $m; return function(){return $m || ($m = (_print()((function(){return "PLAYER FORFEITED!!!"}))))}})())((function(){var $m; return function(){return $m || ($m = (_checkMove()(_p)(_b)(_move)))}})())))}})())}}});
;
//winner = AST(\w p b . if (eq empty w) (bind (prompt (concat ([ Your move player  , p ,  [0-8] or c or q> ]))) \move . convertMove p b move) (print w))
root.defs._winner = _winner = define('winner', function(_w){return function(_p){return function(_b){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_empty)(_w)))}})())((function(){var $m; return function(){return $m || ($m = (_bind()((function(){var $m; return function(){return $m || ($m = (_prompt()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Your move player "}))(_$b)(_p)(_$b)((function(){return " [0-8] or c or q>"}))(_$s)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(_move){return _convertMove()(_p)(_b)(_move)}))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_print()(_w)))}})())}}});
;
//promptOrEnd = AST(\p b . winner (gameOver b (win b)) p b)
root.defs._promptOrEnd = _promptOrEnd = define('promptOrEnd', function(_p){return function(_b){return _winner()((function(){var $m; return function(){return $m || ($m = (_gameOver()(_b)((function(){var $m; return function(){return $m || ($m = (_win()(_b)))}})())))}})())(_p)(_b)}});
;
//playGame = AST(\p b . bind (showBoard b) \_ . promptOrEnd p b)
root.defs._playGame = _playGame = define('playGame', function(_p){return function(_b){return _bind()((function(){var $m; return function(){return $m || ($m = (_showBoard()(_b)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _promptOrEnd()(_p)(_b)}))}})())}});
;
//main = AST(playGame player1 startBoard)
root.defs._main = _main = define('main', _playGame()(_player1)(_startBoard));
;
//minmax = AST(\p b . (\legal . if (eq legal nil) nil (at digits (head legal))) (legalMoves b))
root.defs._minmax = _minmax = define('minmax', function(_p){return function(_b){return function(_legal){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_legal)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_at()(_digits)((function(){var $m; return function(){return $m || ($m = (_head()(_legal)))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_legalMoves()(_b)))}})())}});
;
//all_moves = AST([ 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 ])
root.defs._all_moves = _all_moves = define('all_moves', _$r()((function(){return 0}))(_$b)((function(){return 1}))(_$b)((function(){return 2}))(_$b)((function(){return 3}))(_$b)((function(){return 4}))(_$b)((function(){return 5}))(_$b)((function(){return 6}))(_$b)((function(){return 7}))(_$b)((function(){return 8}))(_$s));
;
//base_legalMoves = AST(\b all . if (eq all nil) nil (if (eq (at b (head all)) empty) (cons (head all) (base_legalMoves b (tail all))) (base_legalMoves b (tail all))))
root.defs._base_legalMoves = _base_legalMoves = define('base_legalMoves', function(_b){return function(_all){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()(_all)(_nil)))}})())(_nil)((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_eq()((function(){var $m; return function(){return $m || ($m = (_at()(_b)((function(){var $m; return function(){return $m || ($m = (_head()(_all)))}})())))}})())(_empty)))}})())((function(){var $m; return function(){return $m || ($m = (_cons()((function(){var $m; return function(){return $m || ($m = (_head()(_all)))}})())((function(){var $m; return function(){return $m || ($m = (_base_legalMoves()(_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_all)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_base_legalMoves()(_b)((function(){var $m; return function(){return $m || ($m = (_tail()(_all)))}})())))}})())))}})())}});
;
//legalMoves = AST(\b . base_legalMoves b all_moves)
root.defs._legalMoves = _legalMoves = define('legalMoves', function(_b){return _base_legalMoves()(_b)(_all_moves)});
;
//promptPlayer = AST(\p . print (concat ([ Your move player  , p ,  [0-8] or c or q> ])))
root.defs._promptPlayer = _promptPlayer = define('promptPlayer', function(_p){return _print()((function(){var $m; return function(){return $m || ($m = (_concat()((function(){var $m; return function(){return $m || ($m = (_$r()((function(){return "Your move player "}))(_$b)(_p)(_$b)((function(){return " [0-8] or c or q>"}))(_$s)))}})())))}})())});
;
//newGame = AST(\e . bind (setValue board startBoard) \_ . bind (setValue player player1) \_ . bind (print hello world!) \_ . bind (showBoard startBoard) \_ . promptPlayer player1)
root.defs._newGame = _newGame = define('newGame', function(_e){return _bind()((function(){var $m; return function(){return $m || ($m = (_setValue()((function(){return "board"}))(_startBoard)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_setValue()((function(){return "player"}))(_player1)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_print()((function(){return "hello world!"}))))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_showBoard()(_startBoard)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _promptPlayer()(_player1)}))}})())}))}})())}))}})())}))}})())});
;
//click = AST(\move . bind (getValue board) \b . bind (getValue player) \p . if (eq c move) (click (minmax p b)) (if (isLegalMove b move) ((\new_b . (\win_msg . (\next_p . bind (showBoard new_b) \_ . bind (if (neq win_msg empty) (print win_msg) (promptPlayer next_p)) \_ . bind (setValue board new_b) \_ . setValue player next_p) (nextPlayer p)) (gameOver new_b (win new_b))) (playMove p b (indexof digits move))) (print Illegal move, please try again)))
root.defs._click = _click = define('click', function(_move){return _bind()((function(){var $m; return function(){return $m || ($m = (_getValue()((function(){return "board"}))))}})())((function(){var $m; return function(){return $m || ($m = (function(_b){return _bind()((function(){var $m; return function(){return $m || ($m = (_getValue()((function(){return "player"}))))}})())((function(){var $m; return function(){return $m || ($m = (function(_p){return _if()((function(){var $m; return function(){return $m || ($m = (_eq()((function(){return "c"}))(_move)))}})())((function(){var $m; return function(){return $m || ($m = (_click()((function(){var $m; return function(){return $m || ($m = (_minmax()(_p)(_b)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_isLegalMove()(_b)(_move)))}})())((function(){var $m; return function(){return $m || ($m = (function(_new_b){return function(_win_msg){return function(_next_p){return _bind()((function(){var $m; return function(){return $m || ($m = (_showBoard()(_new_b)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_if()((function(){var $m; return function(){return $m || ($m = (_neq()(_win_msg)(_empty)))}})())((function(){var $m; return function(){return $m || ($m = (_print()(_win_msg)))}})())((function(){var $m; return function(){return $m || ($m = (_promptPlayer()(_next_p)))}})())))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _bind()((function(){var $m; return function(){return $m || ($m = (_setValue()((function(){return "board"}))(_new_b)))}})())((function(){var $m; return function(){return $m || ($m = (function(__){return _setValue()((function(){return "player"}))(_next_p)}))}})())}))}})())}))}})())}((function(){var $m; return function(){return $m || ($m = (_nextPlayer()(_p)))}})())}((function(){var $m; return function(){return $m || ($m = (_gameOver()(_new_b)((function(){var $m; return function(){return $m || ($m = (_win()(_new_b)))}})())))}})())}((function(){var $m; return function(){return $m || ($m = (_playMove()(_p)(_b)((function(){var $m; return function(){return $m || ($m = (_indexof()(_digits)(_move)))}})())))}})())))}})())((function(){var $m; return function(){return $m || ($m = (_print()((function(){return "Illegal move, please try again"}))))}})())))}})())}))}})())}))}})())});
;
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
//click7 = AST(\e . click 7)
root.defs._click7 = _click7 = define('click7', function(_e){return _click()((function(){return "7"}))});
;
//click8 = AST(\e . click 8)
root.defs._click8 = _click8 = define('click8', function(_e){return _click()((function(){return "8"}))});
;
//clickC = AST(\e . click c)
root.defs._clickC = _clickC = define('clickC', function(_e){return _click()((function(){return "c"}))});
;

if (typeof window !== 'undefined' && window !== null) {
  Leisure.processTokenDefs(root.tokenDefs);
}
return root;
}).call(this)