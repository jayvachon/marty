

var request = require('request');

request({
  method: 'POST',
  url: 'http://api.ripplecharts.com/api/exchange_rates',
  headers: {
    'Content-Type': 'application/json'
  },
  body: "{
    pairs : [
        {
            base    : {currency:\"CNY\",\"issuer\":\"rnuF96W4SZoCJmbHYBFoJZpR8eCaxNvekK\"},
            counter : {currency:\"XRP\"}
        }
    ],
    range : \"day\"
}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});