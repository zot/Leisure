(function() {
  var $, DOWN_ARROW, END, ENTER, ESC, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, Q, RIGHT_ARROW, UP_ARROW, arrows, bindMarkupDiv, bindSlider, chooseSlide, cleanEmptyNodes, closeWindow, createNode, getElementCode, handleInternalSections, hideSlide, isLeisureCode, jQuery, lastSlide, makeMarkupDiv, makeSection, markupButtons, markupElement, markupSlides, mergeLeisureCode, nextSibling, oldSlide, presentLeisureCode, previousSibling, showSlide, slideControls, slideCount, slideKeyListener, sliding, textNode, _,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jQuery = window.jQuery, $ = window.$, _ = window._;

  ENTER = Notebook.ENTER, textNode = Notebook.textNode, createNode = Notebook.createNode, cleanEmptyNodes = Notebook.cleanEmptyNodes, isLeisureCode = Notebook.isLeisureCode, getElementCode = Notebook.getElementCode, previousSibling = Notebook.previousSibling, nextSibling = Notebook.nextSibling, presentLeisureCode = Notebook.presentLeisureCode, mergeLeisureCode = Notebook.mergeLeisureCode, closeWindow = Notebook.closeWindow, markupButtons = Notebook.markupButtons, ESC = Notebook.ESC, HOME = Notebook.HOME, END = Notebook.END, PAGE_UP = Notebook.PAGE_UP, PAGE_DOWN = Notebook.PAGE_DOWN, LEFT_ARROW = Notebook.LEFT_ARROW, RIGHT_ARROW = Notebook.RIGHT_ARROW, UP_ARROW = Notebook.UP_ARROW, DOWN_ARROW = Notebook.DOWN_ARROW, arrows = Notebook.arrows;

  Q = 81;

  window.markup = function markup() {
    var el, md, nodes, oneDoc, _i, _len, _results;
    nodes = document.querySelectorAll('[doc]');
    oneDoc = nodes.length === 1 && nodes[0] === document.body;
    document.body.classList.add('hideControls');
    _results = [];
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      el = nodes[_i];
      md = Notebook.md = el.innerHTML.replace(/^\s*<!--*/, '').replace(/-->\s*\n*/m, '').trim();
      markupSlides(el, md);
      _results.push(Notebook.insertControls(el));
    }
    return _results;
  };

  lastSlide = null;

  slideCount = 0;

  if (typeof console !== "undefined" && console !== null) {
    if (typeof console.error === "function") {
      console.error(new Error("Incompatibility: using -webkit-calc").stack);
    }
  }

  markupSlides = function markupSlides(el, md) {
    var content, continuation, div, i, p, pages, slides, title, _ref;
    pages = md.split(/^\*\*\*([^\n]*)\n/m);
    if (pages.length > 1) {
      console.log("PAGES:", JSON.stringify(pages));
      document.body.classList.add('slide-container');
      document.body.innerHTML = '';
      bindSlider();
      el.removeAttribute('doc');
      for (i = 0, _ref = pages.length; i < _ref; i += 2) {
        p = pages[i];
        if (p) {
          continuation = p.match(/-\n/m);
          lastSlide = div = Notebook.createNode("<div class='leisure_page'></fieldset>");
          el.appendChild(div);
          div.classList.add('slide');
          div.classList.add('ui-corner-all');
          div.classList.add('ui-widget');
          div.classList.add('ui-widget-content');
          div.setAttribute('doc', '');
          if (continuation) div.classList.add('continuation');
          div.setAttribute('slide', ++slideCount);
          hideSlide($(div));
          content = Notebook.createNode("<div class='pageContent'></div>");
          div.innerHTML = '';
          div.appendChild(content);
          if (i > 0) {
            title = pages[i - 1].trim();
            div.setAttribute('leisureSection', title);
            markupElement(content, p);
            div.insertBefore(Notebook.createNode("<span class='pageTitle'>" + title + "</span>"), div.firstChild);
          } else {
            markupElement(content, p);
          }
        }
      }
      slides = el.querySelectorAll('[leisureSection]');
      if (slides.length <= (el.querySelector('[leisureSection="Leisure Controls"]') ? 2 : 1)) {
        document.body.classList.add("oneSlide");
      }
      div = createNode("<div class='slide-controls'>\n  <div id='slide-killbutton' onclick='toggleSlideShow()' style='float: right'><button>Slides</button></div>\n  <div id='slide-num' style='float: right; margin-right: 10px'></div>\n</div>");
      markupButtons(div);
      document.body.appendChild(div);
      if (location.search && _.find(location.search.slice(1).split('&'), (function(p) {
        return p.match(/^slides=/);
      }))) {
        return showSlide($(chooseSlide()));
      } else {
        return document.body.classList.add('scroll');
      }
    } else {
      return markupElement(el, md);
    }
  };

  chooseSlide = function chooseSlide() {
    var param;
    param = _.find(location.search.slice(1).split('&'), (function(p) {
      return p.match(/^slide=.*/);
    }));
    console.log(param);
    if (param) {
      return document.querySelector("[slide='" + (param.split('=')[1]) + "']");
    } else {
      return document.body.firstElementChild;
    }
  };

  sliding = true;

  oldSlide = 1;

  window.toggleSlideShow = function toggleSlideShow() {
    sliding = $(document.body).is('.scroll');
    if (sliding) {
      $(document.body).removeClass('scroll');
      return showSlide($("[slide=" + oldSlide + "]"));
    } else {
      oldSlide = $('.slide.showing').attr('slide');
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
        if (prev === null || prev.parentNode !== code.parentNode) {
          range.setStart(code.parentNode, 0);
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
        range.selectNodeContents(prev.parentNode);
        range.setStartAfter(prev);
        makeMarkupDiv(range, md.substring(len - lex[prevCodePos].remain));
      }
    } else {
      range.selectNodeContents(el);
      makeMarkupDiv(range, md);
    }
    return prevCodePos > -1;
  };

  handleInternalSections = function handleInternalSections(el) {
    var before, innerSections, node, parentSection, parentTitle, prev, _i, _len, _ref, _results;
    innerSections = el.querySelectorAll('[leisureSection]');
    parentSection = el.parentNode;
    parentTitle = parentSection.getAttribute('leisureSection');
    if (!(el.firstChild.getAttribute('leisureSection'))) {
      if (!((_ref = parentSection.previousSibling) != null ? _ref.getAttribute('leisureSection') : void 0)) {
        prev = document.createElement('DIV');
        prev.setAttribute('leisureSection', 'Main');
        parentSection.parentSection.insertBefore(prev, parentSection);
      } else {
        prev = parentSection.previousSibling;
      }
      while (!(el.firstChild.getAttribute('leisureSection'))) {
        prev.appendChild(el.firstChild);
      }
    }
    before = true;
    _results = [];
    for (_i = 0, _len = innerSections.length; _i < _len; _i++) {
      node = innerSections[_i];
      if (node.getAttribute('leisureSection') === parentTitle) {
        before = false;
        while (node.firstChild) {
          el.parentNode.insertBefore(node.firstChild, el);
        }
        _results.push(Notebook.remove(node));
      } else if (before) {
        _results.push(parentSection.parentNode.insertBefore(node, parentSection));
      } else {
        _results.push(parentSection.parentNode.insertBefore(node, parentSection.nextSibling));
      }
    }
    return _results;
  };

  makeSection = function makeSection(title, node, next) {
    var div;
    div = createNode("<div leisureSection='" + title + "'></div>");
    node.parentNode.insertBefore(div, node);
    while (div.nextSibling && div.nextSibling !== next) {
      div.appendChild(div.nextSibling);
    }
    return div;
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

  Notebook.markupElement = markupElement;

}).call(this);
