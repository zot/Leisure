/*
Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

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

/*
High level representation of Lambda Calculus AST

Represent ASTs as LC cons-lists
*/

(function(){
    var LC=require('./lc.js')
    var LAZP=require('./lazp.js')
    var astDefs = LAZP.hereDoc(function(){/*
_lit = \x f . f x
_ref = \x f . f x
_lambda = \f g v . g (f v)
_apply = \func arg f . f func arg
_prim = \arg rest f . f arg rest -- rest is either a _prim, _lit, or _ref
# lit is the same def as ref
# apply is the same def as prim
# these are for identification purposes
*/})
    var moreDefs = LAZP.hereDoc(function(){/*
t1 = _ref bubba
t2 = _lambda \x ._lit hello
t3 = _lambda \x . _lit true
t4 = _lambda \x . _ref x
t5 = _lambda \x . _lambda \y . _ref x
t6 = _lambda \x . _lambda \y . _ref y
tlit = _lambda \x . _lambda \f . _apply (_ref f) (_ref x)
tref = _lambda \x . _lambda \f . _apply (_ref f) (_ref x)
tlambda = _lambda \f . _lambda \g . _lambda \v . _apply (_ref g) (_apply (_ref f) (_ref v))
tapply = _lambda \func . _lambda \arg . _lambda \f . _apply (_apply (_ref f) (_ref func)) (_ref arg)
tprim =  _lambda \arg . _lambda \rest . _lambda \f . _apply (_apply (_ref f) (_ref arg)) (_ref rest)
*/})

    var _refId
    var _litId
    var _lambdaId
    var _applyId
    var _primId

    function isRef(f) {return f.lambda.id == _refId}
    function isLit(f) {return f.lambda.id == _litId}
    function isLambda(f) {return f.lambda.id == _lambdaId}
    function isApply(f) {return f.lambda.id == _applyId}
    function isPrim(f) {return f.lambda.id == _primId}
    function astType(f) {
	switch (f.lambda.id) {
	case _refId: return 'ref'
	case _litId: return 'lit'
	case _lambdaId: return 'lambda'
	case _applyId: return 'apply'
	case _primId: return 'prim'
	}
    }
    function resolve(v){return typeof v == 'function' ? v() : v}
    function first(){return function(a) {return a}}
    function second(){return function(a) {return function(b){return b}}}
    var gen = 0
    function astPrint(ast, res) {
	var isFirst = !res

	if (isFirst) gen = 0
	res = res || []
	switch (ast.lambda && ast.lambda.id) {
	case _refId:
	    res.push('ref ')
	    var val = ast(first)()
	    res.push(val.lambda ? "WHA?" : val)
	    break
	case _litId:
	    res.push('lit ')
	    var val = ast(first)()

	    res.push(val.lambda ? "{" + val.lambda.toString() + "}" : val)
	    break
	case _lambdaId:
	    var v = "VAR" + gen++
	    var vf = function(){return v}

	    res.push('lambda ')
	    res.push(v)
	    res.push(' . ')
	    astPrint(resolve(ast(first)(vf)), res)
	    break
	case _applyId:
	    res.push('apply (')
	    astPrint(ast(first), res)
	    res.push(') (')
	    astPrint(ast(second)(), res)
	    res.push(')')
	    break
	case _primId:
	    res.push('prim ')
	    astPrint(ast(first), res)
	    break
	default:
	    res.push("WHA???")
	    break
	}
	return isFirst && res.join('')
    }

    function memoize(func) {
	var out = function() {
	    return func.memo || (func.memo = func())
	}

	out.ast = func.ast
	out.value = func.value
	return out
    }

    /**
       A context is program scope
     */
    function createContext() {
	var ctx = (function(){
	    function id(func, id) {
		func.context = C
		func.id = id
		return func
	    }

	    function addAst(ast) {
		if (!ast.id) {
		    C.astsById.push(ast)
		    ast.id = C.astsById.length
		}
		return ast
	    }

	    var C = {
		astsById: [],
		addAst: addAst,
		id: id,
		eval: function(str){return eval(str)},
		subcontext: function(){return function(str){return eval(str)}},
	    }

	    return C
	})()

	ctx.funcId = 0
	return ctx
    }

    var CTX = createContext()

    function ocompile(ast) {return compile(ast, null, null, true)}
    function compile(ast, res, ctx, deref, prim, cont) {
	var isFirst = !res

	if (isFirst) gen = 0
	res = res || []
	ctx = ctx || CTX.subcontext()
	ctx.curLit = 0
	CTX.addAst(ast)
	switch (ast.lambda && ast.lambda.id) {
	case _refId:
	    var val = ast(first)()

	    if (val.lambda) throw new Error("attempt to use lambda as a variable")
	    res.push(val)
	    if (deref) res.push("()")
	    break
	case _litId:
	    var lit = "lit" + ctx.curLit++

	    ctx("var " + lit)
	    ctx("(function(v){" + lit + " = v})")(ast(first)())
	    res.push(lit)
	    if (deref) res.push("()")
	    break
	case _lambdaId:
	    var v = "VAR" + gen++
	    var vf = function(){return v}

	    if (!deref) res.push("(function(){return ")
	    res.push("id(function(" + v + "){return ")
	    compile(resolve(ast(first)(vf)), res, ctx)
	    res.push("}, " + ast.id + ")")
	    if (!deref)	res.push("})")
	    break
	case _applyId:
	    var func = ast(first)
	    var arg = ast(second)()

	    if (!deref) res.push("(function(){return ")
	    compile(func, res, ctx, true)
	    res.push("(")
	    compile(arg, res, ctx)
	    res.push(")")
	    if (!deref)	res.push("})")
	    break
	case _primId:
	    var arg = ast(first)
	    var rest = ast(rest)

	    if (prim) {
		if (cont) {
		    res.push(", ")
		}
		compile(arg, res, ctx, false, true, true, true)
	    } else {
		if (!deref) res.push("(function(){return ")
		compile(arg, res, ctx, true, false)
		res.push("(")
		compile(rest, res, ctx, true, false, true)
		res.push(")")
		if (!deref)	res.push("})")
	    }
	    break
	default:
	    res.push("'WHA???'")
	    break
	}
	return isFirst && [res.join(''), ctx]
    }

    function run(cmp, arg) {
	try {
	    return cmp[1]("(" + cmp[0] + ")")(arg)
	} catch (err) {
	    console.log(err.stack)
	}
    }

    function laz(val) {
	return function(){return val}
    }

    LC.loadDefs(astDefs + moreDefs)
    _refId = LC.L.__ref().lambda.body.id
    _litId = LC.L.__lit().lambda.body.id
    _lambdaId = LC.L.__lambda().lambda.body.id
    _applyId = LC.L.__apply().lambda.body.body.id
    _primId = LC.L.__prim().lambda.body.id
    console.log("_lambdaId: " + _lambdaId)
    console.log("t1: " + LC.L._t1())
    console.log("t1.id: " + LC.L._t1().lambda.id)
    console.log("t1: " + astPrint(LC.L._t1()))
    console.log("t2: " + LC.L._t2())
    console.log("t2 lambda: " + LC.L._t2().lambda)
    console.log("t2 id: " + LC.L._t2().lambda.id)
    console.log("t2 type: " + astType(LC.L._t2()))
    console.log("t2 var: " + LC.L._t2()(first))
    console.log("t2 body: " + LC.L._t2()(second)().lambda)
    console.log("t2: " + astPrint(LC.L._t2()))
    console.log("t3: " + astPrint(LC.L._t3()))
    console.log("t4: " + astPrint(LC.L._t4()))
    console.log("t5: " + astPrint(LC.L._t5()))
    console.log("t6: " + astPrint(LC.L._t6()))
    console.log("compile t1: " + ocompile(LC.L._t1())[0])
    console.log("run t1: " + run(ocompile(LC.L._t1()), null))
    console.log("compile t2: " + ocompile(LC.L._t2())[0])
    console.log("run t2: " + run(ocompile(LC.L._t2()), null))
    console.log("compile t3: " + ocompile(LC.L._t3())[0])
    console.log("run t3 'a' 'b': " + run(ocompile(LC.L._t3()), null))
    console.log("t3 'a' 'b': " + run(ocompile(LC.L._t3()), laz("a"))()(laz("b"))())
    console.log("compile t4: " + ocompile(LC.L._t4())[0])
    console.log("run t4 'a': " + run(ocompile(LC.L._t4()), 'a'))
    console.log("compile t5: " + ocompile(LC.L._t5())[0])
    console.log("run t5 'a' 'b': " + run(ocompile(LC.L._t5()), 'a')('b'))
    console.log("compile t6: " + ocompile(LC.L._t6())[0])
    console.log("run t6 'a' 'b': " + run(ocompile(LC.L._t6()), 'a')('b'))
    console.log("_refId: " + _refId)
    console.log("_ref: " + LC.L.__ref)
    console.log("_litId: " + _litId)
    console.log("_lit: " + LC.L.__lit)
    console.log("_lambdaId: " + _lambdaId)
    console.log("_lambda: " + LC.L.__lambda)
    console.log("_applyId: " + _applyId)
    console.log("_apply: " + LC.L.__apply)
    console.log("_primId: " + _primId)
    console.log("_prim: " + LC.L.__prim)
    console.log("tlit: " + astPrint(LC.L._tlit()))
    console.log("compile tlit: " + ocompile(LC.L._tlit())[0])
    console.log("run tlit: " + run(ocompile(LC.L._tlit()), laz('a'))()(laz(function(x){return "[[" + x() + "]]"}))())
})()
