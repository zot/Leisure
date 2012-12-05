(function() {
  var Notebook, getStoragePeerName, root;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Storage = root = {};
    Notebook = window.Notebook;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  getStoragePeerName = function getStoragePeerName() {};

}).call(this);
