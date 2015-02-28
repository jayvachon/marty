
var ripple = require('ripple-lib');
var Remote = ripple.Remote;
var Amount = ripple.Amount;

var currenciesHandler = require('./currencies-handler');
var pairs = currenciesHandler.getPairs (false);

var remote = new ripple.Remote({
	servers: [
		{ host: 's1.ripple.com', port: 443, secure: true }
  	]
});

var mybook_bid = [],
	mybook_ask = [];

function getOrderbook (pair) {
	var BASE = pair[0];
	var TRADE = pair[1];
	mybook_bid.push (remote.book(BASE.currency, BASE.issuer, TRADE.currency, TRADE.issuer));
	mybook_ask.push (remote.book(TRADE.currency, TRADE.issuer, BASE.currency, BASE.issuer));
}

function sendPairsToOrderbook () {
	for (var i = 0; i < pairs.length; i ++) {
		var pair = pairs[i];
		var request = [];
		request[0] = currenciesHandler.getCurrencyAttributes (pair[0], ['currency', 'issuer_address', 'exchange_ref']);
		request[1] = currenciesHandler.getCurrencyAttributes (pair[1], ['currency', 'issuer_address', 'exchange_ref']);
		getOrderbook (request);
	}
}

sendPairsToOrderbook ();

for (var i = 0; i < mybook_bid.length; i ++) {
	mybook_bid.on("model", handleBids);
}

for (var i = 0; i < mybook_ask.length; i ++) {
	mybook_ask.on("model", handleAsks);
}

function handleBids (offers) {
	console.log ('bids');
}

function handleAsks (offers) {
	console.log ('asks');
}