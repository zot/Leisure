
/*
# use an element as a Leisure notebook
*/

(function() {
  var BS, DEL, DOWN_ARROW, END, ENTER, ESC, HOME, LEFT_ARROW, Leisure, PAGE_DOWN, PAGE_UP, Prim, RIGHT_ARROW, Repl, ReplCore, TAB, UP_ARROW, Xus, acceptCode, addBoxClasses, addDefControls, addsLine, arrows, autoRun, baseElements, basePresentValue, baseStrokeWidth, bindNotebook, bootNotebook, box, boxClasses, buttonClasses, c, changeTheme, changeView, checkDeleteExpr, checkHideSource, checkMutateFromModification, cleanEmptyNodes, cleanOutput, clearAst, clearOutputBox, clearUpdates, clickTest, closeWindow, codeBox, codeFocus, codeSpan, configureSaveLink, continueRangePosition, createFragment, createNode, createPeer, debug, delay, docFocus, envFor, evalBox, evalDoc, evalDocCode, evalOutput, findCurrentCodeHolder, findDefs, findUpdateSelector, focusBox, getAst, getBox, getElementCode, getElements, getExprSource, getMDDocument, getMaxStrokeWidth, getRangePosition, getRangeText, getRanges, getSvgElement, grp, handleKey, hasFunc, head, highlightNotebookFunction, highlightPosition, id, ignoreDeleteOutputBox, initNotebook, insertControls, isDef, isLeisureCode, isOutput, laz, leisureContextString, linkSource, loadProgram, makeId, makeLabel, makeOption, makeOutputBox, makeOutputControls, makeRange, makeTestBox, makeTestCase, markPartialApplies, markupButton, markupButtons, markupDefs, mergeLeisureCode, nextId, nextSibling, nodeEnd, nodeFor, nonprintable, oldBrackets, owner, patchFuncAst, peer, peerGetDocument, peerGetFunctions, peerNotifySelection, postLoadQueue, prepExpr, presentLeisureCode, presentValue, previousBoxRangeInternal, previousBoxRangeStart, previousSibling, primSvgMeasure, primconcatNodes, printable, printableControlCharacters, queueAfterLoad, remove, removeBoxClasses, removeOldDefs, replaceRange, req, root, runTest, runTests, setAst, setSnapper, setUpdate, showAst, showError, showResult, showSource, skipLeftOverOutputBox, snapshot, svgBetterMeasure, svgMeasure, svgMeasureText, tail, testPat, textNode, toDefBox, toExprBox, toggleEdit, transformStrokeWidth, transformedPoint, unwrap, update, updatePat, wrapRange, xusEnv,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if ((typeof window !== "undefined" && window !== null) && (!(typeof global !== "undefined" && global !== null) || global === window)) {
    window.global = window;
    Leisure = window.Leisure;
    ReplCore = window.ReplCore;
    window.Notebook = root = {};
    Prim = window.Prim;
    Repl = window.Repl;
    Xus = window.Xus;
  } else {
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
  }

  debug = false;

  BS = 8;

  TAB = 9;

  ENTER = 13;

  ESC = 27;

  PAGE_UP = 33;

  PAGE_DOWN = 34;

  END = 35;

  HOME = 36;

  LEFT_ARROW = 37;

  UP_ARROW = 38;

  RIGHT_ARROW = 39;

  DOWN_ARROW = 40;

  DEL = 46;

  arrows = [37, 38, 39, 40];

  updatePat = /(^|\n)(#@update )([^\n]+)(?:^|\n)/;

  peer = null;

  nextId = 0;

  snapshot = function snapshot(el, pgm) {};

  setSnapper = function setSnapper(snapFunc) {
    return snapshot = snapFunc;
  };

  delay = function delay(func) {
    return window.setTimeout(func, 1);
  };

  basePresentValue = null;

  presentValue = function presentValue(v) {
    var content;
    if ((ReplCore.getType(v)) === 'svgNode') {
      content = v(laz(id));
      return _svgPresent()(laz(content))(laz(id));
    } else {
      return basePresentValue(v);
    }
  };

  bootNotebook = function bootNotebook(el) {
    if (!((document.getElementById('channelList')) != null)) {
      document.body.appendChild(createNode("<datalist id='channelList'>\n   <option value=''></option>\n   <option value='app'>app</option>\n   <option value='compile'>compile</option>\n   <option value='editorFocus'>editorFocus</option>\n</datalist>"));
    }
    return createPeer();
  };

  closeWindow = function closeWindow() {
    console.log("CLOSING WINDOW");
    window.open('', '_self', '');
    return window.close();
  };

  createPeer = function createPeer() {
    var k, param, params, server, v, _i, _len, _ref, _ref2;
    root.xusServer = server = new Xus.Server();
    server.exit = function exit() {
      return closeWindow();
    };
    peer = root.peer = Xus.createDirectPeer(server);
    peer.server = server;
    peer.listen('leisure/selection/contents', true, function(key, value) {
      var node, r, s;
      if (key === 'leisure/selection/contents') {
        s = window.getSelection();
        if (s.rangeCount && s.toString() !== value) {
          r = s.getRangeAt(0);
          r.deleteContents();
          node = document.createTextNode(value.toString());
          r.insertNode(node);
          s.removeAllRanges();
          r.selectNode(node);
          return s.addRange(r);
        }
      }
    });
    peer.set('leisure/evalExpr', null, 'transient');
    peer.listen('leisure/evalExpr', false, function(key, value) {
      var expr, result;
      if (key === 'leisure/evalExpr' && (value != null)) {
        expr = value[0], result = value[1];
        console.log("EVAL: " + expr + ", RESULT: " + result);
        return ReplCore.processLine(expr, xusEnv(result, expr), 'Parse.');
      }
    });
    peer.set('leisure/document', peerGetDocument);
    peer.set('leisure/functions', peerGetFunctions);
    if (document.location.hash) {
      params = {};
      _ref = document.location.hash.substring(1).split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        _ref2 = param.split('='), k = _ref2[0], v = _ref2[1];
        params[k.toLowerCase()] = decodeURIComponent(v);
      }
      if (params.xusproxy != null) return Xus.xusToProxy(server, params.xusproxy);
    }
  };

  xusEnv = function xusEnv(resultVar, expr) {
    var result;
    result = '';
    return {
      debug: debug,
      finishedEvent: function finishedEvent() {},
      owner: null,
      require: req,
      write: function write(msg) {
        return result += "" + msg + "\n";
      },
      prompt: function prompt(msg, cont) {
        return result += "Attempt to prompt with " + msg;
      },
      processResult: function processResult(res, ast) {
        result += res;
        return peer.set(resultVar, result);
      },
      presentValue: function presentValue(x) {
        return x;
      },
      processError: function processError(ast) {
        result += ast.err.leisureContext ? "ERROR: " + ast.err + ":\n" + (leisureContextString(ast.err)) + "\n" + ast.err.stack : "Couldn't parse: " + expr;
        return peer.set(resultVar, result);
      }
    };
  };

  peerGetDocument = function peerGetDocument() {
    var nodes;
    nodes = document.querySelectorAll("[leisurenode='code']");
    if (nodes.length > 1 || Notebook.md) {
      return getMDDocument();
    } else {
      return getSimpleDocument();
    }
  };

  peerGetFunctions = function peerGetFunctions() {
    return (_.uniq(window.leisureFuncNames.toArray().sort(), true)).sort();
  };

  getMDDocument = function getMDDocument(nodes) {
    var doc, md, node, _i, _j, _len, _len2, _ref, _ref2, _ref3;
    md = '';
    _ref = document.querySelectorAll('[doc]');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      doc = _ref[_i];
      _ref2 = doc.childNodes;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        node = _ref2[_j];
        md += isLeisureCode(node) ? "```\n" + (getElementCode(node)) + "\n```\n" : (_ref3 = node.md) != null ? _ref3 : '';
      }
    }
    return md;
  };

  makeId = function makeId(el) {
    if (!el.id) return el.id = "Leisure-" + (nextId++);
  };

  bindNotebook = function bindNotebook(el) {
    if (!basePresentValue) {
      basePresentValue = Prim.defaultEnv.presentValue;
      Prim.defaultEnv.presentValue = presentValue;
      Prim.defaultEnv.write = function write(msg) {
        return console.log(msg);
      };
      Prim.defaultEnv.owner = document.body;
      Prim.defaultEnv.finishedEvent = function finishedEvent(evt, channel) {
        return update(channel != null ? channel : 'app', Prim.defaultEnv);
      };
      Prim.defaultEnv.debug = debug;
    }
    if (!(el.bound != null)) {
      makeId(el);
      el.bound = true;
      el.addEventListener('DOMCharacterDataModified', (function(evt) {
        if (!el.replacing) {
          return delay(function() {
            return checkMutateFromModification(evt);
          });
        }
      }), true);
      el.addEventListener('DOMSubtreeModified', (function(evt) {
        if (!el.replacing) {
          return delay(function() {
            return checkMutateFromModification(evt);
          });
        }
      }), true);
      el.addEventListener('mousedown', (function(e) {
        return delay(highlightPosition);
      }), true);
      el.addEventListener('mousemove', (function(e) {
        return delay(highlightPosition);
      }), true);
      el.addEventListener('mouseup', (function(e) {
        return delay(highlightPosition);
      }), true);
      el.addEventListener('keydown', function(e) {
        var c, r, s;
        c = e.charCode || e.keyCode || e.which;
        if (c === DEL || c === BS) {
          s = window.getSelection();
          r = s.getRangeAt(0);
          if (c === BS) {
            checkDeleteExpr(getBox(r.startContainer));
            if (skipLeftOverOutputBox(el, r)) return e.preventDefault();
          } else if (c === DEL) {
            checkDeleteExpr(getBox(r.startContainer));
            if (ignoreDeleteOutputBox(el, r)) return e.preventDefault();
          }
        }
        if (printable(c)) clearAst(getBox(window.getSelection().focusNode));
        if ((__indexOf.call(arrows, c) >= 0) || printable(c)) {
          delay(highlightPosition);
        }
        if (e.ctrlKey && c === ENTER) {
          return handleKey("C-ENTER");
        } else if (e.altKey && c === ENTER) {
          return handleKey("M-ENTER");
        } else if (c === TAB) {
          handleKey("TAB");
          return e.preventDefault();
        }
      });
      el.addEventListener('keypress', function(e) {
        var br, bx, r, s, sp;
        s = window.getSelection();
        r = s.getRangeAt(0);
        if ((e.charCode || e.keyCode || e.which) === ENTER) {
          br = textNode('\n');
          r.insertNode(br);
          r = document.createRange();
          r.setStart(br, 1);
          s.removeAllRanges();
          s.addRange(r);
          return e.preventDefault();
        } else if (r.startContainer.parentNode === el) {
          sp = codeSpan('\n', 'codeExpr');
          sp.setAttribute('generatedNL', '');
          bx = box(s.getRangeAt(0), 'codeMainExpr', true);
          bx.appendChild(sp);
          makeOutputBox(bx);
          r = document.createRange();
          r.setStart(sp, 0);
          s.removeAllRanges();
          return s.addRange(r);
        }
      });
      el.addEventListener('focus', (function() {
        return findCurrentCodeHolder();
      }), true);
      el.addEventListener('blur', (function() {
        return findCurrentCodeHolder();
      }), true);
      if (window.leisureAutoRunAll) {
        autoRun(el, true);
        return window.setTimeout((function() {
          return runTests(el);
        }), 1);
      } else {
        return el.autorunState = false;
      }
    }
  };

  checkDeleteExpr = function checkDeleteExpr(node) {
    var out;
    if (isOutput(node && node.output)) {
      out = node.output;
      return window.setTimeout((function() {
        if (!node.textContent.trim()) node.parentNode.removeChild(node);
        if (!(node.parentNode != null) && ((out != null ? out.parentNode : void 0) != null)) {
          return out.parentNode.removeChild(out);
        }
      }), 1);
    }
  };

  skipLeftOverOutputBox = function skipLeftOverOutputBox(el, r) {
    var box, s;
    el.normalize();
    box = previousBoxRangeInternal(r) || previousBoxRangeStart(r);
    if (isOutput(box)) {
      s = window.getSelection();
      r.selectNode(box);
      r.collapse(true);
      s.removeAllRanges();
      s.addRange(r);
      return true;
    } else {
      return false;
    }
  };

  previousBoxRangeInternal = function previousBoxRangeInternal(r) {
    return r.startContainer.nodeType === 1 && r.startOffset > 0 && r.startContainer.childNodes[r.startOffset - 1];
  };

  previousBoxRangeStart = function previousBoxRangeStart(r) {
    return r.startContainer.nodeType === 3 && r.startOffset === 0 && previousSibling(r.startContainer);
  };

  ignoreDeleteOutputBox = function ignoreDeleteOutputBox(el, r) {
    var n;
    el.normalize();
    if (r.startContainer.nodeType === 3 && r.startOffset === r.startContainer.length) {
      n = r.startContainer;
      while (n && n.nextSibling === null) {
        n = n.parentNode;
      }
      return isOutput(n != null ? n.nextSibling : void 0);
    } else {
      return false;
    }
  };

  isOutput = function isOutput(el) {
    return (el != null ? el.nodeType : void 0) === 1 && el.hasAttribute('LeisureOutput');
  };

  isLeisureCode = function isLeisureCode(el) {
    return (el != null ? el.nodeType : void 0) === 1 && el.getAttribute('leisureNode') === 'code';
  };

  peerNotifySelection = function peerNotifySelection(el, str) {
    peer.set('leisure/selection/id', (el ? el.id : null));
    return peer.set('leisure/selection/contents', str);
  };

  printableControlCharacters = (function() {
    var _i, _len, _ref, _results;
    _ref = "\r\i\n\b";
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      c = _ref[_i];
      _results.push(c.charCodeAt(0));
    }
    return _results;
  })();

  printable = function printable(code) {
    return (code > 0xf && code < 37) || code > 40 || __indexOf.call(printableControlCharacters, code) >= 0;
  };

  nonprintable = null;

  (function() {
    var i, s;
    s = '';
    for (i = 0; 0 <= 0xf ? i <= 0xf : i >= 0xf; 0 <= 0xf ? i++ : i--) {
      s += String.fromCharCode(i);
    }
    s.replace(/[\i\r\f]/g, '');
    return nonprintable = new RegExp("[" + s + "]");
  })();

  handleKey = function handleKey(key) {
    var box;
    switch (key) {
      case "C-ENTER":
      case "TAB":
        box = getBox(window.getSelection().focusNode);
        if ((box.getAttribute('codeMainExpr')) != null) {
          return evalOutput(box.output);
        } else if ((box.getAttribute('codeMain')) != null) {
          return acceptCode(box);
        }
        break;
      case "M-ENTER":
        box = getBox(window.getSelection().focusNode);
        if ((box.getAttribute('codeMainExpr')) != null) {
          return clearOutputBox(box.output);
        }
    }
  };

  clearAst = function clearAst(box) {
    var cbox;
    cbox = getBox(box);
    return cbox != null ? cbox.ast = null : void 0;
  };

  oldBrackets = [null, Parse.Nil];

  cleanEmptyNodes = function cleanEmptyNodes(el) {
    var next, prev, _ref;
    if (el.nodeType === 3 && (el.parentNode != null)) {
      return cleanEmptyNodes(el.parentNode);
    } else {
      prev = el.previousSibling;
      next = el.nextSibling;
      if (el.nodeType === 1 && el.textContent.trim() === '' && ((_ref = el.parentNode) != null ? _ref.hasAttribute('doc') : void 0)) {
        el.parentNode.removeChild(el);
      }
      if (next === nextSibling(prev)) return mergeLeisureCode(prev, next);
    }
  };

  presentLeisureCode = function presentLeisureCode(node, doEval) {
    node.setAttribute('contentEditable', 'true');
    Notebook.bindNotebook(node);
    Notebook.changeTheme(node, 'thin');
    if (doEval) {
      return Notebook.evalDoc(node);
    } else {
      return Notebook.initNotebook(node);
    }
  };

  mergeLeisureCode = function mergeLeisureCode(el1, el2) {
    var newCode, r;
    if (el1.nodeType === 1 && el2.nodeType === 3) {
      el1.appendChild(el2);
      return el1.normalize();
    } else if (el1.nodeType === 3 && el2.nodeType === 1) {
      el2.insertBefore(el1, el2.firstChild);
      return el2.normalize();
    } else if (el1.hasAttribute('leisureNode') && el1.getAttribute('leisureNode') === el2.getAttribute('leisureNode')) {
      newCode = textNode(el1.md = el1.getAttribute('leisureNode') === 'code' ? "" + (getElementCode(el1)) + "\n" + (getElementCode(el2)) : "" + el1.md + "\n" + el2.md);
      r = document.createRange();
      r.selectNodeContents(el2);
      el1.appendChild(textNode('\n'));
      el1.appendChild(r.extractContents());
      return el2.parentNode.removeChild(el2);
    }
  };

  highlightPosition = function highlightPosition() {
    var ast, b, brackets, i, node, offset, parent, pos, r, ranges, s, span, _i, _j, _len, _len2, _len3, _ref, _ref2, _ref3, _ref4, _ref5;
    parent = null;
    s = window.getSelection();
    if (s.rangeCount) {
      if (cleanEmptyNodes(s.getRangeAt(0).startContainer)) return;
      focusBox(s.focusNode);
      parent = getBox(s.focusNode);
      if (false && ((_ref = s.getRangeAt(0)) != null ? _ref.collapsed : void 0)) {
        if (!parent || isOutput(parent)) return;
        if (parent.parentNode) {
          ast = getAst(parent);
          if (ast != null) {
            offset = (_ref2 = ast.leisureCodeOffset) != null ? _ref2 : 0;
            r = s.getRangeAt(0);
            r.setStart(parent, 0);
            pos = getRangeText(r).length;
            brackets = Leisure.bracket(ast.leisureBase, pos - offset);
            if (oldBrackets[0] !== parent || !oldBrackets[1].equals(brackets)) {
              oldBrackets = [parent, brackets];
              _ref3 = document.querySelectorAll("[LeisureBrackets]");
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                node = _ref3[_i];
                unwrap(node);
              }
              _ref4 = parent.querySelectorAll(".partialApply");
              for (_j = 0, _len2 = _ref4.length; _j < _len2; _j++) {
                node = _ref4[_j];
                unwrap(node);
              }
              parent.normalize();
              markPartialApplies(parent);
              b = brackets;
              ranges = [];
              while (b !== Parse.Nil) {
                ranges.push(makeRange(parent, b.head().head() + offset, b.head().tail().head() + offset));
                b = b.tail();
              }
              for (i = 0, _len3 = ranges.length; i < _len3; i++) {
                r = ranges[i];
                span = document.createElement('span');
                span.setAttribute('LeisureBrackets', '');
                span.setAttribute('class', i === 0 ? 'LeisureFunc' : 'LeisureArg');
                wrapRange(r, span);
              }
              s.removeAllRanges();
              s.addRange(makeRange(parent, pos));
            }
          }
        }
      }
      if ((parent != null ? (_ref5 = parent.ast) != null ? _ref5.leisureName : void 0 : void 0) != null) {
        update("sel-" + parent.ast.leisureName);
      }
      return peerNotifySelection(parent, s.toString());
    }
  };

  wrapRange = function wrapRange(range, node) {
    var contents;
    try {
      return range.surroundContents(node);
    } catch (err) {
      contents = range.cloneContents();
      replaceRange(range, node);
      return node.appendChild(contents);
    }
  };

  replaceRange = function replaceRange(range, node) {
    range.deleteContents();
    return range.insertNode(node);
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

  checkMutateFromModification = function checkMutateFromModification(evt) {
    var b, b2;
    b = getBox(evt.target);
    b2 = getBox(window.getSelection().focusNode);
    if (b && b === b2) {
      if ((isDef(b)) && b.classList.contains('codeMainExpr')) {
        return toDefBox(b);
      } else if (!(isDef(b)) && b.classList.contains('codeMain')) {
        return toExprBox(b);
      }
    }
  };

  buttonClasses = 'ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only'.split(' ');

  boxClasses = {
    codeMainExpr: ['codeMainExpr', 'ui-widget', 'ui-widget-content', 'ui-corner-all'],
    codeMain: ['codeMain', 'ui-widget', 'ui-widget-content', 'ui-corner-all'],
    codeMainTest: ['codeMainTest'],
    output: ['output', 'ui-widget', 'ui-widget-content', 'ui-corner-all']
  };

  addBoxClasses = function addBoxClasses(box, type) {
    var cl, _i, _len, _ref, _results;
    box.setAttribute(type, '');
    _ref = boxClasses[type];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cl = _ref[_i];
      _results.push(box.classList.add(cl));
    }
    return _results;
  };

  removeBoxClasses = function removeBoxClasses(box, type) {
    var cl, _i, _len, _ref, _results;
    box.removeAttribute(type);
    _ref = boxClasses[type];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cl = _ref[_i];
      _results.push(box.classList.remove(cl));
    }
    return _results;
  };

  toExprBox = function toExprBox(b) {
    var node, _i, _len, _ref;
    removeBoxClasses(b, 'codeMain');
    addBoxClasses(b, 'codeMainExpr');
    _ref = b.querySelectorAll('.astbutton');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      remove(node);
    }
    return makeOutputBox(b);
  };

  toDefBox = function toDefBox(b) {
    if (b.output) remove(b.output);
    removeBoxClasses(b, 'codeMainExpr');
    addBoxClasses(b, 'codeMain');
    return addDefControls(b);
  };

  addDefControls = function addDefControls(box) {
    var btn;
    btn = createNode("<button onclick='Notebook.showAst(this.parentNode)' class='astbutton' title='Show AST'></button>");
    markupButton(btn);
    return box.appendChild(btn);
  };

  remove = function remove(node) {
    var _ref;
    return (_ref = node.parentNode) != null ? _ref.removeChild(node) : void 0;
  };

  showAst = function showAst(box) {
    var name, node, output;
    name = (getAst(box)).leisureName;
    if (box.astOut != null) {
      remove(box.astOut.output);
      remove(box.astOut);
      return box.astOut = null;
    } else if (name != null) {
      node = codeBox('codeMainExpr');
      box.astOut = node;
      node.setAttribute('leisureOutput', '');
      box.parentNode.insertBefore(node, box.nextSibling);
      node.textContent = "#@update sel-" + name + "\ntreeForNotebook " + name + " \\attrs ast .\n  [['onclick' | concat[\"Notebook.highlightNotebookFunction('" + (name.trim()) + "', \" (astStart ast) \", \" (astEnd ast) \")\"]] | attrs]";
      console.log("SVG EVENT: " + node.textContent);
      output = makeOutputBox(node);
      toggleEdit(output);
      return evalOutput(output, true);
    }
  };

  highlightNotebookFunction = function highlightNotebookFunction(funcName, start, stop) {
    var box, offset, sel, _ref;
    box = document.body.querySelector("[leisurefunc=" + funcName + "]");
    offset = (_ref = getAst(box).leisureCodeOffset) != null ? _ref : 0;
    console.log("select " + start + "-" + stop);
    sel = window.getSelection();
    sel.removeAllRanges();
    return sel.addRange(makeRange(box, start + offset, stop + offset));
  };

  isDef = function isDef(box) {
    var defType, leading, m, matched, name, txt;
    txt = box.textContent;
    if ((m = txt.match(Leisure.linePat))) {
      matched = m[0], leading = m[1], name = m[2], defType = m[3];
      return (defType != null ? defType.length : void 0) > 0;
    }
    return false;
  };

  initNotebook = function initNotebook(el) {
    var pgm;
    ReplCore.setNext(function() {
      return 3;
    });
    el.replacing = true;
    removeOldDefs(el);
    pgm = markupDefs(el, findDefs(el));
    /*
      if !(el?.lastChild?.nodeType == 3 and el.lastChild.data[el.lastChild.data.length - 1] == '\n')
        el.appendChild textNode('\n')
        el.appendChild textNode('\n')
        el.appendChild textNode('\n')
    */
    el.normalize();
    el.replacing = false;
    if (!el.hasAttribute('noLeisureBar')) {
      insertControls(el);
      el.testResults.innerHTML = pgm[2];
    }
    snapshot(el, pgm);
    return pgm;
  };

  makeLabel = function makeLabel(text, c) {
    var node;
    node = document.createElement('SPAN');
    node.innerHTML = text;
    node.setAttribute('class', c);
    return node;
  };

  makeOption = function makeOption(name) {
    var opt;
    opt = document.createElement('OPTION');
    opt.text = name;
    return opt;
  };

  createNode = function createNode(txt) {
    var scratch;
    scratch = document.createElement('DIV');
    scratch.innerHTML = txt;
    return scratch.firstChild;
  };

  createFragment = function createFragment(txt) {
    var frag, scratch;
    scratch = document.createElement('DIV');
    scratch.innerHTML = txt;
    frag = document.createDocumentFragment();
    while (scratch.firstChild) {
      frag.appendChild(scratch.firstChild);
    }
    return frag;
  };

  insertControls = function insertControls(el) {
    var controlDiv, loadButton, processButton, spacer, testButton, themeSelect, viewSelect, _ref, _ref2;
    controlDiv = createNode("<div LeisureOutput contentEditable='false' class='leisure_bar'><div class=\"leisure_bar_contents\">\n  <span class='leisure_load'>Load: </span>\n  <input type='file' leisureId='loadButton'></input>\n  <a download='program.lsr' leisureId='downloadLink'>Download</a>\n  <a target='_blank' leisureId='viewLink'>View</a>\n  <button leisureId='testButton'>Run Tests</button> <span leisureId='testResults' class=\"notrun\"></span>\n  <input type='checkbox' leisureId='autorunTests'><b>Auto</b></input>\n  <span class=\"leisure_theme\">Theme: </span>\n  <select leisureId='themeSelect'>\n    <option value=thin>Thin</option>\n    <option value=gaudy>Gaudy</option>\n    <option value=cthulhu>Cthulhu</option>\n  </select>\n  <span>View: </span>\n  <select leisureId='viewSelect'>\n    <option value=coding>Coding</option>\n    <option value=debugging>Debugging</option>\n    <option value=testing>Testing</option>\n    <option value=running>Running</option>\n  </select>\n  <button leisureId='processButton' style=\"float: right\">Process</button></div>\n</div>");
    spacer = createNode("<div LeisureOutput  contentEditable='false' class='leisure_space'></div>");
    el.insertBefore(spacer, el.firstChild);
    el.insertBefore(controlDiv, el.firstChild);
    _ref = getElements(el, ['downloadLink', 'viewLink', 'loadButton', 'testButton', 'testResults', 'autorunTests', 'themeSelect', 'viewSelect', 'processButton']), el.leisureDownloadLink = _ref[0], el.leisureViewLink = _ref[1], loadButton = _ref[2], testButton = _ref[3], el.testResults = _ref[4], el.autorun = _ref[5], themeSelect = _ref[6], viewSelect = _ref[7], processButton = _ref[8];
    loadButton.addEventListener('change', function(evt) {
      return loadProgram(el, loadButton.files);
    });
    testButton.addEventListener('click', function() {
      return runTests(el);
    });
    themeSelect.value = (_ref2 = el.leisureTheme) != null ? _ref2 : 'thin';
    themeSelect.addEventListener('change', function(evt) {
      return changeTheme(el, evt.target.value);
    });
    viewSelect.addEventListener('change', function(evt) {
      return changeView(el, evt.target.value);
    });
    processButton.addEventListener('click', function() {
      return evalDoc(el);
    });
    el.autorun.checked = el.autorunState;
    el.autorun.addEventListener('change', function(evt) {
      el.autorunState = el.autorun.checked;
      if (el.autorunState) return runTests(el);
    });
    configureSaveLink(el);
    return markupButtons(controlDiv);
  };

  markupButtons = function markupButtons(el) {
    var btn, _i, _len, _ref, _results;
    _ref = el.querySelectorAll('button');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      btn = _ref[_i];
      _results.push(markupButton(btn));
    }
    return _results;
  };

  markupButton = function markupButton(btn) {
    var cl, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = buttonClasses.length; _i < _len; _i++) {
      cl = buttonClasses[_i];
      _results.push(btn.classList.add(cl));
    }
    return _results;
  };

  getElements = function getElements(el, ids) {
    var els, id, node, _i, _j, _len, _len2, _ref, _results;
    els = {};
    _ref = el.querySelectorAll('[leisureId]');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      els[node.getAttribute('leisureId')] = node;
    }
    _results = [];
    for (_j = 0, _len2 = ids.length; _j < _len2; _j++) {
      id = ids[_j];
      _results.push(els[id]);
    }
    return _results;
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
    var blob, builder;
    window.URL = window.URL || window.webkitURL;
    builder = new WebKitBlobBuilder();
    builder.append(getElementCode(el));
    blob = builder.getBlob('text/plain');
    el.leisureDownloadLink.href = window.URL.createObjectURL(blob);
    return el.leisureViewLink.href = window.URL.createObjectURL(blob);
  };

  getElementCode = function getElementCode(el) {
    var r;
    r = document.createRange();
    r.selectNode(el);
    c = r.cloneContents().firstChild;
    removeOldDefs(c);
    return c.textContent;
  };

  runTests = function runTests(el) {
    var failed, passed, resultsClass, test, _i, _len, _ref;
    passed = 0;
    failed = 0;
    _ref = el.querySelectorAll('.codeMainTest');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      test = _ref[_i];
      if (runTest(test)) {
        passed++;
      } else {
        failed++;
      }
    }
    if (el.testResults) {
      resultsClass = el.testResults.classList;
      resultsClass.remove('notrun');
      if (!failed) {
        resultsClass.remove('failed');
        resultsClass.add('passed');
        return el.testResults.innerHTML = passed;
      } else {
        resultsClass.remove('passed');
        resultsClass.add('failed');
        return el.testResults.innerHTML = "" + passed + "/" + failed;
      }
    }
  };

  changeTheme = function changeTheme(el, value) {
    var theme;
    theme = value;
    el.leisureTheme = theme;
    return el.className = theme;
  };

  changeView = function changeView(el, value) {
    debug = value === 'debugging';
    return alert('new view: ' + value + ", debug: " + debug);
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
      remove(node);
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
    el.textContent = el.textContent.replace(/\uFEFF/g, '');
    txt = el.lastChild;
    if ((txt != null ? txt.nodeType : void 0) === 3 && (m = txt.data.match(/(^|[^\n])(\n+)$/))) {
      return txt.data = txt.data.substring(0, txt.data.length - m[2].length);
    }
  };

  markupDefs = function markupDefs(el, defs) {
    var auto, bod, body, bx, def, i, main, name, pgm, s, test, tests, totalTests, _i, _j, _len, _len2;
    pgm = '';
    auto = '';
    totalTests = 0;
    for (_i = 0, _len = defs.length; _i < _len; _i++) {
      i = defs[_i];
      main = i.main, name = i.name, def = i.def, body = i.body, tests = i.tests;
      if (name != null) {
        bx = box(main, 'codeMain', true);
        bx.appendChild(codeSpan(name, 'codeName'));
        bx.appendChild(textNode(def));
        addDefControls(bx);
        bod = codeSpan(textNode(body), 'codeBody');
        bod.appendChild(textNode('\n'));
        bod.setAttribute('generatedNL', '');
        bx.appendChild(bod);
        bx.addEventListener('blur', (function() {
          return evalDoc(el);
        }), true);
        markPartialApplies(bx);
        pgm += "" + name + " " + def + " " + body + "\n";
      } else if (main != null) {
        bx = box(main, 'codeMainExpr', true);
        s = codeSpan(textNode(body), 'codeExpr');
        s.setAttribute('generatedNL', '');
        s.appendChild(textNode('\n'));
        bx.appendChild(s);
        markPartialApplies(bx);
        if (main.leisureAuto) {
          auto += "" + body + "\n";
        } else {
          makeOutputBox(bx);
        }
      }
      for (_j = 0, _len2 = tests.length; _j < _len2; _j++) {
        test = tests[_j];
        replaceRange(test, makeTestBox(test.leisureTest));
        totalTests++;
      }
    }
    return [pgm, auto, totalTests];
  };

  getAst = function getAst(bx, def) {
    var _ref;
    if (bx.ast != null) {
      patchFuncAst(bx.ast);
      bx.setAttribute('leisureFunc', (_ref = bx.ast.leisureName) != null ? _ref : '');
      return bx.ast;
    } else {
      def = def || bx.textContent;
      setAst(bx, (Leisure.compileNext(def, Parse.Nil, true, null))[0]);
      return bx.ast;
    }
  };

  setAst = function setAst(bx, ast) {
    bx.ast = ast;
    return patchFuncAst(ast);
  };

  patchFuncAst = function patchFuncAst(ast) {
    var parent;
    if ((ast != null ? ast.leisureName : void 0) != null) {
      parent = window[Parse.nameSub(ast.leisureName)];
      if (parent != null) {
        parent.ast = ast;
        parent.src = ast.leisureSource;
        return update("ast-" + ast.leisureName);
      }
    }
  };

  markPartialApplies = function markPartialApplies(bx, def) {
    var ast, info, offset, p, partial, r, ranges, s, t, _i, _j, _len, _len2, _ref, _results;
    bx.normalize();
    def = def != null ? def : bx.textContent;
    ast = getAst(bx, def);
    partial = [];
    ((Leisure.findFuncs(ast))(Parse.Nil)).each(function(f) {
      var arity, name, _name, _ref;
      name = Parse.getRefVar(f.head());
      arity = typeof global[_name = Parse.nameSub(name)] === "function" ? (_ref = global[_name]()) != null ? _ref.leisureArity : void 0 : void 0;
      if (arity && f.tail().head() < arity) {
        return partial.push([f.head(), arity, f.tail().head()]);
      }
    });
    if (partial.length) {
      ranges = [];
      offset = (_ref = ast.leisureCodeOffset) != null ? _ref : 0;
      t = bx.lastChild.firstChild;
      for (_i = 0, _len = partial.length; _i < _len; _i++) {
        info = partial[_i];
        p = info[0];
        r = document.createRange();
        r.setStart(t, p.leisureStart + offset);
        r.setEnd(t, p.leisureEnd + offset);
        r.expected = info[1];
        r.actual = info[2];
        ranges.push(r);
      }
      _results = [];
      for (_j = 0, _len2 = ranges.length; _j < _len2; _j++) {
        r = ranges[_j];
        c = r.extractContents();
        s = document.createElement('span');
        s.setAttribute('Leisure', '');
        s.setAttribute('expected', String(r.expected));
        s.setAttribute('actual', String(r.actual));
        s.classList.add('partialApply');
        s.appendChild(c);
        _results.push(r.insertNode(s));
      }
      return _results;
    }
  };

  textNode = function textNode(text) {
    return document.createTextNode(text);
  };

  nodeFor = function nodeFor(text) {
    if (typeof text === 'string') {
      return textNode(text);
    } else {
      return text;
    }
  };

  evalOutput = function evalOutput(exBox, nofocus) {
    var selector, stopUpdates, updateSelector, _ref;
    exBox = getBox(exBox);
    if (!nofocus) focusBox(exBox);
    cleanOutput(exBox, true);
    selector = findUpdateSelector(exBox.source);
    if (selector) exBox.setAttribute('leisureUpdate', selector);
    makeOutputControls(exBox);
    _ref = getElements(exBox.firstChild, ['chooseUpdate', 'stopUpdates']), updateSelector = _ref[0], stopUpdates = _ref[1];
    updateSelector.addEventListener('change', function(evt) {
      return setUpdate(exBox, evt.target.value);
    });
    updateSelector.addEventListener('keydown', function(e) {
      c = e.charCode || e.keyCode || e.which;
      if (c === ENTER) {
        e.preventDefault();
        return updateSelector.blur();
      }
    });
    updateSelector.value = (exBox.getAttribute('leisureUpdate')) || '';
    exBox.updateSelector = updateSelector;
    return evalBox(exBox.source, exBox);
  };

  findUpdateSelector = function findUpdateSelector(box) {
    var def, defType, leading, matched, name, u;
    if (def = box.textContent.match(Leisure.linePat)) {
      matched = def[0], leading = def[1], name = def[2], defType = def[3];
      if (u = leading.match(updatePat)) return u[3];
    }
  };

  getExprSource = function getExprSource(box) {
    var b, s;
    s = window.getSelection();
    b = getBox(s.focusNode);
    if (b !== box || !s.rangeCount || s.getRangeAt(0).collapsed) {
      return box.textContent;
    } else {
      return getRangeText(s.getRangeAt(0));
    }
  };

  setUpdate = function setUpdate(el, channel, preserveSource) {
    var ast, def, defType, index, leading, matched, name, r, txt, u;
    el.setAttribute('leisureUpdate', channel);
    ast = getAst(el.source);
    txt = el.source.textContent;
    if (!preserveSource && (def = txt.match(Leisure.linePat))) {
      matched = def[0], leading = def[1], name = def[2], defType = def[3];
      index = def.index;
      if (u = leading.match(updatePat)) {
        index += u.index + u[1].length + u[2].length;
        r = makeRange(el.source, index, index + u[3].length);
        r.deleteContents();
      } else {
        r = makeRange(el.source, index + leading.length, index + leading.length);
      }
      r.insertNode(textNode(channel));
      return el.source.normalize();
    }
  };

  checkHideSource = function checkHideSource(box) {
    var hs, _ref, _ref2;
    if (!box.hideSource && (((_ref = box.firstElementChild) != null ? (_ref2 = _ref.nextElementSibling) != null ? _ref2.nextElementSibling : void 0 : void 0) != null)) {
      box.hideSource = true;
      hs = createNode("<button class='editToggle' style='float:right'></button>");
      markupButton(hs);
      hs.addEventListener('click', function() {
        return toggleEdit(hs);
      });
      return box.firstElementChild.appendChild(hs);
    }
  };

  makeOutputControls = function makeOutputControls(exBox) {
    if (exBox.firstChild.firstChild === exBox.firstChild.lastChild) {
      exBox.firstChild.insertBefore(createFragment("<button onclick='Notebook.clearOutputBox(this)'>X</button>"), exBox.firstChild.firstChild);
      exBox.firstChild.appendChild(createFragment("<button onclick='Notebook.makeTestCase(this)' leisureId='makeTestCase'>Make test case</button><b>Update: </b><input type='text' placeholder='Click for updating' list='channelList' leisureId='chooseUpdate'></input><button onclick='Notebook.clearUpdates(this)' leisureId='stopUpdates'>Stop Updates</button>"));
      markupButtons(exBox);
      return exBox.classList.add('fatControls');
    }
  };

  toggleEdit = function toggleEdit(toggleButton) {
    var output;
    output = getBox(toggleButton);
    if (output.classList.contains('hidingSource')) {
      output.classList.remove('hidingSource');
      return output.source.style.display = '';
    } else {
      output.classList.add('hidingSource');
      return output.source.style.display = 'none';
    }
  };

  clearUpdates = function clearUpdates(widget, preserveSource) {
    var exBox;
    exBox = getBox(widget);
    exBox.updateSelector.value = '';
    return setUpdate(exBox, '', preserveSource);
  };

  update = function update(type, env) {
    var node, _i, _len, _ref, _results;
    env = env != null ? env : Prim.defaultEnv;
    _ref = env.owner.querySelectorAll("[leisureUpdate=" + type + "]");
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(evalOutput(node, true));
    }
    return _results;
  };

  clearOutputBox = function clearOutputBox(exBox) {
    clearUpdates(exBox, true);
    return cleanOutput(exBox);
  };

  cleanOutput = function cleanOutput(exBox, preserveControls) {
    var fc, _results;
    exBox = getBox(exBox);
    exBox.classList.remove('fatControls');
    if (!preserveControls) {
      exBox.hideSource = null;
      fc = exBox.firstChild;
      fc.removeChild(fc.firstChild);
      while (fc.firstChild !== fc.lastChild) {
        fc.removeChild(fc.lastChild);
      }
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
      expr: source.textContent.trim(),
      expected: Repl.escapeHtml(Parse.print(output.result))
    };
    box = makeTestBox(test, owner(exBox));
    source.parentNode.insertBefore(box, source);
    remove(source);
    remove(output);
    box.parentNode.insertBefore(textNode('\uFEFF'), box);
    box.parentNode.insertBefore(textNode('\uFEFF'), box.nextSibling);
    if (owner(box).autorunState) return clickTest(box);
  };

  makeTestBox = function makeTestBox(test, owner, src) {
    var bx, s;
    src = src != null ? src : "#@test " + (JSON.stringify(test.expr)) + "\n#@expected " + (JSON.stringify(test.expected));
    s = codeSpan(src, 'codeTest');
    s.appendChild(textNode('\n'));
    s.setAttribute('generatedNL', '');
    bx = codeBox('codeMainTest');
    bx.testSrc = s;
    bx.setAttribute('class', 'codeMainTest notrun');
    bx.setAttribute('contenteditable', 'false');
    bx.appendChild(s);
    bx.addEventListener('click', (function() {
      return clickTest(bx);
    }), true);
    bx.test = test;
    return bx;
  };

  clickTest = function clickTest(bx) {
    var exprBox, r, sp;
    if (bx.classList.contains('notrun')) {
      return runTest(bx);
    } else {
      r = document.createRange();
      r.setStartBefore(bx);
      r.setEndAfter(bx);
      r.deleteContents();
      sp = codeSpan(bx.test.expr, 'codeExpr');
      sp.setAttribute('generatedNL', '');
      exprBox = box(r, 'codeMainExpr', true);
      exprBox.appendChild(sp);
      return makeOutputBox(exprBox);
    }
  };

  runTest = function runTest(bx) {
    var passed, test;
    test = bx.test;
    passed = true;
    ReplCore.processLine(prepExpr(test.expr), {
      require: req,
      write: function write(str) {
        return console.log(str);
      },
      debug: debug,
      prompt: function prompt(msg, cont) {
        return cont(null);
      },
      processResult: function processResult(result, ast) {
        return passed = showResult(bx, Repl.escapeHtml(Parse.print(result)), Repl.escapeHtml(test.expected));
      },
      processError: passed = false,
      presentValue: function presentValue(x) {
        return x;
      }
    });
    return passed;
  };

  showResult = function showResult(bx, actual, expected) {
    var cl;
    cl = bx.classList;
    cl.remove('notrun');
    if (actual === expected) {
      cl.remove('failed');
      cl.add('passed');
      bx.testSrc.innerHTML = "#@test " + (JSON.stringify(bx.test.expr)) + "\n#@expected " + (JSON.stringify(bx.test.expected));
    } else {
      cl.remove('passed');
      cl.add('failed');
      bx.testSrc.innerHTML = "#@test " + (JSON.stringify(bx.test.expr)) + "\n#@expected " + (JSON.stringify(bx.test.expected)) + "\n#@result " + (JSON.stringify(actual));
      console.log("expected <" + expected + "> but got <" + actual + ">");
    }
    return actual === expected;
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
      debug: debug,
      finishedEvent: function finishedEvent(evt, channel) {
        return update(channel != null ? channel : 'app', this);
      },
      owner: owner(box),
      require: req,
      write: function write(msg) {
        var div;
        div = document.createElement('div');
        div.innerHTML = "" + msg + "\n";
        exBox.appendChild(div);
        return checkHideSource(exBox);
      },
      prompt: function prompt(msg, cont) {
        return cont(window.prompt(msg));
      },
      processResult: function processResult(result, ast) {
        box.result = result;
        return setAst(box, ast);
      },
      presentValue: presentValue,
      processError: function processError(ast) {
        var btn, _ref;
        btn = box.querySelector('[leisureId="makeTestCase"]');
        if (btn) remove(btn);
        return this.write("ERROR: " + (ast.err.leisureContext ? "" + ast.err + ":\n" + (leisureContextString(ast.err)) + "\n" : '') + ((_ref = ast.err.stack) != null ? _ref : ast.err));
      }
    };
  };

  leisureContextString = function leisureContextString(err) {
    var func, offset;
    return ((function() {
      var _i, _len, _ref, _ref2, _results;
      _ref = err.leisureContext.toArray();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref2 = _ref[_i], func = _ref2[0], offset = _ref2[1];
        _results.push(linkSource(func, offset));
      }
      return _results;
    })()).join('\n');
  };

  linkSource = function linkSource(funcName, offset) {
    var end, src, start, _ref;
    _ref = Leisure.funcContextSource(funcName, offset), src = _ref[0], start = _ref[1], end = _ref[2];
    return "  <a href='javascript:void(Notebook.showSource(\"" + funcName + "\", " + offset + "))'>" + funcName + ":" + start + "," + end + "</a>";
  };

  showSource = function showSource(funcName, offset) {
    var end, src, start, _ref;
    _ref = Leisure.funcContextSource(funcName, offset), src = _ref[0], start = _ref[1], end = _ref[2];
    return alert("" + funcName + " = " + (src.substring(0, start)) + " << " + (src.substring(start, end)) + " >> " + (src.substring(end)));
  };

  makeOutputBox = function makeOutputBox(source) {
    var cl, node, _i, _len, _ref;
    node = document.createElement('div');
    node.setAttribute('LeisureOutput', '');
    node.setAttribute('Leisure', '');
    node.setAttribute('LeisureBox', '');
    _ref = boxClasses.output;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cl = _ref[_i];
      node.classList.add(cl);
    }
    node.setAttribute('contentEditable', 'false');
    node.source = source;
    source.output = node;
    node.innerHTML = "<div class='controls'><button onclick='Notebook.evalOutput(this)'>-&gt;</button></div>";
    markupButtons(node);
    source.parentNode.insertBefore(node, source.nextSibling);
    return node;
  };

  codeSpan = function codeSpan(text, boxType) {
    var node;
    node = document.createElement('span');
    node.setAttribute(boxType, '');
    node.setAttribute('Leisure', '');
    node.setAttribute('class', boxType);
    node.appendChild(nodeFor(text));
    return node;
  };

  codeBox = function codeBox(boxType) {
    var node;
    node = document.createElement('div');
    addBoxClasses(node, boxType);
    node.setAttribute('LeisureBox', '');
    node.setAttribute('Leisure', '');
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
        rest = rng.next;
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

  testPat = /(#@test([^\n]*)\n#@expected([^\n]*))\n/m;

  getRanges = function getRanges(el, txt, rest, def, restOff) {
    var body, bodyStart, defType, endPat, ex, exEnd, leadOff, leading, leadingSpaces, lm, m, m2, mainEnd, mainStart, matchStart, matched, name, nameEnd, nameRaw, next, outerRange, r, rest1, t, tOff, tests, textStart, _ref, _ref2, _ref3;
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
      leadOff = tOff = restOff;
      while (m2 = t.match(testPat)) {
        r = makeRange(el, tOff + m2.index, tOff + m2.index + m2[1].length);
        r.leisureTest = {
          expr: JSON.parse(m2[2]),
          expected: JSON.parse(m2[3])
        };
        tests.push(r);
        tOff += m2.index + m2[1].length;
        t = leading.substring(tOff - leadOff);
      }
      if (name != null) {
        mainStart = matchStart + ((_ref2 = leading != null ? leading.length : void 0) != null ? _ref2 : 0);
        nameEnd = mainStart + name.length;
        leadingSpaces = (rest1.match(/^\s*/))[0].length;
        bodyStart = txt.length - (rest1.length - leadingSpaces);
        outerRange = makeRange(el, mainStart, mainEnd);
        return {
          main: outerRange,
          name: txt.substring(mainStart, nameEnd),
          def: defType,
          body: txt.substring(bodyStart, mainEnd),
          tests: tests,
          next: next
        };
      } else {
        mainStart = defType === '=' ? restOff + m.index + m[0].length : matchStart + ((_ref3 = leading != null ? leading.length : void 0) != null ? _ref3 : 0);
        ex = txt.substring(mainStart, mainEnd).match(/^(.*[^ \n])[ \n]*$/);
        exEnd = ex ? mainStart + ex[1].length : mainEnd;
        body = txt.substring(mainStart, exEnd);
        if (body.trim()) {
          textStart = restOff + m.index + (t ? leading.length - t.length : 0);
          if ((t != null) && (lm = t.match(/^[ \n]+/))) textStart += lm[0].length;
          if (t.match(/@auto/)) {
            outerRange = makeRange(el, textStart, exEnd);
            outerRange.leisureAuto = true;
            return {
              main: outerRange,
              name: null,
              def: null,
              body: txt.substring(textStart, exEnd),
              tests: tests,
              fullText: txt.substring(textStart, exEnd),
              next: next
            };
          } else {
            outerRange = makeRange(el, textStart, exEnd);
            return {
              main: outerRange,
              name: null,
              def: null,
              body: txt.substring(textStart, exEnd),
              tests: tests,
              next: next
            };
          }
        } else {
          return {
            main: null,
            name: null,
            def: null,
            body: null,
            tests: tests,
            next: next
          };
        }
      }
    }
  };

  makeRange = function makeRange(el, off1, off2) {
    var node, offset, range, _ref, _ref2;
    range = document.createRange();
    _ref = grp(el, off1, false), node = _ref[0], offset = _ref[1];
    if ((offset != null) && offset > 0) {
      range.setStart(node, offset);
    } else {
      range.setStartBefore(node);
    }
    if (off2 != null) {
      _ref2 = grp(el, off2, true), node = _ref2[0], offset = _ref2[1];
      if (offset != null) {
        range.setEnd(node, offset);
      } else {
        range.setEndAfter(node);
      }
    }
    return range;
  };

  grp = function grp(node, charOffset, end) {
    var child, offset, ret, _ref;
    _ref = ret = getRangePosition(node.firstChild, charOffset, end), child = _ref[0], offset = _ref[1];
    if (child) {
      return ret;
    } else if (node.lastChild) {
      return nodeEnd(node.lastChild);
    } else {
      return [node, end ? 1 : 0];
    }
  };

  getRangePosition = function getRangePosition(node, charOffset, end) {
    var newNode, newOff, ret, _ref;
    if (!node) {
      return [null, charOffset];
    } else if (node.nodeType === 3) {
      if (node.length > (end ? charOffset - 1 : charOffset)) {
        return [node, charOffset];
      } else {
        ret = continueRangePosition(node, charOffset - node.length, end);
        return ret;
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
      return getRangePosition(node.nextSibling, newOff, end);
    } else {
      return continueRangePosition(node.parentNode, newOff, end);
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

  /*
  # handle focus manually, because grabbing focus and blur events doesn't seem to work for the parent
  */

  docFocus = null;

  codeFocus = null;

  findCurrentCodeHolder = function findCurrentCodeHolder() {
    var _ref;
    return focusBox((_ref = window.getSelection()) != null ? _ref.focusNode : void 0);
  };

  focusBox = function focusBox(box) {
    var newCode, old, _ref;
    newCode = null;
    while (box && (box.nodeType !== 1 || !isLeisureCode(box))) {
      if (box.nodeType === 1 && ((box.getAttribute('LeisureBox')) != null)) {
        newCode = box;
      }
      box = box.parentNode;
    }
    if (box !== docFocus) {
      if (docFocus != null) docFocus.classList.remove('focused');
      docFocus = box;
      if (box != null) if ((_ref = box.classList) != null) _ref.add('focused');
    }
    if (newCode !== codeFocus) {
      old = codeFocus;
      codeFocus = newCode;
      if (old) return acceptCode(old);
    }
  };

  owner = function owner(box) {
    while (box && (box.nodeType !== 1 || !isLeisureCode(box))) {
      box = box.parentNode;
    }
    return box;
  };

  evalBox = function evalBox(box, envBox) {
    ReplCore.processLine(box.textContent, (envBox != null ? envFor(envBox) : null), 'Parse.');
    return getAst(box);
  };

  acceptCode = function acceptCode(box) {
    if ((box.getAttribute('codemain')) != null) {
      evalBox(box);
      update('compile');
      if (owner(box).autorunState) return runTests(owner(box));
    }
  };

  evalDoc = function evalDoc(el) {
    var auto, e, pgm, _ref;
    _ref = initNotebook(el), pgm = _ref[0], auto = _ref[1];
    try {
      if (auto) {
        auto = "do\n  " + (auto.trim().replace(/\n/g, '\n  ')) + "\n  finishLoading 'fred'";
        global.noredefs = false;
        Notebook.queueAfterLoad(function() {
          evalDocCode(el, pgm);
          if (el.autorunState) return runTests(el);
        });
        e = envFor(el);
        console.log("ENV DEBUG: " + e.debug);
        e.write = function write() {};
        e.processError = function processError(ast) {
          return alert('bubba ' + ReplCore.errString(ast.err));
        };
        return ReplCore.processLine(auto, e, 'Parse.');
      } else {
        return evalDocCode(el, pgm);
      }
    } catch (err) {
      return showError(err, "Error compiling " + pgm);
    }
  };

  showError = function showError(e, msg) {
    console.log(msg);
    console.log(e);
    console.log(e.stack);
    return alert(e.stack);
  };

  evalDocCode = function evalDocCode(el, pgm) {
    var code, defs, node, _i, _len, _ref, _results;
    code = ReplCore.generateCode('_doc', pgm, false, false, false, null, debug);
    try {
      defs = Leisure.eval(code, global);
    } catch (err) {
      showError(err, "Error evaluating JS code: " + code);
      throw err;
    }
    Leisure.processDefs(defs);
    _ref = el.querySelectorAll('[codeMain]');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(getAst(node));
    }
    return _results;
  };

  Parse.define('finishLoading', function() {
    return function(bubba) {
      return Prim.makeMonad(function(env, cont) {
        var i, _i, _len;
        for (_i = 0, _len = postLoadQueue.length; _i < _len; _i++) {
          i = postLoadQueue[_i];
          i();
        }
        postLoadQueue = [];
        return cont(_false());
      });
    };
  });

  Parse.define('quit', function() {
    return window.close();
  });

  Parse.define('config', function() {
    return function(expr) {
      return Prim.makeMonad(function(env, cont) {
        switch (expr()) {
          case 'autoTest':
            autoRun(env.owner, true);
        }
        return cont(_false());
      });
    };
  });

  Parse.define('notebookSelection', function() {
    return function(func) {
      return Prim.makeMonad(function(env, cont) {
        var bx, offset, p1, p2, r, r2, sel, _ref;
        sel = window.getSelection();
        bx = getBox(sel.focusNode);
        if ((bx != null) && hasFunc(bx, func)) {
          offset = (_ref = bx.ast.leisureCodeOffset) != null ? _ref : 0;
          r = sel.getRangeAt(0);
          window.r = r;
          r2 = document.createRange();
          r2.setStart(bx, 0);
          r2.setEnd(r.startContainer, r.startOffset);
          p1 = r2.cloneContents().textContent.length - offset;
          if (!r.collapsed) r2.setEnd(r.endContainer, r.endOffset);
          p2 = r2.cloneContents().textContent.length - offset;
          return cont(_some2()(function() {
            return p1;
          })(function() {
            return p2;
          }));
        } else {
          return cont(_none());
        }
      });
    };
  });

  hasFunc = function hasFunc(bx, func) {
    var ast;
    ast = getAst(bx);
    return ast === func().ast || ast === func.ast;
  };

  Parse.define('notebookAst', function() {
    return function(func) {
      return Prim.makeMonad(function(env, cont) {
        var ast, node;
        if (func.leisureName != null) {
          node = document.querySelector("[LeisureFunc=" + func.leisureName + "]");
          if (node != null) {
            ast = getAst(node);
            return cont(_some()(function() {
              return ast;
            }));
          }
        }
        return cont(_none());
      });
    };
  });

  autoRun = function autoRun(el, state) {
    var _ref;
    el.autorunState = state;
    return (_ref = el.autorun) != null ? _ref.checked = state : void 0;
  };

  head = function head(l) {
    return l(function() {
      return function(hh) {
        return function(tt) {
          return hh();
        };
      };
    });
  };

  tail = function tail(l) {
    return l(function() {
      return function(hh) {
        return function(tt) {
          return tt();
        };
      };
    });
  };

  id = function id(v) {
    return v();
  };

  laz = Leisure.laz;

  getSvgElement = function getSvgElement(id) {
    var el, svg;
    if ((el = document.getElementById(id))) {
      return el;
    } else {
      svg = createNode("<svg id='HIDDEN_SVG' xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000; position: absolute'><text id='HIDDEN_TEXT'>bubba</text></svg>");
      document.body.appendChild(svg);
      return document.getElementById(id);
    }
  };

  svgMeasureText = function svgMeasureText(text) {
    return function(style) {
      return function(f) {
        var bx, txt;
        txt = getSvgElement('HIDDEN_TEXT');
        if (style()) txt.setAttribute('style', style());
        txt.lastChild.textContent = text();
        bx = txt.getBBox();
        return f()(laz(bx.width))(laz(bx.height));
      };
    };
  };

  primconcatNodes = function primconcatNodes(nodes) {
    if (nodes === _nil()) {
      return "";
    } else {
      return (head(nodes))(id) + concatNodes(tail(nodes));
    }
  };

  transformedPoint = function transformedPoint(pt, x, y, ctm, ictm) {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(ctm).matrixTransform(ictm);
  };

  svgMeasure = function svgMeasure(content) {
    return primSvgMeasure(content, baseStrokeWidth);
  };

  svgBetterMeasure = function svgBetterMeasure(content) {
    return primSvgMeasure(content, transformStrokeWidth);
  };

  primSvgMeasure = function primSvgMeasure(content, transformFunc) {
    return function(f) {
      var bbox, g, pad, svg;
      svg = createNode("<svg xmlns='http://www.w3.org/2000/svg' version='1.1' style='top: -100000'><g>" + (content()) + "</g></svg>");
      document.body.appendChild(svg);
      g = svg.firstChild;
      bbox = g.getBBox();
      pad = getMaxStrokeWidth(g, g, svg, transformFunc);
      document.body.removeChild(svg);
      return f()(laz(bbox.x - Math.ceil(pad / 2)))(laz(bbox.y - Math.ceil(pad / 2)))(laz(bbox.width + pad))(laz(bbox.height + pad));
    };
  };

  baseElements = ['path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'];

  getMaxStrokeWidth = function getMaxStrokeWidth(el, base, svg, transformFunc) {
    var _ref, _ref2;
    if (_ref = base.nodeName, __indexOf.call(baseElements, _ref) >= 0) {
      svg.setAttribute('width', (_ref2 = getComputedStyle(base).strokeWidth) != null ? _ref2 : '0', svg);
      return transformFunc(el, svg.width.baseVal.value);
    } else if (base.nodeName === 'use') {
      return getMaxStrokeWidth(base, base.instanceRoot.correspondingElement, svg, transformFunc);
    } else if (base.nodeName === 'g') {
      return Parse.foldLeft((function(v, n) {
        return Math.max(v, getMaxStrokeWidth(n, n, svg, transformFunc));
      }), 0, el.childNodes);
    } else {
      return 0;
    }
  };

  baseStrokeWidth = function baseStrokeWidth(el, w) {
    return w;
  };

  transformStrokeWidth = function transformStrokeWidth(el, w) {
    var ctm, tp1, tp2, x, y;
    if (w === 0) {
      return 0;
    } else {
      ctm = el.getScreenCTM();
      tp1 = transformedPoint(pt, bx.x - Math.ceil(w), bx.y - Math.ceil(w), ctm, isctm);
      tp2 = transformedPoint(pt, bx.x + bx.width + Math.ceil(w), bx.y + bx.height + Math.ceil(w), ctm, isctm);
      x = tp2.x - tp1.x;
      y = tp2.y - tp1.y;
      return Math.sqrt(x * x + y * y);
    }
  };

  previousSibling = function previousSibling(node) {
    while ((node != null ? node.parentNode : void 0) && !node.previousSibling) {
      node = node.parentNode;
    }
    return node != null ? node.previousSibling : void 0;
  };

  nextSibling = function nextSibling(node) {
    while ((node != null ? node.parentNode : void 0) && !node.nextSibling) {
      node = node.parentNode;
    }
    return node != null ? node.nextSibling : void 0;
  };

  Prim.defaultEnv.require = req;

  root.svgMeasureText = svgMeasureText;

  root.svgMeasure = svgMeasure;

  root.initNotebook = initNotebook;

  root.bindNotebook = bindNotebook;

  root.evalOutput = evalOutput;

  root.makeTestCase = makeTestCase;

  root.cleanOutput = cleanOutput;

  root.clearOutputBox = clearOutputBox;

  root.envFor = envFor;

  root.queueAfterLoad = queueAfterLoad;

  root.evalDoc = evalDoc;

  root.getBox = getBox;

  root.makeRange = makeRange;

  root.grp = grp;

  root.changeTheme = changeTheme;

  root.setSnapper = setSnapper;

  root.update = update;

  root.clearUpdates = clearUpdates;

  root.showAst = showAst;

  root.toggleEdit = toggleEdit;

  root.showSource = showSource;

  root.bootNotebook = bootNotebook;

  root.createNode = createNode;

  root.ENTER = ENTER;

  root.textNode = textNode;

  root.cleanEmptyNodes = cleanEmptyNodes;

  root.isLeisureCode = isLeisureCode;

  root.getElementCode = getElementCode;

  root.runTests = runTests;

  root.previousSibling = previousSibling;

  root.nextSibling = nextSibling;

  root.presentLeisureCode = presentLeisureCode;

  root.mergeLeisureCode = mergeLeisureCode;

  root.highlightNotebookFunction = highlightNotebookFunction;

  root.ESC = ESC;

  root.HOME = HOME;

  root.END = END;

  root.PAGE_UP = PAGE_UP;

  root.PAGE_DOWN = PAGE_DOWN;

  root.LEFT_ARROW = LEFT_ARROW;

  root.UP_ARROW = UP_ARROW;

  root.RIGHT_ARROW = RIGHT_ARROW;

  root.DOWN_ARROW = DOWN_ARROW;

  root.arrows = arrows;

  root.closeWindow = closeWindow;

  root.markupButton = markupButton;

  root.markupButtons = markupButtons;

}).call(this);
