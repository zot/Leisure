Simple operational transformation engine

    define ['./lib/fingertree', './lib/lodash.min', './testing', 'immutable'], (Fingertree, _, Testing, Immutable)->
      {
        assert
        assertEq
      } = Testing
      {
        Set
      } = Immutable

      #diag = (args...)-> console.log args...
      diag = (args...)->

      class ConcurrentReplacements
        constructor: (@replacements)->
          if !@replacements
            @replacements = Fingertree.fromArray [],
              identity: -> offset: 0, float: 0
              measure: (v)->
                offset: v.offset
                float: v.float
              sum: (a, b)->
                offset: a.offset + b.offset
                float: a.float + b.float
        isEmpty: -> @replacements.isEmpty()
        toString: ->
          ops = []
          @eachOperation (start, end, text)->
            ops.push "(#{start}, #{end}, #{JSON.stringify text})"
          ops.join ' '
        dump: -> console.log @toString()
        snapshot: -> new ConcurrentReplacements @replacements
        measure: -> @replacements.measure()
        replace: (repl)->
          [first, rest] = @replacements.split (m)-> m.offset >= repl.start
          m = first.measure()
          node = if !rest.isEmpty() && m.offset + (old = rest.peekFirst()).offset == repl.start
            rest = rest.removeFirst()
            addOperation old, repl
          else
            old = null
            if !rest.isEmpty()
              oldNext = rest.peekFirst()
              newNext = _.defaults (offset: oldNext.offset + m.offset - repl.start), oldNext
              rest = rest.removeFirst().addFirst newNext
            createNode repl.start - m.offset, repl
          @replacements = first.concat rest.addFirst node
          [old, node]
        replacementsAt: (start)->
          [first, rest] = @replacements.split (m)-> m.length >= start
          m = first.measure()
          if !rest.isEmpty() && m.offset + (node = rest.peekFirst()).offset <= start
            merged = new SequentialReplacements()
            results = []
            for repl in node.activeOperations
              merged.replace repl
            merged.eachOperation (start, end, text, cookies)->
              results.push {start, end, text, cookies}
            merged
        floatFor: (start)->
          [first, rest] = @replacements.split (m)-> m.offset > start
          first.measure().float
        addFloat: (start, float)-> if float
          [first, rest] = @replacements.split (m)-> m.offset >= start
          if !rest.isEmpty()
            node = rest.peekFirst()
            newNode = _.defaults {offset: node.offset + float}, node
            @replacements = first.concat rest.removeFirst().addFirst newNode

Call func for each concurrent operation, but ignore overlapping ones.
Also call func for each label.

Func is called with: (start, end, text, labels, original)

        eachOperation: (func)->
          prevEnd = 0
          @eachNode (node, offset, start)->
            if prevEnd <= offset
              for repl in node.activeOperations by -1
                func start, repl.end - repl.start + start, repl.text, [], repl.original ? repl, node
              prevEnd = offset + node.length
            if node.labels && node.labels.length
              func start, start, '', node.labels, null, node

        eachNode: (func)->
          offset = 0
          t = @replacements
          float = 0
          offset = 0
          while !t.isEmpty()
            node = t.peekFirst()
            t = t.removeFirst()
            offset += node.offset
            func node, offset, offset + float
            float += node.float

      ConcurrentReplacements.fromArray = (reps)->
        t = new ConcurrentReplacements()
        for repl in reps
          t.replace repl
        t

      isReplace = (repl)-> repl.end > repl.start && repl.text.length

      computeNodeEffect = (node)->
        insertionText = ''
        repl = null
        operations = []
        float = 0
        length = 0
        for op in node.operations
          if op.end == op.start
            operations.push op
            float += op.text.length
          else if !repl || op.end - op.start > repl.end - repl.start
            repl = op
        if repl
          operations.push repl
          node.length = repl.end - repl.start
          float += repl.text.length - node.length
        else node.length = 0
        node.float = float
        node.activeOperations = operations
        node

      addOperation = (node, record)->
        computeNodeEffect
          offset: node.offset
          operations: node.operations.concat [record]
          labels: node.labels.concat record.labels ? []

      createNode = (offset, repl)->
        computeNodeEffect {
          offset
          operations: [repl]
          labels: repl.labels ? []
        }

