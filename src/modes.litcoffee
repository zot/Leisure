    define ['./base', './org', './docOrg', './ast', './eval', './editor', 'lib/lodash.min', 'jquery', './ui', 'handlebars', './export', './lib/prism', './editorSupport', 'lib/bluebird.min'], (Base, Org, DocOrg, Ast, Eval, Editor, _, $, UI, Handlebars, BrowserExports, Prism, EditorSupport, Bluebird)->

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
        Drawer
        Example
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
      {
        Promise
      } = Bluebird

      singleControllers = {}
      numPat = /-?[0-9][0-9.]*|-?\.[0-9.]+/
      currentSlider = null

      plainMode =
        name: 'plain'
        enter: (opts, parent, e)-> parent e
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
          opts.trigger 'render', opts.editor, block
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
            "<span class='plain-headline maintext'>#{escapeHtml txt.substring 0, text.start}#{@renderMainText txt.substring(text.start, text.end)}#{escapeHtml txt.substring text.end}</span>"
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
                if block = opts.getBlock opts.data.namedBlocks.get controllerName
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
        else resultsArea UI.context.options, res.text.substring res.contentPos

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
        enter: (opts, parent, e)->
          block = opts.getBlock opts.idForNode getSelection().getRangeAt(0).startContainer
          console.log "enter in block ", block._id
          if opts.isToggled block then parent e
          else
            e.preventDefault()
            opts.editor.replace e, opts.editor.getSelectedBlockRange(), '\n\n', false
        handleDelete: (opts, parent, e, sel, forward)->
          pos = opts.editor.docOffset opts.editor.domCursorForCaret().firstText()
          [start, end] = if forward
            [pos, Math.min(pos + 2, opts.data.getDocLength())]
          else [Math.max(0, pos - 2), pos]
          s = opts.data.getDocSubstring(start, end)
          if s == '\n\n'
            boff = opts.data.blockOffsetForDocOffset start
            eoff = opts.data.blockOffsetForDocOffset end
            if opts.isToggled(boff.block) || opts.isToggled(boff.block)
              parent e, sel, forward
            else
              boff.block = opts.data.getBlock boff.block
              boff.length = 2
              boff.type = 'Caret'
              console.log "DELETE NEWLINE", boff
              opts.editor.replace null, boff, ''
          else parent e, sel, forward
        renderBlocks: (opt, html)->
          header = if hasView 'header' then opt.withNewContext =>
            @renderView('header', null, null, {})[0]
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
          opts.trigger 'render', block
          if opts.shouldHide block then ['', opts.data.nextRight(block)?._id]
          else
            opts.withNewContext =>
              UI.context.currentView = opts.nodeForId block._id
              UI.context.block = block
              pushPendingInitialzation ->
                for node in opts.nodeForId(block._id).find('[title]')
                  $(node).tooltip().tooltip('option', 'content', $(node).attr 'title')
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
               maintext: @renderOrg(opts, cleanOrg(block.text.substring(m[HL_LEVEL].length))) + optWrench(block)
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
              text: @renderOrgChunk opts, blockOrg opts.data, block
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
              afterName: if name then @renderOrg opts, cleanOrg(block.text.substring name.end(), source.offset), true else ''
              inter: if results then block.text.substring source.end(), results?.offset else block.text.substring source.end()
              results: if !results then ''
              else if hideResults then "<span class='hidden'>#{escapeHtml results.text}</span>"
              else resultsArea opts, results.text
              beforeResults: block.text.substring 0, results?.offset ? source.end()
            sourceData.text = @renderCodeOrg opts, sourceData
            @renderView key, lang, block.next, sourceData, targets
          else plainMode.render opts, block, prefix, replace
        renderOrgBlock: (opts, block, prefix, replace)->
          text = "<span id='#{block._id}'>#{@renderOrg opts, blockOrg(opts.data, block), true}</span>"
          maybeReplaceHtml block, prefix, replace
          [text, block.next]
        renderCodeOrg: (opts, context)->
          block = context.block
          {name, source, error, results} = context.codeItems
          text = ''
          pos = 0
          [pos, text] = @renderCodeSegment opts, 'name', pos, text, context
          [pos, text] = @renderCodeSegment opts, 'source', pos, text, context
          [pos, text] = @renderCodeSegment opts, 'error', pos, text, context
          [pos, text] = @renderCodeSegment opts, 'results', pos, text, context
          if pos < block.text.length then text += escapeHtml block.text.substring pos
          text
        renderCodeSegment: (opts, name, pos, text, context)->
          if org = context.codeItems[name]
            block = context.block
            if hasView key = "leisure-code-#{name}", block.language
              if org.offset > pos
                text += escapeHtml block.text.substring pos, org.offset
              text += (@renderView key, block.language, null, context)[0]
              [org.end(), text]
            else if name == 'results' then [org.end(), resultsArea opts, org.allText()]
            else [pos, text]
          else [pos, text]
        renderOrgChunk: (opts, org)-> "<span class='org-chunk'>#{@renderOrg opts, org, true}</span>"
        renderExample: (opts, org)->
          start = org.text.substring 0, org.contentPos
          text = org.exampleText()
          end = org.text.substring org.contentPos + org.contentLength
          if hasView key = "leisure-example"
            (@renderView key, null, null,
              start: start
              text: text
              end: end
              org: org)[0]
          else "<span class='hidden'>#{escapeHtml start}</span><span class='example'>#{escapeHtml text}</span><span class='hidden'>#{escapeHtml end}</span>"
        renderOrg: (opts, org, start)->
          text = if org instanceof SimpleMarkup then @renderSimple opts, org
          else if org instanceof Link then @renderLink opts, org
          else if org instanceof Fragment
            (@renderOrg opts, child for child, i in org.children).join ''
          else if org instanceof ListItem then @renderList opts, org
          else if org instanceof Drawer then @renderDrawer opts, org
          else if org instanceof Example then @renderExample opts, org
          else insertBreaks escapeHtml org.allText()
          if start then prefixBreak text else text
        renderHtml: (opts, org)->
          "<span class='hidden'>#{escapeHtml org.leading}</span>#{$(org.content)[0].outerHTML}<span class='hidden'>#{escapeHtml org.trailing}</span>"
        renderList: (opts, org)->
          classifyListItems org
          text = if org.firstItem then '<ul>' else ''
          text += "<li><span class='hidden'>#{escapeHtml org.text.substring 0, org.contentOffset}</span>#{(@renderOrg opts, child for child in org.children).join ''}"
          for i in [0...org.closeCount]
            text += '</ul>'
          text
        renderLink: (opts, org)->
          if leisureMatch = org.isLeisure()
            objectName = leisureMatch[1]
            viewName = leisureMatch[2]
            data = UI.context.opts.data
            error = if !obj = data.getBlock(data.namedBlocks.get objectName)
              "No object named #{objectName}"
            else if !obj = (block = data.getBlock(data.namedBlocks.get objectName))?.yaml
              "Object #{objectName} isn't yaml"
            else if !(type = obj?.type)
              "No type field in object #{objectName}"
            else if !hasView type, viewName
              "No view '#{viewKey type, viewName}'"
            if error
              "<span class='error' data-noncontent title='#{escapeAttr error}'><b>✖</b></span>#{escapeHtml org.allText()}"
            else
              "<span class='hidden link'>#{escapeHtml org.allText()}</span><span data-noncontent contenteditable='false'>#{renderView type, viewName, obj, null, block}</span>"
          else if org.isImage()
            title = (if desc = org.descriptionText() then " title='#{escapeHtml desc}'" else "")
            src = escapeHtml org.path
            if org.path.indexOf('file:') == 0 then src = prevImageSrc src
            "#{opts.renderImage src, title}<span class='hidden link'>#{escapeHtml org.allText()}</span>"
          else
            guts = ''
            for c in org.children
              guts += @renderOrg opts, c
            if !guts then "<span class='hidden link'>[[</span><a onclick='Leisure.followLink(event)' href='#{org.path}'>#{org.path}</a><span class='hidden'>]]</span>"
            else "<span class='hidden link'>[[#{org.path}][</span><a onclick='Leisure.followLink(event)' href='#{org.path}'>#{guts}</a><span class='hidden'>]]</span>"
        renderSimple: (opts, org)->
          guts = ''
          for c in org.children
            guts += @renderOrg opts, c
          text = switch org.markupType
            when 'bold' then "<b>#{guts}</b>"
            when 'italic' then "<i>#{guts}</i>"
            when 'underline' then "<span style='text-decoration: underline'>#{guts}</span>"
            when 'strikethrough' then "<span style='text-decoration: line-through'>#{guts}</span>"
            when 'code' then "<code>#{guts}</code>"
            when 'verbatim' then "<code>#{guts}</code>"
            else guts
          "<span class='hidden'>#{org.text[0]}</span>#{text}<span class='hidden'>#{goodText org.text[0]}</span>"
        renderDrawer: (opts, org)->
          if org.name == 'properties' then "<span class='hidden'>#{escapeHtml org.allText()}</span>"
          else "<span class='org-properties'>#{escapeHtml org.allText}</span>"
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

      optWrench = (block)->
        if block.properties && !_.isEmpty block.properties
          props = "<div><b>Properties</b></div>"
          for k, v of block.properties
            props += "<p>:#{k}: #{v}"
          wrench = $("<i class='fa fa-wrench'></i>")[0]
          wrench.setAttribute 'title', props
          wrench.outerHTML
        else ''

      insertBreaks = (text)-> text.replace /\n\n/g, "\n\n<span contenteditable='false'><div style='height: 2em; white-space: pre' data-noncontent></div></span>"

      prefixBreak = (text)-> if text[0] == '\n' && text[1] != '\n' then "\n<span contenteditable='false'><div style='height: 2em; white-space: pre' data-noncontent></div></span>#{text.substring 1}" else text

      createValueSliders = ->
        for num in $(UI.context.currentView).find('.token.number')
          $(num).on 'click', -> showValueSlider this

      showValueSlider = (number)->
        editor = findEditor(number)
        data = editor.options.data
        widget = editor.node.find('[name=valueSlider]')
        blockOff = editor.blockOffset number, 0
        currentSlider =
          editor: editor
          data: data
          widget: widget
          sliding: true
        widget.removeClass 'hidden'
        widget.position my: 'center top', at: 'center bottom', of: number
        data.addMark '__slider__', data.docOffsetForBlockOffset blockOff
        setSliderValue Number number.textContent

      setSliderValue = (val)->
        widget = currentSlider.widget
        if -50 <= val <= 50
          widget.slider 'option', 'min', Math.min -100, -Math.abs val * 2
          widget.slider 'option', 'max', Math.max 100, Math.abs val * 2
        else if val > 50
          widget.slider 'option', 'min', 0
          widget.slider 'option', 'max', val * 2
        else
          widget.slider 'option', 'min', val * 2
          widget.slider 'option', 'max', 0
        widget.slider 'value', val

      setSliding = (flag)->
        if !flag && currentSlider then setSliderValue currentSlider.widget.slider 'value'
        setTimeout (->currentSlider?.sliding = flag), 1

      slideValue = ->
        if (cs = currentSlider) && !cs.editor.options.awaitingGuard
          start = cs.data.getMarkLocation '__slider__'
          blockOff = cs.data.blockOffsetForDocOffset start
          block = cs.editor.options.getBlock blockOff.block
          m = numPat.exec block.text.substring blockOff.offset
          newText = String currentSlider.widget.slider 'value'
          if m[0] != newText
            #console.log "REPLACE #{m[0]} with #{newText}"
            blockStart = cs.editor.options.data.offsetForBlock block
            cs.editor.options.awaitingGuard = true
            Promise.using(Promise.resolve(0).disposer(-> cs.editor.options.awaitingGuard = false), (cs.editor.options.guardedReplaceText start, start + m[0].length, newText, blockStart, blockStart + block.text.length), (->))

      mayHideValueSlider = ->
        if currentSlider && !currentSlider?.sliding
          currentSlider.data.removeMark '__slider__'
          currentSlider.widget.addClass 'hidden'
          currentSlider = null

      showsCode = (codeBlock)->
        exports = codeBlock.codeAttributes?.exports?.split(' ')
        !exports || !('results' in exports)

      showsResults = (codeBlock)->
        exports = codeBlock.codeAttributes?.exports?.split(' ')
        !exports || !('code' in exports)

      _workSpan = null

      workSpan = -> _workSpan || createWorkSpan()

      createWorkSpan = -> _workSpan = $("<span></span>")

      goodHtml = (text)-> workSpan().html(text).html() ? ''

      goodText = (text)-> workSpan().text(text).html() ? ''

      resultsArea = (opts, results)->
        if !(firstResult = results.indexOf('\n') + 1) || results[firstResult] == ':'
          "<span class='hidden'>#{goodText results}</span><span class='results-verbatim' data-noncontent>#{results.substring(firstResult).replace /^(: )(.*\n)/gm, (m, g1, g2)-> goodHtml(g2)}</span>"
        else "<span class='hidden'>#{results.substring 0, firstResult}</span>#{fancyMode.renderOrg opts, cleanOrg results.substring(firstResult)}"

      plainEditDiv = (div, data)->
        $(div).addClass 'plain'
        new LeisureEditCore $(div), new OrgEditing data

      fancyEditDiv = (div, data)->
        new LeisureEditCore $(div), new OrgEditing(data).setMode fancyMode

      prismAliases =
        html: 'markup'
        coffee: 'coffeescript'
        cs: 'coffeescript'
        js: 'javascript'
        lisp: 'scheme'
  
      prismHighlight = (lang, text)->
        if l = prismAliases[lang] then lang = l
        if Prism.languages[lang]
          Prism.highlight text, Prism.languages[lang], lang
        else "<span class='unknown-language'>#{escapeHtml text}</span>"

      replacementTargets = (block, prefix, replace)->
        if replace && (targets = $("##{prefix}#{block._id}")) && targets.length
          targets.closest('[data-view]')

      maybeReplaceHtml = (block, prefix, html, replace)->
        (replacementTargets block, prefix, replace)?.replaceWith html
        if replace then initializePendingViews()

      cleanOrg = (text)-> blockOrg null, text: text

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
        cleanOrg
      }

      {
        plainMode
        fancyMode
        plainEditDiv
        fancyEditDiv
      }
