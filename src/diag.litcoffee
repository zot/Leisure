    define ['cs!./editor.litcoffee', 'cs!./editorSupport.litcoffee', 'cs!./export.litcoffee'], (Editor, EditorSupport, Exports)->
      bindCount = 0

      {
        posFor
        last
        escapeHtml
      } = Editor
      {
        editorForToolbar
      } = EditorSupport
      {
        mergeExports
      } = Exports

      getDiagShowing = (node)->
        $(editorForToolbar(node)?.node).nextAll(".selectionInfo").hasClass 'diag'

      showDiag = (node, state)->
        editor = editorForToolbar(node)
        node = editor?.node
        editor.diag = state
        if state
          $(node).addClass 'diag'
          $(node).nextAll(".editorDiag").addClass 'diag'
          $(node).nextAll(".structure").addClass 'diag'
          editor.options.setDiagEnabled true
          editor.options.data.setDiagEnabled true
        else
          $(node).removeClass 'diag'
          $(node).nextAll(".editorDiag").removeClass 'diag'
          $(node).nextAll(".structure").removeClass 'diag'
          editor.options.setDiagEnabled false
          editor.options.data.setDiagEnabled false

      createEditorDisplay = (editor)->
        status = $("<div class='editorDiag'><div class='editorErrors'></div><div class='selectionInfo'>No selection</div></div>")
        editor.node.after(status)
        errors = status.find '.editorErrors'
        selection = status.find '.selectionInfo'
        statusUpdate = =>
          {block, offset} = editor.getSelectedBlockRange()
          if block
            {line, col, blockLine, top, left} = lineInfo editor.options, block, offset
            if line
              return selection.html "line: #{numSpan line} col: #{numSpan col} block: #{block._id}:#{numSpan blockLine} top: #{numSpan top} left: #{numSpan left}"
          selection.html "No selection"
        editor.on 'moved', statusUpdate
        editor.on 'selection', statusUpdate
        editor.options
          .on 'diag', (badBlocks)->
            if badBlocks
              $(editor.node).addClass 'error'
              errors.html "BAD BLOCKS: #{JSON.stringify badBlocks}"
            else
              $(editor.node).removeClass 'error'
              errors.html ''
          .on 'render', (block)->
            if editor.diag then console.log "RENDER: #{block._id}"

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
          if p = posFor options.editor.domCursorForTextPosition(holder, offset)
            line: docLine
            col: col
            blockLine: line
            top: Math.round(p.top)
            left: Math.round(p.left)
          else {}
        else {}

      getBlockLine = (block, offset)->
        text = block.text.substring(0, offset)
        lines = text.split('\n')
        line: lines.length
        col: last(lines).length

      createStructureDisplay = (data, stop)->
        if !$(".structure").length
          div = $("<div class='structure'><div class='dataErrors'></div><div class='blocks'></div></div>")
          $(document.body).append div
          errorDisplay = div.find '.dataErrors'
          blockDisplay = div.find '.blocks'
          data
            .on 'change', (changes)-> displayStructure data, blockDisplay
            .on 'load', -> displayStructure data, blockDisplay
            .on 'diag', (badBlocks)->
              if badBlocks
                errorDisplay.html "<b>BAD BLOCKS:</b> #{JSON.stringify badBlocks}"
              else errorDisplay.html ''

      displayStructure = (data, div)->
        $(div).html escapeHtml structureInfo(data).description

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

      mergeExports {
        showDiag
        getDiagShowing
      }

      {
        createStructureDisplay
        createEditorDisplay
        structureInfo
        showDiag
        getDiagShowing
      }
