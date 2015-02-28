var orderbook = require('./orderbook-request');
var currenciesHandler = require('./currencies-handler');
var ripple = require('ripple-lib');
var Remote = require('ripple-lib').Remote;

var remote = new ripple.Remote({
	servers: [
		{ host: 's1.ripple.com', port: 443, secure: true }
	]
});

function sendPairsToOrderbook () {
	var pairs = currenciesHandler.getPairs (false);
	for (var i = 0; i < pairs.length; i ++) {
		var pair = pairs[i];
		var base = currenciesHandler.getCurrencyAttributes (pair[0], ['currency', 'issuer_address', 'exchange_ref']);
		var trade = currenciesHandler.getCurrencyAttributes (pair[1], ['currency', 'issuer_address', 'exchange_ref']);
		orderbook.getAskBid (remote, base, trade);
	}
}

// Transaction
var MY_ADDRESS = '';
var MY_SECRET  = '';
var GATEWAY = 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'; // BitStamp

remote.connect(function() {
	remote.setSecret(MY_ADDRESS, MY_SECRET);
	sendPairsToOrderbook ();
});