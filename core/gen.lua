local M = require('base')
require('ast')
local _ = require('underscore')
local json = require('j')

M.lockGlobals(
   function()
      local push           = M.push
      local join           = M.join
      local Nil            = M.Nil
      local dl             = M.dl
      local dlAppend       = M.dlAppend
      local nameSub        = M.nameSub
      local getLitVal      = M.getLitVal
      local getRefName      = M.getRefName
      local getLambdaName   = M.getLambdaName
      local getLambdaBody  = M.getLambdaBody
      local getApplyFunc   = M.getApplyFunc
      local getApplyArg    = M.getApplyArg
      local getAnnoBody    = M.getAnnoBody
      local getLetName     = M.getLetName
      local getLetValue    = M.getLetValue
      local getLetBody     = M.getLetBody
      local Leisure_lit    = M.Leisure_lit
      local Leisure_ref    = M.Leisure_ref
      local Leisure_lambda = M.Leisure_lambda
      local Leisure_apply  = M.Leisure_apply
      local Leisure_let    = M.Leisure_let
      local Leisure_anno   = M.Leisure_anno
      local instanceOf     = M.instanceOf
      local getType        = M.getType

      local gen
      local genApplyArg

      local function letList(ast, result)
         while instanceOf(ast, Leisure_let) do
            push(result, ast)
            ast = getLetBody(ast)
         end
         return result
      end

      local function getLastLetBody(ast)
         if instanceOf(ast, Leisure_let) then return getLastLetBody(getLetBody(ast)) end
         return ast
      end

      local function genLets(ast)
         local lets = letList(ast, {})
         local names = _.map(lets, function(l) return nameSub(getLetName(l)) end)
         return dl(
            '\nlocal ',
            table.concat(names, ', '),
            '\n',
            dl(unpack(_.map(lets, function(l) return dl(nameSub(getLetName(l)), ' = ', genApplyArg(getLetValue(l)), '\n') end))),
            '\nreturn ',
            gen(getLastLetBody(ast))
         )
      end

      function genApplyArg(arg)
         if instanceOf(arg, Leisure_apply) then
            return dl(
[[
(function()
   local _m
   return function()
      if not _m then _m = (]],
gen(arg),
[[) end
      return _m
   end
end)()]])
         elseif instanceOf(arg, Leisure_ref) then return nameSub(getRefName(arg))
         elseif instanceOf(arg, Leisure_let) then return dl('function() ', genLets(arg), ' end')
         else
            return dl('function() return ', gen(arg), ' end')
         end
      end

      local genTable = {
         lit = function(ast) return json.stringify(getLitVal(ast)) end,
         ref = function(ast) return dl(nameSub(getRefName(ast)), '()') end,
         lambda = function(ast)
            return dl(
               'function(',
               nameSub(getLambdaName(ast)),
               ')\nreturn ',
               gen(getLambdaBody(ast)),
               '\nend')
         end,
         apply = function(ast)
            return dl(
               gen(getApplyFunc(ast)),
               '(',
               genApplyArg(getApplyArg(ast)),
               ')')
         end,
         let = function(ast)
            return dl(
               '(function()\n',
               genLets(ast),
               '\nend)()')
         end,
         anno = function(ast) return gen(getAnnoBody(ast)) end
      }

      function gen(ast)
         if genTable[getType(ast).__classname] then
            return genTable[getType(ast).__classname](ast)
         end
         return "DUR? " .. tostring(ast)
      end

      function M.gen(ast)
         return join(dl('return ', gen(ast))(Nil))
      end
   end)

return M
