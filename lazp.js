(function(){
var LC=require('./lc.js')
var VM=require('./lcvm.js')

exports.hereDoc = function(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}
})()