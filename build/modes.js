// Generated by CoffeeScript 1.9.3
(function() {
  define(['cs!./base', 'cs!./org', 'cs!./docOrg.litcoffee', 'cs!./ast', 'cs!./eval.litcoffee', 'cs!./editor.litcoffee', 'lib/lodash.min', 'jquery', 'cs!./ui.litcoffee', 'handlebars', 'cs!./export.litcoffee', './lib/prism', 'cs!./editorSupport.litcoffee'], function(Base, Org, DocOrg, Ast, Eval, Editor, _, $, UI, Handlebars, BrowserExports, Prism, EditorSupport) {
    var DataStore, DataStoreEditingOptions, Fragment, HL_LEVEL, HL_PRIORITY, HL_TAGS, HL_TEXT, HL_TODO, HTML, Headline, Html, KEYWORD_, KW_BOILERPLATE, KW_INFO, LeisureEditCore, Link, ListItem, Nil, OrgEditing, SimpleMarkup, _workSpan, addController, addView, blockCodeItems, blockEnvMaker, blockIsHidden, blockOrg, blockSource, blockText, blockVars, classifyListItems, closeList, controllerEval, copy, copyBlock, createWorkSpan, defaultEnv, escapeAttr, escapeHtml, fancyEditDiv, fancyMode, findEditor, followLink, getCodeItems, goodHtml, goodText, hasView, headlineRE, html, initializePendingViews, isHiddenSlide, keywordRE, languageEnvMaker, last, maybeReplaceHtml, mergeContext, mergeExports, nextImageSrc, orgDoc, parseMeat, parseOrgMode, plainEditDiv, plainMode, posFor, preserveSelection, prevImageSrc, prismAliases, prismHighlight, pushPendingInitialzation, removeController, removeView, renderView, replacementTargets, resultsArea, setHtml, singleControllers, slideNode, toggleSlideMode, viewKey, withContext, workSpan;
    defaultEnv = Base.defaultEnv;
    parseOrgMode = Org.parseOrgMode, parseMeat = Org.parseMeat, Fragment = Org.Fragment, Headline = Org.Headline, SimpleMarkup = Org.SimpleMarkup, Link = Org.Link, ListItem = Org.ListItem, HTML = Org.HTML, Nil = Org.Nil, headlineRE = Org.headlineRE, HL_LEVEL = Org.HL_LEVEL, HL_TODO = Org.HL_TODO, HL_PRIORITY = Org.HL_PRIORITY, HL_TEXT = Org.HL_TEXT, HL_TAGS = Org.HL_TAGS, keywordRE = Org.keywordRE, KW_BOILERPLATE = Org.KW_BOILERPLATE, KW_INFO = Org.KW_INFO, KEYWORD_ = Org.KEYWORD_;
    orgDoc = DocOrg.orgDoc, getCodeItems = DocOrg.getCodeItems, blockSource = DocOrg.blockSource;
    Nil = Ast.Nil;
    languageEnvMaker = Eval.languageEnvMaker, Html = Eval.Html, escapeHtml = Eval.escapeHtml, html = Eval.html, blockVars = Eval.blockVars;
    LeisureEditCore = Editor.LeisureEditCore, last = Editor.last, DataStore = Editor.DataStore, DataStoreEditingOptions = Editor.DataStoreEditingOptions, blockText = Editor.blockText, posFor = Editor.posFor, escapeHtml = Editor.escapeHtml, copy = Editor.copy, setHtml = Editor.setHtml, findEditor = Editor.findEditor, copyBlock = Editor.copyBlock, preserveSelection = Editor.preserveSelection;
    addView = UI.addView, removeView = UI.removeView, renderView = UI.renderView, hasView = UI.hasView, viewKey = UI.viewKey, addController = UI.addController, removeController = UI.removeController, withContext = UI.withContext, mergeContext = UI.mergeContext, initializePendingViews = UI.initializePendingViews, escapeAttr = UI.escapeAttr, nextImageSrc = UI.nextImageSrc, prevImageSrc = UI.prevImageSrc, pushPendingInitialzation = UI.pushPendingInitialzation;
    mergeExports = BrowserExports.mergeExports;
    OrgEditing = EditorSupport.OrgEditing, blockOrg = EditorSupport.blockOrg, blockCodeItems = EditorSupport.blockCodeItems, blockIsHidden = EditorSupport.blockIsHidden, blockEnvMaker = EditorSupport.blockEnvMaker, controllerEval = EditorSupport.controllerEval;
    singleControllers = {};
    plainMode = {
      name: 'plain',
      handleChanges: function(changes) {},
      renderChanged: function(opts, blocks, prefix, replace) {
        var block, id, ref, results1;
        ref = opts.slidesFor(blocks);
        results1 = [];
        for (id in ref) {
          block = ref[id];
          results1.push(this.render(opts, block, prefix, replace));
        }
        return results1;
      },
      render: function(opts, block, prefix, replace) {
        var attrs, error, pos, ref, ref1, ref2, ref3, result, results, source, text;
        ref = blockCodeItems(this, block), source = ref.source, error = ref.error, results = ref.results;
        attrs = "id='" + prefix + block._id + "' data-block='" + block.type + "'";
        if (block.type === 'headline') {
          attrs += " data-headline='" + block.level + "'";
        }
        text = '';
        if (!results && !error) {
          text += this.renderMainBlock(block);
        } else {
          if (!error) {
            text += this.renderMainText(block.text.substring(0, (ref1 = results != null ? results.offset : void 0) != null ? ref1 : block.text.length));
          } else {
            pos = source.offset + source.contentPos + Number(error.info.match(/([^,]*),/)[1]) - 1;
            text += escapeHtml(block.text.substring(0, pos)) + "<span class='errorMark' contenteditable='false' data-noncontent>✖</span>" + escapeHtml(block.text.substring(pos, (ref2 = results != null ? results.offset : void 0) != null ? ref2 : block.text.length));
          }
          if (results != null) {
            text += "" + (escapeHtml((ref3 = results != null ? results.text : void 0) != null ? ref3 : '')) + (escapeHtml(block.text.substring(results.offset + results.text.length)));
          }
        }
        result = "<span " + attrs + ">" + text + "</span>";
        maybeReplaceHtml(block, prefix, result, replace);
        return [result, block.next];
      },
      renderMainBlock: function(block) {
        var text, txt;
        txt = block.text;
        if (block.type === 'headline') {
          text = parseOrgMode(block.text).children[0].partOffsets().text;
          return "<span class='plain-headline'>" + (escapeHtml(txt.substring(0, text.start))) + (this.renderMainText(txt.substring(text.start, text.end))) + (escapeHtml(txt.substring(text.end))) + "</span>";
        } else {
          return this.renderMeat(parseOrgMode(block.text).children[0]);
        }
      },
      renderMainText: function(txt) {
        return this.renderMeat(parseMeat(txt, 0, '', true)[0]);
      },
      renderMeat: function(org) {
        var result;
        result = '';
        while (org) {
          result += org instanceof SimpleMarkup ? this.renderSimple(org) : escapeHtml(org.allText());
          org = org.next;
        }
        return result;
      },
      renderSimple: function(org) {
        var c, guts, j, len, ref;
        guts = '';
        ref = org.children;
        for (j = 0, len = ref.length; j < len; j++) {
          c = ref[j];
          guts += this.renderMeat(c, true);
        }
        guts = "" + org.text[0] + guts + org.text[org.text.length - 1];
        switch (org.type === 'simple' && org.markupType) {
          case 'bold':
            return "<b>" + guts + "</b>";
          case 'italic':
            return "<i>" + guts + "</i>";
          case 'underline':
            return "<span style='text-decoration: underline'>" + guts + "</span>";
          case 'strikethrough':
            return "<span style='text-decoration: line-through'>" + guts + "</span>";
          case 'code':
            return "<code>" + guts + "</code>";
          case 'verbatim':
            return "<code>" + guts + "</code>";
          default:
            return escapeHtml(org.allText());
        }
      },
      renderSimpleChild: function(org) {
        if (!org.children) {
          return escapeHtml(org.text);
        } else {
          return this.renderSimple(org.children[0]);
        }
      }
    };
    toggleSlideMode = function(slideDom) {
      var block, blockHtml, opts, ref;
      if (opts = (ref = findEditor(slideDom)) != null ? ref.options : void 0) {
        block = opts.getBlock(opts.idForNode(slideDom[0]));
        opts.toggleSlide(block._id);
        blockHtml = opts.renderBlock(opts.getBlock(block))[0];
        preserveSelection(function() {
          return (block.type === 'headline' ? slideDom.closest('[data-view]') : slideDom.closest('[data-view="leisure-top-chunk"]')).replaceWith($(blockHtml));
        });
        return initializePendingViews();
      }
    };
    Handlebars.registerHelper('render', function(block) {
      return fancyMode.render(UI.context.opts, block, UI.context.prefix)[0];
    });
    Handlebars.registerHelper('renderHtml', function(html) {
      var id, ids, opts, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, vars;
      ref4 = blockVars((ref = UI.context) != null ? (ref1 = ref.opts) != null ? ref1.data : void 0 : void 0, (ref2 = this.block) != null ? (ref3 = ref2.codeAttributes) != null ? ref3["var"] : void 0 : void 0), vars = ref4[0], ids = ref4[1];
      if (ids.length > 0 && (id = (ref5 = (ref6 = UI.context) != null ? ref6.simpleViewId : void 0) != null ? ref5 : this.id) && (opts = (ref7 = UI.context) != null ? ref7.opts : void 0)) {
        pushPendingInitialzation((function(_this) {
          return function() {
            var block, blocks, controller, controllerName, env, j, len, node, ref8, viewNode;
            viewNode = $("#" + id);
            if ((node = opts.nodeForId(_this.block._id)) && (node[0] === viewNode[0] || node[0].compareDocumentPosition(viewNode[0]) & Element.DOCUMENT_POSITION_CONTAINS)) {
              blocks = (ref8 = node.attr('data-observe')) != null ? ref8 : '';
              for (j = 0, len = ids.length; j < len; j++) {
                id = ids[j];
                blocks += " " + id;
              }
              node.attr('data-observe', blocks);
            }
            if (controllerName = _this.block.codeAttributes.controller) {
              if (!(controller = singleControllers[controllerName])) {
                if (block = opts.getBlock(opts.data.namedBlocks[controllerName])) {
                  controller = singleControllers[controllerName] = {};
                  env = blockEnvMaker(block)({
                    __proto__: defaultEnv
                  });
                  env["eval"] = function(text) {
                    return controllerEval.call(controller, text);
                  };
                  env.write = function(str) {};
                  env.errorAt = function(offset, msg) {
                    return console.log(msg);
                  };
                  env.executeText(blockSource(block), Nil, (function() {}));
                }
              }
              return controller != null ? controller.initializeView(viewNode[0], vars) : void 0;
            }
          };
        })(this));
      }
      return Handlebars.compile(html)(vars);
    });
    initializePendingViews = function() {
      UI.initializePendingViews();
      return singleControllers = {};
    };
    Handlebars.registerHelper('renderPlain', function(data) {
      var block, edata, end, next, plainText, ref, ref1, text;
      text = '';
      edata = UI.context.opts.data;
      block = edata.getBlock(data.blockId);
      end = (ref = edata.nextRight(block)) != null ? ref._id : void 0;
      while (block && block._id !== end) {
        ref1 = plainMode.render(UI.context.opts, block, UI.context.prefix), plainText = ref1[0], next = ref1[1];
        text += plainText;
        block = edata.getBlock(next);
      }
      return text;
    });
    Handlebars.registerHelper('hiddenBeforeSource', function() {
      var source;
      source = this.codeItems.source;
      if (source.offset) {
        return "<span class='hidden'>" + (this.block.text.substring(0, source.offset)) + "</span>";
      } else {
        return '';
      }
    });
    Handlebars.registerHelper('hiddenAfterSource', function() {
      var end, source;
      source = this.codeItems.source;
      if ((end = source.end()) > this.block.text.length) {
        return "<span class='hidden'>" + (this.block.text.substring(source.end())) + "</span>";
      } else {
        return '';
      }
    });
    Handlebars.registerHelper('htmlDataUrl', function() {
      return "data:text/html;charset=utf-8," + (encodeURI(this.source));
    });
    Handlebars.registerHelper('sourceHeader', function() {
      var src;
      src = this.codeItems.source;
      return src.text.substring(0, src.contentPos);
    });
    Handlebars.registerHelper('sourceBoiler', function() {
      var src;
      src = this.codeItems.source;
      return src.text.substring(0, src.infoPos);
    });
    Handlebars.registerHelper('sourceInfo', function() {
      var src;
      src = this.codeItems.source;
      return src.text.substring(src.infoPos, src.contentPos);
    });
    Handlebars.registerHelper('renderSource', function() {
      var error, pos, ref, source;
      ref = this.codeItems, error = ref.error, source = ref.source;
      if (error) {
        pos = Number(error.info.match(/([^,]*),/)[1]) - 1;
        return escapeHtml(source.content.substring(0, pos)) + "<span class='errorMark' contenteditable='false' data-noncontent>✖</span>" + escapeHtml(source.content.substring(pos));
      } else {
        return prismHighlight(this.language, this.source);
      }
    });
    Handlebars.registerHelper('sourceFooter', function() {
      var src;
      src = this.codeItems.source;
      return src.text.substring(src.contentPos + src.content.length);
    });
    Handlebars.registerHelper('resultsHeader', function() {
      var res;
      res = this.codeItems.results;
      return res.text.substring(0, res.contentPos);
    });
    Handlebars.registerHelper('resultsContents', function() {
      var res;
      res = this.codeItems.results;
      return resultsArea(res.text.substring(res.contentPos));
    });
    slideNode = function(node) {
      return $(node).closest('slideHolder').closest('[data-view]');
    };
    isHiddenSlide = function(block) {
      return block.type === 'headline' && blockIsHidden(block);
    };
    closeList = function(level, lastItem, stack) {
      var closeCount, prevLast;
      closeCount = 0;
      prevLast = lastItem;
      while (lastItem && lastItem.level > level) {
        delete lastItem.middleItem;
        lastItem.lastItem = true;
        lastItem = stack.pop();
        closeCount++;
      }
      prevLast.closeCount = closeCount;
      return lastItem;
    };
    classifyListItems = function(org) {
      var lastItem, stack;
      if (!(org.firstItem || org.middleItem || org.lastItem)) {
        stack = [];
        org.firstItem = true;
        lastItem = org;
        while (org = org.next) {
          if (org instanceof ListItem) {
            if (lastItem.level > org.level) {
              lastItem = closeList(org.level, lastItem, stack);
            }
            if (lastItem.level < org.level) {
              org.firstItem = true;
              stack.push(lastItem);
            } else {
              org.middleItem = true;
            }
            lastItem = org;
          }
        }
        return closeList(-1, lastItem, stack);
      }
    };
    fancyMode = {
      name: 'fancy',
      handleChanges: function(opts, changes) {
        var block, j, len, newNode, old, ref, results1, sibling, siblingNode;
        ref = changes.newBlocks;
        results1 = [];
        for (j = 0, len = ref.length; j < len; j++) {
          block = ref[j];
          if (changes.sets[block._id] && (old = opts.getBlock(block._id)) && isHiddenSlide(block) !== isHiddenSlide(old)) {
            if (isHiddenSlide(block)) {
              results1.push(slideNode(opts.nodeForId(block._id)).remove());
            } else {
              siblingNode = null;
              newNode = this.render(opts, block, opts.prefix)[0];
              sibling = block;
              while (!siblingNode && (sibling = opts.data.previousSibling(sibling, changes))) {
                if ((siblingNode = opts.nodeForId(sibling._id)).length === 0) {
                  siblingNode = null;
                }
              }
              if (siblingNode) {
                slideNode(siblingNode).after(newNode);
              } else {
                sibling = block;
                while (!siblingNode && (sibling = opts.data.nextSibling(sibling, changes))) {
                  if ((siblingNode = opts.nodeForId(sibling._id)).length === 0) {
                    siblingNode = null;
                  }
                }
                if (siblingNode) {
                  slideNode(siblingNode).before(newNode);
                } else {
                  $(opts.editor.node).prepend(newNode);
                }
              }
              results1.push(initializePendingViews());
            }
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      },
      renderChanged: function(opts, blocks, prefix, replace) {
        var block, j, len, ref, rendered, results1, slide;
        rendered = {};
        results1 = [];
        for (j = 0, len = blocks.length; j < len; j++) {
          block = blocks[j];
          if (!opts.isToggled(block)) {
            results1.push(this.render(opts, block, prefix, replace));
          } else if (opts.isToggled(block) && !rendered[(ref = (slide = opts.slideFor(block))) != null ? ref._id : void 0]) {
            rendered[slide._id] = true;
            results1.push(this.render(opts, slide, prefix, replace));
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      },
      render: function(opts, block, prefix, replace) {
        var ref;
        if (opts.shouldHide(block)) {
          return ['', (ref = opts.data.nextRight(block)) != null ? ref._id : void 0];
        } else {
          return opts.withNewContext((function(_this) {
            return function() {
              UI.context.currentView = opts.nodeForId(block._id);
              if (block.type === 'headline') {
                return _this.renderHeadline(opts, block, prefix, replace);
              } else if (!block.prev) {
                return _this.renderFirstBlocks(opts, block, prefix, replace);
              } else {
                return _this.renderNontop(opts, block, prefix, replace);
              }
            };
          })(this));
        }
      },
      renderNontop: function(opts, block, prefix, replace) {
        if (block.type === 'chunk') {
          return this.renderChunk(opts, block, prefix, replace);
        } else if (block.type === 'code') {
          return this.renderCode(opts, block, prefix, replace);
        } else {
          return plainMode.render(opts, block, prefix, replace);
        }
      },
      renderView: function(type, ctx, next, data, targets) {
        return [renderView(type, ctx, data, targets), next];
      },
      renderHeadline: function(opts, block, prefix, replace) {
        var id, m, next, nextText, ref, ref1, ref2, targets, text, viewName;
        next = (ref = opts.data.nextRight(block)) != null ? ref._id : void 0;
        viewName = block.type === 'headline' && block.level === 1 ? opts.isToggled(block) ? (UI.context.viewAttrs = _.merge({
          "class": 'plain'
        }, (ref1 = UI.context.viewAttrs) != null ? ref1 : {}), 'leisure-headline-plain') : 'leisure-top-headline' : 'leisure-headline';
        if (hasView(viewName)) {
          m = block.text.match(headlineRE);
          UI.context.currentView = targets = replacementTargets(block, prefix, replace);
          return this.renderView(viewName, null, next, {
            id: prefix + block._id,
            blockId: block._id,
            EOL: '\n',
            topLevel: block.level === 1,
            level: block.level,
            stars: m[HL_LEVEL],
            maintext: block.text.substring(m[HL_LEVEL].length),
            children: opts.data.children(block)
          }, targets);
        } else {
          text = "<span id='" + prefix + block._id + "' data-block='" + block.type + "'>";
          text += escapeHtml(block.text);
          id = block.next;
          while (id && id !== next) {
            ref2 = this.render(opts, opts.data.getBlock(id), prefix), nextText = ref2[0], id = ref2[1];
            text += nextText;
          }
          text += "</span>";
          maybeReplaceHtml(block, prefix, text, replace);
          return [text, next];
        }
      },
      renderFirstBlocks: function(opts, block, prefix, replace) {
        var cur, next, plain, ref, ref1, targets, text, txt;
        if (hasView('leisure-top-chunk')) {
          if (plain = opts.isToggled(block)) {
            UI.context.viewAttrs = _.merge({
              "class": 'plain'
            }, (ref = UI.context.viewAttrs) != null ? ref : {});
          }
          text = '';
          cur = block;
          UI.context.currentView = targets = replacementTargets(block, prefix, replace);
          while (!(cur.type === 'headline' && cur.level === 1)) {
            ref1 = plain ? plainMode.render(opts, cur, prefix) : this.renderNontop(opts, cur, prefix), txt = ref1[0], next = ref1[1];
            text += txt;
            if (!next) {
              break;
            }
            cur = opts.getBlock(next);
          }
          return this.renderView('leisure-top-chunk', null, next, {
            id: prefix + block._id,
            text: text,
            topLevel: !block.prev,
            EOL: '\n'
          }, targets);
        } else {
          return this.renderNontop(opts, block, prefix);
        }
      },
      renderChunk: function(opts, block, prefix, replace) {
        var targets, viewType;
        viewType = 'leisure-chunk';
        UI.context.currentView = targets = replacementTargets(block, prefix, replace);
        if (hasView(viewType)) {
          return this.renderView(viewType, null, block.next, {
            id: prefix + block._id,
            text: this.renderOrg(blockOrg(opts.data, block)),
            topLevel: !block.prev,
            EOL: '\n'
          }, targets);
        } else {
          return this.renderOrgBlock(opts, block, prefix, replace);
        }
      },
      renderCode: function(opts, block, prefix, replace) {
        var items, key, lang, m, name, nameBoiler, org, ref, ref1, ref2, ref3, ref4, ref5, ref6, results, source, sourceData, targets;
        key = "leisure-code";
        org = blockOrg(opts.data, block);
        ref2 = items = getCodeItems((ref = (ref1 = org.children) != null ? ref1[0] : void 0) != null ? ref : org), name = ref2.name, source = ref2.source, results = ref2.results;
        lang = results && results.text.length > results.contentPos && _.contains((ref3 = (ref4 = block.codeAttributes) != null ? (ref5 = ref4.results) != null ? ref5.split(' ') : void 0 : void 0) != null ? ref3 : [], 'hidecode') ? 'results-only' : items.source instanceof HTML ? 'inline-html' : block.language;
        if (hasView(key, lang)) {
          nameBoiler = name && (m = name.text.match(keywordRE)) ? m[KW_BOILERPLATE] : void 0;
          UI.context.currentView = targets = replacementTargets(block, prefix, replace);
          sourceData = {
            id: prefix + block._id,
            codeItems: items,
            language: block.language,
            block: block,
            header: block.text.substring(0, block.codePrelen),
            source: blockSource(block),
            footer: block.text.substring(block.text.length - block.codePostlen, source.end()),
            nameBoiler: nameBoiler != null ? nameBoiler : '',
            nameText: name ? name.text.substring(nameBoiler.length, name.text.length - 1) : '',
            name: name ? name.text.substring(name.info) : '',
            afterName: name ? block.text.substring(name.end(), source.offset) : '',
            inter: results ? block.text.substring(source.end(), results != null ? results.offset : void 0) : block.text.substring(source.end()),
            results: results ? resultsArea(block.text.substring(results.offset, results.end())) : '',
            resultsContent: results ? resultsArea(results.text.substring(results.contentPos)) : '',
            beforeResults: block.text.substring(0, (ref6 = results != null ? results.offset : void 0) != null ? ref6 : source.end())
          };
          sourceData.text = this.renderCodeOrg(sourceData);
          return this.renderView(key, lang, block.next, sourceData, targets);
        } else {
          return plainMode.render(opts, block, prefix, replace);
        }
      },
      renderOrgBlock: function(opts, block, prefix, replace) {
        var text;
        text = "<span id='" + block._id + "'>" + (this.renderOrg(blockOrg(opts.data, block))) + "</span>";
        maybeReplaceHtml(block, prefix, replace);
        return [text, block.next];
      },
      renderCodeOrg: function(context) {
        var block, error, name, pos, ref, ref1, ref2, ref3, ref4, results, source, text;
        block = context.block;
        ref = context.codeItems, name = ref.name, source = ref.source, error = ref.error, results = ref.results;
        text = '';
        pos = 0;
        ref1 = this.renderCodeSegment('name', pos, text, context), pos = ref1[0], text = ref1[1];
        ref2 = this.renderCodeSegment('source', pos, text, context), pos = ref2[0], text = ref2[1];
        ref3 = this.renderCodeSegment('error', pos, text, context), pos = ref3[0], text = ref3[1];
        ref4 = this.renderCodeSegment('results', pos, text, context), pos = ref4[0], text = ref4[1];
        if (pos < block.text.length) {
          text += escapeHtml(block.text.substring(pos));
        }
        return text;
      },
      renderCodeSegment: function(name, pos, text, context) {
        var block, key, org;
        if (org = context.codeItems[name]) {
          block = context.block;
          if (hasView(key = "leisure-code-" + name, block.language)) {
            if (org.offset > pos) {
              text += escapeHtml(block.text.substring(pos, org.offset));
            }
            text += (this.renderView(key, block.language, null, context))[0];
            return [org.end(), text];
          } else if (name === 'results') {
            return [org.end(), resultsArea(org.allText())];
          } else {
            return [pos, text];
          }
        } else {
          return [pos, text];
        }
      },
      renderOrg: function(org) {
        var child;
        if (org instanceof SimpleMarkup) {
          return this.renderSimple(org);
        } else if (org instanceof Link) {
          return this.renderLink(org);
        } else if (org instanceof Fragment) {
          return ((function() {
            var j, len, ref, results1;
            ref = org.children;
            results1 = [];
            for (j = 0, len = ref.length; j < len; j++) {
              child = ref[j];
              results1.push(this.renderOrg(child));
            }
            return results1;
          }).call(this)).join('');
        } else if (org instanceof ListItem) {
          return this.renderList(org);
        } else {
          return org.allText();
        }
      },
      renderHtml: function(org) {
        return "<span class='hidden'>" + (escapeHtml(org.leading)) + "</span>" + ($(org.content)[0].outerHTML) + "<span class='hidden'>" + (escapeHtml(org.trailing)) + "</span>";
      },
      renderList: function(org) {
        var child, i, j, ref, text;
        classifyListItems(org);
        text = org.firstItem ? '<ul>' : '';
        text += "<li><span class='hidden'>" + (escapeHtml(org.text.substring(0, org.contentOffset))) + "</span>" + (((function() {
          var j, len, ref, results1;
          ref = org.children;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            child = ref[j];
            results1.push(this.renderOrg(child));
          }
          return results1;
        }).call(this)).join(''));
        for (i = j = 0, ref = org.closeCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          text += '</ul>';
        }
        return text;
      },
      renderLink: function(org) {
        var block, c, data, desc, error, guts, j, leisureMatch, len, obj, objectName, ref, ref1, src, title, type, viewName;
        if (leisureMatch = org.isLeisure()) {
          objectName = leisureMatch[1];
          viewName = leisureMatch[2] ? " data-view-name='" + leisureMatch[2] + "'" : '';
          data = UI.context.opts.data;
          error = !(obj = data.getBlock(data.namedBlocks[objectName])) ? "No object named " + objectName : !(obj = (ref = (block = data.getBlock(data.namedBlocks[objectName]))) != null ? ref.yaml : void 0) ? "Object " + objectName + " isn't yaml" : !(type = obj != null ? obj.type : void 0) ? "No type field in object " + objectName : !hasView(type, viewName) ? "No view '" + (viewKey(type, viewName)) + "'" : void 0;
          if (error) {
            return "<span class='error' data-noncontent title='" + (escapeAttr(error)) + "'><b>✖</b></span>" + (escapeHtml(org.allText()));
          } else {
            return "<span class='hidden'>" + (escapeHtml(org.allText())) + "</span><span data-noncontent contenteditable='false'>" + (renderView(type, viewName, obj, null, block)) + "</span>";
          }
        } else if (org.isImage()) {
          title = ((desc = org.descriptionText()) ? " title='" + (escapeHtml(desc)) + "'" : "");
          src = escapeHtml(org.path);
          if (org.path.indexOf('file:') === 0) {
            src = prevImageSrc(src);
          }
          return "<img src='" + src + "'" + title + "><span class='hidden'>" + (escapeHtml(org.allText())) + "</span>";
        } else {
          guts = '';
          ref1 = org.children;
          for (j = 0, len = ref1.length; j < len; j++) {
            c = ref1[j];
            guts += this.renderOrg(c);
          }
          if (!guts) {
            return "<span class='hidden'>[[</span><a onclick='Leisure.followLink(event)' href='" + org.path + "'>" + org.path + "</a><span class='hidden'>]]</span>";
          } else {
            return "<span class='hidden'>[[" + org.path + "][</span><a onclick='Leisure.followLink(event)' href='" + org.path + "'>" + guts + "</a><span class='hidden'>]]</span>";
          }
        }
      },
      renderSimple: function(org) {
        var c, guts, j, len, ref, text;
        guts = '';
        ref = org.children;
        for (j = 0, len = ref.length; j < len; j++) {
          c = ref[j];
          guts += this.renderOrg(c, true);
        }
        text = (function() {
          switch (org.markupType) {
            case 'bold':
              return "<b>" + guts + "</b>";
            case 'italic':
              return "<i>" + guts + "</i>";
            case 'underline':
              return "<span style='text-decoration: underline'>" + guts + "</span>";
            case 'strikethrough':
              return "<span style='text-decoration: line-through'>" + guts + "</span>";
            case 'code':
              return "<code>" + guts + "</code>";
            case 'verbatim':
              return "<code>" + guts + "</code>";
            default:
              return guts;
          }
        })();
        return "<span class='hidden'>" + org.text[0] + "</span>" + text + "<span class='hidden'>" + (goodText(org.text[0])) + "</span>";
      }
    };
    _workSpan = null;
    workSpan = function() {
      return _workSpan || createWorkSpan();
    };
    createWorkSpan = function() {
      return _workSpan = $("<span></span>");
    };
    goodHtml = function(text) {
      var ref;
      return (ref = workSpan().html(text).html()) != null ? ref : '';
    };
    goodText = function(text) {
      var ref;
      return (ref = workSpan().text(text).html()) != null ? ref : '';
    };
    resultsArea = function(results) {
      var firstResult;
      if (!(firstResult = results.indexOf('\n') + 1) || results[firstResult] === ':') {
        return "<span class='hidden'>" + (goodText(results)) + "</span><span data-noncontent>" + (results.replace(/^(: )(.*\n)/gm, function(m, g1, g2) {
          return goodHtml(g2);
        })) + "</span>";
      } else {
        return "<span class='hidden'>" + (results.substring(0, firstResult)) + "</span>" + (fancyMode.renderOrg(blockOrg(null, {
          text: results.substring(firstResult)
        })));
      }
    };
    plainEditDiv = function(div, data) {
      $(div).addClass('plain');
      return new LeisureEditCore($(div), new OrgEditing(data));
    };
    fancyEditDiv = function(div, data) {
      return new LeisureEditCore($(div), new OrgEditing(data).setMode(fancyMode));
    };
    followLink = function(e) {
      return console.log("Click link", e);
    };
    prismAliases = {
      html: 'markup',
      coffee: 'coffeescript',
      cs: 'coffeescript',
      js: 'javascript'
    };
    prismHighlight = function(lang, text) {
      var l;
      if (l = prismAliases[lang]) {
        lang = l;
      }
      if (Prism.languages[lang]) {
        return Prism.highlight(text, Prism.languages[lang], lang);
      } else {
        return escapeHtml(text);
      }
    };
    replacementTargets = function(block, prefix, replace) {
      var targets;
      if (replace && (targets = $("#" + prefix + block._id)) && targets.length) {
        return targets.closest('[data-view]');
      }
    };
    maybeReplaceHtml = function(block, prefix, html, replace) {
      var ref;
      if ((ref = replacementTargets(block, prefix, replace)) != null) {
        ref.replaceWith(html);
      }
      if (replace) {
        return initializePendingViews();
      }
    };
    mergeExports({
      plainMode: plainMode,
      fancyMode: fancyMode,
      toggleSlideMode: toggleSlideMode,
      blockVars: blockVars
    });
    return {
      plainMode: plainMode,
      fancyMode: fancyMode,
      plainEditDiv: plainEditDiv,
      fancyEditDiv: fancyEditDiv
    };
  });

}).call(this);

//# sourceMappingURL=modes.js.map
