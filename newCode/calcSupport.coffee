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
  define,
} = require './ast'

delayedEval = (env, input, output, simplified, ast, code)-> setTimeout (-> evalDiv input.text(), env, input, output, simplified, ast, code), 1

configureCalc = (input, output, simplified, ast, code)->
  env = write: (str)-> output.append str
  env.__proto__ = defaultEnv
  input[0].addEventListener 'DOMCharacterDataModified', ((evt)-> delayedEval env, input, output, simplified, ast, code)
  input[0].addEventListener 'DOMSubtreeModified', ((evt)-> delayedEval env, input, output, simplified, ast, code)

define 'svgMeasureText', (->(text)->Notebook?.svgMeasureText(text)), 2

getParseErr = (x)-> x lz (value)->rz value

show = (obj)-> if L_show? then rz(L_show)(lz obj) else String(obj)

evalDiv = (text, env, input, output, simplified, astDiv, code)->
  output.html ''
  simplified.html ''
  astDiv.html ''
  code.html ''
  if text
    try
      result = rz(L_newParseLine)(lz 0)(L_nil)(lz text)
      runMonad result, env, (ast)->
        try
          if getType(ast) == 'parseErr'
            output.addClass 'err'
            output.html "Parse error: #{getParseErr ast}"
          else
            output.removeClass 'err'
            simplified.html rz(L_show) lz(runMonad rz(L_simplify) lz text)
            js = genSource text, ast
            code.html js
            result = eval js
            output.html (if isMonad result then "(processing IO monad)" else '')
            runMonad result, env, (res)-> output.append show res
            try
              astDiv.html rz(L_wrappedTreeFor)(lz ast)(L_id)
            catch err
              console.log err.stack
        catch err
          output.addClass 'err'
          #output.html err.toString()
          output.html err.stack
          console.log err.stack
    catch err
      output.addClass 'err'
      output.addClass 'err'
      #output.html err.toString()
      output.html err.stack
      console.log err.stack
  else output.html ''

root.configureCalc = configureCalc
