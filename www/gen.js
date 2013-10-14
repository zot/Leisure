// Generated by CoffeeScript 1.6.2
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
  var Leisure_anno, Leisure_apply, Leisure_lambda, Leisure_let, Leisure_lit, Leisure_ref, Nil, SourceMapConsumer, SourceNode, addLambdaProperties, addUniq, arrayify, assocListProps, check, checkChild, collectArgs, cons, consFrom, currentFile, currentFuncName, curry, define, dumpAnno, gen, genApply, genApplyArg, genLambda, genLetAssign, genLets, genMap, genNode, genSource, genUniq, getAnnoBody, getAnnoData, getAnnoName, getApplyArg, getApplyFunc, getAssocListProps, getLambdaBody, getLambdaProperties, getLambdaVar, getLastLetBody, getLetBody, getLetName, getLetValue, getLitVal, getPos, getRefName, lacons, lazy, lcons, lconsFrom, left, letList, locateAst, lz, makeSyncMonad, masterLockGen, memoize, nameSub, newGen, resolve, right, root, runMonad, rz, setDataType, setType, simpyCons, sn, specialAnnotations, uniqName, varNameSub, verboseMsg, withFile, _, _false, _ref, _ref1, _ref2, _ref3, _true,
    __slice = [].slice;

  _ref = require('./base'), simpyCons = _ref.simpyCons, resolve = _ref.resolve, lazy = _ref.lazy, verboseMsg = _ref.verboseMsg;

  rz = resolve;

  lz = lazy;

  _ref1 = root = module.exports = require('./ast'), nameSub = _ref1.nameSub, getLitVal = _ref1.getLitVal, getRefName = _ref1.getRefName, getLambdaVar = _ref1.getLambdaVar, getLambdaBody = _ref1.getLambdaBody, getApplyFunc = _ref1.getApplyFunc, getApplyArg = _ref1.getApplyArg, getAnnoName = _ref1.getAnnoName, getAnnoData = _ref1.getAnnoData, getAnnoBody = _ref1.getAnnoBody, getLetName = _ref1.getLetName, getLetValue = _ref1.getLetValue, getLetBody = _ref1.getLetBody, Leisure_lit = _ref1.Leisure_lit, Leisure_ref = _ref1.Leisure_ref, Leisure_lambda = _ref1.Leisure_lambda, Leisure_apply = _ref1.Leisure_apply, Leisure_let = _ref1.Leisure_let, Leisure_anno = _ref1.Leisure_anno, setType = _ref1.setType, setDataType = _ref1.setDataType, cons = _ref1.cons, Nil = _ref1.Nil, consFrom = _ref1.consFrom, define = _ref1.define, getPos = _ref1.getPos;

  _ref2 = require('./runtime'), makeSyncMonad = _ref2.makeSyncMonad, runMonad = _ref2.runMonad, _true = _ref2._true, _false = _ref2._false, left = _ref2.left, right = _ref2.right;

  _ = require('./lodash.min');

  _ref3 = require("source-map"), SourceNode = _ref3.SourceNode, SourceMapConsumer = _ref3.SourceMapConsumer;

  varNameSub = function(n) {
    return "L_" + (nameSub(n));
  };

  newGen = false;

  root.lockGen = true;

  masterLockGen = true;

  collectArgs = function(args, result) {
    var i, _i, _len;

    for (_i = 0, _len = args.length; _i < _len; _i++) {
      i = args[_i];
      if (Array.isArray(i)) {
        collectArgs(i, result);
      } else {
        result.push(i);
      }
    }
    return result;
  };

  locateAst = function(ast) {
    var col, line, pos, _ref4;

    _ref4 = pos = getPos(ast).toArray(), line = _ref4[0], col = _ref4[1];
    return [line, col];
  };

  check = function(bool, arg) {
    if (!bool) {
      return console.log(new Error("Bad sourcemap arg: " + arg).stack);
    }
  };

  checkChild = function(child) {
    var c, _i, _len, _results;

    if (Array.isArray(child)) {
      _results = [];
      for (_i = 0, _len = child.length; _i < _len; _i++) {
        c = child[_i];
        _results.push(checkChild(c));
      }
      return _results;
    } else {
      return check((typeof child === 'string') || (child instanceof SourceNode), 'child');
    }
  };

  currentFile = 'NEVERGIVENFILE.lsr';

  currentFuncName = void 0;

  withFile = function(file, name, block) {
    var oldFileName, oldFuncName;

    oldFileName = currentFile;
    oldFuncName = currentFuncName;
    currentFile = file;
    currentFuncName = name;
    try {
      return block();
    } finally {
      currentFile = oldFileName;
      currentFuncName = oldFuncName;
    }
  };

  sn = function() {
    var ast, line, offset, str, _ref4;

    ast = arguments[0], str = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    _ref4 = locateAst(ast), line = _ref4[0], offset = _ref4[1];
    check(typeof line === 'number', 'line');
    check(typeof offset === 'number', 'offset');
    checkChild(str);
    if (line < 1) {
      line = 1;
    }
    if (currentFile === 'NEVERGIVENFILE.lsr') {
      console.log(new Error("SN CALLED WITHOUT FILE").stack);
    }
    if (currentFuncName != null) {
      return new SourceNode(line, offset, currentFile, str, currentFuncName);
    } else {
      return new SourceNode(line, offset, currentFile, str);
    }
  };

  genNode = function(ast) {
    return genUniq(ast, Nil, [Nil, 0]);
  };

  gen = function(ast) {
    return genMap(ast).toStringWithSourceMap({
      file: currentFile
    }).code;
  };

  genSource = function(source, ast) {
    var funcname;

    console.log("SOURCE: " + source + "\nAST: " + ast);
    funcname = ast instanceof Leisure_anno && getAnnoName(ast) === 'leisureName' ? getAnnoData(ast) : null;
    return withFile("data:text/plain;base64," + (btoa(source)), funcname, function() {
      var code, sm;

      sm = genNode(ast).prepend("\n").toStringWithSourceMap({
        file: "dynamic code"
      });
      code = ("//# sourceMappingURL=data:text/plain;base64," + (btoa(sm.map))) + sm.code;
      console.log("CODE: " + code);
      console.log("MAP: " + sm.map);
      return code;
    });
  };

  genMap = function(ast) {
    var filename, funcname, hasFile, nameAst;

    hasFile = ast instanceof Leisure_anno && getAnnoName(ast) === 'filename';
    filename = hasFile ? getAnnoData(ast) : 'GENFORUNKNOWNFILE.lsr';
    nameAst = hasFile ? getAnnoBody(ast) : null;
    funcname = nameAst instanceof Leisure_anno && getAnnoName(nameAst) === 'leisureName' ? getAnnoData(nameAst) : currentFuncName;
    return withFile(filename, funcname, function() {
      return genNode(ast);
    });
  };

  genUniq = function(ast, names, uniq) {
    var arity, data, funcName, genned, name, src, _ref4;

    switch (ast.constructor) {
      case Leisure_lit:
        return sn(ast, JSON.stringify(getLitVal(ast)));
      case Leisure_ref:
        return sn(ast, "resolve(", uniqName(getRefName(ast), uniq), ")");
      case Leisure_lambda:
        return genLambda(ast, names, uniq, 0);
      case Leisure_apply:
        if (!newGen) {
          return sn(ast, genUniq(getApplyFunc(ast), names, uniq), "(", genApplyArg(getApplyArg(ast), names, uniq), ")");
        } else {
          return genApply(ast, names, uniq);
        }
        break;
      case Leisure_let:
        return sn(ast, "(function(){\n", genLets(ast, names, uniq), "})()");
      case Leisure_anno:
        name = getAnnoName(ast);
        data = getAnnoData(ast);
        genned = genUniq(getAnnoBody(ast), names, uniq);
        switch (name) {
          case 'type':
            return sn(ast, "setType(", genned, ", '", data, "')");
          case 'dataType':
            return sn(ast, "setDataType(", genned, ", '", data, "')");
          case 'define':
            _ref4 = data.toArray(), funcName = _ref4[0], arity = _ref4[1], src = _ref4[2];
            return sn(ast, "define('", funcName, "', (function(){return ", genned, "}), ", arity, ", ", JSON.stringify(src), ")");
          default:
            return genned;
        }
        break;
      default:
        return "DUR? " + ast + ", " + ast.constructor + " " + Leisure_lambda;
    }
  };

  define('newGen', lz(makeSyncMonad(function(env, cont) {
    newGen = !masterLockGen && !root.lockGen;
    return cont(_true);
  })));

  genLambda = function(ast, names, uniq, count) {
    var n, name, u;

    name = getLambdaVar(ast);
    u = addUniq(name, names, uniq);
    n = cons(name, names);
    return addLambdaProperties(ast, sn(ast, "function(", uniqName(name, u), "){return ", genUniq(getLambdaBody(ast), n, u), "}"));
  };

  specialAnnotations = ['type', 'dataType', 'define'];

  arrayify = function(cons) {
    if (cons instanceof Leisure_cons) {
      return cons.map(function(el) {
        return arrayify(el);
      }).toArray();
    } else {
      return cons;
    }
  };

  getLambdaProperties = function(body, props) {
    var value;

    if (body instanceof Leisure_anno) {
      if (!_.contains(specialAnnotations, getAnnoName(body))) {
        if (!props) {
          props = {};
        }
        value = getAnnoData(body);
        props[getAnnoName(body)] = arrayify(value);
      }
      getLambdaProperties(getAnnoBody(body), props);
    }
    return props;
  };

  addLambdaProperties = function(ast, def) {
    var props;

    props = getLambdaProperties(getLambdaBody(ast));
    if (props) {
      return sn(ast, "setLambdaProperties(", def, ", ", JSON.stringify(props), ")");
    } else {
      return def;
    }
  };

  lcons = function(a, b) {
    return rz(L_cons)(lz(a))(lz(b));
  };

  lconsFrom = function(array) {
    var el, p, _i, _len, _ref4;

    if (array instanceof Array) {
      p = rz(L_nil);
      _ref4 = array.reverse();
      for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
        el = _ref4[_i];
        p = lcons(lconsFrom(el), p);
      }
      return p;
    } else {
      return array;
    }
  };

  assocListProps = null;

  getAssocListProps = function() {
    if (!assocListProps) {
      assocListProps = lcons(lcons('assoc', 'true'), rz(L_nil));
      assocListProps.properties = assocListProps;
    }
    return assocListProps;
  };

  lacons = function(key, value, list) {
    var alist;

    alist = lcons(lcons(key, value), list);
    alist.properties = getAssocListProps();
    return alist;
  };

  global.setLambdaProperties = function(def, props) {
    var k, p, v;

    p = rz(L_nil);
    for (k in props) {
      v = props[k];
      p = lacons(k, lconsFrom(v), p);
    }
    def.properties = p;
    return def;
  };

  memoize = function(ast, func) {
    return sn(ast, "function(){return ", func, "}");
  };

  dumpAnno = function(ast) {
    if (ast instanceof Leisure_anno) {
      return dumpAnno(getAnnoBody(ast));
    } else {
      return ast;
    }
  };

  genApply = function(ast, names, uniq) {
    var args;

    args = [];
    while (dumpAnno(ast) instanceof Leisure_apply) {
      args.push(sn(ast, "(", genApplyArg(getApplyArg(dumpAnno(ast)), names, uniq), ")"));
      ast = getApplyFunc(dumpAnno(ast));
    }
    args.reverse();
    return sn(ast, genUniq(ast, names, uniq), ".leisureCall(", args.join(', '), ")");
  };

  genApplyArg = function(arg, names, uniq) {
    if (dumpAnno(arg) instanceof Leisure_apply) {
      return memoize(arg, genUniq(arg, names, uniq));
    } else if (arg instanceof Leisure_ref) {
      return uniqName(getRefName(arg), uniq);
    } else if (arg instanceof Leisure_lit) {
      return sn(arg, JSON.stringify(getLitVal(arg)));
    } else if (arg instanceof Leisure_let) {
      return sn(arg, "function(){", genLets(arg, names, uniq), "}");
    } else if (dumpAnno(arg) instanceof Leisure_lambda) {
      return sn(arg, "lazy(", genUniq(arg, names, uniq), ")");
    } else {
      return sn(ast, "function(){return ", genUniq(arg, names, uniq), "}");
    }
  };

  genLetAssign = function(arg, names, uniq) {
    if (dumpAnno(arg) instanceof Leisure_let) {
      return sn(arg, "function(){", genLets(arg, names, uniq), "}");
    } else {
      return sn(arg, "function(){return ", genUniq(arg, names, uniq), "}");
    }
  };

  genLets = function(ast, names, uniq) {
    var assigns, decs, _ref4;

    _ref4 = _.foldl(letList(ast, []), (function(result, l) {
      var code, letName, letNames, n, newU, u;

      n = result[0], u = result[1], letNames = result[2], code = result[3];
      newU = addUniq(getLetName(l), n, u);
      letName = uniqName(getLetName(l), newU);
      return [cons(getLetName(l), n), newU, cons(letName, letNames), cons(sn(ast, '\n' + letName + ' = ', genLetAssign(getLetValue(l), n, u)), code)];
    }), [names, uniq, Nil, Nil]), names = _ref4[0], uniq = _ref4[1], decs = _ref4[2], assigns = _ref4[3];
    return sn(ast, "\nvar ", decs.join(', '), ";\n", assigns.reverse().intersperse(';\n').toArray(), ";\nreturn ", genUniq(getLastLetBody(ast), names, uniq));
  };

  addUniq = function(name, names, uniq) {
    var num, overrides;

    if ((names.find(function(el) {
      return el === name;
    })) !== Nil) {
      overrides = uniq[0], num = uniq[1];
      return [cons(cons(name, "" + name + "_" + num), overrides), num + 1];
    } else {
      return uniq;
    }
  };

  uniqName = function(name, uniq) {
    var kv;

    uniq = uniq[0];
    kv = uniq.find((function(el) {
      return el.head() === name;
    }), uniq);
    return varNameSub((kv !== Nil ? kv.tail() : name));
  };

  letList = function(ast, buf) {
    if (ast instanceof Leisure_let) {
      buf.push(ast);
      return letList(getLetBody(ast), buf);
    } else {
      return buf;
    }
  };

  getLastLetBody = function(ast) {
    if (ast instanceof Leisure_let) {
      return getLastLetBody(getLetBody(ast));
    } else {
      return ast;
    }
  };

  define('runAst', lz(function(code) {
    return function(ast) {
      var err, msg;

      try {
        return eval("(" + (gen(rz(ast))) + ")");
      } catch (_error) {
        err = _error;
        msg = "\n\nParse error: " + err.toString() + "\nAST: ";
        console.log(msg + ast() + "\n" + err.stack);
        return rz(L_parseErr)(lz("\n\nParse error: " + err.toString() + "\nAST: "))(ast);
      }
    };
  }));

  curry = function(func, args, pos) {
    if (pos === func.length) {
      return func.apply(null, args.toArray(func.length - 1, []));
    } else {
      return function(arg) {
        return curry(func, simpyCons(arg, args), pos + 1);
      };
    }
  };

  Function.prototype.leisureCall = function() {
    var a, args, f, next, pos, sub;

    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (args.length === this.length) {
      return this.apply(null, args);
    } else {
      pos = 0;
      f = this;
      while (pos < args.length) {
        next = pos + f.length;
        if (next <= args.length) {
          f = f.apply(null, args.slice(pos, next));
        } else {
          console.log("CURRY");
          a = args.slice(pos);
          sub = function() {
            a.push.apply(a, arguments);
            if (a.length >= f.length) {
              return f.leisureCall.apply(f, a);
            } else {
              return sub;
            }
          };
          return sub;
        }
        pos = next;
      }
      return f;
    }
  };

  root.gen = gen;

  root.genMap = genMap;

  root.genSource = genSource;

  root.genNode = genNode;

  root.sourceNode = sn;

  root.curry = curry;

  root.withFile = withFile;

}).call(this);

/*
//@ sourceMappingURL=gen.map
*/