LC = (function(){
    var code = []
    var labels = {}	// label -> code offset
    var stack = []
    var vars = []
    var pc = 0
    var sp = 0
    var ct = null
    var contexts = []	// free list for contexts
    //OPCODES
    var APPLY = 0	// APPLY: TMP = bind(stack[sp], stack[sp - 1]), stack[sp - 1] =  ct, stack[sp] = pc + 1, pc = TMP[0], ct = TMP ([func, arg] get replaced with [ct, pc])
    var VAR = 1		// VAR, offset: stack.push(ct[offset])
    var GVAR = 2	// VAR, offset: stack.push(vars[offset])
    var LAMBDA = 3	// LAMBDA, addr: context(addr), size
    var PRIMITIVE = 4	// PRIMITIVE, function
    var RETURN = 5	// RETURN: ct = stack[sp-2], stack[sp-2] = stack[sp], pc = stack[sp-1], sp -= 2

    //CONTEXT FLAGS
    var FREE_CONTEXT = 0
    var REFFED_CONTEXT = 1

    //DATA TYPES -- bottom 2 bits of a ref
    var CONTEXT = 0
    var PRIMITVE = 1
    var FREE_VARIABLE = 2

/*
context: [code addr | ctx flag, var ...]
code: ... index ... opcode ...
*/

    for (var i = 0; i < 256; i++) contexts[i] = []

    function label(name) {labels[name] = code.length}

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
	    case LAMBDA:   // LAMBDA, size, addr: context(addr)
		var size = code[pc++]
		var cl = contexts[size] || [] // if no context, make an array of size + 1, but in JS this is just []
		var addr = code[pc++]

		cl[0] = addr
		size-- // skip the first one, that will be supplied by a future apply
		while (size--) cl[size] = ct[code[addr - size] + 1] // copy relevant slots from current context
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