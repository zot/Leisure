
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
  var Leisure_anno, Leisure_apply, Leisure_lambda, Leisure_let, Leisure_lit, Leisure_ref, gen, genApplyArg, genLets, getAnnoBody, getAnnoData, getAnnoName, getApplyArg, getApplyFunc, getLambdaBody, getLambdaVar, getLastLetBody, getLetBody, getLetName, getLetValue, getLitVal, getRefName, letList, nameSub, root, setDataType, setType, varNameSub, _, _ref;

  _ref = root = module.exports = require('./ast'), nameSub = _ref.nameSub, getLitVal = _ref.getLitVal, getRefName = _ref.getRefName, getLambdaVar = _ref.getLambdaVar, getLambdaBody = _ref.getLambdaBody, getApplyFunc = _ref.getApplyFunc, getApplyArg = _ref.getApplyArg, getAnnoName = _ref.getAnnoName, getAnnoData = _ref.getAnnoData, getAnnoBody = _ref.getAnnoBody, getLetName = _ref.getLetName, getLetValue = _ref.getLetValue, getLetBody = _ref.getLetBody, Leisure_lit = _ref.Leisure_lit, Leisure_ref = _ref.Leisure_ref, Leisure_lambda = _ref.Leisure_lambda, Leisure_apply = _ref.Leisure_apply, Leisure_let = _ref.Leisure_let, Leisure_anno = _ref.Leisure_anno, setType = _ref.setType, setDataType = _ref.setDataType;

  _ = require('./lodash.min');

  varNameSub = function varNameSub(n) {
    return "L_" + (nameSub(n));
  };

  gen = function gen(ast) {
    var data, genned, name;
    switch (ast.constructor) {
      case Leisure_lit:
        return JSON.stringify(getLitVal(ast));
      case Leisure_ref:
        return "" + (varNameSub(getRefName(ast))) + "()";
      case Leisure_lambda:
        return "function(" + (varNameSub(getLambdaVar(ast))) + "){return " + (gen(getLambdaBody(ast))) + "}";
      case Leisure_apply:
        return "" + (gen(getApplyFunc(ast))) + "(" + (genApplyArg(getApplyArg(ast))) + ")";
      case Leisure_let:
        return "(function(){\n" + (genLets(ast)) + "})()";
      case Leisure_anno:
        name = getAnnoName(ast);
        data = getAnnoData(ast);
        genned = gen(getAnnoBody(ast));
        switch (name) {
          case 'type':
            return "setType(" + genned + ", '" + data + "')";
          case 'dataType':
            return "setDataType(" + genned + ", '" + data + "')";
          default:
            return genned;
        }
        break;
      default:
        return "DUR? " + ast + ", " + ast.constructor + " " + Leisure_lambda;
    }
  };

  genApplyArg = function genApplyArg(arg) {
    if (arg instanceof Leisure_apply) {
      return "(function(){var $m; return function(){return $m || ($m = " + (gen(arg)) + ")}})()";
    } else if (arg instanceof Leisure_ref) {
      return varNameSub(getRefName(arg));
    } else if (arg instanceof Leisure_let) {
      return "function(){" + (genLets(arg)) + "}";
    } else {
      return "function(){return " + (gen(arg)) + "}";
    }
  };

  genLets = function genLets(ast) {
    var assigns, decs, lets;
    lets = letList(ast, []);
    decs = _.map(lets, function(l) {
      return varNameSub(getLetName(l));
    });
    assigns = _.map(lets, function(l) {
      return '\n' + varNameSub(getLetName(l)) + ' = ' + genApplyArg(getLetValue(l));
    });
    return "\nvar " + (decs.join(', ')) + ";\n" + (assigns.join(';\n')) + ";\nreturn " + (gen(getLastLetBody(ast)));
  };

  letList = function letList(ast, buf) {
    if (ast instanceof Leisure_let) {
      buf.push(ast);
      return letList(getLetBody(ast), buf);
    } else {
      return buf;
    }
  };

  getLastLetBody = function getLastLetBody(ast) {
    if (ast instanceof Leisure_let) {
      return getLastLetBody(getLetBody(ast));
    } else {
      return ast;
    }
  };

  root.gen = gen;

}).call(this);
