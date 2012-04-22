(function() {
  var Pretty, clearEnv, clearOutput, envFrame, escapeHtml, evalLine, handleFiles, init, input, lastLine, markupDef, markupLines, processResult, reloadEnv, root, useIframe, write, writeOutput;

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

  writeOutput = function writeOutput(line) {
    output.innerHTML += "<span>" + line + "</span>";
    return output.lastChild.scrollIntoView();
  };

  escapeHtml = function escapeHtml(str) {
    if (typeof str === 'string') {
      return str.replace(/</g, '&lt;');
    } else if ((ReplCore.getType(str)) === 'html') {
      return str(function() {
        return function(x) {
          return x();
        };
      });
    } else {
      return str;
    }
  };

  init = function init(inputField, output) {
    clearEnv();
    write = function write(line) {};
    ReplCore.setHandler(function(ast, result, a, c, r, src, env) {
      if (!(ast.leisureName != null) && (result != null)) {
        env.write("<span><b> " + (escapeHtml(src)) + " \u2192</b>\n  " + (ReplCore.getType(result)) + ": " + (escapeHtml(Pretty.print(result))) + "</span>\n");
      }
      return ReplCore.processResult(result, env);
    });
    return ReplCore.setResetFunc(clearEnv);
  };

  evalLine = function evalLine(line) {
    lastLine = line.replace(/\\/g, '\u03BB');
    return ReplCore.processLine(lastLine);
  };

  reloadEnv = function reloadEnv() {
    return envFrame.contentWindow.location.reload();
  };

  clearOutput = function clearOutput() {
    var o;
    o = document.getElementById('output');
    o.innerHTML = 'Click on <a id="stdDefsLink2" href="javascript:void(getStdDefs())">Standard Functions</a> to see Leisure\'s standard functions.\n\n';
    ReplCore.help();
    return o.innerHTML += '\n';
  };

  clearEnv = function clearEnv() {
    var env, newEnv;
    env = document.getElementById('env');
    if (env != null) document.body.removeChild(env);
    newEnv = document.createElement('iframe');
    newEnv.id = 'env';
    newEnv.setAttribute("style", "display: none");
    newEnv.setAttribute("onload", "Repl.useIframe(this)");
    return document.body.appendChild(newEnv);
  };

  useIframe = function useIframe(envFr) {
    var env, i, k, macs, v, _ref;
    if (envFr) {
      root.envFrame = envFrame = envFr;
      env = envFrame.contentWindow;
      for (i in leisureFuncs) {
        v = leisureFuncs[i];
        env[i] = v;
      }
      Leisure.setEvalFunc(env, env.eval);
      macs = {};
      for (k in macros) {
        v = macros[k];
        macs[k] = v;
      }
      _ref = {
        Leisure: Leisure,
        ReplCore: ReplCore,
        Repl: Repl,
        leisureFuncs: {},
        macros: macs
      };
      for (i in _ref) {
        v = _ref[i];
        env[i] = v;
      }
      env.eval("global = window;\nsetType = Leisure.setType;\nsetDataType = Leisure.setDataType;\ndefine = Leisure.define;\ndefineMacro = Leisure.defineMacro;\ndefineToken = Leisure.defineToken;\nprocessResult = Repl.processResult;\n(function(){\nvar lll;\n\n  global.leisureGetFuncs = function leisureGetFuncs() {\n    return lll\n  }\n  global.leisureSetFuncs = function leisureSetFuncs(funcs) {\n    lll = funcs\n  }\n  global.leisureAddFunc = function leisureAddFunc(func) {\n    lll = Leisure.cons(func, lll)\n  }\n})()");
      return env.leisureSetFuncs(leisureFuncNames);
    }
  };

  markupDef = function markupDef(src, ast) {
    var defType, leading, match, matched, name;
    if (src.match(/^\s*#/)) src;
    if ((match = src.match(Leisure.linePat))) {
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
    writeOutput("" + (ReplCore.getType(result)) + ": " + (escape(Pretty.print(result))) + "\n");
    return ReplCore.processResult(result);
  };

  root.init = init;

  root.markupDef = markupDef;

  root.markupLines = markupLines;

  root.handleFiles = handleFiles;

  root.useIframe = useIframe;

  root.reloadEnv = reloadEnv;

  root.clearEnv = clearEnv;

  root.evalLine = evalLine;

  root.processResult = processResult;

}).call(this);
