(function(){
var Boot = window.Boot = {};
Boot.cssFiles = ['leisureFiles-afbf3bb01971780c25a61d3b8a1eb04e68fa2fc27bda9cb41251a0acf021a843.css'];
Boot.jsFiles = ['leisureFiles-b5a6c635ececea42a7b378974f24dbcd001a72afca26abcf05e3b9d01568b5e2.js'];
})();

/*
# put this in your browser and it boots the leisure envioronment
*/

(function() {
  var Boot, Leisure, addLoadToDocument, bootFuncs, bootLeisure, bootLeisureCont, booted, callPrepCode, finishBoot, handleError, loadThen, uniquify, _ref, _ref2,
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
    return loadThen([uniquify("uri.js")], function() {
      var load, params, state, uri, _ref3, _ref4;
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
        console.log("FRAG PARAMS: " + (JSON.stringify(uri.getFragParams())));
        _ref4 = uri.getFragParams(), load = _ref4.load, state = _ref4.state;
        if (state) {
          document.querySelector('[maindoc]').innerHTML = "<h1>LOADING Google Drive file... </h1>";
        } else if (load) {
          document.querySelector('[maindoc]').innerHTML = "<h1>LOADING " + load + "... </h1>";
        }
        Boot.documentFragment = document.location.hash;
        document.location.hash = '';
        return bootLeisureCont(load, state);
      }
    });
  };

  uniquify = function uniquify(str) {
    return "" + str + "?uniq=" + (new Date().getTime());
  };

  bootLeisureCont = function bootLeisureCont(load, state) {
    var body, f, i, pre, style, _i, _len, _ref3;
    window.removeEventListener('load', bootLeisure);
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
    _ref3 = Boot.cssFiles;
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      i = _ref3[_i];
      style = document.createElement('link');
      style.setAttribute('type', "text/css");
      style.setAttribute('rel', "stylesheet");
      style.setAttribute('href', i);
      document.head.appendChild(style);
    }
    f = state ? function(cont) {
      return window.GdriveStorage.openFromGdrive(cont);
    } : load ? function(cont) {
      addLoadToDocument(load);
      load = new URI(load);
      console.log("LOADING " + load);
      return Prim.read(load, (function(data) {
        Notebook.replaceContents(load, data);
        return cont();
      }), function(err) {
        return $('[maindoc]').innerHTML = "<h1>ERROR LOADING " + load + ": " + err + "</h1>";
      });
    } : function(cont) {
      Notebook.replaceContents();
      return cont();
    };
    return loadThen(Boot.jsFiles, function() {
      window.GdriveStorage.initStorage();
      Repl.init();
      Notebook.bootNotebook();
      return f(function() {
        if (typeof window.leisureFirst === "function") window.leisureFirst();
        if (window.leisurePrep != null) {
          return callPrepCode(window.leisurePrep, 0, finishBoot);
        } else {
          return finishBoot();
        }
      });
    });
  };

  addLoadToDocument = function addLoadToDocument(uri) {
    uri = new URI(document.location.href);
    uri.fragment = "#load=" + load;
    return document.location.href = uri.toString();
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
    console.log("Finished initializing storage");
    if (window.leisureBoot != null) bootFuncs.push(window.leisureBoot);
    while (bootFuncs.length) {
      bootFuncs.shift()();
    }
    return booted = true;
  };

  loadThen = function loadThen(files, cont, index) {
    var err, script;
    index = index != null ? index : 0;
    if (index === files.length) {
      return typeof cont === "function" ? cont() : void 0;
    } else {
      if (!files[index]) {
        err = new Error("NO FILE AT INDEX " + index + " in " + (JSON.stringify(files)));
        console.log(err.stack);
        throw err;
      }
      script = document.createElement('script');
      script.setAttribute('src', files[index]);
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

  Boot.addLoadToDocument = addLoadToDocument;

}).call(this);
