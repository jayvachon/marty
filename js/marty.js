var exec = require ('child_process').exec;
var orderbook = require('./orderbook-request');
var currenciesHandler = require('./currencies-handler');
var ripple = require('ripple-lib');
var Remote = require('ripple-lib').Remote;

var MY_ADDRESS = '';
var MY_SECRET  = '';
var GATEWAY = 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'; // BitStamp

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

exports.sendRates = function (rates) {
	var outRates = "";
	for (var i = 0; i < rates.length; i ++) {
		outRates += rates[i]['exchange'] + '\n';
	}
	//console.log (outRates);
	exec ('ruby ../rb/monkey.rb "' + outRates + '"', function (err, stdout, stdin) {
		if (stdout === "No arbitrage found.\n" || stdout === "") {
			return;
		} else {
			var paths = stdout.split('\n');
			for (i = 0; i < paths.length; i ++) {
				if (paths !== "") {
					submitTransactionsAlongPath (paths[i]);
				}
			}
		}
	});
};

function submitTransactionsAlongPath (path) {
	var arr = path.substring (18, path.length-1).split(', ');
	var currencies = [];
	for (var i = 0; i < arr.length; i ++) {
		currencies.push (arr[i].substring(1, arr[i].length-1));
	}
	if (currencies.length < 2) {
		return;
	}

	// get the maximum value that can be passed along the path
	// and if the value is too small, don't use the path
	var maxValue = getMaximumValue (currencies);
	if (maxValue >= 10) {
		for (i = 0; i < currencies.length-1; i ++) {
			var rate = orderbook.findRate (currencies[i], currencies[i+1]);
			console.log (rate);
			var paysValue = rate['paysValue'];
			var getsValue = rate['getsValue'];
			var paysCurrencyAndGateway = currenciesHandler.findCurrencyAndGateway (currencies[i]);
			var getsCurrencyAndGateway = currenciesHandler.findCurrencyAndGateway (currencies[i+1]);
			var takerPays = paysValue + "/" + paysCurrencyAndGateway['currency'] + "/" + paysCurrencyAndGateway['gateway'];
			var takerGets = getsValue + "/" + getsCurrencyAndGateway['currency'] + "/" + getsCurrencyAndGateway['gateway'];
			console.log (takerPays);
			console.log (takerGets);
			//submitTransaction (takerPays, takerGets);
		}
	}
}

function getMaximumValue (path) {
	var maxVal = 1000000000;
	for (var i = 0; i < path.length-1; i ++) {
		var gets = orderbook.findRate (path[i], path[i+1])['getsValue'];
		if (gets < maxVal) {
			maxVal = gets;
		}
	}
	return maxVal;
}

function submitTransaction (takerPays, takerGets) {
	
	var transaction = remote.createTransaction ('OfferCreate', {
		account: MY_ADDRESS,
		taker_pays: takerPays,
		taker_gets: takerGets
	});

	transaction.submit (function (err, res) {
		console.log (err, res);
	});
}

remote.connect(function() {
	remote.setSecret(MY_ADDRESS, MY_SECRET);
	sendPairsToOrderbook ();
});
