(function() {
  var LZ, R, action, i, importFile, loadStd, next, pos, processArgs, _ref;

  R = require('./repl');

  LZ = require('./lazp');

  importFile = function importFile(file, cont) {
    return R.compile(file, function() {
      LZ.eval("require('./" + file + "')");
      return cont();
    });
  };

  loadStd = function loadStd() {
    return require('./std');
  };

  action = importFile;

  next = R.repl;

  pos = 2;

  for (i = 2, _ref = process.argv.length; 2 <= _ref ? i < _ref : i > _ref; 2 <= _ref ? i++ : i--) {
    if (process.argv[i] === '-h') {
      console.log("Usage: " + process.argv[0] + " [[-c | -q | -b] file...]\n\n-b -- bootstrap; don't load std functions\n-c -- compile arguments only\n-q -- quiet");
    } else if (process.argv[i] === '-b') {
      loadStd = function loadStd() {};
    } else if (process.argv[i] === '-c') {
      action = function action(f, cont) {
        return R.compile(f, cont);
      };
      next = function next() {};
    } else if (process.argv[i] === '-q') {
      R.quiet = true;
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
