/*
Copyright (C) 2012, Bill Burdick, Tiny Concepts: http://tinyconcepts.com/fs.pl/lambda.fsl

(licensed with ZLIB license)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software
in a product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/

/*
Wimpy testing framework
*/

(function(){
    var R = require('./repl')
    var LZ = require('./lazp.js')
    
    var stats = {
	successes: 0,
	failures: 0,
    }

    function assertEq(actual, expected, desc) {
	if (expected != actual) throw new Error((desc ? "[" + desc + "] " : "") +  "Expected <" + expected + "> but got <" + actual + ">")
    }
    function assertEval(actual, expected, desc) {
	var code = LZ.gen(LZ.parse(actual))

	if (code.err) throw new Error(code.err)
	assertEq(LZ.astEval(LZ.gen(LZ.parse(actual))), expected, desc || actual)
    }
    function assertParse(actual, expected, desc) {
	assertEq(LZ.astPrint(LZ.parse(actual)), expected, desc || actual)
    }

    function run(name, func) {
	try {
	    func()
	    R.print('.')
	    stats.successes++
	} catch (err) {
	    stats.failures++
	    R.print("\nFailure, ", name, ": ", err.stack)
	}
    }

    function runTests(arg) {
	var args = typeof arg == 'object' && arg.constructor == Array ? arg : arguments

	R.print("Running Tests...\n")
	for (var i = 0; i < args.length; i++) {
	    run(arg[i].name, arg[i])
	}
	R.print("\nDone\n")
    }

    exports.assertEq = assertEq
    exports.assertEval = assertEval
    exports.assertParse = assertParse
    exports.runTests = runTests
    exports.run = run
    exports.stats = stats
})()