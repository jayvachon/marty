var ripple = require('ripple-lib');

// subscribing to a server allows for more entropy
var remote = new ripple.Remote({
	servers: [
		{ host: 's1.ripple.com', port: 443, secure: true }
  	]
});

remote.connect(function(err, res) {
	/* remote connected */
});

// Wait for randomness to have been added.
// The entropy of the random generator is increased
// by random data received from a rippled
remote.once('random', function(err, info) {
	var wallet = ripple.Wallet.generate();
	console.log(wallet);
});