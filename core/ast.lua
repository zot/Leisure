local M = require('base')

----
---- naming
----

local charCodes = {
   ["'"] = '$a',
   [','] = '$b',
   ['$'] = '$$',
   ['@'] = '$d',
   ['?'] = '$e',
   ['/'] = '$f',
   ['*'] = '$g',
   ['&'] = '$h',
   ['^'] = '$i',
   ['!'] = '$k',
   ['`'] = '$l',
   ['~'] = '$m',
   ['-'] = '$_',
   ['+'] = '$o',
   ['='] = '$p',
   ['|'] = '$q',
   ['['] = '$r',
   [']'] = '$s',
   ['{'] = '$t',
   ['}'] = '$u',
   ['"'] = '$v',
   [':'] = '$w',
   [';'] = '$x',
   ['<'] = '$y',
   ['>'] = '$z',
   ['%'] = '$A',
   ['.'] = '$B'
}

function M.nameSub(name)
   return string.gsub(name, '.', function(s) if charCodes[s] then return charCodes[s] else return s end end)
end

----
---- definitions
----

local types = {}

setmetatable(types, {__mode = 'k'})

----
---- classes with support for instanceOf and classname
----

local Object = {__classname = 'Object'}

-- Object:new(table(opt), classname(opt))
--  makes table inherit from the object and returns the table (or a new one if none given)
--  classname names the table -- pass this if it's a class
--  returns the object

function Object:new(o)
   o = o or {}
   setmetatable(o, self)
   self.__index = self
   self.__tostring = Object.__tostring
   self.__ancestors = {[self] = true}
   local parent = getmetatable(self)
   setmetatable(self.__ancestors, parent.__ancestors)
   parent.__ancestors.__index = parent.__ancestors
   return o
end

function Object:subclass(...)
   if not self:isClass() then error(tostring(self) .. " is not a class")
   else
      o, name = ...
      o = self:new(o)
      o.__classname = name
      return o
   end
end

function Object:className()
   if not self:isClass() then return nil
   else
      return self.__classname
   end
end

function Object:__tostring()
   if self:isClass() then
      return self.__classname .. ' class'
   end
   return ((string.match(self.__classname, '^[AEIOUaeiou]') and 'An ') or 'A ') .. self.__classname
end

setmetatable(Object, {__tostring = Object.__tostring, __ancestors = {}})

function Object:isClass()
   return rawget(self, '__classname')
end

function Object:instanceOf(cl)
   return self.__ancestors[cl]
end

M.Object = Object

return M
