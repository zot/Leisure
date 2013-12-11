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

M.lockGlobals(
   function()
      local delimiters = {
         ['\\n *'] = true,
         ['\\('] = true,
         ['\\)'] = true,
         [' +'] = true,
      }
      local function tokens(str)
         local start = nil
         local finish = nil
         local init = 1
         local results = {}
         local len = string.len(str)

         while init <= len do
            start = len + 1
            for k in pairs(delimiters) do
               s, e = string.find(str, k, init)
               if s and (s < start or (s == start and e > finish)) then
                  start = s
                  finish = e
               end
            end
            if start > init then
               M.push(results, string.sub(str, init, start - 1))
            end
            if start <= len then
               M.push(results, string.sub(str, start, finish))
               init = finish + 1
            else
               init = len + 1
            end
         end
         return M.consFrom(results)
      end

      M.tokens = tokens
   end)

return M
