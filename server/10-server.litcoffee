Meteor-based collaboration -- server side

    docs = {}
    getCodeItems = Leisure.getCodeItems
    isCodeBlock = Leisure.isCodeBlock

    Meteor.methods
      hasDocument: (name)->
        console.log "CHECKING DOCUMENT: #{name}"
        try
          if docs[name] then console.log "#{name} exists"; true
          else
            loadDoc name
            true
        catch err
          console.log "EXCEPTION CHECKING #{name}: #{err.stack}"
          false

Document model that ties orgmode parse trees to HTML DOM

    loadDoc = (name)->
      docs[name] = new Meteor.Collection name
      docs[name].remove {}
      doc = GlobalAssets.getText name
      createDocFromText doc, docs[name]
      Meteor.publish name, -> docs[name].find()

    docJson = (collection, id)->
      d = collection.findOne id
      if d.children then d.children = (docJson collection, child for child in d.children)
      d

    createDocFromText = (text, collection)->
      console.log "CREATE DCC FROM #{collection.find().count()} nodes"
      [id] = createDocFromOrg Org.parseOrgMode(text), collection, true
      console.log "DOC JSON: #{JSON.stringify docJson(collection, id), null, '  '}"

    createDocFromOrg = (org, collection, root)->
      next = org.next
      if org instanceof Org.Headline
        children = createChildrenDocs org, collection
        doc =
          text: org.text
          children: children
      else if isCodeBlock org then [doc, next] = createDocFromCodeBlock org, collection
      else doc = text: org.allText()
      if root then doc.root = true
      [collection.insert(doc), next]

    createChildrenDocs = (org, collection)->
      children = []
      child = org.children[0]
      next = child
      while child
        [childDoc, child] = createDocFromOrg child, collection
        children.push childDoc
      children

    createDocFromCodeBlock = (org, collection)->
      text = ''
      {first, last} = getCodeItems org
      while first != last
        text += first.allText()
        first = first.next
      [{text: text}, last]

    Leisure.loadDoc = loadDoc

    console.log "SERVER"

    Meteor.setTimeout (-> Leisure.loadDoc 'largerTest.lorg'), 1
