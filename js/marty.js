
var currenciesHandler = require('./currencies-handler');
var orderbook = require('./orderbook');

function getPairs () {
	var pairs = currenciesHandler.getPairs (false);
	for (var i = 0; i < 1; i ++) {//pairs.length; i ++) {
		var pair = pairs[i];
		var base = getCurrencyAttributes (pair[0], ['currency', 'issuer_address', 'exchange_ref']);
		var trade = getCurrencyAttributes (pair[1], ['currency', 'issuer_address', 'exchange_ref']);
		orderbook.requestBidAndAsk ([base, trade]);
		//console.log (currenciesHandler.getCurrencyAttributes (pair[0], ['currency', 'issuer_address', 'exchange_ref']));
		//console.log (currenciesHandler.getCurrencyAttributes (pair[1], ['currency', 'issuer_address', 'exchange_ref']));
	}
}

getPairs ();

