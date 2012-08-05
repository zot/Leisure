
/*
Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/

/*
File structure in Google drive, just use local file system for autosave
Later, do offline mode with syncing
This lets people share files and get functionality sooner (I think)

LeisureStorage
   +- state.json
   +- Imports -- projects from other users
   |  +- ImportedProject1-Name -- this is a link to another user's shared Leisure project
   |  +- ImportedProejct2-Name
   +- Projects
      +- Project1-Name
      |  +- info.json -- list files that are imported: name -> original id -- most likely in an imported project
      |  +- main.lsr -- main file, which imports the others (order might be important?)
      |  +- file1.lsr
      |  +- file2.lsr
      |  +- import1.lsr -- listed in info.json
      |  +- import2.lsr -- listed in info.json
      |  +- ...
      +- Project2-Name
      |  +- ...
      +- ...
*/

(function() {
  var accessToken, authButtonDiv, checkDriveAuth, checkFileSystemAccess, continueWithAutoSaves, createAuthButton, fsError, handleAuthResult, listFiles, mimePart, root, start, tmpFalse, uploadTestFile;

  window.global = window;

  window.Storage = root = {};

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
      accessToken = authResult.access_token;
      return continueAuth();
    } else {
      createAuthButton();
      return console.log("Authentication failed");
    }
  };

  createAuthButton = function createAuthButton() {
    if (!authButtonDiv) {
      authButtonDiv = document.createElement('div');
      authButtonDiv.innerHTML = '<span>Leisure wants to create files and access them in your Google drive.  <button onclick="handleAuthClick()">Authorize</button> <button onclick="continueAuth()">Cancel</button></span>';
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

  /*
  Temporary file system, only, for autosave -- just store unsaved files and remove them when uploaded to storage
  See above for future plans
  
  LeisureAutoSave
     +- state.json
     +- Project1-name
     |  +- info.json
     |  +- file1.lsr
     |  +- ...
     +- Project2-name
     |  +- ...
     +- ...
  */

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

  start();

}).call(this);
