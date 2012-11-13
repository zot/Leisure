
/*
Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/

/*
Tests for Leisure
*/

(function() {
  var LZ, Parse, R, T, U, applyBrackets, arrayToCons, assertEq, assertEval, assertEvalPrint, assertParse, br, code, cons, debug, define, f, in1, in2, in3, in4, in5, in6, in7, in8, in9, out9_12, out9_30, run, setDataType, setType, _i, _len, _ref, _ref2;

  U = require('util');

  Parse = require('./parse');

  LZ = require('./leisure');

  R = require('./replCore');

  require('./prim');

  setType = LZ.setType, setDataType = LZ.setDataType, define = LZ.define;

  _ref = T = require('./testing.js'), run = _ref.run, assertParse = _ref.assertParse, assertEval = _ref.assertEval, assertEvalPrint = _ref.assertEvalPrint, assertEq = _ref.assertEq;

  console.log('Testing');

  LZ.eval("req('./prelude')");

  LZ.eval("req('./std')");

  debug = false;

  code = R.generateCode(null, "#head l = l \\h t . h\n#tail l = l \\h t . t\n#null l = l (\\h t D . false) true\n#last l = l (\\h t D . null? t h (last t)) nil\nval = 2\ndivider = ['\\n' '-' '-' '-' '-' '-' '\\n']\ndiv = ['\\n' '-' '-' '-' '-' '-' '\\n']\n", false, null, null, null, debug);

  LZ.eval(code);

  run('test1', function() {
    return assertParse("1", "lit 1");
  });

  run('test2', function() {
    return assertParse("\\x.x x y", "lambda x . apply (apply (ref x) (ref x)) (ref y)", "\\x.x x y");
  });

  run('test3', function() {
    return assertEval("(\\x . x) 'hello'", 'hello');
  });

  run('test4', function() {
    return assertEval("eval (apply (lambda 'x' (ref 'x')) (lit 'hello'))", 'hello');
  });

  run('test5', function() {
    return assertEval("(eq cons cons) 'yes' 'no'", 'yes');
  });

  run('test6', function() {
    return assertEval("(eq cons true) 'yes' 'no'", 'no');
  });

  run('test7', function() {
    return LZ.astEval(LZ.gen(LZ.parseFull("cons 1 2")));
  });

  run('test8', function() {
    return LZ.astEval(LZ.gen(LZ.parseFull("head (cons 1 2)")));
  });

  run('test9', function() {
    return assertEval("head (cons 1 2)", 1);
  });

  run('test10', function() {
    return assertEval("tail (cons 1 2)", 2);
  });

  run('test11', function() {
    return assertEval("last (cons 'a' nil)", 'a');
  });

  run('test12', function() {
    return assertEval("last (cons 'a' (cons 'b' nil))", 'b');
  });

  run('test13', function() {
    return assertEval("(is (cons 'a' 'b') cons) 'yes' 'no'", 'yes');
  });

  run('test14', function() {
    return assertEval("(eval (lambda 'a' (lambda 'b' (ref 'a')))) 'yes' 'no'", 'yes');
  });

  run('test15', function() {
    return assertEval("(\\1 .\n 1) 'hello'", 'hello');
  });

  run('test16', function() {
    return assertEval("head ([ 1 ])", 1);
  });

  run('test17', function() {
    return assertEval("head (tail (append ([ 1 ]) ([ 2 ])))", 2);
  });

  run('test18', function() {
    return assertEval("head [1]", 1);
  });

  run('test19', function() {
    return assertEval("head (tail (append [1] [2]))", 2);
  });

  run('test20', function() {
    return assertEval("concat divider", '\n-----\n');
  });

  run('test21', function() {
    return assertEval('"\\n"', "\n");
  });

  run('test22', function() {
    return assertEval("concat div", '\n-----\n');
  });

  run('test23', function() {
    return assertEval("val", 2);
  });

  in1 = "a\nb\nc";

  in2 = "a\n  b\n  c\n   d\n  e\n\nf\n  g\n  h\n    i";

  in3 = "a    {\n b;\n  c {\nd};\n  e\n}\n\nf\n  g\n  h\n    i";

  in4 = "frap bubba =M= a b c\n  d e\n  f g";

  in8 = "duh [\n 1\n 2\n ]";

  in9 = "(eq l nil) false\n  or\n    f (head l)\n    any f (tail l)\n\n# return true if ALL elements of l satisfy f, which takes exactly one arg\n# eg. all (eq 0) [0 0 0] gives true: true\n# caveat!  return true for nil lists\nall f l = or\n  eq l nil\n  and\n    f (head l)\n    all f (tail l)";

  out9_12 = "([[eq]] <<l>> <<nil>>) <<false>>\n  <<or\n    f (head l)\n    any f (tail l)>>\n\n# return true if ALL elements of l satisfy f, which takes exactly one arg\n# eg. all (eq 0) [0 0 0] gives true: true\n# caveat!  return true for nil lists\nall f l = or\n  eq l nil\n  and\n    f (head l)\n    all f (tail l)";

  out9_30 = "(eq l nil) false\n  or\n    f ([[head]] <<l>>)\n    any f (tail l)\n\n# return true if ALL elements of l satisfy f, which takes exactly one arg\n# eg. all (eq 0) [0 0 0] gives true: true\n# caveat!  return true for nil lists\nall f l = or\n  eq l nil\n  and\n    f (head l)\n    all f (tail l)";

  run('test24', function() {
    return assertParse("identMacro 1", "lit 1");
  });

  run('test25', function() {
    return assertParse("macroCons 1 nil", "apply (apply (ref cons) (lit 1)) (ref nil)");
  });

  run('test26', function() {
    return assertParse("do 1", "lit 1");
  });

  in5 = "do\n  1\n  2";

  run('test27', function() {
    return assertParse(in5, "apply (apply (ref bind) (lit 1)) (lambda _ . lit 2)");
  });

  in6 = "do\n  a <- ret 3\n  b = + a 1\n  pr a";

  run('test28', function() {
    return assertParse(in6, "apply (apply (ref bind) (apply (ref ret) (lit 3))) (lambda a . apply (lambda b . apply (ref pr) (ref a)) (apply (apply (ref +) (ref a)) (lit 1)))");
  });

  in7 = "do\n  a = 3\n  b = 4\n  [a b]";

  run('test29', function() {
    return assertEvalPrint(in7, '[3 4]');
  });

  applyBrackets = function applyBrackets(str, pos, func) {
    var ast, brackets, end, prev, result, start;
    ast = LZ.parseFull(str)[0];
    brackets = LZ.bracket(ast, pos);
    result = '';
    prev = 0;
    while (brackets !== Parse.Nil) {
      start = brackets.head().head();
      end = brackets.head().tail().head();
      result += "" + (str.substring(prev, start)) + (func(str.substring(start, end), result === ''));
      brackets = brackets.tail();
      prev = end;
    }
    return "" + result + (str.substring(prev));
  };

  br = function br(str, sq) {
    return "" + (sq ? '[[' : '<<') + str + (sq ? ']]' : '>>');
  };

  run('test30', function() {
    return assertEq(applyBrackets(in9, 12, br), out9_12);
  });

  run('test31', function() {
    return assertEq(applyBrackets(in9, 30, br), out9_30);
  });

  cons = Parse.cons;

  arrayToCons = function arrayToCons(array) {
    var i, res, _ref2;
    res = Nil;
    for (i = _ref2 = array.length - 1; _ref2 <= 0 ? i <= 0 : i >= 0; _ref2 <= 0 ? i++ : i--) {
      res = cons(array[i], res);
    }
    return res;
  };

  run('test32', function() {
    var ast;
    ast = (LZ.parseFull('_append pairF (tail l1) l2'))[0];
    return assertEq(LZ.primGen(ast, 0, ast, new LZ.Code(), null, arrayToCons(['_append', 'pairF', 'tail', 'l1', 'l2']), true, 'test', "Parse.", true).main, "__append()(_pairF)((function(){var $m; return (function(){return $m || ($m = _tail()(_l1))})})())(_l2)");
  });

  run('test33', function() {
    var ast;
    ast = (LZ.parseFull('pairF (head l1) (_append pairF (tail l1) l2)'))[0];
    return assertEq(LZ.primGen(ast, 0, ast, new LZ.Code(), null, arrayToCons(['_append', 'pairF', 'tail', 'l1', 'l2']), true, 'test', "Parse.", true).main, "_pairF()((function(){var $m; return (function(){return $m || ($m = _head()(_l1))})})())((function(){var $m; return (function(){return $m || ($m = __append()(_pairF)((function(){var $m; return (function(){return $m || ($m = _tail()(_l1))})})())(_l2))})})())");
  });

  run('test34', function() {
    var ast;
    ast = LZ.getNthBody((LZ.parseFull('\\pairF . \\l1 . \\l2 . pairF (head l1) (_append pairF (tail l1) l2)'))[0], 4);
    return assertEq(LZ.primGen(ast, 0, ast, new LZ.Code(), null, arrayToCons(['_append', 'pairF', 'tail', 'l1', 'l2']), true, 'test', "Parse.", true).main, "_pairF()((function(){var $m; return (function(){return $m || ($m = _head()(_l1))})})())((function(){var $m; return (function(){return $m || ($m = __append()(_pairF)((function(){var $m; return (function(){return $m || ($m = _tail()(_l1))})})())(_l2))})})())");
  });

  console.log('\nDone');

  if (!T.stats.failures) {
    console.log("Succeeded all " + T.stats.successes + " tests.");
  } else {
    console.log("Succeeded " + T.stats.successes + " test" + (T.stats.successes > 1 ? 's' : '') + "\nFailed " + T.stats.failures + " test" + (T.stats.failures > 1 ? 's' : '') + ":");
    _ref2 = T.stats.failed;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      f = _ref2[_i];
      console.log("  " + f);
    }
  }

  process.exit(0);

}).call(this);
