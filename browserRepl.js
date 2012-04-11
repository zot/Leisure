(function() {
  var Pretty, clearEnv, clearOutput, envFrame, handleFiles, init, input, lastLine, markupDef, markupLines, processResult, reloadEnv, root, useIframe, write;

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

  envFrame = null;

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
    ReplCore.setHandler(function(ast, result, a, c, r, src) {
      if (ast.lazpName != null) {
        defs.innerHTML += "" + (markupDef(src, ast)) + "<br>";
      } else if (result) {
        output.innerHTML += "<b>> " + lastLine + " \u2192</b>\n  " + (ReplCore.getType(result)) + ": " + (Pretty.print(result)) + "\n";
      }
      return ReplCore.processResult(result);
    });
    ReplCore.setResetFunc(clearEnv);
    input = inputField;
    input.onkeypress = function onkeypress(e) {
      if ((e.charCode || e.keyCode || e.which) === 13) {
        lastLine = input.value.replace(/\\/g, '\u03BB');
        return ReplCore.processLine(lastLine);
      }
    };
    return input.select();
  };

  reloadEnv = function reloadEnv() {
    return envFrame.contentWindow.location.reload();
  };

  clearOutput = function clearOutput() {
    var o;
    o = document.getElementById('output');
    o.innerHTML = 'Click on <a id="stdDefsLink2" href="javascript:void(getStdDefs())">Standard Functions</a> to see Lazp\'s standard functions.\n\n';
    ReplCore.help();
    return o.innerHTML += '\n';
  };

  clearEnv = function clearEnv(clearEnv) {
    var env, newEnv;
    document.getElementById('defs').innerHTML = "";
    env = document.getElementById('env');
    document.body.removeChild(env);
    newEnv = document.createElement('iframe');
    newEnv.id = 'env';
    newEnv.setAttribute("style", "display: none");
    newEnv.setAttribute("onload", "Repl.useIframe(this)");
    return document.body.appendChild(newEnv);
  };

  useIframe = function useIframe(envFr) {
    var env, i, v, _ref;
    if (envFr) {
      root.envFrame = envFrame = envFr;
      env = envFrame.contentWindow;
      for (i in lazpFuncs) {
        v = lazpFuncs[i];
        env[i] = v;
      }
      Lazp.setEvalFunc(env, env.eval);
      _ref = {
        Lazp: Lazp,
        ReplCore: ReplCore,
        Repl: Repl
      };
      for (i in _ref) {
        v = _ref[i];
        env[i] = v;
      }
      env.eval("global = window;\nglobal.lazpFuncs = {};\nsetType = Lazp.setType;\nsetDataType = Lazp.setDataType;\ndefine = Lazp.define;\ndefineToken = Lazp.defineToken;\nprocessResult = Repl.processResult;");
      return clearOutput();
    }
  };

  markupDef = function markupDef(src, ast) {
    var defType, leading, match, matched, name;
    if (src.match(/^\s*#/)) src;
    if ((match = src.match(Lazp.linePat))) {
      matched = match[0], leading = match[1], name = match[2], defType = match[3];
      return "<div><b>" + name + "</b> " + defType + " " + (src.substring(matched.length)) + "</div>";
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
      window.e = evt;
      alert('error' + evt);
      return fileElement.value = null;
    };
    reader.onload = function onload() {
      var code;
      code = ReplCore.generateCode(files[0], reader.result, false, true);
      eval(code);
      return fileElement.value = null;
    };
    reader.readAsText(files[0]);
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

  root.useIframe = useIframe;

  root.reloadEnv = reloadEnv;

  root.clearEnv = clearEnv;

}).call(this);
