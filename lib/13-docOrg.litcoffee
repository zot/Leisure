    root = (window ? global).Leisure

    {
      Headline,
      Source,
      Keyword,
      Drawer,
      Meat,
      Results,
      parseOrgMode,
    } = (Org ? window?.Org ? global?.Org)

    {
      safeLoad,
      dump,
    } = root.yaml

    _ = (Lazy ? window?.Lazy ? global?.Lazy)

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

    createDocFromOrg = (org, collection)->
      doc = orgDoc org
      replaceOrgDoc doc, collection
      doc._id

    docDo = (collection, func)->
      next = collection.findOne docRoot(collection).head
      while next
        node = collection.findOne next
        func node
        next = node.next

    docRoot = (collection)-> collection.orgInfo ? (collection.orgInfo = collection.findOne info: true)

    replaceOrgDoc = (docArray, collection)->
      collection.remove()
      linkDocs docArray
      console.log "DOCS: #{JSON.stringify docArray, null, '  '}"
      collection.orgInfo = info =
        info: true
        head: if docArray.length > 0 then docArray[0]._id else null
        _id: new Meteor.Collection.ObjectID().toJSONValue()
      collection.insert info
      for doc in docArray
        collection.insert doc

    linkDocs = (docs)->
      prev = null
      for doc in docs
        doc._id = new Meteor.Collection.ObjectID().toJSONValue()
        if prev
          prev.next = doc._id
          doc.prev = prev._id
        prev = doc

    orgDoc = (org)-> createOrgDoc(org)[0].toArray()

    createOrgDoc = (org)->
      next = org.next
      if org instanceof Headline
        children = createChildrenDocs org
        result = if org.level == 0 then children
        else _([text: org.text, type: 'headline', level: org.level]).concat children
      else if isCodeBlock org then [result, next] = createCodeBlockDoc org
      else result = _([text: org.allText(), type: 'chunk'])
      [result, next]

    createChildrenDocs = (org)->
      children = _()
      child = org.children[0]
      mergedText = ''
      while child
        if isMergeable child
          mergedText += child.allText()
          child = child.next
        else
          [mergedText, children] = checkMerged mergedText, children
          [childDoc, child] = createOrgDoc child
          children = children.concat [childDoc]
      [mergedText, children] = checkMerged mergedText, children
      children

    isMergeable = (org)-> !(org instanceof Headline || isCodeBlock org)

    checkMerged = (mergedText, children)->
      if mergedText != '' then children = children.concat [text: mergedText, type: 'chunk']
      ['', children]

    createCodeBlockDoc = (org)->
      text = ''
      {first, source, last} = getCodeItems org
      firstOffset = first.offset
      if !first then [_([text: org.allText(), type: 'chunk']), org.next]
      else
        while first != last
          text += first.allText()
          first = first.next
        obj = text: text, type: 'code'
        if isYaml source
          obj.yaml = safeLoad source.content
          obj.yamlPrelen = source.contentPos - firstOffset
          obj.yamlPostlen = text.length - obj.yamlPrelen - source.content.length
        [_([obj]), last]

    isYaml = (org)-> org instanceof Source && org.info.match /^ *yaml\b/

    checkSingleNode = (text)->
      docs = {}
      org = parseOrgMode text
      [docJson] = if org.children.length > 1 then orgDoc org
      else orgDoc org.children[0]
      if docJson.children? then console.log "NEW NODE\n#{JSON.stringify docJson}"
      docJson

    root.getCodeItems = getCodeItems
    root.isCodeBlock = isCodeBlock
    root.createDocFromOrg = createDocFromOrg
    root.checkSingleNode = checkSingleNode
    root.orgDoc = orgDoc
    root.docDo = docDo
    root.docRoot = docRoot
    root.linkDocs = linkDocs
    root.isYaml = isYaml
