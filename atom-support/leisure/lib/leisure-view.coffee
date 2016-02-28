# Leisure (C) 2016 Bill Burdick and TEAM CTHULHU

# Many thanks to webBoxio for writing atom-html-preview: https://github.com/webBoxio/atom-html-preview

{CompositeDisposable, Disposable} = require 'atom'
{$, $$$, ScrollView}  = require 'atom-space-pen-views'

module.exports =
class LeisureView extends ScrollView
  atom.deserializers.add(this)

  @deserialize: (state)-> new LeisureView(state)
  @content: -> @div class: 'leisure-view native-key-bindings', tabindex: -1

  editorSub: null
  onDidChangeTitle: -> new Disposable()
  onDidChangeModified: -> new Disposable()

  constructor: (@editorId) ->
    super
    if @editorId?
      @resolveEditor @editorId
      @leisureURL = "#{atom.config.get('leisure.leisureURL')}?connect=atom://#{@editorId}"
      console.log 'Leisure view', this
    else if atom.workspace? then @subscribeToFilePath filePath
    else atom.packages.onDidActivatePackage =>
      @subscribeToFilePath filePath

  serialize: ->
    deserializer: 'LeisureView'
    filePath: @getPath()
    editorId: @editorId

  destroy: -> @editorSub.dispose()

  subscribeToFilePath: (filePath) ->
    @trigger 'title-changed'
    @handleEvents()
    @renderHTML()

  resolveEditor: (editorId) ->
    resolve = =>
      @editor = @editorForId(editorId)
      if @editor?
        @trigger 'title-changed' if @editor?
        @handleEvents()
      else
        # The editor this Leisure view was created for has been closed so close
        # this Leisure view since a Leisure view cannot be rendered without an editor
        atom.workspace?.paneForItem(this)?.destroyItem(this)
    if atom.workspace? then resolve()
    else atom.packages.onDidActivatePackage =>
      resolve()
      @renderHTML()

  editorForId: (editorId) ->
    for editor in atom.workspace.getTextEditors()
      return editor if editor.id?.toString() is editorId.toString()
    null

  handleEvents: =>
    @editorSub = new CompositeDisposable
    if @editor?
      @editorSub.add @editor.onDidChange (e)=>
        @leisureWindow.atomSupport?.handleAtomTextChanged e

  renderHTML: ->
    @showLoading()
    if @editor? then @renderHTMLCode()

  save: (callback) ->

  renderHTMLCode: (text) ->
    # if not atom.config.get("atom-html-preview.triggerOnSave") and @editor.getPath()? then @save () =>
    @iframe = document.createElement('iframe')
    # Fix from @kwaak (https://github.com/webBoxio/atom-html-preview/issues/1/#issuecomment-49639162)
    # Allows for the use of relative resources (scripts, styles)
    @iframe.setAttribute 'sandbox', 'allow-scripts allow-same-origin'
    $(@iframe).on 'load', => $(@iframe.contentWindow).on 'blur', => @activateSensor()
    @iframe.src = @leisureURL
    @iframe.view = this
    console.log 'set src of', @iframe, "to #{@leisureURL}"
    @children().remove()
    @sensor = $ '<div name="sensor"></div>'
    @append @iframe
    @append @sensor
    @leisureWindow = @iframe.contentWindow
    @leisureWindow.atomView = this
    console.log 'Leisure iframe', @iframe
    @sensor.on 'mouseover', (e)=> if !e.buttons then @activateView(null, true)
    atom.commands.dispatch 'leisure', 'html-changed'

  activateView: -> @sensor.addClass 'hidden'

  activateSensor: -> @sensor.removeClass 'hidden'

  getTitle: ->
    if @editor? then "Leisure: #{@editor.getTitle()}"
    else 'Leisure'

  getURI: -> "leisure://editor/#{@editorId}"
  getPath: -> if @editor? then @editor.getPath()

  showError: (result) ->
    failureMessage = result?.message
    @html $$$ ->
      @h2 'Leisure view failed'
      @h3 failureMessage if failureMessage?

  showLoading: -> @html $$$ -> @div class: 'atom-html-spinner', 'Loading Leisure\u2026'
