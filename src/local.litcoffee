Code for local-mode.  This will not be loaded under meteor.

    init = (jqui, EditorSupport, Diag, P2P, Tests, Webrtc, Defaults, UI, BrowserExports, Search, Emacs)->

      {
        OrgData
        installSelectionMenu
        plainEditDiv
        fancyEditDiv
      } = EditorSupport
      {
        createStructureDisplay
        createEditorDisplay
      } = Diag
      {
        Peer
      } = P2P
      {
        findPeer
      } = Webrtc
      {
        runTests
      } = Tests
      {
        renderView
        initializePendingViews
        withContext
      } = UI
      {
        mergeExports
      } = BrowserExports
      {
        addSearchDataFilter
      } = Search
      {
        addEmacsDataFilter
      } = Emacs

      useP2P = true
      #useP2P = false
      peer = null
      mode = null
      connectDialog = null
      offerButton = null
      spinner = null
      message = null
      offerAction = null

      showMessage = (offerMessage, buttonAction)->
        spinner.addClass 'hidden'
        message.removeClass 'hidden'
        offerButton.button 'option', 'label', offerMessage
        offerButton.removeClass 'hidden'
        offerAction = buttonAction

      showSpinner = ->
        message.addClass 'hidden'
        offerButton.addClass 'hidden'
        spinner.removeClass 'hidden'

      configurePeerButttons = ->
        connectDialog = $ """
          <div title="Connect">
            <div>
              <div id="loaderContainer" style="position: relative; height: 100%">
                <div id="loaderText" style='text-align: center'>Discovering Connection Information</div>
                <div class="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <textarea class='hidden' readonly="true" style="width: 100%; height: calc(100% - 2.5em - 5px)">Hello</textarea>
              <button style="height: 2.5em; margin-top: 5px" class='hidden'></button>
            </div>
          </div>
        """
        connectDialog
          .appendTo('body')
          .dialog()
          .dialog 'option', 'width', 700
          .dialog 'option', 'height', 400
          .dialog 'option', 'position',  { my: "top center", at: "top center", of: window }
          .dialog 'close'
        message = connectDialog.find 'textarea'
        spinner = connectDialog.find '#loaderContainer'
        offerButton = connectDialog.find('button').button().on 'click', -> offerAction()
        connectMasterButton = null
        connectSlaveButton = null
        connectionDisplay = null

        #configureP2P = (newConnectSlaveButton, newConnectMasterButton, newConnectionDisplay)->
        #  connectMasterButton = newConnectMasterButton
        #  connectSlaveButton = newConnectSlaveButton
        #  connectionDisplay = newConnectionDisplay
        #  opts = Leisure.editorForToolbar(connectSlaveButton).options
        #  connectSlaveButton.button().on 'click', -> connectToSlave()
        #  connectMasterButton.button().on 'click', -> connectToMaster()

        configureP2P = ({hostField, masterButton, slaveButton, connections})->
          console.log "host:", hostField
          console.log "masterButton:", masterButton
          console.log "slaveButton:", slaveButton
          console.log "connections:", connections
          hostField.val document.location.host

        updateConnections = (newTotal)-> connectionDisplay.html newTotal

        connectToSlave = ->
          if peer.becomeMaster() then connectMasterButton.button('disable')
          connectDialog.dialog 'open'
          peer.createConnectionForSlave
            offerReady: (offer, connection)->
              message.val JSON.stringify offer
              showMessage 'Send to slave and press when delivered', ->
                message
                  .val ''
                  .removeAttr 'readonly'
                  .off 'keydown'
                showMessage 'Paste slave answer and press this to accept it', ->
                  if message.val()
                    connection.establishConnection message.val()
                    connectDialog.dialog 'close'
              message[0].select()
            connected: (connection)->
              updateConnections (con for con of peer.connections).length
              connectDialog.dialog 'close'
            error: (err)-> $('#loaderText').html err

        connectToMaster = ->
          console.log 'CLICK'
          if peer.becomeSlave((info)-> updateConnections info.total)
            connectSlaveButton.button 'disable'
          showMessage 'Press to generate answer from master offer', ->
            console.log "GENERATE ANSWER"
            showSpinner()
            peer.createConnectionToMaster
              offer: message.val()
              answerReady: (answer)->
                console.log "answer ready"
                message.val JSON.stringify answer
                showMessage 'Press when master has above answer', ->
                  connectDialog.dialog 'close'
                message[0].select()
              connected: ->
                connectDialog.dialog 'close'
                console.log 'connected'
              error: (con, err)-> $('#loaderText').html err.message
          offerButton.button 'disable'
          connectDialog.dialog 'open'
          message
            .val ''
            .attr 'placeholder', 'Paste master offer here'
            .removeAttr 'readonly'
            .off 'keydown'
            .on 'keydown', ->
              # use keydown + a timeout here instead of keyup for better responsiveness
              setTimeout (->
                empty = (message.val() == '')
                if empty != offerButton.button('option', 'disabled')
                  offerButton.button 'option', 'disabled', empty), 1

        mergeExports {
          configureP2P
        }

      $(document).ready ->
        runTests()
        installSelectionMenu()
        if useP2P
          configurePeerButttons()
          window.PEER = peer = new Peer
          window.DATA = data = peer.data
        else window.DATA = data = new OrgData()
        addSearchDataFilter data
        data.processDefaults Defaults
        createStructureDisplay data
        #window.ED = plainEditDiv $("[maindoc]"), data
        window.ED = fancyEditDiv $("[maindoc]"), data
        createEditorDisplay ED
        if !document.location.search
          ED.options.load """
          * top
          bubba

          [[leisure:bubba]][[leisure:bubba]]
          #+NAME: bubba
          #+BEGIN_SRC yaml
          type: rotator
          degrees: 45
          #+END_SRC

          #+BEGIN_SRC html :defview rotator
          <div style='padding: 25px; display: inline-block'>
            <div style='transform: rotate({{degrees}}deg);height: 100px;width: 100px;background: green'></div>
          </div>
          #+END_SRC

          #+BEGIN_SRC cs :control rotator
          @initializeView = (view)-> console.log "initialize", view
          #+END_SRC

          #+BEGIN_SRC html :defview leisure-headlineX
          <span id='{{id}}' data-block='headline'><span class='hidden'>{{stars}}</span><span class='maintext'>{{maintext}}</span>{{EOL}}{{nop
          }}</span>{{#each children}}{{{render this}}}{{/each}}</span>
          #+END_SRC
          
          #+BEGIN_SRC css
          [data-block='headline'] .maintext {
            font-weight: bold;
            color: blue;
          }
          .custom-headline {
            font-weight: bold;
            color: green;
          }
          [data-block='headline'] {
            color: orangeX;
          }
          #+END_SRC
          * Test properties > splunge
          #+BEGIN_SRC lisp :results dynamic
          (+ 3 4)
          #+END_SRC
          #+RESULTS:
          : 7
           ** sub 1
          */duh/*
          :properties:
          :hidden: true
          :a: 1
          :end:
          #+BEGIN_SRC js :results dynamic
          3 + 4
          #+END_SRC
          #+RESULTS:
          : 7

          #+BEGIN_SRC cs :results dynamic
          '<b>duh</b>'
          html '<b>duh</b>'
          37/3333
          html '<img src="https://imgs.xkcd.com/comics/lisp_cycles.png">'
          #+END_SRC
          #+RESULTS:
          : &lt;b&gt;duh&lt;/b&gt;
          : <b>duh</b>
          : 0.0111011101110111
          : <img src="https://imgs.xkcd.com/comics/lisp_cycles.png">

          image link
          [[https://imgs.xkcd.com/comics/lisp_cycles.png]]

          peep
          :properties:
          :b: 2
          :end:
          ** sub 2
          asdf
          """ + '\n'
        $('#globalLoad').remove()

    require ['jquery'], ->
      require ['jqueryui', 'cs!./editorSupport.litcoffee', 'cs!./diag.litcoffee', 'cs!./p2p.litcoffee', 'cs!./tests.litcoffee', 'cs!./lib/webrtc.litcoffee', 'text!../src/defaults.lorg', 'cs!./ui.litcoffee', 'cs!./export.litcoffee', 'cs!./search.litcoffee', 'cs!./emacs.litcoffee'], init
