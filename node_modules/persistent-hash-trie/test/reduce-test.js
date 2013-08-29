'use strict';

var a = require('assert')
var p = require('..')
var _ = require('lodash')

describe('reduce', function(){

	it('should have 1 param', function(){
		a.equal(p.mutable.length, 1)
	})

    var t = p.assoc(p.Trie(), '0', 'a')
    t = p.assoc(t, '1', 'b');
    t = p.assoc(t, '2', 'c');

    it('should iterate over a trie', function(){
        var aggregate = function(arr, v, k){
            arr.push({ value: v, key: k })
            return arr
        }

        var arr = p.reduce(t, aggregate, [])

        a.equal(arr.length, 3)

        a.deepEqual(_.find(arr, function(o){ return o.value === 'a' }), { key: '0', value: 'a' })
        a.deepEqual(_.find(arr, function(o){ return o.value === 'b' }), { key: '1', value: 'b' })
        a.deepEqual(_.find(arr, function(o){ return o.value === 'c' }), { key: '2', value: 'c' })
    })

    it('should break iterator if transient.Break gets thrown', function(){
        var iterate = function(){
            return p.reduce.Break("my-return-value")
        }

        var value = p.reduce(t, iterate, [])
        a.equal(value, "my-return-value")
    })
})
