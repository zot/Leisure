(function() {
  var $, DOWN_ARROW, END, ENTER, ESC, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, Q, RIGHT_ARROW, UP_ARROW, arrows, bindMarkupDiv, bindSlider, chooseSlide, cleanEmptyNodes, closeWindow, createNode, getElementCode, handleInternalSections, hideSlide, isLeisureCode, jQuery, lastSlide, makeMarkupDiv, makeSection, makeSlideDiv, markupButtons, markupElement, markupSlideContent, markupSlides, mergeLeisureCode, mergeUp, nextSibling, oldSlide, presentLeisureCode, previousSibling, showSlide, slideControls, slideCount, slideKeyListener, slideName, slidePat, sliding, textNode, unwrapContent, _,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jQuery = window.jQuery, $ = window.$, _ = window._;

  ENTER = Notebook.ENTER, textNode = Notebook.textNode, createNode = Notebook.createNode, cleanEmptyNodes = Notebook.cleanEmptyNodes, isLeisureCode = Notebook.isLeisureCode, getElementCode = Notebook.getElementCode, previousSibling = Notebook.previousSibling, nextSibling = Notebook.nextSibling, presentLeisureCode = Notebook.presentLeisureCode, mergeLeisureCode = Notebook.mergeLeisureCode, closeWindow = Notebook.closeWindow, markupButtons = Notebook.markupButtons, ESC = Notebook.ESC, HOME = Notebook.HOME, END = Notebook.END, PAGE_UP = Notebook.PAGE_UP, PAGE_DOWN = Notebook.PAGE_DOWN, LEFT_ARROW = Notebook.LEFT_ARROW, RIGHT_ARROW = Notebook.RIGHT_ARROW, UP_ARROW = Notebook.UP_ARROW, DOWN_ARROW = Notebook.DOWN_ARROW, arrows = Notebook.arrows;

  Q = 81;

  window.markup = function markup(md) {
    var maindoc, nodes;
    nodes = document.querySelectorAll('[maindoc]');
    if (nodes.length === 0) {
      maindoc = Notebook.createNode("<div maindoc></div>");
      document.body.insertBefore(maindoc, document.body.firstChild);
      nodes = [maindoc];
    } else {
      maindoc = nodes[0];
    }
    md = md != null ? md : maindoc.innerHTML.replace(/^\s*<!--*/, '').replace(/-->\s*\n*/m, '').trim();
    document.body.classList.add('hideControls');
    markupSlides(maindoc, md);
    return Notebook.insertControls(maindoc);
  };

  lastSlide = null;

  slideCount = 0;

  if (typeof console !== "undefined" && console !== null) {
    if (typeof console.error === "function") {
      console.error(new Error("Incompatibility: using -webkit-calc").stack);
    }
  }

  slidePat = /^(\*\*\*[^\n]*\n(?:-\n)?)/m;

  slideName = /^\*\*\*([^\n]*)\n(?:-\n)?/m;

  markupSlides = function markupSlides(el, md) {
    var div, hasCode, slides;
    hasCode = markupSlideContent(el, md);
    slides = el.querySelectorAll('[leisureSection]');
    if (slides.length <= (el.querySelector('[leisureSection="Leisure Controls"]') ? 2 : 1)) {
      document.body.classList.add("oneSlide");
    }
    div = createNode("<div class='slide-controls'>\n  <div id='slide-killbutton' onclick='toggleSlideShow()' style='float: right'><button>Slides</button></div>\n  <div id='slide-num' style='float: right; margin-right: 10px'></div>\n</div>");
    markupButtons(div);
    el.appendChild(div);
    if (location.search && _.find(location.search.slice(1).split('&'), (function(p) {
      return p.match(/^slides=/);
    }))) {
      showSlide($(chooseSlide()));
    } else {
      document.body.classList.add('scroll');
    }
    return hasCode;
  };

  markupSlideContent = function markupSlideContent(el, md, noMain) {
    var content, continuation, hasCode, i, m, p, pages, _ref, _ref2;
    pages = md.split(slidePat);
    hasCode = false;
    if (pages.length > 1) {
      console.log("PAGES:", JSON.stringify(pages));
      document.body.classList.add('slide-container');
      el.innerHTML = '';
      bindSlider();
      el.removeAttribute('doc');
      for (i = 0, _ref = pages.length; i < _ref; i += 2) {
        p = pages[i];
        if (p) {
          continuation = i > 0 && (m = (_ref2 = pages[i - 1].match(slidePat)) != null ? _ref2[1] : void 0) && m.substring(m.length - 3) === '\n-\n';
          content = makeSlideDiv(el, continuation, pages[i - 1].match(slideName)[1].trim());
          if (i > 0) {
            hasCode = (markupElement(content, pages[i - 1] + p)) || hasCode;
          } else {
            hasCode = (markupElement(content, '***\n' + p)) || hasCode;
            if (noMain) unwrapContent(content);
          }
        }
      }
    } else {
      content = makeSlideDiv(el, false, 'Main');
      while (el.firstChild !== content.parentNode) {
        content.appendChild(el.firstChild);
      }
      hasCode = markupElement(content, md);
      if (noMain) unwrapContent(content);
    }
    return hasCode;
  };

  unwrapContent = function unwrapContent(content) {
    var el, section;
    section = content.parentNode;
    el = section.parentNode;
    el.insertBefore(content, section);
    Notebook.remove(section);
    return Notebook.unwrap(content);
  };

  makeSlideDiv = function makeSlideDiv(el, continuation, title) {
    var content, div, sectionTitle;
    lastSlide = div = Notebook.createNode("<div class='leisure_page'></div>");
    div.setAttribute('leisureSection', title);
    div.setAttribute('doc', '');
    div.setAttribute('slide', ++slideCount);
    div.classList.add('slide');
    div.classList.add('ui-corner-all');
    div.classList.add('ui-widget');
    div.classList.add('ui-widget-content');
    if (continuation) div.classList.add('continuation');
    el.appendChild(div);
    sectionTitle = Notebook.createNode("<span class='pageTitle'>" + title + "</span>");
    sectionTitle.setAttribute('leisureoutput', '');
    div.appendChild(sectionTitle);
    content = Notebook.createNode("<div class='pageContent'></div>");
    div.appendChild(content);
    return content;
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
      return document.querySelector('[maindoc]').firstElementChild;
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
    var code, codePos, len, lex, node, prev, prevCodePos, range, slide, _i, _len, _ref, _ref2, _ref3;
    len = md.length;
    slide = (_ref = md.match(slidePat)) != null ? _ref : '';
    _ref2 = window.marked((slide ? md.slice(slide[0].length) : md), {
      saveLex: true,
      gfm: true
    }), el.innerHTML = _ref2[0], lex = _ref2[1];
    prev = null;
    range = document.createRange();
    prevCodePos = -1;
    codePos = 0;
    _ref3 = el.querySelectorAll('code');
    for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
      node = _ref3[_i];
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
    var before, content, innerSections, node, parentContent, parentSection, parentTitle, prev, _i, _len, _ref;
    innerSections = el.querySelectorAll('[leisureSection]');
    parentContent = el.parentNode;
    parentSection = parentContent.parentNode;
    parentTitle = parentSection.getAttribute('leisureSection');
    if (!(el.firstChild.getAttribute('leisureSection'))) {
      if (!((_ref = parentSection.previousSibling) != null ? _ref.getAttribute('leisureSection') : void 0)) {
        content = makeSlideDiv(parentSection.parentNode, false, 'Main');
        parentSection.parentNode.insertBefore(content.parentNode, parentSection);
      }
      prev = parentSection.previousSibling.querySelector('.pageContent');
      while (el.firstChild && !(el.firstChild.getAttribute('leisureSection'))) {
        mergeUp(el.firstChild, prev);
      }
    }
    before = true;
    for (_i = 0, _len = innerSections.length; _i < _len; _i++) {
      node = innerSections[_i];
      if (node.getAttribute('leisureSection') === parentTitle) {
        content = node.querySelector('.pageContent');
        before = false;
        while (content.firstChild) {
          parentContent.insertBefore(content.firstChild, el);
        }
        Notebook.remove(node);
      } else if (before) {
        parentSection.parentNode.insertBefore(node, parentSection);
      } else {
        parentSection.parentNode.insertBefore(node, parentSection.nextSibling);
      }
    }
    if (!el.firstChild) {
      Notebook.remove(el);
      if (!parentContent.firstChild) return Notebook.remove(parentSection);
    }
  };

  mergeUp = function mergeUp(el, newParent) {
    newParent.appendChild(el);
    return Notebook.mergeLeisureCode(newParent.lastChild.previousSibling, newParent.lastChild);
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
        if (markupSlideContent(div, div.textContent, true)) {
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
          mergeLeisureCode(last, nextSibling(last));
        } else if (div.textContent.trim() === '') {
          cleanEmptyNodes(div);
        }
        return handleInternalSections(div);
      }
    });
  };

  Notebook.markupElement = markupElement;

}).call(this);
