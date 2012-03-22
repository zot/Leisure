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
Tests for Lazp
*/

(function(){
    var U = require('util')
    var LZ=require('./lazp.js')
    var T = require('./testing.js')
    
    function test1() {
	T.assertParse("\\x.x x y", "lambda x . apply (apply (ref x) (ref x)) (lit y)", "\\x.x x y")
    }
    function test2() {
	T.assertEval("(\\x . x) hello", 'hello')
    }
    function test3() {
	T.assertEval("eval (_apply (_lambda x (_ref x)) (_lit hello))", 'hello')
    }

    T.runTests([
	test1,
	test2,
	test3,
    ])
})()