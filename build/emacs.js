// Generated by CoffeeScript 2.4.1
(function() {
  // Emacs connection
  'use strict';
  define(['lodash', './ui', './editor', './editorSupport', './diag', './eval', './advice'], function(_, UI, Editor, EditorSupport, Diag, Eval, Advice) {
    var basicDataFilter, blockRangeFor, changeAdvice, clearDiag, close, computeNewStructure, configureEmacs, configureOpts, connect, connected, diag, diagMessage, error, escapeAttr, escapeString, fetchImage, fileCount, fileTypes, getDocumentParams, imgCount, knownLanguages, localResources, makeBlobUrl, message, messages, msgPat, open, preserveSelection, pushPendingInitialzation, receiveFile, replace, replaceImage, replaceMsgPat, replaceWhile, sendCcCc, sendConcurrentBlockChange, sendFollowLink, sendGetFile, sendReplace, shouldSendConcurrent, showDiag, showMessage, typeForFile, unescapeString;
    ({preserveSelection, computeNewStructure} = Editor);
    ({changeAdvice} = Advice);
    ({showMessage, pushPendingInitialzation, escapeAttr, localResources} = UI);
    ({getDocumentParams, basicDataFilter, fileTypes, makeBlobUrl} = EditorSupport);
    ({clearDiag, diagMessage} = Diag);
    ({knownLanguages, escapeString, unescapeString} = Eval);
    msgPat = /^([^ ]+)( (.*))?$/;
    replaceMsgPat = /^([^ ]+) ([^ ]+) ([^ ]+) (.*)$/;
    connected = false;
    showDiag = false;
    //showDiag = true
    imgCount = 0;
    fileCount = 0;
    diag = function(...msg) {
      if (showDiag) {
        return console.log(...msg);
      }
    };
    messages = {
      r: function(data, msg, frame) {
        return replace(data, msg);
      },
      reload: function() {
        return document.location.href = document.location.href;
      },
      activate: function() {
        window.open("javascript:close()");
        return window.focus();
      },
      file: function(data, msg, frame) {
        return receiveFile(data, msg);
      }
    };
    replace = function(data, msg) {
      var context, count, editor, end, ignore, start, text;
      diag(`Received ${msg}`);
      [ignore, count, start, end, text] = msg.match(replaceMsgPat);
      start = Number(start);
      end = Number(end);
      text = JSON.parse(text);
      editor = data.emacsConnection.opts.editor;
      context = {
        start,
        end,
        text,
        source: 'emacs'
      };
      return replaceWhile(start, end, text, data, function(repl) {
        var targetLen;
        if (end === -1) {
          context.start = 0;
          context.end = data.getLength();
          return editor.options.load('emacs', text, context);
        } else {
          targetLen = data.getDocLength() - (end - start) + text.length;
          return editor.options.replaceText(context);
        }
      });
    };
    receiveFile = function(data, msg) {
      var base, id, lead;
      [lead, id] = msg.match(/^([^ ]+) +/);
      if (typeof (base = data.emacsConnection.fileCallbacks)[id] === "function") {
        base[id](msg.substring(lead.length));
      }
      return delete data.emacsConnection.fileCallbacks[id];
    };
    replaceWhile = function(start, end, text, data, func) {
      var blocks, newText, repl;
      if (end === -1) {
        blocks = [];
        newText = text;
      } else {
        ({blocks, newText} = data.blockOverlapsForReplacement(start, end, text));
      }
      repl = computeNewStructure(data, blocks, newText);
      repl.changeId = `emacs-${data.emacsConnection.changeCount++}`;
      repl.emacsNewBlocks = repl.newBlocks.slice();
      repl.blockOffset = blocks.length ? data.offsetForBlock(blocks[0]) : 0;
      data.emacsConnection.replacing = repl;
      data.emacsConnection.opts.mergeChangeContext({
        fromEmacs: repl.changeId
      });
      data.emacsConnection.pendingChanges[repl.changeId] = repl;
      try {
        return func(repl);
      } finally {
        data.emacsConnection.replacing = null;
      }
    };
    shouldSendConcurrent = function(data, newBlock) {
      var currentBlock, repl;
      if (newBlock) {
        repl = data.emacsConnection.replacing;
        currentBlock = _.find(repl.newBlocks, function(b) {
          return b._id === newBlock._id;
        });
        return currentBlock && currentBlock.text !== newBlock.text;
      }
    };
    sendConcurrentBlockChange = function(data, newBlock) {
      var currentNew, ind, offset, oldLen, repl, start;
      repl = data.emacsConnection.replacing;
      ind = _.findIndex(repl.newBlocks, function(x) {
        return x._id = newBlock;
      });
      currentNew = repl.emacsNewBlocks[ind];
      if (currentNew.text !== newBlock.text) {
        offset = 0;
        oldLen = currentNew.text.length;
        repl.emacsNewBlocks[ind] = newBlock;
        while (ind-- > 0) {
          offset += repl.emacsNewBlocks[ind];
        }
        start = offset + repl.blockOffset;
        return sendReplace(data.emacsConnection.websocket, start, start + oldLen, newBlock.text);
      }
    };
    connect = function(opts, host, port, cookie, cont) {
      var con;
      con = new WebSocket(`ws://${host}:${port}`);
      con.onopen = function(evt) {
        return open(evt, con, opts, port, cookie, cont);
      };
      con.onclose = function(evt) {
        return close(evt, opts.data);
      };
      con.onmessage = function(evt) {
        return message(evt, opts.data);
      };
      return con.onerror = function(evt) {
        return showMessage(opts.editor.node, "Connection error", "Could not open connection to emacs", {
          position: {
            my: 'center top',
            at: 'center top'
          },
          buttons: {
            OK: function() {
              return $(this).dialog('close');
            }
          }
        });
      };
    };
    configureOpts = function(opts) {
      var data, editor;
      data = opts.data;
      if (!data.emacsConnection.websocket) {
        return;
      }
      editor = opts.editor;
      changeAdvice(opts, true, {
        followLink: {
          emacs: function(parent) {
            return function(e) {
              if (e.target.href.match(/^elisp/)) {
                sendFollowLink(data.emacsConnection.websocket, editor.docOffset($(e.target).prev('.link')[0], 1));
                return false;
              } else {
                return parent(e);
              }
            };
          }
        },
        execute: {
          emacs: function(parent) {
            return function() {
              var ref;
              if (((ref = editor.blockForCaret()) != null ? ref.language.toLowerCase() : void 0) in knownLanguages) {
                return parent();
              } else {
                return sendCcCc(data.emacsConnection.websocket, editor.docOffset(editor.domCursorForCaret()));
              }
            };
          }
        }
      });
      return changeAdvice(editor, true, {
        activateScripts: {
          emacs: function(parent) {
            return function(el, context, data, block) {
              var i, img, len, name, ref, ref1, ref2, ret, src;
              ret = parent(el, context, data, block);
              ref = $(el).find('img');
              for (i = 0, len = ref.length; i < len; i++) {
                img = ref[i];
                src = img.getAttribute('src');
                if (!src.match('^.*:.*')) {
                  name = (ref1 = src.match(/([^#?]*)([#?].*)?$/)) != null ? ref1[1] : void 0;
                  src = `file:${src}`;
                } else {
                  name = (ref2 = src.match(/^file:([^#?]*)([#?].*)?$/)) != null ? ref2[1] : void 0;
                }
                if (name) {
                  if (!img.id) {
                    img.id = `emacs-image-${imgCount++}`;
                  }
                  img.src = '';
                  fetchImage(opts.data.emacsConnection, img.id, src);
                }
              }
              return ret;
            };
          }
        }
      });
    };
    fetchImage = function(con, imgId, src) {
      var data, img;
      if (con && (img = $(`#${imgId}`)[0])) {
        if (data = localResources[src]) {
          if (data instanceof Promise) {
            return data.then(function(data) {
              return replaceImage(con, img, src, data);
            });
          } else {
            return preserveSelection(function(range) {
              return replaceImage(con, img, src, data);
            });
          }
        } else {
          return localResources[src] = new Promise(function(resolve, reject) {
            return sendGetFile(con, src, function(file) {
              if (file) {
                data = localResources[src] = makeBlobUrl(atob(file), typeForFile(src));
                preserveSelection(function(range) {
                  return replaceImage(con, img, src, data);
                });
                return resolve(data);
              } else {
                return reject(null);
              }
            });
          });
        }
      }
    };
    replaceImage = function(con, img, src, data) {
      return setTimeout((function() {
        return img.src = data;
      //img.onload = ->
      }), 0);
    };
    typeForFile = function(name) {
      var ext, ignore;
      [ignore, ext] = name.match(/\.([^#.]*)(#.*)?$/);
      return fileTypes[ext];
    };
    close = function(evt, data) {
      var connection;
      console.log("CLOSED EMACS CONNECTION");
      connection = data.emacsConnection;
      connection.panel.find('button').button('enable');
      connection.panel.find('input').removeAttr('readonly');
      if (connection.cookie) {
        window.close();
      }
      data.removeFilter(connection.filter);
      connection.websocket = null;
      return connection.filter = null;
    };
    message = function(evt, data) {
      var ignore, method, msg, text;
      [ignore, msg, ignore, text] = evt.data.match(msgPat);
      if (method = messages[msg]) {
        return preserveSelection(() => {
          return method(data, text, evt.data);
        });
      } else {
        console.log(`Unknown message ${msg}: ${text}`);
        return data.emacsConnection.websocket.close();
      }
    };
    error = function(evt, data) {
      return console.log(`Error: ${evt.data}`);
    };
    open = function(evt, ws, opts, port, cookie, cont) {
      var connection, data;
      data = opts.data;
      ws.send(`${cookie != null ? cookie : ''} display`);
      connection = data.emacsConnection;
      connection.cookie = cookie;
      connection.panel.find('button').button('disable');
      connection.panel.find('input').attr('readonly', true);
      connection.websocket = ws;
      connection.filter = {
        __proto__: basicDataFilter,
        replaceText: function(data, {start, end, text, source}) {
          if (source !== 'emacs') {
            return sendReplace(ws, start, end, text);
          }
        }
      };
      data.addFilter(connection.filter);
      if (!cookie) {
        sendReplace(ws, 0, -1, data.getText());
      }
      changeAdvice(opts.data, true, {
        getFile: {
          emacs: function(parent) {
            return function(file, cont, fail) {
              var p;
              p = new Promise((success, failure) => {
                return sendGetFile(this.emacsConnection, `file:${file}`, function(contents) {
                  if (contents) {
                    return success(atob(contents));
                  } else {
                    return failure(`No such file: ${file}`);
                  }
                });
              });
              if (cont || fail) {
                return p.then(cont, fail);
              } else {
                return p;
              }
            };
          }
        }
      });
      configureOpts(opts);
      return typeof cont === "function" ? cont() : void 0;
    };
    sendReplace = function(con, start, end, text) {
      con.send(`r ${start} ${end} ${JSON.stringify(text)}`);
      return diag(`sending r ${start} ${end} ${JSON.stringify(text)}`);
    };
    sendFollowLink = function(con, location) {
      con.send(`followLink ${location}`);
      return diag(`sending followLink ${location}`);
    };
    sendCcCc = function(con, location) {
      con.send(`ctrl-c-ctrl-c ${location}`);
      return diag(`sending ctrl-c-ctrl-c ${location}`);
    };
    sendGetFile = function(con, name, callback) {
      var id, m, webSocket;
      webSocket = con.websocket;
      if (m = name.match(/#.*$/)) {
        name = name.substring(0, name.length - m[0].length);
      }
      id = `file-${fileCount++}`;
      diag(`sending getFile ${id} ${name}`);
      con.fileCallbacks[id] = function(file) {
        delete con.fileCallbacks[id];
        return callback(file);
      };
      return webSocket.send(`getFile ${id} ${name}`);
    };
    blockRangeFor = function(data, start, end) {
      var bOff;
      bOff = data.blockOffsetForDocOffset(start);
      bOff.block = data.getBlock(bOff.block);
      bOff.length = end - start;
      bOff.type = start === end ? 'Caret' : 'Range';
      return bOff;
    };
    configureEmacs = function(panel) {
      var data, opts;
      opts = UI.context.opts;
      data = opts.data;
      data.emacsConnection = {
        panel: panel,
        opts: UI.context.opts,
        fileCallbacks: {},
        changeCount: 0,
        pendingChanges: {}
      };
      panel.find('button').button().on('click', function() {
        var host, port;
        [host, port] = panel.find('input').val().split(':');
        return connect(opts, host, Number(port), '', function() {});
      });
      return $(document).ready(function() {
        var con, cookie, host, ignore, m, port, u;
        if (document.location.search.length > 1 && !connected) {
          connected = true;
          ({
            connect: con
          } = getDocumentParams());
          if (con) {
            u = new URL(con);
            if (u.protocol === 'emacs:' && (m = u.pathname.match(/^\/\/([^:]*)(:[^\/]*)(\/.*)$/))) {
              [ignore, host, port, cookie] = m;
              return connect(opts, host, port.substring(1), cookie.substring(1));
            }
          }
        }
      });
    };
    Object.assign(Leisure, {
      blockRangeFor,
      configureEmacs,
      configureEmacsOpts: configureOpts
    });
    return {};
  });

}).call(this);

//# sourceMappingURL=emacs.js.map
