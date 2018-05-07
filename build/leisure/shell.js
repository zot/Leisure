// Generated by CoffeeScript 1.10.0
(function() {
  var Nil, booleanFor, defaultEnv, define, evalInput, execFileSync, inErr, lExec, lazy, lz, newCall, ref, ref1, replEnv, resolve, rz, show, toText, trimLastNl;

  execFileSync = require('child_process').execFileSync;

  ref = Leisure.Runtime, define = ref.define, booleanFor = ref.booleanFor;

  ref1 = Leisure.Base, newCall = ref1.newCall, resolve = ref1.resolve, lazy = ref1.lazy, defaultEnv = ref1.defaultEnv, replEnv = ref1.replEnv, show = ref1.show, evalInput = ref1.evalInput;

  Nil = Leisure.Ast.Nil;

  rz = resolve;

  lz = lazy;

  inErr = false;

  global.handleError = function(err, cont, text) {
    var err2, error;
    if (inErr) {
      throw err;
    }
    inErr = true;
    global.ERR = err;
    try {
      return runMonad2(rz(L_simplify)(lz(text)), replEnv, function(result) {
        global.RESULT = result;
        return cont(trimLastNl(lExec(L_head(result), L_map(lz(function(x) {
          var error, r;
          r = rz(x);
          try {
            return evalInput(toText(r), show);
          } catch (error) {
            err = error;
            if (typeof r === 'string') {
              return r;
            } else {
              throw err;
            }
          }
        }), L_tail(result)))));
      });
    } catch (error) {
      err2 = error;
      if (err2.status && err2.stderr) {
        return cont("ERR " + (trimLastNl(err2.stderr.toString())));
      } else {
        global.ERR2 = err2;
        global.ERR = err;
        return console.log("Shell ERROR:", err, text);
      }
    } finally {
      inErr = false;
    }
  };

  toText = function(list) {
    var first, result;
    if (list instanceof Leisure_cons) {
      result = '(';
      first = true;
      while (list instanceof Leisure_cons) {
        if (first) {
          first = false;
        } else {
          result += ' ';
        }
        global.LIST = list;
        result += toText(rz(list.head()));
        list = list.tail();
      }
      return result + ')';
    } else {
      return list;
    }
  };

  trimLastNl = function(str) {
    if (str[str.length - 1] === '\n') {
      return str.substring(0, str.length - 1);
    } else {
      return str;
    }
  };

  lExec = define('exec', function(cmd, args) {
    var res;
    if (res = L_checkPartial(L_eq, arguments)) {
      return res;
    } else {
      return execFileSync.call(null, rz(cmd), rz(args).toArray().map(show), {
        stdio: 'pipe'
      }).toString();
    }
  });

  evalInput("do\n  addTokenGroup 'exec[' ']'\n  defMacro 'exec[' \\list . ['exec' (head (head (head list)))]", identity);

}).call(this);

//# sourceMappingURL=shell.js.map
