(function() {
  var accessToken, authButtonDiv, autosave, checkAutosave, checkDriveAuth, checkFileSystemAccess, continueWithAutoSaves, createAuthButton, deleteAutosave, fsError, handleAuthResult, itemKey, listFiles, mimePart, root, start, tmpFalse, uploadTestFile;

  window.global = window;

  window.Storage = root = {};

  itemKey = "Leisure/autosave" + document.location.pathname;

  checkAutosave = function checkAutosave(cont) {
    return cont(localStorage.getItem(itemKey));
  };

  deleteAutosave = function deleteAutosave() {
    return localStorage.removeItem(itemKey);
  };

  autosave = function autosave(value) {
    return localStorage.setItem(itemKey, value);
  };

  accessToken = root.accessToken = null;

  authButtonDiv = null;

  window.gapiClientLoaded = function gapiClientLoaded() {
    return window.setTimeout((function() {
      return checkDriveAuth(true);
    }), 1);
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
      return console.log("Authentication not allowed by security");
    }
  };

  handleAuthResult = function handleAuthResult(authResult) {
    var authorizeButton;
    authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
      console.log("Authenticated");
      accessToken = authResult.access_token;
      return continueAuth();
    } else {
      console.log("Not authenticated, yet -- creating button");
      return createAuthButton();
    }
  };

  createAuthButton = function createAuthButton() {
    if (!authButtonDiv) {
      authButtonDiv = document.createElement('div');
      authButtonDiv.innerHTML = '<span>Would you like to authorize Leisure to create files and access them in your Google drive?<button onclick="handleAuthClick()">Yes</button> <button onclick="continueAuth()">No</button></span>';
      return document.body.insertBefore(authButtonDiv, document.body.firstChild);
    }
  };

  window.continueAuth = function continueAuth() {
    if (authButtonDiv) {
      document.body.removeChild(authButtonDiv);
      authButtonDiv = null;
    }
    return checkFileSystemAccess(continueWithAutoSaves);
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
        'Authorization': 'Bearer ' + params.access_token
      },
      'body': [mimePart("END_OF_PART", "application/json", json), mimePart("END_OF_PART", "text/plain", "a\nb\n"), "\r\n--END_OF_PART--\r\n"].join('')
    }).execute(function(file) {
      return document.getElementById("result").innerHTML = "Uploaded file: " + file;
    });
  };

  mimePart = function mimePart(boundary, mimeType, content) {
    return ["\r\n--", boundary, "\r\n", "Content-Type: ", mimeType, "\r\n", "Content-Length: ", content.length, "\r\n", "\r\n", content].join('');
  };

  listFiles = function listFiles(cont) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open('GET', "https://www.googleapis.com/drive/v2/files?maxResults=10000&q=" + query);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.onreadystatechange = function onreadystatechange() {
      if (xhr.readyState === DONE) {
        return document.getElementById("files").innerHTML = "Files: " + xhr.responseText;
      }
    };
    return xhr.send();
  };

  tmpFalse = function tmpFalse(a) {
    return function(b) {
      return b();
    };
  };

  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  checkFileSystemAccess = function checkFileSystemAccess(cont) {
    console.log("check file system access, here.");
    return window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, (function(fileSystem) {
      return cont();
    }), fsError(cont));
  };

  fsError = function fsError(cont) {
    return function(e) {
      var msg;
      msg = '';
      switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
          msg = 'QUOTA_EXCEEDED_ERR';
          break;
        case FileError.NOT_FOUND_ERR:
          msg = 'NOT_FOUND_ERR';
          break;
        case FileError.SECURITY_ERR:
          msg = 'SECURITY_ERR';
          break;
        case FileError.INVALID_MODIFICATION_ERR:
          msg = 'INVALID_MODIFICATION_ERR';
          break;
        case FileError.INVALID_STATE_ERR:
          msg = 'INVALID_STATE_ERR';
          break;
        default:
          msg = 'Unknown Error';
      }
      alert("File system error: " + msg);
      return cont();
    };
  };

  continueWithAutoSaves = function continueWithAutoSaves() {
    return console.log("FILE SYSTEM READY");
  };

  start = function start() {
    var script;
    script = document.createElement('script');
    script.src = "https://apis.google.com/js/client.js?onload=gapiClientLoaded";
    return document.head.appendChild(script);
  };

  root.checkAutosave = checkAutosave;

  root.deleteAutosave = deleteAutosave;

  root.autosave = autosave;

  root.start = start;

}).call(this);
