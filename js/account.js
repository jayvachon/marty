var ripple = require('ripple-lib');

var remote = new ripple.Remote({
	servers: [
		{ host: 's1.ripple.com', port: 443, secure: true }
  	]
});

var options = {
	account: 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q' // SnapSwap
	ledger: 'validated'
}

var request = remote.requestAccountInfo(options, function(err, info) {
  console.log (info);
});

remote.connect();
