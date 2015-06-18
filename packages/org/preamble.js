Org = {};
Leisure = ((typeof window != 'undefined') && window.Leisure) || {};

if (typeof require != 'undefined') {
    //console.log("require defined");
    module.exports = Org;
} else if (typeof global != 'undefined') {
    //console.log("global defined");
    global.Org = Org;
    global.Leisure = Leisure;
} else {
    //console.log("window defined");
    window.Org = Org;
    window.Leisure = Leisure;
    window.require = function(){return Leisure;};
    if (!window.module) {
        window.module = {};
    }
}
