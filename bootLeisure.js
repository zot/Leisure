(function(){
var Boot = window.Boot = {};
Boot.cssFiles = [
'leisure.css?uniq=e8741a717ac1da869b3e48964e690a008731b8f57263548b26c5b7bba7cd096b',
'gaudy.css?uniq=796fa1a0574ff3a003ac41e9d535bfb49c139ec5fa92b4968c564486c23db053',
'thin.css?uniq=d9188fcfbfdc4d49c1c96076643fce9e674b71b79e8df3df68b4dc1d3d8c6157',
'cthulhu.css?uniq=93c6d977d9f0717236f7471ec785f00a6c1573f857ef6d751231bc4ceb2e87b9',
];
Boot.jsFiles = [
'marked.js?uniq=db867e217aee121a175b22c5f92bc1caa97b3af2e29d477610f6e2578cfb09a5',
'xus.js?uniq=f5a86b6d933d2e314ace756dcfabbd1e654501583475463e4405a6333c183163',
'storage.js?uniq=4872b77b3ee0cb9eeac1e5db2e3e8d0ba31f099d60fc22d9879c2cc48b486967',
'parse.js?uniq=cb4b09ec5eec735beafa49b93f5d566eb48b6c738a8dcdc85f86403fe7f8c47f',
'leisure.js?uniq=405def00a5d4684789297c6980e5d6adaff11a8c682bda11036fc466e322ed81',
'prim.js?uniq=fc3275b5915d947f56e38a43f7f52c72e22633ff0eb2a80d48c098280aa2cf6e',
'replCore.js?uniq=a4bf0cb26e50caed55dd549911599bccc68ecc1f6a5913bf0a1b1040c7aadec6',
'browserRepl.js?uniq=0fe6b9536ebfa9b281cbab473db7ea8457c426010d800f10ae4973710748a47d',
'std.js?uniq=2b40be030f04bc6fc728ca98aa799dda2ca625b99e105e15743cdf8a0b6c01cf',
'notebook.js?uniq=1766ffeeb08519b470ec7b16413e68019f9ce77d809313fb92c4559244fe66c9',
'jquery-1.7.2.min.js?uniq=47b68dce8cb6805ad5b3ea4d27af92a241f4e29a5c12a274c852e4346a0500b4',
'jquery-ui/js/jquery-ui-1.9.1.custom.min.js?uniq=cc52b1018b4f30cbd60d5fb8365a16a90ba8e5c30e176375a77a628eb96fb21c',
'md.js?uniq=7733aae5e958d52f06e01666bb987e5547d1d3903d8500f335a48966ec8aec2f',
'maps.js?uniq=d370dea9cd2b51042686dff3e0504e819660839551110d990ee7ebdd6b14537f',
'svg.js?uniq=7f7dd70389981f109414ee5dece31193b71ff57b51395dd2e092f05f28cd4ddc',
'parseAst.js?uniq=ff8398fea99d70ce979e8c97271f6abefb0ba4e75fb9e6f169d0eae2ebbc0582',
];
})();

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
    _ref3 = Boot.cssFiles;
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      i = _ref3[_i];
      style = document.createElement('link');
      style.setAttribute('type', "text/css");
      style.setAttribute('rel', "stylesheet");
      style.setAttribute('href', i);
      document.head.appendChild(style);
    }
    return loadThen(Boot.jsFiles, true, function() {
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
