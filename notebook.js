
/*
# use an element as a Leisure notebook
*/

(function() {
  var Leisure, ReplCore, boxIn, chunks, continueRangePosition, findDefs, getRangePosition, getRanges, initNotebook, makeRange, markupDefs, pos, removeOldDefs, root;

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    Leisure = window.Leisure;
    ReplCore = window.ReplCore;
    window.Notebook = root = {};
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  pos = 0;

  chunks = [];

  initNotebook = function initNotebook(el) {
    removeOldDefs(el);
    return markupDefs(findDefs(el));
  };

  removeOldDefs = function removeOldDefs(el) {
    var node, parent, _i, _len, _ref, _results;
    _ref = el.querySelectorAll("[Leisure]");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      parent = node.parentNode;
      while (node.firstChild != null) {
        parent.insertBefore(node.firstChild, node);
      }
      parent.removeChild(node);
      _results.push(parent.normalize());
    }
    return _results;
  };

  markupDefs = function markupDefs(defs) {
    var body, bodyNode, i, main, name, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = defs.length; _i < _len; _i++) {
      i = defs[_i];
      main = i[0], name = i[1], body = i[2];
      if (name != null) {
        boxIn(name, 'codeName', 'span');
        bodyNode = boxIn(body, 'codeBody', 'span');
        main.setEndAfter(bodyNode);
        _results.push(boxIn(main, 'codeMain', 'div'));
      } else {
        _results.push(boxIn(main, 'codeExpr', 'div'));
      }
    }
    return _results;
  };

  boxIn = function boxIn(range, boxType, elementType) {
    var node;
    node = document.createElement(elementType);
    node.setAttribute(boxType, '');
    node.setAttribute('Leisure', '');
    node.setAttribute('class', boxType);
    range.surroundContents(node);
    return node;
  };

  findDefs = function findDefs(el) {
    var def, ranges, rest, rng, txt;
    txt = el.innerText;
    rest = txt;
    ranges = [];
    while ((def = rest.match(Leisure.linePat)) && def[1].length !== rest.length) {
      rng = getRanges(el, txt, rest, def, txt.length - rest.length);
      if (rng) {
        rest = rng.pop();
        if (rng) {
          ranges.push(rng);
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return ranges;
  };

  getRanges = function getRanges(el, txt, rest, def, restOff) {
    var bodyRange, bodyStart, defType, endPat, leading, leadingSpaces, m, mainEnd, mainStart, matchStart, matched, name, nameEnd, nameRange, nameRaw, next, outerRange, rest1, _ref, _ref2, _ref3;
    _ref = m = def, matched = _ref[0], leading = _ref[1], nameRaw = _ref[2], defType = _ref[3];
    if (!rest.trim()) {
      return null;
    } else if (!(m != null)) {
      return [makeRange(el, restOff, txt.length), null, null, ''];
    } else {
      matchStart = restOff + m.index;
      if (!(defType != null)) {
        name = null;
      } else if (nameRaw[0] === ' ') {
        name = null;
        defType = null;
      } else {
        name = nameRaw.trim();
      }
      rest1 = rest.substring((defType ? matched : leading).length);
      endPat = rest1.match(/\n[^\s]|\n?$/);
      next = endPat ? rest1.substring(endPat.index) : rest1;
      mainEnd = txt.length - next.length;
      if (name != null) {
        mainStart = matchStart + ((_ref2 = leading != null ? leading.length : void 0) != null ? _ref2 : 0);
        nameEnd = mainStart + name.length;
        nameRange = makeRange(el, mainStart, nameEnd);
        leadingSpaces = (rest1.match(/^\s*/))[0].length;
        bodyStart = txt.length - (rest1.length - leadingSpaces);
        bodyRange = makeRange(el, bodyStart, mainEnd);
        outerRange = makeRange(el, mainStart, mainEnd);
        return [outerRange, nameRange, bodyRange, next];
      } else {
        mainStart = matchStart + ((_ref3 = leading != null ? leading.length : void 0) != null ? _ref3 : 0);
        outerRange = makeRange(el, mainStart, mainEnd);
        return [outerRange, null, null, next];
      }
    }
  };

  makeRange = function makeRange(el, off1, off2) {
    var node, offset, range, _ref, _ref2;
    range = document.createRange();
    _ref = getRangePosition(el, off1), node = _ref[0], offset = _ref[1];
    range.setStart(node, offset);
    _ref2 = getRangePosition(el, off2), node = _ref2[0], offset = _ref2[1];
    range.setEnd(node, offset);
    return range;
  };

  getRangePosition = function getRangePosition(node, charOffset) {
    var newNode, newOff, _ref;
    if (node.nodeType === 3) {
      if (node.length >= charOffset) {
        return [node, charOffset];
      } else {
        return [null, charOffset - node.length];
      }
    } else if (node.firstChild != null) {
      _ref = getRangePosition(node.firstChild, charOffset), newNode = _ref[0], newOff = _ref[1];
      if (newNode != null) {
        return [newNode, newOff];
      } else {
        return continueRangePosition(node, newOff);
      }
    } else {
      return continueRangePosition(node, charOffset);
    }
  };

  continueRangePosition = function continueRangePosition(node, charOffset) {
    if (node.nextSibling != null) {
      return getRangePosition(node.nextSibling, charOffset);
    } else {
      return [null, charOffset];
    }
  };

  /*
    el.addEventListener 'textInput', (evt)->
      rng = window.getSelection().getRangeAt(0)
      txt = el.innerText
      changed = txt.substring(pos, rng.endOffset)
      pos = rng.endOffset
      if txt[pos - 1] == '\n'
        if pos > 2 and txt[pos - 2] = \n
          evalChunk
  */

  root.initNotebook = initNotebook;

}).call(this);
