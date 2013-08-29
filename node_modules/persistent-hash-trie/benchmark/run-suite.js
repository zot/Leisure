'use strict'

var print = require('./print-results')

module.exports = function(suite){
	suite.on('complete', print)
	suite.run({})
}