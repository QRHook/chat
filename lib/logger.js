"use strict";

var winston = require('winston'),
	logger = exports,
	wlog = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({'level': 'info', 'colorize': true})
			//new (winston.transports.File)({ filename: 'logs/default.log' })
		]
	});
// TODO: Store full logs in DB/file and only output errors to console
logger.log = function log (json, severity) {

	wlog.log(severity, '--', json);

};
