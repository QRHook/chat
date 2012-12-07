var nano = require('nano'),
	config = require('../config').couch,
	server = nano({
		'url': config.master.uri,
		'request_options': config.master.request_options
	}),
	master = server.use(config.master.db),
	env = process.env.NODE_ENV || 'development',
	couch = exports;

couch.bootstrap = function bootstap () {

	return server.db.create(config.master.db);
};

couch.changes = function changes () {

	var feed = master.follow({since: 'now', feed: 'continuous', include_docs: true});

	return feed;
};

couch.db = master;

couch.compact = master.compact;
