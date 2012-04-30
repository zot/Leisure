
/*
# use an element as a Leisure notebook
*/

(function() {
  var Leisure, Prim, ReplCore, addsLine, bindNotebook, box, checkMutateFromModification, checkMutateToDef, cleanOutput, codeBox, codeSpan, configureSaveLink, continueRangePosition, delay, envFor, evalDoc, evalOutput, findDefs, getBox, getRangePosition, getRangeText, getRanges, grp, highlightPosition, initNotebook, insertControls, loadProgram, makeOutputBox, makeRange, makeTestBox, makeTestCase, markupDefs, nodeEnd, oldBrackets, postLoadQueue, prepExpr, queueAfterLoad, removeOldDefs, req, root, runTests, selInDef, testPat, textNode, toDefBox, toExprBox, unwrap,
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
      el.addEventListener('click', (function(e) {
        return window.setTimeout(highlightPosition, 1);
      }), true, true);
      el.addEventListener('keydown', function(e) {
        var _ref;
        if ((_ref = e.charCode || e.keyCode || e.which) === 37 || _ref === 38 || _ref === 39 || _ref === 40) {
          return window.setTimeout(highlightPosition, 1);
        }
      });
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
        } else if (r.startContainer.parentNode === el) {
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
        return window.setTimeout(highlightPosition, 1);
      });
    }
  };

  oldBrackets = [null, Leisure.Nil];

  highlightPosition = function highlightPosition() {
    var ast, b, brackets, contents, node, offset, parent, pos, r, s, span, tr, txt, _i, _len, _ref, _ref2;
    s = window.getSelection();
    if (!s.rangeCount) return;
    r = s.getRangeAt(0);
    parent = getBox(r.startContainer);
    if (!(parent != null) || (parent.getAttribute('LeisureOutput') != null)) {
      return;
    }
    tr = document.createRange();
    tr.setStart(parent, 0);
    tr.setEnd(r.endContainer, r.endOffset);
    pos = getRangeText(tr).length;
    txt = parent.textContent;
    ast = (Leisure.compileNext(txt, Leisure.Nil, true, null, true))[0];
    offset = (_ref = ast.leisureDefPrefix) != null ? _ref : 0;
    brackets = Leisure.bracket(ast, pos + offset);
    if (oldBrackets[0] !== parent || !oldBrackets[1].equals(brackets)) {
      oldBrackets = [parent, brackets];
      _ref2 = document.querySelectorAll("[LeisureBrackets]");
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        node = _ref2[_i];
        unwrap(node);
      }
      parent.normalize();
      if (ast != null) {
        b = brackets;
        while (b !== Leisure.Nil) {
          span = document.createElement('span');
          span.setAttribute('LeisureBrackets', '');
          span.setAttribute('class', b === brackets ? 'LeisureFunc' : 'LeisureArg');
          r = makeRange(parent, b.head.head - offset, b.head.tail.head - offset);
          contents = r.cloneContents();
          r.deleteContents();
          r.insertNode(span);
          span.appendChild(contents);
          b = b.tail;
        }
      }
      s.removeAllRanges();
      parent.normalize();
      return s.addRange(makeRange(parent, pos, pos));
    }
  };

  getRangeText = function getRangeText(r) {
    return r.cloneContents().textContent;
  };

  getBox = function getBox(node) {
    while ((node != null) && !((typeof node.getAttribute === "function" ? node.getAttribute('LeisureBox') : void 0) != null)) {
      node = node.parentElement;
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
    insertControls(el);
    return pgm;
  };

  insertControls = function insertControls(el) {
    var controlDiv, downloadLink, loadButton, processButton, testButton, viewLink;
    controlDiv = document.createElement('DIV');
    controlDiv.setAttribute('LeisureOutput', '');
    controlDiv.setAttribute('contentEditable', 'false');
    loadButton = document.createElement('INPUT');
    loadButton.setAttribute('type', 'file');
    loadButton.addEventListener('change', function(evt) {
      return loadProgram(el, loadButton.files);
    });
    downloadLink = document.createElement('A');
    downloadLink.innerHTML = "Download";
    downloadLink.setAttribute('download', 'program.lsr');
    viewLink = document.createElement('A');
    viewLink.innerHTML = "View";
    viewLink.setAttribute('target', '_blank');
    testButton = document.createElement('BUTTON');
    testButton.innerHTML = "Run Tests";
    testButton.addEventListener('click', function() {
      return runTests(el);
    });
    processButton = document.createElement('BUTTON');
    processButton.innerHTML = "Process";
    processButton.addEventListener('click', function() {
      return evalDoc(el);
    });
    processButton.setAttribute('style', 'float:right');
    controlDiv.appendChild(textNode('Load: '));
    controlDiv.appendChild(loadButton);
    controlDiv.appendChild(textNode(' '));
    controlDiv.appendChild(downloadLink);
    controlDiv.appendChild(textNode(' '));
    controlDiv.appendChild(viewLink);
    controlDiv.appendChild(textNode(' '));
    controlDiv.appendChild(testButton);
    controlDiv.appendChild(processButton);
    el.leisureDownloadLink = downloadLink;
    el.leisureViewLink = viewLink;
    el.insertBefore(controlDiv, el.firstChild);
    return configureSaveLink(el);
  };

  loadProgram = function loadProgram(el, files) {
    var fr;
    el = getBox;
    fr = new FileReader();
    fr.onloadend = function onloadend(evt) {
      el.innerHTML = Repl.escapeHtml(fr.result);
      return initNotebook(el);
    };
    return fr.readAsBinaryString(files.item(0));
  };

  configureSaveLink = function configureSaveLink(el) {
    var blob, builder, c, r;
    window.URL = window.URL || window.webkitURL;
    builder = new WebKitBlobBuilder();
    r = document.createRange();
    r.selectNode(el);
    c = r.cloneContents().firstChild;
    removeOldDefs(c);
    builder.append(c.textContent);
    blob = builder.getBlob('text/plain');
    el.leisureDownloadLink.href = window.URL.createObjectURL(blob);
    return el.leisureViewLink.href = window.URL.createObjectURL(blob);
  };

  runTests = function runTests(el) {
    return alert('run tests');
  };

  unwrap = function unwrap(node) {
    var parent;
    parent = node.parentNode;
    while (node.firstChild != null) {
      parent.insertBefore(node.firstChild, node);
    }
    return parent.removeChild(node);
  };

  removeOldDefs = function removeOldDefs(el) {
    var extracted, m, node, txt, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3;
    el.leisureDownloadLink = null;
    el.leisureViewLink = null;
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
      if (addsLine(node) && (node.firstChild != null)) {
        extracted.push(node.firstChild);
      }
      unwrap(node);
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
    var auto, bod, body, bx, def, i, main, name, pgm, s, test, tests, _i, _j, _len, _len2;
    pgm = '';
    auto = '';
    for (_i = 0, _len = defs.length; _i < _len; _i++) {
      i = defs[_i];
      main = i[0], name = i[1], def = i[2], body = i[3], tests = i[4];
      if (name != null) {
        bod = codeSpan(body, 'codeBody');
        bod.appendChild(textNode('\n'));
        bod.setAttribute('generatedNL', '');
        bx = box(main, 'codeMain', true);
        bx.appendChild(codeSpan(name, 'codeName'));
        bx.appendChild(textNode(def));
        bx.appendChild(bod);
        pgm += "" + name + " " + def + " " + body + "\n";
      } else if (main.leisureTest) {
        s = codeSpan(body, 'codeTest');
        s.appendChild(textNode('\n'));
        s.setAttribute('generatedNL', '');
        bx = box(main, 'codeMainTest', true);
        bx.setAttribute('class', 'codeMainTest green');
        bx.appendChild(s);
      } else {
        if (main.leisureAuto) auto += "" + body + "\n";
        s = codeSpan(body, 'codeExpr');
        s.appendChild(textNode('\n'));
        s.setAttribute('generatedNL', '');
        bx = box(main, 'codeMainExpr', true);
        bx.appendChild(s);
        makeOutputBox(bx);
      }
      for (_j = 0, _len2 = tests.length; _j < _len2; _j++) {
        test = tests[_j];
        console.log("TEST: " + (JSON.stringify(test.leisureTest)));
      }
    }
    return [pgm, auto];
  };

  textNode = function textNode(text) {
    return document.createTextNode(text);
  };

  evalOutput = function evalOutput(exBox) {
    var d;
    exBox = getBox(exBox);
    cleanOutput(exBox);
    d = document.createElement('div');
    d.setAttribute('style', 'float: right');
    d.innerHTML = "<button onclick='Notebook.makeTestCase(this)'>Make test case</button><button onclick='Notebook.cleanOutput(this)'>X</button>";
    exBox.firstChild.appendChild(d);
    return ReplCore.processLine(prepExpr(exBox.source.textContent), envFor(exBox));
  };

  cleanOutput = function cleanOutput(exBox) {
    var fc, _results;
    exBox = getBox(exBox);
    fc = exBox.firstChild;
    while (fc.firstChild.nextSibling !== fc.lastChild) {
      fc.removeChild(fc.lastChild);
    }
    _results = [];
    while (exBox.firstChild !== exBox.lastChild) {
      _results.push(exBox.removeChild(exBox.lastChild));
    }
    return _results;
  };

  makeTestCase = function makeTestCase(exBox) {
    var box, output, source, test;
    output = getBox(exBox);
    source = output.source;
    test = {
      expr: source.textContent,
      result: Repl.escapeHtml(Pretty.print(output.result))
    };
    box = makeTestBox("#@test " + (JSON.stringify(test)));
    source.parentNode.insertBefore(box, source);
    source.parentNode.removeChild(source);
    return output.parentNode.removeChild(output);
  };

  makeTestBox = function makeTestBox(src) {
    var bx, s;
    s = codeSpan(src, 'codeTest');
    s.appendChild(textNode('\n'));
    s.setAttribute('generatedNL', '');
    bx = codeBox('codeMainTest');
    bx.setAttribute('class', 'codeMainTest white');
    bx.appendChild(s);
    return bx;
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
      },
      processResult: function processResult(result) {
        return box.result = result;
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
    node.innerHTML = "<div><div style='float: left'><button onclick='Notebook.evalOutput(this)'>-&gt;</button></div><button style='visibility: hidden'></button></div>";
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

  testPat = /#@test([^\n]*)\n/;

  getRanges = function getRanges(el, txt, rest, def, restOff) {
    var bodyStart, defType, endPat, ex, exEnd, leading, leadingSpaces, m, m2, mainEnd, mainStart, matchStart, matched, name, nameEnd, nameRaw, next, outerRange, r, rest1, t, tests, _ref, _ref2, _ref3;
    _ref = m = def, matched = _ref[0], leading = _ref[1], nameRaw = _ref[2], defType = _ref[3];
    if (!rest.trim()) {
      return null;
    } else if (!(m != null)) {
      return [makeRange(el, restOff, txt.length), null, null, [], ''];
    } else {
      tests = [];
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
      t = leading;
      while (m2 = t.match(/#@test([^\n]*)\n/)) {
        r = makeRange(el, restOff + m2.index, restOff + m2[0].length);
        r.leisureTest = JSON.parse(m2[1]);
        tests.push(r);
        t = t.substring(m.index + m2[0].length);
      }
      if (name != null) {
        mainStart = matchStart + ((_ref2 = leading != null ? leading.length : void 0) != null ? _ref2 : 0);
        nameEnd = mainStart + name.length;
        leadingSpaces = (rest1.match(/^\s*/))[0].length;
        bodyStart = txt.length - (rest1.length - leadingSpaces);
        outerRange = makeRange(el, mainStart, mainEnd);
        return [outerRange, txt.substring(mainStart, nameEnd), defType, txt.substring(bodyStart, mainEnd), tests, next];
      } else {
        mainStart = def === '=' ? restOff + m.index + m[0].length : matchStart + ((_ref3 = leading != null ? leading.length : void 0) != null ? _ref3 : 0);
        ex = txt.substring(mainStart, mainEnd).match(/^(.*[^ \n])[ \n]*$/);
        exEnd = ex ? mainStart + ex[1].length : mainEnd;
        outerRange = makeRange(el, mainStart, exEnd);
        if (leading.match(/@auto/)) outerRange.leisureAuto = true;
        return [outerRange, null, null, txt.substring(mainStart, exEnd), tests, next];
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

  root.makeTestCase = makeTestCase;

  root.cleanOutput = cleanOutput;

  root.envFor = envFor;

  root.queueAfterLoad = queueAfterLoad;

  root.evalDoc = evalDoc;

  root.getBox = getBox;

}).call(this);
