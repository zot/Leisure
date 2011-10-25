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

[a,c,d,e,-]: UseVar(a), BindContext("L", L, -1, false), Memo, BindContext("C", C, -1, true), Memo, BindContext("vE", vE, -1, true), Return
L[x](\x . \y . x): UseContext("L2", L2, 0, false), Return
L2[x,-](\y . x)): VarStart, UseVar, Return
C[c,d,-](c d): BindContext("vC", vC, -1, true), Memo, BindVar("vD", vD, -1, true), Return
vE: free variable
vC: free variable
vD: free variable


(\x . x) 3

[3,-]((\x . x) 3): UseContext("L", L, 0, false), BindContext("v3", v3, -1, true), Return
L[x](\x . x): VarStart, UseVar, Return


\x . \y . prim(plus, x, y)

L[x]: UseContext("L2", L2, -1, false), Return
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

UseContext(id, addr, parent, apply) -- FP = new context(addr, parent, apply)
  addr: the address of the code for the context.  Free variables are represented with negative numbers
  parent: link the parent context; -1 => no parent, 0 => use context, 1 => use context.parent
  apply: true => this is an apply, false => this is a lambda
  FP = newContext(id, addr, parent, apply)

UseVar -- use var as result
  FP = VP.binding, VP = null
  if FP.isApply
    if FP.result, FP = FP.result
    else push(PC, CP, FP), CP = FP, PC = CP.addr

