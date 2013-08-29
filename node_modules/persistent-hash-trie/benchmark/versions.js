module.exports = [
	{ name: 'shallow-copy reference ', module: require('./reference-versions/shallow-copy.js') },
	// { name: 'current                ', module: require('..') },

	{ name: 'v0.2.1                 ', module: require('./previous-versions/0.2.1/') },
	// { name: 'v0.2.2                 ', module: require('./previous-versions/0.2.2/') },
	// { name: 'v0.2.3                 ', module: require('./previous-versions/0.2.3/') },
	// { name: 'v0.2.4                 ', module: require('./previous-versions/0.2.4/') },
	// { name: 'v0.3.0                 ', module: require('./previous-versions/0.3.0/') },
	{ name: 'v0.3.1                 ', module: require('./previous-versions/0.3.1/') }
]
