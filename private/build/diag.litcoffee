    bindCount = 0

    bindDisplayStructure = (data, div, stop)->
      if !$(div)[0].leisureStructureBinding
        console.log "binding display structure to ", $(div)[0]
        data
          .on 'change', (changes)-> displayStructure data, div
          .on 'load', -> displayStructure data, div
        $(div)[0].leisureStructureBinding = true

    displayStructure = (data, div)->
      console.log "displaying structure"
      parentStack = []
      info = ""
      level = 0
      cur = data.getBlock data.first
      prevParent = null
      checks = nextSibling: {}, previousSibling: {}, prev: {}
      check = cur
      prev = null
      while check
        checks.nextSibling[check.previousSibling] = check._id
        checks.previousSibling[check.nextSibling] = check._id
        checks.prev[check.next] = check._id
        prev = check
        check = data.getBlock check.next
      while cur
        bad = []
        if cur.nextSibling != checks.nextSibling[cur._id] then bad.push 'nextSibling'
        if cur.previousSibling != checks.previousSibling[cur._id] then bad.push 'previousSibling'
        if cur.prev != checks.prev[cur._id] then bad.push 'prev'
        if !cur.previousSibling
          p = cur
          while p = data.parent p
            level++
        info += "#{('   ' for i in [0...level]).join ''}#{cur._id}#{checkStructure cur, bad}: #{JSON.stringify cur.text}\n"
        if !cur.nextSibling then level = 0
        cur = data.getBlock cur.next
      $(div).html info

    checkStructure = (block, bad)->
      if bad.length
        ' <span class="err">[' + ("#{err}: #{block[err]}" for err in bad).join(', ') + ']</span>'
      else ''

    Leisure.bindDisplayStructure = bindDisplayStructure
