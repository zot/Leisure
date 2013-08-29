'use strict'

var util = require('./util')

//# persistent Hash Trie

// A Trie is a specialised version of a Tree, in which nodes can be found by navigating a 'path'.
// For instance, a dictionary Trie may start with a root node, have A-Z as the child nodes.
// Those child nodes may also be Tries (commonly referred to as sub-Tries).  Therefore, if
// you want to look up 'ANT', you can see if it's in the Trie by navigating to node A, then to
// node A's child node N, then to that node's child node T.  i.e. the path for ANT is A->N->T

// A Hash Trie forms its path by taking a hash of the string that is being looked up, and
// splitting that into parts:
// ANT = 01101101101110111010111011000011 = 01101->10110->11101->11010->11101->10000->11
// In this scheme, a 32-bit hash is taken, and split into path parts that are maximally
// 5 bits long.  Each Trie therefore has children from 00000-11111 (or 0-31 in decimal).

// Hash Tries allow us to store nodes at a shallow depth.  For instance, if there is only
// one member of the Trie whose key's first path part is 01101, then we can store the value
// directly as the root Trie's 01101 child node.  Why go deeper?  It just costs more to retrieve.

// It also allows us to keep the Trie fairly balanced; since a hash function should be
// have an even distribution of hashes, even if the inputs share common prefixes.
// If we used the first 2 letters of a word, for instance, we'd end up with lots of
// nodes in the 'un' and 'th' paths, and not many in the 'tx' path.

// An persistent Hash Trie is a Hash Trie in which any commonly updating actions - removing,
// setting or adding values - produce an entirely new Hash Trie, and *don't* affect the
// original in any way.  This means that the Hash Tries can be shared safely; without fear
// that updating them will result in a value changing in multiple places in a program.

// To make this distinction clearer, the verbs 'set' and 'remove/delete' have been replaced
// with assoc (associate a new value with an persistent Hash Trie), and dissoc (dissociate
// an existing value with an persistent Hash Trie).

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


// hash function for strings, based on Java's String.hashCode:
// http://docs.oracle.com/javase/1.4.2/docs/api/java/lang/String.html#hashCode()
var hash = function(str){
    var h = 0
    var l = str.length
    for ( var i = 0; i < l; i += 1 )
        h += str.charCodeAt(i) * 31 * l - i
    return h
}

// to allow hooks for other implementations/tests to override the default
// hash and equality functions (which are the necessary ones for creating
// hash-table-like behaviour, as the hash-trie has), they can be passed in
// as opts to the CRUD functions.  The default ones covers the 80% use-case
var defaultOpts = {
    eq  : function(a, b){ return a === b },

    hash: hash
}

//# Node Types

// Object -> Trie
// a Trie is a store of children values; the most basic type of non-leaf node.
var Trie = function(children){
    return { type: 'trie', children: children || {} }
}

// String, JSValue -> Value
// Node that represents a specific value
var Value = function(key, value){
    return { type: 'value', key: key, value: value }
}

// { JSValue } -> Hashmap
// a Trie will have a max depth of 7 (6, if 0 indexed).  After that, additional
// values will just slung into a hashmap node
var Hashmap = function(values){
    return { type: 'hashmap', values: values }
}


//# Basic manipulation functions - has/get/assoc/dissoc

// Node, String, (Int), (Object)-> Bool

// Trie-equivalent of the 'in' operator.

// Has recurses down a node, using hashMask to navigate a 'path' down branches.
// If a value node is found, if its key is equal to the key provided, then the
// Trie contains the key, and true is returned.

// Hashmaps store values in the outermost leaves when necessary.  If they contain
// a key, it also means that the key is in the trie,.
var has = function(trie, key, opts, depth){
    return hasFns[trie.type](trie, key, opts || defaultOpts, depth || 0)
}

var hasFns = {
    trie: function(node, key, opts, depth){
        var child = node.children[hashMask(key, depth, opts.hash)]
        if ( child === undefined )    return false
        else                          return has(child, key, opts, depth + 1)
    },
    value: function(node, key, opts){
        return opts.eq(node.key, key)
    },
    hashmap: function(node, key, opts){
        return key in node.values
    }
}

// Node, String, (Int), (Object) -> Value

// Trie-equivalent of dot or bracket syntax - retrieves a value assocaited with a key
// or undefined.

// get recurses down the Trie, similarly to has.  If it finds a matching key, instead
// of returning true or false, however, it unpacks the value associated with the key
// and returns that instead.
var get = function(trie, key, opts, depth){
    return getFns[trie.type](trie, key, opts || defaultOpts, depth || 0)
}

var getFns = {
    trie: function(node, key, opts, depth){
        var child = node.children[hashMask(key, depth, opts.hash)]
        if ( child === undefined )    return undefined
        else                          return get(child, key, opts, depth + 1)
    },
    value: function(node, key, opts, depth){
        if ( opts.eq(node.key, key) ) return node.value
    },
    hashmap: function(node, key, opts, depth){
        var value = node.values[key]
        return  value ? value.value : undefined

    }
}


// Object, String, JSValue -> Object

// creates a shallow clone of an object, adding or replacing a key:val pair
// with the one provided

// necessary for updating nodes in `assoc`
var copyAdd = function(obj, key, val){
    obj = util.clone(obj)
    obj[key] = val
    return obj
}


//  Node, String, JSValue, (Int) -> Trie

// assoc 'associates' a new value with a Trie.  It does so by finding the
// appropriate place for the new node, then creating a copy of the parent
// nodes, adding in a reference to the newly created child node each time.

