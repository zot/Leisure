//Main Leisure program

requirejs.config({
    //baseUrl: (new URL(requirejs.leisureCompiled ? 'build' : 'src', document.location)).pathname.replace(/\/.*:/, ''),
    //baseUrl: requirejs.leisureCompiled ? 'build' : 'src',
    // disable coffeescript if this is true
    // this will load *.js files instead of *.coffee or *.litcoffee
    disableCoffeeScript: requirejs.leisureCompiled,
    
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'lib/jquery-2.1.4.min',
        jqueryui: 'lib/jquery-ui-1.9.1.custom.min',
        
        underscore: 'lib/underscore-min',
        acorn: 'lib/acorn-2.0.5',
        acorn_loose: 'lib/acorn_loose-2.0.5',
        acorn_walk: 'lib/acorn_walk-2.0.5',
        immutable: 'lib/immutable-3.7.4.min'
    }
});

require(['lib/bluebird.min'], function(bluebird) {
    require.promise = function(names) {
        return new bluebird.Promise(function(resolve, reject) {
            require(names, function() {
                console.log("REQUIRED", arguments);
                resolve(arguments);
            });
        });
    };
    define.promise = function(names) {
        return new bluebird.Promise(function(resolve, reject) {
            require(names, function() {
                console.log("REQUIRED", arguments);
                resolve(arguments);
            });
        });
    };
    require(['jquery', 'jqueryui', 'lib/lodash.min', 'cs!base', 'cs!ast', 'cs!domCursor.litcoffee', 'cs!editor.litcoffee', 'cs!diag.litcoffee', 'cs!org', 'lib/yaml', 'lib/lazy', 'cs!docOrg.litcoffee', 'cs!runtime', 'cs!eval.litcoffee', 'cs!editorSupport.litcoffee', 'cs!local.litcoffee'], function(jq, jqui, lodash){
        setTimeout(function(){$('body').attr('class', "loading not-logged-in");}, 1);
    });
});
