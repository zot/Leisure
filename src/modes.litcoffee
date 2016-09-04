    define ['./base', './org', './docOrg', './ast', './eval', './editor', 'lodash', 'jquery', './ui', 'handlebars', './export', './lib/prism', './editorSupport', 'lib/bluebird.min', './advice', './lib/prism-leisure', 'lib/js-yaml'], (Base, Org, DocOrg, Ast, Eval, Editor, _, $, UI, Handlebars, BrowserExports, Prism, EditorSupport, Bluebird, Advice, PrismLeisure, Yaml)->

      {
        defaultEnv
      } = Base
      {
        changeAdvice
        afterMethod
        beforeMethod
      } = Advice
      {
        parseOrgMode
        parseMeat
        Fragment
        Headline
        SimpleMarkup
        Link
        Keyword
        ListItem
        Drawer
        Meat
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
        parseYaml
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
        isYamlResult
        unescapeString
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
        findEditor
        copyBlock
        preserveSelection
        getEventChar
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
        nextViewId
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
        updateSelection
      } = EditorSupport
      {
        Promise
      } = Bluebird

      singleControllers = {}
      numPat = /-?[0-9][0-9.]*|-?\.[0-9.]+/
      currentSlider = null

      plainMode =
        name: 'plain'
        keyPress: (opts, parent, e)-> parent e
        enter: (opts, parent, e)-> parent e
        handleDelete: (opts, parent, e, sel, forward)-> parent e
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
          {name, source, error, results} = blockCodeItems this, block
          attrs = "id='#{prefix}#{block._id}' data-block='#{block.type}'"
          if block.type == 'headline' then attrs += " data-headline='#{block.level}'"
          #if !results && !error then text += "#{escapeHtml block.text}"
          if !results && !error then text = @renderMainBlock block
          else
            text = if name then @renderMainText block.text.substring 0, source?.offset else ''
            if !error then text += @renderMainText block.text.substring(source.offset, results?.offset ? block.text.length)
            else
              pos = source.offset + source.contentPos + Number(error.info.match(/([^,]*),/)[1]) - 1
              text = escapeHtml(block.text.substring(name?.offset ? 0, pos)) + "<span class='errorMark' contenteditable='false' data-noncontent>✖</span>" + escapeHtml(block.text.substring(pos, results?.offset ? block.text.length))
            if results? then text += "#{escapeHtml results?.text ? ''}#{escapeHtml block.text.substring(results.offset + results.text.length)}"
          result = "<span #{attrs}>#{text}</span>"
          maybeReplaceHtml block, prefix, result, replace
          [result, block.next]
        renderMainBlock: (block)->
          txt = block.text
          if block.type == 'headline'
            {text} = parseOrgMode(block.text).children[0].partOffsets()
            "<div class='plain-headline maintext'>#{escapeHtml txt.substring 0, text.start}#{@renderMainText txt.substring(text.start, text.end)}#{escapeHtml txt.substring text.end}</div>"
          else @renderMeat parseOrgMode(block.text).children[0]
        renderMainText: (txt)->
          result = ''
          remaining = txt
          pos = 0
          while remaining
            [org] = parseMeat(remaining, 0, '', true)
            result += @renderMeat org
            pos += org.offset + org.allText().length
            remaining = txt.substring pos
          result
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
          blockHtml = opts.renderBlock(block)[0]
          preserveSelection ->
            if !opts.isToggled(block)
              next = block
              while isSidebar(next = opts.data.nextSibling(next))
                $(opts.nodeForId(next._id)).closest('.slideholder').closest('[data-view]').remove()
            prev = opts.editor.setHtml (if block.type == 'headline' then slideDom.closest('[data-view]')
            else slideDom.closest('[data-view="leisure-top-chunk"]'))[0], blockHtml, true
            next = block
            if opts.isToggled(block)
              while isSidebar(next = opts.data.nextSibling(next))
                $(prev).after opts.renderBlock(next)[0]
                prev = prev.nextSibling
          initializePendingViews()
          updateSelection()

      Handlebars.registerHelper 'render', (block)->
        fancyMode.render(UI.context.opts, block, UI.context.prefix)[0]

      Handlebars.registerHelper 'renderHtml', (html, options)->
        opts = UI.context?.opts
        [vars, ids] = blockVars opts?.data, this.block?.codeAttributes?.var
        data = UI.context?.opts?.data
        controllerName = @block.codeAttributes?.controller
        id = UI.context?.simpleViewId ? this.id
        if controllerName || (ids.length > 0 && (id = UI.context?.simpleViewId ? this.id))
          pushPendingInitialzation =>
            viewNode = $("##{id}")
            if ids.length && (node = opts.nodeForId(@block._id)) && (node[0] == viewNode[0] || node[0].compareDocumentPosition(viewNode[0]) & Element.DOCUMENT_POSITION_CONTAINS)
              blocks = node.attr('data-observe') ? ''
              for id in ids
                blocks += " #{id}"
              node.attr 'data-observe', blocks
            if controllerName
              if !(controller = singleControllers[controllerName])
                if block = opts.data.getBlockNamed controllerName
                  controller = singleControllers[controllerName] = {}
                  env = blockEnvMaker(block) __proto__: defaultEnv
                  env.eval = (text)-> controllerEval.call controller, text
                  env.write = (str)-> console.log str
                  env.errorAt = (offset, msg)-> console.log msg
                  opts.data.getCode(block).call controller, null, viewNode
              controller?.initializeView? viewNode[0], vars
        text = Handlebars.compile(html)(vars, data: UI.context)
        if !id && controllerName
          id = nextViewId()
          "<span id='#{id}'>#{text}</span>"
        else text

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
          [ignore, pos, msg] = error.info.match(/([^,]*), *(.*)/)
          pos = Number(pos) - 1
          prismHighlight(this.language, source.content.substring(0, pos)) + "<span class='errorMark' contenteditable='false' data-noncontent>✖</span><span class='errorMessage' contenteditable='false' data-noncontent title='#{escapeHtml unescapeString(msg).replace(/\n/g, '<br>')}'>✖</span><span class='errorSource'>" + prismHighlight(this.language, source.content.substring(pos)) + "</span>"
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

      Handlebars.registerHelper 'isExpected', (options)->
        !!options.data.opts.parsedCodeBlock(options.data.block).resultsAreExpected()

      Handlebars.registerHelper 'expectedResult', (options)->
        escapeHtml (options.data.block.codeTestExpected?.trim().replace /^: /mg, '') ? ''

      Handlebars.registerHelper 'actualResult', (options)->
        escapeHtml (options.data.block.codeTestActual?.trim().replace /^: /mg, '') ? ''

      #Handlebars.registerHelper 'find', ->
      #  ***

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

      fancyReplacements =
        '<': '&lt;'
        '>': '&gt;'
        '&': '&amp;'
        '"': '&quot;'
        "'": '&#39;'
        " ": ' '

      fancyHtml = (str)->
        if typeof str == 'string' then str.replace /[<>&'"]| +/g, (c)->
          if c == ' ' then c
          else if c[0] == ' '
            s = ''
            for i in [1...c.length]
              s += '&nbsp;'
            s += ' '
            s
          else fancyReplacements[c]
        else str


      fancyMode =
        name: 'fancy'
        keyPress: (opts, parent, e)->
          sel = getSelection()
          if sel.type == 'Caret'
            pos = opts.editor.getSelectedDocRange()
            sel = opts.editor.getSelectedBlockRange()
            block = opts.getBlock sel.block
            if !opts.isToggled(block) && block.type != 'code' && sel.offset == 0 && block.text[0] == '\n' && block.text[1] != '\n'
              e.preventDefault()
              opts.editor.replace e, sel, (getEventChar e) + '\n', false
              pos.type = 'Caret'
              pos.length = 0
              pos.start++
              opts.editor.selectDocRange pos
              return
          parent e
        enter: (opts, parent, e)->
          block = opts.getBlock opts.idForNode getSelection().getRangeAt(0).startContainer
          console.log "enter in block ", block._id
          if opts.isToggled(block) || block.type == 'code' then parent e
          else
            sel = opts.editor.getSelectedBlockRange()
            startBlock = opts.data.getBlock sel.block
            endSel = opts.data.blockOffsetForDocOffset opts.data.offsetForBlock(startBlock) + sel.offset + sel.length
            endBlock = opts.data.getBlock endSel.block
            t = startBlock.text
            if !sel.offset && startBlock.prev
              pt = opts.data.getBlock(startBlock.prev).text
              t = pt + t
              sel.offset += pt.length
            if ((t.substring(0, sel.offset).match(/\n*$/)[0].length + endBlock.text.substring(endSel.offset).match(/^\n*/)[0].length) % 2) then return parent e
            e.preventDefault()
            opts.editor.replace e, sel, '\n\n', false
        handleDelete: (opts, parent, e, sel, forward)->
          r = sel.getRangeAt 0
          start = opts.editor.docOffset r.startContainer, r.startOffset
          blockOff = opts.data.blockOffsetForDocOffset start
          block = opts.getBlock blockOff.block
          if (block?.type == 'code') || (forward && start == opts.getLength()) || (!forward && start == 0)
            return parent e, sel, forward
          if !forward
            --blockOff.offset
            --start
          pos = start
          if blockOff.offset <= 0
            prevBlock = opts.getBlock(block.prev)
            blockOff.block = prevBlock
            pt = prevBlock.text
            blockOff.offset += pt.length
            pt += block.text
          else pt = block.text
          del = pt.substring(blockOff.offset, blockOff.offset + 1)
          nt = pt.substring(blockOff.offset + 1)
          pt = pt.substring(0, blockOff.offset)
          ptNls = pt.match(/\n*$/)[0].length
          ntNls = nt.match(/^\n*/)[0].length
          end = start + 1
          if ptNls > 0 && ntNls > 0
            if (ptNls + ntNls) % 2 then start--
          else if del == '\n'
            if ntNls % 2 then end++
            else if ptNls % 2
              start--
              pos--
          opts.replaceText {start, end, text: '', source: 'edit'}
          opts.editor.domCursorForDocOffset(pos).moveCaret()
          if pos < opts.getLength() && pos != opts.editor.docOffset opts.editor.moveForward()
            opts.editor.moveBackward()
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
          if opts.shouldHide(block) || block.local then ['', opts.data.nextRight(block)?._id]
          else
            opts.trigger 'render', block
            opts.withNewContext =>
              UI.context.currentView = opts.nodeForId block._id
              UI.context.block = block
              addPendingTooltip opts, block._id
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
            if !opts.isToggled(block)
              if block.level == 1 && isSidebar block
                parent = block
                while parent && isSidebar parent
                  parent = opts.data.previousSibling parent
                if !parent || !opts.isToggled(parent) then viewName = 'leisure-sidebar'
              else if sidebars = @getSidebars opts, block
                next = opts.data.nextRight(_.last sidebars)?._id
                sidebars = for sblock in sidebars
                  @render(opts, sblock, prefix)[0]
                viewName += '-with-sidebar'
            @renderView viewName, null, next,
              firstText: isFirstText opts.data, block
              id: prefix + block._id
              blockId: block._id
              EOL: '\n'
              style: (if block.properties?.style then "style='#{block.properties.style}'" else '')
              topLevel: block.level == 1
              level: block.level
              stars: m[HL_LEVEL]
              maintext: @renderOrg(opts, cleanOrg(block.text.substring(m[HL_LEVEL].length))) + optWrench(block)
              children: (opts.data.children block)
              sidebars: sidebars,
              targets
          else
            text = "<span id='#{prefix}#{block._id}' data-block='#{block.type}'>"
            text += fancyHtml block.text
            id = block.next
            while id && id != next
               [nextText, id] = @render opts, opts.data.getBlock(id), prefix
               text += nextText
            text += "</span>"
            maybeReplaceHtml block, prefix, text, replace
            [text, next]
        getSidebars: (opts, block)->
          if block && (block.level == 1 || !block.prev) && !isSidebar(block)
            sidebars = []
            while isSidebar block = opts.data.nextSibling block
              if !opts.shouldHide(block) then sidebars.push block
            if sidebars.length then sidebars
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
              firstText: isFirstText opts.data, block
              text: @renderOrgChunk opts, blockOrg opts.data, block
              topLevel: !block.prev
              EOL: '\n',
              targets
          else @renderOrgBlock opts, block, prefix, replace
        renderCode: (opts, block, prefix, replace)->
          key = "leisure-code"
          org = blockOrg opts.data, block
          hideResults = !showsResults block
          {name, source, error, results} = items = getCodeItems org.children?[0] ? org
          lang = if results && results.text.length > results.contentPos && !showsCode block then 'results-only'
          else if items.source instanceof HTML then 'inline-html' else block.language
          if hasView key, lang
            nameBoiler = if name && m = name.text.match keywordRE
              m[KW_BOILERPLATE]
            # this argument object to renderView is total overkill
            UI.context.currentView = targets = replacementTargets block, prefix, replace
            sourceData = {
              id: prefix + block._id
              codeItems: items
              language: block.language
              hideResults
              block
              header: block.text.substring 0, block.codePrelen
              source: blockSource block
              footer: block.text.substring block.text.length - block.codePostlen, source.end()
              nameBoiler: nameBoiler ? ''
              nameText: if name then name.text.substring nameBoiler.length, name.text.length - 1 else ''
              name: if name then name.text.substring name.info else ''
              afterName: if name then @renderOrg opts, cleanOrg(block.text.substring name.end(), source.offset), true else ''
              inter: @interstitialCode block, source, error, results
              results: if !results then ''
              else if hideResults then "<span class='hidden'>#{escapeHtml results.text}</span>"
              else resultsArea opts, results.text, block
              beforeResults: block.text.substring 0, results?.offset ? source.end()
            }
            sourceData.text = @renderCodeOrg opts, sourceData
            @renderView key, lang, block.next, sourceData, targets
          else plainMode.render opts, block, prefix, replace
        interstitialCode: (block, source, error, results)->
          if error then (escapeHtml(block.text.substring source.end(), error.offset) +
            "<span class='hidden'>#{escapeHtml error.text}</span>" +
            escapeHtml block.text.substring error.end(), results?.offset ? block.text.length)
          else escapeHtml block.text.substring source.end(), results?.offset ? block.text.length
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
          if pos < block.text.length then text += fancyHtml block.text.substring pos
          text
        renderCodeSegment: (opts, name, pos, text, context)->
          if org = context.codeItems[name]
            block = context.block
            if hasView key = "leisure-code-#{name}", block.language
              if org.offset > pos
                text += fancyHtml block.text.substring pos, org.offset
              text += (@renderView key, block.language, null, context)[0]
              [org.end(), text]
            else if name == 'results' then [org.end(), resultsArea opts, org.allText(), block]
            else [pos, text]
          else [pos, text]
        renderOrgChunk: (opts, org)->
          t = @renderOrg opts, org, true
          if m = t.match /\n$/
            "<span class='org-chunk'>#{t.substring 0, t.length - 1}</span><span class='hidden'>\n</span>"
          else "<span class='org-chunk'>#{t}</span>"
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
          else "<span class='hidden'>#{escapeHtml start}</span><span class='example'>#{fancyHtml text}</span><span class='hidden'>#{escapeHtml end}</span>"
        renderOrg: (opts, org, start, noName)->
          if !noName && ([name, named] = namedNode org) && named
            if named != org then return ''
            org = named
            boiler = name.text.substring 0, name.text.length - name.info.length
            nameText = "<div><span class='hidden'>#{escapeHtml boiler}</span><span class='org-name'>#{escapeHtml name.info}</span></div>"
            while (name = name.next) != org
              nameText += @renderOrg opts, name, start, true
          else nameText = ''
          text = if org instanceof SimpleMarkup then @renderSimple opts, org
          else if org instanceof Link then @renderLink opts, org
          else if org instanceof Fragment
            #(@renderOrg opts, child for child, i in org.children).join ''
            (@renderOrg opts, child for child, i in mergeMeat(org).children).join ''
          else if org instanceof ListItem then @renderList opts, org
          else if org instanceof Drawer then @renderDrawer opts, org
          else if org instanceof Example then @renderExample opts, org
          else insertBreaks fancyHtml org.allText()
          text = nameText + text
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
            [ignore, objectName, viewName, typeName] = leisureMatch
            data = UI.context.opts.data
            error = if !obj = data.getBlockNamed objectName
              "No object named #{objectName}"
            else if !obj = data.getYaml block = data.getBlockNamed objectName
              "Object #{objectName} isn't yaml"
            else if !(type = (typeName || obj?.type))
              "No type field in object #{objectName}"
            else if !hasView type, viewName
              "No view '#{viewKey type, viewName}'"
            if error
              if objectName
                attrs = " data-view-block-name='#{objectName}'#{if viewName then ' data-view-name=\'' + viewName + '\'' else ''}"
              else attrs = ''
              "<span class='error' title='#{escapeAttr error}'#{attrs}><b data-noncontent >✖</b>#{fancyHtml org.allText()}<span>"
            else
              "<span class='hidden link'>#{escapeHtml org.allText()}</span><span data-noncontent contenteditable='false'>#{renderView type, viewName, obj, null, block, objectName}</span>"
          else if org.isImage()
            title = (if desc = org.descriptionText() then " title='#{fancyHtml desc}'" else "")
            src = fancyHtml org.path
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
          if org.name.toLowerCase() == 'properties' then "<span class='hidden'>#{escapeHtml org.allText()}</span>"
          else "<span class='org-properties'>#{fancyHtml org.allText()}</span>"
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
            opt.currentSlide = null
        getSlides: (opt)->
          $(opt.editor.node).find('[data-view=leisure-top-headline], [data-view=leisure-top-chunk]')
        firstSlide: (opt)-> @getSlides(opt).first()
        lastSlide: (opt)-> @getSlides(opt).last()
        showSlide: (opt, slide, slides)->
          slides = slides ? @getSlides opt
          top = $(opt.editor.node)
          top.removeClass('firstSlide').removeClass('lastSlide')
          $(opt.editor.node).find('.currentSlide').removeClass 'currentSlide'
          $(slide).addClass 'currentSlide'
          if $(slide)[0] == slides[0] then top.addClass 'firstSlide'
          if $(slide)[0] == _.last(slides) then top.addClass 'lastSlide'
          opt.currentSlide = opt.idForNode $(slide).find('[data-block]:first')
        showNextSlide: (opt)->
          if @showingSlides(opt)
            next = $('.currentSlide').next('[data-view=leisure-top-headline], [data-view=leisure-top-chunk]')
            if next.length
              @showSlide opt, next
              return true
          false
        showPrevSlide: (opt)->
          if @showingSlides(opt)
            prev = $('.currentSlide').prev('[data-view=leisure-top-headline], [data-view=leisure-top-chunk]')
            if prev.length
              @showSlide opt, prev
              return true
          false

      isFirstText = (source, block)->
        if (block.type == 'chunk' || (block.type == 'headline' && block.level > 1)) && (parent = source.parent(block)) && parent.level == 1
          original = block
          while (block = source.previousSibling block) && !maybeFirst block then
          !block && findFirstLetter original.text

      maybeFirst = (block)->
        (block.type in ['chunk', 'headline'] && findFirstLetter block.text) || (block.type == 'code' && block.language != 'html')

      findFirstLetter = (text)-> text.match(/[a-zA-Z0-9]/)?[0][0].toUpperCase()

      pendingTooltips = null

      addPendingTooltip = (opts, blockId)->
        if !pendingTooltips
          pendingTooltips = new Map()
          pushPendingInitialzation ->
            nodes = new Set()
            pendingTooltips.forEach (ids, opts)->
              for id in ids
                for node in opts.nodeForId(id).find('[title]')
                  nodes.add node
            nodes.forEach (node)->
              node.INIT_TOOLTIP = true
              $(node).tooltip content: $(node).attr 'title'
            pendingTooltips = null
        if !pendingTooltips.get opts then pendingTooltips.set opts, []
        pendingTooltips.get(opts).push blockId

namedNode(org) returns [name, node] if org is a name followed by optional meat
and a nameable node.

Returns [] if org does not fit the pattern.

      isMeat = (org)-> org && (org instanceof SimpleMarkup || org.constructor == Meat)

      namedNode = (org)->
        end = org
        if isMeat(org) || org instanceof Example || org instanceof Drawer
          while isMeat org = org.prev then
        if org instanceof Keyword && (org.name.match /^name$/i) && name = org
          if name == end then end = end.next
          while isMeat(end) && end = end.next then
          if end instanceof Example || end instanceof Drawer
            return [name, end]
        []

      isSidebar = (block)-> block?.properties?.note == 'sidebar'

      optWrench = (block)->
        if block.properties && !_.isEmpty block.properties
          props = "<div><b>Properties</b></div>"
          for k, v of block.properties
            props += "<p>:#{k}: #{v}"
          wrench = $("<i class='fa fa-wrench'></i>")[0]
          wrench.setAttribute 'title', props
          wrench.outerHTML
        else ''

      insertBreaks = (text)-> text.replace /\n\n/g, (match, offset, str)->
        if str[offset + 2] == '\n'
          "\n<span class='hidden'>\n</span><span contenteditable='false'><div style='white-space: pre; height: 2em' data-noncontent></div></span><div style='height: 1em; white-spaceX: pre' data-noncontent>\n</div><span class='hidden'></span>"
        else "\n<span class='hidden'>\n</span><span contenteditable='false'><div style='height: 2em; white-space: pre' data-noncontent></div></span>"

      prefixBreak = (text)-> if text[0] == '\n' && text[1] != '\n' then "\n<div style='height: 2em; white-space: pre' data-noncontent>\n</div>#{text.substring 1}" else text

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
          number: Number number.textContent
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
          delta = currentSlider.widget.slider('value') - cs.number
          cs.number = currentSlider.widget.slider('value')
          newText = String currentSlider.widget.slider 'value'
          if delta != 0
            if block.local
              cs.editor.options.replaceText {start, end: start + m[0].length, text: newText, source: 'edit'}
            else
              if pos = getSliderPosition()
                pos.delta = delta
                sendSliderChange pos

      sendSliderChange = (pos)->
        cs = currentSlider
        if cs.awaitingChange
          if cs.nextChange then pos.delta += cs.nextChange.delta
          cs.nextChange = pos
        else
          cs.awaitingChange = true
          {start, offset, numberCount, numberOffset, delta} = pos
          cs.editor.options.collaborativeCode.doSlideValue(start, offset, numberCount, numberOffset, delta)
            .then ->
              cs.awaitingChange = false
              if pos = cs.nextChange
                cs.nextChange = null
                sendSliderChange pos

      doSlideValue = ({options: opts, slaveId}, start, offset, numberCount, numberOffset, delta)->
        #console.log "Slider#{if slaveId then ' from slave ' + slaveId else ''} start: #{start}, offset: #{offset}, numberCount: #{numberCount}, numberOffset: #{numberOffset}, change: #{delta}"
        {block} = opts.data.blockOffsetForDocOffset start
        node = opts.nodeForId block
        block = opts.data.getBlock block
        cur = opts.editor.domCursor(node, 0).firstText()
        sliderNode = $(cur.mutable().forwardChars(offset, true).firstText().node).closest '.token.number'
        if sliderNode.length
          numCur = opts.editor.domCursor sliderNode[0], 0
          offset = cur.getTextTo(numCur).length
        else
          numbers = node.find('.token.number')
          if !numbers.length then return null
          else if numbers.length == numberCount
            numCur = opts.editor.domCursor numbers[numberOffset], 0
            offset = cur.getTextTo(numCur).length
          else
            offset = 0
            targetDistance = Number.MAX_VALUE
            for number in numbers
              number = numbers[testPos]
              numCur = opts.editor.domCursor number, 0
              offset += cur.getTextTo(numCur).length
              cur = numCur
              dist = offset - offset
              if targetDistance > dist
                targetDistance = dist
              else if offset > offset then break
        m = numPat.exec block.text.substring offset
        newText = String delta + Number m[0]
        start = offset + opts.data.offsetForBlock block
        opts.replaceText {start, end: start + m[0].length, text: newText, source: 'code'}

      getSliderPosition = ->
        cs = currentSlider
        start = cs.data.getMarkLocation '__slider__'
        opts = cs.editor.options
        {block, offset} = cs.data.blockOffsetForDocOffset start
        node = opts.nodeForId block
        cursor = opts.domCursor(node[0], 0).mutable().forwardChars(offset, true).firstText()
        sliderNode = $(cursor.node).closest '.token.number'
        if !sliderNode.length
          cursor.backwardChar()
          sliderNode = $(cursor.node).closest '.token.number'
          if !sliderNode.length
            console.error "Could not find slider node for block: #{block}, offset: #{offset - 1}, '#{cs.data.blocks[block].text[offset]}', node:", cursor.node
            return
        nth = 0
        numbers = node.find('.token.number')
        for number in numbers
          if number == sliderNode[0]
            return {start, offset, numberCount: numbers.length, numberOffset: nth}
          nth++

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

      isViewResult = (block)-> block.codeAttributes?.results?.match /\bview\b(?:\(([^\/]*(?:\/(.*))?)\))?/i

      resultsArea = (opts, results, block)->
        firstResult = results.indexOf('\n') + 1
        if m = isViewResult(block)
          obj = parseYaml results.substring(firstResult).replace /(^|\n): /gm, '$1'
          [ignore, type, viewName] = m
          type = type ? obj.type
          {name: objectName} = blockCodeItems opts, block
          #"<span class='hidden'>#{escapeHtml results}</span>#{renderView type, viewName, obj, null, block, objectName}"
          "<span class='hidden'>#{escapeHtml results}</span>#{renderView type, viewName, obj}"
        else if false && isYamlResult block
          "<span class='hidden'>#{results.substring 0, firstResult}</span><span class='yaml results-verbatim' data-noncontent>#{results.substring(firstResult).replace /^(: )(.*\n)/gm, (m, g1, g2)-> goodHtml(g2)}</span>"
        else if !firstResult || results[firstResult] == ':'
          "<span class='hidden'>#{goodText results}</span><span class='results-verbatim' data-noncontent>#{results.substring(firstResult).replace /^(: )(.*\n)/gm, (m, g1, g2)-> goodHtml(g2)}</span>"
        else "<span class='hidden'>#{results.substring 0, firstResult}</span>#{fancyMode.renderOrg opts, cleanOrg results.substring(firstResult)}"

      plainEditDiv = (div, data)->
        $(div).addClass 'plain'
        new LeisureEditCore $(div), new OrgEditing data

      fancyEditDiv = (div, data)->
        options = new OrgEditing(data).setMode fancyMode
        options.openRegistration()
        options.registerCollaborativeCode 'doSlideValue', doSlideValue
        options.registerCollaborativeCode 'viewBoundSet', (context, name, data)-> options.setData name, data
        options.closeRegistration()
        new LeisureEditCore $(div), options

      prismAliases =
        html: 'handlebars'
        coffee: 'coffeescript'
        cs: 'coffeescript'
        js: 'javascript'
        lisp: 'scheme'
        leisure: 'leisure'

      prismHighlight = (lang, text)->
        if l = prismAliases[lang] then lang = l
        if Prism.languages[lang]
          Prism.highlight text, Prism.languages[lang], lang
        else "<span class='unknown-language'>#{fancyHtml text}</span>"

      replacementTargets = (block, prefix, replace)->
        if replace && (targets = $("##{prefix}#{block._id}")) && targets.length
          targets.closest('[data-view]')

      maybeReplaceHtml = (block, prefix, html, replace)->
        (replacementTargets block, prefix, replace)?.replaceWith html
        if replace then initializePendingViews()

      cleanOrg = (text)-> blockOrg null, text: text

      mergeMeat = (fragment)->
        newChildren = []
        prevMeat = null
        for c, i in fragment.children
          if c.__proto__ == Meat.prototype
            if !prevMeat
              prevMeat = new Meat c.text, c.offset
              newChildren.push prevMeat
            else prevMeat.text += c.text
          else
            if prevMeat then prevMeat = null
            newC = _.clone c
            newC.__proto__ = c.__proto__
            newChildren.push newC
        new Fragment(fragment.offset, newChildren).linkNodes()

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
        showsCode
        showsResults
      }

      {
        plainMode
        fancyMode
        plainEditDiv
        fancyEditDiv
        doSlideValue
      }
