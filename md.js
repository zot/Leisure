(function() {
  var ENTER, bindMarkupDiv, makeMarkupDiv, markupElement, textNode;

  ENTER = Notebook.ENTER, textNode = Notebook.textNode;

  window.markup = function markup() {
    var el, md, _i, _len, _ref, _results;
    _ref = document.querySelectorAll('[doc]');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      el = _ref[_i];
      md = Notebook.md = el.innerHTML.replace(/^\s<!--*/, '').replace(/-->\s*$/, '');
      _results.push(markupElement(el, md));
    }
    return _results;
  };

  markupElement = function markupElement(el, md) {
    var code, codePos, len, lex, node, prev, prevCodePos, range, _i, _len, _ref, _ref2;
    len = md.length;
    _ref = window.marked(md, {
      saveLex: true,
      gfm: true
    }), el.innerHTML = _ref[0], lex = _ref[1];
    prev = null;
    range = document.createRange();
    prevCodePos = -1;
    codePos = 0;
    _ref2 = el.querySelectorAll('code');
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      node = _ref2[_i];
      while (lex[codePos].type !== 'code') {
        codePos++;
      }
      if (node.parentNode.tagName !== 'PRE') {
        code = node;
      } else {
        code = node.parentNode;
        code.innerHTML = node.innerHTML;
      }
      code.setAttribute('noLeisureBar', '');
      code.setAttribute('leisureCode', '');
      code.md = lex[codePos].text;
      if (code.parentNode.firstChild !== code) {
        if (prev === null) {
          range.setStart(el, 0);
        } else {
          range.setStartAfter(prev);
        }
        range.setEndBefore(code);
        makeMarkupDiv(range, md.substring((prevCodePos === -1 ? 0 : len - lex[prevCodePos].remain), len - lex[codePos].remain - lex[codePos].textLen));
      }
      prevCodePos = codePos;
      codePos++;
      prev = code;
    }
    if (prevCodePos > -1) {
      if (lex[prevCodePos].remain > 0) {
        range.selectNodeContents(el);
        range.setStartAfter(prev);
        makeMarkupDiv(range, md.substring(len - lex[prevCodePos].remain));
      }
    } else {
      el.md = md;
      if (!el.bound) bindMarkupDiv(el);
    }
    return prevCodePos > -1;
  };

  makeMarkupDiv = function makeMarkupDiv(range, md) {
    var div;
    div = document.createElement('div');
    range.surroundContents(div);
    div.md = md;
    return bindMarkupDiv(div);
  };

  bindMarkupDiv = function bindMarkupDiv(div) {
    var editing;
    div.bound = true;
    div.setAttribute('markdown', '');
    div.setAttribute('contenteditable', 'false');
    editing = false;
    div.addEventListener('dblclick', function(e) {
      if (!editing) {
        div.innerHTML = '';
        div.appendChild(document.createTextNode(div.md));
        div.style.whiteSpace = 'pre-wrap';
        div.setAttribute('contenteditable', 'true');
        editing = true;
        return div.focus();
      }
    });
    div.addEventListener('keypress', function(e) {
      var br, r, s;
      if (editing) {
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
        }
      }
    });
    return div.addEventListener('blur', function(e) {
      var frag, node, r, _i, _len, _ref;
      if (editing) {
        div.style.whiteSpace = '';
        editing = false;
        div.setAttribute('contenteditable', 'false');
        if (markupElement(div, div.textContent)) {
          _ref = div.querySelectorAll("[leisurecode]");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            node.setAttribute('contentEditable', 'true');
            Notebook.bindNotebook(node);
            Notebook.changeTheme(node, 'thin');
            Notebook.evalDoc(node);
          }
          r = document.createRange();
          r.selectNodeContents(div);
          frag = r.extractContents();
          return div.parentNode.replaceChild(frag, div);
        }
      }
    });
  };

}).call(this);
