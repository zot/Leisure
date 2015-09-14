Simple operational transformation engine

    define ['./lib/fingertree', './lib/lodash.min', './testing'], (Fingertree, _, Testing)->
      {
        assert
        assertEq
      } = Testing
      class ConcurrentReplacements
        constructor: (@replacements)->
          if !@replacements
            @replacements = Fingertree.fromArray [],
              identity: -> maxOffset: -1, float: 0
              measure: (v)-> maxOffset: v.start, float: v.float
              sum: (a, b)->
                maxOffset: Math.max a.maxOffset, b.maxOffset
                float: a.float + b.float
        isEmpty: -> @replacements.isEmpty()
        toString: ->
          ops = []
          @eachOperation (start, end, text)->
            ops.push "(#{start}, #{end}, #{JSON.stringify text})"
          ops.join ' '
        dump: -> console.log @toString()
        snapshot: -> new ConcurrentReplacements @replacements
        floatFor: (repl)->
          [first, rest] = @replacements.split (m)-> m.maxOffset >= repl.start
          m = first.measure()
          if !rest.isEmpty() && (n = rest.peekFirst()).start == repl.start
            float = m.float
            for op in n.operations
              if op.start <= repl.start && !isReplace op
                float += op.text.length - op.end + op.start
            float
          else m.float
        replace: (repl)->
          [first, rest] = @replacements.split (m)-> m.maxOffset >= repl.start
          if !first.isEmpty() && (prev = first.peekLast()).end >= repl.start
            first = first.removeLast()
            node = addOperation prev, repl
          else node = if !rest.isEmpty() && (target = rest.peekFirst()).start == repl.start
            rest = rest.removeFirst()
            addOperation target, repl
          else newNode repl
          while !rest.isEmpty() && node.end >= (next = rest.peekFirst()).start
            rest = rest.removeFirst()
            node = addOperations node, next.operations
          @replacements = first.concat rest.addFirst node

Call func for each operation, adjusted by what the prefious effect
would be on the document.

Func is called with: (start, end, text, offset), where offset is the
calculated offset that was added to the original start and end.  You
can subtract offset to get the original start and end if you need to.

        eachOperation: (func)->
          offset = 0
          t = @replacements
          while !t.isEmpty()
            node = t.peekLast()
            for repl in node.activeOperations
              func repl.start, repl.end, repl.text, repl.cookies ? [repl], node
            t = t.removeLast()


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

      newNode = (repl)->
        computeNodeEffect
          start: repl.start
          operations: [repl]

SequentialReplacements captures successive replacements within a version

      class SequentialReplacements
        constructor: (reps)->
          @replacements = reps ? Fingertree.fromArray [],
            identity: -> initial: 0, final: 0
            measure: (n)-> initial: n.leading + n.length, final: n.leading + n.text.length
            sum: (a, b)->
              initial: a.initial + b.initial
              final: a.final + b.final
        snapshot: -> new SequentialReplacements @replacements
        isEmpty: -> @replacements.isEmpty()
        initialBounds: ->
          if @isEmpty() then start: 0, end: 0
          else start: @replacements.peekFirst().leading, end: @replacements.measure().initial
        finalBounds: ->
          if @isEmpty() then start: 0, end: 0
          else start: @replacements.peekFirst().leading, end: @replacements.measure().final
        replace: (repl)->
          {start, end, text} = repl
          [first, rest] = @replacements.split (m)-> m.final >= start
          l = first.measure().final
          if !rest.isEmpty() && l + (old = rest.peekFirst()).leading <= end
            node = mergeRepl l, old, repl
            rest = rest.removeFirst()
          else
            node =
              leading: repl.start - l
              length: repl.end - repl.start
              text: text
              cookies: repl.cookies ? [repl]
            if !rest.isEmpty()
              next = rest.peekFirst()
              #rest = rest.removeFirst().addFirst _.merge {}, next, {leading: next.leading - repl.end + text.length - repl.end + repl.start}
              rest = rest.removeFirst().addFirst _.merge {}, next, {leading: next.leading - repl.end}
          @replacements = first.concat rest.addFirst node
          old?.repl
        dump: -> console.log @toString()
        toString: ->
          strs = []
          @eachOperation (start, end, text)->
            strs.push "#{start}, #{end}, #{JSON.stringify text}"
          strs.join '\n'
        toConcurrent: (conc)->
          conc = conc ? new ConcurrentReplacements()
          @eachOperation (start, end, text, cookies)->
            conc.replace {start, end, text, cookies}
          conc
        eachOperation: (func)->
          t = @replacements
          while !t.isEmpty()
            n = t.peekLast()
            t = t.removeLast()
            start = t.measure().initial + n.leading
            func start, start + n.length, n.text, n.cookies, n
          null
        merge: (replacements)->
          newReps = @snapshot()
          replacements.eachOperation (start, end, text, cookies, node)->
            newReps.replace {start, end, text, cookies}
          newReps

