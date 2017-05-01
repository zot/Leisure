//Main Leisure program

require(['./config'], function() {
    return require(['bluebird'], function(bluebird) {
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
        return new Promise(function(succ, fail) {
          require(['./local'], function() {
            succ();
          });
        });
    });
});
