/*
a (\x . \y . x) (c d) e
-----------------------

[a,c,d,e,-]: UseVar(a), BindContext(0, L, false), Memo, BindContext(0, C, true), Memo, BindVarTail(e)

L[x](\x . \y . x): UseContext(1, L2), Return
L2[x,-](\y . x)): UseVar(x), Return
C[c,d,-](c d): ClearCs, Inherit(c), Inherit(d), UseVar(c), BindVarTail(d)


(\x . x) 3

[3,-]((\x . x) 3): ClearCs, Inherit(3), UseContext(0, L), BindVarTail(3)
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

ClearCs -- set context slot register to 1 for inherit to use
  CS = 1

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
    var source = {}	// addr -> expr, for decoding functions
    var stack = []
    var pc = 0
    var cp = null
    var fp = null
    var cs = 0
    var mp = null

    //OPCODES
    var CLEAR_CS = 0
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

    function addLabel(name, expr) {
	labels[name] = code.length
	addrs[code.length] = name
	source[code.length] = expr
    }
    function addCode() { // addCode(instr, arg ...)
	code.push.apply(code, arguments)
    }

    function Context(size, addr) {
	this.addr = addr
	this.parent = cp
    }

    function execute(label, comp) {
	labels = comp.labels
	addrs = comp.addrs
	code = comp.code
	source = comp.source
	stack = [-1, null, null]
	pc = labels[label]
	while (pc > -1) {
	    switch (code[pc++]) {
	    case USE_CONTEXT:
		var addr = code[pc++]
		var size = code[pc++]
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
	    case CLEAR_CS:
		cs = 1
		break
	    case INHERIT:
		cp[cs++] = cp.parent[code[pc++]]
		break
	    case BIND_CONTEXT:
		if (fp.result) {
		    fp = fp.result
		    pc++
		} else {
		    var addr = code[pc++]
		    var size = code[pc++]
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
		    var addr = code[pc++]
		    var size = code[pc++]
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
		mp.result = fp
		break
	    case RETURN:
		mp = stack.pop()
		cp = stack.pop()
		pc = stack.pop()
		break
	    }
	}
	return {mp: mp, fp: fp}
    }

    function cons(a, b) {return {car: a, cdr: b}}

    function index(list, element) {
	return list == null ? -1 : list.car == element ? 0 : 1 + index(list.cdr, element)
    }

    function contains(list, element) {return index(list, element) + 1}

    function remove(list, el) {
	if (list == null) return null
	var result = remove(list.cdr, el)
	return list.car == el? result : list.cdr == result ? list : cons (list.car, result)
    }

    function length(list) {
	return list == null ? 0 : 1 + length(list.cdr)
    }

    function reverse(list, res) {
	return list == null ? res : reverse(list.cdr, cons(list.car, res))
    }

    function merge(list1, list2) {
	return list1 == null ? list2 : merge(list1.cdr, index(list2, list1.car) == -1 ? cons(list1.car, list2) : list2)
    }

    function gen(expr) {
	obj.code = code = []
	obj.addrs = addrs = {}
	obj.source = source = {}
	labels = {}
	var result = expr.gen([], null, null, true)
	addLabel("APPLY-" + expr.id, expr)
	code.push.apply(code, result.instructions)
	return {expr: expr, code: code, addrs: addrs, source: source, labels: labels}
    }

    function inherit(vars, parentVars) {
	if (vars != null) {
	    code.push(CLEAR_CS)
	    genInherit(vars, parentVars)
	}
    }

    function genInherit(vars, parentVars) {
	if (vars != null) {
	    code.push(INHERIT, index(parentVars, vars.car))
	    genInherit(vars.cdr, parentVars)
	}
    }

    LC.Lambda.prototype.__proto__.gen = function(instructions, parent, vars, top) {
	var bodyCode = this.body.gen([], this.lvar, null, true)
	var bodyVars = remove(bodyCode.vars, this.lvar)
	var start = instructions.length == 0

	vars = merge(bodyVars, vars)
	addLabel("LAMBDA-" + this.id, this)
	instructions.push(start ? USE_CONTEXT : top ? BIND_CONTEXT_TAIL : BIND_CONTEXT, code.length, length(bodyVars) + 1, false)
	inherit(bodyVars, reverse(vars))
	code.push.apply(code, bodyCode.instructions)
	if (!(top || start)) instructions.push(MEMO)
	if (start && top) instructions.push(RETURN)
	return {instructions: instructions, vars: vars}
    }

    LC.Apply.prototype.__proto__.gen = function(instructions, parents, vars, top) {
	var start = instructions.length == 0
	var funcCode = this.func.gen(instructions, parent, vars, false)
	var aCode

	vars = merge(funcCode.vars, vars)
	if (this.arg instanceof LC.Apply) {
	    aCode = this.arg.gen([], null, null, true)
	    vars = merge(aCode.vars, vars)
	    addLabel("APPLY-" + this.arg.id, this.arg)
	    instructions.push(top ? BIND_CONTEXT_TAIL : BIND_CONTEXT, code.length, length(aCode.vars), true)
	    if (!top) instructions.push(MEMO)
	    inherit(aCode.vars, reverse(vars))
	    code.push.apply(code, aCode.instructions)
	} else {
	    aCode = this.arg.gen(instructions, parent, vars, top)
	    vars = aCode.vars
	}
	return {instructions: instructions, vars: vars}
    }

    LC.Variable.prototype.__proto__.gen = function(instructions, parent, vars, top) {
	var start = instructions.length == 0

	if (this.free) {
	    instructions.push(start ? USE_CONTEXT : top ? BIND_CONTEXT_TAIL : BIND_CONTEXT, -this.id, 0, true)
	    source[-this.id] = this
	} else {
	    var vn

	    if (parent == this) {
		vn = 0
	    } else {
		vn = index(reverse(vars), this) + 1
		if (!vn) {
		    vars = cons(this, vars)
		    vn = length(vars)
		}
	    }
	    instructions.push(instructions.length == 0 ? USE_VAR : top ? BIND_VAR_TAIL : BIND_VAR, vn)
	}
	if (!(top || start)) instructions.push(MEMO)
	if (start && top) instructions.push(RETURN)
	return {instructions: instructions, vars: vars}
    }

    var obj = {
	gen: gen,
	execute: execute,
	code: code,
	addrs: addrs,
	source: source,
	CLEAR_CS: CLEAR_CS,
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