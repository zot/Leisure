
/*
# put this in your browser and it boots the leisure envioronment
*/

(function() {
  var Boot, Leisure, bootFuncs, bootLeisure, bootLeisureCont, booted, callPrepCode, finishBoot, handleError, loadThen, uniquify, _ref, _ref2,
    __slice = Array.prototype.slice;

  Leisure = (_ref = window.Leisure) != null ? _ref : (window.Leisure = {});

  Boot = (_ref2 = window.Boot) != null ? _ref2 : (window.Boot = {});

  booted = false;

  bootFuncs = [];

  Boot.onboot = function onboot(cont) {
    if (booted) {
      return cont();
    } else {
      return bootFuncs.push(cont);
    }
  };

  bootLeisure = function bootLeisure() {
    return loadThen(['uri'], function() {
      var params, state, uri, _ref3;
      uri = new window.URI(document.location.href);
      params = uri.getSearchParams();
      if (params.state) {
        uri.fragment = (uri.fragment ? uri.fragment + '&' : '#') + uri.search.substring(1);
        uri.search = null;
        return document.location.href = uri.toString();
      } else if (!params.uniq) {
        uri.search = "" + ((_ref3 = uri.search) != null ? _ref3 : '') + (uri.search ? '&' : '?') + "uniq=" + (Math.random());
        return document.location.href = uri.toString();
      } else {
        state = uri.getFragParams().state;
        if (state) {
          document.querySelector('[maindoc]').innerHTML = "<h1>LOADING Google Drive file... </h1>";
        }
        Boot.documentFragment = document.location.hash;
        document.location.hash = '';
        return bootLeisureCont();
      }
    });
  };

  uniquify = function uniquify(str) {
    return "" + str + "?uniq=" + (new Date().getTime());
  };

  bootLeisureCont = function bootLeisureCont() {
    var body, i, pre, style, _i, _len, _ref3;
    body = document.body;
    if ('code' === body.getAttribute('leisureNode')) {
      pre = document.createElement('pre');
      pre.setAttribute('leisureNode', 'code');
      pre.setAttribute('contentEditable', 'true');
      pre.innerHTML = body.innerHTML;
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      body.appendChild(pre);
      body.removeAttribute('leisureNode');
    }
    window.removeEventListener('load', bootLeisure);
    _ref3 = ['leisure', 'gaudy', 'thin', 'cthulhu'];
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      i = _ref3[_i];
      style = document.createElement('link');
      style.setAttribute('type', "text/css");
      style.setAttribute('rel', "stylesheet");
      style.setAttribute('href', uniquify("" + i + ".css"));
      document.head.appendChild(style);
    }
    return loadThen(['marked', 'xus', 'storage', 'parse', 'leisure', 'prim', 'replCore', 'browserRepl', 'std', 'notebook', 'jquery-1.7.2.min', 'jquery-ui/js/jquery-ui-1.9.1.custom.min', 'md', 'maps', 'svg', 'parseAst'], function() {
      return window.GdriveStorage.initStorage(function() {
        if (typeof window.leisureFirst === "function") window.leisureFirst();
        Repl.init();
        Notebook.bootNotebook();
        if (window.leisurePrep != null) {
          return callPrepCode(window.leisurePrep, 0, finishBoot);
        } else {
          return finishBoot();
        }
      });
    });
  };

  callPrepCode = function callPrepCode(preps, index, finishBoot) {
    if (index < preps.length) {
      return ReplCore.processLine(preps[index], Prim.defaultEnv, 'Parse.', function() {
        return callPrepCode(preps, index + 1, finishBoot);
      });
    } else {
      return finishBoot();
    }
  };

  finishBoot = function finishBoot() {
    var node, _i, _len, _ref3;
    console.log("Finished initializing storage");
    _ref3 = document.querySelectorAll("[leisurenode='code']");
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      node = _ref3[_i];
      node.setAttribute('contentEditable', 'true');
      Notebook.bindNotebook(node);
      Notebook.changeTheme(node, 'thin');
      Notebook.evalDoc(node);
    }
    if (window.leisureBoot != null) bootFuncs.push(window.leisureBoot);
    while (bootFuncs.length) {
      bootFuncs.shift()();
    }
    return booted = true;
  };

  loadThen = function loadThen(files, nosuffix, cont, index) {
    var script;
    if (typeof nosuffix === 'function') {
      index = cont;
      cont = nosuffix;
      nosuffix = false;
    }
    index = index != null ? index : 0;
    if (index === files.length) {
      return typeof cont === "function" ? cont() : void 0;
    } else {
      script = document.createElement('script');
      script.setAttribute('src', (nosuffix ? files[index] : uniquify("" + files[index] + ".js")));
      script.addEventListener('load', function() {
        return loadThen(files, cont, index + 1);
      });
      return document.head.appendChild(script);
    }
  };

  if (document.readyState === 'complete') {
    bootLeisure();
  } else {
    window.addEventListener('load', bootLeisure);
  }

  handleError = function handleError() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return function(e) {
      return console.log.apply(console, ['Error: '].concat(__slice.call(args), [e]));
    };
  };

  window.Leisure = Leisure;

  Leisure.bootLeisure = bootLeisure;

  Boot.loadThen = loadThen;

}).call(this);
