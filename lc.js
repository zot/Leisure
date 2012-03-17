/*
Copyright (C) 2011, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

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

var LC = (function() {
var defs = {}
var lconsId
var lnil
var lnilId
var Lhead
var Ltail
var Lappend
var ioMonadId
var alertCmdId
var promptCmdId
var bindCmdId
var returnCmdId
var getCmds
var getCmdVal
var getBindAction
var Ldl
var LdlList
var LdlAppend
var exprs = {}
var order = []
var lambdas = {}
var funcCount = 1
var hashed = {}
var L = null
var historyCount = 0
var history = []
var tokens = {}
var groupOpens = {'(': ')'}
var groupCloses = {')': 1}
var tokenPat = null
var specials = '[]().*+?|'
var tokenDefPat = /^ *([^ ]+) *(=[.)]=|=\([^=]+=|=)(?:[^=])/
var numberPat = /^[0-9]+(\.[0-9]+)?|([0-9]+)?\.[0-9]+/
var warnFreeVariable = []
var line = 0

function Cons(a, b) {
    this.car = a
    this.cdr = b
}
Cons.prototype = {
    toString: function() {
	return "(" + this.printElements(true) + ")"
    },
    printElements: function(first) {
	return (first ? "" : " ") + this.car + (this.cdr ? this.cdr.printElements(false) : "")
    }
}

function cons(a, b) {return new Cons(a, b)}

function index(list, element) {return lindex(list, element, 0)}

function lindex(list, element, i) {
    return list == null ? -1 : list.car == element ? i : lindex(list.cdr, element, i + 1)
}

function loadDefs(defs) {
    var d = defs.split('\n')

    exp("exprs", LC.exprs = exprs = {})
    exp("code", LC.code = {})
    exp("lambdas", LC.lambdas = lambdas = {})
    exp("hashed", LC.hashed = hashed = {})
    exp("order", LC.order = order = [])
    funcCount = 1
    exp("L", LC.L = L = null)
    line = 1
    for (var index in d) {
	evalLine(d[index].trim(), true)
	line++
    }
    constructEnv()
    findCons();
}
function defineToken(name, def) {
	if (def != '=') {
		tokens[name] = 1
		tokenPat = null
		if (def[1] == '(') {
			groupOpens[name] = def.substring(2, def.length - 1)
		} else if (def[1] == ')') {
			groupCloses[name] = 1
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
function addExpr(name, txt, noRebuild) {
    if (name) {
	var expr = new Entry(name, parse(txt))
	var newOutput = ''

	expr.expr.name = name
	if (!noRebuild) {
	    for (var i = 0; i < order.length; i++) {
		if (order[i].name == name) {
		    order.splice(i, 1)
		}
	    }
	}
	exp("L", LC.L = L = null)
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
function findCons() {
    if (L._cons) {
	lconsId = L._cons().lambda.body.body.id
	exp("lnil", LC.lnil = lnil = L._nil().lambda)
	Lnil = L._nil
	lnilId = LC.lnil.id
	Lhead = lcode2('head')
	Ltail = lcode2('tail')
	Lappend = lcode2('append')
    }
    if (LC.L._makeIO) {
	ioMonadId = LC.L._makeIO().lambda.body.id
	alertCmdId = LC.L._alertCmd().lambda.body.id
	promptCmdId = LC.L._promptCmd().lambda.body.id
	returnCmdId = LC.L._returnCmd().lambda.body.id
	bindCmdId = LC.L._bindCmd().lambda.body.id
	getCmds = lcode2('getCmds')
	exp("getAllCmds", LC.getAllCmds = getAllCmds = lcode2('getAllCmds'))
	getCmdVal = lcode2('getCmdVal')
	getBindAction = lcode2('getBindAction')
	Ldl = lcode2('dl')
	LdlList = lcode2('dlList')
	LdlAppend = lcode2('dlAppend')
    }
}
function runFunc(index) {
    runCode(order[index].expr, order[index].code)
}
function runExpr(str) {
	var expr = parse(str)

	expr && runCode(expr, constructEnv('function() {\nreturn ' + expr.ret([]).join("") + '\n}'))
}
function runCode(expr, code) {
    var res

    LC.historyExprs[historyCount] = expr
    try {
	constructEnv()
	history[historyCount] = res = code()
    } catch (err) {
	res = "Error: " + err.message
    }
    exp("lastResult", LC.lastResult = res)
    LC.resultCode(expr, res, historyCount)
    historyCount++
    exp("L", LC.L = L = null)
}
//function getCommands(io) {
//    return getCmds(io)(Lnil)
//}
function stepIO(commands, lastRet) {
    for (;;) {
	if (isNil(commands)) {
	    alert("Final value: " + pretty(lastRet))
	    return [lastRet]
	}
	var head = Lhead(commands)
	switch (lambdaId(head)) {
	case alertCmdId:
	    alert(pretty(getCmdVal(head)))
	    return [Ltail(commands), false]
	case promptCmdId: return [Ltail(commands), prompt(pretty(getCmdVal(head)))]
	case returnCmdId:
	    commands = Ltail(commands)
	    lastRet = getCmdVal(head)
	    continue
	case bindCmdId:
	    var action = getBindAction(head)
	    var monad = action(wrap(lastRet))

	    commands = LdlList(LdlAppend(getCmds(monad), Ldl(Ltail(commands))))
	    lastRet = false
	    continue
	}
	throw new Error("unknown command: " + pretty(head))
    }
}
function getLambda(l) {return l instanceof Entity ? l : l.lambda}
function lambdaId(l) {var lam = getLambda(l); return lam && lam.id || null}
function isCons(l) {return lconsId && lambdaId(l) == lconsId}
function isIOMonad(l) {return ioMonadId && lambdaId(l) == ioMonadId}
function isNil(l) {return lnilId && lambdaId(l) == lnilId}
function pretty(l, nosubs) {
    var lam = getLambda(l)

    if (lam) {
	if (isCons(l)) return '[' + elements(l, true, nosubs) + ']'
	if (ioMonadId) switch (lambdaId(l)) {
	case ioMonadId: return "IO MONAD(" + pretty(getAllCmds(l)) + ")"
	case alertCmdId: return "alert(" + pretty(getCmdVal(l)) + ")"
	case promptCmdId: return "prompt("+pretty(getCmdVal(l))+")"
	case returnCmdId: return "return("+pretty(getCmdVal(l))+")"
	case bindCmdId: return "bind("+pretty(getBindAction(l))+")"
	}
	return lam.format(false, nosubs)
    }
    return l
}
function elements(l, first, nosubs) {
    return isNil(l) ? '' : ((first ? '' : ', ') + pretty(Lhead(l), nosubs) + elements(Ltail(l), false, nosubs))
}
function constructEnv(src) {
    if (!L || src) {
	var env = ['(function(){\nL.internalEval = function(expr){return eval(expr)}\n']

	for (var i = 0; i < order.length; i++) {
	    if (order[i].name != "") {
		env.push('\n// ' + order[i].name + ' = ' + order[i].expr.format(true, true))
		if (order[i].usesFree) env.push('//WARNING, line ' + line + ': uses free variables: ' + order[i].usesFree)
	    }
	    env.push('LC.code[order[' + i + '].name] = order[' + i + '].code = ' + order[i].src)
	    if (order[i].name != "") {
		env.push("var " + order[i].cname + ' = ' + 'order[' + i + '].code')
		env.push("L." + order[i].cname + " = " + order[i].cname)
	    }
	}
	for (var i = 0; i < history.length; i++) {
	    env.push("var _" + charCodes['$'] + i + " = function(){return history[" + i + "]}")
	}
	if (history.length > 0) {
	    env.push("var _" + charCodes['$'] + " = function(){return history[" + (history.length - 1) + "]}")
	}
	if (src) {
	    env.push('return (' + src + ')')
	}
	env.push('\n})()')
	exp("L", LC.L = L = {})
	var res
	try {
	    res = eval(env.join("\n"))
	} catch (err) {
	    res = "ERROR: " + err.message
	}
	return res
    }
}
function addToken(tok, group) {
	var pat = ''

	tokens[tok] = group
	tokenPat = null
}
function createTokenPat() {
	if (!tokenPat) {
		var types = []

		for (var i in tokens) {
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
	    var expectedClose = groupOpens[tok]
	    var skip = false

	    if (expectedClose) {
		cur = tparse(toks, vars, tok != '(' ? tparseVariable(tok, vars, oldVars) : null)
		if (toks.length && toks[toks.length - 1] == expectedClose) {
		    toks.pop()
		}
//		if (!toks.length || last != expectedClose) {
//		    throw new Error('unbalanced group, expected "' + expectedClose + '", but got "' + last + '"')
//		}
//		toks.pop()
		skip = true
	    }
	    if (!skip) {
		cur = tparseVariable(tok, vars, oldVars)
	    }
	}
	expr = expr ? new Apply(expr, cur) : cur
	if (groupCloses[tok]) {
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
	var cur = vars[tok]
	if (!cur) {
		cur = new Variable(tok, true)
		if (vars[tok]) oldVars[tok] = vars[tok]
		vars[tok] = cur
	}
	return cur
}
function tparseLambda(toks, vars) {
	var name, old, body, lvar

	if (toks.length < 3 || toks[toks.length - 1] == '.') {
		throw new Error('imcomplete lambda definition: ' + toks.reverse().join(' '))
	}
	if (toks[toks.length - 2] == '.') {
		name = toks.pop()
		old = vars[name]
		lvar = vars[name] = new Variable(name, false)
		toks.pop()
		body = tparse(toks, vars)
	} else {
		name = toks.pop()
		old = vars[name]
		lvar = vars[name] = new Variable(name, false)
		body = tparseLambda(toks, vars)
	}
	vars[name] = old
	return new Lambda(lvar, body)
}
function Entry(name, expr) {
    this.name = name
    this.cname = nameSub(name)
    this.expr = expr
    this.reduced = expr.globalSub()
    if (expr) {
	try {
	    this.src = 'function() {\nreturn ' + expr.ret([]).join("") + '\n}'
	    if (warnFreeVariable.length) {
		this.usesFree = warnFreeVariable.join(', ')
		warnFreeVariable = []
	    }
	} catch (err) {
	    this.src = function() {return "Error compiling: " + expr}
	}
    }
}
Entry.prototype = {
	toString: function() {return this.expr && this.expr.format(false)},
	formatSlash: function(nosubs) {return this.expr.format(true, nosubs)},
	names: function() {this.expr.names()},
	alphaConvert: function() {return new Entry(this.name, this.expr.alphaConvert())},
	betaReduce: function() {return new Entry(this.name, this.expr.betaReduce())},
	etaConvert: function() {return new Entry(this.name, this.expr.etaConvert())},
	debruijn: function(skipCache) {return new Entry(this.name, this.expr.debruijn(skipCache))},
	globalSub: function() {return new Entry(this.name, this.expr.globalSub())},
}

function reduce(expr, ecallback, acallback, bcallback) {
	var prev = expr

	for (var count = 0; count < 1000; count++) {
		var ec = prev.etaConvert()
		var ac = ec.alphaConvert()
		var bc = ac.betaReduce()

		if (!ec.equals(prev)) ecallback(ec)
		if (!ac.equals(ec)) acallback(ac)
		if (!bc.equals(ac)) bcallback(bc)
		if (bc.equals(prev)) return true
		prev = bc
	}
	return false
}

function pre(type, func) {
    return function(trans) {trans.pre[type.name] = func}
}

function post(type, func) {
    return function(trans) {trans.post[type.name] = func}
}

function identity() {return this}

function Transformer(funcs) {
	this.pre = {Lambda: identity, Variable: identity, Apply: identity}
	this.post = {Lambda: identity, Variable: identity, Apply: identity}
	for (var i = 0; i < funcs.length; i++) {
		funcs[i](this)
	}
	this.trail = {}
}
Transformer.prototype = {
	prune: function(oldEnt, newEnt) {return this.trail[oldEnt.id] = newEnt},
	getTransform: function(entity) {return this.trail[entity.id]},
	transform: function(entity) {return entity.doTransform(this)},
}
function Transformer2(settings) {
    for (var i in settings) {
	this[i] = settings[i]
    }
    this.map = {}
}
Transformer2.prototype = {
    visit: function(el) {
	var t = this

	if (el instanceof Apply) {
	    return el.make.apply(el, this.apply.call(el, function(newF) {return t.visit(newF == el.func ? t.map[el.id] || newF : newF)}, function(newA) {return t.visit(newA == el.arg ? t.map[el.id] || newA : newA)}))
	} else if (el instanceof Lambda) {
	    return el.make.apply(el, this.lambda.call(el, function(newV) {return t.map[el.lvar.id] = t.visit(newV == el.lvar ? t.map[el.id] || newV : newV)}, function(newB) {return t.visit(newB == el.body ? t.map[el.id] || newB : newB)}))
	} else {
	    return this.map[el.id] = this.variable.call(el, function(newV) {return newV == el ? t.map[el.id] || newV : newV})
	}
    },
    prune: function(el, newEl) {this.map[el.id] = newEl},
    apply: function(funcF, argF) {return [funcF(this.func), argF(this.arg)]},
    lambda: function(lvarF, bodyF) {return [lvarF(this.lvar), bodyF(this.body)]},
    variable: function(varF) {return varF(this)},
}
function lcode(name) {
    name = nameSub(name)
    return (function(){
	var func = L[name]()

	for (var i = 0; i < arguments.length; i++) {
	    func = func.call(null, wrap(arguments[i]))
	}
	return func
    })
}
function lcode2(name) {
    var func = L[nameSub(name)]()

    return (function(){
	var f = func

	for (var i = 0; i < arguments.length; i++) {
	    f = f.call(null, wrap(arguments[i]))
	}
	return f
    })
}
function debcache(expr, cache, skipCache) {
    if (skipCache) {
	return expr
    } else {
	var key = expr.dformat()
	return cache[key] || (cache[key] = expr)
    }
}
var entityCounter = 0
function Entity(obj) {
	for (i in obj) {
		this[i] = obj[i]
	}
}
Entity.prototype.__proto__ = {
    transform2: function(settings) {return new Transformer2(settings).visit(this)},
    pretty: function() {return this.id == lconsId ? pretty(constructEnv(this.ret([]).join(""))) : this.format()},
    transform: function() {return this.doTransform(new Transformer(arguments))},
    startTransform: function(transformer) {return transformer.getTransform(this) || this.doTransform(transformer)},
    doTransform: function(transformer) {
	if (transformer.getTransform(this)) return transformer.getTransform(this)
	var pre = transformer.pre[this.constructor.name].call(this, transformer)

	return pre && (transformer.getTransform(this) || transformer.prune(this, transformer.post[pre.constructor.name].call(pre.propagateTransform(transformer), transformer)))
    },
    alphaConvert: function() {return this},
    betaReduce: function() {return this},
    etaConvert: function() {return this},
    subetaConvert: function() {return this},
    isApply: function() {return false},
    names: function() {
	var names = {}
	
	this.transform(pre(Lambda, function(){names[this.lvar.name] = 1; return this}))
	return names
    },
    uniquify: function(names) {return this.transform(pre(Lambda, function(transformer){transformer.prune(this.lvar, this.lvar.rename(names)); return this}))},
    hashKey: function() {return this.globalSub().debruijn().dformat()},
    debruijn: function(skipCache) {return this.subdebruijn(null, {}, skipCache)},
    containsVar: function(targetVar) {
	var contains = false
	
	this.transform(pre(Variable, function() {contains = contains || this == targetVar; return this}))
	return contains
    },
}

function pfx(prefix) {return prefix == null ? '' : prefix}

function memoize(func) {
    var out = function() {
	return func.memo || (func.memo = func())
    }

    out.lambda = func.lambda
    out.value = func.value
    return out
}

function createValue(val) {
    var func = function(){return val}

    func.value = true
    return func
}

function setLambda(func, id, value) {
    func.lambda = lambdas[id]
    func.value = value
    return func
}

function Lambda(arg, body, id) {
	this.lvar = arg
	this.body = body
	this.id = id || entityCounter++
	if (!lambdas[this.id]) lambdas[this.id] = this
}
Lambda.prototype.__proto__ = new Entity({
    dformat: function(inner) {return inner ? "(" + "\u03BB" + this.body.dformat(false) + ")" : "\u03BB" + this.body.dformat(false)},
    subdebruijn: function(vars, cache, skipCache) {return debcache(this.make(null, this.body.subdebruijn(cons(this.lvar, vars), cache, skipCache), skipCache && 'original'), cache, skipCache)},
    equals: function(obj) {return obj instanceof Lambda && this.lvar.equals(obj.lvar) && this.body.equals(obj.body)},
    toString: function() {return this.format()},
    ret: function(stream, prefix) {
	var index = stream.length
	
	stream.push("setLambda(function(", pfx(prefix), this.lvar.cname, ") {\n", "return ")
	this.body.ret(stream, prefix)
	stream.push("\n}, " + this.id + ")")
	return stream
    },
    pass: function(stream, prefix) {
	stream.push("memoize(function(){return ")
	this.ret(stream, prefix)
	stream.push("\n})")
	return stream
    },
    isPrimitive: function() {return false},
    apply: function(stream, prefix) {
	stream.push("(")
	this.ret(stream, prefix)
	stream.push(")")
	return stream
    },
    getHashedName: function() {if (this.name) return this.name; var d = hashed[this.hashKey()]; return d && d.name},
    globalSub: function() {return this.make(this.lvar, this.body.globalSub())},
    format: function(slash, nosubs, func, arg) {return (!nosubs && this.getHashedName()) || ((func ? '(' : '') + (slash ? '\\' : '\u03BB') + this.formatRest(slash, nosubs)) + (func ? ')' : '')},
    formatRest: function(slash, nosubs) {
	var n = !nosubs && this.body instanceof Lambda && this.body.getHashedName()
	
	return this.lvar.format(slash, nosubs) + (n ? (slash ? '  .  ' : ' . ') + n : this.body instanceof Lambda ? ' ' + this.body.formatRest(slash, nosubs) : (slash ? '  .  ' : ' . ') + this.body.format(slash, nosubs))
    },
    propagateTransform: function(transformer) {
	var newVar = this.lvar.startTransform(transformer)
	var newBod = this.body.startTransform(transformer)
	
	return this.make(newVar, newBod)
    },
    make: function(newVar, newBody, link) {
	var newExpr = (this.lvar == newVar && this.body == newBody && this) || new Lambda(newVar, newBody, this.id)

	if (newExpr != this && link) newExpr[link] = this
	return newExpr
    },
    substitute: function(value) {return this.body.rsub(this.lvar, value)},
    rsub: function(variable, value) {return this.make(this.lvar, this.body.rsub(variable, value))},
    subetaConvert: function() {return this.body instanceof Apply && this.body.arg == this.lvar && !this.body.func.containsVar ? this.body.func : this},
})
function numberFor(name, names) {
	var i = 0

	while (!names[name + '_' + ++i]) {}
	return i
}

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
function nameUnsub(name) {
	var s = ''

	for (var i = 1; i < name.length; i++) {
		if (name[i] == '$') {
			if (!s) s = name.substring(0, i)
			s += codeChars[name[++i]]
		} else {
			if (s) s += name[i]
		}
	}
	return s
}

function Variable(txt, free, base, num) {
	this.name = txt
	this.base = base || txt
	this.cname = nameSub(txt)
	this.num = num || 0
	this.free = free
	this.id = entityCounter++
	if (!lambdas[this.id]) lambdas[this.id] = this
}
var vcount = 0
function esc(n) {
    var s = null

    for (var i = 0; i < n.length; i++) {
	switch (n[i]) {
	case '"':
	case "'":
	    if (s == null) s = n.substring(0, i)
	    s += '\\' + n[i]
	    break;
	default:
	    if (s != null) s += n[i]
	    break;
	}
    }
    return s || n
}
// supports number and string literals
function value(n) {
    return n.match(numberPat) ? Number(n) : '"' + esc(n) + '"';
}
Variable.prototype.__proto__ = new Entity({
    dformat: function() {return this.free ? "[" + this.name + "]" : this.name},
    subdebruijn: function(vars, cache, skipCache) {
	var i = index(vars, this)
	var newVar = new Variable(i == -1 ? this.name : i, i == -1, this.base, i)

	if (skipCache) newVar.original = this
	return newVar
    },
    globalSub: function() {return this.free && exprs[this.name] ? exprs[this.name].reduced : this},
    equals: function(obj) {return obj instanceof Variable && this.name == obj.name},
    toString: function() {return "Variable(" + this.name + ")"},
    valueFunc: function() {
	warnFreeVariable.push(this.name)
//	this was for when unbound value were represented by functions
//	return "setLambda(function() {throw new Error('Line " + line + " attempts to use free variable, \"" + esc(this.name) + "\" as a function.')}, " + this.id + ", " + value(this.name) + ")"
	return value(this.name)
    },
    ret: function(stream, prefix) {
	if (this.isBound()) {
	    this.pass(stream, prefix)
	    stream.push("()")
	} else {
	    stream.push(this.valueFunc())
	}
	return stream
    },
    isBound: function() {return !this.free || exprs[this.name] || this.name == "$" || (this.name.match('^\\$[0-9]+$') && Number(this.name.substring(1)) < history.length)},
    pass: function(stream, prefix) {
	if (this.isBound()) {
	    stream.push(pfx(prefix), this.cname)
	} else {
	    stream.push("createValue(", this.valueFunc(), ")")
	}
	return stream
    },
    isPrimitive: function() {return String(this.name).match(/^#(lazy|strict)$/)},
    apply: function(stream, prefix) {return this.ret(stream, prefix)},
    format: function() {return this.name},
    propagateTransform: function(transformer) {return this},
    rename: function(names) {
	if (!names[this.name]) return this
	var i = this.num
	
	while (names[this.base + '_' + ++i]) {}
	return new Variable(this.base + '_' + i, this.free, this.base, i)
    },
    rsub: function(variable, value) {return this == variable ? value : this},
})

function Apply(func, arg) {
	this.func = func
	this.arg = arg
	this.id = entityCounter++
}
Apply.prototype.__proto__ = new Entity({
    dformat: function(inner) {
	var fstr = this.func.dformat(true)
	
	return fstr + " " + (this.arg instanceof Apply ? "(" + this.arg.dformat(false) + ")" : this.arg.dformat(inner))
    },
    subdebruijn: function(vars, cache, skipCache) {return debcache(this.make(this.func.subdebruijn(vars, cache, skipCache), this.arg.subdebruijn(vars, cache, skipCache), skipCache && 'original'), cache, skipCache)},
    globalSub: function() {return this.make(this.func.globalSub(), this.arg.globalSub())},
    equals: function(obj) {return obj instanceof Apply && this.func.equals(obj.func) && this.arg.equals(obj.arg)},
    isPrimitive: function() {return this.func.isPrimitive()},
    compilePrimitive: function(stream, prefix) {
	if (this.func instanceof Variable) {
	    stream.push(this.arg.name, "(")
	    return this.func.name == '#strict'
	}
	var strict = this.func.compilePrimitive(stream, prefix)
	if (!(this.func.func instanceof Variable)) {
	    stream.push(", ")
	}
	if (strict) {
	    this.arg.apply(stream, prefix)
	} else {
	    stream.push("memoize(function(){return ")
	    this.arg.apply(stream, prefix)
	    stream.push("\n})")
	}
	return strict
    },
    apply: function(stream, prefix) {
	if (this.isPrimitive()) {
	    this.compilePrimitive(stream, prefix)
	    stream.push(")")
	} else {
	    this.func.apply(stream, prefix)
	    stream.push("(")
	    this.arg.pass(stream, prefix)
	    stream.push(")")
	}
	return stream
    },
    ret: function(stream, prefix) {return this.apply(stream, prefix)},
    pass: function(stream, prefix) {
	stream.push("memoize(function(){return ")
	this.apply(stream, prefix)
	stream.push("\n})")
	return stream
    },
    toString: function() {return "Apply(" + this.func + " " + this.arg + ")"},
    format: function(slash, nosubs, func, arg) {return (arg ? '(' : '') + this.func.format(slash, nosubs, true, false) + ' ' + this.arg.format(slash, nosubs, func, true) + (arg ? ')' : '')},
    propagateTransform: function(transformer) {
	var newFunc = this.func.startTransform(transformer)
	var newArg = this.arg.startTransform(transformer)
	
	return this.make(newFunc, newArg)
    },
    make: function(newFunc, newArg, link) {
	var newExpr = (newFunc == this.func && newArg == this.arg && this) || new Apply(newFunc, newArg)

	if (this != newExpr && link) newExpr[link] = this
	return newExpr
    },
    innermost: function(func) {return this.func.isApply() ? new Apply(this.func.innermost(func), this.arg) : func.call(this)},
    isApply: function() {return true},
    alphaConvert: function() {return this.innermost(function() {return new Apply(this.func, this.arg.uniquify(this.func.names()))})},
    betaReduce: function() {return this.innermost(function() {return this.func.substitute(this.arg)})},
    etaConvert: function() {return this.innermost(function() {return this.make(this.func.subetaConvert(), this.arg)})},
    rsub: function(variable, value) {return this.make(this.func.rsub(variable, value), this.arg.rsub(variable, value))},
})
function wrap(x) {return function() {return x}}
//var Lhead = lcode('head')
//var Ltail = lcode('tail')
var LC = {
    loadDefs: loadDefs,
    runFunc: runFunc,
    evalLine: evalLine,
    reduce: reduce,
    order: order,
    lambdas: lambdas,
    defs: defs,
    historyExprs: [],
    history: history,
    pretty: pretty,
    output: function() {},
    resultCode: function() {},
    wrap: wrap,
    lcode: lcode,
    pre: pre,
    post: post,
    Lambda: Lambda,
    Variable: Variable,
    Apply: Apply,
    Cons: Cons,
    cons: cons,
    index: index,
    getLambda: getLambda,
    isIOMonad: isIOMonad,
    stepIO: stepIO,
    isNil: isNil,
    getAllCmds: null,
    value: value,
}

    function exp(key, value) {
	if (typeof exports != 'undefined') {
	    exports[key] = value
	}
    }

if (typeof exports != 'undefined') {
    for (i in LC) {
	exports[i] = LC[i]
    }
}

return LC
})()
