function resultCode(expr, res, index) {
    process.stdout.write("input: " + expr.format() + "\n")
    process.stdout.write("debruijn: " + expr.debruijn().dformat() + "\n")
}

var data = ''
var stdin = process.openStdin();

LC.resultCode = resultCode

stdin.on('data', function(d) {
    var str = data + d
    var lines = str.split('\n')

    if (str[str.length - 1] != '\n') {
	data = lines[lines.length - 1]
	for (var i = 0; i < lines.length - 1; i++) {
	    if (lines[i]) line(lines[i])
	}
    } else {
	data = ''
	for (var i = 0; i < lines.length; i++) {
	    if (lines[i]) line(lines[i])
	}
    }
})

process.stdin.on('end', function() {
    process.exit()
})

function line(l) {
//    process.stdout.write("line: " + l + "\n")
    LC.evalLine(l)
}
