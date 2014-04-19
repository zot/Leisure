    root = (window ? global).Leisure

    {
      Headline,
      Source,
      Keyword,
      Drawer,
      Meat,
      Results,
      parseOrgMode,
    } = Org

    _ = Lazy

    console.log Lazy

    getCodeItems = (org)->
      result = {}
      while !isSourceEnd org
        if type = getSourceNodeType org
          if !result.first then result.first = org
          result.last = org.next
          if result[type]? then return {}
          result[type] = org
          if type == 'results' then break
        else if org instanceof Drawer || org instanceof Keyword then break
        org = org.next
      if result.source then result else {}

    isCodeBlock = (org)->
      if org instanceof Keyword && org.name.match /^name$/i
        {first} = getCodeItems org
        first
      else org instanceof Source

    getSourceNodeType = (org)->
      if org instanceof Source then 'source'
      else if org instanceof Results then 'results'
      else if org instanceof Drawer && node.name.toLowerCase() == 'expected' then 'expected'
      else if org instanceof Keyword && org.name.match /^name$/i then 'name'
      else false

    isSourceEnd = (org)-> !org || org instanceof Headline

    createDocFromOrg = (org, collection, parent)->
      [doc] = orgDoc org
      console.log "INSERTING DOC: #{JSON.stringify doc, null, '  '}"
      insertOrgDoc doc, collection
      doc._id

    insertOrgDoc = (doc, collection, parent)->
      if parent? then doc.parent = parent else doc.root = true
      doc._id = new Meteor.Collection.ObjectID().toJSONValue()
      if doc.children?
        newChildren = []
        for child in doc.children
          insertOrgDoc child, collection, doc._id
          newChildren.push child._id
        doc.children = newChildren
      collection.insert doc

    orgDoc = (org)->
      next = org.next
      if org instanceof Org.Headline
        doc = text: org.text
        doc.children = childrenDocs org
        if doc.text == '' && doc.children.length == 1 then doc = doc.children[0]
      else if isCodeBlock org then [doc, next] = codeBlockDoc org
      else doc = text: org.allText()
      [doc, next]

    childrenDocs = (org)->
      children = []
      child = org.children[0]
      mergedText = ''
      while child
        if isMergeable child
          mergedText += child.allText()
          child = child.next
        else
          mergedText = checkMerged mergedText, children
          [childDoc, child] = orgDoc child
          children.push childDoc
      mergedText = checkMerged mergedText, children
      children

    isMergeable = (org)-> !(org instanceof Headline || isCodeBlock org)

    checkMerged = (mergedText, children)->
      if mergedText != '' then children.push text: mergedText
      ''

    codeBlockDoc = (org)->
      text = ''
      {first, last} = getCodeItems org
      if !first then [text: org.allText(), org.next]
      else
        while first != last
          text += first.allText()
          first = first.next
        [text: text, last]

    checkSingleNode = (text)->
      docs = {}
      org = parseOrgMode text
      [docJson] = if org.children.length > 1 then orgDoc org
      else orgDoc org.children[0]
      if docJson.children? then console.log "NEW NODE\n#{JSON.stringify docJson}"

    root.getCodeItems = getCodeItems
    root.isCodeBlock = isCodeBlock
    root.createDocFromOrg = createDocFromOrg
    root.checkSingleNode = checkSingleNode
