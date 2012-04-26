
/*
# put this in your browser and it boots the leisure envioronment
*/

(function() {
  var Leisure, bootLeisure, evalDoc, initBootEnv, loadThen, originalBody;

  Leisure = {};

  originalBody = null;

  bootLeisure = function bootLeisure() {
    var body, i, pre, style, _i, _len, _ref;
    body = document.body;
    if ((body.getAttribute('leisurecode')) != null) {
      pre = document.createElement('pre');
      pre.setAttribute('leisurecode', '');
      pre.innerHTML = body.innerHTML;
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      body.appendChild(pre);
      body.removeAttribute('leisurecode');
    }
    window.removeEventListener('load', bootLeisure);
    originalBody = body.cloneNode(true);
    _ref = ['leisure', 'gaudy', 'thin'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      style = document.createElement('link');
      style.setAttribute('type', "text/css");
      style.setAttribute('rel', "stylesheet");
      style.setAttribute('href', "" + i + ".css");
      document.head.appendChild(style);
    }
    return loadThen(['leisure', 'prim', 'pretty', 'replCore', 'browserRepl', 'std', 'notebook', 'jquery-1.7.2.min'], function() {
      var node, _j, _len2, _ref2, _results;
      Repl.init();
      _ref2 = document.querySelectorAll("[leisurecode]");
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        node = _ref2[_j];
        Notebook.bindNotebook(node);
        _results.push(Notebook.evalDoc(node));
      }
      return _results;
    });
  };

  loadThen = function loadThen(files, cont, index) {
    var script;
    index = index != null ? index : 0;
    if (index === files.length) {
      return cont();
    } else {
      script = document.createElement('script');
      script.setAttribute('src', "" + files[index] + ".js");
      script.addEventListener('load', function() {
        return loadThen(files, cont, index + 1);
      });
      return document.head.appendChild(script);
    }
  };

  evalDoc = function evalDoc() {
    var doc, _i, _len, _ref, _results;
    Repl.clearEnv();
    _ref = document.querySelectorAll(".leisure-notebook");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      doc = _ref[_i];
      _results.push(Notebook.evalDoc(doc));
    }
    return _results;
  };

  initBootEnv = function initBootEnv(iframe) {
    var k, keys, v, _ref;
    keys = "";
    _ref = iframe.contentWindow.Leisure;
    for (k in _ref) {
      v = _ref[k];
      Leisure[k] = v;
      keys = "" + keys + " " + k;
    }
    return alert("init: " + keys);
  };

  if (document.readyState === 'complete') {
    bootLeisure();
  } else {
    window.addEventListener('load', bootLeisure);
  }

  window.Leisure = Leisure;

  Leisure.bootLeisure = bootLeisure;

  Leisure.initBootEnv = initBootEnv;

}).call(this);
