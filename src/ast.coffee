
###
Copyright (C) 2012, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

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
###

define ['./base', 'lib/lodash.min'], (base, _)->

  {
    resolve,
    lazy,
    nsLog,
  } = root = base
  
  rz = resolve
  lz = lazy
  lc = Leisure_call

######
###### naming
######

  charCodes =
    "'": '$a'
    ',': '$b'
    '$': '$$'
    '@': '$d'
    '?': '$e'
    '/': '$f'
    '*': '$g'
    '&': '$h'
    '^': '$i'
    '!': '$k'
    '`': '$l'
    '~': '$m'
    '-': '$_'
    '+': '$o'
    '=': '$p'
    '|': '$q'
    '[': '$r'
    ']': '$s'
    '{': '$t'
    '}': '$u'
    '"': '$v'
    ':': '$w'
    ';': '$x'
    '<': '$y'
    '>': '$z'
    '%': '$A'
    '.': '$B'
    '#': '$C'
    # ' ' is used for syntactically impossible characters, like gensyms
    ' ': '$S'
  
  nameSub = (name)->
    s = ''
    for i in [0...name.length]
      code = charCodes[name[i]]
      s += code ? name[i]
    s

######
###### definitions
######

  setDataType = (func, dataType)->
    if dataType then func.dataType = dataType
    func
  
  setType = (func, type)->
    if type then func.type = type
    func.__proto__ = (ensureLeisureClass type).prototype
    func

  class LeisureObject
  
  LeisureObject.prototype.__proto__ = Function.prototype
  LeisureObject.prototype.className = 'LeisureObject'
  
  if !global? && (typeof window != 'undefined') then window.global = window
  
  global.Leisure_Object = LeisureObject
  
  supertypes = {}
  
  root.leisureClassChange = 0
  
  ensureLeisureClass = (leisureClass)->
    cl = "Leisure_#{nameSub leisureClass}"
    if !global[cl]?
      global[cl] = eval "(function #{cl}(){})"
      supertypes[cl] = 'Leisure_Object'
      global[cl].prototype.__proto__ = LeisureObject.prototype
      root.leisureClassChange++
    global[cl]
  
  makeSuper = (type, supertype)->
    supertypes["Leisure_#{nameSub type}"] = "Leisure_#{nameSub supertype}"
    root.leisureClassChange++
  
  ensureLeisureClass 'cons'
  ensureLeisureClass 'nil'
  supertypes.Leisure_cons = 'Leisure_Object'
  supertypes.Leisure_nil = 'Leisure_Object'
  
  isNil = (obj)-> obj instanceof Leisure_nil

  ensureLeisureClass 'ast'
  ensureLeisureClass 'lit'
  Leisure_lit.prototype.toString = -> "lit(#{getLitVal @})"
  ensureLeisureClass 'ref'
  Leisure_ref.prototype.toString = -> "ref(#{getRefName @})"
  ensureLeisureClass 'lambda'
  Leisure_lambda.prototype.toString = -> "lambda(#{astString @})"
  ensureLeisureClass 'apply'
  Leisure_apply.prototype.toString = -> "apply(#{astString @})"
  ensureLeisureClass 'let'
  Leisure_let.prototype.toString = -> "let(#{astString @})"
  ensureLeisureClass 'anno'
  Leisure_anno.prototype.toString = -> "anno(#{astString @})"
  ensureLeisureClass 'doc'
  ensureLeisureClass 'srcLocation'
  ensureLeisureClass 'pattern'
  
  makeSuper 'lit', 'ast'
  makeSuper 'ref', 'ast'
  makeSuper 'lambda', 'ast'
  makeSuper 'apply', 'ast'
  makeSuper 'let', 'ast'
  makeSuper 'anno', 'ast'
  
  astString = (ast)->
    switch getType ast
      when 'lit' then getLitVal ast
      when 'ref' then getRefName ast
      when 'apply'
        funcStr = astString getApplyFunc ast
        if getType(getApplyFunc ast) in ['lambda', 'let'] then funcStr = "(#{funcStr})"
        argStr = astString getApplyArg ast
        if getType(getApplyArg ast) == 'apply' then argStr = "(#{argStr})"
        "#{funcStr} #{argStr}"
      when 'lambda' then "\\#{getLambdaVar ast} . #{astString getLambdaBody ast}"
      when 'let' then "\\\\#{letStr ast}"
      when 'anno' then "\\@#{getAnnoName ast} #{getAnnoData ast} . #{astString getAnnoBody ast}"
  
  letStr = (ast)->
    body = getLetBody ast
    binding = "(#{getLetName ast} = #{astString getLetValue ast})"
    if body instanceof Leisure_let then "#{binding} #{letStr body}"
    else "#{binding} . #{astString body}"

