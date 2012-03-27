(function() {
  var R, i, interactive, start, _ref, _ref2;

  R = require('./repl');

  if (process.argv[2] === '-h') {
    console.log("Usage: " + process.argv[0] + " [[-c | -i] file...]");
  } else if (process.argv[2] === '-c') {
    for (i = 3, _ref = process.argv.length; 3 <= _ref ? i < _ref : i > _ref; 3 <= _ref ? i++ : i--) {
      R.compile(null, process.argv[i]);
    }
  } else if (process.argv.length > 1) {
    start = 2;
    if (process.argv[2] === '-i') {
      interactive = true;
      start = 3;
    }
    for (i = start, _ref2 = process.argv.length; start <= _ref2 ? i < _ref2 : i > _ref2; start <= _ref2 ? i++ : i--) {
      R.compile(null, process.argv[i]);
      require("./" + process.argv[i]);
    }
    if (interactive) R.repl();
  } else {
    R.repl();
  }

}).call(this);
