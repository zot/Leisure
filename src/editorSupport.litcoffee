Editing support for Leisure

This file customizes the editor so it can handle Leisure files.  Here is the Leisure
block structure:  ![Block structure](private/doc/blockStructure.png)

    define ['cs!./base', 'cs!./org', 'cs!./docOrg.litcoffee', 'cs!./ast', 'cs!./eval.litcoffee', 'cs!./editor.litcoffee', 'lib/lodash.min', 'jquery', 'cs!./ui.litcoffee', 'handlebars', 'cs!./export.litcoffee'], (Base, Org, DocOrg, Ast, Eval, Editor, _, $, UI, Handlebars, BrowserExports)->

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
        Nil
        headlineRE
        HL_LEVEL
        HL_TODO
        HL_PRIORITY
        HL_TEXT
        HL_TAGS
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
        addController
        removeController
        withContext
        mergeContext
        initializePendingViews
      } = UI
      {
        mergeExports
      } = BrowserExports

      selectionActive = true
      headlineRE = /^(\*+ *)(.*)(\n)$/
      defaults =
        views: {}
        controls: {}

      blockOrg = (data, blockOrText)->
        text = if typeof blockOrText == 'string' then data.getBlock(blockOrText) ? blockOrText else blockOrText.text
        org = parseOrgMode text
        org = if org.children.length == 1 then org.children[0]
        else
          frag = new Fragment org.offset, org.children
          frag
        if typeof blockOrText == 'object'
          org.nodeId = blockOrText._id
          org.shared = blockOrText.type
        org.linkNodes()
        org

`OrgData` -- a DataStore that supports block-structured org file data.  Each block has type 'headline', 'code', or 'chunk'.  Blocks use nextSibling and previousSibling ids to indicate the tree structure of the org document (there are no direct parent/child links).

      class OrgData extends DataStore
        constructor: ->
          DataStore.apply this, arguments
          @namedBlocks = {}
        getBlock: (thing, changes)->
          if typeof thing == 'string' then changes?.sets[thing] ? super(thing) else thing

`load` -- not the best use of inheritance here, changes is specifically for P2POrgData :).
Let's just call this poetic license for the time being...

        load: (first, blocks, changes)->
          if !first then super first, blocks
          else
            if !changes then changes = sets: blocks, oldBlocks: {}, first: first
            @linkAllSiblings changes
            for block of @blockList()
              @checkChange block, null
            for id, block of changes.sets
              @checkChange null, block
            super first, blocks
        parseBlocks: (text)->
          if text == '' then []
          else orgDoc parseOrgMode text.replace /\r\n/g, '\n'
        nextSibling: (thing, changes)-> @getBlock @getBlock(thing, changes)?.nextSibling, changes
        previousSibling: (thing, changes)-> @getBlock @getBlock(thing, changes).previousSibling, changes
        reducePreviousSiblings: (thing, changes, func, arg)->
          greduce @getBlock(thing, changes), changes, func, arg, (b)=> @getBlock b.previousSibling, changes
        reduceNextSiblings: (thing, changes, func, arg)->
          greduce @getBlock(thing, changes), changes, func, arg, (b)=> @getBlock b.nextSibling, changes
        lastSibling: (thing, changes)-> @reduceNextSiblings thing, changes, ((x, y)-> y), null
        firstSibling: (thing, changes)-> @reducePreviousSiblings thing, changes, ((x, y)-> y), null
        parent: (thing, changes)-> @getBlock @firstSibling(thing, changes)?.prev, changes
        firstChild: (thing, changes)->
          if (block = @getBlock thing, changes) && (n = @getBlock block.next, changes) && !n.previousSibling
            n
        lastChild: (thing, changes)-> @lastSibling @firstChild(thing, changes), changes
        children: (thing, changes)->
          c = []
          @reduceNextSiblings @firstChild(thing, changes), changes, ((x, y)-> c.push y), null
          c

`nextRight` returns the next thing in the tree after this subtree, which is just the
next sibling if there is one, otherwise it's the closest "right uncle" of this node

        nextRight: (thing, changes)->
          while thing
            if sib = @nextSibling thing, changes then return sib
            thing = @parent thing, changes
          null

