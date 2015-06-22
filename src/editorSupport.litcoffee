Editing support for Leisure

This file customizes the editor so it can handle Leisure files.  Here is the Leisure
block structure:  ![Block structure](private/doc/blockStructure.png)

    console.log "defining editor support"

    define ['cs!base', 'cs!org', 'cs!docOrg.litcoffee', 'cs!ast', 'cs!eval.litcoffee', 'cs!editor.litcoffee', 'lib/lodash.min', 'jquery'], (Base, Org, DocOrg, Ast, Eval, Editor, _, $)->

      console.log "loading editor support"

      {
        defaultEnv
      } = Base
      {
        parseOrgMode
        Fragment
        Nil
      } = Org
      {
        orgDoc
        getCodeItems
      } = DocOrg
      {
        Nil
      } = Ast
      {
        languageEnvMaker
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
      } = Editor

      selectionActive = true

OrgData is the basic data storage class.  Subclasses can change how the
editor accesses blocks of text (local, meteor, etc.)

      blockOrg = (blockOrText)->
        text = if typeof blockOrText == 'string' then blockOrText else blockOrText.text
        org = parseOrgMode text
        if org.children.length > 1 then org = new Fragment org.offset, org.children
        org.linkNodes()
        org

      class OrgData extends DataStore
        getBlock: (thing)-> if typeof thing == 'string' then super thing else thing
        load: (first, blocks)->
          if first then linkAllSiblings first, blocks, sets: {}, old: {}
          super first, blocks
        parseBlocks: (text)->
          if text == '' then []
          else orgDoc parseOrgMode text.replace /\r\n/g, '\n'
        nextSibling: (thing)-> @getBlock @getBlock(thing).nextSibling
        previousSibling: (thing)-> @getBlock @getBlock(thing).previousSibling
        reducePreviousSiblings: (thing, func, arg)->
          greduce @getBlock(thing), func, arg, (b)=> @getBlock b.previousSibling
        reduceNextSiblings: (thing, func, arg)->
          greduce @getBlock(thing), func, arg, (b)=> @getBlock b.nextSibling
        lastSibling: (thing)-> @reduceNextSiblings thing, ((x, y)-> y), null
        firstSibling: (thing)-> @reducePreviousSiblings thing, ((x, y)-> y), null
        parent: (thing)-> @getBlock @firstSibling(thing)?.prev
        firstChild: (thing)->
          if (block = @getBlock thing) && (n = @getBlock block.next) && !n.previousSibling
            n
        lastChild: (thing)-> @lastSibling @firstChild thing
        children: (thing)->
          c = []
          @reduceNextSiblings @firstChild(thing), ((x, y)-> c.push y), null
          c

