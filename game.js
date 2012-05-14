(function() {
  var DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, bindSvgDiv, count, down, keys, press, root, up;

  window.Game = root = {};

  LEFT_ARROW = 37;

  UP_ARROW = 38;

  RIGHT_ARROW = 39;

  DOWN_ARROW = 40;

  keys = {};

  count = 0;

  down = function down(e, keyFunc) {
    var c;
    window.EVT = e;
    c = e.charCode || e.keyCode || e.which;
    if (!(keys[c] != null)) {
      keys[c] = e;
      count++;
      if (count === 1) return press(keyFunc);
    } else {
      return e.preventDefault();
    }
  };

  up = function up(e, keyFunc) {
    var c;
    c = e.charCode || e.keyCode || e.which;
    if (keys[c]) {
      keys[c] = null;
      keyFunc(e);
      return count--;
    }
  };

  press = function press(keyFunc) {
    var c, e, found;
    found = false;
    for (c in keys) {
      e = keys[c];
      if (e != null) {
        keyFunc(e);
        found = true;
      }
    }
    if (found) {
      return window.setTimeout((function() {
        return press(keyFunc);
      }), 100);
    }
  };

  bindSvgDiv = function bindSvgDiv(div, keyFunc) {
    div.focus();
    div.addEventListener('keydown', function(e) {
      return down(e, keyFunc);
    });
    div.addEventListener('keyup', function(e) {
      return up(e, keyFunc);
    });
    return div.firstElementChild.getSVGDocument().rootElement.addEventListener('mousedown', (function(evt) {
      div.focus();
      return evt.preventDefault();
    }), true, true);
  };

  root.bindSvgDiv = bindSvgDiv;

}).call(this);
