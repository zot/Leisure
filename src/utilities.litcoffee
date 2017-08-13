Lounge utilities.

    'use strict'
    define ['bluebird'], (Bluebird)->
      {
        Promise
      } = Bluebird

      ajaxGet = (url)->
        new Promise (resolve, reject)->
          xhr = new XMLHttpRequest
          xhr.responseType = 'arraybuffer'
          xhr.onerror = reject
          xhr.onload = (e)->
            binary = ''
            for i in new Uint8Array(e.target.response)
              binary += String.fromCharCode i
            resolve binary
          xhr.open "GET", url
          xhr.send null

      {
        ajaxGet
      }
