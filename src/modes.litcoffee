    define ['cs!./base', 'cs!./org', 'cs!./docOrg.litcoffee', 'cs!./ast', 'cs!./eval.litcoffee', 'cs!./editor.litcoffee', 'lib/lodash.min', 'jquery', 'cs!./ui.litcoffee', 'handlebars', 'cs!./export.litcoffee', './lib/prism', 'cs!./editorSupport.litcoffee'], (Base, Org, DocOrg, Ast, Eval, Editor, _, $, UI, Handlebars, BrowserExports, Prism, EditorSupport)->

      {
        defaultEnv
      } = Base
      {
        parseOrgMode
        parseMeat
        Fragment
        Headline
        SimpleMarkup
        Link
        HTML
        Nil
        headlineRE
        HL_LEVEL
        HL_TODO
        HL_PRIORITY
        HL_TEXT
        HL_TAGS
        keywordRE
        KW_BOILERPLATE
        KW_INFO
        KEYWORD_
      } = Org
      {
        orgDoc
        getCodeItems
        blockSource
      } = DocOrg
      {
        Nil
      } = Ast
      {
        languageEnvMaker
        Html
        escapeHtml
        html
      } = Eval
      {
        LeisureEditCore
        last
        DataStore
        DataStoreEditingOptions
        blockText
        posFor
        escapeHtml
        copy
        setHtml
        findEditor
        copyBlock
        preserveSelection
      } = Editor
      {
        addView
        removeView
        renderView
        hasView
        viewKey
        addController
        removeController
        withContext
        mergeContext
        initializePendingViews
        escapeAttr
        nextImageSrc
        prevImageSrc
      } = UI
      {
        mergeExports
      } = BrowserExports
      {
        OrgEditing
        blockOrg
        blockCodeItems
        blockIsHidden
      } = EditorSupport

      plainMode =
        name: 'plain'
        handleChanges: (changes)->
        renderChanged: (opts, blocks, prefix, replace)->
          for id, block of opts.slidesFor blocks
            @render opts, block, prefix, replace
        render: (opts, block, prefix, replace)->
          {source, error, results} = blockCodeItems this, block
          attrs = "id='#{prefix}#{block._id}' data-block='#{block.type}'"
          if block.type == 'headline' then attrs += " data-headline='#{block.level}'"
          text = ''
          #if !results && !error then text += "#{escapeHtml block.text}"
          if !results && !error then text += @renderMainBlock block
          else
            if !error then text += @renderMainText block.text.substring(0, results?.offset ? block.text.length)
            else
              pos = source.offset + source.contentPos + Number(error.info.match(/([^,]*),/)[1]) - 1
              text += escapeHtml(block.text.substring(0, pos)) + "<span class='errorMark' contenteditable='false' data-noncontent>✖</span>" + escapeHtml(block.text.substring(pos, results?.offset ? block.text.length))
            if results? then text += "#{escapeHtml results?.text ? ''}#{escapeHtml block.text.substring(results.offset + results.text.length)}"
          result = "<span #{attrs}>#{text}</span>"
          maybeReplaceHtml block, prefix, result, replace
          [result, block.next]
        renderMainBlock: (block)->
          txt = block.text
          if block.type == 'headline'
            {text} = parseOrgMode(block.text).children[0].partOffsets()
            "<span class='plain-headline'>#{escapeHtml txt.substring 0, text.start}#{@renderMainText txt.substring(text.start, text.end)}#{escapeHtml txt.substring text.end}</span>"
          else @renderMeat parseOrgMode(block.text).children[0]
        renderMainText: (txt)-> @renderMeat parseMeat(txt, 0, '', true)[0]
        renderMeat: (org)->
          result = ''
          while org
            result += if org instanceof SimpleMarkup then @renderSimple org
            else escapeHtml org.allText()
            org = org.next
          result
        renderSimple: (org)->
          guts = ''
          for c in org.children
            guts += @renderMeat c, true
          guts = "#{org.text[0]}#{guts}#{org.text[org.text.length - 1]}"
          switch org.type == 'simple' && org.markupType
            when 'bold' then "<b>#{guts}</b>"
            when 'italic' then "<i>#{guts}</i>"
            when 'underline' then "<span style='text-decoration: underline'>#{guts}</span>"
            when 'strikethrough' then "<span style='text-decoration: line-through'>#{guts}</span>"
            when 'code' then "<code>#{guts}</code>"
            when 'verbatim' then "<code>#{guts}</code>"
            else escapeHtml org.allText()
        renderSimpleChild: (org)->
          if !org.children then escapeHtml org.text else @renderSimple org.children[0]

      toggleSlideMode = (slideDom)->
        if opts = findEditor(slideDom)?.options
          block = opts.getBlock opts.idForNode slideDom[0]
          opts.toggleSlide block._id
          blockHtml = opts.renderBlock(opts.getBlock block)[0]
          preserveSelection ->
            (if block.type == 'headline' then slideDom.closest('[data-view]')
            else slideDom.closest('[data-view="leisure-top-chunk"]')).replaceWith $(blockHtml)
          initializePendingViews()

      Handlebars.registerHelper 'render', (block)->
        fancyMode.render(UI.context.opts, block, UI.context.prefix)[0]

      Handlebars.registerHelper 'renderPlain', (data)->
        text = ''
        edata = UI.context.opts.data
        block = edata.getBlock data.blockId
        end = edata.nextRight(block)?._id
        while block && block._id != end
          [plainText, next] = plainMode.render UI.context.opts, block, UI.context.prefix
          text += plainText
          block = edata.getBlock next
        text

      Handlebars.registerHelper 'hiddenBeforeSource', ->
        {source} = @codeItems
        if source.offset
          "<span class='hidden'>#{@block.text.substring 0, source.offset}</span>"
        else ''

      Handlebars.registerHelper 'hiddenAfterSource', ->
        {source} = @codeItems
        if (end = source.end()) > @block.text.length
          "<span class='hidden'>#{@block.text.substring source.end()}</span>"
        else ''

      Handlebars.registerHelper 'htmlDataUrl', ->
        "data:text/html;charset=utf-8,#{encodeURI @source}"

      Handlebars.registerHelper 'sourceHeader', ->
        {source: src} = @codeItems
        src.text.substring 0, src.contentPos

      Handlebars.registerHelper 'sourceBoiler', ->
        {source: src} = @codeItems
        src.text.substring 0, src.infoPos

      Handlebars.registerHelper 'sourceInfo', ->
        {source: src} = @codeItems
        src.text.substring(src.infoPos, src.contentPos)

      Handlebars.registerHelper 'renderSource', ->
        {error, source} = @codeItems
        if error
          pos = Number(error.info.match(/([^,]*),/)[1]) - 1
          escapeHtml(source.content.substring(0, pos)) + "<span class='errorMark' contenteditable='false' data-noncontent>✖</span>" + escapeHtml(source.content.substring(pos))
        else prismHighlight this.language, this.source

      Handlebars.registerHelper 'sourceFooter', ->
        {source: src} = @codeItems
        src.text.substring(src.contentPos + src.content.length)

      Handlebars.registerHelper 'resultsHeader', ->
        {results: res} = @codeItems
        res.text.substring(0, res.contentPos)

      Handlebars.registerHelper 'resultsContents', ->
        {results: res} = @codeItems
        resultsArea res.text.substring res.contentPos

      slideNode = (node)-> $(node).closest('slideHolder').closest('[data-view]')

      isHiddenSlide = (block)-> block.type == 'headline' && blockIsHidden block

      fancyMode =
        name: 'fancy'
        handleChanges: (opts, changes)->
          for block in changes.newBlocks
            if changes.sets[block._id] && (old = opts.getBlock block._id) && isHiddenSlide(block) != isHiddenSlide(old)
              if isHiddenSlide block
                slideNode(opts.nodeForId(block._id)).remove()
              else
                siblingNode = null
                [newNode] = @render opts, block, opts.prefix
                sibling = block
                while !siblingNode && (sibling = opts.data.previousSibling sibling, changes)
                  if (siblingNode = opts.nodeForId(sibling._id)).length == 0
                    siblingNode = null
                if siblingNode then slideNode(siblingNode).after newNode
                else
                  sibling = block
                  while !siblingNode && (sibling = opts.data.nextSibling sibling, changes)
                    if (siblingNode = opts.nodeForId(sibling._id)).length == 0
                      siblingNode = null
                  if siblingNode then slideNode(siblingNode).before newNode
                  else $(opts.editor.node).prepend newNode
                initializePendingViews()
        renderChanged: (opts, blocks, prefix, replace)->
          rendered = {}
          for block in blocks
            if !opts.isToggled(block) then @render opts, block, prefix, replace
            else if opts.isToggled(block) && !rendered[(slide = opts.slideFor(block))?._id]
              rendered[slide._id] = true
              @render opts, slide, prefix, replace
        render: (opts, block, prefix, replace)->
          if opts.shouldHide block then ['', opts.data.nextRight(block)?._id]
          else
            opts.withNewContext =>
              UI.context.currentView = opts.nodeForId block._id
              if block.type == 'headline' then @renderHeadline opts, block, prefix, replace
              else if !block.prev then @renderFirstBlocks opts, block, prefix, replace
              else @renderNontop opts, block, prefix, replace
        renderNontop: (opts, block, prefix, replace)->
          if block.type == 'chunk' then @renderChunk opts, block, prefix, replace
          else if block.type == 'code' then @renderCode opts, block, prefix, replace
          else plainMode.render opts, block, prefix, replace
        renderView: (type, ctx, next, data, targets)-> [renderView(type, ctx, data, targets), next]
        renderHeadline: (opts, block, prefix, replace)->
          next = opts.data.nextRight(block)?._id
          viewName = if block.type == 'headline' && block.level == 1
            if opts.isToggled block
              UI.context.viewAttrs = _.merge {class: 'plain'}, UI.context.viewAttrs ? {}
              'leisure-headline-plain'
            else 'leisure-top-headline'
          else 'leisure-headline'
          if hasView viewName
            m = block.text.match headlineRE
            UI.context.currentView = targets = replacementTargets block, prefix, replace
            @renderView viewName, null, next,
               id: prefix + block._id
               blockId: block._id
               EOL: '\n'
               topLevel: block.level == 1
               level: block.level
               stars: m[HL_LEVEL]
               maintext: block.text.substring m[HL_LEVEL].length
               children: (opts.data.children block),
               targets
          else
            text = "<span id='#{prefix}#{block._id}' data-block='#{block.type}'>"
            text += escapeHtml block.text
            id = block.next
            while id && id != next
               [nextText, id] = @render opts, opts.data.getBlock(id), prefix
               text += nextText
            text += "</span>"
            maybeReplaceHtml block, prefix, text, replace
            [text, next]
        renderFirstBlocks: (opts, block, prefix, replace)->
          if hasView 'leisure-top-chunk'
            if plain = opts.isToggled block
              UI.context.viewAttrs = _.merge {class: 'plain'}, UI.context.viewAttrs ? {}
            text = ''
            cur = block
            UI.context.currentView = targets = replacementTargets block, prefix, replace
            while !(cur.type == 'headline' && cur.level == 1)
              [txt, next] = if plain then plainMode.render opts, cur, prefix
              else @renderNontop opts, cur, prefix
              text += txt
              if !next then break
              cur = opts.getBlock next
            @renderView 'leisure-top-chunk', null, next,
              id: prefix + block._id
              text: text
              topLevel: !block.prev
              EOL: '\n',
              targets
          else @renderNontop opts, block, prefix
        renderChunk: (opts, block, prefix, replace)->
          viewType = if opts.isToggled block
              UI.context.viewAttrs = _.merge {class: 'plain'}, UI.context.viewAttrs ? {}
              'leisure-headline-plain'
            else 'leisure-top-headline'
          viewType = 'leisure-chunk'
          UI.context.currentView = targets = replacementTargets block, prefix, replace
          if hasView viewType
            @renderView viewType, null, block.next,
              id: prefix + block._id
              text: @renderOrg blockOrg opts.data, block
              topLevel: !block.prev
              EOL: '\n',
              targets
          else @renderOrgBlock opts, block, prefix, replace
        renderCode: (opts, block, prefix, replace)->
          key = "leisure-code"
          org = blockOrg opts.data, block
          {name, source, results} = items = getCodeItems org.children?[0] ? org
          lang = if results && results.text.length > results.contentPos && _.contains (block.codeAttributes?.results?.split(' ') ? []), 'hidecode' then 'results-only'
          else if items.source instanceof HTML then 'inline-html' else block.language
          if hasView key, lang
            nameBoiler = if name && m = name.text.match keywordRE
              m[KW_BOILERPLATE]
            # this argument object to renderView is total overkill
            UI.context.currentView = targets = replacementTargets block, prefix, replace
            sourceData = 
              id: prefix + block._id
              codeItems: items
              language: block.language
              block: block
              header: block.text.substring 0, block.codePrelen
              source: blockSource block
              footer: block.text.substring block.text.length - block.codePostlen, source.end()
              nameBoiler: nameBoiler ? ''
              nameText: if name then name.text.substring nameBoiler.length, name.text.length - 1 else ''
              name: if name then name.text.substring name.info else ''
              afterName: if name then block.text.substring name.end(), source.offset else ''
              inter: if results then block.text.substring source.end(), results?.offset else block.text.substring source.end()
              results: if results then resultsArea block.text.substring results.offset, results.end() else ''
              resultsContent: if results then resultsArea results.text.substring results.contentPos else ''
              beforeResults: block.text.substring 0, results?.offset ? source.end()
            sourceData.text = @renderCodeOrg sourceData
            @renderView key, lang, block.next, sourceData, targets
          else plainMode.render opts, block, prefix, replace
        renderOrgBlock: (opts, block, prefix, replace)->
          text = "<span id='#{block._id}'>#{@renderOrg blockOrg opts.data, block}</span>"
          maybeReplaceHtml block, prefix, replace
          [text, block.next]
        renderCodeOrg: (context)->
          block = context.block
          {name, source, error, results} = context.codeItems
          text = ''
          pos = 0
          [pos, text] = @renderCodeSegment 'name', pos, text, context
          [pos, text] = @renderCodeSegment 'source', pos, text, context
          [pos, text] = @renderCodeSegment 'error', pos, text, context
          [pos, text] = @renderCodeSegment 'results', pos, text, context
          if pos < block.text.length then text += escapeHtml block.text.substring pos
          text
        renderCodeSegment: (name, pos, text, context)->
          if org = context.codeItems[name]
            block = context.block
            if hasView key = "leisure-code-#{name}", block.language
              if org.offset > pos
                text += escapeHtml block.text.substring pos, org.offset
              text += (@renderView key, block.language, null, context)[0]
              [org.end(), text]
            else if name == 'results' then [org.end(), resultsArea org.allText()]
            else [pos, text]
          else [pos, text]
        renderOrg: (org)->
          if org instanceof SimpleMarkup then @renderSimple org
          else if org instanceof Link then @renderLink org
          else if org instanceof Fragment
            (@renderOrg child for child in org.children).join ''
          else org.allText()
        renderHtml: (org)->
          "<span class='hidden'>#{escapeHtml org.leading}</span>#{$(org.content)[0].outerHTML}<span class='hidden'>#{escapeHtml org.trailing}</span>"
        renderLink: (org)->
          if leisureMatch = org.isLeisure()
            objectName = leisureMatch[1]
            viewName = if leisureMatch[2] then " data-view-name='#{leisureMatch[2]}'" else ''
            data = UI.context.opts.data
            error = if !obj = data.getBlock(data.namedBlocks[objectName])
              "No object named #{objectName}"
            else if !obj = (block = data.getBlock(data.namedBlocks[objectName]))?.yaml
              "Object #{objectName} isn't yaml"
            else if !(type = obj?.type)
              "No type field in object #{objectName}"
            else if !hasView type, viewName
              "No view '#{viewKey type, viewName}'"
            if error
              "<span class='error' data-noncontent title='#{escapeAttr error}'><b>✖</b></span>#{escapeHtml org.allText()}"
            else
              "<span class='hidden'>#{escapeHtml org.allText()}</span><span data-noncontent contenteditable='false'>#{renderView type, viewName, obj, null, block}</span>"
          else if org.isImage()
            title = (if desc = org.descriptionText() then " title='#{escapeHtml desc}'" else "")
            src = escapeHtml org.path
            if org.path.indexOf('file:') == 0 then src = prevImageSrc src
            "<img src='#{src}'#{title}><span class='hidden'>#{escapeHtml org.allText()}</span>"
          else
            guts = ''
            for c in org.children
              guts += @renderOrg c
            if !guts then "<span class='hidden'>[[</span><a onclick='Leisure.followLink(event)' href='#{org.path}'>#{org.path}</a><span class='hidden'>]]</span>"
            else "<span class='hidden'>[[#{org.path}][</span><a onclick='Leisure.followLink(event)' href='#{org.path}'>#{guts}</a><span class='hidden'>]]</span>"
        renderSimple: (org)->
          guts = ''
          for c in org.children
            guts += @renderOrg c, true
          text = switch org.markupType
            when 'bold' then "<b>#{guts}</b>"
            when 'italic' then "<i>#{guts}</i>"
            when 'underline' then "<span style='text-decoration: underline'>#{guts}</span>"
            when 'strikethrough' then "<span style='text-decoration: line-through'>#{guts}</span>"
            when 'code' then "<code>#{guts}</code>"
            when 'verbatim' then "<code>#{guts}</code>"
            else guts
          "<span class='hidden'>#{org.text[0]}</span>#{text}<span class='hidden'>#{goodText org.text[0]}</span>"

      _workSpan = null

      workSpan = -> _workSpan || createWorkSpan()

      createWorkSpan = -> _workSpan = $("<span></span>")

      goodHtml = (text)-> workSpan().html(text).html() ? ''

      goodText = (text)-> workSpan().text(text).html() ? ''

      resultsArea = (results)->
        if !(firstResult = results.indexOf('\n') + 1) || results[firstResult] == ':'
          "<span class='hidden'>#{goodText results}</span><span data-noncontent>#{results.replace /^(: )(.*\n)/gm, (m, g1, g2)-> goodHtml(g2)}</span>"
        else "<span class='hidden'>#{results.substring 0, firstResult}</span>#{fancyMode.renderOrg blockOrg null, text: results.substring(firstResult)}"

      plainEditDiv = (div, data)->
        $(div).addClass 'plain'
        new LeisureEditCore $(div), new OrgEditing data

      fancyEditDiv = (div, data)->
        new LeisureEditCore $(div), new OrgEditing(data).setMode fancyMode

      followLink = (e)-> console.log "Click link", e

      prismAliases =
        html: 'markup'
        coffee: 'coffeescript'
        cs: 'coffeescript'
        js: 'javascript'
  
      prismHighlight = (lang, text)->
        if l = prismAliases[lang] then lang = l
        if Prism.languages[lang]
          #console.log "PRISM: " + lang
          Prism.highlight text, Prism.languages[lang], lang
        else escapeHtml text

      replacementTargets = (block, prefix, replace)->
        if replace && (targets = $("##{prefix}#{block._id}")) && targets.length
          targets.closest('[data-view]')

      maybeReplaceHtml = (block, prefix, html, replace)->
        (replacementTargets block, prefix, replace)?.replaceWith html
        if replace then initializePendingViews()

Exports

      mergeExports {
        plainMode
        fancyMode
        toggleSlideMode
      }

      {
        plainMode
        fancyMode
        plainEditDiv
        fancyEditDiv
      }
