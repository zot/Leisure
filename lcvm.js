/*
a (\x . \y . x) (c d) e
-----------------------

[a,c,d,e,-]: UseVar(a), BindContext(0, L, false), Memo, BindContext(0, C, true), Memo, BindVarTail(e)

L[x](\x . \y . x): UseContext(1, L2), Return
L2[x,-](\y . x)): UseVar(x), Return
C[c,d,-](c d): Inherit(c), Inherit(d), UseVar(c), BindVarTail(d)


(\x . x) 3

[3,-]((\x . x) 3): Inherit(3), UseContext(0, L), BindVarTail(3)
L[x](\x . x): UseVar(x), Memo, Return


\x . \y . prim(plus)

L[x]: UseContext(1, L2), Return
L2[y]: UsePrim(plus), Return



Instructions requiring a following Memo: BindContext, BindVar, UseVar

Registers
  PC: program counter
  CP: closure pointer
  FP: function pointer
  CS: new closure slot number (used by Inherit)
  MP: memo pointer
  SP: stack pointer


Stack
  [PC1, CP1, MP1 (FP at call-time, MP at return-time), ...]
  Execution ends when PC < 0, so the stack starts as: [-1, null, null]
  Free variables are contexts with -1 for the address, so they cause code to end
  When code ends, if MP == null, it was successful and the result is in FP
  If MP != null, that means a variable was executed and it is in MP

Contexts
  result: result of computation (stored by memo instruction)
  addr: the address of the code body -- free variables are contexts with -1 as the address
  isApply: true if it's an apply, false if it's a lambda
  parent: parent context
  0: lambda variable
  1-N: variables from parent contexts


Instructions

UseContext(size, addr) -- FP = new context(size, addr)

UseVar(n) -- use var as function
  FP = CP[n], MP = 0
  if FP.isApply
    if FP.result, FP = FP.result
    else push(PC), push(CP), push(FP), CP = FP, PC = CP.addr

UsePrimitive(name) -- call primitive and use result as new function
  FP = name(vars)

Inherit(n) -- copy var n into the new closure
  CP[CS++] = CP.parent[n]

BindContext(size, addr, apply)/BindContextTail -- bind current function to arg and reduce it
  if FP.result
    BindContext: FP = FP.result, PC++ (because of following memoize)
    BindContextTail: FP = FP.result, pop(MP), pop(CP), pop(PC) (result + return)
  else
    BindContext: push(PC), push(CP), push(FP), FP[0] = newContext(size, addr), CP = FP, PC = CP.addr
    BindContextTail: FP[0] = newContext(size, addr), CP = FP, PC = CP.addr

BindVar(n)/BindVarTail(n) -- bind current function to var and reduce it
  if FP.result
    BindVar: FP = FP.result, PC++ (because of following memoize)
    BindVarTail: FP = FP.result, pop(MP), pop(CP), pop(PC) (result + return)
  else
    BindVar: push(PC), push(CP), push(FP), FP[0] = CP[n], CP = FP, PC = CP.addr
    BindVarTail: FP[0] = CP[n], CP = FP, PC = CP.addr

Memo -- store result in function that just executed
  MP.result = FP

Return -- return from call
  MP = stack[sp--], CP = stack[sp--], PC = stack[sp--]


=== TODO ===

* Put flag in context to indicate if it's ever bound to a variable
  Contexts which are never bound may be able to be collected quickly

* Potential optimization -- add PP register, InheritParent and DerefParent

\1 . \2 . \3 . 1

L1[1]: UseContext(-1, L2), return
L2[2]: UseContext(1, L3), return
L3[1, 3]: InheritParent, DerefParent, Inherit(0), Deref, UseVar(1), Return

*/


