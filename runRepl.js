(function() {
  var R, action, i, importFile, loadStd, next, pos, _ref, _ref2;

  R = require('./repl');

  importFile = function importFile(file) {
    R.compile(file);
    console.log("require('./" + file + "')");
    return require("./" + file);
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
      action = R.compile;
      next = function next() {};
    } else if (process.argv[i] === '-q') {
      R.quiet = true;
    } else {
      break;
    }
    pos = i + 1;
  }

  loadStd();

  for (i = pos, _ref2 = process.argv.length; pos <= _ref2 ? i < _ref2 : i > _ref2; pos <= _ref2 ? i++ : i--) {
    action(process.argv[i]);
  }

  next();

}).call(this);
