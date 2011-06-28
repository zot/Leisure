var stdout = process.stdout

function out() {
    for (var i = 0; i < arguments.length; i++) {
	stdout.write(arguments[i])
    }
}

function resultCode(expr, res, index) {
    var oldEx = expr

    expr = expr.globalSub().debruijn()
    var comp = VM.gen(expr)
    comp.expr = oldEx
    for (var i = 0; i < comp.code.length; ) {
	var entry = comp.addrs[i]

	out((entry ? entry.name : '') + "\t" + i + '\t')
	switch(comp.code[i++]) {
	case VM.VAR_START:
	    out("VAR_START")
	    break;
	case VM.NEXT_VAR:
	    out("NEXT_VAR")
	    break;
	case VM.USE_LAMBDA_CONTEXT:
	case VM.USE_APPLY_CONTEXT:
	    var inst = comp.code[i - 1]
	    var addr = comp.code[i++]
	    var size = comp.code[i++]
	    var label = addr >= 0 ? comp.addrs[addr].name : "VAR(" + LC.lambdas[-addr].name + ")"
	    out("USE_", inst == VM.USE_LAMBDA_CONTEXT ? "LAMBDA" : "APPLY", "_CONTEXT ", label, " ", size, " ", comp.code[i++])
	    break
	case VM.USE_VAR:
	    out("USE_VAR ")
	    break
	case VM.BIND_LAMBDA_CONTEXT:
	case VM.BIND_APPLY_CONTEXT:
	    var inst = comp.code[i - 1]
	    var addr = comp.code[i++]
	    var size = comp.code[i++]
	    var label = addr >= 0 ? comp.addrs[addr].name : "VAR(" + LC.lambdas[-addr].name + ")"
	    out("BIND_", inst == VM.BIND_LAMBDA_CONTEXT ? "LAMBDA" : "APPLY", "_CONTEXT ", label, " ", size, " ", comp.code[i++])
	    break
	case VM.BIND_LAMBDA_CONTEXT_TAIL:
	case VM.BIND_APPLY_CONTEXT_TAIL:
	    var inst = comp.code[i - 1]
	    var addr = comp.code[i++]
	    var size = comp.code[i++]
	    var label = addr >= 0 ? comp.addrs[addr].name : "VAR(" + LC.lambdas[-addr].name + ")"
	    out("BIND_", inst == VM.BIND_LAMBDA_CONTEXT ? "LAMBDA" : "APPLY", "_CONTEXT_TAIL ", label, " ", size, " ", comp.code[i++])
	    break
	case VM.BIND_VAR:
	    out("BIND_VAR ")
	    break
	case VM.BIND_VAR_TAIL:
	    out("BIND_VAR_TAIL ")
	    break
	case VM.MEMO:
	    out("MEMO")
	    break
	case VM.RETURN:
	    out("RETURN")
	    break
	case VM.EXT_PUSH_LAZY:
	    out("EXT_PUSH_LAZY ", comp.code[i++])
	    break
	case VM.EXT_PUSH_STRICT:
	    out("EXT_PUSH_STRICT ", comp.code[i++])
	    break
	case VM.EXT_CALL:
	    out("EXT_CALL ", comp.code[i++])
	    break
	}
	out('\n')
    }
}
    
var data = ''
var stdin = process.openStdin();

LC.resultCode = resultCode

stdin.on('data', function(d) {
    var str = data + d
    var lines = str.split('\n')

    if (str[str.length - 1] != '\n') {
	data = lines[lines.length - 1]
	for (var i = 0; i < lines.length - 1; i++) {
	    if (lines[i]) line(lines[i])
	}
    } else {
	data = ''
	for (var i = 0; i < lines.length; i++) {
	    if (lines[i]) line(lines[i])
	}
    }
})

process.stdin.on('end', function() {
    process.exit()
})

function line(l) {
    LC.evalLine(l)
}
