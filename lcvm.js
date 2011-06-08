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
    var APPLY = 0	// APPLY: TMP = bind(stack[sp - 1], stack[sp]), stack[sp] =  ct, stack[sp - 1] = pc + 1, pc = TMP[0], ct = TMP -- ([func, arg] -> [pc, ct] with new ct and pc)
    var APPLYN = 1	// APPLY(N): TMP = bind(stack[sp - N], stack[sp - N + 1], ...), stack[sp - N] =  ct, stack[sp - N + 1] = pc + 1, sp -= N - 2, pc = TMP[0], ct = TMP -- ([func, arg, arg, ...] -> [pc, ct] with new ct and pc)
    var TAPPLY = 2	// TAPPLY: ct = bind(stack[sp - 1], stack[sp]), sp -= 2, pc = ct[0] -- tail call apply ([ct, pc, func, arg] -> [ct, pc] with new ct and pc)
    var TAPPLYN = 2	// TAPPLY(N): ct = bind(stack[sp - N], stack[sp - N + 1], ...), sp -= N + 1, pc = ct[0] -- tail call apply ([ct, pc, func, arg] -> [ct, pc] with new ct and pc)
    var VAR = 4		// VAR(offset): stack[++sp] = ct[offset]
    var RVAR = 5	// RVAR(offset): pc = stack[sp - 1], stack[sp - 1] = ct[offset], ct = stack[sp - 1], sp-- -- return a variable
    var LAMBDA = 6	// LAMBDA(addr,size): stack.push(context(addr, size))
    var LAMBDACP = 7	// LAMBDACP(addr): stack.push(ct)
    var RLAMBDA = 8	// RLAMBDA(addr,size): pc = stack[sp - 1], stack[sp - 1] = context(addr, size), ct = stack[sp - 1], sp-- -- return a closure
    var RLAMBDACP = 9	// RLAMBDACP(addr): pc = stack[sp - 1], stack[sp - 1] = ct, ct = stack[sp - 1], sp-- -- return a closure
    var PRIMITIVE = 10	// PRIMITIVE(function): stack[++sp] = function()
    var RPRIMITIVE = 11	// RPRIMITIVE(function): pc = stack[sp - 1], stack[sp - 1] = function(), ct = stack[sp - 1], sp-- -- return a primitive

    //CONTEXT FLAGS
    var FREE_CONTEXT = 0
    var REFFED_CONTEXT = 1

    //DATA TYPES -- bottom 2 bits of a ref
    var CONTEXT = 0
    var PRIMITVE = 1
    var FREE_VARIABLE = 2

/*
context: [code addr | ctx flag, bound?, var ...] -- if bound, apply throws away the argument
code: ... index ... opcode ... -- the compiler/linker should know how large index is
stack: [... ct pc value] or [... ct pc func arg]
apply: [... ct pc func arg] -> [... ct pc ct2 pc2] or [... ct pc value func arg] -> [... ct pc value ct2 pc2]
return: [... ct pc ct2 pc2 value] -> [... ct pc value] or [... ct pc value ct2 pc2 value] -> [... ct pc func arg]

example code:
t = \x y . x
f = \x y . y
and = \a b . a b a

main = and t t

--> (code is label: ops or label: [indices] ops. label can be name or name[drop], which is compiler info that indicates to use lambdacp instead of lambda)

t: RLAMBDACP(t2) -- CP to throw y away
t2[drop]: RVAR(0) -- 0 because y was thrown away
f[drop]: RLAMBDA(f2, 0) -- 0 because it uses no parent vars
f2: RVAR(0)
and: RLAMBDA(and2, 1)
and2: [0] VAR(1), VAR(0), APPLY, VAR(1), TAPPLY
main: LAMBDA(and, 0), LAMBDA(t), APPLY, LAMBDA(t), TAPPLY
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
	    case APPLY:     // APPLY: TMP = bind(stack[sp - 1], stack[sp]), stack[sp] =  ct, stack[sp - 1] = pc + 1, pc = TMP[0], ct = TMP -- ([func, arg] -> [pc, ct] with new ct and pc)
		var con = stack[sp]
		var tmp = con[con.length - 1] = stack[sp - 1]

		stack[sp] = ct
		stack[sp - 1] = pc
		pc = tmp[0]
		ct = tmp
		break
	    case APPLYN:     // APPLY(N): TMP = bind(stack[sp - N], stack[sp - N + 1], ...), stack[sp - N] =  ct, stack[sp - N + 1] = pc + 1, sp -= N - 2, pc = TMP[0], ct = TMP -- ([func, arg, arg, ...] -> [pc, ct] with new ct and pc)
**
	    case TAPPLY:     // TAPPLY: ct = bind(stack[sp - 1], stack[sp]), sp -= 2, pc = ct[0] -- ([ct, pc, func, arg] -> [ct, pc] with new ct and pc)
**
	    case TAPPLYN:    // TAPPLY(N): ct = bind(stack[sp - N], stack[sp - N + 1], ...), sp -= N + 1, pc = ct[0] -- tail call apply ([ct, pc, func, arg] -> [ct, pc] with new ct and pc)
**
	    case VAR:       // VAR, offset: S.push(ct[offset])
		s[++sp] = ct[pc++]
		break
	    case RVAR:       // VAR(offset): pc = stack[sp - 1], stack[sp - 1] = ct[offset], ct = stack[sp - 1], sp--
**
	    case LAMBDA:   // LAMBDA, size, addr: context(addr)
		var size = code[pc++]
		var cl = contexts[size] || [] // if no context, make an array of size + 1, but in JS this is just []
		var addr = code[pc++]

		cl[0] = addr
		size-- // skip the first one, that will be supplied by a future apply
		while (size--) cl[size] = ct[code[addr - size] + 1] // copy relevant slots from current context
		s[++sp] = cl
		break
	    case LAMBDACP:   // LAMBDACP(addr): stack.push(ct)
**
	    case RLAMBDA:   // LAMBDA(addr,size): pc = stack[sp - 1], stack[sp - 1] = context(addr, size), ct = stack[sp - 1], sp--
**
	    case RLAMBDACP:   // LAMBDACP(addr): pc = stack[sp - 1], stack[sp - 1] = ct, ct = stack[sp - 1], sp--
**
	    case PRIMITIVE:   // PRIMITIVE(function): stack[++sp] = function()
**
	    case RPRIMITIVE:  // PRIMITIVE(function): pc = stack[sp - 1], stack[sp - 1] = function(), ct = stack[sp - 1], sp--
**
	    }
	}
    }

    return {
    }
})()