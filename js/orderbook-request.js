var ripple = require('ripple-lib');

var remote = new ripple.Remote({
  servers: [
    { host: 's1.ripple.com', port: 443, secure: true }
    ]
});

var BASE = {
   'currency':'USD',
   'issuer': 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B', // BitStamp            
}

var TRADE = {
   'currency':'USD',
   'issuer': 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q', // SnapSwap
}
   

var mybook_bid = remote.book(BASE.currency, BASE.issuer, TRADE.currency, TRADE.issuer);
var mybook_ask = remote.book(TRADE.currency, TRADE.issuer, BASE.currency, BASE.issuer);

mybook_bid.on("model", handle_bids);
mybook_ask.on("model", handle_asks); 

function handle_bids(offers)
{ 
  console.log ("BIDS");
  console.log(offers);
}

function handle_asks(offers)
{
  console.log ("ASKS");
  console.log(offers);
}

remote.connect();
