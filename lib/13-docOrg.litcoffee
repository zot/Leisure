    root = (window ? global).Leisure

    {
      Headline,
      Source,
      HTML,
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
      if !getSourceNodeType org then {}
      else
        result = {}
        while !isSourceEnd org
          if type = getSourceNodeType org
            if !result.first then result.first = org
            else if type == 'name' then return result
            if result[type]? then return result
            result.last = result[type] = org
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
      else if org instanceof Drawer && org.name.toLowerCase() == 'expected' then 'expected'
      else if org instanceof Keyword && org.name.match /^name$/i then 'name'
      else false

    isSourceEnd = (org)-> !org || org instanceof Headline

    createDocFromOrg = (org, collection)->
      doc = orgDoc org
      replaceOrgDoc doc, collection
      doc._id

    docRoot = (collection)->
      (collection.leisure ? collection.leisure = {}).info ? (collection.leisure.info = collection.findOne info: true)

    replaceOrgDoc = (docArray, collection)->
      collection.remove()
      linkDocs docArray
      #console.log "DOCS: #{JSON.stringify docArray, null, '  '}"
      info = collection.leisure.info =
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

    orgDoc = (org)-> createOrgDoc(org, false)[0].toArray()

    lineCodeBlockType = (line)->
      type = line && root.matchLine line
      if type in ['srcStart', 'srcEnd', 'htmlStart', 'htmlEnd'] then 'code'
      else if line.match /^#+name:/i then 'code'
      else if type == 'headline-1' then 'headline'
      else 'chunk'

    createOrgDoc = (org, local)->
      next = org.next
      if org instanceof Headline
        local = local || (org.level == 1 && org.properties.local)
        children = createChildrenDocs org, local
        result = if org.level == 0 then children
        else _([text: org.text, type: 'headline', level: org.level]).concat children
      else if org instanceof HTML then [result, next] = createHtmlBlockDoc org
      else if isCodeBlock org then [result, next] = createCodeBlockDoc org
      else result = _([text: org.allText(), type: 'chunk'])
      if local then result.each (item)-> item.local = true
      [result, next]

    createChildrenDocs = (org, local)->
      children = _()
      child = org.children[0]
      mergedText = ''
      while child
        if isMergeable child
          mergedText += child.allText()
          child = child.next
        else
          [mergedText, children] = checkMerged mergedText, children
          [childDoc, child] = createOrgDoc child, local
          children = children.concat [childDoc]
      [mergedText, children] = checkMerged mergedText, children
      children

    isMergeable = (org)-> !(org instanceof Headline || org instanceof HTML || isCodeBlock org)

    checkMerged = (mergedText, children)->
      if mergedText != '' then children = children.concat [text: mergedText, type: 'chunk']
      ['', children]

    createCodeBlockDoc = (org)->
      text = ''
      {first, name, source, last, expected, result} = getCodeItems org
      firstOffset = first.offset
      if !first then [_([text: org.allText(), type: 'chunk']), org.next]
      else
        while first != last.next
          text += first.allText()
          first = first.next
        obj = text: text, type: 'code'
        obj.codeAttributes = source.attributes()
        obj.codePrelen = source.contentPos + source.offset - firstOffset
        obj.codePostlen = text.length - obj.codePrelen - source.content.length
        if expected
          obj.testResult = if !result then 'unknown'
          else if expected.text == result.text then 'pass'
          else 'fail'
        if name then obj.codeName = name.info.trim()
        if obj.codeAttributes?.local? then obj.local = true
        if l = source.lead() then obj.language = l.trim()
        if isYaml source then obj.yaml = safeLoad source.content
        [_([obj]), last.next]

    createHtmlBlockDoc = (org)->
        text = org.allText()
        obj = text: text, type: 'code'
        obj.codePrelen = org.contentPos
        obj.codePostlen = text.length - obj.codePrelen - org.contentLength
        obj.language = 'html'
        if a = org.attributes() then obj.codeAttributes = a
        [_([obj]), org.next]

    isYaml = (org)-> org instanceof Source && org.info.match /^ *yaml\b/

    checkSingleNode = (text)->
      docs = {}
      org = parseOrgMode text
      [docJson] = if org.children.length > 1 then orgDoc org
      else orgDoc org.children[0]
      #if docJson.children? then console.log "NEW NODE\n#{JSON.stringify docJson}"
      docJson

    crnl = (data)->
      if typeof data == 'string' then data.replace /\r\n/g, '\n'
      else if data.text
        data.text = crnl data.text
        data
      else data

    root.getCodeItems = getCodeItems
    root.isCodeBlock = isCodeBlock
    root.createDocFromOrg = createDocFromOrg
    root.checkSingleNode = checkSingleNode
    root.orgDoc = orgDoc
    root.docRoot = docRoot
    root.linkDocs = linkDocs
    root.isYaml = isYaml
    root.crnl = crnl
    root.lineCodeBlockType = lineCodeBlockType
