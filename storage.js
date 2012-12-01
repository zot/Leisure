(function() {
  var root;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    window.Storage = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

}).call(this);
