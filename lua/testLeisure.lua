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

local M = require('testing')
require('gen')
require('runtime')
require('simpleParse')
json = require('json')

local define = M.define
local scan = M.scan
local cons = M.cons
local list = M.list
local Nil = M.Nil
local head = M.head
local reverse = M.reverse
local json2Ast = M.json2Ast
local ast2Json = M.ast2Json
local getLitVal = M.getLitVal
local getRefName = M.getRefName
local getLambdaBody = M.getLambdaBody
local run = M.run
local assertEq = M.assertEq
local gen = M.gen
local lazy = M.lazy

print('Testing Lua')

local debug = false

function parseJson(str) return json2Ast(json.parse(str)) end

define(
   'log',
   function()
      return function(msg)
         return function(val)
            console.log(msg())
            return val()
         end
      end
   end)

ltrueAst = json2Ast {
   _type = 'lambda',
   varName = 'a',
   body = {
      _type = 'lambda',
      varName = 'b',
      body = {
         _type = 'ref',
         varName = 'a'}}}

lfalseAst = json2Ast {
   _type = 'lambda',
   varName = 'a',
   body = {
      _type = 'lambda',
      varName = 'b',
      body = {
         _type = 'ref',
         varName = 'b'}}}

lidAst = json2Ast {
   _type = 'lambda',
   varName = 'x',
   body = {
      _type = 'ref',
      varName = 'x'}}

lapplyXY = json2Ast {
   _type = 'lambda',
   varName = 'x',
   body = {
      _type = 'lambda',
      varName = 'y',
      body = {
         _type = 'apply',
         func = {
            _type = 'ref',
            varName = 'x'},
         arg = {
            _type = 'ref',
            varName = 'y'}}}}

let3Ast = json2Ast {
   _type = 'let',
   varName = 'x',
   value = {
      _type = 'lit',
      value = 3},
   body = {
      _type = 'let',
      varName = 'y',
      value = {
         _type = 'apply',
         func = {
            _type = 'apply',
            func = {
               _type = 'ref',
               varName = 'log'},
            arg = {
               _type = 'lit',
               value = 'hello y'}},
         arg = {
            _type = 'lit',
            value = 4}},
      body = {
         _type = 'ref',
         varName = 'x'}}}

run('test1', function() assertEq('1', '1') end)
run('test2', function() assertEq(tostring(M.Nil), 'Cons []') end)
run('test3', function() assertEq(tostring(cons(1, cons(2, Nil))), 'Cons [1 2]') end)
run('test4', function() assertEq('', '') end)
run('test5', function() assertEq(tostring(list(1, 2, 3)), 'Cons [1 2 3]') end)
run('test6', function() assertEq(tostring(reverse(list(1, 2, 3))), 'Cons [3 2 1]') end)
run('test7', function() assertEq(tostring(cons(1, 2)), 'Cons [1 | 2]') end)
run('test8',
    function()
       local st = json2Ast {
          _type = 'lit',
          value = 3}

       assertEq(getLitVal(st), 3)
       assertEq(getLitVal(json2Ast(ast2Json(st))), 3)
    end)
run('test9',
    function()
       local st = json2Ast {
          _type = 'ref',
          varName = 'x'}

       assertEq(getRefName(st), 'x')
       assertEq(getRefName(json2Ast(ast2Json(st))), 'x')
    end)
run('test10',
    function()
       assertEq(getRefName(getLambdaBody(lidAst)), 'x')
       assertEq(getRefName(getLambdaBody(json2Ast(ast2Json(lidAst)))), 'x')
    end)
run('test11',
    function()
       local st = json2Ast {
          _type = 'cons',
          head = 1,
          tail = {
             _type = 'nil'}}

       assertEq(tostring(st), 'Cons [1]')
       assertEq(tostring(json2Ast(ast2Json(st))), 'Cons [1]')
    end)
run('test12',
    function()
       local st = json2Ast {
          _type = 'lit',
          value = 3}

       assertEq(gen(st), 'return 3')
    end)
run('test13', function() assertEq(gen(lidAst), 'return function(L_x)\nreturn L_x()\nend') end)
run('test14', function() assertEq(gen(lapplyXY), 'return function(L_x)\nreturn function(L_y)\nreturn L_x()(L_y)\nend\nend') end)
run('test15', function() assertEq(gen(ltrueAst), 'return function(L_a)\nreturn function(L_b)\nreturn L_a()\nend\nend') end)
run('test16', function() assertEq(loadstring(gen(ltrueAst))()(lazy(5))(lazy(6)), 5) end)
run('test17', function() assertEq(loadstring(gen(lfalseAst))()(lazy(5))(lazy(6)), 6) end)
run('test18', function() assertEq(loadstring(gen(let3Ast))(), 3) end)

local setXTo3Ast = json2Ast {
   _type = 'apply',
   func = {
      _type = 'apply',
      func = {
         _type = 'ref',
         varName = 'setValue'},
      arg = {
         _type = 'lit',
         value = 'x'}},
   arg = {
      _type = 'lit',
      value = 3}}

run(
   'test19',
   function()
      M.stateValues.x = 2
      M.runMonad(loadstring(gen(setXTo3Ast))(), M.defaultEnv, M.lazy)
      assertEq(M.stateValues.x, 3)
   end)

local setXTo3YTo4Ast = json2Ast {
   _type = 'apply',
   func = {
      _type = 'apply',
      func = {
         _type = 'ref',
         varName = 'bind'},
      arg = {
         _type = 'apply',
         func = {
            _type = 'apply',
            func = {
               _type = 'ref',
               varName = 'setValue'},
            arg = {
               _type = 'lit',
               value = 'x'}},
         arg = {
            _type = 'lit',
            value = 3}}},
   arg = {
      _type = 'lambda',
      varName = 'bubba',
      body = {
         _type = 'apply',
         func = {
            _type = 'apply',
            func = {
               _type = 'ref',
               varName = 'setValue'},
            arg = {
               _type = 'lit',
               value = 'y'}},
         arg = {
            _type = 'lit',
            value = 4}}}}

run(
   'test20',
   function()
      M.stateValues.x = 2
      M.stateValues.y = 2
      M.runMonad(loadstring(gen(setXTo3YTo4Ast))(), M.defaultEnv, M.lazy)
      assertEq(M.stateValues.x, 3)
      assertEq(M.stateValues.y, 4)
   end)

run(
   'test21',
   function()
      assertEq(M.consToArray(M.tokens('a b')), {'a', ' ', 'b'})
   end)

run(
   'test22',
   function()
      assertEq(M.consToArray(M.tokens('a b  c')), {'a', ' ', 'b', '  ', 'c'})
   end)

print('\nDone')

if M.testStats.failures == 0 then print("Succeeded all " .. M.testStats.successes .. ' tests.')
else
   print("\nSucceeded " .. M.testStats.successes .. ' test' .. ((M.testStats.successes > 1 and 's') or ''))
   print('Failed ' .. M.testStats.failures .. ' test' .. ((M.testStats.failures > 1 and 's') or ''))
   for i, v in ipairs(M.testStats.failed) do
      print('  ' .. v)
   end
end
