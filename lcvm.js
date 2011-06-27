/*
a (\x . \y . x) (c d) e
-> a ()
-----------------------

[a,c,d,e,-]: UseVar(a), BindContext(0, L, -1), Memo, BindContext(0, C, -1), Memo, BindVarTail(e)
L[x](\x . \y . x): UseContext(1, L2), Return
L2[x,-](\y . x)): UseVar(x), Memo, Return
C[c,d,-](c d): UseVar(c), Memo, BindVarTail(d)


(\x . x) 3

[3,-]((\x . x) 3): UseContext(0, L, -1), BindVarTail(3)
L[x](\x . x): UseVar(x), Memo, Return


\x . \y . prim(plus, x, y)

L[x]: UseContext(1, L2), Return
L2[y]: PushStrict(1), PushStrict(0), UsePrim(plus), Return



Instructions requiring a following Memo: BindContext, BindVar, UseVar

Registers
  PC: program counter
  SP: stack pointer
  CP: closure pointer
  FP: function pointer
  MP: memo pointer


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

BindLambdaContext(size, addr)/BindApplyContext/BindLambdaContextTail/BindApplyContextTail -- bind current function to arg and reduce it
  if FP.result
    Bind*Context: FP = FP.result, PC++ (because of following memoize)
    Bind*ContextTail: FP = FP.result, pop(MP), pop(CP), pop(PC) (result + return)
  else
    Bind*Context: push(PC), push(CP), push(FP), FP[0] = newContext(size, addr), CP = FP, PC = CP.addr
    Bind*ContextTail: FP[0] = newContext(size, addr), CP = FP, PC = CP.addr

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
    // indices for env
    var env = {
	debruijns: {},	// by debruijn string
	addrs: {},	// by code offset
	names: {},	// by code label
	code: [],
    }
    var stack = []
    var pc = 0
    var cp = null
    var fp = null
    var mp = null
    var vp = null

    //OPCODES
    var BIND_LAMBDA_CONTEXT = 0
    var BIND_APPLY_CONTEXT = 1
    var BIND_VAR = 2
    var BIND_LAMBDA_CONTEXT_TAIL = 3
    var BIND_APPLY_CONTEXT_TAIL = 4
    var BIND_VAR_TAIL = 5
    var USE_LAMBDA_CONTEXT = 6
    var USE_APPLY_CONTEXT = 7
    var USE_VAR = 8
    var MEMO = 9
    var RETURN = 10
    var EXT_PUSH_LAZY = 11
    var EXT_PUSH_STRICT = 12
    var EXT_CALL = 13
    var VAR_START = 14
    var NEXT_VAR = 15

    //CONTEXT ACCESS
    var CTX_ADDR = 0	// code address
    var CTX_PARENT = 1	// parent context
    var CTX_RESULT = 2	// for memo
    var CTX_BINDING = 3	// bound value

    // imports
    var Cons = LC.Cons
    var cons = LC.cons
    var index = LC.index

    function Entry(name, expr, addr) {
	this.name = name
	this.expr = expr
	this.addr = addr
    }

    function addEntry(expr, prefix) {
	var debruijn = expr.dformat()

	entry = env.debruijns[debruijn]
	if (!entry) {
	    name = prefix || ((expr instanceof LC.Apply ? "APPLY-" : "LAMBDA-") + expr.id)
	    entry = env.debruijns[debruijn] = env.addrs[env.code.length] = env.names[name] = new Entry(name, expr, env.code.length)
	    expr.cachedEntry = entry
	}
	return entry
    }

    function newContext(size, addr, parentCount) {
	var parent = parentCount == -1 ? null : parentCount = 0 ? cp : cp[CTX_PARENT]

	return size == 2 ? [addr, parent, null] : [addr, parent, null, null]
    }

    function isApply(ctx) {return ctx.length == 3}

    function jump() {
	cp = fp
	pp = cp[CTX_PARENT]
	pc = cp[CTX_ADDR]
    }

    function popRegs() {
	mp = stack.pop()
	cp = stack.pop()
	pc = stack.pop()
    }

    function execute(label, newEntries) {
	fp = null
	mp = null
	cp = null
	env = newEntries
	var code = env.code
	stack = [-1, null, null]
	pc = env.names[label].addr
	while (pc > -1) {
	    switch (code[pc++]) {
	    case VAR_START:
		vp = cp;
		break;
	    case NEXT_VAR:
		vp = vp[CTX_PARENT]
		break;
	    case USE_LAMBDA_CONTEXT:
		var addr = code[pc++]
		var size = code[pc++]
		fp = newContext(size, addr, code[pc++])
		break;
	    case USE_APPLY_CONTEXT:
		var addr = code[pc++]
		var size = code[pc++]
		fp = newContext(size, addr, code[pc++])
		break;
	    case USE_VAR:
		fp = vp[CTX_BINDING]
		vp = null
		if (isApply(fp)) {
		    if (fp[CTX_RESULT]) {
			fp = fp[CTX_RESULT]
		    } else {
			stack.push(pc, cp, fp)
			jump()
		    }
		}
		break
	    case BIND_LAMBDA_CONTEXT:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    pc++
		} else {
		    var addr = code[pc++]
		    var size = code[pc++]
		    stack.push(pc, cp, fp)
		    fp[CTX_BINDING] = newContext(size, addr, code[pc++])
		    jump()
		}
		break
	    case BIND_APPLY_CONTEXT:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    pc++
		} else {
		    var addr = code[pc++]
		    var size = code[pc++]
		    stack.push(pc, cp, fp)
		    fp[CTX_BINDING] = newContext(size, addr, code[pc++])
		    jump()
		}
		break
	    case BIND_LAMBDA_CONTEXT_TAIL:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    popRegs()
		} else {
		    var addr = code[pc++]
		    var size = code[pc++]
		    fp[CTX_BINDING] = newContext(size, addr, code[pc++])
		    jump()
		}
		break
	    case BIND_APPLY_CONTEXT_TAIL:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    popRegs()
		} else {
		    var addr = code[pc++]
		    var size = code[pc++]
		    fp[CTX_BINDING] = newContext(size, addr, code[pc++])
		    jump()
		}
		break
	    case BIND_VAR:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		} else {
		    stack.push(pc, cp, fp)
		    fp[CTX_BINDING] = vp[CTX_BINDING]
		    jump()
		}
		vp = null
		break
	    case BIND_VAR_TAIL:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    popRegs()
		} else {
		    fp[CTX_BINDING] = vp[CTX_BINDING]
		    jump()
		}
		vp = null
		break
	    case MEMO:
		mp[CTX_RESULT] = fp
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

    function nth(list, index) {return index ? nth(list.cdr, index - 1) : list.car}

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

    // this assumes expr is a debruijn expression
    function gen(expr) {
	env = {debruijns: {}, addrs: {}, names: {}, code: []}
	var result = expr.gen([], null, true, true)
	env.addrs[env.code.length] = env.names["main"] = new Entry("main", expr, env.code.length)
	env.code.push.apply(env.code, result.instructions)
	return env
    }

    LC.Lambda.prototype.__proto__.gen = function(instructions, parents, top, gen) {
	gen = gen && !this.cachedEntry
	var bodyCode = this.body.gen([], cons(this, parents), true, gen)
	var bodyVars = remove(bodyCode.vars, this)
	var start = instructions.length == 0

	if (gen) {
	    addEntry(this)
	    env.code.push.apply(env.code, bodyCode.instructions)
	}
	instructions.push(start ? USE_LAMBDA_CONTEXT : top ? BIND_LAMBDA_CONTEXT_TAIL : BIND_CONTEXT, this.cachedEntry.addr, length(bodyVars) + 1, parents == null ? -1 : index(bodyCode.vars, this) ? 0 : 1)
	if (!(top || start)) instructions.push(MEMO)
	if (start && top) instructions.push(RETURN)
	return {instructions: instructions, vars: remove(bodyVars, this)}
    }

    LC.Apply.prototype.__proto__.gen = function(instructions, parents, top, gen) {
	var start = instructions.length == 0
	var funcCode = this.func.gen(instructions, parents, false, gen)
	var myVars
	var aCode

	if (this.arg instanceof LC.Apply) {
	    gen = gen && !this.arg.cacheEntry
	    aCode = this.arg.gen([], [], true, gen)
	    if (gen) {
		addEntry(this.arg)
		env.code.push.apply(env.code, aCode.instructions)
	    }
	    instructions.push(top ? BIND_APPLY_CONTEXT_TAIL : BIND_APPLY_CONTEXT, this.arg.cachedEntry.addr, length(aCode.vars), aCode.vars == null || parents == null ? -1 : index(aCode.vars, parents.car) ? 0 : 1)
	    if (!top) instructions.push(MEMO)
	} else {
	    aCode = this.arg.gen(instructions, parents, top, gen)
	}
	return {instructions: instructions, vars: merge(funcCode.vars, aCode.vars)}
    }

    LC.Variable.prototype.__proto__.gen = function(instructions, parents, top) {
	var start = instructions.length == 0

	if (this.free) {
	    instructions.push(start ? USE_APPLY_CONTEXT : top ? BIND_APPLY_CONTEXT_TAIL : BIND_APPLY_CONTEXT, -this.id, 0, -1)
	    //source[-this.id] = this
	} else {
	    instructions.push(VAR_START)
	    for (var i = 0; i < this.num; i++) instructions.push(NEXT_VAR)
	    instructions.push(instructions.length == 0 ? USE_VAR : top ? BIND_VAR_TAIL : BIND_VAR)
	}
	if (!(top || start)) instructions.push(MEMO)
	if (start && top) instructions.push(RETURN)
	return {instructions: instructions, vars: this.free ? null : cons(nth(parents, this.num), null)}
    }

    var obj = {
	gen: gen,
	execute: execute,
	BIND_LAMBDA_CONTEXT: BIND_LAMBDA_CONTEXT,
	BIND_APPLY_CONTEXT: BIND_APPLY_CONTEXT,
	BIND_VAR: BIND_VAR,
	BIND_LAMBDA_CONTEXT_TAIL: BIND_LAMBDA_CONTEXT_TAIL,
	BIND_APPLY_CONTEXT_TAIL: BIND_APPLY_CONTEXT_TAIL,
	BIND_VAR_TAIL: BIND_VAR_TAIL,
	USE_LAMBDA_CONTEXT: USE_LAMBDA_CONTEXT,
	USE_APPLY_CONTEXT: USE_APPLY_CONTEXT,
	USE_VAR: USE_VAR,
	MEMO: MEMO,
	RETURN: RETURN,
	EXT_PUSH_LAZY: EXT_PUSH_LAZY,
	EXT_PUSH_STRICT: EXT_PUSH_STRICT,
	EXT_CALL: EXT_CALL,
	VAR_START: VAR_START,
	NEXT_VAR: NEXT_VAR,
	CTX_ADDR: CTX_ADDR,
	CTX_PARENT: CTX_PARENT,
	CTX_RESULT: CTX_RESULT,
	CTX_BINDING: CTX_BINDING,
    }

    return obj
})()