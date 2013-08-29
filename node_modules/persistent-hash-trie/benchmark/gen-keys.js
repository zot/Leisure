var _ = require('lodash')

var repeat = function(count, fn) {
	return _.map(Array(count), fn)
}

var randInt = function(upper){
	return Math.floor(Math.random() * upper)
}

var choose = function(choices) {
	var i = randInt(choices.length)
	return choices[i]
}

var alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')
var upperAlpha = _.invoke(alpha, 'toUpperCase')
var symbols = '!@£$%^&*()_+=-{}[];\'\":\\|,./<>?~`±§'.split('')
var nums = '0123456789'.split('')

var chars = alpha.concat(symbols).concat(upperAlpha).concat(nums)


var makeWord = function(){
	return repeat(randInt(10), function(){ return choose(chars) }).join('')
}

var makeInt = function(){
	var len = randInt(10)
	return repeat(len, function(){ return randInt(9) }).join('')
}

module.exports = {
	words: function(len){
		return repeat(len, makeWord)
	},
	ints: function(len){
		return repeat(len, makeInt)
	}
}