#########
######### LISTS
#########

  class Leisure_BaseCons extends LeisureObject
    head: -> throw new Error("Not Implemented")
    tail: -> throw new Error("Not Implemented")
    isNil: -> false
    find: (func)-> if func(@head()) then @head() else @tail().find(func)
    removeAll: (func)->
      t = @tail().removeAll(func)
      if func(@head()) then t else if t == @tail() then @ else cons(@head(), t)
    map: (func)-> cons func(@head()), @tail().map func
    foldl: (func, arg)-> @tail().foldl func, func(arg, @head())
    foldl1: (func)-> @tail().foldl func, @head()
    foldr: (func, arg)-> func @head(), @tail().foldr(func, arg)
    foldr1: (func)->
      if @tail() == Nil then @head()
      else func @head(), @tail().foldr1(func)
    toArray: -> @foldl ((i, el)-> i.push(el); i), []
    join: (str)->@toArray().join(str)
    intersperse: (item)-> cons @head(), @tail().foldr ((el, res)-> cons item, cons el, res), Nil
    reverse: -> @rev Nil
    rev: (result)-> @tail().rev cons(@head(), result)
    elementString: -> "#{if @head()?.constructor == @.constructor || @head() instanceof Leisure_nil then '[' + @head().elementString() + ']' else @head()}#{if @tail() instanceof Leisure_nil then '' else if @tail() instanceof Leisure_BaseCons then " #{@tail().elementString()}" else " | #{@tail()}"}"
    equals: (other)-> @ == other or (other instanceof Leisure_BaseCons and consEq(@head(), other.head()) and consEq(@tail(), other.tail()))
    each: (block)->
      block(@head())
      @tail().each(block)
    length: -> @foldl ((i, el)-> i + 1), 0
    last: ->
      t = @tail()
      if t == Nil then @head() else t.last()
    append: (l)->cons @head(), @tail().append(l)
    toString: -> "#{@stringName()}[#{@elementString()}]"
    stringName: -> "BaseCons"
  
  consEq = (a, b)-> a == b or (a instanceof Leisure_BaseCons and a.equals(b))

# cons and Nil are Leisure-based so that Leisure code can work with it transparently
# they look like ordinary JS classes, but the "instances" are actually functions
  class Leisure_cons extends Leisure_BaseCons
    head: -> @ ->(a)->(b)->rz a
    tail: -> @ ->(a)->(b)->rz b
    stringName: -> "Cons"
  
  global.Leisure_cons = Leisure_cons
  
  class Leisure_nil extends LeisureObject
    isNil: -> true
    find: -> @
    removeAll: -> @
    map: (func)-> Nil
    foldl: (func, arg)-> arg
    foldr: (func, arg)-> arg
    reverse: -> @
    rev: (result)-> result
    equals: (other)-> other instanceof Leisure_nil
    each: ->
    toArray: -> []
    join: -> ''
    append: (l)-> l
    toString: -> "Cons[]"
    elementString: -> ''
  
  global.Leisure_nil = Leisure_nil
  
  jsType = (v)->
    t = typeof v
    if t == 'object' then v.constructor || t
    else t
  
  mkProto = (protoFunc, value)->
    value.__proto__ = protoFunc.prototype
    value
  
  throwError = (msg)->
    throw (if msg instanceof Error then msg else new Error(String(msg)))
  
  checkType = (value, type)-> if !(value instanceof type) then throwError("Type error: expected type: #{type}, but got: #{jsType value}")
  
  primCons = setDataType(((a)->(b)-> mkProto Leisure_cons, setType ((f)-> rz(f)(a)(b)), 'cons'), 'cons')
  Nil = mkProto Leisure_nil, setDataType(setType(((a)->(b)->rz b), 'nil'), 'nil')
  cons = (a, b)-> primCons(lz a)(lz b)
  
  foldLeft = (func, val, thing)->
    if thing instanceof Leisure_cons then thing.foldl func, val
    else primFoldLeft func, val, thing, 0

  primFoldLeft = (func, val, array, index)->
    if index < array.length then primFoldLeft func, func(val, array[index]), array, index + 1
    else val
  
  global.leisureFuncs = {}
  global.leisureFuncNames = Nil
  leisureAddFunc = global.leisureAddFunc = (nm)-> global.leisureFuncNames = cons(nm, global.leisureFuncNames)
  root.evalFunc = evalFunc = eval
  
  root.functionCount = 0
  
  global.LeisureFunctionInfo = functionInfo = {}

