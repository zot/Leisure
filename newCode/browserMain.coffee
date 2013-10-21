# Browserify uses this as the main program

window.marked = require './marked'
Leisure = exports = module.exports = require './base'
require './ast'
require './gen'
require './runtime'
require './generatedPrelude'
#URI = require './uri'
#console.log "URI: #{URI}"
require './std'
require './svg'
require './md'
require './calcSupport'
require './parseAst'
require './calcSkin'
require './calc'

#window.Notebook = nb = require './notebook'

#for k of window.Notebook
#  console.log k

for k, v of window.Leisure
  Leisure[k] = v

window.Leisure = Leisure
