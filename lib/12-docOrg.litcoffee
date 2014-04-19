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

    createDocFromOrg = (org, collection)->
      result = {}
      [id] = orgDoc org, result
      for k, v of result
        if k != 'root' then collection.insert v
      id

    orgDoc = (org, result, parent)->
      id = new Meteor.Collection.ObjectID().toJSONValue()
      next = org.next
      if org instanceof Org.Headline
        children = childrenDocs org, result, id
        doc =
          text: org.text
          children: children
          _id: id
      else if isCodeBlock org then [doc, next] = codeBlockDoc org, id
      else doc = text: org.allText(), _id: id
      if parent then doc.parent = parent
      else
        doc.root = true
        result.root = doc
      result[id] = doc
      [id, next]

    childrenDocs = (org, result, parent)->
      children = []
      child = org.children[0]
      while child
        [childDoc, child] = orgDoc child, result, parent
        children.push childDoc
      children

    codeBlockDoc = (org, id)->
      text = ''
      {first, last} = getCodeItems org
      while first != last
        text += first.allText()
        first = first.next
      [{text: text, _id: id}, last]

    root.getCodeItems = getCodeItems
    root.isCodeBlock = isCodeBlock
    root.createDocFromOrg = createDocFromOrg
