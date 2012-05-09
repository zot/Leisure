(function() {
  var DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW, bindSvgDiv, curKey, down, press, release, root, up;

  window.Game = root = {};

  curKey = null;

  LEFT_ARROW = 37;

  UP_ARROW = 38;

  RIGHT_ARROW = 39;

  DOWN_ARROW = 40;

  down = function down(e, keyFunc) {
    var c;
    c = e.charCode || e.keyCode || e.which;
    e.preventDefault();
    if (c !== curKey) {
      if (curKey !== null) release(curKey);
      curKey = c;
      return press(c, e, keyFunc);
    }
  };

  up = function up(e) {
    var c;
    c = e.charCode || e.keyCode || e.which;
    if (c === curKey) {
      release(curKey);
      return curKey = null;
    }
  };

  press = function press(c, e, keyFunc) {
    if (c === curKey) {
      keyFunc(e);
      return window.setTimeout((function() {
        return press(c, e, keyFunc);
      }), 100);
    }
  };

  release = function release(c) {};

  bindSvgDiv = function bindSvgDiv(div, keyFunc) {
    div.focus();
    div.addEventListener('keydown', function(e) {
      return down(e, keyFunc);
    });
    div.addEventListener('keyup', up);
    return div.firstElementChild.getSVGDocument().firstChild.addEventListener('mousedown', (function(evt) {
      floop.focus();
      return evt.preventDefault();
    }), true, true);
  };

  root.bindSvgDiv = bindSvgDiv;

}).call(this);
