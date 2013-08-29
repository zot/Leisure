'use strict'

// Internal
var extend   = function(t, f) { for ( var p in f ) t[p] = f[p]; return t }
var clone    = function(o){ return extend({}, o) }
var slice    = function(a, f, n){ return [].slice.call(a, f, n) }

var mapObj = function(o, fn){
    var r = {}
    for ( var p in o ) r[p] = fn(o[p], p, o)
    return r
}

var map = function(arr, fn){
    var a = []
    for ( var i = 0, l = arr.length; i < l; i += 1 ) a.push(fn(arr[i], i, arr))
    return a
}

var reduce = function(arr, fn){
    var seed = arr[0]
    arr = arr.slice(1)
    for ( var i = 0, l = arr.length; i < l; i += 1) seed = fn(seed, arr[i])
    return seed
}

var pick = function(o){
    var names = slice(arguments, 1),
        r     = {}

    for ( var i = 0, l = names.length; i < l; i += 1 )
        r[names[i]] = o[names[i]]
    return r
}

module.exports = {
    extend    : extend,
    clone     : clone,
    slice     : slice,
    mapObj    : mapObj,
    pick      : pick,
    map       : map,
    reduce    : reduce
}
