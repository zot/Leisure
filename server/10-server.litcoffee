Meteor-based collaboration -- server side

    docs = {}

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

    isCodeBlock = (org)->
      if org instanceof Org.Keyword && org.name.match /^name$/i
        while org instanceof Org.Meat
          if org instanceof Org.Source then return true
          org = org.next
        false
      else org instanceof Org.Source

    createDocFromCodeBlock = (org, collection)->
      text = ''
      cur = org
      last = org.next
      while !isSourceEnd(cur)
        if isSourceNode cur then last = cur.next
        cur = cur.next
      cur = org
      while cur != last
        text += cur.allText()
        cur = cur.next
      [{text: text}, last]

    isSourceNode = (org)-> org instanceof Org.Results || (org instanceof Org.Drawer && node.name.toLowerCase() == 'expected') || (org instanceof Org.Keyword && org.name.match /^name$/i)

    isSourceEnd = (org)-> !org || org instanceof Org.Headline

    Leisure.loadDoc = loadDoc

    console.log "SERVER"

    Meteor.setTimeout (-> Leisure.loadDoc 'largerTest.lorg'), 1
