'use strict'

var a = require('assert')
var im = require('..')

describe('transient', function(){
    it('should return a mutable version of a Trie', function(){
        var t1 = im.assoc(im.Trie(), 'key', 'value')
        var t2 = im.assoc(t1, 'other-key', 'other-value')

        var o = im.transient(t2)
        a.deepEqual(o, { key: 'value', 'other-key': 'other-value' })
    })
})