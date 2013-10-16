{
  resolve,
  lazy,
  defaultEnv,
} = root = module.exports = require './base'
rz = resolve
lz = lazy
{
  genSource,
} = require './gen'
{
  ENTER,
} = require './notebook'
{
  runMonad,
  isMonad,
} = require './runtime'
{
  getType,
} = require './ast'

delayedEval = (env, input, output, astOut)-> setTimeout (-> evalDiv input.text(), env, input, output, astOut), 1

configureCalc = (input, output, astOut)->
  env = write: (str)-> output.append str
  env.__proto__ = defaultEnv
  input[0].addEventListener 'DOMCharacterDataModified', ((evt)-> delayedEval env, input, output, astOut)
  input[0].addEventListener 'DOMSubtreeModified', ((evt)-> delayedEval env, input, output, astOut)

getParseErr = (x)-> x lz (value)->rz value

show = (obj)-> if L_show? then rz(L_show)(lz obj) else String(obj)

evalDiv = (text, env, input, output, astOut)->
  output.html ''
  astOut.html ''
  if text
    try
      result = rz(L_newParseLine)(lz 0)(L_nil)(lz text)
      runMonad result, env, (ast)->
        try
          if getType(ast) == 'parseErr'
            output.addClass 'err'
            output.html getParseErr ast
          else
            output.removeClass 'err'
            astOut.html rz(L_show) lz(runMonad rz(L_simplify) lz text)
            result = eval genSource text, ast
            output.html (if isMonad result then "(processing IO monad)" else '')
            runMonad result, env, (res)-> output.append show res
        catch err
          output.addClass 'err'
          output.html err.toString()
    catch err
      output.addClass 'err'
      output.html rz(L_err)(lz (err.stack ? err.toString()))
  else output.html ''

root.configureCalc = configureCalc
