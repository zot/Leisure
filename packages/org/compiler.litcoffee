command to run test

require './compiler'
(require './compiler').reload()

    root = require?('./docOrg') ? Org
    reloadAll = false

    {
      orgDoc,
      parseOrgMode,
    } = root
    {CoffeeScript:cs} = require?('./coffee-script') ? CoffeeScript
    _L = require?('./lazy') ? Lazy
    yaml = require?('./yaml') ? Yaml

Sourcemap is [here](https://github.com/mozilla/source-map/blob/master/lib/source-map/source-node.js):

    {sourceMap:{SourceNode, SourceMapGenerator, SourceMapConsumer}} = require?('./source-map.js') ? sourceMap

    # source map lines are 1-based, columns are 0-based
    compile = (txt, inputFile, outputFile)->
      global.C = c = new Compiler txt.replace(/\r\n/g, '\n'), inputFile, outputFile
      console.log c.dump()
      {code,map} = c.generate()
      if code
        console.log "js:", code
        console.log "map:", JSON.stringify map.toJSON()
      else ""

    test1 = ->
      {js, v3SourceMap} = cs.compile '3+4 ? 5', sourceMap: true
      global.SM = sm = JSON.parse v3SourceMap
      console.log "code:", js
      console.log "original:", JSON.stringify sm
      {map} = filterSourceMap js, sm, (chunk, loc)->
        console.log "chunk:", chunk
        if true # simple
          loc.line += 2
          loc
        else # deluxe
          {line, column, source, name} = loc
          new SourceNode line + 2, column, source, chunk, name
      console.log "\noffset2:", JSON.stringify map.toJSON()

    # filterSourceMap js, map, func -- filter a source map
    # js -- the generated JS code
    # map -- the source map
    # func chunk, loc -- a function that filters generated chunks
    #
    # returns
    #   code: the (possibly modified) generated js code
    #   map: the new source map
    #
    # Details for func chunk, loc:
    #   chunk -- a generated JS chunk
    #   loc -- the location of the source code that generated the chunk
    #
    #   returns either
    #     {line, column, source, name}
    #   or
    #     a SourceNode (allows func to alter chunk)
    #
    filterSourceMap = (js, map, func)->
      filterSourceNode(nodeForMap(js, map), func).toStringWithSourceMap map

    nodeForMap = (js, map)-> SourceNode.fromStringWithSourceMap js, new SourceMapConsumer map

    filterSourceNode = (node, func, args...)->
      if typeof func != 'function'
        result = func
        [func] = args
      else
        result = new SourceNode
      node.walk (chunk, loc)->
        newNode = func chunk, loc
        if !(newNode instanceof SourceNode)
          {line, column, source, name} = newNode
          newNode = new SourceNode line, column, source, chunk, name
        result.add newNode
      result

    trivialSourceNode = (offset, text, file)->
      node = new SourceNode
      line = 1 + offset
      col = 0
      for c in text
        node.add new SourceNode line, col, file, text
        if c == '\n'
          line++
          col = 0
        else col++
      node

    dataUrlFor = (text)-> "data:#{encodeURIComponent text}"

    makeControl = (node, control)->
      newNode = new SourceNode
      newNode.add [
        "module.controls[#{JSON.stringify control}] = function(){\n",
        node,
        "};\n"]
      newNode

    class Compiler
      constructor: (@text, @inputFile, @outputFile)->
        @org = parseOrgMode @text
        @org.linkNodes()
        @org.fixOffsets 0
        @doc = orgDoc @org
        @validate()
        @totalNewlines = []
        tot = 0
        @totalNewlines = (tot += cs.helpers.count block.text, '\n' for block in @doc)

      generate: ->
        node = @generateNode()
        if node.children.length
          #console.log "result:", node
          node.toStringWithSourceMap
            file: @outputFile
            sourceRoot: 'dir'
        else {}

      generateNode: ->
        node = new SourceNode()
        node.add """
          (function(module){
          """
        first = true
        for block in @doc
          if first then first = false else node.add ''
          node.add @compile block
        node.add "})(Leisure.registerFile(#{JSON.stringify @inputFile}));"
        node

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

      # each handler takes a block and returns a SourceNode
      handlers:
        coffee: (block)->
          options =
            sourceMap: true
            generatedFile: @outputFile
            sourceFiles: [@inputFile]
            sourceRoot: '\/'
          #console.log "block:", block
          if block.codeAttributes?
            if block.codeAttributes.results == 'def' then options.bare = true
            else if control = block.codeAttributes.control
              options.bare = true
          {js, v3SourceMap} = cs.compile @codeFor(block), options
          #console.log "code:", @codeFor block
          map = JSON.parse v3SourceMap
          #console.log "map:", map
          offset = @codeOffsetFor(block)
          node = nodeForMap js, map
          #console.log "node:", node
          result = filterSourceNode node, (chunk, loc)->
            #console.log "chunk[#{loc.line}:#{loc.column} #{loc.name}]: '#{chunk}'"
            if loc.line? then loc.line += offset
            else
              loc.line = 1
              loc.column = 0
            loc
          #console.log "result:", result
          if control then makeControl result, control
          else result
        html: (block)-> "module.html.push(#{JSON.stringify block.text});\n"
        css: (block)->
          code = @codeFor block
          node = trivialSourceNode @codeOffsetFor(block), code, @inputFile
          {map} = node.toStringWithSourceMap()
          mapUrl = dataUrlFor JSON.stringify map.toJSON()
          
          "module.css.push(#{JSON.stringify code + '\n/*# sourceMappingURL=' + mapUrl});\n"
        javascript: (block)->
          trivialSourceNode @codeOffsetFor(block), @codeFor(block), @inputFile

      compile: (block)->
        if (lang = block.language?.toLowerCase()) && f = @handlers[lang]
          f.call this, block
        else
          #console.log "lang:", lang
          #console.log "language:", block.language
          #console.log "block:", block
          []

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
        "#{fragment}: #{block.language}, block #{count ? 0}: line #{@codeOffsetFor block}\n"

    codeLength = (block)-> block.text.length - block.codePrelen - block.codePostlen

    test = ->
      withTestFile (txt, name)-> compile txt, name, 'output.js'
      null

    withTestFile = (cont)->
      if require?
        require('fs').readFile 'test/simple.lorg', (err, data)-> cont data.toString(), 'simple.lorg'
      else if window? then jQuery.get '/shadow.lorg', (data)-> cont data, 'shadow.lorg'

    reload = ->
      for k of require.cache
        if reloadAll then delete require.cache[k]
        else if k.indexOf('compiler') > -1
          delete require.cache[k]
          break
      require './compiler'
      null

    root.withTestFile = withTestFile
    root.test = test
    root.reload = reload
    root.Compiler = Compiler

    if require? then module.exports = root

    #console.log 'compiler'
    #if require? then setTimeout (->test()), 1
