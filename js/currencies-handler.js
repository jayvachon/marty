
var fs = require('fs');
var currencies = JSON.parse(fs.readFileSync('currencies.json', 'utf8'))['currencies'];

exports.findCurrencyWithChar = function (char_ref, vals) {
	for (var i = 0; i < currencies.length; i ++) {
		if (currencies[i]['char_ref'] == char_ref) {
			var return_vals = [];
			for (var j = 0; j < vals.length; j ++) {
				return_vals.push(currencies[i][vals[j]]);
			}
			return return_vals;
		} 
	}
};

//console.log (findCurrencyWithChar ('g', ['currency', 'issuer_address']));