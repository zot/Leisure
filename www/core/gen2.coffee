# Leisure functions are Array objects: [parent, value]
# They understand the method call(arg)

class LeisureFunc extends Array
  constructor: (array)-> array.__proto__ = LeisureFunc.prototype
  call: (arg)-> @

# cons a b = \f . f a b

class cons1 extends LeisureFunc
  constructor: ->
  call: (arg)-> cons2 [@, arg]
  arity: 2

class cons2 extends LeisureFunc
  constructor: (array)-> array.__proto__ = cons2.prototype
  call: (arg)-> lambda1 [@, arg]
  arity: 1

class anon1 extends LeisureFunc
  constructor: (array)-> array.__proto__ = anon1.prototype
  call: (f)-> f rz(@[0][1]) rz(@[1])
  arity: 1

# + a b = <prim>

class plus1 extends LeisureFunc
  constructor: ->
  call: (a)-> plus2 [@, a]
  arity: 2

class plus2 extends LeisureFunc
  constructor: ->
  call: (b)-> rz(@[1]) + rz(b)
  arity: 1
