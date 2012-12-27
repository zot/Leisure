(function() {
  var DONE, Notebook, Prim, addPath, auth, checkDriveAuth, computePaths, createAuthButton, finishAuth, handleAuthResult, id2File, id2Paths, initGdrive, initStorage, leisureDir, leisureDirParent, listFiles, makeLeisureDir, mimePart, mkdir, path2Ids, readFile, replaceAuth, root, setLeisureDir, updateFile, uploadTestFile, writeFile, _ref, _ref2, _ref3;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    root = (_ref = window.GdriveStorage) != null ? _ref : (window.GdriveStorage = {});
    Prim = (_ref2 = window.Prim) != null ? _ref2 : (window.Prim = {});
    Notebook = (_ref3 = window.Notebook) != null ? _ref3 : (window.Notebook = {});
    window.global = window;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    Prim = require('./prim');
  }

  if (!(typeof window !== "undefined" && window !== null)) {
    initStorage = function initStorage() {};
    return;
  }

  initStorage = function initStorage(callback) {
    Prim.newUriHandler('googledrive', {
      read: function read(uri, cont, err, next) {
        return initGdrive(function() {
          return listFiles("title = '" + (uri.path.substring(1)) + "'", function(json) {
            if ((json != null ? json.items.length : void 0) === 1) {
              return readFile(json.items[0], function(err, result) {
                if (err) {
                  return err(new Error("Error reading file " + uri + ": " + err.statusText));
                } else {
                  return cont(result);
                }
              });
            } else if ((json != null ? json.items.length : void 0) === 0) {
              return next();
            } else {
              return err(new Error("File not found: " + uri));
            }
          });
        });
      },
      write: function write(uri, data, cont, err) {
        return initGdrive(function() {
          return listFiles("title = '" + (uri.path.substring(1)) + "'", function(json) {
            if ((json != null ? json.items.length : void 0) === 1) {
              return updateFile(json.items[0], data, function(json) {
                if (json) {
                  return cont();
                } else {
                  return err(new Error("Problem writing file"));
                }
              });
            } else {
              return writeFile(uri.path.substring(1), data, [
                {
                  id: leisureDir.id
                }
              ], function(json) {
                if (json) {
                  return cont();
                } else {
                  return err(new Error("Problem writing file"));
                }
              });
            }
          });
        });
      }
    });
    return callback();
  };

  id2Paths = {};

  path2Ids = {};

  id2File = {};

  addPath = function addPath(id, path) {
    if (path2Ids[path]) {
      path2Ids[path].push(id);
    } else {
      path2Ids[path] = [id];
    }
    if (id2Paths[id]) {
      return id2Paths[id].push(path);
    } else {
      return id2Paths[id] = [path];
    }
  };

  computePaths = function computePaths(file) {
    var parent, parentPath, _i, _j, _len, _len2, _ref4, _ref5;
    if (id2Paths[file.id]) {
      return id2Paths[file.id];
    } else {
      id2File[file.id] = file;
      if (file.parents.length === 0) {
        addPath(file.id, "/" + file.title);
      } else {
        _ref4 = file.parents;
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          parent = _ref4[_i];
          if (parent.isRoot) {
            addPath(file.id, "/" + file.title);
          } else {
            _ref5 = computePaths(id2File[parent.id]);
            for (_j = 0, _len2 = _ref5.length; _j < _len2; _j++) {
              parentPath = _ref5[_j];
              addPath(file.id, "" + parentPath + "/" + file.title);
            }
          }
        }
      }
      return id2Paths[file.id];
    }
  };

  auth = {
    finished: false,
    succeeded: false,
    started: false,
    cont: [],
    err: null,
    status: null,
    token: null
  };

  initGdrive = function initGdrive(cont) {
    var script;
    if (auth.finished) {
      return cont();
    } else {
      auth.cont.push(function() {
        listFiles(function(json) {
          var item, key, names, _i, _j, _len, _len2, _ref4, _ref5;
          _ref4 = json.items;
          for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
            item = _ref4[_i];
            id2File[item.id] = item;
          }
          _ref5 = json.items;
          for (_j = 0, _len2 = _ref5.length; _j < _len2; _j++) {
            item = _ref5[_j];
            computePaths(item);
          }
          for (key in path2Ids) {
            names = key;
          }
          names.sort();
          return console.log("Names:", names);
        });
        return cont();
      });
      if (!auth.started) {
        auth.started = true;
        script = document.createElement('script');
        script.src = "https://apis.google.com/js/client.js?onload=gapiClientLoaded";
        return document.head.appendChild(script);
      }
    }
  };

  window.gapiClientLoaded = function gapiClientLoaded() {
    return window.setTimeout((function() {
      return checkDriveAuth(true);
    }), 100);
  };

  window.handleAuthClick = function handleAuthClick(event) {
    checkDriveAuth(false);
    return false;
  };

  checkDriveAuth = function checkDriveAuth(immediate) {
    console.log("AUTH");
    try {
      return gapi.auth.authorize({
        client_id: '270759921607',
        scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.readonly.metadata', 'https://www.googleapis.com/auth/drive.metadata.readonly'].join(' '),
        immediate: immediate
      }, handleAuthResult);
    } catch (err) {
      finishAuth({
        status: 'failed',
        err: err
      });
      return console.log("Authentication not allowed by security");
    }
  };

  handleAuthResult = function handleAuthResult(authResult) {
    var authorizeButton;
    authorizeButton = document.getElementById('authorize-button');
    if (!authResult) {
      console.log("Not authenticated, yet -- creating button");
      return createAuthButton();
    } else {
      if (authResult.error) {
        console.log("Authentication failed: " + authResult.error);
        return finishAuth({
          succeeded: false,
          err: authResult != null ? authResult.error : void 0
        });
      } else {
        console.log("Authenticated");
        return finishAuth({
          succeeded: true,
          token: authResult.access_token
        });
      }
    }
  };

  createAuthButton = function createAuthButton() {
    if (!auth.buttonDiv) {
      auth.buttonDiv = document.createElement('div');
      auth.buttonDiv.setAttribute('style', 'z-index: 1; position: absolute; left: 0; top: 0; width: 100%; height: 100%');
      auth.buttonDiv.innerHTML = '<span>Would you like to authorize Leisure to create files and access them in a LeisureStorage directory in your Google drive?  <button onclick="handleAuthClick()">Yes</button> <button onclick="denyAuth()">No</button></span>';
      return document.body.insertBefore(auth.buttonDiv, document.body.firstChild);
    }
  };

  window.denyAuth = function denyAuth() {
    return finishAuth({
      succeeded: false,
      err: 'User denied authorization'
    });
  };

  finishAuth = function finishAuth(obj) {
    if (!auth.finished) return replaceAuth(obj);
  };

  leisureDir = null;

  leisureDirParent = [];

  replaceAuth = function replaceAuth(obj) {
    var c, cont, _i, _len, _ref4, _results;
    if (auth.buttonDiv) document.body.removeChild(auth.buttonDiv);
    c = (_ref4 = auth.cont) != null ? _ref4 : [];
    auth = obj;
    auth.finished = true;
    if (auth.succeeded) {
      return listFiles("title = 'LeisureStorage'", function(json, files) {
        var cont, dir, file, _i, _j, _len, _len2, _ref5, _results;
        if (!json) {
          return auth = {
            succeeded: false,
            error: "Could not list files"
          };
        } else if (json.items.length === 0) {
          return makeLeisureDir(c);
        } else {
          dir = null;
          _ref5 = json.items;
          for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
            file = _ref5[_i];
            if (!file.explicitlyTrashed) {
              if (!dir) {
                dir = file;
                console.log(file);
              } else {
                auth.succeeded = false;
                ({
                  error: "More than one LeisureStorage folder"
                });
              }
            }
          }
          if (dir) {
            setLeisureDir(dir);
            _results = [];
            for (_j = 0, _len2 = c.length; _j < _len2; _j++) {
              cont = c[_j];
              _results.push(cont());
            }
            return _results;
          } else {
            return makeLeisureDir(c);
          }
        }
      });
    } else {
      _results = [];
      for (_i = 0, _len = c.length; _i < _len; _i++) {
        cont = c[_i];
        _results.push(cont(auth));
      }
      return _results;
    }
  };

  setLeisureDir = function setLeisureDir(dir) {
    leisureDir = dir;
    return leisureDirParent = {
      kind: dir.kind,
      id: dir.id,
      selfLink: dir.selfLink,
      parentLink: dir.parentLink,
      isRoot: dir.isRoot
    };
  };

  makeLeisureDir = function makeLeisureDir(conts) {
    console.log("No LeisureStorage directory.  Creating one");
    return mkdir('LeisureStorage', function(json, raw) {
      var cont, _i, _len, _results;
      setLeisureDir(json);
      console.log("CREATED DIR: " + raw, json);
      _results = [];
      for (_i = 0, _len = conts.length; _i < _len; _i++) {
        cont = conts[_i];
        _results.push(cont());
      }
      return _results;
    });
  };

  uploadTestFile = function uploadTestFile() {
    var json;
    json = JSON.stringify({
      mimeType: 'text/plain',
      title: 'leisureUpload'
    });
    return gapi.client.request({
      'path': '/upload/drive/v1/files',
      'method': 'POST',
      'params': {
        'uploadType': 'multipart'
      },
      'headers': {
        'Content-Type': 'multipart/mixed; boundary="END_OF_PART"',
        'Authorization': 'Bearer ' + auth.token
      },
      'body': [mimePart("END_OF_PART", "application/json", json), mimePart("END_OF_PART", "text/plain", "a\nb\n"), "\r\n--END_OF_PART--\r\n"].join('')
    }).execute(function(file) {
      return document.getElementById("result").innerHTML = "Uploaded file: " + file;
    });
  };

  mimePart = function mimePart(boundary, mimeType, content) {
    return ["\r\n--", boundary, "\r\n", "Content-Type: ", mimeType, "\r\n", "Content-Length: ", content.length, "\r\n", "\r\n", content].join('');
  };

  DONE = 4;

  readFile = function readFile(file, callback) {
    var xhr;
    if (file.downloadUrl) {
      console.log("File:", file);
      xhr = new XMLHttpRequest();
      xhr.open('GET', file.downloadUrl);
      xhr.setRequestHeader('Authorization', 'OAuth ' + auth.token);
      xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === DONE) {
          console.log("XHR", xhr);
          if (this.status === 200) {
            return callback(null, xhr.responseText);
          } else {
            return callback(xhr);
          }
        }
      };
      return xhr.send();
    } else {
      return callback(null);
    }
  };

  writeFile = function writeFile(name, contents, parents, callback) {
    var json;
    console.log("Parents:", parents);
    json = JSON.stringify({
      mimeType: 'text/plain',
      title: name,
      parents: parents != null ? parents : []
    });
    return gapi.client.request({
      'path': '/upload/drive/v2/files?uploadType=multipart',
      'method': 'POST',
      'headers': {
        'Content-Type': 'multipart/mixed; boundary="END_OF_PART"',
        'Authorization': 'Bearer ' + auth.token
      },
      'body': [mimePart("END_OF_PART", "application/json", json), mimePart("END_OF_PART", "text/plain", contents), "\r\n--END_OF_PART--\r\n"].join('')
    }).execute(callback);
  };

  updateFile = function updateFile(file, contents, callback) {
    return gapi.client.request({
      'path': "/upload/drive/v2/files/" + file.id + "?uploadType=multipart&alt=json",
      'method': 'PUT',
      'headers': {
        'Content-Type': 'multipart/mixed; boundary="END_OF_PART"',
        'Authorization': 'Bearer ' + auth.token
      },
      'body': [mimePart("END_OF_PART", "application/json", JSON.stringify(file)), mimePart("END_OF_PART", "text/plain", contents), "\r\n--END_OF_PART--\r\n"].join('')
    }).execute(callback);
  };

  listFiles = function listFiles(query, callback) {
    var q;
    if (!callback) {
      callback = query;
      q = '';
    } else {
      q = "&q=" + (encodeURIComponent(query));
    }
    return (gapi.client.request({
      path: "/drive/v2/files?maxResults=10000" + q,
      method: 'GET'
    })).execute(callback);
  };

  mkdir = function mkdir(name, callback) {
    return (gapi.client.request({
      path: '/drive/v2/files',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + auth.token
      },
      body: JSON.stringify({
        title: name,
        parents: [],
        mimeType: "application/vnd.google-apps.folder"
      })
    })).execute(callback);
  };

  root.initStorage = initStorage;

}).call(this);
