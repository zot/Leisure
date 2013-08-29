var Trie = function(children){
	return { children : children }
}

var assoc = function(trie, key, val) {
	var o = {}
	for ( var p in trie.children ) o[p] = trie.children[p]
	o[key] = val
	return { children: o }
}

var dissoc = function(trie, key) {
	var o = {}
	for ( var p in trie.children ) o[p] = trie.children[p]
	delete o[key]
	return { children: o }
}

var get = function(trie, key) {
	return trie.children[key]
}

var has = function(trie, key) {
	return key in trie.children
}

var keys = function(trie){
	var ks = []
	for ( var p in trie.children ) ks.push(p)
	return ks
}

var mutable = function(trie){
	var o = {}
	for ( var p in trie.children ) o[p] = trie.children[p]
	return o
}

module.exports = {
	Trie: Trie,
	assoc: assoc,
	dissoc: dissoc,
	get: get,
	has: has,
	keys: keys,
	mutable: mutable
}
