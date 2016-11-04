// Generated by CoffeeScript 1.10.0
(function() {
  var slice = [].slice;

  define(['./eval', './docOrg', 'lib/bluebird.min', './gen'], function(Eval, DocOrg, Bluebird, Gen) {
    var Compiler, Promise, Scope, SourceMapConsumer, SourceMapGenerator, SourceNode, Wisp, blockSource, compile, envFunc, findNs, jsCodeFor, parseIt, setLounge, wispCompile, wispEval, wispFileCounter, wispGenNSContext, wispPromise, wispRequire, wp;
    setLounge = Eval.setLounge, parseIt = Eval.parseIt, jsCodeFor = Eval.jsCodeFor, Scope = Eval.Scope;
    blockSource = DocOrg.blockSource;
    Promise = Bluebird.Promise;
    SourceNode = Gen.SourceNode, SourceMapConsumer = Gen.SourceMapConsumer, SourceMapGenerator = Gen.SourceMapGenerator;
    Wisp = null;
    wispCompile = null;
    wispFileCounter = 0;
    wispRequire = function(s, base) {
      var m;
      s = new URL(s, 'http://x\/' + base.replace(/\./g, "\/")).pathname.replace(/^\//, '').replace('\/', '.');
      if (m = s.match(/^(\.)?wisp\./)) {
        return findNs(s.substring(m[0].length), Wisp);
      } else {
        return findNs(s, Leisure.WispNS);
      }
    };
    findNs = function(nsName, obj, create) {
      var comp, j, len, ref;
      ref = nsName.split('.');
      for (j = 0, len = ref.length; j < len; j++) {
        comp = ref[j];
        if (!obj[comp]) {
          if (create) {
            obj[comp] = new Scope;
          } else {
            return null;
          }
        }
        obj = obj[comp];
      }
      if (create && !obj._ns_) {
        obj._ns_ = {
          id: nsName
        };
      }
      return obj;
    };
    wispGenNSContext = function(ns) {
      var names;
      ns = findNs(ns, Leisure.WispNS);
      names = _.without(_.keys(ns), '_ns_');
      if (names.length) {
        return ns.newNames(names);
      }
    };
    wp = null;
    wispPromise = function() {
      return wp || (wp = new Promise(function(resolve, reject) {
        return setTimeout((function() {
          var req;
          req = window.require;
          window.require = null;
          return req(['lib/wisp'], function(W) {
            var baseWispCompile, exports;
            Leisure.Wisp = Wisp = W;
            baseWispCompile = Wisp.compiler.compile;
            window.require = req;
            wispCompile = function() {
              var args, node;
              args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
              node = baseWispCompile.apply(null, args);
              if (node.error) {
                console.log("Error in code\n" + s);
                console.log("NODE: ", node);
                throw new Error(node.error + ("\nCompiling:\n" + s));
              }
              return node;
            };
            Leisure.wispCompilePrim = wispCompile;
            Leisure.wispCompileBase = baseWispCompile;
            Leisure.WispNS = {
              lounge: {
                tools: {}
              }
            };
            exports = Leisure.WispNS.lounge.tools;
            return resolve(wispCompile);
          });
        }), 100);
      }));
    };
    Compiler = (function() {
      function Compiler() {}

      Compiler.prototype.compile = function(s, nsName1, wrapFunction, returnList1) {
        var ref;
        this.nsName = nsName1;
        this.wrapFunction = wrapFunction;
        this.returnList = returnList1;
        this.reqs = '';
        this.splice = '';
        this.pad = this.wrapFunction ? '  ' : '';
        this.result = wispCompile(s, {
          "source-uri": "wispEval-" + (wispFileCounter++)
        });
        if (this.result.ast[0].op === 'ns') {
          this.nsName = (ref = this.result.ast[0].form.tail.head) != null ? ref.name : void 0;
        }
        return {
          nameSpace: this.handleNameSpace(),
          code: this.scanNodes()
        };
      };

      Compiler.prototype.handleNameSpace = function() {
        var needsExports, node, nsObj, ref;
        this.gennedNs = true;
        needsExports = _.find(this.result.ast, function(n) {
          return n.op === 'def';
        });
        if (this.nsName) {
          nsObj = findNs(this.nsName, Leisure.WispNS, true);
          nsObj.newNames((function() {
            var j, len, ref, results;
            ref = this.result.ast;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              node = ref[j];
              if (node.op === 'def') {
                results.push(node.id.id.name);
              }
            }
            return results;
          }).call(this));
          if (needsExports) {
            if (this.wrapFunction) {
              this.reqs += "exports = exports || window.Leisure.WispNS." + this.nsName + ";\n";
            } else {
              this.reqs += "var exports = window.Leisure.WispNS." + this.nsName + ";\n";
            }
          }
          if (this.result.ast[0].require) {
            this.reqs += "var require = function(s) {\n  return Leisure.wispRequire(s, '" + this.nsName + "');\n};\n";
          }
          if (this.result.ast[0].op !== 'ns') {
            this.reqs += "var _ns_ = {\n  id: '" + this.nsName + "',\n  doc: void 0\n};\n";
          } else if (this.result.ast[0].doc) {
            this.splice = "exports._ns_.doc = _ns_.doc;\n";
          }
          this.end = (ref = this.result.ast[0].end) != null ? ref : {
            line: 0,
            column: 0
          };
          if (this.pad) {
            this.splice = this.splice.replace(/\n/g, '\n' + this.pad);
          }
          this.gennedNs = false;
        } else if (needsExports) {
          if (this.wrapFunction) {
            this.reqs += "exports = exports || {};\n";
          } else {
            this.destroyExports = true;
          }
        }
        if (this.pad) {
          this.reqs = this.reqs.replace(/\n/g, '\n' + this.pad);
        }
        return nsObj;
      };

      Compiler.prototype.scanNodes = function() {
        var addReturn, children, code, con, destroyingExport, exprPos, exprs, file, foundEnd, head, lastLoc, nodes, prevCode, ref, returnNode, spliced, splicedResult, startedPush, tail;
        if (this.returnList) {
          exprs = _.filter(_.map(this.result.ast, (function(_this) {
            return function(n, i) {
              var ref;
              if (!((ref = n.op) === 'def' || ref === 'ns') && n.form && !(n.op === 'var' && n.form.name === 'debugger')) {
                return _this.result['js-ast'].body[i].loc;
              }
            };
          })(this)), identity);
          if (exprs.length) {
            this.reqs += "var $ret$ = [];\n";
          } else {
            this.returnList = false;
          }
        } else if (this.wrapFunction) {
          addReturn = true;
        }
        head = [];
        tail = [];
        foundEnd = false;
        startedPush = false;
        exprPos = 0;
        returnNode = null;
        destroyingExport = false;
        prevCode = null;
        con = SourceMapConsumer.fromSourceMap(this.result['source-map']);
        nodes = SourceNode.fromStringWithSourceMap(this.result.code, con);
        if (addReturn) {
          addReturn = lastLoc = _.last(_.filter(_.map(this.result.ast, (function(_this) {
            return function(n, i) {
              var ref, ref1;
              if (!((ref = n.op) === 'def' || ref === 'ns') && n.form) {
                return (ref1 = _this.result['js-ast'].body[i].loc) != null ? ref1.start : void 0;
              }
            };
          })(this)), identity));
        }
        nodes.walk((function(_this) {
          return function(code, loc) {
            var node, ref;
            if (code.match(/\/\/# sourceMappingURL=/)) {
              foundEnd = true;
            }
            if (foundEnd) {
              return;
            }
            if (_this.destroyExports && !destroyingExport && code === "exports" && prevCode.match(/ *= */)) {
              destroyingExport = true;
              return;
            } else if (destroyingExport) {
              if (code.match(/ *= */)) {
                destroyingExport = false;
              }
              return;
            }
            if (_this.nsName) {
              code = code.replace(/^ *var /, ' ');
            }
            if (_this.returnList && !startedPush && loc.line === exprs[exprPos].start.line && loc.column >= exprs[exprPos].start.column - 1) {
              startedPush = true;
              code = "$ret$.push(" + code;
            }
            if (startedPush && (code.match(/;[ \n]*$/) || ((loc.line > (ref = exprs[exprPos].end.line) && ref === exprs[exprPos].end.line) && loc.column >= exprs[exprPos].end.column - 1))) {
              startedPush = false;
              code = code.replace(/;([ \n]*)$/, ');$1');
              exprPos++;
            }
            if (_this.pad) {
              code = code.replace(/\n/g, '\n' + _this.pad);
            }
            node = new SourceNode(loc.line, loc.column, loc.source, code, loc.name);
            if (addReturn && !returnNode && loc.line === lastLoc.line && loc.column >= lastLoc.column - 1) {
              returnNode = node;
            }
            if (!_this.gennedNs && (loc.line < _this.end.line + 1 || (loc.line === _this.end.line + 1 && loc.column < _this.end.column))) {
              head.push(node);
            } else {
              _this.gennedNs = true;
              tail.push(node);
            }
            return prevCode = code;
          };
        })(this));
        file = (ref = _.find(nodes.children, function(n) {
          return n instanceof SourceNode;
        })) != null ? ref.source : void 0;
        children = [head, new SourceNode(1, 0, file, this.splice), tail];
        if (returnNode) {
          code = returnNode.children[0];
          if (_.last(tail) === returnNode) {
            returnNode.children[0] = "return " + code;
          } else {
            returnNode.children[0] = "var $ret$ = " + code;
            children.push("\n" + this.pad + "return $ret$;\n");
          }
        } else if (this.returnList) {
          children.push(this.wrapFunction ? "\n" + this.pad + "return $ret$;\n" : "\n" + this.pad + "$ret$;\n");
        }
        if (startedPush) {
          tail.push(");");
        }
        if (this.reqs) {
          children.unshift(this.reqs);
        }
        if (this.wrapFunction) {
          children.unshift("(function(exports, console){\n" + this.pad + "console = console ? console : window.console;\n" + this.pad);
          children.push('})');
        }
        spliced = new SourceNode(1, 0, file, children);
        splicedResult = spliced.toStringWithSourceMap();
        if (file) {
          splicedResult.map.setSourceContent(file, con.sourceContentFor(file));
        }
        return splicedResult.code + ("\n//# sourceMappingURL=data:application/json;base64," + (btoa(JSON.stringify(splicedResult.map.toJSON()))) + "\n");
      };

      return Compiler;

    })();
    compile = function(s, nsName, wrapFunction, returnList) {
      this.wrapFunction = wrapFunction;
      return new Compiler().compile(s, nsName, this.wrapFunction, returnList);
    };
    Leisure.wispCompile = compile;
    Leisure.wispEval = wispEval = function() {
      var args, code, nameSpace, ref;
      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      ref = compile.apply(null, args), nameSpace = ref.nameSpace, code = ref.code;
      if (nameSpace) {
        return nameSpace["eval"](code);
      } else {
        return eval(code);
      }
    };
    Leisure.wispRequire = wispRequire;
    Leisure.wispFindNs = findNs;
    Leisure.wispGenNSContext = wispGenNSContext;
    envFunc = function(env) {
      env.executeText = function(text, props, cont) {
        return setLounge(this, (function(_this) {
          return function() {
            var result;
            result = [Leisure.wispEval(text)];
            if (cont) {
              return cont(result);
            } else {
              return result;
            }
          };
        })(this));
      };
      env.compileBlock = function(block) {
        var e, err, error, func, macros, ns, nsObj, props, ref, ref1, res;
        res = "" + (blockSource(block).trim());
        try {
          props = this.data.properties(block);
          ns = (ref = (ref1 = props.namespace) != null ? ref1.trim() : void 0) != null ? ref : void 0;
          if (ns) {
            if (props.macro) {
              macros = true;
            }
            res = "(ns " + ns + ")" + res;
            ns = ns.match(/^[^ ]+/)[0];
            nsObj = findNs(ns, Leisure.WispNS, true);
          }
          func = wispEval(res, ns, true, true);
          return function() {
            var args, cont, envConsole;
            cont = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
            env = this;
            envConsole = {
              log: function(s) {
                return env.write(s);
              }
            };
            return (cont != null ? cont : identity)(_.filter(func.apply(null, [null, envConsole].concat(slice.call(args))), function(n) {
              return typeof n !== 'undefined';
            }));
          };
        } catch (error) {
          err = error;
          e = new Error("Error compiling " + res + "\n  " + err.message);
          e.stack = err.stack;
          throw e;
        }
      };
      env.generateCode = function(text, noFunc) {
        debugger;
      };
      return env;
    };
    return function(env) {
      return wispPromise().then(function() {
        envFunc(env);
        return resolve(envFunc);
      });
    };
  });

}).call(this);

//# sourceMappingURL=wispSupport.js.map
