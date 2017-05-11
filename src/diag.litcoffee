    'use strict'
    define ['./editor', './editorSupport'], (Editor, EditorSupport)->
      bindCount = 0

      {
        posFor
        last
        escapeHtml
      } = Editor
      {
        editorForToolbar
      } = EditorSupport

      errorDisplay = null

      getDiagShowing = (node)-> editorForToolbar(node).diag

      showDiag = (node, state)->
        editor = editorForToolbar(node)
        data = editor.options.data
        node = editor?.node
        editor.diag = state
        if state
          $(node).addClass 'diag'
          $(node).nextAll(".editorDiag").addClass 'diag'
          $(node).nextAll(".structure").addClass 'diag'
          setTimeout (-> editor.options.setDiagEnabled true), 1
          setTimeout (-> editor.options.data.setDiagEnabled true), 1
          editor.on 'moved', statusUpdate
          editor.on 'selection', statusUpdate
          editor.options
            .on 'diag', diagOptions
            .on 'render', diagRender
          data
            .on 'change', observeDataChange
            .on 'load', observeDataLoad
            .on 'diag', observeDataDiag
        else
          $(node).removeClass 'diag'
          $(node).nextAll(".editorDiag").removeClass 'diag'
          $(node).nextAll(".structure").removeClass 'diag'
          editor.options.setDiagEnabled false
          editor.options.data.setDiagEnabled false
          editor.off 'moved', statusUpdate
          editor.off 'selection', statusUpdate
          editor.options
            .off 'diag', diagOptions
            .off 'render', diagRender
          data
            .off 'change', observeDataChange
            .off 'load', observeDataLoad
            .off 'diag', observeDataDiag

      createEditorDisplay = (editor)->
        status = $("<div class='editorDiag'><div class='editorErrors'></div><div class='selectionInfo'>No selection</div></div>")
        editor.node.after(status)
        errors = status.find '.editorErrors'
        selection = status.find '.selectionInfo'

      statusUpdate = (editor)->
        {block, offset} = editor.getSelectedBlockRange()
        if block
          {line, col, blockLine, top, left} = lineInfo editor.options, block, offset
          if line
            return selection.html "line: #{numSpan line} col: #{numSpan col} block: #{block._id}:#{numSpan blockLine} top: #{numSpan top} left: #{numSpan left}"
        selection.html "No selection"

      diagOptions = (badBlocks)->
        $(editor.node).find('.error').removeClass 'error'
        for id in badBlocks ? []
          $(editor.options.nodeForId(id)).addClass 'error'
        if badBlocks?.length then errors.html "BAD BLOCKS: #{JSON.stringify badBlocks}"
        else errors.html ''

      diagRender = (editor, block)->
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

      observeDataChange = (changes)-> displayStructure data, blockDisplay

      observeDataLoad = -> displayStructure data, blockDisplay

      observeDataDiag = (badBlocks)->
        $(".structure").data badBlocks: badBlocks
        showStructureErrors()

      showStructureErrors = ->
        if errorDisplay
          if badBlocks = $('.structure').data().badBlocks
            errorDisplay.html "<b>BAD BLOCKS:</b> #{(b[0]+': '+b[1] for b in badBlocks).join ', '}"
            console.log "ADDING ERROR TO: " + (".structure.diag .#{b[0]}" for b in badBlocks).join ','
            $((".structure.diag .#{b[0]}" for b in badBlocks).join ',').addClass 'error'
          else errorDisplay.html ''

      diagMessage = (msg)->
        if errorDisplay then $(errorDisplay).html msg
        console.log msg

      displayStructure = (data, div)->
        $(div).html structureInfo(data).description
        showStructureErrors()

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
          desc += "<span class='#{cur._id}'>#{('   ' for i in [0...level]).join ''}#{cur._id} #{cur.type}#{checkStructure cur, bad}: #{escapeHtml JSON.stringify cur.text}\n</span>"
          if !cur.nextSibling then level = 0
          cur = data.getBlock cur.next
        levels: levels, description: desc

      checkStructure = (block, bad)->
        if bad.length
          ' <span class="err">[' + ("#{err}: #{block[err]}" for err in bad).join(', ') + ']</span>'
        else ''

      Object.assign Leisure, {
        showDiag
        getDiagShowing
      }

      {
        createStructureDisplay
        createEditorDisplay
        structureInfo
        showDiag
        getDiagShowing
        diagMessage
      }
