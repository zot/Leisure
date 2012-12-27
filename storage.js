(function() {
  var DONE, Notebook, Prim, auth, checkDriveAuth, createAuthButton, finishAuth, handleAuthResult, initGdrive, initStorage, listFiles, listFilesTMP, mimePart, mkdir, replaceAuth, root, uploadTestFile, _ref, _ref2, _ref3;

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
        return initGdrive(function() {});
      },
      write: function write(uri, data, cont, err) {
        return initGdrive(function() {});
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

  replaceAuth = function replaceAuth(obj) {
    var c, cont, _i, _len, _ref4, _results;
    if (auth.buttonDiv) document.body.removeChild(auth.buttonDiv);
    c = (_ref4 = auth.cont) != null ? _ref4 : [];
    auth = obj;
    auth.finished = true;
    if (auth.succeeded) {
      return listFiles("title = 'LeisureStorage'", function(json, files) {
        var cont, _i, _len, _results;
        if (!json) {
          console.log("NO DIR FOUND -- CREATNG ONE");
          return mkdir('LeisureStorage', function(json, raw) {
            var cont, _i, _len, _results;
            console.log("CREATED DIR: " + raw);
            _results = [];
            for (_i = 0, _len = c.length; _i < _len; _i++) {
              cont = c[_i];
              _results.push(cont());
            }
            return _results;
          });
        } else {
          console.log("FILES: " + files);
          _results = [];
          for (_i = 0, _len = c.length; _i < _len; _i++) {
            cont = c[_i];
            _results.push(cont());
          }
          return _results;
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

  uploadTestFile = function uploadTestFile() {
    var json, xhr;
    json = JSON.stringify({
      mimeType: 'text/plain',
      title: 'leisureUpload'
    });
    xhr = new XMLHttpRequest();
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

  DONE = 2;

  listFilesTMP = function listFilesTMP(query, cont) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open('GET', "https://www.googleapis.com/drive/v2/files?maxResults=10000&q=" + (encodeURIComponent(query)));
    xhr.setRequestHeader('Authorization', 'Bearer ' + auth.token);
    xhr.onreadystatechange = function onreadystatechange() {
      if (xhr.readyState === DONE) {
        if (xhr.responseText) {
          return cont(null, JSON.parse(xhr.responseText));
        } else {
          return cont(xhr, null);
        }
      }
    };
    return xhr.send();
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
