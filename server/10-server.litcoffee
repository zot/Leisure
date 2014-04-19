Meteor-based collaboration -- server side

    docs = {}
    getCodeItems = Leisure.getCodeItems
    isCodeBlock = Leisure.isCodeBlock
    createDocFromOrg = Leisure.createDocFromOrg

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
      id = createDocFromOrg Org.parseOrgMode(text), collection
      console.log "DOC JSON: #{JSON.stringify docJson(collection, id), null, '  '}"

    Leisure.loadDoc = loadDoc

    console.log "SERVER"

    Meteor.setTimeout (-> Leisure.loadDoc 'largerTest.lorg'), 1
