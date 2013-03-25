local M = require('testing')
require('gen')
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
         varName = 'a'
      }
   }
}

lfalseAst = json2Ast {
   _type = 'lambda',
   varName = 'a',
   body = {
      _type = 'lambda',
      varName = 'b',
      body = {
         _type = 'ref',
         varName = 'b'
      }
   }
}

lidAst = json2Ast {
   _type = 'lambda',
   varName = 'x',
   body = {
      _type = 'ref',
      varName = 'x'
   }
}

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
            varName = 'x'
         },
         arg = {
            _type = 'ref',
            varName = 'y'
         }
      }
   }
}

let3Ast = json2Ast {
   _type = 'let',
   varName = 'x',
   value = {
      _type = 'lit',
      value = 3
   },
   body = {
      _type = 'let',
      varName = 'y',
      value = {
         _type = 'apply',
         func = {
            _type = 'apply',
            func = {
               _type = 'ref',
               varName = 'log'
            },
            arg = {
               _type = 'lit',
               value = 'hello y'
            }
         },
         arg = {
            _type = 'lit',
            value = 4
         }
      },
      body = {
         _type = 'ref',
         varName = 'x'
      }
   }
}

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
          value = 3
       }

       assertEq(getLitVal(st), 3)
       assertEq(getLitVal(json2Ast(ast2Json(st))), 3)
    end)
run('test9',
    function()
       local st = json2Ast {
          _type = 'ref',
          varName = 'x'
       }

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
             _type = 'nil'
          }
       }

       assertEq(tostring(st), 'Cons [1]')
       assertEq(tostring(json2Ast(ast2Json(st))), 'Cons [1]')
    end)
run('test12',
    function()
       local st = json2Ast {
          _type = 'lit',
          value = 3
       }

       assertEq(gen(st), 'return 3')
    end)
run('test13', function() assertEq(gen(lidAst), 'return function(x)\nreturn x()\nend') end)
run('test14', function() assertEq(gen(lapplyXY), 'return function(x)\nreturn function(y)\nreturn x()(y)\nend\nend') end)
run('test15', function() assertEq(gen(ltrueAst), 'return function(a)\nreturn function(b)\nreturn a()\nend\nend') end)
run('test16', function() assertEq(loadstring(gen(ltrueAst))()(lazy(5))(lazy(6)), 5) end)
run('test17', function() assertEq(loadstring(gen(lfalseAst))()(lazy(5))(lazy(6)), 6) end)
run('test18', function() assertEq(loadstring(gen(let3Ast))(), 3) end)

print('\nDone')
if M.testStats.failures == 0 then print("Succeeded all " .. M.testStats.successes .. ' tests.')
else
   print("\nSucceeded " .. M.testStats.successes .. ' test' .. ((M.testStats.successes > 1 and 's') or ''))
   print('Failed ' .. M.testStats.failures .. ' test' .. ((M.testStats.failures > 1 and 's') or ''))
   for i, v in ipairs(M.testStats.failed) do
      print('  ' .. v)
   end
end
