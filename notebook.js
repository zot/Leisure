
/*
# use an element as a Leisure notebook
*/

(function() {
  var Leisure, Prim, ReplCore, addsLine, bindNotebook, box, checkMutateFromModification, checkMutateToDef, cleanOutput, codeBox, codeSpan, continueRangePosition, delay, envFor, evalDoc, evalOutput, findDefs, getBox, getRangePosition, getRangeText, getRanges, grp, highlightPosition, initNotebook, makeOutputBox, makeRange, markupDefs, nodeEnd, postLoadQueue, prepExpr, queueAfterLoad, removeOldDefs, req, root, selInDef, showNesting, textNode, toDefBox, toExprBox,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    Leisure = window.Leisure;
    ReplCore = window.ReplCore;
    window.Notebook = root = {};
    Prim = window.Prim;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  delay = function delay(func) {
    return window.setTimeout(func, 1);
  };

  bindNotebook = function bindNotebook(el) {
    if (!(el.bound != null)) {
      el.bound = true;
      el.addEventListener('DOMCharacterDataModified', (function(evt) {
        if (!el.replacing) {
          return delay(function() {
            return checkMutateFromModification(getBox(evt.target));
          });
        }
      }), true, true);
      el.addEventListener('DOMSubtreeModified', (function(evt) {
        if (!el.replacing) {
          return delay(function() {
            return checkMutateFromModification(getBox(evt.target));
          });
        }
      }), true, true);
      return el.addEventListener('keypress', function(e) {
        var br, bx, r, s, sp;
        s = window.getSelection();
        r = s.getRangeAt(0);
        if ((e.charCode || e.keyCode || e.which) === 13) {
          br = textNode('\n');
          r.insertNode(br);
          r = document.createRange();
          r.setStart(br, 1);
          s.removeAllRanges();
          s.addRange(r);
          e.preventDefault();
        } else if ((e.charCode || e.keyCode || e.which) === 61) {
          checkMutateToDef(e, el);
        } else {
          if (r.startContainer.parentNode === el) {
            sp = codeSpan('\n', 'codeExpr');
            sp.setAttribute('generatedNL', '');
            bx = box(s.getRangeAt(0), 'codeMainExpr', true);
            bx.appendChild(sp);
            makeOutputBox(bx);
            r = document.createRange();
            r.setStart(sp, 0);
            s.removeAllRanges();
            s.addRange(r);
          }
        }
        return window.setTimeout(highlightPosition, 1);
      });
    }
  };

  highlightPosition = function highlightPosition() {
    var allTxt, last, parent, pos, r, s, tr, _ref;
    s = window.getSelection();
    r = s.getRangeAt(0);
    parent = getBox(r.startContainer);
    tr = document.createRange();
    tr.setStart(parent, 0);
    tr.setEnd(r.endContainer, r.endOffset);
    pos = getRangeText(tr).length;
    allTxt = parent.textContent;
    last = allTxt.length - 1;
    while (last < allTxt.length && (_ref = allTxt[last], __indexOf.call(' \n', _ref) >= 0)) {
      last--;
    }
    return showNesting(parent, allTxt.substring(0, last + 1), pos);
  };

  showNesting = function showNesting(parent, allTxt, pos) {
    return alert("highlight: [" + (allTxt.substring(0, pos)) + "] [" + (allTxt.substring(pos)) + "]");
  };

  getRangeText = function getRangeText(r) {
    return r.cloneContents().textContent;
  };

  getBox = function getBox(node) {
    while ((node != null) && !((typeof node.getAttribute === "function" ? node.getAttribute('LeisureBox') : void 0) != null)) {
      node = node.parentNode;
    }
    return node;
  };

  checkMutateFromModification = function checkMutateFromModification(b) {
    var inDef;
    if (b != null) {
      inDef = selInDef();
      if (inDef && b.classList.contains('codeMainExpr')) {
        return toDefBox(b);
      } else if (!inDef && b.classList.contains('codeMain')) {
        return toExprBox(b);
      }
    }
  };

  toExprBox = function toExprBox(b) {
    b.classList.remove('codeMain');
    b.classList.add('codeMainExpr');
    return makeOutputBox(b);
  };

  toDefBox = function toDefBox(b) {
    if (b.output) b.parentNode.removeChild(b.output);
    b.classList.remove('codeMainExpr');
    return b.classList.add('codeMain');
  };

  selInDef = function selInDef(expectedClass) {
    var box, defType, leading, m, matched, name, r, s, txt;
    s = window.getSelection();
    if (s.rangeCount > 0) {
      r = s.getRangeAt(0);
      if ((box = getBox(r.startContainer)) && (!(expectedClass != null) || box.classList.contains(expectedClass))) {
        txt = box.textContent;
        if ((m = txt.match(Leisure.linePat))) {
          matched = m[0], leading = m[1], name = m[2], defType = m[3];
          return defType && box;
        }
      }
    }
    return false;
  };

  checkMutateToDef = function checkMutateToDef(e, el) {
    var p, r, s;
    if (!el.replacing) {
      s = window.getSelection();
      r = s.getRangeAt(0);
      if (p = selInDef('codeMainExpr')) return toDefBox(p);
    }
  };

  initNotebook = function initNotebook(el) {
    var pgm, _ref;
    el.replacing = true;
    removeOldDefs(el);
    pgm = markupDefs(findDefs(el));
    if (!((el != null ? (_ref = el.lastChild) != null ? _ref.nodeType : void 0 : void 0) === 3 && el.lastChild.data[el.lastChild.data.length - 1] === '\n')) {
      el.appendChild(textNode('\n'));
      el.appendChild(textNode('\n'));
      el.appendChild(textNode('\n'));
    }
    el.normalize();
    el.replacing = false;
    return pgm;
  };

  removeOldDefs = function removeOldDefs(el) {
    var extracted, m, node, parent, txt, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3;
    extracted = [];
    _ref = el.querySelectorAll("[LeisureOutput]");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      node.parentNode.removeChild(node);
    }
    _ref2 = el.querySelectorAll("[generatednl]");
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      node = _ref2[_j];
      txt = node.lastChild;
      if (txt.nodeType === 3 && txt.data[txt.data.length - 1] === '\n') {
        txt.data = txt.data.substring(0, txt.data.length - 1);
      }
    }
    _ref3 = el.querySelectorAll("[Leisure]");
    for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
      node = _ref3[_k];
      parent = node.parentNode;
      if (addsLine(node) && (node.firstChild != null)) {
        extracted.push(node.firstChild);
      }
      while (node.firstChild != null) {
        parent.insertBefore(node.firstChild, node);
      }
      parent.removeChild(node);
    }
    for (_l = 0, _len4 = extracted.length; _l < _len4; _l++) {
      node = extracted[_l];
      if ((node.parentNode != null) && !addsLine(node) && (node.previousSibling != null) && !addsLine(node.previousSibling)) {
        node.parentNode.insertBefore(text('\n'), node);
      }
    }
    el.normalize();
    txt = el.lastChild;
    if ((txt != null ? txt.nodeType : void 0) === 3 && (m = txt.data.match(/(^|[^\n])(\n+)$/))) {
      return txt.data = txt.data.substring(0, txt.data.length - m[2].length);
    }
  };

  markupDefs = function markupDefs(defs) {
    var auto, bod, body, bx, def, i, main, name, pgm, s, _i, _len;
    pgm = '';
    auto = '';
    for (_i = 0, _len = defs.length; _i < _len; _i++) {
      i = defs[_i];
      main = i[0], name = i[1], def = i[2], body = i[3];
      if (name != null) {
        bod = codeSpan(body, 'codeBody');
        bod.appendChild(textNode('\n'));
        bod.setAttribute('generatedNL', '');
        bx = box(main, 'codeMain', true);
        bx.appendChild(codeSpan(name, 'codeName'));
        bx.appendChild(textNode(def));
        bx.appendChild(bod);
        pgm += "" + name + " " + def + " " + body + "\n";
      } else {
        if (main.leisureAuto) auto += "" + body + "\n";
        s = codeSpan(body, 'codeExpr');
        s.appendChild(textNode('\n'));
        s.setAttribute('generatedNL', '');
        bx = box(main, 'codeMainExpr', true);
        bx.appendChild(s);
        makeOutputBox(bx);
      }
    }
    return [pgm, auto];
  };

  textNode = function textNode(text) {
    return document.createTextNode(text);
  };

  evalOutput = function evalOutput(exBox) {
    var b;
    cleanOutput(exBox);
    b = document.createElement('button');
    b.setAttribute('onclick', 'Notebook.cleanOutput(this.parentNode)');
    b.innerHTML = "X";
    exBox.appendChild(b);
    return ReplCore.processLine(prepExpr(exBox.source.textContent), envFor(exBox));
  };

  cleanOutput = function cleanOutput(exBox) {
    var _results;
    _results = [];
    while (exBox.firstChild !== exBox.lastChild) {
      _results.push(exBox.removeChild(exBox.lastChild));
    }
    return _results;
  };

  prepExpr = function prepExpr(txt) {
    var _ref;
    if (_ref = txt[0], __indexOf.call('=!', _ref) >= 0) {
      return txt;
    } else {
      return "=" + txt;
    }
  };

  envFor = function envFor(box) {
    var exBox;
    exBox = getBox(box);
    return {
      require: req,
      write: function write(msg) {
        var div;
        div = document.createElement('div');
        div.innerHTML = "" + msg + "\n";
        return exBox.appendChild(div);
      },
      prompt: function prompt(msg, cont) {
        return cont(window.prompt(msg));
      }
    };
  };

  makeOutputBox = function makeOutputBox(source) {
    var node;
    node = document.createElement('div');
    node.setAttribute('LeisureOutput', '');
    node.setAttribute('Leisure', '');
    node.setAttribute('LeisureBox', '');
    node.setAttribute('class', 'output');
    node.setAttribute('contentEditable', 'false');
    node.source = source;
    source.output = node;
    node.innerHTML = "<button onclick='Notebook.evalOutput(this.parentNode)'>-&gt;</button>";
    node.appendChild(textNode(' \n'));
    source.parentNode.insertBefore(node, source.nextSibling);
    return node;
  };

  codeSpan = function codeSpan(text, boxType) {
    var node;
    node = document.createElement('span');
    node.setAttribute(boxType, '');
    node.setAttribute('Leisure', '');
    node.setAttribute('class', boxType);
    node.appendChild(textNode(text));
    return node;
  };

  codeBox = function codeBox(boxType) {
    var node;
    node = document.createElement('div');
    node.setAttribute(boxType, '');
    node.setAttribute('LeisureBox', '');
    node.setAttribute('Leisure', '');
    node.setAttribute('class', boxType);
    node.addEventListener('compositionstart', function(e) {
      return checkMutate(e);
    });
    return node;
  };

  box = function box(range, boxType, empty) {
    var node;
    node = codeBox(boxType);
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
    txt = el.textContent;
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
    var bodyStart, defType, endPat, ex, exEnd, leading, leadingSpaces, m, mainEnd, mainStart, matchStart, matched, name, nameEnd, nameRaw, next, outerRange, rest1, _ref, _ref2, _ref3;
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
        mainStart = def === '=' ? restOff + m.index + m[0].length : matchStart + ((_ref3 = leading != null ? leading.length : void 0) != null ? _ref3 : 0);
        ex = txt.substring(mainStart, mainEnd).match(/^(.*[^ \n])[ \n]*$/);
        exEnd = ex ? mainStart + ex[1].length : mainEnd;
        outerRange = makeRange(el, mainStart, exEnd);
        if (leading.match(/@auto/)) outerRange.leisureAuto = true;
        return [outerRange, null, null, txt.substring(mainStart, exEnd), next];
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
    return node.nodeName === 'BR' || (node.nodeType === 1 && getComputedStyle(node, null).display === 'block' && node.childNodes.length > 0);
  };

  req = function req(file, cont) {
    var name, s;
    if (!(file.match(/\.js$/))) file = "" + file + ".js";
    name = file.substring(0, file.length - 3);
    s = document.createElement('script');
    s.setAttribute('src', file);
    s.addEventListener('load', function() {
      Leisure.processDefs(global[name], global);
      return cont(_false());
    });
    return document.head.appendChild(s);
  };

  postLoadQueue = [];

  queueAfterLoad = function queueAfterLoad(func) {
    return postLoadQueue.push(func);
  };

  evalDoc = function evalDoc(el) {
    var auto, pgm, _ref;
    _ref = initNotebook(el), pgm = _ref[0], auto = _ref[1];
    try {
      if (auto) {
        auto = "do\n  " + (auto.trim().replace(/\n/, '\n  ')) + "\n  finishLoading 'fred'";
        Notebook.queueAfterLoad(function() {
          return Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false)), global);
        });
        return Leisure.eval(ReplCore.generateCode('_auto', auto, false));
      } else {
        return Leisure.processDefs(Leisure.eval(ReplCore.generateCode('_doc', pgm, false)), global);
      }
    } catch (err) {
      return alert(err.stack);
    }
  };

  Leisure.define('finishLoading', function(bubba) {
    return Prim.makeMonad('end', function(env, cont) {
      var i, _i, _len;
      for (_i = 0, _len = postLoadQueue.length; _i < _len; _i++) {
        i = postLoadQueue[_i];
        i();
      }
      postLoadQueue = [];
      return cont(_false());
    });
  });

  Prim.defaultEnv.require = req;

  root.initNotebook = initNotebook;

  root.bindNotebook = bindNotebook;

  root.evalOutput = evalOutput;

  root.cleanOutput = cleanOutput;

  root.envFor = envFor;

  root.queueAfterLoad = queueAfterLoad;

  root.evalDoc = evalDoc;

}).call(this);
