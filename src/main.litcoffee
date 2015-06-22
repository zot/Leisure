Main Leisure program

    requirejs.config
        baseUrl: 'src'
        paths:
            # the left side is the module ID,
            # the right side is the path to
            # the jQuery file, relative to baseUrl.
            # Also, the path should NOT include
            # the '.js' file extension. This example
            # is using jQuery 1.9.0 located at
            # js/lib/jquery-1.9.0.js, relative to
            # the HTML page.
            jquery: 'lib/jquery-2.1.4.min',
            jqueryui: 'lib/jquery-ui-1.9.1.custom.min'

    require ['jquery', 'jqueryui', 'cs!local.litcoffee'], ->
          console.log $

          setTimeout (-> $('body').attr('class', "loading not-logged-in")), 1
