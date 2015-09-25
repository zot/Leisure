Simple operational transformation engine

    define ['./lib/fingertree', './lib/lodash.min', './testing'], (Fingertree, _, Testing)->
      {
        assert
        assertEq
      } = Testing

      #diag = (args...)-> console.log args...
      diag = (args...)->

      class ConcurrentReplacements
        constructor: (@replacements)->
          if !@replacements
            @replacements = Fingertree.fromArray [],
              identity: -> maxOffset: -1, length: 0, float: 0
              measure: (v)->
                maxOffset: v.start
                float: v.float
                length: v.float + v.end
              sum: (a, b)->
                maxOffset: Math.max a.maxOffset, b.maxOffset
                float: a.float + b.float
                length: a.length + b.length
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
        replacementsAt: (start)->
          [first, rest] = @replacements.split (m)-> m.length >= start
          if !rest.isEmpty() && (node = rest.peekFirst()).start <= start
            merged = new SequentialReplacements()
            results = []
            for repl in node.activeOperations
              merged.replace repl
            merged.eachOperation (start, end, text, cookies)->
              results.push {start, end, text, cookies}
            merged

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
            measure: (n)->
              initial: n.leading + n.length
              final: n.leading + n.text.length
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
              float: 0
              cookies: repl.cookies ? [repl]
            if !rest.isEmpty()
              next = rest.peekFirst()
              #rest = rest.removeFirst().addFirst _.merge {}, next, {leading: next.leading - repl.end + text.length - repl.end + repl.start}
              #rest = rest.removeFirst().addFirst _.merge {}, next, {leading: next.leading - repl.end}
              rest = rest.removeFirst().addFirst _.merge {}, next, {leading: next.leading + l - repl.end}
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
        addFloat: (start, float)->
          [first, rest] = @replacements.split (m)-> m.final >= start
          l = first.measure().final
          if !rest.isEmpty()
            n = rest.peekFirst()
            rest = rest.removeFirst().addFirst _.merge {}, n, {leading: n.leading + float}
            @replacements = first.concat rest

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

      XrunReplacements = (reps, func)->
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
          if repl.version > curVersion then prepVersion repl.version
          connectionOps.replace repl
        if !connectionOps.isEmpty() then prepConnection()
        if !versionOps.isEmpty() then prepVersion()
        
      XrunReplacements = (reps, func)->
        reps = sortReplacements reps
        versionInfo = versionList: [], allOps: [], versions: {}
        vinfo = null
        curVersion = -1
        for repl in reps
          if repl.version < curVersion
            reintegrateRepl repl, versionInfo
          else
            if curVersion != repl.version
              curVersion = repl.version
              versionInfo.versionList.push String repl.version
              if vinfo then condenseVersions vinfo
              if !vinfo = versionInfo.versions[String repl.version]
                vinfo = versionInfo.versions[String repl.version] = repls: null, cons: {}
            if !rinfo = vinfo.cons[repl.connectionId]
              rinfo = vinfo.cons[repl.connectionId] = new SequentialReplacements()
            rinfo.replace repl
          versionInfo.allOps.push repl
        if vinfo
          results = new SequentialReplacements()
          for vName in _.sortBy(_.uniq _.map versionInfo.versionList, (i)-> Number i)
            vinfo = versionInfo.versions[String vName]
            #condenseVersions(vinfo).eachOperation (start, end, text, cookies)->
            #  results.replace {start, end, text, cookies}
            condenseVersions(vinfo).eachOperation func
          #results.eachOperation func
          #results.eachOperation (start, end, text)->
          #  if start < 0
          #    console.log "NEGATIVE REPL: #{start}, #{end}, #{JSON.stringify text}"
          #  func arguments...

runReplacements

