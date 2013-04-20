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

local M = {}

local oldTostring = tostring

--===================================================
--=  Mod of Niklas Frykholm's GLOBAL_lock/GLOBAL_unlock
-- basically if user tries to create global variable
-- the system will not let them!!
--===================================================

function M.lockGlobals(func)
  local mt = getmetatable(_G) or {}
  mt.__newindex = function (t, k, v)
     if (k~="_" and string.sub(k,1,2) ~= "__") then
        mt.__newindex = nil
        error("Attempt to define global '" .. k ..
           "' while globals are locked.  Either unlock globals or use '__" .. k .. "'.", 2)
     else
        rawset(t, k, v)
     end
  end
  setmetatable(_G, mt)
  local result = func()
  mt.__newindex = nil
  return result
end

---
--- using lockGlobals, here
---

M.lockGlobals(
   function()
      M.funcs = {}

      local function push(tbl, ...)
         for i, v in ipairs({...}) do
            tbl[#tbl + 1] = v
         end
      end

      local function weakTable()
         local t = {}
         setmetatable(t, {__mode = 'k'})
         return t
      end

      --===================================================
      --= Mod of table.tostring
      --= from http://lua-users.org/wiki/TableUtils
      --= changed to graph search, so it can short-circuit
      --===================================================

      local tableTostring

      local function val_to_str(v, result, done)
         if "string" == type(v) then
            v = string.gsub(v, "\n", "\\n")
            if string.match(string.gsub(v,"[^'\"]",""), '^"+$') then
               push(result, "'", v, "'")
               return
            end
            push(result, '"', string.gsub(v,'"', '\\"'), '"')
         else
            if type(v) == 'table' then
               if done[v] then push(result, '...')
               else
                  done[v] = true
                  tableTostring(v, result, done)
               end
            else
               push(result, tostring(v))
            end
         end
      end

      local function handleErr(func)
         return xpcall(
            func,
            function(err)
               return debug.traceback(err)
            end
         )
      end

      local function key_to_str(k, result, done)
         if "string" == type(k) and string.match(k, "^[_%a][_%a%d]*$") then
            push(result, k)
         else
            push(result, "[")
            val_to_str(k, result, done)
            push(result, "]")
         end
      end

      function tableTostring(tbl, result, done)
         push(result, '{')
         local first = true
         for k, v in ipairs(tbl) do
            if first then first = false else push(result, ', ') end
            done[k] = true
            val_to_str(v, result, done)
         end
         for k, v in pairs(tbl) do
            if not done[k] then
               if first then first = false else push(result, ', ') end
               key_to_str(k, result, done)
               push(result, "=")
               val_to_str(v, result, done)
            end
         end
         push(result, '}')
      end

      function table.tostring(tbl)
         local result = {}
         local done = {}

         tableTostring(tbl, result, done)
         return table.concat(result)
      end

      ----
      ---- classes with support for instanceOf and classname
      ----

      local Object = {__classname = 'Object'}
      local classes = {Object = Object}
      local tableStrings = weakTable()

      local function __tostring(self)
         return self:tostring()
      end

      local function __concat(a, b)
         return tostring(a) .. tostring(b)
      end

      -- Object:new(table(opt), classname(opt))
      --  makes table inherit from the object and returns the table (or a new one if none given)
      --  classname names the table -- pass this if it's a class
      --  returns the object

      function Object:new(o)
         o = o or {}
         tableStrings[o] = tostring(o)
         setmetatable(o, self)
         self.__tostring = __tostring
         self.__concat = __concat
         self.__ancestors = {[self] = true}
         self.__index = self
         local parentAncestors = getmetatable(self).__ancestors
         setmetatable(self.__ancestors, parentAncestors)
         parentAncestors.__index = parentAncestors
         return o
      end

      function Object:subclass(...)
         if not self:isClass() then error("Attempt to subclass " .. self .. ", which not a class")
         else
            local o, name = ...
            if not name then error("Attempt to create subclass of " .. self.__classname .. " with no name.") end
            o = self:new(o)
            o.__classname = name
            classes[name] = o
            return o
         end
      end

      function Object:className()
         if not self:isClass() then return nil
         else
            return self.__classname
         end
      end

      function Object:getClass()
         if not self:isClass() then return getmetatable(self) else return nil end
      end

      function Object:tostring()
         if self:isClass() then
            return self.__classname .. ' class'
         end
         return instanceName(self)
      end
      local function instanceName(o)
         return ((string.match(o.__classname, '^[AEIOUaeiou]') and 'An ') or 'A ') .. o.__classname
      end
      function Object:funcString(f)
         return instanceName(self)
      end
      local metaObject = {__tostring = __tostring, __concat = __concat, __ancestors = {}}
      metaObject.__index = metaObject
      setmetatable(Object, metaObject)

      function Object:isClass()
         return rawget(self, '__classname')
      end

      function Object:instanceOf(cl)
         return self.__ancestors[cl]
      end

      local function isObject(o)
         return type(o) == 'table' and o.__ancestors
      end

      local Cons = Object:subclass({}, 'cons')

      local instanceOf

      ----
      ---- definitions
      ----

      ----
      ---- naming
      ----

      local charCodes = {
         ["'"] = '_a',
         [','] = '_b',
         ['$'] = '_c',
         ['@'] = '_d',
         ['?'] = '_e',
         ['/'] = '_f',
         ['*'] = '_g',
         ['&'] = '_h',
         ['^'] = '_i',
         ['!'] = '_k',
         ['`'] = '_l',
         ['~'] = '_m',
         ['-'] = '_n',
         ['+'] = '_o',
         ['='] = '_p',
         ['|'] = '_q',
         ['['] = '_r',
         [']'] = '_s',
         ['{'] = '_t',
         ['}'] = '_u',
         ['"'] = '_v',
         [':'] = '_w',
         [';'] = '_x',
         ['<'] = '_y',
         ['>'] = '_z',
         ['%'] = '_A',
         ['.'] = '_B',
         ['_'] = '__',
      }

      local function nameSub(name)
         return (string.gsub(name, '.', function(s) return charCodes[s] or s end))
      end

      local types = weakTable()
      local dataTypes = weakTable()
      local LeisureObject = Object:subclass({}, 'LeisureObject')

      local function ensureLeisureClass(name)
         local cl = nameSub(name)

         if not classes[cl] then
            LeisureObject:subclass({}, cl)
         end
         return classes[cl]
      end

      local function setDataType(func, dataType)
         dataTypes[func] = dataType
         return func
      end

      local function setType(func, t)
         if t then
            types[func] = ensureLeisureClass(t)
         end
         return func
      end

      local function getType(func)
         return types[func] or (isObject(obj) and getmetatable(obj)) or nil
      end

      local function instanceOf(obj, class)
         local t = types[obj]
         return (t and (t == class or t:instanceOf(class))) or (isObject(obj) and obj:instanceOf(class))
      end

      ----
      ---- Lists and difference lists
      ----

      local function lazy(v) return function() return v end end

      local primCons = setDataType(
         function(a)
            return function(b)
               return setType(
                  function(f)
                     return f()(a)(b)
                  end,
                  'cons')
            end
         end,
         'cons')

      local NilClass = Cons:subclass({},'nil')

      local Nil = setType(
         function(a)
            return function(b)
               return b()
            end
         end,
         'nil')

      local function cons(a, b)
         return primCons(lazy(a))(lazy(b))
      end

      local function head(list)
         return list(
            function()
               return function(a)
                  return function(b)
                     return a()
                  end
               end
            end)
      end

      local function tail(list)
         return list(
            function()
               return function(a)
                  return function(b)
                     return b()
                  end
               end
            end)
      end

      local function consElements(list, res)
         if instanceOf(list, Cons) then
            push(res, '[')
            local first = true
            while instanceOf(list, Cons) do
               if list == Nil then break end
               if first then first = false else push(res, ' ') end
               consElements(head(list), res)
               list = tail(list)
            end
            if list ~= Nil then
               push(res, ' | ', tostring(list))
            end
            push(res, ']')
         else
            push(res, tostring(list))
         end
      end

      ---
      --- Plug in different head/tail for subclasses
      ---

      function Cons:head(h)
         return head(h)
      end

      function Cons:tail(h)
         return tail(h)
      end

      --
      -- wrapper functions for list operations
      -- to support polymorphism easier in (nongenerated) Lua code
      --
      local function find(l, func) return types[l]:find(l, func) end
      local function removeAll(l, func) return types[l]:removeAll(l, func) end
      local function map(l, func) return types[l]:map(l, func) end
      local function reverse(l) return types[l]:reverse(l) end
      local function rev(l, res) return types[l]:rev(l, res) end

      function Cons:find(l, func)
         local h = self:head(l)

         return (func(h) and h) or find(self:tail(l), func)
      end

      function Cons:removeAll(l, func)
         local h = self:head(l)

         return (func(h) and removeAll(self:tail(l), func)) or
         primCons(lazy(h))(function() return removeAll(self:tail(l), func) end)
      end

      function Cons:map(l, func)
         return primCons(
            lazy(func(self:head(l)))
         )(
            lazy(map(self:tail(l), func))
          )
      end

      function Cons:reverse(l)
         return self:rev(l, Nil)
      end

      function Cons:rev(l, res)
         local h = self:head(l)
         local t = self:tail(l)

         return rev(t, cons(h, res))
      end

      function NilClass:find(l) return l end
      function NilClass:removeAll(l) return l end
      function NilClass:map(l) return l end
      function NilClass:reverse(l) return l end
      function NilClass:rev(l, res) return res end

      function Cons:funcString(f)
         local out = {'Cons '}
         consElements(f, out)
         return table.concat(out)
      end

      local function list(...)
         local l = Nil
         local items = {...}

         for i = #items, 1, -1 do
            l = cons(items[i], l)
         end
         return l
      end

      local function toTable(list)
         r = {}
         while list ~= Nil do
            push(r, head(list))
            list = tail(list)
         end
         return r
      end

      local function join(list, sep)
         return table.concat(toTable(list), sep)
      end

      local diffLists = weakTable()

      local function isDiffList(obj)
         return diffLists[obj]
      end

      local function dl(...)
         local items = {...}

         function f(rest)
            for i = #items, 1, -1 do
               if isDiffList(items[i]) then
                  rest = items[i](rest)
               else
                  rest = cons(items[i], rest)
               end
            end
            return rest
         end
         diffLists[f] = true
         return f
      end

      M.lazy = lazy
      M.Object = Object
      M.isObject = isObject
      M.instanceOf = instanceOf
      M.push = push
      M.cons = cons
      M.primCons = primCons
      M.Cons = Cons
      M.Nil = Nil
      M.head = head
      M.tail = tail
      M.list = list
      M.join = join
      M.find = find
      M.map = map
      M.reverse = reverse
      M.removeAll = removeAll
      M.dl = dl
      M.toTable = toTable
      M.isDiffList = isDiffList
      M.weakTable = weakTable
      M.classes = classes
      M.nameSub = nameSub
      M.setType = setType
      M.setDataType = setDataType
      M.getType = getType
      M.ensureLeisureClass = ensureLeisureClass
      M.handleErr = handleErr
   end)

function tostring(v)
   if type(v) == 'function' then
      local t = M.getType(v)

      if t then
         return t:funcString(v)
      end
   end
   return oldTostring(v)
end

return M
