'use strict'

var a = require('assert')
var p = require('..')

describe('mutable', function(){

	it('should have 1 param', function(){
		a.equal(p.mutable.length, 1)
	})

    it('should return a mutable version of a Trie', function(){
        var t1 = p.assoc(p.Trie(), 'key', 'value')
        var t2 = p.assoc(t1, 'other-key', 'other-value')

        var o = p.mutable(t2)
        a.deepEqual(o, { key: 'value', 'other-key': 'other-value' })
    })

    it('should be unaffected by changing the prototype', function(){
        Object.prototype.foo = 'bar'
        a.deepEqual(p.mutable(p.Trie()), {})

        delete Object.prototype.foo
    })

})
