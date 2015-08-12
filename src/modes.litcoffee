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
        ListItem
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
        blockVars
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
        pushPendingInitialzation
      } = UI
      {
        mergeExports
      } = BrowserExports
      {
        OrgEditing
        blockOrg
        blockCodeItems
        blockIsHidden
        blockEnvMaker
        controllerEval
      } = EditorSupport

      singleControllers = {}
      numPat = /-?[0-9][0-9.]*|-?\.[0-9.]+/g
      currentSlider = null

      plainMode =
        name: 'plain'
        renderBlocks: (opt, html)-> html
        setSlideMode: (opt, flag)->
        showingSlides: -> false
        showNextSlide: -> false
        showPrevSlide: -> false
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

      Handlebars.registerHelper 'renderHtml', (html)->
        [vars, ids] = blockVars UI.context?.opts?.data, this.block?.codeAttributes?.var
        if ids.length > 0 && (id = UI.context?.simpleViewId ? this.id) && (opts = UI.context?.opts)
          pushPendingInitialzation =>
            viewNode = $("##{id}")
            if (node = opts.nodeForId(@block._id)) && (node[0] == viewNode[0] || node[0].compareDocumentPosition(viewNode[0]) & Element.DOCUMENT_POSITION_CONTAINS)
              blocks = node.attr('data-observe') ? ''
              for id in ids
                blocks += " #{id}"
              node.attr 'data-observe', blocks
            if controllerName = @block.codeAttributes.controller
              if !(controller = singleControllers[controllerName])
                if block = opts.getBlock opts.data.namedBlocks[controllerName]
                  controller = singleControllers[controllerName] = {}
                  env = blockEnvMaker(block) __proto__: defaultEnv
                  env.eval = (text)-> controllerEval.call controller, text
                  env.write = (str)->
                  env.errorAt = (offset, msg)-> console.log msg
                  env.executeText blockSource(block), Nil, (->)
              controller?.initializeView viewNode[0], vars
        Handlebars.compile(html)(vars)

      initializePendingViews = ->
        UI.initializePendingViews()
        singleControllers = {}

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
        if @hideResults then "<span class='hidden'>#{escapeHtml res.text}</span>"
        else resultsArea res.text.substring res.contentPos

      slideNode = (node)-> $(node).closest('slideHolder').closest('[data-view]')

      isHiddenSlide = (block)-> block.type == 'headline' && blockIsHidden block

      closeList = (level, lastItem, stack)->
        closeCount = 0
        prevLast = lastItem
        
        while lastItem && lastItem.level > level
          delete lastItem.middleItem
          lastItem.lastItem = true
          lastItem = stack.pop()
          closeCount++
        prevLast.closeCount = closeCount
        lastItem

      classifyListItems = (org)->
        if !(org.firstItem || org.middleItem || org.lastItem)
          stack = []
          org.firstItem = true
          lastItem = org
          while org = org.next
            if org instanceof ListItem
              if lastItem.level > org.level
                lastItem = closeList org.level, lastItem, stack
              if lastItem.level < org.level
                org.firstItem = true
                stack.push lastItem
              else org.middleItem = true
              lastItem = org
          closeList -1, lastItem, stack

      fancyMode =
        name: 'fancy'
        renderBlocks: (opt, html)->
          header = if hasView 'header' then opt.withNewContext =>
            @renderView 'header', null, null, {}
          else "<div id='dummy_headline'></div>"
          "#{header}#{html}"
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
              UI.context.block = block
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
          hideResults = !showsResults block
          {name, source, results} = items = getCodeItems org.children?[0] ? org
          lang = if results && results.text.length > results.contentPos && !showsCode block then 'results-only'
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
              hideResults: hideResults
              block: block
              header: block.text.substring 0, block.codePrelen
              source: blockSource block
              footer: block.text.substring block.text.length - block.codePostlen, source.end()
              nameBoiler: nameBoiler ? ''
              nameText: if name then name.text.substring nameBoiler.length, name.text.length - 1 else ''
              name: if name then name.text.substring name.info else ''
              afterName: if name then block.text.substring name.end(), source.offset else ''
              inter: if results then block.text.substring source.end(), results?.offset else block.text.substring source.end()
              results: if !results then ''
              else if hideResults then "<span class='hidden'>#{escapeHtml results.text}</span>"
              else resultsArea results.text
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
          else if org instanceof ListItem then @renderList org
          else org.allText()
        renderHtml: (org)->
          "<span class='hidden'>#{escapeHtml org.leading}</span>#{$(org.content)[0].outerHTML}<span class='hidden'>#{escapeHtml org.trailing}</span>"
        renderList: (org)->
          classifyListItems org
          text = if org.firstItem then '<ul>' else ''
          text += "<li><span class='hidden'>#{escapeHtml org.text.substring 0, org.contentOffset}</span>#{(@renderOrg child for child in org.children).join ''}"
          for i in [0...org.closeCount]
            text += '</ul>'
          text
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
        showingSlides: (opt)-> opt.editor.node.is '.slides'
        setSlideMode: (opt, flag)->
          if flag
            opt.editor.node.addClass 'slides'
            slides = @getSlides opt
            slides.removeClass('firstSlide').removeClass('lastSlide')
            slides.first().addClass 'firstSlide'
            slides.last().addClass 'lastSlide'
            @showSlide opt, slides.first()
          else
            opt.editor.node.removeClass 'slides'
            $(opt.editor.node).find('.currentSlide').removeClass 'currentSlide'
        getSlides: (opt)-> $(opt.editor.node).find('.slideHolder')
        firstSlide: (opt)-> @getSlides(opt).first()
        lastSlide: (opt)-> @getSlides(opt).last()
        showSlide: (opt, slide)->
          slides = @getSlides opt
          top = $(opt.editor.node)
          top.removeClass('firstSlide').removeClass('lastSlide')
          $(opt.editor.node).find('.currentSlide').removeClass 'currentSlide'
          $(slide).addClass 'currentSlide'
          if $(slide)[0] == slides[0] then top.addClass 'firstSlide'
          if $(slide)[0] == _.last(slides) then top.addClass 'lastSlide'
        showNextSlide: (opt)->
          if @showingSlides(opt)
            slides = @getSlides opt
            for slide, i in slides
              if $(slide).is '.currentSlide'
                if i + 1 < slides.length then @showSlide opt, slides[i + 1]
                return true
          false
        showPrevSlide: (opt)->
          if @showingSlides(opt)
            slides = @getSlides opt
            for slide, i in slides
              if $(slide).is '.currentSlide'
                if i > 0 then @showSlide opt, slides[i - 1]
                return true
          false

      createValueSliders = ->
        for num in $(UI.context.currentView).find('.token.number')
          console.log "Number:", num
          $(num).on 'click', -> showValueSlider this

      showValueSlider = (number)->
        editor = findEditor(number)
        widget = editor.node.find('[name=valueSlider]')
        blockOff = editor.blockOffset number, 0
        currentSlider =
          blockId: blockOff.block._id
          start: blockOff.offset
          editor: editor
          widget: widget
          sliding: true
        widget.removeClass 'hidden'
        widget.position my: 'center top', at: 'center bottom', of: number
        setSliderValue Number number.textContent

      setSliderValue = (val)->
        widget = currentSlider.widget
        if -100 <= val <= 100
          widget.slider 'option', 'min', Math.min -100, -Math.abs val * 2
          widget.slider 'option', 'max', Math.max 100, Math.abs val * 2
        else if val > 100
          widget.slider 'option', 'min', 0
          widget.slider 'option', 'max', val * 2
        else
          widget.slider 'option', 'min', val * 2
          widget.slider 'option', 'max', 0
        widget.slider 'value', val

      setSliding = (flag)->
        if !flag then setSliderValue currentSlider.widget.slider 'value'
        setTimeout (->currentSlider?.sliding = flag), 1

      slideValue = ->
        cs = currentSlider
        block = cs.editor.options.getBlock cs.blockId
        m = block.text.substring(cs.start).match numPat
        newText = String currentSlider.widget.slider 'value'
        if m[0] != newText
          cs.editor.replace null,
            block: block
            offset: cs.start
            length: m[0].length
            type: 'Range',
            newText

      mayHideValueSlider = ->
        if currentSlider && !currentSlider?.sliding
          currentSlider.widget.addClass 'hidden'
          currentSlider = null
        else console.log "not hiding"

      showsCode = (codeBlock)->
        exports = codeBlock.codeAttributes?.exports?.split(' ')
        !exports || ('code' in exports) || ('both' in exports)

      showsResults = (codeBlock)->
        exports = codeBlock.codeAttributes?.exports?.split(' ')
        !exports || ('results' in exports) || ('both' in exports)

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
        blockVars
        createValueSliders
        slideValue
        mayHideValueSlider
        setSliding
      }

      {
        plainMode
        fancyMode
        plainEditDiv
        fancyEditDiv
      }
