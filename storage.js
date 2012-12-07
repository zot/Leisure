(function() {
  var Notebook, Xus, initStorage, peer, root, storageChoices, _ref, _ref2, _ref3;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    root = (_ref = window.Storage) != null ? _ref : (window.Storage = {});
    Notebook = (_ref2 = window.Notebook) != null ? _ref2 : (window.Notebook = {});
    Xus = (_ref3 = window.Xus) != null ? _ref3 : (window.Xus = {});
    window.global = window;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  storageChoices = null;

  peer = null;

  initStorage = function initStorage(callback) {
    if (peer) {
      return callback();
    } else {
      peer = Xus.createDirectPeer(Notebook.xusServer);
      peer.set('this/name', 'docBase');
      peer.set('this/links', ['leisure/storage']);
      return peer.listen('leisure/storage', false, true, function(cmd) {
        storageChoices = peer.get('leisure/storage');
        return callback();
      });
    }
  };

  root.initStorage = initStorage;

}).call(this);
