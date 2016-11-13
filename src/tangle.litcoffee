Tangle support

Test with

Leisure.tangle('#+BEGIN_SRC leisure :tangle yes\n3 + 4\n#+END_SRC')

    define ['./base', './org', './docOrg', './gen', './eval', 'lodash', 'handlebars', './advice', 'lib/js-yaml', 'bluebird', 'immutable', 'lib/fingertree', 'lib/sha1'], (Base, Org, DocOrg, Gen, Eval, _, Handlebars, Advice, Yaml, Bluebird, Immutable, FingerTree, SHA1)->
      {
        parseOrgMode
      } = Org
      {
        orgDoc
        blockSource
        parseYaml
      } = DocOrg
      {
        languageEnvMaker
        jsCodeFor
        nextGeneratedFileName
        getLeisurePromise
      } = Eval
      {
        Promise
      } = Bluebird
      {
        SourceNode
        SourceMapConsumer
        SourceMapGenerator
      } = Gen
      {
        defaultEnv
      } = Base

      parseBlocks = (text)->
        if text == '' then []
        else orgDoc parseOrgMode text.replace /\r\n/g, '\n'

      codeBlocksFor = (docText)-> _.filter(parseBlocks(docText), (el)-> el.type == 'code' && el.language)

Extract code blocks and generate code that sends the compiled block code to
this, which should be a block processor object (registering data and templates
by name, etc.)

      extractCode = (docText)->
        extractedCode = []
        curLang = ''
        codeString = ''
        pushCode = (lang = curLang, code = codeString)->
          if lang
            extractedCode.push language: lang, code: code
            curLang = codeString = ''
        for block in codeBlocksFor docText
          try
            if block.codeAttributes?.tangle?.toLowerCase() == 'yes'
              if block.language != curLang
                if curLang
                  env = languageEnvMaker(block.language)?(Object.create defaultEnv)
                  codeString = env.generateCode codeString
                pushCode()
                curLang = block.language
              codeString += blockSource block
            else if code = tangleBlock block
              pushCode()
              pushCode block.language, code
          catch err
            console.log "ERROR IN CODE: #{err}\n#{block.text}"
            throw err
        if codeString then pushCode()
        extractedCode

      shouldTangle = (block)->
        if block?.language && block.codeAttributes
          if block.codeAttributes.tangle?.toLowerCase() == 'yes' then 'tangle'
          else tangleType block

      tangleBlock = (block)->
        if (attr = block.codeAttributes) || block.language.toLowerCase() == 'yaml'
          [type, code] = codeForBlock block
          if code
            gen = (code)->
              if code.code
                con = SourceMapConsumer.fromSourceMap code.map
                code = SourceNode.fromStringWithSourceMap code.code, con
                fileName = con.file || con.sources[0]
              else fileName = nextGeneratedFileName()
              block.hash = SHA1.hash block.text
              blockStr = JSON.stringify block
              nodes = switch type
                when 'yaml' then ['this.tangleAddData(', blockStr, ', ', JSON.stringify(parseYaml code.replace /(^|\n): /gm, '$1'), ');\n']
                when 'view' then ['this.tangleAddView(', blockStr, ', ', code, ');\n']
                when 'observer' then ['this.tangleAddObserver(', blockStr, ', ', code, ');\n']
                when 'controller' then ['this.tangleAddController(', blockStr, ', ', code, ');\n']
                when 'def' then ['this.tangleAddDef(', blockStr, ', ', code, ');\n']
                else null
              if nodes
                console.log "FILE NAME: #{fileName}"
                new SourceNode 1, 0, fileName, nodes
            if code instanceof Promise then code.then gen else gen code

      tangleType = (block)->
        #if (block.language.toLowerCase() == 'yaml' && block.codeName && 'yaml')
        if false
        else if attr = block.codeAttributes
          (attr.results?.toLowerCase() == 'def' && 'def') ||
            #(attr.defview && 'view') ||
            (attr.control && 'controller') ||
            (attr.observe && 'observer')

      codeForBlock = (block)->
        attr = block.codeAttributes
        type = tangleType block
        code = if !(type in ['view', 'yaml', 'observer', 'controller', 'def']) then null
        else if type == 'view' then viewSource block
        else if type == 'yaml' then blockSource block
        else
          env = languageEnvMaker(block.language)?(Object.create defaultEnv)
          if type == 'def' then env.generateCode blockSource(block)
          else env.genBlock block
        [type, code]

      viewSource = (block)->
        source = blockSource block
        JSON.stringify source.substring 0, source.length - 1

      tangle = (docText)->
        getLeisurePromise().then ->
          Promise.join.apply(null, (for {language, code} in extractCode docText
            if language == 'yaml' then code
            else
              if !(env = languageEnvMaker(language)?(Object.create defaultEnv))
                throw new Error "Language '#{language}' not supported"
              code))
            .then (results)->
              n = new SourceNode()
              if results.length
                n.add ((if !code then results[i] else SourceNode.fromStringWithSourceMap code, SourceMapConsumer.fromSourceMap map) for {code, map}, i in results)
              jsCodeFor n.toStringWithSourceMap()
            .catch (err)-> console.log "PROMISE CAUGHT ERROR IN CODE: #{err}\n#{code}"

      Object.assign Leisure, {
        tangle
        codeBlocksFor
        extractCode
      }

      {
        tangle
        codeBlocksFor
        extractCode
        jsCodeFor
        shouldTangle
      }
