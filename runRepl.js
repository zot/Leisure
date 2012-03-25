(function() {
  var R, i, _ref, _ref2;

  R = require('./repl');

  if (process.argv[2] === '-h') {
    console.log("Usage: " + process.argv[0] + " [[-c] file...]");
  } else if (process.argv[2] === '-c') {
    for (i = 3, _ref = process.argv.length; 3 <= _ref ? i < _ref : i > _ref; 3 <= _ref ? i++ : i--) {
      R.compile(null, process.argv[i]);
    }
  } else if (process.argv.length > 2) {
    for (i = 2, _ref2 = process.argv.length; 2 <= _ref2 ? i < _ref2 : i > _ref2; 2 <= _ref2 ? i++ : i--) {
      R.compile(null, process.argv[i]);
      require("./" + process.argv[i]);
    }
  } else {
    R.repl();
  }

}).call(this);
