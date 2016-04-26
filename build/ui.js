// Generated by CoffeeScript 1.10.0
(function() {
  var slice = [].slice;

  define(['handlebars', './export', './editor', './coffee-script', 'immutable'], function(Handlebars, Exports, Editor, CoffeeScript, Immutable) {
    var Set, activateScripts, activating, addController, addView, bindView, compile, configurePanels, controllers, create, defaults, dontRerender, escapeAttr, escapeHtml, findEditor, getController, getControllers, getPanel, getPendingViews, getTemplate, getTemplates, getView, hasView, imageRefreshCounter, initializePendingViews, localResources, mergeContext, mergeExports, nextImageSrc, pendingViews, prevImageSrc, pushPendingInitialzation, ref, refreshImage, registerHelper, removeController, removeView, renderView, root, runTemplate, setPanelExpanded, showMessage, simpleRenderView, templates, viewIdCounter, viewKey, withContext;
    ref = window.Handlebars = Handlebars, compile = ref.compile, create = ref.create, registerHelper = ref.registerHelper;
    mergeExports = Exports.mergeExports;
    escapeHtml = Editor.escapeHtml, findEditor = Editor.findEditor;
    Set = Immutable.Set;
    templates = {};
    controllers = {};
    defaults = {
      controllers: {},
      templates: {}
    };
    root = null;
    activating = false;
    viewIdCounter = 0;
    pendingViews = [];
    imageRefreshCounter = 0;
    localResources = {};
    getTemplates = function(isDefault) {
      if (isDefault) {
        return defaults.templates;
      } else {
        return templates;
      }
    };
    getTemplate = function(type) {
      var ref1;
      return (ref1 = templates[type]) != null ? ref1 : defaults.templates[type];
    };
    getControllers = function(isDefault) {
      if (isDefault) {
        return defaults.controllers;
      } else {
        return controllers;
      }
    };
    getController = function(type) {
      var ref1;
      return (ref1 = controllers[type]) != null ? ref1 : defaults.controllers[type];
    };
    nextImageSrc = function(src) {
      var hashLoc, ref1, ref2, slide;
      if ((ref1 = (slide = (ref2 = root.context.currentView) != null ? ref2.closest('.slideholder') : void 0)) != null ? ref1.length : void 0) {
        slide.attr('imgCount', imageRefreshCounter);
      }
      if ((hashLoc = src.indexOf('#')) === -1) {
        hashLoc = src.length;
      }
      return (src.substring(0, hashLoc)) + "#" + imageRefreshCounter;
    };
    prevImageSrc = function(src) {
      var count, hashLoc, ref1, ref2, slide;
      count = ((ref1 = (slide = (ref2 = root.context.currentView) != null ? ref2.closest('.slideholder') : void 0)) != null ? ref1.length : void 0) ? Number(slide.attr('imgCount')) : imageRefreshCounter - 1;
      if ((hashLoc = src.indexOf('#')) === -1) {
        hashLoc = src.length;
      }
      return (src.substring(0, hashLoc)) + "#" + count;
    };
    refreshImage = function(img) {
      var att, i, len, newImg, ref1;
      if (img.src.indexOf("file:") === 0) {
        newImg = document.createElement('img');
        ref1 = img.attributes;
        for (i = 0, len = ref1.length; i < len; i++) {
          att = ref1[i];
          newImg.setAttribute(att.name, att.value);
        }
        newImg.onload = function() {
          return $(img).replaceWith(newImg);
        };
        return newImg.src = nextImageSrc(img.src);
      }
    };
    viewKey = function(type, context) {
      if (context) {
        return (type.trim()) + "/" + (context.trim());
      } else {
        return type != null ? type.trim() : void 0;
      }
    };
    addView = function(type, context, template, isDefault) {
      var name;
      getTemplates(isDefault)[name = viewKey(type, context)] = compile(template);
      return Handlebars.registerPartial(name, "{{#viewWrapper '" + name + "' this}}" + template + "{{/viewWrapper}}");
    };
    removeView = function(type, context, template, isDefault) {
      var name;
      delete getTemplates(isDefault)[name = viewKey(type, context)];
      return Handlebars.unregisterPartial(name);
    };
    getView = hasView = function(type, context) {
      return getTemplate(viewKey(type, context)) || getTemplate(type);
    };
    withContext = function(context, func) {
      var oldContext, value;
      oldContext = root.context;
      root.context = context;
      try {
        value = func();
      } finally {
        root.context = oldContext;
      }
      return value;
    };
    mergeContext = function(subcontext, func) {
      return withContext(_.merge({}, root.context, subcontext), func);
    };
    dontRerender = function(view, func) {
      var oldDonts, ref1, ref2;
      oldDonts = (ref1 = (ref2 = root.context) != null ? ref2.dontRender : void 0) != null ? ref1 : new Set();
      return mergeContext({
        dontRender: oldDonts.add(view)
      }, func);
    };
    Handlebars.registerHelper('condense', function(options) {
      return options.fn(options).replace(/>\s+</g, '><');
    });
    Handlebars.registerHelper('debug', function(options) {
      debugger;
      return '';
    });
    Handlebars.registerHelper('find', function() {
      var data, i, item, items, j, len, name, options, ref1, res;
      name = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), options = arguments[i++];
      data = options.data.opts.data;
      items = name.length === 1 ? data.find(name[0]) : data.find(name[0], name[1]);
      res = "<span data-find-index='" + name[0] + "'>";
      ref1 = items != null ? items : [];
      for (j = 0, len = ref1.length; j < len; j++) {
        item = ref1[j];
        res += options.fn(data.getYaml(item), options);
      }
      return res + "</span>";
    });
    Handlebars.registerHelper('findReverse', function() {
      var data, i, item, items, j, len, name, options, ref1, res;
      name = 2 <= arguments.length ? slice.call(arguments, 0, i = arguments.length - 1) : (i = 0, []), options = arguments[i++];
      data = options.data.opts.data;
      items = name.length === 1 ? data.find(name[0]) : data.find(name[0], name[1]);
      res = '';
      ref1 = (items != null ? items : []).reverse();
      for (j = 0, len = ref1.length; j < len; j++) {
        item = ref1[j];
        res += options.fn(data.getYaml(item), options);
      }
      return res;
    });
    Handlebars.registerHelper('view', function(item, contextName, options) {
      var block, context, data, yaml;
      if (!options) {
        options = contextName;
        contextName = null;
      }
      context = options != null ? options.data : void 0;
      data = ((block = context.opts.data.getBlockNamed(item)) && (yaml = context.opts.data.getYaml(block)) ? yaml : (block = null, item));
      if (data != null ? data.type : void 0) {
        return renderView(data.type, contextName, data, null, block);
      }
    });
    Handlebars.registerHelper('viewWrapper', function(name, data, opts) {
      return simpleRenderView("data-view='" + name + "' data-requested-view='" + name + "' class='view'", name, opts.fn, this);
    });
    bindView = function(view) {
      var getter, i, input, len, name, opts, path, ref1, ref2, results, setter;
      if (!(opts = (ref1 = findEditor(view)) != null ? ref1.options : void 0)) {
        return;
      }
      ref2 = $(view).find('input[data-value]');
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        input = ref2[i];
        if (name = $(input).closest('[data-view-block-name]').attr('data-view-block-name')) {
          path = input.getAttribute('data-value');
          getter = eval("(function(data){return data." + path + "})");
          setter = eval("(function(data, value){data." + path + " = value})");
          input.value = getter(opts.data.getYaml(opts.data.getBlockNamed(name)));
          results.push((function(name) {
            input.onkeypress = function(e) {
              return e.stopPropagation();
            };
            input.onkeydown = function(e) {
              console.log('derp');
              return e.stopPropagation();
            };
            return input.onkeyup = function(e) {
              var data;
              e.stopPropagation();
              data = _.clone(opts.data.getYaml(opts.data.getBlockNamed(name)), true);
              setter(data, input.value);
              return dontRerender(view, function() {
                return opts.changeData(function() {
                  return opts.setData(name, data);
                });
              });
            };
          })(name));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    renderView = function(type, contextName, data, targets, block, blockName) {
      var attr, attrs, classAttr, i, isTop, key, len, node, ref1, ref2, ref3, ref4, ref5, requestedKey, results, settings, template, value;
      blockName = blockName != null ? blockName : block != null ? block.codeName : void 0;
      isTop = !((ref1 = root.context) != null ? ref1.topView : void 0);
      requestedKey = key = viewKey(type, contextName);
      if (!(template = getTemplate(key))) {
        key = type;
        contextName = null;
        if (!(template = getTemplate(key))) {
          return;
        }
      }
      settings = {
        type: type,
        contextName: contextName
      };
      if (isTop) {
        settings.subviews = {};
        if (block) {
          settings.subviews[block._id] = true;
        }
      }
      attrs = "data-view='" + key + "' data-requested-view='" + requestedKey + "'";
      classAttr = 'view';
      ref3 = (ref2 = root.context.viewAttrs) != null ? ref2 : {};
      for (attr in ref3) {
        value = ref3[attr];
        if (attr === 'class') {
          classAttr += " " + value;
        } else {
          attrs += " " + attr + "='" + value + "'";
        }
      }
      attrs += " class='" + classAttr + "'";
      if (block && blockName) {
        attrs += " data-view-block-name='" + blockName + "'";
      } else if (block) {
        attrs += " data-view-block='" + block._id + "'";
      }
      if (targets) {
        if (!isTop && block) {
          root.context.subviews[block._id] = true;
        }
        results = [];
        for (i = 0, len = targets.length; i < len; i++) {
          node = targets[i];
          if ((ref4 = root.context) != null ? (ref5 = ref4.dontRender) != null ? ref5.has(node) : void 0 : void 0) {
            continue;
          }
          settings.view = node;
          results.push(mergeContext(settings, function() {
            var html, n;
            root.context.data = data;
            if (block) {
              root.context.block = block;
            }
            if (isTop) {
              root.context.topView = node;
            }
            html = runTemplate(template, data, {
              data: root.context
            });
            if (isTop) {
              attrs += " data-ids='" + (_.keys(settings.subviews).join(' ')) + "'";
            }
            n = $("<span " + attrs + ">" + html + "</span>");
            $(node).replaceWith(n);
            return root.context.opts.editor.activateScripts(n, root.context);
          }));
        }
        return results;
      } else {
        return mergeContext(settings, function() {
          return simpleRenderView(attrs, key, template, data, block);
        });
      }
    };
    runTemplate = function() {
      var args, err, error, ref1, template;
      template = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      try {
        return template.apply(null, args);
      } catch (error) {
        err = error;
        console.log((ref1 = err.stack) != null ? ref1 : err.msg);
        return " <span class='error'>[Error in template]</span> ";
      }
    };
    simpleRenderView = function(attrs, key, template, data, block) {
      var id;
      id = "view-" + (viewIdCounter++);
      (function(context) {
        return pendingViews.push(function() {
          return activateScripts($("#" + id), context);
        });
      })(root.context);
      attrs += " id='" + id + "'";
      if (block) {
        root.context.subviews[block._id] = true;
      }
      root.context.simpleViewId = id;
      return "<span " + attrs + ">" + (runTemplate(template, data, {
        data: root.context
      })) + "</span>";
    };
    initializePendingViews = function() {
      var func, i, len, p, results;
      imageRefreshCounter++;
      p = pendingViews;
      pendingViews = [];
      results = [];
      for (i = 0, len = p.length; i < len; i++) {
        func = p[i];
        results.push(func());
      }
      return results;
    };
    activateScripts = function(el, context) {
      if (!activating) {
        return withContext(_.merge({}, context), function() {
          var i, img, j, k, l, len, len1, len2, len3, newScript, node, ref1, ref2, ref3, ref4, results, script;
          root.context.currentView = el;
          activating = true;
          try {
            ref1 = el.find('script');
            for (i = 0, len = ref1.length; i < len; i++) {
              script = ref1[i];
              if (!script.type || script.type === 'text/javascript') {
                newScript = document.createElement('script');
                newScript.type = 'text/javascript';
                newScript.textContent = script.textContent;
                newScript.src = script.src;
                root.currentScript = newScript;
                script.parentNode.insertBefore(newScript, script);
                script.remove();
              }
            }
            ref2 = el.find('script[type="text/coffeescript"]').add(el.find('script[type="text/literate-coffeescript"]'));
            for (j = 0, len1 = ref2.length; j < len1; j++) {
              script = ref2[j];
              root.currentScript = script;
              CoffeeScript.run(script.innerHTML);
            }
            if ((ref3 = getController(el.attr('data-view'))) != null) {
              if (typeof ref3.initializeView === "function") {
                ref3.initializeView(el, context.data);
              }
            }
            ref4 = el.find('img');
            for (k = 0, len2 = ref4.length; k < len2; k++) {
              img = ref4[k];
              refreshImage(img);
            }
            results = [];
            for (l = 0, len3 = el.length; l < len3; l++) {
              node = el[l];
              results.push(bindView(node));
            }
            return results;
          } finally {
            root.currentScript = null;
            activating = false;
          }
        });
      }
    };
    addController = function(type, name, func, isDefault) {
      return getControllers(isDefault)[viewKey(type, name)] = func;
    };
    removeController = function(type, name, isDefault) {
      return delete getControllers(isDefault)[viewKey(type, name)];
    };
    getPendingViews = function() {
      return pendingViews;
    };
    pushPendingInitialzation = function(pending) {
      return pendingViews.push(pending);
    };
    getPanel = function(view) {
      return $(view).closest('.expandable-panel');
    };
    configurePanels = function(view) {
      var ep;
      $(view).find('.hidden-panel').children().filter('.label').append(" <i class='fa fa-arrow-right'></i>").button();
      $(view).find('.expandable-panel').children().filter('.label').append(" <i class='fa fa-arrow-left'></i><i class='fa fa-arrow-right'></i>").button().on('click', function() {
        getPanel(this).addClass('expand');
        return getPanel(this).find("[name='hiddenFocus']")[0].focus();
      });
      ep = $(view).find('.expandable-panel');
      $("<input name='hiddenFocus' class='hiddenTextField'>").appendTo(ep);
      ep.mouseenter(function() {
        return getPanel(this).removeClass('contract');
      });
      ep.click((function(e) {
        if (!$(e.target).closest('input,button').length) {
          return getPanel(this).find("[name='hiddenFocus']")[0].focus();
        }
      }));
      ep.find('input').focus(function() {
        return getPanel(this).addClass('expand');
      });
      ep.find('input').blur(function() {
        return getPanel(this).removeClass('expand');
      });
      return ep.find('button').click(function() {
        return getPanel(this).addClass('contract');
      });
    };
    setPanelExpanded = function(view, expand) {
      var panel;
      panel = getPanel(view);
      panel.removeClass((expand ? 'contract' : 'expand'));
      return panel.addClass((expand ? 'expand' : 'contract'));
    };
    showMessage = function(node, title, str, opts, func) {
      var dialog;
      dialog = $("<div title=" + (escapeAttr(title)) + "><div>" + str + "</div></div>").appendTo(node).dialog(_.merge({
        close: function() {
          return dialog.remove();
        }
      }, opts != null ? opts : {}));
      return typeof func === "function" ? func(dialog) : void 0;
    };
    escapeAttr = function(text) {
      return escapeHtml(text).replace(/['"&]/g, function(c) {
        switch (c) {
          case '"':
            return '&quot;';
          case "'":
            return '&#39;';
          case '&':
            return '&amp;';
        }
      });
    };
    return root = mergeExports({
      UI: {
        withContext: withContext,
        mergeContext: mergeContext,
        renderView: renderView,
        addView: addView,
        removeView: removeView,
        hasView: hasView,
        getView: getView,
        addController: addController,
        removeController: removeController,
        initializePendingViews: initializePendingViews,
        getPendingViews: getPendingViews,
        viewKey: viewKey,
        configurePanels: configurePanels,
        context: null,
        showMessage: showMessage,
        escapeAttr: escapeAttr,
        refreshImage: refreshImage,
        nextImageSrc: nextImageSrc,
        prevImageSrc: prevImageSrc,
        pushPendingInitialzation: pushPendingInitialzation,
        setPanelExpanded: setPanelExpanded,
        activateScripts: activateScripts,
        pendingScripts: [],
        localResources: localResources
      },
      Handlebars: Handlebars
    }).UI;
  });

}).call(this);

//# sourceMappingURL=ui.js.map
