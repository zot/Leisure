'use strict'

require('better-stack-traces')

var a = require('assert')
var p = require('..')
var _ = require('lodash')
var gen = require('../benchmark/gen-data')
var log = function(msg){
    console && typeof console.log === 'function' && console.log(msg)
}

describe('assoc/dissoc/has/get', function(){
    it('should be able to assoc/get', function(){
        var t = p.assoc(p.Trie(), 'key', 'value')

        a.equal(p.get(t, 'key'), 'value')
        a.equal(p.get(t, 'age'), undefined)
    })

    it('should be able to assoc/has', function(){
        var t = p.assoc(p.Trie(), 'key', 'value')

        a.equal(p.has(t, 'key'), true)
        a.equal(p.has(t, 'age'), false)
    })

    it('should be able to assoc/dissoc', function(){
        var t1 = p.assoc(p.Trie(), 'key', 'value')
        var t2 = p.dissoc(t1, 'key')

        a.equal(p.has(t1, 'key'), true)
        a.equal(p.get(t1, 'key'), 'value')
        a.equal(p.has(t2, 'key'), false)
    })

    it('should be able to assoc 2 values', function(){
        var t1 = p.assoc(p.Trie(), 'key', 'value')
        var t2 = p.assoc(t1, 'other-key', 'other-value')

        a.equal(p.has(t1, 'key'), true)
        a.equal(p.get(t1, 'key'), 'value')
        a.equal(p.has(t1, 'other-key'), false)

        a.equal(p.has(t2, 'key'), true)
        a.equal(p.has(t2, 'other-key'), true)
    })
})

describe('using random data', function(){

    var seed = Math.random()
    var data = gen(10000, seed)

    // get the first 10 keys of the randomly genned data
    var first10 = (function(){
        var a = []
        for ( var p in data ) {
            a.push(p)
            if ( a.length === 10 ) return a
        }
    })()

    log('TESTING SEED: ' + seed)

    describe('assoc/dissoc/has/get on trie w/ 10000 items', function(){

        // create a trie of 10000 items
        var trie =  _.reduce(data, function(trie, val, key){
            return p.assoc(trie, key, val)
        }, p.Trie())

        it('should return not undefined for gets from first 10 keys', function(){
            _.each(first10, function(prop){
                a.notEqual(p.get(trie, prop), undefined)
            })
        })

        it('should return true for has from first 10 keys', function(){

            _.each(first10, function(prop){
                a.equal(p.has(trie, prop), true)
            })
        })

        it('should allow us to assoc over first 10 keys', function(){

            var testVal = {}

            var t = _.reduce(first10, function(trie, key){
                return p.assoc(trie, key, testVal)
            }, trie)

            _.each(first10, function(prop){
                a.equal(p.get(t, prop), testVal)
            })
        })

        it('should allow us to dissoc first 10 keys', function(){

            var t = _.reduce(first10, function(trie, key){
                return p.dissoc(trie, key)
            }, trie)

            _.each(first10, function(prop){
                a.ok(!p.has(t, prop))
            })
        })

        describe('transient', function(){
            it('should return the same object that\'s put in to the trie', function(){
                a.equal(Object.keys(p.transient(trie)).length, Object.keys(data).length)
                a.deepEqual(p.transient(trie), data)
            })
        })
    })

    describe('assoc/dissoc/has/get on trie w/ 10000 items from depth 4', function(){

        // create a trie of 10000 items
        var trie =  _.reduce(data, function(trie, val, key){
            return p.assoc(trie, key, val, null, 4)
        }, p.Trie())

        it('should return not undefined for gets from first 10 keys', function(){
            _.each(first10, function(prop){
                a.notEqual(p.get(trie, prop, null, 4), undefined)
            })
        })

        it('should return true for has from first 10 keys', function(){

            _.each(first10, function(prop){
                a.equal(p.has(trie, prop, null, 4), true)
            })
        })

        it('should allow us to assoc over first 10 keys', function(){

            var testVal = {}

            var t = _.reduce(first10, function(trie, key){
                return p.assoc(trie, key, testVal, null, 4)
            }, trie)

            _.each(first10, function(prop){
                a.equal(p.get(t, prop, null, 4), testVal)
            })
        })

        it('should allow us to dissoc first 10 keys', function(){

            var t = _.reduce(first10, function(trie, key){
                return p.dissoc(trie, key, null, 4)
            }, trie)

            _.each(first10, function(prop){
                a.ok(!p.has(t, prop, null, 4))
            })
        })
    })
})