makeChange({removes, sets, first, oldBlocks, newBlocks}): at this point, brute-force recompute all links.  This does compute the minimal block changes, but linkAllSiblings traverses all of the blocks to do it.  Needs to do less work to handle a massive amount of nodes.

        makeChange: (changes)->
          changes = super changes
          linkAllSiblings @first, @blocks, changes
          changes

      greduce = (thing, func, arg, next)->
        if thing && typeof arg == 'undefined'
          arg = thing
          thing = next thing
        while thing
          arg = func arg, thing
          thing = next thing
        arg

      getId = (thing)-> if typeof thing == 'string' then thing else thing._id

      linkAllSiblings = (first, blocks, changes)->
        change = (block)->
          if !changes.old[block._id] then changes.old[block._id] = copy block
          changes.sets[block._id] = block
        parentStack = ['TOP']
        siblingStack = [null]
        emptyNexts = {}
        cur = blocks[first]
        while cur
          if cur.nextSibling then emptyNexts[cur._id] = cur
          curParent = blocks[last parentStack]
          if cur.type == 'headline'
            while curParent && cur.level <= curParent.level
              parentStack.pop()
              siblingStack.pop()
              curParent = blocks[last parentStack]
          if previousSibling = last siblingStack
            delete emptyNexts[previousSibling]
            if (prev = blocks[previousSibling]).nextSibling != cur._id
              change(prev).nextSibling = cur._id
            if cur.previousSibling != previousSibling
              change(cur).previousSibling = previousSibling
          else if cur.previousSibling
            delete change(cur).previousSibling
          siblingStack[siblingStack.length - 1] = cur._id
          if cur.type == 'headline'
            parentStack.push cur._id
            siblingStack.push null
          cur = blocks[cur.next]
        for id, block of emptyNexts
          delete change(block).nextSibling

      class OrgEditing extends DataStoreEditingOptions
        constructor: (data)->
          super data
          data.on 'load', => setHtml @editor.node[0], @renderBlocks()
        blockLineFor: (node, offset)->
          {block, offset} = @editor.blockOffset node, offset
          @blockLine block, offset
        blockLine: (block, offset)->
          text = block.text.substring(0, offset)
          lines = text.split('\n')
          line: lines.length
          col: last(lines).length
        change: (changes)->
          for id, change of changes.sets
            if change.type == 'code' && isDynamic(change) && envM = blockEnvMaker(change)
              {source: newSource, results: newResults} = blockCodeItems change
              oldBlock = @getBlock change._id
              hasChange = !oldBlock || oldBlock.type != 'code' || oldBlock.codeAttributes.results != 'dynamic' || if oldBlock
                {source: oldSource} = blockCodeItems oldBlock
                newSource.content != oldSource.content
              if hasChange
                if !newResults then console.log "insert new result for #{newSource.content}"
                else
                  console.log "update result for #{newSource.content}"
                result = ''
                sync = true
                env = envM __proto__: defaultEnv
                env.write = (str)->
                  if sync then result += str + '\n'
                  else
                    console.log "NEW ASYNC RESULT: #{str}"
                env.executeText newSource.content, Nil, ->
                console.log "CODE RESULTS: #{result}"
                sync = false
          super changes

      isDynamic = (block)-> block.codeAttributes?.results == 'dynamic'

      blockEnvMaker = (block)-> languageEnvMaker block.language

      createBlockEnv = (block, envMaker)->
      

      blockCodeItems = (block)->
        if block
          org = blockOrg block
          if org instanceof Fragment then org = org.children[0]
          getCodeItems org

      class PlainEditing extends OrgEditing
        nodeForId: (id)-> $("#plain-#{id}")
        idForNode: (node)-> node.id.match(/^plain-(.*)$/)?[1]
        parseBlocks: (text)-> @data.parseBlocks text
        renderBlock: (block)-> ["<span id='plain-#{block._id}' data-block='#{block.type}'>#{escapeHtml block.text}</span>", block.next]

      class FancyEditing extends OrgEditing
        changed: (changes)->
          rendered = {}
          for id, block of changes.removes
            @removeBlock block
          for block in changes.newBlocks
            rendered[block._id] = true
            @updateBlock block, changes.old[block._id]
          for id, block of changes.sets
            if !rendered[id] then @updateBlock block, changes.old[block._id]
        nodeForId: (id)-> id && $("#fancy-#{getId id}")
        idForNode: (node)-> node.id.match(/^fancy-(.*)$/)?[1]
        parseBlocks: (text)-> @data.parseBlocks text
        removeBlock: (block)->
          if (node = @nodeForId block._id).length
            if block.type == 'headline'
              content = node.children().filter('[data-content]')
              content.children().filter('[data-block]').insertAfter(node)
            node.remove()
        updateBlock: (block, old)->
          if (node = @nodeForId block._id).length
            content = node.children().filter('[data-content]')
            if block.type != old?.type || block.nextSibling != old?.nextSibling || block.previousSibling != old?.previousSibling || block.prev != old?.prev
              if block.type != 'headline' && old.type == 'headline'
                content.children().filter('[data-block]').insertAfter(node)
              @insertUpdateNode block, node
            if block.text != old?.text
              if node.is '[data-headline]'
                content.children().filter('[data-block]').insertAfter(node)
              [html] = @renderBlock block, true
              node = $(setHtml node[0], html, true)
              content = node.children().filter('[data-content]')
              if block.type == 'headline'
                for child in @data.children block
                  content.append @nodeForId child._id
          else
            node = $("<div></div>")
            @insertUpdateNode block, node
            [html] = @renderBlock block, true
            setHtml node[0], html, true
        insertUpdateNode: (block, node)->
          if (prev = @nodeForId @data.previousSibling block)?.length then prev.after node
          else if !block.prev then @editor.node.prepend(node)
          else if !block.previousSibling && (parentNode = @nodeForId(block.prev))?.is("[data-headline]")
            parentNode.children().filter("[data-content]").children().first().after node
          else if (next = @nodeForId @data.nextSibling block)?.length then next.before node
          else @editor.node.append(node)
        renderBlock: (block, skipChildren)->
          html = if block.type == 'headline'
            "<div #{blockAttrs block} contenteditable='false'>#{blockLabel block}<div contenteditable='true' data-content>#{contentSpan block.text, 'text'}#{if !skipChildren then (@renderBlock(child)[0] for child in @data.children(block) ? []).join '' else ''}</div></div>"
          else if block.type == 'code'
            "<span #{blockAttrs block}>#{blockLabel block}#{escapeHtml block.text}</span>"
          else "<span #{blockAttrs block}>#{blockLabel block}#{escapeHtml block.text}</span>"
          [html, @data.nextSibling(block)?._id || !@data.firstChild(block) && block.next]

      blockLabel = (block)->
        "<span class='blockLabel' contenteditable='false' data-noncontent>[#{block.type} #{block._id}]</span>"

      blockAttrs = (block)->
        extra = ''
        if block.type == 'headline' then extra += " data-headline='#{escapeAttr block.level}'"
        "id='fancy-#{escapeAttr block._id}' data-block='#{escapeAttr block._id}' data-type='#{escapeAttr block.type}'#{extra}"

      contentSpan = (str, type)->
        str = escapeHtml str
        if str then "<span#{if type then " data-org-type='#{escapeAttr type}'" else ''}>#{str}</span>" else ''

      escapeAttr = (str)->
        if typeof str == 'string' then str.replace /['"&]/g, (c)->
          switch c
            when '"' then '&quot;'
            when "'" then '&#39;'
            when '&' then '&amp;'
        else str

      createLocalData = -> new OrgData()

      plainEditDiv = (div, data)->
        $(div).addClass 'plain'
        new LeisureEditCore $(div), new PlainEditing data

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
              return
        $(document.body).removeClass 'selection'

      isContentEditable = (node)->
        (if node instanceof Element then node else node.parentElement).isContentEditable

      createLocalData: createLocalData
      plainEditDiv: plainEditDiv
      OrgData: OrgData
      installSelectionMenu: installSelectionMenu
      blockOrg: blockOrg
