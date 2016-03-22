# Leisure (C) 2016 Bill Burdick and TEAM CTHULHU

# Many thanks to webBoxio for writing atom-html-preview: https://github.com/webBoxio/atom-html-preview

LeisureView = require './leisure-view'
url = require 'url'
{CompositeDisposable, Disposable} = require 'atom'
{Promise} = require 'bluebird'
atom = window.atom

# OrgEditor loads atom-tools into an iframe
class OrgEditor extends Disposable
  constructor: (@textEditor)->
    @doc = document
    console.log 'ORG EDITOR', @textEditor
    console.log 'document', @doc
    @subscriptions = new CompositeDisposable
    @subscriptions.add @textEditor.onDidChange ({start, end, bufferDelta})=> @changed start, end, bufferDelta
    @toolsPromise = new Promise (resolve)=>
      @resolveTools = resolve
      @iframe = document.createElement('iframe')
      @iframe.setAttribute 'sandbox', 'allow-scripts allow-same-origin'
      @iframe.src = new URL('atom.html', atom.config.get('leisure.leisureURL')).pathname
      @doc.body.appendChild @iframe
      @iframe.contentWindow.atomView = this
  setTools: (@tools)->
    console.log 'tools', @tools
    @resolveTools()
  disposalAction: ->
    console.log 'DISPOSING'
    @subscriptions.dispose()
  changed: (start, end, bufferDelta)->
    @toolsPromise.then ->
      console.log "CHANGED: #{start}"


module.exports = Leisure =
  selector: '.source.org'
  leisureView: null
  modalPanel: null
  subscriptions: null
  config:
    leisureURL:
      type: 'string'
      description: 'URL to open Leisure.'
      default: 'http://zot.github.io/Leisure'

  activate: (state) ->
    atom.workspace.addOpener (uriToOpen) ->
      try
        {protocol, host, pathname} = url.parse(uriToOpen)
        return unless protocol is 'leisure:'
        pathname = decodeURI(pathname) if pathname
        if host is 'editor'
          new LeisureView(pathname.substring(1))
      catch error
        console.log error.stack
        return

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'leisure:toggle': => @toggle()
    @subscriptions.add atom.workspace.onDidAddTextEditor ({textEditor})=>
      @subscriptions.add new OrgEditor textEditor

  deactivate: ->
    @subscriptions.dispose()

  toggle: -> if editor = atom.workspace.getActiveTextEditor()
    uri = "leisure://editor/#{editor.id}"
    previewPane = atom.workspace.paneForURI(uri)
    if previewPane
      previewPane.destroyItem(previewPane.itemForURI(uri))
    else
      previousActivePane = atom.workspace.getActivePane()
      atom.workspace.open(uri, split: 'right', searchAllPanes: true).done (leisureView) ->
        if leisureView instanceof LeisureView
          leisureView.renderHTML()
          previousActivePane.activate()
