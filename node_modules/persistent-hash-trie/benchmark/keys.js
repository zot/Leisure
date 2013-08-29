'use strict'

var _ = require('lodash')
var gen = require('./gen-keys')
var versions = require('./versions')

var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('keys of Trie with ' + quantity + ' members')
	var keys = gen.words(quantity)

	var test = function(o){
		var name = o.name
		var p = o.module

		var trie = _.reduce(keys, function(trie, key){
			return p.assoc(trie, key, true)
		}, p.Trie())

		if ( p.keys ) {
			suite.add(name, function(){
				p.keys(trie)
			})
		}
	}

	_.each(versions, test)

	return suite
}

module.exports = makeSuite