Merge overlapping repl with node

      mergeRepl = (offset, node, repl)->
        start = offset + node.leading
        end = start + node.length
        rStart = Math.max 0, repl.start - start
        rEnd = repl.end - start
        newStart = Math.min(start, repl.start)
        leading: newStart - offset
        length: end + Math.max(0, repl.end - start - node.text.length) - Math.min repl.start, start
        text: node.text.substring(0, rStart) + repl.text + node.text.substring rEnd
        cookies: node.cookies.concat repl.cookies ? [repl]

Merge reps array and run func on the resulting changes

      runReplacements = (reps, func)->
        reps = reps.slice()
        curVersion = -1
        curId = null
        reps = sortReplacements reps
        connectionOps = new SequentialReplacements()
        versionOps = new ConcurrentReplacements()
        prepConnection = (id)->
          if !connectionOps.isEmpty()
            connectionOps.eachOperation (start, end, text, cookies, node)->
              versionOps.replace {start: start, end: end, text, cookies}
            connectionOps = new SequentialReplacements()
          curId = id
        prepVersion = (v)->
          if !versionOps.isEmpty()
            versionOps.eachOperation func
            versionOps = new ConcurrentReplacements()
          curVersion = v
        for repl in reps
          if repl.version != curVersion || repl.connectionId != curId
            prepConnection repl.connectionId
          if repl.version != curVersion then prepVersion repl.version
          connectionOps.replace repl
        if !connectionOps.isEmpty() then prepConnection()
        if !versionOps.isEmpty() then prepVersion()
        
      sequentialReplacements = (reps)->
        s = new SequentialReplacements()
        for repl in reps
          s.replace repl
        s

      concurrentReplacements = (reps)->
        s = new SequentialReplacements()
        runReplacements reps, (start, end, text, repls)->
          s.replace {start, end, text}, repls
        s

      sortReplacements = (reps)-> _.sortByAll reps, ['version', 'connectionId']
      #sortReplacements = (reps)-> _.sortByAll reps, ['version', 'connectionId', 'messageCount']

      replacementsString = (reps)->
        strs = []
        runReplacements reps, (start, end, text)-> strs.push "#{start}, #{end}, #{JSON.stringify text}"
        strs.join '\n'

      buildReplacementTest = ->
        reps = []
        version = 0
        connectionId = 'connection-1'
        replace: (start, end, text)->
          reps.push {start, end, text, version: version, connectionId: connectionId}
          this
        assertEq: (expected)->
          if (given = replacementsString(reps)) != expected
            throw new Error "Bad replacement, expected <#{expected}> but got <#{given}>"
          this
        incVersion: ->
          version++
          this
        setConnection: (con)->
          connectionId = con
          this
        dump: -> console.log replacementsString reps

      tests = ->
        buildReplacementTest()
          .replace 4, 4, 'X'
          .replace 0, 0, 'Y'
          .assertEq """
            4, 4, "X"
            0, 0, "Y"
          """
        buildReplacementTest()
          .replace 100, 109, 'duh'
          .replace 101, 102, 'HELLO'
          .assertEq """
            100, 109, "dHELLOh"
          """
          .replace 100, 109, 'poop'
          .assertEq """
            100, 111, "poop"
          """
          .replace 95, 100, ''
          .assertEq """
            95, 111, "poop"
          """
          .replace 30, 35, 'smeg'
          .assertEq """
            95, 111, "poop"
            30, 35, "smeg"
          """
          .replace 25, 33, 'blorfl'
          .assertEq """
            95, 111, "poop"
            25, 35, "blorflg"
          """
        buildReplacementTest()
          .replace 63, 63, "a"
          .replace 60, 60, "a"
          .replace 59, 59, "a"
          .dump()

      {
        ConcurrentReplacements
        SequentialReplacements
        runReplacements
        replacementsString
        sortReplacements
        sequentialReplacements
        concurrentReplacements
        tests
      }
