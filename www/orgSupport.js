// Generated by CoffeeScript 1.6.3
/*
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/


(function() {
  var BS, DEL, ENTER, HL_TAGS, Headline, Keyword, Meat, Results, Source, TAB, backspace, basicOrg, bindContent, boundarySpan, checkCollapsed, checkDeleteReparse, checkEnterReparse, checkExtraNewline, checkLast, checkReparse, checkSourceMod, checkStart, cleanHeadline, collapseNode, content, contentSpan, createResults, currentLine, currentMode, defaultEnv, displaySource, editDiv, emptyOutNode, executeSource, executeText, findDomPosition, findOrgNode, fixupNodes, followingSpan, getCollapsible, getLeft, getNodeText, getOrgParent, getOrgType, getResultsForSource, getRight, getStyle, getTags, getTextLine, getTextPosition, getType, handleMutation, hasShadow, headlineRE, id, idCount, initOrg, installOrgDOM, isBoundary, isCollapsed, isCollapsible, isCollapsibleText, isDocNode, isDynamic, isEmptyCollapsible, isSourceNode, lazy, lz, markupGuts, markupNode, markupOrg, markupOrgWithNode, matchLine, modifying, modifyingKey, nativeRange, needsReparse, newResults, nextOrgId, nodes, oldReparse, optionalBoundary, orgAttrs, orgEnv, orgNotebook, parseOrgMode, parseTags, reparse, reparseListeners, resolve, restorePosition, root, rz, sensitive, setTags, show, sourceDiv, styleCache, textNodeAfter, textNodeBefore, _ref, _ref1, _ref2;

  getType = require('./ast').getType;

  _ref = root = module.exports = require('./base'), resolve = _ref.resolve, lazy = _ref.lazy, defaultEnv = _ref.defaultEnv;

  rz = resolve;

  lz = lazy;

  _ref1 = require('./browserSupport'), TAB = _ref1.TAB, ENTER = _ref1.ENTER, BS = _ref1.BS, DEL = _ref1.DEL;

  _ref2 = require('./org'), parseOrgMode = _ref2.parseOrgMode, Headline = _ref2.Headline, Meat = _ref2.Meat, Keyword = _ref2.Keyword, Source = _ref2.Source, Results = _ref2.Results, headlineRE = _ref2.headlineRE, HL_TAGS = _ref2.HL_TAGS, parseTags = _ref2.parseTags, matchLine = _ref2.matchLine;

  editDiv = null;

  sourceDiv = null;

  modifying = false;

  styleCache = {};

  idCount = 0;

  nodes = {};

  needsReparse = false;

  reparseListeners = [];

  nextOrgId = function() {
    return 'org-node-' + idCount++;
  };

  getOrgType = function(node) {
    return node != null ? typeof node.getAttribute === "function" ? node.getAttribute('data-org-type') : void 0 : void 0;
  };

  currentMode = null;

  initOrg = function(parent, source) {
    $("<div LeisureOutput contentEditable='false' id='leisure_bar'></div>").prependTo(document.body).click(function(e) {
      currentMode = (currentMode === Leisure.fancyOrg ? Leisure.basicOrg : Leisure.fancyOrg);
      return currentMode.useNode($(parent)[0], source);
    });
    (currentMode = Leisure.fancyOrg).useNode($(parent)[0], source);
    return Leisure.initStorage('#login', '#panel', currentMode);
  };

  getStyle = function(node) {
    var style;
    if (!node.orgId) {
      node.orgId = node.getAttribute('data-org-id');
      if (!node.orgId) {
        node.setAttribute('data-org-id', (node.orgId = nextOrgId()));
      }
    }
    style = styleCache[node.orgId];
    if (!style) {
      style = styleCache[node.orgId] = getComputedStyle(node);
    }
    return style;
  };

  isCollapsed = function(node) {
    var type, _ref3;
    type = node.nodeType;
    return type === 7 || type === 8 || (type === 3 && (node.data === '' || isCollapsed(node.parentNode))) || /^(script|style)$/i.test(node.nodeName) || (type === 1 && (node.classList.contains('collapsed') || (((_ref3 = node.getAttribute('data-org-type')) === ('text' || 'meat')) && isCollapsed(node.parentNode)) || getStyle(node).display === 'none' || (node.shadowRoot != null)));
  };

  markupOrg = function(text) {
    var node, result, _ref3;
    _ref3 = markupOrgWithNode(text), node = _ref3[0], result = _ref3[1];
    return result;
  };

  markupOrgWithNode = function(text) {
    var org;
    nodes = {};
    if (text[text.length - 1] !== '\n') {
      text = text + '\n';
    }
    org = parseOrgMode(text);
    return [org, markupNode(org, true)];
  };

  boundarySpan = "<span data-org-type='boundary'>\n</span>";

  sensitive = /^srcStart|^headline-/;

  orgAttrs = function(org) {
    var extra, _ref3;
    if (!org.nodeId) {
      org.nodeId = nextOrgId();
    }
    nodes[org.nodeId] = org;
    extra = isDynamic(org) ? ' data-org-dynamic="true"' : '';
    if (org instanceof Headline) {
      extra += " data-org-tags='" + org.tags + "'";
    } else if (org instanceof Keyword && !(org instanceof Source) && org.next instanceof Source && ((_ref3 = org.name) != null ? _ref3.toLowerCase() : void 0) === 'name') {
      extra += " data-org-name='" + org.info + "'";
    }
    if (org.srcId) {
      extra += " data-org-srcid='" + org.srcId + "'";
    }
    return "id='" + org.nodeId + "' data-org-type='" + org.type + "'" + extra;
  };

  isDynamic = function(org) {
    return org instanceof Source && org.info.match(/:results .*dynamic/i);
  };

  markupNode = function(org, start) {
    var pos, text;
    if (org instanceof Source || org instanceof Results) {
      pos = org.contentPos - org.offset - 1;
      text = org.text.substring(pos);
      return "<span " + (orgAttrs(org)) + "><span data-org-type='text'>" + (org.text.substring(0, pos)) + "</span>" + (contentSpan(text)) + "</span>";
    } else if (org instanceof Headline) {
      return "<span " + (orgAttrs(org)) + ">" + (contentSpan(org.text, 'text')) + (markupGuts(org, checkStart(start, org.text))) + "</span>";
    } else {
      return "<span " + (orgAttrs(org)) + ">" + (content(org.text)) + "</span>";
    }
  };

  createResults = function(srcNode) {};

  checkStart = function(start, text) {
    return start && (!text || text === '\n');
  };

  isSourceNode = function(node) {
    return (node != null ? typeof node.getAttribute === "function" ? node.getAttribute('data-org-type') : void 0 : void 0) === 'source';
  };

  isDocNode = function(node) {
    return node != null ? typeof node.hasAttribute === "function" ? node.hasAttribute('maindoc') : void 0 : void 0;
  };

  markupGuts = function(org, start) {
    var c, p, prev, s;
    if (!org.children.length) {
      return '';
    } else {
      prev = start ? null : org;
      return ((function() {
        var _i, _len, _ref3, _results;
        _ref3 = org.children;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          c = _ref3[_i];
          s = start;
          start = false;
          p = prev;
          prev = c;
          _results.push(optionalBoundary(p, c) + markupNode(c, s));
        }
        return _results;
      })()).join("");
    }
  };

  optionalBoundary = function(prev, node) {
    if (prev) {
      return boundarySpan;
    } else {
      return '';
    }
  };

  contentSpan = function(str, type) {
    str = content(str);
    if (str) {
      return "<span" + (type ? " data-org-type='" + type + "'" : '') + ">" + str + "</span>";
    } else {
      return '';
    }
  };

  content = function(str) {
    if (str[str.length - 1] === '\n') {
      return str.substring(0, str.length - 1);
    } else {
      return str;
    }
  };

  fixupNodes = function(node) {
    var n, _i, _len, _ref3, _results;
    _ref3 = $(node).find('[data-org-type="headline"]');
    _results = [];
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      n = _ref3[_i];
      _results.push(setTags(n));
    }
    return _results;
  };

  isCollapsibleText = function(node) {
    var _ref3;
    return node.nodeType === 3 && ((_ref3 = node.parentNode.getAttribute('data-org-type')) === 'text' || _ref3 === 'meat');
  };

  bindContent = function(div) {
    fixupNodes(div);
    div.addEventListener('keydown', function(e) {
      var br, c, cancelled, currentMatch, el, inCollapsedText, n, par, r, s;
      c = e.charCode || e.keyCode || e.which;
      s = getSelection();
      r = s.getRangeAt(0);
      el = r.startContainer;
      par = el.parentNode;
      cancelled = false;
      if (c === TAB) {
        e.preventDefault();
        cancelled = true;
        collapseNode();
      } else if (String.fromCharCode(c) === 'C' && e.altKey) {
        root.orgApi.executeSource(div, getSelection().focusNode);
      } else if (c === ENTER) {
        e.preventDefault();
        cancelled = true;
        n = s.focusNode;
        inCollapsedText = r.collapsed && isCollapsibleText(el && par.parentElement.classList.contains('collapsed') && el.nextSibling === null);
        if (inCollapsedText && r.startOffset === el.length) {
          return;
        } else if (r.collapsed && r.startOffset === n.length && isCollapsibleText(n)) {
          br = document.createTextNode('\n');
          $(br).prependTo(followingSpan(n.parentNode));
          r.setStart(br, br.length);
          r.setEnd(br, br.length);
        } else {
          window.N = n;
          r.insertNode(br = document.createTextNode(checkExtraNewline(r, n, div)));
          br.parentNode.normalize();
        }
        r.collapse();
        s.removeAllRanges();
        s.addRange(r);
        checkEnterReparse(div, r);
      } else if (c === DEL || c === BS) {
        inCollapsedText = r.collapsed && isCollapsibleText(el && par.parentElement.classList.contains('collapsed') && el.nextSibling === null);
        if (inCollapsedText && ((c === DEL && r.startOffset === el.length - 1) || (c === BS && r.startOffset === el.length))) {
          e.preventDefault();
          cancelled = true;
          el.data = el.data.substring(0, el.data.length - 1);
          r.setStart(el, el.data.length);
          r.setEnd(el, el.data.length);
          s.removeAllRanges();
          s.addRange(r);
        } else if (c === DEL && inCollapsedText && r.startOffset >= el.length - 1) {
          e.preventDefault();
          cancelled = true;
        } else if (backspace(div, e)) {
          cancelled = true;
        } else if (c !== BS) {
          checkDeleteReparse(div, c === BS);
        }
      }
      if (!cancelled && modifyingKey(c)) {
        if ((getOrgType(getOrgParent(el))) === 'boundary') {
          needsReparse = true;
        }
        currentMatch = matchLine(currentLine(div));
        if (cancelled) {
          return checkSourceMod(div, currentMatch);
        } else {
          return setTimeout((function() {
            return checkSourceMod(div, currentMatch);
          }), 1);
        }
      }
    });
    div.addEventListener('DOMCharacterDataModified', handleMutation, true);
    div.addEventListener('DOMSubtreeModified', handleMutation, true);
    return displaySource();
  };

  modifyingKey = function(c) {
    return (c > 47 && c < 58) || c === 32 || c === ENTER || c === BS || c === DEL || (c > 64 && c < 91) || (c > 95 && c < 112) || (c > 185 && c < 193) || (c > 218 && c < 223);
  };

  currentLine = function(parent) {
    var lineEnd, lineStart, lineText, nl, node, r;
    r = getSelection().getRangeAt(0);
    if (r.collapsed && r.startContainer.nodeType === 3) {
      nl = r.startContainer.data.substring(0, r.startOffset).lastIndexOf('\n');
      lineText = r.startContainer.data;
      lineStart = -1;
      lineEnd = -1;
      if ((-1 < nl && nl < r.startOffset)) {
        lineStart = nl;
      } else {
        node = r.startContainer;
        while (node && lineStart === -1) {
          if (node = textNodeBefore(node)) {
            lineText = node.data + lineText;
            lineStart = node.data.lastIndexOf('\n');
          }
        }
      }
      nl = r.startContainer.data.indexOf('\n', r.startOffset);
      if (nl >= r.startOffset) {
        lineEnd = nl + lineText.length - r.startContainer.data.length;
      } else {
        node = r.startContainer;
        while (node && lineEnd === -1) {
          if (node = textNodeAfter(node)) {
            lineText += node.data;
            if ((nl = node.data.indexOf('\n')) > -1) {
              lineEnd = nl + lineText.length - r.startContainer.data.length;
            }
          }
        }
      }
      if (lineEnd === -1) {
        lineEnd = lineText.length;
      }
      return lineText.substring(lineStart + 1, lineEnd);
    } else {
      return '';
    }
  };

  collapseNode = function() {
    var node;
    node = getCollapsible(getSelection().focusNode);
    if (node) {
      if (!isEmptyCollapsible(node)) {
        modifying = true;
        $(node).toggleClass('collapsed');
        styleCache = {};
        return modifying = false;
      } else {
        return status("EMPTY ENTRY");
      }
    }
  };

  isBoundary = function(node) {
    return (node.nodeType === 1 && node.getAttribute('data-org-type') === 'boundary' && node) || (node.nodeType === 3 && isBoundary(node.parentElement));
  };

  backspace = function(parent, e) {
    if (checkCollapsed(-1)) {
      e.preventDefault();
      return true;
    } else {
      return false;
    }
  };

  checkCollapsed = function(delta) {
    var boundary, n, r, s, _i, _len, _ref3;
    s = rangy.getSelection();
    r = s.getRangeAt(0);
    if (delta < 0) {
      r.moveStart('character', delta);
    } else {
      r.moveEnd('character', delta);
    }
    if (r.startContainer === r.endContainer) {
      return false;
    } else if (boundary = isBoundary((delta < 0 ? r.startContainer : r.endContainer))) {
      if (delta < 0) {
        r.setStartBefore(boundary);
        r.moveStart('character', -1);
      } else {
        r.setEndAfter(boundary);
        r.moveEnd('character', 1);
      }
      _ref3 = r.getNodes();
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        n = _ref3[_i];
        if (r.containsNode(n) && isCollapsed(n)) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  checkSourceMod = function(parent, oldMatch) {
    var n, newMatch, r, _ref3;
    r = getSelection().getRangeAt(0);
    if ((newMatch = matchLine(currentLine(parent))) !== oldMatch || (newMatch && newMatch.match(sensitive))) {
      return reparse(parent);
    } else if ((n = getOrgParent(r.startContainer)) && ((_ref3 = n.getAttribute('data-org-dynamic')) != null ? _ref3.toLowerCase() : void 0) === 'true') {
      return root.orgApi.executeSource(parent, r.startContainer);
    }
  };

  orgEnv = function(parent, node) {
    var r;
    r = getResultsForSource(parent, node);
    if (r) {
      r.innerHTML = '';
      return {
        write: function(str) {
          return r.textContent += ": " + (str.replace(/\n/g, '\n: ')) + "\n";
        },
        __proto__: defaultEnv
      };
    } else {
      return {
        write: function(str) {
          return console.log(": " + (str.replace(/\n/g, '\n: ')) + "\n");
        },
        __proto__: defaultEnv
      };
    }
  };

  getResultsForSource = function(parent, node) {
    var org, pos, res, results, src;
    checkReparse(parent);
    res = node;
    while (getOrgType(res.nextSibling) === 'boundary' || (getOrgType(res.nextSibling) === 'meat' && res.textContent.match(/^[ \n]*$/))) {
      res = res.nextSibling;
    }
    res = res.nextSibling;
    if ((res != null ? res.getAttribute('data-org-type') : void 0) === 'results') {
      return res.lastChild;
    } else {
      org = parseOrgMode(getNodeText(parent));
      pos = getTextPosition(parent, node, 0);
      src = org.findNodeAt(pos);
      if (pos > -1) {
        results = src.next;
        if (!(results instanceof Results)) {
          results = results instanceof Meat && results.text.match(/^[ \n]*$/) ? results.next : void 0;
          if (!(results instanceof Results)) {
            results = newResults(parent, src);
          }
        }
        return getCollapsible(findDomPosition(parent, results.offset + 1)[0]).lastChild;
      } else {
        return null;
      }
    }
  };

  checkReparse = function(parent) {
    if (needsReparse) {
      return reparse(parent);
    }
  };

  nativeRange = function(r) {
    var container, offset, r2;
    if (r instanceof Range) {
      return r;
    } else {
      r2 = document.createRange();
      container = r instanceof Array ? r[0] : r.startContainer;
      offset = r instanceof Array ? r[1] : r.startOffset;
      r2.setStart(container, offset);
      r2.setEnd(container, offset);
      return r2;
    }
  };

  restorePosition = function(parent, block) {
    var pos, r, sel;
    sel = getSelection();
    if (sel.rangeCount) {
      r = sel.getRangeAt(0);
      pos = getTextPosition(parent, r.startContainer, r.startOffset);
      block();
      if (pos > -1) {
        r = nativeRange(findDomPosition(parent, pos));
        r.collapse(true);
        sel.removeAllRanges();
        return sel.addRange(r);
      }
    } else {
      return block();
    }
  };

  reparse = function(parent, text) {
    var orgNode, orgText, sel, _ref3;
    styleCache = {};
    text = text != null ? text : getNodeText(parent);
    sel = getSelection();
    _ref3 = root.orgApi.markupOrgWithNode(text), orgNode = _ref3[0], orgText = _ref3[1];
    restorePosition(parent, function() {
      return root.orgApi.installOrgDOM(parent, orgNode, orgText);
    });
    needsReparse = false;
    return setTimeout((function() {
      var l, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = reparseListeners.length; _i < _len; _i++) {
        l = reparseListeners[_i];
        _results.push(l(parent, orgNode, orgText));
      }
      return _results;
    }), 1);
  };

  installOrgDOM = function(parent, orgNode, orgText) {
    return parent.innerHTML = orgText;
  };

  checkDeleteReparse = function(parent, backspace) {
    var r;
    r = rangy.getSelection().getRangeAt(0);
    if (backspace) {
      r.moveStart('character', -1);
    } else {
      r.moveEnd('character', 1);
    }
    if (r.text() === '\n') {
      return setTimeout((function() {
        return reparse(parent);
      }), 1);
    }
  };

  checkEnterReparse = function(parent, r) {
    var result;
    if ((result = getCollapsible(r.startContainer))) {
      reparse(parent);
    }
    return result;
  };

  newResults = function(parent, src) {
    var srcEnd, text;
    text = src.top().allText();
    srcEnd = src.end();
    reparse(parent, text.substring(0, srcEnd) + "#+RESULTS:\n: \n" + text.substring(srcEnd));
    return findOrgNode(parent, srcEnd + 1);
  };

  id = lz(function(x) {
    return rz(x);
  });

  getLeft = function(x) {
    return x(id)(id);
  };

  getRight = function(x) {
    return x(id)(id);
  };

  show = function(obj) {
    if (typeof L_show !== "undefined" && L_show !== null) {
      return rz(L_show)(lz(obj));
    } else {
      return console.log(obj);
    }
  };

  executeText = function(text, env) {
    var result;
    result = rz(L_baseLoadString)('notebook')(text);
    return runMonad(result, env, function(res) {
      res = res.head().tail();
      if (getType(res) === 'left') {
        return orgEnv.write("PARSE ERROR: " + (getLeft(res)));
      } else {
        return env.write(show(getRight(res)));
      }
    });
  };

  executeSource = function(parent, node) {
    var m, txt;
    if (isSourceNode(node)) {
      checkReparse(parent);
      txt = $(node).text().substring($(node).find('[data-org-type="text"]').text().length);
      m = txt.match(/(^|\n)#\+end_src/i);
      if (m) {
        return executeText(txt.substring(0, m.index), orgEnv(parent, node));
      } else {
        return console.log("No end for src block");
      }
    } else if (getOrgType(node) === 'text') {
      return needsReparse = true;
    } else {
      return !isDocNode(node) && executeSource(parent, node.parentElement);
    }
  };

  followingSpan = function(node) {
    var _ref3;
    return (_ref3 = node.nextElementSibling) != null ? _ref3 : $('<span></span>').appendTo(node.parentNode)[0];
  };

  checkExtraNewline = function(range, n, parent) {
    if (range.collapsed && n.nodeType === 3 && range.startOffset === n.length && n.textContent[n.length - 1] !== '\n') {
      return checkLast(n, parent);
    } else {
      return '\n';
    }
  };

  checkLast = function(n, parent) {
    if (n === parent) {
      return '\n\n';
    } else if (n.nextSibling) {
      return '\n';
    } else {
      return checkLast(n.parentNode, parent);
    }
  };

  getTags = function(headline) {
    if (headline.getAttribute('dirty')) {
      cleanHeadline(headline);
      setTags(headline);
    }
    return headline.getAttribute('data-org-tags');
  };

  setTags = function(headline) {
    var m, tags;
    m = headline.firstChild.textContent.match(headlineRE);
    tags = ((m && parseTags(m[HL_TAGS])) || []).join(' ');
    if (headline.getAttribute('data-org-tags') !== tags) {
      return headline.setAttribute('data-org-tags', tags);
    }
  };

  cleanHeadline = function(node) {
    modifying = true;
    node.removeAttribute('dirty');
    return modifying = false;
  };

  handleMutation = function(evt) {
    var node;
    if (!modifying) {
      modifying = true;
      if ((node = getCollapsible(evt.srcElement)) && (node.getAttribute('data-org-type') === 'headline')) {
        node.setAttribute('dirty', 'true');
      }
      displaySource();
      return modifying = false;
    }
  };

  displaySource = function() {
    return $(sourceDiv).html('').text($(editDiv).text());
  };

  isCollapsible = function(node) {
    var _ref3;
    return (_ref3 = node.getAttribute('data-org-type')) === 'headline' || _ref3 === 'source' || _ref3 === 'results';
  };

  getCollapsible = function(node) {
    var _ref3;
    if (node.nodeType === 1) {
      if (isCollapsible(node)) {
        return node;
      } else {
        return ((_ref3 = node.getAttribute('data-org-type')) === 'text' || _ref3 === 'meat') && getCollapsible(node.parentElement);
      }
    } else {
      return node.nodeType === 3 && getCollapsible(node.parentElement);
    }
  };

  getOrgParent = function(node) {
    return node && ((node.nodeType === 1 && isCollapsible(node) && node) || getOrgParent(node.parentElement));
  };

  isEmptyCollapsible = function(node) {
    var firstLine;
    firstLine = getTextLine(node);
    return node.firstChild === node.lastChild;
  };

  getTextLine = function(node) {
    var c;
    c = node.firstElementChild;
    while (c) {
      if (c.getAttribute('data-org-type') === 'text') {
        return c;
      }
      c = c.nextElementSibling;
    }
    return null;
  };

  findOrgNode = function(parent, pos) {
    var org, orgNode;
    org = parseOrgMode(getNodeText(parent));
    return orgNode = org.findNodeAt(pos);
  };

  getTextPosition = function(node, target, pos) {
    var count, eat, up;
    if (target.nodeType === 3) {
      up = false;
      eat = false;
      count = 0;
      while (node) {
        if (node.nodeType === 3) {
          if (node === target) {
            return count + pos;
          }
          count += node.length;
          eat = true;
        }
        node = textNodeAfter(node);
      }
    }
    return -1;
  };

  findDomPosition = function(node, pos) {
    while (node) {
      if (node.nodeType === 3) {
        if (pos <= node.length) {
          return [node, pos];
        }
        pos -= node.length;
      }
      node = textNodeAfter(node);
    }
    return [null, null];
  };

  textNodeAfter = function(node) {
    var eat, up;
    eat = true;
    up = false;
    while (node && (eat || node.nodeType !== 3)) {
      eat = false;
      if (!up && node.firstChild) {
        node = node.firstChild;
      } else if (node.nextSibling) {
        node = node.nextSibling;
        up = false;
      } else {
        node = node.parentNode;
        up = true;
      }
    }
    return node;
  };

  textNodeBefore = function(node) {
    var eat, up;
    eat = true;
    up = false;
    while (node && (eat || node.nodeType !== 3)) {
      eat = false;
      if (!up && node.lastChild) {
        node = node.lastChild;
      } else if (node.previousSibling) {
        node = node.previousSibling;
        up = false;
      } else {
        node = node.parentNode;
        up = true;
      }
    }
    return node;
  };

  getNodeText = function(node) {
    return node.textContent;
  };

  if (Element.prototype.webkitCreateShadowRoot != null) {
    Element.prototype.createShadowRoot = Element.prototype.webkitCreateShadowRoot;
    Element.prototype.__defineGetter__('shadowRoot', function() {
      return this.webkitShadowRoot;
    });
    Element.prototype.__defineSetter__('shadowRoot', function(val) {
      return this.webkitShadowRoot = val;
    });
  } else if (document.body.createShadowRoot == null) {
    hasShadow = false;
    Element.prototype.createShadowRoot = function() {
      hasShadow = true;
      return this.setAttribute('data-org-shadow', 'true');
    };
    Element.prototype.__defineGetter__('shadowRoot', function() {
      return (this.hasAttribute('data-org-shadow') && this) || null;
    });
    getNodeText = function(node) {
      var copy;
      if (hasShadow) {
        copy = $(node).clone();
        copy.find('[data-org-shadow]').remove();
        return copy.text();
      } else {
        return node.textContent;
      }
    };
    oldReparse = reparse;
    reparse = function(parent, text) {
      oldReparse(parent, text);
      return hasShadow = false;
    };
  }

  emptyOutNode = function(node) {
    var newNode;
    node.innerHTML = '';
    newNode = $(node)[0].cloneNode(false);
    $(node).after(newNode);
    $(node).remove();
    return newNode;
  };

  root.orgApi = null;

  orgNotebook = {
    useNode: function(node, source) {
      var newNode, oldContent,
        _this = this;
      root.orgApi = this;
      sourceDiv = source;
      oldContent = $(node).text();
      newNode = emptyOutNode(node);
      editDiv = newNode;
      restorePosition(newNode, function() {
        return $(newNode).html(_this.markupOrg(oldContent));
      });
      return this.bindContent(newNode);
    },
    installOrgDOM: installOrgDOM
  };

  basicOrg = {
    __proto__: orgNotebook,
    markupOrg: markupOrg,
    markupOrgWithNode: markupOrgWithNode,
    bindContent: bindContent,
    executeSource: executeSource,
    createResults: createResults
  };

  root.basicOrg = basicOrg;

  root.orgNotebook = orgNotebook;

  root.markupOrg = markupOrg;

  root.bindContent = bindContent;

  root.cleanHeadline = cleanHeadline;

  root.getTags = getTags;

  root.reparse = reparse;

  root.reparseListeners = reparseListeners;

  root.findDomPosition = findDomPosition;

  root.getCollapsible = getCollapsible;

  root.getNodeText = getNodeText;

  root.parseOrgMode = parseOrgMode;

  root.orgAttrs = orgAttrs;

  root.content = content;

  root.contentSpan = contentSpan;

  root.checkStart = checkStart;

  root.optionalBoundary = optionalBoundary;

  root.boundarySpan = boundarySpan;

  root.displaySource = displaySource;

  root.checkEnterReparse = checkEnterReparse;

  root.checkCollapsed = checkCollapsed;

  root.checkExtraNewline = checkExtraNewline;

  root.followingSpan = followingSpan;

  root.currentLine = currentLine;

  root.checkSourceMod = checkSourceMod;

  root.getTextPosition = getTextPosition;

  root.isCollapsed = isCollapsed;

  root.nextOrgId = nextOrgId;

  root.modifyingKey = modifyingKey;

  root.getOrgParent = getOrgParent;

  root.getOrgType = getOrgType;

  root.executeText = executeText;

  root.orgEnv = orgEnv;

  root.getResultsForSource = getResultsForSource;

  root.initOrg = initOrg;

}).call(this);

/*
//@ sourceMappingURL=orgSupport.map
*/
