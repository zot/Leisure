
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
Wimpy testing framework
*/

(function() {
  var LZ, P, R, assertEq, assertEval, assertEvalPrint, assertParse, run, runTests, stats;

  R = require('./repl');

  LZ = require('./leisure');

  P = require('./pretty');

  stats = {
    successes: 0,
    failures: 0,
    failed: []
  };

  assertEq = function assertEq(actual, expected, desc) {
    if (expected !== actual) {
      throw new Error("" + (desc ? "[" + desc + "] " : "") + "Expected <" + expected + "> but got <" + actual + ">");
    }
  };

  assertEval = function assertEval(actual, expected, desc) {
    var ast, code, err, rest, _ref;
    _ref = LZ.parseFull(actual), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err != null) {
      throw new Error("Error: " + err);
    } else if (rest != null ? rest.trim() : void 0) {
      throw new Error("Error, input left after parsing: '" + (rest.trim()) + "'");
    } else {
      code = LZ.gen(ast);
      if (code.err) throw new Error(code.err);
      return assertEq(LZ.astEval(code), expected, desc != null ? desc : actual);
    }
  };

  assertEvalPrint = function assertEvalPrint(actual, expected, desc) {
    var ast, code, err, rest, v, _ref;
    _ref = LZ.parseFull(actual), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err != null) {
      throw new Error("Error: " + err);
    } else if (rest != null ? rest.trim() : void 0) {
      throw new Error("Error, input left after parsing: '" + (rest.trim()) + "'");
    } else {
      code = LZ.gen(ast);
      if (code.err) throw new Error(code.err);
      v = P.print(LZ.astEval(code));
      return assertEq(v, expected, desc != null ? desc : actual);
    }
  };

  assertParse = function assertParse(actual, expected, desc) {
    var ast, err, rest, _ref;
    _ref = LZ.parseFull(actual), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err != null) {
      throw new Error("Error: " + err);
    } else if (rest != null ? rest.trim() : void 0) {
      throw new Error("Error, input left after parsing: '" + (rest.trim()) + "'");
    } else {
      return assertEq(LZ.astPrint(ast), expected, desc != null ? desc : actual);
    }
  };

  run = function run(name, func) {
    try {
      func();
      R.print('.');
      return stats.successes++;
    } catch (err) {
      stats.failures++;
      stats.failed.push(name);
      return R.print("\nFailure, " + name + ": " + err.stack);
    }
  };

  runTests = function runTests(arg) {
    var args, i, _ref;
    args = typeof arg === 'object' && arg.constructor === Array ? arg : arguments;
    R.print("Running Tests...\n");
    for (i = 0, _ref = args.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      run(arg[i].name, arg[i]);
    }
    return R.print("\nDone\n");
  };

  exports.assertEq = assertEq;

  exports.assertEval = assertEval;

  exports.assertEvalPrint = assertEvalPrint;

  exports.assertParse = assertParse;

  exports.runTests = runTests;

  exports.run = run;

  exports.stats = stats;

}).call(this);
