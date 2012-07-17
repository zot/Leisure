(function() {
  var LZ, Prim, R, RC, U, action, debug, eaten, i, importFile, loadStandardLimit, loadStd, next, nomacros, pos, processArgs, standard, _ref;

  LZ = require('./leisure');

  R = require('./repl');

  RC = require('./replCore');

  Prim = require('./prim');

  U = require('util');

  LZ.ctx.console = console;

  LZ.ctx.U = U;

  debug = false;

  importFile = function importFile(file, cont) {
    if (file.match(/.lsr$/)) file = file.substring(0, file.length - 4);
    return R.compile(file, (function() {
      LZ.eval("req('./" + file + "')");
      return cont();
    }), nomacros, debug);
  };

  standard = ['prelude', 'std', 'parsing'];

  loadStandardLimit = standard.length;

  loadStd = function loadStd() {
    var i, _results;
    _results = [];
    for (i = 0; 0 <= loadStandardLimit ? i < loadStandardLimit : i > loadStandardLimit; 0 <= loadStandardLimit ? i++ : i--) {
      _results.push(LZ.eval("Leisure.req('./" + standard[i] + "')"));
    }
    return _results;
  };

  nomacros = false;

  action = importFile;

  next = R.repl;

  pos = 2;

  eaten = 0;

  for (i = 2, _ref = process.argv.length; 2 <= _ref ? i < _ref : i > _ref; 2 <= _ref ? i++ : i--) {
    if (eaten) {
      eaten--;
    } else if (process.argv[i] === '-h') {
      console.log("Usage: " + process.argv[0] + " [[-r file]... [-c | -q | -b] file...]\n\n-b n -- bootstrap; only load up to standard file N\n-m -- bootstrap; do not expand macros\n-r file -- require JS file\n-c -- compile arguments only\n-g -- generate debug code\n-q -- quiet");
    } else if (process.argv[i] === '-b') {
      loadStandardLimit = process.argv[i + 1];
      RC.setIncludeStd(false);
      eaten = 1;
    } else if (process.argv[i] === '-c') {
      next = function next() {};
    } else if (process.argv[i] === '-q') {
      R.loud = 0;
    } else if (process.argv[i] === '-v') {
      R.loud++;
    } else if (process.argv[i] === '-g') {
      debug = true;
      Prim.defaultEnv.debug = true;
    } else if (process.argv[i] === '-r') {
      require("./" + process.argv[i + 1]);
      eaten = 1;
    } else {
      break;
    }
    pos = i + 1;
  }

  loadStd();

  processArgs = function processArgs(i) {
    if (eaten) {
      return eaten--;
    } else if (process.argv[i] === '-r') {
      require("./" + process.argv[i + 1]);
      return eaten = 1;
    } else if (i < process.argv.length) {
      return action(process.argv[i], function() {
        return processArgs(i + 1);
      });
    } else {
      return next();
    }
  };

  processArgs(pos);

}).call(this);
