    define ['cs!./editor.litcoffee'], (Editor)->

      bindCount = 0

      {
        posFor
        last
      } = Editor

      createEditorDisplay = (editor)->
        status = $("<div class='selectionInfo'>No selection</div>")
        editor.node.after(status)
        editor.on 'moved', =>
          {block, offset} = editor.getSelectedBlockRange()
          if block
            {line, col, blockLine, top, left} = lineInfo editor.options, block, offset
            if line
              return status.html "line: #{numSpan line} col: #{numSpan col} block: #{block._id}:#{numSpan blockLine} top: #{numSpan top} left: #{numSpan left}"
          status.html "No selection"

      numSpan = (n)-> "<span class='status-num'>#{n}</span>"

      lineInfo = (options, block, offset)->
        if block
          {line, col} = getBlockLine block, offset
          startBlock = block
          docLine = line
          while block.prev
            block = options.getBlock block.prev
            docLine += block.text.split('\n').length - 1
          holder = options.nodeForId startBlock._id
          p = posFor options.editor.domCursorForTextPosition(holder, offset)
          line: docLine
          col: col
          blockLine: line
          top: Math.round(p.top)
          left: Math.round(p.left)
        else {}

      getBlockLine = (block, offset)->
        text = block.text.substring(0, offset)
        lines = text.split('\n')
        line: lines.length
        col: last(lines).length

      createStructureDisplay = (data, stop)->
        if !$(".structure").length
          div = $("<div class='structure'></div>")
          $(document.body).append div
          data
            .on 'change', (changes)-> displayStructure data, div
            .on 'load', -> displayStructure data, div

      displayStructure = (data, div)-> $(div).html structureInfo(data).description

      structureInfo = (data)->
        parentStack = []
        levels = {}
        desc = ""
        level = 0
        cur = data.getBlock data.getFirst()
        prevParent = null
        checks = nextSibling: {}, previousSibling: {}, prev: {}
        check = cur
        prev = null
        while check
          checks.nextSibling[check.previousSibling] = check._id
          checks.previousSibling[check.nextSibling] = check._id
          checks.prev[check.next] = check._id
          prev = check
          check = data.getBlock check.next
        while cur
          bad = []
          if cur.nextSibling != checks.nextSibling[cur._id] then bad.push 'nextSibling'
          if cur.previousSibling != checks.previousSibling[cur._id] then bad.push 'previousSibling'
          if cur.prev != checks.prev[cur._id] then bad.push 'prev'
          if cur.previousSibling != cur.prev
            p = cur
            level = 0
            while p = data.parent p
              level++
          levels[cur._id] = level
          desc += "#{('   ' for i in [0...level]).join ''}#{cur._id} #{cur.type}#{checkStructure cur, bad}: #{JSON.stringify cur.text}\n"
          if !cur.nextSibling then level = 0
          cur = data.getBlock cur.next
        levels: levels, description: desc

      checkStructure = (block, bad)->
        if bad.length
          ' <span class="err">[' + ("#{err}: #{block[err]}" for err in bad).join(', ') + ']</span>'
        else ''

      {
        createStructureDisplay
        createEditorDisplay
        structureInfo
      }
