{
  defaultEnv,
} = root = module.exports = require './base'

fs = require 'fs'

defaultEnv.readFile = (fileName, cont)-> fs.readFile fileName, encoding: 'utf8', cont

defaultEnv.writeFile = (fileName, data, cont)-> fs.writeFile fileName, data, (encoding: 'utf8'), cont
