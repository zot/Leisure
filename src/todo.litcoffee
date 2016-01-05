* TODO and agenda code for Leisure

    define ['./org', './docOrg', './editor', './editorSupport', 'lib/lodash.min', 'jquery'], (Org, DocOrg, Editor, EditorSupport, _, $)->
      {
        parseOrgMode
      } = Org
      {
        computeNewStructure
      } = Editor

      class Todo
        constructor: (@data, inputStates)->
          inputStates = inputStates || stdTodo
          @startState = inputStates.todo[0] || inputStates.done[0]
          @states = {}
          todoPat = ''
          prev = null
          for state in inputStates.todo.concat inputStates.done
            state.name = state.name.toUpperCase()
            @states[state.name] = state
            if prev
              state.prev = prev
              prev.next = state
            prev = state
            todoPat += "\\b#{state.name}\\b|"
          if prev
            @startState.prev = prev
            prev.next = @startState
          @statePat = new RegExp "^(\\*+ *)(#{todoPat})", 'i'
        shiftRight: (docPos, block)->
          block = @data.getBlock (block || @data.blockForOffset docPos)
          if block.type == 'headline'
            @cycleTodo block, true
            true
        shiftLeft: (docPos, block)->
          block = @data.getBlock (block || @data.blockForOffset docPos)
          if block.type == 'headline'
            @cycleTodo block, false
            true

Cycle the todo state for a headline

        cycleTodo: (block, forward)->
          if m = block.text.match @statePat
            next = if m[2]
              if forward then @states[m[2].toUpperCase()].next.name
              else @states[m[2].toUpperCase()].prev.name
            else if forward then @startState.name
            else @startState.prev.name
            newText = m[1] + next + (if !m[2] then ' ' else '') + block.text.substring m[0].length
            start = @data.offsetForBlock block
            @data.replaceText start, start + block.text.length, newText
        bind: (opts)->
          opts.bindings['S-RIGHT'] = (editor, e, r)=>
            if @shiftRight opts.editor.docOffset(r)
              e.originalEvent.stopPropagation()
              e.originalEvent.preventDefault()
          opts.bindings['S-LEFT'] = (editor, e, r)=>
            if @shiftLeft opts.editor.docOffset(r)
              e.originalEvent.stopPropagation()
              e.originalEvent.preventDefault()

      todoForEditor = (ed, todoDefs)-> new Todo(ed.options.data, todoDefs).bind ed.options

      stdTodo =
        todo: [
          name: 'TODO'
        ]
        done: [
          name: 'DONE'
        ]

      {
        Todo
        todoForEditor
      }
