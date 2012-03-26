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
    R = require('./repl')
    LZ = require('./lazp.js')

    function assertEq(actual, expected, desc) {
	if (expected != actual) throw new Error((desc ? "[" + desc + "] " : "") +  "Expected <" + expected + "> but got <" + actual + ">")
    }
    function assertEval(actual, expected, desc) {
	assertEq(LZ.eval(LZ.gen(LZ.parse(actual))), expected, desc || actual)
    }
    function assertParse(actual, expected, desc) {
	assertEq(LZ.astPrint(LZ.parse(actual)), expected, desc || actual)
    }

    function runTests(arg) {
	var args = typeof arg == 'object' && arg.constructor == Array ? arg : arguments

	R.print("Running Tests...\n")
	for (var i = 0; i < args.length; i++) {
	    try {
		args[i]()
		R.print('.')
	    } catch (err) {
		R.print("\nFailure, ", args[i].name, ": ", err.stack)
	    }
	}
	R.print("\nDone\n")
    }

    exports.assertEq = assertEq
    exports.assertEval = assertEval
    exports.assertParse = assertParse
    exports.runTests = runTests
})()