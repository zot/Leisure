//Main Leisure program

require(['./config', 'lib/bluebird.min'], function(bluebird) {
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
    require(['./local']);
});