# name a function on the first access
  nameFunc = (func, name)->
    f = null
    ->
      if f == null
        f = rz func
        if typeof f == 'function' then f.leisureName = name
        f
      else f
  
  global.LeisureNameSpaces =
    core: {}
    parser: {}

  isPartial = (args)-> args.callee.length != args.length

  partialCall = (args)-> Leisure_primCall args.callee, 0, args

# use AST, instead of arity?
  define = (name, func, arity, src, method, namespace, isNew) ->
    func.leisureName = name
    arity = arity ? ((typeof func == 'function' && func.length) || 0)
    nakedDefine name, lz(func), arity, src, method, namespace, isNew || (arity > 1)
  
  nakedDefine = (name, func, arity, src, method, namespace, isNew) ->
    #can't use func(), because it might do something or might fail
    #if typeof func() == 'function'
    #  func().src = src
    #  func().leisureContexts = []
    #  func().leisureName = name
    #  func().leisureArity = arity
    functionInfo[name] =
      src: src
      arity: arity
      leisureName: name
      alts: {}
      altList: []
    if isNew then functionInfo[name].newArity = true
    nm = 'L_' + nameSub(name)
    if !method and global.noredefs and global[nm]? then throwError("[DEF] Attempt to redefine definition: #{name}")
    #namedFunc = functionInfo[name].mainDef = global[nm] = global.leisureFuncs[nm] = nameFunc(func, name)
    namedFunc = functionInfo[name].mainDef = global[nm] = global.leisureFuncs[nm] = if typeof func == 'function' && func.memo
      func.leisureName = name
      func
    else nameFunc(func, name)
    if root.currentNameSpace
      LeisureNameSpaces[namespace ? root.currentNameSpace][nameSub(name)] = namedFunc
      nsLog "DEFINING #{name} FOR #{root.currentNameSpace}"
    leisureAddFunc name
    root.functionCount++
    func

######
###### ASTs
######

# Make an AST for these
# add node numder and source start and end into leisure structure
# make lit, ref, lambda, apply, let, and anno subclasses of AST
#
#   LET syntax: \\ (f a1 a2 = body1) (var = value) . expr
#
# let binds a name to a value in a body and uses two backslashes in a row
#   the body can be another let node and values can refer to any names in the let bindings
#
#   ANNOTATION syntax: \@ name1 value1 name2 value2 . body
#
# Annotations associate key-values pairs with code
#  name, data, body -- associates a name and data with a body of code
#  You can nest them, so body could be another annotation

# lit, ref, lambda, let each need a range
  L_lit = setDataType ((_x)-> (_r)-> setType ((_f)-> rz(_f)(_x)(_r)), 'lit'), 'lit'
  L_ref = setDataType ((_x)-> (_r)-> setType ((_f)-> rz(_f)(_x)(_r)), 'ref'), 'ref'
  L_lambda = setDataType ((_v)-> (_f)-> (_r)-> setType ((_g)-> rz(_g)(_v)(_f)(_r)), 'lambda'), 'lambda'
  L_let = setDataType ((_n)-> (_v)-> (_b)-> (_r)-> setType ((_f)-> rz(_f)(_n)(_v)(_b)(_r)), 'let'), 'let'
  L_apply = setDataType ((_func)-> (_arg)-> setType ((_f)-> rz(_f)(_func)(_arg)), 'apply'), 'apply'
  L_anno = setDataType ((_name)->(_data)->(_body)-> setType ((_f)-> rz(_f)(_name)(_data)(_body)), 'anno'), 'anno'
  
  getType = (f)->
    t = typeof f
    if t == 'null' then "*null"
    else if t == 'undefined' then "*undefined"
    else if f.leisureType then f.leisureType
    else (t == 'function' and f?.type) or "*#{((t == 'object') && f.constructor?.name) || t}"
  
  define 'getType', ((value)-> getType rz value), 1
  
  getDataType = (f)-> (typeof f == 'function' && f.dataType) || f?.leisureDataType || ''
  
  define 'getDataType', ((value)-> getDataType rz value), 1
  
  save = {}

