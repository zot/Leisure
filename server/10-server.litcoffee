Meteor-based collaboration -- server side

    docs = {}
    {
      isCodeBlock,
      createDocFromOrg,
      docDo,
      crnl,
    } = Leisure
    connections = new Meteor.Collection ' connections ', connection: null
    tempDocs = {}

    createAccount = (name, passwd)->
      if !(Meteor.users.find username: name)
        Accounts.createUser
          username: 'bubba'
          password: 'bubba'

    createAccount 'bubba', 'bubba'

    Meteor.methods
      hasDocument: (name)->
        console.log "CONNECTION: #{this.connection}, #{name}"
        this.connection.onClose -> console.log "CLOSED"
        if m = name.match /^demo\/(.*)$/
          id = loadDoc m[1], true
          connectedToTemp id
          this.connection.onClose -> disconnectedFromTemp id
          id
        else if m = name.match /^tmp\/(.*)$/
          id = m[1]
          if tempDocs[id]
            connectedToTemp id, this.connection
            this.connection.onClose -> disconnectedFromTemp id, this.connection
            id
          else error: "No temporary document #{m[1]}"
        else
          try
            if docs[name] then console.log "#{name} exists" else loadDoc name
            name
          catch err
            console.log "EXCEPTION CHECKING #{name}: #{err.stack}"
            erorr: "Error retrieving #{name}"

    connectedToTemp = (id, connection)->
      if cur = tempDocs[id] then cur.count++
      else console.log "Attempt to connect to nonexistent document: #{id}"

    disconnectedFromTemp = (id, connection)->
      if tempDocs[id]
        if --tempDocs[id].count == 0
          console.log "DESTROYING TEMP DOCUMENT #{tempDocs[id].name} #{id}"
          docs[id].remove {}
          delete tempDocs[id]
          delete docs[id]

Document model that ties orgmode parse trees to HTML DOM

    loadDoc = (name, temp)->
      if temp
        id = new Meteor.Collection.ObjectID().toJSONValue()
        # this doesn't seem to accept changes from the clients
        #doc = docs[id] = new Meteor.Collection id, connection: null
        #just making a heavy one, for now
        doc = docs[id] = new Meteor.Collection id
        tempDocs[id] = count: 0, name: name
        console.log "CREATED TEMP DOCUMENT #{tempDocs[id].name} #{id}"
      else
        id = name
        doc = docs[id] = new Meteor.Collection id
      doc.leisure = {}
      doc.remove {}
      if info = doc.findOne(info: true)
        doc.leisure.info = info
      else
        text = crnl GlobalAssets.getText name
        createDocFromText text, doc
      Meteor.publish id, -> doc.find()
      id

    docJson = (collection)->
      nodes = []
      docDo collection, (node)-> nodes.push node
      nodes

    createDocFromText = (text, collection)->
      id = createDocFromOrg Org.parseOrgMode(text), collection
      console.log "CREATED DOC FROM #{collection.find().count()} nodes"

    Leisure.loadDoc = loadDoc

    Meteor.setTimeout (-> Leisure.loadDoc 'widget.lorg'), 1
