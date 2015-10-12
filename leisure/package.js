Package.describe({
    summary: "Leisure"
});

Package._transitional_registerBuildPlugin({
    name: "compileLeisure",
    use: ['coffeescript', 'org'],
    sources: [
        'plugin/compilerPlugin.litcoffee'
    ]
});