SequentialReplacements captures successive replacements within a version

      class SequentialReplacements
        constructor: (reps)->
          @replacements = reps ? Fingertree.fromArray [],
            identity: -> initial: 0, final: 0, float: 0
            measure: (n)->
              initial: n.offset + n.length
              final: n.offset + n.text.length
              float: n.text.length - n.length
            sum: (a, b)->
              initial: a.initial + b.initial
              final: a.final + b.final
              float: a.float + b.float
        snapshot: -> new SequentialReplacements @replacements
        isEmpty: -> @replacements.isEmpty()
        initialBounds: ->
          if @isEmpty() then start: 0, end: 0
          else start: @replacements.peekFirst().offset, end: @replacements.measure().initial
        finalBounds: ->
          if @isEmpty() then start: 0, end: 0
          else start: @replacements.peekFirst().offset, end: @replacements.measure().final
        measure: -> @replacements.measure()
        floatFor: (offset)->
          @replacements.split((m)-> m.initial > offset)[0].measure().float
        addFloat: (start, float)->
          [first, rest] = @replacements.split (m)-> m.final >= start
          l = first.measure().final
          if !rest.isEmpty()
            n = rest.peekFirst()
            rest = rest.removeFirst().addFirst _.defaults {offset: n.offset + float}, n
            @replacements = first.concat rest
        replace: (repl)->
          {start, end, text} = repl
          [first, rest] = @replacements.split (m)-> m.final >= start
          l = first.measure().final
          if !rest.isEmpty() && l + (old = rest.peekFirst()).offset <= end
            node = mergeRepl l, old, repl
            rest = rest.removeFirst()
          else
            node =
              offset: repl.start - l
              length: repl.end - repl.start
              text: text
              labels: repl.labels ? []
            if !rest.isEmpty()
              next = rest.peekFirst()
              rest = rest.removeFirst().addFirst _.defaults {offset: next.offset + l - repl.end}, next
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
            start = t.measure().initial + n.offset
            func start, start + n.length, n.text, n.labels, n
          null
        merge: (replacements)->
          replacements.eachOperation (start, end, text, labels)=>
            @replace {start, end, text, labels}
        toArray: ->
          results = []
          t = @replacements
          while !t.isEmpty()
            n = t.peekFirst()
            t = t.removeFirst()
            start = t.measure().initial + n.offset
            results.push start, start + n.length, n.text
            for label in n.labels
              results.push label
          results

      eachReplacement = (reps, func)->
        i = 0
        while i < reps.length
          start = reps[i++]
          end = reps[i++]
          text = reps[i++]
          labels = []
          while typeof reps[i] == 'object'
            labels.push reps[i++]
          func start, end, text, labels

      SequentialReplacements.fromArray = (reps)->
        seq = new SequentialReplacements()
        eachReplacement reps, (start, end, text, labels)-> seq.replace {start, end, text, labels}
        seq

Merge overlapping repl with node

      mergeRepl = (offset, node, repl)->
        start = offset + node.offset
        end = start + node.length
        rStart = Math.max 0, repl.start - start
        rEnd = repl.end - start
        newStart = Math.min(start, repl.start)
        labels = if rStart == node.text.length then node.labels[..]
        else for label in node.labels
          name: label.name
          offset: if rStart >= label.offset then label.offset
          else label.offset + repl.text.length - repl.start + repl.end
        if repl.labels? then for label in repl.labels
          labels.push
            name: label.name
            offset: label.offset + rStart
        offset: newStart - offset
        length: end + Math.max(0, repl.end - start - node.text.length) - Math.min repl.start, start
        text: node.text.substring(0, rStart) + repl.text + node.text.substring rEnd
        labels: labels

      #labelNames = (n)-> new Set (label.name for label in n.labels)

      allReplacements = (reps)->
        {firstVersion, versionInfo} = computeReplacements(reps)
        all = new SequentialReplacements()
        for vinfo, v in versionInfo
          all.merge vinfo
        all

      runReplacements = (reps, func)-> allReplacements(reps).eachOperation func

computeReplacements: compute the transformed replacements for a list
of replacements, REPS.  Each replacement has the following properties:

