'use strict'

var a = require('assert')
var im = require('..')

describe('Nodes', function(){
	describe('Trie', function(){
		it('should construct properly', function(){
			var children = { 0: {} }
			var t = im.Trie(children)

			a.equal(t.type, 'trie')
			a.deepEqual(t.children, children)
		})    
	})

	describe('Value', function(){
		it('should construct properly', function(){
			var key = 'my-key'
			var val = 'my-val'
			var v   = im.Value(key, val)

			a.equal(v.type, 'value')
			a.equal(v.value, val)
			a.equal(v.key, key)
		})    
	})

	describe('Hashmap', function(){
		it('should construct properly', function(){
			var values = { 0: {} }
			var hm     = im.Hashmap(values)

			a.equal(hm.type, 'hashmap')
			a.deepEqual(hm.values, values)
		})
	})
})
