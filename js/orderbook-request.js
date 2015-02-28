
var currenciesHandler = require('./currencies-handler');

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

function formatOffer (offer, takerType, bid) {
	
	var taker = offer[takerType];
	var currency = taker['currency'];
	var issuer = taker['issuer'];
	var value = taker['value'];

	// XRP special case
	if (typeof taker == 'string') {
		currency = 'XRP';
		issuer = null;
		if (bid) {
			value = taker /= 1000000;
		} else {
			value = taker *= 1000000;
		}
	}

	var exchangeRef = currenciesHandler.findExchangeRef (currency, issuer);
	return {
		value: value,
		exchangeRef: exchangeRef
	};
}

function handle_bids(offers) {
	var offer = offers[0];
	if (offer !== undefined) {
		var pays = formatOffer (offer, 'TakerPays', true);
		var gets = formatOffer (offer, 'TakerGets', true);
		var quality = gets['value'] / pays['value'];
		console.log ('BID:');
		console.log (pays['exchangeRef'] + " " + quality + " " + gets['exchangeRef']);
	}
}

function handle_asks(offers) {
	var offer = offers[0];
	if (offer !== undefined) {
		var pays = formatOffer (offer, 'TakerPays', false);
		var gets = formatOffer (offer, 'TakerGets', false);
		var quality = 1 / pays['value'] / gets['value'];
		console.log ('ASK:');
		console.log (gets['exchangeRef'] + " " + quality + " " + pays['exchangeRef']);
	}
}