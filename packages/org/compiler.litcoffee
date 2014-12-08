command to run test

require './compiler'
(require './compiler').reload()

    root = require?('./docOrg') ? Org

    {
      orgDoc,
      parseOrgMode,
    } = root

    {CoffeeScript:cs} = require './coffee-script'

    _L = require?('./lazy') ? Lazy

    yaml = require?('./yaml') ? Yaml

    ev = (str)-> eval str

    compile = (txt)->
      global.C = c = new Compiler txt.replace /\r\n/g, '\n'
      console.log c.dump()

    class Compiler
      constructor: (@text)->
        @org = parseOrgMode @text
        @org.linkNodes()
        @org.fixOffsets 0
        @doc = orgDoc @org
        @validate()
        @totalNewlines = []
        tot = 0
        @totalNewlines = (tot += cs.helpers.count block.text, '\n' for block in @doc)

      validate: ->
        offset = 0
        count = 0
        for block in @doc
          if block.offset != offset then console.log "Offset error in block ##{count}, expected #{offset} but got #{block.offset}"
          count++
          offset += block.text.length

      codeFor: (block)->
        start = block.offset + block.codePrelen
        @text.substring start, start + codeLength block

      lineOffsetFor: (obj, delta)-> @totalNewlines[@doc.indexOf(obj) - 1] ? 0

      codeOffsetFor: (block)->
        @lineOffsetFor(block) + cs.helpers.count block.text.substring(0, block.codePrelen), '\n'

      dump: ->
        output = ''
        fragment = 0
        count = 0
        for block in @doc
          if block.type == 'code'
            output += @dumpCode fragment, block, count
            fragment++
          count++
        output

      dumpCode: (fragment, block, count)->
        "Fragment #{fragment}, block #{count ? 0}: line #{@codeOffsetFor block}\n#{@codeFor block}\n"

    codeLength = (block)-> block.text.length - block.codePrelen - block.codePostlen

    test = ->
      for i in [0..5]
        console.log ''
      withTestFile compile
      null

    withTestFile = (cont)->
      if require?
        require('fs').readFile 'test/simple.lorg', (err, data)-> cont data.toString()
      else jQuery.get '/shadow.lorg', cont

    reload = ->
      for k of require.cache
        delete require.cache[k]
      require './compiler'
      null

    root.withTestFile = withTestFile
    root.test = test
    root.reload = reload
    root.ev = ev

    if require? then module.exports = root

    console.log 'compiler'
    setTimeout (->test()), 1
