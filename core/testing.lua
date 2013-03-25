local M = require('ast')

M.lockGlobals(
   function()
      local stats = {
         successes = 0,
         failures = 0,
         failed = {}
      }

      local eq

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

      function M.assertEq(actual, expected, desc)
         if not eq(expected, actual) then
            if desc then
               desc = '[' .. desc .. '] '
            else
               desc = ''
            end
            error(desc .. "Expected <" .. tostring(expected) .. '> but got <' .. tostring(actual) .. '>')
         end
      end

      local function handle(err)
         return debug.traceback(err)
      end

      function M.run(name, func)
         success, result = xpcall(func, handle)
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
