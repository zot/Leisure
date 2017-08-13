Connect to the Atom editor. Atom needs line/col coordinates so we need to Map
offsets <--> line/col.

    define ['lodash', './ui', './editor', './editorSupport', './diag', './eval', './advice', 'fingertree'], (_, UI, Editor, EditorSupport, Diag, Eval, Advice, Fingertree)->
      if !window.atomView then return configureAtom: ->
      {
        getDocumentParams
        basicDataFilter
      } = EditorSupport
      {
        Point
      } = parent.require 'atom'
      path = parent.require 'path'

      LINE_END = /\r\n|\r|\n/g
      NON_LEISURE_LINE_END = /\r\n|\r/g

      class AtomSupport
        changing: false
        constructor: (@opts, text)->
          textLines = text.split /\n/
          # console.log 'text lines', textLines
          # console.log 'text', text
          if _.last(textLines) == '' then textLines.pop()
          @atomLines = Fingertree.fromArray (line.length + 1 for line in textLines),
            identity: -> lines: 0, width: 0
            measure: (v)-> lines: 1, width: v
            sum: (a, b)-> lines: a.lines + b.lines, width: a.width + b.width
          @opts.data.addFilter
            __proto__: basicDataFilter
            replaceText: (data, {start, end, text, source})=>
              if source != 'atom'
                try
                  @changing = true
                  startOff = @atomOffset start
                  endOff = @atomOffset end
                  # console.log "Leisure replace #{start}, #{end}, #{text}"
                  # console.log "-> atom replace [#{startOff.row}, #{startOff.column}], [#{endOff.row}, #{endOff.column}], #{text}"
                  atomView.editor.setTextInBufferRange [startOff, endOff], text
                finally
                  @changing = false
        splitForLine: (line)-> @atomLines.split (m)-> m.lines > line
        atomOffset: (leisureOffset)->
          m = (@atomLines.split (m)-> m.width > leisureOffset)[0].measure()
          Point.fromObject [m.lines, leisureOffset - m.width]
        leisureOffset: (atomOffset)->
          p = Point.fromObject atomOffset
          @splitForLine(p.row)[0].measure().width + p.column
        handleAtomTextChanged: (e)->
          # console.log 'Atom text event', e
          start = @leisureOffset [e.start, 0]
          end = @leisureOffset [e.end + 1, 0]
          text = leisureText atomView.editor.getTextInRange [[e.start, 0], [e.end + 1 + (e.bufferDelta ? 0), 0]]
          if @opts.data.getDocSubstring(start, end) != text
            # console.log "-> Leisure replace#{if @changing then ' (index update only)' else ''}: ", {start, end, text}
            [first, rest] = @splitForLine e.start
            for i in [e.start..e.end]
              if rest.isEmpty() then break
              rest = rest.removeFirst()
            t = (if _.last(text) == '\n' then text.substring(0, text.length - 1) else text)
            for line in t.split LINE_END
              first = first.addLast line.length + 1
            @atomLines = first.concat rest
            if !@changing then @opts.replaceText {start, end, text, source: 'atom'}
          # else console.log 'Ignoring redundant event'


      leisureText = (text)-> text.replace NON_LEISURE_LINE_END, '\n'

      configureAtom = (opts, cont)->
        $(document).ready ->
          if document.location.search.length > 1 && !connected
            connected = true
            {connect:con} = getDocumentParams()
            if con
              u = new URL con
              if u.protocol == 'atom:' && m = u.pathname.match /^\/\/(.*)$/
                [ignore, editorId] = m
                # console.log "CONNECT TO ATOM EDITOR: #{editorId}", atomView, parent.atom
                text = atomView.editor.getText()
                window.atomSupport = new AtomSupport opts, leisureText text
                opts.loadName = "file:#{path.join atomView.editor.getDirectoryPath(), atomView.editor.getFileName()}"
                opts.load opts.loadName, leisureText text
                cont opts
                #opts.load 'atom', '* heading\n#+BEGIN_SRC leisure :results def\n3+4\n#+END_SRC\n'

      {
        configureAtom
      }
