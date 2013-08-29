var hash = require('string-hash')
var _ = require('lodash')

// generates an object with randomly-keyed properties
var gen = function(propNum, seed){
	var keys = _.map(Array(propNum), function(_, i){ return hash(seed + i + '') })

	return _.reduce(keys, function(curr, key){ 
		curr[key] = true
		return curr
	}, {})
}

module.exports = gen