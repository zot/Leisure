requirejs.config({
    //baseUrl: (new URL(requirejs.leisureCompiled ? 'build' : 'src', document.location)).pathname.replace(/\/.*:/, ''),
    baseUrl: '../src',
    //disableCoffeeScript: true,
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        jqueryui: 'lib/jquery-ui-1.9.1.custom.min'
    }});

require(['jquery', 'jqueryui', 'cs!../test/testPeerCode.litcoffee'], function(jq, jqui, peerCode) {
    window.Peer = peerCode;
});
