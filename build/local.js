// Generated by CoffeeScript 2.4.1
(function() {
  // Code for local-mode.  This will not be loaded under meteor.
  'use strict';
  var init;

  require(['./domCursor'], function(DC) {
    return window.DOMCursor = DC;
  });

  init = function(base, jqui, EditorSupport, Modes, Diag, P2P, Tests, Defaults, UI, Search, Emacs, Todo, Advice, LoungeDefs, Atom, Tangle, Storage, Presentation, ODB) {
    var DEFAULT_PAGE, OrgData, Peer, addEmacsDataFilter, addSearchDataFilter, changeAdvice, checkImage, configureAtom, configureLocal, createEditorDisplay, createStructureDisplay, editorToolbar, fancyEditDiv, getDocumentParams, initStorage, initializePendingViews, installSelectionMenu, localActivateScripts, localResources, p2pConnections, p2pPanel, peer, plainEditDiv, renderView, runTests, setPanelExpanded, todoForEditor, useP2P, withContext;
    ODB.trackOdb();
    //ODB.useOdb 'User'
    ({OrgData, installSelectionMenu, getDocumentParams, editorToolbar} = EditorSupport);
    ({plainEditDiv, fancyEditDiv} = Modes);
    ({createStructureDisplay, createEditorDisplay} = Diag);
    ({Peer} = P2P);
    ({runTests} = Tests);
    ({renderView, initializePendingViews, withContext, setPanelExpanded, localResources} = UI);
    ({addSearchDataFilter} = Search);
    ({addEmacsDataFilter} = Emacs);
    ({todoForEditor} = Todo);
    ({changeAdvice} = Advice);
    ({configureAtom} = Atom);
    ({initStorage} = Storage);
    useP2P = true;
    //useP2P = false
    peer = null;
    p2pPanel = null;
    p2pConnections = null;
    DEFAULT_PAGE = 'demo/documentComputers.lorg';
    Leisure.presentation = Presentation;
    Leisure.configureP2P = function({panel, hostField, sessionField, createSessionButton, connections}) {
      p2pPanel = panel;
      p2pConnections = connections;
      if (!useP2P) {
        panel.css('display', 'none');
      }
      hostField.val(document.location.host || "localhost:8080");
      createSessionButton.data({
        hasSession: false
      });
      Leisure.createSession = function(url, doneFunc) {
        createSessionButton.closest('.contents').removeClass('not-connected');
        createSessionButton.closest('.contents').addClass('connected');
        return peer.createSession(hostField.val(), (function(con) {
          url = new URL("", document.location);
          url.search = `?join=${peer.connectUrl}`;
          sessionField.attr('href', url.toString());
          sessionField.text(url.toString());
          setPanelExpanded(panel, true);
          createSessionButton.button('option', 'label', 'Disconnect');
          return typeof doneFunc === "function" ? doneFunc() : void 0;
        }), function(n) {
          return connections.html(n);
        });
      };
      return createSessionButton.click(function() {
        if (!createSessionButton.data().hasSession) {
          Leisure.createSession(hostField.val());
        } else {
          createSessionButton.closest('.contents').removeClass('connected');
          createSessionButton.closest('.contents').addClass('not-connected');
          peer.disconnect();
          createSessionButton.button('option', 'label', 'Create Session');
          setTimeout((function() {
            return setPanelExpanded(panel, true);
          }), 1);
        }
        return createSessionButton.data({
          hasSession: !createSessionButton.data().hasSession
        });
      });
    };
    configureLocal = function(opts) {
      var u;
      u = new URL('.', opts.loadName);
      opts.data.localURL = u.href;
      return localActivateScripts(opts);
    };
    Leisure.localActivateScripts = localActivateScripts = function(opts) {
      return changeAdvice(opts.editor, true, {
        activateScripts: {
          local: function(parent) {
            return function(el, context) {
              var errorEvt, i, img, len, ref, removeEvents, results, ret;
              ret = parent(el, context);
              errorEvt = function(e) {
                checkImage(opts, e.target);
                return removeEvents(e);
              };
              removeEvents = function(e) {
                e.target.removeEventListener('load', removeEvents);
                return e.target.removeEventListener('error', errorEvt);
              };
              ref = $(el).find('img');
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                img = ref[i];
                if (!img.complete && !localResources[img.src]) {
                  img.addEventListener('error', errorEvt);
                  results.push(img.addEventListener('load', removeEvents));
                } else {
                  results.push(checkImage(opts, img));
                }
              }
              return results;
            };
          }
        }
      });
    };
    checkImage = function(opts, img) {
      var err, name, ref, ref1, src, u;
      if ((img.complete && !img.naturalHeight) || localResources[img.src]) {
        src = img.getAttribute('src');
        if (!src.match('^.*:.*')) {
          name = (ref = src.match(/([^#?]*)([#?].*)?$/)) != null ? ref[1] : void 0;
        } else {
          name = (ref1 = src.match(/^file:([^#?]*)([#?].*)?$/)) != null ? ref1[1] : void 0;
        }
        if (name && !img.leisureLoaded) {
          img.leisureLoaded = true;
          try {
            u = new URL(name, opts.data.loadName);
            localResources[img.src] = img.src = u.href;
            return img.onerror = function(e) {
              return opts.imageError(img, e);
            };
          } catch (error) {
            err = error;
            return opts.imageError(img, err);
          }
        }
      }
    };
    return $(document).ready(function() {
      var data;
      runTests();
      installSelectionMenu();
      if (useP2P) {
        window.PEER = peer = new Peer;
        window.DATA = data = peer.data;
        if (p2pPanel != null) {
          p2pPanel.css('display', '');
        }
      } else {
        window.DATA = data = new OrgData();
      }
      addSearchDataFilter(data);
      Leisure.autoLoadEnv(['wisp'], './wispSupport');
      return data.processDefaults(Defaults).then(() => {
        var join, load, tanglePresent, theme;
        createStructureDisplay(data);
        //window.ED = plainEditDiv $("[maindoc]"), data
        window.ED = fancyEditDiv($("[maindoc]"), data);
        ED.options.validateMode = true;
        if (useP2P) {
          window.PEER.setEditor(ED);
        }
        createEditorDisplay(ED);
        todoForEditor(ED);
        if (document.location.search) {
          ({load, theme, join} = getDocumentParams());
        } else {
          load = DEFAULT_PAGE;
        }
        if (load) {
          ED.options.data.baseDocName = load;
          load = new URL(load, document.location).toString();
          ED.options.loadName = load;
          configureLocal(ED.options);
          tanglePresent = false;
          $.ajax(load + '.tangle').done(function(content) {
            tanglePresent = ED.options.data.tangled = true;
            //console.log "Handle tangle:", content
            return ED.options.data.loadTangles(content);
          }).always(function() {
            return $.ajax(load).then(function(data) {
              //console.log "Tangle present: ", tanglePresent
              return ED.options.load(load, data);
            });
          });
        } else {
          configureAtom(ED.options, configureLocal);
        }
        if (theme) {
          ED.options.setTheme(theme);
        }
        if (join) {
          setTimeout((function() {
            var createSessionButton, u;
            createSessionButton = $(editorToolbar(window.PEER.editor.node)).find('[name=p2pConnector] [name=createSession]');
            createSessionButton.data({
              hasSession: true
            });
            createSessionButton.closest('.contents').removeClass('not-connected');
            createSessionButton.closest('.contents').addClass('connected');
            createSessionButton.button('option', 'label', 'Disconnect');
            console.log("CREATE SESSION:", createSessionButton[0]);
            u = new URL(join);
            console.log(`JOIN SESSION: ${u}`);
            return window.PEER.connectToSession(u.toString(), null, function(n) {
              return p2pConnections.html(n);
            });
          }), 1);
        }
        return $('#globalLoad').remove();
      });
    });
  };

  require(['./editor', 'jquery', 'lodash', 'bluebird'], function(editor, $, ld, Bluebird) {
    //Bluebird.Promise.config longStackTraces: true, monitoring: true
    editor.set$($, function(obj) {
      return obj instanceof $;
    });
    return require(['acorn', 'acorn_walk'], function() {
      return require(['acorn_loose'], function() {
        return require(['./base', 'jqueryui', './editorSupport', './modes', './diag', './leisure-client-adapter', './tests', 'text!../src/defaults.lorg', './ui', './search', './emacs', './todo', './advice', './lounge', 'atomSupport', './tangle', './storage', './presentation', './odb'], init);
      });
    });
  });

}).call(this);

//# sourceMappingURL=local.js.map
