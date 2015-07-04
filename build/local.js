// Generated by CoffeeScript 1.9.3
(function() {
  var init;

  init = function(EditorSupport, Diag, P2P) {
    var OrgData, Peer, configurePeerButttons, connectDialog, createEditorDisplay, createStructureDisplay, fancyEditDiv, installSelectionMenu, message, mode, offerAction, offerButton, peer, plainEditDiv, showMessage, showSpinner, spinner, useP2P;
    OrgData = EditorSupport.OrgData, installSelectionMenu = EditorSupport.installSelectionMenu, plainEditDiv = EditorSupport.plainEditDiv, fancyEditDiv = EditorSupport.fancyEditDiv;
    createStructureDisplay = Diag.createStructureDisplay, createEditorDisplay = Diag.createEditorDisplay;
    Peer = P2P.Peer;
    useP2P = true;
    peer = null;
    mode = null;
    connectDialog = null;
    offerButton = null;
    spinner = null;
    message = null;
    offerAction = null;
    showMessage = function(offerMessage, buttonAction) {
      spinner.addClass('hidden');
      message.removeClass('hidden');
      offerButton.button('option', 'label', offerMessage);
      offerButton.removeClass('hidden');
      return offerAction = buttonAction;
    };
    showSpinner = function() {
      message.addClass('hidden');
      offerButton.addClass('hidden');
      return spinner.removeClass('hidden');
    };
    configurePeerButttons = function() {
      var connect, connectToMaster, connectToSlave, create;
      connectDialog = $("<div title=\"Connect\">\n  <div>\n    <div id=\"loaderContainer\" style=\"position: relative; height: 100%\">\n      <div id=\"loaderText\" style='text-align: center'>Discovering Connection Information</div>\n      <div class=\"loader\">\n        <span></span>\n        <span></span>\n        <span></span>\n      </div>\n    </div>\n    <textarea class='hidden' readonly=\"true\" style=\"width: 100%; height: calc(100% - 2.5em - 5px)\">Hello</textarea>\n    <button style=\"height: 2.5em; margin-top: 5px\" class='hidden'></button>\n  </div>\n</div>");
      message = connectDialog.find('textarea');
      spinner = connectDialog.find('#loaderContainer');
      offerButton = connectDialog.find('button').button().on('click', function() {
        return offerAction();
      });
      connect = $("<button>Connect to Master</button>").prependTo('body').button().on('click', function() {
        return connectToMaster();
      });
      create = $("<button>Connect to Slave</button>").prependTo('body').button().on('click', function() {
        return connectToSlave();
      });
      connectDialog.appendTo('body').dialog().dialog('option', 'width', 700).dialog('option', 'height', 400).dialog('option', 'position', {
        my: "center",
        at: "top",
        of: window
      }).dialog('close');
      connectToSlave = function() {
        if (peer.becomeMaster()) {
          connect.button('disable');
        }
        connectDialog.dialog('open');
        return peer.createConnectionForSlave({
          offerReady: function(offer, connection) {
            message.val(JSON.stringify(offer));
            showMessage('Send to slave and press when delivered', function() {
              message.val('').removeAttr('readonly').off('keydown');
              return showMessage('Paste slave answer and press this to accept it', function() {
                if (message.val()) {
                  connection.establishConnection(message.val());
                  return connectDialog.dialog('close');
                }
              });
            });
            return message[0].select();
          },
          connected: function(connection) {
            return connectDialog.dialog('close');
          },
          error: function(err) {
            return $('#loaderText').html(err);
          }
        });
      };
      return connectToMaster = function() {
        console.log('CLICK');
        if (peer.becomeSlave()) {
          create.button('disable');
        }
        showMessage('Press to generate answer from master offer', function() {
          console.log("GENERATE ANSWER");
          showSpinner();
          return peer.createConnectionToMaster({
            offer: message.val(),
            answerReady: function(answer) {
              console.log("answer ready");
              message.val(JSON.stringify(answer));
              showMessage('Press when master has above answer', function() {
                return connectDialog.dialog('close');
              });
              return message[0].select();
            },
            connected: function() {
              connectDialog.dialog('close');
              return console.log('connected');
            },
            error: function(con, err) {
              return $('#loaderText').html(err.message);
            }
          });
        });
        offerButton.button('disable');
        connectDialog.dialog('open');
        return message.val('').attr('placeholder', 'Paste master offer here').removeAttr('readonly').off('keydown').on('keydown', function() {
          return setTimeout((function() {
            var empty;
            empty = message.val() === '';
            if (empty !== offerButton.button('option', 'disabled')) {
              return offerButton.button('option', 'disabled', empty);
            }
          }), 1);
        });
      };
    };
    return $(document).ready(function() {
      var data;
      installSelectionMenu();
      if (useP2P) {
        configurePeerButttons();
        window.PEER = peer = new Peer;
        window.DATA = data = peer.adaptData(new OrgData());
      } else {
        window.DATA = data = new OrgData();
      }
      createStructureDisplay(data);
      window.ED = plainEditDiv($("[maindoc]"), data);
      createEditorDisplay(ED);
      ED.options.load("* Test properties\n#+BEGIN_SRC lisp :results dynamic\n(+ 3 4)\n#+END_SRC\n#+RESULTS:\n: 7\nduh\n:properties:\n:a: 1\n:end:\n#+BEGIN_SRC js :results dynamic\n3 + 4\n#+END_SRC\n#+RESULTS:\n: 7\npeep\n:properties:\n:b: 2\n:end:" + '\n');
      return $('#globalLoad').remove();
    });
  };

  require(['jquery'], function() {
    return require(['jqueryui', 'cs!./editorSupport.litcoffee', 'cs!./diag.litcoffee', 'cs!./p2p.litcoffee'], function(jqui, EditorSupport, Diag, P2P) {
      return init(EditorSupport, Diag, P2P);
    });
  });

}).call(this);

//# sourceMappingURL=local.js.map
