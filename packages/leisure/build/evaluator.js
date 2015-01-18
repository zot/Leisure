Evaluator = {};

(function(root) {
    var pending = {};
    var pendingCount = 0;

    function loadScript(filename, configure) {
        if (pending[filename]) return Promise.resolve(0);
        var s1 = document.createElement('script');
        
        var promise = new Promise(function(resolve, reject) {
            pending[filename] = resolve;
        });

        configure(s1, "Evaluator.continueLoading(" + JSON.stringify(filename) + ");");
        document.head.appendChild(s1);
        return promise;
    }

    function continueLoading(filename, script) {
        console.log("Continuing after loading " + filename);
        if (pending[filename]) {
            pending[filename](0);
            delete pending[filename];
        }
    }
    
    function loadCoffee(file) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest;
            xhr.addEventListener("error", reject);
            xhr.addEventListener("load", resolve);
            xhr.open("GET", file);
            xhr.send(null);
        }).then(function(result) {
            var opts = {
                literate: file.match(/\.litcoffee$/),
                filename: file + ".js",
                sourceMap: true,
                //sourceFiles: [file],
                inline: true
            };
            var comp = CoffeeScript.compile(result.target.response, opts);

            //console.log("COMPILED: \n" + comp.js);
            return loadScript(file, function(script, trigger) {
                script.textContent = comp.js + "\n" + trigger + "\n//# sourceMappingURL=data:application/json," + encodeURIComponent(comp.v3SourceMap) + '\n';
            });
        });
    }

    function loadJS(file) {
        return loadScript(file, function(script, trigger) {
            script.src = file;
            script.setAttribute('onload', trigger);
        });
    }

    function loadFiles(fileArray) {
        var p = Promise.resolve(0);

        for (var i = 0; i < fileArray.length; i++) {
            (function(file) {
                if (file.match(/\.(lit)?coffee$/)) {
                    p = p.then(function() {return loadCoffee(file)});
                } else if (file.match(/.js$/)) {
                    p = p.then(function() {return loadJS(file)});
                }
            })(fileArray[i]);
        }
        return p;
    }

    function init() {
        loadFiles(["evaluator.litcoffee"])
            .then(function(){console.log("done loading")});
    }

    root.init = init;
    root.continueLoading = continueLoading;
    root.loadFiles = loadFiles;
    root.pending = pending;
})(Evaluator);
