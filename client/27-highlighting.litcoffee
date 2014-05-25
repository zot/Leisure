    root = if window? then window.Highlighting = {} else global.Highlighting = {}
    _ = Lazy


    {
      escapeHtml,
    } = Templating

Using [SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/) in an unsupported way

    syntaxHighlighterHighlight = (brushName, text)->
      for name, br of SyntaxHighlighter.brushes
        if brushName in br.aliases
          brush = new br()
          brush.init brush: brushName
          matches = brush.findMatches brush.regexList, text
          return "<div class='syntaxhighlighter #{brushName}'><div class='code'><div class='container'>#{brush.getMatchesHtml text, matches}</div></div></div>".replace /&nbsp;/g, ' '
      text

    aliases =
      html: 'markup'

    prismHighlight = (lang, text)->
      if l = aliases[lang] then lang = l
      if Prism.languages[lang]
        console.log "PRISM: " + lang
        Prism.highlight text, Prism.languages[lang], lang
      else escapeHtml text

    #highlight = (lang, text)-> syntaxHighlighterHighlight lang, text
    highlight = (lang, text)-> prismHighlight lang, text

    root.highlight = highlight