- version: n, these are sequential with no gaps
- parent(opt): version, the parent version for this replacement
- replacements: array of replacement commands, [start, end, text, label..., ...]

      XcomputeReplacements = (reps)->
        if !reps.length then firstVersion: 0, versionInfo: []
        else
          firstVersion = reps.reduce ((a, el)-> Math.min a, el.parent), reps[0].parent
          versionInfo = (new ConcurrentReplacements() for i in [firstVersion ... reps[0].version])
          diag "START REPLACING -----------"
          for repl, i in reps
            versionInfo.push new ConcurrentReplacements()
            if !repl.parent then eachReplacement repl.replacements, (start, end, text)->
              versionInfo[i].replace {start, end, text}
            else
              index = Math.max 0, repl.parent - firstVersion
              vinfo = versionInfo[index]
              eachReplacement repl.replacements, (start, end, text)->
                [old, node] = vinfo.replace {start, end, text}
                if index + 1 < i
                  float = node.float
                  if old then float -= old.float
                  if float
                    console.log "OUT OF DATE OPERATION FLOAT: v#{repl.version} #{start}, #{float}"
                    for modInfo in versionInfo[index + 1...i]
                      modInfo.addFloat start, float
          diag "END REPLACING -----------\n\n"
          {firstVersion, versionInfo}

      computeReplacements = (reps)->
        if !reps.length then firstVersion: 0, versionInfo: []
        else
          reps = _.cloneDeep reps
          firstVersion = reps.reduce ((a, el)-> Math.min a, el.parent), reps[0].parent
          versionInfo = (new ConcurrentReplacements() for i in [firstVersion ... reps[0].version])
          diag "START REPLACING -----------"
          for repl, i in reps
            versionInfo.push new ConcurrentReplacements()
            index = Math.max 0, repl.parent - firstVersion
            vinfo = versionInfo[index]
            eachReplacement repl.replacements, (start, end, text)->
              [old, node] = vinfo.replace {start, end, text}
              float = node.float
              if old then float -= old.float
              if float
                #console.log "OUT OF DATE OPERATION FLOAT: v#{repl.version} #{start}, #{float}"
                for modInfo in versionInfo[index + 1..repl.version - firstVersion]
                  modInfo.addFloat start, float
                for modRep in reps[i + 1..]
                  if repl.parent < modRep.parent < repl.version
                    rIndex = 0
                    while rIndex < modRep.replacements.length
                      if typeof modRep.replacements[rIndex] != 'number' then rIndex++
                      else if modRep.replacements[rIndex] >= start
                        modRep.replacements[rIndex++] += float
                        modRep.replacements[rIndex++] += float
                      else rIndex += 2
          diag "END REPLACING -----------\n\n"
          {firstVersion, versionInfo}

      #computeReplacements = (reps)->
      #  reps = _.cloneDeep reps
      #  firstVersion = reps[0].version - 1
      #  versionInfo = [[]]
      #  for repl, i in reps
      #    versionInfo.push []
      #    for modRepl in reps[0...i]
      #      if modRepl.parent > repl.parent

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

      replacementsString = (reps)->
        strs = []
        runReplacements reps, (start, end, text)-> strs.push "#{start}, #{end}, #{JSON.stringify text}"
        strs.join '\n'

      buildReplacementTest = ->
        reps = []
        version = 0
        connectionId = 'connection-1'
        replace: (start, end, text)->
          reps.push {start, end, text, version: version, connectionId: connectionId, knownVersion: version}
          this
        assertEq: (expected)->
          if (given = replacementsString(reps)) != expected
            throw new Error "Bad replacement, expected <#{expected}> but got <#{given}>"
          this
        version: (v)->
          version = v
          this
        incVersion: ->
          version++
          this
        setConnection: (con)->
          connectionId = con
          this
        dump: ->
          console.log replacementsString reps
          this

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
        #buildReplacementTest()
        #  .replace 63, 63, "a"
        #  .replace 60, 60, "a"
        #  .replace 59, 59, "a"
        #  .dump()
        #buildReplacementTest()
        #  .setConnection 'test-1'
        #  .replace 30, 30, 'a'
        #  .replace 31, 31, 'd'
        #  .incVersion()
        #  .setConnection 'test-2'
        #  .replace 169, 170, '3'
        #  .replace 169, 170, '0'
        #  .dump()
        console.log "duh"
        buildReplacementTest()
          .version 3
          .replace 13, 13, ';'
          .replace 14, 14, 'l'
          .replace 15, 15, 'k'
          .version 7
          .replace 16, 16, 'j'
          .assertEq """
            13, 13, ";lk"
            16, 16, "j"
          """
          .assertEq replacementsString([{"connectionId":"peer-0","mine":true,"pendingCount":5,"end":13,"knownVersion":3,"start":13,"text":";","type":"replace","version":3,"messageCount":6},{"connectionId":"peer-0","mine":true,"pendingCount":6,"end":14,"knownVersion":3,"start":14,"text":"l","type":"replace","version":3,"messageCount":7},{"connectionId":"peer-0","mine":true,"pendingCount":7,"end":15,"knownVersion":5,"start":15,"text":"k","type":"replace","version":3,"messageCount":9},{"connectionId":"peer-0","mine":true,"pendingCount":8,"end":16,"knownVersion":7,"start":16,"text":"j","type":"replace","version":7}])
          .dump()
        console.log 'poop'
        buildReplacementTest()
          .version 13
          .replace 55, 55, "d"
          .replace 44, 44, "l"
          .replace 46, 46, "k"
          .replace 45, 45, "j"
          .version 17
          .replace 65, 65, "j"
          .replace 64, 64, "l"
          .replace 67, 67, "d"
          .replace 66, 66, "a"
          .replace 62, 62, ";"
          .replace 63, 63, "k"
          .replace 61, 61, "f"
          .version 13
          .replace 51, 51, "s"
          .replace 50, 50, "a"
          .replace 47, 47, " "
          .dump()


      testData = [
        {start: 55, end: 55, text: "d", version: 13, connectionId: "peer-0", messageCount: 23}, 
        {start: 44, end: 44, text: "l", version: 13, connectionId: "peer-0", messageCount: 15}, 
        {start: 46, end: 46, text: "k", version: 13, connectionId: "peer-0", messageCount: 17}, 
        {start: 45, end: 45, text: "j", version: 13, connectionId: "peer-0", messageCount: 16}, 
        {start: 65, end: 65, text: "j", version: 17, connectionId: "peer-0", messageCount: 29}, 
        {start: 64, end: 64, text: "l", version: 17, connectionId: "peer-0", messageCount: 28}, 
        {start: 67, end: 67, text: "d", version: 17, connectionId: "peer-0", messageCount: 32}, 
        {start: 66, end: 66, text: "a", version: 17, connectionId: "peer-0", messageCount: 31}, 
        {start: 62, end: 62, text: ";", version: 17, connectionId: "peer-0", messageCount: 26}, 
        {start: 63, end: 63, text: "k", version: 17, connectionId: "peer-0", messageCount: 27}, 
        {start: 61, end: 61, text: "f", version: 17, connectionId: "peer-0", messageCount: 25}, 
        {start: 51, end: 51, text: "s", version: 13, connectionId: "peer-0", messageCount: 21}, 
        {start: 50, end: 50, text: "a", version: 13, connectionId: "peer-0", messageCount: 20}, 
        {start: 47, end: 47, text: " ", version: 13, connectionId: "peer-0", messageCount: 18}
      ]

      testData2 = [
        {start: 33, end: 33, text: "d", type: "replace", version: 0, connectionId: "peer-0", messageCount: 3}, 
        {start: 34, end: 34, text: "f", type: "replace", version: 0, connectionId: "peer-0", messageCount: 4}, 
        {start: 37, end: 37, text: ";", type: "replace", version: 0, connectionId: "peer-0", messageCount: 6}, 
        {start: 38, end: 38, text: "l", type: "replace", version: 0, connectionId: "peer-0", messageCount: 7}, 
        {start: 39, end: 39, text: "k", type: "replace", version: 0, connectionId: "peer-0", messageCount: 8}, 
        {start: 43, end: 43, text: "j", type: "replace", version: 3, connectionId: "peer-0"}, 
        {start: 78, end: 78, text: " ", type: "replace", version: 3, connectionId: "peer-0"}, 
        {start: 79, end: 79, text: "a", type: "replace", version: 3, connectionId: "peer-0"}, 
        {start: 114, end: 114, text: "s", type: "replace", version: 3, connectionId: "peer-0"}, 
        {start: 149, end: 149, text: "d", type: "replace", version: 7, connectionId: "peer-0"}, 
        {start: 150, end: 150, text: ";", type: "replace", version: 7, connectionId: "peer-0"}, 
        {start: 151, end: 151, text: "l", type: "replace", version: 7, connectionId: "peer-0"}, 
        {start: 152, end: 152, text: "f", type: "replace", version: 7, connectionId: "peer-0"}, 
        {start: 153, end: 153, text: "k", type: "replace", version: 7, connectionId: "peer-0"}, 
        {start: 154, end: 154, text: "j", type: "replace", version: 7, connectionId: "peer-0"}, 
      ]

      window.OT_TEST_REPL = ->
        rep = allReplacements [
          {parent:1, replacements:[30, 30, "a"], version:3},
          {parent:3, replacements:[31, 31, "s"], version:4},
          {version:5, parent:3, replacements:[60, 60, "q"]},
          {parent:4, replacements:[32, 32, "d"], version:6},
          {version:7, parent:5, replacements:[62, 62, "w"]},
          {parent:6, replacements:[33, 33, "f"], version:8},
          {version:9, parent:7, replacements:[64, 64, "e"]},
          {parent:9, replacements:[34, 34, "a"], version:10},
          {parent:10, replacements:[35, 35, "s"], version:11},
          {version:12, parent:10, replacements:[67, 67, "q"]},
          {parent:11, replacements:[36, 36, "f"], version:13},
          {version:14, parent:12, replacements:[69, 69, "w"]},
          {version:15, parent:14, replacements:[71, 71, "e"]},
        ]
        assertEq ((exp, act)-> "Expected #{exp} but got #{act}"), """
          59, 59, "qweqwe"
          30, 30, "asdfasf"
        """, rep.toString()

      window?.replacementsString = replacementsString

      {
        ConcurrentReplacements
        SequentialReplacements
        runReplacements
        computeReplacements
        replacementsString
        sequentialReplacements
        concurrentReplacements
        allReplacements
        tests
        testData2
      }
