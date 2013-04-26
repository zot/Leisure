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

local M = require('ast')

M.lockGlobals(
   function()
      local stats = {
         successes = 0,
         failures = 0,
         failed = {}
      }

      local eq

      local handleErr = M.handleErr

      local function eqTable(a, b)
         if type(a) ~= 'table' or type(b) ~= 'table' or M.isObject(a) or M.isObject(b) then
            return false
         else
            local tot = 0
            local tot2 = 0

            for k,v in pairs(a) do
               tot = tot + 1
               if not eq(v, b[k]) then return false end
            end
            for k in pairs(b) do
               tot2 = tot2 + 1
            end
            return tot == tot2
         end
      end

      function eq(a, b)
         return a == b or eqTable(a, b)
      end

      local function str(obj)
         if type(obj) == 'table' then
            return '{' .. table.concat(obj, ', ') .. '}'
         else
            return tostring(obj)
         end
      end

      function M.assertEq(actual, expected, desc)
         if not eq(expected, actual) then
            if desc then
               desc = '[' .. desc .. '] '
            else
               desc = ''
            end
            error(desc .. "Expected <" .. str(expected) .. '> but got <' .. str(actual) .. '>')
         end
      end

      function M.run(name, func)
         success, result = handleErr(func)
         if success then
            io.write('.')
            stats.successes = stats.successes + 1
         else
            stats.failures = stats.failures + 1
            stats.failed[#stats.failed + 1] = name
            print("\nFailure, " .. name .. ": " .. tostring(result))
         end
      end

      M.eq = eq
      M.testStats = stats
   end)

return M
