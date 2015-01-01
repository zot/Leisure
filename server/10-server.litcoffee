Meteor-based collaboration -- server side

    docs = {}
    {
      isCodeBlock,
      createDocFromOrg,
      docDo,
      crnl,
    } = Leisure
    {
      safeLoad,
      dump,
    } = Leisure.yaml
    gitReadFile = Leisure.git.readFile
    gitSnapshot = Leisure.git.snapshot
    gitHasFile = Leisure.git.hasFile
    connections = new Meteor.Collection ' connections ', connection: null
    tempDocs = {}
    restrictedPattern = /^posts\//

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
          id: id, hasGit: false, temporary: true
        else if m = name.match /^(tmp|local\/[^\/]*)\/(.*)$/
          id = m[2]
          if tempDocs[id]
            connectedToTemp id, this.connection
            this.connection.onClose -> disconnectedFromTemp id, this.connection
            id: id, hasGit: false, temporary: true
          else error: "No temporary document #{m[2]}"
        else
          try
            if docs[name] then console.log "#{name} exists" else loadDoc name
            id: name, hasGit: Leisure.git.currentIndex?
          catch err
            console.log "EXCEPTION CHECKING #{name}: #{err.stack}"
            erorr: "Error retrieving #{name}"
      snapshot: (name)->
        if !tempDocs[name] && (doc = Leisure.docs[name])
          gitSnapshot doc
      revert: (name)-> loadDoc name, false, null, true
      edit: (name, contents)-> loadDoc name, true, contents
      incrementField: (docId, path, amount)->
        components = path.split /\./
        r = if components.length < 2 then error: "No fields in path"
        else if !(doc = docs[docId]) then error: "No document named #{docId}"
        else if isNaN(Number(amount)) then error: "Increment is not a number: #{amount}"
        else if !(dataId = doc.namedBlocks[components[0]]) then error: "No data named #{components[0]}"
        else
          orig = doc.findOne dataId
          if !orig then error: "Block does not exist: #{dataId}"
          else if !orig.yaml? then error: "Block is not yaml data: #{dataId}"
          else
            data = orig.yaml
            i = 1
            while i < components.length - 1 && data
              data = data[components[i]]
              i++
            if data && typeof data[components[i]] != 'number'
              i++
              data = null
            if !data
              console.log "Path not found: #{components[0...i].join '.'}\n#{dump orig}"
              error: "Path not found: #{components[0...i].join '.'}"
            else
              result = data[components[i]] += amount
              orig.text = orig.text.substring(0, orig.codePrelen) + dump(orig.yaml, orig.codeAttributes ? {}) + orig.text.substring orig.text.length - orig.codePostlen
              doc.update dataId, orig
              result
        r
      appendToField: (docId, path, item)->
        components = path.split /\./
        r = if components.length < 2 then error: "No fields in path"
        else if !(doc = docs[docId]) then error: "No document named #{docId}"
        else if !(dataId = doc.namedBlocks[components[0]]) then error: "No data named #{components[0]}"
        else
          orig = doc.findOne dataId
          if !orig then error: "Block does not exist: #{dataId}"
          else if !orig.yaml? then error: "Block is not yaml data: #{dataId}"
          else
            data = orig.yaml
            i = 1
            while i < components.length - 1 && data
              data = data[components[i]]
              i++
            if data && !(data[components[i]] instanceof Array)
              i++
              data = null
            if !data
              console.log "Path not found: #{components[0...i].join '.'}\n#{dump orig}"
              error: "Path not found: #{components[0...i].join '.'}"
            else
              data[components[i]].push item
              orig.text = orig.text.substring(0, orig.codePrelen) + dump(orig.yaml, orig.codeAttributes ? {}) + orig.text.substring orig.text.length - orig.codePostlen
              doc.update dataId, orig
              data[components[i]]
        r
      addBlockAfter: (docId, id, block)->
        if !(doc = docs[docId]) then error: "No document named #{docId}"
        else if !(before = doc.findOne id) then error: "No block: #{id}"
        else
          block._id = new Meteor.Collection.ObjectID().toJSONValue()
          after = doc.findOne before.next
          before.next = block._id
          block.prev = before._id
          doc.update before._id, before
          if after
            block.next = after?._id
            after?.prev = before._id
            doc.update after._id, after
          doc.insert block
          #console.log "INSERTING: #{dump block}"

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
      if !temp && (name.match restrictedPattern) then throw new Error "ENOENT, open '#{name}'"
      if reload && (temp || tempDocs[name]) then throw new Error "Attempt to reload temporary document, #{name}"
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
      try
        text = crnl text ? (if gitHasFile name then gitReadFile(name).toString() else GlobalAssets.getText name)
      catch err
        delete docs[id]
        if temp then delete tempDocs[id]
        throw err
      doc.leisure = name: id
      if temp then doc.leisure.temp = true
      doc.remove {}
      createDocFromText text, doc, false, (block)->
        block.origin = id
        block
      doc.namedBlocks = {}
      doc.find().observe
        added: (data)-> indexData doc, data
        removed: (data)-> removeDataIndex doc, data
        changed: (data, oldData)->
          if !(data.codeName? && doc.namedBlocks[data.codeName] == data._id)
            removeDataIndex doc, oldData
            indexData doc, data
      if !reload then Meteor.publish id, -> doc.find()
      id

    indexData = (doc, data)->
      if n = data.codeName then doc.namedBlocks[data.codeName] = data._id

    removeDataIndex = (doc, data)->
      if n = data.codeName then delete doc.namedBlocks[data.codeName]

    docJson = (collection)->
      nodes = []
      docDo collection, (node)-> nodes.push node
      nodes

    createDocFromText = (text, collection, reloading, filter)->
      createDocFromOrg Org.parseOrgMode(text), collection, reloading, filter
      console.log "CREATED DOC FROM #{collection.find().count()} nodes"

    Leisure.loadDoc = loadDoc
    Leisure.docs = docs

    Meteor.setTimeout (-> Leisure.loadDoc 'widget.lorg'), 1
