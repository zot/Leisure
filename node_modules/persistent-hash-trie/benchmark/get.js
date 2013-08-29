'use strict'

var _ = require('lodash')
var gen = require('./gen-keys')
var versions = require('./versions')

var makeSuite = function(quantity){
	var suite = new require('benchmark').Suite('get property with Trie of ' + quantity)
	var keys = gen.words(quantity, Math.random())

	var test = function(o){
		var name = o.name
		var p = o.module

		var trie = _.reduce(keys, function(trie, key){
			return p.assoc(trie, key, true)
		}, p.Trie())
		trie = p.assoc(trie, 'key', 'val')

		suite.add(name, function(){
			p.get(trie, 'key')
		})
	}

	_.each(versions, test)
	return suite
}

module.exports = makeSuite
