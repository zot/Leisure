
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
  var LZ, R, T, U, assertEq, assertEval, assertEvalPrint, assertParse, code, define, f, in1, in2, in3, in4, in5, in6, in7, in8, run, setDataType, setType, _i, _len, _ref, _ref2;

  U = require('util');

  LZ = require('./leisure');

  R = require('./replCore');

  require('./prim');

  setType = LZ.setType, setDataType = LZ.setDataType, define = LZ.define;

  _ref = T = require('./testing.js'), run = _ref.run, assertParse = _ref.assertParse, assertEval = _ref.assertEval, assertEvalPrint = _ref.assertEvalPrint, assertEq = _ref.assertEq;

  console.log('Testing');

  LZ.eval("req('./std')");

  code = R.generateCode(null, "#head l = l \\h t . h\n#tail l = l \\h t . t\n#null l = l (\\h t D . false) true\nlast l = l (\\h t D . null t h (last t)) nil\nval = 2\ndivider = [ '\\n', '-', '-', '-', '-', '-', '\\n' ]\ndiv = [ '\\n', '-', '-', '-', '-', '-', '\\n' ]\n", false);

  LZ.eval(code);

  run('test1', function() {
    return assertParse("1", "ref 1");
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
    return LZ.astEval(LZ.gen(LZ.parse("cons 1 2")));
  });

  run('test8', function() {
    return LZ.astEval(LZ.gen(LZ.parse("head (cons 1 2)")));
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
    return assertEval("(\\1 .; 1) 'hello'", 'hello');
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
    return assertEval("concat divider", '\\n-----\\n');
  });

  run('test21', function() {
    return assertEval('"\\n"', "\n");
  });

  run('test22', function() {
    return assertEval("concat div", '\\n-----\\n');
  });

  run('test23', function() {
    return assertEval("val", 2);
  });

  in1 = "a\nb\nc";

  in2 = "a\n  b\n  c\n   d\n  e\n\nf\n  g\n  h\n    i";

  in3 = "a    {\n b;\n  c {\nd};\n  e\n}\n\nf\n  g\n  h\n    i";

  in4 = "frap bubba =M= a b c\n  d e\n  f g";

  in5 = "do\n  1\n  2";

  in6 = "do\n  a <- ret 3\n  b = + a 1\n  pr a";

  in7 = "let\n  a = 3\n  b = 4\n  [a, b]";

  in8 = "duh [\n 1\n ,\n 2\n ]";

  run('test24', function() {
    return assertEq(LZ.bracify(in1, 1)[0], 'a;b;c');
  });

  run('test25', function() {
    return assertEq(LZ.bracify(in2, 1)[0], 'a{b;c{d};e};;f{g;h{i}}');
  });

  run('test26', function() {
    return assertEq(LZ.prepare(in1)[0], "a\nb\nc");
  });

  run('test27', function() {
    return assertEq(LZ.prepare(in2)[0], "(a b (c d) e)\n\n(f g (h i))");
  });

  run('test28', function() {
    return assertEq(LZ.prepare(in3)[0], "(a b (c d) e)\n(f g (h i))");
  });

  run('test29', function() {
    return assertEq(LZ.bracify(in4, 1)[0], 'frap bubba =M= a b c{d e;f g}');
  });

  run('test30', function() {
    return assertEq(LZ.prepare(in4)[0], 'frap bubba =M= (a b c (d e) (f g))\n');
  });

  run('test31', function() {
    return assertParse("identMacro 1", "ref 1");
  });

  run('test32', function() {
    return assertParse("do 1", "ref 1");
  });

  run('test33', function() {
    return assertParse(in5, "apply (apply (ref bind) (ref 1)) (lambda _ . ref 2)");
  });

  run('test34', function() {
    return assertParse(in6, "apply (apply (ref bind) (apply (ref ret) (ref 3))) (lambda a . apply (lambda b . apply (ref pr) (ref a)) (apply (apply (ref +) (ref a)) (ref 1)))");
  });

  run('test35', function() {
    return assertEq(LZ.prepare('a{b}')[0].trim(), '(a b)');
  });

  run('test36', function() {
    return assertEq(LZ.prepare('a{"b"}')[0].trim(), '(a "b")');
  });

  run('test37', function() {
    return assertEq(LZ.prepare('a{"{b"}')[0].trim(), '(a "{b")');
  });

  run('test38', function() {
    return assertEq(LZ.prepare(in7)[0].trim(), '(let (a = 3) (b = 4) ([a, b]))');
  });

  run('test39', function() {
    return assertEvalPrint(in7, '[3, 4]');
  });

  run('test40', function() {
    return assertEq(LZ.prepare(in8)[0].trim(), '(duh [ 1 , 2 ])');
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

}).call(this);
