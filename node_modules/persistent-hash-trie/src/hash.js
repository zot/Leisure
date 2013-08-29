//# Hashing functions

// Int, Int -> Int
// gets a <= 5 bit section of a hash, shifted from the left position
// in practice, a 32 bit splits into 7 chunks - 6 of 5 bits, one of 2
var mask = function(hash, from){ return (hash >>> from) & 0x01f }

// String, Int, Function -> Int
// gets a chunk of a hash, given a string and a hashing function
// the hashing function should return a 32 bit hash.
var hashMask = function(str, from, hash){
    return mask(hash(str), from)
}

module.exports = {
	hash: require('string-hash'),
	mask: hashMask
}
