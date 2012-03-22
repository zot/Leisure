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
    exports.hereDoc = hereDoc
    exports.parse = parse
    exports.astPrint = astPrint
    exports.gen = dgen
    exports.laz = laz

    var _refId = -1
    var _litId = -2
    var _lambdaId = -3
    var _applyId = -4
    var _primId = -5
    var _nameId = -6
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
    
    function hereDoc(f) {
	return f.toString().
	    replace(/^[^\/]+\/\*!?/, '').
	    replace(/\*\/[^\/]+$/, '');
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
	    if (val.lambda) throw new Error("Attempt to use lambda in ref, instead of string or number: " + val)
	    res.push(val)
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
	    throw new Error("Unknown type of object in AST: " + ast)
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

	    // standard functions
	    function _eval() {
		return function(ast) {
		    return eval(dgen(ast())[0])
		}
	    }
	    function __lit() {
		return function(_x) {
		    return id(function(_f) {
			return _f()(_x)
		    }, _litId)
		}
	    }
	    function __ref() {
		return function(_x) {
		    return id(function(_f) {
			return _f()(_x)
		    }, _refId)
		}
	    }
	    function __lambda() {
		return function(_v) {
		    return id(function(_f) {
			return id(function(_g) {
			    return _g()(_v)(_f)
			}, _lambdaId)
		    }, -1)
		}
	    }
	    function __apply() {
		return function(_func) {
		    return id(function(_arg) {
			return id(function(_f) {
			    return _f()(_func)(_arg)
			}, _applyId)
		    }, -2)
		}
	    }
	    function __prim() {
		return function(_func) {
		    return id(function(_arg) {
			return id(function(_f) {
			    return _f()(_func)(_arg)
			}, _primId)
		    }, -3)
		}
	    }
	    function __name() {
		return function(_nm) {
		    return id(function(_ast) {
			return id(function(_f) {
			    return _f()(_nm)(_ast)
			}, _nameId)
		    }, -4)
		}
	    }

	    function id(func, id) {
		if (!id) {
		    C.astsById.push(func.name)
		}
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

	    var t = this

	    C = {
		tokens: tokens,
		groupOpens: groupOpens,
		groupCloses: groupCloses,
		astsById: [],
		astsByName: {},
		addAst: addAst,
		id: id,
		nameAst: nameAst,
		eval: function(str){
		    return eval(str)
		},
		subcontext: function(){return function(str){return eval(str)}},
	    }
	    C.astsByName.eval = id(_eval())
	    C.astsByName._lit = id(__lit())
	    C.astsByName._ref = id(__ref())
	    C.astsByName._lambda = id(__lambda())
	    C.astsByName._apply = id(__apply())
	    C.astsByName._prim = id(__prim())
	    C.astsByName._name = id(__name())

	    return C
	})()

	ctx.funcId = 0
	return ctx
    }

    var CTX = createContext()
    exports.eval = CTX.eval
    exports.tst = CTX.test

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
	switch (ast.id || (ast.lambda && ast.lambda.id)) {
	case _nameId:
	    var nm = getNameNm(ast)
	    var a = getNameAst(ast)

	    CTX.nameAst(nm, a)
	    gen(a, res, ctx, vars, memo)
	    break
	case _refId:
	    var val = getRefVar(ast)

	    if (val.lambda) throw new Error("attempt to use lambda as a variable")
	    if (!vars.contains(val) && !CTX.astsByName[val]) throw new Error("unbound variable, '" + val + "' -- use lit instead")
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
	    throw new Error("Unknown object type in gen: " + ast)
	    break
	}
	ast.src = res.join('')
	return isFirst && [ast.src, ctx]
    }

    function laz(val) {
	return function(){return val}
    }

    var lit = CTX.astsByName._lit
    var ref = CTX.astsByName._ref
    var lambda = CTX.astsByName._lambda
    var apply = CTX.astsByName._apply
    var prim = CTX.astsByName._prim
    var name = CTX.astsByName._name

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
	    expr = expr ? apply(laz(expr))(laz(cur)) : cur
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
	    cur = ref(laz(tok))
	} else {
	    cur = lit(laz(tok))
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
	return lambda(laz(name))(laz(body))
    }
})()
