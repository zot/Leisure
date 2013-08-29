'use strict'

var a = require('assert')
var p = require('..')
var _ = require('lodash')
var gen = require('../benchmark/gen-data')
var log = function(msg){
    typeof console && typeof console.log === 'function' && console.log(msg)
}


describe('assoc', function(){
    it('should have 3 params', function(){
        a.equal(p.get.length, 3)
    })
})

describe('dissoc', function(){
    it('should have 4 params', function(){
        a.equal(p.get.length, 3)
    })
})

describe('get', function(){
    it('should have 3 params', function(){
        a.equal(p.get.length, 3)
    })
})

describe('has', function(){
    it('should have 3 params', function(){
        a.equal(p.has.length, 3)
    })
})

describe('keys', function(){
    it('should have 1 param', function(){
        a.equal(p.keys.length, 1)
    })

    it('should be unaffected by changing the prototype', function(){
        Object.prototype.foo = 'bar'
        a.deepEqual(p.keys(p.Trie()), [])

        delete Object.prototype.foo
    })
})

describe('assoc/dissoc/has/get together', function(){

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

var testWithData = function(data){

    var keys = _.keys(data)

    describe('assoc/dissoc/has/get on trie w/ ' + keys.length + ' items', function(){

        var trie =  _.reduce(data, function(trie, val, key){
            return p.assoc(trie, key, val)
        }, p.Trie())

        it('should return not undefined for get', function(){
            _.each(keys, function(prop){
                a.notEqual(p.get(trie, prop), undefined)
            })
        })

        it('should return true for has', function(){

            _.each(keys, function(prop){
                a.equal(p.has(trie, prop), true)
            })
        })

        it('should allow us to assoc', function(){

            var testVal = {}

            var t = _.reduce(keys, function(trie, key){
                return p.assoc(trie, key, testVal)
            }, trie)

            _.each(keys, function(prop){
                a.equal(p.get(t, prop), testVal)
            })
        })

        it('should allow us to dissoc', function(){
            var t = _.reduce(keys, function(trie, key){
                return p.dissoc(trie, key)
            }, trie)

            _.each(keys, function(prop){
                a.ok(!p.has(t, prop))
            })
        })

        describe('mutable', function(){
            it('should return the same object that\'s put in to the trie', function(){
                a.deepEqual(p.mutable(trie), data)
            })
        })

        describe('keys', function(){
            it('should return an array of keys stored in the trie', function(){
                a.deepEqual(p.keys(trie).sort(), _.keys(data).sort())
            })
        })
    })
}


describe('using random data', function(){
    var seed = Math.random()
    var data = gen(100, seed)
    log('TESTING SEED: ' + seed)

    testWithData(gen(1, seed))
    testWithData(gen(100, seed))
    testWithData(gen(1000, seed))
    testWithData(gen(10000, seed))
})