`linkAllSiblings` -- modify changes so that the sibling links will be correct when the changes are applied.

        linkAllSiblings: (changes)->
          stack = []
          parent = null
          sibling = null
          emptyNexts = {}
          cur = @getBlock changes.first, changes
          while cur
            if cur.nextSibling then emptyNexts[cur._id] = cur
            if cur.type == 'headline'
              while parent && cur.level <= parent.level
                [parent, sibling] = stack.pop()
            else if cur.type == 'chunk' && cur.properties? && parent && !_(parent.propertiesBlocks).contains cur._id
              if !parent.propertiesBlocks
                parent.propertiesBlocks = []
              parent.propertiesBlocks.push cur._id
            if sibling
              delete emptyNexts[sibling._id]
              if sibling.nextSibling != cur._id
                addChange(sibling, changes).nextSibling = cur._id
              if cur.previousSibling != sibling._id
                addChange(cur, changes).previousSibling = sibling._id
            else if cur.previousSibling
              delete addChange(cur, changes).previousSibling
            sibling = cur
            if cur.type == 'headline'
              stack.push [parent, sibling]
              parent = cur
              sibling = null
            cur = @getBlock cur.next, changes
          for id, block of emptyNexts
            delete addChange(block, changes).nextSibling

`makeChange` -- handle incoming changes (local or remote).  This is for computations
that must be done regardless of the source of changes

        makeChange: (changes)->
          {sets, removes} = changes
          for id of removes
            @checkChange @getBlock(id), null
          for id, block of sets
            @checkChange @getBlock(id), block
          super changes
        processDefaults: (lorgText)->
          viewBlocks = orgDoc parseOrgMode lorgText.replace /\r\n?/g, '\n'
          for block in viewBlocks
            @checkChange null, block, true
        checkChange: (oldBlock, newBlock, isDefault)->
          @checkCssChange oldBlock, newBlock, isDefault
          @checkCodeChange oldBlock, newBlock, isDefault
          @checkViewChange oldBlock, newBlock, isDefault
          @checkControlChange oldBlock, newBlock, isDefault
        checkCssChange: (oldBlock, newBlock, isDefault)->
          if isCss(oldBlock) || isCss(newBlock)
            $("#css-#{oldBlock?._id || newBlock?._id}").filter('style').remove()
          if isCss newBlock
            $('head').append "<style id='css-#{newBlock._id}'>#{blockSource newBlock}</style>"
        checkCodeChange: (oldBlock, newBlock, isDefault)->
          differentName = oldBlock? != newBlock? || oldBlock.type != newBlock.type || oldBlock?.codeName != newBlock?.codeName
          if oldBlock?.codeName then delete @namedBlocks[newBlock.codeName]
          if newBlock?.codeName then @namedBlocks[newBlock.codeName] = newBlock._id
        checkViewChange: (oldBlock, newBlock, isDefault)->
          removeView ov = blockViewType oldBlock
          if vt = blockViewType newBlock
            source = blockSource newBlock
            addView vt, null, source.substring 0, source.length - 1
            if isDefault then defaults.views[vt] = source.substring 0, source.length - 1
          if ov && ov != vt && view = defaults.views[ov] then addView ov, null, view
        checkControlChange: (oldBlock, newBlock, isDefault)->
          if oldBlock?.type != 'code' || blockSource(oldBlock) != blockSource(newBlock) || isControl(oldBlock) != isControl(newBlock)
            removeController ov = blockViewType oldBlock, 'control'
            if vt = blockViewType newBlock, 'control'
              env = blockEnvMaker(newBlock) __proto__: defaultEnv
              controller = {}
              addController vt, null, controller
              env.eval = (text)-> controllerEval.call controller, text
              env.write = (str)->
              env.errorAt = (offset, msg)-> console.log msg
              env.executeText blockSource(newBlock), Nil, (->)

