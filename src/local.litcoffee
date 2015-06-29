Code for local-mode.  This will not be loaded under meteor.

    require ['cs!./editorSupport.litcoffee', 'cs!./diag.litcoffee', 'cs!./p2p.litcoffee'], (EditorSupport, Diag, P2P)->

      {
        OrgData
        installSelectionMenu
        plainEditDiv
      } = EditorSupport
      {
        createStructureDisplay
        createEditorDisplay
      } = Diag
      {
        Peer
      } = P2P

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
                <div style='text-align: center'>Generating offer</div>
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
        message = connectDialog.find 'textarea'
        spinner = connectDialog.find '#loaderContainer'
        offerButton = connectDialog.find('button').button().on 'click', -> offerAction()
        connect = $("<button>Connect to Master</button>")
          .prependTo('body')
          .button()
          .on 'click', -> connectToMaster()
        create = $("<button>Connect to Slave</button>")
          .prependTo('body')
          .button()
          .on 'click', -> connectToSlave()
        connectDialog
          .appendTo('body')
          .dialog()
          .dialog 'option', 'width', 700
          .dialog 'option', 'height', 400
          .dialog 'option', 'position',  { my: "center", at: "top", of: window }
          .dialog 'close'

        connectToSlave = ->
          if peer.becomeMaster() then connect.button('disable')
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
            connected: (connection)-> connectDialog.dialog 'close'

        connectToMaster = ->
          console.log 'CLICK'
          if peer.becomeSlave() then create.button 'disable'
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

      $(document).ready ->
        installSelectionMenu()
        if useP2P
          configurePeerButttons()
          window.PEER = peer = new Peer
          window.DATA = data = peer.adaptData new OrgData()
        else window.DATA = data = new OrgData()
        createStructureDisplay data
        window.ED = plainEditDiv $("[maindoc]"), data
        createEditorDisplay ED
        ED.options.load """
        hit enter at the bottom
        #+BEGIN_SRC lisp :results dynamic
        (+ 3 4)
        #+END_SRC
        #+RESULTS:
        : 7
        #+BEGIN_SRC js :results dynamic
        3 + 4
        #+END_SRC
        #+RESULTS:
        : 7
        """ + '\n'
