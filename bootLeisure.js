
/*
# put this in your browser and it boots the leisure envioronment
*/

(function() {
  var Leisure, bootFs, bootLeisure, evalDoc, handleError, initNotebookProperties, loadThen,
    __slice = Array.prototype.slice;

  Leisure = {};

  bootLeisure = function bootLeisure() {
    var body, i, style, _i, _len, _ref;
    body = document.body;
    window.removeEventListener('load', bootLeisure);
    _ref = ['leisure', 'gaudy', 'thin', 'cthulhu'];
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
      bootFs();
      _ref2 = document.querySelectorAll("[leisurecode]");
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        node = _ref2[_j];
        node.setAttribute('contentEditable', 'true');
        Notebook.bindNotebook(node);
        Notebook.changeTheme(node, 'thin');
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

  if (document.readyState === 'complete') {
    bootLeisure();
  } else {
    window.addEventListener('load', bootLeisure);
  }

  bootFs = function bootFs() {
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    return window.webkitStorageInfo.requestQuota(PERSISTENT, 1024 * 1024, (function(grantedBytes) {
      return window.requestFileSystem(PERSISTENT, grantedBytes, (function(fs) {
        window.leisureFileSystem = fs;
        return initNotebookProperties(fs);
      }), handleError("Couldn't request file system"));
    }), handleError("Couldn't get quota"));
  };

  handleError = function handleError() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return function(e) {
      return console.log.apply(console, ['Error: '].concat(__slice.call(args), [e]));
    };
  };

  initNotebookProperties = function initNotebookProperties(fs) {
    var pageName;
    pageName = document.location.pathname.substring(1).replace(/_/g, '__').replace(/\//g, '_').replace(/\.html?$/i, '');
    return fs.root.getFile("" + pageName + ".properties", {
      create: true,
      exclusive: true
    }, (function(fileEntry) {
      return console.log("Got file, '" + pageName + ".properties'");
    }), handleError("Couldn't get file, '" + pageName + ".properties'"));
  };

  window.Leisure = Leisure;

  Leisure.bootLeisure = bootLeisure;

}).call(this);
