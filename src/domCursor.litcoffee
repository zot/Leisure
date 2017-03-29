DOMCursor
=========
Copyright (C) 2014, Bill Burdick, Roy Riggs, TEAM CTHULHU

Licensed with ZLIB license (see "License", below).

Filtered cursoring on DOM trees.  DOMCursors can move forwards or backwards, by node or by character, with settable filters that can seamlessly skip over parts of the DOM.

This readme file is also the code.

Here are some examples (I'm wrapping them in a -> to make a no-op that gets syntax highlighting in viewers that support it).

    ->

In Leisure, I use it like this, to retrieve text from the page (scroll down to see docs on these methods, by the way):

      DOMCursor.prototype.filterOrg = ->
        @addFilter (n)-> !n.hasAttribute('data-nonorg') || 'skip'

      domCursor = (node, pos)-> new DOMCursor(node, pos).filterOrg()

      # full text for node
      getOrgText = (node)->
        domCursor node.firstChild, 0
          .mutable()
          .filterTextNodes()
          .filterParent node
          .getText()

And like this for cursor movement.  Once I have the cursor, I can use forwardChar, backwardChar, forwardLine, backwardLine to move it around:

      domCursorForCaret = (end)->
        sel = getSelection()
        c = if sel.type == 'None' then emptyDOMCursor
        else if end then domCursor sel.extentNode, sel.extendOffset
        else domCursor sel.anchorNode, sel.anchorOffset
        if !c.empty
          parent = parentForNode sel.focusNode
          c = c
            .mutable()
            .filterVisibleTextNodes()
            .filterParent parent
            .firstText()
          if c.pos < c.node.length then c else c.next()
        c

DOMCursor Class
---------------

DOMCursors are immutable -- operations on them return new DOMCursers.
There are two ways to get mutabile cursors, sending @mutable() or
sending @withMutations (m)-> ...

A DOMCursor has a node, a position, a filter, and a type.

- node: like with ranges, a DOM node
- position: like with ranges, either the index of a child, for elements, or the index of a character, for text nodes.
- filter: a function used by @next() and @prev() to skip over portions of DOM. It returns
  - truthy: to accept a node but its children are still filtered
  - falsey: to reject a node but its children are still filtered
  - 'skip': to skip a node and its children
  - 'quit': to end to make @next() or @prev() return an empty DOMCursor
- type: 'empty', 'text', or 'element'

License
=====================
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

The DOMCursor class...
======================

    define ->

      class DOMCursor
        constructor: (@node, @pos, filter)->
          if @node instanceof Range
            filter = @pos
            @pos = @node.startOffset
            @node = @node.startContainer
          @pos = @pos ? 0
          @filter = filter || -> true
          @computeType()
          @savedTextPosition = null

        isCollapsed: -> !@isEmpty() && isCollapsed @node

        computeType: ->
          @type = if !@node then 'empty'
          else if @node.nodeType == @node.TEXT_NODE then 'text'
          else 'element'
          this

        equals: (other)-> @node == other.node && @pos == other.pos

        newPos: (node, pos)->
          if node instanceof Range then new DOMCursor node
          else new DOMCursor node, pos, @filter

        toString: ->
          "DOMCursor(#{@type}, #{@pos}#{if @type == 'text' then ', ' + @posString() else ''})"

        posString: ->
          @node.data.substring(0, @pos) + '|' + @node.data.substring @pos

        textPosition: ->
          if @isEmpty() then null
          else @savedTextPosition ? (@savedTextPosition = getTextPosition @node, @pos)

        isDomCaretTextPosition: ->
          p = @textPosition()
          r = document.caretRangeFromPoint p.left, p.top
          r.startContainer == @node && r.startOffset == @pos

**Character** returns the character at the position

        character: ->
          p = if @type == 'text' then this else @save().firstText()
          p.node.data[p.pos]

**isEmpty** returns true if the cursor is empty

        isEmpty: -> @type == 'empty'

**setFilter** sets the filter

        setFilter: (f)-> new DOMCursor @node, @pos, f

**addFilter** adds a filter

        addFilter: (filt)->
          oldFilt = @filter
          @setFilter (n)->
            (((r1 = oldFilt n) in ['quit', 'skip']) && r1) || (((r2 = filt n) in ['quit', 'skip']) && r2) || (r1 && r2)

**next** moves to the next filtered node

        next: (up)->
          saved = @save()
          n = @nodeAfter up
          while !n.isEmpty()
            switch res = @filter n
              when 'skip'
                n = n.nodeAfter true
                continue
              when 'quit' then break
              else
                if res then return n
            n = n.nodeAfter()
          @restore(saved).emptyNext()

**prev** moves to the next filtered node

        prev: (up)->
          saved = @save()
          n = @nodeBefore up
          while !n.isEmpty()
            switch res = @filter n
              when 'skip'
                n = n.nodeBefore true
                continue
              when 'quit' then break
              else
                if res then return n
            n = n.nodeBefore()
          @restore(saved).emptyPrev()

**nodes** returns all of the nodes this cursor finds

        nodes: ->
          n = this
          n.node while !(n = n.next()).isEmpty()

**moveCaret** move the document selection to the current position

        moveCaret: (r)->
          if !@isEmpty()
            if !r then r = document.createRange()
            r.setStart @node, @pos
            r.collapse true
            selectRange r
          this

        adjustForNewline: ->
          if @isEmpty() then this
          else
            s = @save()
            n = this
            if @pos == 0 && @node.data[0] == '\n'
              while !n.isEmpty() && (n = n.prev()).type != 'text' then
              if n.isEmpty() then s
              else
                if n.node.data[n.pos - 1] == '\n' then s
                else n
            else if @pos == @node.length && @node.data[@pos - 1] == '\n'
              while !n.isEmpty() && (n = n.next()).type != 'text' then
              if n.node.data[n.pos] == '\n' then s
              n
            else this

**range** create a range between two positions

        range: (other, r)->
          if !r then r = document.createRange()
          if !other? then other = this
          r.setStart @node, @pos
          r.setEnd other.node, other.pos
          r

**firstText** find the first text node (the 'backwards' argument is optional and if true,
indicates to find the first text node behind the cursor).

        firstText: (backwards)->
          n = this
          while !n.isEmpty() && (n.type != 'text' || (!backwards && n.pos == n.node.data.length))
            n = (if backwards then n.prev() else n.next())
          n

**countChars** count the characters in the filtered nodes until we get to (node, pos)

Include (node, 0) up to but not including (node, pos)

        countChars: (node, pos)->
          start = @copy()
          if node instanceof DOMCursor
            pos = node.pos
            node = node.node
          n = this
          tot = 0
          while !n.isEmpty() && n.node != node
            if n.type == 'text' then tot += n.node.length
            n = n.next()
          if n.isEmpty() || n.node != node then -1
          else if n.type == 'text'
            tot += pos
            if start.node == n.node then tot -= start.pos
            tot
          else tot

**forwardChars** moves the cursor forward by count characters

if contain is true and the final location is 0 then go to the end of
the previous text node (node, node.length)

        forwardChars: (count, contain)->
          if count == 0 then return this
          n = this
          count += @pos
          while !n.isEmpty() && 0 <= count
            if n.type == 'text'
              if count < n.node.length
                if count == 0 && contain
                  n = n.prev()
                  while n.type != 'text' then n = n.prev()
                  return n.newPos n.node, n.node.length
                else return n.newPos n.node, count
              count -= n.node.length
            n = n.next()
          n.emptyNext()

**hasAttribute** returns true if the node is an element and has the attribute or if it is a text node and its parent has the attribute

        hasAttribute: (a)-> @node? && @node.nodeType == @node.ELEMENT_NODE && @node.hasAttribute a

**getAttribute** returns the attribute if the node is an element and has the attribute

        getAttribute: (a)-> @node? && @node.nodeType == @node.ELEMENT_NODE && @node.getAttribute a

**filterTextNodes** adds text node filtering to the current filter; the cursor will only find text nodes

        filterTextNodes: -> @addFilter (n)-> n.type == 'text'

**filterTextNodes** adds visible text node filtering to the current filter; the cursor will only find visible text nodes

        filterVisibleTextNodes: -> @filterTextNodes().addFilter (n)-> !n.isCollapsed()

**filterParent** adds parent filtering to the current filter; the cursor will only find nodes that are contained in the parent (or equal to it)

        filterParent: (parent)->
          if !parent then @setFilter -> 'quit'
          else @addFilter (n)-> parent.contains(n.node) || 'quit'

**filterRange** adds range filtering to the current filter; the cursor will only find nodes that are contained in the range

        filterRange: (startContainer, startOffset, endContainer, endOffset)->
          if !startOffset?
            if startContainer instanceof Range
              r = startContainer
              startContainer = r.startContainer
              startOffset = r.startOffset
              endContainer = r.endContainer
              endOffset = r.endOffset
            else return this
          @addFilter (n)->
            startPos = startContainer.compareDocumentPosition n.node
            (if startPos == 0 then startOffset <= n.pos <= endOffset
            else if startPos & Element.DOCUMENT_POSITION_FOLLOWING
              endPos = endContainer.compareDocumentPosition n.node
              if endPos == 0 then n.pos <= endOffset
              else endPos & Element.DOCUMENT_POSITION_PRECEDING) || 'quit'

**getText** gets all of the text at or after the cursor (useful with filtering; see above)

        getText: ->
          n = @mutable().firstText()
          if n.isEmpty() then ''
          else
            t = n.node.data.substring n.pos
            while !(n = n.next()).isEmpty()
              if n.type == 'text' then t += n.node.data
            if t.length
              while n.type != 'text'
                n.prev()
              n = n.newPos n.node, n.node.length
              while n.pos > 0 && reject n.filter n
                n.pos--
              t.substring 0, t.length - n.node.length + n.pos
            else ''

**getTextTo** gets all of the text at or after the cursor (useful with filtering; see above)

        getTextTo: (other)->
          n = @mutable().firstText()
          if n.isEmpty() then ''
          else
            t = n.node.data.substring n.pos
            if n.node != other.node
              while !(n = n.next()).isEmpty()
                if n.type == 'text' then t += n.node.data
                if n.node == other.node then break
            if t.length
              while n.type != 'text'
                n.prev()
              if n.node == other.node then n = n.newPos n.node, other.pos
              else n = n.newPos n.node, n.node.length
              while n.pos > 0 && reject n.filter n
                n.pos--
              t.substring 0, t.length - n.node.length + n.pos
            else ''

        char: -> @type == 'text' && @node.data[@pos]

**isNL** returns whether the current character is a newline

        isNL: -> @char() == '\n'

**endsInNL** returns whether the current node ends with a newline

        endsInNL: -> @type == 'text' && @node.data[@node.length - 1] == '\n'

**moveToStart** moves to the beginning of the node

        moveToStart: -> @newPos @node, 0

**moveToNextStart** moves to the beginning of the next node

        moveToNextStart: -> @next().moveToStart()

**moveToEnd** moves to the textual end the node (1 before the end if the node
ends in a newline)

        moveToEnd: ->
          end = @node.length - (if @endsInNL() then 1 else 0)
          @newPos @node, end

**moveToPrevEnd** moves to the textual end the previous node (1 before
the end if the node ends in a newline)

        moveToPrevEnd: -> @prev().moveToEnd()

**forwardWhile** moves forward until the given function is false or 'found',
returning the previous position if the function is false or the current
position if the function is 'found'

        forwardWhile: (test)->
          prev = n = @immutable()
          while n = n.forwardChar()
            if n.isEmpty() || !(t = test n) then return prev
            if t == 'found' then return n
            prev = n

**checkToEndOfLine** checks whether a condition is true until the EOL

        checkToEndOfLine: (test)->
          n = @immutable()
          tp = n.textPosition()
          while !n.isEmpty() && (test n)
            if differentLines tp, n.textPosition() then return true
            n = n.forwardChar()
          n.isEmpty()

**checkToStartOfLine** checks whether a condition is true until the EOL

        checkToStartOfLine: (test)->
          n = @immutable()
          tp = n.textPosition()
          while !n.isEmpty() && (test n)
            if differentLines tp, n.textPosition() then return true
            n = n.backwardChar()
          n.isEmpty()

**endOfLine** moves to the end of the current line

        endOfLine: ->
          tp = @textPosition()
          @forwardWhile (n)-> !differentLines tp, n.textPosition()

**forwardLine** moves to the next line, trying to keep the current screen pixel column.  Optionally takes a goalFunc that takes the position's screen pixel column as input and returns -1, 0, or 1 from comparing the input to the an goal column

        forwardLine: (goalFunc)->
          if !goalFunc then goalFunc = -> -1
          line = 0
          tp = @textPosition()
          @forwardWhile (n)->
            pos = n.textPosition()
            if differentLines tp, pos
              tp = pos
              line++
            if line == 1 && goalFunc(pos.left + 2) > -1 then 'found'
            else line != 2

**backwardWhile** moves backward until the given function is false or 'found',
returning the previous position if the function is false or the current
position if the function is 'found'

        backwardWhile: (test)->
          prev = n = @immutable()
          while n = n.backwardChar()
            if n.isEmpty() || !(t = test n) then return prev
            if t == 'found' then return n
            prev = n

**endOfLine** moves to the end of the current line

        startOfLine: ->
          tp = @textPosition()
          @backwardWhile (n)-> !differentLines tp, n.textPosition()

        differentPosition: (c)-> differentPosition @textPosition(), c.textPosition()

        differentLines: (c)-> differentLines @textPosition(), c.textPosition()

**backwardLine** moves to the previous line, trying to keep the current screen pixel column.  Optionally takes a goalFunc that takes the position's screen pixel column as input and returns -1, 0, or 1 from comparing the input to an internal goal column

        backwardLine: (goalFunc)->
          # optional goalFunc takes the position's screen pixel column as input
          # It returns -1, 0, or 1, comparing the input to the internal goal column
          if !goalFunc then goalFunc = -> -1
          tp = @textPosition()
          line = 0
          (@backwardWhile (n)->
            pos = n.textPosition()
            if differentLines tp, pos
              tp = pos
              line++
            if line == 1 && goalFunc(n.textPosition().left - 2) in [-1, 0] then 'found'
            else line != 2).adjustBackward()

        adjustBackward: ->
          p = @textPosition()
          @backwardWhile (n)-> !differentPosition p, n.textPosition()

        forwardChar: ->
          if @pos + 1 <= @node.length then @newPos @node, @pos + 1
          else
            n = this
            while !(n = n.next()).isEmpty()
              if n.node.length != 0 then break
            n

        boundedForwardChar: ->
          n = @save().forwardChar()
          if n.isEmpty() then n.prev() else n

        backwardChar: ->
          p = this
          oldNode = @node
          while !p.isEmpty() && p.pos == 0
            p = p.prev()
          if !p.isEmpty() then p.newPos p.node, (if p.node != oldNode then p.pos else p.pos - 1)
          else p

        boundedBackwardChar: ->
          n = @save().backwardChar()
          if n.isEmpty() then n.next() else n

**show** scroll the position into view.  Optionally takes a rectangle representing a toolbar at the top of the page (sorry, this is a bit limited at the moment)

        show: (topRect)->
          if p = @textPosition()
            top = if topRect?.width && topRect.top == 0 then topRect.bottom else 0
            if p.bottom > window.innerHeight then window.scrollBy 0, p.bottom - window.innerHeight
            else if p.top < top then window.scrollBy 0, p.top - top
          this

**immutable** return an immutable version of this cursor

        immutable: -> this

**withMutations** call a function with a mutable version of this cursor

        withMutations: (func)-> func @copy().mutable()

**mutable** return a mutable version of this cursor

        mutable: -> new MutableDOMCursor @node, @pos, @filter

**save** generate a memento which can be used to restore the state (used by mutable cursors)

        save: -> this

**restore** restore the state from a memento (used by mutable cursors)

        restore: (n)-> n.immutable()

**copy** return a copy of this cursor

        copy: -> this

**nodeAfter** low level method that moves to the unfiltered node after the current one

        nodeAfter: (up)->
          node = @node
          while node
            if node.nodeType == node.ELEMENT_NODE && !up && node.childNodes.length
              return @newPos node.childNodes[0], 0
            else if node.nextSibling
              return @newPos node.nextSibling, 0
            else
              up = true
              node = node.parentNode
          @emptyNext()

**emptyNext** returns an empty cursor whose prev is the current node

        emptyNext: ->
          # return an empty next node where
          #   prev returns this node
          #   next returns the same empty node
          __proto__: emptyDOMCursor
          filter: @filter
          prev: (up)=> if up then @prev up else this
          nodeBefore: (up)=> if up then @nodeBefore up else this

**nodeBefore** low level method that moves to the unfiltered node before the current one

        nodeBefore: (up)->
          node = @node
          while node
            if node.nodeType == node.ELEMENT_NODE && !up && node.childNodes.length
              newNode = node.childNodes[node.childNodes.length - 1]
            else if node.previousSibling then newNode = node.previousSibling
            else
              up = true
              node = node.parentNode
              continue
            return @newPos newNode, newNode.length
          @emptyPrev()

**emptyPrev** returns an empty cursor whose next is the current node

        emptyPrev: ->
          # return an empty prev node where
          #   next returns this node
          #   prev returns the same empty node
          __proto__: emptyDOMCursor
          filter: @filter
          next: (up)=> if up then @next up else this
          nodeAfter: (up)=> if up then @nodeAfter up else this

EmptyDOMCursor Class
--------------------

An empty cursor

      class EmptyDOMCursor extends DOMCursor
        moveCaret: -> this
        show: -> this
        nodeAfter: -> this
        nodeBefore: -> this
        next: -> this
        prev: -> this

      #singleton empty node cursor
      emptyDOMCursor = new EmptyDOMCursor()

MutableDOMCursor Class
----------------------

A mutable cursor -- cursor movement, filter changes, etc. change the cursor instead of returning a new one.

      class MutableDOMCursor extends DOMCursor
        setFilter: (@filter)-> this
        newPos: (@node, @pos)->
          @savedTextPosition = null
          @computeType()
        copy: -> new MutableDOMCursor @node, @pos, @filter
        mutable: -> this
        immutable: -> new DOMCursor @node, @pos, @filter
        save: -> @immutable()
        restore: (np)->
          @node = np.node
          @pos = np.pos
          @filter = np.filter
          this
        emptyPrev: ->
          @type = 'empty'
          @next = (up)->
            @revertEmpty()
            if up then @next up else this
          @nodeAfter = (up)->
            @computeType()
            if up then @nodeAfter up else this
          @prev = -> this
          @nodeBefore = -> this
          this
        revertEmpty: ->
          @computeType()
          delete @next
          delete @prev
          delete @nodeAfter
          delete @nodeBefore
          this
        emptyNext: ->
          @type = 'empty'
          @prev = (up)->
            @revertEmpty()
            if up then @prev up else this
          @nodeBefore = (up)->
            @computeType()
            if up then @nodeBefore up else this
          @next = -> this
          @nodeAfter = -> this
          this

Utility functions
-----------------

These are available as properties on DOMCursor.

Thanks to (rangy)[this: https://github.com/timdown/rangy] for the isCollapsed logic

      isCollapsed = (node)->
        if node
          type = node.nodeType
          type == 7 || # PROCESSING_INSTRUCTION
          type == 8 || # COMMENT
          (type == node.TEXT_NODE && (node.data == '' || isCollapsed(node.parentNode))) ||
          /^(script|style)$/i.test(node.nodeName) ||
          (type == node.ELEMENT_NODE && !node.offsetParent)

      selectRange = (r)->
        if r
          debug "select range", r, new Error('trace').stack
          sel = getSelection()
          if !(sel.rangeCount == 1 && sameRanges sel.getRangeAt(0), r)
            sel.setBaseAndExtent r.startContainer, r.startOffset, r.endContainer, r.endOffset

      sameRanges = (r1, r2)->
        r1.compareBoundaryPoints(Range.START_TO_START, r2) == 0 &&
          r1.compareBoundaryPoints(Range.END_TO_END, r2) == 0

      debug = (args...)-> if DOMCursor.debug then console.log args...

      reject = (filterResult)-> !filterResult || (filterResult in ['quit', 'skip'])

Node location routines
----------------------

      positioner = document.createElement 'DIV'

      positioner.setAttribute 'style', 'display: inline-block'

      positioner.innerHTML = 'x'

      spareRange = document.createRange()

      emptyRect = width: 0, height: 0

      getTextPosition = (textNode, offset)->
        if offset < textNode.length
          spareRange.setStart textNode, offset
          spareRange.setEnd textNode, offset + 1
          r = getClientRect spareRange
          if !r || (r.width == 0 && r.height == 0)
            spareRange.selectNodeContents textNode.parentNode
            if spareRange.getClientRects().length == 0
              r = textNode.parentNode.getBoundingClientRect()
        else
          spareRange.setStart textNode, offset
          spareRange.collapse true
          r = getClientRect spareRange
        if !r || (r.width == 0 && r.height == 0)
          if offset == 0 then textNode.parentNode.insertBefore positioner, textNode
          else if offset == textNode.length || textNode.splitText offset
            textNode.parentNode.insertBefore positioner, textNode.nextSibling
          spareRange.selectNode positioner
          r = spareRange.getBoundingClientRect()
          positioner.parentNode.removeChild positioner
          textNode.parentNode.normalize()
        r

      chooseUpper = (r1, r2)-> r1.top < r2.top

      chooseLower = (r1, r2)-> r1.top > r2.top

      getClientRect = (r)->
        rects = r.getClientRects()
        if rects.length == 1 then rects[0]
        else if rects.length == 2
          result = rects[0]
          #comp = if r.startContainer.data[r.startOffset] == '\n' then chooseUpper
          comp = if r.startContainer.data[r.startOffset] == '\n' && r.startOffset > 0 && r.startContainer.data[r.startOffset] != '\n'
            chooseUpper
          else chooseLower
          for rect in rects
            if comp rect, result then result = rect
          result
        else emptyRect

      differentPosition = (pos1, pos2)->
        differentLines(pos2, pos1) ||
          if pos1.right? && pos2.right?
            r1 = Math.floor(pos1.right)
            r2 = Math.floor(pos2.right)
            l1 = Math.floor(pos1.left)
            l2 = Math.floor(pos2.left)
            (r1 != r2 || l1 != l2) && (r2 < l1 || r1 < l2 || ((r1 < r2) == (l1 < l2) && (r1 > r2) == (l1 > l2)))
          else Math.floor(pos1.left) != Math.floor(pos2.left)

      differentLines = (pos1, pos2)->
        (pos1.bottom - 4 <= pos2.top) || (pos2.bottom - 4 <= pos1.top)

      DOMCursor.MutableDOMCursor = MutableDOMCursor
      DOMCursor.emptyDOMCursor = emptyDOMCursor
      DOMCursor.isCollapsed = isCollapsed
      DOMCursor.selectRange = selectRange
      DOMCursor.getTextPosition = getTextPosition
      DOMCursor.differentPosition = differentPosition
      DOMCursor.differentLines = differentLines
      DOMCursor.debug = false

      DOMCursor
