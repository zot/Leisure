console.log("PACKAGE");

Package.describe({
    summary: "Leisure"
})

var both = [
    'build/src/org',
    'build/src/namespace.litcoffee',
];

var server = [
    'build/src/server.litcoffee',
];

var client = [
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
    'build/src/orgSupport',
    'build/src/githubExtensions',
    'build/src/storage',
    'build/src/notebook',
    'build/src/fancyOrg',
    'build/lib/parseAst.js',
    'build/lib/mutation-summary.js',
];

function sendFiles(api, files, where) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (!file.match(/\./)) {
            file += '.coffee';
        }
        api.add_files(file, where);
    }
}

Package.on_use(function (api) {
    api.use('coffeescript');
    api.export('Org');
    api.export('Leisure');
    sendFiles(api, both, ['client', 'server']);
    sendFiles(api, server, 'server');
    sendFiles(api, client, 'client');
});