# lit, ref, lambda, let each need a range
  save.lit = lit = (l, range)-> L_lit(lz l)(lz range)
  save.ref = ref = (r, range)-> L_ref(lz r)(lz range)
  save.lambda = lambda = (v, body, range)->L_lambda(lz v)(lz body)(lz range)
  save.llet = llet = (n, v, b, range)->L_let(lz n)(lz v)(lz b)(lz range)
  save.apply = apply = (f, a)->L_apply(lz f)(lz a)
  save.anno = anno = (name, data, body)-> L_anno(lz name)(lz data)(lz body)
  save.cons = cons
  
  dummyPosition = cons 1, cons 0, Nil
  
  getPos = (ast)->
    switch getType(ast)
      when 'lit' then getLitRange ast
      when 'ref' then getRefRange ast
      when 'lambda' then getLambdaRange ast
      when 'apply' then getApplyRange ast
      when 'let' then getLetRange ast
      when 'anno' then getAnnoRange ast
  
  firstRange = (a, b)->
    if !a || !b then console.log "NIL = #{Nil}"
    [lineA, colA] = a.toArray()
    [lineB, colB] = b.toArray()
    if lineA? && lineB?
      if lineA < lineB || (lineA == lineB && colA < colB) then a else b
    else if lineA then a else b
  
  getLitVal = (lt)-> lt lz (v)-> (r)-> rz v
  getLitRange = (lt)-> lt lz (v)-> (r)-> rz r
  getRefName = (rf)-> rf lz (v)-> (r)-> rz v
  getRefRange = (rf)-> rf lz (v)-> (r)-> rz r
  getLambdaVar = (lam)-> lam lz (v)->(b)-> (r)->  rz v
  getLambdaBody = (lam)-> lam lz (v)->(b)-> (r)->  rz b
  getLambdaRange = (lam)-> lam lz (v)->(b)-> (r)->  rz r
  getLetName = (lt)-> lt lz (n)->(v)->(b)-> (r)->  rz n
  getLetValue = (lt)-> lt lz (n)->(v)->(b)-> (r)->  rz v
  getLetBody = (lt)-> lt lz (n)->(v)->(b)-> (r)->  rz b
  getLetRange = (lt)-> lt lz (n)->(v)->(b)-> (r)->  rz r
  getApplyFunc = (apl)-> apl lz (a)->(b)-> rz a
  getApplyArg = (apl)-> apl lz (a)->(b)-> rz b
  getApplyRange = (apl) -> firstRange (getPos getApplyFunc apl), (getPos getApplyArg apl)
  getAnnoName = (anno)-> anno lz (name)->(data)->(body)-> rz name
  getAnnoData = (anno)-> anno lz (name)->(data)->(body)-> rz data
  getAnnoBody = (anno)-> anno lz (name)->(data)->(body)-> rz body
  getAnnoRange = (anno)-> getPos getAnnoBody anno

######
###### JSON-to-AST
######

  #jsonToRange = (json)-> lz json2Ast json
  #rangeToJson = (range)-> ast2Json range
  jsonToRange = (json)-> lz consFrom(json)
  rangeToJson = (range)-> range.toArray()
  
  json2AstEncodings =
    lit: (json)-> L_lit(lz json.value)(jsonToRange json.range)
    ref: (json)-> L_ref(lz json.varName)(jsonToRange json.range)
    lambda: (json)-> L_lambda(lz json.varName)(lz json2Ast json.body)(jsonToRange json.range)
    let: (json)-> L_let(lz json.varName)(lz json2Ast(json.value))(lz json2Ast(json.body))(jsonToRange json.range)
    apply: (json)-> L_apply(lz json2Ast(json.func))(lz json2Ast json.arg)
    anno: (json)-> L_anno(lz json.name)(lz json2Ast json.data)(lz json2Ast json.body)
    cons: (json)-> save.cons json2Ast(json.head), json2Ast(json.tail)
    nil: (json)-> Nil

