Leisure tools for Atom.  This is to be run in an iframe as a namespace so that Atom can use it as-is.


    reqConfig =
      baseUrl: '.'
      paths:
        # the left side is the module ID,
        # the right side is the path to
        # the jQuery file, relative to baseUrl.
        # Also, the path should NOT include
        # the '.js' file extension. This example
        # is using jQuery 1.9.0 located at
        # js/lib/jquery-1.9.0.js, relative to
        # the HTML page.
        jquery: 'lib/jquery-2.1.4.min'
        #jqueryui: 'lib/jquery-ui-1.9.1.custom.min'
        jqueryui: 'lib/jquery-ui.min-1.11.4'
        #jqueryui: 'lib/jquery-ui-1.11.4'
        underscore: 'lib/underscore-min'
        acorn: 'lib/acorn-2.0.5'
        acorn_loose: 'lib/acorn_loose-2.0.5'
        acorn_walk: 'lib/acorn_walk-2.0.5'
        immutable: 'lib/immutable-3.8.1.min'
        handlebars: 'lib/handlebars-v4.0.5'
        sockjs: 'lib/sockjs-1.0.0.min'

    define ['./base', './org', './docOrg'], (Base, Org, DocOrg)->
      {
        parseOrgMode
        Fragment
        Headline
        headlineRE
      } = Org
      {
        orgDoc
        getCodeItems
        blockSource
      } = DocOrg

      exports = {
        Org
        DocOrg
      }
      atomView.setTools exports
      exports
