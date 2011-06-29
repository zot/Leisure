/*
a (\x . \y . x) (c d) e
-> a ()
-----------------------

[a,c,d,e,-]: UseVar(a), BindContext(0, L, -1), Memo, BindContext(0, C, -1), Memo, BindVar(e), Return
L[x](\x . \y . x): UseContext(1, L2), Return
L2[x,-](\y . x)): UseVar(x), Memo, Return
C[c,d,-](c d): UseVar(c), Memo, BindVar(d), Return


(\x . x) 3

[3,-]((\x . x) 3): UseContext(0, L, -1), BindVar(3), Return
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

BindLambdaContext(size, addr)/BindApplyContext/BindLambdaContext/BindApplyContext -- bind current function to arg and reduce it
  if FP.result
    Bind*Context: FP = FP.result, PC++ (because of following memoize)
  else
    Bind*Context: push(PC), push(CP), push(FP), FP[0] = newContext(size, addr), CP = FP, PC = CP.addr

BindVar(n) -- bind current function to var and reduce it
  if FP.result
    BindVar: FP = FP.result, PC++ (because of following memoize)
  else
    BindVar: push(PC), push(CP), push(FP), FP[0] = CP[n], CP = FP, PC = CP.addr

Memo -- store result in function that just executed
  MP.result = FP

Return -- return from call
  MP = stack[sp--], CP = stack[sp--], PC = stack[sp--]

ExtCall(name) -- call primitive and use result as new function
  FP = name(vars)


=== TODO ===

* Put flag in context to indicate if it's ever bound to a variable
  Contexts which are never bound may be able to be collected quickly

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
    var BIND_CONTEXT = 0
    var BIND_VAR = 1
    var USE_CONTEXT = 2
    var USE_VAR = 3
    var MEMO = 4
    var RETURN = 5
    var EXT_PUSH_LAZY = 6
    var EXT_PUSH_STRICT = 7
    var EXT_CALL = 8
    var VAR_START = 9
    var NEXT_VAR = 10

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

    function newContext(addr, parentCount, isApply) {
	return [addr, parentCount == -1 ? null : parentCount == 0 ? cp : cp[CTX_PARENT], null, isApply ? -1 : null]
    }

    function isApply(ctx) {return ctx[3] == -1}

    function jump() {
	cp = fp
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
	    case USE_CONTEXT: {
		var addr = code[pc++]
		var parent = code[pc++]
		var apply = code[pc++]
		fp = newContext(addr, parent, apply)
		break;
	    }
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
	    case BIND_CONTEXT:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    if (code[pc + 3] == RETURN) {
			popRegs()
		    } else {
			pc += 3
		    }
		} else {
		    var addr = code[pc++]
		    var parentCount = code[pc++]
		    var apply = code[pc++]
		    if (code[pc] != RETURN) stack.push(pc, cp, fp)
		    fp[CTX_BINDING] = newContext(addr, parentCount, apply)
		    jump()
		}
		break
	    case BIND_VAR:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    if (code[pc] == RETURN) {
			popRegs()
		    }
		} else {
		    if (code[pc] != RETURN) stack.push(pc, cp, fp)
		    fp[CTX_BINDING] = vp[CTX_BINDING]
		    jump()
		}
		vp = null
		break
	    case MEMO:
		mp[CTX_RESULT] = fp
		mp = null
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


    var stackSize = 1024 * 256 // 256k elements of 3 pointers each

    function toLLVM(entries) {
	var out = [
	    "%ctx = type {i32, %ctx*, %ctx, %ctx}\n",
	    "%sf = type {i32, %ctx*, %ctx*}\n",
	    "@addr = constant i32 0\n",
	    "@parent = constant i32 1\n",
	    "@result = constant i32 2\n",
	    "@binding = constant i32 3\n",
	    "@null = constant %ctx* 0\n",
	    "@apply = constant %ctx* -1\n",
	    "@cp = unnamed_addr alloca %ctx*\n",
	    "@vp = unnamed_addr alloca %ctx*\n",
	    "@fp = unnamed_addr alloca %ctx*\n",
	    "@mp = unnamed_addr alloca %ctx*\n",
	    "@sp = unnamed_addr alloca %sf*, i32 ", stackSize,"\n",

//*** are these really reused?

	    "\n; REUSED\n",
	    "USE_VAR_CheckFP:\n",
	    "; USE_VAR handling applies",
//	    if (fp[CTX_RESULT]) {
	    "%rfp = load %ctx** @fp\n",
	    "%rrfp = load %ctx* %ffp\n",
	    "%rres = extractvalue %ctx %rrfp, @result\n",
	    "%has = icmp ctx* %rres, ctx* @null\n",
	    "br i1 %has, %USE_VAR_Result, %USE_VAR_JSR\n",

	    "\nUSE_VAR_Result:\n",
//		fp = fp[CTX_RESULT]
//		// duplication here -- maybe LLVM will save fp[CTX_RESULT] in a register?
	    "%rfp = load %ctx** @fp\n",
	    "%rrfp = load %ctx* %ffp\n",
	    "%rres = extractvalue %ctx %rrfp, @result\n",
	    "store %ctx* %rres, %ctx** @fp\n",
	    "br %Start\n",

	    "\nUSE_VAR_JSR:\n",
	    "",

	    "\nJSR:\n",
//	    } else {
//		stack.push(cp, fp)
//		jump()
//	    }
	    "%sp = load %ctx** @sp\n",
	    "%spPC = * %sp\n",
	    "%",

	    "\n; START\n",
	    "Start:",
	]
	var code = entries.code

	for (var pc = 0; pc < code.length; pc++) {
	    var entry = entries.addrs[pc]

	    if (entry) {
		out.push(entry.name, ": ")
	    }
	    switch (code[pc++]) {
	    case VAR_START:
//		vp = cp;
		out.push(
		    "VAR_START\n",
		    "%tmp_cp = load %ctx** @cp\n",
		    "store %ctx* %tmp_cp, %ctx** @vp\n"
		)
		break;
	    case NEXT_VAR:
//		vp = vp[CTX_PARENT]
		out.push(
		    "NEXT_VAR\n",
		    "%tmp1 = load %ctx** @vp\n",
		    "%tmp2 = extractvalue %ctx* %tmp1, @parent\n",
		    "store %ctx* %tmp2, %ctx** @vp\n"
		)
		break;
	    case USE_CONTEXT:
		var addr = entries.addrs[code[pc++]].name
		var parent = code[pc++]
		var isApply = code[pc++]
//		fp = newContext(addr, parent, isApply)
		out.push(
		    "; USE_CONTEXT ", addr, ", ", parent, "\n",
		    "%ct = call %ctx* @newContext(%", addr, ", ", parent, ", ", isApply ? "%apply" : "%null", ")\n",
		    "store %ctx* %ct, %ctx** @fp\n"
		)
		break;
	    case USE_VAR:
//		fp = vp[CTX_BINDING]
//		vp = null
//		if (isApply(fp)) {
//		    if (fp[CTX_RESULT]) {
//			fp = fp[CTX_RESULT]
//		    } else {
//			stack.push(pc, cp, fp)
//			jump()
//		    }
//		}
		out.push(
		    "; USE_VAR\n",
		    "%rvp = load %ctx** @vp\n",
		    "%rrvp = load %ctx* %fvp\n",
		    "%rbin = extractvalue %ctx %rrvp, @binding\n",
		    "store %ctx* %rbin, %ctx** @fp\n",
		    "store %ctx* 0, %ctx** @vp\n",
		    "%rrbin = load %ctx* %rbin\n",
		    "%nextBnd = extractvalue %ctx rrbin, @binding\n",
		    "%isApply = icmp eq %ctx* %apply, %ctx* %nextBnd\n",
		    "br i1 %isApply, %USE_VAR_CheckFP, %Start\n"
		)
		break
	    case BIND_CONTEXT:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    if (code[pc] == RETURN) popRegs()
		    else pc++
		} else {
		    var addr = code[pc++]
		    var size = code[pc++]
		    var parentCount = code[pc++]
		    if (code[pc] != RETURN) stack.push(pc, cp, fp)
		    fp[CTX_BINDING] = newContext(size, addr, parentCount)
		    jump()
		}
		break
	    case BIND_VAR:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    if (code[pc] == RETURN) popRegs()
		} else {
		    if (code[pc] != RETURN) stack.push(pc, cp, fp)
		    fp[CTX_BINDING] = vp[CTX_BINDING]
		    jump()
		}
		vp = null
		break
	    case MEMO:
		mp[CTX_RESULT] = fp
		mp = null
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
	env.code.push(RETURN)
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
	    env.code.push(RETURN)
	}
	instructions.push(start ? USE_CONTEXT : BIND_CONTEXT, this.cachedEntry.addr, parents == null ? -1 : index(bodyCode.vars, this) ? 0 : 1, false)
	if (!(top || start)) instructions.push(MEMO)
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
		env.code.push(RETURN)
	    }
	    instructions.push(BIND_CONTEXT, this.arg.cachedEntry.addr, aCode.vars == null || parents == null ? -1 : index(aCode.vars, parents.car) ? 0 : 1, true)
	    if (!top) instructions.push(MEMO)
	} else {
	    aCode = this.arg.gen(instructions, parents, top, gen)
	}
	return {instructions: instructions, vars: merge(funcCode.vars, aCode.vars)}
    }

    LC.Variable.prototype.__proto__.gen = function(instructions, parents, top) {
	var start = instructions.length == 0

	if (this.free) {
	    instructions.push(start ? USE_CONTEXT : BIND_CONTEXT, -this.id, -1, true)
	    env.addrs[-this.id] = new Entry(this.dformat(), this, -this.id)
	    //source[-this.id] = this
	} else {
	    instructions.push(VAR_START)
	    for (var i = 0; i < this.num; i++) instructions.push(NEXT_VAR)
	    instructions.push(start ? USE_VAR : BIND_VAR)
	}
	if (!(top || start)) instructions.push(MEMO)
	return {instructions: instructions, vars: this.free ? null : cons(nth(parents, this.num), null)}
    }

    var obj = {
	gen: gen,
	execute: execute,
	BIND_CONTEXT: BIND_CONTEXT,
	BIND_VAR: BIND_VAR,
	USE_CONTEXT: USE_CONTEXT,
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