`controllerEval` looks like a useless wrapper for eval, but you can use `apply()`
and `call` to set "this" for the code, which you can't do with the primitive `eval()`

      controllerEval = (txt)-> eval txt

      isCss = (block)-> block?.language == 'css'

      isControl = (block)-> block?.type == 'code' && block.codeAttributes?.control

      blockViewType = (block, attr = 'defview')->
        (block?.type == 'code' && block.codeAttributes?[attr]) || null

      addChange = (block, changes)->
        if !changes.oldBlocks[block._id] then changes.oldBlocks[block._id] = copy block
        changes.sets[block._id] = block

      greduce = (thing, changes, func, arg, next)->
        if typeof changes == 'function'
          next = arg
          arg = func
          func = changes
        if thing && typeof arg == 'undefined'
          arg = thing
          thing = next thing
        while thing
          arg = func arg, thing
          thing = next thing
        arg

      getId = (thing)-> if typeof thing == 'string' then thing else thing._id

`OrgEditing` -- editing options for the org editor.

      class OrgEditing extends DataStoreEditingOptions
        constructor: (data)->
          super data
          data.on 'load', =>
            setHtml @editor.node[0], @renderBlocks()
            initializePendingViews()
          data.on 'change', -> initializePendingViews()
          @setPrefix 'leisureBlock-'
          @setMode plainMode
          @hiddenSlides = {}
          @toggledSlides = {}
        toggleSlide: (id)->
          if @toggledSlides[id] then delete @toggledSlides[id]
          else @toggledSlides[id] = true
        isToggled: (thing)->
          thing && (@toggledSlides[if typeof thing == 'string' then thing else thing._id] || @isToggled @data.parent thing)
        removeToggles: -> @toggledSlides = {}
        hideSlide: (id)-> @hiddenSlides[id] = true
        showSlide: (id)-> delete @hiddenSlides[id]
        showAllSlides: -> @hiddenSlides = {}
        isHidden: (thing)->
          thing && (@hiddenSlides[if typeof thing == 'string' then thing else thing._id] || @isHidden @data.parent thing)
        setEditor: (ed)->
          super ed
          @setMode @mode
        setMode: (@mode)->
          @editor?.node.attr 'data-edit-mode', @mode.name
          this
        setPrefix: (prefix)->
          @idPrefix = prefix
          @idPattern = new RegExp "^#{prefix}(.*)$"
        nodeForId: (id)-> $("##{@idPrefix}#{id}")
        idForNode: (node)-> node.id.match(@idPattern)?[1]
        parseBlocks: (text)-> @data.parseBlocks text
        renderBlock: (block)->
          if !(@isHidden block) then @mode.render this, block, @idPrefix
          else ['', block.next]

