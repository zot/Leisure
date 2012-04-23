(function() {
  var LZ, R, action, i, importFile, loadStd, next, nomacros, pos, processArgs, _ref;

  LZ = require('./leisure');

  R = require('./repl');

  importFile = function importFile(file, cont) {
    return R.compile(file, (function() {
      LZ.eval("req('./" + file + "')");
      return cont();
    }), nomacros);
  };

  loadStd = function loadStd() {
    return LZ.eval("Leisure.req('./std')");
  };

  nomacros = false;

  action = importFile;

  next = R.repl;

  pos = 2;

  for (i = 2, _ref = process.argv.length; 2 <= _ref ? i < _ref : i > _ref; 2 <= _ref ? i++ : i--) {
    if (process.argv[i] === '-h') {
      console.log("Usage: " + process.argv[0] + " [[-c | -q | -b] file...]\n\n-b -- bootstrap; don't load std functions\n-c -- compile arguments only\n-q -- quiet");
    } else if (process.argv[i] === '-b') {
      loadStd = function loadStd() {};
      nomacros = true;
    } else if (process.argv[i] === '-c') {
      action = function action(f, cont) {
        return R.compile(f, cont, nomacros);
      };
      next = function next() {};
    } else if (process.argv[i] === '-q') {
      R.loud = 0;
    } else if (process.argv[i] === '-v') {
      R.loud++;
    } else {
      break;
    }
    pos = i + 1;
  }

  loadStd();

  processArgs = function processArgs(i) {
    if (i < process.argv.length) {
      return action(process.argv[i], function() {
        return processArgs(i + 1);
      });
    } else {
      return next();
    }
  };

  processArgs(pos);

}).call(this);
