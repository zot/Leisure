    root = (window ? global).Leisure

    {
      Headline,
      Source,
      Keyword,
      Drawer,
      Meat,
      Results,
    } = Org

    getCodeItems = (org)->
      result = {}
      while !isSourceEnd org
        if type = getSourceNodeType org
          if !result.first then result.first = org
          result.last = org.next
          result[type] = org
          if type == 'results' then break
        else if org instanceof Drawer || org instanceof Keyword then break
        org = org.next
      result

    isCodeBlock = (org)->
      if org instanceof Keyword && org.name.match /^name$/i
        while org instanceof Meat
          if org instanceof Source then return true
          org = org.next
        false
      else org instanceof Source

    getSourceNodeType = (org)->
      if org instanceof Source then 'source'
      else if org instanceof Results then 'results'
      else if org instanceof Drawer && node.name.toLowerCase() == 'expected' then 'expected'
      else if org instanceof Keyword && org.name.match /^name$/i then 'name'
      else false

    isSourceEnd = (org)-> !org || org instanceof Headline

    root.getCodeItems = getCodeItems
    root.isCodeBlock = isCodeBlock
