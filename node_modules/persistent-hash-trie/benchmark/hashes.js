

// Bad implementation of java's String#hashCode
var rubbishJava = function(str){
    var h = 0
    var l = str.length
    for ( var i = 0; i < l; i += 1 )
        h += str.charCodeAt(i) * 31 * l - i
    return h
}

// chash
var max32bit = Math.pow(2, 32)
var chash = require('chash')


// sedgewick
var sedgewick = function(s) {
    var b = 27183
    var a = 31415
    var h = 0
    var tableSize = 0x7fffff

    for (var i = 0; i < s.length; i++) {
        h = (a * h + s[i].charCodeAt()) % tableSize;
        a = ((a % tableSize) * (b % tableSize)) % (tableSize);
    }

    return h;
}

// zobel
// based on J. Zobel (2001)
// http://www.seg.rmit.edu.au/code/zwh-ipl/bitwisehash.c
var zobel = function(str){
	var hash = 0
	for ( var i = 0; i < str.length; i += 1 )
		hash ^= ( hash << 5) + str[i] + (hash >> 2)
	return hash % 32
}



module.exports = {
	djb2: require('string-hash'),
	java: require('../src/hash').hash
	// 'bad java': rubbishJava,
	// chash: function(key){ return chash(key, max32bit) },
	// sedgewick: sedgewick,
	// zobel: zobel
}
