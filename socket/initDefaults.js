// Author: Jarrett Cruger -> QR Hook

var platform = require('platform');

module.exports = Init;
function Init (io, callback) {
    // Configure to only use websockets for development
    io.configure('development', function () {
        io.set('transports', ['websocket']);
    });
    // Set authorization to print out user agent for device detection
    // implementation
    io.set('authorization', function (data, accept) {
        if (data.headers['user-agent']) {
            var ua = platform.parse(data.headers['user-agent']);
            // Attach setting to data for what device
        }
        // Accept the request, can be limited if needed
        accept(null, true);
    });

    callback(io);
}
