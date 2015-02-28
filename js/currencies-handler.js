
var fs = require('fs');
var currencies = JSON.parse(fs.readFileSync('../currencies.json', 'utf8'))['currencies'];
var pairs = [];

exports.getPairs = function (orderMatters) {
	for (var i = 0; i < currencies.length; i ++) {
		var firstPair = currencies[i];
		for (var j = i+1; j < currencies.length; j ++) {
			pairs.push ([firstPair, currencies[j]]);
		}
	}
	if (orderMatters) {
		for (i = 0; i < pairs.length; i ++) {
			var pair = pairs[i];
			pairs.push ([pair[1], pair[0]]);
		}
	}
	return pairs;
};

exports.getCurrencyAttributes = function (currency, attributes) {
	return_attributes = [];
	for (var i = 0; i < attributes.length; i ++) {
		return_attributes.push (currency[attributes[i]]);
	}
	return return_attributes;
};

exports.findExchangeRef = function (currency, issuerAddress) {
	for (var i = 0; i < currencies.length; i ++) {
		var thisCurrency = currencies[i];
		if (thisCurrency['currency'] == currency && thisCurrency['issuer_address'] == issuerAddress) {
			return thisCurrency['exchange_ref'];
		}
	}
};