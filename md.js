(function() {
  var $, DOWN_ARROW, END, ENTER, ESC, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, Q, RIGHT_ARROW, UP_ARROW, arrows, bindMarkupDiv, bindSlider, cleanEmptyNodes, closeWindow, createNode, getElementCode, hideSlide, isLeisureCode, jQuery, lastSlide, makeMarkupDiv, markupElement, markupSlides, mergeLeisureCode, nextSibling, presentLeisureCode, previousSibling, showSlide, slideControls, slideCount, slideKeyListener, sliding, textNode, _,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jQuery = window.jQuery, $ = window.$, _ = window._;

  ENTER = Notebook.ENTER, textNode = Notebook.textNode, createNode = Notebook.createNode, cleanEmptyNodes = Notebook.cleanEmptyNodes, isLeisureCode = Notebook.isLeisureCode, getElementCode = Notebook.getElementCode, previousSibling = Notebook.previousSibling, nextSibling = Notebook.nextSibling, presentLeisureCode = Notebook.presentLeisureCode, mergeLeisureCode = Notebook.mergeLeisureCode, closeWindow = Notebook.closeWindow, ESC = Notebook.ESC, HOME = Notebook.HOME, END = Notebook.END, PAGE_UP = Notebook.PAGE_UP, PAGE_DOWN = Notebook.PAGE_DOWN, LEFT_ARROW = Notebook.LEFT_ARROW, RIGHT_ARROW = Notebook.RIGHT_ARROW, UP_ARROW = Notebook.UP_ARROW, DOWN_ARROW = Notebook.DOWN_ARROW, arrows = Notebook.arrows;

  Q = 81;

  window.markup = function markup() {
    var el, md, nodes, oneDoc, _i, _len, _results;
    nodes = document.querySelectorAll('[doc]');
    oneDoc = nodes.length === 1 && nodes[0] === document.body;
    _results = [];
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      el = nodes[_i];
      md = Notebook.md = el.innerHTML.replace(/^\s<!--*/, '').replace(/-->\s*$/, '').trim();
      if (oneDoc) {
        _results.push(markupSlides(el, md));
      } else {
        _results.push(markupElement(el, md));
      }
    }
    return _results;
  };

  lastSlide = null;

  slideCount = 0;

  markupSlides = function markupSlides(el, md) {
    var continuation, div, firstNode, p, pages, _i, _len;
    pages = md.split(/^(?=\*\*\*\n)/m);
    if (pages.length > 1) {
      document.body.classList.add('slide-container');
      document.body.innerHTML = '';
      bindSlider();
      for (_i = 0, _len = pages.length; _i < _len; _i++) {
        p = pages[_i];
        continuation = p.match(/-\n/m);
        lastSlide = div = document.createElement('DIV');
        div.classList.add('slide');
        div.setAttribute('doc', '');
        if (continuation) div.classList.add('continuation');
        div.setAttribute('slide', ++slideCount);
        hideSlide($(div));
        document.body.appendChild(div);
        firstNode = document.createElement('DIV');
        div.appendChild(firstNode);
        markupElement(firstNode, p);
      }
      div = createNode("<div class='slide-controls'>\n  <div id='slide-killbutton' onclick='toggleSlideShow()' style='float: right'><button>Slides</button></div>\n  <div id='slide-num' style='float: right; margin-right: 10px'></div>\n</div>");
      document.body.appendChild(div);
      if (location.search && _.find(location.search.slice(1).split('&'), (function(p) {
        return p.match(/^slides=/);
      }))) {
        return showSlide($(document.body.firstElementChild));
      } else {
        return document.body.classList.add('scroll');
      }
    } else {
      return markupElement(el, md);
    }
  };

  sliding = true;

  window.toggleSlideShow = function toggleSlideShow() {
    sliding = $(document.body).is('.scroll');
    if (sliding) {
      $(document.body).removeClass('scroll');
      return showSlide($(document.body.firstElementChild));
    } else {
      hideSlide($('.slide.showing'));
      $(document.body).addClass('scroll');
      return $('#slide-num').html('');
    }
  };

  bindSlider = function bindSlider() {
    return document.body.addEventListener('keydown', slideKeyListener);
  };

  slideControls = [Q, ESC, LEFT_ARROW, RIGHT_ARROW, HOME, END, PAGE_UP, PAGE_DOWN];

  slideKeyListener = function slideKeyListener(e) {
    var c, cur, n, next;
    if (sliding) {
      window.evt = e;
      c = e.charCode || e.keyCode || e.which;
      console.log("keydown: " + c);
      if ((__indexOf.call(slideControls, c) >= 0) && !$(e.target).is('[leisurenode=code],[leisurenode=code] *')) {
        e.preventDefault();
        if (c === ESC) {
          return toggleSlideShow();
        } else if (c === Q) {
          return closeWindow();
        } else {
          cur = $('.slide.showing');
          next = (function() {
            switch (c) {
              case HOME:
                return $(document.body.firstElementChild);
              case END:
                return $(lastSlide);
              case LEFT_ARROW:
              case PAGE_UP:
                n = cur.prev();
                if (n.length) {
                  return n;
                } else {
                  return $(document.body.firstElementChild);
                }
                break;
              case RIGHT_ARROW:
              case PAGE_DOWN:
                n = cur.next('.slide');
                if (n.length) {
                  return n;
                } else {
                  return $(lastSlide);
                }
            }
          })();
          hideSlide(cur);
          return showSlide(next);
        }
      }
    }
  };

  showSlide = function showSlide(el) {
    $('#slide-num').html("" + (el[0].getAttribute('slide')) + " / " + slideCount);
    return el.removeClass('hidden').addClass('showing');
  };

  hideSlide = function hideSlide(el) {
    return el.addClass('hidden').removeClass('showing');
  };

  markupElement = function markupElement(el, md) {
    var code, codePos, len, lex, node, prev, prevCodePos, range, slide, _i, _len, _ref, _ref2;
    len = md.length;
    slide = md.match(/^\*\*\*\n(-\n)?|^-\n/);
    _ref = window.marked((slide ? md.slice(slide[0].length) : md), {
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
      code.setAttribute('leisureNode', 'code');
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
    div.setAttribute('leisureNode', 'markdown');
    div.setAttribute('contenteditable', 'false');
    editing = false;
    div.addEventListener('dblclick', function(e) {
      if (!editing) {
        div.innerHTML = '';
        div.appendChild(textNode(div.md));
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
      var first, frag, last, node, r, _i, _len, _ref;
      if (editing) {
        div.style.whiteSpace = '';
        editing = false;
        div.setAttribute('contenteditable', 'false');
        if (markupElement(div, div.textContent)) {
          _ref = div.querySelectorAll("[leisurenode='code']");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            presentLeisureCode(node, true);
          }
          r = document.createRange();
          r.selectNodeContents(div);
          frag = r.extractContents();
          first = frag.childNodes[0];
          last = frag.childNodes[frag.childNodes.length - 1];
          div.parentNode.replaceChild(frag, div);
          mergeLeisureCode(previousSibling(first), first);
          return mergeLeisureCode(last, nextSibling(last));
        } else if (div.textContent.trim() === '') {
          return cleanEmptyNodes(div);
        }
      }
    });
  };

}).call(this);
