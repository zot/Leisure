Common client/server code

    define [], ->
      badMasterIdError: (id)->
        code: 1
        type: 'error'
        error: "Bad master Id: #{id}"
      badMsgTypeError: (msg)->
        code: 2
        type: 'error'
        error: "Bad message type: #{msg.type}"
      disapprovedError: ->
        code: 3
        type: 'error'
        error: "The master does not approve"
      badVersionError: (current, msg)->
        errMsg = "Bad version, current version is #{current} but got #{msg.version}"
        console.log errMsg
        code: 4
        type: 'error'
        error: errMsg
      invalidOperationError: (client, err)->
        errMsg = "Invalid operation received from #{client}: #{err}"
        console.log errMsg
        code: 5
        type: 'error'
        error: errMsg
      noTrim: true
      #noTrim: false
