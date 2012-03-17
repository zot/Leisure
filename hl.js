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
_lambda = \f g v . g v (f v)
_apply = \func arg f . f func arg
_prim = \name f . f name
true = \x y . x
*/})
    var moreDefs = LAZP.hereDoc(function(){/*
t1 = _ref bubba
t2 = _lambda \x ._lit hello
t3 = _lambda \x . _lit true
t4 = _lambda \x . _ref x
t5 = _lambda \x . _lambda \y . _ref x
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
    function lFirst(){return function(a) {return a}}
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
	    res.push(val.lambda ? val.lambda.toString() : "{" + val + "}")
	    break
	case _litId:
	    res.push('lit ')
	    var val = ast(first)()

	    res.push(val.lambda ? val.lambda.toString() : "{" + val + "}")
	    break
	case _lambdaId:
	    var v = "VAR" + gen++
	    var vf = function(){return v}

	    res.push('lambda ')
	    res.push(ast(first)(vf))
	    res.push(' . ')
	    astPrint(resolve(ast(second)(vf)), res)
	    break
	case _applyId:
	    res.push('apply ')
	    astPrint(ast(first), res)
	    astPrint(ast(second), res)
	    break
	case _primId:
	    res.push('prim ')
	    astPrint(ast(first), res)
	    break
	default:
	    res.push("WHA???")
//	    res.push(ast().lambda ? ast().lambda.toString() : "{" + ast() + "}")
	    break
	}
	return isFirst && res.join('')
    }

    function compile(name, ast, res) {
	var isFirst = !res

	res = res || []
	switch (ast.lambda && ast.lambda.id) {
	case _refId:
	    res.push('ref ')
	    astPrint(ast(first), res)
	    break
	case _litId:
	    res.push('lit ')
	    astPrint(ast(first), res)
	    break
	case _lambdaId:
	    res.push('lambda ')
	    res.push(ast(first))
	    res.push(' . ')
	    astPrint(resolve(ast(second)), res)
	    break
	case _applyId:
	    res.push('apply ')
	    astPrint(ast(first), res)
	    astPrint(ast(second), res)
	    break
	case _primId:
	    res.push('prim ')
	    astPrint(ast(first), res)
	    break
	default:
	    res.push(ast().lambda ? ast().lambda.toString() : "{" + ast() + "}")
	    break
	}
	return isFirst && res.join('')
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
    console.log("internalEval = " + LC.L.internalEval)
    console.log("_lit = " + LC.L.internalEval("__lit"))
})()
