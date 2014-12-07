Package.describe({
    summary: "Org file parsing",
});

Package.on_use(function (api) {
    api.add_files('preamble.js', ['server', 'client']);
    api.add_files('lazy.js', ['server', 'client']);
    api.add_files('yaml.js', ['server', 'client']);
    api.add_files('org.coffee', ['server', 'client']);
    api.add_files('docOrg.litcoffee', ['server', 'client']);
    api.export('Org', ['server', 'client']);
    api.export('Lazy', ['server', 'client']);
    api.export('Yaml', ['server', 'client']);

    api.use('coffeescript');
});