- store reps in FT measuring by version and knownVersion (sorted on these)
- for each rep, sorted by version, 

      runReplacements = (reps, func)->
        diag "START REPLACING -----------"
        reps = for repl, i in _.sortByAll(reps, ['version', 'connectionId'])
          newRepl = _.clone repl
          newRepl.index = i
          if !newRepl.cookies then newRepl.cookies = [repl]
          newRepl
        ft = Fingertree.fromArray _.sortByAll(reps, ['version', 'knownVersion']),
          identity: -> version: 0, knownVersion: 0
          measure: (n)-> n
          sum: (a, b)->
            version: Math.max a.version, b.version
            knownVersion: Math.max a.knownVersion, b.knownVersion
        versionInfo = versionList: [], allOps: [], versions: {}
        vinfo = rinfo = curVersion = null
        for repl in reps
          if repl.messageCount?
            [candidates, remainder] = ft.split (m)-> m.knownVersion >= repl.messageCount
            [first, rest] = candidates.split (m)-> m.version > repl.version
          if repl.messageCount? && !rest.isEmpty()
            if !vinfo = versionInfo.versions[String repl.version]
              vinfo = versionInfo.versions[String repl.version] = repls: null, cons: {}
              versionInfo.versionList.push String repl.version
            oldRepl = condenseVersions(vinfo).replacementsAt(repl.start)?.replacements.measure() ?
              initial: 0
              final: 0
            if !conRepl = vinfo.cons[repl.connectionId]
              conRepl = vinfo.cons[repl.connectionId] = new SequentialReplacements()
            conRepl.replace repl
            vinfo.repls = null
            newRepl = condenseVersions(vinfo).replacementsAt(repl.start).replacements.measure()
            if float = newRepl.final - newRepl.initial - (oldRepl.final - oldRepl.initial)
              while !rest.isEmpty()
                adjRepl = rest.peekFirst()
                rest = rest.removeFirst()
                if adjRepl.connectionId != repl.connectionId
                  adjRepl.start += float
                  adjRepl.end += float
                  diag "  ADJUST REPL v #{adjRepl.version}, known: #{adjRepl.knownVersion}"
          else
            if curVersion != repl.version
              curVersion = repl.version
              versionInfo.versionList.push String repl.version
              #if vinfo then condenseVersions vinfo
              if !vinfo = versionInfo.versions[String repl.version]
                vinfo = versionInfo.versions[String repl.version] = repls: null, cons: {}
            if !rinfo = vinfo.cons[repl.connectionId]
              rinfo = vinfo.cons[repl.connectionId] = new SequentialReplacements()
            rinfo.replace repl
            vinfo.repls = null
            diag "  ADD REPL v #{repl.version}, known: #{repl.knownVersion}, #{if repl.messageCount then 'count: ' + repl.messageCount else '[pending]'}, #{repl.start}, #{repl.end}, '#{repl.text}'"
          versionInfo.allOps.push repl
        if vinfo
          results = new SequentialReplacements()
          for vName in _.sortBy(_.uniq _.map versionInfo.versionList, (i)-> Number i)
            vinfo = versionInfo.versions[String vName]
            diag "  CONDENSING VERSIONS #{vName}:\n#{condenseVersions(vinfo).toString()}"
            condenseVersions(vinfo).eachOperation func
        diag "END REPLACING -----------\n\n"

