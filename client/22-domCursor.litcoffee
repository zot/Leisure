DOMCursor
=========

Filtered cursoring on DOM documents.  DOMCursors can move forwards or backwards, by node or by character, with settable filters that can seamlessly skip over parts of the DOM.


The DOMCursor class
-------------------

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

    class DOMCursor
      constructor: (@node, @pos, filter)->
        @pos = @pos ? 0
        @filter = filter || -> true
        @computeType()
      computeType: ->
        @type = if !@node then 'empty'
        else if @node.nodeType == Node.TEXT_NODE then 'text'
        else 'element'
        this
      newPos: (node, pos)-> new DOMCursor node, pos, @filter
      setFilter: (f)-> new DOMCursor @node, @pos, f
      addFilter: (filt)->
        oldFilt = @filter
        @setFilter (n)->
          (((r1 = oldFilt n) in ['quit', 'skip']) && r1) || (((r2 = filt n) in ['quit', 'skip']) && r2) || (r1 && r2)
      firstText: (backwards)->
        n = this
        while !n.isEmpty() && n.type != 'text'
          n = (if backwards then n.prev() else n.next())
        n

Count the characters in the filtered nodes until we get to (node, pos)

Include (node, 0) up to but not including (node, pos)

      countChars: (node, pos)->
        tot = 0
        while !n.isEmpty() && n.node != node
          if n.type == 'text' then tot += n.node.length
          n = n.next()
        if n.isEmpty() || n.node != node then -1
        else if n.type == 'text' then tot + pos
        else tot

Move the cursor forward by count characters

