    define ['./org', 'lib/js-yaml', 'lib/lazy'], (Org, Yaml, Lazy)->

      {
        Headline
        Source
        HTML
        Keyword
        Drawer
        Meat
        UnknownDeclaration
        Results
        parseOrgMode
        Fragment
      } = Org

      {
        safeLoad
        load
        dump
      } = Yaml

      {_: _L} = Lazy

      class ParsedCodeBlock
        constructor: (block)-> if typeof block == 'string' then @setBlockText block else @init block
        clone: -> new ParsedCodeBlock @block
        getOrg: -> blockOrg @block
        toString: -> "Parsed:\n  #{@block.text.replace(/\n/g, '\n  ')}"
        init: (@block)->
          org = blockOrg @block
          if org instanceof Fragment || org instanceof Headline then org = org.children[0]
          @items = getCodeItems org
        setBlockText: (str)->
          if (bl = orgDoc parseOrgMode str.replace /\r\n/g, '\n').length != 1 || bl[0].text != str
            throw new Error "Bad code block: '#{str}'"
          bl[0]._id = @block?._id
          @init bl[0]
        spliceItem: (itemName, str)->
          if str && _.last(str) != '\n' then str += '\n'
          item = @items[itemName]
          @setBlockText if item then @block.text.substring(0, item.offset) + str + @block.text.substring(item.offset + item.text.length)
          else @block.text + "#+#{itemName.toUpperCase()}:\n#{str}"
        setCodeInfo: (info)->
          {text} = @block
          {source} = @items
          infoStart = source.offset + source.infoPos
          @setBlockText text.substring(0, infoStart) + info + text.substring infoStart + source.info.length
        setCodeAttribute: (name, value)->
          info = @items.source.info ? ''
          @setCodeInfo if @block.codeAttributes?[name.toLowerCase()]?
            m = info.match new RegExp "^((|.*\\S)(\\s*))(:#{escapeRegexp name})((\\s+[^:]*)?(?=:|$))", 'i'
            prefix = m.index + m[1].length + m[4].length
            suffix = info.substring prefix + m[5].length
            if suffix then suffix = ' ' + suffix
            if !value? then info.substring(0, m.index + m[2].length) + suffix
            else info.substring(0, prefix) + ' ' + value + suffix
          else if !value? then info
          else info + " :#{name}" + (if value then ' ' + value else '')
        setResults: (str)-> @spliceItem 'results', str
        setSource: (str)-> @spliceItem 'source', str
        setError: (str)-> @spliceItem 'error', str
        addResultType: (str)->
          types = @getResultTypes()
          if !(str in types)
            results = @block.codeAttributes?.results
            @setCodeAttribute 'results', if results then "#{results} #{str}" else str
        removeResultType: (str)->
          res = @block.codeAttributes?.results
          types = @getResultTypes()
          if str.toLowerCase() in types
            values = res.toLowerCase().split /(\s+)/
            start = values.indexOf str.toLowerCase()
            end = start + 1
            if start > 0 then start--
            else if end < values.length then end++
            prefix = 0
            for i in [0...start]
              prefix += values[i].length
            len = 0
            for i in [start...end]
              len += values[i].length
              values[i] = false
            @setCodeAttribute 'results', if _.some values
              res.substring(0, prefix) + res.substring(prefix + len)
        setResultView: (viewStr)->
          if viewStr then viewStr = ' ' + viewStr
          res = @block.codeAttributes?.results
          newRes = if m = res.match /\s*\bview(\(.*\)|\b)/
            res.substring(0, m.index) + viewStr + res.substring(m.index + m[0].length)
          else if viewStr then res + viewStr
          else res
          @setCodeAttribute 'results', newRes
        setExports: (code, results)->
          @setCodeAttribute 'exports', if !code || !results then (code && 'code') || (results && 'results') || 'none'
        exportsCode: -> @getExports() in ['code', 'both']
        exportsResults: ->  @getExports() in ['results', 'both']
        getExports: -> @block.codeAttributes?.exports?.toLowerCase() || 'both'
        getResultTypes: -> @block.codeAttributes?.results?.toLowerCase().split(' ') ? []
        setDynamic: (state)->
          if @isDynamic() != state
            if state then @addResultType 'dynamic'
            else @removeResultType 'dynamic'
        isDynamic: -> 'dynamic' in @getResultTypes()
        setSourceContent: (newContent)->
          src = @items.source
          @setSource "#{src.text.substring 0, src.contentPos}#{newContent}#{src.text.substring src.contentPos + src.content.length}"
        hasExpected: -> @items.expected
        resultsAreExpected: ->
          @items.expected && @items.results && @items.expected.content() == @items.results.content()
        makeResultsExpected: ->
          if @items.results
            newExpected = ":expected:\n#{@items.results.content()}:end:\n"
            item = @items.expected
            @setBlockText if item then @block.text.substring(0, item.offset) + newExpected + @block.text.substring(item.offset + item.text.length)
            else
              source = @items.source
              @block.text.substring(0, source.offset + source.text.length) + newExpected + @block.text.substring(source.offset + source.text.length)
        clearExpected: ->
          if item = @items.expected
            @setBlockText @block.text.substring(0, item.offset) + @block.text.substring(item.offset + item.text.length)

      escapeRegexp = (str)-> str.replace /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'

      blockOrg = (block)->
        text = if typeof block == 'string' then block else block.text
        org = parseOrgMode text
        org = if org.children.length == 1 then org.children[0]
        else
          frag = new Fragment org.offset, org.children
          frag
        if typeof block == 'object'
          org.nodeId = block._id
          org.shared = block.type
        org.linkNodes()
        org

      getCodeItems = (org)->
        if !getSourceNodeType org then {}
        else
          result = {}
          while !isSourceEnd org
            if type = getSourceNodeType org
              if type == 'html'
                return if result.first then result
                else source: org, first: org, last: org
              if !result.first then result.first = org
              else if type == 'name' then return result
              if result[type]? then return result
              result.last = result[type] = org
              if type == 'name' && org.next.constructor == Meat && org.next.next instanceof Source then result.doc = org.next
              if type == 'results' then break
            else if org instanceof Drawer || org instanceof Keyword || org instanceof UnknownDeclaration then break
            org = org.next
          if result.source then result else {}

      isCodeBlock = (org)->
        if org instanceof Keyword && org.name.match /^name$/i
          {first} = getCodeItems org
          first
        else org instanceof Source

      getSourceNodeType = (org)->
        if org instanceof Source then 'source'
        else if org instanceof HTML then 'html'
        else if org instanceof Results then 'results'
        else if org instanceof Drawer && org.name.toLowerCase() == 'expected' then 'expected'
        else if org instanceof Keyword && org.name.match /^name$/i then 'name'
        else if org instanceof Keyword && org.name.match /^error$/i then 'error'
        else false

      isSourceEnd = (org)-> !org || org instanceof Headline

      createDocFromOrg = (org, collection, reloading, filter)->
        doc = orgDoc org
        if filter? then doc = (filter block for block in doc)
        replaceOrgDoc doc, collection, reloading
        collection

      docRoot = (collection)->
        (collection.leisure ? collection.leisure = {}).info ? (collection.leisure.info = collection.findOne info: true)

      replaceOrgDoc = (docArray, collection, reloading)->
        if reloading then collection.remove info: ('$exists': false)
        else collection.remove()
        linkDocs docArray
        #console.log "DOCS: #{JSON.stringify docArray, null, '  '}"
        if reloading
          info = collection.leisure.info
          info.head = if docArray.length > 0 then docArray[0]._id else null
          collection.update info._id, info
        else
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
          result = if org.level == 0 then (org.children.length && children) || _L([text: '\n', type: 'chunk', offset: org.offset])
          else
            _L([text: org.text, type: 'headline', level: org.level, offset: org.offset, properties: org.properties]).concat children
        else if org instanceof HTML then [result, next] = createHtmlBlockDoc org
        else if isCodeBlock org then [result, next] = createCodeBlockDoc org
        else result = _L(checkProps org, [text: org.allText(), type: 'chunk', offset: org.offset])
        if local then result.each (item)-> item.local = true
        [result, next]

      checkProps = (org, block)->
        if org.isProperties?()
          block.properties = org.properties()

      createChildrenDocs = (org, local)->
        children = _L()
        child = org.children[0]
        if child
          mergedText = ''
          properties = _L()
          offset = org.children[0].offset
          while child
            if isMergeable child
              mergedText += child.allText()
              if child.properties?() then properties = properties.merge child.properties?()
              child = child.next
            else
              [mergedText, properties, children] = checkMerged mergedText, properties, children, offset
              [childDoc, child] = createOrgDoc child, local
              children = children.concat [childDoc]
              offset = child?.offset
          [mergedText, properties, children] = checkMerged mergedText, properties, children, offset
        children

      isMergeable = (org)-> !(org instanceof Headline || org instanceof HTML || isCodeBlock org)

      checkMerged = (mergedText, properties, children, offset)->
        if mergedText != ''
          child = text: mergedText, type: 'chunk', offset: offset
          if !properties.isEmpty() then child.properties = properties.toObject()
          children = children.concat [child]
        ['', _L(), children]

      createCodeBlockDoc = (org)->
        text = ''
        {first, name, source, last, expected, results} = getCodeItems org
        if !first then [_L([text: org.allText(), type: 'chunk', offset: org.offset]), org.next]
        else
          firstOffset = first.offset
          while first != last.next
            text += first.allText()
            first = first.next
          obj = text: text, type: 'code', offset: firstOffset
          if source.attributes()
            attr = {}
            for nm, val of source.attributes()
              attr[nm.toLowerCase()] = val
          else attr = null
          obj.codeAttributes = attr
          obj.codePrelen = source.contentPos + source.offset - firstOffset
          obj.codePostlen = text.length - obj.codePrelen - source.content.length
          if expected
            obj.codeContent = source.content
            obj.codeTestActual = results.content()
            obj.codeTestExpected = expected.content()
            obj.codeTestResult = if !results then 'unknown'
            else if expected.content() == results.content() then 'pass'
            else 'fail'
          if name then obj.codeName = name.info.trim()
          if obj.codeAttributes?.local? then obj.local = true
          if l = source.lead() then obj.language = l.trim()
          if isYamlResult(obj) || isYaml source
            yamlSrc = (if isYaml(source) && !results then source.content
            else
              obj.computedYaml = true
              results?.content().replace /^: /gm, '')
            if yamlSrc then obj.yaml = parseYaml yamlSrc
          else if isText source then obj.yaml = source.content
          [_L([obj]), last.next]

      parseYaml = (str)->
        try
          #safeLoad str
          load str
        catch err
          undefined

      createHtmlBlockDoc = (org)->
          text = org.allText()
          obj = text: text, type: 'code', offset: org.offset
          obj.codePrelen = org.contentPos
          obj.codePostlen = text.length - obj.codePrelen - org.contentLength
          obj.language = 'html'
          if a = org.attributes() then obj.codeAttributes = a
          [_L([obj]), org.next]

      isYaml = (org)-> org instanceof Source && org.info.match /^ *yaml\b/i

      isYamlResult = (block)-> block.codeAttributes?.results?.match(/\byaml\b/) || block.codeAttributes?.post

      isText = (org)-> org instanceof Source && org.info.match /^ *(text|string)\b/i

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

      blockSource = (block)->
        block && block.text.substring block.codePrelen, block.text.length - block.codePostlen

      {
        getCodeItems
        isCodeBlock
        createDocFromOrg
        checkSingleNode
        orgDoc
        docRoot
        linkDocs
        isYaml
        isText
        crnl
        lineCodeBlockType
        blockSource
        ParsedCodeBlock
        blockOrg
        parseYaml
      }
