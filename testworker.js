var count = 0;

addEventListener('connect', function(e) {
    var port = e.ports[0];

    port.start();
    port.postMessage("hello: " + count++);
});
