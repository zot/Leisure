(function() {
  var R, action, i, importFile, next, pos, _ref, _ref2;

  R = require('./repl');

  importFile = function importFile(file) {
    R.compile(file);
    console.log("require('./" + file + "')");
    return require("./" + file);
  };

  action = importFile;

  next = R.repl;

  for (i = 2, _ref = process.argv.length; 2 <= _ref ? i < _ref : i > _ref; 2 <= _ref ? i++ : i--) {
    pos = i;
    if (process.argv[i] === '-h') {
      console.log("Usage: " + process.argv[0] + " [[-c | -i] file...]");
    } else if (process.argv[i] === '-c') {
      action = R.compile;
      next = function next() {};
    } else if (process.argv[i] === '-q') {
      R.quiet = true;
    } else {
      break;
    }
  }

  for (i = pos, _ref2 = process.argv.length; pos <= _ref2 ? i < _ref2 : i > _ref2; pos <= _ref2 ? i++ : i--) {
    action(process.argv[i]);
  }

  next();

}).call(this);
