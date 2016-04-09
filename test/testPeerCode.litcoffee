    define ['jquery', 'cs!lib/webrtc.litcoffee'], (jq, Peer)->
      {
        PeerConnection
        MasterConnection
        SlaveConnection
      } = Peer

      mode = null
      chatLog = $('#chatLog')
      chatButton = $('#chatButton').button()
      chatInput = $('#chatInput')

      log = (txt)->
        chatLog[0].innerHTML += (if chatLog[0].innerHTML then '\n' else '') + txt

      class Peer
        constructor: (name)->
          @area = $("##{name}Area")
          @button = $("##{name}OfferButton").button()
          @button.on 'click', => @press()
          @spinner = $("##{name}Spinner")
          @offer = $("##{name}Offer")
        startMaster: (err)-> @start MasterConnection, err
        startSlave: (offerJson, err)-> @start SlaveConnection, offerJson, err
        displayOffer: (offer)-> @offer.val JSON.stringify offer
        receiveMessage: (msg)-> log "<b class='them'>Them:</b> #{msg}"
        press: ->
          if !mode
            mode = this
            @create()
        start: (createFunc, startOpts...)->
          @offer.addClass 'hidden'
          @button.button('disable')
          @spinner.addClass 'loader'
          @area.addClass 'loading'
          log "<b><i>" + @offerMsg() + "</i></b>"
          @offer.attr 'readonly', true
          @connection = new createFunc
            connected: =>
              $('#chatInput').removeAttr 'disabled'
              $('#chatButton').removeAttr 'disabled'
              log "<b><i>Connected</i></b>"
            handleMessage: (msg)=> @receiveMessage msg
            offerReady: (offer)=>
              log "<b><i>Generated, now send the offer</i></b>"
              @displayOffer offer
              @spinner.removeClass 'loader'
              @area.removeClass 'loading'
              @offer.removeClass 'hidden'
              @offerReady offer
          @connection.start startOpts...

      class Master extends Peer
        constructor: -> super 'master'
        offerMsg: -> "Generating offer"
        create: ->
          @slave.button.button 'disable'
          @slave.button.button 'option', 'label', 'Use Slave Answer'
          @slave.offer.attr 'placeholder', "Send offer to slave\n\nThen paste slave's answer here"
          @slave.offer.attr 'readonly', 'true'
          @startMaster (err)-> log "<b><i>Error: #{err}</i></b>"
        offerReady: (offer)->
          @slave.button.button 'enable'
          @slave.offer.removeAttr 'readonly'

      class Slave extends Peer
        constructor: (@master)->
          super 'slave'
          @master.slave = this
        offerMsg: -> "Generating answer"
        create: ->
          if !@offer.val().trim() then mode = null
          else
            @master.button.button 'option', 'label', ''
            @master.button.button 'disable'
            @master.offer.attr 'placeholder', 'Generating answer...'
            @startSlave @offer.val(), (err)-> log "<b><i>Error: #{err}</i></b>"
        offerReady: (offer)->
        displayOffer: (offer)-> @master.offer.val JSON.stringify offer
        press: ->
          if !mode then super()
          else
            @offer.attr 'readonly', 'true'
            @master.connection.establishConnection @offer.val()

      sendMessage = ->
        if chatInput.val()
          log "<b class='me'>Me:</b> #{chatInput.val()}"
          mode.connection.sendMessage chatInput.val()
          chatInput.val ''

      master = new Master()
      slave = new Slave master

      chatInput
        .attr 'disabled', 'true'
        .on 'keypress', (e)->
          if (e.charCode || e.keyCode || e.which) == 13 then sendMessage()

      chatButton
        .on 'click', sendMessage
        .attr 'disabled', 'true'

      master: master
      slave: slave
