Meteor-based collaboration -- server side

    docs = {}
    {
      isCodeBlock,
      createDocFromOrg,
      docDo,
      crnl,
    } = Leisure
    gitReadFile = Leisure.git.readFile
    gitSnapshot = Leisure.git.snapshot
    gitHasFile = Leisure.git.hasFile
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
        console.log "CONNECTION: #{this.connection.clientAddress}: #{name}"
        this.connection.onClose -> console.log "CLOSED"
        if m = name.match /^demo\/(.*)$/
          id = loadDoc m[1], true
          connectedToTemp id
          this.connection.onClose -> disconnectedFromTemp id
          id: id, hasGit: false
        else if m = name.match /^(tmp|local\/[^\/]*)\/(.*)$/
          id = m[2]
          if tempDocs[id]
            connectedToTemp id, this.connection
            this.connection.onClose -> disconnectedFromTemp id, this.connection
            id: id, hasGit: false
          else error: "No temporary document #{m[2]}"
        else
          try
            if docs[name] then console.log "#{name} exists" else loadDoc name
            id: name, hasGit: Leisure.git.currentIndex?
          catch err
            console.log "EXCEPTION CHECKING #{name}: #{err.stack}"
            erorr: "Error retrieving #{name}"
      snapshot: (name)-> gitSnapshot name
      revert: (name)-> loadDoc name, false, null, true
      edit: (name, contents)-> loadDoc name, true, contents

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

    loadDoc = (name, temp, text, reload)->
      if reload && (temp || tempDocs[name]) then throw new Error "Attempt to reload temporary document, #{name}"
      try
        text = crnl text ? (if gitHasFile name then gitReadFile(name).toString() else GlobalAssets.getText name)
      catch err
        delete docs[id]
        if temp then delete tempDocs[id]
        throw err
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
        doc = if reload then docs[id] else docs[id] = new Meteor.Collection id
        if !doc then throw new Error "Attempt to reload unloaded document, #{name}"
      if !reload
        doc.leisure = {}
        doc.remove {}
      createDocFromText text, doc, reload
      if !reload then Meteor.publish id, -> doc.find()
      id

    docJson = (collection)->
      nodes = []
      docDo collection, (node)-> nodes.push node
      nodes

    createDocFromText = (text, collection, reloading)->
      id = createDocFromOrg Org.parseOrgMode(text), collection, reloading
      console.log "CREATED DOC FROM #{collection.find().count()} nodes"

    Leisure.loadDoc = loadDoc
    Leisure.docs = docs

    Meteor.setTimeout (-> Leisure.loadDoc 'widget.lorg'), 1