VM = (function(){
    var code = []
    var labels = {}	// label -> code offset
    var addrs = {}	// addr -> label, for decoding functions
    var stack = []
    var pc = 0
    var cp = null
    var fp = null
    var cs = 0
    var mp = null

    //OPCODES
    var INHERIT = 1
    var BIND_CONTEXT = 2
    var BIND_CONTEXT_TAIL = 3
    var USE_CONTEXT = 4
    var BIND_VAR = 5
    var BIND_VAR_TAIL = 6
    var USE_VAR = 7
    var USE_PRIM = 8
    var MEMO = 9
    var RETURN = 10

    function addLabel(name) {
	labels[name] = code.length
	addrs[code.length] = name
    }
    function addCode() { // addCode(instr, arg ...)
	code.push.apply(code, arguments)
    }

    function Context(size, addr) {
	this.addr = addr
	this.parent = cp
    }

    function execute(label) {
	var len = code.length

	stack = [-1, null, null]
	pc = labels[label]
	while (pc > -1) {
	    switch (code[pc++]) {
	    case USE_CONTEXT:
		var size = code[pc++]
		var addr = code[pc++]
		fp = new Context(size, addr, code[pc++])
		break;
	    case USE_VAR:
		fp = cp[code[pc++]]
		if (fp.isApply) {
		    if (fp.result) {
			fp = fp.result
		    } else {
			stack.push(pc, cp, fp)
			cp = fp
			pc = cp.addr
		    }
		}
		break
	    case USE_PRIM:
		fp = code[pc++].apply(null, cp)
		break
	    case INHERIT:
		cp[cs++] = cp.parent[code[pc++]]
		break
	    case BIND_CONTEXT:
		if (fp.result) {
		    fp = fp.result
		    pc++
		} else {
		    var size = code[pc++]
		    var addr = code[pc++]
		    var apply = code[pc++]
		    stack.push(pc, cp, fp)
		    fp[0] = new Context(size, addr, apply)
		    cp = fp
		    pc = cp.addr
		}
		break
	    case BIND_CONTEXT_TAIL:
		if (fp.result) {
		    fp = fp.result
		    mp = stack.pop()
		    cp = stack.pop()
		    pc = stack.pop()
		} else {
		    var size = code[pc++]
		    var addr = code[pc++]
		    var apply = code[pc++]
		    fp[0] = new Context(size, addr, apply)
		    cp = fp
		    pc = cp.addr
		}
		break
	    case BIND_VAR:
		var varNum = code[pc++]
		if (fp.result) {
		    fp = fp.result
		} else {
		    push(pc, cp, fp)
		    fp[0] = cp[varNum]
		    cp = fp
		    pc = cp.addr
		}
		break
	    case BIND_VAR_TAIL:
		if (fp.result) {
		    fp = fp.result
		    mp = stack.pop()
		    cp = stack.pop()
		    pc = stack.pop()
		} else {
		    var varNum = code[pc++]
		    fp[0] = cp[varNum]
		    cp = fp
		    pc = cp.addr
		}
		break
	    case MEMO:
		MP.result = FP
		break
	    case RETURN:
		mp = stack.pop()
		cp = stack.pop()
		pc = stack.pop()
		break
	    }
	}
    }

    function Cons(a, b) {
	this.car = a
	this.cdr = b
    }

    function gen(expr) {
	obj.code = code = []
	obj.addrs = addrs = {}
	labels = {}
	var result = expr.gen([], null, true)
	addLabel("APPLY-" + expr.id)
	code.push.apply(code, result.instructions)
    }

    LC.Lambda.prototype.__proto__.gen = function(instructions, parents, top) {
	var bodyCode = this.body.gen([], new Cons(this, parents), true)

	addLabel("LAMBDA-" + this.id)
	if (!instructions.length) {
	    instructions.push(USE_CONTEXT, bodyCode.size + 1, code.length, false)
	} else {
	    instructions.push(top ? BIND_CONTEXT_TAIL : BIND_CONTEXT, bodyCode.size + 1, code.length, false)
	}
	code.push.apply(code, bodyCode.instructions)
	return {size: Math.max(0, bodyCode.size - 1), instructions: instructions}
    }

    function varNum(id, parents) {
	return id == parents.car.lvar.id ? 0 : 1 + varNum(id, parents.cdr)
    }

    LC.Variable.prototype.__proto__.gen = function(instructions, parents, top) {
	if (this.free) {
	    addLabel("FREE-VAR-" + this.id)
	    instructions.push(instructions.length ? BIND_CONTEXT : USE_CONTEXT, 0, -this.id, true)
	    return {size: 0, instructions: instructions}
	} else {
	    var vn = varNum(this.id, parents)

	    instructions.push(instructions.length == 0 ? USE_VAR : top ? BIND_VAR_TAIL : BIND_VAR, vn)
	    return {size: vn, instructions: instructions}
	}
    }

    LC.Apply.prototype.__proto__.gen = function(instructions, parents, top) {
	var funcCode = this.func.gen(instructions, parents, false)

	if (this.arg instanceof LC.Apply) {
	    var aCode = this.arg.gen([], parents, true)

	    addLabel("APPLY-" + this.arg.id)
	    instructions.push(top ? BIND_CONTEXT_TAIL : BIND_CONTEXT, aCode.size, code.length, true)
	    code.push.apply(code, aCode.instructions)
	} else {
	    var aCode = this.arg.gen(instructions, parents, top)

	    return {size: Math.max(funcCode.size, aCode.size), instructions: instructions}
	}
    }

    var obj = {
	gen: gen,
	code: code,
	addrs: addrs,
	INHERIT: INHERIT,
	BIND_CONTEXT: BIND_CONTEXT,
	BIND_CONTEXT_TAIL: BIND_CONTEXT_TAIL,
	USE_CONTEXT: USE_CONTEXT,
	BIND_VAR: BIND_VAR,
	BIND_VAR_TAIL: BIND_VAR_TAIL,
	USE_VAR: USE_VAR,
	USE_PRIM: USE_PRIM,
	MEMO: MEMO,
	RETURN: RETURN,
    }

    return obj
})()