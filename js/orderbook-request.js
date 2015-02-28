
exports.getAskBid = function (remote, base, trade) {
	var BASE = {
		'currency': base[0],
		'issuer': base[1],
		'exchange_ref': base[2]
	};
	var TRADE = {
		'currency': trade[0],
		'issuer': trade[1],
		'exchange_ref': trade[2]
	};
	var mybook_bid = remote.book(BASE.currency, BASE.issuer, TRADE.currency, TRADE.issuer);
	var mybook_ask = remote.book(TRADE.currency, TRADE.issuer, BASE.currency, BASE.issuer);
	mybook_bid.on("model", handle_bids);
	mybook_ask.on("model", handle_asks);
};

function handle_bids(offers) {
	console.log(offers[0]);
}

function handle_asks(offers) {
	console.log(offers[0]);
}