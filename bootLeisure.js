
/*
# put this in your browser and it boots the leisure envioronment
*/

(function() {
  var Boot, Leisure, addGDriveAuth, addHashResult, backupAutosave, bootFs, bootFsX, bootFuncs, bootLeisure, booted, callPrepCode, checkBackup, deleteAutosave, dirEntry, docs, evalDoc, fileSystem, finishBoot, fsSnapper, handleError, hashForDocs, initNotebookProperties, loadThen, nextNameNumber, prepTools, properties, propsEntry, readFile, restoreAutosave, showDialog, withDirHash, writeFile,
    __slice = Array.prototype.slice;

  Leisure = {};

  window.Boot = Boot = {};

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
    var body, i, pre, style, _i, _len, _ref;
    body = document.body;
    if ((body.getAttribute('leisurecode')) != null) {
      pre = document.createElement('pre');
      pre.setAttribute('leisurecode', '');
      pre.setAttribute('contentEditable', 'true');
      pre.innerHTML = body.innerHTML;
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      body.appendChild(pre);
      body.removeAttribute('leisurecode');
    }
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
    return loadThen(['parse', 'leisure', 'prim', 'replCore', 'browserRepl', 'prelude', 'std', 'parsing', 'notebook', 'jquery-1.7.2.min', 'jquery.indexeddb', 'storage'], function() {
      window.Leisure.restoreAutosave = restoreAutosave;
      window.Leisure.backupAutosave = backupAutosave;
      window.Leisure.deleteAutosave = deleteAutosave;
      Repl.init();
      return bootFs(function() {
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
    var node, nodes, _i, _len, _ref;
    nodes = [];
    _ref = document.querySelectorAll("[leisurecode]");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      nodes.push(node);
      node.setAttribute('contentEditable', 'true');
      Notebook.bindNotebook(node);
      Notebook.changeTheme(node, 'thin');
      Notebook.evalDoc(node);
    }
    checkBackup();
    while (bootFuncs.length) {
      bootFuncs.shift()();
    }
    addGDriveAuth();
    return booted = true;
  };

  prepTools = function prepTools() {
    var div;
    div = document.createElement('div');
    div.setAttribute('id', 'autoSaveDataDialog');
    div.setAttribute('class', 'jqmDialog');
    div.setAttribute('style', 'width: auto');
    div.innerHTML = "<div class='jqmdTL'><div class='jqmdTR'><div class='jqmdTC jqDrag'>Autosaved Data</div></div></div>\n<div class='jqmdBL'><div class='jqmdBR'><div class='jqmdBC' style=\"height: auto\"><div class='jqmdMSG'>\nThere is autosave data for this page that has not been saved in your document.<br>\n<div style=\"white-space: nowrap\"><button onclick='Leisure.restoreAutosave()'>Restore it</button> <button onclick='Leisure.backupAutosave()'>Do not restore it, but back it up</button> <button onclick='Leisure.deleteAutosave()'>Delete autosave data</button></div>\n</div></div></div></div>";
    document.body.appendChild(div);
    $('#autoSaveDataDialog').jqm({
      modal: true,
      overlay: 30,
      overlayClass: 'whiteOverlay'
    }).jqDrag('.jqDrag');
    return $('input.jqmdX').hover((function() {
      return $(this).addClass('jqmdXFocus');
    }), (function() {
      return $(this).removeClass('jqmdXFocus');
    })).focus(function() {
      this.hideFocus = true;
      return $(this).addClass('jqmdXFocus');
    }).blur(function() {
      return $(this).removeClass('jqmdXFocus');
    });
  };

  restoreAutosave = function restoreAutosave() {
    var d;
    d = $('#autoSaveDataDialog');
    window.leisureDocVersion = d.v;
    return alert('restoring...');
  };

  backupAutosave = function backupAutosave() {
    var d;
    d = $('#autoSaveDataDialog');
    window.leisureDocVersion = d.curV;
    return alert('backing up...');
  };

  deleteAutosave = function deleteAutosave() {
    var d;
    d = $('#autoSaveDataDialog');
    window.leisureDocVersion = d.curV;
    return alert('deleting...');
  };

  showDialog = function showDialog(curV, v) {
    var d;
    d = $('#autoSaveDataDialog');
    d.curV = curV;
    d.v = v;
    return d.jqmShow();
  };

  loadThen = function loadThen(files, cont, index) {
    var script;
    index = index != null ? index : 0;
    if (index === files.length) {
      return typeof cont === "function" ? cont() : void 0;
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

  addGDriveAuth = function addGDriveAuth() {
    return document.body.insertBefore(Notebook.createNode("<div><a href=\"javascript:poptastic('https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file&client_id=270759921607.apps.googleusercontent.com&redirect_uri=https://leisurestorage.appspot.com&response_type=token');\">Authorize Leisure Storage</a> <a href=\"javascript:killAuthFrag()\">Cancel</a><br></div>"), document.body.firstChild);
  };

  window.poptastic = function poptastic(url) {
    return Storage.start();
  };

  window.killAuthFrag = function killAuthFrag() {
    return document.body.removeChild(document.body.firstChild);
  };

  fileSystem = null;

  propsEntry = null;

  dirEntry = null;

  nextNameNumber = 1;

  properties = {};

  bootFs = function bootFs(cont) {
    return cont();
  };

  bootFsX = function bootFsX(cont) {
    Notebook.setSnapper(fsSnapper);
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
    return window.webkitStorageInfo.requestQuota(PERSISTENT, 1024 * 1024, (function(grantedBytes) {
      return window.requestFileSystem(PERSISTENT, grantedBytes, (function(fs) {
        fileSystem = fs;
        return initNotebookProperties(fs, cont);
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

  initNotebookProperties = function initNotebookProperties(fs, cont) {
    var pageName;
    pageName = document.location.pathname.substring(1).replace(/_/g, '__').replace(/\//g, '_').replace(/\.html?$/i, '');
    return fs.root.getFile("" + pageName + ".properties", {
      create: true
    }, (function(fileEntry) {
      return fileEntry.getMetadata((function(m) {
        var dir;
        dir = "" + pageName + ".dir";
        return fs.root.getDirectory(dir, {
          create: true
        }, (function(dentry) {
          propsEntry = fileEntry;
          dirEntry = dentry;
          if (m.size) {
            return readFile(fileEntry, function(contents) {
              var docV;
              properties = JSON.parse(contents);
              docV = Number((document.body.getAttribute('leisureDocVersion')) || 0);
              return cont();
            });
          } else {
            properties.version = 0;
            writeFile(fileEntry, JSON.stringify(properties));
            return cont();
          }
        }), handleError("Couldn't get directory: " + leisureDir));
      }), handleError("Couldn't get information about '" + fileEntry.name + "'"));
    }), handleError("Couldn't get file, '" + pageName + ".properties'"));
  };

  checkBackup = function checkBackup() {};

  readFile = function readFile(fileEntry, success) {
    return fileEntry.file((function(file) {
      var reader;
      reader = new FileReader();
      reader.onloadend = function onloadend(e) {
        return success(this.result);
      };
      return reader.readAsText(file);
    }), handleError("Couldn't read file: '" + fileEntry.name + "'"));
  };

  writeFile = function writeFile(fileEntry, data) {
    return fileEntry.createWriter((function(fileWriter) {
      var bb;
      fileWriter.onwriteend = function onwriteend(e) {};
      fileWriter.onerror = function onerror(e) {
        return handleError("Write failed for file: '" + fileEntry.name + "'");
      };
      bb = new BlobBuilder();
      bb.append(data);
      return fileWriter.write(bb.getBlob('text/plain'));
    }), handleError("Couldn't create writer for file: '" + fileEntry.name + "'"));
  };

  docs = {};

  withDirHash = function withDirHash(cont) {
    var allEntries, pgm, re, readFiles, reader;
    pgm = '';
    allEntries = [];
    reader = dirEntry.createReader();
    readFiles = function readFiles(entries, index) {
      if (index) {
        return readFile(entries[index - 1], function(contents) {
          return pgm += JSON.stringify(entries[index - 1].name) + JSON.stringify(contents);
        });
      } else {
        return cont(Sha256.hash(pgm));
      }
    };
    re = function re() {
      return reader.readEntries((function(results) {
        if (results.length) {
          allEntries.push.apply(allEntries, results);
          return re();
        } else {
          return readFiles(allEntries.sort(), allEntries.length);
        }
      }), handleError("Couldn't read directory: " + dirEntry.name));
    };
    return re();
  };

  addHashResult = function addHashResult(results, index, cont) {
    if (index) return readFile;
  };

  hashForDocs = function hashForDocs() {
    var k, keys, pgm, v, _i, _len, _ref;
    pgm = '';
    keys = [];
    for (v in docs) {
      k = docs[v];
      keys.push(k);
    }
    _ref = keys.sort;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      pgm += (JSON.stringify(k)) + (JSON.stringify(docsObj[k]));
    }
    return Sha256.hash(pgm);
  };

  fsSnapper = function fsSnapper(el, pgm) {
    var elementName;
    if (dirEntry != null) {
      makeDirty();
      elementName = el.getAttribute('leisurecode');
      if (!elementName) {
        elementName = "doc" + (nextNameNumber++);
        el.setAttribute('leisurecode', elementName);
      }
      return dirEntry.getFile("" + elementName + ".lsr", {
        create: true
      }, (function(fileEntry) {
        docs[fileEntry.name] = pgm;
        return writeFile(fileEntry, pgm);
      }), handleError("Couldn't create file '" + dirEntry.name + "/" + elementName + ".lsr'"));
    }
  };

  window.Leisure = Leisure;

  Leisure.bootLeisure = bootLeisure;

  window.showAutosaveDialog = showDialog;

  Boot.loadThen = loadThen;

}).call(this);