if contain is true and the final location is 0 then go to the end of
the previous text node (node, node.length)

      forwardChars: (count, contain)->
        n = this
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
      hasAttribute: (a)-> @node?.nodeType == Node.ELEMENT_NODE && @node.hasAttribute a
      getAttribute: (a)-> @node?.nodeType == Node.ELEMENT_NODE && @node.getAttribute a
      filterTextNodes: -> @addFilter (n)-> n.type == 'text'
      filterVisibleTextNodes: -> @filterTextNodes().addFilter (n)-> !isCollapsed n.node
      filterParent: (parent)->
        if !parent then @setFilter -> 'quit'
        else @addFilter (n)-> parent.contains(n.node) || 'quit'
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
          else if startPos & Node.DOCUMENT_POSITION_FOLLOWING
            endPos = endContainer.compareDocumentPosition n.node
            if endPos == 0 then n.pos <= endOffset
            else endPos & Node.DOCUMENT_POSITION_PRECEDING) || 'quit'
      getText: ->
        n = @mutable().firstText()
        if n.isEmpty() then ''
        else
          t = n.node.data.substring n.pos
          while !n.next().isEmpty()
            if n.type == 'text' then t += n.node.data.substring n.pos
          if t.length
            while n.type != 'text'
              n.prev()
            n.pos = n.node.length
            while n.pos > 0 && reject n.filter n
              n.pos--
            t.substring 0, t.length - n.node.length + n.pos
          else ''
      isEmpty: -> @type == 'empty'
      isNL: -> @type == 'text' && @node.data[@pos] == '\n'
      endsInNL: -> @type == 'text' && @node.data[@node.length - 1] == '\n'
      moveToStart: -> @newPos @node, 0
      moveToNextStart: -> @next().moveToStart()
      moveToEnd: ->
        end = @node.length - (if @endsInNL() then 1 else 0)
        @newPos @node, end
      moveToPrevEnd: -> @prev().moveToEnd()
      nodeAfter: (up)->
        node = @node
        while node
          if node.nodeType == Node.ELEMENT_NODE && !up && node.childNodes.length
            return @newPos node.childNodes[0], 0
          else if node.nextSibling
            return @newPos node.nextSibling, 0
          else
            up = true
            node = node.parentNode
        @emptyNext()
      emptyNext: ->
        # return an empty next node where
        #   prev returns this node
        #   next returns the same empty node
        __proto__: emptyDOMCursor
        filter: @filter
        prev: (up)=> if up then @prev up else this
        nodeBefore: (up)=> if up then @nodeBefore up else this
      nodeBefore: (up)->
        node = @node
        while node
          if node.nodeType == Node.ELEMENT_NODE && !up && node.childNodes.length
            newNode = node.childNodes[node.childNodes.length - 1]
          else if node.previousSibling then newNode = node.previousSibling
          else
            up = true
            node = node.parentNode
            continue
          return @newPos newNode, newNode.length
        @emptyPrev()
      emptyPrev: ->
        # return an empty prev node where
        #   next returns this node
        #   prev returns the same empty node
        __proto__: emptyDOMCursor
        filter: @filter
        next: (up)=> if up then @next up else this
        nodeAfter: (up)=> if up then @nodeAfter up else this
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
      forwardLine: (goalFunc)->
        # optional goalFunc takes the position's screen pixel column as input
        # It returns -1, 0, or 1, comparing the input to the internal goal column
        if !goalFunc then goalFunc = -> -1
        r = @charRect()
        bottom = r.bottom
        line = 0
        n = this
        while n = n.forwardChar()
          if n.isEmpty() then return n.backwardChar()
          r = n.charRect()
          if r.bottom != bottom
            bottom = r.bottom
            line++
          if line == 1 && goalFunc(r.left) > -1 then return n
          if line == 2 then return n.backwardChar()
      backwardLine: (goalFunc)->
        # optional goalFunc takes the position's screen pixel column as input
        # It returns -1, 0, or 1, comparing the input to the internal goal column
        if !goalFunc then goalFunc = -> -1
        r = @charRect()
        prevTop = top = r.top
        line = 0
        n = this
        while n = n.backwardChar()
          if n.isEmpty() then return n.forwardChar()
          r = n.charRect()
          if r.top != top
            top = r.top
            line++
          if line == 1
            switch goalFunc r.left
              when 0 then return n
              when -1 then return (if prevTop == top then n.forwardChar() else n)
          if line == 2 then return n.forwardChar()
          prevTop = top
      forwardChar: ->
        r = stubbornCharRectNext(@node, @pos)
        left = r?.left
        bottom = r?.bottom
        n = this
        while n = (if n.pos + 1 < n.node.length then n.newPos n.node, n.pos + 1 else n.next())
          if n.isEmpty() || ((r = stubbornCharRectNext(n.node, n.pos)) && (left != r?.left || bottom != r?.bottom)) then return n
      backwardChar: ->
        r = stubbornCharRectPrev @node, @pos
        n = this
        while r && n = (if n.pos > 0 then n.newPos n.node, n.pos  - 1 else n.prev())
          if n.isEmpty() || n.moved(r) then return n
        n
      moved: (rec)->
        (@node.length > @pos) && (r2 = stubbornCharRectPrev @node, @pos) && (rec.top != r2.top || rec.left != r2.left)
      moveCaret: (r)->
        if !r then r = document.createRange()
        r.setStart @node, @pos
        r.collapse true
        selectRange r
        this
      charRect: (r, prev)->
        if prev
          stubbornCharRectPrev(@node, @pos, r) || stubbornCharRectNext(@node, @pos, r)
        else stubbornCharRect @node, @pos, r
      show: ->
        posRect = @charRect()
        barRect = $("#leisure_bar")[0].getClientRects()[0]
        top = if barRect.width && barRect.top == 0 then barRect.bottom else 0
        if posRect.bottom > window.innerHeight then window.scrollBy 0, posRect.bottom - window.innerHeight
        else if posRect.top < top then window.scrollBy 0, posRect.top - top
        this
      immutable: -> this
      save: -> this
      restore: (n)-> n.immutable()
      mutable: -> new MutableDOMCursor @node, @pos, @filter
      withMutations: (func)-> func @copy().mutable()
      copy: -> this

    class EmptyDOMCursor extends DOMCursor
      moveCaret: -> this
      show: -> this
      nodeAfter: -> this
      nodeBefore: -> this
      next: -> this
      prev: -> this

    #singleton empty node cursor
    emptyDOMCursor = new EmptyDOMCursor()

    class MutableDOMCursor extends DOMCursor
      constructor: (@node, @pos, @filter)-> super node, pos, filter
      setFilter: (f)->
        @filter = f
        this
      newPos: (@node, @pos)-> @computeType()
      copy: -> new MutableDOMCursor @node, @pos, @filter
      mutable: -> this
      immutable: -> new DOMCursor @node, @pos, @filter
      save: -> new DOMCursor @node, @pos, @filter
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

    # Thanks to rangy for this: http://code.google.com/p/rangy/
    isCollapsed = (node)->
      if node
        type = node.nodeType
        type == 7 || # PROCESSING_INSTRUCTION
        type == 8 || # COMMENT
        (type == Node.TEXT_NODE && (node.data == '' || isCollapsed(node.parentNode))) ||
        /^(script|style)$/i.test(node.nodeName) ||
        #(type == Node.ELEMENT_NODE && (node.offsetWidth == 0 || node.offsetHeight == 0))
        (type == Node.ELEMENT_NODE && node.offsetHeight == 0)
      else false

    selectRange = (r)->
      sel = getSelection()
      sel.removeAllRanges()
      sel.addRange r

    reject = (filterResult)-> !filterResult || (filterResult in ['quit', 'skip'])

    # charRect returns null for newlines when not using pre
    stubbornCharRect = (node, pos, r)->
      stubbornCharRectNext(node, pos, r) || stubbornCharRectPrev(node, pos, r)

    stubbornCharRectNext = (node, pos, r)->
      r = r || document.createRange()
      for i in [pos ... node.length] by 1
        if rec = charRect node, i, r then return rec
      null

    stubbornCharRectPrev = (node, pos, r)->
      r = r || document.createRange()
      for i in [pos .. 0] by -1
        if rec = charRect node, i, r then return rec
      null

    charRect = (node, pos, r)->
      r = r || document.createRange()
      r.setStart node, pos
      r.collapse true
      _(r.getClientRects()).last()

    DOMCursor.MutableDOMCursor = MutableDOMCursor
    DOMCursor.emptyDOMCursor = emptyDOMCursor
    DOMCursor.isCollapsed = isCollapsed
    DOMCursor.selectRange = selectRange

    @DOMCursor = DOMCursor
