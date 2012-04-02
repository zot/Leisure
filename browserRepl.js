(function() {
  var Pretty, handleFiles, init, input, lastLine, markupDef, markupLines, processResult, root, write;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Repl = root = {};
    Pretty = window.Pretty;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  lastLine = null;

  input = null;

  write = null;

  init = function init(inputField, output, defs) {
    write = function write(line) {
      return defs.innerHTML += line;
    };
    ReplCore.setWriter(function(line) {
      return output.innerHTML += line;
    });
    ReplCore.setNext(function() {
      return input.value = '';
    });
    ReplCore.setHandler(function(ast, result, a, c, r) {
      if (ast.lazpName != null) {
        defs.innerHTML += "" + (markupDef(lastLine)) + "<br>";
      } else {
        output.innerHTML += "" + lastLine + " \u2192\n  " + (ReplCore.getType(result)) + ": " + (Pretty.print(result)) + "\n";
      }
      return ReplCore.processResult(result);
    });
    input = inputField;
    input.onkeypress = function onkeypress(e) {
      if ((e.charCode || e.keyCode || e.which) === 13) {
        lastLine = input.value.replace(/\\/g, '\u03BB');
        return ReplCore.processLine(lastLine);
      }
    };
    ReplCore.help();
    return input.select();
  };

  markupDef = function markupDef(line) {
    var match;
    if (line.match(/^\s*#/)) line;
    if ((match = line.match(/^[^=]*(?=\s*=)/))) {
      return "<b>" + match[0] + "</b>" + (line.substring(match[0].length));
    } else {
      return line;
    }
  };

  markupLines = function markupLines(lines) {
    return lines.split('\n').map(markupDef).join('<br>');
  };

  handleFiles = function handleFiles(fileElement) {
    var files, reader;
    files = fileElement.files;
    reader = new FileReader();
    reader.onerror = function onerror(evt) {
      return alert('error' + evt);
    };
    reader.onload = function onload() {
      var ast, line, result, _i, _len, _ref, _ref2, _results;
      _ref = reader.result.split('\n');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (line) {
          write("" + (markupDef(line)) + "\n");
          ast = Lazp.compileLine(line);
          if (ast) {
            _results.push((_ref2 = Lazp.evalLine(line), ast = _ref2[0], result = _ref2[1], _ref2));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    reader.readAsText(files[0]);
    fileElement.value = null;
    return input.select();
  };

  processResult = function processResult(result) {
    write("" + (getType(result)) + ": " + (P.print(result)) + "\n");
    return ReplCore.processResult(result);
  };

  root.init = init;

  root.markupDef = markupDef;

  root.markupLines = markupLines;

  root.handleFiles = handleFiles;

}).call(this);
