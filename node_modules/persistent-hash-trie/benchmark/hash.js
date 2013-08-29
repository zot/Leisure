'use strict'

var _ = require('lodash')
var gen = require('./gen-keys')
var p = require('..')
var hashes = require('./hashes')

var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('hash functions with ' + quantity + ' members')
	var keys = gen.words(quantity)

	var test = function(hash, name){

		var opts = {
			eq: function(a, b){ return a === b },
			hash: hash
		}

		var trie = _.reduce(keys, function(trie, key){
			return p.assoc(trie, key, true, opts)
		}, p.Trie())

		suite.add(name, function(){
			p.assoc(trie, 'key', 'value', opts)
		})
	}

	_.each(hashes, test)

	return suite
}

module.exports = makeSuite
