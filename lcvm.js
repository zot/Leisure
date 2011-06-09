/*
a (\x y . x) (c d) e
--------------------

[a,c,d,e]: ResolveVar(a), NewContext(L, 0), BindContext, NewClosedContext(C, 0), BindContext, BindVar(e), Return

L[x]: NewClosedContext(L2, 1), Inherit(x), UseContext, Return
L2[x]: UseVar(x), Return
C[c,d]: UseVar(c), BindVar(d), Return

Registers
  PC: program counter
  CP: context pointer
  FP: function pointer
  CS: context slot number (used by Inherit)
  AP: arg pointer
  SP: stack pointer


Stack
[PC1, CP1, ...]


Instructions

NewContext(addr, inherit) -- AP = new context, CS = 0
  addr is address of code
  inherit is # of parent slots to allocate

NewClosedContext(addr, inherit) -- AP = new closed context, CS = 0
  addr is address of code
  inherit is # of parent slots to allocate
  this context has no value

Inherit(n) -- AP[CS++] = CP[n]
  n is the index of the slot to inherit

BindContext -- bind current function to arg and reduce it
  if FP unbound, FP[0] = AP
  stack[sp++] = PC, stack[sp++] = CP, CP = FP, PC = CP.addr

BindVar(n) -- bind current function to var and reduce it
  if FP unbound and var(n) is a context with a result, FP[0] = var(n).result
  else if FP unbound, FP[0] = var(n)
  stack[sp++] = PC, stack[sp++] = CP, CP = FP, PC = CP.addr

UseVar(n) -- use var as function
  if var(n) is a primitive value, a free variable, or an unbound context without a result, FP = var(n)
  if var(n) is a primitive call, FP = var(n)()
  if var(n) is a context with a result, FP = var(n).result
  if var(n) is a bound context without a result, stack[sp++] = PC, stack[sp++] = CP, CP = var(n), PC = CP.addr

UseContext -- FP = AP
  FP = AP

BindPrimitive(name) -- bind func to lazy prim call and reduce
  FP unbound, FP[0] = newPrimCall(name, CP)
  stack[sp++] = PC, stack[sp++] = CP, CP = FP, PC = CP.addr

UsePrimitive(name) -- call primitive and use result as new function
  FP = newPrimCall(name, CP)()

Return -- CP.value = FP, CP = stack[sp--], PC = stack[sp--]


Contexts

Context: [result, addr, val0, val1, ...]

*/


LC = (function(){
    var code = []
    var labels = {}	// label -> code offset
    var stack = []
    var pc = 0
    var cp = null
    var ncp = null
    var ncs = 0
    var sp = 0
    var contexts = []	// free list for contexts
    //OPCODES
    var NEW_CONTEXT = 0
    var NEW_CLOSED_CONTEXT = 1
    var INHERIT = 2
    var BIND_CONTEXT = 3
    var BIND_VAR = 4
    var USE_VAR = 5
    var USE_CONTEXT = 6
    var BIND_PRIM = 7
    var USE_PRIM = 7
    var RETURN = 8

    // primitive values are 31 bits
    // normal data is 28 bit addrs (aligned on 16 byte boundaries)

    //DATA TYPES -- bottom 3 bits of data
    var PRIMITVE = 0
    var CONTEXT = 1
    var FREE_VARIABLE = 3
    var PRIM_CALL = 5
    // nothing for value 7

    //REF FLAGS -- 4th bit of a non-primitive value
    var FREE = 0
    var REFFED = 8

/*
check out ptmalloc3 for the native compiler http://www.malloc.de/en/index.html

values:
primitive value: [type + value]
free variable value: [type + ref flag + id]
context value: [type + ref flag + addr] -> [bound?, code addr, var ...] -- if bound, apply throws away argument during apply
application value: [type + ref flag + addr] -> [0 or value, context addr, value] -- if value == 0, application is still needed



code: ... index ... opcode ... -- the compiler/linker should know how large index is
stack: [... ct pc value] or [... ct pc func arg]
apply: [... ct pc func arg] -> [... ct pc ct2 pc2] or [... ct pc value func arg] -> [... ct pc value ct2 pc2]
return: [... ct pc ct2 pc2 value] -> [... ct pc value] or [... ct pc value ct2 pc2 value] -> [... ct pc func arg]



example code:
t = \x y . x
f = \x y . y
and = \a b . a b a

main = and t (and t f)

--> (code is label: ops or label: [indices] ops. label can be name or name[drop], which is compiler info that indicates to use lambdacp instead of lambda)

t: RLAMBDA0(t2, 0) -- CP to throw y away
t2[drop]: RVAR(0) -- 0 because y was thrown away
f[drop]: RLAMBDA(f2, 0) -- 0 because it uses no parent vars
f2: RVAR(0)
and: RLAMBDA(and2, 1)
and2: [0] VAR(1), VAR(0), APPLY, VAR(1), TAPPLY
main: LAMBDACP(and), LAMBDACP(t), APPLY, LAMBDACP(main2), TAPPLY
main2: LAMBDACP(and), LAMBDACP(t), APPLY, LAMBDACP(f), TAPPLY

A bytecode verifier can ensure that TAPPLY and R-- opcodes only appear at the end of a code body
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
	    case NEW_CONTEXT:
	    case NEW_CLOSED_CONTEXT:
	    case INHERIT:
	    case BIND_CONTEXT:
	    case BIND_VAR:
	    case USE_VAR:
	    case USE_CONTEXT:
	    }
	}
    }

    return {
    }
})()