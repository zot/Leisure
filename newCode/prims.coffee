{
  resolve,
  lazy,
} = root = module.exports = require './base'

rz = resolve
lz = lazy

URI = require './uri'

define 'read', lz (uri)->
  makeMonad (env, cont)->
    read new URI(rz uri), ((data)-> cont rz(_left)(lz data.toString())), (err)-> cont _right()(lz err.stack.toString())

define 'write', lz (uri)->$F(arguments, (data)->
  makeMonad (env, cont)->
    write new URI(rz uri), rz(data), (-> cont rz(_left)(lz "success")), (err)-> cont rz(_right)(lz err.stack.toString()))

define 'forward', lz (name)->
  makeMonad (env, cont)->
    Leisure.defineForward name
    cont rz _false
