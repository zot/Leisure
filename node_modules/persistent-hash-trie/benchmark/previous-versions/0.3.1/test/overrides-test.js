'use strict'

var a = require('assert')
var p = require('..')
var _ = require('lodash')

describe('overriding default hash and eq opts', function(){

    var equal = function(){ return true }
    var hash = function(){ return 1 }
    var opts = { hash: hash, eq: equal }

    it('should be available in assoc', function(){
        var t = p.assoc(p.Trie(), 'key', 'value', opts)
        a.equal(t.children[1].key, 'key')
    })

    it('should be available in dissoc', function(){
        var t = p.assoc(p.Trie(), 'key', 'value', opts)
        var t = p.dissoc(t, 'some-non-present-key', opts)

        a.ok(_.isEmpty(t.children))
    })

    it('should be available in get', function(){
        var t = p.assoc(p.Trie(), 'key', 'value', opts)
        a.equal(p.get(t, 'some-non-present-key', opts), 'value')
    })

    it('should be avilable in has', function(){
        var t = p.assoc(p.Trie(), 'key', 'value', opts)
        a.equal(p.has(t, 'some-non-present-key', opts), true)
    })
})
