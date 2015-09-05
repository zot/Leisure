Simple operational transformation engine

    define ['./lib/fingertree'], (Fingertree)->
      class OT
        constructor: (@operations)->
          if !@operations
            @operations = Fingertree.fromArray [],
              identity: -> maxOffset: -1, float: 0
              measure: (v)-> maxOffset: v.start, float: v.text.length - v.end + v.start
              sum: (a, b)->
                maxOffset: Math.max a.maxOffset, b.maxOffset
                float: a.float + b.float
        snapshot: -> new OT @operations
        floatFor: (offset)->
          @operations.split((m)-> m.maxOffset >= offset)[0].measure().float
        replace: (repl)->
          [first, rest] = @operations.split (m)-> m.maxOffset >= repl.start
          node = if !rest.isEmpty() && (target = rest.peekFirst()).start == repl.start
            rest = rest.removeFirst()
            addOperation target, repl
          else newNode repl
          @operations = first.concat rest.addFirst node

Call func for each operation, adjusted by what the prefious effect
would be on the document.

Func is called with: (start, end, text, offset), where offset is the
calculated offset that was added to the original start and end.  You
can subtract offset to get the original start and end if you need to.

        eachOperation: (func)->
          offset = 0
          t = @operations
          while !t.isEmpty()
            node = t.peekFirst()
            {end, text} = node
            func node.start + offset, end + offset, text, offset, node
            offset += text.length - end + node.start
            t = t.removeFirst()

      computeNodeEffect = (node)->
        deletionWidth = 0
        insertionText = ''
        replacementText = ''
        lastRepl = null
        replCount = 0
        lastDel = null
        operations = []
        for op in node.operations
          if op.end > op.start
            oldDel = deletionWidth
            deletionWidth = Math.max deletionWidth, op.end - op.start
            if oldDel != deletionWidth
              lastRepl = null
              replCount = 0
              if op.text.length == '' then lastDel = op
            if deletionWidth == op.end - op.start && op.text.length
              lastRepl = op
              replCount++
              replacementText = op.text
          if op.end == op.start
            insertionText += op.text
            operations.push op
        if lastDel then operations.unshift lastDel
        if lastRepl then operations.push lastRepl
        node.end = node.start + deletionWidth
        node.text = insertionText + replacementText
        node.activeOperations = operations
        node.replCount = replCount
        node

      addOperation = (node, record)->
        computeNodeEffect
          start: node.start
          operations: node.operations.concat [record]

      newNode = (record)->
        computeNodeEffect
          start: record.start
          operations: [record]

      OT
