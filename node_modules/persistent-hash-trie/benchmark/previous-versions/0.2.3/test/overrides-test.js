'use strict'

var a = require('assert')
var im = require('..')
var _ = require('lodash')

describe('overriding default hash and eq opts', function(){

    var equal = function(){ return true }
    var hash = function(){ return 1 }
    var opts = { hash: hash, eq: equal }

    it('should be available in assoc', function(){
        var t = im.assoc(im.Trie(), 'key', 'value', opts)
        a.equal(t.children[1].key, 'key')
    })

    it('should be available in dissoc', function(){
        var t = im.assoc(im.Trie(), 'key', 'value', opts)
        var t = im.dissoc(t, 'some-non-present-key', opts)

        a.ok(_.isEmpty(t.children))
    })

    it('should be available in get', function(){
        var t = im.assoc(im.Trie(), 'key', 'value', opts)
        a.equal(im.get(t, 'some-non-present-key', opts), 'value')
    })

    it('should be avilable in has', function(){
        var t = im.assoc(im.Trie(), 'key', 'value', opts)
        a.equal(im.has(t, 'some-non-present-key', opts), true)
    })
})