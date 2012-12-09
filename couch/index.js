// Author: Jarrett Cruger -> QR Hook

// Requires
var nano = require('nano'),
	config = require('../config').couch;


	server = nano({
		'url': config.master.uri,
		'request_options': config.master.request_options
	});

// Config database and environment
var	master = server.use(config.master.db),
	env = process.env.NODE_ENV || 'development';

// Nano object to interact with the the specific couchDB database
exports.master = master;
// Function to compact database with.
couch.compact = master.compact;

// Create database if it isn't present on the couchDB futon
exports.bootstrap = Bootstrap;
function Bootstrap () {
	return server.db.create(config.master.db);
};

// Returns a stream to listen on for specific documents when they are updated
exports.changes = Changes;
function Changes () {
	var feed = master.follow({since: 'now', feed: 'continuous', include_docs: true});
	return feed;
};

