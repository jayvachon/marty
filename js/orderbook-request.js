
var currenciesHandler = require('./currencies-handler');
var marty = require('./marty');
var rates = [];
var xrpExchangeRates = [];

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
	if (getsRef == 'XRP') {
		addXRPExchangeRate (paysRef, quality);
	}
	marty.sendRates (rates);
}

function addXRPExchangeRate (paysRef, quality) {
	var xrpExchangeRate = findXRPExchangeRate (paysRef);
	var newXRPExchangeRate = {
		'paysRef': paysRef,
		'quality': quality
	};
	if (xrpExchangeRate === null) {
		xrpExchangeRates.push (newXRPExchangeRate);
	} else {
		xrpExchangeRate = newXRPExchangeRate;
	}
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

function findXRPExchangeRate (paysRef) {
	for (var i = 0; i < xrpExchangeRates.length; i ++) {
		var xrpExchangeRate = xrpExchangeRates[i];
		if (xrpExchangeRate['paysRef'] == paysRef) {
			return xrpExchangeRate;
		}
	}
	return null;
}

exports.findRate = function (paysRef, getsRef) {
	return findRate (paysRef, getsRef);
};

exports.findXRPExchangeRate = function (paysRef) {
	var xrpExchangeRate = findXRPExchangeRate (paysRef);
	if (xrpExchangeRate === null) {
		return 0;
	} else {
		return xrpExchangeRate['quality'];
	}
};