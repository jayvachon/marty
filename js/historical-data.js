var request = new require('../node_modules/request');

request({
  method: 'POST',
  url: 'http://api.ripplecharts.com/api/exchange_rates',
  headers: {
    'Content-Type': 'application/json'
  },
// base Bitstamp
// counter Snapswap

  body: {
    pairs : [
        {
            base    : {currency:"USD","issuer":"rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"}, 
            counter : {currency:"USD","issuer":"rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q"}
        }
    ],
    range : "day"
}
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});