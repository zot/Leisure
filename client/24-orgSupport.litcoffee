Copyright and license
=====================

Copyright (C) 2013, Bill Burdick, Tiny Concepts: https://github.com/zot/Leisure

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgement in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
Intro
=====

Welcome to the Decent Editor.  This is a tiny library for HTML5 that
tries to help make building editors easier.

Here's an editing principle we use:
-----------------------------------
You should only be able to edit text you can see
i.e. backspace/delete/cut/replace should not delete any hidden text

Code
====

    require '10-namespace'
    {
      getType,
      cons,
      define,
      unescapePresentationHtml,
    } = require '16-ast'
    {
      resolve,
      lazy,
      defaultEnv,
    } = root = module.exports = require '15-base'
    rz = resolve
    lz = lazy
    {
      newConsFrom,
      setValue,
      getValue,
      makeSyncMonad,
      makeHamt,
      _true,
      jsonConvert,
    } = require '17-runtime'
    {
      emptyDOMCursor,
      isCollapsed,
      selectRange,
    } = DOMCursor = root.DOMCursor = window.DOMCursor
    {
      runBlock,
      curOrgDoc,
      crnl,
      docOrg,
      subDoc,
      edited,
      editingWhile,
      getBlock,
      Overrides,
      getItem,
      addItem,
      updateItem,
      removeId,
      isRemoved,
      commitEdits,
      createRenderingComputer,
    } = require '23-collaborate'
    {
      orgDoc,
      getCodeItems,
      lineCodeBlockType,
    } = require '12-docOrg'
    {
      escapeHtml,
      getDeepestActiveElement,
    } = Templating
    amt = require('persistent-hash-trie')
    
    consFrom = newConsFrom
    Nil = rz L_nil
    
    {
      TAB,
      ENTER,
      BS,
      DEL,
      LEFT,
      RIGHT,
      UP,
      DOWN,
      HOME,
      END,
    } = require '21-browserSupport'
    {
      parseOrgMode,
      Headline,
      Fragment,
      Meat,
      Keyword,
      Source,
      Results,
      Drawer,
      SimpleMarkup,
      headlineRE,
      HL_TAGS,
      parseTags,
      matchLine,
    } = require '11-org'
    _ = require 'lodash.min'
    {
      safeLoad,
      dump,
    } = root.yaml
    
    nbsp = new RegExp (String.fromCharCode 160), 'g'
    PAGEUP = 33
    PAGEDOWN = 34
    editDiv = null
    sourceDiv = null
    modifying = false
    idCount = 0
    nodes = {}
    reparseListeners = []
    savingPosition = null
    clipboardKey = null
    root.currentMode = null
    parentSpec = null
    sourceSpec = null
    fs = null
    hideSaveButton = true
    selectionActive = true
    movementGoal = null
    specialKeys = {}
    specialKeys[TAB] = 'TAB'
    specialKeys[ENTER] = 'ENTER'
    specialKeys[BS] = 'BS'
    specialKeys[DEL] = 'DEL'
    specialKeys[LEFT] = 'LEFT'
    specialKeys[RIGHT] = 'RIGHT'
    specialKeys[UP] = 'UP'
    specialKeys[DOWN] = 'DOWN'
    specialKeys[PAGEUP] = 'PAGEUP'
    specialKeys[PAGEDOWN] = 'PAGEDOWN'
    specialKeys[HOME] = 'HOME'
    specialKeys[END] = 'END'
    lastKeys = []
    maxLastKeys = 4
    keyCombos = []
    prevKeybinding = curKeyBinding = null
    root.modCancelled = false
    keyCommands = []
    root.ignoreModCheck = 0
    
    breakPoint = ->
      console.log "break"
    
    replaceNbsp = (txt)-> txt.replace nbsp, ' '
    
    DOMCursor.prototype.filterOrg = -> @addFilter (n)-> !n.hasAttribute('data-nonorg') || 'skip'
    
    DOMCursor.prototype.filterShared = -> @addFilter (n)-> n.hasAttribute('data-shared')
    
    # parentForX is needed for slide editing modes and for multple document editing
    parentForNode = (el)-> $(el).closest('[maindoc]')[0]
    
    parentForBlockId = (id)-> $('[maindoc]')[0]
    
    parentForDocId = (id)-> $('[maindoc]')[0]
    
    nextOrgId = -> 'org-node-' + idCount++
    
    getOrgType = (node)-> node?.getAttribute? 'data-org-type'
    
    initOrg = (parent, source)->
      parentSpec = parent
      sourceSpec = source
      $("<div LeisureOutput contentEditable='false' id='leisure_bar'><button id='leisure_grip' title='x'><i class='fa fa-angle-left'></i><i class='fa fa-angle-right'></i></button>\n<button id='leisure_button' title='x'><i class='fa fa-glass'></i><div></div></button>\n<div id='leisure_rollup'><button id='checkpoint' title='x'><i class='fa fa-cloud-upload'></i> Checkpoint</button><button id='revert' title='x'><i class='fa fa-reply'></i> Revert</button><button id='edit' title='x'><i class='fa fa-edit'></i> Edit</button><button id='saveButton' title='x' download='leisureFile.lorg'><i class='fa fa-save'></i><div></div><a id='saveLink' class='hidden'></a></button><div id='leisure_theme' title='x'><span>Theme: </span>\n  <select id='themeSelect'>\n    <option value='flat'>Flat</option>\n    <option value=steampunk>Steampunk</option>\n   <option value=googie>Googie</option>\n   <option value=cthulhu>Cthulhu</option>\n  <option value=console>Console</option>\n  </select></div>\n<input id='saveFile' class='hidden' type='file' nwsaveas onchange='Leisure.saveFile(this)'></input><button id='hide-show-button' onclick='Leisure.toggleShowHidden()' title='x'><i class='fa fa-eye-slash'></i><div class='hidden'></div><span></span></button><a id='tc' target='_blank' href='http://www.teamcthulhu.com'><button id='team_cthulhu' title='x'><span><img src='images/eldersign.png'>TEAM CTHULHU</span></button></a></div></div><div id='leisure_dummy'></div>")
        .prependTo(document.body)
        .find('#leisure_button').mousedown (e)->
          e.preventDefault()
          root.currentMode.leisureButton()
      applyLeisureTooltips()
      $("<div class='paginators'><button id='prevSlide'><i class='fa fa-caret-left fa-1x'></i><span></span></button><button id='nextSlide'><i class='fa fa-caret-right fa-1x'></i><span></span></button></div>").appendTo(document.body)
      $("#leisure_grip").click (e) -> toggleLeisureBar()
      $("#themeSelect").change (e) ->
        Leisure.setTheme(e.target.value)
      b = $('#saveButton')
      if nwDispatcher?
        $(document.body).addClass 'nw'
        $('#saveFile')[0].parentSpec = parentSpec
        fs = require 'fs'
      b.click ->
        if nwDispatcher? then $('#saveFile').click()
        else
          #console.log "SAVE"
          #console.log encodeURIComponent $(parent)[0].textContent
          #b.attr 'href', "data:text/plain;base64,#{encodeURIComponent btoa $(parent)[0].textContent}"
          console.log "SAVE: data:text/plain,#{encodeURIComponent getOrgText $('[maindoc]').children().first()[0]}"
          ($('#saveLink')
            #.attr 'download', root.currentDocument.leisure.name
            .attr 'href', "data:text/plain,#{encodeURIComponent getOrgText $('[maindoc]').children().first()[0]}")[0].click()
      $('#checkpoint').css 'display', 'none'
      $('#checkpoint').click -> Leisure.snapshot()
      $('#revert').css 'display', 'none'
      $('#revert').click -> root.restorePosition null, -> Leisure.revertAll()
      $('#edit').click -> editFile()
      $('#file').change (evt)->
        files = evt.target.files
        for f in files
          reader = new FileReader()
          reader.onload = (e)-> Meteor.call 'edit', f.name, e.target.result, (err, id)->
            location.hash = "#load=/local/#{f.name}/#{id}"
            location.reload()
          reader.readAsText f
      (root.currentMode = Leisure.fancyOrg).useNode $(parent)[0], source
      Leisure.initStorage '#login', '#panel', root.currentMode
      installSelectionMenu()
      monitorSelectionChange()
      document.addEventListener('cut', cutListener)
      document.addEventListener('copy', copyListener)
      document.addEventListener('paste', pasteListener)
    
    copyListener = (e)->
      clipboardKey = 'copy'
      sel = getSelection()
      if sel.type == 'Range' then replaceClipboardWithSelection e, sel
    
    cutListener = (e)->
      clipboardKey = 'cut'
      sel = getSelection()
      if sel.type == 'Range'
        replaceClipboardWithSelection e, sel
        sel.getRangeAt(0).deleteContents()
        root.orgApi.checkSourceMod()
    
    replaceClipboardWithSelection = (e, sel)->
        e.preventDefault()
        n = document.createElement('div')
        n.appendChild sel.getRangeAt(0).cloneContents()
        e.clipboardData.setData 'text/html', n.innerHTML
        e.clipboardData.setData 'text/plain', domCursorForSelectedText().getText()
    
    pasteListener = (e)->
      clipboardKey = 'paste'
      e.preventDefault()
      sel = getSelection()
      if sel.type != 'None'
        text = e.clipboardData.getData('text/plain')
        r = sel.getRangeAt 0
        r.deleteContents()
        savedSel = new SelectionDescriptor r
        r.insertNode document.createTextNode text
        r2 = document.createRange()
        r2.setStart r.endContainer, r.endOffset
        r2.setEnd r.endContainer, r.endOffset
        root.orgApi.checkSourceMod()
        savedSel.restore text.length
    
    editFile = -> $('#file')[0].click()
    
    toggleLeisureBar = ->
      g = $("body")
      if g.hasClass 'bar_collapse' then g.removeClass 'bar_collapse' else g.addClass 'bar_collapse'
    
    throttledUpdateSelection = Lodash.throttle (-> actualSelectionUpdate()), 30,
      leading: true
      trailing: true
    
    updateSelection = ->
      #console.log "updating selection...", new Error('trace').stack
      throttledUpdateSelection()
    
    actualSelectionUpdate = ->
      if selectionActive
        c = domCursorForCaret true
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

    installSelectionMenu = ->
      $("#selectionBubble")
        .html selectionMenu
        .on 'mouseenter', -> root.orgApi.configureMenu $("#selectionBubble ul")
      $("#selectionBubble ul").menu select: (event, ui)-> console.log "MENU SELECT"; false
    
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
      if getSelection().type == 'Caret'
        [el] = blockElementsForSelection()
        bl = getBlock el.id
        if bl?.type == 'chunk'
          return menu.find("[name='insert']").removeClass 'ui-state-disabled'
      menu.find("[name='insert']").addClass 'ui-state-disabled'
    
    monitorSelectionChange = ->
      $(document).on 'selectionchange', updateSelection
      $(window).on 'scroll', updateSelection
      $(window).on 'blur focus', (e)->
        selectionActive = (e.type == 'focus')
        updateSelection()
    
    toggleShowHidden = ->
      body = $(document.body)
      body.toggleClass 'show-hidden'
      applyShowHidden()
    
    applyLeisureTooltips = ->
      $('#leisure_grip').tooltip(content: 'Toggle the Leisure bar on/off')
      $('#leisure_button').tooltip(content: 'Cycle through different display modes')
      $('#checkpoint').tooltip(content: 'Checkpoint on server')
      $('#revert').tooltip(content: 'Revert document to last checkpoint on server')
      $('#edit').tooltip(content: 'Collaboratively edit a local file (just send someone the URL)')
      $('#saveButton').tooltip(content: 'Download and save a local copy')
      $('#leisure_theme').tooltip(content: 'Select a visual theme')
      $('#team_cthulhu').tooltip(content: 'Homepage for the Leisure development team')
      $('#hide-show-button').tooltip(content: 'Click to show hidden slides')
    
    applyShowHidden = ->
      if $(document.body).hasClass 'show-hidden'
        $('#hide-show-button').tooltip().tooltip('option', 'content', 'Click to stop showing hidden slides')
        $('#hide-show-button i').addClass('fa-eye').removeClass('fa-eye-slash')
        $('#hide-show-button span').addClass('hidden')
        $('#hide-show-button div').removeClass('hidden')
      else
        $('#hide-show-button').tooltip().tooltip('option', 'content', 'Click to show hidden slides')
        $('#hide-show-button i').addClass('fa-eye-slash').removeClass('fa-eye')
        $('#hide-show-button div').addClass('hidden')
        $('#hide-show-button span').removeClass('hidden')
      root.orgApi.applyShowHidden()
      actualSelectionUpdate()
    
    saveFile = (fileInput)->
      if file = fileInput.files[0]
        fileInput.files.clear()
        fs.writeFile file.path, $(fileInput.parentSpec).text(), (err)->
          if err then alert("Error saving file #{file.path}: #{err}")
    
    splitLines = (str)->
      result = []
      pos = 0
      while pos < str.length
        nl = str.indexOf '\n', pos
        if nl == -1
          result.push (str.substring pos) + '\n'
          break
        else result.push str.substring pos, nl + 1
        pos = nl + 1
      result
    
    slideColumn = (domCur)->
      if !domCur.hlOff
        domCur.hlOff = $(domCur.node).closest("[data-org-headline='1']")[0].getClientRects()[0].left
      domCur.textPosition().left - domCur.hlOff
    
    moveSelectionForward = -> showCaret moveForward()
    
    moveSelectionDown = -> showCaret moveDown()
    
    moveSelectionBackward = -> showCaret moveBackward()
    
    moveSelectionUp = -> showCaret moveUp()
    
    showCaret = (pos)-> pos.show $("#leisure_bar")[0].getClientRects()[0]
    
    moveForward = ->
      start = pos = domCursorForCaret().firstText().save()
      while !pos.isEmpty() && domCursorForCaret().firstText().equals start
        pos = pos.forwardChar()
        pos.moveCaret()
      pos
    
    moveBackward = ->
      start = pos = domCursorForCaret().firstText().save()
      while !pos.isEmpty() && domCursorForCaret().firstText().equals start
        pos = pos.backwardChar()
        pos.moveCaret()
      pos
    
    moveDown = ->
      linePos = prev = pos = domCursorForCaret().save()
      if !(prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine]) then movementGoal = slideColumn pos
      line = 0
      while !(pos = moveSelectionForward()).isEmpty()
        if linePos.differentLines pos
          line++
          linePos = pos
        if line == 2 then return prev.moveCaret()
        if line == 1 && slideColumn(pos) >= movementGoal
          return moveToBestPosition pos, prev, linePos
        prev = pos
      pos
    
    moveUp = ->
      linePos = prev = pos = domCursorForCaret().save()
      if !(prevKeybinding in [keyFuncs.nextLine, keyFuncs.previousLine]) then movementGoal = slideColumn pos
      line = 0
      while !(pos = moveBackward()).isEmpty()
        if linePos.differentLines pos
          line++
          linePos = pos
        if line == 2 then return prev.moveCaret()
        if line == 1 && slideColumn(pos) <= movementGoal
          return moveToBestPosition pos, prev, linePos
        prev = pos
      pos
    
    # if pos is closer to the goal, return it
    # otherwise move to prev and return prev
    moveToBestPosition = (pos, prev, linePos)->
      if linePos == pos || Math.abs(slideColumn(pos) - movementGoal) < Math.abs(slideColumn(prev) - movementGoal)
        pos
      else prev.moveCaret()
    
    # functions return whether to check for mods
    keyFuncs =
      backwardChar: (e, parent, r)->
        e.preventDefault()
        moveSelectionBackward parent, r
        false
      forwardChar: (e, parent, r)->
        e.preventDefault()
        moveSelectionForward parent, r
        false
      previousLine: (e, parent, r)->
        e.preventDefault()
        moveSelectionUp parent, r
        false
      nextLine: (e, parent, r)->
        e.preventDefault()
        moveSelectionDown parent, r
        false
      swapMarkup: (e, parent, r)->
        e.preventDefault()
        swapMarkup()
        false
      expandTemplate: (e, parent, r)->
        e.preventDefault()
        txt = r.startContainer
        if r.collapsed && txt.nodeType == Node.TEXT_NODE && ((r.startOffset > 2 && txt.data[r.startOffset - 3] == '\n') || (r.startOffset == 2 && followsNewline txt))
          str = txt.data.substring r.startOffset - 2, r.startOffset
          if exp = templateExpansions[str]
            seld = new SelectionDescriptor r.startContainer, r.startOffset - str.length
            start = r.startOffset
            [first, second] = exp
            pos = (getTextPosition parent, txt, start) - 2
            if start == txt.length
              next = null
              txt.data = txt.data.substring 0, txt.length - 2
            else
              next = (if start == 2 then txt else txt.splitText start - 2)
              next.data = next.data.substring 2
            templateText = document.createTextNode first + second
            txt.parentNode.insertBefore templateText, next
            offset = templateText.length
            root.orgApi.checkSourceMod()
            seld.restore offset
            return true
        e.preventDefault()
        root.orgApi.collapseNode()
        false
      save: (e, parent, r)->
        e.preventDefault()
        Leisure.snapshot()
        false
      execute: (e, parent, r)->
        root.orgApi.executeSource parent, getSelection().focusNode
        false
    
    followsNewline = (txt)->
      prev = textNodeBefore parentForNode(txt), txt
      !prev || prev.data[prev.length - 1] == '\n'
    
    templateExpansions =
      '<s': ['#+BEGIN_SRC leisure\n', '\n#+END_SRC']
      '<D': ['#+BEGIN_SRC leisure :results def\n', '\n#+END_SRC']
      '<d': ['#+BEGIN_SRC leisure :results dynamic\n', '\n#+END_SRC']
      '<h': ['#+BEGIN_HTML\n', '\n#+END_HTML']
    
    defaultBindings =
      'C-S': keyFuncs.save
      'UP': keyFuncs.previousLine
      'DOWN': keyFuncs.nextLine
      'LEFT': keyFuncs.backwardChar
      'RIGHT': keyFuncs.forwardChar
      'TAB': keyFuncs.expandTemplate
      'C-C C-C': keyFuncs.swapMarkup
      'M-C': keyFuncs.execute
    
      #'C-F': keyFuncs.forwardChar
      #'C-B': keyFuncs.backwardChar
      #'C-P': keyFuncs.previousLine
      #'C-N': keyFuncs.nextLine
      #'C-X C-F': keyFuncs.save
    
    swapMarkup = ->
      root.currentMode = (if root.currentMode == Leisure.fancyOrg then Leisure.basicOrg else Leisure.fancyOrg)
      root.restorePosition parentSpec, ->
        if root.currentDocument then root.currentMode.useNode $(parentSpec)[0], sourceSpec, docOrg()
        else root.currentMode.useNode $(parentSpec)[0], sourceSpec
    
    markupOrg = (text)->
      [node, result] = markupOrgWithNode text
      result
    
    markupOrgWithNode = (text, note, replace)->
      nodes = {}
      if typeof text == 'string'
        # ensure trailing newline -- contenteditable doesn't like it, otherwise
        if text[text.length - 1] != '\n' then text = text + '\n'
        org = parseOrgMode text
      else if text instanceof Org.Node then org = text
      if org
        markup = markupNode(org, true)
        [org, markup]
      else
        console.log "Attempt to display uknown object type: ", text
        throw new Error "Attempt to display unknown type of object: #{text}"
    
    orgAttrs = (org)->
      if !org.nodeId then org.nodeId = nextOrgId()
      nodes[org.nodeId] = org
      extra = if rt = resultsType org then " data-org-results='#{rt}'"
      else ''
      if noResults org then extra += " data-no-results"
      if org.shared then extra += " data-shared='#{org.shared}' data-nodecount='#{org.nodeCount}'"
      if org.local then extra += " data-local=true"
      t = org.allTags()
      if t.length then extra += " data-org-tags='#{escapeAttr t.join(' ')}'"; global.ORG=org
      if org instanceof Keyword && !(org instanceof Source) && org.next instanceof Source  && org.name?.toLowerCase() == 'name' then extra += " data-org-name='#{escapeAttr org.info}'"
      if org instanceof Headline
        extra += " data-org-headline='#{escapeAttr org.level}'"
        for k of org.properties
          extra += " data-org-properties='#{escapeAttr JSON.stringify org.properties}'"
          break
        for k, v of org.properties
          extra += " data-property-#{k}='#{escapeAttr v.trim()}'"
      #if org instanceof Source && lang = org.lead()?.trim().toLowerCase()
      #  extra += " data-lang='#{lang}'"
      if org.srcId then extra += " data-org-srcid='#{escapeAttr org.srcId}'"
      "id='#{escapeAttr org.nodeId}' data-org-type='#{escapeAttr org.type}'#{extra}"
    
    resultsType = (org)-> org instanceof Source && (org.info.match /:results *([^ ]*)/)?[1].toLowerCase()

    noResults = (org)-> org instanceof Source && org.info.match /:noresults(\s|$)/

    isDynamic = (org)-> resultsType(org) == 'dynamic'
    
    isDef = (org)-> resultsType(org) == 'def'
    
    isNotebook = (org)-> resultsType(org) == 'notebook' || org.info?.match /:(observe|control) /i

    orgSrcAttrs = (org)->
      "data-org-src='#{if isDef org then 'def' else if isDynamic org then 'dynamic' else if isNotebook org then 'notebook' else 'example'}'"
    
    markupNode = (org, start, inFragment)->
      if org instanceof Source || org instanceof Results
        #pos = org.contentPos - 1
        pos = org.contentPos
        text = org.text.substring pos
        if org instanceof Source && org.getLanguage().toLowerCase() == 'yaml'
          data = getBlock (if org.shared then org else org.fragment).nodeId
          if data.yaml?.type then yaml = " data-yaml-type='#{escapeAttr data.yaml.type}'"
          else yaml = ' '
          if org.fragment
            {name} = getCodeItems org.fragment.children[0]
            if name then yaml += " data-yaml-name='#{escapeAttr name.info.trim()}'"
        else yaml = ''
        "<span #{orgAttrs org}#{codeBlockAttrs org, inFragment}#{yaml}><span data-org-type='text'>#{escapeHtml org.text.substring(0, pos)}</span><span #{orgSrcAttrs org}>#{contentSpan text}</span></span>"
      else if org instanceof Headline then "<span #{orgAttrs org}>#{contentSpan org.text, 'text'}#{markupGuts org, checkStart start, org.text}</span>"
      else if org instanceof SimpleMarkup then markupSimple org
      else if org instanceof Fragment then markupFragment org
      else "<span #{orgAttrs org}>#{content org.text}</span>"
    
    markupFragment = (org)->
      if org.shared == 'code'
        {source} = getCodeItems org.children[0]
        if lang = source.getLanguage() then fragAttr = " data-lang='#{lang}'"
      else fragAttr = ''
      "<span #{orgAttrs org}#{fragAttr}>#{(markupNode child, null, true for child in org.children).join ''}</span>"
    
    markupSimple = (org)->
      guts = ''
      for c in org.children
        guts += markupNode c
      t = org.text[0]
      switch org.markupType
        when 'bold' then "<b>#{t}#{guts}#{t}</b>"
        when 'italic' then "<i>#{t}#{guts}#{t}</i>"
        when 'underline' then "<span style='text-decoration: underline'>#{t}#{guts}#{t}</span>"
        when 'strikethrough' then "<span style='text-decoration: line-through'>#{t}#{guts}#{t}</span>"
        when 'code' then "<code>#{t}#{guts}#{t}</code>"
        when 'verbatim' then "<code>#{t}#{guts}#{t}</code>"
    
    codeBlockAttrs = (org, inFragment)->
      if !inFragment && lang = org.getLanguage?() then attrs = " data-lang='#{lang}'"
      else attrs = ''
      while (org = org.prev) instanceof Meat
        if org instanceof Keyword && org.name.match /^name$/i
          return attrs + " data-org-codeblock='#{escapeAttr org.info.trim()}'"
      attrs
    
    checkStart = (start, text)-> start && (!text || text == '\n')
    
    isSourceNode = (node)-> node?.getAttribute?('data-org-type') == 'source'
    
    isDocNode = (node)-> node?.hasAttribute?('maindoc')
    
    markupGuts = (org, start)->
      if !org.children.length then ''
      else
        prev = if start then null else org
        (for c in org.children
          s = start
          start = false
          p = prev
          prev = c
          markupNode(c, s)).join ""
    
    contentSpan = (str, type)->
      str = content str
      if str then "<span#{if type then " data-org-type='#{escapeAttr type}'" else ''}>#{str}</span>" else ''
    
    content = (str)-> escapeHtml str
    
    fixupNodes = (node)->
      for n in $(node).find('[data-org-type="headline"]')
        setTags n
    
    isCollapsibleText = (node)-> node.nodeType == Node.TEXT_NODE && node.parentNode.getAttribute('data-org-type') in ['text', 'meat']
    
    shiftKey = (c)-> 15 < c < 19
    
    modifiers = (e, c)->
      res = specialKeys[c] || String.fromCharCode(c)
      if e.altKey then res = "M-" + res
      if e.ctrlKey then res = "C-" + res
      if e.shiftKey then res = "S-" + res
      res
    
    addKeyPress = (e, c)->
      if notShift = !shiftKey c
        e.leisureShiftkey = true
        lastKeys.push modifiers(e, c)
        while lastKeys.length > maxLastKeys
          lastKeys.shift()
        keyCombos = new Array(maxLastKeys)
        for i in [0...Math.min(lastKeys.length, maxLastKeys)]
          keyCombos[i] = lastKeys[lastKeys.length - i - 1 ... lastKeys.length].join ' '
        keyCombos.reverse()
      notShift
    
    setCurKeyBinding = (f)->
      prevKeybinding = curKeyBinding
      curKeyBinding = f
    
    findKeyBinding = (e, parent, r)->
      for k in keyCombos
        if f = root.currentMode.bindings[k]
          lastKeys = []
          keyCombos = []
          setCurKeyBinding f
          return [true, f e, parent, r]
      setCurKeyBinding null
      [false]
    
    bindContent = (div)->
      fixupNodes div
      div.addEventListener 'drop', (e)-> root.orgApi.handleDrop e
      div.addEventListener 'mousedown', (e)-> setCurKeyBinding null
      div.addEventListener 'mouseup', (e)-> adjustSelection e
      div.addEventListener 'keyup', handleKeyup div
      div.addEventListener 'keydown', (e)->
        root.modCancelled = false
        c = (e.charCode || e.keyCode || e.which)
        if !addKeyPress e, c then return
        s = getSelection()
        r = s.rangeCount > 0 && s.getRangeAt(0)
        root.currentBlockIds = blockIdsForSelection s, r
        el = r.startContainer
        par = el.parentNode
        [bound, checkMod] = findKeyBinding e, div, r
        if bound then root.modCancelled = !checkMod
        else
          root.modCancelled = false
          if c == ENTER then handleInsert e, s, '\n'
          else if c == BS then backspace div, e, s, r, true
          else if c == DEL then del div, e, s, r, true
          else if modifyingKey c, e then handleInsert e, s
    
    ###
    # getEventChar
    # adapted from Vega on StackOverflow
    # http://stackoverflow.com/a/13127566/1026782
    ###
    
    _to_ascii =
      '188': '44'
      '109': '45'
      '190': '46'
      '191': '47'
      '192': '96'
      '220': '92'
      '222': '39'
      '221': '93'
      '219': '91'
      '173': '45'
      '187': '61' #IE Key codes
      '186': '59' #IE Key codes
      '189': '45' #IE Key codes
    
    shiftUps =
      "96": "~"
      "49": "!"
      "50": "@"
      "51": "#"
      "52": "$"
      "53": "%"
      "54": "^"
      "55": "&"
      "56": "*"
      "57": "("
      "48": ")"
      "45": "_"
      "61": "+"
      "91": "{"
      "93": "}"
      "92": "|"
      "59": ":"
      "39": "\""
      "44": "<"
      "46": ">"
      "47": "?"
    
    getEventChar = (e)->
      c = (e.charCode || e.keyCode || e.which)
      # normalize keyCode
      if _to_ascii.hasOwnProperty(c) then c = _to_ascii[c]
      if !e.shiftKey && (c >= 65 && c <= 90) then c = String.fromCharCode(c + 32)
      else if e.shiftKey && shiftUps.hasOwnProperty(c)
        # get shifted keyCode value
        c = shiftUps[c]
      else c = String.fromCharCode(c)
      c
    
    ###
    # end of getEventChar
    ###
    
    handleInsert = (e, s, text)->
      if s.type == 'Caret'
        e.preventDefault()
        holder = $(s.anchorNode).closest('[data-shared]')[0]
        block = getBlock holder.id
        blocks = [block]
        pos = getTextPosition holder, s.anchorNode, s.anchorOffset
        if pos == block.text.length && block.next then blocks.push getBlock block.next
        root.ignoreModCheck = root.ignoreModCheck || 1
        editBlock blocks, pos, pos, (text ? getEventChar e), pos + 1
    
    handleDelete = (e, s, forward, del)->
      e.preventDefault()
      if s.type == 'Caret'
        c = domCursorForCaret().firstText()
        shared = $(c.node).closest('[data-shared]')[0]
        block = getBlock shared.id
        pos = getTextPosition shared, c.node, c.pos
        result = del block.text, pos
        blocks = []
        if !result then root.ignoreModCheck = root.ignoreModCheck || 1
        else
          if result instanceof Array
            [pos, stop] = result
          else
            pos += if forward then 0 else -1
            stop = pos + 1
          if pos < 0
            if blocks.prev
              blocks.push bl = getBlock block.prev
              pos += bl.text.length
              stop += bl.text.length
            else return
          blocks.push block
          if pos == block.text.length - 1 && block.text[block.text.length - 1] == '\n'
            if block.next then blocks.push getBlock block.next
            else return
          editBlock blocks, pos, stop, '', pos
    
    editBlock = (blocks, start, end, newContent, caret)->
      oldText = (block.text for block in blocks).join ''
      newText = oldText.substring(0, start) + newContent + oldText.substring end
      if caret?
        bl = blocks.slice()
        prev = bl[0]
        for i in [0...2]
          if newPrev = getBlock(prev.prev)
            prev = newPrev
            caret += prev.text.length
        shared = $("##{prev._id}")[0]
        saveC = domCursor(shared, 0).firstText()
        save = getTextPosition(shared, saveC.node, saveC.pos) + caret
      editingWhile -> changeStructure blocks, newText
      if caret?
        if shared.ownerDocument.compareDocumentPosition(shared) & Node.DOCUMENT_POSITION_DISCONNECTED
          shared = $("##{prev._id}")[0]
        return domCursorForTextPosition(shared, save).moveCaret()
    
    domCursor = (node, pos)->
      if node instanceof jQuery
        node = node[0]
        pos = pos ? 0
      new DOMCursor(node, pos).filterOrg()
    
    domCursorForText = (node, pos, parent)->
      c = domCursor node, pos
        .filterTextNodes()
        .firstText()
      if parent? then c.filterParent parent else c
    
    adjustSelection = (e)->
      if e.detail == 1 then return
      s = getSelection()
      if s.type == 'Range'
        r = s.getRangeAt 0
        pos = domCursor r.endContainer, r.endOffset
          .mutable()
          .filterVisibleTextNodes()
          .firstText()
        while pos.node != r.startContainer && pos.node.data.trim() == ''
          pos == pos.prev()
        while pos.pos > 0 && pos.node.data[pos.pos - 1] == ' '
          pos.pos--
        if (pos.node != r.startContainer || pos.pos > r.startOffset) && (pos.node != r.endContainer || pos.pos < r.endOffset)
          r.setEnd pos.node, pos.pos
          selectRange r
    
    handleDrop = (e)->
      e.preventDefault()
      t = e.dataTransfer
      r = document.caretRangeFromPoint(e.clientX,e.clientY)
      if 'text/html' in t.types
        item = $(t.getData('text/html'))
        if item.length == 1
          txt = if item.is 'img' then "[[#{item[0].src}]]" else item.text()
          node = document.createTextNode txt
          r.insertNode node
          r.selectNode node
          edited node, true
      selectRange r
      actualSelectionUpdate()
    
    backspace = (parent, event, sel, r, allowBlockCrossing)->
      holder = $(sel.anchorNode).closest('[data-shared]')[0]
      root.currentBlockIds = [(getBlock holder.id)._id]
      handleDelete event, sel, false, (text, pos)-> true
    
    del = (parent, event, sel, r, allowBlockCrossing)->
      holder = $(sel.anchorNode).closest('[data-shared]')[0]
      root.currentBlockIds = [(getBlock holder.id)._id]
      handleDelete event, sel, true, (text, pos)-> true
    
    beforeBlockBorder = (parent, r)->
      t = r.startContainer
      next = textNodeAfter parent, t
      r.collapsed &&
      t.nodeType == Node.TEXT_NODE &&
      r.startOffset == t.length - 1 &&
      next &&
      blockElementForNode(t) != blockElementForNode(next)
    
    afterBlockBorder = (r)->
      t = r.startContainer
      prev = textNodeBefore parentForNode(t), t
      r.collapsed &&
      t.nodeType == Node.TEXT_NODE &&
      r.startOffset == 0 &&
      prev &&
      blockElementForNode(t) != blockElementForNode(prev)
    
    setCaret = (r)->
      sel = getSelection()
      r.collapse true
      selectRange r
      actualSelectionUpdate()
    
    blockElementsForSelection = (sel, r)->
      $("[id='#{id}']") for id in blockIdsForSelection sel, r
    
    blockIdsForSelection = (sel, r)->
      if !sel then sel = getSelection()
      if sel.rangeCount == 1
        if !r then r = sel.getRangeAt 0
        blocks = if shared = $(r.startContainer).closest('[data-shared]')[0]
          [shared.id]
        else []
        if !r?.collapsed
          cur = blocks[0]
          end = $(r.endContainer).closest('[data-shared]')[0].id
          while cur && cur != end
            if cur = (getBlock cur).next
              blocks.push cur
        blocks
    
    blockElementForNode = (node)-> $(node).closest('[data-shared]')[0]
    
    handleKeyup = (div)-> (e)->
      if ignoreModCheck = root.ignoreModCheck then root.ignoreModCheck--
      if clipboardKey || (!e.leisureShiftkey && !root.modCancelled && modifyingKey((e.charCode || e.keyCode || e.which), e))
        root.orgApi.checkSourceMod div, ignoreModCheck
        clipboardKey = null
      runKeyCommands()
    
    runKeyCommands = ->
      for cmd in keyCommands
        cmd()
      keyCommands = []
    
    queueKeyCommand = (cmd)-> keyCommands.push cmd
    
    noFollowingText = (t)->
      next = t.nextSibling
      !(next && next.nodeType == Node.TEXT_NODE)
    
    modifyingKey = (c, e)-> !e.altKey && !e.ctrlKey && (
      (47 < c < 58)          || # number keys
      c == 32 || c == ENTER  || # spacebar and enter
      c == BS || c == DEL    || # backspace and delete
      (64 < c < 91)          || # letter keys
      (95 < c < 112)         || # numpad keys
      (185 < c < 193)        || # ;=,-./` (in order)
      (218 < c < 223)          # [\]' (in order)
      )
    
    lineForRange = (node, offset)->
      lineText = node.data
      lineEnd = -1
      pos = domCursorForText node, 0
      if (lineStart = node.data.substring(0, offset).lastIndexOf '\n') == -1
        while !pos.isEmpty() && lineStart == -1
          if pos = pos.prev()
            lineText = pos.node.data + lineText
            lineStart = pos.node.data.lastIndexOf '\n'
      if !pos.isEmpty()
        nl = pos.node.data.indexOf '\n', offset
        if nl >= offset then lineEnd = nl + lineText.length - pos.node.length
        else
          while !pos.isEmpty() && lineEnd == -1
            if pos = pos.next()
              lineText += pos.node.data
              if (nl = pos.node.data.indexOf '\n') > -1 then lineEnd = nl + lineText.length - pos.node.length
        if lineEnd == -1 then lineEnd = lineText.length
        lineText.substring lineStart + 1, lineEnd
      else ''
    
    currentLine = (parent)->
      s = getSelection()
      if s.type = "Caret" && (r = s.getRangeAt(0)) && r.startContainer.nodeType == Node.TEXT_NODE
        lineForRange r.startContainer, r.startOffset
      else ''
    
    collapseNode = ->
      node = getCollapsible getSelection().focusNode
      if node
        if !isEmptyCollapsible node
          modifying = true
          $(node).toggleClass 'collapsed'
          modifying = false
        else status "EMPTY ENTRY"
    
    checkSourceMod = (div, ignore)->
      if (el = getDeepestActiveElement()) && el.nodeName.match /input/i then return
      if (s = getSelection()).type == 'Caret' && mod = s.getRangeAt(0).startContainer
        bl = $()
        for id in root.currentBlockIds
          bl = bl.add $("##{id}")
        if isLeisureBlock(bl) && bl[0]?.contains(mod) && (node = findOrIs(bl, '[data-org-results]')).attr('data-org-results') in ['dynamic', 'def']
          root.orgApi.executeSource bl[0], mod
        if mod && !ignore then checkStructure mod
    
    isLeisureBlock = (bl)-> bl.is("[data-lang='leisure']") || bl.find("[data-lang='leisure']").length > 0
    
    # Selection should be type Caret, because this should only be called
    # after a textual modification (from typing), which should never preserve a selection
    checkStructure = (node)->
      sel = getSelection()
      if sel.type == 'Caret'
        blockIds = L(root.currentBlockIds).filter((v)-> v).toArray()
        currentBlockId = blockElementForNode(sel.focusNode).id
        if !(currentBlockId in [blockIds[0], blockIds[blockIds.length - 1]])
          if getBlock(blockIds[0])?.prev == currentBlockId then blockIds.unshift currentBlockId
          else if getBlock(L(blockIds).last())?.next == currentBlockId then blockIds.push currentBlockId
          else return console.log "Can't locate current block"
        # blockIds now contains the changed nodes
        if prev = getBlock(blockIds[0]).prev then blockIds.unshift prev
        if next = getBlock(L(blockIds).last()).next then blockIds.push next
        oldBlocks = (getBlock(id) for id in blockIds)
        newBlocks = curOrgDoc (blockText($("##{id}")[0]) for id in blockIds).join ''
        changeStructure oldBlocks, newBlocks
    
    # Change oldBlocks into newBlocks
    # rerender the changed parts of the doc
    changeStructure = (oldBlocks, newBlocks)->
      if typeof newBlocks == 'string' then newBlocks = curOrgDoc newBlocks
      for bl in newBlocks
        bl._id = new Meteor.Collection.ObjectID().toJSONValue()
      overrides = new Overrides()
      checkMerge(overrides, fo = oldBlocks[0], newBlocks[0], getBlock(fo.prev), (aux)->
        aux + newBlocks.shift().text)
      if !_(newBlocks).isEmpty()
        checkMerge(overrides, lo = _(oldBlocks).last(), _(newBlocks).last(), getBlock(lo.next), (aux)->
          newBlocks.pop().text + aux)
      remapBlocks overrides, oldBlocks, newBlocks
      rc = createRenderingComputer overrides
      for id, item of overrides.adds
        rc.add item
      for id of overrides.removes
        rc.remove getBlock id
      for id, item of overrides.updates
        rc.change getBlock(id), item
      commitEdits overrides
      rc.render()
    
    # check whether to merge the new text with the preceding/following old text
    # returns the id of the old block if merge, otherwise the id of the new block
    checkMerge = (overrides, oldBlock, newBlock, auxBlock, func)->
      if newBlock.type == 'chunk' && oldBlock.type != 'chunk' && auxBlock?.type == 'chunk'
        #console.log "update item: #{auxBlock._id}"
        auxBlock.text = func auxBlock.text
        updateItem overrides, auxBlock
        auxBlock._id
      else oldBlock._id
    
    #
    # try to find the best fit for the new blocks
    #
    # Using Adiff, a diff implementation for arrays
    # results are like splice calls [offset, count, item, item, item]
    #
    remapBlocks = (overrides, oldBlocks, newBlocks)->
      oldTypes = (block.type for block in oldBlocks)
      newTypes = (block.type for block in newBlocks)
      prevId = oldBlocks[0].prev
      oldBlocks.reverse()
      newBlocks.reverse()
      offset = 0
      diffs = Adiff.diff oldTypes, newTypes
      #if diffs.length then console.log "Old Structure: [#{oldTypes.join ', '}], new: [#{newTypes.join ', '}]"
      for diff in diffs
        if diff[0] > offset
          #console.log "Update-1 #{diff[0] - offset} items: #{(bl._id for bl in oldBlocks).join ', '}"
          prevId = updateBlocks diff[0] - offset, overrides, oldBlocks, newBlocks, prevId
        offset = diff[0] + diff[1]
        insertCount = diff.length - 2
        deleteCount = diff[1]
        updateCount = Math.min deleteCount, insertCount
        insertCount -= updateCount
        deleteCount -= updateCount
        if updateCount > 0
          #console.log "Update-2 #{updateCount} items: #{(bl._id for bl in oldBlocks).join ', '}"
          prevId = updateBlocks updateCount, overrides, oldBlocks, newBlocks, prevId
        #if deleteCount > 0 then console.log "Delete #{deleteCount} items: #{("#{block._id}: #{block.text}" for block in Lazy(oldBlocks).reverse().take(deleteCount).toArray()).join ', '}"
        for i in [0 ... deleteCount]
          removeId overrides, oldBlocks.pop()._id
        #if insertCount > 0 then console.log "Insert-1 #{insertCount} items: #{("#{bl._id}: #{bl.text}" for bl in Lazy(newBlocks).reverse().take(insertCount).toArray()).join ', '}"
        for i in [0 ... insertCount]
          prevId = insertBlock overrides, newBlocks.pop(), prevId
      #
      # should just be a list of new/old items to update now
      # new/old lists should be the same size
      #
      if oldBlocks.length != newBlocks.length then console.log "WARNING -- inconsistent block count after diff processing"
      prevId = updateBlocks newBlocks.length, overrides, oldBlocks, newBlocks, prevId
    
    updateBlocks = (num, overrides, oldBlocks, newBlocks, prevId)->
      for i in [0 ... num]
        b = oldBlocks.pop()
        n = newBlocks.pop()
        prevId = n._id = b._id
        if n.text != b.text then updateItem overrides, n, true
      prevId
    
    insertBlock = (overrides, newBlock, prevId)->
      addItem overrides, newBlock, prevId
      newBlock._id
    
    escapeAttr = (str)->
      if typeof str == 'string' then str.replace /['"&]/g, (c)->
        switch c
          when '"' then '&quot;'
          when "'" then '&#39;'
          when '&' then '&amp;'
      else str
    
    leisureEnv = (env)->
      env.presentValue = (v)-> rz(L_showHtml) lz v
      env.executeText = (text, props, cont)->
        old = getValue 'parser_funcProps'
        setValue 'parser_funcProps', props
        result = rz(L_baseLoadString)('notebook')(text)
        runMonad result, env, (results)->
          runNextResult results, env, ->
            setValue 'parser_funcProps', old
            cont? env, results
    
    runNextResult = (results, env, cont)->
      while results != L_nil() && getType(results.head().tail()) == 'left'
        env.write "PARSE ERROR: #{getLeft results.head().tail()}"
        results = results.tail()
      if results != L_nil()
        runMonad getRight(results.head().tail()), env, (res2)->
          if getType(res2) != 'unit' then env.write String(env.presentValue res2)
          runNextResult results.tail(), env, cont
      else cont()
    
    jsEnv = (env)->
      env.presentValue = (v)-> if v instanceof Html then v.content else escapeHtml v
      env.executeText = (text, props, cont)->
        try
          @write @presentValue eval text
        catch err
          @write errorDiv err.stack
        finally
          cont? env
    
    unknownLanguageEnv = leisureEnv
    
    class Html
      constructor: (@content)->
    
    Leisure.html = (content)-> new Html content
    
    errorDiv = (err, orgText)-> "<div class='error' contenteditable='false'><span class='hidden'>#{orgText || ''}</span><span data-nonorg='true'>#{escapeHtml err}</span></div>"
    
    installEnvLang = (nodeOrLang, env)->
      switch (if typeof nodeOrLang == 'string' then nodeOrLang else getNodeLang nodeOrLang)
        when 'leisure' then leisureEnv env
        when 'javascript' then jsEnv env
        else unknownLanguageEnv env
    
    defaultEnv.prompt = (msg, cont)-> cont prompt rz msg
    defaultEnv.write = (str)-> console.log str
    defaultEnv.clear = ->
    
    orgEnv = (parent, node)->
      r = getResultsForSource parent, node
      env =
        changed: false
        readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
        writeFile: ->
        newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
        __proto__: defaultEnv
      installEnvLang node, env
      if r
        nodeId = $(node).closest('[data-shared]')[0].id
        env.clear = ->
          getResultsForSource(parent, $("##{nodeId}")[0]).textContent = ''
        env.write = (str)->
          @changed = true
          r = getResultsForSource(parent, $("##{nodeId}")[0])
          r.textContent += ": #{str.replace /\n/g, '\n: '}\n"
      else env.write = (str)-> console.log ": #{str.replace /\n/g, '\n: '}\n"
      env
    
    baseEnv =
      __proto__: defaultEnv
      readFile: (filename, cont)-> window.setTimeout (->$.get filename, (data)-> cont false, data), 1
      write: (str)-> console.log unescapePresentationHtml str
      newCodeContent: (name, con)-> console.log "NEW CODE CONTENT: #{name}, #{con}"
    
    textEnv = (lang, env)->
      env = env ? (__proto__: baseEnv)
      installEnvLang lang, env
      env
    
    getResultsForSource = (parent, node)->
      r = getExistingResultsForSource node
      if !r && needsResults node
        newResults parent, parseOrgMode getNodeText parent
        getExistingResultsForSource node
      else r
    
    needsResults = (node)->
      node.getAttribute('data-org-results')?.toLowerCase() != 'def'

    getExistingResultsForSource = (node)->
      $(blockElementForNode(node)).find("[data-org-type='results'] [data-org-src='example']")[0]
    
    nativeRange = (r, startOffset, endNode, endOffset)->
      if r instanceof Range then r
      else
        r2 = document.createRange()
        container = if r instanceof Node then r else if r instanceof Array then r[0] else r.startContainer
        if !container then null
        else
          offset = if r instanceof Node then startOffset else if r instanceof Array then r[1] else r.startOffset
          r2.setStart container, offset
          if endNode then r2.setEnd endNode, endOffset
          else r2.collapse true
          r2
    
    class SelectionDescriptor
      constructor: (range, optStartOffset, optEndContainer, optEndOffset, start)->
        if range
          if range instanceof Range
            startNode = range.startContainer
            startOffset = range.startOffset
            endNode = range.endContainer
            endOffset = range.endOffset
          else
            startNode = range
            startOffset = optStartOffset
            if optEndContainer
              endNode = optEndContainer
              endOffset = optEndOffset
            else
              endNode = startNode
              endOffset = startOffset
          if startNode.nodeType == 1
            c = domCursorForText startNode, startOffset
            startNode = c.node
            startOffset = c.pos
          if endNode.nodeType == 1
            c = domCursorForText endNode, endOffset
            endNode = c.node
            endOffset = c.pos
          @ids = []
          n = $(start ? startNode)
          while (n = n.closest '[data-shared]').length
            @ids.push [n[0].id, getTextPosition(n[0], startNode, startOffset), getTextPosition(n[0], endNode, endOffset)]
            n = n.parent()
        else
          @restore = ->
          @toString = "Selection(none)"
      currentRange: (offset)->
        for [id, startPos, endPos] in @ids
          [n] = $("##{id}")
          if n
            [startNode, startOffset] = findDomPosition n, startPos + offset
            [endNode, endOffset] = findDomPosition n, endPos + offset
            if startNode && endNode
              return nativeRange startNode, startOffset, endNode, endOffset
        null
      restore: (offset)-> selectRange @currentRange offset ? 0
      toString: -> "Selection(#{@start}, #{@end})"
    
    currentSelectionDescriptor = ->
      sel = getSelection()
      if sel.type == 'None' then new SelectionDescriptor()
      else new SelectionDescriptor sel.anchorNode, sel.anchorOffset, sel.extentNode, sel.extentOffset
    
    saveSelection = ->
      desc = currentSelectionDescriptor()
      (offset)-> desc.restore offset
    
    savePosition = (saveFunc, block)->
      if savingPosition != null then block()
      else
        savingPosition = 0
        pos = saveFunc()
        try
          block()
        finally
          sp = savingPosition
          savingPosition = null
          pos sp
    
    changeSavedSelectionOffset = (offset)->
      if savingPosition != null then savingPosition += offset
    
    restorePosition = (parent, block)-> savePosition saveSelection, block
    
    loadOrg = (parent, text, downloadPath, target)->
      text = crnl text
      if !target
        if nwDispatcher? then $('#saveFile').attr 'nwsaveas', downloadPath
        else $('#saveLink').attr 'download', downloadPath
      reparse parent, text, target
      #if !target
      #  executeDefs (node for node in $(parent).find('[data-org-src="def"]')), 0
    
    executeDefs = (defs, index)->
      if index < defs.length
        setTimeout (-> executeDef defs[index], -> executeDefs defs, index + 1), 1
    
    reparse = (parent, text, target)-> root.orgApi.reparse parent, text, target
    
    installOrgDOM = (parent, orgNode, orgText, target)->
      if target
        result = $(orgText)[0]
        $(target).replaceWith result
      else
        parent.innerHTML = ''
        parent.appendChild $(orgText)[0]
        result = parent.firstElementChild
      result
    
    checkEnterReparse = (parent, r)->
      if (result = getCollapsible r.startContainer) then reparse parent
      result
    
    newResults = (parent, src)->
      text = src.top().allText()
      srcEnd = src.end()
      reparse parent, text.substring(0, srcEnd) + "#+RESULTS:\n: \n" + text.substring(srcEnd)
      findOrgNode parent, srcEnd + 1
    
    id = lz (x)-> rz x
    getLeft = (x)-> x(id)(id)
    getRight = (x)-> x(id)(id)
    show = (obj)-> if L_show? then rz(L_show)(lz obj) else console.log obj
    
    propsFor = (node)->
      props = Nil
      tags = (node.getAttribute('data-org-tags') || '').trim()
      if tags then props = cons cons('tags', consFrom (tags).trim().split ' '), props
      name = (node.getAttribute('data-org-codeblock') || '').trim()
      if name then props = cons cons('block', name), props
      props
    
    getSource = (node)->
      while node && !isSourceNode node
        node = node.parentNode
      if node
        txt = $(node).text().substring($(node).find('[data-org-type="text"]').text().length)
        m = txt.match /(^|\n)#\+end_src/i
        if m then replaceNbsp txt.substring(0, m.index) else null
    
    executeSource = (parent, node, env, cont)->
      if !cont then [env, cont] = [null, env]
      if isSourceNode node
        #checkReparse parent
        if txt = getSource node
          env ||= orgEnv(parent, node)
          runBlock root.currentDocument, getBlock(parent.id), env, ->
            if env.changed then edited node
            cont? env
        else
          console.log "No end for src block"
          cont? env
      else getOrgType(node) != 'text' && !isDocNode(node) && executeSource parent, node.parentElement, cont
    
    getNodeLang = (node) ->
      ($(node).closest("[data-lang]").attr('data-lang') || '')
    
    getNodeSource = (node)->
      if (src = $(node).closest("[data-org-type='source']")).length == 0 then []
      else [src[0], replaceNbsp getOrgText(src.find('[data-org-src]')[0])]
    
    # given a node, find the enclosing source node and execute it's content as a definition
    executeDef = (node, cont)->
      [srcNode, text] = getNodeSource node
      if srcNode then textEnv(getNodeLang node).executeText text, propsFor(srcNode), cont
      else cont?()
    
    followingSpan = (node)-> node.nextElementSibling ? $('<span></span>').appendTo(node.parentNode)[0]
    
    # Need to insert an extra newline if all of these apply:
    # 1) the range is collapsed
    # 2) we are at the end of a text node
    # 3) the text node does not end in a newline
    # 4) the text node is at the end of the editable container
    checkExtraNewline = (range, n, parent)->
      if range.collapsed && n.nodeType == Node.TEXT_NODE && range.startOffset == n.length && getOrgText(n)[n.length - 1] != '\n' then checkLast n, parent
      else '\n'
    
    checkLast = (n, parent)->
      if n == parent then '\n\n'
      else if n.nextSibling then '\n'
      else checkLast n.parentNode, parent
    
    setTags = (headline)->
      m = getOrgText(headline.firstChild).match headlineRE
      tags = ((m && parseTags m[HL_TAGS]) || []).join ' '
      if headline.getAttribute('data-org-tags') != tags then headline.setAttribute 'data-org-tags', tags
    
    isCollapsible = (node)-> node.getAttribute('data-org-type') in ['headline', 'source', 'results']
    
    getCollapsible = (node)->
      if node.nodeType == Node.ELEMENT_NODE
        if isCollapsible node then node
        else (node.getAttribute('data-org-type') in ['text', 'meat']) && getCollapsible node.parentElement
      else node.nodeType == Node.TEXT_NODE && getCollapsible node.parentElement
    
    getOrgParent = (node)-> node && ((node.nodeType == Node.ELEMENT_NODE && isCollapsible(node) && node) || getOrgParent node.parentElement)
    
    isEmptyCollapsible = (node)->
      firstLine = getTextLine node
      node.firstChild == node.lastChild
    
    getTextLine = (node)->
      c = node.firstElementChild
      while c
        if c.getAttribute('data-org-type') == 'text' then return c
        c = c.nextElementSibling
      null
    
    #
    # location tools
    #
    
    findOrgNode = (parent, pos)->
      org = parseOrgMode getOrgText parent
      orgNode = org.findNodeAt pos
    
    textPositionForDomCursor = (c)->
      c2 = c.save().firstText()
      getTextPosition $(c.node).closest('[maindoc]')[0], c2.node, c2.pos
    
    getTextPosition = (parent, target, pos)->
      if parent
        targ = domCursorForText target, pos
        domCursorForText parent, 0, parent
          .mutable()
          .countChars targ.node, targ.pos
      else -1
    
    findDomPosition = (parent, pos, contain)->
      n = domCursorForTextPosition parent, pos, contain
      if n.isEmpty() then [null, null] else [n.node, n.pos]
    
    domCursorForTextPosition = (parent, pos, contain)->
      domCursorForText parent, 0, (if contain then parent)
        .mutable()
        .forwardChars pos, contain
        .adjustForNewline()
    
    nonOrg = (node)->
      $(node)
        .attr 'data-nonorg', 'true'
        .attr 'contenteditable', 'false'
    
    # full text for node
    getOrgText = (node)->
      if node
        domCursor node.firstChild, 0
          .mutable()
          .filterTextNodes()
          .filterParent node
          .getText()
      else ''
    
    orgForNode = (node)->
      org = suborgForNode node
      org.linkNodes()
      org.fixOffsets 0
      org
    
    suborgForNode = (node)->
      org = parseOrgMode blockText node
      if !$(node).is('[data-org-headline="0"]')
        if org.children.length == 1 then org = org.children[0]
        else org = new Fragment org.offset, org.children
      if $(node).is('[data-shared]')
        org.nodeId = node.id
        org.shared = $(node).attr 'data-shared'
      for child in orgChildrenForNode node
        org.children.push suborgForNode child
      org
    
    orgChildrenForNode = (node)->
      domCur = domCursor node, 0
        .mutable()
        .filterParent node
        .filterShared()
        .nodes()
    
    root.orgChildrenForNode = orgChildrenForNode
    
    # return the block text for a node -- just the text that's in its mongo block
    blockText = (node)->
      domCursor node, 0
        .mutable()
        .addFilter (n)-> !n.hasAttribute('data-shared') || 'skip'
        .filterParent node
        .filterTextNodes()
        .getText()
    
    nodeBefore = (node)-> domCursor(node, 0).prev().node
    
    textNodeBefore = (parent, node)->
      n = domCursor node, 0
        .mutable()
        .filterTextNodes()
        .filterParent parent
        .prev()
      !n.isEmpty() && n.node
    
    textNodeAfter = (parent, node)->
      n = domCursor node, 0
        .mutable()
        .filterTextNodes()
        .filterParent parent
        .next()
      !n.isEmpty() && n.node
    
    visibleTextNodeAfter = (parent, node)->
      n = domCursor node, 0
        .mutable()
        .filterVisibleTextNodes()
        .filterParent parent
        .next()
      !n.isEmpty() && n.node
    
    # full text for node
    getNodeText = (node)->
      if $(node).is('[data-shared]') then orgForNode(node)
      else if root.currentDocument && $(node).is('[maindoc]') then orgForNode(node)
      else getOrgText node
    
    emptyOutNode = (node)->
      node.innerHTML = ''
      newNode = $(node)[0].cloneNode false
      $(node).after newNode
      $(node).remove()
      newNode
    
    root.orgApi = null
    
    orgNotebook =
      useNode: (node, source, content)->
        sourceDiv = source
        root.orgApi = @
        if !content then content = $(node).text()
        newNode = emptyOutNode node
        editDiv = newNode
        [orgNode, lastOrgText] = @markupOrgWithNode content
        root.restorePosition newNode, => @installOrgDOM newNode, orgNode, lastOrgText
        @bindContent newNode
      installOrgDOM: (parent, orgNode, orgText, target)-> installOrgDOM parent, orgNode, orgText, target
      newNode: ->
      redrawIssue: (i)-> console.log "REDRAW ISSUE: #{i}"
      defineWidget: (id)->
      applyLeisureTooltips: ->
      applyShowHidden: ->
      inMode: (el)->
        (mode = $(el).closest("[data-edit-mode]")).length == 0 || $(mode).attr('data-edit-mode') == @name
      reparse: (parent, text, target)->
        text = text || (getNodeText target || parent)
        [orgNode, orgText] = @markupOrgWithNode text, null, target
        element = $(orgText)[0]
        if target && target.outerHTML == element.outerHTML then node = target
        else
          #if target then console.log "reparse #{text.allText()}"
          node = null
          root.restorePosition parent, => node = @installOrgDOM parent, orgNode, element, target
          setTimeout (->
            for l in reparseListeners
              l parent, orgNode, element
            ), 1
        node
      checkSourceMod: checkSourceMod
      configureMenu: configureMenu
      removeSlide: (id)-> $("##{id}").remove()
      defineView: ->
      deleteView: (type)->
      handleDrop: handleDrop
      updateObserver: (observerId, observerContext, yaml, block, type)->
        if observerContext.block.language.toLowerCase() == 'leisure'
          parent = $("##{observerId}")
          if parent[0]
            if parent.is("[data-org-type='source']") then node = parent[0]
            else node = parent.find("[data-org-type='source']")[0]
            if node then return @executeSource parent[0], node
        observerContext?.update? block.yaml, block, type
      collapseNode: ->
    
    basicOrg =
      __proto__: orgNotebook
      name: 'plain'
      markupOrg: markupOrg
      markupOrgWithNode: markupOrgWithNode
      bindContent: bindContent
      executeDef: executeDef
      executeSource: executeSource
      createResults: (srcNode)->
      installOrgDOM: (parent, orgNode, orgText, target)->
        if !target then parent.setAttribute 'class', 'org-plain'
        node = orgNotebook.installOrgDOM parent, orgNode, orgText, target
        if target && this != root.orgApi then root.orgApi.newNode target
        node
      bindings: defaultBindings
      leisureButton: swapMarkup
      emptySlide: (id)-> "<span id='#{id}'></span>"
      insertEmptySlide: (id, prev)->
        slide = $(@emptySlide id)
        if prev then $("##{prev}").after slide
        else $('[maindoc]').prepend slide
        slide[0]
      inMode: -> true
      updateIndexViews: ->
      updateBlock: ->
      updateAllBlocks: ->
      #collapseNode: collapseNode
    
    findOrIs = (set, selector)-> if set.is selector then set else set.find selector
    
    domCursorForRange = (r)->
      n = domCursor r.startContainer, r.startOffset
        .mutable()
        .filterVisibleTextNodes()
        .filterRange r
        .firstText()
      if n.isEmpty() || n.pos < n.node.length then n else n.next()
    
    domCursorForCaret = ->
      sel = getSelection()
      parent = parentForNode sel.focusNode
      n = domCursor sel.focusNode, sel.focusOffset
        .mutable()
        .filterVisibleTextNodes()
        .filterParent parent
        .firstText()
      if n.isEmpty() || n.pos <= n.node.length then n else n.next()
    
    domCursorForSelectedText = ->
      sel = getSelection()
      if sel.type != 'Range' then emptyDOMCursor
      else
        r = sel.getRangeAt 0
        n = domCursor r.startContainer, r.startOffset
          .mutable()
          .filterTextNodes()
          .filterRange r
          .firstText()
        if n.isEmpty() || n.pos < n.node.length then n else n.next()
    
    root.findOrIs = findOrIs
    root.parentForNode = parentForNode
    root.parentForBlockId = parentForBlockId
    root.parentForDocId = parentForDocId
    root.basicOrg = basicOrg
    root.plainOrg = basicOrg
    root.orgNotebook = orgNotebook
    root.markupOrg = markupOrg
    root.bindContent = bindContent
    root.reparse = reparse
    root.reparseListeners = reparseListeners
    root.findDomPosition = findDomPosition
    root.getCollapsible = getCollapsible
    root.parseOrgMode = parseOrgMode
    root.orgAttrs = orgAttrs
    root.content = content
    root.contentSpan = contentSpan
    root.checkStart = checkStart
    root.checkEnterReparse = checkEnterReparse
    root.checkExtraNewline = checkExtraNewline
    root.followingSpan = followingSpan
    root.currentLine = currentLine
    root.checkSourceMod = checkSourceMod
    root.getTextPosition = getTextPosition
    root.nextOrgId = nextOrgId
    root.modifyingKey = modifyingKey
    root.handleKeyup = handleKeyup
    root.backspace = backspace
    root.del = del
    root.getOrgParent = getOrgParent
    root.getOrgType = getOrgType
    root.executeDef = executeDef
    root.executeSource = executeSource
    root.propsFor = propsFor
    root.orgEnv = orgEnv
    root.baseEnv = baseEnv
    root.initOrg = initOrg
    root.swapMarkup = swapMarkup
    root.modifiers = modifiers
    root.keyFuncs = keyFuncs
    root.defaultBindings = defaultBindings
    root.addKeyPress = addKeyPress
    root.adjustSelection = adjustSelection
    root.findKeyBinding = findKeyBinding
    root.setCurKeyBinding = setCurKeyBinding
    root.installEnvLang = installEnvLang
    root.textEnv = textEnv
    root.escapeAttr = escapeAttr
    root.restorePosition = restorePosition
    root.savePosition = savePosition
    root.saveSelection = saveSelection
    root.splitLines = splitLines
    root.orgSrcAttrs = orgSrcAttrs
    root.getNodeLang = getNodeLang
    root.getNodeSource = getNodeSource
    root.loadOrg = loadOrg
    root.resultsType = resultsType
    root.isDynamic = isDynamic
    root.isDef = isDef
    root.nativeRange = nativeRange
    root.textNodeBefore = textNodeBefore
    root.textNodeAfter = textNodeAfter
    root.visibleTextNodeAfter = visibleTextNodeAfter
    root.PAGEUP = PAGEUP
    root.PAGEDOWN = PAGEDOWN
    root.saveFile = saveFile
    root.nodeBefore = nodeBefore
    root.getOrgText = getOrgText
    root.nonOrg = nonOrg
    root.blockText = blockText
    root.blockElementsForSelection = blockElementsForSelection
    root.blockElementForNode = blockElementForNode
    root.blockIdsForSelection = blockIdsForSelection
    root.orgForNode = orgForNode
    root.toggleShowHidden = toggleShowHidden
    root.applyLeisureTooltips = applyLeisureTooltips
    root.applyShowHidden = applyShowHidden
    root.actualSelectionUpdate = actualSelectionUpdate
    root.currentBlockIds = []
    root.toggleLeisureBar = toggleLeisureBar
    root.errorDiv = errorDiv
    root.domCursorForRange = domCursorForRange
    root.domCursorForCaret = domCursorForCaret
    root.domCursorForSelectedText = domCursorForSelectedText
    root.editFile = editFile
    root.domCursor = domCursor
    root.plainEnv = orgEnv
    root.checkLast = checkLast
    root.SelectionDescriptor = SelectionDescriptor
    root.currentSelectionDescriptor = currentSelectionDescriptor
    root.changeSavedSelectionOffset = changeSavedSelectionOffset
    root.queueKeyCommand = queueKeyCommand
    root.updateSelection = updateSelection
    root.breakPoint = breakPoint
    root.textPositionForDomCursor = textPositionForDomCursor
    root.domCursorForTextPosition = domCursorForTextPosition
    root.handleDelete = handleDelete
    root.handleInsert = handleInsert
    root.editBlock = editBlock
    root.getEventChar = getEventChar
    root.templateExpansions = templateExpansions
    
    # evil mod of Templating
    Templating.nonOrg = nonOrg
