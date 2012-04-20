
/*
# use an element as a Leisure notebook
*/

(function() {
  var Leisure, ReplCore, addsLine, boxIn, chunks, continueRangePosition, findDefs, getRangePosition, getRanges, grp, initNotebook, makeRange, markupDefs, pos, removeOldDefs, root;

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
    var node, parent, _i, _len, _ref;
    _ref = el.querySelectorAll("[Leisure]");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      parent = node.parentNode;
      while (node.firstChild != null) {
        parent.insertBefore(node.firstChild, node);
      }
      parent.removeChild(node);
    }
    return el.normalize();
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
        body = boxIn(main, 'codeExpr', 'span');
        main.setStartBefore(body);
        main.setEndAfter(body);
        _results.push(boxIn(main, 'codeMain', 'div'));
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
    _ref = grp(el, off1, false), node = _ref[0], offset = _ref[1];
    if (offset != null) {
      range.setStart(node, offset);
    } else {
      range.setStartBefore(node);
    }
    _ref2 = grp(el, off2, true), node = _ref2[0], offset = _ref2[1];
    if (offset != null) {
      range.setEnd(node, offset);
    } else {
      range.setEndAfter(node);
    }
    return range;
  };

  grp = function grp(node, charOffset, end) {
    var child, offset, _ref;
    _ref = getRangePosition(node.firstChild, charOffset, end), child = _ref[0], offset = _ref[1];
    if (!(child != null)) {
      child = node.lastChild;
      return [child, child.nodeType === 3 ? child.length : child.childNodes.length];
    } else {
      return [child, offset];
    }
  };

  getRangePosition = function getRangePosition(node, charOffset, end) {
    var newNode, newOff, _ref;
    if (charOffset === 0 && (node.nodeType !== 1 || node.childNodes.length === 0)) {
      return [node];
    } else if (node.nodeType === 3) {
      if (node.length > (end ? charOffset - 1 : charOffset)) {
        return [node, charOffset];
      } else {
        return continueRangePosition(node, charOffset - node.length, end);
      }
    } else if (node.nodeName === 'BR') {
      if (charOffset === (end ? 1 : 0)) {
        return [node];
      } else {
        return continueRangePosition(node, charOffset, end);
      }
    } else if (node.firstChild != null) {
      _ref = getRangePosition(node.firstChild, charOffset, end), newNode = _ref[0], newOff = _ref[1];
      if (newNode != null) {
        return [newNode, newOff];
      } else {
        return continueRangePosition(node, newOff, end);
      }
    } else {
      return continueRangePosition(node, charOffset, end);
    }
  };

  continueRangePosition = function continueRangePosition(node, charOffset, end) {
    var newOff;
    newOff = charOffset - ((addsLine(node)) || (addsLine(node.nextSibling)) ? 1 : 0);
    if (node.nextSibling != null) {
      if (end && newOff === 1) {
        return [node];
      } else {
        return getRangePosition(node.nextSibling, newOff, end);
      }
    } else {
      return [null, (newOff !== charOffset && node.parentNode.lastChild === node && addsLine(node.parentNode) ? charOffset : newOff)];
    }
  };

  addsLine = function addsLine(node) {
    return node.nodeName === 'BR' || (node.nodeType === 1 && getComputedStyle(node, null).display === 'block');
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
