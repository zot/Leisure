local M = require('base')
_ = require('underscore')
json = require('j')

M.lockGlobals(
   function()
      local nameSub = M.nameSub
      local weakTable = M.weakTable
      local lazy = M.lazy
      local primCons = M.primCons
      local Nil = M.Nil

      ensureLeisureClass('lit')
      ensureLeisureClass('ref')
      ensureLeisureClass('lambda')
      ensureLeisureClass('apply')
      ensureLeisureClass('let')
      ensureLeisureClass('anno')
      ensureLeisureClass('doc')
      ensureLeisureClass('srcLocation')
      ensureLeisureClass('pattern')
      ensureLeisureClass('pattern')
      ensureLeisureClass('pattern')

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
      define('lit', lazy(setDataType(function(val) return setType(function(f) return f()(val) end, 'lit') end, 'lit')), 1, '\\val . \\f . f val')
      define('ref', lazy(setDataType(function(name) return setType(function(f) return f()(name) end, 'ref') end, 'ref')), 1, '\\name . \\f . f name')
      define('lambda', lazy(setDataType(function(name) return function(body) return setType(function(f) return f()(name)(body) end, 'lambda') end end, 'lambda')), 2, '\\name body . \\f . f name body')
      define('apply', lazy(setDataType(function(func) return function(arg) return setType(function(f) return f()(func)(arg) end, 'apply') end end, 'apply')), 2, '\\func arg . \\f . f func arg')
      define('let', lazy(setDataType(function(name) return function(value) return function(body) return setType(function(f) return f()(name)(value)(body) end, 'let') end end end, 'let')), 2, '\\name value body . \\f . f name value body')
      define('anno', lazy(setDataType(function(data) return function(body) return setType(function(f) return f()(data)(body) end, 'anno') end end, 'anno')), 2, '\\data body . \\f . f data body')

      function lit(l) L_lit()(lazy(l)) end
      function ref(n) L_ref()(lazy(n)) end
      function lambda(n, b) L_lambda()(lazy(n))(lazy(b)) end
      function apply(f, a) L_apply()(lazy(f))(lazy(a)) end
      function let(n, v, b) L_let()(lazy(n))(lazy(v))(lazy(b)) end
      function anno(d, b) L_anno()(lazy(d))(lazy(b)) end

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
      local function getAnnoData(ast) return ast(lazy(function(d) return function(b) return d() end end)) end
      local function getAnnoBody(ast) return ast(lazy(function(d) return function(b) return b() end end)) end

      --
      -- JSON-to-AST
      --
      local dispatch = {
         lit = function(json) lit(json.value) end,
         ref = ref,
         lambda = lambda,
         apply = apply,
         let = let,
         anno = anno,
         cons = cons,
      }
      local function json2Ast
   end)
return M
