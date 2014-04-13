console.log("PACKAGE");

Package.describe({
    summary: "Leisure"
})

var files = [
    'build/lib/jquery-1-8-2.min.js',
    'build/src/start.js',
    'build/lib/browser.js',
    'build/src/uri',
    'build/src/shim',
    'build/src/base',
    'build/src/ast',
    'build/src/runtime',
    'build/src/gen',
    'build/lib/generatedPrelude.js',
    'build/lib/std.js',
    'build/src/browserSupport',
    'build/lib/svg.js',
    'build/src/collaborate.litcoffee',
    'build/src/org',
    'build/src/orgSupport',
    'build/src/githubExtensions',
    'build/src/storage',
    'build/src/notebook',
    'build/src/fancyOrg',
    'build/lib/parseAst.js',
    'build/lib/mutation-summary.js',
];

Package.on_use(function (api) {
    api.use('coffeescript');
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (!file.match(/\./)) {
            file += '.coffee';
        }
        api.add_files(file, 'client');
    }
});
