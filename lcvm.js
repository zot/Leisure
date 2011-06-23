/*
a (\x . \y . x) (c d) e
-----------------------

[a,c,d,e,-]: SealContext, UseVar(a), BindContext(0, L, false), Memo, BindContext(0, C, true), Memo, BindVarTail(e)

L[x](\x . \y . x): SealContext, UseContext(1, L2), Return
L2[x,-](\y . x)): SealContext, UseVar(x), Return
C[c,d,-](c d): SetCs 0, Inherit(c), Inherit(d), SealContext, UseVar(c), BindVarTail(d)


(\x . x) 3

[3,-]((\x . x) 3): SetCs 1, Inherit(3), SealContext, UseContext(0, L), BindVarTail(3)
L[x](\x . x): SealContext, UseVar(x), Memo, Return


\x . \y . prim(plus)

L[x]: SealContext, UseContext(1, L2), Return
L2[y]: SealContext, UsePrim(plus), Return



Instructions requiring a following Memo: BindContext, BindVar, UseVar

Registers
  PC: program counter
  CP: closure pointer
  FP: function pointer
  PP: parent context (set by BindX, used by Inherit, cleared by UseX)
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

SetCs(n) -- set context slot register to n for inherit to use (n is either 1 or 0)
  CS = n

Inherit(n) -- copy var n into the new closure
  CP[CS++] = CP.parent[n]

SealContext -- finishes context initialization (removes ref to parent, etc.)
  PP.decRef()
  PP = null

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

ExtCall(name) -- call primitive and use result as new function
  FP = name(vars)


=== TODO ===

* Put flag in context to indicate if it's ever bound to a variable
  Contexts which are never bound may be able to be collected quickly

* Potential optimization -- add PP register, InheritParent and DerefParent

\1 . \2 . \3 . 1

L1[1]: UseContext(-1, L2), return
L2[2]: UseContext(1, L3), return
L3[1, 3]: InheritParent, DerefParent, Inherit(0), Deref, UseVar(1), Return

*/

/*
GC:
mark, sort, merge

use 2-power best fit (N sizes -- 1024 arguments seems like enough, so N is 10)

double-thread memory
*/

/*
FFI

Use stack to call function
push frame info
push args - either lazy or not
call foreign func
put return value in FP

*/

/*
change context rep to: [parent, addr, value] or [parent, addr]
*/


