
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
	var offer = offers[0];
	if (offer !== undefined) {
		var takerPays = offer['TakerPays'];
		var paysCurrency = takerPays['currency'];
		var paysIssuer = takerPays['issuer'];

		var takerGets = offer['TakerGets'];
		var getsCurrency = takerGets['currency'];
		var getsIssuer = takerGets['issuer'];
		var quality = offer['TakerGets']['value']/offer['TakerPays']['value'];
		if (paysCurrency == 'USD' && paysIssuer == 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q' && getsCurrency == 'USD' && getsIssuer == 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B') {
			//console.log("BIDS");
			//console.log (offer);
			console.log("1 USD SnapSwap = " + quality + " USD Bitstamp")
		}
	}
}

function handle_asks(offers) {
	var offer = offers[0];
	if (offer !== undefined) {
		var takerPays = offer['TakerPays'];
		var paysCurrency = takerPays['currency'];
		var paysIssuer = takerPays['issuer'];

		var takerGets = offer['TakerGets'];
		var getsCurrency = takerGets['currency'];
		var getsIssuer = takerGets['issuer'];
		var quality = 1/(offer['TakerPays']['value']/offer['TakerGets']['value']);
		if (paysCurrency == 'USD' && paysIssuer == 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B' && getsCurrency == 'USD' && getsIssuer == 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q') {
			//console.log("ASKS");
			//console.log (offer);
			console.log("1 USD BitStamp = " + quality + ' USD SnapSwap');
		}
	}
}