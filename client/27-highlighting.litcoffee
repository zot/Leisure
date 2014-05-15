    root = if window? then window.Highlighting = {} else global.Highlighting = {}
    _ = Lazy


Using [SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/) in an unsupported way

    highlight = (brushName, text)->
      for name, br of SyntaxHighlighter.brushes
        if brushName in br.aliases
          brush = new br()
          brush.init brush: brushName
          matches = brush.findMatches brush.regexList, text
          return "<div class='syntaxhighlighter #{brushName}'><div class='code'><div class='container'>#{brush.getMatchesHtml text, matches}</div></div></div>".replace /&nbsp;/g, ' '
      text

    root.highlight = highlight
