Simple operational transformation engine

    define ['./lib/fingertree'], (Fingertree)->
      class OT
        constructor: (@operations)->
          if !@operations
            @operations = Fingertree.fromArray [],
              identity: -> maxOffset: -1, float: 0
              measure: (v)-> maxOffset: v.start, float: v.float
              sum: (a, b)->
                maxOffset: Math.max a.maxOffset, b.maxOffset
                float: a.float + b.float
        toString: ->
          ops = []
          @eachOperation (start, end, text)->
            ops.push "(#{start}, #{end}, #{JSON.stringify text})"
          ops.join ' '
        snapshot: -> new OT @operations
        floatFor: (repl)->
          [first, rest] = @operations.split (m)-> m.maxOffset >= repl.start
          m = first.measure()
          if !rest.isEmpty() && (n = rest.peekFirst()).start == repl.start
            float = m.float
            for op in n.operations
              if op.start <= repl.start && !isReplace op
                float += op.text.length - op.end + op.start
            float
          else m.float
        replace: (repl)->
          [first, rest] = @operations.split (m)-> m.maxOffset >= repl.start
          if !first.isEmpty() && (prev = first.peekLast()).end > repl.start - 2
            first = first.removeLast()
            node = addOperation prev, repl
          else node = if !rest.isEmpty() && (target = rest.peekFirst()).start == repl.start
            rest = rest.removeFirst()
            addOperation target, repl
          else newNode repl
          while !rest.isEmpty() && node.end > (next = rest.peekFirst()).start - 2
            rest = rest.removeFirst()
            node = addOperations node, next.operations
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
            offset += node.float
            t = t.removeFirst()

      isReplace = (repl)-> repl.end > repl.start && repl.text.length

      computeNodeEffect = (node)->
        insertionText = ''
        repl = null
        del = null
        operations = []
        float = 0
        end = node.start
        for op in node.operations
          if op.end == op.start
            operations.push op
            float += op.text.length
          else if !op.text.length then del = op
          else repl = op
        if del then operations.unshift del
        else if repl then operations.push repl
        if operation = del || repl
          float += operation.text.length - operation.end + operation.start
        for op in operations
          end = Math.max end, op.end
        node.float = float
        node.end = end
        node.activeOperations = operations
        node

      addOperation = (node, record)-> addOperations node, [record]

      addOperations = (node, records)->
        computeNodeEffect
          start: node.start
          operations: node.operations.concat records

      newNode = (record)->
        computeNodeEffect
          start: record.start
          operations: [record]

Replacements captures successive replacements within a version

      class Replacements
        constructor: ->
          @replacements = Fingertree.fromArray [],
            identity: -> start: -1, float: 0
            measure: ({start, end, text})-> start: start, float: text.length - end + start
            sum: (a, b)-> start: b.start, float: a.float + b.float
        replace: (repl)->
          {start, end, text} = repl
          [first, rest] = @replacements.split (m)-> m.start >= start
          if !first.isEmpty() && (old = first.peekLast()) && old.end >= start
            first = first.removeLast()
            node = mergeRepl old, repl
          else if !rest.isEmpty() && (old = rest.peekFirst()) && (old.start == start || end >= old.start)
            rest = rest.removeFirst()
            node = mergeRepl old, repl
          else node =
            start: start
            end: end
            text: text
            repl: repl
          @replacements = first.concat rest.addFirst node
          old?.repl
        dump: ->
          t = @replacements
          while !t.isEmpty()
            n = t.peekFirst()
            console.log "#{n.start}, #{n.end}, #{JSON.stringify n.text}"
            t = t.removeFirst()
          null

      mergeRepl = (node, repl)->
        rStart = Math.max 0, repl.start - node.start
        rEnd = repl.end - node.start
        start: Math.min node.start, repl.start
        end: node.end + Math.max 0, repl.end - node.start - node.text.length
        text: node.text.substring(0, rStart) + repl.text + node.text.substring rEnd
        repl: repl

      Replacements.test = ->
        r = new Replacements()
        r.replace start: 100, end: 109, text: 'duh'
        r.replace start: 101, end: 102, text: 'HELLO'
        r.replace start: 100, end: 109, text: 'poop'
        r.replace start: 95, end: 100, text: ''
        r.replace start: 30, end: 35, text: 'smeg'
        r.replace start: 25, end: 34, text: 'blorfl'
        r.dump()
        r

      OT.Replacements = Replacements

      window.Replacements = Replacements

      OT
