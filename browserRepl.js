(function() {
  var init, lastLine, markupDef, markupLines, root;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Repl = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  lastLine = null;

  init = function init(input, output, defs) {
    ReplCore.setWriter(function(line) {
      return output.innerHTML += line;
    });
    ReplCore.setNext(function() {
      return input.value = '';
    });
    ReplCore.setHandler(function(ast, result, a, c, r) {
      if (ast.lazpName != null) {
        return defs.innerHTML += "" + (markupDef(lastLine)) + "<br>";
      } else {
        return output.innerHTML += "" + lastLine + " \u2192\n  " + (ReplCore.getType(result)) + ": " + result + "\n";
      }
    });
    input.onkeypress = function onkeypress(e) {
      var code;
      global.E = e;
      code = e.charCode || e.keyCode || e.which;
      if (code === 13) {
        lastLine = input.value.replace(/\\/g, '\u03BB');
        return ReplCore.processLine(lastLine);
      }
    };
    return ReplCore.help();
  };

  markupDef = function markupDef(line) {
    var match;
    if ((match = line.match(/^[^=]*(?=\s*=)/))) {
      return "<b>" + match[0] + "</b>" + (line.substring(match[0].length));
    } else {
      return line;
    }
  };

  markupLines = function markupLines(lines) {
    return lines.split('\n').map(markupDef).join('<br>');
  };

  root.init = init;

  root.markupDef = markupDef;

  root.markupLines = markupLines;

}).call(this);
