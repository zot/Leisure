LeisureEditCore ([example editor](http://team-cthulhu.github.io/LeisureEditCore/examples/index.html))
===============
Copyright (C) 2015, Bill Burdick, Roy Riggs, TEAM CTHULHU

Licensed with ZLIB license (see "[License](#license)", below).

Welcome to LeisureEditCore!  Are you trying to make editable documents
that are more than just text editors or word processors?  This library
tries to make it easier to make interesting editable documents.  You
can find it on [Github](https://github.com/TEAM-CTHULHU/LeisureEditCore).
LeisureEditCore what [Leisure's](https://github.com/zot/Leisure)
editor, extracted out into a small HTML5 library.  LeisureEditCore is
pluggable with an options object that contains customization hooks.
Code and examples are in Coffeescript (a JS build is provided as a
convenience).

Basic Idea
==========

LeisureEditCore edits a doubly-linked list of newline-terminated text
"blocks" that can render as DOM nodes (and maybe in interesting ways!)

The rendered DOM tree contains the full text of the block list in the
proper order, along with ids from the blocks.  Some of the text may
not be visible and there may be a lot of items in the rendered DOM
that are not in the blocks.  Also, the rendered DOM may have a nested
tree-structure.

When the user makes a change, the editor:

  1. maps the cursor location in the DOM to the corresponding location in the blocks
  2. changes block text, regenerating part of the blocks
  3. rerenders the DOM corresponding to the changed blocks
  4. replaces the new DOM into the page

![Editor flow](editorFlow.png)

Of course the editor supports [custom key bindings](#defaultBindings).

Using/Installing LeisureEditCore
================================
Make sure your webpage loads the javascript files in the `build` directory.  Follow
the instructions below to use it.

[Here](http://team-cthulhu.github.io/LeisureEditCore/examples/index.html) is an example that edits org-mode text.

Blocks
------
  * `_id`: the block id
  * `text`: the text of the block
  * `prev`: the id of the previous block (optional)
  * `next`: the id of the next block (optional)
  * EXTRA STUFF: you can store whatever extra things you like in your text blocks

BlockOffsets
------------
{block: aBlock, offset: aNumber}
aBlock can be an id or a block

Editor (see below for more detailed documentation)
--------------------------------------------------
An instance of LeisureEditCore.  You must provide an HTML node to
contain the document contents and an options object to configure the
editor.

Editor options object (see below for more detailed documentation)
-----------------------------------------------------------------
DataStoreEditingOptions is the recommended options object but
you can also subclass BasicEditingOptions.

Data object (see below for more detailed documentation)
-------------------------------------------------------
Manages the document.  It's responsible for parsing text into blocks,
accessing the blocks, making changes, and converting between block
locations and document locations.

Basic usage
-----------
To use this in the recommended way...

1. The code uses AMD style and depends on 'lodash', 'fingertree', and 'immutable' which you will probably need to map.  This is so that if you are using any of these packages, you won't have to include them more than once.
1. Subclass DataStoreEditingOptions and provide a renderBlock(block) method
1. Subclass DataStore and provide a parseBlocks(text) method
1. Create an editor object with your options object on your data object
1. Call the load(name, text) method on your options object

Included packages
=================
- [DOMCursor](https://github.com/zot/DOMCursor) -- locating text in DOM trees
- [Advice](advice.litcoffee) -- method advice

Third-party packages we use (also included)
===========================================
- [lodash](https://lodash.com/) -- collection, FP, and async utilities
- [fingertree](https://github.com/qiao/fingertree.js) -- the swiss army knife of data structures
- [immutable](http://facebook.github.io/immutable-js) -- immutable data structures

Building
========
If you modify LeisureEditCore and want to build it, you can use the Cakefile.  It needs the
`which` npm package (`npm install which`).

<a name="license"></a>License
=============================
Licensed with ZLIB license.

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.

LeisureEditCore
===============
Create a LeisureEditCore object like this: `new LeisureEditCore editorElement, options`.

`editorElement` is the HTML element that you want to contain editable text.

`options` is an object that tells LeisureEditCore things like how to
convert text to a list of block objects (see below).  See
BasicEditingOptions and DataStoreEditingOptions for more info.

    define ['./domCursor', 'fingertree', 'immutable', './advice', 'lodash'], (DOMCursor, Fingertree, Immutable, Advice, _)->
      {
        selectRange,
      } = DOMCursor
      {
        Set
      } = Immutable
      {
        beforeMethod
        afterMethod
        changeAdvice
      } = Advice
      imbeddedBoundary = /.\b./
      maxLastKeys = 4
      BS = 8
      ENTER = 13
      DEL = 46
      TAB = 9
      LEFT = 37
      UP = 38
      RIGHT = 39
      DOWN = 40
      HOME = 36
      END = 35
      PAGEUP = 33
      PAGEDOWN = 34
      specialKeys = {}
      specialKeys[TAB] = 'TAB'
      specialKeys[ENTER] = 'ENTER'
      specialKeys[BS] = 'BS'
      specialKeys[DEL] = 'DEL'
      specialKeys[LEFT] = 'LEFT'
      specialKeys[RIGHT] = 'RIGHT'
      specialKeys[UP] = 'UP'
      specialKeys[DOWN] = 'DOWN'
      specialKeys[PAGEUP] = 'PAGEUP'
      specialKeys[PAGEDOWN] = 'PAGEDOWN'
      specialKeys[HOME] = 'HOME'
      specialKeys[END] = 'END'

Key funcs
---------

Basic functions used by [defaultBindings](#defaultBindings)

      useEvent = (e)->
        e.preventDefault()
        e.stopPropagation()

      keyFuncs =
        backwardChar: (editor, e, r)->
          useEvent e
          editor.moveSelectionBackward r
          false
        forwardChar: (editor, e, r)->
          useEvent e
          editor.moveSelectionForward r
          false
        previousLine: (editor, e, r)->
          useEvent e
          editor.moveSelectionUp r
          false
        nextLine: (editor, e, r)->
          useEvent e
          editor.moveSelectionDown r
          false
        stabilizeCursor: (editor, e, r)->
          setTimeout (-> editor.domCursorForCaret().moveCaret()), 1
          false

<a name="defaultBindings"></a>Default key bindings
--------------------------------------------------

These are the default bindings.  You can set the editor's bindings
property to this or your own object (which can inherit from this, of
course.)

      defaultBindings =
        #'C-S': keyFuncs.save
        'C-Z': -> alert 'UNDO not supported yet'
        'C-S-Z': -> alert 'REDO not supported yet'
        'C-Y': -> alert 'REDO not supported yet'
        'UP': keyFuncs.previousLine
        'DOWN': keyFuncs.nextLine
        'LEFT': keyFuncs.backwardChar
        'RIGHT': keyFuncs.forwardChar
        'HOME': keyFuncs.stabilizeCursor
        'END': keyFuncs.stabilizeCursor
        'C-HOME': keyFuncs.stabilizeCursor
        'C-END': keyFuncs.stabilizeCursor
        #'TAB': keyFuncs.expandTemplate
        #'C-C C-C': keyFuncs.swapMarkup
        #'M-C': keyFuncs.execute
        #'C-F': keyFuncs.forwardChar
        #'C-B': keyFuncs.backwardChar
        #'C-P': keyFuncs.previousLine
        #'C-N': keyFuncs.nextLine
        #'C-X C-F': keyFuncs.save
      dragRange = null

`idCounter`: id number for next created block

      idCounter = 0

Observable class
================

      class Observable
        constructor: ->
          @listeners = {}
          @suppressingTriggers = false
        on: (type, callback)->
          if typeof type == 'object'
            for type, callback of type
              @on type callback
          else
            if !@listeners[type] then @listeners[type] = []
            @listeners[type].push callback
          this
        off: (type, callback)->
          if typeof type == 'object'
            for callbackType, callback of type
              @off callbackType, callback
          else
            if @listeners[type]
              @listeners[type] = @listeners[type].filter (l)-> l != callback
          this
        trigger: (type, args...)->
          if !@suppressingTriggers
            for listener in @listeners[type] || []
              listener args...
        suppressTriggers: (func)->
          oldSuppress = @suppressingTriggers
          @suppressingTriggers = true
          try
            func()
          finally
            @suppressingTriggers = oldSuppress

FeatherJQ class
===============
A featherweight JQuery replacement.  Users can use set$ to make it use
the real jQuery, like this: `set$($, (obj)-> obj instanceof $)`

      class FeatherJQ extends Array
        constructor: (specs...)->
          results = []
          results.__proto__ = FeatherJQ.prototype
          for spec in specs
            results.pushResult spec
          return results
        find: (sel)->
          results = $()
          for node in this
            if node.querySelectorAll?
              for result in node.querySelectorAll(sel)
                results.push result
          results
        attr: (name, value)->
          if value?
            for node in this
              node.setAttribute name, value
            this
          else this[0]?getAttribute name
        prop: (name, value)->
          if value?
            for node in this
              node[name] = value
            this
          else this[0]?[name]
        closest: (sel)->
          result = $()
          for node in this
            if n = (if node.closest? then node else node.parentNode).closest sel
              result.push n
          result
        is: (sel)->
          for node in this
            if node.matches? sel then return true
          false
        parent: ->
          result = $()
          for node in this
            if p = node.parentNode then result.push p
          result
        data: (key, value)->
          if !key then getUserData this[0], true
          else if !value? then getUserData(this[0], true)?[key]
          else for node in this
            getUserData(node, true)[key] = value
            this
        on: (evtType, func)->
          for node in this
            evt = getEvents node
            if !evt[evtType]
              node.addEventListener evtType, runEvent
              evt[evtType] = []
            evt[evtType].push func
        off: (evtType, func)->
          for node in this when events = getEvents(node) && events[evtType]
            events = if func then (h for h in events[evtType] when h != func) else []
            if !events.length then delete events[evtType]
        pushResult: (spec)->
          if typeof spec == 'string'
            try
              @push document.querySelectorAll(spec)...
            catch err
              div = document.createElement 'div'
              div.innerHTML = html
              @push div.children...
          #else if spec instanceof FeatherJQ then @push spec...
          else if typeof spec == 'object' && spec.nodeName then @push spec
          else if typeof spec == 'object' && spec.prop then @push spec...
          else @push spec

      $ = FeatherJQ

      is$ = (obj)-> obj instanceof FeatherJQ || (obj.prop && obj.attr)

      set$ = (new$, is$Func)->
        $ = new$
        is$ = is$Func || is$

      FJQData = new WeakMap

      runEvent = (evt)->
        for handler in getEvents(evt.currentTarget) ? []
          handler evt
        null

      getNodeData = (node, create)->
        if create || FJQData.has node
          if !FJQData.has node then FJQData.set node, {}
          FJQData.get node

      getDataProperty = (node, prop, create)->
        if d = getNodeData node, create
          if !d[prop] then d[prop] = {}
          d[prop]

      getUserData = (node, create)-> if node then getDataProperty node, 'userData', create

      getEvents = (node, create)-> getDataProperty node, 'events', create

      $.ajax = ({url, success, data})->
        xhr = new XMLHttpRequest
        xhr.onreadystatechange = ->
            if xhr.readyState == XMLHttpRequest.DONE then success xhr.responseText
        xhr.open (if data then 'POST' else 'GET'), url, true
        xhr.send data

      $.get = (url, success)-> $.ajax {url, success}
        

LeisureEditCore class
=====================
Events:
  `moved`: the cursor moved

      class LeisureEditCore extends Observable
        constructor: (@node, @options)->
          super()
          @editing = false
          @node
            .attr 'contenteditable', 'true'
            .attr 'spellcheck', 'false'
          @node.data().editor = this
          @curKeyBinding = @prevKeybinding = null
          @bind()
          @lastKeys = []
          @modCancelled = false
          @clipboardKey = null
          @ignoreModCheck = 0
          @movementGoal = null
          @options.setEditor this
          @currentSelectedBlock = null
        editWith: (func)->
          @editing = true
          try
            func()
          finally
            @editing = false
        savePosition: (func)->
          if @editing then func()
          else
            pos = @getSelectedDocRange()
            try
              func()
            catch
              @selectDocRange pos
        getCopy: (id)-> copyBlock @options.getBlock id
        getText: -> @options.getText()
        blockForCaret: -> @blockForNode @domCursorForCaret().node
        blockForNode: (node)-> @options.getBlock @options.idForNode node
        blockNodeForNode: (node)-> @options.nodeForId @options.idForNode node
        blockTextForNode: (node)->
          parent = @blockNodeForNode(node)[0]
          if next = @options.getBlock(@options.idForNode node)?.next
            nextPos = @domCursorForText @options.nodeForId(next), 0
            @domCursorForText(parent, 0, parent).getTextTo nextPos
          else @domCursorForText(parent, 0, parent).getText()
        verifyNode: (node)->
          if typeof node == 'string' then node = @options.nodeForId node
          @blockTextForNode(node) == @options.getBlock(@options.idForNode node).text
        verifyAllNodes: ->
          badIds = []
          block = @options.getBlock @options.getFirst()
          while block
            if (node = @options.nodeForId(block._id)[0]) && !@verifyNode node
              badIds.push block._id
            block = @options.getBlock block.next
          if badIds.length then badIds
        domCursor: (node, pos)->
          if is$ node
            node = node[0]
            pos = pos ? 0
          else if node instanceof DOMCursor
            pos = node.pos
            node = node.node
          @options.domCursor(node, pos)
        domCursorForText: (node, pos, parent)->
          c = @domCursor node, pos
            .filterTextNodes()
            .firstText()
          if parent? then c.filterParent parent else c
        domCursorForTextPosition: (parent, pos, contain)->
          @domCursorForText parent, 0, (if contain then parent)
            .mutable()
            .forwardChars pos, contain
            .adjustForNewline()
        domCursorForCaret: ->
          sel = getSelection()
          if sel.type == 'None' then DOMCursor.emptyDOMCursor
          else
            r = sel.getRangeAt 0
            n = @domCursor r.startContainer, r.startOffset
              .mutable()
              .filterVisibleTextNodes()
              .filterParent @node[0]
              .firstText()
            if n.isEmpty() || n.pos <= n.node.length then n else n.next()
        getTextPosition: (parent, target, pos)->
          if parent
            targ = @domCursorForText target, pos
            if !@options.getContainer(targ.node) then targ = targ.prev()
            @domCursorForText parent, 0, parent
              .mutable()
              .countChars targ.node, targ.pos
          else -1
        loadURL: (url)-> $.get url, (text)=> @options.load url, text
        domCursorForDocOffset: (dOff)->
          bOff = @options.blockOffsetForDocOffset dOff
          node = @options.nodeForId bOff.block
          @domCursorForText(node, 0).mutable().forwardChars bOff.offset
        docOffsetForCaret: ->
          s = getSelection()
          if s.type == 'None' then -1
          else
            range = s.getRangeAt 0
            @docOffset range.startContainer, range.startOffset
        docOffsetForBlockOffset: (block, offset)->
          @options.docOffsetForBlockOffset block, offset
        docOffset: (node, offset)->
          if node instanceof Range
            offset = node.startOffset
            node = node.startContainer
          else if node instanceof DOMCursor
            offset = node.pos
            node = node.node
          if startHolder = @options.getContainer(node)
            @options.docOffsetForBlockOffset @options.idForNode(startHolder), @getTextPosition startHolder, node, offset
        getSelectedDocRange: ->
          s = getSelection()
          if s.type == 'None' then type: 'None'
          else
            range = s.getRangeAt 0
            if start = @docOffset range.startContainer, range.startOffset
              if s.type == 'Caret' then length = 0
              else
                end = @docOffset range.endContainer, range.endOffset
                length = Math.abs start - end
                start = Math.min start, end
              type: s.type
              start: start
              length: length
              scrollTop: @node[0].scrollTop
              scrollLeft: @node[0].scrollLeft
            else type: 'None'
        selectDocRange: (range)->
          if range.type != 'None' && !(start = @domCursorForDocOffset(range.start).save()).isEmpty()
            selectRange start.range(start.mutable().forwardChars range.length)
            @node[0].scrollTop = range.scrollTop
            @node[0].scrollLeft = range.scrollLeft
        getSelectedBlockRange: ->
          s = getSelection()
          if s.type != 'None' && p = @blockOffset s.getRangeAt(0)
            p.type = s.type
            p.length = @selectedText(s).length
            p
          else type: 'None'
        blockOffset: (node, offset)->
          if node instanceof Range
            offset = node.startOffset
            node = node.startContainer
          else if node instanceof DOMCursor
            offset = node.pos
            node = node.node
          if startHolder = @options.getContainer(node)
            block: @options.getBlock @options.idForNode startHolder
            offset: @getTextPosition startHolder, node, offset
        blockRangeForOffsets: (start, length)->
          {block, offset} = @options.getBlockOffsetForPosition start
          {block, offset, length, type: if length == 0 then 'Caret' else 'Range'}
        replace: (e, br, text, select)-> if br.type != 'None'
          @editWith =>
            start = @options.docOffsetForBlockOffset(br)
            pos = @getSelectedDocRange()
            text = text ? getEventChar e
            @options.replaceText {start, end: start + br.length, text, source: 'edit'}
            if select
              pos.type = if text.length == 0 then 'Caret' else 'Range'
              pos.length = text.length
            else
              pos.type = 'Caret'
              pos.length = 0
              pos.start += text.length
            @selectDocRange pos
        backspace: (event, sel, r)->
          if sel.type == 'Range' then return @cutText event
          holderId = @idAtCaret sel
          @currentBlockIds = [holderId]
          @handleDelete event, sel, false
        del: (event, sel, r)->
          if sel.type == 'Range' then return @cutText event
          holderId = @idAtCaret sel
          @currentBlockIds = [holderId]
          @handleDelete event, sel, true
        idAtCaret: (sel)-> @options.idForNode @options.getContainer(sel.anchorNode)
        selectedText: (s)->
          r = s.getRangeAt(0)
          if r.collapsed then ''
          else @domCursor(r.startContainer, r.startOffset).getTextTo @domCursor(r.endContainer, r.endOffset)
        cutText: (e)->
          useEvent e
          sel = getSelection()
          if sel.type == 'Range'
            html = _.map(sel.getRangeAt(0).cloneContents().childNodes, htmlForNode).join ''
            text = @selectedText sel
            @options.simulateCut html: html, text: text
            r = @getSelectedDocRange()
            @replace e, @getSelectedBlockRange(), ''
            @selectDocRange
              type: 'Caret'
              start: r.start
              length: 0
              scrollTop: r.scrollTop
              scrollLeft: r.scrollLeft
        handleDelete: (e, s, forward)->
          useEvent e
          r = @getSelectedDocRange()
          if r.type == 'None' || (r.type == 'Caret' && ((forward && r.start >= @options.getLength() - 1) || (!forward && r.start == 0)))
            return
          if r.type == 'Caret'
            r.length = 1
            if !forward then r.start -= 1
          @options.replaceText
            start: r.start
            end: r.start + r.length
            text: ''
            source: 'edit'
          @selectDocRange
            type: 'Caret'
            start: r.start
            length: 0
            scrollTop: r.scrollTop
            scrollLeft: r.scrollLeft
        bind: ->
          @bindDragAndDrop()
          @bindClipboard()
          @bindMouse()
          @bindKeyboard()
        bindDragAndDrop: ->
          @node.on 'dragover', (e)=>
            @options.dragOver e.originalEvent
            true
          @node.on 'dragenter', (e)=>
            @options.dragEnter  e.originalEvent
            true
          @node.on 'drop', (e)=>
            useEvent e
            oe = e.originalEvent
            oe.dataTransfer.dropEffect = 'move'
            r = document.caretRangeFromPoint oe.clientX, oe.clientY
            dropPos = @domCursor(r.startContainer, r.startOffset).moveCaret()
            dropContainer = @domCursor @options.getContainer(r.startContainer), 0
            blockId = @options.idForNode dropContainer.node
            offset = dropContainer.countChars dropPos
            insertText = oe.dataTransfer.getData('text/plain')
            insert = => @replace e, {type: 'Caret', offset, block: @options.getBlock(blockId), length: 0}, insertText, false
            if dragRange
              start = @domCursor(@options.nodeForId(dragRange.block._id), 0).forwardChars dragRange.offset
              r2 = start.range start.forwardChars dragRange.length
              insertOffset = @options.getPositionForBlock(@options.getBlock blockId) + offset
              cutOffset = @options.getPositionForBlock(dragRange.block) + dragRange.offset
              if cutOffset <= insertOffset <= cutOffset + dragRange.length
                useEvent oe
                oe.dataTransfer.dropEffect = 'none'
                return
              dr = dragRange
              dragRange = null
              if insertOffset <= cutOffset
                @replace e, dr, '', false
                @replace e, @blockRangeForOffsets(insertOffset, 0), insertText, false
              else
                insert()
                @replace e, @blockRangeForOffsets(cutOffset, dr.length), '', false
            else insert()
            true
          @node.on 'dragstart', (e)=>
            sel = getSelection()
            if sel.type == 'Range'
              dragRange = @getSelectedBlockRange()
              clipboard = e.originalEvent.dataTransfer
              clipboard.setData 'text/html', _.map(sel.getRangeAt(0).cloneContents().childNodes, htmlForNode).join ''
              clipboard.setData 'text/plain', @selectedText sel
              clipboard.effectAllowed = 'copyMove'
              clipboard.dropEffect = 'move'
            true
          @node[0].addEventListener 'dragend', (e)=>
            if dr = dragRange
              dragRange = null
              if e.dataTransfer.dropEffect == 'move'
                useEvent e
                sel = @getSelectedDocRange()
                @replace e, dr, ''
                @selectDocRange sel
        bindClipboard: ->
          @node.on 'cut', (e)=>
            useEvent e
            sel = getSelection()
            if sel.type == 'Range'
              clipboard = e.originalEvent.clipboardData
              clipboard.setData 'text/html', _.map(sel.getRangeAt(0).cloneContents().childNodes, htmlForNode).join ''
              clipboard.setData 'text/plain', @selectedText sel
              @replace e, @getSelectedBlockRange(), ''
          @node.on 'copy', (e)=>
            useEvent e
            sel = getSelection()
            if sel.type == 'Range'
              clipboard = e.originalEvent.clipboardData
              clipboard.setData 'text/html', _.map(sel.getRangeAt(0).cloneContents().childNodes, htmlForNode).join ''
              clipboard.setData 'text/plain', @selectedText sel
          @node.on 'paste', (e)=>
            useEvent e
            @replace e, @getSelectedBlockRange(), e.originalEvent.clipboardData.getData('text/plain'), false
        bindMouse: ->
          @node.on 'mousedown', (e)=>
            if @lastDragRange && e.originalEvent.detail == 2
              @dragRange = @lastDragRange
              console.log "double click"
              start = @domCursor(@dragRange).mutable()
              end = start.copy()
              txt = start.char()
              while true
                start.backwardChar()
                if !start.isEmpty() && start.type == 'text' then txt = start.char() + txt
                if start.isEmpty() || start.type != 'text' || txt.match imbeddedBoundary
                  #start.forwardChar()
                  break
              txt = end.char()
              while true
                end.forwardChar()
                if !end.isEmpty() && end.type == 'text' then txt += end.char()
                if end.isEmpty() || end.type != 'text' || txt.match imbeddedBoundary
                  end.backwardChar()
                  break
              s = getSelection()
              s.removeAllRanges()
              @dragRange.setStart start.node, start.pos
              @dragRange.setEnd end.node, end.pos
              s.addRange @dragRange
              e.preventDefault()
            else if @dragRange = @getAdjustedCaretRange e
              @domCursor(@dragRange).moveCaret()
              e.preventDefault()
            setTimeout (=>@trigger 'moved', this), 1
            @setCurKeyBinding null
          @node.on 'mouseup', (e)=>
            @lastDragRange = @dragRange
            @dragRange = null
            @adjustSelection e
            @trigger 'moved', this
          @node.on 'mousemove', (e)=>
            if @dragRange
              s = getSelection()
              s.removeAllRanges()
              s.addRange @dragRange
              r2 = @getAdjustedCaretRange e, true
              s.extend r2.startContainer, r2.startOffset
              e.preventDefault()
        getAdjustedCaretRange: (e, returnUnchanged) ->
          r = document.caretRangeFromPoint e.clientX, e.clientY
          r2 = @domCursor(r).backwardChar().range()
          rect1 = r.getBoundingClientRect()
          rect2 = r2.getBoundingClientRect()
          if rect1.top == rect2.top && rect1.bottom == rect2.bottom && rect2.left < rect1.left && e.clientX <= (rect1.left + rect2.left) / 2
            r2
          else if returnUnchanged then r
        bindKeyboard: ->
          @node.on 'keyup', (e)=> @handleKeyup e
          @node.on 'keydown', (e)=>
            @modCancelled = false
            c = eventChar e
            if !@addKeyPress e, c then return
            s = getSelection()
            r = s.rangeCount > 0 && s.getRangeAt(0)
            @currentBlockIds = @blockIdsForSelection s, r
            [bound, checkMod] = @findKeyBinding e, r
            if bound then @modCancelled = !checkMod
            else
              @modCancelled = false
              if c == ENTER then @enter e
              else if c == BS
                useEvent e
                @backspace e, s, r
              else if c == DEL
                useEvent e
                @del e, s, r
              else if (modifyingKey c, e) && !isAlphabetic e
                @char = getEventChar e
                @keyPress e
          @node.on 'keypress', (e)=> if !e.altKey && !e.metaKey && !e.ctrlKey then @keyPress e
        enter: (e)->
          useEvent e
          @replace e, @getSelectedBlockRange(), '\n', false
        keyPress: (e)->
          useEvent e
          @replace e, @getSelectedBlockRange(), null, false
        blockIdsForSelection: (sel, r)->
          if !sel then sel = getSelection()
          if sel.rangeCount == 1
            if !r then r = sel.getRangeAt 0
            blocks = if cont = @options.getContainer(r.startContainer)
              [@options.idForNode cont]
            else []
            if !r?.collapsed
              cur = blocks[0]
              end = @options.idForNode @options.getContainer(r.endContainer)
              while cur && cur != end
                if cur = (@getCopy cur).next
                  blocks.push cur
            blocks
        setCurKeyBinding: (f)->
          @prevKeybinding = @curKeyBinding
          @curKeyBinding = f
        addKeyPress: (e, c)->
          if notShift = !shiftKey c
            e.DE_editorShiftkey = true
            @lastKeys.push modifiers(e, c)
            while @lastKeys.length > maxLastKeys
              @lastKeys.shift()
            @keyCombos = new Array maxLastKeys
            for i in [0...Math.min(@lastKeys.length, maxLastKeys)]
              @keyCombos[i] = @lastKeys[@lastKeys.length - i - 1 ... @lastKeys.length].join ' '
            @keyCombos.reverse()
          notShift
        findKeyBinding: (e, r)->
          for k in @keyCombos
            if f = @options.bindings[k]
              @lastKeys = []
              @keyCombos = []
              @setCurKeyBinding f
              return [true, f this, e, r]
          @setCurKeyBinding null
          [false]
        handleKeyup: (e)->
          if @ignoreModCheck = @ignoreModCheck then @ignoreModCheck--
          if @clipboardKey || (!e.DE_shiftkey && !@modCancelled && modifyingKey(eventChar(e), e))
            @options.keyUp()
            @clipboardKey = null
        adjustSelection: (e)->
          if e.detail == 1 then return
          s = getSelection()
          if s.type == 'Range'
            r = s.getRangeAt 0
            pos = @domCursor r.endContainer, r.endOffset
              .mutable()
              .filterVisibleTextNodes()
              .firstText()
            while !pos.isEmpty() && pos.node != r.startContainer && pos.node.data.trim() == ''
              pos = pos.prev()
            while !pos.isEmpty() && pos.pos > 0 && pos.node.data[pos.pos - 1] == ' '
              pos.pos--
            if (pos.node != r.startContainer || pos.pos > r.startOffset) && (pos.node != r.endContainer || pos.pos < r.endOffset)
              r.setEnd pos.node, pos.pos
              selectRange r
        moveSelectionForward: -> @showCaret @moveForward()
        moveSelectionDown: -> @showCaret @moveDown()
        moveSelectionBackward: -> @showCaret @moveBackward()
        moveSelectionUp: -> @showCaret @moveUp()
        showCaret: (pos)->
          if pos.isEmpty() then pos = pos.prev()
          pos = @domCursorForCaret()
          pos.moveCaret()
          (if pos.node.nodeType == pos.node.TEXT_NODE then pos.node.parentNode else pos.node).scrollIntoViewIfNeeded()
          @trigger 'moved', this
        moveForward: ->
          sel = getSelection()
          offset = if sel.type == 'None' then 0
          else
            r = sel.getRangeAt(0)
            offset = if r.endContainer == r.startContainer
              @docOffset r.endContainer, Math.max r.startOffset, r.endOffset
            else @docOffset r.endContainer, r.endOffset
          start = pos = @domCursorForCaret().firstText().save()
          if !pos.isEmpty() && @options.isValidDocOffset(offset) && (@domCursorForCaret().firstText().equals(start) || DOMCursor.isCollapsed pos.node)
            pos = @domCursorForDocOffset offset
            while !pos.isEmpty() && (@domCursorForCaret().firstText().equals(start) || DOMCursor.isCollapsed pos.node)
              if DOMCursor.isCollapsed pos.node
                pos.next().moveCaret()
              else pos.forwardChars(1).moveCaret()
          if pos.isEmpty()
            offset = @options.getLength() - 1
            pos = @domCursorForDocOffset(offset).firstText()
            while !pos.isEmpty() && DOMCursor.isCollapsed pos.node
              pos = @domCursorForDocOffset --offset
          else if !@options.isValidDocOffset(offset)
            pos = start
          pos.moveCaret()
        moveBackward: ->
          sel = getSelection()
          offset = if sel.type == 'None' then 0
          else
            r = sel.getRangeAt(0)
            offset = if r.endContainer == r.startContainer
              @docOffset r.endContainer, Math.min r.startOffset, r.endOffset
            else @docOffset r.startContainer, r.startOffset
          start = pos = @domCursorForCaret().firstText().save()
          if !pos.isEmpty() && (@domCursorForCaret().firstText().equals(start) || DOMCursor.isCollapsed pos.node)
            pos = @domCursorForDocOffset offset
            while !pos.isEmpty() && (@domCursorForCaret().firstText().equals(start) || DOMCursor.isCollapsed pos.node)
              if DOMCursor.isCollapsed pos.node
                pos.prev()
              else pos.backwardChar().moveCaret()
          if pos.isEmpty()
            offset = 0
            pos = @domCursorForDocOffset(offset).firstText()
            while !pos.isEmpty() && DOMCursor.isCollapsed pos.node
              pos = @domCursorForDocOffset ++offset
          pos.moveCaret()
        firstText: -> @domCursor(@node, 0).firstText().node
        moveDown: ->
          linePos = prev = pos = @domCursorForCaret().save()
          if !(@prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine])
            @movementGoal = @options.blockColumn pos
            line = 0
          else line = (if pos.pos == 0 && pos.node == @firstText() && @options.blockColumn(pos) < @movementGoal then 1 else 0)
          lineTop = posFor(linePos).top
          lastPos = @docOffset(pos) - 1
          while !(pos = @moveForward()).isEmpty() && (docPos = @docOffset(pos)) != lastPos
            lastPos = docPos
            p = posFor(pos)
            if lineTop < p.top
              line++
              pos = linePos = p.pos
              lineTop = p.top
            if line == 2 then return prev.moveCaret()
            if line == 1 && @options.blockColumn(pos) >= @movementGoal
              return @moveToBestPosition pos, prev, linePos
            prev = pos
          pos
        moveUp: ->
          linePos = prev = pos = @domCursorForCaret().save()
          if !(@prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine]) then @movementGoal = @options.blockColumn pos
          line = 0
          lastPos = @options.getLength()
          while !(pos = @moveBackward()).isEmpty() && (docPos = @docOffset pos) != lastPos
            lastPos = docPos
            if linePos.differentLines pos
              line++
              linePos = pos
            if line == 2 then return prev.moveCaret()
            if line == 1 && @options.blockColumn(pos) <= @movementGoal
              return @moveToBestPosition pos, prev, linePos
            prev = pos
          pos

`moveToBestPosition(pos, prev, linePos)` tries to move the caret to the best position in the HTML text.  If pos is closer to the goal, return it, otherwise move to prev and return prev.

        moveToBestPosition: (pos, prev, linePos)->
          if linePos == pos || Math.abs(@options.blockColumn(pos) - @movementGoal) < Math.abs(@options.blockColumn(prev) - @movementGoal)
            pos
          else prev.moveCaret()

Set html of an element and evaluate scripts so that document.currentScript is properly set

        setHtml: (el, html, outer)->
          if outer
            prev = el.previousSibling
            next = el.nextSibling
            par = el.parentNode
            el.outerHTML = html
            el = prev?.nextSibling ? next?.previousSibling ? par?.firstChild
          else el.innerHTML = html
          @activateScripts $(el)
          el

        activateScripts: (jq)->
          if !activating
            activating = true
            try
              for script in jq.find('script')
                text = if !script.type || script.type.toLowerCase() == 'text/javascript'
                  script.textContent
                else if script.type.toLowerCase() == 'text/coffeescript'
                  CoffeeScript.compile script.textContent, bare: true
                else if script.type.toLowerCase() == 'text/literate-coffeescript'
                  CoffeeScript.compile script.textContent, bare: true, literate: true
                if text
                  newScript = document.createElement 'script'
                  newScript.type = 'text/javascript'
                  if script.src then newScript.src = script.src
                  newScript.textContent = text
                  @setCurrentScript newScript
                  script.parentNode.insertBefore newScript, script
                  script.parentNode.removeChild script
            finally
              @setCurrentScript null
              activating = false

        setCurrentScript: (script)->
          LeisureEditCore.currentScript = null

      eventChar = (e)-> e.charCode || e.keyCode || e.which

      isAlphabetic = (e)-> !e.altKey && !e.ctrlKey && !e.metaKey && (64 < eventChar(e) < 91)

BasicEditingOptions class
=========================
BasicEditingOptions is an the options base class.

Events:
  `load`: new text was loaded into the editor

Hook methods (required)
-----------------------

`renderBlock(block) -> [html, next]`: render a block (and potentially its children) and return the HTML and the next blockId if there is one

  * Block DOM (DOM for a block) must be a single element with the same id as the block.
  * Block DOM may contain nested block DOM.
  * each block's DOM should have the same id as the block and have a data-block attribute
  * non-editable parts of the DOM should have contenteditable=false
  * completely skipped parts should be non-editable and have a data-noncontent attribute

Properties of BasicEditingOptions
---------------------------------
* `blocks {id -> block}`: block table
* `first`: id of first block
* `bindings {keys -> binding(editor, event, selectionRange)}`: a map of bindings (can use LeisureEditCore.defaultBindings)

Methods of BasicEditingOptions
------------------------------
* `getBlock(id) -> block?`: get the current block for id
* `getContainer(node) -> Node?`: get block DOM node containing for a node
* `getFirst() -> blockId`: get the first block id
* `domCursor(node, pos) -> DOMCursor`: return a domCursor that skips over non-content
* `keyUp(editor) -> void`: handle keyup after-actions
* `topRect() -> rect?`: returns null or the rectangle of a toolbar at the page top
* `blockColumn(pos) -> colNum`: returns the start column on the page for the current block
* `load(el, text) -> void`: parse text into blocks and replace el's contents with rendered DOM

      class BasicEditingOptions extends Observable

        renderBlock: (block)-> throw new Error "options.renderBlock(block) is not implemented"

Hook methods (optional)
-----------------------

`simulateCut({html, text})`: The editor calls this when the user hits backspace or delete on selected text.

        simulateCut: ({html, text})->

`dragEnter(event)`: alter the drag-enter behavior.  If you want to cancel the drag, for
instance, call event.preventDefault() and set the dropEffect to 'none'

        dragEnter: (event)->
          if !event.dataTransfer.getData
            useEvent event
            event.dropEffect = 'none'

`dragOver(event)`: alter the drag-enter behavior.  If you want to cancel the drag, for
instance, call event.preventDefault() and set the dropEffect to 'none'

        dragOver: (event)->
          if !event.dataTransfer.getData
            useEvent event
            event.dropEffect = 'none'

Main code
---------

        constructor: ->
          super()
          @changeContext = null
          @initData()

        setDiagEnabled: (flag)->
          changeAdvice this, flag,
            renderBlocks: diag: wrapDiag
            changed: diag: wrapDiag
          if flag then @diag()

        diag: -> @trigger 'diag', @editor.verifyAllNodes()

        initData: ->

`blocks {id -> block}`: block table

          @blocks = {}

`first`: id of first block

          @first = null

`getFirst() -> blockId`: get the first block id

        getFirst: -> @first
        nodeForId: (id)-> $("##{id}")
        idForNode: (node)-> $(node).prop 'id'
        setEditor: (@editor)->
        newId: -> @data.newId()

`changeStructure(oldBlocks, newText)`: Compute blocks affected by transforming oldBlocks into newText

        changeStructure: (oldBlocks, newText)->
          computeNewStructure this, oldBlocks, newText
        mergeChangeContext: (obj)-> @changeContext = _.merge {}, @changeContext ? {}, obj
        clearChangeContext: -> @changeContext = null

`getBlock(id) -> block?`: get the current block for id

        getBlock: (id)-> @blocks[id]

`bindings {keys -> binding(editor, event, selectionRange)}`: a map of bindings (can use LeisureEditCore.defaultBindings)

        bindings: defaultBindings

`blockColumn(pos) -> colNum`: returns the start column on the page for the current block

        blockColumn: (pos)-> pos.textPosition().left

`topRect() -> rect?`: returns null or the rectangle of a toolbar at the page top

        topRect: -> null

`keyUp(editor) -> void`: handle keyup after-actions

        keyUp: ->

`domCursor(node, pos) -> DOMCursor`: return a domCursor that skips over non-content

        domCursor: (node, pos)->
          new DOMCursor(node, pos).addFilter (n)-> (n.hasAttribute('data-noncontent') && 'skip') || true

`getContainer(node) -> Node?`: get block DOM node containing for a node

        getContainer: (node)->
          if @editor.node[0].compareDocumentPosition(node) & Element.DOCUMENT_POSITION_CONTAINED_BY
            $(node).closest('[data-block]')[0]

`load(name, text) -> void`: parse text into blocks and trigger a 'load' event

        load: (name, text)->
          @options.suppressTriggers =>
            @options.data.suppressTriggers =>
              @replaceText {start: 0, end: @getLength(), text, source: 'edit'}
          @rerenderAll()
          @trigger 'load'
        rerenderAll: ->
          @editor.setHtml @editor.node[0], @renderBlocks()
          if result = @validatePositions()
            console.error "DISCREPENCY AT POSITION #{result.block._id}, #{result.offset},",
        blockCount: ->
          c = 0
          for b of @blocks
            c++
          c
        blockList: ->
          next = @getFirst()
          while next
            bl = @getBlock next
            next = bl.next
            bl
        docOffsetForBlockOffset: (bOff, offset)-> @data.docOffsetForBlockOffset bOff, offset
        blockOffsetForDocOffset: (dOff)-> @data.blockOffsetForDocOffset dOff
        getPositionForBlock: (block)->
          cur = @getBlock @getFirst()
          offset = 0
          while cur._id != block._id
            offset += cur.text.length
            cur = @getBlock cur.next
          offset
        getBlockOffsetForPosition: (pos)->
          cur = @getBlock @getFirst()
          while pos >= cur.text.length
            pos -= cur.text.length
            cur = @getBlock cur.next
          block: cur
          offset: pos
        renderBlocks: ->
          result = ''
          next = @getFirst()
          while next && [html, next] = @renderBlock @getBlock next
            result += html
          result
        getText: ->
          text = ''
          block = @data.getBlock @data.getFirst()
          while block
            text += block.text
            block = @data.getBlock block.next
          text
        getLength: ->
          len = 0
          block = @data.getBlock @data.getFirst()
          while block
            len += block.text.length
            block = @data.getBlock block.next
          len
        isValidDocOffset: (offset)-> 0 <= offset <= @getLength()
        validatePositions: ->
          block = @data.getBlock @data.getFirst()
          while block
            if node = @nodeForId(block._id)[0]
              cursor = @domCursor(node, 0).mutable()
              for offset in [0...block.text.length]
                cursor = cursor.firstText()
                if cursor.isEmpty() || !sameCharacter cursor.character(), block.text[offset]
                  return {block, offset}
                cursor.forwardChar()
            block = @data.getBlock block.next

      spaces = String.fromCharCode( 32, 160)

      sameCharacter = (c1, c2)-> c1 == c2 || ((c1 in spaces) && (c2 in spaces))

      computeNewStructure = (access, oldBlocks, newText)->
        prev = oldBlocks[0]?.prev ? 0
        oldBlocks = oldBlocks.slice()
        oldText = null
        offset = 0
        if oldBlocks.length
          while oldText != newText && (oldBlocks[0].prev || last(oldBlocks).next)
            oldText = newText
            if prev = access.getBlock oldBlocks[0].prev
              oldBlocks.unshift prev
              newText = prev.text + newText
              offset += prev.text.length
            if next = access.getBlock last(oldBlocks).next
              oldBlocks.push next
              newText += next.text
            newBlocks = access.parseBlocks newText
            if (!prev || prev.text == newBlocks[0].text) && (!next || next.text == last(newBlocks).text)
              break
        if !newBlocks then newBlocks = access.parseBlocks newText
        while oldBlocks.length && newBlocks.length && oldBlocks[0].text == newBlocks[0].text
          offset -= oldBlocks[0].text.length
          prev = oldBlocks[0]._id
          oldBlocks.shift()
          newBlocks.shift()
        while oldBlocks.length && newBlocks.length && last(oldBlocks).text == last(newBlocks).text
          oldBlocks.pop()
          newBlocks.pop()
        oldBlocks: oldBlocks, newBlocks: newBlocks, offset: offset, prev: prev

      copyBlock = (block)-> if !block then null else Object.assign {}, block

      activating = false

DataStore
=========
An efficient block storage mechanism used by DataStoreEditingOptions

Hook methods -- you must define these in your subclass
------------------------------------------------------
* `parseBlocks(text) -> blocks`: parse text into array of blocks -- DO NOT provide _id, prev, or next, they may be overwritten!

Events
------
Data objects support the Observable protocol and emit change events in response to data changes

`change {adds, updates, removes, oldFirst, old}`

  * `oldFirst id`: the previous first (might be the same as the current)
  * `adds {id->true}`: added items
  * `updates {id->true}`: updated items
  * `removes {id->true}`: removed items
  * `old {id->old block}`: the old items from updates and removes

Internal API -- provide/override these if you want to change how the store accesses data
----------------------------------------------------------------------------------------

* `getFirst()`
* `setFirst(firstId)`
* `getBlock(id)`
* `setBlock(id, block)`
* `deleteBlock(id)`
* `eachBlock(func(block [, id]))` -- iterate with func (exit if func returns false)
* `load(first, blocks)` -- should trigger 'load'

External API -- used from outside; alternative data objects must support these methods.
---------------------------------------------------------------------------------------

In addition to the methods below, data objects must support the Observable protocol and emit
change events in response to data changes

* `getFirst() -> id`: id of the first block
* `getBlock(id) -> block`: the block for id
* `load(name, text)`: replace the current document
* `newId()`:
* `docOffsetForBlockOffset(args...) -> offset`: args can be a blockOffset or block, offset
* `blockOffsetForDocOffset(offset) -> blockOffset`: the block offset for a position in the document
* `suppressTriggers(func) -> func's return value`: suppress triggers while executing func (inherited from Observable)

<!-- -->

      class DataStore extends Observable
        constructor: ->
          super()
          @blocks = {}
          @blockIndex = @newBlockIndex()
          @changeCount = 0
          @clearMarks()
          @markNames = {}
        load: (name, text)->
          blockMap = {}
          newBlocks = @parseBlocks text
          for block, i in newBlocks
            block._id = @newId()
            blockMap[block._id] = block
            if prev = newBlocks[i - 1]
              prev.next = block._id
              block.prev = prev._id
          @first = newBlocks[0]?._id
          @blocks = blockMap
          @makeChanges =>
            @indexBlocks()
            @trigger 'load'

`parseBlocks(text) -> blocks`: parse text into array of blocks -- DO NOT provide _id, prev, or next, they may be overwritten!

        parseBlocks: (text)-> throw new Error "options.parseBlocks(text) is not implemented"

        newBlockIndex: (contents)-> Fingertree.fromArray contents ? [],
          identity: -> ids: Set(), length: 0
          measure: (v)-> ids: Set([v.id]), length: v.length
          sum: (a, b)-> ids: a.ids.union(b.ids), length: a.length + b.length
        newId: -> "block#{idCounter++}"
        setDiagEnabled: (flag)->
          changeAdvice this, flag,
            makeChanges: diag: afterMethod ->
              if @changeCount == 0 then @diag()
          if flag then @diag()

`getLength() -> number`: the length of the entire document

        getLength: -> @blockIndex.measure().length
        makeChanges: (func)->
          @changeCount++
          try
            func()
          finally
            @changeCount--
        clearMarks: -> @marks = Fingertree.fromArray [],
          identity: -> names: Set(), length: 0
          measure: (n)-> names: Set([n.name]), length: n.offset
          sum: (a, b)-> names: a.names.union(b.names), length: a.length + b.length
        addMark: (name, offset)->
          if @markNames[name] then @removeMark name
          @markNames[name] = true
          [first, rest] = @marks.split (m)-> m.length >= offset
          l = first.measure().length
          if !rest.isEmpty()
            n = rest.peekFirst()
            rest = rest.removeFirst().addFirst
              offset: l + n.offset - offset
              name: n.name
          @marks = first.concat rest.addFirst
            offset: offset - l
            name: name
        removeMark: (name)-> if @markNames[name]
          delete @markNames[name]
          [first, rest] = @marks.split (m)-> m.names.contains name
          if !rest.isEmpty()
            removed = rest.peekFirst()
            rest = rest.removeFirst()
            if !rest.isEmpty()
              n = rest.peekFirst()
              rest = rest.removeFirst()
                .addFirst offset: removed.offset + n.offset, name: n.name
          @marks = first.concat rest
        listMarks: ->
          m = []
          t = @marks
          while !t.isEmpty()
            n = t.peekFirst()
            m.push _.defaults {location: @getMarkLocation n.name}, n
            t = t.removeFirst()
          m
        getMarkLocation: (name)-> if @markNames[name]
          [first, rest] = @marks.split (m)-> m.names.contains name
          if !rest.isEmpty() then first.measure().length + rest.peekFirst().offset
        blockOffsetForMark: (name)-> if offset = @getMarkLocation name
          @blockOffsetForDocOffset offset
        floatMarks: (start, end, newLength)-> if newLength != oldLength = end - start
          [first, rest] = @marks.split (m)-> m.length > start
          if !rest.isEmpty()
            n = rest.peekFirst()
            @marks = first.concat rest.removeFirst().addFirst
              name: n.name
              offset: n.offset + newLength - oldLength
        replaceText: ({start, end, text})->
          {prev, oldBlocks, newBlocks} = @changesForReplacement start, end, text
          if oldBlocks
            @change @changesFor prev, oldBlocks.slice(), newBlocks.slice()
            @floatMarks start, end, text.length
        changesForReplacement: (start, end, text)->
          {blocks, newText} = @blockOverlapsForReplacement start, end, text
          {oldBlocks, newBlocks, offset, prev} = change = computeNewStructure this, blocks, newText
          if oldBlocks.length || newBlocks.length then change else {}
        computeRemovesAndNewBlockIds: (oldBlocks, newBlocks, newBlockMap, removes)->
          for oldBlock in oldBlocks[newBlocks.length...oldBlocks.length]
            removes[oldBlock._id] = oldBlock
          prev = null
          for newBlock, i in newBlocks
            if oldBlock = oldBlocks[i]
              newBlock._id = oldBlock._id
              newBlock.prev = oldBlock.prev
              newBlock.next = oldBlock.next
            else
              newBlock._id = @newId()
              if prev then link prev, newBlock
            prev = newBlockMap[newBlock._id] = newBlock
          prev
        patchNewBlocks: (first, oldBlocks, newBlocks, changes, newBlockMap, removes, prev)->
          if !oldBlocks.length && first = @getBlock first
            oldNext = @getBlock first.next
            oldBlocks.unshift first
            first = newBlockMap[first._id] = copyBlock first
            link first, newBlocks[0]
            newBlocks.unshift first
            if oldNext
              oldBlocks.push oldNext
              oldNext = newBlockMap[oldNext._id] = copyBlock oldNext
              link last(newBlocks), oldNext
              newBlocks.push oldNext
          else if oldBlocks.length != newBlocks.length
            if !prev && prev = copyBlock oldPrev = @getBlock oldBlocks[0].prev
              oldBlocks.unshift oldPrev
              newBlocks.unshift prev
              newBlockMap[prev._id] = prev
            lastBlock = last oldBlocks
            if next = copyBlock oldNext = @getBlock (if lastBlock then lastBlock.next else @getFirst())
              oldBlocks.push oldNext
              newBlocks.push next
              newBlockMap[next._id] = next
              if !(next.prev = prev?._id) then changes.first = next._id
            if prev
              if !first && ((newBlocks.length && !newBlocks[0].prev) || !oldBlocks.length || !@getFirst() || removes[@getFirst()])
                changes.first = newBlocks[0]._id
              prev.next = next?._id
        changesFor: (first, oldBlocks, newBlocks)->
          newBlockMap = {}
          removes = {}
          changes = {removes, sets: newBlockMap, first: @getFirst(), oldBlocks, newBlocks}
          prev = @computeRemovesAndNewBlockIds oldBlocks, newBlocks, newBlockMap, removes
          @patchNewBlocks first, oldBlocks, newBlocks, changes, newBlockMap, removes, prev
          @removeDuplicateChanges newBlockMap
          changes
        removeDuplicateChanges: (newBlockMap)->
          dups = []
          for id, block of newBlockMap
            if (oldBlock = @getBlock id) && block.text == oldBlock.text && block.next == oldBlock.next && block.prev == oldBlock.prev
              dups.push id
          for id of dups
            delete newBlockMap[id]
        checkChanges: -> if @changeCount == 0
          throw new Error "Attempt to make a change outside of makeChanges"
        setIndex: (i)->
          @checkChanges()
          @blockIndex = i
        getFirst: -> @first
        setFirst: (firstId)-> @first = firstId
        getBlock: (id)-> @blocks[id]
        setBlock: (id, block)->
          @checkChanges()
          @blocks[id] = block
          @indexBlock block
        deleteBlock: (id)->
          @checkChanges()
          delete @blocks[id]
          @unindexBlock id
        eachBlock: (func)->
          block = @getBlock @getFirst()
          while block && func(block, block._id) != false
            block = @getBlock block.next
          null
        indexBlocks: ->
          @checkChanges()
          items = []
          @eachBlock (block)=> items.push indexNode block
          @setIndex @newBlockIndex items
        splitBlockIndexOnId: (id)-> @blockIndex.split (m)-> m.ids.contains id
        splitBlockIndexOnOffset: (offset)-> @blockIndex.split (m)-> m.length > offset
        indexBlock: (block)-> if block
          @checkChanges()
          # if the block is indexed, it might be an easy case, otherwise unindex it
          [first, rest] = @splitBlockIndexOnId block._id
          if !rest.isEmpty() && rest.peekFirst().id == block._id &&
            (next = rest.removeFirst()) &&
            (if next.isEmpty() then !block.next else next.peekFirst().id == block.next) &&
            (if first.isEmpty() then !block.prev else first.peekLast().id == block.prev)
              return @setIndex first.addLast(indexNode block).concat next
          if !rest.isEmpty() then @unindexBlock block._id
          # if next is followed by prev, just insert the block in between
          if (split = @fingerNodeOrder(block.prev, block.next)) && _.isArray split
            [first, rest] = split
            return @setIndex first.addLast(indexNode block).concat rest
          # repair as much of the index as possible and insert the block
          @insertAndRepairIndex block
        fingerNode: (id)->
          id && (node = @splitBlockIndexOnId(id)[1].peekFirst()) && node.id == id && node
        fingerNodeOrder: (a, b)->
          return !(a || b) ||
          if !a && b then @fingerNode b
          else if !b && a then @fingerNode a
          else
            [first, rest] = split = @splitBlockIndexOnId b
            !first.isEmpty() && !rest.isEmpty() && rest.peekFirst()?.id == b && first.peekLast()?.id == a && split
        # insert block into the index
        # then trace forwards and backwards, repairing along the way
        insertAndRepairIndex: (block)->
          console.warn "REPAIR"
          node = indexNode block
          if block.next
            prev = @getBlock block.prev
            if !block.prev
              @setIndex @blockIndex.addFirst indexNode block
            else
              [first, rest] = @splitBlockIndexOnId block.next
              @setIndex first.addLast(node).concat rest
          else if block.prev
            [first, rest] = @splitBlockIndexOnId block.prev
            @setIndex first.addLast(node).concat rest
          else @setIndex @newBlockIndex [node]
          mark = block
          cur = @getBlock block.next
          while cur && !@fingerNodeOrder mark._id, cur._id
            @unindexBlock cur._id
            [first, rest] = @splitBlockIndexOnId mark._id
            @setIndex insertAfterSplit first, indexNode(cur), rest
            mark = cur
            cur = @getBlock cur.next
          mark = block
          cur = @getBlock block.prev
          while cur && !@fingerNodeOrder cur._id, mark._id
            @unindexBlock cur._id
            [first, rest] = @splitBlockIndexOnId mark._id
            @setIndex insertInSplit first, indexNode(cur), rest
            mark = cur
            cur = @getBlock cur.prev
        unindexBlock: (id)->
          @checkChanges()
          if id
            [first, rest] = @splitBlockIndexOnId id
            if rest.peekFirst()?.id == id
              @setIndex first.concat rest.removeFirst()

`docOffsetForBlockOffset(args...) -> offset`: args can be a blockOffset or block, offset

        docOffsetForBlockOffset: (block, offset)->
          if typeof block == 'object'
            offset = block.offset
            block = block.block
          @offsetForBlock(block) + offset
        blockOffsetForDocOffset: (offset)->
          results = @splitBlockIndexOnOffset offset
          if !results[1].isEmpty()
            block: results[1].peekFirst().id
            offset: offset - results[0].measure().length
          else
            block: results[0].peekLast().id
            offset: results[0].removeLast().measure().length
        offsetForBlock: (blockOrId)->
          id = if typeof blockOrId == 'string' then blockOrId else blockOrId._id
          if @getBlock id then @splitBlockIndexOnId(id)[0].measure().length else 0
        blockForOffset: (offset)->
          results = @splitBlockIndexOnOffset offset
          (results[1]?.peekFirst() ? results[0].peekLast).id
        getDocLength: -> @blockIndex.measure().length
        getDocSubstring: (start, end)->
          startOffset = @blockOffsetForDocOffset start
          endOffset = @blockOffsetForDocOffset end
          block = @getBlock startOffset.block
          text = ''
          while block._id != endOffset.block
            text += block.text
            block = @getBlock block.next
          if startOffset.block == endOffset.block
            block.text.substring startOffset.offset, endOffset.offset
          else text.substring(startOffset.offset) + block.text.substring 0, endOffset.offset

`getText(): -> string`: the text for the entire document

        getText: ->
          text = ''
          @eachBlock (block)-> text += block.text
          text
        check: ->
          seen = {}
          first = next = @getFirst()
          prev = null
          while next
            prev = next
            if seen[next] then throw new Error "cycle in next links"
            seen[next] = true
            oldBl = bl
            bl = @getBlock next
            if !bl then throw new Error "Next of #{oldBl._id} doesn't exist"
            next = bl.next
          @eachBlock (block)->
            if block._id != first && !seen[block._id] then throw new Error "#{block._id} not in next chain"
          seen = {}
          lastBlock = prev
          while prev
            if seen[prev] then throw new Error "cycle in prev links"
            seen[prev] = true
            oldBl = bl
            bl = @getBlock prev
            if !bl then throw new Error "Prev of #{oldBl._id} doesn't exist"
            prev = bl.prev
          @eachBlock (block)->
            if block._id != lastBlock && !seen[block._id] then throw new Error "#{block._id} not in prev chain"
          null
        blockList: ->
          next = @getFirst()
          while next
            bl = @getBlock next
            next = bl.next
            bl
        change: (changes)-> @trigger 'change', @makeChange changes
        makeChange: ({first, sets, removes, oldBlocks, newBlocks})->
          @makeChanges =>
            {adds, updates, old} = result = {adds: {}, updates: {}, removes, old: {}, sets, oldFirst: @getFirst(), first: first, oldBlocks, newBlocks}
            @setFirst first
            for id of removes
              if bl = @getBlock id
                old[id] = bl
                @deleteBlock id
            for id, block of sets
              if bl = @getBlock id
                old[id] = bl
                updates[id] = block
              else adds[id] = block
              @setBlock id, block
            try
              @check()
            catch err
              console.log err
            result
        indexArray: -> treeToArray @blockIndex
        blockArray: ->
          blocks = []
          block = @getBlock @getFirst()
          while block
            blocks.push block
            block = @getBlock block.next
          blocks
        diag: -> @trigger 'diag', @verifyIndex()
        verifyIndex: ->
          iArray = @indexArray()
          treeIds = _.map iArray, _.property 'id'
          bArray = @blockArray()
          blockIds = _.map bArray, _.property '_id'
          if !_.isEqual treeIds, blockIds
            console.warn "INDEX ERROR:\nEXPECTED: #{JSON.stringify blockIds}\nBUT GOT: #{JSON.stringify treeIds}"
          last = null
          errs = new BlockErrors()
          for node in iArray
            if node.length != @getBlock(node.id)?.text.length
              errs.badId node.id, 'bad index length'
          offset = 0
          @eachBlock (block)=>
            last = block
            if !@fingerNodeOrder block.prev, block._id
              errs.badId block._id, 'bad order'
              console.warn "NODE ORDER WRONG FOR #{block.prev}, #{block._id}"
            if offset != @offsetForBlock block._id
              errs.badId block._id, "offset"
            if block.prev && @blockForOffset(offset - 1) != block.prev
              errs.badId block._id, "prev"
            if block.next && @blockForOffset(offset + block.text.length) != block.next
              errs.badId block._id, "next"
            offset += block.text.length
          errs.errors()
        blockOverlapsForReplacement: (start, end, text)->
          startBlock = @getBlock @blockForOffset(start)
          if !startBlock && start then startBlock = @getBlock @blockForOffset(start - 1)
          endBlock = @getBlock @blockForOffset end
          if !endBlock && end then endBlock = @getBlock @blockForOffset(end - 1)
          blocks = [startBlock]
          cur = startBlock
          while cur != endBlock && cur.next
            blocks.push cur = @getBlock cur.next
          fullText = blockText blocks
          offset = @offsetForBlock blocks[0]
          blocks: blocks
          blockText: fullText
          newText: fullText.substring(0, start - offset) + text + (fullText.substring end - offset)

      class BlockErrors
        constructor: ->
          @order = []
          @ids = {}
        isEmpty: -> !@order.length
        badId: (id, msg)->
          if !@ids[id]
            @order.push id
            @ids[id] = msg
          else @ids[id] += ", #{msg}"
        errors: -> if !@isEmpty() then [id, "(#{@ids[id]})"] for id in @order

      treeToArray = (tree)->
        nodes = []
        while !tree.isEmpty()
          nodes.push tree.peekFirst()
          tree = tree.removeFirst()
        nodes

      indexNode = (block)-> id: block._id, length: block.text.length

      insertInSplit = (first, middle, rest)->
        if first.isEmpty() then rest.addFirst middle
        else if rest.isEmpty() then first.addLast middle
        else first.addLast(middle).concat rest

      insertAfterSplit = (first, afterMiddle, rest)->
        next = rest.removeFirst().addFirst(afterMiddle)
        if first.isEmpty() then next.addFirst rest.peekFirst()
        else first.addLast(rest.peekFirst()).concat next

DataStoreEditingOptions
=======================

      class DataStoreEditingOptions extends BasicEditingOptions
        constructor: (@data)->
          super()
          @callbacks = {}
          @addDataCallbacks
            change: (changes)=> @dataChanged changes
            load: => @dataLoaded()
        addDataCallbacks: (cb)->
          for type, func of cb
            @data.on type, @callbacks[type] = func
        dataChanged: (changes)-> preserveSelection => @changed changes
        dataLoaded: -> @trigger 'load'
        cleanup: -> @data.off @callbacks
        initData: ->
        load: (name, text)-> @data.load name, text
        replaceText: (repl)-> @data.replaceText repl
        getBlock: (id)-> @data.getBlock id
        getFirst: (first)-> @data.getFirst()
        change: (changes)-> if changes then @data.change changes
        changed: (changes)-> @rerenderAll()
        offsetForBlock: (blockOrId)-> @data.offsetForBlock blockOrId

Utilities
=========

      isEditable = (n)->
        n = if n.nodeType == n.TEXT_NODE then n.parentNode else n
        n.isContentEditable

      link = (prev, next)->
        prev.next = next._id
        next.prev = prev._id

      blockText = (blocks)-> (block.text for block in blocks).join ''

getEventChar(e)
--------------
adapted from Vega on [StackOverflow](http://stackoverflow.com/a/13127566/1026782)

      _to_ascii =
        '188': '44'
        '109': '45'
        '190': '46'
        '191': '47'
        '192': '96'
        '220': '92'
        '222': '39'
        '221': '93'
        '219': '91'
        '173': '45'
        '187': '61' #IE Key codes
        '186': '59' #IE Key codes
        '189': '45' #IE Key codes

      shiftUps =
        "96": "~"
        "49": "!"
        "50": "@"
        "51": "#"
        "52": "$"
        "53": "%"
        "54": "^"
        "55": "&"
        "56": "*"
        "57": "("
        "48": ")"
        "45": "_"
        "61": "+"
        "91": "{"
        "93": "}"
        "92": "|"
        "59": ":"
        "39": "\""
        "44": "<"
        "46": ">"
        "47": "?"

      htmlForNode = (n)->
        if n.nodeType == n.TEXT_NODE then escapeHtml n.data
        else n.outerHTML

      getEventChar = (e)->
        if e.originalEvent.type == 'keypress' then String.fromCharCode eventChar e
        else
          c = (e.charCode || e.keyCode || e.which)
          shifton = e.shiftKey || !!(e.modifiers & 4)
          # normalize keyCode
          if _to_ascii.hasOwnProperty(c) then c = _to_ascii[c]
          if !shifton && (c >= 65 && c <= 90) then c = String.fromCharCode(c + 32)
          else if e.shiftKey && shiftUps.hasOwnProperty(c)
            # get shifted keyCode value
            c = shiftUps[c]
          else c = String.fromCharCode(c)
          c

      shiftKey = (c)-> 15 < c < 19

      modifiers = (e, c)->
        res = specialKeys[c] || String.fromCharCode(c)
        if e.altKey then res = "M-" + res
        if e.metaKey then res = "M-" + res
        if e.ctrlKey then res = "C-" + res
        if e.shiftKey then res = "S-" + res
        res

      modifyingKey = (c, e)-> !e.altKey && !e.metaKey && !e.ctrlKey && (
        (47 < c < 58)          || # number keys
        c == 32 || c == ENTER  || # spacebar and enter
        c == BS || c == DEL    || # backspace and delete
        (64 < c < 91)          || # letter keys
        (95 < c < 112)         || # numpad keys
        (185 < c < 193)        || # ;=,-./` (in order)
        (218 < c < 223)          # [\]' (in order)
        )

      last = (array)-> array.length && array[array.length - 1]

      posFor = (pos)->
        if result = (if pos.pos == pos.node.length && pos.node.data[pos.pos - 1] == '\n' && !(p = pos.save().next()).isEmpty() then p else pos).textPosition()
          result.pos = p ? pos
          result

      replacements =
        '<': "&lt;"
        '>': "&gt;"
        '&': "&amp;"

      escapeHtml = (str)->
        if typeof str == 'string' then str.replace /[<>&]/g, (c)-> replacements[c]
        else str

      findEditor = (node)->
        target = $(node)
        while target.length && !($(target).data().editor instanceof LeisureEditCore)
          target = $(target).parent()
        target.data()?.editor

`preserveSelection` -- restore the current selection after func() completes.  This may
work better for you than LeisureEditCore.savePosition because it always preserves the
selection, regardless of the current value of LeisureEditCore.editing.

      preservingSelection = null

      preserveSelection = (func)->
        if preservingSelection then func preservingSelection
        else if $(document.activeElement).is 'input[input-number]'
          num = document.activeElement.getAttribute 'input-number'
          parentId = $(document.activeElement).closest('[data-view-block-name]').prop 'id'
          input = document.activeElement
          start = input.selectionStart
          end = input.selectionEnd
          try
            func
              type: 'None'
              scrollTop: 0
              scrollLeft: 0
          finally
            parent = $("##{parentId}")
            if input = parent.find("[input-number='#{num}']")
              input.selectionStart = start
              input.selectionEnd = end
              input.focus()
        else if editor = findEditor getSelection().anchorNode
          preservingSelection = editor.getSelectedDocRange()
          try
            func preservingSelection
          finally
            editor.selectDocRange preservingSelection
            preservingSelection = null
        else func
          type: 'None'
          scrollTop: 0
          scrollLeft: 0

      wrapDiag = (parent)-> (args...)->
        r = parent.apply this, args
        @diag()
        r

Exports
=======

      root = {
        LeisureEditCore
        Observable
        BasicEditingOptions
        DataStore
        DataStoreEditingOptions
        defaultBindings
        last
        link
        blockText
        posFor
        escapeHtml
        findEditor
        copyBlock
        preserveSelection
        treeToArray
        computeNewStructure
        getEventChar
        useEvent
        getSelection
        modifyingKey
        $
        set$
      }