// This is called path-copying, since the path from the root node to the new
// node is copied form one datastructure to the other.  Since the vast majority
// of data will lie in nodes beneathe these in sizable datastructures, this sharing
// of data allows for persistent values to be updated relatively effeciently at large
// size.

// The algorithm is also aware of 'specificity'; i.e. that a value need only be stored
// at a depth where it can be distinguished uniquely from other values by virtue of its
// path.  If both 'foo' and 'bar's first 5 bits are 011011, and both are present in the
// Trie, then they most be stored in a sub-Trie, and use the following 5 bits to differenciate
// themselves.  If the Trie gets deeper than there are bits in the hash (i.e. a total hash collision)
// then it simply stores the objects in a Hashmap node.

var assoc = function(node, key, val, opts, depth){
    return assocFns[node.type](node, key, val, opts || defaultOpts, depth || 0)
}

var assocFns = {
    trie: function(node, key, val, opts, depth){
        var path = hashMask(key, depth, opts.hash)
        var child = node.children[path]

        if ( child === undefined  ) return Trie(copyAdd(node.children, path, Value(key, val)))
        else                        return Trie(copyAdd(node.children, path, assoc(child, key, val, opts, depth + 1)))
    },
    value: function(node, key, val, opts, depth){
        var origPath = hashMask(node.key, depth, opts.hash)
        var path     = hashMask(key, depth, opts.hash)

        var makeHashmap = function(){
            var children = {}
            children[key] = Value(key, val)
            children[node.key] = node
            return Hashmap(children)
        }

        var resolveShallowConflict = function(){
            var children = {}
            children[origPath] = node
            children[path]     = Value(key, val)

            return Trie(children)
        }

        var resolveDeepConflict = function(){
            var children = {}
            children[path] = assoc(node, key, val, opts, depth + 1)
            return Trie(children)
        }

        var makeTrie = function(){
            if ( origPath !== path ) return resolveShallowConflict()
            else                     return resolveDeepConflict()
        }

        if ( opts.eq(node.key, key) ) return Value(key, val)
        else if ( depth > 6 )         return makeHashmap()
        else                          return makeTrie()
    },
    hashmap: function(node, key, val, opts, depth){
        var v = copyAdd(node.values, key, Value(key, val))
        return Hashmap(v)
    }
}

// Object, String -> Object

// creates a new object, but without a key.
// Used in `dissoc`
var copyDissoc = function(obj, key){
    obj = util.clone(obj)
    delete obj[key]
    return obj
}

// Object -> [String]

// get the keys of an object
var keys = Object.keys || function(o){
    var a = []
    for ( var key in o ) a.push(key)
    return a
}

// Node, String, (Int) -> Trie

// dissoc (disassociate) returns a new Trie, but without a specified key

// As with assoc, it recurses down the Trie.  If it fails to find a key, then
// it returns the original Trie, since that is conceptually the same as removing
// a non-existant key from an object.

// If it finds a Value associated with a key, however, it will create
// a parent node to that Value that copies all *other* values, but omits
// the value with the key in question.  As with assoc, it will also produce a
// copy of *its* parent.  This occurs recursively, and is exactly the same concept
// as the 'path copying' technique used in assoc.

// If removing a value removes a hash collision, then the Trie node that contained
// those values can be replaced with just a Value node, which results in a shallower
// Trie.
var dissoc = function(node, key, opts, depth){
    return dissocFns[node.type](node, key, opts || defaultOpts, depth || 0)
}

var dissocFns = {
    trie: function(node, key, opts, depth){
        var path = hashMask(key, depth, opts.hash)
        var child = node.children[path]
        var trie

        // handle the 'missing key' case, returning the Trie
        if ( child === undefined ) trie = node

        // handle the 'present key' cases.  If it's a Value, remove it.  If it's a sub-Trie or Hashmap
        // recurse to prevent other values from being lost
        else if ( child.type === 'value' && opts.eq(child.key, key) )
            trie = Trie(copyDissoc(node.children, path))
        else
           trie = Trie(copyDissoc(node.children, path, dissoc(child, key, opts, depth + 1)))

        // if there's only a single value in a Trie node left, then it can be replaced by its value,
        // allowing us to make the Trie more shallow, and therefore more effecient.
        var names = keys(trie.children)
        var child = trie.children[names[0]]

        if ( names.length === 1 && child && child.type === 'value' )
            return Value(child.key, child.value)
        else
            return trie
    },
    value: function(){},
    hashmap: function(map, key, opts, depth){
        var ret = copyDissoc(map.values, hashMask(key, depth, opts.hash))
        var names = keys(ret)
        var child = ret[names[0]]

        if ( names.length === 1 ) return Value(child.key, child.value)
        else                      return Hashmap(ret)
    }
}


// Node -> Object

// transient returns a mutable version of a Trie.

// It achieves this by recursing down the Trie, finding all the Value nodes
// (whether stored in a Trie directly, or in a Hashmap node), and adding
// the values to a return value.

//  (yay abusing mutability in small pieces, but keeping the function
// pure from an API perspective)

var transient = function(node, curr){
    curr = curr || {}
    transientFns[node.type](node, curr)
    return curr
}

var transientFns = {
    trie: function(node, curr){
        for ( var key in node.children ) transient(node.children[key], curr)
    },
    value: function(node, curr){
        curr[node.key] = node.value
    },
    hashmap: function(node, curr){
        for ( var key in node.values ) transient(node.values[key], curr)
    }
}

module.exports = {
    Trie      : Trie,
    Value     : Value,
    Hashmap   : Hashmap,
    has       : has,
    get       : get,
    assoc     : assoc,
    dissoc    : dissoc,
    transient : transient
}
