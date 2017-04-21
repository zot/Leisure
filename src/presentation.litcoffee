    define ['./editor', './editorSupport'], (Editor, EditorSupport)->
      {
        editorForToolbar
      } = EditorSupport

      saveFile = (editor)->
        url = URL.createObjectURL new Blob [editor.getText()], type: 'application.octet-stream'
        l = $("<a download='#{editor.options.data.loadName}' href='#{url}'></a>").appendTo document.body
        l[0].click()
        l.remove()
        setTimeout (-> URL.revokeObjectURL url), 250

      loadFile = (editor)->
        i = $("<input type='file'></input>").appendTo document.body
        i[0].onchange = (e)->
          file = e.target.files[0]
          reader = new FileReader()
          reader.onload = -> editor.options.load file.name, reader.result
          reader.readAsText file
        i[0].click()
        i.remove()

      saveToBrowser = (e)->

      reloadFromBrowser = (e)->

      removeFromBrowser = (e)->

      {
        saveFile
        loadFile
        saveToBrowser
        reloadFromBrowser
        removeFromBrowser
      }
