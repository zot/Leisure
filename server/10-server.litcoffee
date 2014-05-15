Meteor-based collaboration -- server side

    docs = {}
    {
      isCodeBlock,
      createDocFromOrg,
      docDo,
      crnl,
    } = Leisure
    connections = new Meteor.Collection ' connections ', connection: null

    createAccount = (name, passwd)->
      if !(Meteor.users.find username: name)
        Accounts.createUser
          username: 'bubba'
          password: 'bubba'

    createAccount 'bubba', 'bubba'

    Meteor.methods
      hasDocument: (name)->
        console.log "CONNECTION: #{this.connection}"
        this.connection.onClose -> console.log "CLOSED"
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
      doc = docs[name] = new Meteor.Collection name
      doc.leisure = {}
      doc.remove {}
      if info = doc.findOne(info: true)
        doc.leisure.info = info
      else
        text = crnl GlobalAssets.getText name
        createDocFromText text, doc
      Meteor.publish name, -> doc.find()

    docJson = (collection)->
      nodes = []
      docDo collection, (node)-> nodes.push node
      nodes

    createDocFromText = (text, collection)->
      id = createDocFromOrg Org.parseOrgMode(text), collection
      console.log "CREATED DOC FROM #{collection.find().count()} nodes"

    Leisure.loadDoc = loadDoc

    Meteor.setTimeout (-> Leisure.loadDoc 'widget.lorg'), 1
