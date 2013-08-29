URI = require './uri'

define 'read', ->(uri)->
  makeMonad (env, cont)->
    read new URI(uri()), ((data)-> cont _left()(laz data.toString())), (err)-> cont _right()(laz err.stack.toString())

define 'write', ->(uri)->(data)->
  makeMonad (env, cont)->
    write new URI(uri()), data(), (-> cont _left()(laz "success")), (err)-> cont _right()(laz err.stack.toString())

define 'forward', ->(name)->
  makeMonad (env, cont)->
    Leisure.defineForward name
    cont `_false()`
