(function(){
    U = require('util')
    LZ = require('./lazp.js')

    exports.assertEq = assertEq
    exports.assertEval = assertEval
    exports.assertParse = assertParse
    exports.runTests = runTests

    function assertEq(actual, expected, desc) {
	if (expected != actual) throw new Error((desc ? "[" + desc + "] " : "") +  "Expected <" + expected + "> but got <" + actual + ">")
    }
    function assertEval(actual, expected, desc) {
	assertEq(LZ.eval(LZ.gen(LZ.parse(actual))[0]), expected, desc || actual)
    }
    function assertParse(actual, expected, desc) {
	assertEq(LZ.astPrint(LZ.parse(actual)), expected, desc || actual)
    }

    function runTests(arg) {
	var args = typeof arg == 'object' && arg.constructor == Array ? arg : arguments

	for (var i = 0; i < args.length; i++) {
	    try {
		args[i]()
		U.print('.')
	    } catch (err) {
		U.print("\nFailure, ", args[i].name, ": ", err.stack)
	    }
	}
	U.print("\nDone")
    }
})()