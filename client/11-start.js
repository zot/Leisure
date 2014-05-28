if (!window.Leisure) window.Leisure = {};
window.global = window;
window.module = {exports: window.Leisure}
Error.stackTraceLimit = Infinity;
window.setTimeout(function() {
    $('body').attr('class', "loading not-logged-in")
}, 1);