VM = (function(){
    var code = []
    var labelHash = {}
    var labels = {}	// label -> code offset
    var addrs = {}	// addr -> label, for decoding functions
    var source = {}	// addr -> expr, for decoding functions
    var stack = []
    var pc = 0
    var cp = null
    var fp = null
    var pp = null
    var cs = 0
    var mp = null

    //OPCODES
    var SET_CS = 0
    var INHERIT = 1
    var BIND_CONTEXT = 2
    var BIND_CONTEXT_TAIL = 3
    var USE_CONTEXT = 4
    var BIND_VAR = 5
    var BIND_VAR_TAIL = 6
    var USE_VAR = 7
    var MEMO = 8
    var RETURN = 9
    var SEAL_CONTEXT = 10
    var EXT_PUSH_LAZY = 11
    var EXT_PUSH_STRICT = 12
    var EXT_CALL = 13

    //GC
    var contexts = {}
    var freeContexts = []
    var _cn = 0

    // imports
    var Cons = LC.Cons
    var cons = LC.cons
    var index = LC.index

    for (var i = 0; i < 256; i++) freeContexts[i] = []

    function addLabel(name, expr) {
	labels[name] = code.length
	addrs[code.length] = name
	source[code.length] = expr
    }
    function addCode() { // addCode(instr, arg ...)
	code.push.apply(code, arguments)
    }

    function Context(size) {
	this.size = size
	this._id = _cn++
    }
    function newContext(size, addr, isApply) {
	var ctx = freeContexts[size].pop()

	if (!ctx) ctx = new Context(size)
	ctx.addr = addr
	ctx.parent = cp
	ctx.isApply = isApply
	return ctx
    }

    // produce a text representation of the complete context
    Context.prototype.format = function() {
	if (!this.isApply) {
	}
    }

    function jump() {
	cp = fp
	pp = cp.parent
	cp.parent = null
	pc = cp.addr
    }

    function popRegs() {
	mp = stack.pop()
	cp = stack.pop()
	pc = stack.pop()
    }

    function execute(label, comp) {
	fp = null
	mp = null
	cp = null
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
		fp = newContext(size, addr, code[pc++])
		break;
	    case USE_VAR:
		fp = cp[code[pc++]]
		if (fp.isApply) {
		    if (fp.result) {
			fp = fp.result
		    } else {
			stack.push(pc, cp, fp)
			jump()
		    }
		}
		break
	    case SET_CS:
		cs = code[pc++]
		cp.parent = null
		break
	    case INHERIT:
		cp[cs++] = pp[code[pc++]]
		cp.parent = null
		break
	    case SEAL_CONTEXT:
		pp = null
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
		    fp[0] = newContext(size, addr, apply)
		    jump()
		}
		break
	    case BIND_CONTEXT_TAIL:
		if (fp.result) {
		    fp = fp.result
		    popRegs()
		} else {
		    var addr = code[pc++]
		    var size = code[pc++]
		    var apply = code[pc++]
		    fp[0] = newContext(size, addr, apply)
		    jump()
		}
		break
	    case BIND_VAR:
		var varNum = code[pc++]
		if (fp.result) {
		    fp = fp.result
		} else {
		    stack.push(pc, cp, fp)
		    fp[0] = cp[varNum]
		    jump()
		}
		break
	    case BIND_VAR_TAIL:
		if (fp.result) {
		    fp = fp.result
		    popRegs()
		} else {
		    fp[0] = cp[code[pc++]]
		    jump()
		}
		break
	    case MEMO:
		mp.result = fp
		break
	    case RETURN:
		popRegs()
		break
	    case EXT_PUSH_LAZY:
		break
	    case EXT_PUSH_STRICT:
		break
	    case EXT_CALL:
		break
	    }
	}
	return {mp: mp, fp: fp}
    }

    function contains(list, element) {return index(list, element) + 1}

    function remove(list, el) {
	if (list == null) return null
	var result = remove(list.cdr, el)
	return list.car == el? result : list.cdr == result ? list : cons(list.car, result)
    }

    function length(list) {return list == null ? 0 : 1 + length(list.cdr)}

    function append(l1, l2) {return l1 ? cons(l1.car, append(l1.cdr, l2)) : l2}
    
    function removeAll(target, master) {return !master ? target : removeAll(remove(target, master.car), master.cdr)}

    // append list1 and list2, removing duplicates from list2
    function merge(list1, list2) {return append(list1, removeAll(list2, list1))}

    function gen(expr) {
	obj.code = code = []
	obj.addrs = addrs = {}
	obj.source = source = {}
	labels = {}
	var result = expr.gen([], null, true, true)
	addLabel("APPLY-" + expr.id, expr)
	code.push.apply(code, result.instructions)
	return {expr: expr, code: code, addrs: addrs, source: source, labels: labels}
    }

    function inherit(vars, n, parentVars) {
	if (vars != null) {
	    code.push(SET_CS, n)
	    genInherit(vars, parentVars)
	}
	code.push(SEAL_CONTEXT)
    }

    function genInherit(vars, parentVars) {
	if (vars != null) {
	    code.push(INHERIT, index(parentVars, vars.car))
	    genInherit(vars.cdr, parentVars)
	}
    }

    LC.Lambda.prototype.__proto__.label = function() {
	if (!this.cachedLabel) {
	    if (!this.containsFree()) {
		var key = this.hashKey()

		this.cachedLabel = labelHash[key]
		if (!this.cachedLabel) {
		    this.cachedLabel = labelHash[key] = "LAMBDA-" + this.id
		}
	    } else {
		this.cachedLabel = "LAMBDA-" + this.id
	    }
	}
	return this.cachedLabel
    }

    LC.Lambda.prototype.__proto__.containsFree = function(used) {return this.body.containsFree(cons(this.lvar, used))}

    LC.Lambda.prototype.__proto__.gen = function(instructions, vars, top, gen) {
	var label = this.label()
	gen = gen && !labels[label]
	var bodyCode = this.body.gen([], cons(this.lvar, null), true, gen)
	var bodyVars = remove(bodyCode.vars, this.lvar)
	var start = instructions.length == 0

	if (gen) {
	    addLabel(label, this)
	    inherit(bodyVars, 1, merge(vars, bodyVars))
	    code.push.apply(code, bodyCode.instructions)
	}
	instructions.push(start ? USE_CONTEXT : top ? BIND_CONTEXT_TAIL : BIND_CONTEXT, labels[label], length(bodyVars) + 1, false)
	if (!(top || start)) instructions.push(MEMO)
	if (start && top) instructions.push(RETURN)
	return {instructions: instructions, vars: bodyVars}
    }

    LC.Apply.prototype.__proto__.containsFree = function(used) {return this.func.containsFree(used) || this.arg.containsFree(used)}

    LC.Apply.prototype.__proto__.gen = function(instructions, vars, top, gen) {
	var start = instructions.length == 0
	var funcCode = this.func.gen(instructions, vars, false, gen)
	var myVars
	var aCode

	argVars = merge(vars, funcCode.vars)
	if (this.arg instanceof LC.Apply) {
	    var label = "APPLY-" + this.arg.id
	    gen = gen && !labels[label]
	    aCode = this.arg.gen([], [], true, gen)
	    myVars = merge(funcCode.vars, aCode.vars)
	    if (gen) {
		addLabel(label, this.arg)
		inherit(aCode.vars, 0, merge(argVars, aCode.vars))
		code.push.apply(code, aCode.instructions)
	    }
	    instructions.push(top ? BIND_CONTEXT_TAIL : BIND_CONTEXT, labels[label], length(aCode.vars), true)
	    if (!top) instructions.push(MEMO)
	} else {
	    aCode = this.arg.gen(instructions, argVars, top, gen)
	    myVars = merge(funcCode.vars, aCode.vars)
	}
	return {instructions: instructions, vars: myVars}
    }

    LC.Variable.prototype.__proto__.containsFree = function(used) {return index(used, this) == -1}

    LC.Variable.prototype.__proto__.gen = function(instructions, vars, top) {
	var start = instructions.length == 0

	if (this.free) {
	    instructions.push(start ? USE_CONTEXT : top ? BIND_CONTEXT_TAIL : BIND_CONTEXT, -this.id, 0, false)
	    source[-this.id] = this
	} else {
	    var vn = index(vars, this)

	    if (vn == -1) {
		vn = length(vars)
	    }
	    instructions.push(instructions.length == 0 ? USE_VAR : top ? BIND_VAR_TAIL : BIND_VAR, vn)
	}
	if (!(top || start)) instructions.push(MEMO)
	if (start && top) instructions.push(RETURN)
	return {instructions: instructions, vars: this.free ? null : cons(this, null)}
    }

    var obj = {
	gen: gen,
	execute: execute,
	code: code,
	addrs: addrs,
	source: source,
	SET_CS: SET_CS,
	INHERIT: INHERIT,
	BIND_CONTEXT: BIND_CONTEXT,
	BIND_CONTEXT_TAIL: BIND_CONTEXT_TAIL,
	USE_CONTEXT: USE_CONTEXT,
	BIND_VAR: BIND_VAR,
	BIND_VAR_TAIL: BIND_VAR_TAIL,
	USE_VAR: USE_VAR,
	MEMO: MEMO,
	RETURN: RETURN,
	SEAL_CONTEXT: SEAL_CONTEXT,
	EXT_PUSH_LAZY: EXT_PUSH_LAZY,
	EXT_PUSH_STRICT: EXT_PUSH_STRICT,
	EXT_CALL: EXT_CALL,
    }

    return obj
})()