Editing support for Leisure

This file customizes the editor so it can handle Leisure files.  Here is the Leisure
block structure:  ![Block structure](private/doc/blockStructure.png)

    define ['cs!./base', 'cs!./org', 'cs!./docOrg.litcoffee', 'cs!./ast', 'cs!./eval.litcoffee', 'cs!./editor.litcoffee', 'lib/lodash.min', 'jquery', 'handlebars'], (Base, Org, DocOrg, Ast, Eval, Editor, _, $, Handlebars)->

      {
        defaultEnv
      } = Base
      {
        parseOrgMode
        Fragment
        Headline
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
        Html
        escapeHtml
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
      } = Editor
      {
        HandlebarsEnvironment
        escapeExpression
      } = Handlebars

      selectionActive = true

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
        getBlock: (thing, changes)->
          if typeof thing == 'string' then changes?.sets[thing] ? super(thing) else thing
        load: (first, blocks)->
          if !first then super first, blocks
          else
            changes = sets: blocks, oldBlocks: {}, first: first
            @linkAllSiblings changes
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
          data.on 'load', => setHtml @editor.node[0], @renderBlocks()
          @setPrefix 'leisureBlock-'
          @setMode plainMode
        setMode: (@mode)-> this
        setPrefix: (prefix)->
          @idPrefix = prefix
          @idPattern = new RegExp "^#{prefix}(.*)$"
        nodeForId: (id)-> $("##{@idPrefix}#{id}")
        idForNode: (node)-> node.id.match(@idPattern)?[1]
        parseBlocks: (text)-> @data.parseBlocks text
        renderBlock: (block)-> @mode.render @data, block, @idPrefix

`change(changes)` -- about to change the data; compute some effects immediately.

        change: (changes)->
          computedProperties = {}
          changedProperties = []
          for id, change of changes.sets
            if @checkPropertyChange changes, change then changedProperties.push change._id
            else @checkCodeChange changes, change
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
        checkPropertyChange: (changes, change)->
          change.type == 'chunk' && !_.isEqual change.properties, @getBlock(change._id)?.properties
        checkCodeChange: (changes, change)->
          if change.type == 'code' && isDynamic(change) && envM = blockEnvMaker(change)
            {source: newSource, results: newResults} = blockCodeItems this, change
            oldBlock = @getBlock change._id
            hasChange = !oldBlock || oldBlock.type != 'code' || oldBlock.codeAttributes.results != 'dynamic' || if oldBlock
              {source: oldSource} = blockCodeItems this, oldBlock
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
                  result += ': ' + (if str instanceof Html then str.content else escapeHtml String(str).replace(/\r?\n/g, '\n: ') + '\n')
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
        render: (data, block, prefix)->
          {source, error, results} = blockCodeItems this, block
          text = "<span id='#{prefix}#{block._id}' data-block='#{block.type}'>"
          if !results && !error then text += "#{escapeHtml block.text}"
          else
            if !error then text += block.text.substring(0, results?.offset ? block.text.length)
            else
              pos = source.offset + source.contentPos + Number(error.info.match(/([^,]*),/)[1]) - 1
              text += escapeHtml(block.text.substring(0, pos)) + "<span class='errorMark' contenteditable='false' data-noncontent>✖</span>" + escapeHtml(block.text.substring(pos, results?.offset ? block.text.length))
            if results? then text += "#{results?.text ? ''}#{escapeHtml block.text.substring(results.offset + results.text.length)}"
          [text + "</span>", block.next]

      fancyMode =
        render: (data, block, prefix)->
          if !block || block.properties?.hidden then ['', data.nextRight block]
          else if block.type == 'headline'
            text = "<div class='headline'>#{plainMode.render(data, block, prefix)[0]}"
            next = data.nextRight(block)?._id
            id = block.next
            while id && id != next
              [nextText, id] = @render data, data.getBlock(id), prefix
              text += nextText
            [text + "</div>", next]
          else plainMode.render data, block, prefix

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
              return
        $(document.body).removeClass 'selection'

      isContentEditable = (node)->
        (if node instanceof Element then node else node.parentElement).isContentEditable

Exports

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
