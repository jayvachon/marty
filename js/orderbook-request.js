
var currenciesHandler = require('./currencies-handler');
var marty = require('./marty');
var rates = [];

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
	mybook_bid.on("model", handleBids);
	mybook_ask.on("model", handleAsks);
};

function formatOffer (offer, takerType) {
	
	var taker = offer[takerType];
	var currency = taker['currency'];
	var issuer = taker['issuer'];
	var value = taker['value'];

	// XRP special case
	if (typeof taker == 'string') {
		currency = 'XRP';
		issuer = null;
		value = taker / 1000000;
	}

	var exchangeRef = currenciesHandler.findExchangeRef (currency, issuer);
	return {
		value: value,
		exchangeRef: exchangeRef
	};
}

function handleBids(offers) {
	var offer = offers[0];
	if (offer !== undefined) {
		var pays = formatOffer (offer, 'TakerPays');
		var gets = formatOffer (offer, 'TakerGets');
		var quality = gets['value'] / pays['value'];
		addRate (pays['exchangeRef'], gets['exchangeRef'], quality, pays['value'], gets['value']);
	}
}

function handleAsks(offers) {
	var offer = offers[0];
	if (offer !== undefined) {
		var pays = formatOffer (offer, 'TakerPays');
		var gets = formatOffer (offer, 'TakerGets');
		var quality = 1 / (pays['value'] / gets['value']);
		addRate (pays['exchangeRef'], gets['exchangeRef'], quality, pays['value'], gets['value']);
	}
}

function addRate (paysRef, getsRef, quality, paysValue, getsValue) {
	var rate = findRate (paysRef, getsRef);
	var newRate = {
		'paysRef': paysRef,
		'getsRef': getsRef,
		'exchange': paysRef + " " + quality + " " + getsRef,
		'paysValue': paysValue,
		'getsValue': getsValue
	};
	if (rate === null) {
		rates.push (newRate);
	} else {
		rate = newRate;
	}
	marty.sendRates (rates);
}

function findRate (paysRef, getsRef) {
	for (var i = 0; i < rates.length; i ++) {
		var rate = rates[i];
		if (rate['paysRef'] == paysRef && rate['getsRef'] == getsRef) {
			return rate;
		}
	}
	return null;
}

exports.findRate = function (paysRef, getsRef) {
	return findRate (paysRef, getsRef);
};