# need these because my CS mod names the above functions with the field names :-/
  lit = save.lit
  ref = save.ref
  lambda = save.lambda
  apply = save.apply
  llet = save.llet
  anno = save.anno
  cons = save.cons
  
  json2Ast = (json)-> if typeof json == 'object' then json2AstEncodings[json._type] json else json

  ast2JsonEncodings =
    Leisure_lit: (ast)->
      _type: 'lit'
      value: getLitVal ast
      range: rangeToJson getLitRange ast
    Leisure_ref: (ast)->
      _type: 'ref'
      varName: getRefName ast
      range: rangeToJson getRefRange ast
    Leisure_lambda: (ast)->
      _type: 'lambda'
      varName: getLambdaVar ast
      body: ast2Json getLambdaBody ast
      range: rangeToJson getLambdaRange ast
    Leisure_let: (ast)->
      _type: 'let'
      varName: getLetName ast
      value: ast2Json getLetValue ast
      body: ast2Json getLetBody ast
      range: rangeToJson getLetRange ast
    Leisure_apply: (ast)->
      _type: 'apply'
      func: ast2Json getApplyFunc ast
      arg: ast2Json getApplyArg ast
    Leisure_anno: (ast)->
      _type: 'anno'
      name: getAnnoName ast
      data: ast2Json getAnnoData ast
      body: ast2Json getAnnoBody ast
    Leisure_cons: (ast)->
      _type: 'cons'
      head: ast2Json ast.head()
      tail: ast2Json ast.tail()
    Leisure_nil: (ast)->
      _type: 'nil'
  
  ast2Json = (ast)->
    if ast2JsonEncodings[ast.constructor?.name] then ast2JsonEncodings[ast.constructor.name] ast else ast

# Leisure interface to the JSON AST codec
  define 'json2Ast', ((json)-> json2Ast JSON.parse rz json), null, null, null, 'parser'
  define 'ast2Json', ((ast)-> JSON.stringify ast2Json rz ast), null, null, null, 'parser'
  
  consFrom = (array, i)->
    i = i || 0
    if i < array.length then cons array[i], consFrom(array, i + 1) else Nil
  
  head = (l)-> l.head()
  
  tail = (l)-> l.tail()
  
  root.head = head
  root.tail = tail
  root.consFrom = consFrom
  root.nameSub = nameSub
  root.setDataType = setDataType
  root.setType = setType
  root.mkProto = mkProto
  root.Nil = Nil
  root.cons = cons
  root.primCons = primCons
  root.define = define
  root.nakedDefine = nakedDefine
  root.getType = getType
  root.getDataType = getDataType
  root.lit = lit
  root.ref = ref
  root.lambda = lambda
  root.apply = apply
  root.anno = anno
  root.llet = llet
  root.getRefName = getRefName
  root.getRefRange = getRefRange
  root.getLitVal = getLitVal
  root.getLambdaBody = getLambdaBody
  root.getLambdaVar = getLambdaVar
  root.getApplyFunc = getApplyFunc
  root.getApplyArg = getApplyArg
  root.getLetName = getLetName
  root.getLetValue = getLetValue
  root.getLetBody = getLetBody
  root.getAnnoName = getAnnoName
  root.getAnnoData = getAnnoData
  root.getAnnoBody = getAnnoBody
  root.throwError = throwError
  root.foldLeft = foldLeft
  root.LeisureObject = LeisureObject
  root.evalFunc = evalFunc
  root.json2Ast = json2Ast
  root.ast2Json = ast2Json
  root.Leisure_lit = Leisure_lit
  root.Leisure_ref = Leisure_ref
  root.Leisure_lambda = Leisure_lambda
  root.Leisure_apply = Leisure_apply
  root.Leisure_let = Leisure_let
  root.Leisure_anno = Leisure_anno
  root.ensureLeisureClass = ensureLeisureClass
  root.makeSuper = makeSuper
  root.supertypes = supertypes
  root.functionInfo = functionInfo
  root.getPos = getPos
  root.dummyPosition = dummyPosition
  root.isNil = isNil
  root.isPartial = isPartial
  root.partialCall = partialCall

  root
