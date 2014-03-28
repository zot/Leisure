    root = module.exports = require './base'
    require './server'
    arg = 0
    dir = 'www'

    while arg < process.argv.length
      switch process.argv[arg]
        when '-d' then dir = process.argv[++arg]
      arg++
    root.createServer dir: dir
