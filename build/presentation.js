// Generated by CoffeeScript 2.4.1
(function() {
  'use strict';
  define(['./editor', './editorSupport'], function(Editor, EditorSupport) {
    var editorForToolbar, loadFile, reloadFromBrowser, removeFromBrowser, saveFile, saveToBrowser;
    ({editorForToolbar} = EditorSupport);
    saveFile = function(editor) {
      var l, url;
      url = URL.createObjectURL(new Blob([editor.getText()], {
        type: 'application.octet-stream'
      }));
      l = $(`<a download='${editor.options.data.loadName}' href='${url}'></a>`).appendTo(document.body);
      l[0].click();
      l.remove();
      return setTimeout((function() {
        return URL.revokeObjectURL(url);
      }), 250);
    };
    loadFile = function(editor) {
      var i;
      i = $("<input type='file'></input>").appendTo(document.body);
      i[0].onchange = function(e) {
        var file, reader;
        file = e.target.files[0];
        reader = new FileReader();
        reader.onload = function() {
          console.log("loaded");
          return editor.options.load(file.name, reader.result);
        };
        return reader.readAsText(file);
      };
      i[0].click();
      return i.remove();
    };
    saveToBrowser = function(e) {};
    reloadFromBrowser = function(e) {};
    removeFromBrowser = function(e) {};
    return {saveFile, loadFile, saveToBrowser, reloadFromBrowser, removeFromBrowser};
  });

}).call(this);

//# sourceMappingURL=presentation.js.map
