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
//var array = []
  var CURRENCY = process.argv[2];
  var ISSUER = process.argv[3];


//for (var i = 0; i < array.length; i++){
// Orderbook
  var BASE = {
    // 'currency':'XRP',
    'currency':CURRENCY,
     //'issuer': null,
     'issuer': ISSUER,
     'exchange_ref': 'XRP'
  }

  var TRADE = {
     'currency':'USD',
     'issuer': 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B', // BitStamp  
     'exchange_ref': 'BUS' 
  }

  var mybook_bid = remote.book(BASE.currency, BASE.issuer, TRADE.currency, TRADE.issuer);
  var mybook_ask = remote.book(TRADE.currency, TRADE.issuer, BASE.currency, BASE.issuer);
  mybook_bid.on("model", handle_bids);
  mybook_ask.on("model", handle_asks);

function handle_bids(offers) { 
  //console.log (offers[0]);
  //USD -> XRP
  //console.log ("Bid Total" + " " + offers[0]["TakerPays"]["value"] + " " + "Bid Price" + " " + ((1/(offers[0]["quality"]))/1000000));
  if(BASE.currency == 'XRP' || TRADE.currency == 'XRP'){
    console.log ("1 " + TRADE.currency + " = " + ((1/(offers[0]["quality"]))/1000000) + " " + BASE.currency);
    //console.log (TRADE.exchange_ref + " " + ((1/(offers[0]["quality"]))/1000000) + " " + BASE.exchange_ref)
  }
  else{
    console.log ("1 " + TRADE.currency + " = " + ((1/(offers[0]["quality"]))) + " " + BASE.currency);
    //console.log (TRADE.exchange_ref + " " + ((1/(offers[0]["quality"]))) + " " + BASE.exchange_ref)
  }  

}

function handle_asks(offers){
  // XRP -> USD
  //console.log ("Ask Total" + " " + offers[0]["TakerGets"]["value"] + " " + "Ask Price" + " " + (1/(offers[0]["quality"])*1000000));
  if(BASE.currency == 'XRP' || TRADE.currency == 'XRP'){ 
   console.log ("1 " + BASE.currency + " = " + (1/(offers[0]["quality"])*1000000) + " " + TRADE.currency);
   //console.log (BASE.exchange_ref + " " + (1/(offers[0]["quality"])*1000000) + " " + TRADE.exchange_ref)
  }
  else{
   console.log ("1 " + BASE.currency + " = " + (1/(offers[0]["quality"])) + " " + TRADE.currency);
    //console.log (BASE.exchange_ref + " " + (1/(offers[0]["quality"])) + " " + TRADE.exchange_ref)
  }  

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