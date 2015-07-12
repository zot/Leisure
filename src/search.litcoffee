    define [], ->
      searchToken = /[^'"]+|'[^']*'|"[^"]*"/g

      normalize = (str)-> "  #{str.toLowerCase().replace(/([^a-z0-9]|\n)+/g, '  ').trim()}  "

      trigrams = (str, tri = {})->
        str = normalize str
        if str.length >= 3
          for i in [0...str.length - 2]
            tri[str.substring i, i + 3] = true
        tri

      tokenize = (query)-> normalize token for token in query.match searchToken

      indexQuery = (query)->
        tri = {}
        tokens = {}
        for token in tokenize query
          if !tokens[token]
            tokens[token] = true
            trigrams token, tri
        trigrams: tri
        tokens: tokens

      addSearchDataFilter = (data)->
        data.addFilter
          clear: -> data.index = {}
          replaceBlock: (oldBlock, newBlock)->
            if oldBlock
              for trigram in oldBlock.trigrams
                delete data.index[trigram][oldBlock._id]
                if _.isEmpty data.index[trigram] then delete data.index[trigram]
            if newBlock
              for trigram in newBlock.trigrams = trigrams newBlock.text
                if !data.index[trigram] then data.index[trigram] = {}
                data.index[trigram][newBlock._id] = true

      {
        normalize
        indexQuery
        tokenize
        addSearchDataFilter
        trigrams
      }
