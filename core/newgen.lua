local M = require('base')
require('ast')
local _ = require('underscore')
local json = require('j')

M.lockGlobals
(function()
    local push           = M.push
    local dl             = M.dl
    local dlAppend       = M.dlAppend
    local nameSub        = M.nameSub
    local getLitVal      = M.getLitVal
    local getRefVar      = M.getRefVar
    local getLambdaVar   = M.getLambdaVar
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

    local gen

    local genTable = {
       Leisure_lit = function(ast)
          return dl(json.stringify(getLitVal(ast)))
       end,
       Leisure_ref = function(ast)
          return dl(nameSub(getRefVar(ast)), '()')
       end,
       Leisure_lambda = function(ast)
          return dl(
             'function(',
             namesub(getLambdaVar(ast)),
             ')\nreturn ',
             gen(getLambdaBody(ast)),
             '\nend')
       end,
       Leisure_apply = function(ast)
          return dl(
             gen(getApplyFunc(ast))
             '(',
             genApplyArg(getApplyFunc(ast))
             ')')
       end,
       Leisure_let = function(ast)
          return dl(
             '(function()\n',
             genLets(ast),
             ')()')
       end,
       Leisure_anno = function(ast)
          return gen(getAnnoBody(ast))
       end
    }

    function M.gen(ast)
       return M.join(gen(ast))
    end

    function gen(ast, res)
       if genTable[ast.__classname] then
          genTable[ast.__classname](ast, res)
       else
          push(res, "DUR? ", tostring(ast))
       end
    end
 end)

return M
