
var currenciesHandler = require('./currencies-handler');
var permutations = require('./permutations');

function getCurrencyPairs () {
	var pairs = permutations.getPairs(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']);
	for (var i = 0; i < pairs.length; i ++) {
		console.log('1: ' + currenciesHandler.findCurrencyWithChar (pairs[i][0], ['currency', 'exchange_ref', 'issuer_address']));
		console.log('2: ' + currenciesHandler.findCurrencyWithChar (pairs[i][1], ['currency', 'exchange_ref', 'issuer_address']));
	}
	console.log (pairs.length);
}

getCurrencyPairs ();
