
/*
# use an element as a Leisure notebook
*/

(function() {
  var Leisure, ReplCore, addsLine, box, chunks, codeSpan, continueRangePosition, findDefs, getRangePosition, getRanges, grp, initNotebook, makeRange, markupDefs, nodeEnd, pos, removeOldDefs, root;

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
    var body, bx, def, i, main, name, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = defs.length; _i < _len; _i++) {
      i = defs[_i];
      main = i[0], name = i[1], def = i[2], body = i[3];
      if (name != null) {
        bx = box(main, 'codeMain', true);
        bx.appendChild(codeSpan(name, 'codeName'));
        bx.appendChild(document.createTextNode(def));
        _results.push(bx.appendChild(codeSpan(body, 'codeBody')));
      } else {
        bx = box(main, 'codeMain', true);
        _results.push(bx.appendChild(codeSpan(body, 'codeExpr')));
      }
    }
    return _results;
  };

  codeSpan = function codeSpan(text, boxType) {
    var node;
    node = document.createElement('span');
    node.setAttribute(boxType, '');
    node.setAttribute('Leisure', '');
    node.setAttribute('class', boxType);
    node.appendChild(document.createTextNode(text));
    return node;
  };

  box = function box(range, boxType, empty) {
    var node;
    node = document.createElement('div');
    node.setAttribute(boxType, '');
    node.setAttribute('Leisure', '');
    node.setAttribute('class', boxType);
    if (empty) {
      range.deleteContents();
    } else {
      node.appendChild(range.extractContents());
    }
    range.insertNode(node);
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
    var bodyStart, defType, endPat, leading, leadingSpaces, m, mainEnd, mainStart, matchStart, matched, name, nameEnd, nameRaw, next, outerRange, rest1, _ref, _ref2, _ref3;
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
      endPat = rest1.match(/\n+[^\s]|\n?$/);
      next = endPat ? rest1.substring(endPat.index) : rest1;
      mainEnd = txt.length - next.length;
      if (name != null) {
        mainStart = matchStart + ((_ref2 = leading != null ? leading.length : void 0) != null ? _ref2 : 0);
        nameEnd = mainStart + name.length;
        leadingSpaces = (rest1.match(/^\s*/))[0].length;
        bodyStart = txt.length - (rest1.length - leadingSpaces);
        outerRange = makeRange(el, mainStart, mainEnd);
        return [outerRange, txt.substring(mainStart, nameEnd), defType, txt.substring(bodyStart, mainEnd), next];
      } else {
        mainStart = matchStart + ((_ref3 = leading != null ? leading.length : void 0) != null ? _ref3 : 0);
        outerRange = makeRange(el, mainStart, mainEnd);
        return [outerRange, null, null, txt.substring(mainStart, mainEnd), next];
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
      return nodeEnd(child);
    } else {
      return [child, offset];
    }
  };

  getRangePosition = function getRangePosition(node, charOffset, end) {
    var newNode, newOff, _ref;
    if (node.nodeType === 3) {
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
    newOff = charOffset - ((addsLine(node)) || ((node.nextSibling != null) && (addsLine(node.nextSibling))) ? 1 : 0);
    if (end && (newOff === 1 || charOffset === 1)) {
      return nodeEnd(node);
    } else if (node.nextSibling != null) {
      if (newOff === 0 && end) {
        return nodeEnd(node);
      } else {
        return getRangePosition(node.nextSibling, newOff, end);
      }
    } else {
      return [null, (node.parentNode.lastChild !== node && !(addsLine(node.parentNode)) ? newOff : charOffset)];
    }
  };

  nodeEnd = function nodeEnd(node) {
    return [node, node.nodeType === 3 ? node.length : node.childNodes.length - 1];
  };

  addsLine = function addsLine(node) {
    return node.nodeName === 'BR' || (node.nodeType === 1 && getComputedStyle(node, null).display === 'block');
  };

  root.initNotebook = initNotebook;

}).call(this);
