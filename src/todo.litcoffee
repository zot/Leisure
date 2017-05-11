* TODO and agenda code for Leisure

    'use strict'
    define ['./org', './docOrg', './editor', './editorSupport', 'lodash', 'jquery'], (Org, DocOrg, Editor, EditorSupport, _, $)->
      {
        parseOrgMode
      } = Org
      {
        computeNewStructure
      } = Editor

      class Todo
        constructor: (@data, inputStates)->
          inputStates = inputStates || stdTodo
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
          @startState = inputStates.todo[0] || inputStates.done[0]
          if prev
            @endState = prev
          #  @startState.prev = prev
          #  prev.next = @startState
          @statePat = new RegExp "^(\\*+)( +(#{todoPat}) *)", 'i'
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
            state = m[2].trim()
            next = if state
              if forward then @states[state.toUpperCase()]?.next?.name || ''
              else @states[state.toUpperCase()]?.prev?.name || ''
            else if forward then @startState.name
            else @endState.name
            newText = m[1] + ' ' + next + (if next then ' ' else '') + block.text.substring m[0].length
            start = @data.offsetForBlock block
            @data.replaceText {start, end: start + block.text.length, text: newText, source: 'edit'}
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
