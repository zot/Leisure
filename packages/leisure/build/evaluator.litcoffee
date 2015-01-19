blorfl

    {
      loadFiles,
    } = root = Evaluator

    loadFiles [
      '../../../packages/org/preamble.js',
      '../../../packages/org/lazy.js',
      '../../../packages/org/yaml.js',
      '../../../packages/org/source-map.js',
    ]
      .then ->
        window.require = -> Leisure
        loadFiles [
          '../../../lib/05-immutable.js',
          '../../../lib/10-namespace.litcoffee',
          '../../../lib/11-l.litcoffee',
          '../../../lib/15-libs.coffee',
          '../../../client/12-browser.js',
        ]
      .then ->
        window.require = -> Leisure
        loadFiles [
          '../../../client/13-uri.coffee',
          '../../../client/15-base.coffee',
          '../../../client/16-ast.coffee',
          '../../../client/17-runtime.coffee',
          '../../../client/18-gen.coffee',
          #'lib/simpleParse.js',
          'lib/generatedPrelude.js',
          'evaluatorCode.litcoffee',
        ]

