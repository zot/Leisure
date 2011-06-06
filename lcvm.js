LC = (function(){
    var code = []
    var labels = {}	// label -> code offset
    var stack = []
    var vars = []
    var pc = 0
    var sp = 0
    var ct = null
    //OPCODES
    var APPLY = 0	// APPLY: TMP = bind(stack[sp], stack[sp - 1]), stack[sp - 1] =  ct, stack[sp] = pc + 1, pc = TMP[0], ct = TMP ([func, arg] get replaced with [ct, pc])
    var VAR = 1		// VAR, offset: stack.push(ct[offset])
    var GVAR = 2	// VAR, offset: stack.push(vars[offset])
    var LAMBDA = 3	// LAMBDA, addr: context(addr)
    var PRIMITIVE = 4	// PRIMITIVE, function
    var RETURN = 5	// RETURN: ct = stack[sp-2], stack[sp-2] = stack[sp], pc = stack[sp-1], sp -= 2

    function label(name) {labels[name] = code.length}

    function closure(addr, indices) {
	var cl = [addr]

	for (var i = 1; i <= indices.length; i++) {
	    cl.push(ct[indices[i]])
	}
	return cl
    }

    function execute(label) {
	var len = code.length

	stack = []
	stack.push(nil, -1)
	sp = 1
	pc = labels[label]
	while (pc > -1) {
	    switch (code[pc++]) {
	    case APPLY:     // APPLY: TMP = EXTEND(stack[sp], stack[sp - 1]), stack[sp - 1] =  ct, stack[sp] = pc + 1, pc = TMP[0], ct = TMP ([func, arg] get replaced with [ct, pc])
		var con = stack[sp]
		var tmp = con[con.length - 1] = stack[sp - 1]

		stack[sp] = pc
		stack[sp - 1] = ct
		pc = tmp[0]
		ct = tmp
		break
	    case VAR:       // VAR, offset: S.push(ct[offset])
		s[++sp] = ct[pc++]
		break
	    case GVAR:      // VAR, offset: S.push(vars[offset])
		s[++sp] = vars[pc++]
		break
	    case LAMBDA:
		var cl = [code[pc++]]

		for (var i = 1; i <= indices.length; i++) {
		    cl.push(ct[indices[i]])
		}
		s[++sp] = cl
		break
	    case PRIMITIVE:
		s[++sp] = code[pc++]()
		break
	    case RETURN:    // RETURN: ct = stack[sp-3], stack[sp-2] = stack[sp], pc = stack[sp-1], sp -= 2
		pc = stack[sp - 1]
		ct = stack[sp - 2]
		stack[sp - 2] = stack[sp]
		sp -= 2
		break
	    }
	}
    }

    return {
    }
})()