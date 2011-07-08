/*
Copyright (C) 2011, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/

/*
a (\x . \y . x) (c d) e
-> a ()
-----------------------

[a,c,d,e,-]: UseVar(a), BindContext(L, -1, false), Memo, BindContext(C, -1, true), Memo, BindContext(vE, -1, true), Return
L[x](\x . \y . x): UseContext(L2, 0, false), Return
L2[x,-](\y . x)): VarStart, UseVar, Return
C[c,d,-](c d): BindContext(vC, -1, true), Memo, BindVar(vD, -1, true), Return
vE: free variable
vC: free variable
vD: free variable


(\x . x) 3

[3,-]((\x . x) 3): UseContext(L, 0, false), BindContext(v3, -1, true), Return
L[x](\x . x): VarStart, UseVar, Return


\x . \y . prim(plus, x, y)

L[x]: UseContext(L2, -1, false), Return
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

UseContext(addr, parent, apply) -- FP = new context(addr, parent, apply)
  addr: the address of the code for the context.  Free variables are represented with negative numbers
  parent: link the parent context; -1 => no parent, 0 => use context, 1 => use context.parent
  apply: true => this is an apply, false => this is a lambda
  FP = newContext(addr, parent, apply)

UseVar -- use var as result
  FP = VP.binding, VP = null
  if FP.isApply
    if FP.result, FP = FP.result
    else push(PC, CP, FP), CP = FP, PC = CP.addr

BindContext(size, addr, apply) -- bind current function to arg and reduce it, if apply = true, place a marker in the context binding
  if FP.result
    FP = FP.result
  else
    push(PC, CP, FP), FP[0] = newContext(size, addr, apply), CP = FP, PC = CP.addr

BindVar(n) -- bind current function to var and reduce it
  if FP.result
    BindVar: FP = FP.result, PC++ (because of following memoize)
  else
    BindVar: push(PC), push(CP), push(FP), FP[0] = CP[n], CP = FP, PC = CP.addr

Memo -- store result in function that just executed
  MP.result = FP

Return -- return from call
  MP = stack[sp--], CP = stack[sp--], PC = stack[sp--]

ExtPushResult -- pushes result onto stack for external call (strict evaluation)

ExtPushVar -- pushes variable onto stack for external call (lazy evaluation)

ExtCall(name) -- call primitive and return result
  FP = name(vars)

*/

/*
GC:
mark, sort, merge

use 2-power best fit (N sizes -- 1024 arguments seems like enough, so N is 10)

double-thread memory?
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
    var VAR_START = 3
    var NEXT_VAR = 4
    var USE_VAR = 5
    var MEMO = 6
    var RETURN = 7
    var EXT_PUSH_LAZY = 8
    var EXT_PUSH_STRICT = 9
    var EXT_CALL = 10

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
	var entry = env.debruijns[debruijn]

	if (!entry) {
	    name = prefix || ((expr instanceof LC.Apply ? "APPLY-" : "LAMBDA-") + expr.id)
	    entry = env.debruijns[debruijn] = env.addrs[env.code.length] = env.names[name] = new Entry(name, expr, env.code.length)
	}
	expr.cachedEntry = entry
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
	for (var i = 2; i < arguments.length; i++) {
	    cp = newContext(null, 0, false)
	    cp[CTX_BINDING] = arguments[i]
	}
	env = newEntries
	var code = env.code
	stack = [-1, null, null]
	pc = env.names[label].addr
	while (pc > -1) {
	    switch (code[pc++]) {
	    case VAR_START: vp = cp; break
	    case NEXT_VAR: vp = vp[CTX_PARENT];	break
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
		    if (fp[CTX_RESULT]) fp = fp[CTX_RESULT]
		    else {
			if (code[pc] != RETURN) stack.push(pc, cp, fp)
			jump()
		    }
		}
		break
	    case BIND_CONTEXT:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    pc += 3
		} else {
		    var addr = code[pc++]
		    var parentCount = code[pc++]
		    var apply = code[pc++]
		    fp[CTX_BINDING] = newContext(addr, parentCount, apply)
		    if (code[pc] != RETURN) stack.push(pc, cp, fp)
		    jump()
		}
		break
	    case BIND_VAR:
		if (fp[CTX_RESULT]) fp = fp[CTX_RESULT]
		else {
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
	    case RETURN: popRegs(); break
	    case EXT_PUSH_LAZY:	break
	    case EXT_PUSH_STRICT: break
	    case EXT_CALL: break
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
    function gen(expr, genAll, main, newEnv, parents) {
	env = newEnv || {debruijns: {}, addrs: {}, names: {}, code: []}
	var result = expr.gen([], parents, true, true, genAll)
	env.addrs[env.code.length] = env.names[main || "main"] = new Entry(main || "main", expr, env.code.length)
	env.code.push.apply(env.code, result.instructions)
	env.code.push(RETURN)
	return env
    }

    LC.Lambda.prototype.__proto__.gen = function(instructions, parents, top, gen, genAll) {
	gen = genAll || (gen && !this.cachedEntry)
	var bodyCode = this.body.gen([], cons(this, parents), true, gen, genAll)
	var bodyVars = remove(bodyCode.vars, this)
	var start = instructions.length == 0

	if (gen) {
	    addEntry(this)
	    env.code.push.apply(env.code, bodyCode.instructions)
	    env.code.push(RETURN)
	}
//	instructions.push(start ? USE_CONTEXT : BIND_CONTEXT, this.cachedEntry.addr, parents == null ? -1 : index(bodyCode.vars, this) ? 0 : 1, false)
	instructions.push(start ? USE_CONTEXT : BIND_CONTEXT, this.cachedEntry.addr, parents == null ? -1 : 0, false)
	if (!(top || start)) instructions.push(MEMO)
	return {instructions: instructions, vars: remove(bodyVars, this)}
    }

    LC.Apply.prototype.__proto__.gen = function(instructions, parents, top, gen, genAll) {
	var start = instructions.length == 0
	var funcCode = this.func.gen(instructions, parents, false, gen, genAll)
	var myVars
	var aCode

	if (this.arg instanceof LC.Apply) {
	    gen = genAll || (gen && !this.arg.cacheEntry)
	    aCode = this.arg.gen([], parents, true, gen, genAll)
	    if (gen) {
		addEntry(this.arg)
		env.code.push.apply(env.code, aCode.instructions)
		env.code.push(RETURN)
	    }
//	    instructions.push(BIND_CONTEXT, this.arg.cachedEntry.addr, aCode.vars == null || parents == null ? -1 : index(aCode.vars, parents.car) ? 0 : 1, true)
	    instructions.push(BIND_CONTEXT, this.arg.cachedEntry.addr, aCode.vars == null || parents == null ? -1 : 0, true)
	    if (!top) instructions.push(MEMO)
	} else {
	    aCode = this.arg.gen(instructions, parents, top, gen, genAll)
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