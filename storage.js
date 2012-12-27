(function() {
  var Notebook, Prim, auth, checkDriveAuth, createAuthButton, finishAuth, handleAuthResult, initGdrive, initStorage, leisureDir, listFiles, makeLeisureDir, mimePart, mkdir, readFile, replaceAuth, root, uploadTestFile, writeFile, _ref, _ref2, _ref3;

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
              return readFile(json.items[0], function(result) {
                if (result) {
                  return cont();
                } else {
                  return err(new Error("File not found"));
                }
              });
            } else {
              return err(new Error("File not found"));
            }
          });
        });
      },
      write: function write(uri, data, cont, err) {
        return initGdrive(function() {
          return writeFile(uri.path.substring(1), data, [leisureDir.id], function(json) {
            if (json) {
              return cont();
            } else {
              return err(new Error("Problem writing file"));
            }
          });
        });
      }
    });
    return callback();
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
      auth.cont.push(cont);
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

  replaceAuth = function replaceAuth(obj) {
    var c, cont, _i, _len, _ref4, _results;
    if (auth.buttonDiv) document.body.removeChild(auth.buttonDiv);
    c = (_ref4 = auth.cont) != null ? _ref4 : [];
    auth = obj;
    auth.finished = true;
    if (auth.succeeded) {
      return listFiles("title = 'LeisureStorage'", function(json, files) {
        var cont, file, _i, _j, _len, _len2, _ref5, _results;
        if (!json) {
          return auth = {
            succeeded: false,
            error: "Could not list files"
          };
        } else if (json.items.length === 0) {
          return makeLeisureDir(c);
        } else {
          leisureDir = null;
          _ref5 = json.items;
          for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
            file = _ref5[_i];
            if (!file.explicitlyTrashed) {
              if (!leisureDir) {
                leisureDir = file;
                console.log(file);
              } else {
                auth.succeeded = false;
                ({
                  error: "More than one LeisureStorage folder"
                });
              }
            }
          }
          if (leisureDir) {
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

  makeLeisureDir = function makeLeisureDir(conts) {
    console.log("No LeisureStorage directory.  Creating one");
    return mkdir('LeisureStorage', function(json, raw) {
      var cont, _i, _len, _results;
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

  readFile = function readFile(file, callback) {
    if (file.downloadUrl) {
      return (gapi.client.request({
        path: file.downloadUrl,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + auth.token
        }
      })).execute(callback);
    } else {
      return callback(null);
    }
  };

  writeFile = function writeFile(name, contents, parents, callback) {
    var json;
    json = JSON.stringify({
      mimeType: 'text/plain',
      title: name
    });
    if (parents) json.parents = parents;
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

  listFiles = function listFiles(query, callback) {
    return (gapi.client.request({
      path: "/drive/v2/files?maxResults=10000&q=" + (encodeURIComponent(query)),
      method: 'GET'
    })).execute(callback);
  };

  mkdir = function mkdir(name, callback) {
    return (gapi.client.request({
      path: '/drive/v2/files',
      method: 'POST',
      body: JSON.stringify({
        title: name,
        parents: [],
        mimeType: "application/vnd.google-apps.folder"
      })
    })).execute(callback);
  };

  root.initStorage = initStorage;

}).call(this);
