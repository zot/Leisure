'use strict'

var log = console.log.bind(console)
var formatNumber = require('format-number')({ truncate: 2 })

var print = function(){
	log('')
	log(this.name)
	log('//-------------------------//')

	this.map(function(results){
		log(results.name + ' : ' + formatNumber(results.hz) + ' ± ' + formatNumber(results.stats.rme) + '% ops/sec')
	})
}

module.exports = print
