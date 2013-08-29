# immutable-hash-trie

Pure string:val storage, using structural sharing.

[![browser support](https://ci.testling.com/hughfdjackson/immutable-hash-trie.png)](https://ci.testling.com/hughfdjackson/immutable-hash-trie)

## Why

This module forms a possible basis for effecient immutable datastructures; such as those found in Clojure's PersistentHashMap and PersistentVector.

## Install

`npm install immutable-hash-trie`

## Docs

### Trie

```javascript
var im = require('immutable-hash-trie')

var trie = im.Trie()
```

### assoc

Returns a new Trie with the new key:value keys added.

```javascript
var trie1 = im.Trie()
var trie2 = im.assoc(trie1, 'key', { value: true })
```

### dissoc

Returns a new Trie without a specific key

```javascript
var trie1 = im.assoc(im.Trie(), 'key', 'val')
var trie2 = im.dissoc(trie2, 'key')
```

### get

Retrieves a value from a Trie.

```javascript
var trie = im.assoc(im.Trie(), 'key', 'val')
im.get(trie, 'key') //= 'val'
```

### has

Returns `true` or `false`, depending on whether the value is in the Trie.

```javascript
var trie = im.assoc(im.Trie(), 'key', 'val')
im.has(trie, 'key') 		//= true
im.has(trie, 'not-in-here') //= false
```

### Extending assoc/dissoc/get/has

The hashing and equality functions used on the keys can be overidden by passing an opts object to `assoc`, `dissoc`, `get` and `has`.

```javascript
var im = require('immutable-hash-trie')

var opts = {
	eq: function(a, b){ return a === b},
	hash: function(key){ return parseInt(key, 10) }
}

var vector = im.assoc(im.Trie(), 3, 'my-val', opts)
var val = im.get(vector, 3, opts)
var vector2 = im.dissoc(vector, 3, opts)
im.has(vector2, 3, opts) // false
```

## Running tests and benchmarks

`npm test` and `npm run-script benchmark` are your friends.