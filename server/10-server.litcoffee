Meteor-based collaboration -- server side

    docs = {}
    getCodeItems = Leisure.getCodeItems
    isCodeBlock = Leisure.isCodeBlock
    createDocFromOrg = Leisure.createDocFromOrg
    docDo = Leisure.docDo

    Meteor.methods
      hasDocument: (name)->
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

    docJson = (collection)->
      nodes = []
      docDo collection, (node)-> nodes.push node
      nodes

    createDocFromText = (text, collection)->
      id = createDocFromOrg Org.parseOrgMode(text), collection
      console.log "CREATED DOC FROM #{collection.find().count()} nodes"

    Leisure.loadDoc = loadDoc

    Meteor.setTimeout (-> Leisure.loadDoc 'image.lorg'), 1
