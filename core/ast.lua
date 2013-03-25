local M = require('base')
local _ = require('underscore')
local json = require('j')

M.lockGlobals(
   function()
      local nameSub = M.nameSub
      local weakTable = M.weakTable
      local lazy = M.lazy
      local primCons = M.primCons
      local Nil = M.Nil
      local ensureLeisureClass = M.ensureLeisureClass
      local cons = M.cons
      local head = M.head
      local tail = M.tail
      local getType = M.getType
      local setType = M.setType
      local setDataType = M.setDataType

      local astClass = M.Object:subclass({}, 'ast')
      for i, v in ipairs({'lit', 'ref', 'lambda', 'apply', 'let', 'anno', 'srcLocation', 'pattern'}) do
         astClass:subclass({}, v)
      end

      local definitions = weakTable()

      local function define(name, func, arity, src, method, doc)
         local nm = 'L_' .. nameSub(name)

         definitions[func] = {
            src = src,
            leisureName = name,
            leisureArity = arity,
            doc = doc,
         }
         if not method and M.noredefs and _G[nm] then error("Attempt to redefine definition: " .. name) end
         rawset(_G, nm, func)
      end

------
------ Annotation structures
------
------ doc: code documentation
------ srcLocation: source location information
------ pattern: pattern for a lambda
------   like in "length a::nil = 0" -- anno(pattern('nil'), lambda('a', lit(0)))
------

      define('cons', lazy(primCons), 2, '\\a b . \\f . f a b')
      define('nil', lazy(Nil))
      define('doc', lazy(setDataType(function(text) return setType(function(f) return f()(text) end, 'doc') end, 'doc')), 1, '\\txt . \\f . f txt')
      define('srcLocation', lazy(setDataType(function(start) return function(len) return setType(function(f) return f()(start)(len) end, 'srcLocation') end end, 'srcLocation')), 2, '\\start len . \\f . f start len')
      define('pattern', lazy(setDataType(function(pat) return setType(function(f) return f()(pat) end, 'pattern') end, 'pattern')), 1, '\\pat . \\f . f pat')

------
------ ASTs
------

-- Make an AST for these
-- add node numder and source start and end into leisure structure
-- make lit, ref, lambda, apply, let, and anno subclasses of AST
--
--   LET syntax: \ x1 = y1 . x2 = y2 . expr
--
-- let binds a name to a value in a body
--   the body can be another let node and values can refer to any names in the let bindings
--
-- Annotations associate key-values pairs with code
--  name, data, body -- associates a name and data with a body of code
--  You can nest them, so body could be another annotation

      define('lit', lazy(setDataType(function(val) return setType(function(f) return f()(val) end, 'lit') end, 'lit')), 1, '\\val . \\f . f val')
      define('ref', lazy(setDataType(function(name) return setType(function(f) return f()(name) end, 'ref') end, 'ref')), 1, '\\name . \\f . f name')
      define('lambda', lazy(setDataType(function(name) return function(body) return setType(function(f) return f()(name)(body) end, 'lambda') end end, 'lambda')), 2, '\\name body . \\f . f name body')
      define('apply', lazy(setDataType(function(func) return function(arg) return setType(function(f) return f()(func)(arg) end, 'apply') end end, 'apply')), 2, '\\func arg . \\f . f func arg')
      define('let', lazy(setDataType(function(name) return function(value) return function(body) return setType(function(f) return f()(name)(value)(body) end, 'let') end end end, 'let')), 2, '\\name value body . \\f . f name value body')
      define('anno', lazy(setDataType(function(name) return function(data) return function(body) return setType(function(f) return f()(name)(data)(body) end, 'anno') end end end, 'anno')), 2, '\\name data body . \\f . f name data body')

      local function lit(l) return L_lit()(lazy(l)) end
      local function ref(n) return L_ref()(lazy(n)) end
      local function lambda(n, b) return L_lambda()(lazy(n))(lazy(b)) end
      local function apply(f, a) return L_apply()(lazy(f))(lazy(a)) end
      local function let(n, v, b) return L_let()(lazy(n))(lazy(v))(lazy(b)) end
      local function anno(n, d, b) return L_anno()(lazy(n))(lazy(d))(lazy(b)) end

      local function getAstType(ast) return getType(ast) end
      local function getLitVal(ast) return ast(lazy(function(v) return v() end)) end
      local function getRefName(ast) return ast(lazy(function(n) return n() end)) end
      local function getLambdaName(ast) return ast(lazy(function(n) return function(b) return n() end end)) end
      local function getLambdaBody(ast) return ast(lazy(function(n) return function(b) return b() end end)) end
      local function getApplyFunc(ast) return ast(lazy(function(f) return function(a) return f() end end)) end
      local function getApplyArg(ast) return ast(lazy(function(f) return function(a) return a() end end)) end
      local function getLetName(ast) return ast(lazy(function(n) return function(v) return function(b) return n() end end end)) end
      local function getLetValue(ast) return ast(lazy(function(n) return function(v) return function(b) return v() end end end)) end
      local function getLetBody(ast) return ast(lazy(function(n) return function(v) return function(b) return b() end end end)) end
      local function getAnnoName(ast) return ast(lazy(function(n) return function(d) return function(b) return n() end end end)) end
      local function getAnnoData(ast) return ast(lazy(function(n) return function(d) return function(b) return d() end end end)) end
      local function getAnnoBody(ast) return ast(lazy(function(n) return function(d) return function(b) return b() end end end)) end

      --
      -- JSON-to-AST
      --
      local dispatch = {}

      local function json2Ast(json)
         local func = type(json) == 'table' and dispatch[json._type]
         return (func and func(json)) or json
      end

      function dispatch.lit(json) return lit(json.value) end
      function dispatch.ref(json) return ref(json.varName) end
      function dispatch.lambda(json) return lambda(json.varName, json2Ast(json.body)) end
      function dispatch.apply(json) return apply(json2Ast(json.func), json2Ast(json.arg)) end
      function dispatch.let(json) return let(json.varName, json2Ast(json.value), json2Ast(json.body)) end
      function dispatch.anno(json) return anno(json.name, json2Ast(json.data), json2Ast(json.body)) end
      function dispatch.cons(json) return cons(json2Ast(json.head), json2Ast(json.tail)) end
      dispatch['nil'] = function(json) return Nil end

      local ast2JsonEncodings = {}

      local function ast2Json(ast)
         local t = getType(ast)

         if t then
            local func = ast2JsonEncodings[t.__classname]
            if func then return func(ast) end
         end
         return ast
      end

      function ast2JsonEncodings.lit(ast) return {_type = 'lit', value = getLitVal(ast)} end
      function ast2JsonEncodings.ref(ast) return {_type = 'ref', varName = getRefName(ast)} end
      function ast2JsonEncodings.lambda(ast) return {_type = 'lambda', varName = getLambdaName(ast), body = ast2Json(getLambdaBody(ast))} end
      function ast2JsonEncodings.apply(ast) return {_type = 'apply', func = ast2Json(getApplyFunc(ast)), arg = ast2Json(getApplyArg(ast))} end
      function ast2JsonEncodings.let(ast) return {_type = 'let', varName = getLetName(ast), value = ast2Json(getLetValue(ast)), body = ast2Json(getLetBody(ast))} end
      function ast2JsonEncodings.anno(ast) return {_type = 'anno', name = getAnnoName(ast), data = ast2Json(getAnnoData(ast)), body = ast2Json(getAnnoBody(ast))} end
      function ast2JsonEncodings.cons(ast) return {_type = 'cons', head = ast2Json(head(ast)), tail = ast2Json(tail(ast))} end
      ast2JsonEncodings['nil'] = function(ast) return {_type = 'nil'} end

      function astClass:funcString(f)
         return 'AST ' .. json.stringify(ast2Json(f))
      end

      M.define = define
      M.json2Ast = json2Ast
      M.ast2Json = ast2Json
      M.lit = lit
      M.ref = ref
      M.lambda = lambda
      M.apply = apply
      M.let = let
      M.anno = anno
      M.getLitVal = getLitVal
      M.getRefName = getRefName
      M.getLambdaName = getLambdaName
      M.getLambdaBody = getLambdaBody
      M.getApplyFunc = getApplyFunc
      M.getApplyArg = getApplyArg
      M.getAnnoName = getAnnoName
      M.getAnnoData = getAnnoData
      M.getAnnoBody = getAnnoBody
      M.getLetName = getLetName
      M.getLetValue = getLetValue
      M.getLetBody = getLetBody
      M.Leisure_lit = M.classes.lit
      M.Leisure_ref = M.classes.ref
      M.Leisure_lambda = M.classes.lambda
      M.Leisure_apply = M.classes.apply
      M.Leisure_let = M.classes.let
      M.Leisure_anno = M.classes.anno
   end)
return M
