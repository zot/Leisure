###
# New code generation example
#
# explicitly create argument structure
# for printing partial application
# and for dual stack traces
#
# instead of reflectively retrieving arguments array
###

root = module.exports

rz = global.resolve = (value)->
  if typeof value == 'function'
    if typeof value.memo != 'undefined' then value.memo
    else
      if value.creationStack then value.creationStack = null
      if value.args then value.args = null
      value.memo = value()
  else value

# Leisure functions are objects: {arg: value, "__parent__": parent}
# They understand the method call(arg)
#
# Test with arrays, too: [a, parent]
class LeisureFunc
  call: (arg)-> @

# cons
# cons a b = \f . f a b
cons =
  __proto__: LeisureFunc.prototype
  call: (a)-> new cons2 a, @
  arity: 2

class cons2 extends LeisureFunc
  constructor: (@a)->
  call: (b)-> new lambda1 b, @
  arity: 1

class lambda1 extends LeisureFunc
  constructor: (@b, @__parent__)->
  call: (f)-> rz(f).call(@__parent__.a).call(@b)
  arity: 1

# head
# head l = l \f a b . a
head =
  __proto__: LeisureFunc.prototype
  call: (l)-> rz(l).call lambda2
  arity: 1

lambda2 =
  __proto__: LeisureFunc.prototype
  call: (a)-> new lambda3 a, @
  arity: 1

class lambda3 extends LeisureFunc
  constructor: (@a)->
  call: (b)-> rz @a
  arity: 1

# plus
# + a b = <prim>
plus =
  __proto__: LeisureFunc.prototype
  call: (a)-> new plus2 a, @
  arity: 2

class plus2 extends LeisureFunc
  constructor: (@a)->
  call: (b)-> rz(@a) + rz(b)
  arity: 1

console.log "1 + 2 = #{plus.call(1).call(2)}"
console.log "head (cons 1 2): #{head.call(-> cons.call(1).call(2))}"
