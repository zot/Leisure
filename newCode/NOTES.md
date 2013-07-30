locations marked with # Mark

convert to jQuery

ReplCore.processLine

ReplCore.generateCode

Prim.defaultEnv

Parse.print

Leisure.processDefs

Leisure.allowRedefsIn

Leisure.eval

Leisure.funcContextSource(funcName, offset)
  returns [src, start, end, func, ast]

Leisure.compileNext(line, globals, parseOnly, check, nomacros, namespace, debug)
  returns [ast, err, rest] -- err.leisureContext is a list (use Nil for now)

Leisure.findFuncs ast
  returns a differenceList of functions in the ast
  return empty list for now

asts have
  leisureName
  leisureCodeOffset
