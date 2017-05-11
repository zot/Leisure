Simple operational transformation engine

    'use strict'
    define ['fingertree', 'lodash', './testing', 'immutable'], (Fingertree, _, Testing, Immutable)->
      {
        assert
        assertEq
      } = Testing
      {
        Set
      } = Immutable

      #diag = (args...)-> console.log args...
      diag = (args...)->

Replacements captures successive replacements within a version

      class Replacements
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
        snapshot: -> new Replacements @replacements
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
        getRepls: ->
          repls = []
          @eachOperation (start, end, text)-> repls.push {start, end, text}
          repls

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

      Replacements.fromArray = (reps)->
        seq = new Replacements()
        if typeof reps[0] == 'number'
          eachReplacement reps, (start, end, text, labels)-> seq.replace {start, end, text, labels}
        else for repl in reps
          seq.replace repl
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

      replacements = (reps)->
        s = new Replacements()
        for repl in reps
          s.replace repl
        s

      Object.assign(Leisure, {
        Replacements: {
          Replacements
          replacements
        }
      }).Replacements
