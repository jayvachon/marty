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
   'issuer': 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B', // BitStamp   
}

var mybook_bid = remote.book(BASE.currency, BASE.issuer, TRADE.currency, TRADE.issuer);
var mybook_ask = remote.book(TRADE.currency, TRADE.issuer, BASE.currency, BASE.issuer);
mybook_bid.on("model", handle_bids);
mybook_ask.on("model", handle_asks);

function handle_bids(offers) { 
  //console.log (offers[0]);
  //USD -> XRP
  console.log ("Bid Total" + " " + offers[0]["TakerPays"]["value"] + " " + "Bid Price" + " " + ((1/(offers[0]["quality"]))/1000000));
  console.log ("1 USD = " + ((1/(offers[0]["quality"]))/1000000) + " XRP");
  //console.log ((1/(offers[0]["quality"]))/1000000);
  //console.log ("Bid Price" + " " + ((1/(offers[0]["quality"]))/1000000));
}

function handle_asks(offers){
  // XRP -> USD
  console.log ("Ask Total" + " " + offers[0]["TakerGets"]["value"] + " " + "Ask Price" + " " + (1/(offers[0]["quality"])*1000000)); 
  console.log ("1 XRP = " + (1/(offers[0]["quality"])*1000000) + " USD");
  //console.log ((offers[0]["quality"])/1000000); 
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