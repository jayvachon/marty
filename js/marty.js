var orderbook = require('./orderbook');
var currenciesHandler = require('./currencies-handler');
var pairs = currenciesHandler.getPairs (false);

var ripple = require('ripple-lib');
var Remote = require('ripple-lib').Remote;

var remote = new ripple.Remote({
	servers: [
		  { host: 's1.ripple.com', port: 443, secure: true }
	  ]
});

function sendPairsToOrderbook () {
	for (var i = 0; i < pairs.length; i ++) {
		var base = currenciesHandler.getCurrencyAttributes (pairs[i][0], ['currency', 'issuer_address', 'exchange_ref']);
		var trade = currenciesHandler.getCurrencyAttributes (pairs[i][1], ['currency', 'issuer_address', 'exchange_ref']);
		var BASE = {
			'currency': base[0],
			'issuer': base[1],
			'exchange_ref': base[2]
		}
		var TRADE = {
			'currency': trade[0],
			'issuer': trade[1],
			'exchange_ref': trade[2]
		}
		var mybook_bid = remote.book(BASE.currency, BASE.issuer, TRADE.currency, TRADE.issuer);
		var mybook_ask = remote.book(TRADE.currency, TRADE.issuer, BASE.currency, BASE.issuer);
		console.log (BASE);
		console.log (TRADE);
		mybook_bid.on("model", handle_bids);
		mybook_ask.on("model", handle_asks);
	}
};

function handle_bids(offers) { 
console.log ('BID');
console.log(offers[0]);
/*if(BASE.currency == 'XRP' || TRADE.currency == 'XRP'){
  console.log ("1 " + TRADE.currency + " = " + ((1/(offers[0]["quality"]))/1000000) + " " + BASE.currency);
  console.log (TRADE.exchange_ref + " " + ((1/(offers[0]["quality"]))/1000000) + " " + BASE.exchange_ref)
}
else{
  console.log ("1 " + TRADE.currency + " = " + ((1/(offers[0]["quality"]))) + " " + BASE.currency);
  console.log (TRADE.exchange_ref + " " + ((1/(offers[0]["quality"]))) + " " + BASE.exchange_ref)
}  */
}

function handle_asks(offers){
console.log('ASK');
console.log(offers[0]);
/*if(BASE.currency == 'XRP' || TRADE.currency == 'XRP'){ 
  console.log ("1 " + BASE.currency + " = " + (1/(offers[0]["quality"])*1000000) + " " + TRADE.currency);
  console.log (BASE.exchange_ref + " " + (1/(offers[0]["quality"])*1000000) + " " + TRADE.exchange_ref)
}
else{
  console.log ("1 " + BASE.currency + " = " + (1/(offers[0]["quality"])) + " " + TRADE.currency);
  console.log (BASE.exchange_ref + " " + (1/(offers[0]["quality"])) + " " + TRADE.exchange_ref)
}  */
}

// Transaction
var MY_ADDRESS = '';
var MY_SECRET  = '';
var GATEWAY = 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'; // BitStamp

remote.connect(function() {
	remote.setSecret(MY_ADDRESS, MY_SECRET);
	sendPairsToOrderbook ();
});