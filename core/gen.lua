--[[
Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

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
]]

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

      local function varNameSub(n) return 'L_' .. nameSub(n) end

      local function genLets(ast)
         local lets = letList(ast, {})
         local names = _.map(lets, function(l) return varNameSub(getLetName(l)) end)
         return dl(
            '\nlocal ',
            table.concat(names, ', '),
            '\n',
            dl(unpack(_.map(lets, function(l) return dl(varNameSub(getLetName(l)), ' = ', genApplyArg(getLetValue(l)), '\n') end))),
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
         elseif instanceOf(arg, Leisure_ref) then return varNameSub(getRefName(arg))
         elseif instanceOf(arg, Leisure_let) then return dl('function() ', genLets(arg), ' end')
         else
            return dl('function() return ', gen(arg), ' end')
         end
      end

      local genTable = {
         lit = function(ast) return json.stringify(getLitVal(ast)) end,
         ref = function(ast) return dl(varNameSub(getRefName(ast)), '()') end,
         lambda = function(ast)
            return dl(
               'function(',
               varNameSub(getLambdaName(ast)),
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
