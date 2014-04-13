Meteor-based collaboration -- server side

    docs = {}

    Meteor.methods
      hasDocument: (name)->
        console.log "CHECKING DOCUMENT: #{name}"
        try
          if docs[name] then console.log "#{name} exists"; true
          else
            docs[name] = new Meteor.Collection name
            if docs[name].find().count() == 0
              doc = GlobalAssets.getText name
              createDocFromText doc, docs[name]
            Meteor.publish name, -> docs[name].find()
            true
        catch err
          console.log "EXCEPTION CHECKING #{name}: #{err.stack}"
          false

Document model that ties orgmode parse trees to HTML DOM

    createDocFromText = (text, collection)->
      console.log "CREATE DCC FROM #{collection.find().count()} nodes"
      createDocFromOrg Org.parseOrgMode(text), collection, true

    createDocFromOrg = (org, collection, root)->
      doc = (if org instanceof Org.Headline
        text: org.text
        children: createDocFromOrg child, collection for child in org.children
      else text: org.allText())
      if root then doc.root = true
      collection.insert doc
