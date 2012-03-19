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
# rest is either a _prim, _lit, or _ref
_prim = \arg rest f . f arg rest
_name = \nm ast f . f nm ast
# lit is the same def as ref
# apply is the same def as prim
# these are for identification purposes
*/})
    var moreDefs = LAZP.hereDoc(function(){/*
t0 = _lit bubba
t1 = _ref bubba
t2 = _lambda \x ._lit hello
t3 = _lambda \x . _lit true
t4 = _lambda \x . _ref x
t5 = _lambda \x . _lambda \y . _ref x
t6 = _lambda \x . _lambda \y . _ref y
tlit = _lambda \x . _name lit (_lambda \f . _apply (_ref f) (_ref x))
tref = _lambda \x . _name ref (_lambda \f . _apply (_ref f) (_ref x))
tlambda = _lambda \f . _name lambda (_lambda \g . _lambda \v . _apply (_ref g) (_apply (_ref f) (_ref v)))
tapply = _lambda \func . _lambda \arg . _name apply (_lambda \f . _apply (_apply (_ref f) (_ref func)) (_ref arg))
tprim =  _lambda \arg . _lambda \rest . _name prim (_lambda \f . _apply (_apply (_ref f) (_ref arg)) (_ref rest))
tname = _lambda \nm . _lambda \ast . _name name (_lambda \f . _apply (_apply (_ref f) (_ref nm)) (_ref ast))
*/})

    var _refId
    var _litId
    var _lambdaId
    var _applyId
    var _primId
    var _nameId

    function isRef(f) {return f.lambda.id == _refId}
    function isLit(f) {return f.lambda.id == _litId}
    function isLambda(f) {return f.lambda.id == _lambdaId}
    function isApply(f) {return f.lambda.id == _applyId}
    function isPrim(f) {return f.lambda.id == _primId}
    function isName(f) {return f.lambda.id == _nameId}
    function astType(f) {
	switch (f.lambda.id) {
	case _refId: return 'ref'
	case _litId: return 'lit'
	case _lambdaId: return 'lambda'
	case _applyId: return 'apply'
	case _primId: return 'prim'
	case _nameId: return 'name'
	}
    }
    function resolve(v){return typeof v == 'function' ? v() : v}
    function first(){return function(a) {return a}}
    function second(){return function(a) {return function(b){return b}}}
    function astPrint(ast, res) {
	var isFirst = !res

	res = res || []
	if (isFirst) res.gen = 0
	switch (ast.lambda && ast.lambda.id) {
	case _nameId:
	    res.push('name ', ast(first), ' (')
	    astPrint(ast(second)(), res)
	    res.push(')')
	    break
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
	    var v = "VAR" + res.gen++
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

	    function nameAst(nm, ast) {
		C.astsByName[nm] = ast
		ast.name = nm
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
		astsByName: {},
		addAst: addAst,
		id: id,
		nameAst: nameAst,
		eval: function(str){return eval(str)},
		subcontext: function(){return function(str){return eval(str)}},
	    }

	    return C
	})()

	ctx.funcId = 0
	return ctx
    }

    var CTX = createContext()

    function dgen(ast) {return gen(ast, null, null, true)}
    function gen(ast, res, ctx, deref, prim, cont) {
	var isFirst = !res

	res = res || []
	ctx = ctx || CTX.subcontext()
	ctx.curLit = 0
	if (isFirst) ctx.gen = 0
	CTX.addAst(ast)
	switch (ast.lambda && ast.lambda.id) {
	case _nameId:
	    var nm = ast(first)
	    var a = ast(second)

	    CTX.nameAst(nm, a)
	    gen(a(), res, ctx)
	    break
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
	    var v = "VAR" + ctx.gen++
	    var vf = function(){return v}

	    if (!deref) res.push("(function(){return ")
	    res.push("id(function(" + v + "){return ")
	    gen(resolve(ast(first)(vf)), res, ctx)
	    res.push("}, " + ast.id + ")")
	    if (!deref)	res.push("})")
	    break
	case _applyId:
	    var func = ast(first)
	    var arg = ast(second)()

	    if (!deref) res.push("(function(){return ")
	    gen(func, res, ctx, true)
	    res.push("(")
	    gen(arg, res, ctx)
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
		gen(arg, res, ctx, false, true, true, true)
	    } else {
		if (!deref) res.push("(function(){return ")
		gen(arg, res, ctx, true, false)
		res.push("(")
		gen(rest, res, ctx, true, false, true)
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

//    LC.L.evalFactory()(LAZP.hereDoc(function(){/*
//	var __newLit = id(function(VAR0){return (function(){return id(function(VAR1){return (function(){return VAR1()(VAR0)})}, 31)})}, 29)
//*/}))

    LC.loadDefs(astDefs + moreDefs)
    _refId = LC.L.__ref().lambda.body.id
    _litId = LC.L.__lit().lambda.body.id
    _lambdaId = LC.L.__lambda().lambda.body.id
    _applyId = LC.L.__apply().lambda.body.body.id
    _primId = LC.L.__prim().lambda.body.body.id
    _nameId = LC.L.__name().lambda.body.body.id

    function id(func, id) {
	func.id = id
	func.lambda = {id: id} //this fake lambda object is temporary; for compatibility
	return func
    }

    // wrapped functions -- makes args trivally lazy
    function wlit(value) {return lit(laz(value))}
    function wref(variable) {return ref(laz(variable))}
    function wlambda(func) {return lambda(laz(func))}
    function wapply(func, arg) {return apply(laz(func))(laz(arg))}
    function wprim(arg, rest) {return prim(laz(arg))(laz(rest))}
    function wname(nm, ast) {return name(laz(nm))(laz(ast))}
    // base functions
    function lit(_x) {
	return id(function(_f) {
	    return _f()(_x)
	}, _litId)
    }
    function ref(_x) {
	return id(function(_f) {
	    return _f()(_x)
	}, _refId)
    }
    function lambda(_f) {
	return id(function(_g) {
	    return id(function(_v) {
		return _g()(memoize(function(){return _f()(_v)}))
	    }, -1)
	}, _lambdaId)
    }
    function apply(_func) {
	return id(function(_arg) {
	    return id(function(_f) {
		return _f()(_func)(_arg)
	    }, _applyId)
	}, -2)
    }
    function prim(_func) {
	return id(function(_arg) {
	    return id(function(_f) {
		return _f()(_func)(_arg)
	    }, _primId)
	}, -3)
    }
    function name(_nm) {
	return id(function(_ast) {
	    return id(function(_f) {
		return _f()(_nm)(_ast)
	    }, _nameId)
	}, -4)
    }

    function compile(str) {
    }

/*
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
*/
    console.log("t4: " + astPrint(LC.L._t4()))
/*
    console.log("t5: " + astPrint(LC.L._t5()))
    console.log("t6: " + astPrint(LC.L._t6()))
    console.log("gen t1: " + dgen(LC.L._t1())[0])
    console.log("run t1: " + run(dgen(LC.L._t1()), null))
    console.log("gen t2: " + dgen(LC.L._t2())[0])
    console.log("run t2: " + run(dgen(LC.L._t2()), null))
    console.log("gen t3: " + dgen(LC.L._t3())[0])
    console.log("run t3 'a' 'b': " + run(dgen(LC.L._t3()), null))
    console.log("t3 'a' 'b': " + run(dgen(LC.L._t3()), laz("a")))
*/
    console.log("gen t4: " + dgen(LC.L._t4())[0])
    console.log("run t4 'a': " + run(dgen(LC.L._t4()), 'a'))
/*
    console.log("gen t5: " + dgen(LC.L._t5())[0])
    console.log("run t5 'a' 'b': " + run(dgen(LC.L._t5()), 'a')('b'))
    console.log("gen t6: " + dgen(LC.L._t6())[0])
    console.log("run t6 'a' 'b': " + run(dgen(LC.L._t6()), 'a')('b'))
    console.log("_refId: " + _refId)
    console.log("_litId: " + _litId)
    console.log("_lambdaId: " + _lambdaId)
    console.log("_applyId: " + _applyId)
    console.log("_primId: " + _primId)
    console.log("_nameId: " + _nameId)
    console.log("_ref: " + LC.L.__ref)
    console.log("_lit: " + LC.L.__lit)
    console.log("_lambda: " + LC.L.__lambda)
    console.log("_apply: " + LC.L.__apply)
    console.log("_prim: " + LC.L.__prim)
    console.log("_name: " + LC.L.__name)
    console.log("tlit: " + astPrint(LC.L._tlit()))
    console.log("tref: " + astPrint(LC.L._tref()))
    console.log("tlambda: " + astPrint(LC.L._tlambda()))
    console.log("tapply: " + astPrint(LC.L._tapply()))
    console.log("tprim: " + astPrint(LC.L._tapply()))
    console.log("tname: " + astPrint(LC.L._tname()))
    console.log("tlit: " + dgen(LC.L._tlit())[0])
    console.log("tref: " + dgen(LC.L._tref())[0])
    console.log("tlambda: " + dgen(LC.L._tlambda())[0])
    console.log("tapply: " + dgen(LC.L._tapply())[0])
    console.log("tprim: " + dgen(LC.L._tapply())[0])
    console.log("tname: " + dgen(LC.L._tname())[0])
    console.log("tlit: " + LC.L.__lit())
    console.log("tref: " + LC.L.__ref())
    console.log("tlambda: " + LC.L.__lambda())
    console.log("tapply: " + LC.L.__apply())
    console.log("tprim: " + LC.L.__apply())
    console.log("tname: " + LC.L.__name())
*/
/*
    console.log("REF ID: " + (ref("duh")()).id)
    console.log("REF TEST: " + astPrint(ref("duh")()))
    console.log("REF GEN: " + dgen(ref("duh")())[0])
*/

    console.log("T4 AST: " + astPrint(wlambda(function(x){return ref(x)})))
    console.log("T4 gen: " + dgen(wlambda(function(x){return ref(x)}))[0])

// TODO: compile AST funcs directly and include the JS source here
// for self hosting
})()
