var def
var output
var result
var showDebug = false
var showSubs = true
var showPretty = true
var results = []
var docMsg = true
var compilations = {}
var collapseInitial = true
var pendingIO = null

function setShowDebug(state) {
	showDebug = state
	show()
}
function setShowSubs(state) {
	showSubs = state
	show()
}
function setShowPretty(state) {
	showPretty = state
	show()
}
function step(value) {
    if (pendingIO == null || pendingMonad != value) {
	pendingIO = [LC.getCommands(value), LC.getVal(value)]
	pendingMonad = value
    }
    pendingIO = LC.stepIO(pendingIO[0], pendingIO[1])
    if (pendingIO.length == 1) pendingIO = null
}
function show() {document.getElementById("control").setAttribute("class", (showDebug ? "" : "hidedebug ") + (showSubs ? "showsubs " : "shownosubs ") + (showPretty ? "showpretty" : "shownopretty"))}
function handleFiles(fileElement) {
	var files = fileElement.files
	var reader = new FileReader()

	reader.onerror = function(evt) {
		alert('error' + evt)
	}
	reader.onload = function() {
		LC.loadDefs(reader.result)
		displayOutput()
		displayResults(true)
		result.innerHTML = ''
	}
	reader.readAsText(files[0])
	fileElement.value = null
	def.select()
}
function displayOutput() {
	var outputs = []

	for (var index = 0; index < LC.order.length; index++) {
		var expr = LC.order[index]

		outputs.push("<div><button onclick='editFunc(\"" + expr.name + "\", \"" + expr.formatSlash(true).replace(/\\/g, '\\\\') + "\")'>Edit</button> <button onclick='runFunc(\"" + index + "\")'>Run</button><button onclick='runReduce(LC.order[" + index + "].expr)'>Reduce</button><button onclick='compileVM(LC.order[" + index + "].expr)'>VM</button> <b>" + (expr.name  ? expr.name + ':' : '') + '</b>&nbsp;&nbsp;' + expr.expr.format(false, true) + "</div>")
	}
	output.innerHTML = outputs.join('')
	output.lastChild.scrollIntoView()
}
function runFunc(index) {
	LC.runFunc(index)
	displayResults(results.length && docMsg)
}
function compileLLVM(id) {
	var comp = compilations[id]

	comp.defs = []
	for (i in LC.defs) {
		comp.defs.push(LC.defs[i])
	}
	results.push("<b>LLVM</b><pre>", VM.toLLVM(comp), "</pre>")
	displayResults(results.length && docMsg)
}
function runVm(id) {
	var comp = compilations[id]
	var result = VM.execute("EXPR", comp)
	results.push("<b>Execute:</b> ", comp.expr.format(false, true), "&nbsp;&nbsp;&nbsp;&nbsp;&rArr;&nbsp;&nbsp;&nbsp;&nbsp;", comp.expr.globalSub().debruijn().dformat(), "<br>")
	if (!result.mp) {
		results.push("<b>Result:</b>", (typeof result.fp == 'object' ? "" : " [primitive] "), result.fp, "<br><br><span>.</span>")
	} else {
		if (typeof result.fp == 'object') {
			var compExpr = comp.addrs[result.fp[VM.CTX_ADDR]].expr
			var rexpr = compExpr instanceof LC.Variable ? compExpr : LC.hashed[compExpr.dformat()]

			results.push("<b><i>Attempt to use free variable ", rexpr, " as a function</i></b>")
		}
	}
	displayResults(results.length && docMsg)
}
function compileVM(expr) {
	var oldEx = expr
	expr = expr.globalSub().debruijn(true)
//	results.push("<b>Compile:</b> ", oldEx.format(false, true), "&nbsp;&nbsp;&nbsp;&nbsp;&rArr;&nbsp;&nbsp;&nbsp;&nbsp;", expr.dformat(), " <button onclick='runVm(", expr.id, ")'>Run</button><table>")
	results.push("<b>Compile:</b> ", oldEx.format(false, true), "&nbsp;&nbsp;&nbsp;&nbsp;&rArr;&nbsp;&nbsp;&nbsp;&nbsp;", expr.dformat(), " <button onclick='runVm(", expr.id, ")'>Run</button><button onclick='compileLLVM(", expr.id,")'>LLVM</button><table>")
	var comp = VM.gen(expr, true)
	compilations[expr.id] = comp
	comp.expr = oldEx
	for (var i = 0; i < comp.code.length; ) {
		var entry = comp.addrs[i]

		if (entry) {
			results.push("<tr style='vertical-align: bottom'><td><br><b>", entry.name, "</b></td><td>")
		} else {
			results.push("<tr><td></td><td>")
		}
		results.push("&nbsp;<b>", i, "</b>&nbsp;</td><td>")
		switch(comp.code[i++]) {
		case VM.VAR_START:
			results.push("VAR_START")
			break;
		case VM.NEXT_VAR:
			results.push("NEXT_VAR")
			break;
		case VM.USE_CONTEXT:
			var id = comp.code[i++]
			var addr = comp.code[i++]
			var parent = comp.code[i++]
			var label = addr >= 0 ? comp.addrs[addr].name : "VAR(" + LC.lambdas[id].name + ")"
			var original = LC.lambdas[id]
//			results.push("USE_CONTEXT ", (original &&  original.name != '' && original.name) || ('L' + id), ", ", label, ", ", parent, ", ", comp.code[i++])
//			results.push("USE_CONTEXT ", (original &&  original.name != '' && original.name) || ((original instanceof LC.Apply ? "A-" : "L-") + id), ", ", addr, ", ", parent, ", ", comp.code[i++])
			results.push("USE_CONTEXT ", label, ", ", addr, ", ", parent, ", ", comp.code[i++] || 'null')
			break
		case VM.USE_VAR:
			results.push("USE_VAR ")
			break
		case VM.BIND_CONTEXT:
			var id = comp.code[i++]
			var addr = comp.code[i++]
			var parent = comp.code[i++]
			var label = addr >= 0 ? comp.addrs[addr].name : "VAR(" + LC.lambdas[id].name + ")"
			var original = LC.lambdas[id]
//			results.push("BIND_CONTEXT ", (original && original.name != '' && original.name) || ('L' + id), ", ", label, ", ", parent, ", ", comp.code[i++])
//			results.push("BIND_CONTEXT ", (original && original.name != '' && original.name) || ('L' + id), ", ", addr, ", ", parent, ", ", comp.code[i++])
			results.push("BIND_CONTEXT ", label, ", ", addr, ", ", parent, ", ", comp.code[i++] || 'null')
			break
		case VM.BIND_VAR:
			results.push("BIND_VAR ")
			break
		case VM.MEMO:
			results.push("MEMO")
			break
		case VM.RETURN:
			results.push("RETURN")
			break
		case VM.EXT_LAZY_VAR:
			results.push("EXT_LAZY_VAR")
			break
		case VM.EXT_STRICT_VAR:
			results.push("EXT_STRICT_VAR")
			break
		case VM.EXT_CALL:
			results.push("EXT_CALL ", comp.code[i++])
			break
		case VM.USE_PRIM:
			results.push("USE_PRIM ", typeof comp.code[i] == 'string' ? "(String) " : "(int) ", comp.code[i++])
			break
		case VM.BIND_PRIM:
			results.push("BIND_PRIM ", typeof comp.code[i] == 'string' ? "(String) " : "(int) ", comp.code[i++])
			break
		}
		results.push("</td></tr>")
	}
	results.push("</table><br><span>.</span>")
	displayResults(results.length && docMsg)
}
function resultCode(expr, res, index) {
	var prettyExpr = LC.pretty(expr)
	var subs = expr.format()
	var nosubs = expr.format(false, true)
	var lam = res.lambda
	var prettyRes = res

	if (lam) {
		prettyRes = "<span class='subs pretty'>" + LC.pretty(res) + "</span><span class='subs nopretty'>" + lam.format() + "</span><span class='nosubs nopretty'>" + lam.format(false, true) + "</span>" 
	}
    results.push("<div><b><span class='dollar'>$: </span>$", index, ":</b> <button onclick='editResult(\"" + subs.replace(/\\|&lambda;/g, '\\\\') + "\")'>Edit</button><button onclick='runReduce(LC.historyExprs[", index, "])'>Reduce</button><button onclick='compileVM(LC.historyExprs[" + index + "])'>VM</button>", (LC.isIOMonad(res) ? "<button onclick='step(LC.history["+index+"])'>Step</button>" : ""), "<span class='subs pretty'>", prettyExpr, "</span>", "<span class='subs nopretty'>", subs, "</span><span class='nosubs nopretty'>", nosubs, "</span>&nbsp;&nbsp;&nbsp;&nbsp;&rArr;&nbsp;&nbsp;&nbsp;&nbsp;", prettyRes, "<br><br></div>")
}
function formatExpr(label, expr) {
	results.push("<div><b>" + label + ":</b> " + formatSubexpr(expr) + "</div>")
}
function formatSubexpr(expr) {
	return "<span class='subs pretty'>" + expr.pretty() + "</span><span class='subs nopretty'>" + expr.format() + "</span><span class='nosubs nopretty'>" + expr.format(false, true) + "</span>"
}
function runReduce(expr) {
	var last

	formatExpr(" <a style='border: solid black 1px;font-family: monospace' onclick='toggleSteps(this)'>+</a> Reduce", expr, result)
	results.push("<div ", collapseInitial ? "class='hidden'" : "","></div>")
	if (results.length && docMsg) {
		docMsg = false
		result.innerHTML = ''
	}
	displayResults(results.length && docMsg)
	last = expr = expr.globalSub()
	var trace = result.lastElementChild
	formatExpr("Globals", expr)
	try {
		var success = LC.reduce(expr,
			function(exp) {formatExpr("Eta", last = exp)},
			function(exp) {formatExpr("Alpha", last = exp)},
			function(exp) {formatExpr("Beta", last = exp)}
		)
		trace.innerHTML += results.join('')
		results = []
		trace.previousElementSibling.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&rArr;&nbsp;&nbsp;&nbsp;&nbsp;" + (success ? formatSubexpr(last) : '<br><b>...</b>')
	} catch (err) {
		trace.previousElementSibling.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&rArr;&nbsp;&nbsp;&nbsp;&nbsp;" + '<b style="color: red">' + err + '</b>'
	}
	results.push("<br>")
	displayResults(results.length && docMsg)
	result.lastElementChild.scrollIntoView()
}
function runDeBruijn(expr) {
	var depth = 0
	var deb = expr.transform2({
		apply: function(funcF, argF) {
			var d = depth
			var func = funcF(this.func)
			var max = depth
			depth = d
			var arg = argF(this.arg)
			depth = max > depth ? max : depth
			return [func, arg]
		},
		lambda: function(lvarF, bodyF) {
			var newV = new LC.Variable("duh")
			var lvar = lvarF(newV)
			var body = bodyF(this.body)
			newV.name = String(depth)
			depth++
			return [lvar, body]
		},
	})
	results.push(expr.format(false), ', DeBruijn: <b>', deb.format(false, true), '</b><br>')
	displayResults(results.length && docMsg)
}
function toggleSteps(link) {
	var div = link.parentElement.parentElement.nextElementSibling

	if (div.className) {
		div.className = ''
		link.innerHTML = '+'
	} else {
		div.className = 'hidden'
		link.innerHTML = '-'
	}
}
function loaded() {
	LC.resultCode = resultCode
	def = document.getElementById("def")
	output = document.getElementById("output")
	code = document.getElementById("code")
	result = document.getElementById("result")
	LC.loadDefs(document.getElementById("initialDefs").innerHTML)
	displayOutput()
	displayResults()
	def.select()
}
function displayResults(clear) {
	if (results.length) {
		if (clear) {
			docMsg = false
			result.innerHTML = ''
		}
		result.innerHTML += results.join('')
		results = []
		result.lastElementChild.scrollIntoView()
	}
}
function input(event) {
	if (event.charCode == 13) {
		if (LC.evalLine(def.value)) {
			displayOutput()
		}
		displayResults(results.length && docMsg)
		def.value = ''
	}
}
function editFunc(name, expr) {
	def.value = name + ' = ' + expr
	def.select()
}
function editResult(str) {
	def.value = str
	def.select()
}
function puts(x) {
	if (x instanceof Array) x = VM.getExpr(x)
	alert('MESSAGE: ' + LC.pretty(x.lambda))
	return x
}
function putsl(x) {
	if (x instanceof Array) {
		alert('MESSAGE: ' + LC.pretty(VM.getExpr(x).original))
		return x
	} else {
		alert('MESSAGE: ' + LC.pretty(x().lambda))
		return x()
	}
}
function plus() {
	var tot = 0

//	this was for when unbound value were represented by functions
//	for (var i = 0; i < arguments.length; i++) tot += arguments[i].value
	for (var i = 0; i < arguments.length; i++) tot += arguments[i]
	return tot
}
VM.addFunc(puts)
VM.addFunc(putsl)
