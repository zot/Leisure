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
_lambda = \v f g . g v f
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
t2 = _lambda x (_lit hello)
t3 = _lambda x (_lit true)
t4 = _lambda x (_ref x)
t5 = _lambda x (_lambda y (_ref x))
t6 = _lambda x (_lambda y (_ref y))
t7 = _lambda x (_lambda y (_lambda z (_apply (_ref x) (_apply (_ref y) (_ref z)))))
t77 = \x y z. x (y z)
tlit = _lambda x (_name lit (_lambda f (_apply (_ref f) (_ref x))))
tref = _lambda x (_name ref (_lambda f (_apply (_ref f) (_ref x))))
tlambda = _lambda f (_name lambda (_lambda g (_lambda v (_apply (_ref g) (_apply (_ref f) (_ref v))))))
tapply = _lambda func (_lambda arg (_name apply (_lambda f (_apply (_apply (_ref f) (_ref func)) (_ref arg)))))
tprim =  _lambda arg (_lambda rest (_name prim (_lambda f (_apply (_apply (_ref f) (_ref arg)) (_ref rest)))))
tname = _lambda nm (_lambda ast (_name name (_lambda f (_apply (_apply (_ref f) (_ref nm)) (_ref ast)))))
*/})

    var _refId
    var _litId
    var _lambdaId
    var _applyId
    var _primId
    var _nameId
    var tokenPat = null
    var specials = '[]().*+?|'
    var tokenDefPat = /^ *([^ ]+) *(=[.)]=|=\([^=]+=|=)(?:[^=])/
    var numberPat = /^[0-9]+(\.[0-9]+)?|([0-9]+)?\.[0-9]+/
    var order = []
    var warnFreeVariable = []
    var charCodes = {
	"'": '$a',
	',': '$b',
	'$': '$c',
	'@': '$d',
	'?': '$e',
	'/': '$f',
	'*': '$g',
	'&': '$h',
	'^': '$i',
	'!': '$k',
	'`': '$l',
	'~': '$m',
	'-': '$n',
	'+': '$o',
	'=': '$p',
	'|': '$q',
	'[': '$r',
	']': '$s',
	'{': '$t',
	'}': '$u',
	'"': '$v',
	':': '$w',
	';': '$x',
	'<': '$y',
	'>': '$z',
	'%': '$A',
    }
    var codeChars = {}
    for (i in charCodes) {
	codeChars[charCodes[i].substring(1)] = i
    }
    
    function isRef(f) {return f.lambda.id == _refId}
    function isLit(f) {return f.lambda.id == _litId}
    function isLambda(f) {return f.lambda.id == _lambdaId}
    function isApply(f) {return f.lambda.id == _applyId}
    function isPrim(f) {return f.lambda.id == _primId}
    function isName(f) {return f.lambda.id == _nameId}
    function astType(f) {
	switch (f.id || f.lambda.id) {
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
    function second(){return function(a) {return function(b){return b()}}}
    function getNameNm(n) {return n(first)}
    function getNameAst(n) {return n(second)}
    function getRefVar(r) {return r(first)()}
    function getLitVal(l) {return l(first)()}
    function getLambdaVar(l) {return l(first)}
    function getLambdaBody(l) {return l(second)}
    function getApplyFunc(a) {return a(first)}
    function getApplyArg(a) {return a(second)}
    function getPrimArg(p) {return p(first)}
    function getPrimRest(p) {return p(second)}
    function astPrint(ast, res) {
	var isFirst = !res

	res = res || []
	if (isFirst) res.gen = 0
	switch (ast.id || (ast.lambda && ast.lambda.id)) {
	case _nameId:
	    res.push('name ', getNameNm(ast), ' (')
	    astPrint(getNameAst(ast), res)
	    res.push(')')
	    break
	case _refId:
	    res.push('ref ')
	    var val = getRefVar(ast)
	    res.push(val.lambda ? "WHA?" : val)
	    break
	case _litId:
	    res.push('lit ')
	    var val = getLitVal(ast)

	    res.push(val.lambda ? "{" + val.lambda.toString() + "}" : val)
	    break
	case _lambdaId:
	    res.push('lambda ')
	    res.push(getLambdaVar(ast))
	    res.push(' . ')
	    astPrint(getLambdaBody(ast), res)
	    break
	case _applyId:
	    res.push('apply (')
	    astPrint(getApplyFunc(ast), res)
	    res.push(') (')
	    astPrint(getApplyArg(ast), res)
	    res.push(')')
	    break
	case _primId:
	    res.push('prim ')
	    astPrint(getPrimArg(ast), res)
	    astPrint(getPrimRest(ast), res)
	    break
	default:
	    res.push("WHA???")
	    break
	}
	return isFirst && res.join('')
    }

    /**
       A context is program scope
     */
    function createContext() {
	var ctx = (function(){
	    var tokens = {}
	    var groupOpens = {'(': ')'}
	    var groupCloses = {')': 1}
	    var C

	    function id(func, id) {
		func.context = C
		func.id = id
		return func
	    }

	    function nameAst(nm, ast) {
		if (!ast.name) {
		    C.astsByName[nm] = ast
		    ast.name = nm
		}
	    }
	    function addAst(ast) {
		if (!ast.id) {
		    C.astsById.push(ast)
		    ast.id = C.astsById.length
		}
		return ast
	    }

	    return C = {
		tokens: tokens,
		groupOpens: groupOpens,
		groupCloses: groupCloses,
		astsById: [],
		astsByName: {},
		addAst: addAst,
		id: id,
		nameAst: nameAst,
		eval: function(str){return eval(str)},
		subcontext: function(){return function(str){return eval(str)}},
	    }
	})()

	ctx.funcId = 0
	return ctx
    }

    var CTX = createContext()

    function Memo() {
	this.count = 0
    }
    Memo.prototype = {
	add: function() {return "memo" + this.count++},
	toString: function() {
	    if (this.count) {
		var ret = ''

		for (var i = 0; i < this.count; i++) {
		    ret += "var memo" + i + "; "
		}
		return ret
	    } else {
		return ''
	    }
	}
    }

    function dgen(ast, lazy) {
	var mem = new Memo()
	var ret = gen(ast, [], null, Nil, mem, true)

	return mem.count || lazy ? [["(function(){", mem, "return " + ret[0] + "})", !lazy ? "()" : ""].join(''), ret[1]] : ret
    }
    function memoStart(res, memo, deref) {
	if (!deref) {
	    var mem = memo.add()

	    res.push("function(){return ", mem, " || (", mem, " = ")
	}
    }
    function memoEnd(res, memo, deref) {
	if (!deref) res.push(")}")
    }
    function Cons(a, b) {
	this.head = a
	this.tail = b
    }
    Cons.prototype = {
	contains: function(val) {
	    return this.head == val || this.tail.contains(val)
	}
    }
    var Nil = new Cons()
    Nil.contains = function() {return false}
    function gen(ast, res, ctx, vars, memo, deref, prim, cont) {
	var isFirst = !ctx

	res = res || []
	ctx = ctx || CTX.subcontext()
	ctx.curLit = 0
	if (isFirst) ctx.gen = 0
	CTX.addAst(ast)
	switch (ast.lambda && ast.lambda.id) {
	case _nameId:
	    var nm = getNameNm(ast)
	    var a = getNameAst(ast)

	    CTX.nameAst(nm, a)
	    gen(a, res, ctx, vars, memo)
	    break
	case _refId:
	    var val = getRefVar(ast)

	    if (val.lambda) throw new Error("attempt to use lambda as a variable")
	    if (!vars.contains(val)) throw new Error("unbound variable -- use lit instead")
	    res.push(nameSub(val))
	    if (deref) res.push("()")
	    break
	case _litId:
	    var val = getLitVal(ast)
	    var lit

	    memoStart(res, memo, deref)
	    if (typeof val == 'function') {
		lit = "lit" + ctx.curLit++

		ctx("var " + lit)
		ctx("(function(v){" + lit + " = v})")(getLitVal(ast))
		res.push(lit)
	    } else {
		res.push(JSON.stringify(val))
	    }
	    memoEnd(res, memo, deref)
	    break
	case _lambdaId:
	    var v = getLambdaVar(ast)

	    memo = new Memo()
	    if (!deref) res.push("(function(){return ")
	    res.push("id(function(" + nameSub(v) + "){", memo, "return ")
	    gen(getLambdaBody(ast), res, ctx, new Cons(v, vars), memo, true)
	    res.push("}, " + ast.id + ")")
	    if (!deref)	res.push("})")
	    break
	case _applyId:
	    var func = getApplyFunc(ast)
	    var arg = getApplyArg(ast)

	    memoStart(res, memo, deref)
	    gen(func, res, ctx, vars, memo, true)
	    res.push("(")
	    gen(arg, res, ctx, vars, memo)
	    res.push(")")
	    memoEnd(res, memo, deref)
	    break
	case _primId:
	    var arg = ast(first)
	    var rest = ast(rest)

	    if (prim) {
		if (cont) {
		    res.push(", ")
		}
		res.push(arg)
		if (isPrim(rest)) {
		    gen(rest, res, ctx, vars, memo, false, true, true)
		}
	    } else {
		memoStart(res, memo, deref)
		res.push(arg)
		res.push("(")
		if (isPrim(rest)) {
		    gen(rest, res, ctx, vars, memo, true, true, false)
		}
		res.push(")")
		memoEnd(res, memo, deref)
	    }
	    break
	default:
	    res.push("'WHA???'")
	    break
	}
	ast.src = res.join('')
	return isFirst && [ast.src, ctx]
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
    _lambdaId = LC.L.__lambda().lambda.body.body.id
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
    function wlambda(v, func) {return lambda(laz(v))(laz(func))}
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
    function lambda(_v) {
	return id(function(_f) {
	    return id(function(_g) {
		return _g()(_v)(_f)
	    }, _lambdaId)
	}, -1)
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

    function defineToken(name, def) {
	if (def != '=') {
	    CTX.tokens[name] = 1
	    tokenPat = null
	    if (def[1] == '(') {
		CTX.groupOpens[name] = def.substring(2, def.length - 1)
	    } else if (def[1] == ')') {
		CTX.groupCloses[name] = 1
	    }
	}
    }
    function evalLine(line, noRebuild) {
	if (line != "" && (line.match(/^#(define|strict|lazy)/) || line[0] != '#')) {
	    var def = line.match(tokenDefPat)
	    var name = def ? def[1].trim() : null
	    
	    if (def) {
		defineToken(name, def[2])
		line = line.substring(def[0].length).trim()
	    }
	    return addExpr(name, line, noRebuild)
	}
	return false
    }
    function newEntry(name, ast) {
	ast.name = name
	ast.cname = nameSub(name)
	try {
	    var cmp = compile(ast)
	    ast.func = cmp[0]
	    ast.env = cmp[1]
	    ast.src = dgen(ast, true)
	    if (warnFreeVariable.length) {
		ast.usesFree = warnFreeVariable.join(', ')
		warnFreeVariable = []
	    }
	} catch (err) {
	    ast.src = function() {return "Error compiling: " + expr}
	}
    }
    function nameSub(name) {
	var s = '_'

	for (var i = 0; i < name.length; i++) {
	    var code = charCodes[name[i]]
	    
	    if (code) {
		if (!s) s = name.substring(0, i)
		s += code
	    } else if (s) {
		s += name[i]
	    }
	}
	return s || name
    }
    function addExpr(name, txt, noRebuild) {
	if (name) {
	    var expr = newEntry(name, parse(txt))
	    var newOutput = ''

	    expr.expr.name = name
	    if (!noRebuild) {
		for (var i = 0; i < order.length; i++) {
		    if (order[i].name == name) {
			order.splice(i, 1)
		    }
		}
	    }
	    CTX.L = null
	    order.push(expr)
	    var hk = expr.expr.hashKey()
	    if (!hashed[hk]) hashed[hk] = expr
	    exprs[name] = expr
	    return true
	} else {
	    runExpr(txt.trim())
	    return false
	}
    }
    function addToken(tok, group) {
	var pat = ''
	
	CTX.tokens[tok] = group
	tokenPat = null
    }
    function createTokenPat() {
	if (!tokenPat) {
	    var types = []
	    
	    for (var i in CTX.tokens) {
		types.push(i)
	    }
	    // sort them by length, longest first
	    types.sort(function(a, b) {b.length - a.length})
	    for (var i = 0; i < types.length; i++) {
		var s = types[i]
		var o = ''
		
		for (var p = 0; p < s.length; p++) {
		    if (specials.indexOf(s[p]) > -1) {
			o += '\\'
		    }
		    o += s[p]
		}
		types[i] = o
	    }
	    types.push('((#define|#strict|#lazy)(?=[ \t]))|[()#.\\\\]| +')
	    tokenPat = new RegExp(/'(\\'|[^'])*'|"(\\"|[^"])*"/.source + '|' + types.join('|'))
	}
    }
    function tokenize(str) {
	var pos = 0
	var toks = []
	
	str = str.replace(/\u03BB/g, '\\')
	createTokenPat()
	while (str.length && (pos = str.search(tokenPat)) > -1) {
	    if (pos > 0) {
		toks.push(str.substring(0, pos))
	    }
	    var tok = tokenPat.exec(str.substring(pos))[0]
	    if (tok.trim()) {
		if (tok[0] == '#' && !tok.match(/^#(define|strict|lazy)/)) break
		toks.push(tok)
	    }
	    str = str.substring(pos + tok.length)
	}
	if (str.length) {
	    toks.push(str)
	}
	return toks
    }
    function parse(str) {return tparse(tokenize(str).reverse(), {})}
    function addDef(toks) {
	var t = toks.reverse()
	
	defs[t[0]] = t.join(' ')
    }
    function tparse(toks, vars, expr) {
	var cur
	var oldVars = {}

	while (toks.length) {
	    var tok = toks.pop()

	    if (tok == ')') {
		toks.push(tok)
		return expr
	    }
	    if (tok == '\\') {
		cur = tparseLambda(toks, vars)
	    } else if (tok == '#define') {
		addDef(toks)
		toks = []
	    } else if (tok == '#lazy' || tok == '#strict') {
		cur = tparseVariable(tok, vars, oldVars)
	    } else {
		var expectedClose = CTX.groupOpens[tok]
		var skip = false

		if (expectedClose) {
		    cur = tparse(toks, vars, tok != '(' ? tparseVariable(tok, vars, oldVars) : null)
		    if (toks.length && toks[toks.length - 1] == expectedClose) {
			toks.pop()
		    }
		    skip = true
		}
		if (!skip) {
		    cur = tparseVariable(tok, vars, oldVars)
		}
	    }
	    expr = expr ? wapply(expr, cur) : cur
	    if (CTX.groupCloses[tok]) {
		toks.push(tok)
		return expr
	    }
	}
	for (i in oldVars) {
	    vars[i] = oldVars[i]
	}
	return expr
    }
    
    function tparseVariable(tok, vars, oldVars) {
	if (vars[tok] || CTX.astsByName[tok]) {
	    vars[tok] = tok
	    cur = wref(tok)
	} else {
	    cur = wlit(tok)
	}
	return cur
    }
    function tparseLambda(toks, vars) {
	var name, old, body
	
	if (toks.length < 3 || toks[toks.length - 1] == '.') {
	    throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '))
	}
	old = vars[name]
	if (toks[toks.length - 2] == '.') {
	    name = toks.pop()
	    vars[name] = name
	    toks.pop()
	    body = tparse(toks, vars)
	} else {
	    name = toks.pop()
	    vars[name] = name
	    body = tparseLambda(toks, vars)
	}
	vars[name] = old
	return wlambda(name, body)
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
    console.log("t2 body: " + LC.L._t2()(second).lambda)
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
    console.log("run t4 'a': " + run(dgen(LC.L._t4()), laz('a')))
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
    console.log("REF ID: " + (ref("duh")()).id)
    console.log("REF TEST: " + astPrint(ref("duh")()))
    console.log("REF GEN: " + dgen(ref("duh")())[0])
*/

    var t4 = wlambda('x', wref('x'))
    console.log("T4 AST: " + astPrint(t4))
    console.log("T4 gen: " + dgen(t4)[0])
    console.log("T4 src: " + t4)

    console.log("T7: " + astPrint(LC.L._t7()))
    var t7 = wlambda('x', wlambda('y', wlambda('z', wapply(wref('x'), wapply(wref('y'), wref('z'))))))
    console.log("T7 AST: " + astPrint(t7))
    console.log("T7 gen: " + dgen(t7)[0])
    console.log("T7 run: " + eval(dgen(t7)[0]))
    console.log("T7 1: " + eval(dgen(t7)[0])(laz(function(x){return x()+"1"})))
    console.log("T7 2: " + eval(dgen(t7)[0])(laz(function(x){return x()+"1"}))(laz(function(y){return y()+"2"})))

var log=console.log

    console.log("T7 3: " + eval(dgen(t7)[0])(laz(function(x){log("x: " + x()); return String(x())+"1"}))(laz(function(y){log("y: " + y()); return y()+"2"}))(laz("FLOOP ")))

    console.log("T77: " + LC.L._t77)

    console.log("LIT: " + dgen(wlit('x'), true)[0])

    console.log("\\x.x: " + astPrint(parse("\\x.x x")))

// TODO: compile AST funcs directly and include the JS source here
// for self hosting
})()
