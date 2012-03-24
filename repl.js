(function() {
  var L, R, U, print, processLine, repl, root, runRepl,
    __slice = Array.prototype.slice;

  U = require('util');

  R = require('readline');

  L = require('./lazp');

  print = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return process.stdout.write(U.format.apply(null, args));
  };

  repl = function() {
    return runRepl(R.createInterface(process.stdin, process.stdout));
  };

  runRepl = function(face) {
    return face.question('Lazp> ', function(line) {
      return processLine(face, line);
    });
  };

  processLine = function(face, line) {
    var g, p, r;
    switch (line) {
      case ':q':
        return process.exit(0);
      case ':g':
        return face.write('');
      default:
        try {
          p = L.parse(line);
          face.write("PARSED: " + L.astPrint(p) + "\n");
          g = L.gen(p);
          face.write("GEN: " + g[0] + "\n");
          r = g[1](g[0]);
          return face.write("RESULT: " + r + " (" + (typeof r) + ")\n");
        } catch (err) {

        } finally {
          runRepl(face);
        }
    }
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.print = print;

  root.repl = repl;

}).call(this);
