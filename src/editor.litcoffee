LeisureEditCore
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
that are not in the backing structure.  Also, the rendered DOM may
have a nested tree-structure.

When the user makes a change, the editor:

1. maps the cursor location in the DOM to the corresponding location in the backing structure
2. changes backing structure text, regenerating part of the backing structure
3. rerenders the corrsponding DOM
4. replaces the new DOM into the page

Of course the editor supports [custom key bindings](#defaultBindings).

Using/Installing LeisureEditCore
================================
Make sure your webpage loads the javascript files in the `build` directory.  Follow
the instructions below to use it.

LeisureEditCore
===============
Create a LeisureEditCore object like this: `new LeisureEditCore element, options`.

`element` is the HTML element that you want to contain editable code.

`options` is an object that tells LeisureEditCore things like how to convert text
to a list of block objects (see below).

Blocks
======
* `_id`: the block id
* `type`: the type of block as a string (examples: 'text', 'code')
* `prev`: the id of the previous block (optional)
* `next`: the id of the next block (optional)
* `text`: the text of the block
* EXTRA STUFF: you can store other things in your blocks

Options
=======
When you make a LeisureEditCore instance, you must provide an options
object.  BasicEditingOptions is the base options class and
DataStoreEditingOptions is more deluxe and connects to an
observable data store (you can use an instance of DataStore or
adapt one of your own).

Hooks you must define for BasicEditingOptions objects
-----------------------------------------------------
Here are the hook methods you need to provide:

* `parseBlocks(text) -> blocks`: parse text into array of blocks -- DO NOT provide _id, prev, or next, they may be overwritten!
* `renderBlock(block) -> [html, next]`: render a block (and potentially its children) and return the HTML and the next blockId if there is one
  * Block DOM (DOM for a block) must be a single element with the same id as the block.
  * Block DOM may contain nested block DOM.
  * each block's DOM should have the same id as the block and have a data-block attribute
  * non-editable parts of the DOM should have contenteditable=false
  * completely skipped parts should be non-editable and have a data-noncontent attribute
* `edit(prev, oldBlocks, newBlocks) -> any`: The editor calls this after the user has attempted an edit.  It should make the requested change (probably by calling `replaceBlocks`) and rerender the appropriate DOM.

After that, you must render the changes into HTML and replace them into the element.

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
* `replaceBlocks(oldBlocks, newBlocks) -> removedBlocks`: override this if you need to link up the blocks, etc., like so that `renderBlock()` can return the proper next id, for instance.

Packages we use
===============
- [jQuery](http://jquery.com/), for DOM slicing and dicing
- [DOMCursor](https://github.com/zot/DOMCursor) (included), for finding text locations in DOM trees

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

Code
====
Here is the code for [LeisureEditCore](https://github.com/TEAM-CTHULHU/LeisureEditCore).

    define ['jquery', 'cs!./domCursor.litcoffee'], (jq, DOMCursor)->
      {
        selectRange,
      } = DOMCursor
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

      keyFuncs =
        backwardChar: (editor, e, r)->
          e.preventDefault()
          editor.moveSelectionBackward r
          false
        forwardChar: (editor, e, r)->
          e.preventDefault()
          editor.moveSelectionForward r
          false
        previousLine: (editor, e, r)->
          e.preventDefault()
          editor.moveSelectionUp r
          false
        nextLine: (editor, e, r)->
          e.preventDefault()
          editor.moveSelectionDown r
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
        on: (type, callback)->
          if !@listeners[type] then @listeners[type] = []
          @listeners[type].push callback
          this
        off: (type, callback)->
          if @listeners[type]
            @listeners[type] = (l for l in @listeners[type] when l != callback)
        trigger: (type, args...)->
          for listener in @listeners[type] || []
            listener.apply null, args

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
            pos = @getSelectedBlockRange()
            try
              func()
            catch
              @selectBlockRange pos
        getCopy: (id)-> copy @options.getBlock id
        domCursor: (node, pos)->
          if node instanceof jQuery
            node = node[0]
            pos = pos ? 0
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
          n = @domCursor sel.focusNode, sel.focusOffset
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
        loadURL: (url)-> $.get url, (text)=> @options.load text
        getSelectedBlockRange: ->
          s = getSelection()
          if s.type == 'None' then type: 'None'
          else
            if p = @blockOffset s.getRangeAt(0)
              p.type = s.type
              p.length = @selectedText(s).length
              p
            else type: 'None'
        selectBlockRange: (blockRange)->
          if blockRange.type == 'None' then getSelection().removeAllRanges()
          else selectRange @rangeForBlockRange blockRange
        rangeForBlockRange: ({block, offset, length})->
          startPos = @domCursor(@options.nodeForId(block._id), 0).forwardChars offset
          endPos = startPos.forwardChars length
          r = document.createRange()
          r.setStart startPos.node, startPos.pos
          r.setEnd endPos.node, endPos.pos
          r
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
        replace: (e, br, text, select)->
          @editWith =>
            blocks = [br.block]
            endOffset = br.offset
            if br.type == 'Range'
              cur = br.block
              tot = br.length - br.offset - cur.text.length
              while tot > 0 && cur
                blocks.push cur = @options.getBlock cur.next
                if cur then tot -= cur.text.length
            @options.editBlocks blocks, br.offset, br.length, (text ? getEventChar e), select
        backspace: (event, sel, r)->
          if sel.type == 'Range' then return @cutText event
          holderId = @idAtCaret sel
          @currentBlockIds = [holderId]
          @handleDelete event, sel, false, (text, pos)-> true
        del: (event, sel, r)->
          if sel.type == 'Range' then return @cutText event
          holderId = @idAtCaret sel
          @currentBlockIds = [holderId]
          @handleDelete event, sel, true, (text, pos)-> true
        idAtCaret: (sel)-> @options.idForNode @options.getContainer(sel.anchorNode)
        selectedText: (s)->
          r = s.getRangeAt(0)
          if r.collapsed then ''
          else @domCursor(r.startContainer, r.startOffset).getTextTo @domCursor(r.endContainer, r.endOffset)
        cutText: (e)->
          e.preventDefault()
          sel = getSelection()
          if sel.type == 'Range'
            html = (htmlForNode node for node in sel.getRangeAt(0).cloneContents().childNodes).join ''
            text = @selectedText sel
            @options.simulateCut html: html, text: text
            @replace e, @getSelectedBlockRange(), ''
        handleDelete: (e, s, forward, delFunc)->
          e.preventDefault()
          if s.type == 'Caret'
            c = @domCursorForCaret().firstText()
            cont = @options.getContainer(c.node)
            block = @getCopy @options.idForNode cont
            pos = @getTextPosition cont, c.node, c.pos
            result = delFunc block.text, pos
            blocks = []
            if !result then @ignoreModCheck = @ignoreModCheck || 1
            else
              pos += if forward then 0 else -1
              if pos < 0
                if block.prev
                  blocks.push bl = @getCopy block.prev
                  pos += bl.text.length
                else return
              else blocks.push block
              @options.editBlocks blocks, pos, 1, ''

editBlocks: at this point, just place the cursor after the newContent, later
on it can select if start and end are different

        editBlocks: (blocks, start, length, newContent, select)->
          caret = start + newContent.length
          oldText = blockText blocks
          newText = oldText.substring(0, start) + newContent + oldText.substring start + length

This code is hairy and unintuitive and needs to be cleaned up!

          {oldBlocks, newBlocks, offset, prev} = @changeStructure blocks, newText
          if oldBlocks.length || newBlocks.length
            oldFirst = oldBlocks[0]?._id
            @options.edit prev, oldBlocks.slice(), newBlocks.slice()
            if !newBlocks.length
              startBlock = blocks[0]
              offset += start + startBlock.text.length
            else if !oldBlocks.length # just inserting
              startBlock = newBlocks[0]
              offset = start + offset
            else
              startBlock = newBlocks[0]
              offset += start
              if oldFirst && oldFirst != oldBlocks[0]?._id then offset += oldBlocks[0].text.length
              while offset < 0
                if !(block = @options.getBlock startBlock.prev)
                  offset = 0
                  break
                startBlock = block
                offset += startBlock.text.length
              while offset > startBlock.text.length
                if !(block = @options.getBlock startBlock.next)
                  offset = startBlock.text.length
                  break
                offset -= startBlock.text.length
                startBlock = block
          else
            startBlock = blocks[0]
            offset = start
          startPos = @domCursor @options.nodeForId(startBlock._id), 0
          if typeof select == 'number'
            startPos.forwardChars(offset + select, true).moveCaret()
          else if select
            r = document.createRange()
            startPos = startPos.forwardChars offset, true
            r.setStart startPos.node, startPos.pos
            endPos = startPos.forwardChars newContent.length, true
            r.setEnd endPos.node, endPos.pos
            selectRange r
          else startPos.forwardChars(offset + newContent.length, true).moveCaret()

`changeStructure(oldBlocks, newText)`: Compute blocks affected by transforming oldBlocks into newText

        changeStructure: (oldBlocks, newText)->
          prev = oldBlocks[0].prev
          oldBlocks = oldBlocks.slice()
          oldText = null
          offset = 0
          while oldText != newText && (oldBlocks[0].prev || last(oldBlocks).next)
            oldText = newText
            if prev = @options.getBlock oldBlocks[0].prev
              oldBlocks.unshift prev
              newText = prev.text + newText
              offset += prev.text.length
            if next = @options.getBlock last(oldBlocks).next
              oldBlocks.push next
              newText += next.text
            newBlocks = @options.parseBlocks newText
            if (!prev || prev.text == newBlocks[0].text) && (!next || next.text == last(newBlocks).text)
              break
          if !newBlocks then newBlocks = @options.parseBlocks newText
          while oldBlocks.length && newBlocks.length && oldBlocks[0].text == newBlocks[0].text
            offset -= oldBlocks[0].text.length
            prev = oldBlocks[0]._id
            oldBlocks.shift()
            newBlocks.shift()
          while oldBlocks.length && newBlocks.length && last(oldBlocks).text == last(newBlocks).text
            oldBlocks.pop()
            newBlocks.pop()
          oldBlocks: oldBlocks, newBlocks: newBlocks, offset: offset, prev: prev
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
            e.preventDefault()
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
                oe.preventDefault()
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
              clipboard.setData 'text/html', (htmlForNode node for node in sel.getRangeAt(0).cloneContents().childNodes).join ''
              clipboard.setData 'text/plain', @selectedText sel
              clipboard.effectAllowed = 'copyMove'
              clipboard.dropEffect = 'move'
            true
          @node[0].addEventListener 'dragend', (e)=>
            if dr = dragRange
              dragRange = null
              if e.dataTransfer.dropEffect == 'move'
                e.preventDefault()
                sel = @getSelectedBlockRange()
                @replace e, dr, ''
                @selectBlockRange sel
        bindClipboard: ->
          @node.on 'cut', (e)=>
            e.preventDefault()
            sel = getSelection()
            if sel.type == 'Range'
              clipboard = e.originalEvent.clipboardData
              clipboard.setData 'text/html', (htmlForNode node for node in sel.getRangeAt(0).cloneContents().childNodes).join ''
              clipboard.setData 'text/plain', @selectedText sel
              @replace e, @getSelectedBlockRange(), ''
          @node.on 'copy', (e)=>
            e.preventDefault()
            sel = getSelection()
            if sel.type == 'Range'
              clipboard = e.originalEvent.clipboardData
              clipboard.setData 'text/html', (htmlForNode node for node in sel.getRangeAt(0).cloneContents().childNodes).join ''
              clipboard.setData 'text/plain', @selectedText sel
          @node.on 'paste', (e)=>
            e.preventDefault()
            @replace e, @getSelectedBlockRange(), e.originalEvent.clipboardData.getData('text/plain'), false
        bindMouse: ->
          @node.on 'mousedown', (e)=>
            setTimeout (=>@trigger 'moved', this), 1
            @setCurKeyBinding null
          @node.on 'mouseup', (e)=>
            @adjustSelection e
            @trigger 'moved', this
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
            if bound
              e.preventDefault()
              @modCancelled = !checkMod
            else
              @modCancelled = false
              if c == ENTER
                e.preventDefault()
                @replace e, @getSelectedBlockRange(), '\n', false
              else if c == BS
                e.preventDefault()
                @backspace e, s, r
              else if c == DEL
                e.preventDefault()
                @del e, s, r
              else if (modifyingKey c, e) && !isAlphabetic e
                e.preventDefault()
                @char = getEventChar e
                @replace e, @getSelectedBlockRange(), null, false
          @node.on 'keypress', (e)=>
            e.preventDefault()
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
            while pos.node != r.startContainer && pos.node.data.trim() == ''
              pos == pos.prev()
            while pos.pos > 0 && pos.node.data[pos.pos - 1] == ' '
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
          pos.show @options.topRect()
          @trigger 'moved', this
        moveForward: ->
          start = pos = @domCursorForCaret().firstText().save()
          while !pos.isEmpty() && @domCursorForCaret().firstText().equals start
            pos = pos.forwardChar()
            pos.moveCaret()
          pos
        moveBackward: ->
          start = pos = @domCursorForCaret().firstText().save()
          while !pos.isEmpty() && @domCursorForCaret().firstText().equals start
            pos = pos.backwardChar()
            pos.moveCaret()
          pos
        firstText: -> @domCursor(@node, 0).firstText().node
        moveDown: ->
          linePos = prev = pos = @domCursorForCaret().save()
          if !(@prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine])
            @movementGoal = @options.blockColumn pos
            line = 0
          else line = (if pos.pos == 0 && pos.node == @firstText() && @options.blockColumn(pos) < @movementGoal then 1 else 0)
          lineTop = posFor(linePos).top
          while !(pos = @moveForward()).isEmpty()
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
          while !(pos = @moveBackward()).isEmpty()
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

      eventChar = (e)-> e.charCode || e.keyCode || e.which

      isAlphabetic = (e)-> !e.altKey && !e.ctrlKey && !e.metaKey && (64 < eventChar(e) < 91)

BasicEditingOptions class
=========================
BasicEditingOptions is an the options base class.

Events:
  `load`: new text loaded into the editor

      class BasicEditingOptions extends Observable

Hook methods (required)
-----------------------

`parseBlocks(text) -> blocks`: parse text into array of blocks -- DO NOT provide _id, prev, or next, they may be overwritten!

        parseBlocks: (text)-> throw new Error "options.parseBlocks(text) is not implemented"

`renderBlock(block) -> [html, next]`: render a block (and potentially its children) and return the HTML and the next blockId if there is one
* Block DOM (DOM for a block) must be a single element with the same id as the block.
* Block DOM may contain nested block DOM.

        renderBlock: (block)-> throw new Error "options.renderBlock(block) is not implemented"

`edit(prev, oldBlocks, newBlocks)`: The editor calls this after the user has attempted an edit.  It should make the requested change (probably by calling `replaceBlocks`, below) and rerender the appropriate DOM.

        edit: (prev, oldBlocks, newBlocks)-> throw new Error "options.edit(func) is not implemented"

Hook methods (optional)
-----------------------

`simulateCut({html, text})`: The editor calls this when the user hits backspace or delete on selected text.

        simulateCut: ({html, text})->

`dragEnter(event)`: alter the drag-enter behavior.  If you want to cancel the drag, for
instance, call event.preventDefault() and set the dropEffect to 'none'

        dragEnter: (event)->
          if !event.dataTransfer.getData
            event.preventDefault()
            event.dropEffect = 'none'

`dragOver(event)`: alter the drag-enter behavior.  If you want to cancel the drag, for
instance, call event.preventDefault() and set the dropEffect to 'none'

        dragOver: (event)->
          if !event.dataTransfer.getData
            event.preventDefault()
            event.dropEffect = 'none'

`editBlocks(blocks, start, length, newContent, select)`: edit some blocks (just calls the editor's
editBlocks by default).

        editBlocks: (blocks, start, length, newContent, select)->
          @editor.editBlocks blocks, start, length, newContent, select

Main code
---------

        constructor: ->
          super()
          @initData()

        initData: ->

`blocks {id -> block}`: block table

          @blocks = {}

`first`: id of first block

          @first = null

`getFirst() -> blockId`: get the first block id

        getFirst: -> @first
        nodeForId: (id)-> $("##{id}")
        idForNode: (node)-> $(node).prop(id)
        setEditor: (@editor)->
        newId: -> "block#{idCounter++}"

`replaceBlocks(oldBlocks, newBlocks) -> removedBlocks`: override this if you need to link up the blocks, etc., like so that `renderBlock()` can return the proper next id, for instance.

        replaceBlocks: (prev, oldBlocks, newBlocks)-> @change @changesFor prev, oldBlocks, newBlocks

        changesFor: (first, oldBlocks, newBlocks)->
          newBlockMap = {}
          removes = {}
          changes = {removes, sets: newBlockMap, first: @getFirst(), oldBlocks, newBlocks}
          prev = @computeRemovesAndNewBlockIds oldBlocks, newBlocks, newBlockMap, removes
          @patchNewBlocks first, oldBlocks, newBlocks, changes, newBlockMap, removes, prev
          @removeDuplicateChanges newBlockMap
          changes

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

        removeDuplicateChanges: (newBlockMap)->
          dups = []
          for id, block of newBlockMap
            if (oldBlock = @getBlock id) && block.text == oldBlock.text && block.next == oldBlock.next && block.prev == oldBlock.prev
              dups.push id
          for id of dups
            delete newBlockMap[id]

        change: ({first, removes, sets})->
          @first = first
          for id in removes
            delete @blocks[id]
          for id, block of sets
            @blocks[id] = block

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
          new DOMCursor(node, pos).addFilter (n)-> (n.hasAttribute('data-noncontent') && 'skip') || isEditable(n.node)

`getContainer(node) -> Node?`: get block DOM node containing for a node

        getContainer: (node)->
          if @editor.node[0].compareDocumentPosition(node) & Element.DOCUMENT_POSITION_CONTAINED_BY
            $(node).closest('[data-block]')[0]

`load(el, text) -> void`: parse text into blocks and replace el's contents with rendered DOM

        load: (text)->
          @replaceBlocks @blockList(), @parseBlocks text
          setHtml @editor.node[0], @renderBlocks()
          @trigger 'load'
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

      copyBlock = (block)->
        if !block then null
        else
          bl = {}
          for k,v of block
            bl[k] = v
          bl

      activating = false

Set html of an element and evaluate scripts so that document.currentScript is properly set

      setHtml = (el, html, outer)->
        if outer
          prev = el.previousSibling
          next = el.nextSibling
          par = el.parentNode
          el.outerHTML = html
          el = prev?.nextSibling ? next?.previousSibling ? par?.firstChild
        else el.innerHTML = html
        activateScripts $(el)
        el

      activateScripts = (jq)->
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
                script.parentNode.insertBefore newScript, script
                script.parentNode.removeChild script
          finally
            activating = false

DataStore
=========
Events:
  `change {adds, updates, removes, oldFirst, old}`: data changed

API methods

  * `oldFirst id`: the previous first (might be the same as the current)
  * `adds {id->true}`: added items
  * `updates {id->true}`: updated items
  * `removes {id->true}`: removed items
  * `old {id->old block}`: the old items from updates and removes

Data model -- override/reset these if you want to change how the store accesses data

  * `blocks` - currently holds the block object
  * `getFirst()`
  * `setFirst(firstId)`
  * `getBlock(id)`
  * `setBlock(id, block)`
  * `deleteBlock(id)`
  * `eachBlock(func(block [, id]))` -- iterate with func (exit if func returns false)
  * `load(first, blocks)` -- should trigger 'load'

      class DataStore extends Observable
        constructor: ->
          super()
          @blocks = {}
        getFirst: -> @first
        setFirst: (firstId)-> @first = firstId
        getBlock: (id)-> @blocks[id]
        setBlock: (id, block)-> @blocks[id] = block
        deleteBlock: (id)-> delete @blocks[id]
        eachBlock: (func)->
          for block, i of @blocks
            if func(block, i) == false then break
        load: (@first, @blocks)-> @trigger 'load'
        check: ->
          seen = {}
          next = @getFirst()
          prev = null
          while next
            prev = next
            if seen[next] then throw new Error "cycle in next links"
            seen[next] = true
            oldBl = bl
            bl = @getBlock next
            if !bl then throw new Error "Next of #{oldBl.id} doesn't exist"
            next = bl.next
          @eachBlock (k)->
            if !seen[k] then throw new Error "#{k} not in next chain"
          seen = {}
          while prev
            if seen[prev] then throw new Error "cycle in prev links"
            seen[prev] = true
            oldBl = bl
            bl = @getBlock prev
            if !bl then throw new Error "Prev of #{oldBl.id} doesn't exist"
            prev = bl.prev
          @eachBlock (k)->
            if !seen[k] then throw new Error "#{k} not in prev chain"
          null
        blockList: ->
          next = @getFirst()
          while next
            bl = @getBlock next
            next = bl.next
            bl
        change: (changes)-> @trigger 'change', @makeChange changes
        makeChange: ({first, sets, removes})->
          {adds, updates, old} = result = {adds: {}, updates: {}, removes, old: {}, sets, oldFirst: @getFirst(), first: first}
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
          result

DataStoreEditingOptions
=======================

      class DataStoreEditingOptions extends BasicEditingOptions
        constructor: (@data)->
          super()
          @data.on 'change', (changes)=> @changed changes
          @data.on 'load', => @trigger 'load'
        initData: ->
        load: (text)->
          blockMap = {}
          newBlocks = @parseBlocks text
          for block, i in newBlocks
            block._id = @newId()
            blockMap[block._id] = block
            if prev = newBlocks[i - 1]
              prev.next = block._id
              block.prev = prev._id
          @data.load newBlocks[0]?._id, blockMap
        edit: (prev, oldBlocks, newBlocks)-> @replaceBlocks prev, oldBlocks, newBlocks
        getBlock: (id)-> @data.getBlock id
        getFirst: (first)-> @data.getFirst()
        change: (changes)-> @data.change changes
        changed: (changes)-> @editor.savePosition => setHtml @editor.node[0], @renderBlocks()

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
        result = (if pos.pos == pos.node.length && pos.node.data[pos.pos - 1] == '\n' && !(p = pos.save().next()).isEmpty() then p else pos).textPosition()
        result.pos = p ? pos
        result

      replacements =
        '<': "&lt;"
        '>': "&gt;"
        '&': "&amp;"

      escapeHtml = (str)->
        if typeof str == 'string' then str.replace /[<>&]/g, (c)-> replacements[c]
        else str

      copy = (obj)->
        if obj
          bl = {}
          for k,v of obj
            bl[k] = v
          bl

      findEditor = (node)->
        target = $(node)
        while target.length && !($(target).data().editor instanceof LeisureEditCore)
          target = $(target).parent()
        target.data()?.editor

`preserveSelection` -- restore the current selection after func() completes.  This may
work better for you than LeisureEditCore.savePosition because it always preserves the
selection, regardless of the current value of LeisureEditCore.editing.

      preserveSelection = (func)->
        if editor = findEditor getSelection().anchorNode
          range = editor.getSelectedBlockRange()
          try
            func()
          finally
            editor.selectBlockRange range
        else func()

Exports
=======

      {
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
        copy
        activateScripts
        setHtml
        findEditor
        copyBlock
        preserveSelection
      }
