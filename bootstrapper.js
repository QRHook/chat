// Script for bootstrapping a couchDB for this application based on the config data
var couch = require('./couch'),
	logger = require('./lib/logger'),
	bootstrapper = exports;

bootstrapper.setup = function setup (callback) {

	var stream = couch.bootstrap();

	stream.on('error', function (err) {

		logger.log({bootstrap: false, err: err}, 'error');
		callback(err);

	});

	stream.on('end', function () {

		//tasks.start();
		logger.log({bootstrap: true}, 'info');
		callback();

	});

	return stream;
};

if(require.main === module) {

  bootstrapper.setup();
}
