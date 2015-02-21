var ripple = require('ripple-lib');
var Remote = require('ripple-lib').Remote;
var Amount = require('ripple-lib').Amount;

var remote = new ripple.Remote({
	servers: [
		{ host: 's1.ripple.com', port: 443, secure: true }
  	]
});

/* Loading ripple-lib Remote and Amount modules in a webpage */
// var Remote = ripple.Remote;
// var Amount = ripple.Amount;

// Orderbook
var BASE = {
   'currency':'XRP',
   'issuer': null
}

var TRADE = {
   'currency':'USD',
   'issuer': 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q' // SnapSwap
}

var mybook_bid = remote.book(BASE.currency, BASE.issuer, TRADE.currency, TRADE.issuer);
mybook_bid.on("model", handle_bids);

function handle_bids(offers) { 
  //console.log (offers[0]);
  console.log (offers[0]["TakerPays"]["value"]);
}

// Transaction
var MY_ADDRESS = '';
var MY_SECRET  = '';
var GATEWAY = 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'; // BitStamp

remote.connect(function() {
  remote.setSecret(MY_ADDRESS, MY_SECRET);

  /*var transaction = remote.createTransaction('OfferCreate', {
    account: MY_ADDRESS,
    taker_pays: '100',
    taker_gets: '1/USD/' + GATEWAY
  });

  transaction.submit(function(err, res) {
    
  });*/
});