Ops will be sorted by knownVersion, version.  Return a new value for
ops, transforming each op whose version is larger than newOp's version
and whose knownVersion is less than newOp's messageCount.

      addOp = (ops, newOp, func)->
        insertIndex = _.sortedLastIndex ops, [newOp.version, newOp.knownVersion], (op)-> [op.version, op.knownVersion]
        transformIndex = _.sortedLastIndex ops, [newOp.version, newOp.messageCount], (op)-> [op.version, op.knownVersion]
        ret = ops.slice(0, insertIndex)
        ret.push newOp
        if (delta = newOp.text.length - newOp.start + newOp.end) == 0
          ret = ret.concat ops.slice.insertIndex
        else for op in ops.slice insertIndex
          if op.knownVersion < newOp.messageCount && newOp.start < op.start
            transOp = _.clone op
            if !op.cookies then transOp.cookies = [op]
            transOp.start += delta
            transOp.end += delta
            op = transOp
          ret.push op
        ret

      runOps = (reps, func)->
        diag "START REPLACING -----------"
        for repl in reps
          if curVersion != repl.version
            curVersion = repl.version
            versionInfo.versionList.push String repl.version
            #if vinfo then condenseVersions vinfo
            if !vinfo = versionInfo.versions[String repl.version]
              vinfo = versionInfo.versions[String repl.version] = repls: null, cons: {}
          if !rinfo = vinfo.cons[repl.connectionId]
            rinfo = vinfo.cons[repl.connectionId] = new SequentialReplacements()
          rinfo.replace repl
          vinfo.repls = null
          diag "  ADD REPL v #{repl.version}, known: #{repl.knownVersion}, #{if repl.messageCount then 'count: ' + repl.messageCount else '[pending]'}, #{repl.start}, #{repl.end}, '#{repl.text}'"
          versionInfo.allOps.push repl
        if vinfo
          results = new SequentialReplacements()
          for vName in _.sortBy(_.uniq _.map versionInfo.versionList, (i)-> Number i)
            vinfo = versionInfo.versions[String vName]
            diag "  CONDENSING VERSIONS #{vName}:\n#{condenseVersions(vinfo).toString()}"
            condenseVersions(vinfo).eachOperation func
        diag "END REPLACING -----------\n\n"

      condenseVersions = (vinfo)->
        if !vinfo.repls
          results = vinfo.repls = new ConcurrentReplacements()
          for con in _.keys(vinfo.cons).sort()
            vinfo.cons[con].eachOperation (start, end, text, cookies)->
              results.replace {start, end, text, cookies}
        vinfo.repls

      reintegrateRepl = (repl, versionInfo)->
        if !vinfo = versionInfo.versions[String repl.version]
          vinfo = versionInfo.versions[String repl.version] = repls: null, cons: {}
          versionInfo.versionList.push String repl.version
        oldRepl = condenseVersions(vinfo).replacementsAt(repl.start)?.replacements.measure() ?
          initial: 0
          final: 0
        if !conRepl = vinfo.cons[repl.connectionId]
          conRepl = vinfo.cons[repl.connectionId] = new SequentialReplacements()
        conRepl.replace repl
        vinfo.repls = null
        try
          if true || oldRepl
            newRepl = condenseVersions(vinfo).replacementsAt(repl.start).replacements.measure()
            if float = newRepl.final - newRepl.initial - (oldRepl.final - oldRepl.initial)
              diag "REINTEGRATION FLOAT: #{float}"
              affectedVersions = []
              for op in versionInfo.allOps by -1
                if op.version > repl.version
                  affectedVersions.push Number op.version
                else break
              affectedVersions = _.sortBy _.uniq affectedVersions
              for v in affectedVersions
                vinfo = versionInfo.versions[String v]
                vinfo.repls = null
                for con, repls of vinfo.cons
                  repls.addFloat repl.start, float
        catch err
          console.log err.stack
          console.log "versions: #{vinfo.repls.toString()}"
          console.log "repl: #{repl.start}, #{repl.end}, #{repl.text}"

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

sortReplacements should sort the replacements so they are consistently represent
the inputs to all of the peers, so known version N should occur before messageCount > N
but not before their own message count.