BindContext(id, size, addr, apply) -- bind current function to arg and reduce it, if apply = true, place a marker in the context binding
  if FP.result
    FP = FP.result
  else
    push(PC, CP, FP), FP[0] = newContext(id, size, addr, apply), CP = FP, PC = CP.addr

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
    var EXT_LAZY_VAR = 8
    var EXT_STRICT_VAR = 9
    var EXT_CALL = 10
    var USE_PRIM = 11
    var BIND_PRIM = 12

    //CONTEXT ACCESS
    var CTX_NAME = 0	// code address
    var CTX_ADDR = 1	// code address
    var CTX_PARENT = 2	// parent context
    var CTX_RESULT = 3	// for memo
    var CTX_BINDING = 4	// bound value

    var CTP_LAMBDA = null
    var CTP_APPLY = -1
    var CTP_FREE_VAR = -2

    // imports
    var Cons = LC.Cons
    var cons = LC.cons
    var index = LC.index

    // external functions
    var extFuncs = {}

    function Entry(name, expr, addr) {
	this.name = name
	this.expr = expr
	this.addr = addr
    }

    function addEntry(expr, prefix) {
	var debruijn = expr.dformat()
	var entry = env.debruijns[debruijn]

	if (!entry) {
	    var original = LC.lambdas[expr.id]
	    name = (original &&  original.name != '' && original.name) || ((expr instanceof LC.Apply ? "A-" : "L-") + expr.id)
	    entry = env.debruijns[debruijn] = env.addrs[env.code.length] = env.names[name] = new Entry(name, expr, env.code.length)
	}
	expr.cachedEntry = entry
	return entry
    }

    function initContext(ctx) {
	ctx.toString = function() {return printContext(this)}
	return ctx
    }

    function newContextFromCode(code) {
	var name = code[pc++]
	var addr = code[pc++]
	var parentCount = code[pc++]
	var contextType = code[pc++]

	return initContext([name, addr, parentCount == -1 ? null : parentCount == 0 ? cp : cp[CTX_PARENT], null, contextType])
    }

    function isApply(ctx) {return ctx[CTX_BINDING] === CTP_APPLY}

    function jump() {
	/*if (code[pc] != RETURN)*/ stack.push(pc, cp, fp)
	cp = fp
	pc = cp[CTX_ADDR]
    }

    function popRegs() {
	mp = stack.pop()
	cp = stack.pop()
	pc = stack.pop()
    }

    var steps

    function execute(label, newEntries) {
	steps = 0
	fp = null
	mp = null
	cp = null
	primArgs = []
	for (var i = 2; i < arguments.length; i++) {
	    cp = initContext([null, null, null, arguments[i], CTP_LAMBDA])
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
		fp = newContextFromCode(code)
		break
	    }
	    case USE_PRIM:
		fp = code[pc++]
		break
	    case USE_VAR:
		fp = vp[CTX_BINDING]
		vp = null
		if (isApply(fp)) {
		    if (fp[CTX_RESULT]) fp = fp[CTX_RESULT]
		    else jump()
		}
		break
	    case BIND_CONTEXT:
		if (fp[CTX_RESULT]) {
		    fp = fp[CTX_RESULT]
		    pc += 4
		} else {
		    fp[CTX_BINDING] = newContextFromCode(code)
		    jump()
		}
		break
	    case BIND_VAR:
		if (fp[CTX_RESULT]) fp = fp[CTX_RESULT]
		else {
		    fp[CTX_BINDING] = vp[CTX_BINDING]
		    jump()
		}
		vp = null
		break
	    case BIND_PRIM:
		fp[CTX_BINDING] = code[pc++]
		jump()
		break
	    case MEMO:
		mp[CTX_RESULT] = fp
		mp = null
		break
	    case RETURN: popRegs(); break
	    case EXT_LAZY_VAR:
		primArgs.push(vp[CTX_BINDING])
		vp = null
		break
	    case EXT_STRICT_VAR:
		fp = vp[CTX_BINDING]
		vp = null
		if (isApply(fp)) {
		    if (fp[CTX_RESULT]) fp = fp[CTX_RESULT]
		    else jump()
		}
		primArgs.push(fp)
		break
	    case EXT_CALL:
		extFuncs[code[pc++]].apply(null, primArgs)
		break
	    }
	    steps++
	}
	return {mp: mp, fp: fp}
    }


    var stackSize = 1024 * 256 // 256k elements of 3 pointers each

    function storeContextFromCode(newCon, env, code, line, nextNum, pc) {
	var name = code[pc++]
	var addr = code[pc++]
	var parentCount = code[pc++]
	var contextType = code[pc++]

	if (parentCount == -1) {
	    line('store %ctx <{i32 ', name << 2, ', i32 ptrtoint (%func* @', env.addrs[addr].name, ' to i32), i32 0, i32 0, i32 0}>, %ctx* ', newCon)
	} else if (parentCount == 0) {
	    var cpn = '%cp' + nextNum

	    line(cpn, 'int = ptrtoint %ctx* %cp to i32')
	    line('store %ctx <{i32 ', name << 2, ', i32 ptrtoint (%func* @', env.addrs[addr].name, ' to i32), i32 ', cpn , 'int, i32 0, i32 0}>, %ctx* ', newCon)
	} else {
	    var parentCtx = '%pctx' + nextNum

	    line(parentCtx, 'raw = getelementptr %ctx* %cp, i32 0, i32 ', CTX_PARENT, '; CTX_PARENT')
	    line(parentCtx, ' = load %ctx* ', parentCtx, 'raw')
	    line(parentCtx, 'int = ptrtoint %ctx* ', parentCtx, ' to i32')
	    line('store %ctx <{i32 ', name << 2, ', i32 ptrtoint (%func* @', env.addrs[addr].name, ' to i32), i32 ', parentCtx , 'int, i32 0, i32 0}>, %ctx* ', newCon)
	}
	return [nextNum, pc]
    }

    function toLLVM(env) {
	var nl = '\n'
	var tab = '  '
	var out = [
	    [
		"; ModuleID = 'test-lam.ll'",
		'target datalayout = "e-p:32:32:32-i1:8:8-i8:8:8-i16:16:16-i32:32:32-i64:32:64-f32:32:32-f64:32:64-v64:64:64-v128:128:128-a0:0:64-f80:32:32-n8:16:32"',
		'target triple = "i386-pc-linux-gnu"\n',
		'%ctx = type <{i32, i32, i32, i32, i32}>',
		'%func = type i32 (%ctx*)\n',
		'',
	    ].join('\n'),
	    env.defs.join('\n'),
	    nl, nl,
	]
	var code = env.code
	var started = false
	var nextNum = 0
	var curV = ''
	var value = ''
	var prevV = ''
	var curT = ''
	var curC = ''
	var line = function() {
	    out.push(tab)
	    out.push.apply(out, arguments)
	    out.push(nl)
	}
	var nextString = 0
	var strings = {}
	var primArgs = []

	for (var pc = 0; pc < code.length; ) {
	    var entry = env.addrs[pc]

	    if (entry) {
		if (started) out.push('}\n')
		out.push('define i32 @', entry.name, "(%ctx* %cp) nounwind readnone {\n")
		started = true
		nextVar = 0
		prevV = ''
		curV = '%cp'
	    }
	    switch (code[pc++]) {
	    case VAR_START:
//		vp = cp;
		nextNum++
		prevV = curV
		curV = "%var" + nextNum
		line(curV, 'raw = getelementptr %ctx* ', prevV, ', i32 0, i32 ', CTX_BINDING, '; CTX_BINDING')
		line(curV, 'int = load i32* ', curV, 'raw')
		line(curV, ' = inttoptr i32 ', curV, 'int to %ctx*')
		break
	    case NEXT_VAR:
//		vp = vp[CTX_PARENT];
		break
	    case USE_CONTEXT: {
		//fp = newContextFromCode(code)
		nextNum++
		var newCon = '%con' + nextNum
		line(newCon, 'raw = alloca i8, i32 add(i32 2, i32 mul (i32 5, i32 4))')
		line(newCon, 'p = getelementptr i8* ', newCon, 'raw, i32 2')
		line(newCon, ' = bitcast i8* ', newCon, 'p to %ctx*')
		line(newCon, 'int = ptrtoint %ctx* ', newCon, ' to i32')
		storeRes = storeContextFromCode(newCon, env, code, line, nextNum, pc)
		nextNum = storeRes[0]
		pc = storeRes[1]
		break;
	    }
	    case USE_VAR:
//		fp = vp[CTX_BINDING]
//		vp = null
//		if (isApply(fp)) {
//		    if (fp[CTX_RESULT]) fp = fp[CTX_RESULT]
//		    else jump()
//		}
		var type = "%type" + nextNum
		var cond = "%cond" + nextNum
		var check = 'checkCtxt' + nextNum
		var isApply = 'isApply' + nextNum
		var notApply = 'notApply' + nextNum
		var useResult = 'useResult' + nextNum
		var jump = 'jump' + nextNum
		var result = '%result' + nextNum
		var addr = '%addr' + nextNum
		var res = '%res' + nextNum
		var start = 'start' + nextNum
		var done = 'done' + nextNum
		var varB = curV + 'B'
		var condB = cond + 'B'
		var condC = cond + 'C'
		var jumpRes = '%jumpRes' + nextNum
		var res = '%res' + nextNum
		line('br label %', start, '\n')
		out.push(start, ':\n')
		line(type, ' = and i32 ', curV, 'int, 3')
		line(cond, ' = icmp eq i32 ', type, ', 2')
		line('br i1 ', cond, ', label %', check, ', label %', done, '\n')
		out.push(check, ':\n')
		nextNum++
		line(varB, 'raw = getelementptr %ctx* ', curV, ', i32 0, i32 ', CTX_BINDING, '; CTX_BINDING')
		line(varB, 'int = load i32* ', varB, 'raw')
		line(condB, ' = icmp eq i32 ', varB, 'int, ', CTP_APPLY << 2, '; CTP_APPLY')
		line('br i1 ', condB, ', label %', isApply, ', label %', done, '\n')
		out.push(isApply, ':\n')
		nextNum++
		line(result, 'raw = getelementptr %ctx* ', curV, ', i32 0, i32 ', CTX_RESULT, '; CTX_RESULT')
		line(result, 'int = load i32* ', result, 'raw')
		line(condC, ' = icmp ne i32 ', result, 'int, 0')
		line('br i1 ', condC, ', label %', done, ', label %', jump, '\n')
		out.push(jump, ':\n')
		line(addr, 'raw = getelementptr %ctx* ', curV, ', i32 0, i32 ', CTX_ADDR, '; CTX_ADDR')
		line(addr, 'int = load i32* ', addr, 'raw')
		line(addr, ' = inttoptr i32 ', addr, 'int to %func*')
		line(jumpRes, ' = tail call cc 10 %func* ', addr, '(%ctx* ', curV, ')')
		line('br label %', done, '\n')
		out.push(done, ':\n')
		line(res, ' = phi i32 [', result, 'int, %', isApply, '], [', jumpRes, ', %', jump, '], [', curV, 'int, %', start, '], [', curV, 'int, %', check, ']')
		currentResult = res
		break
	    case USE_PRIM:
		var prim = code[pc++]

		currentResult = "%res" + nextNum
		if (typeof prim == 'string') {
		    var id = strings[prim]

		    if (!id) {
			id = "@.s" + (nextString++)
			strings[prim] = id
		    }
		    primArgs.push(id)
		    line(currentResult, ' = ptrtoint [', prim.length, ' x i8]* ', id, ' to i32')
		} else {
		    line(currentResult, ' = i32 ', prim)
		}
		nextNum++
		break
	    case BIND_CONTEXT:
//		if (fp[CTX_RESULT]) {
//		    fp = fp[CTX_RESULT]
//		    pc += 4
//		} else {
//		    fp[CTX_BINDING] = newContextFromCode(code)
//		    jump()
//		}
		break
	    case BIND_VAR:
//		if (fp[CTX_RESULT]) fp = fp[CTX_RESULT]
//		else {
//		    fp[CTX_BINDING] = vp[CTX_BINDING]
//		    jump()
//		}
//		vp = null
		break
	    case BIND_PRIM:
		break
	    case MEMO:
//		mp[CTX_RESULT] = fp
//		mp = null
		break
	    case RETURN:
//		popRegs();
//////////////////////////////
// ******** no currentResult
//toLLVM() at lcvm.js:501
//compileLLVM() at evaluator.html:108
//(anonymous function)() at evaluator.html:1
//onclick() at evaluator.html:2
//////////////////////////////
		line('ret i32 ', currentResult)
		break
	    case EXT_LAZY_VAR:
	    case EXT_STRICT_VAR:
	    case EXT_CALL:
		break
	    }
	}
	if (started) out.push('}\n')
	for (var i in strings) {
	    out.push(strings[i], ' = private constant [', i.length, ' xi8] c"', i, '\00", align 1\n')
	}
	return out.join('')
    }

    function contains(list, element) {return index(list, element) + 1}

    function nthCond(list, cond, index) {return !cond(list.car) || index > 0 ? nthCond(list.cdr, cond, cond(list.car) ? index - 1 : index) : list.car}

    function remove(list, el) {
	if (list === null) return null
	var result = remove(list.cdr, el)
	return list.car === el? result : list.cdr === result ? list : cons(list.car, result)
    }

    function length(list) {return list === null ? 0 : 1 + length(list.cdr)}

    function append(l1, l2) {return l1 ? cons(l1.car, append(l1.cdr, l2)) : l2}
    
    function removeAll(target, master) {return !master ? target : removeAll(remove(target, master.car), master.cdr)}

    // append list1 and list2, removing duplicates from list2
    function merge(list1, list2) {return append(list1, removeAll(list2, list1))}

    // this assumes expr is a debruijn expression
    function gen(expr, genAll, main, newEnv, parents) {
	env = newEnv || {debruijns: {}, addrs: {}, names: {}, code: []}
	var result = expr.gen([], parents || null, true, true, genAll)
	env.addrs[env.code.length] = env.names[main || "EXPR"] = new Entry(main || "EXPR", expr, env.code.length)
	env.code.push.apply(env.code, result.instructions)
	env.code.push(RETURN)
	return env
    }

    function hasLambda(parents) {return parents === null ? false : parents.car instanceof LC.Lambda ? true : hasLamda(parents.cdr)}

    LC.Lambda.prototype.__proto__.gen = function(instructions, parents, top, gen, genAll) {
	gen = genAll || (gen && !this.cachedEntry)
	var bodyCode = this.body.gen([], cons(this, parents), true, gen, genAll)
	var bodyVars = remove(bodyCode.vars, this)
	var start = instructions.length === 0

	if (gen) {
	    addEntry(this)
	    env.code.push.apply(env.code, bodyCode.instructions)
	    env.code.push(RETURN)
	}
//	instructions.push(start ? USE_CONTEXT : BIND_CONTEXT, this.original.id, this.cachedEntry.addr, parents == null ? -1 : index(bodyCode.vars, this) ? 0 : 1, false)
	instructions.push(start ? USE_CONTEXT : BIND_CONTEXT, this.original.id, this.cachedEntry.addr, hasLambda(parents) ? 0 : -1, CTP_LAMBDA)
	if (!(top || start)) instructions.push(MEMO)
	return {instructions: instructions, vars: remove(bodyVars, this)}
    }
    LC.Lambda.prototype.__proto__.primBind = function(lazy, instructions, parents, top, gen, genAll) {
	instructions.push(lazy ? EXT_LAZY_CONTEXT : EXT_STRICT_CONTEXT, this.original.id, this.cachedEntry.addr, hasLambda(parents) ? 0 : -1, CTP_APPLY)
	return {instructions: instructions, vars: null}
    }

    LC.Apply.prototype.__proto__.primBinds = function(lazy, instructions, parents, top, gen, genAll) {
	if (!(this.func instanceof LC.Variable)) {
	    var v1 = this.func.primBinds(lazy, instructions, parents, top, gen, genAll).vars
	    var v2 = this.arg.primBind(lazy, instructions, parents, top, gen, genAll).vars

	    return {instructions: instructions, vars: merge(v1, v2)}
	}
	return {instructions: instructions, vars: null}
    }
    LC.Apply.prototype.__proto__.primBind = function(lazy, instructions, parents, top, gen, genAll) {
	instructions.push(lazy ? EXT_LAZY_CONTEXT : EXT_STRICT_CONTEXT, this.original.id, this.cachedEntry.addr, 0, CTP_APPLY)
	return {instructions: instructions, vars: null}
    }
    LC.Apply.prototype.__proto__.primCall = function(instructions, parents, top, gen, genAll) {
	if (this.func instanceof LC.Variable) {
	    instructions.push(EXT_CALL, this.arg.name)
	} else {
	    this.func.primCall(instructions, parents, top, gen, genAll)
	}
    }
    LC.Apply.prototype.__proto__.genPrimitive = function(instructions, parents, top, gen, genAll) {
	var lazy = this.isPrimitive()[0] == '#lazy'
	var vars = this.primBinds(lazy, instructions, parents, top, gen, genAll).vars

	this.primCall(instructions, parents, top, gen, genAll)
	return {instructions: instructions, vars: vars}
    }
    LC.Apply.prototype.__proto__.gen = function(instructions, parents, top, gen, genAll) {
	if (this.isPrimitive()) {
	    return this.genPrimitive(instructions, parents, top, gen, genAll)
	}
	var start = instructions.length === 0
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
//	    instructions.push(BIND_CONTEXT, this.arg.original.id, this.arg.cachedEntry.addr, aCode.vars === null || parents === null ? -1 : index(aCode.vars, parents.car) ? 0 : 1, true)
	    instructions.push(BIND_CONTEXT, this.arg.original.id, this.arg.cachedEntry.addr, aCode.vars === null || !hasLambda(parents) ? -1 : 0, CTP_APPLY)
	    if (!top) instructions.push(MEMO)
	} else {
	    aCode = this.arg.gen(instructions, parents, top, gen, genAll)
	}
	return {instructions: instructions, vars: merge(funcCode.vars, aCode.vars)}
    }

    LC.Variable.prototype.__proto__.primBind = function(lazy, instructions, parents, top) {
	instructions.push(VAR_START)
	for (var i = 0; i < this.num; i++) {
	    instructions.push(NEXT_VAR)
	}
	instructions.push(lazy ? EXT_LAZY_VAR : EXT_STRICT_VAR)
	return {instructions: instructions, vars: this.free ? null : cons(nthCond(parents, function(el){return el instanceof LC.Lambda}, this.num), null)}
    }
    function primFor(name) {
	if (name.match(/^".*"$/) || name.match(/^'.*'$/)) return name.substring(1, name.length - 1)
	if (name.match(/^[0-9]+(.[[0-9]+)?(e[-+]?[0-9]+)?$/)) return Number(name)
	return "UNKNOWN(" + name + ")"
    }
    LC.Variable.prototype.__proto__.gen = function(instructions, parents, top) {
	var start = instructions.length === 0

	if (this.free) {
//	    instructions.push(start ? USE_CONTEXT : BIND_CONTEXT, this.id, -this.id, -1, CTP_FREE_VAR)
	    instructions.push(start ? USE_PRIM : BIND_PRIM, primFor(this.name))
	    env.addrs[-this.id] = new Entry(this.dformat(), this, -this.id)
	    //source[-this.id] = this
	} else {
	    instructions.push(VAR_START)
	    for (var i = 0; i < this.num; i++) {
		instructions.push(NEXT_VAR)
	    }
	    instructions.push(start ? USE_VAR : BIND_VAR)
	}
	if (!(top || start)) instructions.push(MEMO)
	return {instructions: instructions, vars: this.free ? null : cons(nthCond(parents, function(el){return el instanceof LC.Lambda}, this.num), null)}
    }

    function printContext(ctx, buf, inner, seen) {
	var workBuf = buf || []

	env.addrs[ctx[CTX_ADDR]].expr.printContext(ctx, workBuf, inner, seen || {})
	return buf ? null : workBuf.join('')
    }

    function checkNew(ctx, buf, seen, str) {
	if (seen[ctx[CTX_NAME]]) {
	    buf.push(str || '', ' ... ')
	    return false
	}
	seen[ctx[CTX_NAME]] = true
	return true
    }

    function fakeCtx(ctx, expr) {
	return initContext([expr.id, 1000000, ctx, null, null])
    }

    function printBody(lam, ctx, buf, seen) {
	if (checkNew(ctx, buf, seen, ' . ')) {
	    if (lam.body instanceof LC.Lambda) {
		buf.push(' ', lam.body.original ? lam.body.original.lvar.name : lam.body.lvar.name)
		printBody(lam.body, fakeCtx(ctx, lam.body), buf, seen)
	    } else {
		buf.push(' . ')
		lam.body.printContext(ctx, buf, false, seen)
	    }
	}
    }

    LC.Lambda.prototype.__proto__.printContext = function(ctx, buf, inner, seen) {
	if (inner) buf.push('(')
	buf.push('\u03BB')
	buf.push(this.original ? this.original.lvar.name : this.lvar.name)
	printBody(this, ctx, buf, seen)
	if (inner) buf.push(')')
    }

    LC.Apply.prototype.__proto__.printContext = function(ctx, buf, inner, seen) {
	if (checkNew(ctx, buf, seen)) {
	    this.func.printContext(this.func instanceof LC.Lambda ? fakeCtx(ctx, this.func) : ctx, buf, true, seen)
	    buf.push(' ')
	    if (this.arg instanceof LC.Apply) buf.push('(')
	    this.arg.printContext(this.arg instanceof LC.Lambda ? fakeCtx(ctx, this.arg) : ctx, buf, this.arg instanceof LC.Apply ? false : inner, seen)
	    if (this.arg instanceof LC.Apply) buf.push(')')
	}
    }

    function getValue(ctx, n) {
	return ctx === null ? null : ctx[CTX_BINDING] !== -1 && n === 0 ? ctx[CTX_BINDING] : getValue(ctx[CTX_PARENT], ctx[CTX_BINDING] !== -1 ? n - 1 : n)
    }

    LC.Variable.prototype.__proto__.printContext = function(ctx, buf, inner, seen) {
	if (this.free) {
	    buf.push('[', this.name, ']')
	} else {
	    var value = getValue(ctx, this.num)

	    if (!value) {
		buf.push(this.original ? this.original.name : this.num)
	    } else if (value[CTX_ADDR] < 0) {
		buf.push('[', LC.lambdas[-value[CTX_ADDR]].name, ']')
	    } else {
		printContext(value, value instanceof LC.Lambda ? fakeCtx(ctx, value) : ctx, buf, inner, seen)
	    }
	}
    }

    function addFunc(func) {extFuncs[func.name] = func}

    function getExpr(context) {return env.addrs[context[CTX_ADDR]].expr}

    function getEntry(n) {return env.addrs[n]}

    var obj = {
	gen: gen,
	execute: execute,
	toLLVM: toLLVM,
	printContext: printContext,
	BIND_CONTEXT: BIND_CONTEXT,
	BIND_VAR: BIND_VAR,
	USE_CONTEXT: USE_CONTEXT,
	USE_VAR: USE_VAR,
	MEMO: MEMO,
	RETURN: RETURN,
	EXT_LAZY_VAR: EXT_LAZY_VAR,
	EXT_STRICT_VAR: EXT_STRICT_VAR,
	EXT_CALL: EXT_CALL,
	USE_PRIM: USE_PRIM,
	BIND_PRIM: BIND_PRIM,
	VAR_START: VAR_START,
	NEXT_VAR: NEXT_VAR,
	CTX_ADDR: CTX_ADDR,
	CTX_PARENT: CTX_PARENT,
	CTX_RESULT: CTX_RESULT,
	CTX_BINDING: CTX_BINDING,
	addFunc: addFunc,
	getExpr: getExpr,
	getEntry: getEntry,
    }

    return obj
})()