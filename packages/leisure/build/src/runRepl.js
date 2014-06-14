require('coffee-script/register');
(typeof window != 'undefined' ? window : global).Lazy = require('10-lazy');
module.exports = require('./leisureRepl');