Reintegration will move smaller knownVersions

      #sortReplacements = (reps)->
      #  _.sortByAll reps, ['version', 'connectionId']

      stableSort = (array, func)->
        for el, i in array
          el.i = i
        array.sort (a, b)->
          r = func a, b
          if r == 0 then a.i - b.i else r

      #sortReplacements = (reps)->
      #  stableSort reps, (a, b)->
      #    if b.messageCount? && b.messageCount? then a.messageCount - b.messageCount
      #    else if a.messageCount then a.messageCount - b.knownVersion

      #sortReplacements = (reps)->
      #  stableSort reps, (a, b)->
      #    if b.messageCount? && a.version < b.messageCount then -1
      #    else if a.messageCount? && b.version < a.messageCount then 1
      #    else if a.version < b.version then -1
      #    else if b.version < a.version then 1
      #    else if a.connectionId < b.connectionId then -1
      #    else if b.connectionId < a.connectionId then 1
      #    else 0

      #sortReplacements = (reps)->
      #  stableSort reps, (a, b)->
      #    if a.messageCount? && b.messageCount? then a.messageCount - b.messageCount
      #    else a.knownVersion - b.knownVersion

      #sortReplacements = (reps)-> _.sortBy reps, (i)-> i.messageCount ? i.knownVersion

      #sortReplacements = (reps)-> _.sortBy reps, (i)-> i.knownVersion

      sortReplacements = (reps)->
        stableSort reps, (a, b)->
          if a.messageCount? && b.messageCount? then a.messageCount - b.messageCount
          else if (a.mine && b.mine) || !(a.messageCount? || b.messageCount?)
            a.knownVersion - b.knownVersion
          else if a.messageCount then a.messageCount - b.knownVersion
          else a.knownVersion - b.messageCount

      #sortReplacements = (reps)->
      #  stableSort reps, (a, b)->
      #    if a.messageCount? && b.messageCount? then a.messageCount - b.messageCount
      #    else if a.messageCount? then (a.messageCount <= b.knownVersion && -1) || 1
      #    else if b.messageCount? then (b.messageCount <= a.knownVersion && 1) || -1
      #    else 0

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

      #Leisure.testSort1 = testSort1 = ->
      testSort1 = ->
        reps = [
          {"mine":true,"pendingCount":1,"start":168,"end":169,"text":"4","type":"replace","version":0,"connectionId":"peer-0","knownVersion":0,"messageCount":2},
          {"mine":true,"pendingCount":2,"start":168,"end":169,"text":"3","type":"replace","version":0,"connectionId":"peer-0","knownVersion":0,"messageCount":3},
          {"mine":true,"pendingCount":3,"start":167,"end":169,"text":"37","type":"replace","version":0,"connectionId":"peer-0","knownVersion":0,"messageCount":4},
          {"mine":true,"pendingCount":4,"start":168,"end":169,"text":"0","type":"replace","version":0,"connectionId":"peer-0","knownVersion":0,"messageCount":5},
          {"start":30,"end":30,"text":"a","type":"replace","version":0,"connectionId":"peer-1","knownVersion":0,"messageCount":6,"mine":false},
          {"mine":true,"pendingCount":5,"start":167,"end":169,"text":"24","type":"replace","version":0,"connectionId":"peer-0","knownVersion":0,"messageCount":7},
          {"mine":true,"pendingCount":6,"start":168,"end":169,"text":"3","type":"replace","version":0,"connectionId":"peer-0","knownVersion":0,"messageCount":8},
          {"mine":true,"pendingCount":7,"start":168,"end":169,"text":"2","type":"replace","version":0,"connectionId":"peer-0","knownVersion":2,"messageCount":9},
          {"mine":true,"pendingCount":8,"start":168,"end":169,"text":"0","type":"replace","version":0,"connectionId":"peer-0","knownVersion":3,"messageCount":10},
          {"start":31,"end":31,"text":"s","type":"replace","version":3,"connectionId":"peer-1","knownVersion":3,"messageCount":12,"mine":false},
          {"mine":true,"pendingCount":9,"start":168,"end":170,"text":"11","type":"replace","version":6,"connectionId":"peer-0","knownVersion":6},
          {"mine":true,"pendingCount":10,"start":168,"end":170,"text":"9","type":"replace","version":7,"connectionId":"peer-0","knownVersion":7},
          {"mine":true,"pendingCount":11,"start":168,"end":169,"text":"8","type":"replace","version":7,"connectionId":"peer-0","knownVersion":8},
          {"mine":true,"pendingCount":12,"start":168,"end":169,"text":"-1","type":"replace","version":7,"connectionId":"peer-0","knownVersion":8},
          {"mine":true,"pendingCount":13,"start":169,"end":170,"text":"2","type":"replace","version":7,"connectionId":"peer-0","knownVersion":9},
          {"mine":true,"pendingCount":14,"start":169,"end":170,"text":"5","type":"replace","version":10,"connectionId":"peer-0","knownVersion":10},
          {"mine":true,"pendingCount":15,"start":169,"end":170,"text":"10","type":"replace","version":10,"connectionId":"peer-0","knownVersion":10},
        ]
        sorted = sortReplacements reps
        require ['lib/js-yaml'], (yaml)->
          console.log yaml.dump(reps, flowLevel: 1)
          console.log yaml.dump(sorted, flowLevel: 1)

      #Leisure.testSort2 = testSort2 = ->
      testSort2 = ->
        reps = [
          {start: 168, end: 169, text: "4", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, messageCount: 2}, 
          {start: 168, end: 169, text: "3", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, messageCount: 3}, 
          {start: 167, end: 169, text: "37", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, messageCount: 4}, 
          {start: 168, end: 169, text: "0", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, messageCount: 5}, 
          {start: 30, end: 30, text: "a", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 6}, 
          {start: 167, end: 169, text: "24", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, messageCount: 7}, 
          {start: 168, end: 169, text: "3", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, messageCount: 8}, 
          {start: 168, end: 169, text: "2", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 2, messageCount: 9}, 
          {start: 168, end: 169, text: "0", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 3, messageCount: 10}, 
          {start: 168, end: 170, text: "11", type: "replace", version: 6, connectionId: "peer-0", knownVersion: 6, messageCount: 13}, 
          {start: 168, end: 170, text: "9", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 7, messageCount: 14}, 
          {start: 168, end: 169, text: "8", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 8, messageCount: 15}, 
          {start: 168, end: 169, text: "-1", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 8, messageCount: 16}, 
          {start: 169, end: 170, text: "2", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 9, messageCount: 19}, 
          {start: 169, end: 170, text: "5", type: "replace", version: 10, connectionId: "peer-0", knownVersion: 10, messageCount: 20}, 
          {start: 169, end: 170, text: "10", type: "replace", version: 10, connectionId: "peer-0", knownVersion: 10}, 
          {start: 31, end: 31, text: "s", type: "replace", version: 3, connectionId: "peer-1", knownVersion: 3, messageCount: 12}, 
          {start: 32, end: 32, text: "f", type: "replace", version: 8, connectionId: "peer-1", knownVersion: 8, messageCount: 18}, 
          {start: 33, end: 33, text: "a", type: "replace", version: 9, connectionId: "peer-1", knownVersion: 9, messageCount: 22}
        ]

      #Leisure.testSort3 = testSort3 = ->
      testSort3 = ->
        [
          {start: 168, end: 169, text: "4", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, messageCount: 2, i: 0}, 
          {start: 168, end: 169, text: "3", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, i: 1, messageCount: 3}, 
          {start: 167, end: 169, text: "37", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, i: 2, messageCount: 4}, 
          {start: 168, end: 169, text: "0", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, i: 3, messageCount: 5}, 
          {start: 30, end: 30, text: "a", type: "replace", version: 0, connectionId: "peer-1", knownVersion: 0, messageCount: 6, i: 4}, 
          {start: 167, end: 169, text: "24", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, i: 5, messageCount: 7}, 
          {start: 168, end: 169, text: "3", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 0, i: 6, messageCount: 8}, 
          {start: 168, end: 169, text: "2", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 2, i: 7, messageCount: 9}, 
          {start: 168, end: 169, text: "0", type: "replace", version: 0, connectionId: "peer-0", knownVersion: 3, i: 8, messageCount: 10}, 

          {start: 168, end: 170, text: "11", type: "replace", version: 6, connectionId: "peer-0", knownVersion: 6, i: 10, messageCount: 13}, 
          {start: 168, end: 170, text: "9", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 7, i: 11, messageCount: 14}, 
          {start: 168, end: 169, text: "8", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 8, i: 12, messageCount: 15}, 
          {start: 168, end: 169, text: "-1", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 8, i: 13, messageCount: 16}, 

          {start: 169, end: 170, text: "2", type: "replace", version: 7, connectionId: "peer-0", knownVersion: 9, i: 15, messageCount: 19}, 
          {start: 169, end: 170, text: "5", type: "replace", version: 10, connectionId: "peer-0", knownVersion: 10, i: 16, messageCount: 20}, 

          {start: 169, end: 170, text: "10", type: "replace", version: 10, connectionId: "peer-0", knownVersion: 10, i: 18}, 

          {start: 31, end: 31, text: "s", type: "replace", version: 3, connectionId: "peer-1", knownVersion: 3, messageCount: 12, i: 9}, 

          {start: 32, end: 32, text: "f", type: "replace", version: 8, connectionId: "peer-1", knownVersion: 8, messageCount: 18, i: 14}, 

          {start: 33, end: 33, text: "a", type: "replace", version: 9, connectionId: "peer-1", knownVersion: 9, messageCount: 22, i: 17}
        ]

      window.replacementsString = replacementsString

      {
        ConcurrentReplacements
        SequentialReplacements
        runReplacements
        replacementsString
        sortReplacements
        sequentialReplacements
        concurrentReplacements
        tests
        testData2
        addOp
        runOps
      }