`change(changes)` -- about to change the data; compute some effects immediately.

        change: (changes)->
          computedProperties = {}
          changedProperties = []
          for id, change of changes.sets
            oldBlock = @getBlock change._id
            if @checkPropertyChange changes, change, oldBlock
              changedProperties.push change._id
            @checkCodeChange changes, change, oldBlock
          @data.linkAllSiblings changes
          for change in changedProperties
            parent = @data.parent(change, changes)._id
            if !computedProperties[parent]
              computedProperties[parent] = true
              props = {}
              for child in @data.children parent, changes
                props = _.merge props, child.properties
              addChange(@data.getBlock(parent, changes), changes).properties = props
          super changes
        checkPropertyChange: (changes, change, oldBlock)->
          change.type == 'chunk' && !_.isEqual change.properties, @getBlock(change._id)?.properties
        checkCodeChange: (changes, change, oldBlock)->
          if change.type == 'code' && isDynamic(change) && envM = blockEnvMaker(change)
            {source: newSource, results: newResults} = blockCodeItems this, change
            hasChange = !oldBlock || oldBlock.type != 'code' || oldBlock.codeAttributes.results != 'dynamic' || if oldBlock
              oldSource = blockSource oldBlock
              newSource.content != oldSource.content
            if hasChange
              result = ''
              newBlock = setError change
              sync = true
              env = envM __proto__: defaultEnv
              opts = this
              do (change)->
                env.errorAt = (offset, msg)->
                  newBlock = setError change, offset, msg
                  if newBlock != change && !sync
                    opts.change
                      first: opts.data.getFirst()
                      removes: {}
                      sets: change._id, newBlock
                env.write = (str)->
                  #result += ': ' + (if str instanceof Html then str.content else escapeHtml String(str).replace(/\r?\n/g, '\n: ')) + '\n'
                  result += str
                  if !sync
                    newBlock = setResult change, str
                    opts.change
                      first: opts.data.getFirst()
                      removes: {}
                      sets: change._id, newBlock
              env.executeText newSource.content, Nil, ->
              newBlock = setResult newBlock, result
              changes.sets[newBlock._id] = newBlock
              for block, i in changes.newBlocks
                if block._id == newBlock._id then changes.newBlocks[i] = newBlock
              sync = false

      setResult = (block, result)->
        {results} = blockCodeItems this, block
        if !results && (!result? || result == '') then block
        else
          newBlock = copyBlock block
          text = if !result? || result == ''
            block.text.substring(0, results.offset) + block.text.substring(results.offset + results.text.length)
          else if results
            block.text.substring(0, results.offset + results.contentPos) + result + block.text.substring(results.offset + results.text.length)
          else block.text + "#+RESULTS:\n#{result}"
          [tmp] = orgDoc parseOrgMode text.replace /\r\n/g, '\n'
          for prop, value of tmp
            newBlock[prop] = value
          newBlock

      setError = (block, offset, msg)->
        {error, results} = blockCodeItems this, block
        if !offset? && !error then block
        else
          newBlock = copyBlock block
          msg = if msg then msg.trim() + "\n"
          err = "#+ERROR: #{offset}, #{msg}"
          text = if error
            if !offset?
              block.text.substring(0, error.offset) + block.text.substring(error.offset + error.text.length)
            else
              block.text.substring(0, error.offset) + err + block.text.substring(error.offset + error.text.length)
          else if results
            block.text.substring(0, results.offset) + err + block.text.substring(results.offset)
          else block.text + err
          [tmp] = orgDoc parseOrgMode text.replace /\r\n/g, '\n'
          for prop, value of tmp
            newBlock[prop] = value
          newBlock

      isDynamic = (block)-> block.codeAttributes?.results == 'dynamic'

      blockEnvMaker = (block)-> languageEnvMaker block.language

      createBlockEnv = (block, envMaker)->

      blockCodeItems = (data, block)->
        if block?.type == 'code'
          org = blockOrg data, block
          if org instanceof Fragment || org instanceof Headline then org = org.children[0]
          getCodeItems org
        else {}

      plainMode =
        name: 'plain'
        render: (opts, block, prefix)->
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
          ["<span #{attrs}>#{text}</span>", block.next]
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

      hideSlide = (slideDom)->
        if editor = findEditor slideDom
          editor.options.hideSlide slideDom[0].id
          slideDom.remove()

      toggleSlideMode = (slideDom)->
        if opts = findEditor(slideDom)?.options
          block = opts.getBlock opts.idForNode slideDom[0]
          opts.toggleSlide block._id
          blockHtml = opts.renderBlock(opts.getBlock block)[0]
          preserveSelection -> slideDom.closest('[data-view]').replaceWith $(blockHtml)
          initializePendingViews()

      Handlebars.registerHelper 'render', (block)->
        fancyMode.render(UI.context.opts, block, UI.context.prefix)[0]

      Handlebars.registerHelper 'renderPlain', (data)->
        text = ''
        block = UI.context.opts.data.getBlock data.blockId
        end = UI.context.opts.data.nextRight block
        while block && block._id != end
          [plainText, next] = plainMode.render UI.context.opts, block, UI.context.prefix
          text += plainText
          block = UI.context.opts.data.getBlock next
        text

      Handlebars.registerHelper 'sourceHeader', (src)->
        src.text.substring 0, src.contentPos

      Handlebars.registerHelper 'sourceBoiler', (src)->
        src.text.substring 0, src.infoPos

      Handlebars.registerHelper 'sourceInfo', (src)->
        src.text.substring(src.infoPos, src.contentPos)

      Handlebars.registerHelper 'sourceFooter', (src)->
        src.text.substring(src.contentPos + src.content.length)

      Handlebars.registerHelper 'resultsHeader', (res)->
        res.text.substring(0, res.contentPos)

      Handlebars.registerHelper 'resultsContents', (res)->
        resultsArea res.text.substring res.contentPos

      fancyMode =
        name: 'fancy'
        render: (opts, block, prefix)->
          mergeContext {}, =>
            UI.context.opts = opts
            UI.context.prefix = prefix
            if !block || block.properties?.hidden then ['', opts.data.nextRight block]
            else if block.type == 'headline' then @renderHeadline opts, block, prefix
            else if block.type == 'chunk' then @renderChunk opts, block, prefix
            else if block.type == 'code' then @renderCode opts, block, prefix
            else plainMode.render opts, block, prefix
        renderView: (type, ctx, next, data)-> [renderView(type, ctx, data), next]
        renderHeadline: (opts, block, prefix)->
          next = opts.data.nextRight(block)?._id
          viewName = if block.type == 'headline' && block.level == 1 && opts.isToggled block
            UI.context.viewAttrs = _.merge {class: 'plain'}, UI.context.viewAttrs ? {}
            'leisure-headline-plain'
          else 'leisure-headline'
          if hasView viewName
            m = block.text.match headlineRE
            #console.log "headline view: #{block.text}"
            @renderView viewName, null, next,
              id: prefix + block._id
              blockId: block._id
              EOL: '\n'
              topLevel: block.level == 1
              level: block.level
              stars: m[HL_LEVEL].trim()
              maintext: block.text.substring m[HL_LEVEL].length
              children: opts.data.children block
          else
            text = "<span id='#{prefix}#{block._id}' data-block='#{block.type}'>"
            text += escapeHtml block.text
            id = block.next
            while id && id != next
              [nextText, id] = @render opts, opts.data.getBlock(id), prefix
              text += nextText
            [text + "</span>", next]
        renderChunk: (opts, block, prefix)->
          if hasView 'leisure-chunk'
            @renderView 'leisure-chunk', null, block.next,
              id: prefix + block._id
              text: @renderOrg blockOrg opts.data, block
              EOL: '\n'
          else @renderOrgBlock opts, block, prefix
        renderCode: (opts, block, prefix)->
          viewKey = "leisure-code"
          if hasView viewKey, block.language
            org = blockOrg opts.data, block
            {source, results} = getCodeItems org.children?[0] ? org
            # this argument object to renderView is total overkill
            @renderView viewKey, block.language, block.next,
              id: prefix + block._id
              language: block.language
              text: @renderCodeOrg block.language, org, block
              header: block.text.substring 0, block.codePrelen
              source: blockSource block
              sourceOrg: source
              footer: block.text.substring block.text.length - block.codePostlen, source.end()
              inter: if results then block.text.substring source.end(), results?.offset else block.text.substring source.end()
              results: if results then resultsArea block.text.substring results.offset, results.end() else ''
              resultsContent: if results then resultsArea results.text.substring results.contentPos else ''
          else plainMode.render opts, block, prefix
        renderOrgBlock: (opts, block, prefix)->
          text = @renderOrg blockOrg opts.data, block
          ["<span id='#{block._id}'>#{text}</span>", block.next]
        renderCodeOrg: (language, org, block)->
          {name, source, error, results} = getCodeItems org.children?[0] ? org
          allText = org.allText()
          text = ''
          pos = 0
          ctx = allText: allText, language: language
          [pos, text] = @renderCodeSegment 'name', name, allText, language, pos, text, block
          [pos, text] = @renderCodeSegment 'source', source, allText, language, pos, text, block
          [pos, text] = @renderCodeSegment 'error', error, allText, language, pos, text, block
          [pos, text] = @renderCodeSegment 'results', results, allText, language, pos, text, block
          if pos < allText.length then text += escapeHtml allText.substring pos
          text
        renderCodeSegment: (name, org, allText, language, pos, text, block)->
          if org
            if hasView key = "leisure-code-#{name}", language
              if org.offset > pos
                text += escapeHtml allText.substring pos, org.offset
              text += (@renderView key, language, null, _.merge {block: block}, org)[0]
              [org.end(), text]
            else if name == 'results'
              [org.end(), resultsArea org.allText()]
            else [pos, text]
          else [pos, text]
        renderOrg: (org)->
          if org instanceof SimpleMarkup then @renderSimple org
          else if org instanceof Link then @renderLink org
          else if org instanceof Fragment
            (@renderOrg child for child in org.children).join ''
          else org.allText()
        renderLink: (org)->
          if false && leisureMatch = org.isLeisure()
            #viewName = if leisureMatch[2] then " data-view-name='#{leisureMatch[2]}'" else ''
            #"<span data-view-link='#{leisureMatch[1]}'#{viewName}><span class='hidden'>#{org.allText()}</span></span>"
          else if org.isImage()
            title = (if desc = org.descriptionText() then " title='#{escapeHtml desc}'" else "")
            "<img src='#{escapeHtml org.path}'#{title}><span class='hidden'>#{escapeHtml org.allText()}</span>"
          else
            guts = @renderMeat
            for c in org.children
              guts += @renderMeat c, true
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
        "<span class='hidden'>#{goodText results}</span><span data-noncontent>#{results.replace /^(: )(.*\n)/gm, (m, g1, g2)-> goodHtml(g2)}</span>"

      createLocalData = -> new OrgData()

      plainEditDiv = (div, data)->
        $(div).addClass 'plain'
        new LeisureEditCore $(div), new OrgEditing data

      fancyEditDiv = (div, data)->
        new LeisureEditCore $(div), new OrgEditing(data).setMode fancyMode

      monitorSelectionChange = ->
        $(document).on 'selectionchange', updateSelection
        $(window).on 'scroll', updateSelection
        $(window).on 'blur focus', (e)->
          selectionActive = (e.type == 'focus')
          updateSelection()

      installSelectionMenu = ->
        $(document.body)
          .append "<div id='selectionBubble' contenteditable='false'></div>"
          .append "<div id='topCaretBox' contenteditable='false'></div>"
          .append "<div id='bottomCaretBox' contenteditable='false'></div>"
        $("#selectionBubble")
          .html selectionMenu
          .on 'mouseenter', -> configureMenu $("#selectionBubble ul")
        $("#selectionBubble ul").menu select: (event, ui)-> console.log "MENU SELECT"; false
        monitorSelectionChange()
    
      selectionMenu = """
      <div>
      <ul>
        <li name='insert'><a href='javascript:void(0)'><span>Insert</span></a>
          <ul>
            <li><a href='javascript:void(0)'><span>Leisure</span></a></li>
            <li><a href='javascript:void(0)'><span>YAML</span></a></li>
            <li><a href='javascript:void(0)'><span>HTML</span></a></li>
            <li><a href='javascript:void(0)'><span>CoffeeScript</span></a></li>
            <li><a href='javascript:void(0)'><span>JavaScript</span></a></li>
          </ul>
        </li>
      </ul>
      </div>
      """
      
      configureMenu = (menu)->
        console.log "configure menu"
        #if getSelection().type == 'Caret'
        #  [el] = blockElementsForSelection()
        #  bl = getBlock el.id
        #  if bl?.type == 'chunk'
        #    return menu.find("[name='insert']").removeClass 'ui-state-disabled'
        #menu.find("[name='insert']").addClass 'ui-state-disabled'
      
      throttledUpdateSelection = _.throttle (-> actualSelectionUpdate()), 30,
        leading: true
        trailing: true
      
      updateSelection = ->
        #console.log "updating selection...", new Error('trace').stack
        throttledUpdateSelection()
    
      actualSelectionUpdate = ->
        if selectionActive
          if editor = findEditor getSelection().focusNode
            c = editor.domCursorForCaret()
            if !c.isEmpty() && (p = c.textPosition()) && isContentEditable c.node
              left = p.left
              top = p.top
              bubble = $("#selectionBubble")[0]
              bubble.style.left = "#{left}px"
              bubble.style.top = "#{top - bubble.offsetHeight}px"
              $(document.body).addClass 'selection'
              editor.trigger 'selection'
              return
        $(document.body).removeClass 'selection'
        editor?.trigger 'selection'

      isContentEditable = (node)->
        (if node instanceof Element then node else node.parentElement).isContentEditable

      followLink = (e)-> console.log "Click link", e

Exports

      mergeExports {
        findEditor
        hideSlide
        toggleSlideMode
        followLink
      }

      {
        createLocalData
        plainEditDiv
        fancyEditDiv
        OrgData
        installSelectionMenu
        blockOrg
        setResult
        setError
      }
