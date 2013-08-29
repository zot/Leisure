# persistent-hash-trie

Pure string:val storage, using structural sharing.

[![browser support](https://ci.testling.com/hughfdjackson/persistent-hash-trie.png)](https://ci.testling.com/hughfdjackson/persistent-hash-trie)

## Why

This module forms a possible basis for effecient persistent datastructures; such as those found in Clojure's PersistentHashMap and PersistentVector.

## Install

`npm install persistent-hash-trie`

## Docs

### Trie

```javascript
var p = require('persistent-hash-trie')

var trie = p.Trie()
```

### assoc

Returns a new Trie with the new key:value keys added.

```javascript
var trie1 = p.Trie()
var trie2 = p.assoc(trie1, 'key', { value: true })
```

### dissoc

Returns a new Trie without a specific key

```javascript
var trie1 = p.assoc(p.Trie(), 'key', 'val')
var trie2 = p.dissoc(trie2, 'key')
```

### get

Retrieves a value from a Trie.

```javascript
var trie = p.assoc(p.Trie(), 'key', 'val')
p.get(trie, 'key') //= 'val'
```

### has

Returns `true` or `false`, depending on whether the value is in the Trie.

```javascript
var trie = p.assoc(p.Trie(), 'key', 'val')
p.has(trie, 'key') 		//= true
p.has(trie, 'not-in-here') //= false
```

### mutable

Returns a mutable copy of a Trie, in the form of a js object.

```javascript
var trie = p.assoc(p.Trie(), 'key', 'val')
p.mutable(trie) //= { key: 'val' }
```

### keys

Returns an array of all keys in the trie

```javascript
var trie = p.assoc(p.Trie(), 'key', 'val')
p.keys(trie) //= ['key']
```

### Extending assoc/dissoc/get/has

The hashing and equality functions used on the keys can be overidden by passing an opts object to `assoc`, `dissoc`, `get` and `has`.

```javascript
var p = require('persistent-hash-trie')

var opts = {
	eq: function(a, b){ return a === b},
	hash: function(key){ return parseInt(key, 10) }
}

var vector = p.assoc(p.Trie(), 3, 'my-val', opts)
var val = p.get(vector, 3, opts)
var vector2 = p.dissoc(vector, 3, opts)
p.has(vector2, 3, opts) // false
```

## Running tests and benchmarks

`npm test` and `npm run benchmark` are your friends.
