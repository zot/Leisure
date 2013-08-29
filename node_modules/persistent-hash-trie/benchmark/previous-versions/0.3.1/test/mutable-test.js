'use strict'

var a = require('assert')
var p = require('..')

describe('mutable', function(){
    it('should return a mutable version of a Trie', function(){
        var t1 = p.assoc(p.Trie(), 'key', 'value')
        var t2 = p.assoc(t1, 'other-key', 'other-value')

        var o = p.mutable(t2)
        a.deepEqual(o, { key: 'value', 'other-key': 'other-value' })
    })
})
